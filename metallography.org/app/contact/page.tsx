'use client'

import Script from 'next/script'
import { Mail, MessageSquare } from 'lucide-react'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export default function ContactPage() {

  return (
    <>
      <Script
        src="https://js.hsforms.net/forms/embed/21334047.js"
        strategy="afterInteractive"
      />
      <div className="py-12">
        <div className="container-custom">
        {/* Header Section */}
        <AnimateOnScroll animation="fadeInUp" duration={700} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or need assistance? We'd love to hear from you. 
            Get in touch and we'll respond as soon as possible.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={600}>
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Email Us</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Send us an email and we'll get back to you within 24 hours.
                    </p>
                    <a 
                      href="mailto:info@metallographic.com?subject=Metallography.org%20Inquiry" 
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      info@metallographic.com
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={200} duration={600}>
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">General Inquiries</h3>
                    <p className="text-gray-600 text-sm">
                      For questions about our resources, guides, or general information about metallography.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={300} duration={600}>
              <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Related Resources</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Before contacting us, you might find answers in our comprehensive guides and resources.
                </p>
                <div className="space-y-2">
                  <a 
                    href="/guides" 
                    className="block text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Browse Guides →
                  </a>
                  <a 
                    href="/resources" 
                    className="block text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    View Resources →
                  </a>
                  <a 
                    href="/resources/troubleshooting-guide" 
                    className="block text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Troubleshooting Guide →
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={600}>
              <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
                
                {/* HubSpot Form */}
                <div className="hs-form-frame" data-region="na1" data-form-id="5cd9b8f2-0379-446e-be73-9c822e478231" data-portal-id="21334047"></div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Additional Information Section */}
        <AnimateOnScroll animation="fadeInUp" delay={400} duration={600} className="mt-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">How quickly will I receive a response?</h3>
                <p className="text-gray-600 text-sm">
                  We typically respond to all inquiries within 24-48 hours during business days.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Can I request specific content or guides?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! We welcome suggestions for new guides, resources, or improvements to existing content.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Do you offer technical support?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, we provide technical support for questions related to metallographic sample preparation and our resources.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Are your resources really free?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! All guides, resources, and tools on Metallography.org are completely free to use.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
    </>
  )
}

