// Procedure Time Estimator
const grindingSteps = [
    { grit: '120', time: { min: 30, max: 60 } },
    { grit: '240', time: { min: 30, max: 60 } },
    { grit: '320', time: { min: 30, max: 60 } },
    { grit: '400', time: { min: 30, max: 60 } },
    { grit: '600', time: { min: 30, max: 60 } },
    { grit: '800', time: { min: 30, max: 60 }, optional: true },
    { grit: '1200', time: { min: 30, max: 60 }, optional: true },
];

const polishingSteps = {
    hard: [
        { grit: '9', time: { min: 4, max: 6 } },
        { grit: '6', time: { min: 3, max: 5 } },
        { grit: '3', time: { min: 3, max: 5 } },
        { grit: '1', time: { min: 2, max: 4 } },
        { grit: '0.5', time: { min: 2, max: 3 } },
        { grit: '0.25', time: { min: 1, max: 2 } },
        { grit: '0.05', time: { min: 1, max: 2 } },
    ],
    soft: [
        { grit: '6', time: { min: 2, max: 4 } },
        { grit: '3', time: { min: 2, max: 3 } },
        { grit: '1', time: { min: 1, max: 2 } },
        { grit: '0.5', time: { min: 1, max: 2 } },
        { grit: '0.25', time: { min: 1, max: 1.5 } },
        { grit: '0.05', time: { min: 0.5, max: 1 } },
    ],
    'work-hardening': [
        { grit: '9', time: { min: 3, max: 5 } },
        { grit: '6', time: { min: 3, max: 4 } },
        { grit: '3', time: { min: 3, max: 5 } },
        { grit: '1', time: { min: 2, max: 3 } },
        { grit: '0.5', time: { min: 1, max: 2 } },
        { grit: '0.25', time: { min: 1, max: 2 } },
        { grit: '0.05', time: { min: 1, max: 2 } },
    ],
    'multi-phase': [
        { grit: '9', time: { min: 3, max: 4 } },
        { grit: '6', time: { min: 2, max: 3 } },
        { grit: '3', time: { min: 2, max: 4 } },
        { grit: '1', time: { min: 1, max: 3 } },
        { grit: '0.5', time: { min: 1, max: 2 } },
        { grit: '0.25', time: { min: 1, max: 1.5 } },
        { grit: '0.05', time: { min: 1, max: 2 } },
    ],
};

const materialExamples = {
    hard: ['Hardened Steels', 'Tool Steels', 'Ceramics', 'Titanium Alloys', 'Hardened Cast Iron'],
    soft: ['Aluminum', 'Copper', 'Lead', 'Tin', 'Soft Brass', 'Pure Metals'],
    'work-hardening': ['Stainless Steel', 'Nickel Alloys', 'Austenitic Steels', 'Work-Hardened Materials'],
    'multi-phase': ['Cast Iron', 'Duplex Stainless Steel', 'Multi-Phase Alloys', 'Materials with Inclusions'],
};

function formatTime(minutes) {
    if (minutes < 1) {
        return `${Math.round(minutes * 60)} sec`;
    } else if (minutes === Math.floor(minutes)) {
        return `${minutes} min`;
    } else {
        const wholeMinutes = Math.floor(minutes);
        const seconds = Math.round((minutes - wholeMinutes) * 60);
        return `${wholeMinutes}m ${seconds}s`;
    }
}

