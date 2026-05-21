#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Etchant detail-page content refresh (40 pages — ferric-chloride deleted).
 *
 * Rewrites the following fields with metallographically-verified content:
 *   - Method (Quick Info card + Application Method box)
 *   - Time   (Quick Info card + Application Method box)
 *   - Composition (Quick Info card — ONLY when SDS data is provided)
 *   - Preparation Notes ingredient table (ONLY when SDS data is provided)
 *   - Tags
 *   - Reveals
 *   - Typical Results
 *   - Application Notes
 *   - Troubleshooting
 *   - Storage Notes
 *   - Alternative Etchants
 *   - Similar Etchants
 *   - ASTM References
 *
 * Drops (auto-generated noise / conceptually wrong):
 *   - Color Effects
 *   - Compatible Materials
 *   - Incompatible Materials
 *
 * SDS verification status:
 *   16 of 40 pages have PACE-SDS-verified composition data (the entries with
 *   an `sds` field below). The remaining 24 entries still preserve whatever
 *   the website's current composition card says — see flagged notes for the
 *   ones still suspect.
 *
 * Sources used: ASTM E407, ASTM A262, Vander Voort (Metallography Principles
 * and Practice), Buehler Sum-Met, PACE SDS data (provided by Marc).
 */

const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const ONLY_FLAG = process.argv.find(a => a.startsWith('--only='));
const ONLY = ONLY_FLAG ? ONLY_FLAG.split('=')[1] : null;

const ETCHANTS_DIR = path.resolve(__dirname, '..', '..', 'etchants');

// =============================================================================
// SDS schema: each ingredient is [Name, CAS, '%', 'Yes'|'No']
// =============================================================================

