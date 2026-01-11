#!/usr/bin/env node

/**
 * Generate static HTML pages for each etchant from etchants_rows.csv
 * Creates individual pages at /etchants/[slug].html
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Configuration
const CSV_PATH = path.join(__dirname, '../etchants_rows.csv');
const OUTPUT_DIR = path.join(__dirname, '../etchants');
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
  
  const etchants = [];
  for (const record of records) {
    const etchant = {};
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
      
      etchant[key] = processedValue;
    }
    etchants.push(etchant);
  }
  
  return etchants;
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

// Generate HTML for an etchant
function generateEtchantHTML(etchant, navigationHTML, footerHTML, modalHTML) {
  const slug = etchant.slug || etchant.id;
  const name = etchant.name || 'Unnamed Etchant';
  const category = etchant.category || '';
  
  // Parse arrays
  const altNames = Array.isArray(etchant.alternative_names) 
    ? etchant.alternative_names 
    : (etchant.alternative_names ? JSON.parse(etchant.alternative_names) : []);
  
  const tags = Array.isArray(etchant.tags) 
    ? etchant.tags 
    : (etchant.tags ? JSON.parse(etchant.tags) : []);
  
  const compatibleMaterials = Array.isArray(etchant.compatible_materials)
    ? etchant.compatible_materials
    : (etchant.compatible_materials ? JSON.parse(etchant.compatible_materials) : []);
  
  const incompatibleMaterials = Array.isArray(etchant.incompatible_materials)
    ? etchant.incompatible_materials
    : (etchant.incompatible_materials ? JSON.parse(etchant.incompatible_materials) : []);
  
  const alternativeEtchants = Array.isArray(etchant.alternative_etchants)
    ? etchant.alternative_etchants
    : (etchant.alternative_etchants ? JSON.parse(etchant.alternative_etchants) : []);
  
  const similarEtchants = Array.isArray(etchant.similar_etchants)
    ? etchant.similar_etchants
    : (etchant.similar_etchants ? JSON.parse(etchant.similar_etchants) : []);
  
  const astmReferences = Array.isArray(etchant.astm_references)
    ? etchant.astm_references
    : (etchant.astm_references ? JSON.parse(etchant.astm_references) : []);
  
  const isoReferences = Array.isArray(etchant.iso_references)
    ? etchant.iso_references
    : (etchant.iso_references ? JSON.parse(etchant.iso_references) : []);
  
  const description = `Etchant information for ${name}. ${category ? category.replace('-', ' ') + ' ' : ''}etchant for metallographic analysis.`;
  const keywords = [
    'metallography',
    'etchant',
    'etching reagent',
    name.toLowerCase(),
    category.toLowerCase(),
    ...tags.map(t => t.toLowerCase())
  ].filter(Boolean).join(', ');
  
  // Generate tab content
  const overviewTab = generateOverviewTab(etchant, altNames, tags, compatibleMaterials, incompatibleMaterials);
  const applicationTab = generateApplicationTab(etchant);
  const safetyTab = generateSafetyTab(etchant);
  const alternativesTab = generateAlternativesTab(etchant, alternativeEtchants, similarEtchants, astmReferences, isoReferences);
  
  // PACE product URL
  let paceProductUrl = '';
  if (etchant.pace_product_available === 'true' || etchant.pace_product_available === true) {
    if (etchant.pace_product_url) {
      paceProductUrl = etchant.pace_product_url;
    } else if (etchant.pace_product_slug) {
      paceProductUrl = `https://shop.metallographic.com/products/${etchant.pace_product_slug}`;
    }
  }
  
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
    <link rel="canonical" href="https://www.metallographic.com/etchants/${slug}.html">

    <!-- Page Title -->
    <title>${escapeHtml(name)} - Etchants Database | PACE Technologies</title>

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
    <meta property="og:title" content="${escapeHtml(name)} - Etchants Database">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="https://www.metallographic.com/images/pace-shortlogo-white.webp">
    <meta property="og:url" content="https://www.metallographic.com/etchants/${slug}.html">
    <meta property="og:type" content="website">

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(name)} - Etchants Database">
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
          "name": "Etchants Database",
          "item": "https://www.metallographic.com/etchants.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${escapeHtml(name)}",
          "item": "https://www.metallographic.com/etchants/${slug}.html"
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
                <a href="/etchants.html">Etchants Database</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${escapeHtml(name)}</span>
            </nav>

            <!-- Header -->
            <header class="material-header">
                <div class="material-header-content">
                    <div class="material-title-section">
                        <h1 class="material-name">${escapeHtml(name)}</h1>
                        <p class="material-category">${escapeHtml(category ? category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '')}</p>
                    </div>
                    ${paceProductUrl ? `
                    <div class="material-header-actions">
                        <a href="${paceProductUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
                            Buy from PACE
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    </div>
                    ` : ''}
                </div>
            </header>

            <!-- Quick Info Cards -->
            <div class="etchant-quick-info-grid">
                ${etchant.composition ? `
                <div class="etchant-info-card">
                    <div class="etchant-info-header">
                        <svg class="etchant-info-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                        <span class="etchant-info-label">Composition</span>
                    </div>
                    <p class="etchant-info-value">${escapeHtml(etchant.composition)}</p>
                    ${etchant.concentration ? `<p class="etchant-info-subvalue">${escapeHtml(etchant.concentration)}</p>` : ''}
                </div>
                ` : ''}
                ${etchant.application_method ? `
                <div class="etchant-info-card">
                    <div class="etchant-info-header">
                        <svg class="etchant-info-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                        <span class="etchant-info-label">Method</span>
                    </div>
                    <p class="etchant-info-value">${escapeHtml(etchant.application_method.charAt(0).toUpperCase() + etchant.application_method.slice(1))}</p>
                </div>
                ` : ''}
                ${etchant.typical_time_seconds ? `
                <div class="etchant-info-card">
                    <div class="etchant-info-header">
                        <svg class="etchant-info-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span class="etchant-info-label">Time</span>
                    </div>
                    <p class="etchant-info-value">${escapeHtml(etchant.typical_time_seconds)}s</p>
                </div>
                ` : ''}
                ${(() => {
                  let hazards = [];
                  if (etchant.hazards) {
                    if (Array.isArray(etchant.hazards)) {
                      hazards = etchant.hazards;
                    } else if (typeof etchant.hazards === 'string') {
                      try {
                        hazards = JSON.parse(etchant.hazards);
                      } catch (e) {
                        hazards = [etchant.hazards];
                      }
                    }
                  }
                  return hazards.length > 0 ? `
                <div class="etchant-info-card etchant-info-card-hazard">
                    <div class="etchant-info-header">
                        <svg class="etchant-info-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <span class="etchant-info-label">Hazards</span>
                    </div>
                    <p class="etchant-info-value">${escapeHtml(hazards.join(', '))}</p>
                </div>
                ` : '';
                })()}
            </div>

            <!-- Safety Warning -->
            ${(() => {
              let hazards = [];
              if (etchant.hazards) {
                if (Array.isArray(etchant.hazards)) {
                  hazards = etchant.hazards;
                } else if (typeof etchant.hazards === 'string') {
                  try {
                    hazards = JSON.parse(etchant.hazards);
                  } catch (e) {
                    hazards = [etchant.hazards];
                  }
                }
              }
              if (hazards.length > 0) {
                let ppeRequired = [];
                if (etchant.ppe_required) {
                  if (Array.isArray(etchant.ppe_required)) {
                    ppeRequired = etchant.ppe_required;
                  } else if (typeof etchant.ppe_required === 'string') {
                    try {
                      ppeRequired = JSON.parse(etchant.ppe_required);
                    } catch (e) {
                      ppeRequired = [etchant.ppe_required];
                    }
                  }
                }
                return `
            <div class="etchant-safety-warning">
                <div class="etchant-safety-warning-content">
                    <svg class="etchant-safety-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <div class="etchant-safety-warning-text">
                        <h3 class="etchant-safety-title">Safety Warning</h3>
                        ${etchant.safety_notes ? `<p class="etchant-safety-notes">${formatNotes(etchant.safety_notes)}</p>` : ''}
                        ${ppeRequired.length > 0 ? `
                        <div class="etchant-safety-ppe">
                            <p class="etchant-safety-ppe-label">Required PPE:</p>
                            <ul class="etchant-safety-ppe-list">
                                ${ppeRequired.map(ppe => `<li>${escapeHtml(ppe)}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
                `;
              }
              return '';
            })()}

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
                    <button class="tab-btn" data-tab="application" onclick="switchTab('application')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                        Application
                    </button>
                    <button class="tab-btn" data-tab="safety" onclick="switchTab('safety')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        Safety
                    </button>
                    <button class="tab-btn" data-tab="alternatives" onclick="switchTab('alternatives')">
                        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Alternatives
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="material-tabs-content">
                    <div id="tab-overview" class="tab-content active">
                        ${overviewTab}
                    </div>
                    <div id="tab-application" class="tab-content">
                        ${applicationTab}
                    </div>
                    <div id="tab-safety" class="tab-content">
                        ${safetyTab}
                    </div>
                    <div id="tab-alternatives" class="tab-content">
                        ${alternativesTab}
                    </div>
                </div>
            </div>
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
function generateOverviewTab(etchant, altNames, tags, compatibleMaterials, incompatibleMaterials) {
  let html = '';
  
  // Note: Composition, Method, and Time are now in quick info cards at the top
  
  // Alternative Names
  if (altNames && altNames.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Alternative Names</h2>';
    html += '<div class="section-content">';
    html += '<div class="tag-list">';
    altNames.forEach(name => {
      html += `<span class="tag tag-gray">${escapeHtml(name)}</span>`;
    });
    html += '</div></div></div>';
  }
  
  // Tags
  if (tags && tags.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Tags</h2>';
    html += '<div class="section-content">';
    html += '<div class="tag-list">';
    tags.forEach(tag => {
      html += `<span class="tag tag-blue">${escapeHtml(tag)}</span>`;
    });
    html += '</div></div></div>';
  }
  
  // Reveals
  if (etchant.reveals) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Reveals</h2>';
    html += '<div class="section-content">';
    html += `<p>${formatNotes(etchant.reveals)}</p>`;
    html += '</div></div>';
  }
  
  // Typical Results
  if (etchant.typical_results) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Typical Results</h2>';
    html += '<div class="section-content">';
    html += `<p>${formatNotes(etchant.typical_results)}</p>`;
    html += '</div></div>';
  }
  
  // Color Effects
  if (etchant.color_effects) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Color Effects</h2>';
    html += '<div class="section-content">';
    html += `<p>${formatNotes(etchant.color_effects)}</p>`;
    html += '</div></div>';
  }
  
  // Compatible Materials
  if (compatibleMaterials && compatibleMaterials.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Compatible Materials</h2>';
    html += '<div class="section-content">';
    html += '<div class="tag-list">';
    compatibleMaterials.forEach(material => {
      html += `<span class="tag tag-green">${escapeHtml(material)}</span>`;
    });
    html += '</div></div></div>';
  }
  
  // Incompatible Materials
  if (incompatibleMaterials && incompatibleMaterials.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Incompatible Materials</h2>';
    html += '<div class="section-content">';
    html += '<div class="tag-list">';
    incompatibleMaterials.forEach(material => {
      html += `<span class="tag tag-red">${escapeHtml(material)}</span>`;
    });
    html += '</div></div></div>';
  }
  
  if (!html) {
    html = '<p class="empty-message">No overview information available.</p>';
  }
  
  return html;
}

// Generate Application tab content
function generateApplicationTab(etchant) {
  let html = '';
  
  // Application Method section with property rows in gray box
  if (etchant.application_method || etchant.typical_time_seconds || etchant.temperature_celsius || etchant.voltage || etchant.current_density) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">';
    html += '<svg class="section-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
    html += '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>';
    html += '</svg>';
    html += 'Application Method';
    html += '</h2>';
    html += '<div class="section-content">';
    html += '<div class="bg-gray-50 rounded-lg p-4 space-y-2">';
    
    if (etchant.application_method) {
      html += '<div class="flex items-center gap-2 py-1.5">';
      html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">';
      html += '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>';
      html += '</svg>';
      html += `<span class="text-xs font-medium text-gray-500 uppercase tracking-wide min-w-[140px]">Method:</span>`;
      html += `<span class="text-sm text-gray-900 capitalize">${escapeHtml(etchant.application_method)}</span>`;
      html += '</div>';
    }
    
    if (etchant.typical_time_seconds) {
      html += '<div class="flex items-center gap-2 py-1.5">';
      html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">';
      html += '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>';
      html += '</svg>';
      html += `<span class="text-xs font-medium text-gray-500 uppercase tracking-wide min-w-[140px]">Typical Time:</span>`;
      html += `<span class="text-sm text-gray-900">${escapeHtml(etchant.typical_time_seconds)} seconds</span>`;
      html += '</div>';
    }
    
    if (etchant.temperature_celsius) {
      html += '<div class="flex items-center gap-2 py-1.5">';
      html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">';
      html += '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"></path>';
      html += '</svg>';
      html += `<span class="text-xs font-medium text-gray-500 uppercase tracking-wide min-w-[140px]">Temperature:</span>`;
      html += `<span class="text-sm text-gray-900">${escapeHtml(etchant.temperature_celsius)} °C</span>`;
      html += '</div>';
    }
    
    if (etchant.voltage) {
      html += '<div class="flex items-center gap-2 py-1.5">';
      html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">';
      html += '<polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>';
      html += '</svg>';
      html += `<span class="text-xs font-medium text-gray-500 uppercase tracking-wide min-w-[140px]">Voltage:</span>`;
      html += `<span class="text-sm text-gray-900">${escapeHtml(etchant.voltage)} V</span>`;
      html += '</div>';
    }
    
    if (etchant.current_density) {
      html += '<div class="flex items-center gap-2 py-1.5">';
      html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">';
      html += '<polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>';
      html += '</svg>';
      html += `<span class="text-xs font-medium text-gray-500 uppercase tracking-wide min-w-[140px]">Current Density:</span>`;
      html += `<span class="text-sm text-gray-900">${escapeHtml(etchant.current_density)} A/cm²</span>`;
      html += '</div>';
    }
    
    html += '</div></div></div>';
  }
  
  // Preparation Notes
  if (etchant.preparation_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Preparation Notes</h2>';
    html += '<div class="section-content">';
    html += `<div>${formatNotes(etchant.preparation_notes)}</div>`;
    html += '</div></div>';
  }
  
  // Application Notes
  if (etchant.application_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Application Notes</h2>';
    html += '<div class="section-content">';
    html += `<div>${formatNotes(etchant.application_notes)}</div>`;
    html += '</div></div>';
  }
  
  // Troubleshooting Notes
  if (etchant.troubleshooting_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Troubleshooting</h2>';
    html += '<div class="section-content">';
    html += `<div>${formatNotes(etchant.troubleshooting_notes)}</div>`;
    html += '</div></div>';
  }
  
  if (!html) {
    html = '<p class="empty-message">No application information available.</p>';
  }
  
  return html;
}

// Generate Safety tab content
function generateSafetyTab(etchant) {
  let html = '';
  
  // Hazards
  let hazards = [];
  if (etchant.hazards) {
    if (Array.isArray(etchant.hazards)) {
      hazards = etchant.hazards;
    } else if (typeof etchant.hazards === 'string') {
      try {
        hazards = JSON.parse(etchant.hazards);
      } catch (e) {
        hazards = [etchant.hazards];
      }
    }
  }
  
  if (hazards.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Hazards</h2>';
    html += '<div class="section-content">';
    html += '<div class="tag-list">';
    hazards.forEach(hazard => {
      html += `<span class="tag tag-red">${escapeHtml(hazard)}</span>`;
    });
    html += '</div></div></div>';
  }
  
  // Safety Notes
  if (etchant.safety_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Safety Notes</h2>';
    html += '<div class="section-content">';
    html += `<div>${formatNotes(etchant.safety_notes)}</div>`;
    html += '</div></div>';
  }
  
  // PPE Required
  let ppeRequired = [];
  if (etchant.ppe_required) {
    if (Array.isArray(etchant.ppe_required)) {
      ppeRequired = etchant.ppe_required;
    } else if (typeof etchant.ppe_required === 'string') {
      try {
        ppeRequired = JSON.parse(etchant.ppe_required);
      } catch (e) {
        ppeRequired = [etchant.ppe_required];
      }
    }
  }
  
  if (ppeRequired.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Required PPE</h2>';
    html += '<div class="section-content">';
    html += '<ul class="applications-list">';
    ppeRequired.forEach(ppe => {
      html += `<li>${escapeHtml(ppe)}</li>`;
    });
    html += '</ul></div></div>';
  }
  
  // Storage Notes
  if (etchant.storage_notes) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Storage Notes</h2>';
    html += '<div class="section-content">';
    html += `<div>${formatNotes(etchant.storage_notes)}</div>`;
    html += '</div></div>';
  }
  
  if (!html) {
    html = '<p class="empty-message">No safety information available.</p>';
  }
  
  return html;
}

// Generate Alternatives tab content
function generateAlternativesTab(etchant, alternativeEtchants, similarEtchants, astmReferences, isoReferences) {
  let html = '';
  
  // Alternative Etchants
  if (alternativeEtchants && alternativeEtchants.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Alternative Etchants</h2>';
    html += '<div class="section-content">';
    html += '<ul class="applications-list">';
    alternativeEtchants.forEach(alt => {
      html += `<li>${escapeHtml(alt)}</li>`;
    });
    html += '</ul></div></div>';
  }
  
  // Similar Etchants
  if (similarEtchants && similarEtchants.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Similar Etchants</h2>';
    html += '<div class="section-content">';
    html += '<ul class="applications-list">';
    similarEtchants.forEach(sim => {
      html += `<li>${escapeHtml(sim)}</li>`;
    });
    html += '</ul></div></div>';
  }
  
  // ASTM References
  if (astmReferences && astmReferences.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">ASTM References</h2>';
    html += '<div class="section-content">';
    html += '<div class="tag-list">';
    astmReferences.forEach(ref => {
      html += `<span class="tag tag-blue">${escapeHtml(ref)}</span>`;
    });
    html += '</div></div></div>';
  }
  
  // ISO References
  if (isoReferences && isoReferences.length > 0) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">ISO References</h2>';
    html += '<div class="section-content">';
    html += '<div class="tag-list">';
    isoReferences.forEach(ref => {
      html += `<span class="tag tag-green">${escapeHtml(ref)}</span>`;
    });
    html += '</div></div></div>';
  }
  
  // Other References
  if (etchant.other_references) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Other References</h2>';
    html += '<div class="section-content">';
    html += `<p>${formatNotes(etchant.other_references)}</p>`;
    html += '</div></div>';
  }
  
  if (!html) {
    html = '<p class="empty-message">No alternative information available.</p>';
  }
  
  return html;
}

// Main function
function main() {
  console.log('Reading CSV file...');
  const csvText = fs.readFileSync(CSV_PATH, 'utf-8');
  const etchants = parseCSV(csvText);
  
  console.log(`Found ${etchants.length} etchants in CSV`);
  
  // Filter published etchants
  const publishedEtchants = etchants.filter(e => e.status === 'published');
  console.log(`Generating pages for ${publishedEtchants.length} published etchants...`);
  
  // Read navigation, footer, and modal
  const navigationHTML = fs.readFileSync(NAVIGATION_PATH, 'utf-8');
  const footerHTML = fs.readFileSync(FOOTER_PATH, 'utf-8');
  const modalHTML = fs.readFileSync(MODAL_PATH, 'utf-8');
  
  let generated = 0;
  let errors = 0;
  
  publishedEtchants.forEach((etchant, index) => {
    try {
      const slug = etchant.slug || etchant.id;
      if (!slug) {
        console.warn(`Skipping etchant ${index + 1}: No slug or ID`);
        errors++;
        return;
      }
      
      const html = generateEtchantHTML(etchant, navigationHTML, footerHTML, modalHTML);
      const outputPath = path.join(OUTPUT_DIR, `${slug}.html`);
      
      fs.writeFileSync(outputPath, html, 'utf-8');
      generated++;
      
      if ((index + 1) % 10 === 0) {
        console.log(`Generated ${index + 1}/${publishedEtchants.length} pages...`);
      }
    } catch (error) {
      console.error(`Error generating page for etchant ${index + 1}:`, error.message);
      errors++;
    }
  });
  
  console.log(`\n✅ Successfully generated ${generated} etchant pages`);
  if (errors > 0) {
    console.log(`⚠️  ${errors} etchants skipped due to errors`);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { parseCSV, generateEtchantHTML };
