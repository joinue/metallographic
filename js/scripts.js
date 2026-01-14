document.addEventListener("DOMContentLoaded", () => {
  // Handle anchor links from different pages
  const handleAnchorLinks = () => {
    const hash = window.location.hash;
    if (hash) {
      // Check if this is a tab hash (starts with tab-)
      const tabId = hash.slice(1); // Remove the #
      const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
      if (tabButton) {
        // This is a tab hash, switch to that tab
        switchTab(tabId);
        return;
      }
      
      // Otherwise, handle as regular anchor link
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        const offset = 100; // Same offset as used in smooth scroll
        // Use requestAnimationFrame to avoid forced reflow
        requestAnimationFrame(() => {
          const topPosition = targetElement.offsetTop - offset;
          window.scrollTo({
            top: topPosition,
            behavior: "smooth"
          });
        });
      }
    }
  };

  // Call immediately and after a short delay to ensure all content is loaded
  handleAnchorLinks();
  setTimeout(handleAnchorLinks, 100);

  // Handle Navigation Scroll
  const nav = document.querySelector(".navigation");
  if (nav) {
    // Ensure logo starts big (remove any existing condensed class)
    nav.classList.remove("scrolled", "condensed");
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled", "condensed");
      } else {
        nav.classList.remove("scrolled", "condensed");
      }
    };
    
    // Only check scroll position if page is actually scrolled
    if (window.scrollY > 50) {
      handleScroll();
    }
    
    window.addEventListener("scroll", handleScroll);
  }

  // Modern Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
  const mobileNavContainer = document.querySelector("#mobile-nav-container");
  const mobileNavOverlay = document.querySelector("#mobile-nav-overlay");

  function toggleMobileMenu() {
    const isOpen = mobileMenuBtn?.getAttribute("aria-expanded") === "true";
    
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute("aria-expanded", !isOpen);
    }
    
    if (mobileNavContainer) {
      mobileNavContainer.classList.toggle("active", !isOpen);
    }
    
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.toggle("active", !isOpen);
    }
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? "hidden" : "";
    
    // Collapse all submenus when opening menu
    if (!isOpen) {
      collapseAllSubmenus();
    }
  }
  
  function collapseAllSubmenus() {
    // Collapse all first-level submenus
    document.querySelectorAll(".sub-menu-mobile").forEach(submenu => {
      submenu.classList.remove("active");
    });
    
    // Collapse all second-level submenus
    document.querySelectorAll(".sub-menu-second-level").forEach(submenu => {
      submenu.classList.remove("active");
    });
    
    // Reset all toggle buttons
    document.querySelectorAll(".mobile-nav-toggle, .sub-menu-toggle").forEach(toggle => {
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  function closeMobileMenu() {
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
    if (mobileNavContainer) {
      mobileNavContainer.classList.remove("active");
    }
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.remove("active");
    }
    document.body.style.overflow = "";
    
    // Collapse all submenus when closing
    collapseAllSubmenus();
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", closeMobileMenu);
  }

  // Handle expandable sections
  const mobileNavToggles = document.querySelectorAll(".mobile-nav-toggle");
  mobileNavToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const section = toggle.getAttribute("data-section");
      const submenu = document.querySelector(`.sub-menu-mobile[data-section="${section}"]`);
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      
      toggle.setAttribute("aria-expanded", !isExpanded);
      
      if (submenu) {
        submenu.classList.toggle("active", !isExpanded);
      }
    });
  });

  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link, .sub-menu-mobile a");
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Small delay to allow navigation
      setTimeout(closeMobileMenu, 100);
    });
  });

  // Close mobile menu on window resize
    window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNavContainer?.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // Close button handler
  const mobileNavClose = document.getElementById("mobile-nav-close");
  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", closeMobileMenu);
  }

  // Handle second-level submenus
  const subMenuToggles = document.querySelectorAll(".sub-menu-mobile .sub-menu-toggle");
  subMenuToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const parentLi = toggle.closest("li");
      const submenu = parentLi?.querySelector(".sub-menu-second-level");
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      
      toggle.setAttribute("aria-expanded", !isExpanded);
      
      if (submenu) {
        submenu.classList.toggle("active", !isExpanded);
      }
    });
  });

  // Initialize submenu toggles - ensure all start collapsed
  function initializeSubmenuToggles() {
    document.querySelectorAll(".sub-menu-mobile li.has-submenu").forEach(li => {
      const secondLevel = li.querySelector(".sub-menu-second-level");
      const toggle = li.querySelector(".sub-menu-toggle");
      
      if (secondLevel && toggle) {
        // Ensure it starts collapsed
        toggle.setAttribute("aria-expanded", "false");
        secondLevel.classList.remove("active");
      }
    });
  }
  
  // Initialize on page load
  initializeSubmenuToggles();
  
  // Re-initialize when menu opens
  if (mobileNavContainer) {
    const observer = new MutationObserver(() => {
      if (mobileNavContainer.classList.contains("active")) {
        initializeSubmenuToggles();
      }
    });
    observer.observe(mobileNavContainer, { attributes: true, attributeFilter: ['class'] });
  }

  // Page Title Visibility
  const title = document.querySelector(".page-title");
  if (title) {
    title.classList.add("visible");
  }

  // Modal Display - only open modal for buttons, not links
  const modal = document.getElementById("quote-modal");
  const btn = document.getElementById("quote-request-btn");
  const span = document.querySelector(".close");

  function openQuoteModal() {
    if (modal) {
      modal.style.display = "block";
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      // Load HubSpot form when modal opens
      if (typeof loadHubSpotForm === 'function') {
        loadHubSpotForm();
      }
    }
  }

  // Only attach modal opening to buttons (not links)
  if (modal && btn && btn.tagName === 'BUTTON') {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openQuoteModal();
    });
  }

  // Mobile quote button removed - no longer needed
  // if (modal && btnMobile && btnMobile.tagName === 'BUTTON') {
  //   btnMobile.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     openQuoteModal();
  //   });
  // }

  if (modal && span) {
    span.addEventListener("click", () => {
      modal.style.display = "none";
      modal.classList.remove('show');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }

  // Form Progress Bar
  const form = document.getElementById("quote-form");
  const progressBar = document.getElementById("progress-bar");

  if (form && progressBar) {
    form.addEventListener("input", () => {
      const mandatoryFields = Array.from(form.querySelectorAll("input[required], select[required]"));
      const filledFields = mandatoryFields.filter((field) => field.value.trim() !== "");
      const progress = (filledFields.length / mandatoryFields.length) * 100;
      progressBar.style.width = progress + "%";
    });
  }

  // Toggle Additional Options
  const equipmentOptions = document.getElementById("equipment-options");
  const consumablesOptions = document.getElementById("consumables-options");
  const productCheckboxes = form ? form.querySelectorAll("input[name='productsServices[]']") : [];

  productCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.id === "equipment" && equipmentOptions) {
        equipmentOptions.style.display = checkbox.checked ? "block" : "none";
      }
      if (checkbox.id === "consumables" && consumablesOptions) {
        consumablesOptions.style.display = checkbox.checked ? "block" : "none";
      }
    });
  });

  // Machine Details Toggle
  const buttons = document.querySelectorAll(".machine-details-button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const details = button.nextElementSibling;
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", !isExpanded);
      details.setAttribute("aria-hidden", isExpanded ? "true" : "false");
      details.classList.toggle("active");

      console.log(`Button clicked. Details are now ${!isExpanded ? "visible" : "hidden"}.`);
    });
  });

  // Checkbox Toggle Buttons
  const checkboxes = document.querySelectorAll(".option input[type='checkbox']");

  checkboxes.forEach((checkbox) => {
    const label = checkbox.nextElementSibling;

    // Initialize button state based on checkbox
    if (checkbox.checked) {
      label.classList.add("selected");
    }

    label.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked; // Toggle the checkbox state
      label.classList.toggle("selected"); // Toggle the selected class
    });
  });

 

  // Equipment Dropdown Functionality
  const equipmentDropdowns = document.querySelectorAll(".equipment-dropdown");
  equipmentDropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".equipment-btn");
    const content = dropdown.querySelector(".equipment-content");

    button.addEventListener("click", () => {
      content.style.display = content.style.display === "block" ? "none" : "block";
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target) && content.style.display === "block") {
        content.style.display = "none";
      }
    });
  });

  // Handle Scroll to Show Return to Top
