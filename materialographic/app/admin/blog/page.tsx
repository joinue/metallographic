import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import BlogAdmin from './BlogAdmin'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReturnToTop from '@/components/ReturnToTop'

export default async function BlogAdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <BlogAdmin />
      </main>
      <Footer />
      <ReturnToTop />
    </>
  )
}

