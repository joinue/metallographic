# Equipment Page Conversion Guide

## Overview
This guide explains how to convert old equipment-specific pages to match the modern MEGA template structure. The new template provides consistent styling, better layout, and improved user experience.

## Key Differences: Old vs New Template

### Old Template Structure
- Uses `<header class="top-header">` section (MUST BE REMOVED)
- Uses `<section class="introduction">` with `<h2 class="equipment-header">`
- Uses `<section class="carousel-features">` combining carousel and features
- Uses `<div class="features">` with `<h3>` and `<ul>`
- Uses simple `<section class="specifications">` with `<h3>` headings
- Uses `<section class="related-products">` with basic `<ul>` lists
- No container wrappers
- Basic table styling
- Simple list-based consumables section
- Missing `carousel.js` script

### New Template Structure
- **NO header section** - removed entirely
- Uses `<main id="main-content" class="equipment-main-content">` wrapper
- Uses `product-detail-grid` with `product-image-section` and `product-details-section`
- Uses `product-cta-buttons` with modern button styling
- Uses `product-features` with `features-heading` and `features-list`
- Uses `<section class="specifications-section">` with modern styling
- Uses `<section class="related-consumables-section">` with grid layout
- Includes `container-custom` wrappers for proper spacing
- Uses `specifications-table-wrapper` for enhanced table styling
- Includes image and link grid for consumables
- Includes `carousel.js` script for carousel functionality

## Step-by-Step Conversion Process

### Step 0: Remove Header Section and Update Main Structure

#### CRITICAL: Remove the Header Section
The old template includes a `<header class="top-header">` section that MUST be completely removed:

```html
<!-- REMOVE THIS ENTIRE SECTION -->
<!-- HEADER -->
<header class="top-header">
    <div class="top-header-content">
        <div class="top-header-inner">
            <h1 class="page-title">Equipment Name - MODEL</h1>
            <div class="text-content"></div>
        </div>
    </div>
</header>
```

#### Update Main Element
Change the main element to include the proper ID and class:

**Old:**
```html
<main>
    <div class="first-container">
        <!-- Introduction Section -->
        <section class="introduction">
            <h2 class="equipment-header">Equipment Name</h2>
            <p>Description...</p>
            <div class="feature-buttons-top">
                <a href="#features" class="feature-button-top">Features</a>
                <!-- more buttons -->
            </div>
        </section>

        <!-- Carousel and Features Section -->
        <section class="carousel-features" id="features">
            <!-- Carousel -->
            <div class="carousel">
                <!-- carousel content -->
            </div>

            <!-- Features Section -->
            <div class="features">
                <h3>Features</h3>
                <ul>
                    <li><strong>Feature:</strong> Description</li>
                </ul>
                <br>
                <div class="feature-buttons">
                    <a href="..." class="feature-button">Brochure</a>
                    <!-- more buttons -->
                </div>
            </div>
        </section>
    </div>
</main>
```

**New:**
```html
<!-- MAIN -->
<main id="main-content" class="equipment-main-content">
<div class="first-container">
  <div class="container-custom">
    <!-- Product Grid: Images Left, Details Right -->
    <div class="product-detail-grid">
      <!-- Image Gallery Section -->
      <div class="product-image-section">
        <div class="carousel" aria-label="Product Images and Video">
            <div class="carousel-container">
                <button class="carousel-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
                <div class="carousel-content">
                    <div class="carousel-item" data-description="Description">
                        <img src="/images/equipment/..." alt="Image description">
                    </div>
                    <!-- more carousel items -->
                </div>
                <button class="carousel-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="carousel-description">
                <p></p>
            </div>
        </div>

        <!-- CTA Buttons -->
        <div class="product-cta-buttons">
          <a href="/quote.html" class="btn-modern btn-modern-primary">Request Quote</a>
          <a href="/content/brochures/..." class="btn-modern btn-modern-secondary" target="_blank" rel="noopener noreferrer">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Brochure
          </a>
          <a href="..." class="btn-modern btn-modern-secondary" target="_blank" rel="noopener noreferrer">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Demo Video
          </a>
        </div>
      </div>

      <!-- Product Details Section -->
      <div class="product-details-section">
        <h1 class="product-title">Equipment Name</h1>
        <p class="product-item-id">Item ID: MODEL</p>
        <div class="product-description">
          <p>Description text...</p>
        </div>

        <!-- Features List -->
        <div class="product-features">
          <h3 class="features-heading">Features</h3>
          <ul class="features-list">
            <li>Feature: Description (remove <strong> tags, use colon format)</li>
            <!-- more features -->
          </ul>
        </div>
      </div>
    </div>
  </div>
```

