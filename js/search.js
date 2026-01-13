const data = [
    // Main Pages
    { title: "PACE Technologies Home", description: "Welcome to PACE Technologies, your trusted partner in metallographic equipment and consumables.", link: "/index.html", keywords: "pace technologies home metallographic equipment consumables sample preparation" },
    { title: "Product Catalog", description: "Browse our comprehensive catalog of metallographic equipment, consumables, and accessories.", link: "/catalog.html", keywords: "product catalog equipment consumables accessories catalog browse products" },
    
    // Main Equipment & Consumables Pages
    { title: "Metallographic Equipment", description: "Find the latest equipment for your metallographic lab, including precision cutters, polishers, and more.", link: "/equipment.html", keywords: "metallographic equipment machine saw cutter press grinder polisher vibratory mounting grinding polishing lab laboratory auto manual sectioning cutting hardness testing accessories machines tools instruments precision wafering compression mounting grinding polishing vibratory microscopy hardness testing" },
    { title: "Metallographic Consumables", description: "Explore our wide range of consumables for various metallographic applications.", link: "/consumables.html", keywords: "metallographic consumables blade cloth pad paper grinding polishing mounting sectioning cutting hardness testing etching etchant suspension slurries slurry diamond sic silicon carbide alumina zirconia fluid phenolic acrylic polyester mold accessories materials supplies" },
    
    // Support & Documentation
    { title: "Customer Support", description: "Access comprehensive customer support resources and assistance.", link: "/support.html", keywords: "customer support help assistance technical support service maintenance training warranty repair troubleshooting" },
    { title: "Professional Services", description: "Professional metallographic services you can purchase: KeepPACE service plans, on-site installation, training programs, and maintenance services for your laboratory.", link: "/services.html", keywords: "professional services service plans installation training maintenance lab consultation build your lab equipment setup calibration operator training preventive maintenance diagnostic repair" },
    { title: "KeepPACE Service Plans", description: "Flexible service plans from basic annual check-ins to comprehensive coverage with priority support and personalized service.", link: "/keeppace.html", keywords: "keeppace service plans maintenance plans annual check-ins emergency support dedicated technicians spare parts discounts extended warranties service credits preventive maintenance priority support" },
    { title: "Sample Preparation Procedures", description: "Step-by-step guides for sample preparation, including mounting, grinding, and polishing methods.", link: "/support/procedures.html", keywords: "sample preparation mounting grinding polishing procedures techniques methods protocols step by step guide instructions mounting grinding polishing etching sectioning cutting" },
    { title: "Product Brochures", description: "Download detailed product brochures and technical specifications for our metallographic equipment and consumables.", link: "/support/brochures.html", keywords: "brochures technical specifications product information documentation datasheets manuals catalogs technical data specifications" },
    { title: "Etchant Information", description: "Comprehensive guide to metallographic etchants, including selection, application, and safety information.", link: "/support/etchant-information.html", keywords: "etchant etching solutions microstructure safety handling chemical reagents metallographic etching nital picral keller's reagent vilella's reagent" },
    { title: "Product Catalog", description: "Browse our complete catalog of metallographic equipment, consumables, and accessories.", link: "/support/products.html", keywords: "product catalog equipment consumables accessories inventory products list specifications" },
    { title: "Safety Data Sheets", description: "Access safety data sheets (SDS) for all our products, ensuring safe handling and compliance.", link: "/support/sds.html", keywords: "safety data sheets SDS handling compliance safety chemical safety material safety data sheets MSDS" },
    
    // Company Information
    { title: "About PACE Technologies", description: "Learn about PACE Technologies' history, mission, and commitment to metallographic excellence.", link: "/about.html", keywords: "about pace technologies company history mission about us pace technologies metallographic excellence" },
    { title: "Careers", description: "Explore career opportunities at PACE Technologies and join our team of metallographic experts.", link: "/careers.html", keywords: "careers jobs employment opportunities work with us hiring positions" },
    { title: "Contact Us", description: "Get in touch with our team for inquiries and support.", link: "/contact.html", keywords: "contact us inquiries support phone email address location" },
    { title: "International Distribution", description: "Find PACE Technologies' authorized distributors in your region.", link: "/distribution.html", keywords: "international distribution distributors global locations worldwide partners dealers resellers" },
    
    // Business & Legal
    { title: "Request a Quote", description: "Get a customized quote for our metallographic equipment and consumables.", link: "/quote.html", keywords: "quote pricing request quote equipment consumables pricing estimate cost" },
    { title: "Online Shop", description: "Shop our complete range of metallographic equipment and consumables online.", link: "https://shop.metallographic.com", keywords: "shop online store purchase buy equipment consumables ecommerce shopping cart" },
    { title: "Terms & Conditions", description: "Review our terms and conditions for using PACE Technologies' products and services.", link: "/terms.html", keywords: "terms conditions legal agreement warranty terms" },
    { title: "Privacy Policy", description: "Read our privacy policy to understand how we protect your data.", link: "/privacy.html", keywords: "privacy policy data protection privacy" },
    
    // Precision Wafering Equipment
    { title: "Precision Wafering Saws", description: "High-precision wafering saws for accurate and reliable sample preparation.", link: "/metallographic-equipment/precision-wafering.html", keywords: "precision wafering saws sample preparation PICO PICO-155P PICO-155S PICO-200A PICO-200S precision cutting wafering sectioning saws diamond blade cutting" },
    { title: "PICO-155P Precision Wafering Saw", description: "Precision cutter with touch controls and built-in recirculating pump. Fits 3-inch (75 mm) up to 7-inch (175 mm) diameter blades with variable speed 50-1500 rpm.", link: "/metallographic-equipment/precision-wafering/pico-155p.html", keywords: "PICO-155P precision wafering saw diamond blade cutting sectioning sample preparation touch controls recirculating pump" },
    { title: "PICO-155S Precision Wafering Saw", description: "Precision cutter with touch-screen controls and built-in recirculating pump. Fits 3-inch (75 mm) up to 7-inch (175 mm) diameter blades with variable speed 50-1500 rpm.", link: "/metallographic-equipment/precision-wafering/pico-155s.html", keywords: "PICO-155S precision wafering saw diamond blade cutting sectioning sample preparation touch screen recirculating pump" },
    { title: "PICO-200A Precision Wafering Saw", description: "Automated high speed table saw for precision cutting with automated operation.", link: "/metallographic-equipment/precision-wafering/pico-200a.html", keywords: "PICO-200A precision wafering saw diamond blade cutting sectioning advanced precision automated table saw" },
    { title: "PICO-200S Precision Wafering Saw", description: "High speed (500-3000 rpm) manual variable speed table saw for precision cutting.", link: "/metallographic-equipment/precision-wafering/pico-200s.html", keywords: "PICO-200S precision wafering saw diamond blade cutting sectioning high speed manual variable speed" },
    
    // Compression Mounting Equipment
    { title: "Compression Mounting Presses", description: "Our selection of compression mounting presses ensures consistent sample preparation.", link: "/metallographic-equipment/compression-mounting.html", keywords: "compression mounting presses sample preparation TERAPRESS tp-7500s tp-7100s tp-tank mounting presses compression hydraulic pneumatic" },
    { title: "TERAPRESS TP-7500S Hydraulic Mounting Press", description: "Programmable electro-hydraulic automated compression mounting press with interchangeable molds. Features 1-inch to 2-inch interchangeable or fixed heater/molds, rapid ram movement, multiple cooling modes, and automatic programmable cycles.", link: "/metallographic-equipment/compression-mounting/tp-7500s.html", keywords: "TERAPRESS TP-7500S hydraulic mounting press compression mounting hydraulic programmable automated" },
    { title: "TERAPRESS TP-7100S Pneumatic Mounting Press", description: "Programmable pneumatic automated mounting press with easy force control. Features 1-inch to 2-inch interchangeable or fixed heater/molds, rapid ram movement, multiple cooling modes, and automatic programmable cycles.", link: "/metallographic-equipment/compression-mounting/tp-7100s.html", keywords: "TERAPRESS TP-7100S pneumatic mounting press compression mounting pneumatic programmable automated" },
    { title: "TERAPRESS TP-Tank Mounting Press", description: "TERAPRESS recirculation and cooling tank with pump for mounting press operations.", link: "/metallographic-equipment/compression-mounting/tp-tank.html", keywords: "TERAPRESS TP-Tank mounting press compression mounting tank recirculation cooling pump" },
    
    // Castable Mounting Equipment
    { title: "Castable Mounting Equipment", description: "Advanced castable mounting systems for sample preparation including vacuum impregnation and UV curing.", link: "/metallographic-equipment/castable-mounting.html", keywords: "castable mounting vacuum impregnation UV curing LSSA-011 UVMOUNT THETAMOUNT sample preparation mounting" },
    { title: "LSSA-011 Vacuum Mounting System", description: "Vacuum mounting systems that improve sample integrity during metallographic preparation.", link: "/metallographic-equipment/castable-mounting/lssa-011.html", keywords: "LSSA-011 vacuum mounting systems sample integrity vacuum impregnation castable mounting vacuum" },
    { title: "UVMOUNT UV Curing System", description: "Efficient UV curing systems for rapid processing in metallographic labs.", link: "/metallographic-equipment/castable-mounting/uvmount.html", keywords: "UVMOUNT UV curing systems rapid processing UV curing castable mounting" },
    { title: "THETAMOUNT Mounting System", description: "Advanced mounting system for specialized sample preparation applications.", link: "/metallographic-equipment/castable-mounting/thetamount.html", keywords: "THETAMOUNT mounting system specialized sample preparation castable mounting" },
    
    // Grinding & Polishing Equipment
    { title: "Grinding & Polishing Equipment", description: "Complete range of grinding and polishing equipment for metallographic sample preparation.", link: "/metallographic-equipment/grinding-polishing.html", keywords: "grinding polishing equipment PENTA NANO FEMTO ATTO GIGA RC ZETA hand belt grinders automated polishing machines" },
    { title: "PENTA Hand and Belt Grinders", description: "5-station hand grinder for coarse to fine grinding with 240, 360, 600, 800 and 1200 grit abrasive. Wet or dry belt grinder for coarse grinding with square grinding attachment.", link: "/metallographic-equipment/grinding-polishing/penta.html", keywords: "PENTA hand belt grinders grinding manual polishing manual grinding belt grinding 5-station coarse fine" },
    { title: "NANO Semi-Automatic Polisher", description: "Single and dual wheel grinder polisher bench top polishers for 8, 10, 12 and 14-inch wheels. Features variable speed (100-1000 rpm), preset fast speed buttons, and auto mode.", link: "/metallographic-equipment/grinding-polishing/nano.html", keywords: "NANO semi-automatic polisher semi-auto polishing automated polishing single dual wheel variable speed" },
    { title: "FEMTO Automatic Polisher", description: "Automatic polishing heads for use with NANO-1000S, NANO-2000S, and NANO-1200S. Features variable speed (0-200 rpm) and pneumatically adjustable individual pistons for 1 to 6 specimens independent of each other.", link: "/metallographic-equipment/grinding-polishing/femto.html", keywords: "FEMTO polishing head attachments NANO automated polishing polishing heads automatic polishing head individual pistons" },
    { title: "ATTO Automatic Polisher", description: "Controlled micro-precision polisher for plano-parallel sample preparation with metered material removal.", link: "/metallographic-equipment/grinding-polishing/atto.html", keywords: "ATTO metered material removal micro polisher precision control micro polishing plano-parallel controlled removal" },
    { title: "GIGA Polishing System", description: "9 or 12-inch metallurgical vibratory polisher designed to prepare even the most difficult to polish materials with a very gentle polishing action. Ideal for EBSD preparation.", link: "/metallographic-equipment/grinding-polishing/giga.html", keywords: "GIGA vibratory polisher vibratory polishing system EBSD gentle polishing metallurgical" },
    { title: "RC Polishing System", description: "Recirculating tank for NANO Polishers, includes tank, filter housing, pump, coarse, medium and fine filters for continuous polishing operations.", link: "/metallographic-equipment/grinding-polishing/rc.html", keywords: "RC recirculating tank polisher recirculation system polishing tank NANO filters filtration" },
    { title: "ZETA Polishing System", description: "4-fluid automated and manual dispenser for controlling and regulating the application of abrasives such as diamond, alumina, colloidal silica and lubricant solutions onto the polishing surface.", link: "/metallographic-equipment/grinding-polishing/zeta.html", keywords: "ZETA abrasive dispenser abrasive delivery system automated dispensing fluid dispenser diamond alumina colloidal silica" },
    
    
    // Microscopy Equipment
    { title: "Microscopy Equipment", description: "Complete range of microscopy equipment for metallographic analysis and imaging.", link: "/metallographic-equipment/microscopy.html", keywords: "microscopy equipment metallurgical microscopes stereo microscopes image analysis software microstructural analysis" },
    { title: "Metallurgical Microscopes", description: "Advanced metallurgical microscopes for detailed microstructural analysis.", link: "/metallographic-equipment/microscopy/metallurgical.html", keywords: "metallurgical microscopes microstructural analysis metallographic microscopy" },
    { title: "Stereo and Digital Microscopes", description: "Stereo microscopes designed for enhanced depth perception and analysis.", link: "/metallographic-equipment/microscopy/stereo-and-digital.html", keywords: "stereo microscopes digital microscopes depth perception stereo microscopy" },
    { title: "Image Analysis Software", description: "Advanced software for detailed metallographic image analysis and reporting.", link: "/metallographic-equipment/microscopy/image-analysis.html", keywords: "image analysis software microscopy MAT-PLUS image analysis software" },
    
    // Hardness Testing Equipment
    { title: "Hardness Testing Equipment", description: "Complete range of hardness testing equipment for accurate material evaluation.", link: "/metallographic-equipment/hardness-testing.html", keywords: "hardness testing equipment Rockwell Brinell Vickers microhardness testing material evaluation" },
    { title: "Rockwell Hardness Testers", description: "Reliable Rockwell hardness testers for accurate and consistent measurements.", link: "/metallographic-equipment/hardness-testing/rockwell.html", keywords: "Rockwell hardness testers testing rockwell hardness testing" },
    { title: "Brinell and Vickers Testers", description: "Brinell and Vickers testers for comprehensive hardness testing across various materials.", link: "/metallographic-equipment/hardness-testing/brinell-vickers.html", keywords: "Brinell Vickers macrovickers testers hardness testing brinell vickers hardness" },
    { title: "Microhardness Testing Systems", description: "Precision microhardness testing systems for accurate material hardness evaluation.", link: "/metallographic-equipment/hardness-testing/microhardness.html", keywords: "microhardness testers testing material evaluation HV-1000Z microhardness testing" },
    
    // Abrasive Sectioning Equipment
    { title: "Abrasive Sectioning Equipment", description: "High-performance MEGA abrasive sectioning equipment for precise material cutting and sample preparation.", link: "/metallographic-equipment/abrasive-sectioning.html", keywords: "MEGA abrasive sectioning cutting saws precision material preparation MEGA-M250S MEGA-T250S MEGA-T300S MEGA-T350S MEGA-T400S MEGA-T300A MEGA-T350A MEGA-T400A abrasive cutting sectioning manual automated" },
    
    // Manual Abrasive Sectioning
    { title: "Manual Abrasive Sectioning", description: "Manual MEGA abrasive sectioning saws for precise control and flexibility.", link: "/metallographic-equipment/abrasive-sectioning/manual.html", keywords: "manual abrasive sectioning MEGA manual cutting saws MEGA-M250S MEGA-T250S MEGA-T300S MEGA-T350S MEGA-T400S" },
    { title: "MEGA-M250S Manual Abrasive Sectioning Saw", description: "Manual wheel feed abrasive cutting machine for 10-inch (250 mm) abrasive blades.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-m250s.html", keywords: "MEGA-M250S manual abrasive sectioning saw cutting abrasive cutting manual 250mm 10-inch wheel feed" },
    { title: "MEGA-T250S Manual Abrasive Sectioning Saw", description: "Manual wheel and table feed abrasive cutting machine for 10-inch (250 mm) abrasive blades.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-t250s.html", keywords: "MEGA-T250S manual abrasive sectioning saw cutting abrasive cutting manual 250mm 10-inch table feed" },
    { title: "MEGA-T300S Manual Abrasive Sectioning Saw", description: "Manual wheel and table feed abrasive cutting machine for 12-inch (300 mm) abrasive blades. Cutting capacity up to 4-inch (100 mm) solid stock.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-t300s.html", keywords: "MEGA-T300S manual abrasive sectioning saw cutting abrasive cutting manual 300mm 12-inch table feed" },
    { title: "MEGA-T350S Manual Abrasive Sectioning Saw", description: "Manual wheel and table feed abrasive cutting machine for 14-inch (350 mm) abrasive blades. Cutting capacity up to 4.5-inch (115 mm) solid stock.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-t350s.html", keywords: "MEGA-T350S manual abrasive sectioning saw cutting abrasive cutting manual 350mm 14-inch table feed" },
    { title: "MEGA-T400S Manual Abrasive Sectioning Saw", description: "Manual wheel and table feed abrasive cutting machine for 16-inch (400 mm) abrasive blades. Cutting capacity up to 4.5-inch (115 mm) solid stock.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-t400s.html", keywords: "MEGA-T400S manual abrasive sectioning saw cutting abrasive cutting manual 400mm 16-inch table feed" },
    
    // Automated Abrasive Sectioning
    { title: "Automated Abrasive Sectioning", description: "Automated MEGA abrasive sectioning saws for high-volume production.", link: "/metallographic-equipment/abrasive-sectioning/automated.html", keywords: "automated abrasive sectioning MEGA automated cutting saws MEGA-T300A MEGA-T350A MEGA-T400A" },
    { title: "MEGA-T300A Automated Abrasive Sectioning Saw", description: "Automated and manual Y-axis with automated X-axis table feed and manual wheel feed abrasive cutting machine for 12-inch (300 mm) abrasive blades. Cutting capacity up to 4-inch (100 mm) solid stock.", link: "/metallographic-equipment/abrasive-sectioning/automated/mega-t300a.html", keywords: "MEGA-T300A automated abrasive sectioning saw cutting abrasive cutting automated 300mm 12-inch table feed" },
    { title: "MEGA-T350A Automated Abrasive Sectioning Saw", description: "Automated and manual Y-axis with automated X-axis table feed and manual wheel feed abrasive cutting machine for 14-inch (350 mm) abrasive blades. Cutting capacity up to 4.5-inch (115 mm) solid stock.", link: "/metallographic-equipment/abrasive-sectioning/automated/mega-t350a.html", keywords: "MEGA-T350A automated abrasive sectioning saw cutting abrasive cutting automated 350mm 14-inch table feed" },
    { title: "MEGA-T400A Automated Abrasive Sectioning Saw", description: "Automated and manual Y-axis with automated X-axis table feed and manual wheel feed abrasive cutting machine for 16-inch (400 mm) abrasive blades. Cutting capacity up to 4.5-inch (115 mm) solid stock.", link: "/metallographic-equipment/abrasive-sectioning/automated/mega-t400a.html", keywords: "MEGA-T400A automated abrasive sectioning saw cutting abrasive cutting automated 400mm 16-inch table feed" },
    
    // Lab Furniture
    { title: "Lab Furniture Solutions", description: "Ergonomic and efficient lab furniture designed for metallographic applications, including workstations and storage solutions.", link: "/metallographic-equipment/lab-furniture.html", keywords: "lab furniture workstation storage ergonomic efficiency laboratory furniture" },
    // Consumables - Main Categories
    
    // Consumables - Sectioning
    { title: "Sectioning Consumables", description: "Precision sectioning blades and cutting supplies for accurate sample preparation.", link: "/metallographic-consumables/sectioning.html", keywords: "sectioning consumables cutting blades wafering abrasive cutting diamond blades sectioning supplies" },
    { title: "Abrasive Cutting Blades", description: "High-quality abrasive cutting blades for efficient material sectioning.", link: "/metallographic-consumables/sectioning/abrasive-cutting.html", keywords: "abrasive cutting blades sectioning blades abrasive sectioning cutting supplies" },
    { title: "Precision Wafering Blades", description: "Precision wafering blades for delicate sample preparation and thin section cutting.", link: "/metallographic-consumables/sectioning/precision-wafering.html", keywords: "precision wafering blades thin section cutting wafering blades precision cutting" },
    
    // Consumables - Mounting
    { title: "Mounting Consumables", description: "High-quality mounting compounds and supplies for sample preparation.", link: "/metallographic-consumables/mounting.html", keywords: "mounting consumables mounting compounds compression castable mounting supplies embedding compounds" },
    { title: "Castable Mounting Compounds", description: "Castable mounting compounds for flexible sample mounting applications including epoxy and acrylic resins.", link: "/metallographic-consumables/mounting/castable.html", keywords: "castable mounting compounds castable mounting resins embedding compounds epoxy acrylic resins mounting materials" },
    { title: "Compression Mounting Compounds", description: "Compression mounting compounds for robust sample mounting applications including phenolic and epoxy resins.", link: "/metallographic-consumables/mounting/compression.html", keywords: "compression mounting compounds compression mounting resins phenolic mounting epoxy resins mounting materials" },
    
    // Consumables - Grinding
    { title: "Grinding Consumables", description: "Complete range of grinding supplies for material removal and surface preparation.", link: "/metallographic-consumables/grinding.html", keywords: "grinding consumables grinding papers grinding disks grinding belts abrasive grinding supplies" },
    { title: "Abrasive Grinding Papers", description: "Various abrasive grinding papers for different stages of sample preparation.", link: "/metallographic-consumables/grinding/abrasive-grinding.html", keywords: "abrasive grinding papers grinding papers grit sic alumina zirconia silicon carbide" },
    { title: "Grinding Belts, Rolls & Powders", description: "Grinding belts, rolls, and powders for efficient material removal.", link: "/metallographic-consumables/grinding/belts-rolls-powders.html", keywords: "grinding belts grinding rolls grinding powders belt grinding material removal" },
    { title: "Composite Grinding Disks", description: "Composite grinding disks for efficient material removal and surface preparation.", link: "/metallographic-consumables/grinding/composite-disks.html", keywords: "composite grinding disks grinding disks composite abrasive grinding" },
    { title: "Diamond Grinding Disks", description: "Premium diamond grinding disks for efficient material removal and surface preparation.", link: "/metallographic-consumables/grinding/diamond-grinding.html", keywords: "diamond grinding disks diamond grinding diamond discs abrasive diamond grinding" },
    { title: "Lapping Films", description: "Precision lapping films for achieving ultra-smooth surfaces in sample preparation.", link: "/metallographic-consumables/grinding/lapping-films.html", keywords: "lapping films precision lapping surface finish lapping films" },
    
    // Consumables - Polishing
    { title: "Polishing Consumables", description: "Specialized polishing supplies for achieving superior surface finishes.", link: "/metallographic-consumables/polishing.html", keywords: "polishing consumables polishing cloths polishing pads polishing suspensions diamond polishing supplies" },
    { title: "Polishing Pads and Cloths", description: "Specialized polishing pads and cloths for achieving superior surface finishes.", link: "/metallographic-consumables/polishing/polishing-pads.html", keywords: "polishing pads polishing cloths polishing media polishing discs polishing wheels polishing sheets" },
    { title: "Monocrystalline Diamond Suspensions", description: "High-quality monocrystalline diamond suspensions for precise polishing applications.", link: "/metallographic-consumables/polishing/monocrystalline-diamond.html", keywords: "monocrystalline diamond suspensions diamond polishing monocrystalline diamond slurries" },
    { title: "Polycrystalline Diamond Suspensions", description: "Polycrystalline diamond suspensions for efficient polishing applications.", link: "/metallographic-consumables/polishing/polycrystalline-diamond.html", keywords: "polycrystalline diamond suspensions diamond polishing polycrystalline diamond slurries" },
    { title: "Magnetic Polishing System", description: "Magnetic polishing system for automated polishing applications.", link: "/metallographic-consumables/polishing/magnetic-system.html", keywords: "magnetic polishing system automated polishing magnetic polishing" },
    
    // Consumables - Final Polishing
    { title: "Final Polishing Solutions", description: "Specialized solutions for achieving mirror-like finishes in final polishing.", link: "/metallographic-consumables/final-polishing.html", keywords: "final polishing solutions mirror finish final polishing compounds polishing solutions" },
    
    // Consumables - Etching
    { title: "Etching Solutions", description: "Comprehensive range of etching solutions for revealing material microstructures.", link: "/metallographic-consumables/etching.html", keywords: "etching solutions microstructure etchant chemical etchants metallographic etching nital picral keller's reagent" },
    
    // Consumables - Cleaning
    { title: "Cleaning Solutions", description: "Specialized cleaning solutions for maintaining equipment and preparing samples.", link: "/metallographic-consumables/cleaning.html", keywords: "cleaning solutions maintenance equipment cleaning sample cleaning cleaning supplies" },
    
    // Consumables - Hardness Testing
    { title: "Hardness Testing Consumables", description: "Supplies and accessories for hardness testing applications.", link: "/metallographic-consumables/hardness-testing.html", keywords: "hardness testing consumables hardness testing supplies hardness testing accessories" },
    
    // Safety Data Sheets (SDS) - Low Priority
    { title: "ACRYLIC Plus Liquid SDS", description: "Safety Data Sheet for ACRYLIC Plus Liquid mounting compound.", link: "/sds/ACRYLIC-Plus-Liquid.pdf", keywords: "SDS safety data sheet acrylic plus liquid mounting compound safety", priority: "low" },
    { title: "ACRYLIC Plus Powder SDS", description: "Safety Data Sheet for ACRYLIC Plus Powder mounting compound.", link: "/sds/Acrylic-Plus-Powder.pdf", keywords: "SDS safety data sheet acrylic plus powder mounting compound safety", priority: "low" },
    { title: "Adler Etchant SDS", description: "Safety Data Sheet for Adler etchant solution.", link: "/sds/Adler-etchant.pdf", keywords: "SDS safety data sheet adler etchant etching solution safety", priority: "low" },
    { title: "Air Filter Oil SDS", description: "Safety Data Sheet for Air Filter Oil.", link: "/sds/Air-Filter-Oil.PDF", keywords: "SDS safety data sheet air filter oil lubricant safety", priority: "low" },
    { title: "Al-NaOH Etchant SDS", description: "Safety Data Sheet for Al-NaOH etchant solution.", link: "/sds/Al-NaOH-etchant.pdf", keywords: "SDS safety data sheet al-naoh etchant aluminum etching safety", priority: "low" },
    { title: "Alumina Lapping Films SDS", description: "Safety Data Sheet for Alumina lapping films.", link: "/sds/Alumina-lapping-films.pdf", keywords: "SDS safety data sheet alumina lapping films grinding safety", priority: "low" },
    { title: "Alumina Powders SDS", description: "Safety Data Sheet for Alumina powders.", link: "/sds/Alumina-powders.pdf", keywords: "SDS safety data sheet alumina powders grinding abrasive safety", priority: "low" },
    { title: "Ammonium Hydroxide SDS", description: "Safety Data Sheet for Ammonium hydroxide solution.", link: "/sds/Ammonium-hydroxide.pdf", keywords: "SDS safety data sheet ammonium hydroxide chemical safety", priority: "low" },
    { title: "Ammonium Persulfate Etchant SDS", description: "Safety Data Sheet for Ammonium persulfate etchant.", link: "/sds/Ammonium-persulfate-etchant.pdf", keywords: "SDS safety data sheet ammonium persulfate etchant etching safety", priority: "low" },
    { title: "ASTM 97 Etchant SDS", description: "Safety Data Sheet for ASTM 97 etchant solution.", link: "/sds/ASTM 97-Etchant.pdf", keywords: "SDS safety data sheet astm 97 etchant standard etching safety", priority: "low" },
    { title: "ASTM 157 SDS", description: "Safety Data Sheet for ASTM 157 solution.", link: "/sds/ASTM-157.pdf", keywords: "SDS safety data sheet astm 157 standard solution safety", priority: "low" },
    { title: "ASTM 30 Etchant SDS", description: "Safety Data Sheet for ASTM 30 etchant solution.", link: "/sds/ASTM-30-etchant.pdf", keywords: "SDS safety data sheet astm 30 etchant standard etching safety", priority: "low" },
    { title: "Berahas Reagent SDS", description: "Safety Data Sheet for Berahas reagent.", link: "/sds/Berahas-Reagent.pdf", keywords: "SDS safety data sheet berahas reagent etching solution safety", priority: "low" },
    { title: "Berahas2 Etchant SDS", description: "Safety Data Sheet for Berahas2 etchant solution.", link: "/sds/Berahas2-etchant.pdf", keywords: "SDS safety data sheet berahas2 etchant etching solution safety", priority: "low" },
    { title: "Cable TA Etch SDS", description: "Safety Data Sheet for Cable TA etch solution.", link: "/sds/Cable-TA-etch.pdf", keywords: "SDS safety data sheet cable ta etch etching solution safety", priority: "low" },
    { title: "Carpenters SS Etchant SDS", description: "Safety Data Sheet for Carpenters stainless steel etchant.", link: "/sds/Carpenters-SS-etchant.pdf", keywords: "SDS safety data sheet carpenters stainless steel etchant safety", priority: "low" },
    { title: "Carpenters SS Etchant2 SDS", description: "Safety Data Sheet for Carpenters stainless steel etchant variant 2.", link: "/sds/Carpenters-SS-etchant2.pdf", keywords: "SDS safety data sheet carpenters stainless steel etchant variant safety", priority: "low" },
    { title: "CASTAMOUNT Acrylic Liquid SDS", description: "Safety Data Sheet for CASTAMOUNT Acrylic Liquid mounting compound.", link: "/sds/CASTAMOUNT-Acrylic-Liquid.pdf", keywords: "SDS safety data sheet castamount acrylic liquid mounting compound safety", priority: "low" },
    { title: "CASTAMOUNT Acrylic Powder SDS", description: "Safety Data Sheet for CASTAMOUNT Acrylic Powder mounting compound.", link: "/sds/CASTAMOUNT-Acrylic-Powder.pdf", keywords: "SDS safety data sheet castamount acrylic powder mounting compound safety", priority: "low" },
    { title: "CMP Slurry SDS", description: "Safety Data Sheet for CMP slurry solution.", link: "/sds/CMP-slurry.pdf", keywords: "SDS safety data sheet cmp slurry chemical mechanical polishing safety", priority: "low" },
    { title: "CONDUCTO CU Premium Copper SDS", description: "Safety Data Sheet for CONDUCTO CU Premium Copper mounting compound.", link: "/sds/CONDUCTO-CU-PREMIUM-COPPER.pdf", keywords: "SDS safety data sheet conducto cu premium copper mounting compound safety", priority: "low" },
    { title: "CONDUCTO G Premium Graphite SDS", description: "Safety Data Sheet for CONDUCTO G Premium Graphite mounting compound.", link: "/sds/CONDUCTO-G-PREMIUM-GRAPHITE.pdf", keywords: "SDS safety data sheet conducto g premium graphite mounting compound safety", priority: "low" },
    { title: "CONDUCTOMOUNT Copper SDS", description: "Safety Data Sheet for CONDUCTOMOUNT Copper mounting compound.", link: "/sds/CONDUCTOMOUNT-COPPER.pdf", keywords: "SDS safety data sheet conductomount copper mounting compound safety", priority: "low" },
    { title: "CONDUCTOMOUNT Graphite SDS", description: "Safety Data Sheet for CONDUCTOMOUNT Graphite mounting compound.", link: "/sds/CONDUCTOMOUNT-GRAPHITE.pdf", keywords: "SDS safety data sheet conductomount graphite mounting compound safety", priority: "low" },
    { title: "Copper Etchant No1 SDS", description: "Safety Data Sheet for Copper Etchant No1 solution.", link: "/sds/Copper-Etchant-No1.pdf", keywords: "SDS safety data sheet copper etchant no1 etching solution safety", priority: "low" },
    { title: "Copper Etchant No2 SDS", description: "Safety Data Sheet for Copper Etchant No2 solution.", link: "/sds/Copper-Etchant-No2.pdf", keywords: "SDS safety data sheet copper etchant no2 etching solution safety", priority: "low" },
    { title: "Copper Sulfate Passivation SDS", description: "Safety Data Sheet for Copper sulfate passivation solution.", link: "/sds/Copper-sulfate-passivation.pdf", keywords: "SDS safety data sheet copper sulfate passivation solution safety", priority: "low" },
    { title: "DIACUT Lubricant SDS", description: "Safety Data Sheet for DIACUT lubricant.", link: "/sds/DIACUT-Lubricant.pdf", keywords: "SDS safety data sheet diacut lubricant cutting fluid safety", priority: "low" },
    { title: "DIACUT Oil-Based Lubricant SDS", description: "Safety Data Sheet for DIACUT oil-based lubricant.", link: "/sds/DIACUT-oil-based-lubricant.pdf", keywords: "SDS safety data sheet diacut oil based lubricant cutting fluid safety", priority: "low" },
    { title: "DIACUT2 Cutting Fluid SDS", description: "Safety Data Sheet for DIACUT2 cutting fluid.", link: "/sds/DIACUT2-Cutting-Fluid.pdf", keywords: "SDS safety data sheet diacut2 cutting fluid lubricant safety", priority: "low" },
    { title: "Diallyl Phthalate SDS", description: "Safety Data Sheet for Diallyl phthalate compound.", link: "/sds/Diallyl-Phthalate.pdf", keywords: "SDS safety data sheet diallyl phthalate compound safety", priority: "low" },
    { title: "Dialube Blue SDS", description: "Safety Data Sheet for Dialube Blue lubricant.", link: "/sds/Dialube-Blue.pdf", keywords: "SDS safety data sheet dialube blue lubricant safety", priority: "low" },
    { title: "DIALUBE Lubricant SDS", description: "Safety Data Sheet for DIALUBE lubricant.", link: "/sds/DIALUBE-Lubricant.pdf", keywords: "SDS safety data sheet dialube lubricant safety", priority: "low" },
    { title: "Dialube Purple SDS", description: "Safety Data Sheet for Dialube Purple lubricant.", link: "/sds/Dialube-Purple.pdf", keywords: "SDS safety data sheet dialube purple lubricant safety", priority: "low" },
    { title: "DIAMAT Monocrystalline Diamond SDS", description: "Safety Data Sheet for DIAMAT Monocrystalline Diamond suspension.", link: "/sds/DIAMAT-MONOCRYSTALLINE-DIAMOND.pdf", keywords: "SDS safety data sheet diamat monocrystalline diamond suspension polishing safety", priority: "low" },
    { title: "DIAMAT Polycrystalline Diamond SDS", description: "Safety Data Sheet for DIAMAT Polycrystalline Diamond suspension.", link: "/sds/DIAMAT-POLYCRYSTALLINE-DIAMOND.pdf", keywords: "SDS safety data sheet diamat polycrystalline diamond suspension polishing safety", priority: "low" },
    { title: "DIAMAT Water-based Diamond SDS", description: "Safety Data Sheet for DIAMAT Water-based Diamond suspension.", link: "/sds/DIAMAT-Water-based-DIAMOND.pdf", keywords: "SDS safety data sheet diamat water based diamond suspension polishing safety", priority: "low" },
    { title: "Diamond Lapping Films SDS", description: "Safety Data Sheet for Diamond lapping films.", link: "/sds/Diamond-lapping-films.pdf", keywords: "SDS safety data sheet diamond lapping films grinding safety", priority: "low" },
    { title: "Diamond Paste SDS", description: "Safety Data Sheet for Diamond paste.", link: "/sds/Diamond-Paste.pdf", keywords: "SDS safety data sheet diamond paste polishing safety", priority: "low" },
    { title: "Diamond Powders SDS", description: "Safety Data Sheet for Diamond powders.", link: "/sds/Diamond-powders.pdf", keywords: "SDS safety data sheet diamond powders polishing abrasive safety", priority: "low" },
    { title: "Dichromate Etchant SDS", description: "Safety Data Sheet for Dichromate etchant solution.", link: "/sds/Dichromate-etchant.pdf", keywords: "SDS safety data sheet dichromate etchant etching solution safety", priority: "low" },
    { title: "Dressing Stick SDS", description: "Safety Data Sheet for Dressing stick.", link: "/sds/Dressing-Stick.pdf", keywords: "SDS safety data sheet dressing stick grinding safety", priority: "low" },
    { title: "EPOCOMP Plus SDS", description: "Safety Data Sheet for EPOCOMP Plus mounting compound.", link: "/sds/EPOCOMP-PLUS.pdf", keywords: "SDS safety data sheet epocomp plus mounting compound safety", priority: "low" },
    { title: "EPOCOMP SDS", description: "Safety Data Sheet for EPOCOMP mounting compound.", link: "/sds/EPOCOMP.pdf", keywords: "SDS safety data sheet epocomp mounting compound safety", priority: "low" },
    { title: "Epoxy Plus Resin SDS", description: "Safety Data Sheet for Epoxy Plus resin.", link: "/sds/EPOXY PLUS RESIN.pdf", keywords: "SDS safety data sheet epoxy plus resin mounting compound safety", priority: "low" },
    { title: "Epoxy 2 SDS", description: "Safety Data Sheet for Epoxy 2 mounting compound.", link: "/sds/EPOXY-2.pdf", keywords: "SDS safety data sheet epoxy 2 mounting compound safety", priority: "low" },
    { title: "Epoxy Elite 2 Hardener SDS", description: "Safety Data Sheet for Epoxy Elite 2 hardener.", link: "/sds/EPOXY-ELITE-2-Hardener.pdf", keywords: "SDS safety data sheet epoxy elite 2 hardener mounting compound safety", priority: "low" },
    { title: "Epoxy Elite 2 Resin SDS", description: "Safety Data Sheet for Epoxy Elite 2 resin.", link: "/sds/EPOXY-ELITE-2-Resin.pdf", keywords: "SDS safety data sheet epoxy elite 2 resin mounting compound safety", priority: "low" },
    { title: "Epoxy Elite Hardener SDS", description: "Safety Data Sheet for Epoxy Elite hardener.", link: "/sds/EPOXY-ELITE-hardener.pdf", keywords: "SDS safety data sheet epoxy elite hardener mounting compound safety", priority: "low" },
    { title: "Epoxy Elite SDS", description: "Safety Data Sheet for Epoxy Elite mounting compound.", link: "/sds/EPOXY-ELITE.pdf", keywords: "SDS safety data sheet epoxy elite mounting compound safety", priority: "low" },
    { title: "Epoxy Hardener SDS", description: "Safety Data Sheet for Epoxy hardener.", link: "/sds/EPOXY-hardener.pdf", keywords: "SDS safety data sheet epoxy hardener mounting compound safety", priority: "low" },
    { title: "Epoxy Plus Hardener SDS", description: "Safety Data Sheet for Epoxy Plus hardener.", link: "/sds/EPOXY-PLUS-hardener.pdf", keywords: "SDS safety data sheet epoxy plus hardener mounting compound safety", priority: "low" },
    { title: "Epoxy Plus Resin SDS", description: "Safety Data Sheet for Epoxy Plus resin.", link: "/sds/EPOXY-PLUS-RESIN.pdf", keywords: "SDS safety data sheet epoxy plus resin mounting compound safety", priority: "low" },
    { title: "Epoxy SDS", description: "Safety Data Sheet for Epoxy mounting compound.", link: "/sds/EPOXY.pdf", keywords: "SDS safety data sheet epoxy mounting compound safety", priority: "low" },
    { title: "Ethylene Glycol SDS", description: "Safety Data Sheet for Ethylene glycol solution.", link: "/sds/Ethylene-glycol.pdf", keywords: "SDS safety data sheet ethylene glycol chemical safety", priority: "low" },
    { title: "Everlube SDS", description: "Safety Data Sheet for Everlube lubricant.", link: "/sds/Everlube.pdf", keywords: "SDS safety data sheet everlube lubricant safety", priority: "low" },
    { title: "Frys Etchant SDS", description: "Safety Data Sheet for Frys etchant solution.", link: "/sds/Frys-etchant.pdf", keywords: "SDS safety data sheet frys etchant etching solution safety", priority: "low" },
    { title: "Inconel Etchant SDS", description: "Safety Data Sheet for Inconel etchant solution.", link: "/sds/Inconel-Etchant.pdf", keywords: "SDS safety data sheet inconel etchant etching solution safety", priority: "low" },
    { title: "Kallings Waterless SDS", description: "Safety Data Sheet for Kallings waterless etchant.", link: "/sds/Kallings - Waterless.pdf", keywords: "SDS safety data sheet kallings waterless etchant etching solution safety", priority: "low" },
    { title: "Kallings No2 SDS", description: "Safety Data Sheet for Kallings No2 etchant.", link: "/sds/Kallings-No2.pdf", keywords: "SDS safety data sheet kallings no2 etchant etching solution safety", priority: "low" },
    { title: "Kellers Reagent SDS", description: "Safety Data Sheet for Kellers reagent.", link: "/sds/Kellers.pdf", keywords: "SDS safety data sheet kellers reagent etching solution safety", priority: "low" },
    { title: "Klemms II Reagent SDS", description: "Safety Data Sheet for Klemms II reagent.", link: "/sds/Klemms-II-Reagent.pdf", keywords: "SDS safety data sheet klemms ii reagent etching solution safety", priority: "low" },
    { title: "Krolls Reagent SDS", description: "Safety Data Sheet for Krolls reagent.", link: "/sds/Krolls.pdf", keywords: "SDS safety data sheet krolls reagent etching solution safety", priority: "low" },
    { title: "Lapping Film Lubricant SDS", description: "Safety Data Sheet for Lapping film lubricant.", link: "/sds/LappingFilmLubricant.pdf", keywords: "SDS safety data sheet lapping film lubricant grinding safety", priority: "low" },
    { title: "Lepitos No1 SDS", description: "Safety Data Sheet for Lepitos No1 etchant.", link: "/sds/Lepitos-No1.pdf", keywords: "SDS safety data sheet lepitos no1 etchant etching solution safety", priority: "low" },
    { title: "Marbles Modified SDS", description: "Safety Data Sheet for Marbles Modified etchant.", link: "/sds/Marbles-Modified.pdf", keywords: "SDS safety data sheet marbles modified etchant etching solution safety", priority: "low" },
    { title: "Marbles SDS", description: "Safety Data Sheet for Marbles etchant.", link: "/sds/Marbles.pdf", keywords: "SDS safety data sheet marbles etchant etching solution safety", priority: "low" },
    { title: "MAXCUT Blades SDS", description: "Safety Data Sheet for MAXCUT blades.", link: "/sds/MAXCUT-Blades.pdf", keywords: "SDS safety data sheet maxcut blades cutting safety", priority: "low" },
    { title: "MAXCUT Cutting Fluid SDS", description: "Safety Data Sheet for MAXCUT cutting fluid.", link: "/sds/MAXCUT-Cutting-Fluid.pdf", keywords: "SDS safety data sheet maxcut cutting fluid lubricant safety", priority: "low" },
    { title: "MAXCUT Emulsion Cutting Fluid SDS", description: "Safety Data Sheet for MAXCUT emulsion cutting fluid.", link: "/sds/MAXCUT-Emulsion-cutting-fluid.pdf", keywords: "SDS safety data sheet maxcut emulsion cutting fluid lubricant safety", priority: "low" },
    { title: "MAXCUT Lubricant SDS", description: "Safety Data Sheet for MAXCUT lubricant.", link: "/sds/MAXCUT-Lubricant.pdf", keywords: "SDS safety data sheet maxcut lubricant safety", priority: "low" },
    { title: "MAXCUT Oil Soluble Cutting Fluid SDS", description: "Safety Data Sheet for MAXCUT oil soluble cutting fluid.", link: "/sds/MAXCUT-Oil-Soluble-cutting-fluid.pdf", keywords: "SDS safety data sheet maxcut oil soluble cutting fluid lubricant safety", priority: "low" },
    { title: "MAXCUT Rubber Bonded Abrasive Blades SDS", description: "Safety Data Sheet for MAXCUT rubber bonded abrasive blades.", link: "/sds/MAXCUT-rubber-bonded-abrasive-blades.pdf", keywords: "SDS safety data sheet maxcut rubber bonded abrasive blades cutting safety", priority: "low" },
    { title: "MAXCUT2 Cutting Fluid SDS", description: "Safety Data Sheet for MAXCUT2 cutting fluid.", link: "/sds/MAXCUT2-Cutting-Fluid.pdf", keywords: "SDS safety data sheet maxcut2 cutting fluid lubricant safety", priority: "low" },
    { title: "Mayville Etchant SDS", description: "Safety Data Sheet for Mayville etchant solution.", link: "/sds/Mayville-etchant.pdf", keywords: "SDS safety data sheet mayville etchant etching solution safety", priority: "low" },
    { title: "McWane Etchant SDS", description: "Safety Data Sheet for McWane etchant solution.", link: "/sds/McWane-etchant.pdf", keywords: "SDS safety data sheet mcwane etchant etching solution safety", priority: "low" },
    { title: "Modified Tuckers Etchant SDS", description: "Safety Data Sheet for Modified Tuckers etchant solution.", link: "/sds/Modified-Tuckers-etchant.pdf", keywords: "SDS safety data sheet modified tuckers etchant etching solution safety", priority: "low" },
    { title: "Mold Release SDS", description: "Safety Data Sheet for Mold release compound.", link: "/sds/Mold-release.pdf", keywords: "SDS safety data sheet mold release compound safety", priority: "low" },
    { title: "Murakamis Etchant SDS", description: "Safety Data Sheet for Murakamis etchant solution.", link: "/sds/Murakamis-Etchant.pdf", keywords: "SDS safety data sheet murakamis etchant etching solution safety", priority: "low" },
    { title: "NANO Alumina SDS", description: "Safety Data Sheet for NANO Alumina suspension.", link: "/sds/NANO-Alumina.pdf", keywords: "SDS safety data sheet nano alumina suspension polishing safety", priority: "low" },
    { title: "Nanometer Acidic Alumina SDS", description: "Safety Data Sheet for Nanometer acidic alumina suspension.", link: "/sds/NANOMETER-ACIDIC-AUMINA.pdf", keywords: "SDS safety data sheet nanometer acidic alumina suspension polishing safety", priority: "low" },
    { title: "Nanometer Alumina SDS", description: "Safety Data Sheet for Nanometer alumina suspension.", link: "/sds/NANOMETER-AUMINA.pdf", keywords: "SDS safety data sheet nanometer alumina suspension polishing safety", priority: "low" },
    { title: "NaOH Etchant SDS", description: "Safety Data Sheet for NaOH etchant solution.", link: "/sds/NaOH-etchant.pdf", keywords: "SDS safety data sheet naoh etchant sodium hydroxide etching solution safety", priority: "low" },
    { title: "Nickel Etch SDS", description: "Safety Data Sheet for Nickel etch solution.", link: "/sds/Nickel-Etch.pdf", keywords: "SDS safety data sheet nickel etch etching solution safety", priority: "low" },
    { title: "Nickel Etchant SDS", description: "Safety Data Sheet for Nickel etchant solution.", link: "/sds/Nickel-Etchant.pdf", keywords: "SDS safety data sheet nickel etchant etching solution safety", priority: "low" },
    { title: "Nital Salt SDS", description: "Safety Data Sheet for Nital salt etchant.", link: "/sds/Nital-Salt.pdf", keywords: "SDS safety data sheet nital salt etchant etching solution safety", priority: "low" },
    { title: "Nital SDS", description: "Safety Data Sheet for Nital etchant solution.", link: "/sds/Nital.pdf", keywords: "SDS safety data sheet nital etchant etching solution safety", priority: "low" },
    { title: "Oberhoffers Reagent SDS", description: "Safety Data Sheet for Oberhoffers reagent.", link: "/sds/Oberhoffers-reagent.pdf", keywords: "SDS safety data sheet oberhoffers reagent etching solution safety", priority: "low" },
    { title: "PACE CrO3 SDS", description: "Safety Data Sheet for PACE CrO3 solution.", link: "/sds/PACE-CrO3.pdf", keywords: "SDS safety data sheet pace cro3 chromium oxide solution safety", priority: "low" },
    { title: "PACE LUBE SDS", description: "Safety Data Sheet for PACE LUBE lubricant.", link: "/sds/PACE-LUBE.pdf", keywords: "SDS safety data sheet pace lube lubricant safety", priority: "low" },
    { title: "Parker Hannifin Etchant SDS", description: "Safety Data Sheet for Parker Hannifin etchant solution.", link: "/sds/Parker-Hannifin-etchant.pdf", keywords: "SDS safety data sheet parker hannifin etchant etching solution safety", priority: "low" },
    { title: "PCC 5000 SDS", description: "Safety Data Sheet for PCC 5000 compound.", link: "/sds/PCC-5000.pdf", keywords: "SDS safety data sheet pcc 5000 compound safety", priority: "low" },
    { title: "PCC 7500 SDS", description: "Safety Data Sheet for PCC 7500 compound.", link: "/sds/PCC-7500.pdf", keywords: "SDS safety data sheet pcc 7500 compound safety", priority: "low" },
    { title: "Phenolic Premium SDS", description: "Safety Data Sheet for Phenolic Premium mounting compound.", link: "/sds/Phenolic-Premium.pdf", keywords: "SDS safety data sheet phenolic premium mounting compound safety", priority: "low" },
    { title: "Phenolics SDS", description: "Safety Data Sheet for Phenolics mounting compound.", link: "/sds/Phenolics.pdf", keywords: "SDS safety data sheet phenolics mounting compound safety", priority: "low" },
    { title: "PICRAL Etchant SDS", description: "Safety Data Sheet for PICRAL etchant solution.", link: "/sds/PICRAL-Etchant.pdf", keywords: "SDS safety data sheet picral etchant etching solution safety", priority: "low" },
    { title: "Polycast Hardener SDS", description: "Safety Data Sheet for Polycast hardener.", link: "/sds/Polycast-hardener.pdf", keywords: "SDS safety data sheet polycast hardener mounting compound safety", priority: "low" },
    { title: "Polycast Resin SDS", description: "Safety Data Sheet for Polycast resin.", link: "/sds/Polycast-resin.pdf", keywords: "SDS safety data sheet polycast resin mounting compound safety", priority: "low" },
    { title: "POLYLUBE RED SDS", description: "Safety Data Sheet for POLYLUBE RED lubricant.", link: "/sds/POLYLUBE-RED.pdf", keywords: "SDS safety data sheet polylube red lubricant safety", priority: "low" },
    { title: "Polylube SDS", description: "Safety Data Sheet for Polylube lubricant.", link: "/sds/Polylube.pdf", keywords: "SDS safety data sheet polylube lubricant safety", priority: "low" },
    { title: "Premium Acrylic Liquid SDS", description: "Safety Data Sheet for Premium Acrylic Liquid mounting compound.", link: "/sds/PREMIUM-Acrylic-Liquid.pdf", keywords: "SDS safety data sheet premium acrylic liquid mounting compound safety", priority: "low" },
    { title: "Premium Acrylic Powder SDS", description: "Safety Data Sheet for Premium Acrylic Powder mounting compound.", link: "/sds/Premium-Acrylic-Powder.pdf", keywords: "SDS safety data sheet premium acrylic powder mounting compound safety", priority: "low" },
    { title: "PS-41 Etchant SDS", description: "Safety Data Sheet for PS-41 etchant solution.", link: "/sds/PS-41-etchant.pdf", keywords: "SDS safety data sheet ps-41 etchant etching solution safety", priority: "low" },
    { title: "QUICKMOUNT 2 Resin SDS", description: "Safety Data Sheet for QUICKMOUNT 2 resin.", link: "/sds/QUICKMOUNT-2-Resin.pdf", keywords: "SDS safety data sheet quickmount 2 resin mounting compound safety", priority: "low" },
    { title: "QUICKMOUNT2 Hardener SDS", description: "Safety Data Sheet for QUICKMOUNT2 hardener.", link: "/sds/QUICKMOUNT2-hardener.pdf", keywords: "SDS safety data sheet quickmount2 hardener mounting compound safety", priority: "low" },
    { title: "Ralphs Etchant SDS", description: "Safety Data Sheet for Ralphs etchant solution.", link: "/sds/Ralphs-Etchant.pdf", keywords: "SDS safety data sheet ralphs etchant etching solution safety", priority: "low" },
    { title: "SIAMAT 2 Colloidal Silica SDS", description: "Safety Data Sheet for SIAMAT 2 colloidal silica suspension.", link: "/sds/SIAMAT-2-colloidal-silica.pdf", keywords: "SDS safety data sheet siamat 2 colloidal silica suspension polishing safety", priority: "low" },
    { title: "SIAMAT Blue Colloidal Silica SDS", description: "Safety Data Sheet for SIAMAT Blue colloidal silica suspension.", link: "/sds/SIAMAT-Blue-colloidal-silica.pdf", keywords: "SDS safety data sheet siamat blue colloidal silica suspension polishing safety", priority: "low" },
    { title: "SIAMAT Colloidal Silica SDS", description: "Safety Data Sheet for SIAMAT colloidal silica suspension.", link: "/sds/SIAMAT-colloidal-silica.pdf", keywords: "SDS safety data sheet siamat colloidal silica suspension polishing safety", priority: "low" },
    { title: "SiC Grinding Papers SDS", description: "Safety Data Sheet for SiC grinding papers.", link: "/sds/SIC-grinding-papers.pdf", keywords: "SDS safety data sheet sic silicon carbide grinding papers safety", priority: "low" },
    { title: "SiC Lapping Films SDS", description: "Safety Data Sheet for SiC lapping films.", link: "/sds/SIC-lapping-films.pdf", keywords: "SDS safety data sheet sic silicon carbide lapping films safety", priority: "low" },
    { title: "SiC Powders SDS", description: "Safety Data Sheet for SiC powders.", link: "/sds/SiC-powders.pdf", keywords: "SDS safety data sheet sic silicon carbide powders safety", priority: "low" },
    { title: "Silicon Mold Release SDS", description: "Safety Data Sheet for Silicon mold release compound.", link: "/sds/Silicon-Mold-release.pdf", keywords: "SDS safety data sheet silicon mold release compound safety", priority: "low" },
    { title: "SUPERMOUNT Acrylic Liquid SDS", description: "Safety Data Sheet for SUPERMOUNT Acrylic Liquid mounting compound.", link: "/sds/SUPERMOUNT-Acrylic-Liquid.pdf", keywords: "SDS safety data sheet supermount acrylic liquid mounting compound safety", priority: "low" },
    { title: "SUPERMOUNT Acrylic Powder SDS", description: "Safety Data Sheet for SUPERMOUNT Acrylic Powder mounting compound.", link: "/sds/SUPERMOUNT-Acrylic-Powder.pdf", keywords: "SDS safety data sheet supermount acrylic powder mounting compound safety", priority: "low" },
    { title: "Titanium Attack Polish SDS", description: "Safety Data Sheet for Titanium attack polish solution.", link: "/sds/Titanium-attack-polish.pdf", keywords: "SDS safety data sheet titanium attack polish polishing solution safety", priority: "low" },
    { title: "TRANSACRYLIC Powder SDS", description: "Safety Data Sheet for TRANSACRYLIC powder mounting compound.", link: "/sds/TRANSACRYLIC-powder.pdf", keywords: "SDS safety data sheet transacrylic powder mounting compound safety", priority: "low" },
    { title: "TRANSACRYLIC Premium Powder SDS", description: "Safety Data Sheet for TRANSACRYLIC Premium powder mounting compound.", link: "/sds/TRANSACRYLIC-PREMIUM-powder.pdf", keywords: "SDS safety data sheet transacrylic premium powder mounting compound safety", priority: "low" },
    { title: "ULTRACLEAN 2 SDS", description: "Safety Data Sheet for ULTRACLEAN 2 cleaning solution.", link: "/sds/ULTRACLEAN-2.pdf", keywords: "SDS safety data sheet ultraclean 2 cleaning solution safety", priority: "low" },
    { title: "ULTRACLEAN SDS", description: "Safety Data Sheet for ULTRACLEAN cleaning solution.", link: "/sds/ULTRACLEAN.pdf", keywords: "SDS safety data sheet ultraclean cleaning solution safety", priority: "low" },
    { title: "Ultrasonic Degreaser Cleaner SDS", description: "Safety Data Sheet for Ultrasonic degreaser cleaner solution.", link: "/sds/Ultrasonic-Degreaser-cleaner.pdf", keywords: "SDS safety data sheet ultrasonic degreaser cleaner cleaning solution safety", priority: "low" },
    { title: "ULTRATHIN Plus Epoxy Resin SDS", description: "Safety Data Sheet for ULTRATHIN Plus epoxy resin.", link: "/sds/ULTRATHIN-PLUS-EPOXY-RESIN.pdf", keywords: "SDS safety data sheet ultrathin plus epoxy resin mounting compound safety", priority: "low" },
    { title: "ULTRATHIN Plus Hardener SDS", description: "Safety Data Sheet for ULTRATHIN Plus hardener.", link: "/sds/ULTRATHIN-PLUS-hardener.pdf", keywords: "SDS safety data sheet ultrathin plus hardener mounting compound safety", priority: "low" },
    { title: "ULTRATHIN2 Epoxy SDS", description: "Safety Data Sheet for ULTRATHIN2 epoxy mounting compound.", link: "/sds/ULTRATHIN2-epoxy.pdf", keywords: "SDS safety data sheet ultrathin2 epoxy mounting compound safety", priority: "low" },
    { title: "ULTRATHIN2 Hardener SDS", description: "Safety Data Sheet for ULTRATHIN2 hardener.", link: "/sds/ULTRATHIN2-hardener.pdf", keywords: "SDS safety data sheet ultrathin2 hardener mounting compound safety", priority: "low" },
    { title: "ULTRATHIN2 Plus Hardener SDS", description: "Safety Data Sheet for ULTRATHIN2 Plus hardener.", link: "/sds/ULTRATHIN2-PLUS-hardener.pdf", keywords: "SDS safety data sheet ultrathin2 plus hardener mounting compound safety", priority: "low" },
    { title: "UV-032 SDS", description: "Safety Data Sheet for UV-032 compound.", link: "/sds/UV-032.pdf", keywords: "SDS safety data sheet uv-032 compound safety", priority: "low" },
    { title: "V2A Etchant SDS", description: "Safety Data Sheet for V2A etchant solution.", link: "/sds/V2A-etchant.pdf", keywords: "SDS safety data sheet v2a etchant etching solution safety", priority: "low" },
    { title: "Vilellas Reagent SDS", description: "Safety Data Sheet for Vilellas reagent.", link: "/sds/Vilellas-Reagent.pdf", keywords: "SDS safety data sheet vilellas reagent etching solution safety", priority: "low" },
    { title: "Water-based Diamond SDS", description: "Safety Data Sheet for Water-based Diamond suspension.", link: "/sds/Water-based DIAMOND.pdf", keywords: "SDS safety data sheet water based diamond suspension polishing safety", priority: "low" },
    { title: "Waterless Kallings SDS", description: "Safety Data Sheet for Waterless Kallings etchant.", link: "/sds/Waterless-Kallings.pdf", keywords: "SDS safety data sheet waterless kallings etchant etching solution safety", priority: "low" },
    { title: "Wecks Etch SDS", description: "Safety Data Sheet for Wecks etch solution.", link: "/sds/Wecks-Etch.pdf", keywords: "SDS safety data sheet wecks etch etching solution safety", priority: "low" },
    { title: "Wecks KMnO4 Etchants SDS", description: "Safety Data Sheet for Wecks KMnO4 etchants solution.", link: "/sds/Wecks-KMnO4-etchants.pdf", keywords: "SDS safety data sheet wecks kmno4 etchants etching solution safety", priority: "low" },
    { title: "Wecks No 1 SDS", description: "Safety Data Sheet for Wecks No 1 etchant.", link: "/sds/Wecks-No-1.pdf", keywords: "SDS safety data sheet wecks no 1 etchant etching solution safety", priority: "low" },
    { title: "Winsteards Reagent SDS", description: "Safety Data Sheet for Winsteards reagent.", link: "/sds/Winsteards-Reagent.pdf", keywords: "SDS safety data sheet winsteards reagent etching solution safety", priority: "low" },
    { title: "ZRO Grinding Papers SDS", description: "Safety Data Sheet for ZRO grinding papers.", link: "/sds/ZRO-grinding-papers.pdf", keywords: "SDS safety data sheet zro zirconia grinding papers safety", priority: "low" },
    
    // Support Pages
    { title: "Etchant Information", description: "Comprehensive guide to metallographic etchants, including selection, application, and safety information.", link: "/support/etchant-information.html", keywords: "etchant etching solutions microstructure safety handling chemical reagents metallographic etching nital picral keller's reagent vilella's reagent" },
    { title: "Preparation Procedures", description: "Detailed procedures for sample preparation, including mounting, grinding, polishing, and etching techniques.", link: "/support/procedures.html", keywords: "preparation procedures mounting grinding polishing etching techniques methods protocols sample preparation metallographic preparation" },
    { title: "Product Catalog", description: "Browse our complete catalog of metallographic equipment, consumables, and accessories.", link: "/support/products.html", keywords: "product catalog equipment consumables accessories inventory products list specifications" },
    { title: "Safety Data Sheets", description: "Access safety data sheets (SDS) for all our products, ensuring safe handling and compliance.", link: "/support/sds.html", keywords: "safety data sheets SDS handling compliance safety chemical safety material safety data sheets MSDS" },
    { title: "Site Map", description: "Complete site map for easy navigation of all PACE Technologies resources and pages.", link: "/support/site-map.html", keywords: "site map navigation sitemap all pages resources" },
    
    // Events & News
    { title: "Upcoming Events", description: "Information about upcoming trade shows, conferences, and events.", link: "/events.html", keywords: "upcoming events trade shows conferences exhibitions metallographic events" },
    
    // Guides - Basics
    { title: "Introduction to Metallography", description: "Learn the fundamentals of metallography, including what it is, why it matters, and how it's used in materials science and engineering.", link: "/guides/introduction-to-metallography.html", keywords: "introduction metallography fundamentals basics materials science engineering beginner guide", type: "guide", category: "Basics", difficulty: "Beginner" },
    { title: "Purpose and Applications", description: "Discover the various applications of metallography in quality control, failure analysis, research, and materials development.", link: "/guides/purpose-and-applications.html", keywords: "purpose applications metallography quality control failure analysis research materials development", type: "guide", category: "Basics", difficulty: "Beginner" },
    { title: "History of Metallography", description: "Explore the evolution of metallography from its origins to modern techniques. Understand how the field has developed over time.", link: "/guides/history-of-metallography.html", keywords: "history metallography evolution origins modern techniques development timeline", type: "guide", category: "Basics", difficulty: "Beginner" },
    { title: "Equipment Overview", description: "Learn about the essential equipment used in metallography, from sectioning equipment to microscopes. Understand what equipment you need for metallographic sample preparation.", link: "/guides/equipment-overview.html", keywords: "equipment overview metallography sectioning microscopes sample preparation tools", type: "guide", category: "Basics", difficulty: "Beginner" },
    { title: "Safety Fundamentals", description: "Essential safety practices for metallography laboratories. Learn about chemical safety, equipment safety, personal protective equipment, and safe work practices.", link: "/guides/safety-fundamentals.html", keywords: "safety fundamentals metallography laboratories chemical safety equipment safety PPE personal protective equipment", type: "guide", category: "Basics", difficulty: "Beginner" },
    { title: "Common Misconceptions", description: "Learn about common mistakes and misconceptions beginners make in metallography. Avoid these pitfalls and develop better metallographic practices.", link: "/guides/common-misconceptions.html", keywords: "common misconceptions mistakes beginners metallography pitfalls best practices", type: "guide", category: "Basics", difficulty: "Beginner" },
    
    // Guides - Process
    { title: "Sectioning Guide", description: "Overview of sample sectioning techniques covering both abrasive and precision sectioning methods. Includes saw selection, cutting parameters, and minimizing damage during the cutting process.", link: "/guides/sectioning.html", keywords: "sectioning sample cutting saw selection cutting parameters minimizing damage abrasive precision sectioning", type: "guide", category: "Process", difficulty: "Beginner" },
    { title: "Mounting Guide", description: "Overview of mounting procedures including compression mounting, castable mounting, and selecting appropriate mounting materials.", link: "/guides/mounting.html", keywords: "mounting compression castable mounting materials procedures", type: "guide", category: "Process", difficulty: "Beginner" },
    { title: "Grinding Techniques", description: "Overview of grinding with proper grit selection, pressure control, and technique. Learn progressive grinding methods for optimal surface quality.", link: "/guides/grinding-techniques.html", keywords: "grinding techniques grit selection pressure control progressive grinding surface quality", type: "guide", category: "Process", difficulty: "Beginner" },
    { title: "Polishing Methods", description: "Overview of polishing techniques for different materials and applications. Covers diamond polishing, oxide polishing, and final polishing strategies.", link: "/guides/polishing-methods.html", keywords: "polishing methods diamond polishing oxide polishing final polishing strategies", type: "guide", category: "Process", difficulty: "Intermediate" },
    { title: "Etching Procedures", description: "Overview of etching techniques, reagent selection, and application methods. Learn how to reveal microstructures effectively and safely.", link: "/guides/etching-procedures.html", keywords: "etching procedures reagent selection application methods microstructures", type: "guide", category: "Process", difficulty: "Intermediate" },
    { title: "Microstructural Analysis", description: "Complete guide to preparing samples for microscopy, choosing the right microscope, and interpreting common microstructures in metals and alloys.", link: "/guides/microstructural-analysis.html", keywords: "microstructural analysis microscopy interpreting microstructures metals alloys", type: "guide", category: "Process", difficulty: "Intermediate" },
    
    // Guides - Material-Specific
    { title: "Stainless Steel Preparation", description: "Complete in-depth guide to preparing stainless steel samples for metallographic analysis, including sectioning, mounting, grinding, polishing, and etching techniques.", link: "/guides/stainless-steel-preparation.html", keywords: "stainless steel preparation 304 316 430 431 sectioning mounting grinding polishing etching", type: "guide", category: "Material-Specific", difficulty: "Intermediate" },
    { title: "Aluminum Sample Preparation", description: "In-depth guide for preparing aluminum samples without smearing or deformation. Learn proper techniques for soft materials and avoid common pitfalls.", link: "/guides/aluminum-sample-preparation.html", keywords: "aluminum preparation 6061 7075 smearing deformation soft materials", type: "guide", category: "Material-Specific", difficulty: "Intermediate" },
    { title: "Copper and Copper Alloys Preparation", description: "In-depth preparation methods for copper and its alloys, including brass and bronze. Learn techniques to avoid smearing and reveal true microstructures.", link: "/guides/copper-and-copper-alloys-preparation.html", keywords: "copper alloys brass bronze preparation smearing microstructures", type: "guide", category: "Material-Specific", difficulty: "Intermediate" },
    { title: "Titanium Preparation", description: "In-depth specialized techniques for preparing titanium samples, including handling reactive surfaces and proper etching methods for alpha and beta phases.", link: "/guides/titanium-preparation.html", keywords: "titanium preparation Ti6Al4V reactive surfaces alpha beta phases etching", type: "guide", category: "Material-Specific", difficulty: "Advanced" },
    { title: "Carbon and Low Alloy Steels Preparation", description: "In-depth procedures for preparing carbon steel and low alloy steel samples (1018, 1045, 4140, 4340, 5160, 52100). Covers proper etching for pearlite, ferrite, and martensite structures.", link: "/guides/carbon-steel-preparation.html", keywords: "carbon steel low alloy 1018 1045 4140 4340 5160 52100 pearlite ferrite martensite", type: "guide", category: "Material-Specific", difficulty: "Intermediate" },
    { title: "Cast Iron Preparation", description: "Complete guide to preparing cast iron samples with emphasis on preserving graphite structure. Covers gray, ductile, malleable, and austempered ductile iron preparation techniques.", link: "/guides/cast-iron-preparation.html", keywords: "cast iron gray ductile malleable austempered graphite structure", type: "guide", category: "Material-Specific", difficulty: "Intermediate" },
    { title: "Tool Steel and Hardened Steel Preparation", description: "Comprehensive guide for preparing very hard tool steels and hardened steels. Learn techniques for preserving carbides, extended preparation sequences, and revealing complex microstructures in high-hardness materials.", link: "/guides/tool-steel-preparation.html", keywords: "tool steel hardened steel carbides high hardness microstructures", type: "guide", category: "Material-Specific", difficulty: "Advanced" },
    { title: "Nickel and Cobalt Superalloys Preparation", description: "Comprehensive guide for preparing nickel and cobalt superalloys including Inconel, Hastelloy, and Stellite. Learn techniques for handling high-temperature alloys and revealing complex microstructures.", link: "/guides/nickel-alloys-preparation.html", keywords: "nickel cobalt superalloys Inconel Hastelloy Stellite high temperature alloys", type: "guide", category: "Material-Specific", difficulty: "Advanced" },
    { title: "Magnesium Preparation", description: "Specialized techniques for preparing magnesium and magnesium alloys. Learn how to handle reactive materials and avoid oxidation artifacts.", link: "/guides/magnesium-preparation.html", keywords: "magnesium alloys reactive materials oxidation artifacts", type: "guide", category: "Material-Specific", difficulty: "Advanced" },
    { title: "Ceramics Preparation", description: "Complete guide to preparing ceramic samples for metallographic analysis. Covers sectioning hard materials, avoiding chipping, and revealing grain boundaries.", link: "/guides/ceramics-preparation.html", keywords: "ceramics preparation hard materials chipping grain boundaries", type: "guide", category: "Material-Specific", difficulty: "Advanced" },
    { title: "Composites Preparation", description: "In-depth techniques for preparing composite materials including fiber-reinforced composites. Learn to avoid pullout, maintain fiber orientation, and reveal interfaces.", link: "/guides/composites-preparation.html", keywords: "composites fiber reinforced pullout fiber orientation interfaces", type: "guide", category: "Material-Specific", difficulty: "Advanced" },
    
    // Guides - Application-Specific (external links)
    { title: "Failure Analysis Guide", description: "Learn about failure analysis techniques in metallography, including fracture analysis, root cause investigation, and material failure mechanisms.", link: "https://metallography.org/guides/failure-analysis", keywords: "failure analysis fracture analysis root cause investigation material failure mechanisms", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "Castings and Foundry Analysis", description: "Complete guide to metallographic analysis of cast materials including solidification structure analysis, dendrite arm spacing measurement, casting defect identification, and grain size control.", link: "https://metallography.org/guides/castings-foundry-analysis", keywords: "castings foundry solidification dendrite arm spacing casting defects grain size", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "Hardness Testing Preparation", description: "In-depth specialized preparation techniques for samples that will undergo hardness testing. Ensure accurate results with proper surface preparation.", link: "https://metallography.org/guides/hardness-testing-preparation", keywords: "hardness testing preparation surface preparation accurate results", type: "guide", category: "Application-Specific", difficulty: "Intermediate" },
    { title: "Heat Treatment Verification", description: "Complete guide to verifying heat treatment effectiveness through metallographic analysis, including case depth measurement, decarburization detection, and microstructure validation for different heat treatment processes.", link: "https://metallography.org/guides/heat-treatment-verification", keywords: "heat treatment verification case depth decarburization microstructure validation", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "Quality Control and Inspection", description: "In-depth guide on how to evaluate sample quality, identify preparation artifacts, and ensure your samples meet industry standards for metallographic analysis.", link: "https://metallography.org/guides/quality-control-inspection", keywords: "quality control inspection sample quality preparation artifacts industry standards", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "Welding Analysis and Weld Zone Preparation", description: "Complete guide to preparing weld samples for metallographic analysis, including weld zone, HAZ, and fusion boundary preparation for different welding methods.", link: "https://metallography.org/guides/welding-analysis", keywords: "welding analysis weld zone HAZ fusion boundary welding methods", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "Additive Manufacturing (3D Printing) Sample Preparation", description: "Complete guide to preparing additive manufacturing samples for metallographic analysis. Learn techniques for handling porosity, layer boundaries, support structures, and revealing build direction and process defects.", link: "https://metallography.org/guides/additive-manufacturing-preparation", keywords: "additive manufacturing 3D printing porosity layer boundaries support structures build direction", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "Aerospace Applications Guide", description: "Comprehensive guide to metallographic analysis for aerospace applications, covering titanium and superalloy preparation, fatigue and creep damage assessment, coating analysis, and industry-specific standards.", link: "https://metallography.org/guides/aerospace-applications", keywords: "aerospace titanium superalloys fatigue creep damage coating analysis", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "Automotive Applications Guide", description: "Complete guide to metallographic analysis for automotive applications, covering steel and aluminum processing verification, heat treatment validation, weld quality assessment, and industry-specific quality requirements.", link: "https://metallography.org/guides/automotive-applications", keywords: "automotive steel aluminum heat treatment weld quality", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "Medical Device Applications Guide", description: "Comprehensive guide to metallographic analysis for medical device applications, covering biocompatible material preparation, surface finish requirements, implant material characterization, and regulatory compliance considerations.", link: "https://metallography.org/guides/medical-device-applications", keywords: "medical devices biocompatible surface finish implants regulatory compliance", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    { title: "PCB and Chip Sample Preparation", description: "Complete guide to preparing printed circuit boards (PCBs) and semiconductor chips for metallographic analysis. Learn controlled removal techniques, ATTO polishing, and precision preparation methods essential for electronics failure analysis and quality control.", link: "https://metallography.org/guides/pcb-chip-preparation", keywords: "PCB chip semiconductor controlled removal ATTO polishing electronics failure analysis", type: "guide", category: "Application-Specific", difficulty: "Advanced" },
    
    // Guides - Troubleshooting
    { title: "Troubleshooting Common Issues", description: "Comprehensive solutions to common problems in metallographic sample preparation including scratches, contamination, relief, and poor contrast issues.", link: "/support.html", keywords: "troubleshooting common issues scratches contamination relief poor contrast", type: "guide", category: "Troubleshooting", difficulty: "Intermediate" },
];
    
// Debounce function to limit the rate of search function execution
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Get active filter from UI
function getActiveFilter() {
    const activeFilter = document.querySelector('.filter-btn.active');
    return activeFilter ? activeFilter.dataset.filter : 'all';
}

function customSearch(query) {
    if (!query) {
        displayCustomResults([]); // Clear results if query is empty
        return;
    }

    const activeFilter = getActiveFilter();
    const queryLower = query.toLowerCase().trim();
    // Filter out very short words and common stop words
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2 && !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'].includes(w));

    // Filter and score results
    const results = data
        .map(item => {
            // SDS files only appear if "sds" is in the search terms
            if (item.priority === 'low' && !queryLower.includes('sds')) {
                return null; // Don't include SDS files unless "sds" is in the search
            }
            
            // Apply type filter
            if (activeFilter !== 'all') {
                if (activeFilter === 'guides' && item.type !== 'guide') return null;
                if (activeFilter === 'equipment' && !item.link.includes('/metallographic-equipment/')) return null;
                if (activeFilter === 'consumables' && !item.link.includes('/metallographic-consumables/')) return null;
                if (activeFilter === 'support' && !item.link.includes('/support/') && item.type !== 'guide') return null;
            }
            
            let score = 0;
            
            // For SDS items, check if any word in the query matches
            if (item.priority === 'low') {
                const filteredQueryWords = queryWords.filter(word => word !== 'sds');
                const titleWords = item.title.toLowerCase().split(/\s+/);
                const descriptionWords = item.description.toLowerCase().split(/\s+/);
                const keywordsWords = item.keywords.toLowerCase().split(/\s+/);
                
                // Check if any query word (except 'sds') matches any word in title/description/keywords
                const hasWordMatch = filteredQueryWords.some(queryWord => 
                    titleWords.some(titleWord => titleWord.includes(queryWord)) ||
                    descriptionWords.some(descWord => descWord.includes(queryWord)) ||
                    keywordsWords.some(keywordWord => keywordWord.includes(queryWord))
                );
                
                if (hasWordMatch) {
                    score += 50; // Give SDS items a base score if they have word matches
                }
            }
            
            // Enhanced matching with word-level scoring
            const titleLower = item.title.toLowerCase();
            const descriptionLower = item.description.toLowerCase();
            const keywordsLower = item.keywords.toLowerCase();
            
            // Exact title match (highest priority - product names, etc.)
            if (titleLower === queryLower) {
                score += 1000; // Massive boost for exact title match
            }
            
            // Title starts with query (very high priority)
            else if (titleLower.startsWith(queryLower)) {
                score += 500;
            }
            
            // Exact phrase in title (high priority)
            else if (titleLower.includes(queryLower)) {
                score += 300;
            }
            
            // All query words appear in title in order (high relevance)
            else if (queryWords.every(word => titleLower.includes(word))) {
                // Check if words appear in order
                let lastIndex = -1;
                let wordsInOrder = true;
                for (const word of queryWords) {
                    const index = titleLower.indexOf(word, lastIndex + 1);
                    if (index === -1) {
                        wordsInOrder = false;
                        break;
                    }
                    lastIndex = index;
                }
                if (wordsInOrder) {
                    score += 250; // Words in order = higher relevance
                } else {
                    score += 150; // All words present but not in order
                }
            }
            
            // Product/model number detection (e.g., "PICO-155S", "MEGA-T300S")
            const productPattern = /[A-Z]+-?[A-Z0-9]+/i;
            const queryHasProductCode = productPattern.test(query);
            const titleHasProductCode = productPattern.test(item.title);
            
            if (queryHasProductCode && titleHasProductCode) {
                // Extract product codes
                const queryCode = query.match(productPattern)?.[0]?.toLowerCase();
                const titleCode = item.title.match(productPattern)?.[0]?.toLowerCase();
                if (queryCode && titleCode && titleCode.includes(queryCode)) {
                    score += 400; // Product code match is very relevant
                }
            }
            
            // Word-level matches in title (only meaningful words)
            queryWords.forEach(word => {
                if (titleLower.includes(word)) {
                    // Check if word appears at start of title (more relevant)
                    if (titleLower.startsWith(word) || titleLower.startsWith(word + ' ')) {
                        score += 75;
                    } else {
                        score += 50;
                    }
                }
            });
            
            // Description and keywords matches (lower priority)
            if (descriptionLower.includes(queryLower)) score += 100;
            if (keywordsLower.includes(queryLower)) score += 75;
            
            queryWords.forEach(word => {
                if (descriptionLower.includes(word)) score += 25;
                if (keywordsLower.includes(word)) score += 15;
            });
            
            // Boost equipment/consumables when query matches product patterns
            if ((item.link.includes('/metallographic-equipment/') || 
                 item.link.includes('/metallographic-consumables/')) && 
                queryHasProductCode) {
                score += 100; // Equipment/consumables with product codes get boost
            }
            
            // Only return items that have a meaningful match
            // Require at least one query word to actually match in title, description, or keywords
            // OR have a high score from exact/phrase matches
            const hasWordMatch = queryWords.length === 0 || queryWords.some(word => 
                titleLower.includes(word) || descriptionLower.includes(word) || keywordsLower.includes(word)
            );
            
            // For exact matches (title equals query, starts with query, or contains full query), be more lenient
            const isExactMatch = titleLower === queryLower || titleLower.startsWith(queryLower) || titleLower.includes(queryLower);
            
            // Minimum score threshold: 
            // - 25 points for exact/phrase matches
            // - 50 points for word matches
            // - Must have at least one word match OR be an exact match
            if (isExactMatch && score >= 25) {
                return { ...item, score };
            }
            
            if (hasWordMatch && score >= 50) {
                return { ...item, score };
            }
            
            return null;
        })
        .filter(item => item !== null)
        .sort((a, b) => b.score - a.score); // Sort by score descending
    
    displayCustomResults(results, query);
}

function displayCustomResults(results, query = '') {
    const container = document.getElementById('customResultsContainer');
    const loadingIndicator = document.getElementById('customLoadingIndicator');
    container.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        container.innerHTML = '<div class="search-no-results"><p>No results found. Try different keywords or check our <a href="/equipment.html">Equipment</a>, <a href="/consumables.html">Consumables</a>, and <a href="/guides.html">Guides</a> pages.</p></div>';
        loadingIndicator.style.display = 'none';
        return;
    }

    // Group results by category/type for better organization
    const groupedResults = groupResultsByCategory(results);
    
    // Define the order for displaying categories
    const categoryOrder = ['Equipment', 'Consumables', 'Guides', 'Support & Resources', 'Other'];
    
    // Display grouped results in the specified order
    categoryOrder.forEach(category => {
        const categoryResults = groupedResults[category];
        if (!categoryResults || categoryResults.length === 0) return;
        
        const categorySection = document.createElement('div');
        categorySection.className = 'results-category-section';
        categorySection.setAttribute('data-category', category);
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'results-category-header';
        categoryHeader.innerHTML = `
            <h3 class="results-category-title">${category}</h3>
            <span class="results-category-count">${categoryResults.length} ${categoryResults.length === 1 ? 'result' : 'results'}</span>
        `;
        categorySection.appendChild(categoryHeader);
        
        const resultsList = document.createElement('div');
        resultsList.className = 'results-list';
        
        categoryResults.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('custom-result-item');
            if (result.type === 'guide') {
                resultItem.classList.add('result-item-guide');
            }

            const highlightedTitle = highlightCustomText(result.title, query);
            const highlightedDescription = highlightCustomText(result.description, query);

            // Determine category and icon based on URL or guide type
            const categoryInfo = getCategoryInfo(result.link, result);

            const difficultyBadge = result.difficulty ? `<span class="difficulty-badge difficulty-${result.difficulty.toLowerCase()}">${result.difficulty}</span>` : '';
            const guideCategory = result.category ? `<span class="guide-category-badge">${result.category}</span>` : '';
            const externalLink = result.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';

            // Format URL like Google (show domain/path)
            const urlDisplay = formatUrlForDisplay(result.link);
            
            resultItem.setAttribute('data-category', categoryInfo.category);
            resultItem.innerHTML = `
                <div class="result-header">
                    <div class="result-content">
                        <div class="result-meta">
                            <span class="result-url">${urlDisplay}</span>
                            ${difficultyBadge}
                            ${guideCategory}
                        </div>
                        <h3><a href="${result.link}" ${externalLink}>${highlightedTitle}</a></h3>
                        <p>${highlightedDescription}</p>
                    </div>
                </div>
            `;
            resultsList.appendChild(resultItem);
        });
        
        categorySection.appendChild(resultsList);
        container.appendChild(categorySection);
    });
    
    loadingIndicator.style.display = 'none';
}

