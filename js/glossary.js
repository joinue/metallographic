// Glossary page functionality
(function() {
  'use strict';

  const categories = ['Microstructure', 'Sample Preparation', 'Equipment', 'Material Science', 'Analysis', 'General'];
  
  const categoryColors = {
    'Microstructure': 'bg-blue-100 text-blue-700 border-blue-200',
    'Sample Preparation': 'bg-green-100 text-green-700 border-green-200',
    'Equipment': 'bg-purple-100 text-purple-700 border-purple-200',
    'Material Science': 'bg-orange-100 text-orange-700 border-orange-200',
    'Analysis': 'bg-pink-100 text-pink-700 border-pink-200',
    'General': 'bg-gray-100 text-gray-700 border-gray-200',
  };

  let searchQuery = '';
  let selectedCategory = 'All';
  let selectedLetter = null;
  const expandedTerms = new Set();

  // Get unique first letters for A-Z navigation
  function getUniqueLetters() {
    const letters = new Set();
    glossaryTerms.forEach(term => {
      letters.add(term.term.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }

  // Filter terms based on search, category, and letter
  function filterTerms() {
    let filtered = glossaryTerms;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    // Filter by letter
    if (selectedLetter) {
      filtered = filtered.filter(term => term.term.charAt(0).toUpperCase() === selectedLetter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        (term.relatedTerms && term.relatedTerms.some(rt => rt.toLowerCase().includes(query)))
      );
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.term.localeCompare(b.term));
  }

  // Group terms by first letter for display
  function groupTermsByLetter(terms) {
    const grouped = {};
    terms.forEach(term => {
      const letter = term.term.charAt(0).toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(term);
    });
    return grouped;
  }

  // Check if text is truncated
  function checkTruncation(element) {
    if (!element) return false;
    const clone = element.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.height = 'auto';
    clone.style.maxHeight = 'none';
    clone.style.overflow = 'visible';
    clone.style.webkitLineClamp = 'none';
    clone.style.display = 'block';
    clone.style.width = element.offsetWidth + 'px';
    document.body.appendChild(clone);
    const fullHeight = clone.offsetHeight;
    document.body.removeChild(clone);
    const clampedHeight = element.offsetHeight;
    return fullHeight > clampedHeight + 2;
  }

  // Render a single term card
  function renderTermCard(term) {
    const termId = term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const isExpanded = expandedTerms.has(term.term);
    const definitionElement = document.createElement('p');
    definitionElement.className = `glossary-definition ${isExpanded ? '' : 'line-clamp-3'}`;
    definitionElement.textContent = term.definition;
    
    // Check truncation after rendering
    setTimeout(() => {
      const isTruncated = checkTruncation(definitionElement);
      const toggleBtn = definitionElement.parentElement.querySelector('.toggle-definition');
      if (toggleBtn) {
        toggleBtn.style.display = (isTruncated || isExpanded) ? 'flex' : 'none';
      }
    }, 0);

    const card = document.createElement('div');
    card.className = 'glossary-term-card';
    card.id = termId;
    
    const categoryShort = term.category.split(' ')[0];
    const categoryColorClass = categoryColors[term.category] || categoryColors['General'];
    
    card.innerHTML = `
      <div class="glossary-term-header">
        <h3 class="glossary-term-title">${term.term}</h3>
        <span class="glossary-category-badge ${categoryColorClass}">${categoryShort}</span>
      </div>
      <div class="glossary-definition-wrapper">
        ${definitionElement.outerHTML}
        ${(isExpanded || true) ? `
          <button class="toggle-definition" data-term="${term.term}">
            <span>${isExpanded ? 'Show less' : 'Read more'}</span>
            <svg class="toggle-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${isExpanded ? '<path d="M18 15l-6-6-6 6"/>' : '<path d="M6 9l6 6 6-6"/>'}
            </svg>
          </button>
        ` : ''}
      </div>
      ${term.example ? `
        <div class="glossary-example">
          <strong>Ex:</strong> ${term.example}
        </div>
      ` : ''}
      ${term.relatedTerms && term.relatedTerms.length > 0 ? `
        <div class="glossary-related">
          ${term.relatedTerms.slice(0, 3).map(relatedTerm => {
            const relatedTermData = glossaryTerms.find(t => t.term === relatedTerm);
            return relatedTermData ? `
              <button class="glossary-related-term" data-term="${relatedTerm}">${relatedTerm}</button>
            ` : '';
          }).join('')}
          ${term.relatedTerms.length > 3 ? `<span class="glossary-related-more">+${term.relatedTerms.length - 3}</span>` : ''}
        </div>
      ` : ''}
    `;

    // Replace the definition element with the actual one
    const definitionWrapper = card.querySelector('.glossary-definition-wrapper');
    definitionWrapper.replaceChild(definitionElement, definitionWrapper.querySelector('p'));

    return card;
  }

  // Render all terms
  function renderTerms() {
    const filteredTerms = filterTerms();
    const termsByLetter = groupTermsByLetter(filteredTerms);
    const container = document.getElementById('glossary-terms-container');
    
    if (!container) return;

    // Update results count
    const resultsCount = document.getElementById('glossary-results-count');
    if (resultsCount) {
      resultsCount.textContent = filteredTerms.length;
      const resultsText = document.getElementById('glossary-results-text');
      if (resultsText) {
        resultsText.textContent = filteredTerms.length !== 1 ? 'terms found' : 'term found';
      }
    }

    if (filteredTerms.length === 0) {
      container.innerHTML = `
        <div class="glossary-empty">
          <p class="glossary-empty-title">No terms found</p>
          <p class="glossary-empty-text">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      `;
      return;
    }

    const letters = Object.keys(termsByLetter).sort();
    let html = '';
    
    letters.forEach(letter => {
      html += `
        <section class="glossary-letter-section" id="letter-${letter}">
          <h2 class="glossary-letter-heading">${letter}</h2>
          <div class="glossary-terms-grid">
            ${termsByLetter[letter].map(term => {
              const termId = term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const isExpanded = expandedTerms.has(term.term);
              const categoryShort = term.category.split(' ')[0];
              const categoryColorClass = categoryColors[term.category] || categoryColors['General'];
              
              return `
                <div class="glossary-term-card" id="${termId}">
                  <div class="glossary-term-header">
                    <h3 class="glossary-term-title">${term.term}</h3>
                    <span class="glossary-category-badge ${categoryColorClass}">${categoryShort}</span>
                  </div>
                  <div class="glossary-definition-wrapper">
                    <p class="glossary-definition ${isExpanded ? '' : 'line-clamp-3'}" data-term="${term.term}">${term.definition}</p>
                    <button class="toggle-definition" data-term="${term.term}" style="display: none;">
                      <span>${isExpanded ? 'Show less' : 'Read more'}</span>
                      <svg class="toggle-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${isExpanded ? '<path d="M18 15l-6-6-6 6"/>' : '<path d="M6 9l6 6 6-6"/>'}
                      </svg>
                    </button>
                  </div>
                  ${term.example ? `
                    <div class="glossary-example">
                      <strong>Ex:</strong> ${term.example}
                    </div>
                  ` : ''}
                  ${term.relatedTerms && term.relatedTerms.length > 0 ? `
                    <div class="glossary-related">
                      ${term.relatedTerms.slice(0, 3).map(relatedTerm => {
                        const relatedTermData = glossaryTerms.find(t => t.term === relatedTerm);
                        return relatedTermData ? `
                          <button class="glossary-related-term" data-term="${relatedTerm}">${relatedTerm}</button>
                        ` : '';
                      }).join('')}
                      ${term.relatedTerms.length > 3 ? `<span class="glossary-related-more">+${term.relatedTerms.length - 3}</span>` : ''}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    });

    container.innerHTML = html;

    // Check truncation for all definitions after render
    setTimeout(() => {
      document.querySelectorAll('.glossary-definition').forEach(def => {
        const isExpanded = expandedTerms.has(def.dataset.term);
        if (!isExpanded) {
          const isTruncated = checkTruncation(def);
          const toggleBtn = def.parentElement.querySelector('.toggle-definition');
          if (toggleBtn) {
            toggleBtn.style.display = isTruncated ? 'flex' : 'none';
          }
        }
      });
    }, 100);

    // Attach event listeners
    attachEventListeners();
    
    // Update side nav with visible letters and active state
    setTimeout(() => {
      if (typeof initSideNav === 'function') {
        initSideNav();
      }
      if (typeof updateSideNavActiveFromScroll === 'function') {
        updateSideNavActiveFromScroll();
      }
    }, 150);
  }

  // Attach event listeners
  function attachEventListeners() {
    // Toggle definition expand/collapse
    document.querySelectorAll('.toggle-definition').forEach(btn => {
      btn.addEventListener('click', function() {
        const term = this.dataset.term;
        const definition = this.parentElement.querySelector('.glossary-definition');
        
        if (expandedTerms.has(term)) {
          expandedTerms.delete(term);
          definition.classList.add('line-clamp-3');
          this.querySelector('span').textContent = 'Read more';
          this.querySelector('svg').innerHTML = '<path d="M6 9l6 6 6-6"/>';
        } else {
          expandedTerms.add(term);
          definition.classList.remove('line-clamp-3');
          this.querySelector('span').textContent = 'Show less';
          this.querySelector('svg').innerHTML = '<path d="M18 15l-6-6-6 6"/>';
        }
        
        // Recheck truncation
        setTimeout(() => {
          const isTruncated = checkTruncation(definition);
          if (!isTruncated && expandedTerms.has(term)) {
            this.style.display = 'none';
          }
        }, 0);
      });
    });

    // Related term navigation
    document.querySelectorAll('.glossary-related-term').forEach(btn => {
      btn.addEventListener('click', function() {
        const relatedTerm = this.dataset.term;
        const relatedTermId = relatedTerm.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Clear filters
        searchQuery = '';
        selectedCategory = 'All';
        selectedLetter = null;
        
        // Update UI
        const searchInput = document.getElementById('glossary-search');
        if (searchInput) searchInput.value = '';
        updateCategoryButtons();
        updateLetterButtons();
        updateActiveFilters();
        
        // Render and scroll
        renderTerms();
        
        setTimeout(() => {
          const element = document.getElementById(relatedTermId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            element.classList.add('glossary-term-highlight');
            setTimeout(() => {
              element.classList.remove('glossary-term-highlight');
            }, 2000);
          }
        }, 100);
      });
    });
  }

  // Update category filter buttons
  function updateCategoryButtons() {
    document.querySelectorAll('.glossary-category-btn').forEach(btn => {
      const category = btn.dataset.category;
      if ((category === 'All' && selectedCategory === 'All') || category === selectedCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Update letter filter buttons
  function updateLetterButtons() {
    document.querySelectorAll('.glossary-letter-btn').forEach(btn => {
      const letter = btn.dataset.letter;
      if (letter === selectedLetter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Update active filters display - disabled since buttons show active state
  function updateActiveFilters() {
    // Active filters are hidden via CSS, buttons show active state with color
    return;
  }

  // Initialize
  function init() {
    // Search input
    const searchInput = document.getElementById('glossary-search');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        searchQuery = this.value;
        selectedLetter = null;
        
        // Show/hide clear button
        const clearSearchBtn = document.getElementById('glossary-search-clear');
        if (clearSearchBtn) {
          clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
        }
        
        updateLetterButtons();
        updateActiveFilters();
        renderTerms();
      });

      // Clear search button
      const clearSearchBtn = document.getElementById('glossary-search-clear');
      if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
          searchQuery = '';
          searchInput.value = '';
          this.style.display = 'none';
          updateActiveFilters();
          renderTerms();
        });
      }
    }

    // Category filter buttons
    document.querySelectorAll('.glossary-category-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const category = this.dataset.category;
        selectedCategory = category;
        selectedLetter = null;
        updateCategoryButtons();
        updateLetterButtons();
        updateActiveFilters();
        renderTerms();
      });
    });

    // Letter filter buttons
    const letters = getUniqueLetters();
    const letterContainer = document.getElementById('glossary-letters');
    if (letterContainer) {
      let html = '<span class="glossary-letters-label">Jump to:</span>';
      letters.forEach(letter => {
        html += `<button class="glossary-letter-btn" data-letter="${letter}">${letter}</button>`;
      });
      html += '<button class="glossary-letter-clear" style="display: none;">Clear</button>';
      letterContainer.innerHTML = html;

      document.querySelectorAll('.glossary-letter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const letter = this.dataset.letter;
          if (selectedLetter === letter) {
            selectedLetter = null;
          } else {
            selectedLetter = letter;
            searchQuery = '';
            if (searchInput) searchInput.value = '';
          }
          updateLetterButtons();
          updateActiveFilters();
          renderTerms();
          
          // Show/hide clear button
          const clearBtn = document.querySelector('.glossary-letter-clear');
          if (clearBtn) {
            clearBtn.style.display = selectedLetter ? 'inline-flex' : 'none';
            if (selectedLetter) {
              clearBtn.addEventListener('click', function() {
                selectedLetter = null;
                updateLetterButtons();
                updateActiveFilters();
                renderTerms();
                this.style.display = 'none';
              });
            }
          }
        });
      });
    }

    // Initial render
    updateCategoryButtons();
    updateActiveFilters();
    renderTerms();
    
    // Initialize side nav after terms are rendered
    setTimeout(() => {
      initSideNav();
      updateSideNavActiveFromScroll();
    }, 300);

    // Handle window resize for truncation checking
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        document.querySelectorAll('.glossary-definition').forEach(def => {
          const term = def.dataset.term;
          const isExpanded = expandedTerms.has(term);
          if (!isExpanded) {
            const isTruncated = checkTruncation(def);
            const toggleBtn = def.parentElement.querySelector('.toggle-definition');
            if (toggleBtn) {
              toggleBtn.style.display = isTruncated ? 'flex' : 'none';
            }
          }
        });
      }, 250);
    });
  }

  // Initialize side navigation
  function initSideNav() {
    const sideNavList = document.getElementById('glossary-letter-nav-list');
    if (!sideNavList) return;
    
    // Get letters from currently visible sections
    const visibleSections = Array.from(document.querySelectorAll('.glossary-letter-section'))
      .map(section => section.id.replace('letter-', ''))
      .filter(Boolean)
      .sort();
    
    // If no visible sections, use all unique letters
    const letters = visibleSections.length > 0 ? visibleSections : getUniqueLetters();
    
    const navHTML = letters.map(letter => `
      <li>
        <a
          href="#letter-${letter}"
          class="glossary-letter-nav-link"
          data-letter="${letter}"
          aria-label="Jump to letter ${letter}"
        >
          <span class="glossary-letter-nav-indicator" aria-hidden="true"></span>
          ${letter}
        </a>
      </li>
    `).join('');
    sideNavList.innerHTML = navHTML;

    // Handle side nav clicks
    sideNavList.querySelectorAll('.glossary-letter-nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const letter = this.dataset.letter;
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update active state
          updateSideNavActive(letter);
        }
      });
    });

  }

  // Update active state in side nav
  function updateSideNavActive(letter) {
    const sideNavList = document.getElementById('glossary-letter-nav-list');
    if (!sideNavList) return;
    
    sideNavList.querySelectorAll('.glossary-letter-nav-link').forEach(link => {
      if (link.dataset.letter === letter) {
        link.classList.add('glossary-letter-nav-link-active');
      } else {
        link.classList.remove('glossary-letter-nav-link-active');
      }
    });
  }

  // Update active state based on scroll position
  function updateSideNavActiveFromScroll() {
    const letterSections = document.querySelectorAll('.glossary-letter-section');
    if (letterSections.length === 0) return;

    const scrollPosition = window.scrollY + 150; // Offset for header
    let activeLetter = null;

    letterSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      
      if (scrollPosition >= sectionTop - 100) { // 100px threshold
        const letter = section.id.replace('letter-', '');
        activeLetter = letter;
      }
    });

    if (activeLetter) {
      updateSideNavActive(activeLetter);
    }
  }

  // Set up scroll handler for side nav visibility (global, only once)
  let scrollTimeout;
  const scrollThreshold = 300; // Show nav after scrolling 300px
  
  function handleGlossaryScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (typeof updateSideNavActiveFromScroll === 'function') {
        updateSideNavActiveFromScroll();
      }
      
      // Show/hide side nav based on scroll position
      const sideNav = document.getElementById('glossary-side-nav');
      if (sideNav) {
        if (window.scrollY > scrollThreshold) {
          sideNav.classList.add('visible');
        } else {
          sideNav.classList.remove('visible');
        }
      }
    }, 100);
  }
  
  // Wait for DOM and glossary data to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      init();
      // Initialize side nav after terms are rendered
      setTimeout(initSideNav, 500);
      // Set up scroll handler
      window.addEventListener('scroll', handleGlossaryScroll);
      // Initial check
      setTimeout(handleGlossaryScroll, 600);
    });
  } else {
    init();
    // Initialize side nav after terms are rendered
    setTimeout(initSideNav, 500);
    // Set up scroll handler
    window.addEventListener('scroll', handleGlossaryScroll);
    // Initial check
    setTimeout(handleGlossaryScroll, 600);
  }
})();

