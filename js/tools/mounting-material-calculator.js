// Mounting Material Calculator
const standardMolds = {
    '1': { diameter: 25.4, height: 19.05 },
    '1.25': { diameter: 31.75, height: 19.05 },
    '1.5': { diameter: 38.1, height: 19.05 },
    '2': { diameter: 50.8, height: 19.05 },
};

document.addEventListener('DOMContentLoaded', function() {
    const mountingType = document.getElementById('mountingType');
    const moldSize = document.getElementById('moldSize');
    const customMoldFields = document.getElementById('customMoldFields');
    const customDiameter = document.getElementById('customDiameter');
    const customHeight = document.getElementById('customHeight');
    const sampleLength = document.getElementById('sampleLength');
    const sampleWidth = document.getElementById('sampleWidth');
    const sampleHeight = document.getElementById('sampleHeight');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');
    const mountingTypeNote = document.getElementById('mountingTypeNote');

    mountingType.addEventListener('change', function() {
        const type = mountingType.value;
        mountingTypeNote.textContent = type === 'compression' 
            ? 'Uses resin pellets. Includes 10% safety margin for material loss.'
            : 'Uses liquid resin. Includes 15% safety margin for shrinkage and material loss.';
    });

    moldSize.addEventListener('change', function() {
        customMoldFields.style.display = moldSize.value === 'custom' ? 'block' : 'none';
    });

    calculateBtn.addEventListener('click', function() {
        const mold = moldSize.value === 'custom' 
            ? { 
                diameter: parseFloat(customDiameter.value) || 0, 
                height: parseFloat(customHeight.value) || 0 
            }
            : standardMolds[moldSize.value];

        if (mold.diameter <= 0 || mold.height <= 0) {
            resultsDiv.style.display = 'none';
            return;
        }

        const moldRadius = mold.diameter / 2;
        const moldVolume = Math.PI * Math.pow(moldRadius, 2) * mold.height;

        const length = parseFloat(sampleLength.value) || 0;
        const width = parseFloat(sampleWidth.value) || 0;
        const height = parseFloat(sampleHeight.value) || 0;
        
        const sampleVolume = (length > 0 && width > 0 && height > 0)
            ? length * width * height
            : moldVolume * 0.05;

        const safetyMargin = mountingType.value === 'compression' ? 1.1 : 1.15;
        const materialNeeded = (moldVolume - sampleVolume) * safetyMargin;

        const materialNeededCm3 = materialNeeded / 1000;
        const materialNeededOz = materialNeededCm3 / 29.5735;
        const materialNeededGrams = materialNeededCm3;

        resultsContent.innerHTML = `
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Material Needed (with safety margin)</div>
                <div style="font-size: 2rem; font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">
                    ${materialNeededOz.toFixed(2)} fl oz
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    (${materialNeededGrams.toFixed(1)} g or ${materialNeeded.toFixed(1)} ml)
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
                <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                    <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Mold Volume</div>
                    <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">
                        ${(moldVolume / 1000).toFixed(2)} cm³
                    </div>
                </div>
                <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                    <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Sample Volume</div>
                    <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">
                        ${(sampleVolume / 1000).toFixed(2)} cm³
                    </div>
                </div>
            </div>
            <div style="padding: 1rem; background: #dbeafe; border-radius: 0.5rem;">
                <p style="font-size: 0.875rem; color: #374151; margin: 0;">
                    <strong>Note:</strong> This calculation includes a safety margin to account for material loss 
                    and ${mountingType.value === 'castable' ? 'shrinkage during curing' : 'handling during compression'}. 
                    Actual requirements may vary based on sample geometry and mounting technique.
                </p>
            </div>
        `;
        resultsDiv.style.display = 'block';
    });
});
