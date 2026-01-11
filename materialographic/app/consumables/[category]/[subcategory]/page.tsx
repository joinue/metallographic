'use client'

import Link from 'next/link'
import Image from 'next/image'
import { use, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { getSubcategoryMetadata, getConsumablesBySubcategory } from '@/lib/supabase'
import type { SubcategoryMetadata, Consumable } from '@/lib/supabase'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import AnimatedCard from '@/components/AnimatedCard'
import LoadingSpinner from '@/components/LoadingSpinner'

const categoryLabels: Record<string, string> = {
  'sectioning': 'Sectioning',
  'mounting': 'Mounting',
  'grinding-lapping': 'Grinding & Lapping',
  'polishing': 'Polishing',
  'etching': 'Etching',
  'cleaning': 'Cleaning',
  'hardness-testing': 'Hardness Testing',
}

export default function ConsumablesSubcategoryPage({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const { category, subcategory } = use(params)
  const [subcategoryMeta, setSubcategoryMeta] = useState<SubcategoryMetadata | null>(null)
  const [consumables, setConsumables] = useState<Consumable[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subcategory metadata
        const meta = await getSubcategoryMetadata(category, subcategory, 'consumables')
        setSubcategoryMeta(meta)

        // Fetch all consumables in this subcategory
        const items = await getConsumablesBySubcategory(category, subcategory)
        setConsumables(items)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category, subcategory])

  const categoryLabel = categoryLabels[category] || category
  // Convert slug to proper label (e.g., "abrasive-blades" -> "Abrasive Blades")
  const slugToLabel = (slug: string): string => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  const subcategoryLabel = subcategoryMeta?.subcategory_label || slugToLabel(subcategory)

  if (loading) {
    return (
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          <div className="text-center py-12">
            <LoadingSpinner size="md" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4 sm:py-6 md:py-12">
      <div className="container-custom">
        {/* Header Section */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link 
              href="/consumables"
              className="hover:text-primary-600 transition-colors"
            >
              Consumables
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link 
              href={`/consumables/${category}`}
              className="hover:text-primary-600 transition-colors"
            >
              {categoryLabel}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{subcategoryLabel}</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{subcategoryLabel}</h1>
          </div>
          {subcategoryMeta?.description && (
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
              {subcategoryMeta.description}
            </p>
          )}
        </div>

        {/* Consumables Grid */}
        {consumables.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {consumables.map((item, index) => (
              <AnimatedCard key={item.id} index={index} animation="fadeInUp" duration={500}>
                <Link 
                  href={`/consumables/${category}/${subcategory}/${item.slug || item.item_id?.toLowerCase()}`}
                  className="card hover:border-gray-300 group p-4 sm:p-6"
                >
                  {item.image_url && (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                  {item.item_id && (
                    <p className="text-xs text-gray-500 mb-2">Item ID: {item.item_id}</p>
                  )}
                  {item.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  {item.list_price && (
                    <p className="text-sm font-semibold text-gray-900 mb-2">${item.list_price.toFixed(2)}</p>
                  )}
                  <span className="text-primary-600 font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No consumables found in this subcategory.</p>
          </div>
        )}
      </div>
    </div>
  )
}

