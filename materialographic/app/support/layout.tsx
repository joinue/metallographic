import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Support - Expert Technical Support | PACE Technologies',
  description: 'Get expert technical support for your metallographic equipment. Personalized solutions, KeepPACE support programs, training, and 24/7 assistance from PACE Technologies.',
  keywords: [
    'PACE Technologies support',
    'metallographic equipment support',
    'technical support',
    'KeepPACE support program',
    'equipment training',
    'customer service',
    'metallography support',
  ],
  openGraph: {
    title: 'Customer Support - Expert Technical Support | PACE Technologies',
    description: 'Get expert technical support for your metallographic equipment. Personalized solutions and comprehensive training from PACE Technologies.',
    url: 'https://materialographic.com/support',
    siteName: 'Materialographic.com',
    images: [
      {
        url: '/images/pace/materialographic-logo.png',
        width: 1200,
        height: 630,
        alt: 'PACE Technologies Customer Support',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Support - PACE Technologies',
    description: 'Get expert technical support for your metallographic equipment.',
    images: ['/images/pace/materialographic-logo.png'],
  },
  alternates: {
    canonical: 'https://materialographic.com/support',
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
}

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

