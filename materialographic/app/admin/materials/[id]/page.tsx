import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import MaterialEditForm from '../MaterialEditForm'

export default async function MaterialEditPage({
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

  // Fetch material if editing (not "new")
  let material = null
  if (id !== 'new') {
    const { data, error: fetchError } = await supabase
      .from('materials')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !data) {
      redirect('/admin/materials')
    }
    material = data
  }

  return <MaterialEditForm material={material} />
}

