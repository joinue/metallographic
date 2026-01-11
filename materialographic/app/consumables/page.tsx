'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Scissors, Package, Gauge, FlaskConical, HardDrive } from 'lucide-react'
import AnimatedCard from '@/components/AnimatedCard'
import LoadingSpinner from '@/components/LoadingSpinner'

// Process order for consumables categories
const categoryOrder = ['sectioning', 'mounting', 'grinding-lapping', 'polishing', 'etching', 'hardness-testing']
const categoryLabels: Record<string, string> = {
  'sectioning': 'Sectioning',
  'mounting': 'Mounting',
  'grinding-lapping': 'Grinding & Lapping',
  'polishing': 'Polishing',
  'etching': 'Etching',
  'hardness-testing': 'Hardness Testing',
}

const categoryIcons: Record<string, typeof Scissors> = {
  'sectioning': Scissors,
  'mounting': Package,
  'grinding-lapping': Gauge,
  'polishing': Gauge,
  'etching': FlaskConical,
  'hardness-testing': HardDrive,
}

const categoryDescriptions: Record<string, string> = {
  'sectioning': 'Cutting blades, fluids, and accessories for sectioning samples.',
  'mounting': 'Mounting resins, molds, and accessories for compression and castable mounting.',
  'grinding-lapping': 'Grinding papers, powders, lapping films, and grinding accessories.',
  'polishing': 'Polishing compounds, pads, cloths, and final polishing materials.',
  'etching': 'Etchants and reagents for revealing microstructures.',
  'hardness-testing': 'Accessories and supplies for hardness testing equipment.',
}

// Cover images for each category
const categoryCoverImages: Record<string, string> = {
  'sectioning': '/images/consumables/sectioning-cover.webp',
  'mounting': '/images/consumables/mounting-cover.webp',
  'grinding-lapping': '/images/consumables/grinding & lapping-cover.webp',
  'polishing': '/images/consumables/polishing-cover.webp',
  'etching': '/images/consumables/etching-cleaning-cover.webp',
  'hardness-testing': '/images/consumables/hardness-testing-cover.webp',
}

// Shop collection URLs for each category
const categoryShopUrls: Record<string, string> = {
  'sectioning': 'https://shop.metallographic.com/collections/cutting',
  'mounting': 'https://shop.metallographic.com/collections/mounting',
  'grinding-lapping': 'https://shop.metallographic.com/collections/grinding',
  'polishing': 'https://shop.metallographic.com/collections/polishing',
  'etching': 'https://shop.metallographic.com/collections/etching-and-cleaning',
  'hardness-testing': 'https://shop.metallographic.com/collections/hardness-testing',
}

function ConsumablesPageContent() {

  return (
    <div className="py-4 sm:py-6 md:py-12">
      <div className="container-custom">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-gray-900">Consumables</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl">
            Browse our complete range of consumables and accessories organized by process step. Select a category to view all products in that section.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8 md:mb-12">
          {categoryOrder.map((categoryKey, index) => {
            const categoryLabel = categoryLabels[categoryKey]
            const categoryDescription = categoryDescriptions[categoryKey]
            const IconComponent = categoryIcons[categoryKey] || Package
            const coverImage = categoryCoverImages[categoryKey]
            const shopUrl = categoryShopUrls[categoryKey]

            return (
              <AnimatedCard key={categoryKey} index={index} animation="fadeInUp" duration={500}>
                <div className="card hover:border-primary-400 hover:shadow-lg group overflow-hidden h-full flex flex-col transition-all duration-300">
                  {/* Cover Image */}
                  {coverImage && (
                    <Link href={`/consumables/${categoryKey}`} className="block">
                      <div className="relative w-full h-48 sm:h-56 mb-4 rounded-lg overflow-hidden bg-white p-2 sm:p-3">
                        <Image
                          src={coverImage}
                          alt={categoryLabel}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </Link>
                  )}

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <Link href={`/consumables/${categoryKey}`} className="flex items-center gap-2 mb-2 group/title">
                      <IconComponent className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover/title:text-primary-600 transition-colors">
                        {categoryLabel}
                      </h2>
                    </Link>
                    
                    <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow leading-relaxed">
                      {categoryDescription}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto pt-3 border-t border-gray-200">
                      <Link 
                        href={`/consumables/${categoryKey}`}
                        className="btn-primary text-center no-underline flex-1"
                      >
                        Learn More
                      </Link>
                      <Link 
                        href={shopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tertiary text-center no-underline flex-1"
                      >
                        Shop
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ConsumablesPage() {
  return (
    <Suspense fallback={
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          <div className="text-center py-12">
            <LoadingSpinner size="md" />
          </div>
        </div>
      </div>
    }>
      <ConsumablesPageContent />
    </Suspense>
  )
}
