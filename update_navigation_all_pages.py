#!/usr/bin/env python3
"""
Script to update navigation across all HTML pages with the navigation from index.html.
This script will replace the navigation section in all HTML files with the updated
navigation that includes the "Lab Builder" link.

Usage:
    # Test on equipment.html first:
    python update_navigation_all_pages.py --test equipment.html
    
    # Or test on a single file:
    python update_navigation_all_pages.py --test <filename>
    
    # Update all pages:
    python update_navigation_all_pages.py

The script will:
1. Extract navigation from index.html
2. Find all HTML files in the project (or test on one file)
3. Create backups before modifying
4. Replace navigation in each file
5. Skip index.html (already has the correct navigation)
"""

import os
import re
import shutil
import sys
from pathlib import Path
from datetime import datetime

# Configuration
SOURCE_FILE = "index.html"
BACKUP_DIR = "navigation_backups"
EXCLUDE_DIRS = {"node_modules", ".git", "metallography.org", "navigation_backups", "__pycache__", ".vscode"}
EXCLUDE_FILES = {SOURCE_FILE, "navigation.html", "footer.html", "return-top.html", "modal.html"}
TEST_FILE = None  # Set to a file path to test on a single file first

def extract_navigation_from_index():
    """Extract the navigation section from index.html."""
    print(f"Reading navigation from {SOURCE_FILE}...")
    
    with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the navigation section
    # Look for <!-- Navigation --> followed by <nav> and ending with </nav>
    nav_pattern = r'(<!--\s*Navigation\s*-->.*?</nav>)'
    match = re.search(nav_pattern, content, re.DOTALL)
    
    if not match:
        raise ValueError(f"Could not find navigation section in {SOURCE_FILE}")
    
    navigation = match.group(1)
    print(f"[OK] Extracted navigation ({len(navigation)} characters)")
    return navigation

def find_html_files(root_dir='.'):
    """Find all HTML files in the project, excluding certain directories and files."""
    html_files = []
    root_path = Path(root_dir)
    
    for html_file in root_path.rglob('*.html'):
        # Skip excluded directories
        if any(excluded in html_file.parts for excluded in EXCLUDE_DIRS):
            continue
        
        # Skip excluded files
        if html_file.name in EXCLUDE_FILES:
            continue
        
        html_files.append(html_file)
    
    return sorted(html_files)

def create_backup(file_path, backup_dir):
    """Create a backup of the file before modification."""
    backup_path = Path(backup_dir) / file_path
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(file_path, backup_path)
    return backup_path

def update_navigation_in_file(file_path, new_navigation):
    """Update the navigation section in a single HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file already has the Lab Builder link
        if 'Lab Builder' in content and '/build.html' in content:
            # Check if it's in the navigation section
            nav_match = re.search(r'(<!--\s*Navigation\s*-->.*?</nav>)', content, re.DOTALL)
            if nav_match and 'Lab Builder' in nav_match.group(1):
                return False, "Already has Lab Builder in navigation"
        
        # Find and replace navigation section
        nav_pattern = r'(<!--\s*Navigation\s*-->.*?</nav>)'
        match = re.search(nav_pattern, content, re.DOTALL)
        
        if not match:
            return None, "No navigation section found"
        
        # Replace the navigation
        updated_content = content[:match.start()] + new_navigation + content[match.end():]
        
        # Write the updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        return True, "Navigation updated successfully"
    
    except Exception as e:
        return None, f"Error: {str(e)}"

def main():
    """Main function to update navigation across all pages."""
    global TEST_FILE
    
    # Parse command line arguments
    if len(sys.argv) > 1:
        if sys.argv[1] == '--test' and len(sys.argv) > 2:
            TEST_FILE = sys.argv[2]
        elif sys.argv[1] in ['-h', '--help']:
            print(__doc__)
            return 0
    
    print("=" * 70)
    print("Navigation Update Script")
    print("=" * 70)
    print()
    
    # Extract navigation from index.html
    try:
        new_navigation = extract_navigation_from_index()
    except Exception as e:
        print(f"[ERROR] Error extracting navigation: {e}")
        return 1
    
    # Find HTML files to process
    if TEST_FILE:
        print(f"\n[TEST MODE] Testing on single file: {TEST_FILE}")
        test_path = Path(TEST_FILE)
        if not test_path.exists():
            print(f"[ERROR] Test file not found: {TEST_FILE}")
            return 1
        html_files = [test_path]
        print(f"[OK] Found test file: {html_files[0]}")
    else:
        print("\nFinding HTML files...")
        html_files = find_html_files()
        print(f"[OK] Found {len(html_files)} HTML files to process")
    
    # Create backup directory
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = Path(BACKUP_DIR) / timestamp
    backup_dir.mkdir(parents=True, exist_ok=True)
    print(f"[OK] Created backup directory: {backup_dir}")
    print()
    
    # Process each file
    results = {
        'updated': [],
        'skipped': [],
        'errors': []
    }
    
    for html_file in html_files:
        print(f"Processing: {html_file}")
        
        # Create backup
        backup_path = create_backup(html_file, backup_dir)
        
        # Update navigation
        result, message = update_navigation_in_file(html_file, new_navigation)
        
        if result is True:
            results['updated'].append(html_file)
            print(f"  [OK] {message}")
        elif result is False:
            results['skipped'].append((html_file, message))
            print(f"  [SKIP] {message}")
        else:
            results['errors'].append((html_file, message))
            print(f"  [ERROR] {message}")
            # Restore from backup on error
            shutil.copy2(backup_path, html_file)
            print(f"  [RESTORED] Restored from backup")
        print()
    
    # Print summary
    print("=" * 70)
    print("Summary")
    print("=" * 70)
    print(f"[OK] Updated: {len(results['updated'])} files")
    print(f"[SKIP] Skipped: {len(results['skipped'])} files")
    print(f"[ERROR] Errors: {len(results['errors'])} files")
    print()
    print(f"Backup location: {backup_dir}")
    print()
    
    if results['errors']:
        print("Files with errors:")
        for file_path, error in results['errors']:
            print(f"  - {file_path}: {error}")
        print()
    
    if results['updated']:
        print("Successfully updated files:")
        for file_path in results['updated'][:10]:  # Show first 10
            print(f"  - {file_path}")
        if len(results['updated']) > 10:
            print(f"  ... and {len(results['updated']) - 10} more")
        print()
    
    if TEST_FILE and results['updated']:
        print("[TEST MODE] Test completed successfully!")
        print("To update all pages, run: python update_navigation_all_pages.py")
        print()
    
    return 0 if not results['errors'] else 1

if __name__ == "__main__":
    exit(main())