const DATA = {

  // ----- SDS-verified -----------------------------------------------------

  'adlers-etchant': {
    displayName: "Adler's Etchant",
    sds: [
      ['Copper ammonium chloride', '10060-13-6', '20–30%', 'Yes'],
      ['Hydrogen chloride', '7647-01-0', '60–75%', 'Yes'],
      ['Ferric chloride', '7705-08-0', '10–20%', 'Yes'],
      ['Water', '7732-18-5', '2–5%', 'No'],
    ],
    method: 'Swab',
    time: '5–60 s',
    tags: ['stainless-steel', 'martensitic-stainless', 'PH-stainless', 'chromium-steel'],
    reveals: 'Grain boundaries in ferritic, martensitic, and precipitation-hardening stainless steels; M23C6 carbides; sigma phase; prior austenite grain boundaries in PH stainless after aging',
    typical: "Standard etchant for ferritic, martensitic, and PH stainless steels (410, 416, 17-4 PH, 15-5 PH, 13-8 Mo). Stronger and faster than Kalling's No. 2 — especially good for prior-austenite grain boundary reveal in PH stainless H900–H1150 conditions.",
    app_notes: 'Swab the freshly polished surface 5–60 s at room temperature. Rinse with water, then ethanol; air-dry.',
    troubleshooting: 'Pitted attack means polishing-induced damage or swab dwelled too long on one spot — repolish lightly with 0.05 µm and re-etch with a moving swab. Under-etch on H900 17-4 PH — extend to 60 s.',
    storage: 'Amber glass at room temperature. Stable several weeks; discard when solution darkens noticeably (Fe(II) → Fe(III) oxidation).',
    alternatives: ["Kalling's No. 2", "Vilella's Reagent", "Carpenter's"],
    similar: ["Kalling's No. 2"],
    astm: ['ASTM E407 #24', 'ASTM A763'],
  },

  'kallings-no-2': {
    displayName: "Kalling's No. 2",
    sds: [
      ['Ethyl alcohol', '64-17-5', '85–95%', 'Yes'],
      ['Copper (II) chloride', '7447-39-4', '0.5–5%', 'Yes'],
      ['Hydrogen chloride', '7647-01-0', '2–7%', 'Yes'],
      ['Methyl alcohol', '67-56-1', '1–5%', 'Yes'],
      ['Isopropyl alcohol', '67-63-0', '1–5%', 'Yes'],
    ],
    method: 'Swab',
    time: '5–60 s',
    tags: ['stainless-steel', 'austenitic-stainless', 'duplex-stainless', 'nickel-alloy'],
    reveals: 'Grain boundaries in austenitic stainless steels; delta-ferrite in duplex; sigma phase (preferential boundary attack); carbides at boundaries',
    typical: 'The standard etchant for austenitic stainless steels (304, 316, 321, 347), duplex (2205, 2507), and many nickel-base alloys. Reveals grain boundaries cleanly without attacking ferrite or matrix. Mild — good first-try etchant on austenitic SS.',
    app_notes: 'Swab the freshly polished surface 5–60 s at room temperature. Rinse with water then ethanol; air-dry.',
    troubleshooting: 'Sensitized 304/316 etches preferentially at boundaries — distinguish step vs ditch by morphology and confirm with 10% oxalic A262 Practice A. Cold-worked SS under-etches — extend to 60 s.',
    storage: 'Amber glass at room temperature. Stable several months.',
    alternatives: ["Adler's Etchant", 'Glyceregia', "Vilella's Reagent (martensitic only)"],
    similar: ["Adler's Etchant"],
    astm: ['ASTM E407 #92', 'ASTM A763'],
  },

  'waterless-kallings': {
    displayName: "Waterless Kalling's",
    sds: [
      ['Ethyl alcohol', '64-17-5', '40–55%', 'Yes'],
      ['Copper (II) chloride', '7447-39-4', '0.5–10%', 'Yes'],
      ['Hydrogen chloride', '7647-01-0', '40–55%', 'Yes'],
      ['Methyl alcohol', '67-56-1', '0.5–2%', 'Yes'],
      ['Isopropyl alcohol', '67-63-0', '0.5–2%', 'Yes'],
    ],
    method: 'Swab',
    time: '5–60 s',
    tags: ['martensitic-stainless', 'PH-stainless', 'duplex-stainless', 'austenitic-stainless'],
    reveals: "Grain boundaries in martensitic and PH stainless steels where Kalling's No. 2 over-etches; sigma phase; carbides; ferrite vs austenite contrast in duplex",
    typical: "Water-free version of Kalling's — equal HCl + ethanol with CuCl2. Stronger and more controllable than Kalling's No. 2 on martensitic stainless, PH stainless (17-4, 15-5), and duplex (2205, 2507). The absence of water gives more uniform attack on chromium-rich grades. Less suitable for plain austenitic SS — use Kalling's No. 2 there.",
    app_notes: 'Swab the freshly polished surface 5–60 s at room temperature. Rinse with water then ethanol; air-dry.',
    troubleshooting: "More aggressive than Kalling's No. 2 — start at 5 s and add seconds as needed. Aged 17-4 PH H900 typically needs 30–60 s. Pitted attack means the swab dwelled too long.",
    storage: "Amber glass at room temperature. Stable several months sealed (less hygroscopic than Kalling's No. 2).",
    alternatives: ["Kalling's No. 2", "Vilella's Reagent", "Adler's Etchant"],
    similar: ["Kalling's No. 2"],
    astm: ['ASTM E407 #94'],
  },

  'murakamis-reagent': {
    displayName: "Murakami's Reagent",
    sds: [
      ['Potassium ferricyanide', '13746-66-2', '10–30%', 'Yes'],
      ['Potassium hydroxide', '1310-58-3', '10–30%', 'Yes'],
      ['Water', '7732-18-5', '70–85%', 'No'],
    ],
    method: 'Immersion (cold or boiling)',
    time: '30–60 s cold (carbide work) / 2–6 min boiling (sensitization, A262 Practice E)',
    tags: ['tungsten-carbide', 'cemented-carbide', 'hard-metals', 'stainless-steel', 'sensitization-test'],
    reveals: 'COLD: eta phase and Co binder distribution in WC-Co cemented carbides; sigma phase in stainless. BOILING: Cr-depleted grain boundaries in sensitized austenitic stainless (ASTM A262 Practice E / Strauss).',
    typical: 'Dual-use etchant. (1) Cold at room temperature — stains binder cobalt and eta phase in WC-Co tungsten carbide; reveals sigma in some stainless. (2) Boiling (~100 °C, 2–6 min) — the Strauss sensitization test for austenitic stainless steels per ASTM A262 Practice E.',
    app_notes: 'For WC work: immerse cold 30–60 s; rinse with water. For sensitization: boil 2–6 min per A262 Practice E (use a reflux setup); cool, rinse, examine.',
    troubleshooting: 'K3Fe(CN)6 + acid evolves HCN — keep solution alkaline at all times. Hot solution can boil over; use a fume hood and reflux. Cool solution before disposal.',
    storage: 'Amber glass at room temperature. Stable several months sealed. Discard if greenish-blue (Fe(II) formation).',
    alternatives: ['10% Oxalic Acid (Electrolytic) — A262 Practice A', 'Glyceregia — A262 Practice C', "Marble's Reagent (WC)"],
    similar: ['Sensitization-test family (A262 A/B/C/E/F)'],
    astm: ['ASTM E407 #93', 'ASTM A262 Practice E'],
  },

  'astm-no-30': {
    displayName: 'ASTM No. 30',
    sds: [
      ['Ammonium hydroxide', '1336-21-6', '21–72%', 'Yes'],
      ['Hydrogen peroxide', '7722-84-1', '1–4%', 'Yes'],
      ['Water', '7732-18-5', '28–79%', 'No'],
    ],
    method: 'Swab',
    time: '5–20 s',
    tags: ['copper', 'copper-alloy', 'brass', 'bronze'],
    reveals: 'Grain boundaries, annealing twins in OFHC copper, brass, and bronze; alpha-beta phases in brass',
    typical: 'Classical ASTM E407 #30 ammonia-peroxide etchant for copper and brass — PACE supplies the formulation pre-mixed (vs the traditional mix-on-bench approach). Reveals grain boundaries and annealing twins cleanly. Same chemistry as Ammonium Hydroxide + H2O2 SKU; different bottle, same use case.',
    app_notes: 'Swab the freshly polished surface 5–20 s at room temperature. Rinse with water then ethanol; passivate with Cu-Pass-Sol if standing time before imaging.',
    troubleshooting: 'PACE formulation stabilizes the H2O2 longer than bench-mixed solutions, but reactivity still decreases over months. If no etching response, the peroxide has decomposed — replace the bottle.',
    storage: 'Amber bottle, cool storage. Per PACE SDS — reactivity decreases gradually; replace when no longer active.',
    alternatives: ['Ammonium Hydroxide + H2O2', 'Ammonium Persulfate', "Klemm's Reagent"],
    similar: ['Ammonium Hydroxide + H2O2'],
    astm: ['ASTM E407 #30'],
  },

  'astm-no-157': {
    displayName: 'ASTM No. 157',
    sds: [
      ['Hydrogen chloride', '7647-01-0', '40–70%', 'Yes'],
      ['Chromium trioxide', '1333-82-0', '10–25%', 'Yes'],
      ['Water', '7732-18-5', '25–50%', 'No'],
    ],
    method: 'Immersion',
    time: '5–30 s',
    tags: ['stainless-steel', 'nickel-alloy', 'superalloy', 'inconel', 'hastelloy'],
    reveals: 'Grain boundaries, carbides, sigma phase in chromium-bearing stainless and nickel-base superalloys',
    typical: 'HCl + chromic acid immersion etchant for stainless steels, Inconel, Hastelloy, and other Ni-base superalloys (matches ASTM E407 #157 family). Aggressive attack reveals grain structure and primary carbide network even in aged superalloys. CARCINOGENIC (Cr(VI)) — full PPE and fume hood mandatory.',
    app_notes: 'Immerse polished surface 5–30 s at room temperature. Rinse copiously with water, then ethanol.',
    troubleshooting: 'Cr(VI) is a known human carcinogen — full containment required. Dispose as regulated waste. Solution darkens with use but remains active.',
    storage: 'Glass bottle with tight cap; secondary containment. Hazardous-waste disposal protocol. Stable many months.',
    alternatives: ['Glyceregia', "Marble's Reagent", '10% Oxalic Acid (Electrolytic)', 'Inconel Etchant'],
    similar: ['Chromic Acid (Electrolytic)'],
    astm: ['ASTM E407 #157'],
  },

  'carpenters': {
    displayName: "Carpenter's",
    sds: [
      ['Ethyl alcohol', '64-17-5', '35–55%', 'Yes'],
      ['Hydrogen chloride', '7647-01-0', '35–55%', 'Yes'],
      ['Nitric acid', '7697-37-2', '2–5%', 'Yes'],
      ['Ferric chloride', '7705-08-0', '1–5%', 'Yes'],
      ['Copper (II) chloride', '7447-39-4', '0.5–1.5%', 'Yes'],
      ['Methyl alcohol', '67-56-1', '0–5%', 'Yes'],
      ['Isopropyl alcohol', '67-63-0', '0–2%', 'Yes'],
    ],
    method: 'Swab',
    time: '5–30 s',
    tags: ['tool-steel', 'high-speed-steel', 'martensitic-stainless', 'PH-stainless'],
    reveals: 'Carbides (M6C, MC, M23C6), prior austenite grain boundaries, and tempered martensite in tool/high-speed steels and hardened martensitic stainless',
    typical: "Classical Carpenter Steel Co. formulation — FeCl3 + CuCl2 + HCl + HNO3 + denatured ethanol. One of the most aggressive of the stainless / tool-steel family. Reveals carbide morphology and prior-austenite grain size in fully hardened tool steels (M2, T1, D2, A2, S7) and martensitic stainless.",
    app_notes: 'Swab 5–30 s at room temperature. Rinse with water, then ethanol.',
    troubleshooting: 'Solution depletes faster than Kalling-family etchants because of the HNO3 content. Discard when color darkens significantly or smell of NOx develops. Pitted attack from over-dwell on one spot.',
    storage: 'Amber glass at room temperature. Stable a few weeks; replace when very dark or NOx-smelling.',
    alternatives: ["Vilella's Reagent", "Adler's Etchant", "Kalling's No. 2"],
    similar: ["Adler's Etchant", "Vilella's Reagent"],
    astm: ['ASTM E407'],
  },

  'frys-reagent': {
    displayName: "Fry's Reagent",
    sds: [
      ['Ethyl alcohol', '64-17-5', '55–70%', 'Yes'],
      ['Hydrogen chloride', '7647-01-0', '30–50%', 'Yes'],
      ['Water', '7732-18-5', '5–15%', 'No'],
      ['Copper (II) chloride', '7447-39-4', '0.4–2%', 'Yes'],
      ['Methyl alcohol', '67-56-1', '1–5%', 'Yes'],
      ['Isopropyl alcohol', '67-63-0', '1–5%', 'Yes'],
    ],
    method: 'Swab',
    time: '30–120 s',
    tags: ['maraging-steel', 'low-carbon-steel', 'cold-worked-steel', 'strain-pattern'],
    reveals: 'Strain patterns (slip lines, deformation banding); grain boundaries in low-carbon and maraging steels; recrystallized vs unrecrystallized regions; prior cold-work boundaries',
    typical: "Classical Fry's reagent — CuCl2 + HCl + ethanol + water. Workhorse for visualizing strain history and cold work in low-carbon and maraging steels (250, 300 grades). The water content (5–15%) is what enables the strain-pattern attack; water-free Kalling's chemistry does NOT produce the same result.",
    app_notes: 'Swab 30–120 s at room temperature. The brownish-purple attack pattern is normal. Rinse with water then ethanol.',
    troubleshooting: 'False strain patterns from polishing damage — finish polish with 0.05 µm alumina or VibroMet to remove the cold-worked surface layer before re-etching.',
    storage: 'Amber glass at room temperature. Stable several weeks; discard when very dark.',
    alternatives: ["Adler's Etchant", '2% Nital', "Klemm's Reagent"],
    similar: ["Adler's Etchant"],
    astm: ['ASTM E407 #16'],
  },

  'inconel-etchant': {
    displayName: 'Inconel Etchant',
    sds: [
      ['Hydrogen peroxide', '7722-84-1', '10–20%', 'Yes'],
      ['Hydrogen chloride', '7647-01-0', '20–40%', 'Yes'],
      ['Nitric acid', '7697-37-2', '10–30%', 'Yes'],
      ['Water', '7732-18-5', '10–50%', 'No'],
    ],
    method: 'Swab',
    time: '10–30 s',
    tags: ['nickel-alloy', 'inconel', 'superalloy', 'hastelloy', 'waspaloy'],
    reveals: 'Grain boundaries, primary carbides (MC, M23C6), large gamma-prime in aged Ni-base superalloys',
    typical: 'Modified aqua regia with hydrogen peroxide added for additional oxidation power. Specifically designed for hard-to-etch nickel-base superalloys — Inconel 600/625/718/738, Hastelloy C-276, Waspaloy. The H2O2 enhances attack on the Cr-rich passive layer that protects superalloy grain boundaries.',
    app_notes: 'Swab 10–30 s at room temperature. Visible bubbling on contact is normal (peroxide reaction). Rinse with water then ethanol.',
    troubleshooting: 'No bubbling on contact means the H2O2 has decomposed — discard. Solution-treated condition etches faster than aged. Aged 718 / Waspaloy may need the longer end of the time window.',
    storage: 'Amber glass, cool storage (refrigerate if possible). Per PACE SDS — H2O2 decomposes over months; replace when reactivity drops.',
    alternatives: ['Glyceregia', "Marble's Reagent", 'ASTM No. 157'],
    similar: ['Glyceregia'],
    astm: ['ASTM E407'],
  },

  'nickel-etchant': {
    displayName: 'Nickel Etchant',
    sds: [
      ['Nitric acid', '7697-37-2', '20–40%', 'Yes'],
      ['Sulfuric acid', '7664-93-9', '2–10%', 'Yes'],
      ['Sodium chloride', '7647-14-5', '2–10%', 'Yes'],
      ['Water', '7732-18-5', '50–70%', 'No'],
    ],
    method: 'Swab',
    time: '10–60 s',
    tags: ['nickel', 'nickel-alloy', 'monel', 'nickel-200', 'nickel-201'],
    reveals: 'Grain boundaries; annealing twins; deformation banding in cold-worked Ni; precipitates in aged Monel K-500',
    typical: 'Acid-chloride etchant (HNO3 + H2SO4 + NaCl) for commercially pure nickel (Nickel 200/201), Monel (Ni-Cu alloys 400, K-500), and other low-alloy nickel grades. The chloride breaks through the passivating Ni oxide layer; HNO3/H2SO4 develop grain structure. For higher-alloy nickel superalloys, use Inconel Etchant or Glyceregia.',
    app_notes: 'Swab 10–60 s at room temperature. Rinse with water then ethanol.',
    troubleshooting: 'Aged Monel K-500 needs the longer end of the time window vs annealed Monel 400. Cold-worked Ni shows deformation bands at long dwell — that is expected.',
    storage: 'Amber glass at room temperature. Stable many months.',
    alternatives: ["Marble's Reagent", 'Inconel Etchant'],
    similar: ["Marble's Reagent"],
    astm: ['ASTM E407'],
  },

  'winsteards-reagent': {
    displayName: "Winsteard's Reagent",
    sds: [
      ['Ethyl alcohol', '64-17-5', '80–90%', 'Yes'],
      ['Hydrogen chloride', '7647-01-0', '2–5%', 'Yes'],
      ['Picric acid', '88-89-1', '0.5–1.5%', 'Yes'],
      ['Water', '7732-18-5', '0.5–1.5%', 'No'],
      ['Methyl alcohol', '67-56-1', '0.5–5%', 'Yes'],
      ['Isopropyl alcohol', '67-63-0', '0.5–5%', 'Yes'],
      ['Sodium tridecylbenzene sulfonate (40% solution)', '26248-24-8', '4–5%', 'No'],
    ],
    method: 'Immersion or swab',
    time: '10–60 s',
    tags: ['martensitic-stainless', 'PH-stainless', 'tool-steel', 'high-speed-steel'],
    reveals: "Prior austenite grain boundaries, tempered martensite, carbides in martensitic SS (410, 420, 440C), PH stainless (17-4 PH, 15-5 PH), and hardened tool/HSS",
    typical: "Vilella's-family etchant — picric + HCl + denatured ethanol — with sodium tridecylbenzene sulfonate added as a surfactant/wetting agent. The wetting agent reduces surface tension and produces more uniform attack on hydrophobic polished surfaces than straight Vilella's. Use case identical to Vilella's: prior-austenite grain boundary reveal in hardened martensitic / PH stainless and tool / high-speed steels.",
    app_notes: 'Immerse or swab 10–60 s at room temperature. Rinse with ethanol, then water; air-dry.',
    troubleshooting: 'PICRIC ACID — never let solution dry. Dry picric crystals are shock-sensitive explosives. Keep ≥0.5% water in container at all times. The surfactant reduces surface tension — solution may bead-and-run on overly horizontal surfaces.',
    storage: 'Amber glass at room temperature; keep wet. Inspect monthly and add water if level drops. EXPLOSIVE WHEN DRY. Stable months when wet.',
    alternatives: ["Vilella's Reagent", "Adler's Etchant", "Carpenter's"],
    similar: ["Vilella's Reagent"],
    astm: ['ASTM E407'],
  },

  'ammonium-persulfate': {
    displayName: 'Ammonium Persulfate',
    sds: [
      ['Ammonium persulfate', '7727-54-0', '15–25%', 'Yes'],
      ['Water', '7732-18-5', '75–85%', 'No'],
    ],
    method: 'Immersion or swab',
    time: '30–60 s',
    tags: ['copper', 'copper-alloy', 'brass', 'nickel-silver'],
    reveals: 'Grain boundaries; annealing twins; alpha–beta phases in brass',
    typical: 'PACE 15–25% ammonium persulfate solution for copper alloys. Milder than NH4OH + H2O2 with a longer shelf life. Reveals grain boundaries and annealing twins in OFHC copper, brass, nickel-silver, and bronze. Same chemistry as Copper No. 1 only if positioned identically — PACE Copper No. 1 is actually dilute HNO3 (different chemistry).',
    app_notes: 'Immerse or swab 30–60 s at room temperature. Rinse with water then ethanol; passivate with Cu-Pass-Sol if standing time before imaging.',
    troubleshooting: 'Sluggish attack — solution has aged; replace bottle. Tarnish on standing — passivate immediately after rinse.',
    storage: 'Cool, dark bottle. Per PACE SDS — stable longer than bench-mixed equivalents. Replace when activity drops.',
    alternatives: ['Ammonium Hydroxide + H2O2', 'ASTM No. 30', 'Copper No. 1', 'Copper No. 2'],
    similar: ['Ammonium Hydroxide + H2O2'],
    astm: ['ASTM E407 #30'],
  },

  'copper-no-1': {
    displayName: 'Copper No. 1',
    sds: [
      ['Nitric acid', '7697-37-2', '30–35%', 'Yes'],
      ['Water', '7732-18-5', '65–70%', 'No'],
    ],
    method: 'Swab or immersion',
    time: '5–30 s',
    tags: ['copper', 'copper-alloy', 'brass', 'nickel-silver', 'monel'],
    reveals: 'Grain boundaries, annealing twins, alpha–beta phases in brass; grain structure in nickel-silver and Monel',
    typical: 'Dilute nitric acid (≈1:2 HNO3 to H2O) — classical aggressive copper etch. Faster than persulfate or ferric chloride; useful when higher contrast is needed or when other etchants under-etch. Also effective on nickel-silver and Monel.',
    app_notes: 'Swab or short immerse 5–30 s at room temperature. Rinse promptly with water, then ethanol; passivate with Cu-Pass-Sol.',
    troubleshooting: 'Significantly faster than persulfate — start at the shortest time and add seconds as needed. Over-etch produces uneven dark attack. Yellow-brown NOx fumes evolve during use — work in fume hood.',
    storage: 'Glass bottle at room temperature. Stable indefinitely; replace when chemistry depletes from heavy use.',
    alternatives: ['Ammonium Persulfate', 'Copper No. 2', 'Ammonium Hydroxide + H2O2'],
    similar: ['HNO3-based copper etchants'],
    astm: ['ASTM E407'],
  },

  'copper-no-2': {
    displayName: 'Copper No. 2',
    sds: [
      ['Hydrogen chloride', '7647-01-0', '10–15%', 'Yes'],
      ['Ferric chloride', '7705-08-0', '5–10%', 'Yes'],
      ['Water', '7732-18-5', '75–85%', 'No'],
    ],
    method: 'Swab or immersion',
    time: '10–60 s',
    tags: ['copper', 'copper-alloy', 'brass', 'bronze', 'beryllium-copper'],
    reveals: 'Grain boundaries, alpha–beta phases in brass, second-phase particles in age-hardened Cu alloys (CuBe, CuCr, CuZr)',
    typical: 'Acidic ferric-chloride etchant — FeCl3 oxidizes copper while HCl strips the chloride layer. Standard for OFHC copper, brass, bronze, and beryllium copper. Slightly more aggressive than NH4OH + H2O2; longer shelf life. (This is the only PACE product containing ferric chloride; the previous standalone "Ferric Chloride" SKU was a duplicate and has been removed.)',
    app_notes: 'Swab or immerse 10–60 s at room temperature. Rinse promptly with water — delayed rinse leaves iron staining. Follow with ethanol; passivate with Cu-Pass-Sol.',
    troubleshooting: 'Iron staining if rinse delayed — flush immediately. Aged CuBe (HT-temper) needs the longer end of the time window. Be-Cu dust is toxic — handle hardened CuBe with care.',
    storage: 'Amber glass at room temperature. Stable many months; color darkens with age but solution remains active.',
    alternatives: ['Copper No. 1', 'Ammonium Persulfate', 'Ammonium Hydroxide + H2O2'],
    similar: ['Ammonium Persulfate'],
    astm: ['ASTM E407 #28'],
  },

  'krolls-reagent': {
    displayName: "Kroll's Reagent",
    sds: [
      ['Hydrogen fluoride', '7664-39-3', '1–5%', 'Yes'],
      ['Nitric acid', '7697-37-2', '4–8%', 'Yes'],
      ['Water', '7732-18-5', '90–95%', 'No'],
    ],
    method: 'Swab',
    time: '3–15 s',
    tags: ['titanium', 'titanium-alloy', 'zirconium', 'cp-titanium'],
    reveals: 'Alpha and beta phases in titanium alloys (alpha light, beta dark); transformed beta colonies; grain boundaries; alpha-2 Ti3Al',
    typical: "The standard etchant for titanium alloys (CP-Ti, Ti-6Al-4V, Ti-5Al-2.5Sn, Ti-6242). Reveals alpha / beta distribution clearly. Standard composition: ~2 mL HF + ~6 mL HNO3 + 100 mL H2O. Also works on zirconium and Zircaloy.",
    app_notes: 'Swab 3–15 s at room temperature. Do not immerse — HF over-attacks. Rinse copiously with cold water.',
    troubleshooting: 'HF burns may be delayed — keep calcium gluconate gel on hand and treat any contact immediately. PE container only — HF etches glass. Alpha-2 Ti3Al phase in Ti-6242 needs the longer end of the dwell.',
    storage: 'PE / PP bottle at room temperature, labeled with HF symbol. Stable many months.',
    alternatives: ["Modified Kroll's Reagent", 'Ti-AP-16 (attack-polish — different workflow)'],
    similar: ["Modified Kroll's Reagent"],
    astm: ['ASTM E407 #192'],
  },

  // ti-ap-16 is special: an attack-polish slurry, NOT an etchant.
  'ti-ap-16': {
    displayName: 'Ti-AP-16',
    sds: [
      ['Ammonium hydroxide', '1336-21-6', '7–12%', 'Yes'],
      ['Hydrogen peroxide', '7722-84-1', '0.1–1%', 'Yes'],
      ['Amorphous silica (colloidal)', '7631-86-9', '30–50%', 'No'],
      ['Water', '7732-18-5', '40–60%', 'No'],
    ],
    method: 'Chemo-mechanical polish (on wheel)',
    time: '2–5 min final polish',
    tags: ['titanium', 'titanium-alloy', 'attack-polish', 'chemo-mechanical-polish', 'polishing-slurry'],
    reveals: 'Alpha / beta phase contrast on the final-polished surface (no separate etch needed); grain boundaries; transformed beta colonies',
    typical: "Ti-AP-16 is a chemo-mechanical attack-polishing slurry, NOT an etchant. It is used on a polishing wheel as the final prep step. The alkaline NH4OH / H2O2 chemistry chemically attacks titanium while the colloidal silica (30–50%) polishes mechanically. The combined action produces an etch-ready surface with alpha / beta contrast already developed — no separate Kroll's etch is needed for routine imaging.",
    app_notes: 'Apply to a final-polish pad (microcloth, MicroFloc, or similar). Use as the FINAL step after the standard SiC + diamond progression (typically after 3 µm or 1 µm diamond). Polish 2–5 min at 100–150 RPM with light-to-moderate pressure. Rinse copiously with water during and after — silica residue must be removed completely.',
    troubleshooting: 'Silica residue left on the sample shows up as a uniform "haze" under the microscope — finish with a water-only lap on a clean pad, or rinse longer. Inadequate contrast → polish longer or increase pad pressure. NH4OH evaporates — keep the bottle capped between uses.',
    storage: 'Per PACE SDS — cool storage; the colloidal silica may settle, so agitate before use. Discard if the solid becomes a gel (irreversible silica aggregation).',
    alternatives: ["Kroll's Reagent (if using a separate-etch workflow on regular polished surface)", "Modified Kroll's Reagent"],
    similar: ['Colloidal silica attack-polish products (e.g., OP-S, MasterMet 2 for Ti)'],
    astm: ['Not applicable — polishing consumable, not etchant. See ASTM E1558 (Electrolytic Polishing) for context.'],
  },

  // ----- Composition card preserved (no SDS yet) -------------------------
  // For these entries the script does not touch the Composition card or
  // Preparation Notes — only the narrative fields below. Composition cards
  // still show whatever the website had, which may be auto-generated.

  '0-5-percent-hf': {
    method: 'Immersion',
    time: '5–60 s',
    tags: ['aluminum', 'aluminum-alloy', 'magnesium'],
    reveals: 'Grain boundaries; second-phase particles (Al2Cu, Mg2Si, MgZn2); constituent particles',
    typical: "Light HF etchant for aluminum and magnesium alloys. Preferred over Keller's on high-Cu wrought alloys (2024, 2219, 7075), where Keller's leaves a Cu-rich stain. Standard for general grain structure in 1xxx through 6xxx series.",
    app_notes: 'Immerse in plastic dish 5–60 s at room temperature; swab if attack is uneven. Rinse copiously with cold water, then warm-air dry. Do not alcohol-rinse aluminum.',
    troubleshooting: 'HF burns can be delayed by minutes to hours. Keep calcium gluconate gel on hand and treat any skin contact immediately. Plastic container only — HF etches glass.',
    storage: 'PE or PP bottle at room temperature, labeled with HF symbol. Stable indefinitely. Store away from concentrated acids.',
    alternatives: ["Keller's Reagent", "Barker's Reagent (Electrolytic)", 'Al-NaOH Etchant'],
    similar: ["Keller's Reagent"],
    astm: ['ASTM E407 #1'],
  },

  '10-percent-oxalic-acid-electrolytic': {
    method: 'Electrolytic',
    time: '1.5 min at 6 V DC',
    tags: ['stainless-steel', 'austenitic-stainless', 'electrolytic', 'sensitization-test'],
    reveals: 'Step / dual / ditch boundary structure per ASTM A262 Practice A; sigma phase; chi phase; carbides',
    typical: 'The chromium-carbide sensitization screen for austenitic and duplex stainless steels (ASTM A262 Practice A). Step structure indicates an unsensitized matrix, dual structure is transitional, and ditch structure means continuous intergranular attack (sensitized, susceptible to IGSCC).',
    app_notes: 'Sample is the anode; stainless cathode. Apply 6 V DC at roughly 1 A/cm² for 1.5 min per A262 Practice A. Rinse with water, then ethanol; air-dry.',
    troubleshooting: 'Interpret morphology against the A262 reference micrographs. Under-developed boundaries — extend time. Pitting attack — reduce time or current density.',
    storage: 'Glass bottle at room temperature. Stable many months.',
    alternatives: ['Glyceregia', "Murakami's Reagent (boiling)", 'Chromic Acid (Electrolytic)'],
    similar: ['Chromic Acid (Electrolytic)'],
    astm: ['ASTM E407', 'ASTM A262 Practice A'],
  },

  '2-percent-nital': {
    method: 'Immersion',
    time: '5–30 s',
    tags: ['carbon-steel', 'low-alloy-steel', 'cast-iron', 'general-purpose'],
    reveals: 'Ferrite grain boundaries; pearlite (darkened by cementite-ferrite interface attack); bainite; mild contrast on martensite',
    typical: 'The workhorse etchant for carbon and low-alloy steels. Darkens pearlite, leaves ferrite light, and reveals ferrite grain boundaries in annealed and normalized structures. Mild attack — appropriate as the first-try etchant on unknown steel.',
    app_notes: 'Immerse the polished surface 5–30 s at room temperature. Swab gently if attack is uneven. Rinse with ethanol, then water; air-dry.',
    troubleshooting: 'Over-etch flattens ferrite contrast and darkens the whole surface — repolish lightly with 1 µm diamond and re-etch shorter. Under-etch on bainite or fine pearlite — step up to 3% Nital or extend to 30 s.',
    storage: 'Tightly capped amber glass at room temperature; vent occasionally (NOx evolution). Stable 3–6 months.',
    alternatives: ['3% Nital', '4% Picral', "Klemm's Reagent"],
    similar: ['3% Nital', '5% Nital'],
    astm: ['ASTM E407 #74'],
  },

  '3-percent-nital': {
    method: 'Immersion',
    time: '5–20 s',
    tags: ['carbon-steel', 'medium-carbon-steel', 'low-alloy-steel'],
    reveals: 'Ferrite grain boundaries; pearlite; bainite; tempered martensite (moderate contrast)',
    typical: 'Slightly more aggressive than 2% Nital. Preferred for tempered martensite, fine bainite, and medium-alloy quench-and-tempered steels (4140, 4340, 8620) where 2% under-etches.',
    app_notes: 'Immerse 5–20 s at room temperature. Swab gently if attack is uneven. Rinse with ethanol, then water; air-dry.',
    troubleshooting: 'Over-etch on low-C steels — drop back to 2%. Under-etch on hardened tool steels — switch to 5% or to Vilella\'s.',
    storage: 'Tightly capped amber glass at room temperature. Stable 3–6 months.',
    alternatives: ['2% Nital', '5% Nital', '4% Picral'],
    similar: ['2% Nital', '5% Nital'],
    astm: ['ASTM E407 #74'],
  },

  '4-percent-nital': {
    method: 'Immersion',
    time: '5–20 s',
    tags: ['medium-carbon-steel', 'low-alloy-steel', 'tempered-martensite'],
    reveals: 'Ferrite grain boundaries; pearlite; tempered martensite; bainite',
    typical: 'Intermediate-strength nital. Use when 3% under-etches but 5% over-etches — practical for tempered martensite contrast in medium-alloy steels. 2% and 5% are the more common strengths; 4% is a fine-tuning option.',
    app_notes: 'Immerse 5–20 s at room temperature. Rinse with ethanol then water; air-dry.',
    troubleshooting: 'If contrast is similar to 3%, the 1% step did not buy useful selectivity — try a longer dwell with 3% first.',
    storage: 'Tightly capped amber glass at room temperature. Stable 3–6 months.',
    alternatives: ['3% Nital', '5% Nital'],
    similar: ['3% Nital', '5% Nital'],
    astm: ['ASTM E407 #74'],
  },

  '5-percent-nital': {
    method: 'Immersion',
    time: '3–15 s',
    tags: ['alloy-steel', 'tool-steel', 'tempered-martensite', 'prior-austenite-grain-boundaries'],
    reveals: 'Prior austenite grain boundaries in tempered martensite; tempered martensite needle structure; fine bainite; carbides at boundaries',
    typical: 'Used for prior-austenite grain boundary revealing in tempered martensitic alloy steels (4140, 4340, 8620, AISI O1). Over-etches normalized low-carbon steel — use 2% or 3% Nital there. Below 5% if the prior austenite grain boundaries are very fine.',
    app_notes: 'Immerse 3–15 s at room temperature. Start short — 5% is aggressive on softer steels. Rinse with ethanol then water; air-dry.',
    troubleshooting: 'Whole-surface darkening — too long; drop to 3% or shorten dwell. Failed PAGB reveal — re-temper at lower temperature, or use a picric-acid-based PAGB etch.',
    storage: 'Tightly capped amber glass. Stable 3–6 months.',
    alternatives: ['3% Nital', "Vilella's Reagent", '4% Picral'],
    similar: ['3% Nital', '8% Nital'],
    astm: ['ASTM E407 #74'],
  },

  '8-percent-nital': {
    method: 'Immersion',
    time: '2–10 s',
    tags: ['alloy-steel', 'tool-steel', 'highly-alloyed-steel'],
    reveals: 'Prior austenite grain boundaries and tempered martensite contrast in heavily alloyed Q&T steels',
    typical: 'High-concentration nital. Rare in modern practice — most metallographers prefer 5% Nital with a longer dwell. Reserved for very heavily alloyed quench-and-tempered steels where lower concentrations under-etch the prior austenite grain network.',
    app_notes: 'Immerse 2–10 s at room temperature. Very aggressive — start with the shortest time and add seconds as needed. Rinse with ethanol then water.',
    troubleshooting: 'If 5% already over-etches, 8% will worsen it — the issue is dwell time, not concentration. Use 5% and pull faster.',
    storage: 'Tightly capped amber glass. Stable 3–6 months.',
    alternatives: ['5% Nital', "Vilella's Reagent"],
    similar: ['5% Nital'],
    astm: ['ASTM E407 #74'],
  },

  'picral': {
    method: 'Immersion',
    time: '5–60 s',
    tags: ['carbon-steel', 'low-alloy-steel', 'cast-iron', 'pearlite-detail', 'spheroidized-steel'],
    reveals: 'Pearlite lamellar detail (carbide-step morphology); spheroidized carbides; tempered carbide distribution; cementite networks in hyper-eutectoid steels',
    typical: 'The picric-acid etchant. Attacks cementite, not ferrite — resolves pearlite lamellae with high clarity and shows tempered-carbide distribution in quench-and-tempered steels. Does not reveal ferrite grain boundaries; pair with Nital when both phases are needed. Standard for spheroidized and over-aged steel structures.',
    app_notes: 'Immerse 5–60 s at room temperature. Rinse with ethanol then water. Dry promptly — never let picric solution dry on the sample.',
    troubleshooting: 'PICRIC ACID — never allow the solution to dry. Dry picric crystals are shock-sensitive explosives. Keep at least 10% water above the solid at all times.',
    storage: 'Amber glass with water always above any settled solid. Inspect monthly for evaporation; add water as needed. EXPLOSIVE WHEN DRY.',
    alternatives: ['2% Nital', "Vilella's Reagent", "Murakami's Reagent"],
    similar: ['2% Nital'],
    astm: ['ASTM E407 #76'],
  },

  'al-naoh-etchant': {
    method: 'Immersion (warm)',
    time: '30–60 s at 50–70 °C',
    tags: ['aluminum', 'aluminum-alloy', 'macroetch', 'forgings', 'weld-cross-section'],
    reveals: 'Macroscopic grain structure; forging flow lines; segregation; weld fusion zone and HAZ in aluminum',
    typical: 'Sodium-hydroxide caustic macroetch for aluminum. Reveals grain structure on as-cast and forged sections, weld fusion / HAZ outlines, and as-rolled flow patterns. Not for micro grain-boundary work — use Keller\'s or 0.5% HF there.',
    app_notes: 'Heat to 50–70 °C in PE container. Immerse 30–60 s. Rinse with water, then dip briefly in 25% HNO3 to desmut (removes the black film), then rinse again and air-dry.',
    troubleshooting: 'Black smut on surface is expected — that\'s the desmut step. Pitting on edges — solution too hot or time too long.',
    storage: 'PE or PP bottle. Stable indefinitely. Heat in the same container; do not heat in glass.',
    alternatives: ['Tucker\'s Reagent (macro)', "Keller's Reagent (micro)"],
    similar: ['NaOH macroetch variants'],
    astm: ['ASTM E340', 'ASTM E407 #4'],
  },

  'ammonium-hydroxide-h2o2': {
    method: 'Swab',
    time: '5–20 s',
    tags: ['copper', 'copper-alloy', 'brass', 'bronze'],
    reveals: 'Grain boundaries and annealing twins in OFHC copper, brass, and bronze; alpha–beta phases in brass',
    typical: 'The standard ammonia-peroxide etchant for copper alloys. Reveals grain boundaries and annealing twins cleanly. Active H2O2 is the oxidizer — bench-mixed batches decompose within hours; PACE supplies a stabilized formulation (which is the same chemistry as ASTM No. 30).',
    app_notes: 'Mix equal parts concentrated NH4OH and 3% H2O2 immediately before use (or use PACE pre-mixed). Swab 5–20 s. Rinse with water then ethanol; air-dry.',
    troubleshooting: 'No etching response — H2O2 has decomposed; mix a fresh batch (or replace the bottle). Surface tarnish — passivate with Cu-Pass-Sol or rinse faster.',
    storage: 'Bench-mixed: prepare fresh each session. PACE pre-mixed: amber bottle, cool storage; replace when activity drops.',
    alternatives: ['Ammonium Persulfate', 'Copper No. 2', 'ASTM No. 30'],
    similar: ['ASTM No. 30 (same chemistry, PACE alternate SKU)'],
    astm: ['ASTM E407 #29', 'ASTM E407 #30'],
  },

  'berahas-reagent': {
    displayName: "Beraha's Reagent",
    sds: [
      ['Sodium thiosulfate', '7772-98-7', '5–15%', 'Yes'],
      ['Potassium metabisulfite', '16731-55-5', '2–5%', 'Yes'],
      ['Water', '7732-18-5', '85–95%', 'No'],
    ],
    method: 'Immersion',
    time: '30–120 s',
    tags: ['carbon-steel', 'low-alloy-steel', 'tool-steel', 'color-etching', 'tint'],
    reveals: 'Color tinting of ferrite, pearlite, martensite, bainite, and retained austenite (orientation- and composition-dependent)',
    typical: "Beraha's tint etchant — sodium thiosulfate + potassium metabisulfite in water. More dilute than Klemm's (5–15% thiosulfate vs 25–50%); gives finer, slower-developing color contrast. Used on carbon and low-alloy steels for Q&T microstructure visualization — distinguishes ferrite (cyan/orange) from martensite (brown) from bainite (intermediate), with retained austenite remaining unstained.",
    app_notes: 'Polish to 0.05 µm or VibroMet. Immerse 30–120 s — watch in real time and pull when contrast is sharpest. Rinse with water then ethanol; air-dry only (no compressed air — re-deposits residue).',
    troubleshooting: 'The polish must be perfect — any scratch shows as a colored line. Over-developed — repolish with 0.3 µm and re-etch shorter. Slower than Klemm\'s — extend time rather than concentrating.',
    storage: 'Amber glass, refrigerated. Stable a few weeks; discard when cloudy.',
    alternatives: ["Klemm's Reagent (more aggressive thiosulfate)", "Weck's Etch (Al/Mg)", 'Lichtenegger-Bloech'],
    similar: ["Klemm's Reagent"],
    astm: ['ASTM E407'],
  },

  'barkers-reagent-electrolytic': {
    method: 'Electrolytic anodizing',
    time: '30–120 s at 20–30 V DC',
    tags: ['aluminum', 'aluminum-alloy', 'color-etching', 'electrolytic', 'polarized-light'],
    reveals: 'Grain orientation contrast under polarized light — the anodic film thickness varies with crystal orientation, producing strong color separation between grains',
    typical: 'The best aluminum grain-structure etchant for wrought and cast alloys. Builds a transparent anodic film whose interference color in polarized light depends on grain orientation. Standard for grain-size measurement in 1xxx through 7xxx alloys and Al castings.',
    app_notes: 'Sample anode; aluminum or stainless cathode. Apply 20–30 V DC at ~0.2 A/cm² for 30–120 s in 5 mL HBF4 + 200 mL H2O. Rinse with water. View under polarized light with a sensitive tint plate (lambda plate).',
    troubleshooting: 'Colors only visible under polarized light + sensitive tint plate. Under-etch — film too thin, weak colors; increase voltage or time. Over-etch — film burns and pits; reduce voltage.',
    storage: 'PE bottle. Contains HBF4 — store cool, separate from acids and bases.',
    alternatives: ["Keller's Reagent", '0.5% HF'],
    similar: ['Anodizing-type electrolytic etches'],
    astm: ['ASTM E407 #5'],
  },

  'chromic-acid-electrolytic': {
    method: 'Electrolytic',
    time: '30–120 s at 6 V DC',
    tags: ['stainless-steel', 'electrolytic', 'austenitic-stainless', 'sensitization-test'],
    reveals: 'Grain boundaries; Cr-rich carbides at sensitized boundaries; sigma phase',
    typical: 'Electrolytic chromic acid (10% CrO3) for stainless steels. Alternative to 10% oxalic for sensitization screening; gentler attack and better for sigma-phase identification. CARCINOGENIC (hexavalent chromium) — use only with full containment.',
    app_notes: 'Sample anode; stainless cathode. Apply 6 V DC at 0.1–1 A/cm² for 30–120 s. Rinse with water and ethanol.',
    troubleshooting: 'Cr(VI) is a known human carcinogen — fume hood and full PPE are mandatory. Dispose of solution and rinsate as regulated waste.',
    storage: 'Glass bottle with tight cap; secondary containment. Stable many months. Hazardous-waste protocol on disposal.',
    alternatives: ['10% Oxalic Acid (Electrolytic)', "Murakami's Reagent (boiling)", 'ASTM No. 97'],
    similar: ['10% Oxalic Acid (Electrolytic)'],
    astm: ['ASTM E407'],
  },

  'cu-pass-sol': {
    displayName: 'Cu-Pass-Sol',
    composition_card_value: 'CuSO₄·5H₂O + H₂SO₄ in water (acidic Cu passivation)',
    composition_card_subvalue: 'PACE recipe — supplied ready-to-use',
    prep_notes_inner:
      '<p class="ingredient-note">PACE Cu-Pass-Sol (part no. CU-PASS-SOL) is supplied ready-to-use. Per-batch recipe (250 mL):</p>' +
      '<table class="ingredient-table">' +
      '<thead><tr><th>Ingredient</th><th>Amount</th></tr></thead>' +
      '<tbody>' +
      '<tr><td>Copper(II) sulfate pentahydrate (CuSO₄·5H₂O)</td><td>40.04 g</td></tr>' +
      '<tr><td>Sulfuric acid (H₂SO₄, concentrated)</td><td>1.5 mL</td></tr>' +
      '<tr><td>Water (diluted to total volume)</td><td>250 mL</td></tr>' +
      '</tbody></table>',
    method: 'Immersion (post-etch passivation)',
    time: '5–10 s',
    tags: ['copper', 'copper-alloy', 'passivation', 'post-etch', 'anti-tarnish'],
    reveals: 'Not an etchant — applied after etching to stabilize the copper surface and prevent tarnishing during examination.',
    typical: 'Cu-Pass-Sol = copper(II) sulfate pentahydrate in dilute sulfuric acid. Classical acidic copper-passivation chemistry — the dissolved Cu²⁺ saturates the surface and inhibits further oxidation of the freshly etched copper during microscopy and short-term storage. Not an etchant; produces no microstructure development on its own.',
    app_notes: 'After etching and water/ethanol rinse, immerse the sample 5–10 s in Cu-Pass-Sol. Rinse briefly with ethanol; air-dry. The acidic chemistry means the sample should already be in a neutral-rinse condition before passivation (rinse off etchant first).',
    troubleshooting: 'Sample tarnishes during examination — passivation was too brief or rinse left water on the surface; redo with a longer Cu-Pass-Sol dip and ethanol-only final rinse.',
    storage: 'Glass bottle at room temperature. Stable many months. Per PACE SDS — acidic content; handle with PPE.',
    alternatives: ['Ethanol-only final rinse (less effective)'],
    similar: ['Acidic copper sulfate passivation chemistry'],
    astm: ['Not applicable (post-etch passivator)'],
  },

  'dichromate-etchant': {
    displayName: 'Dichromate Etchant',
    sds: [
      ['Potassium dichromate', '7778-50-9', '2–5%', 'Yes'],
      ['Sulfuric acid', '7664-93-9', '5–10%', 'Yes'],
      ['Sodium chloride', '7647-14-5', '2–10%', 'Yes'],
      ['Water', '7732-18-5', '80–90%', 'No'],
    ],
    method: 'Immersion or swab',
    time: '5–30 s',
    tags: ['copper', 'copper-alloy', 'brass', 'bronze'],
    reveals: 'Grain boundaries; alpha–beta phases in brass; second-phase contrast in bronze',
    typical: 'Acidified potassium dichromate with NaCl — chromate-sulfuric-chloride etchant for copper alloys, brass, and bronze. The NaCl + dichromate combination is more selective than ammonia-peroxide on some Cu-Zn brasses with phase separation. CARCINOGENIC (Cr(VI)) — full PPE and fume hood required.',
    app_notes: 'Immerse or swab 5–30 s at room temperature. Rinse with water then ethanol; passivate with Cu-Pass-Sol if standing time before imaging.',
    troubleshooting: 'Cr(VI) is a known human carcinogen — full containment required. Dispose of solution and rinsate as regulated waste. Solution darkens with use but remains active for months.',
    storage: 'Glass bottle with tight cap; secondary containment. Hazardous-waste protocol on disposal. Stable many months.',
    alternatives: ['Ammonium Persulfate', 'Copper No. 2', 'Ammonium Hydroxide + H2O2'],
    similar: ['Chromate-based Cu etchants'],
    astm: ['ASTM E407 #41'],
  },

  'glyceregia': {
    method: 'Swab',
    time: '10–60 s',
    tags: ['stainless-steel', 'austenitic-stainless', 'nickel-alloy', 'superalloy', 'sensitization-test'],
    reveals: 'Grain boundaries, carbides, sigma phase, and sensitization-induced ditches in austenitic stainless; grain structure and primary carbides in Inconel, Hastelloy, and other Ni-base superalloys',
    typical: 'Glycerol-modified aqua regia — slower and more controllable than straight aqua regia. The standard general etchant for austenitic stainless steels (304, 316, 321), nickel-base superalloys (Inconel 600/625/718, Hastelloy), and used as part of the ASTM A262 Practice C double-etch sensitization test.',
    app_notes: 'Swab 10–60 s; glycerol slows the reaction so dwell time is hand-controlled. Never immerse — heat builds locally. Rinse with water then ethanol. Use in fume hood.',
    troubleshooting: 'Solution destabilizes within hours of mixing — visible NO2/Cl2 evolution is the warning sign. Prepare same-shift; discard at end of day. Never store overnight.',
    storage: 'DO NOT STORE. Mix immediately before use; discard same-shift. Aqua-regia chemistry generates chlorine gas during decomposition.',
    alternatives: ["Kalling's No. 2", '10% Oxalic Acid (Electrolytic)', "Marble's Reagent"],
    similar: ['Aqua Regia'],
    astm: ['ASTM E407 #87', 'ASTM A262 Practice C'],
  },

  'kellers-reagent': {
    method: 'Immersion',
    time: '8–15 s',
    tags: ['aluminum', 'aluminum-alloy', '2xxx-series', '6xxx-series', '7xxx-series'],
    reveals: 'Grain boundaries; second-phase particles (Al2Cu, Mg2Si, MgZn2); constituent particles; cold-worked vs recrystallized grains',
    typical: 'Standard etchant for wrought aluminum alloys (1xxx through 7xxx). Reveals grain structure and the major intermetallic phases. May leave a Cu-rich stain on 2xxx (Cu-bearing) alloys — switch to 0.5% HF or Graff-Sargent there.',
    app_notes: 'Immerse 8–15 s at room temperature. Swab if needed. Rinse copiously with cold water; never alcohol-rinse aluminum.',
    troubleshooting: 'HF burns may be delayed — keep calcium gluconate gel on hand. PE container only. Staining on 2024/2219/7075 — switch to 0.5% HF.',
    storage: 'PE/PP bottle at room temperature, labeled with HF symbol. Stable many months.',
    alternatives: ['0.5% HF', "Barker's Reagent (Electrolytic)", 'Al-NaOH Etchant'],
    similar: ['0.5% HF'],
    astm: ['ASTM E407 #3'],
  },

  'klemm-s-reagent': {
    displayName: "Klemm's Reagent",
    sds: [
      ['Sodium thiosulfate', '7772-98-7', '25–50%', 'Yes'],
      ['Potassium metabisulfite', '16731-55-5', '5–10%', 'Yes'],
      ['Water', '7732-18-5', '70–85%', 'No'],
    ],
    method: 'Immersion',
    time: '40–120 s',
    tags: ['carbon-steel', 'low-alloy-steel', 'tool-steel', 'brass', 'zinc', 'magnesium', 'color-etching', 'tint'],
    reveals: 'Color tinting of ferrite, pearlite, martensite, bainite, retained austenite (orientation- and composition-dependent); grain and twin contrast in brass and zinc; phase distinction in Mg alloys',
    typical: "Classical Klemm's I — sodium thiosulfate + potassium metabisulfite. The standard tint etchant for steel microstructure visualization. Higher thiosulfate concentration than Beraha's (25–50% vs 5–15%); produces stronger color contrast. Distinguishes ferrite, pearlite, martensite, bainite, and retained austenite by color. Also used on brass, zinc, and magnesium. NOT a stainless-steel tint — use Beraha's or Lichtenegger-Bloech for stainless.",
    app_notes: 'Polish to 0.05 µm or VibroMet. Immerse 40–120 s — watch in real time and pull when contrast is sharpest. Rinse with water then ethanol; air-dry only (no compressed air).',
    troubleshooting: "Polishing scratches show as colored lines — the polish must be perfect. Color over-developed — repolish with 0.3 µm and re-etch shorter. If slow, the thiosulfate has partly oxidized — replace the bottle.",
    storage: 'Amber glass, refrigerated. Stable a few weeks once opened; discard when cloudy or dark.',
    alternatives: ["Beraha's Reagent (more dilute thiosulfate)", "Weck's Etch (Al/Mg)", 'Lichtenegger-Bloech'],
    similar: ["Beraha's Reagent"],
    astm: ['ASTM E407'],
  },

  'marbles-reagent': {
    displayName: "Marble's Reagent",
    sds: [
      ['Hydrogen chloride', '7647-01-0', '10–20%', 'Yes'],
      ['Cupric sulfate', '7758-98-7', '2–10%', 'Yes'],
      ['Water', '7732-18-5', '70–85%', 'No'],
    ],
    method: 'Swab',
    time: '5–60 s',
    tags: ['nickel-alloy', 'superalloy', 'stainless-steel', 'cobalt-alloy', 'inconel'],
    reveals: 'Grain boundaries; primary carbides (MC, M23C6); secondary phases in Ni-base superalloys, austenitic stainless, and Co-base alloys',
    typical: "Classical Marble's reagent — HCl + CuSO4 + water. Workhorse etchant for nickel-base superalloys (Inconel 600/625/718), austenitic stainless, and cobalt-base alloys (Stellite, L-605). Reveals grain structure and primary carbide network. Often paired with an electrolytic gamma-prime etch for full superalloy characterization.",
    app_notes: 'Swab 5–60 s at room temperature. Rinse with water then ethanol.',
    troubleshooting: 'Copper deposit (brownish stain) if dwell too long — repolish with 0.05 µm and re-etch shorter. Solution darkens with use but remains active.',
    storage: 'Amber glass at room temperature. Stable many months.',
    alternatives: ["Kalling's No. 2", 'Glyceregia', 'Inconel Etchant'],
    similar: ["Kalling's No. 2"],
    astm: ['ASTM E407 #29'],
  },

  'modified-krolls-reagent': {
    method: 'Swab',
    time: '5–20 s',
    tags: ['titanium', 'titanium-alloy', 'beta-titanium', 'fine-microstructure'],
    reveals: "Alpha and beta phases in titanium — slower attack than standard Kroll's; finer detail on widmanstatten alpha and beta-Ti microstructures",
    typical: "Diluted (modified) Kroll's for sensitive titanium microstructures — beta-titanium alloys (Ti-15-3, Ti-3Al-8V-6Cr-4Mo-4Zr), fine widmanstatten alpha morphology, and prior-beta grain boundary reveal where standard Kroll's over-etches.",
    app_notes: 'Swab 5–20 s at room temperature. Rinse copiously with water; do not immerse.',
    troubleshooting: "HF safety same as Kroll's — calcium gluconate gel on hand; PE container only. If still over-etching, dilute further with water.",
    storage: 'PE/PP bottle at room temperature, labeled with HF symbol. Stable many months.',
    alternatives: ["Kroll's Reagent", "Ti-AP-16 (attack-polish workflow)"],
    similar: ["Kroll's Reagent"],
    astm: ['ASTM E407'],
  },

  'oberhoffers-reagent': {
    displayName: "Oberhoffer's Reagent",
    composition_card_value: 'FeCl₃ + SnCl₂ + HCl + ethanol + water (two-solution mix)',
    composition_card_subvalue: 'Mix fresh; do not store mixed',
    prep_notes_inner:
      '<p class="ingredient-note">PACE Oberhoffer\'s is supplied as a two-solution kit. Combine equal volumes of Solution A and Solution B immediately before each use — do not store the mixed reagent.</p>' +
      '<table class="ingredient-table">' +
      '<thead><tr><th>Solution</th><th>Recipe (per ~125 mL)</th></tr></thead>' +
      '<tbody>' +
      '<tr><td><strong>Solution A</strong></td><td>120 mL ethanol &middot; 5 mL DI water &middot; 7.2 g ferric chloride (FeCl₃) &middot; 0.12 g stannous chloride (SnCl₂)</td></tr>' +
      '<tr><td><strong>Solution B</strong></td><td>115 mL DI water &middot; 10 mL hydrochloric acid (HCl)</td></tr>' +
      '</tbody></table>' +
      '<p class="ingredient-note">The SnCl₂ in Solution A is what produces the phosphorus selectivity. Use the combined solution within minutes of mixing.</p>',
    method: 'Immersion (mixed fresh)',
    time: '60–180 s',
    tags: ['low-carbon-steel', 'cast-iron', 'phosphorus-segregation', 'ghost-bands', 'macro-segregation'],
    reveals: 'Phosphorus segregation patterns (ghost banding, dendritic segregation); primary solidification structure in as-cast and as-forged low-carbon steels and irons',
    typical: "Classical Oberhoffer's reagent — the specialty etchant for revealing phosphorus segregation in low-carbon steels, cast irons, and as-forged sections. Supplied as a two-solution kit (FeCl₃ + SnCl₂ in ethanol/water plus HCl/water) that must be combined immediately before use. The SnCl₂ is what selectively attacks high-P regions, leaving low-P \"ghost\" bands light.",
    app_notes: 'Combine equal volumes of Solution A and Solution B immediately before use. Immerse the polished surface 60–180 s at room temperature. Swab very gently if needed. Rinse with water then ethanol.',
    troubleshooting: "SnCl₂ oxidizes over time — always use a freshly mixed solution. Ghost banding is only visible on as-cast or as-forged structures with segregation present; fully wrought, recrystallized steel shows no Oberhoffer contrast — that confirms uniform composition, not etch failure.",
    storage: 'DO NOT STORE the combined reagent. Solutions A and B may be stored individually in amber glass at room temperature. Mix only the volume needed for the session.',
    alternatives: ["Klemm's Reagent (general tint)", '2% Nital (companion grain etch)'],
    similar: ['Stead-type P-segregation etchants'],
    astm: ['ASTM E407 #43'],
  },

  'vilellas-reagent': {
    method: 'Immersion',
    time: '10–60 s',
    tags: ['martensitic-stainless', 'PH-stainless', 'tool-steel', 'high-speed-steel'],
    reveals: 'Prior austenite grain boundaries; tempered martensite needle structure; carbides (M23C6, MC) in hardened tool and HSS; segregation in PH stainless',
    typical: "Vilella's reagent (1 g picric + 5 mL HCl + 100 mL ethanol) — the standard etchant for martensitic stainless steels (410, 420, 440C), precipitation-hardening stainless (17-4 PH, 15-5 PH), and hardened tool/high-speed steels (M2, T1, D2, A2). Reveals prior austenite grain boundaries cleanly.",
    app_notes: 'Immerse the polished surface 10–60 s at room temperature. Swab if attack is uneven. Rinse with ethanol then water; air-dry.',
    troubleshooting: 'PICRIC ACID — never let the solution dry. Dry picric crystals are shock-sensitive explosives. Keep at least 10% water above any solid at all times.',
    storage: 'Amber glass; keep wet at all times. Inspect monthly and add water if level drops. EXPLOSIVE WHEN DRY. Stable months when wet.',
    alternatives: ["Adler's Etchant (PH stainless)", "Carpenter's (tool steel)", "Winsteard's Reagent (with wetting agent)"],
    similar: ["Winsteard's Reagent"],
    astm: ['ASTM E407 #80', 'ASTM A763'],
  },

  'wecks-etch': {
    method: 'Immersion (warm)',
    time: '30–120 s at 60–80 °C',
    tags: ['aluminum', 'aluminum-alloy', 'magnesium', 'magnesium-alloy', 'zinc', 'color-etching', 'tint'],
    reveals: 'Color-tinted grains in Al, Mg, and Zn alloys (orientation-dependent under polarized light); second-phase particles (Al-Si eutectic, Mg17Al12); grain structure in castings',
    typical: "Weck's color etchant (KMnO4 + NaOH in water) for aluminum, magnesium, and zinc alloys. Particularly effective on cast Al-Si alloys (319, 356, 380) and Mg-Al castings (AZ91, AM60), distinguishing alpha-Mg from Mg17Al12. NOT a stainless etchant — use Beraha's or Klemm's for steels.",
    app_notes: 'Heat solution to 60–80 °C. Immerse polished sample 30–120 s. Rinse with water then ethanol; air-dry only (compressed air re-deposits residue).',
    troubleshooting: 'View under polarized light with a sensitive tint plate to see the orientation color contrast. Over-etch produces uniform dark — repolish and re-etch shorter. KMnO4 stains skin and bench — handle in tray.',
    storage: 'Amber glass at room temperature. Prepare fresh weekly — KMnO4 degrades, especially after heating.',
    alternatives: ["Barker's Reagent (Electrolytic) — Al", "Klemm's Reagent — Mg, Zn"],
    similar: ["Klemm's Reagent", "Barker's Reagent (Electrolytic)"],
    astm: ['ASTM E407'],
  },

  // ASTM E407 #97 is electrolytic alkali (KOH per PACE SDS).
  'astm-no-97': {
    method: 'Electrolytic',
    time: '5–15 s at 1–10 V DC',
    tags: ['stainless-steel', 'duplex-stainless', 'austenitic-stainless', 'sigma-phase', 'electrolytic'],
    reveals: 'Sigma phase (darkened preferentially); ferrite vs austenite contrast in duplex SS; chi phase; carbides',
    typical: 'ASTM E407 #97 — electrolytic KOH for sigma-phase identification in austenitic and duplex stainless steels. Sigma darkens preferentially; ferrite and austenite separate by voltage tuning. The standard etchant for sigma quantification per ASTM A923.',
    app_notes: 'Sample is the anode; stainless cathode. Apply 1–10 V DC for 5–15 s. Lower voltages darken sigma selectively; higher voltages add ferrite/austenite contrast.',
    troubleshooting: 'Strong CAUSTIC — full PPE required. Tune voltage for selectivity: sigma-only at 1–3 V; ferrite + sigma at 6–10 V.',
    storage: 'PE bottle at room temperature. Stable many months.',
    alternatives: ['10% Oxalic Acid (Electrolytic)', "Murakami's Reagent (boiling)"],
    similar: ['10% Oxalic Acid (Electrolytic)'],
    astm: ['ASTM E407 #97', 'ASTM A923'],
  },
};

