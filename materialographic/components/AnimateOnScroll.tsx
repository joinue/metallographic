'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export default function AnimateOnScroll({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
}: AnimateOnScrollProps) {
  // Start with false, but will check on mount if already visible
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect mobile device for reduced animations
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
      requestIdleCallback(checkMobile)
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(checkMobile, 0)
    }
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // On mobile, reduce animation complexity for better performance
    if (isMobile && animation !== 'fadeIn') {
      // Skip complex animations on mobile, just fade in
      setIsVisible(true)
      return
    }

    // Fallback: if IntersectionObserver is not supported, show content immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const currentElement = elementRef.current
    if (!currentElement) return

    let observer: IntersectionObserver | null = null

    // Check if element is already visible on mount (for above-the-fold content)
    // Use requestAnimationFrame to batch layout reads and avoid forced reflow
    requestAnimationFrame(() => {
      if (!currentElement) return
      const rect = currentElement.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isInViewport) {
        setIsVisible(true)
        return
      }
      
      // If not visible, set up IntersectionObserver
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame to ensure animation triggers
            requestAnimationFrame(() => {
              setIsVisible(true)
            })
            // Disconnect after first animation to improve performance
            if (observer) {
              observer.disconnect()
            }
          }
        },
        {
          threshold,
          // Start loading images earlier (200px before entering viewport) for better perceived performance
          rootMargin: isMobile ? '200px 0px -100px 0px' : '300px 0px -50px 0px',
        }
      )

      observer.observe(currentElement)
    })

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [threshold, isMobile, animation])

  const animationClassMap = {
    fadeIn: 'animate-fadeIn',
    fadeInUp: 'animate-fadeInUp',
    fadeInDown: 'animate-fadeInDown',
    fadeInLeft: 'animate-fadeInLeft',
    fadeInRight: 'animate-fadeInRight',
    scaleIn: 'animate-scaleIn',
  }

  return (
    <div
      ref={elementRef}
      className={`animate-on-scroll ${isVisible ? animationClassMap[animation] : 'opacity-0'} ${className}`}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        animationDuration: isVisible ? `${duration}ms` : '0ms',
        // GPU acceleration for smoother animations
        willChange: isVisible ? 'transform, opacity' : 'auto',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      {children}
    </div>
  )
}

