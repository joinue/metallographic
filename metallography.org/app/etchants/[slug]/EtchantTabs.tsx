'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  Info,
  FlaskConical,
  Shield,
  BookOpen,
  Clock,
  Thermometer,
  Zap,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react'
import type { Etchant } from '@/lib/supabase'
import { getPaceProductUrl } from '@/lib/supabase'
import Link from 'next/link'

interface EtchantTabsProps {
  etchant: Etchant
}

type TabId = 'overview' | 'application' | 'safety' | 'alternatives'

const tabs: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
  { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" /> },
  { id: 'application', label: 'Application', icon: <FlaskConical className="w-4 h-4" /> },
  { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> },
  { id: 'alternatives', label: 'Alternatives', icon: <BookOpen className="w-4 h-4" /> },
]

export default function EtchantTabs({ etchant }: EtchantTabsProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash.slice(1) as TabId
      if (hash && tabs.some(tab => tab.id === hash)) {
        setActiveTab(hash)
      } else {
        setActiveTab('overview')
      }
    }

    updateTabFromHash()
    const handleHashChange = () => {
      updateTabFromHash()
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId)
    window.history.replaceState(null, '', `${pathname}#${tabId}`)
  }

  const PropertyRow = ({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) => {
    if (!value) return null
    return (
      <div className="flex items-center gap-2 py-1.5">
        {icon && <div className="text-gray-400">{icon}</div>}
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide min-w-[140px]">{label}:</span>
        <span className="text-sm text-gray-900">{value}</span>
      </div>
    )
  }

  const paceUrl = getPaceProductUrl(etchant)

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-primary-600" />
          Basic Information
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          {etchant.category && (
            <PropertyRow label="Category" value={etchant.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} icon={<FlaskConical className="w-3.5 h-3.5" />} />
          )}
          <PropertyRow label="Composition" value={etchant.composition} icon={<FlaskConical className="w-3.5 h-3.5" />} />
          {etchant.concentration && (
            <PropertyRow label="Concentration" value={etchant.concentration} />
          )}
          {etchant.reveals && (
            <PropertyRow label="Reveals" value={etchant.reveals} />
          )}
          {etchant.typical_results && (
            <PropertyRow label="Typical Results" value={etchant.typical_results} />
          )}
          {etchant.color_effects && (
            <PropertyRow label="Color Effects" value={etchant.color_effects} />
          )}
        </div>
      </div>

      {/* Compatibility */}
      {(etchant.compatible_materials && etchant.compatible_materials.length > 0) || 
       (etchant.incompatible_materials && etchant.incompatible_materials.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary-600" />
            Material Compatibility
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            {etchant.compatible_materials && etchant.compatible_materials.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Compatible Materials:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {etchant.compatible_materials.map((material, index) => (
                    <span key={index} className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium">
                      {material.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {etchant.incompatible_materials && etchant.incompatible_materials.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Incompatible Materials:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {etchant.incompatible_materials.map((material, index) => (
                    <span key={index} className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs font-medium">
                      {material.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Alternative Names and Tags */}
      {(etchant.alternative_names && etchant.alternative_names.length > 0) ||
       (etchant.tags && etchant.tags.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary-600" />
            Additional Information
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            {etchant.alternative_names && etchant.alternative_names.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Alternative Names:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {etchant.alternative_names.map((name, index) => (
                    <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {etchant.tags && etchant.tags.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tags:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {etchant.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                      {tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PACE Product Link */}
      {paceUrl && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-primary-900 mb-1">Available from PACE Technologies</h3>
              <p className="text-xs text-primary-700">This etchant is available as a ready-to-use product.</p>
            </div>
            <Link
              href={paceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View Product
            </Link>
          </div>
        </div>
      )}
    </div>
  )

  const renderApplication = () => (
    <div className="space-y-4">
      {/* Application Method */}
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-primary-600" />
          Application Method
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          {etchant.application_method && (
            <PropertyRow 
              label="Method" 
              value={<span className="capitalize">{etchant.application_method}</span>} 
              icon={<FlaskConical className="w-3.5 h-3.5" />} 
            />
          )}
          {etchant.typical_time_seconds && (
            <PropertyRow 
              label="Typical Time" 
              value={`${etchant.typical_time_seconds} seconds`} 
              icon={<Clock className="w-3.5 h-3.5" />} 
            />
          )}
          {etchant.temperature_celsius && (
            <PropertyRow 
              label="Temperature" 
              value={`${etchant.temperature_celsius} °C`} 
              icon={<Thermometer className="w-3.5 h-3.5" />} 
            />
          )}
          {etchant.voltage && (
            <PropertyRow 
              label="Voltage" 
              value={`${etchant.voltage} V`} 
              icon={<Zap className="w-3.5 h-3.5" />} 
            />
          )}
          {etchant.current_density && (
            <PropertyRow 
              label="Current Density" 
              value={`${etchant.current_density} A/cm²`} 
              icon={<Zap className="w-3.5 h-3.5" />} 
            />
          )}
        </div>
      </div>

      {/* Preparation Notes */}
      {etchant.preparation_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary-600" />
            Preparation
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{etchant.preparation_notes}</p>
          </div>
        </div>
      )}

      {/* Application Notes */}
      {etchant.application_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary-600" />
            Application Instructions
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{etchant.application_notes}</p>
          </div>
        </div>
      )}

      {/* Troubleshooting */}
      {etchant.troubleshooting_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary-600" />
            Troubleshooting
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{etchant.troubleshooting_notes}</p>
          </div>
        </div>
      )}

      {/* Storage */}
      {etchant.storage_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary-600" />
            Storage
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{etchant.storage_notes}</p>
          </div>
        </div>
      )}
    </div>
  )

  const renderSafety = () => (
    <div className="space-y-4">
      {/* Hazards */}
      {etchant.hazards && etchant.hazards.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Hazards
          </h2>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex flex-wrap gap-2">
              {etchant.hazards.map((hazard, index) => (
                <span key={index} className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded text-sm font-medium">
                  {hazard}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Safety Notes */}
      {etchant.safety_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary-600" />
            Safety Information
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{etchant.safety_notes}</p>
          </div>
        </div>
      )}

      {/* Required PPE */}
      {etchant.ppe_required && etchant.ppe_required.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary-600" />
            Required Personal Protective Equipment
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              {etchant.ppe_required.map((ppe, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5 text-xs">•</span>
                  <span className="text-sm text-gray-900">{ppe}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* General Safety Reminder */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-red-900 mb-1">Important Safety Reminder</h3>
            <p className="text-sm text-red-800">
              Always use etchants in a well-ventilated area, preferably under a fume hood. Follow all safety protocols and wear appropriate personal protective equipment. 
              Have emergency procedures and first aid supplies readily available.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAlternatives = () => (
    <div className="space-y-4">
      {/* Alternative Etchants */}
      {etchant.alternative_etchants && etchant.alternative_etchants.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary-600" />
            Alternative Etchants
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-3">These etchants can be used as alternatives to {etchant.name}:</p>
            <ul className="space-y-2">
              {etchant.alternative_etchants.map((alt, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5 text-xs">•</span>
                  <Link href={`/etchants/${alt.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    {alt}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Similar Etchants */}
      {etchant.similar_etchants && etchant.similar_etchants.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary-600" />
            Similar Etchants
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-3">These etchants are similar to {etchant.name}:</p>
            <ul className="space-y-2">
              {etchant.similar_etchants.map((similar, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5 text-xs">•</span>
                  <Link href={`/etchants/${similar.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    {similar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Standards References */}
      {(etchant.astm_references && etchant.astm_references.length > 0) ||
       (etchant.iso_references && etchant.iso_references.length > 0) ||
       (etchant.other_references && etchant.other_references.length > 0) ? (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary-600" />
            Standards & References
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            {etchant.astm_references && etchant.astm_references.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">ASTM References:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {etchant.astm_references.map((ref, index) => (
                    <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {etchant.iso_references && etchant.iso_references.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">ISO References:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {etchant.iso_references.map((ref, index) => (
                    <span key={index} className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium">
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {etchant.other_references && etchant.other_references.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Other References:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {etchant.other_references.map((ref, index) => (
                    <span key={index} className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">No alternative etchants or references available for this etchant.</p>
        </div>
      )}
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'application':
        return renderApplication()
      case 'safety':
        return renderSafety()
      case 'alternatives':
        return renderAlternatives()
      default:
        return renderOverview()
    }
  }

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-1 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap
                  ${
                    isActive
                      ? 'border-primary-600 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.icon}
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  )
}

