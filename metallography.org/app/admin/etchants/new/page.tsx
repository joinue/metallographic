import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import EtchantEditForm from '../EtchantEditForm'

export default async function NewEtchantPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <EtchantEditForm etchant={null} />
}