function groupResultsByCategory(results) {
    const groups = {
        'Equipment': [],
        'Consumables': [],
        'Guides': [],
        'Support & Resources': [],
        'Other': []
    };
    
    results.forEach(result => {
        if (result.type === 'guide') {
            groups['Guides'].push(result);
        } else if (result.link.includes('/metallographic-equipment/')) {
            groups['Equipment'].push(result);
        } else if (result.link.includes('/metallographic-consumables/')) {
            groups['Consumables'].push(result);
        } else if (result.link.includes('/support/') || result.link.includes('/guides.html') || result.link.includes('/procedures')) {
            groups['Support & Resources'].push(result);
        } else {
            groups['Other'].push(result);
        }
    });
    
    // Remove empty groups
    Object.keys(groups).forEach(key => {
        if (groups[key].length === 0) {
            delete groups[key];
        }
    });
    
    return groups;
}

function getCategoryInfo(url, item = null) {
    // Handle guides
    if (item && item.type === 'guide') {
        const categoryIcons = {
            'Basics': 'fas fa-book-open',
            'Process': 'fas fa-cogs',
            'Material-Specific': 'fas fa-flask',
            'Application-Specific': 'fas fa-microscope',
            'Troubleshooting': 'fas fa-wrench'
        };
        return { 
            category: item.category || 'Guide', 
            icon: categoryIcons[item.category] || 'fas fa-book' 
        };
    }
    
    if (url.includes('/guides/')) {
        return { category: 'Guide', icon: 'fas fa-book' };
    }
    
    if (url.includes('/metallographic-equipment/')) {
        if (url.includes('abrasive-sectioning')) return { category: 'Abrasive Sectioning', icon: 'fas fa-cut' };
        if (url.includes('precision-wafering')) return { category: 'Precision Wafering', icon: 'fas fa-gem' };
        if (url.includes('compression-mounting')) return { category: 'Compression Mounting', icon: 'fas fa-compress' };
        if (url.includes('castable-mounting')) return { category: 'Castable Mounting', icon: 'fas fa-flask' };
        if (url.includes('grinding-polishing')) return { category: 'Grinding & Polishing', icon: 'fas fa-cog' };
        if (url.includes('hardness-testing')) return { category: 'Hardness Testing', icon: 'fas fa-hammer' };
        if (url.includes('microscopy')) return { category: 'Microscopy', icon: 'fas fa-microscope' };
        if (url.includes('lab-furniture')) return { category: 'Lab Furniture', icon: 'fas fa-chair' };
        return { category: 'Equipment', icon: 'fas fa-tools' };
    }
    if (url.includes('/metallographic-consumables/')) {
        if (url.includes('sectioning')) return { category: 'Sectioning Consumables', icon: 'fas fa-cut' };
        if (url.includes('mounting')) return { category: 'Mounting Consumables', icon: 'fas fa-cube' };
        if (url.includes('grinding')) return { category: 'Grinding Consumables', icon: 'fas fa-circle' };
        if (url.includes('polishing')) return { category: 'Polishing Consumables', icon: 'fas fa-sparkles' };
        if (url.includes('etching')) return { category: 'Etching Solutions', icon: 'fas fa-tint' };
        if (url.includes('cleaning')) return { category: 'Cleaning Solutions', icon: 'fas fa-broom' };
        return { category: 'Consumables', icon: 'fas fa-box' };
    }
    if (url.includes('/support/')) return { category: 'Support', icon: 'fas fa-life-ring' };
    if (url.includes('/procedures/')) return { category: 'Procedures', icon: 'fas fa-clipboard-list' };
    if (url.includes('/about')) return { category: 'About', icon: 'fas fa-info-circle' };
    if (url.includes('/contact')) return { category: 'Contact', icon: 'fas fa-envelope' };
    if (url.includes('/quote')) return { category: 'Quote', icon: 'fas fa-calculator' };
    if (url.includes('/terms')) return { category: 'Legal', icon: 'fas fa-file-contract' };
    if (url.includes('/privacy')) return { category: 'Legal', icon: 'fas fa-shield-alt' };
    if (url.includes('/distribution')) return { category: 'Distribution', icon: 'fas fa-globe' };
    if (url.includes('/events')) return { category: 'Events', icon: 'fas fa-calendar' };
    if (url.includes('/sds/')) return { category: 'Safety Data Sheet', icon: 'fas fa-file-pdf' };
    return { category: 'General', icon: 'fas fa-file' };
}

function highlightCustomText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function formatUrlForDisplay(url) {
    if (url.startsWith('http')) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '') + urlObj.pathname;
        } catch (e) {
            return url;
        }
    }
    // For relative URLs, show the path
    return url.replace(/^\//, '').replace(/\.html$/, '').replace(/\//g, ' › ');
}

const handleCustomSearch = debounce(function() {
    const query = document.getElementById('customSearchInput').value.toLowerCase();
    const loadingIndicator = document.getElementById('customLoadingIndicator');
    if (query.length > 0) {
        loadingIndicator.style.display = 'block';
    }
    customSearch(query);
}, 300);

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('customSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleCustomSearch);
        
        // Handle Enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.toLowerCase();
                if (query.length > 0) {
                    customSearch(query);
                }
            }
        });
    }
    
    // Initialize filter buttons if they exist
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Trigger search with current query
            const query = document.getElementById('customSearchInput').value.toLowerCase();
            if (query.length > 0) {
                customSearch(query);
            }
        });
    });
});

