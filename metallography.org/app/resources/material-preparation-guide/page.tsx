'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

export default function MaterialPreparationGuidePage() {
  const guideRef = useRef<HTMLDivElement>(null)

  const downloadPDF = async () => {
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
    pdf.text('Material-Specific Preparation Guide', 20, 20)

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

    const materials = [
      {
        name: 'Carbon Steel / Low Alloy Steel',
        grinding: 'Start with 120 grit SiC, progress through 240, 400, 600 (800 and 1200 optional for high-quality work or high-magnification analysis)',
        polishing: '9 μm → 3 μm → 1 μm diamond, final with 0.05 μm colloidal silica',
        etching: '2-5% Nital or Picral, depending on structure to reveal',
        notes: 'Standard preparation sequence, adjust grits based on hardness. Use 800/1200 grit for very fine finishes or when preparing for high-magnification analysis.',
      },
      {
        name: 'Stainless Steel',
        grinding: 'Start with 120 grit, progress through 240, 400, 600 (800 and 1200 optional for high-quality work or high-magnification analysis)',
        polishing: '9 μm → 3 μm → 1 μm diamond, final with 0.05 μm colloidal silica',
        etching: "Vilella's Reagent, Adler's, or Kallings No. 2 depending on grade",
        notes: 'Work-hardening material, use consistent moderate pressure. Use 800/1200 grit for very fine finishes or high-magnification analysis.',
      },
      {
        name: 'Aluminum & Aluminum Alloys',
        grinding: 'Start with 120 grit, progress through 240, 400, 600',
        polishing: '9 μm → 3 μm → 1 μm diamond, final with 0.05 μm colloidal silica',
        etching: "Keller's Reagent or Al-NaOH etchant",
        notes: 'Soft material, use shorter times and lighter pressure to avoid smearing',
      },
      {
        name: 'Titanium & Titanium Alloys',
        grinding: 'Start with 180-240 grit, progress through standard sequence (800 and 1200 optional for high-quality work)',
        polishing: '9 μm → 6 μm → 3 μm → 1 μm diamond, final with 0.05 μm',
        etching: "Kroll's Reagent or Weck's Etch for color etching",
        notes: 'Reactive material, handle carefully, very short etching times. Use 800/1200 grit for very fine finishes.',
      },
      {
        name: 'Copper & Brass',
        grinding: 'Start with 240-320 grit, progress through finer grits',
        polishing: '6 μm → 3 μm → 1 μm diamond, final with 0.05 μm',
        etching: 'Copper No. 1, Copper No. 2, or ASTM No. 30',
        notes: 'Soft material, gentle polishing required',
      },
      {
        name: 'Nickel Alloys',
        grinding: 'Start with 180-240 grit, progress through standard sequence (800 optional for superalloys, 1200 for very high-quality work)',
        polishing: '9 μm → 6 μm → 3 μm → 1 μm diamond, final with 0.05 μm',
        etching: 'Aqua Regia, Glyceregia, or Inconel Etchant',
        notes: 'May require electrolytic etching for sensitive structures. For superalloys, consider using SiC papers up to 1200 grit for best results.',
      },
      {
        name: 'Cast Iron',
        grinding: 'Start with 120 grit, progress through 240, 400, 600',
        polishing: '9 μm → 3 μm → 1 μm diamond, final with 0.05 μm colloidal silica',
        etching: '2-5% Nital, Picral, or Stead\'s Reagent for graphite',
        notes: 'Use lighter pressure than steel to preserve graphite structure',
      },
      {
        name: 'Tool Steel',
        grinding: 'Start with 120 grit, progress through 240, 320, 400, 600 (800 and 1200 optional for high-quality work)',
        polishing: '9 μm → 6 μm → 3 μm → 1 μm diamond, final with 0.05 μm colloidal silica',
        etching: '2-5% Nital, Picral, or Murakami\'s for carbides',
        notes: 'Very hard material, use extended polishing times (5-8 minutes per step)',
      },
    ]

    materials.forEach(material => {
      checkPageBreak(35)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(37, 99, 235)
      pdf.text(material.name, leftMargin, yPos)
      yPos += lineHeight + 2

      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Grinding:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const grindingLines = pdf.splitTextToSize(material.grinding, rightMargin - leftMargin - 10)
      pdf.text(grindingLines, leftMargin + 5, yPos)
      yPos += grindingLines.length * lineHeight + 2

      pdf.setFont('helvetica', 'bold')
      pdf.text('Polishing:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const polishingLines = pdf.splitTextToSize(material.polishing, rightMargin - leftMargin - 10)
      pdf.text(polishingLines, leftMargin + 5, yPos)
      yPos += polishingLines.length * lineHeight + 2

      pdf.setFont('helvetica', 'bold')
      pdf.text('Etching:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const etchingLines = pdf.splitTextToSize(material.etching, rightMargin - leftMargin - 10)
      pdf.text(etchingLines, leftMargin + 5, yPos)
      yPos += etchingLines.length * lineHeight + 2

      pdf.setFont('helvetica', 'bold')
      pdf.text('Notes:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const notesLines = pdf.splitTextToSize(material.notes, rightMargin - leftMargin - 10)
      pdf.text(notesLines, leftMargin + 5, yPos)
      yPos += notesLines.length * lineHeight + 4
    })

    // Footer with logo
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      addFooterLogo()
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Page ${i} of ${pageCount} | metallography.org`, 105, 290, { align: 'center' })
    }

    pdf.save('Material-Specific-Preparation-Guide.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / Material-Specific Preparation Guide
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Material-Specific Preparation Guide</h1>
            <p className="text-xl text-gray-600">
              Comprehensive guide covering preparation techniques for various material types including grinding, polishing, and etching recommendations.
            </p>
          </div>

          {/* Download Button */}
          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Download PDF Guide</h2>
                <p className="text-gray-600 text-sm">
                  Get a printable guide with material-specific preparation procedures for common metals and alloys.
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

          {/* Preview Content */}
          <div ref={guideRef} className="card">
            <h2 className="text-2xl font-semibold mb-4">Preview</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Carbon Steel / Low Alloy Steel</h3>
                <div className="bg-gray-50 p-4 rounded space-y-2">
                  <p><strong>Grinding:</strong> Start with 120 grit SiC, progress through 240, 400, 600 (800 and 1200 optional for high-quality work or high-magnification analysis)</p>
                  <p><strong>Polishing:</strong> 9μm → 3μm → 1μm diamond, final with 0.05μm colloidal silica</p>
                  <p><strong>Etching:</strong> 2-5% Nital or Picral, depending on structure to reveal</p>
                  <p><strong>Notes:</strong> Standard preparation sequence, adjust grits based on hardness. Use 800/1200 grit for very fine finishes or when preparing for high-magnification analysis.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Stainless Steel</h3>
                <div className="bg-gray-50 p-4 rounded space-y-2">
                  <p><strong>Grinding:</strong> Start with 120 grit, progress through 240, 400, 600 (800 and 1200 optional for high-quality work or high-magnification analysis)</p>
                  <p><strong>Polishing:</strong> 9μm → 3μm → 1μm diamond, final with 0.05μm colloidal silica</p>
                  <p><strong>Etching:</strong> Vilella's Reagent, Adler's, or Kallings No. 2 depending on grade</p>
                  <p><strong>Notes:</strong> Work-hardening material, use consistent moderate pressure. Use 800/1200 grit for very fine finishes or high-magnification analysis.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Aluminum & Aluminum Alloys</h3>
                <div className="bg-gray-50 p-4 rounded space-y-2">
                  <p><strong>Grinding:</strong> Start with 120 grit, progress through 240, 400, 600</p>
                  <p><strong>Polishing:</strong> 9μm → 3μm → 1μm diamond, final with 0.05μm colloidal silica</p>
                  <p><strong>Etching:</strong> Keller's Reagent or Al-NaOH etchant</p>
                  <p><strong>Notes:</strong> Soft material, use shorter times and lighter pressure to avoid smearing</p>
                </div>
              </section>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive material-specific guides for detailed procedures.
            </p>
            <Link href="/guides" className="text-primary-600 font-semibold hover:underline">
              Browse Guides →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

