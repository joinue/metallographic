import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, BookOpen, FileText, Calculator, Database, FlaskConical, FileCheck, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Complete sitemap of all pages and resources on Metallography.org',
  robots: {
    index: true,
    follow: true,
  },
}

// Guide pages from guides/page.tsx
const guides = [
  // Basics
  { title: 'Introduction to Metallography', slug: 'introduction-to-metallography' },
  { title: 'Purpose and Applications', slug: 'purpose-and-applications' },
  { title: 'History of Metallography', slug: 'history-of-metallography' },
  { title: 'Equipment Overview', slug: 'equipment-overview' },
  { title: 'Safety Fundamentals', slug: 'safety-fundamentals' },
  { title: 'Common Misconceptions', slug: 'common-misconceptions' },
  // Process
  { title: 'Sectioning', slug: 'sectioning' },
  { title: 'Mounting', slug: 'mounting' },
  { title: 'Grinding Techniques', slug: 'grinding-techniques' },
  { title: 'Polishing Methods', slug: 'polishing-methods' },
  { title: 'Etching Procedures', slug: 'etching-procedures' },
  { title: 'Microstructural Analysis', slug: 'microstructural-analysis' },
  // Material-Specific
  { title: 'Stainless Steel Preparation', slug: 'stainless-steel-preparation' },
  { title: 'Aluminum Sample Preparation', slug: 'aluminum-sample-preparation' },
  { title: 'Copper and Copper Alloys', slug: 'copper-alloys-preparation' },
  { title: 'Titanium Preparation', slug: 'titanium-preparation' },
  { title: 'Carbon Steel Preparation', slug: 'carbon-steel-preparation' },
  // Application-Specific
  { title: 'Failure Analysis', slug: 'failure-analysis' },
  { title: 'Hardness Testing Preparation', slug: 'hardness-testing-preparation' },
  { title: 'Quality Control and Inspection', slug: 'quality-control-inspection' },
]

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

export default function SitemapPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Sitemap</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Complete directory of all pages, guides, resources, and tools available on Metallography.org. 
            Use this page to quickly navigate to any section of the site.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-12">
          {/* Home */}
          <section className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">Main Pages</h2>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Home
                  </Link>
                  <p className="text-sm text-gray-600 ml-7">Main landing page with overview of resources</p>
                </li>
                <li>
                  <Link href="/builder" className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Build Your Lab
                  </Link>
                  <p className="text-sm text-gray-600 ml-7">Get general equipment and consumable recommendations based on your sample specifications and workflow requirements</p>
                </li>
                <li>
                  <Link href="/databases" className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Databases
                  </Link>
                  <p className="text-sm text-gray-600 ml-7">Access to materials, etchants, and standards databases</p>
                </li>
              </ul>
            </div>
          </section>

          {/* Guides Section */}
          <section className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Guides</h2>
              <span className="text-sm text-gray-500">({guides.length} guides)</span>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <Link href="/guides" className="inline-flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors mb-6 group">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                All Guides
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all group"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-600">/guides/{guide.slug}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Resources</h2>
              <span className="text-sm text-gray-500">({resources.length} resources)</span>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <Link href="/resources" className="inline-flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors mb-6 group">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                All Resources
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <Link
                    key={resource.slug}
                    href={`/resources/${resource.slug}`}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all group"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600">/resources/{resource.slug}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Tools & Calculators</h2>
              <span className="text-sm text-gray-500">({tools.length} tools)</span>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <Link href="/tools" className="inline-flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors mb-6 group">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                All Tools
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all group"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600">/tools/{tool.slug}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Databases Section */}
          <section className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Databases</h2>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <Link href="/materials" className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group mb-2">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Materials Database
                  </Link>
                  <p className="text-sm text-gray-600 ml-7 mb-3">
                    Comprehensive database of material properties and preparation information. 
                    Browse materials by category or search by name, composition, or properties.
                  </p>
                  <p className="text-xs text-gray-500 ml-7 italic">
                    Individual material pages available at /materials/[slug]
                  </p>
                </div>
                <div>
                  <Link href="/etchants" className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group mb-2">
                    <FlaskConical className="w-5 h-5" />
                    Etchants Database
                  </Link>
                  <p className="text-sm text-gray-600 ml-7 mb-3">
                    Searchable database of metallographic etchants with composition, application methods, 
                    safety data, and product links.
                  </p>
                  <p className="text-xs text-gray-500 ml-7 italic">
                    Individual etchant pages available at /etchants/[slug]
                  </p>
                </div>
                <div>
                  <Link href="/standards" className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group mb-2">
                    <FileCheck className="w-5 h-5" />
                    Standards Database
                  </Link>
                  <p className="text-sm text-gray-600 ml-7 mb-3">
                    Comprehensive database of metallography and materials testing standards from ASTM, ISO, 
                    and other organizations.
                  </p>
                  <p className="text-xs text-gray-500 ml-7 italic">
                    Individual standard pages available at /standards/[slug]
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* External Links */}
          <section className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">External Tools & Resources</h2>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/guides?category=Material-Specific"
                    className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Material-Specific Guides
                  </Link>
                  <p className="text-sm text-gray-600 ml-7">
                    Save, organize, and get personalized recommendations for your preparation procedures
                  </p>
                </li>
                <li>
                  <a 
                    href="https://shop.metallographic.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Shop Consumables (shop.metallographic.com)
                    <span className="text-xs text-gray-500">(External)</span>
                  </a>
                  <p className="text-sm text-gray-600 ml-7">
                    Purchase metallographic consumables and supplies
                  </p>
                </li>
                <li>
                  <a 
                    href="https://metallographic.com/equipment" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Browse Equipment (metallographic.com)
                    <span className="text-xs text-gray-500">(External)</span>
                  </a>
                  <p className="text-sm text-gray-600 ml-7">
                    Explore metallographic equipment and instruments
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            This sitemap provides an overview of all available pages. For the most up-to-date content, 
            please use the navigation menu or search functionality. Last updated: {new Date().toLocaleDateString('en-US', { 
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

