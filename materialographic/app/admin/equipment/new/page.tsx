import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import EquipmentEditForm from '../EquipmentEditForm'

export default async function NewEquipmentPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <EquipmentEditForm equipment={null} />
}


