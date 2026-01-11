'use client'

import { useEffect, useState, ReactNode, useRef, cloneElement, isValidElement } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  index?: number
  animation?: 'fadeInUp' | 'fadeIn' | 'scaleIn'
  delay?: number
  duration?: number
  className?: string
}

export default function AnimatedCard({
  children,
  index = 0,
  animation = 'fadeInUp',
  delay = 0,
  duration = 500,
  className = '',
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const mountedRef = useRef(false)

  useEffect(() => {
    // Reset animation state on mount or when index changes
    setIsVisible(false)
    mountedRef.current = true
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setIsVisible(true)
      }
    }, 10)

    return () => {
      clearTimeout(timer)
      mountedRef.current = false
    }
  }, [index]) // Re-trigger when index changes (which happens on filter change)

  const animationClassMap = {
    fadeInUp: 'animate-fadeInUp',
    fadeIn: 'animate-fadeIn',
    scaleIn: 'animate-scaleIn',
  }

  // Apply animation classes directly to the child element
  if (isValidElement(children)) {
    const childElement = children as React.ReactElement<any>
    return cloneElement(childElement, {
      className: `${childElement.props.className || ''} animate-on-scroll ${isVisible ? animationClassMap[animation] : 'opacity-0'} ${className}`.trim(),
      style: {
        ...(childElement.props.style || {}),
        animationDelay: `${delay + (index * 50)}ms`,
        animationDuration: `${duration}ms`,
      },
    } as any)
  }

  // Fallback: wrap in div if child is not a valid React element
  return (
    <div
      className={`animate-on-scroll ${isVisible ? animationClassMap[animation] : 'opacity-0'} ${className}`}
      style={{
        animationDelay: `${delay + (index * 50)}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

