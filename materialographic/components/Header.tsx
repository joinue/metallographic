'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Menu, X, ChevronDown, Search, LogOut, Scissors, Package, Gauge, Microscope, HardDrive, Home, FlaskConical, Droplet } from 'lucide-react'
import GlobalSearch from '@/components/GlobalSearch'
import { createClient } from '@/lib/supabase-client'
import type { Equipment, Consumable, SubcategoryMetadata } from '@/lib/supabase'
import { getEquipmentImageUrl } from '@/lib/storage'
import { getSubcategoriesForCategory } from '@/lib/supabase'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(96) // Default to 96px (min-h-24)
  const [featuredEquipment, setFeaturedEquipment] = useState<Equipment | null>(null)
  const [featuredConsumableType, setFeaturedConsumableType] = useState<{ subcategory: string; category: string; label: string; image: string } | null>(null)
  const [prevDropdown, setPrevDropdown] = useState<string | null>(null)
  const [equipmentSubcategories, setEquipmentSubcategories] = useState<Record<string, SubcategoryMetadata[]>>({})
  const headerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Handle header height tracking with ResizeObserver (more efficient than polling)
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        // Use requestAnimationFrame to batch layout reads and avoid forced reflow
        requestAnimationFrame(() => {
          if (headerRef.current) {
            const newHeight = headerRef.current.getBoundingClientRect().height
            // Only update state if height actually changed to minimize re-renders
            setHeaderHeight(prevHeight => prevHeight !== newHeight ? newHeight : prevHeight)
          }
        })
      }
    }

    // Use ResizeObserver for efficient height tracking instead of polling
    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight()
      })
      resizeObserver.observe(headerRef.current)
    }

    // Initial height measurement (deferred to avoid blocking initial render)
    requestAnimationFrame(() => {
      updateHeaderHeight()
    })

    // Fallback for browsers without ResizeObserver support
    const handleResize = () => {
      updateHeaderHeight()
    }
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeObserver && headerRef.current) {
        resizeObserver.unobserve(headerRef.current)
      }
    }
  }, [isScrolled]) // Re-run when scroll state changes (header height may change)

  // Check if user is logged in as admin
  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setIsAdmin(!!user)
      } catch (error) {
        setIsAdmin(false)
      }
    }

    checkUser()

    // Listen for auth state changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Fetch featured products and subcategories when dropdown opens
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      if (activeDropdown === 'equipment') {
        // Fetch featured equipment if not already loaded
        if (!featuredEquipment) {
          try {
            const supabase = createClient()
            const { data } = await supabase
              .from('equipment')
              .select('*')
              .eq('status', 'active')
              .order('sort_order', { ascending: true })
              .limit(1)
              .single()
            
            if (data) setFeaturedEquipment(data)
          } catch (error) {
            console.error('Error fetching featured equipment:', error)
          }
        }

        // Fetch subcategories for each equipment category if not already loaded
        const categories = ['sectioning', 'mounting', 'grinding-polishing', 'microscopy', 'hardness-testing']
        const categoriesToFetch = categories.filter(cat => !equipmentSubcategories[cat])
        
        if (categoriesToFetch.length > 0) {
          try {
            const subcategoriesMap: Record<string, SubcategoryMetadata[]> = {}
            for (const category of categoriesToFetch) {
              const subcats = await getSubcategoriesForCategory(category, 'equipment')
              subcategoriesMap[category] = subcats
            }
            setEquipmentSubcategories(prev => ({ ...prev, ...subcategoriesMap }))
          } catch (error) {
            console.error('Error fetching equipment subcategories:', error)
          }
        }
      }
      
      if (activeDropdown === 'consumables' && !featuredConsumableType) {
        // Featured consumable types - popular subcategories with images
        const featuredTypes = [
          { subcategory: 'polishing-pads', category: 'polishing', label: 'Polishing Pads', image: '/images/consumables/polishing-pads.webp' },
          { subcategory: 'diamond-paste', category: 'polishing', label: 'Diamond Paste', image: '/images/consumables/monocrystalline-diamond-paste.webp' },
          { subcategory: 'abrasive-blades', category: 'sectioning', label: 'Abrasive Blades', image: '/images/consumables/precision-cutting-abrasive-blades.webp' },
          { subcategory: 'mounting-resins', category: 'mounting', label: 'Mounting Resins', image: '/images/consumables/epoxy-compression-mounting.webp' },
          { subcategory: 'grinding-papers', category: 'grinding-lapping', label: 'Grinding Papers', image: '/images/consumables/abrasive grinding-SiC papers.webp' },
        ].filter(type => type.image) // Only include types with images
        // Pick a random featured type
        if (featuredTypes.length > 0) {
          const randomType = featuredTypes[Math.floor(Math.random() * featuredTypes.length)]
          setFeaturedConsumableType(randomType)
        }
      }
    }

    fetchFeaturedProducts()
  }, [activeDropdown, featuredEquipment, featuredConsumableType])

  // Track dropdown changes for animation
  useEffect(() => {
    if (activeDropdown && activeDropdown !== prevDropdown) {
      setPrevDropdown(activeDropdown)
    }
  }, [activeDropdown, prevDropdown])

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="w-full">
        <div 
          ref={headerRef}
          className={`hidden lg:flex items-center px-8 bg-white border-b border-gray-200 shadow-sm w-full transition-all duration-300 ${
            isScrolled ? 'min-h-20' : 'min-h-24'
          }`}
        >
          {/* Logo */}
          <div className={`flex items-center pr-8 transition-all duration-300 ${
            isScrolled ? 'py-3' : 'py-4'
          }`}>
            <Link href="/" className="flex items-center">
              <div className={`relative w-auto transition-all duration-300 ${
                isScrolled ? 'h-16' : 'h-20'
              }`}>
                <Image 
                  src="/images/pace/materialographic-logo.png" 
                  alt="Materialographic.com" 
                  width={160} 
                  height={160}
                  className={`w-auto object-contain transition-all duration-300 ${
                    isScrolled ? 'h-16' : 'h-20'
                  }`}
                  priority
                  fetchPriority="high"
                  quality={85}
                  sizes="(max-width: 1024px) 80px, 160px"
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation with Dropdowns - Centered */}
          <div className="flex items-center space-x-0 flex-1 justify-center">
              {/* Equipment */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('equipment')}
              >
                <Link 
                  href="/equipment" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1 relative group focus:outline-none focus:ring-0"
                >
                  Equipment
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {activeDropdown === 'equipment' && (
                  <>
                    {/* Invisible bridge covering gap from bottom of header to top of menu */}
                    <div 
                      className="fixed left-0 right-0 z-40 bg-transparent"
                      style={{ 
                        top: `${headerHeight}px`,
                        height: '1px',
                        pointerEvents: 'auto'
                      }}
                      onMouseEnter={() => setActiveDropdown('equipment')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    ></div>
                    {/* Full-width mega menu */}
                    <div 
                      data-mega-menu="equipment"
                      className="fixed left-0 right-0 bg-gradient-to-b from-white via-gray-100 to-white border-b border-gray-200 shadow-2xl z-50 animate-[fadeInSlideDown_0.3s_ease-out]"
                      style={{ top: `${headerHeight}px` }}
                      onMouseEnter={() => setActiveDropdown('equipment')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="grid grid-cols-7 gap-6">
                          {/* Categories Grid - 5 columns */}
                          <div className="col-span-6">
                            {/* All Equipment Link */}
                            <div className="mb-3 pb-3 border-b border-gray-200">
                              <Link href="/equipment" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group">
                                View All Equipment
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>
                            
                            <div className="grid grid-cols-5 gap-4">
                              {/* Sectioning */}
                              <div className="col-span-1">
                                <Link href="/equipment/sectioning" onClick={() => setActiveDropdown(null)} className="group block mb-2">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Scissors className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Sectioning
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                </Link>
                                <div className="ml-8 space-y-1">
                                  {equipmentSubcategories['sectioning']?.sort((a, b) => {
                                    const order = ['automated', 'manual', 'precision-wafering']
                                    const aIndex = order.indexOf(a.subcategory_key)
                                    const bIndex = order.indexOf(b.subcategory_key)
                                    if (aIndex === -1 && bIndex === -1) return 0
                                    if (aIndex === -1) return 1
                                    if (bIndex === -1) return -1
                                    return aIndex - bIndex
                                  }).map((subcat) => {
                                    const labelMap: Record<string, string> = {
                                      'automated': 'Automated Abrasive Cutting',
                                      'manual': 'Manual Abrasive Cutting',
                                      'precision-wafering': 'Precision Wafering'
                                    }
                                    return (
                                      <Link
                                        key={subcat.id}
                                        href={`/equipment/sectioning/${subcat.subcategory_key}`}
                                        onClick={() => setActiveDropdown(null)}
                                        className="block text-xs text-gray-600 hover:text-primary-600 transition-colors"
                                      >
                                        {labelMap[subcat.subcategory_key] || subcat.subcategory_label}
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                              
                              {/* Mounting */}
                              <div className="col-span-1">
                                <Link href="/equipment/mounting" onClick={() => setActiveDropdown(null)} className="group block mb-2">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Package className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Mounting
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                </Link>
                                <div className="ml-8 space-y-1">
                                  {equipmentSubcategories['mounting']?.map((subcat) => {
                                    const normalizedSubcategory = subcat.subcategory_key === 'compression-mounting' ? 'compression' : 
                                                                  subcat.subcategory_key === 'castable-mounting' ? 'castable' : 
                                                                  subcat.subcategory_key
                                    return (
                                      <Link
                                        key={subcat.id}
                                        href={`/equipment/mounting/${normalizedSubcategory}`}
                                        onClick={() => setActiveDropdown(null)}
                                        className="block text-xs text-gray-600 hover:text-primary-600 transition-colors"
                                      >
                                        {subcat.subcategory_label}
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                              
                              {/* Grinding & Polishing */}
                              <div className="col-span-1">
                                <Link href="/equipment/grinding-polishing" onClick={() => setActiveDropdown(null)} className="group block mb-2">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Gauge className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Grinding & Polishing
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                </Link>
                                <div className="ml-8 space-y-1">
                                  {equipmentSubcategories['grinding-polishing']?.filter(subcat => subcat.subcategory_key.toLowerCase() !== 'automated').sort((a, b) => {
                                    const order = ['hand-belt', 'manual', 'semi-automated', 'controlled-removal', 'vibratory']
                                    const aIndex = order.indexOf(a.subcategory_key)
                                    const bIndex = order.indexOf(b.subcategory_key)
                                    if (aIndex === -1 && bIndex === -1) return 0
                                    if (aIndex === -1) return 1
                                    if (bIndex === -1) return -1
                                    return aIndex - bIndex
                                  }).map((subcat) => {
                                    const labelMap: Record<string, string> = {
                                      'hand-belt': 'Hand & Belt Grinders',
                                      'manual': 'Manual Polishing Systems',
                                      'semi-automated': 'Semi-Automated Systems',
                                      'controlled-removal': 'Controlled Removal',
                                      'vibratory': 'Vibratory Polishing'
                                    }
                                    return (
                                      <Link
                                        key={subcat.id}
                                        href={`/equipment/grinding-polishing/${subcat.subcategory_key}`}
                                        onClick={() => setActiveDropdown(null)}
                                        className="block text-xs text-gray-600 hover:text-primary-600 transition-colors"
                                      >
                                        {labelMap[subcat.subcategory_key] || subcat.subcategory_label}
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                              
                              {/* Microscopy */}
                              <div className="col-span-1">
                                <Link href="/equipment/microscopy" onClick={() => setActiveDropdown(null)} className="group block mb-2">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Microscope className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Microscopy
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                </Link>
                                <div className="ml-8 space-y-1">
                                  {equipmentSubcategories['microscopy']?.map((subcat) => (
                                    <Link
                                      key={subcat.id}
                                      href={`/equipment/microscopy/${subcat.subcategory_key}`}
                                      onClick={() => setActiveDropdown(null)}
                                      className="block text-xs text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                      {subcat.subcategory_label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Hardness Testing */}
                              <div className="col-span-1">
                                <Link href="/equipment/hardness-testing" onClick={() => setActiveDropdown(null)} className="group block mb-2">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <HardDrive className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Hardness Testing
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                </Link>
                                <div className="ml-8 space-y-1">
                                  {equipmentSubcategories['hardness-testing']?.map((subcat) => (
                                    <Link
                                      key={subcat.id}
                                      href={`/equipment/hardness-testing/${subcat.subcategory_key}`}
                                      onClick={() => setActiveDropdown(null)}
                                      className="block text-xs text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                      {subcat.subcategory_label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Featured Product - 1 column */}
                          {featuredEquipment && (() => {
                            // Normalize subcategory for URL (e.g., 'castable-mounting' -> 'castable')
                            const normalizeSubcategoryForUrl = (category: string, subcategory: string | null | undefined): string | null => {
                              if (!subcategory) return null
                              if (category === 'mounting') {
                                if (subcategory === 'compression' || subcategory === 'compression-mounting') {
                                  return 'compression'
                                } else if (subcategory === 'castable' || subcategory === 'castable-mounting') {
                                  return 'castable'
                                }
                              }
                              return subcategory
                            }
                            
                            const normalizedSubcategory = normalizeSubcategoryForUrl(featuredEquipment.category, featuredEquipment.subcategory)
                            const equipmentUrl = featuredEquipment.slug 
                              ? normalizedSubcategory
                                ? `/equipment/${featuredEquipment.category}/${normalizedSubcategory}/${featuredEquipment.slug}`
                                : `/equipment/${featuredEquipment.category}/${featuredEquipment.slug}`
                              : `/equipment`
                            
                            return (
                            <div className="col-span-1 pl-4 border-l border-gray-200">
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Featured</p>
                              <Link 
                                href={equipmentUrl}
                                onClick={() => setActiveDropdown(null)}
                                className="group block"
                              >
                                {featuredEquipment.image_url ? (() => {
                                  const imageUrl = getEquipmentImageUrl(featuredEquipment.image_url)
                                  return imageUrl ? (
                                    <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden bg-gray-100">
                                      <Image
                                        src={imageUrl}
                                        alt={featuredEquipment.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none'
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                                      <Package className="w-8 h-8 text-primary-600" />
                                    </div>
                                  )
                                })() : (
                                  <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                                    <Package className="w-8 h-8 text-primary-600" />
                                  </div>
                                )}
                                <h4 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1 line-clamp-2">
                                  {featuredEquipment.name}
                                </h4>
                                {featuredEquipment.item_id && (
                                  <p className="text-xs text-gray-500">{featuredEquipment.item_id}</p>
                                )}
                              </Link>
                            </div>
                            )
                          })()}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <span className="text-gray-300 mx-1">|</span>
              
              {/* Consumables */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('consumables')}
              >
                <Link 
                  href="/consumables" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1 relative group focus:outline-none focus:ring-0"
                >
                  Consumables
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {activeDropdown === 'consumables' && (
                  <>
                    {/* Invisible bridge covering gap from bottom of header to top of menu */}
                    <div 
                      className="fixed left-0 right-0 z-40 bg-transparent"
                      style={{ 
                        top: `${headerHeight}px`,
                        height: '1px',
                        pointerEvents: 'auto'
                      }}
                      onMouseEnter={() => setActiveDropdown('consumables')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    ></div>
                    {/* Full-width mega menu */}
                    <div 
                      data-mega-menu="consumables"
                      className="fixed left-0 right-0 bg-gradient-to-b from-white via-gray-100 to-white border-b border-gray-200 shadow-2xl z-50 animate-[fadeInSlideDown_0.3s_ease-out]"
                      style={{ top: `${headerHeight}px` }}
                      onMouseEnter={() => setActiveDropdown('consumables')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="grid grid-cols-8 gap-4">
                          {/* Categories Grid - 7 columns */}
                          <div className="col-span-7">
                            {/* All Consumables Link */}
                            <div className="mb-3 pb-3 border-b border-gray-200">
                              <Link href="/consumables" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group">
                                View All Consumables
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>
                            
                            <div className="grid grid-cols-7 gap-3">
                              {/* Sectioning */}
                              <div className="col-span-1">
                                <Link href="/consumables/sectioning" onClick={() => setActiveDropdown(null)} className="group block">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Scissors className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Sectioning
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                  <p className="text-xs text-gray-600 ml-8 leading-tight">Cutting blades, fluids, and accessories</p>
                                </Link>
                              </div>
                              
                              {/* Mounting */}
                              <div className="col-span-1">
                                <Link href="/consumables/mounting" onClick={() => setActiveDropdown(null)} className="group block">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Package className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Mounting
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                  <p className="text-xs text-gray-600 ml-8 leading-tight">Resins, molds, and accessories</p>
                                </Link>
                              </div>
                              
                              {/* Grinding & Lapping */}
                              <div className="col-span-1">
                                <Link href="/consumables/grinding-lapping" onClick={() => setActiveDropdown(null)} className="group block">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Gauge className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Grinding & Lapping
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                  <p className="text-xs text-gray-600 ml-8 leading-tight">Grinding papers, powders, and films</p>
                                </Link>
                              </div>
                              
                              {/* Polishing */}
                              <div className="col-span-1">
                                <Link href="/consumables/polishing" onClick={() => setActiveDropdown(null)} className="group block">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Gauge className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Polishing
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                  <p className="text-xs text-gray-600 ml-8 leading-tight">Compounds, pads, and cloths</p>
                                </Link>
                              </div>
                              
                              {/* Etching */}
                              <div className="col-span-1">
                                <Link href="/consumables/etching" onClick={() => setActiveDropdown(null)} className="group block">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <FlaskConical className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Etching
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                  <p className="text-xs text-gray-600 ml-8 leading-tight">Etchants and reagents</p>
                                </Link>
                              </div>
                              
                              {/* Cleaning */}
                              <div className="col-span-1">
                                <Link href="/consumables/cleaning" onClick={() => setActiveDropdown(null)} className="group block">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <Droplet className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Cleaning
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                  <p className="text-xs text-gray-600 ml-8 leading-tight">Cleaning solutions and supplies</p>
                                </Link>
                              </div>
                              
                              {/* Hardness Testing */}
                              <div className="col-span-1">
                                <Link href="/consumables/hardness-testing" onClick={() => setActiveDropdown(null)} className="group block">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-1.5 bg-primary-50 rounded-md group-hover:bg-primary-100 transition-colors">
                                      <HardDrive className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors relative">
                                      Hardness Testing
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                                    </h3>
                                  </div>
                                  <p className="text-xs text-gray-600 ml-8 leading-tight">Accessories and supplies</p>
                                </Link>
                              </div>
                            </div>
                          </div>
                          
                          {/* Featured Type - 1 column */}
                          {featuredConsumableType && featuredConsumableType.image && (
                            <div className="col-span-1 pl-4 border-l border-gray-200">
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Featured</p>
                              <Link 
                                href={`/consumables/${featuredConsumableType.category}/${featuredConsumableType.subcategory}`}
                                onClick={() => setActiveDropdown(null)}
                                className="group block"
                              >
                                <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src={featuredConsumableType.image}
                                    alt={featuredConsumableType.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none'
                                    }}
                                  />
                                </div>
                                <h4 className="text-xs font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                                  {featuredConsumableType.label}
                                </h4>
                                <p className="text-xs text-gray-500">Browse all options</p>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <span className="text-gray-300 mx-1">|</span>
              
              {/* Services */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href="/services" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1 relative group"
                >
                  Services
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {activeDropdown === 'services' && (
                  <>
                    {/* Invisible bridge to prevent gap */}
                    <div className="absolute top-full left-0 w-full h-2"></div>
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50">
                      <Link href="/services" onClick={() => setActiveDropdown(null)} className="block px-5 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 mx-2 focus:outline-none focus:ring-0">
                        All Services
                      </Link>
                      <div className="border-t border-gray-200 my-2 mx-2"></div>
                      <div className="px-2">
                        <Link href="/quote" onClick={() => setActiveDropdown(null)} className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0">
                          Request Quote
                        </Link>
                        <Link href="/keeppace" onClick={() => setActiveDropdown(null)} className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0">
                          Service Plans
                        </Link>
                        <Link href="/builder" onClick={() => setActiveDropdown(null)} className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0">
                          Build Your Lab
                        </Link>
                        <Link href="/contact" onClick={() => setActiveDropdown(null)} className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0">
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <span className="text-gray-300 mx-1">|</span>
              
              {/* Learn Mega Menu - Combining Guides, Resources, Tools, Databases */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
              >
                <Link 
                  href="/guides" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1 relative group"
                >
                  Learn
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {activeDropdown === 'resources' && (
                  <>
                    {/* Invisible bridge covering gap from bottom of header to top of menu */}
                    <div 
                      className="fixed left-0 right-0 z-40 bg-transparent"
                      style={{ 
                        top: `${headerHeight}px`,
                        height: '1px',
                        pointerEvents: 'auto'
                      }}
                      onMouseEnter={() => setActiveDropdown('resources')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    ></div>
                    {/* Full-width mega menu */}
                    <div 
                      data-mega-menu="resources"
                      className="fixed left-0 right-0 bg-gradient-to-b from-white via-gray-100 to-white border-b border-gray-200 shadow-2xl z-50 animate-[fadeInSlideDown_0.3s_ease-out]"
                      style={{ top: `${headerHeight}px` }}
                      onMouseEnter={() => setActiveDropdown('resources')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="grid grid-cols-4 gap-6">
                          {/* Guides Column */}
                          <div>
                            <Link href="/guides" onClick={() => setActiveDropdown(null)} className="group block mb-3">
                              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 relative">
                                Guides
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                              </h3>
                            </Link>
                            <div className="space-y-1">
                              <Link href="/guides?category=Basics" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Basics
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/guides?category=Process" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Process
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/guides?category=Material-Specific" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Material-Specific
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/guides?category=Application-Specific" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Application-Specific
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/guides?category=Troubleshooting" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Troubleshooting
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                            </div>
                          </div>
                          
                          {/* Resources Column */}
                          <div>
                            <Link href="/resources" onClick={() => setActiveDropdown(null)} className="group block mb-3">
                              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 relative">
                                Resources
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                              </h3>
                            </Link>
                            <div className="space-y-1">
                              <Link href="/glossary" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Glossary
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/resources/checklist" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Sample Prep Checklist
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/resources/grit-size-chart" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Grit Size Chart
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/resources/common-etchants-guide" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Common Etchants
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/resources?category=Reference Charts" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Reference Charts
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                            </div>
                          </div>
                          
                          {/* Tools Column */}
                          <div>
                            <Link href="/tools" onClick={() => setActiveDropdown(null)} className="group block mb-3">
                              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 relative">
                                Tools
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                              </h3>
                            </Link>
                            <div className="space-y-1">
                              <Link href="/tools/grit-size-converter" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Grit Size Converter
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/tools/etchant-selector" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Etchant Selector
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/tools/polishing-time-calculator" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Polishing Time Calculator
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/tools?category=Calculators" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                All Calculators
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/tools?category=Reference" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Reference Tools
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                            </div>
                          </div>
                          
                          {/* Databases Column */}
                          <div>
                            <Link href="/databases" onClick={() => setActiveDropdown(null)} className="group block mb-3">
                              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 relative">
                                Databases
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                              </h3>
                            </Link>
                            <div className="space-y-1">
                              <Link href="/materials" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Materials Database
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/etchants" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Etchants Database
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/standards" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Standards Database
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                              <Link href="/microstructures" onClick={() => setActiveDropdown(null)} className="block px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-md transition-all duration-200 relative group/item">
                                Microstructure Gallery
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <span className="text-gray-300 mx-1">|</span>
              
              {/* Blog */}
              <Link 
                href="/blog" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                Blog
              </Link>
            </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-all duration-200 relative group"
              aria-label="Search"
              title="Search (Ctrl+K or Cmd+K)"
            >
              <Search className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
            {isAdmin ? (
              <>
                <Link 
                  href="/admin" 
                  className="px-5 py-2 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-full transition-all duration-200"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="https://shop.metallographic.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200 text-sm shadow-sm hover:shadow-md"
                >
                  Shop Consumables
                </Link>
                <Link 
                  href="/quote" 
                  className="px-5 py-2 bg-gray-900 text-white hover:text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center space-x-2 text-sm shadow-md hover:shadow-lg"
                >
                  <span>Request Quote</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Nav Bar - Pill Shaped */}
        <div className="lg:hidden flex items-center h-16 px-6 rounded-full bg-white border border-gray-200 shadow-lg shadow-gray-900/5 mt-3">
          {/* Mobile Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-12 w-auto">
                <Image 
                  src="/images/pace/tri-structure.png" 
                  alt="Materialographic.com" 
                  width={48} 
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                  fetchPriority="high"
                  quality={75}
                  sizes="48px"
                />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="ml-auto p-2 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 px-6 rounded-2xl mt-3 shadow-xl transition-all duration-300 bg-white border border-gray-200 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Equipment Section */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200">
                <Link 
                  href="/equipment" 
                  className="flex-1 text-gray-900 hover:text-primary-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Equipment
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileExpandedSection(mobileExpandedSection === 'equipment' ? null : 'equipment')
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Toggle Equipment submenu"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'equipment' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpandedSection === 'equipment' && (
                <div className="pl-4 pt-2 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <Link href="/equipment/sectioning" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Sectioning</Link>
                  <Link href="/equipment/mounting" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Mounting</Link>
                  <Link href="/equipment/grinding-polishing" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Grinding & Polishing</Link>
                  <Link href="/equipment/microscopy" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Microscopy</Link>
                  <Link href="/equipment/hardness-testing" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Hardness Testing</Link>
                </div>
              )}
            </div>

            {/* Consumables Section */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200">
                <Link 
                  href="/consumables" 
                  className="flex-1 text-gray-900 hover:text-primary-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Consumables
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileExpandedSection(mobileExpandedSection === 'consumables' ? null : 'consumables')
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Toggle Consumables submenu"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'consumables' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpandedSection === 'consumables' && (
                <div className="pl-4 pt-2 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <Link href="/consumables/sectioning" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Sectioning</Link>
                  <Link href="/consumables/mounting" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Mounting</Link>
                  <Link href="/consumables/grinding-lapping" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Grinding & Lapping</Link>
                  <Link href="/consumables/polishing" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Polishing</Link>
                  <Link href="/consumables/etching" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Etching</Link>
                  <Link href="/consumables/cleaning" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Cleaning</Link>
                  <Link href="/consumables/hardness-testing" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Hardness Testing</Link>
                </div>
              )}
            </div>

            {/* Services Section */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200">
                <Link 
                  href="/services" 
                  className="flex-1 text-gray-900 hover:text-primary-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileExpandedSection(mobileExpandedSection === 'services' ? null : 'services')
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Toggle Services submenu"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'services' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpandedSection === 'services' && (
                <div className="pl-4 pt-2 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <Link href="/services" className="block py-1.5 text-sm font-semibold text-primary-600" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link href="/quote" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Request Quote</Link>
                  <Link href="/keeppace" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Service Plans</Link>
                  <Link href="/builder" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Build Your Lab</Link>
                  <Link href="/contact" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                </div>
              )}
            </div>

            {/* Learn Mega Menu Section - Combining Guides, Resources, Tools, Databases */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200">
                <Link 
                  href="/guides" 
                  className="flex-1 text-gray-900 hover:text-primary-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Learn
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileExpandedSection(mobileExpandedSection === 'resources' ? null : 'resources')
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Toggle Learn submenu"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'resources' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpandedSection === 'resources' && (
                <div className="pl-4 pt-2 pb-2 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  {/* Guides Subsection */}
                  <div>
                    <Link href="/guides" className="block py-2 text-sm font-semibold text-primary-600">Guides</Link>
                    <div className="pl-2 space-y-1">
                      <Link href="/guides?category=Basics" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Basics</Link>
                      <Link href="/guides?category=Process" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Process</Link>
                      <Link href="/guides?category=Material-Specific" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Material-Specific</Link>
                      <Link href="/guides?category=Application-Specific" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Application-Specific</Link>
                      <Link href="/guides?category=Troubleshooting" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Troubleshooting</Link>
                    </div>
                  </div>
                  
                  {/* Resources Subsection */}
                  <div>
                    <Link href="/resources" className="block py-2 text-sm font-semibold text-primary-600">Resources</Link>
                    <div className="pl-2 space-y-1">
                      <Link href="/glossary" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Glossary</Link>
                      <Link href="/resources/checklist" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Sample Prep Checklist</Link>
                      <Link href="/resources/grit-size-chart" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Grit Size Chart</Link>
                      <Link href="/resources/common-etchants-guide" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Common Etchants</Link>
                    </div>
                  </div>
                  
                  {/* Tools Subsection */}
                  <div>
                    <Link href="/tools" className="block py-2 text-sm font-semibold text-primary-600">Tools</Link>
                    <div className="pl-2 space-y-1">
                      <Link href="/tools/grit-size-converter" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Grit Size Converter</Link>
                      <Link href="/tools/etchant-selector" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Etchant Selector</Link>
                      <Link href="/tools/polishing-time-calculator" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Polishing Time Calculator</Link>
                    </div>
                  </div>
                  
                  {/* Databases Subsection */}
                  <div>
                    <Link href="/databases" className="block py-2 text-sm font-semibold text-primary-600">Databases</Link>
                    <div className="pl-2 space-y-1">
                      <Link href="/materials" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Materials Database</Link>
                      <Link href="/etchants" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Etchants Database</Link>
                      <Link href="/standards" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Standards Database</Link>
                      <Link href="/microstructures" className="block py-1 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Microstructure Gallery</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Section */}
            <div className="mb-2">
              <Link 
                href="/blog" 
                className="block py-2.5 text-gray-900 hover:text-primary-600 font-semibold border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>

            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setSearchOpen(true)
                }}
                className="px-5 py-2 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200 text-center text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              {isAdmin ? (
                <>
                  <Link 
                    href="/admin" 
                    className="px-5 py-2 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all duration-200 text-center text-sm shadow-md hover:shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                    className="px-5 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200 text-center text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="https://shop.metallographic.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200 text-center text-sm shadow-sm hover:shadow-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shop Consumables
                  </Link>
                  <Link 
                    href="/builder" 
                    className="px-5 py-2 bg-gray-900 text-white hover:text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 text-sm shadow-md hover:shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Build Your Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Global Search */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}

