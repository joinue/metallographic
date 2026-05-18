# Materials Database — Rebuild Schema Reference

Additive extension to `materials_rows.csv`. **Existing columns stay** for backwards-compatibility with the current generator and browse page. New columns are populated during the rebuild; the generator is updated to prefer them when present and fall back to the existing columns otherwise.

## New columns

### `hardness_conditions` (JSON array)

One object per supplied/heat-treated condition. Empty fields are omitted (not `null`).

```json
[
  {
    "condition": "Annealed",
    "hb_min": 105, "hb_max": 116,
    "hrb_min": 60, "hrb_max": 68,
    "source": "ASM HB v1, p.197; Carpenter 1018 datasheet 2022"
  },
  {
    "condition": "Hot Rolled",
    "hb_min": 116, "hb_max": 131,
    "source": "ASTM A29/A29M; Cleveland-Cliffs 1018 HR datasheet"
  },
  {
    "condition": "Cold Drawn",
    "hb_min": 156, "hb_max": 167,
    "hrb_min": 82, "hrb_max": 86,
    "source": "ASTM A108; Carpenter 1018 CD datasheet"
  },
  {
    "condition": "Case-Hardened (Carburized)",
    "surface_hrc_min": 58, "surface_hrc_max": 64,
    "core_hb_min": 116, "core_hb_max": 170,
    "note": "Surface hardness depends on case depth and quench; core retains base properties.",
    "source": "ASM HB v4 (Heat Treating); SAE J1268"
  }
]
```

**Allowed numeric fields** (use whichever scale the source reports — don't synthesize conversions unless ASTM E140 is the cited source):

- `hb_min`, `hb_max` — Brinell
- `hrc_min`, `hrc_max` — Rockwell C
- `hrb_min`, `hrb_max` — Rockwell B
- `hra_min`, `hra_max` — Rockwell A (carbides)
- `hv_min`, `hv_max` — Vickers
- `hk_min`, `hk_max` — Knoop
- `mohs_min`, `mohs_max` — Mohs (minerals, ceramics)
- `shore_d_min`, `shore_d_max` — Shore D (polymers only)
- `surface_*` and `core_*` variants for case-hardened/coated materials

**Required:** `condition`, `source`, and at least one numeric pair (or a single `_min == _max`).

### `strength_conditions` (JSON array)

Same shape, for tensile/yield/elongation. One row per condition.

```json
[
  {
    "condition": "Annealed",
    "uts_mpa_min": 340, "uts_mpa_max": 380,
    "ys_mpa_min": 200, "ys_mpa_max": 230,
    "elongation_pct_min": 30,
    "source": "ASM HB v1, p.197"
  },
  {
    "condition": "Cold Drawn",
    "uts_mpa_min": 440, "uts_mpa_max": 540,
    "ys_mpa_min": 370, "ys_mpa_max": 440,
    "elongation_pct_min": 12, "elongation_pct_max": 18,
    "source": "ASTM A108; Carpenter 1018 CD datasheet"
  }
]
```

Numeric fields: `uts_mpa_min/max`, `ys_mpa_min/max`, `elongation_pct_min/max`, `reduction_area_pct_min/max`, `modulus_gpa_min/max`, `impact_j_min/max`.

### `sources` (JSON array)

Rolled-up bibliography for the whole row. Strings, formatted as full citations:

```json
[
  "ASM Handbook, Vol. 1: Properties and Selection: Irons, Steels, and High-Performance Alloys, ASM International, 1990, pp. 195–199.",
  "ASTM A29/A29M-20, Standard Specification for General Requirements for Steel Bars, Carbon and Alloy, Hot-Wrought.",
  "ASTM A108-18, Standard Specification for Steel Bar, Carbon and Alloy, Cold-Finished.",
  "SAE J403:2014, Chemical Compositions of SAE Carbon Steels.",
  "Carpenter Technology, 1018 Carbon Steel Data Sheet, rev. 2022.",
  "Cleveland-Cliffs, AISI 1018 Hot Rolled Carbon Steel Bar Data Sheet, 2023."
]
```

Rendered on the detail page as a numbered "Sources" section. Each `source` field in `hardness_conditions` / `strength_conditions` should reference one of these (by short tag) so per-row attribution and bibliography stay in sync.

## Composition: stay in current free-text column, but tighten format

`composition` stays a string. Format: `Fe-bal, 0.15–0.20 C, 0.60–0.90 Mn, ≤0.040 P, ≤0.050 S (SAE J403)`.

- Ranges with en-dashes, not hyphens (we render in HTML; en-dash is correct typographically).
- Always cite the composition spec at the end.
- For "bal" element, use `Fe-bal` / `Al-bal` / `Ni-bal` etc. rather than dropping it.

## Microstructure: free-text, but written for that specific alloy

Drop the templated short labels like `"Ferrite and pearlite"` shared by 6 materials. Write a 2–4 sentence description specific to the alloy and its typical metallographic appearance, e.g.:

> Hypoeutectoid: ~80% equiaxed ferrite (light) and ~20% pearlite colonies (dark, lamellar) in the as-rolled or annealed condition. Pearlite volume fraction scales with carbon content (~0.18%C ≈ 22% pearlite by lever rule). Cold-drawn bar shows directional ferrite elongation and banded pearlite stringers parallel to the drawing axis.

## Existing columns retained, but rewritten

- `hardness` — keep as one short "typical" string for the card (e.g. `"126 HB (Cold Drawn)"`). Always include the condition in parentheses.
- `hardness_hb` / `hardness_hrc` / `hardness_hv` — keep the single typical value matching `hardness`. Used by the grid card.
- `tensile_strength_mpa`, `yield_strength_mpa` — typical value matching the same condition as `hardness`.
- `temper_condition` — fill with the condition referenced by `hardness` (e.g. `"Cold Drawn"`, `"H1025"`, `"T6"`).
- `material_grade` — formal grade if applicable (e.g. `"UNS G10180"`, `"UNS S17400"`, `"UNS A96061"`).
- `related_material_ids`, `similar_materials` — populate during the rebuild (cross-link within the same category).
- `astm_standards` / `iso_standards` — fill from the sources we cite.

## Composition / class corrections during rebuild

While rewriting a row, also:

- Set `class` to the correct preparation class per [Class Labels](../../js/materials.js#L368-L383). Fix the CFRP/GFRP/Aramid Class-1 errors when those rows are touched.
- Drop rows that aren't materials (MEMS Device, MLCC, "Electronic Component"). Add to the redirect list.
- Rename slugs ending in `-1` to canonical names; record the old → new mapping for redirects.
