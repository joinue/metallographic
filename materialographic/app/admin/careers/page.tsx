import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import CareersAdmin from './CareersAdmin'

export default async function CareersAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <CareersAdmin />
}

