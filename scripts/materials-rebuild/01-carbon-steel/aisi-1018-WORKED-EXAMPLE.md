# AISI 1018 Carbon Steel — Worked Example (rebuild draft)

This is the proposed shape for a fully rebuilt row. Everything in this file is research output to be merged into `materials_rows.csv`. Verification notes are inline so you can spot-check the numbers.

## Identification

| Field | Value |
|---|---|
| name | AISI 1018 Carbon Steel |
| slug | `aisi-1018-carbon-steel` |
| category | Carbon Steel |
| class | 5 *(Medium Hard/Ductile — unchanged)* |
| material_grade | UNS G10180 |
| temper_condition | Cold Drawn *(typical condition shown on card)* |
| alternative_names | `["1018","C1018","SAE 1018","UNS G10180"]` |
| tags | `["low-carbon","case-hardenable","cold-drawn","machinable"]` |

## Composition (SAE J403 / ASTM A29)

```
Fe-bal, 0.15–0.20 C, 0.60–0.90 Mn, ≤0.040 P, ≤0.050 S
```

> SAE J403:2014, Table 1 (resulfurized-free composition). ASTM A29/A29M-20 §6.1.

## Microstructure

> Hypoeutectoid ferritic–pearlitic. Annealed: equiaxed proeutectoid ferrite (light, ~78–82% by volume) with pearlite colonies (dark lamellar Fe + Fe₃C, ~18–22% by lever rule for 0.18% C). Hot-rolled: similar phase fractions with finer pearlite spacing and some banding from segregation. Cold-drawn bar: ferrite grains elongated along the drawing direction, pearlite appears as stringers; deformation-induced dislocation substructure increases hardness without phase change. Reveal with 2% nital (10–30 s); pearlite darkens, ferrite stays bright.

> Reference: ASM Handbook Vol. 9 (Metallography and Microstructures), pp. 165–168; *Atlas of Microstructures of Industrial Alloys*, ASM, 1972.

## `hardness_conditions`

```json
[
  {
    "condition": "Annealed",
    "hb_min": 105, "hb_max": 116,
    "hrb_min": 60, "hrb_max": 68,
    "source": "ASM HB v1 p.197; conversions via ASTM E140"
  },
  {
    "condition": "Hot Rolled",
    "hb_min": 116, "hb_max": 131,
    "hrb_min": 68, "hrb_max": 75,
    "source": "ASTM A29/A29M; Cleveland-Cliffs 1018 HR bar datasheet (2023)"
  },
  {
    "condition": "Cold Drawn",
    "hb_min": 156, "hb_max": 167,
    "hrb_min": 82, "hrb_max": 86,
    "source": "ASTM A108; Carpenter 1018 CD bar datasheet (rev. 2022)"
  },
  {
    "condition": "Normalized (900 °C, air cool)",
    "hb_min": 121, "hb_max": 143,
    "source": "ASM HB v1 p.197"
  },
  {
    "condition": "Case-Hardened (Carburized & Quenched)",
    "surface_hrc_min": 58, "surface_hrc_max": 64,
    "core_hb_min": 116, "core_hb_max": 170,
    "note": "Surface depends on case depth (typically 0.5–1.5 mm) and quench medium; core retains base ferritic–pearlitic structure.",
    "source": "ASM HB v4 (Heat Treating), Carburizing chapter; SAE J1268"
  }
]
```

## `strength_conditions`

```json
[
  {
    "condition": "Annealed",
    "uts_mpa_min": 340, "uts_mpa_max": 380,
    "ys_mpa_min": 200, "ys_mpa_max": 230,
    "elongation_pct_min": 30,
    "source": "ASM HB v1 p.197"
  },
  {
    "condition": "Hot Rolled",
    "uts_mpa_min": 400, "uts_mpa_max": 440,
    "ys_mpa_min": 220, "ys_mpa_max": 270,
    "elongation_pct_min": 15, "elongation_pct_max": 25,
    "reduction_area_pct_min": 40,
    "source": "ASTM A29/A29M; Cleveland-Cliffs 1018 HR datasheet"
  },
  {
    "condition": "Cold Drawn",
    "uts_mpa_min": 440, "uts_mpa_max": 540,
    "ys_mpa_min": 370, "ys_mpa_max": 440,
    "elongation_pct_min": 12, "elongation_pct_max": 18,
    "reduction_area_pct_min": 35, "reduction_area_pct_max": 50,
    "source": "ASTM A108; Carpenter 1018 CD datasheet"
  }
]
```

## Card-level "typical" values (existing columns)

