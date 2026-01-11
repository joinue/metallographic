import type { EquipmentMounting } from '@/lib/supabase'
import { useState, useEffect } from 'react'

interface MountingSpecsProps {
  specs: EquipmentMounting | null | undefined
  editMode?: boolean
  onChange?: (data: EquipmentMounting) => void
}

export default function MountingSpecs({ specs, editMode = false, onChange }: MountingSpecsProps) {
  const [editData, setEditData] = useState<EquipmentMounting | null>(null)

  useEffect(() => {
    if (specs) {
      setEditData({ ...specs })
    }
  }, [specs])

  const handleFieldChange = (field: keyof EquipmentMounting, value: any) => {
    if (!editData) return
    const updated = { ...editData, [field]: value }
    setEditData(updated)
    onChange?.(updated)
  }

  const handleJSONBChange = (field: keyof EquipmentMounting, key: string, value: string) => {
    if (!editData) return
    const current = (editData[field] as Record<string, number> | null) || {}
    const updated = { ...current, [key]: value ? parseFloat(value) || 0 : undefined }
    // Remove undefined keys
    Object.keys(updated).forEach(k => {
      if (updated[k] === undefined) delete updated[k]
    })
    const final = Object.keys(updated).length > 0 ? updated : null
    handleFieldChange(field, final)
  }

  const currentSpecs = editMode && editData ? editData : specs

  if (!currentSpecs) {
    return (
      <div className="text-sm text-gray-500 italic">
        Technical specifications are not available for this equipment.
      </div>
    )
  }

  // Check if this is compression mounting, UV curing, or pressure mounting based on available fields
  // Note: mount_sizes is shared with vacuum mounting, so we need compression-specific fields
  const isCompressionMounting = 
    currentSpecs.control || 
    currentSpecs.mold_cylinders || 
    currentSpecs.force_type || 
    currentSpecs.max_force_mpa || 
    currentSpecs.max_force_psi ||
    currentSpecs.incoming_pressure_max_psi || 
    currentSpecs.heater_specification

  const isUVCuring = 
    currentSpecs.sample_support_surface_dimension_mm || currentSpecs.uv_curing_time_min ||
    currentSpecs.uv_wavelength_nm

  const isPressureMounting = 
    currentSpecs.operating_pressure_bar || currentSpecs.safety_valve_overflow_pressure_bar

  const isVacuumMounting = 
    currentSpecs.bell_jar_description || 
    (currentSpecs.vacuum_pump_required === true) ||
    currentSpecs.vacuum_level_mbar

  const isCoolingTank = 
    currentSpecs.pump_flow_rate_gpm || currentSpecs.tank_volume_gallons ||
    currentSpecs.cooling_system_description === 'Programmable'

  const hasAnySpec = 
    isCompressionMounting || isUVCuring || isPressureMounting || isVacuumMounting || isCoolingTank ||
    currentSpecs.mounting_type || currentSpecs.max_pressure_psi || currentSpecs.max_pressure_mpa ||
    currentSpecs.max_temperature_celsius || currentSpecs.min_temperature_celsius ||
    currentSpecs.heating_capability !== null || currentSpecs.cooling_capability !== null ||
    currentSpecs.chamber_size_mm || currentSpecs.max_sample_size_mm ||
    currentSpecs.vacuum_level_mbar || currentSpecs.vacuum_pump_required !== null ||
    currentSpecs.programmable_cycles !== null || currentSpecs.digital_controls !== null ||
    currentSpecs.safety_features || currentSpecs.power_consumption_watts ||
    currentSpecs.weight_kg || currentSpecs.weight_lbs || currentSpecs.dimensions_mm ||
    currentSpecs.dimensions_inches || currentSpecs.optional_accessories ||
    editMode

  if (!hasAnySpec) {
    return (
      <div className="text-sm text-gray-500 italic">
        Technical specifications are not available for this equipment.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Compression Mounting Specifications */}
      {((isCompressionMounting && (
        currentSpecs.control ||
        currentSpecs.mold_cylinders ||
        currentSpecs.force_type ||
        currentSpecs.max_force_mpa ||
        currentSpecs.max_force_psi ||
        currentSpecs.incoming_pressure_max_psi ||
        currentSpecs.heater_specification ||
        currentSpecs.max_temperature_celsius ||
        currentSpecs.max_temperature_fahrenheit ||
        currentSpecs.cooling_system_description
      )) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Compression Mounting Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Control</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.control || ''}
                      onChange={(e) => handleFieldChange('control', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., Touch screen"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Mount Sizes</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.mount_sizes || ''}
                      onChange={(e) => handleFieldChange('mount_sizes', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 1, 1.25, 1.5, and 2-inch (25, 30, 40 mm)"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Mold Cylinders</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.mold_cylinders || ''}
                      onChange={(e) => handleFieldChange('mold_cylinders', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., Single, Dual"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Force Type</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.force_type || ''}
                      onChange={(e) => handleFieldChange('force_type', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., Hydraulic, Pneumatic"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Maximum Force (MPa)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.max_force_mpa || ''}
                      onChange={(e) => handleFieldChange('max_force_mpa', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 32 MPa"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Maximum Force (PSI)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.max_force_psi || ''}
                      onChange={(e) => handleFieldChange('max_force_psi', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 4500 psi"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Incoming Pressure (Max. PSI)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.incoming_pressure_max_psi || ''}
                      onChange={(e) => handleFieldChange('incoming_pressure_max_psi', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., Max. 95 psi"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Heater Specification</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.heater_specification || ''}
                      onChange={(e) => handleFieldChange('heater_specification', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 1000 Watts (110V 15 amp), 2000 Watts (220V 10 amp)"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Maximum Temperature (°C)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.max_temperature_celsius || ''}
                      onChange={(e) => handleFieldChange('max_temperature_celsius', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 200°C"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Maximum Temperature (°F)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.max_temperature_fahrenheit || ''}
                      onChange={(e) => handleFieldChange('max_temperature_fahrenheit', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 392°F"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling System</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cooling_system_description || ''}
                      onChange={(e) => handleFieldChange('cooling_system_description', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., Water with manual, temperature, or time control"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {currentSpecs.control && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Control</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.control}</dd>
                  </div>
                )}
                {currentSpecs.mount_sizes && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Mount Sizes</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.mount_sizes}</dd>
                  </div>
                )}
                {currentSpecs.mold_cylinders && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Mold Cylinders</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.mold_cylinders}</dd>
                  </div>
                )}
                {currentSpecs.force_type && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Force</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.force_type}</dd>
                  </div>
                )}
                {(currentSpecs.max_force_mpa || currentSpecs.max_force_psi) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Maximum Force</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.max_force_mpa && currentSpecs.max_force_psi
                        ? `${currentSpecs.max_force_mpa} (${currentSpecs.max_force_psi})`
                        : currentSpecs.max_force_mpa || currentSpecs.max_force_psi}
                    </dd>
                  </div>
                )}
                {currentSpecs.incoming_pressure_max_psi && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Incoming Pressure</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.incoming_pressure_max_psi}</dd>
                  </div>
                )}
                {currentSpecs.heater_specification && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Heater Specification</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.heater_specification}</dd>
                  </div>
                )}
                {(currentSpecs.max_temperature_celsius || currentSpecs.max_temperature_fahrenheit) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Maximum Temperature</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.max_temperature_fahrenheit && currentSpecs.max_temperature_celsius
                        ? `${currentSpecs.max_temperature_fahrenheit} (${currentSpecs.max_temperature_celsius})`
                        : currentSpecs.max_temperature_fahrenheit || currentSpecs.max_temperature_celsius}
                    </dd>
                  </div>
                )}
                {currentSpecs.cooling_system_description && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling System</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.cooling_system_description}</dd>
                  </div>
                )}
          </>
        )}
          </dl>
        </div>
      )}

      {/* UV Curing Specifications */}
      {((isUVCuring && (
        currentSpecs.sample_support_surface_dimension_mm ||
        currentSpecs.sample_support_surface_max_height_mm ||
        currentSpecs.sample_support_surface_max_height_inches ||
        currentSpecs.uv_curing_time_min ||
        currentSpecs.uv_wavelength_nm ||
        currentSpecs.voltage_frequency
      )) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">UV Curing Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Sample Support Surface Dimension (mm)</dt>
                  <dd className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Width"
                        value={currentSpecs.sample_support_surface_dimension_mm?.width || ''}
                        onChange={(e) => handleJSONBChange('sample_support_surface_dimension_mm', 'width', e.target.value)}
                        className="w-1/2 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Depth"
                        value={currentSpecs.sample_support_surface_dimension_mm?.depth || ''}
                        onChange={(e) => handleJSONBChange('sample_support_surface_dimension_mm', 'depth', e.target.value)}
                        className="w-1/2 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </div>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Sample Support Surface Max. Height (mm)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.sample_support_surface_max_height_mm || ''}
                      onChange={(e) => handleFieldChange('sample_support_surface_max_height_mm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 50 mm"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">UV Curing Time</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.uv_curing_time_min || ''}
                      onChange={(e) => handleFieldChange('uv_curing_time_min', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 0-100 min"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">UV Wavelength</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.uv_wavelength_nm || ''}
                      onChange={(e) => handleFieldChange('uv_wavelength_nm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 365nm"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Voltage/Frequency</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.voltage_frequency || ''}
                      onChange={(e) => handleFieldChange('voltage_frequency', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 85-240V, 50/60Hz (1Ph/N/PE)"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {currentSpecs.sample_support_surface_dimension_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Sample Support Surface (Dimension)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.sample_support_surface_dimension_mm.width && currentSpecs.sample_support_surface_dimension_mm.depth
                        ? `${currentSpecs.sample_support_surface_dimension_mm.width} × ${currentSpecs.sample_support_surface_dimension_mm.depth} mm`
                        : 'N/A'}
                      {currentSpecs.sample_support_surface_dimension_inches?.width && currentSpecs.sample_support_surface_dimension_inches?.depth && (
                        <span className="text-gray-600 ml-2">
                          ({currentSpecs.sample_support_surface_dimension_inches.width} × {currentSpecs.sample_support_surface_dimension_inches.depth}-inch)
                        </span>
                      )}
                    </dd>
                  </div>
                )}
                {(currentSpecs.sample_support_surface_max_height_mm || currentSpecs.sample_support_surface_max_height_inches) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Sample Support Surface (Max. Height)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.sample_support_surface_max_height_inches && currentSpecs.sample_support_surface_max_height_mm
                        ? `${currentSpecs.sample_support_surface_max_height_inches} (${currentSpecs.sample_support_surface_max_height_mm})`
                        : currentSpecs.sample_support_surface_max_height_inches || currentSpecs.sample_support_surface_max_height_mm}
                    </dd>
                  </div>
                )}
                {currentSpecs.uv_curing_time_min && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">UV Curing Time</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.uv_curing_time_min}</dd>
                  </div>
                )}
                {currentSpecs.uv_wavelength_nm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">UV Wavelength</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.uv_wavelength_nm}</dd>
                  </div>
                )}
                {currentSpecs.voltage_frequency && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Voltage/Frequency</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.voltage_frequency}</dd>
                  </div>
                )}
          </>
        )}
          </dl>
        </div>
      )}

      {/* Pressure Mounting Specifications */}
      {(isPressureMounting || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Pressure Mounting Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Operating Pressure</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.operating_pressure_bar || ''}
                      onChange={(e) => handleFieldChange('operating_pressure_bar', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 2.0 bar"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Safety Valve Overflow Pressure</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.safety_valve_overflow_pressure_bar || ''}
                      onChange={(e) => handleFieldChange('safety_valve_overflow_pressure_bar', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 2.8～3.3 bar"
                    />
                  </dd>
                </div>
                {currentSpecs.chamber_size_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Chamber Size (mm)</dt>
                    <dd className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Width"
                          value={currentSpecs.chamber_size_mm?.width || ''}
                          onChange={(e) => handleJSONBChange('chamber_size_mm', 'width', e.target.value)}
                          className="w-1/2 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Depth"
                          value={currentSpecs.chamber_size_mm?.depth || ''}
                          onChange={(e) => handleJSONBChange('chamber_size_mm', 'depth', e.target.value)}
                          className="w-1/2 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
            </dd>
                  </div>
                )}
              </>
            ) : (
              <>
                {currentSpecs.operating_pressure_bar && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Operating Pressure</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.operating_pressure_bar}</dd>
                  </div>
                )}
                {currentSpecs.safety_valve_overflow_pressure_bar && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Safety Valve Overflow Pressure</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.safety_valve_overflow_pressure_bar}</dd>
                  </div>
                )}
                {currentSpecs.chamber_size_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Chamber Size</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.chamber_size_mm.width && currentSpecs.chamber_size_mm.depth
                        ? `${currentSpecs.chamber_size_mm.width} × ${currentSpecs.chamber_size_mm.depth} mm`
                        : currentSpecs.chamber_size_mm.diameter
                        ? `${currentSpecs.chamber_size_mm.diameter} mm (diameter)`
                        : 'N/A'}
            </dd>
                  </div>
                )}
              </>
            )}
          </dl>
        </div>
      )}

      {/* Vacuum Mounting Specifications */}
      {(isVacuumMounting || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Vacuum Mounting Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Mount Sizes</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.mount_sizes || ''}
                      onChange={(e) => handleFieldChange('mount_sizes', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 1, 1.25, 1.5, and 2-inch (25, 30, 40, and 50 mm)"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Bell Jar</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.bell_jar_description || ''}
                      onChange={(e) => handleFieldChange('bell_jar_description', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., Tilting, retractable pouring arm"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Vacuum Pump Required</dt>
                  <dd>
                    <select
                      value={currentSpecs.vacuum_pump_required === null ? '' : currentSpecs.vacuum_pump_required ? 'true' : 'false'}
                      onChange={(e) => handleFieldChange('vacuum_pump_required', e.target.value === '' ? null : e.target.value === 'true')}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="">Not specified</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Vacuum Level (mbar)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.vacuum_level_mbar || ''}
                      onChange={(e) => handleFieldChange('vacuum_level_mbar', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 0.1 mbar"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {currentSpecs.mount_sizes && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Mount Sizes</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.mount_sizes}</dd>
                  </div>
                )}
                {currentSpecs.bell_jar_description && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Bell Jar</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.bell_jar_description}</dd>
                  </div>
                )}
                {(currentSpecs.vacuum_pump_required === true || (currentSpecs.vacuum_pump_required === false && isVacuumMounting)) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Vacuum Pump</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.vacuum_pump_required ? 'Required' : 'Not required'}
                      {currentSpecs.vacuum_pump_required && ' (sold separately)'}
                    </dd>
                  </div>
                )}
                {currentSpecs.vacuum_level_mbar && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Vacuum Level</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.vacuum_level_mbar}</dd>
                  </div>
                )}
              </>
            )}
          </dl>
        </div>
      )}

      {/* Cooling Tank Specifications */}
      {(isCoolingTank || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Cooling Tank Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.cooling_system_description || ''}
                      onChange={(e) => handleFieldChange('cooling_system_description', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., Programmable"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Pump Flow Rate (GPM)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.pump_flow_rate_gpm || ''}
                      onChange={(e) => handleFieldChange('pump_flow_rate_gpm', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 1.3 GPM"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Pump Flow Rate (L/min)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.pump_flow_rate_liters_per_min || ''}
                      onChange={(e) => handleFieldChange('pump_flow_rate_liters_per_min', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 5 L/min"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Tank Volume (gallons)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.tank_volume_gallons || ''}
                      onChange={(e) => handleFieldChange('tank_volume_gallons', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 14 gallons"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Tank Volume (L)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.tank_volume_liters || ''}
                      onChange={(e) => handleFieldChange('tank_volume_liters', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 53 L"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Electrical Specification</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.electrical_specification || ''}
                      onChange={(e) => handleFieldChange('electrical_specification', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 110 / 220V (50/60 Hz)"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {currentSpecs.cooling_system_description && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Cooling</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.cooling_system_description}</dd>
                  </div>
                )}
                {(currentSpecs.pump_flow_rate_gpm || currentSpecs.pump_flow_rate_liters_per_min) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Pump</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.pump_flow_rate_gpm && currentSpecs.pump_flow_rate_liters_per_min
                        ? `${currentSpecs.pump_flow_rate_gpm} (${currentSpecs.pump_flow_rate_liters_per_min})`
                        : currentSpecs.pump_flow_rate_gpm || currentSpecs.pump_flow_rate_liters_per_min}
                    </dd>
                  </div>
                )}
                {(currentSpecs.tank_volume_gallons || currentSpecs.tank_volume_liters) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Tank Volume</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.tank_volume_gallons && currentSpecs.tank_volume_liters
                        ? `${currentSpecs.tank_volume_gallons} (${currentSpecs.tank_volume_liters})`
                        : currentSpecs.tank_volume_gallons || currentSpecs.tank_volume_liters}
            </dd>
                  </div>
                )}
                {currentSpecs.electrical_specification && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Electrical Specification</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{currentSpecs.electrical_specification}</dd>
                  </div>
                )}
              </>
            )}
          </dl>
        </div>
      )}

      {/* Dimensions & Weight */}
      {((currentSpecs.dimensions_mm || currentSpecs.dimensions_inches || 
         currentSpecs.dimensions_closed_mm || currentSpecs.dimensions_closed_inches ||
         currentSpecs.dimensions_open_mm || currentSpecs.dimensions_open_inches ||
         currentSpecs.weight_kg || currentSpecs.weight_lbs) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Dimensions & Weight</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <>
                {(currentSpecs.dimensions_closed_mm || currentSpecs.dimensions_closed_inches) && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                      <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions Closed (mm)</dt>
                      <dd className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="W"
                            value={currentSpecs.dimensions_closed_mm?.width || ''}
                            onChange={(e) => handleJSONBChange('dimensions_closed_mm', 'width', e.target.value)}
                            className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <input
                            type="number"
                            placeholder="D"
                            value={currentSpecs.dimensions_closed_mm?.depth || ''}
                            onChange={(e) => handleJSONBChange('dimensions_closed_mm', 'depth', e.target.value)}
                            className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <input
                            type="number"
                            placeholder="H"
                            value={currentSpecs.dimensions_closed_mm?.height || ''}
                            onChange={(e) => handleJSONBChange('dimensions_closed_mm', 'height', e.target.value)}
                            className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                      <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions Open (mm)</dt>
                      <dd className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="W"
                            value={currentSpecs.dimensions_open_mm?.width || ''}
                            onChange={(e) => handleJSONBChange('dimensions_open_mm', 'width', e.target.value)}
                            className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <input
                            type="number"
                            placeholder="D"
                            value={currentSpecs.dimensions_open_mm?.depth || ''}
                            onChange={(e) => handleJSONBChange('dimensions_open_mm', 'depth', e.target.value)}
                            className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <input
                            type="number"
                            placeholder="H"
                            value={currentSpecs.dimensions_open_mm?.height || ''}
                            onChange={(e) => handleJSONBChange('dimensions_open_mm', 'height', e.target.value)}
                            className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                      </dd>
                    </div>
          </>
        )}
                {!currentSpecs.dimensions_closed_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (mm)</dt>
                    <dd className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="W"
                          value={currentSpecs.dimensions_mm?.width || ''}
                          onChange={(e) => handleJSONBChange('dimensions_mm', 'width', e.target.value)}
                          className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                        <input
                          type="number"
                          placeholder="D"
                          value={currentSpecs.dimensions_mm?.depth || ''}
                          onChange={(e) => handleJSONBChange('dimensions_mm', 'depth', e.target.value)}
                          className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                        <input
                          type="number"
                          placeholder="H"
                          value={currentSpecs.dimensions_mm?.height || ''}
                          onChange={(e) => handleJSONBChange('dimensions_mm', 'height', e.target.value)}
                          className="w-1/3 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                    </dd>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Weight (kg)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.weight_kg || ''}
                      onChange={(e) => handleFieldChange('weight_kg', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 50 kg"
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Weight (lbs)</dt>
                  <dd>
                    <input
                      type="text"
                      value={currentSpecs.weight_lbs || ''}
                      onChange={(e) => handleFieldChange('weight_lbs', e.target.value || null)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., 108 lbs"
                    />
                  </dd>
                </div>
              </>
            ) : (
              <>
                {(currentSpecs.dimensions_closed_mm || currentSpecs.dimensions_closed_inches) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (W×D×H)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.dimensions_closed_mm && (
                        <div>
                          Closed: {currentSpecs.dimensions_closed_mm.width} × {currentSpecs.dimensions_closed_mm.depth} × {currentSpecs.dimensions_closed_mm.height} mm
                        </div>
                      )}
                      {currentSpecs.dimensions_closed_inches && (
                        <div className="text-gray-600">
                          ({currentSpecs.dimensions_closed_inches.width} × {currentSpecs.dimensions_closed_inches.depth} × {currentSpecs.dimensions_closed_inches.height}-inch)
                        </div>
                      )}
                      {currentSpecs.dimensions_open_mm && (
                        <div className="mt-1">
                          Open: {currentSpecs.dimensions_open_mm.width} × {currentSpecs.dimensions_open_mm.depth} × {currentSpecs.dimensions_open_mm.height} mm
                        </div>
                      )}
                      {currentSpecs.dimensions_open_inches && (
                        <div className="text-gray-600">
                          ({currentSpecs.dimensions_open_inches.width} × {currentSpecs.dimensions_open_inches.depth} × {currentSpecs.dimensions_open_inches.height}-inch)
                        </div>
                      )}
                    </dd>
                  </div>
                )}
                {!currentSpecs.dimensions_closed_mm && currentSpecs.dimensions_mm && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (W×D×H)</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.dimensions_mm.width} × {currentSpecs.dimensions_mm.depth} × {currentSpecs.dimensions_mm.height} mm
                      {currentSpecs.dimensions_inches && (
                        <span className="text-gray-600 ml-2">
                          ({currentSpecs.dimensions_inches.width} × {currentSpecs.dimensions_inches.depth} × {currentSpecs.dimensions_inches.height} inches)
                        </span>
                      )}
                    </dd>
                  </div>
                )}
                {(currentSpecs.weight_kg || currentSpecs.weight_lbs) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Weight</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {currentSpecs.weight_lbs && currentSpecs.weight_kg
                        ? `${currentSpecs.weight_lbs} (${currentSpecs.weight_kg})`
                        : currentSpecs.weight_lbs || currentSpecs.weight_kg}
                    </dd>
                  </div>
                )}
          </>
        )}
          </dl>
        </div>
      )}

      {/* Optional Accessories */}
      {((currentSpecs.optional_accessories && currentSpecs.optional_accessories.length > 0) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Optional Accessories</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {editMode ? (
              <div className="px-4 py-3">
                <textarea
                  value={JSON.stringify(currentSpecs.optional_accessories || [], null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value)
                      handleFieldChange('optional_accessories', parsed)
                    } catch {
                      // Invalid JSON, ignore
                    }
                  }}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                  rows={6}
                  placeholder='[{"name": "TP-TANK Recirculating/Cooling Tank", "description": "14 gallon with pump"}]'
                />
              </div>
            ) : (
              <>
                {currentSpecs.optional_accessories && currentSpecs.optional_accessories.map((accessory, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-700 sm:col-span-2">
                      {accessory.name || 'Accessory'}
                    </dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {accessory.description || accessory.catalog_number || ''}
            </dd>
                  </div>
                ))}
          </>
        )}
      </dl>
        </div>
      )}
    </div>
  )
}
