import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import UsersAdmin from './UsersAdmin'

export default async function UsersAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <UsersAdmin />
}




