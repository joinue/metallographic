"""
One-shot builder for the Distributor and Reseller Agreement HTML pages.

Replaces the (placeholder) legal block inside two pre-copied HTML scaffolds
with the new contract content + meta bar with download buttons + sticky TOC
+ active-section JS.

Run from project root:  python _tools/build_agreements.py
"""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------------------
# Section content. Each entry: (id, number, title, summary, body_html)
# body_html may contain raw HTML (paragraphs, lists, strong, em).
# ---------------------------------------------------------------------------

DISTRIBUTOR_SECTIONS = [
    ("s1", "01", "Definitions", "Defines the key terms used throughout. The two big ones: 'Products' (PACE equipment and consumables) and 'Territory' (the geographic area named in the cover sheet).", """
        <p>The following terms have the meanings given below. Capitalized terms not defined here have the meanings given in the cover page or in PACE's standard Terms and Conditions of Sale ("PACE Standard Terms").</p>
        <ul>
            <li><strong>"Agreement"</strong> means this Distributor Agreement, including all Exhibits and any executed amendments.</li>
            <li><strong>"Distributor"</strong> means the entity named on the cover page as the appointed distributor.</li>
            <li><strong>"Effective Date"</strong> means the date stated on the cover page.</li>
            <li><strong>"End Customer"</strong> means the ultimate purchaser or user of a Product within the Territory, other than Distributor.</li>
            <li><strong>"List Price"</strong> means PACE's then-current published list price for the applicable Product, in U.S. dollars, as set forth in the Price List (Exhibit B) or as updated by PACE.</li>
            <li><strong>"Marks"</strong> means PACE's trademarks, service marks, trade names, logos, and domain names made available to Distributor under this Agreement.</li>
            <li><strong>"PACE"</strong> means PACE Technologies Corporation, an Arizona corporation, headquartered at 3601 E. 34th Street, Tucson, Arizona 85713, USA.</li>
            <li><strong>"Products"</strong> means the metallographic equipment, consumables, software, firmware, parts, and related services offered by PACE for resale, as identified in the Price List or otherwise designated by PACE in writing.</li>
            <li><strong>"Reserved Accounts"</strong> means the End Customers identified in Exhibit A whom PACE may serve directly without obligation to Distributor.</li>
            <li><strong>"Territory"</strong> means the geographic area identified on the cover page.</li>
            <li><strong>"Trade Laws"</strong> has the meaning given in Section 14.</li>
        </ul>
    """),
    ("s2", "02", "Appointment and Territory", "Distributor is a non-exclusive authorized distributor in the named Territory. PACE keeps the right to appoint others, sell direct, and serve Reserved Accounts.", """
        <p>Subject to and during the term of this Agreement, PACE appoints Distributor, and Distributor accepts appointment, as a <strong>non-exclusive</strong> authorized distributor of the Products in the Territory. Distributor may resell the Products in the Territory and may use the Marks subject to Section 8.</p>
        <p>The appointment is <strong>non-exclusive</strong>. PACE expressly retains the right, in its sole discretion and without obligation or compensation to Distributor, to: (i) appoint additional distributors, resellers, or other channel partners in or outside the Territory; (ii) sell Products directly to End Customers in or outside the Territory, including through PACE's website, online shop, sales personnel, or other channels; (iii) sell directly to the Reserved Accounts identified in Exhibit A on any terms PACE determines; (iv) modify, add to, or discontinue any Product at any time; and (v) refuse any order for any reason.</p>
        <p>Distributor shall not solicit orders or open offices outside the Territory without PACE's prior written consent. Passive sales — sales not actively solicited but resulting from an unsolicited inquiry — are permitted to the extent required by applicable law.</p>
    """),
    ("s3", "03", "Reserved Accounts", "Some End Customers (national labs, OEMs, key strategic accounts) are reserved for direct PACE sales. They're listed in Exhibit A.", """
        <p>PACE reserves the right to sell Products directly to the End Customers listed in <strong>Exhibit A (Reserved Accounts)</strong>, regardless of their location within the Territory, without any obligation to Distributor, including no obligation to pay a referral fee, commission, or other compensation. Distributor shall not solicit sales of Products to Reserved Accounts.</p>
        <p>PACE may update Exhibit A from time to time by providing thirty (30) days' written notice to Distributor. Orders accepted by Distributor before the effective date of a Reserved Account update are not affected.</p>
    """),
    ("s4", "04", "Products and Pricing", "Distributor gets a 25% discount off List Price. PACE can change prices with 60 days' notice. All prices are USD.", """
        <p><strong>Discount.</strong> Distributor is entitled to a discount of <strong>twenty-five percent (25%) off List Price</strong> on all qualifying Products. PACE may, in its sole discretion, designate certain Products (such as third-party items, custom builds, or promotional bundles) as ineligible for the discount or as eligible for a different discount, as indicated in the Price List.</p>
        <p><strong>Currency.</strong> All prices are quoted and payable in <strong>U.S. dollars (USD)</strong> unless otherwise agreed in writing.</p>
        <p><strong>Price Changes.</strong> PACE may change List Prices at any time. PACE will provide Distributor with at least <strong>sixty (60) days' written notice</strong> of any List Price increase. Orders accepted by PACE before the effective date of a price increase will be honored at the prior price. Orders accepted after the effective date will be invoiced at the new price.</p>
        <p><strong>Pricing to End Customers.</strong> Distributor is free to determine its own resale prices to End Customers, subject to: (i) PACE's right to publish suggested resale prices or minimum advertised prices ("MAP"); (ii) Distributor's obligation to maintain reasonable consistency with prevailing market conditions; and (iii) Section 9 (Channel Conduct). Distributor shall not represent any resale price as having been set or required by PACE.</p>
        <p><strong>Taxes and Duties.</strong> All prices are exclusive of sales, use, value-added, excise, customs, withholding, and similar taxes, duties, and governmental charges, all of which are the responsibility of Distributor unless Distributor furnishes a valid exemption certificate prior to invoicing.</p>
    """),
    ("s5", "05", "Annual Purchase Commitment", "Distributor commits to a minimum of $25,000 USD in net purchases each calendar year. Falling short gives PACE options, not automatic termination.", """
        <p>Distributor shall purchase from PACE Products with an aggregate net invoiced value of not less than <strong>twenty-five thousand U.S. dollars ($25,000)</strong> in each calendar year of the Term (the "Annual Minimum"). The Annual Minimum is prorated for any partial calendar year at the start and end of the Term.</p>
        <p>If Distributor fails to meet the Annual Minimum in any calendar year, PACE may, at its sole option and as its exclusive remedy for the shortfall, elect one or more of the following: (i) continue this Agreement on its current terms; (ii) reduce Distributor's discount tier for the following calendar year; (iii) remove specific Products from Distributor's eligibility; (iv) require Distributor to convert to a Reseller Agreement; or (v) terminate this Agreement on thirty (30) days' notice. PACE's election shall be made in writing.</p>
    """),
    ("s6", "06", "Orders, Payment, and Delivery", "Distributor places purchase orders. Year 1 is pre-pay; Year 2+ is Net-30 with credit approval. PACE's Standard Terms apply to every order.", """
        <p><strong>Standard Terms Apply.</strong> Every order placed by Distributor is governed by PACE's then-current <a href="/terms.html">Standard Terms and Conditions of Sale</a>, in addition to this Agreement. In the event of a conflict between the two, this Agreement controls as to the matters expressly addressed here; the Standard Terms control as to all other matters relating to the supply of Products. PACE rejects any conflicting terms contained in Distributor's purchase orders, acknowledgments, or other documents.</p>
        <p><strong>Order Acceptance.</strong> Each purchase order is subject to acceptance by PACE in writing (including by Order Acknowledgment). PACE may reject any order in whole or in part for any reason, including credit, inventory, or trade-compliance concerns.</p>
        <p><strong>Payment Terms.</strong> During the first twelve (12) months of the Term, Distributor shall make payment in advance ("PIA") for all orders. After the first twelve months, subject to PACE's credit approval, Distributor may receive <strong>Net-30</strong> payment terms. PACE may revoke or modify credit terms at any time upon written notice. Late payments accrue interest at the lesser of 1.5% per month (18% per annum) or the maximum rate permitted by law.</p>
        <p><strong>Delivery and Risk.</strong> Unless otherwise agreed in writing, delivery is <strong>FCA PACE's facility, Tucson, Arizona</strong> (Incoterms 2020). Title and risk of loss pass to Distributor upon delivery to the first carrier. Distributor is responsible for all freight, insurance, customs duties, and import/export fees beyond that point.</p>
        <p><strong>Currency Risk.</strong> Currency fluctuations between order acknowledgment and shipment are at Distributor's risk.</p>
    """),
    ("s7", "07", "Inventory and Demo Equipment", "Distributor maintains reasonable stock of fast-moving consumables and at least one demo unit of key equipment lines.", """
        <p>Distributor shall maintain a reasonable inventory of fast-moving consumables sufficient to serve normal demand in the Territory and to enable timely fulfillment of routine End-Customer orders. PACE may publish recommended stocking levels from time to time.</p>
        <p>Distributor shall acquire and maintain at least one (1) working demonstration unit of each principal equipment line it actively promotes, available for in-person customer demonstrations or trade shows. Demonstration units are purchased at the prevailing distributor discount and remain Distributor's property; they are not eligible for return.</p>
        <p>Distributor shall store consumables — particularly etchants, abrasives, and adhesives — in accordance with manufacturer recommendations and applicable Safety Data Sheets, and shall observe expiration dates.</p>
    """),
    ("s8", "08", "Marketing and Trademark License", "Distributor markets the Products in the Territory and gets a non-exclusive license to use PACE marks for that purpose, following brand guidelines.", """
        <p><strong>Marketing Activities.</strong> Distributor shall use commercially reasonable efforts to actively promote the sale of Products in the Territory, including by: (i) maintaining a professional website that presents the Products accurately and prominently identifies Distributor as an authorized PACE distributor; (ii) participating in relevant trade shows, conferences, and industry events; (iii) producing or translating marketing collateral as appropriate for the Territory; (iv) generating and qualifying sales leads; and (v) cooperating with PACE on joint marketing campaigns as agreed.</p>
        <p><strong>Trademark License.</strong> Subject to this Agreement, PACE grants Distributor a non-exclusive, non-transferable, non-sublicensable, royalty-free license, during the Term and within the Territory, to use the Marks solely to advertise, promote, and resell the Products as an authorized PACE distributor.</p>
        <p><strong>Brand Guidelines and Quality Control.</strong> Distributor shall use the Marks only in accordance with PACE's brand guidelines (provided on request and updated from time to time). Distributor shall: (i) not modify or alter the Marks; (ii) not combine the Marks with any other mark in a manner that suggests a joint venture or co-brand without PACE's prior written consent; (iii) ensure that all uses of the Marks meet a level of quality consistent with PACE's reputation; and (iv) include appropriate trademark notices and attribution. Upon PACE's request, Distributor shall submit samples of its uses of the Marks for review.</p>
        <p><strong>Ownership.</strong> The Marks remain the sole property of PACE. Distributor acquires no rights in the Marks except the limited license expressly granted here. All use of the Marks by Distributor and all goodwill generated thereby inure to the sole benefit of PACE.</p>
        <p><strong>Termination of License.</strong> The trademark license terminates automatically upon expiration or termination of this Agreement. Upon termination, Distributor shall cease all use of the Marks within thirty (30) days, including removal from Distributor's website, signage, business cards, and marketing materials.</p>
    """),
    ("s9", "09", "Channel Conduct and Online Sales", "Distributor sells via its own branded website only. No Amazon, eBay, AliExpress, or similar marketplaces without written consent. Channel-stuffing and gray-market diversion are prohibited.", """
        <p><strong>Approved Sales Channels.</strong> Distributor may sell Products through (i) its own staffed sales offices in the Territory; (ii) its own e-commerce website displaying its own branding and identifying Distributor as an authorized PACE distributor; and (iii) bona fide trade-show and event sales.</p>
        <p><strong>Online Marketplaces Prohibited.</strong> Distributor shall not list, advertise, or sell Products on any third-party online marketplace — including Amazon, eBay, AliExpress, Alibaba, Mercado Libre, Taobao, or any equivalent — without PACE's prior written consent. PACE may grant or withhold consent in its sole discretion and may revoke consent at any time. This restriction is material; breach is grounds for immediate termination of this Agreement under Section 22.</p>
        <p><strong>No Gray-Market Diversion.</strong> Distributor shall not knowingly export, re-export, or transship Products outside the Territory, nor sell to any customer Distributor knows or reasonably should know will do so, except as permitted under applicable competition law (passive sales). Distributor shall promptly notify PACE of any suspected diversion.</p>
        <p><strong>Minimum Advertised Price.</strong> If PACE adopts a minimum advertised price ("MAP") policy, Distributor's advertised pricing on its website and in published materials shall comply with that policy. MAP applies only to advertised price; Distributor remains free to set its own actual transaction prices subject to applicable law.</p>
        <p><strong>Bundling and Modification.</strong> Distributor shall not repackage, relabel, modify, or combine Products with third-party products in a manner that obscures PACE's brand or removes hazard or safety information.</p>
    """),
    ("s10", "10", "Warranty Service and End-Customer Terms", "Distributor performs first-line warranty service in the Territory. PACE provides training, parts, and labor reimbursement per Exhibit D. End-Customer terms must be substantially similar to PACE's Standard Terms.", """
        <p><strong>First-Line Service.</strong> Distributor shall provide first-line warranty service, including troubleshooting, on-site or in-shop repair, and customer support, for Products sold within the Territory. Distributor shall maintain at least one technician trained and certified by PACE for each principal equipment line Distributor sells.</p>
        <p><strong>Training.</strong> PACE shall provide initial product and service training to Distributor's designated technicians (typically virtual; on-site training may be offered at PACE's discretion and at Distributor's expense for travel). PACE shall provide refresher training on substantial product updates.</p>
        <p><strong>Warranty Reimbursement.</strong> For valid warranty repairs performed by Distributor on Products under PACE's standard warranty, PACE shall reimburse Distributor according to <strong>Exhibit D (Warranty Reimbursement Schedule)</strong>, which sets out parts and labor rates, claim documentation requirements, and submission timelines.</p>
        <p><strong>Service Levels.</strong> Distributor shall acknowledge End-Customer service requests within one (1) business day, target on-site response within five (5) business days, and target completion of routine warranty repairs within twenty-one (21) calendar days, in each case subject to parts availability. Distributor shall escalate complex issues to PACE Technical Support promptly.</p>
        <p><strong>End-Customer Terms.</strong> Distributor shall sell Products to End Customers only on terms <strong>substantially equivalent to PACE's Standard Terms and Conditions of Sale</strong>, including the limited warranty, limitation of liability, indemnification, dispute-resolution, and hazardous-materials provisions. Distributor shall not extend any express warranty broader than PACE's standard limited warranty, nor make any representation about Product performance, suitability, or features beyond what is contained in PACE's published materials. Distributor shall make PACE's Safety Data Sheets and product documentation available to End Customers in the Territory's principal language(s) where reasonably possible.</p>
        <p><strong>Spare Parts.</strong> PACE shall make commercially reasonable efforts to maintain spare-parts availability for Products sold by Distributor for a minimum of <strong>five (5) years</strong> after Product discontinuation. After this period, parts are subject to availability.</p>
    """),
    ("s11", "11", "Training and Technical Support", "PACE provides initial and ongoing technical support, training, and documentation. Distributor pays travel costs for on-site training.", """
        <p>PACE shall provide Distributor with: (i) reasonable virtual product and applications training at no charge; (ii) access to technical documentation, manuals, application notes, and engineering drawings as appropriate; (iii) Tier-2 technical support via email and telephone during PACE's normal business hours; and (iv) timely notice of significant product updates, recalls, or safety bulletins.</p>
        <p>On-site training and travel-related expenses (airfare, lodging, meals, ground transportation) for either party are at the requesting party's expense unless otherwise agreed in writing. PACE may offer paid on-site training, advanced certification programs, or sales-enablement workshops on commercial terms.</p>
        <p>Distributor shall maintain at least one trained and certified technical contact and one sales contact at all times, and shall promptly notify PACE of any change in either role.</p>
    """),
    ("s12", "12", "Reporting and Business Reviews", "Distributor shares quarterly sales pipeline reports and meets with PACE at least annually for a business review.", """
        <p>Distributor shall provide PACE with a quarterly report (within thirty (30) days of each calendar quarter end) containing: (i) sales activity by Product category in the Territory; (ii) qualified pipeline and forecast; (iii) installed-base updates and notable End-Customer wins; (iv) significant customer feedback, including complaints, returns, and warranty trends; and (v) any material competitive intelligence Distributor is willing to share.</p>
        <p>PACE and Distributor shall meet (in person or by video conference) at least once each calendar year for a business review covering performance, joint pipeline, marketing plans, training needs, and any other matters relevant to the partnership.</p>
        <p>All information shared in reports and reviews is Confidential Information under Section 17.</p>
    """),
    ("s13", "13", "Insurance", "Distributor maintains commercially reasonable insurance customary for its size, industry, and jurisdiction. PACE may request a Certificate of Insurance and additional-insured naming.", """
        <p>Distributor shall maintain, at its own expense throughout the Term, commercially reasonable insurance customary for businesses of its size and industry in its jurisdiction, including:</p>
        <ul>
            <li>Commercial General Liability coverage appropriate to Distributor's activities under this Agreement;</li>
            <li>Workers' Compensation as required by applicable law; and</li>
            <li>Commercial Automobile Liability covering owned, hired, and non-owned vehicles, if Distributor's personnel transport Products or visit End-Customer sites.</li>
        </ul>
        <p>Upon PACE's reasonable request, Distributor shall provide a Certificate of Insurance evidencing its coverage and, where customarily permitted in its jurisdiction, shall name PACE Technologies Corporation as an additional insured on its general liability policy in connection with the Products. PACE does not require Distributor to carry separate product liability coverage, given PACE's role as manufacturer and the indemnification obligations set forth in Section 20.</p>
    """),
    ("s14", "14", "Export Controls and Trade Compliance", "Distributor complies with US export law, sanctions, anti-boycott rules, and end-use restrictions. Restricted-party screening is required on every End Customer.", """
        <p>The Products, software, technology, and technical data made available to Distributor are subject to the U.S. Export Administration Regulations (EAR), the International Traffic in Arms Regulations (ITAR) to the extent applicable, regulations administered by the U.S. Office of Foreign Assets Control (OFAC), and the export-control, sanctions, and import laws of other jurisdictions ("Trade Laws"). Distributor represents, warrants, and covenants on a continuing basis that:</p>
        <ul>
            <li>It is not, and no owner, director, officer, or employee is, a restricted or sanctioned party under any Trade Laws, including the U.S. Specially Designated Nationals List, Denied Persons List, Entity List, or comparable lists of other governments;</li>
            <li>It will not, directly or indirectly, export, re-export, transfer, or divert any Product to any country, region, entity, or individual subject to U.S. embargo or comprehensive sanctions (including, as of the Effective Date, Cuba, Iran, North Korea, Syria, and the Crimea, Donetsk, and Luhansk regions of Ukraine);</li>
            <li>It will conduct restricted-party screening of each prospective End Customer against current government lists prior to delivery and maintain records of such screening for at least five (5) years;</li>
            <li>It will not use, sell, or permit use of the Products in connection with the design, development, production, stockpiling, or use of nuclear weapons, chemical or biological weapons, missile technology, or unauthorized military end uses;</li>
            <li>It will comply with all anti-boycott laws applicable to it, including the U.S. Export Administration Act anti-boycott provisions and Section 999 of the U.S. Internal Revenue Code, and report any boycott request received to PACE within ten (10) business days;</li>
            <li>It will obtain at its own cost any export, re-export, import, or other government authorizations required for its activities under this Agreement; and</li>
            <li>It will provide PACE with End-Use and End-User certifications upon request.</li>
        </ul>
        <p>Distributor shall indemnify, defend, and hold harmless PACE from and against any claims, fines, penalties, damages, or costs arising from Distributor's breach of any Trade Laws. PACE may suspend, delay, or refuse to fulfill any order it believes in good faith may violate Trade Laws, without liability to Distributor.</p>
    """),
    ("s15", "15", "Anti-Bribery and Anti-Corruption", "Distributor follows FCPA, UK Bribery Act, and local laws. No improper payments to government officials. PACE has audit rights.", """
        <p>Distributor shall comply with the U.S. Foreign Corrupt Practices Act, the U.K. Bribery Act 2010, and all other applicable anti-bribery and anti-corruption laws ("Anti-Corruption Laws"). Without limiting the foregoing, Distributor shall not, directly or indirectly:</p>
        <ul>
            <li>Offer, promise, give, or authorize the giving of anything of value to any government official, political party, party official, candidate for public office, or any other person in order to obtain or retain business, secure an improper advantage, or influence official action; or</li>
            <li>Accept any payment, gift, or benefit that would violate applicable Anti-Corruption Laws.</li>
        </ul>
        <p>Distributor shall maintain accurate books and records reflecting all transactions involving the Products. Upon reasonable prior notice, PACE may audit Distributor's books and records relating to the Products and this Agreement, at PACE's expense, to verify compliance with this Section.</p>
        <p>Distributor shall promptly notify PACE of any actual or suspected breach of Anti-Corruption Laws relating to PACE, the Products, or this Agreement. Material breach of this Section is grounds for immediate termination of this Agreement under Section 22.</p>
    """),
    ("s16", "16", "Data Protection and Privacy", "When Distributor handles End-Customer personal data on PACE's behalf, it acts as a processor. PACE's Privacy Policy and a data-processing addendum (where required) govern.", """
        <p>Each party shall comply with applicable data-protection laws, including the EU General Data Protection Regulation (GDPR), the UK GDPR, the California Consumer Privacy Act (as amended), and other applicable U.S. state and foreign privacy laws.</p>
        <p>To the extent Distributor processes personal data of End Customers or their personnel on behalf of PACE (for example, in connection with quotes, orders, warranty registration, or technical support routed through PACE's systems), Distributor acts as a processor (under GDPR) or service provider (under CCPA) and shall: (i) process such personal data only on PACE's documented instructions; (ii) implement appropriate technical and organizational security measures; (iii) ensure persons authorized to process personal data are subject to confidentiality; (iv) assist PACE in responding to data-subject requests; and (v) delete or return such personal data on termination. The parties shall execute a data-processing addendum on PACE's standard form upon either party's request.</p>
        <p>PACE's <a href="/privacy.html">Privacy Policy</a> governs PACE's handling of personal data.</p>
    """),
    ("s17", "17", "Confidentiality", "Both parties protect each other's non-public information for the Term and 5 years after.", """
        <p><strong>Confidential Information.</strong> "Confidential Information" means any non-public information disclosed by one party (the "Disclosing Party") to the other (the "Receiving Party") in connection with this Agreement, whether oral, written, or electronic, that is identified as confidential or that a reasonable person would understand to be confidential, including pricing, customer lists, business plans, technical information, drawings, software, financial information, and personal data of customers or personnel.</p>
        <p><strong>Obligations.</strong> The Receiving Party shall: (i) use Confidential Information solely for purposes of performing this Agreement; (ii) protect Confidential Information with at least the same degree of care it uses for its own information of similar sensitivity and in no event less than reasonable care; (iii) limit disclosure to employees, agents, and advisors who have a need to know and are bound by confidentiality obligations no less protective than these; and (iv) not disclose Confidential Information to any third party without the Disclosing Party's prior written consent.</p>
        <p><strong>Exceptions.</strong> Confidential Information does not include information that the Receiving Party can demonstrate: (i) was publicly known without breach of this Agreement; (ii) was rightfully known to it without confidentiality obligation prior to receipt; (iii) was independently developed without use of Confidential Information; or (iv) is required to be disclosed by law or court order, in which case the Receiving Party shall, to the extent legally permitted, give the Disclosing Party prompt notice.</p>
        <p><strong>Duration.</strong> The obligations in this Section apply during the Term and for <strong>five (5) years</strong> after expiration or termination, except that obligations regarding trade secrets continue until the information ceases to be a trade secret. The obligations regarding personal data continue for as long as required by applicable law.</p>
        <p><strong>Return.</strong> On expiration or termination, or upon the Disclosing Party's request, the Receiving Party shall return or destroy all Confidential Information in its possession, subject to commercially reasonable archival retention and any legal hold.</p>
    """),
    ("s18", "18", "Intellectual Property", "PACE owns all IP in the Products and Marks. Distributor gets no rights other than what's expressly licensed. Feedback Distributor gives PACE is PACE's property.", """
        <p>All patents, trademarks, copyrights, trade secrets, know-how, and other intellectual property rights in or relating to the Products, Marks, technical documentation, software, firmware, and PACE materials are and remain the sole and exclusive property of PACE (or its licensors). Distributor acquires no rights except the limited rights expressly granted in this Agreement.</p>
        <p>Distributor shall not, and shall not permit any third party to: (i) reverse engineer, decompile, or disassemble the Products or any software or firmware in them, except to the limited extent expressly permitted by applicable law notwithstanding this restriction; (ii) copy or create derivative works; (iii) remove or alter any proprietary notices; (iv) register or attempt to register any of the Marks or confusingly similar marks; or (v) challenge the validity of any PACE intellectual property.</p>
        <p>Any feedback, suggestions, or improvement ideas Distributor provides to PACE are non-confidential, and PACE may freely use them without obligation to Distributor.</p>
    """),
    ("s19", "19", "Representations and Warranties", "Each party warrants it has authority to enter the agreement, is legally organized, and isn't a sanctioned party. Distributor adds a few specific reps.", """
        <p><strong>Mutual.</strong> Each party represents and warrants that: (i) it is duly organized, validly existing, and in good standing under the laws of its jurisdiction; (ii) it has the right, power, and authority to enter into and perform this Agreement; (iii) execution and performance do not breach any other agreement to which it is a party or any law applicable to it; (iv) neither it nor any owner, director, officer, or employee is a restricted or sanctioned party; and (v) it will perform its obligations in accordance with applicable laws.</p>
        <p><strong>Distributor.</strong> Distributor additionally represents and warrants that: (i) it has and will maintain the technical capability, financial resources, and personnel to perform its obligations; (ii) it will not make any representations or warranties to End Customers beyond those authorized by PACE in writing; (iii) it will conduct its business in a manner that promotes the reputation of PACE and the Products; and (iv) it will promptly notify PACE of any actual or threatened claim that could affect PACE or the Products.</p>
        <p><strong>DISCLAIMER.</strong> EXCEPT AS EXPRESSLY STATED HERE OR IN PACE'S STANDARD TERMS, PACE MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
    """),
    ("s20", "20", "Indemnification", "PACE defends Distributor against IP-infringement and product-defect claims. Distributor defends PACE against claims arising from Distributor's own conduct.", """
        <p><strong>By PACE.</strong> Subject to the limits in Section 21, PACE shall defend, indemnify, and hold harmless Distributor and its officers, directors, employees, and agents from and against third-party claims, and pay damages or settlement amounts finally awarded by a court of competent jurisdiction or agreed in a PACE-approved settlement, to the extent such claims arise out of:</p>
        <ul>
            <li>An allegation that a Product, as supplied by PACE and used in accordance with PACE's documentation, infringes a third party's patent, copyright, trademark, or trade-secret rights (an "IP Claim"); or</li>
            <li>Death, bodily injury, or tangible property damage caused by a defect in a Product, to the extent the defect existed when the Product left PACE's facility and was not caused or contributed to by Distributor's modification, misuse, or failure to follow PACE's documentation.</li>
        </ul>
        <p><strong>Distributor's Conditions.</strong> PACE's indemnification obligations are conditioned on Distributor: (i) promptly notifying PACE of the claim; (ii) giving PACE sole control of defense and settlement; (iii) providing reasonable cooperation at PACE's expense; and (iv) not settling or making admissions without PACE's prior written consent.</p>
        <p><strong>IP Mitigation.</strong> For IP Claims, PACE may at its option: (i) procure for Distributor the right to continue selling the Product; (ii) modify the Product to be non-infringing; (iii) replace the Product with a non-infringing functional equivalent; or (iv) refund the price paid for the affected Product against its return. PACE has no obligation for IP Claims arising from: combination of the Product with non-PACE items; modification not authorized by PACE; or Distributor's continued use after notice of infringement.</p>
        <p><strong>By Distributor.</strong> Distributor shall defend, indemnify, and hold harmless PACE and its officers, directors, employees, and agents from and against any third-party claims, damages, fines, penalties, losses, and reasonable costs (including reasonable attorney fees) arising out of or relating to: (a) Distributor's negligence or willful misconduct; (b) Distributor's installation, service, modification, or repair of Products (other than valid warranty service performed in accordance with this Agreement); (c) Distributor's representations to End Customers beyond those authorized by PACE; (d) Distributor's breach of Trade Laws (Section 14), Anti-Corruption Laws (Section 15), or data-protection laws (Section 16); (e) Distributor's breach of this Agreement; or (f) Distributor's marketing claims, websites, or materials not approved by PACE.</p>
        <p>The mutual indemnification obligations in this Section are the sole and exclusive remedies of the parties for the matters addressed here and shall survive expiration or termination of this Agreement.</p>
    """),
    ("s21", "21", "Limitation of Liability", "Each party caps its non-indemnity, non-confidentiality, non-payment liability at the fees paid in the prior 12 months. No consequential damages.", """
        <p>EXCEPT FOR (i) THE INDEMNIFICATION OBLIGATIONS UNDER SECTION 20; (ii) BREACHES OF CONFIDENTIALITY UNDER SECTION 17; (iii) BREACHES OF TRADE LAWS (SECTION 14), ANTI-CORRUPTION LAWS (SECTION 15), OR INTELLECTUAL PROPERTY OBLIGATIONS (SECTION 18); (iv) DISTRIBUTOR'S PAYMENT OBLIGATIONS; OR (v) DAMAGES ARISING FROM A PARTY'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT, EACH PARTY'S TOTAL AGGREGATE LIABILITY TO THE OTHER ARISING OUT OF OR RELATING TO THIS AGREEMENT, REGARDLESS OF THE THEORY OF LIABILITY, SHALL NOT EXCEED THE GREATER OF (A) THE TOTAL AMOUNTS PAID OR PAYABLE BY DISTRIBUTOR TO PACE UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (B) U.S. $25,000.</p>
        <p>IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR LOST PROFITS, LOST REVENUE, LOSS OF USE, BUSINESS INTERRUPTION, LOSS OF DATA, COST OF SUBSTITUTE GOODS OR SERVICES, OR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
        <p>The limitations in this Section reflect an allocation of risk between the parties and are an essential element of the bargain. They apply notwithstanding any failure of essential purpose of any limited remedy.</p>
    """),
    ("s22", "22", "Term and Termination", "1-year auto-renewing. Either party can exit on 90 days without cause, 30 days for cause (with cure), or immediately for serious breaches.", """
        <p><strong>Term.</strong> This Agreement begins on the Effective Date and continues for an initial term of one (1) year. It automatically renews for successive one-year renewal terms unless either party provides written notice of non-renewal at least ninety (90) days before the end of the then-current term.</p>
        <p><strong>Termination for Convenience.</strong> Either party may terminate this Agreement without cause upon ninety (90) days' prior written notice.</p>
        <p><strong>Termination for Cause.</strong> Either party may terminate this Agreement for cause upon thirty (30) days' prior written notice if the other party materially breaches the Agreement and fails to cure within the thirty-day notice period. Failure to meet the Annual Minimum is addressed in Section 5.</p>
        <p><strong>Immediate Termination.</strong> Either party may terminate this Agreement immediately by written notice if the other party: (i) becomes insolvent, makes an assignment for the benefit of creditors, or has a bankruptcy or receivership proceeding commenced against it that is not dismissed within sixty (60) days; (ii) materially breaches its obligations under Sections 14 (Export Controls), 15 (Anti-Bribery), 17 (Confidentiality), or 18 (Intellectual Property); (iii) experiences a Change of Control as defined in Section 23 that the other party reasonably objects to; or (iv) engages in conduct that materially harms the other party's reputation or business.</p>
    """),
    ("s23", "23", "Effect of Termination", "Termination ends Distributor's rights to sell, use the Marks, and represent itself as a PACE distributor. PACE provides limited support for sell-through, spare parts, and customer transition.", """
        <p>Upon expiration or termination of this Agreement:</p>
        <ul>
            <li><strong>Sales rights cease.</strong> Distributor's appointment, the trademark license, and the right to represent itself as an authorized PACE distributor terminate immediately. Distributor shall promptly remove all references to PACE and the Marks from its website, signage, business cards, and marketing materials, and shall provide written confirmation of removal within thirty (30) days.</li>
            <li><strong>Open orders.</strong> PACE may, at its option, fulfill or cancel orders that have been accepted but not shipped as of the termination date. Payment terms remain unchanged for orders fulfilled after termination.</li>
            <li><strong>Distributor inventory.</strong> For a period of one hundred eighty (180) days following termination (the "Sell-Through Period"), Distributor may continue to sell its existing inventory of Products to End Customers in the Territory at then-prevailing list price or less, in the ordinary course, in compliance with all surviving obligations of this Agreement. Alternatively, at PACE's option, PACE may repurchase Distributor's then-current inventory of unused, unopened, current-version Products at Distributor's original net invoice cost less an inventory-condition adjustment, freight collect.</li>
            <li><strong>Spare parts and warranty support.</strong> PACE shall continue to make spare parts available for End Customers in the Territory at then-current pricing for at least two (2) years following termination, to enable Distributor to honor its existing warranty obligations to End Customers. PACE may, at its sole option, assume direct service of the Territory's installed base or appoint another partner; the parties shall cooperate in any such transition.</li>
            <li><strong>Customer information.</strong> Distributor shall provide PACE with a list of End Customers in the Territory (name, location, Products purchased) and reasonable cooperation in customer-transition activities. Receipt and use of such information by PACE is subject to applicable data-protection law.</li>
            <li><strong>Confidential Information.</strong> Each party shall return or destroy the other's Confidential Information in accordance with Section 17.</li>
            <li><strong>Payment.</strong> Any payment obligations accrued prior to termination remain due.</li>
        </ul>
        <p><strong>Survival.</strong> The following Sections survive expiration or termination: 1 (Definitions), 14 (Export Controls), 15 (Anti-Bribery), 16 (Data Protection), 17 (Confidentiality), 18 (Intellectual Property), 19 (Representations, as to accrued claims), 20 (Indemnification), 21 (Limitation of Liability), 23 (Effect of Termination), 25 (Dispute Resolution), 26 (Governing Law), and 27 (General).</p>
        <p>Except for the obligations expressly identified as surviving, neither party shall have any further obligation to the other arising out of this Agreement. Termination shall not constitute a release of either party from any obligation accrued prior to termination, nor a waiver of any remedy for breach.</p>
    """),
    ("s24", "24", "Change of Control", "If Distributor undergoes a change of control (acquired by, or merging with, another entity — especially a PACE competitor), PACE can terminate.", """
        <p>"Change of Control" means any transaction or series of transactions resulting in (i) a transfer of more than fifty percent (50%) of the voting equity interests of Distributor; (ii) the sale, lease, or other disposition of all or substantially all of Distributor's assets; or (iii) a merger, consolidation, or reorganization in which Distributor is not the surviving entity.</p>
        <p>Distributor shall give PACE written notice of any proposed or actual Change of Control as promptly as legally permitted, and in any event not later than fifteen (15) days after the closing of any Change of Control. If the acquirer or successor competes with PACE in the metallographic equipment or consumables markets, or otherwise would, in PACE's reasonable judgment, materially impair Distributor's ability or willingness to perform this Agreement, PACE may terminate this Agreement immediately upon written notice without further liability.</p>
    """),
    ("s25", "25", "Dispute Resolution", "Negotiation first (30 days); then binding arbitration in Tucson under AAA Commercial Rules. Class actions waived. Either side may go to court for emergency IP, confidentiality, or trade-compliance relief.", """
        <p><strong>(a) Negotiation.</strong> The parties shall attempt in good faith to resolve any dispute, controversy, or claim arising out of or relating to this Agreement (each, a "Dispute") through mutual negotiation between senior representatives of each party for a period of at least thirty (30) days before initiating arbitration.</p>
        <p><strong>(b) Binding Arbitration.</strong> Any Dispute not resolved by negotiation shall be resolved by final and binding arbitration administered by the American Arbitration Association ("AAA") under its <strong>Commercial Arbitration Rules</strong> in effect at the time the arbitration is commenced. The seat of arbitration shall be <strong>Pima County, Arizona, USA</strong>; the language of arbitration shall be <strong>English</strong>; the tribunal shall consist of one (1) arbitrator. The arbitrator's award shall be final and binding, and judgment on it may be entered in any court of competent jurisdiction.</p>
        <p><strong>(c) Class Action Waiver.</strong> ALL DISPUTES SHALL BE ARBITRATED ON AN INDIVIDUAL BASIS ONLY. THE PARTIES EXPRESSLY WAIVE ANY RIGHT TO PARTICIPATE AS A REPRESENTATIVE OR MEMBER OF ANY CLASS, COLLECTIVE, CONSOLIDATED, OR MASS ACTION, OR TO ACT AS A PRIVATE ATTORNEY GENERAL. The arbitrator may not consolidate Disputes involving more than one customer or partner of PACE.</p>
        <p><strong>(d) Jury Trial Waiver.</strong> If any Dispute proceeds in court rather than arbitration, EACH PARTY KNOWINGLY, VOLUNTARILY, AND IRREVOCABLY WAIVES ANY RIGHT TO A TRIAL BY JURY. Exclusive court venue is the state or federal courts located in Pima County, Arizona.</p>
        <p><strong>(e) Equitable Relief.</strong> Notwithstanding the foregoing, either party may seek temporary, preliminary, or permanent injunctive or other equitable relief in any court of competent jurisdiction to prevent or restrain a breach of (i) intellectual-property rights, (ii) confidentiality obligations, or (iii) export-controls or anti-bribery obligations under Sections 14 and 15, without first proceeding to arbitration and without posting a bond where permitted by law.</p>
        <p><strong>(f) Fees.</strong> Each party shall bear its own attorney fees and costs, except that the arbitrator may award reasonable attorney fees and costs to PACE in connection with any action to enforce Distributor's payment obligations or to remedy a breach of Sections 14, 15, 17, or 18.</p>
    """),
    ("s26", "26", "Governing Law", "Arizona law, no conflict-of-law rules. The UN Convention on Contracts for the International Sale of Goods does not apply.", """
        <p>This Agreement is governed by and construed in accordance with the laws of the State of Arizona, U.S.A., without regard to its conflict-of-law principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.</p>
    """),
    ("s27", "27", "General Provisions", "Standard wrap-up: notices, assignment, no third-party beneficiaries, severability, language, entire agreement, force majeure.", """
        <p><strong>(a) Entire Agreement.</strong> This Agreement (including the cover page and all Exhibits) and any signed written amendments constitute the entire agreement between the parties regarding its subject matter, and supersede all prior or contemporaneous agreements, negotiations, representations, and proposals — written or oral — relating to that subject matter.</p>
        <p><strong>(b) Amendments.</strong> No amendment is effective unless in writing and signed by duly authorized representatives of both parties. An exchange of e-mails alone does not constitute a writing for this purpose.</p>
        <p><strong>(c) Waiver.</strong> A waiver of any breach or default is not a waiver of any subsequent breach or default. Waivers must be in writing.</p>
        <p><strong>(d) Assignment.</strong> Distributor may not assign or transfer this Agreement or any rights or obligations under it, by operation of law or otherwise, without PACE's prior written consent. Any attempted assignment in violation of this Section is void. PACE may assign this Agreement in connection with a merger, acquisition, reorganization, financing, or sale of all or substantially all of its assets.</p>
        <p><strong>(e) Notices.</strong> All legal notices must be in writing and delivered: (i) to PACE, at 3601 E. 34th Street, Tucson, Arizona 85713, USA, Attn: General Counsel, with a copy to <a href="mailto:pace@metallographic.com">pace@metallographic.com</a>; and (ii) to Distributor, at the address shown on the cover page or otherwise notified in writing. Notice is deemed given on personal delivery, on receipt of a delivery confirmation from an internationally recognized courier, or three (3) business days after dispatch by certified mail or e-mail to the addresses above.</p>
        <p><strong>(f) Force Majeure.</strong> Neither party is liable for failure or delay caused by circumstances beyond its reasonable control, including acts of God, war, terrorism, pandemic, epidemic, government action, embargo, supplier delays, labor disputes, cyberattack, or utility outages. The affected party shall promptly notify the other and resume performance as soon as practicable. Either party may terminate the affected portion of this Agreement, without further liability, if the force-majeure event continues for more than ninety (90) days.</p>
        <p><strong>(g) Relationship of Parties.</strong> Distributor is an independent contractor. Nothing in this Agreement creates an agency, partnership, joint venture, employment, or franchise relationship. Neither party has authority to bind the other or to make representations on the other's behalf.</p>
        <p><strong>(h) No Third-Party Beneficiaries.</strong> This Agreement confers no rights or remedies on any person or entity other than the parties and their permitted successors and assigns.</p>
        <p><strong>(i) Severability.</strong> If any provision of this Agreement is found by a court or arbitrator to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force, and the invalid provision shall be modified to the minimum extent necessary to make it valid while preserving the original intent of the parties.</p>
        <p><strong>(j) Language.</strong> This Agreement is executed in English. Any translation is for convenience only; the English version controls.</p>
        <p><strong>(k) Counterparts.</strong> This Agreement may be executed in counterparts (including by electronic signature), each of which is an original and all of which together constitute one instrument.</p>
    """),
    ("s28", "28", "Signatures and Exhibits", "Where the parties sign and the list of attached exhibits (Reserved Accounts, Price List, Brand Guidelines, Warranty Reimbursement).", """
        <p><strong>Exhibits.</strong> The following Exhibits are incorporated into and form part of this Agreement:</p>
        <ul>
            <li><strong>Exhibit A</strong> — Reserved Accounts</li>
            <li><strong>Exhibit B</strong> — Price List and Discount Schedule</li>
            <li><strong>Exhibit C</strong> — Trademark and Brand Usage Guidelines</li>
            <li><strong>Exhibit D</strong> — Warranty Reimbursement Schedule</li>
        </ul>
        <p><strong>Execution.</strong> By signing below, each party acknowledges that it has read this Agreement, understands it, and agrees to be bound by its terms.</p>
        <p class="legal-sig-block">
            <strong>PACE Technologies Corporation</strong><br>
            Signature: ___________________________________<br>
            Printed Name: _______________________________<br>
            Title: _______________________________________<br>
            Date: _______________________________________
        </p>
        <p class="legal-sig-block">
            <strong>[DISTRIBUTOR LEGAL NAME]</strong><br>
            Signature: ___________________________________<br>
            Printed Name: _______________________________<br>
            Title: _______________________________________<br>
            Date: _______________________________________
        </p>
    """),
]

