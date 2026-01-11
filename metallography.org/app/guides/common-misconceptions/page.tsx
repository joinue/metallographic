import { Metadata } from 'next'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('common-misconceptions')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'preparation-misconceptions', label: 'Sample Preparation Misconceptions' },
  { id: 'technique-misconceptions', label: 'Technique Misconceptions' },
  { id: 'interpretation-misconceptions', label: 'Microstructure Interpretation' },
  { id: 'equipment-misconceptions', label: 'Equipment Misconceptions' },
  { id: 'time-quality', label: 'Time and Quality Misconceptions' },
  { id: 'best-practices', label: 'Avoiding Common Mistakes' },
]

export default function CommonMisconceptionsGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Common Misconceptions
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Basics Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Common Misconceptions in Metallography</h1>
            <p className="text-xl text-gray-600">
              Learn about common mistakes and misconceptions beginners make in metallography. Understanding these 
              pitfalls helps you avoid them and develop better metallographic practices from the start.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#preparation-misconceptions" className="text-primary-600 hover:underline">Sample Preparation Misconceptions</a></li>
              <li><a href="#technique-misconceptions" className="text-primary-600 hover:underline">Technique Misconceptions</a></li>
              <li><a href="#interpretation-misconceptions" className="text-primary-600 hover:underline">Microstructure Interpretation</a></li>
              <li><a href="#equipment-misconceptions" className="text-primary-600 hover:underline">Equipment Misconceptions</a></li>
              <li><a href="#time-quality" className="text-primary-600 hover:underline">Time and Quality Misconceptions</a></li>
              <li><a href="#best-practices" className="text-primary-600 hover:underline">Avoiding Common Mistakes</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Every metallographer makes mistakes, especially when starting out. However, many common mistakes stem 
                from misconceptions about how metallography works. Understanding these misconceptions helps you avoid 
                them and develop better practices from the beginning.
              </p>
              <p>
                This guide addresses common misconceptions that beginners often encounter. By learning what not to do 
                and why, you can save time, avoid frustration, and produce better results more quickly.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Remember:</strong> Making mistakes is part of learning. The goal isn't to never make mistakes, 
                  but to learn from them and avoid repeating the same ones. Even experienced metallographers continue 
                  to learn and refine their techniques.
                </p>
              </div>
            </section>

            <section id="preparation-misconceptions" className="scroll-mt-24">
              <h2>Sample Preparation Misconceptions</h2>
              <p>
                Many misconceptions relate to sample preparation, which is the foundation of good metallography. 
                Understanding these helps you prepare better samples.
              </p>

              <h3>Misconception: "I can skip grinding steps if I'm careful"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Skipping grinding steps always causes problems.
                </p>
                <p className="text-sm text-gray-700">
                  Each grinding step removes damage from the previous step. If you skip steps (e.g., going from 240 
                  grit directly to 600 grit), you'll never fully remove the deeper scratches from the coarser grit. 
                  These scratches will persist through polishing and appear in your final microstructure. The progressive 
                  refinement process is essential: each step builds on the previous one. As a general rule, grit sizes 
                  should not increase by more than a factor of 2-2.5 between steps (e.g., 240 → 400 → 600 → 800).
                </p>
              </div>

              <h3>Misconception: "More pressure = faster preparation"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Excessive pressure causes more problems than it solves.
                </p>
                <p className="text-sm text-gray-700">
                  Too much pressure can cause: edge rounding, relief between phases, embedded abrasives, sample damage, 
                  and inconsistent results. Moderate, consistent pressure is more effective. Let the abrasive do the 
                  work. Pressure should be sufficient to maintain contact but not so high that you're forcing the process. 
                  For manual preparation, typical pressures range from 2-5 pounds per square inch, depending on material 
                  hardness and preparation stage. Automated systems use controlled force settings that account for sample 
                  area and material properties.
                </p>
              </div>

              <h3>Misconception: "I can fix preparation problems during polishing"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Polishing cannot fix grinding problems.
                </p>
                <p className="text-sm text-gray-700">
                  If you have deep scratches, embedded abrasives, or other damage from grinding, polishing won't remove 
                  them. You'll waste time trying to polish out problems that should have been fixed during grinding. 
                  The rule is: fix problems at the step where they occur. Don't move to the next step until the current 
                  step is complete.
                </p>
              </div>

              <h3>Misconception: "All materials prepare the same way"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Different materials require different techniques.
                </p>
                <p className="text-sm text-gray-700">
                  Soft materials (aluminum, copper) require gentler techniques to avoid smearing. Hard materials (hardened 
                  steel, ceramics) may need different abrasives or longer times. Brittle materials need careful handling. 
                  Always consider material properties when preparing samples. What works for steel may not work for aluminum.
                </p>
              </div>

              <h3>Misconception: "Mounting is optional for large samples"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Mounting provides benefits beyond just handling.
                </p>
                <p className="text-sm text-gray-700">
                  Even large samples benefit from mounting. Mounting protects edges, provides consistent surface height, 
                  makes handling easier, and allows for better edge retention. Edge effects are important in many analyses, 
                  and mounting helps preserve edges during preparation.
                </p>
              </div>

              <h3>Misconception: "Any cut is fine for sectioning"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Poor sectioning creates damage that's difficult to remove.
                </p>
                <p className="text-sm text-gray-700">
                  Sectioning with excessive speed, pressure, or inadequate cooling can introduce deep thermal damage, 
                  deformation, and microstructural changes that may extend hundreds of micrometers into the sample. 
                  This damage can be extremely difficult or impossible to remove completely during grinding. Proper 
                  sectioning with appropriate blade selection, cutting parameters, and cooling is essential for 
                  successful preparation.
                </p>
              </div>

              <h3>Misconception: "Sample orientation doesn't matter"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Orientation is critical for meaningful analysis.
                </p>
                <p className="text-sm text-gray-700">
                  The orientation of your section determines what microstructural features you can observe. Longitudinal 
                  sections reveal grain elongation, flow lines, and directional features. Transverse sections show 
                  cross-sections of these features. For many analyses (welds, coatings, heat-affected zones, etc.), 
                  specific orientations are required. Always plan your sectioning based on what you need to analyze.
                </p>
              </div>
            </section>

            <section id="technique-misconceptions" className="scroll-mt-24">
              <h2>Technique Misconceptions</h2>
              <p>
                Misconceptions about technique can lead to poor results and wasted time. Understanding proper technique 
                is essential.
              </p>

              <h3>Misconception: "I should polish until the surface is perfect"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Over-polishing causes problems.
                </p>
                <p className="text-sm text-gray-700">
                  Excessive polishing can cause: relief between phases (hard phases stand proud, soft phases are recessed), 
                  edge rounding, removal of important surface features, and wasted time. Polish until scratches are removed 
                  and the surface is suitable for etching, not until it's perfect. Some materials actually need less polishing 
                  than others.
                </p>
              </div>

              <h3>Misconception: "Longer etching time = better contrast"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Over-etching destroys microstructures.
                </p>
                <p className="text-sm text-gray-700">
                  Too much etching can: obscure fine details, create artifacts, make structures look different than they 
                  actually are, and damage the sample surface. Start with shorter times and increase if needed. Different 
                  materials and etchants require vastly different times—some need only 5-10 seconds (e.g., Nital on carbon 
                  steel), while others may need several minutes. Over-etching can make grain boundaries appear thicker than 
                  they are, obscure fine precipitates, or create false contrast. Follow recommended procedures and adjust 
                  based on results, but err on the side of shorter times initially.
                </p>
              </div>

              <h3>Misconception: "I can reuse polishing cloths indefinitely"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Worn cloths cause contamination and poor results.
                </p>
                <p className="text-sm text-gray-700">
                  Polishing cloths wear out and become contaminated. Worn cloths can: embed particles in samples, cause 
                  inconsistent polishing, introduce contamination, and waste time. Replace cloths regularly. Clean cloths 
                  between uses, but replace them when they show signs of wear or contamination.
                </p>
              </div>

              <h3>Misconception: "Cleaning between steps is optional"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Proper cleaning is essential.
                </p>
                <p className="text-sm text-gray-700">
                  Inadequate cleaning causes: cross-contamination between steps, embedded abrasives from previous steps, 
                  contamination between samples, and poor results. Thoroughly clean samples between each step. Use appropriate 
                  cleaning methods (water, solvents, ultrasonic cleaning) depending on the step and material.
                </p>
              </div>

              <h3>Misconception: "I can use any etchant for any material"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Etchants are material-specific.
                </p>
                <p className="text-sm text-gray-700">
                  Different materials require different etchants to reveal their microstructures. Using the wrong etchant 
                  may: reveal nothing, create artifacts, damage the sample, or show incorrect structures. Always use the 
                  appropriate etchant for your material. Consult etchant guides and material-specific procedures.
                </p>
              </div>

              <h3>Misconception: "All etchants are applied the same way"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Application method affects etching results.
                </p>
                <p className="text-sm text-gray-700">
                  Some etchants work best with swabbing (gentle rubbing), others require immersion, and some need 
                  electrolytic application. The method affects etching uniformity, time, and results. Swabbing can 
                  create uneven etching if not done properly, while immersion provides more uniform results but may 
                  require longer times. Follow recommended application methods for each etchant.
                </p>
              </div>

              <h3>Misconception: "I don't need to understand the material before preparing it"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Material knowledge guides preparation strategy.
                </p>
                <p className="text-sm text-gray-700">
                  Understanding material properties (hardness, ductility, thermal sensitivity, phase composition) helps 
                  you select appropriate preparation methods. Hard materials may need different abrasives than soft ones. 
                  Thermally sensitive materials require careful sectioning and grinding to avoid microstructural changes. 
                  Knowing expected phases helps with etchant selection and interpretation. Always gather material 
                  information before starting preparation.
                </p>
              </div>
            </section>

            <section id="interpretation-misconceptions" className="scroll-mt-24">
              <h2>Microstructure Interpretation Misconceptions</h2>
              <p>
                Misinterpreting microstructures is common among beginners. Understanding what you're actually seeing is 
                crucial for accurate analysis.
              </p>

              <h3>Misconception: "What I see is always the true microstructure"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Preparation artifacts can look like real features.
                </p>
                <p className="text-sm text-gray-700">
                  Scratches, contamination, relief, smearing, and other preparation artifacts can be mistaken for real 
                  microstructural features. Always consider whether what you're seeing could be a preparation artifact. 
                  Compare with reference microstructures. If something looks unusual, it might be an artifact rather than 
                  a real feature. However, don't assume everything unusual is an artifact—some real microstructural 
                  features can be unexpected.
                </p>
              </div>

              <h3>Misconception: "Darker areas are always harder phases"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Etching response determines appearance, not just hardness.
                </p>
                <p className="text-sm text-gray-700">
                  In etched microstructures, darker areas are those that etch more readily, not necessarily harder phases. 
                  Etching response depends on: chemical composition, crystal structure, orientation, and etchant used. 
                  Hard phases can appear light or dark depending on the etchant. Don't assume hardness from appearance alone.
                </p>
              </div>

              <h3>Misconception: "One magnification is enough"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Different features require different magnifications.
                </p>
                <p className="text-sm text-gray-700">
                  Grain size analysis might need 100x, while fine precipitates need 500x or 1000x. Large-scale features 
                  might need 50x. Always examine samples at multiple magnifications. Start low to get an overview, then 
                  increase magnification to examine specific features. Different analyses require different magnifications.
                </p>
              </div>

              <h3>Misconception: "If I can't see it, it's not there"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Some features require specific techniques to see.
                </p>
                <p className="text-sm text-gray-700">
                  Fine features, certain phases, or specific structures may not be visible with standard brightfield 
                  illumination. You might need: different illumination (darkfield, DIC, polarized light), different 
                  etchants, higher magnification, or different preparation techniques. Don't assume absence just because 
                  you can't see something with one technique. Some features are below the resolution limit of optical 
                  microscopy and require electron microscopy.
                </p>
              </div>

              <h3>Misconception: "One sample is enough to characterize a material"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Microstructures can vary significantly within a material.
                </p>
                <p className="text-gray-700">
                  A single sample may not be representative of the entire material. Microstructures can vary due to: 
                  location within the part (surface vs. interior, different regions), processing history (heat treatment 
                  variations, cooling rates), and inherent material variability. For meaningful characterization, examine 
                  multiple samples from different locations and orientations. Statistical analysis often requires multiple 
                  samples.
                </p>
              </div>
            </section>

            <section id="equipment-misconceptions" className="scroll-mt-24">
              <h2>Equipment Misconceptions</h2>
              <p>
                Misconceptions about equipment can lead to poor equipment choices or improper use.
              </p>

              <h3>Misconception: "Expensive equipment = better results"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Technique matters more than equipment cost.
                </p>
                <p className="text-sm text-gray-700">
                  An experienced metallographer can produce excellent results with basic equipment. Expensive equipment 
                  can make work easier and faster, but poor technique will still produce poor results regardless of 
                  equipment cost. Focus on learning proper technique first. Upgrade equipment as your needs and skills grow.
                </p>
              </div>

              <h3>Misconception: "Automated equipment eliminates the need for skill"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Automation requires understanding to use effectively.
                </p>
                <p className="text-sm text-gray-700">
                  Automated equipment still requires: understanding of preparation principles, proper program selection, 
                  material-specific adjustments, troubleshooting skills, and quality assessment. Automation makes work easier 
                  but doesn't eliminate the need for knowledge. You still need to understand what the equipment is doing 
                  and why.
                </p>
              </div>

              <h3>Misconception: "Any microscope will work"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Metallography requires specific microscope types.
                </p>
                <p className="text-sm text-gray-700">
                  Standard biological microscopes use transmitted light and won't work for opaque metallographic samples. 
                  You need a metallurgical microscope with reflected light illumination. Different illumination modes 
                  (brightfield, darkfield, DIC) provide different information. Choose equipment appropriate for your needs.
                </p>
              </div>
            </section>

            <section id="time-quality" className="scroll-mt-24">
              <h2>Time and Quality Misconceptions</h2>
              <p>
                Misconceptions about time and quality can lead to rushed work or unnecessary delays.
              </p>

              <h3>Misconception: "Faster is always better"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Rushing causes problems that take longer to fix.
                </p>
                <p className="text-sm text-gray-700">
                  Rushing through preparation steps leads to: incomplete damage removal, embedded abrasives, poor surface 
                  quality, and the need to start over. Taking the time to do each step properly is faster overall than 
                  rushing and having to redo work. Quality preparation takes time, but it's time well spent.
                </p>
              </div>

              <h3>Misconception: "I need perfect samples every time"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> "Good enough" depends on the analysis.
                </p>
                <p className="text-sm text-gray-700">
                  Different analyses have different quality requirements. Grain size measurement might need excellent 
                  preparation, while general microstructure examination might be fine with good preparation. Understand 
                  what quality level your analysis requires. Don't waste time perfecting samples beyond what's needed, but 
                  also don't accept poor quality when better is needed.
                </p>
              </div>

              <h3>Misconception: "I can learn everything from reading"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Metallography requires hands-on practice.
                </p>
                <p className="text-sm text-gray-700">
                  Reading guides and procedures is essential, but you can't learn metallography without practice. You 
                  need to: develop feel for pressure and technique, learn to recognize problems, understand material behavior, 
                  and build experience. Combine reading with practice. Learn from mistakes. Seek feedback from experienced 
                  metallographers.
                </p>
              </div>

              <h3>Misconception: "I don't need to document my procedures"</h3>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  <strong>Reality:</strong> Documentation is essential for reproducibility and troubleshooting.
                </p>
                <p className="text-sm text-gray-700">
                  Without documenting your preparation procedure (grit sequence, times, pressures, etchants, etc.), you 
                  cannot reproduce results or troubleshoot problems. Documentation helps you: identify what worked, avoid 
                  repeating mistakes, share procedures with others, and meet quality standards. Good documentation includes 
                  all parameters, any deviations from standard procedures, and observations at each step.
                </p>
              </div>
            </section>

            <section id="best-practices" className="scroll-mt-24">
              <h2>Avoiding Common Mistakes</h2>
              <p>
                Now that you understand common misconceptions, here are positive practices to help you avoid these mistakes.
              </p>

              <h3>Follow Procedures</h3>
              <ul>
                <li>Use established procedures as starting points</li>
                <li>Don't skip steps or take shortcuts</li>
                <li>Understand why each step is important</li>
                <li>Adapt procedures for your specific materials and needs</li>
              </ul>

              <h3>Be Patient</h3>
              <ul>
                <li>Allow adequate time for each step</li>
                <li>Don't rush through preparation</li>
                <li>Quality takes time: accept that</li>
                <li>Plan your work to avoid time pressure</li>
              </ul>

              <h3>Learn Continuously</h3>
              <ul>
                <li>Read guides and procedures</li>
                <li>Practice regularly</li>
                <li>Learn from mistakes</li>
                <li>Seek feedback and advice</li>
                <li>Compare your results with references</li>
              </ul>

              <h3>Pay Attention to Details</h3>
              <ul>
                <li>Check samples at each step</li>
                <li>Look for problems before they become bigger</li>
                <li>Clean thoroughly between steps</li>
                <li>Use appropriate materials and consumables</li>
                <li>Maintain equipment properly</li>
              </ul>

              <h3>Question Assumptions</h3>
              <ul>
                <li>If something seems wrong, investigate</li>
                <li>Don't assume you know what you're seeing</li>
                <li>Verify unusual observations</li>
                <li>Ask questions when unsure</li>
                <li>Compare with known good samples</li>
              </ul>

              <h3>Document Everything</h3>
              <ul>
                <li>Record all preparation parameters (grits, times, pressures)</li>
                <li>Note any deviations from standard procedures</li>
                <li>Document observations at each step</li>
                <li>Record etchant types, concentrations, and application methods</li>
                <li>Keep notes on what works and what doesn't for different materials</li>
              </ul>

              <h3>Understand Your Material</h3>
              <ul>
                <li>Research material properties before starting</li>
                <li>Know expected phases and microstructural features</li>
                <li>Understand thermal sensitivity and hardness</li>
                <li>Consult material-specific preparation guides</li>
                <li>Consider the analysis goals when planning preparation</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h3 className="text-lg font-semibold mb-3">The Learning Process</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Everyone makes mistakes when learning metallography. The key is to:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Recognize mistakes when they happen</li>
                  <li>• Understand why they occurred</li>
                  <li>• Learn how to avoid them in the future</li>
                  <li>• Don't repeat the same mistakes</li>
                  <li>• Share knowledge with others</li>
                </ul>
                <p className="text-sm text-gray-700 mt-3">
                  By understanding common misconceptions, you're already ahead. Now combine this knowledge with practice 
                  and patience to develop excellent metallographic skills.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
              <p className="mb-4">
                Now that you understand common misconceptions, continue learning proper techniques and best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides/sectioning"
                  className="btn-primary text-center"
                >
                  Learn Sectioning
                </Link>
                <Link 
                  href="/guides/safety-fundamentals"
                  className="btn-secondary text-center"
                >
                  Safety Fundamentals
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
                <Link href="/guides/safety-fundamentals" className="text-primary-600 hover:underline font-semibold">
                  → Safety Fundamentals
                </Link>
                <Link href="/guides/equipment-overview" className="text-primary-600 hover:underline font-semibold">
                  → Equipment Overview
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

