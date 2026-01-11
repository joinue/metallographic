import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import EquipmentEditForm from '../EquipmentEditForm'

export default async function EquipmentEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  // Fetch equipment if editing (not "new")
  let equipment = null
  if (id !== 'new') {
    const { data, error: fetchError } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !data) {
      redirect('/admin/equipment')
    }
    equipment = data
  }

  return <EquipmentEditForm equipment={equipment} />
}


