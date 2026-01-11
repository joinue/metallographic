'use client'

import { useState } from 'react'
import Link from 'next/link'

type MaterialType = 'hard' | 'soft' | 'work-hardening' | 'multi-phase'

const grindingSteps = [
  { grit: '120', time: { min: 30, max: 60 } },
  { grit: '240', time: { min: 30, max: 60 } },
  { grit: '320', time: { min: 30, max: 60 } },
  { grit: '400', time: { min: 30, max: 60 } },
  { grit: '600', time: { min: 30, max: 60 } },
  { grit: '800', time: { min: 30, max: 60 }, optional: true },
  { grit: '1200', time: { min: 30, max: 60 }, optional: true },
]

const polishingSteps = {
  hard: [
    { grit: '9', time: { min: 4, max: 6 } },
    { grit: '6', time: { min: 3, max: 5 } },
    { grit: '3', time: { min: 3, max: 5 } },
    { grit: '1', time: { min: 2, max: 4 } },
    { grit: '0.5', time: { min: 2, max: 3 } },
    { grit: '0.25', time: { min: 1, max: 2 } },
    { grit: '0.05', time: { min: 1, max: 2 } },
  ],
  soft: [
    { grit: '6', time: { min: 2, max: 4 } },
    { grit: '3', time: { min: 2, max: 3 } },
    { grit: '1', time: { min: 1, max: 2 } },
    { grit: '0.5', time: { min: 1, max: 2 } },
    { grit: '0.25', time: { min: 1, max: 1.5 } },
    { grit: '0.05', time: { min: 0.5, max: 1 } },
  ],
  'work-hardening': [
    { grit: '9', time: { min: 3, max: 5 } },
    { grit: '6', time: { min: 3, max: 4 } },
    { grit: '3', time: { min: 3, max: 5 } },
    { grit: '1', time: { min: 2, max: 3 } },
    { grit: '0.5', time: { min: 1, max: 2 } },
    { grit: '0.25', time: { min: 1, max: 2 } },
    { grit: '0.05', time: { min: 1, max: 2 } },
  ],
  'multi-phase': [
    { grit: '9', time: { min: 3, max: 4 } },
    { grit: '6', time: { min: 2, max: 3 } },
    { grit: '3', time: { min: 2, max: 4 } },
    { grit: '1', time: { min: 1, max: 3 } },
    { grit: '0.5', time: { min: 1, max: 2 } },
    { grit: '0.25', time: { min: 1, max: 1.5 } },
    { grit: '0.05', time: { min: 1, max: 2 } },
  ],
}

const materialExamples: Record<MaterialType, string[]> = {
  hard: ['Hardened Steels', 'Tool Steels', 'Ceramics', 'Titanium Alloys', 'Hardened Cast Iron'],
  soft: ['Aluminum', 'Copper', 'Lead', 'Tin', 'Soft Brass', 'Pure Metals'],
  'work-hardening': ['Stainless Steel', 'Nickel Alloys', 'Austenitic Steels', 'Work-Hardened Materials'],
  'multi-phase': ['Cast Iron', 'Duplex Stainless Steel', 'Multi-Phase Alloys', 'Materials with Inclusions'],
}

