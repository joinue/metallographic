// Guides data - converted from TypeScript
const categoryOrder = ['Basics', 'Process', 'Material-Specific', 'Application-Specific', 'Troubleshooting'];

const guides = [
  // Basics Section
  {
    title: 'Introduction to Metallography',
    slug: 'introduction-to-metallography',
    description: 'Learn the fundamentals of metallography, including what it is, why it matters, and how it\'s used in materials science and engineering.',
    category: 'Basics',
    readTime: '10 min read',
    difficulty: 'Beginner',
    icon: 'BookOpen',
    basicsOrder: 1,
  },
  {
    title: 'Purpose and Applications',
    slug: 'purpose-and-applications',
    description: 'Discover the various applications of metallography in quality control, failure analysis, research, and materials development.',
    category: 'Basics',
    readTime: '10 min read',
    difficulty: 'Beginner',
    icon: 'BookOpen',
    basicsOrder: 2,
  },
  {
    title: 'History of Metallography',
    slug: 'history-of-metallography',
    description: 'Explore the evolution of metallography from its origins to modern techniques. Understand how the field has developed over time.',
    category: 'Basics',
    readTime: '8 min read',
    difficulty: 'Beginner',
    icon: 'BookOpen',
    basicsOrder: 3,
  },
  {
    title: 'Equipment Overview',
    slug: 'equipment-overview',
    description: 'Learn about the essential equipment used in metallography, from sectioning equipment to microscopes. Understand what equipment you need for metallographic sample preparation.',
    category: 'Basics',
    readTime: '12 min read',
    difficulty: 'Beginner',
    icon: 'BookOpen',
    basicsOrder: 4,
  },
  {
    title: 'Safety Fundamentals',
    slug: 'safety-fundamentals',
    description: 'Essential safety practices for metallography laboratories. Learn about chemical safety, equipment safety, personal protective equipment, and safe work practices.',
    category: 'Basics',
    readTime: '15 min read',
    difficulty: 'Beginner',
    icon: 'BookOpen',
    basicsOrder: 5,
  },
  {
    title: 'Common Misconceptions',
    slug: 'common-misconceptions',
    description: 'Learn about common mistakes and misconceptions beginners make in metallography. Avoid these pitfalls and develop better metallographic practices.',
    category: 'Basics',
    readTime: '10 min read',
    difficulty: 'Beginner',
    icon: 'BookOpen',
    basicsOrder: 6,
  },
  // Process Guides
  {
    title: 'Sectioning',
    slug: 'sectioning',
    description: 'Overview of sample sectioning techniques including saw selection, cutting parameters, and minimizing damage during the cutting process.',
    category: 'Process',
    readTime: '8 min read',
    processOrder: 1,
    processIcon: 'Scissors',
    difficulty: 'Beginner',
  },
  {
    title: 'Mounting',
    slug: 'mounting',
    description: 'Overview of mounting procedures including compression mounting, castable mounting, and selecting appropriate mounting materials.',
    category: 'Process',
    readTime: '10 min read',
    processOrder: 2,
    processIcon: 'Box',
    difficulty: 'Beginner',
  },
  {
    title: 'Grinding Techniques',
    slug: 'grinding-techniques',
    description: 'Overview of grinding with proper grit selection, pressure control, and technique. Learn progressive grinding methods for optimal surface quality.',
    category: 'Process',
    readTime: '18 min read',
    processOrder: 3,
    processIcon: 'Layers',
    difficulty: 'Beginner',
  },
  {
    title: 'Polishing Methods',
    slug: 'polishing-methods',
    description: 'Overview of polishing techniques for different materials and applications. Covers diamond polishing, oxide polishing, and final polishing strategies.',
    category: 'Process',
    readTime: '20 min read',
    processOrder: 4,
    processIcon: 'Gem',
    difficulty: 'Intermediate',
  },
  {
    title: 'Etching Procedures',
    slug: 'etching-procedures',
    description: 'Overview of etching techniques, reagent selection, and application methods. Learn how to reveal microstructures effectively and safely.',
    category: 'Process',
    readTime: '16 min read',
    processOrder: 5,
    processIcon: 'FlaskConical',
    difficulty: 'Intermediate',
  },
  {
    title: 'Microstructural Analysis',
    slug: 'microstructural-analysis',
    description: 'Complete guide to preparing samples for microscopy, choosing the right microscope, and interpreting common microstructures in metals and alloys.',
    category: 'Process',
    readTime: '18 min read',
    processOrder: 6,
    processIcon: 'FlaskConical',
    difficulty: 'Intermediate',
  },
  // Material-Specific Guides
  {
    title: 'Stainless Steel Preparation',
    slug: 'stainless-steel-preparation',
    description: 'Complete in-depth guide to preparing stainless steel samples for metallographic analysis, including sectioning, mounting, grinding, polishing, and etching techniques.',
    category: 'Material-Specific',
    readTime: '15 min read',
    microstructureImage: '/images/microstructures/431ss.png',
    difficulty: 'Intermediate',
  },
  {
    title: 'Aluminum Sample Preparation',
    slug: 'aluminum-sample-preparation',
    description: 'In-depth guide for preparing aluminum samples without smearing or deformation. Learn proper techniques for soft materials and avoid common pitfalls.',
    category: 'Material-Specific',
    readTime: '12 min read',
    microstructureImage: '/images/microstructures/6061-Aluminum.jpg',
    difficulty: 'Intermediate',
  },
  {
    title: 'Copper and Copper Alloys',
    slug: 'copper-alloys-preparation',
    description: 'In-depth preparation methods for copper and its alloys, including brass and bronze. Learn techniques to avoid smearing and reveal true microstructures.',
    category: 'Material-Specific',
    readTime: '11 min read',
    microstructureImage: '/images/microstructures/Tough-Pitch-copper-2.jpg',
    difficulty: 'Intermediate',
  },
  {
    title: 'Titanium Preparation',
    slug: 'titanium-preparation',
    description: 'In-depth specialized techniques for preparing titanium samples, including handling reactive surfaces and proper etching methods for alpha and beta phases.',
    category: 'Material-Specific',
    readTime: '13 min read',
    microstructureImage: '/images/microstructures/Ti6Al4V.jpg',
    difficulty: 'Advanced',
  },
  {
    title: 'Carbon and Low Alloy Steels Preparation',
    slug: 'carbon-steel-preparation',
    description: 'In-depth procedures for preparing carbon steel and low alloy steel samples (1018, 1045, 4140, 4340, 5160, 52100). Covers proper etching for pearlite, ferrite, and martensite structures.',
    category: 'Material-Specific',
    readTime: '12 min read',
    microstructureImage: '/images/microstructures/1018FC.jpg',
    difficulty: 'Intermediate',
  },
  {
    title: 'Cast Iron Preparation',
    slug: 'cast-iron-preparation',
    description: 'Complete guide to preparing cast iron samples with emphasis on preserving graphite structure. Covers gray, ductile, malleable, and austempered ductile iron preparation techniques.',
    category: 'Material-Specific',
    readTime: '14 min read',
    microstructureImage: '/images/microstructures/CI-nodular-200X-AP-2.jpg',
    difficulty: 'Intermediate',
  },
  {
    title: 'Tool Steel and Hardened Steel Preparation',
    slug: 'tool-steel-preparation',
    description: 'Comprehensive guide for preparing very hard tool steels and hardened steels. Learn techniques for preserving carbides, extended preparation sequences, and revealing complex microstructures in high-hardness materials.',
    category: 'Material-Specific',
    readTime: '16 min read',
    microstructureImage: '/images/microstructures/1095wq.jpg',
    difficulty: 'Advanced',
  },
  {
    title: 'Nickel and Cobalt Superalloys Preparation',
    slug: 'nickel-alloys-preparation',
    description: 'Comprehensive guide for preparing nickel and cobalt superalloys including Inconel, Hastelloy, and Stellite. Learn techniques for handling high-temperature alloys and revealing complex microstructures.',
    category: 'Material-Specific',
    readTime: '14 min read',
    microstructureImage: '/images/microstructures/Hastelloy-adlers-etch-200X-DIC.jpg',
    difficulty: 'Advanced',
  },
  {
    title: 'Magnesium Preparation',
    slug: 'magnesium-preparation',
    description: 'Specialized techniques for preparing magnesium and magnesium alloys. Learn how to handle reactive materials and avoid oxidation artifacts.',
    category: 'Material-Specific',
    readTime: '13 min read',
    microstructureImage: '/images/microstructures/B4Cmgl2.jpg',
    difficulty: 'Advanced',
  },
  {
    title: 'Ceramics Preparation',
    slug: 'ceramics-preparation',
    description: 'Complete guide to preparing ceramic samples for metallographic analysis. Covers sectioning hard materials, avoiding chipping, and revealing grain boundaries.',
    category: 'Material-Specific',
    readTime: '16 min read',
    microstructureImage: '/images/microstructures/Al2O3.jpg',
    difficulty: 'Advanced',
  },
  {
    title: 'Composites Preparation',
    slug: 'composites-preparation',
    description: 'In-depth techniques for preparing composite materials including fiber-reinforced composites. Learn to avoid pullout, maintain fiber orientation, and reveal interfaces.',
    category: 'Material-Specific',
    readTime: '15 min read',
    microstructureImage: '/images/microstructures/carbon-carbon-composite.jpg',
    difficulty: 'Advanced',
  },
  // Application-Specific Guides
  {
    title: 'Failure Analysis',
    slug: 'failure-analysis',
    description: 'Learn about failure analysis techniques in metallography, including fracture analysis, root cause investigation, and material failure mechanisms.',
    category: 'Application-Specific',
    readTime: '20 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'Castings and Foundry Analysis',
    slug: 'castings-foundry-analysis',
    description: 'Complete guide to metallographic analysis of cast materials including solidification structure analysis, dendrite arm spacing measurement, casting defect identification, and grain size control.',
    category: 'Application-Specific',
    readTime: '18 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'Hardness Testing Preparation',
    slug: 'hardness-testing-preparation',
    description: 'In-depth specialized preparation techniques for samples that will undergo hardness testing. Ensure accurate results with proper surface preparation.',
    category: 'Application-Specific',
    readTime: '8 min read',
    difficulty: 'Intermediate',
  },
  {
    title: 'Heat Treatment Verification',
    slug: 'heat-treatment-verification',
    description: 'Complete guide to verifying heat treatment effectiveness through metallographic analysis, including case depth measurement, decarburization detection, and microstructure validation for different heat treatment processes.',
    category: 'Application-Specific',
    readTime: '18 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'Quality Control and Inspection',
    slug: 'quality-control-inspection',
    description: 'In-depth guide on how to evaluate sample quality, identify preparation artifacts, and ensure your samples meet industry standards for metallographic analysis.',
    category: 'Application-Specific',
    readTime: '15 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'Welding Analysis and Weld Zone Preparation',
    slug: 'welding-analysis',
    description: 'Complete guide to preparing weld samples for metallographic analysis, including weld zone, HAZ, and fusion boundary preparation for different welding methods.',
    category: 'Application-Specific',
    readTime: '18 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'Additive Manufacturing (3D Printing) Sample Preparation',
    slug: 'additive-manufacturing-preparation',
    description: 'Complete guide to preparing additive manufacturing samples for metallographic analysis. Learn techniques for handling porosity, layer boundaries, support structures, and revealing build direction and process defects.',
    category: 'Application-Specific',
    readTime: '16 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'Aerospace Applications Guide',
    slug: 'aerospace-applications',
    description: 'Comprehensive guide to metallographic analysis for aerospace applications, covering titanium and superalloy preparation, fatigue and creep damage assessment, coating analysis, and industry-specific standards.',
    category: 'Application-Specific',
    readTime: '22 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'Automotive Applications Guide',
    slug: 'automotive-applications',
    description: 'Complete guide to metallographic analysis for automotive applications, covering steel and aluminum processing verification, heat treatment validation, weld quality assessment, and industry-specific quality requirements.',
    category: 'Application-Specific',
    readTime: '20 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'Medical Device Applications Guide',
    slug: 'medical-device-applications',
    description: 'Comprehensive guide to metallographic analysis for medical device applications, covering biocompatible material preparation, surface finish requirements, implant material characterization, and regulatory compliance considerations.',
    category: 'Application-Specific',
    readTime: '18 min read',
    difficulty: 'Advanced',
  },
  {
    title: 'PCB and Chip Sample Preparation',
    slug: 'pcb-chip-preparation',
    description: 'Complete guide to preparing printed circuit boards (PCBs) and semiconductor chips for metallographic analysis. Learn controlled removal techniques, ATTO polishing, and precision preparation methods essential for electronics failure analysis and quality control.',
    category: 'Application-Specific',
    readTime: '20 min read',
    difficulty: 'Advanced',
  },
  // Troubleshooting
  {
    title: 'Troubleshooting Common Issues',
    slug: 'troubleshooting-common-issues',
    description: 'Comprehensive solutions to common problems in metallographic sample preparation including scratches, contamination, relief, and poor contrast issues.',
    category: 'Troubleshooting',
    readTime: '14 min read',
    icon: 'AlertCircle',
    difficulty: 'Intermediate',
  },
];

