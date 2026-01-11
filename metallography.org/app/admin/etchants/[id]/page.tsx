import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import EtchantEditForm from '../EtchantEditForm'

export default async function EtchantEditPage({
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

  // Fetch the etchant
  const { data: etchant, error: etchantError } = await supabase
    .from('etchants')
    .select('*')
    .eq('id', id)
    .single()

  if (etchantError || !etchant) {
    redirect('/admin/etchants')
  }

  return <EtchantEditForm etchant={etchant} />
}

