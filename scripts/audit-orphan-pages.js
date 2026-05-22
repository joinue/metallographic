#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Identify pages that exist in the repo but are NOT reachable by clicking
 * through internal links from the homepage. The reachable set is the
 * transitive closure of href targets starting from index.html — which
 * includes nav menus, footers, and any in-content link on any page that's
 * itself reachable.
 *
 * Output:
 *   - Group 1: pages with the legacy design (no <nav class="navigation">)
 *   - Group 2: pages with the modern design that are unreachable
 *
 * Excludes from analysis:
 *   - metallography.org/ (separate Next.js project)
 *   - scripts/, node_modules/, .git/, .claude/, backup dirs
 *   - navigation.html, footer.html (canonical component sources, not served)
 *   - templates/ (development scaffolding, intentionally unlinked)
 *
 * Caveats:
 *   - Static HTML link extraction only. Pages whose links are generated
 *     dynamically by JavaScript (e.g. guide grids built from a data file)
 *     will appear as if they don't link out, and their targets may be
 *     flagged as orphans even though they're reachable in a browser.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SEED = ['index.html'];

const SKIP_DIRS = new Set(['node_modules', '.git', 'scripts', '.claude', 'metallography.org', 'templates']);
function shouldSkipDir(name) {
  if (SKIP_DIRS.has(name)) return true;
  if (/backup/i.test(name)) return true;
  return false;
}

const EXCLUDED_FILES = new Set([
  'navigation.html',
  'footer.html',
]);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.htm'))) {
      const rel = path.relative(REPO_ROOT, path.join(dir, entry.name)).replace(/\\/g, '/');
      if (EXCLUDED_FILES.has(rel)) continue;
      out.push(rel);
    }
  }
  return out;
}

const allPages = walk(REPO_ROOT, []);
const allPagesSet = new Set(allPages);

// Normalize an href to a repo-relative path matching one of our files.
// Returns null if the href is external, non-page, or doesn't resolve.
function normalizeHref(href, currentPage) {
  if (!href) return null;
  href = href.trim();
  if (!href) return null;
  if (/^(mailto|tel|javascript|data|sms):/i.test(href)) return null;
  if (/^https?:\/\//i.test(href)) return null;
  if (/^\/\//.test(href)) return null;
  // Strip query and hash
  href = href.split('?')[0].split('#')[0];
  if (!href) return null;

  let resolved;
  if (href.startsWith('/')) {
    resolved = href.slice(1);
  } else {
    // Resolve relative to current page's directory
    const dir = path.posix.dirname(currentPage);
    resolved = path.posix.normalize(path.posix.join(dir, href));
  }
  if (resolved === '' || resolved === '.' || resolved === '/') resolved = 'index.html';
  if (resolved.endsWith('/')) resolved = resolved + 'index.html';

  // If it already has .html or .htm extension, return as-is if it exists
  if (/\.html?$/i.test(resolved)) {
    return allPagesSet.has(resolved) ? resolved : null;
  }

  // Extensionless: try .html, .htm, then /index.html
  if (allPagesSet.has(resolved + '.html')) return resolved + '.html';
  if (allPagesSet.has(resolved + '.htm')) return resolved + '.htm';
  if (allPagesSet.has(resolved + '/index.html')) return resolved + '/index.html';
  if (allPagesSet.has(resolved + '/index.htm')) return resolved + '/index.htm';
  return null;
}

const LINK_RE = /\bhref\s*=\s*["']([^"']+)["']/gi;

function extractLinks(filePath) {
  let text;
  try {
    text = fs.readFileSync(path.join(REPO_ROOT, filePath), 'utf8');
  } catch (e) {
    return [];
  }
  const links = new Set();
  let m;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    const norm = normalizeHref(m[1], filePath);
    if (norm) links.add(norm);
  }
  return [...links];
}

// BFS from seed
const visited = new Set();
const queue = [...SEED];
while (queue.length > 0) {
  const page = queue.shift();
  if (visited.has(page)) continue;
  if (!allPagesSet.has(page)) continue;
  visited.add(page);
  const links = extractLinks(page);
  for (const link of links) {
    if (!visited.has(link)) queue.push(link);
  }
}

// Classify each unreachable page by design
const NAV_MARKER = '<nav class="navigation"';
function pageDesign(filePath) {
  try {
    const text = fs.readFileSync(path.join(REPO_ROOT, filePath), 'utf8');
    return text.includes(NAV_MARKER) ? 'modern' : 'legacy';
  } catch {
    return 'unknown';
  }
}

const orphans = allPages.filter(p => !visited.has(p));
const legacyOrphans = [];
const modernOrphans = [];
for (const p of orphans) {
  const design = pageDesign(p);
  if (design === 'modern') modernOrphans.push(p);
  else legacyOrphans.push(p);
}

// Also: reachable legacy pages (modern site still links to them!)
const reachableLegacy = [...visited].filter(p => pageDesign(p) === 'legacy').sort();

legacyOrphans.sort();
modernOrphans.sort();

function byDir(list) {
  const groups = {};
  for (const p of list) {
    const dir = path.posix.dirname(p) || '.';
    if (!groups[dir]) groups[dir] = [];
    groups[dir].push(p);
  }
  return Object.keys(groups).sort().map(dir => ({ dir, files: groups[dir] }));
}

console.log(`Total pages scanned: ${allPages.length}`);
console.log(`Reachable from ${SEED.join(', ')}: ${visited.size}`);
console.log(`Unreachable (orphan): ${orphans.length}`);
console.log(`  - Legacy design: ${legacyOrphans.length}`);
console.log(`  - Modern design: ${modernOrphans.length}`);
console.log(`Reachable but legacy design (still linked from live site!): ${reachableLegacy.length}`);
console.log('');

console.log('===========================================================');
console.log('GROUP 1 — LEGACY DESIGN, UNREACHABLE');
console.log('===========================================================');
for (const { dir, files } of byDir(legacyOrphans)) {
  console.log(`\n[${dir}]  (${files.length})`);
  for (const f of files) console.log(`  ${f}`);
}

console.log('');
console.log('===========================================================');
console.log('GROUP 2 — MODERN DESIGN, UNREACHABLE');
console.log('===========================================================');
for (const { dir, files } of byDir(modernOrphans)) {
  console.log(`\n[${dir}]  (${files.length})`);
  for (const f of files) console.log(`  ${f}`);
}

console.log('');
console.log('===========================================================');
console.log('BONUS — LEGACY DESIGN but REACHABLE (still linked from live site)');
console.log('===========================================================');
if (reachableLegacy.length === 0) {
  console.log('  (none)');
} else {
  for (const f of reachableLegacy) console.log(`  ${f}`);
}
