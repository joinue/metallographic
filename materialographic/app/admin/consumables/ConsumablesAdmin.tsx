'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { Consumable } from '@/lib/supabase'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, CheckSquare, Square, Loader2, Settings } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

const CONSUMABLE_CATEGORIES = [
  'sectioning',
  'mounting',
  'grinding-lapping',
  'polishing',
  'etching',
  'hardness-testing',
]

export default function ConsumablesAdmin() {
  const router = useRouter()
  const [consumables, setConsumables] = useState<Consumable[]>([])
  const [allConsumables, setAllConsumables] = useState<Consumable[]>([]) // For getting unique filter values
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'discontinued' | 'draft'>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterSubcategory, setFilterSubcategory] = useState<string>('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkOperation, setBulkOperation] = useState<'status' | 'category' | 'subcategory' | 'is_active' | 'tags_add' | 'tags_remove' | 'tags_replace' | 'delete' | null>(null)
  const [bulkValue, setBulkValue] = useState<string>('')
  const [bulkSubcategory, setBulkSubcategory] = useState<string>('')
  const [bulkTags, setBulkTags] = useState<string>('')
  const [isBulkProcessing, setIsBulkProcessing] = useState(false)
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 })

  // Load all consumables once for filter dropdowns
  useEffect(() => {
    const loadAllConsumables = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('consumables')
          .select('*')
          .order('name', { ascending: true })
          .range(0, 1999) // Fetch up to 2000 rows (0-1999 inclusive)
        
        if (error) throw error
        setAllConsumables(data || [])
      } catch (error) {
        console.error('Error loading all consumables:', error)
      }
    }
    
    loadAllConsumables()
  }, [])

  const loadConsumables = async () => {
    try {
      const supabase = createClient()
      
      // Load filtered consumables
      let query = supabase
        .from('consumables')
        .select('*')
        .order('name', { ascending: true })
        .range(0, 1999) // Fetch up to 2000 rows (0-1999 inclusive)

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      if (filterCategory !== 'all') {
        query = query.eq('category', filterCategory)
      }

      if (filterSubcategory !== 'all' && filterCategory !== 'all') {
        query = query.eq('subcategory', filterSubcategory)
      }

      const { data, error } = await query

      if (error) throw error
      setConsumables(data || [])
    } catch (error) {
      console.error('Error loading consumables:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConsumables()
  }, [filterStatus, filterCategory, filterSubcategory])

  // Reset subcategory filter when category changes
  useEffect(() => {
    if (filterCategory === 'all') {
      setFilterSubcategory('all')
    }
  }, [filterCategory])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('consumables')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Delete error details:', error)
        throw new Error(error.message || 'Failed to delete consumable')
      }
      loadConsumables()
    } catch (error: any) {
      console.error('Error deleting consumable:', error)
      alert(`Failed to delete consumable: ${error.message || 'Please check your permissions and try again.'}`)
    }
  }

  const handleToggleStatus = async (item: Consumable) => {
    const newStatus = item.status === 'active' ? 'draft' : 'active'
    
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('consumables')
        .update({ status: newStatus })
        .eq('id', item.id)

      if (error) {
        console.error('Status update error details:', error)
        throw new Error(error.message || 'Failed to update status')
      }
      loadConsumables()
    } catch (error: any) {
      console.error('Error updating status:', error)
      alert(`Failed to update status: ${error.message || 'Please check your permissions and try again.'}`)
    }
  }

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.size === filteredConsumables.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredConsumables.map(item => item.id)))
    }
  }

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const clearSelection = () => {
    setSelectedIds(new Set())
    setBulkOperation(null)
    setBulkValue('')
    setBulkSubcategory('')
    setBulkTags('')
  }

  // Bulk operations
  const handleBulkUpdate = async () => {
    if (selectedIds.size === 0) return

    const ids = Array.from(selectedIds)
    setIsBulkProcessing(true)
    setBulkProgress({ current: 0, total: ids.length })

    const supabase = createClient()
    let successCount = 0
    let errorCount = 0
    const errors: string[] = []

    try {
      if (bulkOperation === 'delete') {
        // Bulk delete
        if (!confirm(`Are you sure you want to delete ${ids.length} consumable(s)? This action cannot be undone.`)) {
          setIsBulkProcessing(false)
          return
        }

        for (let i = 0; i < ids.length; i++) {
          const id = ids[i]
          setBulkProgress({ current: i + 1, total: ids.length })
          
          const { error } = await supabase
            .from('consumables')
            .delete()
            .eq('id', id)

          if (error) {
            errorCount++
            errors.push(`Failed to delete ${id}: ${error.message}`)
          } else {
            successCount++
          }
        }
      } else if (bulkOperation === 'tags_add' || bulkOperation === 'tags_remove' || bulkOperation === 'tags_replace') {
        // Tag operations need to process individually to handle arrays
        const tagsToProcess = bulkTags.split(',').map(t => t.trim()).filter(Boolean)
        
        if (tagsToProcess.length === 0) {
          alert('Please enter at least one tag.')
          setIsBulkProcessing(false)
          return
        }
        
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i]
          setBulkProgress({ current: i + 1, total: ids.length })
          
          // Fetch current consumable to get existing tags
          const { data: currentData, error: fetchError } = await supabase
            .from('consumables')
            .select('tags')
            .eq('id', id)
            .single()

          if (fetchError) {
            errorCount++
            errors.push(`Failed to fetch ${id}: ${fetchError.message}`)
            continue
          }

          let newTags: string[] = []
          const currentTags = currentData?.tags || []

          if (bulkOperation === 'tags_replace') {
            // Replace all tags
            newTags = tagsToProcess
          } else if (bulkOperation === 'tags_add') {
            // Add tags (avoid duplicates)
            newTags = [...new Set([...currentTags, ...tagsToProcess])]
          } else if (bulkOperation === 'tags_remove') {
            // Remove specified tags
            newTags = currentTags.filter((tag: string) => !tagsToProcess.includes(tag))
          }

          const { error: updateError } = await supabase
            .from('consumables')
            .update({ tags: newTags.length > 0 ? newTags : null })
            .eq('id', id)

          if (updateError) {
            errorCount++
            errors.push(`Failed to update ${id}: ${updateError.message}`)
          } else {
            successCount++
          }
        }
      } else {
        // Bulk update for other operations
        const updateData: any = {}

        if (bulkOperation === 'status') {
          updateData.status = bulkValue
        } else if (bulkOperation === 'category') {
          updateData.category = bulkValue
          // Clear subcategory when changing category
          updateData.subcategory = null
        } else if (bulkOperation === 'subcategory') {
          updateData.subcategory = bulkSubcategory || null
        } else if (bulkOperation === 'is_active') {
          updateData.is_active = bulkValue === 'true'
        }

        // Process in batches to avoid overwhelming the database
        const batchSize = 50
        for (let i = 0; i < ids.length; i += batchSize) {
          const batch = ids.slice(i, i + batchSize)
          setBulkProgress({ current: Math.min(i + batchSize, ids.length), total: ids.length })

          const { error } = await supabase
            .from('consumables')
            .update(updateData)
            .in('id', batch)

          if (error) {
            errorCount += batch.length
            errors.push(`Batch update failed: ${error.message}`)
          } else {
            successCount += batch.length
          }
        }
      }

      // Show results
      if (errorCount > 0) {
        alert(
          `Bulk operation completed with errors:\n` +
          `✓ ${successCount} succeeded\n` +
          `✗ ${errorCount} failed\n\n` +
          `Errors: ${errors.slice(0, 5).join('\n')}${errors.length > 5 ? `\n... and ${errors.length - 5} more` : ''}`
        )
      } else {
        alert(`Successfully updated ${successCount} consumable(s).`)
      }

      clearSelection()
      loadConsumables()
    } catch (error: any) {
      console.error('Bulk operation error:', error)
      alert(`Bulk operation failed: ${error.message || 'Please check your permissions and try again.'}`)
    } finally {
      setIsBulkProcessing(false)
      setBulkProgress({ current: 0, total: 0 })
    }
  }

  // Get unique categories and subcategories from all consumables (not just filtered)
  const uniqueCategories = Array.from(new Set(allConsumables.map(c => c.category).filter(Boolean))).sort()
  const uniqueSubcategories = filterCategory === 'all' 
    ? [] 
    : Array.from(new Set(
        allConsumables
          .filter(c => c.category === filterCategory && c.subcategory)
          .map(c => c.subcategory!)
      )).sort()

  const filteredConsumables = consumables.filter(item => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      item.name.toLowerCase().includes(query) ||
      item.item_id?.toLowerCase().includes(query) ||
      item.sku?.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.subcategory?.toLowerCase().includes(query) ||
      item.slug?.toLowerCase().includes(query) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query))
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
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Consumables Management</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage all consumables in the database
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/admin/consumables/configuration')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                >
                  <Settings className="w-5 h-5" />
                  Category Configuration
                </button>
                <button
                  onClick={() => router.push('/admin/consumables/new')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add New Consumable
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search consumables by name, item ID, SKU, category, subcategory, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filter Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value)
                    setFilterSubcategory('all')
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Subcategory Filter */}
                <select
                  value={filterSubcategory}
                  onChange={(e) => setFilterSubcategory(e.target.value)}
                  disabled={filterCategory === 'all' || uniqueSubcategories.length === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <option value="all">
                    {filterCategory === 'all' 
                      ? 'Select category first' 
                      : uniqueSubcategories.length === 0
                      ? 'No subcategories'
                      : 'All Subcategories'}
                  </option>
                  {uniqueSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="discontinued">Discontinued</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Toolbar */}
        {selectedIds.size > 0 && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg mb-6 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary-900">
                  {selectedIds.size} item{selectedIds.size !== 1 ? 's' : ''} selected
                </span>
                {isBulkProcessing && (
                  <span className="text-xs text-primary-700">
                    ({bulkProgress.current} / {bulkProgress.total})
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {!isBulkProcessing ? (
                  <>
                    <select
                      value={bulkOperation || ''}
                      onChange={(e) => {
                        setBulkOperation(e.target.value as any || null)
                        setBulkValue('')
                        setBulkSubcategory('')
                        setBulkTags('')
                      }}
                      className="px-3 py-2 text-sm border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select bulk action...</option>
                      <option value="status">Change Status</option>
                      <option value="category">Change Category</option>
                      <option value="subcategory">Change Subcategory</option>
                      <option value="is_active">Toggle Active</option>
                      <option value="tags_add">Add Tags</option>
                      <option value="tags_remove">Remove Tags</option>
                      <option value="tags_replace">Replace Tags</option>
                      <option value="delete">Delete Selected</option>
                    </select>

                    {bulkOperation === 'status' && (
                      <select
                        value={bulkValue}
                        onChange={(e) => setBulkValue(e.target.value)}
                        className="px-3 py-2 text-sm border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select status...</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="discontinued">Discontinued</option>
                      </select>
                    )}

                    {bulkOperation === 'category' && (
                      <select
                        value={bulkValue}
                        onChange={(e) => setBulkValue(e.target.value)}
                        className="px-3 py-2 text-sm border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select category...</option>
                        {CONSUMABLE_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    )}

                    {bulkOperation === 'subcategory' && (
                      <input
                        type="text"
                        value={bulkSubcategory}
                        onChange={(e) => setBulkSubcategory(e.target.value)}
                        placeholder="Enter subcategory..."
                        className="px-3 py-2 text-sm border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    )}

                    {bulkOperation === 'is_active' && (
                      <select
                        value={bulkValue}
                        onChange={(e) => setBulkValue(e.target.value)}
                        className="px-3 py-2 text-sm border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select...</option>
                        <option value="true">Set Active</option>
                        <option value="false">Set Inactive</option>
                      </select>
                    )}

                    {(bulkOperation === 'tags_add' || bulkOperation === 'tags_remove' || bulkOperation === 'tags_replace') && (
                      <input
                        type="text"
                        value={bulkTags}
                        onChange={(e) => setBulkTags(e.target.value)}
                        placeholder={bulkOperation === 'tags_replace' 
                          ? 'Enter tags (comma-separated)...' 
                          : bulkOperation === 'tags_add'
                          ? 'Enter tags to add (comma-separated)...'
                          : 'Enter tags to remove (comma-separated)...'}
                        className="px-3 py-2 text-sm border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    )}

                    {(bulkOperation && (
                      bulkValue || 
                      bulkOperation === 'subcategory' || 
                      (bulkOperation === 'tags_add' && bulkTags.trim()) ||
                      (bulkOperation === 'tags_remove' && bulkTags.trim()) ||
                      (bulkOperation === 'tags_replace' && bulkTags.trim()) ||
                      bulkOperation === 'delete'
                    )) && (
                      <button
                        onClick={handleBulkUpdate}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                      >
                        Apply
                      </button>
                    )}

                    <button
                      onClick={clearSelection}
                      className="px-4 py-2 text-sm font-medium text-primary-700 bg-white border border-primary-300 rounded-lg hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-primary-700">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Processing bulk operation...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Consumables Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="relative">
            <div className="overflow-x-auto custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#9ca3af #f3f4f6' }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-12">
                      <button
                        onClick={handleSelectAll}
                        className="flex items-center justify-center"
                        title={selectedIds.size === filteredConsumables.length ? 'Deselect all' : 'Select all'}
                      >
                        {selectedIds.size === filteredConsumables.length && filteredConsumables.length > 0 ? (
                          <CheckSquare className="w-5 h-5 text-primary-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Item ID / SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap sticky right-0 bg-gray-50 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredConsumables.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        {searchQuery ? 'No consumables found matching your search.' : 'No consumables found.'}
                      </td>
                    </tr>
                  ) : (
                    filteredConsumables.map((item) => (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-gray-50 ${selectedIds.has(item.id) ? 'bg-primary-50' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleSelectItem(item.id)}
                            className="flex items-center justify-center"
                            title={selectedIds.has(item.id) ? 'Deselect' : 'Select'}
                          >
                            {selectedIds.has(item.id) ? (
                              <CheckSquare className="w-5 h-5 text-primary-600" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          {item.subcategory && (
                            <div className="text-sm text-gray-500">{item.subcategory}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.item_id || '-'}</div>
                          {item.sku && (
                            <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                item.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : item.status === 'discontinued'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {item.status || 'draft'}
                            </span>
                            <button
                              onClick={() => handleToggleStatus(item)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title={item.status === 'active' ? 'Deactivate' : 'Activate'}
                            >
                              {item.status === 'active' ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {item.tags && item.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 3 && (
                                <span className="px-2 py-1 text-xs font-medium text-gray-500">
                                  +{item.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">No tags</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium sticky right-0 bg-white z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/admin/consumables/${item.id}`)}
                              className="text-primary-600 hover:text-primary-900 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, item.name)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredConsumables.length}</span> of{' '}
              <span className="font-medium">{consumables.length}</span> consumables
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

