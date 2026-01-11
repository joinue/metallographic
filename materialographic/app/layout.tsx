import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'
import PageViewTracker from '@/components/PageViewTracker'
import CSSOptimizer from '@/components/CSSOptimizer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '600', '700'],
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://materialographic.com'),
  title: {
    default: 'Materialographic.com - Metallographic Sample Preparation Resources',
    template: '%s | Materialographic.com',
  },
  description: 'Comprehensive metallographic sample preparation resources and tools. Expert guides, databases, and knowledge for metallography from PACE Technologies.',
  keywords: ['metallography', 'sample preparation', 'metallographic', 'grinding', 'polishing', 'etching', 'microscopy', 'metallurgical analysis', 'material science', 'microstructure', 'PACE Technologies', 'materialographic'],
  authors: [{ name: 'PACE Technologies' }],
  creator: 'PACE Technologies',
  publisher: 'PACE Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/images/pace/tri-structure.png', sizes: 'any', media: '(prefers-color-scheme: light)' },
      { url: '/images/pace/tri-structure.png', sizes: 'any', media: '(prefers-color-scheme: dark)' },
      { url: '/images/pace/tri-structure.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/pace/tri-structure.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://materialographic.com',
    siteName: 'Materialographic.com',
    title: 'Materialographic.com - Metallographic Sample Preparation Resources',
    description: 'Comprehensive metallographic sample preparation resources and tools. Expert guides, databases, and knowledge for metallography from PACE Technologies.',
    images: [
      {
        url: '/images/pace/materialographic-logo.png',
        width: 1200,
        height: 630,
        alt: 'Materialographic.com - PACE Technologies Metallographic Resources',
      },
      // White logo variant for dark backgrounds (platforms may choose based on context)
      {
        url: '/images/pace/materialographic-logo-white.png',
        width: 1200,
        height: 630,
        alt: 'Materialographic.com - PACE Technologies Metallographic Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Materialographic.com - Metallographic Sample Preparation Resources',
    description: 'Comprehensive metallographic sample preparation resources and tools from PACE Technologies.',
    images: ['/images/pace/materialographic-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://materialographic.com',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        {/* CSS Optimizer - Preload CSS chunks early to reduce render blocking */}
        <CSSOptimizer />
        
        {/* Note: Next.js automatically handles font preloading when using next/font/google */}
        {/* No need for Google Fonts preconnect since fonts are self-hosted by Next.js */}
        {/* Fonts are served from the same origin, so no cross-origin preconnect needed */}
        
        {/* Note: Favicon preloading is handled automatically by Next.js metadata API */}
        {/* Dark mode favicon support - Next.js metadata API doesn't support media queries for icons */}
        <link rel="icon" href="/images/pace/tri-structure.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/images/pace/tri-structure.png" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${inter.className} font-sans antialiased relative bg-white`}>
        {/* Grain Structure Background Pattern - Optimized SVG with GPU acceleration */}
        <div 
          className="fixed inset-0 opacity-[0.08] overflow-hidden pointer-events-none z-0"
          style={{
            willChange: 'auto',
            transform: 'translateZ(0)', // GPU acceleration
          }}
          aria-hidden="true"
        >
          <svg 
            className="absolute inset-0 w-full h-full" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern 
                id="hexagons" 
                x="0" 
                y="0" 
                width="100" 
                height="86.6" 
                patternUnits="userSpaceOnUse"
              >
                <polygon 
                  points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.4"
                  vectorEffect="non-scaling-stroke"
                />
              </pattern>
            </defs>
            <rect 
              width="100%" 
              height="100%" 
              fill="url(#hexagons)" 
              className="text-gray-400"
            />
          </svg>
        </div>
        <div className="relative z-10">
          <Suspense fallback={null}>
          <PageViewTracker />
          </Suspense>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </div>
      </body>
    </html>
  )
}

