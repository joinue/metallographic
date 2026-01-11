import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GuideSideNav from '@/components/GuideSideNav'
import ProductLink from '@/components/ProductLink'
import GlossaryTermTooltip from '@/components/GlossaryTermTooltip'
import MaterialTooltip from '@/components/MaterialTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('heat-treatment-verification')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'verifying-effectiveness', label: 'Verifying Heat Treatment Effectiveness' },
  { id: 'case-depth-measurement', label: 'Case Depth Measurement' },
  { id: 'decarburization-detection', label: 'Decarburization Detection' },
  { id: 'microstructure-validation', label: 'Microstructure Validation' },
  { id: 'sample-preparation', label: 'Sample Preparation' },
  { id: 'etching-considerations', label: 'Etching Considerations' },
  { id: 'common-heat-treatments', label: 'Common Heat Treatment Processes' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function HeatTreatmentVerificationGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Heat Treatment Verification
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Application-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Heat Treatment Verification</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to verifying heat treatment effectiveness through metallographic analysis, 
              including case depth measurement, decarburization detection, and microstructure validation for 
              different heat treatment processes.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#verifying-effectiveness" className="text-primary-600 hover:underline">Verifying Heat Treatment Effectiveness</a></li>
              <li><a href="#case-depth-measurement" className="text-primary-600 hover:underline">Case Depth Measurement</a></li>
              <li><a href="#decarburization-detection" className="text-primary-600 hover:underline">Decarburization Detection</a></li>
              <li><a href="#microstructure-validation" className="text-primary-600 hover:underline">Microstructure Validation</a></li>
              <li><a href="#sample-preparation" className="text-primary-600 hover:underline">Sample Preparation</a></li>
              <li><a href="#etching-considerations" className="text-primary-600 hover:underline">Etching Considerations</a></li>
              <li><a href="#common-heat-treatments" className="text-primary-600 hover:underline">Common Heat Treatment Processes</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                <GlossaryTermTooltip term="Heat Treatment">Heat treatment</GlossaryTermTooltip> verification is a critical application of metallography that ensures materials 
                have been properly heat treated to achieve desired properties. Through careful sample preparation 
                and <GlossaryTermTooltip term="Microstructure">microstructural</GlossaryTermTooltip> analysis, metallographers can verify that heat treatment processes have been 
                executed correctly and that materials meet specified requirements.
              </p>
              <p>
                This guide covers the metallographic techniques used to verify heat treatment effectiveness, 
                including case depth measurement, <GlossaryTermTooltip term="Decarburization">decarburization</GlossaryTermTooltip> detection, and microstructure validation. 
                Proper sample preparation is essential for accurate verification, as preparation artifacts can 
                mask or mimic heat treatment effects.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/1095 Steel water quenched, martensite, Vilellas, 1000X.JPG"
                  alt="1095 Steel quenched to martensite, properly prepared and etched with Vilella's reagent at 1000X magnification"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  <GlossaryTermTooltip term="Martensite">Martensite</GlossaryTermTooltip> microstructure in 1095 steel after water quenching, etched with Vilella's reagent. 
                  This demonstrates the characteristic needle-like structure of martensite formed through proper heat treatment.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Key Principle:</strong> Heat treatment verification requires careful sample preparation 
                  that preserves the true microstructure and avoids artifacts that could be mistaken for heat 
                  treatment effects. Proper <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip>, <GlossaryTermTooltip term="Mounting">mounting</GlossaryTermTooltip>, <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip>, <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip>, and <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> are all 
                  critical for accurate analysis.
                </p>
              </div>
            </section>

            <section id="verifying-effectiveness" className="scroll-mt-24">
              <h2>Verifying Heat Treatment Effectiveness</h2>
              <p>
                Heat treatment verification involves multiple approaches to confirm that materials have been 
                properly processed. The primary methods include microstructural examination, hardness testing, 
                and dimensional analysis.
              </p>

              <h3>Microstructural Examination</h3>
              <p>
                The most direct method for verifying heat treatment is examining the <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip>:
              </p>
              <ul>
                <li><strong><GlossaryTermTooltip term="Phase">Phase</GlossaryTermTooltip> identification:</strong> Verify the presence of expected phases (<GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>, 
                <GlossaryTermTooltip term="Bainite">bainite</GlossaryTermTooltip>, <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip>, <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip>, etc.)</li>
                <li><strong><GlossaryTermTooltip term="Grain Size">Grain size</GlossaryTermTooltip>:</strong> Measure and compare grain size to specifications</li>
                <li><strong>Phase distribution:</strong> Assess uniformity and distribution of phases</li>
                <li><strong>Microstructural gradients:</strong> Identify transitions in case-hardened materials</li>
                <li><strong>Anomalies:</strong> Detect unexpected phases or microstructural features</li>
              </ul>

              <h3>Hardness Testing</h3>
              <p>
                <GlossaryTermTooltip term="Hardness Testing">Hardness</GlossaryTermTooltip> measurements provide quantitative verification of heat treatment effectiveness:
              </p>
              <ul>
                <li><strong>Surface hardness:</strong> Verify surface hardness meets specifications</li>
                <li><strong>Hardness profiles:</strong> Measure hardness gradients in case-hardened materials</li>
                <li><strong>Core hardness:</strong> Verify core properties are within acceptable ranges</li>
                <li><strong>Uniformity:</strong> Check hardness consistency across the sample</li>
              </ul>
              <p>
                For detailed information on preparing samples for hardness testing, see our{' '}
                <Link href="/guides/hardness-testing-preparation" className="text-primary-600 hover:underline">
                  Hardness Testing Preparation
                </Link>{' '}
                guide.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://metallographic.com/metallographic-equipment/hardness-testing/microhardness-tester.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/equipment/hardness testing/microhardness tester/alpha-mht-1000z/alpha-mht-1000z-cover.webp"
                    alt="Microhardness tester for case depth measurements and hardness profiling"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Microhardness testers (Vickers and Knoop) are essential for accurate case depth measurements. 
                  The elongated Knoop indenter is particularly useful for testing near edges and in thin case layers.
                </p>
              </div>
              <ProductLink 
                productName="Microhardness Testers"
                href="https://metallographic.com/metallographic-equipment/hardness-testing"
                description="Vickers and Knoop microhardness testers for case depth measurements and hardness profiling"
              />

              <h3>Dimensional Analysis</h3>
              <p>
                Heat treatment can cause dimensional changes that must be verified:
              </p>
              <ul>
                <li><strong>Case depth:</strong> Measure effective case depth and total case depth</li>
                <li><strong>Distortion:</strong> Assess dimensional changes from heat treatment</li>
                <li><strong>Layer thickness:</strong> Measure thickness of surface-modified layers</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/equipment/microscopy/metallurgical microscopes/im-5000/im-5000-cover.webp"
                    alt="Metallographic microscope for microstructural analysis and case depth measurements"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  High-quality metallographic microscopes with calibrated eyepieces enable accurate case depth 
                  and dimensional measurements. Essential for microstructural examination and verification.
                </p>
              </div>
              <ProductLink 
                productName="Metallographic Microscopes"
                href="https://metallographic.com/metallographic-equipment/microscopes"
                description="High-quality microscopes with calibrated eyepieces for accurate case depth and dimensional measurements"
              />

              <h3>Verification Checklist</h3>
              <div className="bg-gray-50 p-4 my-6 rounded">
                <p className="font-semibold mb-2">Before beginning verification, ensure you have:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Heat treatment specifications and requirements</li>
                  <li>Material composition and grade</li>
                  <li>Expected microstructure for the heat treatment</li>
                  <li>Hardness requirements (if applicable)</li>
                  <li>Case depth requirements (for case-hardened materials)</li>
                  <li>Reference samples (if available) for comparison</li>
                </ul>
              </div>
            </section>

            <section id="case-depth-measurement" className="scroll-mt-24">
              <h2>Case Depth Measurement</h2>
              <p>
                Case depth measurement is critical for verifying case-hardening processes such as <GlossaryTermTooltip term="Carburizing">carburizing</GlossaryTermTooltip>, 
                <GlossaryTermTooltip term="Nitriding">nitriding</GlossaryTermTooltip>, carbonitriding, and induction hardening. Accurate measurement requires proper sample 
                preparation and careful analysis.
              </p>

              <h3>Types of Case Depth</h3>
              <p>
                Different definitions of case depth are used depending on the application:
              </p>
              <ul>
                <li><strong>Total case depth:</strong> Distance from surface to point where microstructure 
                becomes indistinguishable from core</li>
                <li><strong>Effective case depth:</strong> Distance from surface to point where hardness 
                reaches a specified value (typically 50 HRC or 550 HV)</li>
                <li><strong>Hardness case depth:</strong> Depth to a specific hardness level</li>
                <li><strong>Microstructural case depth:</strong> Depth based on microstructural changes</li>
              </ul>

              <h3>Sample Preparation for Case Depth Measurement</h3>
              <p>
                Proper preparation is essential for accurate case depth measurements:
              </p>
              <ul>
                <li><strong><GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip>:</strong> Cut perpendicular to the case-hardened surface to reveal 
                the full case depth profile</li>
                <li><strong><GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip>:</strong> Use hard mounting materials (phenolic) for excellent edge 
                retention, critical for accurate surface measurements</li>
                <li><strong><GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip> and <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip>:</strong> Follow standard procedures with emphasis on 
                maintaining flatness and edge retention</li>
                <li><strong>Edge retention:</strong> Critical for accurate surface hardness measurements 
                and microstructural analysis at the surface</li>
              </ul>
              <p>
                For detailed edge retention techniques, refer to the{' '}
                <Link href="/guides/hardness-testing-preparation" className="text-primary-600 hover:underline">
                  Hardness Testing Preparation
                </Link>{' '}
                guide.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/mounting-resins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/phenolic.webp"
                      alt="Phenolic mounting resins for excellent edge retention"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">
                    Hard phenolic mounting resins provide excellent edge retention, critical for accurate 
                    case depth and decarburization measurements.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polycrystalline-diamond-high-viscosity.webp"
                      alt="Diamond polishing compounds for scratch-free surfaces"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">
                    High-quality diamond polishing compounds create scratch-free surfaces essential for 
                    microhardness testing and accurate microstructural analysis.
                  </p>
                </div>
              </div>
              <ProductLink 
                productName="Phenolic Mounting Resins"
                href="https://shop.metallographic.com/collections/mounting-resins"
                description="Hard phenolic resins provide excellent edge retention essential for case depth measurements"
              />
              <ProductLink 
                productName="Diamond Polishing Compounds"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond polishing compounds for scratch-free surfaces required for microhardness testing"
              />

              <h3>Measurement Methods</h3>
              
              <h4>Microhardness Traverse Method</h4>
              <p>
                The most accurate method for measuring effective case depth:
              </p>
              <ol>
                <li>Prepare sample with excellent edge retention</li>
                <li>Make microhardness measurements at increasing depths from the surface</li>
                <li>Start at or very near the surface (typically 0.05-0.1 mm)</li>
                <li>Continue measurements at regular intervals (0.05-0.1 mm spacing)</li>
                <li>Continue until hardness reaches core level</li>
                <li>Plot hardness vs. depth and determine effective case depth</li>
              </ol>
              <p>
                <strong>Knoop hardness</strong> is often preferred for case depth measurements because the 
                elongated indenter allows testing closer to edges and provides better resolution in thin case layers. 
                This is particularly important when measuring the effective case depth, which requires accurate 
                hardness measurements starting at or very near the surface.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt="Ferrite-pearlite steel microstructure showing proper preparation for case depth analysis"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Properly prepared and etched steel microstructure showing <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> and <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip>. 
                  Such preparation quality is essential for accurate case depth measurements and microstructural analysis.
                </p>
              </div>

              <h4>Microstructural Method</h4>
              <p>
                Visual measurement based on microstructural changes:
              </p>
              <ol>
                <li>Etch sample to reveal case/core boundary</li>
                <li>Examine at appropriate magnification (typically 100-200x)</li>
                <li>Measure distance from surface to where microstructure changes</li>
                <li>Use calibrated eyepiece or image analysis software</li>
              </ol>
              <p>
                This method is less precise than hardness traverse but faster and useful for quality control.
              </p>

              <h4>Combined Method</h4>
              <p>
                The most comprehensive approach combines both methods:
              </p>
              <ul>
                <li>Use microhardness traverse for quantitative effective case depth</li>
                <li>Use microstructural examination to verify case/core boundary</li>
                <li>Compare results to ensure consistency</li>
                <li>Document both measurements in report</li>
              </ul>

              <h3>Common Case-Hardening Processes</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Process</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Typical Case Depth</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Key Microstructural Features</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Preferred Etchant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Carburizing</td>
                      <td className="border border-gray-300 px-4 py-3">0.5-3.0 mm</td>
                      <td className="border border-gray-300 px-4 py-3">High-carbon <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> in case, <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip>/<GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip> in core</td>
                      <td className="border border-gray-300 px-4 py-3">Nital (2-4%)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Nitriding</td>
                      <td className="border border-gray-300 px-4 py-3">0.1-0.8 mm</td>
                      <td className="border border-gray-300 px-4 py-3">Compound layer (white layer), diffusion zone</td>
                      <td className="border border-gray-300 px-4 py-3">Nital, or unetched</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Carbonitriding</td>
                      <td className="border border-gray-300 px-4 py-3">0.1-0.8 mm</td>
                      <td className="border border-gray-300 px-4 py-3"><GlossaryTermTooltip term="Martensite">Martensite</GlossaryTermTooltip> with retained austenite</td>
                      <td className="border border-gray-300 px-4 py-3">Nital (2-4%)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Induction Hardening</td>
                      <td className="border border-gray-300 px-4 py-3">1-10 mm</td>
                      <td className="border border-gray-300 px-4 py-3"><GlossaryTermTooltip term="Martensite">Martensite</GlossaryTermTooltip> in case, original core structure</td>
                      <td className="border border-gray-300 px-4 py-3">Nital (2-4%)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Flame Hardening</td>
                      <td className="border border-gray-300 px-4 py-3">1-10 mm</td>
                      <td className="border border-gray-300 px-4 py-3"><GlossaryTermTooltip term="Martensite">Martensite</GlossaryTermTooltip> in case, original core structure</td>
                      <td className="border border-gray-300 px-4 py-3">Nital (2-4%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Best Practice:</strong> For case depth measurements, prepare multiple samples and 
                  take measurements at several locations to account for variations. Report both average and 
                  range of measurements.
                </p>
              </div>
            </section>

            <section id="decarburization-detection" className="scroll-mt-24">
              <h2>Decarburization Detection</h2>
              <p>
                Decarburization is the loss of carbon from the surface of steel during heat treatment, 
                resulting in a soft surface layer that can compromise component performance. Detecting and 
                measuring decarburization is essential for quality control.
              </p>

              <h3>What is Decarburization?</h3>
              <p>
                Decarburization occurs when carbon diffuses out of the steel surface during heating in 
                oxidizing or decarburizing atmospheres. This creates a surface layer with lower carbon 
                content than the core material.
              </p>
              <ul>
                <li><strong>Partial decarburization:</strong> Gradual decrease in carbon content from 
                surface to core</li>
                <li><strong>Total decarburization:</strong> Complete loss of carbon at the surface, 
                resulting in pure <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> layer</li>
                <li><strong>Selective decarburization:</strong> Decarburization of specific phases 
                (e.g., <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip>)</li>
              </ul>

              <h3>Microstructural Identification</h3>
              <p>
                Decarburization is identified by microstructural changes:
              </p>
              <ul>
                <li><strong>Ferrite layer:</strong> Pure <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> at the surface (total decarburization)</li>
                <li><strong>Reduced pearlite:</strong> Decreased <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip> content near surface (partial 
                decarburization)</li>
                <li><strong><GlossaryTermTooltip term="Grain Size">Grain size</GlossaryTermTooltip> differences:</strong> Often coarser ferrite grains in decarburized zone</li>
                <li><strong>Microhardness gradient:</strong> Lower hardness at surface, increasing toward core</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Pearlite-ferrite.JPG"
                  alt="Pearlite and ferrite microstructure showing proper preparation for decarburization detection"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  <GlossaryTermTooltip term="Pearlite">Pearlite</GlossaryTermTooltip> and <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> microstructure. 
                  Decarburization would appear as a surface layer with reduced pearlite content or pure ferrite, 
                  requiring careful preparation and etching to reveal.
                </p>
              </div>

              <h3>Sample Preparation for Decarburization Detection</h3>
              <p>
                Proper preparation is critical for accurate decarburization measurement:
              </p>
              <ul>
                <li><strong><GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip>:</strong> Cut perpendicular to the surface to reveal the full 
                decarburization depth</li>
                <li><strong><GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip>:</strong> Use hard mounting materials for edge retention</li>
                <li><strong><GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip> and <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip>:</strong> Standard procedures with emphasis on edge 
                retention and flatness</li>
                <li><strong>Minimize artifacts:</strong> Avoid preparation artifacts that could be 
                mistaken for decarburization</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/abrasive grinding-SiC papers.webp"
                    alt="Silicon carbide grinding papers for progressive grinding"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Progressive silicon carbide grinding papers remove sectioning damage while preserving 
                  surface features essential for decarburization detection.
                </p>
              </div>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Progressive grinding papers for removing sectioning damage while preserving surface features"
              />

              <h3>Etching for Decarburization</h3>
              <p>
                Proper <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> is essential to reveal decarburization:
              </p>
              <ul>
                <li><strong>Nital (2-4%):</strong> Most common etchant for carbon steels</li>
                <li><strong>Picral:</strong> Alternative etchant that better reveals <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip></li>
                <li><strong>Light etching:</strong> Use lighter etching to avoid over-etching the 
                decarburized surface</li>
                <li><strong>Multiple etches:</strong> May need to try different etchants or etching 
                times to optimize contrast</li>
              </ul>

              <h3>Measurement Methods</h3>
              
              <h4>Microstructural Method</h4>
              <p>
                Visual measurement of decarburization depth:
              </p>
              <ol>
                <li>Etch sample to reveal microstructure</li>
                <li>Examine at 100-200x magnification</li>
                <li>Identify the depth where microstructure returns to normal</li>
                <li>Measure from surface to this point</li>
                <li>Take measurements at multiple locations</li>
              </ol>

              <h4>Microhardness Method</h4>
              <p>
                Quantitative measurement using hardness traverse:
              </p>
              <ol>
                <li>Make microhardness measurements from surface into core</li>
                <li>Identify depth where hardness reaches core level</li>
                <li>This depth represents the effective decarburization depth</li>
              </ol>
              <p>
                This method is more objective and quantitative than microstructural measurement.
              </p>

              <h3>Acceptance Criteria</h3>
              <p>
                Decarburization limits depend on application:
              </p>
              <ul>
                <li><strong>General applications:</strong> Typically 0.1-0.5 mm maximum</li>
                <li><strong>Critical applications:</strong> Often 0.05-0.1 mm maximum</li>
                <li><strong>Bearing applications:</strong> Very strict limits, often near zero</li>
                <li><strong>Specifications:</strong> Always refer to material or component specifications</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Important:</strong> Decarburization can be removed by machining, but this must 
                  be accounted for in component design. Verify that sufficient material remains after 
                  machining to remove decarburization.
                </p>
              </div>
            </section>

            <section id="microstructure-validation" className="scroll-mt-24">
              <h2>Microstructure Validation for Different Heat Treatment Processes</h2>
              <p>
                Different heat treatment processes produce characteristic microstructures that can be 
                verified through metallographic examination. Understanding expected microstructures is 
                essential for accurate verification.
              </p>

              <h3>Quenching and Tempering</h3>
              <p>
                <GlossaryTermTooltip term="Quenching">Quenching</GlossaryTermTooltip> and <GlossaryTermTooltip term="Tempering">tempering</GlossaryTermTooltip> produces <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> that is tempered to various hardness levels:
              </p>
              <ul>
                <li><strong>As-quenched:</strong> <GlossaryTermTooltip term="Martensite">Martensite</GlossaryTermTooltip> with possible retained <GlossaryTermTooltip term="Austenite">austenite</GlossaryTermTooltip></li>
                <li><strong>Low temper (150-250°C):</strong> Tempered <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>, high hardness</li>
                <li><strong>Medium temper (300-450°C):</strong> Tempered <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>, moderate hardness</li>
                <li><strong>High temper (500-650°C):</strong> Tempered <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> approaching spheroidized 
                structure, lower hardness</li>
              </ul>
              <p>
                <strong>Verification:</strong> Examine for uniform <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> structure, appropriate 
                tempering response, and absence of untempered martensite in high-temper applications.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/1095 Steel water quenched, martensite, Vilellas, 1000X.JPG"
                  alt="1095 Steel quenched to martensite showing characteristic needle-like structure"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  <GlossaryTermTooltip term="Martensite">Martensite</GlossaryTermTooltip> in 1095 steel after water quenching, etched with Vilella's reagent. 
                  This characteristic needle-like structure is typical of quenched and tempered steels.
                </p>
              </div>

              <h3>Normalizing</h3>
              <p>
                Normalizing produces fine <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip> and <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip>:
              </p>
              <ul>
                <li><strong>Microstructure:</strong> Fine <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip> in <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> matrix</li>
                <li><strong>Grain size:</strong> Refined, uniform <GlossaryTermTooltip term="Grain">grain</GlossaryTermTooltip> structure</li>
                <li><strong>Uniformity:</strong> Consistent <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> throughout</li>
              </ul>
              <p>
                <strong>Verification:</strong> Check for fine, uniform <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip>-<GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> structure and 
                absence of coarse structures or banding.
              </p>

              <h3>Annealing</h3>
              <p>
                <GlossaryTermTooltip term="Annealing">Annealing</GlossaryTermTooltip> produces soft, ductile microstructures:
              </p>
              <ul>
                <li><strong>Full annealing:</strong> Coarse <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip> and <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip></li>
                <li><strong>Spheroidize annealing:</strong> Spheroidized carbides in <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> matrix</li>
                <li><strong>Process annealing:</strong> Recrystallized <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> with fine carbides</li>
              </ul>
              <p>
                <strong>Verification:</strong> Verify soft <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip>, appropriate <GlossaryTermTooltip term="Grain Size">grain size</GlossaryTermTooltip>, and 
                absence of hard <GlossaryTermTooltip term="Phase">phases</GlossaryTermTooltip>.
              </p>

              <h3>Case Hardening (Carburizing)</h3>
              <p>
                Carburizing produces high-carbon case with <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>:
              </p>
              <ul>
                <li><strong>Case:</strong> High-carbon <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>, possible retained austenite</li>
                <li><strong>Core:</strong> Low-carbon martensite or <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip>/<GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip></li>
                <li><strong>Transition:</strong> Gradual transition from case to core</li>
              </ul>
              <p>
                <strong>Verification:</strong> Check case depth, case/core hardness, microstructure 
                uniformity, and absence of excessive retained austenite.
              </p>

              <h3>Nitriding</h3>
              <p>
                Nitriding produces a hard surface layer without quenching:
              </p>
              <ul>
                <li><strong>Compound layer (white layer):</strong> Very hard, brittle surface layer</li>
                <li><strong>Diffusion zone:</strong> Hardened zone beneath compound layer</li>
                <li><strong>Core:</strong> Original microstructure (typically tempered martensite)</li>
              </ul>
              <p>
                <strong>Verification:</strong> Measure compound layer thickness, diffusion zone depth, 
                and verify core microstructure is unchanged.
              </p>

              <h3>Induction and Flame Hardening</h3>
              <p>
                Surface hardening processes that create <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> at the surface:
              </p>
              <ul>
                <li><strong>Case:</strong> <GlossaryTermTooltip term="Martensite">Martensite</GlossaryTermTooltip> (may contain retained <GlossaryTermTooltip term="Austenite">austenite</GlossaryTermTooltip>)</li>
                <li><strong>Transition zone:</strong> Mixed <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> and original structure</li>
                <li><strong>Core:</strong> Original <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> unchanged</li>
              </ul>
              <p>
                <strong>Verification:</strong> Measure case depth, verify <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> in case, check for 
                proper transition, and confirm core is unaffected.
              </p>

              <h3>Bainitic Heat Treatment</h3>
              <p>
                Produces <GlossaryTermTooltip term="Bainite">bainite</GlossaryTermTooltip>, a structure between <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip> and <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>:
              </p>
              <ul>
                <li><strong>Upper bainite:</strong> Feathery or acicular structure</li>
                <li><strong>Lower bainite:</strong> Acicular structure with carbides</li>
                <li><strong>Mixed structures:</strong> May contain <GlossaryTermTooltip term="Bainite">bainite</GlossaryTermTooltip>, <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>, and retained austenite</li>
              </ul>
              <p>
                <strong>Verification:</strong> Identify <GlossaryTermTooltip term="Bainite">bainite</GlossaryTermTooltip> structure, verify absence of unwanted 
                phases, and check uniformity.
              </p>

              <h3>Austempering</h3>
              <p>
                Produces <GlossaryTermTooltip term="Bainite">bainite</GlossaryTermTooltip> through isothermal transformation:
              </p>
              <ul>
                <li><strong>Microstructure:</strong> <GlossaryTermTooltip term="Bainite">Bainite</GlossaryTermTooltip> (upper or lower depending on temperature)</li>
                <li><strong>Uniformity:</strong> Should be uniform throughout</li>
                <li><strong>Absence of martensite:</strong> No <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> should be present</li>
              </ul>
              <p>
                <strong>Verification:</strong> Verify <GlossaryTermTooltip term="Bainite">bainite</GlossaryTermTooltip> structure, check for uniformity, and 
                confirm absence of <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip> or <GlossaryTermTooltip term="Pearlite">pearlite</GlossaryTermTooltip>.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Key Principle:</strong> Always compare observed microstructure with expected 
                  microstructure for the specific heat treatment. Reference samples and microstructural 
                  atlases are valuable for identification.
                </p>
              </div>
            </section>

            <section id="sample-preparation" className="scroll-mt-24">
              <h2>Sample Preparation for Heat Treatment Verification</h2>
              <p>
                Proper sample preparation is critical for accurate heat treatment verification. Preparation 
                must preserve the true microstructure and avoid artifacts that could be mistaken for heat 
                treatment effects.
              </p>

              <h3>Sectioning</h3>
              <p>
                Sectioning considerations for heat treatment verification:
              </p>
              <ul>
                <li><strong>Orientation:</strong> Cut perpendicular to surfaces of interest (e.g., 
                perpendicular to case-hardened surface)</li>
                <li><strong>Location:</strong> Section through areas of interest (case/core transition, 
                surface for decarburization, etc.)</li>
                <li><strong>Minimize damage:</strong> Use appropriate cutting speeds and coolant to 
                prevent overheating or <GlossaryTermTooltip term="Work Hardening">work hardening</GlossaryTermTooltip></li>
                <li><strong>Preserve features:</strong> Avoid cutting through critical areas if multiple 
                sections are needed</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://metallographic.com/metallographic-equipment/abrasive-sectioning/manual-abrasive-cutters.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/equipment/abrasive sectioning/manual abrasive cutters/mega-t300s/mega-t300s-cover.webp"
                    alt="Abrasive cutters for sectioning heat-treated samples"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Abrasive cutters for sectioning heat-treated samples. Proper sectioning orientation and 
                  cutting parameters are critical to preserve microstructural features and avoid damage.
                </p>
              </div>

              <h3>Mounting</h3>
              <p>
                Mounting considerations:
              </p>
              <ul>
                <li><strong>Hard mounting materials:</strong> Use phenolic or other hard resins for 
                excellent edge retention (critical for case depth and decarburization measurements)</li>
                <li><strong>Edge retention:</strong> Essential for accurate surface measurements</li>
                <li><strong>Sample orientation:</strong> Mount so surface of interest is perpendicular 
                to mount base</li>
                <li><strong>Multiple samples:</strong> Consider mounting multiple samples together for 
                comparison</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/mounting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/mounting-cover.webp"
                    alt="Mounting materials and equipment for heat treatment verification"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Mounting materials and equipment. Hard phenolic resins provide excellent edge retention 
                  essential for case depth measurements and decarburization detection.
                </p>
              </div>
              <ProductLink 
                productName="Phenolic Mounting Resins"
                href="https://shop.metallographic.com/collections/mounting-resins"
                description="Hard phenolic resins provide excellent edge retention essential for heat treatment verification"
              />

              <h3>Grinding</h3>
              <p>
                Standard <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip> procedures apply:
              </p>
              <ul>
                <li><strong>Progressive sequence:</strong> 120, 240, 400, 600 grit</li>
                <li><strong>Rotate 90°:</strong> Between each grit to ensure complete scratch removal</li>
                <li><strong>Edge preservation:</strong> Use lighter pressure near edges to maintain 
                edge retention</li>
                <li><strong>Adequate time:</strong> Spend sufficient time at each step to remove all 
                previous scratches</li>
              </ul>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Progressive grinding papers for removing sectioning damage while preserving microstructural features"
              />

              <h3>Polishing</h3>
              <p>
                <GlossaryTermTooltip term="Polishing">Polishing</GlossaryTermTooltip> requirements:
              </p>
              <ul>
                <li><strong>Standard sequence:</strong> 9 μm, 3 μm, 1 μm diamond, then 0.05 μm colloidal silica</li>
                <li><strong>Flatness:</strong> Critical for accurate measurements and microhardness testing</li>
                <li><strong>Edge retention:</strong> Use lighter pressure and shorter times near edges</li>
                <li><strong>Scratch-free:</strong> Essential for microhardness testing and accurate 
                microstructural examination</li>
                <li><strong>Avoid over-polishing:</strong> Can create relief and affect flatness</li>
              </ul>
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
                      alt="Diamond polishing compounds for heat treatment verification"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">
                    Diamond polishing compounds create scratch-free surfaces required for accurate 
                    microhardness testing and microstructural examination.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/polishing-suspensions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/final-polishing-coloidal-silica.webp"
                      alt="Colloidal silica for final polishing"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">
                    Colloidal silica provides final polishing for mirror-like surfaces essential for 
                    microhardness testing, especially Knoop testing for case depth measurements.
                  </p>
                </div>
              </div>
              <ProductLink 
                productName="Diamond Polishing Compounds"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond polishing compounds for scratch-free surfaces required for heat treatment verification"
              />
              <ProductLink 
                productName="Colloidal Silica"
                href="https://shop.metallographic.com/collections/polishing-suspensions"
                description="Final polishing suspension for achieving mirror-like surfaces essential for microhardness testing"
              />

              <h3>Special Considerations</h3>
              <ul>
                <li><strong>Retained austenite:</strong> May require special preparation to preserve 
                and reveal</li>
                <li><strong>Brittle phases:</strong> Some heat-treated materials are brittle and require 
                careful handling</li>
                <li><strong>Multiple phases:</strong> Materials with multiple phases may show relief 
                during polishing</li>
                <li><strong>Surface features:</strong> Preserve surface features when examining 
                decarburization or case depth</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Tip:</strong> For case depth measurements, prepare the sample as you would for 
                  microhardness testing. Excellent edge retention and flatness are essential.
                </p>
              </div>
            </section>

            <section id="etching-considerations" className="scroll-mt-24">
              <h2>Etching Considerations</h2>
              <p>
                Proper etching is essential for revealing microstructures and heat treatment effects. 
                Different heat treatments and materials require different etchants and techniques.
              </p>

              <h3>Common Etchants for Heat-Treated Steels</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Etchant</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Composition</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Applications</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Reveals</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Nital</td>
                      <td className="border border-gray-300 px-4 py-3">2-4% HNO₃ in ethanol</td>
                      <td className="border border-gray-300 px-4 py-3">Carbon steels, low-alloy steels</td>
                      <td className="border border-gray-300 px-4 py-3">Ferrite, pearlite, martensite boundaries</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Picral</td>
                      <td className="border border-gray-300 px-4 py-3">4% picric acid in ethanol</td>
                      <td className="border border-gray-300 px-4 py-3">Carbon steels, pearlite</td>
                      <td className="border border-gray-300 px-4 py-3">Pearlite, carbides</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Vilella's</td>
                      <td className="border border-gray-300 px-4 py-3">1g picric acid, 5ml HCl, 100ml ethanol</td>
                      <td className="border border-gray-300 px-4 py-3">Martensite, bainite</td>
                      <td className="border border-gray-300 px-4 py-3">Martensite laths, bainite</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Sodium Metabisulfite</td>
                      <td className="border border-gray-300 px-4 py-3">10% Na₂S₂O₅ in water</td>
                      <td className="border border-gray-300 px-4 py-3">Retained austenite</td>
                      <td className="border border-gray-300 px-4 py-3">Retained austenite (white)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Klemm's I</td>
                      <td className="border border-gray-300 px-4 py-3">50ml sat. Na₂S₂O₅, 1g K₂S₂O₅</td>
                      <td className="border border-gray-300 px-4 py-3">Retained austenite</td>
                      <td className="border border-gray-300 px-4 py-3">Retained austenite (colored)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Etching Techniques</h3>
              <ul>
                <li><strong>Light etching:</strong> Use shorter times or lighter concentrations for 
                delicate structures or surface features</li>
                <li><strong>Progressive etching:</strong> Etch lightly, examine, then re-etch if needed</li>
                <li><strong>Multiple etchants:</strong> May need to try different etchants to optimize 
                contrast for specific features</li>
                <li><strong>Etching time:</strong> Vary etching time to achieve optimal contrast</li>
                <li><strong>Temperature:</strong> Some etchants work better at specific temperatures</li>
              </ul>

              <h3>Special Considerations</h3>
              <ul>
                <li><strong>Retained austenite:</strong> Requires special etchants (sodium metabisulfite, 
                Klemm's) to reveal and distinguish from martensite</li>
                <li><strong>Case/core transition:</strong> May need to optimize etching to clearly show 
                the transition</li>
                <li><strong>Decarburization:</strong> Light etching often works best to reveal the 
                decarburized layer</li>
                <li><strong>Nitrided surfaces:</strong> Compound layer may not etch or may require 
                special techniques</li>
              </ul>

              <p>
                For more information on <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> techniques, see our{' '}
                <Link href="/guides/etching-procedures" className="text-primary-600 hover:underline">
                  Etching Procedures
                </Link>{' '}
                guide.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/etchants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/etching.webp"
                    alt="Etching reagents for revealing heat treatment microstructures"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  High-quality etching reagents including Nital, Picral, Vilella's, and specialized etchants 
                  for revealing <GlossaryTermTooltip term="Martensite">martensite</GlossaryTermTooltip>, <GlossaryTermTooltip term="Bainite">bainite</GlossaryTermTooltip>, and other heat treatment microstructures.
                </p>
              </div>
              <ProductLink 
                productName="Etching Reagents"
                href="https://shop.metallographic.com/collections/etchants"
                description="High-quality etching reagents including Nital, Picral, and specialized etchants for heat-treated steels"
              />
            </section>

            <section id="common-heat-treatments" className="scroll-mt-24">
              <h2>Common Heat Treatment Processes and Verification</h2>
              <p>
                This section provides specific guidance for verifying common heat treatment processes.
              </p>

              <h3>Quench and Temper Verification</h3>
              <p>
                <strong>Expected microstructure:</strong> Tempered martensite (acicular structure)
              </p>
              <p>
                <strong>Verification steps:</strong>
              </p>
              <ol>
                <li>Examine microstructure for tempered martensite</li>
                <li>Check for uniformity throughout</li>
                <li>Verify absence of untempered martensite (if high temper)</li>
                <li>Measure hardness and compare to specifications</li>
                <li>Check for excessive retained austenite (if applicable)</li>
              </ol>

              <h3>Carburizing Verification</h3>
              <p>
                <strong>Expected microstructure:</strong> High-carbon martensite in case, low-carbon 
                structure in core
              </p>
              <p>
                <strong>Verification steps:</strong>
              </p>
              <ol>
                <li>Measure case depth (microhardness traverse and microstructural)</li>
                <li>Verify case microstructure (high-carbon martensite)</li>
                <li>Check core microstructure (should be appropriate for core composition)</li>
                <li>Measure case and core hardness</li>
                <li>Check for excessive retained austenite in case</li>
                <li>Verify case/core transition is appropriate</li>
                <li>Check for decarburization (should be minimal or absent)</li>
              </ol>

              <h3>Nitriding Verification</h3>
              <p>
                <strong>Expected microstructure:</strong> Compound layer (white layer) at surface, 
                diffusion zone beneath
              </p>
              <p>
                <strong>Verification steps:</strong>
              </p>
              <ol>
                <li>Measure compound layer thickness (typically 5-25 μm)</li>
                <li>Measure diffusion zone depth</li>
                <li>Verify core microstructure is unchanged</li>
                <li>Check for excessive compound layer (can be brittle)</li>
                <li>Measure surface hardness</li>
                <li>Verify uniformity of nitrided layer</li>
              </ol>

              <h3>Induction Hardening Verification</h3>
              <p>
                <strong>Expected microstructure:</strong> Martensite in case, original structure in core
              </p>
              <p>
                <strong>Verification steps:</strong>
              </p>
              <ol>
                <li>Measure case depth</li>
                <li>Verify martensite in case</li>
                <li>Check core microstructure (should be original structure)</li>
                <li>Measure case and core hardness</li>
                <li>Verify transition zone is appropriate</li>
                <li>Check for proper case coverage</li>
              </ol>

              <h3>Annealing Verification</h3>
              <p>
                <strong>Expected microstructure:</strong> Soft structure (pearlite/ferrite or spheroidized)
              </p>
              <p>
                <strong>Verification steps:</strong>
              </p>
              <ol>
                <li>Verify soft microstructure (pearlite/ferrite or spheroidized)</li>
                <li>Check grain size (should be appropriate for annealing type)</li>
                <li>Measure hardness (should be low)</li>
                <li>Verify absence of hard phases (martensite, bainite)</li>
                <li>Check for uniformity</li>
              </ol>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <p>
                Common problems encountered during heat treatment verification and their solutions:
              </p>

              <h3>Common Issues and Solutions</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Problem</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Causes</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Solutions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Poor edge retention for case depth measurement</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Soft mounting material</li>
                          <li>Excessive polishing pressure</li>
                          <li>Over-polishing</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Use hard mounting material (phenolic)</li>
                          <li>Reduce polishing pressure, especially near edges</li>
                          <li>Reduce polishing time</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Cannot distinguish case/core boundary</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Inadequate etching</li>
                          <li>Wrong etchant</li>
                          <li>Over-etching</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Try different etchants</li>
                          <li>Optimize etching time</li>
                          <li>Use progressive etching</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Inconsistent case depth measurements</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Variations in heat treatment</li>
                          <li>Measurement location</li>
                          <li>Measurement technique</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Take multiple measurements</li>
                          <li>Measure at consistent locations</li>
                          <li>Use standardized measurement technique</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Decarburization difficult to see</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Light decarburization</li>
                          <li>Inadequate etching</li>
                          <li>Wrong etchant</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Use picral to better reveal pearlite</li>
                          <li>Try lighter etching</li>
                          <li>Use microhardness traverse method</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Cannot identify microstructure</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Insufficient knowledge</li>
                          <li>Complex microstructure</li>
                          <li>Inadequate etching</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Consult microstructural atlases</li>
                          <li>Compare with reference samples</li>
                          <li>Try different etchants</li>
                          <li>Seek expert consultation</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Surface damage affecting measurements</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Sectioning damage</li>
                          <li>Grinding damage</li>
                          <li>Preparation artifacts</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Remove adequate material during grinding</li>
                          <li>Use proper cutting parameters</li>
                          <li>Remove damaged layer completely</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Quality Verification Checklist</h3>
              <p>
                Before reporting heat treatment verification results, verify:
              </p>
              <ul>
                <li><strong>Sample preparation quality:</strong> Scratch-free, flat surface, good edge retention</li>
                <li><strong>Etching quality:</strong> Proper contrast, not over-etched or under-etched</li>
                <li><strong>Measurement accuracy:</strong> Calibrated equipment, proper technique</li>
                <li><strong>Multiple measurements:</strong> Take measurements at multiple locations</li>
                <li><strong>Documentation:</strong> Clear micrographs with scale bars, detailed notes</li>
                <li><strong>Comparison:</strong> Compare with specifications and reference samples</li>
              </ul>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Ready to Verify Heat Treatments?</h2>
              <p className="mb-4">
                Now that you understand heat treatment verification techniques, explore our material-specific 
                guides or browse our equipment and consumables for your verification needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides/hardness-testing-preparation"
                  className="btn-primary text-center"
                >
                  Hardness Testing Guide
                </Link>
                <Link 
                  href="/guides/microstructural-analysis"
                  className="btn-secondary text-center"
                >
                  Microstructural Analysis
                </Link>
                <Link 
                  href="/resources"
                  className="btn-secondary text-center"
                >
                  View Resources
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/hardness-testing-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Hardness Testing Preparation
                </Link>
                <Link href="/guides/microstructural-analysis" className="text-primary-600 hover:underline font-semibold">
                  → Microstructural Analysis
                </Link>
                <Link href="/guides/etching-procedures" className="text-primary-600 hover:underline font-semibold">
                  → Etching Procedures
                </Link>
                <Link href="/guides/carbon-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Carbon Steel Preparation
                </Link>
                <Link href="/guides/quality-control-inspection" className="text-primary-600 hover:underline font-semibold">
                  → Quality Control and Inspection
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
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

