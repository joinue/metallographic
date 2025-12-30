document.addEventListener("DOMContentLoaded", () => {
  // Handle anchor links from different pages
  const handleAnchorLinks = () => {
    const hash = window.location.hash;
    if (hash) {
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

  // Handle Mobile Navigation Toggle
  const menuBtn = document.querySelector("#menu-btn");
  const navLinksMobile = document.querySelector(".nav-links-mobile");

  if (menuBtn && navLinksMobile) {
    menuBtn.addEventListener("change", () => {
      navLinksMobile.style.display = menuBtn.checked ? "flex" : "none";
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) {
        navLinksMobile.style.display = "none";
        menuBtn.checked = false;
      }
    });
  }

  // Page Title Visibility
  const title = document.querySelector(".page-title");
  if (title) {
    title.classList.add("visible");
  }

  // Modal Display - only open modal for buttons, not links
  const modal = document.getElementById("quote-modal");
  const btn = document.getElementById("quote-request-btn");
  const btnMobile = document.getElementById("quote-request-btn-mobile");
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

  if (modal && btnMobile && btnMobile.tagName === 'BUTTON') {
    btnMobile.addEventListener("click", (e) => {
      e.preventDefault();
      openQuoteModal();
    });
  }

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
