import { Metadata } from 'next'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('safety-fundamentals')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'chemical-safety', label: 'Chemical Safety' },
  { id: 'equipment-safety', label: 'Equipment Safety' },
  { id: 'personal-protection', label: 'Personal Protective Equipment' },
  { id: 'ventilation', label: 'Ventilation and Fume Control' },
  { id: 'waste-management', label: 'Waste Management' },
  { id: 'emergency-procedures', label: 'Emergency Procedures' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function SafetyFundamentalsGuide() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData } = getGuideStructuredData(guide)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <article className="py-12">
      <GuideSideNav sections={sections} />
      <div className="container-custom lg:pl-0 xl:pl-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Safety Fundamentals
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Basics Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Safety Fundamentals for Metallography</h1>
            <p className="text-xl text-gray-600">
              Essential safety practices for metallography laboratories. Learn about chemical safety, equipment safety, 
              personal protective equipment, and safe work practices to protect yourself and others.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#chemical-safety" className="text-primary-600 hover:underline">Chemical Safety</a></li>
              <li><a href="#equipment-safety" className="text-primary-600 hover:underline">Equipment Safety</a></li>
              <li><a href="#personal-protection" className="text-primary-600 hover:underline">Personal Protective Equipment</a></li>
              <li><a href="#ventilation" className="text-primary-600 hover:underline">Ventilation and Fume Control</a></li>
              <li><a href="#waste-management" className="text-primary-600 hover:underline">Waste Management</a></li>
              <li><a href="#emergency-procedures" className="text-primary-600 hover:underline">Emergency Procedures</a></li>
              <li><a href="#best-practices" className="text-primary-600 hover:underline">Best Practices</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Safety is paramount in metallography laboratories. Working with chemicals, rotating equipment, sharp 
                tools, and potentially hazardous materials requires careful attention to safety practices. This guide 
                covers essential safety fundamentals that every metallographer should know and follow.
              </p>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 font-semibold">
                  <strong>Important:</strong> Safety is your responsibility. Always follow your institution's safety 
                  policies and procedures. When in doubt, consult with your safety officer or supervisor. This guide 
                  provides general safety information but cannot replace institution-specific safety training and policies.
                </p>
              </div>
              <p>
                A safe laboratory environment protects not only you but also your colleagues, visitors, and the 
                environment. Taking safety seriously from the beginning establishes good habits and prevents accidents.
              </p>
            </section>

            <section id="chemical-safety" className="scroll-mt-24">
              <h2>Chemical Safety</h2>
              <p>
                Metallography involves working with various chemicals, including etchants, solvents, acids, and bases. 
                Proper handling, storage, and disposal of chemicals are essential for safety.
              </p>

              <h3>Understanding Safety Data Sheets (SDS)</h3>
              <p>
                Every chemical in your laboratory should have an accessible Safety Data Sheet (SDS). The SDS provides 
                critical information including:
              </p>
              <ul>
                <li><strong>Hazard identification:</strong> Physical and health hazards</li>
                <li><strong>Composition:</strong> Chemical ingredients and their concentrations</li>
                <li><strong>First aid measures:</strong> What to do in case of exposure</li>
                <li><strong>Firefighting measures:</strong> How to handle fires involving the chemical</li>
                <li><strong>Handling and storage:</strong> Safe practices for use and storage</li>
                <li><strong>Exposure controls:</strong> Personal protective equipment and exposure limits</li>
                <li><strong>Physical and chemical properties:</strong> Characteristics of the chemical</li>
                <li><strong>Stability and reactivity:</strong> Conditions to avoid and incompatible materials</li>
                <li><strong>Toxicological information:</strong> Health effects and exposure routes</li>
                <li><strong>Disposal considerations:</strong> Proper disposal methods</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Always:</strong> Read the SDS before using any chemical for the first time. Keep SDS documents 
                  accessible in your laboratory. Review SDS information regularly, especially if procedures change.
                </p>
              </div>

              <h3>Common Chemicals in Metallography</h3>
              <p>
                Some common chemicals used in metallography and their safety considerations:
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chemical</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Common Use</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Key Safety Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Nital (Nitric Acid in Alcohol)</td>
                      <td className="border border-gray-300 px-4 py-3">Steel etching</td>
                      <td className="border border-gray-300 px-4 py-3">Corrosive, flammable, toxic fumes. Use in fume hood. Avoid skin contact.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Picral (Picric Acid in Alcohol)</td>
                      <td className="border border-gray-300 px-4 py-3">Steel etching</td>
                      <td className="border border-gray-300 px-4 py-3">Explosive when dry. Must be kept wet (minimum 10% water). Store in cool, dark place. Never allow to dry out. Handle with extreme care.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Keller's Reagent</td>
                      <td className="border border-gray-300 px-4 py-3">Aluminum etching</td>
                      <td className="border border-gray-300 px-4 py-3">Contains HF (hydrofluoric acid) - extremely dangerous. Requires special handling, PPE, and calcium gluconate gel for first aid.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Kroll's Reagent</td>
                      <td className="border border-gray-300 px-4 py-3">Titanium etching</td>
                      <td className="border border-gray-300 px-4 py-3">Contains HF (hydrofluoric acid) - extremely dangerous. Requires special handling, PPE, and calcium gluconate gel for first aid.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Hydrofluoric Acid (HF)</td>
                      <td className="border border-gray-300 px-4 py-3">Various etching applications</td>
                      <td className="border border-gray-300 px-4 py-3">Extremely toxic, can cause severe burns and systemic poisoning. Requires specialized training, PPE, and calcium gluconate gel must be available.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Ethanol/Methanol</td>
                      <td className="border border-gray-300 px-4 py-3">Solvents, diluents</td>
                      <td className="border border-gray-300 px-4 py-3">Flammable. Use in well-ventilated areas. Avoid ignition sources.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Acetone</td>
                      <td className="border border-gray-300 px-4 py-3">Cleaning</td>
                      <td className="border border-gray-300 px-4 py-3">Flammable, volatile. Use in well-ventilated areas. Avoid skin contact.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Hydrochloric Acid</td>
                      <td className="border border-gray-300 px-4 py-3">Etching</td>
                      <td className="border border-gray-300 px-4 py-3">Corrosive, toxic fumes. Use in fume hood. Avoid skin and eye contact.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Safe Chemical Handling Practices</h3>
              <ul>
                <li><strong>Always read labels:</strong> Verify you have the correct chemical before use</li>
                <li><strong>Use appropriate containers:</strong> Never use food containers for chemicals</li>
                <li><strong>Work in well-ventilated areas:</strong> Use fume hoods for volatile or toxic chemicals</li>
                <li><strong>Never mix chemicals unless instructed:</strong> Unexpected reactions can be dangerous. For example, mixing nitric acid with organic solvents can create explosive mixtures</li>
                <li><strong>Add acid to water, never water to acid:</strong> Prevents violent reactions and splashing. Add slowly with stirring</li>
                <li><strong>Use smallest quantities necessary:</strong> Reduces exposure and waste</li>
                <li><strong>Never taste or smell chemicals:</strong> Use proper identification methods. Some chemicals have delayed toxic effects</li>
                <li><strong>Clean up spills immediately:</strong> Use appropriate spill kits and procedures. Know which spill kit to use for which chemicals</li>
                <li><strong>Wash hands after handling chemicals:</strong> Even if gloves were worn. Some chemicals can penetrate gloves</li>
                <li><strong>Never work alone with hazardous chemicals:</strong> Have someone nearby who can help in emergencies</li>
                <li><strong>Prepare etchants carefully:</strong> When mixing etchants, follow procedures exactly. Some etchants require specific mixing orders</li>
                <li><strong>Date chemical containers:</strong> Label with preparation date, especially for mixed solutions that may degrade</li>
              </ul>

              <h3>Chemical Storage</h3>
              <ul>
                <li><strong>Store by compatibility:</strong> Separate incompatible chemicals (acids from bases, oxidizers from flammables). Common incompatibilities:
                  <ul className="ml-6 mt-2">
                    <li>Acids and bases (e.g., HCl and NaOH)</li>
                    <li>Oxidizers and flammables (e.g., nitric acid and ethanol)</li>
                    <li>Picric acid must be stored separately and kept wet</li>
                    <li>Hydrofluoric acid should be stored in appropriate secondary containment</li>
                  </ul>
                </li>
                <li><strong>Use proper storage containers:</strong> Original containers or approved secondary containers. Never use food containers</li>
                <li><strong>Label everything clearly:</strong> Include chemical name, concentration, date, and hazards. Update labels if containers are changed</li>
                <li><strong>Store in appropriate locations:</strong> Flammables in flammable storage cabinets, acids in acid storage cabinets, highly toxic materials in secure areas</li>
                <li><strong>Keep storage areas organized:</strong> Easy to find chemicals and identify hazards. Maintain inventory</li>
                <li><strong>Limit quantities:</strong> Store only what you need, order fresh chemicals regularly. Follow local regulations for maximum storage quantities</li>
                <li><strong>Check expiration dates:</strong> Some chemicals degrade and become more hazardous over time (e.g., picric acid becomes more explosive when old and dry)</li>
                <li><strong>Secure storage:</strong> Prevent unauthorized access, especially to highly hazardous chemicals like HF and picric acid</li>
                <li><strong>Temperature control:</strong> Some chemicals require specific storage temperatures. Check SDS for requirements</li>
                <li><strong>Secondary containment:</strong> Use secondary containment for highly hazardous chemicals to prevent spills from spreading</li>
              </ul>
            </section>

            <section id="equipment-safety" className="scroll-mt-24">
              <h2>Equipment Safety</h2>
              <p>
                Metallography equipment involves rotating parts, sharp blades, high pressures, and electrical hazards. 
                Proper use and maintenance are essential for safety.
              </p>

              <h3>Sectioning Equipment Safety</h3>
              <ul>
                <li><strong>Use proper guards:</strong> Ensure all guards and safety features are in place and functioning</li>
                <li><strong>Secure samples properly:</strong> Use appropriate clamps and fixtures to prevent movement</li>
                <li><strong>Wear eye protection:</strong> Always wear safety glasses or face shield when cutting</li>
                <li><strong>Hearing protection:</strong> Sectioning equipment can be loud. Use hearing protection if noise levels exceed 85 dB</li>
                <li><strong>Keep hands clear:</strong> Never place hands near cutting blades while equipment is running</li>
                <li><strong>Use appropriate blades:</strong> Ensure blades are suitable for the material being cut</li>
                <li><strong>Check blade condition:</strong> Replace worn or damaged blades. Dull blades can cause more hazards than sharp ones</li>
                <li><strong>Follow manufacturer instructions:</strong> Use equipment as designed and intended</li>
                <li><strong>Allow equipment to stop:</strong> Wait for complete stop before handling samples or changing blades</li>
                <li><strong>Coolant safety:</strong> Ensure proper coolant flow to prevent blade overheating and sample damage</li>
                <li><strong>Vibration:</strong> Prolonged use can cause hand-arm vibration. Take breaks and use anti-vibration gloves if needed</li>
              </ul>

              <h3>Grinding and Polishing Equipment Safety</h3>
              <ul>
                <li><strong>Secure samples:</strong> Ensure samples are properly mounted and secured</li>
                <li><strong>Use appropriate pressure:</strong> Excessive pressure can cause equipment damage and sample ejection</li>
                <li><strong>Keep hands away from rotating wheels:</strong> Maintain safe distance from moving parts</li>
                <li><strong>Wear eye protection:</strong> Protect against flying particles and splashing liquids</li>
                <li><strong>Use proper wheel guards:</strong> Ensure guards are in place and functioning</li>
                <li><strong>Check equipment condition:</strong> Inspect for damage before use</li>
                <li><strong>Clean up spills:</strong> Prevent slips and falls from water or polishing compounds</li>
                <li><strong>Unplug when not in use:</strong> Disconnect power when changing wheels or performing maintenance</li>
                <li><strong>Ergonomic considerations:</strong> Prolonged grinding/polishing can cause repetitive strain injuries. Take breaks, vary tasks, and maintain proper posture</li>
                <li><strong>Dust control:</strong> Some grinding operations generate dust. Use appropriate dust collection and ventilation</li>
              </ul>

              <h3>Mounting Press Safety</h3>
              <ul>
                <li><strong>Follow pressure limits:</strong> Never exceed recommended pressures. Over-pressurization can cause equipment failure and injury</li>
                <li><strong>Use proper molds:</strong> Ensure molds are in good condition and appropriate for the pressure. Damaged molds can fail under pressure</li>
                <li><strong>Allow cooling:</strong> Wait for mounts to cool before handling. Hot mounting materials can cause severe burns</li>
                <li><strong>Wear heat-resistant gloves:</strong> Protect hands from hot molds and mounts. Mounts can remain hot for extended periods</li>
                <li><strong>Check for leaks:</strong> Inspect equipment for hydraulic or pneumatic leaks. Leaks can cause sudden pressure loss or equipment failure</li>
                <li><strong>Follow lockout procedures:</strong> Properly lock out equipment during maintenance</li>
                <li><strong>Ventilation for hot mounting:</strong> Hot mounting materials can release fumes. Ensure adequate ventilation during mounting operations</li>
                <li><strong>Handle mounting materials carefully:</strong> Some mounting powders can be irritants. Avoid inhalation and skin contact</li>
                <li><strong>Allow pressure release:</strong> Follow proper procedures for releasing pressure. Sudden pressure release can be dangerous</li>
              </ul>

              <h3>Microscope Safety</h3>
              <ul>
                <li><strong>Proper lighting:</strong> Avoid excessive brightness that can cause eye strain</li>
                <li><strong>Ergonomic setup:</strong> Position microscope and chair for comfortable viewing</li>
                <li><strong>Clean lenses properly:</strong> Use appropriate cleaning materials and techniques</li>
                <li><strong>Handle carefully:</strong> Microscopes are delicate and expensive equipment</li>
                <li><strong>Electrical safety:</strong> Check cords and connections for damage</li>
              </ul>

              <h3>General Equipment Safety</h3>
              <ul>
                <li><strong>Read manuals:</strong> Understand equipment operation before use</li>
                <li><strong>Inspect before use:</strong> Check for damage, loose parts, or malfunctions</li>
                <li><strong>Report problems:</strong> Don't use damaged equipment, report issues immediately</li>
                <li><strong>Maintain equipment:</strong> Follow maintenance schedules and procedures</li>
                <li><strong>Use proper electrical connections:</strong> Ensure proper grounding and appropriate outlets</li>
                <li><strong>Keep work areas clean:</strong> Organized spaces reduce accident risk</li>
                <li><strong>Follow lockout/tagout procedures:</strong> When performing maintenance or repairs</li>
              </ul>
            </section>

            <section id="personal-protection" className="scroll-mt-24">
              <h2>Personal Protective Equipment (PPE)</h2>
              <p>
                Personal protective equipment is your last line of defense against hazards. Always use appropriate PPE 
                for the task at hand.
              </p>

              <h3>Eye Protection</h3>
              <ul>
                <li><strong>Safety glasses:</strong> Required for all laboratory work. Must meet ANSI Z87.1 standards</li>
                <li><strong>Chemical splash goggles:</strong> Required when working with chemicals, especially liquids</li>
                <li><strong>Face shields:</strong> Additional protection for high-risk operations like sectioning</li>
                <li><strong>Prescription safety glasses:</strong> If you wear glasses, use prescription safety glasses or goggles over regular glasses</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Remember:</strong> Eye protection must be worn at all times in the laboratory, even when you're 
                  not actively working with hazardous materials. Accidents can happen to anyone nearby.
                </p>
              </div>

              <h3>Hand Protection</h3>
              <ul>
                <li><strong>Chemical-resistant gloves:</strong> Nitrile, neoprene, or other appropriate materials for chemical handling</li>
                <li><strong>Heat-resistant gloves:</strong> For handling hot mounts and equipment</li>
                <li><strong>Cut-resistant gloves:</strong> When handling sharp samples or blades (use with caution around rotating equipment)</li>
                <li><strong>Proper fit:</strong> Gloves should fit well but not be too tight or loose</li>
                <li><strong>Inspect before use:</strong> Check for holes, tears, or degradation</li>
                <li><strong>Replace when damaged:</strong> Damaged gloves provide no protection</li>
              </ul>

              <h3>Body Protection</h3>
              <ul>
                <li><strong>Lab coats or aprons:</strong> Protect clothing and skin from chemical splashes</li>
                <li><strong>Chemical-resistant materials:</strong> For work with hazardous chemicals</li>
                <li><strong>Proper fit:</strong> Should cover torso and arms adequately</li>
                <li><strong>Remove before leaving lab:</strong> Don't wear contaminated lab coats outside the laboratory</li>
                <li><strong>Regular cleaning:</strong> Clean lab coats regularly, especially if contaminated</li>
              </ul>

              <h3>Foot Protection</h3>
              <ul>
                <li><strong>Closed-toe shoes:</strong> Required in all laboratory areas</li>
                <li><strong>Non-slip soles:</strong> Important in areas with water or chemicals</li>
                <li><strong>Chemical-resistant:</strong> For areas with chemical handling</li>
                <li><strong>No sandals or open-toe shoes:</strong> Never allowed in laboratories</li>
              </ul>

              <h3>Respiratory Protection</h3>
              <ul>
                <li><strong>Fume hoods:</strong> Primary protection for chemical vapors and fumes</li>
                <li><strong>Respirators:</strong> May be required for specific operations (requires fit testing and training)</li>
                <li><strong>Proper ventilation:</strong> Ensure adequate general ventilation in laboratory</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Respiratory protection requires proper training and fit testing. Consult with 
                  your safety officer before using respirators. Fume hoods are generally preferred over respirators 
                  for routine work.
                </p>
              </div>
            </section>

            <section id="ventilation" className="scroll-mt-24">
              <h2>Ventilation and Fume Control</h2>
              <p>
                Proper ventilation is essential for protecting against chemical vapors, fumes, and dust. Understanding 
                ventilation systems and their proper use is critical for safety.
              </p>

              <h3>Fume Hoods</h3>
              <p>
                Fume hoods are the primary protection against chemical vapors and fumes. Proper use is essential:
              </p>
              <ul>
                <li><strong>Use for all chemical work:</strong> Especially etching, mixing chemicals, and working with volatile substances</li>
                <li><strong>Check airflow:</strong> Ensure hood is functioning before use (check airflow indicator)</li>
                <li><strong>Keep sash at proper height:</strong> Maintain appropriate face velocity (typically 100-150 fpm)</li>
                <li><strong>Work at least 6 inches inside:</strong> Keep work at least 6 inches from the front edge</li>
                <li><strong>Minimize traffic:</strong> Avoid walking past hood while working (disrupts airflow)</li>
                <li><strong>Keep closed when not in use:</strong> Saves energy and maintains proper airflow</li>
                <li><strong>Don't block vents:</strong> Ensure rear baffles and front grille are not blocked</li>
                <li><strong>Report problems:</strong> If hood isn't working properly, don't use it and report immediately</li>
              </ul>

              <h3>General Ventilation</h3>
              <ul>
                <li><strong>Adequate air exchange:</strong> Laboratory should have sufficient air changes per hour</li>
                <li><strong>No recirculation:</strong> Laboratory air should not recirculate to other areas</li>
                <li><strong>Proper airflow direction:</strong> Air should flow from clean to contaminated areas</li>
                <li><strong>Regular maintenance:</strong> Ventilation systems require regular inspection and maintenance</li>
              </ul>

              <h3>Local Exhaust</h3>
              <ul>
                <li><strong>Dust collection:</strong> For grinding operations that generate dust</li>
                <li><strong>Point source capture:</strong> Capture contaminants at the source</li>
                <li><strong>Proper maintenance:</strong> Keep exhaust systems clean and functioning</li>
              </ul>
            </section>

            <section id="waste-management" className="scroll-mt-24">
              <h2>Waste Management</h2>
              <p>
                Proper waste management protects the environment and complies with regulations. Different types of waste 
                require different handling procedures.
              </p>

              <h3>Chemical Waste</h3>
              <ul>
                <li><strong>Separate by compatibility:</strong> Don't mix incompatible wastes</li>
                <li><strong>Use proper containers:</strong> Approved containers with proper labels</li>
                <li><strong>Label clearly:</strong> Include chemical names, concentrations, and hazards</li>
                <li><strong>Store properly:</strong> In designated waste storage areas</li>
                <li><strong>Follow disposal procedures:</strong> Use approved disposal methods and vendors</li>
                <li><strong>Never pour down drain:</strong> Unless specifically approved for that chemical</li>
                <li><strong>Document waste:</strong> Maintain waste inventory and disposal records</li>
              </ul>

              <h3>Hazardous Waste</h3>
              <ul>
                <li><strong>Identify hazardous waste:</strong> Understand what constitutes hazardous waste</li>
                <li><strong>Follow regulations:</strong> Comply with local, state, and federal regulations</li>
                <li><strong>Use licensed disposal:</strong> Only use licensed hazardous waste disposal companies</li>
                <li><strong>Maintain records:</strong> Keep detailed records of waste generation and disposal</li>
              </ul>

              <h3>Sharps and Solid Waste</h3>
              <ul>
                <li><strong>Sharps containers:</strong> Use proper containers for blades and sharp objects</li>
                <li><strong>Label clearly:</strong> Mark containers appropriately</li>
                <li><strong>Dispose properly:</strong> Follow institutional procedures for sharps disposal</li>
                <li><strong>Separate from regular trash:</strong> Don't mix with regular waste</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> Waste management regulations vary by location. Always follow your 
                  institution's waste management procedures and consult with your environmental health and safety 
                  office for guidance.
                </p>
              </div>
            </section>

            <section id="emergency-procedures" className="scroll-mt-24">
              <h2>Emergency Procedures</h2>
              <p>
                Knowing what to do in an emergency can prevent injuries and save lives. Familiarize yourself with 
                emergency procedures before you need them.
              </p>

              <h3>Chemical Spills</h3>
              <ul>
                <li><strong>Assess the situation:</strong> Determine if you can safely handle the spill</li>
                <li><strong>Evacuate if necessary:</strong> Large spills or highly hazardous materials may require evacuation</li>
                <li><strong>Use spill kits:</strong> Have appropriate spill kits available and know how to use them</li>
                <li><strong>Contain the spill:</strong> Prevent spread to other areas</li>
                <li><strong>Ventilate area:</strong> Increase ventilation if safe to do so</li>
                <li><strong>Clean up properly:</strong> Follow procedures for the specific chemical</li>
                <li><strong>Report all spills:</strong> Even small spills should be reported</li>
              </ul>

              <h3>Chemical Exposure</h3>
              <ul>
                <li><strong>Skin contact:</strong> Immediately flush with water for at least 15 minutes. Remove contaminated clothing. Seek medical attention. For most acids, flushing with water is appropriate.</li>
                <li><strong>Eye contact:</strong> Immediately flush eyes with water for at least 15 minutes using eyewash station. Hold eyelids open. Seek immediate medical attention. Do not delay flushing to seek help - flush first, then get help.</li>
                <li><strong>Inhalation:</strong> Move to fresh air immediately. If breathing is difficult, seek medical attention. Monitor for delayed symptoms.</li>
                <li><strong>Ingestion:</strong> Do not induce vomiting unless instructed by medical personnel. Seek immediate medical attention. Bring SDS or chemical information to medical facility.</li>
                <li><strong>Hydrofluoric Acid (HF) exposure - SPECIAL PROCEDURE:</strong> HF exposure requires immediate and specific treatment:
                  <ul className="ml-6 mt-2">
                    <li><strong>Skin contact:</strong> Immediately flush with water for 5 minutes, then apply calcium gluconate gel (2.5% or higher). Massage gel into affected area. Continue application and seek immediate medical attention. HF can cause delayed, severe burns and systemic poisoning.</li>
                    <li><strong>Eye contact:</strong> Immediately flush with water for at least 15 minutes, then seek immediate medical attention. Medical personnel should continue irrigation and may apply calcium gluconate solution.</li>
                    <li><strong>Inhalation:</strong> Move to fresh air immediately. Seek immediate medical attention even if symptoms are mild, as effects can be delayed.</li>
                    <li><strong>Critical:</strong> Calcium gluconate gel (2.5% or higher) must be available wherever HF is used. This is not optional - it can prevent severe injury or death.</li>
                  </ul>
                </li>
                <li><strong>Know first aid:</strong> Review first aid procedures for chemicals you use. Keep SDS documents accessible for emergency responders.</li>
              </ul>

              <h3>Fire Safety</h3>
              <ul>
                <li><strong>Know fire exits:</strong> Identify all exits and evacuation routes</li>
                <li><strong>Know fire extinguisher locations:</strong> Know where extinguishers are and how to use them</li>
                <li><strong>Use appropriate extinguishers:</strong> Different fires require different extinguisher types</li>
                <li><strong>Evacuate if fire is large:</strong> Don't attempt to fight large fires</li>
                <li><strong>Pull fire alarm:</strong> Alert others to evacuate</li>
                <li><strong>Never use elevators:</strong> Use stairs during fire evacuations</li>
              </ul>

              <h3>Emergency Contacts</h3>
              <ul>
                <li><strong>Know emergency numbers:</strong> Post emergency numbers prominently (911, poison control, safety office, medical facility)</li>
                <li><strong>Know your location:</strong> Be able to provide exact location for emergency responders (building, room number, floor)</li>
                <li><strong>Know emergency procedures:</strong> Understand your institution's emergency response procedures</li>
                <li><strong>Report all incidents:</strong> Report accidents and near-misses. Near-misses are learning opportunities that prevent future accidents</li>
                <li><strong>Eyewash and safety shower locations:</strong> Know the locations of all eyewash stations and safety showers. Test eyewash stations regularly</li>
                <li><strong>First aid kit location:</strong> Know where first aid kits are located and ensure they are properly stocked</li>
                <li><strong>Special first aid supplies:</strong> For laboratories using HF, ensure calcium gluconate gel (2.5% or higher) is readily available and not expired</li>
              </ul>

              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 font-semibold">
                  <strong>Emergency Preparedness:</strong> Review emergency procedures regularly. Participate in 
                  emergency drills. Know the location of safety equipment (eyewash stations, fire extinguishers, first 
                  aid kits). Seconds count in emergencies: being prepared saves lives.
                </p>
              </div>
            </section>

            <section id="best-practices" className="scroll-mt-24">
              <h2>Best Practices for Laboratory Safety</h2>
              <p>
                Following best practices creates a culture of safety and prevents accidents. These practices should 
                become habits.
              </p>

              <h3>General Safety Practices</h3>
              <ul>
                <li><strong>Never work alone:</strong> Have someone nearby, especially when working with hazardous materials. Some institutions require a "buddy system" for high-risk work</li>
                <li><strong>Stay focused:</strong> Avoid distractions when working with hazardous materials or equipment. Put away phones and avoid unnecessary conversations during hazardous operations</li>
                <li><strong>Follow procedures:</strong> Don't take shortcuts, especially with safety procedures. Written procedures exist for good reasons</li>
                <li><strong>Ask questions:</strong> If unsure about safety, ask before proceeding. There are no stupid safety questions</li>
                <li><strong>Report hazards:</strong> Report unsafe conditions or practices immediately. Don't assume someone else will report it</li>
                <li><strong>Keep work areas clean:</strong> Organized spaces reduce accident risk. Clean up after each task</li>
                <li><strong>Wash hands regularly:</strong> Especially after handling chemicals or before eating. Use appropriate soap and warm water</li>
                <li><strong>No food or drink:</strong> Never eat or drink in laboratory areas. Designate clean areas for breaks</li>
                <li><strong>Proper attire:</strong> Wear appropriate clothing (no loose clothing, jewelry, or open-toe shoes). Tie back long hair</li>
                <li><strong>Know your limits:</strong> Don't work when tired, ill, or impaired. Fatigue significantly increases accident risk</li>
                <li><strong>Plan your work:</strong> Review procedures and gather materials before starting. Rushing leads to mistakes</li>
                <li><strong>Maintain equipment:</strong> Report equipment problems immediately. Don't use damaged or malfunctioning equipment</li>
              </ul>

              <h3>Training and Education</h3>
              <ul>
                <li><strong>Complete required training:</strong> Participate in all required safety training</li>
                <li><strong>Stay current:</strong> Attend refresher training and updates</li>
                <li><strong>Read safety materials:</strong> Review SDS documents and safety procedures</li>
                <li><strong>Learn from incidents:</strong> Review incident reports and learn from others' experiences</li>
                <li><strong>Share knowledge:</strong> Help train new laboratory members</li>
              </ul>

              <h3>Safety Culture</h3>
              <ul>
                <li><strong>Lead by example:</strong> Model safe behavior for others</li>
                <li><strong>Speak up:</strong> Address unsafe behavior respectfully but firmly</li>
                <li><strong>Continuous improvement:</strong> Look for ways to improve safety</li>
                <li><strong>Celebrate safety:</strong> Recognize safe practices and improvements</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h3 className="text-lg font-semibold mb-3">Safety is Everyone's Responsibility</h3>
                <p className="text-sm text-gray-700">
                  Safety in the laboratory is not just about following rules; it's about creating an environment where 
                  everyone can work safely and effectively. When everyone takes safety seriously, accidents are 
                  prevented, and the laboratory becomes a better place to work. Remember: there's no such thing as 
                  being too safe in a laboratory environment.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Continue Your Safety Education</h2>
              <p className="mb-4">
                Safety is an ongoing learning process. Continue to educate yourself and stay current with safety 
                practices and regulations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides/common-misconceptions"
                  className="btn-primary text-center"
                >
                  Learn Common Mistakes
                </Link>
                <Link 
                  href="/guides/equipment-overview"
                  className="btn-secondary text-center"
                >
                  Equipment Overview
                </Link>
                <Link 
                  href="/guides"
                  className="btn-secondary text-center"
                >
                  Browse All Guides
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/introduction-to-metallography" className="text-primary-600 hover:underline font-semibold">
                  → Introduction to Metallography
                </Link>
                <Link href="/guides/equipment-overview" className="text-primary-600 hover:underline font-semibold">
                  → Equipment Overview
                </Link>
                <Link href="/guides/common-misconceptions" className="text-primary-600 hover:underline font-semibold">
                  → Common Misconceptions
                </Link>
                <Link href="/guides/sectioning" className="text-primary-600 hover:underline font-semibold">
                  → Sectioning
                </Link>
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  → Troubleshooting Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </article>
    </>
  )
}

