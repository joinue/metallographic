// Standards Database JavaScript
// Handles CSV parsing, filtering, searching, and pagination

const ITEMS_PER_PAGE = 24;
let allStandards = [];
let filteredStandards = [];
let currentPage = 1;
let categories = [];
let organizations = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadStandards();
    setupEventListeners();
});

// Load standards from CSV
async function loadStandards() {
    try {
        const response = await fetch('/standards_rows.csv');
        const csvText = await response.text();
        allStandards = parseCSV(csvText);
        
        // Filter only published standards
        allStandards = allStandards.filter(s => s.status === 'published');
        
        // Sort standards alphabetically by standard number
        allStandards.sort((a, b) => {
            const standardA = (a.standard || '').toLowerCase();
            const standardB = (b.standard || '').toLowerCase();
            return standardA.localeCompare(standardB);
        });
        
        // Extract unique categories and organizations
        categories = [...new Set(allStandards.map(s => s.category).filter(Boolean))].sort();
        organizations = [...new Set(allStandards.map(s => s.organization).filter(Boolean))].sort();
        
        // Initialize filtered standards
        filteredStandards = allStandards;
        
        // Render UI
        renderCategoryFilters();
        renderOrganizationFilters();
        renderStandards();
        updateResultsCount();
        hideLoadingState();
    } catch (error) {
        console.error('Error loading standards:', error);
        document.getElementById('standards-grid').innerHTML = 
            '<div class="error-state"><p>Error loading standards. Please try again later.</p></div>';
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
    const standards = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length !== headers.length) continue;
        
        const standard = {};
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
            standard[header] = value;
        });
        standards.push(standard);
    }
    
    return standards;
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
}

// Handle search input
function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    filterStandards(query, getSelectedCategory(), getSelectedOrganization());
}

// Get selected category
function getSelectedCategory() {
    const select = document.getElementById('category-select');
    if (select && window.innerWidth <= 640) {
        return select.value || 'All';
    }
    const activeBtn = document.querySelector('#category-filters .filter-btn.active');
    return activeBtn ? activeBtn.dataset.category : 'All';
}

// Get selected organization
function getSelectedOrganization() {
    const select = document.getElementById('organization-select');
    if (select && window.innerWidth <= 640) {
        return select.value || 'All';
    }
    const activeBtn = document.querySelector('#organization-filters .filter-btn.active');
    return activeBtn ? activeBtn.dataset.organization : 'All';
}

// Filter standards based on search, category, and organization
function filterStandards(searchQuery = '', category = 'All', organization = 'All') {
    filteredStandards = allStandards.filter(standard => {
        // Category filter
        if (category !== 'All' && standard.category !== category) {
            return false;
        }
        
        // Organization filter
        if (organization !== 'All' && standard.organization !== organization) {
            return false;
        }
        
        // Search filter
        if (!searchQuery) return true;
        
        const searchLower = searchQuery.toLowerCase();
        const standardNum = (standard.standard || '').toLowerCase();
        const title = (standard.title || '').toLowerCase();
        const description = (standard.description || '').toLowerCase();
        const categoryName = (standard.category || '').toLowerCase();
        const organizationName = (standard.organization || '').toLowerCase();
        
        // Parse tags (can be array or string)
        let tags = '';
        if (standard.tags) {
            if (Array.isArray(standard.tags)) {
                tags = standard.tags.join(' ').toLowerCase();
            } else if (typeof standard.tags === 'string') {
                try {
                    const parsed = JSON.parse(standard.tags);
                    if (Array.isArray(parsed)) {
                        tags = parsed.join(' ').toLowerCase();
                    } else {
                        tags = standard.tags.toLowerCase();
                    }
                } catch (e) {
                    tags = standard.tags.toLowerCase();
                }
            }
        }
        
        return standardNum.includes(searchLower) ||
               title.includes(searchLower) ||
               description.includes(searchLower) ||
               categoryName.includes(searchLower) ||
               organizationName.includes(searchLower) ||
               tags.includes(searchLower);
    });
    
    // Sort filtered standards alphabetically by standard number
    filteredStandards.sort((a, b) => {
        const standardA = (a.standard || '').toLowerCase();
        const standardB = (b.standard || '').toLowerCase();
        return standardA.localeCompare(standardB);
    });
    
    currentPage = 1;
    renderStandards();
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
            option.textContent = category;
            select.appendChild(option);
        });
        
        // Remove existing event listeners by cloning and replacing
        const newSelect = select.cloneNode(true);
        select.parentNode.replaceChild(newSelect, select);
        
        // Handle select change
        newSelect.addEventListener('change', (e) => {
            const category = e.target.value;
            // Update button active state
            document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.remove('active'));
            const activeBtn = container.querySelector(`[data-category="${category}"]`);
            if (activeBtn) activeBtn.classList.add('active');
            
            // Filter standards
            const searchQuery = document.getElementById('search-input').value;
            filterStandards(searchQuery, category, getSelectedOrganization());
        });
    }
    
    // Add "All" button first
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.category = 'All';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => {
        document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        if (select) {
            const currentSelect = document.getElementById('category-select');
            if (currentSelect) currentSelect.value = 'All';
        }
        const searchQuery = document.getElementById('search-input').value;
        filterStandards(searchQuery, 'All', getSelectedOrganization());
    });
    container.appendChild(allBtn);
    
    // Add category buttons
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.category = category;
        btn.textContent = category;
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Sync select dropdown
            if (select) {
                const currentSelect = document.getElementById('category-select');
                if (currentSelect) currentSelect.value = category;
            }
            
            // Filter standards
            const searchQuery = document.getElementById('search-input').value;
            filterStandards(searchQuery, category, getSelectedOrganization());
        });
        container.appendChild(btn);
    });
}

