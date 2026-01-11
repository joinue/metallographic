'use client'

import { useState, KeyboardEvent } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
  initialVisibleCount?: number
}

export default function FAQAccordion({ items, className = '', initialVisibleCount = 6 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleItem(index)
    }
  }

  const visibleItems = showAll ? items : items.slice(0, initialVisibleCount)
  const hasMore = items.length > initialVisibleCount

  return (
    <div className={className}>
      <div className="space-y-3" role="list">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
            role="listitem"
          >
            <button
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-inset cursor-pointer group"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              aria-label={`${item.question}. Click to ${openIndex === index ? 'collapse' : 'expand'} answer.`}
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-primary-600 transition-colors">
                {item.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'transform rotate-180 text-primary-600' : 'group-hover:text-primary-600'
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 pt-0 text-gray-700 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-4 py-2"
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                Show Less Questions
                <ChevronDown className="w-4 h-4 transform rotate-180 transition-transform" aria-hidden="true" />
              </>
            ) : (
              <>
                Show All {items.length} Questions
                <ChevronDown className="w-4 h-4 transition-transform" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

