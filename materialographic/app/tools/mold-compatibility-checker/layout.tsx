import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sample Size/Mold Compatibility Checker Tool | Metallography.org',
  description: 'Check if your sample fits in standard mounting molds and get recommendations for appropriate mold sizes.',
}

export default function MoldCompatibilityCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>}

