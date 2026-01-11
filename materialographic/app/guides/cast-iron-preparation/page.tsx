import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('cast-iron-preparation')!

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

export default function CastIronGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Cast Iron Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Cast Iron Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing cast iron samples for metallographic analysis, 
              with special emphasis on preserving graphite structure and revealing matrix microstructure.
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
                Cast iron preparation presents unique challenges that distinguish it from steel preparation. 
                The defining characteristic of cast iron is its graphite structure, which must be preserved 
                throughout the entire preparation process. Unlike steel, where the microstructure is revealed 
                primarily through etching, cast iron's graphite is revealed by proper polishing - etching reveals 
                the matrix structure (ferrite, pearlite, or bainite).
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Critical Principle:</strong> Graphite preservation is the most important aspect of 
                  cast iron preparation. Graphite is soft and can be easily removed or damaged during grinding 
                  and polishing. Gentle techniques and careful monitoring are essential.
                </p>
              </div>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Nodular cast iron, 200X.JPG"
                  alt="Nodular cast iron microstructure showing spheroidal graphite and matrix structure, properly prepared"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Nodular cast iron, 200X magnification. This image shows the characteristic spheroidal graphite structure and matrix. Proper preparation preserves graphite while revealing matrix microstructure through etching.</p>
              </div>
              <p>
                Cast iron types vary significantly in their graphite morphology and matrix structure:
              </p>
              <ul>
                <li><strong><MaterialTooltip materialName="Gray Cast Iron">Gray Cast Iron</MaterialTooltip>:</strong> Flake graphite in pearlite or ferrite matrix (163-187 HB)</li>
                <li><strong><MaterialTooltip materialName="Ductile Cast Iron">Ductile Cast Iron</MaterialTooltip>:</strong> Spheroidal (nodular) graphite in pearlite or ferrite matrix (217 HB)</li>
                <li><strong><MaterialTooltip materialName="Malleable Cast Iron">Malleable Cast Iron</MaterialTooltip>:</strong> Temper carbon nodules in ferrite or pearlite matrix (163 HB)</li>
                <li><strong><MaterialTooltip materialName="Austempered Ductile Iron">Austempered Ductile Iron (ADI)</MaterialTooltip>:</strong> Spheroidal graphite in bainitic matrix (310 HB, very hard)</li>
                <li><strong><MaterialTooltip materialName="Compacted Graphite Iron">Compacted Graphite Iron (CGI)</MaterialTooltip>:</strong> Vermicular (compacted) graphite in pearlite matrix (230 HB)</li>
              </ul>
              <p>
                Each type requires similar preparation techniques, but the graphite morphology affects how 
                easily it can be preserved. Spheroidal graphite (ductile iron) is generally easier to preserve 
                than flake graphite (gray iron), which can be more prone to pullout.
              </p>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                When sectioning cast iron samples, use standard cutting techniques similar to carbon steel. 
                Cast iron is generally softer than hardened steel, so standard abrasive cutoff wheels work well. 
                The key is to minimize damage that could affect graphite preservation later in the process.
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
                    alt="MAX-D abrasive cut-off blades for cast iron sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">MAX-D abrasive cut-off blades designed for general ferrous metals including cast iron. For very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip>, MAX-VHS series blades may be more appropriate.</p>
              </div>
              <ul>
                <li>Use MAX-D series blades for general cast iron grades, or MAX-VHS series for very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip></li>
                <li>Use a standard abrasive cut-off wheel (0.5-1.0 mm thickness)</li>
                <li>Apply steady, moderate pressure</li>
                <li>Use adequate coolant to prevent overheating</li>
                <li>Allow the wheel to do the cutting - avoid forcing</li>
              </ul>
              <p>
                <strong>Note:</strong> For very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">Austempered Ductile Iron</MaterialTooltip> (310 HB), 
                use slower cutting speeds similar to hardened steel to prevent excessive heat buildup.
              </p>
              <ProductLink 
                productName="MAX-D and MAX-VHS Abrasive Blades"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="MAX-D blades for general cast iron, MAX-VHS blades for very hard cast irons like Austempered Ductile Iron (ADI)"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For cast iron, both compression and cold 
                mounting work well. The choice depends on whether edge retention is critical and the hardness 
                of the specific cast iron grade.
              </p>
              <h3>Compression Mounting</h3>
              <p>
                Compression mounting with phenolic or epoxy resins is suitable for most cast irons. Phenolic 
                provides better edge retention, which can be important for preserving graphite near edges.
              </p>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>Place sample in mounting press with appropriate resin</li>
                <li>Apply pressure: 3000-4000 psi for phenolic, 2000-3000 psi for epoxy</li>
                <li>Heat to 150-180°C and hold for 5-8 minutes</li>
                <li>Cool under pressure to room temperature</li>
              </ol>
              <h3>Cold Mounting</h3>
              <p>
                Cold mounting with epoxy resin is also suitable and avoids any thermal effects. This is 
                particularly useful if you're concerned about any potential effects of heat on the graphite structure.
              </p>
              <ol>
                <li>Clean the sample thoroughly</li>
                <li>Place sample in mounting mold</li>
                <li>Mix epoxy resin according to manufacturer's instructions</li>
                <li>Pour into mold and allow to cure (typically 4-8 hours at room temperature)</li>
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
                Grinding removes sectioning damage and prepares the surface for polishing. For cast iron, 
                use gentle grinding techniques to avoid damaging or removing graphite. The graphite is soft 
                and can be easily pulled out or smeared during grinding.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Use lighter pressure than you would for steel. Graphite is soft 
                  and can be removed during grinding. Monitor the surface carefully and avoid over-grinding.
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
                    alt="Silicon carbide grinding papers in various grit sizes for progressive grinding of cast iron"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (120, 240, 400, 600) for progressive grinding. Use lighter pressure than for steel to preserve graphite.</p>
              </div>
              <h3>Grinding Sequence</h3>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage (30-60 seconds per step, lighter pressure)</li>
                <li><strong>240 grit:</strong> Remove previous scratches (30-60 seconds, lighter pressure)</li>
                <li><strong>400 grit:</strong> Further refinement (30-60 seconds, lighter pressure)</li>
                <li><strong>600 grit:</strong> Final grinding step (30-60 seconds, lighter pressure)</li>
              </ol>
              <p>
                <strong>Critical Guidelines:</strong>
              </p>
              <ul>
                <li>Use <strong>lighter pressure</strong> than for steel - graphite is soft and can be removed</li>
                <li>Rotate the sample 90° between each grit to ensure complete removal of previous scratches</li>
                <li>Use water as a lubricant and maintain consistent, light pressure</li>
                <li>Monitor the surface - if graphite starts to pull out, reduce pressure further</li>
                <li>For very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip>, you can use slightly more pressure, but still be gentle</li>
              </ul>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Premium SiC papers in all grit sizes for consistent grinding"
              />
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing</h2>
              <p>
                Polishing is critical for cast iron because <strong>graphite is revealed by polishing, not etching</strong>. 
                The goal is to achieve a mirror-like surface that reveals the graphite structure clearly while 
                preparing the matrix for etching. Use gentle polishing techniques to avoid removing graphite.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Key Principle:</strong> Graphite is revealed by proper polishing. Etching reveals the 
                  matrix structure (ferrite, pearlite, bainite), but the graphite itself is visible in the 
                  polished state. Avoid over-polishing that could remove graphite.
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
                      alt="Polycrystalline diamond polishing compound for cast iron"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound for polishing cast iron. Use gentle pressure to preserve graphite.</p>
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
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths. Use softer cloths and lighter pressure for cast iron to preserve graphite.</p>
                </div>
              </div>
              <h3>Diamond Polishing</h3>
              <ol>
                <li><strong>6 μm diamond:</strong> 2-4 minutes on a medium-hard cloth (e.g., Texmet), <strong>lighter pressure</strong></li>
                <li><strong>3 μm diamond:</strong> 2-4 minutes on a medium-hard cloth, <strong>lighter pressure</strong></li>
                <li><strong>1 μm diamond:</strong> 2-3 minutes on a soft cloth, <strong>lighter pressure</strong></li>
              </ol>
              <h3>Final Polishing</h3>
              <ol>
                <li><strong>0.05 μm colloidal silica:</strong> 1-2 minutes on a soft cloth, <strong>very light pressure</strong></li>
                <li>Rinse thoroughly with water and dry with compressed air</li>
              </ol>
              <p>
                <strong>Critical Guidelines:</strong>
              </p>
              <ul>
                <li>Use <strong>lighter pressure</strong> throughout polishing - graphite is soft and can be removed</li>
                <li>Use <strong>softer cloths</strong> than you would for steel to reduce the risk of graphite pullout</li>
                <li>Monitor the surface - graphite should be clearly visible after polishing</li>
                <li>Avoid over-polishing - extended times can remove graphite</li>
                <li>For very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip>, you can use slightly more pressure, but still be gentle</li>
              </ul>
              <p>
                After polishing, examine the sample under the microscope. The graphite should be clearly visible 
                as dark areas (flakes, nodules, or compacted shapes depending on the cast iron type). If graphite 
                is missing or appears damaged, you may need to reduce pressure or use softer cloths.
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
                Etching reveals the <strong>matrix structure</strong> (ferrite, pearlite, bainite) but does not 
                reveal graphite - graphite is visible in the polished state. The same etchants used for carbon 
                steel work well for cast iron matrices. Nital (nitric acid in ethanol) is the most common etchant.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt="Cast iron microstructure after proper etching, showing matrix structure and graphite"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Cast iron microstructure after proper etching. The matrix structure (ferrite/pearlite) is revealed by etching, while graphite is visible from polishing.</p>
              </div>
              <h3>Common Etchants for Cast Iron</h3>
              <ul>
                <li><strong>2% Nital:</strong> General purpose for most cast irons. Reveals ferrite grain boundaries and pearlite structure (2% HNO₃ in ethanol)</li>
                <li><strong>4% Picral:</strong> Excellent for revealing pearlite and cementite without attacking ferrite boundaries. Particularly useful for pearlitic cast irons (2-4g picric acid per 100ml ethanol)</li>
                <li><strong>Higher Nital concentrations:</strong> For harder cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip>, 3-5% Nital may be needed</li>
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
                    alt="Etching solutions and reagents for cast iron"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for cast iron. Common etchants include 2% Nital and 4% Picral. Etching reveals the matrix structure, not the graphite.</p>
              </div>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry after polishing</li>
                <li>Examine polished surface first - graphite should be visible</li>
                <li>Apply etchant with cotton swab or immerse sample</li>
                <li>Etch for 10-30 seconds (time varies by cast iron type and hardness)</li>
                <li>Immediately rinse with water, then alcohol</li>
                <li>Dry with compressed air</li>
              </ol>
              <p>
                <strong>Important Notes:</strong>
              </p>
              <ul>
                <li>Graphite is <strong>not revealed by etching</strong> - it should already be visible after polishing</li>
                <li>Etching reveals the matrix structure (ferrite, pearlite, bainite)</li>
                <li>Start with shorter etching times (10-15 seconds) and increase if needed</li>
                <li>For softer cast irons like <MaterialTooltip materialName="Gray Cast Iron">Gray Cast Iron</MaterialTooltip> and <MaterialTooltip materialName="Malleable Cast Iron">Malleable Cast Iron</MaterialTooltip>, use 2% Nital</li>
                <li>For harder cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">Austempered Ductile Iron</MaterialTooltip>, use 3-5% Nital</li>
                <li>Picral is excellent for revealing pearlite structure in pearlitic cast irons</li>
              </ul>
              <ProductLink 
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Pre-mixed and custom etching solutions for cast iron, including Nital and Picral"
              />
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Graphite pullout or missing graphite:</strong> Too much pressure during grinding or polishing. Reduce pressure, use softer cloths, and monitor the surface carefully. Graphite is soft and easily removed.</li>
                <li><strong>Graphite appears smeared:</strong> Over-polishing or too aggressive polishing. Reduce polishing time and pressure, use softer cloths.</li>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time or skipped grits. Ensure complete scratch removal at each step, but use lighter pressure.</li>
                <li><strong>Graphite not visible after polishing:</strong> May have been removed during preparation. Start over with lighter pressure throughout the process.</li>
                <li><strong>Relief around graphite:</strong> Over-polishing or too soft a cloth. Reduce polishing time or use slightly harder cloth, but still maintain light pressure.</li>
                <li><strong>Contamination:</strong> Clean between steps, use fresh abrasives, and ensure proper sample cleaning.</li>
                <li><strong>Poor edge retention:</strong> Consider using phenolic mounting material or different mounting technique.</li>
                <li><strong>Over-etching:</strong> Reduce etching time or use lower Nital concentration. Start with shorter times (10-15 seconds).</li>
                <li><strong>Under-etching:</strong> Increase etching time or use higher Nital concentration. Ensure sample is clean before etching.</li>
                <li><strong>Matrix structure not revealed:</strong> May need longer etching time or different etchant. Try Picral for pearlitic structures.</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Remember:</strong> The most common mistake in cast iron preparation is using too much 
                  pressure, which removes or damages the graphite. Always err on the side of lighter pressure 
                  and gentler techniques.
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

