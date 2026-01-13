// Etchant Selector JavaScript
// Implements intelligent etchant matching algorithm

let allMaterials = [];
let allEtchants = [];
let selectedMaterial = null;
let purposeFilter = '';
let applicationContext = '';
let debounceTimer = null;

// SVG Icon helper functions (Lucide-style)
function createIcon(name, className = '') {
    const icons = {
        search: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
        wrench: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
        settings: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m9-9h-6m-6 0H3m15.364 6.364l-4.243-4.243m-4.242 0L5.636 18.364m12.728 0l-4.243-4.243m-4.242 0L5.636 5.636"></path></svg>',
        plane: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>',
        rocket: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>',
        zap: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
        flame: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
        layers: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
        gem: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9Z"></path><path d="M11 3 8 9l4 12 4-12-3-6"></path><path d="M2 9h20"></path></svg>',
        atom: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"></path><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"></path></svg>',
        sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>',
        searchIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
        refresh: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>',
        check: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        alertTriangle: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
        lightbulb: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>',
        star: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
        shoppingCart: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>',
        grid: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>',
        circle: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>',
        rotate: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path></svg>',
        waves: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 4.5-2 5-2 2.2 0 1.5 2 3 2s2-1 2.5-1"></path><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 4.5-2 5-2 2.2 0 1.5 2 3 2s2-1 2.5-1"></path><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 4.5-2 5-2 2.2 0 1.5 2 3 2s2-1 2.5-1"></path></svg>'
    };
    return `<span class="${className}">${icons[name] || ''}</span>`;
}

// Common materials for quick selection
const commonMaterials = [
    { category: 'carbon-steel', label: 'Carbon Steel', icon: 'wrench' },
    { category: 'stainless-steel', label: 'Stainless Steel', icon: 'settings' },
    { category: 'aluminum', label: 'Aluminum', icon: 'plane' },
    { category: 'titanium', label: 'Titanium', icon: 'rocket' },
    { category: 'copper-brass', label: 'Copper/Brass', icon: 'zap' },
    { category: 'nickel-alloys', label: 'Nickel Alloys', icon: 'flame' },
];

// Purpose options
const purposeOptions = [
    { value: 'grain-boundaries', label: 'Grain Boundaries', description: 'Reveal grain structure and size', icon: 'grid' },
    { value: 'carbides', label: 'Carbides', description: 'Highlight carbide particles', icon: 'gem' },
    { value: 'phases', label: 'Phases', description: 'Distinguish different phases', icon: 'atom' },
    { value: 'precipitates', label: 'Precipitates', description: 'Show precipitation', icon: 'sparkles' },
    { value: 'inclusions', label: 'Inclusions', description: 'Reveal non-metallic inclusions', icon: 'searchIcon' },
    { value: 'twin-boundaries', label: 'Twin Boundaries', description: 'Show twinning in crystals', icon: 'rotate' },
    { value: 'martensite', label: 'Martensite', description: 'Highlight martensitic structure', icon: 'zap' },
    { value: 'pearlite', label: 'Pearlite', description: 'Reveal pearlitic structures', icon: 'waves' },
    { value: 'ferrite', label: 'Ferrite', description: 'Distinguish ferrite phase', icon: 'circle' },
    { value: 'austenite', label: 'Austenite', description: 'Distinguish austenite phase', icon: 'circle' },
    { value: 'nodularity', label: 'Nodularity', description: 'Reveal graphite shape in cast iron', icon: 'circle' },
    { value: 'general', label: 'General Purpose', description: 'General microstructure examination', icon: 'layers' }
];

// Application context options
const applicationContextOptions = [
    { value: 'quality-control', label: 'Quality Control', description: 'Standard inspection and testing', icon: 'check' },
    { value: 'failure-analysis', label: 'Failure Analysis', description: 'Root cause investigation', icon: 'alertTriangle' },
    { value: 'research', label: 'Research', description: 'Scientific investigation', icon: 'lightbulb' },
    { value: 'heat-treatment-verification', label: 'Heat Treatment', description: 'Verify heat treatment effects', icon: 'flame' },
    { value: 'welding-analysis', label: 'Welding Analysis', description: 'Weld zone examination', icon: 'wrench' },
    { value: 'general', label: 'General Purpose', description: 'General microstructure examination', icon: 'layers' }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
    renderCommonMaterials();
    renderPurposeOptions();
    renderApplicationContextOptions();
});

// Load materials and etchants from CSV
async function loadData() {
    try {
        const [materialsResponse, etchantsResponse] = await Promise.all([
            fetch('/materials_rows.csv'),
            fetch('/etchants_rows.csv')
        ]);
        
        const materialsText = await materialsResponse.text();
        const etchantsText = await etchantsResponse.text();
        
        allMaterials = parseCSV(materialsText);
        allEtchants = parseCSV(etchantsText);
        
        // Filter only published items
        allMaterials = allMaterials.filter(m => m.status === 'published' || !m.status);
        allEtchants = allEtchants.filter(e => e.status === 'published' || !e.status);
        
        hideLoadingState();
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('loading-state').innerHTML = 
            '<p>Error loading data. Please try again later.</p>';
    }
}

// Parse CSV using PapaParse or fallback
function parseCSV(csvText) {
    if (typeof Papa !== 'undefined') {
        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(),
            transform: (value) => {
                if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
                    try {
                        return JSON.parse(value);
                    } catch (e) {
                        return value;
                    }
                }
                return value;
            }
        });
        return result.data || [];
    }
    
    // Fallback parser
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = parseCSVLine(lines[0]);
    const items = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length !== headers.length) continue;
        
        const item = {};
        headers.forEach((header, index) => {
            let value = values[index] || '';
            value = value.replace(/^"|"$/g, '');
            if (value.startsWith('[') || value.startsWith('{')) {
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    // Keep as string
                }
            }
            item[header] = value;
        });
        items.push(item);
    }
    
    return items;
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current);
    return values;
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('material-search');
    if (searchInput) {
        searchInput.addEventListener('input', handleMaterialSearch);
        searchInput.addEventListener('focus', () => {
            if (searchInput.value) {
                showSearchResults();
            }
        });
    }
    
    // Click outside to close search results
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.material-search-wrapper')) {
            hideSearchResults();
        }
    });
    
    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSelection);
    }
    
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Empty state buttons
    const clearFiltersEmptyBtn = document.getElementById('clear-filters-empty-btn');
    if (clearFiltersEmptyBtn) {
        clearFiltersEmptyBtn.addEventListener('click', clearFilters);
    }
    
    const selectDifferentBtn = document.getElementById('select-different-material-btn');
    if (selectDifferentBtn) {
        selectDifferentBtn.addEventListener('click', resetSelection);
    }
}