// Select the return-to-top button and footer elements
const returnToTop = document.querySelector(".return-to-top");
const footer = document.querySelector("footer");

// Only set up return-to-top functionality if the element exists
if (returnToTop) {
// Show or hide the return-to-top button based on scroll position
let footerOffset = 0;
let windowHeight = window.innerHeight;

// Cache footer position to avoid repeated getBoundingClientRect calls
const updateFooterOffset = () => {
    if (footer) {
        footerOffset = footer.getBoundingClientRect().top + window.scrollY;
        windowHeight = window.innerHeight;
    }
};

// Initial calculation
updateFooterOffset();

// Update on resize
window.addEventListener('resize', () => {
    requestAnimationFrame(updateFooterOffset);
});

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const distanceFromFooter = 30; // Distance above the footer to stop

    // Toggle visibility with smooth fade-in/out
    if (scrollPosition > 500) {
        returnToTop.classList.add("visible");
        returnToTop.style.opacity = "1";
        returnToTop.style.visibility = "visible";
    } else {
        returnToTop.classList.remove("visible");
        returnToTop.style.opacity = "0";
        returnToTop.style.visibility = "hidden";
    }

    // Recalculate footer position on each scroll for accuracy
    if (footer) {
        const currentFooterTop = footer.getBoundingClientRect().top + window.scrollY;
        const currentWindowHeight = window.innerHeight;
        
        // Smart positioning: stop above footer but maintain visibility
        if (scrollPosition + currentWindowHeight > currentFooterTop) {
            // Calculate how much of the footer is visible
            const footerVisible = (scrollPosition + currentWindowHeight) - currentFooterTop;
            const newBottom = Math.max(30, footerVisible + distanceFromFooter);
            returnToTop.style.bottom = `${newBottom}px`;
        } else {
            returnToTop.style.bottom = "30px";
        }
    } else {
        returnToTop.style.bottom = "30px";
    }
});

