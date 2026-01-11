# Guide Page Conversion Instructions

This document provides step-by-step instructions for converting guide pages from `materialographic` (Next.js/React) to `metallographic.com` (static HTML/JS).

## Overview

The process involves:
1. Reading the source `.tsx` file from `materialographic/app/guides/[guide-slug]/page.tsx`
2. Copying the template from `guides/guides-template.html`
3. Updating metadata, schema, and SEO elements
4. Converting React components to HTML
5. Adding side navigation
6. Updating CTA and related guides sections
7. Adding internal links and images where appropriate

## Step-by-Step Process

### 1. Initial Setup

```bash
# Copy the template
cp guides/guides-template.html guides/[guide-slug].html

# Read the source file
read_file materialographic/app/guides/[guide-slug]/page.tsx
```

### 2. Update Head Section

#### Meta Tags
- **Description**: Extract from source or create SEO-friendly description
- **Keywords**: Include relevant keywords for the guide topic
- **Canonical URL**: `https://www.metallographic.com/guides/[guide-slug].html`
- **Title**: `[Guide Title] | PACE Technologies`

#### Open Graph Tags
- Update `og:title`, `og:description`, `og:url` to match the guide
- Keep `og:image` as the default logo

#### Twitter Card Tags
- Update `twitter:title` and `twitter:description`

#### Schema Markup
- **Article Schema**: Update `headline` and `description`
- **BreadcrumbList Schema**: Update the third `itemListElement` with guide name and URL

### 3. Update Body Section

#### Breadcrumb
```html
<nav class="guide-breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a> / <a href="/guides.html">Guides</a> / [Guide Title]
</nav>
```

#### Header
```html
<header class="guide-header">
    <span class="guide-category">Basics Guide</span> <!-- or "Process Guide" -->
    <h1>[Guide Title]</h1>
    <p class="guide-description">
        [Description from source]
    </p>
</header>
```

#### Table of Contents (Mobile/Tablet)
- Extract section IDs and labels from the source `sections` array
- Create `<ul>` with links to each section

### 4. Add Side Navigation

The side navigation HTML should already be in the template. Ensure it's present:

```html
<!-- Toggle Tab -->
<button id="guide-nav-toggle" class="guide-nav-toggle" ...>
  <svg class="guide-nav-toggle-icon" ...>
    <path class="guide-nav-toggle-arrow" d="M9 18l6-6-6-6"/>
  </svg>
</button>

<!-- Overlay -->
<div id="guide-nav-overlay" class="guide-nav-overlay" aria-hidden="true"></div>

<!-- Navigation -->
<nav id="guide-side-nav" class="guide-side-nav" aria-label="Table of contents">
  <div class="guide-side-nav-inner">
    <div class="guide-side-nav-content">
      <div class="guide-side-nav-header">
        <h2 class="guide-side-nav-title">Navigation</h2>
        <div class="guide-side-nav-progress-wrapper">
          <div class="guide-side-nav-progress-track">
            <div id="guide-nav-progress" class="guide-side-nav-progress-bar" ...></div>
          </div>
        </div>
      </div>
      <nav aria-label="Page sections" style="background: white;">
        <ol class="guide-nav-list" role="list">
          <!-- Nav items populated by JS -->
        </ol>
      </nav>
    </div>
  </div>
</nav>
```

**Important**: The `guide-nav.js` script will automatically populate the navigation list based on sections with IDs.

### 5. Convert Content Sections

#### Section Structure
Each section should have:
```html
<section id="[section-id]" class="guide-section">
    <h2>[Section Title]</h2>
    <!-- Content -->
</section>
```

#### React to HTML Conversions

**Info Boxes:**
```jsx
// React
<div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
```

```html
<!-- HTML -->
<div class="guide-info-box guide-info-box-blue">
```

Available classes:
- `guide-info-box-blue` (blue background)
- `guide-info-box-primary` (primary color background)
- `guide-info-box` (gray background)
- For red warnings: `style="background: #fef2f2; border-left-color: #dc2626;"`
- For yellow warnings: `style="background: #fefce8; border-left-color: #ca8a04;"`

**Links:**
```jsx
// React
<Link href="/guides/sectioning">Sectioning</Link>
```

```html
<!-- HTML -->
<a href="/guides/sectioning.html" class="guide-link">Sectioning</a>
```

**Important**: 
- Use relative paths for internal links (e.g., `/guides/sectioning.html` not `https://metallographic.com/...`)
- Remove `target="_blank"` for internal links
- Keep `target="_blank" rel="noopener noreferrer"` for external links to `metallography.org` (if needed)

**Images:**
```jsx
// React
<Image src="/images/..." alt="..." width={300} height={225} />
```

```html
<!-- HTML -->
<img src="/images/..." alt="..." loading="lazy" class="guide-image">
```

**Tables:**
```jsx
// React
<table className="min-w-full border-collapse border border-gray-300">
```

