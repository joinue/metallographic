// Guide Side Navigation
(function() {
  'use strict';

  // Initialize side navigation when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuideNav);
  } else {
    initGuideNav();
  }

  function initGuideNav() {
    const sections = Array.from(document.querySelectorAll('.guide-section[id]')).map(section => ({
      id: section.id,
      label: section.querySelector('h2')?.textContent || section.id
    }));

    if (sections.length === 0) return;

    // Check if side nav already exists in HTML
    let sideNav = document.getElementById('guide-side-nav');
    let toggleBtn = document.getElementById('guide-nav-toggle');
    let overlay = document.getElementById('guide-nav-overlay');
    
    // If elements don't exist, create them
    if (!sideNav || !toggleBtn) {
      // Create side navigation HTML
      const navHTML = createSideNavHTML(sections);
      const navContainer = document.createElement('div');
      navContainer.innerHTML = navHTML;
      document.body.appendChild(navContainer);
      
      sideNav = document.getElementById('guide-side-nav');
      toggleBtn = document.getElementById('guide-nav-toggle');
      overlay = document.getElementById('guide-nav-overlay');
    } else {
      // Elements exist, just populate the nav list
      const navList = sideNav.querySelector('.guide-nav-list');
      if (navList) {
        const navItems = sections.map((section, index) => `
          <li>
            <a
              href="#${section.id}"
              class="guide-nav-link"
              aria-current="false"
            >
              <span class="guide-nav-indicator" aria-hidden="true"></span>
              <span class="guide-nav-number">${index + 1}</span>
              <span class="guide-nav-label">${section.label}</span>
            </a>
          </li>
        `).join('');
        navList.innerHTML = navItems;
      }
    }
    
    if (!sideNav || !toggleBtn) return;

    // Start closed on xl screens (1280px-1800px), open on 3xl+ (1800px+)
    const isLargeScreen = window.innerWidth >= 1800;
    let isOpen = isLargeScreen;
    let activeSection = '';
    let progress = 0;
    let navBottom = null;
    let rafId = null;

    // Initialize state - but wait a moment to ensure SVG is rendered
    setTimeout(() => {
      updateNavState();
    }, 10);

    // Toggle navigation
    toggleBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      updateNavState();
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', () => {
        isOpen = false;
        updateNavState();
      });
    }

    function updateNavState() {
      sideNav.classList.toggle('guide-side-nav-open', isOpen);
      if (overlay) {
        overlay.classList.toggle('guide-nav-overlay-visible', isOpen);
      }
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      
      // Add class to body for CSS targeting
      if (isOpen) {
        document.body.classList.add('guide-nav-open');
      } else {
        document.body.classList.remove('guide-nav-open');
      }
      
      // Update toggle icon - white arrow pointing right when closed, left when open
      const arrow = toggleBtn.querySelector('.guide-nav-toggle-arrow');
      if (arrow) {
        if (isOpen) {
          // Arrow pointing left when open
          arrow.setAttribute('d', 'M15 18l-6-6 6-6');
        } else {
          // Arrow pointing right when closed (pointing out)
          arrow.setAttribute('d', 'M9 18l6-6-6-6');
        }
      }
    }

    // Handle hash navigation on page load
    function handleHashNavigation() {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            setActiveSection(hash);
          }
        }, 100);
      }
    }

    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    // Handle scroll
    function handleScroll() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Calculate scroll progress
        const scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
        progress = Math.min(100, Math.max(0, scrollProgress));
        updateProgressBar(progress);

        // Check footer position - stop nav before footer
        const footer = document.querySelector('footer');
        if (footer && window.innerWidth >= 1280) {
          const footerRect = footer.getBoundingClientRect();
          const footerTop = footerRect.top;
          const viewportBottom = windowHeight;
          
          // If footer is in viewport, adjust nav max-height
          if (footerTop < viewportBottom) {
            const navContent = sideNav.querySelector('.guide-side-nav-content > div');
            if (navContent) {
              const navTop = sideNav.getBoundingClientRect().top;
              const availableHeight = footerTop - navTop - 2; // 2rem margin
              navContent.style.maxHeight = `${Math.max(200, availableHeight)}px`;
            }
          } else {
            const navContent = sideNav.querySelector('.guide-side-nav-content > div');
            if (navContent) {
              navContent.style.maxHeight = 'calc(100vh - 10rem)';
            }
          }
        }

        // Determine active section
        const sectionElements = sections
          .map(section => {
            const element = document.getElementById(section.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              return {
                id: section.id,
                top: rect.top + scrollTop,
                bottom: rect.bottom + scrollTop,
              };
            }
            return null;
          })
          .filter(Boolean);

        const currentScroll = scrollTop + windowHeight / 3;

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (currentScroll >= section.top) {
            setActiveSection(section.id);
            if (window.location.hash !== `#${section.id}`) {
              const pathname = window.location.pathname;
              window.history.replaceState(null, '', `${pathname}#${section.id}`);
            }
            break;
          }
        }

        // Set first section as active at top
        if (scrollTop < 100) {
          if (sections[0]) {
            setActiveSection(sections[0].id);
            if (window.location.hash && sections[0].id) {
              window.history.replaceState(null, '', window.location.pathname);
            }
          }
        }
      });
    }

    function updateProgressBar(progressValue) {
      const progressBar = document.getElementById('guide-nav-progress');
      if (progressBar) {
        progressBar.style.width = `${progressValue}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(progressValue));
      }
    }

    function setActiveSection(sectionId) {
      if (activeSection === sectionId) return;
      
      activeSection = sectionId;
      
      // Update all nav links
      const navLinks = sideNav.querySelectorAll('.guide-nav-link');
      navLinks.forEach(link => {
        const linkId = link.getAttribute('href')?.slice(1);
        const isActive = linkId === sectionId;
        
        link.classList.toggle('guide-nav-link-active', isActive);
        link.setAttribute('aria-current', isActive ? 'location' : null);
        
        const numberSpan = link.querySelector('.guide-nav-number');
        if (numberSpan) {
          numberSpan.classList.toggle('guide-nav-number-active', isActive);
        }
      });
    }

    // Handle nav link clicks - use event delegation on the nav list
    const navList = sideNav.querySelector('.guide-nav-list');
    if (navList) {
      navList.addEventListener('click', (e) => {
        const link = e.target.closest('.guide-nav-link');
        if (link) {
          e.preventDefault();
          const id = link.getAttribute('href')?.slice(1);
          if (id) {
            const element = document.getElementById(id);
            if (element) {
              const headerOffset = 100;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.history.pushState(null, '', `${window.location.pathname}#${id}`);

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });

              // Close nav on screens below 1800px after clicking
              if (window.innerWidth < 1800) {
                isOpen = false;
                updateNavState();
              }
            }
          }
        }
      });
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      // Update open state based on screen size
      const isLargeScreen = window.innerWidth >= 1800;
      if (isLargeScreen && !isOpen) {
        isOpen = true;
        updateNavState();
      } else if (!isLargeScreen && isOpen && window.innerWidth < 1280) {
        isOpen = false;
        updateNavState();
      }
      handleScroll();
    });
  }

  function createSideNavHTML(sections) {
    const navItems = sections.map((section, index) => `
      <li>
        <a
          href="#${section.id}"
          class="guide-nav-link"
          aria-current="false"
        >
          <span class="guide-nav-indicator" aria-hidden="true"></span>
          <span class="guide-nav-number">${index + 1}</span>
          <span class="guide-nav-label">${section.label}</span>
        </a>
      </li>
    `).join('');

    return `
      <!-- Toggle Tab - Visible from xl (1280px) to 3xl (1800px) -->
      <button
        id="guide-nav-toggle"
        class="guide-nav-toggle"
        aria-label="Open navigation"
        aria-expanded="false"
      >
        <svg class="guide-nav-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path class="guide-nav-toggle-arrow" d="M9 18l6-6-6-6" stroke="white" stroke-width="3" fill="none" />
        </svg>
      </button>

      <!-- Overlay - Only on xl screens when open -->
      <div
        id="guide-nav-overlay"
        class="guide-nav-overlay"
        aria-hidden="true"
      ></div>

      <!-- Navigation -->
      <nav
        id="guide-side-nav"
        class="guide-side-nav"
        aria-label="Table of contents"
      >
        <div class="guide-side-nav-inner">
          <div class="guide-side-nav-content">
            <!-- Header -->
            <div class="guide-side-nav-header">
              <h2 class="guide-side-nav-title">Navigation</h2>
              
              <!-- Progress Bar -->
              <div class="guide-side-nav-progress-wrapper">
                <div class="guide-side-nav-progress-track">
                  <div
                    id="guide-nav-progress"
                    class="guide-side-nav-progress-bar"
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="Reading progress"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Navigation Links -->
            <nav aria-label="Page sections" style="background: white;">
              <ol class="guide-nav-list" role="list">
                ${navItems}
              </ol>
            </nav>
          </div>
        </div>
      </nav>
    `;
  }
})();

