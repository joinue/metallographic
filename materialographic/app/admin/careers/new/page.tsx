import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import JobEditForm from '../JobEditForm'

export default async function NewJobPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <JobEditForm job={null} />
}

