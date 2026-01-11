'use client'

import { useEffect } from 'react'

interface ViewTrackerProps {
  slug: string
}

export default function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    // Check if we've already tracked this view in this session
    const viewKey = `blog_view_${slug}`
    const hasViewed = sessionStorage.getItem(viewKey)

    if (hasViewed) {
      return // Already tracked this view in this session
    }

    // Track the view
    const trackView = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}/view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          // Mark as viewed in this session
          sessionStorage.setItem(viewKey, 'true')
        }
      } catch (error) {
        // Silently fail - view tracking shouldn't break the page
        console.error('Failed to track view:', error)
      }
    }

    trackView()
  }, [slug])

  return null // This component doesn't render anything
}

