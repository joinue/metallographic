'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Settings, Check } from 'lucide-react'
import type { Equipment } from '@/lib/supabase'

interface FeaturedEquipmentSelectorProps {
  equipment: Equipment[]
  currentFeaturedId: string | null
  category: string
  subcategory: string
  onUpdate: (id: string | null) => void
}

export default function FeaturedEquipmentSelector({
  equipment,
  currentFeaturedId,
  category,
  subcategory,
  onUpdate,
}: FeaturedEquipmentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSelect = async (equipmentId: string | null) => {
    setSaving(true)
    try {
      const supabase = createClient()
      
      // Normalize subcategory (handle both 'compression' and 'compression-mounting')
      let normalizedSubcategory = subcategory
      if (category === 'mounting') {
        if (subcategory === 'compression' || subcategory === 'compression-mounting') {
          normalizedSubcategory = 'compression'
        } else if (subcategory === 'castable' || subcategory === 'castable-mounting') {
          normalizedSubcategory = 'castable'
        }
      }
      
      // Update subcategory_metadata with featured_equipment_id
      // First, get the current metadata
      const { data: metadata } = await supabase
        .from('subcategory_metadata')
        .select('id')
        .eq('entity_type', 'equipment')
        .eq('category', category)
        .eq('subcategory_key', normalizedSubcategory)
        .single()

      if (metadata) {
        // Update existing metadata
        const { error } = await supabase
          .from('subcategory_metadata')
          .update({ 
            featured_equipment_id: equipmentId,
            updated_at: new Date().toISOString()
          })
          .eq('id', metadata.id)

        if (error) throw error
      } else {
        // Create new metadata entry if it doesn't exist
        const { error } = await supabase
          .from('subcategory_metadata')
          .insert({
            entity_type: 'equipment',
            category,
            subcategory_key: normalizedSubcategory,
            subcategory_label: normalizedSubcategory,
            featured_equipment_id: equipmentId,
            is_active: true,
          })

        if (error) throw error
      }

      onUpdate(equipmentId)
      setIsOpen(false)
    } catch (error) {
      console.error('Error updating featured equipment:', error)
      alert('Failed to update featured equipment. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="absolute top-2 right-2 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 px-3 py-2 rounded-lg shadow-lg border border-gray-200 flex items-center gap-2 text-sm font-medium transition-all"
        title="Change featured equipment"
      >
        <Settings className="w-4 h-4" />
        <span>Featured</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-30 max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-semibold text-sm text-gray-900">Select Featured Equipment</h3>
              <p className="text-xs text-gray-500 mt-1">Choose which product appears in the hero</p>
            </div>
            <div className="p-2">
              <button
                onClick={() => handleSelect(null)}
                disabled={saving}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  currentFeaturedId === null
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>Default (First Item)</span>
                  {currentFeaturedId === null && <Check className="w-4 h-4" />}
                </div>
              </button>
              {equipment.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  disabled={saving}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors mt-1 ${
                    currentFeaturedId === item.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.name}</span>
                    {currentFeaturedId === item.id && <Check className="w-4 h-4 flex-shrink-0" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

