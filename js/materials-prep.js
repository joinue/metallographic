/* ============================================================
   Materials Prep landing page
   Lightweight click-tracking for outbound CTAs.

   Fires a GA4 `materials_prep_cta_click` event with the button
   location as a property. The site already loads gtag globally,
   so we just push events here.
   ============================================================ */
(function () {
  'use strict';

  // Find every element flagged with data-mp-cta. The attribute value
  // is the location label we want recorded against the click.
  var ctas = document.querySelectorAll('[data-mp-cta]');
  if (!ctas.length) return;

  function track(location, href) {
    // Use gtag if it loaded; fall back to dataLayer push so the event
    // is still captured if gtag init was deferred or blocked.
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'materials_prep_cta_click', {
          cta_location: location,
          destination: href
        });
      } else if (window.dataLayer && typeof window.dataLayer.push === 'function') {
        window.dataLayer.push({
          event: 'materials_prep_cta_click',
          cta_location: location,
          destination: href
        });
      }
    } catch (_e) {
      // Analytics must never break navigation. Swallow and move on.
    }
  }

  ctas.forEach(function (el) {
    el.addEventListener('click', function () {
      // Read location at click time so swapping attributes still works.
      var location = el.getAttribute('data-mp-cta') || 'unknown';
      var href = el.getAttribute('href') || '';
      track(location, href);
    }, { passive: true });
  });
})();