# ---------------------------------------------------------------------------

RESELLER_SECTIONS = [
    ("s1", "01", "Definitions", "Key terms. The main ones: 'Products' (PACE equipment and consumables) and 'Territory' (the area named on the cover page).", """
        <p>Capitalized terms not defined here have the meanings given on the cover page or in PACE's <a href="/terms.html">Standard Terms and Conditions of Sale</a> ("PACE Standard Terms").</p>
        <ul>
            <li><strong>"Agreement"</strong> means this Reseller Agreement, including any Exhibits and executed amendments.</li>
            <li><strong>"Effective Date"</strong> means the date stated on the cover page.</li>
            <li><strong>"End Customer"</strong> means the ultimate purchaser of a Product, other than Reseller.</li>
            <li><strong>"List Price"</strong> means PACE's then-current published list price in U.S. dollars.</li>
            <li><strong>"Marks"</strong> means the PACE trademarks, service marks, logos, and trade names made available to Reseller.</li>
            <li><strong>"PACE"</strong> means PACE Technologies Corporation, headquartered at 3601 E. 34th Street, Tucson, Arizona 85713, USA.</li>
            <li><strong>"Products"</strong> means the metallographic equipment, consumables, and related items offered by PACE for resale.</li>
            <li><strong>"Reseller"</strong> means the entity named on the cover page as the appointed reseller.</li>
            <li><strong>"Territory"</strong> means the geographic area identified on the cover page (which may be worldwide, regional, or country-specific).</li>
            <li><strong>"Trade Laws"</strong> has the meaning given in Section 12.</li>
        </ul>
    """),
    ("s2", "02", "Appointment as Reseller", "Reseller is a non-exclusive authorized reseller. No exclusivity, no territory protection, no obligation by PACE to support Reseller against other channels.", """
        <p>PACE appoints Reseller, and Reseller accepts appointment, as a <strong>non-exclusive</strong> authorized reseller of the Products in the Territory during the Term. Reseller may market and resell Products to End Customers and may use the Marks subject to Section 7.</p>
        <p>The appointment is <strong>non-exclusive</strong>. PACE retains the right to: (i) appoint additional resellers, distributors, or other channel partners in or outside the Territory; (ii) sell Products directly to End Customers anywhere, including through PACE's website or sales personnel; (iii) modify, add to, or discontinue any Product; and (iv) accept or reject any order in its sole discretion.</p>
    """),
    ("s3", "03", "Products and Pricing", "Reseller gets 10% off List Price. All prices are USD. PACE can change prices with 60 days' notice.", """
        <p><strong>Discount.</strong> Reseller is entitled to a discount of <strong>ten percent (10%) off List Price</strong> on qualifying Products. Certain Products may be ineligible for the discount or eligible for a different discount, as indicated by PACE in writing.</p>
        <p><strong>Currency.</strong> All prices are in <strong>U.S. dollars (USD)</strong>.</p>
        <p><strong>Price Changes.</strong> PACE may change List Prices on at least <strong>sixty (60) days' written notice</strong>. Orders accepted by PACE before the effective date of an increase will be honored at the prior price.</p>
        <p><strong>Resale Pricing.</strong> Reseller is free to set its own resale prices to End Customers, subject to PACE's right to publish suggested or minimum advertised prices ("MAP") and to Section 8 (Channel Conduct). Reseller shall not represent any resale price as having been set or required by PACE.</p>
        <p><strong>Taxes.</strong> All prices exclude sales, use, value-added, excise, customs, withholding, and similar taxes, which are Reseller's responsibility unless Reseller furnishes a valid exemption certificate.</p>
    """),
    ("s4", "04", "Annual Purchase Commitment", "Reseller targets at least $10,000 USD per year in net purchases. Falling short gives PACE the option to terminate or convert tier.", """
        <p>Reseller targets net invoiced purchases from PACE of at least <strong>ten thousand U.S. dollars ($10,000)</strong> in each calendar year of the Term (the "Annual Minimum"). The Annual Minimum is prorated for partial years.</p>
        <p>If Reseller fails to meet the Annual Minimum in any calendar year, PACE may, at its sole option: (i) continue this Agreement on its current terms; (ii) reduce or modify Reseller's discount for the following calendar year; (iii) remove specific Products from Reseller's eligibility; or (iv) terminate this Agreement on thirty (30) days' written notice.</p>
    """),
    ("s5", "05", "Orders, Payment, and Delivery", "Reseller places POs subject to PACE's Standard Terms. Year 1 is pre-pay, Year 2+ is Net-30 subject to credit approval.", """
        <p><strong>Standard Terms Apply.</strong> Every order placed by Reseller is governed by PACE's then-current <a href="/terms.html">Standard Terms and Conditions of Sale</a>, in addition to this Agreement. In the event of a conflict, this Agreement controls as to matters expressly addressed here; the Standard Terms control as to all other matters. PACE rejects any conflicting terms in Reseller's purchase orders.</p>
        <p><strong>Payment.</strong> For the first twelve (12) months of the Term, Reseller shall make payment in advance ("PIA") for all orders. Thereafter, subject to PACE's credit approval, Net-30 terms may be extended. Late payments accrue interest at the lesser of 1.5% per month or the maximum rate permitted by law.</p>
        <p><strong>Delivery.</strong> Unless otherwise agreed, delivery is <strong>FCA PACE's facility, Tucson, Arizona</strong> (Incoterms 2020). Title and risk of loss pass to Reseller on delivery to the first carrier. Reseller is responsible for freight, insurance, and import/export charges thereafter.</p>
    """),
    ("s6", "06", "Marketing", "Reseller markets the Products through commercially reasonable efforts.", """
        <p>Reseller shall use commercially reasonable efforts to promote and sell the Products in the Territory, including by maintaining a professional online or physical presence that identifies Reseller as an authorized PACE reseller and presents the Products accurately.</p>
        <p>Reseller may participate in PACE-sponsored marketing programs as they may be offered from time to time. Co-marketing terms, if any, will be set out in a separate writing.</p>
    """),
    ("s7", "07", "Trademark License", "Reseller can use PACE marks to promote PACE Products. The license is non-exclusive and tied to the Agreement.", """
        <p>PACE grants Reseller a non-exclusive, non-transferable, non-sublicensable, royalty-free license, during the Term and within the Territory, to use the Marks solely to advertise and resell the Products as an authorized PACE reseller.</p>
        <p>Reseller shall use the Marks only in accordance with PACE's brand guidelines (provided on request). Reseller shall not: (i) modify the Marks; (ii) combine them with other marks in a manner suggesting a co-brand without PACE's prior written consent; (iii) register or attempt to register any of the Marks or confusingly similar marks; or (iv) challenge the validity of any PACE intellectual property.</p>
        <p>The Marks remain the sole property of PACE. The license terminates automatically on expiration or termination of this Agreement, and Reseller shall cease use of the Marks within thirty (30) days.</p>
    """),
    ("s8", "08", "Channel Conduct and Online Sales", "Reseller may sell via its own branded website. No third-party marketplaces (Amazon, eBay, AliExpress) without written consent.", """
        <p>Reseller may sell Products through its own staffed offices and its own e-commerce website that prominently identifies Reseller as an authorized PACE reseller.</p>
        <p><strong>Online Marketplaces.</strong> Reseller shall not list or sell Products on any third-party online marketplace — including Amazon, eBay, AliExpress, Alibaba, Mercado Libre, Taobao, or any equivalent — without PACE's prior written consent. PACE may grant or withhold consent in its sole discretion. Breach is grounds for immediate termination under Section 19.</p>
        <p><strong>No Diversion.</strong> Reseller shall not knowingly export, re-export, or transship Products outside the Territory, nor sell to any customer Reseller knows or reasonably should know will do so, except as permitted under applicable competition law.</p>
        <p><strong>No Modification.</strong> Reseller shall not repackage, relabel, or modify Products in a manner that obscures PACE's brand or removes hazard or safety information.</p>
    """),
    ("s9", "09", "Warranty and Service Routing", "Reseller does not perform warranty service. Reseller refers warranty issues to PACE. Reseller may perform fee-based service if separately authorized.", """
        <p><strong>No Warranty Service Obligation.</strong> Unlike a distributor, Reseller is not required to perform warranty service. Reseller shall refer all warranty claims, service requests, and technical-support inquiries from End Customers to PACE in a timely manner.</p>
        <p><strong>Optional Service Authorization.</strong> Reseller may apply to be authorized to perform fee-based or warranty service for Products, subject to PACE's training and certification requirements. Any such authorization will be set out in a separate writing and may include reimbursement terms.</p>
        <p><strong>End-Customer Terms.</strong> Reseller shall sell Products to End Customers only on terms substantially equivalent to PACE's <a href="/terms.html">Standard Terms and Conditions of Sale</a>, including the limited warranty, limitation of liability, indemnification, dispute-resolution, and hazardous-materials provisions. Reseller shall not extend any warranty broader than PACE's, nor make any representation about Products beyond PACE's published materials. Reseller shall make PACE's Safety Data Sheets and product documentation available to End Customers where applicable.</p>
    """),
    ("s10", "10", "Insurance", "Reseller maintains commercially reasonable insurance customary for its size, industry, and jurisdiction. PACE may request a Certificate of Insurance.", """
        <p>Reseller shall maintain at its own expense throughout the Term commercially reasonable insurance customary for businesses of its size and industry in its jurisdiction, including:</p>
        <ul>
            <li>Commercial General Liability coverage appropriate to Reseller's activities under this Agreement;</li>
            <li>Workers' Compensation as required by applicable law; and</li>
            <li>Commercial Automobile Liability covering owned, hired, and non-owned vehicles, if Reseller's personnel transport Products or visit End-Customer sites.</li>
        </ul>
        <p>Upon PACE's reasonable request, Reseller shall provide a Certificate of Insurance.</p>
    """),
    ("s11", "11", "Confidentiality", "Both parties protect each other's non-public information for the Term and 3 years after.", """
        <p>"Confidential Information" means non-public information disclosed by one party to the other in connection with this Agreement that is identified as confidential or that a reasonable person would understand to be confidential, including pricing, customer lists, business plans, technical information, software, and financial information.</p>
        <p>The Receiving Party shall: (i) use Confidential Information solely for purposes of this Agreement; (ii) protect it with at least the same care it uses for its own information of similar sensitivity and in no event less than reasonable care; (iii) limit disclosure to its personnel with a need to know who are bound by confidentiality; and (iv) not disclose it to third parties without consent.</p>
        <p>Exceptions apply for information that is publicly known, rightfully known prior to receipt, independently developed, or required to be disclosed by law.</p>
        <p>The obligations apply during the Term and for <strong>three (3) years</strong> after termination. Trade secrets remain protected as long as they remain trade secrets. On termination, each party shall return or destroy the other's Confidential Information.</p>
    """),
    ("s12", "12", "Export Controls and Trade Compliance", "Reseller complies with US export law, sanctions, anti-boycott rules, and end-use restrictions. Restricted-party screening is required.", """
        <p>The Products and related technology may be subject to the U.S. Export Administration Regulations (EAR), the International Traffic in Arms Regulations (ITAR) to the extent applicable, OFAC sanctions, and the import/export laws of other jurisdictions ("Trade Laws"). Reseller represents, warrants, and covenants that:</p>
        <ul>
            <li>It is not, and no owner, director, officer, or employee is, a restricted or sanctioned party under any Trade Laws;</li>
            <li>It will not, directly or indirectly, export, re-export, transfer, or divert any Product to any country, region, entity, or individual subject to U.S. embargo or comprehensive sanctions (including, as of the Effective Date, Cuba, Iran, North Korea, Syria, and the Crimea, Donetsk, and Luhansk regions of Ukraine);</li>
            <li>It will conduct restricted-party screening of each prospective End Customer against current government lists prior to delivery and maintain records of such screening for at least five (5) years;</li>
            <li>It will not use, sell, or permit use of the Products for nuclear weapons, chemical or biological weapons, missile, or unauthorized military end uses;</li>
            <li>It will comply with applicable anti-boycott laws and promptly report boycott requests to PACE; and</li>
            <li>It will obtain any required export, re-export, or import authorizations at its own cost.</li>
        </ul>
        <p>Reseller shall indemnify, defend, and hold harmless PACE from and against any claims, fines, or losses arising from Reseller's breach of Trade Laws. PACE may refuse any order it believes in good faith may violate Trade Laws, without liability.</p>
    """),
    ("s13", "13", "Anti-Bribery and Anti-Corruption", "Reseller complies with the FCPA, UK Bribery Act, and local laws. No improper payments.", """
        <p>Reseller shall comply with the U.S. Foreign Corrupt Practices Act, the U.K. Bribery Act 2010, and all other applicable anti-bribery and anti-corruption laws. Reseller shall not, directly or indirectly, offer, promise, or give anything of value to any government official or any other person to obtain or retain business or secure an improper advantage.</p>
        <p>Reseller shall promptly notify PACE of any actual or suspected breach. Material breach is grounds for immediate termination under Section 19.</p>
    """),
    ("s14", "14", "Data Protection", "Each party complies with applicable privacy laws when handling personal data of End Customers and their staff.", """
        <p>Each party shall comply with applicable data-protection laws when handling personal data of End Customers and their personnel, including the EU GDPR, the UK GDPR, the California Consumer Privacy Act (as amended), and other U.S. state and foreign privacy laws. PACE's <a href="/privacy.html">Privacy Policy</a> governs PACE's data practices. The parties shall execute a data-processing addendum upon either party's request where required by applicable law.</p>
    """),
    ("s15", "15", "Intellectual Property", "PACE owns all IP in the Products and Marks. Reseller gets no rights other than what's expressly licensed.", """
        <p>All intellectual property rights in the Products, Marks, and PACE's technical documentation remain PACE's sole and exclusive property. Reseller acquires no rights except those expressly granted in this Agreement.</p>
        <p>Reseller shall not: (i) reverse engineer, decompile, or disassemble Products or any embedded software, except to the extent expressly permitted by applicable law notwithstanding this restriction; (ii) copy or create derivative works; (iii) remove proprietary notices; (iv) register or attempt to register any of the Marks or confusingly similar marks; or (v) challenge the validity of any PACE intellectual property. Any feedback Reseller provides to PACE is non-confidential and PACE may freely use it.</p>
    """),
    ("s16", "16", "Representations and Warranties", "Standard reps from each party — authority, organization, no sanctioned-party status. All implied warranties from PACE are disclaimed except as expressly stated.", """
        <p>Each party represents and warrants that (i) it is duly organized and in good standing; (ii) it has authority to enter and perform this Agreement; (iii) performance does not breach any other agreement or law; (iv) it is not a restricted or sanctioned party; and (v) it will perform in compliance with applicable laws. Reseller additionally represents that it will not make any representation or warranty about the Products beyond what PACE has authorized in writing.</p>
        <p>EXCEPT AS EXPRESSLY STATED HERE OR IN PACE'S STANDARD TERMS, PACE MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
    """),
    ("s17", "17", "Indemnification", "PACE defends Reseller against IP infringement and product-defect claims relating to the Products. Reseller defends PACE against claims arising from Reseller's own conduct.", """
        <p><strong>By PACE.</strong> Subject to the limits in Section 18, PACE shall defend, indemnify, and hold harmless Reseller and its officers, directors, employees, and agents from and against third-party claims, and pay damages or settlement amounts finally awarded by a court of competent jurisdiction or agreed in a PACE-approved settlement, to the extent such claims arise out of: (i) an allegation that a Product, as supplied by PACE and used in accordance with PACE's documentation, infringes a third party's patent, copyright, trademark, or trade-secret rights; or (ii) death, bodily injury, or tangible property damage caused by a defect in a Product that existed when the Product left PACE's facility and was not caused or contributed to by Reseller's misuse, modification, or failure to follow PACE's documentation.</p>
        <p>PACE's indemnification is conditioned on Reseller giving prompt notice, providing PACE sole control of defense and settlement, and not making admissions or settling without PACE's consent. For IP claims, PACE may at its option procure rights, modify, replace, or refund the affected Product.</p>
        <p><strong>By Reseller.</strong> Reseller shall defend, indemnify, and hold harmless PACE and its officers, directors, employees, and agents from any third-party claims, damages, fines, losses, and reasonable costs (including attorney fees) arising from: (a) Reseller's negligence or willful misconduct; (b) Reseller's marketing or representations to End Customers beyond those authorized by PACE; (c) Reseller's breach of Trade Laws (Section 12), Anti-Corruption Laws (Section 13), or data-protection laws (Section 14); (d) Reseller's breach of this Agreement; or (e) Reseller's modification, alteration, or repair of Products outside its express authorization.</p>
        <p>The mutual indemnification obligations are the sole and exclusive remedies for the matters addressed and survive termination.</p>
    """),
    ("s18", "18", "Limitation of Liability", "Each side's non-indemnity, non-confidentiality, non-payment liability is capped at the greater of fees paid in 12 months or $10,000.", """
        <p>EXCEPT FOR (i) INDEMNIFICATION OBLIGATIONS UNDER SECTION 17; (ii) BREACHES OF CONFIDENTIALITY UNDER SECTION 11; (iii) BREACHES OF TRADE LAWS (SECTION 12), ANTI-CORRUPTION LAWS (SECTION 13), OR INTELLECTUAL PROPERTY OBLIGATIONS (SECTION 15); (iv) RESELLER'S PAYMENT OBLIGATIONS; OR (v) DAMAGES FROM GROSS NEGLIGENCE OR WILLFUL MISCONDUCT, EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT, REGARDLESS OF THEORY, SHALL NOT EXCEED THE GREATER OF (A) AMOUNTS PAID OR PAYABLE BY RESELLER TO PACE UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS PRECEDING THE EVENT, OR (B) U.S. $10,000.</p>
        <p>IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR LOST PROFITS, LOST REVENUE, LOSS OF USE, BUSINESS INTERRUPTION, LOSS OF DATA, COST OF SUBSTITUTE GOODS OR SERVICES, OR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, EVEN IF ADVISED OF THE POSSIBILITY.</p>
        <p>These limitations are an essential element of the bargain and apply notwithstanding any failure of essential purpose of a limited remedy.</p>
    """),
    ("s19", "19", "Term and Termination", "1-year auto-renewing. 60 days' notice for convenience; 30 days for cause (with cure). Immediate termination for serious breaches.", """
        <p><strong>Term.</strong> This Agreement begins on the Effective Date and continues for an initial term of one (1) year, renewing automatically for successive one-year terms unless either party gives written non-renewal notice at least sixty (60) days before the end of the then-current term.</p>
        <p><strong>Termination for Convenience.</strong> Either party may terminate without cause on sixty (60) days' prior written notice.</p>
        <p><strong>Termination for Cause.</strong> Either party may terminate for cause on thirty (30) days' written notice if the other party materially breaches and fails to cure within the notice period.</p>
        <p><strong>Immediate Termination.</strong> Either party may terminate immediately by written notice if the other (i) becomes insolvent or has an insolvency proceeding commenced that is not dismissed within sixty (60) days; (ii) materially breaches Section 12 (Export Controls), 13 (Anti-Bribery), 11 (Confidentiality), or 15 (Intellectual Property); or (iii) engages in conduct that materially harms the other party's reputation or business.</p>
    """),
    ("s20", "20", "Effect of Termination", "Sales rights and trademark license end. Reseller has 90 days to sell through existing inventory. Surviving sections continue.", """
        <p>Upon expiration or termination:</p>
        <ul>
            <li><strong>Sales rights cease.</strong> Reseller's appointment, the trademark license, and the right to identify as an authorized PACE reseller terminate. Reseller shall remove all references to PACE and the Marks from its website and materials within thirty (30) days.</li>
            <li><strong>Open orders.</strong> PACE may, at its option, fulfill or cancel orders accepted but not yet shipped.</li>
            <li><strong>Inventory.</strong> For ninety (90) days following termination (the "Sell-Through Period"), Reseller may continue to sell its existing inventory of Products in compliance with all surviving obligations. PACE may, at its option, repurchase Reseller's then-current inventory of unused, unopened, current-version Products at Reseller's original net invoice cost less an inventory-condition adjustment, freight collect.</li>
            <li><strong>Confidential Information.</strong> Each party shall return or destroy the other's Confidential Information.</li>
            <li><strong>Payment.</strong> Payment obligations accrued prior to termination remain due.</li>
        </ul>
        <p><strong>Survival.</strong> Sections 1 (Definitions), 11 (Confidentiality), 12 (Export Controls), 13 (Anti-Bribery), 14 (Data Protection), 15 (Intellectual Property), 16 (Representations, as to accrued claims), 17 (Indemnification), 18 (Limitation of Liability), 20 (Effect of Termination), 21 (Dispute Resolution), 22 (Governing Law), and 23 (General Provisions) survive.</p>
    """),
    ("s21", "21", "Dispute Resolution", "Negotiation first (30 days); then binding arbitration in Tucson under AAA Commercial Rules. Class actions waived. Either side may go to court for emergency IP, confidentiality, or trade-compliance relief.", """
        <p><strong>(a) Negotiation.</strong> The parties shall first attempt to resolve any dispute through good-faith negotiation between senior representatives for at least thirty (30) days before initiating arbitration.</p>
        <p><strong>(b) Arbitration.</strong> Any unresolved dispute shall be resolved by final and binding arbitration administered by the American Arbitration Association under its <strong>Commercial Arbitration Rules</strong>, before a single arbitrator, with seat in <strong>Pima County, Arizona</strong>, conducted in <strong>English</strong>.</p>
        <p><strong>(c) Class Action Waiver.</strong> ALL DISPUTES SHALL BE ARBITRATED INDIVIDUALLY. THE PARTIES EXPRESSLY WAIVE ANY RIGHT TO PARTICIPATE AS A REPRESENTATIVE OR MEMBER OF ANY CLASS, COLLECTIVE, CONSOLIDATED, OR MASS ACTION.</p>
        <p><strong>(d) Jury Trial Waiver.</strong> If any dispute proceeds in court rather than arbitration, EACH PARTY WAIVES TRIAL BY JURY. Exclusive venue is the state or federal courts in Pima County, Arizona.</p>
        <p><strong>(e) Equitable Relief.</strong> Notwithstanding the foregoing, either party may seek injunctive or equitable relief in court to prevent or restrain a breach of intellectual-property rights, confidentiality, or Trade Laws / Anti-Corruption Laws.</p>
        <p><strong>(f) Fees.</strong> Each party bears its own attorney fees, except the arbitrator may award fees and costs to PACE in collection or breach-of-Section-11/12/13/15 actions.</p>
    """),
    ("s22", "22", "Governing Law", "Arizona law. UN Convention on Contracts for the International Sale of Goods does not apply.", """
        <p>This Agreement is governed by Arizona law (without regard to conflicts of law). The United Nations Convention on Contracts for the International Sale of Goods does not apply.</p>
    """),
    ("s23", "23", "General Provisions", "Standard wrap-up clauses: entire agreement, amendments, assignment, notices, force majeure, independence, severability, language.", """
        <p><strong>(a) Entire Agreement.</strong> This Agreement and any signed amendments constitute the entire agreement and supersede all prior or contemporaneous agreements on its subject matter.</p>
        <p><strong>(b) Amendments.</strong> No amendment is effective unless in writing and signed by both parties.</p>
        <p><strong>(c) Waiver.</strong> A waiver of any breach is not a waiver of any subsequent breach.</p>
        <p><strong>(d) Assignment.</strong> Reseller may not assign this Agreement without PACE's prior written consent; any attempted assignment is void. PACE may assign in connection with a merger, acquisition, reorganization, or sale of substantially all assets.</p>
        <p><strong>(e) Notices.</strong> Notices to PACE: 3601 E. 34th Street, Tucson, Arizona 85713, USA, Attn: General Counsel, with copy to <a href="mailto:pace@metallographic.com">pace@metallographic.com</a>. Notices to Reseller: the address on the cover page or as otherwise notified.</p>
        <p><strong>(f) Force Majeure.</strong> Neither party is liable for delays caused by circumstances beyond reasonable control (acts of God, war, pandemic, government action, etc.). Either party may terminate the affected portion if the event continues more than ninety (90) days.</p>
        <p><strong>(g) Relationship.</strong> Reseller is an independent contractor. Nothing creates an agency, partnership, joint venture, or franchise.</p>
        <p><strong>(h) No Third-Party Beneficiaries.</strong> No third parties have rights under this Agreement.</p>
        <p><strong>(i) Severability.</strong> An invalid provision shall be modified to the minimum extent needed to be enforceable; remaining provisions stay in force.</p>
        <p><strong>(j) Language.</strong> Executed in English. Any translation is for convenience only; the English version controls.</p>
        <p><strong>(k) Counterparts.</strong> May be executed in counterparts (including by electronic signature).</p>
        <p class="legal-sig-block">
            <strong>PACE Technologies Corporation</strong><br>
            Signature: ___________________________________<br>
            Printed Name: _______________________________<br>
            Title: _______________________________________<br>
            Date: _______________________________________
        </p>
        <p class="legal-sig-block">
            <strong>[RESELLER LEGAL NAME]</strong><br>
            Signature: ___________________________________<br>
            Printed Name: _______________________________<br>
            Title: _______________________________________<br>
            Date: _______________________________________
        </p>
    """),
]


