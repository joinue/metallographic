import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import GuidesClient from '@/components/GuidesClient'
import { guides } from '@/data/guides'

export const metadata: Metadata = {
  title: 'Metallographic Sample Preparation Guides | Metallography.org',
  description: 'Comprehensive step-by-step guides for metallographic sample preparation. Learn grinding, polishing, etching, and material-specific preparation techniques. Free educational resources for metallographers.',
  keywords: [
    'metallography guides',
    'sample preparation',
    'metallographic techniques',
    'grinding techniques',
    'polishing methods',
    'etching procedures',
    'stainless steel preparation',
    'aluminum sample preparation',
    'metallographic analysis',
    'microstructure analysis',
  ],
  openGraph: {
    title: 'Metallographic Sample Preparation Guides | Metallography.org',
    description: 'Comprehensive step-by-step guides for metallographic sample preparation. Learn grinding, polishing, etching, and material-specific preparation techniques.',
    url: 'https://metallography.org/guides',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Metallography.org - Sample Preparation Guides',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metallographic Sample Preparation Guides',
    description: 'Comprehensive step-by-step guides for metallographic sample preparation. Learn grinding, polishing, etching, and material-specific techniques.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/guides',
  },
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  // Await searchParams in Next.js 15+
  const params = await searchParams
  
  // Create structured data for CollectionPage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Metallographic Sample Preparation Guides',
    description: 'Comprehensive step-by-step guides for metallographic sample preparation',
    url: 'https://metallography.org/guides',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Course',
          name: guide.title,
          description: guide.description,
          url: `https://metallography.org/guides/${guide.slug}`,
          educationalLevel: guide.difficulty,
          timeRequired: guide.readTime,
        },
      })),
    },
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
        name: 'Guides',
        item: 'https://metallography.org/guides',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          {/* Header Section */}
          <div className="mb-3 sm:mb-4 md:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1.5 sm:mb-2 text-gray-900">Sample Preparation Guides</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
              Guides organized by topic: <strong>Basics</strong>, <strong>Process</strong>, 
              <strong> Material-Specific</strong>, and <strong>Application-Specific</strong>.
            </p>
          </div>

          <Suspense fallback={<div className="py-8">Loading guides...</div>}>
            <GuidesClient initialCategory={params.category} />
          </Suspense>

          {/* CTA Section */}
          <div className="mt-8 sm:mt-12 md:mt-20">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Explore Material-Specific Procedures</h2>
              <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-gray-600 leading-relaxed px-2 sm:px-0">
                Browse our comprehensive collection of procedure guides for material-specific preparation methods and get personalized recommendations.
              </p>
              <p className="text-sm sm:text-base mb-6 sm:mb-8 text-gray-500 px-2 sm:px-0">
                Find procedures for your materials, get product suggestions, and optimize your workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link 
                  href="/guides?category=Material-Specific"
                  className="btn-primary w-full sm:w-auto"
                >
                  Browse Procedure Guides
                </Link>
                <Link 
                  href="/resources"
                  className="btn-tertiary w-full sm:w-auto"
                >
                  View Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
