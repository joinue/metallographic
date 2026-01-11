#!/usr/bin/env python3
"""
Script to enhance materials with brief preparation notes by generating
detailed preparation instructions based on material properties.
"""

import csv
import json
import re
from typing import Dict, List, Optional

def parse_json_array(value: str) -> List[str]:
    """Parse a JSON array string from CSV."""
    if not value or value.strip() == '':
        return []
    try:
        return json.loads(value)
    except:
        return []

def get_hardness_category(hardness: str, hardness_hb: str, hardness_hrc: str, hardness_hv: str) -> str:
    """Determine hardness category from hardness values."""
    if not hardness:
        return 'medium'
    
    # Extract numeric value
    match = re.search(r'(\d+)', hardness)
    if match:
        value = int(match.group(1))
        
        # Check if it's HV (very hard)
        if 'HV' in hardness.upper() or (hardness_hv and int(hardness_hv) > 1000):
            return 'very-hard'
        
        # Check HB or HRC
        if 'HB' in hardness.upper() or (hardness_hb and int(hardness_hb) > 0):
            hb_value = value if 'HB' in hardness.upper() else (int(hardness_hb) if hardness_hb else 0)
            if hb_value < 150:
                return 'soft'
            elif hb_value < 250:
                return 'medium'
            else:
                return 'hard'
        elif 'HRC' in hardness.upper() or (hardness_hrc and int(hardness_hrc) > 0):
            hrc_value = value if 'HRC' in hardness.upper() else (int(hardness_hrc) if hardness_hrc else 0)
            if hrc_value < 30:
                return 'soft'
            elif hrc_value < 50:
                return 'medium'
            else:
                return 'hard'
    
    return 'medium'

def generate_sectioning_notes(material: Dict, category: str, hardness_cat: str) -> str:
    """Generate detailed sectioning notes."""
    name = material.get('name', '')
    
    if category == 'Ceramic':
        return f"""Use diamond saw with continuous coolant flow. Diamond saws are essential for cutting hard ceramic materials. Standard diamond blade (0.3-0.5 mm thickness) is appropriate. Use adequate coolant flow to prevent overheating and minimize thermal shock. Cutting speed: 100-200 RPM for most diamond saws. Apply light to moderate pressure - the very hard material requires careful handling to avoid cracking. Avoid forcing the cut which can cause blade damage and sample cracking. Leave adequate allowance (~1-2 mm) for grinding away any damage from cutting."""
    
    elif category in ['Titanium Alloy']:
        return f"""Use slow-speed diamond saw with continuous coolant flow. Diamond saws are preferred for titanium alloys to minimize deformation and work hardening. Standard diamond blade (0.3-0.5 mm thickness) is appropriate. Use adequate coolant flow to prevent overheating and minimize work hardening. The reactive nature of titanium requires careful handling. Cutting speed: 150-250 RPM for most diamond saws. Apply light to moderate pressure - the material can work-harden if excessive pressure is applied. Avoid forcing the cut which can cause sample damage and work hardening. Leave adequate allowance (~1-2 mm) for grinding away the heat-affected zone and any deformation from cutting."""
    
    elif category in ['Aluminum Alloy', 'Magnesium Alloy']:
        return f"""Use slow-speed diamond saw or abrasive cut-off wheel designed for non-ferrous materials. Standard cut-off wheel (1.0-1.5 mm thickness) is appropriate. Use adequate coolant flow to prevent overheating and minimize deformation. The soft material requires gentle handling. Cutting speed: 150-250 RPM for most cut-off saws. Apply light to moderate pressure - the soft material requires gentle handling to avoid excessive deformation and work hardening. Avoid forcing the cut which can cause sample damage, work hardening, and significant deformation. Leave adequate allowance (~1-2 mm) for grinding away the heat-affected zone and any deformation from cutting."""
    
    elif category in ['Copper Alloy', 'Nickel Alloy']:
        return f"""Use slow-speed diamond saw or abrasive cut-off wheel designed for non-ferrous materials. Standard cut-off wheel (1.0-1.5 mm thickness) is appropriate. Use adequate coolant flow to prevent overheating and minimize deformation. Cutting speed: 150-250 RPM for most cut-off saws. Apply steady, moderate pressure - the material allows for reasonable feed rates. Avoid forcing the cut which can cause wheel wear and sample damage. Leave adequate allowance (~2-3 mm) for grinding away the heat-affected zone from cutting."""
    
    elif category == 'Stainless Steel':
        return f"""Use abrasive cut-off wheel designed for stainless steel (Al₂O₃ or SiC abrasive). Standard cut-off wheel (1.0-1.5 mm thickness) is appropriate. Use adequate coolant flow to prevent overheating - excessive heat can cause sensitization (chromium carbide precipitation) in the heat-affected zone. Cutting speed: 200-300 RPM for most cut-off saws. Apply steady, moderate pressure - the material allows for reasonable feed rates. Avoid forcing the cut which can cause wheel wear and sample damage. Leave adequate allowance (~2-3 mm) for grinding away the heat-affected zone from cutting."""
    
    elif category in ['Carbon Steel', 'Tool Steel', 'Cast Iron']:
        return f"""Use abrasive cut-off wheel designed for steel (Al₂O₃ or SiC abrasive). Standard cut-off wheel (1.0-1.5 mm thickness) is appropriate. Use adequate coolant flow to prevent overheating - excessive heat can affect the microstructure. Cutting speed: 200-300 RPM for most cut-off saws. Apply steady, moderate pressure - the material allows for reasonable feed rates. Avoid forcing the cut which can cause wheel wear and sample damage. Leave adequate allowance (~2-3 mm) for grinding away the heat-affected zone from cutting."""
    
    else:
        return f"""Use abrasive cut-off wheel with adequate coolant flow. Standard cut-off wheel (1.0-1.5 mm thickness) is appropriate. Use adequate coolant flow to prevent overheating. Cutting speed: 200-300 RPM for most cut-off saws. Apply steady, moderate pressure. Avoid forcing the cut which can cause wheel wear and sample damage. Leave adequate allowance (~2-3 mm) for grinding away the heat-affected zone from cutting."""

