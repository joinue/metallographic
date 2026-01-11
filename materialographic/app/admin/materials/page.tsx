import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import MaterialsAdmin from './MaterialsAdmin'

export default async function MaterialsAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <MaterialsAdmin />
}