// =============================================================================
// HTML escaping (data above uses plain text — encode only when emitting)
// =============================================================================

function htmlEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#039;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// =============================================================================
// Section builders
// =============================================================================

function section(title, innerHtml) {
  return `<div class="material-section"><h2 class="section-title">${htmlEscape(title)}</h2><div class="section-content">${innerHtml}</div></div>`;
}

function paraSection(title, text) {
  return section(title, `<p>${htmlEscape(text)}</p>`);
}

function tagListSection(title, items, colorClass) {
  const chips = items.map(it => `<span class="tag ${colorClass}">${htmlEscape(it)}</span>`).join('');
  return section(title, `<div class="tag-list">${chips}</div>`);
}

function bulletListSection(title, items) {
  const lis = items.map(it => `<li>${htmlEscape(it)}</li>`).join('');
  return section(title, `<ul class="applications-list">${lis}</ul>`);
}

function applicationMethodBox(method, time) {
  const wrenchSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>';
  const clockSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
  const titleSvg = '<svg class="section-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>';
  return (
    `<div class="material-section"><h2 class="section-title">${titleSvg}Application Method</h2><div class="section-content">` +
    `<div class="bg-gray-50 rounded-lg p-4 space-y-2">` +
    `<div class="flex items-center gap-2 py-1.5">${wrenchSvg}<span class="text-xs font-medium text-gray-500 uppercase tracking-wide min-w-[140px]">Method:</span><span class="text-sm text-gray-900">${htmlEscape(method)}</span></div>` +
    `<div class="flex items-center gap-2 py-1.5">${clockSvg}<span class="text-xs font-medium text-gray-500 uppercase tracking-wide min-w-[140px]">Typical Time:</span><span class="text-sm text-gray-900">${htmlEscape(time)}</span></div>` +
    `</div></div></div>`
  );
}

