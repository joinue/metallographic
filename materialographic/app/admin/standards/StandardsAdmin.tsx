'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { Standard } from '@/lib/supabase'
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

const organizationColors: Record<string, string> = {
  'ASTM': 'bg-red-100 text-red-800',
  'ISO': 'bg-blue-100 text-blue-800',
  'SAE': 'bg-green-100 text-green-800',
  'ASME': 'bg-purple-100 text-purple-800',
  'JIS': 'bg-yellow-100 text-yellow-800',
}

export default function StandardsAdmin() {
  const router = useRouter()
  const [standards, setStandards] = useState<Standard[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all')

  useEffect(() => {
    loadStandards()
  }, [])

  const loadStandards = async () => {
    try {
      const supabase = createClient()
      let query = supabase
        .from('standards')
        .select('*')
        .order('standard', { ascending: true })

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      const { data, error } = await query

      if (error) throw error
      setStandards(data || [])
    } catch (error) {
      console.error('Error loading standards:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStandards()
  }, [filterStatus])

  const handleDelete = async (id: string, standard: string) => {
    if (!confirm(`Are you sure you want to delete "${standard}"? This action cannot be undone.`)) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('standards')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Delete error details:', error)
        throw new Error(error.message || 'Failed to delete standard')
      }
      loadStandards()
    } catch (error: any) {
      console.error('Error deleting standard:', error)
      alert(`Failed to delete standard: ${error.message || 'Please check your permissions and try again.'}`)
    }
  }

  const handleToggleStatus = async (standard: Standard) => {
    const newStatus = standard.status === 'published' ? 'draft' : 'published'
    
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('standards')
        .update({ status: newStatus })
        .eq('id', standard.id)

      if (error) {
        console.error('Status update error details:', error)
        throw new Error(error.message || 'Failed to update status')
      }
      loadStandards()
    } catch (error: any) {
      console.error('Error updating status:', error)
      alert(`Failed to update status: ${error.message || 'Please check your permissions and try again.'}`)
    }
  }

  const filteredStandards = standards.filter(standard => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      standard.standard.toLowerCase().includes(query) ||
      standard.title.toLowerCase().includes(query) ||
      standard.category.toLowerCase().includes(query) ||
      standard.organization?.toLowerCase().includes(query) ||
      standard.slug?.toLowerCase().includes(query)
    )
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Standards Management</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage standards in the database</p>
          </div>
          <button
            onClick={() => router.push('/admin/standards/new')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Standard
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search standards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(['all', 'published', 'draft', 'archived'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Standards List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredStandards.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'No standards found matching your search.' : 'No standards found.'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => router.push('/admin/standards/new')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Create First Standard
                </button>
              )}
            </div>
          ) : (
            <div className="relative">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400" style={{ scrollbarWidth: 'thin' }}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Standard
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Organization
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap sticky right-0 bg-gray-50 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStandards.map((standard) => (
                      <tr key={standard.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{standard.standard}</div>
                          {standard.slug && (
                            <div className="text-xs text-gray-500">{standard.slug}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {standard.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {standard.organization && (
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              organizationColors[standard.organization] || 'bg-gray-100 text-gray-800'
                            }`}>
                              {standard.organization}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {standard.category && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                              {standard.category}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              standard.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : standard.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {standard.status || 'draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium sticky right-0 bg-white z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleStatus(standard)}
                              className="text-gray-600 hover:text-primary-600 transition-colors"
                              title={standard.status === 'published' ? 'Unpublish' : 'Publish'}
                            >
                              {standard.status === 'published' ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                            <button
                              onClick={() => router.push(`/admin/standards/${standard.id}`)}
                              className="text-primary-600 hover:text-primary-700 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(standard.id, standard.standard)}
                              className="text-red-600 hover:text-red-700 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-gray-900">{standards.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Published</div>
            <div className="text-2xl font-bold text-green-600">
              {standards.filter((s) => s.status === 'published').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Draft</div>
            <div className="text-2xl font-bold text-yellow-600">
              {standards.filter((s) => s.status === 'draft').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Archived</div>
            <div className="text-2xl font-bold text-gray-600">
              {standards.filter((s) => s.status === 'archived').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

