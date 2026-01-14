// Material Detail Page JavaScript
// Handles loading and displaying individual material details

let currentMaterial = null;
let allMaterials = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get slug from URL
    const slug = getSlugFromURL();
    if (!slug) {
        showError();
        return;
    }
    
    loadMaterial(slug);
    setupTabNavigation();
});

// Get slug from URL
function getSlugFromURL() {
    // Try to get from pathname first (e.g., /materials/aisi-1020-carbon-steel)
    const pathMatch = window.location.pathname.match(/\/materials\/([^\/]+)/);
    if (pathMatch) {
        return pathMatch[1];
    }
    
    // Try query parameter (e.g., ?slug=aisi-1020-carbon-steel)
    const params = new URLSearchParams(window.location.search);
    const slugParam = params.get('slug');
    if (slugParam) {
        return slugParam;
    }
    
    // Try hash (e.g., #aisi-1020-carbon-steel)
    const hash = window.location.hash.slice(1);
    if (hash) {
        return hash;
    }
    
    return null;
}

// Load material from CSV
async function loadMaterial(slug) {
    try {
        // Load CSV if not already loaded
        if (allMaterials.length === 0) {
            const response = await fetch('/materials_rows.csv');
            const csvText = await response.text();
            allMaterials = parseCSV(csvText);
        }
        
        // Find material by slug
        const material = allMaterials.find(m => 
            (m.slug && m.slug === slug) || 
            (m.id && m.id === slug)
        );
        
        if (!material || material.status !== 'published') {
            showError();
            return;
        }
        
        currentMaterial = material;
        renderMaterial();
        updatePageMetadata();
        hideLoadingState();
    } catch (error) {
        console.error('Error loading material:', error);
        showError();
    }
}

// Parse CSV (reuse from materials.js if available, otherwise define here)
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = parseCSVLine(lines[0]);
    const materials = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length !== headers.length) continue;
        
        const material = {};
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
            material[header] = value;
        });
        materials.push(material);
    }
    
    return materials;
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

// Render material content
function renderMaterial() {
    if (!currentMaterial) return;
    
    // Update header
    document.getElementById('material-name').textContent = currentMaterial.name || 'Unnamed Material';
    document.getElementById('material-category').textContent = currentMaterial.category || '';
    document.getElementById('breadcrumb-material').textContent = currentMaterial.name || 'Material';
    
    // Update class link if material has a class
    let classLink = document.getElementById('material-class-link');
    const categoryElement = document.getElementById('material-category');
    
    if (currentMaterial.class && categoryElement) {
        const classNumber = currentMaterial.class;
        
        // Create the link if it doesn't exist
        if (!classLink) {
            // Check if category is in a row container, if not create one
            let categoryRow = categoryElement.parentElement;
            if (!categoryRow || !categoryRow.classList.contains('material-category-row')) {
                categoryRow = document.createElement('div');
                categoryRow.className = 'material-category-row';
                categoryElement.parentNode.insertBefore(categoryRow, categoryElement);
                categoryRow.appendChild(categoryElement);
            }
            
            // Create the class link element
            classLink = document.createElement('a');
            classLink.id = 'material-class-link';
            classLink.className = 'material-class-link';
            classLink.innerHTML = '<span class="material-class-link-text">Class </span><span class="material-class-link-number"></span>';
            categoryRow.appendChild(classLink);
        }
        
        // Update the link
        classLink.href = `/support/preparation-procedures/class-${classNumber}.html`;
        classLink.querySelector('.material-class-link-number').textContent = classNumber;
        // Remove any existing class-* classes and add the correct one
        classLink.className = classLink.className.replace(/\bclass-\d+\b/g, '');
        classLink.classList.add('material-class-link', `class-${classNumber}`);
        classLink.style.display = 'inline-flex';
    } else if (classLink) {
        classLink.style.display = 'none';
    }
    
    // Render tabs
    renderOverview();
    renderProperties();
    renderPreparation();
    renderHeatTreatment();
    renderStandards();
    renderApplications();
    renderRelatedGuides();
    
    // Show content
    document.getElementById('material-content').style.display = 'block';
}

