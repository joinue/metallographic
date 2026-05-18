// Grit Size Converter
//
// Sources: ISO 6344 (FEPA P-grade), ANSI B74.12/B74.10 (Washington Mills),
//          JIS R6001 (Fine Tools / Zische), Klingspor coated abrasive data.
//
// Macrogrits (P12–P220): Same grit number used across FEPA P, ANSI/CAMI,
//   and JIS for the sizes those standards have in common. Actual particle
//   sizes differ slightly between standards at the same number.
// Microgrits (P240+): Standards diverge; equivalents matched by closest
//   particle size. "-" means no direct equivalent in that standard.
// Diamond / colloidal silica abrasives are graded by micron only; they
//   have no FEPA P / ANSI / JIS grit-number equivalent.
const bondedAbrasives = [
    // Macrogrits
    { fepa: 'P12',   ansi: '12',  jis: '12',  micron: 1815 },
    { fepa: 'P16',   ansi: '16',  jis: '16',  micron: 1324 },
    { fepa: 'P20',   ansi: '20',  jis: '20',  micron: 1000 },
    { fepa: 'P24',   ansi: '24',  jis: '24',  micron: 764 },
    { fepa: 'P30',   ansi: '30',  jis: '30',  micron: 642 },
    { fepa: 'P36',   ansi: '36',  jis: '36',  micron: 538 },
    { fepa: 'P40',   ansi: '40',  jis: '40',  micron: 425 },
    { fepa: 'P50',   ansi: '50',  jis: '50',  micron: 336 },
    { fepa: 'P60',   ansi: '60',  jis: '60',  micron: 269 },
    { fepa: 'P80',   ansi: '80',  jis: '80',  micron: 201 },
    { fepa: 'P100',  ansi: '100', jis: '100', micron: 162 },
    { fepa: 'P120',  ansi: '120', jis: '120', micron: 125 },
    { fepa: 'P150',  ansi: '150', jis: '150', micron: 100 },
    { fepa: 'P180',  ansi: '180', jis: '180', micron: 82 },
    { fepa: 'P220',  ansi: '220', jis: '220', micron: 68 },
    // Microgrits - particle-size matched (ANSI per B74.10, JIS per R6001)
    { fepa: 'P240',  ansi: '-',   jis: '280',  micron: 58.5 },
    { fepa: 'P280',  ansi: '-',   jis: '320',  micron: 52.2 },
    { fepa: 'P320',  ansi: '240', jis: '360',  micron: 46.2 },
    { fepa: 'P360',  ansi: '280', jis: '400',  micron: 40.5 },
    { fepa: 'P400',  ansi: '-',   jis: '500',  micron: 35.0 },
    { fepa: 'P500',  ansi: '320', jis: '600',  micron: 30.2 },
    { fepa: 'P600',  ansi: '-',   jis: '800',  micron: 25.8 },
    { fepa: 'P800',  ansi: '360', jis: '1000', micron: 21.8 },
    { fepa: 'P1000', ansi: '400', jis: '1200', micron: 18.3 },
    { fepa: 'P1200', ansi: '500', jis: '1500', micron: 15.3 },
    { fepa: 'P1500', ansi: '600', jis: '2000', micron: 12.6 },
    { fepa: 'P2000', ansi: '800', jis: '2500', micron: 10.3 },
    { fepa: 'P2500', ansi: '1000', jis: '3000', micron: 8.4 },
    { fepa: 'P3000', ansi: '1200', jis: '4000', micron: 6.5 },
    { fepa: 'P4000', ansi: '-',   jis: '6000',  micron: 5.0 },
    { fepa: 'P5000', ansi: '-',   jis: '8000',  micron: 4.0 },
];

