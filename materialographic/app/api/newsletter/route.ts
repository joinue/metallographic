import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

// Set this to true to enable email confirmation
// Set to false for auto-confirmation (current behavior)
const REQUIRE_EMAIL_CONFIRMATION = false

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get client IP and user agent for spam prevention
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Generate confirmation token
    const confirmationToken = crypto.randomBytes(32).toString('hex')

    const supabase = await createClient()

    // Check if email already exists
    const { data: existing, error: existingError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, status')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle()

    // If there's an error that's not "no rows found", log it
    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Error checking existing subscription:', existingError)
      return NextResponse.json(
        { error: 'Failed to check subscription status' },
        { status: 500 }
      )
    }

    if (existing) {
      if (existing.status === 'unsubscribed') {
        // Re-subscribe if they previously unsubscribed
        const status = REQUIRE_EMAIL_CONFIRMATION ? 'pending' : 'confirmed'
        const updateData: any = {
          status,
          confirmation_token: confirmationToken,
          unsubscribed_at: null,
        }

        if (!REQUIRE_EMAIL_CONFIRMATION) {
          updateData.confirmed_at = new Date().toISOString()
        } else {
          updateData.confirmed_at = null
        }

        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update(updateData)
          .eq('id', existing.id)

        if (updateError) {
          console.error('Error updating subscription:', updateError)
          return NextResponse.json(
            { error: 'Failed to update subscription' },
            { status: 500 }
          )
        }

        if (REQUIRE_EMAIL_CONFIRMATION) {
        // TODO: Send confirmation email here
          // await sendConfirmationEmail(email, confirmationToken)
          return NextResponse.json({
            success: true,
            message: 'Please check your email to confirm your subscription.',
          })
        }

        return NextResponse.json({
          success: true,
          message: 'You have been re-subscribed to our newsletter!',
        })
      } else if (existing.status === 'confirmed') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      } else {
        // Pending subscription - resend confirmation
        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update({
            confirmation_token: confirmationToken,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)

        if (updateError) {
          console.error('Error updating subscription:', updateError)
          return NextResponse.json(
            { error: 'Failed to update subscription' },
            { status: 500 }
          )
        }

        if (REQUIRE_EMAIL_CONFIRMATION) {
        // TODO: Send confirmation email here
          // await sendConfirmationEmail(email, confirmationToken)
          return NextResponse.json({
            success: true,
            message: 'Confirmation email sent! Please check your inbox.',
          })
        }

        // Auto-confirm if not requiring email confirmation
        const { error: confirmError } = await supabase
          .from('newsletter_subscriptions')
          .update({
            status: 'confirmed',
            confirmed_at: new Date().toISOString(),
          })
          .eq('id', existing.id)

        if (confirmError) {
          console.error('Error confirming subscription:', confirmError)
        }

        return NextResponse.json({
          success: true,
          message: 'Subscription confirmed!',
        })
      }
    }

    // Insert new subscription
    const status = REQUIRE_EMAIL_CONFIRMATION ? 'pending' : 'confirmed'
    const insertData: any = {
        email: email.toLowerCase().trim(),
      status,
        confirmation_token: confirmationToken,
        source: 'blog',
        ip_address: ip !== 'unknown' ? ip : null,
        user_agent: userAgent,
    }

    if (!REQUIRE_EMAIL_CONFIRMATION) {
      insertData.confirmed_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Error creating subscription:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      
      // Handle unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { 
          error: 'Failed to create subscription',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      )
    }

    if (REQUIRE_EMAIL_CONFIRMATION) {
    // TODO: Send confirmation email here
      // await sendConfirmationEmail(email, confirmationToken)
      return NextResponse.json({
        success: true,
        message: 'Please check your email to confirm your subscription.',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! You will receive our latest blog posts and updates.',
    })
  } catch (error: any) {
    console.error('Newsletter subscription error:', error)
    console.error('Error stack:', error?.stack)
    console.error('Error name:', error?.name)
    return NextResponse.json(
      { 
        error: 'An error occurred while processing your subscription',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
