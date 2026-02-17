/**
 * Adds 6 new Class 1 materials to materials_rows.csv
 * Materials: Pure Lead, Pure Tin, Sn-37Pb Solder, SAC305 Solder, Zamak 5, Babbitt
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

// 1. PURE LEAD
{
  id: uuid(),
  name: 'Pure Lead',
  slug: 'pure-lead',
  category: 'Lead',
  class: '1',
  alternative_names: '[Pb,Lead,Unalloyed Lead,Commercial Lead]',
  tags: '[soft,pure-metal,radiation-shielding,battery]',
  hardness: '5 HB',
  hardness_hb: '5',
  hardness_hrc: '',
  hardness_hv: '4',
  density: '11.34',
  melting_point_celsius: '327',
  tensile_strength_mpa: '18',
  yield_strength_mpa: '8',
  composition: 'Pb (99.9+%)',
  microstructure: 'Equiaxed lead grains with possible oxide inclusions',
  material_type: 'element',
  hardness_category: 'very-soft',
  work_hardening: 'FALSE',
  magnetic: 'FALSE',
  corrosion_resistance: 'moderate',
  heat_treatment: 'None typical',
  annealing_temperature_celsius: '',
  solution_treatment_temp_celsius: '',
  aging_temperature_celsius: '',
  special_notes: 'Lead is toxic. All cutting, grinding, and polishing debris must be collected and disposed of as hazardous waste. Work in a ventilated area. Wear gloves at all times. Do not eat or drink in the preparation area. Follow all applicable safety regulations for lead handling.',
  preparation_notes: 'Pure lead is an extremely soft (5 HB, ~4 HV) elemental metal with a low melting point (327\u00B0C) and high density (11.34 g/cm\u00B3). It is one of the softest metals encountered in metallographic preparation. The extreme softness causes severe smearing and deformation during grinding and polishing. Abrasive particles embed readily in the surface. The low melting point requires cold mounting only. Lead is toxic, so all preparation debris must be handled as hazardous waste.',
  sectioning_notes: 'Extremely soft material. Use a low-speed diamond saw with continuous coolant at 100-200 RPM. Minimize feed rate to reduce deformation. The material is toxic; contain all cutting debris and coolant for proper disposal. Avoid generating fine particles or dust. For small or thin samples, sectioning with a razor blade or fine jeweler\'s saw is possible. Standard abrasive cut-off wheels can also be used with very low feed rates. Leave 2-3 mm allowance for grinding away deformation from cutting.',
  mounting_notes: 'Cold mounting with castable epoxy is required. The low melting point (327\u00B0C) and extreme softness make compression mounting unsuitable; even moderate pressure will deform the sample. Use a low-shrinkage epoxy resin. Adding a mineral filler (glass beads or alumina powder) to the epoxy creates a harder mount that provides better support during grinding and reduces edge rounding. Ensure complete cure (typically 8-12 hours) before grinding.',
  grinding_notes: 'The extreme softness (5 HB) requires very careful grinding. Start at 320 or 400 grit SiC; coarser grits will embed deep damage that is difficult to remove from such soft material. Use very light pressure (10-15 N per 30 mm sample). Disc speed: 150-250 RPM. Progress through 600, 800, 1200 grit. Fresh papers are essential at each step; worn papers cause more smearing than cutting. Thorough ultrasonic cleaning between steps is critical to remove embedded SiC particles. Diamond grinding discs are preferred over SiC paper to reduce embedding.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>320 grit:</strong> Remove sectioning damage (15-30 seconds). Very light pressure. Monitor constantly for smearing.</li><li><strong>400 grit:</strong> Remove previous scratches (15-30 seconds). Fresh paper only.</li><li><strong>600 grit:</strong> Further refinement (15-30 seconds). Continue very light pressure.</li><li><strong>800 grit:</strong> Prepare for polishing (15-30 seconds).</li><li><strong>1200 grit:</strong> Final grinding step (15-30 seconds). Ensure all previous scratches are removed.</li></ul>Rotate specimen 90\u00B0 between steps. Use complementary rotation. Abundant water lubrication is critical. Grind only long enough to remove the previous scratch pattern; over-grinding causes work hardening artifacts.',
  polishing_notes: 'The extreme softness requires very careful polishing with minimal pressure. Use napless or low-nap cloths throughout to avoid relief and orange peel.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>6\u03BCm diamond:</strong> 2-3 minutes on a napless synthetic pad with very light pressure (10-15 N per 30 mm sample). Monitor constantly for smearing and orange peel.</li><li><strong>3\u03BCm diamond:</strong> 2-3 minutes on a napless synthetic pad with very light pressure (10-12 N). Continue monitoring for smearing.</li><li><strong>1\u03BCm diamond:</strong> 1-2 minutes on a napless pad with minimal pressure (8-12 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 1-2 minutes on a soft final polishing pad with very light pressure. Or vibratory polishing with colloidal silica for 2-4 hours, which gives the best results for extremely soft lead by removing residual deformation without introducing new damage.</li></ul>Lead is extremely prone to orange peel if over-polished. Check surface frequently under the microscope. If orange peel develops, reduce pressure or switch to vibratory polishing.',
  etching_notes: 'Pure lead responds to several standard etchants. The material etches quickly due to its softness, so start with short times and increase as needed.<br /><br /><strong>10% Acetic Acid (Chemical Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 ml glacial acetic acid, 90 ml water</li><li><strong>Application:</strong> Immerse for 5-15 seconds. Swab etching also effective.</li><li><strong>Reveals:</strong> Grain boundaries clearly. Good general-purpose etchant for lead.</li><li><strong>Rinse:</strong> Water, then ethanol. Dry with warm air.</li></ul><strong>5% Nital (Chemical Etching)</strong> - Alternative:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 5 ml HNO\u2083, 95 ml ethanol</li><li><strong>Application:</strong> Immerse for 3-10 seconds. More aggressive than acetic acid.</li><li><strong>Reveals:</strong> Grain boundaries and substructure.</li><li><strong>Rinse:</strong> Ethanol, then dry with warm air.</li></ul><strong>Safety:</strong> Lead is toxic. All etching solutions containing dissolved lead must be collected and disposed of as hazardous waste. Work in a fume hood. Wear appropriate PPE including gloves and eye protection.',
  recommended_grinding_sequence: '[320,400,600,800,1200]',
  recommended_polishing_sequence: '[6\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[10% Acetic Acid,5% Nital]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM B29]',
  iso_standards: '',
  related_guide_slugs: '',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Radiation shielding,Batteries,Solder constituent,Corrosion protection]',
  typical_uses: '[Battery plates,Radiation shielding,Cable sheathing,Chemical tank linings]',
  detailed_description: 'Pure lead is an extremely soft, dense elemental metal used in batteries, radiation shielding, and as a solder constituent. One of the softest metals prepared in metallographic labs.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '82',
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

// 2. PURE TIN
{
  id: uuid(),
  name: 'Pure Tin',
  slug: 'pure-tin',
  category: 'Tin',
  class: '1',
  alternative_names: '[Sn,Tin,Unalloyed Tin,Commercial Tin]',
  tags: '[soft,pure-metal,electronics,plating]',
  hardness: '5 HB',
  hardness_hb: '5',
  hardness_hrc: '',
  hardness_hv: '5',
  density: '7.31',
  melting_point_celsius: '232',
  tensile_strength_mpa: '22',
  yield_strength_mpa: '11',
  composition: 'Sn (99.9+%)',
  microstructure: 'Equiaxed beta-tin grains',
  material_type: 'element',
  hardness_category: 'very-soft',
  work_hardening: 'FALSE',
  magnetic: 'FALSE',
  corrosion_resistance: 'good',
  heat_treatment: 'None typical',
  annealing_temperature_celsius: '',
  solution_treatment_temp_celsius: '',
  aging_temperature_celsius: '',
  special_notes: 'Beta-tin (white tin) is the stable phase above 13.2\u00B0C. Below this temperature, tin can transform to alpha-tin (gray tin), a brittle powder form known as tin pest. Store samples and prepare at room temperature or above. Avoid prolonged storage at low temperatures.',
  preparation_notes: 'Pure tin is an extremely soft (5 HB, ~5 HV) elemental metal with a very low melting point (232\u00B0C). Similar prep challenges to pure lead: severe smearing, abrasive embedding, and sensitivity to heat. Cold mounting is required. The material is non-toxic but the very low melting point demands careful temperature control throughout preparation.',
  sectioning_notes: 'Extremely soft material. Use a low-speed diamond saw or precision wafering saw with continuous coolant at 100-200 RPM. Minimize feed rate. The very low melting point (232\u00B0C) means heat generation must be carefully controlled. Standard abrasive cut-off wheels can be used with very low feed rates and generous coolant. For thin tin plate or tin coatings, precision wafering is preferred. Leave 1-2 mm allowance for grinding.',
  mounting_notes: 'Cold mounting with castable epoxy is required. The very low melting point (232\u00B0C) makes compression mounting temperatures (150-180\u00B0C) risky, as the sample could soften or deform under pressure near its melting point. Use a low-shrinkage epoxy resin. For tin coatings or plating cross-sections, use edge-retaining mounting compounds and consider vacuum impregnation to fill any gaps at the coating interface.',
  grinding_notes: 'The extreme softness (5 HB) requires very careful grinding. Start at 320 or 400 grit SiC. Use very light pressure (10-15 N per 30 mm sample). Disc speed: 150-250 RPM. Progress through 600, 800, 1200 grit. Fresh papers essential at each step. Thorough ultrasonic cleaning between steps to remove embedded SiC particles. Diamond grinding discs preferred over SiC paper to reduce embedding.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>320 grit:</strong> Remove sectioning damage (15-30 seconds). Very light pressure.</li><li><strong>400 grit:</strong> Remove previous scratches (15-30 seconds).</li><li><strong>600 grit:</strong> Further refinement (15-30 seconds).</li><li><strong>800 grit:</strong> Prepare for polishing (15-30 seconds).</li><li><strong>1200 grit:</strong> Final grinding step (15-30 seconds).</li></ul>Rotate specimen 90\u00B0 between steps. Abundant water lubrication is critical.',
  polishing_notes: 'The extreme softness requires very careful polishing. Use napless or low-nap cloths throughout.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>6\u03BCm diamond:</strong> 2-3 minutes on a napless synthetic pad with very light pressure (10-15 N).</li><li><strong>3\u03BCm diamond:</strong> 2-3 minutes on a napless pad with light pressure (10-12 N).</li><li><strong>1\u03BCm diamond:</strong> 1-2 minutes on a napless pad (8-12 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 1-2 minutes on a soft final polishing pad. Vibratory polishing (2-4 hours) with colloidal silica gives the best results for removing residual deformation.</li></ul>Prone to orange peel if over-polished. Check surface frequently.',
  etching_notes: 'Pure tin responds to several etchants. The material etches quickly; start with short times.<br /><br /><strong>2% Nital (Chemical Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 2 ml HNO\u2083, 98 ml ethanol</li><li><strong>Application:</strong> Immerse for 5-10 seconds.</li><li><strong>Reveals:</strong> Grain boundaries in beta-tin matrix.</li><li><strong>Rinse:</strong> Ethanol, then dry with warm air.</li></ul><strong>5% HCl in Ethanol (Chemical Etching)</strong> - Alternative:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 5 ml HCl, 95 ml ethanol</li><li><strong>Application:</strong> Immerse for 5-15 seconds. Good grain boundary contrast.</li><li><strong>Reveals:</strong> Grain boundaries and substructure clearly.</li></ul><strong>Safety:</strong> Use fume hood for all etching. Standard PPE required.',
  recommended_grinding_sequence: '[320,400,600,800,1200]',
  recommended_polishing_sequence: '[6\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[2% Nital,5% HCl in Ethanol]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM B339]',
  iso_standards: '',
  related_guide_slugs: '',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Electronics,Plating,Solder constituent,Food packaging]',
  typical_uses: '[Tin plating,Solder constituent,Food cans,Bearing alloy constituent]',
  detailed_description: 'Pure tin is an extremely soft elemental metal widely used in electronics as solder, plating, and coating material. Very low melting point requires cold mounting.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '83',
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

// 3. Sn-37Pb EUTECTIC SOLDER
{
  id: uuid(),
  name: 'Sn-37Pb Eutectic Solder',
  slug: 'sn-37pb-eutectic-solder',
  category: 'Solder Alloy',
  class: '1',
  alternative_names: '[63/37 Solder,Eutectic Tin-Lead Solder,Sn63Pb37,Leaded Solder]',
  tags: '[solder,electronics,eutectic,leaded]',
  hardness: '15 HB',
  hardness_hb: '15',
  hardness_hrc: '',
  hardness_hv: '14',
  density: '8.4',
  melting_point_celsius: '183',
  tensile_strength_mpa: '37',
  yield_strength_mpa: '25',
  composition: 'Sn-37Pb (63Sn-37Pb)',
  microstructure: 'Lamellar eutectic of Sn-rich and Pb-rich phases',
  material_type: 'alloy',
  hardness_category: 'very-soft',
  work_hardening: 'FALSE',
  magnetic: 'FALSE',
  corrosion_resistance: 'low',
  heat_treatment: 'As soldered',
  annealing_temperature_celsius: '',
  solution_treatment_temp_celsius: '',
  aging_temperature_celsius: '',
  special_notes: 'Contains lead, which is toxic. Handle with care and contain all preparation debris for proper disposal. This is the classic eutectic solder composition with the lowest melting point in the Sn-Pb system. Commonly examined in electronics failure analysis for solder joint integrity, intermetallic growth, and thermal fatigue cracking.',
  preparation_notes: 'Sn-37Pb eutectic solder is a very soft (15 HB, ~14 HV) two-phase alloy with the lowest melting point (183\u00B0C) in the Sn-Pb system. The lamellar eutectic microstructure of alternating Sn-rich and Pb-rich phases creates differential polishing challenges, as the Pb-rich phase is softer. Commonly prepared as solder joint cross-sections on PCBs, requiring edge retention and interface preservation.',
  sectioning_notes: 'Use a low-speed precision wafering saw with a thin diamond blade and continuous coolant. The very low melting point (183\u00B0C) means heat must be minimized. Cutting speed: 100-200 RPM with minimal feed rate. When sectioning solder joints on PCBs, position the cut to pass through the center of the joint of interest. For BGA (ball grid array) joints, careful alignment is critical. Leave adequate allowance for grinding. The solder will deform easily, so avoid clamping directly on the solder joint.',
  mounting_notes: 'Cold mounting with castable epoxy is required. Compression mounting temperatures (150-180\u00B0C) will approach or exceed the 183\u00B0C melting point and will alter the microstructure. Use a low-shrinkage epoxy resin with good edge retention properties. Vacuum impregnation is strongly recommended for solder joints on PCBs to fill gaps around components, under chips, and in via holes. This prevents edge rounding and trapping of grinding debris in gaps during subsequent preparation.',
  grinding_notes: 'Start at 320-400 grit SiC. Very light pressure (10-15 N per 30 mm sample). Disc speed: 150-250 RPM. The two-phase eutectic structure means differential polishing is a constant concern; the Pb-rich phase removes faster than Sn-rich. Progress through 600, 800, 1200 grit. Fresh papers at each step. Thorough cleaning between steps to prevent cross-contamination.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>320 grit:</strong> Remove sectioning damage (15-30 seconds). Very light pressure.</li><li><strong>400 grit:</strong> Remove previous scratches (15-30 seconds).</li><li><strong>600 grit:</strong> Refinement (15-30 seconds).</li><li><strong>800 grit:</strong> Prepare for polishing (15-30 seconds).</li><li><strong>1200 grit:</strong> Final grinding (15-30 seconds).</li></ul>Rotate specimen 90\u00B0 between steps. For PCB cross-sections, grind carefully to the target plane without overshooting the solder joint of interest.',
  polishing_notes: 'Use napless or low-nap cloths to minimize relief between Sn-rich and Pb-rich phases.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>6\u03BCm diamond:</strong> 2-3 minutes on a napless synthetic pad with light pressure (10-15 N).</li><li><strong>3\u03BCm diamond:</strong> 2-3 minutes on a napless pad (10-12 N).</li><li><strong>1\u03BCm diamond:</strong> 1-2 minutes on a napless pad (8-12 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 1-2 minutes on a soft pad, or vibratory polishing for 2-4 hours. Vibratory polishing is strongly recommended for solder joints as it produces excellent surface quality with minimal relief, which is critical for revealing intermetallic layers (Cu6Sn5, Cu3Sn) at the solder/pad interface.</li></ul>Monitor for differential relief between Sn-rich and Pb-rich phases throughout polishing.',
  etching_notes: 'The eutectic structure can often be seen in the as-polished condition under brightfield illumination. Etching enhances phase contrast and reveals grain boundaries within each phase.<br /><br /><strong>5% HCl in Methanol (Chemical Etching)</strong> - Primary choice for solder:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 5 ml HCl (concentrated), 95 ml methanol</li><li><strong>Application:</strong> Immerse for 5-15 seconds or swab gently.</li><li><strong>Reveals:</strong> Sn-rich and Pb-rich eutectic phases with excellent contrast. Also reveals intermetallic layers at solder/pad interfaces.</li><li><strong>Rinse:</strong> Methanol, then dry with warm air.</li></ul><strong>2% Nital (Chemical Etching)</strong> - Alternative:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 2 ml HNO\u2083, 98 ml ethanol</li><li><strong>Application:</strong> Immerse for 3-10 seconds.</li><li><strong>Reveals:</strong> General microstructure. Less selective than HCl-methanol.</li></ul><strong>Safety:</strong> Contains lead. All etching waste must be disposed of as hazardous waste. Work in fume hood. Standard PPE required.',
  recommended_grinding_sequence: '[320,400,600,800,1200]',
  recommended_polishing_sequence: '[6\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[5% HCl in Methanol,2% Nital]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '',
  iso_standards: '',
  related_guide_slugs: '[pcb-chip-preparation]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Electronics assembly,PCB soldering,Wave soldering,Hand soldering]',
  typical_uses: '[Through-hole solder joints,SMT solder joints,BGA joints,Wire connections]',
  detailed_description: 'The classic eutectic tin-lead solder with the lowest melting point (183\u00B0C) in the Sn-Pb system. Widely used in electronics before RoHS regulations. Still common in military, aerospace, and legacy applications.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '84',
  view_count: '0',
  save_count: '0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preparation_difficulty: 'hard',
},

// 4. SAC305 LEAD-FREE SOLDER
{
  id: uuid(),
  name: 'SAC305 Lead-Free Solder',
  slug: 'sac305-lead-free-solder',
  category: 'Solder Alloy',
  class: '1',
  alternative_names: '[SAC305,Sn-3.0Ag-0.5Cu,Lead-Free Solder,SAC Solder]',
  tags: '[solder,electronics,lead-free,RoHS]',
  hardness: '15 HB',
  hardness_hb: '15',
  hardness_hrc: '',
  hardness_hv: '15',
  density: '7.4',
  melting_point_celsius: '217',
  tensile_strength_mpa: '40',
  yield_strength_mpa: '28',
  composition: 'Sn-3.0Ag-0.5Cu',
  microstructure: 'Beta-tin dendrites with Ag3Sn and Cu6Sn5 intermetallic particles in eutectic regions',
  material_type: 'alloy',
  hardness_category: 'very-soft',
  work_hardening: 'FALSE',
  magnetic: 'FALSE',
  corrosion_resistance: 'moderate',
  heat_treatment: 'As soldered',
  annealing_temperature_celsius: '',
  solution_treatment_temp_celsius: '',
  aging_temperature_celsius: '',
  special_notes: 'The most widely used lead-free solder, adopted to comply with RoHS and WEEE directives. The microstructure contains Ag3Sn intermetallic needles/plates and Cu6Sn5 intermetallic scallops that are significantly harder than the tin matrix. These intermetallics are key features in solder joint reliability analysis.',
  preparation_notes: 'SAC305 is a soft (15 HB, ~15 HV) lead-free solder alloy with a near-eutectic melting range of 217-220\u00B0C. The microstructure consists of beta-tin dendrites with Ag3Sn needles and Cu6Sn5 intermetallic particles in the eutectic regions. The hardness contrast between the soft tin matrix and harder intermetallics creates relief during polishing. Commonly prepared as solder joint cross-sections for reliability analysis.',
  sectioning_notes: 'Use a low-speed precision wafering saw with a thin diamond blade and continuous coolant. Cutting speed: 100-200 RPM with minimal feed rate. The melting range (217-220\u00B0C) is higher than eutectic Sn-Pb but still low enough to require temperature awareness. When sectioning solder joints on PCBs, position the cut through the center of the joint. For BGA joints, careful alignment is critical for revealing the full joint cross-section. Leave adequate allowance for grinding.',
  mounting_notes: 'Cold mounting with castable epoxy is required. The melting range (217-220\u00B0C) is close enough to compression mounting temperatures (150-180\u00B0C) that softening and microstructural changes are possible. Use a low-shrinkage epoxy with good edge retention. Vacuum impregnation is strongly recommended for solder joints on PCBs. Edge-retaining mounting compounds are essential when examining intermetallic layers at the solder/pad interface, as these layers are typically only 1-5 \u03BCm thick.',
  grinding_notes: 'Start at 320-400 grit SiC. Very light pressure (10-15 N per 30 mm sample). Disc speed: 150-250 RPM. The Ag3Sn and Cu6Sn5 intermetallics are harder than the tin matrix, so excessive pressure preferentially removes the matrix and leaves intermetallics standing proud. Progress through 600, 800, 1200 grit.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>320 grit:</strong> Remove sectioning damage (15-30 seconds). Very light pressure.</li><li><strong>400 grit:</strong> Remove previous scratches (15-30 seconds).</li><li><strong>600 grit:</strong> Refinement (15-30 seconds).</li><li><strong>800 grit:</strong> Prepare for polishing (15-30 seconds).</li><li><strong>1200 grit:</strong> Final grinding (15-30 seconds).</li></ul>Thorough cleaning between steps.',
  polishing_notes: 'Use napless or low-nap cloths to minimize relief between the tin matrix and harder intermetallics.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>6\u03BCm diamond:</strong> 2-3 minutes on a napless synthetic pad with light pressure (10-15 N).</li><li><strong>3\u03BCm diamond:</strong> 2-3 minutes on a napless pad (10-12 N). Monitor for relief around Ag3Sn needles.</li><li><strong>1\u03BCm diamond:</strong> 1-2 minutes on a napless pad (8-12 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 1-2 minutes or vibratory polishing 2-4 hours. Vibratory polishing is strongly recommended for revealing the thin intermetallic layers (Cu6Sn5, Cu3Sn) at the solder/pad interface without relief artifacts.</li></ul>',
  etching_notes: 'SAC305 microstructure is often analyzed in the as-polished condition, especially for intermetallic layer measurements. Etching reveals beta-tin dendrite boundaries and enhances intermetallic contrast.<br /><br /><strong>5% HCl in Methanol (Chemical Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 5 ml HCl (concentrated), 95 ml methanol</li><li><strong>Application:</strong> Immerse for 5-15 seconds or swab gently.</li><li><strong>Reveals:</strong> Beta-tin dendrites, Ag3Sn particles (appear as bright needles/plates), Cu6Sn5 scallops at interfaces. Excellent for revealing the overall solder microstructure.</li><li><strong>Rinse:</strong> Methanol, then dry with warm air.</li></ul><strong>2% Nital (Chemical Etching)</strong> - Alternative:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 2 ml HNO\u2083, 98 ml ethanol</li><li><strong>Application:</strong> Immerse for 3-10 seconds.</li><li><strong>Reveals:</strong> General microstructure and grain boundaries.</li></ul><strong>Safety:</strong> Work in fume hood. Standard PPE required.',
  recommended_grinding_sequence: '[320,400,600,800,1200]',
  recommended_polishing_sequence: '[6\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[5% HCl in Methanol,2% Nital]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '',
  iso_standards: '',
  related_guide_slugs: '[pcb-chip-preparation]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Electronics assembly,PCB soldering,BGA packages,SMT assembly]',
  typical_uses: '[Lead-free solder joints,BGA balls,Wave soldering,Reflow soldering]',
  detailed_description: 'The most common lead-free solder alloy, adopted industry-wide for RoHS compliance. Contains Ag3Sn and Cu6Sn5 intermetallics that are critical for reliability analysis.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '85',
  view_count: '0',
  save_count: '0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preparation_difficulty: 'hard',
},

// 5. ZAMAK 5
{
  id: uuid(),
  name: 'Zamak 5',
  slug: 'zamak-5',
  category: 'Zinc Alloy',
  class: '1',
  alternative_names: '[Zamak 5,ZA5,ASTM AC41A,Zinc Alloy 5]',
  tags: '[die-cast,zinc,copper-bearing,general-purpose]',
  hardness: '91 HB',
  hardness_hb: '91',
  hardness_hrc: '',
  hardness_hv: '95',
  density: '6.6',
  melting_point_celsius: '386',
  tensile_strength_mpa: '328',
  yield_strength_mpa: '269',
  composition: 'Zn-4Al-1Cu-0.04Mg',
  microstructure: 'Alpha zinc matrix with Al-rich and Cu-rich intermetallic phases',
  material_type: 'alloy',
  hardness_category: 'soft',
  work_hardening: 'FALSE',
  magnetic: 'FALSE',
  corrosion_resistance: 'low',
  heat_treatment: 'As cast',
  annealing_temperature_celsius: '',
  solution_treatment_temp_celsius: '',
  aging_temperature_celsius: '',
  special_notes: 'Similar to Zamak 3 but with 1% copper addition, which improves strength and hardness slightly. The copper creates additional Cu-rich intermetallic phases that should be preserved during preparation. Second most common zinc die-casting alloy after Zamak 3.',
  preparation_notes: 'Zamak 5 is a soft (91 HB, ~95 HV) zinc-aluminum-copper die-casting alloy. Very similar preparation to Zamak 3, with the additional consideration of Cu-rich intermetallic phases that are harder than the zinc matrix. The copper addition makes Zamak 5 slightly harder than Zamak 3, but the same careful soft-metal preparation techniques apply.',
  sectioning_notes: 'Use slow-speed diamond saw or abrasive cut-off wheel designed for non-ferrous materials. Standard cut-off wheel (1.0-1.5 mm thickness) is appropriate. Use adequate coolant flow to prevent overheating. Cutting speed: 150-250 RPM. Apply light to moderate pressure. Die-cast parts may have porosity near the surface. Leave 1-2 mm allowance for grinding away sectioning damage.',
  mounting_notes: 'Cold mounting with epoxy resin is preferred to avoid heat effects on the soft material and cast structure. Use a low-shrinkage epoxy for best edge retention. The mount should be slightly harder than the sample for better edge retention.<br /><br />Hot compression mounting is acceptable since the melting point (386\u00B0C) is well above mounting temperatures, but cold mounting is recommended for the soft material. For die-cast parts, ensure the mounting material fills any porosity.',
  grinding_notes: 'The softness (91 HB) requires careful grinding to avoid smearing. Use standard SiC grinding papers with abundant water lubrication. Disc speed: 200-300 RPM. Apply light to moderate pressure (20-30 N per 30 mm sample). The Cu-rich intermetallic phases are harder than the zinc matrix and may cause relief if pressure is excessive.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>240 grit:</strong> Remove sectioning damage (20-40 seconds).</li><li><strong>320 grit:</strong> Remove previous scratches (20-40 seconds).</li><li><strong>400 grit:</strong> Further refinement (20-40 seconds).</li><li><strong>600 grit:</strong> Final grinding step (20-40 seconds).</li></ul>Rotate specimen 90\u00B0 between steps. Use complementary rotation. Abundant water lubrication is critical.',
  polishing_notes: 'Use napless or low-nap cloths. Monitor for relief around Cu-rich and Al-rich intermetallic phases.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>6\u03BCm diamond:</strong> 2-4 minutes on a medium-hard synthetic pad with light pressure (20-25 N).</li><li><strong>3\u03BCm diamond:</strong> 2-4 minutes on a medium-hard pad (15-20 N).</li><li><strong>1\u03BCm diamond:</strong> 2-3 minutes on a soft pad (12-18 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 1-2 minutes on a soft final polishing pad. Monitor for relief around intermetallic phases.</li></ul>Avoid over-polishing. Check surface frequently for smearing and orange peel.',
  etching_notes: 'Zamak 5 responds to the same etchants as Zamak 3, with the Cu-rich phases providing additional microstructural features.<br /><br /><strong>1% Nital (Chemical Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 1 ml HNO\u2083, 99 ml ethanol</li><li><strong>Application:</strong> Immerse for 5-15 seconds.</li><li><strong>Reveals:</strong> Grain boundaries, zinc matrix, Al-rich and Cu-rich phases.</li><li><strong>Rinse:</strong> Water, then ethanol. Dry with warm air.</li></ul><strong>Chromic Acid Solution (Chemical Etching)</strong> - For phase identification:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 200 g CrO\u2083, 15 g Na\u2082SO\u2084, 1000 ml H\u2082O</li><li><strong>Application:</strong> Immerse for 10-30 seconds.</li><li><strong>Reveals:</strong> Cu-rich and Al-rich intermetallic phases with excellent contrast.</li><li><strong>Note:</strong> Chromic acid is highly toxic and carcinogenic. Handle with extreme care.</li></ul>',
  recommended_grinding_sequence: '[240,320,400,600]',
  recommended_polishing_sequence: '[6\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[1% Nital,Chromic Acid]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '',
  iso_standards: '',
  related_guide_slugs: '',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Die casting,Automotive,Hardware,Industrial]',
  typical_uses: '[Automotive parts,Door handles,Locks,Decorative hardware]',
  detailed_description: 'Second most common zinc die-casting alloy. Similar to Zamak 3 but with 1% copper for improved strength and hardness. Used in applications requiring higher mechanical performance than Zamak 3.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '86',
  view_count: '0',
  save_count: '0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preparation_difficulty: 'medium',
},

// 6. BABBITT BEARING ALLOY
{
  id: uuid(),
  name: 'Babbitt Bearing Alloy',
  slug: 'babbitt-bearing-alloy',
  category: 'Bearing Alloy',
  class: '1',
  alternative_names: '[Babbitt,White Metal,Bearing Metal,ASTM B23 Grade 2]',
  tags: '[bearing,tin-based,failure-analysis,white-metal]',
  hardness: '24 HB',
  hardness_hb: '24',
  hardness_hrc: '',
  hardness_hv: '25',
  density: '7.3',
  melting_point_celsius: '240',
  tensile_strength_mpa: '75',
  yield_strength_mpa: '50',
  composition: 'Sn-7.5Sb-3.5Cu (ASTM B23 Grade 2)',
  microstructure: 'Soft tin matrix with Cu6Sn5 needles and SbSn cuboids',
  material_type: 'alloy',
  hardness_category: 'very-soft',
  work_hardening: 'FALSE',
  magnetic: 'FALSE',
  corrosion_resistance: 'moderate',
  heat_treatment: 'As cast onto bearing shell',
  annealing_temperature_celsius: '',
  solution_treatment_temp_celsius: '',
  aging_temperature_celsius: '',
  special_notes: 'Babbitt bearing alloys are designed with a soft matrix (tin) containing hard intermetallic particles (Cu6Sn5 needles and SbSn cuboids). The soft matrix conforms to the shaft and embeds contaminants, while the hard particles carry the load. This dual-phase structure is critical to examine in failure analysis. Specimens often include the bearing shell (steel or bronze) interface, which creates a hard/soft boundary requiring edge-retaining mounting.',
  preparation_notes: 'Babbitt is a soft (24 HB, ~25 HV) tin-based bearing alloy with hard Cu6Sn5 needle and SbSn cuboid intermetallics in a soft tin matrix. The extreme hardness contrast between the soft matrix and hard intermetallics makes relief the primary preparation challenge. Specimens frequently include the steel or bronze bearing shell, creating a hard/soft interface that requires careful edge retention. Commonly examined for failure analysis of engine bearings, turbine bearings, and industrial machinery.',
  sectioning_notes: 'Use a low-speed abrasive cut-off wheel or diamond saw with continuous coolant. Cutting speed: 100-200 RPM with low feed rate. The low solidus temperature (~240\u00B0C) requires adequate cooling. For bearing failures, section perpendicular to the running surface to reveal the bearing surface, Babbitt layer, and backing shell in one cross-section. If the bearing shell is steel, use an alumina blade appropriate for both materials. Leave 2-3 mm allowance for grinding.',
  mounting_notes: 'Cold mounting with castable epoxy is required due to the low melting point (~240\u00B0C). Edge-retaining mounting compounds are essential, especially when examining the Babbitt/bearing shell interface. Vacuum impregnation is recommended if the Babbitt layer has cracks, porosity, or delamination from the shell (common in failure analysis specimens). The mount hardness should support the soft Babbitt during grinding to prevent edge rounding at the bearing surface.',
  grinding_notes: 'The softness (24 HB) and dual-phase structure require careful grinding. Start at 320 grit SiC. Use light pressure (15-20 N per 30 mm sample). Disc speed: 150-250 RPM. The hard Cu6Sn5 and SbSn intermetallics will resist removal while the soft tin matrix grinds quickly, creating relief if pressure is too high. Progress through 400, 600, 800, 1200 grit.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>320 grit:</strong> Remove sectioning damage (15-30 seconds). Light pressure.</li><li><strong>400 grit:</strong> Remove previous scratches (15-30 seconds).</li><li><strong>600 grit:</strong> Refinement (15-30 seconds).</li><li><strong>800 grit:</strong> Prepare for polishing (15-30 seconds).</li><li><strong>1200 grit:</strong> Final grinding (15-30 seconds).</li></ul>If the specimen includes a steel bearing shell, the grinding rate differential between the hard steel and soft Babbitt requires extra attention. Grind just long enough at each step to remove previous scratches.',
  polishing_notes: 'Use napless cloths throughout to minimize the extreme relief risk between the tin matrix and hard intermetallics.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>6\u03BCm diamond:</strong> 2-3 minutes on a napless synthetic pad with light pressure (12-18 N). Monitor for relief around Cu6Sn5 needles and SbSn cuboids.</li><li><strong>3\u03BCm diamond:</strong> 2-3 minutes on a napless pad (10-15 N). Continue monitoring for relief.</li><li><strong>1\u03BCm diamond:</strong> 1-2 minutes on a napless pad (8-12 N).</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 1-2 minutes or vibratory polishing for 2-4 hours. Vibratory polishing is strongly recommended for Babbitt due to the extreme hardness contrast. It produces a flat, relief-free surface that accurately reveals the intermetallic distribution.</li></ul>If the specimen includes a steel shell, monitor for relief at the Babbitt/steel interface.',
  etching_notes: 'Babbitt responds to several etchants. The Cu6Sn5 needles and SbSn cuboids can often be distinguished in the as-polished condition under brightfield illumination.<br /><br /><strong>2% Nital (Chemical Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 2 ml HNO\u2083, 98 ml ethanol</li><li><strong>Application:</strong> Immerse for 5-15 seconds.</li><li><strong>Reveals:</strong> Tin matrix grain boundaries, Cu6Sn5 needles, and SbSn cuboids.</li><li><strong>Rinse:</strong> Ethanol, then dry with warm air.</li></ul><strong>5% FeCl3 in Ethanol (Chemical Etching)</strong> - For enhanced phase contrast:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 5 g FeCl\u2083, 100 ml ethanol</li><li><strong>Application:</strong> Immerse for 5-10 seconds.</li><li><strong>Reveals:</strong> Excellent contrast between Cu6Sn5 (bright) and SbSn (dark angular cuboids) in the tin matrix. Preferred for phase identification and distribution analysis.</li></ul><strong>Etching strategy for failure analysis:</strong> If examining the Babbitt/shell interface, etch lightly to avoid attacking the interface bond. For fatigue crack analysis, the as-polished condition may be preferred to preserve crack morphology.',
  recommended_grinding_sequence: '[320,400,600,800,1200]',
  recommended_polishing_sequence: '[6\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[2% Nital,5% FeCl3 in Ethanol]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM B23]',
  iso_standards: '',
  related_guide_slugs: '[failure-analysis]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Engine bearings,Turbine bearings,Industrial machinery,Marine propulsion]',
  typical_uses: '[Crankshaft bearings,Turbine journal bearings,Compressor bearings,Large rotating equipment]',
  detailed_description: 'Tin-based bearing alloy (white metal) with Cu6Sn5 needles and SbSn cuboids in a soft tin matrix. Designed for conformability and embedded contaminant tolerance. Common in failure analysis of rotating equipment.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '87',
  view_count: '0',
  save_count: '0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preparation_difficulty: 'hard',
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

console.log(`\nSuccessfully added ${materials.length} materials:`);
materials.forEach(m => console.log(`  - ${m.name} (${m.slug})`));
console.log('\nDone!');