// Render organization filter buttons
function renderOrganizationFilters() {
    const container = document.getElementById('organization-filters');
    const select = document.getElementById('organization-select');
    if (!container) return;
    
    // Clear container first (remove existing buttons)
    container.innerHTML = '';
    
    // Populate select dropdown
    if (select) {
        select.innerHTML = '<option value="All">All</option>';
        organizations.forEach(organization => {
            const option = document.createElement('option');
            option.value = organization;
            option.textContent = organization;
            select.appendChild(option);
        });
        
        // Remove existing event listeners by cloning and replacing
        const newSelect = select.cloneNode(true);
        select.parentNode.replaceChild(newSelect, select);
        
        // Handle select change
        newSelect.addEventListener('change', (e) => {
            const organization = e.target.value;
            // Update button active state
            document.querySelectorAll('#organization-filters .filter-btn').forEach(b => b.classList.remove('active'));
            const activeBtn = container.querySelector(`[data-organization="${organization}"]`);
            if (activeBtn) activeBtn.classList.add('active');
            
            // Filter standards
            const searchQuery = document.getElementById('search-input').value;
            filterStandards(searchQuery, getSelectedCategory(), organization);
        });
    }
    
    // Add "All" button first
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.organization = 'All';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => {
        document.querySelectorAll('#organization-filters .filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        if (select) {
            const currentSelect = document.getElementById('organization-select');
            if (currentSelect) currentSelect.value = 'All';
        }
        const searchQuery = document.getElementById('search-input').value;
        filterStandards(searchQuery, getSelectedCategory(), 'All');
    });
    container.appendChild(allBtn);
    
    // Add organization buttons
    organizations.forEach(organization => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.organization = organization;
        btn.textContent = organization;
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('#organization-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Sync select dropdown
            if (select) {
                const currentSelect = document.getElementById('organization-select');
                if (currentSelect) currentSelect.value = organization;
            }
            
            // Filter standards
            const searchQuery = document.getElementById('search-input').value;
            filterStandards(searchQuery, getSelectedCategory(), organization);
        });
        container.appendChild(btn);
    });
}

