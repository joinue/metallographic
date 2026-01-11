import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import MaterialTooltip from '@/components/MaterialTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'
import RelatedGuides from '@/components/RelatedGuides'

export const metadata: Metadata = {
  title: 'Stainless Steel Sample Preparation Guide | Metallography.org',
  description: 'Complete step-by-step guide to preparing stainless steel samples for metallographic analysis. Learn grinding, polishing, and etching techniques for stainless steel microstructural analysis.',
  keywords: [
    'stainless steel preparation',
    'stainless steel metallography',
    'stainless steel sample preparation',
    'stainless steel grinding',
    'stainless steel polishing',
    'stainless steel etching',
    'metallographic analysis',
    'microstructure analysis',
  ],
  openGraph: {
    title: 'Stainless Steel Sample Preparation Guide | Metallography.org',
    description: 'Complete step-by-step guide to preparing stainless steel samples for metallographic analysis. Learn grinding, polishing, and etching techniques.',
    url: 'https://metallography.org/guides/stainless-steel-preparation',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG',
        width: 600,
        height: 450,
        alt: 'Stainless steel microstructure at 400X magnification',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stainless Steel Sample Preparation Guide',
    description: 'Complete step-by-step guide to preparing stainless steel samples for metallographic analysis.',
    images: ['/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG'],
  },
  alternates: {
    canonical: 'https://metallography.org/guides/stainless-steel-preparation',
  },
}

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'sectioning', label: 'Sectioning' },
  { id: 'mounting', label: 'Mounting' },
  { id: 'grinding', label: 'Grinding' },
  { id: 'polishing', label: 'Polishing' },
  { id: 'etching', label: 'Etching' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

const guide = getGuideBySlug('stainless-steel-preparation')!

export default function StainlessSteelGuide() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData, howToStructuredData, faqStructuredData } = getGuideStructuredData(guide)
  
  // Legacy structured data (keeping for compatibility, but using new function above)
  const legacyArticleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Stainless Steel Sample Preparation Guide',
    description: 'Complete step-by-step guide to preparing stainless steel samples for metallographic analysis, including sectioning, mounting, grinding, polishing, and etching techniques.',
    image: 'https://metallography.org/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG',
    author: {
      '@type': 'Organization',
      name: 'Metallography.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Metallography.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metallography.org/logo.png',
      },
    },
    datePublished: '2024-10-01', // Original publication date
    dateModified: new Date().toISOString().split('T')[0], // Current date for freshness
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://metallography.org/guides/stainless-steel-preparation',
    },
    articleSection: 'Material-Specific',
    about: {
      '@type': 'Thing',
      name: 'Stainless Steel Metallography',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      {howToStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <article className="py-12">
      <GuideSideNav sections={sections} />
      <div className="container-custom lg:pl-0 xl:pl-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Stainless Steel Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Stainless Steel Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing stainless steel samples for metallographic analysis, 
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
                Stainless steel is one of the most commonly analyzed materials in metallography. 
                From common austenitic grades like <MaterialTooltip materialName="304">304 Stainless Steel</MaterialTooltip> to 
                high-strength precipitation-hardening alloys, proper preparation is essential to reveal 
                the true microstructure without introducing artifacts such as deformation, scratches, or 
                contamination. This guide will walk you through the complete preparation process.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG"
                  alt="431 Stainless steel microstructure at 400X magnification, properly prepared and etched"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center"><MaterialTooltip materialName="431">431 Stainless steel</MaterialTooltip>, Kallings no. 2 etchant, 400X magnification. This image demonstrates the proper microstructure revealed through correct preparation techniques.</p>
              </div>
              <p>
                Stainless steels can be challenging due to their work-hardening characteristics and 
                varying hardness depending on the grade. Softer austenitic grades like <MaterialTooltip materialName="304">304</MaterialTooltip> 
                and <MaterialTooltip materialName="316">316</MaterialTooltip> work-harden during preparation, while harder martensitic 
                and precipitation-hardening grades like <MaterialTooltip materialName="17-4 PH">17-4 PH</MaterialTooltip> require more 
                aggressive cutting and grinding. The key is to use appropriate abrasives and maintain 
                consistent pressure throughout the process.
              </p>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                When sectioning stainless steel samples, use a slow cutting speed to minimize heat 
                generation and deformation. A cutting speed of 100-200 RPM is typically appropriate 
                for most stainless steel grades. Harder grades like <MaterialTooltip materialName="17-4 PH">17-4 PH Stainless Steel</MaterialTooltip> 
                may require even slower speeds (80-150 RPM) to prevent excessive heat buildup.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-vhs.png"
                    alt="Precision cutting abrasive blades for stainless steel sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">MAX-VHS abrasive cut-off blades designed for hard and case-hardened stainless steels. For general stainless steel grades, MAX-D series blades are also suitable. Thin blades (0.5-1.0 mm) minimize heat generation and deformation.</p>
              </div>
              <ul>
                <li>Use MAX-VHS series blades for hard and case-hardened stainless steels, or MAX-D series for general stainless steel grades</li>
                <li>Use a thin abrasive cut-off wheel (0.5-1.0 mm thickness)</li>
                <li>Apply steady, moderate pressure</li>
                <li>Use adequate coolant to prevent overheating</li>
                <li>Allow the wheel to do the cutting - avoid forcing</li>
              </ul>
              <ProductLink 
                productName="MAX-VHS and MAX-D Abrasive Blades"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="MAX-VHS blades for hard/case-hardened stainless steel, MAX-D blades for general stainless steel grades"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For stainless steel, compression 
                mounting with phenolic or epoxy resins works well. If edge retention is critical, 
                consider conductive mounting materials.
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
                coarse grits and progressively move to finer grits. For stainless steel, we recommend 
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
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
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
                removal of previous scratches. Use water as a lubricant and maintain light, consistent pressure.
              </p>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="SiC papers in all grit sizes for consistent grinding"
              />
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing</h2>
              <p>
                Polishing removes grinding scratches and prepares a mirror-like surface. For stainless 
                steel, diamond polishing followed by oxide polishing typically yields excellent results.
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
                      alt="Polycrystalline diamond polishing compound for stainless steel"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides aggressive cutting action ideal for hard materials like stainless steel.</p>
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
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages. Select pad hardness based on material and polishing stage.</p>
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
                can introduce relief, especially around inclusions or second phases.
              </p>
              <ProductLink 
                productName="Diamond Abrasives"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="Diamond polishing compounds in various particle sizes"
              />
              <ProductLink 
                productName="Polishing Pads"
                href="https://shop.metallographic.com/collections/polishing-pads"
                description="Polishing pads for different polishing stages"
              />
            </section>

            <section id="etching" className="scroll-mt-24">
              <h2>Etching</h2>
              <p>
                Etching reveals the microstructure by selectively attacking grain boundaries and phases. 
                The choice of etchant depends on the stainless steel grade and what features you want to reveal.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/431 Stainless steel, Kallings no. 2, 400X (DIC).JPG"
                  alt="431 Stainless steel microstructure after proper etching, showing grain boundaries and structure at 400X with DIC"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center"><MaterialTooltip materialName="431">431 Stainless steel</MaterialTooltip> etched with Kallings no. 2, 400X magnification (DIC). Proper etching reveals grain boundaries and phase structure without over-etching artifacts.</p>
              </div>
              <h3>Common Etchants for Stainless Steel</h3>
              <ul>
                <li><strong>Vilella's Reagent:</strong> General purpose, reveals grain boundaries. Works well for martensitic grades like <MaterialTooltip materialName="431">431</MaterialTooltip>.</li>
                <li><strong>Aqua Regia:</strong> For austenitic stainless steels like <MaterialTooltip materialName="304">304</MaterialTooltip> and <MaterialTooltip materialName="316">316</MaterialTooltip>. Excellent for revealing grain boundaries and phases.</li>
                <li><strong>Electrolytic Etching:</strong> For sensitive microstructures. Particularly useful for austenitic grades where chemical etching may be too aggressive.</li>
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
                    alt="Etching solutions and reagents for stainless steel"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for stainless steel. Common etchants include Vilella's Reagent, Aqua Regia, and electrolytic solutions. Etching time typically ranges from 5-30 seconds depending on the etchant and steel grade.</p>
              </div>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry</li>
                <li>Apply etchant with cotton swab or immerse sample</li>
                <li>Etch for 5-30 seconds (time varies by etchant and grade)</li>
                <li>Immediately rinse with water, then alcohol</li>
                <li>Dry with compressed air</li>
              </ol>
              <p>
                <strong>Tip:</strong> Start with shorter etching times and increase if needed. 
                Over-etching can obscure fine details. Austenitic grades like <MaterialTooltip materialName="304">304</MaterialTooltip> 
                typically require 10-30 seconds, while martensitic grades may need only 5-15 seconds 
                depending on the etchant used.
              </p>
              <ProductLink 
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Pre-mixed and custom etching solutions for stainless steel"
              />
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time or skipped grits</li>
                <li><strong>Relief around inclusions:</strong> Over-polishing or too soft a cloth</li>
                <li><strong>Contamination:</strong> Clean between steps, use fresh abrasives</li>
                <li><strong>Poor edge retention:</strong> Consider different mounting material or technique</li>
                <li><strong>Over-etching:</strong> Reduce etching time or dilute etchant</li>
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
        
        {/* Related Guides Section */}
        <RelatedGuides currentGuide={guide} limit={3} />
      </div>
      </article>
    </>
  )
}

