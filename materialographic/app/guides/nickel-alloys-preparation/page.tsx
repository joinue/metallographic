import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import MaterialTooltip from '@/components/MaterialTooltip'

export const metadata: Metadata = {
  title: 'Nickel Alloys Sample Preparation Guide | Metallography.org',
  description: 'Complete step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis. Learn specialized techniques for high-temperature alloys.',
  keywords: [
    'nickel alloys preparation',
    'nickel superalloys',
    'nickel metallography',
    'nickel sample preparation',
    'superalloy preparation',
    'Inconel preparation',
    'metallographic analysis',
    'microstructure analysis',
  ],
  openGraph: {
    title: 'Nickel Alloys Sample Preparation Guide | Metallography.org',
    description: 'Complete step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis.',
    url: 'https://metallography.org/guides/nickel-alloys-preparation',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Nickel alloys microstructure',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nickel Alloys Sample Preparation Guide',
    description: 'Complete step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/guides/nickel-alloys-preparation',
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

export default function NickelAlloysGuide() {
  // Article structured data
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Nickel Alloys Sample Preparation Guide',
    description: 'Complete step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis, including sectioning, mounting, grinding, polishing, and etching techniques.',
    image: 'https://metallography.org/logo.png',
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
      '@id': 'https://metallography.org/guides/nickel-alloys-preparation',
    },
    articleSection: 'Material-Specific',
    about: {
      '@type': 'Thing',
      name: 'Nickel Alloys Metallography',
    },
  }

  // HowTo structured data
  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Prepare Nickel Alloy Samples for Metallographic Analysis',
    description: 'Step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis',
    image: 'https://metallography.org/logo.png',
    totalTime: 'PT50M',
    tool: [
      { '@type': 'HowToTool', name: 'Abrasive cutting saw' },
      { '@type': 'HowToTool', name: 'Mounting press' },
      { '@type': 'HowToTool', name: 'Grinding papers' },
      { '@type': 'HowToTool', name: 'Polishing equipment' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Sectioning',
        text: 'Use slow cutting speeds (80-150 RPM) with MAX-C series blades (silicon carbide/resin-rubber bond) designed for hard non-ferrous metals. Cool continuously with cutting fluid.',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Mounting',
        text: 'Use compression mounting with epoxy or phenolic resins. For superalloys, epoxy mounting is preferred to avoid thermal damage.',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Grinding',
        text: 'Progressive grinding: 120, 240, 400, 600, 800 grit. Use light pressure and rotate 90° between grits.',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Polishing',
        text: 'Diamond polishing: 9 μm, 6 μm, 3 μm, 1 μm. Final polish with 0.05 μm colloidal silica or alumina.',
        position: 4,
      },
      {
        '@type': 'HowToStep',
        name: 'Etching',
        text: 'Use Glyceregia, Aqua Regia, or electrolytic etching. Etching times vary from 5-60 seconds depending on alloy composition.',
        position: 5,
      },
    ],
  }

  // Course structured data
  const courseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Nickel Alloys Sample Preparation Guide',
    description: 'Complete in-depth guide to preparing nickel and nickel-based superalloy samples for metallographic analysis',
    provider: {
      '@type': 'Organization',
      name: 'Metallography.org',
    },
    educationalLevel: 'Advanced',
    timeRequired: 'PT14M',
    courseCode: 'MET-NICKEL-ALLOYS',
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://metallography.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://metallography.org/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Nickel Alloys Preparation',
        item: 'https://metallography.org/guides/nickel-alloys-preparation',
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Nickel and Cobalt Superalloys Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Nickel and Cobalt Superalloys Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing nickel and cobalt superalloy samples for metallographic analysis, 
              covering specialized techniques for high-temperature alloys including <MaterialTooltip materialName="Inconel 718">Inconel</MaterialTooltip>, <MaterialTooltip materialName="Hastelloy C-276">Hastelloy</MaterialTooltip>, <MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite</MaterialTooltip>, and other superalloys.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-primary-600 hover:underline">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Nickel and cobalt superalloys are among the most challenging materials to prepare for 
                metallographic analysis. These materials are used in high-temperature applications, aerospace, 
                chemical processing, and wear-resistant applications due to their excellent corrosion resistance, 
                high strength, temperature stability, and hardness.
              </p>
              <p>
                Common nickel alloys include <MaterialTooltip materialName="Inconel 718">Inconel</MaterialTooltip> (600, 625, 718, 738), <MaterialTooltip materialName="Hastelloy C-276">Hastelloy</MaterialTooltip> (C-276, X), Monel, and various 
                superalloys. Cobalt alloys like <MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite</MaterialTooltip> are also high-temperature, 
                wear-resistant materials with similar preparation challenges. These materials often contain complex 
                microstructures with multiple phases including gamma prime (γ'), carbides, and other precipitates 
                that require careful preparation to reveal.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Key Challenge:</strong> Nickel and cobalt superalloys are typically very hard and work-harden easily. 
                  They require slow cutting speeds, careful grinding, and extended polishing times to avoid 
                  introducing deformation artifacts. Cobalt alloys like <MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite</MaterialTooltip> are particularly hard (450+ HB) 
                  and contain carbides that must be preserved.
                </p>
              </div>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                Nickel and cobalt superalloys are extremely hard and work-harden rapidly during cutting. Proper sectioning is 
                critical to minimize deformation and heat generation. Cobalt alloys like <MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite</MaterialTooltip> are particularly hard 
                (450+ HB) and require careful cutting techniques.
              </p>
              
              <h3>Cutting Parameters</h3>
              <ul>
                <li><strong>Cutting Speed:</strong> 80-150 RPM (very slow to minimize heat and deformation)</li>
                <li><strong>Blade Selection:</strong> MAX-C series blades (silicon carbide/resin-rubber bond) - designed for hard non-ferrous metals like nickel and cobalt superalloys</li>
                <li><strong>Cooling:</strong> Continuous cooling with cutting fluid is essential</li>
                <li><strong>Feed Rate:</strong> Slow, steady feed to avoid excessive pressure</li>
              </ul>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <ProductLink
                  productName="MAX-C Abrasive Blades"
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  description="Silicon carbide/resin-rubber bond blades optimized for hard non-ferrous metals like nickel and cobalt superalloys, titanium, and zirconium. Provides aggressive cutting with controlled wear."
                />
              </div>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/cutting-fluids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-cutting-fluids.webp"
                    alt="Cutting fluids for nickel alloy sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Cutting fluids are essential for nickel and cobalt superalloy sectioning to prevent overheating and minimize deformation. Continuous cooling throughout the cut is critical.</p>
              </div>

              <h3>Best Practices</h3>
              <ul>
                <li>Use thin blades (0.5-1.0 mm) to minimize kerf loss and heat generation</li>
                <li>Maintain constant cooling throughout the cut</li>
                <li>Avoid excessive pressure - let the blade do the work</li>
                <li>For very hard superalloys, consider using a precision saw with diamond blade</li>
              </ul>
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Compression mounting is standard for nickel alloys. Epoxy mounting is preferred for superalloys 
                to avoid thermal damage that can occur with phenolic resins.
              </p>

              <h3>Mounting Materials</h3>
              <ul>
                <li><strong>Epoxy Resins:</strong> Preferred for superalloys - lower curing temperature (150-180°C)</li>
                <li><strong>Phenolic Resins:</strong> Acceptable for standard nickel alloys - higher temperature (150-180°C)</li>
                <li><strong>Mounting Pressure:</strong> 2000-4000 psi depending on resin type</li>
              </ul>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/mounting-materials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/epoxy-compression-mounting.webp"
                    alt="Epoxy compression mounting materials for nickel alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Epoxy mounting materials are preferred for nickel superalloys to avoid thermal damage. Lower curing temperatures help preserve microstructure integrity.</p>
              </div>

              <h3>Mounting Procedure</h3>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>Select appropriate mold size (typically 1.25" or 1.5" diameter)</li>
                <li>Place sample in mold with the surface of interest facing up</li>
                <li>Add mounting compound and mount at recommended temperature and pressure</li>
                <li>Allow to cool slowly to room temperature before removing from mold</li>
              </ol>

              <ProductLink 
                productName="Compression Mounting Equipment"
                href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                description="Automatic and manual mounting presses for consistent results with nickel alloys"
              />

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Avoid rapid cooling of mounted samples as this can cause cracking 
                  in both the mount and the sample, especially for superalloys.
                </p>
              </div>
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding</h2>
              <p>
                Progressive grinding is essential for nickel alloys. These materials work-harden easily, so 
                consistent pressure and proper grit progression are critical.
              </p>

              <h3>Grinding Sequence</h3>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage - 2-3 minutes per sample</li>
                <li><strong>240 grit:</strong> Remove 120 grit scratches - 2-3 minutes</li>
                <li><strong>400 grit:</strong> Further refinement - 2-3 minutes</li>
                <li><strong>600 grit:</strong> Fine grinding - 2-3 minutes</li>
                <li><strong>800 grit:</strong> Optional for superalloys - 2 minutes</li>
              </ol>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/abrasive grinding-SiC papers.webp"
                    alt="Silicon carbide grinding papers for nickel alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (120, 240, 400, 600, 800) for progressive grinding. Rotate sample 90° between each grit to ensure complete scratch removal.</p>
              </div>

              <h3>Grinding Parameters</h3>
              <ul>
                <li><strong>Pressure:</strong> Light to moderate (2-5 lbs per sample)</li>
                <li><strong>Rotation:</strong> Rotate sample 90° between each grit</li>
                <li><strong>Water Flow:</strong> Continuous water flow to remove debris and prevent loading</li>
                <li><strong>Speed:</strong> 240-300 RPM for grinding wheels</li>
              </ul>

              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Premium SiC papers in all grit sizes for consistent grinding of nickel alloys"
              />

              <div className="bg-gray-50 p-4 my-6 rounded">
                <h4 className="font-semibold mb-2">Grinding Tips for Nickel Alloys</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                    <li> Use fresh grinding papers - nickel alloys can quickly load papers</li>
                    <li> Maintain consistent pressure throughout each step</li>
                    <li> Ensure all scratches from previous grit are removed before proceeding</li>
                    <li> For superalloys, consider using SiC papers up to 1200 grit</li>
                </ul>
              </div>
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing</h2>
              <p>
                Diamond polishing is essential for nickel alloys. These materials require extended polishing times 
                and careful attention to avoid introducing deformation or pullout of hard phases.
              </p>

              <h3>Diamond Polishing Sequence</h3>
              <ol>
                <li><strong>9 μm diamond:</strong> 5-8 minutes on hard cloth (Texmet or equivalent)</li>
                <li><strong>6 μm diamond:</strong> 4-6 minutes on medium-hard cloth</li>
                <li><strong>3 μm diamond:</strong> 4-6 minutes on medium cloth</li>
                <li><strong>1 μm diamond:</strong> 3-5 minutes on soft cloth</li>
                <li><strong>Final polish:</strong> 0.05 μm colloidal silica or 0.3 μm alumina - 2-4 minutes</li>
              </ol>

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
                      alt="Polycrystalline diamond polishing compound for nickel alloys"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides aggressive cutting action ideal for hard nickel alloys and superalloys.</p>
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
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages. Select pad hardness based on nickel alloy and polishing stage.</p>
                </div>
              </div>

              <h3>Polishing Parameters</h3>
              <ul>
                <li><strong>Pressure:</strong> Light pressure (2-4 lbs) - avoid excessive pressure</li>
                <li><strong>Speed:</strong> 120-150 RPM for diamond polishing</li>
                <li><strong>Lubricant:</strong> Diamond suspension in water or oil-based lubricant</li>
                <li><strong>Cloth Selection:</strong> Harder cloths for coarse steps, softer for fine steps</li>
              </ul>

              <ProductLink 
                productName="Diamond Abrasives"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond polishing compounds in various particle sizes for nickel alloys"
              />
              <ProductLink 
                productName="Polishing Pads"
                href="https://shop.metallographic.com/collections/polishing-pads"
                description="Premium polishing pads for different polishing stages of nickel alloys"
              />

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Superalloy Consideration:</strong> Nickel superalloys with gamma prime (γ') precipitates 
                  require careful polishing to avoid pullout. Use light pressure and extend polishing times at 
                  each step. Final polish with colloidal silica is essential to reveal fine precipitates.
                </p>
              </div>

              <h3>Final Polishing</h3>
              <p>
                For nickel alloys, especially superalloys, final polishing with colloidal silica (0.05 μm) or 
                fine alumina (0.3 μm) is critical. This step removes any remaining deformation and reveals the 
                true microstructure including fine precipitates.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/final-polishing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/final-polishing-coloidal-silica.webp"
                    alt="Colloidal silica for final polishing of nickel alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Colloidal silica (0.05 μm) is essential for final polishing of nickel superalloys to reveal fine precipitates like gamma prime (γ') without pullout.</p>
              </div>
            </section>

            <section id="etching" className="scroll-mt-24">
              <h2>Etching</h2>
              <p>
                Nickel alloys require specific etchants depending on the alloy composition and the features you 
                want to reveal. Common etchants include Glyceregia, Aqua Regia, and various electrolytic solutions.
              </p>

              <h3>Common Etchants for Nickel Alloys</h3>
              
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Etchant</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Composition</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Application</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2"><strong>Glyceregia</strong></td>
                      <td className="border border-gray-300 px-4 py-2">15 mL HCl, 10 mL glycerol, 5 mL HNO₃</td>
                      <td className="border border-gray-300 px-4 py-2">General nickel alloys, grain boundaries</td>
                      <td className="border border-gray-300 px-4 py-2">10-30 sec</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2"><strong>Aqua Regia</strong></td>
                      <td className="border border-gray-300 px-4 py-2">3 parts HCl, 1 part HNO₃</td>
                      <td className="border border-gray-300 px-4 py-2"><MaterialTooltip materialName="Inconel 718">Inconel</MaterialTooltip>, <MaterialTooltip materialName="Hastelloy C-276">Hastelloy</MaterialTooltip></td>
                      <td className="border border-gray-300 px-4 py-2">5-15 sec</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2"><strong>Kalling's No. 2</strong></td>
                      <td className="border border-gray-300 px-4 py-2">5 g CuCl₂, 100 mL HCl, 100 mL ethanol</td>
                      <td className="border border-gray-300 px-4 py-2">Grain boundaries, general structure</td>
                      <td className="border border-gray-300 px-4 py-2">10-60 sec</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2"><strong>Electrolytic (10% Oxalic)</strong></td>
                      <td className="border border-gray-300 px-4 py-2">10% oxalic acid in water</td>
                      <td className="border border-gray-300 px-4 py-2">Superalloys, gamma prime</td>
                      <td className="border border-gray-300 px-4 py-2">5-10 sec @ 6V</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/etchants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/etching.webp"
                    alt="Etching solutions and reagents for nickel alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for nickel alloys. Common etchants include Glyceregia, Aqua Regia, Kalling's No. 2, and electrolytic solutions. Etching time typically ranges from 5-60 seconds depending on the etchant and alloy composition.</p>
              </div>

              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry before etching</li>
                <li>Apply etchant using cotton swab or immerse sample</li>
                <li>Agitate gently if using swab method</li>
                <li>Monitor etching progress - nickel alloys can over-etch quickly</li>
                <li>Rinse immediately with water, then ethanol</li>
                <li>Dry with compressed air or warm air stream</li>
              </ol>

              <ProductLink 
                productName="Etching Solutions"
                href="https://shop.metallographic.com/collections/etchants"
                description="Etching solutions and reagents for nickel alloys and superalloys"
              />

              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                <p className="text-sm text-red-900">
                  <strong>Safety Warning:</strong> Many nickel alloy etchants contain strong acids and are highly 
                  corrosive. Always use appropriate personal protective equipment including gloves, safety glasses, 
                  and work in a well-ventilated area or fume hood.
                </p>
              </div>

              <h3>Alloy-Specific Etching</h3>
              <ul>
                <li><strong><MaterialTooltip materialName="Inconel 718">Inconel 718</MaterialTooltip>:</strong> Glyceregia or electrolytic oxalic acid</li>
                <li><strong><MaterialTooltip materialName="Hastelloy C-276">Hastelloy C-276</MaterialTooltip>:</strong> Aqua Regia or Glyceregia</li>
                <li><strong>Monel:</strong> Ferric chloride solution or Kalling's No. 2</li>
                <li><strong>Superalloys with γ':</strong> Electrolytic etching often required to reveal fine precipitates</li>
              </ul>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              
              <h3>Common Issues and Solutions</h3>
              
              <div className="space-y-4 my-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem: Excessive Deformation</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Symptoms:</strong> Smearing, distorted microstructure, difficulty revealing grain boundaries
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Solutions:</strong> Reduce cutting speed, use lighter grinding/polishing pressure, extend 
                    polishing times, ensure proper grit progression
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem: Pullout of Hard Phases</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Symptoms:</strong> Holes or pits in the surface, missing carbides or precipitates
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Solutions:</strong> Use lighter polishing pressure, extend polishing times, use softer 
                    polishing cloths for final steps, consider vibratory polishing for superalloys
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem: Over-Etching</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Symptoms:</strong> Dark, obscured microstructure, excessive relief
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Solutions:</strong> Reduce etching time, use weaker etchant concentration, rinse immediately 
                    after etching, re-polish and re-etch if necessary
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem: Incomplete Etching</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Symptoms:</strong> No contrast, grain boundaries not visible, flat appearance
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Solutions:</strong> Increase etching time, try different etchant, ensure sample is clean, 
                    check etchant freshness, consider electrolytic etching for difficult alloys
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Need More Help?</h3>
              <p className="text-gray-600 mb-4">
                Explore our other guides or use our tools to find the right products and procedures for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/guides" className="btn-primary text-center">
                  Browse All Guides
                </Link>
                <Link href="/etchants" className="btn-secondary text-center">
                  Find Etchants
                </Link>
                <Link href="/tools/etchant-selector" className="btn-tertiary text-center">
                  Etchant Selector Tool
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

