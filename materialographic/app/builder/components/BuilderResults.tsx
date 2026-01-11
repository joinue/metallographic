'use client'

import { useState } from 'react'
import { ChevronDown, Package, FlaskConical, Sparkles, Eye, Wrench, Gauge, Loader2, Download, MessageSquare } from 'lucide-react'
import jsPDF from 'jspdf'
import { GeneralRecommendation, BuilderFormData } from '../hooks/useBuilderRecommendations'
import RecommendationItem from './RecommendationItem'

interface BuilderResultsProps {
  recommendations: GeneralRecommendation[]
  isGenerating: boolean
  formData: BuilderFormData
  onGetExpertReview: () => void
}

const stageLabels: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  sectioning: { label: 'Sectioning', icon: Wrench },
  mounting: { label: 'Mounting', icon: Package },
  grinding: { label: 'Grinding', icon: Gauge },
  polishing: { label: 'Polishing', icon: Sparkles },
  'final-polishing': { label: 'Final Polishing', icon: Sparkles },
  etching: { label: 'Etching', icon: FlaskConical },
  microscopy: { label: 'Microscopy', icon: Eye },
  cleaning: { label: 'Cleaning', icon: FlaskConical },
  hardness: { label: 'Hardness Testing', icon: Gauge },
}

// Mapping of recommendation types to PACE product links
const getEquipmentLink = (stage: string, type: string): { url: string; text: string } | null => {
  const lowerType = type.toLowerCase()
  
  switch (stage) {
    case 'sectioning':
      if (lowerType.includes('precision wafering') || lowerType.includes('wafering')) {
        if (lowerType.includes('table feed') || lowerType.includes('automatic')) {
          return { url: 'https://metallographic.com/metallographic-equipment/precision-wafering.html#table', text: 'Review precision wafering saws' }
        }
        return { url: 'https://metallographic.com/metallographic-equipment/precision-wafering.html#gravity', text: 'Review precision wafering saws' }
      }
      if (lowerType.includes('automated') || lowerType.includes('automatic')) {
        return { url: 'https://metallographic.com/metallographic-equipment/abrasive-sectioning/automated.html', text: 'Review automated abrasive cutters' }
      }
      if (lowerType.includes('abrasive') || lowerType.includes('cut-off') || lowerType.includes('sectioning')) {
        return { url: 'https://metallographic.com/metallographic-equipment/abrasive-sectioning/manual.html', text: 'Review abrasive cutters' }
      }
      break
    case 'mounting':
      if (lowerType.includes('compression')) {
        return { url: 'https://metallographic.com/metallographic-equipment/compression-mounting.html', text: 'Review compression mounting presses' }
      }
      if (lowerType.includes('castable') || lowerType.includes('vacuum') || lowerType.includes('uv')) {
        return { url: 'https://metallographic.com/metallographic-equipment/castable-mounting.html', text: 'Review castable mounting systems' }
      }
      break
    case 'grinding':
    case 'polishing':
      if (lowerType.includes('vibratory')) {
        return { url: 'https://metallographic.com/metallographic-equipment/grinding-polishing/giga.html', text: 'Review vibratory polishers' }
      }
      if (lowerType.includes('grinder') || lowerType.includes('polisher')) {
        return { url: 'https://metallographic.com/metallographic-equipment/grinding-polishing.html', text: 'Review grinder/polishers' }
      }
      break
    case 'final-polishing':
      if (lowerType.includes('vibratory')) {
        return { url: 'https://metallographic.com/metallographic-equipment/grinding-polishing/giga.html', text: 'Review vibratory polishers' }
      }
      break
    case 'microscopy':
      if (lowerType.includes('metallurgical')) {
        return { url: 'https://metallographic.com/metallographic-equipment/microscopy/metallurgical.html', text: 'Review metallurgical microscopes' }
      }
      return { url: 'https://metallographic.com/metallographic-equipment/microscopy.html', text: 'Review microscopy equipment' }
    case 'hardness':
      return { url: 'https://metallographic.com/metallographic-equipment/hardness-testing.html', text: 'Review hardness testers' }
  }
  
  return null
}

