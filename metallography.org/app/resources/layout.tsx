import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Metallography Resources | Checklists, PDFs & Reference Materials',
  description: 'Download free metallography resources including checklists, reference guides, and educational materials for sample preparation.',
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