// Final-polishing abrasives - graded by micron only. These are diamond
// suspensions/pastes and colloidal silica/alumina, which dominate the
// last stage of metallographic preparation.
const finalAbrasives = [
    { name: 'Diamond',          microns: [15, 9, 6, 3, 1, 0.5, 0.25, 0.1, 0.05] },
    { name: 'Colloidal silica', microns: [0.05, 0.04, 0.02] },
    { name: 'Alumina (Al₂O₃)',  microns: [1.0, 0.3, 0.05] },
];

// Map a micron value to a preparation stage.
function getStage(micron) {
    if (micron >= 60)   return { key: 'planar', label: 'Planar Grinding' };
    if (micron >= 15)   return { key: 'fine',   label: 'Fine Grinding' };
    if (micron >= 3)    return { key: 'rough',  label: 'Rough Polishing' };
    return                     { key: 'final',  label: 'Final Polishing' };
}

// Log-scale position (0–100%) for a micron value, where 0% is coarsest
// (1815 μm) and 100% is finest (0.02 μm).
function getScalePosition(micron) {
    const max = 1815, min = 0.02;
    const clamped = Math.max(min, Math.min(max, micron));
    const logMax = Math.log10(max);
    const logMin = Math.log10(min);
    const logV   = Math.log10(clamped);
    return ((logMax - logV) / (logMax - logMin)) * 100;
}

