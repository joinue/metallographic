// Lab Builder JavaScript
// Converted from React/Next.js components to vanilla JavaScript

(function() {
  'use strict';

  // Storage keys
  const STORAGE_KEY = 'builder-form-data';
  const STORAGE_STEP_KEY = 'builder-step';
  const STORAGE_RECOMMENDATIONS_KEY = 'builder-recommendations';

  // Helper function to create SVG icon (Lucide-style)
  function createIconSVG(iconName, size = 20) {
    const icons = {
      'wrench': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
      'package': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
      'circle': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
      'sparkles': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"></path></svg>',
      'droplet': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>',
      'flask-conical': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v6m4-6v6M4 10a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H4z"></path><path d="M6 10h12"></path></svg>',
      'gauge': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M20.2 20.2C22 18.3 23 15.7 23 13c0-5.5-4.5-10-10-10S3 7.5 3 13c0 2.7 1 5.3 2.8 7.2"></path><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M2 12h4"></path><path d="M18 12h4"></path></svg>',
      'eye': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
      'check': '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    };
    return icons[iconName] || '';
  }

  // Process stage options
  const processStageOptions = [
    { id: 'sectioning', label: 'Sectioning', description: 'Cutting and sample preparation equipment', icon: 'wrench' },
    { id: 'mounting', label: 'Mounting', description: 'Sample mounting equipment and materials', icon: 'package' },
    { id: 'grinding', label: 'Grinding', description: 'Grinding equipment and abrasives', icon: 'circle' },
    { id: 'polishing', label: 'Polishing', description: 'Polishing equipment and consumables', icon: 'sparkles' },
    { id: 'etching', label: 'Etching', description: 'Etchants and etching supplies', icon: 'droplet' },
    { id: 'microscopy', label: 'Microscopy', description: 'Microscopes and imaging equipment', icon: 'eye' },
    { id: 'cleaning', label: 'Cleaning', description: 'Sample cleaning equipment', icon: 'flask-conical' },
    { id: 'hardness', label: 'Hardness Testing', description: 'Hardness testing equipment', icon: 'gauge' }
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
    surfaceFinish: '',
    sectionType: 'Cross-section',
    damageCriticality: 'Standard'
  };

  let currentStep = 1;
  let recommendations = [];
  let isGenerating = false;
  let previousPath = null;

  // Initialize
  function init() {
    loadFromStorage();
    trackPreviousPage();
    renderStages();
    setupEventListeners();
    updateProgress();
    showStep(currentStep);
    updateStep1Button();
    updateStep2Button();
    updateStep3Button();
  }

  // Track previous page on mount
  function trackPreviousPage() {
    if (typeof window !== 'undefined') {
      const referrer = document.referrer;
      const currentOrigin = window.location.origin;
      
      if (referrer && referrer.startsWith(currentOrigin)) {
        const referrerPath = new URL(referrer).pathname;
        // Only store if it's not the builder page itself
        if (referrerPath !== '/build.html' && referrerPath !== '/build') {
          previousPath = referrerPath;
        } else {
          previousPath = '/index.html';
        }
      } else {
        previousPath = '/index.html';
      }
    }
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
              <span class="builder-stage-icon">${createIconSVG(option.icon, 24)}</span>
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

    // Back confirmation modal
    const backConfirmationModal = document.getElementById('back-confirmation-modal');
    const confirmBack = document.getElementById('confirm-back');
    const sendToExpertBeforeBack = document.getElementById('send-to-expert-before-back');
    
    if (confirmBack) {
      confirmBack.addEventListener('click', () => {
        if (backConfirmationModal) backConfirmationModal.style.display = 'none';
        navigateBack();
      });
    }
    
    if (sendToExpertBeforeBack) {
      sendToExpertBeforeBack.addEventListener('click', () => {
        if (backConfirmationModal) backConfirmationModal.style.display = 'none';
        if (expertReviewModal) expertReviewModal.style.display = 'flex';
      });
    }
    
    // Close back confirmation modal when clicking overlay
    if (backConfirmationModal) {
      const overlay = backConfirmationModal.querySelector('.builder-modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', () => {
          backConfirmationModal.style.display = 'none';
        });
      }
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

    // If step 3, render stage-specific questions
    if (step === 3) {
      renderStageSpecificQuestions();
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
          circle.innerHTML = createIconSVG('check', 16);
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

  // Render stage-specific questions for step 3
  function renderStageSpecificQuestions() {
    const container = document.getElementById('stage-specific-questions');
    if (!container) return;

    let html = '';

    if (formData.processStages.includes('sectioning')) {
      html += `
        <div class="builder-form-section-header">
          <h3>Sectioning Details</h3>
        </div>
        <div class="builder-form-grid">
          <div class="builder-form-field">
            <label class="builder-form-label" for="section-type">Section Type</label>
            <select id="section-type" class="builder-select">
              <option value="Cross-section"${formData.sectionType === 'Cross-section' ? ' selected' : ''}>Cross-section</option>
              <option value="Longitudinal"${formData.sectionType === 'Longitudinal' ? ' selected' : ''}>Longitudinal</option>
              <option value="Surface"${formData.sectionType === 'Surface' ? ' selected' : ''}>Surface</option>
              <option value="Specific feature"${formData.sectionType === 'Specific feature' ? ' selected' : ''}>Specific Feature</option>
            </select>
            <p class="builder-form-help">The orientation of the cut relative to the sample.</p>
          </div>
          <div class="builder-form-field">
            <label class="builder-form-label" for="damage-criticality">Cut Damage Sensitivity</label>
            <select id="damage-criticality" class="builder-select">
              <option value="Standard"${formData.damageCriticality === 'Standard' ? ' selected' : ''}>Standard</option>
              <option value="High"${formData.damageCriticality === 'High' ? ' selected' : ''}>High - Minimize heat-affected zone</option>
              <option value="Very High"${formData.damageCriticality === 'Very High' ? ' selected' : ''}>Very High - Critical microstructure preservation</option>
            </select>
            <p class="builder-form-help">How sensitive your sample is to heat and mechanical damage from cutting.</p>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;

    // Attach event listeners to dynamically created fields
    var sectionTypeEl = document.getElementById('section-type');
    var damageCriticalityEl = document.getElementById('damage-criticality');

    if (sectionTypeEl) {
      sectionTypeEl.addEventListener('change', function(e) {
        formData.sectionType = e.target.value;
        saveToStorage();
      });
    }
    if (damageCriticalityEl) {
      damageCriticalityEl.addEventListener('change', function(e) {
        formData.damageCriticality = e.target.value;
        saveToStorage();
      });
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
    const isAutomated = automation === 'Fully Automated';
    const isSemiAutomated = automation.includes('Semi-Automated');
    const needsEBSD = applications.includes('EBSD') || surfaceFinish.includes('EBSD') || surfaceFinish.includes('Extremely Flat');
    const isHardMaterial = materialType.includes('Hard Metals') || materialType.includes('Ceramics');
    // Equipment tier
    const isEssentialTier = budget === 'Essential';
    const isComprehensiveTier = budget === 'Comprehensive';
    const isPremiumTier = budget === 'Advanced' || budget === 'Comprehensive';

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
      const needsColdMounting = isSoft || isDelicate || materialType.includes('Titanium');

      if (needsColdMounting) {
        if (isHighThroughput && isPremiumTier) {
          recommendations.push({
            type: 'UV Curing Mounting System',
            reasoning: 'Fastest cold mounting method with cure times under 10 minutes. Ideal for high-volume labs working with temperature-sensitive materials. No heat application preserves true microstructure in soft metals and titanium.',
            category: 'equipment',
            stage: 'mounting'
          });
        }
        recommendations.push({
          type: 'Vacuum Impregnation System',
          reasoning: `Removes air bubbles for clear, void-free mounts without heat application. Essential for ${isSoft ? 'soft metals' : isDelicate ? 'delicate/thin samples' : materialType || 'heat-sensitive materials'} where compression mounting temperatures (150-180°C) would alter microstructure or cause sample damage.`,
          category: 'equipment',
          stage: 'mounting'
        });
        if (isDelicate || sampleShape === 'Irregular') {
          recommendations.push({
            type: 'Low-Viscosity Epoxy Mounting Resins',
            reasoning: 'Low-viscosity epoxy penetrates fine cracks, pores, and irregular surfaces. Combined with vacuum impregnation, ensures complete encapsulation of delicate and complex-shaped samples.',
            category: 'consumable',
            stage: 'mounting'
          });
        } else {
          recommendations.push({
            type: 'Epoxy Mounting Resins',
            reasoning: 'Room-temperature curing epoxy with excellent edge retention and chemical resistance. Clear formulations allow sample visibility during grinding. Typical cure time: 6-8 hours (or 1-2 hours with fast-cure formulas).',
            category: 'consumable',
            stage: 'mounting'
          });
        }
      } else {
        recommendations.push({
          type: isAutomated ? 'Programmable Hydraulic Mounting Press' : 'Hydraulic Compression Mounting Press',
          reasoning: `${isAutomated ? 'Programmable press with automated temperature, pressure, and time control ensures repeatable mounts with minimal operator input.' : 'Hydraulic mounting press provides reliable, high-force compression mounting.'} Fast 8-15 minute cycles with good edge retention. Suitable for materials that can tolerate 150-180°C temperatures.`,
          category: 'equipment',
          stage: 'mounting'
        });
        // Recommend cooling tank for comprehensive setups
        if (isComprehensiveTier) {
          recommendations.push({
            type: 'Recirculating Cooling Tank',
            reasoning: 'Accelerates cooling cycle and provides controlled, consistent cooldown. Reduces total mount cycle time and prevents thermal shock in sensitive samples.',
            category: 'equipment',
            stage: 'mounting'
          });
        }
        // Resin recommendation based on application
        if (needsEBSD || applications.includes('Research & Development')) {
          recommendations.push({
            type: 'Diallyl Phthalate (DAP) Mounting Resins',
            reasoning: 'DAP provides superior edge retention and hardness compared to phenolic. Recommended for research and advanced characterization where edge quality is critical for accurate measurements.',
            category: 'consumable',
            stage: 'mounting'
          });
        } else {
          recommendations.push({
            type: 'Phenolic Mounting Resins',
            reasoning: 'Cost-effective phenolic resins for routine compression mounting. Available in multiple colors for sample identification. Good general-purpose edge retention for standard metallography.',
            category: 'consumable',
            stage: 'mounting'
          });
        }
        // Comprehensive tier: also recommend cold mounting option
        if (isComprehensiveTier) {
          recommendations.push({
            type: 'Epoxy Mounting Resins (supplemental)',
            reasoning: 'Having castable epoxy available alongside compression mounting gives flexibility for samples that cannot tolerate heat, irregular shapes, or when clear mounts are needed for cross-reference.',
            category: 'consumable',
            stage: 'mounting'
          });
        }
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

      // Platen size influenced by sample size and tier
      let platenSize;
      if (isEssentialTier) {
        platenSize = isLarge || isVeryLarge ? '10 inch' : '8 inch';
      } else if (isPremiumTier) {
        platenSize = isLarge || isVeryLarge ? '12 inch' : '10 inch';
      } else {
        platenSize = isLarge || isVeryLarge ? '12 inch' : '8-10 inch';
      }
      const automationType = isAutomated ? 'Programmable' : isSemiAutomated ? 'Semi-automated' : 'Manual';

      recommendations.push({
        type: `${platenSize} ${automationType} Grinder/Polisher`,
        reasoning: `Appropriate platen size for ${sampleSize.toLowerCase()} samples. ${isAutomated ? 'Programmable operation ensures consistent grinding parameters and repeatability.' : isSemiAutomated ? 'Semi-automated head provides consistent force application while allowing operator control.' : 'Manual control provides flexibility for varied materials and sample shapes.'}`,
        category: 'equipment',
        stage: 'grinding'
      });

      // Automated dispenser for premium tiers
      if (isPremiumTier && (isAutomated || isSemiAutomated)) {
        recommendations.push({
          type: 'Automated Abrasive Dispenser',
          reasoning: 'Automated dispensing ensures consistent abrasive application, reduces waste, and improves repeatability across operators. Recommended for advanced and comprehensive lab setups.',
          category: 'equipment',
          stage: 'grinding'
        });
      }

      // Grinding sequences differentiated by hardness
      let grindingSequence = [];
      if (isSoft) {
        grindingSequence = ['240', '320', '400', '600'];
      } else if (isVeryHard || isHardMaterial) {
        grindingSequence = ['60', '120', '240', '320', '400', '600', '800', '1200'];
      } else if (isHard) {
        grindingSequence = ['120', '240', '320', '400', '600', '800'];
      } else {
        // Medium hardness
        grindingSequence = ['120', '240', '320', '400', '600'];
      }

      const gritList = grindingSequence.join(', ');

      if (isHardMaterial || isVeryHard) {
        recommendations.push({
          type: `Silicon Carbide Grinding Papers (${gritList} grit)`,
          reasoning: `SiC provides aggressive cutting action essential for hard materials and ceramics. Start coarse (${grindingSequence[0]} grit) due to slow material removal, then follow the full progressive sequence through ${grindingSequence[grindingSequence.length - 1]} grit. Fine grits (800, 1200) are critical for minimizing subsurface damage before polishing.`,
          category: 'consumable',
          stage: 'grinding'
        });
      } else if (isSoft) {
        recommendations.push({
          type: `Aluminum Oxide or Fine SiC Grinding Papers (${gritList} grit)`,
          reasoning: `Finer abrasives (starting at 240 grit) with light pressure minimize embedding and surface relief in soft materials like ${materialType || 'aluminum and copper alloys'}. Shorter sequence avoids overworking the surface. Essential for preserving true microstructure.`,
          category: 'consumable',
          stage: 'grinding'
        });
      } else if (isHard) {
        recommendations.push({
          type: `Silicon Carbide Grinding Papers (${gritList} grit)`,
          reasoning: `SiC papers in progressive grit sizes: ${gritList}. Extended sequence through 800 grit ensures adequate surface quality for hard materials before transitioning to polishing. Finer final grit reduces polishing time.`,
          category: 'consumable',
          stage: 'grinding'
        });
      } else {
        recommendations.push({
          type: `Silicon Carbide Grinding Papers (${gritList} grit)`,
          reasoning: `Standard progressive grinding sequence: ${gritList} grit. Appropriate for medium-hardness materials. Each step removes damage from the previous grit before transitioning to polishing.`,
          category: 'consumable',
          stage: 'grinding'
        });
      }

      // Diamond grinding discs for premium tiers with hard materials
      if (isPremiumTier && (isHard || isVeryHard || isHardMaterial)) {
        recommendations.push({
          type: 'Diamond Grinding Discs (75 µm, 45 µm)',
          reasoning: 'Reusable diamond grinding discs offer faster, more consistent grinding for hard materials compared to SiC papers. Longer lifespan reduces per-sample cost in high-volume labs. Can replace several SiC paper steps.',
          category: 'consumable',
          stage: 'grinding'
        });
      }
    }

    // POLISHING RECOMMENDATIONS
    if (selectedStages.includes('polishing')) {
      let polishPlatenSize;
      if (isEssentialTier) {
        polishPlatenSize = isLarge || isVeryLarge ? '10 inch' : '8 inch';
      } else if (isPremiumTier) {
        polishPlatenSize = isLarge || isVeryLarge ? '12 inch' : '10 inch';
      } else {
        polishPlatenSize = isLarge || isVeryLarge ? '12 inch' : '8-10 inch';
      }
      const polishAutomationType = isAutomated ? 'Programmable' : isSemiAutomated ? 'Semi-automated' : 'Manual';

      const needsDualWheel = isHighThroughput || isVeryHighThroughput ||
                             (applications.includes('Quality Control') && isHighThroughput) ||
                             (applications.includes('Production Testing')) ||
                             isComprehensiveTier;

      if (needsDualWheel) {
        recommendations.push({
          type: `Dual Wheel ${polishPlatenSize} ${polishAutomationType} Grinder/Polisher`,
          reasoning: `Dual wheel configuration allows dedicated wheels for grinding and polishing, preventing cross-contamination and improving throughput. ${isAutomated ? 'Programmable operation ensures consistent polishing parameters.' : 'Semi-automated or manual control provides flexibility.'} Essential for high-volume production and quality control.`,
          category: 'equipment',
          stage: 'polishing'
        });
      } else {
        recommendations.push({
          type: `${polishPlatenSize} ${polishAutomationType} Grinder/Polisher`,
          reasoning: `Can handle both grinding and polishing operations. ${isAutomated ? 'Programmable operation ensures consistent polishing parameters.' : isSemiAutomated ? 'Semi-automated head provides consistent force application.' : 'Manual control provides flexibility for varied materials.'}`,
          category: 'equipment',
          stage: 'polishing'
        });
      }

      // Automated dispenser for premium polishing
      if (isPremiumTier && (isAutomated || isSemiAutomated)) {
        recommendations.push({
          type: 'Automated Abrasive Dispenser',
          reasoning: 'Precisely meters diamond suspension onto the polishing cloth at timed intervals. Eliminates operator variability, reduces abrasive waste, and ensures consistent polishing results.',
          category: 'equipment',
          stage: 'polishing'
        });
      }

      // Polishing sequences differentiated by hardness
      let polishingSequence = [];
      if (isSoft) {
        polishingSequence = ['6', '3', '1', '0.25'];
      } else if (isVeryHard || isHardMaterial) {
        polishingSequence = ['9', '6', '3', '1', '0.5', '0.25'];
      } else if (isHard) {
        polishingSequence = ['9', '6', '3', '1', '0.25'];
      } else {
        // Medium hardness
        polishingSequence = ['6', '3', '1', '0.25'];
      }

      const coarseDiamond = polishingSequence[0];
      const fineDiamond = polishingSequence[polishingSequence.length - 1];

      // Diamond type recommendation based on tier
      const diamondType = isPremiumTier ? 'Polycrystalline Diamond' : 'Diamond';

      recommendations.push({
        type: `${diamondType} Polishing Suspensions (${coarseDiamond} µm to ${fineDiamond} µm)`,
        reasoning: `Progressive polishing steps: ${polishingSequence.join(', ')} µm. ${isSoft ? 'Shorter sequence with lighter starting grit avoids embedding in soft materials.' : isVeryHard || isHardMaterial ? 'Full sequence starting at 9 µm with additional 0.5 µm step ensures complete scratch removal on hard materials.' : isHard ? 'Extended sequence starting at 9 µm needed for scratch removal on hard materials.' : 'Standard sequence for medium-hardness materials.'} ${isPremiumTier ? 'Polycrystalline diamond provides more consistent scratch patterns and faster cutting than monocrystalline.' : ''}`,
        category: 'consumable',
        stage: 'polishing'
      });

      // Cloth recommendations based on material
      if (isSoft) {
        recommendations.push({
          type: 'Low-Nap Polishing Cloths',
          reasoning: 'Low-nap (hard) cloths minimize surface relief and edge rounding in soft materials. Essential for maintaining flat surfaces on aluminum, copper, and other soft metals.',
          category: 'consumable',
          stage: 'polishing'
        });
      } else {
        recommendations.push({
          type: 'Synthetic Polishing Cloths',
          reasoning: 'Woven synthetic cloths for diamond polishing stages. Provides consistent, resilient surface for diamond suspension application. Use progressively softer cloths for finer polishing steps.',
          category: 'consumable',
          stage: 'polishing'
        });
      }
    }

    // FINAL POLISHING RECOMMENDATIONS
    if (selectedStages.includes('polishing')) {
      if (needsEBSD || surfaceFinish.includes('Extremely Flat') || surfaceFinish.includes('High Quality')) {
        recommendations.push({
          type: 'Vibratory Polisher',
          reasoning: 'Produces deformation-free surfaces with minimal relief using gentle vibratory action rather than mechanical force. Essential for EBSD preparation, advanced characterization, and research-grade surface finish. Hands-free operation allows overnight polishing cycles.',
          category: 'equipment',
          stage: 'final-polishing'
        });
        recommendations.push({
          type: 'Colloidal Silica Polishing Suspension (0.05 µm)',
          reasoning: 'Chemo-mechanical polishing action removes the last traces of surface deformation while maintaining flatness. Industry standard final step for EBSD, nanoindentation, and advanced characterization. Typical cycle: 30-60 minutes on vibratory polisher.',
          category: 'consumable',
          stage: 'final-polishing'
        });
        recommendations.push({
          type: 'Napped Polishing Cloth',
          reasoning: 'Napped (soft) cloth essential for colloidal silica final polishing. Fiber structure holds suspension while providing gentle, uniform polishing action.',
          category: 'consumable',
          stage: 'final-polishing'
        });
      } else {
        // Standard final polishing
        if (isPremiumTier) {
          recommendations.push({
            type: 'Colloidal Silica Polishing Suspension (0.05 µm)',
            reasoning: 'Chemo-mechanical final polishing produces superior surface quality compared to fine diamond alone. Recommended for quality-critical work even when EBSD is not required.',
            category: 'consumable',
            stage: 'final-polishing'
          });
        } else {
          recommendations.push({
            type: 'Fine Diamond Suspension (0.25 µm) or Colloidal Silica (0.05 µm)',
            reasoning: 'Final polishing step for standard metallographic analysis. Fine diamond provides adequate surface finish for most optical microscopy work. Colloidal silica gives better results for etching response.',
            category: 'consumable',
            stage: 'final-polishing'
          });
        }
        recommendations.push({
          type: 'Napped Polishing Cloth',
          reasoning: 'Napped cloth for final polishing. Softer fiber structure provides gentle action appropriate for fine suspensions.',
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
      // Scope type based on application and tier
      let scopeType, scopeReasoning;
      if (needsEBSD || (applications.includes('Research & Development') && isPremiumTier)) {
        scopeType = 'Research-Grade';
        scopeReasoning = 'Research-grade inverted metallurgical microscope with advanced optics, DIC/Nomarski capability, polarized light, and high-magnification objectives. Essential for advanced characterization, publication-quality imaging, and EBSD sample verification.';
      } else if (isHighThroughput || applications.includes('Production Testing')) {
        scopeType = 'Production';
        scopeReasoning = 'Production-grade metallurgical microscope optimized for fast, repeatable inspections. Brightfield and darkfield illumination for routine quality control. Ergonomic design for extended use.';
      } else if (isPremiumTier) {
        scopeType = 'Advanced';
        scopeReasoning = 'Advanced metallurgical microscope with brightfield, darkfield, and polarized light capabilities. Suitable for a wide range of metallographic analysis including grain structure, phase identification, and inclusion analysis.';
      } else {
        scopeType = 'Standard';
        scopeReasoning = 'Standard metallurgical microscope with brightfield illumination and 50x-1000x magnification range. Adequate for routine microstructural examination, grain size measurement, and basic quality control.';
      }

      recommendations.push({
        type: `${scopeType} Metallurgical Microscope`,
        reasoning: scopeReasoning,
        category: 'equipment',
        stage: 'microscopy'
      });

      // Digital imaging based on application and tier
      const needsImaging = isHighThroughput ||
                           applications.includes('Quality Control') ||
                           applications.includes('Failure Analysis') ||
                           applications.includes('Research & Development') ||
                           !isEssentialTier;

      if (needsImaging) {
        if (isPremiumTier) {
          recommendations.push({
            type: 'Image Analysis Software with Digital Camera',
            reasoning: 'Professional image analysis system for quantitative metallography: grain size (ASTM E112), phase fraction, inclusion rating (ASTM E45), porosity, and coating thickness measurement. Includes calibrated digital camera, automated measurement, and report generation.',
            category: 'equipment',
            stage: 'microscopy'
          });
        } else {
          recommendations.push({
            type: 'Digital Camera with Capture Software',
            reasoning: `Digital camera system for microscope documentation. Includes capture software for image acquisition, basic measurement, annotation, and report generation. ${applications.includes('Quality Control') ? 'Essential for quality control record-keeping and traceability.' : 'Critical for documenting microstructures and sharing results.'}`,
            category: 'equipment',
            stage: 'microscopy'
          });
        }
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
      // Primary tester based on material and application
      if (isSoft || materialType.includes('Aluminum') || materialType.includes('Copper')) {
        if (isHighThroughput || applications.includes('Production Testing')) {
          recommendations.push({
            type: 'Rockwell Hardness Tester',
            reasoning: `Fast, direct-reading Rockwell testing is ideal for production QC of ${materialType || 'soft metals'}. Use B scale (HRB) for softer materials. Minimal sample preparation required. Results in seconds.`,
            category: 'equipment',
            stage: 'hardness'
          });
        } else {
          recommendations.push({
            type: 'Brinell / MacroVickers Hardness Tester',
            reasoning: `Brinell testing with larger indentations provides reliable hardness readings on ${materialType || 'soft metals'} where small indentations may not be representative. Low-force Vickers (HV 1-10) is an alternative for mounted samples.`,
            category: 'equipment',
            stage: 'hardness'
          });
        }
      } else if (isVeryHard || isHardMaterial) {
        recommendations.push({
          type: 'Vickers Microhardness Tester',
          reasoning: `Vickers microhardness testing (HV 0.01-2) is essential for hard materials like ${materialType || 'carbides and ceramics'}. Small indentations work on thin coatings, individual phases, and small samples. Measures hardness precisely even on very hard materials where Rockwell indenters may be damaged.`,
          category: 'equipment',
          stage: 'hardness'
        });
      } else if (isHighThroughput || applications.includes('Production Testing')) {
        recommendations.push({
          type: 'Rockwell Hardness Tester',
          reasoning: `Rockwell testing provides the fastest hardness measurements for production environments. Direct-reading display with no optical measurement needed. Use C scale (HRC) for ${materialType || 'steels'} in the ${hardness || 'typical'} range.`,
          category: 'equipment',
          stage: 'hardness'
        });
      } else {
        recommendations.push({
          type: 'Vickers Hardness Tester',
          reasoning: `Vickers testing provides a single continuous scale suitable for all metals from soft to hard. Ideal for ${materialType || 'general metallography'}. Load selection (HV 0.1-50) allows testing mounted samples, individual phases, and bulk materials.`,
          category: 'equipment',
          stage: 'hardness'
        });
      }

      // Additional microhardness for R&D and failure analysis
      if (applications.includes('Failure Analysis') || applications.includes('Research & Development') || applications.includes('Material Characterization')) {
        recommendations.push({
          type: 'Microhardness Tester (Vickers/Knoop)',
          reasoning: 'Microhardness testing (HV/HK 0.01-1) is essential for failure analysis and research. Measures hardness of individual phases, thin coatings, case-hardened layers, heat-affected zones, and weld cross-sections. Knoop indenter preferred for thin layers and brittle materials.',
          category: 'equipment',
          stage: 'hardness'
        });
      }

      // Automated traverse for comprehensive tier
      if (isComprehensiveTier && (applications.includes('Quality Control') || applications.includes('Research & Development'))) {
        recommendations.push({
          type: 'Automated Hardness Traverse Capability',
          reasoning: 'Programmable automatic traverse measures hardness profiles across welds, case-hardened layers, and coating cross-sections. Generates hardness maps and meets ASTM/ISO standards for case depth measurement. Eliminates operator variability in production testing.',
          category: 'equipment',
          stage: 'hardness'
        });
      }
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
              <span class="builder-results-category-icon">${createIconSVG('package', 20)}</span>
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
              <span class="builder-results-category-icon">${createIconSVG('flask-conical', 20)}</span>
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
      'sectioning': 'wrench',
      'mounting': 'package',
      'grinding': 'circle',
      'polishing': 'sparkles',
      'final-polishing': 'sparkles',
      'etching': 'droplet',
      'microscopy': 'eye',
      'cleaning': 'flask-conical',
      'hardness': 'gauge'
    };
    const iconName = icons[stage] || 'package';
    return createIconSVG(iconName, 20);
  }

  // Render recommendation item
  function renderRecommendationItem(rec) {
    const icon = rec.category === 'equipment' ? createIconSVG('package', 20) : createIconSVG('flask-conical', 20);
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
      // Navigate to previous page or index.html
      navigateBack();
    }
  }

  // Navigate back to previous page or index.html
  function navigateBack() {
    if (previousPath && previousPath !== '/build.html' && previousPath !== '/build') {
      window.location.href = previousPath;
    } else {
      window.location.href = '/index.html';
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
    body += 'This request was generated from the Lab Builder tool on metallographic.com';
    
    const subject = `Lab Builder Review Request${reviewData.company ? ` - ${reviewData.company}` : ''}`;
    
    return `mailto:sales@metallographic.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Handle print results
  function handleDownloadPDF() {
    window.print();
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
        surfaceFinish: '',
        sectionType: 'Cross-section',
        damageCriticality: 'Standard'
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

