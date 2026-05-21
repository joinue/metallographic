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
    mountDiameter: '',
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
    const mountDiameter = document.getElementById('mount-diameter');
    if (mountDiameter) {
      mountDiameter.addEventListener('change', (e) => {
        formData.mountDiameter = e.target.value;
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
        openExpertReviewModal();
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
    const expertReviewModal = document.getElementById('expert-review-modal');

    if (getExpertReview) {
      getExpertReview.addEventListener('click', openExpertReviewModal);
    }
    if (closeExpertReview) {
      closeExpertReview.addEventListener('click', () => {
        if (expertReviewModal) expertReviewModal.style.display = 'none';
      });
    }

    // Close expert review modal when clicking overlay
    if (expertReviewModal) {
      const overlay = expertReviewModal.querySelector('.builder-modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', () => {
          expertReviewModal.style.display = 'none';
        });
      }
    }

    // Toggle Lab Builder summary preview inside the modal
    const toggleSummary = document.getElementById('toggle-summary-preview');
    if (toggleSummary) {
      toggleSummary.addEventListener('click', () => {
        const preview = document.getElementById('summary-preview');
        if (!preview) return;
        const isOpen = preview.style.display !== 'none';
        preview.style.display = isOpen ? 'none' : 'block';
        toggleSummary.setAttribute('aria-expanded', String(!isOpen));
        toggleSummary.textContent = isOpen ? 'View' : 'Hide';
      });
    }

    // Copy Lab Builder summary to clipboard so the user can paste it into the HubSpot form
    const copySummaryBtn = document.getElementById('copy-summary-btn');
    if (copySummaryBtn) {
      // The button has an icon + label span; cache the label element so we only swap text, not the icon
      const labelSpan = copySummaryBtn.querySelector('span') || copySummaryBtn;
      const originalLabel = labelSpan.textContent;
      copySummaryBtn.addEventListener('click', async () => {
        const summary = buildLabBuilderSummary();
        const success = await copyTextToClipboard(summary);
        labelSpan.textContent = success ? 'Copied ✓' : 'Copy failed';
        copySummaryBtn.classList.toggle('is-copied', success);
        setTimeout(() => {
          labelSpan.textContent = originalLabel;
          copySummaryBtn.classList.remove('is-copied');
        }, 2500);
        if (!success) {
          // Show the preview block so user can copy manually as a fallback
          const preview = document.getElementById('summary-preview');
          if (preview) preview.style.display = 'block';
        }
      });
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

    // Help-text tooltip toggles (delegated, covers dynamically-rendered fields too)
    document.addEventListener('click', function(e) {
      const toggle = e.target.closest('.builder-help-toggle');
      if (!toggle) return;
      e.preventDefault();
      const targetId = toggle.getAttribute('data-help-target');
      if (!targetId) return;
      const helpEl = document.getElementById(targetId);
      if (!helpEl) return;
      const isHidden = helpEl.hasAttribute('hidden');
      if (isHidden) {
        helpEl.removeAttribute('hidden');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        helpEl.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

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
    if (formData.mountDiameter) {
      const mountDiameter = document.getElementById('mount-diameter');
      if (mountDiameter) mountDiameter.value = formData.mountDiameter;
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
            <label class="builder-form-label" for="section-type">
              Section Type
              <button type="button" class="builder-help-toggle" data-help-target="help-section-type" aria-label="More info on section type" aria-expanded="false">i</button>
            </label>
            <select id="section-type" class="builder-select">
              <option value="Cross-section"${formData.sectionType === 'Cross-section' ? ' selected' : ''}>Cross-section</option>
              <option value="Longitudinal"${formData.sectionType === 'Longitudinal' ? ' selected' : ''}>Longitudinal</option>
              <option value="Surface"${formData.sectionType === 'Surface' ? ' selected' : ''}>Surface</option>
              <option value="Specific feature"${formData.sectionType === 'Specific feature' ? ' selected' : ''}>Specific Feature</option>
            </select>
            <p class="builder-form-help" id="help-section-type" hidden>The orientation of the cut relative to the sample.</p>
          </div>
          <div class="builder-form-field">
            <label class="builder-form-label" for="damage-criticality">
              Cut Damage Sensitivity
              <button type="button" class="builder-help-toggle" data-help-target="help-damage-criticality" aria-label="More info on cut damage sensitivity" aria-expanded="false">i</button>
            </label>
            <select id="damage-criticality" class="builder-select">
              <option value="Standard"${formData.damageCriticality === 'Standard' ? ' selected' : ''}>Standard</option>
              <option value="High"${formData.damageCriticality === 'High' ? ' selected' : ''}>High &mdash; minimize HAZ</option>
              <option value="Very High"${formData.damageCriticality === 'Very High' ? ' selected' : ''}>Very High &mdash; critical microstructure</option>
            </select>
            <p class="builder-form-help" id="help-damage-criticality" hidden>How sensitive your sample is to heat and mechanical damage from cutting.</p>
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
    // Treat 'Unknown' hardness as medium for recommendation purposes (and flag it)
    const isUnknownHardness = hardness === 'Unknown' || hardness === '';
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
    // EBSD intent is driven by surface-finish dropdown only (no EBSD checkbox in applications)
    const needsEBSD = surfaceFinish.includes('EBSD') || surfaceFinish.includes('Extremely Flat');
    const isHardMaterial = materialType.includes('Hard Metals') || materialType.includes('Ceramics');
    const isCarbide = materialType.includes('Hard Metals');
    const isCeramic = materialType.includes('Ceramics');
    const isTitanium = materialType.includes('Titanium');
    const isAluminum = materialType.includes('Aluminum');
    const isCopper = materialType.includes('Copper');
    const isStainless = materialType.includes('Stainless');
    const isNonFerrous = isAluminum || isCopper || isTitanium || materialType.includes('Nickel');
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

      // Carbides and most technical ceramics are sectioned with diamond — NOT abrasive wheels.
      // Route to precision wafering with diamond blades regardless of sample size.
      if (isCarbide || isCeramic) {
        recommendations.push({
          type: 'Precision Wafering Saw with Diamond Blades',
          reasoning: `Cemented carbides and technical ceramics are sectioned with diamond blades — abrasive (SiC/Al₂O₃) wheels are not appropriate for these materials and will glaze or shatter. A precision wafering saw with controlled feed and a recirculating coolant bath minimizes chipping and microstructural damage in ${materialType.toLowerCase()}.`,
          category: 'equipment',
          stage: 'sectioning'
        });
        recommendations.push({
          type: 'Diamond Wafering Blades (resin-bond or metal-bond)',
          reasoning: `Resin-bonded diamond blades are preferred for ${isCarbide ? 'cemented carbides (WC/Co)' : 'most technical ceramics'} because they self-dress and produce a cleaner cut than metal-bond. Use higher diamond concentration for high-volume cutting; lower concentration for delicate, chip-sensitive parts.`,
          category: 'consumable',
          stage: 'sectioning'
        });
        recommendations.push({
          type: 'Recirculating Coolant with Rust Inhibitor',
          reasoning: 'Continuous flood coolant is essential when diamond-cutting hard materials to flush swarf, prevent blade loading, and minimize heat-induced microcracking.',
          category: 'consumable',
          stage: 'sectioning'
        });
      } else if (isSmall && (isDelicate || needsEBSD || surfaceFinish.includes('Extremely Flat') || needsHighPrecision || needsSpecificFeature)) {
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
          reasoning: `Primary sectioning method for ${materialType || 'most materials'}. Versatile and cost-effective for metals from soft non-ferrous to hardened steels. Standard abrasive saws start at 10-inch (250mm) blade size. ${needsAutomatedTableFeed ? 'Automated table feed ensures consistent cutting parameters for high throughput.' : needsTableFeed ? 'Table feed provides better control and consistency for medium to high throughput.' : 'Wheel feed only provides cost-effective sectioning for low-volume work.'} Appropriate blade size for ${sampleSize.toLowerCase() || 'typical'} samples.`,
          category: 'equipment',
          stage: 'sectioning'
        });

        // Correct abrasive selection: Al₂O₃ for ferrous/hard steels & superalloys; SiC for non-ferrous & softer materials.
        if (isVeryHard || (isHard && !isNonFerrous) || isStainless) {
          recommendations.push({
            type: 'Aluminum Oxide (Al₂O₃) Abrasive Cut-off Wheels',
            reasoning: 'Alumina abrasive wheels are the standard for hardened steels, tool steels, stainless steels, and superalloys. The friable nature of Al₂O₃ keeps the wheel sharp during cutting of ferrous and hard materials. Adequate coolant flow is critical to prevent burning the cut face.',
            category: 'consumable',
            stage: 'sectioning'
          });
        } else if (isSoft || isNonFerrous) {
          recommendations.push({
            type: 'Silicon Carbide (SiC) Abrasive Cut-off Wheels',
            reasoning: `SiC is the correct abrasive for non-ferrous and softer materials such as ${materialType || 'aluminum, copper, brass, and softer alloys'}. SiC's harder, sharper grains cut cleanly through soft metals without glazing or causing the smearing that Al₂O₃ can produce on these alloys.`,
            category: 'consumable',
            stage: 'sectioning'
          });
        } else {
          recommendations.push({
            type: 'Abrasive Cut-off Wheels (Al₂O₃ for ferrous, SiC for non-ferrous)',
            reasoning: `Choose blade chemistry by workpiece: Al₂O₃ for steels and superalloys; SiC for aluminum, copper, and softer non-ferrous alloys. Wrong abrasive choice causes burning, smearing, or excessive blade wear.`,
            category: 'consumable',
            stage: 'sectioning'
          });
        }

        recommendations.push({
          type: 'Cutting Fluid / Coolant with Rust Inhibitor',
          reasoning: 'Essential for cooling and lubrication during cutting. Prevents the heat-affected zone (HAZ) from causing phase transformations, tempering, or microstructural changes — especially critical when "Cut Damage Sensitivity" is High or Very High.',
          category: 'consumable',
          stage: 'sectioning'
        });
      }
    }

    // MOUNTING RECOMMENDATIONS
    if (selectedStages.includes('mounting')) {
      // Cold mounting is driven by: soft metals (smearing risk under compression), delicate/thin/irregular samples,
      // and porous materials. Note: Titanium is NOT particularly heat-sensitive at 150-180°C — Ti is hot-mountable.
      const needsColdMounting = isSoft || isDelicate || sampleShape === 'Irregular';

      if (needsColdMounting) {
        if (isHighThroughput && isPremiumTier) {
          recommendations.push({
            type: 'UV Curing Mounting System',
            reasoning: 'Fastest cold mounting method with cure times under 10 minutes. Ideal for high-volume labs preparing soft, porous, or fragile samples that cannot tolerate the pressures and temperatures of hot compression mounting.',
            category: 'equipment',
            stage: 'mounting'
          });
        }
        recommendations.push({
          type: 'Vacuum Impregnation System',
          reasoning: `Removes air bubbles for clear, void-free mounts without heat application. Essential for ${isSoft ? 'soft metals (which smear under compression)' : isDelicate ? 'delicate/thin samples' : 'porous or irregular samples'} where compression mounting pressure (~4000 psi) or temperatures (150-180°C) would damage the sample or fail to encapsulate features properly.`,
          category: 'equipment',
          stage: 'mounting'
        });
        // Acrylic vs epoxy choice
        recommendations.push({
          type: 'Acrylic (Methyl Methacrylate) Cold-Mount Resins',
          reasoning: 'Fast cure (8-15 minutes) and inexpensive — the workhorse cold mount for routine cold-mounting. Exothermic during cure (avoid for very heat-sensitive samples). Lower edge retention than epoxy, so prefer epoxy when edge quality matters.',
          category: 'consumable',
          stage: 'mounting'
        });
        if (isDelicate || sampleShape === 'Irregular') {
          recommendations.push({
            type: 'Low-Viscosity Epoxy Mounting Resins',
            reasoning: 'Low-viscosity epoxy penetrates fine cracks, pores, and irregular surfaces. Combined with vacuum impregnation, ensures complete encapsulation of delicate and complex-shaped samples. Longer cure (6-8 hours, or 1-2 hours fast-cure) but superior edge retention vs. acrylic.',
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
          reasoning: `${isAutomated ? 'Programmable press with automated temperature, pressure, and time control ensures repeatable mounts with minimal operator input.' : 'Hydraulic mounting press provides reliable, high-force compression mounting.'} Fast 8-15 minute cycles with good edge retention. Suitable for materials that can tolerate 150-180°C temperatures${isTitanium ? ' — Ti alloys are well within this safe range (β-transus is ~880°C)' : ''}.`,
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
        // Edge retention drives DAP vs phenolic. Case-depth measurement on hardened steels is a
        // common QC workflow where standard phenolic edge retention is insufficient and causes
        // soft, rounded edges that wash out the case/core boundary under the indenter.
        const isSteelFamily = materialType.includes('Steel') || isStainless;
        const isMediumOrHarder = isHard || isVeryHard || hardness.includes('Medium');
        const likelyCaseDepth = selectedStages.includes('hardness') && isSteelFamily && isMediumOrHarder;
        const needsEdgeRetention = needsEBSD ||
                                   applications.includes('Research & Development') ||
                                   applications.includes('Failure Analysis') ||
                                   likelyCaseDepth;

        if (needsEdgeRetention) {
          let edgeReason = 'DAP provides superior edge retention and hardness compared to phenolic.';
          if (likelyCaseDepth) {
            edgeReason += ' Recommended here because hardness testing on medium/hardened steel often involves case-depth or weld cross-section measurement (per ASTM E1077, E384), where phenolic edges round during polishing and wash out the case/core transition under the indenter.';
          } else if (needsEBSD) {
            edgeReason += ' Critical for EBSD prep where edge rounding produces artifacts at sample boundaries.';
          } else {
            edgeReason += ' Recommended for research and failure-analysis work where edge quality affects measurement accuracy.';
          }
          recommendations.push({
            type: 'Diallyl Phthalate (DAP) Mounting Resins',
            reasoning: edgeReason,
            category: 'consumable',
            stage: 'mounting'
          });
        } else {
          recommendations.push({
            type: 'Phenolic Mounting Resins',
            reasoning: 'Cost-effective phenolic resins for routine compression mounting. Available in multiple colors for sample identification. Good general-purpose edge retention for standard metallography. If edge quality becomes a problem (case-depth, coatings, welds), upgrade to DAP.',
            category: 'consumable',
            stage: 'mounting'
          });
        }
        // Comprehensive tier: also recommend cold mounting option
        if (isComprehensiveTier) {
          recommendations.push({
            type: 'Acrylic or Epoxy Cold-Mount Resins (supplemental)',
            reasoning: 'Keep castable cold mounts on hand alongside compression mounting for samples that cannot tolerate heat, irregular shapes, porous materials, and when clear mounts are needed for cross-reference imaging.',
            category: 'consumable',
            stage: 'mounting'
          });
        }
      }

      // Conductive mounts for SEM / EBSD — standard epoxy/phenolic charge under the beam
      if (needsEBSD) {
        recommendations.push({
          type: 'Conductive Mounting Resin (Cu- or graphite-filled) or Grounding Clips',
          reasoning: 'EBSD and most SEM work require a conductive sample path to ground. Standard epoxy and phenolic mounts charge under the electron beam, causing image drift and pattern degradation. Use a conductive (copper- or graphite-filled) phenolic / cold mount, or apply conductive paint / grounding clips around the sample.',
          category: 'consumable',
          stage: 'mounting'
        });
      }

      // Mount diameter callout — drives platen, fixture, and automated head sizing
      if (formData.mountDiameter && formData.mountDiameter !== 'Mixed sizes') {
        recommendations.push({
          type: `Mount Cups / Fixtures sized for ${formData.mountDiameter}`,
          reasoning: `Mount diameter of ${formData.mountDiameter} drives selection of compression-mount cylinders, cold-mount cups, and automated polishing head fixtures. Verify that any chosen prep equipment supports this mount size before purchasing.`,
          category: 'consumable',
          stage: 'mounting'
        });
      } else if (formData.mountDiameter === 'Mixed sizes') {
        recommendations.push({
          type: 'Multi-Size Mount Cups & Adapter Fixtures',
          reasoning: 'Mixed mount sizes require adapter rings or universal fixtures for automated prep equipment. Confirm equipment compatibility — some automated heads are dedicated to a single mount diameter.',
          category: 'consumable',
          stage: 'mounting'
        });
      }
    }

    // GRINDING RECOMMENDATIONS
    if (selectedStages.includes('grinding')) {
      // Surface a note when the user didn't know the hardness — results default to medium-hardness behavior
      if (isUnknownHardness) {
        recommendations.push({
          type: 'Note: Hardness unspecified — recommendations assume medium hardness',
          reasoning: 'You selected "Unknown" for material hardness. Grit progressions, polishing sequences, and abrasive selection default to medium-hardness behavior. If you can test or estimate the hardness (or run a quick Rockwell/Vickers test first), re-run the Lab Builder for more accurate consumable recommendations — or email our team at pace@metallographic.com with your material info.',
          category: 'consumable',
          stage: 'grinding'
        });
      }
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

      // Cemented carbides and most technical ceramics MUST be ground with diamond.
      // SiC papers glaze almost immediately on WC/Co and on most engineered ceramics, producing
      // poor surface quality and heavy subsurface damage. This is not a tier-gated upgrade — it is
      // the correct method for these materials at any tier.
      if (isCarbide || isCeramic) {
        recommendations.push({
          type: 'Diamond Grinding Discs (70 µm, 30 µm, 15 µm — metal-bond or resin-bond)',
          reasoning: `${isCarbide ? 'Cemented carbides (WC/Co)' : 'Technical ceramics'} must be ground with diamond. SiC papers glaze almost immediately on these materials, cut very slowly, and leave heavy subsurface damage. Run a progressive sequence of diamond grinding discs (typically 70 µm → 30 µm → 15 µm or finer) followed by diamond polishing. ${isPremiumTier ? 'Metal-bond discs offer longer life and more aggressive cutting for high-volume labs.' : 'Resin-bond discs self-dress and produce smoother surfaces; metal-bond discs last longer for higher volumes.'}`,
          category: 'consumable',
          stage: 'grinding'
        });
        recommendations.push({
          type: 'Diamond Suspension or Paste for Disc Recharging (15-45 µm)',
          reasoning: 'Resin-bond discs benefit from periodic recharging with diamond suspension to restore cutting action. Metal-bond discs are dressed with a dressing stick when glazed. Keep a small stock of both on hand.',
          category: 'consumable',
          stage: 'grinding'
        });
      } else {
        // Grinding sequences differentiated by hardness (non-carbide, non-ceramic materials)
        let grindingSequence = [];
        if (isSoft) {
          grindingSequence = ['240', '320', '400', '600'];
        } else if (isVeryHard) {
          grindingSequence = ['120', '240', '320', '400', '600', '800', '1200'];
        } else if (isHard) {
          grindingSequence = ['120', '240', '320', '400', '600', '800'];
        } else {
          // Medium hardness
          grindingSequence = ['120', '240', '320', '400', '600'];
        }

        const gritList = grindingSequence.join(', ');

        if (isVeryHard) {
          recommendations.push({
            type: `Silicon Carbide Grinding Papers (${gritList} grit)`,
            reasoning: `SiC provides aggressive cutting action for very hard steels and case-hardened parts. Follow the full progressive sequence through ${grindingSequence[grindingSequence.length - 1]} grit. Fine grits (800, 1200) are critical for minimizing subsurface damage before polishing.`,
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

        // Diamond grinding discs as an upgrade for premium tiers grinding hard (non-carbide) materials
        if (isPremiumTier && (isHard || isVeryHard)) {
          recommendations.push({
            type: 'Diamond Grinding Discs (75 µm, 45 µm) — optional upgrade',
            reasoning: 'Reusable diamond grinding discs offer faster, more consistent grinding for hard ferrous materials compared to SiC papers. Longer lifespan reduces per-sample cost in high-volume labs and can replace several SiC paper steps.',
            category: 'consumable',
            stage: 'grinding'
          });
        }
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

      // Polishing sequence — PACE house method (Don Zipperian) starts at 6 µm regardless of hardness.
      // This deliberately differs from Vander Voort/Buehler's 9 µm starting convention, which Don
      // considers an unnecessary step for properly ground samples. Carbides and ceramics still
      // benefit from a 9 µm coarse step because of their hardness.
      let polishingSequence = [];
      if (isCarbide || isCeramic) {
        polishingSequence = ['9', '6', '3', '1', '0.25'];
      } else {
        // All metals — soft, medium, hard, and very hard — use Don's 6 µm starting point
        polishingSequence = ['6', '3', '1', '0.25'];
      }

      const coarseDiamond = polishingSequence[0];
      const fineDiamond = polishingSequence[polishingSequence.length - 1];

      // Diamond type recommendation based on tier
      const diamondType = isPremiumTier ? 'Polycrystalline Diamond' : 'Diamond';

      let sequenceNote;
      if (isCarbide || isCeramic) {
        sequenceNote = 'Carbides and engineered ceramics start at 9 µm because of their extreme hardness.';
      } else if (isSoft) {
        sequenceNote = 'PACE house method starts at 6 µm for all metals — light pressure and short steps prevent embedding in soft alloys.';
      } else if (isHard || isVeryHard) {
        sequenceNote = 'PACE house method starts polishing at 6 µm rather than 9 µm. A properly ground sample (through 600-1200 grit SiC) does not require a 9 µm step on most hardened steels.';
      } else {
        sequenceNote = 'PACE house method standard sequence for medium-hardness materials.';
      }

      recommendations.push({
        type: `${diamondType} Polishing Suspensions or Pastes (${coarseDiamond} µm to ${fineDiamond} µm)`,
        reasoning: `Progressive polishing steps: ${polishingSequence.join(', ')} µm. ${sequenceNote} Use complementary rotation throughout — head and platen turning the same direction — including the final colloidal-silica step (PACE house preference). ${isPremiumTier ? 'Polycrystalline diamond provides more consistent scratch patterns and faster cutting than monocrystalline. ' : ''}Diamond paste with lubricant is an equivalent alternative to suspension for manual polishing.`,
        category: 'consumable',
        stage: 'polishing'
      });

      // Alumina suspension as a traditional alternative — still common for ferrous and stainless workflows
      if (!isHardMaterial && !needsEBSD) {
        recommendations.push({
          type: 'Alumina Polishing Suspensions (0.3 µm α-Al₂O₃ and 0.05 µm γ-Al₂O₃) — optional',
          reasoning: 'Alumina suspensions remain a traditional, lower-cost final polish for ferrous, stainless, and many non-ferrous workflows. α-alumina (0.3 µm) and γ-alumina (0.05 µm) are good alternatives or complements to diamond + colloidal silica when budget is a constraint.',
          category: 'consumable',
          stage: 'polishing'
        });
      }

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

      // Attack-polishing for Ti and other smearing/twinning-prone alloys
      if (isTitanium) {
        recommendations.push({
          type: 'Attack-Polish Additive (H₂O₂ in Colloidal Silica)',
          reasoning: 'Titanium alloys smear, twin mechanically, and obscure α/β phase contrast during conventional mechanical polishing. A chemo-mechanical attack-polish with 30% H₂O₂ blended into colloidal silica (typically 10:1 to 5:1 silica:H₂O₂) on a napped cloth removes deformation and reveals true microstructure. Critical for accurate α/β imaging on Ti-6Al-4V and similar alloys.',
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
        reasoning: 'SAFETY CRITICAL: Essential for safe handling of etchants. Protects operators from acid fumes (HCl, HNO₃, HF) and ensures compliance with safety regulations. Required for all etching operations.',
        category: 'equipment',
        stage: 'etching'
      });

      recommendations.push({
        type: 'PPE Kit (Acid-Resistant Gloves, Face Shield, Apron)',
        reasoning: 'Nitrile or butyl gloves rated for the specific acid in use, full face shield over safety glasses, and chemical-resistant apron. Keep neutralizer (sodium bicarbonate solution) and eyewash station accessible.',
        category: 'consumable',
        stage: 'etching'
      });

      recommendations.push({
        type: 'Etchant Storage and Dispensing Bottles',
        reasoning: 'Labeled, chemical-resistant bottles (HDPE or PTFE for HF-containing etchants) with dropper tops. Never store mixed etchants long-term — many decompose or become unsafe.',
        category: 'consumable',
        stage: 'etching'
      });

      // Material-specific etchant recommendations with links to existing site pages
      if (materialType.includes('Steel (Carbon')) {
        recommendations.push({
          type: 'Nital (2-8% Nitric Acid in Denatured Ethanol)',
          reasoning: 'The standard general-purpose etchant for carbon and low-alloy steels. Reveals ferrite/pearlite/martensite microstructure. Start with [2% Nital](/etchants/2-percent-nital.html) for most applications; use stronger ([4%](/etchants/4-percent-nital.html) or [5%](/etchants/5-percent-nital.html)) for harder, higher-alloy steels. Apply by immersion or swabbing 5-30 seconds.',
          category: 'consumable',
          stage: 'etching'
        });
        recommendations.push({
          type: 'Picral (Picric Acid in Denatured Ethanol) — optional',
          reasoning: '[Picral](/etchants/picral.html) preferentially reveals cementite and is useful when nital under-etches pearlite or when you need to distinguish ferrite from carbide morphology. Picric acid requires careful storage — keep it wet.',
          category: 'consumable',
          stage: 'etching'
        });
      } else if (isStainless) {
        recommendations.push({
          type: "Vilella's Reagent and Glyceregia",
          reasoning: 'Vilella\'s (picric acid + HCl + ethanol) is excellent for martensitic and precipitation-hardening stainless. [Glyceregia](/etchants/glyceregia.html) (HCl + HNO₃ + glycerol) is the standard for austenitic stainless steels. Both are immersion or swab etchants — work under a fume hood with PPE.',
          category: 'consumable',
          stage: 'etching'
        });
        recommendations.push({
          type: '10% Oxalic Acid (Electrolytic) — for austenitic SS',
          reasoning: 'Electrolytic etching with [10% oxalic acid](/etchants/10-percent-oxalic-acid-electrolytic.html) is the standard method for revealing grain boundaries and sensitization (ASTM A262 Practice A) in austenitic stainless. Requires a DC power supply (1-10 V, see Electrolytic Etching Unit below).',
          category: 'consumable',
          stage: 'etching'
        });
      } else if (isAluminum) {
        recommendations.push({
          type: "Keller's Reagent",
          reasoning: '[Keller\'s reagent](/etchants/kellers-reagent.html) (HF + HCl + HNO₃ + water) is the general-purpose etchant for most aluminum alloys, revealing grain structure and second-phase particles. ⚠️ Contains HF — use PTFE bottles, full face shield, and keep calcium gluconate gel on hand.',
          category: 'consumable',
          stage: 'etching'
        });
        recommendations.push({
          type: "Barker's Reagent (Electrolytic) — for grain structure",
          reasoning: '[Barker\'s anodizing](/etchants/barkers-reagent-electrolytic.html) (fluoboric acid, electrolytic) produces a colored anodic film that reveals aluminum grain structure beautifully under polarized light. Requires a DC power supply.',
          category: 'consumable',
          stage: 'etching'
        });
      } else if (isTitanium) {
        recommendations.push({
          type: "Kroll's Reagent",
          reasoning: 'Kroll\'s (HF + HNO₃ + water, typically 1-3% HF) is the universal Ti etchant for revealing α/β microstructure in commercial titanium alloys. Apply by swabbing 5-15 seconds. ⚠️ Contains HF — use PTFE bottles, full PPE, and have calcium gluconate gel accessible.',
          category: 'consumable',
          stage: 'etching'
        });
      } else if (isCopper) {
        recommendations.push({
          type: 'Ammonium Hydroxide + Hydrogen Peroxide',
          reasoning: '[NH₄OH + H₂O₂](/etchants/ammonium-hydroxide-h2o2.html) is the standard general-purpose etchant for copper and brass. Mix fresh just before use (H₂O₂ decomposes quickly). [Ammonium persulfate](/etchants/ammonium-persulfate.html) is a milder alternative.',
          category: 'consumable',
          stage: 'etching'
        });
      } else if (materialType.includes('Tin')) {
        recommendations.push({
          type: 'Tin / Lead / Soft Bearing Alloy Etchants',
          reasoning: 'Tin, lead, and soft bearing alloys smear easily and react with most common etchants. Mild [2% nital](/etchants/2-percent-nital.html), HCl-in-ethanol, or specialized tin-alloy reagents are typical — browse the [tin alloy etchants page](/etching/tin-alloy) for full compositions. Keep etching times short (seconds, not minutes), use light swabbing pressure, and follow with a quick alcohol rinse to prevent staining.',
          category: 'consumable',
          stage: 'etching'
        });
      } else if (isCarbide) {
        recommendations.push({
          type: "Murakami's Reagent",
          reasoning: 'Murakami\'s (K₃Fe(CN)₆ + KOH + water) is the standard etchant for cemented carbides — reveals η-phase, eta carbides, and binder-phase morphology. Often used hot (boiling) for stubborn samples. Use stainless or glass beakers; never aluminum.',
          category: 'consumable',
          stage: 'etching'
        });
      } else if (materialType.includes('Nickel')) {
        recommendations.push({
          type: "Kalling's No. 2 and Marble's Reagent",
          reasoning: '[Kalling\'s No. 2](/etchants/kallings-no-2.html) (CuCl₂ + HCl + ethanol) is the workhorse for nickel-base superalloys and stainless — reveals grain structure and γ′ precipitate morphology. [Marble\'s reagent](/etchants/marbles-reagent.html) (CuSO₄ + HCl + water) is the standard for Inconel, Hastelloy, Monel, and other Ni alloys. Both are swab etchants — work under a fume hood with PPE.',
          category: 'consumable',
          stage: 'etching'
        });
        recommendations.push({
          type: 'Glyceregia or Waterless Kalling\'s — alternatives',
          reasoning: '[Glyceregia](/etchants/glyceregia.html) (HCl + HNO₃ + glycerol) works on many Ni alloys, especially those with higher Cr content. [Waterless Kalling\'s](/etchants/waterless-kallings.html) is preferred where water-induced staining is a problem. Glyceregia decomposes — mix fresh; do not store.',
          category: 'consumable',
          stage: 'etching'
        });
        recommendations.push({
          type: '10% Chromic Acid (Electrolytic) — for γ′ revealing',
          reasoning: 'Electrolytic etching with [10% chromic acid](/etchants/chromic-acid-electrolytic.html) (typically 5-6 V DC, a few seconds) selectively dissolves γ′ in nickel-base superalloys for SEM/EBSD imaging of precipitate morphology. Requires a DC power supply.',
          category: 'consumable',
          stage: 'etching'
        });
      } else {
        recommendations.push({
          type: 'Material-Specific Etchants',
          reasoning: `Select etchants appropriate for ${materialType || 'your material'}. Use the [Etchant Selector tool](/etchant-selector.html) or browse our [etchant database](/etchants.html) by material. Common options include nital for carbon steels, Vilella's/glyceregia for stainless steel, Keller's for aluminum, and Kroll's for titanium.`,
          category: 'consumable',
          stage: 'etching'
        });
      }

      // Tint etchants for phase identification work
      if (applications.includes('Research & Development') || applications.includes('Failure Analysis') || applications.includes('Material Characterization')) {
        recommendations.push({
          type: "Tint Etchants (Beraha's, Klemm's) — optional",
          reasoning: '[Beraha\'s](/etchants/berahas-reagent.html) and [Klemm\'s reagents](/etchants/klemm-s-reagent.html) produce color contrast between phases, making phase identification, quantification, and orientation imaging much easier than monochrome etching. Useful for duplex stainless, cast irons, and multi-phase alloys.',
          category: 'consumable',
          stage: 'etching'
        });
      }

      // Electrolytic etching unit for materials that benefit from it
      if (isAluminum || isStainless || isCopper || materialType.includes('Nickel')) {
        recommendations.push({
          type: 'Electrolytic Etching / Polishing Unit (DC Power Supply)',
          reasoning: `Adjustable DC power supply (0-30 V, 0-5 A) with stainless cathode and sample-holder clip enables electrolytic etching (oxalic for SS, Barker's for Al) and electropolishing. ${needsEBSD ? 'Electropolishing is often the cleanest way to achieve a deformation-free surface for EBSD on Al, Cu, and austenitic SS.' : 'Electrolytic methods are faster and more reproducible than chemical immersion for many non-ferrous alloys.'}`,
          category: 'equipment',
          stage: 'etching'
        });
      }
    }

    // MICROSCOPY RECOMMENDATIONS
    if (selectedStages.includes('microscopy')) {
      // EBSD requires SEM + EBSD detector — call this out explicitly so users don't think an optical scope is enough
      if (needsEBSD) {
        recommendations.push({
          type: 'SEM with EBSD Detector (NOT supplied by this tool)',
          reasoning: '⚠️ EBSD (Electron Backscatter Diffraction) is performed in a Scanning Electron Microscope with an EBSD detector — it cannot be done on an optical microscope. This Lab Builder generates the sample-prep recommendations only. Contact our specialists to discuss SEM/EBSD system selection separately.',
          category: 'equipment',
          stage: 'microscopy'
        });
      }
      // Scope type based on application and tier
      let scopeType, scopeReasoning;
      if (needsEBSD || (applications.includes('Research & Development') && isPremiumTier)) {
        scopeType = 'Research-Grade';
        scopeReasoning = 'Research-grade inverted metallurgical microscope with advanced optics, DIC/Nomarski capability, polarized light, and high-magnification objectives. Essential for advanced characterization, publication-quality imaging, and verifying EBSD sample prep before SEM imaging.';
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

      // Stereomicroscope for failure analysis / fractography / weld macros / large-specimen overview
      if (applications.includes('Failure Analysis') || isLarge || isVeryLarge) {
        recommendations.push({
          type: 'Stereomicroscope (10x-50x) with Ring Light',
          reasoning: 'Low-magnification stereo (binocular) microscope is essential for fractography, weld macro examination, and overview imaging of large specimens before high-magnification work. Provides depth of field and 3D perception that a metallurgical microscope cannot.',
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
      // Cemented carbides — HRA or HV, not HRC
      if (isCarbide) {
        recommendations.push({
          type: 'Vickers Hardness Tester (HV30 or HV50)',
          reasoning: 'Cemented carbides (WC/Co) are conventionally rated in HV30 (per ISO 3878 / ASTM B294) or HRA — NOT HRC. A macro-Vickers tester with 30 kgf load is the industry standard. HRC indenters can be damaged on carbide samples and HRC values are not meaningful.',
          category: 'equipment',
          stage: 'hardness'
        });
      } else if (isSoft || isAluminum || isCopper) {
        // Soft non-ferrous: HRB only suits harder tempers; pure/annealed Al & Cu need HRE/HRF/HRH or Brinell
        if (isHighThroughput || applications.includes('Production Testing')) {
          recommendations.push({
            type: 'Rockwell Hardness Tester (with B, E, F, H scales)',
            reasoning: `Fast, direct-reading Rockwell testing for production QC of ${materialType || 'soft metals'}. Scale selection matters: HRB suits harder tempers of brass and Al alloys (e.g. 2024-T4, 7075-T6), but annealed pure aluminum and copper require HRE, HRF, or HRH (1/8" steel ball with lighter loads) — HRB will plastically dish soft samples and produce meaningless readings. Confirm proper scale per ASTM E18.`,
            category: 'equipment',
            stage: 'hardness'
          });
        } else {
          recommendations.push({
            type: 'Brinell or MacroVickers Hardness Tester',
            reasoning: `Brinell (HBW, typically 500 kgf / 10 mm ball for non-ferrous) provides reliable readings on ${materialType || 'soft metals'} where small indentations may not be representative of bulk microstructure. Low-force macro-Vickers (HV 1-10) is an alternative for mounted samples.`,
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
          reasoning: `Rockwell testing provides the fastest hardness measurements for production environments. Direct-reading display with no optical measurement needed. Use C scale (HRC) for hardened ${materialType || 'steels'} in the ${hardness || 'typical'} range; HRB for softer steels.`,
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

      // Indent measurement camera/optics (modern Vickers/Knoop testers need this)
      recommendations.push({
        type: 'Digital Indent Measurement Camera / Optical System',
        reasoning: 'Vickers and Knoop testers measure the diagonal of the indent optically — a calibrated digital camera with measurement software (or a high-quality optical eyepiece with reticle) is required. Most modern testers integrate this; verify it is included or budgeted.',
        category: 'equipment',
        stage: 'hardness'
      });

      // Calibration test blocks — non-optional for every hardness setup
      recommendations.push({
        type: 'Hardness Test Blocks (Certified Reference)',
        reasoning: 'Certified test blocks are required to verify tester calibration daily / per shift per ASTM E18, E384, and ISO standards. Stock blocks bracketing your expected hardness range (e.g. low + high HRC, HRB, or HV blocks as appropriate). Test blocks are consumable — they have a finite number of valid indent locations.',
        category: 'consumable',
        stage: 'hardness'
      });

      // Additional microhardness for R&D and failure analysis
      if (applications.includes('Failure Analysis') || applications.includes('Research & Development') || applications.includes('Material Characterization')) {
        recommendations.push({
          type: 'Microhardness Tester (Vickers/Knoop)',
          reasoning: 'Microhardness testing (HV/HK 0.01-1) is essential for failure analysis and research. Measures hardness of individual phases, thin coatings, case-hardened layers, heat-affected zones, and weld cross-sections. Knoop indenter preferred for thin layers and brittle materials because the elongated indent is shallower and easier to measure on thin features.',
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

  // Expert Review — HubSpot embed (replaces the prior mailto flow)
  // ---------------------------------------------------------------
  // The Lab Builder submits via the same HubSpot quote form used on /quote.html,
  // with the Lab Builder summary prefilled into the Inquiry Details textarea and
  // the relevant Area of Interest checkboxes pre-checked.
  const HUBSPOT_PORTAL_ID = '21334047';
  const HUBSPOT_FORM_ID = '5c2cc19c-3560-433a-9b41-67818a1379ca';
  const HUBSPOT_REGION = 'na1';
  let hubspotScriptLoading = false;
  let hubspotScriptLoaded = false;
  let hubspotFormRendered = false;

  // Map Lab Builder process stages to HubSpot "Area of Interest" checkbox values.
  // Values must match the exact label text configured on the quote form.
  // Extra values are harmless (only matching ones get checked) — list both possible
  // labels for mounting (Castable / Vacuum) so the prefill is robust to form edits.
  function mapStagesToAreasOfInterest(stages) {
    const map = {
      sectioning: ['Abrasive Cutting', 'Precision Wafering'],
      mounting: ['Compression Mounting', 'Castable Mounting', 'Vacuum Mounting'],
      grinding: ['Grinding and Polishing'],
      polishing: ['Grinding and Polishing', 'Vibratory Polishing'],
      etching: ['Consumables'],
      microscopy: ['Microscopy'],
      cleaning: ['Cleaning'],
      hardness: ['Hardness / Microhardness Testing']
    };
    const seen = {};
    const areas = [];
    (stages || []).forEach(stage => {
      (map[stage] || []).forEach(area => {
        if (!seen[area]) {
          seen[area] = true;
          areas.push(area);
        }
      });
    });
    return areas;
  }

  // Copy text to the clipboard. Uses the modern Clipboard API when available
  // and falls back to a hidden textarea + execCommand for older browsers and
  // non-HTTPS contexts (where navigator.clipboard is unavailable).
  async function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('[Lab Builder] navigator.clipboard.writeText failed, falling back:', err);
      }
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.left = '-1000px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (err) {
      console.warn('[Lab Builder] execCommand copy fallback failed:', err);
      return false;
    }
  }

  // Build a plain-text summary of the Lab Builder inputs + recommendations.
  // This is what gets written into the HubSpot Inquiry Details field.
  function buildLabBuilderSummary() {
    let body = 'LAB BUILDER SUMMARY\n';
    body += '===================\n\n';
    body += 'INPUTS\n------\n';
    body += `Material Type: ${formData.materialType || 'Not specified'}\n`;
    body += `Material Hardness: ${formData.materialHardness || 'Not specified'}\n`;
    body += `Sample Size: ${formData.sampleSize || 'Not specified'}\n`;
    if (formData.sampleShape) body += `Sample Shape: ${formData.sampleShape}\n`;
    if (formData.mountDiameter) body += `Mount Diameter: ${formData.mountDiameter}\n`;
    body += `Daily Throughput: ${formData.throughput || 'Not specified'}\n`;
    body += `Automation Level: ${formData.automation || 'Not specified'}\n`;
    body += `Equipment Tier: ${formData.budget || 'Not specified'}\n`;
    body += `Surface Finish: ${formData.surfaceFinish || 'Standard'}\n`;
    body += `Applications: ${formData.applications && formData.applications.length ? formData.applications.join(', ') : 'Not specified'}\n`;
    body += `Process Stages: ${formData.processStages && formData.processStages.length ? formData.processStages.join(', ') : 'Not specified'}\n`;
    if (formData.sectionType) body += `Section Type: ${formData.sectionType}\n`;
    if (formData.damageCriticality) body += `Cut Damage Sensitivity: ${formData.damageCriticality}\n`;
    body += '\n';

    if (recommendations && recommendations.length > 0) {
      body += 'RECOMMENDED EQUIPMENT & CONSUMABLES\n';
      body += '===================================\n\n';

      const byStage = {};
      recommendations.forEach(rec => {
        if (!byStage[rec.stage]) byStage[rec.stage] = { equipment: [], consumables: [] };
        if (rec.category === 'equipment') {
          byStage[rec.stage].equipment.push(rec);
        } else {
          byStage[rec.stage].consumables.push(rec);
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
        const recs = byStage[stage];
        if (!recs || (!recs.equipment.length && !recs.consumables.length)) return;
        const label = stageLabels[stage] || stage.toUpperCase();
        body += `${label}\n${'-'.repeat(label.length)}\n`;
        if (recs.equipment.length) {
          body += 'Equipment:\n';
          recs.equipment.forEach(rec => {
            const reasoning = rec.reasoning.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
            body += `  - ${rec.type}${reasoning ? ` — ${reasoning}` : ''}\n`;
          });
        }
        if (recs.consumables.length) {
          body += 'Consumables:\n';
          recs.consumables.forEach(rec => {
            const reasoning = rec.reasoning.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
            body += `  - ${rec.type}${reasoning ? ` — ${reasoning}` : ''}\n`;
          });
        }
        body += '\n';
      });
    }

    body += '---\n';
    body += 'Generated from the Lab Builder at metallographic.com/build.html';
    return body;
  }

  // Open the Expert Review modal and trigger HubSpot form load + summary preview population.
  function openExpertReviewModal() {
    const modal = document.getElementById('expert-review-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    // Populate the summary preview so users can review what's attached
    const previewContent = document.getElementById('summary-preview-content');
    if (previewContent) {
      previewContent.textContent = buildLabBuilderSummary();
    }

    // Lazy-load the HubSpot embed and render the form
    loadHubSpotForm();
  }

  function loadHubSpotForm() {
    if (hubspotFormRendered) return;
    loadHubSpotScript(() => {
      try {
        const container = document.getElementById('hubspot-form-container');
        if (!container) return;

        // Clear the loading placeholder and insert the hs-form-frame div. The newer
        // portal-specific embed (https://js.hsforms.net/forms/embed/{portalId}.js)
        // detects these divs and renders the form into them — this matches what
        // /quote.html uses and is less aggressively blocked by tracking-prevention
        // settings than the older v2 script.
        container.innerHTML = '';
        const frame = document.createElement('div');
        frame.className = 'hs-form-frame';
        frame.setAttribute('data-region', HUBSPOT_REGION);
        frame.setAttribute('data-form-id', HUBSPOT_FORM_ID);
        frame.setAttribute('data-portal-id', HUBSPOT_PORTAL_ID);
        container.appendChild(frame);

        hubspotFormRendered = true;

        // Watch for the form to actually render (HubSpot inserts an iframe or form
        // element inside the frame div) so we can hide the loading state, and watch
        // for the post-submit "thank you" replacement so we can show a success UI.
        observeHubSpotFormState(container);
      } catch (err) {
        console.error('[Lab Builder] HubSpot form failed to render:', err);
        showHubSpotError();
      }
    });
  }

  // Watch the embed container to detect (a) form render completion and
  // (b) HubSpot replacing the form with its built-in "thank you" message.
  function observeHubSpotFormState(container) {
    if (!container || !window.MutationObserver) return;
    let formReady = false;
    const observer = new MutationObserver(() => {
      // Form has rendered (iframe or inline form appeared)
      if (!formReady && container.querySelector('iframe, form, .hbspt-form, .hs-form')) {
        formReady = true;
        const loadingEl = document.getElementById('hubspot-loading');
        if (loadingEl) loadingEl.style.display = 'none';
      }
      // HubSpot's success markup uses these classes/attributes after submission
      const successEl = container.querySelector(
        '.submitted-message, .hs-content-success, [data-test-id="form-success"]'
      );
      if (successEl) {
        observer.disconnect();
        showHubSpotSuccessState();
      }
    });
    observer.observe(container, { childList: true, subtree: true });
    // Stop watching after a long idle window
    setTimeout(() => observer.disconnect(), 10 * 60 * 1000);
  }

  function loadHubSpotScript(callback) {
    if (hubspotScriptLoaded) {
      callback();
      return;
    }
    if (hubspotScriptLoading) {
      // Another call is in flight — poll briefly for completion
      const poll = setInterval(() => {
        if (hubspotScriptLoaded) {
          clearInterval(poll);
          callback();
        }
      }, 100);
      setTimeout(() => clearInterval(poll), 10000);
      return;
    }
    hubspotScriptLoading = true;
    const script = document.createElement('script');
    // Portal-specific embed (matches /quote.html). Survives most tracking-prevention
    // blocklists better than the legacy /v2.js script.
    script.src = 'https://js.hsforms.net/forms/embed/' + HUBSPOT_PORTAL_ID + '.js';
    script.async = true;
    script.charset = 'utf-8';
    script.onload = function() {
      hubspotScriptLoaded = true;
      hubspotScriptLoading = false;
      callback();
    };
    script.onerror = function() {
      hubspotScriptLoading = false;
      console.warn('[Lab Builder] HubSpot embed script could not be loaded.');
      showHubSpotError();
    };
    document.head.appendChild(script);
  }

  function showHubSpotError() {
    const loadingEl = document.getElementById('hubspot-loading');
    if (loadingEl) loadingEl.style.display = 'none';
    const errorEl = document.getElementById('hubspot-form-error');
    if (errorEl) errorEl.style.display = 'block';

    // Wire the mailto fallback with the current summary
    const link = document.getElementById('hubspot-fallback-link');
    if (link) {
      const subject = 'Lab Builder Request';
      const body = 'Hi PACE,\n\nI completed the Lab Builder on metallographic.com — please review my recommendations below and follow up:\n\n' + buildLabBuilderSummary();
      link.href = 'mailto:pace@metallographic.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
  }

  function showHubSpotSuccessState() {
    const container = document.getElementById('hubspot-form-container');
    if (container) {
      container.innerHTML =
        '<div class="builder-hubspot-success">' +
          '<div class="builder-hubspot-success-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
              '<polyline points="20 6 9 17 4 12"/>' +
            '</svg>' +
          '</div>' +
          '<h3 class="builder-hubspot-success-title">Your Lab Builder request is on its way to PACE.</h3>' +
          '<p class="builder-hubspot-success-text">Our team will review your recommendations and follow up within 4 business hours during weekdays. Watch for a confirmation in your inbox.</p>' +
        '</div>';
    }
    // Hide the surrounding chrome — keep the modal clean after submission
    const prefillNote = document.querySelector('.builder-prefill-note');
    if (prefillNote) prefillNote.style.display = 'none';
    const summaryPreview = document.getElementById('summary-preview');
    if (summaryPreview) summaryPreview.style.display = 'none';
    const description = document.querySelector('.builder-modal-description');
    if (description) description.style.display = 'none';
    const errorEl = document.getElementById('hubspot-form-error');
    if (errorEl) errorEl.style.display = 'none';
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
        mountDiameter: '',
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

