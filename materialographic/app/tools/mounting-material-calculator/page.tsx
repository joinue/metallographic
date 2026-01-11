'use client'

import { useState } from 'react'
import Link from 'next/link'

type MountingType = 'compression' | 'castable'
type MoldSize = '1' | '1.25' | '1.5' | '2' | 'custom'

const standardMolds: Record<MoldSize, { diameter: number; height: number }> = {
  '1': { diameter: 25.4, height: 19.05 }, // 1 inch = 25.4mm, typical height ~19mm
  '1.25': { diameter: 31.75, height: 19.05 }, // 1.25 inch = 31.75mm
  '1.5': { diameter: 38.1, height: 19.05 }, // 1.5 inch = 38.1mm
  '2': { diameter: 50.8, height: 19.05 }, // 2 inch = 50.8mm
  'custom': { diameter: 0, height: 0 },
}

export default function MountingMaterialCalculator() {
  const [mountingType, setMountingType] = useState<MountingType>('compression')
  const [moldSize, setMoldSize] = useState<MoldSize>('1.25')
  const [customDiameter, setCustomDiameter] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [sampleLength, setSampleLength] = useState('')
  const [sampleWidth, setSampleWidth] = useState('')
  const [sampleHeight, setSampleHeight] = useState('')
  const [result, setResult] = useState<{
    moldVolume: number
    sampleVolume: number
    materialNeeded: number
    materialNeededOz: number
    materialNeededGrams: number
  } | null>(null)

  const calculateVolume = () => {
    const mold = moldSize === 'custom' 
      ? { 
          diameter: parseFloat(customDiameter) || 0, 
          height: parseFloat(customHeight) || 0 
        }
      : standardMolds[moldSize]

    if (mold.diameter <= 0 || mold.height <= 0) {
      setResult(null)
      return
    }

    // Mold volume (cylinder): V = π * r² * h
    const moldRadius = mold.diameter / 2 // in mm
    const moldVolume = Math.PI * Math.pow(moldRadius, 2) * mold.height // mm³

    // Sample volume (assuming rectangular prism)
    const length = parseFloat(sampleLength) || 0
    const width = parseFloat(sampleWidth) || 0
    const height = parseFloat(sampleHeight) || 0
    
    // If sample dimensions not provided, assume minimal sample (5% of mold volume)
    const sampleVolume = (length > 0 && width > 0 && height > 0)
      ? length * width * height // mm³
      : moldVolume * 0.05 // Estimate 5% if not provided

    // Material needed = mold volume - sample volume
    // Add 10% safety margin for compression mounting, 15% for castable (more shrinkage)
    const safetyMargin = mountingType === 'compression' ? 1.1 : 1.15
    const materialNeeded = (moldVolume - sampleVolume) * safetyMargin

    // Convert to useful units
    // 1 cm³ = 1 ml
    // 1 ml ≈ 1 g for most resins (density ~1 g/cm³)
    // 1 fl oz = 29.5735 ml
    const materialNeededCm3 = materialNeeded / 1000 // Convert mm³ to cm³
    const materialNeededOz = materialNeededCm3 / 29.5735
    const materialNeededGrams = materialNeededCm3 // Approximate, assuming density ~1 g/cm³

    setResult({
      moldVolume,
      sampleVolume,
      materialNeeded: materialNeededCm3,
      materialNeededOz,
      materialNeededGrams,
    })
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div>
          <h1 className="text-4xl font-bold mb-4">Mounting Material Calculator</h1>
          <p className="text-xl text-gray-600 mb-8">
            Calculate the amount of mounting material (resin) needed for compression or castable mounting 
            based on your sample and mold dimensions. This helps reduce waste and ensures you have enough material.
          </p>

          <div className="card mb-8">
            <div className="mb-6">
              <label htmlFor="mountingType" className="block text-sm font-semibold text-gray-700 mb-2">
                Mounting Type
              </label>
              <select
                id="mountingType"
                value={mountingType}
                onChange={(e) => {
                  setMountingType(e.target.value as MountingType)
                  setResult(null)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="compression">Compression Mounting</option>
                <option value="castable">Castable Mounting</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {mountingType === 'compression' 
                  ? 'Uses resin pellets. Includes 10% safety margin for material loss.'
                  : 'Uses liquid resin. Includes 15% safety margin for shrinkage and material loss.'}
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="moldSize" className="block text-sm font-semibold text-gray-700 mb-2">
                Mold Size
              </label>
              <select
                id="moldSize"
                value={moldSize}
                onChange={(e) => {
                  setMoldSize(e.target.value as MoldSize)
                  setResult(null)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="1">1 inch (25.4 mm)</option>
                <option value="1.25">1.25 inch (31.75 mm)</option>
                <option value="1.5">1.5 inch (38.1 mm)</option>
                <option value="2">2 inch (50.8 mm)</option>
                <option value="custom">Custom Size</option>
              </select>
            </div>

            {moldSize === 'custom' && (
              <>
                <div className="mb-6">
                  <label htmlFor="customDiameter" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mold Diameter (mm)
                  </label>
                  <input
                    id="customDiameter"
                    type="number"
                    step="0.1"
                    min="0"
                    value={customDiameter}
                    onChange={(e) => {
                      setCustomDiameter(e.target.value)
                      setResult(null)
                    }}
                    placeholder="e.g., 31.75"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="customHeight" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mold Height (mm)
                  </label>
                  <input
                    id="customHeight"
                    type="number"
                    step="0.1"
                    min="0"
                    value={customHeight}
                    onChange={(e) => {
                      setCustomHeight(e.target.value)
                      setResult(null)
                    }}
                    placeholder="e.g., 19.05"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sample Dimensions (mm) - Optional
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Enter sample dimensions for more accurate calculation. If left blank, will estimate based on 5% of mold volume.
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={calculateVolume}
              className="btn-primary w-full"
            >
              Calculate Material Needed
            </button>
          </div>

          {result && (
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Material Requirements</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-primary-50 border-l-4 border-primary-600 rounded">
                  <div className="text-sm text-gray-600 mb-1">Material Needed (with safety margin)</div>
                  <div className="text-3xl font-bold text-primary-700 mb-2">
                    {result.materialNeededOz.toFixed(2)} fl oz
                  </div>
                  <div className="text-sm text-gray-600">
                    ({result.materialNeededGrams.toFixed(1)} g or {result.materialNeeded.toFixed(1)} ml)
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600 mb-1">Mold Volume</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {(result.moldVolume / 1000).toFixed(2)} cm³
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600 mb-1">Sample Volume</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {(result.sampleVolume / 1000).toFixed(2)} cm³
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> This calculation includes a safety margin to account for material loss 
                    and {mountingType === 'castable' ? 'shrinkage during curing' : 'handling during compression'}. 
                    Actual requirements may vary based on sample geometry and mounting technique.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">About Mounting Material Calculation</h3>
            <p className="text-gray-700 text-sm mb-4">
              The amount of mounting material needed depends on:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside mb-4">
              <li><strong>Mold size:</strong> Standard molds are 1", 1.25", 1.5", or 2" diameter</li>
              <li><strong>Sample size:</strong> Larger samples require less mounting material</li>
              <li><strong>Mounting type:</strong> Castable mounting may require more material due to shrinkage</li>
              <li><strong>Safety margin:</strong> Extra material accounts for handling loss and ensures complete filling</li>
            </ul>
            <p className="text-gray-700 text-sm">
              <strong>Tip:</strong> For compression mounting, resin pellets are typically sold by weight. 
              For castable mounting, liquid resins are sold by volume. This calculator provides both units.
            </p>
          </div>

          <div className="mt-6 bg-primary-600 text-white rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Shop Mounting Materials</h3>
            <p className="text-primary-100 text-sm mb-4">
              Purchase compression and castable mounting resins from PACE Technologies.
            </p>
            <a
              href="https://shop.metallographic.com/collections/mounting"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 inline-block text-sm shadow-lg hover:shadow-xl hover:scale-105"
            >
              Shop Mounting Materials →
            </a>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Learn more about mounting methods and best practices in our comprehensive guide.
            </p>
            <Link href="/guides/mounting" className="text-primary-600 font-semibold hover:underline">
              View Mounting Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

