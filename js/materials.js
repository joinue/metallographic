// Materials Database JavaScript
// Handles CSV parsing, filtering, searching, and pagination

const ITEMS_PER_PAGE = 24;
let allMaterials = [];
let filteredMaterials = [];
let currentPage = 1;
let categories = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadMaterials();
    setupEventListeners();
});

// Load materials from CSV
async function loadMaterials() {
    try {
        const response = await fetch('/materials_rows.csv');
        const csvText = await response.text();
        allMaterials = parseCSV(csvText);
        
        // Filter only published materials
        allMaterials = allMaterials.filter(m => m.status === 'published');
        
        // Sort materials alphabetically by name
        allMaterials.sort((a, b) => {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });
        
        // Extract unique categories
        categories = [...new Set(allMaterials.map(m => m.category).filter(Boolean))].sort();
        
        // Initialize filtered materials
        filteredMaterials = allMaterials;
        
        // Render UI
        renderCategoryFilters();
        renderMaterials();
        updateResultsCount();
        hideLoadingState();
    } catch (error) {
        console.error('Error loading materials:', error);
        document.getElementById('materials-grid').innerHTML = 
            '<div class="error-state"><p>Error loading materials. Please try again later.</p></div>';
        hideLoadingState();
    }
}

// Parse CSV text into array of objects using PapaParse
function parseCSV(csvText) {
    if (typeof Papa === 'undefined') {
        console.error('PapaParse is not loaded. Falling back to simple parser.');
        return parseCSVSimple(csvText);
    }
    
    const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        transform: (value) => {
            // Try to parse JSON arrays/objects
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

// Fallback simple CSV parser (for compatibility)
function parseCSVSimple(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    // Parse header
    const headers = parseCSVLine(lines[0]);
    
    // Parse data rows
    const materials = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length !== headers.length) continue;
        
        const material = {};
        headers.forEach((header, index) => {
            let value = values[index] || '';
            // Remove quotes if present
            value = value.replace(/^"|"$/g, '');
            // Parse JSON arrays/objects
            if (value.startsWith('[') || value.startsWith('{')) {
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    // Keep as string if parsing fails
                }
            }
            material[header] = value;
        });
        materials.push(material);
    }
    
    return materials;
}

// Parse a single CSV line handling quoted fields (fallback only)
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Escaped quote
                current += '"';
                i++; // Skip next quote
            } else {
                // Toggle quote state
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            // End of field
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    // Add last field
    values.push(current);
    
    return values;
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Category filter buttons are set up in renderCategoryFilters
}

// Handle search input
function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    filterMaterials(query, getSelectedCategory());
}

// Get selected category
function getSelectedCategory() {
    const activeBtn = document.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.category : 'All';
}

// Filter materials based on search and category
function filterMaterials(searchQuery = '', category = 'All') {
    filteredMaterials = allMaterials.filter(material => {
        // Category filter
        if (category !== 'All' && material.category !== category) {
            return false;
        }
        
        // Search filter
        if (!searchQuery) return true;
        
        const searchLower = searchQuery.toLowerCase();
        const name = (material.name || '').toLowerCase();
        const categoryName = (material.category || '').toLowerCase();
        const composition = (material.composition || '').toLowerCase();
        const microstructure = (material.microstructure || '').toLowerCase();
        const hardness = (material.hardness || '').toLowerCase();
        
        // Parse alternative names (can be array or string)
        let alternativeNames = '';
        if (material.alternative_names) {
            if (Array.isArray(material.alternative_names)) {
                alternativeNames = material.alternative_names.join(' ').toLowerCase();
            } else if (typeof material.alternative_names === 'string') {
                // Try to parse as JSON array
                try {
                    const parsed = JSON.parse(material.alternative_names);
                    if (Array.isArray(parsed)) {
                        alternativeNames = parsed.join(' ').toLowerCase();
                    } else {
                        alternativeNames = material.alternative_names.toLowerCase();
                    }
                } catch (e) {
                    alternativeNames = material.alternative_names.toLowerCase();
                }
            }
        }
        
        return name.includes(searchLower) ||
               categoryName.includes(searchLower) ||
               composition.includes(searchLower) ||
               microstructure.includes(searchLower) ||
               hardness.includes(searchLower) ||
               alternativeNames.includes(searchLower);
    });
    
    // Sort filtered materials alphabetically by name
    filteredMaterials.sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
    });
    
    currentPage = 1;
    renderMaterials();
    updateResultsCount();
    updatePagination();
}

// Render category filter buttons
function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;
    
    // Add category buttons
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.category = category;
        btn.textContent = category;
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter materials
            const searchQuery = document.getElementById('search-input').value;
            filterMaterials(searchQuery, category);
        });
        container.appendChild(btn);
    });
    
    // Setup "All" button
    const allBtn = container.querySelector('[data-category="All"]');
    if (allBtn) {
        allBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            allBtn.classList.add('active');
            const searchQuery = document.getElementById('search-input').value;
            filterMaterials(searchQuery, 'All');
        });
    }
}

