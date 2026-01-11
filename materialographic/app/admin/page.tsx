import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <AdminDashboard user={user} />
}

