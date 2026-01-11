import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Etchants Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default function EtchantsAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}




