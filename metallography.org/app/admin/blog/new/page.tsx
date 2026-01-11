import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import BlogEditForm from '../BlogEditForm'

export default async function NewBlogPostPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <BlogEditForm post={null} />
}

