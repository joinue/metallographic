'use client'

import Link from 'next/link'
import Image from 'next/image'
import { use, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { getConsumablesByCategory, getSubcategoriesForCategory } from '@/lib/supabase'
import type { Consumable, SubcategoryMetadata } from '@/lib/supabase'
import { Scissors, Package, Gauge, FlaskConical, Droplet, HardDrive, ChevronRight, ArrowLeft } from 'lucide-react'
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

const categoryIcons: Record<string, typeof Scissors> = {
  'sectioning': Scissors,
  'mounting': Package,
  'grinding-lapping': Gauge,
  'polishing': Gauge,
  'etching': FlaskConical,
  'cleaning': Droplet,
  'hardness-testing': HardDrive,
}

const categoryDescriptions: Record<string, string> = {
  'sectioning': 'Cutting blades, fluids, and accessories for sectioning samples.',
  'mounting': 'Mounting resins, molds, and accessories for compression and castable mounting.',
  'grinding-lapping': 'Grinding papers, powders, lapping films, and grinding accessories.',
  'polishing': 'Polishing compounds, pads, cloths, and final polishing materials.',
  'etching': 'Etchants and reagents for revealing microstructures.',
  'cleaning': 'Cleaning solutions and supplies for sample preparation.',
  'hardness-testing': 'Accessories and supplies for hardness testing equipment.',
}

// Subcategory descriptions and images
const subcategoryInfo: Record<string, Record<string, { description: string; processContext: string; image?: string }>> = {
  'sectioning': {
    'Abrasive Blades': {
      description: 'Abrasive cutting blades made from alumina, silicon carbide, or zirconia bonded with resin or rubber. These blades are designed for general-purpose sectioning of most metallic materials with minimal heat generation and deformation.',
      processContext: 'Abrasive blades are the most commonly used sectioning method in metallography. They are ideal for cutting ferrous metals, non-ferrous alloys, and most engineering materials. The abrasive particles embedded in the blade create a cutting action that minimizes thermal damage to the sample.',
      image: '/images/consumables/precision-cutting-abrasive-blades.webp'
    },
    'Wafering Blades': {
      description: 'Precision wafering blades, including diamond and CBN (cubic boron nitride) blades, designed for cutting delicate materials with minimal damage. These blades produce very thin cuts with excellent edge retention.',
      processContext: 'Wafering blades are essential for cutting brittle materials, ceramics, electronic components, and samples requiring minimal deformation. They use diamond or CBN particles for superior cutting performance on hard materials.',
      image: '/images/consumables/diamond-cbn-blades.webp'
    },
    'Cutting Fluids': {
      description: 'Specialized cutting fluids and coolants designed to reduce heat generation, minimize deformation, and extend blade life during sectioning operations.',
      processContext: 'Cutting fluids are critical for maintaining sample integrity during sectioning. They cool the cutting zone, reduce friction, and help flush away cutting debris, preventing contamination and ensuring clean cuts.',
      image: '/images/consumables/maxcut-cutting-fluids.webp'
    },
    'Dressing Sticks': {
      description: 'Dressing sticks used to maintain and restore the cutting surface of abrasive blades, ensuring consistent cutting performance throughout the blade\'s lifespan.',
      processContext: 'Dressing sticks remove glazed or loaded material from blade surfaces, restoring cutting efficiency. Regular dressing extends blade life and maintains consistent cutting quality.',
      image: '/images/consumables/sectioning-cover.webp'
    }
  },
  'mounting': {
    'Compression Mounting': {
      description: 'Hot compression mounting resins and accessories for mounting samples under heat and pressure. Ideal for high-volume production and samples requiring edge retention.',
      processContext: 'Compression mounting is the first step after sectioning for many metallographic samples. The process uses heat and pressure to embed the sample in a resin, providing support and protection during subsequent grinding and polishing steps.',
      image: '/images/consumables/mounting-cover.webp'
    },
    'Castable Mounting': {
      description: 'Cold castable mounting resins and accessories for mounting samples at room temperature. Perfect for heat-sensitive materials and delicate samples.',
      processContext: 'Castable mounting is used when samples cannot withstand the heat of compression mounting. The resin cures at room temperature, making it ideal for polymers, electronic components, and temperature-sensitive materials.',
      image: '/images/consumables/castable-mounting-cover.png'
    }
  },
  'grinding-lapping': {
    'Grinding Papers': {
      description: 'Silicon carbide, alumina, and zirconia grinding papers in various grit sizes for removing material and preparing flat surfaces after sectioning.',
      processContext: 'Grinding is the second step in sample preparation, following sectioning. Grinding papers remove the damaged layer from cutting and create a flat, uniform surface. Coarse grits remove material quickly, while finer grits prepare the surface for polishing.',
      image: '/images/consumables/abrasive grinding-SiC papers.webp'
    },
    'Grinding Powders': {
      description: 'Silicon carbide grinding powders for lapping operations, providing precise control over material removal rates and surface finish.',
      processContext: 'Grinding powders are used in lapping operations for precision material removal. They allow for controlled, uniform material removal and are particularly useful for preparing very flat surfaces required for accurate microstructural analysis.',
      image: '/images/consumables/grinding SiC powders.webp'
    },
    'Lapping Films': {
      description: 'Diamond and alumina lapping films for precision lapping operations, offering consistent grit size and excellent surface finish control.',
      processContext: 'Lapping films provide a controlled, uniform abrasive surface for precision lapping. They are essential for preparing samples that require very flat surfaces, such as those used in quantitative metallography or image analysis.',
      image: '/images/consumables/diamond-lapping films.webp'
    },
    'Grinding Belts': {
      description: 'Abrasive belts for belt grinders, providing efficient material removal for larger samples or high-throughput applications.',
      processContext: 'Grinding belts are used with belt grinders for rapid material removal on larger samples. They are particularly useful in production environments where multiple samples need to be prepared quickly.',
      image: '/images/consumables/belts.webp'
    },
    'Grinding Rolls': {
      description: 'Silicon carbide grinding rolls for hand grinders, offering portable grinding capability for field work or small-scale operations.',
      processContext: 'Grinding rolls provide a portable solution for grinding operations. They are ideal for field work, small labs, or situations where fixed grinding equipment is not available.',
      image: '/images/consumables/rolls.webp'
    }
  },
  'polishing': {
    'Rough Polishing': {
      description: 'Diamond pastes, suspensions, and polishing pads for rough polishing operations. These remove grinding scratches and prepare the surface for final polishing.',
      processContext: 'Rough polishing follows grinding and removes the scratches left by grinding papers. Diamond abrasives are most commonly used due to their hardness and ability to cut through the deformed layer created during grinding.',
      image: '/images/consumables/rough polishing-cover.webp'
    },
    'Final Polishing': {
      description: 'Alumina powders, colloidal silica, and final polishing agents for achieving mirror-like surfaces required for microstructural analysis.',
      processContext: 'Final polishing is the last mechanical preparation step before etching. It removes all scratches and creates a mirror-like surface that reveals the true microstructure when etched. This step is critical for accurate microstructural analysis.',
      image: '/images/consumables/final polishing & analysis-cover.webp'
    }
  },
  'etching': {
    'General Purpose': {
      description: 'General-purpose etchants suitable for multiple material types. These versatile etchants provide good results across a wide range of metallic materials.',
      processContext: 'General-purpose etchants are used when a single etchant needs to work with multiple material types. They are ideal for laboratories that process diverse samples and provide a good starting point for microstructural analysis.',
      image: '/images/consumables/etching.webp'
    },
    'general-purpose': {
      description: 'General-purpose etchants suitable for multiple material types. These versatile etchants provide good results across a wide range of metallic materials.',
      processContext: 'General-purpose etchants are used when a single etchant needs to work with multiple material types. They are ideal for laboratories that process diverse samples and provide a good starting point for microstructural analysis.',
      image: '/images/consumables/etching.webp'
    },
    'Steel Etchants': {
      description: 'Etchants specifically formulated for carbon steels, alloy steels, and ferrous materials. These etchants reveal grain boundaries, phases, and microstructural features in steel samples.',
      processContext: 'Steel etchants are essential for revealing the microstructure of ferrous materials. They highlight grain boundaries, pearlite, ferrite, martensite, and other phases critical for understanding steel properties and heat treatment effects.',
      image: '/images/consumables/etching.webp'
    },
    'steel': {
      description: 'Etchants specifically formulated for carbon steels, alloy steels, and ferrous materials. These etchants reveal grain boundaries, phases, and microstructural features in steel samples.',
      processContext: 'Steel etchants are essential for revealing the microstructure of ferrous materials. They highlight grain boundaries, pearlite, ferrite, martensite, and other phases critical for understanding steel properties and heat treatment effects.',
      image: '/images/consumables/etching.webp'
    },
    'Stainless Steel': {
      description: 'Specialized etchants for stainless steels and high-alloy materials. These etchants are designed to reveal the complex microstructures of austenitic, ferritic, and martensitic stainless steels.',
      processContext: 'Stainless steel etchants are formulated to work with the high chromium and nickel content in these alloys. They reveal grain boundaries, phase distributions, and precipitation that are critical for understanding corrosion resistance and mechanical properties.',
      image: '/images/consumables/etching.webp'
    },
    'stainless-steel': {
      description: 'Specialized etchants for stainless steels and high-alloy materials. These etchants are designed to reveal the complex microstructures of austenitic, ferritic, and martensitic stainless steels.',
      processContext: 'Stainless steel etchants are formulated to work with the high chromium and nickel content in these alloys. They reveal grain boundaries, phase distributions, and precipitation that are critical for understanding corrosion resistance and mechanical properties.',
      image: '/images/consumables/etching.webp'
    },
    'Aluminum & Light Metals': {
      description: 'Etchants designed for aluminum, magnesium, and other light metal alloys. These etchants reveal grain structure, precipitates, and phase distributions in non-ferrous light metals.',
      processContext: 'Aluminum and light metal etchants are essential for aerospace, automotive, and manufacturing applications. They reveal grain boundaries, intermetallic phases, and precipitation that affect mechanical properties and formability.',
      image: '/images/consumables/etching.webp'
    },
    'aluminum': {
      description: 'Etchants designed for aluminum, magnesium, and other light metal alloys. These etchants reveal grain structure, precipitates, and phase distributions in non-ferrous light metals.',
      processContext: 'Aluminum and light metal etchants are essential for aerospace, automotive, and manufacturing applications. They reveal grain boundaries, intermetallic phases, and precipitation that affect mechanical properties and formability.',
      image: '/images/consumables/etching.webp'
    },
    'Titanium': {
      description: 'Specialized etchants for titanium and titanium alloys. These etchants reveal the alpha, beta, and transformed microstructures critical for aerospace and medical applications.',
      processContext: 'Titanium etchants are formulated to work with the reactive nature of titanium. They reveal phase distributions, grain boundaries, and microstructural features that determine mechanical properties and fatigue resistance in aerospace and medical implants.',
      image: '/images/consumables/etching.webp'
    },
    'titanium': {
      description: 'Specialized etchants for titanium and titanium alloys. These etchants reveal the alpha, beta, and transformed microstructures critical for aerospace and medical applications.',
      processContext: 'Titanium etchants are formulated to work with the reactive nature of titanium. They reveal phase distributions, grain boundaries, and microstructural features that determine mechanical properties and fatigue resistance in aerospace and medical implants.',
      image: '/images/consumables/etching.webp'
    },
    'Copper & Brass': {
      description: 'Etchants for copper, brass, bronze, and other copper-based alloys. These etchants reveal grain structure, phase distributions, and microstructural features in non-ferrous alloys.',
      processContext: 'Copper and brass etchants are used in electrical, plumbing, and decorative applications. They reveal grain boundaries, twinning, and phase distributions that affect electrical conductivity, corrosion resistance, and mechanical properties.',
      image: '/images/consumables/etching.webp'
    },
    'copper-brass': {
      description: 'Etchants for copper, brass, bronze, and other copper-based alloys. These etchants reveal grain structure, phase distributions, and microstructural features in non-ferrous alloys.',
      processContext: 'Copper and brass etchants are used in electrical, plumbing, and decorative applications. They reveal grain boundaries, twinning, and phase distributions that affect electrical conductivity, corrosion resistance, and mechanical properties.',
      image: '/images/consumables/etching.webp'
    },
    'Nickel & Nickel Alloys': {
      description: 'Etchants for nickel, Inconel, Monel, and other nickel-based superalloys. These etchants reveal the complex microstructures critical for high-temperature applications.',
      processContext: 'Nickel and nickel alloy etchants are essential for aerospace, power generation, and chemical processing applications. They reveal grain boundaries, gamma prime precipitates, and phase distributions that determine high-temperature strength and corrosion resistance.',
      image: '/images/consumables/etching.webp'
    },
    'nickel': {
      description: 'Etchants for nickel, Inconel, Monel, and other nickel-based superalloys. These etchants reveal the complex microstructures critical for high-temperature applications.',
      processContext: 'Nickel and nickel alloy etchants are essential for aerospace, power generation, and chemical processing applications. They reveal grain boundaries, gamma prime precipitates, and phase distributions that determine high-temperature strength and corrosion resistance.',
      image: '/images/consumables/etching.webp'
    }
  },
  'cleaning': {
    'Ultrasonic Cleaning': {
      description: 'Ultrasonic cleaning solutions and systems designed to remove contaminants, polishing compounds, and etchant residues from prepared samples.',
      processContext: 'Ultrasonic cleaning is typically performed after polishing and before etching to ensure a clean surface free of contaminants. The ultrasonic action helps remove embedded particles and residues that could interfere with microstructural analysis.',
      image: '/images/consumables/cleaning.webp'
    },
    'ultrasonic': {
      description: 'Ultrasonic cleaning solutions and systems designed to remove contaminants, polishing compounds, and etchant residues from prepared samples.',
      processContext: 'Ultrasonic cleaning is typically performed after polishing and before etching to ensure a clean surface free of contaminants. The ultrasonic action helps remove embedded particles and residues that could interfere with microstructural analysis.',
      image: '/images/consumables/cleaning.webp'
    },
    'Solvents': {
      description: 'Cleaning solvents and degreasers for removing oils, greases, polishing compounds, and other contaminants from metallographic samples.',
      processContext: 'Cleaning solvents are used throughout the sample preparation process to remove cutting fluids, mounting residues, polishing compounds, and other contaminants. Proper cleaning ensures accurate microstructural analysis and prevents contamination between preparation steps.',
      image: '/images/consumables/cleaning.webp'
    },
    'solvents': {
      description: 'Cleaning solvents and degreasers for removing oils, greases, polishing compounds, and other contaminants from metallographic samples.',
      processContext: 'Cleaning solvents are used throughout the sample preparation process to remove cutting fluids, mounting residues, polishing compounds, and other contaminants. Proper cleaning ensures accurate microstructural analysis and prevents contamination between preparation steps.',
      image: '/images/consumables/cleaning.webp'
    }
  },
  'hardness-testing': {
    'Accessories': {
      description: 'Hardness testing accessories and supplies including indenters, anvils, test blocks, calibration standards, and consumable supplies for hardness testing equipment.',
      processContext: 'Hardness testing accessories are essential for maintaining and calibrating hardness testers. Indenters, anvils, and test blocks ensure accurate and repeatable hardness measurements, which are critical for quality control and material characterization.',
      image: '/images/consumables/hardness testing.webp'
    },
    'accessories': {
      description: 'Hardness testing accessories and supplies including indenters, anvils, test blocks, calibration standards, and consumable supplies for hardness testing equipment.',
      processContext: 'Hardness testing accessories are essential for maintaining and calibrating hardness testers. Indenters, anvils, and test blocks ensure accurate and repeatable hardness measurements, which are critical for quality control and material characterization.',
      image: '/images/consumables/hardness testing.webp'
    }
  }
}

export default function ConsumablesCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const [consumablesBySubcategory, setConsumablesBySubcategory] = useState<Record<string, { all: Consumable[], featured: Consumable[] }>>({})
  const [subcategoryMetadata, setSubcategoryMetadata] = useState<Record<string, SubcategoryMetadata>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all consumables for this category
        const allConsumables = await getConsumablesByCategory(category)
        console.log(`[${category}] Fetched ${allConsumables.length} consumables`)
        
        // Fetch subcategory metadata to get display labels
        const metadata = await getSubcategoriesForCategory(category, 'consumables')
        const metadataMap: Record<string, SubcategoryMetadata> = {}
        for (const meta of metadata) {
          // Map both the key and label to the metadata
          metadataMap[meta.subcategory_key] = meta
          metadataMap[meta.subcategory_label] = meta
          // Also map common variations
          const keyLower = meta.subcategory_key.toLowerCase()
          const labelLower = meta.subcategory_label.toLowerCase()
          if (keyLower !== meta.subcategory_key) metadataMap[keyLower] = meta
          if (labelLower !== meta.subcategory_label) metadataMap[labelLower] = meta
        }
        setSubcategoryMetadata(metadataMap)
        
        // Group by actual subcategory field from database
        const grouped: Record<string, Consumable[]> = {}
        for (const consumable of allConsumables) {
          const subcat = consumable.subcategory || 'Uncategorized'
          if (!grouped[subcat]) {
            grouped[subcat] = []
          }
          grouped[subcat].push(consumable)
        }
        
        // Sort items within each subcategory and create featured list (first 6 items)
        const groupedWithFeatured: Record<string, { all: Consumable[], featured: Consumable[] }> = {}
        for (const subcat in grouped) {
          const sorted = grouped[subcat].sort((a, b) => {
            if (a.sort_order !== b.sort_order) {
              return (a.sort_order || 0) - (b.sort_order || 0)
            }
            return (a.name || '').localeCompare(b.name || '')
          })
          groupedWithFeatured[subcat] = {
            all: sorted,
            featured: sorted.slice(0, 6) // Show first 6 items as featured
          }
        }
        
        setConsumablesBySubcategory(groupedWithFeatured)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category])

  const categoryLabel = categoryLabels[category] || category
  const IconComponent = categoryIcons[category] || Package
  const description = categoryDescriptions[category] || 'Browse consumables in this category.'

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
          <Link 
            href="/consumables"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Consumables
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{categoryLabel}</h1>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
            {description}
          </p>
        </div>

        {/* Quick Navigation to Subcategories */}
        {Object.keys(consumablesBySubcategory).length > 1 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {Object.entries(consumablesBySubcategory)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([subcategoryName]) => {
                  const subcategorySlug = subcategoryName
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                  
                  const meta = subcategoryMetadata[subcategoryName]
                  const displayLabel = meta?.subcategory_label || subcategoryName
                  
                  return (
                    <a
                      key={subcategoryName}
                      href={`#${subcategorySlug}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors"
                    >
                      {displayLabel}
                    </a>
                  )
                })}
            </div>
          </div>
        )}

        {/* Subcategories Section */}
        {Object.keys(consumablesBySubcategory).length > 0 ? (
          <div className="space-y-12 sm:space-y-16">
            {Object.entries(consumablesBySubcategory)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([subcategoryName, subcategoryData], subcatIndex) => {
                // Get display label from metadata or use the database value
                const meta = subcategoryMetadata[subcategoryName]
                const displayLabel = meta?.subcategory_label || subcategoryName
                
                // Create a URL-friendly slug from subcategory name
                const subcategorySlug = subcategoryName
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')
                
                const all = subcategoryData?.all || []
                const featured = subcategoryData?.featured || []
                const totalCount = all.length
                const hasMore = totalCount > featured.length
                
                // Try to get subcategory info using both the database key and display label
                const subcategoryInfoData = subcategoryInfo[category]?.[subcategoryName] || 
                                           subcategoryInfo[category]?.[displayLabel] ||
                                           (meta ? {
                                             description: meta.description || '',
                                             processContext: '',
                                             image: meta.cover_image_url || undefined
                                           } : undefined)
                
                return (
                  <section id={subcategorySlug} key={subcategoryName} className="scroll-mt-24">
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-start justify-between mb-4 sm:mb-6">
                        <div className="flex-1">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                            {displayLabel}
                          </h2>
                          {subcategoryInfoData?.description && (
                            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed max-w-4xl">
                              {subcategoryInfoData.description}
                            </p>
                          )}
                          {subcategoryInfoData?.processContext && (
                            <div className="bg-blue-50 border-l-4 border-primary-600 p-4 sm:p-5 rounded-lg mb-4">
                              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                <strong className="text-primary-700">Role in Sample Preparation:</strong>{' '}
                                {subcategoryInfoData.processContext}
                              </p>
                            </div>
                          )}
                          <p className="text-sm sm:text-base text-gray-600">
                            <strong>{totalCount}</strong> {totalCount === 1 ? 'product' : 'products'} available
                          </p>
                        </div>
                        {hasMore && (
                          <Link
                            href={`/consumables/${category}/${subcategorySlug}`}
                            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            View All {totalCount} Products
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                      
                      {/* Subcategory Image - Only show if more than 5 products */}
                      {subcategoryInfoData?.image && totalCount > 5 && (
                        <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden max-w-xl">
                          <Image
                            src={subcategoryInfoData.image}
                            alt={subcategoryName}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>

                    {featured.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                          {featured.map((item, itemIndex) => (
                            <AnimatedCard key={item.id} index={itemIndex} animation="fadeInUp" duration={500}>
                              <Link 
                                href={`/consumables/${category}/${subcategorySlug}/${item.slug || item.item_id?.toLowerCase()}`}
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
                        {hasMore && (
                          <div className="text-center">
                            <Link
                              href={`/consumables/${category}/${subcategorySlug}`}
                              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm hover:shadow-md"
                            >
                              View All {totalCount} {subcategoryName} Products
                              <ChevronRight className="w-5 h-5" />
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">No consumables found in this subcategory.</p>
                      </div>
                    )}
                  </section>
                )
              })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No consumables found for this category.</p>
          </div>
        )}

      </div>
    </div>
  )
}

