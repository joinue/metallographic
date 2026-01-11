import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('ceramics-preparation')!

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

export default function CeramicsGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Ceramics Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Ceramics Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing ceramic samples for metallographic analysis, 
              covering sectioning hard materials, preventing chipping and cracking, and revealing 
              grain boundaries without pullout.
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
            <AnimateOnScroll animation="fadeInUp" delay={0}>
              <section id="introduction" className="scroll-mt-24">
                <h2>Introduction</h2>
                <p>
                  Ceramics are among the most challenging materials to prepare for metallographic analysis. 
                  Their extreme hardness, brittleness, and tendency to chip or crack require specialized 
                  techniques throughout the entire preparation process. Unlike metals, ceramics often require 
                  diamond tools at every stage, very slow cutting speeds, and extended grinding and polishing times.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                  <p className="text-sm text-red-900">
                    <strong>Key Challenge:</strong> Ceramics are extremely hard and brittle. They require 
                    diamond blades for sectioning, very slow cutting speeds to prevent chipping, and extended 
                    grinding and polishing times. Special care must be taken to avoid cracking and pullout 
                    of hard phases.
                  </p>
                </div>
                <p>
                  Common ceramic materials include alumina (Al₂O₃, ~2000 HV), zirconia (ZrO₂, ~1200-1500 HV), 
                  silicon carbide (SiC, ~2500-3000 HV), silicon nitride (Si₃N₄, ~1500-1800 HV), boron carbide 
                  (B₄C, ~2800 HV), and various oxide ceramics. Each type has specific hardness and brittleness 
                  characteristics that influence preparation. For example, silicon carbide is among the hardest 
                  ceramics and requires the most aggressive diamond abrasives, while zirconia may be more 
                  susceptible to phase transformation under stress. The fundamental principles remain the same: 
                  minimize mechanical damage, prevent chipping, and reveal grain boundaries without pullout.
                </p>
                <div className="bg-gray-50 p-4 my-6 rounded">
                  <h4 className="font-semibold mb-2">Ceramic Material Characteristics</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li><strong>Alumina (Al₂O₃):</strong> Very hard (~2000 HV), chemically stable, commonly used in wear applications</li>
                    <li><strong>Zirconia (ZrO₂):</strong> High toughness for a ceramic, may undergo phase transformation, requires careful handling</li>
                    <li><strong>Silicon Carbide (SiC):</strong> Extremely hard (~2500-3000 HV), requires aggressive diamond abrasives throughout</li>
                    <li><strong>Silicon Nitride (Si₃N₄):</strong> High strength and hardness, good thermal shock resistance</li>
                    <li><strong>Boron Carbide (B₄C):</strong> One of the hardest known materials (~2800 HV), extremely challenging to prepare</li>
                    <li><strong>Porous Ceramics:</strong> May require vacuum impregnation during mounting to prevent pullout</li>
                  </ul>
                </div>
                <p>
                  This guide will walk you through the complete preparation process, with special emphasis on 
                  the unique challenges ceramics present and how to overcome them.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="sectioning" className="scroll-mt-24">
                <h2>Sectioning</h2>
                <p>
                  Sectioning ceramics is one of the most critical steps. The extreme hardness of ceramics 
                  requires diamond blades, and their brittleness demands very slow cutting speeds to prevent 
                  chipping and cracking. Standard abrasive blades will not work for most ceramics.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/diamond-blades"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/electroplated-diamond-blades.webp"
                        alt="Diamond cut-off blades required for sectioning hard ceramic materials"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Diamond cut-off blades are essential for sectioning ceramics. Standard abrasive blades will not cut through hard ceramic materials effectively.</p>
                  </div>
                </AnimateOnScroll>
                <h3>Cutting Parameters</h3>
                <ul>
                  <li><strong>Blade Type:</strong> Diamond-impregnated cut-off wheels (required - standard abrasive blades will not work). Use electroplated diamond blades for hardest ceramics (SiC, B₄C), resin-bonded diamond for others</li>
                  <li><strong>Cutting Speed:</strong> 30-100 RPM depending on ceramic hardness (30-50 RPM for SiC/B₄C, 50-100 RPM for Al₂O₃/ZrO₂). Very slow speeds minimize chipping and heat generation</li>
                  <li><strong>Feed Rate:</strong> Extremely slow, steady feed (0.3-0.5 mm/min for SiC/B₄C, 0.5-1.0 mm/min for other ceramics)</li>
                  <li><strong>Cooling:</strong> Continuous, copious coolant flow is essential to prevent thermal shock. Use water-based cutting fluid, not oil-based for ceramics</li>
                  <li><strong>Blade Thickness:</strong> Thin blades (0.3-0.5 mm) minimize kerf loss but require more care. Thicker blades (0.5-0.8 mm) provide more stability for very brittle ceramics</li>
                  <li><strong>Blade Condition:</strong> Use sharp, fresh diamond blades. Worn blades generate excessive heat and cause chipping</li>
                </ul>
                <h3>Best Practices</h3>
                <ul>
                  <li>Use diamond blades specifically designed for hard, brittle materials - electroplated for hardest ceramics</li>
                  <li>Maintain very slow cutting speeds - rushing will cause chipping. For SiC and B₄C, use the slowest practical speed (30-50 RPM)</li>
                  <li>Apply minimal pressure - let the diamond do the cutting. Excessive force causes chipping and blade wear</li>
                  <li>Ensure continuous, copious coolant flow throughout the cut to prevent thermal shock cracking</li>
                  <li>Support the sample properly to prevent vibration and chipping. Use appropriate fixtures for small or irregular samples</li>
                  <li>For very brittle ceramics or thin sections, consider using a precision saw with diamond blade and slower speeds</li>
                  <li>Cut in multiple shallow passes (0.5-1.0 mm per pass) rather than forcing through in one deep cut</li>
                  <li>For anisotropic ceramics (e.g., some SiC), consider cutting direction relative to grain orientation</li>
                  <li>Inspect sample immediately after cutting for chips or cracks before proceeding to mounting</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>Important:</strong> Chipping during sectioning is often irreparable. Take your time 
                    and use the slowest practical cutting speed. It's better to spend extra time sectioning than 
                    to have to start over with a new sample.
                  </p>
                </div>
                <ProductLink 
                  productName="Diamond Cut-Off Blades"
                  href="https://shop.metallographic.com/collections/diamond-blades"
                  description="Diamond-impregnated cut-off wheels specifically designed for hard, brittle materials like ceramics"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="mounting" className="scroll-mt-24">
                <h2>Mounting</h2>
                <p>
                  Mounting ceramics requires special considerations. The mounting material must provide good 
                  edge retention and support to prevent chipping during grinding and polishing. Compression 
                  mounting with epoxy resins is typically preferred, but cold mounting can also work well.
                </p>
                <h3>Mounting Materials</h3>
                <ul>
                  <li><strong>Epoxy Resins:</strong> Preferred for ceramics - provides excellent edge retention, lower curing temperature (150-180°C), and better chemical resistance. Use filled epoxies for better edge retention</li>
                  <li><strong>Phenolic Resins:</strong> Acceptable for less fragile ceramics but may not provide as good edge retention as epoxy. Higher curing temperature (150-180°C) may cause thermal stress</li>
                  <li><strong>Cold Mounting:</strong> Essential for very fragile ceramics or those with existing cracks - completely avoids thermal stress. Use low-viscosity epoxies for better infiltration</li>
                  <li><strong>Vacuum Impregnation:</strong> Required for porous ceramics to ensure complete infiltration and prevent pullout during grinding/polishing</li>
                  <li><strong>Mounting Pressure:</strong> 2000-3000 psi for epoxy, 3000-4000 psi for phenolic. Lower pressure for fragile ceramics</li>
                  <li><strong>Mounting Temperature:</strong> 150-180°C for compression mounting. Lower temperatures (150-160°C) preferred for ceramics to minimize thermal stress</li>
                </ul>
                <h3>Mounting Procedure</h3>
                <h4>Compression Mounting</h4>
                <ol>
                  <li>Clean the sample thoroughly with alcohol or acetone to remove cutting fluid and debris</li>
                  <li>Inspect for any chips or cracks introduced during sectioning - if severe, consider starting with a new sample</li>
                  <li>Select appropriate mold size (typically 1.25" or 1.5" diameter) - larger mounts provide better edge retention</li>
                  <li>Place sample in mold with the surface of interest facing up</li>
                  <li>Add mounting compound (epoxy preferred for ceramics)</li>
                  <li>Mount at 150-160°C (lower than typical 180°C) and 2000-3000 psi for epoxy</li>
                  <li>Hold at temperature for 5-8 minutes</li>
                  <li>Cool slowly to room temperature under pressure (allow 10-15 minutes cooling time) before removing from mold</li>
                </ol>
                <h4>Cold Mounting</h4>
                <ol>
                  <li>Clean and dry the sample thoroughly</li>
                  <li>For porous ceramics: Place in vacuum chamber and evacuate to remove air from pores</li>
                  <li>Place sample in mounting cup with low-viscosity epoxy resin</li>
                  <li>If using vacuum impregnation: Apply vacuum again to draw resin into pores</li>
                  <li>Allow to cure at room temperature (4-8 hours, or overnight for best results)</li>
                  <li>Cold mounting completely eliminates thermal stress risk</li>
                </ol>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Special Consideration:</strong> For very fragile ceramics or those with existing 
                    cracks, cold mounting is essential to avoid thermal stress that could cause further 
                    damage. Porous ceramics (e.g., some thermal barrier coatings, filters) require vacuum 
                    impregnation to prevent pullout during grinding and polishing. The slower curing time 
                    is worth the reduced risk of cracking and better edge retention.
                  </p>
                </div>
                <ProductLink 
                  productName="Compression Mounting Equipment"
                  href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                  description="Automatic and manual mounting presses for consistent results with ceramic samples"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="grinding" className="scroll-mt-24">
                <h2>Grinding</h2>
                <p>
                  Grinding ceramics requires diamond grinding wheels or diamond-impregnated papers. Standard 
                  SiC papers will not effectively grind most ceramics. The process is slow and requires 
                  extended times at each grit to remove previous scratches completely.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/diamond-grinding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/metal-bonded-diamond.webp"
                        alt="Diamond grinding wheels or diamond-impregnated papers required for grinding ceramics"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Diamond grinding wheels or diamond-impregnated papers are required for ceramics. Standard SiC papers will not effectively grind hard ceramic materials.</p>
                  </div>
                </AnimateOnScroll>
                <h3>Grinding Sequence</h3>
                <p>
                  Use diamond-impregnated grinding wheels or diamond-impregnated papers. Metal-bonded diamond 
                  wheels are preferred for hardest ceramics (SiC, B₄C), while resin-bonded wheels work well 
                  for others. Standard SiC papers will not effectively grind ceramics.
                </p>
                <ol>
                  <li><strong>Diamond 45-60 μm:</strong> Remove sectioning damage - 8-15 minutes per sample (longer for SiC/B₄C)</li>
                  <li><strong>Diamond 30 μm:</strong> Remove previous scratches - 8-12 minutes</li>
                  <li><strong>Diamond 15 μm:</strong> Further refinement - 5-10 minutes</li>
                  <li><strong>Diamond 9 μm:</strong> Fine grinding - 5-10 minutes</li>
                  <li><strong>Diamond 6 μm:</strong> Optional final grinding step - 3-5 minutes (recommended for hardest ceramics)</li>
                </ol>
                <p>
                  <strong>Note:</strong> For silicon carbide and boron carbide, expect grinding times at the 
                  upper end of these ranges. These materials are among the hardest known and require extended 
                  grinding times at each step.
                </p>
                <h3>Grinding Parameters</h3>
                <ul>
                  <li><strong>Abrasive:</strong> Diamond-impregnated wheels or papers (required). Metal-bonded diamond for hardest ceramics, resin-bonded for others</li>
                  <li><strong>Pressure:</strong> Light to moderate (2-5 lbs per sample) - avoid excessive pressure that could cause chipping or cracking</li>
                  <li><strong>Rotation:</strong> Rotate sample 90° between each grit to ensure complete scratch removal. For anisotropic ceramics, maintain consistent orientation</li>
                  <li><strong>Water Flow:</strong> Continuous water flow to remove debris and prevent loading. Use clean water to avoid contamination</li>
                  <li><strong>Speed:</strong> 120-240 RPM for grinding wheels. Slower speeds (120-150 RPM) for hardest ceramics to minimize damage</li>
                  <li><strong>Time:</strong> Extended times (8-15 minutes per step for coarse grits) are necessary due to material hardness. Monitor progress frequently</li>
                  <li><strong>Wheel Condition:</strong> Use fresh diamond wheels/papers. Worn abrasives will take much longer and may cause damage</li>
                </ul>
                <div className="bg-gray-50 p-4 my-6 rounded">
                  <h4 className="font-semibold mb-2">Grinding Tips for Ceramics</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Use diamond grinding wheels or diamond-impregnated papers - standard SiC papers will not work</li>
                    <li>Metal-bonded diamond wheels provide more aggressive cutting for hardest ceramics (SiC, B₄C)</li>
                    <li>Allow extended time at each grit - ceramics require much longer grinding times than metals (8-15 minutes for coarse steps)</li>
                    <li>Ensure all scratches from previous grit are completely removed before proceeding - use magnification to verify</li>
                    <li>Use fresh diamond wheels/papers - worn abrasives will take much longer and may cause damage</li>
                    <li>Maintain consistent pressure throughout each step - avoid varying pressure which can cause relief</li>
                    <li>Check frequently for chipping or cracking - stop if damage is observed and assess if sample can be salvaged</li>
                    <li>For porous ceramics, ensure proper vacuum impregnation before grinding to prevent pullout</li>
                    <li>Consider sample orientation for anisotropic ceramics to maintain consistent grinding behavior</li>
                  </ul>
                </div>
                <ProductLink 
                  productName="Diamond Grinding Wheels"
                  href="https://shop.metallographic.com/collections/diamond-grinding"
                  description="Diamond-impregnated grinding wheels and papers for hard ceramic materials"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="polishing" className="scroll-mt-24">
                <h2>Polishing</h2>
                <p>
                  Polishing ceramics requires diamond polishing throughout all steps. The extreme hardness 
                  means extended polishing times are necessary. The goal is to achieve a scratch-free surface 
                  while avoiding pullout of hard phases or grain boundaries.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
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
                          alt="Polycrystalline diamond polishing compound for ceramics"
                          width={300}
                          height={225}
                          className="w-full h-auto"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                        />
                      </Link>
                      <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound is essential for polishing ceramics. Extended polishing times are required at each step.</p>
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
                          alt="Polishing pads for different polishing stages on ceramics"
                          width={300}
                          height={225}
                          className="w-full h-auto"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                        />
                      </Link>
                      <p className="text-xs text-gray-600 mt-2 italic text-center">Medium to hard polishing pads are recommended for ceramics to maintain flatness and avoid pullout.</p>
                    </div>
                  </div>
                </AnimateOnScroll>
                <h3>Diamond Polishing Sequence</h3>
                <p>
                  Use polycrystalline diamond suspensions for ceramics - they provide more aggressive cutting 
                  than monocrystalline diamond. Water-based diamond suspensions are preferred, though 
                  oil-based can be used if water causes issues with certain ceramics.
                </p>
                <ol>
                  <li><strong>9 μm diamond:</strong> 10-20 minutes on a hard cloth (Texmet, Cermesh, or equivalent). Use polycrystalline diamond for aggressive cutting</li>
                  <li><strong>6 μm diamond:</strong> 10-15 minutes on a medium-hard cloth (Polypad, Texmet). Critical step for removing coarse scratches</li>
                  <li><strong>3 μm diamond:</strong> 8-15 minutes on a medium cloth (Texmet, Black Chem 2). Ensure all previous scratches are removed</li>
                  <li><strong>1 μm diamond:</strong> 5-10 minutes on a medium-soft cloth (Gold Pad, Atlantis). Monitor for grain boundary pullout</li>
                  <li><strong>0.25 μm diamond:</strong> 5-10 minutes on a soft cloth (Micropad, Nappad). Optional but recommended for best results</li>
                </ol>
                <p>
                  <strong>Note:</strong> For silicon carbide and boron carbide, expect polishing times at the 
                  upper end of these ranges (15-20 minutes for coarse steps). These materials require the most 
                  extended polishing times.
                </p>
                <h3>Final Polishing</h3>
                <ol>
                  <li><strong>0.05 μm colloidal silica:</strong> 5-10 minutes on a soft cloth (Micropad, Moltec 2, or Nappad). Use very light pressure (1-3 lbs)</li>
                  <li>Rinse thoroughly with water and dry with compressed air. Avoid prolonged water exposure which could affect some ceramics</li>
                  <li>Inspect under microscope - grain boundaries may be visible without etching, especially with DIC (Differential Interference Contrast) microscopy</li>
                </ol>
                <p>
                  <strong>Alternative:</strong> For very hard ceramics where colloidal silica is insufficient, 
                  consider ion beam polishing as a final step. This technique uses ion bombardment to remove 
                  surface material without mechanical contact, eliminating the risk of pullout entirely.
                </p>
                <h3>Polishing Parameters</h3>
                <ul>
                  <li><strong>Pressure:</strong> Light to moderate pressure (2-4 lbs for coarse steps, 1-3 lbs for fine steps) - avoid excessive pressure that could cause pullout</li>
                  <li><strong>Speed:</strong> 120-150 RPM for diamond polishing. Slower speeds (120 RPM) for hardest ceramics to minimize damage</li>
                  <li><strong>Lubricant:</strong> Water-based diamond suspension preferred. Oil-based can be used but may require different cleaning procedures</li>
                  <li><strong>Diamond Type:</strong> Polycrystalline diamond provides more aggressive cutting for hard ceramics. Monocrystalline may be used for final steps</li>
                  <li><strong>Cloth Selection:</strong> Hard cloths (Texmet, Cermesh) for coarse steps, medium (Texmet, Black Chem 2) for intermediate, soft (Micropad, Nappad) for fine steps</li>
                  <li><strong>Time:</strong> Extended times (10-20 minutes for coarse steps, 5-10 minutes for fine steps) are necessary due to material hardness</li>
                  <li><strong>Direction:</strong> Use consistent polishing direction. For anisotropic ceramics, maintain orientation relative to grain structure</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Critical Consideration:</strong> The goal is to reveal grain boundaries without pullout. 
                    Use light pressure and extend polishing times. Over-polishing with too much pressure can cause 
                    grain boundary pullout, making it impossible to see the true microstructure. Monitor the surface 
                    frequently under magnification and adjust pressure and time as needed. For very hard ceramics 
                    where mechanical polishing is challenging, consider ion beam polishing as an alternative final step.
                  </p>
                </div>
                <h3>Alternative Polishing Methods</h3>
                <p>
                  For extremely hard ceramics or when grain boundary pullout is a persistent problem, consider 
                  these alternatives:
                </p>
                <ul>
                  <li><strong>Ion Beam Polishing:</strong> Uses ion bombardment to remove material without mechanical 
                  contact. Eliminates pullout risk entirely but requires specialized equipment. Best for final 
                  polishing of hardest ceramics.</li>
                  <li><strong>Vibratory Polishing:</strong> Can be used for final polishing with very light pressure. 
                  Less aggressive than mechanical polishing, reducing pullout risk.</li>
                  <li><strong>Electrochemical Polishing:</strong> Limited applicability to ceramics, but may work for 
                  some conductive ceramics or ceramic composites.</li>
                </ul>
                <ProductLink 
                  productName="Diamond Abrasives"
                  href="https://shop.metallographic.com/collections/diamond-abrasives"
                  description="High-quality diamond polishing compounds in various particle sizes for ceramic preparation"
                />
                <ProductLink 
                  productName="Polishing Pads"
                  href="https://shop.metallographic.com/collections/polishing-pads"
                  description="Premium polishing pads for different polishing stages on hard ceramic materials"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="etching" className="scroll-mt-24">
                <h2>Etching</h2>
                <p>
                  Etching ceramics is often more challenging than etching metals. Many ceramics are chemically 
                  inert and do not respond well to traditional chemical etchants. Thermal etching is commonly 
                  used for ceramics, and some ceramics may not require etching at all if the grain boundaries 
                  are visible after polishing.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>Important Note:</strong> Not all ceramics can be etched effectively. Some ceramics 
                    may reveal grain boundaries through careful polishing alone. Thermal etching is often the 
                    preferred method for ceramics that require etching.
                  </p>
                </div>
                <h3>Thermal Etching</h3>
                <p>
                  Thermal etching is the most common method for revealing grain boundaries in ceramics. The 
                  sample is heated to a temperature below the sintering temperature (typically 100-200°C below) 
                  for a specific time, which causes grain boundaries to become visible through surface diffusion.
                </p>
                <h4>Thermal Etching Procedure</h4>
                <ol>
                  <li>Ensure sample is clean and dry after final polishing - any contamination will affect results</li>
                  <li>Place sample in a furnace preheated to the appropriate temperature (typically 100-200°C below sintering temperature)</li>
                  <li>Use appropriate atmosphere (air, vacuum, or controlled atmosphere depending on ceramic)</li>
                  <li>Heat for 30 minutes to 2 hours (time and temperature depend on ceramic type and grain size)</li>
                  <li>Cool slowly to room temperature (furnace cool or controlled cooling rate) to avoid thermal shock</li>
                  <li>Inspect under microscope - grain boundaries should be visible. Adjust time/temperature if needed</li>
                </ol>
                <p>
                  <strong>Important:</strong> Thermal etching can alter the microstructure if temperature is too high 
                  or time is excessive. Always stay well below the sintering temperature. For fine-grained ceramics, 
                  shorter times and lower temperatures are typically sufficient.
                </p>
                <h4>Typical Thermal Etching Conditions</h4>
                <ul>
                  <li><strong>Alumina (Al₂O₃):</strong> 1400-1500°C for 30-60 minutes in air. Fine-grained alumina may require shorter times (20-30 minutes)</li>
                  <li><strong>Zirconia (ZrO₂):</strong> 1200-1300°C for 30-60 minutes in air. Be careful with temperature to avoid phase transformation</li>
                  <li><strong>Silicon Carbide (SiC):</strong> 1800-1900°C for 30-60 minutes in inert atmosphere (Ar or N₂). Air will cause oxidation</li>
                  <li><strong>Silicon Nitride (Si₃N₄):</strong> 1400-1500°C for 30-60 minutes in N₂ atmosphere. Air will cause decomposition</li>
                  <li><strong>Boron Carbide (B₄C):</strong> 1800-2000°C for 30-60 minutes in inert atmosphere. Very high temperature required</li>
                </ul>
                <p>
                  <strong>Atmosphere Considerations:</strong> Some ceramics require specific atmospheres for thermal 
                  etching. Silicon carbide and silicon nitride will oxidize or decompose in air. Always use the 
                  appropriate atmosphere for the ceramic type. Consult material-specific literature for exact conditions.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                  <p className="text-sm text-red-900">
                    <strong>Safety Warning:</strong> Thermal etching requires high-temperature furnaces. Always 
                    follow proper safety procedures, use appropriate personal protective equipment, and ensure 
                    proper ventilation. Be aware that thermal etching can alter the microstructure if temperature 
                    or time is excessive.
                  </p>
                </div>
                <h3>Chemical Etching</h3>
                <p>
                  Chemical etching is less common for ceramics but may work for some oxide ceramics. The 
                  effectiveness varies greatly depending on the ceramic composition.
                </p>
                <h4>Common Chemical Etchants for Ceramics</h4>
                <ul>
                  <li><strong>Phosphoric Acid (H₃PO₄):</strong> Hot phosphoric acid (200-300°C) for some oxide ceramics</li>
                  <li><strong>Hydrofluoric Acid (HF):</strong> Dilute HF solutions for silicon-based ceramics (use extreme caution)</li>
                  <li><strong>Molten Salts:</strong> Some ceramics can be etched with molten salt baths</li>
                </ul>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                  <p className="text-sm text-red-900">
                    <strong>Safety Warning:</strong> Chemical etching of ceramics often requires strong acids 
                    including hydrofluoric acid, which is extremely dangerous. Always use appropriate personal 
                    protective equipment, work in a fume hood, and follow all safety protocols. Many ceramics 
                    cannot be chemically etched effectively, so thermal etching is preferred.
                  </p>
                </div>
                <h3>No Etching Required</h3>
                <p>
                  Some ceramics, particularly those with good contrast between grains (e.g., different phases, 
                  porosity, or orientation contrast) or those that have been carefully polished, may reveal 
                  grain boundaries without any etching. Always examine the polished surface first using:
                </p>
                <ul>
                  <li><strong>Brightfield microscopy:</strong> Check for natural contrast between grains</li>
                  <li><strong>DIC (Differential Interference Contrast):</strong> Often reveals grain boundaries without etching</li>
                  <li><strong>Polarized light:</strong> Useful for anisotropic ceramics (e.g., some SiC, alumina)</li>
                  <li><strong>Darkfield microscopy:</strong> Can enhance contrast for some ceramic microstructures</li>
                </ul>
                <p>
                  If grain boundaries are visible with these techniques, etching may not be necessary. This is 
                  particularly true for ceramics with multiple phases or porosity that provides natural contrast.
                </p>
                <h3>Etching Procedure (Chemical)</h3>
                <ol>
                  <li>Ensure sample is clean and dry</li>
                  <li>Apply etchant using cotton swab or immerse sample (depending on etchant)</li>
                  <li>Etch for appropriate time (varies greatly by ceramic and etchant)</li>
                  <li>Rinse immediately with water, then alcohol</li>
                  <li>Dry with compressed air</li>
                </ol>
                <p>
                  <strong>Tip:</strong> For ceramics, thermal etching is generally preferred over chemical 
                  etching. If chemical etching is necessary, start with very short times and increase gradually. 
                  Many ceramics will not respond to chemical etching at all.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="troubleshooting" className="scroll-mt-24">
                <h2>Troubleshooting</h2>
                <h3>Common Issues and Solutions</h3>
                <div className="space-y-4 my-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Chipping During Sectioning</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Chips or cracks visible at edges after sectioning
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Reduce cutting speed further (try 30-50 RPM), use diamond blades, 
                      reduce feed rate, ensure proper sample support, use copious coolant, consider multiple shallow 
                      passes instead of one deep cut
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Cracking During Mounting</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Cracks visible in sample after mounting
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Use cold mounting instead of compression mounting, reduce mounting 
                      temperature, allow slower cooling, ensure sample is not stressed before mounting
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Scratches Not Removing</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Scratches from previous grit still visible after grinding/polishing
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Extend grinding/polishing time at each step (ceramics require much 
                      longer times), ensure using diamond abrasives (not SiC), use fresh abrasives, check that all 
                      scratches are removed before proceeding to next grit, rotate sample 90° between grits
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Grain Boundary Pullout</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Holes or pits at grain boundaries, missing grains
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Reduce polishing pressure, extend polishing times, use softer 
                      polishing cloths for final steps, avoid over-polishing, use colloidal silica for final polish
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: No Grain Boundaries Visible</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Flat, featureless surface after polishing, no contrast
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Try thermal etching (most common for ceramics), check if grain 
                      boundaries are visible with different lighting (DIC, polarized light), some ceramics may not 
                      show grain boundaries easily, ensure proper polishing to avoid artifacts that obscure structure
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Excessive Preparation Time</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Preparation taking much longer than expected
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> This is normal for ceramics - they require extended times at each 
                      step (especially SiC and B₄C). Ensure using diamond abrasives throughout (not SiC), use fresh 
                      abrasives, use polycrystalline diamond for more aggressive cutting, maintain consistent pressure, 
                      but accept that ceramics simply take longer than metals. For hardest ceramics, consider ion beam 
                      polishing as an alternative for final steps.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Porous Ceramic Pullout</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Material pulling out from pores, holes in microstructure
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Use vacuum impregnation during mounting to fill pores completely, 
                      use low-viscosity epoxy resin, ensure proper vacuum level and time, use lighter polishing pressure, 
                      consider using mounting material with similar hardness to ceramic to prevent relief
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Phase Transformation (Zirconia)</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Cracking or microstructural changes in zirconia samples
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Use lower cutting speeds during sectioning, avoid excessive pressure 
                      during grinding/polishing, use cold mounting instead of compression mounting, avoid thermal etching 
                      at temperatures that cause phase transformation, use gentle preparation techniques throughout
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Thermal Etching Not Working</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> No grain boundaries visible after thermal etching
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Increase temperature (but stay below sintering temperature), extend 
                      etching time, ensure proper surface finish before thermal etching, some ceramics may require 
                      very specific conditions - consult literature for your specific ceramic type
                    </p>
                  </div>
                </div>
              </section>
            </AnimateOnScroll>

            {/* CTA Section */}
            <AnimateOnScroll animation="fadeInUp" delay={50}>
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
            </AnimateOnScroll>

            {/* Related Guides */}
            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  → Troubleshooting Common Issues
                </Link>
                <Link href="/guides/etching-procedures" className="text-primary-600 hover:underline font-semibold">
                  → Etching Procedures
                </Link>
              </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
      </article>
    </>
  )
}

