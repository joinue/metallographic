'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Info,
  Database,
  Wrench,
  Flame,
  FileText,
  Briefcase,
  BookOpen,
  Hash,
  HardDrive,
  Droplets,
  Layers,
  Settings,
  CheckSquare,
  ExternalLink,
} from 'lucide-react'
import type { Material } from '@/lib/supabase'

interface MaterialTabsProps {
  material: Material
}

type TabId = 'overview' | 'properties' | 'preparation' | 'heat-treatment' | 'standards' | 'applications'

const tabs: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
  { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" /> },
  { id: 'properties', label: 'Properties', icon: <Database className="w-4 h-4" /> },
  { id: 'preparation', label: 'Preparation', icon: <Wrench className="w-4 h-4" /> },
  { id: 'heat-treatment', label: 'Heat Treatment', icon: <Flame className="w-4 h-4" /> },
  { id: 'standards', label: 'Standards', icon: <FileText className="w-4 h-4" /> },
  { id: 'applications', label: 'Applications', icon: <Briefcase className="w-4 h-4" /> },
]

// PACE product links mapping
const PACE_LINKS = {
  // Sectioning Equipment
  precisionWaferingEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/precision-wafering.html',
    shopUrl: 'https://shop.metallographic.com/collections/cutting',
    keywords: ['diamond saw', 'slow-speed diamond', 'precision wafering', 'wafering saw', 'diamond saw with'],
    excludeKeywords: ['polishing', 'polish'], // Don't match if these are present
  },
  abrasiveSectioningEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/abrasive-sectioning.html',
    shopUrl: 'https://shop.metallographic.com/collections/cutting',
    keywords: ['abrasive cutoff', 'abrasive cut-off', 'abrasive wheel', 'abrasive cutting', 'cutoff wheel'],
  },
  cuttingFluid: {
    url: 'https://shop.metallographic.com/collections/abrasive-cutting-fluid',
    keywords: ['coolant', 'cutting fluid', 'lubricant', 'with coolant'],
  },
  // Mounting Equipment
  compressionMountingEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/compression-mounting.html',
    shopUrl: 'https://shop.metallographic.com/collections/mounting',
    keywords: ['compression mounting', 'hot mounting', 'mounting press', 'compression mount'],
  },
  castableMountingEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/castable-mounting.html',
    shopUrl: 'https://shop.metallographic.com/collections/mounting',
    keywords: ['cold mounting', 'castable mounting', 'vacuum mounting', 'pressure mounting', 'uv curing'],
  },
  // Grinding Equipment & Supplies
  grindingSupplies: {
    url: 'https://shop.metallographic.com/collections/grinding',
    keywords: ['grinding', 'grit', 'abrasive paper', 'grinding paper', 'grinding sequence', '120', '240', '320', '400', '600', '800', '1200'],
    excludeKeywords: ['diamond saw', 'diamond blade', 'diamond cutting', 'sic'], // Don't match sectioning terms or SiC (handled separately)
  },
  sicGrinding: {
    url: 'https://shop.metallographic.com/collections/sic-grinding',
    keywords: ['sic', 'silicon carbide', 'sic paper', 'sic grinding'],
  },
  handGrinderEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/grinding-polishing/penta.html',
    keywords: ['hand grinder', 'belt grinder', 'penta'],
  },
  // Polishing Equipment & Supplies
  polishingSupplies: {
    url: 'https://shop.metallographic.com/collections/polishing',
    keywords: ['polishing', 'polish', 'diamond paste', 'diamond suspension', 'colloidal silica', 'alumina', 'polishing pad', 'polishing cloth', 'polishing sequence', 'μm', 'um', 'micron', '9μm', '6μm', '3μm', '1μm', '0.05μm', '0.5μm'],
    excludeKeywords: ['diamond saw', 'diamond blade', 'diamond cutting', 'diamond wafering'], // Don't match sectioning terms
  },
  manualPolisherEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/grinding-polishing/nano.html',
    keywords: ['manual polisher', 'polishing wheel', 'nano', 'manual polishing'],
  },
  semiAutoPolisherEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/grinding-polishing/femto.html',
    keywords: ['semi-automated', 'semi-auto', 'automated polisher', 'femto', 'automated polishing'],
  },
  controlledRemovalPolisherEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html',
    keywords: ['controlled removal', 'pcb', 'atto', 'pcb manufacturing'],
  },
  vibratoryPolisherEquipment: {
    url: 'https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html',
    keywords: ['vibratory', 'vibratory polishing', 'giga', 'vibratory polisher'],
  },
  // Etching
  etchingSupplies: {
    url: 'https://shop.metallographic.com/collections/etching-and-cleaning',
    keywords: ['etching', 'etchant', 'etch', 'swabbing', 'immersion', 'nital', 'picral', 'electrolytic', 'vapor', 'reagent'],
  },
} as const

