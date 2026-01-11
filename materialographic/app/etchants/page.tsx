'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, ExternalLink, AlertTriangle, X, ChevronDown } from 'lucide-react'
import { getAllEtchants, getEtchantsByCategory, searchEtchants, type Etchant, getPaceProductUrl } from '@/lib/supabase'

export default function EtchantsDatabasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [etchants, setEtchants] = useState<Etchant[]>([])
  const [filteredEtchants, setFilteredEtchants] = useState<Etchant[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Load etchants on mount
  useEffect(() => {
    async function loadEtchants() {
      try {
        const allEtchants = await getAllEtchants()
        setEtchants(allEtchants)
        setFilteredEtchants(allEtchants)
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(allEtchants.map(e => e.category).filter(Boolean))).sort()
        setCategories(uniqueCategories as string[])
      } catch (error) {
        console.error('Error loading etchants:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadEtchants()
  }, [])

  // Filter etchants based on search and category
  useEffect(() => {
    async function filterEtchants() {
      if (loading) return

      let filtered = etchants

      if (selectedCategory !== 'All') {
        try {
          filtered = await getEtchantsByCategory(selectedCategory)
        } catch (error) {
          console.error('Error filtering by category:', error)
          filtered = etchants.filter(e => e.category === selectedCategory)
        }
      }

      if (searchQuery.trim()) {
        try {
          const searchResults = await searchEtchants(searchQuery)
          filtered = searchResults.filter(e => 
            selectedCategory === 'All' || e.category === selectedCategory
          )
        } catch (error) {
          console.error('Error searching etchants:', error)
          // Fallback to client-side search
          const searchTerm = searchQuery.toLowerCase()
          filtered = filtered.filter(e =>
            e.name.toLowerCase().includes(searchTerm) ||
            e.composition.toLowerCase().includes(searchTerm) ||
            (e.reveals && e.reveals.toLowerCase().includes(searchTerm)) ||
            (e.compatible_materials && e.compatible_materials.some(m => m.toLowerCase().includes(searchTerm)))
          )
        }
      }

      setFilteredEtchants(filtered)
    }

    filterEtchants()
  }, [searchQuery, selectedCategory, etchants, loading])

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Etchants Database</h1>
          <p className="text-sm md:text-xl text-gray-600">
            Comprehensive database of metallographic etchants with composition, application methods, safety data, and product links.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search etchants by name, composition, or material compatibility..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-base md:text-sm"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:block">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter by Category</span>
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="ml-auto text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filters - Collapsible */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-700">Filters</span>
                {selectedCategory !== 'All' && (
                  <span className="px-2 py-0.5 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    1
                  </span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileFiltersOpen && (
              <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Category</span>
                    {selectedCategory !== 'All' && (
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        selectedCategory === 'All'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active Filters Summary - Mobile */}
          {selectedCategory !== 'All' && (
            <div className="md:hidden flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {selectedCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="ml-1 hover:text-primary-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          {loading ? (
            <p className="text-gray-600">Loading etchants...</p>
          ) : (
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredEtchants.length}</span> etchant{filteredEtchants.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Etchants Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading etchants...</p>
          </div>
        ) : filteredEtchants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredEtchants.map(etchant => {
              const paceUrl = getPaceProductUrl(etchant)
              return (
                <Link
                  key={etchant.id}
                  href={`/etchants/${etchant.slug || etchant.id}`}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 hover:border-primary-400 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
                      {etchant.name}
                    </h3>
                    {paceUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          window.open(paceUrl, '_blank', 'noopener,noreferrer')
                        }}
                        className="ml-2 p-1.5 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                        title="Available from PACE"
                        type="button"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {etchant.category && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        {etchant.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      {etchant.category === 'material-specific' && etchant.compatible_materials && etchant.compatible_materials.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          For: {etchant.compatible_materials.slice(0, 3).map(m => m.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ')}
                          {etchant.compatible_materials.length > 3 && '...'}
                        </p>
                      )}
                      {etchant.category === 'specialty' && (
                        <p className="text-xs text-gray-500 mt-1">
                          {etchant.tags && etchant.tags.length > 0 ? (
                            <>
                              {etchant.tags.filter(tag => 
                                ['color-etching', 'prior-austenite', 'carbides', 'graphite', 'grain-boundaries'].includes(tag)
                              ).slice(0, 2).map(tag => {
                                const tagLabels: Record<string, string> = {
                                  'color-etching': 'Color etching',
                                  'prior-austenite': 'Prior austenite grain boundaries',
                                  'carbides': 'Carbide identification',
                                  'graphite': 'Graphite revelation',
                                  'grain-boundaries': 'Grain boundary analysis'
                                }
                                return tagLabels[tag] || tag.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                              }).join(', ')}
                            </>
                          ) : etchant.reveals ? (
                            `For: ${etchant.reveals.split(',').slice(0, 2).join(', ')}`
                          ) : 'Specialized application'}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Composition:</span>
                      <span className="font-medium text-gray-900 text-right flex-1 ml-2">{etchant.composition}</span>
                    </div>
                    {etchant.reveals && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reveals:</span>
                        <span className="font-medium text-gray-900 text-right flex-1 ml-2">{etchant.reveals}</span>
                      </div>
                    )}
                    {etchant.application_method && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Method:</span>
                        <span className="font-medium text-gray-900 capitalize">{etchant.application_method}</span>
                      </div>
                    )}
                    {etchant.typical_time_seconds && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium text-gray-900">{etchant.typical_time_seconds}s</span>
                      </div>
                    )}
                  </div>

                  {etchant.hazards && etchant.hazards.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-xs text-amber-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Hazards: {etchant.hazards.join(', ')}</span>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-primary-600 font-medium text-sm group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No etchants found matching your search.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

