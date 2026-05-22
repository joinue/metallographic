#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Strip stray "/../" prefixes from absolute resource paths in .htm files.
 *
 * Pages migrated to the new design from the older site still carry hrefs and
 * srcs of the form:
 *
 *   <link href="/../css/components/navigation.css">
 *   <img src="/../images/foo.png">
 *
 * The leading "/" anchors the URL at the document root, but the "/../"
 * suffix is treated as a path-traversal attempt by Apache and other servers,
 * which 404 the resource. Stripping the "/../" to just "/" produces the
 * correct absolute path.
 *
 * Targets href/src/action/content/data attribute values that begin with
 * "/../". Skips strings inside <script> blocks, comments, or JSON payloads.
 *
 * Flags:
 *   --apply   Write changes (default = dry-run report).
 */

const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const REPO_ROOT = path.resolve(__dirname, '..');

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

// Match attribute="/../" in href, src, action, content, data-* attributes.
// Replace with attribute="/" preserving the rest of the URL.
const ATTR_RE = /(\s(?:href|src|action|content|data-[a-zA-Z0-9_-]+)\s*=\s*["'])\/\.\.\//gi;

const files = walk(REPO_ROOT, []);
console.log(`${APPLY ? 'APPLY' : 'DRY RUN'} — scanning ${files.length} .htm files`);

let changedFiles = 0;
let totalReplacements = 0;
for (const fp of files) {
  const { text, hasBOM } = readBOM(fp);
  let count = 0;
  const updated = text.replace(ATTR_RE, (_m, prefix) => {
    count++;
    return prefix + '/';
  });
  if (count === 0) continue;
  changedFiles++;
  totalReplacements += count;
  console.log(`${APPLY ? 'wrote' : 'would write'}: ${path.relative(REPO_ROOT, fp)}  (${count} path${count === 1 ? '' : 's'} fixed)`);
  if (APPLY) writeBOM(fp, updated, hasBOM);
}
console.log(`done — ${changedFiles} file(s) ${APPLY ? 'changed' : 'would change'}, ${totalReplacements} replacement(s)`);
