// Etchants Database JavaScript
// Handles CSV parsing, filtering, searching, and pagination

const ITEMS_PER_PAGE = 24;
let allEtchants = [];
let filteredEtchants = [];
let currentPage = 1;
let categories = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadEtchants();
    setupEventListeners();
});

// Load etchants from CSV
async function loadEtchants() {
    try {
        const response = await fetch('/etchants_rows.csv');
        const csvText = await response.text();
        allEtchants = parseCSV(csvText);
        
        // Filter only published etchants
        allEtchants = allEtchants.filter(e => e.status === 'published');
        
        // Sort etchants alphabetically by name
        allEtchants.sort((a, b) => {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });
        
        // Extract unique categories
        categories = [...new Set(allEtchants.map(e => e.category).filter(Boolean))].sort();
        
        // Initialize filtered etchants
        filteredEtchants = allEtchants;
        
        // Render UI
        renderCategoryFilters();
        renderEtchants();
        updateResultsCount();
        hideLoadingState();
    } catch (error) {
        console.error('Error loading etchants:', error);
        document.getElementById('etchants-grid').innerHTML = 
            '<div class="error-state"><p>Error loading etchants. Please try again later.</p></div>';
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
    const etchants = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length !== headers.length) continue;
        
        const etchant = {};
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
            etchant[header] = value;
        });
        etchants.push(etchant);
    }
    
    return etchants;
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
    filterEtchants(query, getSelectedCategory());
}

// Get selected category
function getSelectedCategory() {
    const activeBtn = document.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.category : 'All';
}

// Filter etchants based on search and category
function filterEtchants(searchQuery = '', category = 'All') {
    filteredEtchants = allEtchants.filter(etchant => {
        // Category filter
        if (category !== 'All' && etchant.category !== category) {
            return false;
        }
        
        // Search filter
        if (!searchQuery) return true;
        
        const searchLower = searchQuery.toLowerCase();
        const name = (etchant.name || '').toLowerCase();
        const categoryName = (etchant.category || '').toLowerCase();
        const composition = (etchant.composition || '').toLowerCase();
        const applicationMethod = (etchant.application_method || '').toLowerCase();
        const reveals = (etchant.reveals || '').toLowerCase();
        
        // Parse alternative names (can be array or string)
        let alternativeNames = '';
        if (etchant.alternative_names) {
            if (Array.isArray(etchant.alternative_names)) {
                alternativeNames = etchant.alternative_names.join(' ').toLowerCase();
            } else if (typeof etchant.alternative_names === 'string') {
                // Try to parse as JSON array
                try {
                    const parsed = JSON.parse(etchant.alternative_names);
                    if (Array.isArray(parsed)) {
                        alternativeNames = parsed.join(' ').toLowerCase();
                    } else {
                        alternativeNames = etchant.alternative_names.toLowerCase();
                    }
                } catch (e) {
                    alternativeNames = etchant.alternative_names.toLowerCase();
                }
            }
        }
        
        // Parse compatible materials (can be array or string)
        let compatibleMaterials = '';
        if (etchant.compatible_materials) {
            if (Array.isArray(etchant.compatible_materials)) {
                compatibleMaterials = etchant.compatible_materials.join(' ').toLowerCase();
            } else if (typeof etchant.compatible_materials === 'string') {
                try {
                    const parsed = JSON.parse(etchant.compatible_materials);
                    if (Array.isArray(parsed)) {
                        compatibleMaterials = parsed.join(' ').toLowerCase();
                    } else {
                        compatibleMaterials = etchant.compatible_materials.toLowerCase();
                    }
                } catch (e) {
                    compatibleMaterials = etchant.compatible_materials.toLowerCase();
                }
            }
        }
        
        return name.includes(searchLower) ||
               categoryName.includes(searchLower) ||
               composition.includes(searchLower) ||
               applicationMethod.includes(searchLower) ||
               reveals.includes(searchLower) ||
               alternativeNames.includes(searchLower) ||
               compatibleMaterials.includes(searchLower);
    });
    
    // Sort filtered etchants alphabetically by name
    filteredEtchants.sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
    });
    
    currentPage = 1;
    renderEtchants();
    updateResultsCount();
    updatePagination();
}

