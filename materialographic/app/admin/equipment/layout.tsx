import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipment Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default function EquipmentAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


