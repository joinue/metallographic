#!/usr/bin/env node

/**
 * Generate static HTML pages for each material from materials_rows.csv
 * Creates individual pages at /materials/[slug].html
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Configuration
const CSV_PATH = path.join(__dirname, '../materials_rows.csv');
const OUTPUT_DIR = path.join(__dirname, '../materials');
const NAVIGATION_PATH = path.join(__dirname, '../navigation.html');
const FOOTER_PATH = path.join(__dirname, '../footer.html');
const MODAL_PATH = path.join(__dirname, '../modal.html');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Parse CSV file using csv-parse
function parseCSV(csvText) {
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    relax_quotes: true
  });
  
  const materials = [];
  for (const record of records) {
    const material = {};
    for (const [key, value] of Object.entries(record)) {
      let processedValue = value || '';
      
      // Try to parse JSON arrays/objects
      if (typeof processedValue === 'string' && 
          (processedValue.startsWith('[') || processedValue.startsWith('{'))) {
        try {
          processedValue = JSON.parse(processedValue);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
      
      material[key] = processedValue;
    }
    materials.push(material);
  }
  
  return materials;
}

// Escape HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Format notes (preserve HTML tags)
function formatNotes(notes) {
  if (!notes) return '';
  // Convert <br /> to <br>
  return String(notes)
    .replace(/<br\s*\/?>/gi, '<br>')
    .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
}

// Get related guides based on category
function getRelatedGuides(category) {
  const guides = [];
  const cat = category || '';
  
  if (cat.includes('Titanium')) {
    guides.push({ name: 'Titanium Preparation Guide', url: '/guides/titanium-preparation.html' });
  }
  if (cat.includes('Stainless Steel')) {
    guides.push({ name: 'Stainless Steel Preparation Guide', url: '/guides/stainless-steel-preparation.html' });
  }
  if (cat.includes('Aluminum')) {
    guides.push({ name: 'Aluminum Sample Preparation Guide', url: '/guides/aluminum-sample-preparation.html' });
  }
  if (cat.includes('Copper')) {
    guides.push({ name: 'Copper Alloys Preparation Guide', url: '/guides/copper-alloys-preparation.html' });
  }
  if (cat.includes('Carbon Steel') || cat.includes('Alloy Steel')) {
    guides.push({ name: 'Carbon and Low Alloy Steels Preparation Guide', url: '/guides/carbon-steel-preparation.html' });
  }
  if (cat.includes('Cast Iron')) {
    guides.push({ name: 'Cast Iron Preparation Guide', url: '/guides/cast-iron-preparation.html' });
  }
  if (cat.includes('Tool Steel') || cat.includes('Refractory Metal')) {
    guides.push({ name: 'Tool Steel and Hardened Steel Preparation Guide', url: '/guides/tool-steel-preparation.html' });
  }
  if (cat.includes('Nickel') || cat.includes('Cobalt')) {
    guides.push({ name: 'Nickel and Cobalt Superalloys Preparation Guide', url: '/guides/nickel-alloys-preparation.html' });
  }
  if (cat.includes('Magnesium')) {
    guides.push({ name: 'Magnesium Preparation Guide', url: '/guides/magnesium-preparation.html' });
  }
  
  guides.push({ name: 'View All Guides', url: '/guides.html' });
  
  return guides;
}

// Generate HTML for a material
function generateMaterialHTML(material, navigationHTML, footerHTML, modalHTML) {
  const slug = material.slug || material.id;
  const name = material.name || 'Unnamed Material';
  const category = material.category || '';
  
  // Parse arrays
  const altNames = Array.isArray(material.alternative_names) 
    ? material.alternative_names 
    : (material.alternative_names ? JSON.parse(material.alternative_names) : []);
  
  const tags = Array.isArray(material.tags) 
    ? material.tags 
    : (material.tags ? JSON.parse(material.tags) : []);
  
  const grindingSeq = Array.isArray(material.recommended_grinding_sequence)
    ? material.recommended_grinding_sequence
    : (material.recommended_grinding_sequence ? JSON.parse(material.recommended_grinding_sequence) : []);
  
  const polishingSeq = Array.isArray(material.recommended_polishing_sequence)
    ? material.recommended_polishing_sequence
    : (material.recommended_polishing_sequence ? JSON.parse(material.recommended_polishing_sequence) : []);
  
  const etchants = Array.isArray(material.common_etchants)
    ? material.common_etchants
    : (material.common_etchants ? JSON.parse(material.common_etchants) : []);
  
  const astmStandards = Array.isArray(material.astm_standards)
    ? material.astm_standards
    : (material.astm_standards ? JSON.parse(material.astm_standards) : []);
  
  const isoStandards = Array.isArray(material.iso_standards)
    ? material.iso_standards
    : (material.iso_standards ? JSON.parse(material.iso_standards) : []);
  
  const applications = Array.isArray(material.applications)
    ? material.applications
    : (material.applications ? JSON.parse(material.applications) : []);
  
  const typicalUses = Array.isArray(material.typical_uses)
    ? material.typical_uses
    : (material.typical_uses ? JSON.parse(material.typical_uses) : []);
  
  const description = `Material properties and preparation information for ${name}. ${category} with ${material.microstructure || ''} microstructure.`;
  const keywords = [
    'metallography',
    'sample preparation',
    'metallographic analysis',
    name.toLowerCase(),
    category.toLowerCase(),
    (material.microstructure || '').toLowerCase(),
    ...tags.map(t => t.toLowerCase())
  ].filter(Boolean).join(', ');
  
  // Generate tab content
  const overviewTab = generateOverviewTab(material, altNames, tags);
  const propertiesTab = generatePropertiesTab(material);
  const preparationTab = generatePreparationTab(material, grindingSeq, polishingSeq, etchants);
  const heatTreatmentTab = generateHeatTreatmentTab(material);
  const standardsTab = generateStandardsTab(material, astmStandards, isoStandards);
  const applicationsTab = generateApplicationsTab(material, applications, typicalUses);
  
  const relatedGuides = getRelatedGuides(category);
  
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow">
    <meta name="google-site-verification" content="LzR4wVONWG6uIX3m2QcGuvf3rBxuHBCijv-Pl1tccFs">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="keywords" content="${escapeHtml(keywords)}">
    <meta name="theme-color" content="#ffffff">
    <meta name="msapplication-TileColor" content="#da532c">
    <link rel="canonical" href="https://www.metallographic.com/materials/${slug}.html">

    <!-- Page Title -->
    <title>${escapeHtml(name)} - Materials Database | PACE Technologies</title>

    <!-- Stylesheets -->
    <link rel="stylesheet" href="/css/base/styles.css">
    <link rel="stylesheet" href="/css/components/navigation.css">
    <link rel="stylesheet" href="/css/components/footer.css">
    <link rel="stylesheet" href="/css/pages/materials.css">
    <link rel="stylesheet" href="/css/pages/material-detail.css">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/images/pt-favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/pt-favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/pt-favicon/favicon-16x16.png">
    <link rel="manifest" href="/images/pt-favicon/site.webmanifest">
    <link rel="mask-icon" href="/images/pt-favicon/safari-pinned-tab.svg" color="#5bbad5">

    <!-- Preload logo for faster LCP -->
    <link rel="preload" as="image" href="/images/logo-microstructure-transparent.webp">

    <!-- External Resources -->
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <link rel="preconnect" href="https://www.google-analytics.com">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1066794256"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'AW-1066794256');
    </script>

    <!-- Open Graph Tags -->
    <meta property="og:title" content="${escapeHtml(name)} - Materials Database">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="https://www.metallographic.com/images/pace-shortlogo-white.webp">
    <meta property="og:url" content="https://www.metallographic.com/materials/${slug}.html">
    <meta property="og:type" content="website">

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(name)} - Materials Database">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="https://www.metallographic.com/images/pace-shortlogo-white.webp">

    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${escapeHtml(name)}",
      "description": "${escapeHtml(description)}",
      "author": {
        "@type": "Organization",
        "name": "PACE Technologies"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PACE Technologies",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.metallographic.com/images/pace-metallographic-logo.webp"
        }
      }
    }
    </script>

    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.metallographic.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Materials Database",
          "item": "https://www.metallographic.com/materials.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${escapeHtml(name)}",
          "item": "https://www.metallographic.com/materials/${slug}.html"
        }
      ]
    }
    </script>
</head>

<body>
${navigationHTML}

    <!-- Main Content -->
    <main class="material-detail-page">
        <div class="container-custom">
            <!-- Breadcrumb -->
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="/materials.html">Materials Database</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${escapeHtml(name)}</span>
            </nav>

            <!-- Header -->
            <header class="material-header">
                <div class="material-header-content">
                    <div class="material-title-section">
                        <h1 class="material-name">${escapeHtml(name)}</h1>
                        <p class="material-category">${escapeHtml(category)}</p>
                    </div>
                </div>
            </header>

            <!-- Tabbed Content -->
            <div class="material-tabs-container">
                <!-- Tabs Navigation -->
                <div class="material-tabs-nav">
                    <button class="tab-btn active" data-tab="overview" onclick="switchTab('overview')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        Overview
                    </button>
                    <button class="tab-btn" data-tab="properties" onclick="switchTab('properties')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                        Properties
                    </button>
                    <button class="tab-btn" data-tab="preparation" onclick="switchTab('preparation')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                        Preparation
                    </button>
                    <button class="tab-btn" data-tab="heat-treatment" onclick="switchTab('heat-treatment')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8.5 16.5c-2-2.5-4-5.2-4-8.5 0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5c0 3.3-2 6-4 8.5l-1.5 1.5-1.5-1.5z"></path>
                            <path d="M9 12c0-1.5 1.5-3 3-3s3 1.5 3 3"></path>
                        </svg>
                        Heat Treatment
                    </button>
                    <button class="tab-btn" data-tab="standards" onclick="switchTab('standards')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Standards
                    </button>
                    <button class="tab-btn" data-tab="applications" onclick="switchTab('applications')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        Applications
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="material-tabs-content">
                    <div id="tab-overview" class="tab-content active">
                        ${overviewTab}
                    </div>
                    <div id="tab-properties" class="tab-content">
                        ${propertiesTab}
                    </div>
                    <div id="tab-preparation" class="tab-content">
                        ${preparationTab}
                    </div>
                    <div id="tab-heat-treatment" class="tab-content">
                        ${heatTreatmentTab}
                    </div>
                    <div id="tab-standards" class="tab-content">
                        ${standardsTab}
                    </div>
                    <div id="tab-applications" class="tab-content">
                        ${applicationsTab}
                    </div>
                </div>
            </div>

            <!-- Related Guides -->
            ${relatedGuides.length > 0 ? `
            <div class="related-guides-section">
                <h3 class="related-guides-title">Related Preparation Guides</h3>
                <div class="related-guides-list">
                    ${relatedGuides.map(guide => `
                        <a href="${guide.url}" class="related-guide-link">→ ${escapeHtml(guide.name)}</a>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    </main>

    <!-- Footer -->
${footerHTML}

    <!-- Tab Switching Script -->
    <script>
        function switchTab(tabId) {
            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.tab === tabId) {
                    btn.classList.add('active');
                }
            });
            
            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.id === 'tab-' + tabId) {
                    content.classList.add('active');
                }
            });
            
            // Update URL hash
            window.history.replaceState(null, '', '#' + tabId);
        }
        
        // Check for hash on load
        window.addEventListener('DOMContentLoaded', function() {
            const hash = window.location.hash.slice(1);
            if (hash) {
                switchTab(hash);
            }
        });
    </script>

    <!-- Scripts -->
    <script src="/js/scripts.js"></script>
</body>

${modalHTML}

</html>`;
}

// Generate Overview tab content
function generateOverviewTab(material, altNames, tags) {
  let html = '';
  
  // Basic Information
  html += '<div class="material-section">';
  html += '<h2 class="section-title">Basic Information</h2>';
  html += '<div class="section-content">';
  html += createPropertyRow('Category', material.category);
  if (material.material_type) {
    html += createPropertyRow('Material Type', material.material_type);
  }
  
  if (altNames.length > 0) {
    html += '<div class="property-group">';
    html += '<span class="property-label">Alternative Names:</span>';
    html += '<div class="tag-list">';
    altNames.forEach(name => {
      html += `<span class="tag tag-blue">${escapeHtml(name)}</span>`;
    });
    html += '</div></div>';
  }
  
  if (tags.length > 0) {
    html += '<div class="property-group">';
    html += '<span class="property-label">Tags:</span>';
    html += '<div class="tag-list">';
    tags.forEach(tag => {
      html += `<span class="tag tag-gray">${escapeHtml(tag)}</span>`;
    });
    html += '</div></div>';
  }
  
  html += '</div></div>';
  
  // Composition & Microstructure
  html += '<div class="material-section">';
  html += '<h2 class="section-title">Composition & Structure</h2>';
  html += '<div class="section-content">';
  html += createPropertyRow('Composition', material.composition);
  html += createPropertyRow('Microstructure', material.microstructure);
  html += '</div></div>';
  
  // Description
  if (material.detailed_description) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Description</h2>';
    html += '<div class="section-content">';
    html += `<p class="description-text">${escapeHtml(material.detailed_description)}</p>`;
    html += '</div></div>';
  }
  
  // Special Notes
  if (material.special_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Special Notes</h2>';
    html += '<div class="section-content">';
    html += `<p class="description-text">${escapeHtml(material.special_notes)}</p>`;
    html += '</div></div>';
  }
  
  return html;
}

// Generate Properties tab content
function generatePropertiesTab(material) {
  let html = '';
  
  // Mechanical Properties
  html += '<div class="material-section">';
  html += '<h2 class="section-title">Mechanical Properties</h2>';
  html += '<div class="section-content">';
  if (material.hardness) {
    html += createPropertyRow('Hardness', material.hardness);
  }
  if (material.hardness_hb) {
    html += createPropertyRow('Hardness (HB)', `${material.hardness_hb} HB`);
  }
  if (material.hardness_hrc) {
    html += createPropertyRow('Hardness (HRC)', `${material.hardness_hrc} HRC`);
  }
  if (material.hardness_hv) {
    html += createPropertyRow('Hardness (HV)', `${material.hardness_hv} HV`);
  }
  if (material.hardness_category) {
    html += createPropertyRow('Hardness Category', 
      `<span class="badge badge-primary">${escapeHtml(material.hardness_category.replace('-', ' '))}</span>`);
  }
  if (material.tensile_strength_mpa) {
    html += createPropertyRow('Tensile Strength', `${material.tensile_strength_mpa} MPa`);
  }
  if (material.yield_strength_mpa) {
    html += createPropertyRow('Yield Strength', `${material.yield_strength_mpa} MPa`);
  }
  html += '</div></div>';
  
  // Physical Properties
  html += '<div class="material-section">';
  html += '<h2 class="section-title">Physical Properties</h2>';
  html += '<div class="section-content">';
  if (material.density) {
    html += createPropertyRow('Density', `${material.density} g/cm³`);
  }
  if (material.melting_point_celsius) {
    html += createPropertyRow('Melting Point', `${material.melting_point_celsius} °C`);
  }
  html += '</div></div>';
  
  // Material Characteristics
  html += '<div class="material-section">';
  html += '<h2 class="section-title">Material Characteristics</h2>';
  html += '<div class="section-content">';
  if (material.work_hardening !== null && material.work_hardening !== '') {
    const workHardening = material.work_hardening === 'TRUE' || material.work_hardening === true;
    html += createPropertyRow('Work Hardening', 
      `<span class="badge ${workHardening ? 'badge-green' : 'badge-gray'}">${workHardening ? 'Yes' : 'No'}</span>`);
  }
  if (material.magnetic !== null && material.magnetic !== '') {
    const magnetic = material.magnetic === 'TRUE' || material.magnetic === true;
    html += createPropertyRow('Magnetic', 
      `<span class="badge ${magnetic ? 'badge-blue' : 'badge-gray'}">${magnetic ? 'Yes' : 'No'}</span>`);
  }
  if (material.corrosion_resistance) {
    html += createPropertyRow('Corrosion Resistance', 
      `<span class="badge badge-primary">${escapeHtml(material.corrosion_resistance)}</span>`);
  }
  html += '</div></div>';
  
  return html;
}

// Generate Preparation tab content
function generatePreparationTab(material, grindingSeq, polishingSeq, etchants) {
  let html = '';
  
  if (material.preparation_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">General Preparation Notes</h2>';
    html += '<div class="section-content">';
    html += `<div class="notes-content">${formatNotes(material.preparation_notes)}</div>`;
    html += '</div></div>';
  }
  
  if (material.sectioning_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Sectioning</h2>';
    html += '<div class="section-content">';
    html += `<div class="notes-content">${formatNotes(material.sectioning_notes)}</div>`;
    html += '</div></div>';
  }
  
  if (material.mounting_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Mounting</h2>';
    html += '<div class="section-content">';
    html += `<div class="notes-content">${formatNotes(material.mounting_notes)}</div>`;
    html += '</div></div>';
  }
  
  if (material.grinding_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Grinding</h2>';
    html += '<div class="section-content">';
    html += `<div class="notes-content">${formatNotes(material.grinding_notes)}</div>`;
    
    if (grindingSeq.length > 0) {
      html += '<div class="sequence-group">';
      html += '<span class="property-label">Recommended Sequence:</span>';
      html += '<div class="tag-list">';
      grindingSeq.forEach(step => {
        html += `<span class="tag tag-primary">${escapeHtml(step)}</span>`;
      });
      html += '</div></div>';
    }
    html += '</div></div>';
  }
  
  if (material.polishing_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Polishing</h2>';
    html += '<div class="section-content">';
    html += `<div class="notes-content">${formatNotes(material.polishing_notes)}</div>`;
    
    if (polishingSeq.length > 0) {
      html += '<div class="sequence-group">';
      html += '<span class="property-label">Recommended Sequence:</span>';
      html += '<div class="tag-list">';
      polishingSeq.forEach(step => {
        html += `<span class="tag tag-primary">${escapeHtml(step)}</span>`;
      });
      html += '</div></div>';
    }
    html += '</div></div>';
  }
  
  if (material.etching_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Etching</h2>';
    html += '<div class="section-content">';
    html += `<div class="notes-content">${formatNotes(material.etching_notes)}</div>`;
    
    if (etchants.length > 0) {
      html += '<div class="sequence-group">';
      html += '<span class="property-label">Common Etchants:</span>';
      html += '<div class="tag-list">';
      etchants.forEach(etchant => {
        html += `<span class="tag tag-primary">${escapeHtml(etchant)}</span>`;
      });
      html += '</div></div>';
    }
    html += '</div></div>';
  }
  
  return html || '<p class="empty-message">No preparation information available.</p>';
}

// Generate Heat Treatment tab content
function generateHeatTreatmentTab(material) {
  let html = '';
  
  if (material.heat_treatment || material.annealing_temperature_celsius || 
      material.solution_treatment_temp_celsius || material.aging_temperature_celsius) {
    
    if (material.heat_treatment) {
      html += '<div class="material-section">';
      html += '<h2 class="section-title">Heat Treatment</h2>';
      html += '<div class="section-content">';
      html += `<p class="description-text">${escapeHtml(material.heat_treatment)}</p>`;
      html += '</div></div>';
    }
    
    if (material.annealing_temperature_celsius || material.solution_treatment_temp_celsius || 
        material.aging_temperature_celsius) {
      html += '<div class="material-section">';
      html += '<h2 class="section-title">Temperature Parameters</h2>';
      html += '<div class="section-content">';
      if (material.annealing_temperature_celsius) {
        html += createPropertyRow('Annealing Temperature', `${material.annealing_temperature_celsius} °C`);
      }
      if (material.solution_treatment_temp_celsius) {
        html += createPropertyRow('Solution Treatment', `${material.solution_treatment_temp_celsius} °C`);
      }
      if (material.aging_temperature_celsius) {
        html += createPropertyRow('Aging Temperature', `${material.aging_temperature_celsius} °C`);
      }
      html += '</div></div>';
    }
  }
  
  return html || '<p class="empty-message">No heat treatment information available.</p>';
}

// Generate Standards tab content
function generateStandardsTab(material, astmStandards, isoStandards) {
  let html = '';
  
  if (astmStandards.length > 0 || isoStandards.length > 0) {
    if (astmStandards.length > 0) {
      html += '<div class="material-section">';
      html += '<h2 class="section-title">ASTM Standards</h2>';
      html += '<div class="section-content">';
      html += '<div class="tag-list">';
      astmStandards.forEach(std => {
        html += `<span class="tag tag-blue">${escapeHtml(std)}</span>`;
      });
      html += '</div></div></div>';
    }
    
    if (isoStandards.length > 0) {
      html += '<div class="material-section">';
      html += '<h2 class="section-title">ISO Standards</h2>';
      html += '<div class="section-content">';
      html += '<div class="tag-list">';
      isoStandards.forEach(std => {
        html += `<span class="tag tag-green">${escapeHtml(std)}</span>`;
      });
      html += '</div></div></div>';
    }
  } else {
    html = '<p class="empty-message">No standards information available.</p>';
  }
  
  return html;
}

// Generate Applications tab content
function generateApplicationsTab(material, applications, typicalUses) {
  let html = '';
  
  if (applications.length > 0 || typicalUses.length > 0) {
    if (applications.length > 0) {
      html += '<div class="material-section">';
      html += '<h2 class="section-title">Applications</h2>';
      html += '<div class="section-content">';
      html += '<ul class="applications-list">';
      applications.forEach(app => {
        html += `<li>${escapeHtml(app)}</li>`;
      });
      html += '</ul></div></div>';
    }
    
    if (typicalUses.length > 0) {
      html += '<div class="material-section">';
      html += '<h2 class="section-title">Typical Uses</h2>';
      html += '<div class="section-content">';
      html += '<ul class="applications-list">';
      typicalUses.forEach(use => {
        html += `<li>${escapeHtml(use)}</li>`;
      });
      html += '</ul></div></div>';
    }
  } else {
    html = '<p class="empty-message">No applications information available.</p>';
  }
  
  return html;
}

// Helper function to create property row
function createPropertyRow(label, value) {
  if (!value) return '';
  return `
    <div class="property-row">
      <span class="property-label">${escapeHtml(label)}:</span>
      <span class="property-value">${value}</span>
    </div>
  `;
}

// Main execution
function main() {
  console.log('Reading navigation, footer, and modal files...');
  const navigationHTML = fs.readFileSync(NAVIGATION_PATH, 'utf-8');
  const footerHTML = fs.readFileSync(FOOTER_PATH, 'utf-8');
  const modalHTML = fs.readFileSync(MODAL_PATH, 'utf-8');
  
  console.log('Reading CSV file...');
  const csvText = fs.readFileSync(CSV_PATH, 'utf-8');
  
  console.log('Parsing CSV...');
  const materials = parseCSV(csvText);
  
  // Filter only published materials
  const publishedMaterials = materials.filter(m => m.status === 'published');
  
  console.log(`Found ${publishedMaterials.length} published materials`);
  
  let generated = 0;
  let errors = 0;
  
  publishedMaterials.forEach((material, index) => {
    try {
      const slug = material.slug || material.id;
      if (!slug) {
        console.warn(`Skipping material ${index + 1}: No slug or ID`);
        errors++;
        return;
      }
      
      const html = generateMaterialHTML(material, navigationHTML, footerHTML, modalHTML);
      const outputPath = path.join(OUTPUT_DIR, `${slug}.html`);
      
      fs.writeFileSync(outputPath, html, 'utf-8');
      generated++;
      
      if ((index + 1) % 10 === 0) {
        console.log(`Generated ${index + 1}/${publishedMaterials.length} pages...`);
      }
    } catch (error) {
      console.error(`Error generating page for material ${index + 1}:`, error.message);
      errors++;
    }
  });
  
  console.log(`\n✅ Successfully generated ${generated} material pages`);
  if (errors > 0) {
    console.log(`⚠️  ${errors} materials skipped due to errors`);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { parseCSV, generateMaterialHTML };

