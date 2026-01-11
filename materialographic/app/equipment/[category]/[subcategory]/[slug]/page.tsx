'use client'

import Link from 'next/link'
import Image from 'next/image'
import { use, useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase-client'
import { getSubcategoryMetadata } from '@/lib/supabase'
import type { SubcategoryMetadata, Equipment, EquipmentWithDetails } from '@/lib/supabase'
import { ChevronRight, ArrowLeft, X, ChevronLeft, ShoppingBag, ExternalLink, Package, Edit2, Save } from 'lucide-react'
import { getEquipmentImageUrl, getBrochureUrl } from '@/lib/storage'
import LoadingSpinner from '@/components/LoadingSpinner'
import { generateProductSchema } from '@/lib/product-schema'
import YouTubeVideo from '@/components/YouTubeVideo'
import SectioningSpecs from '@/components/equipment/SectioningSpecs'
import MountingSpecs from '@/components/equipment/MountingSpecs'
import GrindingPolishingSpecs from '@/components/equipment/GrindingPolishingSpecs'
import MicroscopySpecs from '@/components/equipment/MicroscopySpecs'
import HardnessTestingSpecs from '@/components/equipment/HardnessTestingSpecs'
import LabFurnitureSpecs from '@/components/equipment/LabFurnitureSpecs'
import EquipmentImageManager from '@/components/equipment/EquipmentImageManager'

const categoryLabels: Record<string, string> = {
  'sectioning': 'Sectioning',
  'mounting': 'Mounting',
  'grinding-polishing': 'Grinding & Polishing',
  'microscopy': 'Microscopy',
  'hardness-testing': 'Hardness Testing',
  'lab-furniture': 'Lab Furniture',
}

// Map equipment category to consumable category
function mapEquipmentCategoryToConsumableCategory(eqCategory: string): string {
  const mapping: Record<string, string> = {
    'sectioning': 'sectioning',
    'mounting': 'mounting',
    'grinding-polishing': 'grinding-lapping', // or 'polishing' depending on equipment type
    'microscopy': 'cleaning', // Microscopy might need cleaning supplies
    'hardness-testing': 'hardness-testing',
    'lab-furniture': 'cleaning'
  }
  return mapping[eqCategory] || eqCategory
}

// Get relevant consumable categories for equipment
function getRelevantConsumableCategories(
  equipmentCategory: string,
  equipmentSubcategory?: string
): Array<{ name: string; url: string }> {
  const categories: Array<{ name: string; url: string }> = []
  const baseUrl = 'https://shop.metallographic.com/collections'
  
  if (equipmentCategory === 'sectioning') {
    const subcategoryLower = equipmentSubcategory?.toLowerCase() || ''
    if (subcategoryLower.includes('precision') || subcategoryLower.includes('wafering')) {
      categories.push({ name: 'Precision Wafering Blades', url: `${baseUrl}/precision-cutting-blades` })
    } else {
      categories.push({ name: 'Abrasive Blades', url: `${baseUrl}/abrasive-blades` })
    }
  } else if (equipmentCategory === 'mounting') {
    const subcategoryLower = equipmentSubcategory?.toLowerCase() || ''
    if (subcategoryLower.includes('compression') || subcategoryLower.includes('hot')) {
      categories.push({ name: 'Compression Mounting', url: `${baseUrl}/compression-mounting` })
    } else if (subcategoryLower.includes('castable') || subcategoryLower.includes('cold')) {
      categories.push({ name: 'Castable Mounting', url: `${baseUrl}/castable-mounting` })
    } else {
      // Show both if unclear
      categories.push({ name: 'Compression Mounting', url: `${baseUrl}/compression-mounting` })
      categories.push({ name: 'Castable Mounting', url: `${baseUrl}/castable-mounting` })
    }
  } else if (equipmentCategory === 'grinding-polishing') {
    // Grinding consumables
    categories.push({ name: 'SiC Grinding Papers', url: `${baseUrl}/sic-grinding` })
    categories.push({ name: 'Alumina Grinding Papers', url: `${baseUrl}/alumina` })
    categories.push({ name: 'Diamond Grinding Disks', url: `${baseUrl}/diamond-grinding` })
    categories.push({ name: 'Lapping Films', url: `${baseUrl}/lapping-films` })
    
    // Polishing consumables
    categories.push({ name: 'Polishing Pads', url: `${baseUrl}/polishing-pads` })
    categories.push({ name: 'Diamond Abrasives', url: `${baseUrl}/diamond-abrasives` })
    categories.push({ name: 'Final Polishing', url: `${baseUrl}/final-polishing` })
  } else if (equipmentCategory === 'microscopy') {
    categories.push({ name: 'Etchants', url: `${baseUrl}/etchants` })
  } else if (equipmentCategory === 'hardness-testing') {
    const subcategoryLower = equipmentSubcategory?.toLowerCase() || ''
    if (subcategoryLower.includes('rockwell')) {
      categories.push({ name: 'Rockwell Hardness Testing', url: `${baseUrl}/rockwell-hardness-testing` })
      categories.push({ name: 'Superficial Hardness Testing', url: `${baseUrl}/superficial-hardness-testing` })
    } else if (subcategoryLower.includes('microhardness') || subcategoryLower.includes('vickers') || subcategoryLower.includes('knoop')) {
      categories.push({ name: 'Microhardness Testing', url: `${baseUrl}/microhardness-hardness-testing` })
    } else if (subcategoryLower.includes('brinell')) {
      categories.push({ name: 'Brinell Hardness Testing', url: `${baseUrl}/brinell-hardness-testing` })
    } else {
      // Show all if unclear
      categories.push({ name: 'Rockwell Hardness Testing', url: `${baseUrl}/rockwell-hardness-testing` })
      categories.push({ name: 'Microhardness Testing', url: `${baseUrl}/microhardness-hardness-testing` })
      categories.push({ name: 'Brinell Hardness Testing', url: `${baseUrl}/brinell-hardness-testing` })
      categories.push({ name: 'Superficial Hardness Testing', url: `${baseUrl}/superficial-hardness-testing` })
    }
  }
  
  return categories
}

export default function EquipmentProductPage({ params }: { params: Promise<{ category: string; subcategory: string; slug: string }> }) {
  const { category, subcategory, slug } = use(params)
  const [equipment, setEquipment] = useState<EquipmentWithDetails | null>(null)
  const [subcategoryMeta, setSubcategoryMeta] = useState<SubcategoryMetadata | null>(null)
  const [consumablesCoverImage, setConsumablesCoverImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [uploadingBrochure, setUploadingBrochure] = useState(false)
  const [editBrochureUrl, setEditBrochureUrl] = useState<string>('')
  const brochureFileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingConsumablesImage, setUploadingConsumablesImage] = useState(false)
  const consumablesImageFileInputRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [editData, setEditData] = useState<Partial<EquipmentWithDetails>>({})
  const [editImageUrl, setEditImageUrl] = useState<string>('')
  const [editRelatedConsumablesImageUrl, setEditRelatedConsumablesImageUrl] = useState<string>('')
  const [editImages, setEditImages] = useState<Array<{ url: string; alt?: string; caption?: string; mediaType?: 'image' | 'video' }>>([])

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setIsAdmin(!!user)
      } catch (error) {
        setIsAdmin(false)
      }
    }
    checkAdmin()
  }, [])

  // Set document title when equipment loads
  useEffect(() => {
    if (equipment) {
      document.title = `${equipment.name} | Materialographic.com`
    } else if (!loading) {
      document.title = 'Equipment Not Found | Materialographic.com'
    }
  }, [equipment, loading])

  // Initialize edit data when equipment loads or edit mode is enabled
  useEffect(() => {
    if (equipment && editMode) {
      setEditData({
        name: equipment.name,
        description: equipment.description,
        item_id: equipment.item_id,
        related_consumables: equipment.related_consumables || [],
        related_consumables_image_url: equipment.related_consumables_image_url || null,
        sectioning: equipment.sectioning ? { ...equipment.sectioning } : undefined,
        mounting: equipment.mounting ? { ...equipment.mounting } : undefined,
        grinding_polishing: equipment.grinding_polishing ? { ...equipment.grinding_polishing } : undefined,
        microscopy: equipment.microscopy ? { ...equipment.microscopy } : undefined,
        hardness_testing: equipment.hardness_testing ? { ...equipment.hardness_testing } : undefined,
        lab_furniture: equipment.lab_furniture ? { ...equipment.lab_furniture } : undefined,
      })
      setEditImageUrl(equipment.image_url || '')
      setEditBrochureUrl(equipment.brochure_url || '')
      setEditRelatedConsumablesImageUrl(equipment.related_consumables_image_url || '')
      
      // Parse images array
      let imagesArray: any[] = []
      if (equipment.images) {
        if (Array.isArray(equipment.images)) {
          imagesArray = equipment.images
        } else if (typeof equipment.images === 'string') {
          try {
            imagesArray = JSON.parse(equipment.images)
          } catch {
            imagesArray = []
          }
        }
      }
      setEditImages(imagesArray.map((img: any) => ({
        url: img.url || '',
        alt: img.alt || '',
        caption: img.caption || '',
        mediaType: img.mediaType || (img.url?.includes('youtube.com') || img.url?.includes('youtu.be') ? 'video' : 'image')
      })))
    }
  }, [equipment, editMode])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()
        
        // Fetch equipment with category-specific data using joins
        let { data, error } = await supabase
          .from('equipment')
          .select(`
            *,
            equipment_sectioning (*),
            equipment_mounting (*),
            equipment_grinding_polishing (*),
            equipment_microscopy (*),
            equipment_hardness_testing (*),
            equipment_lab_furniture (*)
          `)
          .or(`slug.eq.${slug},item_id.ilike.${slug.toUpperCase()}`)
          .eq('status', 'active')
          .single()

        if (error && error.code === 'PGRST116') {
          // Try with lowercase item_id
          const { data: data2, error: error2 } = await supabase
            .from('equipment')
            .select(`
              *,
              equipment_sectioning!equipment_sectioning_equipment_id_fkey (*),
              equipment_mounting!equipment_mounting_equipment_id_fkey (*),
              equipment_grinding_polishing!equipment_grinding_polishing_equipment_id_fkey (*),
              equipment_microscopy!equipment_microscopy_equipment_id_fkey (*),
              equipment_hardness_testing!equipment_hardness_testing_equipment_id_fkey (*),
              equipment_lab_furniture!equipment_lab_furniture_equipment_id_fkey (*)
            `)
            .ilike('item_id', slug.toUpperCase())
            .eq('status', 'active')
            .single()
          
          if (error2) {
            console.error('Equipment not found:', error2)
            return
          }
          data = data2
        } else if (error) {
          console.error('Error fetching equipment:', error)
          return
        }

        // Transform the data to match EquipmentWithDetails type
        // Supabase returns joined data as arrays, but it might be empty or the relationship might not be set up correctly
        const equipmentWithDetails: EquipmentWithDetails = {
          ...data,
          sectioning: Array.isArray(data.equipment_sectioning) && data.equipment_sectioning.length > 0 
            ? data.equipment_sectioning[0] 
            : (data.equipment_sectioning && !Array.isArray(data.equipment_sectioning)
              ? data.equipment_sectioning  // Handle case where it's already an object
              : null),
          mounting: Array.isArray(data.equipment_mounting) && data.equipment_mounting.length > 0 
            ? data.equipment_mounting[0] 
            : (data.equipment_mounting && !Array.isArray(data.equipment_mounting)
              ? data.equipment_mounting
              : null),
          grinding_polishing: Array.isArray(data.equipment_grinding_polishing) && data.equipment_grinding_polishing.length > 0 
            ? data.equipment_grinding_polishing[0] 
            : (data.equipment_grinding_polishing && !Array.isArray(data.equipment_grinding_polishing)
              ? data.equipment_grinding_polishing
              : null),
          microscopy: Array.isArray(data.equipment_microscopy) && data.equipment_microscopy.length > 0 
            ? data.equipment_microscopy[0] 
            : (data.equipment_microscopy && !Array.isArray(data.equipment_microscopy)
              ? data.equipment_microscopy
              : null),
          hardness_testing: Array.isArray(data.equipment_hardness_testing) && data.equipment_hardness_testing.length > 0 
            ? data.equipment_hardness_testing[0] 
            : (data.equipment_hardness_testing && !Array.isArray(data.equipment_hardness_testing)
              ? data.equipment_hardness_testing
              : null),
          lab_furniture: Array.isArray(data.equipment_lab_furniture) && data.equipment_lab_furniture.length > 0 
            ? data.equipment_lab_furniture[0] 
            : (data.equipment_lab_furniture && !Array.isArray(data.equipment_lab_furniture)
              ? data.equipment_lab_furniture
              : null),
        }

        setEquipment(equipmentWithDetails)

        // Fetch subcategory metadata - prioritize URL parameter, fallback to equipment subcategory
        let meta = null
        // First try with URL subcategory parameter (what the user expects)
        if (subcategory) {
          meta = await getSubcategoryMetadata(category, subcategory, 'equipment')
        }
        // Fallback to equipment's subcategory if URL parameter didn't work
        if (!meta && data?.subcategory) {
          meta = await getSubcategoryMetadata(category, data.subcategory, 'equipment')
        }
        setSubcategoryMeta(meta)

        // Set consumables cover image - use database field first, then fallback to mapping
        const coverImageMap: Record<string, string> = {
          // Sectioning
          'precision-wafering': '/images/consumables/precision-wafering-cover.webp',
          'precision': '/images/consumables/precision-wafering-cover.webp',
          'wafering': '/images/consumables/precision-wafering-cover.webp',
          'abrasive-sectioning': '/images/consumables/abrasive-sectioning-cover.webp',
          'automated': '/images/consumables/abrasive-sectioning-cover.webp',
          'manual': '/images/consumables/abrasive-sectioning-cover.webp',
          // Mounting
          'compression-mounting': '/images/consumables/compression-mounting-cover.webp',
          'compression': '/images/consumables/compression-mounting-cover.webp',
          'castable-mounting': '/images/consumables/castable-mounting-cover.webp',
          'castable': '/images/consumables/castable-mounting-cover.webp',
          // Grinding & Polishing
          'grinding-polishing': '/images/consumables/grinding-cover.webp',
          'grinding': '/images/consumables/grinding-cover.webp',
          'polishing': '/images/consumables/polishing-cover.webp',
          // Hardness Testing
          'hardness-testing': '/images/consumables/hardness-testing-cover.webp',
          'hardness': '/images/consumables/hardness-testing-cover.webp',
        }
        
        let coverImage: string | null = null
        
        // First try database field
        if (equipmentWithDetails.related_consumables_image_url) {
          coverImage = equipmentWithDetails.related_consumables_image_url
        } else {
          // Fallback to mapping: try subcategory first
          if (equipmentWithDetails.subcategory) {
            const subcategoryKey = equipmentWithDetails.subcategory.toLowerCase().replace(/\s+/g, '-')
            coverImage = coverImageMap[subcategoryKey]
          }
          
          // Fallback to category
          if (!coverImage) {
            coverImage = coverImageMap[category] || coverImageMap[category.replace(/\s+/g, '-')]
          }
        }
        
        if (coverImage) {
          setConsumablesCoverImage(coverImage)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category, subcategory, slug])

  // Handle save changes
  const handleSave = async () => {
    if (!equipment || !editData) return

    setSaving(true)
    try {
      const supabase = createClient()
      
      // Update base equipment data
      const { error: equipmentError } = await supabase
        .from('equipment')
        .update({
          name: editData.name,
          description: editData.description,
          item_id: editData.item_id,
          image_url: editImageUrl,
          images: editImages.length > 0 ? editImages : null,
          brochure_url: editBrochureUrl || null,
          related_consumables: editData.related_consumables && editData.related_consumables.length > 0 
            ? editData.related_consumables 
            : null,
          related_consumables_image_url: editRelatedConsumablesImageUrl || null,
        })
        .eq('id', equipment.id)

      if (equipmentError) throw equipmentError

      // Update category-specific specs
      const categoryTableMap: Record<string, string> = {
        'sectioning': 'equipment_sectioning',
        'mounting': 'equipment_mounting',
        'grinding-polishing': 'equipment_grinding_polishing',
        'microscopy': 'equipment_microscopy',
        'hardness-testing': 'equipment_hardness_testing',
        'lab-furniture': 'equipment_lab_furniture',
      }

      const categoryTable = categoryTableMap[category]
      if (categoryTable && editData[category as keyof typeof editData]) {
        const categoryData = editData[category as keyof typeof editData]
        if (categoryData && typeof categoryData === 'object' && 'equipment_id' in categoryData) {
          // Remove equipment_id from update data
          const { equipment_id, ...updateData } = categoryData as any
          
          // Ensure record exists
          const { data: existing } = await supabase
            .from(categoryTable)
            .select('equipment_id')
            .eq('equipment_id', equipment.id)
            .single()

          if (existing) {
            const { error: categoryError } = await supabase
              .from(categoryTable)
              .update(updateData)
              .eq('equipment_id', equipment.id)

            if (categoryError) throw categoryError
          } else {
            const { error: categoryError } = await supabase
              .from(categoryTable)
              .insert({
                equipment_id: equipment.id,
                ...updateData,
              })

            if (categoryError) throw categoryError
          }
        }
      }

      // Update local state
      setEquipment(prev => prev ? {
        ...prev,
        name: editData.name || prev.name,
        description: editData.description || prev.description,
        item_id: editData.item_id || prev.item_id,
        image_url: editImageUrl || prev.image_url,
        images: editImages.length > 0 ? editImages : prev.images,
        brochure_url: editBrochureUrl || prev.brochure_url || null,
        related_consumables: editData.related_consumables || prev.related_consumables || null,
        related_consumables_image_url: editRelatedConsumablesImageUrl || prev.related_consumables_image_url || null,
        sectioning: editData.sectioning || prev.sectioning,
        mounting: editData.mounting || prev.mounting,
        grinding_polishing: editData.grinding_polishing || prev.grinding_polishing,
        microscopy: editData.microscopy || prev.microscopy,
        hardness_testing: editData.hardness_testing || prev.hardness_testing,
        lab_furniture: editData.lab_furniture || prev.lab_furniture,
      } : null)
      
      // Update consumables cover image if changed
      if (editRelatedConsumablesImageUrl) {
        setConsumablesCoverImage(editRelatedConsumablesImageUrl)
      } else {
        // Recalculate fallback
        const coverImageMap: Record<string, string> = {
          'precision-wafering': '/images/consumables/precision-wafering-cover.webp',
          'precision': '/images/consumables/precision-wafering-cover.webp',
          'wafering': '/images/consumables/precision-wafering-cover.webp',
          'abrasive-sectioning': '/images/consumables/abrasive-sectioning-cover.webp',
          'automated': '/images/consumables/abrasive-sectioning-cover.webp',
          'manual': '/images/consumables/abrasive-sectioning-cover.webp',
          'compression-mounting': '/images/consumables/compression-mounting-cover.webp',
          'compression': '/images/consumables/compression-mounting-cover.webp',
          'castable-mounting': '/images/consumables/castable-mounting-cover.webp',
          'castable': '/images/consumables/castable-mounting-cover.webp',
          'grinding-polishing': '/images/consumables/grinding-cover.webp',
          'grinding': '/images/consumables/grinding-cover.webp',
          'polishing': '/images/consumables/polishing-cover.webp',
          'hardness-testing': '/images/consumables/hardness-testing-cover.webp',
          'hardness': '/images/consumables/hardness-testing-cover.webp',
        }
        let fallbackImage: string | null = null
        if (equipment?.subcategory) {
          const subcategoryKey = equipment.subcategory.toLowerCase().replace(/\s+/g, '-')
          fallbackImage = coverImageMap[subcategoryKey]
        }
        if (!fallbackImage) {
          fallbackImage = coverImageMap[category] || coverImageMap[category.replace(/\s+/g, '-')]
        }
        setConsumablesCoverImage(fallbackImage)
      }

      setEditMode(false)
    } catch (error: any) {
      console.error('Error saving equipment:', error)
      alert('Failed to save changes: ' + (error.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  // Handle specs change
  const handleSpecsChange = (category: string, data: any) => {
    setEditData(prev => ({
      ...prev,
      [category]: data,
    }))
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false)
    setEditData({})
    setEditBrochureUrl('')
    setEditRelatedConsumablesImageUrl('')
  }

  // Handle brochure upload
  const handleBrochureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file')
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('Brochure size must be less than 50MB')
      return
    }

    setUploadingBrochure(true)

    try {
      const supabase = createClient()
      
      // Verify user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to upload brochures')
      }

      if (!equipment) throw new Error('Equipment not found')

      // Generate storage path - use item_id for cleaner structure
      const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      
      // Use item_id as the filename for cleaner URLs
      const itemId = equipment.item_id?.toLowerCase() || equipment.slug || 'unknown'
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
          upsert: true
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brochures')
        .getPublicUrl(filePath)

      setEditBrochureUrl(publicUrl)
    } catch (error: any) {
      console.error('Error uploading brochure:', error)
      alert(error.message || 'Failed to upload brochure. Please try again.')
    } finally {
      setUploadingBrochure(false)
      if (brochureFileInputRef.current) {
        brochureFileInputRef.current.value = ''
      }
    }
  }

  // Handle consumables image upload
  const handleConsumablesImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploadingConsumablesImage(true)

    try {
      const supabase = createClient()
      
      // Verify user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to upload images')
      }

      if (!equipment) throw new Error('Equipment not found')

      // Generate storage path
      const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const itemId = equipment.item_id?.toLowerCase() || equipment.slug || 'unknown'
      const cleanItemId = sanitize(itemId)
      const fileExt = file.name.split('.').pop() || 'webp'
      const fileName = `${cleanItemId}-consumables-cover.${fileExt}`
      const filePath = `consumables/${fileName}`

      // Check if file already exists and delete it first (upsert behavior)
      const { data: existingFiles } = await supabase.storage
        .from('equipment-images')
        .list('consumables', {
          search: `${cleanItemId}-consumables-cover`
        })
      
      if (existingFiles && existingFiles.length > 0) {
        const filesToDelete = existingFiles
          .filter(f => f.name.startsWith(`${cleanItemId}-consumables-cover`))
          .map(f => `consumables/${f.name}`)
        
        if (filesToDelete.length > 0) {
          await supabase.storage
            .from('equipment-images')
            .remove(filesToDelete)
        }
      }

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('equipment-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('equipment-images')
        .getPublicUrl(filePath)

      setEditRelatedConsumablesImageUrl(publicUrl)
      setConsumablesCoverImage(publicUrl)
    } catch (error: any) {
      console.error('Error uploading consumables image:', error)
      alert(error.message || 'Failed to upload image. Please try again.')
    } finally {
      setUploadingConsumablesImage(false)
      if (consumablesImageFileInputRef.current) {
        consumablesImageFileInputRef.current.value = ''
      }
    }
  }

  // Handle consumables image delete
  const handleConsumablesImageDelete = async () => {
    if (!editRelatedConsumablesImageUrl && !equipment?.related_consumables_image_url) return

    if (!confirm('Are you sure you want to remove this image? It will revert to the default.')) return

    try {
      const supabase = createClient()
      const imageUrl = editRelatedConsumablesImageUrl || equipment?.related_consumables_image_url
      
      if (imageUrl) {
        // Extract file path from URL
        try {
          const url = new URL(imageUrl)
          const pathParts = url.pathname.split('/')
          const bucketIndex = pathParts.findIndex(part => part === 'equipment-images')
          if (bucketIndex !== -1) {
            const filePath = pathParts.slice(bucketIndex + 1).join('/')
            
            // Delete from storage
            const { error: deleteError } = await supabase.storage
              .from('equipment-images')
              .remove([filePath])

            if (deleteError) {
              console.warn('Error deleting image from storage:', deleteError)
              // Continue anyway to clear the URL
            }
          }
        } catch (e) {
          // URL might not be a storage URL, continue to clear it
          console.warn('Could not parse image URL for deletion:', e)
        }
      }

      setEditRelatedConsumablesImageUrl('')
      // Recalculate fallback
      const coverImageMap: Record<string, string> = {
        'precision-wafering': '/images/consumables/precision-wafering-cover.webp',
        'precision': '/images/consumables/precision-wafering-cover.webp',
        'wafering': '/images/consumables/precision-wafering-cover.webp',
        'abrasive-sectioning': '/images/consumables/abrasive-sectioning-cover.webp',
        'automated': '/images/consumables/abrasive-sectioning-cover.webp',
        'manual': '/images/consumables/abrasive-sectioning-cover.webp',
        'compression-mounting': '/images/consumables/compression-mounting-cover.webp',
        'compression': '/images/consumables/compression-mounting-cover.webp',
        'castable-mounting': '/images/consumables/castable-mounting-cover.webp',
        'castable': '/images/consumables/castable-mounting-cover.webp',
        'grinding-polishing': '/images/consumables/grinding-cover.webp',
        'grinding': '/images/consumables/grinding-cover.webp',
        'polishing': '/images/consumables/polishing-cover.webp',
        'hardness-testing': '/images/consumables/hardness-testing-cover.webp',
        'hardness': '/images/consumables/hardness-testing-cover.webp',
      }
      let fallbackImage: string | null = null
      if (equipment?.subcategory) {
        const subcategoryKey = equipment.subcategory.toLowerCase().replace(/\s+/g, '-')
        fallbackImage = coverImageMap[subcategoryKey]
      }
      if (!fallbackImage) {
        fallbackImage = coverImageMap[category] || coverImageMap[category.replace(/\s+/g, '-')]
      }
      setConsumablesCoverImage(fallbackImage)
    } catch (error: any) {
      console.error('Error deleting consumables image:', error)
      alert(error.message || 'Failed to delete image. Please try again.')
    }
  }

  // Handle brochure delete
  const handleBrochureDelete = async () => {
    if (!equipment?.brochure_url) return

    if (!confirm('Are you sure you want to delete this brochure?')) return

    try {
      const supabase = createClient()
      
      // Extract file path from URL
      const url = new URL(equipment.brochure_url)
      const pathParts = url.pathname.split('/')
      const bucketIndex = pathParts.findIndex(part => part === 'brochures')
      if (bucketIndex === -1) {
        throw new Error('Invalid brochure URL')
      }
      const filePath = pathParts.slice(bucketIndex + 1).join('/')

      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('brochures')
        .remove([filePath])

      if (deleteError) {
        throw deleteError
      }

      setEditBrochureUrl('')
    } catch (error: any) {
      console.error('Error deleting brochure:', error)
      alert(error.message || 'Failed to delete brochure. Please try again.')
    }
  }

  // Render media gallery (images and videos)
  const renderMediaGallery = () => {
    if (!equipment) return null
    
    // Helper function to detect if URL is a video
    const isVideoUrl = (url: string, mediaType?: string): boolean => {
      if (!url) return false
      return mediaType === 'video' || url.includes('youtube.com') || url.includes('youtu.be') || url.includes('.mp4') || url.includes('.webm') || url.includes('.mov')
    }
    
    // Helper function to extract YouTube video ID
    const getYouTubeVideoId = (url: string): string | null => {
      if (!url) return null
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
      return match ? match[1] : null
    }
    
    // Get all images and videos: primary image_url + additional images array
    const allMedia: Array<{ url: string; alt?: string; caption?: string; mediaType?: 'image' | 'video'; videoId?: string | null }> = []
    
    // Normalize URLs for comparison (remove query params, trailing slashes, protocol)
    const normalizeUrl = (url: string) => {
      if (!url) return ''
      // Remove protocol, query params, trailing slashes, and convert to lowercase
      return url
        .replace(/^https?:\/\//, '')
        .split('?')[0]
        .replace(/\/$/, '')
        .toLowerCase()
    }
    
    // Add additional images from images array first
    // Handle both array and string (JSON) formats
    let imagesArray: any[] = []
    if (equipment.images) {
      if (Array.isArray(equipment.images)) {
        imagesArray = equipment.images
      } else {
        // Handle case where images might be a string (from database)
        const imagesValue = equipment.images as unknown
        if (typeof imagesValue === 'string') {
          try {
            imagesArray = JSON.parse(imagesValue)
          } catch {
            // If parsing fails, try to treat as single URL
            if (imagesValue.trim()) {
              imagesArray = [{ url: imagesValue }]
            }
          }
        }
      }
    }
    
    // Normalize primary image URL for comparison
    const primaryUrlNormalized = equipment.image_url ? normalizeUrl(equipment.image_url) : ''
    
    // Track URLs we've already added to avoid duplicates
    const addedUrls = new Set<string>()
    
    // Add primary image/video if it exists (and it's not already in the images array)
    if (equipment.image_url) {
      const primaryNormalized = normalizeUrl(equipment.image_url)
      // Check if primary image is already in the images array
      const isInArray = imagesArray.some((img: any) => {
        if (!img || !img.url) return false
        return normalizeUrl(img.url) === primaryNormalized
      })
      
      // Only add primary if it's not already in the array
      if (!isInArray) {
        const isVideo = isVideoUrl(equipment.image_url)
        const videoId = isVideo ? getYouTubeVideoId(equipment.image_url) : null
        allMedia.push({ 
          url: equipment.image_url, 
          alt: equipment.name,
          caption: 'Primary ' + (isVideo ? 'video' : 'image'),
          mediaType: isVideo ? 'video' : 'image',
          videoId: videoId
        })
        addedUrls.add(primaryNormalized)
      }
    }
    
    // Add images from array, skipping duplicates
    if (imagesArray.length > 0) {
      imagesArray.forEach((img: any) => {
        if (img && img.url) {
          const imgUrlNormalized = normalizeUrl(img.url)
          
          // Skip if it's the same as primary (already added) or if we've already added it
          if (imgUrlNormalized && imgUrlNormalized !== primaryUrlNormalized && !addedUrls.has(imgUrlNormalized)) {
            const isVideo = img.mediaType === 'video' || isVideoUrl(img.url, img.mediaType)
            const videoId = isVideo ? getYouTubeVideoId(img.url) : null
            allMedia.push({
              url: img.url,
              alt: img.alt || equipment.name,
              caption: img.caption,
              mediaType: isVideo ? 'video' : 'image',
              videoId: videoId
            })
            addedUrls.add(imgUrlNormalized)
          }
        }
      })
    }
    
    
    if (allMedia.length === 0) return null
    
    // Ensure selectedImageIndex is within bounds
    const safeIndex = Math.min(Math.max(0, selectedImageIndex), allMedia.length - 1)
    const currentMedia = allMedia[safeIndex] || allMedia[0]
    
    return (
      <>
        <div 
          className="relative w-full h-96 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-4 cursor-pointer group"
          onClick={() => !currentMedia.mediaType || currentMedia.mediaType === 'image' ? setLightboxOpen(true) : null}
        >
          {currentMedia.mediaType === 'video' && currentMedia.videoId ? (
            <div className="relative w-full h-full">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${currentMedia.videoId}`}
                title={currentMedia.alt || equipment.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : currentMedia.mediaType === 'video' ? (
            <video
              src={currentMedia.url}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <Image
              src={getEquipmentImageUrl(currentMedia.url) || currentMedia.url}
              alt={currentMedia.alt || equipment.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          {allMedia.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
              {safeIndex + 1} / {allMedia.length}
            </div>
          )}
          {currentMedia.caption && (
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm max-w-xs">
              {currentMedia.caption}
            </div>
          )}
          {currentMedia.mediaType === 'video' && (
            <div className="absolute top-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded text-xs font-semibold">
              VIDEO
            </div>
          )}
        </div>
        
        {/* Thumbnail Gallery */}
        {allMedia.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {allMedia.map((media, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedImageIndex(index)
                  setLightboxOpen(false) // Close lightbox if open
                }}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all bg-gradient-to-br from-gray-50 to-gray-100 ${
                  safeIndex === index
                    ? 'border-primary-600 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {media.mediaType === 'video' && media.videoId ? (
                  <div className="relative w-full h-full">
                    <img
                      src={`https://img.youtube.com/vi/${media.videoId}/mqdefault.jpg`}
                      alt={media.alt || `${equipment.name} - Video ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                ) : media.mediaType === 'video' ? (
                  <video
                    src={media.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                ) : (
                  <Image
                    src={getEquipmentImageUrl(media.url) || media.url}
                    alt={media.alt || `${equipment.name} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 25vw, 16vw"
                  />
                )}
                {media.mediaType === 'video' && (
                  <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded">
                    VIDEO
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
        
        {/* Show message if only one media item */}
        {allMedia.length === 1 && currentMedia.mediaType === 'image' && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Click image to view full size
          </p>
        )}
        
        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            {allMedia.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex((prev) => 
                      prev > 0 ? prev - 1 : allMedia.length - 1
                    )
                  }}
                  className="absolute left-4 text-white hover:text-gray-300 z-10"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex((prev) => 
                      prev < allMedia.length - 1 ? prev + 1 : 0
                    )
                  }}
                  className="absolute right-4 text-white hover:text-gray-300 z-10"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </>
            )}
            
            <div 
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
                {currentMedia.mediaType === 'video' && currentMedia.videoId ? (
                  <div className="relative w-full h-full">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${currentMedia.videoId}`}
                      title={currentMedia.alt || equipment.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : currentMedia.mediaType === 'video' ? (
                  <video
                    src={currentMedia.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={getEquipmentImageUrl(currentMedia.url) || currentMedia.url}
                    alt={currentMedia.alt || equipment.name}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
                {currentMedia.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 text-center">
                    {currentMedia.caption}
                  </div>
                )}
                {allMedia.length > 1 && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                    {safeIndex + 1} / {allMedia.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  const categoryLabel = categoryLabels[category] || category
  let subcategoryLabel = subcategoryMeta?.subcategory_label || subcategory
  
  // Add fallback mappings for common subcategories if metadata is missing
  if (!subcategoryMeta) {
    // Grinding & Polishing subcategories
    if (category === 'grinding-polishing') {
      const subcategoryLower = subcategory.toLowerCase()
      if (subcategoryLower === 'manual' || subcategoryLower.includes('manual')) {
        subcategoryLabel = 'Manual Grinder/Polishers'
      } else if (subcategoryLower === 'automated' || subcategoryLower.includes('automated') || subcategoryLower.includes('automatic')) {
        subcategoryLabel = 'Automated Grinder/Polishers'
      }
    }
    // Sectioning subcategories
    else if (category === 'sectioning') {
      const subcategoryLower = subcategory.toLowerCase()
      if ((subcategoryLower.includes('automated') || subcategoryLower.includes('automatic')) && 
          !subcategoryLabel.toLowerCase().includes('abrasive cutters')) {
        subcategoryLabel = 'Automated Abrasive Cutters'
      } else if (subcategoryLower.includes('manual') && 
                 !subcategoryLabel.toLowerCase().includes('abrasive cutters')) {
        subcategoryLabel = 'Manual Abrasive Cutters'
      }
    }
  }

  if (loading) {
    return (
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          <div className="text-center py-12">
            <LoadingSpinner size="md" />
          </div>
        </div>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Equipment Not Found</h1>
            <p className="text-gray-600 mb-6">The equipment you're looking for doesn't exist.</p>
            <Link href={`/equipment/${category}`} className="btn-primary">
              Back to {categoryLabel}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Generate Product schema for SEO and AI
  const productSchema = equipment ? generateProductSchema(equipment, category, subcategory) : null

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
      )}
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link 
              href="/equipment"
              className="hover:text-primary-600 transition-colors"
            >
              Equipment
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link 
              href={`/equipment/${category}`}
              className="hover:text-primary-600 transition-colors"
            >
              {categoryLabel}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link 
              href={`/equipment/${category}/${subcategory}`}
              className="hover:text-primary-600 transition-colors"
            >
              {subcategoryLabel}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{equipment.name}</span>
          </div>
          
          {isAdmin && (
            <div className="flex items-center gap-2">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <div>
            {editMode ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Photos & Videos</h3>
                <EquipmentImageManager
                  primaryImageUrl={editImageUrl}
                  additionalImages={editImages}
                  onPrimaryImageChange={(url) => setEditImageUrl(url)}
                  onAdditionalImagesChange={(images) => setEditImages(images)}
                  category={category}
                  subcategory={equipment.subcategory || undefined}
                  itemId={equipment.item_id}
                  itemSlug={equipment.slug || undefined}
                />
              </div>
            ) : (
              renderMediaGallery()
            )}
          </div>

          {/* Details Section */}
          <div>
            {editMode ? (
              <>
                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Equipment Name"
                />
                {editData.item_id !== undefined && (
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Item ID</label>
                    <input
                      type="text"
                      value={editData.item_id || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, item_id: e.target.value }))}
                      className="text-sm text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Item ID"
                    />
                  </div>
                )}
                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <textarea
                    value={editData.description || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-700 leading-relaxed"
                    placeholder="Equipment description"
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {equipment.name}
                </h1>
                {equipment.item_id && (
                  <p className="text-sm text-gray-500 mb-4">Item ID: {equipment.item_id}</p>
                )}
                {equipment.description && (
                  <div className="prose prose-sm max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed">{equipment.description}</p>
                  </div>
                )}
              </>
            )}

            {/* NANO Base Requirement for FEMTO Equipment */}
            {equipment.item_id && equipment.item_id.toUpperCase().includes('FEMTO') && (() => {
              // Extract NANO model from description
              const description = equipment.description || ''
              const nanoMatch = description.match(/NANO-[\dA-Z]+/gi)
              const nanoModels = nanoMatch ? [...new Set(nanoMatch.map(m => m.toUpperCase()))] : []
              
              if (nanoModels.length > 0) {
                return (
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Required Base Unit</h3>
                        <p className="text-blue-800 mb-2">
                          This FEMTO polishing head requires a NANO base unit to operate:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-3">
                          {nanoModels.map((nano, index) => (
                            <li key={index} className="text-blue-800 font-medium">
                              {nano}
                            </li>
                          ))}
                        </ul>
                        {nanoModels.length > 0 && (
                          <Link
                            href="/equipment/grinding-polishing/manual"
                            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold transition-colors"
                          >
                            View NANO Base Units
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })()}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="btn-primary text-center"
              >
                Request Quote
              </Link>
              {editMode ? (
                <div className="space-y-2">
                  <input
                    ref={brochureFileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleBrochureUpload}
                    className="hidden"
                    id="brochure-upload"
                  />
                  {(editBrochureUrl || equipment.brochure_url) && (() => {
                    const currentBrochureUrl = editBrochureUrl || equipment.brochure_url
                    const brochureUrl = currentBrochureUrl ? getBrochureUrl(currentBrochureUrl) : null
                    return brochureUrl ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={brochureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-center inline-flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {editBrochureUrl !== equipment.brochure_url ? 'View New Brochure' : 'View Brochure'}
                        </a>
                        <label
                          htmlFor="brochure-upload"
                          className="btn-secondary text-center inline-flex items-center justify-center gap-2 cursor-pointer"
                          style={{ pointerEvents: uploadingBrochure ? 'none' : 'auto', opacity: uploadingBrochure ? 0.6 : 1 }}
                        >
                          {uploadingBrochure ? 'Uploading...' : 'Change Brochure'}
                        </label>
                        <button
                          onClick={handleBrochureDelete}
                          className="btn-secondary text-center inline-flex items-center justify-center gap-2 text-red-600 hover:text-red-700"
                          disabled={uploadingBrochure}
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    ) : null
                  })()}
                  {!editBrochureUrl && !equipment.brochure_url && (
                    <label
                      htmlFor="brochure-upload"
                      className="btn-secondary text-center inline-flex items-center justify-center gap-2 cursor-pointer"
                      style={{ pointerEvents: uploadingBrochure ? 'none' : 'auto', opacity: uploadingBrochure ? 0.6 : 1 }}
                    >
                      {uploadingBrochure ? 'Uploading...' : 'Add Brochure'}
                    </label>
                  )}
                </div>
              ) : (
                equipment.brochure_url && (() => {
                  const brochureUrl = getBrochureUrl(equipment.brochure_url)
                  return brochureUrl ? (
                    <a
                      href={brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-center inline-flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Brochure
                    </a>
                  ) : null
                })()
              )}
            </div>
          </div>
        </div>

        {/* Applications Section */}
        {equipment.suitable_for_applications && equipment.suitable_for_applications.length > 0 && (
          <section className="mt-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Applications</h2>
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
              <p className="text-gray-700 mb-4 leading-relaxed">
                This equipment is well-suited for the following applications:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {equipment.suitable_for_applications.map((app, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-600 mt-2" />
                    <div>
                      <h3 className="font-semibold text-gray-900 capitalize mb-1">
                        {app.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Specifications Section */}
        <section className="mt-12 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
            {/* Category-Specific Specifications */}
            {category === 'sectioning' && (
              <SectioningSpecs 
                specs={editMode && editData.sectioning ? editData.sectioning : equipment.sectioning}
                editMode={editMode}
                onChange={(data) => handleSpecsChange('sectioning', data)}
              />
            )}
            {category === 'mounting' && (
              <MountingSpecs 
                specs={editMode && editData.mounting ? editData.mounting : equipment.mounting}
                editMode={editMode}
                onChange={(data) => handleSpecsChange('mounting', data)}
              />
            )}
            {category === 'grinding-polishing' && (
              <GrindingPolishingSpecs 
                specs={editMode && editData.grinding_polishing ? editData.grinding_polishing : equipment.grinding_polishing}
                editMode={editMode}
                onChange={(data) => handleSpecsChange('grinding_polishing', data)}
              />
            )}
            {category === 'microscopy' && (
              <MicroscopySpecs 
                specs={editMode && editData.microscopy ? editData.microscopy : equipment.microscopy}
                editMode={editMode}
                onChange={(data) => handleSpecsChange('microscopy', data)}
              />
            )}
            {category === 'hardness-testing' && (
              <HardnessTestingSpecs 
                specs={editMode && editData.hardness_testing ? editData.hardness_testing : equipment.hardness_testing}
                editMode={editMode}
                onChange={(data) => handleSpecsChange('hardness_testing', data)}
              />
            )}
            {category === 'lab-furniture' && (
              <LabFurnitureSpecs 
                specs={editMode && editData.lab_furniture ? editData.lab_furniture : equipment.lab_furniture}
                editMode={editMode}
                onChange={(data) => handleSpecsChange('lab_furniture', data)}
              />
            )}

            {/* General Equipment Attributes */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">General Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {equipment.item_id && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Item ID:</span>
                    <span className="ml-2 text-sm text-gray-900">{equipment.item_id}</span>
                  </div>
                )}
                {(equipment.sectioning?.automation_level || equipment.grinding_polishing?.automation_level) && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Automation Level:</span>
                    <span className="ml-2 text-sm text-gray-900 capitalize">
                      {(equipment.sectioning?.automation_level || equipment.grinding_polishing?.automation_level || '').replace(/-/g, ' ')}
                    </span>
                  </div>
                )}
                {equipment.sectioning?.blade_size_mm && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Blade Size:</span>
                    <span className="ml-2 text-sm text-gray-900">{equipment.sectioning.blade_size_mm} mm</span>
                    {equipment.sectioning.blade_size_inches && (
                      <span className="ml-1 text-sm text-gray-500">({equipment.sectioning.blade_size_inches}")</span>
                    )}
                  </div>
                )}
                {equipment.sectioning?.max_cutting_capacity_mm && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Max Cutting Capacity:</span>
                    <span className="ml-2 text-sm text-gray-900">{equipment.sectioning.max_cutting_capacity_mm} mm</span>
                    {equipment.sectioning.max_cutting_capacity_inches && (
                      <span className="ml-1 text-sm text-gray-500">({equipment.sectioning.max_cutting_capacity_inches}")</span>
                    )}
                  </div>
                )}
                {equipment.grinding_polishing?.wheel_size_inches && equipment.grinding_polishing.wheel_size_inches.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Wheel Sizes:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {equipment.grinding_polishing.wheel_size_inches.map(size => `${size}"`).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Video Section */}
        {(() => {
          // Map equipment items to YouTube videos by item_id or slug
          const equipmentVideos: Record<string, { videoId: string; title: string; description: string }> = {
            // Sectioning
            'pico-155s': {
              videoId: 'nQ7nM3VhWEU',
              title: 'Precision Sectioning with PICO-155S',
              description: 'Watch Dr. Donald Zipperian demonstrate precision wafering techniques using the PICO-155S precision cutter. Learn proper setup, feed rate control, and techniques for minimal deformation cutting.'
            },
            'pico-155p': {
              videoId: 'nQ7nM3VhWEU',
              title: 'Precision Sectioning with PICO-155S',
              description: 'Watch Dr. Donald Zipperian demonstrate precision wafering techniques using the PICO-155S precision cutter. Learn proper setup, feed rate control, and techniques for minimal deformation cutting.'
            },
            // Mounting
            'tp-7500s': {
              videoId: 'ghEnwKGf8Nc',
              title: 'Compression Mounting with TP-7500S',
              description: 'Learn compression mounting techniques with the TP-7500S hydraulic mounting press. This video demonstrates proper sample preparation, resin selection, and mounting procedures for high-quality mounts.'
            },
            'teravac': {
              videoId: 'g8QCrWxyRZ4',
              title: 'Castable Mounting with TeraVac',
              description: 'Watch demonstrations of castable mounting using the TeraVac (formerly LSSA-011) vacuum mounting system. Learn vacuum techniques for removing air bubbles and achieving void-free mounts.'
            },
            'lssa-011': {
              videoId: 'g8QCrWxyRZ4',
              title: 'Castable Mounting with TeraVac',
              description: 'Watch demonstrations of castable mounting using the TeraVac (formerly LSSA-011) vacuum mounting system. Learn vacuum techniques for removing air bubbles and achieving void-free mounts.'
            },
            // Grinding & Polishing
            'giga-s': {
              videoId: 'cPkzthQbLcM',
              title: 'Vibratory Polishing with the GIGA S',
              description: 'Learn vibratory polishing techniques from Dr. Donald Zipperian. This video demonstrates how to use the GIGA S vibratory polisher for final polishing, including setup, parameter selection, and achieving superior surface finishes for EBSD and high-quality microstructural analysis.'
            },
            'giga': {
              videoId: 'cPkzthQbLcM',
              title: 'Vibratory Polishing with the GIGA S',
              description: 'Learn vibratory polishing techniques from Dr. Donald Zipperian. This video demonstrates how to use the GIGA S vibratory polisher for final polishing, including setup, parameter selection, and achieving superior surface finishes for EBSD and high-quality microstructural analysis.'
            },
            'nano-1000s': {
              videoId: 'PT2fRdSvhDM',
              title: 'Automated Grinding & Polishing with NANO 1000S & FEMTO 1100S',
              description: 'Watch Dr. Donald Zipperian demonstrate automated grinding and polishing using the NANO 1000S and FEMTO 1100S systems. Learn how to program and operate these semi-automated systems for consistent, high-quality results.'
            },
            'femto-1100s': {
              videoId: 'PT2fRdSvhDM',
              title: 'Automated Grinding & Polishing with NANO 1000S & FEMTO 1100S',
              description: 'Watch Dr. Donald Zipperian demonstrate automated grinding and polishing using the NANO 1000S and FEMTO 1100S systems. Learn how to program and operate these semi-automated systems for consistent, high-quality results.'
            },
            'penta-7500s': {
              videoId: 'oFQoUkcwTMc',
              title: 'Manual Grinding with PENTA 7500S & PENTA 5000A',
              description: 'Learn proper manual grinding techniques from Dr. Donald Zipperian. This video demonstrates correct sample orientation, grinding motion, pressure control, and proper use of the PENTA manual grinding systems.'
            },
            'penta-5000a': {
              videoId: 'oFQoUkcwTMc',
              title: 'Manual Grinding with PENTA 7500S & PENTA 5000A',
              description: 'Learn proper manual grinding techniques from Dr. Donald Zipperian. This video demonstrates correct sample orientation, grinding motion, pressure control, and proper use of the PENTA manual grinding systems.'
            }
          }

          if (!equipment) return null

          // Try to find video by slug first, then by item_id
          const slugKey = slug.toLowerCase()
          const itemIdKey = equipment.item_id?.toLowerCase().replace(/[^a-z0-9-]/g, '')
          
          let video = equipmentVideos[slugKey] || equipmentVideos[itemIdKey || '']
          
          // Also try matching by item_id patterns (e.g., GIGA-S, PICO-155S)
          if (!video && equipment.item_id) {
            const itemIdNormalized = equipment.item_id.toUpperCase()
            if (itemIdNormalized.includes('GIGA')) {
              video = equipmentVideos['giga-s']
            } else if (itemIdNormalized.includes('PICO-155')) {
              video = equipmentVideos['pico-155s']
            } else if (itemIdNormalized.includes('TP-7500')) {
              video = equipmentVideos['tp-7500s']
            } else if (itemIdNormalized.includes('TERAVAC') || itemIdNormalized.includes('LSSA-011')) {
              video = equipmentVideos['teravac']
            } else if (itemIdNormalized.includes('NANO-1000')) {
              video = equipmentVideos['nano-1000s']
            } else if (itemIdNormalized.includes('FEMTO-1100')) {
              video = equipmentVideos['femto-1100s']
            } else if (itemIdNormalized.includes('PENTA-7500')) {
              video = equipmentVideos['penta-7500s']
            } else if (itemIdNormalized.includes('PENTA-5000')) {
              video = equipmentVideos['penta-5000a']
            }
          }
          
          if (!video) return null

          return (
            <section className="mt-12 mb-8 sm:mb-12">
              <div className="max-w-4xl mx-auto">
                <YouTubeVideo
                  videoId={video.videoId}
                  title={video.title}
                  description={video.description}
                />
              </div>
            </section>
          )
        })()}

        {/* Related Consumables Section - At the bottom */}
        {(() => {
          // Use database field if available, otherwise fall back to function for backward compatibility
          const relatedConsumables = equipment?.related_consumables && equipment.related_consumables.length > 0
            ? equipment.related_consumables
            : (editMode ? [] : getRelevantConsumableCategories(category, equipment?.subcategory || undefined))
          
          // Don't show if empty and not in edit mode
          if ((!relatedConsumables || relatedConsumables.length === 0) && !editMode) return null
          
          // Get current consumables from editData if in edit mode, otherwise from equipment
          const currentConsumables = editMode && editData.related_consumables !== undefined
            ? editData.related_consumables
            : (equipment?.related_consumables || [])
          
          const handleAddConsumable = () => {
            const newConsumables = [...(currentConsumables || []), { name: '', url: '' }]
            setEditData({ ...editData, related_consumables: newConsumables })
          }
          
          const handleRemoveConsumable = (index: number) => {
            const newConsumables = (currentConsumables || []).filter((_: any, i: number) => i !== index)
            setEditData({ ...editData, related_consumables: newConsumables })
          }
          
          const handleConsumableChange = (index: number, field: 'name' | 'url', value: string) => {
            const newConsumables = [...(currentConsumables || [])]
            newConsumables[index] = { ...newConsumables[index], [field]: value }
            setEditData({ ...editData, related_consumables: newConsumables })
          }
          
          // Get current image URL - use editData if in edit mode, otherwise equipment, then fallback
          const getCurrentImageUrl = (): string | null => {
            if (editMode && editRelatedConsumablesImageUrl !== undefined) {
              return editRelatedConsumablesImageUrl || null
            }
            if (equipment?.related_consumables_image_url) {
              return equipment.related_consumables_image_url
            }
            return consumablesCoverImage
          }
          
          const currentImageUrl = getCurrentImageUrl()
          
          return (
            <section className="mt-12 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Related Consumables</h2>
                {isAdmin && (
                  editMode ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditMode(true)
                        setEditData({ ...editData, related_consumables: equipment?.related_consumables || [] })
                        setEditRelatedConsumablesImageUrl(equipment?.related_consumables_image_url || '')
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  )
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                {/* Cover Image */}
                {(currentImageUrl || editMode) && (
                  <div className="lg:col-span-1">
                    {editMode ? (
                      <div className="space-y-2">
                        <div className="relative w-full h-48 lg:h-full min-h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          {editRelatedConsumablesImageUrl && (
                            <Image
                              src={editRelatedConsumablesImageUrl}
                              alt={`${categoryLabels[category]} consumables`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 1024px) 100vw, 25vw"
                              unoptimized
                              onError={(e) => {
                                const parent = e.currentTarget.closest('div.relative') as HTMLElement | null
                                if (parent) {
                                  parent.style.display = 'none'
                                }
                              }}
                            />
                          )}
                        </div>
                        <div className="space-y-2">
                          <input
                            ref={consumablesImageFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleConsumablesImageUpload}
                            className="hidden"
                            id="consumables-image-upload"
                          />
                          <div className="flex gap-2">
                            <label
                              htmlFor="consumables-image-upload"
                              className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors cursor-pointer text-center"
                              style={{ pointerEvents: uploadingConsumablesImage ? 'none' : 'auto', opacity: uploadingConsumablesImage ? 0.6 : 1 }}
                            >
                              {uploadingConsumablesImage ? 'Uploading...' : 'Upload Image'}
                            </label>
                            {(editRelatedConsumablesImageUrl || equipment?.related_consumables_image_url) && (
                              <button
                                onClick={handleConsumablesImageDelete}
                                className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-300 rounded-lg transition-colors"
                                disabled={uploadingConsumablesImage}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={editRelatedConsumablesImageUrl}
                            onChange={(e) => {
                              setEditRelatedConsumablesImageUrl(e.target.value)
                              // Update display immediately
                              if (e.target.value) {
                                setConsumablesCoverImage(e.target.value)
                              } else {
                                // Recalculate fallback
                                const coverImageMap: Record<string, string> = {
                                  'precision-wafering': '/images/consumables/precision-wafering-cover.webp',
                                  'precision': '/images/consumables/precision-wafering-cover.webp',
                                  'wafering': '/images/consumables/precision-wafering-cover.webp',
                                  'abrasive-sectioning': '/images/consumables/abrasive-sectioning-cover.webp',
                                  'automated': '/images/consumables/abrasive-sectioning-cover.webp',
                                  'manual': '/images/consumables/abrasive-sectioning-cover.webp',
                                  'compression-mounting': '/images/consumables/compression-mounting-cover.webp',
                                  'compression': '/images/consumables/compression-mounting-cover.webp',
                                  'castable-mounting': '/images/consumables/castable-mounting-cover.webp',
                                  'castable': '/images/consumables/castable-mounting-cover.webp',
                                  'grinding-polishing': '/images/consumables/grinding-cover.webp',
                                  'grinding': '/images/consumables/grinding-cover.webp',
                                  'polishing': '/images/consumables/polishing-cover.webp',
                                  'hardness-testing': '/images/consumables/hardness-testing-cover.webp',
                                  'hardness': '/images/consumables/hardness-testing-cover.webp',
                                }
                                let fallbackImage: string | null = null
                                if (equipment?.subcategory) {
                                  const subcategoryKey = equipment.subcategory.toLowerCase().replace(/\s+/g, '-')
                                  fallbackImage = coverImageMap[subcategoryKey]
                                }
                                if (!fallbackImage) {
                                  fallbackImage = coverImageMap[category] || coverImageMap[category.replace(/\s+/g, '-')]
                                }
                                setConsumablesCoverImage(fallbackImage)
                              }
                            }}
                            placeholder="Or enter image URL (leave empty for default)"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <p className="text-xs text-gray-500">
                            Upload an image or enter a URL. Leave empty to use default image based on category/subcategory.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-48 lg:h-full min-h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <Image
                          src={currentImageUrl!}
                          alt={`${categoryLabels[category]} consumables`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 25vw"
                          unoptimized
                          onError={(e) => {
                            // Hide parent div if image fails to load
                            const parent = e.currentTarget.closest('div.lg\\:col-span-1') as HTMLElement | null
                            if (parent) {
                              parent.style.display = 'none'
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Consumable Categories */}
                <div className={currentImageUrl ? "lg:col-span-3" : "lg:col-span-4"}>
                  {editMode ? (
                    <div className="space-y-3">
                      {(currentConsumables || []).map((consumable: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start p-3 border border-gray-300 rounded-lg bg-white">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={consumable.name || ''}
                              onChange={(e) => handleConsumableChange(index, 'name', e.target.value)}
                              placeholder="Consumable Name"
                              className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            />
                            <input
                              type="text"
                              value={consumable.url || ''}
                              onChange={(e) => handleConsumableChange(index, 'url', e.target.value)}
                              placeholder="https://shop.metallographic.com/collections/..."
                              className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveConsumable(index)}
                            className="px-2 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddConsumable}
                        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors"
                      >
                        + Add Consumable
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(currentConsumables || []).map((cat: any, index: number) => (
                        <Link
                          key={index}
                          href={cat.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all group text-sm font-medium text-gray-700 hover:text-primary-700"
                        >
                          <span>{cat.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        })()}
      </div>
    </div>
    </>
  )
}