// Handle material search with debounce
function handleMaterialSearch(event) {
    const query = event.target.value.trim();
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (query) {
            showSearchResults();
        } else {
            hideSearchResults();
        }
    }, 300);
}

// Show search results
function showSearchResults() {
    const query = document.getElementById('material-search').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('material-search-results');
    
    if (!query) {
        hideSearchResults();
        return;
    }
    
    const filtered = filterMaterials(query);
    
    if (filtered.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-empty">No materials found</div>';
        resultsContainer.style.display = 'block';
        return;
    }
    
    resultsContainer.innerHTML = filtered.slice(0, 20).map(material => `
        <button class="search-result-item" data-material-id="${material.id}">
            <div class="search-result-name">${escapeHtml(material.name)}</div>
            <div class="search-result-details">
                ${material.category || ''}
                ${material.composition ? ' • ' + escapeHtml(material.composition) : ''}
            </div>
        </button>
    `).join('');
    
    resultsContainer.style.display = 'block';
    
    // Add click handlers
    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const materialId = item.dataset.materialId;
            const material = allMaterials.find(m => m.id === materialId);
            if (material) {
                selectMaterial(material);
            }
        });
    });
}

// Hide search results
function hideSearchResults() {
    const resultsContainer = document.getElementById('material-search-results');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

// Filter materials by search query
function filterMaterials(query) {
    if (!query) {
        return allMaterials
            .filter(m => m.status === 'published' || !m.status)
            .sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return (a.sort_order || 0) - (b.sort_order || 0);
            })
            .slice(0, 20);
    }
    
    const queryLower = query.toLowerCase();
    return allMaterials.filter(m => {
        if (m.status !== 'published' && m.status) return false;
        
        const nameMatch = (m.name || '').toLowerCase().includes(queryLower);
        const categoryMatch = (m.category || '').toLowerCase().includes(queryLower);
        const compositionMatch = (m.composition || '').toLowerCase().includes(queryLower);
        
        let altNamesMatch = false;
        if (m.alternative_names) {
            const altNames = Array.isArray(m.alternative_names) 
                ? m.alternative_names 
                : (typeof m.alternative_names === 'string' ? tryParseJSON(m.alternative_names) || [m.alternative_names] : []);
            altNamesMatch = altNames.some(alt => alt.toLowerCase().includes(queryLower));
        }
        
        let tagsMatch = false;
        if (m.tags) {
            const tags = Array.isArray(m.tags) 
                ? m.tags 
                : (typeof m.tags === 'string' ? tryParseJSON(m.tags) || [m.tags] : []);
            tagsMatch = tags.some(tag => tag.toLowerCase().includes(queryLower));
        }
        
        return nameMatch || categoryMatch || compositionMatch || altNamesMatch || tagsMatch;
    }).slice(0, 20);
}

function tryParseJSON(str) {
    try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : null;
    } catch (e) {
        return null;
    }
}

// Render common materials
function renderCommonMaterials() {
    const container = document.getElementById('common-materials');
    if (!container) return;
    
    const grid = container.querySelector('.common-materials-grid');
    if (!grid) return;
    
    grid.innerHTML = commonMaterials.map(common => {
        const material = getMaterialByCategory(common.category);
        if (!material) return '';
        
        return `
            <button class="common-material-btn" data-category="${common.category}">
                <span class="common-material-icon">${createIcon(common.icon)}</span>
                <span class="common-material-label">${common.label}</span>
            </button>
        `;
    }).join('');
    
    // Add click handlers
    grid.querySelectorAll('.common-material-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            const material = getMaterialByCategory(category);
            if (material) {
                selectMaterial(material);
            }
        });
    });
}

// Get material by category
function getMaterialByCategory(category) {
    const categoryMap = {
        'carbon-steel': ['carbon-steel', 'carbon steel', 'low-alloy-steel'],
        'stainless-steel': ['stainless-steel', 'stainless steel'],
        'aluminum': ['aluminum', 'aluminium'],
        'titanium': ['titanium'],
        'copper-brass': ['copper', 'brass', 'bronze'],
        'nickel-alloys': ['nickel', 'inconel', 'monel']
    };
    
    const searchTerms = categoryMap[category] || [category];
    
    return allMaterials.find(m => {
        const matCategory = (m.category || '').toLowerCase();
        const matName = (m.name || '').toLowerCase();
        return searchTerms.some(term => 
            matCategory.includes(term) || matName.includes(term)
        );
    });
}

// Select material
function selectMaterial(material) {
    selectedMaterial = material;
    purposeFilter = '';
    applicationContext = '';
    
    // Update UI
    document.getElementById('material-search').value = '';
    hideSearchResults();
    updateSelectedMaterialDisplay();
    showApplicationContextSection();
    showPurposeSection();
    hideCommonMaterials();
    showResetButton();
    calculateMatches();
}

// Update selected material display
function updateSelectedMaterialDisplay() {
    const container = document.getElementById('selected-material-display');
    if (!container || !selectedMaterial) return;
    
    const material = selectedMaterial;
    
    container.innerHTML = `
        <div class="selected-material-content">
            <div class="selected-material-header">
                <h3>${escapeHtml(material.name)}</h3>
                ${material.featured ? '<span class="featured-badge">Featured</span>' : ''}
                <button class="clear-material-btn" aria-label="Clear selection">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="selected-material-details">
                <div><strong>Category:</strong> ${escapeHtml(material.category || 'N/A')}</div>
                ${material.composition ? `<div><strong>Composition:</strong> ${escapeHtml(material.composition)}</div>` : ''}
                ${material.hardness ? `<div><strong>Hardness:</strong> ${escapeHtml(material.hardness)}</div>` : ''}
                ${material.hardness_category ? `<div><span class="hardness-badge">${escapeHtml(material.hardness_category)}</span></div>` : ''}
            </div>
        </div>
    `;
    
    container.style.display = 'block';
    
    // Add clear button handler
    const clearBtn = container.querySelector('.clear-material-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', resetSelection);
    }
}

