import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import ConsumableEditForm from '../ConsumableEditForm'

export default async function ConsumableEditPage({
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

  // Fetch consumable if editing (not "new")
  let consumable = null
  if (id !== 'new') {
    const { data, error: fetchError } = await supabase
      .from('consumables')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !data) {
      redirect('/admin/consumables')
    }
    consumable = data
  }

  return <ConsumableEditForm consumable={consumable} />
}