export default function ProcedureTimeEstimator() {
  const [materialType, setMaterialType] = useState<MaterialType | ''>('')
  const [includeMounting, setIncludeMounting] = useState(false)
  const [includeEtching, setIncludeEtching] = useState(false)
  const [includeCleaning, setIncludeCleaning] = useState(true)
  const [grindingStartGrit, setGrindingStartGrit] = useState('120')
  const [includeOptionalGrinding, setIncludeOptionalGrinding] = useState(false)
  const [result, setResult] = useState<{
    grinding: { min: number; max: number }
    polishing: { min: number; max: number }
    mounting: number
    etching: number
    cleaning: number
    total: { min: number; max: number }
    breakdown: Array<{ step: string; time: string }>
  } | null>(null)

  const formatTime = (minutes: number): string => {
    if (minutes < 1) {
      return `${Math.round(minutes * 60)} sec`
    } else if (minutes === Math.floor(minutes)) {
      return `${minutes} min`
    } else {
      const wholeMinutes = Math.floor(minutes)
      const seconds = Math.round((minutes - wholeMinutes) * 60)
      return `${wholeMinutes}m ${seconds}s`
    }
  }

  const formatTimeRange = (min: number, max: number): string => {
    return `${formatTime(min)} - ${formatTime(max)}`
  }

  const calculateTime = () => {
    if (!materialType) {
      setResult(null)
      return
    }

    const breakdown: Array<{ step: string; time: string }> = []

    // Grinding time
    const startIndex = grindingSteps.findIndex(s => s.grit === grindingStartGrit)
    const selectedGrindingSteps = grindingSteps.slice(startIndex)
      .filter(s => !s.optional || includeOptionalGrinding)
    
    let grindingMin = 0
    let grindingMax = 0
    selectedGrindingSteps.forEach(step => {
      grindingMin += step.time.min
      grindingMax += step.time.max
      breakdown.push({
        step: `Grinding ${step.grit} grit`,
        time: formatTimeRange(step.time.min, step.time.max),
      })
    })

    // Polishing time
    const polishingSequence = polishingSteps[materialType]
    let polishingMin = 0
    let polishingMax = 0
    polishingSequence.forEach(step => {
      polishingMin += step.time.min
      polishingMax += step.time.max
      breakdown.push({
        step: `Polishing ${step.grit} μm`,
        time: formatTimeRange(step.time.min, step.time.max),
      })
    })

    // Mounting time (5-15 minutes for compression, 30 min to several hours for castable)
    const mountingTime = includeMounting ? 10 : 0 // Average 10 minutes for compression
    if (includeMounting) {
      breakdown.push({
        step: 'Mounting (compression)',
        time: '5-15 min',
      })
    }

    // Etching time (typically 5-30 seconds, plus setup)
    const etchingTime = includeEtching ? 2 : 0 // 2 minutes including setup and cleaning
    if (includeEtching) {
      breakdown.push({
        step: 'Etching',
        time: '1-3 min',
      })
    }

    // Cleaning time (between steps and final)
    const cleaningTime = includeCleaning ? 5 : 0 // 5 minutes total for all cleaning steps
    if (includeCleaning) {
      breakdown.push({
        step: 'Cleaning (between steps)',
        time: '3-7 min',
      })
    }

    const totalMin = grindingMin + polishingMin + mountingTime + etchingTime + cleaningTime
    const totalMax = grindingMax + polishingMax + mountingTime + etchingTime + cleaningTime

    setResult({
      grinding: { min: grindingMin, max: grindingMax },
      polishing: { min: polishingMin, max: polishingMax },
      mounting: mountingTime,
      etching: etchingTime,
      cleaning: cleaningTime,
      total: { min: totalMin, max: totalMax },
      breakdown,
    })
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div>
          <h1 className="text-4xl font-bold mb-4">Total Procedure Time Estimator</h1>
          <p className="text-xl text-gray-600 mb-8">
            Estimate the total time required for complete metallographic sample preparation, including 
            grinding, polishing, mounting, etching, and cleaning steps. Use this to plan your workflow 
            and schedule sample preparation work.
          </p>

          <div className="card mb-8">
            <div className="mb-6">
              <label htmlFor="materialType" className="block text-sm font-semibold text-gray-700 mb-2">
                Material Type
              </label>
              <select
                id="materialType"
                value={materialType}
                onChange={(e) => {
                  setMaterialType(e.target.value as MaterialType)
                  setResult(null)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select material type...</option>
                <option value="hard">Hard Materials</option>
                <option value="soft">Soft Materials</option>
                <option value="work-hardening">Work-Hardening Materials</option>
                <option value="multi-phase">Multi-Phase Materials</option>
              </select>
              {materialType && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Examples:</strong> {materialExamples[materialType].join(', ')}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="grindingStartGrit" className="block text-sm font-semibold text-gray-700 mb-2">
                Starting Grinding Grit
              </label>
              <select
                id="grindingStartGrit"
                value={grindingStartGrit}
                onChange={(e) => {
                  setGrindingStartGrit(e.target.value)
                  setResult(null)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="120">120 grit (coarse, for heavy damage)</option>
                <option value="240">240 grit (medium, for moderate damage)</option>
                <option value="320">320 grit (fine, for light damage)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeOptionalGrinding}
                  onChange={(e) => {
                    setIncludeOptionalGrinding(e.target.checked)
                    setResult(null)
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Include optional fine grinding steps (800, 1200 grit)</span>
              </label>
            </div>

            <div className="mb-6 space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeMounting}
                  onChange={(e) => {
                    setIncludeMounting(e.target.checked)
                    setResult(null)
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Include mounting time (compression mounting: 5-15 min)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeEtching}
                  onChange={(e) => {
                    setIncludeEtching(e.target.checked)
                    setResult(null)
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Include etching time (1-3 min including setup)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeCleaning}
                  onChange={(e) => {
                    setIncludeCleaning(e.target.checked)
                    setResult(null)
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Include cleaning time between steps (3-7 min total)</span>
              </label>
            </div>

            <button
              onClick={calculateTime}
              disabled={!materialType}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Estimate Total Time
            </button>
          </div>

          {result && (
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Time Estimate</h2>
              
              <div className="mb-6 p-4 bg-primary-50 border-l-4 border-primary-600 rounded">
                <div className="text-sm text-gray-600 mb-1">Total Estimated Time</div>
                <div className="text-3xl font-bold text-primary-700">
                  {formatTimeRange(result.total.min, result.total.max)}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  ({result.total.min.toFixed(1)} - {result.total.max.toFixed(1)} minutes)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">Grinding</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatTimeRange(result.grinding.min, result.grinding.max)}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">Polishing</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatTimeRange(result.polishing.min, result.polishing.max)}
                  </div>
                </div>
                {result.mounting > 0 && (
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600 mb-1">Mounting</div>
                    <div className="text-lg font-semibold text-gray-900">~{formatTime(result.mounting)}</div>
                  </div>
                )}
                {result.etching > 0 && (
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600 mb-1">Etching</div>
                    <div className="text-lg font-semibold text-gray-900">~{formatTime(result.etching)}</div>
                  </div>
                )}
                {result.cleaning > 0 && (
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600 mb-1">Cleaning</div>
                    <div className="text-lg font-semibold text-gray-900">~{formatTime(result.cleaning)}</div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Time Breakdown by Step</h3>
                <div className="space-y-2">
                  {result.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-700">{item.step}</span>
                      <span className="text-gray-900 font-semibold">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> These are estimates based on typical preparation procedures. Actual times 
                  may vary based on sample size, operator experience, equipment condition, and material-specific 
                  requirements. Times are for individual steps in sequence - the sample should be prepared through 
                  previous steps before using these estimates.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">About Time Estimates</h3>
            <p className="text-gray-700 text-sm mb-4">
              Total procedure time depends on several factors:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside mb-4">
              <li><strong>Material type:</strong> Hard materials may require longer polishing times</li>
              <li><strong>Starting condition:</strong> Samples with heavy sectioning damage need more grinding</li>
              <li><strong>Optional steps:</strong> Fine grinding (800, 1200 grit) adds time but may improve results</li>
              <li><strong>Mounting:</strong> Compression mounting (5-15 min) is faster than castable (30 min to hours)</li>
              <li><strong>Operator experience:</strong> Experienced operators may work faster</li>
              <li><strong>Equipment:</strong> Automated systems can reduce manual time</li>
            </ul>
            <p className="text-gray-700 text-sm">
              <strong>Tip:</strong> Use the <Link href="/tools/polishing-time-calculator" className="text-primary-600 hover:underline">Polishing Time Calculator</Link> for 
              detailed polishing step times, and the <Link href="/tools/grit-size-converter" className="text-primary-600 hover:underline">Grit Size Converter</Link> to 
              convert between grit standards.
            </p>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive guides on sample preparation techniques and material-specific procedures.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/guides/grinding-techniques" className="text-primary-600 font-semibold hover:underline">
                View Grinding Techniques →
              </Link>
              <Link href="/guides/polishing-methods" className="text-primary-600 font-semibold hover:underline">
                View Polishing Methods →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

