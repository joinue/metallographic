#!/usr/bin/env node

/**
 * Script to update navigation menu across all HTML files
 * 
 * Usage: node scripts/update-navigation.js
 * 
 * This script finds all HTML files and updates the navigation menu
 * to ensure consistency across the site.
 */

const fs = require('fs');
const path = require('path');

// Configuration: Define navigation menu items in order
const GRINDING_POLISHING_MENU_ITEMS = [
    { url: '/metallographic-equipment/grinding-polishing/penta.html', label: 'Hand / Belt Grinders' },
    { url: '/metallographic-equipment/grinding-polishing/nano.html', label: 'Manual Grinder Polishers' },
    { url: '/metallographic-equipment/grinding-polishing/femto.html', label: 'Semi-Auto Grinder Polishers' },
    { url: '/metallographic-equipment/grinding-polishing/zeta.html', label: 'Automated Abrasive Dispenser' },
    { url: '/metallographic-equipment/grinding-polishing/atto.html', label: 'Controlled Removal Polishers' },
    { url: '/metallographic-equipment/grinding-polishing/giga.html', label: 'Vibratory Polishers' }
];

// Patterns to match navigation sections
const DESKTOP_NAV_PATTERN = /<ul class="sub-menu-second-level">\s*((?:<li><a href="[^"]*">[^<]*<\/a><\/li>\s*)*)<\/ul>/g;
const MOBILE_NAV_PATTERN = /<ul class="sub-menu second-level">\s*((?:<li><a href="[^"]*"><span>[^<]*<\/span><\/a><\/li>\s*)*)<\/ul>/g;

/**
 * Generate navigation HTML for desktop menu (just the list items, not the ul wrapper)
 */
function generateDesktopNav() {
    return GRINDING_POLISHING_MENU_ITEMS.map(item => 
        `                            <li><a href="${item.url}">${item.label}</a></li>`
    ).join('\n');
}

/**
 * Generate navigation HTML for mobile menu (just the list items, not the ul wrapper)
 */
function generateMobileNav() {
    return GRINDING_POLISHING_MENU_ITEMS.map(item => 
        `                            <li><a href="${item.url}"><span>${item.label}</span></a></li>`
    ).join('\n');
}

/**
 * Find and replace navigation section in HTML content
 */
function updateNavigation(content) {
    let updated = content;
    let changesMade = false;

    const newDesktopNav = generateDesktopNav();
    const newMobileNav = generateMobileNav();

    // Update desktop navigation - find the Grinding & Polishing section
    // Pattern: matches the ul tag and its content, replacing only the list items inside
    const desktopPattern = /(<li class="has-submenu">\s*<a href="\/metallographic-equipment\/grinding-polishing\.html">Grinding & Polishing<\/a>\s*<button[^>]*>[\s\S]*?<\/button>\s*<ul class="sub-menu-second-level">)\s*(?:<li><a href="\/metallographic-equipment\/grinding-polishing\/[^"]*">[^<]*<\/a><\/li>\s*)*(<\/ul>\s*<\/li>)/;
    const desktopMatch = updated.match(desktopPattern);
    if (desktopMatch) {
        updated = updated.replace(desktopPattern, `$1\n${newDesktopNav}\n                        $2`);
        changesMade = true;
    }

    // Update mobile navigation - find the Grinding & Polishing section
    // Pattern: matches the ul tag and its content, replacing only the list items inside
    const mobilePattern = /(<li>\s*<a href="\/metallographic-equipment\/grinding-polishing\.html">\s*<span>Grinding & Polishing[\s\S]*?<\/span>\s*<\/a>\s*<ul class="sub-menu second-level">)\s*(?:<li><a href="\/metallographic-equipment\/grinding-polishing\/[^"]*"><span>[^<]*<\/span><\/a><\/li>\s*)*(<\/ul>\s*<\/li>)/;
    const mobileMatch = updated.match(mobilePattern);
    if (mobileMatch) {
        updated = updated.replace(mobilePattern, `$1\n${newMobileNav}\n                        $2`);
        changesMade = true;
    }

    return { content: updated, changesMade };
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
    const rootDir = path.join(__dirname, '..');
    const htmlFiles = findHtmlFiles(rootDir);
    
    console.log(`Found ${htmlFiles.length} HTML files`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    htmlFiles.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Only process files that contain the Grinding & Polishing navigation
            if (content.includes('Grinding & Polishing') && 
                (content.includes('sub-menu-second-level') || content.includes('sub-menu second-level'))) {
                
                const { content: updatedContent, changesMade } = updateNavigation(content);
                
                if (changesMade) {
                    fs.writeFileSync(filePath, updatedContent, 'utf8');
                    console.log(`✓ Updated: ${path.relative(rootDir, filePath)}`);
                    updatedCount++;
                }
            }
        } catch (error) {
            console.error(`✗ Error processing ${filePath}:`, error.message);
            errorCount++;
        }
    });
    
    console.log(`\nSummary:`);
    console.log(`  Files updated: ${updatedCount}`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`  Total files processed: ${htmlFiles.length}`);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { updateNavigation, generateDesktopNav, generateMobileNav };