function compositionCardValue(sds) {
  // Compact format: "Ingredient1 X–Y%, Ingredient2 X–Y%, …"
  // Drop water from the headline; include up to four main ingredients.
  const main = sds.filter(([name]) => !/^water$/i.test(name)).slice(0, 4);
  return main.map(([name, , pct]) => `${name} ${pct}`).join(', ');
}

function ingredientTableHtml(sds) {
  const rows = sds
    .map(
      ([name, cas, pct, haz]) =>
        `<tr><td>${htmlEscape(name)}</td><td class="col-cas">${htmlEscape(cas)}</td><td class="col-pct">${htmlEscape(pct)}</td><td class="haz-${haz === 'Yes' ? 'yes' : 'no'}">${htmlEscape(haz)}</td></tr>`
    )
    .join('');
  return (
    `<table class="ingredient-table">` +
    `<thead><tr><th>Ingredient</th><th class="col-cas">CAS No.</th><th class="col-pct">%</th><th>Hazardous</th></tr></thead>` +
    `<tbody>${rows}</tbody>` +
    `</table>`
  );
}

function prepNotesBlock(displayName, sds) {
  const note = `PACE ${displayName} is supplied ready-to-use. Composition (by weight):`;
  const inner = `<p class="ingredient-note">${htmlEscape(note)}</p>${ingredientTableHtml(sds)}`;
  return `<div class="material-section"><h2 class="section-title">Preparation Notes</h2><div class="section-content">${inner}</div></div>`;
}