def generate_mounting_notes(material: Dict, category: str, hardness_cat: str) -> str:
    """Generate detailed mounting notes."""
    name = material.get('name', '')
    
    base_notes = """Cold mounting with epoxy resin is preferred to avoid heat that could affect the microstructure. Use a low-shrinkage epoxy resin for best edge retention. Ensure complete cure before grinding to prevent edge rounding and maintain sample integrity."""
    
    hot_mounting = """<br /><br />Hot compression mounting is acceptable if the part tolerates ~150-180°C and moderate pressure (2000-3000 psi for phenolic). Use phenolic or epoxy-phenolic resins. Ensure proper cooling under pressure to minimize shrinkage."""
    
    if category in ['Ceramic']:
        return base_notes + """ The very hard material requires careful handling during mounting to avoid cracking. For cutting tool and wear-resistant applications, ensure the mounting material provides adequate edge retention."""
    
    elif category in ['Titanium Alloy', 'Aluminum Alloy', 'Magnesium Alloy']:
        return base_notes + hot_mounting + f""" The material requires careful handling during mounting to avoid deformation. For critical applications, ensure the mounting material is compatible with the intended use environment."""
    
    elif category in ['Stainless Steel']:
        return base_notes + hot_mounting + """ For critical applications, ensure the mounting material is compatible with the intended use environment and provides adequate edge retention for corrosion analysis."""
    
    else:
        return base_notes + hot_mounting

