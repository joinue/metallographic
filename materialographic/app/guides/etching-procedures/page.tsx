import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('etching-procedures')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'purpose-of-etching', label: 'Purpose of Etching' },
  { id: 'types-of-etchants', label: 'Types of Etchants' },
  { id: 'etchant-selection', label: 'Etchant Selection' },
  { id: 'application-methods', label: 'Application Methods' },
  { id: 'etching-techniques', label: 'Etching Techniques' },
  { id: 'material-specific', label: 'Material-Specific Considerations' },
  { id: 'safety-considerations', label: 'Safety Considerations' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function EtchingProceduresGuide() {
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
      <GuideSideNav sections={sections} />
      <article className="py-12">
        <div className="container-custom lg:pl-0 xl:pl-0">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
              <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Etching Procedures
            </nav>

            {/* Header */}
            <header className="mb-8">
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
                Process Guide
              </span>
              <h1 className="text-4xl font-bold mb-4">Etching Procedures</h1>
              <p className="text-xl text-gray-600">
                Overview of etching techniques, reagent selection, and application methods. Learn how to 
                reveal microstructures effectively and safely for metallographic analysis.
              </p>
            </header>

            {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
            <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
              <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
                <li><a href="#purpose-of-etching" className="text-primary-600 hover:underline">Purpose of Etching</a></li>
                <li><a href="#types-of-etchants" className="text-primary-600 hover:underline">Types of Etchants</a></li>
                <li><a href="#etchant-selection" className="text-primary-600 hover:underline">Etchant Selection</a></li>
                <li><a href="#application-methods" className="text-primary-600 hover:underline">Application Methods</a></li>
                <li><a href="#etching-techniques" className="text-primary-600 hover:underline">Etching Techniques</a></li>
                <li><a href="#material-specific" className="text-primary-600 hover:underline">Material-Specific Considerations</a></li>
                <li><a href="#safety-considerations" className="text-primary-600 hover:underline">Safety Considerations</a></li>
                <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
              </ul>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section id="introduction" className="scroll-mt-24">
                <h2>Introduction</h2>
                <p>
                  Etching is a critical step in metallographic sample preparation that reveals the 
                  microstructure of a material by selectively attacking different phases, grain boundaries, 
                  and structural features. After polishing, the sample surface is featureless and appears 
                  uniform under the microscope. Etching creates contrast between different microstructural 
                  constituents, making them visible for analysis.
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
                      alt="Etching reagents and consumables for metallographic sample preparation"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                  </Link>
                  <p className="text-sm text-gray-600 mt-2 italic text-center">
                    Etching reagents and consumables for metallographic analysis. Proper etchant selection 
                    and application reveal microstructures for accurate characterization.
                  </p>
                </div>
                <p>
                  The etching process involves applying a chemical reagent (etchant) to the polished surface, 
                  which reacts differently with various phases and structural features. This differential 
                  attack creates height differences (relief) or changes in reflectivity, producing contrast 
                  that reveals the microstructure.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Guide Structure:</strong> This guide covers the fundamentals of etching, from 
                    understanding <a href="#purpose-of-etching" className="text-primary-600 hover:underline font-semibold">why we etch</a> to 
                    selecting <a href="#etchant-selection" className="text-primary-600 hover:underline font-semibold">appropriate etchants</a>, 
                    learning <a href="#application-methods" className="text-primary-600 hover:underline font-semibold">application methods</a>, 
                    and <a href="#troubleshooting" className="text-primary-600 hover:underline font-semibold">troubleshooting common issues</a>. 
                    Always prioritize <a href="#safety-considerations" className="text-primary-600 hover:underline font-semibold">safety</a> when working with chemical etchants.
                  </p>
                </div>
              </section>

              <section id="purpose-of-etching" className="scroll-mt-24">
                <h2>Purpose of Etching</h2>
                <p>
                  Etching serves several essential purposes in metallographic analysis:
                </p>
                <ul>
                  <li>
                    <strong>Reveal Microstructure:</strong> Makes grain boundaries, phase boundaries, and 
                    different microstructural constituents visible under the microscope.
                  </li>
                  <li>
                    <strong>Create Contrast:</strong> Produces differences in reflectivity or height that 
                    allow identification of different phases and features.
                  </li>
                  <li>
                    <strong>Highlight Defects:</strong> Makes cracks, inclusions, and other defects more 
                    visible for analysis.
                  </li>
                  <li>
                    <strong>Identify Phases:</strong> Different phases react differently to etchants, 
                    allowing phase identification and characterization.
                  </li>
                  <li>
                    <strong>Measure Grain Size:</strong> Reveals grain boundaries necessary for grain size 
                    measurements and ASTM grain size determination.
                  </li>
                </ul>
                <p>
                  Without etching, most polished samples appear featureless because all microstructural 
                  constituents have similar reflectivity. Etching is what transforms a polished surface 
                  into an informative microstructural image.
                </p>
              </section>

              <section id="types-of-etchants" className="scroll-mt-24">
                <h2>Types of Etchants</h2>
                <p>
                  Etchants can be classified based on their chemical composition and mechanism of action:
                </p>

                <h3>Chemical Etchants</h3>
                <p>
                  Chemical etchants use chemical reactions to selectively attack different phases. They 
                  are the most common type and include:
                </p>
                <ul>
                  <li>
                    <strong>Acidic Etchants:</strong> Such as nital (nitric acid in ethanol), picral 
                    (picric acid in ethanol), and various acid mixtures. These attack grain boundaries 
                    and phase boundaries preferentially.
                  </li>
                  <li>
                    <strong>Alkaline Etchants:</strong> Such as sodium hydroxide solutions, used for 
                    specific materials like aluminum and its alloys.
                  </li>
                  <li>
                    <strong>Oxidizing Agents:</strong> Such as potassium permanganate, used for specific 
                    microstructural features.
                  </li>
                </ul>

                <h3>Electrolytic Etchants</h3>
                <p>
                  Electrolytic etching uses an electrical current to enhance or control the etching 
                  process. The sample acts as an electrode in an electrolytic cell:
                </p>
                <ul>
                  <li>
                    <strong>Anodic Etching:</strong> Sample is the anode (positive electrode), commonly 
                    used for stainless steels and other corrosion-resistant materials.
                  </li>
                  <li>
                    <strong>Cathodic Etching:</strong> Sample is the cathode (negative electrode), less 
                    common but useful for specific applications.
                  </li>
                </ul>
                <p>
                  Electrolytic etching provides better control over etching depth and can reveal 
                  microstructures that are difficult to etch chemically.
                </p>

                <h3>Thermal Etching</h3>
                <p>
                  Thermal etching involves heating the sample in a controlled atmosphere to reveal grain 
                  boundaries through surface diffusion. This method is useful for materials that are 
                  difficult to etch chemically and for high-temperature applications.
                </p>

                <h3>Color Etchants</h3>
                <p>
                  Color etchants produce colored films on different phases, allowing easy visual 
                  distinction between phases. These are particularly useful for complex microstructures 
                  with multiple phases.
                </p>
              </section>

              <section id="etchant-selection" className="scroll-mt-24">
                <h2>Etchant Selection</h2>
                <p>
                  Selecting the appropriate etchant depends on several factors:
                </p>

                <h3>Material Type</h3>
                <p>
                  Different materials require different etchants. Common examples include:
                </p>
                <ul>
                  <li>
                    <strong>Steels:</strong> Nital (2-5% nitric acid in ethanol) is most common. Picral 
                    (picric acid in ethanol) is used for revealing cementite and pearlite.
                  </li>
                  <li>
                    <strong>Stainless Steels:</strong> Electrolytic etching with oxalic acid or chemical 
                    etching with Vilella's reagent (picric acid, HCl, ethanol).
                  </li>
                  <li>
                    <strong>Aluminum Alloys:</strong> Keller's reagent (HF, HCl, HNO₃, H₂O) or Weck's 
                    reagent for color etching.
                  </li>
                  <li>
                    <strong>Copper Alloys:</strong> Ammonium hydroxide and hydrogen peroxide, or ferric 
                    chloride solutions.
                  </li>
                  <li>
                    <strong>Titanium:</strong> Kroll's reagent (HF, HNO₃, H₂O) or electrolytic etching 
                    with various solutions.
                  </li>
                </ul>

                <h3>Microstructural Features of Interest</h3>
                <p>
                  The specific features you want to reveal influence etchant selection:
                </p>
                <ul>
                  <li>
                    <strong>Grain Boundaries:</strong> Most general-purpose etchants reveal grain boundaries.
                  </li>
                  <li>
                    <strong>Specific Phases:</strong> Some etchants preferentially attack or highlight 
                    specific phases (e.g., picral for cementite in steel).
                  </li>
                  <li>
                    <strong>Defects:</strong> Some etchants are better at revealing cracks, inclusions, or 
                    other defects.
                  </li>
                </ul>

                <h3>Application Method</h3>
                <p>
                  The available equipment and application method may influence etchant selection:
                </p>
                <ul>
                  <li>
                    <strong>Swabbing:</strong> Simple chemical etchants applied with cotton swabs.
                  </li>
                  <li>
                    <strong>Immersion:</strong> Sample immersed in etchant solution.
                  </li>
                  <li>
                    <strong>Electrolytic:</strong> Requires electrolytic etching equipment.
                  </li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-6 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> Use our <Link href="/tools/etchant-selector" className="text-primary-600 hover:underline font-semibold">Etchant Selector Tool</Link> or 
                    browse the <Link href="/etchants" className="text-primary-600 hover:underline font-semibold">Etchants Database</Link> to find 
                    the right etchant for your material and application.
                  </p>
                </div>
                <ProductLink 
                  productName="Etchants"
                  href="https://shop.metallographic.com/collections/etchants"
                  description="Pre-mixed and custom etching solutions for various materials"
                />
              </section>

              <section id="application-methods" className="scroll-mt-24">
                <h2>Application Methods</h2>
                <p>
                  There are several methods for applying etchants to polished samples:
                </p>

                <h3>Swabbing</h3>
                <p>
                  Swabbing is the most common method for chemical etchants:
                </p>
                <ol>
                  <li>
                    Soak a cotton swab or ball in the etchant solution.
                  </li>
                  <li>
                    Gently wipe the polished surface with the swab, applying light, even pressure.
                  </li>
                  <li>
                    Continue swabbing for the recommended time (typically 5-30 seconds).
                  </li>
                  <li>
                    Immediately rinse with water or appropriate solvent to stop the etching reaction.
                  </li>
                  <li>
                    Dry the sample with compressed air or a clean cloth.
                  </li>
                </ol>
                <p>
                  <strong>Advantages:</strong> Simple, requires minimal equipment, good control over 
                  etching time and area.
                </p>
                <p>
                  <strong>Disadvantages:</strong> Can introduce scratches if swab is too rough, requires 
                  practice for consistent results.
                </p>

                <h3>Immersion</h3>
                <p>
                  Immersion involves submerging the sample in the etchant solution:
                </p>
                <ol>
                  <li>
                    Place the polished sample in a container with the etchant solution.
                  </li>
                  <li>
                    Agitate gently or leave stationary for the recommended time.
                  </li>
                  <li>
                    Remove and immediately rinse thoroughly.
                  </li>
                  <li>
                    Dry the sample.
                  </li>
                </ol>
                <p>
                  <strong>Advantages:</strong> Uniform etching, good for batch processing, less risk of 
                  scratches.
                </p>
                  <p>
                  <strong>Disadvantages:</strong> Uses more etchant, less control over localized etching, 
                  requires proper disposal of used etchant.
                </p>

                <h3>Electrolytic Etching</h3>
                <p>
                  Electrolytic etching requires specialized equipment:
                </p>
                <ol>
                  <li>
                    Set up the electrolytic cell with the sample as the anode (or cathode for cathodic 
                    etching).
                  </li>
                  <li>
                    Immerse the sample in the electrolyte solution.
                  </li>
                  <li>
                    Apply the appropriate voltage and current for the recommended time.
                  </li>
                  <li>
                    Remove power and rinse the sample thoroughly.
                  </li>
                  <li>
                    Dry the sample.
                  </li>
                </ol>
                <p>
                  <strong>Advantages:</strong> Excellent control, uniform results, can reveal difficult 
                  microstructures, reproducible.
                </p>
                <p>
                  <strong>Disadvantages:</strong> Requires specialized equipment, more complex setup, 
                  requires knowledge of electrical parameters.
                </p>

                <h3>Dropping</h3>
                <p>
                  For small areas or spot etching, a drop of etchant can be applied directly:
                </p>
                <ol>
                  <li>
                    Place a drop of etchant on the area of interest.
                  </li>
                  <li>
                    Allow it to react for the appropriate time.
                  </li>
                  <li>
                    Rinse immediately and dry.
                  </li>
                </ol>
                <p>
                  This method is useful for testing etchants or etching specific areas of a sample.
                </p>
              </section>

              <section id="etching-techniques" className="scroll-mt-24">
                <h2>Etching Techniques</h2>
                <p>
                  Proper technique is essential for achieving good etching results:
                </p>

                <h3>Etching Time</h3>
                <p>
                  Etching time is critical and depends on:
                </p>
                <ul>
                  <li>
                    <strong>Etchant Concentration:</strong> More concentrated etchants work faster.
                  </li>
                  <li>
                    <strong>Material:</strong> Different materials etch at different rates.
                  </li>
                  <li>
                    <strong>Temperature:</strong> Higher temperatures generally increase etching rate.
                  </li>
                  <li>
                    <strong>Desired Contrast:</strong> Longer etching may be needed for better contrast, 
                    but over-etching can obscure details.
                  </li>
                </ul>
                <p>
                  Start with recommended times and adjust based on results. It's better to under-etch 
                  initially and re-etch if needed than to over-etch.
                </p>

                <h3>Rinsing</h3>
                <p>
                  Proper rinsing immediately after etching is essential:
                </p>
                <ul>
                  <li>
                    <strong>Stop the Reaction:</strong> Rinsing stops the etching reaction and prevents 
                    over-etching.
                  </li>
                  <li>
                    <strong>Remove Residue:</strong> Removes etchant residue that could cause staining 
                    or continued reaction.
                  </li>
                  <li>
                    <strong>Use Appropriate Solvent:</strong> Water for water-based etchants, ethanol 
                    for alcohol-based etchants, or as recommended.
                  </li>
                </ul>

                <h3>Drying</h3>
                <p>
                  Proper drying prevents water spots and contamination:
                </p>
                <ul>
                  <li>
                    Use compressed air or a clean, lint-free cloth.
                  </li>
                  <li>
                    Avoid touching the etched surface.
                  </li>
                  <li>
                    Ensure complete drying before examination to avoid water spots.
                  </li>
                </ul>

                <h3>Multiple Etching Steps</h3>
                <p>
                  Some microstructures require multiple etching steps with different etchants:
                </p>
                <ul>
                  <li>
                    <strong>Step 1:</strong> Use a general etchant to reveal grain boundaries.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Use a specific etchant to highlight particular phases or 
                    features.
                  </li>
                </ul>
                <p>
                  Always rinse thoroughly between steps to prevent etchant interactions.
                </p>
              </section>

              <section id="material-specific" className="scroll-mt-24">
                <h2>Material-Specific Considerations</h2>
                <p>
                  Different materials have specific etching requirements:
                </p>

                <h3>Steels</h3>
                <p>
                  <strong>Carbon Steels:</strong> Nital (2-5% nitric acid in ethanol) is standard. Picral 
                  reveals cementite and pearlite. Etching time: 5-15 seconds typically.
                </p>
                <p>
                  <strong>Stainless Steels:</strong> Often require electrolytic etching with oxalic acid 
                  or chemical etching with Vilella's reagent. More resistant to etching than carbon steels.
                </p>
                <p>
                  <strong>Tool Steels:</strong> May require multiple etchants or longer etching times due 
                  to high alloy content.
                </p>

                <h3>Aluminum Alloys</h3>
                <p>
                  Keller's reagent (HF, HCl, HNO₃, H₂O) is most common. Weck's reagent provides color 
                  contrast. Etching time is typically short (5-10 seconds) due to rapid reaction.
                </p>
                <p>
                  <strong>Note:</strong> Aluminum is very reactive, so etching times must be carefully 
                  controlled to avoid over-etching.
                </p>

                <h3>Copper Alloys</h3>
                <p>
                  Ammonium hydroxide and hydrogen peroxide, or ferric chloride solutions. Etching reveals 
                  grain boundaries and different phases in brass and bronze.
                </p>

                <h3>Titanium</h3>
                <p>
                  Kroll's reagent (HF, HNO₃, H₂O) or electrolytic etching. Titanium requires careful 
                  handling due to reactivity. Electrolytic etching often provides better results.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                  <p className="text-sm text-gray-700">
                    For detailed material-specific etching procedures, see our material-specific guides:
                    <Link href="/guides/stainless-steel-preparation" className="text-primary-600 hover:underline font-semibold"> Stainless Steel</Link>, 
                    <Link href="/guides/aluminum-sample-preparation" className="text-primary-600 hover:underline font-semibold"> Aluminum</Link>, 
                    <Link href="/guides/copper-alloys-preparation" className="text-primary-600 hover:underline font-semibold"> Copper Alloys</Link>, 
                    <Link href="/guides/titanium-preparation" className="text-primary-600 hover:underline font-semibold"> Titanium</Link>, and 
                    <Link href="/guides/carbon-steel-preparation" className="text-primary-600 hover:underline font-semibold"> Carbon Steel</Link>.
                  </p>
                </div>
              </section>

              <section id="safety-considerations" className="scroll-mt-24">
                <h2>Safety Considerations</h2>
                <p>
                  Etchants are chemical reagents that can be hazardous. Always prioritize safety:
                </p>

                <h3>Personal Protective Equipment (PPE)</h3>
                <ul>
                  <li>
                    <strong>Safety Glasses:</strong> Always wear safety glasses or goggles to protect 
                    eyes from splashes.
                  </li>
                  <li>
                    <strong>Gloves:</strong> Wear appropriate chemical-resistant gloves (nitrile or 
                    neoprene for most etchants).
                  </li>
                  <li>
                    <strong>Lab Coat:</strong> Protect clothing from spills and splashes.
                  </li>
                  <li>
                    <strong>Face Shield:</strong> Use when working with concentrated acids or large 
                    volumes.
                  </li>
                </ul>

                <h3>Ventilation</h3>
                <p>
                  Work in a well-ventilated area or use a fume hood, especially when:
                </p>
                <ul>
                  <li>
                    Working with volatile etchants (alcohol-based solutions).
                  </li>
                  <li>
                    Using concentrated acids.
                  </li>
                  <li>
                    Working with HF (hydrofluoric acid) - requires special precautions and emergency 
                    procedures.
                  </li>
                </ul>

                <h3>Chemical Handling</h3>
                <ul>
                  <li>
                    <strong>Read SDS:</strong> Always read the Safety Data Sheet (SDS) before using any 
                    etchant.
                  </li>
                  <li>
                    <strong>Proper Storage:</strong> Store etchants in appropriate containers, labeled 
                    clearly, in a secure location.
                  </li>
                  <li>
                    <strong>Mixing:</strong> When preparing etchants, always add acid to water (never 
                    water to acid) to prevent violent reactions.
                  </li>
                  <li>
                    <strong>Disposal:</strong> Follow proper disposal procedures for used etchants and 
                    contaminated materials.
                  </li>
                </ul>

                <h3>Emergency Procedures</h3>
                <ul>
                  <li>
                    Know the location of safety equipment (eyewash station, safety shower, first aid kit).
                  </li>
                  <li>
                    Have emergency contact information readily available.
                  </li>
                  <li>
                    For HF exposure, have calcium gluconate gel available and know the emergency 
                    procedure.
                  </li>
                </ul>

                <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> Always refer to the <Link href="/guides/safety-fundamentals" className="text-primary-600 hover:underline font-semibold">Safety Fundamentals</Link> guide 
                    and the <Link href="/resources/safety-data-sheet-reference" className="text-primary-600 hover:underline font-semibold">Safety Data Sheet Reference</Link> before working with etchants. 
                    When in doubt, consult with experienced personnel or safety officers.
                  </p>
                </div>
              </section>

              <section id="troubleshooting" className="scroll-mt-24">
                <h2>Troubleshooting Common Etching Issues</h2>
                <p>
                  Common problems and solutions when etching:
                </p>

                <h3>Over-Etching</h3>
                <p>
                  <strong>Symptoms:</strong> Excessive relief, obscured details, dark appearance.
                </p>
                <p>
                  <strong>Solutions:</strong>
                </p>
                <ul>
                  <li>
                    Reduce etching time.
                  </li>
                  <li>
                    Use a less concentrated etchant.
                  </li>
                  <li>
                    Rinse immediately after etching.
                  </li>
                  <li>
                    Re-polish and re-etch with shorter time.
                  </li>
                </ul>

                <h3>Under-Etching</h3>
                <p>
                  <strong>Symptoms:</strong> No contrast, grain boundaries not visible, featureless 
                  appearance.
                </p>
                <p>
                  <strong>Solutions:</strong>
                </p>
                <ul>
                  <li>
                    Increase etching time.
                  </li>
                  <li>
                    Use a more concentrated etchant.
                  </li>
                  <li>
                    Try a different etchant if the material is resistant.
                  </li>
                  <li>
                    For stainless steels, consider electrolytic etching.
                  </li>
                </ul>

                <h3>Uneven Etching</h3>
                <p>
                  <strong>Symptoms:</strong> Some areas etched, others not; patchy appearance.
                </p>
                <p>
                  <strong>Solutions:</strong>
                </p>
                <ul>
                  <li>
                    Ensure even application (swabbing technique).
                  </li>
                  <li>
                    Use immersion method for more uniform results.
                  </li>
                  <li>
                    Check for contamination on the polished surface.
                  </li>
                  <li>
                    Ensure sample is clean before etching.
                  </li>
                </ul>

                <h3>Staining</h3>
                <p>
                  <strong>Symptoms:</strong> Colored spots or stains on the surface.
                </p>
                <p>
                  <strong>Solutions:</strong>
                </p>
                <ul>
                  <li>
                    Rinse immediately and thoroughly after etching.
                  </li>
                  <li>
                    Use appropriate rinsing solvent (water vs. alcohol).
                  </li>
                  <li>
                    Dry completely to prevent water spots.
                  </li>
                  <li>
                    Clean the sample surface before etching.
                  </li>
                </ul>

                <h3>No Etching Effect</h3>
                <p>
                  <strong>Symptoms:</strong> Etchant appears to have no effect.
                </p>
                <p>
                  <strong>Solutions:</strong>
                </p>
                <ul>
                  <li>
                    Verify etchant is appropriate for the material.
                  </li>
                  <li>
                    Check etchant freshness (some etchants degrade over time).
                  </li>
                  <li>
                    Try a different etchant.
                  </li>
                  <li>
                    For resistant materials, use electrolytic etching.
                  </li>
                  <li>
                    Ensure the polished surface is clean and free of contamination.
                  </li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-6 rounded">
                  <p className="text-sm text-gray-700">
                    For more comprehensive troubleshooting guidance, see our 
                    <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold"> Troubleshooting Quick Reference</Link>.
                  </p>
                </div>
              </section>

              {/* CTA Section */}
              <div className="mt-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Find the Right Etchant for Your Material</h2>
                <p className="text-lg mb-6 text-gray-700">
                  Use our Etchant Selector tool to find the perfect etchant for your material and application, 
                  browse our comprehensive Etchants Database, or shop pre-mixed etchants.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/tools/etchant-selector"
                    className="btn-primary text-center"
                  >
                    Use Etchant Selector
                  </Link>
                  <Link 
                    href="/etchants"
                    className="btn-secondary text-center"
                  >
                    Browse Etchants Database
                  </Link>
                  <Link 
                    href="https://shop.metallographic.com/collections/etchants"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tertiary text-center"
                  >
                    Shop Etchants
                  </Link>
                </div>
              </div>

              {/* Related Guides */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                    → Polishing Methods
                  </Link>
                  <Link href="/guides/microstructural-analysis" className="text-primary-600 hover:underline font-semibold">
                    → Microstructural Analysis
                  </Link>
                  <Link href="/guides/stainless-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                    → Stainless Steel Preparation
                  </Link>
                  <Link href="/resources/common-etchants-guide" className="text-primary-600 hover:underline font-semibold">
                    → Common Etchants Reference
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

