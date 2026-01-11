'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { SubcategoryMetadata } from '@/lib/supabase'
import { ArrowLeft, Plus, Edit, Trash2, Save, X, ChevronDown, ChevronRight } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

interface SubcategoryWithCount extends SubcategoryMetadata {
  productCount: number
}

interface CategoryData {
  name: string
  productCount: number
  subcategories: SubcategoryWithCount[]
}

export default function CategoryConfiguration() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Map<string, CategoryData>>(new Map())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingSubcategory, setEditingSubcategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newSubcategoryKey, setNewSubcategoryKey] = useState('')
  const [newSubcategoryLabel, setNewSubcategoryLabel] = useState('')
  const [newSubcategorySortOrder, setNewSubcategorySortOrder] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categoryEditName, setCategoryEditName] = useState('')
  const [subcategoryEditData, setSubcategoryEditData] = useState<{
    id: string
    key: string
    label: string
    sortOrder: number
  } | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // Load all consumables to get unique categories and count products
      const { data: consumables, error: consumablesError } = await supabase
        .from('consumables')
        .select('category, subcategory')
        .order('category', { ascending: true })

      if (consumablesError) throw consumablesError

      // Get unique categories and count products per category
      const categoryCounts = new Map<string, number>()
      // Count products per subcategory (key: "category:subcategory")
      const subcategoryCounts = new Map<string, number>()
      
      consumables?.forEach(consumable => {
        if (consumable.category) {
          categoryCounts.set(consumable.category, (categoryCounts.get(consumable.category) || 0) + 1)
          
          // Count by subcategory if it exists
          if (consumable.subcategory) {
            const key = `${consumable.category}:${consumable.subcategory}`
            subcategoryCounts.set(key, (subcategoryCounts.get(key) || 0) + 1)
          }
        }
      })
      const uniqueCategories = Array.from(categoryCounts.keys())

      // Load subcategory metadata for consumables
      const { data: subcategoryMetadata, error: metadataError } = await supabase
        .from('subcategory_metadata')
        .select('*')
        .eq('entity_type', 'consumables')
        .order('category', { ascending: true })
        .order('display_order', { ascending: true })

      if (metadataError) throw metadataError

      // Group subcategories by category
      const categoriesMap = new Map<string, CategoryData>()
      
      // Initialize all categories with their subcategories and product counts
      uniqueCategories.forEach(category => {
        const subcategories = (subcategoryMetadata || []).filter(
          sub => sub.category === category
        ).map(sub => {
          const key = `${category}:${sub.subcategory_key}`
          return {
            ...sub,
            productCount: subcategoryCounts.get(key) || 0
          } as SubcategoryWithCount
        })
        categoriesMap.set(category, {
          name: category,
          productCount: categoryCounts.get(category) || 0,
          subcategories: subcategories.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        })
      })

      setCategories(categoriesMap)
      
      // Expand all categories by default
      setExpandedCategories(new Set(uniqueCategories))
    } catch (error) {
      console.error('Error loading category configuration:', error)
      alert('Failed to load category configuration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Please enter a category name')
      return
    }

    // Check if category already exists
    if (categories.has(newCategoryName.toLowerCase())) {
      alert('Category already exists')
      return
    }

    // Add category to the map (it will be created when first consumable uses it)
    const newCategories = new Map(categories)
    newCategories.set(newCategoryName.toLowerCase(), {
      name: newCategoryName.toLowerCase(),
      productCount: 0,
      subcategories: []
    })
    setCategories(newCategories)
    setNewCategoryName('')
    setExpandedCategories(new Set([...expandedCategories, newCategoryName.toLowerCase()]))
  }

  const handleDeleteCategory = async (category: string) => {
    if (!confirm(`Are you sure you want to delete category "${category}"? This will also delete all its subcategories.`)) {
      return
    }

    try {
      const supabase = createClient()

      // Delete all subcategory metadata for this category
      const { error: deleteSubcategoriesError } = await supabase
        .from('subcategory_metadata')
        .delete()
        .eq('entity_type', 'consumables')
        .eq('category', category)

      if (deleteSubcategoriesError) throw deleteSubcategoriesError

      // Remove category from map
      const newCategories = new Map(categories)
      newCategories.delete(category)
      setCategories(newCategories)

      alert('Category deleted successfully')
      // Reload data to refresh product counts
      loadData()
    } catch (error: any) {
      console.error('Error deleting category:', error)
      alert(`Failed to delete category: ${error.message}`)
    }
  }

  const handleEditCategory = (category: string) => {
    const categoryData = categories.get(category)
    if (categoryData) {
      setCategoryEditName(categoryData.name)
      setEditingCategory(category)
    }
  }

  const handleSaveCategory = async () => {
    if (!editingCategory || !categoryEditName.trim()) {
      alert('Please enter a category name')
      return
    }

    try {
      const supabase = createClient()
      const oldCategory = editingCategory
      const newCategoryName = categoryEditName.toLowerCase().trim()

      // If category name changed, update all consumables with this category
      if (oldCategory !== newCategoryName) {
        const { error: updateConsumablesError } = await supabase
          .from('consumables')
          .update({ category: newCategoryName })
          .eq('category', oldCategory)

        if (updateConsumablesError) throw updateConsumablesError

        // Update subcategory metadata
        const { error: updateMetadataError } = await supabase
          .from('subcategory_metadata')
          .update({ category: newCategoryName })
          .eq('entity_type', 'consumables')
          .eq('category', oldCategory)

        if (updateMetadataError) throw updateMetadataError
      }

      // Update local state
      const newCategories = new Map(categories)
      const categoryData = newCategories.get(oldCategory)
      if (categoryData) {
        newCategories.delete(oldCategory)
        newCategories.set(newCategoryName, {
          ...categoryData,
          name: newCategoryName
        })
        setCategories(newCategories)
      }

      setEditingCategory(null)
      setCategoryEditName('')
      alert('Category updated successfully')
      // Reload data to refresh product counts
      loadData()
    } catch (error: any) {
      console.error('Error updating category:', error)
      alert(`Failed to update category: ${error.message}`)
    }
  }

  const handleCancelEditCategory = () => {
    setEditingCategory(null)
    setCategoryEditName('')
  }

  const handleAddSubcategory = async () => {
    if (!selectedCategory) {
      alert('Please select a category first')
      return
    }

    if (!newSubcategoryKey.trim() || !newSubcategoryLabel.trim()) {
      alert('Please enter both subcategory key and label')
      return
    }

    try {
      const supabase = createClient()

      // Check if subcategory already exists
      const { data: existing } = await supabase
        .from('subcategory_metadata')
        .select('id')
        .eq('entity_type', 'consumables')
        .eq('category', selectedCategory)
        .eq('subcategory_key', newSubcategoryKey.toLowerCase().trim())
        .single()

      if (existing) {
        alert('Subcategory with this key already exists')
        return
      }

      // Insert new subcategory metadata
      const { data: newSubcategory, error: insertError } = await supabase
        .from('subcategory_metadata')
        .insert({
          entity_type: 'consumables',
          category: selectedCategory,
          subcategory_key: newSubcategoryKey.toLowerCase().trim(),
          subcategory_label: newSubcategoryLabel.trim(),
          display_order: newSubcategorySortOrder,
          is_active: true
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Update local state
      const newCategories = new Map(categories)
      const categoryData = newCategories.get(selectedCategory)
      if (categoryData && newSubcategory) {
        categoryData.subcategories.push({
          ...newSubcategory,
          productCount: 0 // New subcategory starts with 0 products
        } as SubcategoryWithCount)
        categoryData.subcategories.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        newCategories.set(selectedCategory, categoryData)
        setCategories(newCategories)
      }
      
      // Reload data to refresh product counts
      loadData()

      setNewSubcategoryKey('')
      setNewSubcategoryLabel('')
      setNewSubcategorySortOrder(0)
      setSelectedCategory(null)
    } catch (error: any) {
      console.error('Error adding subcategory:', error)
      alert(`Failed to add subcategory: ${error.message}`)
    }
  }

  const handleEditSubcategory = (subcategory: SubcategoryWithCount) => {
    setSubcategoryEditData({
      id: subcategory.id,
      key: subcategory.subcategory_key,
      label: subcategory.subcategory_label,
      sortOrder: subcategory.display_order || 0
    })
    setEditingSubcategory(subcategory.id)
  }

  const handleSaveSubcategory = async () => {
    if (!editingSubcategory || !subcategoryEditData) {
      return
    }

    if (!subcategoryEditData.key.trim() || !subcategoryEditData.label.trim()) {
      alert('Please enter both subcategory key and label')
      return
    }

    try {
      const supabase = createClient()

      // Get the original subcategory to find its category
      const { data: original } = await supabase
        .from('subcategory_metadata')
        .select('category, subcategory_key')
        .eq('id', editingSubcategory)
        .single()

      if (!original) throw new Error('Subcategory not found')

      const oldKey = original.subcategory_key
      const category = original.category
      const newKey = subcategoryEditData.key.toLowerCase().trim()

      // If key changed, update all consumables with this subcategory
      if (oldKey !== newKey) {
        const { error: updateConsumablesError } = await supabase
          .from('consumables')
          .update({ subcategory: newKey })
          .eq('category', category)
          .eq('subcategory', oldKey)

        if (updateConsumablesError) throw updateConsumablesError
      }

      // Update subcategory metadata
      const { error: updateError } = await supabase
        .from('subcategory_metadata')
        .update({
          subcategory_key: newKey,
          subcategory_label: subcategoryEditData.label.trim(),
          display_order: subcategoryEditData.sortOrder
        })
        .eq('id', editingSubcategory)

      if (updateError) throw updateError

      // Update local state
      const newCategories = new Map(categories)
      const categoryData = newCategories.get(category)
      if (categoryData) {
        const subcategoryIndex = categoryData.subcategories.findIndex(s => s.id === editingSubcategory)
        if (subcategoryIndex !== -1) {
          categoryData.subcategories[subcategoryIndex] = {
            ...categoryData.subcategories[subcategoryIndex],
            subcategory_key: newKey,
            subcategory_label: subcategoryEditData.label.trim(),
            display_order: subcategoryEditData.sortOrder
          }
          categoryData.subcategories.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          newCategories.set(category, categoryData)
          setCategories(newCategories)
        }
      }

      setEditingSubcategory(null)
      setSubcategoryEditData(null)
      alert('Subcategory updated successfully')
      // Reload data to refresh product counts
      loadData()
    } catch (error: any) {
      console.error('Error updating subcategory:', error)
      alert(`Failed to update subcategory: ${error.message}`)
    }
  }

  const handleCancelEditSubcategory = () => {
    setEditingSubcategory(null)
    setSubcategoryEditData(null)
  }

  const handleDeleteSubcategory = async (subcategory: SubcategoryWithCount) => {
    if (!confirm(`Are you sure you want to delete subcategory "${subcategory.subcategory_label}"?`)) {
      return
    }

    try {
      const supabase = createClient()

      // Delete subcategory metadata
      const { error: deleteError } = await supabase
        .from('subcategory_metadata')
        .delete()
        .eq('id', subcategory.id)

      if (deleteError) throw deleteError

      // Update local state
      const newCategories = new Map(categories)
      const categoryData = newCategories.get(subcategory.category)
      if (categoryData) {
        categoryData.subcategories = categoryData.subcategories.filter(s => s.id !== subcategory.id)
        newCategories.set(subcategory.category, categoryData)
        setCategories(newCategories)
      }

      alert('Subcategory deleted successfully')
      // Reload data to refresh product counts
      loadData()
    } catch (error: any) {
      console.error('Error deleting subcategory:', error)
      alert(`Failed to delete subcategory: ${error.message}`)
    }
  }

  const sortedCategories = Array.from(categories.entries()).sort((a, b) => {
    return a[1].name.localeCompare(b[1].name)
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/admin/consumables')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  title="Back to Consumables"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Category Configuration</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage categories and subcategories for consumables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Category */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Category name (e.g., sectioning)"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Categories & Subcategories</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sortedCategories.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No categories found. Add a category to get started.
              </div>
            ) : (
              sortedCategories.map(([categoryKey, categoryData]) => (
                <div key={categoryKey} className="p-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleCategory(categoryKey)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {expandedCategories.has(categoryKey) ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </button>
                      {editingCategory === categoryKey ? (
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="text"
                            value={categoryEditName}
                            onChange={(e) => setCategoryEditName(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <button
                            onClick={handleSaveCategory}
                            className="text-green-600 hover:text-green-900 transition-colors"
                            title="Save"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleCancelEditCategory}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                            title="Cancel"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">{categoryData.name}</h3>
                          <span className="text-sm text-gray-500">
                            {categoryData.productCount} product{categoryData.productCount !== 1 ? 's' : ''} • {categoryData.subcategories.length} subcategor{categoryData.subcategories.length !== 1 ? 'ies' : 'y'}
                          </span>
                        </>
                      )}
                    </div>
                    {editingCategory !== categoryKey && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditCategory(categoryKey)}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                          title="Edit category"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(categoryKey)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete category"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Subcategories */}
                  {expandedCategories.has(categoryKey) && (
                    <div className="ml-8 space-y-3">
                      {/* Add New Subcategory */}
                      {selectedCategory === categoryKey ? (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex flex-col sm:flex-row gap-3 mb-3">
                            <input
                              type="text"
                              placeholder="Subcategory key (e.g., abrasive-blades)"
                              value={newSubcategoryKey}
                              onChange={(e) => setNewSubcategoryKey(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <input
                              type="text"
                              placeholder="Subcategory label (e.g., Abrasive Blades)"
                              value={newSubcategoryLabel}
                              onChange={(e) => setNewSubcategoryLabel(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <input
                              type="number"
                              placeholder="Sort order"
                              value={newSubcategorySortOrder}
                              onChange={(e) => setNewSubcategorySortOrder(parseInt(e.target.value) || 0)}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleAddSubcategory}
                              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCategory(null)
                                setNewSubcategoryKey('')
                                setNewSubcategoryLabel('')
                                setNewSubcategorySortOrder(0)
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedCategory(categoryKey)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-primary-600 hover:text-primary-900 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Subcategory
                        </button>
                      )}

                      {/* Subcategories List */}
                      {categoryData.subcategories.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No subcategories</p>
                      ) : (
                        categoryData.subcategories.map((subcategory) => (
                          <div
                            key={subcategory.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            {editingSubcategory === subcategory.id ? (
                              <div className="flex items-center gap-3 flex-1">
                                <input
                                  type="text"
                                  value={subcategoryEditData?.key || ''}
                                  onChange={(e) =>
                                    setSubcategoryEditData(
                                      subcategoryEditData
                                        ? { ...subcategoryEditData, key: e.target.value }
                                        : null
                                    )
                                  }
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                  placeholder="Key"
                                />
                                <input
                                  type="text"
                                  value={subcategoryEditData?.label || ''}
                                  onChange={(e) =>
                                    setSubcategoryEditData(
                                      subcategoryEditData
                                        ? { ...subcategoryEditData, label: e.target.value }
                                        : null
                                    )
                                  }
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                  placeholder="Label"
                                />
                                <input
                                  type="number"
                                  value={subcategoryEditData?.sortOrder || 0}
                                  onChange={(e) =>
                                    setSubcategoryEditData(
                                      subcategoryEditData
                                        ? { ...subcategoryEditData, sortOrder: parseInt(e.target.value) || 0 }
                                        : null
                                    )
                                  }
                                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                  placeholder="Order"
                                />
                                <button
                                  onClick={handleSaveSubcategory}
                                  className="text-green-600 hover:text-green-900 transition-colors"
                                  title="Save"
                                >
                                  <Save className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={handleCancelEditSubcategory}
                                  className="text-gray-600 hover:text-gray-900 transition-colors"
                                  title="Cancel"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{subcategory.subcategory_label}</div>
                                  <div className="text-sm text-gray-500">
                                    Key: {subcategory.subcategory_key} • {subcategory.productCount} product{subcategory.productCount !== 1 ? 's' : ''}
                                  </div>
                                  <div className="text-xs text-gray-400">Order: {subcategory.display_order || 0}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEditSubcategory(subcategory)}
                                    className="text-primary-600 hover:text-primary-900 transition-colors"
                                    title="Edit subcategory"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubcategory(subcategory)}
                                    className="text-red-600 hover:text-red-900 transition-colors"
                                    title="Delete subcategory"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

