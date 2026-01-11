'use client'

import { useState } from 'react'
import Link from 'next/link'

type MaterialType = 'hard' | 'soft' | 'work-hardening' | 'multi-phase'
type GritSize = '9' | '6' | '3' | '1' | '0.5' | '0.25' | '0.05'

interface PolishingData {
  timeRange: { min: number; max: number }
  clothType: string
  pressure: string
  notes: string[]
}

const polishingData: Record<MaterialType, Record<GritSize, PolishingData>> = {
  hard: {
    '9': {
      timeRange: { min: 4, max: 6 },
      clothType: 'CERMESH or TEXPAN',
      pressure: 'Moderate to high (5-10 lbs)',
      notes: [
        'Hard materials can tolerate longer polishing times',
        'Use polycrystalline diamond for aggressive cutting',
        'Monitor for complete scratch removal'
      ]
    },
    '6': {
      timeRange: { min: 3, max: 5 },
      clothType: 'POLYPAD or TEXPAN',
      pressure: 'Moderate to high (5-10 lbs)',
      notes: [
        'Continue until previous scratches are removed',
        'May require longer time if previous step was insufficient'
      ]
    },
    '3': {
      timeRange: { min: 3, max: 5 },
      clothType: 'TEXPAN or Black CHEM 2',
      pressure: 'Moderate (5-8 lbs)',
      notes: [
        'Critical step for removing coarser scratches',
        'Ensure uniform scratch pattern before proceeding'
      ]
    },
    '1': {
      timeRange: { min: 2, max: 4 },
      clothType: 'GOLD PAD or ATLANTIS',
      pressure: 'Moderate (4-7 lbs)',
      notes: [
        'Fine diamond polishing stage',
        'Monitor for relief around inclusions'
      ]
    },
    '0.5': {
      timeRange: { min: 2, max: 3 },
      clothType: 'ATLANTIS or MICROPAD',
      pressure: 'Light to moderate (3-6 lbs)',
      notes: [
        'Pre-final polishing stage',
        'Shorter time to avoid over-polishing'
      ]
    },
    '0.25': {
      timeRange: { min: 1, max: 2 },
      clothType: 'MICROPAD or TRICOTE',
      pressure: 'Light (2-4 lbs)',
      notes: [
        'Fine polishing before final oxide step',
        'Monitor carefully for surface quality'
      ]
    },
    '0.05': {
      timeRange: { min: 1, max: 2 },
      clothType: 'MICROPAD or MOLTEC 2',
      pressure: 'Very light (1-3 lbs)',
      notes: [
        'Final polishing with colloidal silica or alumina',
        'Short time to achieve mirror finish without relief'
      ]
    }
  },
  soft: {
    '9': {
      timeRange: { min: 2, max: 4 },
      clothType: 'TEXPAN or Black CHEM 2',
      pressure: 'Light to moderate (3-6 lbs)',
      notes: [
        'Soft materials require shorter times to avoid over-polishing',
        'Use monocrystalline diamond for gentler cutting',
        'Monitor carefully for smearing'
      ]
    },
    '6': {
      timeRange: { min: 2, max: 3 },
      clothType: 'DACRON II or NYPAD',
      pressure: 'Light to moderate (3-6 lbs)',
      notes: [
        'Shorter times prevent deformation',
        'Check frequently for scratch removal'
      ]
    },
    '3': {
      timeRange: { min: 2, max: 3 },
      clothType: 'DACRON II or Black CHEM 2',
      pressure: 'Light (3-5 lbs)',
      notes: [
        'Gentle polishing to avoid deformation',
        'May need multiple short sessions'
      ]
    },
    '1': {
      timeRange: { min: 1, max: 2 },
      clothType: 'GOLD PAD or ATLANTIS',
      pressure: 'Light (2-4 lbs)',
      notes: [
        'Very gentle polishing required',
        'Monitor for smearing or deformation'
      ]
    },
    '0.5': {
      timeRange: { min: 1, max: 2 },
      clothType: 'MICROPAD or NAPPAD',
      pressure: 'Very light (2-3 lbs)',
      notes: [
        'Minimal time to avoid over-polishing',
        'Check surface quality frequently'
      ]
    },
    '0.25': {
      timeRange: { min: 1, max: 1.5 },
      clothType: 'NAPPAD or MICROPAD',
      pressure: 'Very light (1-3 lbs)',
      notes: [
        'Brief polishing before final step',
        'Avoid excessive material removal'
      ]
    },
    '0.05': {
      timeRange: { min: 0.5, max: 1 },
      clothType: 'NAPPAD or MOLTEC 2',
      pressure: 'Very light (1-2 lbs)',
      notes: [
        'Short final polish to achieve finish',
        'Over-polishing can introduce artifacts'
      ]
    }
  },
  'work-hardening': {
    '9': {
      timeRange: { min: 3, max: 5 },
      clothType: 'TEXPAN or POLYPAD',
      pressure: 'Moderate (4-7 lbs)',
      notes: [
        'Consistent, moderate pressure is key',
        'Avoid excessive time to prevent work-hardening',
        'Progress systematically through grits'
      ]
    },
    '6': {
      timeRange: { min: 3, max: 4 },
      clothType: 'TEXPAN or Black CHEM 2',
      pressure: 'Moderate (4-7 lbs)',
      notes: [
        'Maintain consistent technique',
        'Don\'t over-polish at any stage'
      ]
    },
    '3': {
      timeRange: { min: 3, max: 5 },
      clothType: 'Black CHEM 2 or GOLD PAD',
      pressure: 'Moderate (4-7 lbs)',
      notes: [
        'Critical intermediate step',
        'Ensure complete scratch removal'
      ]
    },
    '1': {
      timeRange: { min: 2, max: 3 },
      clothType: 'GOLD PAD or ATLANTIS',
      pressure: 'Moderate (3-6 lbs)',
      notes: [
        'Fine polishing stage',
        'Monitor for deformation'
      ]
    },
    '0.5': {
      timeRange: { min: 1, max: 2 },
      clothType: 'ATLANTIS or MICROPAD',
      pressure: 'Light to moderate (3-5 lbs)',
      notes: [
        'Pre-final stage',
        'Consider vibratory polishing for final step'
      ]
    },
    '0.25': {
      timeRange: { min: 1, max: 2 },
      clothType: 'MICROPAD or TRICOTE',
      pressure: 'Light (2-4 lbs)',
      notes: [
        'Fine polishing before final oxide',
        'Avoid excessive time'
      ]
    },
    '0.05': {
      timeRange: { min: 1, max: 2 },
      clothType: 'MICROPAD or MOLTEC 2',
      pressure: 'Light (2-3 lbs)',
      notes: [
        'Final polish with colloidal silica',
        'Consider vibratory polishing for best results'
      ]
    }
  },
  'multi-phase': {
    '9': {
      timeRange: { min: 3, max: 4 },
      clothType: 'TEXPAN or Black CHEM 2',
      pressure: 'Moderate (4-7 lbs)',
      notes: [
        'Use softer cloths to minimize relief',
        'Shorter times prevent over-polishing',
        'Monitor for relief around different phases'
      ]
    },
    '6': {
      timeRange: { min: 2, max: 3 },
      clothType: 'DACRON II or Black CHEM 2',
      pressure: 'Moderate (4-6 lbs)',
      notes: [
        'Balance between scratch removal and relief',
        'Check for phase contrast'
      ]
    },
    '3': {
      timeRange: { min: 2, max: 4 },
      clothType: 'Black CHEM 2 or GOLD PAD',
      pressure: 'Moderate (3-6 lbs)',
      notes: [
        'Important for removing scratches',
        'Watch for relief development'
      ]
    },
    '1': {
      timeRange: { min: 1, max: 3 },
      clothType: 'GOLD PAD or ATLANTIS',
      pressure: 'Light to moderate (3-5 lbs)',
      notes: [
        'Fine polishing with minimal relief',
        'Monitor phase boundaries carefully'
      ]
    },
    '0.5': {
      timeRange: { min: 1, max: 2 },
      clothType: 'ATLANTIS or MICROPAD',
      pressure: 'Light (2-4 lbs)',
      notes: [
        'Gentle polishing to minimize relief',
        'Short time to prevent over-polishing'
      ]
    },
    '0.25': {
      timeRange: { min: 1, max: 1.5 },
      clothType: 'MICROPAD or TRICOTE',
      pressure: 'Light (2-3 lbs)',
      notes: [
        'Fine polishing before final step',
        'Minimize relief around phases'
      ]
    },
    '0.05': {
      timeRange: { min: 1, max: 2 },
      clothType: 'MICROPAD or MOLTEC 2',
      pressure: 'Very light (1-3 lbs)',
      notes: [
        'Final polish with minimal relief',
        'May require specialized techniques for some materials'
      ]
    }
  }
}