def generate_grinding_notes(material: Dict, category: str, hardness_cat: str, grinding_seq: List[str]) -> str:
    """Generate detailed grinding notes."""
    name = material.get('name', '')
    hardness = material.get('hardness', '')
    
    # Determine pressure and timing based on hardness
    if hardness_cat == 'soft':
        pressure = "20-30 N per 30 mm sample"
        time_range = "20-40 seconds"
        start_grit = "240" if "240" in str(grinding_seq) else "120"
        warning = "the soft material is prone to smearing if too much pressure is applied"
    elif hardness_cat == 'medium':
        pressure = "25-35 N per 30 mm sample"
        time_range = "30-60 seconds"
        start_grit = "120"
        warning = "avoid excessive force that could cause work hardening"
    elif hardness_cat == 'hard' or hardness_cat == 'very-hard':
        pressure = "30-40 N per 30 mm sample"
        time_range = "40-90 seconds"
        start_grit = "120"
        warning = "the hard material may require longer grinding times"
    else:
        pressure = "25-35 N per 30 mm sample"
        time_range = "30-60 seconds"
        start_grit = "120"
        warning = "use appropriate pressure"
    
    # Build grinding sequence
    grits = [g for g in grinding_seq if g.isdigit() or 'diamond' in g.lower()]
    if not grits:
        grits = ['120', '240', '320', '400', '600']
    
    sequence_html = ""
    for i, grit in enumerate(grits[:5]):  # Limit to 5 steps
        grit_num = re.search(r'(\d+)', grit)
        if grit_num:
            grit_num = grit_num.group(1)
            step_name = f"{grit_num} grit"
            if i == 0:
                step_desc = f"Remove sectioning damage ({time_range})). Use moderate pressure to remove heat-affected zone."
            else:
                step_desc = f"Remove previous scratches ({time_range}). Ensure complete scratch removal."
            sequence_html += f'<li><strong>{step_name}:</strong> {step_desc}</li>'
    
    intro = f"""The {hardness_cat}ness ({hardness}) of {name} requires careful grinding. Use standard SiC grinding papers with adequate water lubrication. Disc speed: 200-300 RPM. Apply light to moderate pressure ({pressure}) - {warning}. Use sharp, fresh grinding papers to minimize deformation."""
    
    if category in ['Aluminum Alloy', 'Magnesium Alloy']:
        intro += """ Over-grinding can affect grain boundary revelation during etching. The work hardening behavior means strain-hardened material may show different grinding characteristics than annealed material."""
    
    if category == 'Stainless Steel':
        intro += """ The austenitic structure can work-harden, so use sharp abrasives and avoid excessive pressure."""
    
    return f"""{intro}<br /><br /><strong>Grinding sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">{sequence_html}</ul>Always rotate the specimen holder 90° between steps to ensure complete scratch removal. Use complementary rotation (platen and holder same direction, different speeds) rather than contra-rotation to minimize deformation. Adequate water lubrication is critical - avoid drying during grinding which can cause smearing."""

def generate_polishing_notes(material: Dict, category: str, hardness_cat: str, polishing_seq: List[str]) -> str:
    """Generate detailed polishing notes."""
    name = material.get('name', '')
    hardness = material.get('hardness', '')
    
    # Determine pressure based on hardness
    if hardness_cat == 'soft':
        pressure_6um = "20-25 N per 30 mm sample"
        pressure_3um = "15-20 N"
        pressure_1um = "12-18 N"
        pad_type = "soft synthetic pad"
        warning = "Monitor constantly for smearing and reduce pressure if any deformation is observed"
    elif hardness_cat == 'medium':
        pressure_6um = "25-35 N per 30 mm sample"
        pressure_3um = "20-30 N"
        pressure_1um = "20-30 N"
        pad_type = "medium-hard synthetic pad"
        warning = "ensure complete scratch removal at each step"
    else:  # hard or very-hard
        pressure_6um = "30-40 N per 30 mm sample"
        pressure_3um = "25-35 N"
        pressure_1um = "25-35 N"
        pad_type = "medium-hard synthetic pad"
        warning = "the hard material may require longer polishing times"
    
    # Parse polishing sequence
    diamond_steps = []
    final_step = None
    
    for step in polishing_seq:
        step_lower = step.lower()
        if 'colloidal' in step_lower or 'silica' in step_lower or '0.05' in step_lower:
            final_step = step
        elif 'diamond' in step_lower:
            diamond_steps.append(step)
    
    # Default sequences if not provided
    if not diamond_steps:
        if hardness_cat == 'soft':
            diamond_steps = ['6μm diamond', '3μm diamond', '1μm diamond']
        else:
            diamond_steps = ['9μm diamond', '3μm diamond', '1μm diamond']
    
    if not final_step:
        final_step = '0.05μm colloidal silica'
    
    # Build polishing sequence HTML
    sequence_html = ""
    
    # First diamond step
    if diamond_steps:
        first = diamond_steps[0]
        size_match = re.search(r'(\d+(?:\.\d+)?)', first)
        size_str = size_match.group(1) if size_match else "6"
        sequence_html += f'<li><strong>{size_str}μm diamond:</strong> 2-4 minutes on a {pad_type} (e.g., TEXPAN) with light to moderate pressure ({pressure_6um}). Start with {size_str}μm to minimize damage. {warning}.</li>'
    
    # Second diamond step
    if len(diamond_steps) > 1:
        second = diamond_steps[1]
        size_match = re.search(r'(\d+(?:\.\d+)?)', second)
        size_str = size_match.group(1) if size_match else "3"
        sequence_html += f'<li><strong>{size_str}μm diamond:</strong> 2-4 minutes on a {pad_type} (e.g., TEXPAN) with light pressure ({pressure_3um}). Continue removing scratches from previous step.</li>'
    
    # Third diamond step
    if len(diamond_steps) > 2:
        third = diamond_steps[2]
        size_match = re.search(r'(\d+(?:\.\d+)?)', third)
        size_str = size_match.group(1) if size_match else "1"
        sequence_html += f'<li><strong>{size_str}μm diamond:</strong> 2-3 minutes on a {pad_type} with lighter pressure ({pressure_1um}). These pads provide gentle material removal.</li>'
    
    # Final step
    final_pad = "soft final polishing pad (e.g., MICROPAD)" if hardness_cat == 'soft' else "high-napped final polishing pad (e.g., MICROPAD)"
    sequence_html += f'<li><strong>{final_step}:</strong> 1-2 minutes on a {final_pad} with very light pressure. This removes any remaining fine scratches and prepares the surface for etching. Monitor for relief - reduce polishing time if excessive relief develops.</li>'
    
    intro = f"""The {hardness_cat}ness requires careful polishing. Use diamond polishing with appropriate polishing pads for each stage. Apply light to moderate pressure throughout to prevent deformation."""
    
    if category in ['Aluminum Alloy', 'Magnesium Alloy']:
        intro += """ The work hardening behavior means strain-hardened material may show different polishing characteristics than annealed material."""
    
    return f"""{intro}<br /><br /><strong>Diamond polishing sequence:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">{sequence_html}</ul>Use appropriate polishing lubricants. The {hardness_cat} material means polishing times should be sufficient but not excessive - avoid over-polishing which can cause relief and affect grain boundary revelation. Monitor the surface frequently under the microscope to check for smearing or excessive relief."""

