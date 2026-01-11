import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import GlossaryTermTooltip from '@/components/GlossaryTermTooltip'
import MaterialTooltip from '@/components/MaterialTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('additive-manufacturing-preparation')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'unique-challenges', label: 'Unique Challenges' },
  { id: 'sectioning', label: 'Sectioning' },
  { id: 'mounting', label: 'Mounting' },
  { id: 'grinding', label: 'Grinding' },
  { id: 'polishing', label: 'Polishing' },
  { id: 'etching', label: 'Etching' },
  { id: 'build-direction', label: 'Revealing Build Direction' },
  { id: 'defect-analysis', label: 'Process Defect Analysis' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function AdditiveManufacturingGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Additive Manufacturing Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Application-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Additive Manufacturing (3D Printing) Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing additive manufacturing samples for metallographic analysis, 
              covering unique challenges, sectioning, mounting, grinding, polishing, and etching techniques 
              for revealing build direction, layer interfaces, and process defects.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#unique-challenges" className="text-primary-600 hover:underline">Unique Challenges</a></li>
              <li><a href="#sectioning" className="text-primary-600 hover:underline">Sectioning</a></li>
              <li><a href="#mounting" className="text-primary-600 hover:underline">Mounting</a></li>
              <li><a href="#grinding" className="text-primary-600 hover:underline">Grinding</a></li>
              <li><a href="#polishing" className="text-primary-600 hover:underline">Polishing</a></li>
              <li><a href="#etching" className="text-primary-600 hover:underline">Etching</a></li>
              <li><a href="#build-direction" className="text-primary-600 hover:underline">Revealing Build Direction</a></li>
              <li><a href="#defect-analysis" className="text-primary-600 hover:underline">Process Defect Analysis</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Additive manufacturing (AM), also known as 3D printing, has revolutionized materials processing 
                and manufacturing. However, the unique characteristics of AM materials, including <GlossaryTermTooltip term="Porosity">porosity</GlossaryTermTooltip>, 
                layer boundaries, support structures, and <GlossaryTermTooltip term="Anisotropic">anisotropic</GlossaryTermTooltip> <GlossaryTermTooltip term="Microstructure">microstructures</GlossaryTermTooltip>, present distinct challenges 
                for metallographic sample preparation. This growing field requires specialized techniques to 
                properly reveal build direction, layer interfaces, and process defects.
              </p>
              <p>
                AM processes such as powder bed fusion (PBF), directed energy deposition (DED), and binder jetting 
                create materials with microstructures that differ significantly from conventionally processed materials. 
                The layer-by-layer build process results in directional solidification, thermal gradients, and 
                potential <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip> that must be carefully preserved and revealed during <GlossaryTermTooltip term="Sample Preparation">sample preparation</GlossaryTermTooltip>.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-blue-800">
                  <strong>Key Consideration:</strong> Unlike conventional materials, AM samples require careful 
                  orientation planning to reveal both the build direction (Z-axis) and layer interfaces (XY plane). 
                  Multiple samples may be needed to fully characterize the <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip>.
                </p>
              </div>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Titanium+ZrB2, 400X (DIC).JPG"
                  alt="Titanium alloy microstructure showing anisotropic grain structure similar to AM materials, 400X magnification with DIC"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Titanium alloy microstructure showing anisotropic grain structure, similar to what may be observed in AM materials. The directional grain growth and phase distribution are characteristic of layer-by-layer build processes. 400X magnification (DIC).</p>
              </div>
            </section>

            <section id="unique-challenges" className="scroll-mt-24">
              <h2>Unique Challenges with Additive Manufacturing Materials</h2>
              
              <h3>Porosity</h3>
              <p>
                AM materials often contain <GlossaryTermTooltip term="Porosity">porosity</GlossaryTermTooltip> from incomplete fusion, gas entrapment, or keyhole collapse. 
                These pores can be:
              </p>
              <ul>
                <li><strong>Lack-of-fusion pores:</strong> Irregularly shaped, often at <GlossaryTermTooltip term="Grain Boundary">grain boundaries</GlossaryTermTooltip> and layer boundaries</li>
                <li><strong>Gas pores:</strong> Spherical, typically from trapped gas in powder</li>
                <li><strong>Keyhole pores:</strong> Elongated, from excessive energy input</li>
              </ul>
              <p>
                During <GlossaryTermTooltip term="Sample Preparation">preparation</GlossaryTermTooltip>, these pores can trap abrasives, polishing compounds, or <GlossaryTermTooltip term="Etchant">etchant</GlossaryTermTooltip>, leading to 
                <GlossaryTermTooltip term="Contamination">contamination</GlossaryTermTooltip> and <GlossaryTermTooltip term="Artifact">artifacts</GlossaryTermTooltip>. Careful cleaning between steps is essential.
              </p>

              <h3>Layer Boundaries</h3>
              <p>
                The layer-by-layer build process creates distinct boundaries between layers. These interfaces may 
                contain:
              </p>
              <ul>
                <li>Oxide films or <GlossaryTermTooltip term="Contamination">contamination</GlossaryTermTooltip></li>
                <li><GlossaryTermTooltip term="Microstructure">Microstructural</GlossaryTermTooltip> differences (<GlossaryTermTooltip term="Grain Size">grain size</GlossaryTermTooltip>, <GlossaryTermTooltip term="Phase">phase</GlossaryTermTooltip> distribution)</li>
                <li>Residual stress concentrations</li>
                <li>Potential weak points for failure</li>
              </ul>
              <p>
                Preserving these boundaries during <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip> and <GlossaryTermTooltip term="Sample Preparation">preparation</GlossaryTermTooltip> is critical for understanding 
                material behavior and process optimization.
              </p>

              <h3>Support Structures</h3>
              <p>
                Many AM processes require support structures that must be removed post-build. The interface 
                between the part and support material can contain:
              </p>
              <ul>
                <li>Incomplete fusion zones</li>
                <li>Contamination from support removal processes</li>
                <li>Altered microstructures due to different thermal histories</li>
                <li>Residual stress from support removal</li>
              </ul>
              <p>
                If analyzing support interfaces, careful sectioning to preserve these regions is essential.
              </p>

              <h3>Anisotropic Microstructures</h3>
              <p>
                The directional solidification and thermal gradients in AM create <GlossaryTermTooltip term="Anisotropic">anisotropic</GlossaryTermTooltip> <GlossaryTermTooltip term="Microstructure">microstructures</GlossaryTermTooltip> 
                that vary significantly with orientation. <GlossaryTermTooltip term="Grain">Grain</GlossaryTermTooltip> growth, <GlossaryTermTooltip term="Phase">phase</GlossaryTermTooltip> distribution, and <GlossaryTermTooltip term="Defect">defect</GlossaryTermTooltip> density 
                all depend on build direction and location relative to the build plate.
              </p>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning Considerations</h2>
              <p>
                <GlossaryTermTooltip term="Sectioning">Sectioning</GlossaryTermTooltip> AM samples requires careful planning to reveal the features of interest. The build 
                direction and layer orientation must be considered when selecting the section plane.
              </p>

              <h3>Orientation Planning</h3>
              <p>
                Plan your sectioning to reveal the features you need to analyze:
              </p>
              <ul>
                <li><strong>Build direction (Z-axis):</strong> Section perpendicular to build layers to reveal layer boundaries, 
                columnar grain growth, and vertical porosity distribution</li>
                <li><strong>Layer plane (XY plane):</strong> Section parallel to build layers to reveal in-plane microstructure, 
                grain morphology, and horizontal defect distribution</li>
                <li><strong>Oblique sections:</strong> May be useful for revealing three-dimensional relationships</li>
              </ul>

              <h3>Sectioning Technique</h3>
              <p>
                Use slow cutting speeds to minimize heat generation and preserve <GlossaryTermTooltip term="Microstructure">microstructural</GlossaryTermTooltip> features:
              </p>
              <ul>
                <li>Cutting speed: 100-150 RPM for most AM materials</li>
                <li>Use thin <GlossaryTermTooltip term="Abrasive Cut-Off Wheel">abrasive blades</GlossaryTermTooltip> (0.5-1.0 mm) to minimize kerf loss</li>
                <li>Apply steady, moderate pressure</li>
                <li>Use adequate <GlossaryTermTooltip term="Coolant">coolant</GlossaryTermTooltip> to prevent overheating</li>
                <li>For <GlossaryTermTooltip term="Porosity">porous</GlossaryTermTooltip> materials, consider using a slower feed rate to avoid tearing</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-vhs.png"
                    alt="Precision cutting abrasive blades for additive manufacturing sample sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Thin abrasive cut-off blades minimize heat generation and preserve microstructural features in AM materials. MAX-VHS or MAX-D series blades are suitable for most AM alloys.</p>
              </div>
              <ProductLink 
                productName="Abrasive Cut-Off Blades"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="Thin blades for precise sectioning of AM samples with minimal damage"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting Considerations</h2>
              <p>
                <GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip> AM samples requires special attention to preserve <GlossaryTermTooltip term="Porosity">porosity</GlossaryTermTooltip> and layer boundaries. 
                The mounting material must not infiltrate pores or obscure features.
              </p>

              <h3>Compression Mounting</h3>
              <p>
                <GlossaryTermTooltip term="Compression Mounting">Compression mounting</GlossaryTermTooltip> can work well for AM samples, but consider:
              </p>
              <ul>
                <li>Use low-viscosity <GlossaryTermTooltip term="Resin">mounting resins</GlossaryTermTooltip> to minimize pore infiltration</li>
                <li>Apply moderate pressure (2000-3000 psi) to avoid collapsing pores</li>
                <li><GlossaryTermTooltip term="Epoxy">Epoxy resins</GlossaryTermTooltip> are generally preferred over <GlossaryTermTooltip term="Phenolic">phenolic</GlossaryTermTooltip> for better edge retention</li>
                <li>Ensure complete curing to prevent resin shrinkage <GlossaryTermTooltip term="Artifact">artifacts</GlossaryTermTooltip></li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/mounting-cover.webp"
                    alt="Compression mounting equipment for AM samples"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Compression mounting presses for AM samples. Use moderate pressure to avoid collapsing pores in porous materials.</p>
              </div>

              <h3>Castable Mounting</h3>
              <p>
                <GlossaryTermTooltip term="Castable Mounting">Castable mounting</GlossaryTermTooltip> may be preferable for highly <GlossaryTermTooltip term="Porosity">porous</GlossaryTermTooltip> samples:
              </p>
              <ul>
                <li>Lower pressure reduces risk of pore collapse</li>
                <li>Better penetration into complex geometries</li>
                <li>Can use <GlossaryTermTooltip term="Vacuum Impregnation">vacuum impregnation</GlossaryTermTooltip> for highly <GlossaryTermTooltip term="Porosity">porous</GlossaryTermTooltip> materials</li>
                <li>Longer curing time but better preservation of features</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://www.metallographic.com/metallographic-equipment/castable-mounting.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/castable-mounting-cover.png"
                    alt="Castable mounting systems with vacuum impregnation for porous AM samples"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Castable mounting systems with vacuum impregnation capabilities for highly porous AM materials.</p>
              </div>
              <ProductLink 
                productName="Mounting Equipment"
                href="https://www.metallographic.com/metallographic-equipment/compression-mounting.html"
                description="Mounting presses and castable mounting systems for AM samples"
              />
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding</h2>
              <p>
                <GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip> AM samples requires careful technique to avoid <GlossaryTermTooltip term="Smearing">smearing</GlossaryTermTooltip>, pore collapse, and loss of 
                layer boundary definition. The presence of <GlossaryTermTooltip term="Porosity">porosity</GlossaryTermTooltip> makes these materials more susceptible to 
                damage during <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip>.
              </p>

              <h3>Grinding Sequence</h3>
              <p>
                Use a progressive <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip> sequence with careful attention to pressure:
              </p>
              <ol>
                <li><strong>120 grit:</strong> Remove <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip> damage (30-60 seconds). Use light pressure to avoid 
                <GlossaryTermTooltip term="Smearing">smearing</GlossaryTermTooltip> <GlossaryTermTooltip term="Porosity">porous</GlossaryTermTooltip> regions</li>
                <li><strong>240 grit:</strong> Remove previous scratches (30-60 seconds). Continue with light pressure</li>
                <li><strong>400 grit:</strong> Further refinement (30-60 seconds)</li>
                <li><strong>600 grit:</strong> Final <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip> step (30-60 seconds)</li>
              </ol>

              <h3>Special Considerations</h3>
              <ul>
                <li><strong>Light pressure:</strong> Use lighter pressure than for dense materials to avoid pore collapse 
                and <GlossaryTermTooltip term="Smearing">smearing</GlossaryTermTooltip></li>
                <li><strong>Frequent cleaning:</strong> Clean samples thoroughly between grits to remove trapped abrasives 
                from pores</li>
                <li><strong>Rotation:</strong> Rotate sample 90° between grits, but be aware of orientation to preserve 
                layer boundary visibility</li>
                <li><strong>Water lubrication:</strong> Use adequate water to prevent overheating and remove debris</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/abrasive grinding-SiC papers.webp"
                    alt="Silicon carbide grinding papers for progressive grinding of AM samples"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes for progressive grinding. Use light pressure to avoid smearing porous regions.</p>
              </div>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Premium SiC papers for progressive grinding of AM samples"
              />
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing</h2>
              <p>
                <GlossaryTermTooltip term="Polishing">Polishing</GlossaryTermTooltip> AM samples requires careful technique to avoid filling pores with polishing compound 
                and to preserve layer boundaries. The <GlossaryTermTooltip term="Anisotropic">anisotropic</GlossaryTermTooltip> nature of AM <GlossaryTermTooltip term="Microstructure">microstructures</GlossaryTermTooltip> means that 
                different regions may polish at different rates.
              </p>

              <h3>Diamond Polishing</h3>
              <ol>
                <li><strong>9 μm diamond:</strong> 3-5 minutes on a hard cloth (e.g., Texmet). Use light pressure</li>
                <li><strong>3 μm diamond:</strong> 3-5 minutes on a medium-hard cloth. Continue with light pressure</li>
                <li><strong>1 μm diamond:</strong> 2-3 minutes on a soft cloth</li>
              </ol>

              <h3>Final Polishing</h3>
              <ol>
                <li><strong>0.05 μm colloidal silica:</strong> 1-2 minutes on a soft cloth</li>
                <li>Rinse thoroughly with water, then alcohol</li>
                <li>Use ultrasonic cleaning if available to remove polishing compound from pores</li>
                <li>Dry with compressed air</li>
              </ol>

              <h3>Special Considerations</h3>
              <ul>
                <li><strong>Avoid over-polishing:</strong> Can cause <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip> around pores and layer boundaries</li>
                <li><strong>Frequent cleaning:</strong> Clean between <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> steps to prevent compound buildup in pores</li>
                <li><strong>Ultrasonic cleaning:</strong> Consider ultrasonic cleaning after final polish to remove 
                trapped polishing compound</li>
                <li><strong>Monitor <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip>:</strong> Check for <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip> around pores and layer boundaries that may indicate 
                over-polishing</li>
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
                      alt="Diamond polishing compounds for AM sample preparation"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Diamond polishing compounds in various particle sizes for AM materials.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/polishing-pads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polishing-pads.webp"
                      alt="Polishing pads and cloths for different polishing stages"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polishing pads and cloths for different polishing stages. Select appropriate hardness for AM materials.</p>
                </div>
              </div>
              <ProductLink 
                productName="Diamond Abrasives"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond polishing compounds for AM sample preparation"
              />
              <ProductLink 
                productName="Polishing Pads"
                href="https://shop.metallographic.com/collections/polishing-pads"
                description="Polishing pads and cloths for different polishing stages"
              />
            </section>

            <section id="etching" className="scroll-mt-24">
              <h2>Etching</h2>
              <p>
                <GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip> AM samples reveals the <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip>, layer boundaries, and process <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip>. The choice 
                of <GlossaryTermTooltip term="Etchant">etchant</GlossaryTermTooltip> depends on the base material (<MaterialTooltip materialName="304 Stainless Steel">stainless steel</MaterialTooltip>, <MaterialTooltip materialName="Ti-6Al-4V">titanium</MaterialTooltip>, <MaterialTooltip materialName="Inconel 718">nickel alloys</MaterialTooltip>, etc.) and 
                the features you want to reveal.
              </p>

              <h3>Etchant Selection</h3>
              <p>
                Use standard <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip> for the base material, but consider:
              </p>
              <ul>
                <li><strong>Material-specific <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip>:</strong> Use appropriate <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip> for the base alloy 
                (e.g., Vilella's Reagent for <MaterialTooltip materialName="431">stainless steel</MaterialTooltip>, Kroll's Reagent for <MaterialTooltip materialName="Ti-6Al-4V">titanium</MaterialTooltip>)</li>
                <li><strong><GlossaryTermTooltip term="Electrolytic Etching">Electrolytic etching</GlossaryTermTooltip>:</strong> May provide better control for revealing layer boundaries 
                and fine <GlossaryTermTooltip term="Microstructure">microstructural</GlossaryTermTooltip> features</li>
                <li><strong>Multiple <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip>:</strong> Different <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip> may reveal different features, so 
                consider using multiple <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip> on different samples or re-polishing and re-etching</li>
              </ul>

              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry</li>
                <li>Apply <GlossaryTermTooltip term="Etchant">etchant</GlossaryTermTooltip> with cotton swab or <GlossaryTermTooltip term="Immersion Etching">immerse sample</GlossaryTermTooltip></li>
                <li><GlossaryTermTooltip term="Etch">Etch</GlossaryTermTooltip> for appropriate time (may need to adjust from standard times due to <GlossaryTermTooltip term="Microstructure">microstructural</GlossaryTermTooltip> differences)</li>
                <li>Immediately rinse with water, then alcohol</li>
                <li>Dry with compressed air</li>
                <li>Inspect under microscope and re-etch if necessary</li>
              </ol>

              <h3>Special Considerations</h3>
              <ul>
                <li><strong>Layer boundaries:</strong> May <GlossaryTermTooltip term="Etch">etch</GlossaryTermTooltip> differently than bulk material, creating contrast</li>
                <li><strong>Pores:</strong> May trap <GlossaryTermTooltip term="Etchant">etchant</GlossaryTermTooltip>, requiring thorough rinsing</li>
                <li><strong><GlossaryTermTooltip term="Anisotropic">Anisotropic</GlossaryTermTooltip> response:</strong> Different orientations may <GlossaryTermTooltip term="Etch">etch</GlossaryTermTooltip> at different rates</li>
                <li><strong>Over-etching:</strong> Can obscure fine features, so start with shorter times</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/etchants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/etching.webp"
                    alt="Etching solutions and reagents for AM materials"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for AM materials. Use material-specific etchants based on the base alloy (stainless steel, titanium, nickel alloys, etc.).</p>
              </div>
              <ProductLink 
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Etching solutions and reagents for AM materials"
              />
            </section>

            <section id="build-direction" className="scroll-mt-24">
              <h2>Revealing Build Direction and Layer Interfaces</h2>
              <p>
                One of the most important aspects of AM sample preparation is revealing the build direction 
                and layer interfaces. This requires careful sectioning orientation and appropriate etching.
              </p>

              <h3>Sectioning for Build Direction</h3>
              <p>
                To reveal build direction (Z-axis):
              </p>
              <ul>
                <li><GlossaryTermTooltip term="Section">Section</GlossaryTermTooltip> perpendicular to the build plate (parallel to build direction)</li>
                <li>This reveals layer boundaries, columnar <GlossaryTermTooltip term="Grain">grain</GlossaryTermTooltip> growth, and vertical <GlossaryTermTooltip term="Porosity">porosity</GlossaryTermTooltip> distribution</li>
                <li>Allows analysis of layer-to-layer bonding and fusion quality</li>
              </ul>

              <h3>Sectioning for Layer Planes</h3>
              <p>
                To reveal layer plane <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> (XY plane):
              </p>
              <ul>
                <li><GlossaryTermTooltip term="Section">Section</GlossaryTermTooltip> parallel to the build plate (perpendicular to build direction)</li>
                <li>This reveals in-plane <GlossaryTermTooltip term="Grain">grain</GlossaryTermTooltip> morphology and <GlossaryTermTooltip term="Defect">defect</GlossaryTermTooltip> distribution</li>
                <li>Shows the <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> within individual layers</li>
              </ul>

              <h3>Revealing Layer Boundaries</h3>
              <p>
                Layer boundaries may be revealed through:
              </p>
              <ul>
                <li><strong><GlossaryTermTooltip term="Microstructure">Microstructural</GlossaryTermTooltip> differences:</strong> Different <GlossaryTermTooltip term="Grain Size">grain sizes</GlossaryTermTooltip> or <GlossaryTermTooltip term="Phase">phase</GlossaryTermTooltip> distributions at layer boundaries</li>
                <li><strong>Oxide films:</strong> Thin oxide layers that <GlossaryTermTooltip term="Etch">etch</GlossaryTermTooltip> differently</li>
                <li><strong><GlossaryTermTooltip term="Porosity">Porosity</GlossaryTermTooltip>:</strong> Pores concentrated at layer boundaries</li>
                <li><strong><GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip> contrast:</strong> Different etching response due to <GlossaryTermTooltip term="Microstructure">microstructural</GlossaryTermTooltip> variations</li>
              </ul>

              <h3>Documentation</h3>
              <p>
                Always document the <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip> orientation relative to the build direction:
              </p>
              <ul>
                <li>Mark the build direction on the sample or mount</li>
                <li>Include orientation information in your notes and images</li>
                <li>Use consistent terminology (e.g., "Z-axis section" or "XY plane section")</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Cast-titanium.jpg"
                  alt="Cast titanium microstructure showing directional solidification patterns similar to AM build direction, demonstrating layer boundaries and grain growth"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Cast titanium microstructure showing directional solidification patterns similar to those observed in AM materials. The columnar grain growth and layer-like structures demonstrate the importance of proper sectioning orientation to reveal build direction.</p>
              </div>
            </section>

            <section id="defect-analysis" className="scroll-mt-24">
              <h2>Process Defect Analysis</h2>
              <p>
                AM processes can introduce various defects that must be preserved and revealed during sample 
                preparation. Understanding these defects is critical for process optimization and quality control.
              </p>

              <h3>Common AM Defects</h3>
              
              <h4>Porosity Defects</h4>
              <ul>
                <li><strong>Lack-of-fusion pores:</strong> Irregularly shaped, often at layer boundaries, from 
                insufficient energy input</li>
                <li><strong>Gas pores:</strong> Spherical, from trapped gas in powder or atmosphere</li>
                <li><strong>Keyhole pores:</strong> Elongated, from excessive energy input causing keyhole collapse</li>
              </ul>

              <h4>Microstructural Defects</h4>
              <ul>
                <li><strong>Incomplete fusion:</strong> Lack of bonding between layers</li>
                <li><strong><GlossaryTermTooltip term="Grain Boundary">Grain boundary</GlossaryTermTooltip> <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip>:</strong> Abnormal <GlossaryTermTooltip term="Grain">grain</GlossaryTermTooltip> growth or boundary migration</li>
                <li><strong><GlossaryTermTooltip term="Phase">Phase</GlossaryTermTooltip> segregation:</strong> Non-uniform phase distribution</li>
                <li><strong>Residual stress:</strong> May cause microcracking or distortion</li>
              </ul>

              <h4>Geometric Defects</h4>
              <ul>
                <li><strong>Layer misalignment:</strong> Shifts between layers</li>
                <li><strong>Surface roughness:</strong> From incomplete fusion or support structures</li>
                <li><strong>Dimensional inaccuracy:</strong> From thermal distortion or process parameters</li>
              </ul>

              <h3>Preparation for Defect Analysis</h3>
              <p>
                To properly reveal and analyze <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip>:
              </p>
              <ul>
                <li>Use careful <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip> to preserve <GlossaryTermTooltip term="Defect">defect</GlossaryTermTooltip> locations</li>
                <li>Avoid <GlossaryTermTooltip term="Smearing">smearing</GlossaryTermTooltip> or filling <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip> during <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip> and <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip></li>
                <li>Use appropriate <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip> to reveal <GlossaryTermTooltip term="Defect">defect</GlossaryTermTooltip> boundaries</li>
                <li>Consider using multiple <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip> planes to fully characterize <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip></li>
                <li>Document <GlossaryTermTooltip term="Defect">defect</GlossaryTermTooltip> locations relative to build direction and layer number</li>
              </ul>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              
              <h4>Pores Filled with Polishing Compound</h4>
              <ul>
                <li><strong>Problem:</strong> Polishing compound trapped in pores</li>
                <li><strong>Solution:</strong> Use ultrasonic cleaning after <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip>, reduce polishing time, 
                or use less aggressive polishing compounds</li>
              </ul>

              <h4>Layer Boundaries Not Visible</h4>
              <ul>
                <li><strong>Problem:</strong> Layer boundaries not revealed after <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip></li>
                <li><strong>Solution:</strong> Try different <GlossaryTermTooltip term="Etchant">etchants</GlossaryTermTooltip>, adjust <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> time, or check <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip> 
                orientation (may need to <GlossaryTermTooltip term="Section">section</GlossaryTermTooltip> perpendicular to layers)</li>
              </ul>

              <h4>Smearing in Porous Regions</h4>
              <ul>
                <li><strong>Problem:</strong> Material <GlossaryTermTooltip term="Smearing">smeared</GlossaryTermTooltip> over pores during <GlossaryTermTooltip term="Grinding">grinding</GlossaryTermTooltip> or <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip></li>
                <li><strong>Solution:</strong> Reduce pressure, use sharper abrasives, or increase cleaning frequency</li>
              </ul>

              <h4>Relief Around Pores</h4>
              <ul>
                <li><strong>Problem:</strong> Excessive <GlossaryTermTooltip term="Relief">relief</GlossaryTermTooltip> making pores appear larger than they are</li>
                <li><strong>Solution:</strong> Reduce <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> time, use harder polishing cloths, or adjust 
                polishing pressure</li>
              </ul>

              <h4>Poor Edge Retention</h4>
              <ul>
                <li><strong>Problem:</strong> Porous edges rounding or losing definition</li>
                <li><strong>Solution:</strong> Use harder mounting materials, reduce polishing time at edges, 
                or use edge retention techniques</li>
              </ul>

              <h4>Anisotropic Polishing</h4>
              <ul>
                <li><strong>Problem:</strong> Different regions <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> at different rates</li>
                <li><strong>Solution:</strong> This is normal for AM materials; adjust <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> time to ensure 
                all regions are properly <GlossaryTermTooltip term="Polished">polished</GlossaryTermTooltip>, or use longer polishing times</li>
              </ul>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Explore More Procedures</h2>
              <p className="mb-4">
                Browse our comprehensive procedure guides for material-specific preparation methods and get personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides?category=Material-Specific"
                  className="btn-primary text-center"
                >
                  Browse Procedure Guides
                </Link>
                <Link 
                  href="https://shop.metallographic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  View Example Products
                </Link>
                <Link 
                  href="https://metallographic.com/equipment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Browse Equipment Examples
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
                <Link href="/guides/failure-analysis" className="text-primary-600 hover:underline font-semibold">
                  → Failure Analysis
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

