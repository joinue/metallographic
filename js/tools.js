// Tools page functionality
(function() {
  'use strict';

  // Get DOM elements
  const searchInput = document.getElementById('search-input');
  const categoryFilters = document.getElementById('category-filters');
  const filterButtons = categoryFilters?.querySelectorAll('.filter-btn');
  const toolsContent = document.getElementById('tools-content');
  const toolsSections = toolsContent?.querySelectorAll('.tools-section');
  const toolCards = toolsContent?.querySelectorAll('.tool-card');
  const emptyState = document.getElementById('empty-state');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  // Initialize
  function init() {
    if (!searchInput || !categoryFilters || !toolsContent) return;

    // Set up search
    searchInput.addEventListener('input', handleSearch);

    // Set up category filters
    filterButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        setActiveCategory(category);
      });
    });

    // Check URL params for category
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }

  // Handle search input
  function handleSearch(e) {
    currentSearchQuery = e.target.value.toLowerCase().trim();
    filterTools();
  }

  // Set active category
  function setActiveCategory(category) {
    currentCategory = category;

    // Update filter buttons
    filterButtons?.forEach(btn => {
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update URL without reload
    const url = new URL(window.location);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url);

    filterTools();
  }

  // Filter tools based on category and search
  function filterTools() {
    if (!toolsSections || !toolCards) return;

    let visibleCount = 0;

    toolsSections.forEach(section => {
      const sectionCategory = section.getAttribute('data-category');
      const sectionCards = section.querySelectorAll('.tool-card');
      let sectionVisibleCount = 0;

      sectionCards.forEach(card => {
        const toolName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const toolDescription = card.querySelector('p')?.textContent.toLowerCase() || '';
        const toolData = card.getAttribute('data-tool')?.toLowerCase() || '';

        // Check category match
        const categoryMatch = currentCategory === 'all' || sectionCategory === currentCategory;

        // Check search match
        const searchMatch = !currentSearchQuery || 
          toolName.includes(currentSearchQuery) ||
          toolDescription.includes(currentSearchQuery) ||
          toolData.includes(currentSearchQuery);

        if (categoryMatch && searchMatch) {
          card.classList.remove('hidden');
          sectionVisibleCount++;
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Show/hide section based on visible cards
      if (sectionVisibleCount > 0) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });

    // Show/hide empty state
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
