// Grit Size Converter
const conversions = [
    { fepa: 'P12', ansi: '16', jis: '16', micron: '1815' },
    { fepa: 'P16', ansi: '20', jis: '20', micron: '1324' },
    { fepa: 'P20', ansi: '24', jis: '24', micron: '1000' },
    { fepa: 'P24', ansi: '30', jis: '30', micron: '764' },
    { fepa: 'P30', ansi: '36', jis: '36', micron: '642' },
    { fepa: 'P36', ansi: '40', jis: '40', micron: '538' },
    { fepa: 'P40', ansi: '50', jis: '50', micron: '425' },
    { fepa: 'P50', ansi: '60', jis: '60', micron: '336' },
    { fepa: 'P60', ansi: '80', jis: '80', micron: '269' },
    { fepa: 'P80', ansi: '100', jis: '100', micron: '201' },
    { fepa: 'P100', ansi: '120', jis: '120', micron: '162' },
    { fepa: 'P120', ansi: '150', jis: '150', micron: '125' },
    { fepa: 'P150', ansi: '180', jis: '180', micron: '100' },
    { fepa: 'P180', ansi: '220', jis: '220', micron: '82' },
    { fepa: 'P220', ansi: '240', jis: '240', micron: '68' },
    { fepa: 'P240', ansi: '280', jis: '280', micron: '58.5' },
    { fepa: 'P280', ansi: '320', jis: '320', micron: '52.2' },
    { fepa: 'P320', ansi: '360', jis: '360', micron: '46.2' },
    { fepa: 'P360', ansi: '400', jis: '400', micron: '40.5' },
    { fepa: 'P400', ansi: '500', jis: '500', micron: '35.0' },
    { fepa: 'P500', ansi: '600', jis: '600', micron: '30.2' },
    { fepa: 'P600', ansi: '800', jis: '800', micron: '25.8' },
    { fepa: 'P800', ansi: '1000', jis: '1000', micron: '21.8' },
    { fepa: 'P1000', ansi: '1200', jis: '1200', micron: '18.3' },
    { fepa: 'P1200', ansi: '1500', jis: '1500', micron: '15.3' },
    { fepa: 'P1500', ansi: '2000', jis: '2000', micron: '12.6' },
    { fepa: 'P2000', ansi: '2500', jis: '2500', micron: '10.3' },
    { fepa: 'P2500', ansi: '3000', jis: '3000', micron: '8.4' },
];

document.addEventListener('DOMContentLoaded', function() {
    const inputType = document.getElementById('inputType');
    const inputValue = document.getElementById('inputValue');
    const convertBtn = document.getElementById('convertBtn');
    const resultsDiv = document.getElementById('results');

    // Update placeholder based on input type
    inputType.addEventListener('change', function() {
        const type = inputType.value;
        if (type === 'micron') {
            inputValue.placeholder = 'e.g., 125';
        } else if (type === 'fepa') {
            inputValue.placeholder = 'e.g., P120 or 120';
        } else {
            inputValue.placeholder = 'e.g., 150';
        }
    });

    convertBtn.addEventListener('click', handleConvert);
    inputValue.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleConvert();
        }
    });

    function handleConvert() {
        const value = inputValue.value.trim().toUpperCase();
        if (!value) return;

        let match;

        if (inputType.value === 'fepa') {
            // Handle FEPA with or without P prefix
            const fepaValue = value.startsWith('P') ? value : `P${value}`;
            match = conversions.find(c => c.fepa === fepaValue);
        } else if (inputType.value === 'ansi') {
            match = conversions.find(c => c.ansi === value);
        } else if (inputType.value === 'jis') {
            match = conversions.find(c => c.jis === value);
        } else if (inputType.value === 'micron') {
            // Find closest match for micron (allowing some tolerance)
            const micronValue = parseFloat(value);
            if (!isNaN(micronValue)) {
                match = conversions.find(c => {
                    const cMicron = parseFloat(c.micron);
                    // Allow 5% tolerance for matching
                    return Math.abs(cMicron - micronValue) / cMicron < 0.05;
                });
            }
        }

        if (match) {
            document.getElementById('result-fepa').textContent = match.fepa;
            document.getElementById('result-ansi').textContent = match.ansi;
            document.getElementById('result-jis').textContent = match.jis;
            document.getElementById('result-micron').textContent = `${match.micron} μm`;
            resultsDiv.style.display = 'block';
        } else {
            document.getElementById('result-fepa').textContent = 'Not found';
            document.getElementById('result-ansi').textContent = 'Not found';
            document.getElementById('result-jis').textContent = 'Not found';
            document.getElementById('result-micron').textContent = 'Not found';
            resultsDiv.style.display = 'block';
        }
    }
});