const getConsumableLink = (stage: string, type: string): { url: string; text: string } | null => {
  const lowerType = type.toLowerCase()
  
  switch (stage) {
    case 'sectioning':
      if (lowerType.includes('precision') || lowerType.includes('wafering') || lowerType.includes('diamond')) {
        if (lowerType.includes('blade')) {
          return { url: 'https://shop.metallographic.com/collections/precision-cutting-blades', text: 'Review precision cutting blades' }
        }
        return { url: 'https://shop.metallographic.com/collections/precision-cutting-fluid', text: 'Review precision cutting fluids' }
      }
      if (lowerType.includes('abrasive') || lowerType.includes('cut-off')) {
        if (lowerType.includes('blade') || lowerType.includes('wheel')) {
          return { url: 'https://shop.metallographic.com/collections/abrasive-blades', text: 'Review abrasive blades' }
        }
        return { url: 'https://shop.metallographic.com/collections/abrasive-cutting-fluids', text: 'Review cutting fluids' }
      }
      break
    case 'mounting':
      if (lowerType.includes('compression')) {
        return { url: 'https://shop.metallographic.com/collections/compression-mounting', text: 'Review compression mounting supplies' }
      }
      if (lowerType.includes('castable') || lowerType.includes('epoxy') || lowerType.includes('resin')) {
        return { url: 'https://shop.metallographic.com/collections/castable-mounting', text: 'Review castable mounting supplies' }
      }
      break
    case 'grinding':
      if (lowerType.includes('silicon carbide') || lowerType.includes('sic')) {
        return { url: 'https://shop.metallographic.com/collections/sic-grinding', text: 'Review SiC grinding papers' }
      }
      if (lowerType.includes('alumina') || lowerType.includes('aluminum oxide')) {
        return { url: 'https://shop.metallographic.com/collections/alumina', text: 'Review alumina grinding papers' }
      }
      if (lowerType.includes('diamond')) {
        return { url: 'https://shop.metallographic.com/collections/diamond-grinding', text: 'Review diamond grinding discs' }
      }
      if (lowerType.includes('lapping')) {
        return { url: 'https://shop.metallographic.com/collections/lapping-films', text: 'Review lapping films' }
      }
      break
    case 'polishing':
      if (lowerType.includes('diamond')) {
        return { url: 'https://shop.metallographic.com/collections/diamond-abrasives', text: 'Review diamond polishing suspensions' }
      }
      if (lowerType.includes('cloth') || lowerType.includes('pad')) {
        return { url: 'https://shop.metallographic.com/collections/polishing-pads', text: 'Review polishing pads' }
      }
      break
    case 'final-polishing':
      if (lowerType.includes('colloidal') || lowerType.includes('silica') || lowerType.includes('final')) {
        return { url: 'https://shop.metallographic.com/collections/final-polishing', text: 'Review final polishing supplies' }
      }
      break
    case 'etching':
      return { url: 'https://shop.metallographic.com/collections/etchants', text: 'Review etchants' }
    case 'hardness':
      return { url: 'https://shop.metallographic.com/collections/hardness-testing', text: 'Review hardness testing supplies' }
  }
  
  return null
}

