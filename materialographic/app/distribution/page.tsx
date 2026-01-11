import type { Metadata } from 'next'
import Image from 'next/image'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import Link from 'next/link'
import { ChevronRight, Globe, Users, Handshake, MapPin, Mail, Phone, ExternalLink, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'International Distribution Network - PACE Technologies',
  description: 'Join PACE Technologies\' global distribution network or find your local distributor. We partner with trusted distributors worldwide to bring precision metallographic equipment and consumables to laboratories globally.',
  keywords: [
    'PACE Technologies distributor',
    'international distribution',
    'metallographic equipment distributor',
    'become a distributor',
    'find local distributor',
    'PACE Technologies partners',
    'global distribution network',
  ],
  openGraph: {
    title: 'International Distribution Network - PACE Technologies',
    description: 'Join PACE Technologies\' global distribution network or find your local distributor for precision metallographic equipment and consumables.',
    url: 'https://materialographic.com/distribution',
    siteName: 'Materialographic.com',
    images: [
      {
        url: '/images/pace/materialographic-logo.png',
        width: 1200,
        height: 630,
        alt: 'PACE Technologies International Distribution',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Distribution Network - PACE Technologies',
    description: 'Join PACE Technologies\' global distribution network or find your local distributor.',
    images: ['/images/pace/materialographic-logo.png'],
  },
  alternates: {
    canonical: 'https://materialographic.com/distribution',
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

export default function DistributionPage() {
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
        name: 'International Distribution',
        item: 'https://materialographic.com/distribution',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="py-8 md:py-12">
        <div className="container-custom">
          {/* Compact Header Section */}
          <AnimateOnScroll animation="fadeInUp" duration={500} className="mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-8 h-8 text-primary-600 flex-shrink-0" />
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">International Distribution Network</h1>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  PACE Technologies partners with trusted distributors worldwide to bring precision metallographic equipment 
                  and consumables to laboratories globally.
                </p>
              </div>
              {/* Compact Hero Image */}
              <div className="relative w-full md:w-96 h-48 md:h-56 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/images/pace/building banner.jpg"
                  alt="PACE Technologies facility - serving laboratories worldwide"
                  fill
                  className="object-cover object-center"
                  loading="eager"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Benefits Section - Moved Up to Establish Value First */}
          <AnimateOnScroll animation="fadeInUp" delay={50} duration={500} className="mb-12">
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 relative overflow-hidden">
              {/* Subtle background texture */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt=""
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={30}
                />
              </div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Partner With PACE Technologies?</h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    As a PACE distributor, you'll gain access to competitive pricing, a full portfolio of precision 
                    metallographic equipment and consumables, and unmatched technical support from our experienced team.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 border border-primary-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">Full Product Portfolio</h3>
                    <p className="text-gray-600 text-center">
                      Access to our complete range of precision metallographic equipment and consumables
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border border-primary-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Handshake className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">Competitive Pricing</h3>
                    <p className="text-gray-600 text-center">
                      Attractive distributor pricing structures designed for long-term success
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border border-primary-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">Technical Support</h3>
                    <p className="text-gray-600 text-center">
                      Unmatched technical support and training from our experienced team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Two Column Layout - Main Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* International Customers Section */}
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={500}>
              <div className="card h-full relative overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <Image
                    src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                    alt=""
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={30}
                  />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Find a Local Distributor</h2>
                  </div>
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4 shadow-md">
                    <Image
                      src="/images/pace/samples_in_vices.webp"
                      alt="PACE equipment and samples - available through our distributor network"
                      fill
                      className="object-cover object-bottom"
                      loading="lazy"
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-4">
                    <p className="mb-3">
                      International customers can connect with local distributors for competitive pricing, local support, 
                      and faster delivery. Our global network provides the same quality products and technical expertise 
                      you expect from PACE Technologies.
                    </p>
                  </div>
                  <Link 
                    href="/contact" 
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Contact Us to Find Your Local Distributor
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Become a Distributor Section */}
            <AnimateOnScroll animation="fadeInUp" delay={150} duration={500}>
              <div className="card h-full bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 relative overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <Image
                    src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                    alt=""
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={30}
                  />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Handshake className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Become a Distributor</h2>
                  </div>
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4 shadow-md">
                    <Image
                      src="/images/trainings-distributors/QS1.png"
                      alt="PACE Technologies training and distributor support"
                      fill
                      className="object-cover"
                      loading="lazy"
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-4">
                    <p className="mb-3">
                      Join our distribution network and gain access to competitive pricing, a full product portfolio, 
                      and unmatched technical support. We provide comprehensive training and sales enablement.
                    </p>
                  </div>
                  <a 
                    href="mailto:pace@metallographic.com?subject=Distribution%20Partnership%20Inquiry" 
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Contact International Sales
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Detailed Become a Distributor Process */}
          <AnimateOnScroll animation="fadeInUp" delay={200} duration={500} className="mb-12">
            <div className="card bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 relative overflow-hidden">
              {/* Background image */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt=""
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={30}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Handshake className="w-8 h-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">The Partnership Process</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Distributor Questionnaire</h3>
                        <p className="text-gray-700">
                          You'll begin by completing a comprehensive questionnaire that helps us understand your company 
                          profile, market reach, service capabilities, and distribution strategy.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Agreement & Territory Review</h3>
                        <p className="text-gray-700">
                          We will provide a distributor agreement outlining responsibilities, territories, pricing 
                          structures, and support commitments to ensure long-term alignment and transparency.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Sales Enablement & Product Training</h3>
                        <p className="text-gray-700">
                          Once approved, you will receive access to technical documentation, marketing collateral, and 
                          direct training sessions so your team is fully equipped to represent PACE in your region.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Featured Distributor Section - Social Proof Before Final CTA */}
          <AnimateOnScroll animation="fadeInUp" delay={250} duration={500} className="mb-12">
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Featured Distributor</h2>
                <p className="text-lg text-gray-700">
                  Meet one of our trusted distribution partners
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 border border-primary-200 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="relative bg-gray-100 rounded-lg p-6 h-full flex items-center justify-center overflow-hidden">
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <Image
                          src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                          alt=""
                          fill
                          className="object-cover"
                          loading="lazy"
                          quality={20}
                        />
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="relative w-48 h-32 mx-auto mb-4 rounded-lg overflow-hidden p-4 flex items-center justify-center">
                          <Image
                            src="/images/trainings-distributors/forevision-logo.jpg"
                            alt="Forevision Instruments - PACE Technologies Distributor"
                            fill
                            className="object-contain"
                            loading="lazy"
                            quality={90}
                            sizes="192px"
                          />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Forevision Instruments</h3>
                        <p className="text-primary-600 font-semibold">(India) Pvt. Ltd.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-primary-600" />
                          <span className="font-semibold text-gray-900">Location:</span>
                          <span className="text-gray-700">Hyderabad, Telangana, India</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">Established:</span>
                          <span className="text-gray-700">1997</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="font-semibold text-gray-900">PACE Partner Since:</span>
                          <span className="text-primary-600 font-semibold">2023</span>
                        </div>
                      </div>
                      
                      <div className="prose prose-sm max-w-none text-gray-700">
                        <p className="mb-4">
                          Established in 1997 and headquartered in Hyderabad, Forevision Instruments has been a trusted 
                          partner in India's scientific instrumentation industry for over 25 years. Since becoming a 
                          PACE Technologies distributor in 2023, they have been bringing our precision metallographic 
                          equipment and consumables to laboratories across India with their expertise in sales, application, 
                          and technical services.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            <li>Metallographic Equipment</li>
                            <li>Electron Microscopes</li>
                            <li>Thermal Analysis</li>
                            <li>3D X-ray CT Systems</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Contact:</h4>
                          <div className="text-sm text-gray-700 space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-primary-600" />
                              <a href="mailto:fipl@forevision.in" className="hover:text-primary-600">
                                fipl@forevision.in
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-primary-600" />
                              <a href="tel:+914024042353" className="hover:text-primary-600">
                                +91 (40) 2404 2353
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4 text-primary-600" />
                              <a 
                                href="https://www.forevision.in" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-primary-600"
                              >
                                www.forevision.in
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-900 mb-3">Ready to Get Started?</p>
                        <p className="text-sm text-gray-700 mb-4">
                          Customers in India can request quotes through our system, and we'll connect you with Forevision 
                          for local support and competitive pricing.
                        </p>
                        <Link 
                          href="/quote" 
                          className="btn-primary inline-flex items-center gap-2"
                        >
                          Request a Quote
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Final Call to Action Section */}
          <AnimateOnScroll animation="fadeInUp" delay={300} duration={500}>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-10 md:p-16 text-center text-white shadow-2xl overflow-hidden">
              {/* Decorative hexagon background elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0"
                  viewBox="0 0 1200 400"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* Top right hexagon */}
                  <polygon
                    points="1000,40 1080,80 1080,160 1000,200 920,160 920,80"
                    fill="white"
                    opacity="0.6"
                  />
                  {/* Bottom left hexagon */}
                  <polygon
                    points="80,200 160,240 160,320 80,360 0,320 0,240"
                    fill="white"
                    opacity="0.5"
                  />
                  {/* Center hexagon */}
                  <polygon
                    points="500,100 580,140 580,220 500,260 420,220 420,140"
                    fill="white"
                    opacity="0.4"
                  />
                  {/* Top left hexagon */}
                  <polygon
                    points="200,60 280,100 280,180 200,220 120,180 120,100"
                    fill="white"
                    opacity="0.5"
                  />
                  {/* Bottom right hexagon */}
                  <polygon
                    points="900,240 980,280 980,360 900,400 820,360 820,280"
                    fill="white"
                    opacity="0.4"
                  />
                </svg>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                  Ready to Partner With Us?
                </h2>
                <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/95 leading-relaxed">
                  Whether you're looking for a local distributor or interested in becoming one, we're here to help. 
                  Contact our international sales team to get started.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-4xl mx-auto">
                  <a 
                    href="mailto:pace@metallographic.com?subject=Distribution%20Partnership%20Inquiry" 
                    className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
                  >
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Become a Distributor
                  </a>
                  <Link 
                    href="/contact" 
                    className="group bg-white/10 backdrop-blur-sm text-white hover:text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
                  >
                    Find Local Distributor
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/quote" 
                    className="group bg-white/10 backdrop-blur-sm text-white hover:text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
                  >
                    Request a Quote
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  )
}

