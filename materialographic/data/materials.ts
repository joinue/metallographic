export interface Material {
  id: string
  name: string
  category: string
  hardness?: string
  composition: string
  microstructure: string
  heatTreatment?: string
  specialNotes?: string
  commonEtchants?: string[]
  preparationNotes?: string
}

export const materials: Material[] = [
  {
    id: 'ti-grade-5',
    name: 'Titanium Grade 5 (Ti-6Al-4V)',
    category: 'Titanium Alloy',
    hardness: '36 HB',
    composition: '6% Al, 4% V, balance Ti',
    microstructure: 'α+β phase',
    heatTreatment: 'Solution treated and aged',
    specialNotes: 'High strength-to-weight ratio, excellent corrosion resistance. Use Kroll\'s reagent (2ml HF, 4ml HNO3, 94ml H2O) for 5-10 seconds.',
    commonEtchants: ['Kroll\'s reagent', 'Keller\'s reagent'],
    preparationNotes: 'Requires careful polishing to avoid smearing. Use low pressure during grinding and polishing stages.',
  },
  {
    id: 'ss-304',
    name: 'Stainless Steel 304',
    category: 'Austenitic Stainless Steel',
    hardness: '123 HB',
    composition: '18% Cr, 8% Ni, balance Fe',
    microstructure: 'Austenitic',
    heatTreatment: 'Annealed',
    specialNotes: 'Most common stainless steel. Non-magnetic, excellent corrosion resistance.',
    commonEtchants: ['Glyceregia', 'Aqua regia', 'Electrolytic (10% oxalic acid)'],
    preparationNotes: 'Standard preparation procedures work well. Can be etched with multiple reagents.',
  },
  {
    id: 'ss-316',
    name: 'Stainless Steel 316',
    category: 'Austenitic Stainless Steel',
    hardness: '149 HB',
    composition: '16-18% Cr, 10-14% Ni, 2-3% Mo, balance Fe',
    microstructure: 'Austenitic',
    heatTreatment: 'Annealed',
    specialNotes: 'Superior corrosion resistance compared to 304 due to molybdenum addition.',
    commonEtchants: ['Glyceregia', 'Aqua regia', 'Electrolytic (10% oxalic acid)'],
  },
  {
    id: 'ss-431',
    name: 'Stainless Steel 431',
    category: 'Martensitic Stainless Steel',
    hardness: '241-302 HB',
    composition: '15-17% Cr, 1.25-2.5% Ni, balance Fe',
    microstructure: 'Martensitic',
    heatTreatment: 'Quenched and tempered',
    specialNotes: 'High strength, magnetic. Used in applications requiring high strength and moderate corrosion resistance.',
    commonEtchants: ['Kallings no. 2', 'Vilella\'s reagent'],
  },
  {
    id: 'al-6061',
    name: 'Aluminum 6061',
    category: 'Aluminum Alloy',
    hardness: '95 HB',
    composition: '0.8-1.2% Mg, 0.4-0.8% Si, 0.15-0.4% Cu, balance Al',
    microstructure: 'Precipitation hardened',
    heatTreatment: 'T6 (Solution heat treated and artificially aged)',
    specialNotes: 'Most common aluminum alloy. Good machinability and weldability.',
    commonEtchants: ['Keller\'s reagent', 'Weck\'s reagent'],
    preparationNotes: 'Soft material - use low pressure to avoid smearing. May require longer polishing times.',
  },
  {
    id: 'al-7075',
    name: 'Aluminum 7075',
    category: 'Aluminum Alloy',
    hardness: '150 HB',
    composition: '5.1-6.1% Zn, 2.1-2.9% Mg, 1.2-2.0% Cu, balance Al',
    microstructure: 'Precipitation hardened',
    heatTreatment: 'T6 (Solution heat treated and artificially aged)',
    specialNotes: 'High strength aluminum alloy. Used in aerospace applications.',
    commonEtchants: ['Keller\'s reagent', 'Weck\'s reagent'],
  },
  {
    id: 'copper-c101',
    name: 'Copper C101 (Oxygen-Free)',
    category: 'Copper',
    hardness: '40-50 HB',
    composition: '99.99% Cu',
    microstructure: 'Equiaxed grains',
    heatTreatment: 'Annealed',
    specialNotes: 'High electrical conductivity. Soft material requiring careful preparation.',
    commonEtchants: ['Ammonium persulfate', 'Ferric chloride'],
    preparationNotes: 'Very soft - use minimal pressure. Diamond polishing recommended.',
  },
  {
    id: 'brass-c360',
    name: 'Brass C360 (Free-Cutting)',
    category: 'Copper Alloy',
    hardness: '78 HB',
    composition: '60% Cu, 3.5% Pb, balance Zn',
    microstructure: 'α+β phase',
    heatTreatment: 'As-cast or cold worked',
    specialNotes: 'Excellent machinability due to lead content.',
    commonEtchants: ['Ammonium persulfate', 'Ferric chloride'],
  },
  {
    id: 'carbon-steel-1018',
    name: 'Carbon Steel 1018',
    category: 'Low Carbon Steel',
    hardness: '126 HB',
    composition: '0.15-0.20% C, balance Fe',
    microstructure: 'Ferrite + Pearlite',
    heatTreatment: 'Normalized or annealed',
    specialNotes: 'Common low carbon steel. Good weldability and formability.',
    commonEtchants: ['Nital (2-5%)', 'Picral'],
  },
  {
    id: 'carbon-steel-1045',
    name: 'Carbon Steel 1045',
    category: 'Medium Carbon Steel',
    hardness: '163 HB',
    composition: '0.43-0.50% C, balance Fe',
    microstructure: 'Ferrite + Pearlite',
    heatTreatment: 'Normalized or quenched and tempered',
    specialNotes: 'Medium carbon steel with good strength and toughness balance.',
    commonEtchants: ['Nital (2-5%)', 'Picral'],
  },
  {
    id: 'inconel-718',
    name: 'Inconel 718',
    category: 'Nickel Superalloy',
    hardness: '330-360 HB',
    composition: '50-55% Ni, 17-21% Cr, 4.75-5.5% Nb, 2.8-3.3% Mo, balance Fe',
    microstructure: 'γ matrix with γ\' and γ\'\' precipitates',
    heatTreatment: 'Solution treated and aged',
    specialNotes: 'High temperature superalloy. Excellent strength at elevated temperatures.',
    commonEtchants: ['Glyceregia', 'Kalling\'s no. 2'],
    preparationNotes: 'Hard material - may require longer grinding times. Diamond polishing essential.',
  },
  {
    id: 'hastelloy-c276',
    name: 'Hastelloy C-276',
    category: 'Nickel Alloy',
    hardness: '210 HB',
    composition: '57% Ni, 15.5% Mo, 16% Cr, 5.5% Fe, 4% W',
    microstructure: 'Austenitic',
    heatTreatment: 'Solution annealed',
    specialNotes: 'Excellent corrosion resistance in harsh environments.',
    commonEtchants: ['Glyceregia', 'Aqua regia'],
  },
]

export function getMaterialById(id: string): Material | undefined {
  return materials.find(m => m.id === id)
}

export function getMaterialsByCategory(category: string): Material[] {
  return materials.filter(m => m.category === category)
}

export function searchMaterials(query: string): Material[] {
  const searchTerm = query.toLowerCase()
  return materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm) ||
    m.category.toLowerCase().includes(searchTerm) ||
    m.composition.toLowerCase().includes(searchTerm) ||
    m.microstructure.toLowerCase().includes(searchTerm)
  )
}

