import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Facebook, Linkedin, Mail } from 'lucide-react'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/supabase'
import RelatedPosts from '@/components/RelatedPosts'
import ViewTracker from './ViewTracker'

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts('published')
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Metallography.org Blog`,
    description: post.excerpt,
    keywords: [
      'metallography',
      'sample preparation',
      'metallographic analysis',
      post.category.toLowerCase(),
      ...(post.tags || []),
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://metallography.org/blog/${slug}`,
      siteName: 'Metallography.org',
      images: [
        {
          url: post.image || '/logo.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.published_at || post.created_at || new Date().toISOString(),
      authors: post.author ? [post.author] : undefined,
      tags: post.tags || [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image || '/logo.png'],
    },
    alternates: {
      canonical: `https://metallography.org/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post || post.status !== 'published') {
    notFound()
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  // Article structured data
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://metallography.org${post.image || '/logo.png'}`,
    datePublished: post.published_at || post.created_at || new Date().toISOString(),
    dateModified: post.updated_at || post.created_at || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author || 'Metallography.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Metallography.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metallography.org/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://metallography.org/blog/${slug}`,
    },
    articleSection: post.category,
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://metallography.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://metallography.org/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://metallography.org/blog/${slug}`,
      },
    ],
  }

  return (
    <>
      <ViewTracker slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <article className="min-h-screen bg-white">
        <div className="container-custom py-6 md:py-16">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 md:mb-12 transition-colors text-sm md:text-base font-medium"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Back to Blog
          </Link>

            {/* Header */}
            <header className="mb-6 md:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-6 text-xs md:text-base text-gray-500">
                <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full text-xs md:text-sm font-semibold border border-primary-100">
                  {post.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  <time dateTime={post.published_at || post.created_at || ''} className="font-medium">
                    {formatDate(post.published_at || post.created_at)}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  <span className="font-medium">{post.read_time || '2 min read'}</span>
                </div>
                {post.author && (
                  <span className="font-medium text-xs md:text-base">by {post.author}</span>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="relative h-48 md:h-96 lg:h-[32rem] w-full mb-6 md:mb-12 rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-gray-100 -mx-4 sm:mx-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-sm md:prose-lg lg:prose-xl prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700 prose-img:rounded-xl prose-img:shadow-md mb-8 md:mb-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Social Sharing */}
            <div className="mb-8 md:mb-16 pt-6 md:pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span className="text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Share:
                </span>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://metallography.org/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs md:text-sm font-medium"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Twitter</span>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://metallography.org/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs md:text-sm font-medium"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Facebook</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://metallography.org/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs md:text-sm font-medium"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: https://metallography.org/blog/${post.slug}`)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-xs md:text-sm font-medium"
                    aria-label="Share via Email"
                  >
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Email</span>
                  </a>
                </div>
              </div>
            </div>

          {/* CTA */}
          <div className="mt-8 md:mt-20 p-5 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl md:rounded-2xl border border-gray-200">
            <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 text-gray-900">Want to Learn More?</h3>
            <p className="text-base md:text-xl text-gray-600 mb-4 md:mb-6 leading-relaxed">
              Explore our comprehensive guides for detailed step-by-step instructions on sample preparation techniques.
            </p>
            <Link href="/guides" className="btn-primary text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3.5">
              Browse Guides
            </Link>
          </div>

          {/* Related Posts */}
          <RelatedPosts currentPost={post} limit={3} />
        </div>
      </article>
    </>
  )
}

