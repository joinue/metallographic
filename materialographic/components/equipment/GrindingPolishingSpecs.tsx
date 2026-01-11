import type { EquipmentGrindingPolishing } from '@/lib/supabase'
import { useState, useEffect } from 'react'

interface GrindingPolishingSpecsProps {
  specs: EquipmentGrindingPolishing | null | undefined
  editMode?: boolean
  onChange?: (data: EquipmentGrindingPolishing) => void
}

export default function GrindingPolishingSpecs({ specs, editMode = false, onChange }: GrindingPolishingSpecsProps) {
  const [editData, setEditData] = useState<EquipmentGrindingPolishing | null>(null)

  useEffect(() => {
    if (specs) {
      setEditData({ ...specs })
    }
  }, [specs])

  const handleFieldChange = (field: keyof EquipmentGrindingPolishing, value: any) => {
    if (!editData) return
    const updated = { ...editData, [field]: value }
    setEditData(updated)
    onChange?.(updated)
  }

  const handleJSONBChange = (field: keyof EquipmentGrindingPolishing, key: string, value: string) => {
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

  // Detect equipment type based on available fields
  // Manual polishers (NANO): platen size, motor specs, speed control
  const isManualPolisher = 
    currentSpecs.platen_size_inches ||
    currentSpecs.platen_diameter_inches ||
    currentSpecs.motor_power_hp ||
    currentSpecs.motor_speed_range_rpm ||
    currentSpecs.speed_control_type ||
    (currentSpecs.automation_level === 'manual' && !currentSpecs.number_of_pistons)

  // Semi-automated (FEMTO): force control, pistons, programmable cycles, compatible bases
  const isSemiAutomated = 
    currentSpecs.number_of_pistons ||
    currentSpecs.force_control_type ||
    currentSpecs.force_range_per_sample_n ||
    currentSpecs.compatible_base_models ||
    currentSpecs.independent_force_control ||
    (currentSpecs.automation_level === 'semi-automated')

  // Vibratory (GIGA): vibration frequency, amplitude, bowl specs
  const isVibratory = 
    currentSpecs.vibration_frequency_hz ||
    currentSpecs.vibration_amplitude_mm ||
    currentSpecs.bowl_capacity_liters ||
    currentSpecs.bowl_material ||
    currentSpecs.sample_capacity

  // Controlled removal (ATTO): removal rate, thickness measurement, parallelism
  const isControlledRemoval = 
    currentSpecs.removal_rate_control ||
    currentSpecs.removal_rate_range_microns_per_min ||
    currentSpecs.thickness_measurement_capability ||
    currentSpecs.parallelism_control ||
    currentSpecs.controlled_removal

  // Hand/belt grinders (PENTA): belt size, belt speed
  const isHandBeltGrinder = 
    currentSpecs.belt_size_inches ||
    currentSpecs.belt_size_mm ||
    currentSpecs.belt_speed_range_sfpm ||
    currentSpecs.belt_type ||
    currentSpecs.work_rest_included

  const hasAnySpec = 
    isManualPolisher || isSemiAutomated || isVibratory || isControlledRemoval || isHandBeltGrinder ||
    currentSpecs.wheel_size_inches || currentSpecs.platen_material || currentSpecs.number_of_stations ||
    currentSpecs.automation_level || currentSpecs.speed_range_rpm || currentSpecs.force_range_n ||
    currentSpecs.programmable_force || currentSpecs.cooling_system || currentSpecs.sample_holder_type ||
    currentSpecs.motor_power_watts || currentSpecs.weight_kg || currentSpecs.dimensions_mm ||
    currentSpecs.weight_lbs || currentSpecs.dimensions_inches || currentSpecs.optional_accessories ||
    editMode

  if (!hasAnySpec) {
    return (
      <div className="text-sm text-gray-500 italic">
        Technical specifications are not available for this equipment.
      </div>
    )
  }

  const renderField = (label: string, value: any, field?: keyof EquipmentGrindingPolishing) => {
    if (!value && !editMode) return null
    
    if (editMode && field) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
          <dt className="text-sm font-medium text-gray-700 sm:col-span-2">{label}</dt>
          <dd>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleFieldChange(field, e.target.value || null)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </dd>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
        <dt className="text-sm font-medium text-gray-700 sm:col-span-2">{label}</dt>
        <dd className="text-sm text-gray-900 font-semibold">{value}</dd>
      </div>
    )
  }

  const renderBooleanField = (label: string, value: boolean | null | undefined, field?: keyof EquipmentGrindingPolishing) => {
    // Only show boolean fields if they're explicitly set to true, or if we're in edit mode
    // Don't show "No" for fields that aren't relevant to the equipment type
    if ((value === null || value === undefined || value === false) && !editMode) return null
    
    if (editMode && field) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3">
          <dt className="text-sm font-medium text-gray-700 sm:col-span-2">{label}</dt>
          <dd>
            <select
              value={value === null ? '' : value ? 'true' : 'false'}
              onChange={(e) => handleFieldChange(field, e.target.value === '' ? null : e.target.value === 'true')}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="">Not specified</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </dd>
        </div>
      )
    }

    // Only show if value is explicitly true
    if (value !== true) return null

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
        <dt className="text-sm font-medium text-gray-700 sm:col-span-2">{label}</dt>
        <dd className="text-sm text-gray-900 font-semibold">Yes</dd>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Manual Polisher Specifications */}
      {((isManualPolisher && (
        currentSpecs.platen_size_inches ||
        currentSpecs.platen_diameter_inches ||
        currentSpecs.motor_power_hp ||
        currentSpecs.motor_speed_range_rpm ||
        currentSpecs.speed_control_type ||
        currentSpecs.motor_power_watts ||
        currentSpecs.speed_range_rpm
      )) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Manual Polisher Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {renderField('Platen Size', currentSpecs.platen_size_inches, 'platen_size_inches')}
            {renderField('Platen Diameter', currentSpecs.platen_diameter_inches, 'platen_diameter_inches')}
            {renderField('Motor Power', currentSpecs.motor_power_hp, 'motor_power_hp')}
            {renderField('Motor Power (Watts)', currentSpecs.motor_power_watts, 'motor_power_watts')}
            {renderField('Speed Range', currentSpecs.speed_range_rpm || currentSpecs.motor_speed_range_rpm, 'speed_range_rpm')}
            {renderField('Speed Control', currentSpecs.speed_control_type, 'speed_control_type')}
            {renderField('Wheel Sizes', currentSpecs.wheel_size_inches?.join('", '), undefined)}
            {renderField('Platen Material', currentSpecs.platen_material, 'platen_material')}
            {renderField('Electrical Specification', currentSpecs.electrical_specification, 'electrical_specification')}
          </dl>
        </div>
      )}

      {/* Semi-Automated Polishing Head Specifications */}
      {((isSemiAutomated && (
        currentSpecs.number_of_pistons ||
        currentSpecs.force_control_type ||
        currentSpecs.force_range_per_sample_n ||
        currentSpecs.compatible_base_models ||
        currentSpecs.independent_force_control ||
        currentSpecs.programmable_cycles ||
        currentSpecs.number_of_programmable_steps
      )) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Semi-Automated Polishing Head Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {renderField('Compatible Base Models', currentSpecs.compatible_base_models, 'compatible_base_models')}
            {renderField('Number of Pistons', currentSpecs.number_of_pistons?.toString(), 'number_of_pistons')}
            {renderField('Force Control Type', currentSpecs.force_control_type, 'force_control_type')}
            {renderField('Force Range per Sample', currentSpecs.force_range_per_sample_n, 'force_range_per_sample_n')}
            {renderBooleanField('Independent Force Control', currentSpecs.independent_force_control, 'independent_force_control')}
            {renderBooleanField('Programmable Cycles', currentSpecs.programmable_cycles, 'programmable_cycles')}
            {renderField('Number of Programmable Steps', currentSpecs.number_of_programmable_steps?.toString(), 'number_of_programmable_steps')}
            {renderField('Cycle Control Type', currentSpecs.cycle_control_type, 'cycle_control_type')}
            {renderField('Speed Range', currentSpecs.speed_range_rpm, 'speed_range_rpm')}
          </dl>
        </div>
      )}

      {/* Vibratory Polisher Specifications */}
      {((isVibratory && (
        currentSpecs.vibration_frequency_hz ||
        currentSpecs.vibration_amplitude_mm ||
        currentSpecs.bowl_capacity_liters ||
        currentSpecs.bowl_material ||
        currentSpecs.sample_capacity
      )) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Vibratory Polisher Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {renderField('Vibration Frequency', currentSpecs.vibration_frequency_hz, 'vibration_frequency_hz')}
            {renderField('Vibration Amplitude', currentSpecs.vibration_amplitude_mm, 'vibration_amplitude_mm')}
            {renderField('Bowl Capacity', currentSpecs.bowl_capacity_liters || currentSpecs.bowl_capacity_gallons, 'bowl_capacity_liters')}
            {renderField('Bowl Material', currentSpecs.bowl_material, 'bowl_material')}
            {renderField('Sample Capacity', currentSpecs.sample_capacity?.toString(), 'sample_capacity')}
            {renderField('Electrical Specification', currentSpecs.electrical_specification, 'electrical_specification')}
          </dl>
        </div>
      )}

      {/* Controlled Removal Polisher Specifications */}
      {((isControlledRemoval && (
        currentSpecs.removal_rate_control ||
        currentSpecs.removal_rate_range_microns_per_min ||
        currentSpecs.thickness_measurement_capability ||
        currentSpecs.parallelism_control ||
        currentSpecs.thickness_measurement_accuracy_microns
      )) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Controlled Removal Polisher Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {renderField('Removal Rate Control', currentSpecs.removal_rate_control, 'removal_rate_control')}
            {renderField('Removal Rate Range', currentSpecs.removal_rate_range_microns_per_min, 'removal_rate_range_microns_per_min')}
            {renderBooleanField('Thickness Measurement Capability', currentSpecs.thickness_measurement_capability, 'thickness_measurement_capability')}
            {renderField('Thickness Measurement Accuracy', currentSpecs.thickness_measurement_accuracy_microns, 'thickness_measurement_accuracy_microns')}
            {renderBooleanField('Parallelism Control', currentSpecs.parallelism_control, 'parallelism_control')}
            {renderField('Parallelism Tolerance', currentSpecs.parallelism_tolerance_microns, 'parallelism_tolerance_microns')}
            {renderField('Force Resolution', currentSpecs.force_resolution_n, 'force_resolution_n')}
            {renderField('Speed Range', currentSpecs.speed_range_rpm, 'speed_range_rpm')}
          </dl>
        </div>
      )}

      {/* Hand/Belt Grinder Specifications */}
      {((isHandBeltGrinder && (
        currentSpecs.belt_size_inches ||
        currentSpecs.belt_size_mm ||
        currentSpecs.belt_speed_range_sfpm ||
        currentSpecs.belt_type ||
        currentSpecs.work_rest_included
      )) || editMode) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Hand/Belt Grinder Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {renderField('Belt Size', currentSpecs.belt_size_inches || currentSpecs.belt_size_mm, 'belt_size_inches')}
            {renderField('Belt Speed Range (SFPM)', currentSpecs.belt_speed_range_sfpm, 'belt_speed_range_sfpm')}
            {renderField('Belt Speed Range (m/s)', currentSpecs.belt_speed_range_mps, 'belt_speed_range_mps')}
            {renderField('Belt Type', currentSpecs.belt_type, 'belt_type')}
            {renderBooleanField('Work Rest Included', currentSpecs.work_rest_included, 'work_rest_included')}
            {renderField('Motor Power', currentSpecs.motor_power_hp || currentSpecs.motor_power_watts, 'motor_power_hp')}
            {renderField('Electrical Specification', currentSpecs.electrical_specification, 'electrical_specification')}
          </dl>
        </div>
      )}

      {/* General Specifications (shared across types) */}
      {(
        currentSpecs.number_of_stations ||
        currentSpecs.automation_level ||
        currentSpecs.cooling_system ||
        currentSpecs.cooling_system_type ||
        currentSpecs.sample_holder_type ||
        currentSpecs.sample_holder_options ||
        currentSpecs.fluid_dispenser_included ||
        currentSpecs.fixture_included ||
        currentSpecs.dimensions_mm ||
        currentSpecs.dimensions_inches ||
        currentSpecs.weight_kg ||
        currentSpecs.weight_lbs ||
        currentSpecs.optional_accessories ||
        editMode
      ) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">General Specifications</h3>
          </div>
          <dl className="divide-y divide-gray-200">
            {renderField('Number of Stations', currentSpecs.number_of_stations?.toString(), 'number_of_stations')}
            {renderField('Automation Level', currentSpecs.automation_level, 'automation_level')}
            {renderField('Cooling System', currentSpecs.cooling_system || currentSpecs.cooling_system_type, 'cooling_system')}
            {renderField('Sample Holder Options', currentSpecs.sample_holder_options || currentSpecs.sample_holder_type, 'sample_holder_options')}
            {renderBooleanField('Fixture Included', currentSpecs.fixture_included, 'fixture_included')}
            {renderField('Fixture Capacity', currentSpecs.fixture_capacity?.toString(), 'fixture_capacity')}
            {renderBooleanField('Fluid Dispenser Included', currentSpecs.fluid_dispenser_included, 'fluid_dispenser_included')}
            {renderField('Fluid Dispenser Type', currentSpecs.fluid_dispenser_type, 'fluid_dispenser_type')}
            {renderField('Fluid Dispenser Capacity', currentSpecs.fluid_dispenser_capacity_ml, 'fluid_dispenser_capacity_ml')}
            {currentSpecs.dimensions_mm && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (mm)</dt>
                <dd className="text-sm text-gray-900 font-semibold">
                  {currentSpecs.dimensions_mm.width && `${currentSpecs.dimensions_mm.width} × `}
                  {currentSpecs.dimensions_mm.depth && `${currentSpecs.dimensions_mm.depth} × `}
                  {currentSpecs.dimensions_mm.height && `${currentSpecs.dimensions_mm.height}`}
                  {currentSpecs.dimensions_mm.width || currentSpecs.dimensions_mm.depth || currentSpecs.dimensions_mm.height ? ' mm' : 'N/A'}
                </dd>
              </div>
            )}
            {currentSpecs.dimensions_inches && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-medium text-gray-700 sm:col-span-2">Dimensions (inches)</dt>
                <dd className="text-sm text-gray-900 font-semibold">
                  {currentSpecs.dimensions_inches.width && `${currentSpecs.dimensions_inches.width} × `}
                  {currentSpecs.dimensions_inches.depth && `${currentSpecs.dimensions_inches.depth} × `}
                  {currentSpecs.dimensions_inches.height && `${currentSpecs.dimensions_inches.height}`}
                  {currentSpecs.dimensions_inches.width || currentSpecs.dimensions_inches.depth || currentSpecs.dimensions_inches.height ? ' inches' : 'N/A'}
                </dd>
              </div>
            )}
            {renderField('Weight', currentSpecs.weight_kg || currentSpecs.weight_lbs, 'weight_kg')}
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
                  placeholder='[{"name": "Accessory Name", "description": "Accessory description"}]'
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter JSON array of accessories. Use empty array [] to remove all accessories.
                </p>
              </div>
            ) : (
              <>
                {currentSpecs.optional_accessories && currentSpecs.optional_accessories.map((accessory: any, idx: number) => (
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
