"""
Convert post-table "Shop X" buttons into inline "View collection" links beside the H3 above the table.

Pairing rule: each <h3 class="consumables-subtitle"> is paired with the FIRST
<a class="btn-modern btn-modern-primary">Shop ...</a> that appears AFTER it and
BEFORE the next consumables-subtitle H3. If no such button exists, the H3 is left alone.

Usage:
  python convert.py --dry-run file1.html file2.html ...
  python convert.py --apply   file1.html file2.html ...
"""
import argparse
import re
import sys
from pathlib import Path

H3_RE = re.compile(
    r'<h3\s+class="consumables-subtitle"[^>]*>(.*?)</h3>',
    re.DOTALL,
)

# Match a centered Shop button div. Allow any inline style content.
# Captures: full div block, href, button label.
BUTTON_RE = re.compile(
    r'<div\s+style="[^"]*">\s*'
    r'<a\s+href="([^"]+)"\s+class="btn-modern btn-modern-primary"[^>]*>'
    r'(Shop[^<]*)</a>\s*'
    r'</div>',
    re.DOTALL,
)


def find_pairs(content: str, skip_h3_re=None):
    """Return list of (h3_match, h3_text, button_match, button_href, button_label)
    for every H3 that has a matching button before the next H3.

    H3s whose inner text matches skip_h3_re are excluded.
    """
    h3_matches = list(H3_RE.finditer(content))
    pairs = []
    for i, h3 in enumerate(h3_matches):
        h3_text = h3.group(1).strip()
        if skip_h3_re and skip_h3_re.search(h3_text):
            continue
        search_start = h3.end()
        search_end = h3_matches[i + 1].start() if i + 1 < len(h3_matches) else len(content)
        window = content[search_start:search_end]
        btn = BUTTON_RE.search(window)
        if btn:
            # Adjust button match positions to absolute positions in content.
            abs_btn_start = search_start + btn.start()
            abs_btn_end = search_start + btn.end()
            pairs.append({
                "h3_start": h3.start(),
                "h3_end": h3.end(),
                "h3_text": h3_text,
                "btn_start": abs_btn_start,
                "btn_end": abs_btn_end,
                "btn_href": btn.group(1),
                "btn_label": btn.group(2),
            })
    return pairs


def rewrite(content: str, pairs):
    """Apply replacements. We process in reverse order so positions stay valid."""
    new_content = content
    for p in reversed(pairs):
        # Build the new H3 row.
        new_h3 = (
            '<div class="consumables-subtitle-row">\n'
            f'  <h3 class="consumables-subtitle">{p["h3_text"]}</h3>\n'
            f'  <a href="{p["btn_href"]}" class="collection-link" target="_blank" rel="noopener noreferrer">View collection &rarr;</a>\n'
            '</div>'
        )
        # Delete button div first (it's later in the file, so we delete before patching h3 — but
        # since we iterate reversed, h3 (earlier) is patched after btn (later) which keeps offsets ok).
        # We must delete in reverse-order-of-position. Iterating reversed by pair is OK because
        # within a pair, btn comes after h3, so we should also delete btn first, then patch h3.
        # Delete btn:
        new_content = new_content[: p["btn_start"]] + new_content[p["btn_end"]:]
        # Now also strip a trailing blank line if present, to avoid double-blanks.
        # (Detect a newline + optional whitespace + newline right at p["btn_start"].)
        # Then patch h3:
        new_content = new_content[: p["h3_start"]] + new_h3 + new_content[p["h3_end"]:]
    return new_content


def collapse_blank_runs(content: str) -> str:
    """Collapse runs of 3+ newlines to 2 newlines (avoid double-blank artifacts from deletions)."""
    return re.sub(r'\n{3,}', '\n\n', content)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Write changes to disk")
    ap.add_argument("--dry-run", action="store_true", help="Print summary only")
    ap.add_argument("--skip-h3-regex", default=None, help="Regex matched against H3 inner text; matching H3s are skipped")
    ap.add_argument("files", nargs="+", help="HTML files to convert")
    args = ap.parse_args()
    skip_re = re.compile(args.skip_h3_regex) if args.skip_h3_regex else None

    if args.apply == args.dry_run:
        # Default to dry-run if neither (or both) is set.
        args.dry_run = True
        args.apply = False

    total_pairs = 0
    total_unpaired_h3 = 0
    total_unpaired_btn = 0

    for fpath in args.files:
        p = Path(fpath)
        if not p.exists():
            print(f"!! MISSING: {fpath}")
            continue
        content = p.read_text(encoding="utf-8")
        pairs = find_pairs(content, skip_h3_re=skip_re)
        all_h3 = len(list(H3_RE.finditer(content)))
        all_btn = len(list(BUTTON_RE.finditer(content)))
        unpaired_h3 = all_h3 - len(pairs)
        unpaired_btn = all_btn - len(pairs)
        total_pairs += len(pairs)
        total_unpaired_h3 += unpaired_h3
        total_unpaired_btn += unpaired_btn

        print(f"\n=== {fpath}")
        print(f"  H3s total: {all_h3}  |  Shop buttons total: {all_btn}  |  Paired: {len(pairs)}")
        if unpaired_h3:
            print(f"  ~ {unpaired_h3} H3(s) without a following Shop button (left alone)")
        if unpaired_btn:
            print(f"  ! {unpaired_btn} Shop button(s) with no preceding H3 in scope (LEFT ALONE)")
        for pr in pairs:
            label = pr["btn_label"].strip()
            href = pr["btn_href"]
            short_href = href if len(href) <= 80 else href[:77] + "..."
            print(f"   - \"{pr['h3_text'][:60]}\" -> [{label}] {short_href}")

        if args.apply and pairs:
            new = rewrite(content, pairs)
            new = collapse_blank_runs(new)
            p.write_text(new, encoding="utf-8")
            print(f"  wrote: {fpath}")

    print(f"\n=== TOTAL: {total_pairs} pairs across {len(args.files)} file(s)")
    if total_unpaired_btn:
        print(f"  warning: {total_unpaired_btn} unpaired Shop button(s) across all files")


if __name__ == "__main__":
    main()
