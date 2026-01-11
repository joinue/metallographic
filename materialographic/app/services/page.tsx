import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Wrench, Settings, ArrowRight, Phone, Mail, CheckCircle2 } from 'lucide-react'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = {
  title: 'Services - Service Plans, Installation & Training | PACE Technologies',
  description: 'Professional metallographic services you can purchase: KeepPACE service plans, on-site installation, training programs, and maintenance services for your laboratory.',
  keywords: [
    'metallographic services',
    'service plans',
    'lab consultation',
    'equipment installation',
    'equipment training',
    'maintenance services',
    'KeepPACE service plans',
    'on-site installation',
    'training programs',
  ],
  openGraph: {
    title: 'Services - Service Plans, Installation & Training | PACE Technologies',
    description: 'Professional metallographic services you can purchase: KeepPACE service plans, on-site installation, training programs, and maintenance services for your laboratory.',
    url: 'https://materialographic.com/services',
    siteName: 'Materialographic.com',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://materialographic.com/services',
  },
}

export default function ServicesPage() {
  return (
    <div className="py-0">
      {/* Hero Section with Image */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden mb-12">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/trainings-distributors/QS5.jpg"
            alt="PACE Technologies expert training and support services"
            fill
            className="object-cover object-center"
            priority
            quality={85}
            sizes="100vw"
            style={{ 
              filter: 'grayscale(30%) brightness(0.85)'
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/75 via-gray-900/65 to-gray-900/75"></div>
        </div>
        
        <div className="container-custom relative z-10 py-12 md:py-16">
          <AnimateOnScroll animation="fadeInUp" duration={500} className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Professional Services
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Professional services for your metallographic laboratory. Purchase service plans, schedule installation, arrange training, or book maintenance services to keep your lab running at peak performance.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <div className="container-custom">

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* KeepPACE Service Plans */}
          <AnimateOnScroll animation="fadeInUp" delay={100} duration={500}>
            <Link href="/keeppace" className="card h-full group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col bg-gradient-to-br from-primary-50/50 to-white border-primary-200">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-primary-600 to-primary-700 text-white px-3 py-1.5 text-xs font-semibold rounded-bl-lg z-10 shadow-md">
                Popular
              </div>
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/30 rounded-full -mr-16 -mt-16 group-hover:bg-primary-200/40 transition-colors"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-lg p-1.5 shadow-sm">
                    <Image
                      src="/images/pace/keeppacelogo.png"
                      alt="KeepPACE"
                      fill
                      className="object-contain"
                      quality={90}
                      sizes="48px"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    KeepPACE Service Plans
                  </h2>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">
                  Flexible service plans from basic annual check-ins to comprehensive coverage with priority support and personalized service.
                </p>
                <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all mt-auto">
                  View Plans
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </AnimateOnScroll>

          {/* Build Your Lab */}
          <AnimateOnScroll animation="fadeInUp" delay={150} duration={500}>
            <Link href="/builder" className="card h-full group hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}></div>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg group-hover:from-primary-200 group-hover:to-primary-100 transition-all flex-shrink-0 shadow-sm">
                    <Wrench className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    Build Your Lab
                  </h2>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">
                  Step-by-step tool to help you select the right equipment for your laboratory based on your specific needs and requirements.
                </p>
                <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all mt-auto">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </AnimateOnScroll>

          {/* Lab Consultation */}
          <AnimateOnScroll animation="fadeInUp" delay={250} duration={500}>
            <Link href="/contact" className="card h-full group hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}></div>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg group-hover:from-primary-200 group-hover:to-primary-100 transition-all flex-shrink-0 shadow-sm">
                    <Settings className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    Lab Consultation
                  </h2>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">
                  Get expert advice on setting up your lab, selecting equipment, optimizing processes, or planning equipment upgrades.
                </p>
                <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all mt-auto">
                  Request Consultation
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </AnimateOnScroll>

        </div>

        {/* Professional Service Offerings */}
        <AnimateOnScroll animation="fadeInUp" delay={350} duration={500} className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Service Offerings</h2>
            <p className="text-lg text-gray-700 max-w-3xl mb-6">
              We offer flexible, professional services that you can purchase as needed. Whether you're setting up new equipment, training your team, or need maintenance services, we provide expert assistance tailored to your schedule and requirements.
            </p>
            <p className="text-base text-gray-600 max-w-3xl mb-4">
              <strong>Need immediate technical help?</strong> Visit our <Link href="/support" className="text-primary-600 hover:text-primary-700 font-semibold underline">Support page</Link> to submit a support request or access self-service resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* On-Site Installation */}
            <div className="card bg-white border-gray-200">
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/images/trainings-distributors/QS7.jpg"
                  alt="On-site equipment installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">On-Site Installation</h3>
              <p className="text-gray-700 mb-4">
                Professional installation and setup of your equipment by our experienced technicians. We ensure proper installation, calibration, and initial testing to get your equipment running optimally from day one.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Equipment setup and calibration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Initial testing and verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Operator training during installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Documentation and handoff</span>
                </li>
              </ul>
            </div>

            {/* Training Services */}
            <div className="card bg-white border-gray-200">
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/images/trainings-distributors/QS5.jpg"
                  alt="Equipment training session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Training Services</h3>
              <p className="text-gray-700 mb-4">
                Comprehensive training programs tailored to your team's needs. From basic operation to advanced techniques, we help your staff master your equipment and processes.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>On-site or remote training options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Basic operation and maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Advanced techniques and optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Customized training for your applications</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* General Lab Image 1 */}
            <div className="card bg-white border-gray-200">
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/images/pace/4.jpg"
                  alt="Laboratory technicians working with metallographic equipment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">As-Needed Maintenance Visits</h3>
              <p className="text-gray-700 mb-4">
                Schedule maintenance visits when you need them, not on a fixed schedule. Perfect for labs that prefer to manage maintenance on their own timeline or need immediate attention for specific issues.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Preventive maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Diagnostic and repair services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Equipment optimization</span>
                </li>
              </ul>
            </div>

            {/* General Lab Image 2 */}
            <div className="card bg-white border-gray-200">
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/images/pace/1.jpg"
                  alt="Metallographic laboratory with technicians operating equipment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Additional Support Services</h3>
              <p className="text-gray-700 mb-4">
                We offer a range of additional support services to keep your lab running smoothly. From process optimization to emergency repairs, we're here when you need us.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Emergency repair services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Process optimization consulting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Equipment upgrades and retrofits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Technical consultation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-primary-600 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>Ready to purchase services?</strong> Contact us to discuss your specific needs and get a quote. Our team can provide pricing for installation, training programs, maintenance visits, or any other professional services. We'll work with you to create a service package that fits your schedule and budget.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:sales@metallographic.com?subject=Service%20Inquiry" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Request Service Quote
              </a>
              <a 
                href="tel:+15208826598" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call: (520) 882-6598
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* CTA Section */}
        <AnimateOnScroll animation="fadeInUp" delay={400} duration={500}>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-10 md:p-16 text-center text-white shadow-2xl overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Purchase Services?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-white/95">
                Our team is here to help you find the right service packages for your laboratory. Contact us today to discuss your needs and get a quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <a 
                  href="mailto:sales@metallographic.com" 
                  className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px]"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Email Us
                </a>
                <a 
                  href="tel:+15208826598" 
                  className="group bg-white/10 backdrop-blur-sm text-white hover:text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px]"
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Call: (520) 882-6598
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}

