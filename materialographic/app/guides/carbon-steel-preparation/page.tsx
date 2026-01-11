import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('carbon-steel-preparation')!

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

export default function CarbonSteelGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Carbon and Low Alloy Steels Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Carbon and Low Alloy Steels Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing carbon steel and low alloy steel samples for metallographic analysis, 
              covering sectioning, mounting, grinding, polishing, and etching techniques for steels like <MaterialTooltip materialName="AISI 1018 Carbon Steel">1018</MaterialTooltip>, <MaterialTooltip materialName="AISI 1045 Carbon Steel">1045</MaterialTooltip>, <MaterialTooltip materialName="AISI 4140 Chromium-Molybdenum Steel">4140</MaterialTooltip>, <MaterialTooltip materialName="AISI 4340 Nickel-Chromium-Molybdenum Steel">4340</MaterialTooltip>, <MaterialTooltip materialName="5160 Spring Steel">5160</MaterialTooltip>, and <MaterialTooltip materialName="52100 Bearing Steel">52100</MaterialTooltip>.
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
                Carbon steel and low alloy steel are among the most commonly analyzed materials in metallography. 
                Low alloy steels (such as <MaterialTooltip materialName="AISI 4140 Chromium-Molybdenum Steel">4140</MaterialTooltip>, <MaterialTooltip materialName="AISI 4340 Nickel-Chromium-Molybdenum Steel">4340</MaterialTooltip>, 
                <MaterialTooltip materialName="5160 Spring Steel">5160</MaterialTooltip>, and <MaterialTooltip materialName="52100 Bearing Steel">52100</MaterialTooltip>) are essentially carbon steels with 
                alloying additions that enhance properties like hardenability, strength, and toughness. The preparation 
                techniques are identical to carbon steels - same grinding sequences, same etchants, same challenges. 
                Proper preparation is essential to reveal the true microstructure without introducing artifacts such 
                as deformation, scratches, or contamination. This guide will walk you through the complete preparation 
                process for both carbon steels and low alloy steels.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt="Carbon steel microstructure showing ferrite and pearlite at magnification, properly prepared and etched"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Carbon steel microstructure showing ferrite and pearlite, properly prepared and etched. This image demonstrates the proper microstructure revealed through correct preparation techniques.</p>
              </div>
              <p>
                Carbon steels and low alloy steels can vary significantly in hardness depending on carbon content, 
                alloying elements, and heat treatment. For example, <MaterialTooltip materialName="AISI 1018 Carbon Steel">1018</MaterialTooltip> is a low-carbon steel 
                (typically 126 HB) that requires lighter pressure during preparation, while 
                <MaterialTooltip materialName="AISI 1045 Carbon Steel">1045</MaterialTooltip> is a medium-carbon steel (around 170 HB) that can 
                tolerate more aggressive preparation. Low alloy steels like <MaterialTooltip materialName="AISI 4140 Chromium-Molybdenum Steel">4140</MaterialTooltip> and 
                <MaterialTooltip materialName="AISI 4340 Nickel-Chromium-Molybdenum Steel">4340</MaterialTooltip> typically have similar hardness ranges (197-217 HB) and use the same preparation 
                techniques as carbon steels. The key is to use appropriate abrasives and maintain consistent pressure 
                throughout the process based on the specific steel grade and its hardness, regardless of whether it's 
                a carbon steel or low alloy steel.
              </p>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                When sectioning carbon steel and low alloy steel samples, use a slow cutting speed to minimize heat 
                generation and deformation. A cutting speed of 100-200 RPM is typically appropriate 
                for most carbon steel grades like <MaterialTooltip materialName="AISI 1018 Carbon Steel">1018</MaterialTooltip> and 
                <MaterialTooltip materialName="AISI 1045 Carbon Steel">1045</MaterialTooltip>, as well as low alloy steels like 
                <MaterialTooltip materialName="AISI 4140 Chromium-Molybdenum Steel">4140</MaterialTooltip> and <MaterialTooltip materialName="AISI 4340 Nickel-Chromium-Molybdenum Steel">4340</MaterialTooltip>. 
                For hardened or high-carbon steels such as <MaterialTooltip materialName="AISI 1095 High Carbon Steel">1095</MaterialTooltip>, or hardened alloy steels 
                like <MaterialTooltip materialName="5160 Spring Steel">5160</MaterialTooltip> and <MaterialTooltip materialName="52100 Bearing Steel">52100</MaterialTooltip>, use slower speeds to prevent phase transformation.
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
                    alt="MAX-D abrasive cut-off blades for carbon steel sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">MAX-D abrasive cut-off blades designed for general steels and ferrous metals like carbon steel and low alloy steel. For hard or case-hardened steels, MAX-VHS series blades may be more appropriate. Thin blades (0.5-1.0 mm) minimize heat generation and deformation.</p>
              </div>
              <ul>
                <li>Use MAX-D series blades for general carbon steel and low alloy steel grades, or MAX-VHS series for hard/case-hardened steels</li>
                <li>Use a thin abrasive cut-off wheel (0.5-1.0 mm thickness)</li>
                <li>Apply steady, moderate pressure</li>
                <li>Use adequate coolant to prevent overheating and phase transformation</li>
                <li>Allow the wheel to do the cutting - avoid forcing</li>
              </ul>
              <ProductLink 
                productName="MAX-D and MAX-VHS Abrasive Blades"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="MAX-D blades for general carbon steel and low alloy steel, MAX-VHS blades for hard/case-hardened steels"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For carbon steel, compression 
                mounting with phenolic or epoxy resins works well. Phenolic is often preferred for 
                better edge retention, especially for hardened steels.
              </p>
              <h3>Compression Mounting</h3>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>Place sample in mounting press with appropriate resin</li>
                <li>Apply pressure: 3000-4000 psi for phenolic, 2000-3000 psi for epoxy</li>
                <li>Heat to 150-180°C and hold for 5-8 minutes</li>
                <li>Cool under pressure to room temperature</li>
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
                coarse grits and progressively move to finer grits. For carbon steel, we recommend 
                the following sequence:
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
                For softer, low-carbon steels, use lighter pressure to avoid deformation.
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
                Polishing removes grinding scratches and prepares a mirror-like surface. For carbon steel, 
                diamond polishing followed by oxide polishing typically yields excellent results. The 
                procedure is similar to stainless steel, with adjustments based on hardness.
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
                      alt="Polycrystalline diamond polishing compound for carbon steel"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides aggressive cutting action ideal for carbon steels.</p>
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
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages. Select pad hardness based on steel hardness and polishing stage.</p>
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
                can introduce relief, especially around inclusions or second phases. For softer, 
                low-carbon steels, use lighter pressure and shorter times to avoid deformation.
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
                The choice of etchant depends on the carbon content, heat treatment, and what features 
                you want to reveal. Nital (nitric acid in ethanol) is the most common etchant for 
                carbon steel.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/1018 Steel furnace cooled, 2% nital (DIC).JPG"
                  alt="1018 Carbon steel microstructure after proper etching with 2% Nital, showing grain boundaries and structure at magnification with DIC"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center"><MaterialTooltip materialName="AISI 1018 Carbon Steel">1018</MaterialTooltip> Carbon steel etched with 2% Nital, magnification (DIC). Proper etching reveals grain boundaries and phase structure without over-etching artifacts.</p>
              </div>
              <h3>Common Etchants for Carbon Steel and Low Alloy Steel</h3>
              <ul>
                <li><strong>2% Nital:</strong> General purpose for softer, low-carbon steels like <MaterialTooltip materialName="AISI 1018 Carbon Steel">1018</MaterialTooltip>. Reveals ferrite grain boundaries and pearlite structure (2% HNO₃ in ethanol)</li>
                <li><strong>3% Nital:</strong> Standard concentration for most carbon steels including <MaterialTooltip materialName="AISI 1045 Carbon Steel">1045</MaterialTooltip>, and low alloy steels like <MaterialTooltip materialName="AISI 4140 Chromium-Molybdenum Steel">4140</MaterialTooltip> and <MaterialTooltip materialName="AISI 4340 Nickel-Chromium-Molybdenum Steel">4340</MaterialTooltip>. Most commonly used (3% HNO₃ in ethanol)</li>
                <li><strong>5% Nital:</strong> For harder carbon steels such as <MaterialTooltip materialName="AISI 1095 High Carbon Steel">1095</MaterialTooltip>, or hardened alloy steels. More aggressive etching (5% HNO₃ in ethanol)</li>
                <li><strong>Picral:</strong> Excellent for revealing pearlite and cementite without attacking ferrite boundaries. Also works well for alloy steels like <MaterialTooltip materialName="52100 Bearing Steel">52100</MaterialTooltip> (2-4g picric acid per 100ml ethanol)</li>
                <li><strong>Vilella's Reagent:</strong> For ferrite-carbide structures. Also useful for revealing prior austenite grain boundaries in alloy steels</li>
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
                    alt="Etching solutions and reagents for carbon steel"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for carbon steel and low alloy steel. Common etchants include Nital (2%, 3%, 5%), Picral, and Vilella's Reagent. The same etchants work for both carbon steels and low alloy steels. Etching time typically ranges from 5-30 seconds depending on the etchant and steel grade.</p>
              </div>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry</li>
                <li>Apply etchant with cotton swab or immerse sample</li>
                <li>Etch for 5-30 seconds (time varies by etchant and steel grade/hardness)</li>
                <li>Immediately rinse with water, then alcohol</li>
                <li>Dry with compressed air</li>
              </ol>
              <p>
                <strong>Tip:</strong> Start with shorter etching times (5-10 seconds) and increase if needed. 
                Over-etching can obscure fine details. For softer steels like <MaterialTooltip materialName="AISI 1018 Carbon Steel">1018</MaterialTooltip>, 
                use lower Nital concentrations (2-3%). For hardened steels such as <MaterialTooltip materialName="AISI 1095 High Carbon Steel">1095</MaterialTooltip> 
                or hardened alloy steels like <MaterialTooltip materialName="5160 Spring Steel">5160</MaterialTooltip> and <MaterialTooltip materialName="52100 Bearing Steel">52100</MaterialTooltip>, 
                higher concentrations (5%) may be needed. Picral is particularly useful for revealing pearlite 
                structures in medium-carbon steels like <MaterialTooltip materialName="AISI 1045 Carbon Steel">1045</MaterialTooltip> and for alloy steels with carbides.
              </p>
              <ProductLink 
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Pre-mixed and custom etching solutions for carbon steel and low alloy steel, including Nital and Picral"
              />
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time or skipped grits. Ensure complete scratch removal at each step.</li>
                <li><strong>Relief around inclusions:</strong> Over-polishing or too soft a cloth. Reduce polishing time or use slightly harder cloth.</li>
                <li><strong>Contamination:</strong> Clean between steps, use fresh abrasives, and ensure proper sample cleaning.</li>
                <li><strong>Poor edge retention:</strong> Consider using phenolic mounting material or different mounting technique.</li>
                <li><strong>Over-etching:</strong> Reduce etching time or use lower Nital concentration. Start with shorter times.</li>
                <li><strong>Under-etching:</strong> Increase etching time or use higher Nital concentration. Ensure sample is clean before etching.</li>
                <li><strong>Phase transformation during cutting:</strong> Use slower cutting speed and adequate coolant to prevent overheating.</li>
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

