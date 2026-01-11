import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('mounting')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction to Metallographic Mounting' },
  { id: 'overview', label: 'Overview of Mounting Methods' },
  { id: 'compression-mounting', label: 'Compression Mounting' },
  { id: 'castable-mounting', label: 'Castable Mounting' },
  { id: 'when-to-choose', label: 'When to Choose Which Method' },
  { id: 'best-practices', label: 'Mounting Best Practices' },
  { id: 'common-defects', label: 'Common Mounting Defects and How to Avoid Them' },
  { id: 'summary', label: 'Summary' },
]

export default function MetallographicMountingGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Metallographic Mounting
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Process Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Complete Guide to Metallographic Mounting: Compression vs. Castable Methods</h1>
            <p className="text-xl text-gray-600">
              Learn the fundamentals of metallographic mounting, including compression and castable methods, 
              to ensure optimal sample preparation for grinding, polishing, and analysis.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction to Metallographic Mounting</a></li>
              <li><a href="#overview" className="text-primary-600 hover:underline">Overview of Mounting Methods</a></li>
              <li><a href="#compression-mounting" className="text-primary-600 hover:underline">Compression Mounting</a></li>
              <li><a href="#castable-mounting" className="text-primary-600 hover:underline">Castable Mounting</a></li>
              <li><a href="#when-to-choose" className="text-primary-600 hover:underline">When to Choose Which Method</a></li>
              <li><a href="#best-practices" className="text-primary-600 hover:underline">Mounting Best Practices</a></li>
              <li><a href="#common-defects" className="text-primary-600 hover:underline">Common Mounting Defects and How to Avoid Them</a></li>
              <li><a href="#summary" className="text-primary-600 hover:underline">Summary</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction to Metallographic Mounting</h2>
              <p>
                Mounting is a critical step in metallographic sample preparation that involves embedding 
                a specimen in a resin material to create a standardized, easy-to-handle sample. This process 
                transforms irregularly shaped or small samples into uniform mounts that can be efficiently 
                processed through grinding, polishing, and analysis.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/mounting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/mounting-cover.webp"
                    alt="Metallographic mounting materials and equipment"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Mounting materials and equipment for metallographic sample preparation. Proper mounting ensures easier handling, edge retention, and protection of delicate features.</p>
              </div>
              <h3>Why Mount Specimens?</h3>
              <p>
                Mounting serves several essential purposes in metallography:
              </p>
              <ul>
                <li><strong>Easier handling:</strong> Small, irregular, or sharp samples become safe and manageable</li>
                <li><strong>Edge retention:</strong> Protects edges and corners from rounding during grinding and polishing</li>
                <li><strong>Protection of delicate features:</strong> Prevents damage to fragile structures, coatings, or thin sections</li>
                <li><strong>Compatibility with grinding/polishing:</strong> Creates a uniform surface that works well with automated systems</li>
                <li><strong>Standardization:</strong> Produces consistent sample sizes and shapes for reproducible results</li>
                <li><strong>Orientation control:</strong> Allows precise positioning of the sample for specific analysis requirements</li>
              </ul>
              <p>
                The two main mounting methods are <strong>compression mounting</strong> and <strong>castable mounting</strong>. 
                Each has distinct advantages and is suited to different applications and sample types.
              </p>
            </section>

            <section id="overview" className="scroll-mt-24">
              <h2>Overview of Mounting Methods</h2>
              <p>
                Understanding the key differences between compression and castable mounting helps you select 
                the most appropriate method for your samples and workflow.
              </p>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Characteristic</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Compression Mounting</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Castable Mounting</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Speed</td>
                      <td className="border border-gray-300 px-4 py-3">Fast (5-15 minutes)</td>
                      <td className="border border-gray-300 px-4 py-3">Slower (30 minutes to several hours)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Cost</td>
                      <td className="border border-gray-300 px-4 py-3">Moderate to high (equipment + consumables)</td>
                      <td className="border border-gray-300 px-4 py-3">Lower (minimal equipment needed)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Hardness</td>
                      <td className="border border-gray-300 px-4 py-3">High (excellent edge retention)</td>
                      <td className="border border-gray-300 px-4 py-3">Variable (depends on resin type)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Temperature</td>
                      <td className="border border-gray-300 px-4 py-3">High (150-180°C)</td>
                      <td className="border border-gray-300 px-4 py-3">Low to ambient (room temperature)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Pressure</td>
                      <td className="border border-gray-300 px-4 py-3">High (2000-4000 psi)</td>
                      <td className="border border-gray-300 px-4 py-3">Low to none</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Best For</td>
                      <td className="border border-gray-300 px-4 py-3">High throughput, metals, automated labs</td>
                      <td className="border border-gray-300 px-4 py-3">Delicate samples, heat-sensitive materials, multiple samples</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="compression-mounting" className="scroll-mt-24">
              <h2>Compression Mounting</h2>
              <p>
                Compression mounting is a fast, efficient method that uses heat and pressure to form a 
                solid mount from resin pellets. This method is widely used in high-throughput laboratories 
                and for standard metal samples.
              </p>
              <h3>The Compression Mounting Process</h3>
              <p>
                The compression mounting process involves several key steps:
              </p>
              <ol>
                <li><strong>Sample preparation:</strong> Clean the sample thoroughly to remove cutting fluid, debris, and contaminants</li>
                <li><strong>Resin selection:</strong> Choose appropriate resin pellets based on material and requirements</li>
                <li><strong>Loading:</strong> Place the sample in a mounting mold and add resin pellets around it</li>
                <li><strong>Heating:</strong> Apply heat (typically 150-180°C) to soften the resin</li>
                <li><strong>Compression:</strong> Apply high pressure (2000-4000 psi depending on resin type) to form the mount</li>
                <li><strong>Curing:</strong> Hold temperature and pressure for 5-8 minutes to ensure complete curing</li>
                <li><strong>Cooling:</strong> Cool the mount under pressure to room temperature before removal</li>
              </ol>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://metallographic.com/metallographic-equipment/compression-mounting.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/equipment/compression mounting/hydraulic mounting press/tp-7500s/tp-7500s-cover.webp"
                    alt="Hydraulic compression mounting press for metallographic samples"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Hydraulic compression mounting press (TP-7500S). Compression mounting presses apply heat and pressure to create durable mounts quickly.</p>
              </div>
              <h3>Common Compression Mounting Materials</h3>
              <ul>
                <li><strong>Phenolic:</strong> Hard, durable, excellent edge retention. Best for metals and high-throughput applications. Requires 3000-4000 psi and 150-180°C.</li>
                <li><strong>Epoxy:</strong> Strong adhesion, minimal shrinkage. Good for edge retention. Requires 2000-3000 psi and 150-180°C.</li>
                <li><strong>Diallyl phthalate (DAP):</strong> Very hard, excellent for edge retention. Suitable for automated polishing systems.</li>
                <li><strong>Acrylic:</strong> Fast curing, transparent. Good for quick turnaround but less durable than phenolic or epoxy.</li>
              </ul>
              <h3>Key Benefits of Compression Mounting</h3>
              <ul>
                <li><strong>Durability:</strong> Produces hard, robust mounts that withstand aggressive grinding and polishing</li>
                <li><strong>Speed:</strong> Complete mounting cycle in 5-15 minutes</li>
                <li><strong>Edge definition:</strong> Excellent edge retention, critical for analyzing coatings, edges, or interfaces</li>
                <li><strong>Consistency:</strong> Automated presses ensure reproducible results</li>
                <li><strong>High throughput:</strong> Ideal for processing many samples efficiently</li>
              </ul>
              <h3>Ideal Use Cases</h3>
              <ul>
                <li>High-volume sample preparation in quality control labs</li>
                <li>Standard metal samples requiring robust mounts</li>
                <li>Automated grinding and polishing workflows</li>
                <li>Applications requiring excellent edge retention</li>
                <li>Production environments with consistent sample types</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <div className="mb-3 rounded-lg overflow-hidden max-w-xs mx-auto">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/compression-mounting.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/compression mounting/pneumatic mounting press/tp-7100s/tp-7100s-cover.webp"
                      alt="Pneumatic compression mounting press"
                      width={250}
                      height={188}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Required Equipment:</strong> Compression Mounting Press
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  Compression mounting presses such as the SimpliMetX (or equivalent TP-7500S hydraulic or TP-7100S pneumatic presses) 
                  provide automated control of temperature, pressure, and timing for consistent, high-quality mounts.
                </p>
                <Link 
                  href="https://metallographic.com/metallographic-equipment/compression-mounting.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View Compression Mounting Equipment →
                </Link>
              </div>
              <ProductLink 
                productName="Compression Mounting Resins"
                href="https://shop.metallographic.com/collections/mounting"
                description="Phenolic, epoxy, diallyl phthalate, and acrylic compression mounting resins"
              />
            </section>

            <section id="castable-mounting" className="scroll-mt-24">
              <h2>Castable Mounting</h2>
              <p>
                Castable mounting involves pouring liquid resin into a mold around the sample and allowing 
                it to cure at room temperature or with minimal heating. This method is ideal for delicate, 
                heat-sensitive, or irregularly shaped samples.
              </p>
              <h3>How Castable Mounting Works</h3>
              <p>
                The castable mounting process is gentler than compression mounting:
              </p>
              <ol>
                <li><strong>Sample preparation:</strong> Clean and dry the sample thoroughly</li>
                <li><strong>Mold setup:</strong> Place the sample in an appropriate mold (silicone, metal, or reusable molds)</li>
                <li><strong>Resin mixing:</strong> Mix resin components according to manufacturer instructions (for two-part systems)</li>
                <li><strong>Pouring:</strong> Pour liquid resin into the mold, ensuring the sample is fully surrounded</li>
                <li><strong>Bubble removal:</strong> Use vacuum or gentle tapping to remove air bubbles (if needed)</li>
                <li><strong>Curing:</strong> Allow resin to cure at room temperature or use UV curing (for UV-curable resins)</li>
                <li><strong>Demolding:</strong> Remove the cured mount from the mold</li>
              </ol>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/castable-mounting.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/castable mounting/pressure mounting system/thetamount-cover.webp"
                      alt="Pressure mounting system for castable mounting"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Pressure mounting system (ThetaMount) for castable mounting with pressure assistance to eliminate bubbles.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/castable-mounting.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/castable mounting/uv curing system/uvmount-cover.webp"
                      alt="UV curing system for castable mounting"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">UV curing chamber (UVMount) for fast curing of UV-curable mounting resins.</p>
                </div>
              </div>
              <h3>Castable Resin Types</h3>
              <ul>
                <li><strong>Epoxy:</strong> Strong adhesion, minimal shrinkage, excellent for edge retention. Two-part system with longer cure time (several hours to overnight). Best for critical applications.</li>
                <li><strong>Acrylic:</strong> Fast curing (30 minutes to 2 hours), lower cost, transparent. Good for general use but may have more shrinkage than epoxy.</li>
                <li><strong>Polyester:</strong> Budget-friendly option, moderate properties. Suitable for non-critical applications.</li>
                <li><strong>UV-curable:</strong> Very fast curing (minutes) when exposed to UV light. Requires UV curing equipment but offers rapid turnaround.</li>
              </ul>
              <h3>Benefits of Castable Mounting</h3>
              <ul>
                <li><strong>Lower pressure:</strong> No high-pressure application, protecting delicate samples</li>
                <li><strong>Heat-sensitive friendly:</strong> Room temperature curing prevents thermal damage</li>
                <li><strong>Flexible geometry:</strong> Can accommodate irregular shapes and multiple samples in one mount</li>
                <li><strong>Cost-effective:</strong> Minimal equipment investment required</li>
                <li><strong>Good adhesion:</strong> Liquid resin flows around sample features for excellent contact</li>
              </ul>
              <h3>Limitations and Considerations</h3>
              <ul>
                <li><strong>Longer cure time:</strong> Most resins require 30 minutes to several hours (or overnight) to fully cure</li>
                <li><strong>Air bubbles:</strong> May require vacuum degassing to eliminate porosity, especially for epoxy resins</li>
                <li><strong>Shrinkage:</strong> Some resins shrink during curing, which can affect edge retention</li>
                <li><strong>Hardness:</strong> Generally softer than compression mounts, may require careful polishing</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <div className="mb-3 rounded-lg overflow-hidden max-w-xs mx-auto">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/castable-mounting.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/castable mounting/vacuum mounting system/lssa-011-cover.webp"
                      alt="Vacuum mounting system for porosity-free castable mounts"
                      width={250}
                      height={188}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Optional Equipment:</strong> Vacuum and UV Curing Systems
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  Vacuum systems (like LSSA-011) remove air bubbles for porosity-free mounts. UV curing chambers 
                  (like UVMount) enable rapid curing of UV-curable resins, significantly reducing processing time.
                </p>
                <Link 
                  href="https://metallographic.com/metallographic-equipment/castable-mounting.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View Castable Mounting Equipment →
                </Link>
              </div>
              <ProductLink 
                productName="Castable Mounting Resins"
                href="https://shop.metallographic.com/collections/mounting"
                description="Epoxy, acrylic, polyester, and UV-curable castable mounting resins"
              />
            </section>

            <section id="when-to-choose" className="scroll-mt-24">
              <h2>When to Choose Which Method</h2>
              <p>
                Selecting the appropriate mounting method depends on your sample characteristics, throughput 
                requirements, and available equipment. Use this decision guide to make the right choice.
              </p>
              <h3>Use Compression Mounting When:</h3>
              <ul>
                <li><strong>High throughput is needed:</strong> Processing many samples per day requires the speed of compression mounting</li>
                <li><strong>Standard metal samples:</strong> Most metals can withstand the heat and pressure of compression mounting</li>
                <li><strong>Excellent edge retention is critical:</strong> Compression mounts provide superior edge definition</li>
                <li><strong>Automated lab workflow:</strong> Compression presses integrate well with automated grinding and polishing systems</li>
                <li><strong>Consistent, robust mounts needed:</strong> Compression mounting produces uniform, durable mounts</li>
              </ul>
              <h3>Use Castable Mounting When:</h3>
              <ul>
                <li><strong>Fragile or delicate specimens:</strong> Samples that cannot withstand high pressure or temperature</li>
                <li><strong>Heat-sensitive materials:</strong> Polymers, composites, or materials that degrade at elevated temperatures</li>
                <li><strong>Multiple samples in one mount:</strong> Castable mounting easily accommodates several samples</li>
                <li><strong>Irregular geometries:</strong> Complex shapes that benefit from liquid resin flow</li>
                <li><strong>Limited equipment budget:</strong> Castable mounting requires minimal initial investment</li>
                <li><strong>Low to moderate throughput:</strong> When speed is less critical than sample protection</li>
              </ul>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h3 className="text-lg font-semibold mb-3">Quick Decision Matrix</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">Sample is heat-sensitive or fragile?</p>
                    <p className="text-sm text-gray-700">→ Choose <strong>Castable Mounting</strong></p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Need to process 20+ samples per day?</p>
                    <p className="text-sm text-gray-700">→ Choose <strong>Compression Mounting</strong></p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Edge retention is the top priority?</p>
                    <p className="text-sm text-gray-700">→ Choose <strong>Compression Mounting</strong></p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Mounting multiple samples together?</p>
                    <p className="text-sm text-gray-700">→ Choose <strong>Castable Mounting</strong></p>
                  </div>
                </div>
              </div>
            </section>

            <section id="best-practices" className="scroll-mt-24">
              <h2>Mounting Best Practices</h2>
              <p>
                Following best practices ensures high-quality mounts that facilitate excellent grinding, 
                polishing, and analysis results.
              </p>
              <h3>Sample Orientation</h3>
              <ul>
                <li><strong>Plan your analysis:</strong> Orient the sample to expose the surface of interest (cross-section, longitudinal, etc.)</li>
                <li><strong>Edge analysis:</strong> For edge or coating analysis, ensure the edge is perpendicular to the mount surface</li>
                <li><strong>Multiple samples:</strong> When mounting multiple samples, maintain consistent orientation for comparison</li>
                <li><strong>Labeling:</strong> Consider sample orientation when placing labels or identifiers</li>
              </ul>
              <h3>Handling Sharp or Complex Geometries</h3>
              <ul>
                <li><strong>Sharp edges:</strong> Use castable mounting for very sharp samples to avoid pressure damage</li>
                <li><strong>Thin sections:</strong> Support thin samples with backing material or use low-pressure methods</li>
                <li><strong>Irregular shapes:</strong> Castable mounting allows resin to flow around complex geometries</li>
                <li><strong>Small samples:</strong> Consider mounting multiple small samples together for easier handling</li>
              </ul>
              <h3>Avoiding Air Bubbles</h3>
              <ul>
                <li><strong>Clean samples:</strong> Ensure samples are completely dry before mounting</li>
                <li><strong>Proper mixing:</strong> For two-part resins, mix thoroughly but avoid introducing air</li>
                <li><strong>Vacuum degassing:</strong> Use vacuum systems for epoxy resins to remove trapped air</li>
                <li><strong>Gentle pouring:</strong> Pour castable resins slowly and steadily to minimize bubble formation</li>
                <li><strong>Temperature control:</strong> Some resins are more prone to bubbles at certain temperatures</li>
              </ul>
              <h3>Labeling and Identification</h3>
              <ul>
                <li><strong>Embedded labels:</strong> Place sample identifiers or labels in the mount for permanent tracking</li>
                <li><strong>Color coding:</strong> Use colored resins or dyes to distinguish sample groups</li>
                <li><strong>Documentation:</strong> Record mounting parameters (resin type, temperature, pressure, time) for reproducibility</li>
              </ul>
              <h3>Cleaning and Preparation</h3>
              <ul>
                <li><strong>Remove cutting fluid:</strong> Clean samples thoroughly with appropriate solvents</li>
                <li><strong>Dry completely:</strong> Ensure samples are dry to prevent moisture-related defects</li>
                <li><strong>Remove loose particles:</strong> Clean samples to prevent contamination in the mount</li>
                <li><strong>Handle with care:</strong> Avoid touching critical surfaces with bare hands</li>
              </ul>
              <h3>Resin Mixing (for Castable Mounting)</h3>
              <ul>
                <li><strong>Follow manufacturer instructions:</strong> Use correct mixing ratios and procedures</li>
                <li><strong>Mix thoroughly:</strong> Ensure complete mixing without introducing excessive air</li>
                <li><strong>Work quickly:</strong> Many resins have limited pot life after mixing</li>
                <li><strong>Temperature considerations:</strong> Room temperature affects cure time and viscosity</li>
              </ul>
            </section>

            <section id="common-defects" className="scroll-mt-24">
              <h2>Common Mounting Defects and How to Avoid Them</h2>
              <p>
                Understanding common mounting defects helps you troubleshoot issues and achieve consistent, 
                high-quality results.
              </p>
              <h3>Air Entrapment</h3>
              <p>
                <strong>Symptoms:</strong> Visible bubbles or voids in the mount, especially near the sample
              </p>
              <p>
                <strong>Causes and Solutions:</strong>
              </p>
              <ul>
                <li>Wet or contaminated sample → Clean and dry sample thoroughly before mounting</li>
                <li>Improper resin mixing → Mix two-part resins thoroughly but gently</li>
                <li>Rapid pouring → Pour castable resins slowly and steadily</li>
                <li>Insufficient vacuum → Use vacuum degassing for epoxy resins</li>
                <li>Complex sample geometry → Use pressure-assisted casting or vacuum systems</li>
              </ul>
              <h3>Incomplete Curing</h3>
              <p>
                <strong>Symptoms:</strong> Soft or tacky mount surface, poor edge retention, mount failure during grinding
              </p>
              <p>
                <strong>Causes and Solutions:</strong>
              </p>
              <ul>
                <li>Insufficient cure time → Allow full cure time per manufacturer specifications</li>
                <li>Incorrect temperature → Ensure proper temperature for compression mounting or room temperature for castable</li>
                <li>Improper mixing ratios → Use correct resin-to-hardener ratios for two-part systems</li>
                <li>Expired or contaminated resin → Use fresh, properly stored resins</li>
                <li>Insufficient pressure (compression) → Apply correct pressure for the resin type</li>
              </ul>
              <h3>Resin Cracking</h3>
              <p>
                <strong>Symptoms:</strong> Cracks in the mount, especially at edges or around the sample
              </p>
              <p>
                <strong>Causes and Solutions:</strong>
              </p>
              <ul>
                <li>Rapid cooling → Cool compression mounts slowly under pressure</li>
                <li>Thermal shock → Avoid sudden temperature changes</li>
                <li>Excessive shrinkage → Use low-shrinkage resins (epoxy) for critical applications</li>
                <li>Sample-resin mismatch → Ensure resin thermal expansion matches sample characteristics</li>
                <li>Insufficient resin → Use adequate resin volume to prevent stress concentration</li>
              </ul>
              <h3>Poor Edge Retention</h3>
              <p>
                <strong>Symptoms:</strong> Rounded edges, loss of edge definition during grinding/polishing
              </p>
              <p>
                <strong>Causes and Solutions:</strong>
              </p>
              <ul>
                <li>Soft resin → Use harder resins (phenolic, DAP) for compression mounting</li>
                <li>Insufficient resin hardness → Ensure complete curing</li>
                <li>Sample-resin hardness mismatch → Match resin hardness to sample and polishing requirements</li>
                <li>Improper sample orientation → Orient edges perpendicular to mount surface</li>
              </ul>
              <h3>Sample Damage</h3>
              <p>
                <strong>Symptoms:</strong> Cracks, deformation, or microstructural changes in the sample
              </p>
              <p>
                <strong>Causes and Solutions:</strong>
              </p>
              <ul>
                <li>Excessive pressure → Use lower pressure or castable mounting for delicate samples</li>
                <li>High temperature → Use castable mounting for heat-sensitive materials</li>
                <li>Thermal shock → Cool gradually and avoid rapid temperature changes</li>
                <li>Mechanical damage during handling → Handle samples carefully before and during mounting</li>
              </ul>
              <h3>Contamination</h3>
              <p>
                <strong>Symptoms:</strong> Foreign particles, discoloration, or artifacts in the mount
              </p>
              <p>
                <strong>Causes and Solutions:</strong>
              </p>
              <ul>
                <li>Dirty sample → Clean samples thoroughly before mounting</li>
                <li>Contaminated resin → Use fresh, clean resins and clean mixing equipment</li>
                <li>Dirty molds → Clean and maintain mounting molds regularly</li>
                <li>Cross-contamination → Use separate equipment for different sample types when needed</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-6 rounded">
                <h3 className="text-lg font-semibold mb-2">Troubleshooting Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li>Always document mounting parameters (temperature, pressure, time, resin type) for troubleshooting</li>
                  <li>Keep a reference mount of known quality for comparison</li>
                  <li>Inspect mounts before proceeding to grinding - it's easier to remount than to fix issues later</li>
                  <li>When in doubt, test mounting parameters on non-critical samples first</li>
                  <li>Consult resin manufacturer specifications for optimal conditions</li>
                </ul>
              </div>
            </section>

            <section id="summary" className="scroll-mt-24">
              <h2>Summary</h2>
              <p>
                Metallographic mounting is a fundamental step that significantly impacts the quality and 
                efficiency of your sample preparation workflow. Selecting the right mounting method (whether 
                compression or castable) depends on your specific sample characteristics, throughput requirements, 
                and available resources.
              </p>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h3 className="text-lg font-semibold mb-3">Key Takeaways</h3>
                <ul className="space-y-2">
                  <li><strong>Compression mounting</strong> offers speed, durability, and excellent edge retention for high-throughput metal sample preparation</li>
                  <li><strong>Castable mounting</strong> provides gentle, low-pressure mounting ideal for delicate, heat-sensitive, or irregularly shaped samples</li>
                  <li>Proper sample preparation, orientation, and resin selection are critical for successful mounting</li>
                  <li>Understanding and avoiding common defects ensures consistent, high-quality mounts</li>
                  <li>Good mounting technique sets the foundation for optimal grinding and polishing results</li>
                </ul>
              </div>
              <p>
                Remember that mounting is the foundation of your sample preparation process. A well-executed 
                mount makes subsequent grinding and polishing steps more efficient and effective, ultimately 
                leading to better microstructural analysis results. Take time to select the appropriate method, 
                follow best practices, and you'll be rewarded with mounts that support excellent metallographic 
                analysis.
              </p>
            </section>

            {/* Equipment Recommendations */}
            <section className="mt-12 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
              <h2 className="text-2xl font-semibold mb-4">Recommended Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/compression-mounting.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/compression mounting/hydraulic mounting press/tp-7500s/tp-7500s-cover.webp"
                        alt="Hydraulic compression mounting press"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Compression Mounting Presses</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Hydraulic and pneumatic compression mounting presses provide automated control of temperature, 
                    pressure, and timing for consistent, high-quality mounts. Ideal for high-throughput laboratories.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/compression-mounting.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Compression Mounting Equipment →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/castable-mounting.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/castable mounting/uv curing system/uvmount-cover.webp"
                        alt="UV curing system for castable mounting"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Castable Mounting Systems</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Pressure mounting systems, UV curing chambers, and vacuum systems enhance castable mounting 
                    results by eliminating bubbles and accelerating cure times for faster turnaround.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/castable-mounting.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Castable Mounting Equipment →
                  </Link>
                </div>
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
                  href="https://shop.metallographic.com/collections/mounting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Shop Mounting Supplies
                </Link>
                <Link 
                  href="https://metallographic.com/equipment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Browse Equipment
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/guides/sectioning" className="text-primary-600 hover:underline font-semibold">
                  → Sectioning
                </Link>
                <Link href="/guides/stainless-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Stainless Steel Preparation
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