const materialExamples: Record<MaterialType, string[]> = {
  hard: ['Hardened Steels', 'Tool Steels', 'Ceramics', 'Titanium Alloys', 'Hardened Cast Iron'],
  soft: ['Aluminum', 'Copper', 'Lead', 'Tin', 'Soft Brass', 'Pure Metals'],
  'work-hardening': ['Stainless Steel', 'Nickel Alloys', 'Austenitic Steels', 'Work-Hardened Materials'],
  'multi-phase': ['Cast Iron', 'Duplex Stainless Steel', 'Multi-Phase Alloys', 'Materials with Inclusions']
}

export default function PolishingTimeCalculator() {
  const [materialType, setMaterialType] = useState<MaterialType | ''>('')
  const [gritSize, setGritSize] = useState<GritSize | ''>('')
  const [result, setResult] = useState<PolishingData | null>(null)

  const handleCalculate = () => {
    if (materialType && gritSize) {
      setResult(polishingData[materialType][gritSize])
    }
  }

  const formatTime = (minutes: number): string => {
    if (minutes < 1) {
      return `${Math.round(minutes * 60)} seconds`
    } else if (minutes === Math.floor(minutes)) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`
    } else {
      const wholeMinutes = Math.floor(minutes)
      const seconds = Math.round((minutes - wholeMinutes) * 60)
      return `${wholeMinutes} min ${seconds} sec`
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Description */}
            <div>
              <h1 className="text-4xl font-bold mb-4">Polishing Time Calculator</h1>
              <p className="text-xl text-gray-600 mb-4">
                Calculate optimal polishing times for each step in your polishing sequence. These times are for polishing with a specific grit size 
                after the sample has been prepared through previous grinding and polishing steps.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> These times are for <strong>one polishing step</strong> in a sequence (e.g., polishing with 3 μm diamond 
                  after completing 9 μm and 6 μm steps). The sample should already be polished through coarser grits before using these recommendations.
                </p>
              </div>
            </div>

            {/* Right Column - Calculator */}
            <div>
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
              <label htmlFor="gritSize" className="block text-sm font-semibold text-gray-700 mb-2">
                Grit/Abrasive Size
              </label>
              <select
                id="gritSize"
                value={gritSize}
                onChange={(e) => {
                  setGritSize(e.target.value as GritSize)
                  setResult(null)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select grit size...</option>
                <option value="9">9 μm (Coarse Diamond)</option>
                <option value="6">6 μm (Diamond)</option>
                <option value="3">3 μm (Fine Diamond)</option>
                <option value="1">1 μm (Very Fine Diamond)</option>
                <option value="0.5">0.5 μm (Ultra Fine Diamond)</option>
                <option value="0.25">0.25 μm (Ultra Fine Diamond)</option>
                <option value="0.05">0.05 μm (Colloidal Silica/Alumina)</option>
              </select>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!materialType || !gritSize}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Polishing Time
            </button>
              </div>
            </div>
          </div>

          {/* Results Section - Full Width */}
          {result && (
            <>
              <div className="mt-8 card">
                <h2 className="text-2xl font-semibold mb-4">Recommended Polishing Parameters</h2>
                
                {/* User Selection Display */}
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Material Type</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {materialType === 'hard' && 'Hard Materials'}
                        {materialType === 'soft' && 'Soft Materials'}
                        {materialType === 'work-hardening' && 'Work-Hardening Materials'}
                        {materialType === 'multi-phase' && 'Multi-Phase Materials'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Grit/Abrasive Size</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {gritSize === '9' && '9 μm (Coarse Diamond)'}
                        {gritSize === '6' && '6 μm (Diamond)'}
                        {gritSize === '3' && '3 μm (Fine Diamond)'}
                        {gritSize === '1' && '1 μm (Very Fine Diamond)'}
                        {gritSize === '0.5' && '0.5 μm (Ultra Fine Diamond)'}
                        {gritSize === '0.25' && '0.25 μm (Ultra Fine Diamond)'}
                        {gritSize === '0.05' && '0.05 μm (Colloidal Silica/Alumina)'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-primary-50 border-l-4 border-primary-600 rounded">
                  <div className="text-sm text-gray-600 mb-1">Polishing Time (for this step)</div>
                  <div className="text-3xl font-bold text-primary-700">
                    {formatTime(result.timeRange.min)} - {formatTime(result.timeRange.max)}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    ({result.timeRange.min} - {result.timeRange.max} minutes per step)
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">Cloth Type</div>
                    <div className="text-gray-900">{result.clothType}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">Pressure</div>
                    <div className="text-gray-900">{result.pressure}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">Important Notes</div>
                    <ul className="list-disc list-inside space-y-1">
                      {result.notes.map((note, index) => (
                        <li key={index} className="text-gray-700">{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-primary-600 text-white rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Shop Polishing Consumables</h3>
                <p className="text-primary-100 text-sm mb-4">
                  Purchase the recommended polishing pads, diamond abrasives, and final polishing suspensions from PACE Technologies.
                </p>
                <a
                  href="https://shop.metallographic.com/collections/polishing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary-600 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 inline-block text-sm shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Shop Polishing Products →
                </a>
              </div>
            </>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">About Polishing Times</h3>
            <p className="text-gray-700 text-sm mb-4">
              Polishing times are guidelines based on typical metallographic preparation procedures. 
              Actual times may vary depending on:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Sample size and geometry</li>
              <li>Polishing equipment and speed</li>
              <li>Condition of polishing cloth and abrasive</li>
              <li>Operator technique and experience</li>
              <li>Quality of previous preparation steps</li>
            </ul>
            <p className="text-gray-700 text-sm mt-4">
              <strong>Remember:</strong> These times are for individual polishing steps in a sequence. A complete polishing procedure typically 
              involves multiple steps progressing from coarse to fine abrasives (e.g., 9 μm → 6 μm → 3 μm → 1 μm → 0.05 μm). Each step should 
              remove scratches from the previous step before proceeding to the next finer grit.
            </p>
            <p className="text-gray-700 text-sm mt-4">
              Always monitor the sample surface during polishing and adjust times as needed. 
              The goal is complete removal of previous scratches while avoiding over-polishing.
            </p>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive guides on polishing methods and material-specific preparation techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/guides/polishing-methods" className="text-primary-600 font-semibold hover:underline">
                View Polishing Methods Guide →
              </Link>
              <Link href="/guides/stainless-steel-preparation" className="text-primary-600 font-semibold hover:underline">
                View Material-Specific Guide →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