#### Key Changes for Top Section:
1. **Remove** entire `<header class="top-header">` section
2. **Add** `id="main-content" class="equipment-main-content"` to `<main>` tag
3. **Add** `container-custom` wrapper inside `first-container`
4. **Replace** `introduction` section with `product-detail-grid` structure
5. **Replace** `carousel-features` section with `product-image-section` and `product-details-section`
6. **Move** carousel into `product-image-section`
7. **Add** `product-cta-buttons` after carousel (inside `product-image-section`)
8. **Convert** features from `<div class="features">` to `<div class="product-features">`
9. **Change** feature list format: remove `<strong>` tags, use colon format (e.g., "Feature: Description")
10. **Update** buttons to use `btn-modern` classes with SVG icons
11. **Add** "Request Quote" button as primary CTA

### Step 1: Add Carousel Script

**CRITICAL:** Add the carousel.js script before the closing `</body>` tag:

```html
<script src="/js/scripts.js" defer></script>
<script src="/js/carousel.js" defer></script>
<script src="/js/animations.js" defer></script>
```

Without this script, the carousel will not work!

### Step 2: Update Technical Specifications Section

#### Old Structure:
```html
<section class="specifications" id="product-specifications">
  <h3>Technical Specifications - PRODUCT-NAME</h3>
  <table>
    <tr>
      <th>Parameter</th>
      <th>Specification</th>
    </tr>
    <!-- table rows -->
  </table>
</section>
```

#### New Structure:
```html
<!-- Technical Specifications Section for PRODUCT-NAME -->
<section class="specifications-section" id="product-specifications">
  <div class="container-custom">
    <h2 class="section-header-modern">Technical Specifications</h2>
    <div class="specifications-table-wrapper">
      <table>
        <tr>
          <th>Parameter</th>
          <th>Specification</th>
        </tr>
        <!-- table rows -->
      </table>
    </div>
  </div>
</section>
```

#### Changes Required:
1. Change `class="specifications"` to `class="specifications-section"`
2. Add `container-custom` wrapper div
3. Change `<h3>` to `<h2 class="section-header-modern">`
4. Remove product name from heading (just use "Technical Specifications")
5. Wrap table in `<div class="specifications-table-wrapper">`
6. Update indentation to match (use 2 spaces for consistency)

### Step 2: Update Related Consumables Section

#### Old Structure:
```html
<!-- Related Products Section -->
<section class="related-products" id="product-consumables">
  <h3>Related Consumables</h3>
  <ul>
    <li><a href="..." target="_blank" rel="noopener noreferrer">Link Text</a></li>
    <!-- more links -->
  </ul>
  <br>
</section>
```

