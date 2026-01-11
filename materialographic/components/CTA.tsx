import Link from 'next/link'

interface CTAProps {
  variant?: 'primary' | 'secondary' | 'inline'
  href?: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

export default function CTA({ variant = 'primary', href = '#', children, className = '', target, rel }: CTAProps) {
  const baseClasses = variant === 'primary' 
    ? 'btn-primary' 
    : variant === 'secondary'
    ? 'btn-secondary'
    : 'text-primary-600 hover:text-primary-700 font-semibold'
  
  return (
    <Link href={href} className={`${baseClasses} ${className}`} target={target} rel={rel}>
      {children}
    </Link>
  )
}

