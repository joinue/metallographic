'use client'

import { useState } from 'react'

export default function GritSizeConverter() {
  const [inputValue, setInputValue] = useState('')
  const [inputType, setInputType] = useState('fepa')
  const [results, setResults] = useState<Record<string, string | null>>({})

  const conversions = [
    { fepa: 'P12', ansi: '16', jis: '16', micron: '1815' },
    { fepa: 'P16', ansi: '20', jis: '20', micron: '1324' },
    { fepa: 'P20', ansi: '24', jis: '24', micron: '1000' },
    { fepa: 'P24', ansi: '30', jis: '30', micron: '764' },
    { fepa: 'P30', ansi: '36', jis: '36', micron: '642' },
    { fepa: 'P36', ansi: '40', jis: '40', micron: '538' },
    { fepa: 'P40', ansi: '50', jis: '50', micron: '425' },
    { fepa: 'P50', ansi: '60', jis: '60', micron: '336' },
    { fepa: 'P60', ansi: '80', jis: '80', micron: '269' },
    { fepa: 'P80', ansi: '100', jis: '100', micron: '201' },
    { fepa: 'P100', ansi: '120', jis: '120', micron: '162' },
    { fepa: 'P120', ansi: '150', jis: '150', micron: '125' },
    { fepa: 'P150', ansi: '180', jis: '180', micron: '100' },
    { fepa: 'P180', ansi: '220', jis: '220', micron: '82' },
    { fepa: 'P220', ansi: '240', jis: '240', micron: '68' },
    { fepa: 'P240', ansi: '280', jis: '280', micron: '58.5' },
    { fepa: 'P280', ansi: '320', jis: '320', micron: '52.2' },
    { fepa: 'P320', ansi: '360', jis: '360', micron: '46.2' },
    { fepa: 'P360', ansi: '400', jis: '400', micron: '40.5' },
    { fepa: 'P400', ansi: '500', jis: '500', micron: '35.0' },
    { fepa: 'P500', ansi: '600', jis: '600', micron: '30.2' },
    { fepa: 'P600', ansi: '800', jis: '800', micron: '25.8' },
    { fepa: 'P800', ansi: '1000', jis: '1000', micron: '21.8' },
    { fepa: 'P1000', ansi: '1200', jis: '1200', micron: '18.3' },
    { fepa: 'P1200', ansi: '1500', jis: '1500', micron: '15.3' },
    { fepa: 'P1500', ansi: '2000', jis: '2000', micron: '12.6' },
    { fepa: 'P2000', ansi: '2500', jis: '2500', micron: '10.3' },
    { fepa: 'P2500', ansi: '3000', jis: '3000', micron: '8.4' },
  ]

  const handleConvert = () => {
    const value = inputValue.trim().toUpperCase()
    if (!value) return

    let match: typeof conversions[0] | undefined

    if (inputType === 'fepa') {
      // Handle FEPA with or without P prefix
      const fepaValue = value.startsWith('P') ? value : `P${value}`
      match = conversions.find(c => c.fepa === fepaValue)
    } else if (inputType === 'ansi') {
      match = conversions.find(c => c.ansi === value)
    } else if (inputType === 'jis') {
      match = conversions.find(c => c.jis === value)
    } else if (inputType === 'micron') {
      // Find closest match for micron (allowing some tolerance)
      const micronValue = parseFloat(value)
      if (!isNaN(micronValue)) {
        match = conversions.find(c => {
          const cMicron = parseFloat(c.micron)
          // Allow 5% tolerance for matching
          return Math.abs(cMicron - micronValue) / cMicron < 0.05
        })
      }
    }

    if (match) {
      setResults({
        fepa: match.fepa,
        ansi: match.ansi,
        jis: match.jis,
        micron: `${match.micron} μm`,
      })
    } else {
      setResults({
        fepa: 'Not found',
        ansi: 'Not found',
        jis: 'Not found',
        micron: 'Not found',
      })
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div>
          <h1 className="text-4xl font-bold mb-4">Grit Size Converter</h1>
          <p className="text-xl text-gray-600 mb-8">
            Convert between different grit size standards: FEPA, ANSI, JIS, and micron measurements.
          </p>

          <div className="card mb-8">
            <div className="mb-6">
              <label htmlFor="inputType" className="block text-sm font-semibold text-gray-700 mb-2">
                Input Type
              </label>
              <select
                id="inputType"
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="fepa">FEPA (P-Grade)</option>
                <option value="ansi">ANSI</option>
                <option value="jis">JIS</option>
                <option value="micron">Micron (μm)</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="inputValue" className="block text-sm font-semibold text-gray-700 mb-2">
                Value
              </label>
              <input
                id="inputValue"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputType === 'micron' ? 'e.g., 125' : inputType === 'fepa' ? 'e.g., P120 or 120' : 'e.g., 150'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              onClick={handleConvert}
              className="btn-primary w-full"
            >
              Convert
            </button>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Conversion Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">FEPA</div>
                  <div className="text-lg font-semibold">{results.fepa}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">ANSI</div>
                  <div className="text-lg font-semibold">{results.ansi}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">JIS</div>
                  <div className="text-lg font-semibold">{results.jis}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Micron</div>
                  <div className="text-lg font-semibold">{results.micron}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">About Grit Sizes</h3>
            <p className="text-gray-700 text-sm mb-4">
              Different standards use different numbering systems for abrasive grit sizes. 
              This converter helps you find equivalent sizes across standards.
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>FEPA:</strong> European standard (P-Grade system)</li>
              <li><strong>ANSI:</strong> American National Standards Institute</li>
              <li><strong>JIS:</strong> Japanese Industrial Standard</li>
              <li><strong>Micron:</strong> Particle size in micrometers</li>
            </ul>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive guides on grinding techniques and sample preparation.
            </p>
            <a href="/guides/grinding-techniques" className="text-primary-600 font-semibold hover:underline">
              View Grinding Techniques Guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

