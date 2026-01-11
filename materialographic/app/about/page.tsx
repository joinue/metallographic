import type { Metadata } from 'next'
import Image from 'next/image'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import Link from 'next/link'
import { ChevronRight, Award, Users, BookOpen, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About PACE Technologies - Metallographic Equipment & Sample Preparation',
  description: 'Learn about PACE Technologies, a family-owned company founded in 1997 by Dr. Donald and Cathy Zipperian. We provide metallographic equipment, consumables, and expert knowledge to laboratories worldwide. Recipient of the Presidential "E" Award for excellence in exporting.',
  keywords: [
    'PACE Technologies',
    'about PACE Technologies',
    'metallographic equipment',
    'metallographic consumables',
    'sample preparation equipment',
    'Donald Zipperian',
    'Cathy Zipperian',
    'metallography company',
    'Presidential E Award',
    'metallographic laboratory equipment',
  ],
  openGraph: {
    title: 'About PACE Technologies - Metallographic Equipment & Sample Preparation',
    description: 'Learn about PACE Technologies, a family-owned company providing metallographic equipment and consumables to laboratories worldwide since 1997.',
    url: 'https://materialographic.com/about',
    siteName: 'Materialographic.com',
    images: [
      {
        url: '/images/pace/materialographic-logo.png',
        width: 1200,
        height: 630,
        alt: 'PACE Technologies - Metallographic Equipment and Consumables',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PACE Technologies',
    description: 'Learn about PACE Technologies, a family-owned company providing metallographic equipment and consumables since 1997.',
    images: ['/images/pace/materialographic-logo.png'],
  },
  alternates: {
    canonical: 'https://materialographic.com/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function AboutPage() {
  // Structured Data for SEO
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PACE Technologies',
    url: 'https://metallographic.com',
    description: 'PACE Technologies is a family-owned company providing metallographic equipment and consumables to laboratories worldwide. Founded in 1997, we specialize in sample preparation equipment, consumables, and expert technical support.',
    logo: {
      '@type': 'ImageObject',
      url: 'https://materialographic.com/images/pace/materialographic-logo.png',
      contentUrl: 'https://materialographic.com/images/pace/materialographic-logo.png',
      width: 512,
      height: 512,
    },
    founder: [
      {
        '@type': 'Person',
        name: 'Donald Zipperian',
        honorificSuffix: 'PhD',
        jobTitle: 'Co-Founder',
      },
      {
        '@type': 'Person',
        name: 'Cathy Zipperian',
        jobTitle: 'Co-Founder',
      },
    ],
    foundingDate: '1997',
    award: 'Presidential "E" Award (2015)',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: [
      'https://metallographic.com',
      'https://shop.metallographic.com',
      'https://metallographic.com/equipment',
    ],
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://materialographic.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://materialographic.com/about',
      },
    ],
  }

  const aboutPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'PACE Technologies',
      description: 'PACE Technologies is a family-owned company founded in 1997, providing metallographic equipment and consumables to laboratories worldwide.',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageStructuredData) }}
      />
      <div className="py-12">
        <div className="container-custom">
        {/* Header Section */}
        <AnimateOnScroll animation="fadeInUp" duration={500} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">About PACE Technologies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A family-owned company providing metallographic equipment and consumables to laboratories worldwide 
            since 1997. Committed to advancing the field of metallographic sample preparation.
          </p>
        </AnimateOnScroll>

        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <AnimateOnScroll animation="fadeInUp" delay={50} duration={500}>
              <div className="card">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Founded in 1997 by Dr. Donald and Cathy Zipperian, PACE Technologies began as a small project 
                    in the Zipperian family's home (office in the basement, warehouse in the garage!). They were 
                    driven by a passion for advancing metallographic sample preparation after years in the industry.
                  </p>
                  <p className="mb-4">
                    Over the years, our dedication to quality and service became growth, helping us earn the 
                    Presidential "E" Award in 2015 for contributing to the growth of U.S. exports.
                  </p>
                  <p>
                    As a fully family-owned and operated company, we continue to provide reliable, 
                    high-quality metallographic equipment and consumables that support laboratories and researchers 
                    around the world. Our commitment remains rooted in helping customers achieve consistent, 
                    accurate results in metallography and microstructural analysis.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="lg:col-span-1">
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={500}>
              <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Presidential "E" Award</p>
                      <p className="text-sm text-gray-600">Recognized for excellence in exporting (2015)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Family Owned</p>
                      <p className="text-sm text-gray-600">Founded in 1997 by Dr. Donald and Cathy Zipperian</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Global Reach</p>
                      <p className="text-sm text-gray-600">Serving laboratories worldwide with quality equipment</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Founders Section */}
        <AnimateOnScroll animation="fadeInUp" delay={150} duration={500} className="mb-16">
          <div className="card bg-gray-50 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Founders</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Dr. Donald Zipperian brings extensive experience in metallography, having worked with 
                    industry leaders like Buehler before founding PACE Technologies. Together with Cathy 
                    Zipperian, they built the company on a foundation of technical expertise, quality, 
                    and commitment to the metallography community.
                  </p>
                  <p>
                    Their vision was to create a company that not only provided high-quality equipment 
                    and consumables but also supported laboratories with expert knowledge and technical 
                    guidance. This commitment to excellence has been the driving force behind PACE 
                    Technologies' growth and success.
                  </p>
                </div>
              </div>
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/donz.jpg"
                  alt="Donald Zipperian PhD, founder of PACE Technologies, who also worked with Buehler"
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={70}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Location Section */}
        <AnimateOnScroll animation="fadeInUp" delay={200} duration={500} className="mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Based in Tucson, Arizona</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              PACE Technologies is proudly based in Tucson, Arizona. From our facility in the heart of the 
              Sonoran Desert, we serve laboratories and researchers around the world. As a family-owned 
              and operated company, we're deeply rooted in the Tucson community and committed to 
              supporting the local economy while serving the international metallography community.
            </p>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/pace/building banner.jpg"
                alt="PACE Technologies facility in Tucson, Arizona"
                fill
                className="object-contain object-center"
                loading="lazy"
                quality={80}
                sizes="100vw"
              />
            </div>
          </div>
        </AnimateOnScroll>

        {/* Values Section */}
        <AnimateOnScroll animation="fadeInUp" delay={250} duration={500} className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">What We Stand For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality & Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards in our equipment and consumables, ensuring that every 
                product meets rigorous quality requirements. Our commitment to excellence has been 
                recognized through industry awards and customer trust.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Customer Support</h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to supporting our customers with expert technical guidance, comprehensive 
                resources, and responsive service. Whether you're setting up a new lab or need troubleshooting 
                assistance, we're here to help.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                As a family-owned business, we understand the importance of building lasting relationships 
                with the global metallography community. We're dedicated to advancing the field and 
                supporting practitioners at all levels.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Call to Action Section */}
        <AnimateOnScroll animation="fadeInUp" delay={300} duration={500}>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 text-center border border-primary-200">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Work With Us?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore our equipment and consumables, or get in touch to discuss your laboratory needs. 
              We're here to help you achieve consistent, accurate results in metallographic sample preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://metallographic.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Visit Our Main Site
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/quote" 
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Request a Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/contact" 
                className="btn-tertiary inline-flex items-center justify-center gap-2"
              >
                Contact Us
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
    </>
  )
}

