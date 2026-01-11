'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface Section {
  id: string
  label: string
}

interface GuideSideNavProps {
  sections: Section[]
}

export default function GuideSideNav({ sections }: GuideSideNavProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [navBottom, setNavBottom] = useState<number | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Handle initial hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.slice(1) // Remove the # symbol
      if (hash) {
        // Wait for page to be fully loaded
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const headerOffset = 100
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
            
            // Set active section
            setActiveSection(hash)
          }
        }, 100)
      }
    }

    // Handle hash on initial load
    handleHashNavigation()

    // Also handle hash changes (e.g., browser back/forward)
    window.addEventListener('hashchange', handleHashNavigation)

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  useEffect(() => {
    let rafId: number | null = null
    let lastScrollTop = 0
    
    const handleScroll = () => {
      // Cancel any pending frame
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      
      // Throttle using requestAnimationFrame to batch layout reads
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        
        // Calculate scroll progress (no layout read needed)
        const scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100
        setProgress(Math.min(100, Math.max(0, scrollProgress)))

        // Batch all layout reads together to minimize reflows
        const footer = document.querySelector('footer')
        let footerTop: number | null = null
        if (footer) {
          const footerRect = footer.getBoundingClientRect()
          footerTop = footerRect.top
          
          const viewportBottom = windowHeight
          const navShouldStop = footerTop < viewportBottom
          
          if (navShouldStop) {
            const overlap = viewportBottom - footerTop
            const bottomOffset = Math.max(0, overlap + 24)
            setNavBottom(bottomOffset)
          } else {
            setNavBottom(null)
          }
        } else {
          setNavBottom(null)
        }

        // Batch all section element reads
        const sectionElements = sections
          .map(section => {
            const element = document.getElementById(section.id)
            if (element) {
              const rect = element.getBoundingClientRect()
              return {
                id: section.id,
                top: rect.top + scrollTop,
                bottom: rect.bottom + scrollTop,
              }
            }
            return null
          })
          .filter(Boolean) as Array<{ id: string; top: number; bottom: number }>

        // Determine active section
        const currentScroll = scrollTop + windowHeight / 3
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i]
          if (currentScroll >= section.top) {
            setActiveSection(section.id)
            if (window.location.hash !== `#${section.id}`) {
              window.history.replaceState(null, '', `${pathname}#${section.id}`)
            }
            break
          }
        }

        // Set first section as active at top
        if (scrollTop < 100) {
          setActiveSection(sections[0]?.id || '')
          if (window.location.hash && sections[0]?.id) {
            window.history.replaceState(null, '', pathname)
          }
        }
        
        lastScrollTop = scrollTop
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sections, pathname])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Update URL with hash
      window.history.pushState(null, '', `${pathname}#${id}`)

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Close nav on screens below 1800px after clicking
      if (window.innerWidth < 1800) {
        setIsOpen(false)
      }
    }
  }

  return (
    <>
      {/* Toggle Tab - Visible from xl (1280px) to 3xl (1800px) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          hidden xl:flex 3xl:hidden fixed top-1/2 -translate-y-1/2 z-50
          w-10 h-16 rounded-r-full bg-primary-600 hover:bg-primary-700
          shadow-lg border-r-2 border-primary-700
          transition-all duration-300 ease-in-out
          items-center justify-center
          ${isOpen ? 'left-72' : 'left-0'}
        `}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-white" aria-hidden="true" />
        ) : (
          <ChevronRight className="w-5 h-5 text-white" aria-hidden="true" />
        )}
      </button>

      {/* Overlay - Only on xl screens when open */}
      {isOpen && (
        <div
          className="hidden xl:block 3xl:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation */}
      <nav
        className={`
          hidden xl:block fixed left-4 top-24 w-72 z-40 pointer-events-none
          ${isOpen ? 'xl:translate-x-0' : 'xl:-translate-x-full'}
          3xl:translate-x-0
          transition-transform duration-300 ease-in-out
        `}
        style={{
          bottom: navBottom !== null ? `${navBottom}px` : '0',
        }}
        aria-label="Table of contents"
      >
        <div className="h-full flex items-center pointer-events-auto">
          <div className="w-full py-8 pr-6">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200/50 p-5 backdrop-blur-sm overflow-y-auto custom-scrollbar mx-auto"
              style={{
                maxHeight: navBottom !== null 
                  ? `calc(100vh - ${96 + (navBottom || 0)}px)` 
                  : 'calc(100vh - 8rem)',
                height: 'fit-content',
                maxWidth: '100%',
              }}
            >
            {/* Header */}
            <div className="mb-6 pb-4 border-b border-gray-200/60">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </h2>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Reading progress"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav aria-label="Page sections">
              <ol className="space-y-0" role="list">
                {sections.map((section, index) => {
                  const isActive = activeSection === section.id
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => handleClick(e, section.id)}
                        className={`
                          group relative flex items-center gap-3 px-3 py-1.5 text-sm rounded-lg
                          transition-all duration-200 w-full
                          ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 font-semibold shadow-sm'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                          }
                        `}
                        aria-current={isActive ? 'location' : undefined}
                      >
                        {/* Active Indicator */}
                        {isActive && (
                          <span
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r-full"
                            aria-hidden="true"
                          />
                        )}
                        
                        {/* Section Number */}
                        <span
                          className={`
                            flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium
                            transition-all duration-200
                            ${
                              isActive
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600'
                            }
                          `}
                          aria-hidden="true"
                        >
                          {index + 1}
                        </span>
                        
                        {/* Section Label */}
                        <span className="flex-1 text-left leading-snug">
                          {section.label}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
