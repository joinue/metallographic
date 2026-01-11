import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Management Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default function UsersAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}




