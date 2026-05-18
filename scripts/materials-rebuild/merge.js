/**
 * Merge a category rebuild data.json into materials_rows.csv.
 *
 * - Reads the CSV, adds any new columns (hardness_conditions, strength_conditions,
 *   sources) on first run.
 * - For each material in the category data.json, finds the row by slug and
 *   updates the listed fields. JSON-valued fields are serialized as
 *   double-quote-escaped JSON. Bibliographic short tags in `sources` /
 *   `hardness_conditions[*].source` / `strength_conditions[*].source` are
 *   expanded against the data file's `sources_bibliography`.
 * - Writes the CSV back in place. A .bak is created on first invocation per day.
 *
 * Usage:
 *   node scripts/materials-rebuild/merge.js scripts/materials-rebuild/01-carbon-steel/data.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CSV_PATH = path.join(ROOT, 'materials_rows.csv');

// New columns added to the schema by the rebuild
const NEW_COLUMNS = ['hardness_conditions', 'strength_conditions', 'sources'];

// ---------------------------------------------------------------------------
// CSV state-machine parser/serializer (handles embedded commas/newlines/quotes)
// ---------------------------------------------------------------------------

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += ch; i++; continue;
    }
    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ',') { row.push(field); field = ''; i++; continue; }
    if (ch === '\r') {
      if (text[i + 1] === '\n') i++;
      row.push(field); field = ''; rows.push(row); row = []; i++; continue;
    }
    if (ch === '\n') {
      row.push(field); field = ''; rows.push(row); row = []; i++; continue;
    }
    field += ch; i++;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  if (s === '') return '';
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function serializeCSV(rows) {
  return rows.map(r => r.map(csvEscape).join(',')).join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Bibliography expansion
// ---------------------------------------------------------------------------

function expandSourceTags(value, bibliography) {
  if (Array.isArray(value)) {
    return value.map(tag => bibliography[tag] || tag);
  }
  if (typeof value === 'string') {
    // "ASTM-A29; CCS-1018" -> two expansions joined by "; "
    return value.split(/\s*;\s*/).map(tag => bibliography[tag] || tag).join('; ');
  }
  return value;
}

function expandConditionSources(conditions, bibliography) {
  return conditions.map(c => {
    const out = { ...c };
    if (out.source) out.source = expandSourceTags(out.source, bibliography);
    return out;
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const dataPath = process.argv[2];
  if (!dataPath) {
    console.error('Usage: node merge.js <category-data.json>');
    process.exit(1);
  }
  const dataFile = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const bibliography = dataFile.sources_bibliography || {};

  const csvText = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(csvText);

  // Drop trailing empty rows the parser may leave
  while (rows.length && rows[rows.length - 1].length <= 1 && (rows[rows.length - 1][0] || '') === '') {
    rows.pop();
  }

  let headers = rows[0].map(h => h.trim());

  // Ensure new columns exist
  let addedColumns = [];
  for (const col of NEW_COLUMNS) {
    if (!headers.includes(col)) {
      headers.push(col);
      addedColumns.push(col);
      // Pad every data row with empty cell
      for (let r = 1; r < rows.length; r++) {
        while (rows[r].length < headers.length - 1) rows[r].push('');
        rows[r].push('');
      }
    }
  }
  rows[0] = headers;

  // Index by slug
  const slugIdx = headers.indexOf('slug');
  if (slugIdx === -1) { console.error('No slug column'); process.exit(1); }
  const rowBySlug = {};
  for (let r = 1; r < rows.length; r++) {
    const s = rows[r][slugIdx];
    if (s) rowBySlug[s] = r;
  }

  // Backup before writing (once per day)
  const bakDir = path.join(ROOT, 'scripts', 'materials-rebuild', '_backups');
  if (!fs.existsSync(bakDir)) fs.mkdirSync(bakDir, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const bakPath = path.join(bakDir, `materials_rows.${today}.csv.bak`);
  if (!fs.existsSync(bakPath)) {
    fs.writeFileSync(bakPath, csvText);
    console.log(`Backup written: ${bakPath}`);
  }

  // Apply updates
  let updateCount = 0;
  let unmatched = [];
  for (const mat of dataFile.materials) {
    const slug = mat.slug;
    const r = rowBySlug[slug];
    if (r === undefined) { unmatched.push(slug); continue; }
    const updates = mat.updates || {};
    for (const [field, value] of Object.entries(updates)) {
      const col = headers.indexOf(field);
      if (col === -1) {
        console.warn(`  (skip) unknown column "${field}" in ${slug}`);
        continue;
      }
      let serialized;
      if (Array.isArray(value)) {
        if (field === 'sources') {
          serialized = JSON.stringify(value.map(tag => bibliography[tag] || tag));
        } else if (field === 'hardness_conditions' || field === 'strength_conditions') {
          serialized = JSON.stringify(expandConditionSources(value, bibliography));
        } else {
          serialized = JSON.stringify(value);
        }
      } else if (typeof value === 'object' && value !== null) {
        serialized = JSON.stringify(value);
      } else {
        serialized = value == null ? '' : String(value);
      }
      rows[r][col] = serialized;
    }
    updateCount++;
  }

  if (addedColumns.length) {
    console.log(`Added columns: ${addedColumns.join(', ')}`);
  }
  console.log(`Updated ${updateCount} materials from ${path.basename(dataPath)}`);
  if (unmatched.length) {
    console.log(`Unmatched slugs (${unmatched.length}): ${unmatched.join(', ')}`);
  }

  fs.writeFileSync(CSV_PATH, serializeCSV(rows));
  console.log(`Wrote ${CSV_PATH}`);
}

main();