// Render purpose options
function renderPurposeOptions() {
    const container = document.getElementById('purpose-grid');
    if (!container) return;
    
    container.innerHTML = purposeOptions.map(option => `
        <button class="purpose-btn ${purposeFilter === option.value ? 'active' : ''}" 
                data-purpose="${option.value}">
            <span class="purpose-icon">${createIcon(option.icon)}</span>
            <div class="purpose-content">
                <div class="purpose-label">${option.label}</div>
                <div class="purpose-description">${option.description}</div>
            </div>
            ${purposeFilter === option.value ? '<div class="purpose-indicator"></div>' : ''}
        </button>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.purpose-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.purpose;
            purposeFilter = purposeFilter === value ? '' : value;
            updatePurposeButtons();
            calculateMatches();
        });
    });
}

// Update purpose buttons
function updatePurposeButtons() {
    document.querySelectorAll('.purpose-btn').forEach(btn => {
        const value = btn.dataset.purpose;
        if (purposeFilter === value) {
            btn.classList.add('active');
            if (!btn.querySelector('.purpose-indicator')) {
                btn.insertAdjacentHTML('beforeend', '<div class="purpose-indicator"></div>');
            }
        } else {
            btn.classList.remove('active');
            const indicator = btn.querySelector('.purpose-indicator');
            if (indicator) indicator.remove();
        }
    });
}

// Render application context options
function renderApplicationContextOptions() {
    const container = document.getElementById('application-context-grid');
    if (!container) return;
    
    container.innerHTML = applicationContextOptions.map(option => `
        <button class="context-btn ${applicationContext === option.value ? 'active' : ''}" 
                data-context="${option.value}">
            <span class="context-icon">${createIcon(option.icon)}</span>
            <div class="context-content">
                <div class="context-label">${option.label}</div>
                <div class="context-description">${option.description}</div>
            </div>
            ${applicationContext === option.value ? '<div class="context-indicator"></div>' : ''}
        </button>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.context-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.context;
            applicationContext = applicationContext === value ? '' : value;
            updateContextButtons();
            calculateMatches();
        });
    });
}

// Update context buttons
function updateContextButtons() {
    document.querySelectorAll('.context-btn').forEach(btn => {
        const value = btn.dataset.context;
        if (applicationContext === value) {
            btn.classList.add('active');
            if (!btn.querySelector('.context-indicator')) {
                btn.insertAdjacentHTML('beforeend', '<div class="context-indicator"></div>');
            }
        } else {
            btn.classList.remove('active');
            const indicator = btn.querySelector('.context-indicator');
            if (indicator) indicator.remove();
        }
    });
}

// Calculate etchant matches
function calculateMatches() {
    if (!selectedMaterial) {
        hideEtchantRecommendations();
        return;
    }
    
    const matches = matchEtchants(selectedMaterial, allEtchants, purposeFilter, applicationContext);
    
    if (matches.length === 0) {
        showEmptyState();
        hideEtchantRecommendations();
        return;
    }
    
    hideEmptyState();
    showEtchantRecommendations();
    renderEtchantMatches(matches);
    updateClearFiltersButton();
}

