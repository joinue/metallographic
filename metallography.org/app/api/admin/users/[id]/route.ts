import { createClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

// GET - Get a specific user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    // Use admin client to get user
    const adminClient = createAdminClient()
    const { data: { user: targetUser }, error } = await adminClient.auth.admin.getUserById(id)

    if (error) {
      console.error('Error getting user:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to fetch user' },
        { status: 500 }
      )
    }

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        id: targetUser.id,
        email: targetUser.email,
        email_confirmed_at: targetUser.email_confirmed_at,
        created_at: targetUser.created_at,
        updated_at: targetUser.updated_at,
        last_sign_in_at: targetUser.last_sign_in_at,
        user_metadata: targetUser.user_metadata,
        app_metadata: targetUser.app_metadata,
      },
    })
  } catch (error: any) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    )
  }
}

// PATCH - Update a user
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    const body = await request.json()

    // Use admin client to update user
    const adminClient = createAdminClient()
    const { data: { user: updatedUser }, error } = await adminClient.auth.admin.updateUserById(
      id,
      {
        email: body.email,
        user_metadata: body.user_metadata,
        app_metadata: body.app_metadata,
        email_confirm: body.email_confirm,
        ban_duration: body.ban_duration,
      }
    )

    if (error) {
      console.error('Error updating user:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to update user' },
        { status: 500 }
      )
    }

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        email_confirmed_at: updatedUser.email_confirmed_at,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
        last_sign_in_at: updatedUser.last_sign_in_at,
        user_metadata: updatedUser.user_metadata,
        app_metadata: updatedUser.app_metadata,
      },
    })
  } catch (error: any) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    // Prevent deleting yourself
    if (id === user.id) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      )
    }

    // Use admin client to delete user
    const adminClient = createAdminClient()
    const { error } = await adminClient.auth.admin.deleteUser(id)

    if (error) {
      console.error('Error deleting user:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to delete user' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    )
  }
}

