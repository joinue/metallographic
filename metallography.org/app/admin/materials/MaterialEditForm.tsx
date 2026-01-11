'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { Material } from '@/lib/supabase'
import { ArrowLeft, Save, Info, Database, Wrench, Flame, FileText, Briefcase } from 'lucide-react'

interface MaterialEditFormProps {
  material: Material | null
}

type TabId = 'basic' | 'properties' | 'preparation' | 'heat-treatment' | 'standards' | 'applications' | 'metadata'

const tabs: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
  { id: 'basic', label: 'Basic Info', icon: <Info className="w-4 h-4" /> },
  { id: 'properties', label: 'Properties', icon: <Database className="w-4 h-4" /> },
  { id: 'preparation', label: 'Preparation', icon: <Wrench className="w-4 h-4" /> },
  { id: 'heat-treatment', label: 'Heat Treatment', icon: <Flame className="w-4 h-4" /> },
  { id: 'standards', label: 'Standards', icon: <FileText className="w-4 h-4" /> },
  { id: 'applications', label: 'Applications', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'metadata', label: 'Metadata', icon: <Info className="w-4 h-4" /> },
]

export default function MaterialEditForm({ material }: MaterialEditFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<TabId>('basic')

  // Comprehensive form state
  const [formData, setFormData] = useState({
    // Basic Information
    name: material?.name || '',
    slug: material?.slug || '',
    category: material?.category || '',
    material_type: material?.material_type || '',
    composition: material?.composition || '',
    microstructure: material?.microstructure || '',
    detailed_description: material?.detailed_description || '',
    special_notes: material?.special_notes || '',
    alternative_names: material?.alternative_names?.join(', ') || '',
    tags: material?.tags?.join(', ') || '',

    // Properties
    hardness: material?.hardness || '',
    hardness_hb: material?.hardness_hb?.toString() || '',
    hardness_hrc: material?.hardness_hrc?.toString() || '',
    hardness_hv: material?.hardness_hv?.toString() || '',
    hardness_category: material?.hardness_category || '',
    tensile_strength_mpa: material?.tensile_strength_mpa?.toString() || '',
    yield_strength_mpa: material?.yield_strength_mpa?.toString() || '',
    density: material?.density?.toString() || '',
    melting_point_celsius: material?.melting_point_celsius?.toString() || '',
    work_hardening: material?.work_hardening ?? null,
    magnetic: material?.magnetic ?? null,
    corrosion_resistance: material?.corrosion_resistance || '',

    // Preparation
    preparation_notes: material?.preparation_notes || '',
    sectioning_notes: material?.sectioning_notes || '',
    mounting_notes: material?.mounting_notes || '',
    grinding_notes: material?.grinding_notes || '',
    polishing_notes: material?.polishing_notes || '',
    etching_notes: material?.etching_notes || '',
    recommended_grinding_sequence: material?.recommended_grinding_sequence?.join(', ') || '',
    recommended_polishing_sequence: material?.recommended_polishing_sequence?.join(', ') || '',
    common_etchants: material?.common_etchants?.join(', ') || '',

    // Heat Treatment
    heat_treatment: material?.heat_treatment || '',
    annealing_temperature_celsius: material?.annealing_temperature_celsius?.toString() || '',
    solution_treatment_temp_celsius: material?.solution_treatment_temp_celsius?.toString() || '',
    aging_temperature_celsius: material?.aging_temperature_celsius?.toString() || '',

    // Standards
    astm_standards: material?.astm_standards?.join(', ') || '',
    iso_standards: material?.iso_standards?.join(', ') || '',

    // Applications
    applications: material?.applications?.join(', ') || '',
    typical_uses: material?.typical_uses?.join(', ') || '',

    // Metadata
    status: material?.status || 'draft',
    featured: material?.featured || false,
    sort_order: material?.sort_order?.toString() || '0',
  })

  // Auto-generate slug from name
  useEffect(() => {
    if (!material && formData.name && !formData.slug) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name, material])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? '' : value }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleBooleanChange = (name: string, value: boolean | null) => {
    setFormData(prev => ({ ...prev, [name]: value }))
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
        throw new Error('You must be logged in to save materials. Please log in again.')
      }

      // Helper to convert string to number or null
      const toNumber = (val: string) => (val === '' ? null : parseFloat(val))
      const toInt = (val: string) => (val === '' ? 0 : parseInt(val))

      // Convert comma-separated strings back to arrays
      const submitData: any = {
        name: formData.name,
        slug: formData.slug || null,
        category: formData.category,
        material_type: formData.material_type || null,
        composition: formData.composition,
        microstructure: formData.microstructure,
        detailed_description: formData.detailed_description || null,
        special_notes: formData.special_notes || null,
        alternative_names: formData.alternative_names
          ? formData.alternative_names.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        tags: formData.tags
          ? formData.tags.split(',').map(s => s.trim()).filter(Boolean)
          : null,

        // Properties
        hardness: formData.hardness || null,
        hardness_hb: toNumber(formData.hardness_hb),
        hardness_hrc: toNumber(formData.hardness_hrc),
        hardness_hv: toNumber(formData.hardness_hv),
        hardness_category: formData.hardness_category || null,
        tensile_strength_mpa: toNumber(formData.tensile_strength_mpa),
        yield_strength_mpa: toNumber(formData.yield_strength_mpa),
        density: toNumber(formData.density),
        melting_point_celsius: toNumber(formData.melting_point_celsius),
        work_hardening: formData.work_hardening,
        magnetic: formData.magnetic,
        corrosion_resistance: formData.corrosion_resistance || null,

        // Preparation
        preparation_notes: formData.preparation_notes || null,
        sectioning_notes: formData.sectioning_notes || null,
        mounting_notes: formData.mounting_notes || null,
        grinding_notes: formData.grinding_notes || null,
        polishing_notes: formData.polishing_notes || null,
        etching_notes: formData.etching_notes || null,
        recommended_grinding_sequence: formData.recommended_grinding_sequence
          ? formData.recommended_grinding_sequence.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        recommended_polishing_sequence: formData.recommended_polishing_sequence
          ? formData.recommended_polishing_sequence.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        common_etchants: formData.common_etchants
          ? formData.common_etchants.split(',').map(s => s.trim()).filter(Boolean)
          : null,

        // Heat Treatment
        heat_treatment: formData.heat_treatment || null,
        annealing_temperature_celsius: toNumber(formData.annealing_temperature_celsius),
        solution_treatment_temp_celsius: toNumber(formData.solution_treatment_temp_celsius),
        aging_temperature_celsius: toNumber(formData.aging_temperature_celsius),

        // Standards
        astm_standards: formData.astm_standards
          ? formData.astm_standards.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        iso_standards: formData.iso_standards
          ? formData.iso_standards.split(',').map(s => s.trim()).filter(Boolean)
          : null,

        // Applications
        applications: formData.applications
          ? formData.applications.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        typical_uses: formData.typical_uses
          ? formData.typical_uses.split(',').map(s => s.trim()).filter(Boolean)
          : null,

        // Metadata
        status: formData.status,
        featured: formData.featured,
        sort_order: toInt(formData.sort_order),
      }

      // Remove null values for arrays (Supabase prefers empty arrays or null)
      Object.keys(submitData).forEach(key => {
        if (Array.isArray(submitData[key]) && submitData[key].length === 0) {
          submitData[key] = null
        }
      })

      if (material) {
        // Update existing
        const { data: updateData, error: updateError } = await supabase
          .from('materials')
          .update(submitData)
          .eq('id', material.id)
          .select()

        if (updateError) {
          console.error('Update error details:', updateError)
          throw new Error(updateError.message || 'Failed to update material')
        }
        console.log('Material updated successfully:', updateData)
      } else {
        // Create new
        const { data: insertData, error: insertError } = await supabase
          .from('materials')
          .insert(submitData)
          .select()

        if (insertError) {
          console.error('Insert error details:', insertError)
          throw new Error(insertError.message || 'Failed to create material')
        }
        console.log('Material created successfully:', insertData)
      }

      router.push('/admin/materials')
      router.refresh()
    } catch (err: any) {
      console.error('Error saving material:', err)
      const errorMessage = err.message || err.error?.message || 'Failed to save material. Please check your permissions and try again.'
      setError(errorMessage)
      setSaving(false)
    }
  }

  const renderBasicTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Material Type</label>
          <input
            type="text"
            name="material_type"
            value={formData.material_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="e.g., metal, alloy, ceramic"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Composition <span className="text-red-500">*</span>
        </label>
        <textarea
          name="composition"
          required
          rows={3}
          value={formData.composition}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Microstructure <span className="text-red-500">*</span>
        </label>
        <textarea
          name="microstructure"
          required
          rows={3}
          value={formData.microstructure}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Detailed Description</label>
        <textarea
          name="detailed_description"
          rows={5}
          value={formData.detailed_description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Notes</label>
        <textarea
          name="special_notes"
          rows={3}
          value={formData.special_notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Alternative Names</label>
          <input
            type="text"
            name="alternative_names"
            value={formData.alternative_names}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Comma-separated"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Comma-separated"
          />
        </div>
      </div>
    </div>
  )

  const renderPropertiesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">Mechanical Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hardness (Text)</label>
            <input
              type="text"
              name="hardness"
              value={formData.hardness}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 36 HB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hardness (HB)</label>
            <input
              type="number"
              step="0.1"
              name="hardness_hb"
              value={formData.hardness_hb}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hardness (HRC)</label>
            <input
              type="number"
              step="0.1"
              name="hardness_hrc"
              value={formData.hardness_hrc}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hardness (HV)</label>
            <input
              type="number"
              step="0.1"
              name="hardness_hv"
              value={formData.hardness_hv}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hardness Category</label>
            <select
              name="hardness_category"
              value={formData.hardness_category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select...</option>
              <option value="soft">Soft</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="very-hard">Very Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tensile Strength (MPa)</label>
            <input
              type="number"
              step="0.1"
              name="tensile_strength_mpa"
              value={formData.tensile_strength_mpa}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Yield Strength (MPa)</label>
            <input
              type="number"
              step="0.1"
              name="yield_strength_mpa"
              value={formData.yield_strength_mpa}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">Physical Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Density (g/cm³)</label>
            <input
              type="number"
              step="0.001"
              name="density"
              value={formData.density}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Melting Point (°C)</label>
            <input
              type="number"
              step="1"
              name="melting_point_celsius"
              value={formData.melting_point_celsius}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">Material Characteristics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Work Hardening</label>
            <select
              name="work_hardening"
              value={formData.work_hardening === null ? '' : formData.work_hardening ? 'true' : 'false'}
              onChange={(e) => handleBooleanChange('work_hardening', e.target.value === '' ? null : e.target.value === 'true')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Not specified</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Magnetic</label>
            <select
              name="magnetic"
              value={formData.magnetic === null ? '' : formData.magnetic ? 'true' : 'false'}
              onChange={(e) => handleBooleanChange('magnetic', e.target.value === '' ? null : e.target.value === 'true')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Not specified</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Corrosion Resistance</label>
            <select
              name="corrosion_resistance"
              value={formData.corrosion_resistance}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select...</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPreparationTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">General Preparation Notes</label>
        <p className="text-xs text-gray-500 mb-1">HTML supported: Use &lt;strong&gt;, &lt;br /&gt;, &lt;ul&gt;&lt;li&gt; for formatting</p>
        <textarea
          name="preparation_notes"
          rows={8}
          value={formData.preparation_notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Sectioning Notes</label>
        <p className="text-xs text-gray-500 mb-1">HTML supported: Use &lt;strong&gt;, &lt;br /&gt;, &lt;ul&gt;&lt;li&gt; for formatting</p>
        <textarea
          name="sectioning_notes"
          rows={8}
          value={formData.sectioning_notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Mounting Notes</label>
        <p className="text-xs text-gray-500 mb-1">HTML supported: Use &lt;strong&gt;, &lt;br /&gt;, &lt;ul&gt;&lt;li&gt; for formatting</p>
        <textarea
          name="mounting_notes"
          rows={8}
          value={formData.mounting_notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Grinding Notes</label>
        <p className="text-xs text-gray-500 mb-1">HTML supported: Use &lt;strong&gt;, &lt;br /&gt;, &lt;ul&gt;&lt;li&gt; for formatting</p>
        <textarea
          name="grinding_notes"
          rows={12}
          value={formData.grinding_notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
        />
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Recommended Grinding Sequence</label>
          <input
            type="text"
            name="recommended_grinding_sequence"
            value={formData.recommended_grinding_sequence}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Comma-separated, e.g., 120, 240, 320, 400, 600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Polishing Notes</label>
        <p className="text-xs text-gray-500 mb-1">HTML supported: Use &lt;strong&gt;, &lt;br /&gt;, &lt;ul&gt;&lt;li&gt; for formatting</p>
        <textarea
          name="polishing_notes"
          rows={12}
          value={formData.polishing_notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
        />
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Recommended Polishing Sequence</label>
          <input
            type="text"
            name="recommended_polishing_sequence"
            value={formData.recommended_polishing_sequence}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Comma-separated, e.g., 9μm, 3μm, 1μm, 0.05μm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Etching Notes</label>
        <p className="text-xs text-gray-500 mb-1">HTML supported: Use &lt;strong&gt;, &lt;br /&gt;, &lt;ul&gt;&lt;li&gt; for formatting</p>
        <textarea
          name="etching_notes"
          rows={16}
          value={formData.etching_notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
        />
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Common Etchants</label>
          <input
            type="text"
            name="common_etchants"
            value={formData.common_etchants}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Comma-separated, e.g., Nital, Picral, Kroll's reagent"
          />
        </div>
      </div>
    </div>
  )

  const renderHeatTreatmentTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Heat Treatment</label>
        <textarea
          name="heat_treatment"
          rows={4}
          value={formData.heat_treatment}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Annealing Temperature (°C)</label>
          <input
            type="number"
            step="1"
            name="annealing_temperature_celsius"
            value={formData.annealing_temperature_celsius}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Solution Treatment Temp (°C)</label>
          <input
            type="number"
            step="1"
            name="solution_treatment_temp_celsius"
            value={formData.solution_treatment_temp_celsius}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Aging Temperature (°C)</label>
          <input
            type="number"
            step="1"
            name="aging_temperature_celsius"
            value={formData.aging_temperature_celsius}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  )

  const renderStandardsTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">ASTM Standards</label>
        <input
          type="text"
          name="astm_standards"
          value={formData.astm_standards}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Comma-separated, e.g., E3, E407, E112"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">ISO Standards</label>
        <input
          type="text"
          name="iso_standards"
          value={formData.iso_standards}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Comma-separated, e.g., ISO 643, ISO 6507"
        />
      </div>
    </div>
  )

  const renderApplicationsTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Applications</label>
        <textarea
          name="applications"
          rows={6}
          value={formData.applications}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="One per line or comma-separated"
        />
        <p className="mt-1 text-xs text-gray-500">Enter one application per line or separate with commas</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Typical Uses</label>
        <textarea
          name="typical_uses"
          rows={6}
          value={formData.typical_uses}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="One per line or comma-separated"
        />
        <p className="mt-1 text-xs text-gray-500">Enter one use per line or separate with commas</p>
      </div>
    </div>
  )

  const renderMetadataTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort Order</label>
          <input
            type="number"
            name="sort_order"
            value={formData.sort_order}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicTab()
      case 'properties':
        return renderPropertiesTab()
      case 'preparation':
        return renderPreparationTab()
      case 'heat-treatment':
        return renderHeatTreatmentTab()
      case 'standards':
        return renderStandardsTab()
      case 'applications':
        return renderApplicationsTab()
      case 'metadata':
        return renderMetadataTab()
      default:
        return renderBasicTab()
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/admin/materials')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {material ? `Editing ${material.name}` : 'Create New Material'}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 bg-gray-50">
              <nav className="flex space-x-1 overflow-x-auto px-4" aria-label="Tabs">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                        ${
                          isActive
                            ? 'border-primary-600 text-primary-600 bg-white'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-6">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              {renderTabContent()}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/admin/materials')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Material'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