def generate_etching_notes(material: Dict, category: str, hardness_cat: str, etchants: List[str]) -> str:
    """Generate detailed etching notes."""
    name = material.get('name', '')
    composition = material.get('composition', '')
    microstructure = material.get('microstructure', '')
    
    # Get common etchants
    if not etchants:
        # Default etchants by category
        if category == 'Carbon Steel':
            etchants = ['2% Nital', '4% Picral']
        elif category == 'Stainless Steel':
            etchants = ['Glyceregia', 'Aqua Regia', 'Electrolytic 10% Oxalic']
        elif category == 'Aluminum Alloy':
            etchants = ["Keller's Reagent", '0.5% HF']
        elif category == 'Titanium Alloy':
            etchants = ["Kroll's Reagent", "Modified Kroll's"]
        elif category in ['Copper Alloy', 'Nickel Alloy']:
            etchants = ['Ammonium Persulfate', 'Ferric Chloride']
        else:
            etchants = ['Standard etchant']
    
    # Generate etchant details
    etchant_details = []
    
    for etchant in etchants[:2]:  # Limit to 2 primary etchants
        etchant_lower = etchant.lower()
        
        if 'nital' in etchant_lower:
            conc_match = re.search(r'(\d+)', etchant)
            conc_str = conc_match.group(1) if conc_match else "2"
            conc_num = int(conc_str)
            etchant_details.append(f"""
<strong>{conc_str}% Nital (Chemical Etching)</strong> - Primary choice for carbon steels:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li><strong>Composition:</strong> {conc_str}ml HNO₃ (concentrated), {100-conc_num}ml ethanol</li>
<li><strong>Preparation:</strong> Add nitric acid to ethanol slowly with stirring. Prepare fresh for best results. Solution is stable for several days if stored properly.</li>
<li><strong>Application:</strong> Immerse sample or swab for 5-15 seconds. Standard etchant for carbon steels.</li>
<li><strong>Reveals:</strong> Ferrite grain boundaries and pearlite structure clearly. Excellent for general microstructure examination.</li>
<li><strong>Rinse:</strong> Immediately with water, then ethanol. Dry with compressed air or warm air to avoid staining.</li>
<li><strong>Note:</strong> Prepare fresh when needed. Shelf life: several days. Use in fume hood.</li>
</ul>""")
        
        elif 'picral' in etchant_lower:
            conc_match = re.search(r'(\d+)', etchant)
            conc_str = conc_match.group(1) if conc_match else "4"
            etchant_details.append(f"""
<strong>{conc_str}% Picral (Chemical Etching)</strong> - For revealing pearlite structure:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li><strong>Composition:</strong> {conc_str}g picric acid, 100ml ethanol</li>
<li><strong>Preparation:</strong> Dissolve picric acid in ethanol with stirring. Prepare fresh for best results. Solution is stable for several weeks if stored properly.</li>
<li><strong>Application:</strong> Immerse sample or swab for 10-60 seconds. Excellent for revealing pearlite structure without attacking ferrite boundaries.</li>
<li><strong>Reveals:</strong> Pearlite structure clearly with excellent contrast. Less aggressive on ferrite grain boundaries than nital.</li>
<li><strong>Rinse:</strong> Immediately with water, then ethanol. Dry with compressed air.</li>
<li><strong>Note:</strong> Prepare fresh when needed. Shelf life: several weeks if stored properly. Use in fume hood. Picric acid is explosive when dry - keep moist and handle with care.</li>
</ul>""")
        
        elif 'glyceregia' in etchant_lower:
            etchant_details.append(f"""
<strong>Glyceregia (Chemical Etching)</strong> - Primary choice for general microstructure:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li><strong>Composition:</strong> 10ml glycerol, 15ml HCl, 5ml HNO₃</li>
<li><strong>Preparation:</strong> Add acids to glycerol slowly with stirring. Prepare fresh for best results. The glycerol moderates the reaction rate.</li>
<li><strong>Application:</strong> Immerse sample or swab for 10-30 seconds. Classic general-purpose micro-etchant for austenitic stainless steels and nickel alloys.</li>
<li><strong>Reveals:</strong> Grain boundaries, grain structure, and twin boundaries clearly. Excellent for general microstructure examination.</li>
<li><strong>Rinse:</strong> Immediately with water, then ethanol. Dry with compressed air or warm air to avoid staining.</li>
<li><strong>Note:</strong> Prepare fresh when needed. Shelf life: several hours. Use in fume hood.</li>
</ul>""")
        
        elif 'kroll' in etchant_lower:
            etchant_details.append(f"""
<strong>Kroll's Reagent (Chemical Etching)</strong> - Primary choice for titanium alloys:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li><strong>Composition:</strong> 2ml HF, 4ml HNO₃, 94ml H₂O</li>
<li><strong>Preparation:</strong> Add acids to water slowly with stirring. Prepare fresh for best results. Store in plastic container (HF attacks glass).</li>
<li><strong>Application:</strong> Immerse sample or swab for 5-15 seconds. Standard etchant for titanium alloys.</li>
<li><strong>Reveals:</strong> Alpha and beta phases, grain boundaries, and grain structure clearly. Excellent for general microstructure examination.</li>
<li><strong>Rinse:</strong> Immediately with water, then ethanol. Dry with compressed air.</li>
<li><strong>Note:</strong> Prepare fresh when needed. Shelf life: several weeks if stored properly. Use in fume hood. HF is highly toxic - use proper PPE.</li>
</ul>""")
        
        elif 'keller' in etchant_lower:
            etchant_details.append(f"""
<strong>Keller's Reagent (Chemical Etching)</strong> - Primary choice for general microstructure:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li><strong>Composition:</strong> 2ml HF, 3ml HCl, 5ml HNO₃, 190ml H₂O</li>
<li><strong>Preparation:</strong> Add acids to water slowly with stirring. Prepare fresh for best results. Store in plastic container (HF attacks glass).</li>
<li><strong>Application:</strong> Immerse sample or swab for 10-20 seconds. Classic general-purpose micro-etchant for Al alloys.</li>
<li><strong>Reveals:</strong> Grain boundaries and grain structure clearly. Excellent for general microstructure examination.</li>
<li><strong>Rinse:</strong> Immediately with water, then alcohol. Dry with compressed air or warm air to avoid staining.</li>
<li><strong>Note:</strong> Prepare fresh when needed. Shelf life: several weeks if stored properly. Use in fume hood.</li>
</ul>""")
        
        else:
            # Generic etchant
            etchant_details.append(f"""
<strong>{etchant} (Chemical Etching)</strong> - Standard etchant for this material:<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li><strong>Application:</strong> Follow standard procedures for {etchant}.</li>
<li><strong>Reveals:</strong> Grain boundaries and microstructure clearly.</li>
<li><strong>Rinse:</strong> Immediately with water, then ethanol. Dry with compressed air.</li>
<li><strong>Note:</strong> Use appropriate safety measures. Consult material-specific guidelines.</li>
</ul>""")
    
    strategy = f"""<strong>Etching Strategy:</strong><ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li>Start with {etchants[0]} for general microstructure examination</li>
<li>Always clean and degrease before etching</li>
<li>Use short initial etch times (a few seconds), check under the microscope, repeat if needed</li>
<li>Check etching progress frequently - over-etching can obscure fine details</li>
</ul>"""
    
    safety = """<strong>Safety:</strong> All etchants require proper PPE (gloves, safety glasses, lab coat), proper fume hood, and appropriate safety measures. Handle with care."""
    
    intro = f"""{name} responds well to standard etchants for {category.lower()} materials. The {microstructure.lower() if microstructure else 'microstructure'} will reveal clearly with appropriate etchants."""
    
    return f"""{intro} {' '.join(etchant_details)}{strategy}{safety}"""

