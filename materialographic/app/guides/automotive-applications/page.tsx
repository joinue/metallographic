import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GuideSideNav from '@/components/GuideSideNav';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import GlossaryTermTooltip from '@/components/GlossaryTermTooltip';
import MaterialTooltip from '@/components/MaterialTooltip';
import ProductLink from '@/components/ProductLink';
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo';

const guide = getGuideBySlug('automotive-applications')!;

export const metadata: Metadata = getGuideMetadata(guide);

const sections = [
  { id: 'introduction', label: 'Introduction to Automotive Metallography' },
  { id: 'steel-aluminum-verification', label: 'Steel and Aluminum Processing Verification' },
  { id: 'heat-treatment-validation', label: 'Heat Treatment Validation for Automotive Components' },
  { id: 'weld-quality-assessment', label: 'Weld Quality Assessment in Automotive Manufacturing' },
  { id: 'industry-requirements', label: 'Industry-Specific Quality Requirements' },
  { id: 'sample-preparation', label: 'Sample Preparation Considerations' },
  { id: 'standards-references', label: 'Standards and References' },
  { id: 'conclusion', label: 'Conclusion' },
];

export default function AutomotiveApplicationsPage() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData } = getGuideStructuredData(guide);

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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Automotive Applications Guide
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Application-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Automotive Applications Guide</h1>
            <p className="text-xl text-gray-600">
              Complete guide to metallographic analysis for automotive applications, covering steel and aluminum processing verification, heat treatment validation, weld quality assessment, and industry-specific quality requirements.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-primary-600 hover:underline">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <AnimateOnScroll animation="fadeInUp" delay={0}>
              <section id="introduction" className="scroll-mt-24 mb-12">
                <h2>Introduction to Automotive Metallography</h2>
                <p>
                  Metallography plays a critical role in the automotive industry, where material quality, 
                  performance, and reliability directly impact vehicle safety and longevity. Automotive 
                  components must withstand extreme conditions including cyclic loading, temperature variations, 
                  and environmental exposure, making thorough metallographic analysis essential for quality 
                  assurance and process validation.
                </p>
                <p>
                  This guide covers the specialized metallographic techniques and considerations required for 
                  automotive applications, focusing on the most common materials (steel and aluminum), 
                  critical processes (heat treatment and welding), and industry-specific quality requirements 
                  that ensure components meet automotive standards.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <p className="text-blue-800">
                    <strong>Key Applications:</strong> Quality control in manufacturing, process validation, 
                    failure analysis, material certification, and compliance with automotive industry standards 
                    such as ISO/TS 16949 and ASTM specifications.
                  </p>
                </div>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={100}>
              <section id="steel-aluminum-verification" className="scroll-mt-24 mb-12">
                <h2>Steel and Aluminum Processing Verification</h2>
                
                <h3>Steel Processing Verification</h3>
                <p>
                  Automotive steel components require verification of processing parameters to ensure proper 
                  microstructure development. Key aspects include:
                </p>
                
                <h4>Grain Size Analysis</h4>
                <p>
                  <GlossaryTermTooltip term="Grain Size">Grain size</GlossaryTermTooltip> directly affects mechanical properties in automotive steels. Proper grain size 
                  control ensures optimal strength, toughness, and formability. Use ASTM E112 for grain size 
                  measurement and verify that grain sizes meet specification requirements (typically ASTM 
                  grain size numbers 5-8 for most automotive applications).
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                      alt="Carbon steel microstructure showing ferrite and pearlite, demonstrating proper grain size for automotive applications"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Carbon steel microstructure showing ferrite and pearlite. Proper grain size control is critical for automotive component performance.</p>
                  </div>
                </AnimateOnScroll>
                <ul>
                  <li>Measure grain size at multiple locations to ensure uniformity</li>
                  <li>Document any grain size gradients from surface to interior</li>
                  <li>Compare measured values against material specifications</li>
                  <li>Use appropriate etching (e.g., nital for carbon steels, picral for some alloy steels)</li>
                </ul>

                <h4>Inclusion Assessment</h4>
                <p>
                  Non-metallic <GlossaryTermTooltip term="Inclusion">inclusions</GlossaryTermTooltip> can significantly impact fatigue life and formability. Automotive 
                  specifications often require inclusion rating per ASTM E45 or ISO 4967:
                </p>
                <ul>
                  <li>Type A (sulfides): Assess stringer length and distribution</li>
                  <li>Type B (aluminates): Evaluate size and clustering</li>
                  <li>Type C (silicates): Check for stringer formation</li>
                  <li>Type D (globular oxides): Measure size and frequency</li>
                </ul>
                <p>
                  Maintain unetched samples for inclusion analysis, as <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> can obscure inclusion details. 
                  Use brightfield illumination and document worst-field ratings as specified.
                </p>

                <h4>Microstructure Verification</h4>
                <p>
                  Verify that the expected <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> is present based on processing:
                </p>
                <ul>
                  <li><strong>Hot-rolled steels:</strong> Check for proper <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip>-<GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip> distribution</li>
                  <li><strong>Cold-worked materials:</strong> Assess deformation structure and recrystallization</li>
                  <li><strong>Dual-phase steels:</strong> Verify <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> distribution in ferrite matrix</li>
                  <li><strong>TRIP steels:</strong> Confirm retained <GlossaryTermTooltip term="Austenite">austenite</GlossaryTermTooltip> presence and distribution</li>
                  <li><strong>Bainitic steels:</strong> Validate bainite morphology and absence of unwanted phases</li>
                </ul>

                <h3>Aluminum Processing Verification</h3>
                <p>
                  <MaterialTooltip materialName="6061 Aluminum">Aluminum</MaterialTooltip> alloys are increasingly used in automotive applications for weight reduction. 
                  Common automotive alloys include <MaterialTooltip materialName="6061 Aluminum">6061</MaterialTooltip> and <MaterialTooltip materialName="7075 Aluminum">7075</MaterialTooltip>. 
                  Verification focuses on:
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Aluminum-silicon, Kellers, 400X.JPG"
                      alt="Aluminum-silicon alloy microstructure at 400X magnification, showing proper grain structure for automotive applications"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Aluminum-silicon alloy, Keller's reagent, 400X magnification. Proper grain structure is essential for automotive aluminum components.</p>
                  </div>
                </AnimateOnScroll>

                <h4>Grain Structure Analysis</h4>
                <p>
                  Aluminum <GlossaryTermTooltip term="Grain">grain</GlossaryTermTooltip> structure affects formability and mechanical properties. Use anodizing 
                  techniques (e.g., Barker's reagent) or polarized light to reveal <GlossaryTermTooltip term="Grain Boundary">grain boundaries</GlossaryTermTooltip>:
                </p>
                <ul>
                  <li>Measure grain size per ASTM E112</li>
                  <li>Assess grain shape (equiaxed vs. elongated)</li>
                  <li>Check for grain size uniformity across the section</li>
                  <li>Document any abnormal grain growth</li>
                </ul>

                <h4>Precipitate Distribution</h4>
                <p>
                  For heat-treatable aluminum alloys (2xxx, 6xxx, 7xxx series), verify <GlossaryTermTooltip term="Precipitate">precipitate</GlossaryTermTooltip> 
                  distribution and size:
                </p>
                <ul>
                  <li>Use appropriate etching (e.g., Keller's reagent, Weck's reagent)</li>
                  <li>Assess precipitate size and distribution uniformity</li>
                  <li>Check for overaging or underaging conditions</li>
                  <li>Document precipitate-free zones (PFZ) at grain boundaries</li>
                </ul>

                <h4>Intermetallic Phase Identification</h4>
                <p>
                  Identify and assess intermetallic phases that affect properties:
                </p>
                <ul>
                  <li>Fe-rich phases (Al<sub>3</sub>Fe, Al<sub>6</sub>Fe): Check size and distribution</li>
                  <li>Si particles: Assess morphology and size in cast alloys</li>
                  <li>Mg<sub>2</sub>Si: Verify in 6xxx series alloys</li>
                  <li>Document any coarse or undesirable intermetallics</li>
                </ul>

                <h4>Processing Defects</h4>
                <p>
                  Check for common processing-related defects:
                </p>
                <ul>
                  <li>Porosity in cast components</li>
                  <li>Oxide inclusions from casting or welding</li>
                  <li>Recrystallization issues in wrought materials</li>
                  <li>Texture effects from rolling or extrusion</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={200}>
              <section id="heat-treatment-validation" className="scroll-mt-24 mb-12">
                <h2>Heat Treatment Validation for Automotive Components</h2>
                <p>
                  <GlossaryTermTooltip term="Heat Treatment">Heat treatment</GlossaryTermTooltip> validation is critical for automotive components where mechanical properties 
                  must meet strict specifications. Proper metallographic analysis confirms that heat treatment 
                  processes have been executed correctly.
                </p>

                <h3>Case Hardening Verification</h3>
                <p>
                  Many automotive components undergo case hardening (carburizing, nitriding, carbonitriding) 
                  to achieve hard surfaces with tough cores:
                </p>

                <h4>Case Depth Measurement</h4>
                <p>
                  Measure case depth per ASTM E1077 or ISO 4970:
                </p>
                <ul>
                  <li>Prepare perpendicular cross-sections through the case</li>
                  <li>Use appropriate etching to reveal case/core boundary</li>
                  <li>Measure effective case depth (to 50 HRC for carburized cases)</li>
                  <li>Measure total case depth (to base carbon content)</li>
                  <li>Document case depth uniformity around the component</li>
                </ul>
                <p>
                  <strong>Etching for case depth:</strong> Use nital (2-4%) for carburized steels. The case 
                  will appear darker due to higher carbon content. For nitrided cases, use nital or 
                  specialized etchants to reveal the compound layer and diffusion zone.
                </p>

                <h4>Case Microstructure Evaluation</h4>
                <p>
                  Assess case microstructure quality:
                </p>
                <ul>
                  <li><strong>Carburized cases:</strong> Check for proper <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> structure, retained 
                  <GlossaryTermTooltip term="Austenite">austenite</GlossaryTermTooltip> content (should be &lt;20% typically), and absence of carbides at grain boundaries</li>
                  <li><strong>Nitrided cases:</strong> Evaluate compound layer thickness and uniformity, 
                  diffusion zone depth, and absence of porosity</li>
                  <li><strong>Carbonitrided cases:</strong> Verify proper case structure and depth uniformity</li>
                </ul>

                <h4>Decarburization Detection</h4>
                <p>
                  Check for surface decarburization that can reduce case hardness:
                </p>
                <ul>
                  <li>Prepare cross-sections perpendicular to the surface</li>
                  <li>Use nital etching to reveal decarburized layer (appears as ferrite)</li>
                  <li>Measure decarburization depth</li>
                  <li>Document and compare against specification limits</li>
                </ul>

                <h3>Quenching and Tempering Validation</h3>
                <p>
                  For <GlossaryTermTooltip term="Quenching">quenched</GlossaryTermTooltip> and <GlossaryTermTooltip term="Tempering">tempered</GlossaryTermTooltip> steels, verify proper transformation:
                </p>

                <h4>Martensite Structure</h4>
                <ul>
                  <li>Verify complete transformation to <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> (no retained <GlossaryTermTooltip term="Austenite">austenite</GlossaryTermTooltip> or bainite)</li>
                  <li>Assess martensite packet size and distribution</li>
                  <li>Check for proper prior austenite grain size</li>
                  <li>Document any untempered martensite in tempered samples</li>
                </ul>

                <h4>Tempering Verification</h4>
                <ul>
                  <li>Confirm proper tempering (no untempered martensite)</li>
                  <li>Assess carbide precipitation and distribution</li>
                  <li>Verify absence of overtempering (excessive carbide coarsening)</li>
                  <li>Check for temper embrittlement in susceptible alloys</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/hardness-testing/microhardness-tester.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/equipment/hardness testing/microhardness tester/alpha-mht-1000z/alpha-mht-1000z-cover.webp"
                        alt="Microhardness tester for case depth measurement in automotive heat treatment validation"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Microhardness tester for case depth measurement. Essential equipment for validating heat treatment in automotive components.</p>
                  </div>
                </AnimateOnScroll>
                <ProductLink 
                  productName="Microhardness Testers"
                  href="https://www.metallographic.com/metallographic-equipment/hardness-testing"
                  description="Essential for case depth measurement and heat treatment validation"
                />

                <h3>Induction Hardening Validation</h3>
                <p>
                  For induction-hardened components (common in automotive):
                </p>
                <ul>
                  <li>Measure hardened depth (to 50 HRC typically)</li>
                  <li>Assess hardness transition zone</li>
                  <li>Verify uniform case depth around the component</li>
                  <li>Check for overheating (grain growth) or underheating (incomplete transformation)</li>
                  <li>Document any soft spots or non-uniform hardening</li>
                </ul>

                <h3>Heat Treatment Defects</h3>
                <p>
                  Identify common heat treatment defects:
                </p>
                <ul>
                  <li><strong>Overheating:</strong> Excessive grain growth, visible at high magnification</li>
                  <li><strong>Burning:</strong> Grain boundary melting or oxidation</li>
                  <li><strong>Incomplete transformation:</strong> Presence of ferrite or pearlite in quenched samples</li>
                  <li><strong>Quench cracks:</strong> Cracks originating from surface, often intergranular</li>
                  <li><strong>Distortion:</strong> Assess through dimensional measurements and microstructure uniformity</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={300}>
              <section id="weld-quality-assessment" className="scroll-mt-24 mb-12">
                <h2>Weld Quality Assessment in Automotive Manufacturing</h2>
                <p>
                  Welding is extensively used in automotive manufacturing for body-in-white construction, 
                  chassis components, and exhaust systems. Metallographic analysis ensures weld quality and 
                  identifies potential failure sites.
                </p>

                <h3>Weld Zone Preparation</h3>
                <p>
                  Proper sample preparation is critical for weld analysis:
                </p>
                <ul>
                  <li>Section perpendicular to the weld direction to reveal full weld profile</li>
                  <li>Include base metal, heat-affected zone (HAZ), and weld metal in the section</li>
                  <li>Prepare multiple sections if assessing weld uniformity</li>
                  <li>Use appropriate mounting to preserve weld geometry</li>
                </ul>

                <h3>Weld Metal Evaluation</h3>
                <p>
                  Assess weld metal microstructure and quality:
                </p>

                <h4>Microstructure Analysis</h4>
                <ul>
                  <li><strong>Steel welds:</strong> Evaluate ferrite content, grain structure, and inclusion distribution</li>
                  <li><strong>Aluminum welds:</strong> Assess grain structure, porosity, and intermetallic formation</li>
                  <li>Check for proper solidification structure (columnar vs. equiaxed grains)</li>
                  <li>Identify any undesirable phases or structures</li>
                </ul>

                <h4>Weld Defects</h4>
                <p>
                  Identify and document weld defects:
                </p>
                <ul>
                  <li><strong>Porosity:</strong> Gas pores, assess size, distribution, and location</li>
                  <li><strong>Inclusions:</strong> Slag inclusions, oxide films, assess size and location</li>
                  <li><strong>Cracks:</strong> Hot cracks, cold cracks, assess location and orientation</li>
                  <li><strong>Incomplete fusion:</strong> Lack of fusion between weld passes or base metal</li>
                  <li><strong>Incomplete penetration:</strong> Insufficient weld penetration</li>
                  <li><strong>Undercut:</strong> Groove at weld toe, measure depth</li>
                </ul>

                <h3>Heat-Affected Zone (HAZ) Analysis</h3>
                <p>
                  The HAZ is often the weakest region in welded joints:
                </p>

                <h4>HAZ Microstructure</h4>
                <ul>
                  <li>Identify different HAZ regions (coarse-grained, fine-grained, intercritical, subcritical)</li>
                  <li>Assess grain size changes compared to base metal</li>
                  <li>Evaluate phase transformations in the HAZ</li>
                  <li>Check for grain growth in coarse-grained HAZ</li>
                </ul>

                <h4>HAZ Hardness</h4>
                <p>
                  Perform microhardness traverses across the weld:
                </p>
                <ul>
                  <li>Measure hardness from base metal through HAZ to weld metal</li>
                  <li>Identify hardness peaks or valleys</li>
                  <li>Compare against specification requirements</li>
                  <li>Document hardness profiles for process validation</li>
                </ul>

                <h3>Fusion Boundary Assessment</h3>
                <p>
                  Evaluate the fusion boundary between weld and base metal:
                </p>
                <ul>
                  <li>Assess fusion line continuity</li>
                  <li>Check for lack of fusion defects</li>
                  <li>Evaluate microstructure transition</li>
                  <li>Identify any brittle phases at the interface</li>
                </ul>

                <h3>Weld Quality Standards</h3>
                <p>
                  Automotive welding often follows standards such as:
                </p>
                <ul>
                  <li>AWS D1.1/D1.1M (Structural Welding Code)</li>
                  <li>ISO 13919 (Electron and laser beam welded joints)</li>
                  <li>ISO 15614 (Specification and qualification of welding procedures)</li>
                  <li>Customer-specific automotive welding standards</li>
                </ul>
                <p>
                  Document findings according to applicable standards and maintain records for quality 
                  certification and traceability.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={400}>
              <section id="industry-requirements" className="scroll-mt-24 mb-12">
                <h2>Industry-Specific Quality Requirements</h2>
                <p>
                  Automotive metallography must comply with industry standards and customer-specific 
                  requirements. Understanding these requirements ensures proper analysis and documentation.
                </p>

                <h3>ISO/TS 16949 Requirements</h3>
                <p>
                  ISO/TS 16949 (now IATF 16949) is the quality management standard for automotive suppliers:
                </p>
                <ul>
                  <li>Requires documented metallographic procedures</li>
                  <li>Mandates proper equipment calibration and maintenance</li>
                  <li>Requires trained and qualified personnel</li>
                  <li>Emphasizes traceability and documentation</li>
                  <li>Requires statistical process control (SPC) for critical characteristics</li>
                </ul>

                <h3>ASTM Standards for Automotive Applications</h3>
                <p>
                  Common ASTM standards used in automotive metallography:
                </p>
                <ul>
                  <li><strong>ASTM E3:</strong> Preparation of metallographic specimens</li>
                  <li><strong>ASTM E112:</strong> Determining average grain size</li>
                  <li><strong>ASTM E45:</strong> Determining the inclusion content of steel</li>
                  <li><strong>ASTM E1077:</strong> Estimating the depth of decarburization of steel specimens</li>
                  <li><strong>ASTM E384:</strong> Microindentation hardness testing</li>
                  <li><strong>ASTM E562:</strong> Determining volume fraction by systematic manual point count</li>
                  <li><strong>ASTM E1245:</strong> Determining the inclusion or second-phase constituent content 
                  of metals by automatic image analysis</li>
                </ul>

                <h3>Material Specifications</h3>
                <p>
                  Automotive materials must meet specific specifications:
                </p>

                <h4>Steel Specifications</h4>
                <ul>
                  <li>SAE J standards for automotive steels</li>
                  <li>Customer-specific material specifications</li>
                  <li>Microstructure requirements (grain size, phase content, inclusion ratings)</li>
                  <li>Hardness and mechanical property requirements</li>
                </ul>

                <h4>Aluminum Specifications</h4>
                <ul>
                  <li>AA (Aluminum Association) specifications</li>
                  <li>Customer-specific requirements</li>
                  <li>Grain size and structure requirements</li>
                  <li>Precipitate and intermetallic phase limitations</li>
                </ul>

                <h3>Documentation Requirements</h3>
                <p>
                  Proper documentation is essential for automotive quality systems:
                </p>
                <ul>
                  <li>Maintain detailed sample preparation records</li>
                  <li>Document all measurements and observations</li>
                  <li>Include high-quality micrographs with proper magnification and scale bars</li>
                  <li>Maintain traceability from sample to report</li>
                  <li>Follow customer-specific reporting formats</li>
                  <li>Archive samples and documentation per retention requirements</li>
                </ul>

                <h3>Quality Control Procedures</h3>
                <p>
                  Implement robust quality control procedures:
                </p>
                <ul>
                  <li>Regular calibration of equipment (hardness testers, microscopes, measuring devices)</li>
                  <li>Proficiency testing and interlaboratory comparisons</li>
                  <li>Standard reference materials for validation</li>
                  <li>Regular review of procedures and methods</li>
                  <li>Training and certification of personnel</li>
                </ul>

                <h3>Customer-Specific Requirements</h3>
                <p>
                  Many automotive customers have specific requirements:
                </p>
                <ul>
                  <li>Customized sample preparation procedures</li>
                  <li>Specific etching requirements</li>
                  <li>Unique measurement and reporting formats</li>
                  <li>Special documentation or certification needs</li>
                  <li>On-site audit requirements</li>
                </ul>
                <p>
                  Always verify customer-specific requirements before beginning analysis and maintain 
                  clear communication throughout the process.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={500}>
              <section id="sample-preparation" className="scroll-mt-24 mb-12">
                <h2>Sample Preparation Considerations</h2>
                <p>
                  Automotive sample <GlossaryTermTooltip term="Preparation">preparation</GlossaryTermTooltip> requires attention to detail to ensure accurate analysis 
                  and compliance with standards.
                </p>

                <h3>Sectioning</h3>
                <p>
                  <GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip> is the first critical step in automotive sample preparation:
                </p>
                <ul>
                  <li>Use appropriate cutting methods to minimize damage</li>
                  <li>For case-hardened samples, ensure sectioning doesn't affect case depth measurement</li>
                  <li>For welds, section perpendicular to weld direction</li>
                  <li>Document sectioning location and orientation</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/abrasive-blades"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/maxcut-vhs.webp"
                        alt="Abrasive cut-off blades for automotive steel sectioning"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">MAX-VHS abrasive blades for sectioning automotive steels. Proper blade selection minimizes damage and preserves microstructure.</p>
                  </div>
                </AnimateOnScroll>
                <ProductLink 
                  productName="Abrasive Cut-Off Blades"
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  description="Select appropriate blades for steel (MAX-VHS) or aluminum (MAX-E) sectioning"
                />

                <h3>Mounting</h3>
                <p>
                  <GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip> provides edge retention and easier handling:
                </p>
                <ul>
                  <li>Use <GlossaryTermTooltip term="Compression Mounting">compression mounting</GlossaryTermTooltip> for most automotive samples</li>
                  <li>Consider <GlossaryTermTooltip term="Castable Mounting">castable mounting</GlossaryTermTooltip> for delicate or complex geometries</li>
                  <li>Ensure mounting preserves edges for case depth or coating analysis</li>
                  <li>Use appropriate mounting materials (conductive for SEM, transparent for edge retention)</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/mounting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/phenolic.webp"
                        alt="Phenolic mounting resin for automotive samples"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Phenolic mounting resin provides excellent edge retention for case depth measurement in automotive components.</p>
                  </div>
                </AnimateOnScroll>
                <ProductLink 
                  productName="Mounting Resins"
                  href="https://shop.metallographic.com/collections/mounting"
                  description="Phenolic and epoxy resins for compression mounting of automotive samples"
                />

                <h3>Grinding and Polishing</h3>
                <p>
                  Progressive <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip> and <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> remove damage and prepare surfaces:
                </p>
                <ul>
                  <li>Follow standard progressive grinding procedures</li>
                  <li>Use appropriate polishing media (diamond for most materials)</li>
                  <li>For aluminum, use careful polishing to avoid smearing</li>
                  <li>For case-hardened samples, ensure flat surfaces for accurate depth measurement</li>
                  <li>Maintain consistent preparation across all samples in a batch</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/grinding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/abrasive grinding-SiC papers.webp"
                        alt="Silicon carbide grinding papers for progressive grinding of automotive samples"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide grinding papers for progressive grinding. Essential for removing sectioning damage in automotive samples.</p>
                  </div>
                </AnimateOnScroll>
                <ProductLink 
                  productName="Silicon Carbide Grinding Papers"
                  href="https://shop.metallographic.com/collections/grinding"
                  description="Progressive grinding papers (120, 240, 400, 600 grit) for automotive sample preparation"
                />
                <AnimateOnScroll animation="fadeInUp" delay={200}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/polishing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/polycrystalline-diamond-high-viscosity.webp"
                        alt="Diamond polishing compounds for automotive sample polishing"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Diamond polishing compounds for fine polishing. Essential for achieving scratch-free surfaces in automotive metallography.</p>
                  </div>
                </AnimateOnScroll>
                <ProductLink 
                  productName="Diamond Polishing Compounds"
                  href="https://shop.metallographic.com/collections/polishing"
                  description="Diamond compounds (9 μm, 3 μm, 1 μm) for polishing automotive steel and aluminum samples"
                />

                <h3>Etching</h3>
                <p>
                  Select appropriate <GlossaryTermTooltip term="Etching">etchants</GlossaryTermTooltip> based on material and analysis requirements:
                </p>
                <ul>
                  <li><strong>Carbon steels:</strong> Nital (2-4%) for general microstructure</li>
                  <li><strong>Alloy steels:</strong> Picral, nital, or specialized etchants</li>
                  <li><strong>Aluminum:</strong> Keller's reagent, Barker's reagent (anodizing), or Weck's reagent</li>
                  <li><strong>Case depth:</strong> Nital for carburized cases, specialized etchants for nitrided cases</li>
                  <li><strong>Inclusions:</strong> Keep samples unetched for inclusion analysis</li>
                </ul>
                <ProductLink 
                  productName="Etching Reagents"
                  href="https://shop.metallographic.com/collections/etching"
                  description="Chemical etchants for revealing microstructures in automotive materials"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={600}>
              <section id="standards-references" className="scroll-mt-24 mb-12">
                <h2>Standards and References</h2>
                
                <h3>ASTM Standards</h3>
                <ul>
                  <li>ASTM E3 - Standard Practice for Preparation of Metallographic Specimens</li>
                  <li>ASTM E112 - Standard Test Methods for Determining Average Grain Size</li>
                  <li>ASTM E45 - Standard Test Methods for Determining the Inclusion Content of Steel</li>
                  <li>ASTM E1077 - Standard Test Methods for Estimating the Depth of Decarburization of Steel Specimens</li>
                  <li>ASTM E384 - Standard Test Method for Microindentation Hardness of Materials</li>
                  <li>ASTM E562 - Standard Test Method for Determining Volume Fraction by Systematic Manual Point Count</li>
                </ul>

                <h3>ISO Standards</h3>
                <ul>
                  <li>ISO 4967 - Steel - Determination of content of non-metallic inclusions - Micrographic method using standard diagrams</li>
                  <li>ISO 4970 - Steel - Determination of effective case hardening depth</li>
                  <li>ISO 643 - Steels - Micrographic determination of the apparent grain size</li>
                  <li>IATF 16949 - Quality management system requirements for automotive production</li>
                </ul>

                <h3>Welding Standards</h3>
                <ul>
                  <li>AWS D1.1/D1.1M - Structural Welding Code - Steel</li>
                  <li>ISO 13919 - Electron and laser beam welded joints</li>
                  <li>ISO 15614 - Specification and qualification of welding procedures for metallic materials</li>
                </ul>

                <h3>Additional Resources</h3>
                <ul>
                  <li>SAE J Standards for automotive materials</li>
                  <li>Customer-specific automotive material and process specifications</li>
                  <li>Industry best practices and technical papers</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={700}>
              <section id="conclusion" className="scroll-mt-24 mb-12">
                <h2>Conclusion</h2>
                <p>
                  Metallographic analysis in automotive applications requires specialized knowledge of materials, 
                  processes, and industry standards. Proper verification of steel and aluminum processing, 
                  validation of heat treatment procedures, assessment of weld quality, and compliance with 
                  industry-specific requirements ensures that automotive components meet the demanding performance 
                  and safety standards required in modern vehicles.
                </p>
                <p>
                  By following standardized procedures, maintaining proper documentation, and staying current 
                  with industry requirements, metallographers contribute to the quality and reliability of 
                  automotive components that millions of people depend on every day.
                </p>
                <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="text-gray-800">
                    <strong>Key Takeaways:</strong> Always verify customer-specific requirements, maintain 
                    detailed documentation, follow applicable standards, and ensure proper sample preparation 
                    for accurate analysis. Quality in automotive metallography directly impacts vehicle safety 
                    and performance.
                  </p>
                </div>
              </section>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
      </article>
    </>
  );
}

