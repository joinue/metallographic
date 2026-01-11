'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ArrowLeft, X, Loader2 } from 'lucide-react'
import { getAllMaterials } from '@/lib/supabase'
import type { Material } from '@/lib/supabase'
import { BuilderFormData } from '../hooks/useBuilderRecommendations'
import StageSpecificQuestions from './StageSpecificQuestions'

interface BuilderStepInputsProps {
  step: number
  formData: BuilderFormData
  onFormDataChange: (data: BuilderFormData) => void
  onStepChange: (step: number) => void
  onGenerate: () => void
  isGenerating: boolean
}

const hardnessLevels = [
  'Soft (< 30 HRC)',
  'Medium (30-50 HRC)',
  'Hard (50-65 HRC)',
  'Very Hard (> 65 HRC)',
]

const sampleSizes = [
  'Small (< 25mm)',
  'Medium (25-50mm)',
  'Large (50-100mm)',
  'Very Large (> 100mm)',
]

const throughputOptions = [
  'Low (1-10 samples/day)',
  'Medium (10-50 samples/day)',
  'High (50-200 samples/day)',
  'Very High (> 200 samples/day)',
]

const automationOptions = [
  'Fully Manual',
  'Semi-Automated',
  'Fully Automated',
]

const budgetOptions = [
  { value: 'Essential', label: 'Essential', description: 'Core equipment for basic sample preparation' },
  { value: 'Standard', label: 'Standard', description: 'Balanced setup for routine metallography work' },
  { value: 'Advanced', label: 'Advanced', description: 'Enhanced capabilities for demanding applications' },
  { value: 'Comprehensive', label: 'Comprehensive', description: 'Complete system with full automation and features' },
]

const applicationOptions = [
  'Quality Control',
  'Research & Development',
  'Failure Analysis',
  'Material Characterization',
  'Production Testing',
]


const legacyMaterialTypes = [
  'Steel (Carbon/Low Alloy)',
  'Stainless Steel',
  'Aluminum',
  'Titanium',
  'Copper/Brass',
  'Nickel Alloys',
  'Hard Metals (Carbides)',
  'Ceramics',
  'Other',
]

