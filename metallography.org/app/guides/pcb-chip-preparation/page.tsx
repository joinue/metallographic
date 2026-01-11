import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import GlossaryTermTooltip from '@/components/GlossaryTermTooltip'
import MaterialTooltip from '@/components/MaterialTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('pcb-chip-preparation')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'growing-demand', label: 'Growing Demand in Electronics' },
  { id: 'challenges', label: 'Unique Challenges' },
  { id: 'sectioning', label: 'Sectioning PCBs and Chips' },
  { id: 'mounting', label: 'Mounting Techniques' },
  { id: 'grinding', label: 'Grinding and Initial Preparation' },
  { id: 'controlled-removal', label: 'Controlled Removal (ATTO)' },
  { id: 'polishing', label: 'Polishing Techniques' },
  { id: 'applications', label: 'Specific Applications' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function PCBChipPreparationGuide() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData } = getGuideStructuredData(guide)

  // HowTo structured data for step-by-step process
  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Prepare PCB and Chip Samples for Metallographic Analysis',
    description: 'Step-by-step guide to preparing printed circuit boards and semiconductor chips for metallographic analysis using controlled removal techniques',
    image: 'https://metallography.org/logo.png',
    totalTime: 'PT90M',
    tool: [
      {
        '@type': 'HowToTool',
        name: 'ATTO-1000S Controlled Removal Polisher',
      },
      {
        '@type': 'HowToTool',
        name: 'Precision sectioning saw',
      },
      {
        '@type': 'HowToTool',
        name: 'Epoxy mounting resin',
      },
      {
        '@type': 'HowToTool',
        name: 'Diamond polishing compounds',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Sectioning',
        text: 'Use precision sectioning with low-speed cutting to minimize damage to delicate PCB layers and chip structures.',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Mounting',
        text: 'Mount using epoxy resin to provide edge retention and protect delicate structures during preparation.',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Grinding',
        text: 'Progressive grinding with fine grits (400, 600, 800, 1200) using light pressure to avoid delamination.',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Controlled Removal',
        text: 'Use ATTO-1000S controlled removal polisher for precise material removal with micrometer-level accuracy.',
        position: 4,
      },
      {
        '@type': 'HowToStep',
        name: 'Final Polishing',
        text: 'Final polish with 0.05 μm colloidal silica to achieve mirror finish for high-magnification analysis.',
        position: 5,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / PCB and Chip Sample Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Application-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">PCB and Chip Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing printed circuit boards (PCBs) and semiconductor chips for 
              metallographic analysis, with emphasis on controlled removal techniques and precision preparation 
              methods essential for electronics failure analysis and quality control.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#growing-demand" className="text-primary-600 hover:underline">Growing Demand in Electronics</a></li>
              <li><a href="#challenges" className="text-primary-600 hover:underline">Unique Challenges</a></li>
              <li><a href="#sectioning" className="text-primary-600 hover:underline">Sectioning PCBs and Chips</a></li>
              <li><a href="#mounting" className="text-primary-600 hover:underline">Mounting Techniques</a></li>
              <li><a href="#grinding" className="text-primary-600 hover:underline">Grinding and Initial Preparation</a></li>
              <li><a href="#controlled-removal" className="text-primary-600 hover:underline">Controlled Removal (ATTO)</a></li>
              <li><a href="#polishing" className="text-primary-600 hover:underline">Polishing Techniques</a></li>
              <li><a href="#applications" className="text-primary-600 hover:underline">Specific Applications</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                The preparation of printed circuit boards (PCBs) and semiconductor chips for metallographic 
                analysis presents unique challenges that require specialized techniques and equipment. Unlike 
                traditional metallographic samples, PCBs and chips consist of multiple layers of different 
                materials—<MaterialTooltip materialName="Copper">copper</MaterialTooltip> traces, solder, epoxy substrates, silicon, and various protective coatings—each 
                with different mechanical properties and removal rates.
              </p>
              <p>
                Successful <GlossaryTermTooltip term="Preparation">preparation</GlossaryTermTooltip> of these samples requires precision, patience, and the right equipment. 
                The goal is to reveal cross-sections that show the true structure of interconnects, solder 
                joints, via structures, and layer interfaces without introducing <GlossaryTermTooltip term="Artifact">artifacts</GlossaryTermTooltip> such as <GlossaryTermTooltip term="Delamination">delamination</GlossaryTermTooltip>, 
                <GlossaryTermTooltip term="Smearing">smearing</GlossaryTermTooltip>, or <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip> between different materials.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/ComputerChip.jpg"
                  alt="Computer chip cross-section showing multi-layer structure with interconnects and via structures"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Computer chip cross-section showing multi-layer structure. Proper preparation reveals interconnects, 
                  via structures, and layer interfaces without artifacts. This demonstrates the precision required for 
                  electronics sample preparation.
                </p>
              </div>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Key Consideration:</strong> PCB and chip preparation is fundamentally different from 
                  traditional metallography. The multi-material nature, delicate structures, and need for precise 
                  depth control make controlled removal techniques essential for successful analysis.
                </p>
              </div>
            </section>

            <section id="growing-demand" className="scroll-mt-24">
              <h2>Growing Demand in Electronics</h2>
              <p>
                The explosion of artificial intelligence (AI) and machine learning applications has dramatically 
                increased the demand for PCB and chip analysis. AI chips, GPUs, and specialized processors require 
                rigorous quality control, failure analysis, and process validation. This has led to a massive 
                increase in metallographic work on electronic components.
              </p>
              <h3>Why the Demand is Growing</h3>
              <ul>
                <li><strong>AI Chip Development:</strong> New AI processors require validation of complex multi-layer 
                structures, interconnects, and thermal management features</li>
                <li><strong>Failure Analysis:</strong> As devices become more complex, understanding failure modes 
                requires precise cross-sectional analysis</li>
                <li><strong>Quality Control:</strong> Manufacturing processes must be validated to ensure reliability 
                in critical applications</li>
                <li><strong>Process Development:</strong> New manufacturing techniques require metallographic validation</li>
                <li><strong>Reverse Engineering:</strong> Competitive analysis and intellectual property verification</li>
                <li><strong>Reliability Testing:</strong> Understanding degradation mechanisms in electronic components</li>
              </ul>
              <p>
                This increased demand has made expertise in PCB and chip preparation more valuable than ever. 
                Laboratories specializing in electronics analysis are seeing unprecedented workloads, and the 
                need for efficient, reliable preparation methods has never been greater.
              </p>
            </section>

            <section id="challenges" className="scroll-mt-24">
              <h2>Unique Challenges in PCB and Chip Preparation</h2>
              <p>
                Preparing PCBs and chips for metallographic analysis presents several unique challenges that 
                distinguish this work from traditional metallography:
              </p>
              <h3>Multi-Material Systems</h3>
              <p>
                PCBs and chips contain multiple materials with vastly different properties:
              </p>
              <ul>
                <li><strong><MaterialTooltip materialName="Copper">Copper</MaterialTooltip>:</strong> Soft, ductile, prone to <GlossaryTermTooltip term="Smearing">smearing</GlossaryTermTooltip></li>
                <li><strong>Solder:</strong> Very soft, low melting point, can flow during preparation</li>
                <li><strong>Epoxy/FR4:</strong> Brittle, can <GlossaryTermTooltip term="Delamination">delaminate</GlossaryTermTooltip>, different removal rate than metals</li>
                <li><strong>Silicon:</strong> Hard, brittle, can chip or crack</li>
                <li><strong>Protective Coatings:</strong> Often very thin, easily removed or damaged</li>
                <li><strong>Dielectric Layers:</strong> Soft, can be easily scratched or deformed, requiring careful <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> to avoid <GlossaryTermTooltip term="Artifact">artifacts</GlossaryTermTooltip></li>
              </ul>
              <h3>Delicate Structures</h3>
              <p>
                Modern electronics contain extremely fine features:
              </p>
              <ul>
                <li>Trace widths down to micrometers or even nanometers</li>
                <li>Via diameters of 50-100 μm or smaller</li>
                <li>Layer thicknesses of 10-50 μm</li>
                <li>Solder joints with critical dimensions requiring precise <GlossaryTermTooltip term="Preparation">preparation</GlossaryTermTooltip></li>
                <li>Bond wires and interconnects</li>
              </ul>
              <h3>Precision Requirements</h3>
              <p>
                Many applications require precise depth control:
              </p>
              <ul>
                <li>Targeting specific layers or features</li>
                <li>Removing exact amounts of material (metered removal)</li>
                <li>Preparing samples for specific analysis techniques (SEM, FIB, TEM)</li>
                <li>Maintaining planarity across the entire sample to avoid <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip></li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Critical Point:</strong> These challenges make traditional metallographic techniques 
                  insufficient. Controlled removal systems like the ATTO-1000S are not just beneficial—they 
                  are often essential for successful PCB and chip preparation.
                </p>
              </div>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning PCBs and Chips</h2>
              <p>
                <GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip> is the first critical step in PCB and chip preparation. The goal is to cut through 
                the sample to reveal the cross-section of interest while minimizing damage to delicate structures.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://www.metallographic.com/metallographic-equipment/sectioning.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/precision-cutting-abrasive-blades.webp"
                    alt="Precision cutting abrasive blades for delicate electronics sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Thin precision cutting blades (0.3-0.5 mm) minimize kerf loss and reduce damage to delicate 
                  PCB and chip structures. <GlossaryTermTooltip term="Precision Wafering">Precision wafering</GlossaryTermTooltip> techniques are ideal for electronics.
                </p>
              </div>
              <h3>Sectioning Considerations</h3>
              <ul>
                <li><strong>Low Speed:</strong> Use slow cutting speeds (50-150 RPM) to minimize heat generation 
                and mechanical damage</li>
                <li><strong>Thin Blades:</strong> Use thin <GlossaryTermTooltip term="Diamond Blade">diamond blades</GlossaryTermTooltip> or abrasive blades (0.3-0.5 mm) to minimize kerf loss 
                and reduce damage</li>
                <li><strong><GlossaryTermTooltip term="Coolant">Coolant</GlossaryTermTooltip>:</strong> Adequate coolant is essential to prevent overheating, which can 
                damage solder joints and cause <GlossaryTermTooltip term="Delamination">delamination</GlossaryTermTooltip></li>
                <li><strong>Orientation:</strong> Plan the cut direction to reveal the features of interest 
                (traces, vias, solder joints)</li>
                <li><strong>Support:</strong> Support fragile samples to prevent cracking during cutting</li>
              </ul>
              <h3>Sectioning Procedure</h3>
              <ol>
                <li>Identify the area of interest and mark the cutting plane</li>
                <li>Secure the sample in the cutting fixture</li>
                <li>Use a thin, fine-grit abrasive blade or <GlossaryTermTooltip term="Diamond Blade">diamond blade</GlossaryTermTooltip></li>
                <li>Cut at low speed with steady, light pressure</li>
                <li>Use continuous <GlossaryTermTooltip term="Coolant">coolant</GlossaryTermTooltip> flow</li>
                <li>Allow the blade to do the cutting—avoid forcing</li>
                <li>After cutting, clean the sample thoroughly to remove cutting debris</li>
              </ol>
              <ProductLink 
                productName="Precision Sectioning Equipment"
                href="https://www.metallographic.com/metallographic-equipment/sectioning.html"
                description="Precision sectioning saws with variable speed control for delicate electronics"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting Techniques</h2>
              <p>
                <GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip> provides <GlossaryTermTooltip term="Edge Retention">edge retention</GlossaryTermTooltip> and protects delicate structures during preparation. For PCBs 
                and chips, mounting is critical because the multi-layer structures are prone to <GlossaryTermTooltip term="Delamination">delamination</GlossaryTermTooltip> 
                and edge damage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/mounting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/epoxy_castable.webp"
                      alt="Epoxy castable mounting resin for electronics"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Epoxy castable mounting resin provides excellent edge retention for delicate PCB structures.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/mounting-cover.webp"
                      alt="Mounting equipment and accessories"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Mounting equipment and accessories for both compression and castable mounting.</p>
                </div>
              </div>
              <h3>Mounting Material Selection</h3>
              <p>
                <strong>Epoxy <GlossaryTermTooltip term="Resin">Resin</GlossaryTermTooltip>:</strong> Preferred for PCBs and chips because:
              </p>
              <ul>
                <li>Excellent <GlossaryTermTooltip term="Edge Retention">edge retention</GlossaryTermTooltip></li>
                <li>Low shrinkage minimizes stress on delicate structures</li>
                <li>Transparent options allow viewing of sample orientation</li>
                <li>Good adhesion to various materials</li>
                <li>Can be used at room temperature (<GlossaryTermTooltip term="Castable Mounting">castable</GlossaryTermTooltip>) or elevated temperature (<GlossaryTermTooltip term="Compression Mounting">compression</GlossaryTermTooltip>)</li>
              </ul>
              <h3>Mounting Procedure</h3>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>If using <GlossaryTermTooltip term="Castable Mounting">castable epoxy</GlossaryTermTooltip>, mix according to manufacturer's instructions</li>
                <li>Place sample in mounting cup with cut surface facing up</li>
                <li>Pour epoxy carefully to avoid bubbles</li>
                <li>Allow to cure completely (typically 4-8 hours for room temperature cure)</li>
                <li>For <GlossaryTermTooltip term="Compression Mounting">compression mounting</GlossaryTermTooltip>, use low pressure (1000-2000 psi) and moderate temperature (120-150°C)</li>
              </ol>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Tip:</strong> For samples with very delicate structures, consider using vacuum impregnation 
                  to ensure complete penetration of mounting material into any voids or cracks.
                </p>
              </div>
              <ProductLink 
                productName="Mounting Equipment and Resins"
                href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                description="Mounting presses and epoxy resins for electronics sample preparation"
              />
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding and Initial Preparation</h2>
              <p>
                <GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip> removes sectioning damage and prepares the surface for controlled removal polishing. 
                For PCBs and chips, grinding must be done carefully to avoid <GlossaryTermTooltip term="Delamination">delamination</GlossaryTermTooltip> and maintain the 
                integrity of multi-layer structures.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/abrasive grinding-SiC papers.webp"
                    alt="Silicon carbide grinding papers in various grit sizes for progressive grinding"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Silicon carbide (SiC) <GlossaryTermTooltip term="Abrasive">abrasive</GlossaryTermTooltip> grinding papers in fine <GlossaryTermTooltip term="Grit">grit</GlossaryTermTooltip> sizes (400, 600, 800, 1200) 
                  for progressive grinding. Use light pressure to avoid delamination of delicate PCB layers.
                </p>
              </div>
              <h3>Grinding Sequence</h3>
              <p>
                Use a progressive <GlossaryTermTooltip term="Grinding Sequence">grinding sequence</GlossaryTermTooltip> with fine grits:
              </p>
              <ol>
                <li><strong>400 <GlossaryTermTooltip term="Grit">grit</GlossaryTermTooltip>:</strong> Remove sectioning damage (30-60 seconds, light pressure)</li>
                <li><strong>600 grit:</strong> Remove previous scratches (30-60 seconds)</li>
                <li><strong>800 grit:</strong> Further refinement (30-60 seconds)</li>
                <li><strong>1200 grit:</strong> Final grinding step (30-60 seconds)</li>
              </ol>
              <h3>Grinding Best Practices</h3>
              <ul>
                <li><strong>Light Pressure:</strong> Use minimal pressure to avoid <GlossaryTermTooltip term="Delamination">delamination</GlossaryTermTooltip></li>
                <li><strong>Water Lubrication:</strong> Continuous water flow prevents overheating</li>
                <li><strong>Rotation:</strong> Rotate sample 90° between grits to ensure complete scratch removal</li>
                <li><strong>Time Control:</strong> Don't over-grind—just remove previous scratches</li>
                <li><strong>Inspection:</strong> Check frequently under low magnification to monitor progress</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Warning:</strong> Excessive grinding time or pressure can cause <GlossaryTermTooltip term="Delamination">delamination</GlossaryTermTooltip>, especially 
                  at layer interfaces. If you see signs of delamination, reduce pressure and grinding time.
                </p>
              </div>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Fine grit SiC papers for progressive grinding of delicate electronics"
              />
            </section>

            <section id="controlled-removal" className="scroll-mt-24">
              <h2>Controlled Removal (ATTO) - The Critical Technique</h2>
              <p>
                <strong>Controlled removal, also known as metered removal, is the most important technique for 
                PCB and chip preparation.</strong> This method allows for precise material removal in 
                micrometer-level increments, making it essential for applications requiring exact depth control 
                or targeting specific features.
              </p>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h3 className="text-xl font-semibold mb-3">Why Controlled Removal is Essential</h3>
                <p className="mb-4">
                  Traditional polishing methods remove material at variable rates depending on the material 
                  being polished. In multi-material systems like PCBs and chips, this creates several problems:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong><GlossaryTermTooltip term="Relief">Relief</GlossaryTermTooltip>:</strong> Softer materials (<MaterialTooltip materialName="Copper">copper</MaterialTooltip>, solder) polish faster than harder 
                  materials (silicon, epoxy), creating height differences</li>
                  <li><strong>Over-removal:</strong> Without precise control, you may remove too much material 
                  and lose the feature of interest</li>
                  <li><strong>Under-removal:</strong> You may not remove enough material to reach the target 
                  depth or feature</li>
                  <li><strong>Inconsistency:</strong> Manual polishing produces variable results, making it 
                  difficult to prepare multiple samples to the same depth</li>
                </ul>
                <p>
                  Controlled removal systems solve these problems by providing real-time feedback and precise 
                  control over material removal.
                </p>
              </div>

              <h3>How Controlled Removal Works</h3>
              <p>
                Controlled removal systems, such as the ATTO-1000S, use precision measurement and feedback 
                to remove material in exact increments. The system monitors removal in real-time with 
                micrometer-level resolution, allowing operators to:
              </p>
              <ul>
                <li>Remove precise amounts of material (e.g., 5 μm, 10 μm, 50 μm)</li>
                <li>Target specific layers or features</li>
                <li>Maintain consistent removal rates across the sample</li>
                <li>Prepare multiple samples to the same depth</li>
                <li>Achieve planarity across multi-material systems</li>
              </ul>

              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/equipment/grinding & polishing/controlled removal polisher/atto-1000s/atto-polisher-cover.webp"
                    alt="ATTO-1000S Controlled Removal Polisher for PCB and chip preparation"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  The ATTO-1000S Controlled Removal Polisher provides micrometer-level precision essential 
                  for PCB and chip preparation. Real-time monitoring and feedback ensure precise material 
                  removal to target specific features or depths.
                </p>
              </div>

              <h3>Key Features of the ATTO-1000S</h3>
              <ul>
                <li><strong>Micrometer-Adjustable Control:</strong> Pitch and roll control for exacting results</li>
                <li><strong>Real-Time Monitoring:</strong> 0.2 micron resolution removal monitoring</li>
                <li><strong>Precise Load Control:</strong> Sample load control from 0-300 grams</li>
                <li><strong>Variable Speed:</strong> Optimal material removal rates for different materials</li>
                <li><strong>Touchscreen Interface:</strong> Easy operation and parameter adjustment</li>
                <li><strong>Planarity Control:</strong> Maintains flatness across multi-material samples</li>
              </ul>

              <h3>Controlled Removal Procedure</h3>
              <ol>
                <li><strong>Initial Setup:</strong>
                  <ul>
                    <li>Mount sample securely in holder</li>
                    <li>Set initial load (typically 50-150 grams for PCBs)</li>
                    <li>Select appropriate polishing pad and compound</li>
                    <li>Set polishing speed (typically 50-100 RPM)</li>
                  </ul>
                </li>
                <li><strong>Calibration:</strong>
                  <ul>
                    <li>Calibrate the system according to manufacturer's instructions</li>
                    <li>Verify removal rate with a test sample if needed</li>
                  </ul>
                </li>
                <li><strong>Polishing:</strong>
                  <ul>
                    <li>Start with coarse diamond (9 μm or 6 μm) for initial material removal</li>
                    <li>Monitor removal in real-time on the display</li>
                    <li>Adjust parameters as needed to maintain desired removal rate</li>
                    <li>Continue until target depth is reached or sectioning damage is removed</li>
                  </ul>
                </li>
                <li><strong>Progressive Refinement:</strong>
                  <ul>
                    <li>Move to finer <GlossaryTermTooltip term="Diamond Polishing">diamond</GlossaryTermTooltip> sizes (3 μm, 1 μm) for surface refinement</li>
                    <li>Continue monitoring removal to ensure consistent progress</li>
                    <li>Adjust load and speed for optimal results</li>
                  </ul>
                </li>
                <li><strong>Final Polish:</strong>
                  <ul>
                    <li>Use 0.05 μm colloidal silica for final polish</li>
                    <li>Minimal removal at this stage—focus on surface finish</li>
                    <li>Verify final depth and surface quality</li>
                  </ul>
                </li>
              </ol>

              <h3>Applications Requiring Controlled Removal</h3>
              <ul>
                <li><strong>IC Flip Chip Preparation:</strong> Precise removal to reveal bump structures and interfaces</li>
                <li><strong>Via Analysis:</strong> Targeting specific via layers or depths</li>
                <li><strong>Layer Thickness Measurement:</strong> Removing exact amounts to measure layer thicknesses</li>
                <li><strong>Failure Analysis:</strong> Preparing samples to reveal failure sites at specific depths</li>
                <li><strong>SEM/FIB Preparation:</strong> Preparing samples for electron microscopy at precise depths</li>
                <li><strong>Multi-Sample Consistency:</strong> Preparing multiple samples to the same depth for comparison</li>
                <li><strong>Planarity Requirements:</strong> Maintaining flatness across multi-material systems</li>
              </ul>

              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Best Practice:</strong> For critical applications, document all parameters (load, 
                  speed, diamond size, removal rate) so procedures can be repeated consistently.
                </p>
              </div>

              <ProductLink 
                productName="ATTO-1000S Controlled Removal Polisher"
                href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                description="Precision controlled removal system with micrometer-level accuracy for PCB and chip preparation"
              />
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing Techniques</h2>
              <p>
                After controlled removal, final polishing prepares the surface for high-magnification analysis. 
                The goal is to achieve a mirror-like finish without introducing artifacts or removing too much material.
              </p>
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
                      alt="Diamond polishing compounds for electronics"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center"><GlossaryTermTooltip term="Diamond Polishing">Diamond polishing</GlossaryTermTooltip> compounds in various particle sizes for removing grinding scratches.</p>
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
                      alt="Polishing pads and cloths for different polishing stages"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various <GlossaryTermTooltip term="Polishing Pad">polishing pads</GlossaryTermTooltip> and <GlossaryTermTooltip term="Polishing Cloth">cloths</GlossaryTermTooltip> for different polishing stages.</p>
                </div>
              </div>
              <h3>Diamond Polishing Sequence</h3>
              <p>
                If not using controlled removal for all steps, use this sequence:
              </p>
              <ol>
                <li><strong>9 μm <GlossaryTermTooltip term="Diamond Polishing">diamond</GlossaryTermTooltip>:</strong> 3-5 minutes on hard <GlossaryTermTooltip term="Polishing Cloth">cloth</GlossaryTermTooltip> (Texmet or similar)</li>
                <li><strong>3 μm diamond:</strong> 3-5 minutes on medium-hard cloth</li>
                <li><strong>1 μm diamond:</strong> 2-3 minutes on soft cloth</li>
              </ol>
              <h3>Final Polishing</h3>
              <p>
                Final polish with <GlossaryTermTooltip term="Colloidal Silica">colloidal silica</GlossaryTermTooltip>:
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xs mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/final-polishing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/final-polishing-coloidal-silica.webp"
                    alt="Colloidal silica for final polishing"
                    width={300}
                    height={225}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 300px"
                  />
                </Link>
                <p className="text-xs text-gray-600 mt-2 italic text-center"><GlossaryTermTooltip term="Colloidal Silica">Colloidal silica</GlossaryTermTooltip> for <GlossaryTermTooltip term="Oxide Polishing">oxide polishing</GlossaryTermTooltip> produces excellent surface finishes.</p>
              </div>
              <ol>
                <li><strong>0.05 μm <GlossaryTermTooltip term="Colloidal Silica">colloidal silica</GlossaryTermTooltip>:</strong> 1-2 minutes on soft cloth</li>
                <li>Use light pressure to minimize material removal</li>
                <li>Rinse thoroughly with water</li>
                <li>Dry with compressed air (avoid touching the surface)</li>
              </ol>
              <h3>Polishing Considerations for PCBs and Chips</h3>
              <ul>
                <li><strong>Light Pressure:</strong> Always use minimal pressure to avoid <GlossaryTermTooltip term="Delamination">delamination</GlossaryTermTooltip></li>
                <li><strong>Short Times:</strong> Don't over-polish—just remove scratches from previous step</li>
                <li><strong>Frequent Inspection:</strong> Check progress frequently under microscope</li>
                <li><strong>Clean Between Steps:</strong> Thoroughly clean sample and change cloths between steps</li>
                <li><strong>Material-Specific Rates:</strong> Be aware that different materials polish at different rates, which can create <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip></li>
              </ul>
              <ProductLink 
                productName="Diamond Polishing Compounds"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond polishing compounds for electronics sample preparation"
              />
              <ProductLink 
                productName="Polishing Pads and Cloths"
                href="https://shop.metallographic.com/collections/polishing-pads"
                description="Polishing pads and cloths for different polishing stages"
              />
            </section>

            <section id="applications" className="scroll-mt-24">
              <h2>Specific Applications</h2>
              <h3>Flip Chip Analysis</h3>
              <p>
                Flip chip packages require precise preparation to reveal bump structures, underfill, and interfaces. 
                Controlled removal is essential to target specific bump rows or reveal the chip-to-substrate interface.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/ComputerChip2.jpg"
                  alt="Computer chip cross-section showing flip chip structure and interconnects"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Computer chip cross-section showing flip chip structure. Proper preparation with controlled removal 
                  reveals bump structures, underfill, and layer interfaces critical for failure analysis.
                </p>
              </div>
              <h3>Via and Through-Hole Analysis</h3>
              <p>
                Vias and through-holes are critical features in PCBs. Preparation must reveal:
              </p>
              <ul>
                <li>Via wall quality and plating thickness</li>
                <li>Via fill material (if present)</li>
                <li>Connection quality at layer interfaces</li>
                <li><GlossaryTermTooltip term="Void">Void</GlossaryTermTooltip> detection in via structures</li>
              </ul>
              <h3>Solder Joint Analysis</h3>
              <p>
                Solder joints are prone to <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip> and require careful preparation to reveal:
              </p>
              <ul>
                <li>Intermetallic compound formation</li>
                <li><GlossaryTermTooltip term="Void">Void</GlossaryTermTooltip> content and distribution</li>
                <li>Crack initiation and propagation</li>
                <li>Wetting quality</li>
              </ul>
              <h3>Layer Thickness Measurement</h3>
              <p>
                Precise layer thickness measurements require controlled removal to:
              </p>
              <ul>
                <li>Remove exact amounts of material</li>
                <li>Reveal layer interfaces clearly</li>
                <li>Maintain planarity for accurate measurements</li>
                <li>Prepare multiple samples consistently</li>
              </ul>
              <h3>Failure Analysis</h3>
              <p>
                Failure analysis often requires targeting specific failure sites:
              </p>
              <ul>
                <li>Precise depth control to reach failure location</li>
                <li>Minimal damage to preserve failure evidence</li>
                <li>Consistent preparation for comparison samples</li>
                <li>Preparation for SEM/FIB analysis</li>
              </ul>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting Common Issues</h2>
              <h3><GlossaryTermTooltip term="Delamination">Delamination</GlossaryTermTooltip></h3>
              <p>
                <strong>Symptoms:</strong> Layers separating, especially at interfaces
              </p>
              <p>
                <strong>Solutions:</strong>
              </p>
              <ul>
                <li>Reduce <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> pressure</li>
                <li>Use shorter polishing times</li>
                <li>Ensure adequate <GlossaryTermTooltip term="Mounting">mounting</GlossaryTermTooltip> material penetration</li>
                <li>Consider vacuum impregnation during <GlossaryTermTooltip term="Mounting">mounting</GlossaryTermTooltip></li>
                <li>Use controlled removal for more consistent results</li>
              </ul>
              <h3><GlossaryTermTooltip term="Relief">Relief</GlossaryTermTooltip> Between Materials</h3>
              <p>
                <strong>Symptoms:</strong> Height differences between <MaterialTooltip materialName="Copper">copper</MaterialTooltip>, solder, and substrate
              </p>
              <p>
                <strong>Solutions:</strong>
              </p>
              <ul>
                <li>Use controlled removal to maintain planarity</li>
                <li>Adjust polishing parameters for different materials</li>
                <li>Use appropriate <GlossaryTermTooltip term="Polishing Pad">polishing pads</GlossaryTermTooltip> (harder pads for soft materials)</li>
                <li>Minimize final polish time to reduce <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip></li>
              </ul>
              <h3><GlossaryTermTooltip term="Smearing">Smearing</GlossaryTermTooltip></h3>
              <p>
                <strong>Symptoms:</strong> <MaterialTooltip materialName="Copper">Copper</MaterialTooltip> or solder smeared across surface
              </p>
              <p>
                <strong>Solutions:</strong>
              </p>
              <ul>
                <li>Use harder <GlossaryTermTooltip term="Polishing Pad">polishing pads</GlossaryTermTooltip></li>
                <li>Reduce polishing pressure</li>
                <li>Use appropriate <GlossaryTermTooltip term="Diamond Polishing">diamond</GlossaryTermTooltip> size (not too fine too early)</li>
                <li>Ensure adequate lubrication</li>
                <li>Clean sample thoroughly between steps</li>
              </ul>
              <h3>Scratches</h3>
              <p>
                <strong>Symptoms:</strong> Visible scratches in final <GlossaryTermTooltip term="Polishing">polish</GlossaryTermTooltip>
              </p>
              <p>
                <strong>Solutions:</strong>
              </p>
              <ul>
                <li>Ensure complete scratch removal at each <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip> step</li>
                <li>Rotate sample 90° between <GlossaryTermTooltip term="Grit">grits</GlossaryTermTooltip></li>
                <li>Use fresh <GlossaryTermTooltip term="Diamond Polishing">polishing compounds</GlossaryTermTooltip></li>
                <li>Clean <GlossaryTermTooltip term="Polishing Pad">polishing pads</GlossaryTermTooltip>/<GlossaryTermTooltip term="Polishing Cloth">cloths</GlossaryTermTooltip> between uses</li>
                <li>Don't skip <GlossaryTermTooltip term="Grit">grit</GlossaryTermTooltip> sizes in the <GlossaryTermTooltip term="Grinding Sequence">grinding sequence</GlossaryTermTooltip></li>
              </ul>
              <h3>Over-Removal</h3>
              <p>
                <strong>Symptoms:</strong> Target feature removed or too much material removed
              </p>
              <p>
                <strong>Solutions:</strong>
              </p>
              <ul>
                <li>Use controlled removal for precise depth control</li>
                <li>Monitor removal progress frequently</li>
                <li>Reduce polishing time</li>
                <li>Use lighter pressure</li>
                <li>Document parameters for future reference</li>
              </ul>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Essential Equipment for PCB and Chip Preparation</h2>
              <p className="mb-4">
                Successful PCB and chip preparation requires specialized equipment, especially controlled removal 
                systems. The ATTO-1000S is the industry standard for precision electronics sample preparation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  View ATTO-1000S Controlled Removal Polisher
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
                  href="/guides?category=Material-Specific"
                  className="btn-secondary text-center"
                >
                  Browse Procedure Guides
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods (includes controlled removal details)
                </Link>
                <Link href="/guides/failure-analysis" className="text-primary-600 hover:underline font-semibold">
                  → Failure Analysis
                </Link>
                <Link href="/guides/quality-control-inspection" className="text-primary-600 hover:underline font-semibold">
                  → Quality Control and Inspection
                </Link>
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
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

