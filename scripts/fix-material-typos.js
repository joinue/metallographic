/**
 * Fix three systemic issues across all material HTML pages:
 * 1. "mediumness" → "medium hardness" (40 files)
 * 2. "seconds))" → "seconds)" (100 files)
 * 3. ". the hard" → ". The hard" (30+ files)
 */
const fs = require('fs');
const path = require('path');

const materialsDir = path.join(__dirname, '..', 'materials');
const files = fs.readdirSync(materialsDir).filter(f => f.endsWith('.html'));

let stats = { mediumness: 0, doubleParen: 0, lowercaseThe: 0 };

files.forEach(file => {
  const filePath = path.join(materialsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix 1: "mediumness" → "medium hardness"
  if (content.includes('mediumness')) {
    content = content.replace(/mediumness/g, 'medium hardness');
    stats.mediumness++;
  }

  // Fix 2: "seconds))" → "seconds)"
  if (content.includes('seconds))')) {
    content = content.replace(/seconds\)\)/g, 'seconds)');
    stats.doubleParen++;
  }

  // Fix 3: ". the hard" → ". The hard" (lowercase sentence start)
  if (content.includes('. the hard')) {
    content = content.replace(/\. the hard/g, '. The hard');
    stats.lowercaseThe++;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Fix results:');
console.log(`  "mediumness" → "medium hardness": ${stats.mediumness} files`);
console.log(`  "seconds))" → "seconds)": ${stats.doubleParen} files`);
console.log(`  ". the hard" → ". The hard": ${stats.lowercaseThe} files`);
console.log(`  Total files scanned: ${files.length}`);
