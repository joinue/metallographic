// Grain Size Calculator
document.addEventListener('DOMContentLoaded', function() {
    const methodSelect = document.getElementById('method');
    const inputFieldsDiv = document.getElementById('inputFields');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');

    function updateInputFields() {
        const method = methodSelect.value;
        let html = '';

        if (method === 'number-to-diameter') {
            html = `
                <div class="form-group">
                    <label for="grainSizeNumber">ASTM Grain Size Number (G)</label>
                    <input type="number" id="grainSizeNumber" class="form-control" step="0.1" min="0" max="14" placeholder="e.g., 5.0">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Range: 0 to 14 (ASTM E112)</p>
                </div>
                <div class="form-group">
                    <label for="magnification">Magnification</label>
                    <input type="number" id="magnification" class="form-control" value="100" placeholder="100">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Magnification used for measurement (default: 100x)</p>
                </div>
            `;
        } else if (method === 'diameter-to-number') {
            html = `
                <div class="form-group">
                    <label for="averageDiameter">Average Grain Diameter</label>
                    <input type="number" id="averageDiameter" class="form-control" step="0.001" min="0" placeholder="e.g., 0.050 (mm) or 50 (μm)">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Enter actual grain diameter in mm or μm (values &lt; 1.0 treated as mm, ≥ 1.0 as μm)</p>
                </div>
            `;
        } else if (method === 'intercept') {
            html = `
                <div class="form-group">
                    <label for="interceptCount">Number of Intercepts</label>
                    <input type="number" id="interceptCount" class="form-control" min="1" placeholder="e.g., 100">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Total number of grain boundary intercepts counted</p>
                </div>
                <div class="form-group">
                    <label for="interceptLength">Total Intercept Length (mm)</label>
                    <input type="number" id="interceptLength" class="form-control" step="0.01" min="0" placeholder="e.g., 25.0">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Total length of test line(s) in mm at test magnification</p>
                </div>
                <div class="form-group">
                    <label for="magnification">Magnification</label>
                    <input type="number" id="magnification" class="form-control" value="100" placeholder="100">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Magnification used for intercept measurement</p>
                </div>
            `;
        } else if (method === 'planimetric') {
            html = `
                <div class="form-group">
                    <label for="grainCount">Number of Grains Counted</label>
                    <input type="number" id="grainCount" class="form-control" min="1" placeholder="e.g., 50">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Total number of grains counted in test area</p>
                </div>
                <div class="form-group">
                    <label for="testArea">Test Area (mm²)</label>
                    <input type="number" id="testArea" class="form-control" step="0.01" min="0" placeholder="e.g., 0.5">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Area of test region in mm² at test magnification</p>
                </div>
                <div class="form-group">
                    <label for="magnification">Magnification</label>
                    <input type="number" id="magnification" class="form-control" value="100" placeholder="100">
                    <p class="text-sm" style="margin-top: 0.25rem; color: #6b7280; font-size: 0.75rem;">Magnification used for grain counting</p>
                </div>
            `;
        }

        inputFieldsDiv.innerHTML = html;
        resultsDiv.style.display = 'none';
    }

    methodSelect.addEventListener('change', updateInputFields);
    updateInputFields();

    calculateBtn.addEventListener('click', function() {
        const method = methodSelect.value;
        const M = parseFloat(document.getElementById('magnification')?.value) || 100;
        let result = [];

        if (method === 'number-to-diameter') {
            const G = parseFloat(document.getElementById('grainSizeNumber').value);
            if (isNaN(G) || G < 0 || G > 14) {
                result = [{ label: 'Error', value: 'Grain size number must be between 0 and 14' }];
            } else {
                const N = Math.pow(2, G - 1);
                const d_mm = 0.254 / Math.pow(2, (G - 1) / 2);
                result = [
                    { label: 'ASTM Grain Size Number (G)', value: G.toFixed(1) },
                    { label: 'Grains per square inch at 100x', value: N.toFixed(0) },
                    { label: 'Average grain diameter', value: `${d_mm.toFixed(4)} mm` },
                    { label: 'Average grain diameter', value: `${(d_mm * 1000).toFixed(1)} μm` },
                ];
            }
        } else if (method === 'diameter-to-number') {
            const d = parseFloat(document.getElementById('averageDiameter').value);
            if (isNaN(d) || d <= 0) {
                result = [{ label: 'Error', value: 'Diameter must be greater than 0' }];
            } else {
                const d_mm = d < 1.0 ? d : d / 1000;
                const G = 2 * (Math.log(0.254 / d_mm) / Math.LN2) + 1;
                const N = Math.pow(2, G - 1);
                if (G < 0 || G > 14) {
                    result = [{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }];
                } else {
                    result = [
                        { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
                        { label: 'Grains per square inch at 100x', value: N.toFixed(0) },
                        { label: 'Average grain diameter', value: `${d_mm.toFixed(4)} mm (${(d_mm * 1000).toFixed(1)} μm)` },
                    ];
                }
            }
        } else if (method === 'intercept') {
            const count = parseFloat(document.getElementById('interceptCount').value);
            const length = parseFloat(document.getElementById('interceptLength').value);
            if (isNaN(count) || isNaN(length) || count <= 0 || length <= 0) {
                result = [{ label: 'Error', value: 'Intercept count and length must be greater than 0' }];
            } else {
                const l_bar = (length / count) / M;
                const G = -6.6439 * Math.log10(l_bar) - 3.2877;
                const N = Math.pow(2, G - 1);
                if (G < 0 || G > 14) {
                    result = [{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }];
                } else {
                    result = [
                        { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
                        { label: 'Mean intercept length', value: `${l_bar.toFixed(4)} mm (${(l_bar * 1000).toFixed(1)} μm)` },
                        { label: 'Grains per square inch at 100x', value: N.toFixed(0) },
                    ];
                }
            }
        } else if (method === 'planimetric') {
            const count = parseFloat(document.getElementById('grainCount').value);
            const area = parseFloat(document.getElementById('testArea').value);
            if (isNaN(count) || isNaN(area) || count <= 0 || area <= 0) {
                result = [{ label: 'Error', value: 'Grain count and test area must be greater than 0' }];
            } else {
                const area_100x = area * Math.pow(100 / M, 2);
                const area_in2_100x = area_100x / 645.16;
                const N = count / area_in2_100x;
                const G = Math.log2(N) + 1;
                if (G < 0 || G > 14) {
                    result = [{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }];
                } else {
                    const avgDiameter_mm = 0.254 / Math.pow(2, (G - 1) / 2);
                    result = [
                        { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
                        { label: 'Grains per square inch at 100x', value: N.toFixed(0) },
                        { label: 'Average grain diameter', value: `${avgDiameter_mm.toFixed(4)} mm (${(avgDiameter_mm * 1000).toFixed(1)} μm)` },
                    ];
                }
            }
        }

        if (result.length > 0) {
            resultsContent.innerHTML = result.map(item => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.75rem;">
                    <span style="color: #374151; font-weight: 500;">${item.label}</span>
                    <span style="font-size: 1.125rem; font-weight: 600; color: #111827;">${item.value}</span>
                </div>
            `).join('');
            resultsDiv.style.display = 'block';
        }
    });
});
