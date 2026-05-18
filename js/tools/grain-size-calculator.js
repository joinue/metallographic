// Grain Size Calculator — ASTM E112
document.addEventListener('DOMContentLoaded', function() {
    const methodButtons = Array.from(document.querySelectorAll('.method-btn'));
    const formulaText = document.getElementById('formulaText');
    const inputFieldsDiv = document.getElementById('inputFields');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');

    let currentMethod = 'number-to-diameter';

    const FORMULAS = {
        'number-to-diameter': 'ASTM E112: <code>d̄ = 0.254 / 2<sup>(G−1)/2</sup></code> mm. Grains/in² at 100× follows <code>N = 2<sup>G−1</sup></code>.',
        'diameter-to-number': 'Inverted from ASTM E112: <code>G = 2·log₂(0.254 / d̄) + 1</code> with d̄ in mm.',
        'intercept': 'ASTM E112 Eq. 5: <code>G = −6.6457·log₁₀(L̄) − 3.298</code>, where L̄ is mean intercept length in mm on the specimen.',
        'planimetric': 'ASTM E112 §12: <code>N<sub>AE</sub> = N<sub>A</sub> × 0.0645</code> and <code>G = log₂(N<sub>AE</sub>) + 1</code>, with N<sub>A</sub> in grains/mm².'
    };

    function getGDescription(G) {
        if (G < 0) return 'Extremely coarse';
        if (G < 2) return 'Very coarse';
        if (G < 4) return 'Coarse';
        if (G < 6) return 'Medium — typical for wrought metals';
        if (G < 8) return 'Fine';
        if (G < 10) return 'Very fine';
        if (G < 12) return 'Ultra-fine';
        return 'Submicron / nanostructured';
    }

    function inputFieldsHTML(method) {
        if (method === 'number-to-diameter') {
            return `
                <div class="form-group">
                    <label for="grainSizeNumber">ASTM Grain Size Number (G)</label>
                    <input type="number" id="grainSizeNumber" class="form-control" step="0.1" min="-3" max="18" placeholder="e.g., 5.0">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">ASTM E112 reporting range: −3 (very coarse) to 18 (very fine). Typical wrought metals: 4–10.</p>
                </div>
                <div class="form-group">
                    <label for="magnification">Magnification</label>
                    <input type="number" id="magnification" class="form-control" value="100" placeholder="100">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Magnification used for measurement (default: 100×).</p>
                </div>
            `;
        }
        if (method === 'diameter-to-number') {
            return `
                <div class="form-group">
                    <label for="averageDiameter">Average Grain Diameter</label>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="number" id="averageDiameter" class="form-control" step="0.001" min="0" placeholder="e.g., 50" style="flex: 1;">
                        <select id="diameterUnit" class="form-control" style="flex: 0 0 auto; width: auto;">
                            <option value="um" selected>μm</option>
                            <option value="mm">mm</option>
                        </select>
                    </div>
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">ASTM E112 mean diameter d̄. Typical wrought metals are 5–100 μm.</p>
                </div>
            `;
        }
        if (method === 'intercept') {
            return `
                <div class="form-group">
                    <label for="interceptCount">Number of Intercepts</label>
                    <input type="number" id="interceptCount" class="form-control" min="1" placeholder="e.g., 100">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Total grain-boundary intercepts counted on the test line(s).</p>
                </div>
                <div class="form-group">
                    <label for="interceptLength">Total Test-Line Length (mm)</label>
                    <input type="number" id="interceptLength" class="form-control" step="0.01" min="0" placeholder="e.g., 25.0">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">On-screen length of the test line(s) at test magnification.</p>
                </div>
                <div class="form-group">
                    <label for="magnification">Magnification</label>
                    <input type="number" id="magnification" class="form-control" value="100" placeholder="100">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Magnification used for the intercept measurement.</p>
                </div>
            `;
        }
        if (method === 'planimetric') {
            return `
                <div class="form-group">
                    <label for="grainCount">Effective Grain Count (N<sub>inside</sub> + N<sub>intercepted</sub>/2)</label>
                    <input type="number" id="grainCount" class="form-control" step="0.5" min="0.5" placeholder="e.g., 120">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Count grains fully inside the test area as 1, grains crossed by the boundary as ½ (ASTM E112 §12).</p>
                </div>
                <div class="form-group">
                    <label for="testArea">Test Area on the Specimen (mm²)</label>
                    <input type="number" id="testArea" class="form-control" step="0.001" min="0" placeholder="e.g., 0.5">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Actual area of the test region on the specimen (on-screen area divided by magnification²). For ASTM E112's standard 5000 mm² test circle at 100×, enter 0.5.</p>
                </div>
                <div class="form-group">
                    <label for="magnification">Magnification</label>
                    <input type="number" id="magnification" class="form-control" value="100" placeholder="100">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Magnification at which the test was performed (reporting only; calculation uses specimen-plane area).</p>
                </div>
            `;
        }
        return '';
    }

    function setMethod(method) {
        currentMethod = method;
        methodButtons.forEach(btn => {
            btn.setAttribute('aria-checked', btn.dataset.method === method ? 'true' : 'false');
        });
        formulaText.innerHTML = FORMULAS[method] || '';
        inputFieldsDiv.innerHTML = inputFieldsHTML(method);
        resultsDiv.style.display = 'none';
    }

    methodButtons.forEach(btn => {
        btn.addEventListener('click', () => setMethod(btn.dataset.method));
    });

    setMethod('number-to-diameter');

    function renderError(message) {
        resultsContent.innerHTML = `<div class="result-error">${message}</div>`;
        resultsDiv.style.display = 'block';
    }

    function renderResult(G, items) {
        const headline = `
            <div class="result-headline">
                <div class="result-headline-label">ASTM Grain Size Number</div>
                <div class="result-headline-value">G = ${G.toFixed(2)}</div>
                <div class="result-headline-desc">${getGDescription(G)}</div>
            </div>
        `;
        const grid = items.map(item => `
            <div class="result-item">
                <div class="result-label">${item.label}</div>
                <div class="result-value">${item.value}</div>
            </div>
        `).join('');
        resultsContent.innerHTML = headline + `<div class="results-grid">${grid}</div>`;
        resultsDiv.style.display = 'block';
        // Scroll the results into view for visibility on small screens
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function calculate() {
        const method = currentMethod;
        const M = parseFloat(document.getElementById('magnification')?.value) || 100;

        if (method === 'number-to-diameter') {
            const G = parseFloat(document.getElementById('grainSizeNumber').value);
            if (isNaN(G) || G < -3 || G > 18) {
                renderError('Grain size number must be between −3 and 18 (ASTM E112 reporting range).');
                return;
            }
            const N = Math.pow(2, G - 1);
            const d_mm = 0.254 / Math.pow(2, (G - 1) / 2);
            const NA = N / 0.0645;
            renderResult(G, [
                { label: 'Average grain diameter (d̄)', value: `${(d_mm * 1000).toFixed(1)} μm` },
                { label: 'Average grain diameter (d̄)', value: `${d_mm.toFixed(4)} mm` },
                { label: 'Grains per in² @ 100× (N<sub>AE</sub>)', value: N.toFixed(N < 10 ? 1 : 0) },
                { label: 'Grains per mm² (N<sub>A</sub>)', value: NA.toFixed(NA < 10 ? 2 : 0) },
            ]);
            return;
        }

        if (method === 'diameter-to-number') {
            const d = parseFloat(document.getElementById('averageDiameter').value);
            const unit = document.getElementById('diameterUnit')?.value || 'um';
            if (isNaN(d) || d <= 0) {
                renderError('Diameter must be greater than 0.');
                return;
            }
            const d_mm = unit === 'mm' ? d : d / 1000;
            const G = 2 * (Math.log(0.254 / d_mm) / Math.LN2) + 1;
            if (G < -3 || G > 18) {
                renderError('Calculated grain-size number is outside ASTM E112 reporting range (−3 to 18). Check input value and units.');
                return;
            }
            const N = Math.pow(2, G - 1);
            const NA = N / 0.0645;
            renderResult(G, [
                { label: 'Average grain diameter (d̄)', value: `${d_mm.toFixed(4)} mm (${(d_mm * 1000).toFixed(1)} μm)` },
                { label: 'Grains per in² @ 100× (N<sub>AE</sub>)', value: N.toFixed(N < 10 ? 1 : 0) },
                { label: 'Grains per mm² (N<sub>A</sub>)', value: NA.toFixed(NA < 10 ? 2 : 0) },
            ]);
            return;
        }

        if (method === 'intercept') {
            const count = parseFloat(document.getElementById('interceptCount').value);
            const length = parseFloat(document.getElementById('interceptLength').value);
            if (isNaN(count) || isNaN(length) || count <= 0 || length <= 0) {
                renderError('Intercept count and total test-line length must both be greater than 0.');
                return;
            }
            const l_bar = (length / count) / M; // mm on the specimen
            const G = -6.6457 * Math.log10(l_bar) - 3.298;
            if (G < -3 || G > 18) {
                renderError('Calculated grain-size number is outside ASTM E112 reporting range (−3 to 18). Check intercept count, test-line length, and magnification.');
                return;
            }
            const N = Math.pow(2, G - 1);
            renderResult(G, [
                { label: 'Mean intercept length (L̄)', value: `${l_bar.toFixed(4)} mm (${(l_bar * 1000).toFixed(1)} μm)` },
                { label: 'Grains per in² @ 100× (N<sub>AE</sub>)', value: N.toFixed(N < 10 ? 1 : 0) },
                { label: 'Magnification', value: `${M}×` },
            ]);
            return;
        }

        if (method === 'planimetric') {
            const count = parseFloat(document.getElementById('grainCount').value);
            const area_mm2 = parseFloat(document.getElementById('testArea').value);
            if (isNaN(count) || isNaN(area_mm2) || count <= 0 || area_mm2 <= 0) {
                renderError('Effective grain count and test area must both be greater than 0.');
                return;
            }
            const NA = count / area_mm2;
            const NAE = NA * 0.0645;
            const G = Math.log2(NAE) + 1;
            if (G < -3 || G > 18) {
                renderError('Calculated grain-size number is outside ASTM E112 reporting range (−3 to 18). Check input values.');
                return;
            }
            const avgDiameter_mm = 0.254 / Math.pow(2, (G - 1) / 2);
            renderResult(G, [
                { label: 'Grains per mm² (N<sub>A</sub>)', value: NA.toFixed(NA < 10 ? 2 : 1) },
                { label: 'Grains per in² @ 100× (N<sub>AE</sub>)', value: NAE.toFixed(NAE < 10 ? 2 : 1) },
                { label: 'Average grain diameter (d̄)', value: `${(avgDiameter_mm * 1000).toFixed(1)} μm` },
                { label: 'Average grain diameter (d̄)', value: `${avgDiameter_mm.toFixed(4)} mm` },
            ]);
            return;
        }
    }

    calculateBtn.addEventListener('click', calculate);

    resetBtn.addEventListener('click', function() {
        setMethod(currentMethod);
    });

    // Allow Enter key in any input to trigger Calculate
    inputFieldsDiv.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculate();
        }
    });
});
