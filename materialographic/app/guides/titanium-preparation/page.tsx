import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('titanium-preparation')!

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

export default function TitaniumGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Titanium Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Titanium Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing titanium samples for metallographic analysis, 
              covering sectioning, mounting, grinding, polishing, and etching techniques.
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
                Titanium and its alloys are important materials in aerospace, medical, and industrial 
                applications. Proper preparation is essential to reveal the true microstructure without 
                introducing artifacts such as deformation, scratches, or contamination. Titanium is 
                particularly challenging due to its reactivity and tendency to form surface oxides. 
                This guide will walk you through the complete preparation process.
              </p>
              <p>
                Common titanium alloys include <MaterialTooltip materialName="Ti-6Al-4V">Ti-6Al-4V (Grade 5)</MaterialTooltip>, 
                the most widely used titanium alloy, as well as <MaterialTooltip materialName="Commercially Pure Titanium (Grade 2)">commercially pure titanium (Grade 2)</MaterialTooltip> 
                and various alpha-beta alloys like <MaterialTooltip materialName="Ti-3Al-2.5V">Ti-3Al-2.5V (Grade 9)</MaterialTooltip>. 
                Titanium can be challenging due to its reactivity with oxygen and tendency to form 
                surface contamination. The key is to use appropriate abrasives, maintain consistent 
                pressure, and avoid contamination throughout the process. Titanium alloys vary in 
                hardness, with some being relatively soft while others can be quite hard.
              </p>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                When sectioning titanium samples, use a slow cutting speed to minimize heat generation 
                and deformation. A cutting speed of 100-200 RPM is typically appropriate for most 
                titanium alloys, though harder alloys like <MaterialTooltip materialName="Ti-6Al-4V">Ti-6Al-4V</MaterialTooltip> 
                may require slightly slower speeds. Titanium's reactivity requires careful handling to prevent contamination.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-d.webp"
                    alt="Abrasive cut-off blades for titanium sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">MAX-D or MAX-VHS abrasive cut-off blades suitable for titanium. For harder titanium alloys, MAX-VHS series blades may be more appropriate. Thin blades (0.5-1.0 mm) minimize heat generation and deformation.</p>
              </div>
              <ul>
                <li>Use MAX-D series blades for general titanium alloys, or MAX-VHS series for harder titanium alloys</li>
                <li>Use a thin abrasive cut-off wheel (0.5-1.0 mm thickness)</li>
                <li>Apply steady, moderate pressure</li>
                <li>Use adequate coolant to prevent overheating and contamination</li>
                <li>Allow the wheel to do the cutting - avoid forcing</li>
                <li>Clean sample immediately after sectioning to remove cutting fluid and prevent contamination</li>
              </ul>
              <ProductLink 
                productName="MAX-D and MAX-VHS Abrasive Blades"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="MAX-D blades for general titanium alloys, MAX-VHS blades for harder titanium alloys"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For titanium, compression 
                mounting with phenolic or epoxy resins works well. Cold mounting with epoxy is also 
                suitable and avoids potential heat-related issues. Ensure the sample is thoroughly 
                cleaned before mounting to prevent contamination.
              </p>
              <h3>Compression Mounting</h3>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>Place sample in mounting press with appropriate resin</li>
                <li>Apply pressure: 3000-4000 psi for phenolic, 2000-3000 psi for epoxy</li>
                <li>Heat to 150-180°C and hold for 5-8 minutes</li>
                <li>Cool under pressure to room temperature</li>
              </ol>
              <h3>Cold Mounting</h3>
              <ol>
                <li>Clean and dry the sample thoroughly</li>
                <li>Place in mounting cup with epoxy resin</li>
                <li>Allow to cure at room temperature (typically 4-8 hours)</li>
                <li>Cold mounting avoids heat that could affect titanium microstructure</li>
              </ol>
              <ProductLink 
                productName="Compression Mounting Equipment"
                href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                description="Automatic and manual mounting presses for consistent results"
              />
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding</h2>
              <p>
                Grinding removes sectioning damage and prepares the surface for polishing. Start with 
                coarse grits and progressively move to finer grits. For titanium, we recommend the 
                following sequence. Titanium can work-harden, so maintain consistent pressure and 
                avoid excessive grinding time.
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
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (120, 240, 400, 600) for progressive grinding. Rotate sample 90° between each grit to ensure complete scratch removal.</p>
              </div>
              <h3>Grinding Sequence</h3>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage (30-60 seconds per step)</li>
                <li><strong>240 grit:</strong> Remove previous scratches (30-60 seconds)</li>
                <li><strong>400 grit:</strong> Further refinement (30-60 seconds)</li>
                <li><strong>600 grit:</strong> Final grinding step (30-60 seconds)</li>
              </ol>
              <p>
                <strong>Important:</strong> Rotate the sample 90° between each grit to ensure complete 
                removal of previous scratches. Use water as a lubricant and maintain consistent pressure. 
                Clean the sample thoroughly between steps to prevent contamination. Titanium can work-harden, 
                so avoid excessive grinding time.
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
                Polishing removes grinding scratches and prepares a mirror-like surface. For titanium, 
                diamond polishing followed by oxide polishing typically yields excellent results. Use 
                appropriate cloths and maintain consistent pressure to avoid contamination and relief.
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
                      alt="Polycrystalline diamond polishing compound for titanium"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides consistent cutting action for titanium alloys.</p>
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
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages. Select pad hardness based on titanium alloy and polishing stage.</p>
                </div>
              </div>
              <h3>Diamond Polishing</h3>
              <ol>
                <li><strong>9 μm diamond:</strong> 3-5 minutes on a hard cloth (e.g., Texmet)</li>
                <li><strong>3 μm diamond:</strong> 3-5 minutes on a medium-hard cloth</li>
                <li><strong>1 μm diamond:</strong> 2-3 minutes on a soft cloth</li>
              </ol>
              <h3>Final Polishing</h3>
              <ol>
                <li><strong>0.05 μm colloidal silica:</strong> 1-2 minutes on a soft cloth</li>
                <li>Rinse thoroughly with water and dry with compressed air</li>
              </ol>
              <p>
                Use appropriate polishing lubricants and maintain consistent pressure. Over-polishing 
                can introduce relief, especially around inclusions or second phases. Clean the sample 
                thoroughly between steps to prevent contamination. Titanium is reactive, so avoid 
                prolonged exposure to polishing solutions.
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
                Etching reveals the microstructure by selectively attacking grain boundaries and phases. 
                The choice of etchant depends on the titanium alloy and what features you want to reveal. 
                Common etchants include Kroll's reagent, hydrofluoric acid solutions, and various 
                electrolytic solutions. Titanium requires careful etching due to its reactivity.
              </p>
              <h3>Common Etchants for Titanium</h3>
              <ul>
                <li><strong>Kroll's Reagent:</strong> General purpose, most commonly used for titanium. Reveals grain boundaries and alpha/beta structure (2-3ml HF, 5-6ml HNO₃, 100ml H₂O). Works well for <MaterialTooltip materialName="Ti-6Al-4V">Ti-6Al-4V</MaterialTooltip> and most alpha-beta alloys.</li>
                <li><strong>Modified Kroll's:</strong> For alpha-beta titanium alloys. More aggressive (1-2ml HF, 2-3ml HNO₃, 100ml H₂O). Useful for harder alloys that require more aggressive etching.</li>
                <li><strong>Weck's Reagent:</strong> For revealing grain boundaries in alpha titanium (100ml H₂O, 4g NaOH, 4g KMnO₄). Particularly effective for <MaterialTooltip materialName="Commercially Pure Titanium (Grade 2)">commercially pure titanium (Grade 2)</MaterialTooltip> and other alpha-phase materials.</li>
                <li><strong>Electrolytic Etching:</strong> For sensitive microstructures. Use appropriate voltage and time settings. Can be useful for <MaterialTooltip materialName="Ti-3Al-2.5V">Ti-3Al-2.5V</MaterialTooltip> and other alloys where chemical etching may be too aggressive.</li>
                <li><strong>Hydrofluoric Acid (HF):</strong> Dilute solutions (0.5-2%) for general etching</li>
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
                    alt="Etching solutions and reagents for titanium"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for titanium. Common etchants include Kroll's Reagent, Modified Kroll's, Weck's Reagent, and electrolytic solutions. Etching time typically ranges from 5-30 seconds depending on the etchant and alloy. <strong>Warning:</strong> Hydrofluoric acid is extremely hazardous and requires proper safety equipment.</p>
              </div>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry</li>
                <li>Apply etchant with cotton swab or immerse sample</li>
                <li>Etch for 5-30 seconds (time varies by etchant and alloy)</li>
                <li>Immediately rinse with water, then alcohol</li>
                <li>Dry with compressed air</li>
              </ol>
              <p>
                <strong>Important Safety Note:</strong> Many titanium etchants contain hydrofluoric acid (HF), 
                which is extremely hazardous. Always use appropriate personal protective equipment (PPE) 
                including gloves, safety glasses, and proper ventilation. Have calcium gluconate gel 
                available as first aid for HF exposure.
              </p>
              <p>
                <strong>Tip:</strong> Start with shorter etching times (5-10 seconds) and increase if needed. 
                Over-etching can obscure fine details and create pitting. For electrolytic etching, 
                use appropriate voltage and time settings. Kroll's reagent is the most commonly used 
                etchant for titanium and typically provides good results for most alloys.
              </p>
              <ProductLink 
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Pre-mixed and custom etching solutions for titanium, including Kroll's Reagent"
              />
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time or skipped grits. Ensure complete scratch removal at each step.</li>
                <li><strong>Contamination:</strong> Titanium is highly reactive. Clean between steps thoroughly, use fresh abrasives, and avoid cross-contamination from other materials.</li>
                <li><strong>Surface oxidation:</strong> Titanium forms oxides easily. Minimize exposure to air, clean immediately after polishing, and etch promptly after final polish.</li>
                <li><strong>Relief around second phases:</strong> Over-polishing or too soft a cloth. Reduce polishing time or use slightly harder cloth.</li>
                <li><strong>Work-hardening:</strong> Excessive grinding or polishing can work-harden titanium. Use appropriate pressure and avoid excessive time.</li>
                <li><strong>Over-etching:</strong> Reduce etching time or dilute etchant. Start with shorter times (5-10 seconds).</li>
                <li><strong>Pitting after etching:</strong> Etchant too strong or etching time too long. Dilute etchant or reduce time. HF-based etchants are particularly aggressive.</li>
                <li><strong>Poor edge retention:</strong> Consider using phenolic mounting material or different mounting technique.</li>
                <li><strong>Inconsistent etching:</strong> Ensure sample is clean and dry before etching. Surface contamination can cause uneven etching.</li>
              </ul>
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
          </div>
        </div>
      </div>
      </article>
    </>
  )
}