// Render Overview tab
function renderOverview() {
    const container = document.getElementById('tab-overview');
    if (!container) return;
    
    let html = '';
    
    // Basic Information
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Basic Information</h2>';
    html += '<div class="section-content">';
    html += createPropertyRow('Category', currentMaterial.category);
    if (currentMaterial.material_type) {
        html += createPropertyRow('Material Type', currentMaterial.material_type);
    }
    
    // Alternative Names
    if (currentMaterial.alternative_names) {
        const altNames = Array.isArray(currentMaterial.alternative_names) 
            ? currentMaterial.alternative_names 
            : JSON.parse(currentMaterial.alternative_names || '[]');
        if (altNames.length > 0) {
            html += '<div class="property-group">';
            html += '<span class="property-label">Alternative Names:</span>';
            html += '<div class="tag-list">';
            altNames.forEach(name => {
                html += `<span class="tag tag-blue">${escapeHtml(name)}</span>`;
            });
            html += '</div></div>';
        }
    }
    
    // Tags
    if (currentMaterial.tags) {
        const tags = Array.isArray(currentMaterial.tags) 
            ? currentMaterial.tags 
            : JSON.parse(currentMaterial.tags || '[]');
        if (tags.length > 0) {
            html += '<div class="property-group">';
            html += '<span class="property-label">Tags:</span>';
            html += '<div class="tag-list">';
            tags.forEach(tag => {
                html += `<span class="tag tag-gray">${escapeHtml(tag)}</span>`;
            });
            html += '</div></div>';
        }
    }
    
    html += '</div></div>';
    
    // Composition & Microstructure
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Composition & Structure</h2>';
    html += '<div class="section-content">';
    html += createPropertyRow('Composition', currentMaterial.composition);
    html += createPropertyRow('Microstructure', currentMaterial.microstructure);
    html += '</div></div>';
    
    // Description
    if (currentMaterial.detailed_description) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Description</h2>';
        html += '<div class="section-content">';
        html += `<p class="description-text">${escapeHtml(currentMaterial.detailed_description)}</p>`;
        html += '</div></div>';
    }
    
    // Special Notes
    if (currentMaterial.special_notes) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Special Notes</h2>';
        html += '<div class="section-content">';
        html += `<p class="description-text">${escapeHtml(currentMaterial.special_notes)}</p>`;
        html += '</div></div>';
    }
    
    container.innerHTML = html;
}

// Render Properties tab
function renderProperties() {
    const container = document.getElementById('tab-properties');
    if (!container) return;
    
    let html = '';
    
    // Mechanical Properties
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Mechanical Properties</h2>';
    html += '<div class="section-content">';
    if (currentMaterial.hardness) {
        html += createPropertyRow('Hardness', currentMaterial.hardness);
    }
    if (currentMaterial.hardness_hb) {
        html += createPropertyRow('Hardness (HB)', `${currentMaterial.hardness_hb} HB`);
    }
    if (currentMaterial.hardness_hrc) {
        html += createPropertyRow('Hardness (HRC)', `${currentMaterial.hardness_hrc} HRC`);
    }
    if (currentMaterial.hardness_hv) {
        html += createPropertyRow('Hardness (HV)', `${currentMaterial.hardness_hv} HV`);
    }
    if (currentMaterial.hardness_category) {
        html += createPropertyRow('Hardness Category', 
            `<span class="badge badge-primary">${escapeHtml(currentMaterial.hardness_category.replace('-', ' '))}</span>`);
    }
    if (currentMaterial.tensile_strength_mpa) {
        html += createPropertyRow('Tensile Strength', `${currentMaterial.tensile_strength_mpa} MPa`);
    }
    if (currentMaterial.yield_strength_mpa) {
        html += createPropertyRow('Yield Strength', `${currentMaterial.yield_strength_mpa} MPa`);
    }
    html += '</div></div>';
    
    // Physical Properties
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Physical Properties</h2>';
    html += '<div class="section-content">';
    if (currentMaterial.density) {
        html += createPropertyRow('Density', `${currentMaterial.density} g/cm³`);
    }
    if (currentMaterial.melting_point_celsius) {
        html += createPropertyRow('Melting Point', `${currentMaterial.melting_point_celsius} °C`);
    }
    html += '</div></div>';
    
    // Material Characteristics
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Material Characteristics</h2>';
    html += '<div class="section-content">';
    if (currentMaterial.work_hardening !== null && currentMaterial.work_hardening !== '') {
        const workHardening = currentMaterial.work_hardening === 'TRUE' || currentMaterial.work_hardening === true;
        html += createPropertyRow('Work Hardening', 
            `<span class="badge ${workHardening ? 'badge-green' : 'badge-gray'}">${workHardening ? 'Yes' : 'No'}</span>`);
    }
    if (currentMaterial.magnetic !== null && currentMaterial.magnetic !== '') {
        const magnetic = currentMaterial.magnetic === 'TRUE' || currentMaterial.magnetic === true;
        html += createPropertyRow('Magnetic', 
            `<span class="badge ${magnetic ? 'badge-blue' : 'badge-gray'}">${magnetic ? 'Yes' : 'No'}</span>`);
    }
    if (currentMaterial.corrosion_resistance) {
        html += createPropertyRow('Corrosion Resistance', 
            `<span class="badge badge-primary">${escapeHtml(currentMaterial.corrosion_resistance)}</span>`);
    }
    html += '</div></div>';
    
    container.innerHTML = html;
}

