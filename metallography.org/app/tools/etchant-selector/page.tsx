'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { 
  Wrench, 
  Cog, 
  Plane, 
  Rocket, 
  Plug, 
  Flame, 
  Grid3x3, 
  Gem, 
  Atom, 
  Sparkles, 
  Search, 
  Shuffle, 
  Zap, 
  Waves, 
  Circle, 
  BarChart3,
  Star,
  ShoppingCart,
  AlertTriangle,
  Lightbulb,
  Shield,
  ArrowUp,
  RotateCcw,
  X,
  CheckCircle2,
  ExternalLink,
  Hand
} from 'lucide-react'
import { Material, Etchant, getAllMaterials, getAllEtchants, getPaceProductUrl } from '@/lib/supabase'

type PurposeFilter = 
  | 'grain-boundaries'
  | 'carbides'
  | 'phases'
  | 'precipitates'
  | 'inclusions'
  | 'twin-boundaries'
  | 'martensite'
  | 'pearlite'
  | 'ferrite'
  | 'austenite'
  | 'nodularity'
  | 'general'

type ApplicationContext = 
  | 'quality-control'
  | 'failure-analysis'
  | 'research'
  | 'heat-treatment-verification'
  | 'welding-analysis'
  | 'general'

interface EtchantMatch {
  etchant: Etchant
  score: number
  matchReasons: string[]
  expertTips?: string[]
  warnings?: string[]
  recommendedSequence?: number // For progressive etching
}

// Common materials for quick selection
const commonMaterials = [
  { category: 'carbon-steel', label: 'Carbon Steel', icon: Wrench },
  { category: 'stainless-steel', label: 'Stainless Steel', icon: Cog },
  { category: 'aluminum', label: 'Aluminum', icon: Plane },
  { category: 'titanium', label: 'Titanium', icon: Rocket },
  { category: 'copper-brass', label: 'Copper/Brass', icon: Plug },
  { category: 'nickel-alloys', label: 'Nickel Alloys', icon: Flame },
]

// Purpose icons
const purposeIcons: Record<PurposeFilter, typeof Grid3x3> = {
  'grain-boundaries': Grid3x3,
  'carbides': Gem,
  'phases': Atom,
  'precipitates': Sparkles,
  'inclusions': Search,
  'twin-boundaries': Shuffle,
  'martensite': Zap,
  'pearlite': Waves,
  'ferrite': Circle,
  'austenite': Circle,
  'nodularity': Circle,
  'general': BarChart3
}

