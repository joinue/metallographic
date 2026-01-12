// Lab Builder JavaScript
// Converted from React/Next.js components to vanilla JavaScript

(function() {
  'use strict';

  // Storage keys
  const STORAGE_KEY = 'builder-form-data';
  const STORAGE_STEP_KEY = 'builder-step';
  const STORAGE_RECOMMENDATIONS_KEY = 'builder-recommendations';

  // Process stage options
  const processStageOptions = [
    { id: 'sectioning', label: 'Sectioning', description: 'Cutting and sample preparation equipment', icon: '🔧' },
    { id: 'mounting', label: 'Mounting', description: 'Sample mounting equipment and materials', icon: '📦' },
    { id: 'grinding', label: 'Grinding', description: 'Grinding equipment and abrasives', icon: '⚙️' },
    { id: 'polishing', label: 'Polishing', description: 'Polishing equipment and consumables', icon: '✨' },
    { id: 'etching', label: 'Etching', description: 'Etchants and etching supplies', icon: '💧' },
    { id: 'microscopy', label: 'Microscopy', description: 'Microscopes and imaging equipment', icon: '🔬' },
    { id: 'cleaning', label: 'Cleaning', description: 'Sample cleaning equipment', icon: '🧪' },
    { id: 'hardness', label: 'Hardness Testing', description: 'Hardness testing equipment', icon: '📊' }
  ];

  // Form data state
  let formData = {
    processStages: ['sectioning', 'mounting', 'grinding', 'polishing'],
    materialType: '',
    materialHardness: '',
    sampleSize: '',
    sampleShape: '',
    applications: [],
    throughput: '',
    automation: '',
    budget: '',
    surfaceFinish: ''
  };

  let currentStep = 1;
  let recommendations = [];
  let isGenerating = false;

  // Initialize
  function init() {
    loadFromStorage();
    renderStages();
    setupEventListeners();
    updateProgress();
    showStep(currentStep);
  }

  // Load from sessionStorage
  function loadFromStorage() {
    try {
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        formData = { ...formData, ...parsed };
      }

      const savedStep = sessionStorage.getItem(STORAGE_STEP_KEY);
      if (savedStep) {
        const stepNum = parseInt(savedStep, 10);
        if (stepNum >= 1 && stepNum <= 4) {
          currentStep = stepNum;
        }
      }

      const savedRecs = sessionStorage.getItem(STORAGE_RECOMMENDATIONS_KEY);
      if (savedRecs) {
        recommendations = JSON.parse(savedRecs);
      }
    } catch (e) {
      console.error('Error loading from storage:', e);
    }
  }

  // Save to sessionStorage
  function saveToStorage() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      sessionStorage.setItem(STORAGE_STEP_KEY, currentStep.toString());
      if (recommendations.length > 0) {
        sessionStorage.setItem(STORAGE_RECOMMENDATIONS_KEY, JSON.stringify(recommendations));
      }
    } catch (e) {
      console.error('Error saving to storage:', e);
    }
  }

  // Render process stages
  function renderStages() {
    const container = document.getElementById('stages-list');
    if (!container) return;

    container.innerHTML = processStageOptions.map(option => {
      const isSelected = formData.processStages.includes(option.id);
      return `
        <label class="builder-stage-option ${isSelected ? 'selected' : ''}" data-stage-id="${option.id}">
          <input type="checkbox" ${isSelected ? 'checked' : ''} class="builder-stage-checkbox">
          <div class="builder-stage-content">
            <div class="builder-stage-header">
              <span class="builder-stage-icon">${option.icon}</span>
              <span class="builder-stage-label">${option.label}</span>
            </div>
            <p class="builder-stage-description">${option.description}</p>
          </div>
        </label>
      `;
    }).join('');

    // Add event listeners
    container.querySelectorAll('.builder-stage-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', handleStageToggle);
    });
  }

  // Handle stage toggle
  function handleStageToggle(e) {
    const stageId = e.target.closest('.builder-stage-option').dataset.stageId;
    if (e.target.checked) {
      if (!formData.processStages.includes(stageId)) {
        formData.processStages.push(stageId);
      }
    } else {
      formData.processStages = formData.processStages.filter(id => id !== stageId);
    }
    updateStageAppearance();
    updateStep1Button();
    saveToStorage();
  }

  // Update stage appearance
  function updateStageAppearance() {
    document.querySelectorAll('.builder-stage-option').forEach(option => {
      const stageId = option.dataset.stageId;
      if (formData.processStages.includes(stageId)) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  }

  // Update step 1 button state
  function updateStep1Button() {
    const button = document.getElementById('step-1-next');
    const error = document.getElementById('step-1-error');
    const canProceed = formData.processStages.length > 0;

    if (button) {
      button.disabled = !canProceed;
    }
    if (error) {
      error.style.display = canProceed ? 'none' : 'block';
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    // Select/Deselect All
    const selectAll = document.getElementById('select-all-stages');
    const deselectAll = document.getElementById('deselect-all-stages');
    if (selectAll) {
      selectAll.addEventListener('click', () => {
        formData.processStages = processStageOptions.map(opt => opt.id);
        renderStages();
        updateStep1Button();
        saveToStorage();
      });
    }
    if (deselectAll) {
      deselectAll.addEventListener('click', () => {
        formData.processStages = [];
        renderStages();
        updateStep1Button();
        saveToStorage();
      });
    }

    // Step navigation
    const step1Next = document.getElementById('step-1-next');
    const step2Back = document.getElementById('step-2-back');
    const step2Next = document.getElementById('step-2-next');
    const step3Back = document.getElementById('step-3-back');
    const step3Generate = document.getElementById('step-3-generate');

    if (step1Next) step1Next.addEventListener('click', () => goToStep(2));
    if (step2Back) step2Back.addEventListener('click', () => goToStep(1));
    if (step2Next) step2Next.addEventListener('click', () => goToStep(3));
    if (step3Back) step3Back.addEventListener('click', () => goToStep(2));
    if (step3Generate) step3Generate.addEventListener('click', handleGenerate);

    // Form field changes
    const materialType = document.getElementById('material-type');
    const materialHardness = document.getElementById('material-hardness');
    const sampleSize = document.getElementById('sample-size');
    const sampleShape = document.getElementById('sample-shape');
    const throughput = document.getElementById('throughput');
    const automation = document.getElementById('automation');
    const budget = document.getElementById('budget');
    const surfaceFinish = document.getElementById('surface-finish');

    if (materialType) {
      materialType.addEventListener('change', (e) => {
        formData.materialType = e.target.value;
        updateStep2Button();
        saveToStorage();
      });
    }
    if (materialHardness) {
      materialHardness.addEventListener('change', (e) => {
        formData.materialHardness = e.target.value;
        updateStep2Button();
        saveToStorage();
      });
    }
    if (sampleSize) {
      sampleSize.addEventListener('change', (e) => {
        formData.sampleSize = e.target.value;
        updateStep2Button();
        saveToStorage();
      });
    }
    if (sampleShape) {
      sampleShape.addEventListener('change', (e) => {
        formData.sampleShape = e.target.value;
        saveToStorage();
      });
    }
    if (throughput) {
      throughput.addEventListener('change', (e) => {
        formData.throughput = e.target.value;
        updateStep3Button();
        saveToStorage();
      });
    }
    if (automation) {
      automation.addEventListener('change', (e) => {
        formData.automation = e.target.value;
        updateStep3Button();
        saveToStorage();
      });
    }
    if (budget) {
      budget.addEventListener('change', (e) => {
        formData.budget = e.target.value;
        updateStep3Button();
        saveToStorage();
      });
    }
    if (surfaceFinish) {
      surfaceFinish.addEventListener('change', (e) => {
        formData.surfaceFinish = e.target.value;
        saveToStorage();
      });
    }

    // Applications checkboxes
    document.querySelectorAll('input[name="applications"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          if (!formData.applications.includes(e.target.value)) {
            formData.applications.push(e.target.value);
          }
        } else {
          formData.applications = formData.applications.filter(app => app !== e.target.value);
        }
        saveToStorage();
      });
    });

    // Back button
    const backButton = document.getElementById('back-button');
    if (backButton) {
      backButton.addEventListener('click', handleBack);
    }

    // Scroll to top
    const scrollTop = document.getElementById('scroll-to-top');
    if (scrollTop) {
      scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('scroll', () => {
        scrollTop.style.display = window.scrollY > 400 ? 'block' : 'none';
      });
    }

    // Expert review modal
    const getExpertReview = document.getElementById('get-expert-review');
    const closeExpertReview = document.getElementById('close-expert-review');
    const cancelExpertReview = document.getElementById('cancel-expert-review');
    const expertReviewForm = document.getElementById('expert-review-form');
    const expertReviewModal = document.getElementById('expert-review-modal');

    if (getExpertReview) {
      getExpertReview.addEventListener('click', () => {
        if (expertReviewModal) expertReviewModal.style.display = 'flex';
      });
    }
    if (closeExpertReview) {
      closeExpertReview.addEventListener('click', () => {
        if (expertReviewModal) expertReviewModal.style.display = 'none';
      });
    }
    if (cancelExpertReview) {
      cancelExpertReview.addEventListener('click', () => {
        if (expertReviewModal) expertReviewModal.style.display = 'none';
      });
    }
    if (expertReviewForm) {
      expertReviewForm.addEventListener('submit', handleExpertReviewSubmit);
    }

    // Download PDF
    const downloadPDF = document.getElementById('download-pdf');
    if (downloadPDF) {
      downloadPDF.addEventListener('click', handleDownloadPDF);
    }

    // Start over
    const startOver = document.getElementById('start-over');
    if (startOver) {
      startOver.addEventListener('click', handleStartOver);
    }

    // Populate form fields from saved data
    populateFormFields();
  }

  // Populate form fields from saved data
  function populateFormFields() {
    if (formData.materialType) {
      const materialType = document.getElementById('material-type');
      if (materialType) materialType.value = formData.materialType;
    }
    if (formData.materialHardness) {
      const materialHardness = document.getElementById('material-hardness');
      if (materialHardness) materialHardness.value = formData.materialHardness;
    }
    if (formData.sampleSize) {
      const sampleSize = document.getElementById('sample-size');
      if (sampleSize) sampleSize.value = formData.sampleSize;
    }
    if (formData.sampleShape) {
      const sampleShape = document.getElementById('sample-shape');
      if (sampleShape) sampleShape.value = formData.sampleShape;
    }
    if (formData.throughput) {
      const throughput = document.getElementById('throughput');
      if (throughput) throughput.value = formData.throughput;
    }
    if (formData.automation) {
      const automation = document.getElementById('automation');
      if (automation) automation.value = formData.automation;
    }
    if (formData.budget) {
      const budget = document.getElementById('budget');
      if (budget) budget.value = formData.budget;
    }
    if (formData.surfaceFinish) {
      const surfaceFinish = document.getElementById('surface-finish');
      if (surfaceFinish) surfaceFinish.value = formData.surfaceFinish;
    }

    // Applications
    formData.applications.forEach(app => {
      const checkbox = document.querySelector(`input[name="applications"][value="${app}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }

  // Update step 2 button state
  function updateStep2Button() {
    const button = document.getElementById('step-2-next');
    const error = document.getElementById('step-2-error');
    const canProceed = formData.materialType && formData.materialHardness && formData.sampleSize;

    if (button) {
      button.disabled = !canProceed;
    }
    if (error) {
      error.style.display = canProceed ? 'none' : 'block';
    }
  }

  // Update step 3 button state
  function updateStep3Button() {
    const button = document.getElementById('step-3-generate');
    const error = document.getElementById('step-3-error');
    const canProceed = formData.throughput && formData.automation && formData.budget;

    if (button) {
      button.disabled = !canProceed || isGenerating;
    }
    if (error) {
      error.style.display = canProceed ? 'none' : 'block';
    }
  }

  // Go to step
  function goToStep(step) {
    if (step < 1 || step > 4) return;
    currentStep = step;
    showStep(step);
    updateProgress();
    saveToStorage();

    // Scroll to step
    setTimeout(() => {
      const stepElement = document.getElementById(`step-${step}`);
      if (stepElement) {
        stepElement.focus();
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Show step
  function showStep(step) {
    // Hide all steps
    for (let i = 1; i <= 4; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      if (stepEl) stepEl.style.display = 'none';
    }

    // Show current step
    const currentStepEl = document.getElementById(`step-${step}`);
    if (currentStepEl) {
      currentStepEl.style.display = 'block';
    }

    // Show/hide info banner
    const infoBanner = document.getElementById('info-banner');
    if (infoBanner) {
      infoBanner.style.display = step === 1 ? 'block' : 'none';
    }

    // If step 4, render results
    if (step === 4 && recommendations.length > 0) {
      renderResults();
    }
  }

  // Update progress indicators
  function updateProgress() {
    for (let i = 1; i <= 4; i++) {
      const stepEl = document.querySelector(`.builder-progress-step[data-step="${i}"]`);
      const circle = stepEl?.querySelector('.builder-progress-circle');
      const line = document.querySelector(`.builder-progress-line[data-before="${i}"]`);

      if (i < currentStep) {
        if (circle) {
          circle.innerHTML = '✓';
          circle.classList.add('completed');
        }
        if (line) line.classList.add('completed');
      } else if (i === currentStep) {
        if (circle) {
          circle.innerHTML = i.toString();
          circle.classList.add('active');
          circle.classList.remove('completed');
        }
        if (line) line.classList.remove('completed');
      } else {
        if (circle) {
          circle.innerHTML = i.toString();
          circle.classList.remove('active', 'completed');
        }
        if (line) line.classList.remove('completed');
      }
    }
  }

  // Handle generate
  function handleGenerate() {
    if (!formData.throughput || !formData.automation || !formData.budget) {
      return;
    }

    isGenerating = true;
    updateStep3Button();

    // Generate recommendations
    recommendations = generateRecommendations(formData);
    
    // Save and go to results
    saveToStorage();
    goToStep(4);

    // Scroll to results
    setTimeout(() => {
      const resultsEl = document.getElementById('recommendations-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        resultsEl.focus();
      }
    }, 100);

    isGenerating = false;
  }

  // Generate recommendations (converted from useBuilderRecommendations.ts)
  function generateRecommendations(formData) {
    const recommendations = [];
    
    // Parse input parameters
    const hardness = formData.materialHardness || '';
    const sampleSize = formData.sampleSize || '';
    const sampleShape = formData.sampleShape || '';
    const throughput = formData.throughput || '';
    const automation = formData.automation || '';
    const budget = formData.budget || '';
    const materialType = formData.materialType || '';
    const surfaceFinish = formData.surfaceFinish || '';
    const applications = formData.applications || [];
    const selectedStages = formData.processStages || [];

    // Derived characteristics
    const isHard = hardness.includes('Hard') || hardness.includes('Very Hard');
    const isVeryHard = hardness.includes('Very Hard');
    const isSoft = hardness.includes('Soft');
    const isLarge = sampleSize.includes('Large') || sampleSize.includes('Very Large');
    const isVeryLarge = sampleSize.includes('Very Large');
    const isSmall = sampleSize.includes('Small');
    const isDelicate = sampleShape === 'Small' || sampleShape === 'Thin';
    const isHighThroughput = throughput.includes('High') || throughput.includes('Very High');
    const isVeryHighThroughput = throughput.includes('Very High');
    const isAutomated = automation.includes('Automated');
    const isSemiAutomated = automation.includes('Semi-Automated');
    const needsEBSD = applications.includes('EBSD') || surfaceFinish.includes('EBSD') || surfaceFinish.includes('Extremely Flat');
    const isHardMaterial = materialType.includes('Hard Metals') || materialType.includes('Ceramics');
    const isBrittle = materialType.includes('Ceramics') || materialType.includes('Hard Metals');

    // SECTIONING RECOMMENDATIONS
    if (selectedStages.includes('sectioning')) {
      const sectionType = formData.sectionType || 'Cross-section';
      const damageCriticality = formData.damageCriticality || 'Standard';
      const needsHighPrecision = damageCriticality === 'High' || damageCriticality === 'Very High';
      const needsSpecificFeature = sectionType === 'Specific feature' || sectionType === 'Surface';
      
      const needsTableFeed = throughput && (throughput.includes('Medium') || throughput.includes('High') || throughput.includes('Very High'));
      const needsAutomatedTableFeed = (throughput && (throughput.includes('High') || throughput.includes('Very High'))) || automation.includes('Automated');
      
      if (isSmall && (isDelicate || needsEBSD || surfaceFinish.includes('Extremely Flat') || needsHighPrecision || needsSpecificFeature)) {
        recommendations.push({
          type: 'Precision Wafering System with Diamond Blades',
          reasoning: 'Essential for small delicate samples. Precision wafering with thin diamond blades (3-8 inch) minimizes damage and material loss. Standard abrasive saws (minimum 10-inch) are too large for small samples. Produces smoother cut surfaces with less damage, reducing subsequent grinding time.',
          category: 'equipment',
          stage: 'sectioning'
        });
        recommendations.push({
          type: 'Diamond Wafering Blades (3-8 inch)',
          reasoning: 'Thin diamond blades (0.1-0.5 mm) minimize kerf width and material loss. Essential for small samples where material conservation is important. High concentration diamond blades provide precise cutting with minimal heat generation.',
          category: 'consumable',
          stage: 'sectioning'
        });
      } else {
        const bladeSize = isVeryLarge ? '14-16 inch' : isLarge ? '12-14 inch' : '10-12 inch';
        let feedType = '';
        if (needsAutomatedTableFeed) {
          feedType = 'with Automated Table Feed';
        } else if (needsTableFeed) {
          feedType = 'with Manual Table Feed';
        } else if (budget === 'Essential' && isSmall) {
          feedType = 'with Wheel Feed Only (Budget Option)';
        } else {
          feedType = 'with Table Feed';
        }
        
        recommendations.push({
          type: `${bladeSize} Abrasive Cut-off Saw ${feedType}`,
          reasoning: `Primary sectioning method for ${materialType || 'most materials'}. Versatile and cost-effective, suitable for a wide range of materials from soft metals to hard steels and ceramics. Standard abrasive saws start at 10-inch (250mm) blade size. ${needsAutomatedTableFeed ? 'Automated table feed ensures consistent cutting parameters for high throughput.' : needsTableFeed ? 'Table feed provides better control and consistency for medium to high throughput.' : 'Wheel feed only provides cost-effective sectioning for low-volume work.'} Appropriate blade size for ${sampleSize.toLowerCase()} samples.`,
          category: 'equipment',
          stage: 'sectioning'
        });
        
        if (isHardMaterial || isVeryHard) {
          recommendations.push({
            type: 'Silicon Carbide Abrasive Cut-off Wheels',
            reasoning: 'SiC abrasive wheels provide aggressive cutting action essential for hard materials and ceramics. Proper blade selection and adequate cooling prevent excessive heat generation that could alter microstructure.',
            category: 'consumable',
            stage: 'sectioning'
          });
        } else if (isSoft) {
          recommendations.push({
            type: 'Aluminum Oxide Abrasive Cut-off Wheels',
            reasoning: 'Alumina abrasive wheels suitable for soft non-ferrous metals. Proper blade selection prevents excessive heat generation and material smearing in soft materials.',
            category: 'consumable',
            stage: 'sectioning'
          });
        } else {
          recommendations.push({
            type: 'Abrasive Cut-off Wheels',
            reasoning: `Silicon carbide or alumina abrasive wheels suitable for ${materialType || 'metallic materials'}. Proper blade selection prevents excessive heat generation.`,
            category: 'consumable',
            stage: 'sectioning'
          });
        }
        
        recommendations.push({
          type: 'Cutting Fluid / Coolant',
          reasoning: 'Essential for cooling and lubrication during cutting. Prevents excessive heat generation that could cause phase transformations or microstructural changes.',
          category: 'consumable',
          stage: 'sectioning'
        });
      }
    }

    // MOUNTING RECOMMENDATIONS
    if (selectedStages.includes('mounting')) {
      const needsColdMounting = isSoft || isDelicate || materialType.includes('Titanium') || materialType.includes('Heat-Sensitive');
      
      if (needsColdMounting) {
        if (isHighThroughput) {
          recommendations.push({
            type: 'UV Curing Mounting System',
            reasoning: 'Fastest cold mounting cycles for high-volume work. Essential for temperature-sensitive materials where compression mounting heat would alter microstructure.',
            category: 'equipment',
            stage: 'mounting'
          });
        } else {
          recommendations.push({
            type: 'Vacuum Impregnation System',
            reasoning: 'Removes air bubbles for clear mounts without heat application. Essential for soft metals and heat-sensitive materials. Prevents thermal damage that could mask true microstructure.',
            category: 'equipment',
            stage: 'mounting'
          });
        }
        recommendations.push({
          type: 'Epoxy Mounting Resins',
          reasoning: 'High-quality epoxy resins for cold mounting. Excellent edge retention and chemical resistance essential for microstructure preservation.',
          category: 'consumable',
          stage: 'mounting'
        });
      } else {
        const pressType = isAutomated ? 'Automated' : 'Manual';
        recommendations.push({
          type: `${pressType} Compression Mounting Press`,
          reasoning: 'Fast cycles and good edge retention for most materials. Heat and pressure application suitable for materials that can tolerate thermal cycling.',
          category: 'equipment',
          stage: 'mounting'
        });
        recommendations.push({
          type: 'Thermosetting Mounting Resins',
          reasoning: 'Phenolic or diallyl phthalate (DAP) resins for compression mounting. Select based on material compatibility and edge retention needs.',
          category: 'consumable',
          stage: 'mounting'
        });
      }
    }

    // GRINDING RECOMMENDATIONS
    if (selectedStages.includes('grinding')) {
      if (isLarge || isVeryLarge) {
        recommendations.push({
          type: 'Belt Grinder / Hand Grinder',
          reasoning: `Essential for initial rough grinding of ${sampleSize.toLowerCase()} samples. Provides fastest material removal before fine grinding with papers. Critical for large samples requiring significant material removal.`,
          category: 'equipment',
          stage: 'grinding'
        });
      }
      
      const platenSize = isLarge || isVeryLarge ? '12 inch' : '8-10 inch';
      const automationType = isAutomated ? 'Programmable' : isSemiAutomated ? 'Semi-automated' : 'Manual';
      
      recommendations.push({
        type: `${platenSize} ${automationType} Grinder/Polisher`,
        reasoning: `Appropriate platen size for ${sampleSize.toLowerCase()} samples. ${isAutomated ? 'Programmable operation ensures consistent grinding parameters.' : 'Manual control provides flexibility for varied materials.'}`,
        category: 'equipment',
        stage: 'grinding'
      });
      
      let grindingSequence = [];
      if (isSoft) {
        grindingSequence = ['240', '320', '400', '600'];
      } else if (isHardMaterial || isVeryHard) {
        grindingSequence = ['120', '240', '320', '400', '600', '800', '1200'];
      } else if (isHard) {
        grindingSequence = ['120', '240', '320', '400', '600', '800', '1200'];
      } else {
        grindingSequence = ['120', '240', '320', '400', '600', '800', '1200'];
      }
      
      const gritList = grindingSequence.join(', ');
      
      if (isHardMaterial || isVeryHard) {
        recommendations.push({
          type: `Silicon Carbide Grinding Papers (${gritList} grit)`,
          reasoning: `SiC provides aggressive cutting action essential for hard materials. Follow progressive sequence: ${gritList} grit. ${grindingSequence.includes('800') || grindingSequence.includes('1200') ? 'Fine grits (800, 1200) recommended for best surface quality before polishing.' : ''}`,
          category: 'consumable',
          stage: 'grinding'
        });
      } else if (isSoft) {
        recommendations.push({
          type: `Aluminum Oxide or Fine SiC Grinding Papers (${gritList} grit)`,
          reasoning: `Finer abrasives (starting at 240 grit) with light pressure minimize embedding and relief in soft materials. Follow sequence: ${gritList} grit. Essential for preserving true microstructure.`,
          category: 'consumable',
          stage: 'grinding'
        });
      } else {
        recommendations.push({
          type: `Grinding Papers (${gritList} grit)`,
          reasoning: `Standard grinding papers in progressive grit sizes: ${gritList}. ${grindingSequence.includes('800') || grindingSequence.includes('1200') ? 'Fine grits (800, 1200) recommended for optimal surface preparation before polishing.' : 'Follow progressive grinding steps for optimal surface preparation.'}`,
          category: 'consumable',
          stage: 'grinding'
        });
      }
    }

    // POLISHING RECOMMENDATIONS
    if (selectedStages.includes('polishing')) {
      const platenSize = isLarge || isVeryLarge ? '12 inch' : '8-10 inch';
      const automationType = isAutomated ? 'Programmable' : isSemiAutomated ? 'Semi-automated' : 'Manual';
      
      const needsDualWheel = isHighThroughput || isVeryHighThroughput || 
                             (applications.includes('Quality Control') && isHighThroughput) ||
                             (applications.includes('Production Testing'));
      
      if (needsDualWheel) {
        recommendations.push({
          type: `Dual Wheel ${platenSize} ${automationType} Grinder/Polisher`,
          reasoning: `Dual wheel configuration allows dedicated wheels for grinding and polishing, preventing cross-contamination and improving throughput. ${isAutomated ? 'Programmable operation ensures consistent polishing parameters.' : 'Manual control provides flexibility.'} Essential for high-volume production and quality control where sample-to-sample contamination must be avoided.`,
          category: 'equipment',
          stage: 'polishing'
        });
      } else {
        recommendations.push({
          type: `${platenSize} ${automationType} Grinder/Polisher`,
          reasoning: `Can handle both grinding and polishing operations with polishing suspension. ${isAutomated ? 'Programmable operation ensures consistent polishing parameters.' : 'Manual control provides flexibility.'}`,
          category: 'equipment',
          stage: 'polishing'
        });
      }
      
      let polishingSequence = [];
      if (isSoft) {
        polishingSequence = ['6', '3', '1', '0.5', '0.25'];
      } else if (isHardMaterial || isVeryHard) {
        polishingSequence = ['9', '6', '3', '1', '0.5', '0.25'];
      } else {
        polishingSequence = ['9', '6', '3', '1', '0.5', '0.25'];
      }
      
      const coarseDiamond = polishingSequence.find(g => parseFloat(g) >= 3) || '3';
      
      recommendations.push({
        type: `Diamond Polishing Suspensions (${coarseDiamond} µm to 0.25 µm)`,
        reasoning: `Diamond suspensions for progressive polishing steps: ${polishingSequence.join(', ')} µm. Essential for removing grinding scratches and achieving high-quality surface finish.`,
        category: 'consumable',
        stage: 'polishing'
      });
      
      recommendations.push({
        type: 'Polishing Cloths (synthetic)',
        reasoning: 'Synthetic polishing cloths for diamond polishing stages. Provides consistent surface for diamond suspension application.',
        category: 'consumable',
        stage: 'polishing'
      });
    }

    // FINAL POLISHING RECOMMENDATIONS
    if (selectedStages.includes('polishing')) {
      if (needsEBSD || surfaceFinish.includes('Extremely Flat') || surfaceFinish.includes('High Quality')) {
        recommendations.push({
          type: 'Vibratory Polisher',
          reasoning: 'Essential for EBSD preparation and extremely flat surfaces. Produces deformation-free surfaces with minimal relief critical for electron backscatter diffraction. Uses vibration to polish samples without mechanical pressure.',
          category: 'equipment',
          stage: 'final-polishing'
        });
        recommendations.push({
          type: 'Colloidal Silica Polishing Suspension (0.05 µm)',
          reasoning: 'Final polishing step for extremely flat surfaces. Essential for EBSD and advanced characterization techniques requiring minimal surface relief and deformation-free surfaces.',
          category: 'consumable',
          stage: 'final-polishing'
        });
        recommendations.push({
          type: 'Napped Polishing Cloth',
          reasoning: 'Napped cloth essential for final colloidal silica polishing. Provides gentle polishing action for deformation-free surfaces.',
          category: 'consumable',
          stage: 'final-polishing'
        });
      } else {
        recommendations.push({
          type: 'Fine Diamond Suspension (0.25 µm) or Colloidal Silica (0.05 µm)',
          reasoning: 'Final polishing step for high-quality surface finish. Removes fine scratches from previous polishing steps and prepares surface for microstructural analysis.',
          category: 'consumable',
          stage: 'final-polishing'
        });
        recommendations.push({
          type: 'Napped Polishing Cloth',
          reasoning: 'Napped cloth for final polishing steps. Provides appropriate surface for fine polishing suspensions.',
          category: 'consumable',
          stage: 'final-polishing'
        });
      }
    }

    // ETCHING RECOMMENDATIONS
    if (selectedStages.includes('etching')) {
      recommendations.push({
        type: 'Fume Hood / Ventilation System',
        reasoning: 'SAFETY CRITICAL: Essential for safe handling of etchants. Protects operators from chemical fumes and ensures compliance with safety regulations. Required for all etching operations.',
        category: 'equipment',
        stage: 'etching'
      });
      
      recommendations.push({
        type: 'Etchants (material-specific)',
        reasoning: `Select etchants appropriate for ${materialType || 'your material'}. Common options include nital for carbon steels, Vilella's for stainless steel, and Kroll's for titanium. Use the Etchant Selector tool to find the right etchant for your material.`,
        category: 'consumable',
        stage: 'etching'
      });
    }

    // MICROSCOPY RECOMMENDATIONS
    if (selectedStages.includes('microscopy')) {
      const scopeType = needsEBSD || applications.includes('Research & Development') ? 'Advanced' : isHighThroughput ? 'Production' : 'Standard';
      recommendations.push({
        type: `${scopeType} Metallurgical Microscope`,
        reasoning: `${scopeType.toLowerCase()} microscope suitable for ${isHighThroughput ? 'high-throughput' : 'routine'} metallographic analysis. Consider digital imaging capabilities for documentation.`,
        category: 'equipment',
        stage: 'microscopy'
      });
      
      const needsImaging = isHighThroughput || 
                           applications.includes('Quality Control') || 
                           applications.includes('Failure Analysis') ||
                           applications.includes('Research & Development');
      
      if (needsImaging) {
        recommendations.push({
          type: 'Digital Imaging System',
          reasoning: `Essential for modern metallography documentation. Includes digital camera and imaging software for image capture, measurement, annotation, and report generation. Critical for ${applications.includes('Quality Control') ? 'quality control' : applications.includes('Failure Analysis') ? 'failure analysis' : 'research'} documentation.`,
          category: 'equipment',
          stage: 'microscopy'
        });
      }
    }

    // CLEANING RECOMMENDATIONS
    if (selectedStages.includes('cleaning')) {
      recommendations.push({
        type: 'Ultrasonic Cleaner',
        reasoning: 'Essential for removing polishing residues and contaminants. Ensures clean samples for accurate microstructural analysis.',
        category: 'equipment',
        stage: 'cleaning'
      });
      
      recommendations.push({
        type: 'Drying Oven',
        reasoning: 'Critical for drying samples after cleaning to prevent water spots and contamination. Essential for high-quality surface preparation, especially for microscopy and photography.',
        category: 'equipment',
        stage: 'cleaning'
      });
    }

    // HARDNESS TESTING RECOMMENDATIONS
    if (selectedStages.includes('hardness')) {
      recommendations.push({
        type: 'Hardness Tester (Vickers/Rockwell)',
        reasoning: `Appropriate hardness testing system for ${materialType || 'your materials'}. Vickers for precision, Rockwell for production testing.`,
        category: 'equipment',
        stage: 'hardness'
      });
    }

    return recommendations;
  }

  // Render results
  function renderResults() {
    const container = document.getElementById('recommendations-section');
    if (!container) return;

    if (recommendations.length === 0) {
      container.innerHTML = '<p>No recommendations available.</p>';
      return;
    }

    // Group by stage
    const stageOrder = ['sectioning', 'mounting', 'grinding', 'polishing', 'final-polishing', 'etching', 'microscopy', 'cleaning', 'hardness'];
    const stageLabels = {
      'sectioning': 'Sectioning',
      'mounting': 'Mounting',
      'grinding': 'Grinding',
      'polishing': 'Polishing',
      'final-polishing': 'Final Polishing',
      'etching': 'Etching',
      'microscopy': 'Microscopy',
      'cleaning': 'Cleaning',
      'hardness': 'Hardness Testing'
    };

    const recommendationsByStage = {};
    recommendations.forEach(rec => {
      if (!recommendationsByStage[rec.stage]) {
        recommendationsByStage[rec.stage] = { equipment: [], consumables: [] };
      }
      if (rec.category === 'equipment') {
        recommendationsByStage[rec.stage].equipment.push(rec);
      } else {
        recommendationsByStage[rec.stage].consumables.push(rec);
      }
    });

    const organizedByStage = stageOrder
      .filter(stage => recommendationsByStage[stage])
      .map(stage => ({
        stage,
        equipment: recommendationsByStage[stage].equipment,
        consumables: recommendationsByStage[stage].consumables
      }));

    let html = `
      <div class="builder-results-card">
        <div class="builder-results-header">
          <div>
            <h2 class="builder-results-title">Recommended Equipment & Consumables</h2>
            <p class="builder-results-description">
              Based on your specifications, here are general equipment types and consumables appropriate for your use case.
            </p>
          </div>
        </div>

        <div class="builder-results-list">
    `;

    organizedByStage.forEach(({ stage, equipment, consumables }) => {
      const stageLabel = stageLabels[stage] || stage;
      const isOpen = false; // Default closed

      html += `
        <div class="builder-results-stage">
          <button class="builder-results-stage-header" data-stage="${stage}">
            <div class="builder-results-stage-title-wrapper">
              <span class="builder-results-stage-icon">${getStageIcon(stage)}</span>
              <h3 class="builder-results-stage-title">${stageLabel}</h3>
            </div>
            <svg class="builder-results-stage-chevron ${isOpen ? 'open' : ''}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          <div class="builder-results-stage-content ${isOpen ? 'open' : ''}">
      `;

      if (equipment.length > 0) {
        html += `
          <div class="builder-results-category">
            <h4 class="builder-results-category-title">
              <span class="builder-results-category-icon">📦</span>
              Equipment
            </h4>
            <div class="builder-results-items">
        `;
        equipment.forEach(rec => {
          html += renderRecommendationItem(rec);
        });
        html += `</div></div>`;
      }

      if (consumables.length > 0) {
        html += `
          <div class="builder-results-category">
            <h4 class="builder-results-category-title">
              <span class="builder-results-category-icon">🧪</span>
              Consumables
            </h4>
            <div class="builder-results-items">
        `;
        consumables.forEach(rec => {
          html += renderRecommendationItem(rec);
        });
        html += `</div></div>`;
      }

      html += `</div></div>`;
    });

    html += `</div></div>`;

    container.innerHTML = html;

    // Add event listeners for expandable sections
    container.querySelectorAll('.builder-results-stage-header').forEach(header => {
      header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const chevron = this.querySelector('.builder-results-stage-chevron');
        const isOpen = content.classList.contains('open');
        
        if (isOpen) {
          content.classList.remove('open');
          if (chevron) chevron.classList.remove('open');
        } else {
          content.classList.add('open');
          if (chevron) chevron.classList.add('open');
        }
      });
    });
  }

  // Get stage icon
  function getStageIcon(stage) {
    const icons = {
      'sectioning': '🔧',
      'mounting': '📦',
      'grinding': '⚙️',
      'polishing': '✨',
      'final-polishing': '✨',
      'etching': '💧',
      'microscopy': '🔬',
      'cleaning': '🧪',
      'hardness': '📊'
    };
    return icons[stage] || '📋';
  }

  // Render recommendation item
  function renderRecommendationItem(rec) {
    const icon = rec.category === 'equipment' ? '📦' : '🧪';
    const reasoning = parseLinks(rec.reasoning);
    
    return `
      <div class="builder-recommendation-item">
        <div class="builder-recommendation-header">
          <span class="builder-recommendation-icon">${icon}</span>
          <h5 class="builder-recommendation-type">${rec.type}</h5>
        </div>
        <p class="builder-recommendation-reasoning">${reasoning}</p>
      </div>
    `;
  }

  // Parse markdown links
  function parseLinks(text) {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="builder-link" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  // Handle back
  function handleBack() {
    if (currentStep === 4 && recommendations.length > 0) {
      // Show confirmation modal
      const modal = document.getElementById('back-confirmation-modal');
      if (modal) modal.style.display = 'flex';
    } else {
      // Go to homepage
      window.location.href = '/';
    }
  }

  // Handle expert review submit
  function handleExpertReviewSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('review-name').value;
    const email = document.getElementById('review-email').value;
    const phone = document.getElementById('review-phone').value;
    const company = document.getElementById('review-company').value;
    const message = document.getElementById('review-message').value;

    if (!name || !email) {
      alert('Please fill in name and email.');
      return;
    }

    const mailtoLink = generateExpertReviewMailto({ name, email, phone, company, message });
    window.location.href = mailtoLink;
  }

  // Generate expert review mailto
  function generateExpertReviewMailto(reviewData) {
    let body = 'LAB BUILDER REVIEW REQUEST\n';
    body += '==========================\n\n';
    
    body += 'CONTACT INFORMATION\n';
    body += '-------------------\n';
    body += `Name: ${reviewData.name}\n`;
    body += `Email: ${reviewData.email}\n`;
    if (reviewData.phone) body += `Phone: ${reviewData.phone}\n`;
    if (reviewData.company) body += `Company: ${reviewData.company}\n`;
    body += '\n';
    
    body += 'LAB REQUIREMENTS\n';
    body += '----------------\n';
    body += `Material Type: ${formData.materialType || 'Not specified'}\n`;
    body += `Material Hardness: ${formData.materialHardness || 'Not specified'}\n`;
    body += `Sample Size: ${formData.sampleSize || 'Not specified'}\n`;
    body += `Sample Shape: ${formData.sampleShape || 'Not specified'}\n`;
    body += `Daily Throughput: ${formData.throughput || 'Not specified'}\n`;
    body += `Automation Level: ${formData.automation || 'Not specified'}\n`;
    body += `Equipment Tier: ${formData.budget || 'Not specified'}\n`;
    body += `Surface Finish: ${formData.surfaceFinish || 'Standard'}\n`;
    body += `Applications: ${formData.applications?.length > 0 ? formData.applications.join(', ') : 'Not specified'}\n`;
    body += `Process Stages: ${formData.processStages?.length > 0 ? formData.processStages.join(', ') : 'Not specified'}\n`;
    body += '\n';
    
    if (recommendations && recommendations.length > 0) {
      body += 'RECOMMENDED EQUIPMENT & CONSUMABLES\n';
      body += '===================================\n\n';
      
      // Group by stage
      const recommendationsByStage = {};
      recommendations.forEach(rec => {
        if (!recommendationsByStage[rec.stage]) {
          recommendationsByStage[rec.stage] = { equipment: [], consumables: [] };
        }
        if (rec.category === 'equipment') {
          recommendationsByStage[rec.stage].equipment.push(rec);
        } else {
          recommendationsByStage[rec.stage].consumables.push(rec);
        }
      });
      
      const stageOrder = ['sectioning', 'mounting', 'grinding', 'polishing', 'final-polishing', 'etching', 'microscopy', 'cleaning', 'hardness'];
      const stageLabels = {
        sectioning: 'SECTIONING',
        mounting: 'MOUNTING',
        grinding: 'GRINDING',
        polishing: 'POLISHING',
        'final-polishing': 'FINAL POLISHING',
        etching: 'ETCHING',
        microscopy: 'MICROSCOPY',
        cleaning: 'CLEANING',
        hardness: 'HARDNESS TESTING'
      };
      
      stageOrder.forEach(stage => {
        const stageRecs = recommendationsByStage[stage];
        if (stageRecs && (stageRecs.equipment.length > 0 || stageRecs.consumables.length > 0)) {
          const label = stageLabels[stage] || stage.toUpperCase();
          body += `${label}\n`;
          body += `${'-'.repeat(label.length)}\n`;
          
          if (stageRecs.equipment.length > 0) {
            body += 'Equipment:\n';
            stageRecs.equipment.forEach(rec => {
              const reasoning = rec.reasoning.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
              body += `  - ${rec.type}${reasoning ? ` (${reasoning})` : ''}\n`;
            });
          }
          
          if (stageRecs.consumables.length > 0) {
            body += 'Consumables:\n';
            stageRecs.consumables.forEach(rec => {
              const reasoning = rec.reasoning.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
              body += `  - ${rec.type}${reasoning ? ` (${reasoning})` : ''}\n`;
            });
          }
          body += '\n';
        }
      });
    }
    
    if (reviewData.message) {
      body += 'ADDITIONAL MESSAGE\n';
      body += '------------------\n';
      body += `${reviewData.message}\n`;
    }
    
    body += '\n---\n';
    body += 'This request was generated from the Lab Builder tool on metallography.org';
    
    const subject = `Lab Builder Review Request${reviewData.company ? ` - ${reviewData.company}` : ''}`;
    
    return `mailto:sales@metallographic.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Handle download PDF
  function handleDownloadPDF() {
    // For now, just show an alert. PDF generation can be added later with jsPDF library
    alert('PDF download functionality coming soon. For now, please use the "Get Expert Review" feature to email your results.');
  }

  // Handle start over
  function handleStartOver() {
    if (confirm('Are you sure you want to start over? All your current selections will be lost.')) {
      // Clear storage
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_STEP_KEY);
      sessionStorage.removeItem(STORAGE_RECOMMENDATIONS_KEY);
      
      // Reset form data
      formData = {
        processStages: ['sectioning', 'mounting', 'grinding', 'polishing'],
        materialType: '',
        materialHardness: '',
        sampleSize: '',
        sampleShape: '',
        applications: [],
        throughput: '',
        automation: '',
        budget: '',
        surfaceFinish: ''
      };
      
      recommendations = [];
      currentStep = 1;
      
      // Reset form
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
      document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
      
      // Re-render and go to step 1
      renderStages();
      goToStep(1);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

