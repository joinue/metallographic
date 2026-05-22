#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Sync the canonical <nav class="navigation"> and <footer class="footer">
 * blocks into every .htm file that already uses the modern design (i.e.
 * Group 2 from the .htm audit — pages migrated to the new design but still
 * carrying an outdated nav/footer).
 *
 * Canonical sources (project convention):
 *   - n:/.../navigation.html
 *   - n:/.../footer.html
 *
 * Group 2 detection: any .htm file that contains both the
 * <nav class="navigation"> and <footer class="footer"> markers is treated
 * as syncable. Truly-legacy .htm files lack these markers entirely and are
 * skipped untouched. (An earlier version of this script used
 * "mobile-nav-overlay" as a proxy marker, but that missed transitional
 * pages like /support/preparation-procedures/aluminum.htm that have the
 * modern nav/footer wrappers without the modern mobile overlay.)
 *
 * Usage:
 *   node sync-htm-nav-footer.js              # dry run — reports which pages would change
 *   node sync-htm-nav-footer.js --apply      # write changes
 */

const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const REPO_ROOT = path.resolve(__dirname, '..');
const NAV_SRC = path.join(REPO_ROOT, 'navigation.html');
const FOOTER_SRC = path.join(REPO_ROOT, 'footer.html');

const SKIP_DIR_NAMES = new Set([
  'node_modules',
  '.git',
  'scripts',
  '.claude',
  'metallography.org',
]);
function shouldSkipDir(name) {
  if (SKIP_DIR_NAMES.has(name)) return true;
  if (/backup/i.test(name)) return true;
  return false;
}

const NAV_OPEN_MARKER = '<nav class="navigation"';
const FOOTER_OPEN_MARKER = '<footer class="footer"';

function readBOM(p) {
  const buf = fs.readFileSync(p);
  const hasBOM = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
  return { text: (hasBOM ? buf.slice(3) : buf).toString('utf8'), hasBOM };
}

function writeBOM(p, text, hasBOM) {
  const out = hasBOM
    ? Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(text, 'utf8')])
    : Buffer.from(text, 'utf8');
  fs.writeFileSync(p, out);
}

function findBlock(text, openMarker, closeMarker) {
  const start = text.indexOf(openMarker);
  if (start === -1) return null;
  const end = text.indexOf(closeMarker, start);
  if (end === -1) return null;
  return { block: text.slice(start, end + closeMarker.length), start, end: end + closeMarker.length };
}

function replaceBlock(text, openMarker, closeMarker, newBlock) {
  const found = findBlock(text, openMarker, closeMarker);
  if (!found) return { text, replaced: false };
  return { text: text.slice(0, found.start) + newBlock + text.slice(found.end), replaced: true, oldLength: found.block.length };
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.endsWith('.htm')) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function main() {
  const navSrc = readBOM(NAV_SRC).text;
  const footerSrc = readBOM(FOOTER_SRC).text;
  const canonicalNav = findBlock(navSrc, '<nav class="navigation"', '</nav>');
  const canonicalFooter = findBlock(footerSrc, '<footer class="footer"', '</footer>');
  if (!canonicalNav) {
    console.error('Could not extract <nav> from navigation.html');
    process.exit(1);
  }
  if (!canonicalFooter) {
    console.error('Could not extract <footer> from footer.html');
    process.exit(1);
  }
  console.log(`Canonical nav:    ${canonicalNav.block.length} bytes (from navigation.html)`);
  console.log(`Canonical footer: ${canonicalFooter.block.length} bytes (from footer.html)`);

  const allHtm = walk(REPO_ROOT, []);
  console.log(`${APPLY ? 'APPLY' : 'DRY RUN'} — scanning ${allHtm.length} .htm files`);

  let scanned = 0;
  let skippedLegacy = 0;
  let skippedMarkers = 0;
  let changed = 0;
  for (const fp of allHtm) {
    scanned++;
    const { text, hasBOM } = readBOM(fp);
    if (!text.includes(NAV_OPEN_MARKER) || !text.includes(FOOTER_OPEN_MARKER)) {
      skippedLegacy++;
      continue;
    }
    let updated = text;
    const navResult = replaceBlock(updated, '<nav class="navigation"', '</nav>', canonicalNav.block);
    const footerResult = replaceBlock(navResult.text, '<footer class="footer"', '</footer>', canonicalFooter.block);
    updated = footerResult.text;

    if (!navResult.replaced || !footerResult.replaced) {
      const missing = [];
      if (!navResult.replaced) missing.push('nav');
      if (!footerResult.replaced) missing.push('footer');
      console.log(`SKIP (markers not found: ${missing.join(', ')}): ${path.relative(REPO_ROOT, fp)}`);
      skippedMarkers++;
      continue;
    }
    if (updated === text) continue;
    const navDelta = canonicalNav.block.length - navResult.oldLength;
    const footerDelta = canonicalFooter.block.length - footerResult.oldLength;
    console.log(
      `${APPLY ? 'wrote' : 'would write'}: ${path.relative(REPO_ROOT, fp)}  (nav Δ ${navDelta >= 0 ? '+' : ''}${navDelta}, footer Δ ${footerDelta >= 0 ? '+' : ''}${footerDelta})`
    );
    changed++;
    if (APPLY) writeBOM(fp, updated, hasBOM);
  }
  console.log(`done — scanned ${scanned}, skipped ${skippedLegacy} legacy, skipped ${skippedMarkers} for missing markers, ${changed} ${APPLY ? 'written' : 'would change'}`);
}

main();