// Render materials grid
function renderMaterials() {
    const grid = document.getElementById('materials-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!grid) return;
    
    if (filteredMaterials.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredMaterials.length);
    const paginatedMaterials = filteredMaterials.slice(startIndex, endIndex);
    
    // Render materials
    grid.innerHTML = paginatedMaterials.map(material => createMaterialCard(material)).join('');
    
    // Update pagination
    updatePagination();
}

// Create material card HTML
function createMaterialCard(material) {
    const category = material.category || 'Unknown';
    const name = material.name || 'Unnamed Material';
    const hardness = material.hardness || 'N/A';
    const microstructure = material.microstructure || 'N/A';
    const slug = material.slug || material.id || '';
    
    // Get category badge colors
    const badgeColors = getCategoryBadgeColors(category);
    
    // Create card
    return `
        <div class="material-card">
            <div class="material-card-header">
                <span class="material-category-badge ${badgeColors.bg} ${badgeColors.text} ${badgeColors.border}">
                    ${category}
                </span>
            </div>
            <h3 class="material-name">${escapeHtml(name)}</h3>
            <div class="material-properties">
                ${hardness !== 'N/A' ? `
                    <div class="material-property">
                        <span class="property-label">Hardness:</span>
                        <span class="property-value">${escapeHtml(hardness)}</span>
                    </div>
                ` : ''}
                <div class="material-property">
                    <span class="property-label">Microstructure:</span>
                    <span class="property-value">${escapeHtml(microstructure)}</span>
                </div>
            </div>
            <div class="material-card-footer">
                <a href="/materials/${slug}.html" class="material-link">
                    View Details
                    <svg class="link-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        </div>
    `;
}

// Get category badge colors
function getCategoryBadgeColors(category) {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('carbon steel') || categoryLower.includes('steel')) {
        return {
            bg: 'badge-slate',
            text: 'badge-text-slate',
            border: 'badge-border-slate'
        };
    }
    if (categoryLower.includes('stainless')) {
        return {
            bg: 'badge-gray',
            text: 'badge-text-gray',
            border: 'badge-border-gray'
        };
    }
    if (categoryLower.includes('aluminum') || categoryLower.includes('aluminium')) {
        return {
            bg: 'badge-blue',
            text: 'badge-text-blue',
            border: 'badge-border-blue'
        };
    }
    if (categoryLower.includes('titanium')) {
        return {
            bg: 'badge-cyan',
            text: 'badge-text-cyan',
            border: 'badge-border-cyan'
        };
    }
    if (categoryLower.includes('nickel')) {
        return {
            bg: 'badge-indigo',
            text: 'badge-text-indigo',
            border: 'badge-border-indigo'
        };
    }
    if (categoryLower.includes('copper') || categoryLower.includes('brass') || categoryLower.includes('bronze')) {
        return {
            bg: 'badge-amber',
            text: 'badge-text-amber',
            border: 'badge-border-amber'
        };
    }
    if (categoryLower.includes('magnesium')) {
        return {
            bg: 'badge-lime',
            text: 'badge-text-lime',
            border: 'badge-border-lime'
        };
    }
    if (categoryLower.includes('composite')) {
        return {
            bg: 'badge-orange',
            text: 'badge-text-orange',
            border: 'badge-border-orange'
        };
    }
    if (categoryLower.includes('ceramic')) {
        return {
            bg: 'badge-stone',
            text: 'badge-text-stone',
            border: 'badge-border-stone'
        };
    }
    
    // Default
    return {
        bg: 'badge-primary',
        text: 'badge-text-primary',
        border: 'badge-border-primary'
    };
}

// Update results count
function updateResultsCount() {
    const countEl = document.getElementById('results-count');
    if (!countEl) return;
    
    const total = filteredMaterials.length;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, total);
    
    if (total === 0) {
        countEl.textContent = 'No materials found';
    } else if (total <= ITEMS_PER_PAGE) {
        countEl.textContent = `Showing ${total} material${total !== 1 ? 's' : ''}`;
    } else {
        countEl.textContent = `Showing ${startIndex}-${endIndex} of ${total} materials`;
    }
}

// Update pagination
function updatePagination() {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;
    
    const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
    
    if (totalPages <= 1) {
        paginationEl.style.display = 'none';
        return;
    }
    
    paginationEl.style.display = 'flex';
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                ${currentPage === 1 ? 'disabled' : ''}
                onclick="goToPage(${currentPage - 1})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span class="pagination-text">Previous</span>
        </button>
    `;
    
    // Page numbers
    const pages = [];
    if (totalPages <= 7) {
        // Show all pages
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Show first, last, and pages around current
        pages.push(1);
        
        if (currentPage <= 3) {
            // Near start: 1 2 3 4 ... last
            for (let i = 2; i <= 4; i++) {
                pages.push(i);
            }
            pages.push('ellipsis');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
            // Near end: 1 ... (last-3) (last-2) (last-1) last
            pages.push('ellipsis');
            for (let i = totalPages - 3; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Middle: 1 ... (current-1) current (current+1) ... last
            pages.push('ellipsis');
            pages.push(currentPage - 1);
            pages.push(currentPage);
            pages.push(currentPage + 1);
            pages.push('ellipsis');
            pages.push(totalPages);
        }
    }
    
    pages.forEach(page => {
        if (page === 'ellipsis') {
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
        } else {
            paginationHTML += `
                <button class="pagination-btn ${currentPage === page ? 'active' : ''}" 
                        onclick="goToPage(${page})">
                    ${page}
                </button>
            `;
        }
    });
    
    // Next button
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                ${currentPage === totalPages ? 'disabled' : ''}
                onclick="goToPage(${currentPage + 1})">
            <span class="pagination-text">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
    `;
    
    paginationEl.innerHTML = paginationHTML;
}

// Go to specific page (global function for onclick handlers)
window.goToPage = function(page) {
    const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderMaterials();
    updateResultsCount();
    updatePagination();
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hide loading state
function hideLoadingState() {
    const loadingState = document.getElementById('loading-state');
    if (loadingState) {
        loadingState.style.display = 'none';
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