// Render standards grid
function renderStandards() {
    const grid = document.getElementById('standards-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!grid) return;
    
    if (filteredStandards.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredStandards.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredStandards.length);
    const paginatedStandards = filteredStandards.slice(startIndex, endIndex);
    
    // Render standards
    grid.innerHTML = paginatedStandards.map(standard => createStandardCard(standard)).join('');
    
    // Update pagination
    updatePagination();
}

// Create standard card HTML
function createStandardCard(standard) {
    const standardNum = standard.standard || 'Unnamed Standard';
    const title = standard.title || '';
    const description = standard.description || 'No description available.';
    const category = standard.category || '';
    const organization = standard.organization || '';
    const slug = standard.slug || standard.id || '';
    
    // Get category badge colors
    const categoryColors = getCategoryBadgeColors(category);
    
    // Get organization badge colors
    const orgColors = getOrganizationBadgeColors(organization);
    
    // Parse tags
    let tags = [];
    if (standard.tags) {
        if (Array.isArray(standard.tags)) {
            tags = standard.tags;
        } else if (typeof standard.tags === 'string') {
            try {
                tags = JSON.parse(standard.tags);
            } catch (e) {
                tags = [];
            }
        }
    }
    
    return `
        <div class="material-card">
            <div class="material-card-header">
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${category ? `
                    <span class="material-category-badge ${categoryColors.bg}">
                        ${escapeHtml(category)}
                    </span>
                    ` : ''}
                    ${organization ? `
                    <span class="material-category-badge ${orgColors.bg}">
                        ${escapeHtml(organization)}
                    </span>
                    ` : ''}
                </div>
            </div>
            <h3 class="material-name">${escapeHtml(standardNum)}</h3>
            ${title ? `<p class="material-subtitle" style="font-size: 0.9rem; color: #6b7280; margin-bottom: 0.5rem;">${escapeHtml(title)}</p>` : ''}
            <div class="material-properties">
                <div class="material-property">
                    <span class="property-value">${escapeHtml(description.substring(0, 150))}${description.length > 150 ? '...' : ''}</span>
                </div>
            </div>
            ${tags.length > 0 ? `
            <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.25rem;">
                ${tags.slice(0, 3).map(tag => `
                    <span class="tag tag-gray" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">${escapeHtml(tag)}</span>
                `).join('')}
                ${tags.length > 3 ? `<span style="font-size: 0.75rem; color: #6b7280;">+${tags.length - 3} more</span>` : ''}
            </div>
            ` : ''}
            <div class="material-card-footer">
                <a href="/standards/${slug}.html" class="material-link">
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
  
  if (categoryLower.includes('preparation')) {
    return {
      bg: 'badge-blue',
      text: '',
      border: ''
    };
  }
  if (categoryLower.includes('etching')) {
    return {
      bg: 'badge-indigo',
      text: '',
      border: ''
    };
  }
  if (categoryLower.includes('analysis')) {
    return {
      bg: 'badge-lime',
      text: '',
      border: ''
    };
  }
  if (categoryLower.includes('testing')) {
    return {
      bg: 'badge-orange',
      text: '',
      border: ''
    };
  }
  if (categoryLower.includes('documentation')) {
    return {
      bg: 'badge-pink',
      text: '',
      border: ''
    };
  }
  if (categoryLower.includes('calibration')) {
    return {
      bg: 'badge-yellow',
      text: '',
      border: ''
    };
  }
  if (categoryLower.includes('reference')) {
    return {
      bg: 'badge-slate',
      text: '',
      border: ''
    };
  }
  
  // Default
  return {
    bg: 'badge-primary',
    text: '',
    border: ''
  };
}

// Get organization badge colors
function getOrganizationBadgeColors(organization) {
  const orgLower = organization.toLowerCase();
  
  if (orgLower === 'astm') {
    return {
      bg: 'badge-red',
      text: '',
      border: ''
    };
  }
  if (orgLower === 'iso') {
    return {
      bg: 'badge-blue',
      text: '',
      border: ''
    };
  }
  
  // Default
  return {
    bg: 'badge-primary',
    text: '',
    border: ''
  };
}

// Update results count
function updateResultsCount() {
    const countEl = document.getElementById('results-count');
    if (!countEl) return;
    
    const total = filteredStandards.length;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, total);
    
    if (total === 0) {
        countEl.textContent = 'No standards found';
    } else if (total <= ITEMS_PER_PAGE) {
        countEl.textContent = `Showing ${total} standard${total !== 1 ? 's' : ''}`;
    } else {
        countEl.textContent = `Showing ${startIndex}-${endIndex} of ${total} standards`;
    }
}

// Update pagination
function updatePagination() {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;
    
    const totalPages = Math.ceil(filteredStandards.length / ITEMS_PER_PAGE);
    
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
    const totalPages = Math.ceil(filteredStandards.length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderStandards();
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

