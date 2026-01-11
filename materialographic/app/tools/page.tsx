'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Calculator, FlaskConical, Workflow, Layers, Clock, Ruler, Hourglass, Square, ClipboardList, Box } from 'lucide-react'
import AnimatedCard from '@/components/AnimatedCard'
import LoadingSpinner from '@/components/LoadingSpinner'

// Tool categories in order
const categoryOrder = ['Calculators', 'Reference', 'Workflow']

const tools = [
  {
    title: 'Grit Size Converter',
    slug: 'grit-size-converter',
    description: 'Convert between different grit size standards (FEPA, ANSI, JIS, micron).',
    icon: Layers,
    category: 'Calculators',
    calculatorOrder: 1,
  },
  {
    title: 'Polishing Time Calculator',
    slug: 'polishing-time-calculator',
    description: 'Calculate optimal polishing times based on material and grit size.',
    icon: Clock,
    category: 'Calculators',
    calculatorOrder: 2,
  },
  {
    title: 'Grain Size Calculator',
    slug: 'grain-size-calculator',
    description: 'Calculate ASTM grain size numbers and convert between grain size measurements.',
    icon: Ruler,
    category: 'Calculators',
    calculatorOrder: 3,
  },
  {
    title: 'Mounting Material Calculator',
    slug: 'mounting-material-calculator',
    description: 'Calculate the amount of mounting material needed for compression or castable mounting.',
    icon: Box,
    category: 'Calculators',
    calculatorOrder: 4,
  },
  {
    title: 'Total Procedure Time Estimator',
    slug: 'procedure-time-estimator',
    description: 'Estimate total time for complete sample preparation including grinding, polishing, and mounting.',
    icon: Hourglass,
    category: 'Calculators',
    calculatorOrder: 5,
  },
  {
    title: 'Etchant Selector',
    slug: 'etchant-selector',
    description: 'Find the right etchant for your material and application.',
    icon: FlaskConical,
    category: 'Reference',
  },
  {
    title: 'Sample Size/Mold Compatibility Checker',
    slug: 'mold-compatibility-checker',
    description: 'Check if your sample fits in standard mounting molds and get size recommendations.',
    icon: Square,
    category: 'Reference',
  },
  {
    title: 'Procedure Guides',
    slug: 'procedure-guides',
    description: 'Browse comprehensive guides for material-specific preparation procedures and get personalized recommendations.',
    icon: ClipboardList,
    category: 'Workflow',
    external: false,
    href: '/guides?category=Material-Specific',
  },
]

