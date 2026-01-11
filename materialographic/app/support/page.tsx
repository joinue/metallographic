import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import YouTubeVideo from '@/components/YouTubeVideo'
import { Mail, Phone, Clock, Shield, Users, Award, CheckCircle2, ExternalLink, Play, ChevronRight, BookOpen, FileText, Database, Calculator, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Technical Support & Help | PACE Technologies',
  description: 'Get help with your PACE Technologies equipment. Submit support requests, access troubleshooting guides, tutorials, databases, and self-service resources.',
  keywords: [
    'technical support',
    'equipment troubleshooting',
    'support request',
    'metallographic help',
    'equipment documentation',
    'troubleshooting guides',
    'technical assistance',
    'customer support',
  ],
  openGraph: {
    title: 'Technical Support & Help | PACE Technologies',
    description: 'Get help with your PACE Technologies equipment. Submit support requests, access troubleshooting guides, tutorials, databases, and self-service resources.',
    url: 'https://materialographic.com/support',
    siteName: 'Materialographic.com',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://materialographic.com/support',
  },
}

export default function SupportPage() {
  return (
    <>
      <div className="py-12">
        <div className="container-custom">
          {/* Header Section */}
          <AnimateOnScroll animation="fadeInUp" duration={500} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Technical Support & Help</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get help with your PACE Technologies equipment. Submit a support request, access self-service resources, or find answers in our comprehensive guides and tutorials.
            </p>
            <p className="text-base text-gray-500 mt-4 max-w-2xl mx-auto">
              <strong>Looking to purchase services?</strong> Visit our <Link href="/services" className="text-primary-600 hover:text-primary-700 font-semibold underline">Services page</Link> to learn about service plans, installation, and training programs.
            </p>
          </AnimateOnScroll>

          {/* Primary Support Request CTA */}
          <AnimateOnScroll animation="fadeInUp" delay={50} duration={500} className="mb-16">
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
                  Submit a Support Request
                </h2>
                <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/95 leading-relaxed">
                  Our preferred method for support requests. Submit a detailed request and our expert team will respond within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-4xl mx-auto mb-6">
                  <Link 
                    href="/support/request" 
                    className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-w-[240px] text-base"
                  >
                    Submit Support Request
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>&lt;24 hours average response time</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Alternative Contact Methods - Secondary */}
          <AnimateOnScroll animation="fadeInUp" delay={100} duration={500} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Alternative Contact Methods</h3>
                <p className="text-sm text-gray-600">
                  Prefer to call or email? These options are available, but submitting a support request helps us assist you more efficiently.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card bg-gray-50 border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <h4 className="text-base font-medium text-gray-700">Email</h4>
                  </div>
                  <a 
                    href="mailto:pace@metallographic.com" 
                    className="text-gray-600 hover:text-primary-600 font-medium text-sm"
                  >
                    pace@metallographic.com
                  </a>
                </div>

                <div className="card bg-gray-50 border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <h4 className="text-base font-medium text-gray-700">Phone</h4>
                  </div>
                  <a 
                    href="tel:+15208826598" 
                    className="text-gray-600 hover:text-primary-600 font-semibold"
                  >
                    (520) 882-6598
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Mon-Fri, 8AM-5PM MST</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* KeepPACE Members - Priority Support */}
          <AnimateOnScroll animation="fadeInUp" delay={150} duration={500} className="mb-16">
            <div className="card bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 relative overflow-hidden">
              {/* Background texture */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt=""
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={30}
                  sizes="100vw"
                />
              </div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">KeepPACE Members Get Priority Support</h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    KeepPACE service plan members receive priority response times and dedicated support
                  </p>
                  <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                    If you're a KeepPACE member, you'll receive faster response times and priority assistance. Not a member? <Link href="/services" className="text-primary-600 hover:text-primary-700 font-semibold underline">Learn about our service plans</Link> or <Link href="/keeppace" className="text-primary-600 hover:text-primary-700 font-semibold underline">view KeepPACE plans and pricing</Link>.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Direct Contact Options */}
          <AnimateOnScroll animation="fadeInUp" delay={200} duration={500} className="mb-16">
            <div className="card relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Direct Contact Options</h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Prefer to contact us directly? Use these methods, though submitting a support request above helps us assist you more efficiently.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-3">
                      <Mail className="w-6 h-6 text-primary-600" />
                      Email Support
                    </h3>
                    <p className="text-gray-600 mb-3">
                      For technical assistance and support requests - we'll get back to you promptly
                    </p>
                    <a 
                      href="mailto:pace@metallographic.com" 
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      pace@metallographic.com
                    </a>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-3">
                      <Phone className="w-6 h-6 text-primary-600" />
                      Phone Support
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Monday - Friday, 8:00 AM - 5:00 PM MST - speak directly with our team
                    </p>
                    <a 
                      href="tel:+15208826598" 
                      className="text-primary-600 hover:text-primary-700 font-semibold text-lg"
                    >
                      +1 (520) 882-6598
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Learning Resources Section */}
          <AnimateOnScroll animation="fadeInUp" delay={250} duration={500} className="mb-16">
            <div className="card">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Self-Service Learning Resources</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Explore our comprehensive guides, reference materials, databases, and tools to help you solve problems and learn best practices.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Guides */}
                <div className="group card hover:border-primary-300 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <Link href="/guides" className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      Guides
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    Step-by-step guides covering basics, processes, material-specific techniques, and troubleshooting.
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    <Link href="/guides?category=Basics" className="text-primary-600 hover:text-primary-700 font-medium">
                      Basics →
                    </Link>
                    <Link href="/guides?category=Troubleshooting" className="text-primary-600 hover:text-primary-700 font-medium">
                      Troubleshooting →
                    </Link>
                  </div>
                </div>

                {/* Resources */}
                <div className="group card hover:border-primary-300 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <Link href="/resources" className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <BarChart3 className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      Resources
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    Quick reference charts, checklists, and guides for common tasks and conversions.
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    <Link href="/resources/checklist" className="text-primary-600 hover:text-primary-700 font-medium">
                      Sample Prep Checklist →
                    </Link>
                    <Link href="/resources/grit-size-chart" className="text-primary-600 hover:text-primary-700 font-medium">
                      Grit Size Chart →
                    </Link>
                  </div>
                </div>

                {/* Databases */}
                <div className="group card hover:border-primary-300 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <Link href="/databases" className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <Database className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      Databases
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    Searchable databases of materials, etchants, standards, and microstructure images.
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    <Link href="/materials" className="text-primary-600 hover:text-primary-700 font-medium">
                      Materials Database →
                    </Link>
                    <Link href="/etchants" className="text-primary-600 hover:text-primary-700 font-medium">
                      Etchants Database →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tools Quick Links */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Helpful Tools</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Link href="/tools/grit-size-converter" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Grit Size Converter
                  </Link>
                  <Link href="/tools/etchant-selector" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Etchant Selector
                  </Link>
                  <Link href="/tools/polishing-time-calculator" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Polishing Calculator
                  </Link>
                  <Link href="/tools" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All Tools →
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Expert Tutorials Section */}
          <AnimateOnScroll animation="fadeInUp" delay={300} duration={500} className="mb-16">
            <div className="card">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Learn with Our Expert Tutorials</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Access our comprehensive library of instructional videos featuring expert techniques and equipment tutorials from Dr. Don, Founder of PACE Technologies.
                </p>
              </div>
              
              {/* Featured Tutorial */}
              <div className="mb-8">
                <YouTubeVideo
                  videoId="nQ7nM3VhWEU"
                  title="Precision Sectioning with the PICO 155S"
                  description="Expert Tutorial by Dr. Don, Founder of PACE Technologies"
                />
              </div>
              
              <div className="text-center">
                <a
                  href="https://www.youtube.com/@pacetechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Subscribe to Our YouTube Channel
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  )
}

