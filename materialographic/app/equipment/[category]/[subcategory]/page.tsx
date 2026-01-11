'use client'

import Link from 'next/link'
import Image from 'next/image'
import { use, useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase-client'
import { getSubcategoryMetadata, getEquipmentBySubcategory, getSubcategoriesForCategory } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { SubcategoryMetadata, Equipment } from '@/lib/supabase'
import { ChevronRight, Package, Scissors, Gauge, Microscope, HardDrive, Home, ShoppingBag, ChevronsDown, ExternalLink } from 'lucide-react'
import AnimatedCard from '@/components/AnimatedCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { getEquipmentImageUrl } from '@/lib/storage'
import YouTubeVideo from '@/components/YouTubeVideo'
import FAQAccordion from '@/components/FAQAccordion'
import FeaturedEquipmentSelector from '@/components/FeaturedEquipmentSelector'

const categoryLabels: Record<string, string> = {
  'sectioning': 'Sectioning',
  'mounting': 'Mounting',
  'grinding-polishing': 'Grinding & Polishing',
  'microscopy': 'Microscopy',
  'hardness-testing': 'Hardness Testing',
  'lab-furniture': 'Lab Furniture',
}

const categoryIcons: Record<string, typeof Scissors> = {
  'sectioning': Scissors,
  'mounting': Package,
  'grinding-polishing': Gauge,
  'microscopy': Microscope,
  'hardness-testing': HardDrive,
  'lab-furniture': Home,
}

// Subcategory-specific technical content
const subcategoryTechnicalContent: Record<string, Record<string, {
  overview: string
  variants?: Array<{
    name: string
    description: string
    keyFeatures: string[]
    bestFor: string[]
    anchor?: string
  }>
  applications?: string[]
  advantages?: string[]
}>> = {
  'sectioning': {
    'precision-wafering': {
      overview: 'Precision wafering systems use diamond or CBN blades with controlled feed rates (0.001-0.1 mm/min) to minimize deformation (<10 μm) and heat-affected zones. Ideal for delicate materials, ceramics, and research applications requiring minimal sample damage.',
      variants: [
        {
          name: 'Gravity Feed',
          description: 'Gravity feed systems use controlled downward force from the sample holder. The holder moves downward under gravity, providing consistent cutting pressure with minimal operator intervention.',
          keyFeatures: [
            'Controlled downward force via gravity',
            'Lower operational complexity',
            'Cost-effective for small-batch production',
            'Consistent cutting pressure',
            'Standard sample geometries'
          ],
          bestFor: [
            'Research laboratories',
            'Small-batch production',
            'Standard sample shapes',
            'Consistent, repeatable cuts'
          ],
          anchor: 'gravity-feed'
        },
        {
          name: 'Table Feed',
          description: 'Table feed systems use a motorized table that moves the sample horizontally into the blade. Provides programmable feed rates and better control for irregular shapes and automated sequences.',
          keyFeatures: [
            'Motorized horizontal table movement',
            'Programmable feed rates',
            'Handles irregular sample shapes',
            'Automated cutting sequences',
            'Precise control over cutting parameters'
          ],
          bestFor: [
            'Industrial applications',
            'Irregularly shaped workpieces',
            'Automated cutting sequences',
            'High-throughput production'
          ],
          anchor: 'table-feed'
        }
      ]
    },
    'abrasive-sectioning': {
      overview: 'Abrasive sectioning uses reinforced abrasive wheels cutting at 1000-3000 RPM for faster material removal. Suitable for larger samples and production environments with typical cut times of 30 seconds to 5 minutes.',
      variants: [
        {
          name: 'Manual Abrasive Cutters',
          description: 'Manual abrasive cutters require operator control of the cutting process. The operator manually positions the sample and controls the feed rate during cutting.',
          keyFeatures: [
            'Operator-controlled feed rate',
            'Lower initial cost',
            'Flexible for various sample sizes',
            'Direct control over cutting process'
          ],
          bestFor: [
            'Low to medium volume cutting',
            'Variable sample sizes',
            'Training and educational use',
            'Labs with budget constraints'
          ]
        },
        {
          name: 'Automated Abrasive Cutters',
          description: 'Automated abrasive cutters feature programmable feed rates, force control, and multiple sample capacity. They reduce operator time and ensure consistent cutting parameters across batches.',
          keyFeatures: [
            'Programmable feed rates and force',
            'Multiple sample capacity',
            'Consistent cutting parameters',
            'Reduced operator intervention',
            'Higher throughput'
          ],
          bestFor: [
            'High-volume production',
            'Consistent batch processing',
            'Quality control environments',
            'Reduced operator fatigue requirements'
          ]
        }
      ]
    },
    'automated': {
      overview: 'Automated abrasive cutters provide programmable feed rates, force control, and multiple sample capacity. These systems reduce operator intervention and ensure consistent cutting parameters across batches, making them ideal for high-volume production environments.',
      variants: []
    },
    'manual': {
      overview: 'Manual abrasive cutters offer operator-controlled feed rates and direct control over the cutting process. These systems provide flexibility for various sample sizes and are cost-effective for low to medium volume cutting operations.',
      variants: []
    }
  },
  'mounting': {
    'compression-mounting': {
      overview: 'Compression mounting presses use heat (150-200°C) and pressure (2000-4000 PSI) to embed metallographic samples in thermosetting resins including phenolic, acrylic, epoxy, and other thermosetting materials. This hot mounting process provides rapid curing times of 5-10 minutes, making it ideal for high-volume production environments. Compression mounting delivers excellent edge retention and dimensional stability, essential for maintaining sample integrity during grinding and polishing operations. Hydraulic and pneumatic press designs offer different pressure capabilities and cycle times to match production requirements.',
      variants: [
        {
          name: 'Hydraulic Presses',
          description: 'Hydraulic compression mounting presses use hydraulic pressure to achieve high mounting forces. They provide consistent pressure distribution and are suitable for high-volume production.',
          keyFeatures: [
            'High pressure capability (up to 4000 PSI)',
            'Consistent pressure distribution',
            'Suitable for high-volume production',
            'Durable construction for heavy use'
          ],
          bestFor: [
            'Production environments',
            'High-volume mounting',
            'Materials requiring high pressure',
            'Consistent batch processing'
          ]
        },
        {
          name: 'Pneumatic Presses',
          description: 'Pneumatic compression mounting presses use compressed air to generate mounting pressure. They offer faster cycle times and are easier to operate than hydraulic systems.',
          keyFeatures: [
            'Faster cycle times',
            'Easier operation',
            'Lower maintenance requirements',
            'Clean operation (no hydraulic fluid)'
          ],
          bestFor: [
            'Medium-volume mounting',
            'Faster turnaround requirements',
            'Clean room environments',
            'Easier maintenance preferences'
          ]
        }
      ]
    },
    'castable-mounting': {
      overview: 'Castable mounting systems use epoxy, acrylic, or polyester resins that cure at room temperature over 4-24 hours without heat or pressure. This cold mounting process is essential for heat-sensitive materials including polymers, electronic components, low-melting alloys, and materials that would be damaged by the high temperatures used in compression mounting. Castable mounting provides excellent resin penetration for complex geometries and porous materials, making it ideal for samples requiring bubble-free mounting or enhanced infiltration.',
      variants: [
        {
          name: 'Vacuum Systems',
          description: 'Vacuum castable mounting systems remove air bubbles from the resin before curing, ensuring complete resin penetration and eliminating porosity in the final mount.',
          keyFeatures: [
            'Removes air bubbles (10-50 mbar vacuum)',
            'Complete resin penetration',
            'Eliminates porosity',
            'Ideal for porous materials'
          ],
          bestFor: [
            'Porous materials',
            'Complex sample geometries',
            'Materials requiring bubble-free mounting',
            'High-quality mount requirements'
          ]
        },
        {
          name: 'Pressure Systems',
          description: 'Pressure castable mounting applies pressure (up to 60 PSI) during curing to improve resin penetration and reduce porosity. Suitable for materials requiring enhanced infiltration.',
          keyFeatures: [
            'Applied pressure up to 60 PSI',
            'Improved resin penetration',
            'Reduced porosity',
            'Enhanced infiltration'
          ],
          bestFor: [
            'Materials requiring enhanced penetration',
            'Complex geometries',
            'Production environments',
            'Faster infiltration needs'
          ]
        },
        {
          name: 'UV Curing Systems',
          description: 'UV curing systems use UV-curable resins that cure in 5-15 minutes under UV light. Ideal for rapid turnaround and small sample batches.',
          keyFeatures: [
            'Fast curing (5-15 minutes)',
            'UV-curable resins',
            'Rapid turnaround',
            'No heat required'
          ],
          bestFor: [
            'Rapid turnaround requirements',
            'Small sample batches',
            'Heat-sensitive materials',
            'Quick processing needs'
          ]
        }
      ]
    }
  },
  'grinding-polishing': {
    'manual': {
      overview: 'Manual grinding and polishing systems require operator control of force, speed, and timing. Single-station systems with 8-12 inch platens provide flexibility for different materials and are suitable for low-volume labs, research, and training applications.',
      variants: []
    },
    'semi-automated': {
      overview: 'Semi-automated polishing systems consist of FEMTO polishing heads and ZETA abrasive dispensers that attach to NANO grinder polisher bases. These systems feature programmable force, speed, and time per step, providing increased throughput and consistency while maintaining flexibility for different materials and sample types. Note: NANO grinder polisher bases are required for FEMTO polishing heads and ZETA dispensers to operate.',
      variants: []
    },
    'automated': {
      overview: 'Fully automated grinding and polishing systems provide complete automated cycles with controlled removal rates. Multi-sample processing (6-12 samples) enables high-throughput production environments and standardized procedures for consistent results.',
      variants: []
    },
    'hand-belt': {
      overview: 'Hand and belt grinders are specialized equipment for coarse grinding operations that remove material quickly from large or irregularly shaped samples. Belt grinders use continuous abrasive belts moving at high speeds to provide fast material removal for large samples, making them ideal for initial grinding stages. Hand grinders offer portability and flexibility for various sample geometries, allowing operators to access hard-to-reach areas and work with samples that cannot be easily mounted on standard grinding platens. These systems are essential for preparing oversized samples, irregular geometries, and applications requiring aggressive material removal before fine grinding and polishing steps.',
      variants: []
    },
    'vibratory': {
      overview: 'Vibratory polishers use oscillating motion to gently polish delicate materials. The vibratory action provides uniform polishing without the aggressive material removal of rotary systems, making them ideal for soft materials and final polishing steps.',
      variants: [],
      applications: [
        'EBSD (Electron Backscatter Diffraction) sample preparation',
        'Final polishing for high-quality microstructural analysis',
        'Soft materials and applications requiring minimal deformation',
        'Eliminating subsurface damage from previous polishing steps'
      ],
      advantages: [
        'Eliminates subsurface damage from mechanical polishing',
        'Produces superior flatness and planarity',
        'Cost-effective alternative to laser removal systems',
        'Ideal for batch processing multiple samples'
      ]
    },
    'controlled-removal': {
      overview: 'Controlled removal polishers (also known as quantitative grinding systems, precision polishing equipment, or metered material removal systems) enable precise semiautomatic sample preparation of a wide range of materials for microscopic evaluation including optical, SEM, FIB, TEM, and AFM applications. These systems provide precision plano-parallel sample preparation with micron-level accuracy, maintaining precise sample thickness and parallelism essential for applications requiring exact dimensional control such as hardness testing, quantitative analysis, and advanced microscopy preparation.',
      variants: [],
      applications: [
        'Hardness testing preparation (Rockwell, microhardness) requiring exact sample thickness',
        'Advanced microscopy sample preparation (optical, SEM, FIB, TEM, AFM)',
        'Parallel polishing, angle polishing, and site-specific polishing operations',
        'Integrated circuit and semiconductor wafer preparation',
        'Optical component and fiber polishing',
        'Petrographic sample preparation',
        'Precision metal parts requiring parallel surfaces',
        'Quantitative thinning and continuous slicing operations'
      ],
      advantages: [
        'Micron-level accuracy for precise dimensional control with digital material removal indicators',
        'Reproducible results that eliminate inconsistencies between users regardless of skill level',
        'Parallel, angle, and site-specific polishing capabilities in a single system',
        'Quantitative thinning with controlled material removal (quantitative grinding)',
        'Real-time material removal monitoring or preset operation for unattended processing',
        'Variable speed rotation and oscillation to maximize disc utilization and minimize artifacts',
        'Adjustable load control to handle delicate small samples to large workpieces',
        'Precise sample orientation control with micrometer adjustments for pitch and roll',
        'Rigid spindle design maintains predefined geometric orientation throughout grinding/polishing',
        'Continuous slicing for multiple samples from a single workpiece',
        'Wide range of accessories and fixtures for complex geometries'
      ]
    }
  },
  'microscopy': {
    'metallurgical': {
      overview: 'Metallurgical microscopes use reflected light (epi-illumination) to examine polished and etched samples without requiring transmitted light. These specialized microscopes support magnification from 50x to 2000x, enabling detailed microstructure examination, phase identification, grain size analysis, and inclusion rating. Upright designs are standard for most applications and easier to use, while inverted designs are ideal for large samples, samples that cannot be easily positioned, and applications requiring enhanced sample stability. Modern systems feature LED illumination for bright, consistent lighting, and digital camera integration for image capture, documentation, and quantitative analysis.',
      variants: []
    },
    'stereo': {
      overview: 'Stereo microscopes provide low magnification (5x-100x) with three-dimensional viewing capability for sample inspection and macro-scale feature examination. These binocular microscopes use two separate optical paths to create depth perception, making them essential for quality control, defect identification, sample selection, and documentation of larger-scale features before detailed microstructural analysis. Stereo microscopes are typically used for initial sample inspection, selecting areas of interest, and examining surface features that require lower magnification than metallurgical microscopes. They provide an important bridge between unaided visual inspection and high-magnification metallurgical analysis.',
      variants: []
    },
    'image-analysis': {
      overview: 'Image analysis systems combine digital cameras with software for quantitative metallography. These systems enable grain size measurements (ASTM E112), phase area fraction analysis, inclusion rating, and automated feature detection for quality control and research applications.',
      variants: []
    }
  },
  'hardness-testing': {
    'rockwell': {
      overview: 'Rockwell hardness testers measure indentation depth under major and minor loads. Scales include HRC (hardened steel), HRB (soft metals), and HRA (thin materials). Fast testing (10-15 seconds per measurement) makes them ideal for production quality control.',
      variants: []
    },
    'microhardness': {
      overview: 'Microhardness testers use optical measurement of indentation diagonal for precise microhardness evaluation. Vickers and Knoop test methods support loads from 1 gf to 100 kgf. Vickers is used for general microhardness; Knoop is preferred for thin coatings and brittle materials.',
      variants: []
    },
    'brinell-microvickers': {
      overview: 'Brinell and macro Vickers testers use large indenters (10 mm ball for Brinell) for coarse-grained materials and castings. Loads range from 500-3000 kgf. These systems are suitable for materials with heterogeneous microstructures where large indentations provide more representative measurements.',
      variants: []
    }
  },
  'lab-furniture': {
    'workbenches': {
      overview: 'Laboratory workbenches provide chemical-resistant surfaces (epoxy resin or stainless steel) for metallographic sample preparation. Integrated sinks, electrical outlets, and storage optimize workflow. Standard heights of 30-36 inches promote ergonomic operation.',
      variants: []
    },
    'fume-hoods': {
      overview: 'Fume hoods provide ventilated enclosures for chemical etching and handling operations. Airflow of 100-150 fpm face velocity ensures safe removal of chemical vapors. Adjustable sash heights and widths accommodate various sample sizes and equipment.',
      variants: []
    },
    'safety-cabinets': {
      overview: 'Safety storage cabinets provide secure storage for chemicals and consumables. Fire-resistant construction and proper ventilation protect against chemical hazards. Organized layouts improve workflow efficiency and ensure compliance with safety regulations.',
      variants: []
    },
    'storage': {
      overview: 'Specimen storage solutions provide organized storage for prepared samples, consumables, and tools. Chemical-resistant materials ensure durability in laboratory environments. Proper organization reduces preparation time and maintains sample integrity.',
      variants: []
    }
  }
}

// Consumables mapping for subcategories
const subcategoryConsumables: Record<string, Record<string, { 
  coverImage: string
  shopUrl: string
  description: string
}>> = {
  'sectioning': {
    'precision-wafering': {
      coverImage: '/images/consumables/precision-wafering-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/precision-cutting-blades',
      description: 'Precision wafering requires specialized diamond and CBN blades designed for minimal deformation cutting. Our precision cutting blades are engineered for controlled feed rates and minimal heat generation.'
    },
    'abrasive-sectioning': {
      coverImage: '/images/consumables/abrasive-sectioning-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/abrasive-blades',
      description: 'Abrasive sectioning uses reinforced abrasive wheels for faster material removal. Our abrasive blades are designed for high-speed cutting with consistent performance across various materials.'
    },
    'automated': {
      coverImage: '/images/consumables/abrasive-sectioning-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/abrasive-blades',
      description: 'Automated abrasive cutters require high-quality abrasive blades for consistent cutting performance. Our abrasive blades are designed for automated systems with reliable cutting characteristics.'
    },
    'manual': {
      coverImage: '/images/consumables/abrasive-sectioning-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/abrasive-blades',
      description: 'Manual abrasive cutters use reinforced abrasive wheels for operator-controlled cutting. Our abrasive blades provide consistent performance for various sample sizes and materials.'
    }
  },
  'mounting': {
    'compression-mounting': {
      coverImage: '/images/consumables/compression-mounting-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/compression-mounting',
      description: 'Compression mounting requires thermosetting resins, mounting powders, and molds designed for high-temperature, high-pressure mounting. Our compression mounting consumables provide excellent edge retention and dimensional stability.'
    },
    'castable-mounting': {
      coverImage: '/images/consumables/castable-mounting-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/castable-mounting',
      description: 'Castable mounting uses epoxy, acrylic, or polyester resins that cure at room temperature. Our castable mounting consumables are ideal for heat-sensitive materials and provide excellent penetration for complex geometries.'
    }
  },
  'grinding-polishing': {
    'manual': {
      coverImage: '/images/consumables/grinding-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/grinding',
      description: 'Manual grinding and polishing require grinding papers, diamond abrasives, and polishing cloths. Our grinding consumables provide consistent material removal and surface finish quality.'
    },
    'semi-automated': {
      coverImage: '/images/consumables/polishing-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/polishing',
      description: 'Semi-automated polishing systems use diamond suspensions, polishing cloths, and abrasive dispensers. Our polishing consumables are designed for automated dispensing and consistent results.'
    },
    'automated': {
      coverImage: '/images/consumables/polishing-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/polishing',
      description: 'Automated grinding and polishing systems require high-quality diamond suspensions and polishing cloths for consistent, repeatable results. Our polishing consumables support high-throughput production environments.'
    },
    'hand-belt': {
      coverImage: '/images/consumables/grinding-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/grinding',
      description: 'Hand and belt grinders use coarse grinding papers and belts for fast material removal. Our grinding consumables provide efficient coarse grinding for large samples.'
    },
    'vibratory': {
      coverImage: '/images/consumables/final-polishing-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/final-polishing',
      description: 'Vibratory polishing requires high-quality final polishing consumables including colloidal silica and alumina suspensions. Our final polishing consumables are designed for EBSD preparation and superior surface finishes.'
    },
    'controlled-removal': {
      coverImage: '/images/consumables/polishing-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/lapping-films',
      description: 'Controlled removal polishers require precision diamond abrasives and polishing cloths for micron-level accuracy. Our polishing consumables support precise dimensional control and parallel surface preparation.'
    }
  },
  'microscopy': {
    'metallurgical': {
      coverImage: '/images/consumables/etching-cleaning-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/etching-cleaning',
      description: 'Metallurgical microscopes require proper sample preparation including etching reagents and cleaning supplies. Our etching and cleaning consumables reveal microstructural features for detailed analysis.'
    },
    'stereo': {
      coverImage: '/images/consumables/etching-cleaning-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/etching-cleaning',
      description: 'Stereo microscopes are used for sample inspection and quality control. Our cleaning supplies help maintain sample integrity and prepare samples for detailed examination.'
    },
    'image-analysis': {
      coverImage: '/images/consumables/etching-cleaning-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/etching-cleaning',
      description: 'Image analysis systems require properly prepared and etched samples for quantitative measurements. Our etching and cleaning consumables ensure optimal sample preparation for accurate analysis.'
    }
  },
  'hardness-testing': {
    'rockwell': {
      coverImage: '/images/consumables/hardness-testing-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/hardness-testing',
      description: 'Rockwell hardness testing requires properly prepared samples with flat, parallel surfaces. Our hardness testing consumables include sample preparation supplies and calibration standards.'
    },
    'microhardness': {
      coverImage: '/images/consumables/hardness-testing-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/hardness-testing',
      description: 'Microhardness testing requires precision sample preparation with minimal surface damage. Our hardness testing consumables support accurate microhardness measurements with proper sample preparation.'
    },
    'brinell-microvickers': {
      coverImage: '/images/consumables/hardness-testing-cover.webp',
      shopUrl: 'https://shop.metallographic.com/collections/hardness-testing',
      description: 'Brinell and macro Vickers testing require properly prepared samples for large indentations. Our hardness testing consumables ensure optimal sample preparation for accurate macrohardness measurements.'
    }
  }
}

// FAQ content for subcategories
const subcategoryFAQs: Record<string, Record<string, Array<{ question: string; answer: string }>>> = {
  'sectioning': {
    'precision-wafering': [
      {
        question: 'What feed rate should I use for precision wafering?',
        answer: 'Feed rates typically range from 0.001-0.1 mm/min depending on material hardness and blade type. Harder materials require slower feed rates. Diamond blades generally use 0.01-0.05 mm/min, while CBN blades can handle slightly faster rates. Start with manufacturer recommendations and adjust based on sample deformation and blade wear.'
      },
      {
        question: 'How do I choose between gravity feed and table feed systems?',
        answer: 'Gravity feed systems are cost-effective for standard sample geometries and research applications. Table feed systems provide programmable control for irregular shapes, automated sequences, and high-throughput production. Choose gravity feed for consistent, repeatable cuts on standard samples. Choose table feed for complex geometries or automated processing.'
      },
      {
        question: 'What blade should I use for my material?',
        answer: 'Diamond blades are ideal for hard, brittle materials (ceramics, silicon, hardened steels). CBN blades work well for ferrous materials and provide longer life in steel cutting. Blade thickness (0.3-0.5 mm) affects kerf loss and cutting speed. Consult material-specific recommendations for optimal blade selection.'
      },
      {
        question: 'How do I minimize deformation during precision cutting?',
        answer: 'Use slow feed rates (0.01-0.05 mm/min), proper blade selection for your material, adequate cooling with cutting fluid, and ensure proper sample clamping. Avoid excessive force and maintain consistent feed rate throughout the cut. Deformation should be less than 10 μm for high-quality samples.'
      },
      {
        question: 'What maintenance does a precision wafering system require?',
        answer: 'Regular maintenance includes cleaning the cutting chamber, checking blade alignment, maintaining proper cutting fluid levels, and inspecting sample holders. Blades should be replaced when cutting quality degrades or excessive wear is visible. Follow manufacturer guidelines for specific maintenance schedules.'
      }
    ],
    'abrasive-sectioning': [
      {
        question: 'What size abrasive blade do I need?',
        answer: 'Blade size depends on your sample size and cutting capacity. Common sizes are 8", 10", and 12" diameter. Larger blades provide more cutting capacity but require more powerful motors. Choose a blade size that accommodates your largest samples with adequate clearance.'
      },
      {
        question: 'Should I choose manual or automated abrasive cutting?',
        answer: 'Manual cutters offer lower cost and flexibility for variable sample sizes, ideal for low to medium volume. Automated cutters provide consistent cutting parameters, multiple sample capacity, and reduced operator time, making them ideal for high-volume production and quality control environments.'
      },
      {
        question: 'How often do I need to replace abrasive blades?',
        answer: 'Blade life depends on material hardness, cutting frequency, and blade quality. Typical blade life ranges from 50-200 cuts depending on material. Replace blades when cutting speed decreases significantly, excessive sparking occurs, or cut quality degrades. Regular dressing can extend blade life.'
      },
      {
        question: 'What cutting fluid should I use?',
        answer: 'Use water-soluble cutting fluids designed for abrasive cutting. The fluid should provide adequate cooling, lubrication, and corrosion protection. Follow manufacturer recommendations for dilution ratios. Change cutting fluid regularly to maintain cutting performance and prevent contamination.'
      },
      {
        question: 'Can I cut heat-sensitive materials with abrasive cutters?',
        answer: 'Abrasive cutting generates significant heat, so heat-sensitive materials may require precision wafering instead. However, with proper cooling and controlled feed rates, some heat-sensitive materials can be cut. Use adequate cutting fluid flow and consider slower feed rates to minimize heat generation.'
      }
    ],
    'automated': [
      {
        question: 'What are the benefits of automated abrasive cutting?',
        answer: 'Automated systems provide consistent cutting parameters, multiple sample capacity, programmable feed rates and force control, reduced operator intervention, and higher throughput. They ensure repeatable results across batches and reduce operator fatigue.'
      },
      {
        question: 'How many samples can I cut at once?',
        answer: 'Capacity varies by model, typically ranging from 2-6 samples per cycle depending on sample size and system design. Larger automated systems can handle more samples. Check manufacturer specifications for your specific model and sample size requirements.'
      },
      {
        question: 'Can I program different cutting parameters for different materials?',
        answer: 'Yes, most automated systems allow you to save multiple cutting programs with different feed rates, force settings, and cutting sequences. This enables quick switching between materials and ensures optimal cutting parameters for each material type.'
      }
    ],
    'manual': [
      {
        question: 'What are the advantages of manual abrasive cutting?',
        answer: 'Manual cutters offer lower initial cost, flexibility for various sample sizes, direct operator control over the cutting process, and suitability for low to medium volume cutting. They are ideal for training, research, and labs with budget constraints.'
      },
      {
        question: 'How do I control cutting speed manually?',
        answer: 'Manual control requires operator experience to maintain consistent feed rate and pressure. Practice with test samples to develop proper technique. Use visual and auditory cues (spark pattern, cutting sound) to maintain optimal cutting speed. Avoid excessive force which can damage samples and blades.'
      }
    ]
  },
  'mounting': {
    'compression-mounting': [
      {
        question: 'What temperature and pressure should I use for compression mounting?',
        answer: 'Typical compression mounting uses 150-200°C and 2000-4000 PSI depending on resin type and sample requirements. Phenolic resins typically use 150-180°C, while epoxy resins may require higher temperatures. Follow resin manufacturer specifications for optimal results.'
      },
      {
        question: 'How do I choose between hydraulic and pneumatic presses?',
        answer: 'Hydraulic presses provide higher pressure capability (up to 4000 PSI) and are ideal for high-volume production and materials requiring high pressure. Pneumatic presses offer faster cycle times, easier operation, and lower maintenance, making them ideal for medium-volume mounting and faster turnaround requirements.'
      },
      {
        question: 'What mounting resin should I use for my material?',
        answer: 'Phenolic resins are standard for most metals and provide good edge retention. Epoxy resins offer better chemical resistance and are ideal for materials requiring edge retention. Conductive resins are needed for SEM/EDX analysis. Transparent resins allow sample visibility. Choose based on your material and analysis requirements.'
      },
      {
        question: 'How long does compression mounting take?',
        answer: 'Compression mounting typically takes 5-10 minutes including heating, pressing, and cooling cycles. Actual time depends on resin type, sample size, and press specifications. Automated systems can reduce cycle time, while manual systems require operator attention throughout the process.'
      },
      {
        question: 'Can I mount heat-sensitive materials with compression mounting?',
        answer: 'Compression mounting uses heat (150-200°C) which can damage heat-sensitive materials like polymers, electronic components, and low-melting alloys. Use castable mounting for heat-sensitive materials instead.'
      }
    ],
    'castable-mounting': [
      {
        question: 'How long does castable mounting take to cure?',
        answer: 'Castable mounting cures at room temperature over 4-24 hours depending on resin type. Epoxy resins typically cure in 8-12 hours, acrylic resins in 4-8 hours, and polyester resins may take up to 24 hours. UV-curable resins can cure in 5-15 minutes under UV light.'
      },
      {
        question: 'Should I use vacuum or pressure for castable mounting?',
        answer: 'Vacuum systems (10-50 mbar) remove air bubbles and ensure complete resin penetration, ideal for porous materials and complex geometries. Pressure systems (up to 60 PSI) improve resin penetration and reduce porosity. Choose vacuum for highly porous materials, pressure for enhanced infiltration needs.'
      },
      {
        question: 'What resin should I use for castable mounting?',
        answer: 'Epoxy resins provide excellent chemical resistance and penetration. Acrylic resins offer faster curing and good clarity. Polyester resins are cost-effective for large batches. UV-curable resins provide rapid curing (5-15 minutes). Choose based on your material requirements, curing time needs, and application.'
      },
      {
        question: 'Can I use castable mounting for production environments?',
        answer: 'Yes, with proper systems. UV-curing systems provide rapid turnaround (5-15 minutes) suitable for production. Pressure systems can improve infiltration speed. However, castable mounting generally has longer cycle times than compression mounting, so consider throughput requirements.'
      },
      {
        question: 'How do I prevent bubbles in castable mounts?',
        answer: 'Use vacuum systems to remove air before curing, ensure proper resin mixing to avoid introducing air, use pressure during curing to compress any remaining bubbles, and allow adequate time for resin to flow and degas. Proper mold preparation and resin handling are critical.'
      }
    ]
  },
  'grinding-polishing': {
    'manual': [
      {
        question: 'What grit sequence should I use for manual grinding?',
        answer: 'Start with 120-180 grit for initial material removal, progress through 240, 320, 400, 600, and 800 grit for intermediate grinding, then move to 1200 grit before polishing. The exact sequence depends on material hardness and initial surface condition. Remove all scratches from previous grit before advancing.'
      },
      {
        question: 'How much pressure should I apply during manual grinding?',
        answer: 'Apply moderate, consistent pressure (typically 2-5 lbs per sample). Excessive pressure can cause deep scratches and sample damage. Insufficient pressure slows material removal. Maintain consistent pressure throughout the grinding motion for uniform material removal.'
      },
      {
        question: 'What speed should I use for manual grinding and polishing?',
        answer: 'Grinding typically uses 200-300 RPM for coarse grits, 150-250 RPM for fine grits. Polishing uses 100-150 RPM. Lower speeds provide more control but slower material removal. Adjust based on material hardness and operator experience.'
      },
      {
        question: 'How do I know when to move to the next grit?',
        answer: 'Move to the next grit when all scratches from the previous grit are removed and the surface shows uniform scratch pattern from the current grit. Inspect under good lighting. Incomplete scratch removal will show through in final polish.'
      }
    ],
    'semi-automated': [
      {
        question: 'What equipment do I need for semi-automated polishing?',
        answer: 'Semi-automated polishing requires a NANO grinder polisher base, FEMTO polishing heads (one per sample), and ZETA abrasive dispensers. The NANO base provides the platform, FEMTO heads provide programmable force and speed control, and ZETA dispensers automate abrasive delivery.'
      },
      {
        question: 'How do I program a semi-automated polishing cycle?',
        answer: 'Program each step with force (typically 5-15 lbs per sample), speed (100-300 RPM), time (30 seconds to 5 minutes per step), and abrasive type. The system automatically controls these parameters. Start with manufacturer-recommended programs and adjust based on your materials.'
      },
      {
        question: 'What are the benefits of semi-automated vs fully manual polishing?',
        answer: 'Semi-automated systems provide increased throughput (multiple samples simultaneously), consistent force and speed control, programmable parameters for repeatability, and reduced operator fatigue. They maintain flexibility for different materials while improving consistency.'
      },
      {
        question: 'Can I adjust polishing parameters during a run?',
        answer: 'Yes, you can pause the program and adjust force, speed, or time settings if needed. However, for best results, complete the full programmed cycle for consistency. Make adjustments between runs rather than during active polishing to maintain repeatable results.'
      }
    ],
    'automated': [
      {
        question: 'How many samples can I process in an automated system?',
        answer: 'Automated systems typically process 6-12 samples simultaneously depending on model and sample size. Larger systems accommodate more samples. Check manufacturer specifications for your specific model and sample holder configuration.'
      },
      {
        question: 'What are the advantages of fully automated grinding and polishing?',
        answer: 'Fully automated systems provide complete hands-off operation, high throughput, standardized procedures for consistent results, reduced operator time, and support for production environments. They ensure identical preparation conditions across all samples.'
      },
      {
        question: 'Can I customize polishing programs for different materials?',
        answer: 'Yes, automated systems allow you to create and save multiple polishing programs for different materials. Programs include force, speed, time, and abrasive selection for each step. This enables quick switching between material types while maintaining program consistency.'
      },
      {
        question: 'How long does an automated polishing cycle take?',
        answer: 'Cycle time depends on material, number of steps, and program parameters. Typical cycles range from 30 minutes to 2 hours for complete grinding and polishing sequences. Automated systems can run unattended, allowing operators to work on other tasks.'
      }
    ],
    'vibratory': [
      {
        question: 'What materials are best suited for vibratory polishing?',
        answer: 'Vibratory polishing is ideal for soft materials, final polishing steps, EBSD sample preparation, and applications requiring minimal deformation. It works well for eliminating subsurface damage from mechanical polishing and achieving superior flatness.'
      },
      {
        question: 'How long does vibratory polishing take?',
        answer: 'Vibratory polishing typically takes 2-8 hours depending on material and desired finish quality. It is a gentle process that removes material slowly. Plan for longer processing times compared to rotary polishing, but with superior final results.'
      },
      {
        question: 'What polishing media should I use for vibratory polishing?',
        answer: 'Use colloidal silica (0.05-0.25 μm) or fine alumina suspensions for final polishing. The vibratory action provides uniform polishing without aggressive material removal. Choose media particle size based on your final surface finish requirements.'
      },
      {
        question: 'Can I process multiple samples in a vibratory polisher?',
        answer: 'Yes, vibratory polishers can process multiple samples simultaneously. Samples are placed in the polishing container with media. The number depends on container size and sample dimensions. This makes vibratory polishing efficient for batch processing.'
      }
    ],
    'controlled-removal': [
      {
        question: 'What applications require controlled removal polishing?',
        answer: 'Controlled removal polishers (also called quantitative grinding systems, precision polishing equipment, or metered material removal systems) are essential for hardness testing preparation (requiring exact sample thickness), advanced microscopy (optical, SEM, FIB, TEM, AFM), integrated circuit preparation, optical component polishing, and any application requiring precise dimensional control and parallelism. They support parallel polishing, angle polishing, and site-specific polishing operations.'
      },
      {
        question: 'What is quantitative grinding or metered material removal?',
        answer: 'Quantitative grinding and metered material removal refer to controlled removal polishing systems that precisely control the amount of material removed during sample preparation. These systems (also known as precision polishing equipment) provide micron-level accuracy for thickness control with digital indicators that enable quantifiable material removal. Material removal can be monitored in real-time or preset for unattended operation, making them ideal for applications requiring exact dimensional specifications such as hardness testing and quantitative metallography.'
      },
      {
        question: 'What accuracy can I achieve with controlled removal polishing?',
        answer: 'Controlled removal polishers (quantitative grinding systems) provide micron-level accuracy for thickness control and parallelism. Typical accuracy is ±1-5 μm depending on system and material. Digital material removal indicators enable precise monitoring and control. This precision is essential for applications requiring exact dimensional specifications and makes them ideal for metered material removal operations.'
      },
      {
        question: 'How do I maintain parallelism during controlled removal?',
        answer: 'Controlled removal systems (precision polishing equipment) use precision fixtures, sample holders, and micrometer adjustments for pitch and roll to maintain parallelism. A rigid spindle design maintains predefined geometric orientation throughout the grinding/polishing process. Proper sample mounting, fixture alignment, and system calibration are critical. Follow manufacturer procedures for setup and maintenance to ensure optimal parallelism in quantitative grinding applications.'
      },
      {
        question: 'Can controlled removal systems handle different sample sizes?',
        answer: 'Yes, controlled removal polishers feature adjustable load control that expands capability to handle a range from small delicate samples to large workpieces. Variable speed rotation and oscillation maximize the use of the entire grinding/polishing disc and minimize artifacts. The systems are designed to accommodate various sample geometries and sizes while maintaining precision.'
      },
      {
        question: 'How do controlled removal systems ensure reproducible results?',
        answer: 'Controlled removal polishers eliminate inconsistencies between users regardless of skill level by providing programmable parameters, digital material removal monitoring, and precise control over speed, load, and orientation. The systems maintain consistent geometric orientation throughout processing, ensuring reproducible results across different operators and sample batches.'
      }
    ]
  },
  'microscopy': {
    'metallurgical': [
      {
        question: 'What magnification do I need for metallurgical microscopy?',
        answer: 'Metallurgical microscopes typically provide 50x to 2000x magnification. Lower magnifications (50-200x) are used for overview and grain structure. Higher magnifications (500-2000x) are needed for detailed phase identification and fine microstructural features. Choose based on your analysis requirements.'
      },
      {
        question: 'Should I choose upright or inverted metallurgical microscope?',
        answer: 'Upright microscopes are standard for most applications and easier to use. Inverted microscopes are ideal for large samples, samples that cannot be easily positioned, and applications requiring sample stability. Inverted designs also reduce sample handling.'
      },
      {
        question: 'What illumination do I need for metallurgical microscopy?',
        answer: 'Metallurgical microscopes use reflected light (epi-illumination) to examine polished and etched samples. LED illumination provides bright, consistent lighting with long life. Some systems offer brightfield, darkfield, and polarized light capabilities for different contrast modes.'
      },
      {
        question: 'Do I need a digital camera for metallurgical microscopy?',
        answer: 'Digital cameras enable image capture, documentation, measurement, and sharing. They are essential for quality control, research documentation, and quantitative analysis. Choose camera resolution based on your documentation and analysis needs (typically 5-20 megapixels).'
      }
    ],
    'stereo': [
      {
        question: 'What is the difference between stereo and metallurgical microscopes?',
        answer: 'Stereo microscopes provide low magnification (5x-100x) for sample inspection, macro-scale features, and quality control. Metallurgical microscopes provide higher magnification (50x-2000x) for detailed microstructural analysis. Use stereo microscopes for sample selection and inspection before detailed analysis.'
      },
      {
        question: 'What applications require stereo microscopy?',
        answer: 'Stereo microscopes are used for sample inspection, defect identification, quality control, sample selection before preparation, documentation of larger-scale features, and general lab inspection tasks. They provide 3D viewing capability for surface examination.'
      }
    ],
    'image-analysis': [
      {
        question: 'What measurements can image analysis systems perform?',
        answer: 'Image analysis systems can measure grain size (ASTM E112), phase area fraction, inclusion rating, particle size distribution, porosity, and various geometric parameters. They enable quantitative metallography for quality control and research applications.'
      },
      {
        question: 'What camera resolution do I need for image analysis?',
        answer: 'Camera resolution depends on your measurement requirements. Higher resolution (10-20 megapixels) provides better accuracy for fine features and small measurements. Standard resolutions (5-10 megapixels) are adequate for most grain size and phase fraction measurements.'
      },
      {
        question: 'How accurate are image analysis measurements?',
        answer: 'Measurement accuracy depends on sample preparation quality, image quality, calibration, and software algorithms. Well-prepared samples with proper contrast can achieve measurement accuracies within 5-10% for grain size and phase fraction. Proper calibration and standards are essential.'
      }
    ]
  },
  'hardness-testing': {
    'rockwell': [
      {
        question: 'What Rockwell scale should I use?',
        answer: 'HRC (Rockwell C) is used for hardened steel and hard materials. HRB (Rockwell B) is used for softer metals like aluminum and brass. HRA is used for thin materials and very hard materials. Choose the scale based on material hardness and thickness requirements.'
      },
      {
        question: 'How accurate are Rockwell hardness testers?',
        answer: 'Quality Rockwell testers provide accuracy within ±1 HRC when properly calibrated and maintained. Accuracy depends on proper sample preparation (flat, parallel surfaces), correct test procedure, regular calibration, and operator training. Follow ASTM E18 standards for best results.'
      },
      {
        question: 'What sample preparation is required for Rockwell testing?',
        answer: 'Samples must have flat, parallel surfaces free of scale, oxide, and contamination. Typical preparation includes grinding to 400-600 grit minimum. Surface finish should be adequate to clearly see the indentation. Proper mounting may be required for small or irregular samples.'
      },
      {
        question: 'How fast is Rockwell hardness testing?',
        answer: 'Rockwell testing is very fast, typically 10-15 seconds per measurement including indentation and reading. This makes Rockwell ideal for production quality control where high throughput is required. Automated systems can further increase testing speed.'
      }
    ],
    'microhardness': [
      {
        question: 'When should I use Vickers vs Knoop microhardness?',
        answer: 'Vickers is used for general microhardness testing and provides good accuracy across a wide range of materials. Knoop is preferred for thin coatings, brittle materials, and applications requiring minimal penetration depth. Knoop indentations are shallower for the same load.'
      },
      {
        question: 'What load should I use for microhardness testing?',
        answer: 'Microhardness loads range from 1 gf to 100 kgf depending on material and application. Lower loads (1-10 gf) are used for thin coatings and fine features. Higher loads (50-100 kgf) are used for bulk materials. Choose load based on material thickness and hardness.'
      },
      {
        question: 'How do I prepare samples for microhardness testing?',
        answer: 'Samples require excellent surface finish (typically polished to 1 μm or better), flat and parallel surfaces, and proper mounting if needed. Surface quality directly affects measurement accuracy. Any scratches or contamination will affect indentation quality and measurement accuracy.'
      },
      {
        question: 'Can I test individual phases or microstructural features?',
        answer: 'Yes, microhardness testing is ideal for testing individual phases, grains, or microstructural features due to small indentation size. Proper sample preparation and careful indentation placement are essential. Use appropriate loads to ensure indentation is contained within the feature of interest.'
      }
    ],
    'brinell-microvickers': [
      {
        question: 'When should I use Brinell vs macro Vickers testing?',
        answer: 'Brinell uses a 10 mm ball indenter and is ideal for coarse-grained materials, castings, and materials with heterogeneous microstructures. Macro Vickers provides more precise measurements and is better for materials with finer microstructures. Both use high loads (500-3000 kgf).'
      },
      {
        question: 'What materials are best suited for Brinell testing?',
        answer: 'Brinell testing is ideal for castings, forgings, coarse-grained materials, and materials with heterogeneous microstructures where large indentations provide more representative measurements. The large indentation averages out microstructural variations.'
      },
      {
        question: 'What sample preparation is required?',
        answer: 'Samples require flat, parallel surfaces. Surface finish requirements are less stringent than microhardness (typically 400-600 grit is adequate) due to large indentation size. However, surfaces must be free of scale, oxide, and contamination for accurate measurements.'
      }
    ]
  }
}

// Categories that support slug-only URLs
const SUPPORTED_CATEGORIES = ['sectioning', 'mounting', 'grinding-polishing']

// Normalize subcategory for URL (e.g., 'castable-mounting' -> 'castable')
function normalizeSubcategoryForUrl(category: string, subcategory: string | null | undefined): string | null {
  if (!subcategory) return null
  if (category === 'mounting') {
    if (subcategory === 'compression' || subcategory === 'compression-mounting') {
      return 'compression'
    } else if (subcategory === 'castable' || subcategory === 'castable-mounting') {
      return 'castable'
    }
  }
  return subcategory
}

export default function EquipmentSubcategoryPage({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const { category, subcategory } = use(params)
  const router = useRouter()
  const [subcategoryMeta, setSubcategoryMeta] = useState<SubcategoryMetadata | null>(null)
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [featuredEquipmentId, setFeaturedEquipmentId] = useState<string | null>(null)
  const [isCheckingSlug, setIsCheckingSlug] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, check if this is actually an equipment slug (for supported categories only)
        if (SUPPORTED_CATEGORIES.includes(category)) {
          // Check if subcategory is actually a valid subcategory
          const subcategories = await getSubcategoriesForCategory(category, 'equipment')
          const isSubcategory = subcategories.some(
            subcat => subcat.subcategory_key === subcategory || 
                     subcat.subcategory_key === `${subcategory}-mounting` ||
                     (category === 'mounting' && (
                       (subcategory === 'compression' && (subcat.subcategory_key === 'compression' || subcat.subcategory_key === 'compression-mounting')) ||
                       (subcategory === 'castable' && (subcat.subcategory_key === 'castable' || subcat.subcategory_key === 'castable-mounting'))
                     ))
          )

          // If not a valid subcategory, check if it's an equipment slug
          if (!isSubcategory) {
            const supabase = createClient()
            const { data: equipmentData, error: equipmentError } = await supabase
              .from('equipment')
              .select('category, subcategory, slug')
              .or(`slug.eq.${subcategory},item_id.ilike.${subcategory.toUpperCase()}`)
              .eq('status', 'active')
              .single()

            if (!equipmentError && equipmentData && equipmentData.category === category) {
              // This is an equipment slug, redirect to the correct path
              const normalizedSubcategory = normalizeSubcategoryForUrl(equipmentData.category, equipmentData.subcategory)
              const correctSlug = equipmentData.slug || subcategory
              if (normalizedSubcategory) {
                router.replace(`/equipment/${equipmentData.category}/${normalizedSubcategory}/${correctSlug}`)
                return
              } else {
                // No subcategory, redirect to category page
                router.replace(`/equipment/${equipmentData.category}`)
                return
              }
            }
          }
        }

        setIsCheckingSlug(false)

        // Check if user is admin
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setIsAdmin(!!user)

        // Normalize subcategory for metadata lookup
        let normalizedSubcategory = subcategory
        if (category === 'mounting') {
          if (subcategory === 'compression' || subcategory === 'compression-mounting') {
            normalizedSubcategory = 'compression'
          } else if (subcategory === 'castable' || subcategory === 'castable-mounting') {
            normalizedSubcategory = 'castable'
          }
        }
        
        // Fetch subcategory metadata
        const meta = await getSubcategoryMetadata(category, normalizedSubcategory, 'equipment')
        setSubcategoryMeta(meta)
        // Get featured equipment ID from metadata
        const featuredId = meta?.featured_equipment_id || null
        setFeaturedEquipmentId(featuredId)

        // Fetch all equipment in this subcategory
        const items = await getEquipmentBySubcategory(category, subcategory)
        setEquipment(items)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsCheckingSlug(false)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category, subcategory, router])

  const categoryLabel = categoryLabels[category] || category
  let subcategoryLabel = subcategoryMeta?.subcategory_label || subcategory
  
  // Add "Abrasive Cutters" suffix for automated/manual sectioning subcategories
  if (category === 'sectioning') {
    const subcategoryLower = subcategory.toLowerCase()
    const labelLower = subcategoryLabel.toLowerCase()
    if ((subcategoryLower.includes('automated') || subcategoryLower.includes('automatic') || 
         labelLower.includes('automated') || labelLower.includes('automatic')) && 
        !labelLower.includes('abrasive cutters')) {
      subcategoryLabel = 'Automated Abrasive Cutters'
    } else if ((subcategoryLower.includes('manual') || labelLower.includes('manual')) && 
               !labelLower.includes('abrasive cutters')) {
      subcategoryLabel = 'Manual Abrasive Cutters'
    }
  }
  
  // Store alternative terms for controlled-removal (used in subtitle, not breadcrumb)
  const controlledRemovalAltTerms = category === 'grinding-polishing' && subcategory === 'controlled-removal'
  
  // Normalize subcategory for technical content lookup (handle both 'compression'/'compression-mounting' and 'castable'/'castable-mounting')
  let technicalSubcategory = subcategory
  if (category === 'mounting') {
    if (subcategory === 'compression' || subcategory === 'compression-mounting') {
      technicalSubcategory = 'compression-mounting'
    } else if (subcategory === 'castable' || subcategory === 'castable-mounting') {
      technicalSubcategory = 'castable-mounting'
    }
  }
  const technicalContent = subcategoryTechnicalContent[category]?.[technicalSubcategory] || null

  // Group equipment by variant type if variants exist
  const groupedEquipment = useMemo(() => {
    const grouped: Record<string, Equipment[]> = {}
    if (technicalContent?.variants) {
      technicalContent.variants.forEach(variant => {
        grouped[variant.name] = []
      })
      grouped['Other'] = []
      
      equipment.forEach(item => {
        let assigned = false
        const itemNameLower = item.name.toLowerCase()
        const itemIdLower = item.item_id?.toLowerCase() || ''
        
        // Specific equipment matching for precision wafering
        if (category === 'sectioning' && subcategory === 'precision-wafering') {
          // PICO-155S and PICO-155P are gravity feed
          if (itemNameLower.includes('155') || itemIdLower.includes('155')) {
            const gravityVariant = technicalContent.variants!.find(v => v.name.toLowerCase().includes('gravity'))
            if (gravityVariant) {
              grouped[gravityVariant.name].push(item)
              assigned = true
            }
          }
          // PICO-200A and PICO-200S are table feed
          else if (itemNameLower.includes('200') || itemIdLower.includes('200')) {
            const tableVariant = technicalContent.variants!.find(v => v.name.toLowerCase().includes('table'))
            if (tableVariant) {
              grouped[tableVariant.name].push(item)
              assigned = true
            }
          }
        }
        
        // General matching logic for other categories or if not yet assigned
        if (!assigned) {
          for (const variant of technicalContent.variants!) {
            const variantNameLower = variant.name.toLowerCase()
            if (
              itemNameLower.includes(variantNameLower.split(' ')[0]) || 
              (itemNameLower.includes('gravity') && variantNameLower.includes('gravity')) ||
              (itemNameLower.includes('table') && variantNameLower.includes('table')) ||
              (itemNameLower.includes('manual') && variantNameLower.includes('manual')) ||
              (itemNameLower.includes('automat') && variantNameLower.includes('automat'))
            ) {
              grouped[variant.name].push(item)
              assigned = true
              break
            }
          }
        }
        
        if (!assigned) {
          grouped['Other'].push(item)
        }
      })
    }
    return grouped
  }, [equipment, technicalContent])

  // Check if we should show grouped view
  // Don't group compression mounting or castable mounting - show all equipment in a single grid
  const shouldShowGrouped = technicalContent?.variants && 
    Object.keys(groupedEquipment).some(key => groupedEquipment[key].length > 0) &&
    !(category === 'mounting' && (technicalSubcategory === 'compression-mounting' || technicalSubcategory === 'castable-mounting'))

  if (loading || isCheckingSlug) {
    return (
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          <div className="text-center py-12">
            <LoadingSpinner size="md" />
          </div>
        </div>
      </div>
    )
  }

  const IconComponent = categoryIcons[category] || Package

  return (
    <>
      {/* Hero Section - Full Width with Dark Gradient */}
      <section className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20 rounded-b-3xl relative overflow-hidden">
        {/* Subtle Microstructure Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <Image
            src="/images/microstructures/Ferrite-Pearlite steel.JPG"
            alt=""
            fill
            className="object-cover mix-blend-overlay"
            quality={60}
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6 sm:mb-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link 
                href="/equipment"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Equipment
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link 
                href={`/equipment/${category}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {categoryLabel}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium">{subcategoryLabel}</span>
            </nav>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
                <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                  {subcategoryLabel}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {category === 'grinding-polishing' && subcategory === 'controlled-removal' 
                  ? 'Controlled Removal Polishers' 
                  : subcategoryLabel}
              </h1>
              {category === 'grinding-polishing' && subcategory === 'controlled-removal' && (
                <p className="text-sm sm:text-base text-gray-400 mb-3 italic">
                  Also known as: Quantitative Grinding Systems, Precision Polishing Equipment, Metered Material Removal Systems
                </p>
              )}
              {subcategoryMeta?.description && (
                <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  {subcategoryMeta.description}
                </p>
              )}
              
              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <a
                  href="#equipment-section"
                  className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-white/20 whitespace-nowrap"
                >
                  <span>Browse Equipment</span>
                  <ChevronsDown className="w-5 h-5 flex-shrink-0 animate-bounce" />
                </a>
                <Link
                  href={
                    category === 'sectioning' 
                      ? "https://shop.metallographic.com/collections/cutting"
                      : category === 'grinding-polishing' && subcategory === 'vibratory'
                      ? "https://shop.metallographic.com/collections/final-polishing"
                      : category === 'grinding-polishing'
                      ? "https://shop.metallographic.com/collections/polishing"
                      : `https://shop.metallographic.com/collections/${category}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600/90 backdrop-blur-md text-white px-5 py-3 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-primary-500/30 whitespace-nowrap"
                >
                  <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                  <span>Shop Consumables</span>
                </Link>
              </div>
            </div>
            
            {/* Hero Image - Use featured equipment or first equipment image if available */}
            {(() => {
              // Find featured equipment or fall back to first equipment
              const heroEquipment = featuredEquipmentId 
                ? equipment.find(eq => eq.id === featuredEquipmentId) || equipment[0]
                : equipment[0]
              
              return heroEquipment && heroEquipment.image_url ? (
                <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden bg-transparent">
                  {isAdmin && (
                    <FeaturedEquipmentSelector
                      equipment={equipment}
                      currentFeaturedId={featuredEquipmentId}
                      category={category}
                      subcategory={subcategory}
                      onUpdate={(id) => {
                        setFeaturedEquipmentId(id)
                      }}
                    />
                  )}
                  <Image
                    src={getEquipmentImageUrl(heroEquipment.image_url) || heroEquipment.image_url}
                    alt={heroEquipment.name}
                    fill
                    className="object-contain"
                    priority
                    sizes="100vw"
                  />
                </div>
              ) : null
            })()}
          </div>
        </div>
      </section>

      <div className="container-custom">

        {/* Overview Section - Always show, right above equipment */}
        {(technicalContent?.overview || subcategoryMeta?.description) && (
          <section className="mb-8 sm:mb-12">
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {technicalContent?.overview || subcategoryMeta?.description}
              </p>
              {/* System Image for Semi-Automated Polishing Systems */}
              {category === 'grinding-polishing' && subcategory === 'semi-automated' && (
                <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden bg-white mt-6">
                  <Image
                    src="/images/equipment/grinding & polishing/nano-femto-zeta.webp"
                    alt="NANO grinder polisher base with FEMTO polishing heads and ZETA abrasive dispenser"
                    fill
                    className="object-contain p-4"
                    sizes="100vw"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Equipment Grid - Grouped by Variant if variants exist, otherwise flat */}
        <section id="equipment-section" className="scroll-mt-24">
          {equipment.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No equipment found in this subcategory.</p>
            </div>
          ) : shouldShowGrouped ? (
          <div className="space-y-12">
            {technicalContent?.variants?.map((variant, vIndex) => {
              const variantEquipment = groupedEquipment[variant.name] || []
              if (variantEquipment.length === 0) return null
              
                const sectionId = variant.anchor || variant.name.toLowerCase().replace(/\s+/g, '-')
                return (
                  <section key={vIndex} id={sectionId} className="scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{variant.name} Equipment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {variantEquipment.map((item, index) => (
                      <AnimatedCard key={item.id} index={index} animation="fadeInUp" duration={500}>
                        <Link 
                          href={`/equipment/${category}/${subcategory}/${item.slug || item.item_id?.toLowerCase()}`}
                          className="card hover:border-gray-300 group p-4 sm:p-6"
                        >
                          {item.image_url && (
                            <div className="relative w-full h-48 mb-4 rounded-lg bg-gray-100">
                              <Image
                                src={getEquipmentImageUrl(item.image_url) || item.image_url}
                                alt={item.name}
                                fill
                                className="object-contain !inset-2 sm:!inset-3"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          )}
                          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                            {item.name}
                          </h3>
                          {item.item_id && (
                            <p className="text-xs text-gray-500 mb-2">Item ID: {item.item_id}</p>
                          )}
                          {item.description && (
                            <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                              {item.description}
                            </p>
                          )}
                          <span className="text-primary-600 font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Details
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </span>
                        </Link>
                      </AnimatedCard>
                    ))}
                  </div>
                </section>
              )
            })}
            {groupedEquipment['Other'] && groupedEquipment['Other'].length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{subcategoryLabel}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {groupedEquipment['Other'].map((item, index) => (
                    <AnimatedCard key={item.id} index={index} animation="fadeInUp" duration={500}>
                      <Link 
                        href={`/equipment/${category}/${subcategory}/${item.slug || item.item_id?.toLowerCase()}`}
                        className="card hover:border-gray-300 group p-4 sm:p-6"
                      >
                        {item.image_url && (
                          <div className="relative w-full h-48 mb-4 rounded-lg bg-gray-100">
                            <Image
                              src={getEquipmentImageUrl(item.image_url) || item.image_url}
                              alt={item.name}
                              fill
                              className="object-contain !inset-2 sm:!inset-3"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                        {item.item_id && (
                          <p className="text-xs text-gray-500 mb-2">Item ID: {item.item_id}</p>
                        )}
                        {item.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                            {item.description}
                          </p>
                        )}
                        <span className="text-primary-600 font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </span>
                      </Link>
                    </AnimatedCard>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{subcategoryLabel} Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {equipment.map((item, index) => (
              <AnimatedCard key={item.id} index={index} animation="fadeInUp" duration={500}>
                <Link 
                  href={`/equipment/${category}/${subcategory}/${item.slug || item.item_id?.toLowerCase()}`}
                  className="card hover:border-gray-300 group p-4 sm:p-6"
                >
                  {item.image_url && (
                    <div className="relative w-full h-48 mb-4 rounded-lg bg-gray-100">
                      <Image
                        src={getEquipmentImageUrl(item.image_url) || item.image_url}
                        alt={item.name}
                        fill
                        className="object-contain !inset-2 sm:!inset-3"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                  {item.item_id && (
                    <p className="text-xs text-gray-500 mb-2">Item ID: {item.item_id}</p>
                  )}
                  {item.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <span className="text-primary-600 font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </Link>
              </AnimatedCard>
            ))}
            </div>
          </div>
        )}
        </section>

        {/* Variants Comparison - After Equipment */}
        {technicalContent?.variants && technicalContent.variants.length > 0 && (
          <section className="mt-12 mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Types & Differences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {technicalContent.variants.map((variant, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{variant.name}</h3>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">{variant.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {variant.keyFeatures.map((feature, fIndex) => (
                        <li key={fIndex} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Best For:</h4>
                    <ul className="space-y-1">
                      {variant.bestFor.map((use, uIndex) => (
                        <li key={uIndex} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {variant.anchor && (
                    <a
                      href={`#${variant.anchor}`}
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.getElementById(variant.anchor!)
                        if (element) {
                          const offset = 100
                          const elementPosition = element.getBoundingClientRect().top
                          const offsetPosition = elementPosition + window.pageYOffset - offset
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          })
                        }
                      }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors mt-4"
                    >
                      View {variant.name} Equipment
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Applications and Advantages - After Equipment */}
        {category === 'grinding-polishing' && (subcategory === 'vibratory' || subcategory === 'controlled-removal') && technicalContent && (
          <section className="mt-12 mb-8 sm:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Applications Section */}
              {technicalContent.applications && technicalContent.applications.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Applications</h2>
                  <ul className="space-y-2">
                    {technicalContent.applications.map((application, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                        <span>{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Advantages Section */}
              {technicalContent.advantages && technicalContent.advantages.length > 0 && (
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-5 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Key Advantages</h2>
                  <ul className="space-y-2">
                    {technicalContent.advantages.map((advantage, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* YouTube Video Section - Below Products */}
        {(() => {
          // Map subcategories to YouTube videos
          const subcategoryVideos: Record<string, Record<string, { videoId: string; title: string; description: string }>> = {
            'sectioning': {
              'precision-wafering': {
                videoId: 'nQ7nM3VhWEU',
                title: 'Precision Sectioning with PICO-155S',
                description: 'Watch Dr. Donald Zipperian demonstrate precision wafering techniques using the PICO-155S precision cutter. Learn proper setup, feed rate control, and techniques for minimal deformation cutting.'
              }
            },
            'mounting': {
              'compression': {
                videoId: 'ghEnwKGf8Nc',
                title: 'Compression Mounting with TP-7500S',
                description: 'Learn compression mounting techniques with the TP-7500S hydraulic mounting press. This video demonstrates proper sample preparation, resin selection, and mounting procedures for high-quality mounts.'
              },
              'compression-mounting': {
                videoId: 'ghEnwKGf8Nc',
                title: 'Compression Mounting with TP-7500S',
                description: 'Learn compression mounting techniques with the TP-7500S hydraulic mounting press. This video demonstrates proper sample preparation, resin selection, and mounting procedures for high-quality mounts.'
              },
              'castable': {
                videoId: 'g8QCrWxyRZ4',
                title: 'Castable Mounting with TeraVac',
                description: 'Watch demonstrations of castable mounting using the TeraVac (formerly LSSA-011) vacuum mounting system. Learn vacuum techniques for removing air bubbles and achieving void-free mounts.'
              },
              'castable-mounting': {
                videoId: 'g8QCrWxyRZ4',
                title: 'Castable Mounting with TeraVac',
                description: 'Watch demonstrations of castable mounting using the TeraVac (formerly LSSA-011) vacuum mounting system. Learn vacuum techniques for removing air bubbles and achieving void-free mounts.'
              }
            },
            'grinding-polishing': {
              'hand-belt': {
                videoId: 'oFQoUkcwTMc',
                title: 'Manual Grinding with PENTA 7500S & PENTA 5000A',
                description: 'Learn proper manual grinding techniques from Dr. Donald Zipperian. This video demonstrates correct sample orientation, grinding motion, pressure control, and proper use of the PENTA manual grinding systems.'
              },
              'semi-automated': {
                videoId: 'PT2fRdSvhDM',
                title: 'Automated Grinding & Polishing with NANO 1000S & FEMTO 1100S',
                description: 'Watch Dr. Donald Zipperian demonstrate automated grinding and polishing using the NANO 1000S and FEMTO 1100S systems. Learn how to program and operate these semi-automated systems for consistent, high-quality results.'
              },
              'vibratory': {
                videoId: 'cPkzthQbLcM',
                title: 'Vibratory Polishing with the GIGA S',
                description: 'Learn vibratory polishing techniques from Dr. Donald Zipperian. This video demonstrates how to use the GIGA S vibratory polisher for final polishing, including setup, parameter selection, and achieving superior surface finishes for EBSD and high-quality microstructural analysis.'
              }
            }
          }

          // Normalize subcategory for lookup
          const normalizedSubcategory = subcategory.toLowerCase().trim()
          
          // Try exact match first
          let video = subcategoryVideos[category]?.[normalizedSubcategory]
          
          // Handle mounting subcategory variations - try both formats
          if (!video && category === 'mounting') {
            if (normalizedSubcategory === 'compression' || normalizedSubcategory === 'compression-mounting' || normalizedSubcategory.includes('compression')) {
              video = subcategoryVideos[category]?.['compression'] || subcategoryVideos[category]?.['compression-mounting']
            } else if (normalizedSubcategory === 'castable' || normalizedSubcategory === 'castable-mounting' || normalizedSubcategory.includes('castable')) {
              video = subcategoryVideos[category]?.['castable'] || subcategoryVideos[category]?.['castable-mounting']
            }
          }
          
          if (!video) return null

          return (
            <section className="mt-12 mb-8 sm:mb-12">
              <div className="max-w-4xl mx-auto">
                <YouTubeVideo
                  videoId={video.videoId}
                  title={video.title}
                  description={video.description}
                />
              </div>
            </section>
          )
        })()}

        {/* Final Polishing Consumables Section - Only for Vibratory Polishing */}
        {category === 'grinding-polishing' && subcategory === 'vibratory' && (
          <section className="mt-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Final Polishing Consumables</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              {/* Cover Image */}
              <div className="lg:col-span-1">
                <div className="relative w-full h-48 lg:h-full min-h-[200px] rounded-lg overflow-hidden bg-transparent">
                  <Image
                    src="/images/consumables/final polishing & analysis-cover.png"
                    alt="Final polishing consumables"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    unoptimized
                    onError={(e) => {
                      // Hide parent div if image fails to load
                      const parent = e.currentTarget.closest('div.lg\\:col-span-1') as HTMLElement | null
                      if (parent) {
                        parent.style.display = 'none'
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Consumable Categories */}
              <div className="lg:col-span-3">
                <p className="text-base text-gray-700 mb-4 leading-relaxed">
                  Vibratory polishing requires high-quality final polishing consumables to achieve superior surface finishes. Our final polishing collection includes colloidal silica, alumina suspensions, and specialized polishing agents designed for EBSD preparation and critical microstructural analysis.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="https://shop.metallographic.com/collections/final-polishing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all group text-sm font-medium text-gray-700 hover:text-primary-700"
                  >
                    <span>Shop Final Polishing Consumables</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Relevant Consumables Section - For all subcategories (skip if vibratory already has specific section) */}
        {(() => {
          // Skip if vibratory already has its specific consumables section above
          if (category === 'grinding-polishing' && subcategory === 'vibratory') return null
          
          // Normalize subcategory for consumables lookup
          let consumablesSubcategory = subcategory
          if (category === 'mounting') {
            if (subcategory === 'compression' || subcategory === 'compression-mounting') {
              consumablesSubcategory = 'compression-mounting'
            } else if (subcategory === 'castable' || subcategory === 'castable-mounting') {
              consumablesSubcategory = 'castable-mounting'
            }
          }
          const consumablesInfo = subcategoryConsumables[category]?.[consumablesSubcategory]
          if (!consumablesInfo) return null

          return (
            <section className="mt-12 mb-8 sm:mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Related Consumables</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Cover Image - No background */}
                <div className="lg:col-span-1">
                  <Link
                    href={consumablesInfo.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <div className="relative w-full h-48 lg:h-full min-h-[200px] rounded-lg overflow-hidden bg-transparent">
                      <Image
                        src={consumablesInfo.coverImage}
                        alt={`${subcategoryLabel} consumables`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        onError={(e) => {
                          // Hide parent div if image fails to load
                          const parent = e.currentTarget.closest('div.lg\\:col-span-1') as HTMLElement | null
                          if (parent) {
                            parent.style.display = 'none'
                          }
                        }}
                      />
                    </div>
                  </Link>
                </div>
                
                {/* Consumable Description and Link */}
                <div className="lg:col-span-3">
                  <p className="text-base text-gray-700 mb-4 leading-relaxed">
                    {consumablesInfo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={consumablesInfo.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all group text-sm font-medium text-gray-700 hover:text-primary-700"
                    >
                      <span>Shop {subcategoryLabel} Consumables</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )
        })()}

        {/* FAQ Section - For all subcategories */}
        {(() => {
          // Normalize subcategory key for FAQ lookup (handle both 'compression'/'compression-mounting' and 'castable'/'castable-mounting')
          let faqSubcategory = subcategory
          if (category === 'mounting') {
            if (subcategory === 'compression' || subcategory === 'compression-mounting') {
              faqSubcategory = 'compression-mounting'
            } else if (subcategory === 'castable' || subcategory === 'castable-mounting') {
              faqSubcategory = 'castable-mounting'
            }
          }
          const faqs = subcategoryFAQs[category]?.[faqSubcategory]
          if (!faqs || faqs.length === 0) return null

          return (
            <section className="mt-12 mb-8 sm:mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              <FAQAccordion items={faqs} />
            </section>
          )
        })()}
      </div>
    </>
  )
}

