'use client'

import Script from 'next/script'
import { FileText, Package, Wrench } from 'lucide-react'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export default function QuotePage() {
  return (
    <>
      <Script
        src="https://js.hsforms.net/forms/embed/21334047.js"
        strategy="afterInteractive"
      />
      <div className="py-12">
        <div className="container-custom">
          {/* Header Section */}
          <AnimateOnScroll animation="fadeInUp" duration={700} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Request a Quote</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized pricing for metallographic equipment and consumables tailored to your laboratory's specific needs.
            </p>
          </AnimateOnScroll>

          {/* Main Content: Form and Info Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Quote Form - More Prominent */}
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={600} className="lg:col-span-2">
              <div className="card sticky top-24">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Request Your Quote</h2>
                <p className="text-gray-600 mb-6 text-sm">
                  Fill out the form below with details about your laboratory needs. After you've explored our resources and discussed your requirements, we'll provide a comprehensive quote for equipment and consumables.
                </p>
                
                {/* HubSpot Form */}
                <div className="hs-form-frame" data-region="na1" data-form-id="5c2cc19c-3560-433a-9b41-67818a1379ca" data-portal-id="21334047"></div>
              </div>
            </AnimateOnScroll>

            {/* Information Section - Sidebar */}
            <AnimateOnScroll animation="fadeInUp" delay={200} duration={600} className="lg:col-span-1">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 border border-primary-200">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">What's Included</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg flex-shrink-0">
                        <Wrench className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Equipment</h3>
                        <p className="text-gray-600 text-xs">
                          Sectioning saws, mounting presses, grinding and polishing equipment, microscopes, and more.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg flex-shrink-0">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Consumables</h3>
                        <p className="text-gray-600 text-xs">
                          Abrasives, polishing cloths, mounting materials, etchants, and other laboratory supplies.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Expert Consultation</h3>
                        <p className="text-gray-600 text-xs">
                          Personalized recommendations based on your materials, sample types, and throughput requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Before You Submit</h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">
                    We recommend exploring our{' '}
                    <a href="/builder" className="text-primary-600 hover:text-primary-700 font-semibold underline">
                      Build Your Lab
                    </a>{' '}
                    tool and{' '}
                    <a href="/guides/equipment-overview" className="text-primary-600 hover:text-primary-700 font-semibold underline">
                      Equipment Guide
                    </a>{' '}
                    to better understand your needs.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </>
  )
}