// =============================================================================
// HTML transformations
// =============================================================================

function updateMethodCard(html, methodText) {
  return html.replace(
    /(<span class="etchant-info-label">Method<\/span>\s*<\/div>\s*<p class="etchant-info-value">)[^<]*(<\/p>)/,
    `$1${htmlEscape(methodText)}$2`
  );
}

function updateTimeCard(html, timeText) {
  return html.replace(
    /(<span class="etchant-info-label">Time<\/span>\s*<\/div>\s*<p class="etchant-info-value">)[^<]*(<\/p>)/,
    `$1${htmlEscape(timeText)}$2`
  );
}

function updateCompositionCardFromSds(html, sds) {
  return updateCompositionCardRaw(html, compositionCardValue(sds), 'PACE product, by weight');
}

function updateCompositionCardRaw(html, value, subvalue) {
  html = html.replace(
    /(<span class="etchant-info-label">Composition<\/span>[\s\S]{0,400}?<p class="etchant-info-value">)[^<]*(<\/p>)/,
    `$1${htmlEscape(value)}$2`
  );
  html = html.replace(
    /(<span class="etchant-info-label">Composition<\/span>[\s\S]{0,800}?<p class="etchant-info-subvalue">)[^<]*(<\/p>)/,
    `$1${htmlEscape(subvalue)}$2`
  );
  return html;
}

