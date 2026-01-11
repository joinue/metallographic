import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import GlossaryTermTooltip from '@/components/GlossaryTermTooltip'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('aerospace-applications')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'titanium-superalloy-preparation', label: 'Titanium and Superalloy Preparation' },
  { id: 'fatigue-creep-assessment', label: 'Fatigue and Creep Damage Assessment' },
  { id: 'coating-analysis', label: 'Coating Analysis for Aerospace Components' },
  { id: 'industry-standards', label: 'Industry-Specific Standards and Requirements' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function AerospaceApplicationsGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Aerospace Applications Guide
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Application-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Aerospace Applications Guide</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to metallographic analysis for aerospace applications, covering 
              titanium and superalloy preparation, fatigue and creep damage assessment, coating 
              analysis, and industry-specific standards and requirements.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#titanium-superalloy-preparation" className="text-primary-600 hover:underline">Titanium and Superalloy Preparation</a></li>
              <li><a href="#fatigue-creep-assessment" className="text-primary-600 hover:underline">Fatigue and Creep Damage Assessment</a></li>
              <li><a href="#coating-analysis" className="text-primary-600 hover:underline">Coating Analysis for Aerospace Components</a></li>
              <li><a href="#industry-standards" className="text-primary-600 hover:underline">Industry-Specific Standards and Requirements</a></li>
              <li><a href="#best-practices" className="text-primary-600 hover:underline">Best Practices</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Aerospace applications demand the highest standards in material quality, performance, 
                and reliability. <GlossaryTermTooltip term="Metallography">Metallographic</GlossaryTermTooltip> analysis plays a critical role in ensuring that 
                aerospace components meet these stringent requirements. This guide covers specialized 
                techniques and considerations for preparing and analyzing aerospace materials, 
                including titanium alloys, nickel-based superalloys, and coated components.
              </p>
              <p>
                Aerospace metallography presents unique challenges due to the critical nature of 
                components, the complex <GlossaryTermTooltip term="Microstructure">microstructures</GlossaryTermTooltip> of advanced materials, and the need to 
                assess damage mechanisms such as fatigue and creep. Proper <GlossaryTermTooltip term="Sample Preparation">sample preparation</GlossaryTermTooltip> is 
                essential to reveal true microstructures without introducing <GlossaryTermTooltip term="Artifact">artifacts</GlossaryTermTooltip> that could 
                lead to incorrect conclusions about material condition or failure mechanisms.
              </p>
              <p>
                This guide addresses the key aspects of aerospace metallography:
              </p>
              <ul>
                <li>Preparation techniques for titanium and superalloys</li>
                <li>Assessment of fatigue and creep damage</li>
                <li>Analysis of protective coatings and surface treatments</li>
                <li>Compliance with aerospace industry standards</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Titanium+ZrB2, 400X (DIC).JPG"
                  alt="Aerospace titanium alloy microstructure showing complex phase structure"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Aerospace titanium alloy microstructure showing complex phase structure. Proper metallographic preparation is essential to reveal the true microstructure and assess material condition for critical aerospace applications. 400X magnification (DIC).</p>
              </div>
            </section>

            <section id="titanium-superalloy-preparation" className="scroll-mt-24">
              <h2>Titanium and Superalloy Preparation</h2>
              <p>
                Titanium alloys and nickel-based superalloys are the workhorses of aerospace 
                applications, used in critical components such as turbine blades, compressor 
                discs, and structural elements. These materials require specialized preparation 
                techniques to reveal their complex microstructures accurately.
              </p>

              <h3>Titanium Alloy Preparation</h3>
              <p>
                Titanium alloys, particularly <MaterialTooltip materialName="Ti-6Al-4V">Ti-6Al-4V (Grade 5)</MaterialTooltip>, 
                are widely used in aerospace due to their excellent strength-to-weight ratio and 
                corrosion resistance. However, titanium is highly reactive and requires careful 
                handling during <GlossaryTermTooltip term="Sample Preparation">preparation</GlossaryTermTooltip>.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Image
                  src="/images/microstructures/Ti6Al4V.jpg"
                  alt="Ti-6Al-4V titanium alloy microstructure showing alpha-beta phase structure"
                  width={500}
                  height={375}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Ti-6Al-4V titanium alloy microstructure showing alpha-beta phase structure. Proper preparation reveals the grain boundaries and phase distribution critical for aerospace applications.</p>
              </div>
              <p>
                For detailed titanium preparation procedures, refer to our comprehensive 
                <Link href="/guides/titanium-preparation" className="text-primary-600 hover:underline"> Titanium Preparation Guide</Link>. 
                Key considerations for aerospace titanium components include:
              </p>
              <ul>
                <li><strong><GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip>:</strong> Use slow cutting speeds (100-200 RPM) with MAX-D or MAX-VHS blades to minimize heat generation and deformation</li>
                <li><strong><GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip>:</strong> <GlossaryTermTooltip term="Castable Mounting">Cold mounting</GlossaryTermTooltip> with epoxy is preferred to avoid thermal effects on <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip></li>
                <li><strong><GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip>:</strong> Progressive grinding (120, 240, 400, 600 grit) with light pressure to avoid work-hardening</li>
                <li><strong><GlossaryTermTooltip term="Polishing">Polishing</GlossaryTermTooltip>:</strong> <GlossaryTermTooltip term="Diamond Polishing">Diamond polishing</GlossaryTermTooltip> (9 μm → 3 μm → 1 μm) followed by 0.05 μm colloidal silica</li>
                <li><strong><GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip>:</strong> Kroll's reagent is most commonly used, but modified Kroll's or Weck's reagent may be needed for specific alloys</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-d.webp"
                    alt="MAX-D abrasive cut-off blades for titanium sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">MAX-D or MAX-VHS abrasive cut-off blades suitable for titanium. Thin blades (0.5-1.0 mm) minimize heat generation and deformation during sectioning.</p>
              </div>
              <p>
                <strong>Critical Note:</strong> Titanium forms surface oxides easily. Minimize exposure 
                to air after polishing and etch promptly. Many titanium etchants contain hydrofluoric 
                acid (HF), which requires proper safety equipment including gloves, safety glasses, 
                and calcium gluconate gel for first aid.
              </p>

              <h3>Nickel-Based Superalloy Preparation</h3>
              <p>
                Nickel-based superalloys such as <MaterialTooltip materialName="Inconel 718">Inconel</MaterialTooltip>, Waspaloy, and René alloys are used in 
                high-temperature aerospace applications, particularly in turbine engines. These 
                materials have complex <GlossaryTermTooltip term="Microstructure">microstructures</GlossaryTermTooltip> with multiple <GlossaryTermTooltip term="Phase">phases</GlossaryTermTooltip> and require careful 
                <GlossaryTermTooltip term="Sample Preparation">preparation</GlossaryTermTooltip> to reveal all features.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Image
                  src="/images/microstructures/Hastelloy-adlers-etch-200X-DIC.jpg"
                  alt="Hastelloy superalloy microstructure showing complex phase structure at 200X magnification with DIC"
                  width={500}
                  height={375}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Hastelloy superalloy microstructure showing complex phase structure. Superalloys contain multiple phases including precipitates and carbides that must be properly revealed through careful preparation and etching. 200X magnification (DIC).</p>
              </div>
              <p>
                For detailed superalloy preparation procedures, refer to our 
                <Link href="/guides/nickel-alloys-preparation" className="text-primary-600 hover:underline"> Nickel Alloys Preparation Guide</Link>. 
                Key considerations for aerospace superalloys include:
              </p>
              <ul>
                <li><strong><GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip>:</strong> Use MAX-C series blades (silicon carbide/resin-rubber bond) at slow speeds (80-150 RPM) with continuous cooling</li>
                <li><strong><GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip>:</strong> Epoxy mounting is preferred to avoid thermal damage to sensitive <GlossaryTermTooltip term="Microstructure">microstructures</GlossaryTermTooltip></li>
                <li><strong><GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip>:</strong> Progressive grinding through 120, 240, 400, 600, 800 grit with light pressure</li>
                <li><strong><GlossaryTermTooltip term="Polishing">Polishing</GlossaryTermTooltip>:</strong> Extended <GlossaryTermTooltip term="Diamond Polishing">diamond polishing</GlossaryTermTooltip> sequence (9 μm → 6 μm → 3 μm → 1 μm) with appropriate cloths for each stage</li>
                <li><strong><GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip>:</strong> Glyceregia, Aqua Regia, or electrolytic etching depending on the specific superalloy and features to be revealed</li>
              </ul>
              <p>
                <strong>Microstructure Features:</strong> Superalloys typically contain gamma prime (γ') 
                <GlossaryTermTooltip term="Precipitate">precipitates</GlossaryTermTooltip>, carbides, and sometimes topologically close-packed (TCP) <GlossaryTermTooltip term="Phase">phases</GlossaryTermTooltip>. Proper 
                <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> is essential to reveal these features and assess their size, distribution, and 
                morphology, which directly affect material properties.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/abrasive-blades"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/maxcut-c.webp"
                      alt="MAX-C series abrasive blades for superalloy sectioning"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">MAX-C series blades (silicon carbide/resin-rubber bond) for sectioning nickel-based superalloys.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/sic-grinding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/abrasive grinding-SiC papers.webp"
                      alt="Silicon carbide grinding papers for progressive grinding"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Silicon carbide grinding papers for progressive grinding of superalloys.</p>
                </div>
              </div>

              <h3>Common Aerospace Alloys</h3>
              <div className="bg-gray-50 p-6 rounded-lg my-6">
                <h4 className="font-semibold mb-3">Titanium Alloys</h4>
                <ul className="space-y-2">
                  <li><strong><MaterialTooltip materialName="Ti-6Al-4V">Ti-6Al-4V (Grade 5)</MaterialTooltip>:</strong> Most common aerospace titanium alloy, used in structural components</li>
                  <li><strong>Ti-6Al-2Sn-4Zr-2Mo (Ti-6242):</strong> High-temperature titanium alloy for engine components</li>
                  <li><strong>Ti-3Al-2.5V (Grade 9):</strong> Used in tubing and hydraulic systems</li>
                  <li><strong>Commercially Pure Titanium (Grade 2):</strong> Used in non-critical applications requiring corrosion resistance</li>
                </ul>
                <h4 className="font-semibold mb-3 mt-4">Nickel-Based Superalloys</h4>
                <ul className="space-y-2">
                  <li><strong><MaterialTooltip materialName="Inconel 718">Inconel 718</MaterialTooltip>:</strong> Precipitation-hardened superalloy for turbine discs and blades</li>
                  <li><strong><MaterialTooltip materialName="Inconel 625">Inconel 625</MaterialTooltip>:</strong> Solid-solution strengthened, used in exhaust systems</li>
                  <li><strong>Waspaloy:</strong> Used in high-temperature turbine components</li>
                  <li><strong>René 41:</strong> High-strength superalloy for turbine blades</li>
                  <li><strong><MaterialTooltip materialName="Hastelloy C-276">Hastelloy X</MaterialTooltip>:</strong> Used in combustion chambers and afterburners</li>
                </ul>
              </div>

              <ProductLink 
                productName="Abrasive Blades for Aerospace Materials"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="MAX-D, MAX-VHS, and MAX-C series blades for sectioning titanium and superalloys"
              />
              <ProductLink 
                productName="Diamond Polishing Compounds"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond polishing compounds in various particle sizes for aerospace materials"
              />
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Premium SiC papers in all grit sizes for progressive grinding of aerospace materials"
              />
            </section>

            <section id="fatigue-creep-assessment" className="scroll-mt-24">
              <h2>Fatigue and Creep Damage Assessment</h2>
              <p>
                Fatigue and creep are two of the most critical failure mechanisms in aerospace 
                components. Proper metallographic preparation and analysis are essential for 
                identifying and assessing damage from these mechanisms.
              </p>

              <h3>Fatigue Damage Assessment</h3>
              <p>
                Fatigue failures result from cyclic loading below the material's ultimate strength. 
                In aerospace applications, components are subjected to millions of loading cycles, 
                making fatigue a primary concern.
              </p>
              <p>
                For comprehensive failure analysis techniques, refer to our 
                <Link href="/guides/failure-analysis" className="text-primary-600 hover:underline"> Failure Analysis Guide</Link>.
              </p>

              <h4>Identifying Fatigue Damage</h4>
              <ul>
                <li><strong>Fracture Surface Examination:</strong> Beach marks or striations indicate progressive crack growth</li>
                <li><strong>Crack Initiation Sites:</strong> Often at stress concentrators, surface <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip>, or material anomalies</li>
                <li><strong>Multiple Initiation Sites:</strong> Common in high-cycle fatigue</li>
                <li><strong>Final Fast Fracture Region:</strong> Shows the final overload mechanism</li>
              </ul>

              <h4>Metallographic Preparation for Fatigue Analysis</h4>
              <p>
                When preparing samples for fatigue analysis:
              </p>
              <ol>
                <li><strong>Preserve Fracture Surfaces:</strong> Document and protect fracture surfaces before <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip></li>
                <li><strong>Cross-Sectional Analysis:</strong> Prepare sections perpendicular to the fracture surface to examine crack path</li>
                <li><strong>Multiple Sections:</strong> Prepare sections at different locations to understand crack progression</li>
                <li><strong>Careful <GlossaryTermTooltip term="Polishing">Polishing</GlossaryTermTooltip>:</strong> Avoid over-polishing that could remove fine crack features</li>
                <li><strong>Appropriate <GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip>:</strong> Use <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip> that reveal <GlossaryTermTooltip term="Grain Boundary">grain boundaries</GlossaryTermTooltip> and <GlossaryTermTooltip term="Phase">phases</GlossaryTermTooltip> to understand crack path</li>
              </ol>

              <h4>Microstructural Indicators of Fatigue</h4>
              <ul>
                <li><strong>Persistent Slip Bands:</strong> Fine lines indicating localized plastic deformation</li>
                <li><strong><GlossaryTermTooltip term="Grain Boundary">Grain Boundary</GlossaryTermTooltip> Cracking:</strong> In high-temperature fatigue</li>
                <li><strong><GlossaryTermTooltip term="Phase">Phase</GlossaryTermTooltip> Transformation:</strong> In materials like titanium, fatigue can cause phase changes</li>
                <li><strong>Surface Damage:</strong> Fretting, wear, or corrosion that initiated fatigue</li>
              </ul>

              <h3>Creep Damage Assessment</h3>
              <p>
                Creep is time-dependent deformation under sustained load at elevated temperatures. 
                In aerospace applications, creep is particularly important in turbine components 
                operating at high temperatures.
              </p>

              <h4>Identifying Creep Damage</h4>
              <ul>
                <li><strong><GlossaryTermTooltip term="Grain Boundary">Grain Boundary</GlossaryTermTooltip> Cavitation:</strong> Voids forming at grain boundaries, particularly triple points</li>
                <li><strong>Elongated <GlossaryTermTooltip term="Grain">Grains</GlossaryTermTooltip>:</strong> Grains elongated in the direction of applied stress</li>
                <li><strong>Intergranular Cracking:</strong> Cracks following <GlossaryTermTooltip term="Grain Boundary">grain boundaries</GlossaryTermTooltip></li>
                <li><strong><GlossaryTermTooltip term="Phase">Phase</GlossaryTermTooltip> Coarsening:</strong> <GlossaryTermTooltip term="Precipitate">Precipitates</GlossaryTermTooltip> (e.g., γ' in superalloys) coarsen during creep</li>
                <li><strong>Recrystallization:</strong> New <GlossaryTermTooltip term="Grain">grains</GlossaryTermTooltip> forming in highly deformed regions</li>
              </ul>

              <h4>Metallographic Preparation for Creep Analysis</h4>
              <p>
                Creep damage assessment requires careful <GlossaryTermTooltip term="Sample Preparation">preparation</GlossaryTermTooltip> to preserve and reveal damage features:
              </p>
              <ol>
                <li><strong>Section Orientation:</strong> Prepare sections both parallel and perpendicular to the stress axis</li>
                <li><strong>Preserve Cavities:</strong> Use gentle <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> to avoid filling or smearing <GlossaryTermTooltip term="Grain Boundary">grain boundary</GlossaryTermTooltip> cavities</li>
                <li><strong>Deep <GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip>:</strong> May be needed to reveal <GlossaryTermTooltip term="Grain Boundary">grain boundary</GlossaryTermTooltip> damage</li>
                <li><strong>Multiple Magnifications:</strong> Examine at various magnifications to identify different stages of creep damage</li>
                <li><strong>Comparison with Unused Material:</strong> Compare with material in the unused condition to identify changes</li>
              </ol>

              <h4>Creep Damage Classification</h4>
              <div className="bg-gray-50 p-6 rounded-lg my-6">
                <p className="mb-3"><strong>Stage I (Primary Creep):</strong> Rapid initial deformation, decreasing rate</p>
                <p className="mb-3"><strong>Stage II (Secondary Creep):</strong> Steady-state creep with constant rate</p>
                <p className="mb-3"><strong>Stage III (Tertiary Creep):</strong> Accelerating deformation leading to failure</p>
                <p className="mb-0"><strong>Microstructural Indicators:</strong></p>
                <ul className="mt-2">
                  <li>Early stage: Minor grain boundary sliding, no visible damage</li>
                  <li>Intermediate stage: Isolated grain boundary cavities</li>
                  <li>Advanced stage: Interconnected cavities, microcracks</li>
                  <li>Final stage: Macroscopic cracking, imminent failure</li>
                </ul>
              </div>

              <h4>Quantitative Assessment</h4>
              <p>
                Quantitative assessment of creep damage may include:
              </p>
              <ul>
                <li>Cavity density (number per unit area)</li>
                <li><GlossaryTermTooltip term="Grain Boundary">Grain boundary</GlossaryTermTooltip> coverage by cavities</li>
                <li><GlossaryTermTooltip term="Grain">Grain</GlossaryTermTooltip> aspect ratio (length/width)</li>
                <li><GlossaryTermTooltip term="Precipitate">Precipitate</GlossaryTermTooltip> size and distribution</li>
                <li>Remaining life estimation based on damage level</li>
              </ul>
            </section>

            <section id="coating-analysis" className="scroll-mt-24">
              <h2>Coating Analysis for Aerospace Components</h2>
              <p>
                Aerospace components often have protective coatings applied to enhance performance, 
                durability, or resistance to high temperatures and corrosion. Proper metallographic 
                preparation is essential to analyze these coatings without damaging them.
              </p>

              <h3>Types of Aerospace Coatings</h3>
              <div className="bg-gray-50 p-6 rounded-lg my-6">
                <h4 className="font-semibold mb-3">Thermal Barrier Coatings (TBCs)</h4>
                <p className="mb-3">
                  Applied to turbine blades and vanes to protect against high temperatures. Typically 
                  consist of a ceramic topcoat (e.g., yttria-stabilized zirconia) over a bond coat 
                  (e.g., MCrAlY, where M = Ni, Co, or both).
                </p>
                <h4 className="font-semibold mb-3 mt-4">Environmental Barrier Coatings (EBCs)</h4>
                <p className="mb-3">
                  Protect ceramic matrix composites from water vapor and oxidation at high temperatures.
                </p>
                <h4 className="font-semibold mb-3 mt-4">Corrosion-Resistant Coatings</h4>
                <p className="mb-3">
                  Applied to protect components from environmental degradation, including aluminum 
                  coatings, chromate conversion coatings, and anodized layers.
                </p>
                <h4 className="font-semibold mb-3 mt-4">Wear-Resistant Coatings</h4>
                <p className="mb-0">
                  Hard coatings such as chromium, tungsten carbide, or diamond-like carbon applied 
                  to reduce wear in moving components.
                </p>
              </div>

              <h3>Sample Preparation for Coating Analysis</h3>
              <p>
                Coating analysis requires specialized techniques to preserve coating integrity and 
                reveal the coating-substrate interface clearly. For comprehensive coating preparation 
                techniques, refer to our 
                <Link href="/guides/coating-surface-treatment-analysis" className="text-primary-600 hover:underline"> Coating and Surface Treatment Analysis Guide</Link>.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Image
                  src="/images/microstructures/Thermal spray coating.JPG"
                  alt="Thermal spray coating cross-section showing coating structure and interface with substrate"
                  width={500}
                  height={375}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Thermal spray coating cross-section showing coating structure and interface with substrate. Proper preparation preserves the coating integrity and reveals the interface clearly.</p>
              </div>

              <h4>Sectioning</h4>
              <ul>
                <li>Use slow cutting speeds to minimize damage to brittle coatings</li>
                <li>Consider using a precision saw with diamond blade for hard ceramic coatings</li>
                <li>Cut perpendicular to the coating surface for thickness measurement</li>
                <li>Use adequate <GlossaryTermTooltip term="Coolant">coolant</GlossaryTermTooltip> to prevent thermal damage</li>
              </ul>

              <h4>Mounting</h4>
              <ul>
                <li><GlossaryTermTooltip term="Castable Mounting">Cold mounting</GlossaryTermTooltip> is preferred to avoid thermal damage to coatings</li>
                <li>Use low-shrinkage epoxy resins to maintain <GlossaryTermTooltip term="Edge Retention">edge retention</GlossaryTermTooltip></li>
                <li>Consider vacuum impregnation for porous coatings</li>
                <li>Ensure proper orientation to preserve coating-substrate interface</li>
              </ul>

              <h4>Grinding and Polishing</h4>
              <p>
                Special care is needed during <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip> and <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> to avoid:
              </p>
              <ul>
                <li><strong>Coating Delamination:</strong> Use light pressure and appropriate <GlossaryTermTooltip term="Abrasive">abrasives</GlossaryTermTooltip></li>
                <li><strong>Edge Rounding:</strong> Maintain <GlossaryTermTooltip term="Edge Retention">edge retention</GlossaryTermTooltip> with proper <GlossaryTermTooltip term="Mounting">mounting</GlossaryTermTooltip> and technique</li>
                <li><strong><GlossaryTermTooltip term="Relief">Relief</GlossaryTermTooltip>:</strong> Avoid over-polishing that creates relief between coating and substrate</li>
                <li><strong><GlossaryTermTooltip term="Smearing">Smearing</GlossaryTermTooltip>:</strong> Soft coatings may smear; use appropriate polishing cloths and lubricants</li>
                <li><strong>Pullout:</strong> Brittle coatings may pull out; use gentle techniques</li>
              </ul>

              <h4>Recommended Preparation Sequence for Coatings</h4>
              <ol>
                <li><strong><GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip>:</strong> Start with 240-320 grit, progress through 400, 600, 800 grit with light pressure</li>
                <li><strong><GlossaryTermTooltip term="Diamond Polishing">Diamond Polishing</GlossaryTermTooltip>:</strong> 9 μm → 6 μm → 3 μm → 1 μm with appropriate cloths</li>
                <li><strong>Final Polish:</strong> 0.05 μm colloidal silica or alumina, but be careful not to over-polish</li>
                <li><strong><GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip>:</strong> May be needed to reveal coating structure, but many coatings are best examined unetched</li>
              </ol>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polycrystalline-diamond-high-viscosity.webp"
                      alt="Polycrystalline diamond polishing compound for coating analysis"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound for polishing coatings without creating relief.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/polishing-pads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polishing-pads.webp"
                      alt="Polishing pads for different polishing stages"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages of coatings.</p>
                </div>
              </div>

              <h3>Coating Characterization</h3>
              <h4>Thickness Measurement</h4>
              <ul>
                <li>Measure at multiple locations to assess uniformity</li>
                <li>Use calibrated microscope with appropriate magnification (typically 200-500X)</li>
                <li>Report average, minimum, and maximum thickness</li>
                <li>Compare with specification requirements</li>
              </ul>

              <h4>Microstructure Analysis</h4>
              <ul>
                <li><strong>Coating Structure:</strong> Columnar, equiaxed, or layered</li>
                <li><strong><GlossaryTermTooltip term="Porosity">Porosity</GlossaryTermTooltip>:</strong> Amount and distribution of pores</li>
                <li><strong>Bond Coat Condition:</strong> Oxidation, interdiffusion with substrate</li>
                <li><strong>Interface Quality:</strong> Adhesion, <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip>, interdiffusion zone</li>
                <li><strong>Substrate Effects:</strong> <GlossaryTermTooltip term="Microstructure">Microstructural</GlossaryTermTooltip> changes in substrate near interface</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Image
                  src="/images/microstructures/Ni-Al-coating-500.jpg"
                  alt="Nickel-aluminum coating microstructure showing coating structure and interface"
                  width={500}
                  height={375}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Nickel-aluminum coating microstructure showing coating structure and interface with substrate. The coating-substrate interface is clearly visible, demonstrating proper preparation technique. 500X magnification.</p>
              </div>

              <h4>Defect Identification</h4>
              <ul>
                <li>Cracks (vertical, horizontal, or branching)</li>
                <li>Delamination at interface</li>
                <li>Oxidation of bond coat</li>
                <li>Spallation or loss of coating</li>
                <li>Inclusions or contamination</li>
                <li>Non-uniform thickness</li>
              </ul>

              <h3>Service-Induced Changes</h3>
              <p>
                Coatings in service may undergo changes that affect performance:
              </p>
              <ul>
                <li><strong>Thermal Cycling:</strong> Can cause cracking and spallation</li>
                <li><strong>Oxidation:</strong> Formation of thermally grown oxide (TGO) at bond coat interface</li>
                <li><strong>Interdiffusion:</strong> Elements diffusing between coating and substrate</li>
                <li><strong>Phase Changes:</strong> Microstructural evolution during service</li>
                <li><strong>Erosion:</strong> Loss of coating material from particle impact</li>
              </ul>

              <ProductLink 
                productName="Coating Analysis Equipment"
                href="https://www.metallographic.com/metallographic-equipment"
                description="Specialized equipment for coating analysis including precision sectioning and mounting systems"
              />
            </section>

            <section id="industry-standards" className="scroll-mt-24">
              <h2>Industry-Specific Standards and Requirements</h2>
              <p>
                Aerospace metallography must comply with numerous industry standards and specifications. 
                Understanding and following these standards is critical for ensuring component quality 
                and regulatory compliance.
              </p>

              <h3>ASTM Standards</h3>
              <div className="bg-gray-50 p-6 rounded-lg my-6">
                <h4 className="font-semibold mb-3">Sample Preparation Standards</h4>
                <ul className="space-y-2">
                  <li><strong>ASTM E3:</strong> Standard Practice for Preparation of Metallographic Specimens</li>
                  <li><strong>ASTM E407:</strong> Standard Practice for Microetching Metals and Alloys</li>
                  <li><strong>ASTM E1920:</strong> Standard Guide for Metallographic Preparation of Thermal Sprayed Coatings</li>
                  <li><strong>ASTM E2014:</strong> Standard Guide for Preparation of Plastics and Polymeric Specimens for Microstructural Examination</li>
                </ul>
                <h4 className="font-semibold mb-3 mt-4">Analysis and Testing Standards</h4>
                <ul className="space-y-2">
                  <li><strong>ASTM E112:</strong> Standard Test Methods for Determining Average Grain Size</li>
                  <li><strong>ASTM E883:</strong> Standard Guide for Reflected-Light Photomicrography</li>
                  <li><strong>ASTM E1245:</strong> Standard Practice for Determining the Inclusion or Second-Phase Constituent Content of Metals by Automatic Image Analysis</li>
                  <li><strong>ASTM E1823:</strong> Standard Terminology Relating to Fatigue and Fracture Testing</li>
                </ul>
              </div>

              <h3>Aerospace Industry Standards</h3>
              <h4>SAE/AMS Standards</h4>
              <ul>
                <li><strong>AMS 2300:</strong> Aircraft Quality Steel - Cleanliness, Aircraft Quality</li>
                <li><strong>AMS 2301:</strong> Aircraft Quality Steel - Cleanliness, Premium Aircraft Quality</li>
                <li><strong>AMS 2759:</strong> Heat Treatment of Steel Parts, General Requirements</li>
                <li><strong>AMS 2770:</strong> Heat Treatment of Aluminum Alloy Raw Materials</li>
                <li><strong>AMS 2801:</strong> Heat Treatment of Titanium Alloy Raw Materials</li>
              </ul>

              <h4>NADCAP (National Aerospace and Defense Contractors Accreditation Program)</h4>
              <p>
                NADCAP accreditation is often required for aerospace suppliers. Key requirements include:
              </p>
              <ul>
                <li>Documented procedures for all preparation steps</li>
                <li>Calibrated equipment with traceable standards</li>
                <li>Qualified personnel with appropriate training</li>
                <li>Quality control measures and documentation</li>
                <li>Regular audits and compliance verification</li>
              </ul>

              <h3>Material-Specific Requirements</h3>
              <h4>Titanium Alloys</h4>
              <ul>
                <li><strong>AMS 4928:</strong> Titanium Alloy, Sheet, Strip, and Plate (Ti-6Al-4V)</li>
                <li><strong>ASTM B265:</strong> Standard Specification for Titanium and Titanium Alloy Strip, Sheet, and Plate</li>
                <li>Requirements for alpha case depth measurement</li>
                <li>Microstructure evaluation per material specification</li>
              </ul>

              <h4>Superalloys</h4>
              <ul>
                <li><strong>AMS 5662:</strong> Nickel Alloy, Corrosion and Heat-Resistant, Bars, Wire, and Forgings (<MaterialTooltip materialName="Inconel 718">Inconel 718</MaterialTooltip>)</li>
                <li><strong>AMS 5708:</strong> Nickel Alloy, Corrosion and Heat-Resistant, Sheet, Strip, and Plate (<MaterialTooltip materialName="Inconel 625">Inconel 625</MaterialTooltip>)</li>
                <li>Gamma prime (γ') size and distribution requirements</li>
                <li>Grain size specifications</li>
                <li>Carbide distribution evaluation</li>
              </ul>

              <h3>Documentation Requirements</h3>
              <p>
                Aerospace metallography requires comprehensive documentation:
              </p>
              <ul>
                <li><strong>Sample Identification:</strong> Traceability to source material and component</li>
                <li><strong>Preparation Records:</strong> Detailed documentation of all preparation steps</li>
                <li><strong>Micrographs:</strong> High-quality images with proper labeling and scale bars</li>
                <li><strong>Measurements:</strong> Quantitative data with uncertainty estimates</li>
                <li><strong>Reports:</strong> Comprehensive reports with conclusions and recommendations</li>
                <li><strong>Compliance Statements:</strong> Verification of compliance with applicable standards</li>
              </ul>

              <h3>Quality Assurance</h3>
              <p>
                Quality assurance measures for aerospace metallography include:
              </p>
              <ul>
                <li>Regular calibration of equipment (microscopes, hardness testers, etc.)</li>
                <li>Reference samples for verification of preparation quality</li>
                <li>Round-robin testing for interlaboratory comparison</li>
                <li>Personnel qualification and training records</li>
                <li>Document control and revision management</li>
                <li>Non-conformance tracking and corrective action</li>
              </ul>

              <p className="mt-4">
                Refer to our <Link href="/resources/astm-standards-reference" className="text-primary-600 hover:underline">ASTM Standards Reference</Link> for more information on relevant standards.
              </p>
            </section>

            <section id="best-practices" className="scroll-mt-24">
              <h2>Best Practices for Aerospace Metallography</h2>
              <p>
                Following best practices ensures accurate, reliable results that meet aerospace 
                industry requirements.
              </p>

              <h3>Sample Preparation Best Practices</h3>
              <ul>
                <li><strong>Minimize <GlossaryTermTooltip term="Artifact">Artifacts</GlossaryTermTooltip>:</strong> Avoid introducing scratches, <GlossaryTermTooltip term="Contamination">contamination</GlossaryTermTooltip>, or deformation</li>
                <li><strong>Consistent Techniques:</strong> Use standardized procedures for reproducibility</li>
                <li><strong>Appropriate Magnification:</strong> Use appropriate magnification for the features of interest</li>
                <li><strong>Multiple Sections:</strong> Prepare multiple sections when possible to ensure representative analysis</li>
                <li><strong>Preserve Evidence:</strong> Document and preserve critical features before destructive testing</li>
              </ul>

              <h3>Analysis Best Practices</h3>
              <ul>
                <li><strong>Systematic Approach:</strong> Follow a structured methodology for consistent results</li>
                <li><strong>Quantitative When Possible:</strong> Use quantitative measurements rather than qualitative assessments</li>
                <li><strong>Statistical Analysis:</strong> Collect sufficient data for statistical significance</li>
                <li><strong>Comparison with Standards:</strong> Compare results with material specifications and standards</li>
                <li><strong>Documentation:</strong> Maintain comprehensive records of all observations and measurements</li>
              </ul>

              <h3>Safety Considerations</h3>
              <ul>
                <li><strong>Chemical Safety:</strong> Many aerospace materials require hazardous etchants (HF, strong acids)</li>
                <li><strong>Personal Protective Equipment:</strong> Always use appropriate PPE including gloves, safety glasses, and lab coats</li>
                <li><strong>Ventilation:</strong> Ensure adequate ventilation when using volatile or hazardous chemicals</li>
                <li><strong>Emergency Procedures:</strong> Know emergency procedures and have appropriate first aid supplies (e.g., calcium gluconate for HF exposure)</li>
                <li><strong>Waste Disposal:</strong> Follow proper procedures for disposal of hazardous materials</li>
              </ul>
              <p>
                For comprehensive safety information, refer to our 
                <Link href="/guides/safety-fundamentals" className="text-primary-600 hover:underline"> Safety Fundamentals Guide</Link>.
              </p>

              <h3>Common Pitfalls to Avoid</h3>
              <ul>
                <li><strong>Over-<GlossaryTermTooltip term="Polishing">Polishing</GlossaryTermTooltip>:</strong> Can remove fine features or create <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip></li>
                <li><strong>Insufficient <GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip>:</strong> May not reveal all <GlossaryTermTooltip term="Microstructure">microstructural</GlossaryTermTooltip> features</li>
                <li><strong>Over-<GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip>:</strong> Can obscure fine details or create <GlossaryTermTooltip term="Artifact">artifacts</GlossaryTermTooltip></li>
                <li><strong><GlossaryTermTooltip term="Contamination">Contamination</GlossaryTermTooltip>:</strong> Cross-contamination between samples can lead to incorrect conclusions</li>
                <li><strong>Inadequate Documentation:</strong> Poor documentation can compromise traceability and compliance</li>
                <li><strong>Ignoring Standards:</strong> Not following applicable standards can result in non-compliance</li>
              </ul>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Explore More Procedures</h2>
              <p className="mb-4">
                Browse our comprehensive procedure guides for material-specific preparation methods and get personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides?category=Material-Specific"
                  className="btn-primary text-center"
                >
                  Browse Procedure Guides
                </Link>
                <Link 
                  href="https://shop.metallographic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  View Example Products
                </Link>
                <Link 
                  href="https://metallographic.com/equipment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Browse Equipment Examples
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/titanium-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Titanium Preparation
                </Link>
                <Link href="/guides/nickel-alloys-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Nickel Alloys Preparation
                </Link>
                <Link href="/guides/failure-analysis" className="text-primary-600 hover:underline font-semibold">
                  → Failure Analysis
                </Link>
                <Link href="/guides/coating-surface-treatment-analysis" className="text-primary-600 hover:underline font-semibold">
                  → Coating and Surface Treatment Analysis
                </Link>
                <Link href="/guides/quality-control-inspection" className="text-primary-600 hover:underline font-semibold">
                  → Quality Control and Inspection
                </Link>
                <Link href="/resources/astm-standards-reference" className="text-primary-600 hover:underline font-semibold">
                  → ASTM Standards Reference
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

