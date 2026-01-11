'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Search, Filter, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { parseImageMetadata, type MicrostructureImage } from '@/lib/microstructure-images'

// List of all microstructure images (you can expand this or load dynamically)
const IMAGE_FILENAMES = [
  '1018 Steel furnace cooled, 2% nital (DIC).JPG',
  '1018FC.jpg',
  '1018Q-400-2.jpg',
  '1018WQ.jpg',
  '1095 Steel furnace cooled, pearlite, 2% nital, 400X.JPG',
  '1095 Steel water quenched, martensite, Vilellas, 1000X.JPG',
  '1095fc.jpg',
  '1095Q-1000-2.jpg',
  '1095wq.jpg',
  '2024-Alumiunm.jpg',
  '300-caststainless.jpg',
  '431 stainless steel, Kallings no. 2, 400X (DIC).JPG',
  '431 Stainless steel, Kallings no. 2, 400X.JPG',
  '6061-Aluminum.jpg',
  '70-30 rolled brass, 200X.JPG',
  '70-30-Brass-etched-200x-007.jpg',
  '7075-aluminum.jpg',
  '85% alumina, as-polished, 12 sputter coated, 200X.JPG',
  '96% alumina, 400X.JPG',
  'Al-anodized-IA.jpg',
  'Al-Si alloy, Kellers, 400X.JPG',
  'Al-Si.jpg',
  'Al2O3.jpg',
  'AlN-DF.jpg',
  'AlON as-polished, 1000X (DIC).JPG',
  'ALON.jpg',
  'Alumina (85%) as-polished, 400X.JPG',
  'Alumina.JPG',
  'B4C 400X (DIC).JPG',
  'Barium titanate-1.JPG',
  'BeO.jpg',
  'carbon-carbon-composite.jpg',
  'Cast-titanium.jpg',
  'CI-nodular-100X-etch-2.jpg',
  'Cobalt.jpg',
  'ComputerChip.jpg',
  'Copper pitch (0.15%) ASTM -30, 200X.JPG',
  'Copper_weld1.jpg',
  'Copper.jpg',
  'Cordierite.jpg',
  'Diamond thin film.JPG',
  'Ferrite-Pearlite steel.JPG',
  'GaAs.jpg',
  'Graphite.jpg',
  'Gray iron, 2% nital, 1000X.JPG',
  'Gray iron, 2% nital, 400X.JPG',
  'Hastelloy-adlers-etch-200X-DIC.jpg',
  'Inconel-500x-weld.jpg',
  'Mn-Al Bronze (alcoholic FeCl3) 400X.JPG',
  'Mullite, 200X.JPG',
  'Mullite.jpg',
  'Ni-Fe-Al Bronze, ASTM-30 1000X.JPG',
  'Ni-Fe-Al Bronze, ASTM-30 200X.JPG',
  'Ni-Fe-bronze.jpg',
  'Nimonic90.jpg',
  'Nodular cast iron, 2% nital, 400X (DIC).JPG',
  'Nodular cast iron, 200X.JPG',
  'Pearlite-ferrite.JPG',
  'Si3N4-Dia.jpg',
  'SiC filter, as-polished, 200X.JPG',
  'SiC-filter.jpg',
  'SiSiC, 1000X (DIC).JPG',
  'SiSiC.jpg',
  'Steatite.jpg',
  'Ti6Al4V.jpg',
  'Titanium+ZrB2, 400X (DIC).JPG',
  'Tough pitch copper, ASTM-30 200X.JPG',
  'Tungsten.jpg',
  'White cast iron, as-polished, 400X.JPG',
  'White Iron (Hyper-Eutectic), Picral, 100X.JPG',
  'Wrought-Ti-1.jpg',
  'Zirconia (PSZ) 14 micron diamond, 30 minutes.JPG',
  'ZrB2-Ti.jpg',
]

const ITEMS_PER_PAGE = 24

