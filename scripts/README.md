# Navigation Update Scripts

This directory contains scripts for updating navigation menus across all HTML files in the site.

## update-navigation.js

Updates the "Grinding & Polishing" navigation menu across all HTML files to ensure consistency.

### Usage

```bash
node scripts/update-navigation.js
```

### What it does

- Finds all HTML files in the project (excluding `node_modules`, `.git`, etc.)
- Updates the "Grinding & Polishing" submenu in both desktop and mobile navigation
- Ensures the menu items are in the correct order:
  1. Hand / Belt Grinders
  2. Manual Grinder Polishers
  3. Semi-Auto Grinder Polishers
  4. Automated Abrasive Dispenser
  5. Controlled Removal Polishers
  6. Vibratory Polishers

### Customization

To modify the menu items, edit the `GRINDING_POLISHING_MENU_ITEMS` array in `update-navigation.js`:

```javascript
const GRINDING_POLISHING_MENU_ITEMS = [
    { url: '/metallographic-equipment/grinding-polishing/penta.html', label: 'Hand / Belt Grinders' },
    // Add or modify items here
];
```

### Output

The script will:
- Show progress as it processes each file
- Display a summary of files updated and any errors
- Only update files that contain the "Grinding & Polishing" navigation section

