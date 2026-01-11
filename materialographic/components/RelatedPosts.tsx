import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/supabase'
import { getAllBlogPosts } from '@/lib/supabase'

interface RelatedPostsProps {
  currentPost: BlogPost
  limit?: number
}

export default async function RelatedPosts({ currentPost, limit = 3 }: RelatedPostsProps) {
  let allPosts: BlogPost[] = []
  try {
    allPosts = await getAllBlogPosts('published')
  } catch (error) {
    console.error('Error fetching posts for related posts:', error)
    return null
  }

  // Filter out current post
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug)

  // Find related posts by:
  // 1. Same category
  // 2. Shared tags
  // 3. Similar title/excerpt keywords
  const related: BlogPost[] = []
  
  // Same category posts
  const sameCategory = otherPosts.filter(
    post => post.category === currentPost.category
  )
  related.push(...sameCategory.slice(0, limit))

  // If not enough, add posts with shared tags
  if (related.length < limit && currentPost.tags && Array.isArray(currentPost.tags)) {
    const withSharedTags = otherPosts.filter(post => {
      if (!post.tags || !Array.isArray(post.tags)) return false
      if (related.some(r => r.slug === post.slug)) return false
      return post.tags.some(tag => currentPost.tags!.includes(tag))
    })
    related.push(...withSharedTags.slice(0, limit - related.length))
  }

  // If still not enough, add most recent posts
  if (related.length < limit) {
    const recent = otherPosts
      .filter(post => !related.some(r => r.slug === post.slug))
      .slice(0, limit - related.length)
    related.push(...recent)
  }

  if (related.length === 0) return null

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {related.slice(0, limit).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-400 hover:shadow-lg transition-all duration-200 flex flex-col"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={post.image || '/logo.png'}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={post.published_at || post.created_at || ''}>
                    {formatDate(post.published_at || post.created_at)}
                  </time>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow line-clamp-2">
                {post.excerpt}
              </p>
              <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1.5 group-hover:gap-2 transition-all">
                Read More
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

