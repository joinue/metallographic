import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import YouTubeVideo from '@/components/YouTubeVideo'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('sectioning')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'abrasive-sectioning', label: 'Abrasive Sectioning' },
  { id: 'abrasive-blade-selection', label: 'Abrasive Blade Selection' },
  { id: 'precision-wafering', label: 'Precision Wafering' },
  { id: 'diamond-blade-selection', label: 'Diamond Blade Selection' },
  { id: 'cutting-parameters', label: 'Cutting Parameters' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function SectioningGuide() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData, howToStructuredData } = getGuideStructuredData(guide)

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
      {howToStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
      )}
      <article className="py-12">
      <GuideSideNav sections={sections} />
      <div className="container-custom lg:pl-0 xl:pl-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Sectioning
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Process Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Sectioning Techniques</h1>
            <p className="text-xl text-gray-600">
              Master the art of sectioning metallographic samples using abrasive cutting and precision 
              wafering. Learn proper blade selection, cutting parameters, and techniques to minimize 
              damage and deformation.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#abrasive-sectioning" className="text-primary-600 hover:underline">Abrasive Sectioning</a></li>
              <li><a href="#abrasive-blade-selection" className="text-primary-600 hover:underline">Abrasive Blade Selection</a></li>
              <li><a href="#precision-wafering" className="text-primary-600 hover:underline">Precision Wafering</a></li>
              <li><a href="#diamond-blade-selection" className="text-primary-600 hover:underline">Diamond Blade Selection</a></li>
              <li><a href="#cutting-parameters" className="text-primary-600 hover:underline">Cutting Parameters</a></li>
              <li><a href="#best-practices" className="text-primary-600 hover:underline">Best Practices</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Sectioning is the first critical step in metallographic sample preparation. The goal is 
                to cut a representative sample from the larger workpiece while minimizing damage, 
                deformation, and heat generation. Proper sectioning techniques ensure that subsequent 
                preparation steps (grinding, polishing) can efficiently remove the damaged layer and 
                reveal the true microstructure.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/sectioning-cover.webp"
                    alt="Abrasive cutting blades for metallographic sectioning"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Precision abrasive cut-off blades designed for metallographic sectioning. Proper blade selection minimizes heat generation and deformation during cutting.</p>
              </div>
              <p>
                There are two primary sectioning methods used in metallography: <strong>abrasive sectioning</strong> 
                and <strong>precision wafering</strong>. Each method has specific applications and advantages. 
                Understanding when and how to use each technique is essential for successful sample preparation.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Guide Structure:</strong> This guide follows a logical flow: First, learn about each 
                  sectioning method (<a href="#abrasive-sectioning" className="text-primary-600 hover:underline font-semibold">Abrasive Sectioning</a> and 
                  <a href="#precision-wafering" className="text-primary-600 hover:underline font-semibold"> Precision Wafering</a>), then select the appropriate 
                  blade (<a href="#abrasive-blade-selection" className="text-primary-600 hover:underline font-semibold">Abrasive Blades</a> or 
                  <a href="#diamond-blade-selection" className="text-primary-600 hover:underline font-semibold"> Diamond Blades</a>), configure 
                  <a href="#cutting-parameters" className="text-primary-600 hover:underline font-semibold"> Cutting Parameters</a>, follow 
                  <a href="#best-practices" className="text-primary-600 hover:underline font-semibold"> Best Practices</a>, and refer to 
                  <a href="#troubleshooting" className="text-primary-600 hover:underline font-semibold"> Troubleshooting</a> if issues arise.
                </p>
              </div>
            </section>

            <section id="abrasive-sectioning" className="scroll-mt-24">
              <h2>Abrasive Sectioning</h2>
              <p>
                Abrasive sectioning uses a rotating abrasive cut-off wheel to cut through materials. 
                This method is versatile and can handle a wide range of materials, from soft non-ferrous 
                metals to hard steels and ceramics. The key to successful abrasive sectioning is selecting 
                the appropriate blade, controlling cutting speed and pressure, and using adequate cooling.
              </p>
              
              <h3>How Abrasive Sectioning Works</h3>
              <p>
                Abrasive cut-off wheels contain abrasive particles (typically aluminum oxide or silicon 
                carbide) bonded together with a resin or rubber matrix. As the wheel rotates, the 
                abrasive particles remove material through a combination of cutting and grinding action. 
                The bond type and abrasive composition determine the wheel's cutting characteristics, 
                including cutting speed, material removal rate, and heat generation.
              </p>

              <h3>Advantages of Abrasive Sectioning</h3>
              <ul>
                <li><strong>Versatility:</strong> Can cut virtually any material, from soft aluminum to hard ceramics</li>
                <li><strong>Cost-effective:</strong> Abrasive blades are relatively inexpensive compared to diamond blades</li>
                <li><strong>Fast cutting:</strong> Efficient material removal for most applications</li>
                <li><strong>Wide availability:</strong> Abrasive blades are readily available in many sizes and types</li>
              </ul>

              <h3>Limitations</h3>
              <ul>
                <li>Generates more heat than precision wafering</li>
                <li>Can cause more deformation in soft materials</li>
                <li>Blade wear requires periodic replacement</li>
                <li>May not be suitable for very thin sections or delicate materials</li>
              </ul>

              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Key Principle:</strong> The goal of abrasive sectioning is to remove material 
                  efficiently while minimizing heat generation and deformation. This requires proper blade 
                  selection, controlled cutting speed, adequate cooling, and appropriate pressure.
                </p>
              </div>
              
              <p className="mt-4">
                <strong>Next Steps:</strong> Once you understand abrasive sectioning, proceed to 
                <a href="#abrasive-blade-selection" className="text-primary-600 hover:underline font-semibold"> Abrasive Blade Selection</a> to choose 
                the right blade for your material, then review <a href="#cutting-parameters" className="text-primary-600 hover:underline font-semibold">Cutting Parameters</a> 
                for optimal settings.
              </p>
            </section>

            <section id="abrasive-blade-selection" className="scroll-mt-24">
              <h2>Blade Selection for Abrasive Cutting</h2>
              <p>
                Selecting the correct abrasive blade is critical for successful sectioning. The blade 
                must match the material being cut, the cutting conditions, and the desired results. 
                Different blade types are optimized for different materials and applications.
              </p>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/precision-cutting-abrasive-blades.webp"
                    alt="Precision cutting abrasive blades for metallographic sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Precision abrasive cut-off blades available in various types and sizes for different material applications.</p>
              </div>

              <h3>Blade Types and Applications</h3>
              <p>
                Abrasive blades are classified by their abrasive type, bond hardness, and application. 
                The following table provides specific blade recommendations for different materials and 
                blade diameters:
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Description</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">10-inch</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">12-inch</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">14-inch</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">16-inch</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Soft non-ferrous materials (aluminum, brass, zinc, etc.)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-E250</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-E300</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-E350</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-E400</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Hard non-ferrous materials (titanium, zirconium, etc.)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-C250</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-C300</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-C350</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-C400</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Soft steels</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-E250</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-E300</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-E350</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-E400</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Hard and case-hardened steels</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-VHS250</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-VHS300</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-VHS350</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-VHS400</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">General steels and ferrous metals</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-D250T</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-D300</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-D350</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-D400</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Universal Thin Blade</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-A250</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-A300</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-A350</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-A400</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Industrial general purpose thin blade</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-I250</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-I300</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-I350</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">MAX-I400</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Understanding Blade Designations</h3>
              <ul>
                <li><strong>MAX-E Series:</strong> Designed for soft materials like aluminum, brass, and soft steels. Features a softer bond that wears appropriately for these materials.</li>
                <li><strong>MAX-C Series:</strong> Optimized for hard non-ferrous materials such as titanium and zirconium. Provides aggressive cutting with controlled wear.</li>
                <li><strong>MAX-VHS Series:</strong> Very hard steel blades for case-hardened and hard steels. Features a hard bond and aggressive abrasive for efficient cutting.</li>
                <li><strong>MAX-D Series:</strong> General-purpose blades for ferrous metals and steels. Balanced performance for most steel cutting applications.</li>
                <li><strong>MAX-A Series:</strong> Universal thin blades for general applications. Thin profile minimizes material loss and heat generation.</li>
                <li><strong>MAX-I Series:</strong> Industrial general-purpose thin blades. Versatile option for mixed material cutting.</li>
              </ul>

              <h3>Blade Diameter Selection</h3>
              <p>
                Blade diameter affects cutting capacity and cutting speed. Larger diameter blades can 
                cut larger samples but may generate more heat. Select the smallest diameter blade that 
                can accommodate your sample size to minimize heat generation and material loss.
              </p>

              <ProductLink 
                productName="Abrasive Cut-Off Blades"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="Abrasive blades suitable for all material types and applications"
              />

              <p className="mt-4">
                <strong>Next Steps:</strong> After selecting your blade, configure the 
                <a href="#cutting-parameters" className="text-primary-600 hover:underline font-semibold"> Cutting Parameters</a> (speed, pressure, cooling) 
                for optimal results. See <a href="#best-practices" className="text-primary-600 hover:underline font-semibold">Best Practices</a> for 
                complete procedures.
              </p>
            </section>

            <section id="precision-wafering" className="scroll-mt-24">
              <h2>Precision Wafering</h2>
              <p>
                Precision wafering uses a thin diamond or cubic boron nitride (CBN) blade to make very 
                precise, low-damage cuts. This method is ideal for delicate materials, thin sections, 
                and applications where minimal damage is critical. Precision wafering typically produces 
                less deformation and heat-affected zones compared to abrasive sectioning.
              </p>

              <h3>How Precision Wafering Works</h3>
              <p>
                Precision wafering blades are typically 0.1-0.5 mm thick and contain diamond or CBN 
                particles bonded to a metal or resin core. The thin blade minimizes material loss and 
                reduces the heat-affected zone. The cutting action is more like precision machining than 
                abrasive grinding, resulting in smoother cut surfaces with less damage.
              </p>

              <h3>Advantages of Precision Wafering</h3>
              <ul>
                <li><strong>Minimal damage:</strong> Produces very little deformation and heat-affected zone</li>
                <li><strong>Precision:</strong> Can produce very thin sections with tight tolerances</li>
                <li><strong>Smooth surfaces:</strong> Cut surfaces are often smoother, reducing grinding time</li>
                <li><strong>Delicate materials:</strong> Ideal for brittle materials, composites, and thin samples</li>
                <li><strong>Low material loss:</strong> Thin blades minimize kerf width</li>
              </ul>

              <h3>Limitations</h3>
              <ul>
                <li>Higher cost compared to abrasive blades</li>
                <li>Slower cutting speed for some materials</li>
                <li>Requires more precise equipment and setup</li>
                <li>May not be suitable for very large or hard materials</li>
              </ul>

              <h3>When to Use Precision Wafering</h3>
              <ul>
                <li>Thin sections (less than 1 mm)</li>
                <li>Brittle materials (ceramics, glass, semiconductors)</li>
                <li>Composites and layered materials</li>
                <li>Materials sensitive to heat</li>
                <li>Applications requiring minimal damage</li>
                <li>Research applications where sample integrity is critical</li>
              </ul>

              <YouTubeVideo
                id="precision-sectioning-video"
                videoId="nQ7nM3VhWEU"
                title="Precision Sectioning Demonstration"
                description="Watch Dr. Donald Zipperian demonstrate precision sectioning techniques using PACE Technologies equipment. Learn proper setup, blade selection, and cutting parameters for optimal results."
              />
              
              <p className="mt-4">
                <strong>Next Steps:</strong> If precision wafering is appropriate for your application, proceed to 
                <a href="#diamond-blade-selection" className="text-primary-600 hover:underline font-semibold"> Diamond Blade Selection</a> to choose 
                the right blade, then review <a href="#cutting-parameters" className="text-primary-600 hover:underline font-semibold">Cutting Parameters</a> 
                for precision wafering settings.
              </p>

              <h3>The Precision Cutting Process</h3>
              <p>
                The most critical parameter in diamond sectioning is the abrasive size. Finer abrasives 
                result in less damage, making them ideal for extremely brittle materials. Precision wafering 
                saws are used for delicate samples requiring exact cuts, with factors like abrasive 
                concentration, blade grit, and cutting speed all playing crucial roles in achieving the 
                best results.
              </p>
              <p>
                Unlike abrasive sectioning, precision wafering requires careful attention to multiple 
                parameters simultaneously. The interaction between blade grit, abrasive concentration, 
                cutting speed, and load determines the quality of the cut and the amount of damage 
                introduced to the sample.
              </p>

              <h3>Recommended Precision Cutting Procedures</h3>
              <p>
                Following a systematic procedure ensures consistent, high-quality results with minimal 
                damage. The following steps should be followed for precision wafering:
              </p>
              <ol>
                <li><strong>Condition the wafering blade:</strong> Use the appropriate dressing stick to remove previous cutting swarf and smeared metal. This ensures clean, effective cutting and prevents contamination.</li>
                <li><strong>Clamp the specimen properly:</strong> Secure the specimen to prevent any movement during cutting. Movement can cause blade damage, poor cut quality, and sample fracturing.</li>
                <li><strong>Use a rubber pad for brittle materials:</strong> Place a rubber pad beneath brittle specimens to absorb vibration. This reduces the risk of fracturing during cutting.</li>
                <li><strong>Start with lower load:</strong> Begin the cut with a reduced load to set the blade and establish the cutting path. Gradually increase load as needed once cutting is established.</li>
                <li><strong>Orient for smallest cross-section:</strong> Position the specimen so the cut passes through the smallest cross-section. This minimizes cutting time and reduces the risk of damage.</li>
                <li><strong>Use large blade flanges:</strong> Select the largest appropriate blade flanges to prevent blade distortion. Larger flanges provide better blade support and stability.</li>
                <li><strong>Reduce load at end of cut:</strong> For brittle specimens, reduce the load towards the end of the cut to minimize the risk of fracturing as the blade exits the material.</li>
                <li><strong>Use appropriate cutting fluid:</strong> Select the cutting fluid appropriate for the material. Some materials require specific fluids to prevent reactions or contamination.</li>
              </ol>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://www.metallographic.com/metallographic-equipment/precision-wafering.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/equipment/precision wafering/gravity feed precision cutters/pico-155s/pico-155s-cover.webp"
                    alt="Precision wafering equipment for low-damage sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Precision wafering systems use thin diamond or CBN blades to produce low-damage cuts ideal for delicate materials and thin sections.</p>
              </div>

            </section>

            <section id="diamond-blade-selection" className="scroll-mt-24">
              <h2>Diamond and CBN Blade Selection for Precision Wafering</h2>
              <p>
                Precision wafering requires diamond or cubic boron nitride (CBN) blades, which are 
                fundamentally different from abrasive blades. These blades use diamond or CBN particles 
                bonded to a metal or resin core, providing superior cutting performance for hard and 
                brittle materials.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/precision-cutting-blades"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/diamond-cbn-blades.webp"
                      alt="Diamond and CBN blades for precision wafering"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Diamond and CBN blades for precision wafering. Available in various grit sizes and concentrations for different materials.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/precision-cutting-blades"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/electroplated-diamond-blades.webp"
                      alt="Electroplated diamond blades for precision cutting"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Electroplated diamond blades provide aggressive cutting action for hard materials and composites.</p>
                </div>
              </div>

              <h3>Types of Diamond Blades</h3>
              <ul>
                <li><strong>Resin-bonded diamond blades:</strong> Diamond particles embedded in a resin matrix. Provide smooth cutting with minimal damage. Ideal for brittle materials and when surface quality is critical.</li>
                <li><strong>Metal-bonded diamond blades:</strong> Diamond particles in a metal matrix. More aggressive cutting, longer life. Suitable for hard materials and high-volume applications.</li>
                <li><strong>Electroplated diamond blades:</strong> Diamond particles electroplated onto a metal core. Very aggressive cutting, excellent for hard materials. Single layer of diamonds provides maximum cutting efficiency.</li>
                <li><strong>CBN blades:</strong> Cubic boron nitride particles instead of diamond. Excellent for ferrous materials, as CBN doesn't react with iron like diamond can. Ideal for hardened steels.</li>
              </ul>

              <h3>Wafer Blade Selection Guidelines</h3>
              <p>
                Selecting the appropriate wafer blade depends on the material characteristics, including 
                hardness, brittleness, and toughness. The following table provides specific guidelines 
                for blade selection, cutting speed, and load for different materials:
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Material</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Characteristic</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Speed (rpm)</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Load (grams)</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Blade (grit/conc.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Silicon substrate</td>
                      <td className="border border-gray-300 px-4 py-3">Soft/Brittle</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&lt;300</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&lt;100</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Fine/Low</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Gallium arsenide</td>
                      <td className="border border-gray-300 px-4 py-3">Soft/Brittle</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&lt;200</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&lt;100</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Fine/Low</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Boron composites</td>
                      <td className="border border-gray-300 px-4 py-3">Very brittle</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">250</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Fine/Low</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Ceramic fiber composites</td>
                      <td className="border border-gray-300 px-4 py-3">Very brittle</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">1000</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Fine/Low</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Glasses</td>
                      <td className="border border-gray-300 px-4 py-3">Brittle</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">1000</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Fine/Low</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Minerals</td>
                      <td className="border border-gray-300 px-4 py-3">Friable/Brittle</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;1500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Fine/Low</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Alumina ceramic</td>
                      <td className="border border-gray-300 px-4 py-3">Hard/Tough</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;1500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Medium/Low</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Zirconia (PSZ)</td>
                      <td className="border border-gray-300 px-4 py-3">Hard/Tough</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;3500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;800</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Medium/Low</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Silicon nitride</td>
                      <td className="border border-gray-300 px-4 py-3">Hard/Tough</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;3500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;800</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Medium/Low</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Metal matrix composites</td>
                      <td className="border border-gray-300 px-4 py-3">N/A</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;3500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">&gt;500</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Medium/High</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">General purpose</td>
                      <td className="border border-gray-300 px-4 py-3">N/A</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Variable</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Variable</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Medium/High</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Understanding Diamond Blade Specifications</h3>
              <ul>
                <li><strong>Fine grit:</strong> Smaller diamond particles produce smoother cuts with less damage. Ideal for brittle materials and when minimal damage is critical.</li>
                <li><strong>Medium grit:</strong> Balanced cutting performance for hard and tough materials. Provides good material removal rate while maintaining reasonable cut quality.</li>
                <li><strong>Low concentration:</strong> Fewer diamond particles per unit area. Reduces cutting aggressiveness and heat generation, ideal for delicate materials.</li>
                <li><strong>High concentration:</strong> More diamond particles for faster cutting. Suitable for tougher materials that can withstand more aggressive cutting.</li>
              </ul>

              <h3>Blade Thickness Considerations</h3>
              <p>
                Precision wafering blades are typically 0.1-0.5 mm thick, much thinner than abrasive 
                blades. Thinner blades:
              </p>
              <ul>
                <li>Minimize material loss (kerf width)</li>
                <li>Reduce heat generation</li>
                <li>Produce smoother cut surfaces</li>
                <li>Require more precise equipment and setup</li>
                <li>May be more fragile and require careful handling</li>
              </ul>

              <ProductLink 
                productName="Diamond and CBN Blades"
                href="https://shop.metallographic.com/collections/precision-cutting-blades"
                description="Diamond and CBN blades for precision wafering applications"
              />
              
              <p className="mt-4">
                <strong>Next Steps:</strong> After selecting your diamond blade, configure the 
                <a href="#cutting-parameters" className="text-primary-600 hover:underline font-semibold"> Cutting Parameters</a> (speed, load, cooling) 
                for precision wafering. See <a href="#best-practices" className="text-primary-600 hover:underline font-semibold">Best Practices</a> for 
                complete procedures.
              </p>
            </section>

            <section id="cutting-parameters" className="scroll-mt-24">
              <h2>Cutting Parameters</h2>
              <p>
                Proper cutting parameters are essential for minimizing damage and achieving good results. 
                The key parameters are cutting speed, feed rate (pressure), and cooling. These must be 
                balanced to achieve efficient cutting while preventing excessive heat and deformation.
              </p>
              <p className="mt-2">
                <strong>Note:</strong> These parameters work in conjunction with your blade selection. 
                Refer to <a href="#abrasive-blade-selection" className="text-primary-600 hover:underline font-semibold">Abrasive Blade Selection</a> or 
                <a href="#diamond-blade-selection" className="text-primary-600 hover:underline font-semibold"> Diamond Blade Selection</a> to ensure 
                you've chosen the appropriate blade for your material and application.
              </p>

              <h3>Cutting Speed</h3>
              <p>
                Cutting speed (RPM) affects heat generation, cutting efficiency, and blade life. 
                General guidelines:
              </p>
              <ul>
                <li><strong>Soft materials (aluminum, brass):</strong> 200-400 RPM</li>
                <li><strong>Medium-hard materials (steels):</strong> 100-300 RPM</li>
                <li><strong>Hard materials (hardened steels, titanium):</strong> 50-150 RPM</li>
                <li><strong>Brittle materials (ceramics):</strong> 50-100 RPM</li>
              </ul>
              <p>
                <strong>Rule of thumb:</strong> Use slower speeds for harder materials and when minimal 
                damage is critical. Faster speeds can be used for soft materials but may increase heat generation.
              </p>

              <h3>Feed Rate and Pressure</h3>
              <p>
                Feed rate (how fast the blade advances into the material) and pressure must be balanced. 
                Too much pressure can cause:
              </p>
              <ul>
                <li>Excessive heat generation</li>
                <li>Blade wear and premature failure</li>
                <li>Deformation in soft materials</li>
                <li>Poor cut quality</li>
              </ul>
              <p>
                Too little pressure results in slow cutting and may cause blade glazing. Apply steady, 
                moderate pressure and let the blade do the cutting. Avoid forcing the cut.
              </p>

              <h3>Cooling</h3>
              <p>
                Adequate cooling is critical for preventing heat damage and extending blade life. 
                Cooling serves multiple purposes:
              </p>
              <ul>
                <li>Removes heat from the cutting zone</li>
                <li>Flushes away cutting debris</li>
                <li>Lubricates the cutting action</li>
                <li>Prevents material from adhering to the blade</li>
              </ul>
              <p>
                Use a continuous flow of coolant directed at the cutting zone. Water-based coolants 
                are most common, but specialized coolants may be needed for certain materials. Ensure 
                adequate coolant flow throughout the entire cut.
              </p>

              <h3>Cutting Direction</h3>
              <p>
                For most materials, cutting perpendicular to the surface of interest provides the best 
                results. However, some applications may require angled cuts. Consider the following:
              </p>
              <ul>
                <li>Cut perpendicular to the surface of interest when possible</li>
                <li>For layered materials, cut perpendicular to the layers</li>
                <li>Avoid cutting through welds or joints at sharp angles</li>
                <li>Plan the cut to minimize the distance through the material</li>
              </ul>
            </section>

            <section id="best-practices" className="scroll-mt-24">
              <h2>Best Practices</h2>
              <p>
                Following best practices ensures consistent, high-quality sectioning results while 
                maximizing blade life and minimizing damage. These practices apply to both 
                <a href="#abrasive-sectioning" className="text-primary-600 hover:underline font-semibold"> abrasive sectioning</a> and 
                <a href="#precision-wafering" className="text-primary-600 hover:underline font-semibold"> precision wafering</a>, 
                though specific techniques may vary based on your chosen method and 
                <a href="#cutting-parameters" className="text-primary-600 hover:underline font-semibold"> cutting parameters</a>.
              </p>

              <h3>Pre-Cutting Preparation</h3>
              <ul>
                <li><strong>Sample marking:</strong> Clearly mark the cutting plane before sectioning</li>
                <li><strong>Sample cleaning:</strong> Remove surface contamination that could affect cutting</li>
                <li><strong>Equipment check:</strong> Verify blade is properly mounted and secure</li>
                <li><strong>Coolant check:</strong> Ensure adequate coolant supply and flow</li>
                <li><strong>Safety:</strong> Wear appropriate personal protective equipment</li>
              </ul>

              <h3>During Cutting</h3>
              <ul>
                <li>Apply steady, consistent pressure - let the blade do the work</li>
                <li>Maintain adequate coolant flow throughout the cut</li>
                <li>Monitor for excessive heat, smoke, or unusual sounds</li>
                <li>Do not force the cut - if cutting is difficult, reduce speed or pressure</li>
                <li>For deep cuts, periodically retract the blade slightly to allow cooling</li>
              </ul>

              <h3>Post-Cutting</h3>
              <ul>
                <li>Allow the sample to cool before handling</li>
                <li>Clean the sample to remove cutting fluid and debris</li>
                <li>Inspect the cut surface for damage, cracks, or excessive deformation</li>
                <li>Document cutting parameters for future reference</li>
                <li>Clean and inspect the blade for wear or damage</li>
              </ul>

              <h3>Blade Maintenance</h3>
              <ul>
                <li>Store blades in a dry location to prevent corrosion</li>
                <li>Inspect blades before use for cracks or excessive wear</li>
                <li>Replace blades when cutting becomes inefficient or quality degrades</li>
                <li>Use blade dressing tools if available to restore cutting performance</li>
                <li>Keep a record of blade usage to optimize replacement schedules</li>
              </ul>

              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Pro Tip:</strong> For critical applications, make a test cut on a similar 
                  material first to verify cutting parameters. This helps optimize settings and prevents 
                  damage to valuable samples.
                </p>
              </div>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting Common Issues</h2>
              <p>
                Understanding common sectioning problems and their solutions helps maintain consistent 
                quality and extends blade life. Use the table below to quickly identify issues and find solutions.
              </p>
              <p className="mt-2">
                <strong>Related Sections:</strong> Many troubleshooting issues relate to blade selection or cutting parameters. 
                If you're experiencing problems, review <a href="#abrasive-blade-selection" className="text-primary-600 hover:underline font-semibold">Abrasive Blade Selection</a>, 
                <a href="#diamond-blade-selection" className="text-primary-600 hover:underline font-semibold"> Diamond Blade Selection</a>, and 
                <a href="#cutting-parameters" className="text-primary-600 hover:underline font-semibold"> Cutting Parameters</a> to ensure proper setup.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Problem</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Symptoms</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Common Causes</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Solutions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold align-top">Excessive Heat Generation</td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Smoke during cutting</li>
                          <li>Material discoloration</li>
                          <li>Material burning</li>
                          <li>Excessive blade wear</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Cutting speed too high</li>
                          <li>Pressure too high</li>
                          <li>Insufficient cooling</li>
                          <li>Wrong blade type</li>
                          <li>Dull blade</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Reduce RPM</li>
                          <li>Reduce feed rate and pressure</li>
                          <li>Increase coolant flow, check delivery</li>
                          <li>Select blade appropriate for material</li>
                          <li>Replace with new blade</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold align-top">Poor Cut Quality</td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Rough surface</li>
                          <li>Excessive damage</li>
                          <li>Uneven cuts</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Blade vibration</li>
                          <li>Wrong blade type</li>
                          <li>Excessive pressure</li>
                          <li>Dull or worn blade</li>
                          <li>Sample movement</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Check blade mounting, ensure proper tension</li>
                          <li>Select appropriate blade for material</li>
                          <li>Reduce feed rate</li>
                          <li>Replace blade</li>
                          <li>Ensure sample is properly secured</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold align-top">Excessive Deformation</td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Distorted microstructure</li>
                          <li>Smearing</li>
                          <li>Work-hardening</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Pressure too high</li>
                          <li>Cutting speed too high</li>
                          <li>Wrong blade type</li>
                          <li>Insufficient cooling</li>
                          <li>Material too soft</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Reduce feed rate and pressure</li>
                          <li>Reduce RPM</li>
                          <li>Use thinner blade or precision wafering</li>
                          <li>Increase coolant flow</li>
                          <li>Consider precision wafering for delicate materials</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold align-top">Blade Wear Issues</td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Slow cutting</li>
                          <li>Blade glazing</li>
                          <li>Excessive wear</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Wrong blade type</li>
                          <li>Cutting speed too high</li>
                          <li>Pressure too high</li>
                          <li>Insufficient cooling</li>
                          <li>Material too hard</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Select blade with appropriate bond hardness</li>
                          <li>Reduce RPM</li>
                          <li>Reduce feed rate</li>
                          <li>Increase coolant flow</li>
                          <li>Use harder bond blade or different abrasive type</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold align-top">Cutting Too Slow</td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Very slow material removal</li>
                          <li>Inefficient cutting</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Pressure too low</li>
                          <li>Dull blade</li>
                          <li>Wrong blade type</li>
                          <li>Cutting speed too low</li>
                          <li>Blade glazing</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 align-top">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Increase feed rate moderately</li>
                          <li>Replace blade</li>
                          <li>Select more aggressive blade</li>
                          <li>Increase RPM within recommended range</li>
                          <li>Dress blade or replace</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Quick Reference:</strong> Most sectioning problems can be resolved by adjusting 
                  cutting speed, pressure, or blade selection. Always ensure adequate cooling and proper 
                  blade mounting before making other adjustments.
                </p>
              </div>
            </section>

            {/* Equipment Recommendations */}
            <section className="mt-12 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
              <h2 className="text-2xl font-semibold mb-4">Recommended Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/abrasive-sectioning.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/abrasive sectioning/manual abrasive cutters/mega-t250s/mega-t250-cover.webp"
                        alt="Abrasive cut-off machines for metallographic sectioning"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Abrasive Cut-Off Machines</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Precision abrasive cut-off machines with variable speed control, automatic feed, 
                    and integrated cooling systems for consistent sectioning results.
                  </p>
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/abrasive-sectioning.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Abrasive Cut-Off Machines →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/precision-wafering.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/precision wafering/gravity feed precision cutters/pico-155s/pico-155s-cover.webp"
                        alt="Precision wafering systems for low-damage sectioning"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Precision Wafering Systems</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    High-precision wafering systems using thin diamond or CBN blades for minimal-damage 
                    sectioning of delicate materials and thin sections.
                  </p>
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/precision-wafering.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Precision Wafering Systems →
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
                  href="https://shop.metallographic.com/collections/abrasive-blades"
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
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/stainless-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Stainless Steel Preparation
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  → Troubleshooting Common Issues
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

