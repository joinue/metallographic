import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import ConsumableEditForm from '../ConsumableEditForm'

export default async function NewConsumablePage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <ConsumableEditForm consumable={null} />
}