# ---------------------------------------------------------------------------
# Page builder
# ---------------------------------------------------------------------------

DOWNLOAD_SVG = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round">'
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>'
    '<polyline points="7 10 12 15 17 10"/>'
    '<line x1="12" y1="15" x2="12" y2="3"/></svg>'
)


def render_meta(role: str, doc_basename: str) -> str:
    intro_distributor = (
        "This is PACE Technologies' template Distributor Agreement, the basis on which we appoint "
        "authorized distributors of our metallographic equipment and consumables. Final terms are "
        "negotiated and executed in writing to fit each partner's territory, product mix, and "
        "commercial circumstances."
    )
    intro_reseller = (
        "This is PACE Technologies' template Reseller Agreement, the basis on which we appoint "
        "authorized resellers of our metallographic equipment and consumables. Final terms are "
        "negotiated and executed in writing to fit each partner's territory and circumstances."
    )
    intro = intro_distributor if role == "distributor" else intro_reseller

    return f"""        <div class="legal-meta">
            <div class="legal-meta-row">
                <span class="legal-effective">Effective <strong>May 13, 2026</strong></span>
                <span class="legal-divider">·</span>
                <span class="legal-version">Template Version 2.0</span>
            </div>
            <p class="legal-intro">
                {intro}
            </p>
            <div class="legal-template-banner">
                <strong>Template document.</strong> The version below is for review. The final executed agreement is tailored to your situation. Authorized partners receive a signing copy from their PACE contact. For inquiries, email <a href="mailto:pace@metallographic.com?subject={role.title()}%20Agreement%20Inquiry">pace@metallographic.com</a>.
            </div>
        </div>"""


