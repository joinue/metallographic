import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metallography Glossary - Terminology Dictionary',
  description: 'Comprehensive glossary of metallography terms, definitions, and concepts. Search and browse technical terminology used in sample preparation, microstructure analysis, and materials science.',
  keywords: ['metallography glossary', 'metallography terms', 'metallography dictionary', 'metallography definitions', 'technical terminology', 'sample preparation terms', 'microstructure terms'],
  openGraph: {
    title: 'Metallography Glossary - Terminology Dictionary',
    description: 'Comprehensive glossary of metallography terms, definitions, and concepts.',
    url: 'https://metallography.org/glossary',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Metallography Glossary',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metallography Glossary - Terminology Dictionary',
    description: 'Comprehensive glossary of metallography terms, definitions, and concepts.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/glossary',
  },
}

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

