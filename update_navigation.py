#!/usr/bin/env python3
"""
Script to update all HTML pages to use the standardized navigation from navigation.html
via Server Side Includes (SSI).
"""

import os
import re
from pathlib import Path

def find_navigation_section(content):
    """Find the navigation section in HTML content."""
    # Pattern 1: SSI include already present
    ssi_pattern = r'<!--\s*#include\s+virtual=["\']/navigation\.html["\']\s*-->'
    
    # Pattern 2: Full navigation block from <!-- Navigation --> to </nav>
    nav_start_pattern = r'<!--\s*Navigation\s*-->'
    nav_end_pattern = r'</nav>'
    
    # Check for existing SSI include
    if re.search(ssi_pattern, content, re.IGNORECASE):
        return 'ssi'
    
    # Find navigation block
    nav_start_match = re.search(nav_start_pattern, content, re.IGNORECASE)
    if nav_start_match:
        start_pos = nav_start_match.start()
        # Find the matching </nav> tag
        nav_end_match = re.search(nav_end_pattern, content[start_pos:])
        if nav_end_match:
            end_pos = start_pos + nav_end_match.end()
            return ('block', start_pos, end_pos)
    
    return None

def update_navigation_in_file(file_path):
    """Update navigation in a single HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False
    
    nav_info = find_navigation_section(content)
    
    if nav_info == 'ssi':
        # Already using SSI include, check if it's correct
        ssi_pattern = r'<!--\s*#include\s+virtual=["\']/navigation\.html["\']\s*-->'
        if re.search(ssi_pattern, content, re.IGNORECASE):
            # Already correct
            return False  # No changes needed
    elif nav_info and nav_info[0] == 'block':
        # Replace navigation block with SSI include
        start_pos, end_pos = nav_info[1], nav_info[2]
        
        # Get the line before navigation to preserve spacing
        before_nav = content[:start_pos].rstrip()
        after_nav = content[end_pos:].lstrip()
        
        # Create new content with SSI include
        new_content = before_nav + '\n<!-- Navigation -->\n<!--#include virtual="/navigation.html" -->\n' + after_nav
        
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        except Exception as e:
            print(f"Error writing {file_path}: {e}")
            return False
    
    return False

def main():
    """Main function to update all HTML files."""
    # Get the script directory (project root)
    script_dir = Path(__file__).parent
    project_root = script_dir
    
    # Find all HTML files
    html_files = list(project_root.rglob('*.html'))
    html_files.extend(project_root.rglob('*.shtml'))  # Also check .shtml files
    
    # Exclude navigation.html itself
    html_files = [f for f in html_files if f.name != 'navigation.html']
    
    updated_count = 0
    skipped_count = 0
    error_count = 0
    
    print(f"Found {len(html_files)} HTML files to check...")
    print()
    
    for html_file in sorted(html_files):
        relative_path = html_file.relative_to(project_root)
        
        try:
            if update_navigation_in_file(html_file):
                print(f"✓ Updated: {relative_path}")
                updated_count += 1
            else:
                skipped_count += 1
        except Exception as e:
            print(f"✗ Error processing {relative_path}: {e}")
            error_count += 1
    
    print()
    print("=" * 60)
    print(f"Summary:")
    print(f"  Updated: {updated_count} files")
    print(f"  Skipped (already correct or no nav found): {skipped_count} files")
    print(f"  Errors: {error_count} files")
    print("=" * 60)

if __name__ == '__main__':
    main()
