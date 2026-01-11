import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit Support Request - PACE Technologies',
  description: 'Submit a support request for your metallographic equipment. Get expert technical assistance from PACE Technologies support team.',
  keywords: [
    'support request',
    'technical support',
    'equipment support',
    'PACE Technologies support',
    'customer service',
  ],
  openGraph: {
    title: 'Submit Support Request - PACE Technologies',
    description: 'Submit a support request for your metallographic equipment. Get expert technical assistance.',
    url: 'https://materialographic.com/support/request',
    siteName: 'Materialographic.com',
    images: [
      {
        url: '/images/pace/materialographic-logo.png',
        width: 1200,
        height: 630,
        alt: 'PACE Technologies Support',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://materialographic.com/support/request',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SupportRequestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

