import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-hidden">
      {/* Back Button - Icon Only */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-40 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Go back to home"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>
      
      {/* Login Content - Centered, No Scroll */}
      <div className="h-full flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  )
}
