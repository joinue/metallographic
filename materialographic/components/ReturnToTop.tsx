'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ReturnToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-40
        hidden md:flex
        items-center justify-center
        w-12 h-12
        bg-white/90 backdrop-blur-sm
        border border-gray-200/80
        rounded-full
        shadow-lg shadow-gray-900/10
        text-gray-700
        hover:bg-white
        hover:shadow-xl hover:shadow-gray-900/20
        active:opacity-80
        transition-opacity transition-shadow transition-colors duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Return to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
}

