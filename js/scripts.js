// Solve "sticky hover after navigation": after clicking e.g. Equipment, the
// new page loads with the cursor still parked over that same button, and the
// CSS :hover rule would auto-open the dropdown without intent.
//
// Approach: every top-level submenu-li starts with .hover-locked (CSS
// suppresses :hover while it's present). On the first real mousemove, we use
// elementFromPoint to identify which li (if any) is under the cursor — that's
// the "stuck" button the user just clicked. It stays locked until mouseleave
// fires on it (real exit, never spurious). Every other li unlocks immediately
// so normal hover behavior is unaffected.
//
// We can't unlock the stuck one on mouseenter, because browsers dispatch a
// synthetic mouseenter for elements under the cursor on the first mousemove
// after navigation — even if the cursor never crossed a boundary.
//
// :focus-within (keyboard a11y) and .menu-open (JS hover-intent, also driven
// by mouseenter, but that only triggers from inside the li so it's fine here)
// remain unaffected by the lock.
(function lockStickyNavHover() {
  const setup = () => {
    const locked = [];
    document.querySelectorAll(".nav-links > li").forEach((li) => {
      if (!li.querySelector(":scope > .sub-menu")) return;
      li.classList.add("hover-locked");
      locked.push(li);
    });
    if (!locked.length) return;

    const resolve = (e) => {
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const stuck = locked.find((li) => li.contains(under));
      locked.forEach((li) => {
        if (li !== stuck) li.classList.remove("hover-locked");
      });
      if (stuck) {
        stuck.addEventListener(
          "mouseleave",
          () => stuck.classList.remove("hover-locked"),
          { once: true }
        );
      }
    };

    document.addEventListener("mousemove", resolve, { once: true });
    // Keyboard-only users never trigger the mousemove resolver; unlock all
    // on the first focus into the nav so tabbing isn't blocked.
    document.querySelector(".nav-links")?.addEventListener(
      "focusin",
      () => locked.forEach((li) => li.classList.remove("hover-locked")),
      { once: true }
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();

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
        const offset = 50; // Account for fixed nav + sticky section nav
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
    // Read scroll position before any DOM mutation to avoid forced reflow
    const initialScroll = window.scrollY;
    if (initialScroll > 50) {
      nav.classList.add("scrolled", "condensed");
    } else {
      nav.classList.remove("scrolled", "condensed");
    }
  }

  // Unified scroll handler — rAF-throttled to run at most once per frame
  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(onScroll);
      scrollTicking = true;
    }
  });

  function onScroll() {
    scrollTicking = false;
    const scrollY = window.scrollY;

    // Nav condensed state
    if (nav) {
      if (scrollY > 50) {
        nav.classList.add("scrolled", "condensed");
      } else {
        nav.classList.remove("scrolled", "condensed");
      }
    }

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
  let quoteModalLastTrigger = null;

  // Preconnect to HubSpot's CDN at idle time so DNS/TLS is already done by click time.
  // Cuts ~200–400 ms off perceived load on first open.
  function warmQuoteFormConnections() {
    if (warmQuoteFormConnections.done) return;
    warmQuoteFormConnections.done = true;
    ['https://js.hsforms.net', 'https://forms.hsforms.com', 'https://forms-na1.hsforms.com'].forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = '';
      document.head.appendChild(link);
    });
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(warmQuoteFormConnections, { timeout: 2000 });
  } else {
    setTimeout(warmQuoteFormConnections, 1500);
  }

  // Watch for HubSpot to mount its iframe inside the form container, then mark
  // the container as loaded so the CSS spinner disappears. (Belt-and-suspenders
  // alongside the CSS `:has(iframe)` selector for browsers without :has support.)
  function watchQuoteFormReady() {
    const container = document.querySelector('.quote-form-container');
    if (!container || container.classList.contains('is-loaded')) return;
    if (container.querySelector('iframe')) {
      container.classList.add('is-loaded');
      return;
    }
    const observer = new MutationObserver(() => {
      if (container.querySelector('iframe')) {
        container.classList.add('is-loaded');
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });
  }

  function openQuoteModal() {
    if (modal) {
      quoteModalLastTrigger = document.activeElement;
      modal.style.display = "block";
      // Force a reflow so the opacity transition actually runs on the first open.
      // eslint-disable-next-line no-unused-expressions
      modal.offsetHeight;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('aria-modal', 'true');
      document.body.style.overflow = 'hidden';

      // Load HubSpot form when modal opens (no-op if already warmed by hover/focus)
      if (typeof loadHubSpotForm === 'function') {
        loadHubSpotForm();
      }
      watchQuoteFormReady();

      // Move focus to the close button for keyboard/screen-reader users.
      if (span) {
        // Defer so the modal is painted first.
        requestAnimationFrame(() => span.focus());
      }
    }
  }

  // Only attach modal opening to buttons (not links)
  if (modal && btn && btn.tagName === 'BUTTON') {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openQuoteModal();
    });

    // Warm-up: start downloading the HubSpot script as soon as the user shows
    // intent (hover or keyboard focus). By the time they click, the form is
    // usually already mounted — so the modal feels instant instead of blank.
    const warmForm = () => {
      warmQuoteFormConnections();
      if (typeof loadHubSpotForm === 'function') {
        loadHubSpotForm();
      }
    };
    btn.addEventListener('mouseenter', warmForm, { once: true });
    btn.addEventListener('focus', warmForm, { once: true });
    btn.addEventListener('touchstart', warmForm, { once: true, passive: true });
  }

  // Mobile quote button removed - no longer needed
  // if (modal && btnMobile && btnMobile.tagName === 'BUTTON') {
  //   btnMobile.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     openQuoteModal();
  //   });
  // }

  function closeQuoteModalUI() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Wait for the fade-out transition before removing from the layout, so the
    // close animation is visible.
    const finish = () => {
      modal.style.display = 'none';
      modal.removeEventListener('transitionend', finish);
    };
    modal.addEventListener('transitionend', finish);
    // Fallback in case transitionend doesn't fire (e.g. reduced-motion).
    setTimeout(finish, 350);
    // Restore focus to whatever triggered the modal.
    if (quoteModalLastTrigger && typeof quoteModalLastTrigger.focus === 'function') {
      quoteModalLastTrigger.focus();
    }
  }

  if (modal && span) {
    span.addEventListener("click", closeQuoteModalUI);
  }

  if (modal) {
    // Click on backdrop (the modal element itself, not its content) closes.
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeQuoteModalUI();
      }
    });

    // Escape key closes the modal when it's open.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeQuoteModalUI();
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

 

  // Desktop nav hover-intent. Two delays:
  //   OPEN  — only open a menu after the cursor lingers, so a lateral sweep
  //           across the nav bar doesn't pop every dropdown in sequence.
  //   CLOSE — keep an open menu visible briefly after the cursor leaves, so
  //           a small overshoot or diagonal trajectory doesn't collapse it.
  // Applied to every <li> with a flyout, so the grace works at all depths.
  const desktopNav = document.querySelector(".nav-links");
  if (desktopNav) {
    const OPEN_DELAY_MS = 100;
    const CLOSE_DELAY_MS = 300;
    // The second-level <ul> also carries the .sub-menu class, so this single
    // selector catches every flyout-parent at every depth.
    const flyoutParents = desktopNav.querySelectorAll("li:has(> .sub-menu)");

    const closeAll = () => {
      flyoutParents.forEach((li) => li.classList.remove("menu-open"));
    };

    flyoutParents.forEach((li) => {
      let openTimer;
      let closeTimer;
      const doOpen = () => {
        // Close lingering siblings at the same level so we never have two
        // flyouts open from the same parent.
        const siblings = li.parentElement ? li.parentElement.children : [];
        for (const sib of siblings) {
          if (sib !== li && sib.classList) sib.classList.remove("menu-open");
        }
        li.classList.add("menu-open");
      };
      li.addEventListener("mouseenter", () => {
        clearTimeout(closeTimer);
        // Sticky-hover lock: ignore the synthetic mouseenter the browser
        // dispatches on first mousemove after navigation when the cursor
        // is parked on this li. lockStickyNavHover (top of file) clears
        // .hover-locked once the cursor genuinely leaves.
        if (li.classList.contains("hover-locked")) return;
        // If already open (just in the close-delay window), hold it open
        // without re-triggering the open-delay — re-entry should feel instant.
        if (li.classList.contains("menu-open")) return;
        openTimer = setTimeout(doOpen, OPEN_DELAY_MS);
      });
      li.addEventListener("mouseleave", () => {
        clearTimeout(openTimer); // cancel pending open if the cursor swept past
        if (!li.classList.contains("menu-open")) return;
        closeTimer = setTimeout(() => li.classList.remove("menu-open"), CLOSE_DELAY_MS);
      });
      // Keyboard: close when focus leaves this submenu's tree
      li.addEventListener("focusout", (e) => {
        if (!li.contains(e.relatedTarget)) li.classList.remove("menu-open");
      });
    });

    // Sibling switching at ANY depth: when the cursor moves to a different
    // <li> within the same <ul> (top-level nav bar OR vertically down a
    // submenu), close any sibling's open flyout IMMEDIATELY — no close-delay,
    // no open-overlap. The 300ms grace is reserved for cursor leaving the
    // menu entirely (overshoot), not for intentional sibling switches.
    desktopNav.addEventListener("mouseover", (e) => {
      const li = e.target.closest("li");
      if (!li) return;
      const ul = li.parentElement;
      if (!ul || !desktopNav.contains(ul)) return;
      for (const sib of ul.children) {
        if (sib !== li && sib.classList && sib.classList.contains("menu-open")) {
          sib.classList.remove("menu-open");
        }
      }
    });

    // Click anywhere outside the nav closes all open submenus instantly,
    // avoiding the 300ms "ghost menu" hanging over the user's click target.
    document.addEventListener("click", (e) => {
      if (!desktopNav.contains(e.target)) closeAll();
    });
    // Same on Escape — standard accessible-menu behavior.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAll();
    });
  }

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

  // (Quote Request Modal close handlers consolidated above — closeQuoteModalUI
  // handles Escape, backdrop click, and the .close button via a single path.)
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