// Render Preparation tab
function renderPreparation() {
    const container = document.getElementById('tab-preparation');
    if (!container) return;
    
    let html = '';
    
    // General Preparation Notes
    if (currentMaterial.preparation_notes) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">General Preparation Notes</h2>';
        html += '<div class="section-content">';
        html += `<div class="notes-content">${formatNotes(currentMaterial.preparation_notes)}</div>`;
        html += '</div></div>';
    }
    
    // Sectioning
    if (currentMaterial.sectioning_notes) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Sectioning</h2>';
        html += '<div class="section-content">';
        html += `<div class="notes-content">${formatNotes(currentMaterial.sectioning_notes)}</div>`;
        html += '</div></div>';
    }
    
    // Mounting
    if (currentMaterial.mounting_notes) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Mounting</h2>';
        html += '<div class="section-content">';
        html += `<div class="notes-content">${formatNotes(currentMaterial.mounting_notes)}</div>`;
        html += '</div></div>';
    }
    
    // Grinding
    if (currentMaterial.grinding_notes) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Grinding</h2>';
        html += '<div class="section-content">';
        html += `<div class="notes-content">${formatNotes(currentMaterial.grinding_notes)}</div>`;
        
        // Grinding sequence
        if (currentMaterial.recommended_grinding_sequence) {
            const sequence = Array.isArray(currentMaterial.recommended_grinding_sequence)
                ? currentMaterial.recommended_grinding_sequence
                : JSON.parse(currentMaterial.recommended_grinding_sequence || '[]');
            if (sequence.length > 0) {
                html += '<div class="sequence-group">';
                html += '<span class="property-label">Recommended Sequence:</span>';
                html += '<div class="tag-list">';
                sequence.forEach(step => {
                    html += `<span class="tag tag-primary">${escapeHtml(step)}</span>`;
                });
                html += '</div></div>';
            }
        }
        html += '</div></div>';
    }
    
    // Polishing
    if (currentMaterial.polishing_notes) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Polishing</h2>';
        html += '<div class="section-content">';
        html += `<div class="notes-content">${formatNotes(currentMaterial.polishing_notes)}</div>`;
        
        // Polishing sequence
        if (currentMaterial.recommended_polishing_sequence) {
            const sequence = Array.isArray(currentMaterial.recommended_polishing_sequence)
                ? currentMaterial.recommended_polishing_sequence
                : JSON.parse(currentMaterial.recommended_polishing_sequence || '[]');
            if (sequence.length > 0) {
                html += '<div class="sequence-group">';
                html += '<span class="property-label">Recommended Sequence:</span>';
                html += '<div class="tag-list">';
                sequence.forEach(step => {
                    html += `<span class="tag tag-primary">${escapeHtml(step)}</span>`;
                });
                html += '</div></div>';
            }
        }
        html += '</div></div>';
    }
    
    // Etching
    if (currentMaterial.etching_notes) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Etching</h2>';
        html += '<div class="section-content">';
        html += `<div class="notes-content">${formatNotes(currentMaterial.etching_notes)}</div>`;
        
        // Common etchants
        if (currentMaterial.common_etchants) {
            const etchants = Array.isArray(currentMaterial.common_etchants)
                ? currentMaterial.common_etchants
                : JSON.parse(currentMaterial.common_etchants || '[]');
            if (etchants.length > 0) {
                html += '<div class="sequence-group">';
                html += '<span class="property-label">Common Etchants:</span>';
                html += '<div class="tag-list">';
                etchants.forEach(etchant => {
                    html += `<span class="tag tag-primary">${escapeHtml(etchant)}</span>`;
                });
                html += '</div></div>';
            }
        }
        html += '</div></div>';
    }
    
    container.innerHTML = html || '<p class="empty-message">No preparation information available.</p>';
}

