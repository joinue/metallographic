// Polishing Time Calculator
const polishingData = {
    hard: {
        '9': {
            timeRange: { min: 4, max: 6 },
            clothType: 'CERMESH or TEXPAN',
            pressure: 'Moderate to high (5-10 lbs)',
            notes: [
                'Hard materials can tolerate longer polishing times',
                'Use polycrystalline diamond for aggressive cutting',
                'Monitor for complete scratch removal'
            ]
        },
        '6': {
            timeRange: { min: 3, max: 5 },
            clothType: 'POLYPAD or TEXPAN',
            pressure: 'Moderate to high (5-10 lbs)',
            notes: [
                'Continue until previous scratches are removed',
                'May require longer time if previous step was insufficient'
            ]
        },
        '3': {
            timeRange: { min: 3, max: 5 },
            clothType: 'TEXPAN or Black CHEM 2',
            pressure: 'Moderate (5-8 lbs)',
            notes: [
                'Critical step for removing coarser scratches',
                'Ensure uniform scratch pattern before proceeding'
            ]
        },
        '1': {
            timeRange: { min: 2, max: 4 },
            clothType: 'GOLD PAD or ATLANTIS',
            pressure: 'Moderate (4-7 lbs)',
            notes: [
                'Fine diamond polishing stage',
                'Monitor for relief around inclusions'
            ]
        },
        '0.5': {
            timeRange: { min: 2, max: 3 },
            clothType: 'ATLANTIS or MICROPAD',
            pressure: 'Light to moderate (3-6 lbs)',
            notes: [
                'Pre-final polishing stage',
                'Shorter time to avoid over-polishing'
            ]
        },
        '0.25': {
            timeRange: { min: 1, max: 2 },
            clothType: 'MICROPAD or TRICOTE',
            pressure: 'Light (2-4 lbs)',
            notes: [
                'Fine polishing before final oxide step',
                'Monitor carefully for surface quality'
            ]
        },
        '0.05': {
            timeRange: { min: 1, max: 2 },
            clothType: 'MICROPAD or MOLTEC 2',
            pressure: 'Very light (1-3 lbs)',
            notes: [
                'Final polishing with colloidal silica or alumina',
                'Short time to achieve mirror finish without relief'
            ]
        }
    },
    soft: {
        '9': {
            timeRange: { min: 2, max: 4 },
            clothType: 'TEXPAN or Black CHEM 2',
            pressure: 'Light to moderate (3-6 lbs)',
            notes: [
                'Soft materials require shorter times to avoid over-polishing',
                'Use monocrystalline diamond for gentler cutting',
                'Monitor carefully for smearing'
            ]
        },
        '6': {
            timeRange: { min: 2, max: 3 },
            clothType: 'DACRON II or NYPAD',
            pressure: 'Light to moderate (3-6 lbs)',
            notes: [
                'Shorter times prevent deformation',
                'Check frequently for scratch removal'
            ]
        },
        '3': {
            timeRange: { min: 2, max: 3 },
            clothType: 'DACRON II or Black CHEM 2',
            pressure: 'Light (3-5 lbs)',
            notes: [
                'Gentle polishing to avoid deformation',
                'May need multiple short sessions'
            ]
        },
        '1': {
            timeRange: { min: 1, max: 2 },
            clothType: 'GOLD PAD or ATLANTIS',
            pressure: 'Light (2-4 lbs)',
            notes: [
                'Very gentle polishing required',
                'Monitor for smearing or deformation'
            ]
        },
        '0.5': {
            timeRange: { min: 1, max: 2 },
            clothType: 'MICROPAD or NAPPAD',
            pressure: 'Very light (2-3 lbs)',
            notes: [
                'Minimal time to avoid over-polishing',
                'Check surface quality frequently'
            ]
        },
        '0.25': {
            timeRange: { min: 1, max: 1.5 },
            clothType: 'NAPPAD or MICROPAD',
            pressure: 'Very light (1-3 lbs)',
            notes: [
                'Brief polishing before final step',
                'Avoid excessive material removal'
            ]
        },
        '0.05': {
            timeRange: { min: 0.5, max: 1 },
            clothType: 'NAPPAD or MOLTEC 2',
            pressure: 'Very light (1-2 lbs)',
            notes: [
                'Short final polish to achieve finish',
                'Over-polishing can introduce artifacts'
            ]
        }
    },
    'work-hardening': {
        '9': {
            timeRange: { min: 3, max: 5 },
            clothType: 'TEXPAN or POLYPAD',
            pressure: 'Moderate (4-7 lbs)',
            notes: [
                'Consistent, moderate pressure is key',
                'Avoid excessive time to prevent work-hardening',
                'Progress systematically through grits'
            ]
        },
        '6': {
            timeRange: { min: 3, max: 4 },
            clothType: 'TEXPAN or Black CHEM 2',
            pressure: 'Moderate (4-7 lbs)',
            notes: [
                'Maintain consistent technique',
                'Don\'t over-polish at any stage'
            ]
        },
        '3': {
            timeRange: { min: 3, max: 5 },
            clothType: 'Black CHEM 2 or GOLD PAD',
            pressure: 'Moderate (4-7 lbs)',
            notes: [
                'Critical intermediate step',
                'Ensure complete scratch removal'
            ]
        },
        '1': {
            timeRange: { min: 2, max: 3 },
            clothType: 'GOLD PAD or ATLANTIS',
            pressure: 'Moderate (3-6 lbs)',
            notes: [
                'Fine polishing stage',
                'Monitor for deformation'
            ]
        },
        '0.5': {
            timeRange: { min: 1, max: 2 },
            clothType: 'ATLANTIS or MICROPAD',
            pressure: 'Light to moderate (3-5 lbs)',
            notes: [
                'Pre-final stage',
                'Consider vibratory polishing for final step'
            ]
        },
        '0.25': {
            timeRange: { min: 1, max: 2 },
            clothType: 'MICROPAD or TRICOTE',
            pressure: 'Light (2-4 lbs)',
            notes: [
                'Fine polishing before final oxide',
                'Avoid excessive time'
            ]
        },
        '0.05': {
            timeRange: { min: 1, max: 2 },
            clothType: 'MICROPAD or MOLTEC 2',
            pressure: 'Light (2-3 lbs)',
            notes: [
                'Final polish with colloidal silica',
                'Consider vibratory polishing for best results'
            ]
        }
    },
    'multi-phase': {
        '9': {
            timeRange: { min: 3, max: 4 },
            clothType: 'TEXPAN or Black CHEM 2',
            pressure: 'Moderate (4-7 lbs)',
            notes: [
                'Use softer cloths to minimize relief',
                'Shorter times prevent over-polishing',
                'Monitor for relief around different phases'
            ]
        },
        '6': {
            timeRange: { min: 2, max: 3 },
            clothType: 'DACRON II or Black CHEM 2',
            pressure: 'Moderate (4-6 lbs)',
            notes: [
                'Balance between scratch removal and relief',
                'Check for phase contrast'
            ]
        },
        '3': {
            timeRange: { min: 2, max: 4 },
            clothType: 'Black CHEM 2 or GOLD PAD',
            pressure: 'Moderate (3-6 lbs)',
            notes: [
                'Important for removing scratches',
                'Watch for relief development'
            ]
        },
        '1': {
            timeRange: { min: 1, max: 3 },
            clothType: 'GOLD PAD or ATLANTIS',
            pressure: 'Light to moderate (3-5 lbs)',
            notes: [
                'Fine polishing with minimal relief',
                'Monitor phase boundaries carefully'
            ]
        },
        '0.5': {
            timeRange: { min: 1, max: 2 },
            clothType: 'ATLANTIS or MICROPAD',
            pressure: 'Light (2-4 lbs)',
            notes: [
                'Gentle polishing to minimize relief',
                'Short time to prevent over-polishing'
            ]
        },
        '0.25': {
            timeRange: { min: 1, max: 1.5 },
            clothType: 'MICROPAD or TRICOTE',
            pressure: 'Light (2-3 lbs)',
            notes: [
                'Fine polishing before final step',
                'Minimize relief around phases'
            ]
        },
        '0.05': {
            timeRange: { min: 1, max: 2 },
            clothType: 'MICROPAD or MOLTEC 2',
            pressure: 'Very light (1-3 lbs)',
            notes: [
                'Final polish with minimal relief',
                'May require specialized techniques for some materials'
            ]
        }
    }
};

