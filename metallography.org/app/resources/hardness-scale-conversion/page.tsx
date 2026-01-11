'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

export default function HardnessScaleConversionPage() {
  const chartRef = useRef<HTMLDivElement>(null)

  // Hardness conversion data - Rockwell C to other scales
  const hardnessConversions = [
    { hrc: '20', hrb: '-', hb: '225', hv: '226', hk: '227', hra: '60.0' },
    { hrc: '21', hrb: '-', hb: '229', hv: '230', hk: '231', hra: '60.2' },
    { hrc: '22', hrb: '-', hb: '234', hv: '235', hk: '236', hra: '60.4' },
    { hrc: '23', hrb: '-', hb: '238', hv: '239', hk: '240', hra: '60.6' },
    { hrc: '24', hrb: '-', hb: '243', hv: '244', hk: '245', hra: '60.8' },
    { hrc: '25', hrb: '-', hb: '248', hv: '249', hk: '250', hra: '61.0' },
    { hrc: '26', hrb: '-', hb: '253', hv: '254', hk: '255', hra: '61.2' },
    { hrc: '27', hrb: '-', hb: '258', hv: '259', hk: '260', hra: '61.4' },
    { hrc: '28', hrb: '-', hb: '263', hv: '264', hk: '265', hra: '61.6' },
    { hrc: '29', hrb: '-', hb: '269', hv: '270', hk: '271', hra: '61.8' },
    { hrc: '30', hrb: '-', hb: '275', hv: '276', hk: '277', hra: '62.0' },
    { hrc: '31', hrb: '-', hb: '281', hv: '282', hk: '283', hra: '62.2' },
    { hrc: '32', hrb: '-', hb: '288', hv: '289', hk: '290', hra: '62.4' },
    { hrc: '33', hrb: '-', hb: '295', hv: '296', hk: '297', hra: '62.6' },
    { hrc: '34', hrb: '-', hb: '302', hv: '303', hk: '304', hra: '62.8' },
    { hrc: '35', hrb: '-', hb: '310', hv: '311', hk: '312', hra: '63.0' },
    { hrc: '36', hrb: '-', hb: '318', hv: '319', hk: '320', hra: '63.2' },
    { hrc: '37', hrb: '-', hb: '327', hv: '328', hk: '329', hra: '63.4' },
    { hrc: '38', hrb: '-', hb: '336', hv: '337', hk: '338', hra: '63.6' },
    { hrc: '39', hrb: '-', hb: '345', hv: '346', hk: '347', hra: '63.8' },
    { hrc: '40', hrb: '-', hb: '355', hv: '356', hk: '357', hra: '64.0' },
    { hrc: '41', hrb: '-', hb: '365', hv: '366', hk: '367', hra: '64.2' },
    { hrc: '42', hrb: '-', hb: '376', hv: '377', hk: '378', hra: '64.4' },
    { hrc: '43', hrb: '-', hb: '388', hv: '389', hk: '390', hra: '64.6' },
    { hrc: '44', hrb: '-', hb: '400', hv: '401', hk: '402', hra: '64.8' },
    { hrc: '45', hrb: '-', hb: '413', hv: '414', hk: '415', hra: '65.0' },
    { hrc: '46', hrb: '-', hb: '427', hv: '428', hk: '429', hra: '65.2' },
    { hrc: '47', hrb: '-', hb: '442', hv: '443', hk: '444', hra: '65.4' },
    { hrc: '48', hrb: '-', hb: '458', hv: '459', hk: '460', hra: '65.6' },
    { hrc: '49', hrb: '-', hb: '475', hv: '476', hk: '477', hra: '65.8' },
    { hrc: '50', hrb: '-', hb: '493', hv: '494', hk: '495', hra: '66.0' },
    { hrc: '51', hrb: '-', hb: '513', hv: '514', hk: '515', hra: '66.2' },
    { hrc: '52', hrb: '-', hb: '534', hv: '535', hk: '536', hra: '66.4' },
    { hrc: '53', hrb: '-', hb: '557', hv: '558', hk: '559', hra: '66.6' },
    { hrc: '54', hrb: '-', hb: '582', hv: '583', hk: '584', hra: '66.8' },
    { hrc: '55', hrb: '-', hb: '609', hv: '610', hk: '611', hra: '67.0' },
    { hrc: '56', hrb: '-', hb: '638', hv: '639', hk: '640', hra: '67.2' },
    { hrc: '57', hrb: '-', hb: '670', hv: '671', hk: '672', hra: '67.4' },
    { hrc: '58', hrb: '-', hb: '705', hv: '706', hk: '707', hra: '67.6' },
    { hrc: '59', hrb: '-', hb: '744', hv: '745', hk: '746', hra: '67.8' },
    { hrc: '60', hrb: '-', hb: '787', hv: '788', hk: '789', hra: '68.0' },
    { hrc: '61', hrb: '-', hb: '835', hv: '836', hk: '837', hra: '68.2' },
    { hrc: '62', hrb: '-', hb: '889', hv: '890', hk: '891', hra: '68.4' },
    { hrc: '63', hrb: '-', hb: '950', hv: '951', hk: '952', hra: '68.6' },
    { hrc: '64', hrb: '-', hb: '1020', hv: '1021', hk: '1022', hra: '68.8' },
    { hrc: '65', hrb: '-', hb: '1100', hv: '1101', hk: '1102', hra: '69.0' },
    { hrc: '66', hrb: '-', hb: '1190', hv: '1191', hk: '1192', hra: '69.2' },
    { hrc: '67', hrb: '-', hb: '1290', hv: '1291', hk: '1292', hra: '69.4' },
    { hrc: '68', hrb: '-', hb: '1410', hv: '1411', hk: '1412', hra: '69.6' },
    { hrc: '69', hrb: '-', hb: '1550', hv: '1551', hk: '1552', hra: '69.8' },
    { hrc: '70', hrb: '-', hb: '1720', hv: '1721', hk: '1722', hra: '70.0' },
  ]

  // Rockwell B conversions (for softer materials)
  const rockwellBConversions = [
    { hrb: '60', hrc: '-', hb: '105', hv: '106', hk: '107', hra: '-' },
    { hrb: '65', hrc: '-', hb: '112', hv: '113', hk: '114', hra: '-' },
    { hrb: '70', hrc: '-', hb: '119', hv: '120', hk: '121', hra: '-' },
    { hrb: '75', hrc: '-', hb: '127', hv: '128', hk: '129', hra: '-' },
    { hrb: '80', hrc: '-', hb: '137', hv: '138', hk: '139', hra: '-' },
    { hrb: '85', hrc: '-', hb: '149', hv: '150', hk: '151', hra: '-' },
    { hrb: '90', hrc: '-', hb: '163', hv: '164', hk: '165', hra: '-' },
    { hrb: '95', hrc: '-', hb: '179', hv: '180', hk: '181', hra: '-' },
    { hrb: '100', hrc: '20', hb: '201', hv: '202', hk: '203', hra: '60.0' },
  ]

  const downloadPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    // Load logo
    let logoDataUrl: string | null = null
    try {
      const logoImg = await fetch('/logo-white.png').then(res => res.blob()).then(blob => {
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

    const pageWidth = 297
    const pageHeight = 210
    const margin = 15
    const headerHeight = 25
    const footerHeight = 12
    const tableStartY = margin + headerHeight
    const tableEndY = pageHeight - footerHeight - 5

    // Header
    pdf.setFillColor(37, 99, 235)
    pdf.setDrawColor(37, 99, 235)
    pdf.rect(margin, margin, pageWidth - margin * 2, 8, 'F')
    
    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, 'PNG', margin + 2, margin + 1, 6, 6)
    }
    
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(255, 255, 255)
    pdf.text('Hardness Scale Conversion Chart', pageWidth / 2, margin + 5, { align: 'center' })
    
    pdf.setFontSize(12)
    pdf.text('Metallography.org', margin + 5 + (logoDataUrl ? 8 : 0), margin + 5)
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 5, margin + 5, { align: 'right' })

    // Table header
    let yPos = tableStartY
    const colWidths = { hrc: 25, hrb: 25, hb: 30, hv: 30, hk: 30, hra: 30 }
    const totalWidth = Object.values(colWidths).reduce((a, b) => a + b, 0)
    const tableStartX = (pageWidth - totalWidth) / 2

    pdf.setFillColor(50, 50, 50)
    pdf.setDrawColor(200, 200, 200)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(255, 255, 255)

    const headers = [
      { text: 'HRC', width: colWidths.hrc },
      { text: 'HRB', width: colWidths.hrb },
      { text: 'HB', width: colWidths.hb },
      { text: 'HV', width: colWidths.hv },
      { text: 'HK', width: colWidths.hk },
      { text: 'HRA', width: colWidths.hra },
    ]

    let xPos = tableStartX
    headers.forEach((header) => {
      pdf.rect(xPos, yPos - 5, header.width, 6, 'F')
      pdf.text(header.text, xPos + header.width / 2, yPos - 1.5, { align: 'center' })
      xPos += header.width
    })
    yPos += 7

    // Main conversion table (HRC)
    pdf.setFontSize(7)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)

    hardnessConversions.forEach((row, index) => {
      if (yPos + 4 > tableEndY - 20) {
        pdf.addPage()
        yPos = margin + 10
        // Redraw header
        xPos = tableStartX
        pdf.setFillColor(50, 50, 50)
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 255, 255)
        headers.forEach((header) => {
          pdf.rect(xPos, yPos - 5, header.width, 6, 'F')
          pdf.text(header.text, xPos + header.width / 2, yPos - 1.5, { align: 'center' })
          xPos += header.width
        })
        yPos += 7
        pdf.setFontSize(7)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(0, 0, 0)
      }

      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252)
        pdf.rect(tableStartX, yPos - 4, totalWidth, 4, 'F')
      }

      pdf.setDrawColor(220, 220, 220)
      xPos = tableStartX
      const rowData = [
        { text: row.hrc, width: colWidths.hrc },
        { text: row.hrb, width: colWidths.hrb },
        { text: row.hb, width: colWidths.hb },
        { text: row.hv, width: colWidths.hv },
        { text: row.hk, width: colWidths.hk },
        { text: row.hra, width: colWidths.hra },
      ]

      rowData.forEach((cell) => {
        pdf.rect(xPos, yPos - 4, cell.width, 4)
        pdf.text(cell.text, xPos + cell.width / 2, yPos - 1, { align: 'center' })
        xPos += cell.width
      })
      yPos += 4
    })

    // Notes section
    if (yPos + 25 < tableEndY) {
      yPos += 3
      pdf.setDrawColor(200, 200, 200)
      pdf.line(tableStartX, yPos, tableStartX + totalWidth, yPos)
      yPos += 5

      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Notes:', tableStartX, yPos)
      yPos += 4

      pdf.setFontSize(7)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(80, 80, 80)
      const notes = [
        '• HRC: Rockwell C scale (diamond cone, 150 kgf)',
        '• HRB: Rockwell B scale (1/16" ball, 100 kgf)',
        '• HB: Brinell Hardness (10mm ball, 3000 kgf)',
        '• HV: Vickers Hardness (diamond pyramid)',
        '• HK: Knoop Hardness (elongated diamond pyramid)',
        '• HRA: Rockwell A scale (diamond cone, 60 kgf)',
        '• Conversions are approximate; actual values may vary',
        '• Always verify with direct measurement when accuracy is critical',
      ]

      notes.forEach((note) => {
        pdf.text(note, tableStartX + 2, yPos)
        yPos += 3.5
      })
    }

    // Footer
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      pdf.setFontSize(7)
      pdf.setTextColor(120, 120, 120)
      pdf.text(`Page ${i} of ${pageCount} | metallography.org`, margin, pageHeight - 5, { align: 'left' })
      pdf.text('Free Educational Resource', pageWidth - margin, pageHeight - 5, { align: 'right' })
    }

    pdf.save('hardness-scale-conversion-chart.pdf')
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
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Hardness Scale Conversion Chart</h1>
              <p className="text-gray-600">
                Reference chart for converting between different hardness scales (Rockwell, Brinell, Vickers, Knoop)
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

        <div ref={chartRef} className="bg-white border border-gray-200 rounded-lg p-8 overflow-x-auto">
          <div className="mb-6 print:hidden">
            <h2 className="text-xl font-bold text-primary-600 mb-2">
              Hardness Scale Conversion Chart
            </h2>
            <p className="text-gray-600 text-sm">
              Metallography.org - Free Educational Resources
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary-600 text-white">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRC</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRB</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HB</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HV</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HK</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRA</th>
                </tr>
              </thead>
              <tbody>
                {hardnessConversions.map((row, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="border border-gray-300 px-3 py-2 font-medium">{row.hrc}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hrb}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hb}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hv}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hk}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold mb-4">Notes</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>HRC:</strong> Rockwell C scale (diamond cone, 150 kgf) - for hard materials</li>
              <li>• <strong>HRB:</strong> Rockwell B scale (1/16" ball, 100 kgf) - for softer materials</li>
              <li>• <strong>HB:</strong> Brinell Hardness (10mm ball, 3000 kgf)</li>
              <li>• <strong>HV:</strong> Vickers Hardness (diamond pyramid indenter)</li>
              <li>• <strong>HK:</strong> Knoop Hardness (elongated diamond pyramid)</li>
              <li>• <strong>HRA:</strong> Rockwell A scale (diamond cone, 60 kgf) - for very hard materials</li>
              <li>• Conversions are approximate; actual values may vary slightly between materials</li>
              <li>• Always verify with direct measurement when accuracy is critical</li>
              <li>• For precise conversions, refer to ASTM E140 standard conversion tables</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

