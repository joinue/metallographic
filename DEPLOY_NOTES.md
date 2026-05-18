# Deploy Notes — Top-Level Page Improvements

Summary of changes made in this review session, plus a checklist for post-deploy QA and Lighthouse audit.

---

## Files changed (summary by type)

### Structural fixes (broken markup)
- `contact.html`, `keeppace.html` — fixed mojibake in footer hours (`Monâ€"Fri` → `Mon–Fri`)
- `keeppace.html`, `distribution.html`, `support/brochures.html` — removed duplicate `</footer>` tags and orphan divs
- `support/procedures.html` — added missing back-to-top button + script + `</footer>` close
- `services.html` — closed unclosed `<span>`, fixed CSP (added `*.hsforms.com` for HubSpot), added class to bare `<h1>`, fixed title separator (`-` → `|`)
- `resources.html` — removed broken `/etchant-selector.html` link (page is hidden during DB reconstruction)
- `index.html`, `equipment.html`, `consumables.html` — stripped 8 production TODO comments

### URL alignment
- Site-wide find/replace: `href="/company.html"` → `href="/about.html"` (~2499 production files; both files are byte-identical and canonicalized to /about.html)
- `support/site-map.html` — updated "Company" link to /about.html
- `/company/about.html`, `/company/careers.html`, `/company/privacy.html`, `/company/terms.html`, `/company/sitemap.html` — overwritten with current canonical content (privacy + terms were serving stale v1.0 legal text)

### Content quality
- `keeppace.html` — fixed FAQ tier bug (removed reference to non-existent "Enterprise Basic/Standard/Plus/Premium" tiers; Enterprise is now correctly described as custom-quoted)
- `guides.html` — added compact intro paragraph under H1
- `careers.html` — added Benefits + How We Hire section (medical/dental/401k, phone screen → in-person + shop walkthrough; no salary disclosed)
- `support/brochures.html` — moved Dr. Zipperian handbook section to top of main content, added intro paragraph, mentioned 2027 update planned
- `support/site-map.html` — fixed all 6 stale class labels to match canonical pages, added missing pages (keeppace, docs, materials-prep, etchant-information, basics, resources hub, glossary), rewrote SEO paragraph to be PACE-specific
- `events.html` — rewrote 3 past-event template descriptions (IMAT, SEMICON West, MS&T)
- `about.html` — dropped redundant "What Sets Us Apart" subtitle; fixed Presidential E Award factual error (was implying products won the award, now correctly attributes to PACE company for export service)
- `privacy.html` — replaced template closing platitude
- Multiple pages — scrubbed AI-fluff phrases (comprehensive, industry-leading, world-class, optimal results, personalized assistance, "Discover", "Explore", "reliable repeatable", "peak performance", em-dashes in marketing copy)

### SEO meta tags
- Trimmed titles over 60 chars on 11 pages
- Trimmed descriptions over 160 chars on 14 pages
- Rewrote AI-fluff OG/Twitter descriptions across 15 pages
- Aligned title separators to `|` (was mix of `-` and `|`)

### Performance
- Lazy loading added to deep-page images on 17 pages (conservative scope — kept hero + first 1-2 screens eager)
- Extracted inline CSS to external cacheable files:
  - `css/pages/keeppace.css` (24 KB, from inline)
  - `css/pages/services.css` (10 KB, from inline)
  - `css/pages/consumables-hub.css` (7 KB, from inline)
- HTML size reductions: keeppace.html -32 KB, services.html -13 KB, consumables.html -8 KB

### LLM / AI search readiness
- `/llms.txt` — rewrote (old version referenced hidden databases and used AI-fluff opener)
- `/llms-full.txt` — new comprehensive reference with product family names, 11-class system, voice notes for AI systems

---

## Post-deploy QA checklist

### Visual smoke test (open each page in a browser)
- [ ] Homepage hero loads immediately; below-fold images load as you scroll (no blank tiles)
- [ ] `keeppace.html` looks identical to before (CSS extraction risk)
- [ ] `services.html` looks identical to before (CSS extraction + hero edit)
- [ ] `consumables.html` looks identical to before (CSS extraction)
- [ ] `careers.html` — new Benefits/Hiring section renders correctly between General Interest and Apply Form
- [ ] `support/brochures.html` — handbook section now at top, other sections still work
- [ ] `support/procedures.html` — back-to-top button works
- [ ] `contact.html`, `keeppace.html` — footer reads "Mon–Fri 8am–5pm MST" (no mojibake)

### Footer markup test
- [ ] HTML validator (validator.w3.org) on `keeppace.html`, `distribution.html`, `support/brochures.html`, `support/procedures.html` — no unclosed/duplicate tag errors

