import { Package, FlaskConical } from 'lucide-react'
import Link from 'next/link'
import { GeneralRecommendation } from '../hooks/useBuilderRecommendations'

interface RecommendationItemProps {
  recommendation: GeneralRecommendation
}

// Parse markdown-style links [text](/path) and render as React components
function parseLinks(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    
    // Add the link
    parts.push(
      <Link
        key={match.index}
        href={match[2]}
        className="text-primary-600 hover:text-primary-700 underline font-medium"
      >
        {match[1]}
      </Link>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }
  
  return parts.length > 0 ? parts : [text]
}

export default function RecommendationItem({ recommendation }: RecommendationItemProps) {
  const Icon = recommendation.category === 'equipment' ? Package : FlaskConical
  
  return (
    <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
      <div className="flex items-start gap-3 mb-2">
        <Icon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h5 className="text-sm font-semibold text-gray-900 mb-1">
            {recommendation.type}
          </h5>
          <p className="text-xs text-gray-600 leading-relaxed">
            {parseLinks(recommendation.reasoning)}
          </p>
        </div>
      </div>
    </div>
  )
}

