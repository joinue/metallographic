import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Materials Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MaterialsAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

