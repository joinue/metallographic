'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Info, X } from 'lucide-react'
import { searchMaterials, type Material } from '@/lib/supabase'

// Global tracking of materials that have been shown (per page load)
const shownMaterials = new Set<string>()

interface MaterialTooltipProps {
  materialName: string
  children: React.ReactNode
  showOnFirstOccurrence?: boolean
  className?: string
}

export default function MaterialTooltip({ 
  materialName, 
  children, 
  showOnFirstOccurrence = true,
  className = '' 
}: MaterialTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const [material, setMaterial] = useState<Material | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const materialKey = materialName.toLowerCase()

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Search for material on mount
  useEffect(() => {
    const findMaterial = async () => {
      setIsLoading(true)
      try {
        // Normalize the search term - remove common suffixes like "stainless steel" to get just the number
        const normalizedName = materialName.trim()
        
        // Search for materials matching the name
        const results = await searchMaterials(normalizedName)
        
        // Try to find exact match first (case-insensitive)
        let found = results.find(
          m => m.name.toLowerCase() === normalizedName.toLowerCase()
        )
        
        // If no exact match, try matching by alternative names
        if (!found) {
          found = results.find(m => 
            m.alternative_names?.some(alt => 
              alt.toLowerCase() === normalizedName.toLowerCase()
            )
          )
        }
        
        // If still no match, try partial match - check if material name contains the search term or vice versa
        if (!found) {
          found = results.find(m => {
            const mNameLower = m.name.toLowerCase()
            const searchLower = normalizedName.toLowerCase()
            
            // Check if material name contains search term (e.g., "Stainless Steel 304" contains "304")
            if (mNameLower.includes(searchLower)) return true
            
            // Check if search term contains material name (e.g., "431 Stainless steel" contains "431")
            if (searchLower.includes(mNameLower)) return true
            
            // Check if material name contains key parts (e.g., "SS 304" or "304" matches "Stainless Steel 304")
            const searchParts = searchLower.split(/\s+/)
            return searchParts.some(part => 
              part.length > 2 && mNameLower.includes(part)
            )
          })
        }
        
        // If still no match and we have results, try to find by category match
        // For generic terms like "stainless steel", "titanium", etc.
        if (!found && results.length > 0) {
          // Prefer materials that match the category
          const categoryMatch = results.find(m => 
            m.category.toLowerCase().includes(normalizedName.toLowerCase()) ||
            normalizedName.toLowerCase().includes(m.category.toLowerCase())
          )
          found = categoryMatch || results[0]
        }
        
        setMaterial(found || null)
      } catch (error) {
        console.error('Error searching for material:', error)
        setMaterial(null)
      } finally {
        setIsLoading(false)
      }
    }

    findMaterial()
  }, [materialName])

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const tooltip = tooltipRef.current
      const trigger = triggerRef.current
      const rect = trigger.getBoundingClientRect()
      
      // Use requestAnimationFrame to ensure tooltip is rendered
      requestAnimationFrame(() => {
        if (tooltipRef.current && triggerRef.current) {
          const tooltipRect = tooltipRef.current.getBoundingClientRect()
          
          if (isMobile) {
            // Mobile: Center on viewport (existing behavior)
            // Position is already handled by CSS classes
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            
            const newPosition = spaceBelow < tooltipRect.height + 10 && spaceAbove > spaceBelow
              ? 'bottom'
              : 'top'
            
            setPosition(newPosition)

            // Scroll to ensure tooltip is visible on mobile
            setTimeout(() => {
              if (tooltipRef.current) {
                const tooltipElement = tooltipRef.current
                const tooltipRect = tooltipElement.getBoundingClientRect()
                const viewportHeight = window.innerHeight
                const headerHeight = 80
                const scrollY = window.scrollY

                const tooltipTop = tooltipRect.top + scrollY
                const tooltipBottom = tooltipRect.bottom + scrollY
                const viewportTop = scrollY + headerHeight
                const viewportBottom = scrollY + viewportHeight

                if (tooltipRect.top < headerHeight) {
                  const scrollAmount = tooltipTop - viewportTop - 10
                  window.scrollTo({
                    top: Math.max(0, scrollY + scrollAmount),
                    behavior: 'smooth'
                  })
                } else if (tooltipRect.bottom > viewportHeight) {
                  const scrollAmount = tooltipBottom - viewportBottom + 10
                  window.scrollTo({
                    top: scrollY + scrollAmount,
                    behavior: 'smooth'
                  })
                }
              }
            }, 100)
          } else {
            // Desktop: Position relative to trigger word (standard tooltip behavior)
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            
            const newPosition = spaceBelow < tooltipRect.height + 10 && spaceAbove > spaceBelow
              ? 'bottom'
              : 'top'
            
            setPosition(newPosition)
          }
        }
      })
    }
  }, [isVisible, material, isMobile])

  // Close tooltip when clicking outside (mobile only)
  useEffect(() => {
    if (!isMobile) return // Desktop uses hover, no need for click-outside handler
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isVisible &&
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isVisible, isMobile])

  // Handle click to toggle tooltip (mobile only)
  const handleClick = (e: React.MouseEvent) => {
    if (!isMobile) return // Desktop uses hover, ignore clicks
    
    e.preventDefault()
    e.stopPropagation()
    
    if (isVisible) {
      setIsVisible(false)
    } else {
      if (!showOnFirstOccurrence || !shownMaterials.has(materialKey)) {
        setIsVisible(true)
        if (showOnFirstOccurrence) {
          shownMaterials.add(materialKey)
        }
      } else {
        setIsVisible(true)
      }
    }
  }

  // Handle hover for desktop
  const handleMouseEnter = () => {
    if (!isMobile && !isVisible) {
      setIsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile && isVisible) {
      setIsVisible(false)
    }
  }

  // Don't render if material not found or still loading
  if (isLoading || !material) {
    return <>{children}</>
  }

  // Generate slug for link
  const materialSlug = material.slug || material.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <span 
      ref={triggerRef}
      className={`relative inline-block ${className}`}
    >
      <span 
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="border-b border-dotted border-primary-400 text-primary-700 cursor-pointer font-medium hover:border-primary-600 hover:text-primary-800 transition-colors active:text-primary-800"
      >
        {children}
      </span>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`absolute z-[9999] w-80 max-w-[calc(100vw-2rem)] sm:max-w-[90vw] ${
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } ${isMobile ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}
        >
          <div className="bg-gray-900 text-white rounded-lg shadow-xl border border-gray-700 p-4 animate-fadeIn">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2 flex-1">
                <Info className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="font-semibold text-base text-white">{material.name}</div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsVisible(false)
                }}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                aria-label="Close tooltip"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2 mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                {material.category}
              </p>
              
              {material.composition && (
                <p className="text-sm text-gray-200 leading-relaxed">
                  <strong className="text-gray-400">Composition:</strong> {material.composition}
                </p>
              )}
              
              {material.microstructure && (
                <p className="text-sm text-gray-200 leading-relaxed">
                  <strong className="text-gray-400">Microstructure:</strong> {material.microstructure}
                </p>
              )}
              
              {material.hardness && (
                <p className="text-sm text-gray-200 leading-relaxed">
                  <strong className="text-gray-400">Hardness:</strong> {material.hardness}
                </p>
              )}
              
              {material.special_notes && (
                <div className="bg-gray-800 rounded p-2 mt-2">
                  <p className="text-xs text-gray-300">
                    {material.special_notes}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Material
              </span>
              <Link
                href={`/materials/${materialSlug}`}
                className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsVisible(false)
                }}
              >
                View Material →
              </Link>
            </div>
            
            {/* Arrow */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 ${
                position === 'top'
                  ? 'top-full border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900'
                  : 'bottom-full border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900'
              }`}
            />
          </div>
        </div>
      )}
    </span>
  )
}

