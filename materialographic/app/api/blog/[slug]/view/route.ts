import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get the post by slug
    const { data: post, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, view_count')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (fetchError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Increment view count atomically
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ view_count: (post.view_count || 0) + 1 })
      .eq('id', post.id)

    if (updateError) {
      console.error('Error updating view count:', updateError)
      return NextResponse.json({ error: 'Failed to update view count' }, { status: 500 })
    }

    return NextResponse.json({ success: true, view_count: (post.view_count || 0) + 1 })
  } catch (error) {
    console.error('Error in view tracking:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

