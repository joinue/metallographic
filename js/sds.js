// SDS page functionality
// State: search query, selected A-Z letter, selected category.
// Items are parsed from the hidden HTML data block; each <a> carries
// data-category and data-hazards attributes (see sds.html for vocab).
(function() {
  'use strict';

  let searchQuery = '';
  let selectedLetter = null;
  let selectedCategory = null;
  let sdsItems = [];

  // --- Category metadata ---------------------------------------------------
  // Order here drives chip display order. Labels are user-facing; descriptions
  // are short hover/aria hints.
  const CATEGORIES = [
    { id: 'etchants',   label: 'Etchants & Reagents',  description: 'Chemical etchants for microstructure development' },
    { id: 'mounting',   label: 'Mounting Resins',      description: 'Acrylics, epoxies, phenolics, polyesters, mold release' },
    { id: 'abrasives',  label: 'Abrasives & Polishing', description: 'Diamond, alumina, silica, SiC, ceria — powders, slurries, films' },
    { id: 'cutting',    label: 'Cutting Consumables',   description: 'Abrasive blades and cutting fluids' },
    { id: 'lubricants', label: 'Lubricants & Coolants', description: 'Lapping film lubes and anti-corrosion fluids' },
    { id: 'cleaners',   label: 'Cleaners & Maintenance', description: 'Degreasers, dressing sticks, filter oils' }
  ];

  // --- Hazard metadata -----------------------------------------------------
  // Each hazard has a label, short description, and a color class hook
  // (styled in sds.css as .sds-hazard-<id>).
  const HAZARDS = {
    corrosive: { label: 'Corrosive', title: 'Can cause skin burns, eye damage, or corrode metals.' },
    flammable: { label: 'Flammable', title: 'Burns readily — keep away from heat, sparks, and open flame.' },
    toxic:     { label: 'Toxic',     title: 'Acute or chronic toxicity — avoid inhalation, ingestion, and skin contact.' },
    irritant:  { label: 'Irritant',  title: 'May irritate skin, eyes, or respiratory tract on contact.' }
  };

  // --- Search synonyms -----------------------------------------------------
  // When a user types a token on the left, we also match items containing any
  // of the terms on the right. Bidirectional pairs are listed both ways for
  // clarity. Use lowercase keys; matching is case-insensitive.
  const SYNONYMS = {
    'msds':           [''], // treat "MSDS" same as no extra term
    'sds':            [''], // ignore the word itself in queries like "epoxy sds"
    'pdf':            [''],
    'lube':           ['lubricant', 'lubricants', 'lubrication'],
    'lubricant':      ['lube'],
    'lubricants':     ['lube'],
    'etch':           ['etchant', 'etching', 'reagent'],
    'etchant':        ['etch', 'reagent'],
    'reagent':        ['etchant', 'etch'],
    'coolant':        ['cutting', 'fluid'],
    'sic':            ['silicon carbide'],
    'silicon':        ['sic'],
    'colloidal':      ['siamat'],
    'silica':         ['siamat', 'colloidal'],
    'diamond':        ['diamat'],
    'diamat':         ['diamond'],
    'alumina':        ['nano', 'aluminum oxide'],
    'mount':          ['mounting', 'resin', 'epoxy', 'acrylic'],
    'mounting':       ['mount', 'resin'],
    'resin':          ['mounting', 'epoxy', 'acrylic'],
    'powder':         ['powders'],
    'powders':        ['powder'],
    'slurry':         ['suspension'],
    'suspension':     ['slurry'],
    'film':           ['films', 'lapping'],
    'films':          ['film', 'lapping'],
    'paper':          ['papers', 'grinding'],
    'papers':         ['paper', 'grinding'],
    'blade':          ['blades'],
    'blades':         ['blade'],
    'kmno4':          ['permanganate', 'wecks'],
    'permanganate':   ['kmno4'],
    'naoh':           ['sodium hydroxide', 'caustic'],
    'hf':             ['hydrofluoric'],
    'hardener':       ['hardeners'],
    'hardeners':      ['hardener']
  };

  // Tokens we silently drop from queries (filler words that hurt precision).
  const STOPWORDS = new Set(['the', 'a', 'an', 'for', 'and', 'or', 'of']);

  // --- Data parsing --------------------------------------------------------
  function parseSDSData() {
    const dataContainer = document.getElementById('sds-data');
    if (!dataContainer) return [];

    const items = [];
    dataContainer.querySelectorAll('li').forEach(li => {
      const toggle = li.querySelector('.toggle');
      const letter = toggle ? (toggle.querySelector('strong')?.textContent || '').trim() : '';
      const links = li.querySelectorAll('.sds-links a');

      links.forEach(link => {
        const hazardsAttr = (link.getAttribute('data-hazards') || '').trim();
        items.push({
          name: link.textContent.trim(),
          url: link.getAttribute('href'),
          letter: letter,
          category: (link.getAttribute('data-category') || '').trim(),
          hazards: hazardsAttr ? hazardsAttr.split(/\s+/).filter(Boolean) : []
        });
      });
    });

    return items;
  }

  // --- Letter and category helpers ----------------------------------------
  function getUniqueLetters() {
    const letters = new Set();
    sdsItems.forEach(item => letters.add(item.letter));
    return Array.from(letters).sort();
  }

  function getCategoryCounts() {
    const counts = {};
    sdsItems.forEach(item => {
      if (!item.category) return;
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }

  function getCategoryMeta(id) {
    return CATEGORIES.find(c => c.id === id) || null;
  }

  // --- Search engine -------------------------------------------------------
  // Normalize: lowercase, strip non-alphanumerics to spaces, collapse spaces.
  function normalize(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Expand a token via the synonym map. Returns an array of alternate terms
  // that should also be accepted for this token (the original is implicit).
  function expandToken(token) {
    return SYNONYMS[token] || [];
  }

  // Tokenize a query into useful search tokens.
  function tokenize(query) {
    return normalize(query).split(' ').filter(t => t && !STOPWORDS.has(t));
  }

  // Does a token (or any of its synonyms) appear in the haystack?
  function tokenMatches(token, haystack) {
    if (!token) return true;
    if (haystack.includes(token)) return true;
    const expansions = expandToken(token);
    for (let i = 0; i < expansions.length; i++) {
      const exp = expansions[i];
      if (!exp) return true; // synonym mapped to '' means "drop this token"
      if (haystack.includes(exp)) return true;
    }
    return false;
  }

  // Lightweight Levenshtein for "did you mean" fallback. Capped at maxDist.
  function editDistance(a, b, maxDist) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > maxDist) return maxDist + 1;

    let prev = new Array(b.length + 1);
    let curr = new Array(b.length + 1);
    for (let j = 0; j <= b.length; j++) prev[j] = j;

    for (let i = 1; i <= a.length; i++) {
      curr[0] = i;
      let rowMin = curr[0];
      for (let j = 1; j <= b.length; j++) {
        const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
        if (curr[j] < rowMin) rowMin = curr[j];
      }
      if (rowMin > maxDist) return maxDist + 1;
      [prev, curr] = [curr, prev];
    }
    return prev[b.length];
  }

  // Find up to 5 items whose name is "close enough" to the query, for the
  // empty-state "did you mean" prompt.
  function findFuzzyMatches(query, limit) {
    limit = limit || 5;
    const q = normalize(query);
    if (!q) return [];
    // Allow more typos for longer queries.
    const maxDist = q.length <= 4 ? 1 : (q.length <= 8 ? 2 : 3);
    const scored = [];

    sdsItems.forEach(item => {
      const name = normalize(item.name);
      // Score against the full name and each word inside it; take the best.
      let best = editDistance(q, name, maxDist);
      name.split(' ').forEach(word => {
        if (word.length < 2) return;
        const d = editDistance(q, word, maxDist);
        if (d < best) best = d;
      });
      if (best <= maxDist) scored.push({ item, score: best });
    });

    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, limit).map(s => s.item);
  }

  // --- Filtering pipeline --------------------------------------------------
  function filterSDSItems() {
    let filtered = sdsItems;

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedLetter) {
      filtered = filtered.filter(item => item.letter === selectedLetter);
    }

    const tokens = tokenize(searchQuery);
    if (tokens.length) {
      filtered = filtered.filter(item => {
        const haystack = normalize(item.name);
        return tokens.every(t => tokenMatches(t, haystack));
      });
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  function groupItemsByLetter(items) {
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.letter]) grouped[item.letter] = [];
      grouped[item.letter].push(item);
    });
    return grouped;
  }

  // --- Rendering -----------------------------------------------------------
  function renderHazardChips(hazards) {
    if (!hazards || !hazards.length) return '';
    const chips = hazards
      .filter(h => HAZARDS[h])
      .map(h => {
        const meta = HAZARDS[h];
        return `<span class="sds-hazard-chip sds-hazard-${h}" title="${meta.title}" aria-label="Hazard: ${meta.label}">${meta.label}</span>`;
      })
      .join('');
    return `<div class="sds-hazard-chips" role="list" aria-label="Typical hazards">${chips}</div>`;
  }

  function renderCategoryBadge(categoryId) {
    const meta = getCategoryMeta(categoryId);
    if (!meta) return '';
    return `<span class="sds-cat-badge sds-cat-${categoryId}" aria-label="Category: ${meta.label}">${meta.label}</span>`;
  }

  function renderSDSItems() {
    const container = document.getElementById('sds-items-container');
    if (!container) return;

    const filtered = filterSDSItems();

    if (filtered.length === 0) {
      renderEmptyState(container);
      updateResultsCount(0);
      return;
    }

    const grouped = groupItemsByLetter(filtered);
    const letters = Object.keys(grouped).sort();
    let html = '';

    letters.forEach(letter => {
      html += `<div class="sds-letter-section" id="sds-letter-${letter}">`;
      html += `<h2 class="sds-letter-heading">${letter}</h2>`;
      html += `<div class="sds-items-grid">`;

      grouped[letter].forEach(item => {
        const highlightClass = searchQuery && normalize(item.name).includes(normalize(searchQuery))
          ? 'sds-item-highlight'
          : '';

        html += `
          <div class="sds-item-card ${highlightClass}">
            <a href="${item.url}" class="sds-item-link" target="_blank" rel="noopener noreferrer">
              <div class="sds-item-header">
                <h3 class="sds-item-title">${item.name}</h3>
                <svg class="sds-item-pdf-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div class="sds-item-meta">
                ${renderCategoryBadge(item.category)}
                ${renderHazardChips(item.hazards)}
              </div>
            </a>
          </div>
        `;
      });

      html += `</div></div>`;
    });

    container.innerHTML = html;
    updateResultsCount(filtered.length);
  }

  function renderEmptyState(container) {
    let suggestionsHtml = '';
    const tokens = tokenize(searchQuery);
    if (tokens.length) {
      const suggestions = findFuzzyMatches(searchQuery, 5);
      if (suggestions.length) {
        suggestionsHtml = `
          <div class="sds-empty-suggestions">
            <p class="sds-empty-suggestions-label">Did you mean:</p>
            <ul class="sds-empty-suggestions-list">
              ${suggestions.map(s => `
                <li><button type="button" class="sds-empty-suggestion" data-name="${s.name.replace(/"/g, '&quot;')}">${s.name}</button></li>
              `).join('')}
            </ul>
          </div>
        `;
      }
    }

    const queryLabel = searchQuery.trim()
      ? `for &ldquo;<strong>${searchQuery.trim()}</strong>&rdquo;`
      : 'with the current filters';

    container.innerHTML = `
      <div class="sds-empty">
        <svg class="sds-empty-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <h3 class="sds-empty-title">No SDS found ${queryLabel}</h3>
        <p class="sds-empty-text">Try a broader search, clear your filters, or request this SDS from our team.</p>
        ${suggestionsHtml}
        <div class="sds-empty-actions">
          <button type="button" class="sds-empty-btn sds-empty-btn-secondary" id="sds-empty-clear">Clear all filters</button>
          <a href="/contact.html?subject=SDS%20Request%20-%20${encodeURIComponent(searchQuery.trim() || 'product not listed')}" class="sds-empty-btn sds-empty-btn-primary">Request this SDS</a>
        </div>
      </div>
    `;

    // Wire up the suggestion buttons -> fill search.
    container.querySelectorAll('.sds-empty-suggestion').forEach(btn => {
      btn.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        if (!name) return;
        const input = document.getElementById('sds-search');
        if (input) {
          input.value = name;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.focus();
        }
      });
    });

    // Clear-all button.
    const clearAllBtn = container.querySelector('#sds-empty-clear');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', function() {
        clearAllFilters();
      });
    }
  }

  function updateResultsCount(count) {
    const countEl = document.getElementById('sds-results-count');
    const textEl = document.getElementById('sds-results-text');
    if (countEl) countEl.textContent = count;
    if (textEl) textEl.textContent = 'SDS found';
  }

  // --- Filter chip rendering ----------------------------------------------
  function renderCategoryChips() {
    const container = document.getElementById('sds-categories');
    if (!container) return;

    const counts = getCategoryCounts();
    let html = '<span class="sds-categories-label">Filter:</span>';
    CATEGORIES.forEach(cat => {
      const count = counts[cat.id] || 0;
      if (count === 0) return; // hide empty categories
      const active = selectedCategory === cat.id ? ' active' : '';
      html += `
        <button type="button" class="sds-category-btn sds-cat-${cat.id}${active}" data-category="${cat.id}" title="${cat.description}" aria-pressed="${selectedCategory === cat.id}">
          <span class="sds-category-btn-label">${cat.label}</span>
          <span class="sds-category-btn-count">${count}</span>
        </button>
      `;
    });
    container.innerHTML = html;

    container.querySelectorAll('.sds-category-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const cat = this.dataset.category;
        selectedCategory = (selectedCategory === cat) ? null : cat;
        renderCategoryChips();
        updateLetterButtons();
        renderSDSItems();
      });
    });
  }

  function updateLetterButtons() {
    document.querySelectorAll('.sds-letter-btn').forEach(btn => {
      if (btn.dataset.letter === selectedLetter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function initLetterNavigation() {
    const letterContainer = document.getElementById('sds-letters');
    if (!letterContainer) return;

    const letters = getUniqueLetters();
    let html = '';
    letters.forEach(letter => {
      html += `<button type="button" class="sds-letter-btn" data-letter="${letter}" aria-label="Jump to letter ${letter}">${letter}</button>`;
    });
    html += '<button type="button" class="sds-letter-clear" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Clear</button>';
    letterContainer.innerHTML = html;
    letterContainer.classList.remove('hidden');

    document.querySelectorAll('.sds-letter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const letter = this.dataset.letter;
        selectedLetter = (selectedLetter === letter) ? null : letter;
        updateLetterButtons();
        renderSDSItems();

        const clearBtn = document.querySelector('.sds-letter-clear');
        if (clearBtn) {
          clearBtn.style.display = selectedLetter ? 'inline-flex' : 'none';
        }
      });
    });

    const clearBtn = document.querySelector('.sds-letter-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        selectedLetter = null;
        updateLetterButtons();
        renderSDSItems();
        this.style.display = 'none';
      });
    }
  }

  function updateSearchClear() {
    const clearBtn = document.getElementById('sds-search-clear');
    const kbdHint = document.querySelector('.sds-search-kbd');
    const hasQuery = searchQuery.trim().length > 0;
    if (clearBtn) clearBtn.style.display = hasQuery ? 'flex' : 'none';
    if (kbdHint) kbdHint.style.display = hasQuery ? 'none' : '';
  }

  function clearAllFilters() {
    searchQuery = '';
    selectedLetter = null;
    selectedCategory = null;
    const input = document.getElementById('sds-search');
    if (input) input.value = '';
    updateSearchClear();
    const letterContainer = document.getElementById('sds-letters');
    if (letterContainer) letterContainer.classList.remove('hidden');
    renderCategoryChips();
    updateLetterButtons();
    renderSDSItems();
    const clearBtn = document.querySelector('.sds-letter-clear');
    if (clearBtn) clearBtn.style.display = 'none';
  }

  // --- Keyboard shortcut: Cmd/Ctrl+K or "/" focuses the search ------------
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      const input = document.getElementById('sds-search');
      if (!input) return;
      const isTypingTarget = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
        || document.activeElement?.isContentEditable;

      // Cmd/Ctrl+K from anywhere.
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        input.focus();
        input.select();
        return;
      }

      // "/" only when not already typing.
      if (e.key === '/' && !isTypingTarget) {
        e.preventDefault();
        input.focus();
        input.select();
        return;
      }

      // Escape clears search when search is focused.
      if (e.key === 'Escape' && document.activeElement === input) {
        if (searchQuery) {
          searchQuery = '';
          input.value = '';
          updateSearchClear();
          const letterContainer = document.getElementById('sds-letters');
          if (letterContainer) letterContainer.classList.remove('hidden');
          renderSDSItems();
        } else {
          input.blur();
        }
      }
    });

    // Adapt Cmd vs Ctrl label to platform.
    const kbdMod = document.querySelector('.sds-kbd-mod');
    if (kbdMod && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || '')) {
      kbdMod.textContent = '⌘';
    }
  }

  // --- Init ---------------------------------------------------------------
  function init() {
    sdsItems = parseSDSData();

    const totalCountEl = document.getElementById('sds-total-count');
    if (totalCountEl) totalCountEl.textContent = sdsItems.length;

    const searchInput = document.getElementById('sds-search');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        searchQuery = this.value;
        selectedLetter = null;
        updateLetterButtons();
        updateSearchClear();

        // Hide A-Z navigation when actively searching — letter grouping is
        // less useful than a flat result list.
        const letterContainer = document.getElementById('sds-letters');
        if (letterContainer) {
          if (searchQuery.trim()) letterContainer.classList.add('hidden');
          else letterContainer.classList.remove('hidden');
        }

        renderSDSItems();
      });
    }

    const searchClear = document.getElementById('sds-search-clear');
    if (searchClear) {
      searchClear.addEventListener('click', function() {
        searchQuery = '';
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        updateSearchClear();
        const letterContainer = document.getElementById('sds-letters');
        if (letterContainer) letterContainer.classList.remove('hidden');
        renderSDSItems();
      });
    }

    renderCategoryChips();
    initLetterNavigation();
    initKeyboardShortcuts();

    renderSDSItems();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
