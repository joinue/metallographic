'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

export default function SafetyDataSheetReferencePage() {
  const guideRef = useRef<HTMLDivElement>(null)

  const chemicals = [
    {
      name: 'Nitric Acid (HNO₃)',
      cas: '7697-37-2',
      hazards: 'Corrosive, oxidizing, toxic',
      storage: 'Store in cool, dry, well-ventilated area. Keep away from organic materials, reducing agents, and metals.',
      handling: 'Use in fume hood. Wear acid-resistant gloves, safety goggles, and lab coat. Avoid contact with skin and eyes.',
      firstAid: 'Eyes: Flush with water for 15 minutes. Skin: Remove contaminated clothing, flush with water. Inhalation: Move to fresh air. Seek medical attention.',
      disposal: 'Neutralize with base (sodium carbonate) before disposal. Follow local regulations.',
    },
    {
      name: 'Hydrochloric Acid (HCl)',
      cas: '7647-01-0',
      hazards: 'Corrosive, toxic, releases toxic fumes',
      storage: 'Store in cool, dry, well-ventilated area. Keep away from bases, oxidizing agents, and metals.',
      handling: 'Use in fume hood. Wear acid-resistant gloves, safety goggles, and lab coat. Avoid contact with skin and eyes.',
      firstAid: 'Eyes: Flush with water for 15 minutes. Skin: Remove contaminated clothing, flush with water. Inhalation: Move to fresh air. Seek medical attention.',
      disposal: 'Neutralize with base (sodium carbonate) before disposal. Follow local regulations.',
    },
    {
      name: 'Hydrofluoric Acid (HF)',
      cas: '7664-39-3',
      hazards: 'Highly corrosive, toxic, can cause severe burns, systemic poisoning',
      storage: 'Store in plastic containers in cool, dry, well-ventilated area. Keep away from glass, metals, and bases.',
      handling: 'EXTREME CAUTION. Use in fume hood with proper ventilation. Wear acid-resistant gloves (neoprene or nitrile), safety goggles, face shield, and lab coat. Have calcium gluconate gel available.',
      firstAid: 'IMMEDIATE MEDICAL ATTENTION REQUIRED. Skin: Flush with water, apply calcium gluconate gel. Eyes: Flush with water for 15 minutes, seek immediate medical attention. Inhalation: Move to fresh air, seek immediate medical attention.',
      disposal: 'Neutralize with calcium carbonate or lime. Follow strict local regulations. HF requires special handling.',
    },
    {
      name: 'Picric Acid',
      cas: '88-89-1',
      hazards: 'Explosive when dry, toxic, flammable',
      storage: 'Store wet (with at least 10% water). Keep in cool, dry area away from heat, sparks, and flames. Store separately from other chemicals.',
      handling: 'Keep wet at all times. Wear gloves, safety goggles, and lab coat. Avoid friction, shock, and heat.',
      firstAid: 'Eyes: Flush with water. Skin: Wash with soap and water. Inhalation: Move to fresh air. Seek medical attention.',
      disposal: 'Keep wet. Contact hazardous waste disposal service. Do not allow to dry.',
    },
    {
      name: 'Ethanol',
      cas: '64-17-5',
      hazards: 'Flammable, toxic',
      storage: 'Store in cool, well-ventilated area away from heat, sparks, and flames. Keep containers tightly closed.',
      handling: 'Use in well-ventilated area. Wear gloves and safety goggles. Avoid open flames and ignition sources.',
      firstAid: 'Eyes: Flush with water. Skin: Wash with soap and water. Inhalation: Move to fresh air. Ingestion: Do not induce vomiting, seek medical attention.',
      disposal: 'Follow local regulations. Can often be disposed of as flammable waste.',
    },
    {
      name: 'Sodium Hydroxide (NaOH)',
      cas: '1310-73-2',
      hazards: 'Corrosive, caustic, toxic',
      storage: 'Store in cool, dry area. Keep away from acids, water, and moisture. Store in tightly closed containers.',
      handling: 'Wear alkali-resistant gloves, safety goggles, and lab coat. Avoid contact with skin and eyes. Use in well-ventilated area.',
      firstAid: 'Eyes: Flush with water for 15 minutes. Skin: Remove contaminated clothing, flush with water. Seek medical attention.',
      disposal: 'Neutralize with acid before disposal. Follow local regulations.',
    },
    {
      name: 'Potassium Dichromate (K₂Cr₂O₇)',
      cas: '7778-50-9',
      hazards: 'Oxidizing, toxic, carcinogenic, environmental hazard',
      storage: 'Store in cool, dry area away from reducing agents and organic materials. Keep containers tightly closed.',
      handling: 'Use in fume hood. Wear gloves, safety goggles, and lab coat. Avoid contact with skin and eyes. Avoid inhalation of dust.',
      firstAid: 'Eyes: Flush with water. Skin: Wash with soap and water. Inhalation: Move to fresh air. Seek medical attention.',
      disposal: 'Follow strict local regulations. Chromium compounds require special disposal procedures.',
    },
    {
      name: 'Copper Chloride (CuCl₂)',
      cas: '7447-39-4',
      hazards: 'Toxic, irritant, environmental hazard',
      storage: 'Store in cool, dry area. Keep containers tightly closed.',
      handling: 'Wear gloves, safety goggles, and lab coat. Avoid contact with skin and eyes. Avoid inhalation of dust.',
      firstAid: 'Eyes: Flush with water. Skin: Wash with soap and water. Inhalation: Move to fresh air. Seek medical attention if symptoms persist.',
      disposal: 'Follow local regulations. Copper compounds may require special disposal.',
    },
    {
      name: 'Ferric Chloride (FeCl₃)',
      cas: '7705-08-0',
      hazards: 'Corrosive, toxic, irritant',
      storage: 'Store in cool, dry area. Keep containers tightly closed. Hygroscopic - keep away from moisture.',
      handling: 'Wear gloves, safety goggles, and lab coat. Use in well-ventilated area. Avoid contact with skin and eyes.',
      firstAid: 'Eyes: Flush with water. Skin: Remove contaminated clothing, flush with water. Inhalation: Move to fresh air. Seek medical attention if symptoms persist.',
      disposal: 'Neutralize before disposal. Follow local regulations.',
    },
    {
      name: 'Ammonium Hydroxide (NH₄OH)',
      cas: '1336-21-6',
      hazards: 'Corrosive, toxic, releases ammonia vapors',
      storage: 'Store in cool, well-ventilated area. Keep containers tightly closed. Store away from acids.',
      handling: 'Use in fume hood. Wear gloves, safety goggles, and lab coat. Avoid contact with skin and eyes. Avoid inhalation of vapors.',
      firstAid: 'Eyes: Flush with water. Skin: Flush with water. Inhalation: Move to fresh air. Seek medical attention if symptoms persist.',
      disposal: 'Neutralize with acid before disposal. Follow local regulations.',
    },
    {
      name: 'Hydrogen Peroxide (H₂O₂)',
      cas: '7722-84-1',
      hazards: 'Oxidizing, corrosive, can decompose violently',
      storage: 'Store in cool, dark area away from heat and organic materials. Keep containers tightly closed. Store away from reducing agents.',
      handling: 'Wear gloves, safety goggles, and lab coat. Use in well-ventilated area. Avoid contact with skin and eyes. Do not mix with organic materials.',
      firstAid: 'Eyes: Flush with water. Skin: Flush with water. Inhalation: Move to fresh air. Seek medical attention if symptoms persist.',
      disposal: 'Dilute before disposal. Follow local regulations.',
    },
    {
      name: 'Sulfuric Acid (H₂SO₄)',
      cas: '7664-93-9',
      hazards: 'Highly corrosive, toxic, dehydrating',
      storage: 'Store in cool, dry, well-ventilated area. Keep away from bases, oxidizing agents, and organic materials.',
      handling: 'Use in fume hood. Wear acid-resistant gloves, safety goggles, face shield, and lab coat. Avoid contact with skin and eyes.',
      firstAid: 'Eyes: Flush with water for 15 minutes. Skin: Remove contaminated clothing, flush with water. Inhalation: Move to fresh air. Seek immediate medical attention.',
      disposal: 'Neutralize with base (sodium carbonate) before disposal. Follow local regulations.',
    },
    {
      name: 'Acetic Acid',
      cas: '64-19-7',
      hazards: 'Corrosive, flammable, toxic',
      storage: 'Store in cool, well-ventilated area away from heat, sparks, and flames. Keep containers tightly closed.',
      handling: 'Use in well-ventilated area. Wear gloves, safety goggles, and lab coat. Avoid contact with skin and eyes.',
      firstAid: 'Eyes: Flush with water. Skin: Flush with water. Inhalation: Move to fresh air. Seek medical attention if symptoms persist.',
      disposal: 'Neutralize before disposal. Follow local regulations.',
    },
    {
      name: 'Glycerol',
      cas: '56-81-5',
      hazards: 'Low hazard, may cause mild irritation',
      storage: 'Store in cool, dry area. Keep containers tightly closed.',
      handling: 'Wear gloves and safety goggles. Generally low hazard but avoid prolonged contact.',
      firstAid: 'Eyes: Flush with water. Skin: Wash with soap and water. Generally low hazard.',
      disposal: 'Follow local regulations. Generally can be disposed of as regular waste.',
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
    pdf.text('Safety Data Sheet Quick Reference', 20, 20)

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
    const introText = 'This quick reference provides essential safety information for common chemicals used in metallography laboratories. This is NOT a substitute for complete Safety Data Sheets (SDS). Always refer to the complete SDS provided by the manufacturer for comprehensive safety information, handling procedures, and emergency response details.'
    const introLines = pdf.splitTextToSize(introText, rightMargin - leftMargin)
    pdf.text(introLines, leftMargin, yPos)
    yPos += introLines.length * lineHeight + 5

    // Chemicals
    chemicals.forEach((chemical, index) => {
      checkPageBreak(35)
      yPos += 3
      
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(37, 99, 235)
      pdf.text(`${index + 1}. ${chemical.name}`, leftMargin, yPos)
      yPos += lineHeight

      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(80, 80, 80)
      pdf.text(`CAS: ${chemical.cas}`, leftMargin + 5, yPos)
      yPos += lineHeight

      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Hazards:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const hazardLines = pdf.splitTextToSize(chemical.hazards, rightMargin - leftMargin - 10)
      pdf.text(hazardLines, leftMargin + 5, yPos)
      yPos += hazardLines.length * lineHeight

      pdf.setFont('helvetica', 'bold')
      pdf.text('Storage:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const storageLines = pdf.splitTextToSize(chemical.storage, rightMargin - leftMargin - 10)
      pdf.text(storageLines, leftMargin + 5, yPos)
      yPos += storageLines.length * lineHeight

      pdf.setFont('helvetica', 'bold')
      pdf.text('Handling:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const handlingLines = pdf.splitTextToSize(chemical.handling, rightMargin - leftMargin - 10)
      pdf.text(handlingLines, leftMargin + 5, yPos)
      yPos += handlingLines.length * lineHeight

      pdf.setFont('helvetica', 'bold')
      pdf.text('First Aid:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const firstAidLines = pdf.splitTextToSize(chemical.firstAid, rightMargin - leftMargin - 10)
      pdf.text(firstAidLines, leftMargin + 5, yPos)
      yPos += firstAidLines.length * lineHeight

      pdf.setFont('helvetica', 'bold')
      pdf.text('Disposal:', leftMargin + 5, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      const disposalLines = pdf.splitTextToSize(chemical.disposal, rightMargin - leftMargin - 10)
      pdf.text(disposalLines, leftMargin + 5, yPos)
      yPos += disposalLines.length * lineHeight + 3
    })

    // Important Notes
    checkPageBreak(30)
    yPos += 5
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(200, 0, 0)
    pdf.text('IMPORTANT SAFETY NOTES', leftMargin, yPos)
    yPos += lineHeight + 2

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    const safetyNotes = [
      'This is a QUICK REFERENCE only. Always refer to complete Safety Data Sheets (SDS) from manufacturers.',
      'Have emergency eyewash stations and safety showers readily accessible.',
      'Know the location of fire extinguishers and emergency exits.',
      'Always work in well-ventilated areas or fume hoods when handling chemicals.',
      'Wear appropriate Personal Protective Equipment (PPE) as specified in SDS.',
      'Never mix incompatible chemicals (e.g., acids and bases, oxidizers and reducers).',
      'Store chemicals according to compatibility groups.',
      'Keep emergency contact numbers readily available.',
      'Report all accidents and incidents immediately.',
      'Follow local regulations for chemical storage, handling, and disposal.',
    ]

    safetyNotes.forEach(note => {
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

    pdf.save('Safety-Data-Sheet-Quick-Reference.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / Safety Data Sheet Quick Reference
          </nav>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Safety Data Sheet Quick Reference</h1>
            <p className="text-xl text-gray-600">
              Quick reference for essential safety information for common chemicals used in metallography laboratories.
            </p>
          </div>

          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Download PDF Guide</h2>
                <p className="text-gray-600 text-sm">
                  Get a printable quick reference guide with safety information for common metallography chemicals.
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
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <p className="text-sm text-gray-700">
                <strong>IMPORTANT:</strong> This is a QUICK REFERENCE only. This is NOT a substitute for complete Safety Data Sheets (SDS). Always refer to the complete SDS provided by the manufacturer for comprehensive safety information, handling procedures, and emergency response details.
              </p>
            </div>

            <div className="space-y-6">
              {chemicals.map((chemical, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-lg font-semibold mb-2">{chemical.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">CAS: {chemical.cas}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm mb-1">Hazards:</p>
                      <p className="text-sm text-gray-700">{chemical.hazards}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Storage:</p>
                      <p className="text-sm text-gray-700">{chemical.storage}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Handling:</p>
                      <p className="text-sm text-gray-700">{chemical.handling}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">First Aid:</p>
                      <p className="text-sm text-gray-700">{chemical.firstAid}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Disposal:</p>
                      <p className="text-sm text-gray-700">{chemical.disposal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-red-600">IMPORTANT SAFETY NOTES</h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>This is a QUICK REFERENCE only. Always refer to complete Safety Data Sheets (SDS) from manufacturers.</li>
                <li>Have emergency eyewash stations and safety showers readily accessible.</li>
                <li>Know the location of fire extinguishers and emergency exits.</li>
                <li>Always work in well-ventilated areas or fume hoods when handling chemicals.</li>
                <li>Wear appropriate Personal Protective Equipment (PPE) as specified in SDS.</li>
                <li>Never mix incompatible chemicals (e.g., acids and bases, oxidizers and reducers).</li>
                <li>Store chemicals according to compatibility groups.</li>
                <li>Keep emergency contact numbers readily available.</li>
                <li>Report all accidents and incidents immediately.</li>
                <li>Follow local regulations for chemical storage, handling, and disposal.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our safety fundamentals guide for comprehensive safety information.
            </p>
            <Link href="/guides/safety-fundamentals" className="text-primary-600 font-semibold hover:underline">
              View Safety Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

