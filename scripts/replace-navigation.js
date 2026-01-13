#!/usr/bin/env node

/**
 * Script to replace navigation on all HTML files with the navigation from index.html
 * 
 * Usage: node scripts/replace-navigation.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Extract navigation from index.html
 */
function extractNavigationFromIndex() {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const content = fs.readFileSync(indexPath, 'utf8');
    
    // Find the navigation section - from <nav class="navigation" to </nav>
    const navMatch = content.match(/<nav class="navigation"[\s\S]*?<\/nav>/);
    if (!navMatch) {
        throw new Error('Could not find navigation in index.html');
    }
    
    return navMatch[0];
}

/**
 * Find and replace navigation in a file
 */
function replaceNavigationInFile(filePath, newNav) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find existing navigation
    const navPattern = /<nav class="navigation"[\s\S]*?<\/nav>/;
    const hasNav = navPattern.test(content);
    
    if (!hasNav) {
        return { updated: false, reason: 'No navigation found' };
    }
    
    const updated = content.replace(navPattern, newNav);
    
    // Only write if content actually changed
    if (content === updated) {
        return { updated: false, reason: 'Navigation already matches' };
    }
    
    fs.writeFileSync(filePath, updated, 'utf8');
    return { updated: true };
}

/**
 * Recursively find all HTML files
 */
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        // Skip node_modules, .git, and other common directories
        if (file.startsWith('.') || file === 'node_modules' || file === '.git') {
            return;
        }
        
        // Skip index.html itself (it's our source)
        if (file === 'index.html' && dir === path.join(__dirname, '..')) {
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

/**
 * Main function
 */
function main() {
    console.log('Extracting navigation from index.html...');
    const newNav = extractNavigationFromIndex();
    console.log(`✓ Extracted navigation (${newNav.length} characters)\n`);
    
    const rootDir = path.join(__dirname, '..');
    const htmlFiles = findHtmlFiles(rootDir);
    
    console.log(`Found ${htmlFiles.length} HTML files to process\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    htmlFiles.forEach(filePath => {
        try {
            const result = replaceNavigationInFile(filePath, newNav);
            const relativePath = path.relative(rootDir, filePath);
            
            if (result.updated) {
                console.log(`✓ Updated: ${relativePath}`);
                updatedCount++;
            } else {
                if (result.reason === 'No navigation found') {
                    console.log(`⊘ Skipped (no nav): ${relativePath}`);
                } else {
                    console.log(`⊘ Skipped (already matches): ${relativePath}`);
                }
                skippedCount++;
            }
        } catch (error) {
            console.error(`✗ Error processing ${path.relative(rootDir, filePath)}:`, error.message);
            errorCount++;
        }
    });
    
    console.log(`\nSummary:`);
    console.log(`  Files updated: ${updatedCount}`);
    console.log(`  Files skipped: ${skippedCount}`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`  Total files processed: ${htmlFiles.length}`);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { extractNavigationFromIndex, replaceNavigationInFile };

