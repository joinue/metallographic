import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import ApplicationsAdmin from './ApplicationsAdmin'

export default async function ApplicationsAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <ApplicationsAdmin />
}