```html
<!-- HTML -->
<div class="guide-table-wrapper">
    <table class="guide-table">
        <!-- table content -->
    </table>
</div>
```

**Lists:**
- Convert `<ul className="space-y-2">` to `<ul>` (spacing handled by CSS)
- Convert `<ol>` similarly
- Nested lists: Use `style="margin-left: 1.5rem; margin-top: 0.5rem;"` for nested `<ul>` or `<ol>`

**Equipment Cards (if applicable):**
```jsx
// React
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-gray-50 p-4 rounded-lg">
    <Image ... />
    <h4>...</h4>
    <p>...</p>
  </div>
</div>
```

```html
<!-- HTML -->
<div class="guide-phases-grid">
  <div class="guide-phase-card">
    <div class="guide-phase-image">
      <a href="/metallographic-equipment/..." class="guide-link">
        <img src="/images/equipment/..." alt="..." loading="lazy">
      </a>
    </div>
    <h4>...</h4>
    <p>...</p>
  </div>
</div>
```

**Important for Equipment Links:**
- Use relative paths: `/metallographic-equipment/...` not `https://metallographic.com/...`
- Remove `target="_blank"` for internal equipment links
- Verify image paths exist (check with `glob_file_search` or `run_terminal_cmd`)
- Common image path issues:
  - Spaces in directory names (e.g., `metallurgical microscopes` vs `metallurgical`)
  - Wrong model numbers (e.g., `pico-200` vs `pico-200a`)
  - Missing cover images (check actual file names)

### 6. Add Internal Links

Look for opportunities to link to:
- **Consumables pages**: `/metallographic-consumables/[category].html`
  - `grinding.html`, `polishing.html`, `mounting.html`, `sectioning.html`, `cleaning.html`, `final-polishing.html`, `etching.html`, `hardness-testing.html`
- **Support pages**: `/support/[page].html`
  - `sds.html`, `etchant-information.html`, `procedures.html`, `brochures.html`, `products.html`
- **Equipment pages**: `/metallographic-equipment/[category].html`
- **Other guides**: `/guides/[guide-slug].html`
- **Lab Builder**: `/build.html`
- **Contact/Quote**: `/contact.html`, `/quote.html`

### 7. Update CTA Section

```html
<div class="guide-cta">
    <h2>[CTA Title]</h2>
    <p>[CTA Description]</p>
    <div class="guide-cta-buttons">
        <a href="[primary-link]" class="btn-primary">[Primary CTA]</a>
        <a href="[secondary-link]" class="btn-secondary">[Secondary CTA]</a>
        <a href="/guides.html" class="btn-secondary">Browse All Guides</a>
    </div>
</div>
```

### 8. Update Related Guides Section

```html
<div class="guide-related">
    <h2>Related Guides</h2>
    <div class="guide-related-links">
        <a href="/guides/[guide-slug].html" class="guide-link">→ [Guide Title]</a>
        <!-- More related guides -->
    </div>
</div>
```

### 9. Footer and Scripts

**Important**: Include the footer HTML directly from `footer.html` (not via SSI). Copy the entire content of `footer.html` and paste it after `</main>`:

```html
    </main>

<!-- FOOTER -->
<footer class="footer" aria-label="Footer">
  <!-- Footer Content in Glassmorphic Container - Full Width -->
  <div class="footer-container">
    <!-- ... full footer content from footer.html ... -->
  </div>
  
  <script>
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  </script>
</footer>

    <!-- Scripts -->
    <script src="/js/scripts.js"></script>
    <script src="/js/guides.js"></script>
    <script src="/js/guide-nav.js"></script>
</body>
</html>
```

**Note**: 
- Do NOT use SSI (`<!--#include virtual="/footer.html" -->`)
- Do NOT include any legacy/old footer code
- Always use the footer from `footer.html` directly

The `guide-nav.js` script will:
- Automatically detect sections with IDs
- Populate the side navigation
- Track scroll progress
- Highlight active sections
- Handle smooth scrolling

### 10. Common Issues and Fixes

#### Side Navigation Not Working
- **Check**: Ensure all sections have unique IDs matching the TOC
- **Check**: Verify `guide-nav.js` is loaded
- **Check**: Ensure side nav HTML elements exist (toggle, overlay, nav container)
- **Fix**: The script checks for existing elements and populates them, so don't duplicate HTML

#### Images Not Showing
- **Check**: Verify image paths exist using `glob_file_search` or `run_terminal_cmd`
- **Common issues**:
  - Spaces in directory names (e.g., `metallurgical microscopes` should be `metallurgical`)
  - Wrong model numbers
  - Missing `-cover.webp` suffix
- **Fix**: Use correct paths from actual file system

#### Links Redirecting with Query Parameters
- **Issue**: Links like `https://metallographic.com/...` redirect with `?_gl=...`
- **Fix**: Always use relative paths like `/metallographic-equipment/...`