// Desktop-only video loading
// Videos use data-src instead of <source> to prevent 18MB+ mobile downloads.
// On desktop, inject <source> and autoplay when videos enter the viewport.
(function() {
  if (window.innerWidth < 769) return;
  var videos = document.querySelectorAll('video[data-src]');
  if (!videos.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var video = entry.target;
      var source = document.createElement('source');
      source.src = video.getAttribute('data-src');
      source.type = 'video/mp4';
      video.appendChild(source);
      video.autoplay = true;
      video.load();
      video.play();
      observer.unobserve(video);
    });
  }, { rootMargin: '200px' });
  videos.forEach(function(v) { observer.observe(v); });
})();

// Cookie consent banner
(function() {
  if (document.cookie.indexOf('cookie_consent=') !== -1) return;

  try {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    var usZones = ['America/New_York','America/Chicago','America/Denver','America/Los_Angeles',
      'America/Anchorage','America/Adak','America/Phoenix','America/Boise','America/Detroit',
      'America/Menominee','America/Nome','America/Sitka','America/Yakutat','America/Juneau',
      'America/Metlakatla','Pacific/Honolulu'];
    var isUS = usZones.indexOf(tz) !== -1 ||
      tz.indexOf('America/Indiana') === 0 ||
      tz.indexOf('America/Kentucky') === 0 ||
      tz.indexOf('America/North_Dakota') === 0;
    if (isUS) return;
  } catch(e) {}

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<div class="cookie-banner-inner">' +
      '<p class="cookie-banner-text">We use cookies to analyze site traffic and improve your experience. ' +
        '<a href="/privacy.html">Privacy Policy</a></p>' +
      '<div class="cookie-banner-actions">' +
        '<button class="cookie-banner-decline">Decline</button>' +
        '<button class="cookie-banner-accept">Accept</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      banner.classList.add('visible');
    });
  });

  function dismiss(accepted) {
    document.cookie = 'cookie_consent=' + (accepted ? '1' : '0') + '; path=/; max-age=31536000; SameSite=Lax';
    banner.classList.remove('visible');
    setTimeout(function() { banner.remove(); }, 300);
  }

  banner.querySelector('.cookie-banner-accept').addEventListener('click', function() {
    dismiss(true);
  });

  banner.querySelector('.cookie-banner-decline').addEventListener('click', function() {
    dismiss(false);
  });
})();