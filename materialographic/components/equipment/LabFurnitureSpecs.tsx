import type { EquipmentLabFurniture } from '@/lib/supabase'

interface LabFurnitureSpecsProps {
  specs: EquipmentLabFurniture | null | undefined
  editMode?: boolean
  onChange?: (data: EquipmentLabFurniture) => void
}

export default function LabFurnitureSpecs({ specs, editMode = false, onChange }: LabFurnitureSpecsProps) {
  if (!specs) return null

  const hasAnySpec = 
    specs.furniture_type || specs.dimensions_mm || specs.work_surface_area_m2 ||
    specs.material || specs.surface_material || specs.weight_capacity_kg ||
    specs.storage_capacity || specs.ventilation_required !== null || specs.electrical_outlets ||
    specs.drawers || specs.shelves || specs.locking_mechanism !== null ||
    specs.safety_features || specs.weight_kg

  if (!hasAnySpec) return null

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Furniture Type */}
        {specs.furniture_type && (
          <>
            <dt className="text-sm text-gray-600">Furniture Type</dt>
            <dd className="text-sm text-gray-900 capitalize">{specs.furniture_type.replace(/-/g, ' ')}</dd>
          </>
        )}

        {/* Dimensions */}
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
        {specs.work_surface_area_m2 && (
          <>
            <dt className="text-sm text-gray-600">Work Surface Area</dt>
            <dd className="text-sm text-gray-900">{specs.work_surface_area_m2} m²</dd>
          </>
        )}

        {/* Material & Construction */}
        {specs.material && (
          <>
            <dt className="text-sm text-gray-600">Material</dt>
            <dd className="text-sm text-gray-900 capitalize">{specs.material.replace(/-/g, ' ')}</dd>
          </>
        )}
        {specs.surface_material && (
          <>
            <dt className="text-sm text-gray-600">Surface Material</dt>
            <dd className="text-sm text-gray-900 capitalize">{specs.surface_material.replace(/-/g, ' ')}</dd>
          </>
        )}

        {/* Capacity */}
        {specs.weight_capacity_kg && (
          <>
            <dt className="text-sm text-gray-600">Weight Capacity</dt>
            <dd className="text-sm text-gray-900">{specs.weight_capacity_kg} kg</dd>
          </>
        )}
        {specs.storage_capacity && (
          <>
            <dt className="text-sm text-gray-600">Storage Capacity</dt>
            <dd className="text-sm text-gray-900">{specs.storage_capacity}</dd>
          </>
        )}

        {/* Features */}
        {specs.ventilation_required !== null && (
          <>
            <dt className="text-sm text-gray-600">Ventilation Required</dt>
            <dd className="text-sm text-gray-900">{specs.ventilation_required ? 'Yes' : 'No'}</dd>
          </>
        )}
        {specs.electrical_outlets && (
          <>
            <dt className="text-sm text-gray-600">Electrical Outlets</dt>
            <dd className="text-sm text-gray-900">{specs.electrical_outlets}</dd>
          </>
        )}
        {specs.drawers && (
          <>
            <dt className="text-sm text-gray-600">Drawers</dt>
            <dd className="text-sm text-gray-900">{specs.drawers}</dd>
          </>
        )}
        {specs.shelves && (
          <>
            <dt className="text-sm text-gray-600">Shelves</dt>
            <dd className="text-sm text-gray-900">{specs.shelves}</dd>
          </>
        )}
        {specs.locking_mechanism !== null && (
          <>
            <dt className="text-sm text-gray-600">Locking Mechanism</dt>
            <dd className="text-sm text-gray-900">{specs.locking_mechanism ? 'Yes' : 'No'}</dd>
          </>
        )}
        {specs.safety_features && specs.safety_features.length > 0 && (
          <>
            <dt className="text-sm text-gray-600">Safety Features</dt>
            <dd className="text-sm text-gray-900 capitalize">
              {specs.safety_features.map(f => f.replace(/-/g, ' ')).join(', ')}
            </dd>
          </>
        )}

        {/* Additional Specifications */}
        {specs.weight_kg && (
          <>
            <dt className="text-sm text-gray-600">Weight</dt>
            <dd className="text-sm text-gray-900">{specs.weight_kg} kg</dd>
          </>
        )}
      </dl>
    </div>
  )
}

