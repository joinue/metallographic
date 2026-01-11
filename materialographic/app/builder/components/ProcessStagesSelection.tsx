'use client'

import { useState } from 'react'
import { ChevronRight, Wrench, Package, FlaskConical, Sparkles, Eye, Droplet, Gauge } from 'lucide-react'

interface ProcessStagesSelectionProps {
  formData: { processStages: string[] }
  onFormDataChange: (data: { processStages: string[] }) => void
  onNext: () => void
}

const processStageOptions = [
  { id: 'sectioning', label: 'Sectioning', description: 'Cutting and sample preparation equipment', icon: Wrench },
  { id: 'mounting', label: 'Mounting', description: 'Sample mounting equipment and materials', icon: Package },
  { id: 'grinding', label: 'Grinding', description: 'Grinding equipment and abrasives', icon: FlaskConical },
  { id: 'polishing', label: 'Polishing', description: 'Polishing equipment and consumables', icon: Sparkles },
  { id: 'etching', label: 'Etching', description: 'Etchants and etching supplies', icon: Droplet },
  { id: 'microscopy', label: 'Microscopy', description: 'Microscopes and imaging equipment', icon: Eye },
  { id: 'cleaning', label: 'Cleaning', description: 'Sample cleaning equipment', icon: FlaskConical },
  { id: 'hardness', label: 'Hardness Testing', description: 'Hardness testing equipment', icon: Gauge },
]

export default function ProcessStagesSelection({
  formData,
  onFormDataChange,
  onNext,
}: ProcessStagesSelectionProps) {
  const [selectedStages, setSelectedStages] = useState<string[]>(formData.processStages || ['sectioning', 'mounting', 'grinding', 'polishing'])

  const toggleStage = (stageId: string) => {
    const newStages = selectedStages.includes(stageId)
      ? selectedStages.filter(id => id !== stageId)
      : [...selectedStages, stageId]
    setSelectedStages(newStages)
    onFormDataChange({ processStages: newStages })
  }

  const selectAll = () => {
    const allStages = processStageOptions.map(opt => opt.id)
    setSelectedStages(allStages)
    onFormDataChange({ processStages: allStages })
  }

  const deselectAll = () => {
    setSelectedStages([])
    onFormDataChange({ processStages: [] })
  }

  const canProceed = selectedStages.length > 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Process Stages Selection</h2>
      <p className="text-sm text-gray-600 mb-6">
        Select which process stages you need equipment recommendations for. You can select one or more stages.
      </p>
      
      <div className="space-y-3 mb-6">
        {processStageOptions.map((option) => {
          const Icon = option.icon
          const isSelected = selectedStages.includes(option.id)
          
          return (
            <label
              key={option.id}
              className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleStage(option.id)}
                className="mt-1 mr-3 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600 focus:ring-2"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                    {option.label}
                  </span>
                </div>
                <p className={`text-xs ${isSelected ? 'text-gray-700' : 'text-gray-500'}`}>
                  {option.description}
                </p>
              </div>
            </label>
          )
        })}
      </div>

      {/* Select All / Deselect All */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={selectAll}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Select All
        </button>
        <button
          type="button"
          onClick={deselectAll}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Deselect All
        </button>
      </div>

      {/* Next Button */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        {!canProceed && (
          <p className="text-xs text-gray-500 flex items-center self-start sm:self-center order-2 sm:order-1">
            Please select at least one process stage to continue
          </p>
        )}
        <button
          onClick={() => {
            if (canProceed) {
              onNext()
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canProceed) {
              e.preventDefault()
              onNext()
            }
          }}
          disabled={!canProceed}
          className={`px-6 py-3 sm:px-4 sm:py-2 text-sm rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] touch-manipulation order-1 sm:order-2 ${
            canProceed
              ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">Next: </span>
          <span>Sample Specifications</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

