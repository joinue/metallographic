'use client'

import Script from 'next/script'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { Mail, Phone, Clock, ArrowLeft } from 'lucide-react'

export default function SupportRequestPage() {
  return (
    <>
      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).hbspt) {
            (window as any).hbspt.forms.create({
              portalId: "21334047",
              formId: "b129cffb-298a-49db-b6a9-ec73f816a621",
              region: "na1",
              target: "#hs-form-container"
            });
          }
        }}
      />
      <div className="py-12">
        <div className="container-custom">
          {/* Header Section */}
          <AnimateOnScroll animation="fadeInUp" duration={500} className="mb-8">
            <Link 
              href="/support" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Support
            </Link>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Submit a Support Request</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                This is our preferred method for support requests. Fill out the form below with details about your issue, and our expert team will respond within 24 hours.
              </p>
              <div className="flex items-center justify-center gap-2 text-primary-600 mt-4">
                <Clock className="w-5 h-5" />
                <span className="font-medium">&lt;24 hours average response time</span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Support Request Form - Primary */}
          <AnimateOnScroll animation="fadeInUp" delay={50} duration={500} className="mb-12">
            <div className="card max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Support Request Form</h2>
                <p className="text-gray-600">
                  Please provide as much detail as possible about your support request. Include equipment model, error messages, and steps you've already tried. This helps us assist you more effectively.
                </p>
              </div>
              
              {/* HubSpot Form */}
              <div id="hs-form-container"></div>
            </div>
          </AnimateOnScroll>

          {/* Alternative Contact Methods - Secondary */}
          <AnimateOnScroll animation="fadeInUp" delay={100} duration={500}>
            <div className="max-w-4xl mx-auto">
              <div className="card bg-gray-50 border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Prefer to Call or Email?</h3>
                  <p className="text-sm text-gray-600">
                    While we prefer support requests through the form above, you can also reach us directly. Note that form submissions help us assist you more efficiently.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <h4 className="text-sm font-medium text-gray-700">Email</h4>
                    </div>
                    <a 
                      href="mailto:pace@metallographic.com" 
                      className="text-gray-600 hover:text-primary-600 text-sm"
                    >
                      pace@metallographic.com
                    </a>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <h4 className="text-sm font-medium text-gray-700">Phone</h4>
                    </div>
                    <a 
                      href="tel:+15208826598" 
                      className="text-gray-600 hover:text-primary-600 text-sm font-medium"
                    >
                      (520) 882-6598
                    </a>
                    <p className="text-xs text-gray-500 mt-1">Mon-Fri, 8AM-5PM MST</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  )
}

