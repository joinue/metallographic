#!/usr/bin/env python3
"""
Simple script to update all navigation menus to match teravac-pro.html
Updates castable mounting equipment links across all HTML files.
"""

import os
import re
from pathlib import Path

# Correct navigation from teravac-pro.html
CORRECT_MOBILE_NAV = '''                        <ul class="sub-menu-second-level">
                            <li><a href="/metallographic-equipment/castable-mounting/teravac.html">Vacuum Mounting System</a></li>
                            <li><a href="/metallographic-equipment/castable-mounting/teravac-pro.html">Automated Vacuum Mounting</a></li>
                            <li><a href="/metallographic-equipment/castable-mounting/teracomp.html">Pressure Mounting System</a></li>
                            <li><a href="/metallographic-equipment/castable-mounting/terauv.html">UV Curing System</a></li>
                        </ul>'''

CORRECT_DESKTOP_NAV = '''                        <ul class="sub-menu second-level">
                            <li><a href="/metallographic-equipment/castable-mounting/teravac.html"><span>Vacuum Mounting System</span></a></li>
                            <li><a href="/metallographic-equipment/castable-mounting/teravac-pro.html"><span>Automated Vacuum Mounting</span></a></li>
                            <li><a href="/metallographic-equipment/castable-mounting/teracomp.html"><span>Pressure Mounting System</span></a></li>
                            <li><a href="/metallographic-equipment/castable-mounting/terauv.html"><span>UV Curing System</span></a></li>
                        </ul>'''


def update_file(file_path):
    """Update navigation menus in a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes_made = False
        
        # Only process files that have castable mounting navigation
        if 'castable-mounting/teravac.html' not in content:
            return False
        
        # Mobile navigation: Find the sub-menu-second-level block for castable mounting
        # This pattern matches the entire ul block with all its list items
        mobile_pattern = r'<ul class="sub-menu-second-level">\s*<li><a href="/metallographic-equipment/castable-mounting/teravac\.html">[^<]*</a></li>.*?<li><a href="/metallographic-equipment/castable-mounting/terauv\.html">[^<]*</a></li>\s*</ul>'
        if re.search(mobile_pattern, content, re.DOTALL):
            content = re.sub(mobile_pattern, CORRECT_MOBILE_NAV, content, flags=re.DOTALL)
            changes_made = True
        
        # Desktop navigation: Find the sub-menu second-level block for castable mounting
        desktop_pattern = r'<ul class="sub-menu second-level">\s*<li><a href="/metallographic-equipment/castable-mounting/teravac\.html"><span>[^<]*</span></a></li>.*?<li><a href="/metallographic-equipment/castable-mounting/terauv\.html"><span>[^<]*</span></a></li>\s*</ul>'
        if re.search(desktop_pattern, content, re.DOTALL):
            content = re.sub(desktop_pattern, CORRECT_DESKTOP_NAV, content, flags=re.DOTALL)
            changes_made = True
        
        if changes_made and content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def main():
    """Main function to update all HTML files."""
    script_dir = Path(__file__).parent
    
    # Find all HTML files
    html_files = list(script_dir.rglob('*.html'))
    
    # Exclude certain directories
    excluded_dirs = {'node_modules', '.git', '__pycache__', 'venv', '.venv'}
    html_files = [f for f in html_files if not any(excluded in f.parts for excluded in excluded_dirs)]
    
    print(f"Found {len(html_files)} HTML files to process...\n")
    
    updated_count = 0
    for html_file in html_files:
        if update_file(html_file):
            updated_count += 1
            rel_path = html_file.relative_to(script_dir)
            print(f"✓ Updated: {rel_path}")
    
    print(f"\n{'='*60}")
    print(f"Done! Updated {updated_count} file(s).")


if __name__ == '__main__':
    main()
