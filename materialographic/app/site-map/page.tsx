import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, BookOpen, FileText, Calculator, Database, FlaskConical, FileCheck, Wrench, ShoppingCart, HelpCircle, Mail, Newspaper, Image as ImageIcon, ExternalLink } from 'lucide-react'
import { guides } from '@/data/guides'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Complete sitemap of all pages and resources on Materialographic.com',
  robots: {
    index: true,
    follow: true,
  },
}

// Resource pages from resources/page.tsx
const resources = [
  { title: 'Sample Preparation Checklist', slug: 'checklist' },
  { title: 'Grit Size Conversion Chart', slug: 'grit-size-chart' },
  { title: 'Common Etchants Reference Guide', slug: 'common-etchants-guide' },
  { title: 'Hardness Scale Conversion Chart', slug: 'hardness-scale-conversion' },
  { title: 'ASTM Standards Quick Reference', slug: 'astm-standards-reference' },
  { title: 'Safety Data Sheet Quick Reference', slug: 'safety-data-sheet-reference' },
  { title: 'Microscope Magnification Selection Guide', slug: 'microscope-magnification-guide' },
  { title: 'Material-Specific Preparation Guide', slug: 'material-preparation-guide' },
  { title: 'Polishing Cloth Selection Guide', slug: 'polishing-cloth-guide' },
  { title: 'PACE Technologies YouTube Channel', slug: 'pace-youtube-channel' },
  { title: 'Troubleshooting Quick Reference', slug: 'troubleshooting-guide' },
]

// Tool pages from tools/page.tsx
const tools = [
  { title: 'Grit Size Converter', slug: 'grit-size-converter' },
  { title: 'Polishing Time Calculator', slug: 'polishing-time-calculator' },
  { title: 'Grain Size Calculator', slug: 'grain-size-calculator' },
  { title: 'Mounting Material Calculator', slug: 'mounting-material-calculator' },
  { title: 'Total Procedure Time Estimator', slug: 'procedure-time-estimator' },
  { title: 'Etchant Selector', slug: 'etchant-selector' },
  { title: 'Sample Size/Mold Compatibility Checker', slug: 'mold-compatibility-checker' },
]

// Group guides by category
const guidesByCategory = {
  'Basics': guides.filter(g => g.category === 'Basics'),
  'Process': guides.filter(g => g.category === 'Process'),
  'Material-Specific': guides.filter(g => g.category === 'Material-Specific'),
  'Application-Specific': guides.filter(g => g.category === 'Application-Specific'),
  'Troubleshooting': guides.filter(g => g.category === 'Troubleshooting'),
}

