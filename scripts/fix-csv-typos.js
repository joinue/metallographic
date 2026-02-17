/**
 * Fix three systemic issues in materials_rows.csv
 */
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'materials_rows.csv');
let content = fs.readFileSync(csvPath, 'utf8');

const before = content.length;

// Fix 1: "mediumness" → "medium hardness"
content = content.replace(/mediumness/g, 'medium hardness');

// Fix 2: "seconds))" → "seconds)"
content = content.replace(/seconds\)\)/g, 'seconds)');

// Fix 3: ". the hard" → ". The hard"
content = content.replace(/\. the hard/g, '. The hard');

fs.writeFileSync(csvPath, content, 'utf8');

console.log(`CSV fixed. Size: ${before} → ${content.length} bytes`);
