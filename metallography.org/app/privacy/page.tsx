import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Metallography.org. Learn how we handle your personal information when you use our website or contact us.',
  alternates: {
    canonical: 'https://metallography.org/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Commitment to Your Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Metallography.org, we are committed to protecting your privacy. We believe in transparency and want you to understand how we handle information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data Collection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website is designed to provide free educational resources and guides without requiring any registration or account creation for general browsing. We collect limited information to improve our website and provide better services.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Specifically, we do not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Require user registration or account creation to access our content</li>
              <li>Use cookies to track user behavior or preferences</li>
              <li>Share or sell any user data to third parties</li>
              <li>Collect personal information without your explicit consent (except for analytics data described below)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Form Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you submit a message through our contact form, we collect the following information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Name</strong> (required) - To address you personally in our response</li>
              <li><strong>Email address</strong> (required) - To respond to your inquiry</li>
              <li><strong>Subject</strong> (optional) - To categorize and route your message appropriately</li>
              <li><strong>Message content</strong> (required) - The details of your inquiry or feedback</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>How we use this information:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>To respond to your inquiry or request</li>
              <li>To provide customer support or technical assistance</li>
              <li>To improve our website and services based on feedback</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data retention:</strong> We retain contact form submissions only as long as necessary to respond to your inquiry and for a reasonable period thereafter for record-keeping purposes. You may request deletion of your contact information at any time by contacting us.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data sharing:</strong> We do not share, sell, or rent your contact form information to any third parties. Your information is used solely for the purpose of responding to your inquiry.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Website Analytics and Page View Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect basic website analytics to understand usage patterns and improve our content and user experience. This tracking is done without using cookies.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What we collect:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Page views:</strong> Which pages you visit on our website</li>
              <li><strong>IP address:</strong> Used to determine approximate geographic location (country, region, city) for analytics purposes</li>
              <li><strong>Device information:</strong> Device type (desktop, mobile, tablet), browser type, and operating system</li>
              <li><strong>Referrer information:</strong> The website that referred you to our site (if applicable)</li>
              <li><strong>Session information:</strong> Temporary session identifiers stored only in your browser's session storage (cleared when you close your browser)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>How we use this information:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>To understand which content is most popular and useful to our visitors</li>
              <li>To analyze traffic patterns and improve site navigation</li>
              <li>To understand the geographic distribution of our audience</li>
              <li>To optimize our website for different devices and browsers</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Important notes:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>We do not use cookies for this tracking - we use browser session storage which is automatically cleared when you close your browser</li>
              <li>We do not create persistent tracking identifiers that follow you across sessions</li>
              <li>IP addresses are used only for geographic analysis and are not linked to your personal identity</li>
              <li>We automatically filter out known bots and crawlers</li>
              <li>This data is stored in our database for analytics purposes but is not shared with third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Newsletter Subscriptions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you subscribe to our newsletter, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Email address</strong> (required) - To send you newsletter updates</li>
              <li><strong>IP address</strong> - For spam prevention and security</li>
              <li><strong>Subscription source</strong> - Where on our website you subscribed</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>How we use this information:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>To send you newsletter updates and blog post notifications</li>
              <li>To prevent spam and abuse</li>
              <li>To understand which parts of our site drive newsletter subscriptions</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Unsubscribing:</strong> You can unsubscribe from our newsletter at any time by clicking the unsubscribe link in any newsletter email, or by contacting us directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may contain links to external websites, including our related sites (shop.metallographic.com, metallographic.com). We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any external websites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically to stay informed about how we protect your privacy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this privacy policy, please contact us through our website or visit our contact page.
            </p>
          </section>

          <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Summary</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>In short:</strong> You can browse our website freely without providing any personal information. We collect basic analytics data (page views, approximate location, device info) to improve our site, but we don't use cookies and don't create persistent tracking identifiers. We only collect personal data (name, email, message) when you voluntarily submit it through our contact form or newsletter subscription, and we use this information solely to respond to your inquiry or send you updates. We do not share or sell your data to third parties.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about how we handle your data, please <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

