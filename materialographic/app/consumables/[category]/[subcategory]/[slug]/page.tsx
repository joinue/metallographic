'use client'

import Link from 'next/link'
import Image from 'next/image'
import { use, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { getSubcategoryMetadata } from '@/lib/supabase'
import type { SubcategoryMetadata, Consumable } from '@/lib/supabase'
import { ChevronRight, ArrowLeft } from 'lucide-react'
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

export default function ConsumableProductPage({ params }: { params: Promise<{ category: string; subcategory: string; slug: string }> }) {
  const { category, subcategory, slug } = use(params)
  const [consumable, setConsumable] = useState<Consumable | null>(null)
  const [subcategoryMeta, setSubcategoryMeta] = useState<SubcategoryMetadata | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()
        
        // Try to find consumable by slug first, then by item_id
        let { data, error } = await supabase
          .from('consumables')
          .select('*')
          .or(`slug.eq.${slug},item_id.ilike.${slug.toUpperCase()}`)
          .eq('status', 'active')
          .eq('is_active', true)
          .single()

        if (error && error.code === 'PGRST116') {
          // Try with lowercase item_id
          const { data: data2, error: error2 } = await supabase
            .from('consumables')
            .select('*')
            .ilike('item_id', slug.toUpperCase())
            .eq('status', 'active')
            .eq('is_active', true)
            .single()
          
          if (error2) {
            console.error('Consumable not found:', error2)
            return
          }
          data = data2
        } else if (error) {
          console.error('Error fetching consumable:', error)
          return
        }

        setConsumable(data)

        // Fetch subcategory metadata
        if (data?.subcategory) {
          const meta = await getSubcategoryMetadata(category, data.subcategory, 'consumables')
          setSubcategoryMeta(meta)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category, subcategory, slug])

  const categoryLabel = categoryLabels[category] || category
  const subcategoryLabel = subcategoryMeta?.subcategory_label || subcategory

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

  if (!consumable) {
    return (
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Consumable Not Found</h1>
            <p className="text-gray-600 mb-6">The consumable you're looking for doesn't exist.</p>
            <Link href={`/consumables/${category}`} className="btn-primary">
              Back to {categoryLabel}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4 sm:py-6 md:py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
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
          <Link 
            href={`/consumables/${category}/${subcategory}`}
            className="hover:text-primary-600 transition-colors"
          >
            {subcategoryLabel}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{consumable.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <div>
            {consumable.image_url && (
              <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={consumable.image_url}
                  alt={consumable.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {consumable.name}
            </h1>
            {consumable.item_id && (
              <p className="text-sm text-gray-500 mb-4">Item ID: {consumable.item_id}</p>
            )}
            {consumable.list_price && (
              <p className="text-2xl font-bold text-primary-600 mb-4">
                ${consumable.list_price.toFixed(2)}
              </p>
            )}
            {consumable.description && (
              <div className="prose prose-sm max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">{consumable.description}</p>
              </div>
            )}

            {/* Specifications */}
            {/* Note: Category-specific fields (size_mm, grit_size, type, material_composition) 
                are stored in category-specific tables and would need to be fetched separately */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="btn-primary text-center"
              >
                Request Quote
              </Link>
              {consumable.product_url && (
                <Link
                  href={consumable.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  View Product Page
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

