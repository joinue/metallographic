'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X, BookOpen, FileText, Calculator, ChevronRight, Hash, Database, Newspaper, Wrench, Package } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAllMaterials, getPublishedBlogPosts, getAllEquipment, getAllConsumables, type Material, type BlogPost, type Equipment, type Consumable } from '@/lib/supabase'
import LoadingSpinner from '@/components/LoadingSpinner'

// Search data structure
interface SearchItem {
  id: string
  title: string
  description?: string
  url: string
  type: 'guide' | 'guide-section' | 'resource' | 'tool' | 'material' | 'blog' | 'equipment' | 'consumable'
  category?: string
  guideSlug?: string
  alternativeNames?: string[] // For materials with alternative names
  score?: number // Relevance score
}

// Synonym mapping for better search matching
const synonyms: Record<string, string[]> = {
  'grinding': ['abrasive', 'sand', 'grit'],
  'polishing': ['finish', 'buff', 'shine'],
  'etching': ['etch', 'reagent', 'chemical'],
  'mounting': ['embed', 'encapsulate', 'mount'],
  'sectioning': ['cut', 'cutting', 'slice'],
  'hardness': ['hrc', 'hb', 'hv', 'rockwell', 'brinell', 'vickers'],
  'microstructure': ['structure', 'grain', 'phase'],
  'stainless': ['ss', 'stainless steel'],
  'aluminum': ['al', 'aluminium'],
  'titanium': ['ti', 'ti-', 'grade'],
  'ti': ['titanium'],
  'copper': ['cu'],
  'nickel': ['ni'],
}

// Expand search term with synonyms
const expandSearchTerm = (term: string): string[] => {
  const terms = [term.toLowerCase()]
  const lowerTerm = term.toLowerCase()
  
  // Check if term matches any synonym key
  for (const [key, values] of Object.entries(synonyms)) {
    if (key.includes(lowerTerm) || lowerTerm.includes(key)) {
      terms.push(...values)
    }
    // Check if term matches any synonym value
    if (values.some(v => v.includes(lowerTerm) || lowerTerm.includes(v))) {
      terms.push(key, ...values)
    }
  }
  
  return Array.from(new Set(terms)) // Remove duplicates
}



