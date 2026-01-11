import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consumables Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ConsumablesAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


