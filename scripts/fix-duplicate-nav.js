#!/usr/bin/env node

/**
 * Emergency fix script to remove duplicate <ul> tags created by update-navigation.js
 */

const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (file.startsWith('.') || file === 'node_modules' || file === '.git') {
            return;
        }
        
        if (stat.isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

function fixDuplicates(content) {
    let updated = content;
    let changesMade = false;

    // Fix duplicate <ul class="sub-menu-second-level"> tags
    // Pattern: <ul class="sub-menu-second-level"> followed immediately by another <ul class="sub-menu-second-level">
    const duplicateDesktopPattern = /<ul class="sub-menu-second-level">\s*<ul class="sub-menu-second-level">/g;
    if (duplicateDesktopPattern.test(updated)) {
        updated = updated.replace(duplicateDesktopPattern, '<ul class="sub-menu-second-level">');
        changesMade = true;
    }

    // Fix duplicate closing </ul> tags that might have been created
    // Pattern: </ul> followed by </ul> with only whitespace between
    const duplicateClosePattern = /<\/ul>\s*<\/ul>\s*(<\/li>)/g;
    if (duplicateClosePattern.test(updated)) {
        updated = updated.replace(duplicateClosePattern, '</ul>\n                    $1');
        changesMade = true;
    }

    return { content: updated, changesMade };
}

function main() {
    const rootDir = path.join(__dirname, '..');
    const htmlFiles = findHtmlFiles(rootDir);
    
    console.log(`Found ${htmlFiles.length} HTML files`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    htmlFiles.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Only process files that might have duplicates
            if (content.includes('sub-menu-second-level') || content.includes('sub-menu second-level')) {
                const { content: updatedContent, changesMade } = fixDuplicates(content);
                
                if (changesMade) {
                    fs.writeFileSync(filePath, updatedContent, 'utf8');
                    console.log(`✓ Fixed: ${path.relative(rootDir, filePath)}`);
                    updatedCount++;
                }
            }
        } catch (error) {
            console.error(`✗ Error processing ${filePath}:`, error.message);
            errorCount++;
        }
    });
    
    console.log(`\nSummary:`);
    console.log(`  Files fixed: ${updatedCount}`);
    console.log(`  Errors: ${errorCount}`);
}

if (require.main === module) {
    main();
}

