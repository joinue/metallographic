// Sticky Section Navigation - Active Link Highlighting & Dynamic Positioning
(function() {
  'use strict';

  // Get all section anchors and nav links
  const sectionAnchors = document.querySelectorAll('.section-anchor');
  const navLinks = document.querySelectorAll('.section-nav-link');
  const stickyNav = document.querySelector('.section-nav-sticky');
  const mainNav = document.querySelector('.navigation');

  if (sectionAnchors.length === 0 || navLinks.length === 0 || !stickyNav) {
    return; // Exit if no sections or nav links found
  }

  // Function to get current nav height dynamically
  function getNavHeight() {
    if (!mainNav) return 100;
    
    // Get actual computed height of the navigation
    const navRect = mainNav.getBoundingClientRect();
    return navRect.height;
  }

  // Function to update sticky nav position based on main nav state
  function updateStickyNavPosition() {
    if (!mainNav) return;
    
    const navHeight = getNavHeight();
    stickyNav.style.top = `${navHeight}px`;
  }

  // Function to find the actual section element for an anchor
  function findSectionElement(anchor) {
    // The anchor is positioned -100px above, so find the next sibling section
    let element = anchor.nextElementSibling;
    
    // Look for product-series or section class
    while (element) {
      if (element.classList && (
        element.classList.contains('product-series') || 
        element.classList.contains('section') ||
        element.tagName === 'SECTION'
      )) {
        return element;
      }
      element = element.nextElementSibling;
    }
    
    // Fallback: return null if no section found
    return null;
  }

  // Function to update active nav link
  // Uses "closest center" algorithm: whichever visible section's center is
  // nearest to the viewport's target line wins. This handles small sections
  // correctly — they activate as soon as they're the most prominent content
  // on screen, rather than waiting for a fixed point to enter their bounds.
  function updateActiveNavLink() {
    const navHeight = getNavHeight();
    const stickyNavHeight = stickyNav ? stickyNav.getBoundingClientRect().height : 0;
    const scrollPosition = window.scrollY;
    const topOffset = navHeight + stickyNavHeight;
    // Target line at ~45% of the visible content area (slightly above center)
    const targetY = topOffset + (window.innerHeight - topOffset) * 0.45;

    let activeSectionId = null;
    let closestDistance = Infinity;

    sectionAnchors.forEach((anchor) => {
      const targetId = anchor.getAttribute('id');
      if (!targetId) return;

      const sectionElement = findSectionElement(anchor);
      let sectionTop, sectionHeight;

      if (sectionElement) {
        sectionTop = sectionElement.offsetTop;
        sectionHeight = sectionElement.offsetHeight;
      } else {
        sectionTop = anchor.offsetTop;
        sectionHeight = 800;
        let nextAnchor = anchor;
        while (nextAnchor.nextElementSibling) {
          nextAnchor = nextAnchor.nextElementSibling;
          if (nextAnchor.classList && nextAnchor.classList.contains('section-anchor')) {
            sectionHeight = nextAnchor.offsetTop - sectionTop;
            break;
          }
        }
      }

      const sectionBottom = sectionTop + sectionHeight;

      // Section's position relative to viewport
      const screenTop = sectionTop - scrollPosition;
      const screenBottom = sectionBottom - scrollPosition;
      const screenCenter = (screenTop + screenBottom) / 2;

      // Only consider sections at least partially visible below the nav
      if (screenBottom > topOffset && screenTop < window.innerHeight) {
        const distance = Math.abs(screenCenter - targetY);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeSectionId = targetId;
        }
      }
    });

    // Update active state on nav links
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkId = href ? href.slice(1) : null;
      const isActive = linkId === activeSectionId;

      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'location' : null);
    });
  }

  // Watch for navigation state changes
  if (mainNav) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateStickyNavPosition();
        }
      });
    });
    
    observer.observe(mainNav, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // Update on scroll
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateActiveNavLink();
        updateStickyNavPosition();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Update on page load
  updateActiveNavLink();
  updateStickyNavPosition();

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = getNavHeight();
          const stickyNavHeight = stickyNav.getBoundingClientRect().height || 50;
          // Anchor divs are positioned -100px above, so we need less offset
          const offset = navHeight + stickyNavHeight + 20; // Account for both navs + small padding
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
})();

