"""
One-off: rewrite the PDF /Title metadata for SDS PDFs whose title was
left as the "CONDUCTO-CUMSDS" template, so browser tabs show a useful name.

Target rule (decided 2026-05-19):
- Touch PDFs in sds/ where existing title is "CONDUCTO-CUMSDS" OR missing.
- New title = filename without extension, with - and _ replaced by spaces,
  whitespace collapsed, then " SDS" appended.
- Leave PDFs that already have a non-template, non-empty title alone.
"""

import re
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter

SDS_DIR = Path(__file__).resolve().parent.parent / "sds"
TEMPLATE_TITLE = "CONDUCTO-CUMSDS"


def derive_title(stem: str) -> str:
    cleaned = re.sub(r"[-_]+", " ", stem)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return f"{cleaned} SDS"


def current_title(reader: PdfReader) -> str | None:
    md = reader.metadata
    if md is None:
        return None
    return md.title


def main() -> int:
    pdfs = sorted(SDS_DIR.glob("*.pdf")) + sorted(SDS_DIR.glob("*.PDF"))
    if not pdfs:
        print(f"No PDFs found in {SDS_DIR}", file=sys.stderr)
        return 1

    fixed = []
    skipped_ok = []
    skipped_err = []

    for pdf in pdfs:
        try:
            reader = PdfReader(str(pdf))
            title = current_title(reader)
        except Exception as e:
            skipped_err.append((pdf.name, f"read failed: {e}"))
            continue

        title_norm = (title or "").strip()
        if title_norm and title_norm != TEMPLATE_TITLE:
            skipped_ok.append((pdf.name, title_norm))
            continue

        new_title = derive_title(pdf.stem)

        try:
            writer = PdfWriter(clone_from=reader)
            existing = dict(reader.metadata or {})
            existing["/Title"] = new_title
            writer.add_metadata(existing)
            tmp = pdf.with_suffix(pdf.suffix + ".tmp")
            with open(tmp, "wb") as f:
                writer.write(f)
            tmp.replace(pdf)
            fixed.append((pdf.name, new_title))
        except Exception as e:
            skipped_err.append((pdf.name, f"write failed: {e}"))

    print(f"Fixed: {len(fixed)}")
    for name, t in fixed:
        print(f"  {name}  ->  {t}")
    print(f"\nLeft alone (had a legit title): {len(skipped_ok)}")
    for name, t in skipped_ok:
        print(f"  {name}  ({t})")
    if skipped_err:
        print(f"\nErrors: {len(skipped_err)}")
        for name, msg in skipped_err:
            print(f"  {name}  -- {msg}")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
