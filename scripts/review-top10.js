const fs = require('fs');
const Papa = require('../node_modules/papaparse/papaparse.min.js');

const csvPath = __dirname + '/../materials_rows.csv';
const csvText = fs.readFileSync(csvPath, 'utf8');

const result = Papa.parse(csvText, { header: true, skipEmptyLines: true });

const targetSlugs = [
  'aisi-1020-low-carbon-steel',
  '304-stainless-steel',
  '6061-aluminum',
  '7075-aluminum',
  'aisi-4140-alloy-steel',
  'gray-cast-iron',
  'ti-6al-4v',
  'inconel-718',
  'd2-tool-steel',
  'ductile-cast-iron'
];

const fields = [
  'sectioning_notes',
  'mounting_notes',
  'grinding_notes',
  'polishing_notes',
  'etching_notes',
  'etchant_1_name',
  'etchant_1_description'
];

// Build a lookup by slug
const bySlug = {};
for (const row of result.data) {
  if (row.slug) bySlug[row.slug] = row;
}

// Check if etchant fields are separate columns or embedded in common_etchants
const hasEtchantColumns = result.meta.fields.includes('etchant_1_name');

for (const slug of targetSlugs) {
  const row = bySlug[slug];
  console.log('='.repeat(80));
  if (!row) {
    console.log(`SLUG: ${slug}  --  NOT FOUND IN CSV`);
    console.log('');
    continue;
  }
  console.log(`SLUG: ${slug}`);
  console.log(`NAME: ${row.name || '(empty)'}`);
  console.log('-'.repeat(80));

  for (const field of fields) {
    const value = row[field];
    if (value !== undefined) {
      const display = value ? value.substring(0, 500) : '(empty)';
      console.log(`  ${field}:`);
      console.log(`    ${display}`);
    } else {
      // Field not in CSV columns
      if (field === 'etchant_1_name') {
        const ce = row.common_etchants || '';
        console.log(`  ${field}: (not a CSV column; common_etchants shown instead)`);
        console.log(`    ${ce.substring(0, 300) || '(empty)'}`);
      } else if (field === 'etchant_1_description') {
        console.log(`  ${field}: (not a CSV column)`);
      } else {
        console.log(`  ${field}: (column not found)`);
      }
    }
  }
  console.log('');
}

// Summary
console.log('='.repeat(80));
console.log('SUMMARY');
const found = targetSlugs.filter(s => bySlug[s]);
const missing = targetSlugs.filter(s => !bySlug[s]);
console.log(`Found: ${found.length} / ${targetSlugs.length}`);
if (missing.length) console.log(`Missing: ${missing.join(', ')}`);
