'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react'
import { glossaryTerms, type GlossaryTerm } from '@/data/glossary'

const categories: GlossaryTerm['category'][] = ['Microstructure', 'Sample Preparation', 'Equipment', 'Material Science', 'Analysis', 'General']

// Component to handle truncation detection and expand/collapse
function DefinitionText({ 
  term, 
  definition, 
  isExpanded, 
  onToggle 
}: { 
  term: string
  definition: string
  isExpanded: boolean
  onToggle: () => void
}) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    const checkTruncation = () => {
      if (!textRef.current || isExpanded) {
        setIsTruncated(false)
        return
      }

      // Create a hidden clone element to measure full text height without line-clamp
      const clone = textRef.current.cloneNode(true) as HTMLElement
      clone.style.position = 'absolute'
      clone.style.visibility = 'hidden'
      clone.style.height = 'auto'
      clone.style.maxHeight = 'none'
      clone.style.overflow = 'visible'
      clone.style.webkitLineClamp = 'none'
      clone.style.display = 'block'
      clone.style.width = textRef.current.offsetWidth + 'px'
      
      document.body.appendChild(clone)
      const fullHeight = clone.offsetHeight
      document.body.removeChild(clone)
      
      // Compare full height to the clamped height
      const clampedHeight = textRef.current.offsetHeight
      const isTextTruncated = fullHeight > clampedHeight + 2 // Add 2px tolerance for rounding
      setIsTruncated(isTextTruncated)
    }

    // Use requestAnimationFrame to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(checkTruncation)
    }, 0)

    // Also check on window resize
    window.addEventListener('resize', checkTruncation)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkTruncation)
    }
  }, [definition, isExpanded])

  return (
    <div className="mb-2">
      <p 
        ref={textRef}
        className={`text-sm text-gray-700 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}
      >
        {definition}
      </p>
      {(isTruncated || isExpanded) && (
        <button
          onClick={onToggle}
          className="mt-1 text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Show less</span>
              <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              <span>Read more</span>
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<GlossaryTerm['category'] | 'All'>('All')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set())

  // Get unique first letters for A-Z navigation
  const letters = useMemo(() => {
    const uniqueLetters = Array.from(new Set(glossaryTerms.map(term => term.term.charAt(0).toUpperCase())))
    return uniqueLetters.sort()
  }, [])

  // Filter terms based on search, category, and letter
  const filteredTerms = useMemo(() => {
    let filtered = glossaryTerms

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(term => term.category === selectedCategory)
    }

    // Filter by letter
    if (selectedLetter) {
      filtered = filtered.filter(term => term.term.charAt(0).toUpperCase() === selectedLetter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        term.relatedTerms?.some(rt => rt.toLowerCase().includes(query))
      )
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.term.localeCompare(b.term))
  }, [searchQuery, selectedCategory, selectedLetter])

  // Group terms by first letter for display
  const termsByLetter = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {}
    filteredTerms.forEach(term => {
      const letter = term.term.charAt(0).toUpperCase()
      if (!grouped[letter]) {
        grouped[letter] = []
      }
      grouped[letter].push(term)
    })
    return grouped
  }, [filteredTerms])

  const categoryColors: Record<string, string> = {
    'Microstructure': 'bg-blue-100 text-blue-700 border-blue-200',
    'Sample Preparation': 'bg-green-100 text-green-700 border-green-200',
    'Equipment': 'bg-purple-100 text-purple-700 border-purple-200',
    'Material Science': 'bg-orange-100 text-orange-700 border-orange-200',
    'Analysis': 'bg-pink-100 text-pink-700 border-pink-200',
    'General': 'bg-gray-100 text-gray-700 border-gray-200',
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Metallography Glossary</h1>
          <p className="text-base text-gray-600 max-w-3xl mb-3">
            Comprehensive dictionary of metallography terms, definitions, and concepts. 
            Search or browse to understand technical terminology used throughout our guides.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{glossaryTerms.length} terms</span>
            <span>•</span>
            <span>6 categories</span>
            <span>•</span>
            <span>Fully searchable</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSelectedLetter(null)
              }}
              placeholder="Search for terms, definitions, or related concepts..."
              className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 placeholder-gray-400 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSelectedLetter(null)
              }}
              className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setSelectedLetter(null)
                }}
                className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* A-Z Navigation */}
          {!searchQuery && selectedCategory === 'All' && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-medium text-gray-600 mr-1">Jump to:</span>
              {letters.map(letter => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(selectedLetter === letter ? null : letter)
                    setSearchQuery('')
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    selectedLetter === letter
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {letter}
                </button>
              ))}
              {selectedLetter && (
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Active Filters Display */}
          {(selectedCategory !== 'All' || selectedLetter || searchQuery) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium flex items-center gap-2">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedLetter && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium flex items-center gap-2">
                  Letter: {selectedLetter}
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium flex items-center gap-2">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredTerms.length}</span> term{filteredTerms.length !== 1 ? 's' : ''} found
            {selectedCategory !== 'All' && <span className="text-gray-500"> in {selectedCategory}</span>}
          </p>
        </div>

        {/* Terms Display */}
        {filteredTerms.length > 0 ? (
          <div className="space-y-6">
            {Object.keys(termsByLetter).sort().map(letter => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300">
                  {letter}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {termsByLetter[letter].map((term) => {
                    const termId = term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    return (
                    <div
                      key={term.term}
                      id={termId}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary-400 hover:shadow-sm transition-all scroll-mt-24 group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
                          {term.term}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold border flex-shrink-0 ${categoryColors[term.category]}`}>
                          {term.category.split(' ')[0]}
                        </span>
                      </div>
                      
                      <DefinitionText
                        term={term.term}
                        definition={term.definition}
                        isExpanded={expandedTerms.has(term.term)}
                        onToggle={() => {
                          setExpandedTerms(prev => {
                            const newSet = new Set(prev)
                            if (newSet.has(term.term)) {
                              newSet.delete(term.term)
                            } else {
                              newSet.add(term.term)
                            }
                            return newSet
                          })
                        }}
                      />

                      {term.example && (
                        <div className="bg-blue-50 border-l-2 border-blue-500 p-2 rounded mb-2">
                          <p className="text-xs text-gray-700">
                            <strong className="text-blue-900">Ex:</strong> {term.example}
                          </p>
                        </div>
                      )}

                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex flex-wrap gap-1.5">
                            {term.relatedTerms.slice(0, 3).map(relatedTerm => {
                              const relatedTermData = glossaryTerms.find(t => t.term === relatedTerm)
                              return relatedTermData ? (
                                <button
                                  key={relatedTerm}
                                  onClick={() => {
                                    const relatedTermId = relatedTerm.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                                    setSearchQuery('')
                                    setSelectedCategory('All')
                                    setSelectedLetter(null)
                                    setTimeout(() => {
                                      const element = document.getElementById(relatedTermId)
                                      if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                        element.classList.add('ring-2', 'ring-primary-500')
                                        setTimeout(() => {
                                          element.classList.remove('ring-2', 'ring-primary-500')
                                        }, 2000)
                                      }
                                    }, 100)
                                  }}
                                  className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-xs hover:bg-primary-50 hover:text-primary-700 transition-colors cursor-pointer"
                                >
                                  {relatedTerm}
                                </button>
                              ) : null
                            })}
                            {term.relatedTerms.length > 3 && (
                              <span className="px-2 py-0.5 text-xs text-gray-400">
                                +{term.relatedTerms.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-2">No terms found</p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-gray-700 mb-6">
            Explore our comprehensive guides to learn more about these terms in context.
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

