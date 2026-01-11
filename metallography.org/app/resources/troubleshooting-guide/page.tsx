'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

export default function TroubleshootingGuidePage() {
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
    pdf.text('Troubleshooting Quick Reference', 20, 20)

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

    // Problem categories
    const problems = [
      {
        category: 'Scratches',
        issues: [
          { problem: 'Deep scratches remain', solution: 'Return to coarser grit and remove completely before proceeding' },
          { problem: 'Scratches from previous step', solution: 'Ensure complete removal at each step, increase time if needed' },
          { problem: 'New scratches introduced', solution: 'Check for contamination, clean between steps, use fresh abrasive' },
        ]
      },
      {
        category: 'Relief',
        issues: [
          { problem: 'Relief around inclusions', solution: 'Reduce polishing time, use softer cloth, decrease pressure' },
          { problem: 'Relief between phases', solution: 'Shorter polishing times, softer cloth, monitor carefully' },
          { problem: 'Edge relief', solution: 'Use harder cloth, reduce pressure, shorter times' },
        ]
      },
      {
        category: 'Contamination',
        issues: [
          { problem: 'Embedded abrasive particles', solution: 'Clean thoroughly between steps, use fresh cloth' },
          { problem: 'Cross-contamination', solution: 'Clean sample and equipment between grits, use separate cloths' },
          { problem: 'Oxide contamination', solution: 'Clean immediately after polishing, use appropriate solvents' },
        ]
      },
      {
        category: 'Over-polishing',
        issues: [
          { problem: 'Excessive material removal', solution: 'Reduce polishing time, use lighter pressure' },
          { problem: 'Loss of edge definition', solution: 'Shorter times, monitor frequently, use harder cloth' },
          { problem: 'Smearing (soft materials)', solution: 'Reduce time significantly, use very light pressure' },
        ]
      },
      {
        category: 'Under-polishing',
        issues: [
          { problem: 'Previous scratches visible', solution: 'Increase polishing time, check cloth condition' },
          { problem: 'Incomplete scratch removal', solution: 'Extend time, ensure adequate abrasive application' },
          { problem: 'Uneven surface', solution: 'Maintain consistent technique, check for cloth wear' },
        ]
      },
      {
        category: 'Etching Issues',
        issues: [
          { problem: 'Over-etching', solution: 'Reduce etching time, dilute etchant, rinse immediately' },
          { problem: 'Under-etching', solution: 'Increase time slightly, check etchant freshness' },
          { problem: 'Uneven etching', solution: 'Apply etchant evenly, ensure clean surface' },
          { problem: 'Etching artifacts', solution: 'Clean surface thoroughly, use fresh etchant' },
        ]
      },
      {
        category: 'Mounting Issues',
        issues: [
          { problem: 'Voids in mount', solution: 'Check mounting procedure, ensure proper pressure/temperature' },
          { problem: 'Mount cracking', solution: 'Adjust cooling rate, check resin compatibility' },
          { problem: 'Poor edge retention', solution: 'Use appropriate mounting material, ensure proper curing' },
        ]
      },
      {
        category: 'Grinding Issues',
        issues: [
          { problem: 'Excessive damage', solution: 'Start with finer grit, reduce pressure, use adequate coolant' },
          { problem: 'Incomplete damage removal', solution: 'Continue grinding until damage removed, check direction' },
          { problem: 'Uneven grinding', solution: 'Maintain consistent pressure, check paper condition' },
        ]
      },
    ]

    problems.forEach(category => {
      checkPageBreak(25)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(37, 99, 235)
      pdf.text(category.category, leftMargin, yPos)
      yPos += lineHeight + 2

      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.setFont('helvetica', 'normal')
      
      category.issues.forEach(issue => {
        checkPageBreak(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text(`Problem: ${issue.problem}`, leftMargin + 5, yPos)
        yPos += lineHeight
        pdf.setFont('helvetica', 'normal')
        const solutionLines = pdf.splitTextToSize(`Solution: ${issue.solution}`, rightMargin - leftMargin - 10)
        pdf.text(solutionLines, leftMargin + 5, yPos)
        yPos += solutionLines.length * lineHeight + 2
      })
      yPos += 3
    })

    // Quick Tips
    checkPageBreak(30)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Quick Tips', leftMargin, yPos)
    yPos += lineHeight + 2

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    const tips = [
      'Always monitor the sample surface during preparation',
      'Clean thoroughly between each step',
      'Use fresh abrasives and clean cloths',
      'Start with shorter times and increase if needed',
      'Maintain consistent technique and pressure',
      'Document any issues for future reference',
    ]
    tips.forEach(tip => {
      checkPageBreak(8)
      pdf.text(`• ${tip}`, leftMargin + 5, yPos)
      yPos += lineHeight
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

    pdf.save('Troubleshooting-Quick-Reference.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / Troubleshooting Quick Reference
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Troubleshooting Quick Reference</h1>
            <p className="text-xl text-gray-600">
              One-page guide to identifying and solving common preparation problems in metallographic sample preparation.
            </p>
          </div>

          {/* Download Button */}
          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Download PDF Guide</h2>
                <p className="text-gray-600 text-sm">
                  Get a printable quick reference guide with common problems and their solutions organized by category.
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
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Scratches</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold mb-1">Problem: Deep scratches remain</p>
                    <p className="text-sm text-gray-700">Solution: Return to coarser grit and remove completely before proceeding</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold mb-1">Problem: Scratches from previous step</p>
                    <p className="text-sm text-gray-700">Solution: Ensure complete removal at each step, increase time if needed</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Relief</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold mb-1">Problem: Relief around inclusions</p>
                  <p className="text-sm text-gray-700">Solution: Reduce polishing time, use softer cloth, decrease pressure</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Contamination</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold mb-1">Problem: Embedded abrasive particles</p>
                  <p className="text-sm text-gray-700">Solution: Clean thoroughly between steps, use fresh cloth</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Quick Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Always monitor the sample surface during preparation</li>
                  <li>Clean thoroughly between each step</li>
                  <li>Use fresh abrasives and clean cloths</li>
                </ul>
              </section>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive guides for detailed troubleshooting information.
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

