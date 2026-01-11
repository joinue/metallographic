import { Metadata } from 'next'
import Image from 'next/image'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('quality-control-inspection')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'quality-control-principles', label: 'Quality Control Principles' },
  { id: 'inspection-procedures', label: 'Inspection Procedures' },
  { id: 'standards-compliance', label: 'Standards and Compliance' },
  { id: 'documentation', label: 'Documentation and Reporting' },
  { id: 'common-issues', label: 'Common Quality Issues' },
  { id: 'quality-checkpoints', label: 'Quality Control Checkpoints' },
  { id: 'statistical-control', label: 'Statistical Process Control' },
  { id: 'certification', label: 'Certification and Accreditation' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function QualityControlInspectionGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Quality Control and Inspection
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Process Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Quality Control and Inspection in Metallography</h1>
            <p className="text-xl text-gray-600">
              Learn about quality control procedures, inspection protocols, standards compliance, and best practices 
              for ensuring reliable and reproducible metallographic analysis results.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#quality-control-principles" className="text-primary-600 hover:underline">Quality Control Principles</a></li>
              <li><a href="#inspection-procedures" className="text-primary-600 hover:underline">Inspection Procedures</a></li>
              <li><a href="#standards-compliance" className="text-primary-600 hover:underline">Standards and Compliance</a></li>
              <li><a href="#documentation" className="text-primary-600 hover:underline">Documentation and Reporting</a></li>
              <li><a href="#common-issues" className="text-primary-600 hover:underline">Common Quality Issues</a></li>
              <li><a href="#quality-checkpoints" className="text-primary-600 hover:underline">Quality Control Checkpoints</a></li>
              <li><a href="#statistical-control" className="text-primary-600 hover:underline">Statistical Process Control</a></li>
              <li><a href="#certification" className="text-primary-600 hover:underline">Certification and Accreditation</a></li>
              <li><a href="#best-practices" className="text-primary-600 hover:underline">Best Practices</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Quality control and inspection are fundamental to reliable metallographic analysis. Without proper 
                quality control procedures, results can be inconsistent, inaccurate, or misleading. Quality control 
                ensures that every step of the metallographic process (from sample selection through final analysis) meets 
                established standards and produces reliable, reproducible results.
              </p>
              <p>
                This guide covers the essential aspects of quality control and inspection in metallography, including 
                procedures, standards compliance, documentation, and best practices. Implementing robust quality control 
                systems protects against errors, ensures consistency, and provides confidence in your results.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Why Quality Control Matters:</strong> In metallography, quality control is not optional; it's 
                  essential. Poor quality control can lead to incorrect material assessments, failed components, safety 
                  issues, and legal problems. Good quality control ensures reliable results that can be trusted for 
                  critical decisions.
                </p>
              </div>
              <p>
                Quality control in metallography involves systematic procedures to ensure that:
              </p>
              <ul>
                <li>Samples are properly selected and representative</li>
                <li>Preparation procedures are followed consistently</li>
                <li>Equipment is properly calibrated and maintained</li>
                <li>Results are accurate and reproducible</li>
                <li>Documentation is complete and traceable</li>
                <li>Standards and specifications are met</li>
              </ul>
            </section>

            <section id="quality-control-principles" className="scroll-mt-24">
              <h2>Quality Control Principles</h2>
              <p>
                Effective quality control in metallography is based on fundamental principles that ensure consistency, 
                accuracy, and reliability. Understanding these principles helps you establish and maintain effective 
                quality control systems.
              </p>

              <h3>Consistency</h3>
              <p>
                Consistency means following standardized procedures every time. This includes:
              </p>
              <ul>
                <li><strong>Standardized procedures:</strong> Documented, step-by-step procedures that are followed 
                consistently for all samples</li>
                <li><strong>Consistent materials:</strong> Using the same consumables, etchants, and supplies for 
                comparable results</li>
                <li><strong>Consistent timing:</strong> Following established times for grinding, polishing, and etching</li>
                <li><strong>Consistent conditions:</strong> Maintaining consistent environmental conditions (temperature, 
                humidity) when possible</li>
              </ul>

              <h3>Reproducibility</h3>
              <p>
                Reproducibility means that the same sample, prepared and analyzed by different operators or at different 
                times, produces the same results. Achieving reproducibility requires:
              </p>
              <ul>
                <li><strong>Detailed documentation:</strong> Recording all parameters and conditions</li>
                <li><strong>Operator training:</strong> Ensuring all operators are properly trained</li>
                <li><strong>Calibrated equipment:</strong> Regular calibration of microscopes, hardness testers, and 
                other instruments</li>
                <li><strong>Reference standards:</strong> Using reference samples to verify procedures</li>
              </ul>

              <h3>Traceability</h3>
              <p>
                Traceability means being able to track a sample and its results back through all steps of the process. 
                This includes:
              </p>
              <ul>
                <li><strong>Sample identification:</strong> Unique identifiers for each sample</li>
                <li><strong>Chain of custody:</strong> Documentation of who handled the sample and when</li>
                <li><strong>Procedure documentation:</strong> Records of all preparation steps and parameters</li>
                <li><strong>Result documentation:</strong> Complete records of observations and measurements</li>
              </ul>

              <h3>Validation</h3>
              <p>
                Validation means verifying that procedures produce correct results. This involves:
              </p>
              <ul>
                <li><strong>Reference samples:</strong> Using samples with known microstructures to verify procedures</li>
                <li><strong>Inter-laboratory comparisons:</strong> Comparing results with other laboratories</li>
                <li><strong>Proficiency testing:</strong> Participating in round-robin tests</li>
                <li><strong>Method validation:</strong> Verifying that methods are appropriate for the materials being 
                analyzed</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Key Principle:</strong> Quality control is not a one-time activity; it's an ongoing process 
                  that must be integrated into every aspect of metallographic work. Every sample, every procedure, and 
                  every result should be subject to quality control.
                </p>
              </div>
            </section>

            <section id="inspection-procedures" className="scroll-mt-24">
              <h2>Inspection Procedures</h2>
              <p>
                Systematic inspection procedures ensure that samples are properly prepared and results are accurate. 
                Inspection should occur at multiple stages throughout the preparation and analysis process.
              </p>

              <h3>Pre-Preparation Inspection</h3>
              <p>
                Before beginning preparation, inspect the sample to ensure it's suitable:
              </p>
              <ul>
                <li><strong>Sample identification:</strong> Verify sample ID matches documentation</li>
                <li><strong>Sample condition:</strong> Check for damage, contamination, or other issues</li>
                <li><strong>Sample orientation:</strong> Verify orientation is correct for the analysis needed</li>
                <li><strong>Sample size:</strong> Ensure sample is appropriate size for mounting and preparation</li>
                <li><strong>Documentation:</strong> Verify all required information is available</li>
              </ul>

              <h3>Post-Mounting Inspection</h3>
              <p>
                After mounting, inspect the mount to ensure quality:
              </p>
              <ul>
                <li><strong>Mount integrity:</strong> Check for cracks, voids, or other defects in the mount</li>
                <li><strong>Sample position:</strong> Verify sample is properly positioned and not too close to edges</li>
                <li><strong>Edge retention:</strong> Check that edges are protected (if edge analysis is needed)</li>
                <li><strong>Mount surface:</strong> Ensure mount surface is flat and suitable for grinding</li>
              </ul>

              <h3>Post-Grinding Inspection</h3>
              <p>
                After each grinding step, inspect the surface:
              </p>
              <ul>
                <li><strong>Scratch pattern:</strong> Verify scratches are uniform and in one direction</li>
                <li><strong>Previous scratches removed:</strong> Ensure all scratches from previous step are removed</li>
                <li><strong>Surface flatness:</strong> Check that surface is flat and not rounded</li>
                <li><strong>No contamination:</strong> Verify no embedded abrasives or contamination</li>
              </ul>

              <h3>Post-Polishing Inspection</h3>
              <p>
                After polishing, inspect the surface before etching:
              </p>
              <ul>
                <li><strong>Scratch-free surface:</strong> Verify no scratches remain from grinding</li>
                <li><strong>Mirror finish:</strong> Surface should be mirror-like and reflective</li>
                <li><strong>No relief:</strong> Check for excessive relief between phases</li>
                <li><strong>Clean surface:</strong> Verify no contamination, embedded abrasives, or water spots</li>
                <li><strong>Edge quality:</strong> If edge analysis is needed, verify edges are sharp and well-defined</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Visual Inspection Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Surface is mirror-like with no visible scratches</li>
                  <li>✓ No embedded abrasives or contamination visible</li>
                  <li>✓ Surface is clean and dry</li>
                  <li>✓ No excessive relief between phases</li>
                  <li>✓ Edges are sharp (if edge analysis required)</li>
                  <li>✓ Sample is properly oriented</li>
                </ul>
              </div>

              <h3>Post-Etching Inspection</h3>
              <p>
                After etching, inspect the microstructure:
              </p>
              <ul>
                <li><strong>Etching quality:</strong> Verify microstructure is revealed without over-etching</li>
                <li><strong>Contrast:</strong> Check that phases are clearly distinguishable</li>
                <li><strong>Grain boundaries:</strong> Verify grain boundaries are visible (if applicable)</li>
                <li><strong>No artifacts:</strong> Check for etching artifacts or contamination</li>
                <li><strong>Representative area:</strong> Verify the area examined is representative</li>
              </ul>

              <h3>Microscopic Inspection</h3>
              <p>
                During microscopic examination, systematic inspection ensures thorough analysis:
              </p>
              <ul>
                <li><strong>Low magnification survey:</strong> Examine entire sample at low magnification first</li>
                <li><strong>Systematic scanning:</strong> Use a systematic pattern to ensure complete coverage</li>
                <li><strong>Multiple magnifications:</strong> Examine features at appropriate magnifications</li>
                <li><strong>Representative areas:</strong> Document representative areas, not just unusual features</li>
                <li><strong>Edge examination:</strong> If needed, examine edges systematically</li>
              </ul>
            </section>

            <section id="standards-compliance" className="scroll-mt-24">
              <h2>Standards and Compliance</h2>
              <p>
                Compliance with established standards ensures that metallographic work meets industry requirements and 
                produces results that are accepted by customers, regulators, and other stakeholders. Standards provide 
                guidelines for procedures, equipment, and reporting.
              </p>

              <h3>ASTM Standards</h3>
              <p>
                ASTM International publishes numerous standards relevant to metallography. Key standards include:
              </p>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Standard</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E3</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Guide for Preparation of Metallographic Specimens</td>
                      <td className="border border-gray-300 px-4 py-3">General preparation procedures</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E112</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Methods for Determining Average Grain Size</td>
                      <td className="border border-gray-300 px-4 py-3">Grain size measurement</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E407</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Practice for Microetching Metals and Alloys</td>
                      <td className="border border-gray-300 px-4 py-3">Etching procedures</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E883</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Guide for Reflected-Light Photomicrography</td>
                      <td className="border border-gray-300 px-4 py-3">Photomicrography procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E1245</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Practice for Determining the Inclusion or Second-Phase Constituent Content</td>
                      <td className="border border-gray-300 px-4 py-3">Inclusion rating</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E1382</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Methods for Determining Average Grain Size Using Semiautomatic and Automatic Image Analysis</td>
                      <td className="border border-gray-300 px-4 py-3">Automated grain size measurement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                For a comprehensive reference to ASTM standards, see our{' '}
                <Link href="/resources/astm-standards-reference" className="text-primary-600 hover:underline font-semibold">
                  ASTM Standards Reference
                </Link>.
              </p>

              <h3>ISO Standards</h3>
              <p>
                International Organization for Standardization (ISO) standards are important for international work:
              </p>
              <ul>
                <li><strong>ISO 643:</strong> Steels: Micrographic determination of the apparent grain size</li>
                <li><strong>ISO 4499:</strong> Hardmetals: Metallographic determination of microstructure</li>
                <li><strong>ISO 4967:</strong> Steel: Determination of content of non-metallic inclusions - Micrographic method</li>
                <li><strong>ISO 14250:</strong> Steel: Metallographic characterization of duplex grain size and distributions</li>
              </ul>

              <h3>Industry-Specific Standards</h3>
              <p>
                Many industries have specific standards for metallographic work:
              </p>
              <ul>
                <li><strong>Aerospace:</strong> AMS (Aerospace Material Specifications), NADCAP requirements</li>
                <li><strong>Automotive:</strong> SAE standards, OEM specifications</li>
                <li><strong>Nuclear:</strong> ASME codes, nuclear regulatory requirements</li>
                <li><strong>Medical devices:</strong> FDA requirements, ISO 13485</li>
                <li><strong>Oil and gas:</strong> API standards, NACE requirements</li>
              </ul>

              <h3>Compliance Requirements</h3>
              <p>
                Ensuring compliance involves:
              </p>
              <ul>
                <li><strong>Understanding requirements:</strong> Know which standards apply to your work</li>
                <li><strong>Current versions:</strong> Use current versions of standards (standards are regularly updated)</li>
                <li><strong>Documentation:</strong> Document compliance with standards in reports</li>
                <li><strong>Training:</strong> Ensure staff are trained on applicable standards</li>
                <li><strong>Audits:</strong> Regular internal audits to verify compliance</li>
                <li><strong>External audits:</strong> Prepare for customer or regulatory audits</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> Standards are living documents that are regularly updated. Ensure you're 
                  using current versions and stay informed about updates. Subscribing to standards organizations or 
                  checking for updates regularly is essential.
                </p>
              </div>
            </section>

            <section id="documentation" className="scroll-mt-24">
              <h2>Documentation and Reporting</h2>
              <p>
                Complete and accurate documentation is essential for quality control. Documentation provides a record 
                of what was done, enables traceability, supports reproducibility, and provides evidence of compliance 
                with standards and procedures.
              </p>

              <h3>Sample Documentation</h3>
              <p>
                Each sample should have complete documentation including:
              </p>
              <ul>
                <li><strong>Sample identification:</strong> Unique identifier, source, date received</li>
                <li><strong>Sample description:</strong> Material type, composition, condition, dimensions</li>
                <li><strong>Orientation:</strong> How sample was oriented (longitudinal, transverse, etc.)</li>
                <li><strong>Purpose:</strong> Reason for analysis, specific questions to answer</li>
                <li><strong>Chain of custody:</strong> Who handled the sample and when</li>
              </ul>

              <h3>Preparation Documentation</h3>
              <p>
                Document all preparation steps and parameters:
              </p>
              <ul>
                <li><strong>Sectioning:</strong> Method, blade type, cutting parameters</li>
                <li><strong>Mounting:</strong> Method, resin type, mounting parameters</li>
                <li><strong>Grinding:</strong> Grit sizes, times, pressures, wheel types</li>
                <li><strong>Polishing:</strong> Cloth types, abrasives, times, pressures</li>
                <li><strong>Etching:</strong> Etchant type, concentration, time, temperature</li>
                <li><strong>Operator:</strong> Who performed each step</li>
                <li><strong>Date and time:</strong> When each step was performed</li>
              </ul>

              <h3>Analysis Documentation</h3>
              <p>
                Document all analysis activities:
              </p>
              <ul>
                <li><strong>Microscope:</strong> Type, magnification, illumination mode</li>
                <li><strong>Observations:</strong> Detailed description of microstructure</li>
                <li><strong>Measurements:</strong> Grain size, phase fractions, inclusion ratings, etc.</li>
                <li><strong>Photomicrographs:</strong> Images with proper documentation (magnification, etchant, etc.)</li>
                <li><strong>Standards used:</strong> Which standards were followed</li>
                <li><strong>Results:</strong> Quantitative and qualitative results</li>
              </ul>

              <h3>Report Requirements</h3>
              <p>
                Reports should include:
              </p>
              <ul>
                <li><strong>Executive summary:</strong> Key findings and conclusions</li>
                <li><strong>Introduction:</strong> Purpose, background, sample information</li>
                <li><strong>Procedures:</strong> Detailed description of methods used</li>
                <li><strong>Results:</strong> Observations, measurements, photomicrographs</li>
                <li><strong>Discussion:</strong> Interpretation of results</li>
                <li><strong>Conclusions:</strong> Summary of findings</li>
                <li><strong>Appendices:</strong> Supporting data, additional photomicrographs</li>
              </ul>

              <h3>Photomicrograph Documentation</h3>
              <p>
                Every photomicrograph should include:
              </p>
              <ul>
                <li><strong>Magnification:</strong> Clearly indicated (e.g., "500x")</li>
                <li><strong>Etchant:</strong> Etchant used (if applicable)</li>
                <li><strong>Illumination:</strong> Illumination mode (brightfield, darkfield, DIC, etc.)</li>
                <li><strong>Sample identification:</strong> Which sample the image represents</li>
                <li><strong>Location:</strong> Where on the sample (if relevant)</li>
                <li><strong>Scale bar:</strong> Physical scale (preferred over magnification alone)</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Documentation Principle:</strong> If it's not documented, it didn't happen. Complete 
                  documentation is essential for quality control, traceability, and reproducibility. Good documentation 
                  also protects you and your organization if questions arise about results.
                </p>
              </div>
            </section>

            <section id="common-issues" className="scroll-mt-24">
              <h2>Common Quality Issues</h2>
              <p>
                Understanding common quality issues helps you identify and prevent problems. Many quality issues can 
                be prevented with proper procedures and inspection.
              </p>

              <h3>Preparation Issues</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Issue</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Impact</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Prevention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Remaining scratches</td>
                      <td className="border border-gray-300 px-4 py-3">Obscures microstructure, can be mistaken for features</td>
                      <td className="border border-gray-300 px-4 py-3">Complete all grinding steps, adequate polishing time</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Excessive relief</td>
                      <td className="border border-gray-300 px-4 py-3">Focus problems, incorrect phase identification</td>
                      <td className="border border-gray-300 px-4 py-3">Reduce polishing pressure and time</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Edge rounding</td>
                      <td className="border border-gray-300 px-4 py-3">Cannot analyze edges, poor edge retention</td>
                      <td className="border border-gray-300 px-4 py-3">Use harder mounting resins, reduce pressure</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Contamination</td>
                      <td className="border border-gray-300 px-4 py-3">False features, incorrect interpretation</td>
                      <td className="border border-gray-300 px-4 py-3">Thorough cleaning between steps, clean equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Over-etching</td>
                      <td className="border border-gray-300 px-4 py-3">Obscures fine details, creates artifacts</td>
                      <td className="border border-gray-300 px-4 py-3">Reduce etching time, use fresh etchant</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Under-etching</td>
                      <td className="border border-gray-300 px-4 py-3">Microstructure not revealed</td>
                      <td className="border border-gray-300 px-4 py-3">Increase etching time, use fresh etchant</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Analysis Issues</h3>
              <ul>
                <li><strong>Non-representative sampling:</strong> Examining only unusual areas, not representative areas</li>
                <li><strong>Incorrect magnification:</strong> Using inappropriate magnification for the analysis</li>
                <li><strong>Poor photomicrography:</strong> Out of focus, incorrect exposure, missing documentation</li>
                <li><strong>Incorrect interpretation:</strong> Misidentifying phases or features</li>
                <li><strong>Measurement errors:</strong> Incorrect grain size measurements, wrong standards used</li>
                <li><strong>Bias:</strong> Confirmation bias, looking for expected results</li>
              </ul>

              <h3>Documentation Issues</h3>
              <ul>
                <li><strong>Incomplete documentation:</strong> Missing parameters, dates, or other information</li>
                <li><strong>Incorrect documentation:</strong> Wrong magnification, etchant, or other parameters</li>
                <li><strong>Poor photomicrograph labeling:</strong> Missing or incorrect labels on images</li>
                <li><strong>Lost data:</strong> Inadequate backup or storage of data</li>
                <li><strong>Inconsistent format:</strong> Reports don't follow standard format</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Prevention is Key:</strong> Most quality issues can be prevented with proper procedures, 
                  training, and inspection. Establishing checkpoints and review processes helps catch issues before they 
                  affect results. See our{' '}
                  <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                    Troubleshooting Guide
                  </Link> for detailed solutions to common problems.
                </p>
              </div>
            </section>

            <section id="quality-checkpoints" className="scroll-mt-24">
              <h2>Quality Control Checkpoints</h2>
              <p>
                Establishing quality control checkpoints at critical stages ensures that issues are identified and 
                corrected before they affect final results. Checkpoints should be built into standard procedures.
              </p>

              <h3>Checkpoint 1: Sample Receipt</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Verification Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Sample ID matches documentation</li>
                  <li>✓ Sample condition is acceptable</li>
                  <li>✓ Required information is available</li>
                  <li>✓ Sample orientation is correct</li>
                  <li>✓ Sample size is appropriate</li>
                </ul>
              </div>

              <h3>Checkpoint 2: After Mounting</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Mount Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Mount is intact (no cracks or voids)</li>
                  <li>✓ Sample is properly positioned</li>
                  <li>✓ Edges are protected (if needed)</li>
                  <li>✓ Mount surface is flat</li>
                  <li>✓ Mount is properly labeled</li>
                </ul>
              </div>

              <h3>Checkpoint 3: After Each Grinding Step</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Grinding Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Scratches are uniform and in one direction</li>
                  <li>✓ Previous scratches are removed</li>
                  <li>✓ Surface is flat (no rounding)</li>
                  <li>✓ No embedded abrasives</li>
                  <li>✓ Sample is clean</li>
                </ul>
              </div>

              <h3>Checkpoint 4: After Polishing</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Polishing Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Surface is mirror-like</li>
                  <li>✓ No scratches visible</li>
                  <li>✓ No excessive relief</li>
                  <li>✓ Surface is clean and dry</li>
                  <li>✓ Edges are sharp (if needed)</li>
                </ul>
              </div>

              <h3>Checkpoint 5: After Etching</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Etching Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Microstructure is revealed</li>
                  <li>✓ Phases are distinguishable</li>
                  <li>✓ Grain boundaries are visible (if applicable)</li>
                  <li>✓ No over-etching artifacts</li>
                  <li>✓ Etching is uniform</li>
                </ul>
              </div>

              <h3>Checkpoint 6: Before Final Analysis</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Pre-Analysis Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Sample preparation is complete and acceptable</li>
                  <li>✓ Microscope is calibrated</li>
                  <li>✓ Appropriate standards are available</li>
                  <li>✓ Documentation is up to date</li>
                  <li>✓ All required information is available</li>
                </ul>
              </div>

              <h3>Checkpoint 7: Before Reporting</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Report Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ All required sections are included</li>
                  <li>✓ Procedures are documented</li>
                  <li>✓ Results are accurate and complete</li>
                  <li>✓ Photomicrographs are properly labeled</li>
                  <li>✓ Standards compliance is documented</li>
                  <li>✓ Report has been reviewed</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Checkpoint Benefits:</strong> Quality control checkpoints prevent problems from propagating 
                  through the process. Catching issues early saves time and ensures quality. Don't skip checkpoints; they 
                  are essential for quality control.
                </p>
              </div>
            </section>

            <section id="statistical-control" className="scroll-mt-24">
              <h2>Statistical Process Control</h2>
              <p>
                Statistical process control (SPC) uses statistical methods to monitor and control processes. In 
                metallography, SPC can help identify trends, detect problems, and ensure consistency.
              </p>

              <h3>Control Charts</h3>
              <p>
                Control charts track measurements over time to identify trends and out-of-control conditions:
              </p>
              <ul>
                <li><strong>Grain size measurements:</strong> Track grain size measurements to ensure consistency</li>
                <li><strong>Hardness measurements:</strong> Monitor hardness test results</li>
                <li><strong>Phase fractions:</strong> Track phase fraction measurements</li>
                <li><strong>Preparation times:</strong> Monitor preparation times to identify efficiency issues</li>
              </ul>

              <h3>Measurement System Analysis</h3>
              <p>
                Measurement system analysis (MSA) evaluates the quality of measurement systems:
              </p>
              <ul>
                <li><strong>Repeatability:</strong> Variation when same operator measures same sample multiple times</li>
                <li><strong>Reproducibility:</strong> Variation when different operators measure same sample</li>
                <li><strong>Accuracy:</strong> How close measurements are to true values</li>
                <li><strong>Linearity:</strong> Consistency across measurement range</li>
                <li><strong>Stability:</strong> Consistency over time</li>
              </ul>

              <h3>Proficiency Testing</h3>
              <p>
                Participating in proficiency testing programs helps verify laboratory performance:
              </p>
              <ul>
                <li><strong>Round-robin tests:</strong> Multiple laboratories analyze same samples</li>
                <li><strong>Inter-laboratory comparisons:</strong> Compare results with other laboratories</li>
                <li><strong>Reference materials:</strong> Analyze certified reference materials</li>
                <li><strong>Internal comparisons:</strong> Compare results between operators</li>
              </ul>

              <h3>Data Analysis</h3>
              <p>
                Statistical analysis of data helps identify issues and trends:
              </p>
              <ul>
                <li><strong>Trend analysis:</strong> Identify trends in measurements over time</li>
                <li><strong>Outlier detection:</strong> Identify unusual results that may indicate problems</li>
                <li><strong>Correlation analysis:</strong> Identify relationships between variables</li>
                <li><strong>Capability analysis:</strong> Evaluate whether process meets requirements</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Statistical Thinking:</strong> Statistical process control helps you understand variation in 
                  your processes. Some variation is normal, but excessive variation or trends indicate problems that 
                  need attention. Regular monitoring helps maintain quality.
                </p>
              </div>
            </section>

            <section id="certification" className="scroll-mt-24">
              <h2>Certification and Accreditation</h2>
              <p>
                Certification and accreditation provide external validation of laboratory quality. They demonstrate 
                that a laboratory meets established standards and can produce reliable results.
              </p>

              <h3>Laboratory Accreditation</h3>
              <p>
                Accreditation demonstrates that a laboratory meets international standards for quality:
              </p>
              <ul>
                <li><strong>ISO/IEC 17025:</strong> General requirements for the competence of testing and calibration 
                laboratories</li>
                <li><strong>Scope:</strong> Accredited laboratories have defined scopes of accreditation</li>
                <li><strong>Audits:</strong> Regular audits verify continued compliance</li>
                <li><strong>Proficiency testing:</strong> Participation in proficiency testing is required</li>
                <li><strong>Documentation:</strong> Comprehensive quality system documentation is required</li>
              </ul>

              <h3>NADCAP Accreditation</h3>
              <p>
                NADCAP (National Aerospace and Defense Contractors Accreditation Program) is specific to aerospace and 
                defense industries:
              </p>
              <ul>
                <li><strong>Specialized requirements:</strong> Industry-specific requirements for metallography</li>
                <li><strong>Audits:</strong> Regular audits by qualified auditors</li>
                <li><strong>Continuous improvement:</strong> Focus on continuous improvement</li>
                <li><strong>Customer recognition:</strong> Recognized by major aerospace and defense customers</li>
              </ul>

              <h3>Operator Certification</h3>
              <p>
                Operator certification programs verify individual competence:
              </p>
              <ul>
                <li><strong>Training requirements:</strong> Completion of required training</li>
                <li><strong>Examinations:</strong> Written and practical examinations</li>
                <li><strong>Continuing education:</strong> Requirements for maintaining certification</li>
                <li><strong>Professional organizations:</strong> Various organizations offer certification programs</li>
              </ul>

              <h3>Benefits of Certification and Accreditation</h3>
              <ul>
                <li><strong>Customer confidence:</strong> Demonstrates capability and reliability</li>
                <li><strong>Market access:</strong> Required for many customers and industries</li>
                <li><strong>Quality improvement:</strong> Process of achieving and maintaining accreditation improves quality</li>
                <li><strong>Competitive advantage:</strong> Differentiates from non-accredited laboratories</li>
                <li><strong>Risk reduction:</strong> Reduces risk of errors and problems</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Investment in Quality:</strong> Certification and accreditation require investment of time and 
                  resources, but they provide significant benefits. They demonstrate commitment to quality and provide 
                  external validation of capabilities.
                </p>
              </div>
            </section>

            <section id="best-practices" className="scroll-mt-24">
              <h2>Best Practices for Quality Control</h2>
              <p>
                Following best practices ensures effective quality control. These practices should be integrated into 
                daily operations and become standard procedures.
              </p>

              <h3>Establish Standard Procedures</h3>
              <ul>
                <li><strong>Document procedures:</strong> Write down all procedures in detail</li>
                <li><strong>Standardize methods:</strong> Use consistent methods for all similar work</li>
                <li><strong>Review regularly:</strong> Review and update procedures regularly</li>
                <li><strong>Train operators:</strong> Ensure all operators are trained on procedures</li>
                <li><strong>Follow procedures:</strong> Don't take shortcuts or deviate without justification</li>
              </ul>

              <h3>Maintain Equipment</h3>
              <ul>
                <li><strong>Regular calibration:</strong> Calibrate equipment according to schedule</li>
                <li><strong>Preventive maintenance:</strong> Perform regular maintenance to prevent problems</li>
                <li><strong>Equipment records:</strong> Maintain records of calibration and maintenance</li>
                <li><strong>Proper use:</strong> Use equipment as designed and intended</li>
                <li><strong>Report problems:</strong> Report equipment problems immediately</li>
              </ul>

              <h3>Use Reference Materials</h3>
              <ul>
                <li><strong>Certified reference materials:</strong> Use certified reference materials when available</li>
                <li><strong>Internal standards:</strong> Maintain internal reference samples</li>
                <li><strong>Regular verification:</strong> Use reference materials to verify procedures</li>
                <li><strong>Document results:</strong> Document reference material results</li>
              </ul>

              <h3>Implement Review Processes</h3>
              <ul>
                <li><strong>Peer review:</strong> Have results reviewed by another qualified person</li>
                <li><strong>Technical review:</strong> Review technical aspects of work</li>
                <li><strong>Administrative review:</strong> Review documentation and compliance</li>
                <li><strong>Management review:</strong> Regular management review of quality system</li>
              </ul>

              <h3>Continuous Improvement</h3>
              <ul>
                <li><strong>Monitor performance:</strong> Track quality metrics and performance</li>
                <li><strong>Identify problems:</strong> Actively identify and address problems</li>
                <li><strong>Root cause analysis:</strong> Investigate root causes of problems</li>
                <li><strong>Corrective actions:</strong> Implement corrective actions to prevent recurrence</li>
                <li><strong>Preventive actions:</strong> Identify and prevent potential problems</li>
                <li><strong>Learn from mistakes:</strong> Use problems as learning opportunities</li>
              </ul>

              <h3>Training and Competence</h3>
              <ul>
                <li><strong>Initial training:</strong> Comprehensive training for new operators</li>
                <li><strong>Ongoing training:</strong> Regular training to maintain and improve skills</li>
                <li><strong>Competence assessment:</strong> Regular assessment of operator competence</li>
                <li><strong>Documentation:</strong> Document training and competence</li>
                <li><strong>Knowledge sharing:</strong> Share knowledge and best practices</li>
              </ul>

              <h3>Communication</h3>
              <ul>
                <li><strong>Clear procedures:</strong> Procedures should be clear and understandable</li>
                <li><strong>Regular meetings:</strong> Regular quality meetings to discuss issues</li>
                <li><strong>Open communication:</strong> Encourage reporting of problems and concerns</li>
                <li><strong>Feedback:</strong> Provide feedback on quality performance</li>
                <li><strong>Documentation:</strong> Document communications and decisions</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h3 className="text-lg font-semibold mb-3">Quality Culture</h3>
                <p className="text-sm text-gray-700">
                  Quality control is not just about procedures and checklists; it's about creating a culture where 
                  quality is valued and everyone takes responsibility for quality. When quality becomes part of the 
                  organizational culture, it becomes natural and sustainable. Everyone should understand that quality 
                  is everyone's responsibility, not just the quality department's.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Continue Your Quality Control Education</h2>
              <p className="mb-4">
                Quality control is an ongoing process. Continue to learn and improve your quality control practices 
                to ensure reliable and reproducible results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/resources/checklist"
                  className="btn-primary text-center"
                >
                  View Preparation Checklist
                </Link>
                <Link 
                  href="/resources/astm-standards-reference"
                  className="btn-secondary text-center"
                >
                  ASTM Standards Reference
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
                <Link href="/guides/microstructural-analysis" className="text-primary-600 hover:underline font-semibold">
                  → Microstructural Analysis
                </Link>
                <Link href="/guides/introduction-to-metallography" className="text-primary-600 hover:underline font-semibold">
                  → Introduction to Metallography
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  → Troubleshooting Guide
                </Link>
                <Link href="/resources/checklist" className="text-primary-600 hover:underline font-semibold">
                  → Preparation Checklist
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

