// Mounting Material Calculator
//
// Computes the volume of mounting resin required to fill the annulus between
// the sample and the mold, then converts that volume to weight using the
// selected resin's density.
//
// Standard mold dimensions are nominal compression-mold cavity sizes
// (1", 1.25", 1.5", 2" diameter × 0.75" tall). The 0.75" cavity height is
// typical for PACE TP-series compression molds; for castable cups, use the
// Custom Size option.
//
// Density values (g/cm³) follow vendor-published averages:
//   Phenolic Bakelite      ~ 1.40
//   Conductive Phenolic    ~ 1.45 (Cu/graphite-filled)
//   Diallyl Phthalate      ~ 1.35 (glass-filled)
//   Epoxy castable         ~ 1.15
//   Acrylic castable       ~ 1.18
//   Polyester castable     ~ 1.20

const standardMolds = {
    '1':    { diameter: 25.4, height: 19.05 },
    '1.25': { diameter: 31.75, height: 19.05 },
    '1.5':  { diameter: 38.1, height: 19.05 },
    '2':    { diameter: 50.8, height: 19.05 },
};

document.addEventListener('DOMContentLoaded', function() {
    const mountingTypeButtons = Array.from(document.querySelectorAll('#mountingTypeSelector .method-btn'));
    const resinType          = document.getElementById('resinType');
    const moldSize           = document.getElementById('moldSize');
    const customMoldFields   = document.getElementById('customMoldFields');
    const customDiameter     = document.getElementById('customDiameter');
    const customHeight       = document.getElementById('customHeight');
    const sampleShape        = document.getElementById('sampleShape');
    const sampleLength       = document.getElementById('sampleLength');
    const sampleWidth        = document.getElementById('sampleWidth');
    const sampleHeight       = document.getElementById('sampleHeight');
    const calculateBtn       = document.getElementById('calculateBtn');
    const resetBtn           = document.getElementById('resetBtn');
    const resultsDiv         = document.getElementById('results');
    const resultsContent     = document.getElementById('resultsContent');
    const mountingTypeNote   = document.getElementById('mountingTypeNote');

    // State: mounting type is tracked in JS, not in a hidden form control.
    let currentMountingType = 'compression';

    // Sync resin <select> options to the current mounting type: only resins
    // tagged with the matching data-group remain visible/selectable, and the
    // first matching resin is auto-selected if the prior choice is no longer
    // valid for the new mounting type.
    function syncResinOptions() {
        let firstMatch = null;
        Array.from(resinType.options).forEach(opt => {
            const matches = opt.dataset.group === currentMountingType;
            opt.hidden = !matches;
            opt.disabled = !matches;
            if (matches && firstMatch === null) firstMatch = opt;
        });
        const selected = resinType.options[resinType.selectedIndex];
        if ((!selected || selected.disabled) && firstMatch) {
            resinType.value = firstMatch.value;
        }
    }

    function updateMountingTypeUI() {
        mountingTypeButtons.forEach(btn => {
            btn.setAttribute('aria-checked', btn.dataset.method === currentMountingType ? 'true' : 'false');
        });
        mountingTypeNote.textContent = currentMountingType === 'compression'
            ? 'Uses resin pellets/powder. Includes 10% safety margin for material loss.'
            : 'Uses liquid resin (two-part). Includes 15% safety margin for shrinkage and material loss.';
    }

    function setMountingType(type) {
        if (currentMountingType === type) return;
        currentMountingType = type;
        updateMountingTypeUI();
        syncResinOptions();
    }

    mountingTypeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            setMountingType(btn.dataset.method);
        });
    });

    updateMountingTypeUI();
    syncResinOptions();

    moldSize.addEventListener('change', function() {
        customMoldFields.style.display = moldSize.value === 'custom' ? 'block' : 'none';
    });

    function sampleVolumeFromInputs() {
        const L = parseFloat(sampleLength.value) || 0;
        const W = parseFloat(sampleWidth.value)  || 0;
        const H = parseFloat(sampleHeight.value) || 0;
        if (L <= 0 || W <= 0 || H <= 0) return null;
        if (sampleShape.value === 'cylindrical') {
            // Cylinder: use the larger of L/W as the diameter so the user can
            // enter L = W = Ø without worrying about which field to use.
            const dia = Math.max(L, W);
            return Math.PI * Math.pow(dia / 2, 2) * H;
        }
        return L * W * H;
    }

    function renderError(message) {
        resultsContent.innerHTML = `<div class="result-error">${message}</div>`;
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function renderResult({ resinMass_g, resinVolume_cm3, resinVolume_floz, moldVolume_cm3, sampleVolume_cm3, sampleAssumed, density, resinLabel, isCastable }) {
        const headline = `
            <div class="result-headline">
                <div class="result-headline-label">Resin Needed (with safety margin)</div>
                <div class="result-headline-value">${resinMass_g.toFixed(1)} g</div>
                <div class="result-headline-desc">
                    ${resinVolume_cm3.toFixed(2)} cm³ &middot; ${resinVolume_cm3.toFixed(2)} ml &middot; ${resinVolume_floz.toFixed(2)} fl oz
                </div>
            </div>
        `;
        const cleanLabel = resinLabel.replace(/ — .*/, '');
        const items = [
            { label: 'Mold Volume', value: `${moldVolume_cm3.toFixed(2)} cm³` },
            { label: `Sample Volume${sampleAssumed ? ' (assumed 5%)' : ''}`, value: `${sampleVolume_cm3.toFixed(2)} cm³` },
            { label: 'Resin', value: cleanLabel },
            { label: 'Density', value: `${density.toFixed(2)} g/cm³` },
        ];
        const grid = items.map(item => `
            <div class="result-item">
                <div class="result-label">${item.label}</div>
                <div class="result-value">${item.value}</div>
            </div>
        `).join('');

        const noteParts = [];
        noteParts.push(isCastable
            ? 'Volume includes a 15% margin for shrinkage on cure and mixing loss. For two-part resins, mix the listed total — the resin/hardener ratio is set by the product datasheet.'
            : 'Mass includes a 10% margin for fill consistency and pellet/powder loss. Compression resins are typically weighed on a balance before charging the mold.');
        if (sampleAssumed) {
            noteParts.push('Sample volume was assumed to be 5% of the mold; for a closer estimate, enter the sample dimensions.');
        }

        resultsContent.innerHTML = headline +
            `<div class="results-grid">${grid}</div>` +
            `<div class="result-note"><strong>Note:</strong> ${noteParts.join(' ')}</div>`;
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function calculate() {
        const mold = moldSize.value === 'custom'
            ? {
                diameter: parseFloat(customDiameter.value) || 0,
                height:   parseFloat(customHeight.value)   || 0,
            }
            : standardMolds[moldSize.value];

        if (mold.diameter <= 0 || mold.height <= 0) {
            renderError('Enter a valid mold diameter and height before calculating.');
            return;
        }

        const moldVolume = Math.PI * Math.pow(mold.diameter / 2, 2) * mold.height; // mm³
        const sampleVolFromInputs = sampleVolumeFromInputs();
        const sampleVol  = sampleVolFromInputs ?? moldVolume * 0.05;               // mm³
        const sampleAssumed = sampleVolFromInputs === null;

        if (sampleVol >= moldVolume) {
            renderError(`Sample does not fit: the sample volume (${(sampleVol/1000).toFixed(2)} cm³) is larger than the selected mold volume (${(moldVolume/1000).toFixed(2)} cm³). Choose a larger mold or section the sample.`);
            return;
        }

        const isCastable = currentMountingType === 'castable';
        const safetyMargin = isCastable ? 1.15 : 1.10;
        const resinVolume_mm3 = (moldVolume - sampleVol) * safetyMargin;
        const resinVolume_cm3 = resinVolume_mm3 / 1000;
        const resinVolume_floz = resinVolume_cm3 / 29.5735;

        const density = parseFloat(resinType.selectedOptions[0]?.dataset.density) || 1.20;
        const resinMass_g = resinVolume_cm3 * density;
        const resinLabel = resinType.selectedOptions[0]?.textContent || 'resin';

        renderResult({
            resinMass_g,
            resinVolume_cm3,
            resinVolume_floz,
            moldVolume_cm3: moldVolume / 1000,
            sampleVolume_cm3: sampleVol / 1000,
            sampleAssumed,
            density,
            resinLabel,
            isCastable,
        });
    }

    calculateBtn.addEventListener('click', calculate);

    resetBtn?.addEventListener('click', function() {
        setMountingType('compression');
        moldSize.value = '1.25';
        customMoldFields.style.display = 'none';
        customDiameter.value = '';
        customHeight.value = '';
        sampleShape.value = 'rectangular';
        sampleLength.value = '';
        sampleWidth.value = '';
        sampleHeight.value = '';
        resultsDiv.style.display = 'none';
    });
});