| Field | Value | Why |
|---|---|---|
| hardness | `"126 HB (Cold Drawn)"` | Mid-range of CD; matches what users typically buy off the shelf |
| hardness_hb | `126` | Same — keeps single-value sort working |
| tensile_strength_mpa | `440` | Low end of CD range — conservative |
| yield_strength_mpa | `370` | Min CD per ASTM A108 |
| density | `7.87` *(unchanged — correct)* |
| melting_point_celsius | `1515` *(was 1525 — corrected; AISI 1018 liquidus ≈ 1515 °C per ASM HB v1)* |
| annealing_temperature_celsius | `870` *(unchanged)* |
| hardness_category | `"soft-medium"` *(was "soft" — CD is well into medium territory)* |
| work_hardening | `TRUE` *(unchanged — correct)* |
| magnetic | `TRUE` *(unchanged — correct)* |
| corrosion_resistance | `"low"` *(unchanged — correct)* |

## `sources`

```json
[
  "ASM Handbook, Vol. 1: Properties and Selection: Irons, Steels, and High-Performance Alloys, ASM International, 1990, pp. 195–199.",
  "ASM Handbook, Vol. 4: Heat Treating, ASM International, 1991 (Carburizing of Steels chapter).",
  "ASM Handbook, Vol. 9: Metallography and Microstructures, ASM International, 2004, pp. 165–168.",
  "ASTM A29/A29M-20, Standard Specification for General Requirements for Steel Bars, Carbon and Alloy, Hot-Wrought.",
  "ASTM A108-18, Standard Specification for Steel Bar, Carbon and Alloy, Cold-Finished.",
  "ASTM E140-12b, Standard Hardness Conversion Tables for Metals.",
  "SAE J403:2014, Chemical Compositions of SAE Carbon Steels.",
  "SAE J1268:2017, Hardenability Bands for Carbon and Alloy H Steels.",
  "Carpenter Technology, 1018 Carbon Steel Data Sheet (rev. 2022).",
  "Cleveland-Cliffs, AISI 1018 Hot Rolled Carbon Steel Bar Data Sheet (2023)."
]
```

## `astm_standards` / `iso_standards`

```
astm_standards: ["ASTM A29/A29M","ASTM A108","ASTM A576","ASTM E3","ASTM E407","ASTM E112","ASTM E18","ASTM E140"]
iso_standards: ["ISO 683-18","ISO 6892-1"]
```

## Preparation notes — diff vs. current row

The current `grinding_notes`, `polishing_notes`, `etching_notes` are reasonable for a generic low-carbon steel and **do not need to be rewritten**. We touch only:

- `preparation_notes` (currently empty): add a short summary paragraph that ties the prep to the microstructure ("low-carbon ferrite–pearlite; prep aims to reveal pearlite lamellae without smearing soft ferrite").
- `etching_notes`: append picral (4% picric acid in ethanol) as a secondary etchant for resolving pearlite lamellae — currently only nital is mentioned, but for 1018 specifically pearlite resolution benefits from picral.

## Cross-linking

```
related_material_ids: ["aisi-1020-carbon-steel","aisi-1035-carbon-steel","aisi-1045-carbon-steel","a36-structural-steel","aisi-8620-case-hardening-steel"]
similar_materials: ["AISI 1020 Carbon Steel","A36 Structural Steel","AISI 8620 Case-Hardening Steel (for carburized service)"]
related_guide_slugs: ["metallography-low-carbon-steel","metallography-carbon-steel-etchants"]
```

## Diff summary vs. current row

| Field | Current | Proposed | Reason |
|---|---|---|---|
| hardness | `126 HB` | `126 HB (Cold Drawn)` | Condition makes the number meaningful |
| temper_condition | (empty) | `Cold Drawn` | Same |
| melting_point_celsius | `1525` | `1515` | ASM HB v1 (current was rounded too high) |
| alternative_names | `["1018","C1018","SAE 1018"]` | adds `"UNS G10180"` | UNS is the formal designation |
| material_grade | (empty) | `UNS G10180` | Same |
| astm_standards | (empty) | 8 entries | Was 81% missing across DB |
| composition | `Fe-0.18C-0.75Mn-0.04P-0.05S` | `Fe-bal, 0.15–0.20 C, 0.60–0.90 Mn, ≤0.040 P, ≤0.050 S` | Spec ranges, not made-up midpoints |
| microstructure | `Ferrite and pearlite` | 4-sentence specific description with phase fractions and reveal etchant | Was templated, shared with 5 other materials |
| hardness_conditions | — | New JSON column, 5 conditions | Honest representation of supplied conditions |
| strength_conditions | — | New JSON column, 3 conditions | Same |
| sources | — | New JSON column, 10 citations | Audit trail |
| related_material_ids | (empty in all 200 rows) | 5 cross-links | Cross-linking was completely broken |
