import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import MaterialEditForm from '../MaterialEditForm'

export default async function NewMaterialPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <MaterialEditForm material={null} />
}

