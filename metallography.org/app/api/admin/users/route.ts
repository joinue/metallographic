import { createClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

// GET - List all users
export async function GET(request: Request) {
  try {
    // Verify the requesting user is authenticated
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Use admin client to list users
    const adminClient = createAdminClient()
    const { data: { users }, error } = await adminClient.auth.admin.listUsers()

    if (error) {
      console.error('Error listing users:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to fetch users' },
        { status: 500 }
      )
    }

    // Return users with relevant information
    const userList = users.map((u) => ({
      id: u.id,
      email: u.email,
      email_confirmed_at: u.email_confirmed_at,
      created_at: u.created_at,
      updated_at: u.updated_at,
      last_sign_in_at: u.last_sign_in_at,
      user_metadata: u.user_metadata,
      app_metadata: u.app_metadata,
    }))

    return NextResponse.json({ users: userList })
  } catch (error: any) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    )
  }
}

// POST - Create a new user
export async function POST(request: Request) {
  try {
    // Verify the requesting user is authenticated
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { email, password, sendInvite = false, autoConfirm = true } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Use admin client to create user
    const adminClient = createAdminClient()
    
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: autoConfirm, // Auto-confirm email if true
    })

    if (createError) {
      console.error('Error creating user:', createError)
      return NextResponse.json(
        { error: createError.message || 'Failed to create user' },
        { status: 500 }
      )
    }

    // If sendInvite is true, send an invitation email (optional)
    // Note: Supabase doesn't have a direct "invite" method, but we can send a password reset
    // which effectively invites them to set their password
    if (sendInvite && !autoConfirm) {
      // You could implement email sending here if needed
      // For now, we'll just return the created user
    }

    return NextResponse.json({
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
        email_confirmed_at: newUser.user.email_confirmed_at,
        created_at: newUser.user.created_at,
      },
      message: autoConfirm 
        ? 'User created successfully and email confirmed'
        : 'User created successfully. They will need to confirm their email.',
    }, { status: 201 })
  } catch (error: any) {
    console.error('Create user error:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    )
  }
}