const materialExamples = {
    hard: ['Hardened Steels', 'Tool Steels', 'Ceramics', 'Titanium Alloys', 'Hardened Cast Iron'],
    soft: ['Aluminum', 'Copper', 'Lead', 'Tin', 'Soft Brass', 'Pure Metals'],
    'work-hardening': ['Stainless Steel', 'Nickel Alloys', 'Austenitic Steels', 'Work-Hardened Materials'],
    'multi-phase': ['Cast Iron', 'Duplex Stainless Steel', 'Multi-Phase Alloys', 'Materials with Inclusions']
};

const gritLabels = {
    '9': '9 μm (Coarse Diamond)',
    '6': '6 μm (Diamond)',
    '3': '3 μm (Fine Diamond)',
    '1': '1 μm (Very Fine Diamond)',
    '0.5': '0.5 μm (Ultra Fine Diamond)',
    '0.25': '0.25 μm (Ultra Fine Diamond)',
    '0.05': '0.05 μm (Colloidal Silica/Alumina)'
};

const materialLabels = {
    hard: 'Hard Materials',
    soft: 'Soft Materials',
    'work-hardening': 'Work-Hardening Materials',
    'multi-phase': 'Multi-Phase Materials'
};

function formatTime(minutes) {
    if (minutes < 1) {
        return `${Math.round(minutes * 60)} seconds`;
    } else if (minutes === Math.floor(minutes)) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
        const wholeMinutes = Math.floor(minutes);
        const seconds = Math.round((minutes - wholeMinutes) * 60);
        return `${wholeMinutes} min ${seconds} sec`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const materialType = document.getElementById('materialType');
    const gritSize = document.getElementById('gritSize');
    const calculateBtn = document.getElementById('calculateBtn');
    const materialExamplesEl = document.getElementById('materialExamples');
    const resultsDiv = document.getElementById('results');

    materialType.addEventListener('change', function() {
        const value = materialType.value;
        if (value && materialExamples[value]) {
            materialExamplesEl.textContent = `Examples: ${materialExamples[value].join(', ')}`;
            materialExamplesEl.style.display = 'block';
        } else {
            materialExamplesEl.style.display = 'none';
        }
        updateCalculateButton();
    });

    gritSize.addEventListener('change', updateCalculateButton);

    function updateCalculateButton() {
        calculateBtn.disabled = !materialType.value || !gritSize.value;
    }

    calculateBtn.addEventListener('click', function() {
        const material = materialType.value;
        const grit = gritSize.value;

        if (!material || !grit) return;

        const result = polishingData[material][grit];
        if (!result) return;

        // Display user selection
        const userSelectionEl = document.getElementById('userSelection');
        userSelectionEl.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div>
                    <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Material Type</div>
                    <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">${materialLabels[material]}</div>
                </div>
                <div>
                    <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Grit/Abrasive Size</div>
                    <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">${gritLabels[grit]}</div>
                </div>
            </div>
        `;

        // Display time result
        const timeResultEl = document.getElementById('timeResult');
        timeResultEl.innerHTML = `
            <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">Polishing Time (for this step)</div>
            <div style="font-size: 2rem; font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">
                ${formatTime(result.timeRange.min)} - ${formatTime(result.timeRange.max)}
            </div>
            <div style="font-size: 0.875rem; color: #6b7280;">
                (${result.timeRange.min} - ${result.timeRange.max} minutes per step)
            </div>
        `;

        // Display parameters
        const parametersEl = document.getElementById('parameters');
        parametersEl.innerHTML = `
            <div style="margin-top: 1.5rem;">
                <div style="margin-bottom: 1rem;">
                    <div style="font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.25rem;">Cloth Type</div>
                    <div style="color: #111827;">${result.clothType}</div>
                </div>
                <div style="margin-bottom: 1rem;">
                    <div style="font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.25rem;">Pressure</div>
                    <div style="color: #111827;">${result.pressure}</div>
                </div>
                <div>
                    <div style="font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Important Notes</div>
                    <ul style="list-style: disc; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
                        ${result.notes.map(note => `<li style="margin-bottom: 0.25rem;">${note}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        resultsDiv.style.display = 'block';
    });
});
