import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import CategoryConfiguration from './CategoryConfiguration'

export default async function CategoryConfigurationPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return <CategoryConfiguration />
}

