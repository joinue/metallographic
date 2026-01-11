export interface GlossaryTerm {
  term: string
  definition: string
  category: 'Microstructure' | 'Sample Preparation' | 'Equipment' | 'Material Science' | 'Analysis' | 'General'
  relatedTerms?: string[]
  example?: string
  pronunciation?: string
}

export const glossaryTerms: GlossaryTerm[] = [
  // Microstructure Terms
  {
    term: 'Microstructure',
    definition: 'The internal structure of a material as observed under a microscope, including grains, phases, grain boundaries, and other features that determine material properties.',
    category: 'Microstructure',
    relatedTerms: ['Grain', 'Phase', 'Grain Boundary'],
    example: 'The microstructure of steel reveals ferrite and pearlite phases that determine its mechanical properties.',
  },
  {
    term: 'Grain',
    definition: 'An individual crystal within a polycrystalline material. Grains are separated by grain boundaries and their size significantly affects material properties such as strength and toughness.',
    category: 'Microstructure',
    relatedTerms: ['Grain Boundary', 'Grain Size', 'Polycrystalline'],
    example: 'Fine-grained materials typically exhibit higher strength than coarse-grained materials.',
  },
  {
    term: 'Grain Boundary',
    definition: 'The interface between adjacent grains where atoms are less regularly arranged. Grain boundaries can affect material properties and serve as sites for phase transformations.',
    category: 'Microstructure',
    relatedTerms: ['Grain', 'Grain Size'],
    example: 'Grain boundaries are often revealed by etching and appear as dark lines separating individual grains.',
  },
  {
    term: 'Grain Size',
    definition: 'A measure of the average size of grains in a material, typically expressed as ASTM grain size number or average grain diameter. Smaller grain sizes generally correlate with higher strength.',
    category: 'Microstructure',
    relatedTerms: ['Grain', 'ASTM Grain Size'],
    example: 'ASTM grain size number 8 indicates finer grains than grain size number 4.',
  },
  {
    term: 'Phase',
    definition: 'A distinct region in a material with uniform chemical composition and crystal structure. Materials can contain multiple phases (e.g., ferrite and cementite in steel).',
    category: 'Microstructure',
    relatedTerms: ['Microstructure', 'Ferrite', 'Cementite'],
    example: 'Steel contains multiple phases including ferrite (iron) and cementite (iron carbide).',
  },
  {
    term: 'Ferrite',
    definition: 'A body-centered cubic (BCC) phase of iron that contains little or no carbon. It is soft, ductile, and magnetic at room temperature.',
    category: 'Microstructure',
    relatedTerms: ['Phase', 'Cementite', 'Pearlite'],
    example: 'Low-carbon steels consist primarily of ferrite, giving them good ductility.',
  },
  {
    term: 'Cementite',
    definition: 'A hard, brittle phase of iron carbide (Fe3C) that forms in steel. Its appearance in etched microstructures depends on the etchant: appears dark with nital, light/white with picral.',
    category: 'Microstructure',
    relatedTerms: ['Phase', 'Ferrite', 'Pearlite'],
    example: 'Cementite provides hardness to steel but reduces ductility.',
  },
  {
    term: 'Pearlite',
    definition: 'A lamellar microstructure consisting of alternating layers of ferrite and cementite. It forms during slow cooling of steel and provides a balance of strength and ductility.',
    category: 'Microstructure',
    relatedTerms: ['Ferrite', 'Cementite', 'Phase'],
    example: 'Eutectoid steel at room temperature consists entirely of pearlite.',
  },
  {
    term: 'Austenite',
    definition: 'A face-centered cubic (FCC) phase of iron that exists at high temperatures. It can transform to ferrite, pearlite, or martensite depending on cooling rate.',
    category: 'Microstructure',
    relatedTerms: ['Phase', 'Martensite', 'Heat Treatment'],
    example: 'Steel is heated to the austenite region before quenching to form martensite.',
  },
  {
    term: 'Martensite',
    definition: 'A hard, brittle phase formed by rapid cooling (quenching) of austenite. It has a needle-like or lath-like appearance and provides high hardness but low ductility.',
    category: 'Microstructure',
    relatedTerms: ['Austenite', 'Quenching', 'Heat Treatment'],
    example: 'Martensite formation requires rapid cooling to prevent transformation to softer phases.',
  },
  {
    term: 'Precipitate',
    definition: 'Small particles of a second phase that form within the primary phase, typically during aging or heat treatment. Precipitates can strengthen materials.',
    category: 'Microstructure',
    relatedTerms: ['Phase', 'Aging', 'Heat Treatment'],
    example: 'Aluminum alloys are strengthened by fine precipitates that form during aging.',
  },
  {
    term: 'Inclusion',
    definition: 'Non-metallic particles or compounds embedded in a metal matrix, typically oxides, sulfides, or silicates. Inclusions can affect material properties and machinability.',
    category: 'Microstructure',
    relatedTerms: ['Defect', 'Microstructure'],
    example: 'Manganese sulfide inclusions improve machinability in steel.',
  },
  {
    term: 'Defect',
    definition: 'Imperfections in material structure such as inclusions, voids, cracks, or dislocations that can affect material properties and performance.',
    category: 'Microstructure',
    relatedTerms: ['Inclusion', 'Void', 'Crack'],
  },

  // Sample Preparation Terms
  {
    term: 'Sectioning',
    definition: 'The process of cutting a representative sample from a larger workpiece using abrasive or diamond cutting equipment. The first step in metallographic sample preparation.',
    category: 'Sample Preparation',
    relatedTerms: ['Mounting', 'Abrasive Cutting', 'Precision Wafering'],
    example: 'Sectioning should minimize damage and heat generation to preserve the true microstructure.',
  },
  {
    term: 'Abrasive Cutting',
    definition: 'A sectioning method using rotating abrasive wheels to cut through materials. Versatile and suitable for a wide range of materials and sizes.',
    category: 'Sample Preparation',
    relatedTerms: ['Sectioning', 'Precision Wafering'],
    example: 'Abrasive cutting is commonly used for standard metal samples and larger workpieces.',
  },
  {
    term: 'Precision Wafering',
    definition: 'A sectioning method using thin diamond or CBN blades to make precise, low-damage cuts. Ideal for delicate materials, thin sections, and applications requiring minimal damage.',
    category: 'Sample Preparation',
    relatedTerms: ['Sectioning', 'Abrasive Cutting'],
    example: 'Precision wafering is preferred for brittle materials like ceramics and semiconductors.',
  },
  {
    term: 'Mounting',
    definition: 'The process of embedding a sample in resin material to create a standardized, easy-to-handle mount. Makes samples easier to process through grinding, polishing, and analysis.',
    category: 'Sample Preparation',
    relatedTerms: ['Compression Mounting', 'Castable Mounting', 'Sectioning'],
    example: 'Mounting transforms irregularly shaped samples into uniform mounts suitable for automated processing.',
  },
  {
    term: 'Preparation',
    definition: 'The complete sequence of steps required to transform a raw material sample into a specimen suitable for microscopic examination. Includes sectioning, mounting, grinding, polishing, and etching.',
    category: 'Sample Preparation',
    relatedTerms: ['Sectioning', 'Mounting', 'Grinding', 'Polishing', 'Etching'],
    example: 'Proper preparation is essential for accurate microstructural analysis.',
  },
  {
    term: 'Compression Mounting',
    definition: 'A mounting method where resin pellets are heated and compressed under high pressure to form a solid mount. Fast (5-15 minutes) and produces hard, durable mounts.',
    category: 'Sample Preparation',
    relatedTerms: ['Mounting', 'Castable Mounting'],
    example: 'Compression mounting is ideal for high-throughput laboratories and standard metal samples.',
  },
  {
    term: 'Castable Mounting',
    definition: 'A mounting method where liquid resin is poured into a mold and allowed to cure at room temperature or with minimal heating. Ideal for delicate, heat-sensitive samples.',
    category: 'Sample Preparation',
    relatedTerms: ['Mounting', 'Compression Mounting'],
    example: 'Castable mounting is preferred for samples that cannot withstand high temperatures or pressure.',
  },
  {
    term: 'Grinding',
    definition: 'The process of removing sectioning damage and preparing the surface using progressively finer abrasives. Creates a uniform scratch pattern that can be removed during polishing.',
    category: 'Sample Preparation',
    relatedTerms: ['Polishing', 'Grit', 'Abrasive'],
    example: 'Grinding typically progresses from 120 grit to 600 or 1200 grit before polishing.',
  },
  {
    term: 'Grit',
    definition: 'A measure of abrasive particle size. Lower grit numbers indicate coarser abrasives (larger particles), while higher numbers indicate finer abrasives. Common grit standards include FEPA, ANSI, and JIS.',
    category: 'Sample Preparation',
    relatedTerms: ['Grinding', 'Abrasive', 'Grit Size'],
    example: 'Start grinding with 120 grit to remove sectioning damage, then progress to finer grits.',
  },
  {
    term: 'Polishing',
    definition: 'The final step in sample preparation that removes grinding scratches and creates a mirror-like surface suitable for microstructural analysis. Typically uses diamond or oxide abrasives.',
    category: 'Sample Preparation',
    relatedTerms: ['Grinding', 'Diamond Polishing', 'Final Polishing'],
    example: 'Polishing progresses from 9 μm diamond to 3 μm, then 1 μm, and finally oxide polishing.',
  },
  {
    term: 'Diamond Polishing',
    definition: 'A polishing method using diamond abrasives in various particle sizes (typically 9 μm, 3 μm, 1 μm, 0.25 μm) to remove grinding scratches and prepare the surface for final polishing.',
    category: 'Sample Preparation',
    relatedTerms: ['Polishing', 'Oxide Polishing'],
    example: 'Diamond polishing is the primary method for removing grinding scratches from most materials.',
  },
  {
    term: 'Oxide Polishing',
    definition: 'Final polishing using fine oxide suspensions (typically colloidal silica or alumina) to create a mirror-like, scratch-free surface. Removes any remaining fine scratches from diamond polishing.',
    category: 'Sample Preparation',
    relatedTerms: ['Polishing', 'Diamond Polishing', 'Final Polishing'],
    example: 'Oxide polishing with colloidal silica produces excellent results for most materials.',
  },
  {
    term: 'Etching',
    definition: 'The process of applying chemical reagents to reveal microstructural features. Etching attacks different phases and grain boundaries at different rates, creating contrast.',
    category: 'Sample Preparation',
    relatedTerms: ['Etchant', 'Microstructure'],
    example: 'Nital (nitric acid in alcohol) is commonly used to etch steel and reveal grain boundaries.',
  },
  {
    term: 'Etchant',
    definition: 'A chemical reagent used to etch (chemically attack) a polished sample surface to reveal microstructural features. Different etchants reveal different features.',
    category: 'Sample Preparation',
    relatedTerms: ['Etching', 'Reagent'],
    example: 'Kalling\'s No. 2 etchant is used to reveal the microstructure of stainless steel.',
  },
  {
    term: 'Relief',
    definition: 'A polishing artifact where different phases or features stand above or below the polished surface due to different removal rates. Can be minimized with proper polishing technique.',
    category: 'Sample Preparation',
    relatedTerms: ['Polishing', 'Artifact'],
    example: 'Hard phases may stand in relief above softer phases if polishing pressure is too high.',
  },
  {
    term: 'Artifact',
    definition: 'A feature in a microstructure that is not part of the true material structure but is introduced during sample preparation. Examples include scratches, contamination, relief, and smearing.',
    category: 'Sample Preparation',
    relatedTerms: ['Relief', 'Scratch', 'Contamination'],
    example: 'Preparation artifacts must be distinguished from true microstructural features.',
  },
  {
    term: 'Smearing',
    definition: 'A polishing artifact where soft material is smeared across the surface, obscuring the true microstructure. Common in soft materials like aluminum and copper.',
    category: 'Sample Preparation',
    relatedTerms: ['Artifact', 'Polishing'],
    example: 'Smearing in aluminum can be prevented by using appropriate polishing cloths and techniques.',
  },

  // Equipment Terms
  {
    term: 'Abrasive Cutter',
    definition: 'Equipment used for sectioning samples using rotating abrasive wheels. Suitable for a wide range of materials and sample sizes.',
    category: 'Equipment',
    relatedTerms: ['Sectioning', 'Precision Wafering Saw'],
  },
  {
    term: 'Precision Wafering Saw',
    definition: 'Equipment used for precision sectioning with thin diamond or CBN blades. Produces low-damage cuts ideal for delicate materials.',
    category: 'Equipment',
    relatedTerms: ['Sectioning', 'Abrasive Cutter'],
  },
  {
    term: 'Mounting Press',
    definition: 'Equipment used for compression mounting. Applies heat and pressure to form solid mounts from resin pellets.',
    category: 'Equipment',
    relatedTerms: ['Compression Mounting', 'Mounting'],
  },
  {
    term: 'Grinding/Polishing Machine',
    definition: 'Equipment used for automated grinding and polishing of samples. Can be manual or fully automated with programmable parameters.',
    category: 'Equipment',
    relatedTerms: ['Grinding', 'Polishing'],
  },
  {
    term: 'Vibratory Polisher',
    definition: 'Equipment that uses vibration to polish samples. Eliminates subsurface damage and produces superior surface finishes, ideal for EBSD preparation.',
    category: 'Equipment',
    relatedTerms: ['Polishing', 'Vibratory Polishing'],
  },
  {
    term: 'Metallographic Microscope',
    definition: 'A microscope designed for observing polished and etched metallographic samples. Typically includes reflected light illumination and various magnification options.',
    category: 'Equipment',
    relatedTerms: ['Microstructure', 'Analysis'],
  },

  // Material Science Terms
  {
    term: 'Alloy',
    definition: 'A metallic material composed of two or more elements, at least one of which is a metal. Alloys typically have improved properties compared to pure metals.',
    category: 'Material Science',
    relatedTerms: ['Metal', 'Composition'],
    example: 'Steel is an alloy of iron and carbon, often with additional alloying elements.',
  },
  {
    term: 'Heat Treatment',
    definition: 'Controlled heating and cooling processes used to alter material properties. Common treatments include annealing, quenching, tempering, and aging.',
    category: 'Material Science',
    relatedTerms: ['Annealing', 'Quenching', 'Tempering'],
    example: 'Heat treatment can increase hardness, strength, or improve machinability.',
  },
  {
    term: 'Annealing',
    definition: 'A heat treatment process that involves heating a material to a specific temperature and slowly cooling it to soften the material, relieve stresses, or alter microstructure.',
    category: 'Material Science',
    relatedTerms: ['Heat Treatment', 'Quenching'],
    example: 'Annealing is used to soften cold-worked materials and improve ductility.',
  },
  {
    term: 'Quenching',
    definition: 'Rapid cooling of a material from high temperature, typically in water, oil, or air. Used to form hard phases like martensite in steel.',
    category: 'Material Science',
    relatedTerms: ['Heat Treatment', 'Martensite', 'Tempering'],
    example: 'Rapid quenching of steel from the austenite region forms hard martensite.',
  },
  {
    term: 'Tempering',
    definition: 'A heat treatment process where quenched steel is reheated to a temperature below the transformation range to reduce brittleness and adjust hardness.',
    category: 'Material Science',
    relatedTerms: ['Heat Treatment', 'Quenching', 'Martensite'],
    example: 'Tempering reduces the brittleness of martensite while maintaining high strength.',
  },
  {
    term: 'Hardness',
    definition: 'A measure of a material\'s resistance to deformation, typically measured by indentation. Common scales include Rockwell (HRC, HRB), Brinell (HB), and Vickers (HV).',
    category: 'Material Science',
    relatedTerms: ['Hardness Testing', 'Rockwell', 'Brinell', 'Vickers'],
    example: 'Hardness testing is a quick way to assess material properties without destructive testing.',
  },
  {
    term: 'Work Hardening',
    definition: 'The increase in hardness and strength of a material due to plastic deformation. Also called strain hardening or cold working.',
    category: 'Material Science',
    relatedTerms: ['Hardness', 'Deformation'],
    example: 'Work hardening occurs when metals are deformed at temperatures below the recrystallization temperature.',
  },

  // Analysis Terms
  {
    term: 'ASTM Grain Size',
    definition: 'A standardized system for describing grain size in materials, using numbers from 1 (coarse) to 14+ (very fine). Higher numbers indicate finer grains.',
    category: 'Analysis',
    relatedTerms: ['Grain Size', 'Grain'],
    example: 'ASTM grain size number 8 indicates finer grains than grain size number 4.',
  },
  {
    term: 'Magnification',
    definition: 'The degree to which an image is enlarged when viewed through a microscope. Expressed as a ratio (e.g., 100x means 100 times larger than actual size).',
    category: 'Analysis',
    relatedTerms: ['Microscope', 'Microstructure'],
    example: 'Grain boundaries are typically visible at magnifications of 100x to 500x.',
  },
  {
    term: 'EBSD',
    definition: 'Electron Backscatter Diffraction - a technique used in scanning electron microscopy to determine crystal orientation, grain boundaries, and phase identification.',
    category: 'Analysis',
    relatedTerms: ['SEM', 'Microstructure'],
    example: 'EBSD requires very high-quality sample preparation with minimal surface damage.',
  },
  {
    term: 'SEM',
    definition: 'Scanning Electron Microscope - a type of electron microscope that produces high-resolution images of sample surfaces. Provides higher magnification than optical microscopes.',
    category: 'Analysis',
    relatedTerms: ['Microscope', 'EBSD'],
    example: 'SEM analysis reveals surface features at much higher magnifications than optical microscopy.',
  },

  // General Terms
  {
    term: 'Metallography',
    definition: 'The study of the microstructure of metals and alloys using microscopy. Involves sample preparation (sectioning, mounting, grinding, polishing, etching) and microscopic examination.',
    category: 'General',
    relatedTerms: ['Microstructure', 'Sample Preparation'],
    example: 'Metallography is essential for understanding material properties and quality control.',
  },
  {
    term: 'Metallurgist',
    definition: 'A scientist or engineer who studies the physical and chemical behavior of metals and alloys, including their structure, properties, and processing.',
    category: 'General',
    relatedTerms: ['Metallography'],
  },
  {
    term: 'Metallographer',
    definition: 'A specialist who prepares and examines metallographic samples. Skilled in sample preparation techniques and microstructural analysis.',
    category: 'General',
    relatedTerms: ['Metallography', 'Metallurgist'],
  },

  // Additional Microstructure Terms
  {
    term: 'Bainite',
    definition: 'A microstructure formed by transformation of austenite at intermediate temperatures. Consists of ferrite and cementite with a characteristic acicular (needle-like) or feathery appearance.',
    category: 'Microstructure',
    relatedTerms: ['Ferrite', 'Cementite', 'Austenite'],
    example: 'Bainite forms at cooling rates between those that produce pearlite and martensite.',
  },
  {
    term: 'Widmanstätten Structure',
    definition: 'A microstructure characterized by needle-like or plate-like phases that form along specific crystallographic planes. Often seen in titanium alloys and some steels.',
    category: 'Microstructure',
    relatedTerms: ['Microstructure', 'Phase'],
  },
  {
    term: 'Dendrite',
    definition: 'A tree-like crystal structure that forms during solidification. Dendrites have a main trunk with branches extending outward.',
    category: 'Microstructure',
    relatedTerms: ['Microstructure', 'Solidification'],
  },
  {
    term: 'Eutectic',
    definition: 'A mixture of two or more phases that form simultaneously from a liquid at a specific composition and temperature. The lowest melting point composition for that system.',
    category: 'Microstructure',
    relatedTerms: ['Phase', 'Eutectoid'],
  },
  {
    term: 'Eutectoid',
    definition: 'A transformation where a single solid phase decomposes into two or more different solid phases at a specific temperature and composition.',
    category: 'Microstructure',
    relatedTerms: ['Phase', 'Eutectic', 'Pearlite'],
    example: 'Eutectoid steel transforms to pearlite at 727°C.',
  },
  {
    term: 'Polycrystalline',
    definition: 'A material composed of many small crystals (grains) with different orientations. Most metals and alloys are polycrystalline.',
    category: 'Microstructure',
    relatedTerms: ['Grain', 'Crystal'],
  },
  {
    term: 'Recrystallization',
    definition: 'The formation of new, strain-free grains in a deformed material during heating. Occurs at temperatures above the recrystallization temperature.',
    category: 'Microstructure',
    relatedTerms: ['Grain', 'Heat Treatment', 'Work Hardening'],
  },
  {
    term: 'Void',
    definition: 'An empty space or cavity within a material. Can be introduced during processing or form during service due to damage.',
    category: 'Microstructure',
    relatedTerms: ['Defect', 'Porosity'],
  },
  {
    term: 'Porosity',
    definition: 'The presence of voids or pores in a material, typically expressed as a percentage of void volume to total volume.',
    category: 'Microstructure',
    relatedTerms: ['Void', 'Defect'],
  },
  {
    term: 'Crack',
    definition: 'A fracture or separation in a material. Can be surface-breaking or internal. Critical defect that can lead to failure.',
    category: 'Microstructure',
    relatedTerms: ['Defect', 'Fracture'],
  },
  {
    term: 'Dislocation',
    definition: 'A line defect in the crystal structure of a material. Dislocations enable plastic deformation and affect material properties.',
    category: 'Microstructure',
    relatedTerms: ['Defect', 'Crystal'],
  },

  // Additional Sample Preparation Terms
  {
    term: 'Abrasive',
    definition: 'Hard particles used for grinding and polishing. Common abrasives include silicon carbide, aluminum oxide, and diamond.',
    category: 'Sample Preparation',
    relatedTerms: ['Grinding', 'Polishing', 'Grit'],
  },
  {
    term: 'Coolant',
    definition: 'A fluid used during sectioning to reduce heat generation and prevent damage to the sample. Also helps remove cutting debris.',
    category: 'Sample Preparation',
    relatedTerms: ['Sectioning', 'Cutting'],
  },
  {
    term: 'Cutting Fluid',
    definition: 'A lubricant and coolant used during sectioning to reduce friction, heat, and tool wear. Helps produce cleaner cuts.',
    category: 'Sample Preparation',
    relatedTerms: ['Sectioning', 'Coolant'],
  },
  {
    term: 'Diamond Blade',
    definition: 'A thin cutting blade with diamond particles bonded to the edge. Used in precision wafering for low-damage sectioning.',
    category: 'Sample Preparation',
    relatedTerms: ['Precision Wafering', 'Sectioning'],
  },
  {
    term: 'CBN Blade',
    definition: 'Cubic Boron Nitride blade - a cutting blade with CBN particles bonded to the edge. Used for sectioning hard materials like tool steels.',
    category: 'Sample Preparation',
    relatedTerms: ['Precision Wafering', 'Diamond Blade'],
  },
  {
    term: 'Resin',
    definition: 'A synthetic polymer material used for mounting samples. Types include phenolic, epoxy, acrylic, and polyester resins.',
    category: 'Sample Preparation',
    relatedTerms: ['Mounting', 'Compression Mounting', 'Castable Mounting'],
  },
  {
    term: 'Mount',
    definition: 'A sample embedded in resin material, creating a standardized shape for easier handling during grinding, polishing, and analysis.',
    category: 'Sample Preparation',
    relatedTerms: ['Mounting', 'Resin'],
  },
  {
    term: 'Edge Retention',
    definition: 'The ability of a mount to maintain sharp edges and interfaces during grinding and polishing. Important for analyzing coatings, edges, or interfaces.',
    category: 'Sample Preparation',
    relatedTerms: ['Mounting', 'Compression Mounting'],
  },
  {
    term: 'Grit Progression',
    definition: 'The sequence of progressively finer grit sizes used during grinding. Typically progresses from coarse (120 grit) to fine (600-1200 grit).',
    category: 'Sample Preparation',
    relatedTerms: ['Grinding', 'Grit'],
  },
  {
    term: 'Scratch Pattern',
    definition: 'The pattern of scratches left on a sample surface after grinding. Should be uniform and oriented in one direction before moving to the next grit.',
    category: 'Sample Preparation',
    relatedTerms: ['Grinding', 'Grit'],
  },
  {
    term: 'Polishing Cloth',
    definition: 'A fabric pad used on polishing wheels to hold abrasives and provide appropriate surface texture. Different cloths have different nap levels and properties.',
    category: 'Sample Preparation',
    relatedTerms: ['Polishing', 'Diamond Polishing'],
  },
  {
    term: 'Polishing Pad',
    definition: 'A synthetic pad used for polishing, typically with a specific texture or nap designed for different polishing stages and materials.',
    category: 'Sample Preparation',
    relatedTerms: ['Polishing', 'Polishing Cloth'],
  },
  {
    term: 'Diamond Suspension',
    definition: 'Diamond particles suspended in a liquid carrier (water or oil-based) for polishing. Available in various particle sizes.',
    category: 'Sample Preparation',
    relatedTerms: ['Diamond Polishing', 'Polishing'],
  },
  {
    term: 'Colloidal Silica',
    definition: 'A fine oxide polishing suspension used for final polishing. Produces excellent surface finishes with minimal damage.',
    category: 'Sample Preparation',
    relatedTerms: ['Oxide Polishing', 'Final Polishing'],
  },
  {
    term: 'Immersion Etching',
    definition: 'An etching method where the sample is fully immersed in the etchant solution for a specified time.',
    category: 'Sample Preparation',
    relatedTerms: ['Etching', 'Etchant'],
  },
  {
    term: 'Swabbing',
    definition: 'An etching method where the etchant is applied to the sample surface using a cotton swab or similar applicator.',
    category: 'Sample Preparation',
    relatedTerms: ['Etching', 'Etchant'],
  },
  {
    term: 'Electrolytic Etching',
    definition: 'An etching method using electrical current to enhance the etching process. Used for some stainless steels and other materials.',
    category: 'Sample Preparation',
    relatedTerms: ['Etching', 'Etchant'],
  },
  {
    term: 'Contamination',
    definition: 'Foreign material introduced to the sample surface during preparation. Can include abrasive particles, polishing compounds, or other debris.',
    category: 'Sample Preparation',
    relatedTerms: ['Artifact', 'Polishing'],
  },
  {
    term: 'Scratch',
    definition: 'A linear mark or groove on the polished surface, typically from previous grinding steps that were not fully removed.',
    category: 'Sample Preparation',
    relatedTerms: ['Artifact', 'Grinding', 'Polishing'],
  },
  {
    term: 'Pitting',
    definition: 'Small holes or depressions in the polished surface, often caused by preferential etching or removal of inclusions.',
    category: 'Sample Preparation',
    relatedTerms: ['Artifact', 'Polishing'],
  },
  {
    term: 'Comet Tailing',
    definition: 'A polishing artifact where hard particles create trailing marks resembling comets. Caused by improper polishing technique or contaminated abrasives.',
    category: 'Sample Preparation',
    relatedTerms: ['Artifact', 'Polishing'],
  },

  // Additional Equipment Terms
  {
    term: 'Cut-Off Wheel',
    definition: 'An abrasive wheel used for sectioning samples. Available in various diameters and abrasive types.',
    category: 'Equipment',
    relatedTerms: ['Abrasive Cutter', 'Sectioning'],
  },
  {
    term: 'Wafering Blade',
    definition: 'A thin blade with diamond or CBN particles used in precision wafering. Much thinner than abrasive wheels.',
    category: 'Equipment',
    relatedTerms: ['Precision Wafering Saw', 'Diamond Blade'],
  },
  {
    term: 'Mounting Mold',
    definition: 'A container or form used to hold the sample and resin during mounting. Can be reusable or disposable.',
    category: 'Equipment',
    relatedTerms: ['Mounting', 'Compression Mounting', 'Castable Mounting'],
  },
  {
    term: 'Vacuum Chamber',
    definition: 'Equipment used in castable mounting to remove air bubbles from liquid resin before curing. Ensures porosity-free mounts.',
    category: 'Equipment',
    relatedTerms: ['Castable Mounting', 'Mounting'],
  },
  {
    term: 'Polishing Wheel',
    definition: 'A rotating disc used for polishing samples. Holds polishing cloths or pads and rotates at controlled speeds.',
    category: 'Equipment',
    relatedTerms: ['Polishing', 'Polishing Cloth'],
  },
  {
    term: 'Optical Microscope',
    definition: 'A microscope that uses visible light to observe samples. Standard tool for metallographic analysis at magnifications up to 1000x.',
    category: 'Equipment',
    relatedTerms: ['Metallographic Microscope', 'Microstructure'],
  },
  {
    term: 'Hardness Tester',
    definition: 'Equipment used to measure material hardness by indentation. Types include Rockwell, Brinell, Vickers, and Knoop testers.',
    category: 'Equipment',
    relatedTerms: ['Hardness', 'Hardness Testing'],
  },

  // Additional Material Science Terms
  {
    term: 'Metal',
    definition: 'A class of materials characterized by metallic bonding, high electrical and thermal conductivity, and typically good ductility and strength.',
    category: 'Material Science',
    relatedTerms: ['Alloy'],
  },
  {
    term: 'Steel',
    definition: 'An alloy of iron and carbon, typically containing less than 2% carbon. May also contain other alloying elements.',
    category: 'Material Science',
    relatedTerms: ['Alloy', 'Iron', 'Carbon'],
  },
  {
    term: 'Stainless Steel',
    definition: 'A steel alloy containing at least 10.5% chromium, providing excellent corrosion resistance. May also contain nickel and other elements.',
    category: 'Material Science',
    relatedTerms: ['Steel', 'Alloy'],
  },
  {
    term: 'Aging',
    definition: 'A heat treatment process where a material is held at an elevated temperature to allow precipitates to form, strengthening the material.',
    category: 'Material Science',
    relatedTerms: ['Heat Treatment', 'Precipitate'],
    example: 'Aluminum alloys are aged to form strengthening precipitates.',
  },
  {
    term: 'Solution Treatment',
    definition: 'A heat treatment where alloying elements are dissolved into solid solution by heating, followed by rapid cooling to retain the solution.',
    category: 'Material Science',
    relatedTerms: ['Heat Treatment', 'Aging'],
  },
  {
    term: 'Normalizing',
    definition: 'A heat treatment process where steel is heated above the transformation temperature and air-cooled to refine grain structure.',
    category: 'Material Science',
    relatedTerms: ['Heat Treatment', 'Annealing'],
  },
  {
    term: 'Rockwell Hardness',
    definition: 'A hardness testing method using different scales (HRC, HRB, etc.) based on indenter type and load. Quick and widely used.',
    category: 'Material Science',
    relatedTerms: ['Hardness', 'Hardness Testing'],
  },
  {
    term: 'Brinell Hardness',
    definition: 'A hardness testing method using a spherical indenter. Expressed as HB. Good for softer materials and rough surfaces.',
    category: 'Material Science',
    relatedTerms: ['Hardness', 'Hardness Testing'],
  },
  {
    term: 'Vickers Hardness',
    definition: 'A hardness testing method using a diamond pyramid indenter. Expressed as HV. Suitable for a wide range of materials.',
    category: 'Material Science',
    relatedTerms: ['Hardness', 'Hardness Testing'],
  },
  {
    term: 'Knoop Hardness',
    definition: 'A microhardness testing method using a diamond indenter with an elongated pyramid shape. Good for thin samples and small areas.',
    category: 'Material Science',
    relatedTerms: ['Hardness', 'Hardness Testing'],
  },
  {
    term: 'Tensile Strength',
    definition: 'The maximum stress a material can withstand while being stretched before failure. Also called ultimate tensile strength (UTS).',
    category: 'Material Science',
    relatedTerms: ['Strength', 'Mechanical Properties'],
  },
  {
    term: 'Yield Strength',
    definition: 'The stress at which a material begins to deform plastically. The point where permanent deformation occurs.',
    category: 'Material Science',
    relatedTerms: ['Strength', 'Tensile Strength'],
  },
  {
    term: 'Ductility',
    definition: 'The ability of a material to deform plastically before fracture. Measured as percent elongation or percent reduction in area.',
    category: 'Material Science',
    relatedTerms: ['Mechanical Properties'],
  },
  {
    term: 'Toughness',
    definition: 'The ability of a material to absorb energy and deform plastically before fracture. Combines strength and ductility.',
    category: 'Material Science',
    relatedTerms: ['Strength', 'Ductility'],
  },
  {
    term: 'Brittleness',
    definition: 'The tendency of a material to fracture without significant plastic deformation. Opposite of ductility.',
    category: 'Material Science',
    relatedTerms: ['Ductility', 'Fracture'],
  },

  // Additional Analysis Terms
  {
    term: 'TEM',
    definition: 'Transmission Electron Microscope - an electron microscope that transmits electrons through thin samples. Provides very high resolution and magnification.',
    category: 'Analysis',
    relatedTerms: ['SEM', 'Microscope'],
  },
  {
    term: 'EDS',
    definition: 'Energy-Dispersive X-ray Spectroscopy - a technique used in SEM to identify and quantify chemical elements in a sample.',
    category: 'Analysis',
    relatedTerms: ['SEM', 'Analysis'],
  },
  {
    term: 'WDS',
    definition: 'Wavelength-Dispersive X-ray Spectroscopy - a technique for elemental analysis with higher resolution than EDS but slower analysis.',
    category: 'Analysis',
    relatedTerms: ['SEM', 'EDS'],
  },
  {
    term: 'Image Analysis',
    definition: 'The use of software to automatically measure and analyze microstructural features from digital images. Can quantify grain size, phase fractions, etc.',
    category: 'Analysis',
    relatedTerms: ['Microstructure', 'Grain Size'],
  },
  {
    term: 'Phase Fraction',
    definition: 'The percentage or fraction of each phase present in a material. Measured using image analysis or point counting methods.',
    category: 'Analysis',
    relatedTerms: ['Phase', 'Image Analysis'],
  },
  {
    term: 'Point Counting',
    definition: 'A manual method for determining phase fractions by counting points that fall on each phase in a grid overlay.',
    category: 'Analysis',
    relatedTerms: ['Phase Fraction', 'Microstructure'],
  },
  {
    term: 'Intercept Method',
    definition: 'A method for measuring grain size by counting the number of grain boundaries intersected by test lines.',
    category: 'Analysis',
    relatedTerms: ['Grain Size', 'ASTM Grain Size'],
  },
  {
    term: 'Planimetric Method',
    definition: 'A method for measuring grain size by counting the number of grains within a known area.',
    category: 'Analysis',
    relatedTerms: ['Grain Size', 'ASTM Grain Size'],
  },
]

// Helper function to get terms by category
export function getTermsByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.category === category)
}

// Helper function to search terms
export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase()
  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.relatedTerms?.some(rt => rt.toLowerCase().includes(lowerQuery))
  )
}

// Helper function to get term by name
export function getTermByName(termName: string): GlossaryTerm | undefined {
  return glossaryTerms.find(term => term.term.toLowerCase() === termName.toLowerCase())
}

