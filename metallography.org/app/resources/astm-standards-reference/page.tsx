'use client'

import { useRef, useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { Standard, getAllStandards } from '@/lib/supabase'

export default function ASTMStandardsReferencePage() {
  const guideRef = useRef<HTMLDivElement>(null)
  const [astmStandards, setAstmStandards] = useState<Standard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStandards() {
      try {
        const standards = await getAllStandards()
        setAstmStandards(standards)
      } catch (error) {
        console.error('Error fetching standards:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStandards()
  }, [])

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
    pdf.text('ASTM Standards Quick Reference', 20, 20)

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
    const introText = 'This guide provides a quick reference to key ASTM standards relevant to metallography and metallographic sample preparation. These standards establish procedures, test methods, and guidelines for consistent and reliable metallographic analysis. Always refer to the complete standard documents for detailed procedures and requirements.'
    const introLines = pdf.splitTextToSize(introText, rightMargin - leftMargin)
    pdf.text(introLines, leftMargin, yPos)
    yPos += introLines.length * lineHeight + 5

    // Group by category (get unique categories from standards)
    const categories = Array.from(new Set(astmStandards.map(s => s.category))).sort()
    
    categories.forEach(category => {
      const categoryStandards = astmStandards.filter(s => s.category === category)
      if (categoryStandards.length === 0) return

      checkPageBreak(30)
      yPos += 3
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(37, 99, 235)
      pdf.text(category, leftMargin, yPos)
      yPos += lineHeight + 1
      pdf.setDrawColor(37, 99, 235)
      pdf.setLineWidth(0.5)
      pdf.line(leftMargin, yPos, rightMargin, yPos)
      yPos += lineHeight + 2
      pdf.setTextColor(0, 0, 0)

      categoryStandards.forEach(standard => {
        checkPageBreak(20)
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.text(standard.standard, leftMargin, yPos)
        yPos += lineHeight

        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'bold')
        const titleLines = pdf.splitTextToSize(standard.title, rightMargin - leftMargin - 5)
        pdf.text(titleLines, leftMargin + 5, yPos)
        yPos += titleLines.length * lineHeight

        pdf.setFont('helvetica', 'normal')
        const descLines = pdf.splitTextToSize(standard.description, rightMargin - leftMargin - 5)
        pdf.text(descLines, leftMargin + 5, yPos)
        yPos += descLines.length * lineHeight + 3
      })
    })

    // Notes
    checkPageBreak(25)
    yPos += 3
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Important Notes', leftMargin, yPos)
    yPos += lineHeight + 2

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    const notes = [
      '• This is a quick reference guide only. Always refer to the complete ASTM standard documents for detailed procedures.',
      '• ASTM standards are regularly updated. Verify you are using the most current version.',
      '• Standards can be purchased from ASTM International (www.astm.org).',
      '• Many organizations maintain subscriptions to ASTM standards for their laboratories.',
      '• Some standards may have specific material or application limitations.',
      '• Always follow safety guidelines when performing procedures described in standards.',
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

    pdf.save('ASTM-Standards-Quick-Reference.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / ASTM Standards Quick Reference
          </nav>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">ASTM Standards Quick Reference</h1>
            <p className="text-xl text-gray-600">
              Quick reference guide to key ASTM standards relevant to metallography and metallographic sample preparation.
            </p>
          </div>

          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Download PDF Guide</h2>
                <p className="text-gray-600 text-sm">
                  Get a printable reference guide with ASTM standards organized by category, including descriptions and applications.
                </p>
              </div>
              <button
                onClick={downloadPDF}
                disabled={loading || astmStandards.length === 0}
                className="btn-primary flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>
          </div>

          <div ref={guideRef} className="card">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> This is a quick reference guide only. Always refer to the complete ASTM standard documents for detailed procedures, requirements, and specifications. ASTM standards are regularly updated - verify you are using the most current version.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-gray-600">Loading standards...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Array.from(new Set(astmStandards.map(s => s.category))).sort().map(category => {
                  const categoryStandards = astmStandards.filter(s => s.category === category)
                  if (categoryStandards.length === 0) return null

                  return (
                    <section key={category}>
                      <h3 className="text-lg font-semibold mb-3 text-primary-600">{category}</h3>
                      <div className="space-y-4">
                        {categoryStandards.map((standard) => (
                          <div key={standard.id} className="border-l-4 border-primary-500 pl-4">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{standard.standard}</h4>
                            </div>
                            <p className="text-sm font-medium text-gray-700 mb-1">{standard.title}</p>
                            <p className="text-sm text-gray-600">{standard.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>This is a quick reference guide only. Always refer to the complete ASTM standard documents for detailed procedures.</li>
                <li>ASTM standards are regularly updated. Verify you are using the most current version.</li>
                <li>Standards can be purchased from ASTM International (www.astm.org).</li>
                <li>Many organizations maintain subscriptions to ASTM standards for their laboratories.</li>
                <li>Some standards may have specific material or application limitations.</li>
                <li>Always follow safety guidelines when performing procedures described in standards.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive guides for detailed information on metallographic procedures.
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

