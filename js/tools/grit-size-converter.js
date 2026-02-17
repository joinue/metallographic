// Grit Size Converter
// Sources: ISO 6344 (FEPA P-grade), ANSI B74.12/B74.10 (Washington Mills),
//          JIS R6001 (Fine Tools / Zische), Klingspor coated abrasive data
//
// Macrogrits (P12–P220): Same grit number used across all three standards.
//   Actual particle sizes differ slightly between standards at the same number.
// Microgrits (P240+): Standards diverge; equivalents matched by closest particle size.
//   "-" means no direct equivalent in that standard.
const conversions = [
    // Macrogrits - same designation number across FEPA P, ANSI/CAMI, and JIS
    { fepa: 'P12',   ansi: '12',  jis: '-',   micron: '1815' },
    { fepa: 'P16',   ansi: '16',  jis: '-',   micron: '1324' },
    { fepa: 'P20',   ansi: '20',  jis: '-',   micron: '1000' },
    { fepa: 'P24',   ansi: '24',  jis: '-',   micron: '764' },
    { fepa: 'P30',   ansi: '30',  jis: '-',   micron: '642' },
    { fepa: 'P36',   ansi: '36',  jis: '36',  micron: '538' },
    { fepa: 'P40',   ansi: '40',  jis: '40',  micron: '425' },
    { fepa: 'P50',   ansi: '50',  jis: '50',  micron: '336' },
    { fepa: 'P60',   ansi: '60',  jis: '60',  micron: '269' },
    { fepa: 'P80',   ansi: '80',  jis: '80',  micron: '201' },
    { fepa: 'P100',  ansi: '100', jis: '100', micron: '162' },
    { fepa: 'P120',  ansi: '120', jis: '120', micron: '125' },
    { fepa: 'P150',  ansi: '150', jis: '150', micron: '100' },
    { fepa: 'P180',  ansi: '180', jis: '180', micron: '82' },
    { fepa: 'P220',  ansi: '220', jis: '220', micron: '68' },
    // Microgrits - particle-size matched (ANSI per B74.10, JIS per R6001)
    { fepa: 'P240',  ansi: '-',   jis: '-',    micron: '58.5' },
    { fepa: 'P280',  ansi: '-',   jis: '-',    micron: '52.2' },
    { fepa: 'P320',  ansi: '240', jis: '360',  micron: '46.2' },
    { fepa: 'P360',  ansi: '280', jis: '400',  micron: '40.5' },
    { fepa: 'P400',  ansi: '-',   jis: '500',  micron: '35.0' },
    { fepa: 'P500',  ansi: '320', jis: '600',  micron: '30.2' },
    { fepa: 'P600',  ansi: '-',   jis: '700',  micron: '25.8' },
    { fepa: 'P800',  ansi: '360', jis: '800',  micron: '21.8' },
    { fepa: 'P1000', ansi: '400', jis: '1000', micron: '18.3' },
    { fepa: 'P1200', ansi: '500', jis: '-',    micron: '15.3' },
    { fepa: 'P1500', ansi: '-',   jis: '1200', micron: '12.6' },
    { fepa: 'P2000', ansi: '600', jis: '1500', micron: '10.3' },
    { fepa: 'P2500', ansi: '800', jis: '2000', micron: '8.4' },
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
            const fepaValue = value.startsWith('P') ? value : 'P' + value;
            match = conversions.find(function(c) { return c.fepa === fepaValue; });
        } else if (inputType.value === 'ansi') {
            match = conversions.find(function(c) { return c.ansi === value; });
        } else if (inputType.value === 'jis') {
            match = conversions.find(function(c) { return c.jis === value; });
        } else if (inputType.value === 'micron') {
            var micronValue = parseFloat(value);
            if (!isNaN(micronValue)) {
                match = conversions.find(function(c) {
                    var cMicron = parseFloat(c.micron);
                    return Math.abs(cMicron - micronValue) / cMicron < 0.05;
                });
            }
        }

        // Remove any previous error message
        var prevError = resultsDiv.querySelector('.convert-error');
        if (prevError) prevError.remove();

        if (match) {
            document.getElementById('result-fepa').textContent = match.fepa;
            document.getElementById('result-ansi').textContent = match.ansi === '-' ? 'No direct equivalent' : match.ansi;
            document.getElementById('result-jis').textContent = match.jis === '-' ? 'No direct equivalent' : match.jis;
            document.getElementById('result-micron').textContent = match.micron + ' μm';
            resultsDiv.querySelector('h2').textContent = 'Conversion Results';
            resultsDiv.style.display = 'block';
        } else {
            document.getElementById('result-fepa').textContent = '-';
            document.getElementById('result-ansi').textContent = '-';
            document.getElementById('result-jis').textContent = '-';
            document.getElementById('result-micron').textContent = '-';
            resultsDiv.querySelector('h2').textContent = 'No Match Found';

            var type = inputType.value;
            var validValues = conversions.map(function(c) { return c[type]; }).filter(function(v) { return v !== '-'; });
            var errorMsg = document.createElement('p');
            errorMsg.className = 'convert-error';
            errorMsg.style.cssText = 'color:#b91c1c;font-size:0.875rem;margin-bottom:1rem;';
            errorMsg.textContent = '"' + inputValue.value.trim() + '" is not a recognized ' + type.toUpperCase() + ' value. Valid values: ' + validValues.join(', ');
            resultsDiv.querySelector('h2').after(errorMsg);
            resultsDiv.style.display = 'block';
        }
    }
});
