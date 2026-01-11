#!/usr/bin/env python3
"""
Script to update navigation in all HTML files with the new navigation from navigation.html
"""

import os
import re
import glob
from pathlib import Path

# Get the base directory
BASE_DIR = Path(__file__).parent.parent

# Read the new navigation
NAV_FILE = BASE_DIR / "navigation.html"
with open(NAV_FILE, 'r', encoding='utf-8') as f:
    NEW_NAV = f.read().strip()

# Pattern to match navigation section
# Matches from <!-- Navigation --> or <nav class="navigation" to </nav>
NAV_PATTERN = re.compile(
    r'(<!--\s*Navigation\s*-->)?\s*<nav\s+class=["\']navigation["\'].*?</nav>',
    re.DOTALL | re.IGNORECASE
)

# Alternative pattern for pages that might have different structure
NAV_PATTERN_ALT = re.compile(
    r'<!--\s*Navigation\s*Placeholder\s*-->.*?<script.*?fetch.*?navigation\.html.*?</script>',
    re.DOTALL | re.IGNORECASE
)

def find_navigation_section(content):
    """Find the navigation section in content"""
    # Try main pattern first
    match = NAV_PATTERN.search(content)
    if match:
        return match
    
    # Try alternative pattern
    match = NAV_PATTERN_ALT.search(content)
    if match:
        return match
    
    return None

def update_file(file_path):
    """Update navigation in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if it's the navigation.html file itself
        if file_path.name == 'navigation.html':
            return False, "Skipped (navigation.html itself)"
        
        # Check if file already has the new navigation (check for mobile-nav-container)
        if 'mobile-nav-container' in content and 'id="mobile-nav-container"' in content:
            return False, "Already has new navigation"
        
        # Find navigation section
        nav_match = find_navigation_section(content)
        
        if not nav_match:
            return False, "No navigation found"
        
        # Replace the navigation
        new_content = content[:nav_match.start()] + NEW_NAV + content[nav_match.end():]
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True, "Updated"
    
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Main function to update all HTML files"""
    # Find all HTML files
    html_files = []
    for pattern in ['**/*.html', '**/*.htm', '**/*.shtml']:
        html_files.extend(glob.glob(str(BASE_DIR / pattern), recursive=True))
    
    # Filter out node_modules and other directories
    html_files = [f for f in html_files if 'node_modules' not in f and 'metallography.org' not in f]
    
    print(f"Found {len(html_files)} HTML files to check")
    print(f"New navigation from: {NAV_FILE}")
    print("-" * 80)
    
    updated = 0
    skipped = 0
    errors = 0
    
    for file_path in sorted(html_files):
        file_path = Path(file_path)
        success, message = update_file(file_path)
        
        if success:
            updated += 1
            print(f"✓ {file_path.relative_to(BASE_DIR)} - {message}")
        elif "Error" in message:
            errors += 1
            print(f"✗ {file_path.relative_to(BASE_DIR)} - {message}")
        else:
            skipped += 1
            if "Already" in message or "Skipped" in message:
                # Only print skipped if verbose
                pass
            else:
                print(f"- {file_path.relative_to(BASE_DIR)} - {message}")
    
    print("-" * 80)
    print(f"Summary: {updated} updated, {skipped} skipped, {errors} errors")

if __name__ == "__main__":
    main()

