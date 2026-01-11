interface YouTubeVideoProps {
  videoId: string
  title: string
  description?: string
  className?: string
  id?: string
}

export default function YouTubeVideo({ videoId, title, description, className = '', id }: YouTubeVideoProps) {
  return (
    <div id={id} className={`my-8 scroll-mt-24 ${className}`}>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Video by Dr. Donald Zipperian, PhD - PACE Technologies |{' '}
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            Watch on YouTube
          </a>
        </p>
      </div>
    </div>
  )
}

