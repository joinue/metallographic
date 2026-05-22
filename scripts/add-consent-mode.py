"""Inject Google Consent Mode v2 defaults into the gtag head snippet across all site pages.

Default consent is granted globally and denied for EU/UK/EEA/Switzerland visitors
until they opt in via the cookie banner. The cookie banner (js/scripts.js) calls
gtag('consent', 'update', ...) when the user accepts.

Idempotent: skips files that already contain gtag('consent', 'default', ...).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Directories under ROOT to skip entirely
SKIP_DIR_PREFIXES = (
    "_nav_footer_rollout_backups",
    "node_modules",
    ".git",
    "metallography.org",  # separate Next.js sub-app, not the main static site
    "scripts",
)

PATTERN = re.compile(
    r"^(?P<indent>[ \t]*)gtag\('js', new Date\(\)\);",
    re.MULTILINE,
)


def build_block(indent: str) -> str:
    return (
        f"{indent}// Consent Mode v2: default granted globally; denied for EU/UK/EEA/CH until opt-in\n"
        f"{indent}gtag('consent', 'default', {{\n"
        f"{indent}  ad_storage: 'granted',\n"
        f"{indent}  ad_user_data: 'granted',\n"
        f"{indent}  ad_personalization: 'granted',\n"
        f"{indent}  analytics_storage: 'granted'\n"
        f"{indent}}});\n"
        f"{indent}gtag('consent', 'default', {{\n"
        f"{indent}  ad_storage: 'denied',\n"
        f"{indent}  ad_user_data: 'denied',\n"
        f"{indent}  ad_personalization: 'denied',\n"
        f"{indent}  analytics_storage: 'denied',\n"
        f"{indent}  wait_for_update: 500,\n"
        f"{indent}  region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']\n"
        f"{indent}}});\n"
    )


def should_skip(path: Path) -> bool:
    rel_parts = path.relative_to(ROOT).parts
    return any(p.startswith(SKIP_DIR_PREFIXES) for p in rel_parts)


def process_file(path: Path, dry_run: bool) -> str:
    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        content = path.read_text(encoding="latin-1")

    if "G-VQ62KENYY5" not in content:
        return "no-ga"

    if "gtag('consent', 'default'" in content:
        return "already-done"

    match = PATTERN.search(content)
    if not match:
        return "no-match"

    indent = match.group("indent")
    block = build_block(indent)
    new_content = content[: match.start()] + block + content[match.start():]

    if not dry_run:
        # Preserve original line endings
        newline = "\r\n" if "\r\n" in content[:4096] else "\n"
        path.write_text(new_content, encoding="utf-8", newline=newline)
    return "updated"


def main() -> int:
    dry_run = "--dry-run" in sys.argv
    only = None
    for arg in sys.argv[1:]:
        if arg.startswith("--only="):
            only = ROOT / arg.split("=", 1)[1]

    counts = {"updated": 0, "already-done": 0, "no-match": 0, "no-ga": 0, "skipped": 0}
    no_match_files: list[Path] = []

    targets = [only] if only else list(ROOT.rglob("*.html")) + list(ROOT.rglob("*.htm"))

    for path in targets:
        if only is None and should_skip(path):
            counts["skipped"] += 1
            continue
        result = process_file(path, dry_run)
        counts[result] += 1
        if result == "no-match":
            no_match_files.append(path)

    print(f"{'DRY RUN: ' if dry_run else ''}Results:")
    for k, v in counts.items():
        print(f"  {k}: {v}")
    if no_match_files:
        print("\nFiles with no gtag('js', ...) match:")
        for p in no_match_files[:20]:
            print(f"  {p.relative_to(ROOT)}")
        if len(no_match_files) > 20:
            print(f"  ... and {len(no_match_files) - 20} more")
    return 0


if __name__ == "__main__":
    sys.exit(main())
