/* ============================================================================
   PACE Inline Search Overlay
   ----------------------------------------------------------------------------
   Tier-1 search UX rebuild:
     - Cmd/Ctrl+K (or `/`) opens an inline overlay anywhere on the site
     - Type-ahead with 150ms debounce
     - Results grouped by category (Equipment, Consumables, Guides, etc.)
     - Recent searches stored in localStorage (last 5)
     - Popular searches as empty-state fallback
     - Keyboard nav: ↑/↓ to move, Enter to open, Esc to close
     - Mobile: full-screen overlay
     - Reuses the existing search index from /js/search.js (window.PACE_SEARCH_DATA)
     - /search.html stays as a fallback for direct visits + "View all results"
   ============================================================================ */
(function () {
    'use strict';

    // Self-inject the overlay stylesheet if the host page didn't include it.
    // Most pages link /css/components/search-overlay.css themselves; this
    // fallback prevents an unstyled overlay rendering below the footer on
    // pages that loaded the script but not the CSS.
    (function ensureStylesheet() {
        var href = '/css/components/search-overlay.css';
        var existing = document.querySelector(
            'link[rel="stylesheet"][href="' + href + '"], ' +
            'link[rel="stylesheet"][href$="/css/components/search-overlay.css"]'
        );
        if (existing) return;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    })();

    var STORAGE_KEY = 'pace_search_recent_v1';
    var MAX_RECENT = 5;
    var DEBOUNCE_MS = 150;
    var MAX_RESULTS_PER_GROUP = 5;
    var MAX_TOTAL_RESULTS = 30;

    // Hardcoded popular searches — replace with analytics-driven list later
    var POPULAR_SEARCHES = [
        'Stainless steel preparation',
        'Diamond suspensions',
        'PICO precision saw',
        'Aluminum preparation',
        'Grinding papers',
        'Vibratory polisher'
    ];

    // Group order + display labels. URL patterns map a result to a group.
    var GROUPS = [
        { key: 'equipment',   label: 'Equipment',   test: function (r) { return /^\/metallographic-equipment\//i.test(r.link); } },
        { key: 'consumables', label: 'Consumables', test: function (r) { return /^\/metallographic-consumables\//i.test(r.link) || r.type === 'consumables'; } },
        { key: 'guide',       label: 'Guides',      test: function (r) { return r.type === 'guide' || /^\/guides(\/|\.html|$)/i.test(r.link); } },
        { key: 'material',    label: 'Materials',   test: function (r) { return /^\/materials(\/|\.html|$)/i.test(r.link); } },
        { key: 'tool',        label: 'Tools',       test: function (r) { return /^\/tools\//i.test(r.link) || /^\/etchant-selector\.html$/i.test(r.link); } },
        { key: 'document',    label: 'Documents',   test: function (r) { return /^\/support\//i.test(r.link) || /^\/catalog\.html$/i.test(r.link); } },
        { key: 'other',       label: 'More',        test: function () { return true; } } // catch-all
    ];

    // --- State ---
    var overlay = null;
    var input = null;
    var resultsContainer = null;
    var emptyContainer = null;
    var indexLoaded = false;
    var indexPromise = null;
    var currentResults = [];
    var activeIndex = -1;
    var debounceTimer = null;

    // --- Index loading (lazy) ---
    function loadIndex() {
        if (indexLoaded && window.PACE_SEARCH_DATA) return Promise.resolve(window.PACE_SEARCH_DATA);
        if (indexPromise) return indexPromise;

        indexPromise = new Promise(function (resolve, reject) {
            if (window.PACE_SEARCH_DATA) {
                indexLoaded = true;
                return resolve(window.PACE_SEARCH_DATA);
            }
            var script = document.createElement('script');
            script.src = '/js/search.js';
            script.defer = false;
            script.onload = function () {
                indexLoaded = !!window.PACE_SEARCH_DATA;
                if (indexLoaded) resolve(window.PACE_SEARCH_DATA);
                else reject(new Error('Search index loaded but PACE_SEARCH_DATA not set'));
            };
            script.onerror = function () { reject(new Error('Failed to load search index')); };
            document.head.appendChild(script);
        });
        return indexPromise;
    }

    // --- Query normalization (stopwords + aliases) ---

    // Common English stopwords stripped from queries so natural-language
    // phrases like "grinder for titanium" don't fail because "for" is not in
    // any page's content.
    var STOPWORDS = {
        'a': 1, 'an': 1, 'and': 1, 'are': 1, 'as': 1, 'at': 1, 'be': 1,
        'by': 1, 'for': 1, 'from': 1, 'how': 1, 'in': 1, 'is': 1, 'it': 1,
        'of': 1, 'on': 1, 'or': 1, 'that': 1, 'the': 1, 'this': 1, 'to': 1,
        'was': 1, 'what': 1, 'when': 1, 'where': 1, 'which': 1, 'with': 1
    };

    // Industry shorthand → canonical term. Searching either form surfaces the
    // same category pages (e.g. "SiC" surfaces silicon carbide grinding pages,
    // "SS" surfaces stainless-steel preparation, "grinder" surfaces grinding).
    var ALIASES = {
        'sic':       'silicon carbide',
        'ss':        'stainless steel',
        'alo':       'alumina',
        'al2o3':     'alumina',
        'dia':       'diamond',
        'cmp':       'colloidal silica',
        'hf':        'hydrofluoric',
        'ti':        'titanium',
        'al':        'aluminum',
        'cu':        'copper',
        'ni':        'nickel',
        'fe':        'iron',
        'grinder':   'grinding',
        'polisher':  'polishing',
        'cutter':    'cutting',
        'mounter':   'mounting',
        'msds':      'sds'
    };

    function stripStopwords(q) {
        return q.split(/\s+/).filter(function (t) {
            return t && !STOPWORDS[t];
        }).join(' ');
    }

    function tokenInHay(token, hay) {
        if (hay.indexOf(token) >= 0) return true;
        var alias = ALIASES[token];
        return !!(alias && hay.indexOf(alias) >= 0);
    }

    // --- Scoring + matching ---
    function scoreResult(entry, query) {
        if (!query) return 0;
        var q = query.toLowerCase();
        var title = (entry.title || '').toLowerCase();
        var desc = (entry.description || '').toLowerCase();
        var kw = (entry.keywords || '').toLowerCase();
        var score = 0;

        // Direct query match against title/keywords/description
        if (title === q) score += 100;
        else if (title.indexOf(q) === 0) score += 60;
        else if (title.indexOf(q) >= 0) score += 40;
        if (kw.indexOf(q) >= 0) score += 20;
        if (desc.indexOf(q) >= 0) score += 10;

        var tokens = q.split(/\s+/).filter(Boolean);

        // Single-token alias fallback: e.g. "sic" with no direct hit retries
        // against "silicon carbide" so SiC searches surface the right pages.
        if (score === 0 && tokens.length === 1 && ALIASES[tokens[0]]) {
            var a = ALIASES[tokens[0]];
            if (title.indexOf(a) === 0) score += 50;
            else if (title.indexOf(a) >= 0) score += 35;
            if (kw.indexOf(a) >= 0) score += 18;
            if (desc.indexOf(a) >= 0) score += 8;
        }

        // Multi-word query: every token must hit somewhere (alias-aware)
        if (tokens.length > 1) {
            var hay = title + ' ' + kw + ' ' + desc;
            var missed = tokens.some(function (t) { return !tokenInHay(t, hay); });
            if (missed) return 0;
            score += tokens.length * 5; // bonus for matching all tokens
        }

        // Consumables-page boost for brand/chemistry queries.
        // When the query matched only in keywords/description (no title hit),
        // the searcher is almost certainly looking for a product (e.g.
        // "colloidal silica", "SIAMAT", "DIAMAT", "MAXCUT") rather than a piece
        // of equipment that happens to mention the chemical. Push consumables
        // pages above equipment pages in that case.
        if (score > 0 && title.indexOf(q) < 0 &&
            /^\/metallographic-consumables\//i.test(entry.link || '')) {
            score += 15;
        }

        return score;
    }

    function search(query) {
        if (!window.PACE_SEARCH_DATA) return [];
        var qOrig = (query || '').toLowerCase();
        // SDS sheets (priority: "low") stay hidden unless the user explicitly
        // searches for them. "MSDS" is the older term for "SDS".
        var allowSds = /\b(?:sds|msds)\b/.test(qOrig);
        // Strip stopwords before scoring. Fall back to the original query if
        // stripping leaves nothing (query was entirely stopwords).
        var qNorm = stripStopwords(qOrig) || qOrig;
        var results = [];
        for (var i = 0; i < window.PACE_SEARCH_DATA.length; i++) {
            var entry = window.PACE_SEARCH_DATA[i];
            if (!allowSds && entry.priority === 'low') continue;
            var s = scoreResult(entry, qNorm);
            if (s > 0) results.push({ entry: entry, score: s });
        }
        results.sort(function (a, b) { return b.score - a.score; });
        return results.slice(0, MAX_TOTAL_RESULTS).map(function (r) { return r.entry; });
    }

    function groupResults(results) {
        var buckets = {};
        var order = [];
        for (var i = 0; i < results.length; i++) {
            var r = results[i];
            var assigned = false;
            for (var g = 0; g < GROUPS.length; g++) {
                if (GROUPS[g].test(r)) {
                    if (!buckets[GROUPS[g].key]) {
                        buckets[GROUPS[g].key] = { label: GROUPS[g].label, items: [] };
                        order.push(GROUPS[g].key);
                    }
                    if (buckets[GROUPS[g].key].items.length < MAX_RESULTS_PER_GROUP) {
                        buckets[GROUPS[g].key].items.push(r);
                    }
                    assigned = true;
                    break;
                }
            }
        }
        return order.map(function (key) { return buckets[key]; });
    }

    // --- Recent searches ---
    function getRecent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            var arr = JSON.parse(raw);
            return Array.isArray(arr) ? arr.slice(0, MAX_RECENT) : [];
        } catch (e) { return []; }
    }

    function pushRecent(query) {
        if (!query || query.length < 2) return;
        try {
            var current = getRecent().filter(function (q) { return q.toLowerCase() !== query.toLowerCase(); });
            current.unshift(query);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, MAX_RECENT)));
        } catch (e) { /* localStorage blocked — fine */ }
    }

    // --- Rendering ---
    function escapeHTML(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
        });
    }

    function highlight(text, query) {
        if (!query) return escapeHTML(text);
        var safe = escapeHTML(text);
        var q = query.trim();
        if (!q) return safe;
        var tokens = q.split(/\s+/).filter(function (t) { return t.length > 1; });
        if (!tokens.length) return safe;
        var re = new RegExp('(' + tokens.map(function (t) {
            return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }).join('|') + ')', 'gi');
        return safe.replace(re, '<mark>$1</mark>');
    }

    function renderResults(query) {
        if (!resultsContainer) return;
        currentResults = [];
        activeIndex = -1;

        if (!query) {
            resultsContainer.innerHTML = '';
            renderEmpty();
            return;
        }

        var results = search(query);
        currentResults = results;
        if (!results.length) {
            resultsContainer.innerHTML = '<div class="search-overlay-noresults">' +
                'No results for <strong>' + escapeHTML(query) + '</strong>.' +
                ' <a href="/search.html?q=' + encodeURIComponent(query) + '">Try the full search page</a>.' +
                '</div>';
            return;
        }

        var groups = groupResults(results);
        var html = '';
        var idx = 0;
        for (var i = 0; i < groups.length; i++) {
            var g = groups[i];
            html += '<div class="search-overlay-group">';
            html += '<div class="search-overlay-group-label">' + escapeHTML(g.label) + '</div>';
            html += '<ul class="search-overlay-list" role="listbox">';
            for (var j = 0; j < g.items.length; j++) {
                var r = g.items[j];
                html += '<li role="option" class="search-overlay-item" data-idx="' + idx + '" data-link="' + escapeHTML(r.link) + '">' +
                    '<div class="search-overlay-item-title">' + highlight(r.title, query) + '</div>' +
                    (r.description ? '<div class="search-overlay-item-desc">' + highlight(r.description, query) + '</div>' : '') +
                    '</li>';
                idx++;
            }
            html += '</ul></div>';
        }
        html += '<div class="search-overlay-viewall">' +
            '<a href="/search.html?q=' + encodeURIComponent(query) + '">View all results for "' + escapeHTML(query) + '" →</a>' +
            '</div>';
        resultsContainer.innerHTML = html;
        emptyContainer.hidden = true;
        resultsContainer.hidden = false;
    }

    function renderEmpty() {
        resultsContainer.hidden = true;
        emptyContainer.hidden = false;
        var recent = getRecent();
        var html = '';
        if (recent.length) {
            html += '<div class="search-overlay-section"><div class="search-overlay-section-label">Recent</div><ul class="search-overlay-chips">';
            html += recent.map(function (q) {
                return '<li><button type="button" class="search-overlay-chip" data-query="' + escapeHTML(q) + '">' + escapeHTML(q) + '</button></li>';
            }).join('');
            html += '</ul></div>';
        }
        html += '<div class="search-overlay-section"><div class="search-overlay-section-label">Popular searches</div><ul class="search-overlay-chips">';
        html += POPULAR_SEARCHES.map(function (q) {
            return '<li><button type="button" class="search-overlay-chip" data-query="' + escapeHTML(q) + '">' + escapeHTML(q) + '</button></li>';
        }).join('');
        html += '</ul></div>';
        emptyContainer.innerHTML = html;
    }

    // --- Keyboard navigation ---
    function setActive(idx) {
        var items = resultsContainer.querySelectorAll('.search-overlay-item');
        if (!items.length) return;
        if (idx < 0) idx = items.length - 1;
        if (idx >= items.length) idx = 0;
        activeIndex = idx;
        items.forEach(function (el, i) {
            if (i === idx) {
                el.classList.add('is-active');
                el.scrollIntoView({ block: 'nearest' });
            } else {
                el.classList.remove('is-active');
            }
        });
    }

    function openActive() {
        var items = resultsContainer.querySelectorAll('.search-overlay-item');
        if (!items.length) return;
        var target = activeIndex >= 0 ? items[activeIndex] : items[0];
        var link = target.getAttribute('data-link');
        if (link) {
            pushRecent(input.value);
            window.location.href = link;
        }
    }

    // --- Open / close ---
    function open() {
        if (!overlay) build();
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(function () { input.focus(); input.select(); }, 50);
        loadIndex().then(function () {
            renderResults(input.value);
        }).catch(function (e) {
            console.warn('PACE search:', e.message);
        });
    }

    function close() {
        if (!overlay) return;
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // --- Build overlay DOM ---
    function build() {
        if (overlay) return;
        overlay = document.createElement('div');
        overlay.id = 'pace-search-overlay';
        overlay.className = 'search-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Search PACE Technologies');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML =
            '<div class="search-overlay-backdrop" data-close></div>' +
            '<div class="search-overlay-panel" role="document">' +
                '<div class="search-overlay-inputwrap">' +
                    '<svg class="search-overlay-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                        '<circle cx="11" cy="11" r="8"/>' +
                        '<line x1="21" y1="21" x2="16.65" y2="16.65"/>' +
                    '</svg>' +
                    '<input type="search" id="pace-search-overlay-input" class="search-overlay-input" placeholder="Search equipment, consumables, guides…" autocomplete="off" spellcheck="false" aria-label="Search PACE Technologies">' +
                    '<kbd class="search-overlay-esc">Esc</kbd>' +
                    '<button type="button" class="search-overlay-close" data-close aria-label="Close search">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
                    '</button>' +
                '</div>' +
                '<div class="search-overlay-body">' +
                    '<div class="search-overlay-empty" id="pace-search-overlay-empty"></div>' +
                    '<div class="search-overlay-results" id="pace-search-overlay-results" hidden></div>' +
                '</div>' +
                '<div class="search-overlay-footer">' +
                    '<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>' +
                    '<span><kbd>↵</kbd> open</span>' +
                    '<span><kbd>esc</kbd> close</span>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        input = overlay.querySelector('#pace-search-overlay-input');
        resultsContainer = overlay.querySelector('#pace-search-overlay-results');
        emptyContainer = overlay.querySelector('#pace-search-overlay-empty');

        // Input listener
        input.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            var q = input.value;
            debounceTimer = setTimeout(function () { renderResults(q); }, DEBOUNCE_MS);
        });

        // Result clicks (event delegation)
        overlay.addEventListener('click', function (e) {
            var closeEl = e.target.closest('[data-close]');
            if (closeEl) { close(); return; }
            var chip = e.target.closest('.search-overlay-chip');
            if (chip) {
                input.value = chip.getAttribute('data-query');
                renderResults(input.value);
                input.focus();
                return;
            }
            var item = e.target.closest('.search-overlay-item');
            if (item) {
                var link = item.getAttribute('data-link');
                if (link) {
                    pushRecent(input.value);
                    window.location.href = link;
                }
            }
        });

        // Keyboard navigation
        overlay.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { e.preventDefault(); close(); return; }
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIndex + 1); return; }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIndex - 1); return; }
            if (e.key === 'Enter') {
                e.preventDefault();
                if (currentResults.length) {
                    openActive();
                } else if (input.value.trim()) {
                    // Fallback: go to full search page
                    pushRecent(input.value);
                    window.location.href = '/search.html?q=' + encodeURIComponent(input.value.trim());
                }
            }
        });
    }

    // --- Global triggers ---
    function shouldIgnoreHotkey(e) {
        var t = e.target;
        if (!t) return false;
        var tag = t.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t.isContentEditable;
    }

    document.addEventListener('keydown', function (e) {
        // Cmd/Ctrl + K
        if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            if (overlay && overlay.classList.contains('is-open')) close();
            else open();
        }
        // "/" — only when not typing in another field
        if (e.key === '/' && !shouldIgnoreHotkey(e)) {
            e.preventDefault();
            open();
        }
    });

    // Wire up triggers on DOM ready
    function init() {
        // Desktop search icon: <a href="/search.html" class="nav-icon" aria-label="Search">
        // Mobile search button:  <a href="/search.html" class="mobile-action-btn mobile-action-btn-secondary">
        var triggers = document.querySelectorAll('[data-search-trigger], .nav-icon[aria-label="Search"], a[href="/search.html"]');
        triggers.forEach(function (el) {
            el.addEventListener('click', function (e) {
                // Allow Cmd/Ctrl-click to fall through to the fallback page
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
                e.preventDefault();
                open();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
