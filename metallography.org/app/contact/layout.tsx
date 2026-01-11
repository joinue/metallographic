import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with Metallography.org. Have questions, feedback, or need assistance? Contact us and we'll respond as soon as possible.",
  keywords: ['contact', 'metallography', 'support', 'inquiry', 'help'],
  openGraph: {
    title: 'Contact Us | Metallography.org',
    description: 'Get in touch with Metallography.org. Have questions, feedback, or need assistance?',
    url: 'https://metallography.org/contact',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Metallography.org - Contact Us',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Metallography.org',
    description: 'Get in touch with Metallography.org. Have questions, feedback, or need assistance?',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

