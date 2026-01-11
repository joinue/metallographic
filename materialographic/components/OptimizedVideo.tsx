'use client'

import { useEffect, useRef, useState } from 'react'

interface OptimizedVideoProps {
  src: string
  poster?: string
  ariaLabel: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

export default function OptimizedVideo({
  src,
  poster,
  ariaLabel,
  className = 'w-full h-full object-cover',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Intersection Observer to pause/play videos when in/out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting)
          
          if (entry.isIntersecting) {
            // Video is in viewport - load and play if autoplay is enabled
            if (!hasLoaded) {
              // Set src and load video when it comes into view
              video.src = src
              video.load() // Load video when it comes into view
              setHasLoaded(true)
            }
            if (autoPlay && video.paused) {
              video.play().catch(() => {
                // Autoplay may fail, ignore silently
              })
            }
          } else {
            // Video is out of viewport - pause to save resources
            if (!video.paused) {
              video.pause()
            }
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of video is visible (earlier trigger)
        rootMargin: '200px', // Start loading 200px before entering viewport (earlier preload)
      }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [autoPlay, hasLoaded, src])

  return (
    <video
      ref={videoRef}
      src={hasLoaded ? src : undefined} // Lazy load source when in viewport
      poster={poster}
      autoPlay={autoPlay && isIntersecting}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload="none" // Don't load anything until explicitly loaded (faster initial render)
      className={className}
      aria-label={ariaLabel}
    />
  )
}

