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

  // Function to update active nav link
  function updateActiveNavLink() {
    const navHeight = getNavHeight();
    const scrollPosition = window.scrollY + navHeight + 50; // Offset for sticky nav

    sectionAnchors.forEach((anchor, index) => {
      const section = anchor;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight || 500; // Fallback height
      const sectionBottom = sectionTop + sectionHeight;

      // Check if we're in this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding nav link
        const targetId = section.getAttribute('id');
        const correspondingLink = Array.from(navLinks).find(link => {
          const href = link.getAttribute('href');
          return href === `#${targetId}`;
        });
        
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });

    // If scrolled to top, remove all active classes
    if (window.scrollY < 100) {
      navLinks.forEach(link => link.classList.remove('active'));
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

