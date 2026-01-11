import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import CareersPageClient from './CareersPageClient'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = {
  title: 'Careers at PACE Technologies | Join Our Team',
  description: 'Explore exciting career opportunities at PACE Technologies. Join a team dedicated to advancing metallographic innovation and excellence.',
  keywords: [
    'PACE Technologies',
    'careers',
    'jobs',
    'employment',
    'engineering',
    'laboratory',
    'metallography',
    'hiring',
    'Tucson',
    'Arizona',
  ],
  openGraph: {
    title: 'Careers at PACE Technologies | Metallographic Innovation',
    description: 'Browse job openings and join the team at PACE Technologies, a leader in metallographic equipment and consumables.',
    url: 'https://materialographic.com/careers',
    siteName: 'Materialographic.com',
    images: [
      {
        url: '/images/pace/materialographic-logo.png',
        width: 1200,
        height: 630,
        alt: 'PACE Technologies - Careers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at PACE Technologies',
    description: 'Explore open positions and build your career with PACE Technologies.',
    images: ['/images/pace/materialographic-logo.png'],
  },
  alternates: {
    canonical: 'https://materialographic.com/careers',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function CareersPage() {
  const supabase = await createClient()
  
  // Fetch active jobs
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header Section */}
        <AnimateOnScroll animation="fadeInUp" duration={500} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Careers at PACE</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join a family-owned company dedicated to advancing metallographic innovation. 
            We're looking for passionate individuals to help us serve laboratories worldwide.
          </p>
        </AnimateOnScroll>

        {/* Job Listings */}
        <CareersPageClient jobs={jobs || []} />
      </div>
    </div>
  )
}

