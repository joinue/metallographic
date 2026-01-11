import Link from 'next/link'
import { Home, Search, BookOpen, FileText, Calculator, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found - 404',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-20">
      <div className="container-custom max-w-3xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600/20 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track with our metallography resources.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-12 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Pages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/guides" 
              className="card hover:border-primary-300 group text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-primary-600" />
                <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  Sample Preparation Guides
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Comprehensive guides for metallographic sample preparation
              </p>
              <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                Browse Guides
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>

            <Link 
              href="/resources" 
              className="card hover:border-primary-300 group text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary-600" />
                <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  Free Resources
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Checklists, charts, and reference materials
              </p>
              <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                View Resources
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>

            <Link 
              href="/tools" 
              className="card hover:border-primary-300 group text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-5 h-5 text-primary-600" />
                <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  Tools & Calculators
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Useful calculators and reference tools
              </p>
              <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                Explore Tools
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>

            <Link 
              href="/materials" 
              className="card hover:border-primary-300 group text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <Search className="w-5 h-5 text-primary-600" />
                <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  Materials Database
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Search our database of materials and preparation methods
              </p>
              <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                Search Materials
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
          <Link href="/guides" className="btn-secondary inline-flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            Browse Guides
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <Link href="/contact" className="text-primary-600 hover:underline font-semibold">
              contact us
            </Link>
            {' '}and let us know what you were looking for.
          </p>
        </div>
      </div>
    </div>
  )
}

