import Link from 'next/link'

interface ProductLinkProps {
  productName: string
  href?: string
  description?: string
}

export default function ProductLink({ productName, href, description }: ProductLinkProps) {
  const shopUrl = href || `https://shop.metallographic.com/search?q=${encodeURIComponent(productName)}`
  
  // Clean description of hype words
  const cleanDescription = description 
    ? description
        .replace(/high-quality/gi, 'suitable')
        .replace(/premium/gi, 'appropriate')
        .replace(/top-rated/gi, 'commonly used')
    : null
  
  return (
    <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
      <p className="text-sm text-gray-700 mb-2">
        <strong>Example Products:</strong> {productName}
        {cleanDescription && <span className="block text-gray-600 mt-1">{cleanDescription}</span>}
      </p>
      <p className="text-xs text-gray-600">
        For purchasing options and product specifications, see{' '}
        <Link 
          href={shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 font-semibold"
        >
          PACE Consumables Shop
        </Link>.
      </p>
    </div>
  )
}

