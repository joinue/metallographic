import type { Material } from '@/lib/supabase'

export interface BuilderFormData {
  // Step 1: Process Stages
  processStages: string[]
  
  // Step 2: Sample Specifications
  materialType: string
  materialHardness: string
  sampleSize: string
  sampleShape: string
  applications: string[]
  selectedMaterial?: Material | null // Optional: specific material from database
  
  // Step 3: General Workflow
  throughput: string
  automation: string
  budget: string
  surfaceFinish: string
  
  // Step 3: Stage-Specific (Optional)
  // Sectioning
  sectionType?: string // "Cross-section" (default), "Surface", "Specific feature", "Variable"
  damageCriticality?: string // "Standard" (default), "High", "Very High"
  
  // Mounting
  mountingTypePreference?: string // "Compression" (default), "Castable", "Both", "Variable"
  mountSizeRequirements?: string // "Standard (25-32mm)" (default), "Small (< 25mm)", "Large (> 32mm)", "Variable"
  
  // Grinding
  grindingMethodPreference?: string // "Automated preferred" (default), "Manual acceptable", "Both"
  grindingSurfaceRequirements?: string // "Standard flat" (default), "Preserve features", "Minimal deformation"
  
  // Polishing
  polishingMethodPreference?: string // "Automated preferred" (default), "Manual acceptable", "Both"
  finalSurfaceQuality?: string // "Standard mirror" (default), "EBSD-ready", "Research-grade"
  
  // Etching
  etchingFrequency?: string // "Occasional" (default), "Regular", "High frequency"
  etchantTypes?: string[] // Multi-select
  
  // Microscopy
  microscopyTypes?: string[] // Multi-select: "Optical", "Digital imaging", "EBSD/SEM", "Variable"
  documentationRequirements?: string // "Basic" (default), "High-resolution", "Automated capture", "Variable"
  
  // Cleaning
  cleaningFrequency?: string // "Occasional" (default), "Regular", "High frequency"
  cleaningMethodPreference?: string // "Ultrasonic" (default), "Manual", "Both"
  
  // Hardness Testing
  hardnessTestTypes?: string[] // Multi-select: "Rockwell", "Vickers", "Knoop", "Brinell", "Variable"
  hardnessTestingFrequency?: string // "Occasional" (default), "Regular", "High frequency"
}

export interface GeneralRecommendation {
  type: string
  reasoning: string
  category: 'equipment' | 'consumable'
  stage: string
}

