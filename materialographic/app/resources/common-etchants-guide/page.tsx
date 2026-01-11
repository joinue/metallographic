'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

// Helper function to get shop URL for PACE etchants
const getEtchantShopUrl = (name: string): string | null => {
  const urlMap: Record<string, string> = {
    "2% Nital": 'nital-2',
    "3% Nital": 'nital-3',
    "5% Nital": 'nital-5',
    "8% Nital": 'nital-8',
    "Adler's Etchant": 'adlers',
    "Kroll's Reagent": 'krolls',
    "Keller's Reagent": 'kellers',
    "Weck's Etch": 'wecks',
    "Kallings No. 2": 'kallings-no-2',
    "CU-PASS-SOL": 'cu-pass-sol',
    "ASTM No. 30": 'astm-no-30',
    "Inconel Etchant": 'inconel',
    "Carpenters": 'carpenters',
    "Dichromate Etchant": 'dichromate',
    "Ammonium Persulfate": 'ammonium-persulfate',
    "Picral Etchant": 'picral',
    "Vilella's Reagent": 'vilellas',
    "Marble's Reagent": 'marbles',
    "Murakami's Reagent": 'murakamis',
    "Al-NaOH Etchant": 'naoh',
    "Klemm's Reagent": 'klemms',
    "Klemm's 2": 'klemms',
    "Winsteard's Reagent": 'winsteards',
    "Waterless Kallings": 'waterless-kallings',
  }
  
  const slug = urlMap[name]
  return slug ? `https://shop.metallographic.com/collections/etchants/products/${slug}` : null
}

