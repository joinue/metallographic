import type { EquipmentSectioning } from '@/lib/supabase'
import { useState, useEffect } from 'react'

interface SectioningSpecsProps {
  specs: EquipmentSectioning | null | undefined
  editMode?: boolean
  onChange?: (data: EquipmentSectioning) => void
}

// Helper function to format range values nicely
// Handles both TEXT strings and JSONB objects
function formatRangeValue(value: any): string {
  if (!value) return ''
  
  // If it's already a string, return it
  if (typeof value === 'string') return value
  
  // If it's an object/JSONB with min/max, format it nicely
  if (typeof value === 'object' && value !== null) {
    if ('min' in value && 'max' in value) {
      return `${value.min} to ${value.max}`
    }
    // Try to stringify if it's a complex object
    return JSON.stringify(value)
  }
  
  return String(value)
}

export default function SectioningSpecs({ specs, editMode = false, onChange }: SectioningSpecsProps) {
  const [editData, setEditData] = useState<EquipmentSectioning | null>(null)

  useEffect(() => {
    if (specs) {
      // Convert any JSONB range objects to text format when loading
      const processedSpecs = { ...specs }
      
      // Convert table_feed_range_mm if it's an object
      if (processedSpecs.table_feed_range_mm && typeof processedSpecs.table_feed_range_mm === 'object') {
        const range = processedSpecs.table_feed_range_mm as any
        if (range.min !== undefined && range.max !== undefined) {
          processedSpecs.table_feed_range_mm = `${range.min} to ${range.max} mm`
        }
      }
      
      // Convert table_feed_range_inches if it's an object
      if (processedSpecs.table_feed_range_inches && typeof processedSpecs.table_feed_range_inches === 'object') {
        const range = processedSpecs.table_feed_range_inches as any
        if (range.min !== undefined && range.max !== undefined) {
          processedSpecs.table_feed_range_inches = `${range.min} to ${range.max} inches`
        }
      }
      
      setEditData(processedSpecs)
    }
  }, [specs])

  const handleFieldChange = (field: keyof EquipmentSectioning, value: any) => {
    if (!editData) return
    const updated = { ...editData, [field]: value }
    setEditData(updated)
    onChange?.(updated)
  }

  const currentSpecs = editMode && editData ? editData : specs
  
  if (!currentSpecs) {
    return (
      <div className="text-sm text-gray-500 italic">
        Technical specifications are not available for this equipment.
      </div>
    )
  }

  // Check for any existing specifications (including basic fields that should exist)
  // Use explicit checks to handle string/number conversions from database
  const hasAnySpec = 
    (currentSpecs.blade_size_mm != null && currentSpecs.blade_size_mm !== '') || 
    (currentSpecs.blade_size_inches != null && currentSpecs.blade_size_inches !== '') || 
    currentSpecs.blade_type || 
    (currentSpecs.arbor_size_mm != null && currentSpecs.arbor_size_mm !== '') || 
    (currentSpecs.arbor_size_inches != null && currentSpecs.arbor_size_inches !== '') ||
    (currentSpecs.max_cutting_capacity_mm != null && currentSpecs.max_cutting_capacity_mm !== '') || 
    (currentSpecs.max_cutting_capacity_inches != null && currentSpecs.max_cutting_capacity_inches !== '') ||
    (currentSpecs.cutting_capacity_height_mm != null && currentSpecs.cutting_capacity_height_mm !== '') || 
    (currentSpecs.cutting_capacity_height_inches != null && currentSpecs.cutting_capacity_height_inches !== '') ||
    (currentSpecs.cutting_capacity_depth_mm != null && currentSpecs.cutting_capacity_depth_mm !== '') || 
    (currentSpecs.cutting_capacity_depth_inches != null && currentSpecs.cutting_capacity_depth_inches !== '') ||
    (currentSpecs.max_cutting_diameter_mm != null && currentSpecs.max_cutting_diameter_mm !== '') || 
    (currentSpecs.max_cutting_diameter_inches != null && currentSpecs.max_cutting_diameter_inches !== '') ||
    currentSpecs.automation_level || 
    (currentSpecs.cutting_speed_rpm != null && currentSpecs.cutting_speed_rpm !== '') || 
    (currentSpecs.feed_rate_mm_per_min != null && currentSpecs.feed_rate_mm_per_min !== '') ||
    (currentSpecs.motor_speed_range_rpm != null && currentSpecs.motor_speed_range_rpm !== '') || 
    (currentSpecs.motor_power_watts != null && currentSpecs.motor_power_watts !== '') || 
    (currentSpecs.motor_power_kw != null && currentSpecs.motor_power_kw !== '') ||
    currentSpecs.cooling_system || 
    (currentSpecs.cooling_unit_capacity_liters != null && currentSpecs.cooling_unit_capacity_liters !== '') || 
    (currentSpecs.cooling_unit_capacity_gallons != null && currentSpecs.cooling_unit_capacity_gallons !== '') ||
    currentSpecs.sample_holder_type || 
    currentSpecs.precision_level ||
    (currentSpecs.vertical_movement_mm != null && currentSpecs.vertical_movement_mm !== '') || 
    (currentSpecs.vertical_movement_inches != null && currentSpecs.vertical_movement_inches !== '') ||
    currentSpecs.table_dimensions_mm || 
    currentSpecs.table_dimensions_inches ||
    currentSpecs.specimen_feed_type ||
    currentSpecs.table_feed_range_mm ||
    currentSpecs.table_feed_range_inches ||
    currentSpecs.electrical_specification || 
    (currentSpecs.cutting_force_max_amps != null && currentSpecs.cutting_force_max_amps !== '') ||
    (currentSpecs.weight_kg != null) || 
    currentSpecs.dimensions_mm || 
    currentSpecs.dimensions_hood_closed_mm || 
    currentSpecs.dimensions_hood_open_mm ||
    currentSpecs.optional_accessories

  if (!hasAnySpec) {
    return (
      <div className="text-sm text-gray-500 italic">
        Technical specifications are not available for this equipment.
      </div>
    )
  }

  return (
    <div className="space-y-8">
        {/* Blade Specifications */}
        {((currentSpecs.blade_size_mm != null && currentSpecs.blade_size_mm !== '') || 
          (currentSpecs.blade_size_inches != null && currentSpecs.blade_size_inches !== '') || 
          currentSpecs.blade_type || 
          (currentSpecs.arbor_size_mm != null && currentSpecs.arbor_size_mm !== '') || 
          (currentSpecs.arbor_size_inches != null && currentSpecs.arbor_size_inches !== '') ||
          editMode) && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Blade Specifications</h3>
            </div>
            <dl className="divide-y divide-gray-200">
              {editMode ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Wheel Diameter (mm)</dt>
                    <dd>
                      <input
                        type="text"
                        value={currentSpecs.blade_size_mm || ''}
                        onChange={(e) => handleFieldChange('blade_size_mm', e.target.value || null)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="e.g., 250 mm, 3-8 inches"
                      />
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Wheel Diameter (inches)</dt>
                    <dd>
                      <input
                        type="text"
                        value={currentSpecs.blade_size_inches || ''}
                        onChange={(e) => handleFieldChange('blade_size_inches', e.target.value || null)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="e.g., 10&quot;, 3-8 inches"
                      />
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Arbor Size (mm)</dt>
                    <dd>
                      <input
                        type="text"
                        value={currentSpecs.arbor_size_mm || ''}
                        onChange={(e) => handleFieldChange('arbor_size_mm', e.target.value || null)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="e.g., 32 mm, 12.7"
                      />
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Arbor Size (inches)</dt>
                    <dd>
                      <input
                        type="text"
                        value={currentSpecs.arbor_size_inches || ''}
                        onChange={(e) => handleFieldChange('arbor_size_inches', e.target.value || null)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="e.g., 1.25&quot;, 0.5"
                      />
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Blade Type</dt>
                    <dd>
                      <input
                        type="text"
                        value={currentSpecs.blade_type || ''}
                        onChange={(e) => handleFieldChange('blade_type', e.target.value || null)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="e.g., abrasive, diamond"
                      />
                    </dd>
                  </div>
                </>
              ) : (
                <>
                  {(currentSpecs.blade_size_mm != null && currentSpecs.blade_size_mm !== '') && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                      <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Wheel Diameter (mm)</dt>
                      <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.blade_size_mm}</dd>
                    </div>
                  )}
                  {(currentSpecs.blade_size_inches != null && currentSpecs.blade_size_inches !== '') && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                      <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Wheel Diameter (inches)</dt>
                      <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.blade_size_inches}</dd>
                    </div>
                  )}
                  {(currentSpecs.arbor_size_mm != null && currentSpecs.arbor_size_mm !== '') && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                      <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Arbor Size (mm)</dt>
                      <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.arbor_size_mm}</dd>
                    </div>
                  )}
                  {(currentSpecs.arbor_size_inches != null && currentSpecs.arbor_size_inches !== '') && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                      <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Arbor Size (inches)</dt>
                      <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.arbor_size_inches}</dd>
                    </div>
                  )}
                  {currentSpecs.blade_type && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                      <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Blade Type</dt>
                      <dd className="text-sm text-gray-900 font-semibold capitalize">{currentSpecs.blade_type.replace(/-/g, ' ')}</dd>
                    </div>
                  )}
          </>
        )}
            </dl>
          </div>
        )}

        {/* Cutting Capacity */}
      {((currentSpecs.max_cutting_capacity_mm || currentSpecs.max_cutting_capacity_inches ||
        currentSpecs.cutting_capacity_height_mm || currentSpecs.cutting_capacity_height_inches ||
        currentSpecs.cutting_capacity_depth_mm || currentSpecs.cutting_capacity_depth_inches ||
        currentSpecs.max_cutting_diameter_mm || currentSpecs.max_cutting_diameter_inches) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Cutting Capacity</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Capacity Height (mm)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cutting_capacity_height_mm || ''}
                      onChange={(e) => handleFieldChange('cutting_capacity_height_mm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 50 mm, 50"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Capacity Depth (mm)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cutting_capacity_depth_mm || ''}
                      onChange={(e) => handleFieldChange('cutting_capacity_depth_mm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 100 mm, 100"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Max Cutting Diameter (mm)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.max_cutting_diameter_mm || ''}
                      onChange={(e) => handleFieldChange('max_cutting_diameter_mm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 65 mm, 50"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {(currentSpecs.cutting_capacity_height_mm || currentSpecs.cutting_capacity_depth_mm) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Capacity (H × D)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.cutting_capacity_height_mm && currentSpecs.cutting_capacity_depth_mm
                        ? `${currentSpecs.cutting_capacity_height_mm} × ${currentSpecs.cutting_capacity_depth_mm}`
                        : currentSpecs.cutting_capacity_height_mm
                        ? `${currentSpecs.cutting_capacity_height_mm} (H)`
                        : currentSpecs.cutting_capacity_depth_mm
                        ? `${currentSpecs.cutting_capacity_depth_mm} (D)`
                        : 'N/A'}
                    </dd>
                  </div>
                )}
                {(currentSpecs.cutting_capacity_height_inches || currentSpecs.cutting_capacity_depth_inches) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Capacity (H × D)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.cutting_capacity_height_inches && currentSpecs.cutting_capacity_depth_inches
                        ? `${currentSpecs.cutting_capacity_height_inches} × ${currentSpecs.cutting_capacity_depth_inches}`
                        : currentSpecs.cutting_capacity_height_inches
                        ? `${currentSpecs.cutting_capacity_height_inches} (H)`
                        : currentSpecs.cutting_capacity_depth_inches
                        ? `${currentSpecs.cutting_capacity_depth_inches} (D)`
                        : 'N/A'}
                    </dd>
                  </div>
                )}
                {currentSpecs.max_cutting_diameter_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Max Cutting Diameter (mm)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.max_cutting_diameter_mm}</dd>
                  </div>
                )}
                {currentSpecs.max_cutting_diameter_inches && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Max Cutting Diameter (inches)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.max_cutting_diameter_inches}</dd>
                  </div>
                )}
                {currentSpecs.max_cutting_capacity_mm && !currentSpecs.cutting_capacity_height_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Max Cutting Capacity (mm)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.max_cutting_capacity_mm}</dd>
                  </div>
                )}
                {currentSpecs.max_cutting_capacity_inches && !currentSpecs.cutting_capacity_height_inches && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Max Cutting Capacity (inches)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.max_cutting_capacity_inches}</dd>
                  </div>
                )}
              </>
            )}
          </dl>
        </div>
      )}

      {/* Machine Movement & Table */}
      {(currentSpecs.vertical_movement_mm || currentSpecs.vertical_movement_inches ||
        currentSpecs.table_dimensions_mm || currentSpecs.table_dimensions_inches ||
        currentSpecs.specimen_feed_type || currentSpecs.table_feed_range_mm || currentSpecs.table_feed_range_inches ||
        editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Machine Movement & Table</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Vertical Movement (Z-axis) (mm)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.vertical_movement_mm || ''}
                      onChange={(e) => handleFieldChange('vertical_movement_mm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 82 mm, 82"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Vertical Movement (Z-axis) (inches)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.vertical_movement_inches || ''}
                      onChange={(e) => handleFieldChange('vertical_movement_inches', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 3.25&quot;, 3.25"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Specimen Feed Type</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.specimen_feed_type || ''}
                      onChange={(e) => handleFieldChange('specimen_feed_type', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., table-feed, gravity-feed"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Table Feed Range (mm)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.table_feed_range_mm || ''}
                      onChange={(e) => handleFieldChange('table_feed_range_mm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 75 to 175 mm"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Table Feed Range (inches)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.table_feed_range_inches || ''}
                      onChange={(e) => handleFieldChange('table_feed_range_inches', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 3 to 7 inches"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {currentSpecs.vertical_movement_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Vertical Movement (Z-axis) (mm)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.vertical_movement_mm}</dd>
                  </div>
                )}
                {currentSpecs.vertical_movement_inches && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Vertical Movement (Z-axis) (inches)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.vertical_movement_inches}</dd>
                  </div>
                )}
          </>
        )}
            {currentSpecs.table_dimensions_mm && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">T-slotted Table Dimensions (mm)</dt>
                <dd className="text-sm text-gray-900 font-semibold">
                  {currentSpecs.table_dimensions_mm.width && currentSpecs.table_dimensions_mm.depth
                    ? `${currentSpecs.table_dimensions_mm.width} × ${currentSpecs.table_dimensions_mm.depth} mm`
                    : currentSpecs.table_dimensions_mm.width
                    ? `${currentSpecs.table_dimensions_mm.width} mm (W)`
                    : currentSpecs.table_dimensions_mm.depth
                    ? `${currentSpecs.table_dimensions_mm.depth} mm (D)`
                    : 'N/A'}
                </dd>
              </div>
            )}
            {currentSpecs.table_dimensions_inches && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">T-slotted Table Dimensions (inches)</dt>
                <dd className="text-sm text-gray-900 font-semibold">
                  {currentSpecs.table_dimensions_inches.width && currentSpecs.table_dimensions_inches.depth
                    ? `${currentSpecs.table_dimensions_inches.width} × ${currentSpecs.table_dimensions_inches.depth}"`
                    : currentSpecs.table_dimensions_inches.width
                    ? `${currentSpecs.table_dimensions_inches.width}" (W)`
                    : currentSpecs.table_dimensions_inches.depth
                    ? `${currentSpecs.table_dimensions_inches.depth}" (D)`
                    : 'N/A'}
                </dd>
              </div>
            )}
            {currentSpecs.specimen_feed_type && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Specimen Feed</dt>
                <dd className="text-sm text-gray-900 font-semibold capitalize">{currentSpecs.specimen_feed_type.replace(/-/g, ' ')}</dd>
              </div>
            )}
            {currentSpecs.table_feed_range_mm && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Table Feed Range (mm)</dt>
                <dd className="text-sm text-gray-900 font-semibold">{formatRangeValue(currentSpecs.table_feed_range_mm)}</dd>
              </div>
            )}
            {currentSpecs.table_feed_range_inches && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Table Feed Range (inches)</dt>
                <dd className="text-sm text-gray-900 font-semibold">{formatRangeValue(currentSpecs.table_feed_range_inches)}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Motor & Performance */}
      {(currentSpecs.motor_power_watts || currentSpecs.motor_power_kw || currentSpecs.motor_speed_range_rpm ||
        currentSpecs.cutting_speed_rpm || currentSpecs.feed_rate_mm_per_min ||
        currentSpecs.automation_level || currentSpecs.cutting_force_max_amps || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Motor & Performance</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Motor Power (Watts)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.motor_power_watts || ''}
                      onChange={(e) => handleFieldChange('motor_power_watts', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 125W, 2200W"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Motor Power (kW)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.motor_power_kw || ''}
                      onChange={(e) => handleFieldChange('motor_power_kw', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 2.2 kW, 2.2"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Motor Speed Range (RPM)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.motor_speed_range_rpm || ''}
                      onChange={(e) => handleFieldChange('motor_speed_range_rpm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 200-1500 rpm continuously adjustable"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Speed (RPM)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cutting_speed_rpm || ''}
                      onChange={(e) => handleFieldChange('cutting_speed_rpm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 1000-3000 rpm"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Feed Rate (mm/min)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.feed_rate_mm_per_min || ''}
                      onChange={(e) => handleFieldChange('feed_rate_mm_per_min', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 50 mm/min"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Wheel Feed (Automation Level)</dt>
                  <dd>
                    <select
                      value={currentSpecs.automation_level || ''}
                      onChange={(e) => handleFieldChange('automation_level', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="manual">Manual</option>
                      <option value="semi-automated">Semi-Automated</option>
                      <option value="automated">Automated</option>
                    </select>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Force (Current Settings)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cutting_force_max_amps || ''}
                      onChange={(e) => handleFieldChange('cutting_force_max_amps', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 15 amps (max), 15A"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {currentSpecs.motor_power_kw && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Motor Power</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.motor_power_kw}
                      {currentSpecs.motor_power_watts && ` (${currentSpecs.motor_power_watts})`}
                    </dd>
                  </div>
                )}
                {!currentSpecs.motor_power_kw && currentSpecs.motor_power_watts && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Motor Power</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.motor_power_watts}</dd>
                  </div>
                )}
                {currentSpecs.motor_speed_range_rpm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Motor Speed Range</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.motor_speed_range_rpm}
                    </dd>
                  </div>
                )}
                {!currentSpecs.motor_speed_range_rpm && currentSpecs.cutting_speed_rpm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Speed</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.cutting_speed_rpm}</dd>
                  </div>
                )}
                {currentSpecs.feed_rate_mm_per_min && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Feed Rate</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.feed_rate_mm_per_min}</dd>
                  </div>
                )}
                {currentSpecs.automation_level && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Wheel Feed</dt>
                    <dd className="text-sm text-gray-900 font-semibold capitalize">{currentSpecs.automation_level.replace(/-/g, ' ')}</dd>
                  </div>
                )}
                {currentSpecs.cutting_force_max_amps && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cutting Force (Current Settings)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.cutting_force_max_amps}</dd>
                  </div>
                )}
          </>
        )}
          </dl>
        </div>
      )}

      {/* Electrical & Cooling */}
      {(currentSpecs.electrical_specification || currentSpecs.cooling_system ||
        currentSpecs.cooling_unit_capacity_liters || currentSpecs.cooling_unit_capacity_gallons || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Electrical & Cooling</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Electrical Specification</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.electrical_specification || ''}
                      onChange={(e) => handleFieldChange('electrical_specification', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 110V/220V (50/60 Hz) single phase"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling System</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cooling_system || ''}
                      onChange={(e) => handleFieldChange('cooling_system', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., dual-nozzle-pump, water, air"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling Unit Capacity (Liters)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cooling_unit_capacity_liters || ''}
                      onChange={(e) => handleFieldChange('cooling_unit_capacity_liters', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 53 liters, 53L"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling Unit Capacity (Gallons)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cooling_unit_capacity_gallons || ''}
                      onChange={(e) => handleFieldChange('cooling_unit_capacity_gallons', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 14 gallons, 14 gal"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {currentSpecs.electrical_specification && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Electrical Specification</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.electrical_specification}</dd>
                  </div>
                )}
                {currentSpecs.cooling_system && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling System</dt>
                    <dd className="text-sm text-gray-900 font-semibold capitalize">{currentSpecs.cooling_system}</dd>
                  </div>
                )}
                {currentSpecs.cooling_unit_capacity_liters && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling Unit Capacity</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.cooling_unit_capacity_liters}
                      {currentSpecs.cooling_unit_capacity_gallons && ` (${currentSpecs.cooling_unit_capacity_gallons})`}
                    </dd>
                  </div>
                )}
                {!currentSpecs.cooling_unit_capacity_liters && currentSpecs.cooling_unit_capacity_gallons && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling Unit Capacity</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.cooling_unit_capacity_gallons}</dd>
                  </div>
                )}
          </>
        )}
          </dl>
        </div>
      )}

      {/* Dimensions & Weight */}
      {(currentSpecs.dimensions_mm || currentSpecs.dimensions_hood_closed_mm || currentSpecs.dimensions_hood_open_mm || currentSpecs.weight_kg || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Dimensions & Weight</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (W×D×H) - Hood Closed (mm)</dt>
                  <dd className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="W"
                        value={currentSpecs.dimensions_hood_closed_mm?.width || ''}
                        onChange={(e) => {
                          const width = e.target.value ? parseFloat(e.target.value) : null
                          handleFieldChange('dimensions_hood_closed_mm', {
                            ...(currentSpecs.dimensions_hood_closed_mm || {}),
                            width,
                          })
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="D"
                        value={currentSpecs.dimensions_hood_closed_mm?.depth || ''}
                        onChange={(e) => {
                          const depth = e.target.value ? parseFloat(e.target.value) : null
                          handleFieldChange('dimensions_hood_closed_mm', {
                            ...(currentSpecs.dimensions_hood_closed_mm || {}),
                            depth,
                          })
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="H"
                        value={currentSpecs.dimensions_hood_closed_mm?.height || ''}
                        onChange={(e) => {
                          const height = e.target.value ? parseFloat(e.target.value) : null
                          handleFieldChange('dimensions_hood_closed_mm', {
                            ...(currentSpecs.dimensions_hood_closed_mm || {}),
                            height,
                          })
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </div>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (W×D×H) - Hood Open (mm)</dt>
                  <dd className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="W"
                        value={currentSpecs.dimensions_hood_open_mm?.width || ''}
                        onChange={(e) => {
                          const width = e.target.value ? parseFloat(e.target.value) : null
                          handleFieldChange('dimensions_hood_open_mm', {
                            ...(currentSpecs.dimensions_hood_open_mm || {}),
                            width,
                          })
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="D"
                        value={currentSpecs.dimensions_hood_open_mm?.depth || ''}
                        onChange={(e) => {
                          const depth = e.target.value ? parseFloat(e.target.value) : null
                          handleFieldChange('dimensions_hood_open_mm', {
                            ...(currentSpecs.dimensions_hood_open_mm || {}),
                            depth,
                          })
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="H"
                        value={currentSpecs.dimensions_hood_open_mm?.height || ''}
                        onChange={(e) => {
                          const height = e.target.value ? parseFloat(e.target.value) : null
                          handleFieldChange('dimensions_hood_open_mm', {
                            ...(currentSpecs.dimensions_hood_open_mm || {}),
                            height,
                          })
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </div>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Weight (kg)</dt>
                  <dd>
                    <input
                      type="number"
                      step="0.1"
                      value={currentSpecs.weight_kg || ''}
                      onChange={(e) => handleFieldChange('weight_kg', e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 30"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {currentSpecs.dimensions_hood_closed_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (W×D×H) - Hood Closed (mm)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.dimensions_hood_closed_mm.width && currentSpecs.dimensions_hood_closed_mm.depth && currentSpecs.dimensions_hood_closed_mm.height
                        ? `${currentSpecs.dimensions_hood_closed_mm.width} × ${currentSpecs.dimensions_hood_closed_mm.depth} × ${currentSpecs.dimensions_hood_closed_mm.height} mm`
                        : 'N/A'}
                    </dd>
                  </div>
                )}
                {currentSpecs.dimensions_hood_open_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (W×D×H) - Hood Open (mm)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.dimensions_hood_open_mm.width && currentSpecs.dimensions_hood_open_mm.depth && currentSpecs.dimensions_hood_open_mm.height
                        ? `${currentSpecs.dimensions_hood_open_mm.width} × ${currentSpecs.dimensions_hood_open_mm.depth} × ${currentSpecs.dimensions_hood_open_mm.height} mm`
                        : 'N/A'}
                    </dd>
                  </div>
                )}
                {!currentSpecs.dimensions_hood_closed_mm && !currentSpecs.dimensions_hood_open_mm && currentSpecs.dimensions_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (mm)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.dimensions_mm.width && `${currentSpecs.dimensions_mm.width} × `}
                      {currentSpecs.dimensions_mm.height && `${currentSpecs.dimensions_mm.height} × `}
                      {currentSpecs.dimensions_mm.depth && `${currentSpecs.dimensions_mm.depth}`}
                      {currentSpecs.dimensions_mm.width || currentSpecs.dimensions_mm.height || currentSpecs.dimensions_mm.depth ? ' mm' : 'N/A'}
            </dd>
                  </div>
                )}
                {currentSpecs.weight_kg && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Weight</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.weight_kg} kg</dd>
                  </div>
                )}
          </>
        )}
      </dl>
        </div>
      )}

      {/* Features */}
      {(currentSpecs.sample_holder_type || currentSpecs.precision_level) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Features</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {currentSpecs.sample_holder_type && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Sample Holder</dt>
                <dd className="text-sm text-gray-900 font-semibold capitalize">{currentSpecs.sample_holder_type}</dd>
              </div>
            )}
            {currentSpecs.precision_level && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Precision Level</dt>
                <dd className="text-sm text-gray-900 font-semibold capitalize">{currentSpecs.precision_level.replace(/-/g, ' ')}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Optional Accessories */}
      {currentSpecs.optional_accessories && currentSpecs.optional_accessories.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Optional Accessories</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {currentSpecs.optional_accessories.map((accessory, index) => (
              <li key={index} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">{accessory.item_id}</span>
                  {accessory.name && <span className="text-gray-700"> - {accessory.name}</span>}
                  {accessory.description && (
                    <p className="text-gray-600 mt-1">{accessory.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

