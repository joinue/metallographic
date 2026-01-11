import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import EquipmentAdmin from './EquipmentAdmin'

export default async function EquipmentAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <EquipmentAdmin />
}


