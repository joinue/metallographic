'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { Etchant } from '@/lib/supabase'
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function EtchantsAdmin() {
  const router = useRouter()
  const [etchants, setEtchants] = useState<Etchant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all')

  useEffect(() => {
    loadEtchants()
  }, [])

  const loadEtchants = async () => {
    try {
      const supabase = createClient()
      let query = supabase
        .from('etchants')
        .select('*')
        .order('name', { ascending: true })

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      const { data, error } = await query

      if (error) throw error
      setEtchants(data || [])
    } catch (error) {
      console.error('Error loading etchants:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEtchants()
  }, [filterStatus])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('etchants')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Delete error details:', error)
        throw new Error(error.message || 'Failed to delete etchant')
      }
      loadEtchants()
    } catch (error: any) {
      console.error('Error deleting etchant:', error)
      alert(`Failed to delete etchant: ${error.message || 'Please check your permissions and try again.'}`)
    }
  }

  const handleToggleStatus = async (etchant: Etchant) => {
    const newStatus = etchant.status === 'published' ? 'draft' : 'published'
    
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('etchants')
        .update({ status: newStatus })
        .eq('id', etchant.id)

      if (error) {
        console.error('Status update error details:', error)
        throw new Error(error.message || 'Failed to update status')
      }
      loadEtchants()
    } catch (error: any) {
      console.error('Error updating status:', error)
      alert(`Failed to update status: ${error.message || 'Please check your permissions and try again.'}`)
    }
  }

  const filteredEtchants = etchants.filter(etchant => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      etchant.name.toLowerCase().includes(query) ||
      etchant.composition.toLowerCase().includes(query) ||
      etchant.category?.toLowerCase().includes(query) ||
      etchant.slug?.toLowerCase().includes(query)
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
            <h1 className="text-3xl font-bold text-gray-900">Etchants Management</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage etchants in the database</p>
          </div>
          <button
            onClick={() => router.push('/admin/etchants/new')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Etchant
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
                placeholder="Search etchants..."
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

        {/* Etchants List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredEtchants.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'No etchants found matching your search.' : 'No etchants found.'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => router.push('/admin/etchants/new')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Create First Etchant
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
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Composition
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
                    {filteredEtchants.map((etchant) => (
                      <tr key={etchant.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{etchant.name}</div>
                          {etchant.slug && (
                            <div className="text-xs text-gray-500">{etchant.slug}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {etchant.composition}
                          </div>
                          {etchant.concentration && (
                            <div className="text-xs text-gray-500">{etchant.concentration}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {etchant.category && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                              {etchant.category}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              etchant.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : etchant.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {etchant.status || 'draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium sticky right-0 bg-white z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleStatus(etchant)}
                              className="text-gray-600 hover:text-primary-600 transition-colors"
                              title={etchant.status === 'published' ? 'Unpublish' : 'Publish'}
                            >
                              {etchant.status === 'published' ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                            <button
                              onClick={() => router.push(`/admin/etchants/${etchant.id}`)}
                              className="text-primary-600 hover:text-primary-700 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(etchant.id, etchant.name)}
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
            <div className="text-2xl font-bold text-gray-900">{etchants.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Published</div>
            <div className="text-2xl font-bold text-green-600">
              {etchants.filter((e) => e.status === 'published').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Draft</div>
            <div className="text-2xl font-bold text-yellow-600">
              {etchants.filter((e) => e.status === 'draft').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Archived</div>
            <div className="text-2xl font-bold text-gray-600">
              {etchants.filter((e) => e.status === 'archived').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