export default function BuilderStepInputs({
  step,
  formData,
  onFormDataChange,
  onStepChange,
  onGenerate,
  isGenerating,
}: BuilderStepInputsProps) {
  const [materialSelectionMode, setMaterialSelectionMode] = useState<'general' | 'specific'>('general')
  const [materials, setMaterials] = useState<Material[]>([])
  const [materialSearchQuery, setMaterialSearchQuery] = useState('')
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([])
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false)
  const [materialInputFocused, setMaterialInputFocused] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

  // Load materials on mount
  useEffect(() => {
    async function loadMaterials() {
      try {
        const allMaterials = await getAllMaterials()
        setMaterials(allMaterials)
        setFilteredMaterials(allMaterials.slice(0, 20))
      } catch (error) {
        console.error('Error loading materials:', error)
      }
    }
    loadMaterials()
  }, [])

  // Filter materials based on search query
  useEffect(() => {
    if (!materialSearchQuery.trim()) {
      setFilteredMaterials(materials.slice(0, 20))
      return
    }

    const query = materialSearchQuery.toLowerCase().trim()
    const filtered = materials.filter(material => {
      const nameMatch = material.name.toLowerCase().includes(query)
      const categoryMatch = material.category?.toLowerCase().includes(query)
      const altNameMatch = material.alternative_names?.some(alt => 
        alt.toLowerCase().includes(query)
      )
      return nameMatch || categoryMatch || altNameMatch
    })
    setFilteredMaterials(filtered.slice(0, 20))
  }, [materialSearchQuery, materials])

  const handleInputChange = (field: keyof BuilderFormData, value: string | string[]) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    })
  }

  const handleMaterialModeChange = (mode: 'general' | 'specific') => {
    setMaterialSelectionMode(mode)
    if (mode === 'general') {
      onFormDataChange({
        ...formData,
        materialType: '',
        selectedMaterial: null,
      })
      setSelectedMaterial(null)
      setMaterialSearchQuery('')
    }
  }

  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterial(material)
    // Update formData with material info including the full material object
    onFormDataChange({
      ...formData,
      materialType: material.name,
      selectedMaterial: material,
      // Auto-fill hardness if available
      materialHardness: material.hardness_category 
        ? (material.hardness_category === 'soft' ? 'Soft (< 30 HRC)' :
           material.hardness_category === 'medium' ? 'Medium (30-50 HRC)' :
           material.hardness_category === 'hard' ? 'Hard (50-65 HRC)' :
           material.hardness_category === 'very-hard' ? 'Very Hard (> 65 HRC)' : formData.materialHardness)
        : formData.materialHardness,
    })
    setMaterialSearchQuery('')
    setShowMaterialDropdown(false)
  }

  const toggleApplication = (app: string) => {
    const newApplications = formData.applications.includes(app)
      ? formData.applications.filter((a) => a !== app)
      : [...formData.applications, app]
    handleInputChange('applications', newApplications)
  }


  const canProceedToStep3 = () => {
    return formData.materialType && formData.materialHardness && formData.sampleSize
  }

  const canGenerateRecommendations = () => {
    return formData.throughput && formData.automation && formData.budget
  }

  // Step 2: Sample Specifications
  if (step === 2) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Sample Specifications</h2>
        
        <div className="space-y-4">
          {/* Material Selection Mode Toggle */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Material Selection <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex items-center cursor-pointer p-2 -m-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation">
                <input
                  type="radio"
                  name="materialMode"
                  value="general"
                  checked={materialSelectionMode === 'general'}
                  onChange={() => handleMaterialModeChange('general')}
                  className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">General Material Type</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 -m-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation">
                <input
                  type="radio"
                  name="materialMode"
                  value="specific"
                  checked={materialSelectionMode === 'specific'}
                  onChange={() => handleMaterialModeChange('specific')}
                  className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Specific Material</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {materialSelectionMode === 'general' ? 'Material Type' : 'Material'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {materialSelectionMode === 'specific' && materials.length > 0 ? (
                  <>
                    <input
                      type="text"
                      value={formData.materialType || materialSearchQuery}
                      onChange={(e) => {
                        const value = e.target.value
                        setMaterialSearchQuery(value)
                        setShowMaterialDropdown(true)
                        if (!value) {
                          handleInputChange('materialType', '')
                        }
                      }}
                      onFocus={() => {
                        setMaterialInputFocused(true)
                        setShowMaterialDropdown(true)
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          setMaterialInputFocused(false)
                          setShowMaterialDropdown(false)
                        }, 200)
                      }}
                      placeholder="Search materials..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                    />
                    {formData.materialType && (
                      <button
                        type="button"
                        onClick={() => {
                          onFormDataChange({
                            ...formData,
                            materialType: '',
                            selectedMaterial: null,
                          })
                          setSelectedMaterial(null)
                          setMaterialSearchQuery('')
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear selection"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    
                    {(showMaterialDropdown || materialInputFocused) && filteredMaterials.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {filteredMaterials.map((material) => (
                          <button
                            key={material.id}
                            type="button"
                            onClick={() => handleMaterialSelect(material)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-primary-50 focus:bg-primary-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{material.name}</div>
                            {material.category && (
                              <div className="text-xs text-gray-500 mt-0.5">{material.category}</div>
                            )}
                            {material.hardness_category && (
                              <div className="text-xs text-primary-600 mt-0.5">
                                Hardness: {material.hardness_category}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <select
                    value={formData.materialType}
                    onChange={(e) => {
                      onFormDataChange({
                        ...formData,
                        materialType: e.target.value,
                        selectedMaterial: null, // Clear selected material when using general type
                      })
                    }}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors ${
                      !formData.materialType ? 'border-gray-300' : 'border-green-300 bg-green-50'
                    }`}
                  >
                    <option value="">Select material type...</option>
                    {legacyMaterialTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {selectedMaterial && materialSelectionMode === 'specific' && (
                <div className="mt-2 text-xs text-gray-600">
                  {selectedMaterial.hardness_hrc && (
                    <span className="inline-block mr-3">
                      HRC: {selectedMaterial.hardness_hrc}
                    </span>
                  )}
                  {selectedMaterial.composition && (
                    <span className="text-gray-500">
                      {selectedMaterial.composition}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Material Hardness <span className="text-red-500">*</span>
                {selectedMaterial && materialSelectionMode === 'specific' && formData.materialHardness && (
                  <span className="ml-2 text-xs text-primary-600 font-normal">(Auto-filled from material)</span>
                )}
              </label>
              <select
                value={formData.materialHardness}
                onChange={(e) => handleInputChange('materialHardness', e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors ${
                  selectedMaterial && materialSelectionMode === 'specific' && formData.materialHardness
                    ? 'bg-primary-50 border-primary-200'
                    : !formData.materialHardness
                    ? 'border-gray-300'
                    : 'border-green-300 bg-green-50'
                }`}
              >
                <option value="">Select hardness level...</option>
                {hardnessLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Sample Size <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sampleSize}
                onChange={(e) => handleInputChange('sampleSize', e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors ${
                  !formData.sampleSize ? 'border-gray-300' : 'border-green-300 bg-green-50'
                }`}
              >
                <option value="">Select sample size...</option>
                {sampleSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Sample Shape
              </label>
              <select
                value={formData.sampleShape}
                onChange={(e) => handleInputChange('sampleShape', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              >
                <option value="">Select sample shape...</option>
                <option value="Regular">Regular (Rectangular/Cylindrical)</option>
                <option value="Irregular">Irregular/Complex</option>
                <option value="Thin">Thin Section</option>
                <option value="Small">Small/Delicate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Primary Applications
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {applicationOptions.map((app) => (
                <label key={app} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.applications.includes(app)}
                    onChange={() => toggleApplication(app)}
                    className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-primary-600 border-gray-300 rounded focus:ring-primary-600 touch-manipulation"
                  />
                  <span className="text-xs text-gray-700">{app}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => {
              onStepChange(1)
              setTimeout(() => {
                const step1Element = document.getElementById('step-1')
                if (step1Element) {
                  step1Element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }, 100)
            }}
            className="px-6 py-3 sm:px-4 sm:py-2 text-sm rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-95 order-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          {!canProceedToStep3() && (
            <p className="text-xs text-gray-500 flex items-center self-start sm:self-center order-2 sm:order-1">
              Please complete all required fields to continue
            </p>
          )}
          <button
            onClick={() => {
              if (canProceedToStep3()) {
                onStepChange(3)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canProceedToStep3()) {
                e.preventDefault()
                onStepChange(3)
              }
            }}
            disabled={!canProceedToStep3()}
            className={`px-6 py-3 sm:px-4 sm:py-2 text-sm rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] touch-manipulation order-1 sm:order-2 ${
              canProceedToStep3()
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="hidden sm:inline">Next: </span>
            <span>Workflow Requirements</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    )
  }

  // Step 3: Workflow Requirements + Stage-Specific Questions
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Workflow Requirements</h2>
      
      <div className="space-y-6">
        {/* General Workflow Requirements */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">General Workflow</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Daily Throughput <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.throughput}
                onChange={(e) => handleInputChange('throughput', e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors ${
                  !formData.throughput ? 'border-gray-300' : 'border-green-300 bg-green-50'
                }`}
              >
                <option value="">Select throughput level...</option>
                {throughputOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Automation Level <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.automation}
                onChange={(e) => handleInputChange('automation', e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors ${
                  !formData.automation ? 'border-gray-300' : 'border-green-300 bg-green-50'
                }`}
              >
                <option value="">Select automation level...</option>
                {automationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Equipment Tier <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Select the capability level that matches your needs
              </p>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors ${
                  !formData.budget ? 'border-gray-300' : 'border-green-300 bg-green-50'
                }`}
              >
                <option value="">Select equipment tier...</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value} title={option.description}>
                    {option.label} - {option.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Required Surface Finish
              </label>
              <select
                value={formData.surfaceFinish}
                onChange={(e) => handleInputChange('surfaceFinish', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              >
                <option value="">Standard (General metallography)</option>
                <option value="High Quality">High Quality (Research, failure analysis)</option>
                <option value="Extremely Flat">Extremely Flat (EBSD, advanced characterization)</option>
                <option value="EBSD">EBSD Preparation</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select based on your analysis needs. EBSD and advanced techniques require extremely flat, deformation-free surfaces.
              </p>
            </div>
          </div>
        </div>

        {/* Stage-Specific Questions */}
        <div className="border-t border-gray-200 pt-6">
          <StageSpecificQuestions
            formData={formData}
            onFormDataChange={onFormDataChange}
            selectedStages={formData.processStages}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={() => {
            onStepChange(2)
            setTimeout(() => {
              const step2Element = document.getElementById('step-2')
              if (step2Element) {
                step2Element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }, 100)
          }}
          className="px-6 py-3 sm:px-4 sm:py-2 text-sm rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-95 order-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        {!canGenerateRecommendations() && (
          <p className="text-xs text-gray-500 flex items-center justify-center text-center px-2 order-2">
            Please complete all required fields
          </p>
        )}
          <button
            onClick={onGenerate}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canGenerateRecommendations()) {
                e.preventDefault()
                onGenerate()
              }
            }}
            disabled={!canGenerateRecommendations() || isGenerating}
          className={`px-6 py-3 sm:px-4 sm:py-2 text-sm rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] touch-manipulation order-3 ${
            canGenerateRecommendations() && !isGenerating
              ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">Generating Recommendations...</span>
              <span className="sm:hidden">Generating...</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Generate Recommendations</span>
              <span className="sm:hidden">Generate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