// Guide sections data - all guide sections for search
const guideSections: Record<string, Array<{ id: string; label: string }>> = {
  'introduction-to-metallography': [
    { id: 'what-is-metallography', label: 'What is Metallography?' },
    { id: 'why-metallography-matters', label: 'Why Metallography Matters' },
    { id: 'history', label: 'A Short History of Metallography' },
    { id: 'basic-concepts', label: 'Basic Concepts and Terminology' },
    { id: 'phases-and-transformations', label: 'Phases and Phase Transformations' },
    { id: 'preparation-process', label: 'The Sample Preparation Process' },
    { id: 'microscopy-techniques', label: 'Microscopy Techniques' },
    { id: 'applications', label: 'Applications of Metallography' },
    { id: 'standards-practices', label: 'Standards and Best Practices' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'further-reading', label: 'Further Reading and Resources' },
  ],
  'purpose-and-applications': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'primary-purpose', label: 'Primary Purpose' },
    { id: 'quality-control', label: 'Quality Control' },
    { id: 'failure-analysis', label: 'Failure Analysis' },
    { id: 'research-development', label: 'Research & Development' },
    { id: 'materials-development', label: 'Materials Development' },
    { id: 'process-control', label: 'Process Control' },
    { id: 'standards-certification', label: 'Standards & Certification' },
    { id: 'conclusion', label: 'Conclusion' },
  ],
  'history-of-metallography': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'ancient-foundations', label: 'Ancient Foundations (pre-1800s)' },
    { id: 'birth-of-metallography', label: 'Birth of Metallography (1800–1860)' },
    { id: 'industrial-revolution', label: 'Industrial Revolution & Scientific Expansion (1860–1930)' },
    { id: 'electron-microscopy', label: 'Electron Microscopy Era (1930–1970)' },
    { id: 'digital-analytical', label: 'Digital and Analytical Metallography (1970–Present)' },
    { id: 'resources', label: 'Recommended Resources' },
  ],
  'equipment-overview': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'sectioning-equipment', label: 'Sectioning Equipment' },
    { id: 'mounting-equipment', label: 'Mounting Equipment' },
    { id: 'grinding-polishing', label: 'Grinding & Polishing Equipment' },
    { id: 'microscopy-equipment', label: 'Microscopy Equipment' },
    { id: 'hardness-testing', label: 'Hardness Testing Equipment' },
    { id: 'consumables', label: 'Consumables & Accessories' },
    { id: 'lab-setup', label: 'Laboratory Setup' },
    { id: 'equipment-selection', label: 'Selecting Equipment' },
  ],
  'safety-fundamentals': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'chemical-safety', label: 'Chemical Safety' },
    { id: 'equipment-safety', label: 'Equipment Safety' },
    { id: 'personal-protection', label: 'Personal Protective Equipment' },
    { id: 'ventilation', label: 'Ventilation and Fume Control' },
    { id: 'waste-management', label: 'Waste Management' },
    { id: 'emergency-procedures', label: 'Emergency Procedures' },
    { id: 'best-practices', label: 'Best Practices' },
  ],
  'common-misconceptions': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'preparation-misconceptions', label: 'Sample Preparation Misconceptions' },
    { id: 'technique-misconceptions', label: 'Technique Misconceptions' },
    { id: 'interpretation-misconceptions', label: 'Microstructure Interpretation' },
    { id: 'equipment-misconceptions', label: 'Equipment Misconceptions' },
    { id: 'time-quality', label: 'Time and Quality Misconceptions' },
    { id: 'best-practices', label: 'Avoiding Common Mistakes' },
  ],
  'sectioning': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'abrasive-sectioning', label: 'Abrasive Sectioning' },
    { id: 'abrasive-blade-selection', label: 'Abrasive Blade Selection' },
    { id: 'precision-wafering', label: 'Precision Wafering' },
    { id: 'diamond-blade-selection', label: 'Diamond Blade Selection' },
    { id: 'cutting-parameters', label: 'Cutting Parameters' },
    { id: 'best-practices', label: 'Best Practices' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
  'mounting': [
    { id: 'introduction', label: 'Introduction to Metallographic Mounting' },
    { id: 'overview', label: 'Overview of Mounting Methods' },
    { id: 'compression-mounting', label: 'Compression Mounting' },
    { id: 'castable-mounting', label: 'Castable Mounting' },
    { id: 'when-to-choose', label: 'When to Choose Which Method' },
    { id: 'best-practices', label: 'Mounting Best Practices' },
    { id: 'common-defects', label: 'Common Mounting Defects and How to Avoid Them' },
    { id: 'summary', label: 'Summary' },
  ],
  'metallographic-mounting': [
    { id: 'introduction', label: 'Introduction to Metallographic Mounting' },
    { id: 'overview', label: 'Overview of Mounting Methods' },
    { id: 'compression-mounting', label: 'Compression Mounting' },
    { id: 'castable-mounting', label: 'Castable Mounting' },
    { id: 'when-to-choose', label: 'When to Choose Which Method' },
    { id: 'best-practices', label: 'Mounting Best Practices' },
    { id: 'common-defects', label: 'Common Mounting Defects and How to Avoid Them' },
    { id: 'summary', label: 'Summary' },
  ],
  'grinding-techniques': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'grit-selection', label: 'Grit Selection' },
    { id: 'grinding-sequence', label: 'Grinding Sequence' },
    { id: 'technique', label: 'Proper Technique' },
    { id: 'pressure-control', label: 'Pressure Control' },
    { id: 'lubrication', label: 'Lubrication' },
    { id: 'material-specific', label: 'Material-Specific Considerations' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
  'polishing-methods': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'diamond-polishing', label: 'Diamond Polishing' },
    { id: 'polishing-abrasives', label: 'Polishing Abrasives & Suspensions' },
    { id: 'polishing-cloths', label: 'Polishing Cloths & Pads' },
    { id: 'oxide-polishing', label: 'Oxide Polishing' },
    { id: 'final-polishing', label: 'Final Polishing' },
    { id: 'controlled-removal', label: 'Controlled Material Removal' },
    { id: 'vibratory-polishing', label: 'Vibratory Polishing' },
    { id: 'material-specific', label: 'Material-Specific Techniques' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
  'microstructural-analysis': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'preparing-samples', label: 'Preparing Samples for Microscopy' },
    { id: 'choosing-microscope', label: 'Choosing the Right Microscope' },
    { id: 'microscopy-methods', label: 'Microscopy Methods and Techniques' },
    { id: 'common-microstructures', label: 'Common Microstructures and What They Mean' },
    { id: 'interpretation', label: 'Microstructural Interpretation' },
  ],
  'stainless-steel-preparation': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'sectioning', label: 'Sectioning' },
    { id: 'mounting', label: 'Mounting' },
    { id: 'grinding', label: 'Grinding' },
    { id: 'polishing', label: 'Polishing' },
    { id: 'etching', label: 'Etching' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
  'aluminum-sample-preparation': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'sectioning', label: 'Sectioning' },
    { id: 'mounting', label: 'Mounting' },
    { id: 'grinding', label: 'Grinding' },
    { id: 'polishing', label: 'Polishing' },
    { id: 'etching', label: 'Etching' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
  'copper-alloys-preparation': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'sectioning', label: 'Sectioning' },
    { id: 'mounting', label: 'Mounting' },
    { id: 'grinding', label: 'Grinding' },
    { id: 'polishing', label: 'Polishing' },
    { id: 'etching', label: 'Etching' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
  'titanium-preparation': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'sectioning', label: 'Sectioning' },
    { id: 'mounting', label: 'Mounting' },
    { id: 'grinding', label: 'Grinding' },
    { id: 'polishing', label: 'Polishing' },
    { id: 'etching', label: 'Etching' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
  'carbon-steel-preparation': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'sectioning', label: 'Sectioning' },
    { id: 'mounting', label: 'Mounting' },
    { id: 'grinding', label: 'Grinding' },
    { id: 'polishing', label: 'Polishing' },
    { id: 'etching', label: 'Etching' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
}

