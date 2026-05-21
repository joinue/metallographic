# Page Templates

Pre-wired HTML scaffolds for the page types we build most. Copy a template, rename it to the destination path, then work through the `TODO:` comments.

## How to use

1. Pick the template that matches the page type (see table below).
2. Copy it to its final location (e.g. `templates/guide.html` → `guides/<slug>.html`).
3. Search the file for `TODO:` and fill each one in. The TODO comments name exactly what to swap.
4. Update the page-specific stylesheet imports in `<head>` if you picked a non-default CSS file (the comments next to each `<link>` tell you when).
5. Remove any `<!-- TODO ... -->` comments you've addressed before shipping.

The site nav, footer, quote modal, analytics, schema, and scripts are identical across every template. Only the `PAGE CONTENT` block and a small number of head fields differ.

## When to use which

| Template | Use for | Models | Default CSS |
| --- | --- | --- | --- |
| `guide.html` | Long-form articles, handbook chapters, how-to walkthroughs | Etchant detail pages, Don's handbook chapters | `pages/guide.css` |
| `product-detail.html` | Equipment or single-item consumable product pages | `metallographic-equipment/abrasive-sectioning/manual/mega-m250s.html` | `pages/machine.css` + `pages/machine-enhanced.css` |
| `hub.html` | Category landing pages with a card grid of subcategories | `consumables.html`, `equipment.html` | `pages/consumables-hub.css` |
| `form.html` | Utility pages built around a HubSpot form | `taxexempt.html`, `customerservice.html` | `pages/taxexempt.css` |
| `legal.html` | Terms, privacy, and other multi-section legal docs | `terms.html`, `privacy.html` | `pages/legal.css` |

## Conventions baked into the templates

- **House style:** "Additional Reading" not "References" (guide template). Avoid em dashes in body copy across all templates.
- **H1 rule:** H1s confirm the page category, not differentiate. Marketing copy goes in the subtitle / hero blurb (`hub.html`).
- **Brand patterns:** Reuse existing classes (`btn-modern-*`, `btn-cta-*`, `features-*`, `service-cta-section`). Don't recreate them as inline styles.
- **Shop CTAs:** All `shop.metallographic.com` links use `target="_blank" rel="noopener noreferrer"`.
- **HubSpot forms:** Quote form (`5c2cc19c-...`) works with the new `hs-form-frame` embed. Support form (`b129cffb-...`) requires the v2 `hbspt.forms.create()` embed. The form template ships with v2 because it works for both.
- **CSS loading:** Templates use the `media="print" onload="..."` swap pattern from `template.html` to defer non-critical CSS, with a `<noscript>` fallback. Don't change this unless you know why.
- **Schema:** Each template ships with the right `@type` for its page (Article, Product, CollectionPage, ContactPage, WebPage). Update the fields; don't change the type unless the page genuinely is something else.

## What's not in scope

- These are page-level scaffolds. Re-usable section blocks (e.g. "service CTA band", "trust strip") aren't templated separately; copy them from a live page when you need one.
- The root `template.html` is still the blank/minimal page template. Leave it alone unless you're updating the site shell that all templates inherit from.

## If the shell changes

Nav, footer, quote modal, analytics, and scripts are duplicated across every page on the site, including these templates. When you update the shell, update all six files (`template.html` + the five templates here) in the same commit so future copies stay current.
