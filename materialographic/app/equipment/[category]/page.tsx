'use client'

import Link from 'next/link'
import Image from 'next/image'
import { use, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { getSubcategoriesForCategory, getFeaturedEquipmentBySubcategory, getSubcategoryMetadata } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { SubcategoryMetadata, Equipment } from '@/lib/supabase'
import { Scissors, Package, Gauge, Microscope, HardDrive, Home, ChevronRight, ArrowLeft, CheckCircle2, BookOpen, ShoppingBag, ChevronsDown } from 'lucide-react'
import AnimatedCard from '@/components/AnimatedCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { getEquipmentImageUrl } from '@/lib/storage'
import FAQAccordion from '@/components/FAQAccordion'

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

const categoryDescriptions: Record<string, string> = {
  'sectioning': 'Cutting equipment for sectioning samples, including precision wafering cutters and abrasive cutters.',
  'mounting': 'Mounting presses and systems for compression and castable mounting.',
  'grinding-polishing': 'Grinders, polishers, and automated systems for sample preparation.',
  'microscopy': 'Metallurgical and stereo microscopes for microstructure analysis.',
  'hardness-testing': 'Rockwell, microhardness, and Brinell testers for material hardness evaluation.',
  'lab-furniture': 'Workbenches, storage, and supporting equipment for the metallography lab.',
}

// Category-specific technical content
const categoryTechnicalContent: Record<string, {
  heroHeadline: string
  heroDescription: string
  useCases: Array<{ title: string, description: string, anchor?: string | null }>
  processDescription: string
  keySpecifications: string[]
  selectionConsiderations?: Array<{ title: string; description: string }>
  faqs?: Array<{ question: string; answer: string }>
  guideSlug?: string
  guideTitle?: string
  heroImage?: string
  processImage?: string
}> = {
  'mounting': {
    heroHeadline: 'Mounting Equipment',
    heroDescription: 'Compression mounting presses and castable mounting systems for embedding metallographic samples in resin. Supports hot compression mounting (150-200°C, up to 4000 PSI) and cold castable mounting (room temperature, vacuum/pressure options).',
    useCases: [
      { title: 'Compression Mounting', description: 'Hot mounting at 150-200°C under 2000-4000 PSI pressure. Used for metals, ceramics, and high-volume production. Provides excellent edge retention and dimensional stability.', anchor: 'compression-mounting' },
      { title: 'Castable Mounting', description: 'Room temperature mounting using epoxy or acrylic resins. Required for heat-sensitive materials (polymers, electronic components, low-melting alloys). Vacuum systems remove air bubbles.', anchor: 'castable-mounting' },
      { title: 'Pressure Mounting', description: 'Castable mounting with applied pressure (up to 60 PSI) to improve resin penetration and reduce porosity. Suitable for porous materials and complex geometries.', anchor: 'castable-mounting' },
      { title: 'UV Curing Systems', description: 'Fast-curing mounting systems using UV-curable resins. Curing times of 5-15 minutes. Ideal for rapid turnaround and small sample batches.', anchor: 'castable-mounting' },
    ],
    processDescription: 'Mounting embeds specimens in thermosetting or castable resins to create standardized, handleable samples. Compression mounting uses heat (150-200°C) and pressure (2000-4000 PSI) for rapid curing (typically 5-15 minutes). UV curing systems offer similar speed (5-15 minutes) using UV-curable resins. Traditional castable mounting cures at room temperature over 4-24 hours. Selection depends on material thermal sensitivity, sample geometry, throughput requirements, and edge retention needs.',
    keySpecifications: [
      'Pressure range: 0-4000 PSI (compression) or 0-60 PSI (castable pressure)',
      'Temperature range: 20-200°C (compression heating)',
      'Chamber sizes: 25mm to 50mm diameter typical',
      'Curing time: 5-15 min (compression/UV curing) or 4-24 hours (traditional castable)',
      'Vacuum capability: 10-50 mbar for bubble removal',
    ],
    selectionConsiderations: [
      { title: 'Material Thermal Sensitivity', description: 'Heat-sensitive materials (polymers, electronics, low-melting alloys) require castable mounting. Metals and ceramics can use compression mounting for faster turnaround.' },
      { title: 'Sample Geometry', description: 'Irregular shapes and porous materials benefit from vacuum castable mounting. Standard shapes work well with compression mounting.' },
      { title: 'Throughput Requirements', description: 'Compression mounting typically takes 5-15 minutes per cycle. UV curing systems (5-15 minutes) offer similar speed to compression mounting. Traditional castable mounting (4-24 hours) is slower but suitable for batch processing. Choose based on your daily sample volume and turnaround needs.' },
    ],
    faqs: [
      { question: 'When should I choose compression mounting over castable mounting?', answer: 'Choose compression mounting for metals, ceramics, and high-volume production where fast turnaround (typically 5-15 minutes) is important. Compression mounting provides superior edge retention and dimensional stability. UV curing systems offer similar speed (5-15 minutes) for heat-sensitive materials. Traditional castable mounting (4-24 hours) is slower but prevents thermal damage to very sensitive samples and works well for batch processing.' },
      { question: 'Why is pressure important in mounting equipment?', answer: 'Pressure ensures proper resin penetration and eliminates voids. Compression mounting uses 2000-4000 PSI to force resin into sample pores and create dense mounts with excellent edge retention. Castable pressure mounting (up to 60 PSI) improves resin penetration for porous materials. Higher pressure in compression mounting also reduces curing time and improves dimensional stability, which is critical for quantitative measurements.' },
      { question: 'Do I need vacuum capability for castable mounting?', answer: 'Vacuum is essential for castable mounting when working with porous materials, irregular geometries, or when air bubbles would compromise mount quality. Vacuum removes trapped air (10-50 mbar) before resin cures, preventing voids that can cause edge chipping during grinding. For dense, non-porous samples with simple geometries, vacuum may not be necessary, but it generally improves mount quality and reduces failures.' },
    ],
    guideSlug: 'mounting',
    guideTitle: 'Mounting Guide',
    heroImage: '/images/equipment/compression mounting/hydraulic mounting press/tp-7500s/tp-7500s-cover.webp',
    processImage: '/images/consumables/mounting-cover.webp',
  },
  'sectioning': {
    heroHeadline: 'Sectioning Equipment',
    heroDescription: 'Two distinct sectioning methods: precision wafering systems using diamond/CBN blades for minimal deformation, and abrasive sectioning systems using reinforced abrasive wheels for high-throughput cutting.',
    useCases: [
      { title: 'Precision Wafering', description: 'Diamond or CBN blades with controlled feed rates (0.001-0.1 mm/min). Minimal deformation (<10 μm), low heat generation. Used for delicate materials, small samples, and research applications. Gravity feed and table feed systems available.', anchor: 'precision-wafering' },
      { title: 'Manual Abrasive Sectioning', description: 'Reinforced abrasive wheels cutting at 1000-3000 RPM. Higher material removal rates, suitable for larger samples and production environments. Typical cut times: 30 seconds to 5 minutes. Manual systems require operator control of feed rate.', anchor: 'manual-abrasive' },
      { title: 'Automated Abrasive Sectioning', description: 'Programmable feed rates, force control, and multiple sample capacity. Reduces operator time and ensures consistent cutting parameters across batches. Ideal for high-volume production and consistent batch processing.', anchor: 'automated-abrasive' },
    ],
    processDescription: 'Sectioning uses two distinct methods: (1) Precision wafering employs diamond or CBN blades with slow feed rates (0.001-0.1 mm/min) to minimize deformation (<10 μm) and heat-affected zones. Ideal for delicate materials, ceramics, and research. (2) Abrasive sectioning uses reinforced abrasive wheels at higher speeds (1000-3000 RPM) for faster cutting (30 sec - 5 min) with acceptable deformation for most metals. Selection depends on material hardness, sample size, deformation tolerance, and throughput requirements.',
    keySpecifications: [
      'Blade sizes: 4-12 inch diameter',
      'Cutting capacity: 1-150 mm typical',
      'Feed rates: 0.001-5 mm/min (precision) or 0.1-2 mm/s (abrasive)',
      'Coolant: Water-based or oil-based cutting fluids',
      'Automation: Programmable cycles, force control, multi-sample holders',
    ],
    selectionConsiderations: [
      { title: 'Material Hardness & Deformation Tolerance', description: 'Delicate materials requiring <10 μm deformation need precision wafering. Most metals can tolerate abrasive sectioning with acceptable deformation.' },
      { title: 'Sample Size', description: 'Small samples (<10 mm) and thin sections benefit from precision wafering. Larger samples (>20 mm) are efficiently cut with abrasive systems.' },
      { title: 'Throughput Requirements', description: 'High-volume production (20+ samples/day) benefits from automated systems. Low-volume research labs can use manual systems effectively.' },
    ],
    faqs: [
      { question: 'What\'s the difference between precision wafering and abrasive sectioning?', answer: 'Precision wafering uses diamond or CBN blades with slow feed rates (0.001-0.1 mm/min) to minimize deformation (<10 μm) and heat-affected zones. It\'s essential for delicate materials, ceramics, and research requiring minimal damage. Abrasive sectioning uses reinforced wheels at higher speeds (1000-3000 RPM) for faster cutting (30 sec - 5 min) with acceptable deformation for most metals. Choose precision wafering when deformation tolerance is critical; choose abrasive sectioning for production environments prioritizing speed.' },
      { question: 'Why does blade size matter when selecting a sectioning system?', answer: 'Blade size determines maximum cutting capacity and affects cutting speed. Larger blades (12-16 inch) can cut larger samples and provide more cutting surface, reducing blade wear. Smaller blades (4-8 inch) are more economical and suitable for small samples. The blade size must accommodate your largest sample diameter plus clearance. For most metallography labs, 10-12 inch blades handle the majority of sample sizes efficiently.' },
      { question: 'When should I invest in automated sectioning equipment?', answer: 'Automated sectioning is worth the investment when processing 20+ samples per day, when consistency across operators is critical, or when you need programmable cutting parameters for certification work. Automated systems reduce operator time, ensure consistent feed rates and force control, and can handle multiple samples per cycle. Manual systems are cost-effective for low-volume labs (1-10 samples/day) where operator skill can compensate for lack of automation.' },
    ],
    guideSlug: 'sectioning',
    guideTitle: 'Sectioning Guide',
    heroImage: '/images/equipment/precision wafering/gravity feed precision cutters/pico-155s/pico-155s-cover.webp',
  },
  'grinding-polishing': {
    heroHeadline: 'Grinding & Polishing Equipment',
    heroDescription: 'Manual and automated grinding/polishing systems for metallographic sample preparation. Progressive material removal from rough grinding (120-320 grit) through final polishing (0.05 μm diamond).',
    useCases: [
      { title: 'Hand & Belt Grinders', description: 'Large castings, weldments, and production samples requiring rapid material removal. Ideal for foundry QC, weld inspection, and production environments processing 20+ samples per day. Hand grinders enable field work and irregular geometries.', anchor: 'hand-belt' },
      { title: 'Manual Polishing Systems', description: 'Research labs, academic training, and low-volume production (1-4 samples/hour). Perfect for multi-phase alloys, composites, and ceramics requiring operator judgment. Common applications: material development, failure analysis, and R&D labs.', anchor: 'manual' },
      { title: 'Semi-Automated Polishing Systems', description: 'Medium-volume production (10-20 samples/hour) for QC labs and contract testing services. Handles up to 6 samples simultaneously with consistent results across multiple operators. Common applications: automotive/aerospace certification, steel mill QC, and contract metallography (50-200 samples/week). Note: Requires NANO base.', anchor: 'semi-automated' },
      { title: 'Vibratory Polishing', description: 'Critical for EBSD sample preparation and soft materials (aluminum, copper, lead) that deform under rotary polishing. Ideal for final polishing requiring minimal deformation. Common applications: EBSD orientation mapping, TEM preparation, and batch processing overnight.', anchor: 'vibratory' },
      { title: 'Controlled Removal Polishers', description: 'Required for hardness testing preparation where exact sample thickness and parallelism are critical (ASTM E18, E384). Essential for Rockwell/microhardness testing and quantitative metallography requiring precise dimensional control.', anchor: 'controlled-removal' },
    ],
    processDescription: 'Grinding and polishing is a progressive multi-stage process that transforms sectioned samples into mirror-finish surfaces suitable for microstructural analysis. The process consists of three distinct stages: grinding, polishing, and final polishing.\n\n**Grinding** removes sectioning damage and establishes a flat surface using silicon carbide (SiC) papers (120-320 grit for rough grinding, 400-1200 grit for fine grinding) or diamond discs. This stage removes the majority of material damage from cutting, typically 50-200 μm of material, and creates a uniform scratch pattern.\n\n**Polishing** progressively removes grinding scratches using diamond suspensions (9 μm, 6 μm, 3 μm, 1 μm) on polishing cloths. This intermediate stage refines the surface, removing visible scratches and preparing the sample for final polishing.\n\n**Final Polishing** achieves the mirror finish required for microstructural examination using fine diamond suspensions (0.25 μm, 0.05 μm) or colloidal silica on specialized polishing cloths. For soft materials (aluminum, copper, lead) and EBSD preparation, vibratory polishing is essential to prevent deformation that occurs with rotary polishing.\n\nManual systems require operator skill for consistent pressure, speed, and timing. Automated systems control force (5-50 N per sample), platen speed (50-600 RPM), and time per step to ensure repeatable surface quality across operators and batches. Selection depends on throughput requirements, material types, deformation sensitivity, and consistency needs.',
    keySpecifications: [
      'Platen sizes: 8, 10, or 12 inch diameter',
      'Speed range: 50-600 RPM',
      'Force range: 5-200 N per sample',
      'Stations: 1-12 samples per system',
      'Automation: Programmable cycles, force control, timing per step',
    ],
    selectionConsiderations: [
      { title: 'Throughput Requirements', description: 'Low-volume (1-4 samples/hour) suits manual systems. Medium-volume (10-20 samples/hour) benefits from semi-automated systems handling up to 6 samples simultaneously. High-volume production requires fully automated systems.' },
      { title: 'Material Types & Deformation Sensitivity', description: 'Soft materials (aluminum, copper, lead) and EBSD preparation require vibratory polishing to prevent deformation. Most metals work well with rotary polishing. Hardness testing needs controlled removal polishers for precise thickness control.' },
      { title: 'Consistency & Operator Variability', description: 'Manual systems depend on operator skill. Semi-automated and automated systems ensure consistent results across operators, critical for QC labs and certification work requiring repeatable surface quality.' },
      { title: 'Platen Size & Sample Capacity', description: 'Larger platens (12 inch) accommodate more samples and larger workpieces, improving efficiency. Smaller platens (8 inch) are economical for small samples. Consider your typical sample size and batch processing needs.' },
      { title: 'Application-Specific Requirements', description: 'EBSD and TEM preparation require vibratory polishing. Hardness testing needs controlled removal for exact thickness. Standard metallography works with manual or semi-automated rotary systems.' },
    ],
    // Note: No single guide exists for grinding-polishing. Use /guides/grinding-techniques or /guides/polishing-methods instead
    heroImage: '/images/equipment/grinding & polishing/manual grinder polishers/nano-2000s/nano-2000s-cover.webp',
    faqs: [
      { question: 'How do I choose between manual, semi-automated, and fully automated grinding/polishing systems?', answer: 'Manual systems (1-4 samples/hour) suit research labs, academic training, and low-volume production where operator judgment is valuable. Semi-automated systems (10-20 samples/hour) handle up to 6 samples simultaneously and provide consistent results across operators—ideal for QC labs and contract testing. Fully automated systems maximize throughput but require higher investment. Choose based on your sample volume, consistency requirements, and budget. Most labs start with manual or semi-automated systems.' },
      { question: 'Why does platen size matter when selecting a grinder-polisher?', answer: 'Platen size determines how many samples you can process simultaneously and affects workflow efficiency. Larger platens (12 inch) accommodate more samples and larger workpieces, reducing setup time. Smaller platens (8 inch) are more economical and suitable for small samples. The platen size also affects consumable costs—larger platens use more abrasive paper and polishing cloth. For most labs, 10-12 inch platens provide the best balance of capacity and cost.' },
      { question: 'When do I need vibratory polishing instead of rotary polishing?', answer: 'Vibratory polishing is essential for EBSD sample preparation, soft materials (aluminum, copper, lead) that deform under rotary polishing, and applications requiring minimal subsurface damage. Rotary polishing applies force that can deform soft materials, while vibratory polishing uses gentle vibration to polish without deformation. If you work with soft materials, EBSD, or TEM preparation, vibratory polishing is necessary. For most metals and standard metallography, rotary polishing is sufficient and faster.' },
    ],
  },
  'microscopy': {
    heroHeadline: 'Metallurgical Microscopes',
    heroDescription: 'Upright and inverted metallurgical microscopes for microstructure analysis. Brightfield, darkfield, polarized light, and DIC imaging modes. Magnification ranges from 50x to 2000x.',
    useCases: [
      { title: 'Metallurgical Microscopes', description: 'Upright or inverted designs with reflected light illumination. Standard magnification: 50x-1000x. Used for microstructure examination, phase identification, and grain size analysis.' },
      { title: 'Stereo Microscopes', description: 'Low magnification (5x-100x) for sample inspection, defect identification, and macro-scale features. Essential for quality control and sample selection.' },
      { title: 'Digital Imaging', description: 'Integrated cameras and software for image capture, measurement, and documentation. Supports ASTM grain size measurements and phase area fraction analysis.' },
    ],
    processDescription: 'Metallurgical microscopes use reflected light to examine polished and etched samples. Upright microscopes (epi-illumination) are standard for most applications. Inverted designs allow examination of large or irregular samples. Magnification ranges from 50x (overview) to 2000x (high-resolution detail). Imaging modes include brightfield (standard), darkfield (enhanced contrast), polarized light (grain orientation), and DIC (topographic detail). Digital cameras enable image capture, measurement, and documentation for reports and databases.',
    keySpecifications: [
      'Magnification: 50x-2000x typical range',
      'Objectives: 5x, 10x, 20x, 50x, 100x',
      'Illumination: LED or halogen, brightfield/darkfield/DIC',
      'Camera: 5-24 MP resolution',
      'Software: Image capture, measurement, grain size analysis',
    ],
    selectionConsiderations: [
      { title: 'Sample Size & Shape', description: 'Upright microscopes suit standard samples. Inverted designs accommodate large or irregular samples that cannot be positioned on a stage.' },
      { title: 'Imaging Requirements', description: 'Standard brightfield suits most applications. Darkfield enhances contrast for inclusions. Polarized light reveals grain orientation. DIC provides topographic detail.' },
      { title: 'Measurement Needs', description: 'Quantitative analysis (grain size, phase area fraction) requires digital imaging and measurement software. Visual inspection can use basic systems.' },
    ],
    faqs: [
      { question: 'Do I need an upright or inverted metallurgical microscope?', answer: 'Choose an upright microscope for standard samples that can be positioned on a stage. Upright designs are more common and cost-effective. Inverted microscopes are essential for large samples, irregular shapes, or samples that cannot be easily positioned. Inverted designs also allow examination of samples mounted in large fixtures. Most labs start with an upright microscope unless they regularly work with oversized or irregular samples.' },
      { question: 'Why are different imaging modes (brightfield, darkfield, DIC) important?', answer: 'Different imaging modes reveal different microstructural features. Brightfield is standard for most applications. Darkfield enhances contrast for inclusions, precipitates, and small features by illuminating them against a dark background. Polarized light reveals grain orientation and texture in anisotropic materials. DIC (Differential Interference Contrast) provides topographic detail and enhances surface relief. Most labs need brightfield and darkfield; polarized light and DIC are valuable for specialized applications.' },
      { question: 'What camera resolution do I need for metallography?', answer: 'For documentation and basic measurements, 5-8 MP cameras are sufficient. For publication-quality images and precise quantitative analysis (grain size, phase area fraction), 12-24 MP cameras provide better detail and measurement accuracy. Higher resolution also allows digital zoom without pixelation. Consider your documentation needs: basic QC may only need 5 MP, while research and certification work benefits from 12+ MP cameras with measurement software.' },
    ],
    heroImage: '/images/equipment/microscopy/metallurgical microscopes/im-5000/im-5000-cover.webp',
  },
  'hardness-testing': {
    heroHeadline: 'Hardness Testing Equipment',
    heroDescription: 'Rockwell, Vickers, Knoop, and Brinell hardness testers for material property evaluation. Manual and automated systems meeting ASTM and ISO standards.',
    useCases: [
      { title: 'Rockwell Testing', description: 'Indentation depth measurement under major and minor loads. Scales: HRC (hardened steel), HRB (soft metals), HRA (thin materials). Loads: 60, 100, or 150 kgf. Fast testing (10-15 seconds per measurement).' },
      { title: 'Microhardness (Vickers/Knoop)', description: 'Optical measurement of indentation diagonal. Loads: 1 gf to 100 kgf. Vickers for general microhardness; Knoop for thin coatings and brittle materials. Measurement time: 30-60 seconds.' },
      { title: 'Brinell Testing', description: 'Large indenter (10 mm ball) for coarse-grained materials and castings. Loads: 500-3000 kgf. Suitable for materials with heterogeneous microstructures.' },
    ],
    processDescription: 'Hardness testing measures resistance to permanent deformation. Rockwell uses depth measurement for rapid testing (10-15 sec). Vickers/Knoop use optical measurement of indentation size for precise microhardness (30-60 sec). Brinell uses large indenters for coarse-grained materials. Selection depends on material hardness range, sample size, required precision, and testing standards (ASTM E18, E384, E10). Automated systems provide consistent load application, measurement, and data recording.',
    keySpecifications: [
      'Rockwell: 60-150 kgf loads, HRC/HRB/HRA scales',
      'Vickers/Knoop: 1 gf - 100 kgf loads',
      'Brinell: 500-3000 kgf loads, 10 mm ball',
      'Automation: Programmable test cycles, auto-measurement, data export',
      'Standards: ASTM E18, E384, E10; ISO 6506, 6507, 6508',
    ],
    selectionConsiderations: [
      { title: 'Hardness Range & Material Type', description: 'Rockwell (HRC/HRB) suits most metals (10-70 HRC). Vickers/Knoop microhardness (1 gf - 100 kgf) handles thin coatings and small features. Brinell suits coarse-grained materials.' },
      { title: 'Testing Standards', description: 'Ensure equipment meets required standards (ASTM E18 for Rockwell, E384 for microhardness, E10 for Brinell) for certification and quality control applications.' },
      { title: 'Throughput & Automation', description: 'High-volume testing (50+ tests/day) benefits from automated systems with data export. Manual systems work for occasional testing and research applications.' },
    ],
    faqs: [
      { question: 'How do I choose between Rockwell, Vickers, and Brinell hardness testing?', answer: 'Rockwell testing is fastest (10-15 seconds) and suits most metals in the 10-70 HRC range. It uses depth measurement and is ideal for production QC. Vickers/Knoop microhardness uses optical measurement and handles thin coatings, small features, and case depth measurements (1 gf - 100 kgf loads). Brinell uses large indenters (10 mm ball) for coarse-grained materials and castings. Choose Rockwell for speed and general testing, microhardness for precision and small features, and Brinell for heterogeneous microstructures.' },
      { question: 'Why do testing standards (ASTM E18, E384, E10) matter when selecting equipment?', answer: 'Standards ensure test results are comparable and acceptable for certification. ASTM E18 (Rockwell), E384 (microhardness), and E10 (Brinell) specify equipment requirements, calibration procedures, and test methods. Equipment meeting these standards is required for quality control, certification, and when results must be traceable. Non-compliant equipment may produce valid measurements but won\'t meet certification requirements or be accepted by customers requiring standard compliance.' },
      { question: 'When is automated hardness testing worth the investment?', answer: 'Automated systems are valuable when testing 50+ samples per day, when consistency across operators is critical, or when data export and traceability are required. Automation reduces operator variability, ensures consistent load application, and provides automatic measurement and data recording. Manual systems work well for occasional testing, research applications, or when budget is constrained. Consider your volume, consistency requirements, and need for data management when deciding.' },
    ],
    heroImage: '/images/equipment/hardness testing/rockwell tester/omega-auto-rt/omega-auto-rt-cover.webp',
  },
  'lab-furniture': {
    heroHeadline: 'Lab Furniture',
    heroDescription: 'Workbenches, storage cabinets, fume hoods, and safety equipment for metallography laboratories. Chemical-resistant surfaces and ergonomic designs.',
    useCases: [
      { title: 'Workbenches', description: 'Chemical-resistant surfaces (epoxy resin, stainless steel) for sample preparation. Integrated sinks, electrical outlets, and storage. Heights: 30-36 inches for ergonomic operation.' },
      { title: 'Fume Hoods', description: 'Ventilated enclosures for chemical etching and handling. Airflow: 100-150 fpm face velocity. Sash heights and widths accommodate various sample sizes.' },
      { title: 'Storage', description: 'Cabinets for consumables, tools, and prepared samples. Chemical-resistant materials for corrosive environments. Organized layouts for efficient workflow.' },
    ],
    processDescription: 'Lab furniture provides organized, safe workspaces for metallographic sample preparation. Workbenches require chemical-resistant surfaces (epoxy resin or stainless steel) to withstand acids, bases, and solvents used in etching. Fume hoods provide ventilation for chemical handling and etching operations. Storage solutions organize consumables, tools, and prepared samples. Ergonomic design (30-36 inch bench height) reduces operator fatigue during extended preparation sessions.',
    keySpecifications: [
      'Workbench heights: 30-36 inches',
      'Surface materials: Epoxy resin, stainless steel, or chemical-resistant laminates',
      'Fume hood airflow: 100-150 fpm face velocity',
      'Storage capacity: Varies by cabinet size and configuration',
      'Electrical: GFCI outlets, adequate amperage for equipment',
    ],
    selectionConsiderations: [
      { title: 'Chemical Resistance', description: 'Workbenches must withstand acids, bases, and solvents used in etching. Epoxy resin or stainless steel surfaces provide best chemical resistance.' },
      { title: 'Workflow & Space', description: 'Plan layout for efficient sample flow from sectioning → mounting → grinding → polishing → etching → microscopy. Ensure adequate space for equipment and sample handling.' },
      { title: 'Ventilation Requirements', description: 'Chemical etching operations require fume hoods with 100-150 fpm face velocity. Ensure proper exhaust and make-up air for safe operation.' },
    ],
    faqs: [
      { question: 'What workbench surface material should I choose for a metallography lab?', answer: 'Epoxy resin or stainless steel surfaces provide the best chemical resistance for acids, bases, and solvents used in etching. Epoxy resin is cost-effective and provides excellent chemical resistance. Stainless steel is more durable and easier to clean but more expensive. Avoid standard laminate surfaces as they will degrade from chemical exposure. The surface must withstand nitric acid, nital, picral, and other common etchants without damage.' },
      { question: 'Do I need a fume hood for metallography sample preparation?', answer: 'Fume hoods are essential when using chemical etchants (acids, bases) that produce hazardous vapors. Even with good ventilation, concentrated acids like nitric acid and picric acid require proper containment. Fume hoods should provide 100-150 fpm face velocity and proper exhaust. If you only use mechanical preparation (grinding/polishing) without chemical etching, a fume hood may not be necessary, but most metallography labs require one for safe operation.' },
      { question: 'How much storage space do I need for a metallography lab?', answer: 'Plan storage for consumables (abrasives, polishing cloths, mounting resins), tools (cutting wheels, sample holders), prepared samples, and safety equipment. A well-organized lab needs cabinets for consumables (typically 2-4 linear feet), specimen storage for prepared mounts (1-2 linear feet), and tool storage. Consider both current needs and future growth. Organized storage improves workflow efficiency and reduces time searching for supplies.' },
    ],
    heroImage: '/images/equipment/lab furniture/specimen storage cabinet/specimen-storage-cabinets.webp',
  },
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

export default function EquipmentCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const router = useRouter()
  const [subcategories, setSubcategories] = useState<SubcategoryMetadata[]>([])
  const [featuredItems, setFeaturedItems] = useState<Record<string, Equipment[]>>({})
  const [featuredEquipmentMap, setFeaturedEquipmentMap] = useState<Record<string, Equipment | null>>({})
  const [loading, setLoading] = useState(true)
  const [isCheckingSlug, setIsCheckingSlug] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, check if category is actually an equipment slug (for supported categories check)
        // Check if category matches known categories first
        const knownCategories = ['sectioning', 'mounting', 'grinding-polishing', 'microscopy', 'hardness-testing', 'lab-furniture']
        const isKnownCategory = knownCategories.includes(category)
        
        // If not a known category, check if it's an equipment slug
        if (!isKnownCategory) {
          const supabase = createClient()
          const { data: equipment, error } = await supabase
            .from('equipment')
            .select('category, subcategory, slug')
            .or(`slug.eq.${category},item_id.ilike.${category.toUpperCase()}`)
            .eq('status', 'active')
            .single()

          if (!error && equipment && SUPPORTED_CATEGORIES.includes(equipment.category)) {
            // This is an equipment slug, redirect to the correct path
            const normalizedSubcategory = normalizeSubcategoryForUrl(equipment.category, equipment.subcategory)
            const correctSlug = equipment.slug || category
            if (normalizedSubcategory) {
              router.replace(`/equipment/${equipment.category}/${normalizedSubcategory}/${correctSlug}`)
              return
            } else {
              // No subcategory, redirect to category page
              router.replace(`/equipment/${equipment.category}`)
              return
            }
          } else if (!error && equipment) {
            // Equipment found but not in supported categories, redirect to equipment listing
            router.replace('/equipment')
            return
          } else {
            // Not found, redirect to equipment listing
            router.replace('/equipment')
            return
          }
        }

        setIsCheckingSlug(false)

        // Fetch subcategories for this category
        let subcats = await getSubcategoriesForCategory(category, 'equipment')
        
        // For grinding-polishing, filter out automated and order subcategories: hand-belt, manual, semi-automated, vibratory, controlled-removal
        if (category === 'grinding-polishing') {
          // Remove automated subcategory
          subcats = subcats.filter(subcat => subcat.subcategory_key.toLowerCase() !== 'automated')
          
          const order = ['hand-belt', 'manual', 'semi-automated', 'vibratory', 'controlled-removal']
          subcats = subcats.sort((a, b) => {
            const aIndex = order.indexOf(a.subcategory_key.toLowerCase())
            const bIndex = order.indexOf(b.subcategory_key.toLowerCase())
            // If not found in order, put at end
            if (aIndex === -1 && bIndex === -1) return 0
            if (aIndex === -1) return 1
            if (bIndex === -1) return -1
            return aIndex - bIndex
          })
        }
        
        setSubcategories(subcats)

        // Fetch featured items for each subcategory
        const featured: Record<string, Equipment[]> = {}
        const featuredEquipmentMap: Record<string, Equipment | null> = {}
        
        for (const subcat of subcats) {
          // Normalize subcategory for metadata lookup
          let normalizedSubcategory = subcat.subcategory_key
          if (category === 'mounting') {
            if (subcat.subcategory_key === 'compression' || subcat.subcategory_key === 'compression-mounting') {
              normalizedSubcategory = 'compression'
            } else if (subcat.subcategory_key === 'castable' || subcat.subcategory_key === 'castable-mounting') {
              normalizedSubcategory = 'castable'
            }
          }
          
          // Get metadata to check for featured equipment
          const metadata = await getSubcategoryMetadata(category, normalizedSubcategory, 'equipment')
          const featuredId = metadata?.featured_equipment_id
          
          // Fetch all equipment for the subcategory
          const items = await getFeaturedEquipmentBySubcategory(category, subcat.subcategory_key, 6)
          featured[subcat.subcategory_key] = items
          
          // If there's a featured equipment ID, find that specific equipment
          if (featuredId && items.length > 0) {
            const featuredEq = items.find(eq => eq.id === featuredId)
            if (featuredEq) {
              featuredEquipmentMap[subcat.subcategory_key] = featuredEq
            } else {
              // Featured equipment not in first 6, fetch it separately
              const supabase = createClient()
              const { data } = await supabase
                .from('equipment')
                .select('*')
                .eq('id', featuredId)
                .eq('status', 'active')
                .single()
              if (data) {
                featuredEquipmentMap[subcat.subcategory_key] = data
              }
            }
          } else {
            featuredEquipmentMap[subcat.subcategory_key] = null
          }
        }
        setFeaturedItems(featured)
        setFeaturedEquipmentMap(featuredEquipmentMap)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category])

  const categoryLabel = categoryLabels[category] || category
  const IconComponent = categoryIcons[category] || Package
  const description = categoryDescriptions[category] || 'Browse equipment in this category.'
  const technicalContent = categoryTechnicalContent[category] || {
    heroHeadline: `${categoryLabel} Equipment`,
    heroDescription: description,
    useCases: [],
    processDescription: description,
    keySpecifications: [],
  }

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

  // Generate structured data for SEO and AI bots
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryLabel} Equipment`,
    description: technicalContent.heroDescription,
    url: `https://materialographic.com/equipment/${category}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: subcategories.flatMap((subcat, index) => {
        const items = featuredItems[subcat.subcategory_key] || []
        return items.map((item, itemIndex) => ({
          '@type': 'ListItem',
          position: index * 10 + itemIndex + 1,
          item: {
            '@type': 'Product',
            name: item.name,
            description: item.description,
            identifier: item.item_id,
            image: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined,
            url: `https://materialographic.com/equipment/${category}/${subcat.subcategory_key}/${item.slug || item.item_id?.toLowerCase()}`,
          },
        }))
      }),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section - Full Width with Dark Blue Gradient */}
      <section className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 sm:py-12 md:py-16 mb-12 sm:mb-16 md:mb-20 rounded-b-3xl relative overflow-hidden">
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
          {/* Back Button in Nav Area */}
          <div className="mb-8 sm:mb-10">
            <Link 
              href="/equipment"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Equipment
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
                <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                  {categoryLabel} Equipment
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {technicalContent.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                {technicalContent.heroDescription}
              </p>
              
              {/* Hero CTAs */}
              {category !== 'lab-furniture' && (
                <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                  {technicalContent.guideSlug && (
                    <Link
                      href={`/guides/${technicalContent.guideSlug}`}
                      className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-white/20 whitespace-nowrap"
                    >
                      <BookOpen className="w-5 h-5 flex-shrink-0" />
                      <span>{technicalContent.guideTitle || 'Guide'}</span>
                    </Link>
                  )}
                  {category === 'grinding-polishing' && (
                    <>
                      <Link
                        href="/guides/grinding-techniques"
                        className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-white/20 whitespace-nowrap"
                      >
                        <BookOpen className="w-5 h-5 flex-shrink-0" />
                        <span>Grinding Techniques</span>
                      </Link>
                      <Link
                        href="/guides/polishing-methods"
                        className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-white/20 whitespace-nowrap"
                      >
                        <BookOpen className="w-5 h-5 flex-shrink-0" />
                        <span>Polishing Methods</span>
                      </Link>
                    </>
                  )}
                  <Link
                    href={
                      category === 'sectioning' 
                        ? "https://shop.metallographic.com/collections/cutting"
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
                  <a
                    href="#equipment-section"
                    className="bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-full font-semibold hover:bg-white/20 hover:text-white transition-all inline-flex items-center justify-center gap-2 border-2 border-white/30 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    <span>Browse Equipment</span>
                    <ChevronsDown className="w-5 h-5 flex-shrink-0 animate-bounce" />
                  </a>
                </div>
              )}
            </div>
            
            {/* Hero Image */}
            {technicalContent.heroImage && (
              <div className={`relative w-full rounded-lg overflow-hidden p-4 sm:p-6 ${category === 'lab-furniture' ? 'h-48 sm:h-56 lg:h-64' : 'h-64 sm:h-80 lg:h-96'}`}>
                <Image
                  src={technicalContent.heroImage}
                  alt={`${categoryLabel} equipment example`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container-custom">

        {/* Lab Furniture Gallery */}
        {category === 'lab-furniture' && (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Lab Furniture Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="group card hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <Image
                    src="/images/equipment/lab furniture/lab equip benches/lab-equipment-benches.webp"
                    alt="Lab Equipment Benches"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Lab Equipment Benches</h3>
                  <p className="text-sm text-gray-600">Chemical-resistant workbenches designed for metallographic sample preparation with integrated storage and electrical outlets.</p>
                </div>
              </div>

              <div className="group card hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <Image
                    src="/images/equipment/lab furniture/microscope benches/microscope-benches.webp"
                    alt="Microscope Benches"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Microscope Benches</h3>
                  <p className="text-sm text-gray-600">Specialized benches designed for microscope placement with vibration isolation and ergonomic height adjustment.</p>
                </div>
              </div>

              <div className="group card hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <Image
                    src="/images/equipment/lab furniture/mega cutter bench/mega-bench.webp"
                    alt="Mega Cutter Bench"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Mega Cutter Bench</h3>
                  <p className="text-sm text-gray-600">Heavy-duty workbench designed specifically for large sectioning equipment with reinforced structure and ample workspace.</p>
                </div>
              </div>

              <div className="group card hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <Image
                    src="/images/equipment/lab furniture/safety cabinets/safety-cabinets.webp"
                    alt="Safety Cabinets"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Safety Cabinets</h3>
                  <p className="text-sm text-gray-600">Chemical storage cabinets with fire-resistant construction and proper ventilation for safe storage of hazardous materials.</p>
                </div>
              </div>

              <div className="group card hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <Image
                    src="/images/equipment/lab furniture/specimen storage cabinet/specimen-storage-cabinets.webp"
                    alt="Specimen Storage Cabinets"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Specimen Storage Cabinets</h3>
                  <p className="text-sm text-gray-600">Organized storage solutions for prepared samples with labeled compartments and protection from environmental factors.</p>
                </div>
              </div>

              <div className="group card hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <Image
                    src="/images/equipment/lab furniture/fume hood/fume-hood.webp"
                    alt="Fume Hood"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Fume Hood</h3>
                  <p className="text-sm text-gray-600">Ventilated enclosures for safe chemical handling and etching operations with proper airflow and sash controls.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Subcategory Cards Grid */}
        {subcategories.length > 0 && category !== 'lab-furniture' ? (
          <section id="equipment-section" className="mb-12 sm:mb-16 md:mb-20 scroll-mt-24">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{categoryLabel} Equipment</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {subcategories.map((subcat, subcatIndex) => {
                const items = featuredItems[subcat.subcategory_key] || []
                // Create anchor ID from subcategory key
                const anchorId = subcat.subcategory_key.toLowerCase().replace(/\s+/g, '-')
                
                // Find matching use case for this subcategory
                let matchingUseCase = technicalContent.useCases.find(uc => uc.anchor === anchorId)
                
                // Special handling for sectioning subcategories
                // For sectioning, "automated" and "manual" subcategories are abrasive sectioning
                if (category === 'sectioning' && !matchingUseCase) {
                  const subcatKey = subcat.subcategory_key.toLowerCase()
                  if (subcatKey === 'manual' || anchorId === 'manual') {
                    matchingUseCase = technicalContent.useCases.find(uc => uc.anchor === 'manual-abrasive')
                  } else if (subcatKey === 'automated' || subcatKey === 'automatic' || anchorId === 'automated' || anchorId === 'automatic') {
                    matchingUseCase = technicalContent.useCases.find(uc => uc.anchor === 'automated-abrasive')
                  } else if ((subcatKey.includes('manual') || anchorId.includes('manual')) && 
                             (subcatKey.includes('abrasive') || anchorId.includes('abrasive'))) {
                    matchingUseCase = technicalContent.useCases.find(uc => uc.anchor === 'manual-abrasive')
                  } else if ((subcatKey.includes('automated') || subcatKey.includes('automatic') || anchorId.includes('automated') || anchorId.includes('automatic')) && 
                             (subcatKey.includes('abrasive') || anchorId.includes('abrasive'))) {
                    matchingUseCase = technicalContent.useCases.find(uc => uc.anchor === 'automated-abrasive')
                  }
                }
                
                // Use use case title and description if available, otherwise fall back to subcategory metadata
                const displayTitle = matchingUseCase?.title || subcat.subcategory_label
                const displayDescription = matchingUseCase?.description || subcat.description || `Browse ${subcat.subcategory_label.toLowerCase()} equipment.`
                
                // Get cover image - use featured equipment if available, otherwise first item
                const featuredEquipment = featuredEquipmentMap[subcat.subcategory_key]
                const imageSource = featuredEquipment || (items.length > 0 ? items[0] : null)
                const coverImage = imageSource && imageSource.image_url
                  ? getEquipmentImageUrl(imageSource.image_url) || imageSource.image_url
                  : null
                
                return (
                  <AnimatedCard key={subcat.id} index={subcatIndex} animation="fadeInUp" duration={500}>
                    <div 
                      id={anchorId}
                      className="card hover:border-primary-400 hover:shadow-lg group overflow-hidden h-full flex flex-col transition-all duration-300 scroll-mt-24"
                    >
                      {/* Cover Image */}
                      {coverImage && (
                        <Link href={`/equipment/${category}/${subcat.subcategory_key}`} className="block">
                          <div className="relative w-full h-48 sm:h-56 mb-4 rounded-lg overflow-hidden bg-white p-2 sm:p-3">
                            <Image
                              src={coverImage}
                              alt={displayTitle}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        </Link>
                      )}

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <Link 
                          href={`/equipment/${category}/${subcat.subcategory_key}`} 
                          className="flex items-center gap-2 mb-2 group/title"
                        >
                          <IconComponent className="w-5 h-5 text-primary-600 flex-shrink-0" />
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover/title:text-primary-600 transition-colors">
                            {displayTitle}
                          </h3>
                        </Link>
                        
                        <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow leading-relaxed">
                          {displayDescription}
                        </p>

                        {/* Learn More Link */}
                        <div className="mt-auto pt-3 border-t border-gray-200">
                          <Link 
                            href={`/equipment/${category}/${subcat.subcategory_key}`}
                            className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            View Equipment
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                )
              })}
            </div>
          </section>
        ) : category !== 'lab-furniture' ? (
          <section className="mb-12 sm:mb-16">
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">No subcategories found for this category.</p>
            </div>
          </section>
        ) : null}

        {/* Process Information Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Process Overview</h2>
              <div className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 space-y-4">
                {technicalContent.processDescription.split('\n\n').map((paragraph, index) => {
                  // Check if paragraph starts with ** for bold heading
                  const isBoldHeading = paragraph.startsWith('**') && paragraph.includes('**');
                  if (isBoldHeading) {
                    const parts = paragraph.split('**');
                    return (
                      <p key={index}>
                        <strong className="text-gray-900">{parts[1]}</strong>
                        {parts.slice(2).join('')}
                      </p>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
              {technicalContent.guideSlug && (
                <Link
                  href={`/guides/${technicalContent.guideSlug}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Detailed {technicalContent.guideTitle || 'guide'}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
            
            {/* Selection Considerations */}
            {technicalContent.selectionConsiderations && technicalContent.selectionConsiderations.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">What to Consider When Choosing</h2>
                <div className="space-y-4">
                  {technicalContent.selectionConsiderations.map((consideration, index) => (
                    <div key={index} className="border-l-4 border-primary-600 pl-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{consideration.title}</h3>
                      <p className="text-gray-700">{consideration.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Process Image */}
          {technicalContent.processImage && (
            <div className="mt-8 relative w-full h-80 sm:h-96 md:h-[500px] rounded-lg overflow-hidden p-2 sm:p-4">
              <Image
                src={technicalContent.processImage}
                alt={`${categoryLabel} process illustration`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          )}
        </section>

        {/* FAQ Section */}
        {technicalContent.faqs && technicalContent.faqs.length > 0 && (
          <section className="mb-12 sm:mb-16 md:mb-20">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600">
                  Common questions about {categoryLabel.toLowerCase()} equipment selection
                </p>
              </div>
              <FAQAccordion items={technicalContent.faqs} />
            </div>
          </section>
        )}

        {/* Bottom CTA Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-10 md:p-16 text-center text-white shadow-2xl overflow-hidden">
          {/* Decorative hexagon background elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0"
              viewBox="0 0 1200 400"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Top right hexagon */}
              <polygon
                points="1000,40 1080,80 1080,160 1000,200 920,160 920,80"
                fill="white"
                opacity="0.6"
              />
              {/* Bottom left hexagon */}
              <polygon
                points="80,200 160,240 160,320 80,360 0,320 0,240"
                fill="white"
                opacity="0.5"
              />
              {/* Center hexagon */}
              <polygon
                points="500,100 580,140 580,220 500,260 420,220 420,140"
                fill="white"
                opacity="0.4"
              />
              {/* Top left hexagon */}
              <polygon
                points="200,60 280,100 280,180 200,220 120,180 120,100"
                fill="white"
                opacity="0.5"
              />
              {/* Bottom right hexagon */}
              <polygon
                points="900,240 980,280 980,360 900,400 820,360 820,280"
                fill="white"
                opacity="0.4"
              />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              {categoryLabel} Resources
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/95 leading-relaxed">
              Browse equipment specifications, request quotes, or access detailed preparation guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-4xl mx-auto">
              {category !== 'lab-furniture' && (
                <Link
                  href={
                    category === 'sectioning'
                      ? "https://shop.metallographic.com/collections/cutting"
                      : category === 'grinding-polishing'
                      ? "https://shop.metallographic.com/collections/polishing"
                      : `https://shop.metallographic.com/collections/${category}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Shop Consumables
                </Link>
              )}
              <Link
                href="/quote"
                className="group bg-white/10 backdrop-blur-sm text-white hover:text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
              >
                Request Quote
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {technicalContent.guideSlug && (
                <Link
                  href={`/guides/${technicalContent.guideSlug}`}
                  className="group bg-white/10 backdrop-blur-sm text-white hover:text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] text-base"
                >
                  <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {technicalContent.guideTitle || 'Guide'}
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

