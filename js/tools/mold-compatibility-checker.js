// Mold Compatibility Checker
//
// Determines which standard mounting molds can accommodate a given sample
// with adequate resin clearance on all sides. Handles both rectangular and
// cylindrical samples and both compression and castable mount cavities.
//
// Mold dimensions:
//   - Compression cavities are 19.05 mm (0.75") tall, regardless of diameter.
//   - Castable cups vary in depth; this checker assumes 30 mm as a typical
//     default. Users with deeper cups should treat any "doesn't fit"
//     result for height as advisory.
//
// Fit logic:
//   - Rectangular sample: the limiting horizontal dimension is the
//     diagonal of the L×W footprint (the sample can rotate freely inside
//     the circular cavity).
//   - Cylindrical sample: the limiting horizontal dimension is its diameter.
//   - Vertically, the sample height plus the top clearance must fit inside
//     the cavity. The sample rests on the floor, so no bottom clearance.

const COMPRESSION_CAVITY_HEIGHT = 19.05;
const CASTABLE_CAVITY_HEIGHT    = 30.00;

const STANDARD_MOLDS = [
    { key: '1in',    diameter: 25.4,  category: 'imperial', name: '1 inch (25.4 mm)' },
    { key: '25mm',   diameter: 25.0,  category: 'metric',   name: '25 mm' },
    { key: '30mm',   diameter: 30.0,  category: 'metric',   name: '30 mm' },
    { key: '1.25in', diameter: 31.75, category: 'imperial', name: '1.25 inch (31.75 mm)' },
    { key: '1.5in',  diameter: 38.1,  category: 'imperial', name: '1.5 inch (38.1 mm)' },
    { key: '40mm',   diameter: 40.0,  category: 'metric',   name: '40 mm' },
    { key: '2in',    diameter: 50.8,  category: 'imperial', name: '2 inch (50.8 mm)' },
    { key: '50mm',   diameter: 50.0,  category: 'metric',   name: '50 mm' },
];

