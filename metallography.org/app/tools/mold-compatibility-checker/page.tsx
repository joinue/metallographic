'use client'

import { useState } from 'react'
import Link from 'next/link'

type MoldSize = '1' | '1.25' | '1.5' | '2'

const standardMolds: Record<MoldSize, { diameter: number; height: number; name: string }> = {
  '1': { diameter: 25.4, height: 19.05, name: '1 inch (25.4 mm)' },
  '1.25': { diameter: 31.75, height: 19.05, name: '1.25 inch (31.75 mm)' },
  '1.5': { diameter: 38.1, height: 19.05, name: '1.5 inch (38.1 mm)' },
  '2': { diameter: 50.8, height: 19.05, name: '2 inch (50.8 mm)' },
}

export default function MoldCompatibilityChecker() {
  const [sampleLength, setSampleLength] = useState('')
  const [sampleWidth, setSampleWidth] = useState('')
  const [sampleHeight, setSampleHeight] = useState('')
  const [result, setResult] = useState<{
    fits: Array<{ size: MoldSize; mold: typeof standardMolds[MoldSize]; fits: boolean; clearance: number }>
    recommended: MoldSize | null
    sampleDiagonal: number
  } | null>(null)

  const checkCompatibility = () => {
    const length = parseFloat(sampleLength)
    const width = parseFloat(sampleWidth)
    const height = parseFloat(sampleHeight)

    if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) {
      setResult(null)
      return
    }

    // Calculate sample diagonal (largest cross-section)
    const sampleDiagonal = Math.sqrt(length * length + width * width)
    
    // Check each mold size
    const fits: Array<{ size: MoldSize; mold: typeof standardMolds[MoldSize]; fits: boolean; clearance: number }> = []
    let recommended: MoldSize | null = null

    ;(['1', '1.25', '1.5', '2'] as MoldSize[]).forEach(size => {
      const mold = standardMolds[size]
      
      // Sample fits if:
      // 1. Diagonal fits in diameter (with 2mm clearance on each side = 4mm total)
      // 2. Height fits in mold height (with 2mm clearance on each side = 4mm total)
      const diameterClearance = mold.diameter - sampleDiagonal - 4
      const heightClearance = mold.height - height - 4
      const fitsMold = diameterClearance >= 0 && heightClearance >= 0
      const minClearance = Math.min(diameterClearance, heightClearance)

      fits.push({
        size,
        mold,
        fits: fitsMold,
        clearance: minClearance,
      })

      // Recommend smallest mold that fits
      if (fitsMold && !recommended) {
        recommended = size
      }
    })

    setResult({
      fits,
      recommended,
      sampleDiagonal,
    })
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div>
          <h1 className="text-4xl font-bold mb-4">Sample Size/Mold Compatibility Checker</h1>
          <p className="text-xl text-gray-600 mb-8">
            Check if your sample fits in standard mounting molds and get recommendations for the appropriate 
            mold size. This helps ensure proper mounting and prevents material waste.
          </p>

          <div className="card mb-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sample Dimensions (mm)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Enter the length, width, and height of your sample. The tool will check if it fits in standard molds 
                with appropriate clearance (2mm on each side).
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="sampleLength" className="block text-xs text-gray-600 mb-1">
                    Length
                  </label>
                  <input
                    id="sampleLength"
                    type="number"
                    step="0.1"
                    min="0"
                    value={sampleLength}
                    onChange={(e) => {
                      setSampleLength(e.target.value)
                      setResult(null)
                    }}
                    placeholder="Length"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="sampleWidth" className="block text-xs text-gray-600 mb-1">
                    Width
                  </label>
                  <input
                    id="sampleWidth"
                    type="number"
                    step="0.1"
                    min="0"
                    value={sampleWidth}
                    onChange={(e) => {
                      setSampleWidth(e.target.value)
                      setResult(null)
                    }}
                    placeholder="Width"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="sampleHeight" className="block text-xs text-gray-600 mb-1">
                    Height
                  </label>
                  <input
                    id="sampleHeight"
                    type="number"
                    step="0.1"
                    min="0"
                    value={sampleHeight}
                    onChange={(e) => {
                      setSampleHeight(e.target.value)
                      setResult(null)
                    }}
                    placeholder="Height"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={checkCompatibility}
              disabled={!sampleLength || !sampleWidth || !sampleHeight}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Compatibility
            </button>
          </div>

          {result && (
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Compatibility Results</h2>
              
              {result.recommended && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-600 rounded">
                  <div className="text-sm text-gray-600 mb-1">Recommended Mold Size</div>
                  <div className="text-2xl font-bold text-green-700">
                    {standardMolds[result.recommended].name}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Minimum clearance: {result.fits.find(f => f.size === result.recommended)?.clearance.toFixed(1)} mm
                  </div>
                </div>
              )}

              {!result.recommended && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded">
                  <div className="text-sm font-semibold text-red-700 mb-1">Sample Too Large</div>
                  <div className="text-sm text-gray-700">
                    Your sample (diagonal: {result.sampleDiagonal.toFixed(1)} mm, height: {parseFloat(sampleHeight).toFixed(1)} mm) 
                    does not fit in standard molds. Consider:
                  </div>
                  <ul className="text-sm text-gray-700 mt-2 list-disc list-inside">
                    <li>Using a larger custom mold</li>
                    <li>Sectioning the sample to a smaller size</li>
                    <li>Using castable mounting with a custom mold</li>
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3">Compatibility by Mold Size</h3>
                <div className="space-y-3">
                  {result.fits.map((item) => (
                    <div
                      key={item.size}
                      className={`p-4 rounded-lg border-2 ${
                        item.fits
                          ? 'bg-green-50 border-green-300'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">
                            {item.mold.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            Diameter: {item.mold.diameter} mm, Height: {item.mold.height} mm
                          </div>
                        </div>
                        <div className="text-right">
                          {item.fits ? (
                            <>
                              <div className="text-green-700 font-semibold mb-1">✓ Fits</div>
                              <div className="text-xs text-gray-600">
                                Clearance: {item.clearance.toFixed(1)} mm
                              </div>
                            </>
                          ) : (
                            <div className="text-red-700 font-semibold">✗ Too Small</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Clearance requirements (2mm on each side) ensure proper mounting material 
                  flow and prevent edge issues. For irregularly shaped samples, use the largest cross-sectional 
                  dimension as the diagonal measurement.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">About Mold Compatibility</h3>
            <p className="text-gray-700 text-sm mb-4">
              Standard mounting molds come in several sizes:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside mb-4">
              <li><strong>1 inch (25.4 mm):</strong> Smallest standard size, for small samples</li>
              <li><strong>1.25 inch (31.75 mm):</strong> Most common size, good for medium samples</li>
              <li><strong>1.5 inch (38.1 mm):</strong> For larger samples</li>
              <li><strong>2 inch (50.8 mm):</strong> Largest standard size, for very large samples</li>
            </ul>
            <p className="text-gray-700 text-sm mb-4">
              <strong>Clearance requirements:</strong> Samples need adequate clearance (typically 2mm on each side) 
              to ensure:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Proper flow of mounting material around the sample</li>
              <li>Sufficient material thickness for edge retention</li>
              <li>Prevention of voids and defects</li>
              <li>Easier handling during grinding and polishing</li>
            </ul>
          </div>

          <div className="mt-6 bg-primary-600 text-white rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Shop Mounting Equipment</h3>
            <p className="text-primary-100 text-sm mb-4">
              Purchase mounting presses and molds from PACE Technologies.
            </p>
            <a
              href="https://metallographic.com/metallographic-equipment/compression-mounting.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 inline-block text-sm shadow-lg hover:shadow-xl hover:scale-105"
            >
              Shop Mounting Equipment →
            </a>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Learn more about mounting methods and selecting appropriate mold sizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/guides/mounting" className="text-primary-600 font-semibold hover:underline">
                View Mounting Guide →
              </Link>
              <Link href="/tools/mounting-material-calculator" className="text-primary-600 font-semibold hover:underline">
                Calculate Material Needed →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

