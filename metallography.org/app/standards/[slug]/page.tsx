import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getStandardBySlug, getAllStandards, getStandardsByCategory, type Standard } from '@/lib/supabase'
import type { Metadata } from 'next'
import { ExternalLink, BookOpen, FileText, Tag } from 'lucide-react'

interface StandardPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const standards = await getAllStandards()
    return standards
      .filter((standard) => standard.slug)
      .map((standard) => ({
        slug: standard.slug!,
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: StandardPageProps): Promise<Metadata> {
  const { slug } = await params
  const standard = await getStandardBySlug(slug)
  
  if (!standard) {
    return {
      title: 'Standard Not Found | Metallography.org',
    }
  }

  const title = `${standard.standard} - ${standard.title} | Standards Database | Metallography.org`
  const description = standard.description || `${standard.standard}: ${standard.title}. ${standard.category} standard for metallography.`
  const url = `https://metallography.org/standards/${slug}`
  const imageUrl = 'https://metallography.org/logo.png'

  return {
    title,
    description,
    keywords: [
      'metallography',
      'standards',
      'ASTM',
      'ISO',
      standard.standard,
      standard.category.toLowerCase(),
      ...(standard.organization ? [standard.organization.toLowerCase()] : []),
      ...(standard.tags || []),
    ],
    openGraph: {
      title: `${standard.standard} - ${standard.title}`,
      description,
      url,
      siteName: 'Metallography.org',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${standard.standard} - Metallography Standard Information`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${standard.standard} - ${standard.title}`,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

const categoryColors: Record<string, string> = {
  'Preparation': 'bg-blue-100 text-blue-700 border-blue-200',
  'Etching': 'bg-purple-100 text-purple-700 border-purple-200',
  'Analysis': 'bg-green-100 text-green-700 border-green-200',
  'Testing': 'bg-orange-100 text-orange-700 border-orange-200',
  'Documentation': 'bg-pink-100 text-pink-700 border-pink-200',
  'Calibration': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Reference': 'bg-gray-100 text-gray-700 border-gray-200',
}

const organizationColors: Record<string, string> = {
  'ASTM': 'bg-red-100 text-red-700 border-red-200',
  'ISO': 'bg-blue-100 text-blue-700 border-blue-200',
  'SAE': 'bg-green-100 text-green-700 border-green-200',
  'ASME': 'bg-purple-100 text-purple-700 border-purple-200',
}

export default async function StandardPage({ params }: StandardPageProps) {
  const { slug } = await params
  const standard = await getStandardBySlug(slug)

  if (!standard) {
    notFound()
  }

  // Get related standards in the same category
  let relatedStandards: Standard[] = []
  try {
    const categoryStandards = await getStandardsByCategory(standard.category)
    relatedStandards = categoryStandards
      .filter(s => s.id !== standard.id)
      .slice(0, 6)
  } catch (error) {
    console.error('Error loading related standards:', error)
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <Link href="/">Home</Link> / <Link href="/standards">Standards Database</Link> / {standard.standard}
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{standard.standard}</h1>
              <p className="text-2xl text-gray-700 mb-4">{standard.title}</p>
            </div>
            {standard.organization && (
              <span className={`ml-4 px-4 py-2 rounded-lg text-sm font-semibold border ${
                organizationColors[standard.organization] || 'bg-gray-100 text-gray-700 border-gray-200'
              }`}>
                {standard.organization}
              </span>
            )}
          </div>

          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-3">
            {standard.category && (
              <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
                categoryColors[standard.category] || 'bg-gray-100 text-gray-700 border-gray-200'
              }`}>
                {standard.category}
              </span>
            )}
            {standard.tags && standard.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {standard.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-600" />
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{standard.description}</p>
            </div>

            {/* Scope */}
            {standard.scope && (
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  Scope
                </h2>
                <p className="text-gray-700 leading-relaxed">{standard.scope}</p>
              </div>
            )}

            {/* Key Procedures */}
            {standard.key_procedures && standard.key_procedures.length > 0 && (
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Key Procedures</h2>
                <ul className="space-y-2">
                  {standard.key_procedures.map((procedure, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-primary-600 mt-1">•</span>
                      <span>{procedure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applicable Materials */}
            {standard.applicable_materials && standard.applicable_materials.length > 0 && (
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Applicable Materials</h2>
                <div className="flex flex-wrap gap-2">
                  {standard.applicable_materials.map((material, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Standard Information</h3>
              <div className="space-y-3">
                {standard.official_url && (
                  <a
                    href={standard.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Official Standard Page
                  </a>
                )}
                {standard.purchase_url && (
                  <a
                    href={standard.purchase_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Purchase Standard
                  </a>
                )}
                {!standard.official_url && !standard.purchase_url && (
                  <p className="text-sm text-gray-600">
                    Visit {standard.organization || 'the organization'}'s website to purchase or access this standard.
                  </p>
                )}
              </div>
            </div>

            {/* Related Topics */}
            {standard.related_topics && standard.related_topics.length > 0 && (
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {standard.related_topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Standards */}
            {relatedStandards.length > 0 && (
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Related Standards</h3>
                <div className="space-y-2">
                  {relatedStandards.map((related) => (
                    <Link
                      key={related.id}
                      href={`/standards/${related.slug || related.id}`}
                      className="block text-primary-600 hover:text-primary-700 hover:underline text-sm"
                    >
                      {related.standard} - {related.title.substring(0, 60)}
                      {related.title.length > 60 ? '...' : ''}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/standards?category=${encodeURIComponent(standard.category)}`}
                  className="block mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View all {standard.category} standards →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Back to Database */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <Link
            href="/standards"
            className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2"
          >
            ← Back to Standards Database
          </Link>
        </div>
      </div>
    </div>
  )
}

