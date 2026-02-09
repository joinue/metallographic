#!/usr/bin/env python3
"""
Script to ensure all links to metallographic-equipment and metallographic-consumables
use lowercase paths across all HTML files.

This script will:
1. Find all HTML files
2. Replace any uppercase variations with lowercase
3. Create backups before modifying
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

# Configuration
BACKUP_DIR = "link_case_backups"
EXCLUDE_DIRS = {"node_modules", ".git", "metallography.org", "link_case_backups", "__pycache__", ".vscode"}

def find_html_files(root_dir='.'):
    """Find all HTML files in the project."""
    html_files = []
    root_path = Path(root_dir)
    
    for html_file in root_path.rglob('*.html'):
        # Skip excluded directories
        if any(excluded in html_file.parts for excluded in EXCLUDE_DIRS):
            continue
        html_files.append(html_file)
    
    return sorted(html_files)

def create_backup(file_path, backup_dir):
    """Create a backup of the file before modification."""
    backup_path = Path(backup_dir) / file_path
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(file_path, backup_path)
    return backup_path

def fix_links_in_file(file_path):
    """Fix uppercase links in a single HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes = []
        
        # Pattern to match links with uppercase Metallographic
        # Match href="/Metallographic-Equipment/... or href="/Metallographic-Consumables/...
        patterns = [
            (r'(href=["\'])(/Metallographic-Equipment/)', r'\1/metallographic-equipment/'),
            (r'(href=["\'])(/Metallographic-Consumables/)', r'\1/metallographic-consumables/'),
            (r'(href=["\'])(/metallographic-Equipment/)', r'\1/metallographic-equipment/'),
            (r'(href=["\'])(/metallographic-Consumables/)', r'\1/metallographic-consumables/'),
            (r'(href=["\'])(/Metallographic-equipment/)', r'\1/metallographic-equipment/'),
            (r'(href=["\'])(/Metallographic-consumables/)', r'\1/metallographic-consumables/'),
            # Also check for full URLs
            (r'(https?://[^"\']*?)(/Metallographic-Equipment/)', r'\1/metallographic-equipment/'),
            (r'(https?://[^"\']*?)(/Metallographic-Consumables/)', r'\1/metallographic-consumables/'),
            (r'(https?://[^"\']*?)(/metallographic-Equipment/)', r'\1/metallographic-equipment/'),
            (r'(https?://[^"\']*?)(/metallographic-Consumables/)', r'\1/metallographic-consumables/'),
            (r'(https?://[^"\']*?)(/Metallographic-equipment/)', r'\1/metallographic-equipment/'),
            (r'(https?://[^"\']*?)(/Metallographic-consumables/)', r'\1/metallographic-consumables/'),
        ]
        
        for pattern, replacement in patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            if matches:
                content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
                changes.append(f"Fixed {len(matches)} instance(s) of pattern: {pattern}")
        
        # Check for any remaining uppercase variations
        remaining_uppercase = re.findall(r'[/"](Metallographic-[Ee]quipment|Metallographic-[Cc]onsumables|metallographic-[Ee]quipment|metallographic-[Cc]onsumables)', content)
        if remaining_uppercase:
            # More aggressive fix - replace any case variation
            content = re.sub(
                r'(href=["\']|url["\']?\s*:\s*["\']|https?://[^"\']*?)(/)(Metallographic|metallographic)-([Ee]quipment|[Cc]onsumables)',
                lambda m: m.group(1) + m.group(2) + 'metallographic-' + m.group(4).lower(),
                content,
                flags=re.IGNORECASE
            )
            changes.append("Applied aggressive case fixing")
        
        if content != original_content:
            # Write the updated content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, changes
        else:
            return False, "No changes needed"
    
    except Exception as e:
        return None, f"Error: {str(e)}"

def main():
    """Main function to fix link case across all pages."""
    print("=" * 70)
    print("Metallographic Links Case Fix Script")
    print("=" * 70)
    print()
    
    # Find all HTML files
    print("Finding HTML files...")
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
        
        # Fix links
        result, message = fix_links_in_file(html_file)
        
        if result is True:
            results['updated'].append((html_file, message))
            print(f"  [OK] {message}")
        elif result is False:
            results['skipped'].append(html_file)
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
        for file_path, changes in results['updated'][:20]:  # Show first 20
            print(f"  - {file_path}")
            for change in changes:
                print(f"    {change}")
        if len(results['updated']) > 20:
            print(f"  ... and {len(results['updated']) - 20} more")
        print()
    
    return 0 if not results['errors'] else 1

if __name__ == "__main__":
    exit(main())