// Best-in-class return to top functionality
returnToTop.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Smooth scroll to the very top with easing
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Add a subtle visual feedback
    returnToTop.style.transform = 'scale(0.95)';
    setTimeout(() => {
        returnToTop.style.transform = 'scale(1)';
    }, 150);
});
}

  // Mobile Menu Items Toggle
  const menuItems = document.querySelectorAll(".nav-links-mobile > li > a");

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      const parentLi = this.parentElement;

      if (parentLi.querySelector(".sub-menu-mobile")) {
        e.preventDefault(); // Prevent default link behavior
        parentLi.classList.toggle("open");
      }
    });
  });

  // Prevent event bubbling that might affect links
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const target = event.target;
      if (target.tagName !== "A") {
        // Prevent only if not clicking on a link
        event.preventDefault();
        // Logic for card click handling, if any
      }
    });
  });

  // Smooth Scroll for Product Menu
  const offset = 100; // Height of the header or desired offset
  const links = document.querySelectorAll(".product-menu a"); // Select all links within the product menu

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor click behavior
      const targetId = this.getAttribute("href"); // Get the href attribute of the clicked link
      const targetElement = document.querySelector(targetId); // Find the target element

      if (targetElement) {
        // Use requestAnimationFrame to avoid forced reflow
        requestAnimationFrame(() => {
          const topPosition = targetElement.offsetTop - offset; // Calculate position to scroll to
          window.scrollTo({
            top: topPosition,
            behavior: "smooth", // Smooth scroll
          });
        });
      }
    });
  });

  // Notice Banner Close Button
  const noticeBanner = document.querySelector('.notice-banner');
  const closeButton = document.querySelector('.notice-close');
  const navigation = document.querySelector('.navigation');

  if (noticeBanner && closeButton && navigation) {
    // Add class if notice is present
    navigation.classList.add('with-notice');

    closeButton.addEventListener('click', function() {
      noticeBanner.style.display = 'none';
      navigation.classList.remove('with-notice');
    });
  }

  // Quote Request Modal (kept for other potential uses, but buttons now navigate to /quote.html)
  const quoteModal = document.getElementById('quote-modal');
  const closeBtn = document.querySelector('.close');

  function closeQuoteModal() {
    quoteModal.style.display = 'none';
    quoteModal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeQuoteModal);
  }

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === quoteModal) {
      closeQuoteModal();
    }
  });
});

// Material Detail Page Tab Switching
function switchTab(tabId) {
  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Remove active class from all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // Add active class to clicked button
  const clickedButton = document.querySelector(`[data-tab="${tabId}"]`);
  if (clickedButton) {
    clickedButton.classList.add('active');
  }
  
  // Add active class to corresponding tab content
  const tabContent = document.getElementById(`tab-${tabId}`);
  if (tabContent) {
    tabContent.classList.add('active');
  }
  
  // Update URL hash without scrolling
  window.history.replaceState(null, '', `#${tabId}`);
}