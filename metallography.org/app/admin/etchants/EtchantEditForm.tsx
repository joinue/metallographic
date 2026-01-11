'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { Etchant } from '@/lib/supabase'
import { ArrowLeft, Save } from 'lucide-react'

interface EtchantEditFormProps {
  etchant: Etchant | null
}

const CATEGORIES = [
  'general-purpose',
  'material-specific',
  'specialty',
  'electrolytic',
  'color',
  'other',
]

const APPLICATION_METHODS = [
  'immersion',
  'swabbing',
  'electrolytic',
  'vapor',
  'multiple',
]

export default function EtchantEditForm({ etchant }: EtchantEditFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: etchant?.name || '',
    slug: etchant?.slug || '',
    alternative_names: etchant?.alternative_names?.join(', ') || '',
    tags: etchant?.tags?.join(', ') || '',
    category: etchant?.category || '',
    composition: etchant?.composition || '',
    concentration: etchant?.concentration || '',
    application_method: etchant?.application_method || '',
    typical_time_seconds: etchant?.typical_time_seconds?.toString() || '',
    temperature_celsius: etchant?.temperature_celsius?.toString() || '',
    voltage: etchant?.voltage?.toString() || '',
    current_density: etchant?.current_density?.toString() || '',
    hazards: etchant?.hazards?.join(', ') || '',
    safety_notes: etchant?.safety_notes || '',
    ppe_required: etchant?.ppe_required?.join(', ') || '',
    reveals: etchant?.reveals || '',
    typical_results: etchant?.typical_results || '',
    color_effects: etchant?.color_effects || '',
    compatible_materials: etchant?.compatible_materials?.join(', ') || '',
    incompatible_materials: etchant?.incompatible_materials?.join(', ') || '',
    pace_product_available: etchant?.pace_product_available || false,
    pace_product_slug: etchant?.pace_product_slug || '',
    pace_product_url: etchant?.pace_product_url || '',
    preparation_notes: etchant?.preparation_notes || '',
    application_notes: etchant?.application_notes || '',
    troubleshooting_notes: etchant?.troubleshooting_notes || '',
    storage_notes: etchant?.storage_notes || '',
    alternative_etchants: etchant?.alternative_etchants?.join(', ') || '',
    similar_etchants: etchant?.similar_etchants?.join(', ') || '',
    astm_references: etchant?.astm_references?.join(', ') || '',
    iso_references: etchant?.iso_references?.join(', ') || '',
    other_references: etchant?.other_references?.join(', ') || '',
    example_image_url: etchant?.example_image_url || '',
    before_after_image_url: etchant?.before_after_image_url || '',
    status: etchant?.status || 'draft',
    featured: etchant?.featured || false,
    sort_order: etchant?.sort_order?.toString() || '0',
  })

  // Auto-generate slug from name
  useEffect(() => {
    if (!etchant && formData.name && !formData.slug) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name, etchant])

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
        throw new Error('You must be logged in to save etchants. Please log in again.')
      }

      // Process array fields
      const alternative_names = formData.alternative_names
        ? formData.alternative_names.split(',').map(n => n.trim()).filter(Boolean)
        : []
      const tags = formData.tags
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : []
      const hazards = formData.hazards
        ? formData.hazards.split(',').map(h => h.trim()).filter(Boolean)
        : []
      const ppe_required = formData.ppe_required
        ? formData.ppe_required.split(',').map(p => p.trim()).filter(Boolean)
        : []
      const compatible_materials = formData.compatible_materials
        ? formData.compatible_materials.split(',').map(m => m.trim()).filter(Boolean)
        : []
      const incompatible_materials = formData.incompatible_materials
        ? formData.incompatible_materials.split(',').map(m => m.trim()).filter(Boolean)
        : []
      const alternative_etchants = formData.alternative_etchants
        ? formData.alternative_etchants.split(',').map(e => e.trim()).filter(Boolean)
        : []
      const similar_etchants = formData.similar_etchants
        ? formData.similar_etchants.split(',').map(e => e.trim()).filter(Boolean)
        : []
      const astm_references = formData.astm_references
        ? formData.astm_references.split(',').map(r => r.trim()).filter(Boolean)
        : []
      const iso_references = formData.iso_references
        ? formData.iso_references.split(',').map(r => r.trim()).filter(Boolean)
        : []
      const other_references = formData.other_references
        ? formData.other_references.split(',').map(r => r.trim()).filter(Boolean)
        : []

      const submitData: any = {
        name: formData.name,
        slug: formData.slug || null,
        alternative_names: alternative_names.length > 0 ? alternative_names : null,
        tags: tags.length > 0 ? tags : null,
        category: formData.category || null,
        composition: formData.composition,
        concentration: formData.concentration || null,
        application_method: formData.application_method || null,
        typical_time_seconds: formData.typical_time_seconds ? parseInt(formData.typical_time_seconds) : null,
        temperature_celsius: formData.temperature_celsius ? parseFloat(formData.temperature_celsius) : null,
        voltage: formData.voltage ? parseFloat(formData.voltage) : null,
        current_density: formData.current_density ? parseFloat(formData.current_density) : null,
        hazards: hazards.length > 0 ? hazards : null,
        safety_notes: formData.safety_notes || null,
        ppe_required: ppe_required.length > 0 ? ppe_required : null,
        reveals: formData.reveals || null,
        typical_results: formData.typical_results || null,
        color_effects: formData.color_effects || null,
        compatible_materials: compatible_materials.length > 0 ? compatible_materials : null,
        incompatible_materials: incompatible_materials.length > 0 ? incompatible_materials : null,
        pace_product_available: formData.pace_product_available,
        pace_product_slug: formData.pace_product_slug || null,
        pace_product_url: formData.pace_product_url || null,
        preparation_notes: formData.preparation_notes || null,
        application_notes: formData.application_notes || null,
        troubleshooting_notes: formData.troubleshooting_notes || null,
        storage_notes: formData.storage_notes || null,
        alternative_etchants: alternative_etchants.length > 0 ? alternative_etchants : null,
        similar_etchants: similar_etchants.length > 0 ? similar_etchants : null,
        astm_references: astm_references.length > 0 ? astm_references : null,
        iso_references: iso_references.length > 0 ? iso_references : null,
        other_references: other_references.length > 0 ? other_references : null,
        example_image_url: formData.example_image_url || null,
        before_after_image_url: formData.before_after_image_url || null,
        status: formData.status,
        featured: formData.featured,
        sort_order: parseInt(formData.sort_order) || 0,
      }

      if (etchant) {
        // Update existing etchant
        const { error: updateError } = await supabase
          .from('etchants')
          .update(submitData)
          .eq('id', etchant.id)

        if (updateError) {
          console.error('Update error details:', updateError)
          throw new Error(updateError.message || 'Failed to update etchant')
        }
      } else {
        // Create new etchant
        const { error: insertError } = await supabase
          .from('etchants')
          .insert([submitData])

        if (insertError) {
          console.error('Insert error details:', insertError)
          throw new Error(insertError.message || 'Failed to create etchant')
        }
      }

      router.push('/admin/etchants')
      router.refresh()
    } catch (error: any) {
      console.error('Error saving etchant:', error)
      setError(error.message || 'Failed to save etchant. Please try again.')
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
            onClick={() => router.push('/admin/etchants')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {etchant ? 'Edit Etchant' : 'New Etchant'}
            </h1>
            <p className="text-gray-600 mt-1">
              {etchant ? 'Update etchant information' : 'Create a new etchant'}
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="e.g., Nital, Picral, Kalling's Reagent"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="application_method" className="block text-sm font-medium text-gray-700 mb-1">
                  Application Method
                </label>
                <select
                  id="application_method"
                  name="application_method"
                  value={formData.application_method}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="">Select method</option>
                  {APPLICATION_METHODS.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="alternative_names" className="block text-sm font-medium text-gray-700 mb-1">
                Alternative Names
              </label>
              <input
                type="text"
                id="alternative_names"
                name="alternative_names"
                value={formData.alternative_names}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated alternative names"
              />
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
                placeholder="Comma-separated tags"
              />
            </div>
          </div>

          {/* Composition */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Composition</h2>
            
            <div>
              <label htmlFor="composition" className="block text-sm font-medium text-gray-700 mb-1">
                Composition <span className="text-red-500">*</span>
              </label>
              <textarea
                id="composition"
                name="composition"
                value={formData.composition}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Chemical formula or description"
              />
            </div>

            <div>
              <label htmlFor="concentration" className="block text-sm font-medium text-gray-700 mb-1">
                Concentration
              </label>
              <input
                type="text"
                id="concentration"
                name="concentration"
                value={formData.concentration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="e.g., 2%, 10%, Saturated"
              />
            </div>
          </div>

          {/* Application Parameters */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Application Parameters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="typical_time_seconds" className="block text-sm font-medium text-gray-700 mb-1">
                  Typical Time (seconds)
                </label>
                <input
                  type="number"
                  id="typical_time_seconds"
                  name="typical_time_seconds"
                  value={formData.typical_time_seconds}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="temperature_celsius" className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  id="temperature_celsius"
                  name="temperature_celsius"
                  value={formData.temperature_celsius}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="voltage" className="block text-sm font-medium text-gray-700 mb-1">
                  Voltage (for electrolytic)
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="voltage"
                  name="voltage"
                  value={formData.voltage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="current_density" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Density (for electrolytic)
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="current_density"
                  name="current_density"
                  value={formData.current_density}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Safety */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Safety</h2>
            
            <div>
              <label htmlFor="hazards" className="block text-sm font-medium text-gray-700 mb-1">
                Hazards
              </label>
              <input
                type="text"
                id="hazards"
                name="hazards"
                value={formData.hazards}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated (e.g., corrosive, toxic, flammable)"
              />
            </div>

            <div>
              <label htmlFor="safety_notes" className="block text-sm font-medium text-gray-700 mb-1">
                Safety Notes
              </label>
              <textarea
                id="safety_notes"
                name="safety_notes"
                value={formData.safety_notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Important safety information"
              />
            </div>

            <div>
              <label htmlFor="ppe_required" className="block text-sm font-medium text-gray-700 mb-1">
                PPE Required
              </label>
              <input
                type="text"
                id="ppe_required"
                name="ppe_required"
                value={formData.ppe_required}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated (e.g., gloves, goggles, fume hood)"
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Results</h2>
            
            <div>
              <label htmlFor="reveals" className="block text-sm font-medium text-gray-700 mb-1">
                Reveals
              </label>
              <input
                type="text"
                id="reveals"
                name="reveals"
                value={formData.reveals}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="e.g., grain boundaries, carbides, phases"
              />
            </div>

            <div>
              <label htmlFor="typical_results" className="block text-sm font-medium text-gray-700 mb-1">
                Typical Results
              </label>
              <textarea
                id="typical_results"
                name="typical_results"
                value={formData.typical_results}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Description of typical microstructural features revealed"
              />
            </div>

            <div>
              <label htmlFor="color_effects" className="block text-sm font-medium text-gray-700 mb-1">
                Color Effects
              </label>
              <input
                type="text"
                id="color_effects"
                name="color_effects"
                value={formData.color_effects}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Any color effects produced"
              />
            </div>
          </div>

          {/* Compatibility */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Compatibility</h2>
            
            <div>
              <label htmlFor="compatible_materials" className="block text-sm font-medium text-gray-700 mb-1">
                Compatible Materials
              </label>
              <input
                type="text"
                id="compatible_materials"
                name="compatible_materials"
                value={formData.compatible_materials}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated material categories"
              />
            </div>

            <div>
              <label htmlFor="incompatible_materials" className="block text-sm font-medium text-gray-700 mb-1">
                Incompatible Materials
              </label>
              <input
                type="text"
                id="incompatible_materials"
                name="incompatible_materials"
                value={formData.incompatible_materials}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated materials to avoid"
              />
            </div>
          </div>

          {/* Usage Notes */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Usage Notes</h2>
            
            <div>
              <label htmlFor="preparation_notes" className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Notes
              </label>
              <textarea
                id="preparation_notes"
                name="preparation_notes"
                value={formData.preparation_notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="How to prepare the etchant"
              />
            </div>

            <div>
              <label htmlFor="application_notes" className="block text-sm font-medium text-gray-700 mb-1">
                Application Notes
              </label>
              <textarea
                id="application_notes"
                name="application_notes"
                value={formData.application_notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Detailed application instructions"
              />
            </div>

            <div>
              <label htmlFor="troubleshooting_notes" className="block text-sm font-medium text-gray-700 mb-1">
                Troubleshooting Notes
              </label>
              <textarea
                id="troubleshooting_notes"
                name="troubleshooting_notes"
                value={formData.troubleshooting_notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Common issues and solutions"
              />
            </div>

            <div>
              <label htmlFor="storage_notes" className="block text-sm font-medium text-gray-700 mb-1">
                Storage Notes
              </label>
              <textarea
                id="storage_notes"
                name="storage_notes"
                value={formData.storage_notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="How to store the etchant"
              />
            </div>
          </div>

          {/* References */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">References</h2>
            
            <div>
              <label htmlFor="astm_references" className="block text-sm font-medium text-gray-700 mb-1">
                ASTM References
              </label>
              <input
                type="text"
                id="astm_references"
                name="astm_references"
                value={formData.astm_references}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated ASTM standard references"
              />
            </div>

            <div>
              <label htmlFor="iso_references" className="block text-sm font-medium text-gray-700 mb-1">
                ISO References
              </label>
              <input
                type="text"
                id="iso_references"
                name="iso_references"
                value={formData.iso_references}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated ISO standard references"
              />
            </div>

            <div>
              <label htmlFor="other_references" className="block text-sm font-medium text-gray-700 mb-1">
                Other References
              </label>
              <input
                type="text"
                id="other_references"
                name="other_references"
                value={formData.other_references}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated other references"
              />
            </div>
          </div>

          {/* PACE Product */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">PACE Product</h2>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pace_product_available"
                name="pace_product_available"
                checked={formData.pace_product_available}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="pace_product_available" className="ml-2 text-sm font-medium text-gray-700">
                PACE Product Available
              </label>
            </div>

            {formData.pace_product_available && (
              <>
                <div>
                  <label htmlFor="pace_product_slug" className="block text-sm font-medium text-gray-700 mb-1">
                    PACE Product Slug
                  </label>
                  <input
                    type="text"
                    id="pace_product_slug"
                    name="pace_product_slug"
                    value={formData.pace_product_slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="Slug for shop.metallographic.com URL"
                  />
                </div>

                <div>
                  <label htmlFor="pace_product_url" className="block text-sm font-medium text-gray-700 mb-1">
                    PACE Product URL
                  </label>
                  <input
                    type="url"
                    id="pace_product_url"
                    name="pace_product_url"
                    value={formData.pace_product_url}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="Full URL if different from standard pattern"
                  />
                </div>
              </>
            )}
          </div>

          {/* Related Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Related Items</h2>
            
            <div>
              <label htmlFor="alternative_etchants" className="block text-sm font-medium text-gray-700 mb-1">
                Alternative Etchants
              </label>
              <input
                type="text"
                id="alternative_etchants"
                name="alternative_etchants"
                value={formData.alternative_etchants}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated names of alternative etchants"
              />
            </div>

            <div>
              <label htmlFor="similar_etchants" className="block text-sm font-medium text-gray-700 mb-1">
                Similar Etchants
              </label>
              <input
                type="text"
                id="similar_etchants"
                name="similar_etchants"
                value={formData.similar_etchants}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Comma-separated names of similar etchants"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Images</h2>
            
            <div>
              <label htmlFor="example_image_url" className="block text-sm font-medium text-gray-700 mb-1">
                Example Image URL
              </label>
              <input
                type="url"
                id="example_image_url"
                name="example_image_url"
                value={formData.example_image_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label htmlFor="before_after_image_url" className="block text-sm font-medium text-gray-700 mb-1">
                Before/After Image URL
              </label>
              <input
                type="url"
                id="before_after_image_url"
                name="before_after_image_url"
                value={formData.before_after_image_url}
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
              onClick={() => router.push('/admin/etchants')}
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
              {saving ? 'Saving...' : etchant ? 'Update Etchant' : 'Create Etchant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

