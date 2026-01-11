import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import YouTubeVideo from '@/components/YouTubeVideo'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('grinding-techniques')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'grit-selection', label: 'Grit Selection' },
  { id: 'grinding-sequence', label: 'Grinding Sequence' },
  { id: 'technique', label: 'Proper Technique' },
  { id: 'pressure-control', label: 'Pressure Control' },
  { id: 'lubrication', label: 'Lubrication' },
  { id: 'material-specific', label: 'Material-Specific Considerations' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function GrindingTechniquesGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Grinding Techniques
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Process Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Grinding Techniques</h1>
            <p className="text-xl text-gray-600">
              Master the art of grinding with proper grit selection, pressure control, and technique 
              for optimal surface quality in metallographic sample preparation.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#grit-selection" className="text-primary-600 hover:underline">Grit Selection</a></li>
              <li><a href="#grinding-sequence" className="text-primary-600 hover:underline">Grinding Sequence</a></li>
              <li><a href="#technique" className="text-primary-600 hover:underline">Proper Technique</a></li>
              <li><a href="#pressure-control" className="text-primary-600 hover:underline">Pressure Control</a></li>
              <li><a href="#lubrication" className="text-primary-600 hover:underline">Lubrication</a></li>
              <li><a href="#material-specific" className="text-primary-600 hover:underline">Material-Specific Considerations</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Grinding is a critical step in metallographic sample preparation that removes sectioning 
                damage and prepares the surface for polishing. Proper grinding technique ensures that 
                scratches are progressively removed without introducing new damage or deformation.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/grinding & lapping-cover.webp"
                    alt="Grinding and lapping consumables for metallographic sample preparation"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Grinding and lapping consumables including silicon carbide papers, powders, and accessories. Progressive grinding removes sectioning damage while preparing the surface for polishing.</p>
              </div>
              <p>
                The goal of grinding is to remove the damaged layer from sectioning while creating a 
                uniform scratch pattern that can be easily removed during polishing. This requires 
                careful attention to grit progression, pressure, and technique.
              </p>
            </section>

            <section id="grit-selection" className="scroll-mt-24">
              <h2>Grit Selection</h2>
              <p>
                Selecting the appropriate starting grit depends on the amount of sectioning damage and 
                the material being prepared. As a general rule:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/sic-grinding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/abrasive grinding-SiC papers.webp"
                      alt="Silicon carbide grinding papers in various grit sizes"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers available in grit sizes from 120 to 1200. Start with coarsest grit needed to remove sectioning damage.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/sic-powders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/grinding SiC powders.webp"
                      alt="Silicon carbide grinding powders for different applications"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Silicon carbide grinding powders for specialized applications. Powders can be used with lapping plates for precision grinding.</p>
                </div>
              </div>
              <ul>
                <li><strong>120-180 grit:</strong> For heavy sectioning damage or very hard materials</li>
                <li><strong>240-320 grit:</strong> For moderate sectioning damage (most common starting point)</li>
                <li><strong>400-600 grit:</strong> For minimal damage or soft materials</li>
              </ul>
              <p>
                Always start with the coarsest grit necessary to remove sectioning damage efficiently. 
                Starting too fine will prolong the grinding process and may not fully remove damage.
              </p>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Premium SiC grinding papers available in all standard grit sizes"
              />
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <div className="mb-3 rounded-lg overflow-hidden max-w-xs mx-auto">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/penta.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/grinding & polishing/hand & belt grinders/penta-7500s/penta-7500s-cover.webp"
                      alt="PENTA Series hand and belt grinders"
                      width={250}
                      height={188}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 250px"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Recommended Equipment:</strong> Hand & Belt Grinders
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  PENTA Series hand and belt grinders deliver precise material removal with robust construction and efficient cooling.
                </p>
                <Link 
                  href="https://metallographic.com/metallographic-equipment/grinding-polishing/penta.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View Hand & Belt Grinders →
                </Link>
              </div>
            </section>

            <section id="grinding-sequence" className="scroll-mt-24">
              <h2>Grinding Sequence</h2>
              <p>
                A typical grinding sequence progresses through increasingly fine grits. The key is to 
                ensure that all scratches from the previous grit are removed before moving to the next.
              </p>
              <h3>Standard Grinding Sequence</h3>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage (30-60 seconds)</li>
                <li><strong>240 grit:</strong> Remove 120-grit scratches (30-60 seconds)</li>
                <li><strong>320 grit:</strong> Further refinement (30-60 seconds)</li>
                <li><strong>400 grit:</strong> Continue refinement (30-60 seconds)</li>
                <li><strong>600 grit:</strong> Final grinding step (30-60 seconds)</li>
                <li><strong>800 grit (optional):</strong> For very fine finishes (30-60 seconds)</li>
                <li><strong>1200 grit (optional):</strong> For ultra-fine finishes (30-60 seconds)</li>
              </ol>
              <p>
                <strong>Important:</strong> The exact sequence may vary based on material and initial 
                damage. Always inspect the surface after each step to ensure complete scratch removal.
              </p>
            </section>

            <section id="technique" className="scroll-mt-24">
              <h2>Proper Grinding Technique</h2>
              <h3>Sample Orientation</h3>
              <p>
                Rotate the sample 90° between each grit to ensure complete removal of previous scratches. 
                This is critical - grinding in the same direction as previous scratches will not remove them.
              </p>
              <h3>Grinding Motion</h3>
              <ul>
                <li>Use a figure-8 or circular motion for even material removal</li>
                <li>Cover the entire sample surface evenly</li>
                <li>Avoid staying in one area too long (prevents over-grinding)</li>
                <li>Maintain consistent contact with the grinding surface</li>
              </ul>

              <YouTubeVideo
                id="manual-grinding-video"
                videoId="oFQoUkcwTMc"
                title="Manual Grinding with PENTA 7500S & PENTA 5000A"
                description="Learn proper manual grinding techniques from Dr. Donald Zipperian. This video demonstrates correct sample orientation, grinding motion, pressure control, and proper use of the PENTA manual grinding systems."
              />

              <YouTubeVideo
                id="automated-grinding-video"
                videoId="PT2fRdSvhDM"
                title="Automated Grinding & Polishing with NANO 1000S & FEMTO 1100S"
                description="Watch Dr. Donald Zipperian demonstrate automated grinding and polishing using the NANO 1000S and FEMTO 1100S systems. Learn how to program and operate these automated systems for consistent, high-quality results."
              />

              <h3>Time Management</h3>
              <p>
                Each grinding step typically requires 30-60 seconds, but this varies based on:
              </p>
              <ul>
                <li>Material hardness</li>
                <li>Amount of damage to remove</li>
                <li>Grit size (coarser grits may need more time)</li>
                <li>Grinding pressure applied</li>
              </ul>
            </section>

            <section id="pressure-control" className="scroll-mt-24">
              <h2>Pressure Control</h2>
              <p>
                Applying the correct pressure is crucial for effective grinding. Too much pressure can 
                cause deformation, while too little may not remove scratches efficiently.
              </p>
              <h3>Guidelines for Pressure</h3>
              <ul>
                <li><strong>Coarse grits (120-240):</strong> Moderate pressure (2-4 lbs)</li>
                <li><strong>Medium grits (320-400):</strong> Light to moderate pressure (1-3 lbs)</li>
                <li><strong>Fine grits (600+):</strong> Light pressure (1-2 lbs)</li>
              </ul>
              <p>
                <strong>Rule of thumb:</strong> Use enough pressure to maintain contact and remove 
                material, but not so much that you feel excessive resistance or see deformation.
              </p>
              <h3>Pressure Distribution</h3>
              <p>
                Distribute pressure evenly across the sample. Avoid concentrating pressure on edges or 
                corners, which can cause rounding or over-grinding.
              </p>
            </section>

            <section id="lubrication" className="scroll-mt-24">
              <h2>Lubrication</h2>
              <p>
                Proper lubrication is essential for effective grinding. It serves multiple purposes:
              </p>
              <ul>
                <li>Reduces heat generation</li>
                <li>Flushes away removed material</li>
                <li>Prevents loading of the abrasive</li>
                <li>Reduces friction and wear</li>
              </ul>
              <h3>Lubricant Selection</h3>
              <ul>
                <li><strong>Water:</strong> Most common, suitable for most materials</li>
                <li><strong>Water with surfactant:</strong> Better wetting for some materials</li>
                <li><strong>Oil-based:</strong> For materials that react with water</li>
                <li><strong>Specialized fluids:</strong> For specific applications</li>
              </ul>
              <p>
                Apply lubricant continuously during grinding to maintain a clean, effective grinding surface.
              </p>
            </section>

            <section id="material-specific" className="scroll-mt-24">
              <h2>Material-Specific Considerations</h2>
              <h3>Hard Materials</h3>
              <ul>
                <li>May require starting with coarser grits (120-180)</li>
                <li>Can tolerate higher pressure</li>
                <li>May need longer grinding times per step</li>
                <li>Less prone to deformation</li>
              </ul>
              <h3>Soft Materials</h3>
              <ul>
                <li>Start with finer grits (240-320) to minimize damage</li>
                <li>Use lighter pressure to avoid deformation</li>
                <li>Shorter grinding times may be sufficient</li>
                <li>More prone to smearing - monitor carefully</li>
              </ul>
              <h3>Work-Hardening Materials</h3>
              <ul>
                <li>Use consistent, moderate pressure</li>
                <li>Avoid excessive grinding time</li>
                <li>May benefit from intermediate polishing steps</li>
                <li>Monitor for deformation carefully</li>
              </ul>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting Common Issues</h2>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Inclusion-oxide-2.jpg"
                  alt="Example of contamination and inclusion issues that can occur during grinding"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Proper grinding technique helps avoid contamination and surface defects. Clean samples between grits, use fresh abrasives, and maintain consistent pressure to prevent artifacts.</p>
              </div>
              <h3>Scratches Not Removing</h3>
              <ul>
                <li>Insufficient grinding time at current grit</li>
                <li>Not rotating sample 90° between grits</li>
                <li>Pressure too light</li>
                <li>Grit progression too aggressive (skipped grits)</li>
              </ul>
              <h3>Excessive Deformation</h3>
              <ul>
                <li>Pressure too high</li>
                <li>Grinding time too long</li>
                <li>Grit too coarse for material</li>
                <li>Insufficient lubrication</li>
              </ul>
              <h3>Uneven Surface</h3>
              <ul>
                <li>Inconsistent pressure application</li>
                <li>Not covering entire surface evenly</li>
                <li>Worn or damaged grinding paper</li>
                <li>Sample not flat against grinding surface</li>
              </ul>
              <h3>Contamination</h3>
              <ul>
                <li>Not cleaning sample between grits</li>
                <li>Using contaminated lubricant</li>
                <li>Cross-contamination from previous steps</li>
                <li>Dirty grinding equipment</li>
              </ul>
            </section>

            {/* Equipment Recommendations */}
            <section className="mt-12 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
              <h2 className="text-2xl font-semibold mb-4">Recommended Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/penta.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/hand & belt grinders/penta-7500s/penta-7500s-cover.webp"
                        alt="PENTA Series hand and belt grinders"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Hand & Belt Grinders</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    PENTA Series hand and belt grinders provide precise material removal with robust construction 
                    and efficient cooling systems.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/penta.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View PENTA Hand & Belt Grinders →
                  </Link>
                </div>
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
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 250px"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Manual Polishers</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    NANO Series manual polishers offer precise control with variable speed and versatile wheel options. 
                    Available in single, double, or large wheel configurations.
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
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 250px"
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
                  href="https://shop.metallographic.com/collections/grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Shop Grinding Supplies
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
                <Link href="/guides/stainless-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Stainless Steel Preparation
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/guides/aluminum-sample-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Aluminum Sample Preparation
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

