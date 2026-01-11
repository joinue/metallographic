'use client'

interface ProcessVideoProps {
  src: string
  title?: string
  description?: string
  className?: string
  id?: string
}

export default function ProcessVideo({ src, title, description, className = '', id }: ProcessVideoProps) {
  // Only mute videos in /videos/process folder
  const isProcessVideo = src.includes('/videos/process/')
  
  return (
    <div id={id} className={`my-8 scroll-mt-24 ${className}`}>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            src={src}
            controls
            muted={isProcessVideo}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onVolumeChange={isProcessVideo ? (e) => {
              const videoEl = e.currentTarget
              if (videoEl.volume > 0) {
                videoEl.muted = true
                videoEl.volume = 0
              }
            } : undefined}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            aria-label={title || 'Process video'}
          />
        </div>
      </div>
    </div>
  )
}

