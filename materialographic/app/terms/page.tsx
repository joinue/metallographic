import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions | PACE Technologies',
  description: 'Terms and conditions for the purchase of PACE Technologies equipment and consumables. Please read these terms carefully before purchasing.',
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
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              <strong>Important:</strong> Please read these Terms and Conditions carefully before purchasing PACE Technologies equipment or consumables. 
              By placing an order, you agree to be bound by these terms. If you do not agree to these terms, 
              please do not proceed with your purchase.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              These Terms and Conditions ("Terms") govern the purchase and sale of equipment and consumables 
              (collectively, "Products") from <strong>PACE Technologies Corporation</strong> ("PACE Technologies", 
              "we", "us", or "our"). These Terms, together with the Order Acknowledgment, constitute the entire 
              agreement between you and PACE Technologies regarding the purchase of Products.
            </p>
          </div>
        </section>

        {/* Terms Sections */}
        <div className="space-y-10">
          {/* Section 1: Limited Warranty and Disclaimer */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Equipment comes with a 2-year warranty against defects. Consumables are not covered. Warranty requires proper use and maintenance.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. LIMITED WARRANTY AND DISCLAIMER</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                PACE Technologies Equipment is under warranty for two years from the purchase date to be free from 
                defects in material and workmanship under correct use, normal operating conditions, and proper application. 
                "Normal operating conditions" are defined as the operational environment specified in the product manual 
                or technical specifications. Warranty is void if equipment is used outside these conditions, modified 
                without written authorization, or if recommended maintenance is not performed. Consumables are excluded 
                from warranty coverage.
              </p>
              <p className="mb-4">
                PACE Technologies' obligation under this warranty shall be limited to the repair or exchange, at PACE 
                Technologies' discretion, of any PACE Technologies equipment or part which proves to be defective as 
                provided herein. Repair or replacement processes, including turnaround times, are subject to change. 
                PACE Technologies reserves the right to either inspect the product at the Buyer's location or require 
                it to be returned to the factory for inspection. The Buyer is responsible for freight to and from the 
                factory on all warranty claims. This warranty does not extend to Consumables, goods damaged or subjected 
                to accident, abuse, misuse after release from PACE Technologies' warehouse, nor goods altered or repaired 
                by anyone other than specifically authorized PACE Technologies representatives without written approval. 
                Regular maintenance as specified in the equipment manual is required to maintain warranty coverage. 
                Failure to perform recommended maintenance may void warranty.
              </p>
              <p className="mb-4">
                Equipment requiring installation must be installed by qualified personnel in accordance with local codes 
                and regulations. PACE Technologies does not provide installation services for all equipment. Customer is 
                responsible for ensuring proper installation and may void warranty if installation is performed incorrectly.
              </p>
              <p className="mb-4">
                <strong>Note:</strong> Corrosion is considered a maintenance issue and not a warranty issue.
              </p>
              <p className="mb-4">
                <strong>PACE TECHNOLOGIES MAKES NO EXPRESS WARRANTIES OTHER THAN THOSE WHICH ARE SPECIFICALLY DESCRIBED HEREIN.</strong> 
                Any description of the goods, including Buyer's specifications and any description in catalogs, circulars, 
                and other written material, is solely for identification and does not create an express warranty that the 
                goods shall conform to such description. <strong>THIS WARRANTY IS EXPRESSLY IN LIEU OF ALL OTHER WARRANTIES, 
                EXPRESSED OR IMPLIED. THERE ARE NO IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. 
                THIS WARRANTY STATES PACE TECHNOLOGIES' ENTIRE AND EXCLUSIVE LIABILITY AND THE BUYER'S EXCLUSIVE REMEDY FOR 
                ANY CLAIM FOR DAMAGES IN CONNECTION WITH THE PRODUCTS. PACE TECHNOLOGIES WILL NOT BE LIABLE FOR INCIDENTAL 
                OR CONSEQUENTIAL DAMAGES WHATSOEVER, NOR FOR ANY SUM IN EXCESS OF THE PURCHASE PRICE.</strong>
              </p>
            </div>
          </section>

          {/* Section 2: Liability Cap */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Our maximum liability is limited to the purchase price. We're not responsible for lost profits or business interruption.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. LIABILITY CAP</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                PACE Technologies' maximum aggregate liability for loss and damage arising under, resulting from, or in 
                connection with the supply or use of the Equipment and Consumables, whether such liability arises from 
                any one or more claims for breach of contract, tort (including negligence), delayed completion, warranty, 
                indemnity, strict liability, or otherwise, shall be limited to one hundred percent (100%) of the purchase 
                price, excluding lost profits, business interruption, indirect damages, and consequential damages.
              </p>
            </div>
          </section>

          {/* Section 3: Delivery */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Once we ship, you own it and are responsible for any damage during shipping. File claims with the shipping company.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. DELIVERY</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                The Customer assumes and shall bear the risk of all loss or damage to the Products from every cause 
                whatsoever, whether or not insured, and title to such Products shall pass to the Customer upon PACE 
                Technologies' delivery of the Products to the common carrier of PACE Technologies' choice, or the carrier 
                specified in writing by the Customer, for shipment to the Customer. Any claims for breakage, loss, delay, 
                or damage shall be made to the carrier by the Customer, and PACE Technologies will render reasonable 
                assistance in prosecuting such claims.
              </p>
            </div>
          </section>

          {/* Section 4: Acceptance */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Inspect your order within 10 days. Report any problems within 30 days or you accept it as-is.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. ACCEPTANCE</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Upon receipt of delivery, the Customer is obligated to inspect the Products within ten (10) business days. 
                This inspection should include a verification of product specifications, condition, and completeness against 
                the order details. If the Customer finds any damages, errors, or shortages in the Products, they must submit 
                a written objection to <a href="mailto:pace@metallographic.com" className="text-primary-600 hover:underline">pace@metallographic.com</a> within thirty (30) business days from the date of delivery as recorded by the carrier. 
                This objection email should include the corresponding invoice number noted in the subject line. The objection 
                should include detailed descriptions and any relevant documentation, such as photographs, to support the claim.
              </p>
              <p>
                Failure to conduct an inspection or to submit any claim within this thirty (30) business day period, 
                commencing from the carrier's recorded delivery date, will be deemed as the Customer's acceptance of the 
                Products as is. This acceptance constitutes a waiver of any right to make future claims regarding the condition 
                or completeness of the received Products. The Customer's acknowledgment of receipt is not required to initiate 
                this inspection period.
              </p>
            </div>
          </section>

          {/* Section 5: Payment */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Net 30 for domestic customers with credit approval. International customers pre-pay. Late fees may apply.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. PAYMENT</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Payment Terms: Net 30 days for domestic customers with approved credit. International customers are required 
                to pre-pay unless alternative arrangements are made in writing. Credit approval required for all Net 30 terms. 
                The Customer agrees to provide timely payment for the Products in accordance with the terms of payment that are 
                set forth on the corresponding Order Acknowledgment sent from an authorized PACE Technologies representative. 
                PACE Technologies reserves the right to charge interest on late payments at the lesser of 12% per annum or the 
                maximum rate allowed by law, and may suspend future shipments until account is current.
              </p>
            </div>
          </section>

          {/* Section 6: Default */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">If you don't pay, your warranty is suspended until you're current. No warranty extension for default periods.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. DEFAULT</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                If the Buyer is in default under the work or purchase order or any other agreement between the Buyer and Seller, 
                including but not limited to failure to pay all amounts due and payable, the Buyer's rights under the warranty 
                shall be suspended during any period of such default. The original warranty period will not be extended beyond 
                its original expiration date despite such suspension of warranty rights.
              </p>
            </div>
          </section>

          {/* Section 7: Miscellaneous Provisions */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Arizona law governs. Disputes go to arbitration in Pima County. Each party pays their own costs.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. MISCELLANEOUS PROVISIONS</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                This agreement is exclusively governed and interpreted in accordance with the laws of the State of Arizona, 
                without regard to its conflict of law principles. Any disputes, controversies, or claims arising out of or 
                relating to the purchase of the equipment, including but not limited to its validity, interpretation, 
                performance, breach, or termination, shall be resolved through binding arbitration. However, both parties agree 
                that before proceeding to arbitration, they will attempt to resolve disputes through mutual negotiation or 
                mediation. Arbitration shall be conducted in Pima County, Arizona, under the rules of the American Arbitration 
                Association (AAA), but with the following stipulations:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Each party shall bear its own costs related to the arbitration, regardless of the outcome. This includes 
                    attorney fees, administrative fees, and other expenses incurred during the arbitration process.</li>
                <li>The arbitrator's authority shall be limited to making determinations under the existing terms of this 
                    Agreement and shall not have the authority to award punitive or exemplary damages.</li>
                <li>The arbitration award shall be final and binding, and judgment on the award rendered by the arbitrator(s) 
                    may be entered in any court having jurisdiction thereof.</li>
              </ul>
              <p>
                These terms and conditions, along with the product descriptions as outlined in the accompanying Order 
                Acknowledgment or other official PACE Technologies documentation, constitute the entire agreement between the 
                parties regarding this sale. This agreement supersedes all prior or contemporaneous agreements, negotiations, 
                representations, and proposals, written or oral, related to its subject matter. Any amendment or modification 
                to this Agreement is effective only if it is in writing and signed by duly authorized representatives of both 
                parties. A waiver by either party of any breach or default under this Agreement shall not constitute a waiver of 
                any subsequent breach or default and will not in any way affect the other terms of this Agreement.
              </p>
            </div>
          </section>

          {/* Section 8: Returns and Restocking Fee */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">15% restocking fee on returns. Consumables must be unopened. All returns must be in original condition.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. RETURNS AND RESTOCKING FEE</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Equipment returns are subject to a 15% restocking fee unless determined to be non-conforming. Consumables may 
                be returned within 30 days if unopened and in resaleable condition, subject to a 15% restocking fee. Opened 
                consumables are not returnable. All returns must be in original condition with packaging and documentation.
              </p>
              <p className="mb-4">
                In the event of a return due to non-conforming goods, PACE Technologies will conduct a thorough inspection and 
                verification process. If the products are confirmed to be non-conforming, PACE Technologies will waive the 
                restocking fee and may, at its discretion, offer a replacement, repair, or refund for the non-conforming goods. 
                Failure to return goods in their original condition may result in additional charges or refusal of the return. 
                PACE Technologies reserves the right to amend the restocking fee policy for specific categories of products, 
                special orders, or in cases of bulk purchases, as detailed in the Order Acknowledgment at the time of sale.
              </p>
              <p>
                Consumables should be stored according to manufacturer recommendations. Customer is responsible for checking 
                expiration dates and proper storage conditions as indicated on product packaging.
              </p>
            </div>
          </section>

          {/* Section 9: Data and Privacy */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We follow our Privacy Policy. You're responsible for backing up your data before service work.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. DATA AND PRIVACY</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Customer data handling is governed by our Privacy Policy, available on our website. Customer is responsible 
                for data backup before any service or maintenance work. PACE Technologies is not liable for data loss during 
                service or maintenance.
              </p>
            </div>
          </section>

          {/* Section 10: Intellectual Property Protection */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Don't reverse engineer or copy our equipment. Don't resell without permission. Keep our trademarks visible.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. INTELLECTUAL PROPERTY PROTECTION</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Customer may not reverse engineer, copy, or modify equipment without written authorization. All proprietary 
                information remains confidential. Customer may not resell equipment without written permission. Trademark and 
                copyright notices must remain visible. Any unauthorized modification voids warranty and may result in termination 
                of support services.
              </p>
            </div>
          </section>

          {/* Section 11: Force Majeure */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">We're not responsible for delays due to events beyond our control (natural disasters, pandemics, etc.). Either party can cancel if delay exceeds 90 days.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. FORCE MAJEURE</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                PACE Technologies shall not be liable for delays or failures in performance due to circumstances beyond its 
                reasonable control, including but not limited to acts of God, war, terrorism, pandemic, government action, 
                supplier delays, material shortages, labor disputes, or transportation issues. Either party may terminate this 
                agreement if such delay exceeds 90 days.
              </p>
            </div>
          </section>

          {/* Section 12: Default and Termination */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">If you don't pay, we can stop shipments, demand immediate payment, and take back equipment. You pay all collection costs.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. DEFAULT AND TERMINATION</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                If Customer is in default, PACE Technologies may accelerate all payments, suspend shipments, place account on 
                credit hold, and pursue collection remedies. Customer is responsible for all collection costs, including attorney 
                fees. PACE Technologies reserves the right to repossess equipment if payments are not made as agreed.
              </p>
            </div>
          </section>

          {/* Section 13: Service and Maintenance */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Service calls cost extra after warranty. You provide proper utilities. We don't guarantee response times. Training may be required.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. SERVICE AND MAINTENANCE</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Service calls outside warranty are subject to travel and labor charges. Customer is responsible for proper 
                electrical and utility connections. Service response times are not guaranteed. Training requirements may apply 
                for certain equipment. Customer must comply with all safety regulations and local codes.
              </p>
            </div>
          </section>

          {/* Section 14: International Sales */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">You pay all customs, taxes, and import fees. Currency changes may affect pricing. You handle all import paperwork.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. INTERNATIONAL SALES</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                International customers are responsible for all customs duties, taxes, and import fees. Currency fluctuations 
                may affect pricing. Customer must comply with all export and import regulations. International warranty terms 
                may differ from domestic terms. Customer is responsible for obtaining necessary import licenses and permits.
              </p>
            </div>
          </section>

          {/* Section 15: Software and Firmware */}
          <section>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Summary:</p>
              <p className="text-sm text-blue-800">Software is licensed, not owned. Don't copy or modify it. Keep software updated. License ends if you sell the equipment.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. SOFTWARE AND FIRMWARE</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Software is licensed, not sold. Customer may not copy, modify, or distribute software. Updates and support are 
                provided at PACE Technologies' discretion. Customer is responsible for maintaining current software versions. 
                Software license terminates with equipment sale or transfer.
              </p>
            </div>
          </section>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gray-100 border-2 border-gray-300 p-8 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About These Terms?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms and Conditions, please contact PACE Technologies:
          </p>
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-2">
              <strong>PACE Technologies Corporation</strong>
            </p>
            <p className="mb-2">
              Email: <a href="mailto:pace@metallographic.com" className="text-primary-600 hover:underline">pace@metallographic.com</a>
            </p>
            <p>
              Website: <a href="https://metallographic.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">metallographic.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
