import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { CheckCircle2, Clock, Settings, Star, Sparkles, Building2, Mail, Phone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'KeepPACE Service Program - Service Plans & Pricing | PACE Technologies',
  description: 'Choose the right KeepPACE support plan for your lab. From Basic to Enterprise Premium, find comprehensive service agreements with annual check-ins, emergency support, parts discounts, and on-site service.',
  keywords: [
    'KeepPACE service program',
    'metallographic equipment service plans',
    'equipment maintenance plans',
    'PACE Technologies support',
    'lab equipment service agreement',
    'preventive maintenance',
    'equipment support plans',
  ],
  openGraph: {
    title: 'KeepPACE Service Program - Service Plans & Pricing | PACE Technologies',
    description: 'Choose the right KeepPACE support plan for your lab. Comprehensive service agreements with annual check-ins, emergency support, and parts discounts.',
    url: 'https://materialographic.com/keeppace',
    siteName: 'Materialographic.com',
    images: [
      {
        url: '/images/pace/keeppacelogo.png',
        width: 1200,
        height: 630,
        alt: 'PACE Technologies KeepPACE Service Program',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeepPACE Service Program - PACE Technologies',
    description: 'Choose the right support plan for your lab with KeepPACE service agreements.',
    images: ['/images/pace/keeppacelogo.png'],
  },
  alternates: {
    canonical: 'https://materialographic.com/keeppace',
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

export default function KeepPACEPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header Section */}
        <AnimateOnScroll animation="fadeInUp" duration={500} className="mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                  <Image
                    src="/images/pace/keeppacelogo.png"
                    alt="KeepPACE Service Program Logo"
                    fill
                    className="object-contain"
                    priority
                    quality={90}
                    sizes="96px"
                  />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">KeepPACE Service Program</h1>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Flexible service plans designed to meet the needs of any lab from basic annual check-ins to comprehensive coverage with priority support and personalized service from our experienced team.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Individual System Plans */}
        <div className="mb-16">
          <AnimateOnScroll animation="fadeInUp" delay={50} duration={500} className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Individual System Plans</h2>
            <p className="text-lg text-gray-700 max-w-3xl">
              Choose the level of support that matches your lab's needs. All plans include annual check-ins, response guarantees, and parts discounts.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* KeepPACE Basic */}
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={500}>
              <div className="card h-full bg-gradient-to-br from-gray-50 to-white border-gray-200 relative overflow-hidden">
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
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">KeepPACE Basic</h3>
                    <p className="text-sm text-gray-700 mt-3 italic mb-4">
                      Designed for labs needing reliable baseline support
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      Contact us for pricing
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Annual check-in (30 min, remote)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">1 business day response guarantee</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">10% discount on spare parts and out-of-warranty repairs</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Emergency video support available (billed hourly)</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* KeepPACE Standard */}
            <AnimateOnScroll animation="fadeInUp" delay={150} duration={500}>
              <div className="card h-full bg-gradient-to-br from-primary-50 to-white border-primary-200 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Popular
                </div>
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
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">KeepPACE Standard</h3>
                    <p className="text-sm text-gray-700 mt-3 italic mb-4">
                      Adds process support and light service credit
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      Contact us for pricing
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm"><strong>Everything in Basic, plus:</strong></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Extended annual check-in (60 min)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">1x process optimization session per year</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">15% discount on parts and repairs</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Access to loaner equipment (as available)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">$300 on-site service credit</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* KeepPACE Plus */}
            <AnimateOnScroll animation="fadeInUp" delay={200} duration={500}>
              <div className="card h-full bg-gradient-to-br from-gray-50 to-white border-gray-200 relative overflow-hidden">
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
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">KeepPACE Plus</h3>
                    <p className="text-sm text-gray-700 mt-3 italic mb-4">
                      Intended for higher-utilization or mission-critical labs
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      Contact us for pricing
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm"><strong>Everything in Standard, plus:</strong></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Annual preventive maintenance visit (on-site; travel billed separately)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Biannual check-ins (1 remote, 1 on-site)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Up to 2 emergency video support calls included</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">20% discount on parts and repairs</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Priority loaner access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Designated service escalation contact</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Enterprise Plans */}
        <div className="mb-16">
          <AnimateOnScroll animation="fadeInUp" delay={250} duration={500} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Enterprise Plans</h2>
            </div>
            <p className="text-lg text-gray-700 max-w-3xl">
              One agreement covering multiple systems and locations. Ideal for organizations with multiple labs or distributed operations.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enterprise Basic */}
            <AnimateOnScroll animation="fadeInUp" delay={300} duration={500}>
              <div className="card bg-gradient-to-br from-gray-50 to-white border-gray-200 relative overflow-hidden">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Basic</h3>
                  <p className="text-gray-700 mb-4">Covers up to 10 systems</p>
                  <p className="text-sm text-gray-600 font-medium mb-4">Contact us for pricing</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Basic-level support</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Shared support hours</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Parts discounts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">On-site service credit</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Enterprise Standard */}
            <AnimateOnScroll animation="fadeInUp" delay={350} duration={500}>
              <div className="card bg-gradient-to-br from-primary-50 to-white border-primary-200 relative overflow-hidden">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Standard</h3>
                  <p className="text-gray-700 mb-4">Enhanced support for growing organizations</p>
                  <p className="text-sm text-gray-600 font-medium mb-4">Contact us for pricing</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Workflow consulting</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Higher discounts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Increased support hours</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Greater on-site service credit</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Enterprise Plus */}
            <AnimateOnScroll animation="fadeInUp" delay={400} duration={500}>
              <div className="card bg-gradient-to-br from-gray-50 to-white border-gray-200 relative overflow-hidden">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Plus</h3>
                  <p className="text-gray-700 mb-4">Comprehensive coverage for critical operations</p>
                  <p className="text-sm text-gray-600 font-medium mb-4">Contact us for pricing</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Preventive maintenance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Priority support</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Higher discounts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Expanded service credits</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Enterprise Premium */}
            <AnimateOnScroll animation="fadeInUp" delay={450} duration={500}>
              <div className="card bg-gradient-to-br from-primary-50 to-white border-primary-200 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Custom
                </div>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Premium</h3>
                  <p className="text-gray-700 mb-4">Fully customized support for national or global lab networks</p>
                  <p className="text-sm text-gray-600 font-medium mb-4">Custom pricing available</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Tailored service agreements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Dedicated account management</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Multi-site coordination</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">Customized support levels</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* CTA Section */}
        <AnimateOnScroll animation="fadeInUp" delay={500} duration={500}>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/95 leading-relaxed">
                Contact our sales team for a personalized consultation. We'll discuss your lab's specific needs and help you find the perfect KeepPACE plan with customized pricing that fits your budget and requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-4xl mx-auto">
                <a 
                  href="mailto:sales@metallographic.com?subject=KeepPACE%20Service%20Program%20Inquiry" 
                  className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Contact Sales
                </a>
                <a 
                  href="tel:+15208826598" 
                  className="group bg-white/10 backdrop-blur-sm text-white hover:text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Call: (520) 882-6598
                </a>
                <Link 
                  href="/quotes" 
                  className="group bg-white/10 backdrop-blur-sm text-white hover:text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}

