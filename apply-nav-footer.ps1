# Apply canonical navigation.html + footer.html to every HTML page in the site.
#
# What it does, per file:
#   1. Removes any pre-existing <!-- SVG Icon Sprites --> block       (navigation.html now bundles it)
#   2. Removes any pre-existing <!-- Quote Request Modal --> block    (navigation.html now bundles it)
#   3. Replaces the <!-- Navigation --> ... </nav> block               with navigation.html (sprite + nav + modal)
#   4. Replaces the <!-- FOOTER --> ... </footer> block                with footer.html
#   5. Ensures <script src="/js/search-overlay.js" defer></script>     is present before </body>
#
# Safety:
#   - Each modified file is backed up under _nav_footer_rollout_backups\<timestamp>\<relative-path>
#   - Skips _backups, navigation_backups, link_case_backups, materials-prep, node_modules, .git
#   - Skips files that don't have <nav class="navigation"> (reports them)
#   - -DryRun reports what WOULD change without writing anything
#   - -Files lets you restrict to a comma-separated subset (relative paths from $root)
#
# Usage:
#   .\apply-nav-footer.ps1 -DryRun
#   .\apply-nav-footer.ps1 -Files "index.html,equipment.html,consumables.html"
#   .\apply-nav-footer.ps1                  # full rollout

param(
    [switch]$DryRun,
    [string]$Files = ''
)

$ErrorActionPreference = 'Stop'

$root = "N:\Sales & Marketing\web\metallographic-2026"
$navTemplate    = (Get-Content -Path "$root\navigation.html" -Raw).TrimEnd()
$footerTemplate = (Get-Content -Path "$root\footer.html"     -Raw).TrimEnd()

# Patterns ---------------------------------------------------------------
# (?s) = single-line mode (. matches newlines)
$spritePattern = '(?s)<!--\s*SVG Icon Sprites\s*-->\s*<svg[^>]*style="display:\s*none"[^>]*>.*?</svg>\s*'
$modalPattern  = '(?s)<!--\s*Quote Request Modal\s*-->\s*<div id="quote-modal"[^>]*>.*?</section>\s*</div>\s*</div>'
$navPattern    = '(?s)<!--\s*Navigation\s*-->\s*<nav class="navigation"[^>]*>.*?</nav>'
$navOnlyPattern= '(?s)<nav class="navigation"[^>]*>.*?</nav>'   # fallback when the Navigation comment is missing
$footerPattern = '(?s)<!--\s*FOOTER\s*-->.*?</footer>'
$searchScript  = '    <script src="/js/search-overlay.js" defer></script>'

# Discover files ---------------------------------------------------------
$excludeRegex = '\\(navigation_backups|link_case_backups|_nav_footer_rollout_backups|materials-prep|node_modules|\.git)\\'

if ($Files) {
    $targets = $Files.Split(',') | ForEach-Object {
        $p = Join-Path $root $_.Trim()
        if (Test-Path $p) { Get-Item $p } else { Write-Warning "Not found: $_"; $null }
    } | Where-Object { $_ }
} else {
    $targets = Get-ChildItem -Path $root -Recurse -Filter "*.html" |
        Where-Object {
            $_.Name -ne 'navigation.html' -and
            $_.Name -ne 'footer.html'     -and
            $_.FullName -notmatch $excludeRegex
        }
}

# Backup folder ----------------------------------------------------------
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupRoot = Join-Path $root "_nav_footer_rollout_backups\$timestamp"

# Counters ---------------------------------------------------------------
$stats = [ordered]@{
    Scanned        = 0
    Updated        = 0
    NoNavSkipped   = 0
    NoChange       = 0
    SpriteRemoved  = 0
    ModalRemoved   = 0
    NavReplaced    = 0
    NavFallback    = 0
    FooterReplaced = 0
    FooterMissing  = 0
    SearchAdded    = 0
}
$noNavFiles  = New-Object System.Collections.Generic.List[string]
$noFootFiles = New-Object System.Collections.Generic.List[string]