// Build search index
const buildSearchIndex = (): SearchItem[] => {
  const items: SearchItem[] = []

  // Guides
  const guides = [
    { title: 'Introduction to Metallography', slug: 'introduction-to-metallography', description: 'Learn the fundamentals of metallography', category: 'Basics' },
    { title: 'Purpose and Applications', slug: 'purpose-and-applications', description: 'Discover the various applications of metallography', category: 'Basics' },
    { title: 'History of Metallography', slug: 'history-of-metallography', description: 'Explore the evolution of metallography', category: 'Basics' },
    { title: 'Equipment Overview', slug: 'equipment-overview', description: 'Learn about essential equipment', category: 'Basics' },
    { title: 'Safety Fundamentals', slug: 'safety-fundamentals', description: 'Essential safety practices', category: 'Basics' },
    { title: 'Common Misconceptions', slug: 'common-misconceptions', description: 'Learn about common mistakes', category: 'Basics' },
    { title: 'Sectioning', slug: 'sectioning', description: 'Overview of sample sectioning techniques', category: 'Process' },
    { title: 'Mounting', slug: 'mounting', description: 'Overview of mounting procedures', category: 'Process' },
    { title: 'Grinding Techniques', slug: 'grinding-techniques', description: 'Overview of grinding with proper grit selection', category: 'Process' },
    { title: 'Polishing Methods', slug: 'polishing-methods', description: 'Overview of polishing techniques', category: 'Process' },
    { title: 'Etching Procedures', slug: 'etching-procedures', description: 'Overview of etching techniques', category: 'Process' },
    { title: 'Microstructural Analysis', slug: 'microstructural-analysis', description: 'Complete guide to preparing samples for microscopy', category: 'Process' },
    { title: 'Stainless Steel Preparation', slug: 'stainless-steel-preparation', description: 'Complete guide to preparing stainless steel samples', category: 'Material-Specific' },
    { title: 'Aluminum Sample Preparation', slug: 'aluminum-sample-preparation', description: 'Guide for preparing aluminum samples', category: 'Material-Specific' },
    { title: 'Copper and Copper Alloys', slug: 'copper-alloys-preparation', description: 'Preparation methods for copper and its alloys', category: 'Material-Specific' },
    { title: 'Titanium Preparation', slug: 'titanium-preparation', description: 'Specialized techniques for preparing titanium samples', category: 'Material-Specific' },
    { title: 'Carbon Steel Preparation', slug: 'carbon-steel-preparation', description: 'Procedures for preparing carbon steel samples', category: 'Material-Specific' },
  ]

  guides.forEach(guide => {
    items.push({
      id: `guide-${guide.slug}`,
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: 'guide',
      category: guide.category,
    })

    // Add guide sections
    if (guideSections[guide.slug]) {
      guideSections[guide.slug].forEach(section => {
        items.push({
          id: `section-${guide.slug}-${section.id}`,
          title: section.label,
          description: `Section from ${guide.title}`,
          url: `/guides/${guide.slug}#${section.id}`,
          type: 'guide-section',
          category: guide.category,
          guideSlug: guide.slug,
        })
      })
    }
  })

  // Resources
  const resources = [
    { title: 'Sample Preparation Checklist', slug: 'checklist', description: 'Comprehensive checklist for preparation process', category: 'Checklists & Quick References' },
    { title: 'Grit Size Conversion Chart', slug: 'grit-size-chart', description: 'Reference chart for grit size standards', category: 'Reference Charts' },
    { title: 'Common Etchants Reference Guide', slug: 'common-etchants-guide', description: 'Quick reference guide to common etching reagents', category: 'Reference Charts' },
    { title: 'Hardness Scale Conversion Chart', slug: 'hardness-scale-conversion', description: 'Reference chart for hardness scales', category: 'Reference Charts' },
    { title: 'ASTM Standards Quick Reference', slug: 'astm-standards-reference', description: 'Quick reference to key ASTM standards', category: 'Reference Charts' },
    { title: 'Safety Data Sheet Quick Reference', slug: 'safety-data-sheet-reference', description: 'Essential safety information for common chemicals', category: 'Checklists & Quick References' },
    { title: 'Microscope Magnification Selection Guide', slug: 'microscope-magnification-guide', description: 'Guide to selecting appropriate magnifications', category: 'Reference Charts' },
    { title: 'Material-Specific Preparation Guide', slug: 'material-preparation-guide', description: 'Comprehensive guide for various material types', category: 'Preparation Guides' },
    { title: 'Polishing Cloth Selection Guide', slug: 'polishing-cloth-guide', description: 'Guide to selecting the right polishing cloth', category: 'Preparation Guides' },
    { title: 'Troubleshooting Quick Reference', slug: 'troubleshooting-guide', description: 'One-page guide to identifying and solving problems', category: 'Troubleshooting' },
  ]

  resources.forEach(resource => {
    items.push({
      id: `resource-${resource.slug}`,
      title: resource.title,
      description: resource.description,
      url: `/resources/${resource.slug}`,
      type: 'resource',
      category: resource.category,
    })
  })

  // Tools
  const tools = [
    { title: 'Grit Size Converter', slug: 'grit-size-converter', description: 'Convert between different grit size standards', category: 'Calculators' },
    { title: 'Polishing Time Calculator', slug: 'polishing-time-calculator', description: 'Calculate optimal polishing times', category: 'Calculators' },
    { title: 'Grain Size Calculator', slug: 'grain-size-calculator', description: 'Calculate ASTM grain size numbers', category: 'Calculators' },
    { title: 'Mounting Material Calculator', slug: 'mounting-material-calculator', description: 'Calculate mounting material needed', category: 'Calculators' },
    { title: 'Total Procedure Time Estimator', slug: 'procedure-time-estimator', description: 'Estimate total time for sample preparation', category: 'Calculators' },
    { title: 'Etchant Selector', slug: 'etchant-selector', description: 'Find the right etchant for your material', category: 'Reference' },
    { title: 'Sample Size/Mold Compatibility Checker', slug: 'mold-compatibility-checker', description: 'Check if your sample fits in standard molds', category: 'Reference' },
  ]

  tools.forEach(tool => {
    items.push({
      id: `tool-${tool.slug}`,
      title: tool.title,
      description: tool.description,
      url: `/tools/${tool.slug}`,
      type: 'tool',
      category: tool.category,
    })
  })

  // Materials are loaded asynchronously and added in useEffect
  // They are not included in the base search index

  return items
}

