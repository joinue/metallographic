'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

export default function MicroscopeMagnificationGuidePage() {
  const guideRef = useRef<HTMLDivElement>(null)

  const magnificationRanges = [
    {
      application: 'Overall sample overview',
      magnification: '10x - 50x',
      description: 'Low magnification for viewing entire sample, checking for cracks, large defects, or overall structure.',
      useCase: 'Initial inspection, sample orientation, large-scale features',
    },
    {
      application: 'Grain size determination',
      magnification: '100x - 500x',
      description: 'Standard range for grain size measurements using comparison charts or intercept methods (ASTM E112).',
      useCase: 'Grain size analysis, ASTM E112 compliance, quality control',
    },
    {
      application: 'Phase identification',
      magnification: '200x - 1000x',
      description: 'Medium to high magnification for identifying different phases, constituents, and microstructural features.',
      useCase: 'Ferrite/pearlite, martensite, bainite identification, phase analysis',
    },
    {
      application: 'Inclusion rating',
      magnification: '100x - 500x',
      description: 'Standard magnification range for inclusion content analysis and rating according to ASTM E45.',
      useCase: 'Inclusion analysis, ASTM E45 compliance, cleanliness assessment',
    },
    {
      application: 'Carbide analysis',
      magnification: '500x - 1000x',
      description: 'Higher magnification needed to resolve fine carbides and second-phase particles in tool steels and high-alloy materials.',
      useCase: 'Tool steel analysis, carbide distribution, precipitation studies',
    },
    {
      application: 'Precipitation analysis',
      magnification: '500x - 2000x',
      description: 'High magnification for observing fine precipitates, GP zones, and age-hardening features.',
      useCase: 'Aluminum alloys, precipitation-hardened materials, age-hardening studies',
    },
    {
      application: 'Surface finish evaluation',
      magnification: '50x - 200x',
      description: 'Moderate magnification for evaluating surface quality, scratches, polishing artifacts, and preparation quality.',
      useCase: 'Quality control, preparation assessment, artifact identification',
    },
    {
      application: 'Coating thickness measurement',
      magnification: '200x - 1000x',
      description: 'Magnification range for measuring coating thickness, case depth, and surface treatment layers.',
      useCase: 'Coating analysis, case depth measurement, surface treatment evaluation',
    },
    {
      application: 'Weld microstructure',
      magnification: '50x - 500x',
      description: 'Range for examining weld zones, heat-affected zones, and fusion boundaries in welded materials.',
      useCase: 'Weld analysis, HAZ examination, fusion zone characterization',
    },
    {
      application: 'Failure analysis',
      magnification: '50x - 2000x',
      description: 'Variable magnification depending on feature size - from crack propagation paths to fine fracture features.',
      useCase: 'Crack analysis, fracture surface examination, failure investigation',
    },
    {
      application: 'Intermetallic phases',
      magnification: '500x - 2000x',
      description: 'High magnification required to resolve fine intermetallic phases and compounds in complex alloys.',
      useCase: 'Superalloys, titanium alloys, complex phase structures',
    },
    {
      application: 'Twin boundaries',
      magnification: '200x - 1000x',
      description: 'Moderate to high magnification for observing annealing twins, deformation twins, and twin boundaries.',
      useCase: 'Austenitic stainless steel, copper alloys, twinning analysis',
    },
  ]

  const generalGuidelines = [
    {
      rule: 'Start low, go high',
      description: 'Always begin examination at low magnification to get overall context, then increase magnification to examine specific features of interest.',
    },
    {
      rule: 'Use appropriate magnification for feature size',
      description: 'Select magnification so that the feature of interest occupies a reasonable portion of the field of view (typically 20-80% of field).',
    },
    {
      rule: 'Consider resolution limits',
      description: 'Optical microscopes have resolution limits (~0.2 μm). Features smaller than this cannot be resolved regardless of magnification.',
    },
    {
      rule: 'Balance magnification and field of view',
      description: 'Higher magnification provides more detail but reduces field of view. Choose based on whether you need detail or context.',
    },
    {
      rule: 'Use standardized magnifications for comparisons',
      description: 'When comparing samples, use the same magnification for all images to ensure fair comparison and accurate documentation.',
    },
    {
      rule: 'Calibrate regularly',
      description: 'Regularly calibrate microscope magnification using stage micrometers to ensure accurate measurements (ASTM E1951).',
    },
  ]

  const downloadPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    let logoDataUrl: string | null = null
    try {
      const logoImg = await fetch('/logo.png').then(res => res.blob()).then(blob => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(blob)
        })
      })
      logoDataUrl = logoImg
    } catch (e) {
      // Continue without logo
    }

    const addFooterLogo = () => {
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, 'PNG', 190 - 8, 290 - 8, 8, 8)
      }
    }

    pdf.setFontSize(20)
    pdf.setTextColor(37, 99, 235)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Microscope Magnification Selection Guide', 20, 20)

    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, 'PNG', 20, 25, 8, 8)
    }
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Metallography.org', 30, 30)

    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 38)

    let yPos = 50
    const lineHeight = 6
    const leftMargin = 20
    const rightMargin = 190

    const checkPageBreak = (requiredSpace: number) => {
      if (yPos + requiredSpace > 275) {
        pdf.addPage()
        yPos = 20
        return true
      }
      return false
    }

    // Introduction
    yPos += 3
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Introduction', leftMargin, yPos)
    yPos += lineHeight

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const introText = 'Selecting the appropriate magnification is crucial for effective metallographic analysis. This guide provides recommended magnification ranges for common applications and general guidelines for magnification selection. Remember that magnification should be chosen based on the size of features you need to observe and the level of detail required.'
    const introLines = pdf.splitTextToSize(introText, rightMargin - leftMargin)
    pdf.text(introLines, leftMargin, yPos)
    yPos += introLines.length * lineHeight + 5

    // Magnification ranges
    checkPageBreak(30)
    yPos += 3
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Recommended Magnification Ranges', leftMargin, yPos)
    yPos += lineHeight + 1
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    magnificationRanges.forEach((item, index) => {
      checkPageBreak(25)
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`${index + 1}. ${item.application}`, leftMargin, yPos)
      yPos += lineHeight

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`Magnification: ${item.magnification}`, leftMargin + 5, yPos)
      yPos += lineHeight

      pdf.setFont('helvetica', 'normal')
      const descLines = pdf.splitTextToSize(item.description, rightMargin - leftMargin - 10)
      pdf.text(descLines, leftMargin + 5, yPos)
      yPos += descLines.length * lineHeight

      pdf.setFontSize(9)
      pdf.setTextColor(80, 80, 80)
      pdf.text(`Use case: ${item.useCase}`, leftMargin + 5, yPos)
      yPos += lineHeight + 3
      pdf.setTextColor(0, 0, 0)
    })

    // General Guidelines
    checkPageBreak(30)
    yPos += 5
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('General Guidelines', leftMargin, yPos)
    yPos += lineHeight + 1
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    generalGuidelines.forEach((guideline, index) => {
      checkPageBreak(15)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`${index + 1}. ${guideline.rule}`, leftMargin, yPos)
      yPos += lineHeight

      pdf.setFont('helvetica', 'normal')
      const descLines = pdf.splitTextToSize(guideline.description, rightMargin - leftMargin - 5)
      pdf.text(descLines, leftMargin + 5, yPos)
      yPos += descLines.length * lineHeight + 3
    })

    // Notes
    checkPageBreak(25)
    yPos += 5
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Important Notes', leftMargin, yPos)
    yPos += lineHeight + 2

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    const notes = [
      'Magnification values are approximate and may vary based on specific microscope and objective lens combinations.',
      'Total magnification = Objective magnification × Eyepiece magnification (typically 10x).',
      'Digital magnification on camera systems may differ from optical magnification - always calibrate.',
      'Resolution is limited by wavelength of light (~0.2 μm for visible light). Higher magnification does not improve resolution beyond this limit.',
      'For quantitative measurements, always calibrate using stage micrometers (ASTM E1951).',
      'Consider depth of field: higher magnification reduces depth of field, making focusing more critical.',
      'Use appropriate lighting (brightfield, darkfield, DIC, polarized) based on feature contrast needs.',
    ]

    notes.forEach(note => {
      checkPageBreak(8)
      pdf.text(`• ${note}`, leftMargin + 5, yPos)
      yPos += lineHeight
    })

    // Footer
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      addFooterLogo()
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Page ${i} of ${pageCount} | metallography.org`, 105, 290, { align: 'center' })
    }

    pdf.save('Microscope-Magnification-Selection-Guide.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / Microscope Magnification Selection Guide
          </nav>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Microscope Magnification Selection Guide</h1>
            <p className="text-xl text-gray-600">
              Guide to selecting appropriate magnifications for different metallographic applications and analyses.
            </p>
          </div>

          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Download PDF Guide</h2>
                <p className="text-gray-600 text-sm">
                  Get a printable guide with recommended magnification ranges for common metallographic applications.
                </p>
              </div>
              <button
                onClick={downloadPDF}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>
          </div>

          <div ref={guideRef} className="card">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-4 text-primary-600">Recommended Magnification Ranges</h3>
                <div className="space-y-4">
                  {magnificationRanges.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-4">
                      <h4 className="font-semibold mb-1">{item.application}</h4>
                      <p className="text-sm font-medium text-gray-700 mb-2">Magnification: {item.magnification}</p>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <p className="text-xs text-gray-500">Use case: {item.useCase}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">General Guidelines</h3>
                <div className="space-y-3">
                  {generalGuidelines.map((guideline, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded">
                      <p className="font-semibold mb-1">{guideline.rule}</p>
                      <p className="text-sm text-gray-700">{guideline.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">Important Notes</h3>
                <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                  <li>Magnification values are approximate and may vary based on specific microscope and objective lens combinations.</li>
                  <li>Total magnification = Objective magnification × Eyepiece magnification (typically 10x).</li>
                  <li>Digital magnification on camera systems may differ from optical magnification - always calibrate.</li>
                  <li>Resolution is limited by wavelength of light (~0.2 μm for visible light). Higher magnification does not improve resolution beyond this limit.</li>
                  <li>For quantitative measurements, always calibrate using stage micrometers (ASTM E1951).</li>
                  <li>Consider depth of field: higher magnification reduces depth of field, making focusing more critical.</li>
                  <li>Use appropriate lighting (brightfield, darkfield, DIC, polarized) based on feature contrast needs.</li>
                </ul>
              </section>
            </div>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our guides on microstructural analysis and equipment overview.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/guides/microstructural-analysis" className="text-primary-600 font-semibold hover:underline">
                Microstructural Analysis Guide →
              </Link>
              <Link href="/guides/equipment-overview" className="text-primary-600 font-semibold hover:underline">
                Equipment Overview →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