// Render Heat Treatment tab
function renderHeatTreatment() {
    const container = document.getElementById('tab-heat-treatment');
    if (!container) return;
    
    let html = '';
    
    if (currentMaterial.heat_treatment) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Heat Treatment</h2>';
        html += '<div class="section-content">';
        html += createPropertyRow('Heat Treatment', currentMaterial.heat_treatment);
        if (currentMaterial.annealing_temperature_celsius) {
            html += createPropertyRow('Annealing Temperature', `${currentMaterial.annealing_temperature_celsius} °C`);
        }
        if (currentMaterial.solution_treatment_temp_celsius) {
            html += createPropertyRow('Solution Treatment Temperature', `${currentMaterial.solution_treatment_temp_celsius} °C`);
        }
        if (currentMaterial.aging_temperature_celsius) {
            html += createPropertyRow('Aging Temperature', `${currentMaterial.aging_temperature_celsius} °C`);
        }
        html += '</div></div>';
    }
    
    container.innerHTML = html || '<p class="empty-message">No heat treatment information available.</p>';
}

// Render Standards tab
function renderStandards() {
    const container = document.getElementById('tab-standards');
    if (!container) return;
    
    let html = '';
    
    if (currentMaterial.astm_standards || currentMaterial.iso_standards) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Standards</h2>';
        html += '<div class="section-content">';
        
        if (currentMaterial.astm_standards) {
            const astm = Array.isArray(currentMaterial.astm_standards)
                ? currentMaterial.astm_standards
                : JSON.parse(currentMaterial.astm_standards || '[]');
            if (astm.length > 0) {
                html += '<div class="property-group">';
                html += '<span class="property-label">ASTM Standards:</span>';
                html += '<ul class="standards-list">';
                astm.forEach(std => {
                    html += `<li>${escapeHtml(std)}</li>`;
                });
                html += '</ul></div>';
            }
        }
        
        if (currentMaterial.iso_standards) {
            const iso = Array.isArray(currentMaterial.iso_standards)
                ? currentMaterial.iso_standards
                : JSON.parse(currentMaterial.iso_standards || '[]');
            if (iso.length > 0) {
                html += '<div class="property-group">';
                html += '<span class="property-label">ISO Standards:</span>';
                html += '<ul class="standards-list">';
                iso.forEach(std => {
                    html += `<li>${escapeHtml(std)}</li>`;
                });
                html += '</ul></div>';
            }
        }
        
        html += '</div></div>';
    }
    
    container.innerHTML = html || '<p class="empty-message">No standards information available.</p>';
}

// Render Applications tab
function renderApplications() {
    const container = document.getElementById('tab-applications');
    if (!container) return;
    
    let html = '';
    
    if (currentMaterial.applications || currentMaterial.typical_uses) {
        html += '<div class="material-section">';
        html += '<h2 class="section-title">Applications</h2>';
        html += '<div class="section-content">';
        
        if (currentMaterial.applications) {
            const apps = Array.isArray(currentMaterial.applications)
                ? currentMaterial.applications
                : JSON.parse(currentMaterial.applications || '[]');
            if (apps.length > 0) {
                html += '<div class="property-group">';
                html += '<span class="property-label">Applications:</span>';
                html += '<ul class="applications-list">';
                apps.forEach(app => {
                    html += `<li>${escapeHtml(app)}</li>`;
                });
                html += '</ul></div>';
            }
        }
        
        if (currentMaterial.typical_uses) {
            const uses = Array.isArray(currentMaterial.typical_uses)
                ? currentMaterial.typical_uses
                : JSON.parse(currentMaterial.typical_uses || '[]');
            if (uses.length > 0) {
                html += '<div class="property-group">';
                html += '<span class="property-label">Typical Uses:</span>';
                html += '<ul class="applications-list">';
                uses.forEach(use => {
                    html += `<li>${escapeHtml(use)}</li>`;
                });
                html += '</ul></div>';
            }
        }
        
        html += '</div></div>';
    }
    
    container.innerHTML = html || '<p class="empty-message">No applications information available.</p>';
}