#### New Structure:
```html
<!-- Related Consumables Section -->
<section class="related-consumables-section" id="product-consumables">
  <div class="container-custom">
    <h2 class="section-header-modern">Related Consumables</h2>
    <div class="related-consumables-grid">
      <div class="consumables-image-wrapper">
        <img src="/images/consumables/sectioning/sectioning-cover.webp" alt="Equipment Consumables" loading="lazy">
      </div>
      <div class="consumables-links">
        <a href="..." class="consumable-link" target="_blank" rel="noopener noreferrer">
          <span>Link Text</span>
          <svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <!-- more links -->
        <a href="/metallographic-consumables/[category]/[page].html" class="consumable-link">
          <span>Consumables Guide</span>
          <svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

#### Changes Required:
1. Change `class="related-products"` to `class="related-consumables-section"`
2. Add `container-custom` wrapper div
3. Change `<h3>` to `<h2 class="section-header-modern">`
4. Replace `<ul>` list with `related-consumables-grid` structure
5. Add `consumables-image-wrapper` with appropriate image
6. Convert list items to `consumable-link` anchor tags with SVG icons
7. Wrap link text in `<span>` tags
8. Add "Consumables Guide" link (internal, no target="_blank")
9. Remove the trailing `<br>` tag

### Step 3: Image Selection for Consumables Section

**CRITICAL:** Use the correct image path for each equipment category:

- **Sectioning Equipment**: `/images/consumables/sectioning/sectioning-cover.webp`
- **Compression Mounting Equipment**: `/images/consumables/mounting/compression mounting/compression-mounting-cover.webp`
  - **NOTE:** The path includes "compression mounting" (with space) not "mounting-cover.webp"
- **Castable Mounting Equipment**: `/images/consumables/mounting/castable mounting/castable-mounting-cover.webp` (if available)
- **Grinding/Polishing**: `/images/consumables/grinding/grinding-cover.webp`
- **Precision Wafering**: `/images/consumables/sectioning/sectioning-cover.webp` (or specific precision image if available)

**Common Mistake:** Do NOT use `/images/consumables/mounting/mounting-cover.webp` - this file does not exist. Use the full path with the subdirectory.

### Step 4: Consumables Guide Link

Add a link to the relevant consumables guide page:
- Format: `/metallographic-consumables/[category]/[page].html`
- Examples:
  - Abrasive Sectioning: `/metallographic-consumables/sectioning/abrasive-cutting.html`
  - Precision Wafering: `/metallographic-consumables/sectioning/precision-wafering.html`
  - Compression Mounting: `/metallographic-consumables/mounting/compression-mounting.html`

### Step 5: Verify Structure

Ensure the sections are positioned correctly:
- Both sections should be **outside** the `product-detail-grid` div
- Both sections should be **outside** the `container-custom` div (but still inside `first-container`)
- Both sections should be **inside** the `first-container` div
- Sections should come **after** the closing `</div>` tags for `container-custom` and `product-detail-grid`
- The `main` element must have `id="main-content" class="equipment-main-content"` for proper CSS spacing

#### Correct Placement:
```html
<div class="first-container">
  <div class="container-custom">
    <div class="product-detail-grid">
      <!-- Product images and details -->
    </div>
  </div>
  
  <!-- Technical Specifications Section -->
  <section class="specifications-section">
    <!-- ... -->
  </section>

  <!-- Related Consumables Section -->
  <section class="related-consumables-section">
    <!-- ... -->
  </section>
</div>
```

## Complete Example: Before and After

### Before (Old Template):
```html
  </div>
</div>
  
  <section class="specifications" id="product-specifications">
    <h3>Technical Specifications - PRODUCT-NAME</h3>
    <table>
      <tr>
        <th>Parameter</th>
        <th>Specification</th>
      </tr>
      <tr>
        <td>Parameter Name</td>
        <td>Value</td>
      </tr>
    </table>
  </section>
  
  <section class="related-products" id="product-consumables">
    <h3>Related Consumables</h3>
    <ul>
      <li><a href="https://shop.metallographic.com/..." target="_blank" rel="noopener noreferrer">Product Link</a></li>
    </ul>
    <br>
  </section>
</div>
```

### After (New Template):
```html
  </div>
</div>

  <!-- Technical Specifications Section for PRODUCT-NAME -->
  <section class="specifications-section" id="product-specifications">
    <div class="container-custom">
      <h2 class="section-header-modern">Technical Specifications</h2>
      <div class="specifications-table-wrapper">
        <table>
          <tr>
            <th>Parameter</th>
            <th>Specification</th>
          </tr>
          <tr>
            <td>Parameter Name</td>
            <td>Value</td>
          </tr>
        </table>
      </div>
    </div>
  </section>

  <!-- Related Consumables Section -->
  <section class="related-consumables-section" id="product-consumables">
    <div class="container-custom">
      <h2 class="section-header-modern">Related Consumables</h2>
      <div class="related-consumables-grid">
        <div class="consumables-image-wrapper">
          <img src="/images/consumables/sectioning/sectioning-cover.webp" alt="Equipment Consumables" loading="lazy">
        </div>
        <div class="consumables-links">
          <a href="https://shop.metallographic.com/..." class="consumable-link" target="_blank" rel="noopener noreferrer">
            <span>Product Link</span>
            <svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <a href="/metallographic-consumables/[category]/[page].html" class="consumable-link">
            <span>Consumables Guide</span>
            <svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</div>
