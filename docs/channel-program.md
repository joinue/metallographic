# PACE Domestic Channel Program

Reference doc for the three-tier US channel partner program. Locked 2026-05-19.

The international Distributor Agreement (25% off list, $25K annual minimum, service-authorized) is **out of scope** for this program and remains as it stands today, with one small edit to scope its territory to outside the United States.

---

## Strategic intent

PACE serves the United States directly. We are our own full-service domestic distributor: sales, service, e-commerce, training, technical support, and consumables fulfillment all live inside PACE. The domestic channel exists for one purpose only — **reach accounts PACE cannot reach directly**. Domestic partners do not hold inventory, do not perform warranty service, and do not own ongoing consumables relationships, because they cannot add value on technical product advice. PACE owns everything after the initial equipment sale.

All channel discounts are capped at **15% off list**. This is a hard rule from Don and applies to every domestic partner agreement.

---

## The three tiers

### 1. Authorized Reseller

For transactional resellers (lab-supply distributors, MRO catalogs, online resellers) who carry PACE on their price list and sell from catalog.

| Field | Value |
|---|---|
| Discount baseline | **10% off list** at $5K annual minimum, $500 per-order minimum |
| Discount active tier | **15% off list** at $15K annual minimum, $500 per-order minimum |
| Pricing rules | MAP policy compliance required on all advertised pricing |
| Reporting | Quarterly equipment end-customer reporting |
| Service | No warranty service obligation |
| Marketplaces | No third-party marketplace listings (Amazon, eBay, AliExpress, etc.) |
| Deal registration | Available on equipment opportunities only |
| Payment terms | Year 1 PIA, Year 2+ Net-30 on credit approval |
| Term | 1 year, auto-renewing; annual compliance certification required |
| Territory | United States and Canada |

### 2. Channel Partner

For complementary-product companies (microscopes, hardness testers, lab automation) that sell PACE gear bundled into their primary product sale, into accounts PACE cannot directly reach. **By invitation only.**

The partner picks one of two paths per opportunity:

#### Path A (referral-style)

Partner refers the prospect to PACE; PACE quotes, invoices, and serves as the seller of record.

- **5% cash on closed equipment**, paid 30 days after PACE collects
- No consumables referral fees
- Same submission/exclusivity mechanics as the Referral Partner tier

#### Path B (resale)

Partner is the seller of record; partner invoices the customer; PACE drop-ships in the partner's name.

- **15% off equipment on registered deals** (10% baseline on unregistered)
- **10% off consumables** when shipped on the same PO as the equipment (starter kit only)
- **Standalone consumables orders go to PACE direct at list**, or the customer is referred back to shop.metallographic.com
- 180-day deal registration on equipment opportunities
- **No ongoing account protection.** PACE freely engages the customer after the initial sale, because the partner cannot provide consumables advice and the customer will naturally come to PACE for those decisions. Protecting a stream the partner cannot service is fiction.

#### Channel Partner shared terms

| Field | Value |
|---|---|
| Annual minimum | $5K |
| Per-order minimum | $500 |
| Payment terms | PIA for the first 6 months; Net-30 on credit approval thereafter |
| Fulfillment | Drop-ship in partner's name with PACE-branded inner packaging |
| Obligations | No demo unit, no inventory, no warranty service |
| Pricing rules | MAP policy applies; Path B bundled quotes are private, so MAP is largely moot in practice |
| Reporting | Quarterly equipment end-customer reporting |
| Term | 1 year, auto-renewing; annual compliance certification required |
| Territory | United States only |

**SPIF program tabled.** Don has not yet approved a per-deal equipment SPIF. Do not include SPIF language in the Channel Partner Agreement or reference SPIFs anywhere in partner materials until approved.

### 3. Referral Partner

For consultants, individuals, small labs, or any party who occasionally introduces a customer to PACE but does not want to invoice, hold inventory, or take on a multi-section contract.

| Field | Value |
|---|---|
| Format | Public `/referral-terms.html` page plus a one-page signed acknowledgment, not a full agreement |
| Fee | **5% cash on closed equipment**, paid 30 days after PACE collects |
| Scope | Equipment referrals only. No consumables referrals, no trailing fees. |
| Submission | Lead submission via form; PACE confirms acceptance in 5 business days |
| Exclusivity | 90-day window on accepted leads (no fee if PACE was already in active pursuit) |
| Resale rights | None |
| Trademark use | "PACE Referral Partner" courtesy badge only |
| Annual minimum | None |
| Term | No commitment; either side cancels with 30 days' notice |
| Boilerplate | Compliance, anti-corruption, confidentiality, IP |

---

## Design rules

Four rules that hold the program together. These are not in any partner contract; they are PACE's internal operating rules for running the program.