// Helper function to detect relevant PACE links from text
function getRelevantPaceLinks(text: string): Array<{ label: string; url: string; isEquipment?: boolean }> {
  if (!text) return []
  
  const lowerText = text.toLowerCase()
  const links: Array<{ label: string; url: string; isEquipment?: boolean }> = []
  const added = new Set<string>()
  
  // Check each link category
  Object.entries(PACE_LINKS).forEach(([key, link]) => {
    // Check if excluded keywords are present
    if ('excludeKeywords' in link && link.excludeKeywords) {
      const hasExcluded = link.excludeKeywords.some(exclude => lowerText.includes(exclude.toLowerCase()))
      if (hasExcluded) return // Skip this link
    }
    
    // Check if keywords match
    const matches = link.keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))
    if (matches) {
      // Add equipment link if available
      const isEquipment = key.includes('Equipment')
      const url = isEquipment ? link.url : ('shopUrl' in link && link.shopUrl ? link.shopUrl : link.url)
      
      if (!added.has(url)) {
        const label = 
          key === 'precisionWaferingEquipment' ? 'Precision Wafering Equipment' :
          key === 'abrasiveSectioningEquipment' ? 'Abrasive Sectioning Equipment' :
          key === 'cuttingFluid' ? 'Cutting Fluids' :
          key === 'compressionMountingEquipment' ? 'Compression Mounting Equipment' :
          key === 'castableMountingEquipment' ? 'Castable Mounting Equipment' :
          key === 'grindingSupplies' ? 'Grinding Supplies' :
          key === 'sicGrinding' ? 'SiC Grinding' :
          key === 'handGrinderEquipment' ? 'Hand Grinders (PENTA)' :
          key === 'polishingSupplies' ? 'Polishing Supplies' :
          key === 'manualPolisherEquipment' ? 'Manual Polishers (NANO)' :
          key === 'semiAutoPolisherEquipment' ? 'Semi-Auto Polishers (FEMTO)' :
          key === 'controlledRemovalPolisherEquipment' ? 'Controlled Removal (ATTO)' :
          key === 'vibratoryPolisherEquipment' ? 'Vibratory Polishers (GIGA)' :
          key === 'etchingSupplies' ? 'Etching & Cleaning' : 'Equipment'
        
        links.push({ label, url, isEquipment })
        added.add(url)
      }
      
      // Also add shop link if equipment link was added and shop URL exists
      if (isEquipment && 'shopUrl' in link && link.shopUrl && !added.has(link.shopUrl)) {
        const shopLabel = 
          key === 'precisionWaferingEquipment' ? 'Cutting Supplies' :
          key === 'abrasiveSectioningEquipment' ? 'Cutting Supplies' :
          key === 'compressionMountingEquipment' ? 'Mounting Supplies' :
          key === 'castableMountingEquipment' ? 'Mounting Supplies' : null
        
        if (shopLabel) {
          links.push({ label: shopLabel, url: link.shopUrl })
          added.add(link.shopUrl)
        }
      }
    }
  })
  
  return links
}

