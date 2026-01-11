import { Metadata } from 'next'
import Image from 'next/image'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import GlossaryTermTooltip from '@/components/GlossaryTermTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('introduction-to-metallography')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'what-is-metallography', label: 'What is Metallography?' },
  { id: 'why-metallography-matters', label: 'Why Metallography Matters' },
  { id: 'history', label: 'A Short History of Metallography' },
  { id: 'basic-concepts', label: 'Basic Concepts and Terminology' },
  { id: 'phases-and-transformations', label: 'Phases and Phase Transformations' },
  { id: 'preparation-process', label: 'The Sample Preparation Process' },
  { id: 'microscopy-techniques', label: 'Microscopy Techniques' },
  { id: 'applications', label: 'Applications of Metallography' },
  { id: 'standards-practices', label: 'Standards and Best Practices' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'further-reading', label: 'Further Reading and Resources' },
]

export default function IntroductionToMetallographyGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Introduction to Metallography
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Basics Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Introduction to Metallography</h1>
            <p className="text-xl text-gray-600">
              Learn the fundamentals of metallography, including what it is, why it matters, and how it's used 
              in materials science and engineering to understand material structure and properties.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#what-is-metallography" className="text-primary-600 hover:underline">What is Metallography?</a></li>
              <li><a href="#why-metallography-matters" className="text-primary-600 hover:underline">Why Metallography Matters</a></li>
              <li><a href="#history" className="text-primary-600 hover:underline">A Short History of Metallography</a></li>
              <li><a href="#basic-concepts" className="text-primary-600 hover:underline">Basic Concepts and Terminology</a></li>
              <li><a href="#phases-and-transformations" className="text-primary-600 hover:underline">Phases and Phase Transformations</a></li>
              <li><a href="#preparation-process" className="text-primary-600 hover:underline">The Sample Preparation Process</a></li>
              <li><a href="#microscopy-techniques" className="text-primary-600 hover:underline">Microscopy Techniques</a></li>
              <li><a href="#applications" className="text-primary-600 hover:underline">Applications of Metallography</a></li>
              <li><a href="#standards-practices" className="text-primary-600 hover:underline">Standards and Best Practices</a></li>
              <li><a href="#getting-started" className="text-primary-600 hover:underline">Getting Started</a></li>
              <li><a href="#further-reading" className="text-primary-600 hover:underline">Further Reading and Resources</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <AnimateOnScroll animation="fadeInUp" delay={0}>
              <section id="what-is-metallography" className="scroll-mt-24">
                <h2>What is Metallography?</h2>
              <p>
                Metallography is the scientific study and analysis of the <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> of metals and alloys.
                  The term comes from the Greek words "metallon" (metal) and "graphos" (to write or describe), 
                  literally meaning "the description of metals." Through careful sample preparation and microscopic 
                  examination, metallography reveals the internal structure of materials, allowing scientists and 
                  engineers to understand how a material's structure relates to its properties and performance.
                </p>
                
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Ferrite-Pearlite steel-1.jpg"
                      alt="Example microstructure showing ferrite and pearlite in steel"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                      Example microstructure: Ferrite and pearlite in steel. Metallography reveals the internal 
                      structure that determines material properties.
                    </p>
                  </div>
                </AnimateOnScroll>

              <p>
                At its core, metallography involves three main steps:
              </p>
              <ol>
                <li><strong>Sample preparation:</strong> <GlossaryTermTooltip term="Sectioning">Cutting</GlossaryTermTooltip>, <GlossaryTermTooltip term="Mounting">mounting</GlossaryTermTooltip>, <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip>, <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip>, and <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> a 
                representative sample to reveal its microstructure</li>
                <li><strong>Microscopic examination:</strong> Observing the prepared sample under a metallurgical 
                microscope to study its structure</li>
                <li><strong>Analysis and interpretation:</strong> Understanding what the microstructure reveals 
                about the material's composition, processing history, and properties</li>
              </ol>

              <p>
                While the name suggests it's limited to metals, modern metallography techniques are also applied 
                to ceramics, composites, polymers, and other engineering materials. The principles remain the same: 
                prepare a sample to reveal its true structure, then examine and analyze it to understand the material.
              </p>

                <AnimateOnScroll animation="fadeInUp" delay={200}>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Key Insight:</strong> Metallography bridges the gap between a material's processing 
                      history and its final properties. By examining microstructure, we can understand why a material 
                      behaves the way it does and how to improve it.
                    </p>
                  </div>
                </AnimateOnScroll>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="why-metallography-matters" className="scroll-mt-24">
                <h2>Why Metallography Matters</h2>
              <p>
                Metallography is fundamental to materials science and engineering because it provides direct 
                insight into the relationship between structure and properties. The microstructure of a material (its 
                <GlossaryTermTooltip term="Grain Size"> grain size</GlossaryTermTooltip>, <GlossaryTermTooltip term="Phase">phase</GlossaryTermTooltip> distribution, <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip>, and other features) directly determines its mechanical, 
                electrical, thermal, and chemical properties.
              </p>
              <p className="mt-4">
                For a more detailed exploration of the purpose and applications of metallography, see our comprehensive 
                guide on <Link href="/guides/purpose-and-applications" className="text-primary-600 hover:underline font-semibold">
                Purpose and Applications of Metallography</Link>.
              </p>

              <h3>Understanding Material Behavior</h3>
              <p>
                Every material's behavior (whether it's strong or weak, ductile or brittle, corrosion-resistant 
                or susceptible) can be traced back to its microstructure. Metallography allows us to:
              </p>
              <ul>
                <li><strong>Explain material properties:</strong> Understand why a material has specific strength, 
                hardness, or other characteristics based on its internal structure</li>
                <li><strong>Predict performance:</strong> Use microstructure analysis to anticipate how a material 
                will perform under different conditions</li>
                <li><strong>Optimize processing:</strong> Identify the best heat treatment, mechanical working, 
                or other processing steps to achieve desired properties</li>
                <li><strong>Diagnose problems:</strong> Identify the root cause of material failures or 
                performance issues</li>
              </ul>

              <h3>Quality Control and Assurance</h3>
              <p>
                In manufacturing and production, metallography serves as a critical quality control tool:
              </p>
              <ul>
                <li><strong>Verification:</strong> Confirm that materials meet specifications and standards</li>
                <li><strong>Process monitoring:</strong> Ensure manufacturing processes are producing consistent, 
                high-quality materials</li>
                <li><strong>Batch validation:</strong> Verify that each production batch meets required 
                microstructure criteria</li>
                <li><strong>Certification:</strong> Provide documentation for materials used in critical applications</li>
              </ul>

              <h3>Research and Development</h3>
              <p>
                Metallography is essential in materials research and development:
              </p>
              <ul>
                <li><strong>New material development:</strong> Characterize and optimize new alloys and materials</li>
                <li><strong>Process development:</strong> Understand how different processing methods affect structure</li>
                <li><strong>Fundamental research:</strong> Study the relationships between processing, structure, 
                and properties</li>
                <li><strong>Failure analysis:</strong> Investigate why materials fail and how to prevent failures</li>
              </ul>

                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Real-World Impact:</strong> Metallography is used in industries ranging from aerospace 
                      and automotive to medical devices and electronics. It ensures that materials meet safety and 
                      performance requirements in critical applications.
                    </p>
                  </div>
                </AnimateOnScroll>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="history" className="scroll-mt-24">
                <h2>A Short History of Metallography</h2>
              <p>
                Understanding the history of metallography provides context for how this field developed and why 
                certain techniques and principles are fundamental today. While humans have been working with metals 
                for thousands of years, the scientific study of microstructure is relatively recent.
              </p>

              <h3>H. C. Sorby: The Father of Metallography</h3>
              <p>
                The field of metallography as we know it today began with <strong>Henry Clifton Sorby (1826-1908)</strong>, 
                an English geologist and metallurgist. In 1863, Sorby adapted techniques from petrography (the study of 
                rocks) to examine metals. He was the first to prepare metal samples by grinding and polishing, then 
                observe them under a microscope. Sorby's groundbreaking work revealed that metals had internal 
                structures (grains, phases, and other features) that could be studied and related to material properties.
              </p>
              <p>
                Sorby's contributions were revolutionary. He developed methods for sample preparation, used chemical 
                etching to reveal microstructures, and made detailed observations of steel microstructures. His work 
                established the foundation for modern metallography, demonstrating that the internal structure of metals 
                could be systematically studied and understood.
              </p>

              <h3>Modern Evolution</h3>
              <p>
                Since Sorby's pioneering work, metallography has evolved significantly. The development of electron 
                microscopy (SEM and TEM) in the mid-20th century enabled observation at much higher magnifications. 
                Today, advanced techniques like electron backscatter diffraction (EBSD), energy-dispersive X-ray 
                spectroscopy (EDS), and automated image analysis provide unprecedented insight into material structure.
              </p>

                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Historical Perspective:</strong> From Sorby's first observations to today's advanced analytical 
                      techniques, metallography has evolved from a descriptive science to a quantitative discipline. The 
                      fundamental principles established by early metallographers remain valid, but modern tools provide 
                      unprecedented insight into material structure.
                    </p>
                  </div>
                </AnimateOnScroll>

                <p className="text-sm text-gray-600 italic mt-4">
                  This section provides a brief overview of metallography's history. For a comprehensive exploration 
                  of the field's evolution, including ancient foundations, the Industrial Revolution era, electron 
                  microscopy developments, and modern digital techniques, see our complete{' '}
                  <Link href="/guides/history-of-metallography" className="text-primary-600 hover:underline font-semibold">
                    History of Metallography guide
                  </Link>.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="basic-concepts" className="scroll-mt-24">
                <h2>Basic Concepts and Terminology</h2>
              <p>
                Understanding metallography requires familiarity with key concepts and terminology. These 
                fundamental terms will help you navigate the field and understand material structures. 
                For a comprehensive reference, see our <Link href="/glossary" className="text-primary-600 hover:underline font-semibold">Metallography Glossary</Link>.
              </p>

              <h3>Microstructure</h3>
              <p>
                The <strong>microstructure</strong> is the internal structure of a material as observed under a 
                microscope. It includes:
              </p>
              <ul>
                <li><strong><GlossaryTermTooltip term="Grain">Grains</GlossaryTermTooltip>:</strong> Individual crystals within a <GlossaryTermTooltip term="Polycrystalline">polycrystalline</GlossaryTermTooltip> material. <GlossaryTermTooltip term="Grain Size">Grain size</GlossaryTermTooltip> 
                significantly affects material properties.</li>
                <li><strong><GlossaryTermTooltip term="Phase">Phases</GlossaryTermTooltip>:</strong> Distinct regions with different chemical compositions or crystal 
                structures (e.g., <GlossaryTermTooltip term="Ferrite">ferrite</GlossaryTermTooltip> and <GlossaryTermTooltip term="Cementite">cementite</GlossaryTermTooltip> in steel).</li>
                <li><strong><GlossaryTermTooltip term="Grain Boundary">Grain boundaries</GlossaryTermTooltip>:</strong> Interfaces between adjacent grains where atoms are less 
                regularly arranged.</li>
                <li><strong><GlossaryTermTooltip term="Precipitate">Precipitates</GlossaryTermTooltip>:</strong> Small particles of a second phase that form within the 
                primary phase.</li>
                <li><strong><GlossaryTermTooltip term="Defect">Defects</GlossaryTermTooltip>:</strong> Imperfections such as <GlossaryTermTooltip term="Inclusion">inclusions</GlossaryTermTooltip>, <GlossaryTermTooltip term="Void">voids</GlossaryTermTooltip>, <GlossaryTermTooltip term="Crack">cracks</GlossaryTermTooltip>, or <GlossaryTermTooltip term="Dislocation">dislocations</GlossaryTermTooltip>.</li>
              </ul>

              <h3>Sample Preparation</h3>
              <p>
                Proper <GlossaryTermTooltip term="Preparation">sample preparation</GlossaryTermTooltip> is critical for accurate metallographic analysis. The process typically 
                includes:
              </p>
              <ul>
                <li><strong><GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip>:</strong> Cutting a representative sample from the larger workpiece</li>
                <li><strong><GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip>:</strong> Embedding the sample in <GlossaryTermTooltip term="Resin">resin</GlossaryTermTooltip> for easier handling</li>
                <li><strong><GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip>:</strong> Removing surface damage and creating a flat surface using 
                progressively finer <GlossaryTermTooltip term="Abrasive">abrasives</GlossaryTermTooltip></li>
                <li><strong><GlossaryTermTooltip term="Polishing">Polishing</GlossaryTermTooltip>:</strong> Creating a mirror-like surface free of scratches</li>
                <li><strong><GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip>:</strong> Applying <GlossaryTermTooltip term="Etchant">chemical reagents</GlossaryTermTooltip> to reveal the microstructure</li>
              </ul>

              <h3>Common Microstructural Features</h3>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Term</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Definition</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Significance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-medium">Grain Size</td>
                          <td className="border border-gray-300 px-4 py-3">Average size of individual crystals</td>
                          <td className="border border-gray-300 px-4 py-3">Affects strength, toughness, and ductility. Smaller grains generally increase strength.</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium">Phase</td>
                          <td className="border border-gray-300 px-4 py-3">Region with uniform composition and structure</td>
                          <td className="border border-gray-300 px-4 py-3">Different phases have different properties. Phase distribution determines overall material behavior.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-medium">Grain Boundary</td>
                          <td className="border border-gray-300 px-4 py-3">Interface between adjacent grains</td>
                          <td className="border border-gray-300 px-4 py-3">Affects material properties and can be sites for precipitation or failure initiation.</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium">Precipitate</td>
                          <td className="border border-gray-300 px-4 py-3">Small particles of a second phase</td>
                          <td className="border border-gray-300 px-4 py-3">Can strengthen materials (precipitation hardening) or affect other properties.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-medium">Inclusion</td>
                          <td className="border border-gray-300 px-4 py-3">Non-metallic particles in the material</td>
                          <td className="border border-gray-300 px-4 py-3">Can act as stress concentrators and affect mechanical properties, especially toughness.</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium">Work Hardening</td>
                          <td className="border border-gray-300 px-4 py-3">Increase in strength due to plastic deformation</td>
                          <td className="border border-gray-300 px-4 py-3">Visible as elongated grains or deformation bands. Affects material formability.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AnimateOnScroll>

                <h3>Magnification and Observation</h3>
              <p>
                Metallographic examination typically uses:
              </p>
              <ul>
                <li><strong>Optical microscopy:</strong> Standard light microscopy at magnifications from 50x to 1000x. 
                Most common for routine analysis.</li>
                <li><strong>Scanning electron microscopy (SEM):</strong> Higher magnification (up to 100,000x+) and 
                greater depth of field. Used for detailed analysis of fine features.</li>
                <li><strong>Transmission electron microscopy (TEM):</strong> Very high magnification for atomic-scale 
                analysis. Used in advanced research.</li>
              </ul>

                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Learning Tip:</strong> Start with understanding grain structure and phases. These are the 
                      most fundamental microstructural features and appear in virtually all metallographic analysis.
                    </p>
                  </div>
                </AnimateOnScroll>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="phases-and-transformations" className="scroll-mt-24">
                <h2>Phases and Phase Transformations</h2>
              <p>
                Understanding phases (distinct regions with uniform composition and crystal structure) is fundamental to 
                metallography. Different phases have different properties, and the distribution, size, and morphology 
                of phases determine overall material behavior. Phase transformations, driven by heat treatment and 
                processing, create these microstructures.
              </p>

              <h3>Common Phases in Steels</h3>
              <p>
                Steels are iron-carbon alloys, and their microstructures consist of various phases that form depending 
                on composition and heat treatment:
              </p>

                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Ferrite (α-Fe)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Body-centered cubic (BCC) iron with low carbon solubility. Soft, ductile, and magnetic. Appears 
                    light in etched microstructures.
                  </p>
                  <div className="mt-3 rounded overflow-hidden">
                    <Image
                      src="/images/microstructures/Ferrite-Pearlite steel-1.jpg"
                      alt="Ferrite and pearlite microstructure in steel"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Austenite (γ-Fe)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Face-centered cubic (FCC) iron with higher carbon solubility. Stable at high temperatures. 
                    Transforms to other phases on cooling. Non-magnetic.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Martensite</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Hard, brittle phase formed by rapid quenching from austenite. Body-centered tetragonal structure. 
                    Very high strength and hardness but low ductility. Appears as needle-like or lath structures.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Pearlite</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Lamellar structure of alternating ferrite and cementite (Fe₃C) plates. Forms from slow cooling of 
                    austenite. Moderate strength and good machinability. Appears as alternating light and dark bands.
                  </p>
                  <div className="mt-3 rounded overflow-hidden">
                    <Image
                      src="/images/microstructures/Pearlite-ferrite.JPG"
                      alt="Pearlite and ferrite microstructure"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Bainite</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Intermediate transformation product between pearlite and martensite. Forms at intermediate cooling 
                    rates. Fine, acicular (needle-like) structure. Good combination of strength and toughness.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Cementite (Fe₃C)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Iron carbide phase. Very hard and brittle. Appears dark with nital etching, light/white with picral etching. 
                    Appearance depends on the etchant used. Present in pearlite, bainite, and as separate particles in some steels.
                  </p>
                </div>
                  </div>
                </AnimateOnScroll>

              <h3>Grain Boundaries</h3>
              <p>
                Grain boundaries are interfaces between adjacent grains (crystals) in a polycrystalline material. 
                They are important because:
              </p>
              <ul>
                <li><strong>Property influence:</strong> Grain boundaries affect strength, ductility, and other properties. 
                Finer grains (more grain boundary area) generally increase strength.</li>
                <li><strong>Precipitation sites:</strong> Second phases often form preferentially at grain boundaries 
                during heat treatment.</li>
                <li><strong>Failure initiation:</strong> Grain boundaries can be sites where cracks initiate, especially 
                under stress or in corrosive environments.</li>
                <li><strong>Diffusion paths:</strong> Atoms and defects move more easily along grain boundaries, affecting 
                processes like creep and corrosion.</li>
                <li><strong>Etching response:</strong> Grain boundaries etch preferentially, making them visible under 
                the microscope.</li>
              </ul>

              <h3>Phase Transformations</h3>
              <p>
                Phase transformations occur when materials are heated or cooled, changing their microstructure. 
                Understanding these transformations is crucial for metallography:
              </p>

              <h4>Heat Treatment Relationships</h4>
              <ul>
                <li><strong>Annealing:</strong> Slow cooling produces soft, coarse microstructures (e.g., ferrite and 
                pearlite in steel)</li>
                <li><strong>Normalizing:</strong> Air cooling produces finer, more uniform microstructures</li>
                <li><strong>Quenching:</strong> Rapid cooling produces hard phases (e.g., martensite in steel)</li>
                <li><strong>Tempering:</strong> Reheating quenched materials reduces hardness and increases toughness</li>
                <li><strong>Aging/Precipitation:</strong> Time-dependent phase formation at specific temperatures</li>
              </ul>

              <h4>Processing Relationships</h4>
              <ul>
                <li><strong>Cold working:</strong> Mechanical deformation at low temperatures creates elongated grains 
                and increases strength (work hardening)</li>
                <li><strong>Hot working:</strong> Deformation at high temperatures allows recrystallization, producing 
                new, equiaxed grains</li>
                <li><strong>Recrystallization:</strong> Formation of new, strain-free grains after cold working</li>
                <li><strong>Grain growth:</strong> Increase in average grain size at elevated temperatures</li>
              </ul>

                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Key Principle:</strong> The microstructure you observe is a "snapshot" of the material's 
                      processing history. By understanding phase transformations, you can interpret what processing steps 
                      a material has undergone and predict its properties.
                    </p>
                  </div>
                </AnimateOnScroll>

                <h3>Phase Diagrams</h3>
              <p>
                Phase diagrams (equilibrium diagrams) show which phases are stable at different temperatures and 
                compositions. While metallography examines actual microstructures (which may differ from equilibrium 
                due to processing), phase diagrams provide essential reference information for understanding what 
                phases should be present and how they form.
              </p>
            </section>

            <section id="applications" className="scroll-mt-24">
              <h2>Applications of Metallography</h2>
              <p>
                Metallography finds applications across numerous industries and research areas. Understanding these 
                applications helps illustrate the practical importance of the field.
              </p>
              <p className="mt-4 mb-6">
                For a comprehensive guide covering the purpose and detailed applications of metallography across 
                different industries and use cases, see our <Link href="/guides/purpose-and-applications" className="text-primary-600 hover:underline font-semibold">
                Purpose and Applications guide</Link>.
              </p>

              <h3>Quality Control and Inspection</h3>
              <p>
                One of the most common applications is quality control in manufacturing:
              </p>
              <ul>
                <li><strong>Material verification:</strong> Confirming that received materials meet specifications</li>
                <li><strong>Process validation:</strong> Ensuring heat treatment, welding, or other processes produce 
                the expected microstructure</li>
                <li><strong>Batch testing:</strong> Verifying consistency across production batches</li>
                <li><strong>Standards compliance:</strong> Meeting industry standards and specifications (ASTM, ISO, etc.)</li>
              </ul>

              <h3>Failure Analysis</h3>
              <p>
                When materials fail, metallography helps identify the cause:
              </p>
              <ul>
                <li><strong>Fracture analysis:</strong> Examining fracture surfaces to understand failure mechanisms</li>
                <li><strong>Root cause identification:</strong> Determining whether failure was due to material defects, 
                processing issues, or service conditions</li>
                <li><strong>Prevention strategies:</strong> Using failure analysis to prevent future failures</li>
                <li><strong>Legal and insurance:</strong> Providing evidence in failure investigations</li>
              </ul>

              <h3>Research and Development</h3>
              <p>
                Metallography is essential in materials research:
              </p>
              <ul>
                <li><strong>Alloy development:</strong> Characterizing new alloys and understanding structure-property 
                relationships</li>
                <li><strong>Process optimization:</strong> Determining optimal processing conditions for desired 
                microstructures</li>
                <li><strong>Fundamental studies:</strong> Researching phase transformations, grain growth, and other 
                microstructural phenomena</li>
                <li><strong>Material selection:</strong> Comparing different materials for specific applications</li>
              </ul>

              <h3>Industry-Specific Applications</h3>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Aerospace</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>Titanium and superalloy characterization</li>
                    <li>Coating and surface treatment analysis</li>
                    <li>Fatigue and creep damage assessment</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Automotive</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>Steel and aluminum processing verification</li>
                    <li>Heat treatment validation</li>
                    <li>Weld quality assessment</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Medical Devices</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>Implant material characterization</li>
                    <li>Biocompatibility studies</li>
                    <li>Surface finish verification</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Energy</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>Power plant material analysis</li>
                    <li>Pipeline and pressure vessel inspection</li>
                    <li>Corrosion and degradation studies</li>
                  </ul>
                    </div>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Versatility:</strong> While metallography is often associated with metals, the same 
                      principles apply to ceramics, composites, and other materials. The goal is always to understand 
                      structure-property relationships.
                    </p>
                  </div>
                </AnimateOnScroll>
            </section>

            <section id="standards-practices" className="scroll-mt-24">
              <h2>Standards and Best Practices</h2>
              <p>
                Metallography is guided by established standards and best practices that ensure consistency, 
                reproducibility, and quality. Following these standards is essential for reliable results and 
                industry acceptance of your work.
              </p>

              <h3>ASTM Standards</h3>
              <p>
                The American Society for Testing and Materials (ASTM) publishes numerous standards relevant to 
                metallography. ASTM Committee E-4 on Metallography, formed in 1916, has developed over 40 standards 
                that guide metallographic practice. These standards are widely used in the United States and have 
                influenced international standardization efforts. Key standards include:
              </p>

                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Standard</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E3</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Guide for Preparation of Metallographic Specimens</td>
                      <td className="border border-gray-300 px-4 py-3">General procedures for sample preparation including sectioning, mounting, grinding, polishing, and etching.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E407</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Practice for Microetching Metals and Alloys</td>
                      <td className="border border-gray-300 px-4 py-3">Procedures and reagents for etching various metals and alloys to reveal microstructure.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E112</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Methods for Determining Average Grain Size</td>
                      <td className="border border-gray-300 px-4 py-3">Methods for measuring and reporting grain size, including comparison charts and intercept methods.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E883</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Guide for Reflected-Light Photomicrography</td>
                      <td className="border border-gray-300 px-4 py-3">Guidelines for capturing high-quality photomicrographs for documentation and analysis.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E1245</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Practice for Determining the Inclusion or Second-Phase Constituent Content of Metals</td>
                      <td className="border border-gray-300 px-4 py-3">Methods for quantifying non-metallic inclusions and second-phase particles.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E1382</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Methods for Determining Average Grain Size Using Semiautomatic and Automatic Image Analysis</td>
                      <td className="border border-gray-300 px-4 py-3">Computer-based methods for grain size measurement using image analysis software.</td>
                    </tr>
                      </tbody>
                    </table>
                  </div>
                </AnimateOnScroll>

                <h3>ISO Standards</h3>
              <p>
                The International Organization for Standardization (ISO) also publishes standards for metallography, 
                particularly for international trade and certification:
              </p>
              <ul>
                <li><strong>ISO 643:</strong> Steels: Micrographic determination of the apparent grain size</li>
                <li><strong>ISO 4499:</strong> Hardmetals: Metallographic determination of microstructure</li>
                <li><strong>ISO 4967:</strong> Steel: Determination of content of non-metallic inclusions - Micrographic method using standard diagrams</li>
                <li><strong>ISO 14250:</strong> Steel: Metallographic characterization of duplex grain size and distributions</li>
              </ul>

              <h3>Safety Considerations</h3>
              <p>
                Metallography involves working with chemicals, equipment, and potentially hazardous materials. 
                Safety must always be a priority:
              </p>

                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                    <h4 className="font-semibold mb-2">Chemical Safety</h4>
                    <ul className="text-sm space-y-1 text-gray-700 list-disc list-inside">
                      <li>Always read Safety Data Sheets (SDS) for all chemicals before use</li>
                      <li>Use appropriate personal protective equipment (gloves, eye protection, lab coat)</li>
                      <li>Work in well-ventilated areas, preferably in a fume hood when using etchants</li>
                      <li>Store chemicals properly and label all containers clearly</li>
                      <li>Dispose of chemical waste according to local regulations</li>
                      <li>Never mix chemicals unless you know the reaction products are safe</li>
                    </ul>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fadeInUp" delay={200}>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                    <h4 className="font-semibold mb-2">Equipment Safety</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>Follow manufacturer instructions for all equipment</li>
                      <li>Use proper guards and safety features on cutting and grinding equipment</li>
                      <li>Secure samples properly to prevent movement during cutting or grinding</li>
                      <li>Be aware of rotating equipment and moving parts</li>
                      <li>Keep work areas clean and organized to prevent accidents</li>
                      <li>Use appropriate eye protection when operating any equipment</li>
                    </ul>
                  </div>
                </AnimateOnScroll>

              <h3>Best Practices for Quality Results</h3>
              <ul>
                <li><strong>Documentation:</strong> Record all preparation parameters (grit sizes, times, pressures, 
                etchants, etching times) for reproducibility</li>
                <li><strong>Consistency:</strong> Follow standardized procedures to ensure consistent results</li>
                <li><strong>Cleanliness:</strong> Keep equipment and work areas clean to prevent contamination</li>
                <li><strong>Calibration:</strong> Regularly calibrate equipment (microscopes, hardness testers, etc.)</li>
                <li><strong>Reference samples:</strong> Maintain reference samples of known quality for comparison</li>
                <li><strong>Training:</strong> Ensure operators are properly trained in techniques and safety</li>
                <li><strong>Quality control:</strong> Establish quality control procedures and checkpoints</li>
              </ul>

                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Standards Compliance:</strong> When working to meet specific standards or certifications, 
                      ensure you have the current version of relevant standards and follow them precisely. Standards are 
                      regularly updated, so check for revisions.
                    </p>
                  </div>
                </AnimateOnScroll>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="preparation-process" className="scroll-mt-24">
                <h2>The Sample Preparation Process</h2>
              <p>
                Successful metallographic analysis depends on proper sample preparation. A poorly prepared sample 
                will not reveal the true microstructure, leading to incorrect conclusions. The preparation process 
                follows a logical sequence, with each step building on the previous one.
              </p>

              <h3>Overview of the Preparation Steps</h3>
              <p>
                The standard metallographic preparation process consists of five main steps:
              </p>

                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="space-y-6 my-6">
                    <div className="border-l-4 border-primary-600 pl-4">
                      <h4 className="text-lg font-semibold mb-2">1. Sectioning</h4>
                      <p className="text-gray-700">
                        Cutting a representative sample from the larger workpiece. The goal is to obtain a sample 
                        that represents the material or feature of interest while minimizing damage. Sectioning can 
                        be done using abrasive cutting or precision wafering, depending on the material and requirements.
                      </p>
                      <Link 
                        href="/guides/sectioning" 
                        className="text-primary-600 hover:underline font-semibold text-sm mt-2 inline-block"
                      >
                        Learn more about Sectioning →
                      </Link>
                    </div>

                    <div className="border-l-4 border-primary-600 pl-4">
                      <h4 className="text-lg font-semibold mb-2">2. Mounting</h4>
                      <p className="text-gray-700">
                        Embedding the sample in resin to create a standardized, easy-to-handle mount. Mounting protects 
                        edges, makes small samples manageable, and creates a uniform surface for grinding and polishing. 
                        Compression mounting and castable mounting are the two main methods.
                      </p>
                      <Link 
                        href="/guides/mounting" 
                        className="text-primary-600 hover:underline font-semibold text-sm mt-2 inline-block"
                      >
                        Learn more about Mounting →
                      </Link>
                    </div>

                    <div className="border-l-4 border-primary-600 pl-4">
                      <h4 className="text-lg font-semibold mb-2">3. Grinding</h4>
                      <p className="text-gray-700">
                        Removing surface damage from sectioning and creating a flat surface using progressively finer 
                        abrasives. Grinding typically progresses from coarse grits (e.g., 120 grit) to fine grits 
                        (e.g., 600 or 800 grit). Proper grinding removes damage while minimizing introduction of new 
                        damage.
                      </p>
                      <Link 
                        href="/guides/grinding-techniques" 
                        className="text-primary-600 hover:underline font-semibold text-sm mt-2 inline-block"
                      >
                        Learn more about Grinding Techniques →
                      </Link>
                    </div>

                    <div className="border-l-4 border-primary-600 pl-4">
                      <h4 className="text-lg font-semibold mb-2">4. Polishing</h4>
                      <p className="text-gray-700">
                        Creating a mirror-like surface free of scratches. Polishing uses fine abrasives (diamond 
                        pastes, suspensions, or oxide polishing compounds) on soft cloths. The goal is to remove all 
                        grinding scratches and create a surface suitable for microscopic examination.
                      </p>
                      <Link 
                        href="/guides/polishing-methods" 
                        className="text-primary-600 hover:underline font-semibold text-sm mt-2 inline-block"
                      >
                        Learn more about Polishing Methods →
                      </Link>
                    </div>

                    <div className="border-l-4 border-primary-600 pl-4">
                      <h4 className="text-lg font-semibold mb-2">5. Etching</h4>
                      <p className="text-gray-700">
                        Applying chemical reagents to reveal the microstructure. Etching selectively attacks different 
                        phases and grain boundaries, creating contrast that makes microstructural features visible 
                        under the microscope. Different materials require different etchants.
                      </p>
                      <Link 
                        href="/resources/common-etchants-guide" 
                        className="text-primary-600 hover:underline font-semibold text-sm mt-2 inline-block"
                      >
                        Learn more about Etching →
                      </Link>
                    </div>
                  </div>
                </AnimateOnScroll>

              <h3>Key Principles</h3>
              <p>
                Throughout the preparation process, several key principles apply:
              </p>
              <ul>
                <li><strong>Progressive refinement:</strong> Each step removes damage from the previous step while 
                introducing minimal new damage</li>
                <li><strong>Consistency:</strong> Using standardized procedures ensures reproducible results</li>
                <li><strong>Material-specific techniques:</strong> Different materials may require different approaches 
                (e.g., soft materials need gentler techniques to avoid smearing)</li>
                <li><strong>Quality at each step:</strong> Poor preparation at any step cannot be fully corrected later</li>
                <li><strong>Documentation:</strong> Recording preparation parameters helps troubleshoot issues and 
                reproduce results</li>
              </ul>

                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Important:</strong> Sample preparation is both an art and a science. While the steps are 
                      straightforward, achieving excellent results requires practice, attention to detail, and 
                      understanding of material-specific requirements. Each material may need slight variations in technique.
                    </p>
                  </div>
                </AnimateOnScroll>

                <h3>Common Problems and Solutions</h3>
              <p>
                New metallographers often encounter specific problems during preparation. Understanding these issues 
                and their solutions helps you achieve better results:
              </p>

                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Problem</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Common Causes</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Solutions</th>
                        </tr>
                      </thead>
                      <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Scratches remaining after polishing</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Incomplete grinding steps</li>
                          <li>Skipping grit sizes</li>
                          <li>Insufficient polishing time</li>
                          <li>Contaminated polishing cloth</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Complete all grinding steps thoroughly</li>
                          <li>Don't skip intermediate grit sizes</li>
                          <li>Increase polishing time</li>
                          <li>Clean or replace polishing cloths</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Edge rounding</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Excessive pressure during grinding/polishing</li>
                          <li>Soft materials</li>
                          <li>Insufficient edge retention in mount</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Use lighter pressure, especially on soft materials</li>
                          <li>Use harder mounting resins</li>
                          <li>Consider edge protection techniques</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Relief (height differences between phases)</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Different phases polish at different rates</li>
                          <li>Hard and soft phases together</li>
                          <li>Excessive polishing pressure</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Use lighter polishing pressure</li>
                          <li>Reduce polishing time</li>
                          <li>Use DIC microscopy to visualize relief</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Embedded abrasives</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Insufficient cleaning between steps</li>
                          <li>Using wrong abrasive for material</li>
                          <li>Contaminated polishing media</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Thoroughly clean samples between steps</li>
                          <li>Use appropriate abrasives for material</li>
                          <li>Keep polishing media clean</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Over-etching</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Etching time too long</li>
                          <li>Etchant too concentrated</li>
                          <li>Sample temperature too high</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Reduce etching time</li>
                          <li>Dilute etchant</li>
                          <li>Use fresh etchant</li>
                          <li>Start with shorter times and increase if needed</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Under-etching</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Etching time too short</li>
                          <li>Etchant too weak or old</li>
                          <li>Sample not properly polished</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Increase etching time</li>
                          <li>Use fresh, properly prepared etchant</li>
                          <li>Ensure sample is properly polished</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Contamination</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Cross-contamination between samples</li>
                          <li>Dirty equipment</li>
                          <li>Improper cleaning</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Clean equipment between samples</li>
                          <li>Use separate equipment for different materials when needed</li>
                          <li>Thorough cleaning procedures</li>
                        </ul>
                      </td>
                    </tr>
                      </tbody>
                    </table>
                  </div>
                </AnimateOnScroll>

                <p className="mt-4">
                  These challenges are normal and improve with experience. Our <Link 
                  href="/resources/troubleshooting-guide" 
                  className="text-primary-600 hover:underline font-semibold"
                >Troubleshooting Guide</Link> provides more detailed solutions to common problems.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="microscopy-techniques" className="scroll-mt-24">
                <h2>Microscopy Techniques</h2>
              <p>
                Once a sample is properly prepared, various microscopy techniques can be used to examine and analyze 
                the microstructure. Each technique has specific advantages and applications. Understanding these 
                techniques helps you select the appropriate method for your analysis needs.
              </p>
              <p className="mt-4">
                For comprehensive information on preparing samples for microscopy, choosing the right microscope, 
                detailed microscopy methods, and interpreting common microstructures, see our complete guide on 
                <Link href="/guides/microstructural-analysis" className="text-primary-600 hover:underline font-semibold"> Microstructural Analysis</Link>.
              </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Quick Overview:</strong> Most routine metallographic analysis uses optical (metallurgical) 
                      microscopes with reflected light illumination. For higher magnification needs or fracture surface 
                      examination, scanning electron microscopy (SEM) is used. Advanced techniques like EBSD and TEM 
                      provide specialized information for research applications.
                    </p>
                  </div>
                </AnimateOnScroll>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="getting-started" className="scroll-mt-24">
                <h2>Getting Started</h2>
              <p>
                If you're new to metallography, here's a practical path to get started:
              </p>

              <h3>1. Learn the Fundamentals</h3>
              <p>
                Start with understanding the basics:
              </p>
              <ul>
                <li>Read this guide and understand what metallography is and why it matters</li>
                <li>Familiarize yourself with basic terminology (grains, phases, microstructure) - see our <Link href="/glossary" className="text-primary-600 hover:underline font-semibold">Glossary</Link> for definitions</li>
                <li>Understand the relationship between structure and properties</li>
                <li>Learn about the preparation process overview</li>
                <li>Review <Link href="/guides/equipment-overview" className="text-primary-600 hover:underline font-semibold">
                  Equipment Overview</Link> to understand what equipment you'll need</li>
                <li>Study <Link href="/guides/safety-fundamentals" className="text-primary-600 hover:underline font-semibold">
                  Safety Fundamentals</Link> before working in the laboratory</li>
                <li>Read <Link href="/guides/common-misconceptions" className="text-primary-600 hover:underline font-semibold">
                  Common Misconceptions</Link> to avoid beginner mistakes</li>
              </ul>

              <h3>2. Study the Preparation Process</h3>
              <p>
                Work through the process guides in order:
              </p>
              <ol>
                <li><Link href="/guides/sectioning" className="text-primary-600 hover:underline font-semibold">
                  Sectioning</Link> - Learn how to cut samples properly</li>
                <li><Link href="/guides/mounting" className="text-primary-600 hover:underline font-semibold">
                  Mounting</Link> - Understand mounting methods and when to use each</li>
                <li><Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  Grinding Techniques</Link> - Master progressive grinding</li>
                <li><Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  Polishing Methods</Link> - Learn to create scratch-free surfaces</li>
                <li>Etching - Study material-specific etching requirements (see <Link 
                  href="/resources/common-etchants-guide" className="text-primary-600 hover:underline font-semibold">
                  Common Etchants Guide</Link>)</li>
              </ol>

              <h3>3. Practice with Your Materials</h3>
              <p>
                Once you understand the basics:
              </p>
              <ul>
                <li>Start with simple, common materials (e.g., carbon steel, aluminum)</li>
                <li>Follow material-specific guides for your materials of interest</li>
                <li>Practice the preparation steps and refine your technique</li>
                <li>Compare your results with reference microstructures</li>
              </ul>

              <h3>4. Use Available Resources</h3>
              <p>
                Take advantage of the resources available:
              </p>
              <ul>
                <li><Link href="/glossary" className="text-primary-600 hover:underline font-semibold">
                  Glossary</Link> - Look up technical terms and definitions</li>
                <li><Link href="/resources/checklist" className="text-primary-600 hover:underline font-semibold">
                  Preparation Checklist</Link> - Use checklists to ensure you don't miss steps</li>
                <li><Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  Troubleshooting Guide</Link> - Reference when you encounter problems</li>
                <li><Link href="/tools/etchant-selector" className="text-primary-600 hover:underline font-semibold">
                  Etchant Selector</Link> - Find the right etchant for your material</li>
                <li>Material-specific guides for detailed procedures</li>
              </ul>

              <h3>5. Build Experience</h3>
              <p>
                Metallography improves with practice:
              </p>
              <ul>
                <li>Prepare multiple samples to build consistency</li>
                <li>Document your procedures and results</li>
                <li>Learn from mistakes and refine your technique</li>
                <li>Seek feedback from experienced metallographers</li>
                <li>Compare your results with published microstructures</li>
              </ul>

                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                    <h3 className="text-lg font-semibold mb-3">Recommended Learning Path</h3>
                    <ol className="space-y-2 text-sm">
                      <li><strong>Start here:</strong> Read this introduction to understand the fundamentals</li>
                      <li><strong>Basics guides:</strong> Review <Link href="/guides/equipment-overview" className="text-primary-600 hover:underline">Equipment Overview</Link>, <Link href="/guides/safety-fundamentals" className="text-primary-600 hover:underline">Safety Fundamentals</Link>, and <Link href="/guides/common-misconceptions" className="text-primary-600 hover:underline">Common Misconceptions</Link></li>
                      <li><strong>Process guides:</strong> Study sectioning, mounting, grinding, and polishing guides</li>
                      <li><strong>Material guides:</strong> Find material-specific guides for your materials</li>
                      <li><strong>Practice:</strong> Prepare samples and refine your technique</li>
                      <li><strong>Advanced topics:</strong> Explore application-specific guides and advanced techniques</li>
                    </ol>
                  </div>
                </AnimateOnScroll>

              <h3>Next Steps</h3>
              <p>
                Now that you understand the fundamentals of metallography, you're ready to dive deeper:
              </p>
              <ul>
                <li>Explore the <Link href="/guides" className="text-primary-600 hover:underline font-semibold">
                  complete guides library</Link> for detailed information on each preparation step</li>
                <li>Check out <Link href="/resources" className="text-primary-600 hover:underline font-semibold">
                  resources</Link> for checklists, charts, and troubleshooting help</li>
                <li>Reference the <Link href="/glossary" className="text-primary-600 hover:underline font-semibold">
                  glossary</Link> when you encounter unfamiliar terms</li>
                <li>Use our <Link href="/tools" className="text-primary-600 hover:underline font-semibold">
                  tools</Link> to help with etchant selection, grit size conversion, and more</li>
                <li>Consider material-specific guides if you're working with particular materials</li>
              </ul>

              <p className="mt-4">
                Remember: metallography is a skill that develops with practice. Don't be discouraged if your 
                first samples aren't perfect. Each sample you prepare teaches you something new, and with time 
                and experience, you'll develop the expertise to prepare excellent samples consistently.
              </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="further-reading" className="scroll-mt-24">
                <h2>Further Reading and Resources</h2>
              <p>
                This introduction provides a foundation, but metallography is a deep field with extensive literature. 
                The following resources offer more detailed information for those who want to dive deeper.
              </p>

              <h3>Essential Books</h3>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="space-y-4 my-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">ASM Handbook, Volume 9: Metallography and Microstructures</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Comprehensive reference covering all aspects of metallography. Includes detailed procedures, 
                        microstructural interpretation, and material-specific information. Essential reference for any 
                        metallography laboratory.
                      </p>
                      <p className="text-xs text-gray-600">
                        Published by ASM International. Regularly updated with new editions.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Metallography: Principles and Practice by George F. Vander Voort</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Comprehensive textbook covering sample preparation, microscopy, and microstructural interpretation. 
                        Excellent for both beginners and experienced metallographers. Includes extensive information on 
                        etching and material-specific techniques.
                      </p>
                      <p className="text-xs text-gray-600">
                        Published by ASM International. Considered one of the definitive texts on metallography.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Practical Metallography by L.E. Samuels</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Practical guide focusing on sample preparation techniques. Excellent for understanding the 
                        "how-to" aspects of metallography with detailed procedures and troubleshooting.
                      </p>
                      <p className="text-xs text-gray-600">
                        Published by ASM International. Strong emphasis on practical techniques.
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>

              <h3>Industry Resources</h3>
              <p>
                Equipment and consumable manufacturers provide valuable application notes and technical resources:
              </p>
              <ul>
                <li><strong><a href="https://www.buehler.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Buehler</a>:</strong> Technical guides, application notes, and educational resources covering metallographic preparation techniques.</li>
                <li><strong><a href="https://www.leco.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">LECO</a>:</strong> Technical resources and application notes on metallographic equipment and preparation methods.</li>
                <li><strong><a href="https://metallographic.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">PACE Technologies</a>:</strong> Application notes and guides on sample preparation techniques and material-specific procedures.</li>
                <li><strong><a href="https://www.qatm.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">QATM</a>:</strong> Technical documentation and application guides on sample preparation equipment and techniques.</li>
                <li><strong><a href="https://www.struers.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Struers</a>:</strong> Application notes and technical guides on sample preparation for various materials. Comprehensive online resources and literature.</li>
              </ul>
              <p className="text-sm text-gray-600 italic mt-4">
                <strong>Note:</strong> Metallography.org is supported by PACE Technologies. You may notice links to PACE Technologies products throughout our guides.
              </p>

              <h3>Professional Organizations</h3>
              <ul>
                <li><strong>ASM International:</strong> Leading materials science organization. Publishes standards, 
                handbooks, and technical journals. Offers courses and conferences on metallography.</li>
                <li><strong>International Metallographic Society (IMS):</strong> Organization dedicated to metallography. 
                Hosts annual conferences and provides networking opportunities.</li>
                <li><strong>ASTM International:</strong> Develops and publishes standards used in metallography. 
                ASTM Committee E-4 on Metallography, established in 1916, has been instrumental in standardizing 
                metallographic practices. Access to standards and technical committees.</li>
              </ul>

              <h3>Online Resources</h3>
              <ul>
                <li><strong>Metallography.org:</strong> This website provides comprehensive guides, resources, and tools 
                for metallographic sample preparation.</li>
                <li><strong>Materials Science Journals:</strong> Journals like Metallurgical and Materials Transactions, 
                Materials Science and Engineering, and others publish research on microstructural analysis.</li>
                <li><strong>University Resources:</strong> Many universities provide online resources, course materials, 
                and educational content on metallography.</li>
              </ul>

              <h3>Continuing Education</h3>
              <p>
                Metallography is a skill that benefits from continuous learning:
              </p>
              <ul>
                <li><strong>Workshops and Courses:</strong> Many organizations offer hands-on workshops and courses on 
                metallographic techniques</li>
                <li><strong>Conferences:</strong> Attend metallography and materials science conferences to learn about 
                new techniques and network with other professionals, including the <a href="https://www.asminternational.org/ims" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">International Metallographic Society (IMS) Annual Conference</a>, 
                <a href="https://www.tms.org/MST/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Materials Science & Technology (MS&T)</a>, 
                <a href="https://www.tms.org/annual-meeting" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">TMS Annual Meeting</a>, and 
                <a href="https://www.asminternational.org/events" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">ASM International events</a></li>
                <li><strong>Webinars:</strong> Online webinars from equipment manufacturers and professional organizations</li>
                <li><strong>Certification Programs:</strong> Some organizations offer certification programs for 
                metallographers</li>
              </ul>

                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Building Your Library:</strong> Start with Vander Voort's "Metallography: Principles and 
                      Practice" and the ASM Handbook Volume 9. These two resources will cover most of your needs. Add 
                      specialized references as you work with specific materials or techniques.
                    </p>
                  </div>
                </AnimateOnScroll>
              </section>
            </AnimateOnScroll>

            {/* CTA Section */}
            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Continue Your Learning</h2>
              <p className="mb-4">
                Ready to learn more? Explore our comprehensive guides on sample preparation techniques, or use 
                our tools and resources to support your metallographic work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides/sectioning"
                  className="btn-primary text-center"
                >
                  Start with Sectioning Guide
                </Link>
                <Link 
                  href="/guides"
                  className="btn-secondary text-center"
                >
                  Browse All Guides
                </Link>
                <Link 
                  href="/resources"
                  className="btn-secondary text-center"
                >
                  View Resources
                </Link>
              </div>
              </div>
            </AnimateOnScroll>

            {/* Related Guides */}
            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/purpose-and-applications" className="text-primary-600 hover:underline font-semibold">
                  → Purpose and Applications
                </Link>
                <Link href="/guides/history-of-metallography" className="text-primary-600 hover:underline font-semibold">
                  → History of Metallography
                </Link>
                <Link href="/guides/equipment-overview" className="text-primary-600 hover:underline font-semibold">
                  → Equipment Overview
                </Link>
                <Link href="/guides/safety-fundamentals" className="text-primary-600 hover:underline font-semibold">
                  → Safety Fundamentals
                </Link>
                <Link href="/guides/common-misconceptions" className="text-primary-600 hover:underline font-semibold">
                  → Common Misconceptions
                </Link>
                <Link href="/guides/sectioning" className="text-primary-600 hover:underline font-semibold">
                  → Sectioning
                </Link>
                <Link href="/guides/mounting" className="text-primary-600 hover:underline font-semibold">
                  → Mounting
                </Link>
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
              </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
      </article>
    </>
  )
}

