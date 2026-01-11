#!/usr/bin/env node

/**
 * Generate static HTML pages for each standard from standards_rows.csv
 * Creates individual pages at /standards/[slug].html
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Configuration
const CSV_PATH = path.join(__dirname, '../standards_rows.csv');
const OUTPUT_DIR = path.join(__dirname, '../standards');
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
  
  const standards = [];
  for (const record of records) {
    const standard = {};
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
      
      standard[key] = processedValue;
    }
    standards.push(standard);
  }
  
  return standards;
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

// Get category badge colors
function getCategoryBadgeColors(category) {
  const categoryLower = (category || '').toLowerCase();
  
  if (categoryLower.includes('preparation')) {
    return 'badge-blue';
  }
  if (categoryLower.includes('etching')) {
    return 'badge-indigo';
  }
  if (categoryLower.includes('analysis')) {
    return 'badge-lime';
  }
  if (categoryLower.includes('testing')) {
    return 'badge-orange';
  }
  if (categoryLower.includes('documentation')) {
    return 'badge-pink';
  }
  if (categoryLower.includes('calibration')) {
    return 'badge-yellow';
  }
  if (categoryLower.includes('reference')) {
    return 'badge-slate';
  }
  
  return 'badge-primary';
}

// Get organization badge colors
function getOrganizationBadgeColors(organization) {
  const orgLower = (organization || '').toLowerCase();
  
  if (orgLower === 'astm') {
    return 'badge-red';
  }
  if (orgLower === 'iso') {
    return 'badge-blue';
  }
  
  return 'badge-primary';
}

// Generate HTML for a standard
function generateStandardHTML(standard, navigationHTML, footerHTML, modalHTML) {
  const slug = standard.slug || standard.id;
  const standardNum = standard.standard || 'Unnamed Standard';
  const title = standard.title || '';
  const category = standard.category || '';
  const organization = standard.organization || '';
  
  // Parse arrays
  const tags = Array.isArray(standard.tags) 
    ? standard.tags 
    : (standard.tags ? (() => {
        try {
          return JSON.parse(standard.tags);
        } catch (e) {
          return [];
        }
      })() : []);
  
  const description = standard.description || '';
  const keywords = [
    'metallography',
    'standards',
    standardNum.toLowerCase(),
    category.toLowerCase(),
    organization.toLowerCase(),
    ...tags.map(t => t.toLowerCase())
  ].filter(Boolean).join(', ');
  
  const categoryBadge = getCategoryBadgeColors(category);
  const orgBadge = getOrganizationBadgeColors(organization);
  
  // Generate content sections
  const overviewContent = generateOverviewContent(standard, tags);
  const detailsContent = generateDetailsContent(standard);
  
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow">
    <meta name="google-site-verification" content="LzR4wVONWG6uIX3m2QcGuvf3rBxuHBCijv-Pl1tccFs">
    <meta name="description" content="${escapeHtml(description || `${standardNum}: ${title}`)}">
    <meta name="keywords" content="${escapeHtml(keywords)}">
    <meta name="theme-color" content="#ffffff">
    <meta name="msapplication-TileColor" content="#da532c">
    <link rel="canonical" href="https://www.metallographic.com/standards/${slug}.html">

    <!-- Page Title -->
    <title>${escapeHtml(standardNum)} - ${escapeHtml(title)} | Standards Database | PACE Technologies</title>

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
    <meta property="og:title" content="${escapeHtml(standardNum)} - ${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description || `${standardNum}: ${title}`)}">
    <meta property="og:image" content="https://www.metallographic.com/images/pace-shortlogo-white.webp">
    <meta property="og:url" content="https://www.metallographic.com/standards/${slug}.html">
    <meta property="og:type" content="website">

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(standardNum)} - Standards Database">
    <meta name="twitter:description" content="${escapeHtml(description || `${standardNum}: ${title}`)}">
    <meta name="twitter:image" content="https://www.metallographic.com/images/pace-shortlogo-white.webp">

    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${escapeHtml(standardNum)} - ${escapeHtml(title)}",
      "description": "${escapeHtml(description || `${standardNum}: ${title}`)}",
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
          "name": "Standards Database",
          "item": "https://www.metallographic.com/standards.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${escapeHtml(standardNum)}",
          "item": "https://www.metallographic.com/standards/${slug}.html"
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
                <a href="/standards.html">Standards Database</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${escapeHtml(standardNum)}</span>
            </nav>

            <!-- Header -->
            <header class="material-header">
                <div class="material-header-content">
                    <div class="material-title-section">
                        <h1 class="material-name">${escapeHtml(standardNum)}</h1>
                        <p class="material-category">${escapeHtml(title)}</p>
                    </div>
                    ${organization ? `
                    <div class="material-header-actions">
                        <span class="material-category-badge ${orgBadge}">
                            ${escapeHtml(organization)}
                        </span>
                    </div>
                    ` : ''}
                </div>
            </header>

            <!-- Badges -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                ${category ? `
                <span class="material-category-badge ${categoryBadge}">
                    ${escapeHtml(category)}
                </span>
                ` : ''}
                ${tags.length > 0 ? tags.map(tag => `
                    <span class="tag tag-gray">${escapeHtml(tag)}</span>
                `).join('') : ''}
            </div>

            <!-- Main Content Grid -->
            <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
                <!-- Left Column - Overview -->
                <div>
                    ${overviewContent}
                </div>
                
                <!-- Right Column - Details -->
                <div>
                    ${detailsContent}
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
${footerHTML}

    <!-- Scripts -->
    <script src="/js/scripts.js"></script>
</body>

${modalHTML}

</html>`;
}

// Generate overview content
function generateOverviewContent(standard, tags) {
  let html = '';
  
  html += '<div class="material-section">';
  html += '<h2 class="section-title">Description</h2>';
  html += '<div class="section-content">';
  html += `<p>${formatNotes(standard.description || 'No description available.')}</p>`;
  html += '</div></div>';
  
  if (standard.scope) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Scope</h2>';
    html += '<div class="section-content">';
    html += `<p>${formatNotes(standard.scope)}</p>`;
    html += '</div></div>';
  }
  
  if (standard.key_procedures) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Key Procedures</h2>';
    html += '<div class="section-content">';
    html += `<p>${formatNotes(standard.key_procedures)}</p>`;
    html += '</div></div>';
  }
  
  if (standard.applicable_materials) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Applicable Materials</h2>';
    html += '<div class="section-content">';
    html += `<p>${formatNotes(standard.applicable_materials)}</p>`;
    html += '</div></div>';
  }
  
  if (standard.related_topics) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Related Topics</h2>';
    html += '<div class="section-content">';
    html += `<p>${formatNotes(standard.related_topics)}</p>`;
    html += '</div></div>';
  }
  
  return html;
}

// Generate details content
function generateDetailsContent(standard) {
  let html = '';
  
  html += '<div class="material-section">';
  html += '<h2 class="section-title">Standard Information</h2>';
  html += '<div class="section-content">';
  html += '<div class="property-grid">';
  
  if (standard.standard) {
    html += `<div class="property-item"><span class="property-label">Standard:</span><span class="property-value">${escapeHtml(standard.standard)}</span></div>`;
  }
  if (standard.organization) {
    html += `<div class="property-item"><span class="property-label">Organization:</span><span class="property-value">${escapeHtml(standard.organization)}</span></div>`;
  }
  if (standard.category) {
    html += `<div class="property-item"><span class="property-label">Category:</span><span class="property-value">${escapeHtml(standard.category)}</span></div>`;
  }
  
  html += '</div></div></div>';
  
  if (standard.official_url) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Official Documentation</h2>';
    html += '<div class="section-content">';
    html += `<a href="${escapeHtml(standard.official_url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">`;
    html += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">';
    html += '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>';
    html += '<polyline points="15 3 21 3 21 9"></polyline>';
    html += '<line x1="10" y1="14" x2="21" y2="3"></line>';
    html += '</svg>';
    html += 'View Official Standard';
    html += '</a>';
    html += '</div></div>';
  }
  
  if (standard.purchase_url) {
    html += '<div class="material-section">';
    html += '<h2 class="section-title">Purchase Standard</h2>';
    html += '<div class="section-content">';
    html += `<a href="${escapeHtml(standard.purchase_url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">`;
    html += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">';
    html += '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>';
    html += '<line x1="3" y1="6" x2="21" y2="6"></line>';
    html += '<path d="M16 10a4 4 0 0 1-8 0"></path>';
    html += '</svg>';
    html += 'Purchase Standard';
    html += '</a>';
    html += '</div></div>';
  }
  
  return html;
}

// Main function to read CSV and generate pages
async function main() {
  console.log('Reading CSV file...');
  const csvText = fs.readFileSync(CSV_PATH, 'utf-8');
  const standards = parseCSV(csvText);
  
  const publishedStandards = standards.filter(s => s.status === 'published');
  console.log(`Found ${standards.length} standards in CSV`);
  console.log(`Generating pages for ${publishedStandards.length} published standards...`);

  const navigationHTML = fs.readFileSync(NAVIGATION_PATH, 'utf-8');
  const footerHTML = fs.readFileSync(FOOTER_PATH, 'utf-8');
  const modalHTML = fs.readFileSync(MODAL_PATH, 'utf-8');
  
  let generated = 0;
  let errors = 0;

  publishedStandards.forEach((standard, index) => {
    try {
      const slug = standard.slug || standard.id;
      if (!slug) {
        console.warn(`Skipping standard ${index + 1}: No slug or ID`);
        errors++;
        return;
      }
      
      const html = generateStandardHTML(standard, navigationHTML, footerHTML, modalHTML);
      const outputPath = path.join(OUTPUT_DIR, `${slug}.html`);
      
      fs.writeFileSync(outputPath, html, 'utf-8');
      generated++;
      
      if ((index + 1) % 10 === 0) {
        console.log(`Generated ${index + 1}/${publishedStandards.length} pages...`);
      }
    } catch (error) {
      console.error(`Error generating page for standard ${index + 1} (${standard.standard || standard.id}):`, error.message);
      errors++;
    }
  });
  
  console.log(`\n✅ Successfully generated ${generated} standard pages`);
  if (errors > 0) {
    console.log(`⚠️  ${errors} standards skipped due to errors`);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { parseCSV, generateStandardHTML };