export default function MaterialTabs({ material }: MaterialTabsProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  // Sync with URL hash on mount and when hash changes
  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash.slice(1) as TabId
      if (hash && tabs.some(tab => tab.id === hash)) {
        setActiveTab(hash)
      } else {
        setActiveTab('overview')
      }
    }

    // Set initial tab from hash
    updateTabFromHash()

    // Listen for hash changes
    const handleHashChange = () => {
      updateTabFromHash()
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId)
    // Update URL hash - using replaceState to avoid adding to history
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

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-primary-600" />
          Basic Information
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <PropertyRow label="Category" value={material.category} icon={<Layers className="w-3.5 h-3.5" />} />
          {material.material_type && (
            <PropertyRow label="Material Type" value={material.material_type} icon={<Hash className="w-3.5 h-3.5" />} />
          )}
          {material.alternative_names && material.alternative_names.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Alternative Names:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {material.alternative_names.map((name, index) => (
                  <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {material.tags && material.tags.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {material.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composition & Microstructure */}
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Database className="w-4 h-4 text-primary-600" />
          Composition & Structure
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <PropertyRow label="Composition" value={material.composition} icon={<Droplets className="w-3.5 h-3.5" />} />
          <PropertyRow label="Microstructure" value={material.microstructure} icon={<Layers className="w-3.5 h-3.5" />} />
        </div>
      </div>

      {/* Description */}
      {material.detailed_description && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary-600" />
            Description
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 leading-relaxed">{material.detailed_description}</p>
          </div>
        </div>
      )}

      {/* Special Notes */}
      {material.special_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary-600" />
            Special Notes
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 leading-relaxed">{material.special_notes}</p>
          </div>
        </div>
      )}
    </div>
  )

  const renderProperties = () => (
    <div className="space-y-4">
      {/* Mechanical Properties */}
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-primary-600" />
          Mechanical Properties
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-1">
          {material.hardness && (
            <PropertyRow label="Hardness" value={material.hardness} icon={<Settings className="w-3.5 h-3.5" />} />
          )}
          {material.hardness_hb && (
            <PropertyRow label="Hardness (HB)" value={`${material.hardness_hb} HB`} icon={<Settings className="w-3.5 h-3.5" />} />
          )}
          {material.hardness_hrc && (
            <PropertyRow label="Hardness (HRC)" value={`${material.hardness_hrc} HRC`} icon={<Settings className="w-3.5 h-3.5" />} />
          )}
          {material.hardness_hv && (
            <PropertyRow label="Hardness (HV)" value={`${material.hardness_hv} HV`} icon={<Settings className="w-3.5 h-3.5" />} />
          )}
          {material.hardness_category && (
            <PropertyRow
              label="Hardness Category"
              value={
                <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium capitalize">
                  {material.hardness_category.replace('-', ' ')}
                </span>
              }
              icon={<Settings className="w-3.5 h-3.5" />}
            />
          )}
          {material.tensile_strength_mpa && (
            <PropertyRow label="Tensile Strength" value={`${material.tensile_strength_mpa} MPa`} />
          )}
          {material.yield_strength_mpa && (
            <PropertyRow label="Yield Strength" value={`${material.yield_strength_mpa} MPa`} />
          )}
        </div>
      </div>

      {/* Physical Properties */}
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Database className="w-4 h-4 text-primary-600" />
          Physical Properties
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-1">
          {material.density && (
            <PropertyRow label="Density" value={`${material.density} g/cm³`} icon={<Droplets className="w-3.5 h-3.5" />} />
          )}
          {material.melting_point_celsius && (
            <PropertyRow label="Melting Point" value={`${material.melting_point_celsius} °C`} icon={<Flame className="w-3.5 h-3.5" />} />
          )}
        </div>
      </div>

      {/* Material Characteristics */}
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-primary-600" />
          Material Characteristics
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-1">
          <PropertyRow
            label="Work Hardening"
            value={
              material.work_hardening !== null ? (
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  material.work_hardening ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {material.work_hardening ? 'Yes' : 'No'}
                </span>
              ) : null
            }
          />
          <PropertyRow
            label="Magnetic"
            value={
              material.magnetic !== null ? (
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  material.magnetic ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {material.magnetic ? 'Yes' : 'No'}
                </span>
              ) : null
            }
          />
          {material.corrosion_resistance && (
            <PropertyRow
              label="Corrosion Resistance"
              value={
                <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium capitalize">
                  {material.corrosion_resistance}
                </span>
              }
            />
          )}
        </div>
      </div>
    </div>
  )

  const renderPreparation = () => (
    <div className="space-y-4">
      {/* General Preparation Notes */}
      {material.preparation_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary-600" />
            General Preparation Notes
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-900 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: material.preparation_notes }} />
          </div>
        </div>
      )}

      {/* Sectioning */}
      {material.sectioning_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary-600" />
            Sectioning
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-900 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: material.sectioning_notes }} />
            {(() => {
              const links = getRelevantPaceLinks(material.sectioning_notes || '')
              return links.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-500">Equipment & supplies:</span>
                    {links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Mounting */}
      {material.mounting_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary-600" />
            Mounting
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-900 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: material.mounting_notes }} />
            {(() => {
              const links = getRelevantPaceLinks(material.mounting_notes)
              return links.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-500">Equipment & supplies:</span>
                    {links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Grinding */}
      {material.grinding_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary-600" />
            Grinding
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="text-sm text-gray-900 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: material.grinding_notes }} />
            {material.recommended_grinding_sequence && material.recommended_grinding_sequence.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sequence: </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {material.recommended_grinding_sequence.map((step, index) => (
                    <span key={index} className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(() => {
              // Always show grinding supplies, plus any equipment links found
              const links = getRelevantPaceLinks(material.grinding_notes || '')
              const hasGrindingSupplies = links.some(l => l.url.includes('grinding') && !l.url.includes('sic-grinding') && !l.url.includes('equipment'))
              const hasSicGrinding = links.some(l => l.url.includes('sic-grinding'))
              const hasEquipment = links.some(l => l.url.includes('equipment') || l.isEquipment)
              
              // Build links array - SiC first if present, then general grinding, then equipment
              const allLinks: Array<{ label: string; url: string }> = []
              
              // Add SiC grinding link if found
              if (hasSicGrinding) {
                const sicLink = links.find(l => l.url.includes('sic-grinding'))
                if (sicLink) allLinks.push(sicLink)
              }
              
              // Add general grinding supplies if not already added
              if (hasGrindingSupplies) {
                const grindingLink = links.find(l => l.url.includes('grinding') && !l.url.includes('sic-grinding') && !l.url.includes('equipment'))
                if (grindingLink) allLinks.push(grindingLink)
              } else if (!hasSicGrinding) {
                // Only add general grinding if no SiC link (to avoid duplicates)
                allLinks.push({ label: 'Grinding Supplies', url: 'https://shop.metallographic.com/collections/grinding' })
              }
              
              // Add equipment links - if none found, show default PENTA (most common for grinding)
              const equipmentLinks = links.filter(l => (l.url.includes('equipment') || l.isEquipment) && !l.url.includes('polishing'))
              if (equipmentLinks.length > 0) {
                allLinks.push(...equipmentLinks)
              } else {
                // Default to PENTA hand grinder since grinding notes exist
                allLinks.push({ label: 'Hand Grinders (PENTA)', url: 'https://www.metallographic.com/metallographic-equipment/grinding-polishing/penta.html' })
              }
              
              return allLinks.length > 0 && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-500">Equipment & supplies:</span>
                    {allLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Polishing */}
      {material.polishing_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary-600" />
            Polishing
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="text-sm text-gray-900 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: material.polishing_notes }} />
            {material.recommended_polishing_sequence && material.recommended_polishing_sequence.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sequence: </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {material.recommended_polishing_sequence.map((step, index) => (
                    <span key={index} className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(() => {
              // Always show polishing supplies, plus any equipment links found
              const links = getRelevantPaceLinks(material.polishing_notes || '')
              const hasPolishingSupplies = links.some(l => l.url.includes('polishing') && !l.url.includes('equipment'))
              const hasEquipment = links.some(l => l.url.includes('equipment') || l.isEquipment)
              
              // Build links array
              const allLinks: Array<{ label: string; url: string }> = []
              
              // Add polishing supplies
              if (hasPolishingSupplies) {
                const suppliesLink = links.find(l => l.url.includes('polishing') && !l.url.includes('equipment'))
                if (suppliesLink) allLinks.push(suppliesLink)
              } else {
                allLinks.push({ label: 'Polishing Supplies', url: 'https://shop.metallographic.com/collections/polishing' })
              }
              
              // Add equipment links - if none found, show default NANO (most common)
              const equipmentLinks = links.filter(l => l.url.includes('equipment') || l.isEquipment)
              if (equipmentLinks.length > 0) {
                allLinks.push(...equipmentLinks)
              } else {
                // Default to NANO manual polisher since polishing notes exist
                allLinks.push({ label: 'Manual Polishers (NANO)', url: 'https://www.metallographic.com/metallographic-equipment/grinding-polishing/nano.html' })
              }
              
              return allLinks.length > 0 && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-500">Equipment & supplies:</span>
                    {allLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Etching */}
      {material.etching_notes && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary-600" />
            Etching
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="text-sm text-gray-900 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: material.etching_notes }} />
            {material.common_etchants && material.common_etchants.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Common Etchants: </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {material.common_etchants.map((etchant, index) => (
                    <span key={index} className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                      {etchant}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(() => {
              // Always show etching supplies if etching section exists
              const links = getRelevantPaceLinks(material.etching_notes || '')
              const hasEtchingSupplies = links.some(l => l.url.includes('etching'))
              const allLinks = hasEtchingSupplies 
                ? links 
                : [{ label: 'Etching & Cleaning', url: 'https://shop.metallographic.com/collections/etching-and-cleaning' }, ...links]
              
              return allLinks.length > 0 && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-500">Equipment & supplies:</span>
                    {allLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )

  const renderHeatTreatment = () => (
    <div className="space-y-4">
      {material.heat_treatment && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary-600" />
            Heat Treatment
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 leading-relaxed">{material.heat_treatment}</p>
          </div>
        </div>
      )}

      {(material.annealing_temperature_celsius ||
        material.solution_treatment_temp_celsius ||
        material.aging_temperature_celsius) && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary-600" />
            Temperature Parameters
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-1">
            {material.annealing_temperature_celsius && (
              <PropertyRow label="Annealing Temperature" value={`${material.annealing_temperature_celsius} °C`} />
            )}
            {material.solution_treatment_temp_celsius && (
              <PropertyRow label="Solution Treatment" value={`${material.solution_treatment_temp_celsius} °C`} />
            )}
            {material.aging_temperature_celsius && (
              <PropertyRow label="Aging Temperature" value={`${material.aging_temperature_celsius} °C`} />
            )}
          </div>
        </div>
      )}
    </div>
  )

  const renderStandards = () => (
    <div className="space-y-4">
      {(material.astm_standards && material.astm_standards.length > 0) ||
      (material.iso_standards && material.iso_standards.length > 0) ? (
        <>
          {material.astm_standards && material.astm_standards.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-600" />
                ASTM Standards
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-1.5">
                  {material.astm_standards.map((standard, index) => (
                    <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {material.iso_standards && material.iso_standards.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-600" />
                ISO Standards
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-1.5">
                  {material.iso_standards.map((standard, index) => (
                    <span key={index} className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium">
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">No standards information available for this material.</p>
        </div>
      )}
    </div>
  )

  const renderApplications = () => (
    <div className="space-y-4">
      {material.applications && material.applications.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary-600" />
            Applications
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-1.5">
              {material.applications.map((app, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5 text-xs">•</span>
                  <span className="text-sm text-gray-900">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {material.typical_uses && material.typical_uses.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary-600" />
            Typical Uses
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-1.5">
              {material.typical_uses.map((use, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5 text-xs">•</span>
                  <span className="text-sm text-gray-900">{use}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {(!material.applications || material.applications.length === 0) &&
        (!material.typical_uses || material.typical_uses.length === 0) && (
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">No applications information available for this material.</p>
          </div>
        )}
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'properties':
        return renderProperties()
      case 'preparation':
        return renderPreparation()
      case 'heat-treatment':
        return renderHeatTreatment()
      case 'standards':
        return renderStandards()
      case 'applications':
        return renderApplications()
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

