#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Remove deprecated tool entries from the duplicated navigation menus in
 * every HTML file in the repo.
 *
 * Deprecated tools (sales owns the prep-recommendation conversation; these
 * crossed that line):
 *   - polishing-time-calculator
 *   - procedure-time-estimator
 *
 * Each menu entry is a single line of the form:
 *   <li><a href="/tools/polishing-time-calculator.html">...</a></li>
 *   <li><a href="/tools/procedure-time-estimator.html">...</a></li>
 * Both with and without an inner <span> wrapper, and with varying
 * indentation. We remove whole matching lines.
 *
 * Flags:
 *   --apply   Write changes (default = dry-run report).
 *   --quiet   Suppress per-file logging.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const QUIET = process.argv.includes('--quiet');

const SKIP_DIR_NAMES = new Set([
  'node_modules',
  '.git',
  'scripts',
  '.claude',
]);
function shouldSkipDir(name) {
  if (SKIP_DIR_NAMES.has(name)) return true;
  if (/backup/i.test(name)) return true;
  return false;
}

// Match a whole line whose only content is an <li><a> for one of the
// deprecated tools. Tolerates leading/trailing whitespace and the optional
// <span> wrapper.
const TOOL_LI_RE = /^\s*<li>\s*<a\s+href="\/tools\/(?:polishing-time-calculator|procedure-time-estimator)\.html"[^>]*>(?:<span[^>]*>[^<]*<\/span>|[^<]*)<\/a>\s*<\/li>\s*$/i;

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

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

const allFiles = walk(REPO_ROOT, []);
console.log(`${APPLY ? 'APPLY' : 'DRY RUN'} — scanning ${allFiles.length} HTML files`);

let filesChanged = 0;
let linesRemoved = 0;
for (const fp of allFiles) {
  const { text, hasBOM } = readBOM(fp);
  // Split on either CRLF or LF, capturing each terminator so we can preserve
  // the original line-ending mix (some files in this repo are mixed).
  const parts = text.split(/(\r\n|\n)/);
  // parts is [line, term, line, term, ..., lastLine] (possibly no trailing term).
  const kept = [];
  let removed = 0;
  for (let i = 0; i < parts.length; i += 2) {
    const line = parts[i];
    const term = parts[i + 1] ?? '';
    if (TOOL_LI_RE.test(line)) {
      removed++;
    } else {
      kept.push(line, term);
    }
  }
  if (removed === 0) continue;
  filesChanged++;
  linesRemoved += removed;
  if (!QUIET) {
    const rel = path.relative(REPO_ROOT, fp);
    console.log(`${APPLY ? 'wrote' : 'would write'}: ${rel} (-${removed} line${removed === 1 ? '' : 's'})`);
  }
  if (APPLY) writeBOM(fp, kept.join(''), hasBOM);
}

console.log(`done — ${filesChanged} file(s) ${APPLY ? 'changed' : 'would change'}, ${linesRemoved} line(s) removed`);
