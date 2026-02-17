/**
 * Adds 4 new Class 6 materials to materials_rows.csv
 * Materials: CoCrMo Cast (F75), CoCrMo Wrought (F1537), MP35N, Zircaloy-4
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

// 1. CoCrMo CAST (ASTM F75)
{
  id: uuid(),
  name: 'CoCrMo Cast (ASTM F75)',
  slug: 'cocrmo-cast-f75',
  category: 'Cobalt Alloy',
  class: '6',
  alternative_names: '[CoCrMo,Co-28Cr-6Mo,ASTM F75,Vitallium,Stellite 21,Cast CoCr,Cobalt-Chrome Cast]',
  tags: '[cobalt,biomedical,orthopedic,cast,investment-cast,implant]',
  hardness: '25-35 HRC',
  hardness_hb: '253',
  hardness_hrc: '25-35',
  hardness_hv: '280',
  density: '8.3',
  melting_point_celsius: '1350-1450',
  tensile_strength_mpa: '655',
  yield_strength_mpa: '450',
  composition: 'Co-28Cr-6Mo',
  microstructure: 'FCC cobalt-chromium matrix with M23C6 and M7C3 carbides at grain boundaries and within dendrites. As-cast dendritic structure with interdendritic carbide networks.',
  material_type: 'alloy',
  hardness_category: 'hard',
  work_hardening: 'TRUE',
  magnetic: 'FALSE',
  corrosion_resistance: 'excellent',
  heat_treatment: 'Solution annealed (1220\u00B0C) or as-cast',
  annealing_temperature_celsius: '1220',
  solution_treatment_temp_celsius: '1220',
  aging_temperature_celsius: '',
  special_notes: 'CoCrMo alloys work-harden significantly during grinding and polishing. Use sharp abrasives and avoid excessive pressure or dwell time. The carbide phases (M23C6, M7C3) are substantially harder than the matrix, creating relief if polishing is not carefully controlled. This alloy is the primary investment-cast orthopedic implant material; metallographic examination is routine for implant quality control and failure analysis of retrieved devices.',
  preparation_notes: 'CoCrMo cast (ASTM F75) is a hard, ductile cobalt-chromium alloy (25-35 HRC, ~280 HV) with a density of 8.3 g/cm\u00B3 and a melting range of 1350-1450\u00B0C. The as-cast microstructure features an FCC cobalt-chromium matrix with M23C6 and M7C3 carbides distributed along grain boundaries and within interdendritic regions. The hardness contrast between the matrix and carbide phases is significant. This alloy work-hardens readily, so preparation must use sharp abrasives with moderate pressure to avoid introducing deformation artifacts. Diamond grinding discs are preferred over SiC paper for more efficient material removal with less surface damage.',
  sectioning_notes: 'Use an abrasive cut-off wheel designed for hard non-ferrous or cobalt alloys with continuous coolant flow. An alumina (Al2O3) blade is suitable. Cutting speed: 2500-3500 RPM for standard abrasive wheels. The alloy is tough and work-hardens, so use moderate feed pressure and avoid stalling the blade. For precision work on retrieved implants, a low-speed diamond saw at 200-400 RPM with a diamond wafering blade provides minimal deformation. Leave 2-3 mm allowance for grinding to remove the heat-affected zone from sectioning.',
  mounting_notes: 'Compression mounting with standard phenolic or epoxy mounting compounds is appropriate. The high melting range (1350-1450\u00B0C) makes the alloy completely unaffected by mounting temperatures (150-180\u00B0C). For retrieved orthopedic implants or failure analysis specimens where edge retention at the bearing surface is critical, use an edge-retaining mounting compound (mineral-filled epoxy or diallyl phthalate). Cold mounting with castable epoxy is also acceptable and may be preferred for porous-coated implant surfaces to allow vacuum impregnation of the porous coating.',
  grinding_notes: 'CoCrMo is hard and work-hardens, so use firm pressure with sharp abrasives. Diamond grinding discs are preferred over SiC paper for more consistent results and reduced work hardening. Disc speed: 250-300 RPM. Apply 25-30 N per sample.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>240 grit:</strong> Remove sectioning damage and establish a flat plane (30-60 seconds). Firm, steady pressure.</li><li><strong>320 grit:</strong> Remove previous scratch pattern (30-45 seconds).</li><li><strong>400 grit:</strong> Continue refinement (30-45 seconds).</li><li><strong>600 grit:</strong> Fine grinding (20-40 seconds).</li><li><strong>800 grit:</strong> Final grinding step (20-40 seconds). Ensure all 600-grit scratches are removed before proceeding to polishing.</li></ul>Rotate specimen 90\u00B0 between steps. Use complementary rotation (specimen counter to disc). Abundant water lubrication. Check under the microscope before moving to polishing to confirm all grinding scratches are unidirectional from the final step.',
  polishing_notes: 'Use napless or low-nap pads throughout to control relief between the matrix and carbide phases.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>9\u03BCm diamond:</strong> 3-5 minutes on a napless composite pad at 20-25 N per sample. This step removes residual grinding damage and begins to level the surface.</li><li><strong>3\u03BCm diamond:</strong> 3-5 minutes on a napless synthetic pad at 20-25 N. Monitor for relief around carbide particles.</li><li><strong>1\u03BCm diamond:</strong> 2-4 minutes on a napless pad at 15-20 N. Surface should appear nearly scratch-free at this stage.</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 2-4 minutes on a porous chemical-mechanical pad at 10-15 N. The slight chemical action of colloidal silica helps remove the final deformation layer from this work-hardening alloy. Alternatively, vibratory polishing with colloidal silica for 4-8 hours produces excellent results for publication-quality microstructures.</li></ul>',
  etching_notes: 'CoCrMo responds well to electrolytic and immersion etching. Electrolytic methods provide the most consistent results for revealing the carbide network and grain structure.<br /><br /><strong>Electrolytic 10% HCl (Electrolytic Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 ml HCl (concentrated), 90 ml water</li><li><strong>Application:</strong> Electrolytic at 3-6 V DC for 5-15 seconds. Stainless steel cathode. Sample is anode.</li><li><strong>Reveals:</strong> M23C6 and M7C3 carbides clearly outlined against the CoCr matrix. Grain boundaries visible. Dendritic structure in as-cast specimens.</li><li><strong>Rinse:</strong> Water, then ethanol. Dry with warm air.</li></ul><strong>Mixed Acid HCl-H2O2 (Chemical Etching)</strong> - Alternative immersion etch:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 15 ml HCl, 10 ml H2O2 (30%), 100 ml water</li><li><strong>Application:</strong> Immerse for 10-30 seconds. Swab for more controlled etching.</li><li><strong>Reveals:</strong> Carbide distribution and general microstructure. Less selective than electrolytic method.</li></ul><strong>Glyceregia (Chemical Etching)</strong> - For grain boundaries:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 15 ml HCl, 10 ml glycerol, 5 ml HNO\u2083. Mix fresh before use.</li><li><strong>Application:</strong> Immerse for 15-60 seconds. Monitor closely; etch rate accelerates.</li><li><strong>Reveals:</strong> Grain boundaries and carbide outlines. Good for grain size measurement.</li><li><strong>Note:</strong> Glyceregia is unstable; prepare only the amount needed and discard after use.</li></ul><strong>Safety:</strong> Electrolytic etching requires DC power supply. Use fume hood for all etchants. Standard PPE with acid-resistant gloves.',
  recommended_grinding_sequence: '[240,320,400,600,800]',
  recommended_polishing_sequence: '[9\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[Electrolytic 10% HCl,Mixed Acid HCl-H2O2,Glyceregia]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM F75]',
  iso_standards: '[ISO 5832-4]',
  related_guide_slugs: '[medical-device-applications]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Orthopedic implants,Dental implants,Aerospace turbine components,Wear-resistant components]',
  typical_uses: '[Hip femoral heads,Knee femoral components,Dental crowns and bridges,Turbine vanes]',
  detailed_description: 'CoCrMo cast alloy (ASTM F75) is the primary investment-cast cobalt-chromium alloy used for orthopedic implants. The as-cast microstructure features M23C6 and M7C3 carbides in a CoCr FCC matrix. Widely examined in implant quality control and retrieval analysis.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '171',
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

// 2. CoCrMo WROUGHT (ASTM F1537)
{
  id: uuid(),
  name: 'CoCrMo Wrought (ASTM F1537)',
  slug: 'cocrmo-wrought-f1537',
  category: 'Cobalt Alloy',
  class: '6',
  alternative_names: '[CoCrMo Wrought,Co-28Cr-6Mo Low Carbon,ASTM F1537,Wrought CoCr,Forged CoCr]',
  tags: '[cobalt,biomedical,orthopedic,wrought,forged,implant]',
  hardness: '35-45 HRC',
  hardness_hb: '327',
  hardness_hrc: '35-45',
  hardness_hv: '340',
  density: '8.3',
  melting_point_celsius: '1350-1450',
  tensile_strength_mpa: '897',
  yield_strength_mpa: '517',
  composition: 'Co-28Cr-6Mo (low carbon)',
  microstructure: 'Recrystallized FCC grains with annealing twin boundaries. Fewer and smaller carbides than F75 due to low carbon content. Wrought processing eliminates cast dendritic structure.',
  material_type: 'alloy',
  hardness_category: 'hard',
  work_hardening: 'TRUE',
  magnetic: 'FALSE',
  corrosion_resistance: 'excellent',
  heat_treatment: 'Hot worked + solution annealed (1220\u00B0C)',
  annealing_temperature_celsius: '1220',
  solution_treatment_temp_celsius: '1220',
  aging_temperature_celsius: '',
  special_notes: 'The wrought (F1537) variant has a low carbon content compared to cast F75, resulting in significantly fewer carbides and a more homogeneous microstructure. The recrystallized grain structure with prominent annealing twins is the hallmark of this alloy. Work hardens aggressively during preparation. Higher yield and tensile strength than F75 due to wrought processing.',
  preparation_notes: 'CoCrMo wrought (ASTM F1537) is a hard, ductile cobalt-chromium alloy (35-45 HRC, ~340 HV) with a density of 8.3 g/cm\u00B3. Slightly harder than the cast F75 variant due to wrought processing. The microstructure features recrystallized equiaxed FCC grains with prominent annealing twin boundaries. Fewer carbides than F75 due to the low carbon specification, but those present are finer and more uniformly distributed. The alloy work-hardens aggressively, so sharp abrasives and controlled pressure are essential. Preparation approach is very similar to F75.',
  sectioning_notes: 'Use an abrasive cut-off wheel designed for hard non-ferrous or cobalt alloys with continuous coolant flow. The wrought alloy is tougher than the cast variant, so expect slightly slower cutting rates. For standard cut-off: 2500-3500 RPM with moderate feed pressure. For precision sectioning, a low-speed diamond saw at 200-400 RPM is preferred. Leave 2-3 mm allowance for grinding away the sectioning deformation zone.',
  mounting_notes: 'Compression mounting with standard phenolic or epoxy compounds is appropriate. The high melting range (1350-1450\u00B0C) is unaffected by mounting temperatures. For implant retrieval specimens (hip stems, knee tibial trays), edge-retaining mounting is recommended if examining the bearing or articulating surface. Cold mounting with castable epoxy works well for porous-coated surfaces; vacuum impregnation fills the porous coating for better retention during grinding.',
  grinding_notes: 'Very similar to F75. The wrought alloy is slightly harder and tougher, so expect marginally slower material removal. Diamond grinding discs preferred. Disc speed: 250-300 RPM. Apply 25-30 N per sample.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>240 grit:</strong> Remove sectioning damage and establish a flat plane (30-60 seconds). Firm, steady pressure.</li><li><strong>320 grit:</strong> Remove previous scratch pattern (30-45 seconds).</li><li><strong>400 grit:</strong> Continue refinement (30-45 seconds).</li><li><strong>600 grit:</strong> Fine grinding (20-40 seconds).</li><li><strong>800 grit:</strong> Final grinding step (20-40 seconds).</li></ul>Rotate specimen 90\u00B0 between steps. Complementary rotation. Abundant water lubrication throughout.',
  polishing_notes: 'Use napless or low-nap pads. The more homogeneous microstructure (fewer carbides) makes relief less of a concern than with F75, but careful technique is still required.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>9\u03BCm diamond:</strong> 3-5 minutes on a napless composite pad at 20-25 N per sample.</li><li><strong>3\u03BCm diamond:</strong> 3-5 minutes on a napless synthetic pad at 20-25 N.</li><li><strong>1\u03BCm diamond:</strong> 2-4 minutes on a napless pad at 15-20 N.</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 2-4 minutes on a porous chemical-mechanical pad at 10-15 N. The slight chemical attack of colloidal silica is particularly effective for revealing the twin boundaries characteristic of this alloy. Vibratory polishing (4-8 hours) is recommended for grain size analysis or EBSD preparation.</li></ul>',
  etching_notes: 'Same etchants as F75 work well, but the resulting microstructure appears very different due to the wrought processing and low carbon content.<br /><br /><strong>Electrolytic 10% HCl (Electrolytic Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 ml HCl (concentrated), 90 ml water</li><li><strong>Application:</strong> Electrolytic at 3-6 V DC for 5-15 seconds. Stainless steel cathode.</li><li><strong>Reveals:</strong> Equiaxed recrystallized grains with prominent annealing twin boundaries. Sparse, fine carbides visible along grain boundaries. No dendritic structure (unlike F75).</li><li><strong>Rinse:</strong> Water, then ethanol. Dry with warm air.</li></ul><strong>Mixed Acid HCl-H2O2 (Chemical Etching)</strong> - Alternative:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 15 ml HCl, 10 ml H2O2 (30%), 100 ml water</li><li><strong>Application:</strong> Immerse for 10-30 seconds or swab.</li><li><strong>Reveals:</strong> Grain boundaries and twin boundaries. General microstructure.</li></ul><strong>Glyceregia (Chemical Etching)</strong> - For grain boundaries:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 15 ml HCl, 10 ml glycerol, 5 ml HNO\u2083. Mix fresh.</li><li><strong>Application:</strong> Immerse for 15-60 seconds.</li><li><strong>Reveals:</strong> Grain boundaries and twins. Preferred for ASTM grain size measurement per ASTM E112.</li></ul><strong>Safety:</strong> Use fume hood. Standard PPE with acid-resistant gloves. DC power supply for electrolytic etching.',
  recommended_grinding_sequence: '[240,320,400,600,800]',
  recommended_polishing_sequence: '[9\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[Electrolytic 10% HCl,Mixed Acid HCl-H2O2,Glyceregia]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM F1537]',
  iso_standards: '[ISO 5832-12]',
  related_guide_slugs: '[medical-device-applications]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Orthopedic implants,Surgical instruments,Dental devices,Spinal implants]',
  typical_uses: '[Hip stems,Knee tibial trays,Surgical instruments,Spinal rods]',
  detailed_description: 'CoCrMo wrought alloy (ASTM F1537) is a low-carbon, wrought-processed cobalt-chromium alloy used for load-bearing orthopedic implants. Features recrystallized FCC grains with annealing twins and minimal carbides. Higher strength than cast F75.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '172',
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

// 3. MP35N
{
  id: uuid(),
  name: 'MP35N',
  slug: 'mp35n',
  category: 'Cobalt-Nickel Alloy',
  class: '6',
  alternative_names: '[MP35N,35Co-35Ni-20Cr-10Mo,UNS R30035,ASTM F562,Multiphase 35N]',
  tags: '[cobalt-nickel,biomedical,aerospace,high-strength,corrosion-resistant,pacemaker]',
  hardness: '45-50 HRC',
  hardness_hb: '430',
  hardness_hrc: '45-50',
  hardness_hv: '450',
  density: '8.43',
  melting_point_celsius: '1350-1440',
  tensile_strength_mpa: '1793',
  yield_strength_mpa: '1586',
  composition: '35Co-35Ni-20Cr-10Mo',
  microstructure: 'FCC matrix with HCP platelets formed during cold work and aging. Extremely fine precipitate structure in peak-aged condition. Annealing twins present in solution-treated condition.',
  material_type: 'alloy',
  hardness_category: 'hard',
  work_hardening: 'TRUE',
  magnetic: 'FALSE',
  corrosion_resistance: 'excellent',
  heat_treatment: 'Cold worked + aged (540-595\u00B0C)',
  annealing_temperature_celsius: '1065',
  solution_treatment_temp_celsius: '1065',
  aging_temperature_celsius: '540-595',
  special_notes: 'MP35N achieves its extraordinary strength (up to 1800 MPa UTS) through a combination of cold work and aging. The cold work introduces HCP platelets in the FCC matrix, and subsequent aging forms fine Co3Mo precipitates on these platelets. In the cold-worked + aged condition, the alloy is extremely hard (45-50 HRC) and very difficult to section and grind. The alloy is also highly resistant to corrosion and stress corrosion cracking, making it ideal for implantable medical devices.',
  preparation_notes: 'MP35N is a very hard (45-50 HRC, ~450 HV in cold-worked + aged condition), ductile cobalt-nickel alloy with a density of 8.43 g/cm\u00B3 and a melting range of 1350-1440\u00B0C. The extreme hardness combined with high ductility and work-hardening tendency makes this one of the more challenging alloys to prepare metallographically. The microstructure features an FCC matrix with HCP platelets and fine Co3Mo precipitates that are only resolvable by TEM. At optical magnifications, the solution-annealed condition shows equiaxed FCC grains with twins; the cold-worked condition shows elongated grains with heavy deformation bands.',
  sectioning_notes: 'Use an abrasive cut-off wheel rated for hard alloys (cobalt/nickel superalloys) with continuous heavy coolant flow. The extreme hardness and toughness make sectioning slow. For standard cut-off: 2500-3500 RPM with moderate to firm feed pressure. Avoid stalling, which causes local overheating and additional work hardening. For wire or rod specimens (pacemaker leads, fasteners), a precision wafering saw with a diamond blade at 200-400 RPM is recommended. Leave 2-3 mm allowance for grinding. Expect blade wear rates 2-3 times higher than for standard stainless steels.',
  mounting_notes: 'Compression mounting with standard phenolic or epoxy compounds is appropriate. The high melting range (1350-1440\u00B0C) is unaffected by mounting temperatures. For wire cross-sections (pacemaker leads), mount multiple wires together in a single mount for efficient preparation. Ensure wires are perpendicular to the mount surface for true transverse sections. Cold mounting with castable epoxy is acceptable; use a mount with hardness close to the specimen to avoid preferential grinding of the mount.',
  grinding_notes: 'MP35N in the cold-worked + aged condition is very hard. Diamond grinding discs are strongly preferred over SiC paper. The alloy will rapidly load and dull SiC papers. Disc speed: 250-300 RPM. Apply 25-30 N per sample.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>240 grit:</strong> Remove sectioning damage (45-90 seconds). Firm pressure. Expect slow removal.</li><li><strong>320 grit:</strong> Remove previous scratches (30-60 seconds).</li><li><strong>400 grit:</strong> Continue refinement (30-45 seconds).</li><li><strong>600 grit:</strong> Fine grinding (30-45 seconds).</li><li><strong>800 grit:</strong> Final grinding (20-40 seconds).</li></ul>Rotate specimen 90\u00B0 between steps. Use complementary rotation. Abundant water lubrication. The high hardness means longer grinding times at each step compared to the CoCrMo alloys. Fresh abrasive surfaces are critical; worn discs generate heat without removing material, increasing work hardening artifacts.',
  polishing_notes: 'Use napless pads throughout. The homogeneous single-phase microstructure (at optical magnification) means relief is minimal, but the work-hardened surface layer from grinding must be fully removed.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>9\u03BCm diamond:</strong> 4-6 minutes on a napless composite pad at 20-25 N per sample. This step removes the work-hardened layer from grinding.</li><li><strong>3\u03BCm diamond:</strong> 3-5 minutes on a napless synthetic pad at 20-25 N.</li><li><strong>1\u03BCm diamond:</strong> 2-4 minutes on a napless pad at 15-20 N.</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 3-5 minutes on a porous chemical-mechanical pad at 10-15 N. Extended colloidal silica polishing or vibratory polishing (6-12 hours) is recommended for revealing the fine deformation structure, grain boundaries, and twin boundaries in this alloy. The chemical-mechanical action of colloidal silica is particularly effective at removing the tenacious work-hardened layer.</li></ul>',
  etching_notes: 'MP35N responds to electrolytic and chemical etchants common for cobalt-nickel alloys.<br /><br /><strong>Electrolytic 10% Oxalic Acid (Electrolytic Etching)</strong> - Primary choice:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 10 g oxalic acid (H2C2O4), 100 ml water</li><li><strong>Application:</strong> Electrolytic at 3-6 V DC for 5-20 seconds. Stainless steel cathode.</li><li><strong>Reveals:</strong> Grain boundaries, twin boundaries, deformation bands in cold-worked specimens. In solution-annealed material, reveals equiaxed grains with prominent annealing twins.</li><li><strong>Rinse:</strong> Water, then ethanol. Dry with warm air.</li></ul><strong>Kalling\'s No. 2 (Chemical Etching)</strong> - Alternative:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 5 g CuCl2, 100 ml HCl, 100 ml ethanol</li><li><strong>Application:</strong> Immerse for 10-30 seconds or swab. Monitor closely.</li><li><strong>Reveals:</strong> General microstructure, grain boundaries, and cold work deformation structure. Provides good contrast between deformed and undeformed regions.</li></ul><strong>Safety:</strong> Use fume hood. DC power supply for electrolytic etching. Kalling\'s No. 2 contains CuCl2, which is toxic; wear appropriate gloves and eye protection.',
  recommended_grinding_sequence: '[240,320,400,600,800]',
  recommended_polishing_sequence: '[9\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[Electrolytic 10% Oxalic Acid,Kalling\'s No. 2]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM F562]',
  iso_standards: '',
  related_guide_slugs: '[medical-device-applications,aerospace-applications]',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Pacemaker leads,Medical fasteners,Undersea cables,Aerospace springs]',
  typical_uses: '[Cardiac pacing lead wire,Orthopedic fasteners,Subsea electrical connectors,High-performance springs and cables]',
  detailed_description: 'MP35N is an ultra-high-strength cobalt-nickel alloy strengthened by cold work and aging. Combines extreme strength (up to 1800 MPa) with excellent corrosion resistance, making it the standard material for implantable pacemaker leads and demanding aerospace and subsea applications.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '173',
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

// 4. ZIRCALOY-4
{
  id: uuid(),
  name: 'Zircaloy-4',
  slug: 'zircaloy-4',
  category: 'Zirconium Alloy',
  class: '6',
  alternative_names: '[Zircaloy-4,Zry-4,UNS R60804,ASTM B353 Grade R60804,Zr-4]',
  tags: '[zirconium,nuclear,fuel-cladding,reactive-metal,HCP]',
  hardness: '200 HV',
  hardness_hb: '190',
  hardness_hrc: '',
  hardness_hv: '200',
  density: '6.56',
  melting_point_celsius: '1850',
  tensile_strength_mpa: '510',
  yield_strength_mpa: '380',
  composition: 'Zr-1.5Sn-0.2Fe-0.1Cr',
  microstructure: 'Equiaxed alpha-zirconium (HCP) grains. Recrystallized condition shows uniform equiaxed grains. Cold-worked and stress-relieved condition shows elongated grains with residual deformation. Second-phase particles (Zr(Fe,Cr)2 intermetallics) dispersed at grain boundaries and within grains.',
  material_type: 'alloy',
  hardness_category: 'medium',
  work_hardening: 'TRUE',
  magnetic: 'FALSE',
  corrosion_resistance: 'excellent',
  heat_treatment: 'Recrystallized (580-620\u00B0C) or stress-relieved (480-520\u00B0C)',
  annealing_temperature_celsius: '580-620',
  solution_treatment_temp_celsius: '',
  aging_temperature_celsius: '',
  special_notes: 'SAFETY: Zirconium is PYROPHORIC in fine particle form (chips, filings, fine grinding debris). Grinding and polishing debris must be kept wet at all times and never allowed to dry out. Do not use vacuum systems to collect dry zirconium debris. Wet collection is mandatory. Keep water or appropriate extinguishing media nearby. Zircaloy-4 is the standard nuclear fuel cladding material; metallographic examination is critical for nuclear quality assurance, oxide layer thickness measurement, hydride orientation analysis, and post-irradiation examination (PIE).',
  preparation_notes: 'Zircaloy-4 is a medium-hard (200 HV) zirconium alloy with a density of 6.56 g/cm\u00B3 and a melting point of approximately 1850\u00B0C. The HCP crystal structure makes polarized light microscopy particularly valuable, as different grain orientations produce distinct colors under crossed polarizers. The alloy work-hardens moderately. The primary metallographic interests are grain size and orientation, hydride distribution and orientation, oxide layer thickness, and second-phase particle (SPP) distribution. CRITICAL SAFETY NOTE: Fine zirconium particles are pyrophoric. Keep all preparation debris wet. Never allow dry zirconium fines to accumulate.',
  sectioning_notes: 'Use an abrasive cut-off wheel with continuous heavy coolant flow. Alumina (Al2O3) blades are appropriate. Cutting speed: 2500-3500 RPM with moderate feed pressure. The material is moderately hard and somewhat gummy during cutting. For thin-walled fuel cladding tubes, use a low-speed precision wafering saw with a thin diamond blade at 200-400 RPM to avoid crushing or deforming the tube cross-section. Mount the tube in a support fixture or embed in wax before sectioning. Leave 1-2 mm allowance for grinding.<br /><br /><strong>SAFETY:</strong> Keep all cutting debris and coolant contained. Zirconium fines in dry form are pyrophoric. Do not allow coolant to evaporate on cutting debris. Collect all debris wet.',
  mounting_notes: 'Compression mounting with standard phenolic or epoxy compounds is appropriate for bulk material. The high melting point (1850\u00B0C) means mounting temperatures have no effect on the alloy. For fuel cladding tube cross-sections, cold mounting with castable epoxy under vacuum is strongly recommended to fill the tube interior and any oxide layer cracks. Edge retention is critical when measuring oxide layer thickness. Use an edge-retaining mounting compound (mineral-filled epoxy or diallyl phthalate) for oxide measurements. For hydride orientation studies, mount sections in both transverse and longitudinal orientations.',
  grinding_notes: 'Zircaloy-4 grinds well with standard techniques. SiC papers or diamond grinding discs are both suitable. Disc speed: 250-300 RPM. Apply 25-30 N per sample. The material is moderately hard and produces a good surface with standard grinding sequences.<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>240 grit:</strong> Remove sectioning damage (30-60 seconds). Moderate, steady pressure.</li><li><strong>320 grit:</strong> Remove previous scratches (30-45 seconds).</li><li><strong>400 grit:</strong> Continue refinement (20-40 seconds).</li><li><strong>600 grit:</strong> Fine grinding (20-30 seconds).</li><li><strong>800 grit:</strong> Final grinding step (20-30 seconds). Ensure all scratches from the previous step are removed.</li></ul>Rotate specimen 90\u00B0 between steps. Use complementary rotation. Abundant water lubrication is essential (also keeps debris wet for safety). Thorough cleaning between steps.<br /><br /><strong>SAFETY:</strong> Keep all grinding debris wet. Collect used papers and slurry in a wet container. Never vacuum dry zirconium grinding debris.',
  polishing_notes: 'Use napless or low-nap pads for best flatness, especially when measuring oxide layers or hydride spacing.<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>9\u03BCm diamond:</strong> 3-5 minutes on a napless composite pad at 20-25 N per sample.</li><li><strong>3\u03BCm diamond:</strong> 3-5 minutes on a napless synthetic pad at 20-25 N.</li><li><strong>1\u03BCm diamond:</strong> 2-4 minutes on a napless pad at 15-20 N.</li></ul><strong>Final polishing:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>0.05\u03BCm colloidal silica:</strong> 3-5 minutes on a porous chemical-mechanical pad at 10-15 N. Extended colloidal silica polishing (or vibratory polishing for 4-8 hours) is strongly recommended for polarized light microscopy, as it removes the surface deformation layer that obscures grain orientation contrast. The chemical-mechanical action of colloidal silica is critical for zirconium alloys; purely mechanical final polishing leaves a deformed layer that prevents accurate polarized light analysis.</li></ul><strong>SAFETY:</strong> Keep all polishing debris wet. Collect used pads and slurry in a wet container.',
  etching_notes: 'Zircaloy-4 is most commonly examined using polarized light microscopy on a well-polished (colloidal silica) surface without etching. The HCP crystal structure produces excellent grain orientation contrast under crossed polarizers. Chemical etching is used when polarized light is unavailable or for specific features.<br /><br /><strong>Polarized Light (No Etchant)</strong> - Primary method:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Application:</strong> Cross-polarized light with optional sensitive tint plate on a colloidal-silica-polished surface.</li><li><strong>Reveals:</strong> Grain size, grain orientation, texture, hydride platelets (appear as thin lines), and recrystallization state.</li></ul><strong>Kroll\'s-type Etchant (Chemical Etching)</strong> - For brightfield microscopy:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;"><li><strong>Composition:</strong> 1-3 ml HF, 2-6 ml HNO\u2083, 100 ml H\u2082O</li><li><strong>Application:</strong> Swab or immerse for 5-15 seconds. Start with the dilute end (1 ml HF, 2 ml HNO\u2083) and increase concentration if needed.</li><li><strong>Reveals:</strong> Grain boundaries, hydride platelets, second-phase particles (SPPs). Good general-purpose etchant.</li><li><strong>Rinse:</strong> Water, then ethanol. Dry with warm air.</li></ul><strong>Safety:</strong> Kroll\'s etchant contains HF, which is extremely dangerous. HF causes deep, painful burns and systemic fluoride poisoning. Always have calcium gluconate gel immediately available. Work in a fume hood. Wear HF-rated gloves (neoprene or butyl rubber, not latex or nitrile). Never work with HF alone. Follow all institutional HF safety protocols.',
  recommended_grinding_sequence: '[240,320,400,600,800]',
  recommended_polishing_sequence: '[9\u03BCm diamond,3\u03BCm diamond,1\u03BCm diamond,0.05\u03BCm colloidal silica]',
  common_etchants: '[Polarized Light (no etchant),Kroll\'s-type Etchant]',
  microstructure_image_url: '',
  material_image_url: '',
  astm_standards: '[ASTM B353]',
  iso_standards: '',
  related_guide_slugs: '',
  related_material_ids: '',
  similar_materials: '',
  applications: '[Nuclear fuel rod cladding,Nuclear structural components,Chemical processing,Marine applications]',
  typical_uses: '[PWR fuel cladding tubes,BWR fuel channels,Nuclear grid spacers,Nuclear structural tubing]',
  detailed_description: 'Zircaloy-4 is the standard zirconium alloy used for nuclear fuel cladding in pressurized and boiling water reactors. The HCP crystal structure enables polarized light microscopy for grain analysis. Metallographic examination is critical for nuclear quality assurance, hydride analysis, and oxide layer measurement. Fine zirconium particles are pyrophoric.',
  status: 'published',
  featured: 'FALSE',
  sort_order: '174',
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