def render_toc(sections) -> str:
    items = []
    for sid, num, title, _summary, _body in sections:
        # Strip "Agreement" / "Provisions" suffixes for TOC brevity
        short = title
        items.append(
            f'                    <li><a href="#{sid}"><span class="legal-toc-num">{num}</span> {short}</a></li>'
        )
    return (
        '            <aside class="legal-toc" aria-label="Table of contents">\n'
        '                <p class="legal-toc-label">Contents</p>\n'
        '                <ol class="legal-toc-list">\n'
        + "\n".join(items)
        + "\n                </ol>\n            </aside>"
    )


def render_sections(sections) -> str:
    blocks = []
    for sid, num, title, summary, body in sections:
        # Body has leading whitespace; dedent the visible whitespace
        body_clean = body.strip("\n").rstrip()
        # Re-indent body lines to match the article structure
        body_lines = [line for line in body_clean.split("\n")]
        # The body content is at indent level 8 from Python; re-indent to 20 spaces (5 levels of 4)
        re_indented = []
        for line in body_lines:
            stripped = line.lstrip()
            if not stripped:
                re_indented.append("")
            else:
                re_indented.append("                    " + stripped)
        body_html = "\n".join(re_indented)
        block = (
            f'                <section class="legal-section" id="{sid}">\n'
            f'                    <header class="legal-section-head">\n'
            f'                        <span class="legal-section-num">{num}</span>\n'
            f'                        <h3 class="legal-section-title">{title}</h3>\n'
            f"                    </header>\n"
            f'                    <aside class="plain-english">\n'
            f'                        <span class="plain-english-label">Summary</span>\n'
            f"                        <p>{summary}</p>\n"
            f"                    </aside>\n"
            f"{body_html}\n"
            f"                </section>"
        )
        blocks.append(block)
    return "\n\n".join(blocks)


