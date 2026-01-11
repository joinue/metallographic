import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import StandardEditForm from '../StandardEditForm'

export default async function NewStandardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <StandardEditForm standard={null} />
}

