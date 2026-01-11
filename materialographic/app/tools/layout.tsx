import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metallography Tools & Calculators',
  description: 'Free tools and calculators for metallographic sample preparation including grit conversion, time calculators, and more.',
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

