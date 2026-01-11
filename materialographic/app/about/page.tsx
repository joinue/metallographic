import type { Metadata } from 'next'
import Image from 'next/image'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import Link from 'next/link'
import { ChevronRight, Award, Users, Heart } from 'lucide-react'

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

        {/* Company Overview with Stats */}
        <AnimateOnScroll animation="fadeInUp" delay={150} duration={500} className="mb-16">
          <div className="card bg-gray-50 border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Company Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Based in Tucson, Arizona, PACE Technologies remains a family-owned and operated company serving 
                  laboratories in over 50 countries. Our headquarters houses engineering, design, quality control, 
                  and business operations, all focused on delivering precision solutions for metallographic sample preparation.
                </p>
                <p>
                  Our dedication to quality and service earned us the Presidential "E" Award in 2015 for contributing 
                  to the growth of U.S. exports. This recognition reflects our commitment to supporting laboratories 
                  and researchers worldwide with reliable, high-quality equipment and consumables.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="card text-center bg-white">
                  <div className="text-4xl font-bold text-primary-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="card text-center bg-white">
                  <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </div>
                <div className="card text-center bg-white">
                  <div className="text-4xl font-bold text-primary-600 mb-2">2015</div>
                  <div className="text-sm text-gray-600">Presidential E Award</div>
                </div>
                <div className="card text-center bg-white">
                  <div className="text-2xl font-bold text-primary-600 mb-2">Family-Owned</div>
                  <div className="text-sm text-gray-600">Since 1997</div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Best-in-Class Section */}
        <AnimateOnScroll animation="fadeInUp" delay={200} duration={500} className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Best-in-Class</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What sets PACE Technologies apart in the metallography industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Products that Improve Lab Outcomes</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Intuitive user interfaces designed for efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>High-quality consumables that reduce rework</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Consistent value across all PACE products</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Complete solutions from sectioning to analysis</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Access to Experts</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Applications support from experienced metallographers</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Process optimization evaluations to save time and money</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Material-specific preparation guides and procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>One-on-one consultation for your unique challenges</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Peace of Mind</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Industry leader with over 25 years of experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Quick response time from knowledgeable staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Comprehensive training and support programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Reliable equipment backed by expert service</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Customer Showcase */}
        <AnimateOnScroll animation="fadeInUp" delay={250} duration={500} className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Trusted by Industry Leaders</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              PACE Technologies equipment and consumables are used by leading companies worldwide for quality control, 
              failure analysis, and materials research.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {['apple_no_bg', 'tesla_no_bg', 'medtronic_no_bg', 'seagate_no_bg', 'blue_origin_no_bg'].map((logo, index) => (
              <div key={logo} className="card flex items-center justify-center p-6 bg-white">
                <Image
                  src={`/images/customers/${logo}.webp`}
                  alt={logo.replace('_no_bg', '').replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  width={120}
                  height={60}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Customer Care Section */}
        <AnimateOnScroll animation="fadeInUp" delay={300} duration={500} className="mb-16">
          <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">PACE Customer Care</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-6">
              <p className="mb-4">
                We are not only experts in our field but also a strong business partner committed to excellent customer 
                support. It is easy to do business with PACE because our people and our processes are set up for your success.
              </p>
              <p>
                We have hassle-free ordering and investment in inventory to keep our customer's operations running smoothly, 
                but most importantly we have a customer-focused culture filled with people who believe in service as a priority.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/support" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Contact Customer Care
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/contact" 
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Contact PACE
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </AnimateOnScroll>

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

        {/* Location & Facility Section */}
        <AnimateOnScroll animation="fadeInUp" delay={350} duration={500} className="mb-16">
          <div className="card bg-gray-50 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Facility</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Located in the heart of Tucson, Arizona, our headquarters houses our engineering, design, 
                    quality control, and business operations. Our facility is focused on product development, 
                    testing, and customer support.
                  </p>
                  <p className="mb-4">
                    We welcome customers to visit our facility to see our equipment in action, meet our team, 
                    and discuss your specific metallographic needs.
                  </p>
                  <p className="mb-6">
                    <strong>Schedule a visit:</strong> Contact us to arrange a tour of our facility, see our 
                    equipment demonstrations, or discuss custom solutions for your laboratory.
                  </p>
                  <Link 
                    href="/contact" 
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    Schedule a Visit
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/pace_hq_landscape.webp"
                  alt="PACE Technologies Headquarters in Tucson, Arizona"
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
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

        {/* Contact Section */}
        <AnimateOnScroll animation="fadeInUp" delay={400} duration={500} className="mb-16">
          <div className="card">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact PACE Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Get in Touch</h3>
                <address className="not-italic text-gray-700 leading-relaxed mb-4">
                  <strong className="text-gray-900">PACE Technologies</strong><br />
                  3601 E. 34th Street<br />
                  Tucson, AZ 85713<br />
                  United States
                </address>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-2">
                    <strong className="text-gray-900">Phone:</strong>{' '}
                    <a href="tel:+15208826598" className="text-primary-600 hover:text-primary-700">
                      +1-520-882-6598
                    </a>
                  </p>
                  <p>
                    <strong className="text-gray-900">Email:</strong>{' '}
                    <a href="mailto:pace@metallographic.com" className="text-primary-600 hover:text-primary-700">
                      pace@metallographic.com
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Quick Actions</h3>
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/quote" 
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    Request a Quote
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/contact" 
                    className="btn-secondary inline-flex items-center justify-center gap-2"
                  >
                    Contact Form
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="https://metallographic.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tertiary inline-flex items-center justify-center gap-2"
                  >
                    Visit Our Main Site
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Call to Action Section */}
        <AnimateOnScroll animation="fadeInUp" delay={450} duration={500}>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 text-center border border-primary-200">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Work With Us?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore our equipment and consumables, or get in touch to discuss your laboratory needs. 
              We're here to help you achieve consistent, accurate results in metallographic sample preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/equipment" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Browse Equipment
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

