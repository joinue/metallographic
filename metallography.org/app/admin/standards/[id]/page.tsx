import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import StandardEditForm from '../StandardEditForm'

export default async function StandardEditPage({
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

  // Fetch the standard
  const { data: standard, error: standardError } = await supabase
    .from('standards')
    .select('*')
    .eq('id', id)
    .single()

  if (standardError || !standard) {
    redirect('/admin/standards')
  }

  return <StandardEditForm standard={standard} />
}

