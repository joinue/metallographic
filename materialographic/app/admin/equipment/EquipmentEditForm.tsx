'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { Equipment, SubcategoryMetadata } from '@/lib/supabase'
import { getSubcategoriesForCategory } from '@/lib/supabase'
import { ArrowLeft, Save } from 'lucide-react'
import EquipmentImageManager from '@/components/equipment/EquipmentImageManager'

interface EquipmentEditFormProps {
  equipment: Equipment | null
}

const AUTOMATION_LEVELS = ['manual', 'semi-automated', 'automated'] as const
const STATUS_OPTIONS = ['active', 'discontinued', 'draft'] as const
const BUDGET_LEVELS = ['budget-conscious', 'standard', 'premium', 'enterprise'] as const

export default function EquipmentEditForm({ equipment }: EquipmentEditFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploadingBrochure, setUploadingBrochure] = useState(false)
  const brochureFileInputRef = useRef<HTMLInputElement>(null)
  const [subcategories, setSubcategories] = useState<SubcategoryMetadata[]>([])
  const [loadingSubcategories, setLoadingSubcategories] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  // Helper to get back URL with preserved filters
  const getBackUrl = () => {
    const params = new URLSearchParams()
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    if (search) params.set('search', search)
    if (status) params.set('status', status)
    const queryString = params.toString() ? `?${params.toString()}` : ''
    return `/admin/equipment${queryString}`
  }

  const [formData, setFormData] = useState({
    // Basic Information
    name: equipment?.name || '',
    item_id: equipment?.item_id || '',
    slug: equipment?.slug || '',
    description: equipment?.description || '',
    category: equipment?.category || 'sectioning',
    subcategory: equipment?.subcategory || '',
    
    // Product Attributes
    is_pace_product: equipment?.is_pace_product ?? true,
    product_url: equipment?.product_url || '',
    brochure_url: equipment?.brochure_url || '',
    image_url: equipment?.image_url || '',
    images: equipment?.images ? JSON.stringify(equipment.images, null, 2) : '[]',
    
    // Technical Specifications (loaded from category-specific tables)
    blade_size_mm: '',
    blade_size_inches: '',
    automation_level: '',
    wheel_size_inches: '',
    max_cutting_capacity_mm: '',
    max_cutting_capacity_inches: '',
    
    // Suitability Attributes
    suitable_for_material_types: equipment?.suitable_for_material_types?.join(', ') || '',
    suitable_for_hardness: equipment?.suitable_for_hardness?.join(', ') || '',
    suitable_for_sample_sizes: equipment?.suitable_for_sample_sizes?.join(', ') || '',
    suitable_for_sample_shapes: equipment?.suitable_for_sample_shapes?.join(', ') || '',
    suitable_for_throughput: equipment?.suitable_for_throughput?.join(', ') || '',
    suitable_for_applications: equipment?.suitable_for_applications?.join(', ') || '',
    min_budget_level: equipment?.min_budget_level || '',
    
    // Metadata
    tags: equipment?.tags?.join(', ') || '',
    status: equipment?.status || 'draft',
    sort_order: equipment?.sort_order?.toString() || '0',
  })

  // Load categories from database
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true)
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('equipment')
          .select('category')
          .not('category', 'is', null)

        if (error) throw error

        // Get unique categories and sort them
        const uniqueCategories = Array.from(new Set(data?.map(item => item.category).filter(Boolean) || []))
          .sort((a, b) => a.localeCompare(b))
        
        // If editing and equipment has a category not in the list, add it
        if (equipment?.category && !uniqueCategories.includes(equipment.category)) {
          uniqueCategories.push(equipment.category)
          uniqueCategories.sort((a, b) => a.localeCompare(b))
        }
        
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error loading categories:', error)
        // Fallback to default categories if loading fails
        const fallback = ['sectioning', 'mounting', 'grinding-polishing', 'microscopy', 'hardness-testing', 'lab-furniture']
        // Add equipment category if it exists and isn't in fallback
        if (equipment?.category && !fallback.includes(equipment.category)) {
          fallback.push(equipment.category)
          fallback.sort((a, b) => a.localeCompare(b))
        }
        setCategories(fallback)
      } finally {
        setLoadingCategories(false)
      }
    }

    loadCategories()
  }, [equipment?.category])

  // Auto-generate slug from name
  useEffect(() => {
    if (!equipment && formData.name && !formData.slug) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name, equipment])

  // Load subcategories when category changes
  useEffect(() => {
    const loadSubcategories = async () => {
      if (!formData.category) {
        setSubcategories([])
        return
      }

      setLoadingSubcategories(true)
      try {
        const subcats = await getSubcategoriesForCategory(formData.category, 'equipment')
        setSubcategories(subcats)
        
        // If current subcategory is not in the list, clear it
        if (formData.subcategory && !subcats.find(s => s.subcategory_key === formData.subcategory)) {
          setFormData(prev => ({ ...prev, subcategory: '' }))
        }
      } catch (error) {
        console.error('Error loading subcategories:', error)
        setSubcategories([])
      } finally {
        setLoadingSubcategories(false)
      }
    }

    loadSubcategories()
  }, [formData.category])

  // Load category-specific data when editing
  useEffect(() => {
    const loadCategoryData = async () => {
      if (!equipment?.id || !equipment.category) return

      try {
        const supabase = createClient()
        const categoryTableMap: Record<string, string> = {
          'sectioning': 'equipment_sectioning',
          'mounting': 'equipment_mounting',
          'grinding-polishing': 'equipment_grinding_polishing',
          'microscopy': 'equipment_microscopy',
          'hardness-testing': 'equipment_hardness_testing',
          'lab-furniture': 'equipment_lab_furniture',
        }

        const table = categoryTableMap[equipment.category]
        if (!table) return

        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('equipment_id', equipment.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading category data:', error)
          return
        }

        if (data) {
          // Merge category-specific data into formData
          const categoryData: any = {}
          
          // Handle all fields, converting arrays/objects to strings for form inputs
          Object.keys(data).forEach(key => {
            if (key === 'equipment_id' || key === 'created_at' || key === 'updated_at') return
            
            const value = data[key]
            if (Array.isArray(value)) {
              categoryData[key] = value.join(', ')
            } else if (typeof value === 'object' && value !== null) {
              categoryData[key] = JSON.stringify(value, null, 2)
            } else if (typeof value === 'boolean') {
              categoryData[key] = value
            } else {
              categoryData[key] = value?.toString() || ''
            }
          })

          setFormData(prev => ({ ...prev, ...categoryData }))
        }
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }

    loadCategoryData()
  }, [equipment?.id, equipment?.category])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  // Helper to get additional images array
  const getAdditionalImages = (): Array<{ url: string; alt?: string; caption?: string }> => {
    try {
      const parsed = JSON.parse(formData.images || '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  // Helper to update additional images
  const updateAdditionalImages = (images: Array<{ url: string; alt?: string; caption?: string }>) => {
    setFormData(prev => ({ ...prev, images: JSON.stringify(images, null, 2) }))
  }

  // Handle brochure upload
  const handleBrochureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file')
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('Brochure size must be less than 50MB')
      return
    }

    setUploadingBrochure(true)
    setError('')

    try {
      const supabase = createClient()
      
      // Verify user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to upload brochures')
      }

      // Generate storage path - use item_id for cleaner structure
      const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      
      // Use item_id as the filename for cleaner URLs
      const itemId = formData.item_id?.toLowerCase() || formData.slug || 'unknown'
      const cleanItemId = sanitize(itemId)
      const filePath = `${cleanItemId}.pdf`
      
      // Check if file already exists and delete it first (upsert behavior)
      const { data: existingFiles } = await supabase.storage
        .from('brochures')
        .list('', {
          search: cleanItemId
        })
      
      if (existingFiles && existingFiles.length > 0) {
        // Delete existing brochure with same item_id
        const filesToDelete = existingFiles
          .filter(f => f.name.startsWith(cleanItemId) && f.name.endsWith('.pdf'))
          .map(f => f.name)
        
        if (filesToDelete.length > 0) {
          await supabase.storage
            .from('brochures')
            .remove(filesToDelete)
        }
      }

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('brochures')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brochures')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, brochure_url: publicUrl }))
    } catch (error: any) {
      console.error('Error uploading brochure:', error)
      setError(error.message || 'Failed to upload brochure. Please try again.')
    } finally {
      setUploadingBrochure(false)
      if (brochureFileInputRef.current) {
        brochureFileInputRef.current.value = ''
      }
    }
  }

  // Handle brochure deletion
  const handleBrochureDelete = async () => {
    if (!formData.brochure_url) return

    try {
      const supabase = createClient()
      
      // Extract path from URL
      const url = new URL(formData.brochure_url)
      const pathParts = url.pathname.split('/')
      const pathIndex = pathParts.findIndex(part => part === 'brochures')
      if (pathIndex === -1) {
        throw new Error('Invalid brochure URL')
      }
      const filePath = pathParts.slice(pathIndex + 1).join('/')

      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('brochures')
        .remove([filePath])

      if (deleteError) {
        throw deleteError
      }

      setFormData(prev => ({ ...prev, brochure_url: '' }))
    } catch (error: any) {
      console.error('Error deleting brochure:', error)
      setError(error.message || 'Failed to delete brochure. Please try again.')
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
      const parseJSONB = (val: string) => {
        if (!val || !val.trim()) return null
        try {
          const parsed = JSON.parse(val)
          return typeof parsed === 'object' && parsed !== null ? parsed : null
        } catch {
          return null
        }
      }
      const parseArray = (val: string) => {
        if (!val || !val.trim()) return null
        const arr = val.split(',').map(s => s.trim()).filter(Boolean)
        return arr.length > 0 ? arr : null
      }
      const parseNumberArray = (val: string) => {
        if (!val || !val.trim()) return null
        const arr = val.split(',').map(s => {
          const num = parseFloat(s.trim())
          return isNaN(num) ? null : num
        }).filter(n => n !== null) as number[]
        return arr.length > 0 ? arr : null
      }
      const parseBoolean = (val: string | boolean | undefined) => {
        if (typeof val === 'boolean') return val
        if (typeof val === 'string') {
          if (val.toLowerCase() === 'true' || val === '1') return true
          if (val.toLowerCase() === 'false' || val === '0' || val === '') return false
        }
        return null
      }

      // Prepare base equipment data (common fields only)
      const baseEquipmentData: any = {
        name: formData.name,
        item_id: formData.item_id || null,
        slug: formData.slug || null,
        description: formData.description || null,
        category: formData.category,
        subcategory: formData.subcategory || null,
        is_pace_product: formData.is_pace_product,
        product_url: formData.product_url || null,
        brochure_url: formData.brochure_url || null,
        image_url: formData.image_url || null,
        images: (() => {
          try {
            const parsed = JSON.parse(formData.images || '[]')
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : null
          } catch {
            return null
          }
        })(),
        
        // Suitability Attributes
        suitable_for_material_types: formData.suitable_for_material_types
          ? formData.suitable_for_material_types.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        suitable_for_hardness: formData.suitable_for_hardness
          ? formData.suitable_for_hardness.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        suitable_for_sample_sizes: formData.suitable_for_sample_sizes
          ? formData.suitable_for_sample_sizes.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        suitable_for_sample_shapes: formData.suitable_for_sample_shapes
          ? formData.suitable_for_sample_shapes.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        suitable_for_throughput: formData.suitable_for_throughput
          ? formData.suitable_for_throughput.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        suitable_for_applications: formData.suitable_for_applications
          ? formData.suitable_for_applications.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        min_budget_level: formData.min_budget_level || null,
        
        // Metadata
        tags: formData.tags
          ? formData.tags.split(',').map(s => s.trim()).filter(Boolean)
          : null,
        status: formData.status,
        sort_order: toInt(formData.sort_order) || 0,
      }

      // Remove null values for arrays
      Object.keys(baseEquipmentData).forEach(key => {
        if (Array.isArray(baseEquipmentData[key]) && baseEquipmentData[key].length === 0) {
          baseEquipmentData[key] = null
        }
      })

      // Prepare category-specific data based on category
      let categorySpecificData: any = null
      let categoryTable: string | null = null

      if (formData.category === 'sectioning') {
        categoryTable = 'equipment_sectioning'
        categorySpecificData = {
          blade_size_mm: toInt((formData as any).blade_size_mm),
          blade_size_inches: toInt((formData as any).blade_size_inches),
          blade_type: (formData as any).blade_type || null,
          max_cutting_capacity_mm: toFloat((formData as any).max_cutting_capacity_mm),
          max_cutting_capacity_inches: toFloat((formData as any).max_cutting_capacity_inches),
          automation_level: (formData as any).automation_level || null,
          cutting_speed_rpm: toInt((formData as any).cutting_speed_rpm),
          feed_rate_mm_per_min: toFloat((formData as any).feed_rate_mm_per_min),
          cooling_system: (formData as any).cooling_system || null,
          sample_holder_type: (formData as any).sample_holder_type || null,
          precision_level: (formData as any).precision_level || null,
          motor_power_watts: toInt((formData as any).motor_power_watts),
          dimensions_mm: parseJSONB((formData as any).dimensions_mm),
          weight_kg: toFloat((formData as any).weight_kg),
        }
      } else if (formData.category === 'grinding-polishing') {
        categoryTable = 'equipment_grinding_polishing'
        categorySpecificData = {
          wheel_size_inches: parseNumberArray((formData as any).wheel_size_inches),
          platen_material: (formData as any).platen_material || null,
          number_of_stations: toInt((formData as any).number_of_stations),
          automation_level: (formData as any).automation_level || null,
          speed_range_rpm: (formData as any).speed_range_rpm || null,
          force_range_n: parseNumberArray((formData as any).force_range_n),
          programmable_force: parseBoolean((formData as any).programmable_force),
          cooling_system: (formData as any).cooling_system || null,
          sample_holder_type: (formData as any).sample_holder_type || null,
          controlled_removal: parseBoolean((formData as any).controlled_removal),
          motor_power_watts: toInt((formData as any).motor_power_watts),
          dimensions_mm: parseJSONB((formData as any).dimensions_mm),
          weight_kg: toFloat((formData as any).weight_kg),
        }
      } else if (formData.category === 'mounting') {
        categoryTable = 'equipment_mounting'
        categorySpecificData = {
          mounting_type: (formData as any).mounting_type || null,
          max_pressure_psi: toFloat((formData as any).max_pressure_psi),
          max_pressure_mpa: toFloat((formData as any).max_pressure_mpa),
          pressure_range_psi: (formData as any).pressure_range_psi || null,
          max_temperature_celsius: toFloat((formData as any).max_temperature_celsius),
          min_temperature_celsius: toFloat((formData as any).min_temperature_celsius),
          heating_capability: parseBoolean((formData as any).heating_capability),
          cooling_capability: parseBoolean((formData as any).cooling_capability),
          chamber_size_mm: parseJSONB((formData as any).chamber_size_mm),
          max_sample_size_mm: parseJSONB((formData as any).max_sample_size_mm),
          vacuum_level_mbar: toFloat((formData as any).vacuum_level_mbar),
          vacuum_pump_required: parseBoolean((formData as any).vacuum_pump_required),
          programmable_cycles: parseBoolean((formData as any).programmable_cycles),
          digital_controls: parseBoolean((formData as any).digital_controls),
          safety_features: parseArray((formData as any).safety_features),
          power_consumption_watts: toInt((formData as any).power_consumption_watts),
          dimensions_mm: parseJSONB((formData as any).dimensions_mm),
          weight_kg: toFloat((formData as any).weight_kg),
        }
      } else if (formData.category === 'microscopy') {
        categoryTable = 'equipment_microscopy'
        categorySpecificData = {
          microscope_type: (formData as any).microscope_type || null,
          magnification_range: (formData as any).magnification_range || null,
          objective_lenses: parseArray((formData as any).objective_lenses),
          eyepiece_magnification: (formData as any).eyepiece_magnification || null,
          camera_resolution: (formData as any).camera_resolution || null,
          image_analysis_capable: parseBoolean((formData as any).image_analysis_capable),
          measurement_capabilities: parseArray((formData as any).measurement_capabilities),
          illumination_type: parseArray((formData as any).illumination_type),
          light_source: (formData as any).light_source || null,
          motorized_stage: parseBoolean((formData as any).motorized_stage),
          z_stack_capability: parseBoolean((formData as any).z_stack_capability),
          live_measurement: parseBoolean((formData as any).live_measurement),
          dimensions_mm: parseJSONB((formData as any).dimensions_mm),
          weight_kg: toFloat((formData as any).weight_kg),
        }
      } else if (formData.category === 'hardness-testing') {
        categoryTable = 'equipment_hardness_testing'
        categorySpecificData = {
          test_methods: parseArray((formData as any).test_methods),
          load_range_n: parseNumberArray((formData as any).load_range_n),
          load_range_kgf: parseNumberArray((formData as any).load_range_kgf),
          selectable_loads: parseArray((formData as any).selectable_loads),
          max_indentation_depth_mm: toFloat((formData as any).max_indentation_depth_mm),
          indenter_types: parseArray((formData as any).indenter_types),
          automation_level: (formData as any).automation_level || null,
          automatic_loading: parseBoolean((formData as any).automatic_loading),
          data_export_capabilities: parseArray((formData as any).data_export_capabilities),
          measurement_accuracy: (formData as any).measurement_accuracy || null,
          digital_display: parseBoolean((formData as any).digital_display),
          dimensions_mm: parseJSONB((formData as any).dimensions_mm),
          weight_kg: toFloat((formData as any).weight_kg),
        }
      } else if (formData.category === 'lab-furniture') {
        categoryTable = 'equipment_lab_furniture'
        categorySpecificData = {
          furniture_type: (formData as any).furniture_type || null,
          dimensions_mm: parseJSONB((formData as any).dimensions_mm),
          work_surface_area_m2: toFloat((formData as any).work_surface_area_m2),
          material: (formData as any).material || null,
          surface_material: (formData as any).surface_material || null,
          weight_capacity_kg: toFloat((formData as any).weight_capacity_kg),
          storage_capacity: (formData as any).storage_capacity || null,
          ventilation_required: parseBoolean((formData as any).ventilation_required),
          electrical_outlets: toInt((formData as any).electrical_outlets),
          drawers: toInt((formData as any).drawers),
          shelves: toInt((formData as any).shelves),
          locking_mechanism: parseBoolean((formData as any).locking_mechanism),
          safety_features: parseArray((formData as any).safety_features),
          weight_kg: toFloat((formData as any).weight_kg),
        }
      }

      // Remove null/undefined values from categorySpecificData
      if (categorySpecificData) {
        Object.keys(categorySpecificData).forEach(key => {
          if (categorySpecificData[key] === null || categorySpecificData[key] === undefined) {
            delete categorySpecificData[key]
          }
        })
      }

      let equipmentId: string

      if (equipment) {
        // Update existing equipment
        const { data: updateData, error: updateError } = await supabase
          .from('equipment')
          .update(baseEquipmentData)
          .eq('id', equipment.id)
          .select()
          .single()

        if (updateError) {
          console.error('Update error details:', updateError)
          throw new Error(updateError.message || 'Failed to update equipment')
        }
        
        equipmentId = equipment.id
        console.log('Equipment updated successfully:', updateData)

        // Update category-specific data if table exists
        if (categoryTable && categorySpecificData) {
          const { error: categoryError } = await supabase
            .from(categoryTable)
            .upsert({
              equipment_id: equipmentId,
              ...categorySpecificData,
            }, {
              onConflict: 'equipment_id'
            })

          if (categoryError) {
            console.error('Category update error:', categoryError)
            throw new Error(`Failed to update ${categoryTable}: ${categoryError.message}`)
          }
        }
      } else {
        // Create new equipment
        const { data: insertData, error: insertError } = await supabase
          .from('equipment')
          .insert(baseEquipmentData)
          .select()
          .single()

        if (insertError) {
          console.error('Insert error details:', insertError)
          throw new Error(insertError.message || 'Failed to create equipment')
        }
        
        equipmentId = insertData.id
        console.log('Equipment created successfully:', insertData)

        // Create category-specific record if table exists
        if (categoryTable && categorySpecificData) {
          const { error: categoryError } = await supabase
            .from(categoryTable)
            .insert({
              equipment_id: equipmentId,
              ...categorySpecificData,
            })

          if (categoryError) {
            // Rollback: delete the equipment record if category insert fails
            console.error('Category insert error:', categoryError)
            await supabase.from('equipment').delete().eq('id', equipmentId)
            throw new Error(`Failed to create ${categoryTable}: ${categoryError.message}`)
          }
        }
      }

      router.push(getBackUrl())
      router.refresh()
    } catch (err: any) {
      console.error('Error saving equipment:', err)
      const errorMessage = err.message || err.error?.message || 'Failed to save equipment. Please check your permissions and try again.'
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
            onClick={() => router.push(getBackUrl())}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Equipment
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {equipment ? 'Edit Equipment' : 'Add New Equipment'}
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
                  placeholder="e.g., MEGA-T300A"
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
                  disabled={loadingCategories}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {loadingCategories ? (
                    <option>Loading categories...</option>
                  ) : categories.length > 0 ? (
                    categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))
                  ) : (
                    <option value="">No categories found</option>
                  )}
                </select>
                {!loadingCategories && categories.length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    No categories found. Equipment will be created with the selected category.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  disabled={loadingSubcategories}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select a subcategory (optional)</option>
                  {subcategories.map(subcat => (
                    <option key={subcat.id} value={subcat.subcategory_key}>
                      {subcat.subcategory_label}
                    </option>
                  ))}
                </select>
                {loadingSubcategories && (
                  <p className="text-xs text-gray-500 mt-1">Loading subcategories...</p>
                )}
                {!loadingSubcategories && subcategories.length === 0 && formData.category && (
                  <p className="text-xs text-gray-500 mt-1">
                    No subcategories configured for this category. <a href="/admin/equipment/configuration" className="text-primary-600 hover:underline">Configure subcategories</a>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Automation Level</label>
                <select
                  name="automation_level"
                  value={formData.automation_level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="">Select...</option>
                  {AUTOMATION_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
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

          {/* Image Management */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Images</h2>
            <EquipmentImageManager
              primaryImageUrl={formData.image_url}
              additionalImages={getAdditionalImages()}
              onPrimaryImageChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              onAdditionalImagesChange={updateAdditionalImages}
              category={formData.category}
              subcategory={formData.subcategory}
              itemId={formData.item_id}
              itemSlug={formData.slug}
            />
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Brochure (PDF)</label>
              <div className="space-y-2">
                {formData.brochure_url ? (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <a
                        href={formData.brochure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 truncate block"
                      >
                        {formData.brochure_url.split('/').pop() || 'View Brochure'}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleBrochureDelete}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={brochureFileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleBrochureUpload}
                      disabled={uploadingBrochure}
                      className="hidden"
                      id="brochure-upload"
                    />
                    <label
                      htmlFor="brochure-upload"
                      className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer ${
                        uploadingBrochure
                          ? 'bg-gray-100 cursor-not-allowed opacity-50'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      {uploadingBrochure ? 'Uploading...' : 'Upload Brochure PDF'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Maximum file size: 50MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Category-Specific Technical Specifications */}
          {formData.category && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                {formData.category === 'sectioning' && 'Sectioning Specifications'}
                {formData.category === 'mounting' && 'Mounting Specifications'}
                {formData.category === 'grinding-polishing' && 'Grinding & Polishing Specifications'}
                {formData.category === 'microscopy' && 'Microscopy Specifications'}
                {formData.category === 'hardness-testing' && 'Hardness Testing Specifications'}
                {formData.category === 'lab-furniture' && 'Lab Furniture Specifications'}
                {!['sectioning', 'mounting', 'grinding-polishing', 'microscopy', 'hardness-testing', 'lab-furniture'].includes(formData.category) && 'Technical Specifications'}
              </h2>
              
              {/* Sectioning Equipment Fields */}
              {formData.category === 'sectioning' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blade Size (mm)</label>
                    <input
                      type="number"
                      name="blade_size_mm"
                      value={(formData as any).blade_size_mm || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 250, 300, 350, 400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blade Size (inches)</label>
                    <input
                      type="number"
                      name="blade_size_inches"
                      value={(formData as any).blade_size_inches || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 10, 12, 14, 16"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blade Type</label>
                    <input
                      type="text"
                      name="blade_type"
                      value={(formData as any).blade_type || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., abrasive, diamond, silicon-carbide"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Cutting Capacity (mm)</label>
                    <input
                      type="number"
                      name="max_cutting_capacity_mm"
                      value={(formData as any).max_cutting_capacity_mm || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Maximum sample size"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Cutting Capacity (inches)</label>
                    <input
                      type="number"
                      name="max_cutting_capacity_inches"
                      value={(formData as any).max_cutting_capacity_inches || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Maximum sample size"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Automation Level</label>
                    <select
                      name="automation_level"
                      value={(formData as any).automation_level || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="">Select...</option>
                      {AUTOMATION_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cutting Speed (RPM)</label>
                    <input
                      type="number"
                      name="cutting_speed_rpm"
                      value={(formData as any).cutting_speed_rpm || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feed Rate (mm/min)</label>
                    <input
                      type="number"
                      name="feed_rate_mm_per_min"
                      value={(formData as any).feed_rate_mm_per_min || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cooling System</label>
                    <input
                      type="text"
                      name="cooling_system"
                      value={(formData as any).cooling_system || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., water, air, none, recirculating"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Holder Type</label>
                    <input
                      type="text"
                      name="sample_holder_type"
                      value={(formData as any).sample_holder_type || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., vice, fixture, table"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precision Level</label>
                    <input
                      type="text"
                      name="precision_level"
                      value={(formData as any).precision_level || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., standard, precision, ultra-precision"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motor Power (Watts)</label>
                    <input
                      type="number"
                      name="motor_power_watts"
                      value={(formData as any).motor_power_watts || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (mm) - JSON</label>
                    <textarea
                      name="dimensions_mm"
                      value={(formData as any).dimensions_mm || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-xs"
                      placeholder='{"width": 500, "height": 400, "depth": 300}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="weight_kg"
                      value={(formData as any).weight_kg || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Grinding & Polishing Equipment Fields */}
              {formData.category === 'grinding-polishing' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wheel Size (inches)</label>
                    <input
                      type="text"
                      name="wheel_size_inches"
                      value={(formData as any).wheel_size_inches || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., 8, 10 or 12, 14"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter multiple sizes separated by commas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platen Material</label>
                    <input
                      type="text"
                      name="platen_material"
                      value={(formData as any).platen_material || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., cast-iron, stainless-steel, composite"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Stations</label>
                    <input
                      type="number"
                      name="number_of_stations"
                      value={(formData as any).number_of_stations || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Automation Level</label>
                    <select
                      name="automation_level"
                      value={(formData as any).automation_level || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="">Select...</option>
                      {AUTOMATION_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speed Range (RPM)</label>
                    <input
                      type="text"
                      name="speed_range_rpm"
                      value={(formData as any).speed_range_rpm || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 50-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Force Range (N)</label>
                    <input
                      type="text"
                      name="force_range_n"
                      value={(formData as any).force_range_n || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., 10, 100"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="programmable_force"
                        checked={(formData as any).programmable_force || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Programmable Force</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cooling System</label>
                    <input
                      type="text"
                      name="cooling_system"
                      value={(formData as any).cooling_system || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., water, air, none, recirculating"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Holder Type</label>
                    <input
                      type="text"
                      name="sample_holder_type"
                      value={(formData as any).sample_holder_type || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., manual, fixture, automated-head"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="controlled_removal"
                        checked={(formData as any).controlled_removal || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Controlled Removal</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motor Power (Watts)</label>
                    <input
                      type="number"
                      name="motor_power_watts"
                      value={(formData as any).motor_power_watts || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (mm) - JSON</label>
                    <textarea
                      name="dimensions_mm"
                      value={(formData as any).dimensions_mm || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-xs"
                      placeholder='{"width": 500, "height": 400, "depth": 300}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="weight_kg"
                      value={(formData as any).weight_kg || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Mounting Equipment Fields */}
              {formData.category === 'mounting' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mounting Type</label>
                    <input
                      type="text"
                      name="mounting_type"
                      value={(formData as any).mounting_type || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., compression, castable, vacuum, pressure"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Pressure (PSI)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="max_pressure_psi"
                      value={(formData as any).max_pressure_psi || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Pressure (MPa)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="max_pressure_mpa"
                      value={(formData as any).max_pressure_mpa || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pressure Range (PSI)</label>
                    <input
                      type="text"
                      name="pressure_range_psi"
                      value={(formData as any).pressure_range_psi || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 0-3000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Temperature (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="max_temperature_celsius"
                      value={(formData as any).max_temperature_celsius || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Temperature (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="min_temperature_celsius"
                      value={(formData as any).min_temperature_celsius || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="heating_capability"
                        checked={(formData as any).heating_capability || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Heating Capability</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="cooling_capability"
                        checked={(formData as any).cooling_capability || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Cooling Capability</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chamber Size (mm) - JSON</label>
                    <textarea
                      name="chamber_size_mm"
                      value={(formData as any).chamber_size_mm || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-xs"
                      placeholder='{"width": 100, "height": 100, "depth": 100} or {"diameter": 100, "height": 100}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Sample Size (mm) - JSON</label>
                    <textarea
                      name="max_sample_size_mm"
                      value={(formData as any).max_sample_size_mm || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-xs"
                      placeholder='{"width": 50, "height": 50, "depth": 50}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vacuum Level (mbar)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="vacuum_level_mbar"
                      value={(formData as any).vacuum_level_mbar || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="vacuum_pump_required"
                        checked={(formData as any).vacuum_pump_required || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Vacuum Pump Required</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="programmable_cycles"
                        checked={(formData as any).programmable_cycles || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Programmable Cycles</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="digital_controls"
                        checked={(formData as any).digital_controls || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Digital Controls</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Safety Features</label>
                    <input
                      type="text"
                      name="safety_features"
                      value={(formData as any).safety_features || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., over-pressure-protection, temperature-limit"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Power Consumption (Watts)</label>
                    <input
                      type="number"
                      name="power_consumption_watts"
                      value={(formData as any).power_consumption_watts || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (mm) - JSON</label>
                    <textarea
                      name="dimensions_mm"
                      value={(formData as any).dimensions_mm || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-xs"
                      placeholder='{"width": 500, "height": 400, "depth": 300}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="weight_kg"
                      value={(formData as any).weight_kg || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Microscopy Equipment Fields */}
              {formData.category === 'microscopy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Microscope Type</label>
                    <input
                      type="text"
                      name="microscope_type"
                      value={(formData as any).microscope_type || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., metallurgical, stereo, digital, inverted"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Magnification Range</label>
                    <input
                      type="text"
                      name="magnification_range"
                      value={(formData as any).magnification_range || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 10x-1000x"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Objective Lenses</label>
                    <input
                      type="text"
                      name="objective_lenses"
                      value={(formData as any).objective_lenses || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., 5x, 10x, 20x, 50x, 100x"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eyepiece Magnification</label>
                    <input
                      type="text"
                      name="eyepiece_magnification"
                      value={(formData as any).eyepiece_magnification || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 10x, 15x"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Camera Resolution</label>
                    <input
                      type="text"
                      name="camera_resolution"
                      value={(formData as any).camera_resolution || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 5MP, 12MP"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="image_analysis_capable"
                        checked={(formData as any).image_analysis_capable || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Image Analysis Capable</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Measurement Capabilities</label>
                    <input
                      type="text"
                      name="measurement_capabilities"
                      value={(formData as any).measurement_capabilities || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., length, area, grain-size, phase-fraction"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Illumination Types</label>
                    <input
                      type="text"
                      name="illumination_type"
                      value={(formData as any).illumination_type || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., brightfield, darkfield, polarized, DIC"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Light Source</label>
                    <input
                      type="text"
                      name="light_source"
                      value={(formData as any).light_source || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., LED, halogen, xenon, LED+halogen"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="motorized_stage"
                        checked={(formData as any).motorized_stage || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Motorized Stage</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="z_stack_capability"
                        checked={(formData as any).z_stack_capability || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Z-Stack Capability</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="live_measurement"
                        checked={(formData as any).live_measurement || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Live Measurement</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (mm) - JSON</label>
                    <textarea
                      name="dimensions_mm"
                      value={(formData as any).dimensions_mm || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-xs"
                      placeholder='{"width": 500, "height": 400, "depth": 300}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="weight_kg"
                      value={(formData as any).weight_kg || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Hardness Testing Equipment Fields */}
              {formData.category === 'hardness-testing' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Methods</label>
                    <input
                      type="text"
                      name="test_methods"
                      value={(formData as any).test_methods || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., rockwell, brinell, vickers, knoop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Load Range (N)</label>
                    <input
                      type="text"
                      name="load_range_n"
                      value={(formData as any).load_range_n || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., 10, 1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Load Range (kgf)</label>
                    <input
                      type="text"
                      name="load_range_kgf"
                      value={(formData as any).load_range_kgf || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., 1, 100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selectable Loads</label>
                    <input
                      type="text"
                      name="selectable_loads"
                      value={(formData as any).selectable_loads || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated load values"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Indentation Depth (mm)</label>
                    <input
                      type="number"
                      step="0.001"
                      name="max_indentation_depth_mm"
                      value={(formData as any).max_indentation_depth_mm || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Indenter Types</label>
                    <input
                      type="text"
                      name="indenter_types"
                      value={(formData as any).indenter_types || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., diamond-cone, steel-ball, diamond-pyramid"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Automation Level</label>
                    <select
                      name="automation_level"
                      value={(formData as any).automation_level || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="">Select...</option>
                      {AUTOMATION_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="automatic_loading"
                        checked={(formData as any).automatic_loading || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Automatic Loading</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Export Capabilities</label>
                    <input
                      type="text"
                      name="data_export_capabilities"
                      value={(formData as any).data_export_capabilities || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., usb, network, printer, software"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Measurement Accuracy</label>
                    <input
                      type="text"
                      name="measurement_accuracy"
                      value={(formData as any).measurement_accuracy || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., high, standard"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="digital_display"
                        checked={(formData as any).digital_display !== false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Digital Display</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (mm) - JSON</label>
                    <textarea
                      name="dimensions_mm"
                      value={(formData as any).dimensions_mm || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-xs"
                      placeholder='{"width": 500, "height": 400, "depth": 300}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="weight_kg"
                      value={(formData as any).weight_kg || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Lab Furniture Fields */}
              {formData.category === 'lab-furniture' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Furniture Type</label>
                    <input
                      type="text"
                      name="furniture_type"
                      value={(formData as any).furniture_type || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., bench, cabinet, fume-hood, storage, workstation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (mm) - JSON</label>
                    <textarea
                      name="dimensions_mm"
                      value={(formData as any).dimensions_mm || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-xs"
                      placeholder='{"width": 1500, "height": 800, "depth": 600}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Surface Area (m²)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="work_surface_area_m2"
                      value={(formData as any).work_surface_area_m2 || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                    <input
                      type="text"
                      name="material"
                      value={(formData as any).material || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., steel, stainless-steel, wood, composite"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Surface Material</label>
                    <input
                      type="text"
                      name="surface_material"
                      value={(formData as any).surface_material || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., epoxy, stainless-steel, laminate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight Capacity (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="weight_capacity_kg"
                      value={(formData as any).weight_capacity_kg || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Storage Capacity</label>
                    <input
                      type="text"
                      name="storage_capacity"
                      value={(formData as any).storage_capacity || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Description of storage space"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="ventilation_required"
                        checked={(formData as any).ventilation_required || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Ventilation Required</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Electrical Outlets</label>
                    <input
                      type="number"
                      name="electrical_outlets"
                      value={(formData as any).electrical_outlets || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Drawers</label>
                    <input
                      type="number"
                      name="drawers"
                      value={(formData as any).drawers || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shelves</label>
                    <input
                      type="number"
                      name="shelves"
                      value={(formData as any).shelves || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="locking_mechanism"
                        checked={(formData as any).locking_mechanism || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Locking Mechanism</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Safety Features</label>
                    <input
                      type="text"
                      name="safety_features"
                      value={(formData as any).safety_features || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Comma-separated, e.g., fire-resistant, chemical-resistant"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="weight_kg"
                      value={(formData as any).weight_kg || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Sample Sizes</label>
                <input
                  type="text"
                  name="suitable_for_sample_sizes"
                  value={formData.suitable_for_sample_sizes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Comma-separated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sample Shapes</label>
                <input
                  type="text"
                  name="suitable_for_sample_shapes"
                  value={formData.suitable_for_sample_shapes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Comma-separated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Throughput</label>
                <input
                  type="text"
                  name="suitable_for_throughput"
                  value={formData.suitable_for_throughput}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Comma-separated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applications</label>
                <input
                  type="text"
                  name="suitable_for_applications"
                  value={formData.suitable_for_applications}
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
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => router.push(getBackUrl())}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

