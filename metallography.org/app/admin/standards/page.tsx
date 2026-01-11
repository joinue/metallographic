import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import StandardsAdmin from './StandardsAdmin'

export default async function StandardsAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <StandardsAdmin />
}

