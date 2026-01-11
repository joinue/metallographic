import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Materialographic.com - Metallographic Sample Preparation Resources',
    short_name: 'Materialographic',
    description: 'Comprehensive metallographic sample preparation resources from PACE Technologies',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/images/pace/tri-structure.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/pace/tri-structure.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/pace/tri-structure.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/pace/tri-structure.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['reference', 'science', 'business'],
    lang: 'en-US',
    orientation: 'portrait-primary',
    scope: '/',
  }
}

