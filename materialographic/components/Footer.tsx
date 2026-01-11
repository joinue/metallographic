import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-20">
      {/* Footer Content in Glassmorphic Container - Full Width */}
      <div className="w-full bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/30 shadow-2xl shadow-gray-900/20 relative overflow-hidden rounded-t-3xl">
        {/* Floating hexagon grains - subtle background texture */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none overflow-hidden">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
            viewBox="0 0 1920 400"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Floating hexagons distributed across full width - larger sizes */}
            {/* Left side */}
            <polygon
              points="60,30 100,55 100,95 60,120 20,95 20,55"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <polygon
              points="180,70 220,95 220,135 180,160 140,135 140,95"
              fill="none"
              stroke="white"
              strokeWidth="1.3"
              opacity="0.5"
            />
            <polygon
              points="320,100 360,125 360,165 320,190 280,165 280,125"
              fill="none"
              stroke="white"
              strokeWidth="1.4"
              opacity="0.6"
            />
            <polygon
              points="250,180 290,205 290,245 250,270 210,245 210,205"
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              opacity="0.5"
            />
            {/* Center-left */}
            <polygon
              points="450,50 490,75 490,115 450,140 410,115 410,75"
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              opacity="0.5"
            />
            <polygon
              points="580,130 620,155 620,195 580,220 540,195 540,155"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <polygon
              points="520,250 560,275 560,315 520,340 480,315 480,275"
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              opacity="0.5"
            />
            {/* Center */}
            <polygon
              points="720,80 760,105 760,145 720,170 680,145 680,105"
              fill="none"
              stroke="white"
              strokeWidth="1.3"
              opacity="0.5"
            />
            <polygon
              points="670,200 710,225 710,265 670,290 630,265 630,225"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <polygon
              points="850,40 890,65 890,105 850,130 810,105 810,65"
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              opacity="0.5"
            />
            {/* Center-right */}
            <polygon
              points="860,150 900,175 900,215 860,240 820,215 820,175"
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              opacity="0.6"
            />
            <polygon
              points="1000,100 1040,125 1040,165 1000,190 960,165 960,125"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.5"
            />
            <polygon
              points="920,220 960,245 960,285 920,310 880,285 880,245"
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              opacity="0.5"
            />
                <polygon
              points="1050,180 1090,205 1090,245 1050,270 1010,245 1010,205"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
            {/* Right side */}
            <polygon
              points="1140,60 1180,85 1180,125 1140,150 1100,125 1100,85"
              fill="none"
              stroke="white"
              strokeWidth="1.3"
              opacity="0.6"
            />
            <polygon
              points="1280,120 1320,145 1320,185 1280,210 1240,185 1240,145"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.5"
            />
            <polygon
              points="1420,80 1460,105 1460,145 1420,170 1380,145 1380,105"
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              opacity="0.6"
            />
                <polygon
              points="1560,140 1600,165 1600,205 1560,230 1520,205 1520,165"
                  fill="none"
                  stroke="white"
              strokeWidth="1.3"
                  opacity="0.5"
                />
            <polygon
              points="1700,100 1740,125 1740,165 1700,190 1660,165 1660,125"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.6"
            />
                <polygon
              points="1200,250 1240,275 1240,315 1200,340 1160,315 1160,275"
                  fill="none"
                  stroke="white"
              strokeWidth="1.1"
                  opacity="0.5"
                />
                <polygon
              points="1350,220 1390,245 1390,285 1350,310 1310,285 1310,245"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.2"
                  opacity="0.6"
            />
            <polygon
              points="1500,260 1540,285 1540,325 1500,350 1460,325 1460,285"
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              opacity="0.5"
            />
                <polygon
              points="1640,240 1680,265 1680,305 1640,330 1600,305 1600,265"
                  fill="none"
                  stroke="white"
              strokeWidth="1.2"
              opacity="0.6"
                />
                <polygon
              points="1780,200 1820,225 1820,265 1780,290 1740,265 1740,225"
                  fill="none"
                  stroke="white"
              strokeWidth="1.1"
              opacity="0.5"
            />
          </svg>
        </div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 pointer-events-none"></div>
        
        <div className="container-custom relative z-10 py-16 md:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Company/Brand Section */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <Image 
                  src="/images/pace/tri-structure.png" 
                  alt="PACE Technologies" 
                  width={40} 
                  height={40}
                  className="h-8 w-auto"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    PACE Technologies
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Materialographic.com
                  </p>
                </div>
              </div>
              <p className="text-base text-gray-300 leading-relaxed mb-6 max-w-md">
                Leading provider of metallographic sample preparation equipment, consumables, and expertise. 
                Comprehensive resources for materials science professionals worldwide.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  <Link 
                    href="https://metallographic.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    www.metallographic.com
                  </Link>
                </p>
              </div>
            </div>
            
            {/* Company Section */}
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
                <li>
                  <Link 
                    href="https://shop.metallographic.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Online Shop
                  </Link>
                </li>
                <li><Link href="/quote" className="text-gray-400 hover:text-white transition-colors text-sm">Request Quote</Link></li>
              </ul>
            </div>
            
            {/* Products Section */}
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Products</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/equipment" 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Equipment
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/consumables" 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Consumables
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://shop.metallographic.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Shop Consumables
                  </Link>
                </li>
                <li><Link href="/quote" className="text-gray-400 hover:text-white transition-colors text-sm">Custom Solutions</Link></li>
              </ul>
            </div>
            
            {/* Resources Section */}
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/guides" className="text-gray-400 hover:text-white transition-colors text-sm">Preparation Guides</Link></li>
                <li><Link href="/databases" className="text-gray-400 hover:text-white transition-colors text-sm">Databases</Link></li>
                <li><Link href="/standards" className="text-gray-400 hover:text-white transition-colors text-sm">Standards</Link></li>
                <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors text-sm">Tools & Calculators</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                <li><Link href="/glossary" className="text-gray-400 hover:text-white transition-colors text-sm">Glossary</Link></li>
              </ul>
            </div>
            
            {/* Legal & Support Section */}
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Legal & Support</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
                <li>
                  <Link 
                    href="/support" 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/distribution" 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    International Distribution
                  </Link>
                </li>
                <li><Link href="/site-map" className="text-gray-400 hover:text-white transition-colors text-sm">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-3">
                <span className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} PACE Technologies Corporation. All rights reserved.
                </span>
                <span className="hidden md:inline text-gray-600">•</span>
                <span className="text-sm text-gray-500">
                  Materialographic.com is owned and operated by PACE Technologies
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link 
                  href="/privacy" 
                  className="text-gray-400 hover:text-white transition-all duration-200 hover:underline underline-offset-4 decoration-gray-500 hover:decoration-white"
                >
                  Privacy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-gray-400 hover:text-white transition-all duration-200 hover:underline underline-offset-4 decoration-gray-500 hover:decoration-white"
                >
                  Terms
                </Link>
                <Link 
                  href="/site-map" 
                  className="text-gray-400 hover:text-white transition-all duration-200 hover:underline underline-offset-4 decoration-gray-500 hover:decoration-white"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Link - Bottom Left of Footer */}
      <div className="absolute bottom-2 left-2 z-10">
        <Link 
          href="/admin/login" 
          className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors opacity-60 hover:opacity-100 font-normal"
          title="Admin Login"
        >
          Login
        </Link>
      </div>
    </footer>
  )
}

