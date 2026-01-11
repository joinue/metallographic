import type { EquipmentMicroscopy } from '@/lib/supabase'

interface MicroscopySpecsProps {
  specs: EquipmentMicroscopy | null | undefined
  editMode?: boolean
  onChange?: (data: EquipmentMicroscopy) => void
}

export default function MicroscopySpecs({ specs, editMode = false, onChange }: MicroscopySpecsProps) {
  if (!specs) return null

  const hasAnySpec = 
    specs.microscope_type || specs.magnification_range || specs.objective_lenses ||
    specs.eyepiece_magnification || specs.camera_resolution || specs.image_analysis_capable ||
    specs.measurement_capabilities || specs.illumination_type || specs.light_source ||
    specs.motorized_stage || specs.z_stack_capability || specs.live_measurement ||
    specs.weight_kg || specs.dimensions_mm

  if (!hasAnySpec) return null

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Microscope Type */}
        {specs.microscope_type && (
          <>
            <dt className="text-sm text-gray-600">Microscope Type</dt>
            <dd className="text-sm text-gray-900 capitalize">{specs.microscope_type}</dd>
          </>
        )}

        {/* Optical Specifications */}
        {specs.magnification_range && (
          <>
            <dt className="text-sm text-gray-600">Magnification Range</dt>
            <dd className="text-sm text-gray-900">{specs.magnification_range}</dd>
          </>
        )}
        {specs.objective_lenses && specs.objective_lenses.length > 0 && (
          <>
            <dt className="text-sm text-gray-600">Objective Lenses</dt>
            <dd className="text-sm text-gray-900">{specs.objective_lenses.join(', ')}</dd>
          </>
        )}
        {specs.eyepiece_magnification && (
          <>
            <dt className="text-sm text-gray-600">Eyepiece Magnification</dt>
            <dd className="text-sm text-gray-900">{specs.eyepiece_magnification}</dd>
          </>
        )}

        {/* Camera & Digital Features */}
        {specs.camera_resolution && (
          <>
            <dt className="text-sm text-gray-600">Camera Resolution</dt>
            <dd className="text-sm text-gray-900">{specs.camera_resolution}</dd>
          </>
        )}
        {specs.image_analysis_capable !== null && (
          <>
            <dt className="text-sm text-gray-600">Image Analysis Capable</dt>
            <dd className="text-sm text-gray-900">{specs.image_analysis_capable ? 'Yes' : 'No'}</dd>
          </>
        )}
        {specs.measurement_capabilities && specs.measurement_capabilities.length > 0 && (
          <>
            <dt className="text-sm text-gray-600">Measurement Capabilities</dt>
            <dd className="text-sm text-gray-900">
              {specs.measurement_capabilities.map(c => c.replace(/-/g, ' ')).join(', ')}
            </dd>
          </>
        )}

        {/* Illumination */}
        {specs.illumination_type && specs.illumination_type.length > 0 && (
          <>
            <dt className="text-sm text-gray-600">Illumination Types</dt>
            <dd className="text-sm text-gray-900">
              {specs.illumination_type.map(i => i.toUpperCase()).join(', ')}
            </dd>
          </>
        )}
        {specs.light_source && (
          <>
            <dt className="text-sm text-gray-600">Light Source</dt>
            <dd className="text-sm text-gray-900">{specs.light_source}</dd>
          </>
        )}

        {/* Features */}
        {specs.motorized_stage !== null && (
          <>
            <dt className="text-sm text-gray-600">Motorized Stage</dt>
            <dd className="text-sm text-gray-900">{specs.motorized_stage ? 'Yes' : 'No'}</dd>
          </>
        )}
        {specs.z_stack_capability !== null && (
          <>
            <dt className="text-sm text-gray-600">Z-Stack Capability</dt>
            <dd className="text-sm text-gray-900">{specs.z_stack_capability ? 'Yes' : 'No'}</dd>
          </>
        )}
        {specs.live_measurement !== null && (
          <>
            <dt className="text-sm text-gray-600">Live Measurement</dt>
            <dd className="text-sm text-gray-900">{specs.live_measurement ? 'Yes' : 'No'}</dd>
          </>
        )}

        {/* Additional Specifications */}
        {specs.weight_kg && (
          <>
            <dt className="text-sm text-gray-600">Weight</dt>
            <dd className="text-sm text-gray-900">{specs.weight_kg} kg</dd>
          </>
        )}
        {specs.dimensions_mm && (
          <>
            <dt className="text-sm text-gray-600">Dimensions</dt>
            <dd className="text-sm text-gray-900">
              {specs.dimensions_mm.width && `${specs.dimensions_mm.width} × `}
              {specs.dimensions_mm.height && `${specs.dimensions_mm.height} × `}
              {specs.dimensions_mm.depth && `${specs.dimensions_mm.depth}`}
              {specs.dimensions_mm.width || specs.dimensions_mm.height || specs.dimensions_mm.depth ? ' mm' : 'N/A'}
            </dd>
          </>
        )}
      </dl>
    </div>
  )
}

