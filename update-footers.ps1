# Replace footer on all HTML pages with the canonical footer.html
$root = "N:\Sales & Marketing\web\metallographic-2026"
$footerContent = Get-Content -Path "$root\footer.html" -Raw

$files = Get-ChildItem -Path $root -Recurse -Filter "*.html" |
    Where-Object { $_.Name -ne "footer.html" -and $_.FullName -notmatch "link_case_backups" }

$pattern = '(?s)<!-- FOOTER -->.*?</footer>'
$updated = 0
$skipped = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    if ($content -match '<!-- FOOTER -->') {
        $newContent = [regex]::Replace($content, $pattern, $footerContent.TrimEnd())
        if ($newContent -ne $content) {
            Set-Content -Path $file.FullName -Value $newContent -NoNewline
            $updated++
            Write-Host "Updated: $($file.FullName.Replace($root + '\', ''))"
        } else {
            $skipped++
        }
    } else {
        $skipped++
        Write-Host "SKIPPED (no footer marker): $($file.FullName.Replace($root + '\', ''))"
    }
}

Write-Host "`nDone: $updated files updated, $skipped skipped"
