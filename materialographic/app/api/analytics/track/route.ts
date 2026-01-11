import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

// Simple bot detection
function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i,
    /googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i,
    /baiduspider/i, /yandexbot/i, /sogou/i, /exabot/i,
    /ia_archiver/i, /archive/i
  ]
  return botPatterns.some(pattern => pattern.test(userAgent))
}

// Simple device detection
function getDeviceType(userAgent: string): string {
  if (/mobile|android|iphone|ipod|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile'
  }
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet'
  }
  return 'desktop'
}

// Simple browser detection
function getBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  if (userAgent.includes('Opera')) return 'Opera'
  return 'Other'
}

// Simple OS detection
function getOS(userAgent: string): string {
  if (userAgent.includes('Windows')) return 'Windows'
  if (userAgent.includes('Mac OS')) return 'macOS'
  if (userAgent.includes('Linux')) return 'Linux'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS'
  return 'Other'
}

export async function POST(request: NextRequest) {
  try {
    const { path, fullUrl, referrer, sessionId } = await request.json()

    if (!path) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      )
    }

    // Skip tracking for admin pages
    if (path.startsWith('/admin')) {
      return NextResponse.json({ success: true, skipped: 'admin' })
    }

    // Get client information
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || null
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Skip bots
    if (isBot(userAgent)) {
      return NextResponse.json({ success: true, skipped: 'bot' })
    }

    // Get geo-location from IP (using a free service)
    let geoData = {
      country_code: null as string | null,
      country_name: null as string | null,
      region: null as string | null,
      city: null as string | null,
    }

    // Try to get geo-location from IP
    // Using ipapi.co (free tier: 1000 requests/day)
    // You can also use other services like ip-api.com, geojs.io, etc.
    if (ip && ip !== 'unknown' && !ip.startsWith('127.') && !ip.startsWith('192.168.')) {
      try {
        // Using ip-api.com (free, no API key needed, 45 requests/minute)
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city`, {
          headers: { 'Accept': 'application/json' },
        })
        
        if (geoResponse.ok) {
          const geo = await geoResponse.json()
          if (geo.status === 'success') {
            geoData = {
              country_code: geo.countryCode || null,
              country_name: geo.country || null,
              region: geo.regionName || null,
              city: geo.city || null,
            }
          }
        }
      } catch (error) {
        // Silently fail geo-location - don't block page view tracking
        console.error('Geo-location error:', error)
      }
    }

    const supabase = await createClient()

    // Insert page view
    const { error } = await supabase
      .from('page_views')
      .insert({
        path: path,
        full_url: fullUrl || null,
        referrer: referrer || null,
        ip_address: ip || null,
        user_agent: userAgent,
        country_code: geoData.country_code,
        country_name: geoData.country_name,
        region: geoData.region,
        city: geoData.city,
        device_type: getDeviceType(userAgent),
        browser: getBrowser(userAgent),
        os: getOS(userAgent),
        session_id: sessionId || null,
        is_bot: false,
      })

    if (error) {
      console.error('Error tracking page view:', error)
      // Don't fail the request - tracking shouldn't break the site
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Page view tracking error:', error)
    // Always return success to not break the site
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