// Render category filter buttons
function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    const select = document.getElementById('category-select');
    if (!container) return;
    
    // Clear container first (remove existing buttons)
    container.innerHTML = '';
    
    // Populate select dropdown
    if (select) {
        select.innerHTML = '<option value="All">All</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            select.appendChild(option);
        });
        
        // Remove existing event listeners by cloning and replacing
        const newSelect = select.cloneNode(true);
        select.parentNode.replaceChild(newSelect, select);
        
        // Handle select change
        newSelect.addEventListener('change', (e) => {
            const category = e.target.value;
            // Update button active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            const activeBtn = container.querySelector(`[data-category="${category}"]`);
            if (activeBtn) activeBtn.classList.add('active');
            
            // Filter etchants
            const searchQuery = document.getElementById('search-input').value;
            filterEtchants(searchQuery, category);
        });
    }
    
    // Add "All" button first
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.category = 'All';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        if (select) {
            const currentSelect = document.getElementById('category-select');
            if (currentSelect) currentSelect.value = 'All';
        }
        const searchQuery = document.getElementById('search-input').value;
        filterEtchants(searchQuery, 'All');
    });
    container.appendChild(allBtn);
    
    // Add category buttons
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.category = category;
        btn.textContent = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Sync select dropdown
            if (select) {
                const currentSelect = document.getElementById('category-select');
                if (currentSelect) currentSelect.value = category;
            }
            
            // Filter etchants
            const searchQuery = document.getElementById('search-input').value;
            filterEtchants(searchQuery, category);
        });
        container.appendChild(btn);
    });
}

// Render etchants grid
function renderEtchants() {
    const grid = document.getElementById('etchants-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!grid) return;
    
    if (filteredEtchants.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredEtchants.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredEtchants.length);
    const paginatedEtchants = filteredEtchants.slice(startIndex, endIndex);
    
    // Render etchants
    grid.innerHTML = paginatedEtchants.map(etchant => createEtchantCard(etchant)).join('');
    
    // Update pagination
    updatePagination();
}

// Create etchant card HTML
function createEtchantCard(etchant) {
    const category = etchant.category || 'Unknown';
    const name = etchant.name || 'Unnamed Etchant';
    const composition = etchant.composition || 'N/A';
    const applicationMethod = etchant.application_method || 'N/A';
    const slug = etchant.slug || etchant.id || '';
    
    // Get category badge colors
    const badgeColors = getCategoryBadgeColors(category);
    
    // Create card
    return `
        <div class="material-card">
            <div class="material-card-header">
                <span class="material-category-badge ${badgeColors.bg} ${badgeColors.text} ${badgeColors.border}">
                    ${category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
            </div>
            <h3 class="material-name">${escapeHtml(name)}</h3>
            <div class="material-properties">
                ${composition !== 'N/A' ? `
                    <div class="material-property">
                        <span class="property-label">Composition:</span>
                        <span class="property-value">${escapeHtml(composition)}</span>
                    </div>
                ` : ''}
                <div class="material-property">
                    <span class="property-label">Application:</span>
                    <span class="property-value">${escapeHtml(applicationMethod)}</span>
                </div>
            </div>
            <div class="material-card-footer">
                <a href="/etchants/${slug}.html" class="material-link">
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
    
    if (categoryLower.includes('general-purpose') || categoryLower.includes('general')) {
        return {
            bg: 'badge-blue',
            text: 'badge-text-blue',
            border: 'badge-border-blue'
        };
    }
    if (categoryLower.includes('material-specific') || categoryLower.includes('material')) {
        return {
            bg: 'badge-indigo',
            text: 'badge-text-indigo',
            border: 'badge-border-indigo'
        };
    }
    if (categoryLower.includes('electrolytic')) {
        return {
            bg: 'badge-purple',
            text: 'badge-text-purple',
            border: 'badge-border-purple'
        };
    }
    if (categoryLower.includes('specialty')) {
        return {
            bg: 'badge-orange',
            text: 'badge-text-orange',
            border: 'badge-border-orange'
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
    
    const total = filteredEtchants.length;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, total);
    
    if (total === 0) {
        countEl.textContent = 'No etchants found';
    } else if (total <= ITEMS_PER_PAGE) {
        countEl.textContent = `Showing ${total} etchant${total !== 1 ? 's' : ''}`;
    } else {
        countEl.textContent = `Showing ${startIndex}-${endIndex} of ${total} etchants`;
    }
}

// Update pagination
function updatePagination() {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;
    
    const totalPages = Math.ceil(filteredEtchants.length / ITEMS_PER_PAGE);
    
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
    const totalPages = Math.ceil(filteredEtchants.length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderEtchants();
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

