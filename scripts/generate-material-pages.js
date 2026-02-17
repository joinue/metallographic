/**
 * Generate static HTML material detail pages for 6 new materials.
 *
 * Reads materials/zamak-3.html as the template (nav, footer, scripts)
 * and materials_rows.csv for the data.  Outputs one HTML file per slug
 * into materials/{slug}.html.
 *
 * Usage:  node scripts/generate-material-pages.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT, 'materials', 'zamak-3.html');
const CSV_PATH = path.join(ROOT, 'materials_rows.csv');
const OUT_DIR = path.join(ROOT, 'materials');

const TARGET_SLUGS = [
  // Class 1 (previous batch)
  'pure-lead', 'pure-tin', 'sn-37pb-eutectic-solder',
  'sac305-lead-free-solder', 'zamak-5', 'babbitt-bearing-alloy',
  // Class 1 additions
  'pure-gold', 'pure-silver', 'pure-platinum',
  'a356-cast-aluminum', 'a380-cast-aluminum',
  // Class 2
  'rhenium', 'beryllium', 'hafnium', 'zirconium',
  // Class 3
  'sintered-iron-fe-cu-pm', 'sintered-316l-stainless-pm',
  // Class 4
  'gallium-arsenide', 'multilayer-ceramic-capacitor',
  'pzt-piezoelectric-ceramic', 'nickel-zinc-ferrite',
  'aluminum-nitride-substrate',
  // Class 5
  'maraging-steel-c250', 'maraging-steel-c300',
  'api-5l-x70-pipeline-steel', 'hadfield-manganese-steel',
  // Class 6
  'cocrmo-cast-f75', 'cocrmo-wrought-f1537', 'mp35n', 'zircaloy-4',
  // Class 7
  'cr3c2-nicr-thermal-spray', 'nial-bond-coat-thermal-spray',
  'hot-dip-galvanized-coating', 'hard-chrome-plating',
  'anodized-aluminum-coating',
  // Class 8
  'p20-plastic-mold-steel', 'w1-water-hardening-tool-steel',
  'nitrided-steel-cross-section',
  // Class 9
  'wc-co-cemented-carbide', 'ticn-ni-cermet',
  // Class 10
  'sapphire-single-crystal', 'soda-lime-glass', 'borosilicate-glass',
  // Class 11
  'polycrystalline-diamond-pcd', 'cubic-boron-nitride-cbn',
  // AM-specific
  'am-ti-6al-4v', 'am-inconel-718', 'am-316l-stainless', 'am-alsi10mg',
];

// ---------------------------------------------------------------------------
// CSV Parser  (state-machine, handles quoted fields with commas & newlines)
// ---------------------------------------------------------------------------

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        // look ahead
        if (i + 1 < text.length && text[i + 1] === '"') {
          // escaped quote
          field += '"';
          i += 2;
          continue;
        } else {
          // end of quoted field
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        field += ch;
        i++;
        continue;
      }
    }

    // not in quotes
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ',') {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (ch === '\r') {
      // skip \r, handle \r\n
      if (i + 1 < text.length && text[i + 1] === '\n') {
        i++; // skip \r, the \n will be handled next
      }
      // treat bare \r as line end
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
      i++;
      continue;
    }
    if (ch === '\n') {
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
      i++;
      continue;
    }
    field += ch;
    i++;
  }

  // last field / row
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

// ---------------------------------------------------------------------------
// Bracket-list parser  (handles both  [a,b,c]  and  ["a","b","c"] )
// ---------------------------------------------------------------------------

function parseBracketList(val) {
  if (!val || typeof val !== 'string') return [];
  val = val.trim();
  if (!val.startsWith('[') || !val.endsWith(']')) {
    // Maybe pipe-separated?
    if (val.includes('|')) return val.split('|').map(s => s.trim()).filter(Boolean);
    return val ? [val] : [];
  }
  const inner = val.slice(1, -1).trim();
  if (!inner) return [];

  // Try JSON parse first (handles ["a","b"] with proper quoting)
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) return parsed.map(s => String(s).trim());
  } catch (e) {
    // fall through to manual parse
  }

  // Manual parse for [a,b,c] without quotes
  // Need to be careful with commas inside values — but these are simple
  return inner.split(',').map(s => s.trim().replace(/^"+|"+$/g, '')).filter(Boolean);
}

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------

function escHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(s) {
  return escHtml(s);
}

/**
 * For JSON-LD strings: escape for embedding in a JSON value inside a <script> tag.
 */
