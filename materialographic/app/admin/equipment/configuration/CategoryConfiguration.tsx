'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-client'
import type { SubcategoryMetadata, Equipment, CategoryMetadata } from '@/lib/supabase'
import { getEquipmentImageUrl } from '@/lib/storage'
import { ArrowLeft, Plus, Edit, Trash2, Save, X, ChevronDown, ChevronRight, Eye, ArrowUp, ArrowDown } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

interface SubcategoryWithCount extends SubcategoryMetadata {
  productCount: number
}

interface CategoryData {
  key: string
  label: string
  metadataId?: string
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
  const [newCategoryKey, setNewCategoryKey] = useState('')
  const [newCategoryLabel, setNewCategoryLabel] = useState('')
  const [newSubcategoryKey, setNewSubcategoryKey] = useState('')
  const [newSubcategoryLabel, setNewSubcategoryLabel] = useState('')
  const [newSubcategorySortOrder, setNewSubcategorySortOrder] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categoryEditData, setCategoryEditData] = useState<{
    key: string
    label: string
  } | null>(null)
  const [subcategoryEditData, setSubcategoryEditData] = useState<{
    id: string
    key: string
    label: string
    sortOrder: number
  } | null>(null)
  const [viewingProducts, setViewingProducts] = useState<{
    type: 'category' | 'subcategory'
    category: string
    subcategory?: string
    label: string
  } | null>(null)
  const [products, setProducts] = useState<Equipment[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // Load all equipment to get unique categories and count products
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('category, subcategory')
        .order('category', { ascending: true })

      if (equipmentError) throw equipmentError

      // Get unique categories and count products per category
      const categoryCounts = new Map<string, number>()
      // Count products per subcategory (key: "category:subcategory")
      const subcategoryCounts = new Map<string, number>()
      
      equipment?.forEach(item => {
        if (item.category) {
          categoryCounts.set(item.category, (categoryCounts.get(item.category) || 0) + 1)
          
          // Count by subcategory if it exists
          if (item.subcategory) {
            const key = `${item.category}:${item.subcategory}`
            subcategoryCounts.set(key, (subcategoryCounts.get(key) || 0) + 1)
          }
        }
      })
      const uniqueCategories = Array.from(categoryCounts.keys())

      // Load category metadata for equipment (if table exists)
      let categoryMetadata: CategoryMetadata[] | null = null
      const { data: categoryMetadataData, error: categoryMetadataError } = await supabase
        .from('category_metadata')
        .select('*')
        .eq('entity_type', 'equipment')
        .order('display_order', { ascending: true })

      // If table doesn't exist, that's okay - we'll create metadata on the fly
      if (categoryMetadataError && categoryMetadataError.code !== 'PGRST205') {
        throw categoryMetadataError
      }
      categoryMetadata = categoryMetadataData || null

      // Load subcategory metadata for equipment
      const { data: subcategoryMetadata, error: metadataError } = await supabase
        .from('subcategory_metadata')
        .select('*')
        .eq('entity_type', 'equipment')
        .order('category', { ascending: true })
        .order('display_order', { ascending: true })

      if (metadataError) throw metadataError

      // Create a map of category keys to metadata
      const categoryMetadataMap = new Map<string, CategoryMetadata>()
      categoryMetadata?.forEach(meta => {
        categoryMetadataMap.set(meta.category_key, meta)
      })

      // Group subcategories by category
      const categoriesMap = new Map<string, CategoryData>()
      
      // Initialize all categories with their subcategories and product counts
      uniqueCategories.forEach(categoryKey => {
        const meta = categoryMetadataMap.get(categoryKey)
        const subcategories = (subcategoryMetadata || []).filter(
          sub => sub.category === categoryKey
        ).map(sub => {
          const key = `${categoryKey}:${sub.subcategory_key}`
          return {
            ...sub,
            productCount: subcategoryCounts.get(key) || 0
          } as SubcategoryWithCount
        })
        categoriesMap.set(categoryKey, {
          key: categoryKey,
          label: meta?.category_label || categoryKey,
          metadataId: meta?.id,
          productCount: categoryCounts.get(categoryKey) || 0,
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
    if (!newCategoryKey.trim() || !newCategoryLabel.trim()) {
      alert('Please enter both category key and label')
      return
    }

    const categoryKey = newCategoryKey.toLowerCase().trim()

    // Check if category already exists
    if (categories.has(categoryKey)) {
      alert('Category with this key already exists')
      return
    }

    try {
      const supabase = createClient()

      // Check if category metadata already exists
      const { data: existing } = await supabase
        .from('category_metadata')
        .select('id')
        .eq('entity_type', 'equipment')
        .eq('category_key', categoryKey)
        .single()

      if (existing) {
        alert('Category with this key already exists')
        return
      }

      // Insert new category metadata
      const { data: newCategory, error: insertError } = await supabase
        .from('category_metadata')
        .insert({
          entity_type: 'equipment',
          category_key: categoryKey,
          category_label: newCategoryLabel.trim(),
          display_order: categories.size,
          is_active: true
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Add category to the map
      const newCategories = new Map(categories)
      newCategories.set(categoryKey, {
        key: categoryKey,
        label: newCategoryLabel.trim(),
        metadataId: newCategory.id,
        productCount: 0,
        subcategories: []
      })
      setCategories(newCategories)
      setNewCategoryKey('')
      setNewCategoryLabel('')
      setExpandedCategories(new Set([...expandedCategories, categoryKey]))
    } catch (error: any) {
      console.error('Error adding category:', error)
      alert(`Failed to add category: ${error.message}`)
    }
  }

  const handleDeleteCategory = async (category: string) => {
    const categoryData = categories.get(category)
    if (!categoryData) return

    if (!confirm(`Are you sure you want to delete category "${categoryData.label}"? This will also delete all its subcategories.`)) {
      return
    }

    try {
      const supabase = createClient()

      // Delete all subcategory metadata for this category
      const { error: deleteSubcategoriesError } = await supabase
        .from('subcategory_metadata')
        .delete()
        .eq('entity_type', 'equipment')
        .eq('category', category)

      if (deleteSubcategoriesError) throw deleteSubcategoriesError

      // Delete category metadata if it exists
      if (categoryData.metadataId) {
        const { error: deleteCategoryMetadataError } = await supabase
          .from('category_metadata')
          .delete()
          .eq('id', categoryData.metadataId)

        if (deleteCategoryMetadataError) throw deleteCategoryMetadataError
      }

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
      setCategoryEditData({
        key: categoryData.key,
        label: categoryData.label
      })
      setEditingCategory(category)
    }
  }

  const handleSaveCategory = async () => {
    if (!editingCategory || !categoryEditData || !categoryEditData.key.trim() || !categoryEditData.label.trim()) {
      alert('Please enter both category key and label')
      return
    }

    try {
      const supabase = createClient()
      const oldCategory = editingCategory
      const newCategoryKey = categoryEditData.key.toLowerCase().trim()
      const categoryData = categories.get(oldCategory)

      if (!categoryData) {
        alert('Category not found')
        return
      }

      // If category key changed, update all equipment with this category
      if (oldCategory !== newCategoryKey) {
        const { error: updateEquipmentError } = await supabase
          .from('equipment')
          .update({ category: newCategoryKey })
          .eq('category', oldCategory)

        if (updateEquipmentError) throw updateEquipmentError

        // Update subcategory metadata
        const { error: updateMetadataError } = await supabase
          .from('subcategory_metadata')
          .update({ category: newCategoryKey })
          .eq('entity_type', 'equipment')
          .eq('category', oldCategory)

        if (updateMetadataError) throw updateMetadataError
      }

      // Update category metadata
      if (categoryData.metadataId) {
        const { error: updateCategoryMetadataError } = await supabase
          .from('category_metadata')
          .update({
            category_key: newCategoryKey,
            category_label: categoryEditData.label.trim()
          })
          .eq('id', categoryData.metadataId)

        if (updateCategoryMetadataError) throw updateCategoryMetadataError
      } else {
        // Create metadata if it doesn't exist
        const { data: newMeta, error: insertError } = await supabase
          .from('category_metadata')
          .insert({
            entity_type: 'equipment',
            category_key: newCategoryKey,
            category_label: categoryEditData.label.trim(),
            display_order: categories.size,
            is_active: true
          })
          .select()
          .single()

        if (insertError) throw insertError
        categoryData.metadataId = newMeta.id
      }

      // Update local state
      const newCategories = new Map(categories)
      if (oldCategory !== newCategoryKey) {
        newCategories.delete(oldCategory)
      }
      newCategories.set(newCategoryKey, {
        ...categoryData,
        key: newCategoryKey,
        label: categoryEditData.label.trim()
      })
      setCategories(newCategories)

      setEditingCategory(null)
      setCategoryEditData(null)
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
    setCategoryEditData(null)
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
        .eq('entity_type', 'equipment')
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
          entity_type: 'equipment',
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

      // If key changed, update all equipment with this subcategory
      if (oldKey !== newKey) {
        const { error: updateEquipmentError } = await supabase
          .from('equipment')
          .update({ subcategory: newKey })
          .eq('category', category)
          .eq('subcategory', oldKey)

        if (updateEquipmentError) throw updateEquipmentError
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

  const handleViewProducts = async (type: 'category' | 'subcategory', category: string, subcategory?: string, label?: string) => {
    setViewingProducts({ type, category, subcategory, label: label || category })
    setLoadingProducts(true)
    
    try {
      const supabase = createClient()
      let query = supabase
        .from('equipment')
        .select('*')
        .eq('category', category)
        .order('sort_order', { ascending: true, nullsFirst: false })
        .order('name', { ascending: true })

      if (type === 'subcategory' && subcategory) {
        query = query.eq('subcategory', subcategory)
      }

      const { data, error } = await query

      if (error) throw error
      setProducts(data || [])
    } catch (error: any) {
      console.error('Error loading products:', error)
      alert(`Failed to load products: ${error.message}`)
      setProducts([])
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleMoveProduct = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === products.length - 1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const currentProduct = products[index]
    const targetProduct = products[newIndex]

    // Get current sort orders, using index + 1 as fallback for null values
    const currentSortOrder = currentProduct.sort_order ?? (index + 1) * 10
    const targetSortOrder = targetProduct.sort_order ?? (newIndex + 1) * 10

    try {
      const supabase = createClient()
      
      // Swap sort_order values
      const { error: error1 } = await supabase
        .from('equipment')
        .update({ sort_order: targetSortOrder })
        .eq('id', currentProduct.id)

      if (error1) throw error1

      const { error: error2 } = await supabase
        .from('equipment')
        .update({ sort_order: currentSortOrder })
        .eq('id', targetProduct.id)

      if (error2) throw error2

      // Reload products to reflect new order
      if (viewingProducts) {
        await handleViewProducts(viewingProducts.type, viewingProducts.category, viewingProducts.subcategory, viewingProducts.label)
      }
    } catch (error: any) {
      console.error('Error moving product:', error)
      alert(`Failed to move product: ${error.message}`)
    }
  }

  const handleUpdateProductSortOrder = async (productId: string, newSortOrder: number) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('equipment')
        .update({ sort_order: newSortOrder })
        .eq('id', productId)

      if (error) throw error

      // Reload products to reflect new order
      if (viewingProducts) {
        await handleViewProducts(viewingProducts.type, viewingProducts.category, viewingProducts.subcategory, viewingProducts.label)
      }
    } catch (error: any) {
      console.error('Error updating product sort order:', error)
      alert(`Failed to update sort order: ${error.message}`)
    }
  }

  const handleCloseModal = () => {
    setViewingProducts(null)
    setProducts([])
  }

  const sortedCategories = Array.from(categories.entries()).sort((a, b) => {
    return a[1].label.localeCompare(b[1].label)
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
                  onClick={() => router.push('/admin/equipment')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  title="Back to Equipment"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Category Configuration</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage categories and subcategories for equipment
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
              placeholder="Category key (e.g., sectioning)"
              value={newCategoryKey}
              onChange={(e) => setNewCategoryKey(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="Category label (e.g., Sectioning)"
              value={newCategoryLabel}
              onChange={(e) => setNewCategoryLabel(e.target.value)}
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
                            value={categoryEditData?.key || ''}
                            onChange={(e) => setCategoryEditData(categoryEditData ? { ...categoryEditData, key: e.target.value } : null)}
                            placeholder="Key"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <input
                            type="text"
                            value={categoryEditData?.label || ''}
                            onChange={(e) => setCategoryEditData(categoryEditData ? { ...categoryEditData, label: e.target.value } : null)}
                            placeholder="Label"
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
                          <button
                            onClick={() => handleViewProducts('category', categoryKey, undefined, categoryData.label)}
                            className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors text-left"
                            title={`View all ${categoryData.productCount} products in this category`}
                          >
                            {categoryData.label}
                          </button>
                          <span className="text-sm text-gray-500">
                            Key: {categoryData.key} • {categoryData.productCount} product{categoryData.productCount !== 1 ? 's' : ''} • {categoryData.subcategories.length} subcategor{categoryData.subcategories.length !== 1 ? 'ies' : 'y'}
                          </span>
                        </>
                      )}
                    </div>
                    {editingCategory !== categoryKey && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewProducts('category', categoryKey, undefined, categoryData.label)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View products"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
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
                              placeholder="Subcategory key (e.g., automated-abrasive-sectioning)"
                              value={newSubcategoryKey}
                              onChange={(e) => setNewSubcategoryKey(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <input
                              type="text"
                              placeholder="Subcategory label (e.g., Automated Abrasive Sectioning)"
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
                                  <button
                                    onClick={() => handleViewProducts('subcategory', subcategory.category, subcategory.subcategory_key, subcategory.subcategory_label)}
                                    className="font-medium text-gray-900 hover:text-primary-600 transition-colors text-left"
                                    title={`View all ${subcategory.productCount} products in this subcategory`}
                                  >
                                    {subcategory.subcategory_label}
                                  </button>
                                  <div className="text-sm text-gray-500">
                                    Key: {subcategory.subcategory_key} • {subcategory.productCount} product{subcategory.productCount !== 1 ? 's' : ''}
                                  </div>
                                  <div className="text-xs text-gray-400">Order: {subcategory.display_order || 0}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleViewProducts('subcategory', subcategory.category, subcategory.subcategory_key, subcategory.subcategory_label)}
                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                    title="View products"
                                  >
                                    <Eye className="w-5 h-5" />
                                  </button>
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

      {/* Products Modal */}
      {viewingProducts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {viewingProducts.type === 'category' ? 'Category' : 'Subcategory'}: {viewingProducts.label}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {loadingProducts ? (
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No equipment found in this {viewingProducts.type === 'category' ? 'category' : 'subcategory'}.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {products.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {/* Sort Order Controls */}
                      <div className="flex flex-col gap-1 flex-shrink-0 items-center">
                        <button
                          onClick={() => handleMoveProduct(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.sort_order ?? index + 1}
                          onChange={(e) => {
                            const newOrder = parseInt(e.target.value) || 0
                            handleUpdateProductSortOrder(item.id, newOrder)
                          }}
                          className="w-12 text-xs text-center text-gray-700 font-medium border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          title="Sort order (lower numbers appear first)"
                        />
                        <button
                          onClick={() => handleMoveProduct(index, 'down')}
                          disabled={index === products.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                        {item.image_url ? (
                          <Image
                            src={getEquipmentImageUrl(item.image_url) || item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs text-gray-400">No img</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {item.item_id && (
                            <span className="text-xs text-gray-500">ID: {item.item_id}</span>
                          )}
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            item.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'discontinued'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status || 'draft'}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            router.push(`/admin/equipment/${item.id}`)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