function formatTimeRange(min, max) {
    return `${formatTime(min)} - ${formatTime(max)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const materialType = document.getElementById('materialType');
    const grindingStartGrit = document.getElementById('grindingStartGrit');
    const includeOptionalGrinding = document.getElementById('includeOptionalGrinding');
    const includeMounting = document.getElementById('includeMounting');
    const includeEtching = document.getElementById('includeEtching');
    const includeCleaning = document.getElementById('includeCleaning');
    const estimateBtn = document.getElementById('estimateBtn');
    const materialExamplesEl = document.getElementById('materialExamples');
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');

    materialType.addEventListener('change', function() {
        const value = materialType.value;
        if (value && materialExamples[value]) {
            materialExamplesEl.textContent = `Examples: ${materialExamples[value].join(', ')}`;
            materialExamplesEl.style.display = 'block';
        } else {
            materialExamplesEl.style.display = 'none';
        }
        estimateBtn.disabled = !value;
    });

    estimateBtn.addEventListener('click', function() {
        const material = materialType.value;
        if (!material) return;

        const breakdown = [];

        // Grinding time
        const startIndex = grindingSteps.findIndex(s => s.grit === grindingStartGrit.value);
        const selectedGrindingSteps = grindingSteps.slice(startIndex)
            .filter(s => !s.optional || includeOptionalGrinding.checked);
        
        let grindingMin = 0;
        let grindingMax = 0;
        selectedGrindingSteps.forEach(step => {
            grindingMin += step.time.min;
            grindingMax += step.time.max;
            breakdown.push({
                step: `Grinding ${step.grit} grit`,
                time: formatTimeRange(step.time.min, step.time.max),
            });
        });

        // Polishing time
        const polishingSequence = polishingSteps[material];
        let polishingMin = 0;
        let polishingMax = 0;
        polishingSequence.forEach(step => {
            polishingMin += step.time.min;
            polishingMax += step.time.max;
            breakdown.push({
                step: `Polishing ${step.grit} μm`,
                time: formatTimeRange(step.time.min, step.time.max),
            });
        });

        // Mounting time
        const mountingTime = includeMounting.checked ? 10 : 0;
        if (includeMounting.checked) {
            breakdown.push({
                step: 'Mounting (compression)',
                time: '5-15 min',
            });
        }

        // Etching time
        const etchingTime = includeEtching.checked ? 2 : 0;
        if (includeEtching.checked) {
            breakdown.push({
                step: 'Etching',
                time: '1-3 min',
            });
        }

        // Cleaning time
        const cleaningTime = includeCleaning.checked ? 5 : 0;
        if (includeCleaning.checked) {
            breakdown.push({
                step: 'Cleaning (between steps)',
                time: '3-7 min',
            });
        }

        const totalMin = grindingMin + polishingMin + mountingTime + etchingTime + cleaningTime;
        const totalMax = grindingMax + polishingMax + mountingTime + etchingTime + cleaningTime;

        resultsContent.innerHTML = `
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Total Estimated Time</div>
                <div style="font-size: 2rem; font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">
                    ${formatTimeRange(totalMin, totalMax)}
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    (${totalMin.toFixed(1)} - ${totalMax.toFixed(1)} minutes)
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                    <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Grinding</div>
                    <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">
                        ${formatTimeRange(grindingMin, grindingMax)}
                    </div>
                </div>
                <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                    <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Polishing</div>
                    <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">
                        ${formatTimeRange(polishingMin, polishingMax)}
                    </div>
                </div>
                ${mountingTime > 0 ? `
                    <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                        <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Mounting</div>
                        <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">~${formatTime(mountingTime)}</div>
                    </div>
                ` : ''}
                ${etchingTime > 0 ? `
                    <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                        <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Etching</div>
                        <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">~${formatTime(etchingTime)}</div>
                    </div>
                ` : ''}
                ${cleaningTime > 0 ? `
                    <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                        <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Cleaning</div>
                        <div style="font-size: 1.125rem; font-weight: 600; color: #111827;">~${formatTime(cleaningTime)}</div>
                    </div>
                ` : ''}
            </div>
            <div>
                <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem;">Time Breakdown by Step</h3>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${breakdown.map(item => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #f9fafb; border-radius: 0.5rem;">
                            <span style="color: #374151;">${item.step}</span>
                            <span style="color: #111827; font-weight: 600;">${item.time}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div style="margin-top: 1.5rem; padding: 1rem; background: #dbeafe; border-radius: 0.5rem;">
                <p style="font-size: 0.875rem; color: #374151; margin: 0;">
                    <strong>Note:</strong> These are estimates based on typical preparation procedures. Actual times 
                    may vary based on sample size, operator experience, equipment condition, and material-specific 
                    requirements. Times are for individual steps in sequence - the sample should be prepared through 
                    previous steps before using these estimates.
                </p>
            </div>
        `;
        resultsDiv.style.display = 'block';
    });
});
