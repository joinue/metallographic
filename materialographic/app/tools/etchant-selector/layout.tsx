import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Etchant Selector Tool | Metallography.org',
  description: 'Find the right etchant for your material and application. Comprehensive guide to metallographic etching reagents.',
}

export default function EtchantSelectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

