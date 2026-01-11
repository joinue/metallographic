import type { EquipmentHardnessTesting } from '@/lib/supabase'

interface HardnessTestingSpecsProps {
  specs: EquipmentHardnessTesting | null | undefined
  editMode?: boolean
  onChange?: (data: EquipmentHardnessTesting) => void
}

export default function HardnessTestingSpecs({ specs, editMode = false, onChange }: HardnessTestingSpecsProps) {
  if (!specs) return null

  const hasAnySpec = 
    specs.test_methods || specs.load_range_n || specs.load_range_kgf ||
    specs.selectable_loads || specs.max_indentation_depth_mm || specs.indenter_types ||
    specs.automation_level || specs.automatic_loading || specs.data_export_capabilities ||
    specs.measurement_accuracy || specs.digital_display !== null || specs.weight_kg || specs.dimensions_mm

  if (!hasAnySpec) return null

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Test Methods */}
        {specs.test_methods && specs.test_methods.length > 0 && (
          <>
            <dt className="text-sm text-gray-600">Test Methods</dt>
            <dd className="text-sm text-gray-900 capitalize">
              {specs.test_methods.map(m => m.replace(/-/g, ' ')).join(', ')}
            </dd>
          </>
        )}

        {/* Load Specifications */}
        {specs.load_range_n && specs.load_range_n.length >= 2 && (
          <>
            <dt className="text-sm text-gray-600">Load Range</dt>
            <dd className="text-sm text-gray-900">
              {specs.load_range_n[0]} - {specs.load_range_n[1]} N
            </dd>
          </>
        )}
        {specs.load_range_kgf && specs.load_range_kgf.length >= 2 && (
          <>
            <dt className="text-sm text-gray-600">Load Range</dt>
            <dd className="text-sm text-gray-900">
              {specs.load_range_kgf[0]} - {specs.load_range_kgf[1]} kgf
            </dd>
          </>
        )}
        {specs.selectable_loads && specs.selectable_loads.length > 0 && (
          <>
            <dt className="text-sm text-gray-600">Selectable Loads</dt>
            <dd className="text-sm text-gray-900">{specs.selectable_loads.join(', ')}</dd>
          </>
        )}

        {/* Indentation Specifications */}
        {specs.max_indentation_depth_mm && (
          <>
            <dt className="text-sm text-gray-600">Max Indentation Depth</dt>
            <dd className="text-sm text-gray-900">{specs.max_indentation_depth_mm} mm</dd>
          </>
        )}
        {specs.indenter_types && specs.indenter_types.length > 0 && (
          <>
            <dt className="text-sm text-gray-600">Indenter Types</dt>
            <dd className="text-sm text-gray-900 capitalize">
              {specs.indenter_types.map(t => t.replace(/-/g, ' ')).join(', ')}
            </dd>
          </>
        )}

        {/* Automation */}
        {specs.automation_level && (
          <>
            <dt className="text-sm text-gray-600">Automation Level</dt>
            <dd className="text-sm text-gray-900 capitalize">{specs.automation_level.replace(/-/g, ' ')}</dd>
          </>
        )}
        {specs.automatic_loading !== null && (
          <>
            <dt className="text-sm text-gray-600">Automatic Loading</dt>
            <dd className="text-sm text-gray-900">{specs.automatic_loading ? 'Yes' : 'No'}</dd>
          </>
        )}

        {/* Features */}
        {specs.data_export_capabilities && specs.data_export_capabilities.length > 0 && (
          <>
            <dt className="text-sm text-gray-600">Data Export</dt>
            <dd className="text-sm text-gray-900 uppercase">
              {specs.data_export_capabilities.join(', ')}
            </dd>
          </>
        )}
        {specs.measurement_accuracy && (
          <>
            <dt className="text-sm text-gray-600">Measurement Accuracy</dt>
            <dd className="text-sm text-gray-900 capitalize">{specs.measurement_accuracy}</dd>
          </>
        )}
        {specs.digital_display !== null && (
          <>
            <dt className="text-sm text-gray-600">Digital Display</dt>
            <dd className="text-sm text-gray-900">{specs.digital_display ? 'Yes' : 'No'}</dd>
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

