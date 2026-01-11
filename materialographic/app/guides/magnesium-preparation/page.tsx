import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import MaterialTooltip from '@/components/MaterialTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('magnesium-preparation')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'sectioning', label: 'Sectioning' },
  { id: 'mounting', label: 'Mounting' },
  { id: 'grinding', label: 'Grinding' },
  { id: 'polishing', label: 'Polishing' },
  { id: 'etching', label: 'Etching' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function MagnesiumGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Magnesium Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Magnesium Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing magnesium and magnesium alloy samples for metallographic analysis, 
              covering specialized techniques for handling reactive materials and preventing oxidation artifacts.
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
              <section id="introduction" className="scroll-mt-24">
                <h2>Introduction</h2>
                <p>
                  Magnesium and its alloys are among the most challenging materials to prepare for metallographic 
                  analysis due to their extreme reactivity. Magnesium is highly reactive with water and oxygen, 
                  making it prone to rapid oxidation and even fire hazards if not handled properly.
                </p>
                <p>
                  Common magnesium alloys include <MaterialTooltip materialName="AZ31">AZ31</MaterialTooltip>, <MaterialTooltip materialName="AZ91">AZ91</MaterialTooltip>, <MaterialTooltip materialName="AM60">AM60</MaterialTooltip>, and <MaterialTooltip materialName="WE43">WE43</MaterialTooltip>. These materials are used in aerospace, 
                  automotive, and electronics applications due to their light weight and good mechanical properties. 
                  While similar lightweight materials like <MaterialTooltip materialName="6061 Aluminum">6061 aluminum</MaterialTooltip> and <MaterialTooltip materialName="7075 Aluminum">7075 aluminum</MaterialTooltip> are also used in these applications, 
                  magnesium's extreme reactivity requires special handling throughout the entire preparation process.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                  <p className="text-sm text-red-900">
                    <strong>⚠️ CRITICAL SAFETY WARNING:</strong> Magnesium is highly flammable and can ignite 
                    when exposed to heat, sparks, or certain chemicals. Always have appropriate fire suppression 
                    equipment (Class D fire extinguisher) nearby. Never use water on magnesium fires. Work in a 
                    well-ventilated area and minimize exposure to moisture.
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Key Challenge:</strong> Magnesium oxidizes rapidly in the presence of water or oxygen. 
                    The entire preparation process must be designed to minimize exposure to moisture and prevent 
                    oxidation artifacts that can obscure the true microstructure.
                  </p>
                </div>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="sectioning" className="scroll-mt-24">
                <h2>Sectioning</h2>
                <p>
                  Sectioning magnesium requires careful attention to prevent heat generation and minimize exposure 
                  to water-based coolants. Magnesium's reactivity means that even small amounts of moisture can 
                  cause rapid oxidation.
                </p>
                
                <h3>Cutting Parameters</h3>
                <ul>
                  <li><strong>Cutting Speed:</strong> 100-200 RPM (slow to minimize heat generation)</li>
                  <li><strong>Blade Selection:</strong> MAX-E series blades (for soft non-ferrous materials) or fine-tooth saw blades</li>
                  <li><strong>Cooling:</strong> Use ethanol-based or oil-based cutting fluid - NEVER use water-based coolants</li>
                  <li><strong>Feed Rate:</strong> Slow, steady feed to avoid excessive heat</li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>Important:</strong> If water-based coolant must be used, immediately dry the sample 
                    thoroughly with ethanol and compressed air after cutting. However, ethanol-based or oil-based 
                    coolants are strongly preferred.
                  </p>
                </div>

                <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                  <ProductLink
                    productName="MAX-E Abrasive Blades"
                    href="https://shop.metallographic.com/collections/abrasive-blades"
                    description="MAX-E series blades designed for soft non-ferrous materials like magnesium. Thin blades minimize heat generation."
                  />
                </div>

                <h3>Best Practices</h3>
                <ul>
                  <li>Use thin blades (0.5-1.0 mm) to minimize heat generation</li>
                  <li>Apply ethanol-based or oil-based cutting fluid continuously</li>
                  <li>Immediately transfer cut sample to ethanol bath to prevent oxidation</li>
                  <li>Work quickly to minimize exposure time to air</li>
                  <li>Keep samples in a desiccator or ethanol when not actively working on them</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={100}>
              <section id="mounting" className="scroll-mt-24">
                <h2>Mounting</h2>
                <p>
                  Mounting magnesium samples requires careful preparation to prevent oxidation. The sample must be 
                  thoroughly dried and protected before mounting. Compression mounting is standard, but care must 
                  be taken with mounting temperatures.
                </p>

                <h3>Pre-Mounting Preparation</h3>
                <ol>
                  <li>Thoroughly clean the sample with ethanol to remove any cutting fluid or debris</li>
                  <li>Dry immediately with compressed air or warm air stream (low heat)</li>
                  <li>Store in desiccator or ethanol until ready to mount</li>
                  <li>Work quickly to minimize air exposure</li>
                </ol>

                <h3>Mounting Materials</h3>
                <ul>
                  <li><strong>Epoxy Resins:</strong> Preferred - lower curing temperature (150-180°C)</li>
                  <li><strong>Phenolic Resins:</strong> Acceptable but higher temperature may increase oxidation risk</li>
                  <li><strong>Mounting Pressure:</strong> 2000-4000 psi depending on resin type</li>
                  <li><strong>Temperature:</strong> Use lowest possible curing temperature</li>
                </ul>

                <h3>Mounting Procedure</h3>
                <ol>
                  <li>Remove sample from ethanol and dry quickly with compressed air</li>
                  <li>Place sample in mold immediately (minimize air exposure)</li>
                  <li>Add mounting compound and mount at recommended temperature and pressure</li>
                  <li>Allow to cool slowly to room temperature</li>
                  <li>Store mounted sample in desiccator if not proceeding immediately to grinding</li>
                </ol>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Tip:</strong> Consider mounting multiple samples at once to minimize handling and 
                    reduce total air exposure time. Work efficiently and have all materials ready before 
                    removing samples from protective storage.
                  </p>
                </div>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={150}>
              <section id="grinding" className="scroll-mt-24">
                <h2>Grinding</h2>
                <p>
                  Grinding magnesium requires the use of ethanol-based lubricants instead of water. Magnesium's 
                  extreme reactivity with water means that water-based grinding will cause immediate oxidation 
                  and obscure the microstructure.
                </p>

                <h3>Grinding Sequence</h3>
                <ol>
                  <li><strong>120 grit:</strong> Remove sectioning damage - 2-3 minutes per sample</li>
                  <li><strong>240 grit:</strong> Remove 120 grit scratches - 2-3 minutes</li>
                  <li><strong>400 grit:</strong> Further refinement - 2-3 minutes</li>
                  <li><strong>600 grit:</strong> Fine grinding - 2-3 minutes</li>
                  <li><strong>800 grit:</strong> Optional final grinding step - 2 minutes</li>
                </ol>

                <h3>Grinding Parameters</h3>
                <ul>
                  <li><strong>Lubricant:</strong> Ethanol or ethanol-based solution - NEVER use water</li>
                  <li><strong>Pressure:</strong> Light pressure (1-3 lbs per sample) - magnesium is soft</li>
                  <li><strong>Rotation:</strong> Rotate sample 90° between each grit</li>
                  <li><strong>Speed:</strong> 240-300 RPM for grinding wheels</li>
                  <li><strong>Lubricant Flow:</strong> Continuous flow of ethanol to remove debris</li>
                </ul>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                  <p className="text-sm text-red-900">
                    <strong>CRITICAL:</strong> Under no circumstances should water be used during grinding. 
                    Even small amounts of water will cause rapid oxidation, creating a white, powdery surface 
                    that obscures the microstructure. Always use ethanol-based lubricants.
                  </p>
                </div>

                <h3>Grinding Tips</h3>
                <ul>
                  <li>Keep ethanol flowing continuously to prevent oxidation</li>
                  <li>Work quickly but carefully - minimize time between grits</li>
                  <li>Use fresh grinding papers - loaded papers can trap moisture</li>
                  <li>Store samples in ethanol between grinding steps if not proceeding immediately</li>
                  <li>Ensure all scratches from previous grit are removed before proceeding</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={200}>
              <section id="polishing" className="scroll-mt-24">
                <h2>Polishing</h2>
                <p>
                  Polishing magnesium requires the same ethanol-based approach as grinding. Diamond polishing 
                  suspensions must be prepared with ethanol rather than water, and final polishing should use 
                  ethanol-based colloidal silica.
                </p>

                <h3>Diamond Polishing Sequence</h3>
                <ol>
                  <li><strong>9 μm diamond:</strong> 4-6 minutes on hard cloth (Texmet or equivalent) with ethanol-based suspension</li>
                  <li><strong>6 μm diamond:</strong> 3-5 minutes on medium-hard cloth with ethanol-based suspension</li>
                  <li><strong>3 μm diamond:</strong> 3-5 minutes on medium cloth with ethanol-based suspension</li>
                  <li><strong>1 μm diamond:</strong> 2-4 minutes on soft cloth with ethanol-based suspension</li>
                  <li><strong>Final polish:</strong> 0.05 μm colloidal silica in ethanol - 2-3 minutes</li>
                </ol>

                <h3>Polishing Parameters</h3>
                <ul>
                  <li><strong>Lubricant:</strong> Ethanol-based diamond suspensions - prepare suspensions using ethanol, not water</li>
                  <li><strong>Pressure:</strong> Very light pressure (1-2 lbs) - magnesium is very soft</li>
                  <li><strong>Speed:</strong> 120-150 RPM for diamond polishing</li>
                  <li><strong>Cloth Selection:</strong> Harder cloths for coarse steps, softer for fine steps</li>
                  <li><strong>Final Polish:</strong> Use ethanol-based colloidal silica (0.05 μm)</li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>Important:</strong> Standard diamond polishing suspensions are water-based. For 
                    magnesium, you must either purchase ethanol-based suspensions or prepare your own by 
                    mixing diamond powder with ethanol. Never use water-based suspensions.
                  </p>
                </div>

                <h3>Final Polishing</h3>
                <p>
                  Final polishing with ethanol-based colloidal silica (0.05 μm) is essential for magnesium. 
                  This removes any remaining deformation and reveals the true microstructure. The sample should 
                  be kept wet with ethanol throughout the polishing process and immediately transferred to 
                  ethanol storage after polishing.
                </p>

                <h3>Post-Polishing Care</h3>
                <ul>
                  <li>Immediately rinse sample with ethanol (never water)</li>
                  <li>Dry quickly with compressed air</li>
                  <li>Store in desiccator or ethanol until ready for etching or examination</li>
                  <li>If examining unetched, do so quickly to minimize oxidation</li>
                </ul>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={250}>
              <section id="etching" className="scroll-mt-24">
                <h2>Etching</h2>
                <p>
                  Etching magnesium requires specific etchants that work with the material's reactivity. Common 
                  etchants include Glycol etchant (Picral-Glycol), Acetic picral, and other specialized solutions. 
                  Care must be taken to prevent over-etching and further oxidation.
                </p>

                <h3>Common Etchants for Magnesium</h3>
                
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Etchant</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Composition</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Application</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2"><strong>Glycol Etchant (Picral-Glycol)</strong></td>
                        <td className="border border-gray-300 px-4 py-2">4.2 g picric acid, 10 mL acetic acid, 10 mL water, 70 mL ethylene glycol</td>
                        <td className="border border-gray-300 px-4 py-2">General microstructure, grain boundaries</td>
                        <td className="border border-gray-300 px-4 py-2">5-15 sec</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2"><strong>Acetic Picral</strong></td>
                        <td className="border border-gray-300 px-4 py-2">4.2 g picric acid, 10 mL acetic acid, 100 mL ethanol</td>
                        <td className="border border-gray-300 px-4 py-2">Grain boundaries, general structure</td>
                        <td className="border border-gray-300 px-4 py-2">10-30 sec</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2"><strong>Acetic Glycol</strong></td>
                        <td className="border border-gray-300 px-4 py-2">20 mL acetic acid, 60 mL ethylene glycol, 1 mL nitric acid</td>
                        <td className="border border-gray-300 px-4 py-2">General microstructure</td>
                        <td className="border border-gray-300 px-4 py-2">5-20 sec</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2"><strong>Nital (Dilute)</strong></td>
                        <td className="border border-gray-300 px-4 py-2">1-2% nitric acid in ethanol</td>
                        <td className="border border-gray-300 px-4 py-2">Some magnesium alloys</td>
                        <td className="border border-gray-300 px-4 py-2">5-15 sec</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>Etching Procedure</h3>
                <ol>
                  <li>Ensure sample is clean and completely dry (use ethanol rinse, then compressed air)</li>
                  <li>Apply etchant using cotton swab or immerse sample briefly</li>
                  <li>Agitate gently if using swab method</li>
                  <li>Monitor etching progress carefully - magnesium can over-etch quickly</li>
                  <li>Rinse immediately with ethanol (never water)</li>
                  <li>Dry quickly with compressed air</li>
                  <li>Examine immediately or store in desiccator</li>
                </ol>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                  <p className="text-sm text-red-900">
                    <strong>Safety Warning:</strong> Many magnesium etchants contain picric acid, which is 
                    explosive when dry. Always keep picric acid solutions wet, store properly, and dispose 
                    of according to local regulations. Work in a well-ventilated area and use appropriate 
                    personal protective equipment.
                  </p>
                </div>

                <h3>Alloy-Specific Etching</h3>
                <ul>
                  <li><strong><MaterialTooltip materialName="AZ31">AZ31</MaterialTooltip>, <MaterialTooltip materialName="AZ91">AZ91</MaterialTooltip>:</strong> Glycol etchant or Acetic picral work well</li>
                  <li><strong><MaterialTooltip materialName="AM60">AM60</MaterialTooltip>:</strong> Acetic picral or dilute Nital</li>
                  <li><strong><MaterialTooltip materialName="WE43">WE43</MaterialTooltip>:</strong> Glycol etchant preferred</li>
                  <li><strong>Pure Magnesium:</strong> Acetic picral or Glycol etchant</li>
                </ul>

                <h3>Post-Etching Care</h3>
                <p>
                  After etching, rinse immediately with ethanol and dry with compressed air. Examine the sample 
                  as soon as possible, as oxidation will begin immediately upon exposure to air. If examination 
                  must be delayed, store in a desiccator.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={300}>
              <section id="troubleshooting" className="scroll-mt-24">
                <h2>Troubleshooting</h2>
                
                <h3>Common Issues and Solutions</h3>
                
                <div className="space-y-4 my-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: White, Powdery Surface (Oxidation)</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> White, powdery appearance, obscured microstructure, surface appears "fuzzy"
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Cause:</strong> Exposure to water or excessive moisture during preparation
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <strong>Solutions:</strong> Re-polish using only ethanol-based lubricants, ensure all 
                      equipment is dry, work in low-humidity environment, store samples in ethanol or desiccator 
                      between steps. If severe, may need to re-section and start over.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Excessive Deformation</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Smearing, distorted microstructure, difficulty revealing grain boundaries
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Reduce grinding/polishing pressure, use lighter pressure (1-2 lbs), 
                      ensure proper grit progression, extend polishing times at each step, use softer polishing cloths
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Over-Etching</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Dark, obscured microstructure, excessive relief, surface appears "eaten away"
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Reduce etching time significantly (try 2-5 seconds), use weaker 
                      etchant concentration, rinse immediately after etching, re-polish lightly and re-etch if necessary
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Incomplete Etching</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> No contrast, grain boundaries not visible, flat appearance
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Increase etching time slightly, try different etchant, ensure 
                      sample is clean before etching, check etchant freshness, ensure proper etchant composition
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Problem: Rapid Oxidation After Polishing</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> Sample begins to oxidize immediately after polishing, even before etching
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Solutions:</strong> Work more quickly, minimize air exposure, store immediately in 
                      desiccator or ethanol, use lower humidity environment, ensure sample is completely dry 
                      before storage (moisture accelerates oxidation)
                    </p>
                  </div>
                </div>

                <h3>Prevention Tips</h3>
                <ul>
                  <li>Always use ethanol-based lubricants - never water</li>
                  <li>Work efficiently to minimize air exposure time</li>
                  <li>Store samples in ethanol or desiccator when not actively working on them</li>
                  <li>Keep work area dry and low-humidity</li>
                  <li>Have all materials ready before removing samples from protective storage</li>
                  <li>Use fresh, dry grinding papers and polishing cloths</li>
                  <li>Ensure all equipment is clean and dry before use</li>
                </ul>
              </section>
            </AnimateOnScroll>

            {/* CTA Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Need More Help?</h3>
              <p className="text-gray-600 mb-4">
                Explore our other guides or use our tools to find the right products and procedures for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/guides" className="btn-primary text-center">
                  Browse All Guides
                </Link>
                <Link href="/etchants" className="btn-secondary text-center">
                  Find Etchants
                </Link>
                <Link href="/tools/etchant-selector" className="btn-tertiary text-center">
                  Etchant Selector Tool
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