export default function MicrostructuresGalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All')
  const [selectedMagnification, setSelectedMagnification] = useState<string>('All')
  const [selectedEtchant, setSelectedEtchant] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState<MicrostructureImage | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Parse all images
  const allImages = useMemo(() => {
    return IMAGE_FILENAMES.map(filename => parseImageMetadata(filename))
  }, [])

  // Extract unique filter values
  const materials = useMemo(() => {
    const unique = Array.from(new Set(allImages.map(img => img.material).filter(Boolean))).sort()
    return unique as string[]
  }, [allImages])

  const magnifications = useMemo(() => {
    const unique = Array.from(new Set(allImages.map(img => img.magnification).filter(Boolean))).sort((a, b) => {
      const numA = parseInt(a?.replace('X', '') || '0')
      const numB = parseInt(b?.replace('X', '') || '0')
      return numA - numB
    })
    return unique as string[]
  }, [allImages])

  const etchants = useMemo(() => {
    const unique = Array.from(new Set(allImages.map(img => img.etchant).filter(Boolean))).sort()
    return unique as string[]
  }, [allImages])

  // Filter images
  const filteredImages = useMemo(() => {
    let filtered = allImages

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(img =>
        img.material?.toLowerCase().includes(query) ||
        img.description?.toLowerCase().includes(query) ||
        img.filename.toLowerCase().includes(query) ||
        img.treatment?.toLowerCase().includes(query) ||
        img.technique?.toLowerCase().includes(query)
      )
    }

    if (selectedMaterial !== 'All') {
      filtered = filtered.filter(img => img.material === selectedMaterial)
    }

    if (selectedMagnification !== 'All') {
      filtered = filtered.filter(img => img.magnification === selectedMagnification)
    }

    if (selectedEtchant !== 'All') {
      filtered = filtered.filter(img => img.etchant === selectedEtchant)
    }

    return filtered
  }, [allImages, searchQuery, selectedMaterial, selectedMagnification, selectedEtchant])

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedImages = filteredImages.slice(startIndex, endIndex)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedMaterial, selectedMagnification, selectedEtchant])

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1)
  }

  const openLightbox = (image: MicrostructureImage) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex(img => img.filename === selectedImage.filename)
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1])
    } else if (direction === 'next' && currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1])
    }
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'ArrowRight') navigateLightbox('next')
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage])

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Microstructure Gallery</h1>
          <p className="text-sm md:text-xl text-gray-600">
            Explore our collection of high-quality microstructure images from various materials, treatments, and preparation techniques.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by material, treatment, technique, or description..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-base md:text-sm"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:block space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                {/* Material Filter */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Material
                  </label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  >
                    <option value="All">All Materials</option>
                    {materials.map(material => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>

                {/* Magnification Filter */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Magnification
                  </label>
                  <select
                    value={selectedMagnification}
                    onChange={(e) => setSelectedMagnification(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  >
                    <option value="All">All Magnifications</option>
                    {magnifications.map(mag => (
                      <option key={mag} value={mag}>{mag}</option>
                    ))}
                  </select>
                </div>

                {/* Etchant Filter */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Etchant
                  </label>
                  <select
                    value={selectedEtchant}
                    onChange={(e) => setSelectedEtchant(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  >
                    <option value="All">All Etchants</option>
                    {etchants.map(etchant => (
                      <option key={etchant} value={etchant}>{etchant}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-700">Filters</span>
              </div>
              <X className={`w-4 h-4 text-gray-600 transition-transform ${mobileFiltersOpen ? 'rotate-90' : ''}`} />
            </button>

            {mobileFiltersOpen && (
              <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Material</label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="All">All Materials</option>
                    {materials.map(material => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Magnification</label>
                  <select
                    value={selectedMagnification}
                    onChange={(e) => setSelectedMagnification(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="All">All Magnifications</option>
                    {magnifications.map(mag => (
                      <option key={mag} value={mag}>{mag}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Etchant</label>
                  <select
                    value={selectedEtchant}
                    onChange={(e) => setSelectedEtchant(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="All">All Etchants</option>
                    {etchants.map(etchant => (
                      <option key={etchant} value={etchant}>{etchant}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span>-
            <span className="font-semibold">{Math.min(endIndex, filteredImages.length)}</span> of{' '}
            <span className="font-semibold">{filteredImages.length}</span> image{filteredImages.length !== 1 ? 's' : ''}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`inline-flex items-center justify-center w-5 h-5 rounded transition-colors ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500 inline-flex items-center">
                Page <span className="font-semibold mx-0.5">{currentPage}</span> of{' '}
                <span className="font-semibold mx-0.5">{totalPages}</span>
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`inline-flex items-center justify-center w-5 h-5 rounded transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Image Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {paginatedImages.map((image, index) => (
              <div
                key={image.filename}
                className="group relative bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-primary-400 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.description || image.filename}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <ZoomIn className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  {image.material && (
                    <div className="text-xs font-semibold text-primary-600 mb-1">{image.material}</div>
                  )}
                  <div className="text-sm text-gray-900 font-medium line-clamp-2 mb-2">
                    {image.description || image.filename}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    {image.magnification && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{image.magnification}</span>
                    )}
                    {image.technique && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{image.technique}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found matching your search.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-1 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary-400'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {(() => {
                const pages: (number | 'ellipsis')[] = []
                
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                  }
                } else {
                  pages.push(1)
                  
                  if (currentPage <= 3) {
                    for (let i = 2; i <= 4; i++) {
                      pages.push(i)
                    }
                    pages.push('ellipsis')
                    pages.push(totalPages)
                  } else if (currentPage >= totalPages - 2) {
                    pages.push('ellipsis')
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                      pages.push(i)
                    }
                  } else {
                    pages.push('ellipsis')
                    pages.push(currentPage - 1)
                    pages.push(currentPage)
                    pages.push(currentPage + 1)
                    pages.push('ellipsis')
                    pages.push(totalPages)
                  }
                }
                
                return pages.map((page, index) => {
                  if (page === 'ellipsis') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                        ...
                      </span>
                    )
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        currentPage === page
                          ? 'bg-primary-600 text-white border-primary-600 font-semibold'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary-400'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })
              })()}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-1 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary-400'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox('prev')
                }}
                disabled={filteredImages.findIndex(img => img.filename === selectedImage.filename) === 0}
                className="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox('next')
                }}
                disabled={filteredImages.findIndex(img => img.filename === selectedImage.filename) === filteredImages.length - 1}
                className="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <div
                className="relative w-full h-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full max-h-[75vh] flex items-center justify-center mb-4">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.description || selectedImage.filename}
                    width={1200}
                    height={900}
                    className="max-w-full max-h-[75vh] object-contain rounded-lg"
                    priority
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white max-w-3xl">
                  <h3 className="text-xl font-semibold mb-2">{selectedImage.material || 'Microstructure'}</h3>
                  <p className="text-sm text-gray-200 mb-3">{selectedImage.description || selectedImage.filename}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedImage.magnification && (
                      <span className="px-2 py-1 bg-white/20 rounded">Magnification: {selectedImage.magnification}</span>
                    )}
                    {selectedImage.etchant && (
                      <span className="px-2 py-1 bg-white/20 rounded">Etchant: {selectedImage.etchant}</span>
                    )}
                    {selectedImage.technique && (
                      <span className="px-2 py-1 bg-white/20 rounded">Technique: {selectedImage.technique}</span>
                    )}
                    {selectedImage.treatment && (
                      <span className="px-2 py-1 bg-white/20 rounded">Treatment: {selectedImage.treatment}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