1. **Reseller and Channel Partner agreements are mutually exclusive.** One entity, one agreement. This prevents a Channel Partner from routing consumables refills through a Reseller agreement at 15% and defeating the design intent that consumables refills go to PACE direct.
2. **The Channel Partner "by invitation only" gate must be real.** Channel Partners get 15% at a $5K annual minimum; Resellers need $15K to reach the same discount. That asymmetry is only defensible if PACE filters who gets invited. An internal scoring rubric (not published) defines what qualifies a company for invitation: complementary primary product, demonstrated access to accounts PACE cannot reach, no overlap with existing PACE direct pipeline.
3. **Drop-ship is operational, available to both Reseller and Channel Partner.** It is not a Channel Partner exclusive. Resellers may opt for drop-ship or for shipment to their own warehouse.
4. **Deal Registration Policy must explicitly handle conflicts.** First-in-time wins, with PACE direct override if the customer is already in PACE's active sales pipeline. Reseller vs Channel Partner registration overlaps resolve by the same first-in-time rule.

---

## Page inventory

### Discoverability

**IYKYK rule.** The channel program is intentionally not linked from the main nav, the footer, the homepage, or any other discoverable surface of the public site. Pages live at known URLs that PACE shares directly with prospective partners. Search engines and AI crawlers are blocked via meta robots tags (`noindex, nofollow`) and explicit robots.txt Disallow rules across both general and AI crawler user-agents. There is no public "Partners" landing page.

### URL-accessible (not indexed, not linked)

| Page | Status | Notes |
|---|---|---|
| `/terms.html` | Exists | PACE Standard Terms and Conditions of Sale. Referenced by all agreements. |
| `/privacy.html` | Exists | Privacy Policy. Referenced by all agreements. |
| `/channel-map-policy.html` | **Rewrite from `/distributor-map-policy.html`** | Broaden scope to all channel sellers and all products. Equipment is now included. Same Colgate-doctrine unilateral structure. |
| `/referral-terms.html` | **New** | The public-facing referral program terms, signed via one-page acknowledgment. |
| `/deal-registration-policy.html` | **New** | The mechanism that gives Channel Partners credible deal protection at 15%. Public for transparency. |
| `/partner-mark-guidelines.html` | **New** | Brand and badge usage rules for all authorized partners. |

### Gated behind `/partner-downloads.html` password (also not indexed, not linked)

| Page | Status | Notes |
|---|---|---|
| `/distributor-agreement.html` | Exists | Add one-line scope edit: "Territory must be outside the United States. PACE retains exclusive rights to distribute and sell directly in the United States." |
| `/reseller-agreement.html` | **Revise** | Add Exhibit B with the tiered 10/15% discount structure and $500 per-order MOQ. Update §4 Annual Minimum to $5K. Territory is US and Canada. |
| `/channel-partner-agreement.html` | **New** | Reuses reseller boilerplate. Adds Path A / Path B mechanics, deal registration, drop-ship. PIA first 6 months then Net-30. No MDF or SPIF references. |
| `/channel-compliance-certification.html` | **Rewrite from `/distributor-compliance-certification.html`** | Extend to apply to all three partner tiers, not distributors only. |

### Internal only — NEVER on the public site

- Channel Partner invitation scoring rubric
- CRM tagging conventions for deal registration
- SPIF internal budget and approval policy (program itself is tabled until Don approves)

### Non-page artifacts

- **Deal Registration submission form** (HubSpot form, embedded on a gated partner page)
- **Referral Partner one-page acknowledgment** (PDF download or e-sign flow; mechanism is Marc's call)

---

## Build order

1. Add geographic-scope line to `/distributor-agreement.html`
2. Rewrite `/distributor-map-policy.html` → broadened `/channel-map-policy.html` (or update in place + redirect)
3. Revise `/reseller-agreement.html` Exhibit B (tiered discount + MOQ + $5K annual minimum)
4. Rewrite `/distributor-compliance-certification.html` → `/channel-compliance-certification.html`
5. Draft `/deal-registration-policy.html`
6. Draft `/partner-mark-guidelines.html`
7. Draft `/channel-partner-agreement.html`
8. Draft `/referral-terms.html` and the one-page acknowledgment artifact
9. Update `/partner-downloads.html` to add Channel Partner Agreement download cards
10. Build the Deal Registration HubSpot form

---

## Tabled decisions

- **SPIF program.** Not yet approved by Don. Do not draft any SPIF page, do not reference SPIFs in any agreement, do not communicate SPIFs to partners until explicit approval.
- **Internal Channel Partner invitation scoring rubric.** Needs to be drafted internally before the first Channel Partner agreement is signed, so PACE has a defensible "why this company qualifies" answer.
- **Referral Partner acknowledgment mechanism.** PDF + scanned signature, DocuSign, or HubSpot consent checkbox — Marc to decide.
