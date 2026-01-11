'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-client'
import type { Consumable } from '@/lib/supabase'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'

interface ConsumableEditFormProps {
  consumable: Consumable | null
}

const CONSUMABLE_CATEGORIES = [
  'sectioning',
  'mounting',
  'grinding-lapping',
  'polishing',
  'etching',
  'hardness-testing',
]

const STATUS_OPTIONS = ['active', 'discontinued', 'draft'] as const

export default function ConsumableEditForm({ consumable }: ConsumableEditFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    // Basic Information
    name: consumable?.name || '',
    item_id: consumable?.item_id || '',
    sku: consumable?.sku || '',
    slug: consumable?.slug || '',
    description: consumable?.description || '',
    category: consumable?.category || 'sectioning',
    subcategory: consumable?.subcategory || '',
    
    // Product Attributes
    is_pace_product: consumable?.is_pace_product ?? true,
    product_url: consumable?.product_url || '',
    image_url: consumable?.image_url || '',
    list_price: consumable?.list_price?.toString() || '',
    
    // Technical Specifications
    size_mm: '',
    size_inches: '',
    grit_size: '',
    material_composition: '',
    type: '',
    
    // Suitability Attributes
    suitable_for_material_types: consumable?.suitable_for_material_types?.join(', ') || '',
    suitable_for_hardness: consumable?.suitable_for_hardness?.join(', ') || '',
    compatible_with_equipment: consumable?.compatible_with_equipment?.join(', ') || '',
    recommended_for_applications: consumable?.recommended_for_applications?.join(', ') || '',
    
    // Metadata
    tags: consumable?.tags?.join(', ') || '',
    is_active: consumable?.is_active ?? true,
    status: consumable?.status || 'draft',
    sort_order: consumable?.sort_order?.toString() || '0',
  })

  // Auto-generate slug from name
  useEffect(() => {
    if (!consumable && formData.name && !formData.slug) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name, consumable])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const supabase = createClient()
      
      // Verify user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to upload images')
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `consumable-images/${fileName}`

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('consumable-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('consumable-images')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, image_url: publicUrl }))
    } catch (error: any) {
      console.error('Error uploading image:', error)
      setError(error.message || 'Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const supabase = createClient()

      const toInt = (val: string) => val ? parseInt(val, 10) : null
      const toFloat = (val: string) => val ? parseFloat(val) : null

      // Convert comma-separated strings back to arrays
      const submitData: any = {
        name: formData.name,
        item_id: formData.item_id || null,
        sku: formData.sku || null,
        slug: formData.slug || null,
        description: formData.description || null,
        category: formData.category,
        subcategory: formData.subcategory || null,
        is_pace_product: formData.is_pace_product,
        product_url: formData.product_url || null,
        image_url: formData.image_url || null,
        list_price: toFloat(formData.list_price),
        
        // Technical Specifications
        size_mm: toInt(formData.size_mm),
        size_inches: toInt(formData.size_inches),
        grit_size: formData.grit_size || null,
        material_composition: formData.material_composition || null,
        type: formData.type || null,
        
        // Suitability Attributes
        suitable_for_material_types: formData.suitable_for_material_types
          ? formData.suitable_for_material_types.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        suitable_for_hardness: formData.suitable_for_hardness
          ? formData.suitable_for_hardness.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        compatible_with_equipment: formData.compatible_with_equipment
          ? formData.compatible_with_equipment.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        recommended_for_applications: formData.recommended_for_applications
          ? formData.recommended_for_applications.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        
        // Metadata
        tags: formData.tags
          ? formData.tags.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        is_active: formData.is_active,
        status: formData.status,
        sort_order: toInt(formData.sort_order) || 0,
      }

      // Remove null values for arrays (Supabase prefers empty arrays or null)
      Object.keys(submitData).forEach(key => {
        if (Array.isArray(submitData[key]) && submitData[key].length === 0) {
          submitData[key] = null
        }
      })

      if (consumable) {
        // Update existing
        const { data: updateData, error: updateError } = await supabase
          .from('consumables')
          .update(submitData)
          .eq('id', consumable.id)
          .select()

        if (updateError) {
          console.error('Update error details:', updateError)
          throw new Error(updateError.message || 'Failed to update consumable')
        }
        console.log('Consumable updated successfully:', updateData)
      } else {
        // Create new
        const { data: insertData, error: insertError } = await supabase
          .from('consumables')
          .insert(submitData)
          .select()

        if (insertError) {
          console.error('Insert error details:', insertError)
          throw new Error(insertError.message || 'Failed to create consumable')
        }
        console.log('Consumable created successfully:', insertData)
      }

      router.push('/admin/consumables')
      router.refresh()
    } catch (err: any) {
      console.error('Error saving consumable:', err)
      const errorMessage = err.message || err.error?.message || 'Failed to save consumable. Please check your permissions and try again.'
      setError(errorMessage)
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/admin/consumables')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Consumables
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {consumable ? 'Edit Consumable' : 'Add New Consumable'}
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item ID</label>
                <input
                  type="text"
                  name="item_id"
                  value={formData.item_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  {CONSUMABLE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Image</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none mb-2"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500 mb-3">Or upload an image below</p>
              
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
              </div>

              {formData.image_url && (
                <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={formData.image_url}
                    alt="Consumable preview"
                    fill
                    className="object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Product Attributes */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Product Attributes</h2>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_pace_product"
                checked={formData.is_pace_product}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label className="text-sm font-medium text-gray-700">PACE Product</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product URL</label>
                <input
                  type="url"
                  name="product_url"
                  value={formData.product_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">List Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="list_price"
                  value={formData.list_price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Technical Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size (mm)</label>
                <input
                  type="number"
                  name="size_mm"
                  value={formData.size_mm}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size (inches)</label>
                <input
                  type="number"
                  name="size_inches"
                  value={formData.size_inches}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grit Size</label>
                <input
                  type="text"
                  name="grit_size"
                  value={formData.grit_size}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material Composition</label>
                <input
                  type="text"
                  name="material_composition"
                  value={formData.material_composition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Suitability Attributes */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Suitability Attributes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material Types</label>
                <input
                  type="text"
                  name="suitable_for_material_types"
                  value={formData.suitable_for_material_types}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Comma-separated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hardness</label>
                <input
                  type="text"
                  name="suitable_for_hardness"
                  value={formData.suitable_for_hardness}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Comma-separated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Compatible Equipment</label>
                <input
                  type="text"
                  name="compatible_with_equipment"
                  value={formData.compatible_with_equipment}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Comma-separated item IDs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Applications</label>
                <input
                  type="text"
                  name="recommended_for_applications"
                  value={formData.recommended_for_applications}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Comma-separated"
                />
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Metadata</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Comma-separated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label className="text-sm font-medium text-gray-700">Is Active</label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => router.push('/admin/consumables')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Consumable'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