export default function SitemapPage() {
  return (
    <div className="py-12">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Sitemap</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Complete directory of all pages, guides, resources, and tools available on Materialographic.com.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {/* Main Pages */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Main Pages</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link href="/" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Home</span>
                  <p className="text-gray-500 text-xs mt-1">Main landing page</p>
                </Link>
                <Link href="/builder" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Build Your Lab</span>
                  <p className="text-gray-500 text-xs mt-1">Equipment recommendations</p>
                </Link>
                <Link href="/databases" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Databases</span>
                  <p className="text-gray-500 text-xs mt-1">All databases overview</p>
                </Link>
                <Link href="/equipment" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Equipment Database</span>
                  <p className="text-gray-500 text-xs mt-1">Browse equipment</p>
                </Link>
                <Link href="/consumables" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Consumables Database</span>
                  <p className="text-gray-500 text-xs mt-1">Browse consumables</p>
                </Link>
                <Link href="/blog" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Blog</span>
                  <p className="text-gray-500 text-xs mt-1">Articles and updates</p>
                </Link>
                <Link href="/glossary" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Glossary</span>
                  <p className="text-gray-500 text-xs mt-1">Terminology dictionary</p>
                </Link>
                <Link href="/microstructures" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Microstructures Gallery</span>
                  <p className="text-gray-500 text-xs mt-1">Browse images</p>
                </Link>
                <Link href="/about" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">About Us</span>
                  <p className="text-gray-500 text-xs mt-1">About Materialographic.com</p>
                </Link>
                <Link href="/contact" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Contact</span>
                  <p className="text-gray-500 text-xs mt-1">Get in touch</p>
                </Link>
                <Link href="/quote" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Request Quote</span>
                  <p className="text-gray-500 text-xs mt-1">Request pricing</p>
                </Link>
                <Link href="/support" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Customer Support</span>
                  <p className="text-gray-500 text-xs mt-1">Get help</p>
                </Link>
                <Link href="/distribution" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">International Distribution</span>
                  <p className="text-gray-500 text-xs mt-1">Find distributors</p>
                </Link>
                <Link href="/newsletter" className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <span className="font-semibold text-primary-600">Newsletter</span>
                  <p className="text-gray-500 text-xs mt-1">Subscribe</p>
                </Link>
              </div>
            </div>
          </section>

          {/* Guides Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Guides</h2>
              <span className="text-sm text-gray-500">({guides.length} total)</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Link href="/guides" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-4">
                View All Guides
                <ChevronRight className="w-4 h-4" />
              </Link>
              <div className="space-y-4">
                {Object.entries(guidesByCategory).map(([category, categoryGuides]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{category}</h3>
                      <span className="text-xs text-gray-500">({categoryGuides.length} guides)</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {categoryGuides.slice(0, 6).map((guide) => (
                        <Link
                          key={guide.slug}
                          href={guide.slug === 'troubleshooting-common-issues' 
                            ? '/resources/troubleshooting-guide'
                            : `/guides/${guide.slug}`}
                          className="text-sm text-gray-600 hover:text-primary-600 transition-colors py-1"
                        >
                          {guide.title}
                        </Link>
                      ))}
                      {categoryGuides.length > 6 && (
                        <Link
                          href={`/guides?category=${category.replace(' ', '-')}`}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium py-1"
                        >
                          + {categoryGuides.length - 6} more...
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
              <span className="text-sm text-gray-500">({resources.length} resources)</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Link href="/resources" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-4">
                View All Resources
                <ChevronRight className="w-4 h-4" />
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {resources.map((resource) => (
                  <Link
                    key={resource.slug}
                    href={`/resources/${resource.slug}`}
                    className="p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
                  >
                    <h3 className="font-semibold text-sm text-gray-900 hover:text-primary-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">/resources/{resource.slug}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Tools & Calculators</h2>
              <span className="text-sm text-gray-500">({tools.length} tools)</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Link href="/tools" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-4">
                View All Tools
                <ChevronRight className="w-4 h-4" />
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
                  >
                    <h3 className="font-semibold text-sm text-gray-900 hover:text-primary-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">/tools/{tool.slug}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Databases Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Databases</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/materials" className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="w-5 h-5 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">Materials Database</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Material properties and preparation information
                  </p>
                  <p className="text-xs text-gray-500">/materials</p>
                </Link>
                <Link href="/etchants" className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="w-5 h-5 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">Etchants Database</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Searchable database of metallographic etchants
                  </p>
                  <p className="text-xs text-gray-500">/etchants</p>
                </Link>
                <Link href="/standards" className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="w-5 h-5 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">Standards Database</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    ASTM, ISO, and other standards
                  </p>
                  <p className="text-xs text-gray-500">/standards</p>
                </Link>
              </div>
            </div>
          </section>

          {/* External Links & Legal */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">External Links & Legal</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">External Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="https://shop.metallographic.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1"
                      >
                        Shop Consumables
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-xs text-gray-500 ml-2">(shop.metallographic.com)</span>
                    </li>
                    <li>
                      <a 
                        href="https://metallographic.com/equipment" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1"
                      >
                        Browse Equipment
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-xs text-gray-500 ml-2">(metallographic.com)</span>
                    </li>
                    <li>
                      <a 
                        href="https://metallographic.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1"
                      >
                        Main Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-xs text-gray-500 ml-2">(metallographic.com)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Legal & Information</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/privacy" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href="/keeppace" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                        Keep Pace
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
