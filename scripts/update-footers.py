#!/usr/bin/env python3
"""
Script to update all HTML pages with the new footer from footer.html
"""

import os
import re
from pathlib import Path

# Get the project root directory
PROJECT_ROOT = Path(__file__).parent.parent

# Read the new footer content
FOOTER_HTML_PATH = PROJECT_ROOT / "footer.html"
with open(FOOTER_HTML_PATH, 'r', encoding='utf-8') as f:
    NEW_FOOTER = f.read()

# Directories to exclude
EXCLUDE_DIRS = {
    'materialographic',
    'metallography.org',
    'node_modules',
    '.git',
    'scripts'
}

def should_process_file(file_path):
    """Check if a file should be processed"""
    # Skip footer.html itself
    if file_path.name == 'footer.html':
        return False
    
    # Skip files in excluded directories
    parts = file_path.parts
    for exclude_dir in EXCLUDE_DIRS:
        if exclude_dir in parts:
            return False
    
    return True

def find_footer_section(content):
    """Find the footer section in HTML content"""
    # Try to find footer starting with <!-- FOOTER --> comment
    pattern1 = r'(<!--\s*FOOTER\s*-->.*?</footer>)'
    match1 = re.search(pattern1, content, re.DOTALL | re.IGNORECASE)
    
    if match1:
        return match1.start(), match1.end()
    
    # Try to find footer starting with <footer tag
    pattern2 = r'(<footer[^>]*>.*?</footer>)'
    match2 = re.search(pattern2, content, re.DOTALL | re.IGNORECASE)
    
    if match2:
        return match2.start(), match2.end()
    
    return None, None

def update_footer_in_file(file_path):
    """Update footer in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find footer section
        start, end = find_footer_section(content)
        
        if start is None or end is None:
            print(f"  ⚠️  No footer found in {file_path.relative_to(PROJECT_ROOT)}")
            return False
        
        # Check if there's a script tag after footer for currentYear
        after_footer = content[end:]
        script_pattern = r'<script[^>]*>.*?getElementById\([\'"]currentYear[\'"]\).*?</script>'
        script_match = re.search(script_pattern, after_footer, re.DOTALL | re.IGNORECASE)
        
        # Replace footer
        new_content = content[:start] + NEW_FOOTER
        
        # If there was a script tag, remove it (new footer has its own)
        if script_match:
            script_start = end + script_match.start()
            script_end = end + script_match.end()
            new_content = new_content + content[script_end:]
        else:
            new_content = new_content + content[end:]
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True
    except Exception as e:
        print(f"  ❌ Error processing {file_path.relative_to(PROJECT_ROOT)}: {e}")
        return False

def main():
    """Main function to update all HTML files"""
    html_files = list(PROJECT_ROOT.rglob('*.html'))
    
    # Filter files
    files_to_process = [f for f in html_files if should_process_file(f)]
    
    print(f"Found {len(files_to_process)} HTML files to process")
    print(f"Excluding: {', '.join(EXCLUDE_DIRS)}")
    print()
    
    updated = 0
    skipped = 0
    errors = 0
    
    for file_path in sorted(files_to_process):
        rel_path = file_path.relative_to(PROJECT_ROOT)
        print(f"Processing: {rel_path}")
        
        if update_footer_in_file(file_path):
            updated += 1
            print(f"  ✅ Updated")
        else:
            skipped += 1
            print(f"  ⏭️  Skipped")
        print()
    
    print("=" * 60)
    print(f"Summary:")
    print(f"  ✅ Updated: {updated}")
    print(f"  ⏭️  Skipped: {skipped}")
    print(f"  ❌ Errors: {errors}")
    print("=" * 60)

if __name__ == '__main__':
    main()

