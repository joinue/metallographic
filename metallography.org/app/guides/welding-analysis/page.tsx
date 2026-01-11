import { Metadata } from 'next'
import Image from 'next/image'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import ProductLink from '@/components/ProductLink'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('welding-analysis')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'weld-zone-regions', label: 'Weld Zone Regions' },
  { id: 'sectioning', label: 'Sectioning Weld Samples' },
  { id: 'mounting', label: 'Mounting Considerations' },
  { id: 'grinding-polishing', label: 'Grinding and Polishing' },
  { id: 'etching-techniques', label: 'Etching Techniques' },
  { id: 'welding-methods', label: 'Welding Methods' },
  { id: 'defect-detection', label: 'Defect Detection' },
  { id: 'microstructure-analysis', label: 'Microstructure Analysis' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function WeldingAnalysisGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Welding Analysis and Weld Zone Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Application-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Welding Analysis and Weld Zone Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing weld samples for metallographic analysis, covering weld zone, 
              heat-affected zone (HAZ), and fusion boundary preparation for different welding methods.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#weld-zone-regions" className="text-primary-600 hover:underline">Weld Zone Regions</a></li>
              <li><a href="#sectioning" className="text-primary-600 hover:underline">Sectioning Weld Samples</a></li>
              <li><a href="#mounting" className="text-primary-600 hover:underline">Mounting Considerations</a></li>
              <li><a href="#grinding-polishing" className="text-primary-600 hover:underline">Grinding and Polishing</a></li>
              <li><a href="#etching-techniques" className="text-primary-600 hover:underline">Etching Techniques</a></li>
              <li><a href="#welding-methods" className="text-primary-600 hover:underline">Welding Methods</a></li>
              <li><a href="#defect-detection" className="text-primary-600 hover:underline">Defect Detection</a></li>
              <li><a href="#microstructure-analysis" className="text-primary-600 hover:underline">Microstructure Analysis</a></li>
              <li><a href="#best-practices" className="text-primary-600 hover:underline">Best Practices</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Welding creates complex microstructural zones that require specialized preparation techniques for 
                accurate metallographic analysis. A typical weld contains multiple distinct regions: the weld metal 
                (fusion zone), the heat-affected zone (HAZ), the fusion boundary, and the unaffected base metal. 
                Each region has different microstructures and properties that must be properly revealed through 
                careful sample preparation.
              </p>
              <p>
                Proper preparation of weld samples is essential for:
              </p>
              <ul>
                <li>Evaluating weld quality and integrity</li>
                <li>Detecting defects (cracks, porosity, inclusions)</li>
                <li>Analyzing microstructural changes in the HAZ</li>
                <li>Verifying weld penetration and fusion</li>
                <li>Assessing post-weld heat treatment effectiveness</li>
                <li>Optimizing welding parameters</li>
                <li>Failure analysis of welded components</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Key Challenge:</strong> Weld samples often contain multiple materials with different 
                  hardnesses and microstructures. This requires careful preparation to avoid relief, maintain 
                  edge retention, and reveal all zones clearly. The preparation must preserve the integrity of 
                  each zone while revealing their distinct microstructural features.
                </p>
              </div>
            </section>

            <section id="weld-zone-regions" className="scroll-mt-24">
              <h2>Understanding Weld Zone Regions</h2>
              <p>
                Before preparing weld samples, it's important to understand the different regions that will be 
                examined. Each region has distinct characteristics and preparation requirements.
              </p>

              <h3>1. Weld Metal (Fusion Zone)</h3>
              <p>
                The weld metal is the region where the base metal and filler metal have melted and solidified. 
                Characteristics include:
              </p>
              <ul>
                <li><strong>As-cast microstructure:</strong> Columnar grains growing from the fusion boundary toward 
                the weld centerline</li>
                <li><strong>Dendritic structure:</strong> Often visible in welds, especially in aluminum and 
                stainless steel</li>
                <li><strong>Variable composition:</strong> May differ from base metal if filler metal is used</li>
                <li><strong>Potential defects:</strong> Porosity, inclusions, cracks, incomplete fusion</li>
              </ul>

              <h3>2. Heat-Affected Zone (HAZ)</h3>
              <p>
                The HAZ is the region of base metal that was heated but not melted. It experiences microstructural 
                changes due to the thermal cycle. The HAZ typically contains several sub-zones:
              </p>
              <ul>
                <li><strong>Coarse-grained HAZ:</strong> Nearest to the weld, where grain growth occurred</li>
                <li><strong>Fine-grained HAZ:</strong> Where recrystallization occurred</li>
                <li><strong>Intercritical HAZ:</strong> Where partial transformation occurred (in steels)</li>
                <li><strong>Subcritical HAZ:</strong> Where only tempering or aging occurred</li>
              </ul>
              <p>
                The HAZ is often the most critical region for weld performance, as it can be the weakest link in 
                the weldment.
              </p>

              <h3>3. Fusion Boundary</h3>
              <p>
                The fusion boundary is the interface between the weld metal and the HAZ. This region is critical 
                for analysis because:
              </p>
              <ul>
                <li>It marks the transition from melted to unmelted material</li>
                <li>It may contain defects such as lack of fusion</li>
                <li>It shows the extent of weld penetration</li>
                <li>It reveals the quality of the weld fusion</li>
              </ul>

              <h3>4. Base Metal</h3>
              <p>
                The unaffected base metal provides a reference microstructure for comparison. It should show the 
                original material structure without thermal effects from welding.
              </p>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Preparation Goal:</strong> The ideal weld sample preparation reveals all zones clearly 
                  with sharp boundaries, no relief between zones, and microstructures that accurately represent 
                  each region. This requires careful attention to grinding, polishing, and etching techniques.
                </p>
              </div>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning Weld Samples</h2>
              <p>
                Proper sectioning is critical for weld analysis. The section location and orientation determine 
                what can be observed and analyzed.
              </p>

              <h3>Section Orientation</h3>
              <p>
                Choose section orientation based on what you need to analyze:
              </p>
              <ul>
                <li><strong>Transverse section:</strong> Perpendicular to the weld direction - shows the full 
                cross-section including all zones. Most common for general analysis.</li>
                <li><strong>Longitudinal section:</strong> Parallel to the weld direction - shows weld bead 
                shape, penetration profile, and defects along the weld length.</li>
                <li><strong>Oblique section:</strong> At an angle - useful for examining specific features or 
                defects.</li>
              </ul>

              <h3>Section Location</h3>
              <p>
                Select section locations that provide the most information:
              </p>
              <ul>
                <li><strong>Weld centerline:</strong> Shows the full weld cross-section</li>
                <li><strong>Weld toe:</strong> Critical area where stress concentrations occur</li>
                <li><strong>Weld root:</strong> Important for penetration analysis</li>
                <li><strong>Defect locations:</strong> If defects are suspected, section through them</li>
              </ul>

              <h3>Sectioning Techniques</h3>
              <p>
                Use appropriate sectioning methods to minimize damage:
              </p>
              <ul>
                <li><strong>Abrasive cutoff:</strong> Use slow speeds (100-200 RPM) with adequate coolant to 
                prevent overheating</li>
                <li><strong>Coolant:</strong> Essential to prevent thermal damage to the HAZ microstructure</li>
                <li><strong>Multiple cuts:</strong> For large samples, make multiple cuts to isolate the region 
                of interest</li>
                <li><strong>Preserve features:</strong> Leave adequate material around features of interest</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Warning:</strong> Overheating during sectioning can alter the HAZ microstructure, 
                  making it impossible to accurately assess the weld. Always use adequate coolant and appropriate 
                  cutting speeds.
                </p>
              </div>

              <h3>Sample Size</h3>
              <p>
                Weld samples should be large enough to include:
              </p>
              <ul>
                <li>Complete weld metal cross-section</li>
                <li>Full HAZ on both sides (for butt welds)</li>
                <li>Adequate base metal for reference</li>
                <li>Typically 25-32 mm width is sufficient for most analyses</li>
              </ul>

              {/* Equipment Recommendations */}
              <div className="mt-8 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
                <h3 className="text-xl font-semibold mb-4">Sectioning Equipment for Weld Samples</h3>
                <p className="mb-4 text-gray-700">
                  Proper sectioning equipment is essential for preparing weld samples without damaging the HAZ microstructure:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                      <Link 
                        href="https://metallographic.com/metallographic-equipment/sectioning/abrasive-cutoff-machines.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="/images/equipment/sectioning/abrasive cutoff machines/accutom-100/accutom-100-cover.webp"
                          alt="Abrasive cutoff machines for sectioning weld samples"
                          width={250}
                          height={188}
                          className="max-w-full max-h-full object-contain"
                        />
                      </Link>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Abrasive Cutoff Machines</h4>
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                      Precision cutoff machines with variable speed control and adequate coolant systems are essential for sectioning welds without thermal damage.
                    </p>
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/sectioning/abrasive-cutoff-machines.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      View Cutoff Machines →
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                      <Link 
                        href="https://metallographic.com/metallographic-equipment/sectioning/cutting-wheels.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="/images/consumables/precision-cutting-abrasive-blades.webp"
                          alt="Abrasive cutting wheels for weld sectioning"
                          width={250}
                          height={188}
                          className="max-w-full max-h-full object-contain"
                        />
                      </Link>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Cutting Wheels</h4>
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                      Appropriate abrasive cutting wheels designed for the material being sectioned help minimize damage and ensure clean cuts.
                    </p>
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/sectioning/cutting-wheels.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      View Cutting Wheels →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting Considerations</h2>
              <p>
                Mounting weld samples provides several advantages and requires specific considerations due to 
                the multiple zones with different properties.
              </p>

              <h3>Why Mount Weld Samples</h3>
              <ul>
                <li><strong>Edge retention:</strong> Critical for examining weld boundaries and HAZ</li>
                <li><strong>Easier handling:</strong> Weld samples are often irregularly shaped</li>
                <li><strong>Protection:</strong> Prevents damage to delicate weld features</li>
                <li><strong>Orientation:</strong> Ensures proper orientation for analysis</li>
              </ul>

              <h3>Mounting Material Selection</h3>
              <p>
                Choose mounting materials based on your analysis needs:
              </p>
              <ul>
                <li><strong>Phenolic:</strong> Hard, provides excellent edge retention. Preferred for most weld 
                analysis. Good for hardness testing across weld zones.</li>
                <li><strong>Epoxy:</strong> Softer but still provides good edge retention. Suitable for most 
                applications. Better for preserving delicate features.</li>
                <li><strong>Conductive mounting:</strong> Required if using automated hardness testers or 
                electrical testing methods.</li>
              </ul>

              <h3>Mounting Orientation</h3>
              <p>
                Mount samples to optimize analysis:
              </p>
              <ul>
                <li><strong>Weld perpendicular to mount surface:</strong> Most common orientation - allows 
                examination of all zones in cross-section</li>
                <li><strong>Mark weld location:</strong> Mark the weld centerline or other features before 
                mounting to maintain orientation</li>
                <li><strong>Multiple samples:</strong> Can mount multiple weld sections in one mount for 
                comparison</li>
              </ul>

              <h3>Special Considerations</h3>
              <ul>
                <li><strong>Porosity preservation:</strong> Use vacuum mounting if porosity analysis is needed</li>
                <li><strong>Edge protection:</strong> Consider using edge protection techniques for delicate 
                weld boundaries</li>
                <li><strong>Mount size:</strong> Standard 25-32 mm diameter works well for most analyses</li>
              </ul>

              {/* Mounting Equipment and Consumables */}
              <div className="mt-8 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
                <h3 className="text-xl font-semibold mb-4">Mounting Equipment and Materials</h3>
                <p className="mb-4 text-gray-700">
                  Proper mounting equipment and materials are essential for preserving weld zone boundaries and maintaining edge retention:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                      <Link 
                        href="https://metallographic.com/metallographic-equipment/mounting/compression-mounting-presses.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="/images/equipment/mounting/compression mounting presses/autopress-3/autopress-3-cover.webp"
                          alt="Compression mounting presses for weld samples"
                          width={250}
                          height={188}
                          className="max-w-full max-h-full object-contain"
                        />
                      </Link>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Compression Mounting Presses</h4>
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                      Compression mounting presses provide consistent pressure and temperature control for mounting weld samples with phenolic or epoxy resins.
                    </p>
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/mounting/compression-mounting-presses.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      View Mounting Presses →
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                      <Link 
                        href="https://metallographic.com/metallographic-consumables/mounting-materials.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="/images/consumables/phenolic.webp"
                          alt="Mounting materials for weld samples"
                          width={250}
                          height={188}
                          className="max-w-full max-h-full object-contain"
                        />
                      </Link>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Mounting Materials</h4>
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                      Phenolic mounting materials provide excellent edge retention for weld zone analysis, while epoxy materials offer good edge retention with better feature preservation.
                    </p>
                    <Link 
                      href="https://metallographic.com/metallographic-consumables/mounting-materials.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      View Mounting Materials →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section id="grinding-polishing" className="scroll-mt-24">
              <h2>Grinding and Polishing Weld Samples</h2>
              <p>
                Weld samples present unique challenges during grinding and polishing due to the different 
                hardnesses and microstructures in each zone. Careful technique is required to avoid relief 
                and maintain zone boundaries.
              </p>

              <h3>Grinding Sequence</h3>
              <p>
                Use a progressive grinding sequence to remove sectioning damage:
              </p>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage (60-90 seconds)</li>
                <li><strong>240 grit:</strong> Remove previous scratches (60-90 seconds)</li>
                <li><strong>400 grit:</strong> Further refinement (60-90 seconds)</li>
                <li><strong>600 grit:</strong> Final grinding step (60-90 seconds)</li>
              </ol>

              <h3>Grinding Techniques for Welds</h3>
              <ul>
                <li><strong>Rotate 90°:</strong> Rotate sample 90° between each grit to ensure complete 
                scratch removal</li>
                <li><strong>Moderate pressure:</strong> Use consistent, moderate pressure - avoid excessive 
                pressure that could cause relief</li>
                <li><strong>Check zone boundaries:</strong> Periodically check that zone boundaries remain 
                visible and sharp</li>
                <li><strong>Adequate time:</strong> Spend sufficient time at each step to remove all previous 
                scratches</li>
                <li><strong>Water lubrication:</strong> Use water as lubricant to prevent overheating</li>
              </ul>

              <h3>Polishing Sequence</h3>
              <p>
                Use a progressive polishing sequence:
              </p>
              <ol>
                <li><strong>9 μm diamond:</strong> 3-5 minutes on hard cloth (e.g., Texmet)</li>
                <li><strong>3 μm diamond:</strong> 3-5 minutes on medium-hard cloth</li>
                <li><strong>1 μm diamond:</strong> 2-3 minutes on soft cloth</li>
                <li><strong>0.05 μm colloidal silica:</strong> 1-2 minutes on soft cloth (optional, for 
                high-quality finish)</li>
              </ol>

              <h3>Avoiding Relief</h3>
              <p>
                Relief (uneven polishing between zones) is a common problem with weld samples. To minimize relief:
              </p>
              <ul>
                <li><strong>Use appropriate cloths:</strong> Harder cloths for harder zones, but avoid too much 
                variation</li>
                <li><strong>Moderate pressure:</strong> Avoid excessive pressure that can cause differential 
                removal</li>
                <li><strong>Shorter polishing times:</strong> Don't over-polish - stop when scratches are removed</li>
                <li><strong>Check frequently:</strong> Examine under microscope to detect relief early</li>
                <li><strong>Final polish:</strong> Use colloidal silica for final polish to minimize relief</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Tip:</strong> If relief becomes a problem, return to a coarser polishing step and 
                  use lighter pressure and shorter times. Relief is easier to prevent than to fix.
                </p>
              </div>

              {/* Grinding and Polishing Equipment */}
              <div className="mt-8 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
                <h3 className="text-xl font-semibold mb-4">Grinding and Polishing Equipment</h3>
                <p className="mb-4 text-gray-700">
                  Proper grinding and polishing equipment is essential for preparing weld samples without creating relief between zones:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                      <Link 
                        href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="/images/equipment/grinding & polishing/manual grinder polishers/nano-1000s/nano-1000s-cover.webp"
                          alt="Grinder polishers for weld sample preparation"
                          width={250}
                          height={188}
                          className="max-w-full max-h-full object-contain"
                        />
                      </Link>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Grinder Polishers</h4>
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                      Manual grinder polishers with variable speed control allow precise control over grinding and polishing pressure, essential for avoiding relief in weld samples.
                    </p>
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      View Grinder Polishers →
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                      <Link 
                        href="https://metallographic.com/metallographic-consumables/polishing-cloths.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="/images/consumables/polishing-pads.webp"
                          alt="Polishing cloths for weld sample preparation"
                          width={250}
                          height={188}
                          className="max-w-full max-h-full object-contain"
                        />
                      </Link>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Polishing Cloths</h4>
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                      Appropriate polishing cloths (hard for initial polishing, soft for final polishing) help minimize relief between weld zones with different hardnesses.
                    </p>
                    <Link 
                      href="https://metallographic.com/metallographic-consumables/polishing-cloths.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      View Polishing Cloths →
                    </Link>
                  </div>
                </div>
              </div>

              <h3>Edge Retention</h3>
              <p>
                Maintaining sharp zone boundaries is critical for weld analysis:
              </p>
              <ul>
                <li><strong>Hard mounting:</strong> Use phenolic or other hard mounting materials</li>
                <li><strong>Lighter pressure:</strong> Use lighter pressure near boundaries</li>
                <li><strong>Shorter times:</strong> Avoid over-polishing which can round boundaries</li>
                <li><strong>Final check:</strong> Verify boundaries are sharp before etching</li>
              </ul>
            </section>

            <section id="etching-techniques" className="scroll-mt-24">
              <h2>Etching Techniques for Welds</h2>
              <p>
                Etching is critical for revealing weld microstructures. Different zones may require different 
                etchants or etching times. The goal is to reveal all zones clearly with good contrast.
              </p>

              <h3>Steel Welds</h3>
              <p>
                For carbon and low-alloy steel welds:
              </p>
              <ul>
                <li><strong>2% Nital:</strong> Most common etchant for steel welds. Reveals ferrite, pearlite, 
                and martensite structures. Etch for 5-15 seconds, swab or immerse.</li>
                <li><strong>4% Picral:</strong> Better for revealing pearlite and cementite. Use when nital 
                doesn't provide sufficient contrast.</li>
                <li><strong>Vilella's reagent:</strong> Good for stainless steel welds. Reveals austenite, 
                ferrite, and sigma phase.</li>
                <li><strong>Murakami's reagent:</strong> For high-alloy steels and stainless steels. Reveals 
                carbides and intermetallic phases.</li>
              </ul>

              <h3>Stainless Steel Welds</h3>
              <p>
                Stainless steel welds require specialized etchants:
              </p>
              <ul>
                <li><strong>Vilella's reagent:</strong> Standard etchant for austenitic stainless steels. 
                Reveals grain boundaries and delta ferrite.</li>
                <li><strong>Electrolytic 10% oxalic acid:</strong> For detailed microstructural analysis. 
                Use 6V, 30-60 seconds.</li>
                <li><strong>Glyceregia:</strong> For revealing sigma phase and other intermetallics.</li>
              </ul>

              <h3>Aluminum Welds</h3>
              <p>
                Aluminum welds require different techniques:
              </p>
              <ul>
                <li><strong>Keller's reagent:</strong> Standard etchant for aluminum. Reveals grain boundaries 
                and second phases. Etch for 10-20 seconds.</li>
                <li><strong>Weck's reagent:</strong> For anodizing aluminum to reveal grain structure.</li>
                <li><strong>Polarized light:</strong> Often useful for aluminum without etching.</li>
              </ul>

              <h3>Etching Strategy</h3>
              <p>
                When etching weld samples:
              </p>
              <ul>
                <li><strong>Start light:</strong> Begin with shorter etching times - you can always etch more</li>
                <li><strong>Check frequently:</strong> Examine under microscope to assess etching progress</li>
                <li><strong>Zone-specific:</strong> Different zones may etch at different rates - adjust 
                accordingly</li>
                <li><strong>Multiple etches:</strong> Sometimes multiple etchants are needed to reveal all 
                features</li>
                <li><strong>Document:</strong> Record etchant and etching time for reproducibility</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Etching Tip:</strong> If one zone is over-etched while another is under-etched, 
                  try using a gentler etchant or shorter time, then selectively re-etch specific zones if 
                  needed. Sometimes a compromise is necessary to reveal all zones adequately.
                </p>
              </div>

              {/* Etching Equipment and Consumables */}
              <div className="mt-8 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
                <h3 className="text-xl font-semibold mb-4">Etching Equipment and Reagents</h3>
                <p className="mb-4 text-gray-700">
                  Proper etching equipment and reagents are essential for revealing weld zone microstructures:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                      <Link 
                        href="https://metallographic.com/metallographic-consumables/etchants.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="/images/consumables/etching.webp"
                          alt="Etchants for weld analysis"
                          width={250}
                          height={188}
                          className="max-w-full max-h-full object-contain"
                        />
                      </Link>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Etching Reagents</h4>
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                      Standard etchants like Nital (for steels), Vilella's reagent (for stainless steels), and Keller's reagent (for aluminum) are essential for revealing weld zone microstructures.
                    </p>
                    <Link 
                      href="https://metallographic.com/metallographic-consumables/etchants.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      View Etchants →
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                      <Link 
                        href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="/images/equipment/microscopy/metallurgical microscopes/im-5000/im-5000-cover.webp"
                          alt="Metallurgical microscopes for weld analysis"
                          width={250}
                          height={188}
                          className="max-w-full max-h-full object-contain"
                        />
                      </Link>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Metallurgical Microscopes</h4>
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                      High-quality metallurgical microscopes with reflected light capabilities are essential for examining weld zones, HAZ, and fusion boundaries at appropriate magnifications.
                    </p>
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      View Microscopes →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section id="welding-methods" className="scroll-mt-24">
              <h2>Welding Methods and Their Characteristics</h2>
              <p>
                Different welding methods produce different microstructures and require specific preparation 
                considerations. Understanding the welding method helps guide preparation and analysis.
              </p>

              <h3>TIG (Tungsten Inert Gas) Welding</h3>
              <p>
                TIG welding produces high-quality welds with good control. Characteristics:
              </p>
              <ul>
                <li><strong>Narrow HAZ:</strong> Concentrated heat input creates a narrow HAZ</li>
                <li><strong>Fine microstructure:</strong> Typically produces fine-grained weld metal</li>
                <li><strong>Good fusion:</strong> Usually excellent fusion with base metal</li>
                <li><strong>Preparation:</strong> Standard preparation techniques work well</li>
                <li><strong>Analysis focus:</strong> Weld metal quality, HAZ width, fusion boundary</li>
              </ul>

              <h3>MIG (Metal Inert Gas) / MAG (Metal Active Gas) Welding</h3>
              <p>
                MIG/MAG welding is common in production. Characteristics:
              </p>
              <ul>
                <li><strong>Wider HAZ:</strong> Higher heat input creates a wider HAZ</li>
                <li><strong>Layered structure:</strong> Multiple passes create layered microstructure</li>
                <li><strong>Potential defects:</strong> May have porosity or incomplete fusion between passes</li>
                <li><strong>Preparation:</strong> May need to examine multiple layers</li>
                <li><strong>Analysis focus:</strong> Inter-pass regions, HAZ extent, overall weld quality</li>
              </ul>

              <h3>Friction Stir Welding (FSW)</h3>
              <p>
                FSW is a solid-state joining process. Characteristics:
              </p>
              <ul>
                <li><strong>No melting:</strong> Material doesn't melt, so no traditional fusion zone</li>
                <li><strong>Stir zone:</strong> Region where material was plastically deformed and mixed</li>
                <li><strong>Thermo-mechanically affected zone (TMAZ):</strong> Unique to FSW</li>
                <li><strong>Fine grains:</strong> Often produces very fine-grained structures</li>
                <li><strong>Preparation:</strong> Standard techniques, but focus on stir zone and TMAZ</li>
                <li><strong>Analysis focus:</strong> Stir zone microstructure, TMAZ characteristics, 
                material flow patterns</li>
              </ul>

              <h3>Electron Beam Welding (EBW)</h3>
              <p>
                EBW produces deep, narrow welds. Characteristics:
              </p>
              <ul>
                <li><strong>Very narrow HAZ:</strong> Concentrated energy creates extremely narrow HAZ</li>
                <li><strong>Deep penetration:</strong> Can create very deep welds</li>
                <li><strong>Keyhole formation:</strong> May have keyhole-related features</li>
                <li><strong>Preparation:</strong> Standard techniques, but HAZ may be difficult to resolve</li>
                <li><strong>Analysis focus:</strong> Weld depth, HAZ width, keyhole features</li>
              </ul>

              <h3>Resistance Welding (Spot, Seam)</h3>
              <p>
                Resistance welding creates localized welds. Characteristics:
              </p>
              <ul>
                <li><strong>Small weld nugget:</strong> Weld is typically small and localized</li>
                <li><strong>Narrow HAZ:</strong> Heat is very localized</li>
                <li><strong>Preparation:</strong> Section through the nugget center</li>
                <li><strong>Analysis focus:</strong> Nugget size, fusion, HAZ extent</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Preparation Note:</strong> Regardless of welding method, the fundamental preparation 
                  principles remain the same: proper sectioning, mounting, grinding, polishing, and etching. 
                  The differences lie in what you're looking for and how the zones appear after preparation.
                </p>
              </div>
            </section>

            <section id="defect-detection" className="scroll-mt-24">
              <h2>Defect Detection in Welds</h2>
              <p>
                One of the primary purposes of weld metallography is detecting defects that could compromise 
                weld integrity. Proper preparation is essential for accurate defect identification.
              </p>

              <h3>Common Weld Defects</h3>
              
              <h4>Porosity</h4>
              <ul>
                <li><strong>Appearance:</strong> Round or irregular voids in the weld metal</li>
                <li><strong>Preparation:</strong> Use vacuum mounting to preserve porosity. Avoid over-polishing 
                which can round or close pores.</li>
                <li><strong>Analysis:</strong> Measure size, distribution, and location</li>
              </ul>

              <h4>Cracks</h4>
              <ul>
                <li><strong>Types:</strong> Hot cracks, cold cracks, stress corrosion cracks</li>
                <li><strong>Preparation:</strong> Section through cracks. Use careful polishing to avoid 
                smearing or closing cracks.</li>
                <li><strong>Analysis:</strong> Identify crack type, location, propagation path, and cause</li>
              </ul>

              <h4>Incomplete Fusion</h4>
              <ul>
                <li><strong>Appearance:</strong> Lack of fusion between weld passes or between weld and base metal</li>
                <li><strong>Preparation:</strong> Section to show fusion boundaries clearly. Proper etching 
                reveals lack of fusion.</li>
                <li><strong>Analysis:</strong> Assess extent and location of incomplete fusion</li>
              </ul>

              <h4>Inclusions</h4>
              <ul>
                <li><strong>Types:</strong> Slag inclusions, oxide inclusions, tungsten inclusions (in TIG)</li>
                <li><strong>Preparation:</strong> Standard preparation, but avoid over-polishing which can 
                pull out inclusions</li>
                <li><strong>Analysis:</strong> Identify type, size, and distribution</li>
              </ul>

              <h4>Undercut</h4>
              <ul>
                <li><strong>Appearance:</strong> Groove at weld toe where base metal was melted away</li>
                <li><strong>Preparation:</strong> Section through weld toe. Maintain edge retention to show 
                undercut clearly.</li>
                <li><strong>Analysis:</strong> Measure depth and assess severity</li>
              </ul>

              <h3>Preparation for Defect Analysis</h3>
              <ul>
                <li><strong>Section location:</strong> Section through suspected defects</li>
                <li><strong>Preserve defects:</strong> Use techniques that preserve defect morphology</li>
                <li><strong>Avoid artifacts:</strong> Distinguish real defects from preparation artifacts</li>
                <li><strong>Multiple sections:</strong> Sometimes multiple sections are needed to fully 
                characterize defects</li>
                <li><strong>Documentation:</strong> Document defect location, size, and characteristics</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Important:</strong> Be careful to distinguish real defects from preparation artifacts. 
                  Pullouts, smearing, and contamination can look like defects. Experience and careful 
                  preparation help avoid misidentification.
                </p>
              </div>
            </section>

            <section id="microstructure-analysis" className="scroll-mt-24">
              <h2>Microstructure Analysis of Weld Zones</h2>
              <p>
                Each weld zone has characteristic microstructures that provide information about weld quality, 
                properties, and potential issues. Understanding what to look for in each zone guides effective 
                analysis.
              </p>

              <h3>Weld Metal Microstructure</h3>
              <p>
                The weld metal microstructure depends on composition, cooling rate, and welding parameters:
              </p>
              <ul>
                <li><strong>Columnar grains:</strong> Growing from fusion boundary toward centerline</li>
                <li><strong>Dendritic structure:</strong> Visible in many welds, especially aluminum and 
                stainless steel</li>
                <li><strong>Second phases:</strong> Precipitates, inclusions, or intermetallics</li>
                <li><strong>Grain size:</strong> Can vary across the weld</li>
                <li><strong>Defects:</strong> Porosity, cracks, inclusions</li>
              </ul>

              <h3>HAZ Microstructure</h3>
              <p>
                The HAZ microstructure reveals the thermal history:
              </p>
              <ul>
                <li><strong>Grain growth:</strong> Coarse grains in the high-temperature region</li>
                <li><strong>Phase transformations:</strong> In steels, may show martensite, bainite, or 
                other transformation products</li>
                <li><strong>Precipitation:</strong> May show over-aging or dissolution of precipitates</li>
                <li><strong>Recrystallization:</strong> Fine grains in recrystallized regions</li>
                <li><strong>Softening:</strong> In age-hardened alloys, may show softening</li>
              </ul>

              <h3>Fusion Boundary</h3>
              <p>
                The fusion boundary should show:
              </p>
              <ul>
                <li><strong>Sharp transition:</strong> Clear boundary between weld and base metal</li>
                <li><strong>Good fusion:</strong> No gaps or lack of fusion</li>
                <li><strong>Grain growth:</strong> Grains growing from base metal into weld</li>
                <li><strong>No defects:</strong> No cracks or other defects at the boundary</li>
              </ul>

              <h3>Analysis Magnifications</h3>
              <p>
                Use appropriate magnifications for different analyses:
              </p>
              <ul>
                <li><strong>Low (50-100x):</strong> Overall weld structure, zone identification, defect 
                location</li>
                <li><strong>Medium (200-500x):</strong> Detailed microstructure, grain structure, phase 
                identification</li>
                <li><strong>High (500-1000x):</strong> Fine details, precipitates, small defects</li>
              </ul>

              {/* Microstructure Examples */}
              <div className="mt-8 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
                <h3 className="text-xl font-semibold mb-4">Weld Microstructure Examples</h3>
                <p className="mb-4 text-gray-700">
                  Understanding typical weld microstructures helps in analysis and interpretation. When examining weld samples, look for:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-base font-semibold mb-2">Stainless Steel Welds</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Distinct weld metal with columnar grains</li>
                      <li>• HAZ showing grain growth and phase changes</li>
                      <li>• Delta ferrite in austenitic welds</li>
                      <li>• Fusion boundary clearly visible</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2">
                      Etched with Vilella's reagent or electrolytic oxalic acid
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-base font-semibold mb-2">Carbon Steel Welds</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Weld metal with as-cast microstructure</li>
                      <li>• HAZ showing grain growth and transformation</li>
                      <li>• Possible martensite or bainite in HAZ</li>
                      <li>• Base metal with original structure</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2">
                      Etched with 2% Nital or 4% Picral
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-base font-semibold mb-2">Aluminum Welds</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Dendritic structure in weld metal</li>
                      <li>• Recrystallized grains in HAZ</li>
                      <li>• Precipitate distribution changes</li>
                      <li>• Possible softening in HAZ</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2">
                      Etched with Keller's reagent or anodized
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-base font-semibold mb-2">Friction Stir Welds</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Stir zone with fine recrystallized grains</li>
                      <li>• TMAZ showing deformation structure</li>
                      <li>• Material flow patterns</li>
                      <li>• No traditional fusion zone</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2">
                      Material-specific etchants required
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-600 bg-blue-50 p-3 rounded">
                  <p>
                    <strong>Note:</strong> Actual microstructures will vary based on welding method, material composition, process parameters, and heat treatment. Always compare observed microstructures with expected structures for the specific material and welding process. Document all observations with photographs at appropriate magnifications.
                  </p>
                </div>
              </div>

              <h3>Documentation</h3>
              <p>
                Document your analysis with:
              </p>
              <ul>
                <li><strong>Photographs:</strong> At appropriate magnifications showing all zones</li>
                <li><strong>Measurements:</strong> Zone widths, grain sizes, defect sizes</li>
                <li><strong>Descriptions:</strong> Microstructural features observed</li>
                <li><strong>Comparisons:</strong> Compare with specifications or standards</li>
              </ul>
            </section>

            <section id="best-practices" className="scroll-mt-24">
              <h2>Best Practices for Weld Analysis</h2>
              <p>
                Following best practices ensures reliable, reproducible weld analysis results.
              </p>

              <h3>Preparation Best Practices</h3>
              <ul>
                <li><strong>Plan ahead:</strong> Determine what you need to analyze before sectioning</li>
                <li><strong>Proper sectioning:</strong> Use appropriate speeds and coolant to prevent damage</li>
                <li><strong>Consistent technique:</strong> Follow standardized procedures for reproducibility</li>
                <li><strong>Check progress:</strong> Examine samples at each preparation step</li>
                <li><strong>Avoid relief:</strong> Use appropriate techniques to minimize relief</li>
                <li><strong>Proper etching:</strong> Use correct etchants and times for the material</li>
              </ul>

              <h3>Analysis Best Practices</h3>
              <ul>
                <li><strong>Systematic examination:</strong> Examine all zones systematically</li>
                <li><strong>Multiple magnifications:</strong> Use different magnifications for different 
                purposes</li>
                <li><strong>Document everything:</strong> Record all observations and measurements</li>
                <li><strong>Compare zones:</strong> Compare weld zones with base metal</li>
                <li><strong>Reference standards:</strong> Use applicable standards for evaluation</li>
                <li><strong>Expert consultation:</strong> Consult experts when needed</li>
              </ul>

              <h3>Quality Control</h3>
              <ul>
                <li><strong>Standard procedures:</strong> Follow documented procedures consistently</li>
                <li><strong>Calibration:</strong> Ensure equipment is properly calibrated</li>
                <li><strong>Reference samples:</strong> Use reference samples to verify procedures</li>
                <li><strong>Training:</strong> Ensure operators are properly trained</li>
                <li><strong>Review:</strong> Have results reviewed by qualified personnel</li>
              </ul>

              <h3>Common Mistakes to Avoid</h3>
              <ul>
                <li><strong>Overheating during sectioning:</strong> Can alter HAZ microstructure</li>
                <li><strong>Excessive relief:</strong> Makes zone boundaries unclear</li>
                <li><strong>Over-etching:</strong> Can obscure microstructural details</li>
                <li><strong>Poor edge retention:</strong> Makes boundary analysis difficult</li>
                <li><strong>Inadequate documentation:</strong> Makes results difficult to reproduce or verify</li>
                <li><strong>Misidentifying artifacts:</strong> Confusing preparation artifacts with real features</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Remember:</strong> Good weld analysis requires patience and attention to detail. 
                  Take time at each step to ensure proper preparation. The quality of your analysis depends 
                  directly on the quality of your preparation.
                </p>
              </div>
            </section>

            {/* Equipment Recommendations Summary */}
            <section className="mt-12 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
              <h2 className="text-2xl font-semibold mb-4">Essential Equipment for Weld Analysis</h2>
              <p className="mb-4 text-gray-700">
                To perform comprehensive weld analysis, you'll need proper equipment for sample preparation 
                and examination. Here are the key tools:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/sectioning/abrasive-cutoff-machines.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/sectioning/abrasive cutoff machines/accutom-100/accutom-100-cover.webp"
                        alt="Abrasive cutoff machines for sectioning weld samples"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Abrasive Cutoff Machines</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Precision cutoff machines with variable speed control and adequate coolant systems are essential for sectioning welds without thermal damage to the HAZ.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/sectioning/abrasive-cutoff-machines.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Cutoff Machines →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/mounting/compression-mounting-presses.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/mounting/compression mounting presses/autopress-3/autopress-3-cover.webp"
                        alt="Compression mounting presses for weld samples"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Compression Mounting Presses</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Mounting presses provide consistent pressure and temperature control for mounting weld samples with phenolic or epoxy resins, essential for edge retention.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/mounting/compression-mounting-presses.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Mounting Presses →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/manual grinder polishers/nano-1000s/nano-1000s-cover.webp"
                        alt="Grinder polishers for weld sample preparation"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Grinder Polishers</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Manual grinder polishers with variable speed control allow precise control over grinding and polishing pressure, essential for avoiding relief in weld samples.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Grinder Polishers →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/microscopy/metallurgical microscopes/im-5000/im-5000-cover.webp"
                        alt="Metallurgical microscopes for weld analysis"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Metallurgical Microscopes</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    High-quality metallurgical microscopes with reflected light capabilities are essential for examining weld zones, HAZ, and fusion boundaries at appropriate magnifications.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Microscopes →
                  </Link>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Ready to Analyze Your Welds?</h2>
              <p className="mb-4">
                Now that you understand weld zone preparation, explore our material-specific guides or learn 
                more about related techniques.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides/stainless-steel-preparation"
                  className="btn-primary text-center"
                >
                  Stainless Steel Guide
                </Link>
                <Link 
                  href="/guides/carbon-steel-preparation"
                  className="btn-secondary text-center"
                >
                  Carbon Steel Guide
                </Link>
                <Link 
                  href="/guides/etching-procedures"
                  className="btn-secondary text-center"
                >
                  Etching Procedures
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/sectioning" className="text-primary-600 hover:underline font-semibold">
                  → Sectioning
                </Link>
                <Link href="/guides/mounting" className="text-primary-600 hover:underline font-semibold">
                  → Mounting
                </Link>
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/guides/etching-procedures" className="text-primary-600 hover:underline font-semibold">
                  → Etching Procedures
                </Link>
                <Link href="/guides/failure-analysis" className="text-primary-600 hover:underline font-semibold">
                  → Failure Analysis
                </Link>
                <Link href="/guides/hardness-testing-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Hardness Testing Preparation
                </Link>
                <Link href="/guides/quality-control-inspection" className="text-primary-600 hover:underline font-semibold">
                  → Quality Control and Inspection
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