function ToolsPageContent() {
  const categories = ['All', ...categoryOrder]
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category') || 'All'
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState('')

  // Sync state with URL when it changes externally
  useEffect(() => {
    const category = searchParams.get('category') || 'All'
    setSelectedCategory(category)
  }, [searchParams])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      router.push('/tools')
    } else {
      router.push(`/tools?category=${encodeURIComponent(category)}`)
    }
  }
  
  // Sort tools by category order, then within category
  const sortedTools = [...tools].sort((a, b) => {
    const aCategoryIndex = categoryOrder.indexOf(a.category)
    const bCategoryIndex = categoryOrder.indexOf(b.category)
    
    // If same category
    if (aCategoryIndex === bCategoryIndex) {
      // Calculators by calculatorOrder
      if (a.category === 'Calculators' && b.category === 'Calculators') {
        return (a.calculatorOrder || 0) - (b.calculatorOrder || 0)
      }
      // Others by title
      return a.title.localeCompare(b.title)
    }
    
    return aCategoryIndex - bCategoryIndex
  })
  
  const filteredTools = sortedTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  // Group tools by category for sectioned display
  const toolsByCategory = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = []
    }
    acc[tool.category].push(tool)
    return acc
  }, {} as Record<string, typeof filteredTools>)

  return (
    <div className="py-4 sm:py-6 md:py-12">
      <div className="container-custom">
        {/* Header Section */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1.5 sm:mb-2 text-gray-900">Tools & Calculators</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
            Free tools: <strong>Calculators</strong> for conversions, <strong>Reference</strong> for materials, 
            and <strong>Workflow</strong> for procedures.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Category Filter - Scrollable on mobile */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools by Section */}
        {selectedCategory === 'All' ? (
          // Show tools grouped by section when "All" is selected
          <div className="space-y-6 sm:space-y-8 md:space-y-10 mb-4 sm:mb-8 md:mb-12">
            {categoryOrder.map(category => {
              const categoryTools = toolsByCategory[category] || []
              if (categoryTools.length === 0) return null
              
              return (
                <section key={category} className="scroll-mt-24">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                    {category === 'Calculators' && <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                    {category === 'Reference' && <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                    {category === 'Workflow' && <Workflow className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{category}</h2>
                    <span className="text-xs sm:text-sm text-gray-500">({categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'})</span>
                  </div>
                  {category === 'Calculators' && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 md:mb-5 max-w-3xl">
                      Conversion and calculation tools for grit sizes, polishing times, and parameters.
                    </p>
                  )}
                  {category === 'Reference' && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 md:mb-5 max-w-3xl">
                      Tools to select materials and reagents for your preparation work.
                    </p>
                  )}
                  {category === 'Workflow' && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 md:mb-5 max-w-3xl">
                      Tools to manage and optimize your sample preparation workflow.
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {categoryTools.map((tool, index) => {
                      const IconComponent = tool.icon
                      return (
                        <AnimatedCard key={tool.slug} index={index} animation="fadeInUp" duration={500}>
                          <div className="card hover:border-gray-300 group text-center p-4 sm:p-6">
                            <div className="flex justify-center mb-3 sm:mb-4">
                              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
                              </div>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                              {tool.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">
                              {tool.description}
                            </p>
                            {tool.external ? (
                              <Link 
                                href={tool.href || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-block w-full sm:w-auto"
                              >
                                Use Tool →
                              </Link>
                            ) : (
                              <Link 
                                href={`/tools/${tool.slug}`} 
                                className="btn-primary inline-block w-full sm:w-auto"
                              >
                                Use Tool →
                              </Link>
                            )}
                          </div>
                        </AnimatedCard>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          // Show filtered tools in grid when a specific category is selected
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8 md:mb-12">
            {filteredTools.map((tool, index) => {
              const IconComponent = tool.icon
              return (
                <AnimatedCard key={tool.slug} index={index} animation="fadeInUp" duration={500}>
                  <div className="card hover:border-gray-300 group text-center p-4 sm:p-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">
                      {tool.description}
                    </p>
                    {tool.external ? (
                      <Link 
                        href={tool.href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-block w-full sm:w-auto"
                      >
                        Use Tool →
                      </Link>
                    ) : (
                      <Link 
                        href={`/tools/${tool.slug}`} 
                        className="btn-primary inline-block w-full sm:w-auto"
                      >
                        Use Tool →
                      </Link>
                    )}
                  </div>
                </AnimatedCard>
              )
            })}
          </div>
        )}

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No tools found matching your search.</p>
          </div>
        )}

        {/* Featured Tool */}
        <div className="mt-8 sm:mt-12 md:mt-16 bg-primary-600 text-white rounded-lg p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">Procedure Guides</h2>
              <p className="text-sm sm:text-base text-primary-100 mb-3 sm:mb-4">
                Browse our comprehensive collection of material-specific procedure guides. Get 
                personalized recommendations for your preparation methods, track procedures, 
                and optimize your workflow.
              </p>
              <Link 
                href="/guides?category=Material-Specific"
                className="bg-white text-primary-600 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 inline-block text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
              >
                Browse Procedure Guides →
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 sm:mt-12 bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Looking for More Resources?</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 px-2 sm:px-0">
            Check out our comprehensive guides and downloadable resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link href="/guides" className="btn-primary w-full sm:w-auto">
              Browse Guides
            </Link>
            <Link href="/resources" className="btn-secondary w-full sm:w-auto">
              View Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ToolsPage() {
  return (
    <Suspense fallback={
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          <div className="text-center py-12">
            <LoadingSpinner size="md" />
          </div>
        </div>
      </div>
    }>
      <ToolsPageContent />
    </Suspense>
  )
}

