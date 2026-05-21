#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Inlines /footer.html into every public-facing HTML page. Source of truth
 * is /footer.html — edit it, re-run this script, commit. Every page ships
 * with the footer rendered server-side (full SEO + no CLS).
 *
 * Handles three starting states for each page:
 *   1. Page has the canonical inline footer  → replaced (idempotent re-run)
 *   2. Page has an older inline footer       → replaced
 *   3. Page has the fetch-include snippet    → replaced (recovery from prior rollout)
 *
 * Flags:
 *   --dry-run   Report what would change; write nothing.
 *   --quiet     Suppress per-file logging.
 *   --only=a,b  Restrict to specific paths (relative to repo root).
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const FOOTER_SOURCE = path.join(REPO_ROOT, 'footer.html');

// Read the source of truth.
if (!fs.existsSync(FOOTER_SOURCE)) {
  console.error(`Source footer not found at ${FOOTER_SOURCE}`);
  process.exit(1);
}
const FOOTER_HTML = fs.readFileSync(FOOTER_SOURCE, 'utf8').trimEnd();

// Directories we never touch.
const SKIP_DIR_NAMES = new Set([
  'node_modules',
  '.git',
  'scripts',
  '.claude',
]);

function shouldSkipDir(name) {
  if (SKIP_DIR_NAMES.has(name)) return true;
  if (/backup/i.test(name)) return true;  // navigation_backups, _backups, etc.
  return false;
}

// Don't rewrite the source itself.
const SKIP_FILES = new Set([FOOTER_SOURCE]);

// Pattern: fetch-include snippet inserted by the previous rollout.
const FETCH_RE = /(?:<!--\s*footer\s*-->\s*)?<div id="footer-container">[\s\S]*?<\/script>/i;

// Pattern: any inline <footer class="footer">…</footer> (canonical or legacy).
const INLINE_RE = /(?:<!--\s*footer\s*-->\s*)?<footer\s+class="footer"[\s\S]*?<\/footer>/i;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const quiet = args.includes('--quiet');
const onlyArg = args.find((a) => a.startsWith('--only='));
const onlyList = onlyArg
  ? onlyArg.slice('--only='.length).split(',').map((p) => path.resolve(REPO_ROOT, p))
  : null;

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const full = path.join(dir, entry.name);
      if (SKIP_FILES.has(full)) continue;
      out.push(full);
    }
  }
  return out;
}

const allFiles = onlyList || walk(REPO_ROOT, []);

const stats = {
  scanned: 0,
  fromFetch: 0,         // converted from the fetch-include snippet
  fromInline: 0,        // converted from an inline footer (canonical or legacy)
  unchanged: 0,         // already matched footer.html exactly
  noFooter: 0,
  noFooterPaths: [],
};

for (const file of allFiles) {
  stats.scanned++;
  const original = fs.readFileSync(file, 'utf8');

  let updated;
  let source;
  if (FETCH_RE.test(original)) {
    updated = original.replace(FETCH_RE, FOOTER_HTML);
    source = 'fetch';
  } else if (INLINE_RE.test(original)) {
    updated = original.replace(INLINE_RE, FOOTER_HTML);
    source = 'inline';
  } else {
    stats.noFooter++;
    stats.noFooterPaths.push(path.relative(REPO_ROOT, file));
    continue;
  }

  if (updated === original) {
    stats.unchanged++;
    continue;
  }

  if (!dryRun) {
    fs.writeFileSync(file, updated, 'utf8');
  }
  if (source === 'fetch') stats.fromFetch++;
  else stats.fromInline++;

  if (!quiet) {
    console.log(`${dryRun ? '[dry] ' : ''}[${source}] ${path.relative(REPO_ROOT, file)}`);
  }
}

console.log('---');
console.log(`Source footer:     ${path.relative(REPO_ROOT, FOOTER_SOURCE)} (${FOOTER_HTML.length} bytes)`);
console.log(`Scanned:           ${stats.scanned}`);
console.log(`From fetch-include:${stats.fromFetch}${dryRun ? ' (dry-run)' : ''}`);
console.log(`From inline:       ${stats.fromInline}${dryRun ? ' (dry-run)' : ''}`);
console.log(`Unchanged:         ${stats.unchanged} (already canonical)`);
console.log(`No footer found:   ${stats.noFooter}`);
if (stats.noFooterPaths.length && stats.noFooterPaths.length <= 30) {
  console.log('No-footer files:');
  for (const p of stats.noFooterPaths) console.log(`  ${p}`);
} else if (stats.noFooterPaths.length) {
  console.log(`(${stats.noFooterPaths.length} files had no footer)`);
}
