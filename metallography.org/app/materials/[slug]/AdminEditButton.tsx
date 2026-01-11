'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Edit } from 'lucide-react'

interface AdminEditButtonProps {
  materialId: string
}

export default function AdminEditButton({ materialId }: AdminEditButtonProps) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAdmin(!!user)
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !isAdmin) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => router.push(`/admin/materials/${materialId}`)}
        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-sm hover:shadow-md text-sm font-medium"
        title="Edit this material in admin panel"
      >
        <Edit className="w-4 h-4" />
        Edit Material
      </button>
      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Admin</span>
    </div>
  )
}

