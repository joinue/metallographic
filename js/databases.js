// Databases Page JavaScript
// Handles loading database counts and rendering database cards

const databases = [
  {
    title: 'Materials Database',
    slug: 'materials',
    url: '/materials.html',
    description: 'Comprehensive database of materials with preparation procedures, properties, and recommended techniques. Search by material type, category, or specific alloy composition.',
    icon: 'package',
    color: 'primary',
    status: 'active',
  },
  {
    title: 'Etchants Database',
    slug: 'etchants',
    url: '/etchants.html',
    description: 'Complete reference of etching reagents with compositions, applications, safety information, and material compatibility. Find the right etchant for your material and analysis needs.',
    icon: 'flask',
    color: 'primary',
    status: 'active',
  },
  {
    title: 'Standards Database',
    slug: 'standards',
    url: '/standards.html',
    description: 'Reference database of ASTM and ISO standards relevant to metallography, including preparation methods, testing procedures, and analysis guidelines.',
    icon: 'file-text',
    color: 'primary',
    status: 'active',
  },
];

let databaseCounts = {
  materials: null,
  etchants: null,
  standards: null,
};

let loading = true;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDatabaseCounts();
    renderDatabases();
});

// Load counts from CSV files
async function loadDatabaseCounts() {
    try {
        const [materialsResponse, etchantsResponse, standardsResponse] = await Promise.all([
            fetch('/materials_rows.csv'),
            fetch('/etchants_rows.csv'),
            fetch('/standards_rows.csv'),
        ]);

        const [materialsText, etchantsText, standardsText] = await Promise.all([
            materialsResponse.text(),
            etchantsResponse.text(),
            standardsResponse.text(),
        ]);

        // Parse CSVs
        const materials = parseCSV(materialsText);
        const etchants = parseCSV(etchantsText);
        const standards = parseCSV(standardsText);

        // Count published items
        databaseCounts.materials = materials.filter(m => m.status === 'published').length;
        databaseCounts.etchants = etchants.filter(e => e.status === 'published').length;
        databaseCounts.standards = standards.filter(s => s.status === 'published').length;

        loading = false;
        renderDatabases();
    } catch (error) {
        console.error('Error loading database counts:', error);
        loading = false;
        renderDatabases();
    }
}

// Parse CSV text into array of objects using PapaParse
function parseCSV(csvText) {
    if (typeof Papa === 'undefined') {
        console.error('PapaParse is not loaded.');
        return [];
    }
    
    const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
    });
    
    return result.data || [];
}


// Get count for a database
function getCount(slug) {
    return databaseCounts[slug] || null;
}

// Get icon SVG
function getIconSVG(iconName) {
    const icons = {
        'package': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
        'flask': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
        'file-text': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    };
    return icons[iconName] || icons['package'];
}

// Render databases
function renderDatabases() {
    const grid = document.getElementById('databases-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!grid) return;
    
    // Filter only active databases
    const activeDatabases = databases.filter(db => db.status === 'active');
    
    if (activeDatabases.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    // Render database cards
    grid.innerHTML = activeDatabases.map((database, index) => {
        const count = getCount(database.slug);
        return createDatabaseCard(database, count, index);
    }).join('');
}

// Create database card HTML
function createDatabaseCard(database, count, index) {
    const countText = count !== null && !loading
        ? `${count.toLocaleString()} ${count === 1 ? 'entry' : 'entries'}`
        : loading ? 'Loading...' : '';
    
    return `
        <div class="database-card" style="animation-delay: ${index * 0.1}s;">
            <a href="${database.url}" class="database-card-link">
                <div class="database-card-header">
                    <div class="database-icon-wrapper">
                        ${getIconSVG(database.icon)}
                    </div>
                    <div class="database-title-section">
                        <h3 class="database-title">${escapeHtml(database.title)}</h3>
                        ${countText ? `<p class="database-count">${countText}</p>` : ''}
                    </div>
                </div>
                <p class="database-description">${escapeHtml(database.description)}</p>
                <span class="database-link-text">
                    Browse Database
                    <svg class="link-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </span>
            </a>
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

