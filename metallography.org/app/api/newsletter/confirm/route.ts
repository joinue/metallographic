import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      // Redirect to error page or show error
      return NextResponse.redirect(new URL('/newsletter/confirmed?error=invalid', request.url))
    }

    const supabase = await createClient()

    // Find subscription by confirmation token
    const { data: subscription, error: fetchError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, status, email')
      .eq('confirmation_token', token)
      .single()

    if (fetchError || !subscription) {
      return NextResponse.redirect(new URL('/newsletter/confirmed?error=notfound', request.url))
    }

    // Check if already confirmed
    if (subscription.status === 'confirmed') {
      return NextResponse.redirect(new URL('/newsletter/confirmed?already=true', request.url))
    }

    // Confirm the subscription
    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', subscription.id)

    if (updateError) {
      console.error('Error confirming subscription:', updateError)
      return NextResponse.redirect(new URL('/newsletter/confirmed?error=failed', request.url))
    }

    // Redirect to success page
    return NextResponse.redirect(new URL('/newsletter/confirmed', request.url))
  } catch (error) {
    console.error('Newsletter confirmation error:', error)
    return NextResponse.redirect(new URL('/newsletter/confirmed?error=server', request.url))
  }
}

