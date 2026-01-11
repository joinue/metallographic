import { MetadataRoute } from 'next'
import { guides } from '@/data/guides'
import { getAllMaterials, getAllEtchants, getAllStandards, getPublishedBlogPosts } from '@/lib/supabase'

// Force dynamic rendering to ensure database queries work
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://materialographic.com'
  const now = new Date()
  
  // Generate guide URLs
  const guideUrls = guides.map(guide => ({
    url: guide.slug === 'troubleshooting-common-issues' 
      ? `${baseUrl}/resources/troubleshooting-guide`
      : `${baseUrl}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: guide.category === 'Material-Specific' || guide.category === 'Application-Specific' ? 0.8 : 0.7,
  }))

  // Fetch dynamic content
  let blogPosts: Awaited<ReturnType<typeof getPublishedBlogPosts>> = []
  let materials: Awaited<ReturnType<typeof getAllMaterials>> = []
  let etchants: Awaited<ReturnType<typeof getAllEtchants>> = []
  let standards: Awaited<ReturnType<typeof getAllStandards>> = []

  try {
    blogPosts = await getPublishedBlogPosts()
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  try {
    materials = await getAllMaterials()
  } catch (error) {
    console.error('Error fetching materials for sitemap:', error)
  }

  try {
    etchants = await getAllEtchants()
  } catch (error) {
    console.error('Error fetching etchants for sitemap:', error)
  }

  try {
    standards = await getAllStandards()
  } catch (error) {
    console.error('Error fetching standards for sitemap:', error)
  }

  // Helper function to safely parse dates
  const safeDate = (dateString: string | null | undefined): Date => {
    if (!dateString) return now
    try {
      const date = new Date(dateString)
      return isNaN(date.getTime()) ? now : date
    } catch {
      return now
    }
  }

  // Generate blog post URLs
  const blogPostUrls = blogPosts
    .filter(post => post.slug && typeof post.slug === 'string' && post.slug.trim().length > 0)
    .map(post => ({
      url: `${baseUrl}/blog/${encodeURIComponent(post.slug!)}`,
      lastModified: safeDate(post.updated_at || post.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Generate material URLs
  const materialUrls = materials
    .filter(material => material.slug && typeof material.slug === 'string' && material.slug.trim().length > 0)
    .map(material => ({
      url: `${baseUrl}/materials/${encodeURIComponent(material.slug!)}`,
      lastModified: safeDate(material.updated_at || material.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Generate etchant URLs
  const etchantUrls = etchants
    .filter(etchant => etchant.status === 'published' && etchant.slug && typeof etchant.slug === 'string' && etchant.slug.trim().length > 0)
    .map(etchant => ({
      url: `${baseUrl}/etchants/${encodeURIComponent(etchant.slug!)}`,
      lastModified: safeDate(etchant.updated_at || etchant.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Generate standard URLs
  const standardUrls = standards
    .filter(standard => standard.status === 'published' && standard.slug && typeof standard.slug === 'string' && standard.slug.trim().length > 0)
    .map(standard => ({
      url: `${baseUrl}/standards/${encodeURIComponent(standard.slug!)}`,
      lastModified: safeDate(standard.updated_at || standard.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...guideUrls,
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Individual resource pages
    {
      url: `${baseUrl}/resources/checklist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/grit-size-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/common-etchants-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/hardness-scale-conversion`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/astm-standards-reference`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/safety-data-sheet-reference`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/microscope-magnification-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/material-preparation-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/polishing-cloth-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/pace-youtube-channel`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/troubleshooting-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Individual tool pages
    {
      url: `${baseUrl}/tools/grit-size-converter`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/polishing-time-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/grain-size-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/mounting-material-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/procedure-time-estimator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/etchant-selector`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/mold-compatibility-checker`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/builder`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/equipment`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consumables`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/databases`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/materials`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...materialUrls,
    {
      url: `${baseUrl}/etchants`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...etchantUrls,
    {
      url: `${baseUrl}/standards`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...standardUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/distribution`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/site-map`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/microstructures`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/keeppace`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogPostUrls,
  ]
}

