import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GuideSideNav from '@/components/GuideSideNav';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import GlossaryTermTooltip from '@/components/GlossaryTermTooltip';
import MaterialTooltip from '@/components/MaterialTooltip';
import ProductLink from '@/components/ProductLink';
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo';

const guide = getGuideBySlug('medical-device-applications')!;

export const metadata: Metadata = getGuideMetadata(guide);

const sections = [
  { id: 'introduction', label: 'Introduction to Medical Device Metallography' },
  { id: 'biocompatible-preparation', label: 'Biocompatible Material Preparation' },
  { id: 'surface-finish-requirements', label: 'Surface Finish Requirements' },
  { id: 'implant-characterization', label: 'Implant Material Characterization' },
  { id: 'regulatory-compliance', label: 'Regulatory Compliance Considerations' },
  { id: 'sample-preparation', label: 'Specialized Sample Preparation Techniques' },
  { id: 'standards-references', label: 'Standards and References' },
  { id: 'conclusion', label: 'Conclusion' },
];

export default function MedicalDeviceApplicationsPage() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Medical Device Applications Guide
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Application-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Medical Device Applications Guide</h1>
            <p className="text-xl text-gray-600">
              Comprehensive guide to metallographic analysis for medical device applications, covering biocompatible material preparation, surface finish requirements, implant material characterization, and regulatory compliance considerations.
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
                <h2>Introduction to Medical Device Metallography</h2>
                <p>
                  Metallography in medical device applications presents unique challenges and requirements 
                  that differ significantly from industrial metallography. Medical devices, particularly 
                  implants, must meet stringent biocompatibility, surface finish, and regulatory 
                  requirements that directly impact patient safety and device performance.
                </p>
                <p>
                  This guide addresses the specialized metallographic techniques required for medical device 
                  analysis, with emphasis on biocompatible materials (primarily titanium, stainless steel, 
                  and cobalt-chromium alloys), surface finish characterization, implant material evaluation, 
                  and compliance with medical device regulations.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <p className="text-blue-800">
                    <strong>Critical Considerations:</strong> Medical device metallography requires strict 
                    contamination control, detailed documentation for regulatory compliance, specialized 
                    techniques for surface analysis, and understanding of biocompatibility requirements. 
                    Patient safety depends on accurate and thorough analysis.
                  </p>
                </div>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={100}>
              <section id="biocompatible-preparation" className="scroll-mt-24 mb-12">
                <h2>Biocompatible Material Preparation</h2>
                <p>
                  Biocompatible materials used in medical devices require careful preparation to avoid 
                  contamination, preserve surface characteristics, and maintain material integrity. The 
                  most common biocompatible metals are titanium and its alloys, stainless steel (316L), 
                  and cobalt-chromium alloys.
                </p>

                <h3>Titanium and Titanium Alloys</h3>
                <p>
                  <MaterialTooltip materialName="Titanium Grade 5 (Ti-6Al-4V)">Titanium</MaterialTooltip> is widely used in medical implants due to its excellent biocompatibility, 
                  corrosion resistance, and strength-to-weight ratio. Common alloys include commercially 
                  pure titanium (CP Ti) and <MaterialTooltip materialName="Titanium Grade 5 (Ti-6Al-4V)">Ti-6Al-4V</MaterialTooltip>.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Titanium+ZrB2, 400X (DIC).JPG"
                      alt="Titanium alloy microstructure at 400X magnification, showing alpha and beta phases in medical implant material"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Titanium alloy microstructure, 400X magnification (DIC). Proper preparation reveals alpha and beta phases critical for implant performance.</p>
                  </div>
                </AnimateOnScroll>

                <h4>Preparation Considerations</h4>
                <ul>
                  <li><strong>Contamination control:</strong> Titanium is highly reactive. Use clean, 
                  dedicated equipment and avoid cross-contamination with other materials</li>
                  <li><strong>Sectioning:</strong> Use slow cutting speeds and appropriate coolants to 
                  minimize heat generation and prevent surface oxidation</li>
                  <li><strong>Mounting:</strong> Use compression mounting with appropriate pressure to 
                  avoid deformation. Consider castable mounting for porous or delicate structures</li>
                  <li><strong>Grinding:</strong> Use progressive grinding with SiC papers. Titanium 
                  work-hardens easily, so use light pressure and frequent cleaning</li>
                  <li><strong>Polishing:</strong> Use diamond polishing compounds (3 μm, 1 μm, 0.25 μm). 
                  Final polish with colloidal silica or alumina suspension</li>
                </ul>

                <h4>Etching for Titanium</h4>
                <p>
                  Common etchants for titanium alloys:
                </p>
                <ul>
                  <li><strong>Kroll's reagent:</strong> 2-3 mL HF, 5-6 mL HNO<sub>3</sub>, 100 mL H<sub>2</sub>O. 
                  Reveals alpha and beta phases in Ti-6Al-4V</li>
                  <li><strong>Modified Kroll's:</strong> For better contrast, adjust HF concentration</li>
                  <li><strong>Weck's reagent:</strong> For color contrast, especially useful for distinguishing phases</li>
                  <li><strong>Anodizing:</strong> Use anodizing techniques for grain structure analysis</li>
                </ul>
                <p>
                  <strong>Safety note:</strong> HF is extremely hazardous. Use proper PPE, fume hoods, 
                  and follow all safety protocols. Consider alternatives when possible.
                </p>

                <h4>Microstructure Evaluation</h4>
                <ul>
                  <li>Assess alpha and beta <GlossaryTermTooltip term="Phase">phase</GlossaryTermTooltip> distribution in Ti-6Al-4V</li>
                  <li>Measure <GlossaryTermTooltip term="Grain Size">grain size</GlossaryTermTooltip> per ASTM E112</li>
                  <li>Check for alpha case (surface contamination layer) that can affect biocompatibility</li>
                  <li>Evaluate <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> uniformity</li>
                  <li>Document any undesirable phases or structures</li>
                </ul>

                <h3>Stainless Steel (316L)</h3>
                <p>
                  <MaterialTooltip materialName="Stainless Steel 316">316L stainless steel</MaterialTooltip> is commonly used in medical devices due to its corrosion resistance 
                  and biocompatibility. The "L" designation indicates low carbon content, which minimizes 
                  sensitization.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG"
                      alt="Stainless steel microstructure at 400X magnification, showing proper austenitic structure for medical device applications"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Stainless steel microstructure, Kalling's No. 2 etchant, 400X magnification. Proper austenitic structure is essential for medical device biocompatibility.</p>
                  </div>
                </AnimateOnScroll>

                <h4>Preparation Considerations</h4>
                <ul>
                  <li>Standard metallographic preparation techniques apply</li>
                  <li>Use progressive grinding with SiC papers</li>
                  <li>Polish with diamond compounds followed by colloidal silica</li>
                  <li>Maintain cleanliness to avoid contamination</li>
                </ul>

                <h4>Etching for 316L</h4>
                <ul>
                  <li><strong>Electrolytic etching:</strong> 10% oxalic acid, 6V DC, 5-10 seconds. Reveals 
                  grain boundaries and sigma phase</li>
                  <li><strong>Glyceregia:</strong> 15 mL HCl, 10 mL glycerol, 5 mL HNO<sub>3</sub>. 
                  General purpose etchant</li>
                  <li><strong>Aqua regia:</strong> For revealing carbides and sigma phase</li>
                </ul>

                <h4>Microstructure Evaluation</h4>
                <ul>
                  <li>Verify <GlossaryTermTooltip term="Austenite">austenitic</GlossaryTermTooltip> structure (no <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> or <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>)</li>
                  <li>Check for sigma phase formation (brittle intermetallic)</li>
                  <li>Assess <GlossaryTermTooltip term="Grain Size">grain size</GlossaryTermTooltip></li>
                  <li>Check for sensitization (<GlossaryTermTooltip term="Grain Boundary">grain boundary</GlossaryTermTooltip> carbides) that can lead to intergranular corrosion</li>
                  <li>Document <GlossaryTermTooltip term="Inclusion">inclusion</GlossaryTermTooltip> content per ASTM E45</li>
                </ul>

                <h3>Cobalt-Chromium Alloys</h3>
                <p>
                  Cobalt-chromium alloys (e.g., CoCrMo) are used in joint replacements and other high-wear 
                  applications due to their excellent wear resistance and biocompatibility.
                </p>

                <h4>Preparation Considerations</h4>
                <ul>
                  <li>Cobalt-chromium alloys are very hard. Use appropriate cutting and grinding techniques</li>
                  <li>Use diamond polishing compounds throughout</li>
                  <li>May require longer polishing times due to hardness</li>
                  <li>Use light pressure to avoid relief between phases</li>
                </ul>

                <h4>Etching for Cobalt-Chromium</h4>
                <ul>
                  <li><strong>Murakami's reagent:</strong> 10g K<sub>3</sub>Fe(CN)<sub>6</sub>, 10g KOH, 
                  100 mL H<sub>2</sub>O. Colors carbides</li>
                  <li><strong>Glyceregia:</strong> For general microstructure</li>
                  <li><strong>Electrolytic etching:</strong> Various electrolytes can be used</li>
                </ul>

                <h4>Microstructure Evaluation</h4>
                <ul>
                  <li>Assess carbide distribution and morphology</li>
                  <li>Evaluate grain structure</li>
                  <li>Check for proper heat treatment structure</li>
                  <li>Document any undesirable phases</li>
                </ul>

                <h3>Contamination Control</h3>
                <p>
                  Contamination control is critical in medical device metallography:
                </p>
                <ul>
                  <li>Use dedicated equipment for medical device samples when possible</li>
                  <li>Thoroughly clean equipment between samples</li>
                  <li>Use clean, filtered polishing media</li>
                  <li>Avoid cross-contamination between different materials</li>
                  <li>Document cleaning procedures</li>
                  <li>Consider using disposable consumables for critical samples</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={200}>
              <section id="surface-finish-requirements" className="scroll-mt-24 mb-12">
                <h2>Surface Finish Requirements</h2>
                <p>
                  Surface finish is critical in medical devices, particularly implants, as it affects 
                  osseointegration, wear resistance, and biocompatibility. Metallographic analysis must 
                  accurately characterize surface finish without introducing artifacts.
                </p>

                <h3>Surface Roughness Measurement</h3>
                <p>
                  Surface roughness affects implant performance:
                </p>
                <ul>
                  <li><strong>Ra (arithmetic average):</strong> Most common parameter, typically 0.1-2.0 μm 
                  for implants</li>
                  <li><strong>Rz (average maximum height):</strong> Peak-to-valley measurement</li>
                  <li><strong>Rt (total height):</strong> Maximum peak-to-valley distance</li>
                </ul>
                <p>
                  Use profilometry or interferometry for quantitative measurements. Metallography provides 
                  qualitative assessment and cross-sectional analysis.
                </p>

                <h3>Cross-Sectional Surface Analysis</h3>
                <p>
                  Prepare cross-sections perpendicular to the surface to evaluate:
                </p>

                <h4>Surface Topography</h4>
                <ul>
                  <li>Surface roughness profile</li>
                  <li>Surface texture characteristics</li>
                  <li>Coating or surface treatment thickness</li>
                  <li>Surface modification depth</li>
                </ul>

                <h4>Surface Integrity</h4>
                <ul>
                  <li>Absence of cracks or defects</li>
                  <li>Proper surface treatment application</li>
                  <li>Surface contamination assessment</li>
                  <li>Oxide layer evaluation (for titanium)</li>
                </ul>

                <h3>Surface Treatment Evaluation</h3>
                <p>
                  Many medical devices undergo surface treatments to enhance performance:

                </p>

                <h4>Anodizing (Titanium)</h4>
                <ul>
                  <li>Measure anodized layer thickness</li>
                  <li>Assess layer uniformity</li>
                  <li>Check for proper anodizing coverage</li>
                  <li>Evaluate layer adhesion</li>
                </ul>

                <h4>Plasma Spray Coatings</h4>
                <ul>
                  <li>Measure coating thickness</li>
                  <li>Assess coating porosity</li>
                  <li>Evaluate coating-substrate interface</li>
                  <li>Check for delamination or cracks</li>
                  <li>Assess coating microstructure</li>
                </ul>

                <h4>Acid Etching</h4>
                <ul>
                  <li>Evaluate surface texture created by acid etching</li>
                  <li>Assess etching depth and uniformity</li>
                  <li>Check for over-etching or under-etching</li>
                  <li>Document surface morphology</li>
                </ul>

                <h4>Sandblasting/Grit Blasting</h4>
                <ul>
                  <li>Assess surface roughness</li>
                  <li>Check for embedded particles</li>
                  <li>Evaluate surface damage</li>
                  <li>Document surface texture</li>
                </ul>

                <h3>Preparation for Surface Analysis</h3>
                <p>
                  Special considerations for surface finish analysis:
                </p>
                <ul>
                  <li>Section perpendicular to the surface</li>
                  <li>Use appropriate mounting to preserve edges</li>
                  <li>Avoid rounding of edges during grinding and polishing</li>
                  <li>Use edge retention techniques (e.g., nickel plating, specialized mounting)</li>
                  <li>Maintain flat surfaces for accurate measurements</li>
                  <li>Consider using scanning electron microscopy (SEM) for detailed surface analysis</li>
                </ul>

                <h3>Surface Contamination Assessment</h3>
                <p>
                  Check for surface contamination that can affect biocompatibility:
                </p>
                <ul>
                  <li>Metallic contamination from processing</li>
                  <li>Organic contamination</li>
                  <li>Oxide layers (desired or undesired)</li>
                  <li>Embedded particles from surface treatment</li>
                  <li>Residual processing materials</li>
                </ul>
                <p>
                  Use appropriate analytical techniques (EDS, XPS) in conjunction with metallography 
                  to identify contamination types.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={300}>
              <section id="implant-characterization" className="scroll-mt-24 mb-12">
                <h2>Implant Material Characterization</h2>
                <p>
                  Comprehensive characterization of implant materials ensures they meet specifications 
                  and perform as intended in the body. This includes microstructure, mechanical properties, 
                  and biocompatibility-related features.
                </p>

                <h3>Microstructure Characterization</h3>
                <p>
                  Detailed <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> analysis for implants includes:

                </p>

                <h4>Grain Structure</h4>
                <ul>
                  <li><GlossaryTermTooltip term="Grain Size">Grain size</GlossaryTermTooltip> measurement per ASTM E112</li>
                  <li><GlossaryTermTooltip term="Grain">Grain</GlossaryTermTooltip> shape and distribution</li>
                  <li><GlossaryTermTooltip term="Grain Boundary">Grain boundary</GlossaryTermTooltip> characteristics</li>
                  <li>Texture assessment (for wrought materials)</li>
                </ul>

                <h4>Phase Analysis</h4>
                <ul>
                  <li><GlossaryTermTooltip term="Phase">Phase</GlossaryTermTooltip> identification and distribution</li>
                  <li>Phase volume fraction measurement</li>
                  <li>Phase morphology assessment</li>
                  <li>Presence of undesirable phases</li>
                </ul>

                <h4>Precipitate and Inclusion Analysis</h4>
                <ul>
                  <li><GlossaryTermTooltip term="Precipitate">Precipitate</GlossaryTermTooltip> size and distribution</li>
                  <li><GlossaryTermTooltip term="Inclusion">Inclusion</GlossaryTermTooltip> content and type</li>
                  <li>Intermetallic phase assessment</li>
                  <li>Documentation per applicable standards</li>
                </ul>

                <h3>Porous Structures</h3>
                <p>
                  Many implants use porous structures to promote bone ingrowth:
                </p>

                <h4>Porosity Analysis</h4>
                <p>
                  Many medical implants use porous structures to promote bone ingrowth. Proper analysis requires:
                </p>
                <ul>
                  <li>Porosity percentage measurement (ASTM E562)</li>
                  <li>Pore size distribution</li>
                  <li>Pore shape and connectivity</li>
                  <li>Pore uniformity assessment</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Polymer-graphite composite , 200X.JPG"
                      alt="Porous structure in composite material, demonstrating proper preparation for medical implant analysis"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Porous composite structure, 200X magnification. Proper preparation preserves pore structure for accurate analysis in medical implants.</p>
                  </div>
                </AnimateOnScroll>

                <h4>Preparation Challenges</h4>
                <ul>
                  <li>Use vacuum impregnation for porous samples</li>
                  <li>Consider castable mounting to fill pores</li>
                  <li>Avoid pulling out material during grinding/polishing</li>
                  <li>Use appropriate polishing media and techniques</li>
                  <li>Document any preparation artifacts</li>
                </ul>

                <h3>Additively Manufactured Implants</h3>
                <p>
                  Additive manufacturing (3D printing) is increasingly used for custom implants:
                </p>

                <h4>Build Structure Analysis</h4>
                <ul>
                  <li>Layer boundary assessment</li>
                  <li>Build direction effects</li>
                  <li>Melt pool structure</li>
                  <li>Grain growth patterns</li>
                </ul>

                <h4>Defect Analysis</h4>
                <ul>
                  <li>Porosity assessment (lack of fusion, keyhole porosity)</li>
                  <li>Crack detection</li>
                  <li>Inclusion assessment</li>
                  <li>Support structure remnants</li>
                </ul>

                <h4>Microstructure Evaluation</h4>
                <ul>
                  <li>Grain structure in different regions</li>
                  <li>Phase distribution</li>
                  <li>Heat treatment effects</li>
                  <li>Comparison with specification requirements</li>
                </ul>

                <h3>Coating and Surface Modification</h3>
                <p>
                  Many implants have coatings or surface modifications:
                </p>

                <h4>Coating Analysis</h4>
                <ul>
                  <li>Coating thickness measurement</li>
                  <li>Coating uniformity</li>
                  <li>Coating-substrate interface evaluation</li>
                  <li>Coating porosity and defects</li>
                  <li>Coating adhesion assessment</li>
                </ul>

                <h4>Surface Modification</h4>
                <ul>
                  <li>Modified layer thickness</li>
                  <li>Modification depth uniformity</li>
                  <li>Interface characteristics</li>
                  <li>Microstructure changes in modified zone</li>
                </ul>

                <h3>Mechanical Property Correlation</h3>
                <p>
                  Relate microstructure to mechanical properties:
                </p>
                <ul>
                  <li>Hardness measurements (microhardness traverses)</li>
                  <li>Correlation with tensile properties</li>
                  <li>Fatigue performance indicators</li>
                  <li>Wear resistance assessment</li>
                </ul>

                <h3>Biocompatibility-Related Features</h3>
                <p>
                  Assess features that affect biocompatibility:
                </p>
                <ul>
                  <li>Surface oxide layer (for titanium)</li>
                  <li>Surface contamination</li>
                  <li>Microstructure uniformity</li>
                  <li>Absence of toxic phases</li>
                  <li>Proper heat treatment (for alloys)</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={400}>
              <section id="regulatory-compliance" className="scroll-mt-24 mb-12">
                <h2>Regulatory Compliance Considerations</h2>
                <p>
                  Medical device metallography must comply with strict regulatory requirements. Understanding 
                  and following these requirements is essential for device approval and ongoing compliance.
                </p>

                <h3>FDA Requirements (United States)</h3>
                <p>
                  The U.S. Food and Drug Administration (FDA) regulates medical devices:
                </p>

                <h4>Quality System Regulation (21 CFR Part 820)</h4>
                <ul>
                  <li>Requires documented procedures for all processes</li>
                  <li>Mandates equipment calibration and maintenance</li>
                  <li>Requires personnel training and qualification</li>
                  <li>Emphasizes traceability and documentation</li>
                  <li>Requires validation of processes and methods</li>
                  <li>Mandates corrective and preventive action (CAPA) systems</li>
                </ul>

                <h4>Design Controls (21 CFR 820.30)</h4>
                <ul>
                  <li>Metallographic analysis must be part of design validation</li>
                  <li>Material specifications must be verified</li>
                  <li>Process validation requires metallographic evidence</li>
                  <li>Design changes require re-validation</li>
                </ul>

                <h3>ISO 13485 Requirements</h3>
                <p>
                  ISO 13485 is the international quality management standard for medical devices:
                </p>
                <ul>
                  <li>Requires documented quality management system</li>
                  <li>Mandates risk management (ISO 14971)</li>
                  <li>Requires validation of processes</li>
                  <li>Emphasizes traceability</li>
                  <li>Requires management of suppliers</li>
                  <li>Mandates corrective and preventive actions</li>
                </ul>

                <h3>Documentation Requirements</h3>
                <p>
                  Comprehensive documentation is essential for regulatory compliance:
                </p>

                <h4>Procedure Documentation</h4>
                <ul>
                  <li>Documented sample preparation procedures</li>
                  <li>Standard operating procedures (SOPs) for all methods</li>
                  <li>Equipment operation and maintenance procedures</li>
                  <li>Calibration records and schedules</li>
                </ul>

                <h4>Analysis Documentation</h4>
                <ul>
                  <li>Detailed sample preparation records</li>
                  <li>All measurements and observations documented</li>
                  <li>High-quality micrographs with proper magnification and scale bars</li>
                  <li>Traceability from sample to report</li>
                  <li>Review and approval signatures</li>
                  <li>Retention of records per regulatory requirements</li>
                </ul>

                <h4>Report Requirements</h4>
                <ul>
                  <li>Clear identification of sample and device</li>
                  <li>Methods used (referencing standards)</li>
                  <li>Results with appropriate precision and accuracy</li>
                  <li>Conclusions and recommendations</li>
                  <li>Reviewer and approver identification</li>
                  <li>Date and version control</li>
                </ul>

                <h3>Material Specifications</h3>
                <p>
                  Medical device materials must meet specific specifications:
                </p>

                <h4>ASTM Standards for Medical Materials</h4>
                <ul>
                  <li><strong>ASTM F67:</strong> Unalloyed titanium for surgical implant applications</li>
                  <li><strong>ASTM F136:</strong> Wrought titanium-6aluminum-4vanadium ELI (extra low interstitial) alloy</li>
                  <li><strong>ASTM F138:</strong> Stainless steel bar and wire for surgical implants</li>
                  <li><strong>ASTM F75:</strong> Cobalt-28chromium-6molybdenum alloy castings</li>
                  <li><strong>ASTM F1537:</strong> Wrought cobalt-28chromium-6molybdenum alloy</li>
                </ul>

                <h4>Verification Requirements</h4>
                <ul>
                  <li>Verify material composition (per specification)</li>
                  <li>Confirm microstructure meets requirements</li>
                  <li>Validate mechanical properties</li>
                  <li>Check for compliance with biocompatibility requirements</li>
                </ul>

                <h3>Biocompatibility Standards</h3>
                <p>
                  Biocompatibility is assessed per ISO 10993:
                </p>
                <ul>
                  <li>Material characterization (Part 18)</li>
                  <li>Cytotoxicity testing</li>
                  <li>Sensitization assessment</li>
                  <li>Systemic toxicity evaluation</li>
                  <li>Implantation studies</li>
                </ul>
                <p>
                  Metallography supports biocompatibility assessment by ensuring proper material 
                  structure and absence of toxic phases or contamination.
                </p>

                <h3>Risk Management (ISO 14971)</h3>
                <p>
                  Risk management is integral to medical device development:
                </p>
                <ul>
                  <li>Identify material-related hazards</li>
                  <li>Assess risks associated with material failures</li>
                  <li>Implement controls (including metallographic verification)</li>
                  <li>Monitor effectiveness of controls</li>
                  <li>Document risk management activities</li>
                </ul>

                <h3>Audit Readiness</h3>
                <p>
                  Maintain audit readiness:
                </p>
                <ul>
                  <li>Organized documentation system</li>
                  <li>Easy retrieval of records</li>
                  <li>Clear traceability</li>
                  <li>Trained personnel</li>
                  <li>Calibrated and maintained equipment</li>
                  <li>Validated procedures</li>
                </ul>

                <h3>Change Control</h3>
                <p>
                  Any changes to materials, processes, or procedures require:
                </p>
                <ul>
                  <li>Documentation of the change</li>
                  <li>Impact assessment</li>
                  <li>Validation of the change</li>
                  <li>Regulatory notification if required</li>
                  <li>Updated documentation</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={500}>
              <section id="sample-preparation" className="scroll-mt-24 mb-12">
                <h2>Specialized Sample Preparation Techniques</h2>
                <p>
                  Medical device samples often require specialized preparation techniques to preserve 
                  critical features and meet regulatory requirements.
                </p>

                <h3>Sectioning</h3>
                <p>
                  <GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip> medical device samples requires careful technique:
                </p>
                <ul>
                  <li>Use appropriate cutting methods to minimize damage</li>
                  <li>For porous structures, use careful sectioning to avoid pullout</li>
                  <li>For coated samples, ensure sectioning doesn't delaminate coatings</li>
                  <li>Document sectioning location and orientation</li>
                  <li>Maintain cleanliness to avoid contamination</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/precision-wafering.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/equipment/precision wafering/gravity feed precision cutters/pico-155s/pico-155s-cover.webp"
                        alt="Precision wafering equipment for medical device sample sectioning"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Precision wafering equipment for low-damage sectioning of medical device samples. Essential for preserving delicate implant structures.</p>
                  </div>
                </AnimateOnScroll>
                <ProductLink 
                  productName="Precision Wafering Equipment"
                  href="https://www.metallographic.com/metallographic-equipment/precision-wafering.html"
                  description="Low-damage sectioning for medical device samples"
                />

                <h3>Mounting</h3>
                <p>
                  <GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip> medical device samples requires special considerations:
                </p>
                <ul>
                  <li>Use appropriate mounting methods based on sample type</li>
                  <li>For porous samples, use vacuum impregnation or <GlossaryTermTooltip term="Castable Mounting">castable mounting</GlossaryTermTooltip></li>
                  <li>For edge retention, consider nickel plating or specialized mounting</li>
                  <li>Use mounting materials compatible with intended analysis</li>
                  <li>Ensure mounting doesn't introduce contamination</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/castable-mounting.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/equipment/castable mounting/vacuum mounting system/lssa-011-cover.webp"
                        alt="Vacuum mounting system for porous medical device samples"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Vacuum mounting system for porous implant samples. Ensures proper resin infiltration without introducing artifacts.</p>
                  </div>
                </AnimateOnScroll>
                <ProductLink 
                  productName="Castable Mounting Systems"
                  href="https://www.metallographic.com/metallographic-equipment/castable-mounting.html"
                  description="Vacuum and pressure mounting systems for porous medical device samples"
                />

                <h3>Grinding and Polishing</h3>
                <p>
                  <GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip> and <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> require contamination control:
                </p>
                <ul>
                  <li>Follow standard progressive procedures</li>
                  <li>For titanium, use careful polishing to avoid <GlossaryTermTooltip term="Smearing">smearing</GlossaryTermTooltip></li>
                  <li>For hard materials (cobalt-chromium), use appropriate abrasives</li>
                  <li>For porous structures, use gentle techniques to avoid pullout</li>
                  <li>Maintain flat surfaces for accurate measurements</li>
                  <li>Use clean, filtered polishing media</li>
                </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/polishing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/polycrystalline-diamond-high-viscosity.webp"
                        alt="Diamond polishing compounds for medical device sample preparation"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Diamond polishing compounds for medical device samples. Clean, filtered media is essential to avoid contamination.</p>
                  </div>
                </AnimateOnScroll>
                <ProductLink 
                  productName="Diamond Polishing Compounds"
                  href="https://shop.metallographic.com/collections/polishing"
                  description="High-quality diamond compounds for contamination-free polishing of medical device materials"
                />

                <h3>Etching</h3>
                <p>
                  Select etchants based on material and analysis requirements:
                </p>
                <ul>
                  <li><strong>Titanium:</strong> Kroll's reagent, Weck's reagent, anodizing</li>
                  <li><strong>Stainless steel (316L):</strong> Electrolytic oxalic acid, glyceregia</li>
                  <li><strong>Cobalt-chromium:</strong> Murakami's reagent, glyceregia</li>
                  <li><strong>Surface analysis:</strong> May require minimal or no etching</li>
                </ul>
                <p>
                  <strong>Safety:</strong> Many medical device etchants contain hazardous chemicals (HF, 
                  strong acids). Always use proper PPE and fume hoods.
                </p>

                <h3>Cleanliness and Contamination Control</h3>
                <ul>
                  <li>Use dedicated equipment when possible</li>
                  <li>Thoroughly clean between samples</li>
                  <li>Use filtered, clean polishing media</li>
                  <li>Avoid cross-contamination</li>
                  <li>Document cleaning procedures</li>
                  <li>Consider disposable consumables for critical samples</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={600}>
              <section id="standards-references" className="scroll-mt-24 mb-12">
                <h2>Standards and References</h2>
                
                <h3>ASTM Standards</h3>
                <ul>
                  <li>ASTM E3 - Standard Practice for Preparation of Metallographic Specimens</li>
                  <li>ASTM E112 - Standard Test Methods for Determining Average Grain Size</li>
                  <li>ASTM E384 - Standard Test Method for Microindentation Hardness of Materials</li>
                  <li>ASTM E562 - Standard Test Method for Determining Volume Fraction by Systematic Manual Point Count</li>
                  <li>ASTM F67 - Standard Specification for Unalloyed Titanium for Surgical Implant Applications</li>
                  <li>ASTM F136 - Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI Alloy</li>
                  <li>ASTM F138 - Standard Specification for Wrought 18Chromium-14Nickel-2.5Molybdenum Stainless Steel Bar and Wire</li>
                  <li>ASTM F75 - Standard Specification for Cobalt-28Chromium-6Molybdenum Alloy Castings</li>
                  <li>ASTM F1537 - Standard Specification for Wrought Cobalt-28Chromium-6Molybdenum Alloy</li>
                </ul>

                <h3>ISO Standards</h3>
                <ul>
                  <li>ISO 13485 - Medical devices - Quality management systems</li>
                  <li>ISO 14971 - Medical devices - Application of risk management</li>
                  <li>ISO 10993 - Biological evaluation of medical devices</li>
                  <li>ISO 5832 - Implants for surgery - Metallic materials</li>
                  <li>ISO 643 - Steels - Micrographic determination of the apparent grain size</li>
                </ul>

                <h3>Regulatory References</h3>
                <ul>
                  <li>21 CFR Part 820 - Quality System Regulation (FDA)</li>
                  <li>21 CFR Part 820.30 - Design Controls (FDA)</li>
                  <li>EU MDR (European Medical Device Regulation)</li>
                  <li>MDSAP (Medical Device Single Audit Program)</li>
                </ul>

                <h3>Additional Resources</h3>
                <ul>
                  <li>Medical device manufacturer specifications</li>
                  <li>Industry best practices and technical papers</li>
                  <li>Biocompatibility testing guidelines</li>
                  <li>Regulatory guidance documents</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={700}>
              <section id="conclusion" className="scroll-mt-24 mb-12">
                <h2>Conclusion</h2>
                <p>
                  Metallographic analysis for medical device applications requires specialized knowledge 
                  of biocompatible materials, surface finish characterization, implant material evaluation, 
                  and regulatory compliance. The unique requirements of medical devices, particularly 
                  implants, demand meticulous attention to contamination control, detailed documentation, 
                  and adherence to regulatory standards.
                </p>
                <p>
                  By following proper preparation techniques, maintaining comprehensive documentation, 
                  and staying current with regulatory requirements, metallographers contribute to the 
                  safety and effectiveness of medical devices that improve and save lives. The critical 
                  nature of medical device applications makes accuracy, thoroughness, and compliance 
                  essential in every aspect of the analysis.
                </p>
                <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="text-gray-800">
                    <strong>Key Takeaways:</strong> Maintain strict contamination control, document 
                    everything thoroughly for regulatory compliance, understand biocompatibility requirements, 
                    use appropriate techniques for surface analysis, and stay current with regulatory 
                    standards. Patient safety depends on accurate and thorough metallographic analysis.
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