def build_legal_block(role: str, doc_basename: str, sections) -> str:
    meta = render_meta(role, doc_basename)
    toc = render_toc(sections)
    sections_html = render_sections(sections)
    return (
        meta
        + "\n\n        "
        + '<div class="legal-layout">\n'
        + toc
        + "\n\n"
        + '            <article class="legal-content">\n'
        + sections_html
        + "\n            </article>\n        </div>\n\n"
        + "        <script>\n"
        + "            (function () {\n"
        + "                const links = document.querySelectorAll('.legal-toc-list a');\n"
        + "                const sections = document.querySelectorAll('.legal-section');\n"
        + "                if (!links.length || !sections.length) return;\n"
        + "                const map = new Map();\n"
        + "                links.forEach(l => map.set(l.getAttribute('href').slice(1), l));\n"
        + "                const io = new IntersectionObserver(entries => {\n"
        + "                    entries.forEach(e => {\n"
        + "                        const link = map.get(e.target.id);\n"
        + "                        if (link && e.isIntersecting) {\n"
        + "                            links.forEach(l => l.classList.remove('is-active'));\n"
        + "                            link.classList.add('is-active');\n"
        + "                        }\n"
        + "                    });\n"
        + "                }, { rootMargin: '-15% 0px -70% 0px' });\n"
        + "                sections.forEach(s => io.observe(s));\n"
        + "            })();\n"
        + "        </script>"
    )


