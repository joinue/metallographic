#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Compare modern-design .htm files at legacy URLs against their proposed
 * modern .html targets. For each pair, report:
 *   - Body word counts (after stripping nav/footer/CSS/scripts/tags)
 *   - Word-set Jaccard similarity (rough "do these say the same things?")
 *   - First several h1/h2/h3 headings from each side
 *
 * Goal: decide for each .htm whether it's
 *   (a) a true duplicate — redirect safely
 *   (b) a stale older version — redirect safely
 *   (c) unique content not in the modern equivalent — migrate before redirect
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

const mappings = [
  // === EQUIPMENT (18) ===
  ['metallographic-equipment/Metallography-Abrasive-cutter.htm',           'metallographic-equipment/abrasive-sectioning.html'],
  ['metallographic-equipment/Metallography-Abrasive-cutter-automated.htm', 'metallographic-equipment/abrasive-sectioning/automated.html'],
  ['metallographic-equipment/Metallography-Automatic-polisher.htm',        'metallographic-equipment/grinding-polishing/femto.html'],
  ['metallographic-equipment/Metallography-Brinell-Vickers.htm',           'metallographic-equipment/hardness-testing/brinell-vickers.html'],
  ['metallographic-equipment/Metallography-Castable-Mounting.htm',         'metallographic-equipment/castable-mounting.html'],
  ['metallographic-equipment/Metallography-Diamond-wafering-saws.htm',     'metallographic-equipment/precision-wafering.html'],
  ['metallographic-equipment/Metallography-Equipment.htm',                 'equipment.html'],
  ['metallographic-equipment/Metallography-Hand-Grinder.htm',              'metallographic-equipment/grinding-polishing/penta.html'],
  ['metallographic-equipment/Metallography-ImageAnalysis.htm',             'metallographic-equipment/microscopy/image-analysis.html'],
  ['metallographic-equipment/Metallography-Manual-Polishers.htm',          'metallographic-equipment/grinding-polishing/nano.html'],
  ['metallographic-equipment/Metallography-MicroHardnessTester.htm',       'metallographic-equipment/hardness-testing/microhardness.html'],
  ['metallographic-equipment/Metallography-Microscopes.htm',               'metallographic-equipment/microscopy.html'],
  ['metallographic-equipment/Metallography-Mounting-Presses.htm',          'metallographic-equipment/compression-mounting.html'],
  ['metallographic-equipment/Metallography-Quote-lab.htm',                 'quote.html'],
  ['metallographic-equipment/Metallography-Rockwell.htm',                  'metallographic-equipment/hardness-testing/rockwell.html'],
  ['metallographic-equipment/Metallography-Vacuum-mounting.htm',           'metallographic-equipment/castable-mounting/teravac-pro.html'],
  ['metallographic-equipment/Metallography-Vibratory-polisher.htm',        'metallographic-equipment/grinding-polishing/giga.html'],
  ['metallographic-equipment/Metallography-furniture.htm',                 'metallographic-equipment/lab-furniture.html'],

  // === TECHNICAL (15) ===
  ['metallographic-technical/Metallography-Technical-Abrasive-Cutting.htm',          'metallographic-consumables/sectioning/abrasive-cutting.html'],
  ['metallographic-technical/Metallography-Technical-Abrasive-Grinding.htm',         'metallographic-consumables/grinding/abrasive-grinding.html'],
  ['metallographic-technical/Metallography-Technical-Castable-Mount.htm',            'metallographic-consumables/mounting/castable.html'],
  ['metallographic-technical/Metallography-Technical-Cleaning.htm',                  'metallographic-consumables/cleaning.html'],
  ['metallographic-technical/Metallography-Technical-Compression-Mount.htm',         'metallographic-consumables/mounting/compression.html'],
  ['metallographic-technical/Metallography-Technical-Diamond-Disk.htm',              'metallographic-consumables/grinding/diamond-grinding.html'],
  ['metallographic-technical/Metallography-Technical-Etching.htm',                   'etchants.html'],
  ['metallographic-technical/Metallography-Technical-Fine-Abrasives.htm',            'metallographic-consumables/final-polishing.html'],
  ['metallographic-technical/Metallography-Technical-Hardness.htm',                  'metallographic-consumables/hardness-testing.html'],
  ['metallographic-technical/Metallography-Technical-Lapping-Films.htm',             'metallographic-consumables/grinding/lapping-films.html'],
  ['metallographic-technical/Metallography-Technical-Monocrystalline-Diamond.htm',   'metallographic-consumables/polishing/monocrystalline-diamond.html'],
  ['metallographic-technical/Metallography-Technical-Polishing-Magnetic.htm',        'metallographic-consumables/polishing/magnetic-system.html'],
  ['metallographic-technical/Metallography-Technical-Polishing-PSA.htm',             'metallographic-consumables/polishing/polishing-pads.html'],
  ['metallographic-technical/Metallography-Technical-Polycrystalline-Diamond.htm',   'metallographic-consumables/polishing/polycrystalline-diamond.html'],
  ['metallographic-technical/Metallography-Technical-Wafer-Cutting.htm',             'metallographic-consumables/sectioning/precision-wafering.html'],
];

function extractBody(text) {
  // Strip the canonical nav and footer blocks; anything between them is body.
  const navEnd = text.indexOf('</nav>');
  const footerStart = text.indexOf('<footer');
  if (navEnd === -1 || footerStart === -1 || footerStart < navEnd) return text;
  return text.slice(navEnd + '</nav>'.length, footerStart);
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getHeadings(html, max = 8) {
  const out = [];
  const re = /<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null && out.length < max) {
    const txt = stripTags(m[2]).slice(0, 90);
    if (txt) out.push(`h${m[1]}: ${txt}`);
  }
  return out;
}

function wordSet(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 4)
  );
}

function jaccard(a, b) {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

console.log(`Comparing ${mappings.length} legacy .htm files against modern targets\n`);

for (const [legacy, modern] of mappings) {
  const legacyAbs = path.join(REPO_ROOT, legacy);
  const modernAbs = path.join(REPO_ROOT, modern);
  let lText, mText;
  try { lText = fs.readFileSync(legacyAbs, 'utf8'); } catch { console.log(`MISSING LEGACY: ${legacy}`); continue; }
  try { mText = fs.readFileSync(modernAbs, 'utf8'); } catch { console.log(`MISSING MODERN: ${modern}`); continue; }

  const lBody = extractBody(lText);
  const mBody = extractBody(mText);
  const lPlain = stripTags(lBody);
  const mPlain = stripTags(mBody);
  const lWords = lPlain.split(/\s+/).filter(Boolean).length;
  const mWords = mPlain.split(/\s+/).filter(Boolean).length;
  const sim = jaccard(wordSet(lPlain), wordSet(mPlain));
  const lH = getHeadings(lBody);
  const mH = getHeadings(mBody);

  console.log('='.repeat(90));
  console.log(`LEGACY:  ${legacy.split('/').pop()}  —  ${lWords} body words`);
  console.log(`MODERN:  ${modern}  —  ${mWords} body words`);
  console.log(`Body word-set similarity: ${(sim * 100).toFixed(0)}%`);
  console.log(`-- legacy headings --`);
  lH.forEach(h => console.log(`   ${h}`));
  if (lH.length === 0) console.log('   (none)');
  console.log(`-- modern headings --`);
  mH.forEach(h => console.log(`   ${h}`));
  if (mH.length === 0) console.log('   (none)');
  console.log('');
}
