'use client'

import { useState } from 'react'
import Link from 'next/link'

type CalculationMethod = 'number-to-diameter' | 'diameter-to-number' | 'intercept' | 'planimetric'

export default function GrainSizeCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('number-to-diameter')
  const [grainSizeNumber, setGrainSizeNumber] = useState('')
  const [averageDiameter, setAverageDiameter] = useState('')
  const [interceptCount, setInterceptCount] = useState('')
  const [interceptLength, setInterceptLength] = useState('')
  const [grainCount, setGrainCount] = useState('')
  const [testArea, setTestArea] = useState('')
  const [magnification, setMagnification] = useState('100')
  const [result, setResult] = useState<{ label: string; value: string }[] | null>(null)

  // ASTM E112: N = 2^(G-1) where N = grains per square inch at 100x, G = grain size number
  // Average grain diameter (mm) = 1 / (2^((G-1)/2)) at 100x
  // At other magnifications: d = d_100 * (100/M)
  
  const calculateFromNumber = () => {
    const G = parseFloat(grainSizeNumber)
    if (isNaN(G) || G < 0 || G > 14) {
      setResult([{ label: 'Error', value: 'Grain size number must be between 0 and 14' }])
      return
    }

    const M = parseFloat(magnification) || 100
    const N = Math.pow(2, G - 1) // Grains per square inch at 100x
    const d_100 = 1 / Math.pow(2, (G - 1) / 2) // Average diameter in mm at 100x
    const d_M = d_100 * (100 / M) // Average diameter at magnification M
    
    setResult([
      { label: 'ASTM Grain Size Number (G)', value: G.toFixed(1) },
      { label: 'Grains per square inch at 100x', value: N.toFixed(0) },
      { label: 'Average grain diameter at 100x', value: `${d_100.toFixed(3)} mm` },
      { label: `Average grain diameter at ${M}x`, value: `${d_M.toFixed(3)} mm` },
      { label: `Average grain diameter at ${M}x`, value: `${(d_M * 1000).toFixed(1)} μm` },
    ])
  }

  const calculateFromDiameter = () => {
    const d = parseFloat(averageDiameter)
    const M = parseFloat(magnification) || 100
    
    if (isNaN(d) || d <= 0) {
      setResult([{ label: 'Error', value: 'Diameter must be greater than 0' }])
      return
    }

    // Convert to mm if needed (assuming input is in mm, but could be μm)
    const d_mm = d < 0.1 ? d / 1000 : d // If less than 0.1, assume it's in mm already, else assume μm
    const d_100 = d_mm * (M / 100) // Convert to diameter at 100x
    
    // Solve for G: d_100 = 1 / (2^((G-1)/2))
    // 2^((G-1)/2) = 1 / d_100
    // (G-1)/2 = log2(1 / d_100)
    // G = 2 * log2(1 / d_100) + 1
    const G = 2 * (Math.log(1 / d_100) / Math.LN2) + 1
    const N = Math.pow(2, G - 1)
    
    if (G < 0 || G > 14) {
      setResult([{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }])
      return
    }
    
    setResult([
      { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
      { label: 'Grains per square inch at 100x', value: N.toFixed(0) },
      { label: 'Average grain diameter at 100x', value: `${d_100.toFixed(3)} mm` },
    ])
  }

  const calculateFromIntercept = () => {
    const count = parseFloat(interceptCount)
    const length = parseFloat(interceptLength)
    const M = parseFloat(magnification) || 100
    
    if (isNaN(count) || isNaN(length) || count <= 0 || length <= 0) {
      setResult([{ label: 'Error', value: 'Intercept count and length must be greater than 0' }])
      return
    }

    // Mean intercept length at test magnification
    const L_M = length / count // mm at magnification M
    const L_100 = L_M * (100 / M) // Convert to 100x
    
    // ASTM E112: G = -3.2877 + 6.6439 * log10(L_100) where L_100 is in mm
    // Or: G ≈ -3.3 + 6.64 * log10(L_100)
    const G = -3.2877 + 6.6439 * Math.log10(L_100)
    const N = Math.pow(2, G - 1)
    
    if (G < 0 || G > 14) {
      setResult([{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }])
      return
    }
    
    setResult([
      { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
      { label: 'Mean intercept length at 100x', value: `${L_100.toFixed(3)} mm` },
      { label: 'Grains per square inch at 100x', value: N.toFixed(0) },
    ])
  }

  const calculateFromPlanimetric = () => {
    const count = parseFloat(grainCount)
    const area = parseFloat(testArea)
    const M = parseFloat(magnification) || 100
    
    if (isNaN(count) || isNaN(area) || count <= 0 || area <= 0) {
      setResult([{ label: 'Error', value: 'Grain count and test area must be greater than 0' }])
      return
    }

    // Convert area to square inches at 100x
    // If area is in mm², convert: 1 in² = 645.16 mm²
    // Area at 100x = area_at_M * (100/M)²
    const area_mm2 = area // Assuming input is in mm²
    const area_100x = area_mm2 * Math.pow(100 / M, 2) // mm² at 100x
    const area_in2_100x = area_100x / 645.16 // in² at 100x
    
    // Grains per square inch at 100x
    const N = count / area_in2_100x
    
    // G = log2(N) + 1
    const G = Math.log2(N) + 1
    
    if (G < 0 || G > 14) {
      setResult([{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }])
      return
    }
    
    const avgDiameter_100x = 1 / Math.pow(2, (G - 1) / 2)
    
    setResult([
      { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
      { label: 'Grains per square inch at 100x', value: N.toFixed(0) },
      { label: 'Average grain diameter at 100x', value: `${avgDiameter_100x.toFixed(3)} mm` },
    ])
  }

  const handleCalculate = () => {
    setResult(null)
    if (method === 'number-to-diameter') {
      calculateFromNumber()
    } else if (method === 'diameter-to-number') {
      calculateFromDiameter()
    } else if (method === 'intercept') {
      calculateFromIntercept()
    } else if (method === 'planimetric') {
      calculateFromPlanimetric()
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div>
          <h1 className="text-4xl font-bold mb-4">Grain Size Calculator</h1>
          <p className="text-xl text-gray-600 mb-8">
            Calculate ASTM grain size numbers and convert between different grain size measurements 
            using ASTM E112 standard methods. Grain size significantly affects material properties 
            including strength, toughness, and ductility.
          </p>

          <div className="card mb-8">
            <div className="mb-6">
              <label htmlFor="method" className="block text-sm font-semibold text-gray-700 mb-2">
                Calculation Method
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value as CalculationMethod)
                  setResult(null)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="number-to-diameter">Grain Size Number → Average Diameter</option>
                <option value="diameter-to-number">Average Diameter → Grain Size Number</option>
                <option value="intercept">Intercept Method (from measurements)</option>
                <option value="planimetric">Planimetric Method (from grain count)</option>
              </select>
            </div>

            {method === 'number-to-diameter' && (
              <>
                <div className="mb-6">
                  <label htmlFor="grainSizeNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    ASTM Grain Size Number (G)
                  </label>
                  <input
                    id="grainSizeNumber"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={grainSizeNumber}
                    onChange={(e) => setGrainSizeNumber(e.target.value)}
                    placeholder="e.g., 5.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: 0 to 14 (ASTM E112)</p>
                </div>
                <div className="mb-6">
                  <label htmlFor="magnification" className="block text-sm font-semibold text-gray-700 mb-2">
                    Magnification
                  </label>
                  <input
                    id="magnification"
                    type="number"
                    value={magnification}
                    onChange={(e) => setMagnification(e.target.value)}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Magnification used for measurement (default: 100x)</p>
                </div>
              </>
            )}

            {method === 'diameter-to-number' && (
              <>
                <div className="mb-6">
                  <label htmlFor="averageDiameter" className="block text-sm font-semibold text-gray-700 mb-2">
                    Average Grain Diameter
                  </label>
                  <input
                    id="averageDiameter"
                    type="number"
                    step="0.001"
                    min="0"
                    value={averageDiameter}
                    onChange={(e) => setAverageDiameter(e.target.value)}
                    placeholder="e.g., 0.050 (mm) or 50 (μm)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter in mm or μm (values &lt; 0.1 are treated as mm, else μm)</p>
                </div>
                <div className="mb-6">
                  <label htmlFor="magnification" className="block text-sm font-semibold text-gray-700 mb-2">
                    Magnification
                  </label>
                  <input
                    id="magnification"
                    type="number"
                    value={magnification}
                    onChange={(e) => setMagnification(e.target.value)}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Magnification at which diameter was measured</p>
                </div>
              </>
            )}

            {method === 'intercept' && (
              <>
                <div className="mb-6">
                  <label htmlFor="interceptCount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Intercepts
                  </label>
                  <input
                    id="interceptCount"
                    type="number"
                    min="1"
                    value={interceptCount}
                    onChange={(e) => setInterceptCount(e.target.value)}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total number of grain boundary intercepts counted</p>
                </div>
                <div className="mb-6">
                  <label htmlFor="interceptLength" className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Intercept Length (mm)
                  </label>
                  <input
                    id="interceptLength"
                    type="number"
                    step="0.01"
                    min="0"
                    value={interceptLength}
                    onChange={(e) => setInterceptLength(e.target.value)}
                    placeholder="e.g., 25.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total length of test line(s) in mm at test magnification</p>
                </div>
                <div className="mb-6">
                  <label htmlFor="magnification" className="block text-sm font-semibold text-gray-700 mb-2">
                    Magnification
                  </label>
                  <input
                    id="magnification"
                    type="number"
                    value={magnification}
                    onChange={(e) => setMagnification(e.target.value)}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Magnification used for intercept measurement</p>
                </div>
              </>
            )}

            {method === 'planimetric' && (
              <>
                <div className="mb-6">
                  <label htmlFor="grainCount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Grains Counted
                  </label>
                  <input
                    id="grainCount"
                    type="number"
                    min="1"
                    value={grainCount}
                    onChange={(e) => setGrainCount(e.target.value)}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total number of grains counted in test area</p>
                </div>
                <div className="mb-6">
                  <label htmlFor="testArea" className="block text-sm font-semibold text-gray-700 mb-2">
                    Test Area (mm²)
                  </label>
                  <input
                    id="testArea"
                    type="number"
                    step="0.01"
                    min="0"
                    value={testArea}
                    onChange={(e) => setTestArea(e.target.value)}
                    placeholder="e.g., 0.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Area of test region in mm² at test magnification</p>
                </div>
                <div className="mb-6">
                  <label htmlFor="magnification" className="block text-sm font-semibold text-gray-700 mb-2">
                    Magnification
                  </label>
                  <input
                    id="magnification"
                    type="number"
                    value={magnification}
                    onChange={(e) => setMagnification(e.target.value)}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Magnification used for grain counting</p>
                </div>
              </>
            )}

            <button
              onClick={handleCalculate}
              className="btn-primary w-full"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Results</h2>
              <div className="space-y-3">
                {result.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-gray-700 font-medium">{item.label}</span>
                    <span className="text-lg font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">About Grain Size Measurement</h3>
            <p className="text-gray-700 text-sm mb-4">
              Grain size is a critical microstructural parameter that affects material properties. 
              ASTM E112 provides standardized methods for determining average grain size:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside mb-4">
              <li><strong>ASTM Grain Size Number (G):</strong> Logarithmic scale where G = log₂(N) + 1, where N is grains per square inch at 100x</li>
              <li><strong>Intercept Method:</strong> Count grain boundary intercepts along test lines</li>
              <li><strong>Planimetric Method:</strong> Count grains within a known test area</li>
              <li><strong>Comparison Method:</strong> Compare microstructure to standard charts</li>
            </ul>
            <p className="text-gray-700 text-sm">
              <strong>Note:</strong> This calculator uses formulas from ASTM E112. For official grain size 
              determination, follow the complete ASTM E112 standard procedures.
            </p>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Learn more about microstructural analysis and grain size measurement in our guides.
            </p>
            <Link href="/guides/microstructural-analysis" className="text-primary-600 font-semibold hover:underline">
              View Microstructural Analysis Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

