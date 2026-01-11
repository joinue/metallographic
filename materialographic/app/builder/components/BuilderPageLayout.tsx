'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Info, AlertCircle, X, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import BuilderStepInputs from './BuilderStepInputs'
import BuilderResults from './BuilderResults'
import ProcessStagesSelection from './ProcessStagesSelection'
import { useBuilderRecommendations, BuilderFormData, GeneralRecommendation } from '../hooks/useBuilderRecommendations'

const STORAGE_KEY = 'builder-form-data'
const STORAGE_STEP_KEY = 'builder-step'
const STORAGE_RECOMMENDATIONS_KEY = 'builder-recommendations'

export default function BuilderPageLayout() {
  const router = useRouter()
  
  // Initialize form data from sessionStorage or defaults
  const getInitialFormData = (): BuilderFormData => {
    if (typeof window === 'undefined') {
      return {
        processStages: ['sectioning', 'mounting', 'grinding', 'polishing'],
        materialType: '',
        materialHardness: '',
        sampleSize: '',
        sampleShape: '',
        applications: [],
        selectedMaterial: null,
        throughput: '',
        automation: '',
        budget: '',
        surfaceFinish: '',
      }
    }
    
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Note: selectedMaterial won't be restored (complex object), but that's okay
        return {
          ...parsed,
          selectedMaterial: null, // Reset selectedMaterial on restore
        }
      }
    } catch (e) {
      console.error('Error loading form data from sessionStorage:', e)
    }
    
    return {
      processStages: ['sectioning', 'mounting', 'grinding', 'polishing'],
      materialType: '',
      materialHardness: '',
      sampleSize: '',
      sampleShape: '',
      applications: [],
      selectedMaterial: null,
      throughput: '',
      automation: '',
      budget: '',
      surfaceFinish: '',
    }
  }
  
  const [step, setStep] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(STORAGE_STEP_KEY)
        if (saved) {
          const stepNum = parseInt(saved, 10)
          if (stepNum >= 1 && stepNum <= 4) return stepNum
        }
      } catch (e) {
        console.error('Error loading step from sessionStorage:', e)
      }
    }
    return 1
  })
  
  const [formData, setFormData] = useState<BuilderFormData>(getInitialFormData)
  const [recommendations, setRecommendations] = useState<GeneralRecommendation[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(STORAGE_RECOMMENDATIONS_KEY)
        if (saved) {
          return JSON.parse(saved)
        }
      } catch (e) {
        console.error('Error loading recommendations from sessionStorage:', e)
      }
    }
    return []
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [previousPath, setPreviousPath] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  // Expert review form state
  const [showExpertReview, setShowExpertReview] = useState(false)
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  
  // Confirmation dialog state
  const [showBackConfirmation, setShowBackConfirmation] = useState(false)

  // Track if this is the initial mount to prevent auto-scroll on page load
  const isInitialMount = useRef(true)

  const { generateRecommendations } = useBuilderRecommendations()

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Don't save selectedMaterial (complex object), just the materialType
        const dataToSave = {
          ...formData,
          selectedMaterial: null, // Don't persist complex objects
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      } catch (e) {
        console.error('Error saving form data to sessionStorage:', e)
      }
    }
  }, [formData])

  // Save step to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_STEP_KEY, step.toString())
      } catch (e) {
        console.error('Error saving step to sessionStorage:', e)
      }
    }
  }, [step])

  // Save recommendations to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && recommendations.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_RECOMMENDATIONS_KEY, JSON.stringify(recommendations))
      } catch (e) {
        console.error('Error saving recommendations to sessionStorage:', e)
      }
    }
  }, [recommendations])

  // Track previous page on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const referrer = document.referrer
      const currentOrigin = window.location.origin
      
      if (referrer && referrer.startsWith(currentOrigin)) {
        const referrerPath = new URL(referrer).pathname
        if (referrerPath !== '/builder') {
          setPreviousPath(referrerPath)
        } else {
          setPreviousPath('/')
        }
      } else {
        setPreviousPath('/')
      }
    }
  }, [])

  const handleBack = () => {
    // If on results page (step 4), show confirmation dialog
    if (step === 4 && recommendations.length > 0) {
      setShowBackConfirmation(true)
    } else {
      // Otherwise, proceed with navigation
      if (previousPath && previousPath !== '/builder') {
        router.push(previousPath)
      } else {
        router.push('/')
      }
    }
  }
  
  const handleConfirmBack = () => {
    // User chose to go back without sending to expert
    setShowBackConfirmation(false)
    if (previousPath && previousPath !== '/builder') {
      router.push(previousPath)
    } else {
      router.push('/')
    }
  }
  
  const handleSendToExpertBeforeBack = () => {
    // User chose to send to expert - open expert review modal
    setShowBackConfirmation(false)
    setShowExpertReview(true)
  }

  // Focus management: focus on step container when step changes
  useEffect(() => {
    // Skip auto-scroll on initial mount (when page first loads)
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    
    const stepElement = document.getElementById(`step-${step}`)
    if (stepElement) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        stepElement.focus()
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [step])

  // Store element that had focus before modal opened
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  // Focus trap for modals
  useEffect(() => {
    if (!showExpertReview && !showBackConfirmation) {
      // Restore focus when modal closes
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus()
        previousActiveElementRef.current = null
      }
      return
    }

    // Store the currently focused element before opening modal
    previousActiveElementRef.current = document.activeElement as HTMLElement

    const modal = document.querySelector('[role="dialog"]') as HTMLElement
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Focus first element when modal opens
    if (firstElement) {
      setTimeout(() => firstElement.focus(), 100)
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modal.addEventListener('keydown', handleTab)
    return () => modal.removeEventListener('keydown', handleTab)
  }, [showExpertReview, showBackConfirmation])

  // Keyboard navigation: Enter to proceed, Esc to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc key: close modals
      if (e.key === 'Escape') {
        if (showExpertReview) {
          setShowExpertReview(false)
          setReviewFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
          })
          e.preventDefault()
        } else if (showBackConfirmation) {
          setShowBackConfirmation(false)
          e.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showExpertReview, showBackConfirmation])

  const handleStepChange = (newStep: number) => {
    setStep(newStep)
    // Focus will be handled by useEffect above
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const recs = generateRecommendations(formData)
      setRecommendations(recs)
      handleStepChange(4)
      
      setTimeout(() => {
        const recommendationsElement = document.getElementById('recommendations-section')
        if (recommendationsElement) {
          recommendationsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          recommendationsElement.focus()
        }
      }, 100)
    } catch (error) {
      console.error('Error generating recommendations:', error)
      setError('There was an error generating recommendations. Please try again.')
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsGenerating(false)
    }
  }

  // Generate mailto: link with all form data and recommendations
  const generateExpertReviewMailto = (): string => {
    let body = 'LAB BUILDER REVIEW REQUEST\n'
    body += '==========================\n\n'
    
    // Contact Information
    body += 'CONTACT INFORMATION\n'
    body += '-------------------\n'
    body += `Name: ${reviewFormData.name}\n`
    body += `Email: ${reviewFormData.email}\n`
    if (reviewFormData.phone) body += `Phone: ${reviewFormData.phone}\n`
    if (reviewFormData.company) body += `Company: ${reviewFormData.company}\n`
    body += '\n'
    
    // Lab Requirements
    body += 'LAB REQUIREMENTS\n'
    body += '----------------\n'
    body += `Material Type: ${formData.materialType || 'Not specified'}\n`
    if (formData.selectedMaterial) {
      body += `Specific Material: ${formData.selectedMaterial.name}\n`
      if (formData.selectedMaterial.hardness_hrc) {
        body += `Material Hardness (HRC): ${formData.selectedMaterial.hardness_hrc}\n`
      }
    }
    body += `Material Hardness: ${formData.materialHardness || 'Not specified'}\n`
    body += `Sample Size: ${formData.sampleSize || 'Not specified'}\n`
    body += `Sample Shape: ${formData.sampleShape || 'Not specified'}\n`
    body += `Daily Throughput: ${formData.throughput || 'Not specified'}\n`
    body += `Automation Level: ${formData.automation || 'Not specified'}\n`
    body += `Equipment Tier: ${formData.budget || 'Not specified'}\n`
    body += `Surface Finish: ${formData.surfaceFinish || 'Standard'}\n`
    body += `Applications: ${formData.applications?.length > 0 ? formData.applications.join(', ') : 'Not specified'}\n`
    body += `Process Stages: ${formData.processStages?.length > 0 ? formData.processStages.join(', ') : 'Not specified'}\n`
    
    // Stage-specific options
    if (formData.sectionType) body += `Section Type: ${formData.sectionType}\n`
    if (formData.damageCriticality) body += `Damage Criticality: ${formData.damageCriticality}\n`
    if (formData.mountingTypePreference) body += `Mounting Type Preference: ${formData.mountingTypePreference}\n`
    if (formData.mountSizeRequirements) body += `Mount Size Requirements: ${formData.mountSizeRequirements}\n`
    if (formData.grindingMethodPreference) body += `Grinding Method Preference: ${formData.grindingMethodPreference}\n`
    if (formData.polishingMethodPreference) body += `Polishing Method Preference: ${formData.polishingMethodPreference}\n`
    if (formData.finalSurfaceQuality) body += `Final Surface Quality: ${formData.finalSurfaceQuality}\n`
    if (formData.etchingFrequency) body += `Etching Frequency: ${formData.etchingFrequency}\n`
    if (formData.etchantTypes && formData.etchantTypes.length > 0) body += `Etchant Types: ${formData.etchantTypes.join(', ')}\n`
    if (formData.microscopyTypes && formData.microscopyTypes.length > 0) body += `Microscopy Types: ${formData.microscopyTypes.join(', ')}\n`
    if (formData.cleaningFrequency) body += `Cleaning Frequency: ${formData.cleaningFrequency}\n`
    if (formData.hardnessTestTypes && formData.hardnessTestTypes.length > 0) body += `Hardness Test Types: ${formData.hardnessTestTypes.join(', ')}\n`
    body += '\n'
    
    // Recommendations
    if (recommendations && recommendations.length > 0) {
      body += 'RECOMMENDED EQUIPMENT & CONSUMABLES\n'
      body += '===================================\n\n'
      
      // Group by stage
      const recommendationsByStage = recommendations.reduce((acc, rec) => {
        if (!acc[rec.stage]) {
          acc[rec.stage] = { equipment: [], consumables: [] }
        }
        if (rec.category === 'equipment') {
          acc[rec.stage].equipment.push(rec)
        } else {
          acc[rec.stage].consumables.push(rec)
        }
        return acc
      }, {} as Record<string, { equipment: GeneralRecommendation[], consumables: GeneralRecommendation[] }>)
      
      const stageOrder = ['sectioning', 'mounting', 'grinding', 'polishing', 'final-polishing', 'etching', 'microscopy', 'cleaning', 'hardness']
      const stageLabels: Record<string, string> = {
        sectioning: 'SECTIONING',
        mounting: 'MOUNTING',
        grinding: 'GRINDING',
        polishing: 'POLISHING',
        'final-polishing': 'FINAL POLISHING',
        etching: 'ETCHING',
        microscopy: 'MICROSCOPY',
        cleaning: 'CLEANING',
        hardness: 'HARDNESS TESTING',
      }
      
      stageOrder.forEach((stage) => {
        const stageRecs = recommendationsByStage[stage]
        if (stageRecs && (stageRecs.equipment.length > 0 || stageRecs.consumables.length > 0)) {
          const label = stageLabels[stage] || stage.toUpperCase()
          body += `${label}\n`
          body += `${'-'.repeat(label.length)}\n`
          
          if (stageRecs.equipment.length > 0) {
            body += 'Equipment:\n'
            stageRecs.equipment.forEach((rec) => {
              const reasoning = rec.reasoning.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
              body += `  - ${rec.type}${reasoning ? ` (${reasoning})` : ''}\n`
            })
          }
          
          if (stageRecs.consumables.length > 0) {
            body += 'Consumables:\n'
            stageRecs.consumables.forEach((rec) => {
              const reasoning = rec.reasoning.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
              body += `  - ${rec.type}${reasoning ? ` (${reasoning})` : ''}\n`
            })
          }
          body += '\n'
        }
      })
    }
    
    // Additional message
    if (reviewFormData.message) {
      body += 'ADDITIONAL MESSAGE\n'
      body += '------------------\n'
      body += `${reviewFormData.message}\n`
    }
    
    body += '\n---\n'
    body += 'This request was generated from the Lab Builder tool on metallography.org'
    
    const subject = `Lab Builder Review Request${reviewFormData.company ? ` - ${reviewFormData.company}` : ''}`
    
    return `mailto:sales@metallographic.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleReviewFormChange = (field: string, value: string) => {
    setReviewFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const canSubmitReview = () => {
    return reviewFormData.name.trim() !== '' && reviewFormData.email.trim() !== ''
  }

  // Check if user has filled out any form data
  const hasFormData = () => {
    const hasBasicInfo = formData.materialType || formData.materialHardness || formData.sampleSize
    const hasWorkflowInfo = formData.throughput || formData.automation || formData.budget
    const hasAdditionalInfo = formData.sampleShape || formData.surfaceFinish || formData.applications.length > 0
    const defaultStages = ['sectioning', 'mounting', 'grinding', 'polishing']
    const hasModifiedStages = formData.processStages.length !== defaultStages.length || 
                              !formData.processStages.every(stage => defaultStages.includes(stage))
    
    return hasBasicInfo || hasWorkflowInfo || hasAdditionalInfo || hasModifiedStages || recommendations.length > 0
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-40 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Go back to previous page"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="py-8">
        <div className="container-custom max-w-5xl mx-auto px-4">
          {/* Header */}
          <header className="mb-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Lab Builder</h1>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Get general equipment and consumable recommendations based on your sample specifications 
              and workflow requirements.
            </p>
          </header>

          {/* Info Banner - Only show on Step 1 */}
          {step === 1 && (
            <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <span className="font-semibold">General Recommendations:</span> This tool provides general equipment types and consumables appropriate for your use case. For specific product recommendations, use this tool and send your results to one of our experts or{' '}
                    <Link href="/quote" className="font-semibold text-blue-700 underline hover:text-blue-900">
                      request a quote
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
              <div className={`flex flex-col sm:flex-row items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 text-xs ${step >= 1 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'}`}>
                  {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : <span className="font-semibold text-xs">1</span>}
                </div>
                <span className="mt-1 sm:mt-0 sm:ml-1.5 text-[10px] sm:text-xs font-medium text-center">Stages</span>
              </div>
              <div className={`w-8 sm:w-12 h-0.5 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`} />
              <div className={`flex flex-col sm:flex-row items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 text-xs ${step >= 2 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'}`}>
                  {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : <span className="font-semibold text-xs">2</span>}
                </div>
                <span className="mt-1 sm:mt-0 sm:ml-1.5 text-[10px] sm:text-xs font-medium text-center">Sample</span>
              </div>
              <div className={`w-8 sm:w-12 h-0.5 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`} />
              <div className={`flex flex-col sm:flex-row items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 text-xs ${step >= 3 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'}`}>
                  {step > 3 ? <CheckCircle2 className="w-4 h-4" /> : <span className="font-semibold text-xs">3</span>}
                </div>
                <span className="mt-1 sm:mt-0 sm:ml-1.5 text-[10px] sm:text-xs font-medium text-center">Workflow</span>
              </div>
              <div className={`w-8 sm:w-12 h-0.5 ${step >= 4 ? 'bg-primary-600' : 'bg-gray-300'}`} />
              <div className={`flex flex-col sm:flex-row items-center ${step >= 4 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 text-xs ${step >= 4 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'}`}>
                  <span className="font-semibold text-xs">4</span>
                </div>
                <span className="mt-1 sm:mt-0 sm:ml-1.5 text-[10px] sm:text-xs font-medium text-center">Results</span>
              </div>
            </div>
          </div>

          {/* Step 1: Process Stages Selection */}
          {step === 1 && (
            <div id="step-1" tabIndex={-1}>
              <ProcessStagesSelection
                formData={formData}
                onFormDataChange={(data) => setFormData({ ...formData, ...data })}
                onNext={() => handleStepChange(2)}
              />
            </div>
          )}

          {/* Step 2 & 3: Sample Specs and Workflow */}
          {(step === 2 || step === 3) && (
            <div id={`step-${step}`} tabIndex={-1}>
              <BuilderStepInputs
                step={step}
                formData={formData}
                onFormDataChange={setFormData}
                onStepChange={handleStepChange}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </div>
          )}

          {/* Results */}
          {step === 4 && (
            <>
              <BuilderResults 
                recommendations={recommendations} 
                isGenerating={false}
                formData={formData}
                onGetExpertReview={() => setShowExpertReview(true)}
              />
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => setShowExpertReview(true)}
                  className="px-6 py-3 text-sm rounded-full font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Get Expert Review
                </button>
                <button
                  onClick={() => {
                    // Clear sessionStorage
                    if (typeof window !== 'undefined') {
                      try {
                        sessionStorage.removeItem(STORAGE_KEY)
                        sessionStorage.removeItem(STORAGE_STEP_KEY)
                        sessionStorage.removeItem(STORAGE_RECOMMENDATIONS_KEY)
                      } catch (e) {
                        console.error('Error clearing sessionStorage:', e)
                      }
                    }
                    // Reset form data
                    setFormData({
                      processStages: ['sectioning', 'mounting', 'grinding', 'polishing'],
                      materialType: '',
                      materialHardness: '',
                      sampleSize: '',
                      sampleShape: '',
                      applications: [],
                      selectedMaterial: null,
                      throughput: '',
                      automation: '',
                      budget: '',
                      surfaceFinish: '',
                    })
                    setRecommendations([])
                    handleStepChange(1)
                  }}
                  className="px-6 py-3 text-sm rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                >
                  Start Over
                </button>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="fixed top-16 sm:top-20 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg max-w-md mx-auto flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base">Error</p>
                  <p className="text-xs sm:text-sm break-words">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Scroll to top"
            >
              <ArrowLeft className="w-5 h-5 transform rotate-90" />
            </button>
          )}
        </div>
      </div>

      {/* Back Confirmation Dialog */}
      {showBackConfirmation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowBackConfirmation(false)
            }
          }}
        >
          <div 
            role="dialog"
            aria-labelledby="back-confirmation-title"
            aria-modal="true"
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setShowBackConfirmation(false)
              }
            }}
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 id="back-confirmation-title" className="text-lg font-bold text-gray-900">Send Results to Expert?</h3>
            </div>
            
            <div className="px-6 py-6">
              <div className="flex items-start gap-3 mb-6">
                <MessageSquare className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  You're about to leave the results page. Would you like to send your recommendations to one of our experts for review before you go?
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={handleConfirmBack}
                  className="px-4 py-2 text-sm rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                >
                  No, return to homepage
                </button>
                <button
                  onClick={handleSendToExpertBeforeBack}
                  className="px-6 py-2 text-sm rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Yes, Send to Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expert Review Modal */}
      {showExpertReview && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowExpertReview(false)
              setReviewFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                message: '',
              })
            }
          }}
        >
          <div 
            role="dialog"
            aria-labelledby="expert-review-title"
            aria-modal="true"
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setShowExpertReview(false)
                setReviewFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  message: '',
                })
              }
            }}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 id="expert-review-title" className="text-xl font-bold text-gray-900">Get Expert Review</h3>
              <button
                onClick={() => {
                  setShowExpertReview(false)
                  setReviewFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    message: '',
                  })
                }}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close dialog"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="px-6 py-6">
              {!hasFormData() ? (
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-900 mb-2">No Form Data Yet</h4>
                      <p className="text-xs sm:text-sm text-amber-800 mb-3">
                        You haven't filled out the lab builder form yet. We recommend completing the form first to get personalized recommendations, 
                        then requesting an expert review. This will help our team provide more accurate and tailored advice.
                      </p>
                      <p className="text-xs sm:text-sm text-amber-800">
                        However, you can still submit your contact information below if you'd like to speak with an expert right away.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 mb-6">
                  Fill out the form below and we'll generate a pre-filled email with all your lab builder information. 
                  You can review and send it directly to our sales team for expert review.
                </p>
              )}
              
              <form onSubmit={(e) => { e.preventDefault(); window.location.href = generateExpertReviewMailto(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={reviewFormData.name}
                      onChange={(e) => handleReviewFormChange('name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={reviewFormData.email}
                      onChange={(e) => handleReviewFormChange('email', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={reviewFormData.phone}
                      onChange={(e) => handleReviewFormChange('phone', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={reviewFormData.company}
                      onChange={(e) => handleReviewFormChange('company', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      value={reviewFormData.message}
                      onChange={(e) => handleReviewFormChange('message', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="Any specific questions or requirements you'd like to mention..."
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowExpertReview(false)
                      setReviewFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        message: '',
                      })
                    }}
                    className="px-4 py-2 text-sm rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!canSubmitReview()}
                    className={`px-6 py-2 text-sm rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      canSubmitReview()
                        ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Open Email Client
                  </button>
                </div>
              </form>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Clicking "Open Email Client" will open your default email application with a pre-filled message 
                  {hasFormData() 
                    ? ' containing all your lab builder information. You can review and edit the email before sending it to our sales team.'
                    : ' with your contact information. You can add details about your lab build needs in the email before sending it to our sales team.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

