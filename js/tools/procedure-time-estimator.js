// Procedure Time Estimator
//
// Builds a per-step time breakdown across sectioning-mounting-grinding-
// polishing-etching-cleaning and totals it. Two key behaviors:
//
//   - Manual mode: each sample is prepped one at a time, so abrasive-step
//     times (grinding + polishing) are multiplied by batch size.
//   - Automated mode: samples are mounted in a holder and run in parallel,
//     so abrasive-step time is independent of batch size.
//
// Mounting time depends on the chosen technique. Compression mounting is a
// ~10 min press cycle. Castable mounts have a hands-on time (~5-10 min) plus
// a cure time before the mount is ready to grind (20-30 min for acrylic,
// several hours for room-temp epoxy). The "cure" portion is reported
// separately because it's typically passive — the metallographer can do
// other work while the mount cures.

const grindingSteps = [
    { grit: '120',  time: { min: 0.5, max: 1 } },
    { grit: '240',  time: { min: 0.5, max: 1 } },
    { grit: '320',  time: { min: 0.5, max: 1 } },
    { grit: '400',  time: { min: 0.5, max: 1 } },
    { grit: '600',  time: { min: 0.5, max: 1 } },
    { grit: '800',  time: { min: 0.5, max: 1 }, optional: true },
    { grit: '1200', time: { min: 0.5, max: 1 }, optional: true },
];

const polishingSteps = {
    hard: [
        { grit: '9',    time: { min: 4, max: 6 } },
        { grit: '6',    time: { min: 3, max: 5 } },
        { grit: '3',    time: { min: 3, max: 5 } },
        { grit: '1',    time: { min: 2, max: 4 } },
        { grit: '0.5',  time: { min: 2, max: 3 } },
        { grit: '0.25', time: { min: 1, max: 2 } },
        { grit: '0.05', time: { min: 1, max: 2 } },
    ],
    soft: [
        { grit: '6',    time: { min: 2, max: 4 } },
        { grit: '3',    time: { min: 2, max: 3 } },
        { grit: '1',    time: { min: 1, max: 2 } },
        { grit: '0.5',  time: { min: 1, max: 2 } },
        { grit: '0.25', time: { min: 1, max: 1.5 } },
        { grit: '0.05', time: { min: 0.5, max: 1 } },
    ],
    'work-hardening': [
        { grit: '9',    time: { min: 3, max: 5 } },
        { grit: '6',    time: { min: 3, max: 4 } },
        { grit: '3',    time: { min: 3, max: 5 } },
        { grit: '1',    time: { min: 2, max: 3 } },
        { grit: '0.5',  time: { min: 1, max: 2 } },
        { grit: '0.25', time: { min: 1, max: 2 } },
        { grit: '0.05', time: { min: 1, max: 2 } },
    ],
    'multi-phase': [
        { grit: '9',    time: { min: 3, max: 4 } },
        { grit: '6',    time: { min: 2, max: 3 } },
        { grit: '3',    time: { min: 2, max: 4 } },
        { grit: '1',    time: { min: 1, max: 3 } },
        { grit: '0.5',  time: { min: 1, max: 2 } },
        { grit: '0.25', time: { min: 1, max: 1.5 } },
        { grit: '0.05', time: { min: 1, max: 2 } },
    ],
};

const mountingProfiles = {
    compression:    { label: 'Compression (hot press)',     handsOn: { min: 8,  max: 12 }, cure: { min: 0,   max: 0    } },
    acrylic:        { label: 'Castable: fast acrylic',      handsOn: { min: 5,  max: 10 }, cure: { min: 20,  max: 30   } },
    epoxy:          { label: 'Castable: room-temp epoxy',   handsOn: { min: 5,  max: 10 }, cure: { min: 240, max: 480  } },
    'epoxy-vacuum': { label: 'Castable: vacuum epoxy',      handsOn: { min: 10, max: 15 }, cure: { min: 240, max: 480  } },
};

const materialExamples = {
    hard: ['Hardened Steels', 'Tool Steels', 'Ceramics', 'Hardened Cast Iron'],
    soft: ['Aluminum', 'Copper', 'Lead', 'Tin', 'Soft Brass', 'Pure Metals'],
    'work-hardening': ['Stainless Steel', 'Nickel Alloys', 'Austenitic Steels', 'Titanium Alloys', 'Duplex Stainless Steel'],
    'multi-phase': ['Cast Iron', 'Cast Aluminum', 'Multi-Phase Alloys', 'Materials with Inclusions'],
};

function formatTime(minutes) {
    if (minutes <= 0) return '0 min';
    if (minutes >= 60) {
        const h = Math.floor(minutes / 60);
        const m = Math.round(minutes - h * 60);
        return m === 0 ? `${h} h` : `${h} h ${m} m`;
    }
    if (minutes < 1) return `${Math.round(minutes * 60)} sec`;
    if (minutes === Math.floor(minutes)) return `${minutes} min`;
    const wholeMinutes = Math.floor(minutes);
    const seconds = Math.round((minutes - wholeMinutes) * 60);
    return `${wholeMinutes}m ${seconds}s`;
}