export function useBuilderRecommendations() {
  const generateRecommendations = (formData: BuilderFormData): GeneralRecommendation[] => {
    const recommendations: GeneralRecommendation[] = []
    
    // Parse input parameters
    const hardness = formData.materialHardness
    const sampleSize = formData.sampleSize
    const sampleShape = formData.sampleShape
    const throughput = formData.throughput
    const automation = formData.automation
    const budget = formData.budget
    const materialType = formData.materialType
    const surfaceFinish = formData.surfaceFinish || ''
    const applications = formData.applications
    const selectedStages = formData.processStages

    // Derived characteristics
    const isHard = hardness.includes('Hard') || hardness.includes('Very Hard')
    const isVeryHard = hardness.includes('Very Hard')
    const isSoft = hardness.includes('Soft')
    const isLarge = sampleSize.includes('Large') || sampleSize.includes('Very Large')
    const isVeryLarge = sampleSize.includes('Very Large')
    const isSmall = sampleSize.includes('Small')
    const isDelicate = sampleShape === 'Small' || sampleShape === 'Thin'
    const isHighThroughput = throughput.includes('High') || throughput.includes('Very High')
    const isVeryHighThroughput = throughput.includes('Very High')
    const isAutomated = automation.includes('Automated')
    const isSemiAutomated = automation.includes('Semi-Automated')
    const needsEBSD = applications.includes('EBSD') || surfaceFinish.includes('EBSD') || surfaceFinish.includes('Extremely Flat')
    const isHardMaterial = materialType.includes('Hard Metals') || materialType.includes('Ceramics')
    const isBrittle = materialType.includes('Ceramics') || materialType.includes('Hard Metals')

    // ========== SECTIONING RECOMMENDATIONS ==========
    if (selectedStages.includes('sectioning')) {
      // Use stage-specific data if available
      const sectionType = formData.sectionType || 'Cross-section'
      const damageCriticality = formData.damageCriticality || 'Standard'
      const needsHighPrecision = damageCriticality === 'High' || damageCriticality === 'Very High'
      const needsSpecificFeature = sectionType === 'Specific feature' || sectionType === 'Surface'
      
      // Determine table feed vs wheel feed based on throughput
      const needsTableFeed = throughput && (throughput.includes('Medium') || throughput.includes('High') || throughput.includes('Very High'))
      const needsAutomatedTableFeed = (throughput && (throughput.includes('High') || throughput.includes('Very High'))) || automation.includes('Automated')
      
      // For small samples (< 25mm), precision wafering is more appropriate than abrasive saws
      // Standard abrasive saws start at 10-inch (250mm) - smaller than that, use precision wafering
      if (isSmall && (isDelicate || needsEBSD || surfaceFinish.includes('Extremely Flat') || needsHighPrecision || needsSpecificFeature)) {
        // Small delicate samples: precision wafering is the primary method
        recommendations.push({
          type: 'Precision Wafering System with Diamond Blades',
          reasoning: `Essential for small delicate samples. Precision wafering with thin diamond blades (3-8 inch) minimizes damage and material loss. Standard abrasive saws (minimum 10-inch) are too large for small samples. Produces smoother cut surfaces with less damage, reducing subsequent grinding time.`,
          category: 'equipment',
          stage: 'sectioning',
        })
        recommendations.push({
          type: 'Diamond Wafering Blades (3-8 inch)',
          reasoning: `Thin diamond blades (0.1-0.5 mm) minimize kerf width and material loss. Essential for small samples where material conservation is important. High concentration diamond blades provide precise cutting with minimal heat generation.`,
          category: 'consumable',
          stage: 'sectioning',
        })
      } else {
        // Standard samples: abrasive sectioning is the primary method
        // Abrasive saws are available in 10-inch (250mm) minimum, then 12, 14, 16-inch
        const bladeSize = isVeryLarge ? '14-16 inch' : isLarge ? '12-14 inch' : '10-12 inch'
        
        // Determine feed type based on throughput and budget
        let feedType = ''
        if (needsAutomatedTableFeed) {
          feedType = 'with Automated Table Feed'
        } else if (needsTableFeed) {
          feedType = 'with Manual Table Feed'
        } else if (budget === 'Essential' && isSmall) {
          feedType = 'with Wheel Feed Only (Budget Option)'
        } else {
          feedType = 'with Table Feed'
        }
        
        recommendations.push({
          type: `${bladeSize} Abrasive Cut-off Saw ${feedType}`,
          reasoning: `Primary sectioning method for ${materialType || 'most materials'}. Versatile and cost-effective, suitable for a wide range of materials from soft metals to hard steels and ceramics. Standard abrasive saws start at 10-inch (250mm) blade size. ${needsAutomatedTableFeed ? 'Automated table feed ensures consistent cutting parameters for high throughput.' : needsTableFeed ? 'Table feed provides better control and consistency for medium to high throughput.' : 'Wheel feed only provides cost-effective sectioning for low-volume work.'} Appropriate blade size for ${sampleSize.toLowerCase()} samples.`,
          category: 'equipment',
          stage: 'sectioning',
        })
        
        // Blade selection based on material
        if (isHardMaterial || isVeryHard) {
          recommendations.push({
            type: 'Silicon Carbide Abrasive Cut-off Wheels',
            reasoning: `SiC abrasive wheels provide aggressive cutting action essential for hard materials and ceramics. Proper blade selection and adequate cooling prevent excessive heat generation that could alter microstructure.`,
            category: 'consumable',
            stage: 'sectioning',
          })
        } else if (isSoft) {
          recommendations.push({
            type: 'Aluminum Oxide Abrasive Cut-off Wheels',
            reasoning: `Alumina abrasive wheels suitable for soft non-ferrous metals. Proper blade selection prevents excessive heat generation and material smearing in soft materials.`,
            category: 'consumable',
            stage: 'sectioning',
          })
        } else {
          recommendations.push({
            type: 'Abrasive Cut-off Wheels',
            reasoning: `Silicon carbide or alumina abrasive wheels suitable for ${materialType || 'metallic materials'}. Proper blade selection prevents excessive heat generation.`,
            category: 'consumable',
            stage: 'sectioning',
          })
        }
        
        recommendations.push({
          type: 'Cutting Fluid / Coolant',
          reasoning: 'Essential for cooling and lubrication during cutting. Prevents excessive heat generation that could cause phase transformations or microstructural changes.',
          category: 'consumable',
          stage: 'sectioning',
        })
        
        // Precision wafering as additional option for specific cases
        // For hard materials/ceramics: recommended as alternative for minimal damage
        // For large samples needing precision: recommended for final section after rough cutting
        // Also consider stage-specific data
        const needsPrecisionWafering = (isHardMaterial || isBrittle || isDelicate || needsHighPrecision || needsSpecificFeature) && 
                                        (needsEBSD || surfaceFinish.includes('Extremely Flat') || 
                                         applications.includes('Research & Development') ||
                                         applications.includes('Failure Analysis') ||
                                         damageCriticality === 'High' ||
                                         damageCriticality === 'Very High')
        
        if (needsPrecisionWafering) {
          recommendations.push({
            type: 'Precision Wafering System with Diamond Blades (Optional/Alternative)',
            reasoning: `Recommended as alternative or complement to abrasive sectioning for ${isHardMaterial ? 'hard materials and ceramics' : isDelicate ? 'delicate samples' : 'applications requiring minimal damage'}. Diamond blade cutting minimizes deformation and thermal damage. ${isLarge || isVeryLarge ? 'For large samples, use abrasive sectioning for rough cutting, then precision wafering for final section.' : 'Produces smoother cut surfaces with less damage, reducing subsequent grinding time.'}`,
            category: 'equipment',
            stage: 'sectioning',
          })
          recommendations.push({
            type: 'Diamond Wafering Blades (3-8 inch)',
            reasoning: `High concentration diamond blades provide precise cutting with minimal heat generation. Prevents thermal damage critical for ${isHardMaterial ? 'hard materials and ceramics' : 'delicate materials'}.`,
            category: 'consumable',
            stage: 'sectioning',
          })
        }
      }
    }

    // ========== MOUNTING RECOMMENDATIONS ==========
    if (selectedStages.includes('mounting')) {
      const needsColdMounting = isSoft || isDelicate || 
                                 materialType.includes('Titanium') || 
                                 materialType.includes('Heat-Sensitive')
      
      if (needsColdMounting) {
        if (isHighThroughput) {
          recommendations.push({
            type: 'UV Curing Mounting System',
            reasoning: `Fastest cold mounting cycles for high-volume work. Essential for temperature-sensitive materials where compression mounting heat would alter microstructure.`,
            category: 'equipment',
            stage: 'mounting',
          })
        } else {
          recommendations.push({
            type: 'Vacuum Impregnation System',
            reasoning: `Removes air bubbles for clear mounts without heat application. Essential for soft metals and heat-sensitive materials. Prevents thermal damage that could mask true microstructure.`,
            category: 'equipment',
            stage: 'mounting',
          })
        }
        recommendations.push({
          type: 'Epoxy Mounting Resins',
          reasoning: `High-quality epoxy resins for cold mounting. Excellent edge retention and chemical resistance essential for microstructure preservation.`,
          category: 'consumable',
          stage: 'mounting',
        })
      } else {
        const pressType = isAutomated ? 'Automated' : 'Manual'
        recommendations.push({
          type: `${pressType} Compression Mounting Press`,
          reasoning: `Fast cycles and good edge retention for most materials. Heat and pressure application suitable for materials that can tolerate thermal cycling.`,
          category: 'equipment',
          stage: 'mounting',
        })
        recommendations.push({
          type: 'Thermosetting Mounting Resins',
          reasoning: 'Phenolic or diallyl phthalate (DAP) resins for compression mounting. Select based on material compatibility and edge retention needs.',
          category: 'consumable',
          stage: 'mounting',
        })
      }
    }

    // ========== GRINDING RECOMMENDATIONS ==========
    if (selectedStages.includes('grinding')) {
      // Belt grinder for large samples - initial rough grinding
      if (isLarge || isVeryLarge) {
        recommendations.push({
          type: 'Belt Grinder / Hand Grinder',
          reasoning: `Essential for initial rough grinding of ${sampleSize.toLowerCase()} samples. Provides fastest material removal before fine grinding with papers. Critical for large samples requiring significant material removal.`,
          category: 'equipment',
          stage: 'grinding',
        })
      }
      
      const platenSize = isLarge || isVeryLarge ? '12 inch' : '8-10 inch'
      const automationType = isAutomated ? 'Programmable' : isSemiAutomated ? 'Semi-automated' : 'Manual'
      
      recommendations.push({
        type: `${platenSize} ${automationType} Grinder/Polisher`,
        reasoning: `Appropriate platen size for ${sampleSize.toLowerCase()} samples. ${isAutomated ? 'Programmable operation ensures consistent grinding parameters.' : 'Manual control provides flexibility for varied materials.'}`,
        category: 'equipment',
        stage: 'grinding',
      })
      
      // Get grinding sequence from material if available, otherwise use general procedure
      let grindingSequence: string[] = []
      if (formData.selectedMaterial?.recommended_grinding_sequence && formData.selectedMaterial.recommended_grinding_sequence.length > 0) {
        grindingSequence = formData.selectedMaterial.recommended_grinding_sequence
      } else {
        // Generate general sequence based on material characteristics
        if (isSoft) {
          // Soft materials: start with 240 to minimize deformation
          grindingSequence = ['240', '320', '400', '600']
        } else if (isHardMaterial || isVeryHard) {
          // Hard materials: full sequence including optional fine grits
          grindingSequence = ['120', '240', '320', '400', '600', '800', '1200']
        } else if (isHard) {
          // Medium-hard materials: standard sequence with optional fine grits
          grindingSequence = ['120', '240', '320', '400', '600', '800', '1200']
        } else {
          // Medium hardness: standard sequence
          grindingSequence = ['120', '240', '320', '400', '600', '800', '1200']
        }
      }
      
      // Format grinding sequence for display
      const gritRange = grindingSequence.length > 0 
        ? `${grindingSequence[0]}-${grindingSequence[grindingSequence.length - 1]} grit`
        : 'progressive grit sizes'
      const gritList = grindingSequence.join(', ')
      
      if (isHardMaterial || isVeryHard) {
        recommendations.push({
          type: `Silicon Carbide Grinding Papers (${gritList} grit)`,
          reasoning: `SiC provides aggressive cutting action essential for hard materials. Follow progressive sequence: ${gritList} grit. ${grindingSequence.includes('800') || grindingSequence.includes('1200') ? 'Fine grits (800, 1200) recommended for best surface quality before polishing.' : ''}`,
          category: 'consumable',
          stage: 'grinding',
        })
      } else if (isSoft) {
        recommendations.push({
          type: `Aluminum Oxide or Fine SiC Grinding Papers (${gritList} grit)`,
          reasoning: `Finer abrasives (starting at 240 grit) with light pressure minimize embedding and relief in soft materials. Follow sequence: ${gritList} grit. Essential for preserving true microstructure.`,
          category: 'consumable',
          stage: 'grinding',
        })
      } else {
        recommendations.push({
          type: `Grinding Papers (${gritList} grit)`,
          reasoning: `Standard grinding papers in progressive grit sizes: ${gritList}. ${grindingSequence.includes('800') || grindingSequence.includes('1200') ? 'Fine grits (800, 1200) recommended for optimal surface preparation before polishing.' : 'Follow progressive grinding steps for optimal surface preparation.'}`,
          category: 'consumable',
          stage: 'grinding',
        })
      }
    }

    // ========== POLISHING RECOMMENDATIONS ==========
    if (selectedStages.includes('polishing')) {
      const platenSize = isLarge || isVeryLarge ? '12 inch' : '8-10 inch'
      const automationType = isAutomated ? 'Programmable' : isSemiAutomated ? 'Semi-automated' : 'Manual'
      
      // Recommend dual wheel for high throughput or cross contamination concerns
      const needsDualWheel = isHighThroughput || isVeryHighThroughput || 
                              (applications.includes('Quality Control') && isHighThroughput) ||
                              (applications.includes('Production Testing'))
      
      if (needsDualWheel) {
        recommendations.push({
          type: `Dual Wheel ${platenSize} ${automationType} Grinder/Polisher`,
          reasoning: `Dual wheel configuration allows dedicated wheels for grinding and polishing, preventing cross-contamination and improving throughput. ${isAutomated ? 'Programmable operation ensures consistent polishing parameters.' : 'Manual control provides flexibility.'} Essential for high-volume production and quality control where sample-to-sample contamination must be avoided.`,
          category: 'equipment',
          stage: 'polishing',
        })
      } else {
        recommendations.push({
          type: `${platenSize} ${automationType} Grinder/Polisher`,
          reasoning: `Can handle both grinding and polishing operations with polishing suspension. ${isAutomated ? 'Programmable operation ensures consistent polishing parameters.' : 'Manual control provides flexibility.'}`,
          category: 'equipment',
          stage: 'polishing',
        })
      }
      
      // Get polishing sequence from material if available, otherwise use general procedure
      let polishingSequence: string[] = []
      if (formData.selectedMaterial?.recommended_polishing_sequence && formData.selectedMaterial.recommended_polishing_sequence.length > 0) {
        polishingSequence = formData.selectedMaterial.recommended_polishing_sequence
      } else {
        // Generate general sequence based on material characteristics
        if (isSoft) {
          // Soft materials: shorter sequence to minimize deformation
          polishingSequence = ['6', '3', '1', '0.5', '0.25']
        } else if (isHardMaterial || isVeryHard) {
          // Hard materials: full sequence
          polishingSequence = ['9', '6', '3', '1', '0.5', '0.25']
        } else {
          // Standard materials: typical sequence
          polishingSequence = ['9', '6', '3', '1', '0.5', '0.25']
        }
      }
      
      // Format polishing sequence for display
      const diamondSizes = polishingSequence.filter(g => parseFloat(g) >= 0.25).map(g => `${g} µm`)
      const coarseDiamond = polishingSequence.find(g => parseFloat(g) >= 3) || '3'
      
      // Coarse to medium polishing (diamond suspensions)
      recommendations.push({
        type: `Diamond Polishing Suspensions (${coarseDiamond} µm to 0.25 µm)`,
        reasoning: `Diamond suspensions for progressive polishing steps: ${polishingSequence.join(', ')} µm. Essential for removing grinding scratches and achieving high-quality surface finish.`,
        category: 'consumable',
        stage: 'polishing',
      })
      
      recommendations.push({
        type: 'Polishing Cloths (synthetic)',
        reasoning: 'Synthetic polishing cloths for diamond polishing stages. Provides consistent surface for diamond suspension application.',
        category: 'consumable',
        stage: 'polishing',
      })
    }

    // ========== FINAL POLISHING RECOMMENDATIONS ==========
    if (selectedStages.includes('polishing')) {
      // Final polishing (colloidal silica or fine diamond)
      if (needsEBSD || surfaceFinish.includes('Extremely Flat') || surfaceFinish.includes('High Quality')) {
        // Vibratory polisher for EBSD and extremely flat requirements
        recommendations.push({
          type: 'Vibratory Polisher',
          reasoning: 'Essential for EBSD preparation and extremely flat surfaces. Produces deformation-free surfaces with minimal relief critical for electron backscatter diffraction. Uses vibration to polish samples without mechanical pressure.',
          category: 'equipment',
          stage: 'final-polishing',
        })
        recommendations.push({
          type: 'Colloidal Silica Polishing Suspension (0.05 µm)',
          reasoning: 'Final polishing step for extremely flat surfaces. Essential for EBSD and advanced characterization techniques requiring minimal surface relief and deformation-free surfaces.',
          category: 'consumable',
          stage: 'final-polishing',
        })
        recommendations.push({
          type: 'Napped Polishing Cloth',
          reasoning: 'Napped cloth essential for final colloidal silica polishing. Provides gentle polishing action for deformation-free surfaces.',
          category: 'consumable',
          stage: 'final-polishing',
        })
      } else {
        recommendations.push({
          type: 'Fine Diamond Suspension (0.25 µm) or Colloidal Silica (0.05 µm)',
          reasoning: 'Final polishing step for high-quality surface finish. Removes fine scratches from previous polishing steps and prepares surface for microstructural analysis.',
          category: 'consumable',
          stage: 'final-polishing',
        })
        recommendations.push({
          type: 'Napped Polishing Cloth',
          reasoning: 'Napped cloth for final polishing steps. Provides appropriate surface for fine polishing suspensions.',
          category: 'consumable',
          stage: 'final-polishing',
        })
      }
    }

    // ========== ETCHING RECOMMENDATIONS ==========
    if (selectedStages.includes('etching')) {
      // Fume hood / ventilation system - SAFETY CRITICAL
      recommendations.push({
        type: 'Fume Hood / Ventilation System',
        reasoning: 'SAFETY CRITICAL: Essential for safe handling of etchants. Protects operators from chemical fumes and ensures compliance with safety regulations. Required for all etching operations.',
        category: 'equipment',
        stage: 'etching',
      })
      
      recommendations.push({
        type: 'Etchants (material-specific)',
        reasoning: `Select etchants appropriate for ${materialType || 'your material'}. Common options include nital for carbon steels, Vilella's for stainless steel, and Kroll's for titanium. Use the [Etchant Selector tool](/tools/etchant-selector) to find the right etchant for your material, or browse the [Etchants Database](/etchants) for comprehensive information.`,
        category: 'consumable',
        stage: 'etching',
      })
    }

    // ========== MICROSCOPY RECOMMENDATIONS ==========
    if (selectedStages.includes('microscopy')) {
      const scopeType = needsEBSD || applications.includes('Research & Development') ? 'Advanced' : isHighThroughput ? 'Production' : 'Standard'
      recommendations.push({
        type: `${scopeType} Metallurgical Microscope`,
        reasoning: `${scopeType.toLowerCase()} microscope suitable for ${isHighThroughput ? 'high-throughput' : 'routine'} metallographic analysis. Consider digital imaging capabilities for documentation.`,
        category: 'equipment',
        stage: 'microscopy',
      })
      
      // Digital imaging system - essential for modern metallography
      const needsImaging = isHighThroughput || 
                           applications.includes('Quality Control') || 
                           applications.includes('Failure Analysis') ||
                           applications.includes('Research & Development')
      
      if (needsImaging) {
        recommendations.push({
          type: 'Digital Imaging System',
          reasoning: `Essential for modern metallography documentation. Includes digital camera and imaging software for image capture, measurement, annotation, and report generation. Critical for ${applications.includes('Quality Control') ? 'quality control' : applications.includes('Failure Analysis') ? 'failure analysis' : 'research'} documentation.`,
          category: 'equipment',
          stage: 'microscopy',
        })
      }
    }

    // ========== CLEANING RECOMMENDATIONS ==========
    if (selectedStages.includes('cleaning')) {
      recommendations.push({
        type: 'Ultrasonic Cleaner',
        reasoning: 'Essential for removing polishing residues and contaminants. Ensures clean samples for accurate microstructural analysis.',
        category: 'equipment',
        stage: 'cleaning',
      })
      
      // Drying oven - prevents water spots
      recommendations.push({
        type: 'Drying Oven',
        reasoning: 'Critical for drying samples after cleaning to prevent water spots and contamination. Essential for high-quality surface preparation, especially for microscopy and photography.',
        category: 'equipment',
        stage: 'cleaning',
      })
    }

    // ========== HARDNESS TESTING RECOMMENDATIONS ==========
    if (selectedStages.includes('hardness')) {
      recommendations.push({
        type: 'Hardness Tester (Vickers/Rockwell)',
        reasoning: `Appropriate hardness testing system for ${materialType || 'your materials'}. Vickers for precision, Rockwell for production testing.`,
        category: 'equipment',
        stage: 'hardness',
      })
    }

    return recommendations
  }

  return { generateRecommendations }
}

