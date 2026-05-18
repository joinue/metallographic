/**
 * Bump the top padding on the reconstruction banner so it clears the fixed
 * navigation (the site's standard top-header uses 125px padding-top; the
 * original banner used 4rem ≈ 64px which felt cramped).
 *
 * Targets every file that contains the HIDDEN-BY-RECONSTRUCTION-BANNER marker.
 * Safe to re-run.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const MARKER = 'HIDDEN-BY-RECONSTRUCTION-BANNER';
const OLD_STYLE = 'style="padding: 4rem 1rem; min-height: 50vh; display: flex; align-items: center; justify-content: center;"';
const NEW_STYLE = 'style="padding: 9rem 1rem 4rem; min-height: 60vh; display: flex; align-items: center; justify-content: center;"';

function walk(dir, out) {
  const skip = new Set(['node_modules', '_backups', '_nav_footer_rollout_backups',
                         'link_case_backups', 'navigation_backups', 'scripts']);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

let updated = 0, alreadyOk = 0, noMarker = 0;
for (const file of walk(ROOT, [])) {
  let html;
  try { html = fs.readFileSync(file, 'utf8'); }
  catch (e) { continue; }
  if (!html.includes(MARKER)) { noMarker++; continue; }
  if (!html.includes(OLD_STYLE)) { alreadyOk++; continue; }
  html = html.replace(OLD_STYLE, NEW_STYLE);
  fs.writeFileSync(file, html);
  updated++;
}

console.log(`Updated: ${updated}`);
console.log(`Already at new spacing: ${alreadyOk}`);
console.log(`No banner marker (skipped): ${noMarker}`);
