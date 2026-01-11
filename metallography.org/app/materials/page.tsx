'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, X, ChevronDown, ChevronLeft, ChevronRight, Settings, Layers } from 'lucide-react'
import { getAllMaterials, getMaterialsByCategory, searchMaterials, type Material } from '@/lib/supabase'

const ITEMS_PER_PAGE = 24

// Color mapping for material categories based on microstructure/appearance
function getCategoryBadgeColors(category: string): { bg: string; text: string; border: string } {
  const categoryLower = category.toLowerCase()
  
  if (categoryLower.includes('carbon steel') || categoryLower.includes('steel')) {
    return {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300'
    }
  }
  if (categoryLower.includes('stainless')) {
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      border: 'border-gray-300'
    }
  }
  if (categoryLower.includes('aluminum') || categoryLower.includes('aluminium')) {
    return {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200'
    }
  }
  if (categoryLower.includes('titanium')) {
    return {
      bg: 'bg-cyan-50',
      text: 'text-cyan-700',
      border: 'border-cyan-200'
    }
  }
  if (categoryLower.includes('nickel')) {
    return {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200'
    }
  }
  if (categoryLower.includes('copper') || categoryLower.includes('brass') || categoryLower.includes('bronze')) {
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200'
    }
  }
  if (categoryLower.includes('magnesium')) {
    return {
      bg: 'bg-lime-50',
      text: 'text-lime-700',
      border: 'border-lime-200'
    }
  }
  if (categoryLower.includes('composite')) {
    return {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200'
    }
  }
  if (categoryLower.includes('ceramic')) {
    return {
      bg: 'bg-stone-50',
      text: 'text-stone-700',
      border: 'border-stone-200'
    }
  }
  // Default fallback
  return {
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    border: 'border-primary-200'
  }
}

export default function MaterialsDatabasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [materials, setMaterials] = useState<Material[]>([])
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Load materials on mount
  useEffect(() => {
    async function loadMaterials() {
      try {
        const allMaterials = await getAllMaterials()
        setMaterials(allMaterials)
        setFilteredMaterials(allMaterials)
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(allMaterials.map(m => m.category))).sort()
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error loading materials:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadMaterials()
  }, [])

  // Filter materials based on search and category
  useEffect(() => {
    async function filterMaterials() {
      if (loading) return

      let filtered = materials

      if (selectedCategory !== 'All') {
        try {
          filtered = await getMaterialsByCategory(selectedCategory)
        } catch (error) {
          console.error('Error filtering by category:', error)
          filtered = materials.filter(m => m.category === selectedCategory)
        }
      }

      if (searchQuery.trim()) {
        try {
          const searchResults = await searchMaterials(searchQuery)
          filtered = searchResults.filter(m => 
            selectedCategory === 'All' || m.category === selectedCategory
          )
        } catch (error) {
          console.error('Error searching materials:', error)
          // Fallback to client-side search
          const searchTerm = searchQuery.toLowerCase()
          filtered = filtered.filter(m =>
            m.name.toLowerCase().includes(searchTerm) ||
            m.category.toLowerCase().includes(searchTerm) ||
            m.composition.toLowerCase().includes(searchTerm) ||
            m.microstructure.toLowerCase().includes(searchTerm)
          )
        }
      }

      setFilteredMaterials(filtered)
      // Reset to page 1 when filters change
      setCurrentPage(1)
    }

    filterMaterials()
  }, [searchQuery, selectedCategory, materials, loading])

  // Calculate pagination
  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedMaterials = filteredMaterials.slice(startIndex, endIndex)

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Materials Database</h1>
          <p className="text-sm md:text-xl text-gray-600">
            Comprehensive database of material properties and preparation information for metallographic analysis.
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
              placeholder="Search materials by name, composition, or properties..."
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
                        {category}
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
                {selectedCategory}
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
        <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
          {loading ? (
            <p className="text-gray-600">Loading materials...</p>
          ) : (
            <>
              <p className="text-gray-600">
                Showing <span className="font-semibold">{startIndex + 1}</span>-
                <span className="font-semibold">{Math.min(endIndex, filteredMaterials.length)}</span> of{' '}
                <span className="font-semibold">{filteredMaterials.length}</span> material{filteredMaterials.length !== 1 ? 's' : ''}
              </p>
              {totalPages > 1 && (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center justify-center w-5 h-5 rounded transition-colors ${
                      currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-500">
                    Page <span className="font-semibold mx-0.5">{currentPage}</span> of{' '}
                    <span className="font-semibold mx-0.5">{totalPages}</span>
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center justify-center w-5 h-5 rounded transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Materials Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading materials...</p>
          </div>
        ) : filteredMaterials.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {paginatedMaterials.map(material => (
                <Link
                  key={material.id}
                  href={`/materials/${material.slug || material.id}`}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200 group"
                >
                  {/* Category badge */}
                  <div className="mb-3">
                    {(() => {
                      const colors = getCategoryBadgeColors(material.category)
                      return (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                          {material.category}
                        </span>
                      )
                    })()}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                    {material.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm mb-4">
                    {material.hardness && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-gray-500 flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5 text-gray-400" />
                          Hardness:
                        </span>
                        <span className="font-medium text-gray-900">{material.hardness}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-500 flex items-center gap-1.5 flex-shrink-0">
                        <Layers className="w-3.5 h-3.5 text-gray-400" />
                        Microstructure:
                      </span>
                      <span className="font-medium text-gray-900 text-right">{material.microstructure}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-primary-600 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-1 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary-400'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {(() => {
                    const pages: (number | 'ellipsis')[] = []
                    
                    // Always show first page
                    pages.push(1)
                    
                    // Determine which pages to show
                    if (totalPages <= 7) {
                      // Show all pages if 7 or fewer
                      for (let i = 2; i <= totalPages; i++) {
                        pages.push(i)
                      }
                    } else {
                      // Show ellipsis and selected pages
                      if (currentPage <= 3) {
                        // Near the start: 1 2 3 4 ... last
                        for (let i = 2; i <= 4; i++) {
                          pages.push(i)
                        }
                        pages.push('ellipsis')
                        pages.push(totalPages)
                      } else if (currentPage >= totalPages - 2) {
                        // Near the end: 1 ... (last-3) (last-2) (last-1) last
                        pages.push('ellipsis')
                        for (let i = totalPages - 3; i <= totalPages; i++) {
                          pages.push(i)
                        }
                      } else {
                        // In the middle: 1 ... (current-1) current (current+1) ... last
                        pages.push('ellipsis')
                        pages.push(currentPage - 1)
                        pages.push(currentPage)
                        pages.push(currentPage + 1)
                        pages.push('ellipsis')
                        pages.push(totalPages)
                      }
                    }
                    
                    return pages.map((page, index) => {
                      if (page === 'ellipsis') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                            ...
                          </span>
                        )
                      }
                      
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            currentPage === page
                              ? 'bg-primary-600 text-white border-primary-600 font-semibold'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary-400'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })
                  })()}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-1 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary-400'
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No materials found matching your search.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

