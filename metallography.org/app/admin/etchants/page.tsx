import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import EtchantsAdmin from './EtchantsAdmin'

export default async function EtchantsAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <EtchantsAdmin />
}




