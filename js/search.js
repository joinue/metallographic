const data = [
    // Main Pages
    { title: "PACE Technologies Home", description: "Welcome to PACE Technologies, your trusted partner in metallographic equipment and consumables.", link: "/index.html", keywords: "pace technologies home metallographic equipment consumables sample preparation" },
    { title: "Product Catalog", description: "Browse our comprehensive catalog of metallographic equipment, consumables, and accessories.", link: "/catalog.html", keywords: "product catalog equipment consumables accessories catalog browse products" },
    
    // Main Equipment & Consumables Pages
    { title: "Metallographic Equipment", description: "Find the latest equipment for your metallographic lab, including precision cutters, polishers, and more.", link: "/equipment.html", keywords: "metallographic equipment machine saw cutter press grinder polisher vibratory mounting grinding polishing lab laboratory auto manual sectioning cutting hardness testing accessories machines tools instruments precision wafering compression mounting grinding polishing vibratory microscopy hardness testing" },
    { title: "Metallographic Consumables", description: "Explore our wide range of consumables for various metallographic applications.", link: "/consumables.html", keywords: "metallographic consumables blade cloth pad paper grinding polishing mounting sectioning cutting hardness testing etching etchant suspension slurries slurry diamond sic silicon carbide alumina zirconia fluid phenolic acrylic polyester mold accessories materials supplies" },
    
    // Support & Documentation
    { title: "Customer Support", description: "Access comprehensive customer support resources and assistance.", link: "/support.html", keywords: "customer support help assistance technical support service maintenance training warranty repair troubleshooting" },
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
    { title: "PICO-155P Precision Wafering Saw", description: "High-precision wafering saw with advanced features for delicate sample preparation.", link: "/metallographic-equipment/precision-wafering/pico-155p.html", keywords: "PICO-155P precision wafering saw diamond blade cutting sectioning sample preparation advanced features" },
    { title: "PICO-155S Precision Wafering Saw", description: "High-precision wafering saw for accurate and reliable sample preparation.", link: "/metallographic-equipment/precision-wafering/pico-155s.html", keywords: "PICO-155S precision wafering saw diamond blade cutting sectioning sample preparation" },
    { title: "PICO-200A Precision Wafering Saw", description: "Advanced precision wafering saw for demanding applications and larger samples.", link: "/metallographic-equipment/precision-wafering/pico-200a.html", keywords: "PICO-200A precision wafering saw diamond blade cutting sectioning advanced precision larger samples" },
    { title: "PICO-200S Precision Wafering Saw", description: "High-capacity precision wafering saw for production environments.", link: "/metallographic-equipment/precision-wafering/pico-200s.html", keywords: "PICO-200S precision wafering saw diamond blade cutting sectioning high capacity production" },
    
    // Compression Mounting Equipment
    { title: "Compression Mounting Presses", description: "Our selection of compression mounting presses ensures consistent sample preparation.", link: "/metallographic-equipment/compression-mounting.html", keywords: "compression mounting presses sample preparation TERAPRESS tp-7500s tp-7100s tp-tank mounting presses compression hydraulic pneumatic" },
    { title: "TERAPRESS TP-7500S Hydraulic Mounting Press", description: "Hydraulic mounting press for robust sample mounting in metallographic studies.", link: "/metallographic-equipment/compression-mounting/tp-7500s.html", keywords: "TERAPRESS TP-7500S hydraulic mounting press compression mounting hydraulic" },
    { title: "TERAPRESS TP-7100S Pneumatic Mounting Press", description: "Pneumatic mounting press offering ease of use and consistent sample preparation.", link: "/metallographic-equipment/compression-mounting/tp-7100s.html", keywords: "TERAPRESS TP-7100S pneumatic mounting press compression mounting pneumatic" },
    { title: "TERAPRESS TP-Tank Mounting Press", description: "Tank-style mounting press for high-volume sample preparation applications.", link: "/metallographic-equipment/compression-mounting/tp-tank.html", keywords: "TERAPRESS TP-Tank mounting press compression mounting tank high volume" },
    
    // Castable Mounting Equipment
    { title: "Castable Mounting Equipment", description: "Advanced castable mounting systems for sample preparation including vacuum impregnation and UV curing.", link: "/metallographic-equipment/castable-mounting.html", keywords: "castable mounting vacuum impregnation UV curing LSSA-011 UVMOUNT THETAMOUNT sample preparation mounting" },
    { title: "LSSA-011 Vacuum Mounting System", description: "Vacuum mounting systems that improve sample integrity during metallographic preparation.", link: "/metallographic-equipment/castable-mounting/lssa-011.html", keywords: "LSSA-011 vacuum mounting systems sample integrity vacuum impregnation castable mounting vacuum" },
    { title: "UVMOUNT UV Curing System", description: "Efficient UV curing systems for rapid processing in metallographic labs.", link: "/metallographic-equipment/castable-mounting/uvmount.html", keywords: "UVMOUNT UV curing systems rapid processing UV curing castable mounting" },
    { title: "THETAMOUNT Mounting System", description: "Advanced mounting system for specialized sample preparation applications.", link: "/metallographic-equipment/castable-mounting/thetamount.html", keywords: "THETAMOUNT mounting system specialized sample preparation castable mounting" },
    
    // Grinding & Polishing Equipment
    { title: "Grinding & Polishing Equipment", description: "Complete range of grinding and polishing equipment for metallographic sample preparation.", link: "/metallographic-equipment/grinding-polishing.html", keywords: "grinding polishing equipment PENTA NANO FEMTO ATTO GIGA RC ZETA hand belt grinders automated polishing machines" },
    { title: "PENTA Hand and Belt Grinders", description: "Versatile hand and belt grinders for a wide range of grinding applications.", link: "/metallographic-equipment/grinding-polishing/penta.html", keywords: "PENTA hand belt grinders grinding manual polishing manual grinding belt grinding" },
    { title: "NANO Semi-Automatic Polisher", description: "Semi-automatic polishing machine for consistent results.", link: "/metallographic-equipment/grinding-polishing/nano.html", keywords: "NANO semi-automatic polisher semi-auto polishing automated polishing" },
    { title: "FEMTO Automatic Polisher", description: "Fully automatic polishing machine for high-volume applications.", link: "/metallographic-equipment/grinding-polishing/femto.html", keywords: "FEMTO automatic polisher fully automatic polishing automated polishing" },
    { title: "ATTO Automatic Polisher", description: "Advanced automatic polishing machine with precision control.", link: "/metallographic-equipment/grinding-polishing/atto.html", keywords: "ATTO automatic polisher precision control automatic polishing automated polishing" },
    { title: "GIGA Polishing System", description: "High-capacity polishing system for production environments.", link: "/metallographic-equipment/grinding-polishing/giga.html", keywords: "GIGA polishing system high capacity production polishing automated" },
    { title: "RC Polishing System", description: "Reliable polishing system for consistent sample preparation.", link: "/metallographic-equipment/grinding-polishing/rc.html", keywords: "RC polishing system reliable polishing sample preparation" },
    { title: "ZETA Polishing System", description: "Advanced polishing system for specialized applications.", link: "/metallographic-equipment/grinding-polishing/zeta.html", keywords: "ZETA polishing system advanced polishing specialized applications" },
    
    
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
    { title: "MEGA-M250S Manual Abrasive Sectioning Saw", description: "High-performance manual abrasive sectioning saw for precise material cutting.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-m250s.html", keywords: "MEGA-M250S manual abrasive sectioning saw cutting abrasive cutting manual" },
    { title: "MEGA-T250S Manual Abrasive Sectioning Saw", description: "Compact manual abrasive sectioning saw for small to medium samples.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-t250s.html", keywords: "MEGA-T250S manual abrasive sectioning saw cutting abrasive cutting manual compact" },
    { title: "MEGA-T300S Manual Abrasive Sectioning Saw", description: "Advanced manual abrasive sectioning saw for demanding applications.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-t300s.html", keywords: "MEGA-T300S manual abrasive sectioning saw cutting abrasive cutting manual advanced" },
    { title: "MEGA-T350S Manual Abrasive Sectioning Saw", description: "Heavy-duty manual abrasive sectioning saw for large samples.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-t350s.html", keywords: "MEGA-T350S manual abrasive sectioning saw cutting abrasive cutting manual heavy duty" },
    { title: "MEGA-T400S Manual Abrasive Sectioning Saw", description: "Industrial manual abrasive sectioning saw for maximum capacity.", link: "/metallographic-equipment/abrasive-sectioning/manual/mega-t400s.html", keywords: "MEGA-T400S manual abrasive sectioning saw cutting abrasive cutting manual industrial" },
    
    // Automated Abrasive Sectioning
    { title: "Automated Abrasive Sectioning", description: "Automated MEGA abrasive sectioning saws for high-volume production.", link: "/metallographic-equipment/abrasive-sectioning/automated.html", keywords: "automated abrasive sectioning MEGA automated cutting saws MEGA-T300A MEGA-T350A MEGA-T400A" },
    { title: "MEGA-T300A Automated Abrasive Sectioning Saw", description: "Automated abrasive sectioning saw for efficient production cutting.", link: "/metallographic-equipment/abrasive-sectioning/automated/mega-t300a.html", keywords: "MEGA-T300A automated abrasive sectioning saw cutting abrasive cutting automated production" },
    { title: "MEGA-T350A Automated Abrasive Sectioning Saw", description: "Heavy-duty automated abrasive sectioning saw for large sample production.", link: "/metallographic-equipment/abrasive-sectioning/automated/mega-t350a.html", keywords: "MEGA-T350A automated abrasive sectioning saw cutting abrasive cutting automated heavy duty" },
    { title: "MEGA-T400A Automated Abrasive Sectioning Saw", description: "Industrial automated abrasive sectioning saw for maximum production capacity.", link: "/metallographic-equipment/abrasive-sectioning/automated/mega-t400a.html", keywords: "MEGA-T400A automated abrasive sectioning saw cutting abrasive cutting automated industrial" },
    
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

function customSearch(query) {
    if (!query) {
        displayCustomResults([]); // Clear results if query is empty
        return;
    }

    // Filter and score results
    const results = data
        .map(item => {
            // SDS files only appear if "sds" is in the search terms
            if (item.priority === 'low' && !query.includes('sds')) {
                return null; // Don't include SDS files unless "sds" is in the search
            }
            
            let score = 0;
            
            // For SDS items, check if any word in the query matches
            if (item.priority === 'low') {
                const queryWords = query.split(' ').filter(word => word !== 'sds');
                const titleWords = item.title.toLowerCase().split(' ');
                const descriptionWords = item.description.toLowerCase().split(' ');
                const keywordsWords = item.keywords.toLowerCase().split(' ');
                
                // Check if any query word (except 'sds') matches any word in title/description/keywords
                const hasWordMatch = queryWords.some(queryWord => 
                    titleWords.some(titleWord => titleWord.includes(queryWord)) ||
                    descriptionWords.some(descWord => descWord.includes(queryWord)) ||
                    keywordsWords.some(keywordWord => keywordWord.includes(queryWord))
                );
                
                if (hasWordMatch) {
                    score += 50; // Give SDS items a base score if they have word matches
                }
            }
            
            const titleMatch = item.title.toLowerCase().includes(query);
            const descriptionMatch = item.description.toLowerCase().includes(query);
            const keywordsMatch = item.keywords.toLowerCase().includes(query);
            
            // Scoring system: title matches get highest priority
            if (titleMatch) score += 100;
            if (descriptionMatch) score += 50;
            if (keywordsMatch) score += 25;
            
            // Bonus for exact title matches
            if (item.title.toLowerCase() === query) score += 200;
            
            // Bonus for title starting with query
            if (item.title.toLowerCase().startsWith(query)) score += 150;
            
            // Only return items that have at least one match
            if (score > 0) {
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
        container.innerHTML = '<div class="search-result"><p>No results found. Try different keywords or check our <a href="/equipment.html">Equipment</a> and <a href="/consumables.html">Consumables</a> pages.</p></div>';
        loadingIndicator.style.display = 'none';
        return;
    }

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('custom-result-item');

        const highlightedTitle = highlightCustomText(result.title, query);
        const highlightedDescription = highlightCustomText(result.description, query);

        // Determine category and icon based on URL
        const categoryInfo = getCategoryInfo(result.link);

        resultItem.setAttribute('data-category', categoryInfo.category);
        resultItem.innerHTML = `
            <div class="result-header">
                <div class="result-icon">
                    <i class="${categoryInfo.icon}" aria-hidden="true"></i>
                </div>
                <div class="result-content">
                    <div class="result-category">${categoryInfo.category}</div>
            <h3><a href="${result.link}">${highlightedTitle}</a></h3>
            <p>${highlightedDescription}</p>
                </div>
            </div>
        `;
        container.appendChild(resultItem);
    });
    loadingIndicator.style.display = 'none';
}

function getCategoryInfo(url) {
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

const handleCustomSearch = debounce(function() {
    const query = document.getElementById('customSearchInput').value.toLowerCase();
    const loadingIndicator = document.getElementById('customLoadingIndicator');
    loadingIndicator.style.display = 'block';
    customSearch(query);
}, 300);

document.getElementById('customSearchInput').addEventListener('input', handleCustomSearch);

