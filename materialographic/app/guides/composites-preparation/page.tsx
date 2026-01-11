import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import MaterialTooltip from '@/components/MaterialTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('composites-preparation')!

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

export default function CompositesGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Composites Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Composites Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing composite material samples for metallographic analysis, 
              covering specialized techniques to avoid fiber pullout, maintain fiber orientation, and reveal 
              matrix-fiber interfaces.
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
                  Composite materials, including fiber-reinforced composites (FRCs), present unique challenges 
                  in metallographic preparation. These materials consist of two or more distinct phases, typically 
                  a matrix material (polymer, metal, or ceramic) reinforced with fibers (carbon, glass, aramid, 
                  or ceramic). The heterogeneous nature of composites requires specialized techniques to preserve 
                  the integrity of both phases and reveal the true microstructure.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Polymer-graphite composite , 200X.JPG"
                      alt="Polymer-graphite composite microstructure at 200X magnification, showing proper preparation with intact fibers and clear matrix-fiber interface"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Polymer-graphite composite, 200X magnification. This image demonstrates proper composite preparation with intact fibers, clear matrix-fiber interfaces, and minimal pullout artifacts.</p>
                  </div>
                </AnimateOnScroll>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Key Challenge:</strong> Composites are particularly susceptible to fiber pullout, 
                    delamination, and interface damage during preparation. The matrix and fiber phases often have 
                    vastly different mechanical properties, making uniform preparation difficult. Careful attention 
                    to each step is essential to maintain fiber orientation and reveal matrix-fiber interfaces.
                  </p>
                </div>
                <p>
                  Common composite types include <MaterialTooltip materialName="Carbon Fiber Reinforced Polymer (CFRP)">carbon fiber reinforced polymers (CFRP)</MaterialTooltip>, <MaterialTooltip materialName="Glass Fiber Reinforced Polymer (GFRP)">glass fiber reinforced 
                  polymers (GFRP)</MaterialTooltip>, metal matrix composites (MMC), and <MaterialTooltip materialName="Ceramic Matrix Composite (CMC)">ceramic matrix composites (CMC)</MaterialTooltip>. Each type 
                  requires specific considerations, but the fundamental principles of careful sectioning, 
                  appropriate mounting, gentle grinding, and careful polishing apply to all.
                </p>
                <p>
                  The goal of composite preparation is to achieve a flat, scratch-free surface that preserves 
                  the original structure, maintains fiber orientation, reveals the matrix-fiber interface, and 
                  allows for accurate microstructural analysis. Unlike monolithic materials, composites often rely 
                  more heavily on contrast from polishing rather than etching to reveal structure. The difference 
                  in hardness between matrix and fiber phases creates natural contrast when polished correctly, 
                  with softer matrices polishing faster than harder fibers, creating slight relief that enhances 
                  visibility under the microscope.
                </p>
                <div className="bg-gray-50 p-4 my-6 rounded">
                  <h4 className="font-semibold mb-2">Composite Material Characteristics</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li><strong><MaterialTooltip materialName="Carbon Fiber Reinforced Polymer (CFRP)">CFRP (Carbon Fiber Reinforced Polymer)</MaterialTooltip>:</strong> Very hard carbon fibers in polymer matrix, requires careful handling to prevent fiber pullout</li>
                    <li><strong><MaterialTooltip materialName="Glass Fiber Reinforced Polymer (GFRP)">GFRP (Glass Fiber Reinforced Polymer)</MaterialTooltip>:</strong> Glass fibers in polymer matrix, sensitive to thermal damage during sectioning</li>
                    <li><strong>MMC (Metal Matrix Composites):</strong> Ceramic or carbon fibers in metal matrix, may allow some etching of matrix phase. Common examples include <MaterialTooltip materialName="Aluminum Matrix Composite (AMC)">aluminum matrix composites</MaterialTooltip> and <MaterialTooltip materialName="Titanium Matrix Composite (TMC)">titanium matrix composites</MaterialTooltip></li>
                    <li><strong><MaterialTooltip materialName="Ceramic Matrix Composite (CMC)">CMC (Ceramic Matrix Composites)</MaterialTooltip>:</strong> Fibers in ceramic matrix, very hard, requires diamond abrasives throughout</li>
                  </ul>
                </div>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="sectioning" className="scroll-mt-24">
                <h2>Sectioning</h2>
                <p>
                  Sectioning composite materials requires careful consideration of the matrix and fiber properties. 
                  The goal is to minimize damage to both phases and avoid delamination or fiber pullout. Cutting 
                  parameters must be optimized to prevent excessive heat generation, which can damage polymer 
                  matrices or cause thermal degradation.
                </p>
                <h3>Cutting Parameters</h3>
                <ul>
                  <li><strong>Cutting Speed:</strong> Slow speeds (100-200 RPM) to minimize heat and mechanical damage. For polymer matrix composites, use 100-150 RPM; for metal matrix composites, 150-200 RPM may be acceptable</li>
                  <li><strong>Blade Selection:</strong> MAX-E series thin abrasive cut-off wheels (0.5-1.0 mm) for most composites, or diamond blades for very hard ceramic reinforcements</li>
                  <li><strong>Cooling:</strong> Continuous cooling with water or cutting fluid is essential. Use adequate flow rate to prevent thermal damage to polymer matrices</li>
                  <li><strong>Feed Rate:</strong> Slow, steady feed (0.5-1.0 mm/min) to avoid excessive pressure and delamination</li>
                  <li><strong>Cutting Direction:</strong> Consider fiber orientation - cut perpendicular to fiber direction when possible to minimize pullout</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/abrasive-blades"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/maxcut-e.webp"
                        alt="MAX-E series thin abrasive cut-off blades for composite sectioning"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">MAX-E series thin abrasive cut-off blades (0.5-1.0 mm) minimize kerf loss and reduce the risk of delamination in composite materials. These blades are specifically designed for cutting soft to medium-hard materials with minimal heat generation.</p>
                  </div>
                </AnimateOnScroll>
                <h3>Composite-Specific Sectioning Considerations</h3>
                <div className="bg-gray-50 p-4 my-6 rounded">
                  <h4 className="font-semibold mb-2">By Composite Type</h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      <strong><MaterialTooltip materialName="Carbon Fiber Reinforced Polymer (CFRP)">CFRP (Carbon Fiber Reinforced Polymer)</MaterialTooltip>:</strong> Use MAX-E blades at 100-120 RPM. 
                      Carbon fibers are very hard and can cause blade wear. Monitor blade condition and replace 
                      when cutting efficiency decreases. Use continuous water cooling.
                    </li>
                    <li>
                      <strong><MaterialTooltip materialName="Glass Fiber Reinforced Polymer (GFRP)">GFRP (Glass Fiber Reinforced Polymer)</MaterialTooltip>:</strong> Use MAX-E blades at 100-150 RPM. 
                      Glass fibers are brittle and can shatter if cut too aggressively. Very sensitive to heat - 
                      ensure adequate cooling throughout the cut.
                    </li>
                    <li>
                      <strong>MMC (Metal Matrix Composites):</strong> Use MAX-E or diamond blades depending on 
                      reinforcement hardness. <MaterialTooltip materialName="Aluminum Matrix Composite (AMC)">Aluminum matrix composites</MaterialTooltip>: 150-180 RPM. Steel matrix: 120-150 RPM. 
                      Diamond blades recommended for SiC or B4C reinforcements.
                    </li>
                    <li>
                      <strong><MaterialTooltip materialName="Ceramic Matrix Composite (CMC)">CMC (Ceramic Matrix Composites)</MaterialTooltip>:</strong> Use diamond blades exclusively. Cutting 
                      speed 100-150 RPM. These materials are very hard and abrasive - diamond blades are essential 
                      for clean cuts.
                    </li>
                  </ul>
                </div>
                <h3>Best Practices</h3>
                <ul>
                  <li>Use thin blades (0.5-1.0 mm) to minimize kerf loss and reduce heat generation</li>
                  <li>Maintain constant cooling throughout the cut to prevent matrix damage - flow rate should be sufficient to keep the cut area flooded</li>
                  <li>Avoid excessive pressure - let the blade do the work. Excessive force can cause delamination or fiber damage</li>
                  <li>For polymer matrix composites, use lower cutting speeds (100-150 RPM) to prevent melting or thermal degradation</li>
                  <li>For metal matrix composites with very hard reinforcements (SiC, B4C), consider using diamond blades</li>
                  <li>Support the sample properly to prevent flexing and delamination - use appropriate fixtures or clamps</li>
                  <li>Consider the fiber orientation when planning the cut direction - cutting perpendicular to fiber direction minimizes pullout</li>
                  <li>Mark the fiber orientation on the sample before cutting if it's not obvious, to maintain reference during preparation</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>Important:</strong> Polymer matrix composites are particularly sensitive to heat. 
                    Excessive cutting speed or insufficient cooling can cause matrix melting, fiber damage, or 
                    interface degradation. Always use adequate cooling and monitor the cutting process carefully.
                  </p>
                </div>
                <ProductLink 
                  productName="MAX-E Abrasive Cut-Off Blades"
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  description="MAX-E series thin abrasive blades (0.5-1.0 mm) specifically designed for cutting composite materials with minimal heat generation and delamination"
                />
                <ProductLink 
                  productName="Diamond Cut-Off Blades"
                  href="https://shop.metallographic.com/collections/diamond-cbn-blades"
                  description="Diamond blades for cutting hard ceramic matrix composites or metal matrix composites with very hard reinforcements"
                />
                <ProductLink 
                  productName="Cutting Fluids"
                  href="https://shop.metallographic.com/collections/abrasive-cutting-fluid"
                  description="Water-based cutting fluids for continuous cooling during composite sectioning to prevent thermal damage"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="mounting" className="scroll-mt-24">
                <h2>Mounting</h2>
                <p>
                  Mounting composite samples requires special consideration to preserve the structure and prevent 
                  damage to the matrix-fiber interface. The mounting material must provide adequate support without 
                  causing thermal damage or chemical interaction with the composite constituents.
                </p>
                <h3>Mounting Considerations</h3>
                <ul>
                  <li><strong>Temperature Sensitivity:</strong> Polymer matrix composites require low-temperature mounting to avoid matrix damage</li>
                  <li><strong>Pressure Control:</strong> Use moderate pressure to avoid crushing or delamination</li>
                  <li><strong>Edge Retention:</strong> Ensure good edge retention to preserve fiber ends and interfaces</li>
                  <li><strong>Chemical Compatibility:</strong> Avoid mounting materials that may react with composite constituents</li>
                </ul>
                <h3>Compression Mounting</h3>
                <p>
                  For metal matrix composites and some ceramic matrix composites, compression mounting with epoxy 
                  resins is preferred due to lower curing temperatures compared to phenolic. Epoxy resins cure at 
                  150-180°C, which is generally safe for metal matrices but may still damage some polymer matrices. 
                  Phenolic resins should be avoided for polymer matrix composites due to higher curing temperatures.
                </p>
                <ol>
                  <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                  <li>Place sample in mounting press with epoxy resin (e.g., EpoMet or equivalent)</li>
                  <li>Apply moderate pressure: 2000-3000 psi for epoxy (lower than typical metal mounting)</li>
                  <li>Heat to 150-180°C and hold for 5-8 minutes</li>
                  <li>Cool slowly to room temperature under pressure to minimize thermal stress</li>
                </ol>
                <h3>Cold Mounting</h3>
                <p>
                  Cold mounting is strongly recommended for polymer matrix composites (<MaterialTooltip materialName="Carbon Fiber Reinforced Polymer (CFRP)">CFRP</MaterialTooltip>, <MaterialTooltip materialName="Glass Fiber Reinforced Polymer (GFRP)">GFRP</MaterialTooltip>) to completely 
                  avoid thermal exposure. This method is essential for temperature-sensitive materials and eliminates 
                  the risk of matrix degradation, fiber-matrix interface damage, or delamination from thermal cycling.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/mounting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/epoxy_castable.webp"
                        alt="Cold mounting epoxy resins for polymer matrix composites"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Cold mounting epoxy resins cure at room temperature, eliminating thermal damage risk for polymer matrix composites. These resins provide excellent edge retention and support for composite samples.</p>
                  </div>
                </AnimateOnScroll>
                <ol>
                  <li>Clean and dry the sample thoroughly - ensure no cutting fluid remains</li>
                  <li>Place in mounting cup with two-part epoxy resin (e.g., EpoMet F or equivalent)</li>
                  <li>Mix resin and hardener according to manufacturer instructions</li>
                  <li>Pour into mounting cup, ensuring sample is properly positioned</li>
                  <li>Allow to cure at room temperature (typically 4-8 hours, or overnight for best results)</li>
                  <li>Cold mounting eliminates risk of thermal damage to polymer matrices and interfaces</li>
                </ol>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Special Consideration:</strong> For composites with soft matrices, use mounting 
                    materials with similar hardness to prevent relief during polishing. Vacuum impregnation 
                    may be necessary for porous composites or those with internal voids to ensure complete 
                    infiltration and support. For composites with high fiber volume fractions, consider using 
                    mounting materials with good edge retention properties.
                  </p>
                </div>
                <ProductLink 
                  productName="Cold Mounting Epoxy Resins"
                  href="https://shop.metallographic.com/collections/mounting"
                  description="Two-part epoxy resins for cold mounting polymer matrix composites without thermal damage"
                />
                <ProductLink 
                  productName="Compression Mounting Equipment"
                  href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                  description="Mounting presses with temperature control for metal and ceramic matrix composites"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="grinding" className="scroll-mt-24">
                <h2>Grinding</h2>
                <p>
                  Grinding composite materials requires careful attention to prevent fiber pullout and maintain 
                  fiber orientation. The heterogeneous nature of composites means that grinding must be gentle 
                  enough to avoid damaging the softer phase (usually the matrix) while still effectively removing 
                  sectioning damage.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/sic-grinding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/abrasive grinding-SiC papers.webp"
                        alt="Silicon carbide grinding papers for progressive grinding of composites"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes for progressive grinding. Use light pressure and rotate sample 90° between each grit to prevent fiber pullout.</p>
                  </div>
                </AnimateOnScroll>
                <h3>Grinding Sequence</h3>
                <ol>
                  <li><strong>120 grit:</strong> Remove sectioning damage (30-60 seconds per step) - use very light pressure</li>
                  <li><strong>240 grit:</strong> Remove previous scratches (30-60 seconds)</li>
                  <li><strong>400 grit:</strong> Further refinement (30-60 seconds)</li>
                  <li><strong>600 grit:</strong> Final grinding step (30-60 seconds)</li>
                  <li><strong>800 grit:</strong> Optional for composites requiring finer surfaces (20-40 seconds)</li>
                </ol>
                <h3>Grinding Parameters</h3>
                <ul>
                  <li><strong>Pressure:</strong> Very light pressure (1-3 lbs per sample) to prevent fiber pullout</li>
                  <li><strong>Rotation:</strong> Rotate sample 90° between each grit to ensure complete scratch removal</li>
                  <li><strong>Water Flow:</strong> Continuous water flow to remove debris and prevent loading</li>
                  <li><strong>Speed:</strong> 240-300 RPM for grinding wheels</li>
                  <li><strong>Time:</strong> Shorter times per step compared to metals - monitor frequently</li>
                </ul>
                <div className="bg-gray-50 p-4 my-6 rounded">
                  <h4 className="font-semibold mb-2">Grinding Tips for Composites</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Use very light pressure throughout - composites are more sensitive than metals</li>
                    <li>Monitor the surface frequently to detect fiber pullout early</li>
                    <li>Use fresh grinding papers - loaded papers can cause excessive pullout</li>
                    <li>For soft matrix composites, consider starting with finer grits (240 or 400)</li>
                    <li>Ensure all scratches from previous grit are removed before proceeding</li>
                    <li>Avoid excessive grinding time which can cause relief between matrix and fiber</li>
                  </ul>
                </div>
                <ProductLink 
                  productName="Silicon Carbide Grinding Papers"
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  description="Premium SiC papers in all grit sizes for consistent grinding of composite materials"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="polishing" className="scroll-mt-24">
                <h2>Polishing</h2>
                <p>
                  Polishing is perhaps the most critical step in composite preparation. Careful polishing is 
                  essential to avoid fiber damage, prevent pullout, and reveal the matrix-fiber interface. The 
                  goal is to achieve a flat surface with good contrast between phases, often relying on 
                  polishing-induced contrast rather than etching.
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
                          alt="Polycrystalline diamond polishing compound for composites"
                          width={300}
                          height={225}
                          className="w-full h-auto"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                        />
                      </Link>
                      <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides consistent cutting action for composite materials.</p>
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
                          alt="Soft polishing pads for composite materials"
                          width={300}
                          height={225}
                          className="w-full h-auto"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                        />
                      </Link>
                      <p className="text-xs text-gray-600 mt-2 italic text-center">Soft to medium polishing pads are recommended for composites to prevent fiber pullout and maintain interface integrity.</p>
                    </div>
                  </div>
                </AnimateOnScroll>
                <h3>Diamond Polishing Sequence</h3>
                <p>
                  Use polycrystalline diamond suspensions for consistent cutting action. The sequence below is 
                  optimized to minimize fiber pullout while achieving a flat, scratch-free surface.
                </p>
                <ol>
                  <li><strong>9 μm diamond:</strong> 2-4 minutes on a soft cloth (e.g., Microcloth, Texmet 1000, or equivalent soft pad). Use polycrystalline diamond for better cutting consistency</li>
                  <li><strong>3 μm diamond:</strong> 2-4 minutes on a soft cloth (Microcloth or equivalent). Monitor for fiber pullout - if observed, reduce pressure</li>
                  <li><strong>1 μm diamond:</strong> 2-3 minutes on a soft cloth. This step is critical for removing fine scratches while preserving fiber integrity</li>
                  <li><strong>0.25 μm diamond:</strong> Optional - 1-2 minutes on a very soft cloth (e.g., Microcloth or Chemomet). Only use if needed for very fine surfaces</li>
                </ol>
                <h3>Final Polishing</h3>
                <p>
                  Final polishing with colloidal silica creates the natural contrast between matrix and fiber 
                  phases that is essential for composite microstructural analysis.
                </p>
                <ol>
                  <li><strong>0.05 μm colloidal silica:</strong> 30-90 seconds on a very soft cloth (Microcloth or Chemomet). Use minimal pressure (1-2 lbs)</li>
                  <li>Rinse thoroughly with water and dry with compressed air - avoid wiping which can cause fiber pullout</li>
                  <li>For composites, final polish often provides sufficient contrast without etching. The differential polishing rates of matrix and fiber create natural contrast</li>
                </ol>
                <h3>Polishing Parameters</h3>
                <ul>
                  <li><strong>Pressure:</strong> Very light pressure (1-3 lbs per sample) - critical to prevent fiber pullout. Use the minimum pressure that maintains contact</li>
                  <li><strong>Speed:</strong> 120-150 RPM for diamond polishing. Lower speeds (100-120 RPM) may be beneficial for very sensitive composites</li>
                  <li><strong>Cloth Selection:</strong> Use soft cloths throughout (Microcloth, Texmet 1000, or equivalent). Avoid hard cloths which can cause excessive pullout</li>
                  <li><strong>Lubricant:</strong> Polycrystalline diamond suspension in water-based lubricant. High-viscosity suspensions help maintain diamond particles in contact with the surface</li>
                  <li><strong>Direction:</strong> Consider fiber orientation - polish perpendicular to fiber direction when possible. For random fiber orientations, use gentle circular motions</li>
                  <li><strong>Time:</strong> Monitor frequently. Shorter times per step are often better than extended polishing which can cause relief</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Critical Consideration:</strong> Fiber pullout is the most common problem in composite 
                    polishing. Use very light pressure, soft cloths, and monitor the surface frequently. If 
                    pullout occurs, return to a previous polishing step and use even lighter pressure. The 
                    matrix-fiber interface must be preserved to reveal the true microstructure.
                  </p>
                </div>
                <h3>Maintaining Fiber Orientation</h3>
                <p>
                  Throughout the polishing process, maintain awareness of fiber orientation. Polishing parallel 
                  to fiber direction can cause excessive pullout, while polishing perpendicular to fibers helps 
                  maintain interface integrity. For random fiber orientations, use gentle, circular motions with 
                  very light pressure.
                </p>
                <ProductLink 
                  productName="Polycrystalline Diamond Abrasives"
                  href="https://shop.metallographic.com/collections/diamond-abrasives"
                  description="High-viscosity polycrystalline diamond suspensions (9 μm, 3 μm, 1 μm, 0.25 μm) for consistent cutting action in composite preparation"
                />
                <ProductLink 
                  productName="Soft Polishing Cloths"
                  href="https://shop.metallographic.com/collections/polishing-pads"
                  description="Soft polishing pads and cloths (Microcloth, Texmet 1000, Chemomet) designed to minimize fiber pullout in composite materials"
                />
                <ProductLink 
                  productName="Colloidal Silica"
                  href="https://shop.metallographic.com/collections/final-polishing"
                  description="0.05 μm colloidal silica for final polishing to create natural contrast between matrix and fiber phases"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="etching" className="scroll-mt-24">
                <h2>Etching</h2>
                <p>
                  Etching options for composite materials are often limited, especially for polymer matrix 
                  composites. Many composites rely primarily on contrast achieved through careful polishing 
                  rather than chemical etching. However, some etching may be beneficial for metal matrix 
                  composites or for revealing specific features.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>Important Note:</strong> Many composite materials, especially polymer matrix 
                    composites, do not respond well to traditional metallographic etchants. The contrast 
                    between matrix and fiber phases is often best achieved through careful polishing that 
                    creates natural contrast from the different hardnesses of the phases.
                  </p>
                </div>
                <h3>Etching Considerations</h3>
                <ul>
                  <li><strong>Polymer Matrix Composites:</strong> Generally not etched - rely on polishing contrast. This applies to <MaterialTooltip materialName="Carbon Fiber Reinforced Polymer (CFRP)">CFRP</MaterialTooltip> and <MaterialTooltip materialName="Glass Fiber Reinforced Polymer (GFRP)">GFRP</MaterialTooltip> materials</li>
                  <li><strong>Metal Matrix Composites:</strong> May benefit from standard metal etchants applied to the matrix. <MaterialTooltip materialName="Aluminum Matrix Composite (AMC)">Aluminum matrix composites</MaterialTooltip> can be etched with Keller's reagent, while <MaterialTooltip materialName="Titanium Matrix Composite (TMC)">titanium matrix composites</MaterialTooltip> may respond to Kroll's reagent</li>
                  <li><strong><MaterialTooltip materialName="Ceramic Matrix Composite (CMC)">Ceramic Matrix Composites</MaterialTooltip>:</strong> Limited etching options - often rely on polishing contrast</li>
                  <li><strong>Interface Revelation:</strong> Polishing-induced contrast often reveals interfaces better than etching</li>
                </ul>
                <h3>Polishing-Induced Contrast</h3>
                <p>
                  For most composites, the best contrast is achieved through careful polishing rather than 
                  etching. The different hardnesses of the matrix and fiber phases create natural contrast 
                  when polished properly. Soft matrices polish faster than hard fibers, creating slight relief 
                  that enhances visibility under the microscope. This relief is typically on the order of 
                  0.1-0.5 μm, which is sufficient for good contrast under brightfield illumination and 
                  excellent contrast under differential interference contrast (DIC) microscopy.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Polymergraphite composite, as-polished, 200X.JPG"
                      alt="Polymer-graphite composite as-polished at 200X, demonstrating natural contrast from polishing without etching"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Polymer-graphite composite, as-polished (no etching), 200X magnification. This image demonstrates excellent contrast achieved through careful polishing alone, with clear distinction between matrix and fiber phases.</p>
                  </div>
                </AnimateOnScroll>
                <h3>Limited Etching Options</h3>
                <p>
                  When etching is attempted for metal matrix composites, use standard etchants for the matrix 
                  material (e.g., Keller's reagent for <MaterialTooltip materialName="Aluminum Matrix Composite (AMC)">aluminum matrix composites</MaterialTooltip>, Nital for steel matrix). However, 
                  etching times should be reduced, and the process should be monitored carefully to avoid 
                  over-etching the matrix or damaging the fiber-matrix interface.
                </p>
                <h3>Etching Procedure (if applicable)</h3>
                <ol>
                  <li>Ensure sample is clean and dry before etching</li>
                  <li>Apply etchant sparingly using cotton swab (for metal matrix composites only)</li>
                  <li>Etch for shorter times than for monolithic materials (5-15 seconds)</li>
                  <li>Monitor etching progress carefully</li>
                  <li>Rinse immediately with water, then alcohol</li>
                  <li>Dry with compressed air</li>
                </ol>
                <div className="bg-gray-50 p-4 my-6 rounded">
                  <h4 className="font-semibold mb-2">Best Practice</h4>
                  <p className="text-sm">
                    For most composite materials, focus on achieving excellent polishing quality rather than 
                    relying on etching. The natural contrast from polishing often provides better results than 
                    attempting to etch heterogeneous materials. Use differential interference contrast (DIC) 
                    microscopy to enhance contrast if available.
                  </p>
                </div>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="troubleshooting" className="scroll-mt-24">
                <h2>Troubleshooting</h2>
                <h3>Common Issues and Solutions</h3>
                
                <div className="space-y-4 my-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Fiber Pullout</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Holes or gaps where fibers should be, missing fiber ends, 
                      disrupted fiber orientation, visible voids in the microstructure
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Root Causes:</strong> Excessive polishing pressure, use of hard polishing cloths, 
                      insufficient grit progression, polishing parallel to fiber direction, over-polishing
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Reduce polishing pressure significantly (1-2 lbs per sample), 
                      use softer polishing cloths (Microcloth, Texmet 1000), extend polishing times at each step 
                      with lighter pressure, ensure proper grit progression (don't skip grits), consider vibratory 
                      polishing for final steps, polish perpendicular to fiber direction when possible, use 
                      polycrystalline diamond for more consistent cutting action, monitor surface frequently with 
                      low-power microscopy to detect pullout early
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Loss of Fiber Orientation</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Fibers appear misaligned, original orientation not preserved
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Use lighter pressure during all steps, avoid excessive grinding/polishing, 
                      maintain consistent sample orientation, mark fiber direction before sectioning, use slower 
                      cutting speeds during sectioning
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Poor Interface Revelation</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Matrix-fiber interface not visible, unclear boundaries between phases
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Improve polishing quality, use final polish with colloidal silica, 
                      ensure flat surface (no relief), use differential interference contrast (DIC) microscopy, 
                      adjust lighting conditions, ensure proper contrast from polishing
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Soft Matrix Damage</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Excessive relief around fibers, smearing of matrix material, 
                      distorted matrix structure
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Use very light pressure, softer polishing cloths, shorter 
                      polishing times, start with finer grits if matrix is very soft, use mounting material 
                      with similar hardness to matrix
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Delamination</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Separation of layers, gaps between plies, visible delamination cracks
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Reduce cutting speed during sectioning, use adequate cooling, 
                      support sample properly during cutting, use vacuum impregnation during mounting if necessary, 
                      avoid excessive pressure during mounting
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Insufficient Contrast</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Matrix and fiber phases difficult to distinguish, poor visibility 
                      of interfaces, uniform appearance under brightfield illumination
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Root Causes:</strong> Over-polishing (too much relief removed), insufficient final 
                      polish, matrix and fiber have similar hardness, improper polishing technique
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Improve final polishing quality with 0.05 μm colloidal silica on 
                      very soft cloth, use DIC (differential interference contrast) microscopy to enhance contrast, 
                      adjust lighting conditions (try oblique illumination), ensure proper surface flatness (no 
                      excessive relief), consider using polarized light for certain fiber types (glass fibers), 
                      verify polishing has created natural contrast between phases, reduce final polish time if 
                      over-polishing has occurred, ensure proper grit progression was followed
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Thermal Damage</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Melted or degraded matrix, discoloration, interface damage
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Use cold mounting instead of compression mounting, reduce 
                      cutting speed, increase cooling during sectioning, use lower mounting temperatures, 
                      avoid excessive heat during any preparation step
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
                <Link href="/guides/mounting" className="text-primary-600 hover:underline font-semibold">
                  → Mounting Procedures
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

