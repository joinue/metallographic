import Image from 'next/image'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <Image
          src="/images/pace/tri-structure.png"
          alt="Loading"
          fill
          className="object-contain animate-spin"
          sizes={size === 'sm' ? '32px' : size === 'md' ? '48px' : '64px'}
        />
      </div>
    </div>
  )
}


