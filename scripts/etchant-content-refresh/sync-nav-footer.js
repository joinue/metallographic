#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Sync the <nav class="navigation"> ... </nav> and <footer class="footer"> ... </footer>
 * blocks on every etchant detail page to the canonical content in:
 *   - n:/.../navigation.html
 *   - n:/.../footer.html
 *
 * These canonical files are the source of truth (per project convention).
 *
 * Usage:
 *   node sync-nav-footer.js              # dry run — reports which pages would change
 *   node sync-nav-footer.js --apply      # write changes
 */

const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const ROOT = path.resolve(__dirname, '..', '..');
const ETCHANTS_DIR = path.join(ROOT, 'etchants');
const NAV_SRC = path.join(ROOT, 'navigation.html');
const FOOTER_SRC = path.join(ROOT, 'footer.html');

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

function main() {
  // Read canonical sources
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

  const files = fs
    .readdirSync(ETCHANTS_DIR)
    .filter(f => f.endsWith('.html'))
    .sort();

  console.log(`${APPLY ? 'APPLY' : 'DRY RUN'} — ${files.length} etchant pages`);

  let changed = 0;
  for (const name of files) {
    const fp = path.join(ETCHANTS_DIR, name);
    const { text, hasBOM } = readBOM(fp);
    let updated = text;
    let navResult = replaceBlock(updated, '<nav class="navigation"', '</nav>', canonicalNav.block);
    let footerResult = replaceBlock(navResult.text, '<footer class="footer"', '</footer>', canonicalFooter.block);
    updated = footerResult.text;

    if (!navResult.replaced || !footerResult.replaced) {
      console.log(`SKIP (markers not found): ${name}`);
      continue;
    }
    if (updated === text) {
      // already canonical
      continue;
    }
    const navDelta = canonicalNav.block.length - navResult.oldLength;
    const footerDelta = canonicalFooter.block.length - footerResult.oldLength;
    console.log(
      `${APPLY ? 'wrote' : 'would write'}: ${name}  (nav Δ ${navDelta >= 0 ? '+' : ''}${navDelta}, footer Δ ${footerDelta >= 0 ? '+' : ''}${footerDelta})`
    );
    changed++;
    if (APPLY) writeBOM(fp, updated, hasBOM);
  }
  console.log(`done — ${changed} file(s) ${APPLY ? 'written' : 'would change'}`);
}

main();