function escJsonLd(s) {
  if (!s) return '';
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function propertyRow(label, value) {
  return `
    <div class="property-row">
      <span class="property-label">${label}:</span>
      <span class="property-value">${value}</span>
    </div>
  `;
}

function badge(text, variant) {
  variant = variant || 'primary';
  return `<span class="badge badge-${escHtml(variant)}">${escHtml(text)}</span>`;
}

function yesNoBadge(val) {
  const s = String(val).trim().toUpperCase();
  if (s === 'TRUE' || s === 'YES') return badge('Yes', 'primary');
  return badge('No', 'gray');
}

function tagList(items, tagClass) {
  if (!items || items.length === 0) return '';
  return '<div class="tag-list">' +
    items.map(t => `<span class="tag ${tagClass}">${escHtml(t)}</span>`).join('') +
    '</div>';
}

function sequenceGroup(label, items) {
  if (!items || items.length === 0) return '';
  return '<div class="sequence-group">' +
    `<span class="property-label">${escHtml(label)}:</span>` +
    tagList(items, 'tag-primary') +
    '</div>';
}

// ---------------------------------------------------------------------------
// Build tab content
// ---------------------------------------------------------------------------

function buildOverviewTab(m) {
  let html = '';

  // Basic Information
  html += '<div class="material-section"><h2 class="section-title">Basic Information</h2><div class="section-content">';
  html += propertyRow('Category', escHtml(m.category));
  html += propertyRow('Material Type', escHtml(m.material_type));

  const altNames = parseBracketList(m.alternative_names);
  if (altNames.length) {
    html += '<div class="property-group"><span class="property-label">Alternative Names:</span>' +
      tagList(altNames, 'tag-blue') + '</div>';
  }

  const tags = parseBracketList(m.tags);
  if (tags.length) {
    html += '<div class="property-group"><span class="property-label">Tags:</span>' +
      tagList(tags, 'tag-gray') + '</div>';
  }

  html += '</div></div>';

  // Composition & Structure
  html += '<div class="material-section"><h2 class="section-title">Composition &amp; Structure</h2><div class="section-content">';
  if (m.composition) html += propertyRow('Composition', escHtml(m.composition));
  if (m.microstructure) html += propertyRow('Microstructure', escHtml(m.microstructure));
  html += '</div></div>';

  // Description
  if (m.detailed_description) {
    html += '<div class="material-section"><h2 class="section-title">Description</h2><div class="section-content">' +
      `<p class="description-text">${escHtml(m.detailed_description)}</p>` +
      '</div></div>';
  }

  return html;
}

function buildPropertiesTab(m) {
  let html = '';

  // Mechanical Properties
  html += '<div class="material-section"><h2 class="section-title">Mechanical Properties</h2><div class="section-content">';
  if (m.hardness) html += propertyRow('Hardness', escHtml(m.hardness));
  if (m.hardness_hb) html += propertyRow('Hardness (HB)', escHtml(m.hardness_hb) + ' HB');
  if (m.hardness_hrc) html += propertyRow('Hardness (HRC)', escHtml(m.hardness_hrc) + ' HRC');
  if (m.hardness_hv) html += propertyRow('Hardness (HV)', escHtml(m.hardness_hv) + ' HV');
  if (m.hardness_category) html += propertyRow('Hardness Category', badge(m.hardness_category, 'primary'));
  if (m.tensile_strength_mpa) html += propertyRow('Tensile Strength', escHtml(m.tensile_strength_mpa) + ' MPa');
  if (m.yield_strength_mpa) html += propertyRow('Yield Strength', escHtml(m.yield_strength_mpa) + ' MPa');
  html += '</div></div>';

  // Physical Properties
  html += '<div class="material-section"><h2 class="section-title">Physical Properties</h2><div class="section-content">';
  if (m.density) html += propertyRow('Density', escHtml(m.density) + ' g/cm\u00B3');
  if (m.melting_point_celsius) html += propertyRow('Melting Point', escHtml(m.melting_point_celsius) + ' \u00B0C');
  html += '</div></div>';

  // Material Characteristics
  html += '<div class="material-section"><h2 class="section-title">Material Characteristics</h2><div class="section-content">';
  html += propertyRow('Work Hardening', yesNoBadge(m.work_hardening));
  html += propertyRow('Magnetic', yesNoBadge(m.magnetic));
  if (m.corrosion_resistance) html += propertyRow('Corrosion Resistance', badge(m.corrosion_resistance, 'primary'));
  html += '</div></div>';

  return html;
}

function buildPreparationTab(m) {
  let html = '';

  // General Preparation Notes
  if (m.preparation_notes) {
    html += '<div class="material-section"><h2 class="section-title">General Preparation Notes</h2>' +
      '<div class="section-content"><div class="notes-content">' +
      m.preparation_notes +
      '</div></div></div>';
  }

  // Sectioning
  if (m.sectioning_notes) {
    html += '<div class="material-section"><h2 class="section-title">Sectioning</h2>' +
      '<div class="section-content"><div class="notes-content">' +
      m.sectioning_notes +
      '</div></div></div>';
  }

  // Mounting
  if (m.mounting_notes) {
    html += '<div class="material-section"><h2 class="section-title">Mounting</h2>' +
      '<div class="section-content"><div class="notes-content">' +
      m.mounting_notes +
      '</div></div></div>';
  }

  // Grinding
  if (m.grinding_notes) {
    const grindSeq = parseBracketList(m.recommended_grinding_sequence);
    html += '<div class="material-section"><h2 class="section-title">Grinding</h2>' +
      '<div class="section-content"><div class="notes-content">' +
      m.grinding_notes +
      '</div>' +
      sequenceGroup('Recommended Sequence', grindSeq) +
      '</div></div>';
  }

  // Polishing
  if (m.polishing_notes) {
    const polishSeq = parseBracketList(m.recommended_polishing_sequence);
    html += '<div class="material-section"><h2 class="section-title">Polishing</h2>' +
      '<div class="section-content"><div class="notes-content">' +
      m.polishing_notes +
      '</div>' +
      sequenceGroup('Recommended Sequence', polishSeq) +
      '</div></div>';
  }

  // Etching
  if (m.etching_notes) {
    const etchants = parseBracketList(m.common_etchants);
    html += '<div class="material-section"><h2 class="section-title">Etching</h2>' +
      '<div class="section-content"><div class="notes-content">' +
      m.etching_notes +
      '</div>' +
      sequenceGroup('Common Etchants', etchants) +
      '</div></div>';
  }

  return html;
}

function buildHeatTreatmentTab(m) {
  if (m.heat_treatment) {
    return '<div class="material-section"><h2 class="section-title">Heat Treatment</h2>' +
      '<div class="section-content"><p class="description-text">' +
      escHtml(m.heat_treatment) +
      '</p></div></div>';
  }
  return '<p class="empty-message">No heat treatment information available.</p>';
}

function buildStandardsTab(m) {
  const astm = parseBracketList(m.astm_standards);
  const iso = parseBracketList(m.iso_standards);

  if (astm.length === 0 && iso.length === 0) {
    return '<p class="empty-message">No standards information available.</p>';
  }

  let html = '';
  if (astm.length) {
    html += '<div class="material-section"><h2 class="section-title">ASTM Standards</h2>' +
      '<div class="section-content"><ul class="applications-list">' +
      astm.map(s => `<li>${escHtml(s)}</li>`).join('') +
      '</ul></div></div>';
  }
  if (iso.length) {
    html += '<div class="material-section"><h2 class="section-title">ISO Standards</h2>' +
      '<div class="section-content"><ul class="applications-list">' +
      iso.map(s => `<li>${escHtml(s)}</li>`).join('') +
      '</ul></div></div>';
  }
  return html;
}

function buildApplicationsTab(m) {
  const apps = parseBracketList(m.applications);
  const uses = parseBracketList(m.typical_uses);
  let html = '';

  if (apps.length) {
    html += '<div class="material-section"><h2 class="section-title">Applications</h2>' +
      '<div class="section-content"><ul class="applications-list">' +
      apps.map(a => `<li>${escHtml(a)}</li>`).join('') +
      '</ul></div></div>';
  }

  if (uses.length) {
    html += '<div class="material-section"><h2 class="section-title">Typical Uses</h2>' +
      '<div class="section-content"><ul class="applications-list">' +
      uses.map(u => `<li>${escHtml(u)}</li>`).join('') +
      '</ul></div></div>';
  }

  if (!html) {
    html = '<p class="empty-message">No application information available.</p>';
  }
  return html;
}

function buildRelatedGuides(m) {
  const slugs = parseBracketList(m.related_guide_slugs);

  if (slugs.length === 0) {
    return `
            <div class="related-guides-section">
                <h3 class="related-guides-title">Related Preparation Guides</h3>
                <div class="related-guides-list">

                        <a href="/guides.html" class="related-guide-link">> View All Guides</a>

                </div>
            </div>`;
  }

  let links = slugs.map(s =>
    `                        <a href="/guides/${escAttr(s)}.html" class="related-guide-link">${escHtml(s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))}</a>`
  ).join('\n');

  links += '\n                        <a href="/guides.html" class="related-guide-link">> View All Guides</a>';

  return `
            <div class="related-guides-section">
                <h3 class="related-guides-title">Related Preparation Guides</h3>
                <div class="related-guides-list">

${links}

                </div>
            </div>`;
}

// ---------------------------------------------------------------------------
// Build the full page
// ---------------------------------------------------------------------------

function buildPage(m, navHtml, footerAndScripts) {
  const name = m.name;
  const slug = m.slug;
  const category = m.category;
  const microstructure = m.microstructure || '';
  const description = `Material properties and preparation information for ${name}. ${category} with ${microstructure} microstructure.`;
  const altNames = parseBracketList(m.alternative_names);
  const tags = parseBracketList(m.tags);
  const keywords = ['metallography', 'sample preparation', 'metallographic analysis',
    name.toLowerCase(), category.toLowerCase(),
    microstructure.toLowerCase(),
    ...tags.map(t => t.toLowerCase())
  ].join(', ');

  const canonicalUrl = `https://www.metallographic.com/materials/${slug}.html`;

  // --- HEAD ---
  const head = `<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow">
    <meta name="google-site-verification" content="LzR4wVONWG6uIX3m2QcGuvf3rBxuHBCijv-Pl1tccFs">
    <meta name="description" content="${escAttr(description)}">
    <meta name="keywords" content="${escAttr(keywords)}">
    <meta name="theme-color" content="#ffffff">
    <meta name="msapplication-TileColor" content="#da532c">
    <link rel="canonical" href="${escAttr(canonicalUrl)}">

    <!-- Page Title -->
    <title>${escHtml(name)} - Materials Database | PACE Technologies</title>

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
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VQ62KENYY5"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1066794256"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-VQ62KENYY5');
      gtag('config', 'AW-1066794256');
    </script>

    <!-- Open Graph Tags -->
    <meta property="og:title" content="${escAttr(name)} - Materials Database">
    <meta property="og:description" content="${escAttr(description)}">
    <meta property="og:image" content="https://www.metallographic.com/images/pace-shortlogo-white.webp">
    <meta property="og:url" content="${escAttr(canonicalUrl)}">
    <meta property="og:type" content="website">

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escAttr(name)} - Materials Database">
    <meta name="twitter:description" content="${escAttr(description)}">
    <meta name="twitter:image" content="https://www.metallographic.com/images/pace-shortlogo-white.webp">

    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${escJsonLd(name)}",
      "description": "${escJsonLd(description)}",
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
          "name": "${escJsonLd(name)}",
          "item": "${canonicalUrl}"
        }
      ]
    }
    </script>
</head>

<body>
<!-- Skip to Main Content Link -->
<a href="#main-content" class="skip-to-main">Skip to main content</a>

`;

  // --- TABS NAV (always the same) ---
  const tabsNav = `            <!-- Tabbed Content -->
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
                </div>`;

  // --- MAIN CONTENT ---
  const mainContent = `
    <!-- Main Content -->
    <main class="material-detail-page">
        <div class="container-custom">
            <!-- Breadcrumb -->
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="/materials.html">Materials Database</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${escHtml(name)}</span>
            </nav>

            <!-- Header -->
            <header class="material-header">
                <div class="material-header-content">
                    <div class="material-title-section">
                        <h1 class="material-name">${escHtml(name)}</h1>
                        <p class="material-category">${escHtml(category)}</p>
                    </div>
                </div>
            </header>

${tabsNav}

                <!-- Tab Content -->
                <div class="material-tabs-content">
                    <div id="tab-overview" class="tab-content active">
                        ${buildOverviewTab(m)}
                    </div>
                    <div id="tab-properties" class="tab-content">
                        ${buildPropertiesTab(m)}
                    </div>
                    <div id="tab-preparation" class="tab-content">
                        ${buildPreparationTab(m)}
                    </div>
                    <div id="tab-heat-treatment" class="tab-content">
                        ${buildHeatTreatmentTab(m)}
                    </div>
                    <div id="tab-standards" class="tab-content">
                        ${buildStandardsTab(m)}
                    </div>
                    <div id="tab-applications" class="tab-content">
                        ${buildApplicationsTab(m)}
                    </div>
                </div>
            </div>

            <!-- Related Guides -->
            ${buildRelatedGuides(m)}

        </div>
    </main>

`;

  return head + navHtml + '\n' + mainContent + footerAndScripts;
}

// ---------------------------------------------------------------------------
// Extract re-usable parts from the template
// ---------------------------------------------------------------------------

function extractTemplateParts(templateHtml) {
  // Extract navigation: from "<!-- Navigation -->" to "</nav>" (the closing tag of the nav element)
  // The nav section starts with "<!-- Navigation -->" and ends with "</nav>"
  const navStart = templateHtml.indexOf('<!-- Navigation -->');
  // Find the </nav> that closes the main navigation
  // The nav ends at the line "</nav>" — we need the one right before "<!-- Main Content -->"
  const mainContentMarker = templateHtml.indexOf('    <!-- Main Content -->');
  const navEnd = templateHtml.lastIndexOf('</nav>', mainContentMarker);
  const navEndFull = templateHtml.indexOf('\n', navEnd) + 1; // include the newline

  const navHtml = templateHtml.substring(navStart, navEndFull);

  // Extract footer + scripts: from "    <!-- FOOTER -->" to end of file
  const footerStart = templateHtml.indexOf('    <!-- FOOTER -->');
  const footerAndScripts = templateHtml.substring(footerStart);

  return { navHtml, footerAndScripts };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('Reading template from:', TEMPLATE_PATH);
  const templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const { navHtml, footerAndScripts } = extractTemplateParts(templateHtml);

  console.log('Reading CSV from:', CSV_PATH);
  const csvText = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(csvText);

  if (rows.length < 2) {
    console.error('CSV has no data rows.');
    process.exit(1);
  }

  const headers = rows[0];
  console.log(`CSV has ${rows.length - 1} data rows and ${headers.length} columns.`);

  // Build lookup: slug -> row object
  const slugIdx = headers.indexOf('slug');
  if (slugIdx === -1) {
    console.error('Could not find "slug" column in CSV headers.');
    process.exit(1);
  }

  const materialsBySlug = {};
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length < headers.length) continue; // skip incomplete rows
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c] || '';
    }
    if (obj.slug) {
      materialsBySlug[obj.slug] = obj;
    }
  }

  console.log(`Loaded ${Object.keys(materialsBySlug).length} materials from CSV.`);

  const created = [];

  for (const slug of TARGET_SLUGS) {
    const m = materialsBySlug[slug];
    if (!m) {
      console.warn(`WARNING: Slug "${slug}" not found in CSV. Skipping.`);
      continue;
    }

    const pageHtml = buildPage(m, navHtml, footerAndScripts);
    const outPath = path.join(OUT_DIR, `${slug}.html`);
    fs.writeFileSync(outPath, pageHtml, 'utf8');
    console.log(`  Created: materials/${slug}.html  (${(Buffer.byteLength(pageHtml, 'utf8') / 1024).toFixed(1)} KB)`);
    created.push(slug);
  }

  console.log(`\nDone. Created ${created.length} material page(s).`);
}

main();
