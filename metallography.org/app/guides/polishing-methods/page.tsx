import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import Link from 'next/link'
import YouTubeVideo from '@/components/YouTubeVideo'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('polishing-methods')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'diamond-polishing', label: 'Diamond Polishing' },
  { id: 'polishing-abrasives', label: 'Polishing Abrasives & Suspensions' },
  { id: 'polishing-cloths', label: 'Polishing Cloths & Pads' },
  { id: 'oxide-polishing', label: 'Oxide Polishing' },
  { id: 'final-polishing', label: 'Final Polishing' },
  { id: 'controlled-removal', label: 'Controlled Material Removal' },
  { id: 'vibratory-polishing', label: 'Vibratory Polishing' },
  { id: 'material-specific', label: 'Material-Specific Techniques' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function PolishingMethodsGuide() {
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
      <GuideSideNav sections={sections} />
      <article className="py-12">
        <div className="container-custom lg:pl-0 xl:pl-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Polishing Methods
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Process Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Polishing Methods</h1>
            <p className="text-xl text-gray-600">
              Learn effective polishing techniques for different materials and applications, including 
              diamond polishing, oxide polishing, controlled removal, and final polishing strategies.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#diamond-polishing" className="text-primary-600 hover:underline">Diamond Polishing</a></li>
              <li><a href="#polishing-abrasives" className="text-primary-600 hover:underline">Polishing Abrasives & Suspensions</a></li>
              <li><a href="#polishing-cloths" className="text-primary-600 hover:underline">Polishing Cloths & Pads</a></li>
              <li><a href="#oxide-polishing" className="text-primary-600 hover:underline">Oxide Polishing</a></li>
              <li><a href="#final-polishing" className="text-primary-600 hover:underline">Final Polishing</a></li>
              <li><a href="#controlled-removal" className="text-primary-600 hover:underline">Controlled Material Removal</a></li>
              <li><a href="#vibratory-polishing" className="text-primary-600 hover:underline">Vibratory Polishing</a></li>
              <li><a href="#material-specific" className="text-primary-600 hover:underline">Material-Specific Techniques</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Polishing is the final step in metallographic sample preparation that removes grinding 
                scratches and creates a mirror-like surface suitable for microstructural analysis. 
                Proper polishing technique is essential for revealing true microstructures without 
                introducing artifacts such as relief, contamination, or deformation.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/final-polishing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/final polishing & analysis-cover.webp"
                    alt="Final polishing and analysis consumables for metallographic samples"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Final polishing consumables including diamond abrasives, oxide suspensions, and polishing pads. Proper selection ensures mirror-like surfaces suitable for microstructural analysis.</p>
              </div>
              <p>
                The polishing process typically involves multiple stages, progressing from coarse 
                diamond abrasives to fine oxide suspensions. Each stage must be carefully executed 
                to ensure complete removal of previous scratches while maintaining sample integrity.
              </p>
            </section>

            <section id="diamond-polishing" className="scroll-mt-24">
              <h2>Diamond Polishing</h2>
              <p>
                Diamond polishing is the primary method for removing grinding scratches and preparing 
                the surface for final polishing. Diamond abrasives are available in various particle 
                sizes and formulations to suit different materials and applications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polycrystalline-diamond-high-viscosity.webp"
                      alt="Polycrystalline diamond polishing compound"
                      width={250}
                      height={250}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 250px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond: aggressive cutting, ideal for hard materials</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/monocrystalline-diamond-high-viscosity.webp"
                      alt="Monocrystalline diamond polishing compound"
                      width={250}
                      height={250}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 250px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Monocrystalline diamond: gentler cutting, less aggressive</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polycrystalline-diamond-paste.webp"
                      alt="Diamond paste for manual polishing applications"
                      width={250}
                      height={250}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Diamond paste: grease-based for manual polishing applications</p>
                </div>
              </div>
              <h3>Diamond Polishing Sequence</h3>
              <ol>
                <li><strong>9 μm diamond:</strong> Remove grinding scratches (3-5 minutes)</li>
                <li><strong>3 μm diamond:</strong> Further refinement (3-5 minutes)</li>
                <li><strong>1 μm diamond:</strong> Fine polishing (2-3 minutes)</li>
                <li><strong>0.25 μm diamond (optional):</strong> Ultra-fine preparation (1-2 minutes)</li>
              </ol>

              <YouTubeVideo
                videoId="PT2fRdSvhDM"
                title="Automated Grinding & Polishing with NANO 1000S & FEMTO 1100S"
                description="Watch Dr. Donald Zipperian demonstrate automated grinding and polishing using the NANO 1000S and FEMTO 1100S systems. Learn how to program and operate these automated systems for consistent, high-quality results in both grinding and polishing stages."
              />

              <h3>Diamond Abrasive Types</h3>
              <ul>
                <li><strong>Polycrystalline Diamond:</strong> Aggressive cutting, good for hard materials</li>
                <li><strong>Monocrystalline Diamond:</strong> Softer cutting action, less aggressive</li>
                <li><strong>Diamond Suspensions:</strong> Water-based or oil-based suspensions</li>
                <li><strong>Diamond Pastes:</strong> Grease-based for manual applications</li>
              </ul>
              <ProductLink 
                productName="Diamond Abrasives"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond suspensions, pastes, and lubricants in various particle sizes"
              />
            </section>

            <section id="polishing-abrasives" className="scroll-mt-24">
              <h2>Polishing Abrasives & Suspensions</h2>
              <p>
                Understanding the different types of polishing abrasives and their applications is 
                crucial for achieving optimal results. Each abrasive type has specific characteristics 
                that make it suitable for particular materials and polishing stages.
              </p>
              <h3>Diamond Abrasives</h3>
              <ul>
                <li><strong>Polycrystalline Diamond:</strong> Multiple cutting edges, aggressive removal, ideal for hard materials</li>
                <li><strong>Monocrystalline Diamond:</strong> Single crystal structure, gentler cutting, less deformation</li>
                <li><strong>Available Forms:</strong> Suspensions, pastes, sprays</li>
                <li><strong>Particle Sizes:</strong> 15 μm down to 0.25 μm</li>
              </ul>
              <h3>Oxide Abrasives</h3>
              <ul>
                <li><strong>Alumina (Alpha):</strong> Standard alpha-phase alumina for general polishing</li>
                <li><strong>Alumina (Deagglomerated):</strong> Processed to prevent agglomeration, more consistent</li>
                <li><strong>Alumina (Low Viscosity):</strong> Lower viscosity for better flow and coverage</li>
                <li><strong>Alumina (Polycrystalline):</strong> Multiple crystal structure for aggressive polishing</li>
                <li><strong>Colloidal Alumina:</strong> Ultra-fine particles in suspension, excellent for final polishing</li>
                <li><strong>Colloidal Silica:</strong> Very fine silica particles, produces mirror-like finishes</li>
                <li><strong>Cerium Oxide:</strong> Effective for glass and some ceramics</li>
                <li><strong>CMP Alumina Silica:</strong> Chemical-mechanical polishing blend</li>
              </ul>
              <ProductLink 
                productName="Final Polishing Abrasives"
                href="https://shop.metallographic.com/collections/final-polishing"
                description="Complete range of final polishing abrasives including various alumina types, colloidal silica, and cerium oxide"
              />
            </section>

            <section id="polishing-cloths" className="scroll-mt-24">
              <h2>Polishing Cloths & Pads</h2>
              <p>
                The choice of polishing pad significantly affects polishing results. Different pad 
                types provide varying levels of hardness, nap, and cutting action. Selecting the 
                appropriate pad for each polishing stage is essential.
              </p>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Historical Note:</strong> The importance of polishing cloth selection was recognized early in 
                  metallography's development. In the 1920s-1930s, "kitten-ear" broadcloth was a popular polishing cloth 
                  that became unavailable due to fashion changes. Metallographers searched for substitutes, eventually 
                  working with manufacturers to produce specialized cloths for metallographic use. This early recognition 
                  of cloth importance led to the wide variety of specialized polishing pads available today, with 
                  "kitten-ear" style cloths still used for final polishing of soft metals where scratch removal is 
                  particularly difficult.
                </p>
              </div>
              <div className="mt-3 mb-1 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/polishing-pads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/polishing-pads.webp"
                    alt="Various polishing pads and cloths for different polishing stages"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages. Pad selection affects hardness, nap, and cutting action - choose based on material and polishing stage.</p>
              </div>
              <h3>Polishing Pad (PSA) Selection Guideline</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Pad</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Use Case</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Polishing Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">CERMESH</td>
                      <td className="border border-gray-300 px-4 py-3">Metal mesh pad used for semi-fixed abrasive coarse to intermediate lapping. Excellent for initial removal of damage from sectioning and hard materials.</td>
                      <td className="border border-gray-300 px-4 py-3">Coarse / Intermediate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">POLYPAD</td>
                      <td className="border border-gray-300 px-4 py-3">Durable synthetic polyester pad ideal for intermediate polishing, especially with 6–15 µm diamond abrasives. Designed as a long-life nylon alternative.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">TEXPAN</td>
                      <td className="border border-gray-300 px-4 py-3">Widely used non-woven intermediate polishing pad, compatible with most diamond suspensions. Effective across a broad range of materials.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Black CHEM 2</td>
                      <td className="border border-gray-300 px-4 py-3">Porometric polymer pad with rubber-like consistency, offering balanced action between low and high nap pads. Ideal for moderate nap intermediate polishing.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">DACRON II</td>
                      <td className="border border-gray-300 px-4 py-3">Low-napped soft polishing pad widely used in Europe for intermediate steps on metals. Suitable for 1–15 µm diamond abrasives.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">NYPAD</td>
                      <td className="border border-gray-300 px-4 py-3">Low-napped silk pad tailored for intermediate polishing of harder metals and alloys. Performs well with mid-size diamond abrasives.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">GOLD PAD</td>
                      <td className="border border-gray-300 px-4 py-3">Low-napped pad ideal for 1–9 µm polishing. Designed for consistent material removal and flatness control during final pre-polishing.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">ATLANTIS</td>
                      <td className="border border-gray-300 px-4 py-3">Woven low-nap final polishing pad with foam backing for enhanced compliance. Ideal for 1–6 µm diamond. Great for critical surface flatness needs.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">MICROPAD</td>
                      <td className="border border-gray-300 px-4 py-3">High-napped final polishing pad ideal for producing a mirror finish on metals and polymers. Recommended for &lt;1 µm diamond or colloidal silica.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">TRICOTE</td>
                      <td className="border border-gray-300 px-4 py-3">Tight high-napped final polishing pad for metals. Offers better control of surface texture and minimal abrasive drag.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">NAPPAD</td>
                      <td className="border border-gray-300 px-4 py-3">Very high-napped final polishing pad tailored for soft metals and polymers. Provides gentle polishing action to minimize pull-out and relief.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">MOLTEC 2</td>
                      <td className="border border-gray-300 px-4 py-3">Wool-based final polishing cloth used when edge retention is not critical. Works well with alumina and colloidal silica on metals.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">FELT PAD</td>
                      <td className="border border-gray-300 px-4 py-3">Thick final polishing pad made for large samples or glass. Ideal for use with colloidal silica or alumina slurries where surface uniformity is key.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ProductLink 
                productName="Polishing Pads"
                href="https://shop.metallographic.com/collections/polishing-pads"
                description="Premium polishing pads and cloths in various sizes and hardness levels"
              />
            </section>

            <section id="oxide-polishing" className="scroll-mt-24">
              <h2>Oxide Polishing</h2>
              <p>
                Oxide polishing follows diamond polishing and removes fine scratches while producing 
                a high-quality surface finish. Oxide abrasives are typically used in the final 
                polishing stages.
              </p>
              <h3>Oxide Polishing Sequence</h3>
              <ol>
                <li><strong>0.3 μm alumina:</strong> Remove fine diamond scratches (2-3 minutes)</li>
                <li><strong>0.05 μm colloidal silica:</strong> Final polish for mirror finish (1-2 minutes)</li>
              </ol>
              <h3>Oxide Selection Guidelines</h3>
              <ul>
                <li><strong>Standard Alumina:</strong> General purpose, most materials</li>
                <li><strong>Deagglomerated Alumina:</strong> When consistency is critical</li>
                <li><strong>Colloidal Silica:</strong> For ultra-fine finishes, minimal relief</li>
                <li><strong>Low Viscosity Alumina:</strong> For better coverage and flow</li>
                <li><strong>Cerium Oxide:</strong> Specialized for glass and ceramics</li>
              </ul>
              <p>
                <strong>Important:</strong> Always use fresh oxide suspensions and clean the sample 
                thoroughly between diamond and oxide polishing to prevent contamination.
              </p>
            </section>

            <section id="final-polishing" className="scroll-mt-24">
              <h2>Final Polishing</h2>
              <p>
                Final polishing produces the mirror-like surface required for high-quality 
                microstructural analysis. This stage requires careful attention to detail and 
                appropriate selection of abrasives and cloths.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/final-polishing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <div className="w-full aspect-[4/3] relative">
                      <Image
                        src="/images/consumables/final-polishing-coloidal-silica.webp"
                        alt="Colloidal silica for final polishing"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Colloidal silica (0.05 μm) is the most common final polishing abrasive, producing excellent mirror-like finishes with minimal relief.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <div className="w-full aspect-[4/3] relative">
                    <Image
                      src="/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG"
                      alt="Example of properly polished stainless steel microstructure"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Result of proper final polishing - <MaterialTooltip materialName="431">431 Stainless steel</MaterialTooltip>, 400X. The mirror-like surface reveals true microstructure without artifacts.</p>
                </div>
              </div>
              <h3>Final Polishing Techniques</h3>
              <ul>
                <li>Use ultra-soft cloths (silk, microcloth)</li>
                <li>Apply light pressure (0.5-1.5 lbs)</li>
                <li>Use fresh, high-quality oxide suspensions</li>
                <li>Monitor polishing time to avoid over-polishing</li>
                <li>Clean sample thoroughly after polishing</li>
              </ul>
              <h3>Final Polishing Abrasives</h3>
              <ul>
                <li><strong>Colloidal Silica (0.05 μm):</strong> Most common, produces excellent finishes</li>
                <li><strong>Colloidal Alumina (0.05 μm):</strong> Alternative to silica, less aggressive</li>
                <li><strong>Deagglomerated Alumina:</strong> For consistent, uniform polishing</li>
                <li><strong>Low Viscosity Alumina:</strong> Better flow and coverage</li>
              </ul>
              <ProductLink 
                productName="Final Polishing Abrasives"
                href="https://shop.metallographic.com/collections/final-polishing"
                description="Complete selection of final polishing abrasives including colloidal silica, various alumina types, and cerium oxide"
              />
            </section>

            <section id="controlled-removal" className="scroll-mt-24">
              <h2>Controlled Material Removal</h2>
              <p>
                Controlled removal polishing, also known as metered removal, allows for precise 
                material removal in micron-level increments. This technique is essential for 
                applications requiring extreme precision, such as:
              </p>
              <ul>
                <li>IC Flip Chip preparation</li>
                <li>SEM (Scanning Electron Microscopy) sample preparation</li>
                <li>FIB (Focused Ion Beam) sample preparation</li>
                <li>TEM (Transmission Electron Microscopy) sample preparation</li>
                <li>AFM (Atomic Force Microscopy) sample preparation</li>
                <li>EBSD (Electron Backscatter Diffraction) sample preparation</li>
                <li>Petrographic analysis</li>
                <li>Optical analysis requiring specific depth</li>
              </ul>
              <h3>How Controlled Removal Works</h3>
              <p>
                Controlled removal systems use precision measurement and feedback to remove material 
                in exact increments. The system monitors removal in real-time with micrometer-level 
                resolution, allowing operators to polish to specific depths or remove precise amounts 
                of material.
              </p>
              <h3>Key Features</h3>
              <ul>
                <li>Micrometer-adjustable pitch and roll control for exacting results</li>
                <li>Real-time removal monitoring with 0.2 micron resolution</li>
                <li>Precise sample load control (0-300 grams)</li>
                <li>Variable speed control for optimal material removal rates</li>
                <li>Touchscreen interface for easy operation</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <div className="mb-3 rounded-lg overflow-hidden max-w-xs mx-auto">
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/grinding & polishing/controlled removal polisher/atto-1000s/atto-polisher-cover.webp"
                      alt="ATTO-1000S Controlled Removal Polisher"
                      width={250}
                      height={188}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Recommended Equipment:</strong> ATTO-1000S Controlled Removal Polisher
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  The ATTO-1000S offers precision-controlled removal with micrometer-level accuracy, 
                  making it ideal for applications requiring extreme specificity for points of interest.
                </p>
                <Link 
                  href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View ATTO-1000S Controlled Removal Polisher →
                </Link>
              </div>
            </section>

            <section id="vibratory-polishing" className="scroll-mt-24">
              <h2>Vibratory Polishing</h2>
              <p>
                Vibratory polishing is a cost-effective alternative for final polishing that eliminates 
                subsurface damage and produces superior surface finishes. This method is particularly 
                effective for EBSD sample preparation and applications requiring minimal deformation.
              </p>
              <h3>Advantages of Vibratory Polishing</h3>
              <ul>
                <li>Eliminates subsurface damage</li>
                <li>Produces superior flatness and planarity</li>
                <li>Reduces operator variability</li>
                <li>Cost-effective compared to laser removal systems</li>
                <li>Ideal for batch processing</li>
                <li>Pulse mode prevents staining</li>
              </ul>

              <YouTubeVideo
                id="vibratory-polishing-video"
                videoId="cPkzthQbLcM"
                title="Vibratory Polishing with the GIGA S"
                description="Learn vibratory polishing techniques from Dr. Donald Zipperian. This video demonstrates how to use the GIGA S vibratory polisher for final polishing, including setup, parameter selection, and achieving superior surface finishes for EBSD and high-quality microstructural analysis."
              />

              <h3>Vibratory Polishing Process</h3>
              <ol>
                <li>Prepare sample through standard grinding and initial polishing</li>
                <li>Select appropriate polishing bowl size (9" or 12")</li>
                <li>Add polishing suspension to bowl</li>
                <li>Set frequency and power for desired polishing rate</li>
                <li>Place samples in bowl and allow polishing</li>
                <li>Monitor progress and adjust as needed</li>
              </ol>
              <h3>Applications</h3>
              <ul>
                <li>EBSD sample preparation</li>
                <li>Final polishing for high-quality microstructural analysis</li>
                <li>Batch processing multiple samples</li>
                <li>Applications requiring minimal deformation</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <div className="mb-3 rounded-lg overflow-hidden max-w-xs mx-auto">
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/grinding & polishing/vibratory polisher/giga-s-cover.webp"
                      alt="GIGA-S Vibratory Polisher"
                      width={250}
                      height={188}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Recommended Equipment:</strong> GIGA-S Vibratory Polisher
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  The GIGA-S vibratory polisher ensures superior surface finishes with precise vibration 
                  control and interchangeable polishing bowls. A cost-effective solution for final polishing 
                  without the need for laser removal systems.
                </p>
                <Link 
                  href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View GIGA-S Vibratory Polisher →
                </Link>
              </div>
            </section>

            <section id="material-specific" className="scroll-mt-24">
              <h2>Material-Specific Polishing Techniques</h2>
              <h3>Hard Materials (Hardened Steels, Ceramics)</h3>
              <ul>
                <li>Use polycrystalline diamond for aggressive cutting</li>
                <li>Longer polishing times may be required</li>
                <li>Can tolerate higher pressure</li>
                <li>May benefit from controlled removal for precision work</li>
              </ul>
              <h3>Soft Materials (Aluminum, Copper, Lead)</h3>
              <ul>
                <li>Use monocrystalline diamond for gentler cutting</li>
                <li>Shorter polishing times to avoid over-polishing</li>
                <li>Light pressure to prevent deformation</li>
                <li>Monitor carefully for smearing</li>
              </ul>
              <h3>Work-Hardening Materials (Stainless Steel, Nickel Alloys)</h3>
              <ul>
                <li>Use consistent, moderate pressure</li>
                <li>Avoid excessive polishing time</li>
                <li>Progress through grits systematically</li>
                <li>Consider vibratory polishing for final stage</li>
              </ul>
              <h3>Multi-Phase Materials</h3>
              <ul>
                <li>Use softer cloths to minimize relief</li>
                <li>Shorter polishing times to prevent over-polishing</li>
                <li>Monitor for relief around different phases</li>
                <li>May require specialized final polishing techniques</li>
              </ul>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting Common Issues</h2>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Inclusion-oxide-2.jpg"
                  alt="Example of inclusions and surface quality issues that can occur during polishing"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Proper polishing technique prevents relief and surface defects. This image shows how correct polishing maintains inclusion integrity without creating artifacts around different phases.</p>
              </div>
              <h3>Scratches Not Removing</h3>
              <ul>
                <li>Insufficient polishing time at current stage</li>
                <li>Grit progression too aggressive (skipped sizes)</li>
                <li>Cloth too hard or too soft for current stage</li>
                <li>Insufficient or contaminated abrasive</li>
              </ul>
              <h3>Relief Around Inclusions or Phases</h3>
              <ul>
                <li>Over-polishing - reduce polishing time</li>
                <li>Cloth too soft - use harder cloth</li>
                <li>Pressure too high - reduce pressure</li>
                <li>Consider vibratory polishing for final stage</li>
              </ul>
              <h3>Contamination</h3>
              <ul>
                <li>Not cleaning sample between stages</li>
                <li>Using contaminated abrasives or cloths</li>
                <li>Cross-contamination from previous steps</li>
                <li>Dirty polishing equipment</li>
              </ul>
              <h3>Poor Surface Quality</h3>
              <ul>
                <li>Incomplete removal of previous scratches</li>
                <li>Inappropriate cloth selection</li>
                <li>Incorrect abrasive type or size</li>
                <li>Insufficient polishing time</li>
              </ul>
              <h3>Over-Polishing</h3>
              <ul>
                <li>Excessive polishing time</li>
                <li>Too soft a cloth for material</li>
                <li>Pressure too high</li>
                <li>Inappropriate abrasive selection</li>
              </ul>
            </section>

            {/* Equipment Recommendations */}
            <section className="mt-12 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
              <h2 className="text-2xl font-semibold mb-4">Recommended Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/manual grinder polishers/nano-1000s/nano-1000s-cover.webp"
                        alt="NANO Series manual polishers"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Manual Polishers</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    NANO Series manual polishers offer precise control with variable speed and versatile 
                    wheel options. Available in single, double, or large wheel configurations.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View NANO Manual Polishers →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/femto.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/semi-auto grinder polishers/femto-1100s/femto-1100s-cover.webp"
                        alt="FEMTO automated polishing heads"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Semi-Automated Polishing Attachments</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    FEMTO automated polishing heads attach to manual polishers to automate force application 
                    and improve consistency.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/femto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View FEMTO Semi-Auto Attachments →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/controlled removal polisher/atto-1000s/atto-polisher-cover.webp"
                        alt="ATTO-1000S Controlled Removal Polisher"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Controlled Removal Polisher</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    ATTO-1000S controlled removal polisher provides micrometer-level precision for 
                    applications requiring extreme specificity.
                  </p>
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View ATTO-1000S Controlled Removal Polisher →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/vibratory polisher/giga-s-cover.webp"
                        alt="GIGA-S Vibratory Polisher"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Vibratory Polisher</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    GIGA-S vibratory polisher is a cost-effective solution for final polishing that 
                    eliminates subsurface damage and produces superior surface finishes.
                  </p>
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View GIGA-S Vibratory Polisher →
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
                  href="https://shop.metallographic.com/collections/diamond-abrasives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Shop Diamond Abrasives
                </Link>
                <Link 
                  href="https://shop.metallographic.com/collections/polishing-pads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Shop Polishing Pads
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
                <Link href="/guides/stainless-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Stainless Steel Preparation
                </Link>
                <Link href="/guides/etching-procedures" className="text-primary-600 hover:underline font-semibold">
                  → Etching Procedures
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