// Given the index of the start of an opening <div>, find the index where its
// matching </div> begins. Balanced-depth scan; handles nested divs cleanly.
function findMatchingClose(html, openIdx) {
  const re = /<div\b|<\/div>/g;
  re.lastIndex = openIdx;
  let depth = 0;
  let match;
  while ((match = re.exec(html)) !== null) {
    if (match[0] === '</div>') {
      depth--;
      if (depth === 0) return match.index;
    } else {
      depth++;
    }
  }
  return -1;
}

function extractSectionBlock(html, title) {
  const openTag = '<div class="material-section">';
  let idx = 0;
  while ((idx = html.indexOf(openTag, idx)) !== -1) {
    const h2EndIdx = html.indexOf('</h2>', idx);
    if (h2EndIdx === -1) return null;
    if (html.slice(h2EndIdx - title.length, h2EndIdx) === title) {
      const closeIdx = findMatchingClose(html, idx);
      if (closeIdx === -1) return null;
      return html.slice(idx, closeIdx + '</div>'.length);
    }
    idx += openTag.length;
  }
  return null;
}

function replaceTabInner(html, tabId, newInner) {
  const openTagStart = `<div id="${tabId}" class="tab-content`;
  const openIdx = html.indexOf(openTagStart);
  if (openIdx === -1) return html;
  const tagEndIdx = html.indexOf('>', openIdx);
  if (tagEndIdx === -1) return html;
  const closeIdx = findMatchingClose(html, openIdx);
  if (closeIdx === -1) return html;
  return html.slice(0, tagEndIdx + 1) + newInner + html.slice(closeIdx);
}