export default function CommonEtchantsGuidePage() {
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
    pdf.text('Common Etchants Reference Guide', 20, 20)

    // Logo badge and URL below title (smaller)
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
    const pageHeight = 280
    const rightMargin = 190

    const checkPageBreak = (requiredSpace: number) => {
      if (yPos + requiredSpace > pageHeight - 15) {
        pdf.addPage()
        yPos = 20
        return true
      }
      return false
    }

    // Introduction
    yPos += 3 // Add a bit more space before intro
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Introduction', leftMargin, yPos)
    yPos += lineHeight

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const introText = 'Etching is a critical step in metallographic specimen preparation used to reveal microstructural features. This guide provides quick reference for common etchants organized by material type. Etchants marked as "Available as pre-mixed solution" are available commercially. Other etchants are commonly used in practice and can be prepared in-house.'
    const introLines = pdf.splitTextToSize(introText, rightMargin - leftMargin)
    pdf.text(introLines, leftMargin, yPos)
    yPos += introLines.length * lineHeight + 3

    // Carbon Steel / Low Alloy Steel
    checkPageBreak(35)
    yPos += 3
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Carbon Steel / Low Alloy Steel', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    const carbonSteelEtchants = [
      { name: '2% Nital', comp: 'Ethanol, HNO₃ (2%)', app: 'General purpose, reveals ferrite grain boundaries and pearlite. Ideal for softer steels.', time: '5-30 sec', pace: true, shopUrl: getEtchantShopUrl('2% Nital') },
      { name: '3% Nital', comp: 'Ethanol, HNO₃ (3%)', app: 'Standard concentration for most carbon steels. Most commonly used.', time: '5-30 sec', pace: true, shopUrl: getEtchantShopUrl('3% Nital') },
      { name: '4% Nital', comp: 'Ethanol, HNO₃ (4%)', app: 'Intermediate concentration, good balance for medium-hardness steels', time: '5-30 sec', pace: false, shopUrl: null },
      { name: '5% Nital', comp: 'Ethanol, HNO₃ (5%)', app: 'For harder steels, more aggressive etching', time: '5-30 sec', pace: true, shopUrl: getEtchantShopUrl('5% Nital') },
      { name: '8% Nital', comp: 'Ethanol, HNO₃ (8%)', app: 'Very aggressive, for very hard steels and tool steels', time: '5-30 sec', pace: true, shopUrl: getEtchantShopUrl('8% Nital') },
      { name: '10% Nital', comp: 'Ethanol, HNO₃ (10%)', app: 'Most aggressive Nital, for extremely hard materials', time: '5-30 sec', pace: false, shopUrl: null },
      { name: 'Picral', comp: 'Ethanol, Picric acid (2-4g/100ml)', app: 'Reveals cementite and pearlite, does not attack ferrite boundaries. Superior for pearlite structures.', time: '10-60 sec', pace: true, shopUrl: getEtchantShopUrl('Picral Etchant') },
      { name: "Vilella's Reagent", comp: 'Picric Acid (1g), HCl (5ml), Ethanol (100ml)', app: 'For ferrite-carbide structures in steels. Also used for stainless steel.', time: '5-30 sec', pace: true, shopUrl: getEtchantShopUrl("Vilella's Reagent") },
      { name: 'Sodium Metabisulfite (10%)', comp: 'Na₂S₂O₅ (10g), Water (100ml)', app: 'For revealing prior austenite grain boundaries in quenched and tempered steels', time: '10-30 sec', pace: false, shopUrl: null },
      { name: 'Nital + Picral (Dual)', comp: '2% Nital followed by 4% Picral', app: 'Dual etching reveals both grain boundaries (Nital) and pearlite (Picral)', time: 'Nital: 5-15 sec, Picral: 10-30 sec', pace: false, shopUrl: null },
    ]

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    carbonSteelEtchants.forEach(etchant => {
      checkPageBreak(18)
      pdf.setFont('helvetica', 'bold')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const nameText = etchant.name
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      pdf.text(nameText, leftMargin, yPos)
      if (etchant.pace) {
        pdf.setFontSize(8)
        pdf.setTextColor(37, 99, 235)
        pdf.text('(Available as pre-mixed solution)', leftMargin + 40, yPos)
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      }
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const compText = `Composition: ${etchant.comp}`
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      const compLines = pdf.splitTextToSize(compText, rightMargin - leftMargin - 10)
      pdf.text(compLines, leftMargin + 5, yPos)
      yPos += compLines.length * lineHeight
      const appLines = pdf.splitTextToSize(`Application: ${etchant.app}`, rightMargin - leftMargin - 10)
      pdf.text(appLines, leftMargin + 5, yPos)
      yPos += appLines.length * lineHeight
      pdf.text(`Time: ${etchant.time}`, leftMargin + 5, yPos)
      yPos += lineHeight + 2
    })

    // Stainless Steel
    checkPageBreak(35)
    yPos += 3
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Stainless Steel', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    const stainlessEtchants = [
      { name: "Vilella's Reagent", comp: 'Picric Acid (1g), HCl (5ml), Ethanol (100ml)', app: 'General purpose, most versatile for stainless steel. Works well for most grades.', time: '5-30 sec', pace: true },
      { name: "Adler's Etchant", comp: 'Cu(NH₄)Cl₂ (9g), HCl (150ml), FeCl₃ (45g), DI Water (75ml)', app: '300 series austenitic stainless steels and superalloys', time: '5-30 sec', pace: true },
      { name: "Carpenters", comp: 'FeCl₃ (8.5g), CuCl₂ (2.4g), HCl (122ml), HNO₃ (6ml), Ethanol (122ml)', app: 'Duplex and 300 series stainless steels. Excellent for duplex grades.', time: '10-30 sec at 20°C', pace: true },
      { name: "Kallings No. 2", comp: 'CuCl₂ (5g), HCl (100ml), Ethanol (100ml)', app: 'Martensitic 400 series stainless steels. Produces good contrast.', time: '10-30 sec at 20°C', pace: true },
      { name: "Fry's Reagent", comp: 'HCl (100ml), CuCl₂ (12.5g), DI Water (75ml), Alcohol (65ml)', app: 'Martensitic and precipitation-hardening (PH) stainless steels', time: '10-30 sec', pace: true },
      { name: 'Aqua Regia', comp: '3 parts HCl : 1 part HNO₃', app: 'For austenitic stainless steels. Very aggressive - reveals grain boundaries and twin boundaries. Handle in fume hood.', time: '5-15 sec', pace: false },
      { name: 'Glyceregia', comp: 'HCl (15ml), Glycerol (10ml), HNO₃ (5ml)', app: 'For revealing sigma phase and intermetallic phases in duplex stainless steels', time: '10-30 sec', pace: false },
      { name: 'Electrolytic (10% Oxalic Acid)', comp: 'Oxalic Acid (10g), Water (100ml)', app: 'Electrolytic etching for sensitive microstructures. Use at 6V, stainless steel cathode.', time: '5-15 sec at 6V', pace: false },
    ]

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    stainlessEtchants.forEach(etchant => {
      checkPageBreak(18)
      pdf.setFont('helvetica', 'bold')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const nameText = etchant.name
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      pdf.text(nameText, leftMargin, yPos)
      if (etchant.pace) {
        pdf.setFontSize(8)
        pdf.setTextColor(37, 99, 235)
        pdf.text('(Available as pre-mixed solution)', leftMargin + 40, yPos)
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      }
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const compText = `Composition: ${etchant.comp}`
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      const compLines = pdf.splitTextToSize(compText, rightMargin - leftMargin - 10)
      pdf.text(compLines, leftMargin + 5, yPos)
      yPos += compLines.length * lineHeight
      const appLines = pdf.splitTextToSize(`Application: ${etchant.app}`, rightMargin - leftMargin - 10)
      pdf.text(appLines, leftMargin + 5, yPos)
      yPos += appLines.length * lineHeight
      pdf.text(`Time: ${etchant.time}`, leftMargin + 5, yPos)
      yPos += lineHeight + 2
    })

    // Aluminum
    checkPageBreak(35)
    yPos += 3
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Aluminum & Aluminum Alloys', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    const aluminumEtchants = [
      { name: "Keller's Reagent", comp: 'DI Water (190ml), HNO₃ (5ml), HCl (3ml), HF (2ml)', app: 'Standard etchant for aluminum and aluminum alloys. Reveals grain boundaries and precipitates. Most common.', time: '10-30 sec', pace: true, shopUrl: getEtchantShopUrl("Keller's Reagent") },
      { name: 'Al-NaOH Etchant', comp: 'NaOH (25g), Distilled water (250ml)', app: 'For aluminum alloys, reveals grain structure. Handle with care - strong base.', time: '10-30 sec', pace: true, shopUrl: getEtchantShopUrl("Al-NaOH Etchant") },
      { name: "Weck's Etch", comp: 'Ammonium bifluoride (4.5g), HCl (10ml), Water (240ml)', app: 'Color etching for phase identification. Different phases show different colors. Also used for titanium.', time: '30-90 sec', pace: true, shopUrl: getEtchantShopUrl("Weck's Etch") },
      { name: "Tucker's Reagent", comp: 'HCl (45ml), HNO₃ (15ml), HF (15ml), Water (25ml)', app: 'For revealing grain structure in aluminum alloys, especially heat-treated materials', time: '15-45 sec', pace: false, shopUrl: null },
      { name: "Electrolytic (Barker's)", comp: 'Fluoboric Acid (HBF₄)', app: 'Electrolytic etching for aluminum. Produces excellent grain boundary contrast and interference colors. Use at 15-30V DC.', time: '30-90 sec at 15-30V', pace: false, shopUrl: null },
    ]

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    aluminumEtchants.forEach(etchant => {
      checkPageBreak(18)
      pdf.setFont('helvetica', 'bold')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const nameText = etchant.name
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      pdf.text(nameText, leftMargin, yPos)
      if (etchant.pace) {
        pdf.setFontSize(8)
        pdf.setTextColor(37, 99, 235)
        pdf.text('(Available as pre-mixed solution)', leftMargin + 40, yPos)
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      }
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const compText = `Composition: ${etchant.comp}`
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      const compLines = pdf.splitTextToSize(compText, rightMargin - leftMargin - 10)
      pdf.text(compLines, leftMargin + 5, yPos)
      yPos += compLines.length * lineHeight
      const appLines = pdf.splitTextToSize(`Application: ${etchant.app}`, rightMargin - leftMargin - 10)
      pdf.text(appLines, leftMargin + 5, yPos)
      yPos += appLines.length * lineHeight
      pdf.text(`Time: ${etchant.time}`, leftMargin + 5, yPos)
      yPos += lineHeight + 2
    })

    // Copper & Brass
    checkPageBreak(35)
    yPos += 3
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Copper & Brass', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    const copperEtchants = [
      { name: 'Copper No. 1', comp: 'Nitric acid (125ml), Distilled water (125ml)', app: 'Standard etchant for copper and brass. Reveals grain boundaries and twin boundaries.', time: '5-45 sec at 20°C', pace: true, shopUrl: null },
      { name: 'Copper No. 2', comp: 'DI Water (200ml), HCl (50ml), FeCl₃ (10g)', app: 'Alternative to Copper No. 1. Effective for copper and brass alloys.', time: '10-30 sec at 20°C', pace: true, shopUrl: null },
      { name: 'ASTM No. 30', comp: 'Ammonia (62.5ml), Hydrogen Peroxide 3% (125ml), DI Water (62.5ml)', app: 'ASTM standard etchant for copper and copper alloys. Fresh solution works best.', time: '5-45 sec', pace: true, shopUrl: getEtchantShopUrl("ASTM No. 30") },
      { name: 'Ammonium Hydroxide + H₂O₂', comp: 'NH₄OH (50ml), H₂O₂ 3% (50ml)', app: 'Standard etchant for copper and brass. Reveals grain boundaries and twins. Fresh solution required.', time: '10-30 sec', pace: false, shopUrl: null },
      { name: 'Potassium Dichromate', comp: 'K₂Cr₂O₇ (2g), H₂SO₄ (8ml), NaCl sat. (4ml), Water (100ml)', app: 'For revealing grain boundaries in brass and bronze alloys. Produces good contrast.', time: '10-30 sec', pace: false, shopUrl: null },
      { name: 'Dichromate Etchant', comp: 'H₂SO₄ (36ml), DI Water (445ml), NaCl sat. (18ml), K₂Cr₂O₇ (8.9g)', app: 'For Cu-Sn (tin bronze) alloys. Reveals grain boundaries and tin phase.', time: '10-30 sec', pace: false, shopUrl: getEtchantShopUrl("Dichromate Etchant") },
      { name: 'Ammonium Persulfate', comp: '(NH₄)₂S₂O₈ (50g), Distilled water (245ml)', app: 'For brasses with cobalt. Reveals grain boundaries and phase structure.', time: '10-30 sec', pace: true, shopUrl: getEtchantShopUrl("Ammonium Persulfate") },
    ]

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    copperEtchants.forEach(etchant => {
      checkPageBreak(18)
      pdf.setFont('helvetica', 'bold')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const nameText = etchant.name
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      pdf.text(nameText, leftMargin, yPos)
      if (etchant.pace) {
        pdf.setFontSize(8)
        pdf.setTextColor(37, 99, 235)
        pdf.text('(Available as pre-mixed solution)', leftMargin + 40, yPos)
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      }
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const compText = `Composition: ${etchant.comp}`
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      const compLines = pdf.splitTextToSize(compText, rightMargin - leftMargin - 10)
      pdf.text(compLines, leftMargin + 5, yPos)
      yPos += compLines.length * lineHeight
      const appLines = pdf.splitTextToSize(`Application: ${etchant.app}`, rightMargin - leftMargin - 10)
      pdf.text(appLines, leftMargin + 5, yPos)
      yPos += appLines.length * lineHeight
      pdf.text(`Time: ${etchant.time}`, leftMargin + 5, yPos)
      yPos += lineHeight + 2
    })

    // Titanium
    checkPageBreak(35)
    yPos += 3
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Titanium & Titanium Alloys', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    const titaniumEtchants = [
      { name: "Kroll's Reagent", comp: 'DI Water (92ml), HNO₃ (6ml), HF (2ml)', app: 'Standard etchant for titanium and titanium alloys. Reveals alpha and beta phases. Most common. Very short etching time required.', time: '5-20 sec', pace: true, shopUrl: getEtchantShopUrl("Kroll's Reagent") },
      { name: "Weck's Etch", comp: 'Ammonium bifluoride (4.5g), HCl (10ml), Water (240ml)', app: 'Color etching for titanium alloys. Produces colored microstructures for phase identification. Different phases show different colors.', time: '30-90 sec', pace: true, shopUrl: getEtchantShopUrl("Weck's Etch") },
      { name: "Modified Kroll's", comp: 'DI Water (97ml), HNO₃ (2ml), HF (1ml)', app: 'Diluted version for sensitive titanium microstructures. Less aggressive than standard Kroll\'s.', time: '10-30 sec', pace: false, shopUrl: null },
      { name: "Keller's Reagent", comp: 'DI Water (190ml), HNO₃ (5ml), HCl (3ml), HF (2ml)', app: 'Also effective for titanium and titanium alloys. Can be used as alternative to Kroll\'s reagent.', time: '10-30 sec', pace: true, shopUrl: getEtchantShopUrl("Keller's Reagent") },
    ]

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    titaniumEtchants.forEach(etchant => {
      checkPageBreak(18)
      pdf.setFont('helvetica', 'bold')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const nameText = etchant.name
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      pdf.text(nameText, leftMargin, yPos)
      if (etchant.pace) {
        pdf.setFontSize(8)
        pdf.setTextColor(37, 99, 235)
        pdf.text('(Available as pre-mixed solution)', leftMargin + 40, yPos)
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      }
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const compText = `Composition: ${etchant.comp}`
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      const compLines = pdf.splitTextToSize(compText, rightMargin - leftMargin - 10)
      pdf.text(compLines, leftMargin + 5, yPos)
      yPos += compLines.length * lineHeight
      const appLines = pdf.splitTextToSize(`Application: ${etchant.app}`, rightMargin - leftMargin - 10)
      pdf.text(appLines, leftMargin + 5, yPos)
      yPos += appLines.length * lineHeight
      pdf.text(`Time: ${etchant.time}`, leftMargin + 5, yPos)
      yPos += lineHeight + 2
    })

    // Nickel Alloys
    checkPageBreak(35)
    yPos += 3
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Nickel Alloys', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    const nickelEtchants = [
      { name: 'Inconel Etchant', comp: 'Multiple Solutions (HNO₃, HCl, H₂O₂)', app: 'Macro etch for nickel alloys including Inconel. Reveals grain boundaries and macro structure. Use fresh solution only.', time: '10-30 sec', pace: true, shopUrl: getEtchantShopUrl("Inconel Etchant") },
      { name: "Marble's Reagent", comp: 'CuSO₄ (10g), HCl (50ml), Water (50ml)', app: 'For nickel, nickel-copper, and nickel-iron superalloys. Reveals grain boundaries and phases.', time: '5-60 sec', pace: true, shopUrl: getEtchantShopUrl("Marble's Reagent") },
      { name: 'Aqua Regia', comp: '3 parts HCl : 1 part HNO₃', app: 'Standard etchant for nickel alloys. Very aggressive - reveals grain boundaries and phases. Handle in fume hood.', time: '5-15 sec', pace: false, shopUrl: null },
      { name: 'Glyceregia', comp: 'HCl (15ml), Glycerol (10ml), HNO₃ (5ml)', app: 'For nickel-based superalloys. Reveals gamma prime and other phases. Excellent for superalloys.', time: '10-30 sec', pace: false, shopUrl: null },
      { name: 'ASTM 97', comp: 'KOH (187.5g), Distilled water (245ml)', app: 'Electrolytic etchant for Fe-Cr-Ni alloys. Use at 2.5V. Provides controlled etching.', time: '5-15 sec at 2.5V', pace: true, shopUrl: null },
    ]

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    nickelEtchants.forEach(etchant => {
      checkPageBreak(18)
      pdf.setFont('helvetica', 'bold')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const nameText = etchant.name
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      pdf.text(nameText, leftMargin, yPos)
      if (etchant.pace) {
        pdf.setFontSize(8)
        pdf.setTextColor(37, 99, 235)
        pdf.text('(Available as pre-mixed solution)', leftMargin + 40, yPos)
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      }
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const compText = `Composition: ${etchant.comp}`
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      const compLines = pdf.splitTextToSize(compText, rightMargin - leftMargin - 10)
      pdf.text(compLines, leftMargin + 5, yPos)
      yPos += compLines.length * lineHeight
      const appLines = pdf.splitTextToSize(`Application: ${etchant.app}`, rightMargin - leftMargin - 10)
      pdf.text(appLines, leftMargin + 5, yPos)
      yPos += appLines.length * lineHeight
      pdf.text(`Time: ${etchant.time}`, leftMargin + 5, yPos)
      yPos += lineHeight + 2
    })

    // Cast Iron
    checkPageBreak(35)
    yPos += 3
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Cast Iron', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    const castIronEtchants = [
      { name: '2% Nital', comp: 'Ethanol, HNO₃ (2%)', app: 'Standard etchant for cast iron. Reveals graphite and matrix structure. Graphite appears as dark areas.', time: '5-30 sec', pace: true, shopUrl: getEtchantShopUrl('2% Nital') },
      { name: '3% Nital', comp: 'Ethanol, HNO₃ (3%)', app: 'For cast iron requiring slightly more aggressive etching. Reveals matrix structure and graphite.', time: '5-30 sec', pace: true, shopUrl: getEtchantShopUrl('3% Nital') },
      { name: 'Picral', comp: 'Ethanol, Picric acid (2-4g/100ml)', app: 'For revealing pearlite in cast iron matrix without attacking graphite. Superior for pearlitic cast irons.', time: '10-60 sec', pace: true, shopUrl: getEtchantShopUrl('Picral Etchant') },
      { name: "Stead's Reagent", comp: 'CuCl₂ (2g), HCl (40ml), Water (30-50ml), Ethanol (25-40ml)', app: 'For revealing graphite in cast iron. Colors matrix copper color while leaving graphite dark. Excellent for nodular cast iron.', time: '30-90 sec', pace: false, shopUrl: null },
      { name: "Klemm's Reagent", comp: 'Na₂S₂O₃ solution (250ml sat.), K₂S₂O₅ (5g)', app: 'Color etching for cast iron, brass, bronze, and steel. Reveals structure through color contrast.', time: 'Seconds to minutes', pace: true, shopUrl: getEtchantShopUrl("Klemm's Reagent") },
    ]

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    castIronEtchants.forEach(etchant => {
      checkPageBreak(18)
      pdf.setFont('helvetica', 'bold')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const nameText = etchant.name
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      pdf.text(nameText, leftMargin, yPos)
      if (etchant.pace) {
        pdf.setFontSize(8)
        pdf.setTextColor(37, 99, 235)
        pdf.text('(Available as pre-mixed solution)', leftMargin + 40, yPos)
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      }
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const compText = `Composition: ${etchant.comp}`
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      const compLines = pdf.splitTextToSize(compText, rightMargin - leftMargin - 10)
      pdf.text(compLines, leftMargin + 5, yPos)
      yPos += compLines.length * lineHeight
      const appLines = pdf.splitTextToSize(`Application: ${etchant.app}`, rightMargin - leftMargin - 10)
      pdf.text(appLines, leftMargin + 5, yPos)
      yPos += appLines.length * lineHeight
      pdf.text(`Time: ${etchant.time}`, leftMargin + 5, yPos)
      yPos += lineHeight + 2
    })

    // Tool Steel
    checkPageBreak(35)
    yPos += 3
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Tool Steel', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    const toolSteelEtchants = [
      { name: '5% Nital', comp: 'Ethanol, HNO₃ (5%)', app: 'General purpose for tool steels. Reveals martensite and retained austenite.', time: '5-30 sec', pace: true },
      { name: '8% Nital', comp: 'Ethanol, HNO₃ (8%)', app: 'For very hard tool steels requiring aggressive etching. Reveals martensite and complex structures.', time: '5-30 sec', pace: true },
      { name: 'Picral', comp: 'Ethanol, Picric acid (2-4g/100ml)', app: 'For revealing carbides in tool steels without attacking matrix. Excellent for carbide visualization.', time: '10-60 sec', pace: true },
      { name: "Beraha's Etchant", comp: 'Distilled water (250ml), Na₂S₂O₃ (25g), K₂S₂O₅ (7.5g)', app: 'Color etching for tool steel. Colors ferrite, martensite, and other phases differently. Useful for phase identification.', time: '30-120 sec', pace: true },
      { name: "Murakami's Reagent", comp: 'K₃Fe(CN)₆ (10g), KOH (10g), Water (100ml)', app: 'For revealing carbides in tool steels. Colors different carbides differently. Mix KOH + Water first, then add K₃Fe(CN)₆.', time: '30-120 sec', pace: true, shopUrl: getEtchantShopUrl("Murakami's Reagent") },
    ]

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    toolSteelEtchants.forEach(etchant => {
      checkPageBreak(18)
      pdf.setFont('helvetica', 'bold')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const nameText = etchant.name
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      pdf.text(nameText, leftMargin, yPos)
      if (etchant.pace) {
        pdf.setFontSize(8)
        pdf.setTextColor(37, 99, 235)
        pdf.text('(Available as pre-mixed solution)', leftMargin + 40, yPos)
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      }
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode subscripts with ASCII equivalents for better PDF rendering
      const compText = `Composition: ${etchant.comp}`
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
        .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₀/g, '0')
        .replace(/₁/g, '1')
      const compLines = pdf.splitTextToSize(compText, rightMargin - leftMargin - 10)
      pdf.text(compLines, leftMargin + 5, yPos)
      yPos += compLines.length * lineHeight
      const appLines = pdf.splitTextToSize(`Application: ${etchant.app}`, rightMargin - leftMargin - 10)
      pdf.text(appLines, leftMargin + 5, yPos)
      yPos += appLines.length * lineHeight
      pdf.text(`Time: ${etchant.time}`, leftMargin + 5, yPos)
      yPos += lineHeight + 2
    })

    // Safety Notes
    checkPageBreak(25)
    yPos += 3
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(200, 0, 0)
    pdf.text('Safety Guidelines', leftMargin, yPos)
    yPos += lineHeight + 1
    // Underline
    pdf.setDrawColor(200, 0, 0)
    pdf.setLineWidth(0.5)
    pdf.line(leftMargin, yPos, rightMargin, yPos)
    yPos += lineHeight + 2
    pdf.setTextColor(0, 0, 0)

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'normal')
    const safetyNotes = [
      'Always work in a well-ventilated area or fume hood',
      'Wear appropriate PPE (gloves, goggles, lab coat)',
      'Handle acids and corrosive chemicals with extreme care',
      'Store etchants in properly labeled containers',
      'Dispose of used etchants according to local regulations',
      'Never mix incompatible chemicals',
      'Have emergency eyewash and safety shower available',
    ]
    safetyNotes.forEach(note => {
      checkPageBreak(8)
      pdf.text(`• ${note}`, leftMargin + 5, yPos)
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

    pdf.save('Common-Etchants-Reference-Guide.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / Common Etchants Reference Guide
          </nav>

          {/* Header */}
          <div className="mb-8 mt-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Common Etchants Reference Guide</h1>
            <p className="text-xl text-gray-600">
              Comprehensive quick reference guide to common etching reagents and their applications for metallographic sample preparation. 
              Includes both commercially available pre-mixed solutions and other commonly used etchants that can be prepared in-house.
            </p>
          </div>

          {/* Download Button */}
          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Download PDF Guide</h2>
                <p className="text-gray-600 text-sm">
                  Get a comprehensive printable reference guide with common etchants organized by material type, including compositions, applications, and etching times. 
                  Includes both commercially available pre-mixed solutions and other widely used etchants.
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
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Etchants marked with <span className="text-primary-600 font-semibold">(Available as pre-mixed solution)</span> are available commercially as pre-mixed solutions. 
                  Other etchants are commonly used in practice and can be prepared in-house.
                </p>
              </div>

              <section>
                <h3 className="text-lg font-semibold mb-3">Carbon Steel / Low Alloy Steel</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">2% Nital</h4>
                      <span className="text-xs text-primary-600 font-semibold">(Available as pre-mixed solution)</span>
                    </div>
                    {getEtchantShopUrl('2% Nital') && (
                      <a 
                        href={getEtchantShopUrl('2% Nital')!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:underline mb-2 inline-block"
                      >
                        View Product Details →
                      </a>
                    )}
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> Ethanol, HNO₃ (2%)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> General purpose, reveals ferrite grain boundaries and pearlite. Ideal for softer steels.</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 5-30 seconds</p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">3% Nital</h4>
                      <span className="text-xs text-primary-600 font-semibold">(Available as pre-mixed solution)</span>
                    </div>
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> Ethanol, HNO₃ (3%)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> Standard concentration for most carbon steels. Most commonly used.</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 5-30 seconds</p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">Picral</h4>
                      <span className="text-xs text-primary-600 font-semibold">(Available as pre-mixed solution)</span>
                    </div>
                    {getEtchantShopUrl('Picral Etchant') && (
                      <a 
                        href={getEtchantShopUrl('Picral Etchant')!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:underline mb-2 inline-block"
                      >
                        View Product Details →
                      </a>
                    )}
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> Ethanol, Picric acid (2-4g/100ml)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> Reveals cementite and pearlite, does not attack ferrite boundaries. Superior for pearlite structures.</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 10-60 seconds</p>
                  </div>
                  <div className="border-l-4 border-gray-400 pl-4">
                    <h4 className="font-semibold">Sodium Metabisulfite (10%)</h4>
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> Na₂S₂O₅ (10g), Water (100ml)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> For revealing prior austenite grain boundaries in quenched and tempered steels</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 10-30 seconds</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Stainless Steel</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">Vilella's Reagent</h4>
                      <span className="text-xs text-primary-600 font-semibold">(Available as pre-mixed solution)</span>
                    </div>
                    {getEtchantShopUrl("Vilella's Reagent") && (
                      <a 
                        href={getEtchantShopUrl("Vilella's Reagent")!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:underline mb-2 inline-block"
                      >
                        View Product Details →
                      </a>
                    )}
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> Picric Acid (1g), HCl (5ml), Ethanol (100ml)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> General purpose, most versatile for stainless steel. Works well for most grades.</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 5-30 seconds</p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">Adler's Etchant</h4>
                      <span className="text-xs text-primary-600 font-semibold">(Available as pre-mixed solution)</span>
                    </div>
                    {getEtchantShopUrl("Adler's Etchant") && (
                      <a 
                        href={getEtchantShopUrl("Adler's Etchant")!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:underline mb-2 inline-block"
                      >
                        View Product Details →
                      </a>
                    )}
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> Cu(NH₄)Cl₂ (9g), HCl (150ml), FeCl₃ (45g), DI Water (75ml)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> 300 series austenitic stainless steels and superalloys</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 5-30 seconds</p>
                  </div>
                  <div className="border-l-4 border-gray-400 pl-4">
                    <h4 className="font-semibold">Aqua Regia</h4>
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> 3 parts HCl : 1 part HNO₃</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> For austenitic stainless steels. Very aggressive - reveals grain boundaries and twin boundaries. Handle in fume hood.</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 5-15 seconds</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Aluminum & Aluminum Alloys</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">Keller's Reagent</h4>
                      <span className="text-xs text-primary-600 font-semibold">(Available as pre-mixed solution)</span>
                    </div>
                    {getEtchantShopUrl("Keller's Reagent") && (
                      <a 
                        href={getEtchantShopUrl("Keller's Reagent")!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:underline mb-2 inline-block"
                      >
                        View Product Details →
                      </a>
                    )}
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> DI Water (190ml), HNO₃ (5ml), HCl (3ml), HF (2ml)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> Standard etchant for aluminum and aluminum alloys. Reveals grain boundaries and precipitates. Most common.</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 10-30 seconds</p>
                  </div>
                  <div className="border-l-4 border-gray-400 pl-4">
                    <h4 className="font-semibold">Tucker's Reagent</h4>
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> HCl (45ml), HNO₃ (15ml), HF (15ml), Water (25ml)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> For revealing grain structure in aluminum alloys, especially heat-treated materials</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 15-45 seconds</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Nickel Alloys</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">Inconel Etchant</h4>
                      <span className="text-xs text-primary-600 font-semibold">(Available as pre-mixed solution)</span>
                    </div>
                    {getEtchantShopUrl("Inconel Etchant") && (
                      <a 
                        href={getEtchantShopUrl("Inconel Etchant")!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:underline mb-2 inline-block"
                      >
                        View Product Details →
                      </a>
                    )}
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> Multiple Solutions (HNO₃, HCl, H₂O₂)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> Macro etch for nickel alloys including Inconel. Use fresh solution only.</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 10-30 seconds</p>
                  </div>
                  <div className="border-l-4 border-gray-400 pl-4">
                    <h4 className="font-semibold">Glyceregia</h4>
                    <p className="text-sm text-gray-600"><strong>Composition:</strong> HCl (15ml), Glycerol (10ml), HNO₃ (5ml)</p>
                    <p className="text-sm text-gray-600"><strong>Application:</strong> For nickel-based superalloys. Reveals gamma prime and other phases. Excellent for superalloys.</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> 10-30 seconds</p>
                  </div>
                </div>
              </section>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <h4 className="font-semibold text-red-800 mb-2">Safety Guidelines</h4>
                <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                  <li>Always work in a well-ventilated area or fume hood</li>
                  <li>Wear appropriate PPE (gloves, goggles, lab coat)</li>
                  <li>Handle acids and corrosive chemicals with extreme care</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Use our interactive Etchant Selector tool or check out our comprehensive guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/tools/etchant-selector" className="text-primary-600 font-semibold hover:underline">
                Use Etchant Selector Tool →
              </Link>
              <Link href="/guides" className="text-primary-600 font-semibold hover:underline">
                Browse Guides →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

