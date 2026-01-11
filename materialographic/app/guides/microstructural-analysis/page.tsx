import { Metadata } from 'next'
import Image from 'next/image'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('microstructural-analysis')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'preparing-samples', label: 'Preparing Samples for Microscopy' },
  { id: 'choosing-microscope', label: 'Choosing the Right Microscope' },
  { id: 'microscopy-methods', label: 'Microscopy Methods and Techniques' },
  { id: 'common-microstructures', label: 'Common Microstructures and What They Mean' },
  { id: 'interpretation', label: 'Microstructural Interpretation' },
]

export default function MicrostructuralAnalysisGuide() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData, howToStructuredData } = getGuideStructuredData(guide)

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
      {howToStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
      )}
      <article className="py-12">
      <GuideSideNav sections={sections} />
      <div className="container-custom lg:pl-0 xl:pl-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Microstructural Analysis
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Process Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Microstructural Analysis</h1>
            <p className="text-xl text-gray-600">
              Learn how to prepare samples for microscopic examination, choose the appropriate microscope, 
              and interpret microstructures to understand material properties and processing history.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#preparing-samples" className="text-primary-600 hover:underline">Preparing Samples for Microscopy</a></li>
              <li><a href="#choosing-microscope" className="text-primary-600 hover:underline">Choosing the Right Microscope</a></li>
              <li><a href="#microscopy-methods" className="text-primary-600 hover:underline">Microscopy Methods and Techniques</a></li>
              <li><a href="#common-microstructures" className="text-primary-600 hover:underline">Common Microstructures and What They Mean</a></li>
              <li><a href="#interpretation" className="text-primary-600 hover:underline">Microstructural Interpretation</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Microstructural analysis is the final step in the metallographic process, where prepared samples 
                are examined under a microscope to reveal their internal structure. This analysis provides critical 
                information about material composition, processing history, and properties. Proper sample preparation 
                and appropriate microscope selection are essential for obtaining meaningful results.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt="Example microstructure showing ferrite and pearlite in steel"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Example microstructure: Ferrite and pearlite in steel. Proper preparation and analysis reveal 
                  the internal structure that determines material properties.
                </p>
              </div>
              <p>
                This guide covers the complete process from final sample preparation through microscopic examination 
                and interpretation. Understanding these steps ensures you can effectively analyze microstructures and 
                extract meaningful information about your materials.
              </p>
            </section>

            <section id="preparing-samples" className="scroll-mt-24">
              <h2>Preparing Samples for Microscopy</h2>
              <p>
                Before examining a sample under the microscope, it must be properly prepared. The quality of your 
                preparation directly affects what you can see and how accurately you can interpret the microstructure. 
                A poorly prepared sample can lead to incorrect conclusions about material structure and properties.
              </p>

              <h3>Final Preparation Steps</h3>
              <p>
                After grinding and polishing, several final steps ensure your sample is ready for microscopic examination:
              </p>
              <ol>
                <li><strong>Thorough cleaning:</strong> Remove all polishing abrasives, debris, and contaminants. Use 
                appropriate solvents (alcohol, acetone) and clean water. Dry completely with compressed air or lint-free 
                cloth to prevent water spots or contamination.</li>
                <li><strong>Surface inspection:</strong> Examine the sample surface under low magnification or with a 
                hand lens to check for remaining scratches, contamination, or preparation artifacts. The surface should 
                be mirror-like and free of visible defects.</li>
                <li><strong>Etching (if required):</strong> Many materials require etching to reveal microstructure. 
                Select the appropriate etchant for your material and apply according to standard procedures. See our 
                <Link href="/resources/common-etchants-guide" className="text-primary-600 hover:underline font-semibold"> Common Etchants Guide</Link> for material-specific recommendations.</li>
                <li><strong>Post-etching cleaning:</strong> After etching, rinse thoroughly with appropriate solvents 
                and dry completely. Some etchants leave residues that can interfere with examination.</li>
                <li><strong>Storage:</strong> Store prepared samples in a clean, dry environment. Protect from dust, 
                moisture, and physical damage. Consider using sample storage systems or protective covers.</li>
              </ol>

              <h3>Quality Checks Before Microscopy</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Checklist for Sample Readiness</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Surface is mirror-like with no visible scratches</li>
                  <li>✓ Sample is clean and free of contamination</li>
                  <li>✓ Etching (if used) has revealed microstructure without over-etching</li>
                  <li>✓ Sample is dry and free of water spots or residues</li>
                  <li>✓ Sample is properly mounted and secure</li>
                  <li>✓ Sample orientation is correct for the analysis you need</li>
                </ul>
              </div>

              <h3>Common Preparation Issues</h3>
              <p>
                Be aware of these common problems that can affect microscopic examination:
              </p>
              <ul>
                <li><strong>Remaining scratches:</strong> Incomplete polishing leaves scratches that can be mistaken 
                for microstructural features or obscure true structure</li>
                <li><strong>Relief:</strong> Over-polishing creates height differences between phases, which can affect 
                focus and interpretation</li>
                <li><strong>Contamination:</strong> Embedded abrasives, polishing compounds, or other contaminants can 
                appear as microstructural features</li>
                <li><strong>Over-etching:</strong> Excessive etching can obscure fine details or create artifacts</li>
                <li><strong>Under-etching:</strong> Insufficient etching may not reveal the microstructure adequately</li>
                <li><strong>Edge rounding:</strong> Poor edge retention can make edge analysis difficult or impossible</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Tip:</strong> If you're unsure about sample quality, examine it under low magnification first. 
                  Many preparation issues are visible at 50-100x and can be corrected before detailed analysis. A 
                  well-prepared sample makes all subsequent analysis much easier and more accurate.
                </p>
              </div>
            </section>

            <section id="choosing-microscope" className="scroll-mt-24">
              <h2>Choosing the Right Microscope</h2>
              <p>
                Selecting the appropriate microscope depends on your analysis requirements, material type, and available 
                resources. Different microscopes offer different capabilities, and understanding these helps you make 
                the right choice for your needs.
              </p>

              <h3>Metallurgical (Optical) Microscopes</h3>
              <p>
                Metallurgical microscopes use reflected light to examine opaque samples. They are the standard choice 
                for most routine metallographic analysis:
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/equipment/microscopy/metallurgical microscopes/im-5000/im-5000-cover.webp"
                    alt="Metallurgical microscope for microstructural analysis"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  Metallurgical microscopes are the standard tool for routine microstructural analysis, offering 
                  magnifications from 50x to 1000x with various illumination modes.
                </p>
              </div>
              <ul>
                <li><strong>Magnification range:</strong> Typically 50x to 1000x (up to 2000x with oil immersion)</li>
                <li><strong>Best for:</strong> Routine analysis, grain size measurement, phase identification, 
                quality control</li>
                <li><strong>Advantages:</strong> Relatively affordable, easy to use, fast analysis, good for most 
                materials</li>
                <li><strong>Limitations:</strong> Limited resolution (~0.2-0.3 μm), lower magnification than SEM</li>
              </ul>

              <h3>Scanning Electron Microscopes (SEM)</h3>
              <p>
                SEM provides much higher magnification and resolution than optical microscopes:
              </p>
              <ul>
                <li><strong>Magnification range:</strong> Up to 100,000x or more</li>
                <li><strong>Best for:</strong> High-magnification analysis, fracture surfaces, fine features, 
                elemental analysis (with EDS)</li>
                <li><strong>Advantages:</strong> High resolution, excellent depth of field, can analyze chemistry</li>
                <li><strong>Limitations:</strong> More expensive, requires more sample preparation, slower analysis</li>
              </ul>

              <h3>Stereo Microscopes</h3>
              <p>
                Stereo microscopes provide 3D viewing at low magnifications:
              </p>
              <ul>
                <li><strong>Magnification range:</strong> Typically 5x to 50x</li>
                <li><strong>Best for:</strong> Sample inspection, fracture surface examination, general observation</li>
                <li><strong>Advantages:</strong> 3D viewing, easy to use, good for initial sample assessment</li>
                <li><strong>Limitations:</strong> Low magnification, not suitable for detailed microstructural analysis</li>
              </ul>

              <h3>Decision Guide</h3>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h4 className="text-lg font-semibold mb-3">Which Microscope Should You Use?</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">Routine analysis, grain size, phase identification?</p>
                    <p className="text-sm text-gray-700">→ Use <strong>Metallurgical Microscope</strong></p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Need very high magnification or examining fracture surfaces?</p>
                    <p className="text-sm text-gray-700">→ Use <strong>SEM</strong></p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Initial sample inspection or general observation?</p>
                    <p className="text-sm text-gray-700">→ Use <strong>Stereo Microscope</strong></p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Need elemental analysis or chemical information?</p>
                    <p className="text-sm text-gray-700">→ Use <strong>SEM with EDS</strong></p>
                  </div>
                </div>
              </div>
            </section>

            <section id="microscopy-methods" className="scroll-mt-24">
              <h2>Microscopy Methods and Techniques</h2>
              <p>
                Different microscopy techniques reveal different aspects of microstructure. Understanding these methods 
                helps you select the appropriate technique for your analysis needs and interpret what you observe.
              </p>

              <h3>Optical Microscopy Techniques</h3>
              <p>
                Optical (light) microscopy is the most common and accessible technique for metallographic examination. 
                Standard metallurgical microscopes use reflected light illumination, allowing observation of opaque 
                samples. Various illumination modes provide different information:
              </p>

              <div className="space-y-4 my-6">
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold mb-2">Brightfield Illumination</h4>
                  <p className="text-gray-700 text-sm">
                    The standard illumination mode. Light reflects from the sample surface, with different phases 
                    appearing with different brightness based on their reflectivity and etching response. Most common 
                    for routine metallographic examination.
                  </p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold mb-2">Darkfield Illumination</h4>
                  <p className="text-gray-700 text-sm">
                    Uses oblique illumination to highlight surface features. Reveals details like scratches, porosity, 
                    and inclusions that may be less visible in brightfield. Useful for examining as-polished surfaces 
                    and detecting preparation artifacts.
                  </p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold mb-2">Polarized Light</h4>
                  <p className="text-gray-700 text-sm">
                    Uses polarized light to reveal crystallographic features. Particularly useful for non-cubic materials 
                    (titanium, zirconium, some ceramics) and for examining anisotropic features. Can reveal grain 
                    orientation differences.
                  </p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold mb-2">Differential Interference Contrast (DIC)</h4>
                  <p className="text-gray-700 text-sm">
                    Enhances contrast by converting height differences into color differences. Excellent for revealing 
                    relief (height differences between phases) and fine surface details. Particularly useful for 
                    examining polished surfaces and detecting subtle microstructural features.
                  </p>
                </div>
              </div>

              <p>
                <strong>Typical Magnification Range:</strong> 50x to 1000x (occasionally up to 2000x with oil immersion). 
                Most routine analysis is performed at 100x to 500x.
              </p>

              <h3>Scanning Electron Microscopy (SEM)</h3>
              <p>
                SEM uses a focused electron beam to scan the sample surface, providing much higher magnification and 
                resolution than optical microscopy:
              </p>
              <ul>
                <li><strong>Higher magnification:</strong> Up to 100,000x or more, compared to ~1000x for optical microscopy</li>
                <li><strong>Greater depth of field:</strong> More of the sample appears in focus, especially useful for 
                rough surfaces like fracture surfaces</li>
                <li><strong>Fracture surface examination:</strong> Ideal for failure analysis, as fracture surfaces don't 
                require polishing</li>
                <li><strong>Elemental analysis:</strong> Can be equipped with EDS (energy-dispersive X-ray spectroscopy) 
                for chemical analysis</li>
              </ul>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Image
                  src="/images/microstructures/SiAlON, KOH molten salt etch, 20,000X (SEM).JPG"
                  alt="SEM image showing high magnification detail"
                  width={500}
                  height={375}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  SEM image at 20,000x magnification showing fine microstructural details not visible with optical microscopy.
                </p>
              </div>

              <h3>Advanced Techniques</h3>
              <div className="space-y-4 my-6">
                <div>
                  <h4 className="font-semibold mb-2">Electron Backscatter Diffraction (EBSD)</h4>
                  <p className="text-gray-700 text-sm">
                    Provides crystallographic information including grain orientation, texture, and phase identification. 
                    Creates orientation maps showing how grains are oriented relative to each other. Essential for 
                    understanding deformation, recrystallization, and texture development.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Energy-Dispersive X-ray Spectroscopy (EDS)</h4>
                  <p className="text-gray-700 text-sm">
                    Chemical analysis technique that identifies elements present in the microstructure. Can be used 
                    with SEM or TEM. Provides elemental composition maps and point analyses. Essential for identifying 
                    phases, inclusions, and understanding chemical segregation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Focused Ion Beam (FIB)</h4>
                  <p className="text-gray-700 text-sm">
                    Uses a focused ion beam to precisely section specific regions of interest. Allows preparation of 
                    TEM samples from exact locations. Can also be used for in-situ sectioning and observation. 
                    Particularly valuable for failure analysis and examining specific features.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Transmission Electron Microscopy (TEM)</h4>
                  <p className="text-gray-700 text-sm">
                    Very high magnification (up to millions of times) for atomic-scale analysis. Requires extremely 
                    thin samples (typically less than 100 nm). Used for examining dislocations, fine precipitates, 
                    interfaces, and nanoscale features. Advanced research technique.
                  </p>
                </div>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Choosing the Right Technique:</strong> Start with optical microscopy for most routine analysis. 
                  Use SEM for higher magnification needs, fracture surfaces, or when elemental analysis is required. 
                  Advanced techniques like EBSD and TEM are specialized tools for specific research questions.
                </p>
              </div>
            </section>

            <section id="common-microstructures" className="scroll-mt-24">
              <h2>Common Microstructures and What They Mean</h2>
              <p>
                Learning to recognize common microstructures helps you understand what you're seeing and what it means 
                for material properties. This section provides examples of typical microstructures in different materials, 
                along with explanations of what they indicate about processing history and properties.
              </p>

              <h3>Steel Microstructures</h3>
              
              <div className="space-y-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Ferrite-Pearlite Steel</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded overflow-hidden">
                      <Image
                        src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                        alt="Ferrite and pearlite microstructure in steel"
                        width={400}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What you see:</strong> Light regions are ferrite (soft, ductile phase). Dark regions 
                        with lamellar structure are pearlite (alternating ferrite and cementite plates).
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What it means:</strong> Slow cooling from austenite (annealing or furnace cooling). 
                        Moderate strength, good ductility, machinable. Typical of normalized or annealed low-carbon steels.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Properties:</strong> Balanced strength and ductility. Good for general engineering applications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Pearlite</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded overflow-hidden">
                      <Image
                        src="/images/microstructures/Pearlite-ferrite.JPG"
                        alt="Pearlite lamellar structure"
                        width={400}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What you see:</strong> Alternating light and dark lamellae (plates). The spacing 
                        depends on cooling rate: faster cooling produces finer pearlite.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What it means:</strong> Eutectoid transformation from austenite. Fine pearlite (from 
                        faster cooling) is stronger than coarse pearlite.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Properties:</strong> Moderate strength, good machinability. Finer pearlite has higher 
                        strength and hardness.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Stainless Steel</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded overflow-hidden">
                      <Image
                        src="/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG"
                        alt="Stainless steel microstructure"
                        width={400}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What you see:</strong> Martensitic structure with fine, needle-like or lath features. 
                        May show prior austenite grain boundaries.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What it means:</strong> Quenched and tempered martensitic stainless steel. High 
                        strength and hardness with good corrosion resistance.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Properties:</strong> High strength, good wear resistance, moderate toughness. Used in 
                        applications requiring strength and corrosion resistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Cast Iron Microstructures</h3>

              <div className="space-y-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Gray Cast Iron</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded overflow-hidden">
                      <Image
                        src="/images/microstructures/Gray iron, 2%25 nital, 400X.JPG"
                        alt="Gray cast iron with graphite flakes"
                        width={400}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What you see:</strong> Graphite flakes (dark, irregular shapes) in a matrix of ferrite 
                        and/or pearlite.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What it means:</strong> Slow cooling allows graphite to form as flakes. The matrix 
                        structure depends on cooling rate and composition.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Properties:</strong> Good machinability, excellent damping capacity, but brittle. 
                        Graphite flakes act as stress concentrators.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Nodular (Ductile) Cast Iron</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded overflow-hidden">
                      <Image
                        src="/images/microstructures/Nodular cast iron, 2%25 nital, 400X (DIC).JPG"
                        alt="Nodular cast iron with spherical graphite"
                        width={400}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What you see:</strong> Spherical or nodular graphite particles (dark circles) in a 
                        ferrite or pearlite matrix.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What it means:</strong> Magnesium or cerium treatment causes graphite to form as spheres 
                        instead of flakes. Much stronger and more ductile than gray iron.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Properties:</strong> Good strength and ductility (hence "ductile iron"). Better 
                        mechanical properties than gray iron while maintaining castability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Aluminum Alloy Microstructures</h3>

              <div className="bg-gray-50 p-4 rounded-lg my-6">
                <h4 className="font-semibold mb-2">Aluminum-Silicon Alloy</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded overflow-hidden">
                    <Image
                      src="/images/microstructures/Aluminum-silicon, Kellers, 400X.JPG"
                      alt="Aluminum-silicon alloy microstructure"
                      width={400}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>What you see:</strong> Silicon particles (dark) in an aluminum matrix. May show 
                      precipitates, grain boundaries, and eutectic structure.
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>What it means:</strong> Cast or heat-treated aluminum alloy. Silicon improves castability 
                      and can form strengthening precipitates.
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Properties:</strong> Lightweight, good castability, moderate strength. Common in automotive 
                      and aerospace applications.
                    </p>
                  </div>
                </div>
              </div>

              <h3>Copper Alloy Microstructures</h3>

              <div className="space-y-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Copper (Tough Pitch)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded overflow-hidden">
                      <Image
                        src="/images/microstructures/Tough pitch copper, ASTM-30 200X.JPG"
                        alt="Tough pitch copper microstructure"
                        width={400}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What you see:</strong> Equiaxed grains with annealing twins (straight lines within 
                        grains). May show oxide particles.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What it means:</strong> Annealed copper with recrystallized grain structure. Twins 
                        indicate low stacking fault energy and annealing.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Properties:</strong> Excellent electrical and thermal conductivity, good ductility, 
                        corrosion resistance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Brass (70-30)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded overflow-hidden">
                      <Image
                        src="/images/microstructures/70-30 rolled brass, 200X.JPG"
                        alt="Rolled brass microstructure"
                        width={400}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What you see:</strong> Elongated grains showing directionality from rolling. May show 
                        annealing twins.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What it means:</strong> Cold-worked or partially recrystallized brass. Elongated 
                        grains indicate mechanical working.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Properties:</strong> Good strength and formability. Elongated structure indicates 
                        work hardening from rolling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Titanium Alloy Microstructures</h3>

              <div className="bg-gray-50 p-4 rounded-lg my-6">
                <h4 className="font-semibold mb-2">Titanium with ZrB₂</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded overflow-hidden">
                    <Image
                      src="/images/microstructures/Titanium+ZrB2, 400X (DIC).JPG"
                      alt="Titanium composite microstructure"
                      width={400}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>What you see:</strong> Alpha/beta titanium structure with reinforcing particles. May show 
                      Widmanstätten structure or equiaxed grains.
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>What it means:</strong> Titanium matrix composite or alloy. The structure depends on 
                      heat treatment and processing.
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Properties:</strong> High strength-to-weight ratio, excellent corrosion resistance. 
                      Used in aerospace and medical applications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Learning to Interpret Microstructures:</strong> Start by identifying the phases present, 
                  then consider grain size and distribution, and finally relate these to processing history and 
                  properties. With practice, you'll develop the ability to quickly assess material condition and 
                  processing from microstructure examination.
                </p>
              </div>
            </section>

            <section id="interpretation" className="scroll-mt-24">
              <h2>Microstructural Interpretation</h2>
              <p>
                Interpreting microstructures involves understanding what you observe and relating it to material 
                properties and processing history. This requires knowledge of phase transformations, processing 
                effects, and material behavior.
              </p>

              <h3>Systematic Approach to Interpretation</h3>
              <ol>
                <li><strong>Identify phases present:</strong> What phases can you see? Are they expected for this 
                material and composition?</li>
                <li><strong>Assess grain size:</strong> Is the grain size fine, medium, or coarse? How does this 
                relate to processing?</li>
                <li><strong>Examine phase distribution:</strong> Are phases uniformly distributed or segregated? Are 
                there clusters or bands?</li>
                <li><strong>Look for processing indicators:</strong> Elongated grains suggest mechanical working. 
                Fine structures suggest rapid cooling. Coarse structures suggest slow cooling or high temperatures.</li>
                <li><strong>Check for defects:</strong> Are there inclusions, porosity, cracks, or other defects?</li>
                <li><strong>Relate to properties:</strong> How does the observed structure relate to expected material 
                properties?</li>
              </ol>

              <h3>Common Interpretation Challenges</h3>
              <ul>
                <li><strong>Preparation artifacts:</strong> Scratches, contamination, or relief can be mistaken for 
                microstructural features</li>
                <li><strong>Etching effects:</strong> Over-etching or under-etching can obscure or create false features</li>
                <li><strong>Magnification effects:</strong> Features may look different at different magnifications</li>
                <li><strong>Sample orientation:</strong> The same structure can look different depending on the plane 
                of section</li>
                <li><strong>Phase identification:</strong> Some phases look similar and require additional analysis 
                (e.g., EDS) for positive identification</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Best Practice:</strong> When in doubt, examine the sample at multiple magnifications and 
                  compare with reference microstructures. Document your observations with photomicrographs for future 
                  reference and comparison.
                </p>
              </div>
            </section>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/guides/introduction-to-metallography" className="text-primary-600 hover:underline font-semibold">
                  → Introduction to Metallography
                </Link>
                <Link href="/guides/equipment-overview" className="text-primary-600 hover:underline font-semibold">
                  → Equipment Overview
                </Link>
                <Link href="/resources/common-etchants-guide" className="text-primary-600 hover:underline font-semibold">
                  → Common Etchants Guide
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