```

## Checklist

When converting a page, ensure you've:

### Top Section (CRITICAL - Do First):
- [ ] **Removed** entire `<header class="top-header">` section
- [ ] **Added** `id="main-content" class="equipment-main-content"` to `<main>` tag
- [ ] **Removed** `<section class="introduction">` section
- [ ] **Removed** `<section class="carousel-features">` section
- [ ] **Added** `container-custom` wrapper inside `first-container`
- [ ] **Added** `product-detail-grid` structure
- [ ] **Moved** carousel into `product-image-section`
- [ ] **Added** `product-cta-buttons` with modern button styling
- [ ] **Converted** features to `product-features` structure
- [ ] **Updated** feature format (removed `<strong>`, use colon format)
- [ ] **Added** "Request Quote" button as primary CTA
- [ ] **Added** `carousel.js` script before closing `</body>` tag

### Specifications Section:
- [ ] Changed `specifications` to `specifications-section`
- [ ] Added `container-custom` wrapper
- [ ] Changed `<h3>` to `<h2 class="section-header-modern">`
- [ ] Removed product name from specifications heading
- [ ] Wrapped table in `specifications-table-wrapper`

### Consumables Section:
- [ ] Changed `related-products` to `related-consumables-section`
- [ ] Added `container-custom` wrapper
- [ ] Changed `<h3>` to `<h2 class="section-header-modern">`
- [ ] Replaced `<ul>` list with `related-consumables-grid`
- [ ] Added `consumables-image-wrapper` with **CORRECT** image path
- [ ] Converted list items to `consumable-link` format with SVG icons
- [ ] Added "Consumables Guide" link
- [ ] Removed trailing `<br>` tags

### Final Verification:
- [ ] Verified sections are outside `product-detail-grid` and `container-custom` but inside `first-container`
- [ ] Checked indentation (2 spaces for consistency)
- [ ] Verified all links are correct
- [ ] Verified consumables image path is correct (especially for mounting equipment)
- [ ] Tested carousel functionality works
- [ ] Tested page renders correctly with proper header spacing
- [ ] Hard refresh browser to clear cache and verify changes

## Reference Files

- **Modern Template Example**: `/metallographic-equipment/abrasive-sectioning/manual/mega-t350s.html`
- **Converted Example**: `/metallographic-equipment/precision-wafering/pico-155p.html`
- **CSS File**: `/css/pages/machine.css` (contains `.specifications-section` and `.related-consumables-section` styles)

## Common Issues and Solutions

### Issue: Content hidden behind navigation
**Solution:** Ensure `<main>` has `id="main-content" class="equipment-main-content"`. The CSS automatically adds `padding-top: 180px` for desktop and mobile to account for the fixed navigation header.

### Issue: Carousel doesn't work
**Solution:** Make sure `carousel.js` script is included before closing `</body>` tag:
```html
<script src="/js/carousel.js" defer></script>
```

### Issue: Wrong consumables image displayed
**Solution:** For compression mounting equipment, use:
```html
<img src="/images/consumables/mounting/compression mounting/compression-mounting-cover.webp" ...>
```
NOT `/images/consumables/mounting/mounting-cover.webp` (this file doesn't exist).

### Issue: Old layout still showing after changes
**Solution:** Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R) to clear cached CSS.

## Notes

- The new template provides better visual hierarchy and consistency
- The grid layout for consumables is more visually appealing
- External link icons help users understand which links open in new tabs
- The consumables guide link provides additional context for users
- All styling is handled by existing CSS classes - no inline styles needed
- The `equipment-main-content` class is critical for proper header spacing
- Always test carousel functionality after conversion

