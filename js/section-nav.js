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
  function updateActiveNavLink() {
    const navHeight = getNavHeight();
    const stickyNavHeight = stickyNav ? stickyNav.getBoundingClientRect().height : 0;
    const scrollPosition = window.scrollY;
    // Offset accounts for main nav, sticky nav, and the -100px anchor offset
    const viewportOffset = navHeight + stickyNavHeight + 150;
    const currentPosition = scrollPosition + viewportOffset;

    let activeSectionId = null;
    let closestDistance = Infinity;

    sectionAnchors.forEach((anchor) => {
      const targetId = anchor.getAttribute('id');
      if (!targetId) return;

      const sectionElement = findSectionElement(anchor);
      let sectionTop, sectionBottom;
      
      if (sectionElement) {
        // Use the actual section element's position and height
        sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        sectionBottom = sectionTop + sectionHeight;
      } else {
        // Fallback: use anchor position if section not found
        sectionTop = anchor.offsetTop;
        
        // Estimate section height by finding next anchor
        let nextAnchor = anchor;
        let sectionHeight = 800; // Default fallback
        while (nextAnchor.nextElementSibling) {
          nextAnchor = nextAnchor.nextElementSibling;
          if (nextAnchor.classList && nextAnchor.classList.contains('section-anchor')) {
            sectionHeight = nextAnchor.offsetTop - sectionTop;
            break;
          }
        }
        sectionBottom = sectionTop + sectionHeight;
      }

      // Check if we're in this section
      if (currentPosition >= sectionTop - 150 && currentPosition < sectionBottom) {
        // Calculate distance from section top to current position
        // The section closest to the top of the viewport (accounting for offset) should be active
        const distance = Math.abs(currentPosition - sectionTop);
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

    // If scrolled to top (before first section), remove all active classes
    if (sectionAnchors.length > 0 && !activeSectionId) {
      const firstAnchor = sectionAnchors[0];
      const firstSection = findSectionElement(firstAnchor);
      const firstSectionTop = firstSection ? firstSection.offsetTop : firstAnchor.offsetTop;
      
      if (scrollPosition + viewportOffset < firstSectionTop - 150) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        });
      }
    }
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

