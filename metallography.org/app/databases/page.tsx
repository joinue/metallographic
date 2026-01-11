'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Database, Package, FlaskConical, FileText, Image as ImageIcon, ChevronRight, Search } from 'lucide-react'
import AnimatedCard from '@/components/AnimatedCard'
import { getAllMaterials, getAllEtchants, getAllStandards } from '@/lib/supabase'

const databases = [
  {
    title: 'Materials Database',
    slug: 'materials',
    description: 'Comprehensive database of materials with preparation procedures, properties, and recommended techniques. Search by material type, category, or specific alloy composition.',
    icon: Package,
    color: 'primary',
    status: 'active',
  },
  {
    title: 'Etchants Database',
    slug: 'etchants',
    description: 'Complete reference of etching reagents with compositions, applications, safety information, and material compatibility. Find the right etchant for your material and analysis needs.',
    icon: FlaskConical,
    color: 'primary',
    status: 'active',
  },
  {
    title: 'Standards Database',
    slug: 'standards',
    description: 'Reference database of ASTM and ISO standards relevant to metallography, including preparation methods, testing procedures, and analysis guidelines.',
    icon: FileText,
    color: 'primary',
    status: 'active',
  },
  {
    title: 'Microstructure Gallery',
    slug: 'microstructures',
    description: 'Browse our extensive collection of high-quality microstructure images from various materials, treatments, and preparation techniques. Search and filter by material type, magnification, and etchant.',
    icon: ImageIcon,
    color: 'primary',
    status: 'active',
  },
]

export default function DatabasesPage() {
  const [materialCount, setMaterialCount] = useState<number | null>(null)
  const [etchantCount, setEtchantCount] = useState<number | null>(null)
  const [standardCount, setStandardCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadCounts() {
      try {
        const [materials, etchants, standards] = await Promise.all([
          getAllMaterials(),
          getAllEtchants(),
          getAllStandards(),
        ])
        setMaterialCount(materials.length)
        setEtchantCount(etchants.length)
        setStandardCount(standards.length)
      } catch (error) {
        console.error('Error loading database counts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCounts()
  }, [])

  const filteredDatabases = databases.filter(db => {
    const matchesSearch = searchQuery === '' || 
      db.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const activeDatabases = filteredDatabases.filter(db => db.status === 'active')
  const comingSoonDatabases = filteredDatabases.filter(db => db.status === 'coming-soon')

  const getCount = (slug: string) => {
    if (slug === 'materials') return materialCount
    if (slug === 'etchants') return etchantCount
    if (slug === 'standards') return standardCount
    return null
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Databases</h1>
          <p className="text-lg text-gray-600 mt-2">
            Searchable databases of materials, etchants, and standards for metallographic sample preparation. 
            Access comprehensive information on material properties, preparation procedures, etching reagents, and industry standards.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search databases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Active Databases Section */}
        {activeDatabases.length > 0 && (
          <section className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Available Databases</h2>
              <span className="text-sm text-gray-500">({activeDatabases.length} {activeDatabases.length === 1 ? 'database' : 'databases'})</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-3xl">
              Searchable databases with comprehensive information for your metallographic work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDatabases.map((database, index) => {
                const count = getCount(database.slug)
                return (
                  <AnimatedCard key={database.slug} index={index} animation="fadeInUp" duration={500}>
                    <Link 
                      href={`/${database.slug}`}
                      className="card hover:border-gray-300 group h-full flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-primary-50">
                            <database.icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {database.title}
                            </h3>
                            {count !== null && !loading && (
                              <p className="text-sm text-gray-500 mt-1">
                                {count.toLocaleString()} {count === 1 ? 'entry' : 'entries'}
                              </p>
                            )}
                            {loading && (
                              <p className="text-sm text-gray-400 mt-1">Loading...</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                        {database.description}
                      </p>
                      <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Browse Database
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </AnimatedCard>
                )
              })}
            </div>
          </section>
        )}

        {/* Coming Soon Databases Section */}
        {comingSoonDatabases.length > 0 && (
          <section className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Coming Soon</h2>
            </div>
            <p className="text-gray-600 mb-6 max-w-3xl">
              Additional databases are in development and will be available soon.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comingSoonDatabases.map((database, index) => (
                <AnimatedCard key={database.slug} index={index} animation="fadeInUp" duration={500}>
                  <div className="card border-gray-200 opacity-75 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-gray-50">
                          <database.icon className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-600">
                            {database.title}
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                      {database.description}
                    </p>
                    <span className="text-gray-400 font-semibold text-sm">
                      Available Soon
                    </span>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </section>
        )}

        {filteredDatabases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No databases found matching your search.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Finding Information?</h2>
          <p className="text-gray-700 mb-6">
            Use our search tool or browse our comprehensive guides and resources for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides" className="btn-primary">
              Browse Guides
            </Link>
            <Link href="/resources" className="btn-secondary">
              View Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

