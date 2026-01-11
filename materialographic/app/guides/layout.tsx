import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metallographic Sample Preparation Guides | Metallography.org',
  description: 'Comprehensive step-by-step guides for metallographic sample preparation. Learn grinding, polishing, etching, and more techniques.',
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

