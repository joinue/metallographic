import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import BlogEditForm from '../BlogEditForm'

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  const { id } = await params
  
  // Fetch post by slug using server client
  const { data: post, error: postError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', id)
    .single()

  if (postError) {
    console.error('Error fetching blog post:', postError)
    if (postError.code === 'PGRST116') {
      // No rows returned
      notFound()
    }
    throw postError
  }

  if (!post) {
    notFound()
  }

  return <BlogEditForm post={post} />
}

