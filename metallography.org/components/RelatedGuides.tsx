import Link from 'next/link'
import { guides, type Guide } from '@/data/guides'
import { getRelatedGuides } from '@/lib/guide-seo'
import { BookOpen, ChevronRight } from 'lucide-react'

interface RelatedGuidesProps {
  currentGuide: Guide
  limit?: number
}

export default function RelatedGuides({ currentGuide, limit = 3 }: RelatedGuidesProps) {
  const related = getRelatedGuides(currentGuide, limit)

  if (related.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary-400 hover:shadow-md transition-all duration-200 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide bg-primary-50 px-2 py-1 rounded">
                  {guide.category}
                </span>
              </div>
              <span className="text-xs text-gray-500">{guide.readTime}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
              {guide.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow">
              {guide.description}
            </p>
            <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Guide
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