def is_brief(note: str) -> bool:
    """Check if a preparation note is brief (needs enhancement)."""
    if not note or len(note.strip()) < 50:
        return True
    # Check if it has detailed formatting (HTML lists, strong tags, etc.)
    if '<strong>' in note or '<ul>' in note:
        return False
    # Check length
    if len(note) < 200:
        return True
    return False

def enhance_material(material: Dict) -> Dict:
    """Enhance a single material's preparation notes."""
    category = material.get('category', '')
    hardness = material.get('hardness', '')
    hardness_hb = material.get('hardness_hb', '')
    hardness_hrc = material.get('hardness_hrc', '')
    hardness_hv = material.get('hardness_hv', '')
    
    hardness_cat = get_hardness_category(hardness, hardness_hb, hardness_hrc, hardness_hv)
    
    # Check which notes need enhancement
    sectioning = material.get('sectioning_notes', '')
    mounting = material.get('mounting_notes', '')
    grinding = material.get('grinding_notes', '')
    polishing = material.get('polishing_notes', '')
    etching = material.get('etching_notes', '')
    
    grinding_seq = parse_json_array(material.get('recommended_grinding_sequence', '[]'))
    polishing_seq = parse_json_array(material.get('recommended_polishing_sequence', '[]'))
    etchants = parse_json_array(material.get('common_etchants', '[]'))
    
    # Enhance notes that are brief
    if is_brief(sectioning):
        material['sectioning_notes'] = generate_sectioning_notes(material, category, hardness_cat)
    
    if is_brief(mounting):
        material['mounting_notes'] = generate_mounting_notes(material, category, hardness_cat)
    
    if is_brief(grinding):
        material['grinding_notes'] = generate_grinding_notes(material, category, hardness_cat, grinding_seq)
    
    if is_brief(polishing):
        material['polishing_notes'] = generate_polishing_notes(material, category, hardness_cat, polishing_seq)
    
    if is_brief(etching):
        material['etching_notes'] = generate_etching_notes(material, category, hardness_cat, etchants)
    
    return material

