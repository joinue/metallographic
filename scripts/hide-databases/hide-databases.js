/**
 * Hide all databases (Materials, Etchants, Standards, Etchant Selector, and the
 * /databases hub) by:
 *   1. Replacing <main>...</main> on each database page with a reconstruction
 *      banner that links to /contact and /support.
 *   2. Adding <meta name="robots" content="noindex,nofollow"> to those pages.
 *   3. Stripping the Databases dropdown (mobile + desktop) and the Etchant
 *      Selector link from the navigation in EVERY html file under the site root.
 *   4. Removing database URLs from sitemap.xml.
 *
 * Every modified file is backed up to scripts/hide-databases/_backups/<relative>
 * (preserving directory layout) so this is reversible via a sibling restore.js.
 *
 * Usage:
 *   node scripts/hide-databases/hide-databases.js           # dry run, report only
 *   node scripts/hide-databases/hide-databases.js --apply   # actually modify files
 *   node scripts/hide-databases/hide-databases.js --apply --only=<file>
 *
 * Run from anywhere; paths are resolved relative to the script.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const BACKUP_DIR = path.join(__dirname, '_backups');

const APPLY = process.argv.includes('--apply');
const ONLY_FLAG = process.argv.find(a => a.startsWith('--only='));
const ONLY = ONLY_FLAG ? ONLY_FLAG.split('=')[1] : null;

// ---------------------------------------------------------------------------
// What counts as a "database page"
// ---------------------------------------------------------------------------

// Etchants and the etchant-selector were reactivated 2026-05-19 — script no
// longer touches /etchants (hub + detail pages) or /etchant-selector.html
// (now a live Materials Prep landing page).
const DATABASE_PARENT_PAGES = [
  'databases.html',
  'materials.html',
  'standards.html',
];

function listDatabaseDetailPages() {
  const pages = [];
  for (const dir of ['materials']) {
    const full = path.join(ROOT, dir);
    if (!fs.existsSync(full)) continue;
    for (const f of fs.readdirSync(full)) {
      if (f.endsWith('.html')) pages.push(path.join(dir, f));
    }
  }
  return pages;
}

// ---------------------------------------------------------------------------
// All HTML files site-wide (for nav stripping). Excludes backup directories.
// ---------------------------------------------------------------------------

function listAllHtmlFiles() {
  const out = [];
  const skip = new Set([
    'node_modules', '_backups', '_nav_footer_rollout_backups',
    'link_case_backups', 'navigation_backups', 'scripts',
  ]);
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (skip.has(entry.name)) continue;
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.isFile() && entry.name.endsWith('.html')) {
        out.push(path.relative(ROOT, p));
      }
    }
  }
  walk(ROOT);
  return out;
}

// ---------------------------------------------------------------------------
// Backup helpers
// ---------------------------------------------------------------------------

function backupFile(relPath) {
  const src = path.join(ROOT, relPath);
  const dst = path.join(BACKUP_DIR, relPath);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  if (!fs.existsSync(dst)) fs.copyFileSync(src, dst);
}

// ---------------------------------------------------------------------------
// Holding-page <main> content
// ---------------------------------------------------------------------------

const HOLDING_MAIN = `    <!-- Main Content -->
    <!-- HIDDEN-BY-RECONSTRUCTION-BANNER 2026-05-13 -->
    <main id="main-content" class="page-under-reconstruction" role="main">
        <div class="container-custom" style="padding: 9rem 1rem 4rem; min-height: 60vh; display: flex; align-items: center; justify-content: center;">
            <div role="alert" aria-live="polite" style="max-width: 720px; width: 100%; background: #fffbeb; border: 2px solid #f59e0b; border-radius: 8px; padding: 2.5rem; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin: 0 auto 1rem; display: block;">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <h1 style="margin: 0 0 0.75rem; color: #92400e; font-size: 1.75rem; font-weight: 700;">This database is under reconstruction</h1>
                <p style="color: #78350f; line-height: 1.6; margin: 0 0 1rem; font-size: 1rem;">
                    We are revising our materials, etchants, and standards databases to verify every property and procedure against primary sources. The existing content has been taken offline while this work is completed.
                </p>
                <p style="color: #78350f; line-height: 1.6; margin: 0 0 2rem; font-size: 1rem;">
                    For current technical information, please contact PACE Technologies directly &mdash; we are happy to help.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="/contact.html" class="btn-primary" style="padding: 0.75rem 1.5rem; background: #1e40af; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Contact Us
                    </a>
                    <a href="/support.html" class="btn-tertiary" style="padding: 0.75rem 1.5rem; background: white; color: #92400e; text-decoration: none; border: 2px solid #f59e0b; border-radius: 6px; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        Browse Support
                    </a>
                </div>
            </div>
        </div>
    </main>
`;

// ---------------------------------------------------------------------------
// Per-database-page transformation
// ---------------------------------------------------------------------------

function hideDatabasePage(relPath) {
  const full = path.join(ROOT, relPath);
  let html = fs.readFileSync(full, 'utf8');

  // 1) Idempotency check — already hidden?
  if (html.includes('HIDDEN-BY-RECONSTRUCTION-BANNER')) {
    return { relPath, action: 'skip-already-hidden' };
  }

  // 2) Replace <main ...>...</main> with the holding main.
  //    There can be inline comments, attributes, classes — match the first
  //    opening <main and the LAST </main> to be safe.
  const mainOpen = html.search(/<main\b[^>]*>/);
  if (mainOpen === -1) return { relPath, action: 'skip-no-main' };
  const mainClose = html.lastIndexOf('</main>');
  if (mainClose === -1 || mainClose < mainOpen) return { relPath, action: 'skip-malformed-main' };

  // Find the start of the line containing the <main tag, to keep indentation
  // aesthetics on the surrounding HTML — but the HOLDING_MAIN brings its own
  // leading indent and trailing newline.
  const before = html.slice(0, mainOpen);
  const after = html.slice(mainClose + '</main>'.length);

  // Strip any preceding "<!-- Main Content -->" comment to avoid duplicates.
  const beforeStripped = before.replace(/[ \t]*<!--\s*Main Content\s*-->\s*\n?$/i, '');

  html = beforeStripped + HOLDING_MAIN + after;

  // 3) Add noindex,nofollow meta if not already present.
  if (!/<meta\s+name=["']robots["']/.test(html)) {
    html = html.replace(/(<meta\s+charset[^>]*>\s*)/i,
      `$1\n    <meta name="robots" content="noindex,nofollow">`);
  } else {
    // Update existing robots tag.
    html = html.replace(/<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="robots" content="noindex,nofollow">`);
  }

  if (APPLY) {
    backupFile(relPath);
    fs.writeFileSync(full, html);
  }
  return { relPath, action: 'hidden' };
}

// ---------------------------------------------------------------------------
// Nav-strip transformation (applied to EVERY HTML file)
// ---------------------------------------------------------------------------

// Desktop nav block — Databases dropdown <li>
// Matches from <li> containing href="/databases.html" with "Databases" label
// through to its </li>. Use a tolerant regex that handles arbitrary whitespace.
const DESKTOP_DATABASES_RE =
  /[ \t]*<li>\s*<a href="\/databases\.html">\s*<span>\s*Databases[\s\S]*?<\/ul>\s*<\/li>\s*\n?/g;

// Mobile nav block — Databases subsection
const MOBILE_DATABASES_RE =
  /[ \t]*<li class="mobile-nav-subsection">\s*<div class="mobile-nav-header">\s*<a href="\/databases\.html"[\s\S]*?<\/ul>\s*<\/li>\s*\n?/g;

// Tools submenu — drop Etchant Selector entry (both formats observed)
const ETCHANT_SELECTOR_LINKS = [
  /[ \t]*<li><a href="\/etchant-selector\.html"><span>Etchant Selector<\/span><\/a><\/li>\s*\n?/g,
  /[ \t]*<li><a href="\/etchant-selector\.html">Etchant Selector<\/a><\/li>\s*\n?/g,
];

// Footer-link <li> entries for the hidden databases. Footer markup is more
// permissive: `<li><a href="/databases.html" class="footer-link">Databases</a></li>`
// is the dominant form, but allow attribute order to vary.
const FOOTER_DB_LINKS = [
  /[ \t]*<li><a href="\/databases\.html" class="footer-link">[^<]*<\/a><\/li>\s*\n?/g,
  /[ \t]*<li><a href="\/materials\.html" class="footer-link">[^<]*<\/a><\/li>\s*\n?/g,
  /[ \t]*<li><a href="\/etchants\.html" class="footer-link">[^<]*<\/a><\/li>\s*\n?/g,
  /[ \t]*<li><a href="\/standards\.html" class="footer-link">[^<]*<\/a><\/li>\s*\n?/g,
  /[ \t]*<li><a href="\/etchant-selector\.html" class="footer-link">[^<]*<\/a><\/li>\s*\n?/g,
];

function stripDatabasesFromNav(relPath) {
  const full = path.join(ROOT, relPath);
  let html;
  try { html = fs.readFileSync(full, 'utf8'); }
  catch (e) { return { relPath, action: 'nav-read-error', error: e.code || String(e) }; }
  const original = html;

  const before = {
    desktop: (html.match(DESKTOP_DATABASES_RE) || []).length,
    mobile: (html.match(MOBILE_DATABASES_RE) || []).length,
    etchantSel: ETCHANT_SELECTOR_LINKS.reduce((n, re) => n + (html.match(re) || []).length, 0),
    footer: FOOTER_DB_LINKS.reduce((n, re) => n + (html.match(re) || []).length, 0),
  };

  html = html.replace(DESKTOP_DATABASES_RE, '');
  html = html.replace(MOBILE_DATABASES_RE, '');
  for (const re of ETCHANT_SELECTOR_LINKS) html = html.replace(re, '');
  for (const re of FOOTER_DB_LINKS) html = html.replace(re, '');

  if (html === original) return { relPath, action: 'nav-no-change', counts: before };

  if (APPLY) {
    backupFile(relPath);
    fs.writeFileSync(full, html);
  }
  return { relPath, action: 'nav-stripped', counts: before };
}

// ---------------------------------------------------------------------------
// Sitemap trim
// ---------------------------------------------------------------------------

function trimSitemap() {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return { action: 'sitemap-not-found' };
  let xml = fs.readFileSync(sitemapPath, 'utf8');
  const original = xml;
  // Match each <url>...</url> block whose <loc> includes one of the database paths.
  const dbPathRe = /\/(materials|etchants|standards|databases|etchant-selector)(\/|\.html|<)/i;
  xml = xml.replace(/[ \t]*<url>[\s\S]*?<\/url>\s*\n?/g, (block) => {
    return dbPathRe.test(block) ? '' : block;
  });
  if (xml === original) return { action: 'sitemap-no-change' };
  if (APPLY) {
    backupFile('sitemap.xml');
    fs.writeFileSync(sitemapPath, xml);
  }
  return { action: 'sitemap-trimmed', sizeBefore: original.length, sizeAfter: xml.length };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log(`Mode: ${APPLY ? 'APPLY (writing files)' : 'DRY RUN (no writes)'}\n`);

  const dbParents = DATABASE_PARENT_PAGES.filter(f => fs.existsSync(path.join(ROOT, f)));
  const dbDetails = listDatabaseDetailPages();
  const dbAll = [...dbParents, ...dbDetails];
  const targetSet = ONLY ? dbAll.filter(p => p.endsWith(ONLY) || p === ONLY) : dbAll;

  // --- 1. Hide database pages ---
  console.log(`=== 1. Database page hiding (${targetSet.length} files) ===`);
  const dbResults = { hidden: 0, skipped: 0, malformed: 0 };
  for (const rel of targetSet) {
    const r = hideDatabasePage(rel);
    if (r.action === 'hidden') dbResults.hidden++;
    else if (r.action === 'skip-already-hidden') dbResults.skipped++;
    else { dbResults.malformed++; console.log(`  [WARN] ${r.relPath}: ${r.action}`); }
  }
  console.log(`  Hidden: ${dbResults.hidden}, Already-hidden: ${dbResults.skipped}, Malformed: ${dbResults.malformed}\n`);

  // --- 2. Strip Databases nav from every HTML ---
  if (!ONLY) {
    console.log(`=== 2. Nav stripping (site-wide) ===`);
    const allHtml = listAllHtmlFiles();
    let stripped = 0, unchanged = 0, errors = 0;
    for (const rel of allHtml) {
      const r = stripDatabasesFromNav(rel);
      if (r.action === 'nav-stripped') stripped++;
      else if (r.action === 'nav-read-error') { errors++; console.log(`  [skip] ${rel}: ${r.error}`); }
      else unchanged++;
    }
    console.log(`  Files scanned: ${allHtml.length}`);
    console.log(`  Files with nav changes: ${stripped}`);
    console.log(`  Files unchanged: ${unchanged}`);
    console.log(`  Read errors (skipped): ${errors}\n`);

    // --- 3. Sitemap ---
    console.log(`=== 3. Sitemap trim ===`);
    const sm = trimSitemap();
    console.log(`  ${sm.action}` + (sm.sizeBefore ? `  (${sm.sizeBefore} → ${sm.sizeAfter} bytes)` : '') + '\n');
  }

  console.log(`Done.${APPLY ? '' : '  Re-run with --apply to actually modify files.'}`);
}

main();
