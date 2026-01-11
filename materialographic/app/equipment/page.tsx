'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Scissors, Package, Gauge, Microscope, HardDrive, Home, ChevronRight } from 'lucide-react'
import AnimatedCard from '@/components/AnimatedCard'
import LoadingSpinner from '@/components/LoadingSpinner'

// Process order for equipment categories
const categoryOrder = ['sectioning', 'mounting', 'grinding-polishing', 'microscopy', 'hardness-testing', 'lab-furniture']
const categoryLabels: Record<string, string> = {
  'sectioning': 'Sectioning',
  'mounting': 'Mounting',
  'grinding-polishing': 'Grinding & Polishing',
  'microscopy': 'Microscopy',
  'hardness-testing': 'Hardness Testing',
  'lab-furniture': 'Lab Furniture',
}

const categoryIcons: Record<string, typeof Scissors> = {
  'sectioning': Scissors,
  'mounting': Package,
  'grinding-polishing': Gauge,
  'microscopy': Microscope,
  'hardness-testing': HardDrive,
  'lab-furniture': Home,
}

const categoryDescriptions: Record<string, string> = {
  'sectioning': 'Precision cutters, abrasive saws, and wafering systems for sectioning samples.',
  'mounting': 'Compression mounting presses and castable mounting systems for embedding samples in resin.',
  'grinding-polishing': 'Grinder-polishers, automated systems, and vibratory polishers for sample preparation.',
  'microscopy': 'Metallurgical and stereo microscopes for microstructural analysis.',
  'hardness-testing': 'Rockwell, microhardness, and Brinell testers for material characterization.',
  'lab-furniture': 'Workbenches, storage, and supporting equipment for your lab.',
}

// Cover images for each category - using representative equipment images
const categoryCoverImages: Record<string, string> = {
  'sectioning': '/images/equipment/abrasive sectioning/manual abrasive cutters/mega-t300s/mega-t300s-cover.webp',
  'mounting': '/images/equipment/compression mounting/hydraulic mounting press/tp-7500s/tp-7500s-cover.webp',
  'grinding-polishing': '/images/equipment/grinding & polishing/manual grinder polishers/nano-2000s/nano-2000s-cover.webp',
  'microscopy': '/images/equipment/microscopy/metallurgical microscopes/im-5000/im-5000-cover.webp',
  'hardness-testing': '/images/equipment/hardness testing/rockwell tester/omega-auto-rt/omega-auto-rt-cover.webp',
  'lab-furniture': '/images/pace/equipment.webp',
}


function EquipmentPageContent() {
  return (
    <div className="py-4 sm:py-6 md:py-12">
      <div className="container-custom">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-gray-900">Equipment</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl">
            Browse our complete range of metallographic equipment organized by process step. Select a category to view all equipment in that section.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8 md:mb-12">
          {categoryOrder.map((categoryKey, index) => {
            const categoryLabel = categoryLabels[categoryKey]
            const categoryDescription = categoryDescriptions[categoryKey]
            const IconComponent = categoryIcons[categoryKey] || Package
            const coverImage = categoryCoverImages[categoryKey]

            return (
              <AnimatedCard key={categoryKey} index={index} animation="fadeInUp" duration={500}>
                <div className="card hover:border-primary-400 hover:shadow-lg group overflow-hidden h-full flex flex-col transition-all duration-300">
                  {/* Cover Image */}
                  {coverImage && (
                    <Link href={`/equipment/${categoryKey}`} className="block">
                      <div className="relative w-full h-48 sm:h-56 mb-4 rounded-lg overflow-hidden bg-white p-2 sm:p-3">
                        <Image
                          src={coverImage}
                          alt={categoryLabel}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={(e) => {
                            // Fallback to a default image if the specific cover image doesn't exist
                            e.currentTarget.src = '/images/pace/equipment.webp'
                          }}
                        />
                      </div>
                    </Link>
                  )}

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <Link href={`/equipment/${categoryKey}`} className="flex items-center gap-2 mb-2 group/title">
                      <IconComponent className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover/title:text-primary-600 transition-colors">
                        {categoryLabel}
                      </h2>
                    </Link>
                    
                    <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow leading-relaxed">
                      {categoryDescription}
                    </p>

                    {/* Learn More Link */}
                    <div className="mt-auto pt-3 border-t border-gray-200">
                      <Link 
                        href={`/equipment/${categoryKey}`}
                        className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4" />
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

export default function EquipmentPage() {
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
      <EquipmentPageContent />
    </Suspense>
  )
}
