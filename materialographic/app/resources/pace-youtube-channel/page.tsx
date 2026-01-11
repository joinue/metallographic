import { Metadata } from 'next'
import Link from 'next/link'
import { PlayCircle, ExternalLink, Youtube } from 'lucide-react'
import YouTubeVideo from '@/components/YouTubeVideo'

export const metadata: Metadata = {
  title: 'PACE Technologies YouTube Channel - Free Video Tutorials',
  description: 'Access free video tutorials by Dr. Donald Zipperian, founder of PACE Technologies. Learn metallographic sample preparation techniques through step-by-step equipment demonstrations.',
  keywords: ['metallography videos', 'sample preparation tutorials', 'PACE Technologies', 'equipment demonstrations', 'metallography training'],
  openGraph: {
    title: 'PACE Technologies YouTube Channel - Free Video Tutorials',
    description: 'Free video tutorials demonstrating metallographic sample preparation equipment and techniques.',
    url: 'https://metallography.org/resources/pace-youtube-channel',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'PACE Technologies YouTube Channel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PACE Technologies YouTube Channel - Free Video Tutorials',
    description: 'Free video tutorials demonstrating metallographic sample preparation equipment and techniques.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/resources/pace-youtube-channel',
  },
}

export default function PACEYouTubeChannelPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / PACE Technologies YouTube Channel
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <PlayCircle className="w-10 h-10 text-primary-600" />
              <div>
                <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide block mb-1">
                  Video Resource
                </span>
                <h1 className="text-4xl font-bold text-gray-900">PACE Technologies YouTube Channel</h1>
              </div>
            </div>
            <p className="text-xl text-gray-600">
              Free video tutorials by Dr. Donald Zipperian, PhD, founder of PACE Technologies. 
              Learn metallographic sample preparation techniques through step-by-step equipment demonstrations.
            </p>
          </header>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2>About the Channel</h2>
              <p>
                The PACE Technologies YouTube channel features instructional videos created by 
                <strong> Dr. Donald Zipperian</strong>, the founder of PACE Technologies and a leading 
                expert in metallographic sample preparation. These videos provide hands-on demonstrations 
                of equipment operation and proper techniques for various stages of sample preparation.
              </p>
              <p>
                All videos are <strong>completely free</strong> and serve as valuable educational resources 
                for metallographers at all skill levels, from beginners learning the basics to experienced 
                professionals looking to optimize their techniques.
              </p>
            </section>

            <section className="mb-8">
              <h2>Featured Video Series</h2>
              <p>
                The channel includes comprehensive demonstrations covering the complete sample preparation workflow:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Sectioning</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Precision sectioning techniques</li>
                    <li>Blade selection and setup</li>
                    <li>Cutting parameters</li>
                  </ul>
                  <Link 
                    href="/guides/sectioning#precision-sectioning-video"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-3 inline-block"
                  >
                    Watch in Sectioning Guide →
                  </Link>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Mounting</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Compression mounting process</li>
                    <li>Castable/cold mounting with vacuum</li>
                    <li>Resin selection and techniques</li>
                  </ul>
                  <Link 
                    href="/guides/mounting#compression-mounting-video"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-3 inline-block"
                  >
                    Watch in Mounting Guide →
                  </Link>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Grinding</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Manual grinding techniques</li>
                    <li>Automated grinding systems</li>
                    <li>Proper sample orientation</li>
                  </ul>
                  <Link 
                    href="/guides/grinding-techniques#manual-grinding-video"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-3 inline-block"
                  >
                    Watch in Grinding Guide →
                  </Link>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Polishing</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Automated polishing systems</li>
                    <li>Vibratory polishing techniques</li>
                    <li>Final polishing procedures</li>
                  </ul>
                  <Link 
                    href="/guides/polishing-methods#vibratory-polishing-video"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-3 inline-block"
                  >
                    Watch in Polishing Guide →
                  </Link>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2>Sample Video</h2>
              <p>
                Here's an example of the high-quality instructional content available on the channel:
              </p>
              
              <YouTubeVideo
                videoId="nQ7nM3VhWEU"
                title="Precision Sectioning Demonstration"
                description="Watch Dr. Donald Zipperian demonstrate precision sectioning techniques using PACE Technologies equipment."
              />
            </section>

            <section className="mb-8">
              <h2>Why Watch These Videos?</h2>
              <ul>
                <li><strong>Learn from an expert:</strong> Dr. Zipperian has decades of experience in metallography and equipment design</li>
                <li><strong>Visual learning:</strong> See techniques demonstrated rather than just reading about them</li>
                <li><strong>Equipment-specific:</strong> Learn how to properly operate specific equipment models</li>
                <li><strong>Best practices:</strong> Understand industry-standard techniques and workflows</li>
                <li><strong>Free access:</strong> All content is available at no cost</li>
                <li><strong>Regular updates:</strong> New videos are added to the channel regularly</li>
              </ul>
            </section>

            {/* CTA to YouTube */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-lg my-8">
              <div className="flex items-start gap-4">
                <Youtube className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Visit the YouTube Channel</h3>
                  <p className="text-gray-700 mb-4">
                    Access the complete library of free video tutorials on the PACE Technologies YouTube channel. 
                    Subscribe to stay updated on new content.
                  </p>
                  <a
                    href="https://www.youtube.com/@pacetechnologies/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Youtube className="w-5 h-5" />
                    Visit YouTube Channel
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2>Related Resources</h2>
              <p className="mb-4">
                These videos are also embedded throughout our guides for easy access:
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/guides/sectioning" className="text-primary-600 hover:underline">
                    Sectioning Guide
                  </Link>
                  {' - '}Includes precision sectioning video demonstration
                </li>
                <li>
                  <Link href="/guides/mounting" className="text-primary-600 hover:underline">
                    Mounting Guide
                  </Link>
                  {' - '}Features compression and castable mounting videos
                </li>
                <li>
                  <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline">
                    Grinding Techniques Guide
                  </Link>
                  {' - '}Contains manual and automated grinding demonstrations
                </li>
                <li>
                  <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline">
                    Polishing Methods Guide
                  </Link>
                  {' - '}Includes automated and vibratory polishing videos
                </li>
                <li>
                  <Link href="/guides/equipment-overview" className="text-primary-600 hover:underline">
                    Equipment Overview Guide
                  </Link>
                  {' - '}Overview of equipment with links to video demonstrations
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

