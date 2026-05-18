// Polishing Time Calculator
//
// Recommendations are keyed by PACE Technologies' 11-class preparation
// scheme (see materials.js getClassLabel) and by polishing-abrasive size.
// Each entry gives a time range, recommended cloth, pressure, and notes.
//
// All times are for one polishing step in a sequence. The "prev" key on
// each entry lists the abrasive size the sample should already be polished
// through before this step — used to warn when steps are being skipped.

const polishingData = {
    '1': { // Soft, Ductile — Al, Cu, Pb, Sn, soft brass, precious metals
        '9':    { timeRange: { min: 2, max: 4 },   clothType: 'TEXPAN or Black CHEM 2', pressure: 'Light to moderate (3-6 lbs)', notes: ['Soft materials require shorter times to avoid over-polishing', 'Use monocrystalline diamond for gentler cutting', 'Monitor carefully for smearing'] },
        '6':    { timeRange: { min: 2, max: 3 },   clothType: 'DACRON II or NYPAD',     pressure: 'Light to moderate (3-6 lbs)', prev: '9',    notes: ['Shorter times prevent deformation', 'Check frequently for scratch removal'] },
        '3':    { timeRange: { min: 2, max: 3 },   clothType: 'DACRON II or Black CHEM 2', pressure: 'Light (3-5 lbs)',         prev: '6',    notes: ['Gentle polishing to avoid deformation', 'May need multiple short sessions'] },
        '1':    { timeRange: { min: 1, max: 2 },   clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Light (2-4 lbs)',             prev: '3',    notes: ['Very gentle polishing required', 'Monitor for smearing or deformation'] },
        '0.5':  { timeRange: { min: 1, max: 2 },   clothType: 'MICROPAD or NAPPAD',     pressure: 'Very light (2-3 lbs)',        prev: '1',    notes: ['Minimal time to avoid over-polishing'] },
        '0.25': { timeRange: { min: 1, max: 1.5 }, clothType: 'NAPPAD or MICROPAD',     pressure: 'Very light (1-3 lbs)',        prev: '0.5',  notes: ['Brief polishing before final step', 'Avoid excessive material removal'] },
        '0.05': { timeRange: { min: 0.5, max: 1 }, clothType: 'NAPPAD or MOLTEC 2',     pressure: 'Very light (1-2 lbs)',        prev: '0.25', notes: ['Short final polish with colloidal silica', 'Over-polishing can introduce artifacts'] },
    },
    '2': { // Refractory Metals — W, Mo, Ta, Nb
        '9':    { timeRange: { min: 4, max: 6 }, clothType: 'TEXPAN or CERMESH',      pressure: 'Moderate to high (6-10 lbs)', notes: ['Refractory metals are hard and brittle — watch for chipping at grain boundaries', 'Polycrystalline diamond cuts more aggressively'] },
        '6':    { timeRange: { min: 3, max: 5 }, clothType: 'TEXPAN or POLYPAD',      pressure: 'Moderate (5-8 lbs)', prev: '9',    notes: ['Continue until 9 μm scratches are gone'] },
        '3':    { timeRange: { min: 3, max: 5 }, clothType: 'TEXPAN or Black CHEM 2', pressure: 'Moderate (5-8 lbs)', prev: '6',    notes: ['Critical for removing residual coarse scratches'] },
        '1':    { timeRange: { min: 2, max: 4 }, clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Moderate (4-7 lbs)', prev: '3',    notes: ['Fine diamond stage', 'Some refractories (Nb, Ta) benefit from a chemical-mechanical final step'] },
        '0.25': { timeRange: { min: 2, max: 3 }, clothType: 'MICROPAD or TRICOTE',    pressure: 'Light (2-4 lbs)',    prev: '1',    notes: ['Often skipped — go straight to 0.05 μm for routine work'] },
        '0.05': { timeRange: { min: 2, max: 4 }, clothType: 'MOLTEC 2 or MICROPAD',   pressure: 'Light (2-4 lbs)',    prev: '0.25', notes: ['Use colloidal silica with H₂O₂ or NaOH for chemo-mechanical action on Nb/Ta'] },
    },
    '3': { // Lower Ductility Metals — Mg alloys, Zn alloys, some Al alloys
        '9':    { timeRange: { min: 2, max: 4 }, clothType: 'TEXPAN or DACRON II',     pressure: 'Light to moderate (3-6 lbs)', notes: ['Limited ductility — watch for cracking and chipping', 'Mg is reactive: avoid water-based lubricants'] },
        '6':    { timeRange: { min: 2, max: 3 }, clothType: 'DACRON II or Black CHEM 2', pressure: 'Light (3-5 lbs)',          prev: '9', notes: ['Gentle pressure to avoid pull-out of second-phase particles'] },
        '3':    { timeRange: { min: 2, max: 3 }, clothType: 'Black CHEM 2 or GOLD PAD', pressure: 'Light (3-5 lbs)',           prev: '6', notes: ['Use alcohol- or oil-based lubricant on Mg alloys'] },
        '1':    { timeRange: { min: 1, max: 2 }, clothType: 'GOLD PAD or ATLANTIS',    pressure: 'Light (2-4 lbs)',            prev: '3', notes: ['Watch for relief at intermetallic phases'] },
        '0.25': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or TRICOTE',     pressure: 'Light (2-3 lbs)',            prev: '1', notes: ['Optional intermediate step'] },
        '0.05': { timeRange: { min: 1, max: 2 }, clothType: 'NAPPAD or MOLTEC 2',      pressure: 'Very light (1-3 lbs)',       prev: '0.25', notes: ['Colloidal silica reveals grain structure well; rinse thoroughly to avoid drying spots'] },
    },
    '4': { // Soft Brittle Non-metals — graphite, soft polymers, low-density foam
        '6':    { timeRange: { min: 1, max: 2 }, clothType: 'DACRON II or NYPAD',     pressure: 'Very light (1-3 lbs)',       notes: ['Brittle materials chip easily — use very low pressure', 'Skip 9 μm; start at 6 μm with light feed'] },
        '3':    { timeRange: { min: 1, max: 2 }, clothType: 'DACRON II or Black CHEM 2', pressure: 'Very light (1-2 lbs)',    prev: '6',    notes: ['Use alcohol-based lubricant — water can dissolve some soft non-metals'] },
        '1':    { timeRange: { min: 1, max: 2 }, clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Very light (1-2 lbs)',       prev: '3',    notes: ['Avoid extended polishing — surface can pluck'] },
        '0.05': { timeRange: { min: 0.5, max: 1 }, clothType: 'NAPPAD or MOLTEC 2',   pressure: 'Very light (1-2 lbs)',       prev: '1',    notes: ['Brief final polish; many class-4 samples are reflective enough at 1 μm'] },
    },
    '5': { // Medium Hard/Ductile — low-C steel, cast iron, soft tool steel, bronze
        '9':    { timeRange: { min: 3, max: 5 }, clothType: 'TEXPAN or POLYPAD',      pressure: 'Moderate (4-7 lbs)', notes: ['Workhorse class — covers most plain-carbon steels and cast irons', 'Use water-soluble diamond extender'] },
        '6':    { timeRange: { min: 3, max: 4 }, clothType: 'TEXPAN or Black CHEM 2', pressure: 'Moderate (4-7 lbs)', prev: '9',    notes: ['Continue until 9 μm scratches are uniform and removed'] },
        '3':    { timeRange: { min: 3, max: 4 }, clothType: 'Black CHEM 2 or GOLD PAD', pressure: 'Moderate (4-6 lbs)', prev: '6',    notes: ['Critical scratch-removal step'] },
        '1':    { timeRange: { min: 2, max: 3 }, clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Light to moderate (3-5 lbs)', prev: '3',    notes: ['Fine diamond; for cast irons watch for graphite pull-out — softer cloth helps'] },
        '0.25': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or TRICOTE',    pressure: 'Light (2-4 lbs)',    prev: '1',    notes: ['Optional pre-final step'] },
        '0.05': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or MOLTEC 2',   pressure: 'Light (2-3 lbs)',    prev: '0.25', notes: ['Colloidal silica final polish'] },
    },
    '6': { // Tough, Hard Non-ferrous — Ti alloys, Ni superalloys, stainless, Hastelloy
        '9':    { timeRange: { min: 3, max: 5 }, clothType: 'TEXPAN or POLYPAD',      pressure: 'Moderate (4-7 lbs)', notes: ['Work-hardening materials — consistent, moderate pressure is key', 'Avoid extended dwell at any step'] },
        '6':    { timeRange: { min: 3, max: 4 }, clothType: 'TEXPAN or Black CHEM 2', pressure: 'Moderate (4-7 lbs)', prev: '9',    notes: ['Maintain consistent technique to avoid disturbed-layer build-up'] },
        '3':    { timeRange: { min: 3, max: 5 }, clothType: 'Black CHEM 2 or GOLD PAD', pressure: 'Moderate (4-7 lbs)', prev: '6',    notes: ['Critical intermediate step', 'For Ti: include a chemo-mechanical assist (H₂O₂ in CS)'] },
        '1':    { timeRange: { min: 2, max: 3 }, clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Moderate (3-6 lbs)', prev: '3',    notes: ['Fine polishing stage'] },
        '0.5':  { timeRange: { min: 1, max: 2 }, clothType: 'ATLANTIS or MICROPAD',   pressure: 'Light to moderate (3-5 lbs)', prev: '1', notes: ['Pre-final stage; consider vibratory polishing for the final step'] },
        '0.25': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or TRICOTE',    pressure: 'Light (2-4 lbs)',    prev: '0.5',  notes: ['Fine polishing before final oxide step'] },
        '0.05': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or MOLTEC 2',   pressure: 'Light (2-3 lbs)',    prev: '0.25', notes: ['Final polish with colloidal silica; vibratory finish is excellent for SS and Ni superalloys'] },
    },
    '7': { // Coatings & Surface Treatments — thermal spray, plating, hard chrome, nitride layers
        '9':    { timeRange: { min: 3, max: 4 }, clothType: 'TEXPAN or POLYPAD',      pressure: 'Moderate (4-6 lbs)', notes: ['Substrate/coating hardness mismatch causes relief — use harder cloths', 'Mount in low-shrink epoxy to preserve interface'] },
        '6':    { timeRange: { min: 2, max: 4 }, clothType: 'TEXPAN or Black CHEM 2', pressure: 'Moderate (4-6 lbs)', prev: '9',    notes: ['Inspect the coating/substrate interface frequently'] },
        '3':    { timeRange: { min: 2, max: 4 }, clothType: 'Black CHEM 2 or GOLD PAD', pressure: 'Light to moderate (3-5 lbs)', prev: '6', notes: ['Use a napless cloth to minimize edge rounding at coating'] },
        '1':    { timeRange: { min: 1, max: 3 }, clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Light (3-5 lbs)',    prev: '3',    notes: ['Watch for relief and edge rounding at coating boundary'] },
        '0.25': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or TRICOTE',    pressure: 'Light (2-3 lbs)',    prev: '1',    notes: ['Final-prep stage'] },
        '0.05': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or MOLTEC 2',   pressure: 'Very light (1-3 lbs)', prev: '0.25', notes: ['Brief colloidal silica step; for thermal-spray coatings, vibratory is best'] },
    },
    '8': { // Hardened Steels — tool steel, bearing steel, M-grade, hardened structural
        '9':    { timeRange: { min: 4, max: 6 }, clothType: 'CERMESH or TEXPAN',      pressure: 'Moderate to high (5-10 lbs)', notes: ['Hardened steels can tolerate longer polishing times', 'Use polycrystalline diamond for aggressive cutting'] },
        '6':    { timeRange: { min: 3, max: 5 }, clothType: 'POLYPAD or TEXPAN',      pressure: 'Moderate to high (5-10 lbs)', prev: '9', notes: ['Continue until previous scratches are removed'] },
        '3':    { timeRange: { min: 3, max: 5 }, clothType: 'TEXPAN or Black CHEM 2', pressure: 'Moderate (5-8 lbs)', prev: '6',    notes: ['Critical step for removing coarser scratches', 'Ensure uniform scratch pattern before proceeding'] },
        '1':    { timeRange: { min: 2, max: 4 }, clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Moderate (4-7 lbs)', prev: '3',    notes: ['Fine diamond stage', 'Monitor for relief around carbides and inclusions'] },
        '0.5':  { timeRange: { min: 2, max: 3 }, clothType: 'ATLANTIS or MICROPAD',   pressure: 'Light to moderate (3-6 lbs)', prev: '1', notes: ['Pre-final polishing stage'] },
        '0.25': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or TRICOTE',    pressure: 'Light (2-4 lbs)',    prev: '0.5',  notes: ['Fine polishing before final oxide step'] },
        '0.05': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or MOLTEC 2',   pressure: 'Very light (1-3 lbs)', prev: '0.25', notes: ['Final polishing with colloidal silica or alumina to achieve mirror finish'] },
    },
    '9': { // Metal Matrix Composites — SiC/Al, B4C/Al, fiber-reinforced
        '9':    { timeRange: { min: 4, max: 6 }, clothType: 'CERMESH or TEXPAN',      pressure: 'Moderate (4-7 lbs)', notes: ['Reinforcement is much harder than matrix — relief is a constant concern', 'Use harder cloths and shorter times'] },
        '6':    { timeRange: { min: 3, max: 5 }, clothType: 'TEXPAN or POLYPAD',      pressure: 'Moderate (4-7 lbs)', prev: '9',    notes: ['Inspect for particle pull-out frequently'] },
        '3':    { timeRange: { min: 3, max: 4 }, clothType: 'Black CHEM 2 or GOLD PAD', pressure: 'Moderate (3-6 lbs)', prev: '6',  notes: ['Critical step; relief development begins here'] },
        '1':    { timeRange: { min: 2, max: 3 }, clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Light to moderate (3-5 lbs)', prev: '3', notes: ['Use a harder cloth to keep matrix flush with reinforcement'] },
        '0.25': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or TRICOTE',    pressure: 'Light (2-3 lbs)',    prev: '1',    notes: ['Brief intermediate step'] },
        '0.05': { timeRange: { min: 1, max: 2 }, clothType: 'MICROPAD or MOLTEC 2',   pressure: 'Very light (1-3 lbs)', prev: '0.25', notes: ['Final polish; vibratory polishing minimizes relief between phases'] },
    },
    '10': { // Engineered Ceramics — Al2O3, SiC, Si3N4, ZrO2 (sintered)
        '15':   { timeRange: { min: 5, max: 8 }, clothType: 'CERMESH or diamond pad', pressure: 'High (8-12 lbs)',    notes: ['Ceramics need coarse diamond — start at 15 μm', 'Long times are normal for engineered ceramics'] },
        '9':    { timeRange: { min: 5, max: 8 }, clothType: 'CERMESH or TEXPAN',      pressure: 'Moderate to high (6-10 lbs)', prev: '15', notes: ['Use polycrystalline diamond on a hard cloth'] },
        '6':    { timeRange: { min: 4, max: 6 }, clothType: 'TEXPAN or POLYPAD',      pressure: 'Moderate to high (6-10 lbs)', prev: '9',  notes: ['Inspect for chipping at edges of porosity'] },
        '3':    { timeRange: { min: 4, max: 6 }, clothType: 'Black CHEM 2 or GOLD PAD', pressure: 'Moderate (5-8 lbs)', prev: '6',  notes: ['Long step; ceramics polish slowly'] },
        '1':    { timeRange: { min: 3, max: 5 }, clothType: 'GOLD PAD or ATLANTIS',   pressure: 'Moderate (4-7 lbs)', prev: '3',    notes: ['Fine diamond stage'] },
        '0.25': { timeRange: { min: 2, max: 4 }, clothType: 'MICROPAD or TRICOTE',    pressure: 'Light to moderate (3-5 lbs)', prev: '1', notes: ['Pre-final stage'] },
        '0.05': { timeRange: { min: 2, max: 4 }, clothType: 'MICROPAD or MOLTEC 2',   pressure: 'Light (2-4 lbs)',    prev: '0.25', notes: ['Colloidal silica — long times yield best mirror finish on ceramics'] },
    },
    '11': { // Very Hard Brittle Materials — sintered carbide, CVD diamond, cermet
        '15':   { timeRange: { min: 6, max: 10 }, clothType: 'Diamond grinding disc', pressure: 'High (8-12 lbs)',     notes: ['Material removal is extremely slow', 'Diamond-impregnated grinding disc preferred over SiC paper'] },
        '9':    { timeRange: { min: 6, max: 10 }, clothType: 'CERMESH or TEXPAN',     pressure: 'High (8-12 lbs)',     prev: '15',  notes: ['Polycrystalline diamond suspension on a hard cloth'] },
        '6':    { timeRange: { min: 5, max: 8 },  clothType: 'TEXPAN or POLYPAD',     pressure: 'Moderate to high (6-10 lbs)', prev: '9', notes: ['Long step — sintered carbides resist abrasion'] },
        '3':    { timeRange: { min: 5, max: 8 },  clothType: 'Black CHEM 2',          pressure: 'Moderate (5-8 lbs)',  prev: '6',   notes: ['Critical scratch-removal step'] },
        '1':    { timeRange: { min: 4, max: 6 },  clothType: 'GOLD PAD or ATLANTIS',  pressure: 'Moderate (4-7 lbs)',  prev: '3',   notes: ['Fine diamond'] },
        '0.25': { timeRange: { min: 3, max: 5 },  clothType: 'MICROPAD',              pressure: 'Light to moderate (3-5 lbs)', prev: '1', notes: ['Pre-final stage'] },
        '0.05': { timeRange: { min: 3, max: 5 },  clothType: 'MOLTEC 2 or MICROPAD',  pressure: 'Light (2-4 lbs)',     prev: '0.25', notes: ['Colloidal silica; vibratory polish is the production standard for these materials'] },
    },
};

const materialExamples = {
    '1':  ['Aluminum (pure)', 'Copper', 'Lead', 'Tin', 'Soft Brass', 'Gold, Silver, Platinum'],
    '2':  ['Tungsten', 'Molybdenum', 'Tantalum', 'Niobium', 'Vanadium'],
    '3':  ['Magnesium alloys', 'Zinc alloys', 'Some Al alloys (e.g., 2024-T3)'],
    '4':  ['Graphite', 'Soft polymers', 'Low-density foams', 'Biological mounts'],
    '5':  ['Low-carbon steel', 'Cast Iron', 'Soft tool steels', 'Bronze', 'Hard brass'],
    '6':  ['Titanium alloys (Ti-6Al-4V, CP-Ti)', 'Nickel superalloys (Inconel, Hastelloy)', 'Austenitic Stainless Steel', 'Duplex Stainless Steel'],
    '7':  ['Thermal spray coatings', 'Hard chrome plating', 'Nitride / carbide layers', 'PVD / CVD coatings'],
    '8':  ['Hardened Tool Steels (D2, A2, M2)', 'Bearing Steels (52100)', 'Quenched & Tempered Steel', 'Hardened Cast Iron'],
    '9':  ['SiC/Al composites', 'B₄C/Al composites', 'Fiber-reinforced metals'],
    '10': ['Alumina (Al₂O₃)', 'Silicon Carbide (SiC)', 'Silicon Nitride (Si₃N₄)', 'Zirconia (ZrO₂)'],
    '11': ['Sintered Carbides (WC-Co)', 'CVD Diamond', 'Cermets', 'PCD / PCBN'],
};

const gritLabels = {
    '15':   '15 μm (Coarse Diamond)',
    '9':    '9 μm (Coarse Diamond)',
    '6':    '6 μm (Diamond)',
    '3':    '3 μm (Fine Diamond)',
    '1':    '1 μm (Very Fine Diamond)',
    '0.5':  '0.5 μm (Ultra Fine Diamond)',
    '0.25': '0.25 μm (Ultra Fine Diamond)',
    '0.05': '0.05 μm (Colloidal Silica / Alumina)',
};

const gritShort = {
    '15':   '15 μm',
    '9':    '9 μm',
    '6':    '6 μm',
    '3':    '3 μm',
    '1':    '1 μm',
    '0.5':  '0.5 μm',
    '0.25': '0.25 μm',
    '0.05': '0.05 μm',
};

const classLabels = {
    '1': 'Class 1 — Soft, Ductile',
    '2': 'Class 2 — Refractory Metals',
    '3': 'Class 3 — Lower Ductility Metals',
    '4': 'Class 4 — Soft Brittle Non-metals',
    '5': 'Class 5 — Medium Hard / Ductile',
    '6': 'Class 6 — Tough, Hard Non-ferrous',
    '7': 'Class 7 — Coatings & Surface Treatments',
    '8': 'Class 8 — Hardened Steels',
    '9': 'Class 9 — Metal Matrix Composites',
    '10': 'Class 10 — Engineered Ceramics',
    '11': 'Class 11 — Very Hard Brittle Materials',
};

const GRIT_ORDER = ['15', '9', '6', '3', '1', '0.5', '0.25', '0.05'];

function formatTime(minutes) {
    if (minutes < 1) return Math.round(minutes * 60) + ' sec';
    if (minutes === Math.floor(minutes)) return minutes + ' min';
    const whole = Math.floor(minutes);
    const seconds = Math.round((minutes - whole) * 60);
    return whole + ' min ' + seconds + ' sec';
}

document.addEventListener('DOMContentLoaded', function() {
    const materialType       = document.getElementById('materialType');
    const gritSize           = document.getElementById('gritSize');
    const calculateBtn       = document.getElementById('calculateBtn');
    const resetBtn           = document.getElementById('resetBtn');
    const materialExamplesEl = document.getElementById('materialExamples');
    const resultsDiv         = document.getElementById('results');
    const resultsContent     = document.getElementById('resultsContent');

    function repopulateGrits() {
        const cls = materialType.value;
        const classData = polishingData[cls];
        const current = gritSize.value;
        gritSize.innerHTML = '';
        if (!classData) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'Select a class first…';
            gritSize.appendChild(opt);
            return;
        }
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select a polishing step…';
        gritSize.appendChild(placeholder);
        GRIT_ORDER.forEach(function(g) {
            if (classData[g]) {
                const opt = document.createElement('option');
                opt.value = g;
                opt.textContent = gritLabels[g];
                gritSize.appendChild(opt);
            }
        });
        if (classData[current]) gritSize.value = current;
    }

    function showExamples() {
        const v = materialType.value;
        if (v && materialExamples[v]) {
            materialExamplesEl.textContent = 'Examples: ' + materialExamples[v].join(', ');
            materialExamplesEl.hidden = false;
        } else {
            materialExamplesEl.hidden = true;
        }
    }

    materialType.addEventListener('change', function() {
        showExamples();
        repopulateGrits();
        renderResults();
    });
    gritSize.addEventListener('change', renderResults);
    calculateBtn.addEventListener('click', renderResults);

    resetBtn.addEventListener('click', function() {
        materialType.value = '';
        repopulateGrits();
        showExamples();
        resultsContent.innerHTML = '';
        resultsDiv.style.display = 'none';
        materialType.focus();
    });

    // ---- Rendering -------------------------------------------------------

    function el(tag, opts) {
        opts = opts || {};
        const e = document.createElement(tag);
        if (opts.className) e.className = opts.className;
        if (opts.text) e.textContent = opts.text;
        if (opts.html) e.innerHTML = opts.html;
        return e;
    }

    function renderResults() {
        const cls = materialType.value;
        const grit = gritSize.value;
        if (!cls || !grit) {
            resultsContent.innerHTML = '';
            resultsDiv.style.display = 'none';
            return;
        }
        const classData = polishingData[cls];
        const data = classData[grit];
        if (!data) {
            resultsContent.innerHTML = '';
            resultsDiv.style.display = 'none';
            return;
        }

        resultsContent.innerHTML = '';

        // 1. Big time display
        const timeBlock = el('div', { className: 'polish-time-display' });
        timeBlock.appendChild(el('div', { className: 'polish-time-label', text: 'Recommended time for this step' }));
        timeBlock.appendChild(el('div', { className: 'polish-time-value', text: formatTime(data.timeRange.min) + ' – ' + formatTime(data.timeRange.max) }));
        timeBlock.appendChild(el('div', { className: 'polish-time-meta', text: classLabels[cls] + ' · ' + gritLabels[grit] }));
        resultsContent.appendChild(timeBlock);

        // 2. Sequence visualizer
        resultsContent.appendChild(renderSequence(cls, grit));

        // 3. Advisory (sequencing)
        resultsContent.appendChild(renderAdvisory(data, grit));

        // 4. Parameter grid
        resultsContent.appendChild(renderParamGrid(data, cls));

        // 5. Notes
        if (data.notes && data.notes.length) {
            resultsContent.appendChild(renderNotes(data.notes));
        }

        // 6. Full sequence table for the class
        resultsContent.appendChild(renderFullSequence(cls, grit));

        resultsDiv.style.display = 'block';
    }

    function renderSequence(cls, currentGrit) {
        const classData = polishingData[cls];
        const steps = GRIT_ORDER.filter(function(g) { return classData[g]; });
        const currentIdx = steps.indexOf(currentGrit);

        const wrap = el('div', { className: 'polish-sequence' });
        wrap.appendChild(el('div', { className: 'polish-sequence-label', text: 'Polishing sequence for ' + classLabels[cls] }));

        const list = el('div', { className: 'polish-sequence-steps' });
        steps.forEach(function(g, i) {
            let kind;
            if (i < currentIdx) kind = 'past';
            else if (i === currentIdx) kind = 'current';
            else kind = 'future';

            const chip = el('span', { className: 'seq-step seq-step--' + kind, text: gritShort[g] });
            chip.dataset.grit = g;
            chip.setAttribute('role', 'button');
            chip.setAttribute('tabindex', '0');
            const activate = function() {
                gritSize.value = g;
                renderResults();
            };
            chip.addEventListener('click', activate);
            chip.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate();
                }
            });
            list.appendChild(chip);

            if (i < steps.length - 1) {
                list.appendChild(el('span', { className: 'seq-arrow', text: '›' }));
            }
        });
        wrap.appendChild(list);
        return wrap;
    }

    function renderAdvisory(data, grit) {
        const ad = el('div', { className: 'advisory' });
        if (data.prev) {
            ad.classList.add('advisory--warning');
            ad.innerHTML =
                '<span class="advisory-icon" aria-hidden="true">!</span>' +
                '<div><strong>Sequencing:</strong> the sample should be polished through ' +
                '<strong>' + gritLabels[data.prev] + '</strong> before this step. ' +
                'Skipping the prior step leaves coarse scratches this finer abrasive cannot remove in reasonable time.</div>';
        } else {
            ad.classList.add('advisory--success');
            ad.innerHTML =
                '<span class="advisory-icon" aria-hidden="true">✓</span>' +
                '<div><strong>First polishing step</strong> for this material class — start here after grinding through fine SiC paper or the equivalent diamond grinding disc.</div>';
        }
        return ad;
    }

    function renderParamGrid(data, cls) {
        const grid = el('div', { className: 'param-grid' });

        function card(label, value) {
            const c = el('div', { className: 'param-card' });
            c.appendChild(el('div', { className: 'param-label', text: label }));
            c.appendChild(el('div', { className: 'param-value', text: value }));
            return c;
        }

        grid.appendChild(card('Recommended Cloth', data.clothType));
        grid.appendChild(card('Pressure', data.pressure));
        grid.appendChild(card('Material Class', classLabels[cls]));
        return grid;
    }

    function renderNotes(notes) {
        const wrap = el('div', { className: 'param-notes' });
        wrap.appendChild(el('h3', { text: 'Important Notes' }));
        const ul = document.createElement('ul');
        notes.forEach(function(n) {
            const li = el('li');
            li.textContent = n;
            ul.appendChild(li);
        });
        wrap.appendChild(ul);
        return wrap;
    }

    function renderFullSequence(cls, currentGrit) {
        const classData = polishingData[cls];
        const steps = GRIT_ORDER.filter(function(g) { return classData[g]; });

        const section = el('div', { className: 'full-sequence-section' });
        section.appendChild(el('h3', { text: 'Full Polishing Sequence — ' + classLabels[cls] }));

        const wrap = el('div', { className: 'reference-table-wrapper' });
        const table = el('table', { className: 'reference-table' });
        const thead = el('thead');
        thead.innerHTML = '<tr>' +
            '<th scope="col">Step</th>' +
            '<th scope="col">Time</th>' +
            '<th scope="col">Cloth</th>' +
            '<th scope="col">Pressure</th>' +
            '</tr>';
        table.appendChild(thead);
        const tbody = el('tbody');
        steps.forEach(function(g) {
            const d = classData[g];
            const tr = document.createElement('tr');
            if (g === currentGrit) tr.classList.add('row-current');
            tr.innerHTML =
                '<td class="col-grit">' + gritShort[g] + '</td>' +
                '<td class="col-time">' + formatTime(d.timeRange.min) + ' – ' + formatTime(d.timeRange.max) + '</td>' +
                '<td>' + d.clothType + '</td>' +
                '<td>' + d.pressure + '</td>';
            tr.addEventListener('click', function() {
                gritSize.value = g;
                renderResults();
                resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        wrap.appendChild(table);
        section.appendChild(wrap);
        return section;
    }

    // Initial population
    repopulateGrits();
});
