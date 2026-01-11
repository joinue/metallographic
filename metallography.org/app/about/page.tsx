import type { Metadata } from 'next'
import Image from 'next/image'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import Link from 'next/link'
import { ChevronRight, Award, Users, BookOpen, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Metallography.org - Free Educational Resources for Sample Preparation',
  description: 'Learn about Metallography.org, a free educational service dedicated to advancing metallographic sample preparation. Founded by PACE Technologies, we provide comprehensive guides, tools, and expert knowledge to help laboratories, researchers, and students achieve consistent, accurate results in metallography and microstructural analysis.',
  keywords: [
    'about metallography.org',
    'metallography education',
    'PACE Technologies',
    'metallographic resources',
    'sample preparation education',
    'free metallography guides',
    'metallographic sample preparation',
    'microstructural analysis education',
    'metallography community',
    'Donald Zipperian',
    'Cathy Zipperian',
    'metallography training',
    'metallurgical analysis resources',
  ],
  openGraph: {
    title: 'About Metallography.org - Free Educational Resources for Sample Preparation',
    description: 'Learn about Metallography.org, a free educational service dedicated to advancing metallographic sample preparation. Founded by PACE Technologies, we provide comprehensive guides, tools, and expert knowledge.',
    url: 'https://metallography.org/about',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Metallography.org - Free Educational Resources for Metallographic Sample Preparation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Metallography.org - Free Educational Resources',
    description: 'Learn about Metallography.org, a free educational service dedicated to advancing metallographic sample preparation.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/about',
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
    '@type': 'EducationalOrganization',
    name: 'Metallography.org',
    url: 'https://metallography.org',
    description: 'Free educational resources, guides, and best practices for metallographic sample preparation. Learn techniques, troubleshooting tips, and access expert knowledge.',
    logo: {
      '@type': 'ImageObject',
      url: 'https://metallography.org/logo.png',
      contentUrl: 'https://metallography.org/logo.png',
      width: 512,
      height: 512,
    },
    founder: {
      '@type': 'Person',
      name: 'Marc Salerno',
      jobTitle: 'President',
      memberOf: {
        '@type': 'Organization',
        name: 'PACE Technologies',
      },
    },
    foundingDate: '1997',
    parentOrganization: {
      '@type': 'Organization',
      name: 'PACE Technologies',
      founder: [
        {
          '@type': 'Person',
          name: 'Donald Zipperian',
          honorificSuffix: 'PhD',
        },
        {
          '@type': 'Person',
          name: 'Cathy Zipperian',
        },
      ],
      foundingDate: '1997',
      award: 'Presidential "E" Award (2015)',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free educational resources for metallographic sample preparation',
    },
    sameAs: [
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
        item: 'https://metallography.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://metallography.org/about',
      },
    ],
  }

  const aboutPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Metallography.org',
      description: 'A free educational service dedicated to advancing metallographic sample preparation and helping the global metallography community achieve consistent, accurate results.',
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">About Metallography.org</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A free educational service dedicated to advancing metallographic sample preparation 
            and helping the global metallography community achieve consistent, accurate results.
          </p>
        </AnimateOnScroll>

        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <AnimateOnScroll animation="fadeInUp" delay={50} duration={500}>
              <div className="card">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Metallography.org was created as a service to the metallography community, 
                    driven by a passion for advancing metallographic sample preparation and helping 
                    spread good information throughout the field.
                  </p>
                  <p className="mb-4">
                    Our mission is to provide free, detailed, and reliable educational resources 
                    that support laboratories, researchers, and students around the world. We believe 
                    that access to quality information should be freely available to everyone working 
                    in metallography and microstructural analysis.
                  </p>
                  <p className="mb-4">
                    Through detailed guides, practical tools, reference materials, and expert knowledge, 
                    we aim to help practitioners at all levels achieve consistent, accurate results in 
                    their metallographic work. Whether you're preparing samples for quality control, 
                    research, or failure analysis, our resources are designed to support your success.
                  </p>
                  <p>
                    This platform is the brainchild of PACE Technologies President Marc Salerno, 
                    who envisioned a complete resource that would serve the entire metallography 
                    community, from students just getting started to experienced professionals 
                    seeking to refine their techniques.
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
                    <BookOpen className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Free Resources</p>
                      <p className="text-sm text-gray-600">All guides, tools, and materials are completely free to use</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Community Focused</p>
                      <p className="text-sm text-gray-600">Designed to serve the global metallography community</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Expert Knowledge</p>
                      <p className="text-sm text-gray-600">Content created by industry professionals with years of experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* PACE Technologies Connection Section */}
        <AnimateOnScroll animation="fadeInUp" delay={150} duration={500} className="mb-16">
          <div className="card bg-gray-50 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Rooted in Experience</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Metallography.org is supported by PACE Technologies, a family-owned company founded 
                    in 1997 by Dr. Donald and Cathy Zipperian. With decades of combined experience in 
                    metallographic sample preparation, PACE Technologies has established itself as a trusted 
                    provider of equipment and consumables used in laboratories worldwide.
                  </p>
                  <p className="mb-4">
                    PACE Technologies' commitment to advancing the field was recognized in 2015 when the 
                    company received the Presidential "E" Award for excellence in exporting U.S. products 
                    and services. This award reflects their dedication to supporting the global metallography 
                    community through quality equipment and technical expertise.
                  </p>
                  <p>
                    Metallography.org represents the next step in this commitment: sharing knowledge freely 
                    with the community. By providing comprehensive educational resources at no cost, we aim 
                    to help metallographers everywhere improve their techniques and achieve better results, 
                    regardless of their location or resources.
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

        {/* Values Section */}
        <AnimateOnScroll animation="fadeInUp" delay={200} duration={500} className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">What We Stand For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Education First</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe knowledge should be freely accessible. Our detailed guides and resources 
                are designed to help everyone, from beginners to experts, improve their metallographic skills.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality & Accuracy</h3>
              <p className="text-gray-600 leading-relaxed">
                Every resource is crafted with attention to detail and accuracy. We draw from industry 
                standards, best practices, and years of hands-on experience to provide reliable information.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Support</h3>
              <p className="text-gray-600 leading-relaxed">
                We're here to support the global metallography community. Whether you're troubleshooting 
                a problem or learning a new technique, we're committed to helping you succeed.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Call to Action Section */}
        <AnimateOnScroll animation="fadeInUp" delay={250} duration={500}>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 text-center border border-primary-200">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Explore Our Resources?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Discover detailed guides, practical tools, and expert knowledge to help you master 
              metallographic sample preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/guides" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Browse Guides
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/resources" 
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                View Resources
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

