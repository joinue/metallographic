import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import JobEditForm from '../JobEditForm'

export default async function JobEditPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  const { id } = await params
  const isNew = id === 'new'

  let job = null
  if (!isNew) {
    const { data, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single()

    if (jobError && jobError.code !== 'PGRST116') {
      console.error('Error fetching job:', jobError)
    } else {
      job = data
    }
  }

  return <JobEditForm job={job} />
}

