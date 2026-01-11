import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import ConsumablesAdmin from './ConsumablesAdmin'

export default async function ConsumablesAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <ConsumablesAdmin />
}


