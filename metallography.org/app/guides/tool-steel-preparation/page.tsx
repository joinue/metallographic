import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('tool-steel-preparation')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'sectioning', label: 'Sectioning' },
  { id: 'mounting', label: 'Mounting' },
  { id: 'grinding', label: 'Grinding' },
  { id: 'polishing', label: 'Polishing' },
  { id: 'etching', label: 'Etching' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function ToolSteelGuide() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData } = getGuideStructuredData(guide)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <article className="py-12">
      <GuideSideNav sections={sections} />
      <div className="container-custom lg:pl-0 xl:pl-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Tool Steel and Hardened Steel Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Tool Steel and Hardened Steel Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing very hard tool steels and hardened steels for metallographic analysis, 
              with emphasis on preserving carbides and revealing complex microstructures.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#sectioning" className="text-primary-600 hover:underline">Sectioning</a></li>
              <li><a href="#mounting" className="text-primary-600 hover:underline">Mounting</a></li>
              <li><a href="#grinding" className="text-primary-600 hover:underline">Grinding</a></li>
              <li><a href="#polishing" className="text-primary-600 hover:underline">Polishing</a></li>
              <li><a href="#etching" className="text-primary-600 hover:underline">Etching</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Tool steels and hardened steels are among the most challenging materials to prepare for metallographic 
                analysis. These materials are very hard (typically 200-450 HB, 20-50 HRC) and contain complex carbide 
                structures that must be preserved throughout preparation. The high hardness requires extended grinding 
                and polishing times, while the presence of carbides demands careful techniques to avoid pullout or damage.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                <p className="text-sm text-red-900">
                  <strong>Critical Principle:</strong> Carbide preservation is essential. Carbides are hard, brittle 
                  phases that can be pulled out during grinding and polishing, leaving voids in the microstructure. 
                  Extended preparation times and careful monitoring are required.
                </p>
              </div>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/1095 Steel water quenched, martensite, Vilellas, 1000X.JPG"
                  alt="Tool steel microstructure showing martensite structure, properly prepared and etched"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">1095 Steel water quenched to martensite, Vilella's reagent, 1000X magnification. Tool steels and hardened steels typically show martensitic structures with carbides. Proper preparation preserves carbides while revealing the matrix microstructure.</p>
              </div>
              <p>
                This guide covers several categories of very hard materials:
              </p>
              <ul>
                <li><strong>Tool Steels:</strong> Air-hardening (<MaterialTooltip materialName="A2 Air-Hardening Tool Steel">A2</MaterialTooltip>, <MaterialTooltip materialName="A4 Air-Hardening Tool Steel">A4</MaterialTooltip>, <MaterialTooltip materialName="A6 Air-Hardening Tool Steel">A6</MaterialTooltip>), oil-hardening (O1), high-speed steels (<MaterialTooltip materialName="M2 High-Speed Steel">M2</MaterialTooltip>, <MaterialTooltip materialName="M42 High-Speed Steel">M42</MaterialTooltip>), hot-work (<MaterialTooltip materialName="H11 Hot-Work Tool Steel">H11</MaterialTooltip>, <MaterialTooltip materialName="H13 Hot-Work Tool Steel">H13</MaterialTooltip>, <MaterialTooltip materialName="H21 Hot-Work Tool Steel">H21</MaterialTooltip>), and cold-work (<MaterialTooltip materialName="D2 Tool Steel">D2</MaterialTooltip>) tool steels</li>
                <li><strong>Through-Hardened Steels:</strong> Steels like <MaterialTooltip materialName="AISI 1080 High Carbon Steel">1080</MaterialTooltip>, <MaterialTooltip materialName="AISI 52100 Bearing Steel">52100</MaterialTooltip>, and <MaterialTooltip materialName="AISI 4340 Nickel-Chromium-Molybdenum Steel">4340</MaterialTooltip> in their hardened condition</li>
                <li><strong>Case-Hardened Steels:</strong> Carburized or nitrided steels like <MaterialTooltip materialName="AISI 8620 Case-Hardening Steel">8620</MaterialTooltip> and <MaterialTooltip materialName="AISI 9310 Case-Hardening Steel">9310</MaterialTooltip> with hardened surface layers</li>
              </ul>
              <p>
                All of these materials share common preparation challenges: very high hardness, presence of carbides, 
                and the need for extended preparation times. The techniques described here apply to all of them, with 
                specific notes for particular material types.
              </p>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                When sectioning tool steels and hardened steels, use slow cutting speeds to minimize heat generation 
                and prevent phase transformation. These materials are very hard and generate significant heat during 
                cutting. Use appropriate blades designed for hard materials.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-vhs.png"
                    alt="MAX-VHS abrasive cut-off blades for tool steel and hardened steel sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">MAX-VHS abrasive cut-off blades designed for very hard and case-hardened steels. These blades are essential for tool steels and hardened steels.</p>
              </div>
              <ul>
                <li>Use <strong>MAX-VHS series blades</strong> designed for very hard materials</li>
                <li>Use <strong>slow cutting speeds</strong> (80-150 RPM) to minimize heat generation</li>
                <li>Use a thin abrasive cut-off wheel (0.5-1.0 mm thickness)</li>
                <li>Apply steady, moderate pressure - avoid forcing</li>
                <li>Use <strong>adequate coolant</strong> to prevent overheating and phase transformation</li>
                <li>Allow the wheel to do the cutting - these materials are very hard</li>
              </ul>
              <p>
                <strong>Important:</strong> For case-hardened steels, cut perpendicular to the case to preserve the 
                case-core interface. For through-hardened steels, standard cutting techniques apply, but use slower 
                speeds due to high hardness.
              </p>
              <ProductLink 
                productName="MAX-VHS Abrasive Blades"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="MAX-VHS blades specifically designed for very hard and case-hardened steels"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For tool steels and hardened steels, compression 
                mounting with phenolic resin is strongly recommended for better edge retention, especially for case-hardened 
                steels where the case-core interface must be preserved.
              </p>
              <h3>Compression Mounting</h3>
              <p>
                Phenolic resin provides excellent edge retention, which is critical for case-hardened steels and for 
                preserving carbide structures near edges.
              </p>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>Place sample in mounting press with phenolic resin (preferred) or epoxy</li>
                <li>Apply pressure: <strong>3000-4000 psi for phenolic</strong>, 2000-3000 psi for epoxy</li>
                <li>Heat to 150-180°C and hold for 5-8 minutes</li>
                <li>Cool under pressure to room temperature</li>
              </ol>
              <p>
                <strong>For Case-Hardened Steels:</strong> Mount with the case edge exposed if you need to analyze the 
                case depth. Ensure proper edge retention to preserve the case-core interface.
              </p>
              <ProductLink 
                productName="Compression Mounting Equipment"
                href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                description="Automatic and manual mounting presses for consistent results"
              />
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding</h2>
              <p>
                Grinding removes sectioning damage and prepares the surface for polishing. For tool steels and hardened 
                steels, use <strong>extended grinding sequences</strong> with <strong>longer times per step</strong> due 
                to the very high hardness. The presence of carbides requires careful technique to avoid pullout.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> These materials are very hard and require extended grinding times. 
                  Expect 60-120 seconds per grit, significantly longer than softer materials. Carbides can be pulled 
                  out if grinding is too aggressive - use consistent, moderate pressure.
                </p>
              </div>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/abrasive grinding-SiC papers.webp"
                    alt="Silicon carbide grinding papers in various grit sizes for progressive grinding of tool steels"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (120, 240, 400, 600, 800, 1200) for progressive grinding. Extended sequences and longer times are required for very hard tool steels.</p>
              </div>
              <h3>Grinding Sequence</h3>
              <p>
                For tool steels and hardened steels, use an <strong>extended grinding sequence</strong>:
              </p>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage (60-120 seconds per step, moderate pressure)</li>
                <li><strong>240 grit:</strong> Remove previous scratches (60-120 seconds, moderate pressure)</li>
                <li><strong>320 grit:</strong> Further refinement (60-120 seconds, moderate pressure)</li>
                <li><strong>400 grit:</strong> Additional refinement (60-120 seconds, moderate pressure)</li>
                <li><strong>600 grit:</strong> Final grinding step (60-120 seconds, moderate pressure)</li>
                <li><strong>800 grit (optional):</strong> For high-quality work (60-120 seconds, moderate pressure)</li>
                <li><strong>1200 grit (optional):</strong> For very high-quality work (60-120 seconds, moderate pressure)</li>
              </ol>
              <p>
                <strong>Critical Guidelines:</strong>
              </p>
              <ul>
                <li>Use <strong>extended times</strong> (60-120 seconds per grit) - these materials are very hard</li>
                <li>Use <strong>consistent, moderate pressure</strong> - avoid excessive pressure that could pull out carbides</li>
                <li>Rotate the sample 90° between each grit to ensure complete removal of previous scratches</li>
                <li>Use water as a lubricant and maintain consistent pressure</li>
                <li>Monitor the surface - if carbides start to pull out, reduce pressure slightly</li>
                <li>For case-hardened steels, be especially careful near the case-core interface</li>
              </ul>
              <p>
                <strong>Note:</strong> The optional 800 and 1200 grit steps are recommended for high-quality work, 
                especially for carbide-rich materials like high-speed steels (<MaterialTooltip materialName="M2 High-Speed Steel">M2</MaterialTooltip>, <MaterialTooltip materialName="M42 High-Speed Steel">M42</MaterialTooltip>) and <MaterialTooltip materialName="D2 Tool Steel">D2</MaterialTooltip> tool steel.
              </p>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Premium SiC papers in all grit sizes for consistent grinding"
              />
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing</h2>
              <p>
                Polishing removes grinding scratches and prepares a mirror-like surface. For tool steels and hardened 
                steels, use <strong>extended polishing sequences</strong> with <strong>longer times per step</strong> due 
                to the very high hardness. Carbide preservation is critical - use appropriate cloths and techniques to 
                avoid pullout.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Key Principle:</strong> Carbides are hard, brittle phases that can be pulled out during 
                  polishing, leaving voids in the microstructure. Use appropriate cloth hardness and extended times 
                  to preserve carbides while achieving a good surface finish.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polycrystalline-diamond-high-viscosity.webp"
                      alt="Polycrystalline diamond polishing compound for tool steels"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound for polishing tool steels. Extended times are required due to high hardness.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/polishing-pads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polishing-pads.webp"
                      alt="Polishing pads for different polishing stages"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths. Use appropriate cloth hardness to preserve carbides while achieving good surface finish.</p>
                </div>
              </div>
              <h3>Diamond Polishing</h3>
              <p>
                Use an extended diamond polishing sequence with longer times:
              </p>
              <ol>
                <li><strong>9 μm diamond:</strong> 5-8 minutes on a hard cloth (e.g., Texmet), moderate pressure</li>
                <li><strong>6 μm diamond:</strong> 5-8 minutes on a medium-hard cloth, moderate pressure</li>
                <li><strong>3 μm diamond:</strong> 5-8 minutes on a medium-hard cloth, moderate pressure</li>
                <li><strong>1 μm diamond:</strong> 3-5 minutes on a soft cloth, lighter pressure</li>
              </ol>
              <h3>Final Polishing</h3>
              <ol>
                <li><strong>0.05 μm colloidal silica:</strong> 2-3 minutes on a soft cloth, light pressure</li>
                <li>Rinse thoroughly with water and dry with compressed air</li>
              </ol>
              <p>
                <strong>Critical Guidelines:</strong>
              </p>
              <ul>
                <li>Use <strong>extended times</strong> (5-8 minutes per diamond step) - these materials are very hard</li>
                <li>Use <strong>appropriate cloth hardness</strong> - harder cloths for coarser steps, softer for fine steps</li>
                <li>Use <strong>moderate pressure</strong> for diamond steps, lighter for final polishing</li>
                <li>Monitor the surface - carbides should remain intact, not pulled out</li>
                <li>Avoid over-polishing - extended times can cause relief around carbides</li>
                <li>For case-hardened steels, be especially careful near the case-core interface</li>
              </ul>
              <p>
                <strong>For High-Speed Steels (<MaterialTooltip materialName="M2 High-Speed Steel">M2</MaterialTooltip>, <MaterialTooltip materialName="M42 High-Speed Steel">M42</MaterialTooltip>):</strong> These contain complex carbides (M₆C, MC, M₂C) that 
                are particularly prone to pullout. Use softer cloths and lighter pressure, especially in the final steps.
              </p>
              <p>
                <strong>For Case-Hardened Steels:</strong> The case layer is very hard and may require even longer 
                polishing times. Be careful to preserve the case-core interface.
              </p>
              <ProductLink 
                productName="Diamond Abrasives"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond polishing compounds in various particle sizes"
              />
              <ProductLink 
                productName="Polishing Pads"
                href="https://shop.metallographic.com/collections/polishing-pads"
                description="Premium polishing pads for different polishing stages"
              />
            </section>

            <section id="etching" className="scroll-mt-24">
              <h2>Etching</h2>
              <p>
                Etching reveals the microstructure by selectively attacking grain boundaries and phases. For tool steels 
                and hardened steels, the choice of etchant depends on the material type, heat treatment, and what features 
                you want to reveal. Nital and Vilella's Reagent are the most common etchants.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt="Tool steel microstructure after proper etching, showing carbides and matrix structure"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Tool steel microstructure after proper etching. The matrix structure and carbides are revealed by appropriate etching.</p>
              </div>
              <h3>Common Etchants for Tool Steels and Hardened Steels</h3>
              <ul>
                <li><strong>2% Nital:</strong> General purpose for most tool steels and hardened steels. Reveals martensite structure and grain boundaries (2% HNO₃ in ethanol)</li>
                <li><strong>3-5% Nital:</strong> For very hard materials, higher concentrations may be needed (3-5% HNO₃ in ethanol)</li>
                <li><strong>Vilella's Reagent:</strong> Excellent for revealing carbides and martensite structure. Particularly useful for high-speed steels and tool steels with complex carbides (1g picric acid, 5ml HCl, 100ml ethanol)</li>
                <li><strong>Picral:</strong> Useful for revealing cementite and pearlite structures in some tool steels (2-4g picric acid per 100ml ethanol)</li>
                <li><strong>Murakami's Reagent:</strong> For revealing carbides in high-speed steels and tool steels (10g K₃Fe(CN)₆, 10g KOH, 100ml H₂O)</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/etchants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/etching.webp"
                    alt="Etching solutions and reagents for tool steels"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for tool steels and hardened steels. Common etchants include Nital, Vilella's Reagent, and Murakami's Reagent.</p>
              </div>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry after polishing</li>
                <li>Apply etchant with cotton swab or immerse sample</li>
                <li>Etch for 10-30 seconds (time varies by material type and hardness)</li>
                <li>Immediately rinse with water, then alcohol</li>
                <li>Dry with compressed air</li>
              </ol>
              <p>
                <strong>Important Notes:</strong>
              </p>
              <ul>
                <li>Start with shorter etching times (10-15 seconds) and increase if needed</li>
                <li>For very hard materials, longer etching times (20-30 seconds) may be needed</li>
                <li><strong>Vilella's Reagent</strong> is particularly useful for tool steels and high-speed steels with complex carbides</li>
                <li><strong>Murakami's Reagent</strong> is excellent for revealing carbides in high-speed steels (<MaterialTooltip materialName="M2 High-Speed Steel">M2</MaterialTooltip>, <MaterialTooltip materialName="M42 High-Speed Steel">M42</MaterialTooltip>)</li>
                <li>For case-hardened steels, etching reveals the case microstructure and case depth</li>
                <li>Over-etching can obscure fine details - start with shorter times</li>
              </ul>
              <p>
                <strong>For High-Speed Steels (<MaterialTooltip materialName="M2 High-Speed Steel">M2</MaterialTooltip>, <MaterialTooltip materialName="M42 High-Speed Steel">M42</MaterialTooltip>):</strong> These contain complex carbides that may require 
                specialized etchants like Murakami's Reagent to reveal properly. Vilella's Reagent is also effective.
              </p>
              <p>
                <strong>For Case-Hardened Steels:</strong> Etching reveals the case microstructure and allows 
                measurement of case depth. Use appropriate etchants to reveal the case-core interface clearly.
              </p>
              <ProductLink 
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Pre-mixed and custom etching solutions for tool steels, including Nital, Vilella's Reagent, and Murakami's Reagent"
              />
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Carbide pullout:</strong> Too much pressure during grinding or polishing, or inappropriate cloth hardness. Reduce pressure, use softer cloths for fine steps, and monitor the surface carefully. Carbides are hard and brittle and can be pulled out easily.</li>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time. These materials are very hard and require extended times (60-120 seconds per grit, 5-8 minutes per polishing step). Ensure complete scratch removal at each step.</li>
                <li><strong>Relief around carbides:</strong> Over-polishing or too soft a cloth. Reduce polishing time or use slightly harder cloth, but still maintain moderate pressure to avoid carbide pullout.</li>
                <li><strong>Contamination:</strong> Clean between steps, use fresh abrasives, and ensure proper sample cleaning.</li>
                <li><strong>Poor edge retention:</strong> Consider using phenolic mounting material or different mounting technique. For case-hardened steels, edge retention is critical for case depth measurement.</li>
                <li><strong>Over-etching:</strong> Reduce etching time or use lower etchant concentration. Start with shorter times (10-15 seconds).</li>
                <li><strong>Under-etching:</strong> Increase etching time or use higher etchant concentration. These materials are very hard and may require longer etching times (20-30 seconds).</li>
                <li><strong>Phase transformation during cutting:</strong> Use slower cutting speed and adequate coolant to prevent overheating. These materials are sensitive to heat.</li>
                <li><strong>Case-core interface not visible:</strong> For case-hardened steels, ensure proper mounting with edge exposed, use appropriate etching, and preserve edge retention throughout preparation.</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Remember:</strong> Tool steels and hardened steels are very hard and require extended 
                  preparation times. The most common mistakes are insufficient time per step and excessive pressure 
                  that causes carbide pullout. Always err on the side of longer times and careful monitoring.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Explore More Procedures</h2>
              <p className="mb-4">
                Browse our comprehensive procedure guides for material-specific preparation methods and get personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides?category=Material-Specific"
                  className="btn-primary text-center"
                >
                  Browse Procedure Guides
                </Link>
                <Link 
                  href="https://shop.metallographic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  View Example Products
                </Link>
                <Link 
                  href="https://metallographic.com/equipment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Browse Equipment Examples
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/carbon-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Carbon Steel Preparation
                </Link>
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/guides/etching-procedures" className="text-primary-600 hover:underline font-semibold">
                  → Etching Procedures
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </article>
    </>
  )
}

