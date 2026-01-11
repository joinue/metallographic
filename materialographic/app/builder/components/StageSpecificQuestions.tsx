'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { BuilderFormData } from '../hooks/useBuilderRecommendations'

interface StageSpecificQuestionsProps {
  formData: BuilderFormData
  onFormDataChange: (data: BuilderFormData) => void
  selectedStages: string[]
}

// Helper function to determine default mount size based on sample size
function getDefaultMountSize(sampleSize: string): string {
  if (!sampleSize) return 'Standard (25-32mm)'
  
  if (sampleSize.includes('Small')) {
    return 'Small (< 25mm)'
  } else if (sampleSize.includes('Large') || sampleSize.includes('Very Large')) {
    return 'Large (> 32mm)'
  } else {
    // Medium samples default to Standard
    return 'Standard (25-32mm)'
  }
}

export default function StageSpecificQuestions({
  formData,
  onFormDataChange,
  selectedStages,
}: StageSpecificQuestionsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleInputChange = (field: keyof BuilderFormData, value: string | string[]) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Advanced Options (Optional)</h3>
      <p className="text-sm text-gray-600 mb-4">
        These optional questions help refine recommendations for specific stages. All fields have sensible defaults.
      </p>

      {/* Sectioning Questions */}
      {selectedStages.includes('sectioning') && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('sectioning')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold text-sm text-gray-900">Sectioning Options</span>
            {expandedSections.sectioning ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.sectioning && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Section Type
                </label>
                <select
                  value={formData.sectionType || 'Cross-section'}
                  onChange={(e) => handleInputChange('sectionType', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Cross-section">Cross-section (through entire sample)</option>
                  <option value="Surface">Surface section (near surface/edge)</option>
                  <option value="Specific feature">Specific feature (through defect, weld zone, etc.)</option>
                  <option value="Variable">Variable/Depends on application</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Damage Criticality
                </label>
                <select
                  value={formData.damageCriticality || 'Standard'}
                  onChange={(e) => handleInputChange('damageCriticality', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Standard">Standard - Some damage acceptable, can be ground/polished away</option>
                  <option value="High">High - Minimal damage critical (e.g., EBSD, thin layers, brittle materials)</option>
                  <option value="Very High">Very High - Zero damage required (research, failure analysis)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mounting Questions */}
      {selectedStages.includes('mounting') && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('mounting')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold text-sm text-gray-900">Mounting Options</span>
            {expandedSections.mounting ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.mounting && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mounting Type Preference
                </label>
                <select
                  value={formData.mountingTypePreference || 'Compression'}
                  onChange={(e) => handleInputChange('mountingTypePreference', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Compression">Compression mounting</option>
                  <option value="Castable">Castable mounting</option>
                  <option value="Both">Both</option>
                  <option value="Variable">Variable/Depends on sample</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Compression:</strong> Faster, better for routine work and hard materials. Standard for most metallography.
                  <br />
                  <strong>Castable:</strong> Better for delicate samples, porous materials, temperature-sensitive samples, and complex shapes.
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mount Size Requirements
                </label>
                <select
                  value={formData.mountSizeRequirements || getDefaultMountSize(formData.sampleSize)}
                  onChange={(e) => handleInputChange('mountSizeRequirements', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Standard (25-32mm)">Standard (25-32mm)</option>
                  <option value="Small (< 25mm)">Small (&lt; 25mm)</option>
                  <option value="Large (> 32mm)">Large (&gt; 32mm)</option>
                  <option value="Variable">Variable</option>
                </select>
                {!formData.mountSizeRequirements && (
                  <p className="text-xs text-gray-500 mt-1">
                    Default based on your sample size ({formData.sampleSize || 'not specified'})
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grinding Questions */}
      {selectedStages.includes('grinding') && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('grinding')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold text-sm text-gray-900">Grinding Options</span>
            {expandedSections.grinding ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.grinding && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Grinding Surface Requirements
                </label>
                <select
                  value={formData.grindingSurfaceRequirements || 'Standard flat'}
                  onChange={(e) => handleInputChange('grindingSurfaceRequirements', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Standard flat">Standard flat surface</option>
                  <option value="Preserve features">Preserve specific features</option>
                  <option value="Minimal deformation">Minimal deformation critical</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Polishing Questions */}
      {selectedStages.includes('polishing') && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('polishing')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold text-sm text-gray-900">Polishing Options</span>
            {expandedSections.polishing ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.polishing && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Final Surface Quality
                </label>
                <select
                  value={formData.finalSurfaceQuality || 'Standard mirror'}
                  onChange={(e) => handleInputChange('finalSurfaceQuality', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Standard mirror">Standard mirror finish</option>
                  <option value="EBSD-ready">EBSD-ready (extremely flat)</option>
                  <option value="Research-grade">Research-grade (zero artifacts)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Etching Questions */}
      {selectedStages.includes('etching') && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('etching')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold text-sm text-gray-900">Etching Options</span>
            {expandedSections.etching ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.etching && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Etching Frequency
                </label>
                <select
                  value={formData.etchingFrequency || 'Occasional'}
                  onChange={(e) => handleInputChange('etchingFrequency', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Occasional">Occasional</option>
                  <option value="Regular">Regular</option>
                  <option value="High frequency">High frequency</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Microscopy Questions */}
      {selectedStages.includes('microscopy') && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('microscopy')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold text-sm text-gray-900">Microscopy Options</span>
            {expandedSections.microscopy ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.microscopy && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Documentation Requirements
                </label>
                <select
                  value={formData.documentationRequirements || 'Basic'}
                  onChange={(e) => handleInputChange('documentationRequirements', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Basic">Basic documentation</option>
                  <option value="High-resolution">High-resolution imaging</option>
                  <option value="Automated capture">Automated image capture</option>
                  <option value="Variable">Variable</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cleaning Questions */}
      {selectedStages.includes('cleaning') && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('cleaning')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold text-sm text-gray-900">Cleaning Options</span>
            {expandedSections.cleaning ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.cleaning && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Cleaning Frequency
                </label>
                <select
                  value={formData.cleaningFrequency || 'Occasional'}
                  onChange={(e) => handleInputChange('cleaningFrequency', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Occasional">Occasional</option>
                  <option value="Regular">Regular</option>
                  <option value="High frequency">High frequency</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Cleaning Method Preference
                </label>
                <select
                  value={formData.cleaningMethodPreference || 'Ultrasonic'}
                  onChange={(e) => handleInputChange('cleaningMethodPreference', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Ultrasonic">Ultrasonic cleaning</option>
                  <option value="Manual">Manual cleaning</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hardness Testing Questions */}
      {selectedStages.includes('hardness') && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('hardness')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold text-sm text-gray-900">Hardness Testing Options</span>
            {expandedSections.hardness ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.hardness && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Hardness Testing Frequency
                </label>
                <select
                  value={formData.hardnessTestingFrequency || 'Occasional'}
                  onChange={(e) => handleInputChange('hardnessTestingFrequency', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="Occasional">Occasional</option>
                  <option value="Regular">Regular</option>
                  <option value="High frequency">High frequency</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

