import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request a Quote - Metallographic Equipment & Consumables',
  description: 'Request a personalized quote for metallographic equipment and consumables. Our experts will help you find the right solutions for your laboratory needs.',
  openGraph: {
    title: 'Request a Quote - Metallographic Equipment & Consumables',
    description: 'Request a personalized quote for metallographic equipment and consumables. Our experts will help you find the right solutions for your laboratory needs.',
  },
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

