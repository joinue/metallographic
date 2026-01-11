import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Standards Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StandardsAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

