// SDS page functionality - Mirrored from Glossary
(function() {
  'use strict';

  let searchQuery = '';
  let selectedLetter = null;
  let sdsItems = [];

  // Parse SDS data from the hidden HTML structure
  function parseSDSData() {
    const dataContainer = document.getElementById('sds-data');
    if (!dataContainer) return [];

    const items = [];
    const listItems = dataContainer.querySelectorAll('li');
    
    listItems.forEach(li => {
      const toggle = li.querySelector('.toggle');
      const letter = toggle ? toggle.querySelector('strong')?.textContent.trim() : null;
      const linksContainer = li.querySelector('.sds-links');
      
      if (letter && linksContainer) {
        const links = linksContainer.querySelectorAll('a');
        links.forEach(link => {
          items.push({
            name: link.textContent.trim(),
            url: link.getAttribute('href'),
            letter: letter
          });
        });
      }
    });

    return items;
  }

  // Get unique first letters for A-Z navigation
  function getUniqueLetters() {
    const letters = new Set();
    sdsItems.forEach(item => {
      letters.add(item.letter);
    });
    return Array.from(letters).sort();
  }

  // Filter SDS items based on search and letter
  function filterSDSItems() {
    let filtered = sdsItems;

    // Filter by letter
    if (selectedLetter) {
      filtered = filtered.filter(item => item.letter === selectedLetter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query)
      );
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Group items by first letter for display
  function groupItemsByLetter(items) {
    const grouped = {};
    items.forEach(item => {
      const letter = item.letter;
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(item);
    });
    return grouped;
  }

  // Render SDS items
  function renderSDSItems() {
    const container = document.getElementById('sds-items-container');
    if (!container) return;

    const filtered = filterSDSItems();
    const grouped = groupItemsByLetter(filtered);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="sds-empty">
          <h3 class="sds-empty-title">No SDS found</h3>
          <p class="sds-empty-text">Try adjusting your search or filter criteria.</p>
        </div>
      `;
      return;
    }

    let html = '';
    const letters = Object.keys(grouped).sort();

    letters.forEach(letter => {
      html += `<div class="sds-letter-section" id="sds-letter-${letter}">`;
      html += `<h2 class="sds-letter-heading">${letter}</h2>`;
      html += `<div class="sds-items-grid">`;
      
      grouped[letter].forEach(item => {
        const highlightClass = searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
          ? 'sds-item-highlight' 
          : '';
        
        html += `
          <div class="sds-item-card ${highlightClass}">
            <a href="${item.url}" class="sds-item-link" target="_blank" rel="noopener noreferrer">
              <h3 class="sds-item-title">${item.name}</h3>
            </a>
          </div>
        `;
      });
      
      html += `</div></div>`;
    });

    container.innerHTML = html;
    updateResultsCount(filtered.length);
  }

  // Update results count
  function updateResultsCount(count) {
    const countEl = document.getElementById('sds-results-count');
    const textEl = document.getElementById('sds-results-text');
    
    if (countEl) countEl.textContent = count;
    if (textEl) {
      textEl.textContent = count === 1 ? 'SDS found' : 'SDS found';
    }
  }

  // Update letter buttons
  function updateLetterButtons() {
    const buttons = document.querySelectorAll('.sds-letter-btn');
    buttons.forEach(btn => {
      if (btn.dataset.letter === selectedLetter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Initialize A-Z navigation
  function initLetterNavigation() {
    const letterContainer = document.getElementById('sds-letters');
    if (!letterContainer) return;

    const letters = getUniqueLetters();
    let html = '<span class="sds-letters-label">Jump to:</span>';
    
    letters.forEach(letter => {
      html += `<button class="sds-letter-btn" data-letter="${letter}">${letter}</button>`;
    });
    
    html += '<button class="sds-letter-clear" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Clear</button>';
    
    letterContainer.innerHTML = html;
    letterContainer.classList.remove('hidden');

    // Add event listeners
    document.querySelectorAll('.sds-letter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const letter = this.dataset.letter;
        if (selectedLetter === letter) {
          selectedLetter = null;
        } else {
          selectedLetter = letter;
          searchQuery = '';
          const searchInput = document.getElementById('sds-search');
          if (searchInput) searchInput.value = '';
          updateSearchClear();
        }
        updateLetterButtons();
        renderSDSItems();
        
        // Show/hide clear button
        const clearBtn = document.querySelector('.sds-letter-clear');
        if (clearBtn) {
          clearBtn.style.display = selectedLetter ? 'inline-flex' : 'none';
          if (selectedLetter) {
            clearBtn.onclick = function() {
              selectedLetter = null;
              updateLetterButtons();
              renderSDSItems();
              this.style.display = 'none';
            };
          }
        }

        // Scroll to letter section with offset for fixed navigation
        if (selectedLetter) {
          const section = document.getElementById(`sds-letter-${letter}`);
          if (section) {
            const offset = 120; // Account for fixed navigation header
            const topPosition = section.offsetTop - offset;
            window.scrollTo({
              top: topPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // Update search clear button
  function updateSearchClear() {
    const clearBtn = document.getElementById('sds-search-clear');
    if (clearBtn) {
      clearBtn.style.display = searchQuery.trim() ? 'flex' : 'none';
    }
  }

  // Initialize side navigation
  function initSideNav() {
    const sideNav = document.getElementById('sds-side-nav');
    if (!sideNav) return;

    const letters = getUniqueLetters();
    const navList = document.getElementById('sds-letter-nav-list');
    if (!navList) return;

    navList.innerHTML = '';
    letters.forEach(letter => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#sds-letter-${letter}`;
      a.className = 'sds-letter-nav-link';
      a.textContent = letter;
      a.setAttribute('data-letter', letter);
      
      const indicator = document.createElement('span');
      indicator.className = 'sds-letter-nav-indicator';
      a.appendChild(indicator);
      
      a.addEventListener('click', function(e) {
        e.preventDefault();
        selectedLetter = letter;
        searchQuery = '';
        const searchInput = document.getElementById('sds-search');
        if (searchInput) searchInput.value = '';
        updateSearchClear();
        updateLetterButtons();
        renderSDSItems();
        updateSideNav();
        
        const section = document.getElementById(`sds-letter-${letter}`);
        if (section) {
          const offset = 120; // Account for fixed navigation header
          const topPosition = section.offsetTop - offset;
          window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
          });
        }
      });
      
      li.appendChild(a);
      navList.appendChild(li);
    });

    // Show side nav on desktop
    if (window.innerWidth >= 1280) {
      sideNav.classList.add('visible');
    }

    // Update on scroll
    window.addEventListener('scroll', updateSideNavFromScroll);
  }

  // Update side nav active state from scroll
  function updateSideNavFromScroll() {
    const sections = document.querySelectorAll('.sds-letter-section');
    const navLinks = document.querySelectorAll('.sds-letter-nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section.id.replace('sds-letter-', '');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('data-letter') === currentSection) {
        link.classList.add('sds-letter-nav-link-active');
      } else {
        link.classList.remove('sds-letter-nav-link-active');
      }
    });
  }

  // Update side nav
  function updateSideNav() {
    const navLinks = document.querySelectorAll('.sds-letter-nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('data-letter') === selectedLetter) {
        link.classList.add('sds-letter-nav-link-active');
      } else {
        link.classList.remove('sds-letter-nav-link-active');
      }
    });
  }

  // Initialize
  function init() {
    // Parse SDS data
    sdsItems = parseSDSData();
    
    // Update total count
    const totalCountEl = document.getElementById('sds-total-count');
    if (totalCountEl) {
      totalCountEl.textContent = sdsItems.length;
    }

    // Search input
    const searchInput = document.getElementById('sds-search');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        searchQuery = this.value;
        selectedLetter = null; // Clear letter filter when searching
        updateLetterButtons();
        updateSearchClear();
        
        // Hide letter navigation when searching
        const letterContainer = document.getElementById('sds-letters');
        if (letterContainer) {
          if (searchQuery.trim()) {
            letterContainer.classList.add('hidden');
          } else {
            letterContainer.classList.remove('hidden');
          }
        }
        
        renderSDSItems();
      });
    }

    // Search clear button
    const searchClear = document.getElementById('sds-search-clear');
    if (searchClear) {
      searchClear.addEventListener('click', function() {
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        updateSearchClear();
        
        const letterContainer = document.getElementById('sds-letters');
        if (letterContainer) {
          letterContainer.classList.remove('hidden');
        }
        
        renderSDSItems();
      });
    }

    // Initialize letter navigation
    initLetterNavigation();

    // Initial render
    renderSDSItems();
    
    // Initialize side nav after items are rendered
    setTimeout(() => {
      initSideNav();
      updateSideNavFromScroll();
    }, 300);

    // Handle window resize for side nav visibility
    window.addEventListener('resize', function() {
      const sideNav = document.getElementById('sds-side-nav');
      if (sideNav) {
        if (window.innerWidth >= 1280) {
          sideNav.classList.add('visible');
        } else {
          sideNav.classList.remove('visible');
        }
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
