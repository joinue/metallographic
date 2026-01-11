import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for PACE Technologies. Learn how we collect, use, and protect your personal information when you use our website, online forms, and business operations.',
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
          {/* Section 1: Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to PACE Technologies. Your privacy is important to us, and we are committed to safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect the data you share with us through our website, online forms, and business operations.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We protect your privacy and handle your data responsibly. This policy explains how we collect, use, and protect your information.</p>
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">2.1 Personal Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect the following personal information that you voluntarily provide:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Company Name and Address</li>
              <li>Job Title and Department</li>
              <li>Geographical Location</li>
              <li>Purchase and Quote Information</li>
              <li>Technical Support Requests</li>
              <li>Any additional information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may automatically collect certain technical data when you visit our website, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>IP address and location data</li>
              <li>Browser type, version, and language</li>
              <li>Device type and operating system</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website and search terms</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">2.3 Business Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect information related to our business relationship, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Purchase history and order details</li>
              <li>Technical support communications</li>
              <li>Training records and certifications</li>
              <li>Warranty and service agreements</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">2.4 Equipment Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Important:</strong> Our metallographic equipment does not collect, store, or transmit personal data or usage information. Equipment operates independently without data collection capabilities.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We collect information you provide directly, automatically through our website, and through business interactions. Our equipment does not collect data.</p>
            </div>
          </section>

          {/* Section 3: Use of Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Use of Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>To respond to inquiries and provide requested services</li>
              <li>To process orders, quotes, and business transactions</li>
              <li>For sales, marketing, and customer support communications</li>
              <li>To provide technical support and service assistance</li>
              <li>To maintain warranty and service records</li>
              <li>To improve our website, products, and services</li>
              <li>To comply with applicable legal obligations</li>
              <li>To protect the rights, privacy, safety, or property of our business and users</li>
              <li>As part of a business transfer, merger, or acquisition</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">Legal Basis for Processing (GDPR)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              For EU residents, we process your personal data based on:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Contract Performance:</strong> To fulfill our contractual obligations</li>
              <li><strong>Legitimate Interest:</strong> For business operations and customer service</li>
              <li><strong>Consent:</strong> For marketing communications (where required)</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We use your information to provide services, communicate with you, and run our business. We don't sell your data to third parties.</p>
            </div>
          </section>

          {/* Section 4: Cookies and Tracking Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small text files stored on your device that help us:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve website functionality and performance</li>
              <li>Provide personalized content and recommendations</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">Types of Cookies We Use:</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Google Analytics to understand website usage</li>
              <li><strong>Marketing Cookies:</strong> For targeted advertising and marketing</li>
              <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We use cookies and tracking to improve our website and analyze usage. You can control cookie settings in your browser.</p>
            </div>
          </section>

          {/* Section 5: Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with trusted third-party service providers who assist us in operating our business:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Customer Relationship Management:</strong> Marketing automation and customer communication platforms</li>
              <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior tracking</li>
              <li><strong>E-commerce Platform:</strong> Online shop functionality and order processing</li>
              <li><strong>Payment Processors:</strong> Secure payment processing for online transactions</li>
              <li><strong>Shipping Partners:</strong> Order fulfillment and delivery services</li>
              <li><strong>Cloud Storage Providers:</strong> Secure data storage and backup services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              These third parties are contractually obligated to protect your information and use it only for the purposes we specify. They have their own privacy policies that govern their use of your information.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We use trusted third-party services for website functionality, analytics, and business operations. They have their own privacy policies.</p>
            </div>
          </section>

          {/* Section 6: Data Sharing and Disclosure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Service Providers:</strong> With trusted third parties who assist in our business operations</li>
              <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              <li><strong>Consent:</strong> When you have given explicit consent to share your information</li>
              <li><strong>Emergency Situations:</strong> To protect the safety and security of individuals</li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We don't sell your data. We may share it with service providers, for legal compliance, or with your consent.</p>
            </div>
          </section>

          {/* Section 7: International Data Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PACE Technologies is based in the United States. If you are located outside the United States, your information may be transferred to and processed in the United States. We ensure appropriate safeguards are in place to protect your information during international transfers, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Standard contractual clauses approved by the European Commission</li>
              <li>Adequacy decisions by relevant data protection authorities</li>
              <li>Other appropriate safeguards as required by applicable law</li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Your data may be transferred to and processed in the United States. We ensure appropriate safeguards are in place.</p>
            </div>
          </section>

          {/* Section 8: Your Rights and Choices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Restriction:</strong> Request limitation of how we process your information</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for processing (where applicable)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">California Privacy Rights (CCPA)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Right to know what personal information is collected and how it's used</li>
              <li>Right to delete personal information (with certain exceptions)</li>
              <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
              <li>Right to non-discrimination for exercising privacy rights</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise any of these rights, please contact us at <a href="mailto:pace@metallographic.com" className="text-primary-600 hover:text-primary-700 font-medium underline">pace@metallographic.com</a>. We will respond to your request within the timeframes required by applicable law.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">You have rights to access, update, delete, and control your personal information. Contact us to exercise these rights.</p>
            </div>
          </section>

          {/* Section 9: Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. Our security measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Secure servers and databases with access controls</li>
              <li>Regular security assessments and updates</li>
              <li>Employee training on data protection practices</li>
              <li>Incident response procedures for security breaches</li>
              <li>Secure data transmission protocols</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We use industry-standard security measures to protect your information from unauthorized access, use, or disclosure.</p>
            </div>
          </section>

          {/* Section 10: Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal information for the following periods:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Customer Data:</strong> 7 years after last business interaction</li>
              <li><strong>Marketing Data:</strong> Until you opt out or 3 years of inactivity</li>
              <li><strong>Website Analytics:</strong> 26 months (Google Analytics default)</li>
              <li><strong>Legal Requirements:</strong> As required by applicable law (e.g., tax records)</li>
              <li><strong>Warranty Records:</strong> 10 years for warranty and service purposes</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              After the retention period expires, we will securely delete or anonymize your personal information, unless we are required to retain it for legal reasons.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We keep your information only as long as necessary for business purposes or as required by law.</p>
            </div>
          </section>

          {/* Section 11: Data Breach Notification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Data Breach Notification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In the event of a data breach that may affect your personal information, we will:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Investigate and contain the breach immediately</li>
              <li>Notify affected individuals within 72 hours (where required)</li>
              <li>Report to relevant data protection authorities</li>
              <li>Provide information about the breach and steps taken</li>
              <li>Offer assistance to affected individuals</li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">If we experience a data breach, we will notify affected individuals and authorities as required by law.</p>
            </div>
          </section>

          {/* Section 12: Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website and services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Our services are not intended for children under 13. We don't knowingly collect information from children.</p>
            </div>
          </section>

          {/* Section 13: Changes to This Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">13. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may revise this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Update the "Last Updated" date at the top of this policy</li>
              <li>Post the revised policy on our website</li>
              <li>Notify you via email or website notice (for significant changes)</li>
              <li>Obtain your consent where required by law</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We may update this policy periodically. We'll notify you of significant changes and update the date.</p>
            </div>
          </section>

          {/* Section 14: Contact Us */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">14. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, our data practices, or to exercise your privacy rights, please contact us:
            </p>
            <ul className="list-none pl-0 mb-4 text-gray-700 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:pace@metallographic.com" className="text-primary-600 hover:text-primary-700 font-medium underline">pace@metallographic.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+15208826598" className="text-primary-600 hover:text-primary-700 font-medium underline">+1 (520) 882-6598</a></li>
              <li><strong>Address:</strong> PACE Technologies, Tucson, Arizona, USA</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We will respond to your inquiry within 30 days of receipt. For privacy-related requests, we may need to verify your identity before processing your request.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Thank you for placing your trust in PACE Technologies. We are committed to protecting your privacy and handling your personal information responsibly.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Contact us with any questions about this privacy policy or to exercise your privacy rights.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