export default function EtchantSelector() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [etchants, setEtchants] = useState<Etchant[]>([])
  const [loading, setLoading] = useState(true)
  
  // Selection state
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [materialSearchQuery, setMaterialSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [purposeFilter, setPurposeFilter] = useState<PurposeFilter | ''>('')
  const [applicationContext, setApplicationContext] = useState<ApplicationContext | ''>('')
  const [selectedEtchant, setSelectedEtchant] = useState<Etchant | null>(null)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(materialSearchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [materialSearchQuery])

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [materialsData, etchantsData] = await Promise.all([
          getAllMaterials(),
          getAllEtchants()
        ])
        setMaterials(materialsData)
        setEtchants(etchantsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter materials by search query
  const filteredMaterials = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      // Show featured materials or common ones first
      return materials
        .filter(m => m.status === 'published' || !m.status)
        .sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (a.sort_order || 0) - (b.sort_order || 0)
        })
        .slice(0, 20) // Limit initial display
    }
    
    const query = debouncedSearchQuery.toLowerCase()
    return materials
      .filter(m => {
        if (m.status !== 'published' && m.status) return false
        const nameMatch = m.name.toLowerCase().includes(query)
        const categoryMatch = m.category?.toLowerCase().includes(query)
        const altNamesMatch = m.alternative_names?.some(alt => 
          alt.toLowerCase().includes(query)
        )
        const tagsMatch = m.tags?.some(tag => 
          tag.toLowerCase().includes(query)
        )
        return nameMatch || categoryMatch || altNamesMatch || tagsMatch
      })
      .slice(0, 20)
  }, [materials, debouncedSearchQuery])

  // Get materials by category for quick selection
  const getMaterialsByCategory = useCallback((category: string) => {
    return materials.filter(m => {
      const matCategory = getMaterialCategory(m)
      return matCategory === category
    }).slice(0, 1)[0] // Get first match
  }, [materials])

  // Get material category for matching
  const getMaterialCategory = (material: Material): string => {
    const category = material.category?.toLowerCase() || ''
    const name = material.name.toLowerCase()
    
    // Map to etchant compatible_materials format
    if (category.includes('carbon') || category.includes('low alloy') || name.includes('carbon steel')) {
      return 'carbon-steel'
    }
    if (category.includes('stainless') || name.includes('stainless')) {
      return 'stainless-steel'
    }
    if (category.includes('aluminum') || name.includes('aluminum') || name.includes('aluminium')) {
      return 'aluminum'
    }
    if (category.includes('copper') || category.includes('brass') || name.includes('copper') || name.includes('brass')) {
      return 'copper-brass'
    }
    if (category.includes('titanium') || name.includes('titanium')) {
      return 'titanium'
    }
    if (category.includes('nickel') || name.includes('nickel') || name.includes('inconel')) {
      return 'nickel-alloys'
    }
    if (category.includes('cast iron') || name.includes('cast iron')) {
      return 'cast-iron'
    }
    if (category.includes('tool steel') || name.includes('tool steel')) {
      return 'tool-steel'
    }
    
    return category
  }

  // Expert knowledge: Analyze material composition for alloying elements
  const analyzeComposition = useCallback((material: Material): {
    hasChromium: boolean
    hasNickel: boolean
    hasMolybdenum: boolean
    hasTitanium: boolean
    hasAluminum: boolean
    hasCopper: boolean
    carbonContent: 'low' | 'medium' | 'high' | null
  } => {
    const comp = (material.composition || '').toLowerCase()
    const name = material.name.toLowerCase()
    
    return {
      hasChromium: comp.includes('cr') || comp.includes('chromium') || name.includes('stainless'),
      hasNickel: comp.includes('ni') || comp.includes('nickel') || name.includes('inconel') || name.includes('monel'),
      hasMolybdenum: comp.includes('mo') || comp.includes('molybdenum'),
      hasTitanium: comp.includes('ti') || comp.includes('titanium'),
      hasAluminum: comp.includes('al') || comp.includes('aluminum') || comp.includes('aluminium'),
      hasCopper: comp.includes('cu') || comp.includes('copper') || name.includes('brass') || name.includes('bronze'),
      carbonContent: 
        comp.includes('0.6') || comp.includes('0.7') || comp.includes('0.8') || comp.includes('0.9') || comp.includes('1.') ? 'high' :
        comp.includes('0.3') || comp.includes('0.4') || comp.includes('0.5') ? 'medium' :
        comp.includes('0.1') || comp.includes('0.2') || comp.includes('low carbon') ? 'low' : null
    }
  }, [])

  // Expert knowledge: Get microstructure type from material
  const getMicrostructureType = useCallback((material: Material): string[] => {
    const micro = (material.microstructure || '').toLowerCase()
    const name = material.name.toLowerCase()
    const types: string[] = []
    
    if (micro.includes('martensite') || name.includes('martensitic')) types.push('martensitic')
    if (micro.includes('austenite') || name.includes('austenitic')) types.push('austenitic')
    if (micro.includes('ferrite') || name.includes('ferritic')) types.push('ferritic')
    if (micro.includes('pearlite') || micro.includes('pearlitic')) types.push('pearlitic')
    if (micro.includes('bainite') || micro.includes('bainitic')) types.push('bainitic')
    if (micro.includes('duplex')) types.push('duplex')
    
    return types
  }, [])

  // Expert knowledge: Get heat treatment state
  const getHeatTreatmentState = useCallback((material: Material): string[] => {
    const heat = (material.heat_treatment || '').toLowerCase()
    const states: string[] = []
    
    if (heat.includes('anneal')) states.push('annealed')
    if (heat.includes('quench')) states.push('quenched')
    if (heat.includes('temper')) states.push('tempered')
    if (heat.includes('normaliz')) states.push('normalized')
    if (heat.includes('solution')) states.push('solution-treated')
    if (heat.includes('age')) states.push('aged')
    if (heat.includes('stress')) states.push('stress-relieved')
    
    return states
  }, [])

  // Expert-level matching algorithm - retooled for optimal recommendations
  const matchedEtchants = useMemo((): EtchantMatch[] => {
    if (!selectedMaterial) return []

    const materialCategory = getMaterialCategory(selectedMaterial)
    const composition = analyzeComposition(selectedMaterial)
    const microstructureTypes = getMicrostructureType(selectedMaterial)
    const heatTreatmentStates = getHeatTreatmentState(selectedMaterial)
    
    const matches: EtchantMatch[] = []

    for (const etchant of etchants) {
      let score = 0
      const reasons: string[] = []
      const expertTips: string[] = []
      const warnings: string[] = []

      // Check compatible materials
      const compatible = etchant.compatible_materials || []
      const incompatible = etchant.incompatible_materials || []
      const etchantCategory = etchant.category || ''
      const etchantName = etchant.name.toLowerCase()
      const reveals = (etchant.reveals || '').toLowerCase()
      const typicalResults = (etchant.typical_results || '').toLowerCase()
      
      // Penalize incompatible materials early
      if (incompatible.includes(materialCategory)) {
        continue // Skip incompatible etchants entirely
      }
      
      // TIER 1: Material Compatibility (Highest Priority - 150-200 points)
      // Material-specific etchants get highest priority when they match
      if (compatible.includes(materialCategory)) {
        if (etchantCategory === 'material-specific') {
          score += 200  // Material-specific etchants are the gold standard
          reasons.push('✓ Material-specific etchant')
        } else if (etchantCategory === 'specialty') {
          score += 150  // Specialty etchants are highly targeted
          reasons.push('✓ Specialty etchant')
        } else {
          score += 100  // General-purpose is good but lower priority
          reasons.push('✓ Compatible')
        }
      }
      
      // TIER 2: Material's Common Etchants (Proven combinations - 120 points)
      // These are documented, proven combinations - very high confidence
      if (selectedMaterial.common_etchants?.some(name => {
        const nameLower = name.toLowerCase()
        return etchantName.includes(nameLower) || 
               nameLower.includes(etchantName) ||
               etchant.alternative_names?.some(alt => 
                 alt.toLowerCase().includes(nameLower) || 
                 nameLower.includes(alt.toLowerCase())
               )
      })) {
        score += 120
        reasons.push('✓ Material-specific recommendation')
        expertTips.push('This is a documented, proven etchant for this material')
      }

      // TIER 3: Direct Material Link (90 points)
      // Explicit relationship in database
      if (etchant.related_material_ids?.includes(selectedMaterial.id)) {
        score += 90
        reasons.push('✓ Direct database link')
      }

      // TIER 4: Purpose-Based Matching (Critical for user needs - 120-150 points)
      // This is what the user actually wants to see - should have HIGH impact to override general compatibility
      if (purposeFilter && purposeFilter !== 'general') {
        const purposeKeywords: Record<PurposeFilter, string[]> = {
          'grain-boundaries': ['grain boundary', 'grain boundaries', 'grain structure', 'grain size', 'grain'],
          'carbides': ['carbide', 'carbides', 'm23c6', 'm6c', 'm7c3', 'cementite'],
          'phases': ['phase', 'phases', 'phase structure', 'alpha', 'beta', 'gamma', 'delta', 'alpha-beta'],
          'precipitates': ['precipitate', 'precipitates', 'precipitation', 'intermetallic', 'precipitation'],
          'inclusions': ['inclusion', 'inclusions', 'non-metallic'],
          'twin-boundaries': ['twin', 'twins', 'twin boundary', 'twinning', 'annealing twin'],
          'martensite': ['martensite', 'martensitic'],
          'pearlite': ['pearlite', 'pearlitic', 'lamellar'],
          'ferrite': ['ferrite', 'ferritic', 'delta ferrite'],
          'austenite': ['austenite', 'austenitic', 'retained austenite'],
          'nodularity': ['nodularity', 'nodular', 'graphite', 'graphite shape', 'graphite distribution', 'ductile iron', 'nodular iron', 'spheroidal graphite'],
          'general': []
        }
        
        const keywords = purposeKeywords[purposeFilter as PurposeFilter] || []
        const searchText = `${reveals} ${typicalResults} ${etchantName}`
        
        // Check if etchant explicitly reveals what user wants
        const matchesPurpose = keywords.some(keyword => searchText.includes(keyword))
        
        if (matchesPurpose) {
          // If it's in the "reveals" field, it's a primary purpose - VERY HIGH weight
          // This should be able to rank higher than general compatibility
          if (keywords.some(keyword => reveals.includes(keyword))) {
            score += 150  // Increased from 100 - purpose match should be very significant
            reasons.push(`✓ Specifically reveals ${purposeFilter.replace('-', ' ')}`)
            expertTips.push(`This etchant is specifically designed to reveal ${purposeFilter.replace('-', ' ')}`)
          } else {
            // Mentioned in results or name - still good but secondary
            score += 100  // Increased from 60
            reasons.push(`✓ Reveals ${purposeFilter.replace('-', ' ')}`)
          }
        }
        
        // Special handling for nodularity - cast iron specific
        if (purposeFilter === 'nodularity') {
          // Stead's reagent is specifically for revealing graphite in cast iron
          if (etchantName.includes('stead')) {
            score += 80
            reasons.push('✓ Stead\'s reagent - specifically for graphite/nodularity')
            expertTips.push('Stead\'s reagent is the standard etchant for revealing graphite shape and nodularity in cast iron')
          }
          // Cast iron materials should prioritize etchants that reveal graphite
          if (materialCategory === 'cast-iron' || selectedMaterial.name.toLowerCase().includes('cast iron') ||
              selectedMaterial.name.toLowerCase().includes('ductile') || selectedMaterial.name.toLowerCase().includes('nodular')) {
            if (reveals.includes('graphite') || etchantName.includes('stead') || etchantName.includes('picral')) {
              score += 60
              reasons.push('✓ Good for cast iron nodularity analysis')
            }
          }
        }
        
        // Note: We don't penalize non-matching etchants here because material compatibility
        // is still important. The higher bonus for matching purposes will naturally rank them higher.
      }

      // TIER 5: Composition-Based Expert Matching (70-80 points)
      // Expert knowledge about alloy-specific etchants
      if (composition.hasChromium && materialCategory === 'stainless-steel') {
        // Stainless steel specific etchants
        if (etchantName.includes('kallings') || etchantName.includes('kalling')) {
          score += 80
          reasons.push('✓ Kalling\'s - standard for austenitic stainless')
        } else if (etchantName.includes('glyceregia')) {
          score += 80
          reasons.push('✓ Glyceregia - excellent for stainless and nickel alloys')
        } else if (etchantName.includes('vilella')) {
          score += 75
          reasons.push('✓ Vilella\'s - excellent for tool steels and carbides')
        } else if (etchantName.includes('aqua regia')) {
          score += 70
          reasons.push('✓ Aqua Regia - very aggressive for difficult materials')
        }
        
        // Electrolytic etchants are often preferred for stainless
        if (etchant.application_method === 'electrolytic') {
          score += 70
          reasons.push('✓ Electrolytic - preferred method for stainless')
          expertTips.push('Electrolytic etching provides superior control and reproducibility for stainless steels')
        }
      }
      
      if (composition.hasNickel || materialCategory === 'nickel-alloys') {
        if (etchantName.includes('kallings') || etchantName.includes('kalling')) {
          score += 75
          reasons.push('✓ Kalling\'s - standard for nickel alloys')
        } else if (etchantName.includes('glyceregia')) {
          score += 80
          reasons.push('✓ Glyceregia - excellent for nickel superalloys')
        } else if (etchantName.includes('inconel')) {
          score += 75
          reasons.push('✓ Inconel-specific etchant')
        }
      }
      
      if (composition.hasTitanium || materialCategory === 'titanium') {
        if (etchantName.includes('kroll')) {
          score += 90
          reasons.push('✓ Kroll\'s - standard etchant for titanium')
          expertTips.push('Kroll\'s reagent is the industry standard for titanium alloys')
        } else if (etchantName.includes('ti-ap-16') || etchantName.includes('ap-16')) {
          score += 75
          reasons.push('✓ Alternative titanium etchant')
        }
      }
      
      if (composition.hasAluminum || materialCategory === 'aluminum') {
        if (etchantName.includes('keller')) {
          score += 90
          reasons.push('✓ Keller\'s - standard etchant for aluminum')
          expertTips.push('Keller\'s reagent is the most common etchant for aluminum alloys')
        } else if (etchantName.includes('tucker')) {
          score += 75
          reasons.push('✓ Tucker\'s - good for heat-treated aluminum')
        } else if (etchantName.includes('barker') && etchant.application_method === 'electrolytic') {
          score += 80
          reasons.push('✓ Barker\'s electrolytic - excellent for aluminum')
          expertTips.push('Barker\'s electrolytic produces beautiful interference colors for phase identification')
        }
      }
      
      if (composition.hasCopper || materialCategory === 'copper-brass') {
        if (etchantName.includes('ammonium persulfate') || etchantName.includes('persulfate')) {
          score += 85
          reasons.push('✓ Ammonium Persulfate - standard for copper/brass')
        } else if (etchantName.includes('ferric chloride') || etchantName.includes('fecl')) {
          score += 70
          reasons.push('✓ Ferric Chloride - good for copper alloys')
        } else if (etchantName.includes('marble')) {
          score += 70
          reasons.push('✓ Marble\'s - excellent for revealing twins')
        }
      }

      // TIER 6: Microstructure-Based Matching (50-60 points)
      // Match etchants to specific microstructures
      if (microstructureTypes.length > 0) {
        const searchText = `${reveals} ${typicalResults}`
        
        if (microstructureTypes.includes('martensitic')) {
          if (reveals.includes('martensite') || reveals.includes('martensitic')) {
            score += 60
            reasons.push('✓ Specifically for martensitic structures')
          } else if (etchantName.includes('nital') || etchantName.includes('picral') || 
                     etchantName.includes('vilella')) {
            score += 50
            reasons.push('✓ Good for martensitic structures')
          }
        }
        
        if (microstructureTypes.includes('austenitic')) {
          if (reveals.includes('austenite') || reveals.includes('austenitic')) {
            score += 60
            reasons.push('✓ Specifically for austenitic structures')
          } else if (etchant.application_method === 'electrolytic' ||
                     etchantName.includes('kallings') || etchantName.includes('glyceregia')) {
            score += 50
            reasons.push('✓ Good for austenitic structures')
          }
        }
        
        if (microstructureTypes.includes('ferritic')) {
          if (reveals.includes('ferrite') || reveals.includes('ferritic')) {
            score += 55
            reasons.push('✓ Specifically for ferritic structures')
          } else if (etchantName.includes('nital') || etchantName.includes('picral')) {
            score += 45
            reasons.push('✓ Good for ferritic structures')
          }
        }
        
        if (microstructureTypes.includes('pearlitic')) {
          if (reveals.includes('pearlite') || reveals.includes('pearlitic')) {
            score += 60
            reasons.push('✓ Specifically for pearlitic structures')
            if (etchantName.includes('picral')) {
              score += 20  // Picral is excellent for pearlite
              expertTips.push('Picral is specifically designed to reveal pearlite structure')
            }
          } else if (etchantName.includes('nital') || etchantName.includes('picral')) {
            score += 45
            reasons.push('✓ Good for pearlitic structures')
          }
        }
        
        if (microstructureTypes.includes('duplex')) {
          if (etchantName.includes('weck') || etchantName.includes('klemm') || 
              etchantName.includes('beraha')) {
            score += 70
            reasons.push('✓ Color etchant for duplex structures')
            expertTips.push('Color etchants are excellent for distinguishing phases in duplex stainless')
          }
        }
      }

      // EXPERT: Heat treatment state awareness
      if (heatTreatmentStates.length > 0) {
        // Quenched/tempered materials may need different etchants
        if (heatTreatmentStates.includes('quenched') || heatTreatmentStates.includes('tempered')) {
          if (etchantName.includes('nital') || etchantName.includes('picral')) {
            score += 30
            reasons.push('✓ For heat-treated materials')
            expertTips.push('For quenched/tempered materials, start with shorter etch times')
          }
        }
        
        // Solution-treated materials (especially aluminum, stainless)
        if (heatTreatmentStates.includes('solution-treated')) {
          if (etchantName.includes('keller') || etchantName.includes('weck') || 
              etchantName.includes('electrolytic')) {
            score += 25
            reasons.push('✓ For solution-treated materials')
          }
        }
      }

      // TIER 7: Application Context Matching (60-100 points)
      // Context-specific recommendations - should have significant impact on ranking
      if (applicationContext && applicationContext !== 'general') {
        if (applicationContext === 'quality-control') {
          // For QC, ASTM-referenced etchants are CRITICAL - should rank very high
          if (etchant.astm_references && etchant.astm_references.length > 0) {
            score += 100  // Increased from 60 - ASTM is critical for QC
            reasons.push('✓ ASTM standard - ideal for QC')
            // Add tip only if not already added in TIER 11
            if (!expertTips.some(tip => tip.includes('ASTM'))) {
              expertTips.push('ASTM-referenced etchants ensure reproducibility and compliance with standards')
            }
          } else {
            // Non-ASTM etchants should rank lower for QC applications
            score -= 30
          }
          if (etchant.featured) {
            score += 50  // Increased from 40
            reasons.push('✓ Featured - proven reliability')
          }
        }
        
        if (applicationContext === 'failure-analysis') {
          // Prefer etchants that reveal multiple features - critical for failure analysis
          const revealCount = (etchant.reveals || '').split(',').length
          if (revealCount > 2) {
            score += 80  // Increased from 50 - multi-feature is very important for failure analysis
            reasons.push('✓ Multi-feature reveal')
            // Only add tip if not already added
            if (!expertTips.some(tip => tip.includes('progressive etching'))) {
              expertTips.push('For failure analysis, consider progressive etching with multiple etchants')
            }
          }
          // Specialty etchants often better for failure analysis
          if (etchantCategory === 'specialty') {
            score += 50  // Increased from 30
            reasons.push('✓ Specialty etchant for detailed analysis')
          }
        }
        
        if (applicationContext === 'heat-treatment-verification') {
          // Prefer etchants that reveal heat treatment effects
          if (reveals.includes('martensite') || reveals.includes('bainite') || 
              reveals.includes('prior austenite') || etchantName.includes('sodium metabisulfite')) {
            score += 90  // Increased from 60
            reasons.push('✓ Reveals heat treatment structure')
            expertTips.push('This etchant is specifically effective for revealing heat treatment effects')
          } else if (etchantName.includes('nital') || etchantName.includes('picral')) {
            score += 60  // Increased from 40
            reasons.push('✓ Good for heat treatment verification')
          }
        }
        
        if (applicationContext === 'welding-analysis') {
          // Welding analysis needs etchants that work across different zones
          if (etchantName.includes('nital') || etchantName.includes('vilella') || 
              etchant.application_method === 'electrolytic') {
            score += 70  // Increased from 45
            reasons.push('✓ Suitable for weld analysis')
            expertTips.push('For weld analysis, consider etching base metal, HAZ, and fusion zone separately')
          }
        }
        
        if (applicationContext === 'research') {
          // For research, prefer etchants with detailed documentation and versatility
          if (etchant.astm_references && etchant.astm_references.length > 0) {
            score += 40
            reasons.push('✓ ASTM standard - well documented')
          }
          if (etchant.reveals && (etchant.reveals || '').split(',').length > 2) {
            score += 50
            reasons.push('✓ Multi-feature reveal - versatile for research')
          }
        }
      }

      // Hardness-based recommendations (enhanced)
      if (selectedMaterial.hardness_category) {
        const hardness = selectedMaterial.hardness_category
        const etchantNameLower = etchantName
        
        // Higher concentration Nital for harder materials
        if (hardness === 'hard' || hardness === 'very-hard') {
          if (etchantNameLower.includes('nital-5') || etchantNameLower.includes('nital-8') || 
              etchantNameLower.includes('5% nital') || etchantNameLower.includes('8% nital')) {
            score += 30
            reasons.push('✓ For hard materials')
            expertTips.push('Harder materials may require longer etch times or higher concentrations')
          } else if (etchantNameLower.includes('nital-2') || etchantNameLower.includes('2% nital')) {
            warnings.push('2% nital may be too weak for very hard materials - consider 5% or higher')
          }
        } else if (hardness === 'soft' || hardness === 'medium') {
          if (etchantNameLower.includes('nital-2') || etchantNameLower.includes('nital-3') ||
              etchantNameLower.includes('2% nital') || etchantNameLower.includes('3% nital')) {
            score += 20
            reasons.push('✓ For softer materials')
            expertTips.push('Softer materials require shorter etch times to prevent over-etching')
          } else if (etchantNameLower.includes('nital-8') || etchantNameLower.includes('8% nital')) {
            warnings.push('8% nital may be too aggressive for soft materials - start with 2-3%')
          }
        }
      }

      // EXPERT: Carbon content considerations
      if (composition.carbonContent) {
        if (composition.carbonContent === 'high') {
          if (etchantName.includes('picral') || etchantName.includes('nital')) {
            score += 25
            reasons.push('✓ For high-carbon steels')
            expertTips.push('High-carbon steels: Picral is excellent for revealing cementite networks')
          }
        } else if (composition.carbonContent === 'low') {
          if (etchantName.includes('nital')) {
            score += 20
            reasons.push('✓ For low-carbon steels')
          }
        }
      }

      // TIER 8: Hardness-Based Optimization (30-40 points)
      // Match etchant concentration to material hardness
      if (selectedMaterial.hardness_category) {
        const hardness = selectedMaterial.hardness_category
        
        if (hardness === 'hard' || hardness === 'very-hard') {
          // Higher concentration Nital for harder materials
          if (etchantName.match(/nital.*[5-9]|nital.*8|nital.*10|[5-9]% nital|8% nital|10% nital/)) {
            score += 40
            reasons.push('✓ Higher concentration for hard materials')
            expertTips.push('Harder materials require higher concentrations or longer etch times')
          } else if (etchantName.match(/nital.*[2-3]|2% nital|3% nital/)) {
            warnings.push('Lower concentration Nital may be insufficient for very hard materials')
          }
        } else if (hardness === 'soft' || hardness === 'medium') {
          // Lower concentration for softer materials
          if (etchantName.match(/nital.*[2-3]|2% nital|3% nital/)) {
            score += 35
            reasons.push('✓ Appropriate concentration for softer materials')
            expertTips.push('Softer materials require shorter etch times to prevent over-etching')
          } else if (etchantName.match(/nital.*[8-9]|nital.*10|8% nital|10% nital/)) {
            warnings.push('Higher concentration Nital may be too aggressive - start with 2-3%')
          }
        }
      }

      // TIER 9: Carbon Content Matching (25-30 points)
      if (composition.carbonContent) {
        if (composition.carbonContent === 'high') {
          if (etchantName.includes('picral')) {
            score += 35
            reasons.push('✓ Picral excellent for high-carbon steels')
            expertTips.push('Picral is specifically excellent for revealing cementite networks in high-carbon steels')
          } else if (etchantName.includes('nital')) {
            score += 25
            reasons.push('✓ Nital good for high-carbon steels')
          }
        } else if (composition.carbonContent === 'low') {
          if (etchantName.includes('nital')) {
            score += 30
            reasons.push('✓ Nital standard for low-carbon steels')
          }
        }
      }

      // TIER 10: Heat Treatment State (20-30 points)
      if (heatTreatmentStates.length > 0) {
        if (heatTreatmentStates.includes('quenched') || heatTreatmentStates.includes('tempered')) {
          if (etchantName.includes('nital') || etchantName.includes('picral') ||
              etchantName.includes('sodium metabisulfite')) {
            score += 30
            reasons.push('✓ Suitable for quenched/tempered materials')
            expertTips.push('For quenched/tempered materials, start with shorter etch times and monitor closely')
          }
        }
        
        if (heatTreatmentStates.includes('solution-treated')) {
          if (etchantName.includes('keller') || etchantName.includes('weck') || 
              etchant.application_method === 'electrolytic') {
            score += 25
            reasons.push('✓ Good for solution-treated materials')
          }
        }
      }

      // TIER 11: Quality Indicators (10-25 points)
      // ASTM standard compliance - important for QC
      if (etchant.astm_references && etchant.astm_references.length > 0) {
        score += 25
        reasons.push(`✓ ASTM ${etchant.astm_references[0]}`)
        // Only add tip if not already added in TIER 7 for QC context
        if (applicationContext === 'quality-control' && !expertTips.some(tip => tip.includes('ASTM'))) {
          expertTips.push(`ASTM ${etchant.astm_references[0]} compliance ensures reproducibility for quality control`)
        }
      }

      // Featured etchants - these are the most commonly used and reliable
      if (etchant.featured) {
        score += 20
        reasons.push('✓ Featured - most commonly used')
        expertTips.push('Featured etchants are industry-standard choices with proven reliability')
      }

      // PACE product available - convenience factor
      if (etchant.pace_product_available) {
        score += 10
        reasons.push('✓ Pre-mixed available')
      }

      // EXPERT: Safety warnings for specific combinations
      if (etchant.hazards && etchant.hazards.length > 0) {
        if (etchant.hazards.includes('corrosive') && materialCategory === 'aluminum') {
          warnings.push('Corrosive etchants on aluminum require careful handling - ensure proper ventilation')
        }
        if (etchant.hazards.includes('toxic') && applicationContext === 'quality-control') {
          warnings.push('Toxic etchant - ensure proper PPE and disposal procedures for production use')
        }
      }

      // EXPERT: Time and temperature optimization tips
      if (etchant.typical_time_seconds) {
        if (selectedMaterial.hardness_category === 'very-hard' && etchant.typical_time_seconds < 10) {
          expertTips.push(`Very hard materials may require longer than ${etchant.typical_time_seconds}s - monitor visually`)
        }
        if (selectedMaterial.hardness_category === 'soft' && etchant.typical_time_seconds > 30) {
          expertTips.push(`Soft materials may over-etch in ${etchant.typical_time_seconds}s - start with shorter times`)
        }
      }

      // Only include etchants with positive score
      if (score > 0) {
        // Deduplicate expert tips and warnings
        const uniqueExpertTips = Array.from(new Set(expertTips))
        const uniqueWarnings = Array.from(new Set(warnings))
        
        matches.push({ 
          etchant, 
          score, 
          matchReasons: reasons,
          expertTips: uniqueExpertTips.length > 0 ? uniqueExpertTips : undefined,
          warnings: uniqueWarnings.length > 0 ? uniqueWarnings : undefined
        })
      }
    }

    // Sort by score (highest first), then assign sequence numbers for progressive etching
    const sorted = matches.sort((a, b) => b.score - a.score)
    
    // Assign sequence numbers for top recommendations (for progressive etching guidance)
    sorted.forEach((match, index) => {
      if (index < 3 && applicationContext === 'failure-analysis') {
        match.recommendedSequence = index + 1
      }
    })
    
    // Limit to top 8-10 results
    return sorted.slice(0, 10)
  }, [selectedMaterial, etchants, purposeFilter, applicationContext, analyzeComposition, getMicrostructureType, getHeatTreatmentState])

  const purposeOptions: { value: PurposeFilter; label: string; description: string }[] = [
    { value: 'grain-boundaries', label: 'Grain Boundaries', description: 'Reveal grain structure and size' },
    { value: 'carbides', label: 'Carbides', description: 'Highlight carbide particles and distribution' },
    { value: 'phases', label: 'Phases', description: 'Distinguish different phases (alpha, beta, etc.)' },
    { value: 'precipitates', label: 'Precipitates', description: 'Show precipitation and intermetallics' },
    { value: 'inclusions', label: 'Inclusions', description: 'Reveal non-metallic inclusions' },
    { value: 'twin-boundaries', label: 'Twin Boundaries', description: 'Show twinning in crystals' },
    { value: 'martensite', label: 'Martensite', description: 'Highlight martensitic structure' },
    { value: 'pearlite', label: 'Pearlite', description: 'Reveal pearlitic structures' },
    { value: 'ferrite', label: 'Ferrite', description: 'Distinguish ferrite phase' },
    { value: 'austenite', label: 'Austenite', description: 'Distinguish austenite phase' },
    { value: 'nodularity', label: 'Nodularity', description: 'Reveal graphite shape in cast iron' },
    { value: 'general', label: 'General Purpose', description: 'General microstructure examination' }
  ]

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  // Get match score percentage
  const getScorePercentage = (score: number): number => {
    // New scoring system max: 
    // Tier 1: 200 (material-specific compatible) + Tier 2: 120 (common etchants) + Tier 3: 90 (direct link) +
    // Tier 4: 100 (purpose match) + Tier 5: 90 (composition) + Tier 6: 60 (microstructure) +
    // Tier 7: 60 (application context) + Tier 8: 40 (hardness) + Tier 9: 35 (carbon) +
    // Tier 10: 30 (heat treatment) + Tier 11: 25 (ASTM) + 20 (featured) + 10 (PACE) = ~880 theoretical max
    // Use 600 as practical max for percentage calculation (most real matches will be 200-400 range)
    const maxScore = 600
    return Math.min(100, Math.round((score / maxScore) * 100))
  }

  // Get score color
  const getScoreColor = (score: number): string => {
    const percentage = getScorePercentage(score)
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-blue-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-gray-400'
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading materials and etchants...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Smart Etchant Selector</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find the perfect etchant using our intelligent matching system. Select your material and purpose for personalized recommendations.
            </p>
          </div>

          {/* Material Selection */}
          <div className="card mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 font-bold text-xs">1</span>
                <span>Select Your Material</span>
              </h2>
              {selectedMaterial && (
                <button
                  onClick={() => {
                    setSelectedMaterial(null)
                    setSelectedEtchant(null)
                    setPurposeFilter('')
                    setApplicationContext('')
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              )}
            </div>

            {/* Common Materials Quick Select */}
            {!selectedMaterial && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Common Materials:</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {commonMaterials.map((common) => {
                    const material = getMaterialsByCategory(common.category)
                    if (!material) return null
                    const IconComponent = common.icon
                    return (
                      <button
                        key={common.category}
                        onClick={() => {
                          setSelectedMaterial(material)
                          setMaterialSearchQuery('')
                          setShowSearchResults(false)
                          setSelectedEtchant(null)
                          setApplicationContext('')
                          setPurposeFilter('')
                        }}
                        className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 group"
                      >
                        <IconComponent className="w-5 h-5 mb-1 text-gray-600 group-hover:text-primary-600 transition-colors" />
                        <span className="text-xs font-medium text-gray-700 group-hover:text-primary-600">{common.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={materialSearchQuery}
                  onChange={(e) => {
                    setMaterialSearchQuery(e.target.value)
                    setShowSearchResults(true)
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Search by name, category, or alloy designation..."
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {showSearchResults && materialSearchQuery && filteredMaterials.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                  {filteredMaterials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => {
                        setSelectedMaterial(material)
                        setMaterialSearchQuery('')
                        setShowSearchResults(false)
                        setSelectedEtchant(null)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                        selectedMaterial?.id === material.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{material.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {material.category}
                        {material.composition && ` • ${material.composition}`}
                      </div>
                      {material.hardness && (
                        <div className="text-xs text-gray-500 mt-1">Hardness: {material.hardness}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedMaterial && (
              <div className="mt-6 p-5 bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-200 rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{selectedMaterial.name}</h3>
                      {selectedMaterial.featured && (
                        <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> Featured
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                      <div><strong>Category:</strong> {selectedMaterial.category}</div>
                      {selectedMaterial.composition && (
                        <div><strong>Composition:</strong> {selectedMaterial.composition}</div>
                      )}
                      {selectedMaterial.hardness && (
                        <div><strong>Hardness:</strong> {selectedMaterial.hardness}</div>
                      )}
                      {selectedMaterial.hardness_category && (
                        <div>
                          <span className="inline-block px-3 py-1 bg-primary-200 text-primary-900 text-xs font-semibold rounded-full">
                            {selectedMaterial.hardness_category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMaterial(null)
                      setSelectedEtchant(null)
                      setPurposeFilter('')
                      setApplicationContext('')
                    }}
                    className="ml-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors"
                    aria-label="Clear selection"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Application Context Selection */}
          {selectedMaterial && (
            <div className="card mb-8 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 font-bold text-xs">2</span>
                <span>Application Context</span>
                <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { value: 'quality-control', label: 'Quality Control', icon: CheckCircle2, desc: 'Standard inspection and testing' },
                  { value: 'failure-analysis', label: 'Failure Analysis', icon: AlertTriangle, desc: 'Root cause investigation' },
                  { value: 'research', label: 'Research', icon: Lightbulb, desc: 'Scientific investigation' },
                  { value: 'heat-treatment-verification', label: 'Heat Treatment', icon: Flame, desc: 'Verify heat treatment effects' },
                  { value: 'welding-analysis', label: 'Welding Analysis', icon: Wrench, desc: 'Weld zone examination' },
                  { value: 'general', label: 'General Purpose', icon: BarChart3, desc: 'General microstructure examination' }
                ].map((option) => {
                  const IconComponent = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        setApplicationContext(applicationContext === option.value ? '' : option.value as ApplicationContext)
                        setSelectedEtchant(null)
                      }}
                      className={`relative text-left px-4 py-4 border-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                        applicationContext === option.value
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className={`w-5 h-5 ${applicationContext === option.value ? 'text-primary-600' : 'text-gray-600'}`} />
                        <div className="font-semibold text-gray-900 text-sm">{option.label}</div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{option.desc}</div>
                      {applicationContext === option.value && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full"></div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Purpose Selection */}
          {selectedMaterial && (
            <div className="card mb-8 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 font-bold text-xs">3</span>
                <span>What Do You Want to Reveal?</span>
                <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {purposeOptions.map((option) => {
                  const IconComponent = purposeIcons[option.value]
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        setPurposeFilter(purposeFilter === option.value ? '' : option.value)
                        setSelectedEtchant(null)
                      }}
                      className={`relative text-left px-4 py-4 border-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                        purposeFilter === option.value
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className={`w-5 h-5 ${purposeFilter === option.value ? 'text-primary-600' : 'text-gray-600'}`} />
                        <div className="font-semibold text-gray-900 text-sm">{option.label}</div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                      {purposeFilter === option.value && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full"></div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Etchant Recommendations */}
          {selectedMaterial && matchedEtchants.length > 0 && (
            <div className="card mb-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 font-bold text-xs">4</span>
                  <span>Recommended Etchants</span>
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({matchedEtchants.length} found)
                  </span>
                </h2>
                <div className="flex gap-2">
                  {(purposeFilter || applicationContext) && (
                    <button
                      onClick={() => {
                        setPurposeFilter('')
                        setApplicationContext('')
                        setSelectedEtchant(null)
                      }}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    >
                      <span>Clear filters</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {matchedEtchants.map((match, index) => {
                  const etchant = match.etchant
                  const scorePercentage = getScorePercentage(match.score)
                  
                  return (
                    <Link
                      key={etchant.id}
                      href={`/etchants/${etchant.slug || etchant.id}`}
                      className={`group relative border-2 rounded-xl p-5 block transition-all duration-200 hover:shadow-lg ${
                        selectedEtchant?.id === etchant.id
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      {/* Score Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-xl overflow-hidden">
                        <div 
                          className={`h-full ${getScoreColor(match.score)} transition-all duration-500`}
                          style={{ width: `${scorePercentage}%` }}
                        ></div>
                      </div>

                      <div className="flex items-start gap-4">
                        {/* Badges */}
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          {index < 3 && (
                            <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full text-center">
                              #{index + 1}
                            </span>
                          )}
                          {etchant.featured && (
                            <span className="px-3 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full text-center flex items-center justify-center gap-1">
                              <Star className="w-3 h-3 fill-current" /> Featured
                            </span>
                          )}
                          {etchant.pace_product_available && getPaceProductUrl(etchant) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                window.open(getPaceProductUrl(etchant)!, '_blank', 'noopener,noreferrer')
                              }}
                              className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full text-center flex items-center justify-center gap-1 hover:bg-green-600 transition-colors"
                            >
                              <ShoppingCart className="w-3 h-3" /> Available
                            </button>
                          )}
                          {etchant.pace_product_available && !getPaceProductUrl(etchant) && (
                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full text-center flex items-center justify-center gap-1">
                              <ShoppingCart className="w-3 h-3" /> Available
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {etchant.name}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs font-semibold text-gray-600">
                                {scorePercentage}% match
                              </span>
                            </div>
                          </div>
                          
                          {match.matchReasons.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {match.matchReasons.map((reason, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium"
                                >
                                  {reason}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Expert Tips */}
                          {match.expertTips && match.expertTips.length > 0 && (
                            <div className="mb-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-xs font-semibold text-blue-900 mb-1">Expert Tip:</div>
                                  {match.expertTips.map((tip, i) => (
                                    <div key={i} className="text-xs text-blue-800 mb-1 last:mb-0">
                                      {tip}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Warnings */}
                          {match.warnings && match.warnings.length > 0 && (
                            <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-xs font-semibold text-yellow-900 mb-1">Important:</div>
                                  {match.warnings.map((warning, i) => (
                                    <div key={i} className="text-xs text-yellow-800 mb-1 last:mb-0">
                                      {warning}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Progressive Etching Sequence */}
                          {match.recommendedSequence && (
                            <div className="mb-3 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full">
                                  {match.recommendedSequence}
                                </span>
                                <span className="text-xs font-semibold text-purple-900">
                                  Recommended for progressive etching sequence
                                </span>
                              </div>
                            </div>
                          )}

                          {etchant.typical_results && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{etchant.typical_results}</p>
                          )}

                          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">Composition:</span>
                              <span>{etchant.composition}</span>
                            </div>
                            {etchant.concentration && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">Concentration:</span>
                                <span>{etchant.concentration}</span>
                              </div>
                            )}
                            {etchant.application_method && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">Method:</span>
                                <span className="capitalize">{etchant.application_method}</span>
                              </div>
                            )}
                            {etchant.typical_time_seconds && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">Time:</span>
                                <span>{etchant.typical_time_seconds}s</span>
                              </div>
                            )}
                          </div>

                          {etchant.reveals && (
                            <div className="mt-3 text-xs text-gray-600">
                              <span className="font-semibold">Reveals:</span> {etchant.reveals}
                            </div>
                          )}

                          {/* View Details Indicator */}
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
                              Click to view full details
                              <ExternalLink className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Progressive Etching Sequence Recommendation */}
          {selectedMaterial && applicationContext === 'failure-analysis' && matchedEtchants.length > 1 && (
            <div className="card mb-8 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Progressive Etching Strategy</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    For failure analysis, consider using multiple etchants in sequence to reveal different microstructural features progressively.
                  </p>
                  <div className="space-y-3">
                    {matchedEtchants.slice(0, 3).map((match, index) => (
                      <div key={match.etchant.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Link
                            href={`/etchants/${match.etchant.slug || match.etchant.id}`}
                            className="font-semibold text-gray-900 mb-1 hover:text-primary-600 hover:underline block"
                          >
                            {match.etchant.name}
                          </Link>
                          <div className="text-xs text-gray-600">
                            {match.etchant.reveals || 'General microstructure features'}
                          </div>
                          {match.expertTips && match.expertTips.length > 0 && (
                            <div className="text-xs text-blue-700 mt-1 italic">
                              {match.expertTips[0]}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <div className="text-xs font-semibold text-yellow-900 mb-1">Expert Tip:</div>
                    <div className="text-xs text-yellow-800">
                      After each etching step, document the results before proceeding. This allows you to compare different microstructural features and identify the root cause of failure.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Etchant View */}
          {selectedEtchant && (
            <div className="card mb-8 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedEtchant.name}</h2>
                  {selectedEtchant.alternative_names && selectedEtchant.alternative_names.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Also known as: {selectedEtchant.alternative_names.join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedEtchant(null)}
                  className="ml-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Composition</div>
                    <div className="text-gray-900 font-mono text-sm">{selectedEtchant.composition}</div>
                    {selectedEtchant.concentration && (
                      <div className="text-sm text-gray-600 mt-2">
                        <strong>Concentration:</strong> {selectedEtchant.concentration}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedEtchant.application_method && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-xs font-semibold text-blue-700 mb-1">Method</div>
                        <div className="text-blue-900 font-semibold capitalize">{selectedEtchant.application_method}</div>
                      </div>
                    )}
                    {selectedEtchant.typical_time_seconds && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-xs font-semibold text-green-700 mb-1">Time</div>
                        <div className="text-green-900 font-semibold">{selectedEtchant.typical_time_seconds}s</div>
                      </div>
                    )}
                    {selectedEtchant.temperature_celsius && (
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-xs font-semibold text-orange-700 mb-1">Temperature</div>
                        <div className="text-orange-900 font-semibold">{selectedEtchant.temperature_celsius}°C</div>
                      </div>
                    )}
                    {selectedEtchant.voltage && (
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-xs font-semibold text-purple-700 mb-1">Voltage</div>
                        <div className="text-purple-900 font-semibold">{selectedEtchant.voltage}V</div>
                      </div>
                    )}
                  </div>

                  {selectedEtchant.reveals && (
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <div className="text-sm font-semibold text-primary-700 mb-2">Reveals</div>
                      <div className="text-primary-900">{selectedEtchant.reveals}</div>
                    </div>
                  )}

                  {selectedEtchant.typical_results && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Typical Results</div>
                      <div className="text-gray-900">{selectedEtchant.typical_results}</div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {selectedEtchant.application_notes && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Application Notes</div>
                      <div className="text-gray-900 whitespace-pre-line text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedEtchant.application_notes}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.preparation_notes && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Preparation Notes</div>
                      <div className="text-gray-900 whitespace-pre-line text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedEtchant.preparation_notes}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.storage_notes && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Storage Notes</div>
                      <div className="text-gray-900 whitespace-pre-line text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedEtchant.storage_notes}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.hazards && selectedEtchant.hazards.length > 0 && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <div className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Hazards
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-red-900 text-sm">
                        {selectedEtchant.hazards.map((hazard, index) => (
                          <li key={index}>{hazard}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEtchant.safety_notes && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <div className="text-sm font-semibold text-red-700 mb-2">Safety Notes</div>
                      <div className="text-red-900 whitespace-pre-line text-sm">{selectedEtchant.safety_notes}</div>
                    </div>
                  )}

                  {selectedEtchant.ppe_required && selectedEtchant.ppe_required.length > 0 && (
                    <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                      <div className="text-sm font-semibold text-yellow-700 mb-2">Required PPE</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedEtchant.ppe_required.map((ppe, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-yellow-100 text-yellow-900 text-sm rounded-full font-medium"
                          >
                            {ppe}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.compatible_materials && selectedEtchant.compatible_materials.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Compatible Materials</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedEtchant.compatible_materials.map((material, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.alternative_etchants && selectedEtchant.alternative_etchants.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Alternative Etchants</div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        {selectedEtchant.alternative_etchants.map((alt, index) => (
                          <li key={index}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEtchant.astm_references && selectedEtchant.astm_references.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">ASTM References</div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        {selectedEtchant.astm_references.map((ref, index) => (
                          <li key={index}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {getPaceProductUrl(selectedEtchant) && (
                <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-6 text-center shadow-lg">
                  <h3 className="text-xl font-bold mb-2">Available from PACE Technologies</h3>
                  <p className="text-primary-100 text-sm mb-4">
                    Purchase this pre-mixed etching solution for reliable, consistent results.
                  </p>
                  <a
                    href={getPaceProductUrl(selectedEtchant)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    View Product →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Empty States */}
          {selectedMaterial && matchedEtchants.length === 0 && (
            <div className="card mb-8 shadow-lg">
              <div className="text-center py-12">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Etchants Found</h3>
                <p className="text-gray-600 mb-4">
                  No etchants found for this material with the current filters.
                </p>
                <div className="flex gap-3 justify-center">
                  {purposeFilter && (
                    <button
                    onClick={() => {
                      setPurposeFilter('')
                      setApplicationContext('')
                      setSelectedEtchant(null)
                    }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedMaterial(null)
                      setSelectedEtchant(null)
                      setPurposeFilter('')
                      setApplicationContext('')
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Select Different Material
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="card shadow-lg bg-gradient-to-br from-blue-50/50 to-transparent border border-blue-100">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-gray-800">
                <Lightbulb className="w-5 h-5 text-blue-600" /> Expert Etching Tips
              </h3>
              <ul className="text-sm text-gray-700 space-y-2.5 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-gray-800">Material Compatibility:</strong> Always verify etchant compatibility with your specific alloy composition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-gray-800">Surface Preparation:</strong> Ensure proper polishing (0.05μm or better) before etching for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-gray-800">Etch Timing:</strong> Start with shorter times and increase gradually - over-etching is difficult to reverse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-gray-800">Hardness Considerations:</strong> Harder materials may require higher concentrations or longer times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-gray-800">Heat Treatment State:</strong> Quenched/tempered materials often need different etchants than annealed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-gray-800">Progressive Etching:</strong> For complex analysis, use multiple etchants in sequence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-gray-800">Documentation:</strong> Record etch time, temperature, and method for reproducibility</span>
                </li>
              </ul>
            </div>

            <div className="card shadow-lg bg-gradient-to-br from-amber-50/50 to-transparent border border-amber-100">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-gray-800">
                <Shield className="w-5 h-5 text-amber-600" /> Safety Guidelines
              </h3>
              <ul className="text-sm text-gray-700 space-y-2.5 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Work in a well-ventilated area or fume hood - many etchants produce toxic fumes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Wear appropriate PPE (gloves, goggles, lab coat) - check etchant-specific requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Handle acids and corrosive chemicals with extreme care - use proper containers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Store etchants in properly labeled containers with hazard information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Dispose of used etchants according to local regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Never mix incompatible chemicals - check safety data sheets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Have emergency procedures ready (eyewash, safety shower, first aid)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Help Links */}
          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive guides on material-specific preparation and etching techniques.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/stainless-steel-preparation" className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
                Stainless Steel Guide →
              </Link>
              <Link href="/guides" className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
                Browse All Guides →
              </Link>
              {selectedMaterial && (
                <Link href={`/materials/${selectedMaterial.slug || selectedMaterial.id}`} className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
                  Material Details →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