// Render Related Guides
function renderRelatedGuides() {
    const container = document.getElementById('related-guides');
    if (!container || !currentMaterial) return;
    
    const category = currentMaterial.category || '';
    const guides = [];
    
    if (category.includes('Titanium')) {
        guides.push({ name: 'Titanium Preparation Guide', url: '/guides/titanium-preparation.html' });
    }
    if (category.includes('Stainless Steel')) {
        guides.push({ name: 'Stainless Steel Preparation Guide', url: '/guides/stainless-steel-preparation.html' });
    }
    if (category.includes('Aluminum')) {
        guides.push({ name: 'Aluminum Sample Preparation Guide', url: '/guides/aluminum-sample-preparation.html' });
    }
    if (category.includes('Copper')) {
        guides.push({ name: 'Copper Alloys Preparation Guide', url: '/guides/copper-alloys-preparation.html' });
    }
    if (category.includes('Carbon Steel')) {
        guides.push({ name: 'Carbon and Low Alloy Steels Preparation Guide', url: '/guides/carbon-steel-preparation.html' });
    }
    if (category.includes('Cast Iron')) {
        guides.push({ name: 'Cast Iron Preparation Guide', url: '/guides/cast-iron-preparation.html' });
    }
    if (category.includes('Tool Steel')) {
        guides.push({ name: 'Tool Steel and Hardened Steel Preparation Guide', url: '/guides/tool-steel-preparation.html' });
    }
    if (category.includes('Nickel') || category.includes('Cobalt')) {
        guides.push({ name: 'Nickel and Cobalt Superalloys Preparation Guide', url: '/guides/nickel-alloys-preparation.html' });
    }
    if (category.includes('Magnesium')) {
        guides.push({ name: 'Magnesium Preparation Guide', url: '/guides/magnesium-preparation.html' });
    }
    
    if (guides.length > 0) {
        guides.push({ name: 'View All Guides', url: '/guides.html' });
        
        let html = '<div class="related-guides-section">';
        html += '<h3 class="related-guides-title">Related Preparation Guides</h3>';
        html += '<div class="related-guides-list">';
        guides.forEach(guide => {
            html += `<a href="${guide.url}" class="related-guide-link">> ${escapeHtml(guide.name)}</a>`;
        });
        html += '</div></div>';
        container.innerHTML = html;
    }
}

// Helper functions
function createPropertyRow(label, value) {
    if (!value) return '';
    return `
        <div class="property-row">
            <span class="property-label">${escapeHtml(label)}:</span>
            <span class="property-value">${value}</span>
        </div>
    `;
}

function formatNotes(notes) {
    // Convert HTML entities and preserve basic formatting
    let formatted = escapeHtml(notes);
    // Convert <br /> tags
    formatted = formatted.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
    // Convert <strong> tags
    formatted = formatted.replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/gi, '<strong>$1</strong>');
    // Convert <ul> and <li> tags
    formatted = formatted.replace(/&lt;ul[^&]*&gt;/gi, '<ul>');
    formatted = formatted.replace(/&lt;\/ul&gt;/gi, '</ul>');
    formatted = formatted.replace(/&lt;li&gt;(.*?)&lt;\/li&gt;/gi, '<li>$1</li>');
    return formatted;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Setup tab navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Update active states
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
            
            // Update URL hash
            window.history.replaceState(null, '', `#${tabId}`);
        });
    });
    
    // Check for hash on load
    const hash = window.location.hash.slice(1);
    if (hash) {
        const tabBtn = document.querySelector(`[data-tab="${hash}"]`);
        if (tabBtn) {
            tabBtn.click();
        }
    }
}

// Update page metadata
function updatePageMetadata() {
    if (!currentMaterial) return;
    
    const title = `${currentMaterial.name} - Materials Database | PACE Technologies`;
    document.title = title;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = `Material properties and preparation information for ${currentMaterial.name}. ${currentMaterial.category} with ${currentMaterial.microstructure} microstructure.`;
    }
}

// Show error state
function showError() {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('error-state').style.display = 'block';
}

// Hide loading state
function hideLoadingState() {
    document.getElementById('loading-state').style.display = 'none';
}

