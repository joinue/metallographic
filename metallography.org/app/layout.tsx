import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReturnToTop from '@/components/ReturnToTop'
import PageViewTracker from '@/components/PageViewTracker'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://metallography.org'),
  title: {
    default: 'Metallography.org - Free Metallographic Sample Preparation Guides & Resources',
    template: '%s | Metallography.org',
  },
  description: 'Free educational resources, guides, and best practices for metallographic sample preparation. Learn techniques, troubleshooting tips, and access expert knowledge.',
  keywords: ['metallography', 'sample preparation', 'metallographic', 'grinding', 'polishing', 'etching', 'microscopy', 'metallurgical analysis', 'material science', 'microstructure'],
  authors: [{ name: 'Metallography.org' }],
  creator: 'Metallography.org',
  publisher: 'Metallography.org',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any', media: '(prefers-color-scheme: light)' },
      { url: '/logo-white.png', sizes: 'any', media: '(prefers-color-scheme: dark)' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://metallography.org',
    siteName: 'Metallography.org',
    title: 'Metallography.org - Free Metallographic Sample Preparation Guides & Resources',
    description: 'Free educational resources, guides, and best practices for metallographic sample preparation. Learn techniques, troubleshooting tips, and access expert knowledge.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Metallography.org - Free Metallographic Sample Preparation Resources',
      },
      // White logo variant for dark backgrounds (platforms may choose based on context)
      {
        url: '/logo-white.png',
        width: 1200,
        height: 630,
        alt: 'Metallography.org - Free Metallographic Sample Preparation Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metallography.org - Free Metallographic Sample Preparation Guides',
    description: 'Free educational resources, guides, and best practices for metallographic sample preparation.',
    images: ['/logo.png'],
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
    canonical: 'https://metallography.org',
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
        {/* Dark mode favicon support - Next.js metadata API doesn't support media queries for icons */}
        <link rel="icon" href="/logo.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/logo-white.png" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${inter.className} font-sans antialiased relative bg-white`}>
        {/* Grain Structure Background Pattern - Full Page */}
        <div className="fixed inset-0 opacity-[0.08] overflow-hidden pointer-events-none z-0">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="currentColor" strokeWidth="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" className="text-gray-400"/>
          </svg>
        </div>
        <div className="relative z-10">
          <Suspense fallback={null}>
          <PageViewTracker />
          </Suspense>
          <div className="build-page-hidden">
            <Header />
          </div>
          <main className="min-h-screen pt-24 build-page-main">{children}</main>
          <div className="build-page-hidden">
            <Footer />
            <ReturnToTop />
          </div>
        </div>
      </body>
    </html>
  )
}