### Form test
- [ ] `services.html` — quote modal opens, HubSpot form loads (CSP fix verification)
- [ ] `quote.html` — quote form loads
- [ ] `support.html` — support form loads

### SEO sanity
- [ ] Spot-check 3-4 pages in Google's Rich Results Test (search.google.com/test/rich-results) — schema should still validate
- [ ] Check meta tag rendering with social-share preview tool (e.g. metatags.io) for index, equipment, about, quote

---

## Lighthouse audit checklist

Run Lighthouse (Chrome DevTools → Lighthouse) on these key pages **after deploy**. Mobile preset, all categories.

### Pages to test (prioritized)
1. **index.html** — homepage, most traffic, was 32 images all eager-loaded
2. **equipment.html** — main product hub
3. **consumables.html** — main product hub
4. **keeppace.html** — biggest CSS extraction (was 159 KB → 127 KB HTML)
5. **services.html** — biggest CSS extraction (was 115 KB → 102 KB HTML)
6. **support/procedures.html** — heavy page with 16 hex badges
7. **materials-prep/index.html** — strong reference baseline

### What to look for (and what we did about each)

**Performance**
- LCP (Largest Contentful Paint) — should improve on index.html due to lazy loading. Target: under 2.5s on mobile.
- FCP (First Contentful Paint) — should improve on keeppace/services/consumables due to CSS extraction.
- TBT (Total Blocking Time) — inline scripts (back-to-top, currentYear) still parse on every load; if TBT > 200ms consider deferring.
- CLS (Cumulative Layout Shift) — should be near zero (all images have width/height).

**Common Lighthouse findings to expect (and answers)**
- "Eliminate render-blocking resources" — most CSS is loaded via `preload` + `media="print"; onload="this.media='all'"` non-blocking trick. The 2-3 truly blocking files (base/styles.css, navigation.css, page-specific.css) are necessary. Consider critical-CSS inlining as a future optimization.
- "Image elements do not have explicit width and height" — should be zero. All images have dimensions.
- "Properly size images" — if flagged, the underlying webp files may be larger than displayed. Audit per-page.
- "Serve images in next-gen formats" — should be zero. Most images are webp.
- "Defer offscreen images" — should be much better now post-lazy-loading. If still flagged, those are images we kept eager (logo, hero, customer logos, first-screen content).
- "Reduce unused CSS" — likely still flagged. Each page loads multiple stylesheets; some unused selectors are normal. Tree-shaking would require a build step.

**SEO**
- "Document has a meta description" — should be 100%
- "Document has a `<title>` element" — should be 100%
- "Page has unsuccessful HTTP status code" — should be 100%
- "Links have descriptive text" — flag any "click here" / "learn more" without context

**Accessibility**
- "Image elements have `[alt]` attributes" — should be 100%
- "Buttons have an accessible name" — verify back-to-top, mobile menu, quote modal close
- "Color contrast" — anything flagged here is a real issue worth fixing

---

## Deferred / known limitations

These were identified during the review but not done:
- **Consumables image folder rename** — folders with spaces and `&` (e.g., `final polishing & analysis/`) work via URL encoding but are fragile. 347 HTML files reference these paths; rename would be a dedicated cleanup PR.
- **Cross-page design-system standardization** — 14 different hero patterns across utility pages; intentional per-page design choices. Standardization would change visuals and was deferred per user preference.
- **Service-cta-section CSS shared module** — duplicated CSS lives in 4 page-specific CSS files; each has subtle variations (margin differences). Extracting would force one canonical version and change visuals.
- **JSON-LD / structured data audit** — not authorized in this scope.
- **Content-level SEO (internal linking, keyword targeting)** — not authorized in this scope.
- **Equipment/Consumables/Resources subpages** — only top-level hubs reviewed; subpages are a separate scope.
- **IMTS 2026 event copy** — booth/staff/demo info not yet available.
- **Real image file-size audit** — webp file weights not measured.

---

## Files added in this session
- `/llms.txt` (rewrote existing)
- `/llms-full.txt`
- `/css/pages/keeppace.css`
- `/css/pages/services.css`
- `/css/pages/consumables-hub.css`
- `/DEPLOY_NOTES.md` (this file)

## Files modified (top-level pages)
- index.html, equipment.html, consumables.html, services.html, resources.html, about.html, careers.html, events.html, quote.html, privacy.html, terms.html, contact.html, keeppace.html, distribution.html, guides.html, tools.html, docs.html, glossary.html
- support/site-map.html, support/brochures.html, support/sds.html, support/procedures.html
- materials-prep/index.html
- /company/about.html, /company/careers.html, /company/privacy.html, /company/terms.html, /company/sitemap.html (overwritten to match canonical content)
- ~2499 production files (footer link `/company.html` → `/about.html`)
- css/pages/careers.css (added Benefits + Hiring Process styles)