// =============================================================================
// Per-file rewrite
// =============================================================================

function rewriteFile(filename, data) {
  const fp = path.join(ETCHANTS_DIR, `${filename}.html`);
  if (!fs.existsSync(fp)) {
    console.log(`MISSING: ${fp}`);
    return false;
  }
  const buf = fs.readFileSync(fp);
  const hasBOM = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
  let html = (hasBOM ? buf.slice(3) : buf).toString('utf8');
  const before = html;

  // Quick Info cards
  html = updateMethodCard(html, data.method);
  html = updateTimeCard(html, data.time);
  if (data.composition_card_value) {
    html = updateCompositionCardRaw(html, data.composition_card_value, data.composition_card_subvalue || 'PACE product');
  } else if (data.sds) {
    html = updateCompositionCardFromSds(html, data.sds);
  }

  // Overview tab — preserve Alternative Names; rebuild the rest
  const altNamesBlock = extractSectionBlock(html, 'Alternative Names') || '';
  const overviewInner =
    altNamesBlock +
    tagListSection('Tags', data.tags, 'tag-blue') +
    paraSection('Reveals', data.reveals) +
    paraSection('Typical Results', data.typical);
  html = replaceTabInner(html, 'tab-overview', overviewInner);

  // Application tab — Application Method box + Preparation Notes + Notes + Troubleshooting
  // Preparation Notes precedence:
  //   1. prep_notes_inner (custom HTML, e.g., two-solution recipes)
  //   2. sds (generates standard ingredient table)
  //   3. extract existing (preserve)
  let prepBlock;
  if (data.prep_notes_inner) {
    prepBlock = `<div class="material-section"><h2 class="section-title">Preparation Notes</h2><div class="section-content">${data.prep_notes_inner}</div></div>`;
  } else if (data.sds) {
    prepBlock = prepNotesBlock(data.displayName, data.sds);
  } else {
    prepBlock = extractSectionBlock(html, 'Preparation Notes') || '';
  }
  const applicationInner =
    applicationMethodBox(data.method, data.time) +
    prepBlock +
    section('Application Notes', `<div>${htmlEscape(data.app_notes)}</div>`) +
    section('Troubleshooting', `<div>${htmlEscape(data.troubleshooting)}</div>`);
  html = replaceTabInner(html, 'tab-application', applicationInner);

  // Safety tab — Storage Notes only
  const safetyInner = section('Storage Notes', `<div>${htmlEscape(data.storage)}</div>`);
  html = replaceTabInner(html, 'tab-safety', safetyInner);

  // Alternatives tab
  const alternativesInner =
    bulletListSection('Alternative Etchants', data.alternatives) +
    bulletListSection('Similar Etchants', data.similar) +
    tagListSection('ASTM References', data.astm, 'tag-blue');
  html = replaceTabInner(html, 'tab-alternatives', alternativesInner);

  if (html === before) {
    console.log(`unchanged: ${filename}`);
    return false;
  }

  if (APPLY) {
    const out = hasBOM
      ? Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(html, 'utf8')])
      : Buffer.from(html, 'utf8');
    fs.writeFileSync(fp, out);
    console.log(`wrote: ${filename}`);
  } else {
    console.log(`would write: ${filename}  (${before.length} → ${html.length} bytes)`);
  }
  return true;
}

// =============================================================================
// Main
// =============================================================================

function main() {
  const entries = Object.entries(DATA);
  console.log(`${APPLY ? 'APPLY' : 'DRY RUN'} — ${entries.length} etchants${ONLY ? ` (filtered: ${ONLY})` : ''}`);
  let n = 0;
  for (const [name, data] of entries) {
    if (ONLY && name !== ONLY) continue;
    if (rewriteFile(name, data)) n++;
  }
  console.log(`done — ${n} file(s) ${APPLY ? 'written' : 'would change'}`);
}

main();