document.addEventListener('DOMContentLoaded', function() {
    const inputType   = document.getElementById('inputType');
    const inputValue  = document.getElementById('inputValue');
    const convertBtn  = document.getElementById('convertBtn');
    const clearBtn    = document.getElementById('clearBtn');
    const resultsDiv  = document.getElementById('results');
    const stageBadge  = document.getElementById('stageBadge');
    const particleScale = document.getElementById('particleScale');
    const scaleMarker = document.getElementById('scaleMarker');
    const resultsHeading = document.getElementById('resultsHeading');

    const placeholders = {
        fepa:   'e.g., P1200 or 1200',
        ansi:   'e.g., 600',
        jis:    'e.g., 1500',
        micron: 'e.g., 125, 9, 0.05',
    };

    inputType.addEventListener('change', function() {
        inputValue.placeholder = placeholders[inputType.value] || '';
        inputValue.focus();
        runConvert({ silent: true });
    });

    convertBtn.addEventListener('click', function() { runConvert({ silent: false }); });
    clearBtn.addEventListener('click', clearAll);

    inputValue.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            runConvert({ silent: false });
        }
    });

    // Live conversion (debounced, silent — no errors during typing).
    let liveTimer = null;
    inputValue.addEventListener('input', function() {
        clearTimeout(liveTimer);
        liveTimer = setTimeout(function() { runConvert({ silent: true }); }, 220);
    });

    // Quick-pick chips
    document.querySelectorAll('.quick-pick-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            inputType.value = btn.dataset.type;
            inputValue.placeholder = placeholders[inputType.value] || '';
            inputValue.value = btn.dataset.value;
            runConvert({ silent: false });
        });
    });

    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(function(btn) {
        btn.addEventListener('click', function() { handleCopy(btn); });
    });

    // Build & wire the reference table
    buildReferenceTable();

    // ---- Conversion ------------------------------------------------------

    function describeFinalAbrasives(micron) {
        const hits = [];
        finalAbrasives.forEach(function(group) {
            group.microns.forEach(function(m) {
                if (Math.abs(m - micron) / micron < 0.2) {
                    hits.push(group.name + ' ' + m + ' μm');
                }
            });
        });
        return hits;
    }

    function setResultText(id, text) {
        document.getElementById(id).textContent = text;
    }

    function clearResults() {
        resultsDiv.style.display = 'none';
        resultsDiv.querySelectorAll('.convert-error, .convert-note').forEach(function(n) { n.remove(); });
        ['result-fepa','result-ansi','result-jis','result-micron'].forEach(function(id) {
            setResultText(id, '-');
        });
        document.querySelectorAll('.results-card .result-item').forEach(function(el) {
            el.classList.remove('matched');
        });
        stageBadge.hidden = true;
        particleScale.hidden = true;
        document.querySelectorAll('#referenceTableBody tr').forEach(function(tr) {
            tr.classList.remove('row-current');
        });
    }

    function clearAll() {
        inputValue.value = '';
        clearResults();
        inputValue.focus();
    }

    function renderMatch(match, isExact, requestedMicron, requestedStandard) {
        // Reset prior notes / highlights
        resultsDiv.querySelectorAll('.convert-error, .convert-note').forEach(function(n) { n.remove(); });
        document.querySelectorAll('.results-card .result-item').forEach(function(el) {
            el.classList.remove('matched');
        });

        const fepa = match.fepa || '-';
        const ansi = (match.ansi && match.ansi !== '-') ? match.ansi : 'No direct equivalent';
        const jis  = (match.jis  && match.jis  !== '-') ? match.jis  : 'No direct equivalent';
        setResultText('result-fepa',   fepa);
        setResultText('result-ansi',   ansi);
        setResultText('result-jis',    jis);
        setResultText('result-micron', match.micron + ' μm');

        // Hide copy buttons that have no real value to copy
        document.querySelectorAll('.copy-btn').forEach(function(btn) {
            const text = document.getElementById(btn.dataset.target).textContent;
            btn.hidden = !text || text === '-' || text === 'No direct equivalent';
            btn.classList.remove('copied');
            btn.textContent = 'Copy';
        });

        // Highlight which standard the user typed in
        if (requestedStandard) {
            const el = resultsDiv.querySelector('.result-item[data-standard="' + requestedStandard + '"]');
            if (el) el.classList.add('matched');
        }

        // Heading reflects exact vs. closest
        resultsHeading.textContent = isExact
            ? 'Conversion Results'
            : 'Closest match (you entered ' + requestedMicron + ' μm)';

        // Stage badge
        const stage = getStage(match.micron);
        stageBadge.textContent = stage.label;
        stageBadge.setAttribute('data-stage', stage.key);
        stageBadge.hidden = false;

        // Particle-size scale
        scaleMarker.style.left = getScalePosition(match.micron) + '%';
        particleScale.hidden = false;

        // Final-polish equivalents note
        const finals = describeFinalAbrasives(match.micron);
        if (finals.length) {
            const note = document.createElement('p');
            note.className = 'convert-note';
            note.innerHTML = '<strong>Final-polish equivalents at this size:</strong> ' + finals.join(', ') + '.';
            resultsHeading.parentNode.after(note);
        }

        // Highlight the matching row in the reference table
        document.querySelectorAll('#referenceTableBody tr').forEach(function(tr) {
            tr.classList.toggle('row-current', tr.dataset.fepa === match.fepa);
        });

        resultsDiv.style.display = 'block';
    }

    function showError(message) {
        resultsDiv.querySelectorAll('.convert-error, .convert-note').forEach(function(n) { n.remove(); });
        ['result-fepa','result-ansi','result-jis','result-micron'].forEach(function(id) {
            setResultText(id, '-');
        });
        document.querySelectorAll('.copy-btn').forEach(function(btn) { btn.hidden = true; });
        document.querySelectorAll('.results-card .result-item').forEach(function(el) {
            el.classList.remove('matched');
        });
        stageBadge.hidden = true;
        particleScale.hidden = true;
        resultsHeading.textContent = 'No Match Found';
        const errEl = document.createElement('p');
        errEl.className = 'convert-error';
        errEl.textContent = message;
        resultsHeading.parentNode.after(errEl);
        resultsDiv.style.display = 'block';
    }

    function runConvert(opts) {
        opts = opts || {};
        const silent = !!opts.silent;
        const raw = inputValue.value.trim();
        if (!raw) {
            clearResults();
            return;
        }
        const value = raw.toUpperCase();
        const type = inputType.value;

        let match = null;
        let isExact = true;
        let requestedMicron = null;

        if (type === 'fepa') {
            const fepaValue = value.startsWith('P') ? value : 'P' + value;
            match = bondedAbrasives.find(function(c) { return c.fepa === fepaValue; });
        } else if (type === 'ansi') {
            match = bondedAbrasives.find(function(c) { return c.ansi === value; });
        } else if (type === 'jis') {
            match = bondedAbrasives.find(function(c) { return c.jis === value; });
        } else if (type === 'micron') {
            const micronValue = parseFloat(value);
            if (!isNaN(micronValue) && micronValue > 0) {
                requestedMicron = micronValue;
                let closest = bondedAbrasives[0];
                let bestDist = Math.abs(closest.micron - micronValue);
                bondedAbrasives.forEach(function(c) {
                    const d = Math.abs(c.micron - micronValue);
                    if (d < bestDist) { bestDist = d; closest = c; }
                });
                match = closest;
                isExact = Math.abs(match.micron - micronValue) / match.micron < 0.05;
            }
        }

        if (match) {
            renderMatch(match, isExact, requestedMicron, type);
        } else if (silent) {
            // During live typing we stay quiet — hide results entirely
            // rather than flash error states as the user types.
            clearResults();
        } else {
            const validValues = bondedAbrasives.map(function(c) { return c[type]; })
                                               .filter(function(v) { return v && v !== '-'; });
            showError('"' + raw + '" is not a recognized ' + type.toUpperCase() +
                      ' value. Try one of: ' + validValues.slice(0, 8).join(', ') +
                      (validValues.length > 8 ? ', …' : ''));
        }
    }

    // ---- Copy to clipboard ----------------------------------------------

    function handleCopy(btn) {
        const target = document.getElementById(btn.dataset.target);
        const text = target ? target.textContent : '';
        if (!text || text === '-' || text === 'No direct equivalent') return;

        const done = function() {
            btn.classList.add('copied');
            btn.textContent = 'Copied';
            setTimeout(function() {
                btn.classList.remove('copied');
                btn.textContent = 'Copy';
            }, 1400);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function() { fallbackCopy(text, done); });
        } else {
            fallbackCopy(text, done);
        }
    }

    function fallbackCopy(text, done) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'absolute';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            done();
        } catch (e) { /* swallow */ }
    }

    // ---- Reference table -------------------------------------------------

    function buildReferenceTable() {
        const tbody = document.getElementById('referenceTableBody');
        if (!tbody) return;
        bondedAbrasives.forEach(function(c) {
            const stage = getStage(c.micron);
            const tr = document.createElement('tr');
            tr.dataset.fepa = c.fepa;
            tr.dataset.ansi = c.ansi;
            tr.dataset.jis  = c.jis;
            tr.dataset.micron = String(c.micron);
            const hasAnsi = c.ansi && c.ansi !== '-';
            const ansiCell = hasAnsi ? c.ansi : '<span class="muted">—</span>';
            const jisCell  = (c.jis && c.jis !== '-') ? c.jis : '<span class="muted">—</span>';
            tr.innerHTML =
                '<td class="col-fepa">' + ansiCell + '</td>' +
                '<td>' + c.fepa + '</td>' +
                '<td>' + jisCell + '</td>' +
                '<td>' + c.micron + '</td>' +
                '<td><span class="stage-pill ' + stage.key + '">' + stage.label + '</span></td>';
            tr.addEventListener('click', function() {
                // Prefer ANSI when the row has it; fall back to FEPA otherwise
                // (microgrits like P240, P280, P400 have no ANSI equivalent).
                if (hasAnsi) {
                    inputType.value = 'ansi';
                    inputValue.placeholder = placeholders.ansi;
                    inputValue.value = c.ansi;
                } else {
                    inputType.value = 'fepa';
                    inputValue.placeholder = placeholders.fepa;
                    inputValue.value = c.fepa;
                }
                runConvert({ silent: false });
                resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            tbody.appendChild(tr);
        });
    }
});
