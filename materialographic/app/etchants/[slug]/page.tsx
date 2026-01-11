import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEtchantBySlug, getAllEtchants, getPaceProductUrl } from '@/lib/supabase'
import type { Metadata } from 'next'
import { ExternalLink, AlertTriangle, FlaskConical, Clock, Thermometer, Zap, Shield } from 'lucide-react'
import EtchantTabs from './EtchantTabs'

interface EtchantPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const etchants = await getAllEtchants()
    return etchants
      .filter((etchant) => etchant.slug)
      .map((etchant) => ({
        slug: etchant.slug!,
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: EtchantPageProps): Promise<Metadata> {
  const { slug } = await params
  const etchant = await getEtchantBySlug(slug)
  
  if (!etchant) {
    return {
      title: 'Etchant Not Found | Metallography.org',
    }
  }

  const title = `${etchant.name} - Etchants Database | Metallography.org`
  const description = `${etchant.name}: ${etchant.composition}. ${etchant.reveals || 'Metallographic etchant'}. ${etchant.application_method ? `Application: ${etchant.application_method}` : ''}`
  const url = `https://metallography.org/etchants/${slug}`
  const imageUrl = 'https://metallography.org/logo.png'

  return {
    title,
    description,
    keywords: [
      'metallography',
      'etching',
      'metallographic etchant',
      etchant.name.toLowerCase(),
      etchant.composition.toLowerCase(),
      ...(etchant.category ? [etchant.category.toLowerCase()] : []),
      ...(etchant.tags || []),
    ],
    openGraph: {
      title: `${etchant.name} - Etchants Database`,
      description,
      url,
      siteName: 'Metallography.org',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${etchant.name} - Metallography Etchant Information`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${etchant.name} - Etchants Database`,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function EtchantPage({ params }: EtchantPageProps) {
  const { slug } = await params
  const etchant = await getEtchantBySlug(slug)

  if (!etchant) {
    notFound()
  }

  const paceUrl = getPaceProductUrl(etchant)

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <Link href="/">Home</Link> / <Link href="/etchants">Etchants Database</Link> / {etchant.name}
        </nav>

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{etchant.name}</h1>
              {etchant.category && (
                <p className="text-lg text-gray-600 capitalize">{etchant.category.replace('-', ' ')}</p>
              )}
            </div>
            {paceUrl && (
              <Link
                href={paceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Buy from PACE
              </Link>
            )}
          </div>
        </header>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-500">Composition</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{etchant.composition}</p>
            {etchant.concentration && (
              <p className="text-xs text-gray-600 mt-1">{etchant.concentration}</p>
            )}
          </div>

          {etchant.application_method && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-gray-500">Method</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 capitalize">{etchant.application_method}</p>
            </div>
          )}

          {etchant.typical_time_seconds && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-gray-500">Time</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{etchant.typical_time_seconds}s</p>
            </div>
          )}

          {etchant.hazards && etchant.hazards.length > 0 && (
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">Hazards</span>
              </div>
              <p className="text-sm font-semibold text-amber-900">{etchant.hazards.join(', ')}</p>
            </div>
          )}
        </div>

        {/* Safety Warning */}
        {etchant.hazards && etchant.hazards.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-amber-900 mb-1">Safety Warning</h3>
                {etchant.safety_notes && (
                  <p className="text-sm text-amber-800 mb-2">{etchant.safety_notes}</p>
                )}
                {etchant.ppe_required && etchant.ppe_required.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-amber-700 mb-1">Required PPE:</p>
                    <ul className="list-disc list-inside text-xs text-amber-800">
                      {etchant.ppe_required.map((ppe, index) => (
                        <li key={index}>{ppe}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tabbed Content */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <EtchantTabs etchant={etchant} />
        </div>
      </div>
    </div>
  )
}

