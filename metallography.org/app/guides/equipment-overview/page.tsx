import { Metadata } from 'next'
import Image from 'next/image'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('equipment-overview')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'sectioning-equipment', label: 'Sectioning Equipment' },
  { id: 'mounting-equipment', label: 'Mounting Equipment' },
  { id: 'grinding-polishing', label: 'Grinding & Polishing Equipment' },
  { id: 'microscopy-equipment', label: 'Microscopy Equipment' },
  { id: 'hardness-testing', label: 'Hardness Testing Equipment' },
  { id: 'consumables', label: 'Consumables & Accessories' },
  { id: 'lab-setup', label: 'Laboratory Setup' },
  { id: 'equipment-selection', label: 'Selecting Equipment' },
]

export default function EquipmentOverviewGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Equipment Overview
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Basics Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Metallography Equipment Overview</h1>
            <p className="text-xl text-gray-600">
              Learn about the essential equipment used in metallography, from sectioning and mounting to grinding, 
              polishing, and microscopy. Understand what equipment you need to set up a metallography laboratory.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#sectioning-equipment" className="text-primary-600 hover:underline">Sectioning Equipment</a></li>
              <li><a href="#mounting-equipment" className="text-primary-600 hover:underline">Mounting Equipment</a></li>
              <li><a href="#grinding-polishing" className="text-primary-600 hover:underline">Grinding & Polishing Equipment</a></li>
              <li><a href="#microscopy-equipment" className="text-primary-600 hover:underline">Microscopy Equipment</a></li>
              <li><a href="#hardness-testing" className="text-primary-600 hover:underline">Hardness Testing Equipment</a></li>
              <li><a href="#consumables" className="text-primary-600 hover:underline">Consumables & Accessories</a></li>
              <li><a href="#lab-setup" className="text-primary-600 hover:underline">Laboratory Setup</a></li>
              <li><a href="#equipment-selection" className="text-primary-600 hover:underline">Selecting Equipment</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                A well-equipped metallography laboratory requires specialized equipment for each step of the sample 
                preparation process. From cutting samples to examining microstructures, each piece of equipment plays 
                a critical role in producing high-quality metallographic specimens. Understanding the equipment options 
                available helps you make informed decisions when setting up or upgrading your laboratory.
              </p>
              <p>
                This guide provides an overview of the essential equipment categories used in metallography, with 
                examples of PACE Technologies equipment. While specific models and features vary by manufacturer, the 
                fundamental equipment types and their purposes remain consistent across the industry.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Equipment selection depends on your specific needs, sample volume, material types, 
                  and budget. This guide provides general information to help you understand what equipment is available 
                  and what to consider when making purchasing decisions.
                </p>
              </div>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>📹 Video Tutorials:</strong> Dr. Donald Zipperian, founder of PACE Technologies, has created 
                  instructional videos demonstrating equipment usage. Watch these videos in our process guides:
                </p>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 ml-2">
                  <li><Link href="/guides/sectioning#precision-sectioning-video" className="text-primary-600 hover:underline">Precision Sectioning</Link></li>
                  <li><Link href="/guides/mounting#compression-mounting-video" className="text-primary-600 hover:underline">Compression Mounting</Link></li>
                  <li><Link href="/guides/mounting#castable-mounting-video" className="text-primary-600 hover:underline">Castable/Cold Mounting</Link></li>
                  <li><Link href="/guides/grinding-techniques#manual-grinding-video" className="text-primary-600 hover:underline">Manual Grinding</Link> and <Link href="/guides/grinding-techniques#automated-grinding-video" className="text-primary-600 hover:underline">Automated Systems</Link></li>
                  <li><Link href="/guides/polishing-methods#vibratory-polishing-video" className="text-primary-600 hover:underline">Vibratory Polishing</Link></li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  Visit the <a href="https://www.youtube.com/@pacetechnologies/videos" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">PACE Technologies YouTube channel</a> for more equipment demonstrations and tutorials.
                </p>
              </div>
            </section>

            <section id="sectioning-equipment" className="scroll-mt-24">
              <h2>Sectioning Equipment</h2>
              <p>
                Sectioning equipment is used to cut samples from larger workpieces. The type of sectioning equipment 
                you need depends on the materials you work with, sample size requirements, and the level of precision 
                needed.
              </p>

              <h3>Abrasive Cutters</h3>
              <p>
                Abrasive cutters use rotating abrasive wheels (typically aluminum oxide or silicon carbide) bonded in a 
                resin or rubber matrix to cut through materials. They are versatile and can handle a wide range of materials 
                and sizes, from soft non-ferrous metals to hard steels and some ceramics. Abrasive sectioning is the most 
                common method for general metallographic work.
              </p>
              
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>When to Use Abrasive Sectioning:</strong> Choose abrasive cutters for most standard metallographic 
                  applications, especially when cutting metals, larger samples, or when cost-effectiveness is important. 
                  Abrasive sectioning is faster than precision wafering but generates more heat and may cause more deformation 
                  in soft or delicate materials.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/abrasive-sectioning/manual-abrasive-cutters.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/abrasive sectioning/manual abrasive cutters/mega-t300s/mega-t300s-cover.webp"
                        alt="Manual abrasive cutter for sectioning samples"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 300px"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Manual Abrasive Cutters</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Operator-controlled cutting with manual feed. Suitable for low to medium volume work and when 
                    operator control over cutting speed is important.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Manual feed control</li>
                    <li>• Cost-effective for smaller labs</li>
                    <li>• Good for various material types</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/abrasive-sectioning/manual-abrasive-cutters.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Manual Cutters →
                  </Link>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/abrasive-sectioning/automated-abrasive-cutters.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/abrasive sectioning/automated abrasive cutters/mega-t400a/mega-t400a-cover.webp"
                        alt="Automated abrasive cutter for high-volume sectioning"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 300px"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Automated Abrasive Cutters</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Programmable cutting with automatic feed control. Ideal for high-volume work, consistent cutting 
                    parameters, and reduced operator fatigue.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Programmable cutting parameters</li>
                    <li>• Consistent, repeatable results</li>
                    <li>• Higher throughput</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/abrasive-sectioning/automated-abrasive-cutters.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Automated Cutters →
                  </Link>
                </div>
              </div>

              <h3>Precision Wafering Saws</h3>
              <p>
                Precision wafering saws use thin diamond or CBN (Cubic Boron Nitride) blades for cutting with minimal 
                damage and deformation. These saws produce very thin cuts (kerf widths typically 0.1-0.5mm) with minimal 
                heat generation and are essential for delicate materials, small samples, thin sections, and applications 
                requiring minimal deformation. They are particularly important for electronic components, ceramics, 
                heat-sensitive materials, and when sectioning damage must be minimized.
              </p>
              
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>When to Use Precision Wafering:</strong> Choose precision wafering saws when working with delicate 
                  materials, small samples, thin sections, heat-sensitive materials, or when minimal sectioning damage is 
                  critical. Precision wafering is slower and more expensive than abrasive sectioning but produces superior 
                  results for sensitive applications. Essential for PCB preparation, ceramic analysis, and EBSD sample 
                  preparation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/precision-wafering/gravity-feed-precision-cutters.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/precision wafering/gravity feed precision cutters/pico-155s/pico-155s-cover.webp"
                        alt="Gravity feed precision wafering saw"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Gravity Feed Precision Cutters</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Gravity-fed cutting mechanism provides consistent, low-damage sectioning with minimal operator 
                    intervention. The weight of the cutting head provides consistent feed pressure. Excellent for 
                    delicate materials, small samples, and when consistent cutting parameters are needed.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Consistent feed pressure from gravity</li>
                    <li>• Minimal operator intervention required</li>
                    <li>• Ideal for delicate and small samples</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/precision-wafering/gravity-feed-precision-cutters.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Gravity Feed Cutters →
                  </Link>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/precision-wafering/table-feed-precision-cutters.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/precision wafering/table feed precision cutters/pico-200/pico-200-cover.webp"
                        alt="Table feed precision wafering saw"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Table Feed Precision Cutters</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Motorized table feed provides automated precision cutting with programmable feed rates. Offers 
                    excellent control and repeatability for high-precision applications. Ideal for production environments 
                    and when precise, repeatable cutting parameters are required.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Programmable feed rates</li>
                    <li>• Excellent repeatability</li>
                    <li>• Ideal for production and high-precision work</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/precision-wafering/table-feed-precision-cutters.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Table Feed Cutters →
                  </Link>
                </div>
              </div>
            </section>

            <section id="mounting-equipment" className="scroll-mt-24">
              <h2>Mounting Equipment</h2>
              <p>
                Mounting equipment embeds samples in resin to create standardized, easy-to-handle mounts. Different 
                mounting methods are available depending on your needs.
              </p>

              <h3>Compression Mounting Presses</h3>
              <p>
                Compression mounting uses heat (typically 150-180°C) and pressure (2000-4000 psi) to embed samples in 
                thermosetting resins. This method is fast (typically 5-15 minutes per cycle) and produces durable, hard 
                mounts with excellent edge retention. Ideal for high-throughput laboratories and standard metal samples.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/compression-mounting/pneumatic-mounting-press.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/compression mounting/pneumatic mounting press/tp-7100s/tp-7100s-cover.webp"
                        alt="Pneumatic mounting press"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Pneumatic Mounting Presses</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Air-powered compression mounting using compressed air to generate pressure. Fast cycle times and 
                    consistent pressure application. Good for medium to high volume work. Generally more cost-effective 
                    than hydraulic systems for standard applications.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Fast cycle times</li>
                    <li>• Consistent pressure application</li>
                    <li>• Cost-effective for standard applications</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/compression-mounting/pneumatic-mounting-press.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Pneumatic Presses →
                  </Link>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/compression-mounting/hydraulic-mounting-press.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/compression mounting/hydraulic mounting press/tp-7500s/tp-7500s-bayonet-cover.webp"
                        alt="Hydraulic mounting press"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Hydraulic Mounting Presses</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Hydraulic-powered compression mounting using hydraulic fluid to generate pressure. Higher pressure 
                    capability than pneumatic systems, making them suitable for larger samples, harder mounting materials, 
                    or when maximum pressure is required for optimal edge retention.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Higher pressure capability</li>
                    <li>• Suitable for larger samples</li>
                    <li>• Ideal for harder mounting materials</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/compression-mounting/hydraulic-mounting-press.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Hydraulic Presses →
                  </Link>
                </div>
              </div>

              <h3>Castable Mounting Systems</h3>
              <p>
                Castable mounting (also called cold mounting) uses room-temperature or low-temperature curing resins 
                that cure without the high heat and pressure of compression mounting. This method is ideal for 
                heat-sensitive samples, delicate materials, and when compression mounting isn't suitable. Curing times 
                vary from 30 minutes to several hours depending on the resin type. Castable mounting is also useful for 
                mounting multiple samples simultaneously or when working with irregular shapes that don't fit standard 
                compression molds.
              </p>
              
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>When to Use Castable Mounting:</strong> Choose castable mounting for heat-sensitive materials 
                  (e.g., some aluminum alloys, polymers, composites), delicate samples that could be damaged by pressure, 
                  when mounting multiple samples at once, or when working with irregular shapes. Compression mounting is 
                  generally faster and produces harder mounts, but castable mounting is essential when heat or pressure 
                  would damage the sample.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-40 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/castable-mounting/pressure-mounting-system.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/castable mounting/pressure mounting system/thetamount-cover.webp"
                        alt="Pressure mounting system"
                        width={200}
                        height={150}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Pressure Mounting</h4>
                  <p className="text-xs text-gray-700">
                    Room-temperature curing under moderate pressure (typically 30-50 psi) for faster cycles and 
                    improved resin flow. Reduces bubble formation and improves edge retention compared to atmospheric 
                    curing.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-40 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/castable-mounting/vacuum-mounting-system.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/castable mounting/vacuum mounting system/lssa-011-cover.webp"
                        alt="Vacuum mounting system"
                        width={200}
                        height={150}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Vacuum Mounting</h4>
                  <p className="text-xs text-gray-700">
                    Removes air bubbles from the resin before and during curing, producing clear, bubble-free mounts. 
                    Essential for transparent mounting materials and when bubble-free mounts are critical.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-40 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/castable-mounting/uv-curing-system.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/castable mounting/uv curing system/uvmount-cover.webp"
                        alt="UV curing mounting system"
                        width={200}
                        height={150}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">UV Curing</h4>
                  <p className="text-xs text-gray-700">
                    Fast UV-cured mounting for rapid turnaround (typically 5-15 minutes). Uses UV light to cure 
                    specialized resins quickly. Ideal for high-throughput applications with appropriate resin systems.
                  </p>
                </div>
              </div>
            </section>

            <section id="grinding-polishing" className="scroll-mt-24">
              <h2>Grinding & Polishing Equipment</h2>
              <p>
                Grinding and polishing equipment creates flat, scratch-free surfaces suitable for microscopic examination. 
                Equipment ranges from manual systems to fully automated polishers.
              </p>

              <h3>Manual Grinder Polishers</h3>
              <p>
                Manual systems provide operator control over the preparation process. The operator controls pressure, 
                speed, rotation direction, and technique. Suitable for low to medium volume work, learning environments, 
                and when flexibility to adapt techniques for different materials is important.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/manual grinder polishers/nano-1000s/nano-1000s-cover.webp"
                        alt="Manual grinder polisher"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Manual Grinder Polishers</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Single-wheel manual systems for grinding and polishing. Operator controls pressure, speed, and 
                    technique. Cost-effective and versatile.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Single or dual wheel options</li>
                    <li>• Operator-controlled preparation</li>
                    <li>• Suitable for various materials</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Manual Polishers →
                  </Link>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/hand-belt-grinders.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/hand & belt grinders/penta-5000a/penta-5000a-cover.webp"
                        alt="Hand and belt grinder"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Hand & Belt Grinders</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Belt grinding systems for initial material removal and rough grinding. Useful for removing large 
                    amounts of material quickly.
                  </p>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/hand-belt-grinders.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Belt Grinders →
                  </Link>
                </div>
              </div>

              <h3>Semi-Automated Grinder Polishers</h3>
              <p>
                Semi-automated systems provide programmable preparation cycles with automatic head movement and force 
                application. The operator loads samples and selects the program, but the system controls the preparation 
                parameters. This provides a good balance between automation and flexibility, ensuring consistent results 
                while allowing operator oversight.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg my-6">
                <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/femto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src="/images/equipment/grinding & polishing/semi-auto grinder polishers/femto-1100s/femto-1100s-cover.webp"
                      alt="Semi-automated grinder polisher"
                      width={300}
                      height={225}
                      className="max-w-full max-h-full object-contain"
                    />
                  </Link>
                </div>
                <h4 className="font-semibold mb-2">Semi-Automated Systems</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Programmable preparation cycles with automatic head movement. Operator loads samples and selects 
                  program. Consistent results with reduced operator time.
                </p>
                <Link 
                  href="https://metallographic.com/metallographic-equipment/grinding-polishing/femto.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                >
                  View Semi-Automated Systems →
                </Link>
              </div>

              <h3>Controlled Removal Polishers</h3>
              <p>
                Advanced systems with precise material removal control. Essential for applications requiring exact 
                material removal rates or depth measurements, such as PCB preparation, thin film analysis, and 
                case depth measurements.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg my-6">
                <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src="/images/equipment/grinding & polishing/controlled removal polisher/atto-1000s/atto-polisher-cover.webp"
                      alt="Controlled removal polisher"
                      width={300}
                      height={225}
                      className="max-w-full max-h-full object-contain"
                    />
                  </Link>
                </div>
                <h4 className="font-semibold mb-2">Controlled Removal Systems</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Precise material removal control for applications requiring exact depth measurements or controlled 
                  material removal rates. Ideal for plano-parallel sample preparation and applications where material 
                  removal must be precisely controlled.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li>• Precise depth control and measurement</li>
                  <li>• Ideal for thin sections and coatings</li>
                  <li>• Essential for PCB and electronic component preparation</li>
                </ul>
                <Link 
                  href="https://metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                >
                  View Controlled Removal Systems →
                </Link>
              </div>

              <h3>Vibratory Polishers</h3>
              <p>
                Vibratory polishing uses vibration to polish samples, eliminating subsurface damage and producing 
                superior surface finishes. This method is particularly effective for EBSD (Electron Backscatter 
                Diffraction) sample preparation and applications requiring minimal deformation.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg my-6">
                <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src="/images/equipment/grinding & polishing/vibratory polisher/giga-s-cover.webp"
                      alt="Vibratory polisher"
                      width={300}
                      height={225}
                      className="max-w-full max-h-full object-contain"
                    />
                  </Link>
                </div>
                <h4 className="font-semibold mb-2">Vibratory Polishing Systems</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Cost-effective alternative for final polishing that eliminates subsurface damage and produces superior 
                  flatness and planarity. Ideal for batch processing and applications requiring minimal deformation.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li>• Eliminates subsurface damage</li>
                  <li>• Superior flatness and planarity</li>
                  <li>• Ideal for EBSD preparation</li>
                  <li>• Batch processing capability</li>
                  <li>• Reduces operator variability</li>
                </ul>
                <Link 
                  href="https://metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                >
                  View Vibratory Polishers →
                </Link>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Choosing Between Polishing Methods:</strong> Manual systems offer flexibility and are cost-effective 
                  for low-volume work. Semi-automated systems provide consistency and reduce operator time. Controlled removal 
                  systems are essential for precision applications. Vibratory polishing is ideal for final polishing, especially 
                  for EBSD preparation and when minimal deformation is critical.
                </p>
              </div>
            </section>

            <section id="microscopy-equipment" className="scroll-mt-24">
              <h2>Microscopy Equipment</h2>
              <p>
                Microscopes are essential for examining prepared samples and analyzing microstructures. The type of 
                microscope you need depends on your analysis requirements.
              </p>

              <h3>Metallurgical Microscopes</h3>
              <p>
                Metallurgical microscopes use reflected light illumination to examine opaque samples, unlike biological 
                microscopes that use transmitted light. They are essential for routine metallographic examination and 
                microstructure analysis. These microscopes are designed to work with polished and etched samples, providing 
                the magnification and illumination modes needed to reveal microstructural features.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/microscopy/metallurgical microscopes/im-5000/im-5000-cover.webp"
                        alt="Metallurgical microscope"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Metallurgical Microscopes</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Reflected light microscopes for examining prepared metallographic samples. Standard equipment for 
                    microstructure analysis.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Brightfield, darkfield, and DIC (Differential Interference Contrast) illumination modes</li>
                    <li>• Magnifications typically from 50x to 1000x or higher</li>
                    <li>• Digital imaging capabilities for documentation and analysis</li>
                    <li>• Polarized light options for certain applications</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/microscopy/metallurgical-microscopes.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Metallurgical Microscopes →
                  </Link>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/microscopy/stereo-microscopes.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/microscopy/stereo microscopes/vm-500/vm-500-cover.webp"
                        alt="Stereo microscope"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Stereo Microscopes</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Low-magnification 3D viewing (typically 5x to 50x) for sample inspection, fracture surface 
                    examination, and general sample observation. Essential for macroscopic examination before and after 
                    preparation, checking for defects, and orienting samples.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Low magnification (5x-50x typical range)</li>
                    <li>• 3D depth perception</li>
                    <li>• Useful for fracture analysis and sample inspection</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/microscopy/stereo-microscopes.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Stereo Microscopes →
                  </Link>
                </div>
              </div>

              <h3>Image Analysis Systems</h3>
              <p>
                Digital imaging and analysis systems for capturing, storing, and analyzing microstructures. Essential 
                for documentation and quantitative analysis.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg my-6">
                <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/microscopy/image-analysis.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src="/images/equipment/microscopy/image analysis/image-analysis-cover.webp"
                      alt="Image analysis system"
                      width={300}
                      height={225}
                      className="max-w-full max-h-full object-contain"
                    />
                  </Link>
                </div>
                <h4 className="font-semibold mb-2">Image Analysis Systems</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Software and hardware for capturing, analyzing, and quantifying microstructural features. Includes 
                  grain size measurement, phase quantification, and automated analysis.
                </p>
                <Link 
                  href="https://metallographic.com/metallographic-equipment/microscopy/image-analysis.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                >
                  View Image Analysis Systems →
                </Link>
              </div>
            </section>

            <section id="hardness-testing" className="scroll-mt-24">
              <h2>Hardness Testing Equipment</h2>
              <p>
                Hardness testing equipment measures material hardness, often on prepared metallographic samples. Different 
                test methods are available depending on requirements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/hardness-testing/rockwell-tester.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/hardness testing/rockwell tester/omega-rt/omega-rt-cover.webp"
                        alt="Rockwell hardness tester"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Rockwell Hardness Testers</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Common macrohardness testing method using indentation depth measurement. Fast testing with direct 
                    readout, suitable for a wide range of materials and hardness levels. Uses different scales (A, B, C, 
                    etc.) for different material types and hardness ranges.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Fast, direct readout</li>
                    <li>• Multiple scales for different materials</li>
                    <li>• Suitable for production testing</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/hardness-testing/rockwell-tester.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Rockwell Testers →
                  </Link>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/hardness-testing/microhardness-tester.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/hardness testing/microhardness tester/alpha-mht-1000z/alpha-mht-1000z-cover.webp"
                        alt="Microhardness tester"
                        width={300}
                        height={225}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="font-semibold mb-2">Microhardness Testers</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Vickers or Knoop indentation testing for small areas, thin samples, and precise hardness 
                    measurements. Uses much smaller indenters and lower loads than macrohardness testers. Essential 
                    for case depth measurements, small feature analysis, and when testing individual phases or 
                    microstructural features.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    <li>• Vickers and Knoop test methods</li>
                    <li>• Low loads (typically 10g to 1000g)</li>
                    <li>• Essential for case depth and small feature analysis</li>
                  </ul>
                  <Link 
                    href="https://metallographic.com/metallographic-equipment/hardness-testing/microhardness-tester.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs"
                  >
                    View Microhardness Testers →
                  </Link>
                </div>
              </div>
            </section>

            <section id="consumables" className="scroll-mt-24">
              <h2>Consumables & Accessories</h2>
              <p>
                In addition to equipment, metallography requires various consumables and accessories for sample preparation 
                and examination.
              </p>

              <h3>Essential Consumables</h3>
              <ul>
                <li><strong>Abrasive papers and grinding discs:</strong> Various grit sizes for progressive grinding</li>
                <li><strong>Polishing cloths and pads:</strong> Different types for different materials and polishing stages</li>
                <li><strong>Diamond suspensions and pastes:</strong> For polishing with diamond abrasives</li>
                <li><strong>Oxide polishing compounds:</strong> For final polishing stages</li>
                <li><strong>Mounting resins:</strong> Compression and castable mounting materials</li>
                <li><strong>Etchants:</strong> Chemical reagents for revealing microstructures</li>
                <li><strong>Cutting blades:</strong> Abrasive wheels and diamond blades for sectioning</li>
                <li><strong>Cleaning supplies:</strong> Solvents, detergents, and cleaning materials</li>
              </ul>

              <h3>Accessories</h3>
              <ul>
                <li><strong>Sample holders and fixtures:</strong> For securing samples during preparation</li>
                <li><strong>Measuring tools:</strong> Calipers, micrometers, and rulers</li>
                <li><strong>Safety equipment:</strong> Personal protective equipment, fume hoods, safety cabinets</li>
                <li><strong>Storage:</strong> Sample storage cabinets and organization systems</li>
                <li><strong>Documentation:</strong> Labels, markers, and documentation systems</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Consumable Management:</strong> Maintain adequate supplies of consumables to avoid workflow 
                  interruptions. Track usage patterns and establish reorder points. Quality consumables are essential 
                  for consistent, high-quality results.
                </p>
              </div>
            </section>

            <section id="lab-setup" className="scroll-mt-24">
              <h2>Laboratory Setup</h2>
              <p>
                A well-designed metallography laboratory provides efficient workflow, safety, and quality results. 
                Consider the following when setting up your laboratory.
              </p>

              <h3>Space Requirements</h3>
              <ul>
                <li><strong>Workflow layout:</strong> Arrange equipment in logical sequence (sectioning → mounting → 
                grinding → polishing → microscopy)</li>
                <li><strong>Adequate space:</strong> Allow room for equipment operation, sample handling, and movement</li>
                <li><strong>Ventilation:</strong> Ensure proper ventilation, especially for sectioning and etching areas</li>
                <li><strong>Lighting:</strong> Good general lighting plus task lighting for microscopy</li>
              </ul>

              <h3>Safety Considerations</h3>
              <ul>
                <li><strong>Fume hoods:</strong> For etching and chemical handling</li>
                <li><strong>Safety cabinets:</strong> For chemical storage</li>
                <li><strong>Eye wash stations:</strong> Accessible emergency equipment</li>
                <li><strong>Fire safety:</strong> Appropriate fire extinguishers and suppression systems</li>
                <li><strong>Electrical:</strong> Proper electrical outlets and grounding for equipment</li>
              </ul>

              <h3>Utilities</h3>
              <ul>
                <li><strong>Water:</strong> For cooling, cleaning, and some preparation steps</li>
                <li><strong>Compressed air:</strong> For cleaning samples and equipment</li>
                <li><strong>Drainage:</strong> Proper drainage for water and chemical waste</li>
                <li><strong>Electrical:</strong> Adequate power supply for all equipment</li>
              </ul>

              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Planning Tip:</strong> Consider future expansion when planning your laboratory layout. Leave 
                  space for additional equipment and ensure utilities can support growth. Consult with equipment 
                  manufacturers for specific space and utility requirements.
                </p>
              </div>
            </section>

            <section id="equipment-selection" className="scroll-mt-24">
              <h2>Selecting Equipment</h2>
              <p>
                Choosing the right equipment depends on your specific needs, budget, and workflow requirements. Consider 
                the following factors when making equipment decisions.
              </p>

              <div className="bg-primary-600 text-white border-l-4 border-primary-700 p-6 my-6 rounded">
                <h3 className="text-xl font-semibold mb-3 text-white">Get Personalized Equipment Recommendations</h3>
                <p className="text-primary-100 mb-4">
                  Not sure which equipment is right for your lab? Use our interactive tool to get personalized equipment 
                  and consumable recommendations based on your specific materials, sample requirements, and workflow needs.
                </p>
                <Link 
                  href="/builder"
                  className="inline-block bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Build Your Lab →
                </Link>
              </div>

              <h3>Key Considerations</h3>
              <ul>
                <li><strong>Sample volume:</strong> High-volume labs (10+ samples per day) benefit from automation, 
                while low-volume labs may prefer manual systems. Consider both current and projected volume.</li>
                <li><strong>Material types:</strong> Different materials may require specialized equipment or capabilities. 
                For example, soft materials may need vibratory polishing, while hard ceramics may require controlled removal 
                systems or specialized techniques.</li>
                <li><strong>Precision requirements:</strong> Applications requiring high precision (e.g., case depth 
                measurements, thin film analysis, EBSD preparation) may need advanced equipment like controlled removal 
                polishers or vibratory polishers.</li>
                <li><strong>Budget:</strong> Balance initial cost with long-term value and productivity. Consider total 
                cost of ownership including maintenance, consumables, and operator time.</li>
                <li><strong>Operator skill level:</strong> Consider training requirements and ease of use. Manual systems 
                require more skill but offer flexibility, while automated systems reduce operator variability but may have 
                higher initial costs.</li>
                <li><strong>Space constraints:</strong> Ensure adequate space for equipment operation, sample handling, 
                and workflow. Some automated systems require more floor space.</li>
                <li><strong>Future needs:</strong> Plan for growth and changing requirements. Consider equipment that can 
                be upgraded or expanded as needs evolve.</li>
              </ul>

              <h3>Equipment Quality</h3>
              <p>
                Quality equipment provides:
              </p>
              <ul>
                <li>Consistent, reproducible results</li>
                <li>Reduced operator time and effort</li>
                <li>Lower long-term costs through reliability</li>
                <li>Better support and service availability</li>
                <li>Compatibility with consumables and accessories</li>
              </ul>

              <h3>Getting Started</h3>
              <p>
                For new laboratories or those setting up their first metallography lab, consider starting with a basic 
                but complete setup:
              </p>
              <ul>
                <li><strong>Sectioning:</strong> Manual abrasive cutter for most materials, or precision wafering saw 
                if working with delicate materials, electronics, or ceramics</li>
                <li><strong>Mounting:</strong> Pneumatic compression mounting press for standard applications, or castable 
                mounting system if working with heat-sensitive materials</li>
                <li><strong>Grinding & Polishing:</strong> Manual grinder polisher with single or dual wheels. This provides 
                flexibility to learn techniques and adapt to different materials</li>
                <li><strong>Microscopy:</strong> Metallurgical microscope with digital imaging capabilities for documentation 
                and analysis. Include brightfield and darkfield illumination modes at minimum</li>
                <li><strong>Consumables:</strong> Essential grinding papers (240, 320, 400, 600 grit), diamond polishing 
                suspensions (6μm, 3μm, 1μm, 0.25μm), polishing cloths, mounting resins, and basic etchants for your 
                materials</li>
                <li><strong>Safety:</strong> Fume hood for etching, personal protective equipment, and proper storage for 
                chemicals</li>
              </ul>

              <p>
                This basic setup allows you to prepare and examine samples while learning techniques. As your needs grow 
                and your workflow becomes more defined, you can expand with automation, specialized equipment, or additional 
                capabilities. Many laboratories start with manual systems and add automation as volume increases or 
                consistency requirements become more critical.
              </p>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h3 className="text-lg font-semibold mb-3">Consultation and Support</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Equipment manufacturers and suppliers can provide valuable guidance on equipment selection. Consider:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Requesting demonstrations or trials</li>
                  <li>• Consulting with experienced metallographers</li>
                  <li>• Reviewing application notes and case studies</li>
                  <li>• Understanding service and support options</li>
                  <li>• Planning for training and operator education</li>
                </ul>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Ready to Learn More?</h2>
              <p className="mb-4">
                Now that you understand the equipment used in metallography, explore our guides on sample preparation 
                techniques and safety practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides/safety-fundamentals"
                  className="btn-primary text-center"
                >
                  Learn About Safety
                </Link>
                <Link 
                  href="/guides/sectioning"
                  className="btn-secondary text-center"
                >
                  Start with Sectioning
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
          </div>
        </div>
      </div>
      </article>
    </>
  )
}

