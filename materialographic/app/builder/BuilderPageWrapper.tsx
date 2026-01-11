'use client'

import { useEffect } from 'react'

export default function BuilderPageWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add class to body to trigger CSS rules
    document.body.classList.add('build-page-active')
    
    return () => {
      // Remove class when component unmounts
      document.body.classList.remove('build-page-active')
    }
  }, [])

  return <>{children}</>
}

