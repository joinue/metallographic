'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

export default function ChecklistPage() {
  const checklistRef = useRef<HTMLDivElement>(null)

  const downloadPDF = async () => {
    if (!checklistRef.current) return

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Load logo once
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
      // If logo fails to load, continue without it
    }

    // Helper function to add small logo to bottom right of page
    const addFooterLogo = () => {
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, 'PNG', 190 - 8, 290 - 8, 8, 8)
      }
    }

    // First page - title at top, logo + URL below, then date
    pdf.setFontSize(20)
    pdf.setTextColor(37, 99, 235)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Metallographic Sample Preparation Checklist', 20, 20)

    // Logo badge and URL below title (smaller) - only on first page
    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, 'PNG', 20, 25, 8, 8)
    }
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Metallography.org', 30, 30)

    // Generated date with a little spacing
    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 38)

    let yPosition = 50
    const lineHeight = 7
    const leftMargin = 20
    const pageHeight = 280
    const footerHeight = 15 // Space reserved for footer
    const rightMargin = 190

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - footerHeight) {
        pdf.addPage()
        yPosition = 20
        return true
      }
      return false
    }

    // Section function
    const addSection = (title: string, items: string[]) => {
      // Check if we have enough space for header + at least one item
      checkPageBreak(lineHeight * 4)
      
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.setFont('helvetica', 'bold')
      pdf.text(title, leftMargin, yPosition)
      yPosition += lineHeight * 1.5

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(50, 50, 50)

      items.forEach((item, index) => {
        checkPageBreak(lineHeight * 2)
        // Checkbox
        pdf.rect(leftMargin, yPosition - 3, 3, 3)
        // Item text - handle special characters properly
        const itemText = item.replace(/μ/g, 'um').replace(/μm/g, 'um')
        const lines = pdf.splitTextToSize(`  ${itemText}`, rightMargin - leftMargin - 10)
        pdf.text(lines, leftMargin + 5, yPosition)
        yPosition += lineHeight * (lines.length > 1 ? lines.length : 1) + 1
      })
      yPosition += lineHeight * 0.5
    }

    // Pre-Preparation
    addSection('1. Pre-Preparation Planning', [
      'Identify material type and composition',
      'Determine analysis objectives (microstructure, hardness, etc.)',
      'Select appropriate sectioning method',
      'Plan mounting requirements (if needed)',
      'Review material safety data sheets (MSDS)',
      'Prepare work area and safety equipment',
    ])

    // Sectioning
    addSection('2. Sectioning', [
      'Select appropriate cutting wheel/abrasive',
      'Set cutting parameters (speed, feed rate, coolant)',
      'Mark sample orientation (if important)',
      'Perform cut with proper technique',
      'Inspect cut surface for damage',
      'Clean sample to remove cutting debris',
      'Document section location and orientation',
    ])

    // Mounting (if applicable)
    addSection('3. Mounting (if required)', [
      'Select mounting material (compression, castable)',
      'Prepare sample surface for mounting',
      'Set mounting parameters (pressure, temperature, time)',
      'Allow mount to cure completely',
      'Inspect mount for voids or defects',
      'Label mount with sample identification',
    ])

    // Grinding
    addSection('4. Grinding', [
      'Start with coarsest appropriate grit (typically 120-180)',
      'Use proper grinding direction (perpendicular to previous)',
      'Apply consistent, moderate pressure',
      'Use adequate coolant/lubricant',
      'Grind until previous scratches are removed',
      'Clean sample thoroughly between grits',
      'Progress through grit sequence (240, 320, 400, 600, 800, 1200)',
      'Inspect surface after each grit',
      'Ensure all previous scratches are removed before proceeding',
      'Final grinding should produce uniform scratch pattern',
    ])

    // Polishing
    addSection('5. Polishing', [
      'Select appropriate polishing cloth',
      'Choose polishing compound (diamond, alumina, etc.)',
      'Set polishing parameters (speed, pressure, time)',
      'Apply polishing compound evenly',
      'Polish with consistent technique',
      'Clean sample between polishing steps',
      'Progress through polishing sequence (9um, 3um, 1um, 0.05um)',
      'Inspect surface quality after each step',
      'Final polish should produce mirror-like surface',
      'Verify no scratches or contamination remain',
    ])

    // Cleaning
    addSection('6. Final Cleaning', [
      'Rinse sample thoroughly with water',
      'Use ultrasonic cleaner if available',
      'Dry sample completely (compressed air, lint-free cloth)',
      'Inspect under microscope for cleanliness',
      'Ensure no polishing compound residue remains',
      'Handle sample carefully to avoid fingerprints',
    ])

    // Etching (if required)
    addSection('7. Etching (if required)', [
      'Select appropriate etchant for material',
      'Prepare etchant solution (if needed)',
      'Test etchant on scrap sample first',
      'Apply etchant using proper technique (swab, immersion, electrolytic)',
      'Monitor etching time carefully',
      'Stop etching at appropriate time',
      'Rinse immediately with appropriate solvent',
      'Dry sample completely',
      'Inspect etch quality under microscope',
    ])

    // Quality Control
    addSection('8. Quality Control', [
      'Inspect sample under microscope at appropriate magnification',
      'Verify no scratches, relief, or contamination',
      'Check for proper microstructure revelation (if etched)',
      'Document any artifacts or issues',
      'Photograph sample if required',
      'Store sample properly to prevent damage',
    ])

    // Documentation
    addSection('9. Documentation', [
      'Record all preparation steps and parameters',
      'Note any deviations from standard procedure',
      'Document grit sizes and polishing compounds used',
      'Record etching details (if applicable)',
      'Save images/photographs',
      'Update procedure records',
    ])

    // Notes section
    checkPageBreak(lineHeight * 6)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Notes:', leftMargin, yPosition)
    yPosition += lineHeight * 1.5

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setDrawColor(200, 200, 200)
    for (let i = 0; i < 8; i++) {
      checkPageBreak(lineHeight * 2)
      pdf.line(leftMargin, yPosition, rightMargin, yPosition)
      yPosition += lineHeight * 1.5
    }

    // Footer with logo
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      addFooterLogo()
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Page ${i} of ${pageCount} | metallography.org`, 105, 290, { align: 'center' })
    }

    pdf.save('metallography-sample-preparation-checklist.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <Link 
            href="/resources" 
            className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block"
          >
            ← Back to Resources
          </Link>
          <div className="flex items-center justify-between mt-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gray-900">Sample Preparation Checklist</h1>
              <p className="text-gray-600">
                A comprehensive checklist to ensure you follow all steps in the preparation process
              </p>
            </div>
            <button
              onClick={downloadPDF}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div ref={checklistRef} className="bg-white border border-gray-200 rounded-lg p-8 print:p-4">
          {/* Header - Hidden in PDF but shown on page */}
          <div className="mb-8 print:hidden">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">
              Metallographic Sample Preparation Checklist
            </h2>
            <p className="text-gray-600 text-sm">
              Metallography.org - Free Educational Resources
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Generated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Checklist Content */}
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold mb-4">1. Pre-Preparation Planning</h3>
              <ul className="space-y-2">
                {[
                  'Identify material type and composition',
                  'Determine analysis objectives (microstructure, hardness, etc.)',
                  'Select appropriate sectioning method',
                  'Plan mounting requirements (if needed)',
                  'Review material safety data sheets (MSDS)',
                  'Prepare work area and safety equipment',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">2. Sectioning</h3>
              <ul className="space-y-2">
                {[
                  'Select appropriate cutting wheel/abrasive',
                  'Set cutting parameters (speed, feed rate, coolant)',
                  'Mark sample orientation (if important)',
                  'Perform cut with proper technique',
                  'Inspect cut surface for damage',
                  'Clean sample to remove cutting debris',
                  'Document section location and orientation',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">3. Mounting (if required)</h3>
              <ul className="space-y-2">
                {[
                  'Select mounting material (compression, castable)',
                  'Prepare sample surface for mounting',
                  'Set mounting parameters (pressure, temperature, time)',
                  'Allow mount to cure completely',
                  'Inspect mount for voids or defects',
                  'Label mount with sample identification',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">4. Grinding</h3>
              <ul className="space-y-2">
                {[
                  'Start with coarsest appropriate grit (typically 120-180)',
                  'Use proper grinding direction (perpendicular to previous)',
                  'Apply consistent, moderate pressure',
                  'Use adequate coolant/lubricant',
                  'Grind until previous scratches are removed',
                  'Clean sample thoroughly between grits',
                  'Progress through grit sequence (240, 320, 400, 600, 800, 1200)',
                  'Inspect surface after each grit',
                  'Ensure all previous scratches are removed before proceeding',
                  'Final grinding should produce uniform scratch pattern',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">5. Polishing</h3>
              <ul className="space-y-2">
                {[
                  'Select appropriate polishing cloth',
                  'Choose polishing compound (diamond, alumina, etc.)',
                  'Set polishing parameters (speed, pressure, time)',
                  'Apply polishing compound evenly',
                  'Polish with consistent technique',
                  'Clean sample between polishing steps',
                  'Progress through polishing sequence (9um, 3um, 1um, 0.05um)',
                  'Inspect surface quality after each step',
                  'Final polish should produce mirror-like surface',
                  'Verify no scratches or contamination remain',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">6. Final Cleaning</h3>
              <ul className="space-y-2">
                {[
                  'Rinse sample thoroughly with water',
                  'Use ultrasonic cleaner if available',
                  'Dry sample completely (compressed air, lint-free cloth)',
                  'Inspect under microscope for cleanliness',
                  'Ensure no polishing compound residue remains',
                  'Handle sample carefully to avoid fingerprints',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">7. Etching (if required)</h3>
              <ul className="space-y-2">
                {[
                  'Select appropriate etchant for material',
                  'Prepare etchant solution (if needed)',
                  'Test etchant on scrap sample first',
                  'Apply etchant using proper technique (swab, immersion, electrolytic)',
                  'Monitor etching time carefully',
                  'Stop etching at appropriate time',
                  'Rinse immediately with appropriate solvent',
                  'Dry sample completely',
                  'Inspect etch quality under microscope',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">8. Quality Control</h3>
              <ul className="space-y-2">
                {[
                  'Inspect sample under microscope at appropriate magnification',
                  'Verify no scratches, relief, or contamination',
                  'Check for proper microstructure revelation (if etched)',
                  'Document any artifacts or issues',
                  'Photograph sample if required',
                  'Store sample properly to prevent damage',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">9. Documentation</h3>
              <ul className="space-y-2">
                {[
                  'Record all preparation steps and parameters',
                  'Note any deviations from standard procedure',
                  'Document grit sizes and polishing compounds used',
                  'Record etching details (if applicable)',
                  'Save images/photographs',
                  'Update procedure records',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Notes</h3>
              <div className="space-y-3 border-t border-gray-200 pt-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="border-b border-gray-200 pb-2 min-h-[24px]" />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

