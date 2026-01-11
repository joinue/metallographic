'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Calendar, Clock, ArrowRight, Tag, Search, X, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import type { BlogPost } from '@/lib/supabase'

interface BlogClientProps {
  initialPosts: BlogPost[]
}

const ITEMS_PER_PAGE = 12

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category') || 'All'
  const tagParam = searchParams.get('tag') || ''
  const pageParam = parseInt(searchParams.get('page') || '1', 10)
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedTag, setSelectedTag] = useState(tagParam)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(pageParam)

  // Sync state with URL when it changes externally
  useEffect(() => {
    const category = searchParams.get('category') || 'All'
    const tag = searchParams.get('tag') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    setSelectedCategory(category)
    setSelectedTag(tag)
    setCurrentPage(page)
  }, [searchParams])

  // Get unique categories and tags from posts
  const categories = useMemo(() => {
    const cats = new Set(initialPosts.map(post => post.category).filter(Boolean))
    return ['All', ...Array.from(cats).sort()]
  }, [initialPosts])

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    initialPosts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagSet.add(tag))
      }
    })
    return Array.from(tagSet).sort()
  }, [initialPosts])

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = [...initialPosts]

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags && Array.isArray(post.tags) && post.tags.includes(selectedTag)
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    }

    return filtered
  }, [initialPosts, selectedCategory, selectedTag, searchQuery])

  // Featured posts (first 3 posts, or most recent if no featured flag)
  const featuredPosts = useMemo(() => {
    return filteredPosts.slice(0, 3)
  }, [filteredPosts])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change (but not on initial mount)
  useEffect(() => {
    // Only reset if filters actually changed (not on initial mount)
    const category = searchParams.get('category') || 'All'
    const tag = searchParams.get('tag') || ''
    
    if (selectedCategory !== category || selectedTag !== tag) {
      setCurrentPage(1)
    }
  }, [selectedCategory, selectedTag, searchParams])

  const updateURL = (category: string, tag: string, page: number) => {
    const params = new URLSearchParams()
    if (category !== 'All') params.set('category', category)
    if (tag) params.set('tag', tag)
    if (page > 1) params.set('page', page.toString())
    
    const queryString = params.toString()
    router.push(`/blog${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateURL(category, selectedTag, 1)
  }

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag('')
      updateURL(selectedCategory, '', 1)
    } else {
      setSelectedTag(tag)
      updateURL(selectedCategory, tag, 1)
    }
  }

  const clearFilters = () => {
    setSelectedCategory('All')
    setSelectedTag('')
    setSearchQuery('')
    setCurrentPage(1)
    router.push('/blog', { scroll: false })
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    updateURL(selectedCategory, selectedTag, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const hasActiveFilters = selectedCategory !== 'All' || selectedTag || searchQuery.trim()

  return (
    <>
      {/* Compact Search and Filters Row */}
      <div className="mb-4 space-y-3">
        {/* Search and Category in one row on larger screens */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:overflow-visible">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
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

        {/* Active Filters and Results Count - Compact */}
        {(hasActiveFilters || filteredPosts.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
            {hasActiveFilters && (
              <>
                {selectedCategory !== 'All' && (
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium flex items-center gap-1">
                    {selectedCategory}
                    <button
                      onClick={() => handleCategoryChange('All')}
                      className="hover:text-primary-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium flex items-center gap-1">
                    {selectedTag}
                    <button
                      onClick={() => handleTagClick(selectedTag)}
                      className="hover:text-primary-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium flex items-center gap-1">
                    "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-primary-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  Clear all
                </button>
                <span className="text-gray-400">•</span>
              </>
            )}
            {filteredPosts.length > 0 && (
              <span>
                {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
              </span>
            )}
            {filteredPosts.length === 0 && !hasActiveFilters && (
              <span>No blog posts found.</span>
            )}
          </div>
        )}
      </div>

      {/* Featured Posts Section - Compact, only on first page with no filters */}
      {currentPage === 1 && !hasActiveFilters && featuredPosts.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
            <h2 className="text-lg font-bold text-gray-900">Featured</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.slug} post={post} formatDate={formatDate} />
            ))}
          </div>
        </div>
      )}

      {/* Blog Posts */}
      {paginatedPosts.length > 0 ? (
        <>
          <div className="space-y-4 md:space-y-6 mb-8">
            {paginatedPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} formatDate={formatDate} onTagClick={handleTagClick} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mb-12">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 border rounded-lg ${
                          currentPage === page
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>
                  }
                  return null
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No blog posts found matching your criteria.</p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Popular Tags */}
      {allTags.length > 0 && !hasActiveFilters && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 20).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function FeaturedPostCard({ post, formatDate }: { post: BlogPost; formatDate: (date: string | null | undefined) => string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200"
    >
      <div className="relative w-full h-32 bg-gray-100">
        <Image
          src={post.image || '/logo.png'}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
          <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full font-semibold text-xs">
            {post.category}
          </span>
        </div>
        <h3 className="text-sm font-bold mb-1 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  )
}

function BlogPostCard({ 
  post, 
  formatDate, 
  onTagClick 
}: { 
  post: BlogPost
  formatDate: (date: string | null | undefined) => string
  onTagClick: (tag: string) => void
}) {
  return (
    <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <Link href={`/blog/${post.slug}`} className="relative w-full sm:w-40 md:w-48 h-40 sm:h-auto flex-shrink-0 bg-gray-100 block">
          <Image
            src={post.image || '/logo.png'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 192px"
          />
        </Link>
        
        {/* Content */}
        <div className="flex-1 p-3 md:p-4">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1.5">
            <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
              {post.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.published_at || post.created_at || ''}>
                {formatDate(post.published_at || post.created_at)}
              </time>
            </div>
            {post.read_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.read_time}</span>
              </div>
            )}
          </div>
          
          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-base md:text-lg font-bold mb-1.5 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h2>
          </Link>
          
          {/* Excerpt */}
          <p className="text-sm text-gray-600 mb-2 line-clamp-2 leading-snug">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <Tag className="w-3 h-3 text-gray-400" />
              {post.tags.slice(0, 3).map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.preventDefault()
                    onTagClick(tag)
                  }}
                  className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
              )}
            </div>
          )}
          
          {/* Read More Link */}
          <Link href={`/blog/${post.slug}`} className="text-primary-600 font-semibold text-xs inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
            Read More
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}