export default function BuilderResults({ recommendations, isGenerating, formData, onGetExpertReview }: BuilderResultsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  if (isGenerating) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
        <p className="text-gray-600">Generating recommendations...</p>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  // Define stage order for proper display
  const stageOrder = ['sectioning', 'mounting', 'grinding', 'polishing', 'final-polishing', 'etching', 'microscopy', 'cleaning', 'hardness']
  
  // Group recommendations by stage
  const recommendationsByStage = recommendations.reduce((acc, rec) => {
    if (!acc[rec.stage]) {
      acc[rec.stage] = []
    }
    acc[rec.stage].push(rec)
    return acc
  }, {} as Record<string, GeneralRecommendation[]>)

  // Separate equipment and consumables within each stage, and sort by stage order
  const organizedByStage = Object.entries(recommendationsByStage)
    .map(([stage, recs]) => {
      const equipment = recs.filter(r => r.category === 'equipment')
      const consumables = recs.filter(r => r.category === 'consumable')
      return { stage, equipment, consumables }
    })
    .sort((a, b) => {
      const aIndex = stageOrder.indexOf(a.stage)
      const bIndex = stageOrder.indexOf(b.stage)
      // If stage not in order list, put it at the end
      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })

  const toggleSection = (stage: string) => {
    setOpenSections(prev => ({
      ...prev,
      [stage]: !prev[stage]
    }))
  }

  const downloadPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Load logo
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

    // Helper function to add footer logo
    const addFooterLogo = () => {
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, 'PNG', 190 - 8, 290 - 8, 8, 8)
      }
    }

    // Constants
    const leftMargin = 20
    const rightMargin = 190
    const pageHeight = 280
    const footerHeight = 15
    const lineHeight = 7
    let yPos = 20

    // Helper function to check page break - keeps sections together
    const checkPageBreak = (requiredSpace: number) => {
      if (yPos + requiredSpace > pageHeight - footerHeight) {
        addFooterLogo()
        pdf.addPage()
        yPos = 20
        return true
      }
      return false
    }

    // Helper function to clean text and fix character spacing issues
    const cleanText = (text: string): string => {
      return text
        .replace(/μ/g, 'um')
        .replace(/μm/g, 'um')
        .replace(/¼/g, '')
        .replace(/½/g, '')
        .replace(/¾/g, '')
        .replace(/\u00AD/g, '') // Remove soft hyphens
        .replace(/\u200B/g, '') // Remove zero-width spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim()
    }

    // Helper function to add wrapped text with proper spacing
    const addWrappedText = (text: string, x: number, maxWidth: number, fontSize: number = 10) => {
      pdf.setFontSize(fontSize)
      pdf.setFont('helvetica', 'normal')
      
      const clean = cleanText(text)
      
      // Use splitTextToSize which handles text properly
      const lines = pdf.splitTextToSize(clean, maxWidth)
      lines.forEach((line: string) => {
        checkPageBreak(lineHeight)
        // Use text() method - don't pass maxWidth in options, it's already split
        pdf.text(line, x, yPos)
        yPos += lineHeight
      })
    }

    // Header - title at top, logo + text below, then date (matching other PDFs)
    pdf.setFontSize(20)
    pdf.setTextColor(37, 99, 235)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Lab Builder Recommendations', leftMargin, yPos)
    
    yPos = 25
    // Logo badge and URL below title
    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, 'PNG', leftMargin, yPos, 8, 8)
    }
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Metallography.org', 30, yPos + 5)
    
    yPos = 38
    // Generated date
    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, leftMargin, yPos)
    
    yPos = 50

    // Introduction
    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    addWrappedText(
      'Based on your specifications, here are general equipment types and consumables appropriate for your use case.',
      leftMargin,
      rightMargin - leftMargin
    )
    yPos += lineHeight * 0.5

    // Add recommendations by stage
    organizedByStage.forEach(({ stage, equipment, consumables }) => {
      const stageInfo = stageLabels[stage] || { label: stage, icon: Package }
      
      // Check if we have space for at least the stage header + a bit more
      // Only break if we're very close to the bottom
      checkPageBreak(lineHeight * 4)
      
      // Stage header
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(37, 99, 235)
      pdf.text(stageInfo.label, leftMargin, yPos)
      yPos += lineHeight * 1.5

      // Equipment section
      if (equipment.length > 0) {
        // Check if we have space for equipment header + at least one item
        checkPageBreak(lineHeight * 6)
        
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(0, 0, 0)
        pdf.text('Equipment', leftMargin + 5, yPos)
        yPos += lineHeight

        equipment.forEach((rec) => {
          // Check if we have space for item type + at least some reasoning
          checkPageBreak(lineHeight * 5)
          
          pdf.setFontSize(10)
          pdf.setFont('helvetica', 'bold')
          pdf.setTextColor(0, 0, 0)
          pdf.text(`• ${cleanText(rec.type)}`, leftMargin + 5, yPos)
          yPos += lineHeight
          
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(50, 50, 50)
          // Remove markdown links for PDF (just show text)
          const reasoningText = rec.reasoning.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          addWrappedText(reasoningText, leftMargin + 10, rightMargin - leftMargin - 10, 9)
          yPos += lineHeight * 0.5
        })
        yPos += lineHeight * 0.5
      }

      // Consumables section
      if (consumables.length > 0) {
        // Check if we have space for consumables header + at least one item
        checkPageBreak(lineHeight * 6)
        
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(0, 0, 0)
        pdf.text('Consumables', leftMargin + 5, yPos)
        yPos += lineHeight

        consumables.forEach((rec) => {
          // Check if we have space for item type + at least some reasoning
          checkPageBreak(lineHeight * 5)
          
          pdf.setFontSize(10)
          pdf.setFont('helvetica', 'bold')
          pdf.setTextColor(0, 0, 0)
          pdf.text(`• ${cleanText(rec.type)}`, leftMargin + 5, yPos)
          yPos += lineHeight
          
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(50, 50, 50)
          // Remove markdown links for PDF (just show text)
          const reasoningText = rec.reasoning.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          addWrappedText(reasoningText, leftMargin + 10, rightMargin - leftMargin - 10, 9)
          yPos += lineHeight * 0.5
        })
        yPos += lineHeight * 0.5
      }
    })

    // Add footer logo to last page
    addFooterLogo()

    // Save PDF
    pdf.save(`lab-builder-recommendations-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <div id="recommendations-section" className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Recommended Equipment & Consumables</h2>
            <p className="text-sm text-gray-600">
              Based on your specifications, here are general equipment types and consumables appropriate for your use case.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onGetExpertReview}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              Get Expert Review
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {organizedByStage.map(({ stage, equipment, consumables }) => {
            const stageInfo = stageLabels[stage] || { label: stage, icon: Package }
            const Icon = stageInfo.icon
            const isOpen = openSections[stage] || false

            return (
              <div key={stage} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(stage)}
                  className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors touch-manipulation active:bg-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                    <h3 className="text-lg sm:text-xl font-bold">{stageInfo.label}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-6">
                    {equipment.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-base font-semibold mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-primary-600" />
                          Equipment
                        </h4>
                        <div className="space-y-3">
                          {equipment.map((rec, idx) => (
                            <RecommendationItem key={`equipment-${idx}`} recommendation={rec} />
                          ))}
                        </div>
                        {/* Subtle link to equipment page */}
                        {(() => {
                          // Try to find a relevant link from the equipment recommendations
                          let link = null
                          for (const rec of equipment) {
                            link = getEquipmentLink(stage, rec.type)
                            if (link) break
                          }
                          // Fallback to stage-based link if no specific match
                          if (!link) {
                            if (stage === 'sectioning') {
                              link = { url: 'https://metallographic.com/metallographic-equipment/abrasive-sectioning/manual.html', text: 'Review sectioning equipment' }
                            } else if (stage === 'mounting') {
                              link = { url: 'https://metallographic.com/metallographic-equipment/compression-mounting.html', text: 'Review mounting equipment' }
                            } else if (stage === 'grinding' || stage === 'polishing') {
                              link = { url: 'https://metallographic.com/metallographic-equipment/grinding-polishing.html', text: 'Review grinding & polishing equipment' }
                            } else if (stage === 'final-polishing') {
                              link = { url: 'https://metallographic.com/metallographic-equipment/grinding-polishing/giga.html', text: 'Review final polishing equipment' }
                            } else if (stage === 'microscopy') {
                              link = { url: 'https://metallographic.com/metallographic-equipment/microscopy.html', text: 'Review microscopy equipment' }
                            } else if (stage === 'hardness') {
                              link = { url: 'https://metallographic.com/metallographic-equipment/hardness-testing.html', text: 'Review hardness testing equipment' }
                            }
                          }
                          return link ? (
                            <p className="text-xs text-gray-500 mt-3 text-right">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-primary-600 transition-colors"
                              >
                                {link.text} →
                              </a>
                            </p>
                          ) : null
                        })()}
                      </div>
                    )}

                    {consumables.length > 0 && (
                      <div>
                        <h4 className="text-base font-semibold mb-4 flex items-center">
                          <FlaskConical className="w-5 h-5 mr-2 text-primary-600" />
                          Consumables
                        </h4>
                        <div className="space-y-3">
                          {consumables.map((rec, idx) => (
                            <RecommendationItem key={`consumable-${idx}`} recommendation={rec} />
                          ))}
                        </div>
                        {/* Subtle link to consumables page */}
                        {(() => {
                          // Try to find a relevant link from the consumables recommendations
                          let link = null
                          for (const rec of consumables) {
                            link = getConsumableLink(stage, rec.type)
                            if (link) break
                          }
                          // Fallback to stage-based link if no specific match
                          if (!link) {
                            if (stage === 'sectioning') {
                              link = { url: 'https://shop.metallographic.com/collections/abrasive-blades', text: 'Review sectioning consumables' }
                            } else if (stage === 'mounting') {
                              link = { url: 'https://shop.metallographic.com/collections/compression-mounting', text: 'Review mounting consumables' }
                            } else if (stage === 'grinding') {
                              link = { url: 'https://shop.metallographic.com/collections/sic-grinding', text: 'Review grinding consumables' }
                            } else if (stage === 'polishing') {
                              link = { url: 'https://shop.metallographic.com/collections/diamond-abrasives', text: 'Review polishing consumables' }
                            } else if (stage === 'final-polishing') {
                              link = { url: 'https://shop.metallographic.com/collections/final-polishing', text: 'Review final polishing consumables' }
                            } else if (stage === 'etching') {
                              link = { url: 'https://shop.metallographic.com/collections/etchants', text: 'Review etchants' }
                            } else if (stage === 'hardness') {
                              link = { url: 'https://shop.metallographic.com/collections/hardness-testing', text: 'Review hardness testing consumables' }
                            }
                          }
                          return link ? (
                            <p className="text-xs text-gray-500 mt-3 text-right">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-primary-600 transition-colors"
                              >
                                {link.text} →
                              </a>
                            </p>
                          ) : null
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

