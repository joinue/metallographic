// Mold Compatibility Checker
const standardMolds = {
    '1': { diameter: 25.4, height: 19.05, name: '1 inch (25.4 mm)' },
    '1.25': { diameter: 31.75, height: 19.05, name: '1.25 inch (31.75 mm)' },
    '1.5': { diameter: 38.1, height: 19.05, name: '1.5 inch (38.1 mm)' },
    '2': { diameter: 50.8, height: 19.05, name: '2 inch (50.8 mm)' },
};

document.addEventListener('DOMContentLoaded', function() {
    const sampleLength = document.getElementById('sampleLength');
    const sampleWidth = document.getElementById('sampleWidth');
    const sampleHeight = document.getElementById('sampleHeight');
    const checkBtn = document.getElementById('checkBtn');
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');

    function updateCheckButton() {
        checkBtn.disabled = !sampleLength.value || !sampleWidth.value || !sampleHeight.value;
    }

    sampleLength.addEventListener('input', updateCheckButton);
    sampleWidth.addEventListener('input', updateCheckButton);
    sampleHeight.addEventListener('input', updateCheckButton);

    checkBtn.addEventListener('click', function() {
        const length = parseFloat(sampleLength.value);
        const width = parseFloat(sampleWidth.value);
        const height = parseFloat(sampleHeight.value);

        if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) {
            resultsDiv.style.display = 'none';
            return;
        }

        const sampleDiagonal = Math.sqrt(length * length + width * width);
        
        const fits = [];
        let recommended = null;

        (['1', '1.25', '1.5', '2']).forEach(size => {
            const mold = standardMolds[size];
            const diameterClearance = mold.diameter - sampleDiagonal - 4;
            const heightClearance = mold.height - height - 4;
            const fitsMold = diameterClearance >= 0 && heightClearance >= 0;
            const minClearance = Math.min(diameterClearance, heightClearance);

            fits.push({
                size,
                mold,
                fits: fitsMold,
                clearance: minClearance,
            });

            if (fitsMold && !recommended) {
                recommended = size;
            }
        });

        let html = '';

        if (recommended) {
            html += `
                <div style="margin-bottom: 1.5rem; padding: 1rem; background: #d1fae5; border-left: 4px solid #10b981; border-radius: 0.5rem;">
                    <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Recommended Mold Size</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #059669; margin-bottom: 0.5rem;">
                        ${standardMolds[recommended].name}
                    </div>
                    <div style="font-size: 0.875rem; color: #6b7280;">
                        Minimum clearance: ${fits.find(f => f.size === recommended).clearance.toFixed(1)} mm
                    </div>
                </div>
            `;
        } else {
            html += `
                <div style="margin-bottom: 1.5rem; padding: 1rem; background: #fee2e2; border-left: 4px solid #ef4444; border-radius: 0.5rem;">
                    <div style="font-size: 0.875rem; font-weight: 600; color: #dc2626; margin-bottom: 0.5rem;">Sample Too Large</div>
                    <div style="font-size: 0.875rem; color: #374151; margin-bottom: 0.5rem;">
                        Your sample (diagonal: ${sampleDiagonal.toFixed(1)} mm, height: ${height.toFixed(1)} mm) 
                        does not fit in standard molds. Consider:
                    </div>
                    <ul style="font-size: 0.875rem; color: #374151; padding-left: 1.5rem; margin: 0;">
                        <li>Using a larger custom mold</li>
                        <li>Sectioning the sample to a smaller size</li>
                        <li>Using castable mounting with a custom mold</li>
                    </ul>
                </div>
            `;
        }

        html += `
            <div>
                <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem;">Compatibility by Mold Size</h3>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        `;

        fits.forEach(item => {
            html += `
                <div style="padding: 1rem; border-radius: 0.5rem; border: 2px solid ${item.fits ? '#86efac' : '#e5e7eb'}; background: ${item.fits ? '#d1fae5' : '#f9fafb'};">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <div style="font-weight: 600; color: #111827; margin-bottom: 0.25rem;">
                                ${item.mold.name}
                            </div>
                            <div style="font-size: 0.875rem; color: #6b7280;">
                                Diameter: ${item.mold.diameter} mm, Height: ${item.mold.height} mm
                            </div>
                        </div>
                        <div style="text-align: right;">
                            ${item.fits ? `
                                <div style="color: #059669; font-weight: 600; margin-bottom: 0.25rem;">✓ Fits</div>
                                <div style="font-size: 0.75rem; color: #6b7280;">
                                    Clearance: ${item.clearance.toFixed(1)} mm
                                </div>
                            ` : `
                                <div style="color: #dc2626; font-weight: 600;">✗ Too Small</div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="margin-top: 1.5rem; padding: 1rem; background: #dbeafe; border-radius: 0.5rem;">
                <p style="font-size: 0.875rem; color: #374151; margin: 0;">
                    <strong>Note:</strong> Clearance requirements (2mm on each side) ensure proper mounting material 
                    flow and prevent edge issues. For irregularly shaped samples, use the largest cross-sectional 
                    dimension as the diagonal measurement.
                </p>
            </div>
        `;

        resultsContent.innerHTML = html;
        resultsDiv.style.display = 'block';
    });
});