// Expert-level matching algorithm - comprehensive tier-based scoring system
function matchEtchants(material, etchants, purpose, context) {
    const materialCategory = getMaterialCategory(material);
    const composition = analyzeComposition(material);
    const microstructureTypes = getMicrostructureType(material);
    const heatTreatmentStates = getHeatTreatmentState(material);
    
    const matches = [];
    
    for (const etchant of etchants) {
        let score = 0;
        const reasons = [];
        const expertTips = [];
        const warnings = [];
        
        // Parse etchant data
        const compatible = parseArray(etchant.compatible_materials) || [];
        const incompatible = parseArray(etchant.incompatible_materials) || [];
        const etchantCategory = etchant.category || '';
        const etchantName = (etchant.name || '').toLowerCase();
        const reveals = ((etchant.reveals || '').toLowerCase());
        const typicalResults = ((etchant.typical_results || '').toLowerCase());
        const alternativeNames = parseArray(etchant.alternative_names) || [];
        const allEtchantNames = [etchantName, ...alternativeNames.map(n => n.toLowerCase())].join(' ');
        
        // Penalize incompatible materials early
        if (incompatible.includes(materialCategory)) {
            continue; // Skip incompatible etchants entirely
        }
        
        // TIER 1: Material Compatibility (Highest Priority - 150-200 points)
        if (compatible.includes(materialCategory)) {
            if (etchantCategory === 'material-specific') {
                score += 200;  // Material-specific etchants are the gold standard
                reasons.push('✓ Material-specific etchant');
            } else if (etchantCategory === 'specialty') {
                score += 150;  // Specialty etchants are highly targeted
                reasons.push('✓ Specialty etchant');
            } else {
                score += 100;  // General-purpose is good but lower priority
                reasons.push('✓ Compatible');
            }
        }
        
        // TIER 2: Material's Common Etchants (Proven combinations - 120 points)
        const commonEtchants = parseArray(material.common_etchants) || [];
        if (commonEtchants.some(name => {
            const nameLower = name.toLowerCase();
            return etchantName.includes(nameLower) || 
                   nameLower.includes(etchantName) ||
                   alternativeNames.some(alt => {
                       const altLower = alt.toLowerCase();
                       return altLower.includes(nameLower) || nameLower.includes(altLower);
                   });
        })) {
            score += 120;
            reasons.push('✓ Material-specific recommendation');
            expertTips.push('This is a documented, proven etchant for this material');
        }
        
        // TIER 3: Direct Material Link (90 points)
        const relatedMaterialIds = parseArray(etchant.related_material_ids) || [];
        if (relatedMaterialIds.includes(material.id)) {
            score += 90;
            reasons.push('✓ Direct database link');
        }
        
        // TIER 4: Purpose-Based Matching (Critical for user needs - 120-150 points)
        if (purpose && purpose !== 'general') {
            const purposeKeywords = {
                'grain-boundaries': ['grain boundary', 'grain boundaries', 'grain structure', 'grain size', 'grain'],
                'carbides': ['carbide', 'carbides', 'm23c6', 'm6c', 'm7c3', 'cementite'],
                'phases': ['phase', 'phases', 'phase structure', 'alpha', 'beta', 'gamma', 'delta', 'alpha-beta'],
                'precipitates': ['precipitate', 'precipitates', 'precipitation', 'intermetallic', 'precipitation'],
                'inclusions': ['inclusion', 'inclusions', 'non-metallic'],
                'twin-boundaries': ['twin', 'twins', 'twin boundary', 'twinning', 'annealing twin'],
                'martensite': ['martensite', 'martensitic'],
                'pearlite': ['pearlite', 'pearlitic', 'lamellar'],
                'ferrite': ['ferrite', 'ferritic', 'delta ferrite'],
                'austenite': ['austenite', 'austenitic', 'retained austenite'],
                'nodularity': ['nodularity', 'nodular', 'graphite', 'graphite shape', 'graphite distribution', 'ductile iron', 'nodular iron', 'spheroidal graphite'],
                'general': []
            };
            
            const keywords = purposeKeywords[purpose] || [];
            const searchText = `${reveals} ${typicalResults} ${allEtchantNames}`;
            
            // Check if etchant explicitly reveals what user wants
            const matchesPurpose = keywords.some(keyword => searchText.includes(keyword));
            
            if (matchesPurpose) {
                // If it's in the "reveals" field, it's a primary purpose - VERY HIGH weight
                if (keywords.some(keyword => reveals.includes(keyword))) {
                    score += 150;  // Purpose match should be very significant
                    reasons.push(`✓ Specifically reveals ${purpose.replace('-', ' ')}`);
                    expertTips.push(`This etchant is specifically designed to reveal ${purpose.replace('-', ' ')}`);
                } else {
                    // Mentioned in results or name - still good but secondary
                    score += 100;
                    reasons.push(`✓ Reveals ${purpose.replace('-', ' ')}`);
                }
            }
            
            // Special handling for nodularity - cast iron specific
            if (purpose === 'nodularity') {
                // Stead's reagent is specifically for revealing graphite in cast iron
                if (etchantName.includes('stead')) {
                    score += 80;
                    reasons.push('✓ Stead\'s reagent - specifically for graphite/nodularity');
                    expertTips.push('Stead\'s reagent is the standard etchant for revealing graphite shape and nodularity in cast iron');
                }
                // Cast iron materials should prioritize etchants that reveal graphite
                if (materialCategory === 'cast-iron' || material.name.toLowerCase().includes('cast iron') ||
                    material.name.toLowerCase().includes('ductile') || material.name.toLowerCase().includes('nodular')) {
                    if (reveals.includes('graphite') || etchantName.includes('stead') || etchantName.includes('picral')) {
                        score += 60;
                        reasons.push('✓ Good for cast iron nodularity analysis');
                    }
                }
            }
        }
        
        // TIER 5: Composition-Based Expert Matching (70-90 points)
        // Expert knowledge about alloy-specific etchants
        if (composition.hasChromium && materialCategory === 'stainless-steel') {
            // Stainless steel specific etchants
            if (etchantName.includes('kallings') || etchantName.includes('kalling')) {
                score += 80;
                reasons.push('✓ Kalling\'s - standard for austenitic stainless');
            } else if (etchantName.includes('glyceregia')) {
                score += 80;
                reasons.push('✓ Glyceregia - excellent for stainless and nickel alloys');
            } else if (etchantName.includes('vilella')) {
                score += 75;
                reasons.push('✓ Vilella\'s - excellent for tool steels and carbides');
            } else if (etchantName.includes('aqua regia')) {
                score += 70;
                reasons.push('✓ Aqua Regia - very aggressive for difficult materials');
            }
            
            // Electrolytic etchants are often preferred for stainless
            if (etchant.application_method === 'electrolytic') {
                score += 70;
                reasons.push('✓ Electrolytic - preferred method for stainless');
                expertTips.push('Electrolytic etching provides superior control and reproducibility for stainless steels');
            }
        }
        
        if (composition.hasNickel || materialCategory === 'nickel-alloys') {
            if (etchantName.includes('kallings') || etchantName.includes('kalling')) {
                score += 75;
                reasons.push('✓ Kalling\'s - standard for nickel alloys');
            } else if (etchantName.includes('glyceregia')) {
                score += 80;
                reasons.push('✓ Glyceregia - excellent for nickel superalloys');
            } else if (etchantName.includes('inconel')) {
                score += 75;
                reasons.push('✓ Inconel-specific etchant');
            }
        }
        
        if (composition.hasTitanium || materialCategory === 'titanium') {
            if (etchantName.includes('kroll')) {
                score += 90;
                reasons.push('✓ Kroll\'s - standard etchant for titanium');
                expertTips.push('Kroll\'s reagent is the industry standard for titanium alloys');
            } else if (etchantName.includes('ti-ap-16') || etchantName.includes('ap-16')) {
                score += 75;
                reasons.push('✓ Alternative titanium etchant');
            }
        }
        
        if (composition.hasAluminum || materialCategory === 'aluminum') {
            if (etchantName.includes('keller')) {
                score += 90;
                reasons.push('✓ Keller\'s - standard etchant for aluminum');
                expertTips.push('Keller\'s reagent is the most common etchant for aluminum alloys');
            } else if (etchantName.includes('tucker')) {
                score += 75;
                reasons.push('✓ Tucker\'s - good for heat-treated aluminum');
            } else if (etchantName.includes('barker') && etchant.application_method === 'electrolytic') {
                score += 80;
                reasons.push('✓ Barker\'s electrolytic - excellent for aluminum');
                expertTips.push('Barker\'s electrolytic produces beautiful interference colors for phase identification');
            }
        }
        
        if (composition.hasCopper || materialCategory === 'copper-brass') {
            if (etchantName.includes('ammonium persulfate') || etchantName.includes('persulfate')) {
                score += 85;
                reasons.push('✓ Ammonium Persulfate - standard for copper/brass');
            } else if (etchantName.includes('ferric chloride') || etchantName.includes('fecl')) {
                score += 70;
                reasons.push('✓ Ferric Chloride - good for copper alloys');
            } else if (etchantName.includes('marble')) {
                score += 70;
                reasons.push('✓ Marble\'s - excellent for revealing twins');
            }
        }
        
        // TIER 6: Microstructure-Based Matching (50-60 points)
        // Match etchants to specific microstructures
        if (microstructureTypes.length > 0) {
            const searchText = `${reveals} ${typicalResults}`;
            
            if (microstructureTypes.includes('martensitic')) {
                if (reveals.includes('martensite') || reveals.includes('martensitic')) {
                    score += 60;
                    reasons.push('✓ Specifically for martensitic structures');
                } else if (etchantName.includes('nital') || etchantName.includes('picral') || 
                           etchantName.includes('vilella')) {
                    score += 50;
                    reasons.push('✓ Good for martensitic structures');
                }
            }
            
            if (microstructureTypes.includes('austenitic')) {
                if (reveals.includes('austenite') || reveals.includes('austenitic')) {
                    score += 60;
                    reasons.push('✓ Specifically for austenitic structures');
                } else if (etchant.application_method === 'electrolytic' ||
                           etchantName.includes('kallings') || etchantName.includes('glyceregia')) {
                    score += 50;
                    reasons.push('✓ Good for austenitic structures');
                }
            }
            
            if (microstructureTypes.includes('ferritic')) {
                if (reveals.includes('ferrite') || reveals.includes('ferritic')) {
                    score += 55;
                    reasons.push('✓ Specifically for ferritic structures');
                } else if (etchantName.includes('nital') || etchantName.includes('picral')) {
                    score += 45;
                    reasons.push('✓ Good for ferritic structures');
                }
            }
            
            if (microstructureTypes.includes('pearlitic')) {
                if (reveals.includes('pearlite') || reveals.includes('pearlitic')) {
                    score += 60;
                    reasons.push('✓ Specifically for pearlitic structures');
                    if (etchantName.includes('picral')) {
                        score += 20;  // Picral is excellent for pearlite
                        expertTips.push('Picral is specifically designed to reveal pearlite structure');
                    }
                } else if (etchantName.includes('nital') || etchantName.includes('picral')) {
                    score += 45;
                    reasons.push('✓ Good for pearlitic structures');
                }
            }
            
            if (microstructureTypes.includes('duplex')) {
                if (etchantName.includes('weck') || etchantName.includes('klemm') || 
                    etchantName.includes('beraha')) {
                    score += 70;
                    reasons.push('✓ Color etchant for duplex structures');
                    expertTips.push('Color etchants are excellent for distinguishing phases in duplex stainless');
                }
            }
        }
        
        // EXPERT: Heat treatment state awareness
        if (heatTreatmentStates.length > 0) {
            // Quenched/tempered materials may need different etchants
            if (heatTreatmentStates.includes('quenched') || heatTreatmentStates.includes('tempered')) {
                if (etchantName.includes('nital') || etchantName.includes('picral')) {
                    score += 30;
                    reasons.push('✓ For heat-treated materials');
                    expertTips.push('For quenched/tempered materials, start with shorter etch times');
                }
            }
            
            // Solution-treated materials (especially aluminum, stainless)
            if (heatTreatmentStates.includes('solution-treated')) {
                if (etchantName.includes('keller') || etchantName.includes('weck') || 
                    etchant.application_method === 'electrolytic') {
                    score += 25;
                    reasons.push('✓ For solution-treated materials');
                }
            }
        }
        
        // TIER 7: Application Context Matching (60-100 points)
        // Context-specific recommendations - should have significant impact on ranking
        if (context && context !== 'general') {
            if (context === 'quality-control') {
                // For QC, ASTM-referenced etchants are CRITICAL - should rank very high
                const astmRefs = parseArray(etchant.astm_references);
                if (astmRefs && astmRefs.length > 0) {
                    score += 100;  // ASTM is critical for QC
                    reasons.push('✓ ASTM standard - ideal for QC');
                    // Add tip only if not already added in TIER 11
                    if (!expertTips.some(tip => tip.includes('ASTM'))) {
                        expertTips.push('ASTM-referenced etchants ensure reproducibility and compliance with standards');
                    }
                } else {
                    // Non-ASTM etchants should rank lower for QC applications
                    score -= 30;
                }
                if (etchant.featured) {
                    score += 50;
                    reasons.push('✓ Featured - proven reliability');
                }
            }
            
            if (context === 'failure-analysis') {
                // Prefer etchants that reveal multiple features - critical for failure analysis
                const revealCount = (etchant.reveals || '').split(',').length;
                if (revealCount > 2) {
                    score += 80;  // Multi-feature is very important for failure analysis
                    reasons.push('✓ Multi-feature reveal');
                    // Only add tip if not already added
                    if (!expertTips.some(tip => tip.includes('progressive etching'))) {
                        expertTips.push('For failure analysis, consider progressive etching with multiple etchants');
                    }
                }
                // Specialty etchants often better for failure analysis
                if (etchantCategory === 'specialty') {
                    score += 50;
                    reasons.push('✓ Specialty etchant for detailed analysis');
                }
            }
            
            if (context === 'heat-treatment-verification') {
                // Prefer etchants that reveal heat treatment effects
                if (reveals.includes('martensite') || reveals.includes('bainite') || 
                    reveals.includes('prior austenite') || etchantName.includes('sodium metabisulfite')) {
                    score += 90;
                    reasons.push('✓ Reveals heat treatment structure');
                    expertTips.push('This etchant is specifically effective for revealing heat treatment effects');
                } else if (etchantName.includes('nital') || etchantName.includes('picral')) {
                    score += 60;
                    reasons.push('✓ Good for heat treatment verification');
                }
            }
            
            if (context === 'welding-analysis') {
                // Welding analysis needs etchants that work across different zones
                if (etchantName.includes('nital') || etchantName.includes('vilella') || 
                    etchant.application_method === 'electrolytic') {
                    score += 70;
                    reasons.push('✓ Suitable for weld analysis');
                    expertTips.push('For weld analysis, consider etching base metal, HAZ, and fusion zone separately');
                }
            }
            
            if (context === 'research') {
                // For research, prefer etchants with detailed documentation and versatility
                const astmRefs = parseArray(etchant.astm_references);
                if (astmRefs && astmRefs.length > 0) {
                    score += 40;
                    reasons.push('✓ ASTM standard - well documented');
                }
                const revealCount = (etchant.reveals || '').split(',').length;
                if (revealCount > 2) {
                    score += 50;
                    reasons.push('✓ Multi-feature reveal - versatile for research');
                }
            }
        }
        
        // TIER 8: Hardness-Based Optimization (30-40 points)
        // Match etchant concentration to material hardness
        if (material.hardness_category) {
            const hardness = material.hardness_category;
            
            if (hardness === 'hard' || hardness === 'very-hard') {
                // Higher concentration Nital for harder materials
                if (etchantName.match(/nital.*[5-9]|nital.*8|nital.*10|[5-9]% nital|8% nital|10% nital/)) {
                    score += 40;
                    reasons.push('✓ Higher concentration for hard materials');
                    expertTips.push('Harder materials require higher concentrations or longer etch times');
                } else if (etchantName.match(/nital.*[2-3]|2% nital|3% nital/)) {
                    warnings.push('Lower concentration Nital may be insufficient for very hard materials');
                }
            } else if (hardness === 'soft' || hardness === 'medium') {
                // Lower concentration for softer materials
                if (etchantName.match(/nital.*[2-3]|2% nital|3% nital/)) {
                    score += 35;
                    reasons.push('✓ Appropriate concentration for softer materials');
                    expertTips.push('Softer materials require shorter etch times to prevent over-etching');
                } else if (etchantName.match(/nital.*[8-9]|nital.*10|8% nital|10% nital/)) {
                    warnings.push('Higher concentration Nital may be too aggressive - start with 2-3%');
                }
            }
        }
        
        // TIER 9: Carbon Content Matching (25-35 points)
        if (composition.carbonContent) {
            if (composition.carbonContent === 'high') {
                if (etchantName.includes('picral')) {
                    score += 35;
                    reasons.push('✓ Picral excellent for high-carbon steels');
                    expertTips.push('Picral is specifically excellent for revealing cementite networks in high-carbon steels');
                } else if (etchantName.includes('nital')) {
                    score += 25;
                    reasons.push('✓ Nital good for high-carbon steels');
                }
            } else if (composition.carbonContent === 'low') {
                if (etchantName.includes('nital')) {
                    score += 30;
                    reasons.push('✓ Nital standard for low-carbon steels');
                }
            }
        }
        
        // TIER 10: Heat Treatment State (20-30 points)
        if (heatTreatmentStates.length > 0) {
            if (heatTreatmentStates.includes('quenched') || heatTreatmentStates.includes('tempered')) {
                if (etchantName.includes('nital') || etchantName.includes('picral') ||
                    etchantName.includes('sodium metabisulfite')) {
                    score += 30;
                    reasons.push('✓ Suitable for quenched/tempered materials');
                    expertTips.push('For quenched/tempered materials, start with shorter etch times and monitor closely');
                }
            }
            
            if (heatTreatmentStates.includes('solution-treated')) {
                if (etchantName.includes('keller') || etchantName.includes('weck') || 
                    etchant.application_method === 'electrolytic') {
                    score += 25;
                    reasons.push('✓ Good for solution-treated materials');
                }
            }
        }
        
        // TIER 11: Quality Indicators (10-25 points)
        // ASTM standard compliance - important for QC
        const astmRefs = parseArray(etchant.astm_references);
        if (astmRefs && astmRefs.length > 0) {
            score += 25;
            reasons.push(`✓ ASTM ${astmRefs[0]}`);
            // Only add tip if not already added in TIER 7 for QC context
            if (context === 'quality-control' && !expertTips.some(tip => tip.includes('ASTM'))) {
                expertTips.push(`ASTM ${astmRefs[0]} compliance ensures reproducibility for quality control`);
            }
        }
        
        // Featured etchants - these are the most commonly used and reliable
        if (etchant.featured) {
            score += 20;
            reasons.push('✓ Featured - most commonly used');
            if (!expertTips.some(tip => tip.includes('industry-standard'))) {
                expertTips.push('Featured etchants are industry-standard choices with proven reliability');
            }
        }
        
        // PACE product available - convenience factor
        if (etchant.pace_product_available) {
            score += 10;
            reasons.push('✓ Pre-mixed available');
        }
        
        // EXPERT: Safety warnings for specific combinations
        const hazards = parseArray(etchant.hazards) || [];
        if (hazards.length > 0) {
            if (hazards.includes('corrosive') && materialCategory === 'aluminum') {
                warnings.push('Corrosive etchants on aluminum require careful handling - ensure proper ventilation');
            }
            if (hazards.includes('toxic') && context === 'quality-control') {
                warnings.push('Toxic etchant - ensure proper PPE and disposal procedures for production use');
            }
        }
        
        // EXPERT: Time and temperature optimization tips
        if (etchant.typical_time_seconds) {
            if (material.hardness_category === 'very-hard' && etchant.typical_time_seconds < 10) {
                expertTips.push(`Very hard materials may require longer than ${etchant.typical_time_seconds}s - monitor visually`);
            }
            if (material.hardness_category === 'soft' && etchant.typical_time_seconds > 30) {
                expertTips.push(`Soft materials may over-etch in ${etchant.typical_time_seconds}s - start with shorter times`);
            }
        }
        
        // Only include etchants with positive score
        if (score > 0) {
            // Deduplicate expert tips and warnings
            const uniqueExpertTips = Array.from(new Set(expertTips));
            const uniqueWarnings = Array.from(new Set(warnings));
            
            matches.push({
                etchant,
                score,
                matchReasons: reasons,
                expertTips: uniqueExpertTips.length > 0 ? uniqueExpertTips : undefined,
                warnings: uniqueWarnings.length > 0 ? uniqueWarnings : undefined,
                recommendedSequence: undefined // Will be set below for failure analysis
            });
        }
    }
    
    // Sort by score (highest first), then assign sequence numbers for progressive etching
    const sorted = matches.sort((a, b) => b.score - a.score);
    
    // Assign sequence numbers for top recommendations (for progressive etching guidance)
    sorted.forEach((match, index) => {
        if (index < 3 && context === 'failure-analysis') {
            match.recommendedSequence = index + 1;
        }
    });
    
    // Limit to top 10 results
    return sorted.slice(0, 10);
}

