import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grit Size Converter Tool | Metallography.org',
  description: 'Convert between FEPA, ANSI, JIS, and micron grit size standards for metallographic sample preparation.',
}

export default function GritConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

