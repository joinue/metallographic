'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { Standard } from '@/lib/supabase'
import { ArrowLeft, Save } from 'lucide-react'

interface StandardEditFormProps {
  standard: Standard | null
}

const CATEGORIES = [
  'Preparation',
  'Etching',
  'Analysis',
  'Testing',
  'Documentation',
  'Calibration',
  'Reference',
]

const ORGANIZATIONS = [
  'ASTM',
  'ISO',
  'SAE',
  'ASME',
  'JIS',
  'DIN',
  'BSI',
  'Other',
]

export default function StandardEditForm({ standard }: StandardEditFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    standard: standard?.standard || '',
    title: standard?.title || '',
    description: standard?.description || '',
    slug: standard?.slug || '',
    category: standard?.category || 'Preparation',
    organization: standard?.organization || 'ASTM',
    tags: standard?.tags?.join(', ') || '',
    scope: standard?.scope || '',
    key_procedures: standard?.key_procedures?.join(', ') || '',
    applicable_materials: standard?.applicable_materials?.join(', ') || '',
    related_topics: standard?.related_topics?.join(', ') || '',
    official_url: standard?.official_url || '',
    purchase_url: standard?.purchase_url || '',
    status: standard?.status || 'draft',
    featured: standard?.featured || false,
    sort_order: standard?.sort_order?.toString() || '0',
  })

  // Auto-generate slug from standard number
  useEffect(() => {
    if (!standard && formData.standard && !formData.slug) {
      const slug = formData.standard
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.standard, standard])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const supabase = createClient()
      
      // Verify user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to save standards. Please log in again.')
      }

      // Process array fields
      const tags = formData.tags
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : []
      const key_procedures = formData.key_procedures
        ? formData.key_procedures.split(',').map(p => p.trim()).filter(Boolean)
        : []
      const applicable_materials = formData.applicable_materials
        ? formData.applicable_materials.split(',').map(m => m.trim()).filter(Boolean)
        : []
      const related_topics = formData.related_topics
        ? formData.related_topics.split(',').map(t => t.trim()).filter(Boolean)
        : []

      const submitData: any = {
        standard: formData.standard,
        title: formData.title,
        description: formData.description,
        slug: formData.slug || null,
        category: formData.category,
        organization: formData.organization,
        tags: tags.length > 0 ? tags : null,
        scope: formData.scope || null,
        key_procedures: key_procedures.length > 0 ? key_procedures : null,
        applicable_materials: applicable_materials.length > 0 ? applicable_materials : null,
        related_topics: related_topics.length > 0 ? related_topics : null,
        official_url: formData.official_url || null,
        purchase_url: formData.purchase_url || null,
        status: formData.status,
        featured: formData.featured,
        sort_order: parseInt(formData.sort_order) || 0,
      }

      if (standard) {
        // Update existing standard
        const { error: updateError } = await supabase
          .from('standards')
          .update(submitData)
          .eq('id', standard.id)

        if (updateError) {
          console.error('Update error details:', updateError)
          throw new Error(updateError.message || 'Failed to update standard')
        }
      } else {
        // Create new standard
        const { error: insertError } = await supabase
          .from('standards')
          .insert([submitData])

        if (insertError) {
          console.error('Insert error details:', insertError)
          throw new Error(insertError.message || 'Failed to create standard')
        }
      }

      router.push('/admin/standards')
      router.refresh()
    } catch (error: any) {
      console.error('Error saving standard:', error)
      setError(error.message || 'Failed to save standard. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/standards')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {standard ? 'Edit Standard' : 'New Standard'}
            </h1>
            <p className="text-gray-600 mt-1">
              {standard ? 'Update standard information' : 'Create a new standard'}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
            
            <div>
              <label htmlFor="standard" className="block text-sm font-medium text-gray-700 mb-1">
                Standard Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="standard"
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="e.g., ASTM E3, ISO 6507"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Standard title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Brief description of the standard"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="URL-friendly identifier (auto-generated)"
              />
              <p className="mt-1 text-xs text-gray-500">Leave empty to auto-generate from standard number</p>
            </div>
          </div>

          {/* Categorization */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Categorization</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                  Organization
                </label>
                <select
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  {ORGANIZATIONS.map(org => (
                    <option key={org} value={org}>{org}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated tags (e.g., preparation, specimen, grinding)"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Additional Information</h2>
            
            <div>
              <label htmlFor="scope" className="block text-sm font-medium text-gray-700 mb-1">
                Scope
              </label>
              <textarea
                id="scope"
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="What the standard covers in detail"
              />
            </div>

            <div>
              <label htmlFor="key_procedures" className="block text-sm font-medium text-gray-700 mb-1">
                Key Procedures
              </label>
              <input
                type="text"
                id="key_procedures"
                name="key_procedures"
                value={formData.key_procedures}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated procedures"
              />
            </div>

            <div>
              <label htmlFor="applicable_materials" className="block text-sm font-medium text-gray-700 mb-1">
                Applicable Materials
              </label>
              <input
                type="text"
                id="applicable_materials"
                name="applicable_materials"
                value={formData.applicable_materials}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated material categories"
              />
            </div>

            <div>
              <label htmlFor="related_topics" className="block text-sm font-medium text-gray-700 mb-1">
                Related Topics
              </label>
              <input
                type="text"
                id="related_topics"
                name="related_topics"
                value={formData.related_topics}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated related topics"
              />
            </div>
          </div>

          {/* References and Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">References and Links</h2>
            
            <div>
              <label htmlFor="official_url" className="block text-sm font-medium text-gray-700 mb-1">
                Official URL
              </label>
              <input
                type="url"
                id="official_url"
                name="official_url"
                value={formData.official_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label htmlFor="purchase_url" className="block text-sm font-medium text-gray-700 mb-1">
                Purchase URL
              </label>
              <input
                type="url"
                id="purchase_url"
                name="purchase_url"
                value={formData.purchase_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Metadata</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  id="sort_order"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                Featured
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => router.push('/admin/standards')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : standard ? 'Update Standard' : 'Create Standard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

