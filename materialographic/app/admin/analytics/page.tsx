import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import AnalyticsDashboard from './AnalyticsDashboard'

type TimeRange = 'today' | 'yesterday' | '7d' | '30d' | '90d' | '365d' | 'ytd' | 'all'

function getDateRange(range: TimeRange): { start: Date | null; end: Date | null } {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  switch (range) {
    case 'today':
      return { start: today, end: now }
    case 'yesterday':
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayEnd = new Date(today)
      return { start: yesterday, end: yesterdayEnd }
    case '7d':
      const sevenDaysAgo = new Date(today)
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return { start: sevenDaysAgo, end: now }
    case '30d':
      const thirtyDaysAgo = new Date(today)
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return { start: thirtyDaysAgo, end: now }
    case '90d':
      const ninetyDaysAgo = new Date(today)
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
      return { start: ninetyDaysAgo, end: now }
    case '365d':
      const yearAgo = new Date(today)
      yearAgo.setDate(yearAgo.getDate() - 365)
      return { start: yearAgo, end: now }
    case 'ytd':
      const yearStart = new Date(now.getFullYear(), 0, 1)
      return { start: yearStart, end: now }
    case 'all':
    default:
      return { start: null, end: null }
  }
}

interface PageProps {
  searchParams: Promise<{ range?: string }>
}

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  const params = await searchParams
  const range = (params.range as TimeRange) || '30d'
  const { start, end } = getDateRange(range)

  // Fetch blog post statistics
  const { data: blogPosts, error: blogError } = await supabase
    .from('blog_posts')
    .select('id, slug, title, status, view_count, published_at, created_at')
    .order('created_at', { ascending: false })

  // Fetch newsletter subscription statistics
  const { data: subscriptions, error: subError } = await supabase
    .from('newsletter_subscriptions')
    .select('id, email, status, created_at, confirmed_at')
    .order('created_at', { ascending: false })

  // Build date filter query
  let pageViewsQuery = supabase
    .from('page_views')
    .select('path, country_code, country_name, region, city, device_type, session_id, viewed_at')
    .eq('is_bot', false)
  
  if (start) {
    pageViewsQuery = pageViewsQuery.gte('viewed_at', start.toISOString())
  }
  if (end) {
    pageViewsQuery = pageViewsQuery.lte('viewed_at', end.toISOString())
  }

  const { data: pageViewsRaw, error: pageViewsError } = await pageViewsQuery
    .order('viewed_at', { ascending: false })
    .limit(10000) // Increased limit for better stats

  // Filter out admin pages
  const pageViews = pageViewsRaw?.filter(p => !p.path.startsWith('/admin')) || []

  // Get top pages with date filter
  let topPagesQuery = supabase
    .from('page_views')
    .select('path')
    .eq('is_bot', false)
  
  if (start) {
    topPagesQuery = topPagesQuery.gte('viewed_at', start.toISOString())
  }
  if (end) {
    topPagesQuery = topPagesQuery.lte('viewed_at', end.toISOString())
  }

  const { data: topPagesDataRaw, error: topPagesError } = await topPagesQuery

  // Filter out admin pages
  const topPagesData = topPagesDataRaw?.filter(p => !p.path.startsWith('/admin')) || []

  // Get country stats with date filter
  let countryStatsQuery = supabase
    .from('page_views')
    .select('country_code, country_name, path')
    .eq('is_bot', false)
  
  if (start) {
    countryStatsQuery = countryStatsQuery.gte('viewed_at', start.toISOString())
  }
  if (end) {
    countryStatsQuery = countryStatsQuery.lte('viewed_at', end.toISOString())
  }

  const { data: countryStatsRaw, error: countryStatsError } = await countryStatsQuery

  // Filter out admin pages
  const countryStats = countryStatsRaw?.filter(c => !c.path?.startsWith('/admin')) || []

  // Get city/state stats for North America (US, CA, MX) with date filter
  let cityStateStatsQuery = supabase
    .from('page_views')
    .select('country_code, region, city, path')
    .eq('is_bot', false)
    .in('country_code', ['US', 'CA', 'MX'])
  
  if (start) {
    cityStateStatsQuery = cityStateStatsQuery.gte('viewed_at', start.toISOString())
  }
  if (end) {
    cityStateStatsQuery = cityStateStatsQuery.lte('viewed_at', end.toISOString())
  }

  const { data: cityStateStatsRaw, error: cityStateStatsError } = await cityStateStatsQuery

  // Filter out admin pages
  const cityStateStats = cityStateStatsRaw?.filter(c => !c.path?.startsWith('/admin')) || []

  // Get referrer stats with date filter
  let referrerStatsQuery = supabase
    .from('page_views')
    .select('referrer, path')
    .eq('is_bot', false)
  
  if (start) {
    referrerStatsQuery = referrerStatsQuery.gte('viewed_at', start.toISOString())
  }
  if (end) {
    referrerStatsQuery = referrerStatsQuery.lte('viewed_at', end.toISOString())
  }

  const { data: referrerStatsRaw, error: referrerStatsError } = await referrerStatsQuery

  // Filter out admin pages
  const referrerStats = referrerStatsRaw?.filter(r => !r.path?.startsWith('/admin')) || []

  // Log errors for debugging (only if there's a meaningful error)
  if (blogError && (blogError.message || blogError.code || Object.keys(blogError).length > 0)) {
    console.error('Error fetching blog posts:', {
      message: blogError.message,
      code: blogError.code,
      details: blogError.details,
      hint: blogError.hint,
      error: blogError
    })
  }
  if (subError) {
    // Only log if there's actual error content (not just an empty object)
    const hasErrorContent = subError.message || subError.code || subError.details || subError.hint
    if (hasErrorContent) {
      console.error('Error fetching newsletter subscriptions:', {
        message: subError.message,
        code: subError.code,
        details: subError.details,
        hint: subError.hint,
      })
    }
  }
  if (pageViewsError && (pageViewsError.message || pageViewsError.code)) {
    console.error('Error fetching page views:', {
      message: pageViewsError.message,
      code: pageViewsError.code,
      details: pageViewsError.details,
      hint: pageViewsError.hint,
      error: pageViewsError
    })
  }
  if (topPagesError && (topPagesError.message || topPagesError.code)) {
    console.error('Error fetching top pages:', {
      message: topPagesError.message,
      code: topPagesError.code,
      details: topPagesError.details,
      hint: topPagesError.hint,
      error: topPagesError
    })
  }
  if (countryStatsError && (countryStatsError.message || countryStatsError.code)) {
    console.error('Error fetching country stats:', {
      message: countryStatsError.message,
      code: countryStatsError.code,
      details: countryStatsError.details,
      hint: countryStatsError.hint,
      error: countryStatsError
    })
  }
  if (cityStateStatsError && (cityStateStatsError.message || cityStateStatsError.code)) {
    console.error('Error fetching city/state stats:', {
      message: cityStateStatsError.message,
      code: cityStateStatsError.code,
      details: cityStateStatsError.details,
      hint: cityStateStatsError.hint,
      error: cityStateStatsError
    })
  }
  if (referrerStatsError && (referrerStatsError.message || referrerStatsError.code)) {
    console.error('Error fetching referrer stats:', {
      message: referrerStatsError.message,
      code: referrerStatsError.code,
      details: referrerStatsError.details,
      hint: referrerStatsError.hint,
      error: referrerStatsError
    })
  }

  // Calculate blog statistics
  const blogStats = {
    total: blogPosts?.length || 0,
    published: blogPosts?.filter(p => p.status === 'published').length || 0,
    drafts: blogPosts?.filter(p => p.status === 'draft').length || 0,
    archived: blogPosts?.filter(p => p.status === 'archived').length || 0,
    totalViews: blogPosts?.reduce((sum, p) => sum + (p.view_count || 0), 0) || 0,
    mostViewed: blogPosts
      ?.filter(p => p.status === 'published')
      .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
      .slice(0, 5) || [],
    recentPosts: blogPosts?.slice(0, 5) || [],
  }

  // Calculate newsletter statistics
  const newsletterStats = {
    total: subscriptions?.length || 0,
    confirmed: subscriptions?.filter(s => s.status === 'confirmed').length || 0,
    pending: subscriptions?.filter(s => s.status === 'pending').length || 0,
    unsubscribed: subscriptions?.filter(s => s.status === 'unsubscribed').length || 0,
    recentSubscriptions: subscriptions?.slice(0, 10) || [],
  }

  // Categorize referrer sources
  const categorizeReferrer = (referrer: string | null): { category: string; source: string } => {
    if (!referrer || referrer.trim() === '') {
      return { category: 'Direct', source: 'Direct' }
    }

    try {
      const url = new URL(referrer)
      const hostname = url.hostname.toLowerCase()

      // Check if internal (same domain)
      if (hostname.includes('metallography.org') || hostname.includes('localhost')) {
        return { category: 'Internal', source: 'Internal' }
      }

      // Search engines
      const searchEngines = [
        { pattern: /google\./i, name: 'Google' },
        { pattern: /bing\./i, name: 'Bing' },
        { pattern: /yahoo\./i, name: 'Yahoo' },
        { pattern: /duckduckgo\./i, name: 'DuckDuckGo' },
        { pattern: /yandex\./i, name: 'Yandex' },
        { pattern: /baidu\./i, name: 'Baidu' },
      ]

      for (const engine of searchEngines) {
        if (engine.pattern.test(hostname)) {
          return { category: 'Search', source: engine.name }
        }
      }

      // Social media
      const socialMedia = [
        { pattern: /facebook\./i, name: 'Facebook' },
        { pattern: /twitter\./i, name: 'Twitter' },
        { pattern: /x\.com/i, name: 'Twitter/X' },
        { pattern: /linkedin\./i, name: 'LinkedIn' },
        { pattern: /reddit\./i, name: 'Reddit' },
        { pattern: /instagram\./i, name: 'Instagram' },
        { pattern: /youtube\./i, name: 'YouTube' },
        { pattern: /pinterest\./i, name: 'Pinterest' },
        { pattern: /tiktok\./i, name: 'TikTok' },
      ]

      for (const social of socialMedia) {
        if (social.pattern.test(hostname)) {
          return { category: 'Social', source: social.name }
        }
      }

      // Return the domain as external
      return { category: 'External', source: hostname.replace('www.', '') }
    } catch {
      // If URL parsing fails, treat as direct
      return { category: 'Direct', source: 'Direct' }
    }
  }

  // Calculate referrer statistics
  const calculateReferrerStats = () => {
    const categoryCounts: Record<string, number> = {}
    const sourceCounts: Record<string, number> = {}
    const topReferrers: Record<string, number> = {}

    referrerStats.forEach(ref => {
      const { category, source } = categorizeReferrer(ref.referrer)
      
      // Count by category
      categoryCounts[category] = (categoryCounts[category] || 0) + 1
      
      // Count by source
      sourceCounts[source] = (sourceCounts[source] || 0) + 1
      
      // Track top individual referrers (for external sites)
      if (ref.referrer && category === 'External') {
        try {
          const url = new URL(ref.referrer)
          const domain = url.hostname.replace('www.', '')
          topReferrers[domain] = (topReferrers[domain] || 0) + 1
        } catch {
          // Skip invalid URLs
        }
      }
    })

    return {
      byCategory: Object.entries(categoryCounts)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count),
      bySource: Object.entries(sourceCounts)
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20), // Top 20 sources
      topReferrers: Object.entries(topReferrers)
        .map(([domain, count]) => ({ domain, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10), // Top 10 external referrers
    }
  }

  // Calculate time-series data based on granularity
  const calculateTimeSeries = (granularity: 'hour' | 'day' | 'week' | 'month') => {
    if (!pageViews || pageViews.length === 0) return []

    const grouped: Record<string, number> = {}
    
    pageViews.forEach(view => {
      const date = new Date(view.viewed_at)
      let key: string
      
      if (granularity === 'hour') {
        // Group by hour
        key = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()).toISOString()
      } else if (granularity === 'day') {
        // Group by day
        key = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString()
      } else if (granularity === 'week') {
        // Group by week (start of week = Sunday)
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        weekStart.setHours(0, 0, 0, 0)
        key = weekStart.toISOString()
      } else {
        // Group by month
        key = new Date(date.getFullYear(), date.getMonth(), 1).toISOString()
      }
      
      grouped[key] = (grouped[key] || 0) + 1
    })
    
    return Object.entries(grouped)
      .map(([period, views]) => ({ period, views }))
      .sort((a, b) => new Date(a.period).getTime() - new Date(b.period).getTime())
  }

  // Calculate page view statistics
  const pageViewStats = {
    total: pageViews?.length || 0,
    uniqueVisitors: new Set(pageViews?.filter(p => p.session_id).map(p => p.session_id) || []).size,
    uniquePages: new Set(pageViews?.map(p => p.path) || []).size,
    timeSeries: {
      hour: calculateTimeSeries('hour'),
      day: calculateTimeSeries('day'),
      week: calculateTimeSeries('week'),
      month: calculateTimeSeries('month'),
    },
    topPages: (() => {
      const pageCounts: Record<string, number> = {}
      topPagesData?.forEach(p => {
        // Skip admin pages
        if (!p.path.startsWith('/admin')) {
          pageCounts[p.path] = (pageCounts[p.path] || 0) + 1
        }
      })
      return Object.entries(pageCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([path, count]) => ({ path, views: count }))
    })(),
    countries: (() => {
      if (!countryStats || countryStats.length === 0) {
        return []
      }
      const countryCounts: Record<string, { name: string; count: number }> = {}
      countryStats.forEach(c => {
        if (c.country_code) {
          const key = c.country_code
          if (!countryCounts[key]) {
            countryCounts[key] = { name: c.country_name || key, count: 0 }
          }
          countryCounts[key].count++
        }
      })
      return Object.entries(countryCounts)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 10)
        .map(([code, data]) => ({ code, name: data.name, count: data.count }))
    })(),
    citiesStates: (() => {
      if (!cityStateStats || cityStateStats.length === 0) {
        return []
      }
      const locationCounts: Record<string, { city: string | null; state: string | null; country: string; count: number }> = {}
      cityStateStats.forEach(loc => {
        // Create a key from city and state, prioritizing city
        const key = loc.city && loc.region 
          ? `${loc.city}, ${loc.region}, ${loc.country_code}`
          : loc.region 
          ? `${loc.region}, ${loc.country_code}`
          : loc.city
          ? `${loc.city}, ${loc.country_code}`
          : null
        
        if (key) {
          if (!locationCounts[key]) {
            locationCounts[key] = { 
              city: loc.city || null, 
              state: loc.region || null, 
              country: loc.country_code || 'Unknown',
              count: 0 
            }
          }
          locationCounts[key].count++
        }
      })
      return Object.entries(locationCounts)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 20)
        .map(([key, data]) => ({ 
          key,
          city: data.city,
          state: data.state,
          country: data.country,
          count: data.count 
        }))
    })(),
    recentViews: pageViews?.filter(p => !p.path.startsWith('/admin')).slice(0, 20) || [],
    deviceTypes: (() => {
      const deviceCounts: Record<string, number> = {}
      pageViews?.forEach(p => {
        const device = p.device_type || 'unknown'
        deviceCounts[device] = (deviceCounts[device] || 0) + 1
      })
      return Object.entries(deviceCounts)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count)
    })(),
    referrers: calculateReferrerStats(),
  }

  return (
    <AnalyticsDashboard
      blogStats={blogStats}
      newsletterStats={newsletterStats}
      pageViewStats={pageViewStats}
    />
  )
}