// Helper functions for material analysis
function getMaterialCategory(material) {
    const category = (material.category || '').toLowerCase();
    const name = (material.name || '').toLowerCase();
    
    if (category.includes('carbon') || category.includes('low alloy') || name.includes('carbon steel')) {
        return 'carbon-steel';
    }
    if (category.includes('stainless') || name.includes('stainless')) {
        return 'stainless-steel';
    }
    if (category.includes('aluminum') || name.includes('aluminum') || name.includes('aluminium')) {
        return 'aluminum';
    }
    if (category.includes('copper') || category.includes('brass') || name.includes('copper') || name.includes('brass')) {
        return 'copper-brass';
    }
    if (category.includes('titanium') || name.includes('titanium')) {
        return 'titanium';
    }
    if (category.includes('nickel') || name.includes('nickel') || name.includes('inconel')) {
        return 'nickel-alloys';
    }
    if (category.includes('cast iron') || name.includes('cast iron')) {
        return 'cast-iron';
    }
    
    return category;
}

function analyzeComposition(material) {
    const comp = ((material.composition || '') + ' ' + (material.name || '')).toLowerCase();
    const name = (material.name || '').toLowerCase();
    
    return {
        hasChromium: comp.includes('cr') || comp.includes('chromium') || name.includes('stainless'),
        hasNickel: comp.includes('ni') || comp.includes('nickel') || name.includes('inconel') || name.includes('monel'),
        hasMolybdenum: comp.includes('mo') || comp.includes('molybdenum'),
        hasTitanium: comp.includes('ti') || comp.includes('titanium'),
        hasAluminum: comp.includes('al') || comp.includes('aluminum') || comp.includes('aluminium'),
        hasCopper: comp.includes('cu') || comp.includes('copper') || name.includes('brass') || name.includes('bronze'),
        carbonContent: 
            comp.includes('0.6') || comp.includes('0.7') || comp.includes('0.8') || comp.includes('0.9') || comp.includes('1.') ? 'high' :
            comp.includes('0.3') || comp.includes('0.4') || comp.includes('0.5') ? 'medium' :
            comp.includes('0.1') || comp.includes('0.2') || comp.includes('low carbon') ? 'low' : null
    };
}

