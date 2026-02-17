/**
 * Adds 4 AM (Additive Manufacturing) specific materials to materials_rows.csv
 * Materials: AM Ti-6Al-4V, AM Inconel 718, AM 316L Stainless Steel, AM AlSi10Mg
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CSV_PATH = path.join(__dirname, '..', 'materials_rows.csv');

function uuid() {
  return crypto.randomUUID();
}

// Escape a CSV field: wrap in quotes if it contains commas, quotes, or newlines
function csvField(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function csvRow(obj, headers) {
  return headers.map(h => csvField(obj[h] || '')).join(',');
}

// Read existing CSV to get headers
const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
const firstLine = csvContent.split('\n')[0];
// Parse headers properly
const headers = [];
let inQuote = false;
let field = '';
for (const ch of firstLine) {
  if (ch === '"') { inQuote = !inQuote; }
  else if (ch === ',' && !inQuote) { headers.push(field.trim()); field = ''; }
  else { field += ch; }
}
headers.push(field.trim());

console.log(`Found ${headers.length} headers`);

// ========================================
// MATERIAL DEFINITIONS
// ========================================

const materials = [

// 1. AM Ti-6Al-4V (SLM/EBM)
{
  id: uuid(),
  name: 'AM Ti-6Al-4V (SLM/EBM)',
  slug: 'am-ti-6al-4v',
  category: 'Titanium Alloy',
  class: '6',
  alternative_names: '[AM Ti64,Additive Ti-6Al-4V,3D Printed Ti-6Al-4V,L-PBF Ti-6Al-4V,SLM Ti64,EBM Ti64]',
  tags: '[additive-manufacturing,SLM,EBM,L-PBF,titanium]',
  hardness: '36-42 HRC',
  hardness_hb: '336',
  hardness_hrc: '36-42',
  hardness_hv: '350',
  density: '4.43',
  melting_point_celsius: '1660',
  tensile_strength_mpa: '1050',
  yield_strength_mpa: '950',
  composition: 'Ti-6Al-4V (ASTM F3001 / F2924)',
  microstructure: 'SLM: acicular alpha-prime martensite within columnar prior-beta grains oriented along build direction. EBM: alpha+beta Widmanstatten laths within columnar prior-beta grains. Melt pool boundaries visible in as-built condition. Epitaxial grain growth across build layers.',
  material_type: 'alloy',
  hardness_category: 'hard',
  work_hardening: 'FALSE',
  magnetic: 'FALSE',
  corrosion_resistance: 'high',
  heat_treatment: 'Stress relief (600-650C), HIP (920C/100MPa), Solution treat + age (950C/1h WQ + 540C/4h AC)',
  annealing_temperature_celsius: '700',
  solution_treatment_temp_celsius: '950',
  aging_temperature_celsius: '540',
  special_notes: 'AM Ti-6Al-4V has dramatically different microstructures depending on the process (SLM vs EBM), build parameters (laser power, scan speed, hatch spacing, layer thickness), and post-processing (as-built, stress relieved, HIP, solution treated + aged). SLM produces rapid cooling rates (10^3 to 10^6 K/s) yielding metastable alpha-prime martensite, while EBM builds at elevated temperature (~700C) allowing in-situ decomposition to alpha+beta. Build orientation must always be documented: XY (perpendicular to build), XZ (parallel to build along scan), and ZX (parallel to build across scan) cross-sections reveal different features. Porosity should be characterized before etching: lack-of-fusion pores (irregular, aligned between layers), keyhole pores (spherical, from excessive energy density), and gas porosity (small spherical, from powder feedstock).',
  preparation_notes: 'AM Ti-6Al-4V is a hard (36-42 HRC, ~350 HV) titanium alloy produced by laser or electron beam powder bed fusion. The microstructure is fundamentally different from wrought Ti-6Al-4V due to the rapid layer-by-layer solidification process. Columnar prior-beta grains grow epitaxially across multiple build layers, oriented along the thermal gradient (typically parallel to the build direction). Within these columnar grains, the fine-scale alpha morphology depends on cooling rate and thermal history. SLM (laser) produces fine acicular alpha-prime martensite in the as-built condition; EBM (electron beam) produces alpha+beta Widmanstatten structure due to the elevated build chamber temperature. Melt pool boundaries, visible as arc-shaped etching contrast lines, are a key feature unique to AM material. Build orientation relative to the cross-section plane must always be recorded, as the microstructure is highly anisotropic. Before etching, examine the as-polished surface to characterize porosity type and distribution: lack-of-fusion (irregular shape, often between layers), keyhole (spherical, from excess energy), and gas porosity (small spherical, from powder feedstock). Titanium is reactive and prone to contamination; avoid contact with iron-containing tools and media.',
  sectioning_notes: 'Use a precision abrasive cut-off saw with an alumina (Al2O3) blade designed for titanium and reactive metals. SiC blades can also be used. Apply generous coolant flow to prevent overheating, which can cause alpha-case formation on the cut surface. Cutting speed: 200-300 RPM with moderate feed rate. AM Ti-6Al-4V is slightly harder than wrought due to the martensitic (SLM) or fine Widmanstatten (EBM) structure. For build characterization, take cross-sections in multiple orientations: XY plane (perpendicular to build direction) reveals melt pool geometry and scan strategy; XZ or ZX planes (parallel to build direction) reveal columnar prior-beta grains, layer bands, and epitaxial growth. Leave 2-3 mm allowance for grinding to remove the heat-affected zone from cutting. Label each section with its orientation relative to the build direction.',
  mounting_notes: 'Cold mounting with castable epoxy is preferred to avoid any thermal effects on the metastable martensitic structure (SLM material). The high melting point (1660C) means hot compression mounting at 150-180C will not melt the sample, but SLM alpha-prime martensite can begin to decompose above ~400C, so standard compression mounting is acceptable from a thermal standpoint. However, cold mounting with low-shrinkage epoxy provides better edge retention for examining the as-built surface roughness and near-surface porosity. For porosity analysis, vacuum impregnation with fluorescent epoxy is strongly recommended; this fills all connected porosity and allows quantitative porosity measurement. Edge-retaining mounting compounds are essential when examining the AM surface condition or surface-connected defects.',
  grinding_notes: 'AM Ti-6Al-4V is hard (36-42 HRC) and requires appropriate grinding media. Use SiC papers or diamond grinding discs with water lubrication. Disc speed: 250-300 RPM. Apply moderate pressure (25-35 N per 30 mm sample). Titanium is prone to smearing, so use fresh, sharp abrasives and avoid excessive pressure which embeds abrasive particles. For SLM material, the fine martensitic structure resists scratching but is prone to subsurface deformation. For EBM material, the coarser alpha+beta is slightly easier to grind.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>120 grit SiC:</strong> Remove sectioning damage and heat-affected zone (30-60 seconds). Moderate pressure. Remove enough material to eliminate any alpha-case from cutting.</li><li><strong>240 grit SiC:</strong> Remove previous scratches (30-45 seconds). Ensure all 120-grit scratches are removed.</li><li><strong>320 grit SiC:</strong> Further refinement (20-40 seconds). Rotate specimen 90 degrees.</li><li><strong>400 grit SiC:</strong> Continue refinement (20-40 seconds). Fresh paper essential.</li><li><strong>600 grit SiC:</strong> Final grinding step (20-40 seconds). Ensure uniform scratch pattern.</li></ul>Rotate specimen 90 degrees between each step. Use complementary rotation. Water lubrication must be continuous; titanium smears readily on dry or worn papers. Ultrasonic cleaning between steps is recommended to remove embedded abrasive particles. For as-built surfaces with significant roughness, start at 80 or 120 grit and allow extra grinding time to establish a flat plane.',
  polishing_notes: 'Titanium requires careful polishing to avoid smearing the soft alpha phase. Use napless or low-nap cloths with diamond suspensions.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>9 micrometer diamond:</strong> 3-5 minutes on a napless synthetic pad with moderate pressure (20-30 N per 30 mm sample). Use oil-based diamond suspension for titanium (water-based can cause staining).</li><li><strong>3 micrometer diamond:</strong> 3-5 minutes on a napless synthetic pad with moderate pressure (15-25 N). Continue using oil-based lubricant.</li><li><strong>1 micrometer diamond:</strong> 2-3 minutes on a short-nap pad with light pressure (12-20 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05 micrometer colloidal silica:</strong> 2-4 minutes on a soft chemical-mechanical polishing pad with light pressure. Colloidal silica provides both mechanical and chemical action on titanium, producing excellent surface quality. Alternatively, a mixture of colloidal silica with 10% H2O2 enhances the chemical-mechanical action. Vibratory polishing with colloidal silica for 4-8 hours gives the best results for revealing fine AM microstructural features (melt pool boundaries, alpha lath orientation).</li></ul>For porosity analysis, stop before final polishing (after 1 micrometer diamond) and image the as-polished surface. Over-polishing can round pore edges and reduce measured porosity. For microstructural analysis, the full polishing sequence through colloidal silica is required.',
  etching_notes: 'AM Ti-6Al-4V responds to standard titanium etchants, but the unique AM microstructural features (melt pool boundaries, columnar prior-beta grains, layer bands) require careful etching technique. Always examine the as-polished surface first for porosity characterization.<br /><br /><strong>Kroll\'s Reagent (Chemical Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 1-3 ml HF, 2-6 ml HNO3, 100 ml H2O</li><li><strong>Application:</strong> Immerse or swab for 5-15 seconds. Start with short times (5 seconds) and increase gradually. AM microstructures can etch differently than wrought.</li><li><strong>Reveals:</strong> Alpha-prime martensite needles (SLM), alpha+beta Widmanstatten laths (EBM), prior-beta grain boundaries, melt pool boundaries (as arc-shaped contrast lines), and layer bands. The columnar prior-beta grains appear as elongated grains parallel to the build direction in XZ/ZX cross-sections.</li><li><strong>Rinse:</strong> Water, then ethanol. Dry with warm air.</li></ul><strong>Polarized Light Microscopy</strong> - Complementary technique:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Application:</strong> After light etching with Kroll\'s (3-5 seconds), examine under polarized light with a sensitive tint plate.</li><li><strong>Reveals:</strong> Prior-beta grain orientation and morphology with color contrast. Columnar grains sharing the same crystallographic orientation appear as the same color. Excellent for visualizing the extent of epitaxial growth across build layers. Also reveals grain texture (preferred orientation) inherent in AM builds.</li></ul><strong>10% HF in Water (Chemical Etching)</strong> - For stronger contrast:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 ml HF, 90 ml H2O</li><li><strong>Application:</strong> Immerse for 3-10 seconds. More aggressive than Kroll\'s.</li><li><strong>Reveals:</strong> Stronger contrast of melt pool boundaries and prior-beta grain boundaries. Useful when Kroll\'s does not provide sufficient contrast.</li></ul><strong>AM-specific etching strategy:</strong> For melt pool boundary revelation, a light etch (3-5 seconds Kroll\'s) is often sufficient; over-etching obscures the subtle melt pool contrast. For prior-beta grain boundary mapping, a slightly longer etch (10-15 seconds) or successive short etches may be needed. Different etch times may be required for SLM vs EBM material due to the different phase compositions.<br /><br /><strong>Safety:</strong> HF is extremely dangerous. Use full PPE including face shield, HF-resistant gloves, and lab coat. Work in a fume hood. Have calcium gluconate gel available for emergency treatment of HF burns.',
  recommended_grinding_sequence: '[120,240,320,400,600]',
  recommended_polishing_sequence: '[9\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[Kroll\'s Reagent,10% HF]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM F3001,ASTM F2924,ASTM E3166]',
  iso_standards: '[ISO/ASTM 52904]',
  related_guide_slugs: '[additive-manufacturing-preparation,titanium-preparation,aerospace-applications]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Aerospace structural components,Patient-specific medical implants,Turbine blades,Lattice structures,Topology-optimized brackets]',
  typical_uses: '[Aircraft brackets,Spinal fusion cages,Hip acetabular cups,Turbine blade repair,Drone structural parts]',
  detailed_description: 'Additively manufactured Ti-6Al-4V produced by selective laser melting (SLM) or electron beam melting (EBM). The rapid layer-by-layer solidification produces columnar prior-beta grains with fine alpha-prime martensite (SLM) or alpha+beta Widmanstatten (EBM) internal structure, fundamentally different from wrought Ti-6Al-4V. Melt pool boundaries, epitaxial grain growth, and AM-specific porosity types are key microstructural features requiring distinct preparation and characterization approaches.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '190',
  view_count: '0',
  save_count: '0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preparation_difficulty: 'hard',
  estimated_sectioning_time_minutes: '',
  estimated_mounting_time_minutes: '',
  estimated_grinding_time_minutes: '',
  estimated_polishing_time_minutes: '',
  estimated_etching_time_minutes: '',
  total_preparation_time_minutes: '',
  common_issues: '',
  troubleshooting_notes: '',
  success_criteria: '',
  quality_indicators: '',
  material_grade: '',
  temper_condition: '',
  parent_material_id: '',
  microstructure_images: '',
  preparation_step_images: ''
},

// 2. AM INCONEL 718 (SLM)
{
  id: uuid(),
  name: 'AM Inconel 718 (SLM)',
  slug: 'am-inconel-718',
  category: 'Nickel Alloy',
  class: '6',
  alternative_names: '[AM IN718,Additive Inconel 718,3D Printed IN718,L-PBF IN718,SLM Inconel 718,AM Alloy 718]',
  tags: '[additive-manufacturing,SLM,L-PBF,superalloy]',
  hardness: '38-44 HRC (as-built)',
  hardness_hb: '363',
  hardness_hrc: '38-44',
  hardness_hv: '380',
  density: '8.19',
  melting_point_celsius: '1336',
  tensile_strength_mpa: '1100',
  yield_strength_mpa: '900',
  composition: 'Ni-19Cr-18Fe-5.1Nb-3Mo-0.9Ti-0.5Al (UNS N07718)',
  microstructure: 'Columnar dendritic solidification structure with Laves phase and NbC carbides in interdendritic regions. Melt pool boundaries delineated by changes in dendrite orientation. Significant Nb and Mo microsegregation in as-built condition. After homogenization and aging, gamma-prime (Ni3(Al,Ti)) and gamma-double-prime (Ni3Nb) strengthening precipitates form.',
  material_type: 'alloy',
  hardness_category: 'hard',
  work_hardening: 'TRUE',
  magnetic: 'FALSE',
  corrosion_resistance: 'high',
  heat_treatment: 'Stress relief (1065C/1h), Homogenization (1080-1180C/1-2h), Direct aging (720C/8h FC to 620C/8h AC), AMS 5663 standard HT',
  annealing_temperature_celsius: '1065',
  solution_treatment_temp_celsius: '1080',
  aging_temperature_celsius: '720',
  special_notes: 'AM IN718 exhibits significant microsegregation of Nb and Mo into interdendritic regions during rapid solidification, promoting Laves phase ((Ni,Cr,Fe)2(Nb,Mo,Ti)) and NbC carbide formation. Laves phase is detrimental to mechanical properties and must be dissolved by homogenization heat treatment. The columnar dendritic structure grows epitaxially across melt pool boundaries and build layers, creating strong crystallographic texture (often <001> along build direction). As-built vs heat-treated conditions produce dramatically different microstructures: as-built shows dendrites, Laves, and microsegregation; homogenized + aged shows equiaxed or partially recrystallized grains with gamma-prime/gamma-double-prime precipitates (visible only by SEM/TEM). Build orientation affects mechanical properties due to the columnar grain structure and crystallographic texture. Porosity types: lack-of-fusion (irregular, oriented between layers), keyhole (spherical), gas porosity (small spherical from powder atomization gas). Document build orientation for all cross-sections.',
  preparation_notes: 'AM Inconel 718 is a hard (38-44 HRC as-built, ~380 HV), work-hardening nickel superalloy produced by selective laser melting. The microstructure features columnar dendrites oriented along the build direction, with interdendritic Laves phase and NbC carbides that are unique to the AM solidification process. Melt pool boundaries appear as arc-shaped contrast lines where dendrite growth direction changes. The material work-hardens during grinding, requiring sharp abrasives and moderate pressures. The as-built condition shows strong microsegregation (Nb, Mo enrichment in interdendritic regions); after homogenization heat treatment, the Laves phase dissolves and subsequent aging produces gamma-prime and gamma-double-prime strengthening precipitates. Preparation approach differs between as-built and heat-treated conditions: as-built is slightly softer but has harder Laves phase particles causing relief; heat-treated is uniformly harder but more homogeneous. Always characterize porosity on the as-polished surface before etching. Build orientation relative to the cross-section must be documented.',
  sectioning_notes: 'Use an abrasive cut-off saw with an alumina (Al2O3) blade designed for nickel alloys. SiC blades will dull quickly on this work-hardening alloy. Apply generous coolant flow. Cutting speed: 200-300 RPM with moderate, steady feed rate. Do not pause or dwell during cutting, as IN718 work-hardens rapidly and a hardened layer will accelerate blade wear. For AM build characterization, section in multiple orientations: XY plane (perpendicular to build) reveals melt pool geometry, scan strategy, and laser track overlap; XZ or ZX planes (parallel to build) reveal columnar dendritic structure, epitaxial growth, and layer banding. Leave 2-3 mm allowance for grinding away the deformed and heat-affected cutting zone. Precision diamond wafering saws also work well at 100-200 RPM with light load.',
  mounting_notes: 'Both cold and hot compression mounting are acceptable. The high melting point (1336C) and thermal stability of IN718 mean that compression mounting at 150-180C will not alter the microstructure, even in the as-built condition. Hot compression mounting with phenolic or epoxy-phenolic resin is convenient and provides good edge retention. Cold mounting with low-shrinkage epoxy is preferred when examining as-built surface roughness or near-surface defects. For porosity analysis, vacuum impregnation with fluorescent epoxy is recommended to fill and highlight all porosity (connected and surface-breaking). Edge-retaining mounts are essential for examining the AM surface condition and near-surface microstructure.',
  grinding_notes: 'AM IN718 is hard (38-44 HRC) and work-hardens significantly during grinding. Use fresh, sharp SiC papers or rigid diamond grinding discs. Disc speed: 250-300 RPM. Apply moderate, consistent pressure (25-35 N per 30 mm sample). Do not use excessive pressure; the work-hardening effect increases surface hardness and creates deeper subsurface deformation that is difficult to remove in subsequent steps. Use contra-rotation (platen and holder in opposite directions) which is more aggressive and reduces work hardening compared to complementary rotation for this alloy.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>120 grit SiC:</strong> Remove sectioning damage (30-60 seconds). Moderate, consistent pressure. Do not dwell.</li><li><strong>240 grit SiC:</strong> Remove previous scratches (30-45 seconds). Fresh paper essential for this work-hardening alloy.</li><li><strong>320 grit SiC:</strong> Refinement (20-40 seconds). Rotate specimen 90 degrees.</li><li><strong>400 grit SiC:</strong> Continue refinement (20-40 seconds).</li><li><strong>600 grit SiC:</strong> Final grinding step (20-40 seconds). Ensure uniform scratch pattern with no deep scratches from previous steps.</li></ul>Rotate specimen 90 degrees between steps. Thorough ultrasonic cleaning between steps prevents cross-contamination from embedded particles. For as-built surfaces with significant roughness, start at 80 or 120 grit with extra time.',
  polishing_notes: 'The work-hardening behavior requires careful polishing technique. Use diamond suspensions on appropriate pads.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>9 micrometer diamond:</strong> 3-5 minutes on a napless composite pad with moderate pressure (20-30 N per 30 mm sample). The hard Laves phase particles (as-built) or carbides can cause scratching; use consistent pressure.</li><li><strong>3 micrometer diamond:</strong> 3-5 minutes on a napless synthetic pad with moderate pressure (15-25 N). Monitor for relief around interdendritic Laves phase in as-built material.</li><li><strong>1 micrometer diamond:</strong> 2-3 minutes on a short-nap pad with light pressure (12-20 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05 micrometer colloidal silica:</strong> 2-4 minutes on a soft chemical-mechanical polishing pad with light pressure. The chemical-mechanical action of colloidal silica is effective on nickel alloys and helps remove the work-hardened surface layer. Vibratory polishing with colloidal silica for 4-8 hours produces excellent results for revealing fine dendritic substructure and melt pool boundaries.</li></ul>For porosity analysis, stop after 1 micrometer diamond and image the as-polished surface. Over-polishing rounds pore edges and affects quantitative measurements. For Laves phase distribution analysis, the as-polished surface after colloidal silica already shows good phase contrast.',
  etching_notes: 'AM IN718 responds to standard nickel alloy etchants, but the AM-specific features (melt pool boundaries, dendritic substructure, Laves phase, microsegregation) may require different etchants or conditions than wrought material. Always examine the as-polished surface first for porosity and phase contrast.<br /><br /><strong>Waterless Kalling\'s Reagent (Chemical Etching)</strong> - Primary choice for general AM microstructure:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 5 g CuCl2, 100 ml HCl, 100 ml ethanol</li><li><strong>Application:</strong> Immerse for 5-30 seconds. Start with 5 seconds and build up gradually. As-built AM material may etch faster than wrought due to microsegregation.</li><li><strong>Reveals:</strong> Melt pool boundaries (as arc-shaped contrast lines), columnar dendritic structure, interdendritic Laves phase (appears as bright particles along dendrite boundaries), prior solidification grain boundaries. In heat-treated material, reveals grain boundaries and any remaining carbides.</li><li><strong>Rinse:</strong> Ethanol, then dry with warm air.</li></ul><strong>Marble\'s Reagent (Chemical Etching)</strong> - For enhanced dendritic contrast:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 g CuSO4, 50 ml HCl, 50 ml H2O</li><li><strong>Application:</strong> Immerse for 5-20 seconds. Produces copper deposition that highlights dendrite cores vs interdendritic regions.</li><li><strong>Reveals:</strong> Dendritic solidification structure with excellent contrast. Nb/Mo-enriched interdendritic regions appear different from dendrite cores. Good for visualizing microsegregation patterns and melt pool overlap zones.</li></ul><strong>Electrolytic 10% Oxalic Acid (Electrolytic Etching)</strong> - For Laves phase and sensitization:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 g oxalic acid, 100 ml H2O</li><li><strong>Application:</strong> Electrolytic at 3-6 V DC for 5-30 seconds. Stainless steel cathode.</li><li><strong>Reveals:</strong> Laves phase distribution (preferentially attacked), NbC carbides, grain boundaries in heat-treated material. Excellent for quantifying Laves phase content in as-built vs heat-treated conditions. Also reveals any sensitization or Nb-depleted zones around Laves phase particles.</li></ul><strong>AM-specific etching strategy:</strong> For melt pool boundary mapping, use a very light chemical etch (Kalling\'s, 3-5 seconds). For dendritic substructure, Marble\'s reagent gives the best contrast. For Laves phase quantification and comparison between as-built and heat-treated conditions, use electrolytic oxalic acid at consistent parameters. Sequential etching (light chemical followed by electrolytic) can reveal multiple feature types on the same specimen.<br /><br /><strong>Safety:</strong> Use fume hood for all etching. Standard PPE including gloves and eye protection. CuCl2 solutions are toxic; dispose properly.',
  recommended_grinding_sequence: '[120,240,320,400,600]',
  recommended_polishing_sequence: '[9\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[Waterless Kalling\'s,Marble\'s Reagent,10% Oxalic Acid (electrolytic)]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM F3055,ASTM E3166,ASTM B637]',
  iso_standards: '[ISO/ASTM 52904]',
  related_guide_slugs: '[additive-manufacturing-preparation,nickel-alloys-preparation,aerospace-applications]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Turbine components,Combustion liners,Rocket engine injectors,High-temperature structural parts,Nuclear reactor components]',
  typical_uses: '[Gas turbine blades and vanes,Combustion chamber liners,Rocket engine nozzles,Heat exchangers,Aerospace brackets]',
  detailed_description: 'Additively manufactured Inconel 718 produced by selective laser melting (SLM/L-PBF). The rapid solidification creates columnar dendritic structures with interdendritic Laves phase and NbC carbides, fundamentally different from wrought IN718. Significant Nb and Mo microsegregation requires homogenization heat treatment. As-built and heat-treated conditions produce dramatically different microstructures requiring distinct metallographic characterization approaches.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '191',
  view_count: '0',
  save_count: '0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preparation_difficulty: 'hard',
  estimated_sectioning_time_minutes: '',
  estimated_mounting_time_minutes: '',
  estimated_grinding_time_minutes: '',
  estimated_polishing_time_minutes: '',
  estimated_etching_time_minutes: '',
  total_preparation_time_minutes: '',
  common_issues: '',
  troubleshooting_notes: '',
  success_criteria: '',
  quality_indicators: '',
  material_grade: '',
  temper_condition: '',
  parent_material_id: '',
  microstructure_images: '',
  preparation_step_images: ''
},

// 3. AM 316L STAINLESS STEEL (SLM)
{
  id: uuid(),
  name: 'AM 316L Stainless Steel (SLM)',
  slug: 'am-316l-stainless',
  category: 'Stainless Steel',
  class: '5',
  alternative_names: '[AM 316L,Additive 316L,3D Printed 316L,L-PBF 316L,SLM 316L SS]',
  tags: '[additive-manufacturing,SLM,L-PBF,stainless-steel]',
  hardness: '85-95 HRB (as-built)',
  hardness_hb: '200',
  hardness_hrc: '',
  hardness_hv: '210',
  density: '7.99',
  melting_point_celsius: '1400',
  tensile_strength_mpa: '640',
  yield_strength_mpa: '530',
  composition: 'Fe-16Cr-10Ni-2Mo-2Mn (UNS S31603)',
  microstructure: 'Austenitic matrix with cellular/dendritic solidification substructure within melt pools. Melt pool boundaries visible as etching contrast lines. Sub-grain dislocation cell structures (0.5-1 micrometer cells) responsible for enhanced yield strength over wrought. Possible delta-ferrite stringers along melt pool boundaries. Solidification texture with <001> orientation along build direction.',
  material_type: 'alloy',
  hardness_category: 'medium',
  work_hardening: 'TRUE',
  magnetic: 'FALSE',
  corrosion_resistance: 'high',
  heat_treatment: 'Stress relief (400-600C), Solution anneal (1050-1100C/WQ), HIP (1150C/100MPa/3h)',
  annealing_temperature_celsius: '1050',
  solution_treatment_temp_celsius: '1050',
  aging_temperature_celsius: '',
  special_notes: 'AM 316L exhibits remarkably higher yield strength (530 MPa vs ~200 MPa for wrought annealed) due to the unique dislocation cell substructure formed during rapid solidification. These cells are approximately 0.5-1 micrometer in diameter, enriched in Mo and Cr at cell walls, and are visible only by SEM or EBSD. At optical microscopy scale, the key AM features are melt pool boundaries (arc-shaped contrast lines), cellular/dendritic solidification patterns within melt pools, and possible delta-ferrite stringers. The as-built condition retains columnar grains with strong <001> crystallographic texture along the build direction. Solution annealing (above 1050C) dissolves the dislocation cells and removes the AM-specific microstructure, producing equiaxed austenite grains similar to wrought. Build orientation must be documented for all cross-sections. Porosity characterization before etching: lack-of-fusion (irregular, between layers), keyhole (spherical), gas porosity (small spherical from feedstock). Delta-ferrite content may be higher in AM 316L than wrought due to the rapid solidification and can vary with build parameters.',
  preparation_notes: 'AM 316L is a medium-hardness (85-95 HRB, ~210 HV as-built) austenitic stainless steel produced by selective laser melting. The as-built yield strength is significantly higher than wrought 316L due to rapid-solidification dislocation cell structures. The microstructure features melt pool boundaries (arc-shaped contrast lines), cellular/dendritic solidification substructure within melt pools, and possible delta-ferrite stringers. The material is austenitic and work-hardens during grinding, requiring fresh sharp abrasives. Preparation is similar to wrought 316L but the AM-specific features (melt pool boundaries, cellular substructure) require careful etching optimization. Always examine the as-polished surface for porosity characterization before etching. The build orientation relative to the cross-section plane must be documented. Extra grinding allowance may be needed for as-built surfaces, which have significant surface roughness (Ra 5-15 micrometers typical for SLM).',
  sectioning_notes: 'Use an abrasive cut-off saw with an alumina (Al2O3) blade designed for stainless steel. Apply generous coolant flow. Cutting speed: 200-300 RPM with moderate feed rate. Do not dwell or pause, as 316L work-hardens and a hardened layer will slow subsequent cutting. For AM build characterization, section in multiple orientations: XY plane (perpendicular to build) reveals melt pool cross-sections, scan track overlap, and scan strategy pattern; XZ or ZX planes (parallel to build) reveal columnar grain structure, melt pool depth, and layer banding. Leave 2-3 mm allowance for grinding. For as-built surfaces, leave extra allowance (3-5 mm) due to significant surface roughness.',
  mounting_notes: 'Both cold and hot compression mounting are acceptable. The high melting point (1400C) and austenitic stability mean compression mounting at 150-180C will not alter the microstructure. Hot compression mounting with phenolic or epoxy-phenolic resin provides good edge retention. Cold mounting with low-shrinkage epoxy is preferred for examining as-built surface roughness, near-surface porosity, or surface-connected defects. For porosity analysis (density measurements, pore characterization), vacuum impregnation with fluorescent epoxy is recommended. Edge-retaining mounts are essential for near-surface examination.',
  grinding_notes: 'AM 316L work-hardens during grinding (similar to wrought 316L). Use fresh, sharp SiC papers or rigid diamond grinding discs. Disc speed: 250-300 RPM. Apply moderate pressure (25-35 N per 30 mm sample). Avoid excessive pressure which promotes work hardening and subsurface deformation.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>120 grit SiC:</strong> Remove sectioning damage (30-60 seconds). Moderate, consistent pressure.</li><li><strong>240 grit SiC:</strong> Remove previous scratches (30-45 seconds). Fresh paper essential.</li><li><strong>320 grit SiC:</strong> Refinement (20-40 seconds). Rotate specimen 90 degrees.</li><li><strong>400 grit SiC:</strong> Continue refinement (20-40 seconds).</li><li><strong>600 grit SiC:</strong> Final grinding step (20-40 seconds). Ensure uniform scratch pattern.</li></ul>Rotate specimen 90 degrees between steps. Thorough cleaning between steps. Water lubrication must be continuous. For as-built surfaces with significant roughness, start at 80 or 120 grit with extended grinding time to establish a flat plane through the rough surface layer.',
  polishing_notes: 'Use diamond suspensions on appropriate pads. The work-hardening tendency requires consistent technique.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>9 micrometer diamond:</strong> 3-5 minutes on a napless composite pad with moderate pressure (20-30 N per 30 mm sample).</li><li><strong>3 micrometer diamond:</strong> 3-5 minutes on a napless synthetic pad with moderate pressure (15-25 N).</li><li><strong>1 micrometer diamond:</strong> 2-3 minutes on a short-nap pad with light pressure (12-20 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05 micrometer colloidal silica:</strong> 2-4 minutes on a soft chemical-mechanical polishing pad with light pressure. Colloidal silica provides excellent chemical-mechanical action on austenitic stainless steel, removing the work-hardened layer and producing a deformation-free surface. This is critical for subsequent EBSD analysis of solidification texture. Vibratory polishing with colloidal silica for 4-8 hours is recommended for the best surface quality, especially if EBSD or dislocation cell imaging (SEM) is planned.</li></ul>For porosity analysis, stop after 1 micrometer diamond and image the as-polished surface before proceeding to final polishing and etching.',
  etching_notes: 'AM 316L responds to standard austenitic stainless steel etchants, but etching conditions must be optimized for the AM-specific features (melt pool boundaries, cellular substructure, delta-ferrite). Always examine as-polished surface first for porosity.<br /><br /><strong>Electrolytic Oxalic Acid (Electrolytic Etching)</strong> - Primary choice for AM features:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 g oxalic acid, 100 ml H2O</li><li><strong>Application:</strong> Electrolytic at 6 V DC for 15-30 seconds. Stainless steel cathode.</li><li><strong>Reveals:</strong> Melt pool boundaries with excellent contrast (the primary AM feature at optical scale). Also reveals cellular/dendritic solidification substructure within melt pools, delta-ferrite stringers, grain boundaries, and any sensitization. The melt pool overlap zones appear as distinct etching contrast regions.</li><li><strong>Notes:</strong> This is the preferred etchant for AM 316L because it selectively attacks the microsegregation at melt pool boundaries and cell walls, providing the best contrast for AM-specific features.</li></ul><strong>Glyceregia (Chemical Etching)</strong> - For general microstructure:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 15 ml HCl, 10 ml glycerol, 5 ml HNO3 (mix fresh immediately before use)</li><li><strong>Application:</strong> Immerse for 30-90 seconds. The etchant must be freshly prepared; it degrades rapidly.</li><li><strong>Reveals:</strong> General austenite grain structure, grain boundaries, and melt pool boundaries. Less selective for AM features than electrolytic oxalic acid but useful for overall microstructural survey.</li><li><strong>Safety:</strong> Glyceregia is unstable and can become explosive if stored. Prepare fresh, use immediately, and dispose of excess promptly.</li></ul><strong>10% Ferric Chloride (Chemical Etching)</strong> - For delta-ferrite:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 g FeCl3, 30 ml HCl, 120 ml H2O</li><li><strong>Application:</strong> Immerse for 10-30 seconds.</li><li><strong>Reveals:</strong> Delta-ferrite stringers along melt pool boundaries with good contrast. Useful for quantifying delta-ferrite content in AM builds, which can be higher than wrought 316L.</li></ul><strong>AM-specific etching strategy:</strong> For melt pool boundary mapping, electrolytic oxalic acid at 6V for 15-30 seconds gives the best results. For cellular substructure within melt pools, a shorter electrolytic etch (10-15 seconds) at slightly lower voltage (3-4V) preserves the fine details. For overall grain structure comparison (as-built vs solution-annealed), use Glyceregia. Sequential etching can reveal multiple features.<br /><br /><strong>Safety:</strong> Use fume hood. Standard PPE. Glyceregia must be freshly mixed and never stored.',
  recommended_grinding_sequence: '[120,240,320,400,600]',
  recommended_polishing_sequence: '[9\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[Electrolytic Oxalic Acid,Glyceregia,10% Ferric Chloride]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM A240,ASTM F3184,ASTM E3166]',
  iso_standards: '[ISO/ASTM 52904]',
  related_guide_slugs: '[additive-manufacturing-preparation,stainless-steel-preparation,medical-device-applications]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Medical devices,Marine hardware,Chemical processing equipment,Custom tooling and fixtures,Conformal cooling inserts]',
  typical_uses: '[Patient-specific surgical guides,Custom marine fittings,Chemical reactor components,Injection mold inserts with conformal cooling,Laboratory equipment]',
  detailed_description: 'Additively manufactured 316L austenitic stainless steel produced by selective laser melting (SLM/L-PBF). Features cellular/dendritic solidification substructure with dislocation cell networks that provide significantly higher yield strength than wrought 316L. Melt pool boundaries, delta-ferrite stringers, and AM-specific porosity are key features requiring optimized metallographic preparation distinct from wrought 316L approaches.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '192',
  view_count: '0',
  save_count: '0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preparation_difficulty: 'medium',
  estimated_sectioning_time_minutes: '',
  estimated_mounting_time_minutes: '',
  estimated_grinding_time_minutes: '',
  estimated_polishing_time_minutes: '',
  estimated_etching_time_minutes: '',
  total_preparation_time_minutes: '',
  common_issues: '',
  troubleshooting_notes: '',
  success_criteria: '',
  quality_indicators: '',
  material_grade: '',
  temper_condition: '',
  parent_material_id: '',
  microstructure_images: '',
  preparation_step_images: ''
},

// 4. AM AlSi10Mg (SLM)
{
  id: uuid(),
  name: 'AM AlSi10Mg (SLM)',
  slug: 'am-alsi10mg',
  category: 'Aluminum Alloy',
  class: '1',
  alternative_names: '[AM AlSi10Mg,Additive AlSi10Mg,3D Printed AlSi10Mg,L-PBF AlSi10Mg,SLM AlSi10Mg,AM A360 equivalent]',
  tags: '[additive-manufacturing,SLM,L-PBF,aluminum]',
  hardness: '120-140 HV (as-built)',
  hardness_hb: '120',
  hardness_hrc: '',
  hardness_hv: '130',
  density: '2.67',
  melting_point_celsius: '570',
  tensile_strength_mpa: '400',
  yield_strength_mpa: '270',
  composition: 'Al-10Si-0.3Mg (similar to A360/EN AC-43000)',
  microstructure: 'Unique AM solidification structure: fine cellular alpha-Al with Si-rich cell walls (100-500 nm thick) within melt pool cores. Melt pool boundaries outlined by coarser Si network. Melt pool overlap (heat-affected) zones show coarsened and partially spheroidized Si particles. Very different from cast AlSi10Mg which has coarse eutectic Si flakes or modified fibers. After T6 heat treatment (solutionizing + aging), the cellular Si network dissolves and reprecipitates as discrete spheroidized Si particles, losing the AM-specific cellular structure.',
  material_type: 'alloy',
  hardness_category: 'soft',
  work_hardening: 'FALSE',
  magnetic: 'FALSE',
  corrosion_resistance: 'moderate',
  heat_treatment: 'Stress relief (300C/2h), T5 direct aging (160-170C/4-6h), T6 solution treat (530C/2h WQ) + age (160C/6h)',
  annealing_temperature_celsius: '300',
  solution_treatment_temp_celsius: '530',
  aging_temperature_celsius: '160',
  special_notes: 'AM AlSi10Mg has a fundamentally different microstructure from cast AlSi10Mg. The rapid solidification (10^3 to 10^6 K/s) produces an extremely fine cellular structure with Si-rich cell walls surrounding alpha-Al cells. This gives AM AlSi10Mg significantly higher strength and hardness than cast equivalents. Three distinct microstructural zones exist within each melt pool: (1) fine cellular core with 0.5-1 micrometer cell spacing, (2) coarsened melt pool boundary zone where the heat from subsequent scan tracks partially re-melts or anneals the structure, and (3) heat-affected zone (HAZ) between melt pools where Si begins to spheroidize and coarsen. Build orientation must be documented. Porosity types: lack-of-fusion (irregular, often between layers due to insufficient overlap), keyhole (spherical, from excessive laser energy density), gas porosity (small spherical, from hydrogen in powder or shielding gas entrapment). The low melting point (solidus ~555-570C) requires careful thermal management during preparation. Compression mounting is acceptable but cold mounting is preferred for best results.',
  preparation_notes: 'AM AlSi10Mg is a soft to medium hardness (120-140 HV, ~120 HB as-built) aluminum-silicon alloy produced by selective laser melting. The AM microstructure is dramatically different from cast AlSi10Mg: instead of coarse eutectic Si flakes, the rapid solidification produces an ultrafine cellular alpha-Al structure with Si-rich cell walls (100-500 nm thick). This fine structure is responsible for the higher strength and hardness compared to cast material. Melt pool boundaries are a key microstructural feature, visible as regions of coarser Si due to the thermal cycling from subsequent laser passes. The material is relatively soft, prone to smearing during grinding, and sensitive to mechanical deformation that can obscure the fine cellular structure. Preparation is similar to other aluminum alloys but requires extra care in final polishing to reveal the fine AM-specific features. Always document build orientation. Examine as-polished surface for porosity before etching. Extra grinding allowance is needed for as-built surfaces due to the high surface roughness typical of SLM aluminum (Ra 8-20 micrometers).',
  sectioning_notes: 'Use a precision abrasive cut-off saw with a thin SiC or alumina blade designed for non-ferrous materials. Apply generous coolant flow to prevent overheating; the relatively low melting point (solidus ~555C) and soft nature of aluminum require thermal control. Cutting speed: 200-300 RPM with moderate feed rate. Do not use excessive force which will deform the soft material. For AM build characterization, section in multiple orientations: XY plane (perpendicular to build) reveals melt pool geometry, scan track width, and scan strategy (checkerboard, stripe, etc.); XZ or ZX planes (parallel to build) reveal melt pool depth, layer banding, and any columnar grain structure. Leave 2-3 mm allowance for grinding. For as-built surfaces with high roughness, leave 3-5 mm extra.',
  mounting_notes: 'Cold mounting with castable epoxy is preferred. While the melting point (~555-570C solidus) is well above compression mounting temperatures, the soft aluminum is prone to deformation under the pressures used in compression mounting (2000-3000 psi), potentially distorting pores and affecting porosity measurements. Cold mounting with low-shrinkage epoxy provides the best pore preservation. For porosity analysis (a critical AM quality metric), vacuum impregnation with fluorescent epoxy is strongly recommended; this fills all connected porosity and surface-breaking pores, enabling accurate quantitative porosity measurement under UV illumination. Edge-retaining mounts are essential for examining as-built surface roughness and near-surface porosity.',
  grinding_notes: 'AM AlSi10Mg is soft (~120 HB) and prone to smearing, similar to other aluminum alloys but with the additional concern of preserving the fine AM cellular structure. Use SiC papers or diamond grinding discs with water lubrication. Disc speed: 200-300 RPM. Apply light to moderate pressure (20-30 N per 30 mm sample). Fresh, sharp abrasives are essential; worn papers smear rather than cut aluminum. SiC particle embedding is a concern with soft aluminum; diamond grinding discs reduce this problem.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>120 grit SiC:</strong> Remove sectioning damage (30-60 seconds). Light to moderate pressure. Generous water flow.</li><li><strong>240 grit SiC:</strong> Remove previous scratches (20-40 seconds). Fresh paper essential.</li><li><strong>320 grit SiC:</strong> Refinement (20-40 seconds). Rotate specimen 90 degrees.</li><li><strong>400 grit SiC:</strong> Continue refinement (20-40 seconds).</li><li><strong>600 grit SiC:</strong> Final grinding step (20-40 seconds). Ensure uniform scratch pattern.</li><li><strong>1200 grit SiC:</strong> Optional additional step for softer AM aluminum. Reduces subsurface damage before polishing (15-30 seconds).</li></ul>Rotate specimen 90 degrees between steps. Thorough ultrasonic cleaning between steps is critical to remove embedded SiC particles from the soft aluminum. For as-built surfaces, start at 80 or 120 grit with extended time to grind past the rough surface.',
  polishing_notes: 'The soft aluminum requires careful polishing to avoid smearing, which can obscure the fine AM cellular structure. Use diamond suspensions on napless or low-nap pads.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>6 micrometer diamond:</strong> 3-5 minutes on a napless synthetic pad with light to moderate pressure (15-25 N per 30 mm sample). Use an oil-based or water-free lubricant to avoid staining the aluminum surface.</li><li><strong>3 micrometer diamond:</strong> 3-5 minutes on a napless synthetic pad with light pressure (12-20 N).</li><li><strong>1 micrometer diamond:</strong> 2-3 minutes on a short-nap pad with light pressure (10-18 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05 micrometer colloidal silica:</strong> 2-4 minutes on a soft chemical-mechanical polishing pad with light pressure. Colloidal silica with a slightly alkaline pH provides excellent chemical-mechanical action on aluminum. A small addition of H2O2 (5-10%) to the colloidal silica can enhance chemical action and reduce smearing. Vibratory polishing with colloidal silica for 4-8 hours gives the best results for revealing the fine cellular AM microstructure without residual deformation.</li></ul>For porosity analysis, stop after 1 micrometer diamond and image the as-polished surface. For microstructural analysis of the fine cellular Si network, the full polishing sequence through colloidal silica (or vibratory polishing) is essential; any residual deformation will obscure the nanoscale cell wall features.',
  etching_notes: 'AM AlSi10Mg responds to standard aluminum etchants, but the fine cellular AM structure requires careful etching to avoid over-etching. Always examine the as-polished surface first for porosity characterization.<br /><br /><strong>Keller\'s Reagent (Chemical Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 2 ml HF, 3 ml HCl, 5 ml HNO3, 190 ml H2O</li><li><strong>Application:</strong> Immerse for 10-15 seconds. Start with 10 seconds and check. AM AlSi10Mg may etch slightly faster than cast due to the fine structure and high density of Si cell walls.</li><li><strong>Reveals:</strong> Melt pool boundaries (as distinct arc-shaped contrast lines), the fine cellular alpha-Al/Si structure within melt pools, and the coarsened Si in melt pool overlap zones. At lower magnifications (50-200x), melt pool geometry and scan strategy are visible. At higher magnifications (500-1000x), the individual cellular structure with Si-rich cell walls becomes apparent.</li><li><strong>Rinse:</strong> Water, then ethanol. Dry with warm air.</li></ul><strong>Weck\'s Reagent (Chemical Tint Etching)</strong> - For melt pool geometry under polarized light:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 4 g KMnO4, 1 g NaOH, 100 ml H2O</li><li><strong>Application:</strong> Immerse for 10-20 seconds at room temperature. A thin interference film forms that varies with crystal orientation.</li><li><strong>Reveals:</strong> Under polarized light, melt pool geometry is revealed with vivid color contrast. Different melt pools appear as different colors based on the crystallographic orientation of the solidification structure. Excellent for visualizing scan strategy patterns, melt pool overlap, and any columnar grain texture. Under brightfield, the tint film provides contrast between melt pool cores (fine cells) and boundaries (coarse Si).</li><li><strong>Notes:</strong> The specimen must be very well polished (through colloidal silica) for Weck\'s reagent to produce good results. Any residual scratches or deformation will cause uneven film deposition.</li></ul><strong>0.5% HF in Water (Chemical Etching)</strong> - For gentle contrast:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 0.5 ml HF, 100 ml H2O</li><li><strong>Application:</strong> Immerse for 15-30 seconds. Gentler than Keller\'s.</li><li><strong>Reveals:</strong> Melt pool boundaries and general microstructure. Useful when Keller\'s over-etches the fine cellular structure.</li></ul><strong>AM-specific etching strategy:</strong> For melt pool mapping and scan strategy visualization, use Keller\'s reagent (10-15 seconds) and examine at 50-200x. For detailed cellular substructure, use a shorter Keller\'s etch (5-8 seconds) or dilute HF and examine at 500-1000x. For melt pool geometry visualization under polarized light, use Weck\'s reagent on a well-polished surface. Comparing as-built vs heat-treated (T6) material: the cellular Si network dissolves during solutionizing and reprecipitates as discrete spheroidized Si particles; use the same etchants but adjust times as the heat-treated structure etches differently.<br /><br /><strong>Safety:</strong> HF is extremely dangerous. Use full PPE including face shield, HF-resistant gloves, and lab coat. Work in fume hood. Have calcium gluconate gel available.',
  recommended_grinding_sequence: '[120,240,320,400,600,1200]',
  recommended_polishing_sequence: '[6\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[Keller\'s Reagent,Weck\'s Reagent,0.5% HF]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM F3318,ASTM E3166]',
  iso_standards: '[ISO/ASTM 52904]',
  related_guide_slugs: '[additive-manufacturing-preparation,aluminum-sample-preparation,automotive-applications]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Lightweight structural parts,Heat exchangers,Automotive prototypes,Aerospace secondary structures,Custom enclosures]',
  typical_uses: '[Topology-optimized brackets,Conformal cooling channels,UAV structural components,Motorsport parts,Satellite antenna brackets]',
  detailed_description: 'Additively manufactured AlSi10Mg produced by selective laser melting (SLM/L-PBF). Rapid solidification creates an ultrafine cellular alpha-Al structure with nanoscale Si-rich cell walls, fundamentally different from cast AlSi10Mg with its coarse eutectic Si. Melt pool boundaries, cellular substructure zones, and heat-affected overlap regions are key AM-specific features requiring distinct metallographic preparation and etching approaches compared to cast aluminum-silicon alloys.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '193',
  view_count: '0',
  save_count: '0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preparation_difficulty: 'medium',
  estimated_sectioning_time_minutes: '',
  estimated_mounting_time_minutes: '',
  estimated_grinding_time_minutes: '',
  estimated_polishing_time_minutes: '',
  estimated_etching_time_minutes: '',
  total_preparation_time_minutes: '',
  common_issues: '',
  troubleshooting_notes: '',
  success_criteria: '',
  quality_indicators: '',
  material_grade: '',
  temper_condition: '',
  parent_material_id: '',
  microstructure_images: '',
  preparation_step_images: ''
}

];

// Fill in missing fields with empty strings
for (const mat of materials) {
  for (const h of headers) {
    if (!(h in mat)) {
      mat[h] = '';
    }
  }
}

// Generate CSV rows and append
const newRows = materials.map(m => csvRow(m, headers));
const appendData = '\n' + newRows.join('\n');

// Ensure file doesn't end with newline before appending
let existingContent = fs.readFileSync(CSV_PATH, 'utf8');
if (existingContent.endsWith('\n')) {
  existingContent = existingContent.slice(0, -1);
}
fs.writeFileSync(CSV_PATH, existingContent + appendData + '\n', 'utf8');

console.log(`\nSuccessfully added ${materials.length} AM materials:`);
materials.forEach(m => console.log(`  - ${m.name} (${m.slug})`));
console.log('\nDone!');