// Icon SVG paths
const iconMap = {
  BookOpen: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
  Scissors: '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>',
  Layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
  Gem: '<path d="M6 3h12l4 6-10 12L2 9z"></path>',
  FlaskConical: '<path d="M10 2v10"></path><path d="M14 2v10"></path><path d="M4 13h16"></path><path d="M8 22h8"></path><path d="M7 13l5-10 5 10"></path>',
  Box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
  AlertCircle: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
  ChevronRight: '<polyline points="9 18 15 12 9 6"></polyline>',
};

// Category descriptions
const categoryDescriptions = {
  'Basics': 'Fundamentals for beginners.',
  'Process': 'Step-by-step preparation techniques.',
  'Material-Specific': 'Detailed guides for specific materials.',
  'Application-Specific': 'Advanced techniques for specialized applications.',
  'Troubleshooting': 'Solutions for common preparation issues.',
};

// Initialize guides page
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const categoryFilters = document.getElementById('category-filters');
  const guidesContent = document.getElementById('guides-content');
  const emptyState = document.getElementById('empty-state');

  let selectedCategory = 'All';
  let searchQuery = '';

  // Get category from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    selectedCategory = categoryParam;
  }

  // Sort guides by category order, then within category
  const sortedGuides = [...guides].sort((a, b) => {
    const aCategoryIndex = categoryOrder.indexOf(a.category);
    const bCategoryIndex = categoryOrder.indexOf(b.category);
    
    if (aCategoryIndex === bCategoryIndex) {
      if (a.category === 'Process' && b.category === 'Process') {
        return (a.processOrder || 0) - (b.processOrder || 0);
      }
      if (a.category === 'Basics' && b.category === 'Basics') {
        return (a.basicsOrder || 0) - (b.basicsOrder || 0);
      }
      return a.title.localeCompare(b.title);
    }
    
    return aCategoryIndex - bCategoryIndex;
  });

  // Render category filters
  function renderFilters() {
    const categories = ['All', ...categoryOrder];
    categoryFilters.innerHTML = categories.map(category => {
      const isActive = selectedCategory === category;
      return `
        <button
          class="filter-btn ${isActive ? 'active' : ''}"
          data-category="${category}"
          role="tab"
          aria-selected="${isActive}"
          aria-controls="guides-content"
        >
          ${category}
        </button>
      `;
    }).join('');

    // Add event listeners
    categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCategory = btn.dataset.category;
        updateURL();
        renderFilters();
        renderGuides();
      });
    });
  }

  // Filter guides
  function getFilteredGuides() {
    return sortedGuides.filter(guide => {
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  // Group guides by category
  function groupGuidesByCategory(guidesList) {
    return guidesList.reduce((acc, guide) => {
      if (!acc[guide.category]) {
        acc[guide.category] = [];
      }
      acc[guide.category].push(guide);
      return acc;
    }, {});
  }

  // Get icon SVG
  function getIconSVG(iconName, className = '') {
    if (!iconName || !iconMap[iconName]) return '';
    return `<svg class="guide-icon ${className}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconMap[iconName]}</svg>`;
  }

  // Get difficulty badge class
  function getDifficultyClass(difficulty) {
    if (difficulty === 'Beginner') return 'badge-beginner';
    if (difficulty === 'Intermediate') return 'badge-intermediate';
    return 'badge-advanced';
  }

  // Render guide card
  function renderGuideCard(guide, index) {
    const icon = guide.category === 'Process' && guide.processIcon 
      ? getIconSVG(guide.processIcon, 'process-icon')
      : (guide.icon ? getIconSVG(guide.icon, '') : '');
    
    const microstructureImg = guide.microstructureImage 
      ? `<div class="guide-microstructure">
           <img src="${guide.microstructureImage}" alt="${guide.title} microstructure" loading="lazy">
         </div>`
      : '';

    const difficultyBadge = guide.difficulty
      ? `<span class="difficulty-badge ${getDifficultyClass(guide.difficulty)}">${guide.difficulty}</span>`
      : '';

    const readTime = guide.readTime
      ? `<span class="read-time">${guide.readTime}</span>`
      : '';

    // Determine link - basics guides and process guides are local, troubleshooting goes to resources, others to metallography.org
    const localGuides = ['introduction-to-metallography', 'purpose-and-applications', 'history-of-metallography', 'equipment-overview', 'safety-fundamentals', 'common-misconceptions', 'sectioning', 'mounting', 'grinding-techniques', 'polishing-methods', 'etching-procedures', 'microstructural-analysis', 'aluminum-sample-preparation', 'carbon-steel-preparation', 'cast-iron-preparation', 'ceramics-preparation', 'composites-preparation', 'magnesium-preparation', 'stainless-steel-preparation', 'titanium-preparation', 'copper-alloys-preparation', 'tool-steel-preparation', 'nickel-alloys-preparation'];
    
    // Special cases for guides with different file names than slugs
    const slugToFileMap = {
      'copper-alloys-preparation': 'copper-and-copper-alloys-preparation'
    };
    
    let link;
    if (guide.slug === 'troubleshooting-common-issues') {
      link = '/support.html';
    } else if (slugToFileMap[guide.slug]) {
      // Handle guides with different file names
      link = `/guides/${slugToFileMap[guide.slug]}.html`;
    } else if (localGuides.includes(guide.slug)) {
      link = `/guides/${guide.slug}.html`;
    } else {
      link = `https://metallography.org/guides/${guide.slug}`;
    }

    return `
      <article class="guide-card" data-index="${index}">
        <a href="${link}" class="guide-card-link" ${link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          <div class="guide-card-header">
            <div class="guide-card-icons">
              ${microstructureImg}
              ${icon}
              ${difficultyBadge}
            </div>
            ${readTime}
          </div>
          <h3 class="guide-card-title">${guide.title}</h3>
          <p class="guide-card-description">${guide.description}</p>
          <span class="guide-card-link-text">
            Read Guide
            ${getIconSVG('ChevronRight', 'link-arrow')}
          </span>
        </a>
      </article>
    `;
  }

  // Render guides
  function renderGuides() {
    const filteredGuides = getFilteredGuides();
    
    if (filteredGuides.length === 0) {
      guidesContent.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    guidesContent.style.display = 'block';
    emptyState.style.display = 'none';

    // Reset animation state
    guidesContent.classList.add('animating');
    
    // Use requestAnimationFrame to ensure smooth animation reset
    requestAnimationFrame(() => {
      if (selectedCategory === 'All') {
        // Show guides grouped by section
        const guidesByCategory = groupGuidesByCategory(filteredGuides);
        let html = '';
        
        categoryOrder.forEach(category => {
          const categoryGuides = guidesByCategory[category] || [];
          if (categoryGuides.length === 0) return;

          const description = categoryDescriptions[category] || '';
          
          html += `
            <section class="guide-section" data-category="${category}">
              <div class="guide-section-header">
                <h2 class="guide-section-title">${category}</h2>
                <span class="guide-section-count">(${categoryGuides.length} ${categoryGuides.length === 1 ? 'guide' : 'guides'})</span>
              </div>
              ${description ? `<p class="guide-section-description">${description}</p>` : ''}
              <div class="guide-cards-grid">
                ${categoryGuides.map((guide, index) => renderGuideCard(guide, index)).join('')}
              </div>
            </section>
          `;
        });

        guidesContent.innerHTML = html;
      } else {
        // Show filtered guides in grid
        guidesContent.innerHTML = `
          <div class="guide-cards-grid">
            ${filteredGuides.map((guide, index) => renderGuideCard(guide, index)).join('')}
          </div>
        `;
      }
      
      // Remove animating class after content is rendered to trigger animations
      requestAnimationFrame(() => {
        guidesContent.classList.remove('animating');
      });
    });
  }

  // Update URL without reload
  function updateURL() {
    const url = new URL(window.location);
    if (selectedCategory === 'All') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', selectedCategory);
    }
    window.history.pushState({ category: selectedCategory }, '', url);
  }

  // Search handler
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGuides();
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    selectedCategory = categoryParam || 'All';
    renderFilters();
    renderGuides();
  });

  // Initial render
  renderFilters();
  renderGuides();
});