function formatTimeRange(min, max) {
    return min === max ? formatTime(min) : `${formatTime(min)} – ${formatTime(max)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const materialTypeButtons     = Array.from(document.querySelectorAll('#materialTypeSelector .method-btn'));
    const workflowButtons         = Array.from(document.querySelectorAll('#workflowSelector .method-btn'));
    const batchSize               = document.getElementById('batchSize');
    const grindingStartGrit       = document.getElementById('grindingStartGrit');
    const includeOptionalGrinding = document.getElementById('includeOptionalGrinding');
    const includeMounting         = document.getElementById('includeMounting');
    const mountingTypeRow         = document.getElementById('mountingTypeRow');
    const mountingType            = document.getElementById('mountingType');
    const includeEtching          = document.getElementById('includeEtching');
    const includeCleaning         = document.getElementById('includeCleaning');
    const estimateBtn             = document.getElementById('estimateBtn');
    const resetBtn                = document.getElementById('resetBtn');
    const materialExamplesEl      = document.getElementById('materialExamples');
    const materialExamplesText    = document.getElementById('materialExamplesText');
    const resultsDiv              = document.getElementById('results');
    const resultsContent          = document.getElementById('resultsContent');

    let currentMaterial = null;
    let currentWorkflow = 'manual';

    function setMaterial(type) {
        currentMaterial = type;
        materialTypeButtons.forEach(btn => {
            btn.setAttribute('aria-checked', btn.dataset.method === type ? 'true' : 'false');
        });
        if (type && materialExamples[type]) {
            materialExamplesText.textContent = `Examples: ${materialExamples[type].join(', ')}`;
            materialExamplesEl.style.display = 'flex';
        } else {
            materialExamplesEl.style.display = 'none';
        }
        estimateBtn.disabled = !type;
    }

    function setWorkflow(mode) {
        currentWorkflow = mode;
        workflowButtons.forEach(btn => {
            btn.setAttribute('aria-checked', btn.dataset.method === mode ? 'true' : 'false');
        });
    }

    materialTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => setMaterial(btn.dataset.method));
    });
    workflowButtons.forEach(btn => {
        btn.addEventListener('click', () => setWorkflow(btn.dataset.method));
    });

    setWorkflow('manual');

    includeMounting.addEventListener('change', function() {
        mountingTypeRow.style.display = includeMounting.checked ? 'block' : 'none';
    });

    function renderError(message) {
        resultsContent.innerHTML = `<div class="result-error" style="background:#fef2f2;border:1px solid #fecaca;color:#991b1b;border-radius:0.5rem;padding:0.875rem 1rem;font-size:0.875rem;">${message}</div>`;
        resultsDiv.style.display = 'block';
    }

    function estimate() {
        if (!currentMaterial) return;

        const batch = Math.max(1, parseInt(batchSize.value, 10) || 1);
        const abrasiveMultiplier = currentWorkflow === 'manual' ? batch : 1;

        const breakdown = [];

        // Grinding
        const startIndex = grindingSteps.findIndex(s => s.grit === grindingStartGrit.value);
        const selectedGrindingSteps = grindingSteps.slice(startIndex)
            .filter(s => !s.optional || includeOptionalGrinding.checked);

        let grindingMin = 0, grindingMax = 0;
        selectedGrindingSteps.forEach(step => {
            const sMin = step.time.min * abrasiveMultiplier;
            const sMax = step.time.max * abrasiveMultiplier;
            grindingMin += sMin;
            grindingMax += sMax;
            breakdown.push({
                step: `Grinding ${step.grit} grit${abrasiveMultiplier > 1 ? ` × ${abrasiveMultiplier} samples` : ''}`,
                time: formatTimeRange(sMin, sMax),
            });
        });

        // Polishing
        const polishingSequence = polishingSteps[currentMaterial];
        let polishingMin = 0, polishingMax = 0;
        polishingSequence.forEach(step => {
            const sMin = step.time.min * abrasiveMultiplier;
            const sMax = step.time.max * abrasiveMultiplier;
            polishingMin += sMin;
            polishingMax += sMax;
            breakdown.push({
                step: `Polishing ${step.grit} μm${abrasiveMultiplier > 1 ? ` × ${abrasiveMultiplier} samples` : ''}`,
                time: formatTimeRange(sMin, sMax),
            });
        });

        // Mounting
        let mountHandsOnMin = 0, mountHandsOnMax = 0;
        let mountCureMin = 0,    mountCureMax = 0;
        if (includeMounting.checked) {
            const profile = mountingProfiles[mountingType.value] || mountingProfiles.compression;
            mountHandsOnMin = profile.handsOn.min;
            mountHandsOnMax = profile.handsOn.max;
            mountCureMin    = profile.cure.min;
            mountCureMax    = profile.cure.max;
            breakdown.push({
                step: `Mounting — hands-on (${profile.label})`,
                time: formatTimeRange(mountHandsOnMin, mountHandsOnMax),
            });
            if (mountCureMax > 0) {
                breakdown.push({
                    step: 'Mounting — cure (passive)',
                    time: formatTimeRange(mountCureMin, mountCureMax),
                });
            }
        }

        // Etching
        const etchingMin = includeEtching.checked ? 1 : 0;
        const etchingMax = includeEtching.checked ? 3 : 0;
        if (includeEtching.checked) {
            breakdown.push({
                step: 'Etching (swab/immersion + rinse + dry)',
                time: formatTimeRange(etchingMin, etchingMax),
            });
        }

        // Cleaning
        let cleaningMin = 0, cleaningMax = 0;
        if (includeCleaning.checked) {
            const totalAbrasiveSteps = selectedGrindingSteps.length + polishingSequence.length;
            cleaningMin = totalAbrasiveSteps * 0.5 + 2;
            cleaningMax = totalAbrasiveSteps * 1.0 + 3;
            breakdown.push({
                step: `Cleaning (${totalAbrasiveSteps} steps + final ultrasonic)`,
                time: formatTimeRange(cleaningMin, cleaningMax),
            });
        }

        const activeMin = grindingMin + polishingMin + mountHandsOnMin + etchingMin + cleaningMin;
        const activeMax = grindingMax + polishingMax + mountHandsOnMax + etchingMax + cleaningMax;
        const totalMin = activeMin + mountCureMin;
        const totalMax = activeMax + mountCureMax;

        const modeNote = currentWorkflow === 'manual'
            ? `Manual prep, ${batch} sample${batch !== 1 ? 's' : ''} run sequentially.`
            : `Automated prep, ${batch} sample${batch !== 1 ? 's' : ''} run in parallel on one holder.`;

        const cards = [
            { label: 'Grinding', value: formatTimeRange(grindingMin, grindingMax) },
            { label: 'Polishing', value: formatTimeRange(polishingMin, polishingMax) },
        ];
        if (includeMounting.checked) {
            cards.push({ label: 'Mounting (hands-on)', value: formatTimeRange(mountHandsOnMin, mountHandsOnMax) });
            if (mountCureMax > 0) {
                cards.push({ label: 'Mounting (cure, passive)', value: formatTimeRange(mountCureMin, mountCureMax) });
            }
        }
        if (etchingMax > 0) cards.push({ label: 'Etching', value: formatTimeRange(etchingMin, etchingMax) });
        if (cleaningMax > 0) cards.push({ label: 'Cleaning', value: formatTimeRange(cleaningMin, cleaningMax) });

        const gridHTML = cards.map(c => `
            <div class="result-item">
                <div class="result-label">${c.label}</div>
                <div class="result-value">${c.value}</div>
            </div>
        `).join('');

        const breakdownHTML = breakdown.map(item => `
            <div class="breakdown-item">
                <span class="breakdown-step">${item.step}</span>
                <span class="breakdown-time">${item.time}</span>
            </div>
        `).join('');

        const cureLine = mountCureMax > 0
            ? `Passive cure: <strong>${formatTimeRange(mountCureMin, mountCureMax)}</strong>`
            : '';

        resultsContent.innerHTML = `
            <div class="result-headline">
                <div class="result-headline-label">Total Time (active + cure)</div>
                <div class="result-headline-value">${formatTimeRange(totalMin, totalMax)}</div>
                <div class="result-headline-desc">
                    Active hands-on: <strong>${formatTimeRange(activeMin, activeMax)}</strong>${cureLine ? ` &middot; ${cureLine}` : ''}
                </div>
                <div class="result-headline-mode">${modeNote}</div>
            </div>
            <div class="results-grid">${gridHTML}</div>
            <div class="breakdown-section">
                <h3>Step-by-step breakdown</h3>
                <div class="breakdown-list">${breakdownHTML}</div>
            </div>
            <div class="result-note">
                <strong>Note:</strong> Estimates based on typical procedures with well-maintained equipment. Real times vary with specimen size, operator experience, and material-specific quirks. For castable mounts, the cure portion is passive — schedule it before lunch or at end of day.
            </div>
        `;
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    estimateBtn.addEventListener('click', estimate);

    resetBtn?.addEventListener('click', function() {
        setMaterial(null);
        setWorkflow('manual');
        batchSize.value = 1;
        grindingStartGrit.value = '240';
        includeOptionalGrinding.checked = false;
        includeMounting.checked = false;
        mountingTypeRow.style.display = 'none';
        mountingType.value = 'compression';
        includeEtching.checked = false;
        includeCleaning.checked = true;
        resultsDiv.style.display = 'none';
    });
});
