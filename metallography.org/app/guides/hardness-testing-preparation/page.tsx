import { Metadata } from 'next'
import Image from 'next/image'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import ProductLink from '@/components/ProductLink'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('hardness-testing-preparation')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'hardness-test-types', label: 'Hardness Test Types' },
  { id: 'sectioning', label: 'Sectioning' },
  { id: 'mounting', label: 'Mounting' },
  { id: 'grinding', label: 'Grinding' },
  { id: 'polishing', label: 'Polishing' },
  { id: 'surface-requirements', label: 'Surface Requirements' },
  { id: 'edge-retention', label: 'Edge Retention' },
  { id: 'case-depth-testing', label: 'Case Depth Testing' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function HardnessTestingPreparationGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Hardness Testing Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Application-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Hardness Testing Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing samples for hardness testing, covering the specific requirements 
              for Rockwell, Vickers, Knoop, and Brinell hardness testing methods.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#hardness-test-types" className="text-primary-600 hover:underline">Hardness Test Types</a></li>
              <li><a href="#sectioning" className="text-primary-600 hover:underline">Sectioning</a></li>
              <li><a href="#mounting" className="text-primary-600 hover:underline">Mounting</a></li>
              <li><a href="#grinding" className="text-primary-600 hover:underline">Grinding</a></li>
              <li><a href="#polishing" className="text-primary-600 hover:underline">Polishing</a></li>
              <li><a href="#surface-requirements" className="text-primary-600 hover:underline">Surface Requirements</a></li>
              <li><a href="#edge-retention" className="text-primary-600 hover:underline">Edge Retention</a></li>
              <li><a href="#case-depth-testing" className="text-primary-600 hover:underline">Case Depth Testing</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Preparing samples for hardness testing requires specific considerations that differ from standard 
                metallographic preparation. While the basic steps (sectioning, mounting, grinding, polishing) remain 
                similar, hardness testing has unique requirements for surface finish, edge retention, and sample geometry 
                that must be carefully addressed.
              </p>
              <p>
                The quality of hardness test results depends directly on sample preparation quality. Poor preparation 
                can lead to inaccurate readings, inconsistent results, and invalid test data. This guide covers the 
                specific requirements for preparing samples for various hardness testing methods.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Key Principle:</strong> Hardness testing requires a flat, smooth, scratch-free surface that 
                  accurately represents the material being tested. The preparation must not alter the material's 
                  hardness through work hardening, heating, or other effects.
                </p>
              </div>
            </section>

            <section id="hardness-test-types" className="scroll-mt-24">
              <h2>Hardness Test Types and Requirements</h2>
              <p>
                Different hardness testing methods have varying requirements for sample preparation. Understanding 
                these requirements helps you prepare samples appropriately for each test type.
              </p>

              <h3>Rockwell Hardness Testing</h3>
              <p>
                Rockwell testing uses relatively large indenters and loads, making it less sensitive to surface finish 
                than microhardness tests. However, proper preparation is still essential.
              </p>
              <ul>
                <li><strong>Surface finish:</strong> Typically 0.8 μm Ra or better (600 grit finish is usually sufficient)</li>
                <li><strong>Sample thickness:</strong> Must be at least 10 times the indentation depth</li>
                <li><strong>Flatness:</strong> Surface must be flat to prevent anvil effects</li>
                <li><strong>Edge distance:</strong> Indentation must be at least 2.5 times the indentation diameter from any edge</li>
                <li><strong>Parallelism:</strong> Top and bottom surfaces should be parallel</li>
              </ul>

              <h3>Vickers Microhardness Testing</h3>
              <p>
                Vickers testing uses a diamond pyramid indenter and is more sensitive to surface finish. Higher quality 
                preparation is required.
              </p>
              <ul>
                <li><strong>Surface finish:</strong> 0.1-0.2 μm Ra or better (polished to 1 μm diamond minimum)</li>
                <li><strong>Sample thickness:</strong> At least 1.5 times the indentation diagonal</li>
                <li><strong>Flatness:</strong> Critical for accurate measurements</li>
                <li><strong>Edge distance:</strong> At least 2.5 times the indentation diagonal from edges</li>
                <li><strong>Scratch-free:</strong> Scratches can interfere with indentation measurement</li>
              </ul>

              <h3>Knoop Microhardness Testing</h3>
              <p>
                Knoop testing uses an elongated diamond indenter, making it ideal for thin samples and case depth 
                measurements. Requires excellent surface finish.
              </p>
              <ul>
                <li><strong>Surface finish:</strong> 0.1 μm Ra or better (polished to 0.05 μm colloidal silica)</li>
                <li><strong>Sample thickness:</strong> Can test thinner samples than Vickers</li>
                <li><strong>Flatness:</strong> Extremely critical due to elongated indenter shape</li>
                <li><strong>Edge retention:</strong> Essential for case depth measurements</li>
                <li><strong>Scratch-free:</strong> Even minor scratches can affect measurements</li>
              </ul>

              <h3>Brinell Hardness Testing</h3>
              <p>
                Brinell testing uses a large ball indenter and heavy loads, making it less sensitive to surface finish 
                but requiring adequate sample thickness.
              </p>
              <ul>
                <li><strong>Surface finish:</strong> 1.6 μm Ra or better (400-600 grit finish usually sufficient)</li>
                <li><strong>Sample thickness:</strong> Must be at least 10 times the indentation depth</li>
                <li><strong>Flatness:</strong> Important to prevent anvil effects</li>
                <li><strong>Edge distance:</strong> At least 2.5 times the indentation diameter from edges</li>
              </ul>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Test Method</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Surface Finish (Ra)</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Minimum Polishing</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Rockwell</td>
                      <td className="border border-gray-300 px-4 py-3">≤ 0.8 μm</td>
                      <td className="border border-gray-300 px-4 py-3">600 grit</td>
                      <td className="border border-gray-300 px-4 py-3">Flat surface, adequate thickness</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Vickers</td>
                      <td className="border border-gray-300 px-4 py-3">≤ 0.1-0.2 μm</td>
                      <td className="border border-gray-300 px-4 py-3">1 μm diamond</td>
                      <td className="border border-gray-300 px-4 py-3">Scratch-free, flat surface</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Knoop</td>
                      <td className="border border-gray-300 px-4 py-3">≤ 0.1 μm</td>
                      <td className="border border-gray-300 px-4 py-3">0.05 μm silica</td>
                      <td className="border border-gray-300 px-4 py-3">Excellent flatness, edge retention</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Brinell</td>
                      <td className="border border-gray-300 px-4 py-3">≤ 1.6 μm</td>
                      <td className="border border-gray-300 px-4 py-3">400-600 grit</td>
                      <td className="border border-gray-300 px-4 py-3">Adequate thickness, flat surface</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning for Hardness Testing</h2>
              <p>
                Sectioning samples for hardness testing requires careful attention to prevent work hardening, 
                overheating, or other damage that could affect hardness measurements.
              </p>

              <h3>Key Considerations</h3>
              <ul>
                <li><strong>Minimize damage:</strong> Use appropriate cutting speeds and adequate coolant to prevent 
                work hardening or phase transformation</li>
                <li><strong>Cut location:</strong> Section through the area of interest (e.g., through case-hardened 
                layer, weld zone, or specific microstructure)</li>
                <li><strong>Sample size:</strong> Ensure adequate size for mounting and testing (typically 25-32 mm 
                diameter mounts work well)</li>
                <li><strong>Orientation:</strong> Consider the direction of hardness testing relative to material 
                structure (e.g., perpendicular to case-hardened surface)</li>
              </ul>

              <h3>Cutting Parameters</h3>
              <p>
                Use slower cutting speeds and adequate coolant to minimize thermal and mechanical damage:
              </p>
              <ul>
                <li><strong>Cutting speed:</strong> 100-200 RPM for most materials (slower for hard materials)</li>
                <li><strong>Coolant:</strong> Use adequate coolant flow to prevent overheating</li>
                <li><strong>Feed rate:</strong> Steady, moderate pressure - let the wheel do the cutting</li>
                <li><strong>Blade selection:</strong> Choose appropriate abrasive blades for the material</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Warning:</strong> Overheating during sectioning can cause phase transformations or work 
                  hardening that will affect hardness measurements. Always use adequate coolant and appropriate 
                  cutting speeds.
                </p>
              </div>
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting for Hardness Testing</h2>
              <p>
                Mounting provides edge retention, easier handling, and creates a flat surface for testing. For 
                hardness testing, mounting is often essential, especially for case depth measurements and edge testing.
              </p>

              <h3>Mounting Material Selection</h3>
              <p>
                Choose mounting materials that provide adequate support and edge retention:
              </p>
              <ul>
                <li><strong>Phenolic:</strong> Hard, provides excellent edge retention. Good for most hardness testing 
                applications. Preferred for case depth measurements.</li>
                <li><strong>Epoxy:</strong> Softer than phenolic but still provides good edge retention. Suitable for 
                most applications.</li>
                <li><strong>Conductive mounting:</strong> Required for some automated hardness testers that use 
                electrical contact for positioning</li>
                <li><strong>Transparent mounting:</strong> Useful when you need to see sample edges or features</li>
              </ul>

              <h3>Mounting Considerations</h3>
              <ul>
                <li><strong>Edge retention:</strong> Critical for case depth measurements and edge hardness testing. 
                Use harder mounting materials and proper mounting techniques.</li>
                <li><strong>Sample orientation:</strong> Mount sample so the test surface is perpendicular to the 
                mounting surface</li>
                <li><strong>Mount size:</strong> Standard 25-32 mm diameter mounts work well for most hardness testers</li>
                <li><strong>Parallelism:</strong> Ensure mounted sample surface is parallel to the mount base for 
                consistent testing</li>
                <li><strong>Mounting pressure:</strong> Use appropriate pressure to ensure good adhesion without 
                damaging the sample</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Tip:</strong> For case depth measurements, mount samples so the case-hardened surface is 
                  perpendicular to the mount surface. This allows hardness measurements to be made at increasing 
                  depths from the surface.
                </p>
              </div>
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding for Hardness Testing</h2>
              <p>
                Grinding removes sectioning damage and creates a flat surface. For hardness testing, grinding must 
                be thorough to remove all damage while avoiding work hardening.
              </p>

              <h3>Grinding Sequence</h3>
              <p>
                Use a progressive grinding sequence to remove damage:
              </p>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage (30-60 seconds)</li>
                <li><strong>240 grit:</strong> Remove previous scratches (30-60 seconds)</li>
                <li><strong>400 grit:</strong> Further refinement (30-60 seconds)</li>
                <li><strong>600 grit:</strong> Final grinding step (30-60 seconds)</li>
              </ol>

              <h3>Grinding Techniques</h3>
              <ul>
                <li><strong>Rotate 90°:</strong> Rotate sample 90° between each grit to ensure complete scratch removal</li>
                <li><strong>Consistent pressure:</strong> Use moderate, consistent pressure - avoid excessive pressure 
                that could cause work hardening</li>
                <li><strong>Adequate time:</strong> Spend sufficient time at each step to remove all previous scratches</li>
                <li><strong>Water lubrication:</strong> Use water as lubricant to prevent overheating</li>
                <li><strong>Check progress:</strong> Visually inspect to ensure all previous scratches are removed</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Important:</strong> Incomplete grinding will leave scratches that cannot be removed during 
                  polishing. Ensure all grinding scratches are removed before proceeding to polishing. For microhardness 
                  testing, this is especially critical.
                </p>
              </div>
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing for Hardness Testing</h2>
              <p>
                Polishing creates the smooth, scratch-free surface required for accurate hardness testing. The 
                polishing quality required depends on the hardness test method.
              </p>

              <h3>Polishing Sequence</h3>
              <p>
                For most hardness testing applications, use the following sequence:
              </p>
              <ol>
                <li><strong>9 μm diamond:</strong> 3-5 minutes on hard cloth (e.g., Texmet)</li>
                <li><strong>3 μm diamond:</strong> 3-5 minutes on medium-hard cloth</li>
                <li><strong>1 μm diamond:</strong> 2-3 minutes on soft cloth</li>
                <li><strong>0.05 μm colloidal silica:</strong> 1-2 minutes on soft cloth (required for Vickers and 
                Knoop testing)</li>
              </ol>

              <h3>Polishing Requirements by Test Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Rockwell & Brinell</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• 1 μm diamond polishing sufficient</li>
                    <li>• Final colloidal silica optional</li>
                    <li>• Focus on flatness</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Vickers & Knoop</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Must polish to 0.05 μm colloidal silica</li>
                    <li>• Scratch-free surface critical</li>
                    <li>• Excellent flatness required</li>
                  </ul>
                </div>
              </div>

              <h3>Polishing Techniques</h3>
              <ul>
                <li><strong>Consistent pressure:</strong> Use moderate, consistent pressure throughout polishing</li>
                <li><strong>Adequate time:</strong> Spend sufficient time at each step to remove all previous scratches</li>
                <li><strong>Clean between steps:</strong> Thoroughly clean sample between polishing steps to prevent 
                contamination</li>
                <li><strong>Check surface:</strong> Inspect surface under microscope to ensure scratches are removed</li>
                <li><strong>Avoid over-polishing:</strong> Over-polishing can create relief and affect flatness</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Quality Check:</strong> Before hardness testing, examine the surface under a microscope at 
                  200-500x magnification. The surface should be scratch-free and flat. Any remaining scratches or 
                  surface defects can affect hardness measurements.
                </p>
              </div>
            </section>

            <section id="surface-requirements" className="scroll-mt-24">
              <h2>Surface Requirements</h2>
              <p>
                Hardness testing requires specific surface characteristics that differ from standard metallographic 
                preparation. Understanding these requirements ensures accurate test results.
              </p>

              <h3>Surface Finish</h3>
              <p>
                Surface roughness (Ra) requirements vary by test method:
              </p>
              <ul>
                <li><strong>Rockwell:</strong> ≤ 0.8 μm Ra (typically achieved with 600 grit finish)</li>
                <li><strong>Vickers:</strong> ≤ 0.1-0.2 μm Ra (requires diamond polishing to 1 μm minimum)</li>
                <li><strong>Knoop:</strong> ≤ 0.1 μm Ra (requires final polishing with 0.05 μm colloidal silica)</li>
                <li><strong>Brinell:</strong> ≤ 1.6 μm Ra (typically achieved with 400-600 grit finish)</li>
              </ul>

              <h3>Flatness</h3>
              <p>
                Surface flatness is critical for accurate hardness measurements:
              </p>
              <ul>
                <li><strong>General requirement:</strong> Surface should be flat within 0.05 mm over the test area</li>
                <li><strong>Microhardness:</strong> Even stricter flatness requirements (0.01-0.02 mm)</li>
                <li><strong>Measurement:</strong> Use a straightedge or optical flat to check flatness</li>
                <li><strong>Correction:</strong> If surface is not flat, re-polish with attention to maintaining 
                even pressure</li>
              </ul>

              <h3>Scratch-Free Surface</h3>
              <p>
                For microhardness testing (Vickers and Knoop), the surface must be completely scratch-free:
              </p>
              <ul>
                <li><strong>Visual inspection:</strong> Examine at 200-500x magnification</li>
                <li><strong>No visible scratches:</strong> Any scratches can interfere with indentation measurement</li>
                <li><strong>Clean surface:</strong> Remove all polishing residue and contaminants</li>
                <li><strong>Proper lighting:</strong> Use appropriate illumination to reveal scratches</li>
              </ul>

              <h3>Surface Cleanliness</h3>
              <p>
                Clean surfaces are essential for accurate hardness testing:
              </p>
              <ul>
                <li><strong>Remove polishing residue:</strong> Thoroughly clean after final polishing</li>
                <li><strong>No contaminants:</strong> Ensure no oil, fingerprints, or other contaminants</li>
                <li><strong>Proper cleaning:</strong> Use water, alcohol, or appropriate solvents</li>
                <li><strong>Dry surface:</strong> Ensure surface is completely dry before testing</li>
              </ul>
            </section>

            <section id="edge-retention" className="scroll-mt-24">
              <h2>Edge Retention</h2>
              <p>
                Edge retention is critical for case depth measurements, edge hardness testing, and testing near 
                sample boundaries. Poor edge retention can lead to inaccurate measurements and invalid test results.
              </p>

              <h3>Why Edge Retention Matters</h3>
              <p>
                During grinding and polishing, edges can become rounded or damaged, making it difficult or impossible 
                to make accurate hardness measurements near edges. This is especially important for:
              </p>
              <ul>
                <li><strong>Case depth measurements:</strong> Hardness must be measured starting at the surface</li>
                <li><strong>Edge hardness:</strong> Testing hardness near sample edges or boundaries</li>
                <li><strong>Coating thickness:</strong> Measuring hardness through thin coatings</li>
                <li><strong>Weld zones:</strong> Testing hardness across weld boundaries</li>
              </ul>

              <h3>Techniques for Edge Retention</h3>
              <ul>
                <li><strong>Hard mounting materials:</strong> Use phenolic or other hard mounting resins that provide 
                better edge support</li>
                <li><strong>Reduced pressure:</strong> Use lighter pressure during grinding and polishing, especially 
                near edges</li>
                <li><strong>Edge protection:</strong> Consider using edge protection techniques or fixtures</li>
                <li><strong>Progressive refinement:</strong> Use finer abrasives and lighter pressure as you approach 
                final polish</li>
                <li><strong>Shorter polishing times:</strong> Avoid over-polishing which can round edges</li>
              </ul>

              <h3>Verifying Edge Retention</h3>
              <p>
                Before testing, verify that edges are properly retained:
              </p>
              <ul>
                <li><strong>Visual inspection:</strong> Examine edges under microscope at 100-200x</li>
                <li><strong>Sharp edges:</strong> Edges should appear sharp and well-defined</li>
                <li><strong>No rounding:</strong> Check for edge rounding or chamfering</li>
                <li><strong>Consistent edge:</strong> Edge should be consistent along the length</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Best Practice:</strong> For case depth measurements, prepare multiple samples and test the 
                  one with the best edge retention. Even slight edge rounding can affect surface hardness measurements.
                </p>
              </div>
            </section>

            <section id="case-depth-testing" className="scroll-mt-24">
              <h2>Case Depth Testing Preparation</h2>
              <p>
                Case depth measurements require special preparation techniques to ensure accurate hardness profiles 
                from the surface into the core material.
              </p>

              <h3>Sample Orientation</h3>
              <p>
                Mount samples so the case-hardened surface is perpendicular to the mount surface:
              </p>
              <ul>
                <li><strong>Perpendicular mounting:</strong> Case surface should be at 90° to mount base</li>
                <li><strong>Consistent orientation:</strong> Ensure all samples are mounted consistently</li>
                <li><strong>Marking:</strong> Mark the case surface to identify it during preparation</li>
              </ul>

              <h3>Preparation Requirements</h3>
              <ul>
                <li><strong>Excellent edge retention:</strong> Critical for accurate surface hardness measurement</li>
                <li><strong>Flat surface:</strong> Surface must be flat to allow accurate depth measurements</li>
                <li><strong>Scratch-free:</strong> Required for microhardness testing</li>
                <li><strong>Proper polishing:</strong> Polish to 0.05 μm colloidal silica for Knoop testing</li>
              </ul>

              <h3>Measurement Considerations</h3>
              <p>
                When preparing for case depth measurements:
              </p>
              <ul>
                <li><strong>Test direction:</strong> Hardness measurements are made perpendicular to the case surface</li>
                <li><strong>Starting point:</strong> First measurement should be at or very near the surface</li>
                <li><strong>Measurement spacing:</strong> Typically 0.05-0.1 mm spacing for detailed profiles</li>
                <li><strong>Depth range:</strong> Prepare surface to allow testing through the entire case depth</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Knoop Testing:</strong> Knoop microhardness testing is often preferred for case depth 
                  measurements because the elongated indenter allows testing closer to edges and provides better 
                  resolution in thin case layers. Preparation must be excellent to support Knoop testing.
                </p>
              </div>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <p>
                Common problems encountered when preparing samples for hardness testing and their solutions:
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
                      <td className="border border-gray-300 px-4 py-3 font-medium">Scratches visible after polishing</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Incomplete grinding</li>
                          <li>Skipped polishing steps</li>
                          <li>Insufficient polishing time</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Return to grinding and complete all steps</li>
                          <li>Ensure all polishing steps are completed</li>
                          <li>Increase polishing time at each step</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Poor edge retention</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Excessive polishing pressure</li>
                          <li>Soft mounting material</li>
                          <li>Over-polishing</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Use lighter pressure, especially near edges</li>
                          <li>Use harder mounting material (phenolic)</li>
                          <li>Reduce polishing time</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Surface not flat</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Uneven pressure during polishing</li>
                          <li>Sample not properly mounted</li>
                          <li>Relief between phases</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Use even pressure across entire surface</li>
                          <li>Ensure sample is properly mounted</li>
                          <li>Reduce polishing time to minimize relief</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Inconsistent hardness readings</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Work hardening from preparation</li>
                          <li>Surface contamination</li>
                          <li>Inadequate surface finish</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Use lighter pressure, adequate coolant during cutting</li>
                          <li>Thoroughly clean surface before testing</li>
                          <li>Improve surface finish to required level</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Edge rounding</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Excessive pressure</li>
                          <li>Soft mounting material</li>
                          <li>Long polishing times</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Reduce pressure, especially near edges</li>
                          <li>Use harder mounting material</li>
                          <li>Reduce polishing time</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Quality Verification</h3>
              <p>
                Before hardness testing, verify sample quality:
              </p>
              <ul>
                <li><strong>Visual inspection:</strong> Examine surface at 200-500x magnification</li>
                <li><strong>Scratch-free:</strong> No visible scratches (critical for microhardness)</li>
                <li><strong>Flat surface:</strong> Check flatness with straightedge or optical flat</li>
                <li><strong>Edge retention:</strong> Verify edges are sharp and well-defined</li>
                <li><strong>Clean surface:</strong> Ensure no contamination or residue</li>
                <li><strong>Proper finish:</strong> Surface finish meets requirements for test method</li>
              </ul>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Ready to Prepare Your Samples?</h2>
              <p className="mb-4">
                Now that you understand the requirements for hardness testing preparation, explore our material-specific 
                guides or browse our equipment and consumables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides/carbon-steel-preparation"
                  className="btn-primary text-center"
                >
                  Carbon Steel Guide
                </Link>
                <Link 
                  href="/guides/equipment-overview"
                  className="btn-secondary text-center"
                >
                  Equipment Overview
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
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/guides/mounting" className="text-primary-600 hover:underline font-semibold">
                  → Mounting
                </Link>
                <Link href="/guides/equipment-overview" className="text-primary-600 hover:underline font-semibold">
                  → Equipment Overview
                </Link>
                <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  → Troubleshooting Guide
                </Link>
                <Link href="/guides/carbon-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Carbon Steel Preparation
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


