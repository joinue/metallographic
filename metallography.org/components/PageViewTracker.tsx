'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

export default function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Skip tracking for admin pages
    if (pathname.startsWith('/admin')) {
      return
    }

    // Build full URL
    const fullUrl = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    // Track page view
    const trackPageView = async () => {
      try {
        const response = await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            fullUrl: fullUrl,
            referrer: document.referrer || null,
            sessionId: getSessionId(),
          }),
        })

        if (!response.ok) {
          console.error('Failed to track page view:', response.status, response.statusText)
        }
      } catch (error) {
        // Silently fail - tracking shouldn't break the site
        console.error('Failed to track page view:', error)
      }
    }

    // Small delay to ensure page is loaded
    const timeoutId = setTimeout(trackPageView, 100)

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  return null // This component doesn't render anything
}