const baseSearchIndex = buildSearchIndex()

// Cache key for materials
const MATERIALS_CACHE_KEY = 'global-search-materials'
const MATERIALS_CACHE_EXPIRY = 1000 * 60 * 30 // 30 minutes

// Cache key for blog posts
const BLOG_POSTS_CACHE_KEY = 'global-search-blog-posts'
const BLOG_POSTS_CACHE_EXPIRY = 1000 * 60 * 30 // 30 minutes

// Cache key for equipment
const EQUIPMENT_CACHE_KEY = 'global-search-equipment'
const EQUIPMENT_CACHE_EXPIRY = 1000 * 60 * 30 // 30 minutes

// Cache key for consumables
const CONSUMABLES_CACHE_KEY = 'global-search-consumables'
const CONSUMABLES_CACHE_EXPIRY = 1000 * 60 * 30 // 30 minutes

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [materials, setMaterials] = useState<Material[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [consumables, setConsumables] = useState<Consumable[]>([])
  const [searchIndex, setSearchIndex] = useState<SearchItem[]>(baseSearchIndex)
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false)
  const [isLoadingBlogPosts, setIsLoadingBlogPosts] = useState(false)
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(false)
  const [isLoadingConsumables, setIsLoadingConsumables] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load materials and blog posts with caching
  useEffect(() => {
    async function loadMaterials() {
      // Check cache first
      try {
        const cached = sessionStorage.getItem(MATERIALS_CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          const age = Date.now() - timestamp
          if (age < MATERIALS_CACHE_EXPIRY) {
            setMaterials(data)
            buildMaterialSearchIndex(data)
            return
          }
        }
      } catch (e) {
        // Cache invalid, continue to fetch
      }

      setIsLoadingMaterials(true)
      try {
        const allMaterials = await getAllMaterials()
        setMaterials(allMaterials)
        
        // Cache the materials
        try {
          sessionStorage.setItem(MATERIALS_CACHE_KEY, JSON.stringify({
            data: allMaterials,
            timestamp: Date.now(),
          }))
        } catch (e) {
          // SessionStorage might be disabled, continue without cache
        }
        
        buildMaterialSearchIndex(allMaterials)
      } catch (error) {
        console.error('Error loading materials for search:', error)
        // Continue with base search index if materials fail to load
      } finally {
        setIsLoadingMaterials(false)
      }
    }

    async function loadBlogPosts() {
      // Check cache first
      try {
        const cached = sessionStorage.getItem(BLOG_POSTS_CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          const age = Date.now() - timestamp
          if (age < BLOG_POSTS_CACHE_EXPIRY) {
            setBlogPosts(data)
            buildBlogSearchIndex(data)
            return
          }
        }
      } catch (e) {
        // Cache invalid, continue to fetch
      }

      setIsLoadingBlogPosts(true)
      try {
        const publishedPosts = await getPublishedBlogPosts()
        setBlogPosts(publishedPosts)
        
        // Cache the blog posts
        try {
          sessionStorage.setItem(BLOG_POSTS_CACHE_KEY, JSON.stringify({
            data: publishedPosts,
            timestamp: Date.now(),
          }))
        } catch (e) {
          // SessionStorage might be disabled, continue without cache
        }
        
        buildBlogSearchIndex(publishedPosts)
      } catch (error) {
        console.error('Error loading blog posts for search:', error)
        // Continue without blog posts if they fail to load
      } finally {
        setIsLoadingBlogPosts(false)
      }
    }

    function buildMaterialSearchIndex(allMaterials: Material[]) {
      // Add materials to search index with tabs
      const materialItems: SearchItem[] = []
      
      allMaterials.forEach(material => {
        // Use slug if available, fallback to id
        const materialSlug = material.slug || material.id
        
        // Main material entry (not a tab)
        materialItems.push({
          id: `material-${material.id}`,
          title: material.name,
          description: `${material.category} - ${material.composition}`,
          url: `/materials/${materialSlug}`,
          type: 'material',
          category: material.category,
          alternativeNames: material.alternative_names || undefined,
        })
        
        // Tab entries for searchability (these are sub-sections)
        const tabs = [
          { id: 'overview', label: 'Overview', keywords: ['overview', 'basic', 'information', 'description'] },
          { id: 'properties', label: 'Properties', keywords: ['properties', 'mechanical', 'physical', 'hardness', 'strength', 'density'] },
          { id: 'preparation', label: 'Preparation', keywords: ['preparation', 'sectioning', 'mounting', 'grinding', 'polishing', 'etching'] },
          { id: 'heat-treatment', label: 'Heat Treatment', keywords: ['heat treatment', 'annealing', 'tempering', 'quenching'] },
          { id: 'standards', label: 'Standards', keywords: ['standards', 'astm', 'iso', 'specifications'] },
          { id: 'applications', label: 'Applications', keywords: ['applications', 'uses', 'typical uses'] },
        ]
        
        tabs.forEach(tab => {
          materialItems.push({
            id: `material-${material.id}-${tab.id}`,
            title: `${material.name} - ${tab.label}`,
            description: `${tab.label} information for ${material.name}`,
            url: `/materials/${materialSlug}#${tab.id}`,
            type: 'material',
            category: material.category,
            alternativeNames: material.alternative_names || undefined,
          })
        })
      })
      
      // Update search index with materials, preserving blog posts if they exist
      setSearchIndex(prev => {
        const existingBlogPosts = prev.filter(item => item.type === 'blog')
        return [...baseSearchIndex, ...existingBlogPosts, ...materialItems]
      })
    }

    function buildBlogSearchIndex(allBlogPosts: BlogPost[]) {
      // Add blog posts to search index
      const blogItems: SearchItem[] = allBlogPosts.map(post => ({
        id: `blog-${post.id}`,
        title: post.title,
        description: post.excerpt,
        url: `/blog/${post.slug}`,
        type: 'blog',
        category: post.category,
      }))
      
      // Update search index with blog posts, preserving materials if they exist
      setSearchIndex(prev => {
        const existingMaterials = prev.filter(item => item.type === 'material')
        return [...baseSearchIndex, ...blogItems, ...existingMaterials]
      })
    }
    
    async function loadEquipment() {
      // Check cache first
      try {
        const cached = sessionStorage.getItem(EQUIPMENT_CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          const age = Date.now() - timestamp
          if (age < EQUIPMENT_CACHE_EXPIRY) {
            setEquipment(data)
            buildEquipmentSearchIndex(data)
            return
          }
        }
      } catch (e) {
        // Cache invalid, continue to fetch
      }

      setIsLoadingEquipment(true)
      try {
        const allEquipment = await getAllEquipment()
        setEquipment(allEquipment)
        
        // Cache the equipment
        try {
          sessionStorage.setItem(EQUIPMENT_CACHE_KEY, JSON.stringify({
            data: allEquipment,
            timestamp: Date.now(),
          }))
        } catch (e) {
          // SessionStorage might be disabled, continue without cache
        }
        
        buildEquipmentSearchIndex(allEquipment)
      } catch (error) {
        console.error('Error loading equipment for search:', error)
        // Continue with base search index if equipment fails to load
      } finally {
        setIsLoadingEquipment(false)
      }
    }

    async function loadConsumables() {
      // Check cache first
      try {
        const cached = sessionStorage.getItem(CONSUMABLES_CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          const age = Date.now() - timestamp
          if (age < CONSUMABLES_CACHE_EXPIRY) {
            setConsumables(data)
            buildConsumablesSearchIndex(data)
            return
          }
        }
      } catch (e) {
        // Cache invalid, continue to fetch
      }

      setIsLoadingConsumables(true)
      try {
        const allConsumables = await getAllConsumables()
        setConsumables(allConsumables)
        
        // Cache the consumables
        try {
          sessionStorage.setItem(CONSUMABLES_CACHE_KEY, JSON.stringify({
            data: allConsumables,
            timestamp: Date.now(),
          }))
        } catch (e) {
          // SessionStorage might be disabled, continue without cache
        }
        
        buildConsumablesSearchIndex(allConsumables)
      } catch (error) {
        console.error('Error loading consumables for search:', error)
        // Continue with base search index if consumables fail to load
      } finally {
        setIsLoadingConsumables(false)
      }
    }

    function buildEquipmentSearchIndex(allEquipment: Equipment[]) {
      // Helper function to convert subcategory to URL slug format
      const slugifySubcategory = (subcategory: string): string => {
        return subcategory
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      }
      
      const equipmentItems: SearchItem[] = allEquipment.map(item => {
        // Build URL based on category and slug
        const categoryMap: Record<string, string> = {
          'sectioning': 'sectioning',
          'mounting': 'mounting',
          'grinding-polishing': 'grinding-polishing',
          'microscopy': 'microscopy',
          'hardness-testing': 'hardness-testing',
          'lab-furniture': 'lab-furniture',
        }
        const categorySlug = categoryMap[item.category] || item.category
        const slug = item.slug || item.item_id?.toLowerCase() || item.item_id
        const subcategorySlug = item.subcategory ? slugifySubcategory(item.subcategory) : null
        const url = subcategorySlug 
          ? `/equipment/${categorySlug}/${subcategorySlug}/${slug}`
          : `/equipment/${categorySlug}/${slug}`
        
        // Build a more comprehensive description that includes tags and item_id for better searchability
        const descriptionParts = [item.description || `${item.category} equipment`]
        if (item.tags && item.tags.length > 0) {
          descriptionParts.push(item.tags.join(', '))
        }
        if (item.item_id) {
          descriptionParts.push(item.item_id)
        }
        
        // Include item_id as alternative name for better searchability
        const alternativeNames: string[] = []
        if (item.item_id) {
          alternativeNames.push(item.item_id)
        }
        
        return {
          id: `equipment-${item.id}`,
          title: item.name,
          description: descriptionParts.join(' - '),
          url,
          type: 'equipment',
          category: item.category,
          alternativeNames: alternativeNames.length > 0 ? alternativeNames : undefined,
        }
      })
      
      // Update search index with equipment
      setSearchIndex(prev => {
        const existingItems = prev.filter(item => item.type !== 'equipment')
        return [...existingItems, ...equipmentItems]
      })
    }

    function buildConsumablesSearchIndex(allConsumables: Consumable[]) {
      const consumableItems: SearchItem[] = allConsumables.map(item => {
        // Build URL based on category and slug
        const categoryMap: Record<string, string> = {
          'sectioning': 'sectioning',
          'mounting': 'mounting',
          'grinding-lapping': 'grinding-lapping',
          'polishing': 'polishing',
          'etching': 'etching',
          'cleaning': 'cleaning',
          'hardness-testing': 'hardness-testing',
        }
        const categorySlug = categoryMap[item.category] || item.category
        const slug = item.slug || item.item_id
        const url = `/consumables/${categorySlug}/${item.subcategory ? `${item.subcategory}/${slug}` : slug}`
        
        return {
          id: `consumable-${item.id}`,
          title: item.name,
          description: item.description || `${item.category} consumable`,
          url,
          type: 'consumable',
          category: item.category,
        }
      })
      
      // Update search index with consumables
      setSearchIndex(prev => {
        const existingItems = prev.filter(item => item.type !== 'consumable')
        return [...existingItems, ...consumableItems]
      })
    }

    if (isOpen) {
      loadMaterials()
      loadBlogPosts()
      loadEquipment()
      loadConsumables()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      // Prevent background scrolling when search is open
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scrolling when search is closed
      document.body.style.overflow = ''
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Determine if we should show content area (has query or results)
  const hasContent = query.trim().length > 0 || results.length > 0

  // Improved search with relevance scoring
  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const searchTerm = query.toLowerCase().trim()
    const searchTerms = expandSearchTerm(searchTerm)
    
    // Split search query into individual words for flexible word-order matching
    const searchWords = searchTerm.split(/\s+/).filter(w => w.length > 0)
    
    // If no search index items yet, return empty (materials might still be loading)
    if (searchIndex.length === 0) {
      setResults([])
      return
    }
    
    // Calculate relevance scores for each item
    const scoredItems = searchIndex.map(item => {
      let score = 0
      const lowerTitle = item.title.toLowerCase()
      const lowerDesc = item.description?.toLowerCase() || ''
      const lowerCategory = item.category?.toLowerCase() || ''
      
      // Combine all searchable text for word-order-flexible matching
      const allSearchableText = `${lowerTitle} ${lowerDesc} ${lowerCategory} ${item.alternativeNames?.join(' ').toLowerCase() || ''}`
      
      // Check if all words from the search query appear (word order flexible)
      const allWordsMatch = searchWords.length > 0 && searchWords.every(word => allSearchableText.includes(word))
      
      // Check all search terms (including synonyms) to see if ANY match
      let hasAnyMatch = false
      for (const term of searchTerms) {
        // Title matches (highest weight)
        if (lowerTitle.includes(term)) {
          hasAnyMatch = true
          const position = lowerTitle.indexOf(term)
          // Boost score if match is at start of title
          score += position === 0 ? 100 : 50
          // Exact match bonus
          if (lowerTitle === term) score += 200
        }
        
        // Description matches (medium weight)
        if (lowerDesc.includes(term)) {
          hasAnyMatch = true
          score += 20
        }
        
        // Category matches (low weight, but higher for materials)
        if (lowerCategory.includes(term)) {
          hasAnyMatch = true
          score += item.type === 'material' ? 40 : 10 // Boost category matches for materials
        }
        
        // Alternative names (for materials and equipment item_ids)
        if (item.alternativeNames?.some(altName => altName.toLowerCase().includes(term))) {
          hasAnyMatch = true
          score += 30
        }
        
        // For materials, also check if term appears in composition (description format: "Category - Composition")
        if (item.type === 'material' && lowerDesc.includes(term)) {
          hasAnyMatch = true
          // Check if match is in category part (before " - ") or composition part
          const descParts = lowerDesc.split(' - ')
          if (descParts.length >= 2) {
            const categoryPart = descParts[0]
            const compositionPart = descParts[1]
            if (categoryPart.includes(term)) {
              score += 35 // Category in description
            }
            if (compositionPart.includes(term)) {
              score += 25 // Composition match
            }
          }
        }
      }
      
      // Only filter out if no matches found at all (more flexible than requiring all words or exact phrase)
      if (!hasAnyMatch && !allWordsMatch) {
        return { ...item, score: 0 }
      }
      
      // Bonus for word-order-flexible matches (all words found in any order)
      if (allWordsMatch && searchWords.length > 1) {
        score += 15 // Small bonus for flexible word order matching
      }
      
      return {
        ...item,
        score,
      }
    }).filter(item => item.score > 0) // Only include items with matches

    // Sort by relevance
    const sorted = scoredItems.sort((a, b) => {
      // First priority: type (differentiated priorities)
      const typePriority: Record<SearchItem['type'], number> = {
        'guide': 1,        // Highest priority
        'equipment': 2,    // Second priority
        'consumable': 3,   // Third priority
        'blog': 4,         // Fourth priority
        'resource': 5,     // Fifth priority
        'tool': 6,         // Sixth priority
        'material': 7,      // Seventh priority (main entries only, tabs filtered below)
        'guide-section': 8, // Lowest priority
      }
      
      // Separate main material entries from tab entries
      const aIsMaterialTab = a.type === 'material' && a.title.includes(' - ')
      const bIsMaterialTab = b.type === 'material' && b.title.includes(' - ')
      
      const aPriority = aIsMaterialTab ? 7 : typePriority[a.type] // Material tabs lowest
      const bPriority = bIsMaterialTab ? 7 : typePriority[b.type]
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }

      // Second priority: relevance score
      if (a.score !== b.score) {
        return b.score - a.score
      }

      // Third priority: title matches (exact matches first)
      const aTitleMatch = a.title.toLowerCase().includes(searchTerm)
      const bTitleMatch = b.title.toLowerCase().includes(searchTerm)
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1

      // Fourth priority: alphabetical
      return a.title.localeCompare(b.title)
    })

    setResults(sorted.slice(0, 20)) // Increased limit to 20
    setSelectedIndex(0)
  }, [query, searchIndex])
  

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      router.push(results[selectedIndex].url)
      onClose()
    }
  }

  const getTypeIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="w-4 h-4" />
      case 'guide-section':
        return <Hash className="w-4 h-4" />
      case 'resource':
        return <FileText className="w-4 h-4" />
      case 'tool':
        return <Calculator className="w-4 h-4" />
      case 'material':
        return <Database className="w-4 h-4" />
      case 'blog':
        return <Newspaper className="w-4 h-4" />
      case 'equipment':
        return <Wrench className="w-4 h-4" />
      case 'consumable':
        return <Package className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: SearchItem['type']) => {
    switch (type) {
      case 'guide':
        return 'Guide'
      case 'guide-section':
        return 'Section'
      case 'resource':
        return 'Resource'
      case 'tool':
        return 'Tool'
      case 'material':
        return 'Material'
      case 'blog':
        return 'Blog'
      case 'equipment':
        return 'Equipment'
      case 'consumable':
        return 'Consumable'
    }
  }

  const getTypeColor = (type: SearchItem['type']) => {
    switch (type) {
      case 'guide':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'guide-section':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'resource':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'tool':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'material':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200'
      case 'blog':
        return 'bg-pink-100 text-pink-700 border-pink-200'
      case 'equipment':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200'
      case 'consumable':
        return 'bg-amber-100 text-amber-700 border-amber-200'
    }
  }

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {
      'guide': [],
      'equipment': [],
      'consumable': [],
      'blog': [],
      'resource': [],
      'tool': [],
      'material': [],
      'guide-section': [],
    }
    
    results.forEach(item => {
      // Separate main material entries from tabs
      const isMaterialTab = item.type === 'material' && item.title.includes(' - ')
      if (isMaterialTab) {
        groups['guide-section'].push(item) // Material tabs grouped with sections
      } else {
        groups[item.type].push(item)
      }
    })
    
    return groups
  }, [results])

  // Type order for display
  const typeOrder: SearchItem['type'][] = ['guide', 'equipment', 'consumable', 'blog', 'resource', 'tool', 'material', 'guide-section']
  const typeLabels: Record<SearchItem['type'], string> = {
    'guide': 'Guides',
    'equipment': 'Equipment',
    'consumable': 'Consumables',
    'blog': 'Blog Posts',
    'resource': 'Resources',
    'tool': 'Tools',
    'material': 'Materials',
    'guide-section': 'Sections',
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Search Modal - Pill Shaped */}
      <div className="fixed top-4 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/2 z-50 w-[calc(100%-2rem)] sm:w-[600px]">
        <div 
          className="bg-white rounded-2xl sm:rounded-[2rem] shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 ease-out"
          style={{
            height: hasContent ? '600px' : 'auto',
            minHeight: hasContent ? '600px' : 'auto',
            maxHeight: 'calc(100vh - 2rem)',
          }}
        >
          {/* Search Input */}
          <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4">
            <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search guides, equipment, consumables, resources, tools, materials..."
              className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-base sm:text-base bg-transparent"
              style={{ fontSize: '16px' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="ml-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Results Container - Animated Height */}
          <div
            className="overflow-hidden transition-all duration-300 ease-out flex-1 flex flex-col"
            style={{
              maxHeight: hasContent ? '100%' : '0px',
              opacity: hasContent ? 1 : 0,
            }}
          >
            {/* Results - Grouped by Type */}
            {results.length > 0 && (
              <div className="border-t border-gray-200 flex-1 overflow-y-auto">
                {(isLoadingMaterials || isLoadingBlogPosts || isLoadingEquipment || isLoadingConsumables) && (
                  <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                    <LoadingSpinner size="sm" />
                  </div>
                )}
                {typeOrder.map(type => {
                  const typeResults = groupedResults[type]
                  if (typeResults.length === 0) return null
                  
                  return (
                    <div key={type} className="border-b border-gray-100 last:border-b-0">
                      {/* Type Header */}
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${getTypeColor(type).split(' ')[0]}`}>
                            {getTypeIcon(type)}
                          </div>
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            {typeLabels[type]} ({typeResults.length})
                          </h3>
                        </div>
                      </div>
                      
                      {/* Type Results */}
                      {typeResults.map((item, index) => {
                        const globalIndex = results.findIndex(r => r.id === item.id)
                        const isSelected = globalIndex === selectedIndex
                        
                        return (
                          <Link
                            key={item.id}
                            href={item.url}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                              isSelected ? 'bg-primary-50' : ''
                            }`}
                          >
                            <div className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center border ${getTypeColor(type)}`}>
                              {getTypeIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h3 className="text-sm font-semibold text-gray-900 truncate">
                                  {item.title}
                                </h3>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded border flex-shrink-0 ${getTypeColor(type)}`}>
                                  {getTypeLabel(item.type)}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-xs text-gray-600 line-clamp-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          </Link>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )}

            {/* No Results */}
            {query && results.length === 0 && !isLoadingMaterials && !isLoadingBlogPosts && !isLoadingEquipment && !isLoadingConsumables && (
              <div className="border-t border-gray-200 px-4 sm:px-6 py-8 sm:py-12 text-center">
                <p className="text-gray-500">No results found for "{query}"</p>
                <p className="text-sm text-gray-400 mt-2">Try a different search term</p>
              </div>
            )}
          </div>

          {/* Empty State */}
          {!query && (
            <div className="border-t border-gray-200 px-4 sm:px-6 py-4 sm:py-6 text-center overflow-visible">
              <p className="text-sm text-gray-500 mb-3 sm:mb-4">Start typing to search...</p>
              <div className="flex flex-wrap gap-2 justify-center px-2">
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">Guides</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">Equipment</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">Consumables</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">Blog</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">Resources</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">Tools</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">Materials</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
