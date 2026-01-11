'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, BookOpen, ExternalLink, Filter, X, ChevronDown } from 'lucide-react'
import { getAllStandards, getStandardsByCategory, getStandardsByOrganization, searchStandards, type Standard } from '@/lib/supabase'
import LoadingSpinner from '@/components/LoadingSpinner'

const categoryColors: Record<string, string> = {
  'Preparation': 'bg-blue-100 text-blue-700',
  'Etching': 'bg-purple-100 text-purple-700',
  'Analysis': 'bg-green-100 text-green-700',
  'Testing': 'bg-orange-100 text-orange-700',
  'Documentation': 'bg-pink-100 text-pink-700',
  'Calibration': 'bg-yellow-100 text-yellow-700',
  'Reference': 'bg-gray-100 text-gray-700',
}

const organizationColors: Record<string, string> = {
  'ASTM': 'bg-red-100 text-red-700',
  'ISO': 'bg-blue-100 text-blue-700',
  'SAE': 'bg-green-100 text-green-700',
  'ASME': 'bg-purple-100 text-purple-700',
}

export default function StandardsDatabasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedOrganization, setSelectedOrganization] = useState<string>('All')
  const [standards, setStandards] = useState<Standard[]>([])
  const [filteredStandards, setFilteredStandards] = useState<Standard[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [organizations, setOrganizations] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Load standards on mount
  useEffect(() => {
    async function loadStandards() {
      try {
        const allStandards = await getAllStandards()
        setStandards(allStandards)
        setFilteredStandards(allStandards)
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(allStandards.map(s => s.category))).sort()
        setCategories(uniqueCategories)
        
        // Extract unique organizations
        const uniqueOrganizations = Array.from(new Set(allStandards.map(s => s.organization).filter(Boolean))).sort()
        setOrganizations(uniqueOrganizations as string[])
      } catch (error) {
        console.error('Error loading standards:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadStandards()
  }, [])

  // Filter standards based on search, category, and organization
  useEffect(() => {
    async function filterStandards() {
      if (loading) return

      let filtered = standards

      // Filter by organization first
      if (selectedOrganization !== 'All') {
        try {
          filtered = await getStandardsByOrganization(selectedOrganization)
        } catch (error) {
          console.error('Error filtering by organization:', error)
          filtered = standards.filter(s => s.organization === selectedOrganization)
        }
      }

      // Filter by category
      if (selectedCategory !== 'All') {
        try {
          const categoryStandards = await getStandardsByCategory(selectedCategory)
          filtered = filtered.filter(s => 
            categoryStandards.some(cs => cs.id === s.id)
          )
        } catch (error) {
          console.error('Error filtering by category:', error)
          filtered = filtered.filter(s => s.category === selectedCategory)
        }
      }

      // Filter by search query
      if (searchQuery.trim()) {
        try {
          const searchResults = await searchStandards(searchQuery)
          filtered = filtered.filter(s => 
            searchResults.some(sr => sr.id === s.id)
          )
        } catch (error) {
          console.error('Error searching standards:', error)
          // Fallback to client-side search
          const searchTerm = searchQuery.toLowerCase()
          filtered = filtered.filter(s =>
            s.standard.toLowerCase().includes(searchTerm) ||
            s.title.toLowerCase().includes(searchTerm) ||
            s.description.toLowerCase().includes(searchTerm) ||
            (s.tags && s.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
          )
        }
      }

      setFilteredStandards(filtered)
    }

    filterStandards()
  }, [searchQuery, selectedCategory, selectedOrganization, standards, loading])

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Standards Database</h1>
          <p className="text-sm md:text-xl text-gray-600">
            Comprehensive database of metallography and materials testing standards from ASTM, ISO, and other organizations.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search standards by number, title, or description..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-base md:text-sm"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:block space-y-4">
            {/* Organization Filter Section */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter by Organization</span>
                {(selectedOrganization !== 'All') && (
                  <button
                    onClick={() => setSelectedOrganization('All')}
                    className="ml-auto text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedOrganization('All')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedOrganization === 'All'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  All
                </button>
                {organizations.map(org => (
                  <button
                    key={org}
                    onClick={() => setSelectedOrganization(org)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedOrganization === org
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {org}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Section */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter by Category</span>
                {(selectedCategory !== 'All') && (
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
                    {category}
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
                {((selectedOrganization !== 'All') || (selectedCategory !== 'All')) && (
                  <span className="px-2 py-0.5 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    {[selectedOrganization !== 'All' ? 1 : 0, selectedCategory !== 'All' ? 1 : 0].reduce((a, b) => a + b, 0)}
                  </span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileFiltersOpen && (
              <div className="mt-3 space-y-4 bg-white border border-gray-200 rounded-lg p-4">
                {/* Organization Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Organization</span>
                    {selectedOrganization !== 'All' && (
                      <button
                        onClick={() => setSelectedOrganization('All')}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedOrganization('All')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        selectedOrganization === 'All'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    {organizations.map(org => (
                      <button
                        key={org}
                        onClick={() => setSelectedOrganization(org)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          selectedOrganization === org
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {org}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
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
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active Filters Summary - Mobile */}
          {((selectedOrganization !== 'All') || (selectedCategory !== 'All')) && (
            <div className="md:hidden flex flex-wrap gap-2">
              {selectedOrganization !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {selectedOrganization}
                  <button
                    onClick={() => setSelectedOrganization('All')}
                    className="ml-1 hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="ml-1 hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          {loading ? (
            <p className="text-gray-600">Loading standards...</p>
          ) : (
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredStandards.length}</span> standard{filteredStandards.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Standards Grid */}
        {loading ? (
          <div className="text-center py-12">
            <LoadingSpinner size="md" />
          </div>
        ) : filteredStandards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredStandards.map(standard => (
              <Link
                key={standard.id}
                href={`/standards/${standard.slug || standard.id}`}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 hover:border-primary-400 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
                    {standard.standard}
                  </h3>
                  {standard.organization && (
                    <span className={`px-2 py-0.5 md:px-2 md:py-1 rounded text-xs font-semibold flex-shrink-0 ${
                      organizationColors[standard.organization] || 'bg-gray-100 text-gray-700'
                    }`}>
                      {standard.organization}
                    </span>
                  )}
                </div>
                
                <p className="text-sm font-medium text-gray-700 mb-2 line-clamp-2">
                  {standard.title}
                </p>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 md:line-clamp-3">
                  {standard.description}
                </p>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {standard.category && (
                    <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-semibold ${
                      categoryColors[standard.category] || 'bg-gray-100 text-gray-700'
                    }`}>
                      {standard.category}
                    </span>
                  )}
                  {standard.tags && standard.tags.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {standard.tags.length} tag{standard.tags.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-primary-600 font-medium text-sm group-hover:underline">
                    View Details →
                  </span>
                  {standard.official_url && (
                    <Link
                      href={standard.official_url}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-600 transition-colors"
                      title="Official standard page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No standards found matching your search.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

