import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GuideSideNav from '@/components/GuideSideNav';
import GlossaryTermTooltip from '@/components/GlossaryTermTooltip';
import MaterialTooltip from '@/components/MaterialTooltip';
import ProductLink from '@/components/ProductLink';
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo';

const guide = getGuideBySlug('castings-foundry-analysis')!;

export const metadata: Metadata = getGuideMetadata(guide);

const sections = [
  { id: 'introduction', label: 'Introduction to Castings Analysis' },
  { id: 'solidification-structure', label: 'Solidification Structure Analysis' },
  { id: 'dendrite-spacing', label: 'Dendrite Arm Spacing Measurement' },
  { id: 'casting-defects', label: 'Casting Defect Identification' },
  { id: 'grain-size-control', label: 'Grain Size Control in Cast Materials' },
  { id: 'sample-preparation', label: 'Sample Preparation for Castings' },
  { id: 'etching-techniques', label: 'Etching Techniques for Cast Materials' },
  { id: 'standards-references', label: 'Standards and References' },
  { id: 'conclusion', label: 'Conclusion' },
];

export default function CastingsFoundryAnalysisPage() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData } = getGuideStructuredData(guide);

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
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-6">Castings and Foundry Analysis in Metallography</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-800">
                <strong>Overview:</strong> Metallographic analysis of cast materials requires specialized techniques to evaluate solidification structures, measure dendrite arm spacing, identify casting defects, and assess grain size control. This guide covers the essential methods for analyzing foundry products.
              </p>
            </div>

            <section id="introduction" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Introduction to Castings Analysis</h2>
          <p className="mb-4">
            Cast materials present unique challenges and opportunities for metallographic analysis. Unlike wrought materials, castings retain the <GlossaryTermTooltip term="Solidification">solidification</GlossaryTermTooltip> structure from their formation, providing valuable information about the casting process, cooling conditions, and material quality. Understanding these structures is essential for quality control, process optimization, and failure analysis in foundry operations.
          </p>
          <p className="mb-4">
            The <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> of cast materials is directly influenced by the solidification process, which creates characteristic features such as <GlossaryTermTooltip term="Dendrite">dendrites</GlossaryTermTooltip>, <GlossaryTermTooltip term="Grain Boundary">grain boundaries</GlossaryTermTooltip>, and segregation patterns. These features can be analyzed to understand the casting conditions, predict material properties, and identify potential issues.
          </p>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/Dendrites.JPG"
              alt="Dendrite structure in cast material showing tree-like crystal growth during solidification"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">Dendrite structure in cast material. The tree-like crystal growth pattern is characteristic of solidification and provides information about cooling conditions and casting quality.</p>
          </div>
          <p className="mb-4">
            Key aspects of castings analysis include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Solidification structure characterization</li>
            <li>Dendrite arm spacing (DAS) measurement</li>
            <li>Casting <GlossaryTermTooltip term="Defect">defect</GlossaryTermTooltip> identification and classification</li>
            <li><GlossaryTermTooltip term="Grain Size">Grain size</GlossaryTermTooltip> and morphology evaluation</li>
            <li>Segregation and microstructural heterogeneity assessment</li>
          </ul>
        </section>

            <section id="solidification-structure" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Solidification Structure Analysis</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Understanding Solidification Structures</h3>
          <p className="mb-4">
            <GlossaryTermTooltip term="Solidification">Solidification</GlossaryTermTooltip> structures in cast materials reflect the conditions under which the material cooled and solidified. The primary solidification structure consists of <GlossaryTermTooltip term="Dendrite">dendrites</GlossaryTermTooltip>, which are tree-like crystalline structures that grow during solidification. The morphology and size of these dendrites provide critical information about cooling rates and casting conditions.
          </p>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/Gray iron, 2% nital, 400X.JPG"
              alt="Gray cast iron microstructure showing solidification structure and graphite flakes"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">Gray cast iron, 2% nital, 400X magnification. This microstructure shows the solidification structure typical of cast materials, with graphite flakes distributed in the ferrite matrix.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Types of Solidification Structures</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Columnar Dendrites</h4>
          <p className="mb-4">
            Columnar dendrites grow perpendicular to the mold wall and are characteristic of directional solidification:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Formed under moderate to high cooling rates</li>
            <li>Exhibit directional growth from the mold wall</li>
            <li>Common in sand castings and permanent mold castings</li>
            <li>Indicate unidirectional heat extraction</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Equiaxed Grains</h4>
          <p className="mb-4">
            Equiaxed grains form when solidification occurs uniformly in all directions:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Formed under rapid cooling or with grain refiners</li>
            <li>No preferred growth direction</li>
            <li>Common in investment castings and die castings</li>
            <li>Generally provide more uniform properties</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">3. Mixed Structures</h4>
          <p className="mb-4">
            Many castings exhibit a combination of columnar and equiaxed zones:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Columnar zone near mold walls (chill zone)</li>
            <li>Equiaxed zone in the center (equiaxed zone)</li>
            <li>Transition zone between the two</li>
            <li>Zone thickness indicates cooling conditions</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Analyzing Solidification Structures</h3>
          <p className="mb-4">
            To properly analyze solidification structures:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Select sections that represent different regions of the casting (surface, mid-thickness, center)</li>
            <li>Prepare samples to reveal the full solidification structure</li>
            <li>Use appropriate etching to highlight dendrite boundaries</li>
            <li>Document the structure at multiple magnifications</li>
            <li>Measure zone thicknesses and transition regions</li>
            <li>Correlate structure with casting process parameters</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Interpreting Solidification Structures</h3>
          <p className="mb-4">
            The solidification structure provides information about:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Cooling rate:</strong> Faster cooling produces finer structures</li>
            <li><strong>Temperature gradient:</strong> Steep gradients favor columnar growth</li>
            <li><strong>Mold material:</strong> Metal molds produce different structures than sand molds</li>
            <li><strong>Pouring temperature:</strong> Higher temperatures can affect grain size</li>
            <li><strong>Alloy composition:</strong> Some elements promote equiaxed structures</li>
          </ul>
        </section>

            <section id="dendrite-spacing" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Dendrite Arm Spacing Measurement</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">What is Dendrite Arm Spacing?</h3>
          <p className="mb-4">
            <GlossaryTermTooltip term="Dendrite">Dendrite</GlossaryTermTooltip> Arm Spacing (DAS) is the distance between adjacent secondary dendrite arms, measured perpendicular to the primary dendrite stem. DAS is a critical parameter because it directly correlates with cooling rate and affects mechanical properties. Finer DAS (smaller spacing) indicates faster cooling and generally results in improved mechanical properties.
          </p>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/Dendrites-2.jpg"
              alt="Dendrite structure showing primary and secondary arms for DAS measurement"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">Dendrite structure showing primary and secondary arms. The spacing between secondary arms (DAS) is measured perpendicular to the primary dendrite stem and correlates with cooling rate and mechanical properties.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Types of Dendrite Arm Spacing</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Primary Dendrite Arm Spacing (PDAS)</h4>
          <p className="mb-4">
            The spacing between primary dendrite stems:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Measured perpendicular to the growth direction</li>
            <li>Larger spacing than secondary arms</li>
            <li>Indicates overall solidification conditions</li>
            <li>Typically ranges from 50 to 500 micrometers</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Secondary Dendrite Arm Spacing (SDAS)</h4>
          <p className="mb-4">
            The spacing between secondary dendrite arms:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Most commonly measured parameter</li>
            <li>More sensitive to local cooling conditions</li>
            <li>Directly related to mechanical properties</li>
            <li>Typically ranges from 10 to 200 micrometers</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Measurement Methods</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">Linear Intercept Method</h4>
          <p className="mb-4">
            The most common method for measuring DAS:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Prepare a metallographic sample with proper <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> to reveal <GlossaryTermTooltip term="Dendrite">dendrites</GlossaryTermTooltip></li>
            <li>Place a test line or grid over the <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip> image</li>
            <li>Count the number of dendrite arm boundaries intersected by the line</li>
            <li>Measure the total line length</li>
            <li>Calculate DAS = (total line length) / (number of intersections)</li>
            <li>Repeat measurements in multiple locations and orientations</li>
            <li>Report the average and standard deviation</li>
          </ol>

          <h4 className="text-xl font-semibold mb-2 mt-4">Area Method</h4>
          <p className="mb-4">
            An alternative method using area measurements:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Identify a representative area containing multiple dendrite arms</li>
            <li>Count the number of dendrite arms in the area</li>
            <li>Measure the area</li>
            <li>Calculate DAS based on the square root of (area / number of arms)</li>
            <li>Use this method when dendrites are well-defined and uniformly distributed</li>
          </ol>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Best Practices for DAS Measurement</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Use high-quality <GlossaryTermTooltip term="Sample Preparation">sample preparation</GlossaryTermTooltip> to clearly reveal <GlossaryTermTooltip term="Dendrite">dendrite</GlossaryTermTooltip> boundaries</li>
            <li>Select representative areas avoiding casting <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip></li>
            <li>Make measurements at consistent locations (e.g., mid-thickness)</li>
            <li>Take multiple measurements (minimum 20-30) for statistical validity</li>
            <li>Measure in different orientations to account for anisotropy</li>
            <li>Use calibrated image analysis software when available</li>
            <li>Document measurement conditions and locations</li>
            <li>Report both mean and standard deviation values</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Accurate DAS measurement requires excellent <GlossaryTermTooltip term="Sample Preparation">sample preparation</GlossaryTermTooltip> and proper <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> to clearly reveal dendrite boundaries. Use high-quality <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> to avoid artifacts that could interfere with measurements.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Factors Affecting DAS</h3>
          <p className="mb-4">
            DAS is influenced by several factors:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Cooling rate:</strong> Faster cooling produces smaller DAS</li>
            <li><strong>Alloy composition:</strong> Some elements affect dendrite growth</li>
            <li><strong>Mold material:</strong> Metal molds produce finer DAS than sand molds</li>
            <li><strong>Section thickness:</strong> Thinner sections cool faster, producing finer DAS</li>
            <li><strong>Location in casting:</strong> Surface regions typically have finer DAS than center</li>
            <li><strong>Heat treatment:</strong> Can alter or eliminate dendrite structure</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Correlation with Properties</h3>
          <p className="mb-4">
            DAS correlates with mechanical properties:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Strength:</strong> Finer DAS generally increases yield and tensile strength</li>
            <li><strong>Ductility:</strong> Finer DAS can improve elongation and reduction of area</li>
            <li><strong>Toughness:</strong> Finer DAS typically improves impact toughness</li>
            <li><strong>Fatigue:</strong> Finer DAS can improve fatigue resistance</li>
            <li>These relationships vary by alloy system and should be established experimentally</li>
          </ul>
        </section>

            <section id="casting-defects" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Casting Defect Identification</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Common Casting Defects</h3>
          <p className="mb-4">
            Casting defects can significantly affect material properties and performance. Proper identification and classification are essential for quality control and process improvement. Defects can be categorized by their origin, appearance, and impact on properties.
          </p>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Porosity Defects</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Gas Porosity</h4>
          <p className="mb-4">
            Spherical or rounded pores caused by trapped gas:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Appearance: Round or spherical voids, often near the surface</li>
            <li>Causes: Hydrogen pickup, air entrainment, mold gas evolution</li>
            <li>Identification: Smooth, rounded surfaces; may be interconnected</li>
            <li>Impact: Reduces load-bearing area, stress concentrators</li>
            <li>Prevention: Proper degassing, mold venting, reduced moisture</li>
          </ul>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4 rounded">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> Porosity in castings can be difficult to distinguish from preparation artifacts. Ensure proper <GlossaryTermTooltip term="Sample Preparation">sample preparation</GlossaryTermTooltip> to avoid introducing artifacts that could be mistaken for casting defects.
            </p>
          </div>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Shrinkage Porosity</h4>
          <p className="mb-4">
            Irregular voids caused by inadequate feeding during solidification:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Appearance: Irregular, dendritic, or interconnected voids</li>
            <li>Causes: Insufficient riser size, poor gating design, rapid solidification</li>
            <li>Identification: Angular, irregular shapes; often in last-to-freeze regions</li>
            <li>Impact: Significant reduction in mechanical properties</li>
            <li>Prevention: Proper riser design, directional solidification, chills</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Inclusion Defects</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Oxide Inclusions</h4>
          <p className="mb-4">
            Non-metallic <GlossaryTermTooltip term="Inclusion">inclusion</GlossaryTermTooltip> particles trapped in the casting:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Appearance: Dark, irregular particles or stringers</li>
            <li>Causes: Oxidation during melting, poor fluxing, turbulence</li>
            <li>Identification: Dark appearance, often aligned with flow direction</li>
            <li>Impact: Reduces ductility, fatigue strength, and machinability</li>
            <li>Prevention: Proper fluxing, reduced turbulence, protective atmospheres</li>
          </ul>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/Inclusion-oxide-2.jpg"
              alt="Oxide inclusion in cast material showing dark irregular particles"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">Oxide inclusion in cast material. Inclusions appear as dark, irregular particles and can significantly affect material properties.</p>
          </div>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Slag Inclusions</h4>
          <p className="mb-4">
            Slag particles from the melting process:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Appearance: Dark, irregular, often glassy appearance</li>
            <li>Causes: Inadequate slag removal, poor skimming</li>
            <li>Identification: Different composition from matrix, often near surface</li>
            <li>Impact: Similar to oxide inclusions</li>
            <li>Prevention: Proper skimming, filtering, clean melting practices</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Segregation Defects</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Inverse Segregation</h4>
          <p className="mb-4">
            Concentration of alloying elements near the surface:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Appearance: Compositional differences visible after etching</li>
            <li>Causes: Interdendritic flow during solidification</li>
            <li>Identification: Etching reveals compositional variations</li>
            <li>Impact: Property variations, potential for localized corrosion</li>
            <li>Prevention: Controlled solidification, reduced pouring temperature</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Centerline Segregation</h4>
          <p className="mb-4">
            Concentration of elements in the center of the casting:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Appearance: Compositional band in center region</li>
            <li>Causes: Last-to-freeze region, solute rejection</li>
            <li>Identification: Microprobe analysis or selective etching</li>
            <li>Impact: Property variations, potential for cracking</li>
            <li>Prevention: Faster cooling, grain refinement</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Surface and Shape Defects</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Cold Shuts</h4>
          <p className="mb-4">
            Incomplete fusion between two metal streams:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Appearance: Linear defect with oxide film</li>
            <li>Causes: Low pouring temperature, slow filling, multiple gates</li>
            <li>Identification: Oxide film visible, incomplete bonding</li>
            <li>Impact: Significant reduction in strength and fatigue life</li>
            <li>Prevention: Higher pouring temperature, faster filling, single gate</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Hot Tears</h4>
          <p className="mb-4">
            Cracks formed during solidification:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Appearance: Irregular cracks, often in corners or thick sections</li>
            <li>Causes: Thermal stresses during solidification, mold constraint</li>
            <li>Identification: Intergranular or interdendritic cracks</li>
            <li>Impact: Complete loss of integrity in affected region</li>
            <li>Prevention: Reduced constraint, controlled cooling, proper design</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Defect Analysis Techniques</h3>
          <p className="mb-4">
            To properly identify and analyze casting defects:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Examine multiple sections through the defect</li>
            <li>Use appropriate <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> to reveal defect boundaries</li>
            <li>Document defect size, shape, and distribution</li>
            <li>Use higher magnification to examine defect surfaces</li>
            <li>Consider using SEM/EDS for composition analysis</li>
            <li>Correlate defect location with casting geometry</li>
            <li>Compare with known defect types and causes</li>
          </ul>
          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 my-4 rounded">
            <p className="text-sm text-gray-800">
              <strong>Equipment Note:</strong> Metallurgical microscopes are essential for detailed analysis of cast materials. They allow examination of <GlossaryTermTooltip term="Solidification">solidification</GlossaryTermTooltip> structures, <GlossaryTermTooltip term="Dendrite">dendrite</GlossaryTermTooltip> spacing, and casting <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip> at various magnifications. Digital imaging capabilities are particularly useful for DAS measurements and defect documentation.
            </p>
          </div>
          <ProductLink 
            productName="Metallurgical Microscopes"
            href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
            description="High-quality microscopes for analyzing cast materials, measuring DAS, and identifying casting defects"
          />

          <h3 className="text-2xl font-semibold mb-3 mt-6">Defect Classification Standards</h3>
          <p className="mb-4">
            Several standards provide guidance for defect classification:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>ASTM E155 - Standard Reference Radiographs for Inspection of Aluminum and Magnesium Castings</li>
            <li>ASTM E272 - Standard Reference Radiographs for High-Strength Copper-Base and Nickel-Copper Alloy Castings</li>
            <li>ASTM E446 - Standard Reference Radiographs for Steel Castings Up to 2 in. (51 mm) in Thickness</li>
            <li>ISO 11971 - Visual testing of fusion-welded joints</li>
            <li>Company-specific acceptance criteria based on application</li>
          </ul>
        </section>

            <section id="grain-size-control" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Grain Size Control in Cast Materials</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Importance of Grain Size Control</h3>
          <p className="mb-4">
            <GlossaryTermTooltip term="Grain Size">Grain size</GlossaryTermTooltip> significantly affects the mechanical properties of cast materials. Fine-grained structures generally provide better strength, ductility, and toughness. Understanding and controlling grain size is essential for producing high-quality castings with consistent properties.
          </p>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/Nodular cast iron, 2% nital, 400X (DIC).JPG"
              alt="Nodular cast iron showing grain structure and nodular graphite"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">Nodular cast iron, 2% nital, 400X magnification (DIC). This microstructure demonstrates grain structure control in cast materials, with nodular graphite distributed in the ferrite matrix.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Factors Affecting Grain Size</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Cooling Rate</h4>
          <p className="mb-4">
            Faster cooling rates produce finer grains:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Rapid cooling increases nucleation rate</li>
            <li>Less time for grain growth</li>
            <li>Metal molds produce finer grains than sand molds</li>
            <li>Thinner sections cool faster and have finer grains</li>
            <li>Chills can be used to locally increase cooling rate</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Grain Refiners</h4>
          <p className="mb-4">
            Additions that promote nucleation:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>TiB<sub>2</sub> for aluminum alloys</li>
            <li>Zirconium for magnesium alloys</li>
            <li>Rare earth elements for various alloys</li>
            <li>Provide nucleation sites for new grains</li>
            <li>Must be properly distributed in the melt</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">3. Pouring Temperature</h4>
          <p className="mb-4">
            Temperature at which metal is poured:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Lower pouring temperatures can promote finer grains</li>
            <li>Higher temperatures allow more grain growth</li>
            <li>Must balance with fluidity requirements</li>
            <li>Affects both nucleation and growth</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">4. Alloy Composition</h4>
          <p className="mb-4">
            Some elements naturally promote fine grains:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Elements that form intermetallic compounds</li>
            <li>Elements that affect solidification range</li>
            <li>Impurities can sometimes act as nucleants</li>
            <li>Composition affects both nucleation and growth</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Grain Size Measurement Methods</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Linear Intercept Method (ASTM E112)</h4>
          <p className="mb-4">
            The standard method for <GlossaryTermTooltip term="Grain Size">grain size</GlossaryTermTooltip> measurement:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Prepare sample with appropriate <GlossaryTermTooltip term="Etching">etching</GlossaryTermTooltip> to reveal <GlossaryTermTooltip term="Grain Boundary">grain boundaries</GlossaryTermTooltip></li>
            <li>Place test lines or circles over the <GlossaryTermTooltip term="Microstructure">microstructure</GlossaryTermTooltip></li>
            <li>Count grain boundary intersections</li>
            <li>Calculate mean intercept length</li>
            <li>Convert to ASTM grain size number (G)</li>
            <li>Report average and standard deviation</li>
          </ol>
          <p className="mb-4">
            See our <Link href="/tools/grain-size-calculator" className="text-blue-600 hover:underline">grain size calculator</Link> tool for assistance with these calculations.
          </p>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Planimetric Method</h4>
          <p className="mb-4">
            Counting grains within a known area:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Count the number of grains in a known area</li>
            <li>Account for grains on boundaries (count as 0.5)</li>
            <li>Calculate grains per unit area</li>
            <li>Convert to ASTM grain size number</li>
          </ol>

          <h4 className="text-xl font-semibold mb-2 mt-4">3. Comparison Method</h4>
          <p className="mb-4">
            Comparing with standard charts:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use standard grain size charts (ASTM E112)</li>
            <li>Compare microstructure with chart images</li>
            <li>Estimate grain size number</li>
            <li>Less accurate but faster than measurement methods</li>
            <li>Useful for quick assessments</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Grain Size Control Techniques</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">1. Process Control</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Control pouring temperature within specified range</li>
            <li>Optimize mold design for desired cooling rates</li>
            <li>Use chills to increase local cooling rates</li>
            <li>Control mold preheat temperature</li>
            <li>Optimize gating and riser design</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> The relationship between cooling rate and <GlossaryTermTooltip term="Grain Size">grain size</GlossaryTermTooltip> follows the Hall-Petch relationship, where finer grains generally provide improved mechanical properties. Controlling the casting process parameters directly affects the final grain structure.
            </p>
          </div>

          <h4 className="text-xl font-semibold mb-2 mt-4">2. Grain Refinement</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Add appropriate grain refiners to the melt</li>
            <li>Ensure proper distribution and dissolution</li>
            <li>Control addition temperature and time</li>
            <li>Monitor grain refiner effectiveness</li>
            <li>Adjust addition rates based on results</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">3. Heat Treatment</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Solution treatment can homogenize structure</li>
            <li>Recrystallization can refine grains in some cases</li>
            <li>Cannot refine as-cast grains but can modify structure</li>
            <li>Use appropriate temperatures and times</li>
            <li>Consider effect on other properties</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Grain Size Specifications</h3>
          <p className="mb-4">
            Grain size requirements vary by application:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>General castings: ASTM 1-4 (coarse to medium)</li>
            <li>High-performance castings: ASTM 4-7 (medium to fine)</li>
            <li>Precision castings: ASTM 5-8 (fine to very fine)</li>
            <li>Specifications often include maximum grain size</li>
            <li>May specify different requirements for different regions</li>
            <li>Consider both average and maximum grain size</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Grain Size and Properties</h3>
          <p className="mb-4">
            The Hall-Petch relationship describes the effect of grain size on strength:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Finer grains increase yield strength</li>
            <li>Finer grains generally improve ductility</li>
            <li>Finer grains improve toughness and impact resistance</li>
            <li>Finer grains can improve fatigue properties</li>
            <li>Relationship varies by alloy and condition</li>
            <li>Must balance with other property requirements</li>
          </ul>
        </section>

            <section id="sample-preparation" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Sample Preparation for Castings</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Special Considerations for Cast Materials</h3>
          <p className="mb-4">
            Cast materials require careful sample preparation to preserve the solidification structure and reveal casting defects. The preparation process must avoid introducing artifacts that could be mistaken for casting features.
          </p>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Sectioning</h3>
          <p className="mb-4">
            When <GlossaryTermTooltip term="Sectioning">sectioning</GlossaryTermTooltip> cast samples:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Select locations that represent different regions (surface, mid-thickness, center)</li>
            <li>Section perpendicular to expected solidification direction when possible</li>
            <li>Use appropriate cutting speeds to avoid excessive heating</li>
            <li>Preserve casting defects - avoid cutting through critical defects</li>
            <li>Document section location relative to casting geometry</li>
            <li>Use coolant to prevent thermal damage</li>
          </ul>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Link 
              href="https://metallographic.com/metallographic-equipment/abrasive-sectioning.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity"
            >
              <Image
                src="/images/consumables/sectioning-cover.webp"
                alt="Sectioning equipment and consumables for cast materials"
                width={600}
                height={450}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
              />
            </Link>
            <p className="text-sm text-gray-600 mt-2 italic text-center">Sectioning equipment and consumables. Proper sectioning is critical for preserving casting features and defects during sample preparation.</p>
          </div>
          <p className="mb-4">
            Refer to our <Link href="/guides/sectioning" className="text-blue-600 hover:underline">sectioning guide</Link> for detailed techniques.
          </p>
          <ProductLink 
            productName="Abrasive Sectioning Equipment"
            href="https://metallographic.com/metallographic-equipment/abrasive-sectioning.html"
            description="Automated and manual cutters for sectioning cast materials while preserving microstructure"
          />

          <h3 className="text-2xl font-semibold mb-3 mt-6">Mounting</h3>
          <p className="mb-4">
            <GlossaryTermTooltip term="Mounting">Mounting</GlossaryTermTooltip> considerations for castings:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use appropriate mounting material to preserve edges</li>
            <li>Consider vacuum impregnation for porous castings</li>
            <li>Protect casting defects during mounting</li>
            <li>Ensure good edge retention for surface analysis</li>
            <li>Use <GlossaryTermTooltip term="Compression Mounting">compression mounting</GlossaryTermTooltip> for most applications</li>
            <li>Consider <GlossaryTermTooltip term="Castable Mounting">castable mounting</GlossaryTermTooltip> for delicate samples</li>
          </ul>
          <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
            <Link 
              href="https://shop.metallographic.com/collections/mounting-materials"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity"
            >
              <Image
                src="/images/consumables/mounting-cover.webp"
                alt="Mounting materials for cast samples"
                width={500}
                height={375}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
              />
            </Link>
            <p className="text-sm text-gray-600 mt-2 italic text-center">Mounting materials for cast samples. Vacuum impregnation may be necessary for porous castings to preserve defect structure.</p>
          </div>
          <p className="mb-4">
            See our <Link href="/guides/mounting" className="text-blue-600 hover:underline">mounting guide</Link> for more information.
          </p>
          <ProductLink 
            productName="Mounting Materials"
            href="https://shop.metallographic.com/collections/mounting-materials"
            description="Compression and castable mounting materials suitable for cast materials, including vacuum impregnation systems for porous samples"
          />

          <h3 className="text-2xl font-semibold mb-3 mt-6">Grinding and Polishing</h3>
          <p className="mb-4">
            <GlossaryTermTooltip term="Grinding">Grinding</GlossaryTermTooltip> and <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> cast materials:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Follow standard progressive grinding procedures</li>
            <li>Use appropriate pressure to avoid pulling out inclusions</li>
            <li>Be careful around porosity - avoid filling with abrasive</li>
            <li>Use <GlossaryTermTooltip term="Diamond Polishing">diamond polishing</GlossaryTermTooltip> for hard phases</li>
            <li>Achieve scratch-free surface for accurate analysis</li>
            <li>Clean thoroughly between steps to avoid contamination</li>
            <li>Use final polishing to remove deformation</li>
          </ul>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Link 
              href="https://shop.metallographic.com/collections/sic-grinding"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity"
            >
              <Image
                src="/images/consumables/grinding & lapping-cover.webp"
                alt="Grinding and polishing consumables for cast materials"
                width={600}
                height={450}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
              />
            </Link>
            <p className="text-sm text-gray-600 mt-2 italic text-center">Grinding and lapping consumables. Progressive grinding removes sectioning damage while preserving casting features like dendrites and defects.</p>
          </div>
          <p className="mb-4">
            See our <Link href="/guides/grinding-techniques" className="text-blue-600 hover:underline">grinding</Link> and <Link href="/guides/polishing-methods" className="text-blue-600 hover:underline">polishing</Link> guides for detailed procedures.
          </p>
          <ProductLink 
            productName="Grinding and Polishing Consumables"
            href="https://shop.metallographic.com/collections/sic-grinding"
            description="Silicon carbide papers, diamond suspensions, and polishing cloths for preparing cast materials"
          />

          <h3 className="text-2xl font-semibold mb-3 mt-6">Preserving Casting Features</h3>
          <p className="mb-4">
            Special techniques to preserve casting features:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Avoid excessive <GlossaryTermTooltip term="Polishing">polishing</GlossaryTermTooltip> that could round off <GlossaryTermTooltip term="Dendrite">dendrite</GlossaryTermTooltip> arms</li>
            <li>Use appropriate polishing cloths to maintain feature definition</li>
            <li>Be careful not to pull out <GlossaryTermTooltip term="Inclusion">inclusions</GlossaryTermTooltip> or fill porosity</li>
            <li>Use low nap cloths for final polish to maintain sharp features</li>
            <li>Consider using vibratory polishing for delicate structures</li>
            <li>Document any preparation artifacts</li>
          </ul>
          <ProductLink 
            productName="Polishing Cloths and Pads"
            href="https://shop.metallographic.com/collections/polishing-pads"
            description="Specialized polishing cloths for maintaining feature definition in cast materials, including low-nap options for preserving dendrite structure"
          />
        </section>

            <section id="etching-techniques" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Etching Techniques for Cast Materials</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Etching Objectives</h3>
          <p className="mb-4">
            <GlossaryTermTooltip term="Etching">Etching</GlossaryTermTooltip> cast materials serves several purposes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Reveal <GlossaryTermTooltip term="Grain Boundary">grain boundaries</GlossaryTermTooltip> and <GlossaryTermTooltip term="Grain Size">grain size</GlossaryTermTooltip></li>
            <li>Highlight <GlossaryTermTooltip term="Dendrite">dendrite</GlossaryTermTooltip> structure and DAS</li>
            <li>Distinguish different phases and constituents</li>
            <li>Reveal segregation patterns</li>
            <li>Highlight casting <GlossaryTermTooltip term="Defect">defects</GlossaryTermTooltip></li>
            <li>Show microstructural heterogeneity</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Common Etchants for Cast Materials</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">Aluminum Castings</h4>
          <p className="mb-4">
            Common cast aluminum alloys include <MaterialTooltip materialName="Aluminum 6061">6061</MaterialTooltip> and <MaterialTooltip materialName="Aluminum 7075">7075</MaterialTooltip>, though many foundry-specific alloys are used. Etching techniques vary by alloy composition:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Keller's reagent:</strong> Reveals <GlossaryTermTooltip term="Grain Boundary">grain boundaries</GlossaryTermTooltip> and phases</li>
            <li><strong>Weck's reagent:</strong> Colors different phases</li>
            <li><strong>Poulton's reagent:</strong> For silicon phase identification</li>
            <li><strong>Anodizing:</strong> For grain structure and orientation</li>
          </ul>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/Aluminum-silicon, Kellers, 400X.JPG"
              alt="Aluminum-silicon cast alloy microstructure etched with Keller's reagent showing grain boundaries and silicon phase"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">Aluminum-silicon cast alloy, Keller's reagent, 400X magnification. This microstructure demonstrates proper etching to reveal grain boundaries and silicon phase distribution in cast aluminum.</p>
          </div>

          <h4 className="text-xl font-semibold mb-2 mt-4">Steel and Cast Iron Castings</h4>
          <p className="mb-4">
            Cast steels and cast irons including <MaterialTooltip materialName="Ductile Cast Iron">ductile cast iron</MaterialTooltip> (nodular iron) and <MaterialTooltip materialName="White Cast Iron">white cast iron</MaterialTooltip> require specific etching techniques:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Nital (2-5%):</strong> Standard etchant for ferrite and pearlite</li>
            <li><strong>Picral:</strong> For revealing pearlite structure</li>
            <li><strong>Vilella's reagent:</strong> For complex structures</li>
            <li><strong>Beraha's reagents:</strong> For color contrast</li>
          </ul>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/White cast iron, as-polished, 400X.JPG"
              alt="White cast iron microstructure showing cementite and pearlite structure"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">White cast iron, as-polished, 400X magnification. Cast iron microstructures require appropriate etching to reveal the solidification structure and phase distribution.</p>
          </div>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/Gray iron, 2% nital, 1000X.JPG"
              alt="Gray cast iron at high magnification showing graphite flakes and matrix structure"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">Gray cast iron, 2% nital, 1000X magnification. High magnification reveals the detailed structure of graphite flakes and the ferrite/pearlite matrix.</p>
          </div>
          <ProductLink 
            productName="Etchants and Chemical Reagents"
            href="https://shop.metallographic.com/collections/etching"
            description="Chemical etchants for revealing microstructures in cast materials including aluminum, steel, and cast iron alloys"
          />

          <h4 className="text-xl font-semibold mb-2 mt-4">Copper Alloy Castings</h4>
          <p className="mb-4">
            Cast copper alloys including bronzes and brasses require specific etching techniques:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Ammonium hydroxide + hydrogen peroxide:</strong> For general structure</li>
            <li><strong>Potassium dichromate:</strong> For phase identification</li>
            <li><strong>Ferric chloride:</strong> For alpha and beta phases</li>
          </ul>
          <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
            <Image
              src="/images/microstructures/Mn-Al Bronze (alcoholic FeCl3) 400X.JPG"
              alt="Manganese-aluminum bronze cast alloy microstructure showing phase distribution"
              width={600}
              height={450}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">Manganese-aluminum bronze, alcoholic ferric chloride, 400X magnification. This cast bronze alloy shows the complex phase structure typical of cast copper alloys.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Etching for Specific Features</h3>
          
          <h4 className="text-xl font-semibold mb-2 mt-4">Revealing Dendrite Structure</h4>
          <p className="mb-4">
            To clearly reveal dendrite boundaries:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use etchants that attack interdendritic regions</li>
            <li>Control etching time to avoid over-etching</li>
            <li>May require multiple etching steps</li>
            <li>Use appropriate magnification to observe structure</li>
            <li>Consider using color etchants for better contrast</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">Highlighting Segregation</h4>
          <p className="mb-4">
            To reveal segregation patterns:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use selective etchants that attack segregated regions</li>
            <li>Color etchants can highlight compositional differences</li>
            <li>May require microprobe analysis for confirmation</li>
            <li>Document etching conditions for reproducibility</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2 mt-4">Defect Identification</h4>
          <p className="mb-4">
            Etching can help identify casting defects:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Oxide films in cold shuts become more visible</li>
            <li>Porosity boundaries are highlighted</li>
            <li>Inclusions stand out from the matrix</li>
            <li>Hot tears show as etched cracks</li>
            <li>Use appropriate etchants for the alloy system</li>
          </ul>

          <p className="mb-4">
            See our <Link href="/guides/etching-procedures" className="text-blue-600 hover:underline">etching procedures guide</Link> and <Link href="/etchants" className="text-blue-600 hover:underline">etchant database</Link> for more information on specific etchants.
          </p>
        </section>

            <section id="standards-references" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Standards and References</h2>
          <p className="mb-4">
            Several standards provide guidance for castings analysis:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>ASTM E3 - Standard Practice for Preparation of Metallographic Specimens</li>
            <li>ASTM E112 - Standard Test Methods for Determining Average Grain Size</li>
            <li>ASTM E155 - Standard Reference Radiographs for Inspection of Aluminum and Magnesium Castings</li>
            <li>ASTM E446 - Standard Reference Radiographs for Steel Castings Up to 2 in. (51 mm) in Thickness</li>
            <li>ASTM E883 - Standard Guide for Reflected-Light Photomicrography</li>
            <li>ASTM E2283 - Standard Practice for Extreme Value Analysis of Nonmetallic Inclusions in Steel and Other Microstructural Features</li>
            <li>ASM Handbook Volume 9 - Metallography and Microstructures</li>
            <li>ASM Handbook Volume 15 - Casting</li>
            <li>ISO 11971 - Visual testing of fusion-welded joints</li>
          </ul>
          <p className="mb-4">
            Refer to our <Link href="/resources/astm-standards-reference" className="text-blue-600 hover:underline">ASTM standards reference</Link> for more information.
          </p>
        </section>

            <section id="conclusion" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
          <p className="mb-4">
            Metallographic analysis of cast materials provides essential information about solidification structure, casting quality, and material properties. Understanding how to analyze solidification structures, measure dendrite arm spacing, identify casting defects, and evaluate grain size is critical for quality control and process optimization in foundry operations.
          </p>
          <p className="mb-4">
            Key points for successful castings analysis:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Proper sample preparation to preserve casting features</li>
            <li>Appropriate etching to reveal structures and defects</li>
            <li>Systematic measurement of DAS and grain size</li>
            <li>Thorough identification and classification of defects</li>
            <li>Correlation of microstructural features with casting process</li>
            <li>Documentation of all observations and measurements</li>
          </ul>
          <p className="mb-4">
            For more information on metallographic techniques, see our guides on <Link href="/guides/sectioning" className="text-blue-600 hover:underline">sectioning</Link>, <Link href="/guides/grinding-techniques" className="text-blue-600 hover:underline">grinding</Link>, <Link href="/guides/polishing-methods" className="text-blue-600 hover:underline">polishing</Link>, <Link href="/guides/etching-procedures" className="text-blue-600 hover:underline">etching</Link>, and <Link href="/guides/microstructural-analysis" className="text-blue-600 hover:underline">microstructural analysis</Link>.
          </p>
        </section>

            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/microstructural-analysis" className="block p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Microstructural Analysis</h3>
                  <p className="text-gray-600">Learn techniques for analyzing material microstructures</p>
                </Link>
                <Link href="/guides/failure-analysis" className="block p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Failure Analysis</h3>
                  <p className="text-gray-600">Techniques for investigating material failures</p>
                </Link>
                <Link href="/guides/quality-control-inspection" className="block p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Quality Control and Inspection</h3>
                  <p className="text-gray-600">Evaluating sample quality and meeting standards</p>
                </Link>
                <Link href="/guides/etching-procedures" className="block p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Etching Procedures</h3>
                  <p className="text-gray-600">Techniques for revealing microstructures</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </article>
    </>
  );
}