document.addEventListener('DOMContentLoaded', function() {
    const sampleShape    = document.getElementById('sampleShape');
    const mountType      = document.getElementById('mountType');
    const clearanceInput = document.getElementById('clearancePerSide');
    const rectDimsRow    = document.getElementById('rectDimsRow');
    const cylDimsRow     = document.getElementById('cylDimsRow');
    const sampleLength   = document.getElementById('sampleLength');
    const sampleWidth    = document.getElementById('sampleWidth');
    const sampleHeight   = document.getElementById('sampleHeight');
    const cylDiameter    = document.getElementById('cylDiameter');
    const cylHeight      = document.getElementById('cylHeight');
    const checkBtn       = document.getElementById('checkBtn');
    const resetBtn       = document.getElementById('resetBtn');
    const resultsDiv     = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');

    function updateShapeUI() {
        const isCyl = sampleShape.value === 'cylindrical';
        rectDimsRow.style.display = isCyl ? 'none' : 'block';
        cylDimsRow.style.display  = isCyl ? 'block' : 'none';
    }

    function getInputs() {
        const isCyl = sampleShape.value === 'cylindrical';
        const clearance = Math.max(0, parseFloat(clearanceInput.value) || 0);
        const cavityHeight = mountType.value === 'castable'
            ? CASTABLE_CAVITY_HEIGHT
            : COMPRESSION_CAVITY_HEIGHT;

        let fitDiameter, height, dims, shapeLabel;
        if (isCyl) {
            const D = parseFloat(cylDiameter.value);
            const H = parseFloat(cylHeight.value);
            if (!(D > 0) || !(H > 0)) return null;
            fitDiameter = D;
            height = H;
            dims = { D: D, H: H };
            shapeLabel = 'Cylindrical Ø ' + fmt(D) + ' × ' + fmt(H) + ' mm';
        } else {
            const L = parseFloat(sampleLength.value);
            const W = parseFloat(sampleWidth.value);
            const H = parseFloat(sampleHeight.value);
            if (!(L > 0) || !(W > 0) || !(H > 0)) return null;
            fitDiameter = Math.sqrt(L * L + W * W);
            height = H;
            dims = { L: L, W: W, H: H, diagonal: fitDiameter };
            shapeLabel = 'Rectangular ' + fmt(L) + ' × ' + fmt(W) + ' × ' + fmt(H) +
                         ' mm (diagonal ' + fmt(fitDiameter) + ' mm)';
        }

        return {
            isCyl: isCyl,
            clearance: clearance,
            cavityHeight: cavityHeight,
            mountTypeKey: mountType.value,
            fitDiameter: fitDiameter,
            height: height,
            dims: dims,
            shapeLabel: shapeLabel,
        };
    }

    function fmt(v) {
        // 1 decimal place, but drop trailing .0 for whole numbers
        const s = (Math.round(v * 10) / 10).toFixed(1);
        return s.endsWith('.0') ? s.slice(0, -2) : s;
    }

    function checkMolds(input) {
        return STANDARD_MOLDS.map(function(mold) {
            const diameterClearance = mold.diameter - input.fitDiameter - 2 * input.clearance;
            const heightClearance   = input.cavityHeight - input.height - input.clearance;
            const fits = diameterClearance >= 0 && heightClearance >= 0;
            return {
                key: mold.key,
                name: mold.name,
                diameter: mold.diameter,
                category: mold.category,
                height: input.cavityHeight,
                fits: fits,
                diameterClearance: diameterClearance,
                heightClearance: heightClearance,
                minClearance: Math.min(diameterClearance, heightClearance),
            };
        });
    }

    function renderResults() {
        const input = getInputs();
        if (!input) {
            resultsContent.innerHTML = '';
            resultsDiv.style.display = 'none';
            return;
        }

        const fits = checkMolds(input);
        const recommended = fits.find(function(f) { return f.fits; }) || null;

        resultsContent.innerHTML = '';

        if (recommended) {
            resultsContent.appendChild(renderRecommendation(recommended, input));
            resultsContent.appendChild(renderVisualizer(recommended, input));
        } else {
            resultsContent.appendChild(renderNoFit(input));
        }

        resultsContent.appendChild(renderMoldList(fits, recommended, input));
        resultsContent.appendChild(renderCaveats(input));

        resultsDiv.style.display = 'block';
    }

    // ---- DOM builders ----------------------------------------------------

    function el(tag, opts) {
        opts = opts || {};
        const e = document.createElement(tag);
        if (opts.className) e.className = opts.className;
        if (opts.text) e.textContent = opts.text;
        if (opts.html) e.innerHTML = opts.html;
        return e;
    }

    function renderRecommendation(rec, input) {
        const card = el('div', { className: 'recommendation' });
        card.appendChild(el('div', { className: 'recommendation-icon', text: '✓' }));
        const body = el('div', { className: 'recommendation-body' });
        body.appendChild(el('div', { className: 'recommendation-label', text: 'Recommended Mold Size (smallest that fits)' }));
        body.appendChild(el('div', { className: 'recommendation-name', text: rec.name }));

        const mountLabel = input.mountTypeKey === 'castable'
            ? 'Castable cup (' + fmt(input.cavityHeight) + ' mm assumed depth)'
            : 'Compression cavity (' + fmt(input.cavityHeight) + ' mm depth)';
        const meta = el('div', { className: 'recommendation-meta' });
        meta.innerHTML =
            '<strong>Min. clearance:</strong> ' + fmt(rec.minClearance) + ' mm' +
            ' &nbsp;·&nbsp; <strong>Sample:</strong> ' + input.shapeLabel +
            ' &nbsp;·&nbsp; ' + mountLabel;
        body.appendChild(meta);

        card.appendChild(body);
        return card;
    }

    function renderNoFit(input) {
        const card = el('div', { className: 'recommendation recommendation--no-fit' });
        card.appendChild(el('div', { className: 'recommendation-icon', text: '✗' }));
        const body = el('div', { className: 'recommendation-body' });
        body.appendChild(el('div', { className: 'recommendation-label', text: 'No standard mold fits with the current clearance' }));
        body.appendChild(el('div', { className: 'recommendation-name', text: 'Sample too large' }));
        body.appendChild(el('div', { className: 'recommendation-meta', text: 'Your sample (' + input.shapeLabel + ') exceeds the largest standard cavity with ' + fmt(input.clearance) + ' mm clearance on each side.' }));

        const options = el('ul', { className: 'recommendation-no-fit-options' });
        options.innerHTML =
            '<li>Reduce clearance (currently ' + fmt(input.clearance) + ' mm — try 2 mm)</li>' +
            (input.mountTypeKey === 'compression'
                ? '<li>Switch to a castable cup for more cavity depth</li>'
                : '<li>Use a deeper castable cup or a custom mold form</li>') +
            '<li>Section the sample to a smaller piece</li>' +
            '<li>Order a custom mold from your supplier</li>';
        body.appendChild(options);
        card.appendChild(body);
        return card;
    }

    function renderVisualizer(rec, input) {
        const wrap = el('div', { className: 'mold-visual-wrap' });
        wrap.appendChild(buildMoldSVG(rec, input));

        const legend = el('div', { className: 'mold-visual-legend' });
        const dl = document.createElement('dl');

        dl.innerHTML =
            '<dt><span class="legend-swatch legend-swatch--sample"></span>Sample</dt>' +
            '<dd>' + input.shapeLabel + '</dd>' +
            '<dt><span class="legend-swatch legend-swatch--resin"></span>Resin gap</dt>' +
            '<dd>' + fmt(input.clearance) + ' mm per side · ' + fmt(input.clearance) + ' mm above the sample</dd>' +
            '<dt><span class="legend-swatch legend-swatch--mold"></span>Mold cavity</dt>' +
            '<dd>Ø ' + fmt(rec.diameter) + ' mm × ' + fmt(rec.height) + ' mm deep</dd>';

        legend.appendChild(dl);
        wrap.appendChild(legend);
        return wrap;
    }

    function buildMoldSVG(rec, input) {
        const SIZE = 180;
        const PADDING = 8;
        const usable = SIZE - 2 * PADDING;
        const scale = usable / rec.diameter;
        const cx = SIZE / 2;
        const cy = SIZE / 2;
        const moldR = (rec.diameter / 2) * scale;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 ' + SIZE + ' ' + SIZE);
        svg.setAttribute('class', 'mold-svg');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', 'Top view of sample inside ' + rec.name + ' mold');

        const resin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        resin.setAttribute('cx', cx);
        resin.setAttribute('cy', cy);
        resin.setAttribute('r', moldR);
        resin.setAttribute('class', 'mold-resin');
        svg.appendChild(resin);

        const outline = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outline.setAttribute('cx', cx);
        outline.setAttribute('cy', cy);
        outline.setAttribute('r', moldR);
        outline.setAttribute('class', 'mold-outline');
        svg.appendChild(outline);

        let sample;
        if (input.isCyl) {
            const r = (input.dims.D / 2) * scale;
            sample = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            sample.setAttribute('cx', cx);
            sample.setAttribute('cy', cy);
            sample.setAttribute('r', r);
        } else {
            const w = input.dims.L * scale;
            const h = input.dims.W * scale;
            sample = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            sample.setAttribute('x', cx - w / 2);
            sample.setAttribute('y', cy - h / 2);
            sample.setAttribute('width', w);
            sample.setAttribute('height', h);
            sample.setAttribute('rx', 1.5);
        }
        sample.setAttribute('class', 'sample-shape');
        svg.appendChild(sample);

        return svg;
    }

    function renderMoldList(fits, recommended, input) {
        const wrap = document.createElement('div');
        wrap.appendChild(el('h3', { className: 'mold-section-title', text: 'All Standard Molds' }));

        const list = el('div', { className: 'mold-list' });
        fits.forEach(function(item) {
            const card = el('div');
            const isRec = recommended && item.key === recommended.key;
            card.className = 'mold-item ' +
                (item.fits ? (isRec ? 'mold-item--recommended' : 'mold-item--fits') : 'mold-item--no-fit');

            const icon = el('div', { className: 'mold-item-icon', text: item.fits ? '✓' : '✗' });
            card.appendChild(icon);

            const body = el('div', { className: 'mold-item-body' });
            const nameRow = document.createElement('div');
            nameRow.className = 'mold-item-name';
            nameRow.textContent = item.name;
            if (isRec) {
                const badge = el('span', { className: 'mold-item-badge', text: 'Recommended' });
                nameRow.appendChild(badge);
            }
            body.appendChild(nameRow);

            const meta = el('div', { className: 'mold-item-meta' });
            if (item.fits) {
                meta.textContent = 'Min clearance: ' + fmt(item.minClearance) + ' mm';
            } else {
                const parts = [];
                if (item.diameterClearance < 0) parts.push('Ø short by ' + fmt(-item.diameterClearance) + ' mm');
                if (item.heightClearance   < 0) parts.push('H short by ' + fmt(-item.heightClearance) + ' mm');
                meta.innerHTML = '<span class="meta-bad">' + parts.join(' · ') + '</span>';
            }
            body.appendChild(meta);
            card.appendChild(body);

            list.appendChild(card);
        });

        wrap.appendChild(list);
        return wrap;
    }

    function renderCaveats(input) {
        const c = el('div', { className: 'results-caveats' });
        const mountNote = input.mountTypeKey === 'castable'
            ? 'Castable cups are available in deeper sizes than the 30 mm assumed here — if a mold is rejected only on height, a deeper cup likely works.'
            : 'Compression cavities are a fixed 19 mm deep. If the sample is too tall, switch to a castable cup.';
        c.innerHTML =
            '<strong>Notes.</strong> The checker uses ' + fmt(input.clearance) + ' mm of resin per side and ' + fmt(input.clearance) +
            ' mm above the sample; the sample rests on the mold floor, so no bottom clearance is counted. ' +
            'Increase clearance to <strong>3 mm or more</strong> when edge retention is critical. ' + mountNote;
        return c;
    }

    // ---- Wire up events --------------------------------------------------

    sampleShape.addEventListener('change', function() {
        updateShapeUI();
        renderResults();
    });
    mountType.addEventListener('change', renderResults);
    [clearanceInput, sampleLength, sampleWidth, sampleHeight, cylDiameter, cylHeight].forEach(function(el) {
        el.addEventListener('input', debounce(renderResults, 180));
    });

    checkBtn.addEventListener('click', renderResults);

    resetBtn.addEventListener('click', function() {
        sampleShape.value = 'rectangular';
        mountType.value = 'compression';
        clearanceInput.value = '2';
        sampleLength.value = '';
        sampleWidth.value = '';
        sampleHeight.value = '';
        cylDiameter.value = '';
        cylHeight.value = '';
        updateShapeUI();
        resultsContent.innerHTML = '';
        resultsDiv.style.display = 'none';
        sampleLength.focus();
    });

    function debounce(fn, ms) {
        let t = null;
        return function() {
            const ctx = this, args = arguments;
            clearTimeout(t);
            t = setTimeout(function() { fn.apply(ctx, args); }, ms);
        };
    }

    // Initialize
    updateShapeUI();
});
