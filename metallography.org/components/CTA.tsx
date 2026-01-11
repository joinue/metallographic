import Link from 'next/link'

interface CTAProps {
  variant?: 'primary' | 'secondary' | 'inline'
  href?: string
  children: React.ReactNode
  className?: string
}

export default function CTA({ variant = 'primary', href = '#', children, className = '' }: CTAProps) {
  const baseClasses = variant === 'primary' 
    ? 'btn-primary' 
    : variant === 'secondary'
    ? 'btn-secondary'
    : 'text-primary-600 hover:text-primary-700 font-semibold'
  
  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {children}
    </Link>
  )
}