def main():
    """Main function to enhance all materials in CSV."""
    input_file = 'materials_rows.csv'
    output_file = 'materials_rows.csv'
    
    # Read CSV
    materials = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        materials = list(reader)
    
    # Enhance materials
    enhanced_count = 0
    for material in materials:
        if material.get('status', '') == 'published':
            original_sectioning = material.get('sectioning_notes', '')
            original_mounting = material.get('mounting_notes', '')
            original_grinding = material.get('grinding_notes', '')
            original_polishing = material.get('polishing_notes', '')
            original_etching = material.get('etching_notes', '')
            
            enhanced = enhance_material(material)
            
            # Check if any were enhanced
            if (enhanced.get('sectioning_notes', '') != original_sectioning or
                enhanced.get('mounting_notes', '') != original_mounting or
                enhanced.get('grinding_notes', '') != original_grinding or
                enhanced.get('polishing_notes', '') != original_polishing or
                enhanced.get('etching_notes', '') != original_etching):
                enhanced_count += 1
                print(f"Enhanced: {enhanced.get('name', 'Unknown')}")
    
    # Write back to CSV
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(materials)
    
    print(f"\nEnhanced {enhanced_count} materials with detailed preparation notes.")
    print(f"Updated CSV saved to {output_file}")

if __name__ == '__main__':
    main()