foreach ($file in $targets) {
    $stats.Scanned++
    $rel = $file.FullName.Substring($root.Length + 1)
    $content = Get-Content -Path $file.FullName -Raw
    $orig = $content

    # 0. Must have <nav class="navigation"> somewhere, otherwise skip
    if ($content -notmatch '<nav class="navigation"') {
        $stats.NoNavSkipped++
        $noNavFiles.Add($rel)
        continue
    }

    # All replacements use the MatchEvaluator (scriptblock) form so $-style backrefs in the
    # replacement text (HubSpot script, etc.) aren't interpreted.

    # 1. Remove pre-existing SVG sprite block (navigation.html will re-insert one)
    if ($content -match $spritePattern) {
        $content = [regex]::Replace($content, $spritePattern, { param($m) '' })
        $stats.SpriteRemoved++
    }

    # 2. Remove pre-existing Quote Request modal (navigation.html will re-insert one)
    if ($content -match $modalPattern) {
        $content = [regex]::Replace($content, $modalPattern, { param($m) '' })
        $stats.ModalRemoved++
    }

    # 3. Replace nav block. Prefer the commented form; fall back to bare <nav class="navigation">.
    if ($content -match $navPattern) {
        $content = [regex]::Replace($content, $navPattern, { param($m) $navTemplate })
        $stats.NavReplaced++
    } elseif ($content -match $navOnlyPattern) {
        $content = [regex]::Replace($content, $navOnlyPattern, { param($m) $navTemplate })
        $stats.NavFallback++
    }

    # 4. Replace footer block
    if ($content -match $footerPattern) {
        $content = [regex]::Replace($content, $footerPattern, { param($m) $footerTemplate })
        $stats.FooterReplaced++
    } else {
        $stats.FooterMissing++
        $noFootFiles.Add($rel)
    }

    # 5. Ensure search-overlay.js script tag before </body>
    if ($content -notmatch '<script\s+src="/js/search-overlay\.js"') {
        if ($content -match '</body>') {
            $content = [regex]::Replace($content, '</body>', { param($m) "$searchScript`r`n</body>" }, [System.Text.RegularExpressions.RegexOptions]::None, 1)
            $stats.SearchAdded++
        }
    }

    # Write or report
    if ($content -eq $orig) {
        $stats.NoChange++
        continue
    }

    if ($DryRun) {
        Write-Host "WOULD UPDATE: $rel" -ForegroundColor Cyan
    } else {
        # Backup
        $backupPath = Join-Path $backupRoot $rel
        $backupDir  = Split-Path $backupPath -Parent
        if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir -Force | Out-Null }
        Copy-Item -Path $file.FullName -Destination $backupPath -Force

        # Write file as UTF-8 (no BOM) to match site convention
        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        $stats.Updated++
        Write-Host "Updated: $rel"
    }
}

# Report -----------------------------------------------------------------
Write-Host ""
Write-Host ("=" * 60)
if ($DryRun) { Write-Host "DRY RUN - no files modified" -ForegroundColor Yellow }
Write-Host "Scanned:          $($stats.Scanned)"
Write-Host "Updated:          $($stats.Updated)"
Write-Host "No-change:        $($stats.NoChange)"
Write-Host "Skipped (no nav): $($stats.NoNavSkipped)"
Write-Host ""
Write-Host "Sprite removed:   $($stats.SpriteRemoved)"
Write-Host "Modal removed:    $($stats.ModalRemoved)"
Write-Host "Nav replaced:     $($stats.NavReplaced)"
Write-Host "Nav fallback:     $($stats.NavFallback)  (used bare <nav> match because <!-- Navigation --> was missing)"
Write-Host "Footer replaced:  $($stats.FooterReplaced)"
Write-Host "Footer missing:   $($stats.FooterMissing)"
Write-Host "Search-js added:  $($stats.SearchAdded)"
Write-Host ""
if ($noNavFiles.Count -gt 0) {
    Write-Host "Files with NO nav (need manual review):" -ForegroundColor Yellow
    $noNavFiles | ForEach-Object { Write-Host "  $_" }
}
if (-not $DryRun -and $stats.Updated -gt 0) {
    Write-Host ""
    Write-Host "Backups saved to: $backupRoot" -ForegroundColor Green
}