function getMicrostructureType(material) {
    const micro = ((material.microstructure || '') + ' ' + (material.name || '')).toLowerCase();
    const types = [];
    
    if (micro.includes('martensite') || micro.includes('martensitic')) types.push('martensitic');
    if (micro.includes('austenite') || micro.includes('austenitic')) types.push('austenitic');
    if (micro.includes('ferrite') || micro.includes('ferritic')) types.push('ferritic');
    if (micro.includes('pearlite') || micro.includes('pearlitic')) types.push('pearlitic');
    if (micro.includes('bainite') || micro.includes('bainitic')) types.push('bainitic');
    if (micro.includes('duplex')) types.push('duplex');
    
    return types;
}

function getHeatTreatmentState(material) {
    const heat = (material.heat_treatment || '').toLowerCase();
    const states = [];
    
    if (heat.includes('anneal')) states.push('annealed');
    if (heat.includes('quench')) states.push('quenched');
    if (heat.includes('temper')) states.push('tempered');
    if (heat.includes('normaliz')) states.push('normalized');
    if (heat.includes('solution')) states.push('solution-treated');
    if (heat.includes('age')) states.push('aged');
    if (heat.includes('stress')) states.push('stress-relieved');
    
    return states;
}

function parseArray(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : null;
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Render etchant matches
function renderEtchantMatches(matches) {
    const container = document.getElementById('etchant-matches');
    if (!container) return;
    
    const countEl = document.getElementById('results-count');
    if (countEl) {
        countEl.textContent = `(${matches.length} found)`;
    }
    
    // Check if we should show progressive etching recommendation
    const showProgressiveEtching = applicationContext === 'failure-analysis' && matches.length > 1;
    
    container.innerHTML = matches.map((match, index) => {
        const etchant = match.etchant;
        const scorePercentage = getScorePercentage(match.score);
        const scoreColor = getScoreColor(match.score);
        const slug = etchant.slug || etchant.id || '';
        
        return `
            <a href="/etchants/${slug}.html" class="etchant-match-card">
                <div class="match-score-bar ${scoreColor}" style="width: ${scorePercentage}%"></div>
                <div class="match-card-content">
                    <div class="match-badges">
                        ${index < 3 ? `<span class="rank-badge">#${index + 1}</span>` : ''}
                        ${etchant.featured ? `<span class="featured-badge">${createIcon('star')} Featured</span>` : ''}
                        ${etchant.pace_product_available ? `<span class="available-badge">${createIcon('shoppingCart')} Available</span>` : ''}
                    </div>
                    <div class="match-main">
                        <h3 class="match-name">${escapeHtml(etchant.name)}</h3>
                        <div class="match-score-text">${scorePercentage}% match</div>
                    </div>
                    ${match.matchReasons.length > 0 ? `
                        <div class="match-reasons">
                            ${match.matchReasons.map(reason => `
                                <span class="reason-badge">${escapeHtml(reason)}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                    ${match.recommendedSequence ? `
                        <div class="progressive-etching-badge">
                            <span class="sequence-number">${match.recommendedSequence}</span>
                            <span class="sequence-text">Recommended for progressive etching sequence</span>
                        </div>
                    ` : ''}
                    ${match.expertTips ? `
                        <div class="expert-tips">
                            <div class="tips-header">${createIcon('lightbulb')} Expert Tip:</div>
                            ${match.expertTips.map(tip => `
                                <div class="tip-text">${escapeHtml(tip)}</div>
                            `).join('')}
                        </div>
                    ` : ''}
                    ${match.warnings ? `
                        <div class="warnings">
                            <div class="warnings-header">${createIcon('alertTriangle')} Important:</div>
                            ${match.warnings.map(warning => `
                                <div class="warning-text">${escapeHtml(warning)}</div>
                            `).join('')}
                        </div>
                    ` : ''}
                    ${etchant.typical_results ? `
                        <div class="match-typical-results">
                            <strong>Typical Results:</strong> ${escapeHtml(etchant.typical_results)}
                        </div>
                    ` : ''}
                    <div class="match-details">
                        <div><strong>Composition:</strong> ${escapeHtml(etchant.composition || 'N/A')}</div>
                        ${etchant.concentration ? `<div><strong>Concentration:</strong> ${escapeHtml(etchant.concentration)}</div>` : ''}
                        ${etchant.application_method ? `<div><strong>Method:</strong> ${escapeHtml(etchant.application_method.charAt(0).toUpperCase() + etchant.application_method.slice(1))}</div>` : ''}
                        ${etchant.typical_time_seconds ? `<div><strong>Time:</strong> ${etchant.typical_time_seconds}s</div>` : ''}
                        ${etchant.temperature_celsius ? `<div><strong>Temperature:</strong> ${etchant.temperature_celsius}°C</div>` : ''}
                        ${etchant.voltage ? `<div><strong>Voltage:</strong> ${etchant.voltage}V</div>` : ''}
                    </div>
                    ${etchant.reveals ? `
                        <div class="match-reveals">
                            <strong>Reveals:</strong> ${escapeHtml(etchant.reveals)}
                        </div>
                    ` : ''}
                    <div class="match-footer">
                        <span class="view-details">Click to view full details →</span>
                    </div>
                </div>
            </a>
        `;
    }).join('');
    
    // Add progressive etching strategy section for failure analysis
    if (showProgressiveEtching && matches.length > 1) {
        const progressiveSection = `
            <div class="progressive-etching-section">
                <div class="progressive-header">
                    <div class="progressive-icon">${createIcon('lightbulb')}</div>
                    <div>
                        <h3 class="progressive-title">Progressive Etching Strategy</h3>
                        <p class="progressive-description">
                            For failure analysis, consider using multiple etchants in sequence to reveal different microstructural features progressively.
                        </p>
                    </div>
                </div>
                <div class="progressive-sequence">
                    ${matches.slice(0, 3).map((match, idx) => `
                        <div class="progressive-step">
                            <div class="step-number-circle">${idx + 1}</div>
                            <div class="step-content">
                                <a href="/etchants/${match.etchant.slug || match.etchant.id || ''}.html" class="step-etchant-name">
                                    ${escapeHtml(match.etchant.name)}
                                </a>
                                <div class="step-reveals">${escapeHtml(match.etchant.reveals || 'General microstructure features')}</div>
                                ${match.expertTips && match.expertTips.length > 0 ? `
                                    <div class="step-tip">${escapeHtml(match.expertTips[0])}</div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="progressive-note">
                    <div class="note-header">${createIcon('lightbulb')} Expert Tip:</div>
                    <div class="note-text">
                        After each etching step, document the results before proceeding. This allows you to compare different microstructural features and identify the root cause of failure.
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', progressiveSection);
    }
}

function getScorePercentage(score) {
    const maxScore = 600;
    return Math.min(100, Math.round((score / maxScore) * 100));
}

function getScoreColor(score) {
    const percentage = getScorePercentage(score);
    if (percentage >= 80) return 'score-green';
    if (percentage >= 60) return 'score-blue';
    if (percentage >= 40) return 'score-yellow';
    return 'score-gray';
}

// UI helper functions
function hideLoadingState() {
    const el = document.getElementById('loading-state');
    if (el) el.style.display = 'none';
}

function hideCommonMaterials() {
    const el = document.getElementById('common-materials');
    if (el) el.style.display = 'none';
}

function showResetButton() {
    const el = document.getElementById('reset-btn');
    if (el) el.style.display = 'block';
}

function showApplicationContextSection() {
    const el = document.getElementById('application-context-section');
    if (el) el.style.display = 'block';
}

function showPurposeSection() {
    const el = document.getElementById('purpose-section');
    if (el) el.style.display = 'block';
}

function showEtchantRecommendations() {
    const el = document.getElementById('etchant-recommendations');
    if (el) el.style.display = 'block';
}

function hideEtchantRecommendations() {
    const el = document.getElementById('etchant-recommendations');
    if (el) el.style.display = 'none';
}

function showEmptyState() {
    const el = document.getElementById('empty-state');
    if (el) el.style.display = 'block';
}

function hideEmptyState() {
    const el = document.getElementById('empty-state');
    if (el) el.style.display = 'none';
}

function updateClearFiltersButton() {
    const el = document.getElementById('clear-filters-btn');
    if (el) {
        el.style.display = (purposeFilter || applicationContext) ? 'block' : 'none';
    }
}

function clearFilters() {
    purposeFilter = '';
    applicationContext = '';
    updatePurposeButtons();
    updateContextButtons();
    calculateMatches();
    updateClearFiltersButton();
}

function resetSelection() {
    selectedMaterial = null;
    purposeFilter = '';
    applicationContext = '';
    
    document.getElementById('material-search').value = '';
    document.getElementById('selected-material-display').style.display = 'none';
    document.getElementById('common-materials').style.display = 'block';
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('application-context-section').style.display = 'none';
    document.getElementById('purpose-section').style.display = 'none';
    document.getElementById('etchant-recommendations').style.display = 'none';
    document.getElementById('empty-state').style.display = 'none';
    hideSearchResults();
    
    updatePurposeButtons();
    updateContextButtons();
    updateClearFiltersButton();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
