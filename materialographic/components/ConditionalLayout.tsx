'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReturnToTop from '@/components/ReturnToTop'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <main>{children}</main>
  }

  return (
    <>
      <div className="build-page-hidden">
        <Header />
      </div>
      <main className="min-h-screen pt-24 lg:pt-28 build-page-main">{children}</main>
      <div className="build-page-hidden">
        <Footer />
        <ReturnToTop />
      </div>
    </>
  )
}

