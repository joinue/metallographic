import Link from 'next/link'
import Image from 'next/image'
import CTA from '@/components/CTA'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import FAQAccordion from '@/components/FAQAccordion'
import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metallography Resources: Sample Preparation Guides, Procedures & Reference Materials',
  description: 'Comprehensive metallography resources for sample preparation. Technical guides covering sectioning, mounting, grinding, polishing, and etching procedures. Material-specific protocols for carbon steel, stainless steel, aluminum, titanium, nickel alloys, copper, ceramics, composites, and more. Free metallographic analysis resources, ASTM standards, troubleshooting guides, and preparation checklists.',
  keywords: [
    'metallography', 'metallographic sample preparation', 'metallurgical analysis', 'microstructural analysis',
    'sample preparation', 'metallographic techniques', 'grinding techniques', 'polishing methods', 'etching procedures',
    'stainless steel preparation', 'aluminum sample preparation', 'titanium preparation', 'carbon steel preparation',
    'nickel alloy preparation', 'ceramic preparation', 'composite preparation', 'metallographic mounting',
    'sectioning techniques', 'metallographic polishing', 'metallographic etching', 'ASTM metallography standards',
    'metallographic consumables', 'metallographic equipment', 'grain size analysis', 'microstructure examination',
    'metallographic troubleshooting', 'sample preparation guide', 'metallography procedures', 'metallographic best practices'
  ],
  openGraph: {
    title: 'Metallography Resources: Sample Preparation Guides, Procedures & Reference Materials',
    description: 'Comprehensive metallography resources for sample preparation. Technical guides covering sectioning, mounting, grinding, polishing, and etching procedures. Material-specific protocols for steels, aluminum, titanium, ceramics, and composites.',
    url: 'https://metallography.org',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Metallography.org - Free Metallographic Sample Preparation Resources',
      },
      // White logo variant for dark backgrounds (platforms may choose based on context)
      {
        url: '/logo-white.png',
        width: 1200,
        height: 630,
        alt: 'Metallography.org - Free Metallographic Sample Preparation Resources',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metallography Resources: Sample Preparation Guides & Procedures',
    description: 'Technical guides and procedures for metallographic sample preparation. Material-specific protocols, ASTM standards, and troubleshooting resources.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org',
  },
}

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Metallography.org',
    url: 'https://metallography.org',
    description: 'Free educational resources, guides, and best practices for metallographic sample preparation',
    logo: {
      '@type': 'ImageObject',
      url: 'https://metallography.org/logo.png',
      contentUrl: 'https://metallography.org/logo.png',
      width: 512,
      height: 512,
    },
    founder: {
      '@type': 'Organization',
      name: 'Metallography.org',
    },
    sameAs: [
      'https://shop.metallographic.com',
      'https://metallographic.com/equipment',
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Metallographic Sample Preparation Resources',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Stainless Steel Preparation Guide',
            url: 'https://metallography.org/guides/stainless-steel-preparation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Aluminum Sample Preparation Guide',
            url: 'https://metallography.org/guides/aluminum-sample-preparation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Grinding Techniques Guide',
            url: 'https://metallography.org/guides/grinding-techniques',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Polishing Methods Guide',
            url: 'https://metallography.org/guides/polishing-methods',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Etching Procedures Guide',
            url: 'https://metallography.org/guides/etching-procedures',
          },
        },
      ],
    },
  }

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
    ],
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Metallography.org',
    url: 'https://metallography.org',
    description: 'Free metallography resources, guides, and reference materials for sample preparation and microstructural analysis',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://metallography.org/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is metallography?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Metallography is the scientific study and analysis of the microstructure of metals and alloys. It involves preparing samples through sectioning, mounting, grinding, polishing, and etching, then examining them under a microscope to reveal grain structure, phases, inclusions, and other microstructural features that determine material properties.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the steps in metallographic sample preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Metallographic sample preparation typically involves five main steps: 1) Sectioning - cutting the sample to size, 2) Mounting - embedding in resin for handling, 3) Grinding - removing sectioning damage with progressively finer abrasives, 4) Polishing - achieving a scratch-free surface using diamond or oxide abrasives, and 5) Etching - applying chemical reagents to reveal microstructural features.',
        },
      },
      {
        '@type': 'Question',
        name: 'What materials can be prepared for metallographic analysis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Metallographic preparation techniques apply to metals and alloys (steels, aluminum, titanium, nickel alloys, copper, brass), ceramics, composites, and other engineering materials. Each material type requires specific preparation protocols, etchant selection, and handling procedures to reveal accurate microstructural information.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the purpose of etching in metallography?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Etching in metallography uses chemical reagents to selectively attack different phases and grain boundaries in the material, creating contrast that reveals microstructural features under optical or electron microscopy. Different etchants are used depending on the material composition and the specific features to be examined.',
        },
      },
      {
        '@type': 'Question',
        name: 'What ASTM standards apply to metallographic sample preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Key ASTM standards for metallographic preparation include ASTM E3 (specimen preparation), ASTM E407 (etching procedures), ASTM E112 (grain size determination), ASTM E883 (reflected light microscopy), and material-specific standards. These provide standardized procedures for consistent, reproducible results.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does metallographic sample preparation take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Preparation time varies by material and complexity. Simple samples may take 30-60 minutes, while complex materials or multiple samples can take 2-4 hours. Sectioning takes 5-15 minutes, mounting 15-30 minutes (if using hot mounting), grinding 10-20 minutes per grit size, polishing 15-30 minutes per step, and etching 5-30 seconds to several minutes depending on the material and etchant.',
        },
      },
      {
        '@type': 'Question',
        name: 'What equipment is needed for metallographic sample preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Essential equipment includes: sectioning equipment (abrasive cut-off saw or precision saw), mounting press (hot or cold mounting), grinding/polishing machine with variable speed, microscope for examination, and safety equipment. Consumables include grinding papers (120-1200 grit), diamond abrasives (6μm to 0.25μm), polishing cloths, mounting resins, and etchants specific to the material being analyzed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between grinding and polishing in metallography?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grinding uses coarse abrasives (typically 120-1200 grit silicon carbide) to remove sectioning damage and achieve flatness. Polishing uses fine abrasives (diamond paste 6μm to 0.25μm or colloidal silica) to eliminate scratches and achieve a mirror-like, scratch-free surface suitable for microstructural examination. Grinding is a material removal process, while polishing is a surface refinement process.',
        },
      },
    ],
  }

  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Prepare Metallographic Samples',
    description: 'Step-by-step guide to preparing samples for metallographic analysis through sectioning, mounting, grinding, polishing, and etching',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Sectioning',
        text: 'Cut the sample to appropriate size using abrasive cut-off wheels or precision saws while minimizing thermal and mechanical damage. Use proper cooling and cutting speeds to prevent sample alteration.',
        image: 'https://metallography.org/images/consumables/grinding & lapping-cover.webp',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Mounting',
        text: 'Embed samples in thermosetting or thermoplastic resins for handling, edge retention, and protection of delicate features. Hot mounting provides better edge retention, while cold mounting is suitable for temperature-sensitive materials.',
        image: 'https://metallography.org/images/consumables/grinding & lapping-cover.webp',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Grinding',
        text: 'Remove sectioning damage and achieve flatness using progressively finer silicon carbide or aluminum oxide abrasives, typically starting at 120 grit and progressing through 240, 320, 400, 600, and 1200 grit. Ensure uniform scratch pattern in one direction before proceeding.',
        image: 'https://metallography.org/images/consumables/grinding & lapping-cover.webp',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Polishing',
        text: 'Eliminate scratches and achieve a mirror-like surface using diamond abrasives (6μm to 0.25μm) or colloidal silica on appropriate polishing cloths. Use progressively finer abrasives and ensure complete removal of previous step scratches.',
        image: 'https://metallography.org/images/consumables/rough polishing-cover.png',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Etching',
        text: 'Apply chemical reagents (such as nital, picral, or material-specific etchants) to reveal grain boundaries, phases, and microstructural features through selective attack. Etching time varies by material and etchant concentration.',
        image: 'https://metallography.org/images/consumables/etching.webp',
      },
    ],
  }

  const collectionPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Metallography Resources',
    description: 'Comprehensive collection of metallographic sample preparation guides, procedures, tools, and reference materials',
    url: 'https://metallography.org',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Course',
            name: 'Metallographic Sample Preparation Guides',
            url: 'https://metallography.org/guides',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Metallography Tools and Calculators',
            url: 'https://metallography.org/tools',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Article',
            name: 'Metallography Reference Materials',
            url: 'https://metallography.org/resources',
          },
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
      />
      <div className="-mt-24">
      {/* Hero Section with Background */}
      <section className="relative min-h-[100vh] sm:min-h-[100vh] flex items-center pt-24 pb-12 sm:pb-20 overflow-hidden">
        {/* Background Image with Overlay - extends to cover header area */}
        <div className="absolute -top-24 left-0 right-0 bottom-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/microstructures/AlON, as-polished, sputter coated, 200X.JPG"
              alt="AlON aluminum oxynitride ceramic microstructure at 200X magnification showing metallographic sample preparation results, sputter coated, as-polished surface"
              title="AlON ceramic microstructure - metallographic sample preparation background"
              fill
              className="object-cover object-center"
              priority
              quality={50}
              sizes="100vw"
              style={{ objectPosition: 'center 30%' }}
              fetchPriority="high"
            />
            {/* Shadow Overlay for Text Visibility - very subtle fade at bottom */}
            <div className="absolute inset-0" style={{ 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.60) 75%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.45) 92%, rgba(0,0,0,0.30) 96%, rgba(0,0,0,0.15) 98%, transparent 100%)'
            }}></div>
            {/* Fade background image to white at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ 
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.6) 80%, white 100%)'
            }}></div>
          </div>
        </div>
        
        <div className="container-custom relative z-10 w-full flex items-center min-h-[calc(100vh-6rem)] pt-12 pb-16 sm:pt-16 sm:pb-24" style={{ marginTop: '-2rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start w-full">
            <AnimateOnScroll animation="fadeInUp" duration={800} threshold={0}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-lg">
                Metallography: Sample Preparation Guides & Procedures
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 sm:mb-12 leading-relaxed drop-shadow-md">
                Technical guides, procedures, and reference materials for metallographic sample preparation. 
                From sectioning and mounting to polishing and etching.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                <CTA href="/guides" variant="primary" className="no-underline focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Browse Guides
                </CTA>
                <CTA href="/resources" variant="secondary" className="no-underline focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  View Resources
                </CTA>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeInUp" duration={800} className="hidden lg:block">
              <div className="relative w-full">
                {/* Browser Window Frame */}
                <div className="bg-gray-100 rounded-t-lg border border-gray-300 shadow-2xl overflow-hidden">
                  {/* Browser Title Bar */}
                  <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                    {/* Traffic Light Dots (macOS style) */}
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    {/* Address Bar */}
                    <div className="flex-1 mx-4 bg-gray-50 rounded-md px-4 py-1.5 border border-gray-200 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-xs text-gray-600 font-medium flex-1">metallography.org/guides</span>
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  {/* Browser Content */}
                  <div className="relative bg-white">
                    <Image
                      src="/images/webpage-snaps/guides-page.png"
                      alt="Metallography guides page preview showing sample preparation guides, material-specific procedures, grinding polishing etching techniques, and metallographic resources"
                      title="Metallography guides page interface preview"
                      width={800}
                      height={475}
                      className="w-full h-auto"
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 1024px) 0px, (max-width: 1280px) 600px, 800px"
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* What is Metallography Section - SEO & AI Training */}
      <article className="py-12 sm:py-20">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll animation="fadeInUp" duration={700} className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What is Metallography?</h2>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    <strong>Metallography</strong> is the scientific study and analysis of the <strong>microstructure</strong> of metals, alloys, ceramics, and composite materials. 
                    Through systematic sample preparation and microscopic examination, it reveals grain boundaries, phases, inclusions, and defects that determine material properties.
                  </p>
                  <p className="text-base text-gray-600">
                    Essential for quality control, failure analysis, and materials research across aerospace, automotive, medical devices, energy, and additive manufacturing industries.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt="Ferrite and pearlite microstructure in steel showing metallographic sample preparation results"
                  title="Ferrite and pearlite microstructure in steel - metallographic sample preparation example"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Sample Preparation Steps - Visual Cards */}
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={600} className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Five-Step Preparation Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <AnimateOnScroll animation="scaleIn" delay={50} duration={500}>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col">
                    <div className="text-2xl font-bold text-primary-600 mb-2">1</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sectioning</h4>
                    <p className="text-sm text-gray-600">Cut sample to size with minimal damage</p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="scaleIn" delay={100} duration={500}>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col">
                    <div className="text-2xl font-bold text-primary-600 mb-2">2</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mounting</h4>
                    <p className="text-sm text-gray-600">Embed in resin for handling</p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="scaleIn" delay={150} duration={500}>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col">
                    <div className="text-2xl font-bold text-primary-600 mb-2">3</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Grinding</h4>
                    <p className="text-sm text-gray-600">Remove damage with progressive abrasives</p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="scaleIn" delay={200} duration={500}>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col">
                    <div className="text-2xl font-bold text-primary-600 mb-2">4</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Polishing</h4>
                    <p className="text-sm text-gray-600">Achieve scratch-free mirror surface</p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="scaleIn" delay={250} duration={500}>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col">
                    <div className="text-2xl font-bold text-primary-600 mb-2">5</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Etching</h4>
                    <p className="text-sm text-gray-600">Reveal microstructure with reagents</p>
                  </div>
                </AnimateOnScroll>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeIn" delay={300} duration={500} className="text-center">
              <p className="text-base text-gray-700 mb-4">
                Explore our <Link href="/guides" className="text-primary-600 hover:text-primary-700 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">preparation guides</Link>, 
                <Link href="/tools" className="text-primary-600 hover:text-primary-700 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"> reference tools</Link>, 
                <Link href="/standards" className="text-primary-600 hover:text-primary-700 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"> ASTM and ISO standards</Link>, and 
                <Link href="/resources" className="text-primary-600 hover:text-primary-700 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"> reference materials</Link> for detailed procedures.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </article>

      {/* Features Section */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <AnimateOnScroll animation="fadeInUp" duration={700} className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Sample Preparation Resources</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Step-by-step procedures, material-specific protocols, and technical references for metallographic analysis.
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={600}>
              <div className="card h-full flex flex-col">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/consumables/grinding & lapping-cover.webp"
                    alt="Silicon carbide grinding papers and lapping consumables for metallographic sample preparation, abrasive grit sizes for grinding procedures"
                    title="Grinding and lapping consumables for metallographic sample preparation"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Preparation Guides</h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                  Detailed procedures for sectioning, mounting, grinding, polishing, and etching. 
                  Material-specific protocols for steels, aluminum, titanium, ceramics, and composites.
                </p>
                <Link href="/guides" className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
                  Explore Guides
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={200} duration={600}>
              <div className="card h-full flex flex-col">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/webpage-snaps/grit-size-tool.png"
                    alt="Metallographic grit size converter tool showing FEPA, ANSI, JIS grit size conversion for grinding and polishing procedures in sample preparation"
                    title="Grit size converter tool for metallographic sample preparation"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Reference Tools</h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                  Grit size converters, polishing time calculators, etchant selectors, and material compatibility checkers. 
                  Quick access to ASTM standards and technical specifications.
                </p>
                <Link href="/tools" className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
                  Browse Tools
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={300} duration={600}>
              <div className="card h-full flex flex-col">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/expert-metallography.jpg"
                    alt="Metallography technician working with sample preparation equipment including grinding polishing machines for metallographic analysis"
                    title="Metallography expert using sample preparation equipment"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Reference Materials</h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                  Preparation checklists, troubleshooting guides, ASTM standard references, and safety data sheets. 
                  Documentation for quality control and procedure verification.
                </p>
                <Link href="/resources" className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
                  View Resources
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <AnimateOnScroll animation="fadeInUp" duration={700} className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Popular Guides</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Essential guides covering material-specific preparation and fundamental techniques
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimateOnScroll animation="scaleIn" delay={50} duration={500}>
              <Link href="/guides/stainless-steel-preparation" className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary-400 hover:shadow-md group block">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG"
                    alt="431 stainless steel microstructure at 400X magnification showing grain structure after metallographic sample preparation with Kallings no. 2 etchant"
                    title="431 stainless steel microstructure - metallographic preparation example"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">Stainless Steel Preparation</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Complete guide to preparing stainless steel samples for metallographic analysis, including sectioning, mounting, and etching techniques.
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="scaleIn" delay={100} duration={500}>
              <Link href="/guides/aluminum-sample-preparation" className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary-400 hover:shadow-md group block">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/microstructures/6061-Aluminum.jpg"
                    alt="6061 aluminum alloy microstructure showing grain boundaries and precipitates from metallographic sample preparation and etching procedures"
                    title="6061 aluminum alloy microstructure - metallographic analysis example"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">Aluminum Sample Preparation</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Best practices for preparing aluminum samples without smearing or deformation, ensuring accurate microstructural analysis.
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="scaleIn" delay={150} duration={500}>
              <Link href="/resources/troubleshooting-guide" className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary-400 hover:shadow-md group block">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/microstructures/Inclusion-oxide-2.jpg"
                    alt="Oxide inclusions in steel microstructure showing common metallographic sample preparation issues and defects in microstructural analysis"
                    title="Oxide inclusions in steel - metallographic defect analysis"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">Troubleshooting Common Issues</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Solutions to common problems in metallographic sample preparation, from scratches to poor contrast.
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="scaleIn" delay={200} duration={500}>
              <Link href="/guides/grinding-techniques" className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary-400 hover:shadow-md group block">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/consumables/grinding & lapping-cover.webp"
                    alt="Silicon carbide grinding papers and abrasive consumables for metallographic sample preparation grinding procedures"
                    title="Grinding consumables for metallographic sample preparation"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">Grinding Techniques</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Grit progression, pressure application, and grinding procedures for removing sectioning damage and achieving flat surfaces.
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="scaleIn" delay={250} duration={500}>
              <Link href="/guides/polishing-methods" className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary-400 hover:shadow-md group block">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/consumables/rough polishing-cover.png"
                    alt="Diamond polishing paste, polishing cloths, and consumables for metallographic sample preparation polishing procedures"
                    title="Polishing consumables for metallographic sample preparation"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">Polishing Methods</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Diamond and oxide polishing procedures, cloth selection, and time parameters for achieving scratch-free surfaces.
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="scaleIn" delay={300} duration={500}>
              <Link href="/guides/etching-procedures" className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary-400 hover:shadow-md group block">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/consumables/etching.webp"
                    alt="Metallographic etchants and chemical reagents including nital picral for microstructural analysis and grain boundary revelation"
                    title="Metallographic etchants and chemical reagents"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">Etching Procedures</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Comprehensive guide to etching techniques, reagent selection, and application methods for various material systems.
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll animation="fadeIn" delay={350} duration={500} className="text-center mt-12">
            <Link href="/guides" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
              View All Guides
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Quick Links Section - SEO Enhancement */}
      <nav className="py-8 sm:py-12 border-t border-gray-200" aria-label="Quick navigation">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll animation="fadeIn" delay={100} duration={500}>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
                <Link href="/guides/stainless-steel-preparation" className="text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1">Stainless Steel Preparation</Link>
                <span className="text-gray-300" aria-hidden="true">•</span>
                <Link href="/guides/aluminum-sample-preparation" className="text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1">Aluminum Preparation</Link>
                <span className="text-gray-300" aria-hidden="true">•</span>
                <Link href="/guides/titanium-preparation" className="text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1">Titanium Preparation</Link>
                <span className="text-gray-300" aria-hidden="true">•</span>
                <Link href="/tools/grit-size-converter" className="text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1">Grit Size Converter</Link>
                <span className="text-gray-300" aria-hidden="true">•</span>
                <Link href="/tools/etchant-selector" className="text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1">Etchant Selector</Link>
                <span className="text-gray-300" aria-hidden="true">•</span>
                <Link href="/standards" className="text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1">ASTM Standards</Link>
                <span className="text-gray-300" aria-hidden="true">•</span>
                <Link href="/microstructures" className="text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1">Microstructure Gallery</Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </nav>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fadeInUp" duration={700} className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Common questions about metallography and sample preparation
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={600}>
              <FAQAccordion
                items={[
                  {
                    question: 'What is metallography?',
                    answer: 'Metallography is the scientific study and analysis of the microstructure of metals and alloys. It involves preparing samples through sectioning, mounting, grinding, polishing, and etching, then examining them under a microscope to reveal grain structure, phases, inclusions, and other microstructural features that determine material properties.',
                  },
                  {
                    question: 'What are the steps in metallographic sample preparation?',
                    answer: 'Metallographic sample preparation typically involves five main steps: 1) Sectioning - cutting the sample to size, 2) Mounting - embedding in resin for handling, 3) Grinding - removing sectioning damage with progressively finer abrasives, 4) Polishing - achieving a scratch-free surface using diamond or oxide abrasives, and 5) Etching - applying chemical reagents to reveal microstructural features.',
                  },
                  {
                    question: 'What materials can be prepared for metallographic analysis?',
                    answer: 'Metallographic preparation techniques apply to metals and alloys (steels, aluminum, titanium, nickel alloys, copper, brass), ceramics, composites, and other engineering materials. Each material type requires specific preparation protocols, etchant selection, and handling procedures to reveal accurate microstructural information.',
                  },
                  {
                    question: 'What is the purpose of etching in metallography?',
                    answer: 'Etching in metallography uses chemical reagents to selectively attack different phases and grain boundaries in the material, creating contrast that reveals microstructural features under optical or electron microscopy. Different etchants are used depending on the material composition and the specific features to be examined.',
                  },
                  {
                    question: 'What ASTM standards apply to metallographic sample preparation?',
                    answer: 'Key ASTM standards for metallographic preparation include ASTM E3 (specimen preparation), ASTM E407 (etching procedures), ASTM E112 (grain size determination), ASTM E883 (reflected light microscopy), and material-specific standards. These provide standardized procedures for consistent, reproducible results.',
                  },
                  {
                    question: 'How long does metallographic sample preparation take?',
                    answer: 'Preparation time varies by material and complexity. Simple samples may take 30-60 minutes, while complex materials or multiple samples can take 2-4 hours. Sectioning takes 5-15 minutes, mounting 15-30 minutes (if using hot mounting), grinding 10-20 minutes per grit size, polishing 15-30 minutes per step, and etching 5-30 seconds to several minutes depending on the material and etchant.',
                  },
                  {
                    question: 'What equipment is needed for metallographic sample preparation?',
                    answer: 'Essential equipment includes: sectioning equipment (abrasive cut-off saw or precision saw), mounting press (hot or cold mounting), grinding/polishing machine with variable speed, microscope for examination, and safety equipment. Consumables include grinding papers (120-1200 grit), diamond abrasives (6μm to 0.25μm), polishing cloths, mounting resins, and etchants specific to the material being analyzed.',
                  },
                  {
                    question: 'What is the difference between grinding and polishing in metallography?',
                    answer: 'Grinding uses coarse abrasives (typically 120-1200 grit silicon carbide) to remove sectioning damage and achieve flatness. Polishing uses fine abrasives (diamond paste 6μm to 0.25μm or colloidal silica) to eliminate scratches and achieve a mirror-like, scratch-free surface suitable for microstructural examination. Grinding is a material removal process, while polishing is a surface refinement process.',
                  },
                ]}
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <AnimateOnScroll animation="fadeInUp" duration={700} className="max-w-4xl mx-auto">
            <div className="card relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt="Metallographic sample background"
                  title="Ferrite-pearlite steel microstructure background"
                  fill
                  className="object-cover opacity-10"
                  loading="lazy"
                  quality={60}
                  sizes="(max-width: 768px) 100vw, 1280px"
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Metallographic Sample Preparation</h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4 text-gray-600 leading-relaxed">
                  Procedures, protocols, and technical references for preparing samples for microstructural analysis.
                </p>
                <p className="text-sm sm:text-base mb-8 sm:mb-10 text-gray-500">
                  All resources are free and available without registration
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link 
                    href="/guides" 
                    className="btn-primary"
                  >
                    Browse Guides
                  </Link>
                  <Link 
                    href="/resources" 
                    className="btn-secondary"
                  >
                    View Resources
                  </Link>
                  <Link 
                    href="/guides/equipment-overview" 
                    className="btn-tertiary"
                  >
                    Equipment Guide
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
    </>
  )
}

