import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polishing Time Calculator Tool | Metallography.org',
  description: 'Calculate optimal polishing times based on material type and grit size for metallographic sample preparation.',
}

export default function PolishingTimeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

