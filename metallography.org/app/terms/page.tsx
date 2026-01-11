import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | Metallography.org',
  description: 'Terms of use and conditions for Metallography.org. Please read these terms carefully before using our educational resources and guides.',
  alternates: {
    canonical: 'https://metallography.org/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Use
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              <strong>Important:</strong> Please read these Terms of Use carefully before accessing or using Metallography.org. 
              By accessing or using this website, you agree to be bound by these terms. If you do not agree to these terms, 
              please do not use this website.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              These Terms of Use ("Terms") govern your access to and use of the Metallography.org website 
              (the "Website" or "Service"), which is owned and operated by <strong>PACE Technologies Corporation</strong> 
              ("PACE Technologies", "we", "us", or "our"). The Website provides educational resources, guides, 
              tools, and informational content related to metallographic sample preparation and analysis.
            </p>
          </div>
        </section>

        {/* Terms Sections */}
        <div className="space-y-10">
          {/* Section 1: Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                By accessing, browsing, or using this Website, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and all applicable laws and regulations. If you do not agree 
                with any of these Terms, you are prohibited from using or accessing this Website.
              </p>
              <p>
                We reserve the right to modify these Terms at any time without prior notice. Your continued use 
                of the Website after any such changes constitutes your acceptance of the new Terms. It is your 
                responsibility to review these Terms periodically for any updates.
              </p>
            </div>
          </section>

          {/* Section 2: Website Operator */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Website Operator</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                This Website is owned and operated by <strong>PACE Technologies Corporation</strong>, a corporation 
                engaged in the manufacture and distribution of metallographic equipment, consumables, and related 
                products and services.
              </p>
              <p>
                PACE Technologies provides this Website as an educational resource for the metallography community. 
                The content, tools, and resources available on this Website are provided for informational and 
                educational purposes only.
              </p>
            </div>
          </section>

          {/* Section 3: Educational and Informational Purpose */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Educational and Informational Purpose</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                The content, guides, procedures, recommendations, tools, calculators, databases, and all other 
                information provided on this Website (collectively, "Content") are intended solely for educational 
                and informational purposes. The Content is provided as general guidance and suggestions based on 
                industry practices and experience.
              </p>
              <p className="mb-4">
                <strong>The Content on this Website does not constitute:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Professional advice, consultation, or services</li>
                <li>Technical specifications or requirements for any specific application</li>
                <li>Warranties, guarantees, or representations of any kind</li>
                <li>Substitute for professional judgment, expertise, or training</li>
                <li>Approval, endorsement, or certification of any procedure, method, or technique</li>
              </ul>
              <p>
                You acknowledge that metallographic sample preparation involves complex processes that may vary 
                significantly based on material properties, equipment, environmental conditions, and specific 
                application requirements. The Content provided is general in nature and may not be appropriate 
                or suitable for your specific circumstances, materials, or applications.
              </p>
            </div>
          </section>

          {/* Section 4: No Warranty or Guarantee */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. No Warranty or Guarantee</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                <strong>THE CONTENT ON THIS WEBSITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES, 
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                <li>Warranties that the Content is accurate, complete, reliable, current, or error-free</li>
                <li>Warranties that the Website will be available, uninterrupted, secure, or free from errors, 
                    viruses, or other harmful components</li>
                <li>Warranties regarding the results that may be obtained from using the Content</li>
                <li>Warranties that any defects or errors will be corrected</li>
              </ul>
              <p>
                PACE Technologies makes no representation or warranty regarding the accuracy, completeness, 
                reliability, suitability, or availability of any Content on this Website. The Content may 
                contain technical inaccuracies, typographical errors, or outdated information. PACE Technologies 
                reserves the right to make changes to the Content at any time without notice.
              </p>
            </div>
          </section>

          {/* Section 5: Limitation of Liability and Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability and Disclaimer</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
              <p className="text-gray-800 font-semibold mb-3">
                <strong>IMPORTANT DISCLAIMER OF LIABILITY:</strong>
              </p>
              <p className="text-gray-800 leading-relaxed mb-4">
                <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PACE TECHNOLOGIES CORPORATION, ITS 
                AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, AND SUPPLIERS SHALL NOT BE LIABLE 
                FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, 
                INCLUDING BUT NOT LIMITED TO:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                <li>Damage to equipment, materials, samples, or property</li>
                <li>Personal injury or death</li>
                <li>Loss of data, profits, revenue, business opportunities, or goodwill</li>
                <li>Costs of substitute goods or services</li>
                <li>Any other damages or losses arising from or related to your use of or reliance on the Content</li>
              </ul>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                <strong>You expressly acknowledge and agree that:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The use of any Content, procedures, methods, techniques, or recommendations from this Website 
                    is at your own risk</li>
                <li>You are solely responsible for evaluating the suitability, safety, and appropriateness of any 
                    Content for your specific application, materials, equipment, and circumstances</li>
                <li>You are solely responsible for ensuring compliance with all applicable laws, regulations, 
                    standards, and safety requirements</li>
                <li>You are solely responsible for obtaining proper training, certification, and professional 
                    guidance before attempting any metallographic procedures</li>
                <li>PACE Technologies is not responsible for any errors, omissions, or consequences resulting 
                    from your use of or reliance on the Content</li>
                <li>PACE Technologies is not responsible for any issues, problems, damages, injuries, or losses 
                    that may arise from following, implementing, or attempting to follow any advice, suggestions, 
                    procedures, methods, or recommendations contained in the Content</li>
              </ul>
              <p className="mb-4">
                <strong>Metallographic procedures involve:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Hazardous chemicals and materials that may cause injury, illness, or death if not handled properly</li>
                <li>Equipment that may cause injury if not used correctly</li>
                <li>Processes that may damage samples, equipment, or property if not performed correctly</li>
                <li>Results that may vary significantly based on numerous factors beyond our control</li>
              </ul>
              <p>
                <strong>You assume all risks associated with the use of any Content from this Website, including 
                but not limited to risks of personal injury, property damage, equipment failure, sample damage, 
                and unsatisfactory results.</strong>
              </p>
            </div>
          </section>

          {/* Section 6: Professional Judgment Required */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Professional Judgment Required</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                The Content on this Website should not be used as a substitute for professional judgment, expertise, 
                or training. Metallographic sample preparation requires:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Proper training and certification in metallographic techniques</li>
                <li>Understanding of material science, metallurgy, and sample preparation principles</li>
                <li>Knowledge of applicable safety regulations and requirements</li>
                <li>Experience with specific materials, equipment, and applications</li>
                <li>Ability to assess and adapt procedures based on specific circumstances</li>
                <li>Compliance with all applicable standards, regulations, and organizational requirements</li>
              </ul>
              <p>
                You should consult with qualified professionals, review applicable standards and regulations, 
                and exercise independent professional judgment before implementing any procedures or methods 
                described on this Website.
              </p>
            </div>
          </section>

          {/* Section 7: Safety and Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Safety and Compliance</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                <strong>You are solely responsible for:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Ensuring all safety protocols, procedures, and regulations are followed</li>
                <li>Obtaining and reviewing Safety Data Sheets (SDS) for all chemicals and materials used</li>
                <li>Using appropriate personal protective equipment (PPE)</li>
                <li>Ensuring proper ventilation, containment, and disposal of hazardous materials</li>
                <li>Complying with all applicable local, state, federal, and international laws and regulations</li>
                <li>Complying with all applicable industry standards (e.g., ASTM, ISO, OSHA)</li>
                <li>Obtaining necessary permits, licenses, or approvals</li>
                <li>Ensuring proper training and certification of personnel</li>
                <li>Maintaining appropriate insurance coverage</li>
              </ul>
              <p>
                PACE Technologies does not provide safety advice, compliance guidance, or regulatory consultation. 
                You should consult with qualified safety professionals, regulatory experts, and legal counsel 
                as appropriate for your specific circumstances.
              </p>
            </div>
          </section>

          {/* Section 8: Third-Party Content and Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Content and Links</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                This Website may contain links to third-party websites, resources, or content. PACE Technologies 
                does not endorse, control, or assume responsibility for any third-party content, websites, products, 
                or services. Your use of third-party websites and resources is at your own risk and subject to 
                the terms and conditions of those third parties.
              </p>
              <p>
                PACE Technologies is not responsible for the accuracy, completeness, legality, or availability of 
                any third-party content or websites. The inclusion of any link does not imply endorsement by 
                PACE Technologies.
              </p>
            </div>
          </section>

          {/* Section 9: Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                All Content on this Website, including but not limited to text, graphics, logos, images, software, 
                tools, databases, and compilations, is the property of PACE Technologies or its licensors and is 
                protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mb-4">
                You may access and use the Content for personal, non-commercial, educational purposes only. You may 
                not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Reproduce, distribute, modify, create derivative works, publicly display, or publicly perform 
                    the Content without prior written permission from PACE Technologies</li>
                <li>Use the Content for commercial purposes without a license</li>
                <li>Remove any copyright, trademark, or other proprietary notices</li>
                <li>Use any automated systems or software to extract data from the Website</li>
              </ul>
              <p>
                Some Content may be subject to additional terms and conditions. Certain standards, specifications, 
                and reference materials may be subject to copyright by their respective organizations (e.g., ASTM, 
                ISO). You are responsible for complying with all applicable intellectual property laws.
              </p>
            </div>
          </section>

          {/* Section 10: User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. User Conduct</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                You agree not to use this Website in any manner that:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violates any applicable laws, regulations, or third-party rights</li>
                <li>Is harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                <li>Interferes with or disrupts the Website or servers</li>
                <li>Attempts to gain unauthorized access to any portion of the Website</li>
                <li>Introduces viruses, malware, or other harmful code</li>
                <li>Collects or harvests information about other users</li>
                <li>Impersonates any person or entity</li>
              </ul>
              <p>
                PACE Technologies reserves the right to terminate or restrict your access to the Website at any 
                time, without notice, for any reason, including violation of these Terms.
              </p>
            </div>
          </section>

          {/* Section 11: Modifications to Website */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to Website</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                PACE Technologies reserves the right to modify, suspend, or discontinue any aspect of the Website 
                at any time, including the availability of any Content, features, or tools, without notice or 
                liability. PACE Technologies may also impose limits on certain features or restrict access to parts 
                or all of the Website without notice or liability.
              </p>
            </div>
          </section>

          {/* Section 12: Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                You agree to indemnify, defend, and hold harmless PACE Technologies Corporation, its affiliates, 
                officers, directors, employees, agents, licensors, and suppliers from and against any and all claims, 
                damages, obligations, losses, liabilities, costs, debts, and expenses (including but not limited to 
                attorney's fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your use of or access to the Website</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Your use of any Content from the Website</li>
                <li>Any consequences resulting from your implementation of procedures, methods, or recommendations 
                    from the Website</li>
              </ul>
            </div>
          </section>

          {/* Section 13: Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law and Jurisdiction</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Arizona, 
                United States, without regard to its conflict of law provisions. Any disputes arising from or 
                relating to these Terms or the Website shall be subject to the exclusive jurisdiction of the 
                state and federal courts located in Maricopa County, Arizona.
              </p>
            </div>
          </section>

          {/* Section 14: Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining 
                provisions shall continue in full force and effect. The invalid provision shall be modified to the 
                minimum extent necessary to make it valid and enforceable.
              </p>
            </div>
          </section>

          {/* Section 15: Entire Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Entire Agreement</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                These Terms constitute the entire agreement between you and PACE Technologies regarding your use 
                of the Website and supersede all prior or contemporaneous communications, proposals, and agreements, 
                whether oral or written, relating to the subject matter hereof.
              </p>
            </div>
          </section>

          {/* Section 16: Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                If you have any questions about these Terms, please contact PACE Technologies at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2">
                  <strong>PACE Technologies Corporation</strong>
                </p>
                <p className="mb-2">
                  Website: <a href="https://metallographic.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">metallographic.com</a>
                </p>
                <p>
                  For questions regarding these Terms, please use the contact information provided on the 
                  PACE Technologies website.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Final Notice */}
        <div className="mt-12 bg-gray-100 border-2 border-gray-300 p-8 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Acknowledgment</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            By using this Website, you acknowledge that you have read, understood, and agree to be bound by these 
            Terms of Use. You understand that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>This Website is operated by PACE Technologies Corporation</li>
            <li>All Content is provided for educational and informational purposes only</li>
            <li>The Content consists of suggestions and general guidance, not professional advice</li>
            <li>You are solely responsible for evaluating the suitability and safety of any Content for your 
                specific application</li>
            <li>PACE Technologies is not responsible for any issues, damages, injuries, or losses resulting 
                from your use of or reliance on the Content</li>
            <li>You assume all risks associated with using any Content from this Website</li>
          </ul>
          <p className="text-gray-700 font-semibold">
            If you do not agree to these Terms, please do not use this Website.
          </p>
        </div>
      </div>
    </div>
  )
}