#### Missing Images on Equipment Cards
- **Check**: Verify image paths exist
- **Common missing images**:
  - Table feed precision cutters: Use `pico-200a-cover.webp` not `pico-200-cover.webp`
  - UV curing system: Use `terauv-cover.webp` not `uvmount-cover.webp`
  - Vacuum mounting: Use `teraVAC-cover.webp` not `lssa-011-cover.webp`
  - Metallurgical microscopes: Use `metallurgical/im-5000/` not `metallurgical microscopes/`
  - Stereo microscopes: Use `stereo/vm-500/` not `stereo microscopes/`

#### Wrong Equipment Links
- **Check**: Verify actual page paths exist
- **Common fixes**:
  - Manual abrasive cutters: `/metallographic-equipment/abrasive-sectioning/manual.html` not `manual-abrasive-cutters.html`
  - Other equipment: Verify paths match actual file structure

## File Structure Reference

### Template File
- `guides/guides-template.html` - Base template with navigation, footer, side nav structure

### Source Files
- `materialographic/app/guides/[guide-slug]/page.tsx` - React source file

### Output Files
- `guides/[guide-slug].html` - Final HTML file

### Supporting Files
- `js/guide-nav.js` - Side navigation functionality
- `js/guides.js` - Guides page functionality
- `css/pages/guide.css` - Guide page styling
- `css/pages/guides.css` - Guides listing page styling

## Process Guides Checklist

When converting process guides (Sectioning, Mounting, Grinding Techniques, Polishing Methods, etc.):

- [ ] Copy template file
- [ ] Update all meta tags (description, keywords, canonical, title)
- [ ] Update Open Graph tags
- [ ] Update Twitter Card tags
- [ ] Update Article schema markup
- [ ] Update BreadcrumbList schema markup
- [ ] Update breadcrumb navigation
- [ ] Update header (title and description)
- [ ] Update mobile/tablet TOC
- [ ] Verify side navigation HTML is present
- [ ] Convert all content sections
- [ ] Convert all React components to HTML
- [ ] Add internal links to consumables, support pages, equipment pages
- [ ] Verify all image paths are correct
- [ ] Update CTA section
- [ ] Update related guides section
- [ ] Verify scripts are included
- [ ] Check for linter errors
- [ ] Test side navigation functionality

## Quick Reference: Common Conversions

### React → HTML

| React | HTML |
|------|------|
| `className="..."` | `class="..."` |
| `<Link href="...">` | `<a href="..." class="guide-link">` |
| `<Image src="..." />` | `<img src="..." loading="lazy">` |
| `bg-blue-50 border-l-4 border-blue-600` | `guide-info-box guide-info-box-blue` |
| `bg-primary-50 border-l-4 border-primary-600` | `guide-info-box guide-info-box-primary` |
| `bg-red-50 border-l-4 border-red-600` | `style="background: #fef2f2; border-left-color: #dc2626;"` |
| `bg-yellow-50 border-l-4 border-yellow-600` | `style="background: #fefce8; border-left-color: #ca8a04;"` |
| `prose prose-lg` | (remove, handled by CSS) |
| `scroll-mt-24` | (remove, handled by CSS) |

### Internal Link Patterns

- Guides: `/guides/[guide-slug].html`
- Consumables: `/metallographic-consumables/[category].html`
- Support: `/support/[page].html`
- Equipment: `/metallographic-equipment/[category]/[subcategory].html`
- Lab Builder: `/build.html`
- Contact: `/contact.html`
- Quote: `/quote.html`

### External Links

- Keep `target="_blank" rel="noopener noreferrer"` for `metallography.org` links
- Remove for all internal links

## Notes

### Content Source Strategy

**Key Principle**: Take all content (text, structure, sections) from `materialographic` guides, but replace links and images with local `metallographic.com` versions whenever they exist.

- **Content**: Copy all text, sections, and structure from the source `.tsx` file in `materialographic/app/guides/[guide-slug]/page.tsx`
- **Links**: 
  - **If local page exists**: Use local path (e.g., `/guides/sectioning.html`, `/metallographic-equipment/...`)
  - **If local page doesn't exist**: May need to use external link to `metallography.org` with `target="_blank" rel="noopener noreferrer"` (rare)
  - **Always prefer local**: Check if a local equivalent exists before using external links
- **Images**: 
  - **If local image exists**: Use local path (e.g., `/images/equipment/...`)
  - **If local image doesn't exist**: May need to use external (e.g., `https://metallography.org/images/...`) or find alternative
  - **Always verify**: Check that image paths actually exist in the local project using `glob_file_search` or `run_terminal_cmd`

### General Notes

- Always use relative paths for internal links to avoid redirect issues
- The side navigation script (`guide-nav.js`) automatically handles section detection and navigation
- Check image paths carefully - directory names may have spaces or different structures
- Add internal links throughout content for better SEO and user experience
- Verify equipment links match actual page structure
- Test side navigation after conversion to ensure it works correctly
- When in doubt about whether a local page/image exists, use `glob_file_search` or `run_terminal_cmd` to verify