def splice(file_path: Path, marker_start: str, role: str, doc_basename: str, sections):
    html = file_path.read_text(encoding="utf-8")
    # First run uses a unique marker; subsequent runs find the generic <div class="legal-meta">
    if marker_start not in html:
        marker_start = '<div class="legal-meta">'
        if marker_start not in html:
            raise ValueError(f"start marker not found in {file_path.name}")

    start_idx = html.find(marker_start)
    # Find the closing </script>\n    </div>  (script close + legal close)
    end_marker = "</script>\n    </div>"
    end_search = html.find(end_marker, start_idx)
    if end_search == -1:
        raise ValueError(f"end marker not found in {file_path.name}")

    # Keep the final '</div>' (closes 'legal'); strip and replace through '</script>'
    end_idx = end_search + len("</script>")

    new_block = build_legal_block(role, doc_basename, sections)
    new_html = html[:start_idx] + new_block + html[end_idx:]
    file_path.write_text(new_html, encoding="utf-8")
    print(f"  wrote {file_path.name} ({len(new_html):,} bytes)")


def main():
    print("Building Distributor Agreement…")
    splice(
        ROOT / "distributor-agreement.html",
        '<div class="legal-meta-DISTRIBUTOR">',
        role="distributor",
        doc_basename="pace-distributor-agreement",
        sections=DISTRIBUTOR_SECTIONS,
    )

    print("Building Reseller Agreement…")
    splice(
        ROOT / "reseller-agreement.html",
        '<div class="legal-meta">',
        role="reseller",
        doc_basename="pace-reseller-agreement",
        sections=RESELLER_SECTIONS,
    )

    print("Done.")


if __name__ == "__main__":
    main()
