$ErrorActionPreference = 'Stop'
$baseUrl = 'https://www.metallographic.com'
$root = 'n:\Sales & Marketing\web\metallographic-2026\guides'
$today = '2026-05-20'
$LF = "`n"
$logoUrl = "$baseUrl/images/metallographic-logo-microstructures.png"

# Application-specific guides
$guides = @(
    @{ File='failure-analysis.html';                          Image='/images/microstructures/Intergrannular-fracture-2.jpg';   AboutName='Failure analysis';            AboutUrl='https://en.wikipedia.org/wiki/Failure_analysis';            Mentions=@(@{N='Fracture';                  U='https://en.wikipedia.org/wiki/Fracture'},                    @{N='Stress corrosion cracking';      U='https://en.wikipedia.org/wiki/Stress_corrosion_cracking'},  @{N='Metallography';             U='https://en.wikipedia.org/wiki/Metallography'}) },
    @{ File='industrial-process-mineral-metallography.html';  Image='/images/microstructures/CuFeS2-Mo.jpg';                   AboutName='Mineralogy';                  AboutUrl='https://en.wikipedia.org/wiki/Mineralogy';                  Mentions=@(@{N='Ore';                       U='https://en.wikipedia.org/wiki/Ore'},                          @{N='Pyrite';                         U='https://en.wikipedia.org/wiki/Pyrite'},                     @{N='Chalcopyrite';              U='https://en.wikipedia.org/wiki/Chalcopyrite'}) },
    @{ File='castings-foundry-analysis.html';                 Image='/images/microstructures/Dendrites-2.jpg';                 AboutName='Casting (metalworking)';      AboutUrl='https://en.wikipedia.org/wiki/Casting_(metalworking)';      Mentions=@(@{N='Foundry';                   U='https://en.wikipedia.org/wiki/Foundry'},                      @{N='Metallography';                  U='https://en.wikipedia.org/wiki/Metallography'},              @{N='Microstructure';            U='https://en.wikipedia.org/wiki/Microstructure'}) },
    @{ File='hardness-testing-preparation.html';              Image='/videos/process/hardness-testing-poster.webp';            AboutName='Hardness';                    AboutUrl='https://en.wikipedia.org/wiki/Hardness';                    Mentions=@(@{N='Vickers hardness test';     U='https://en.wikipedia.org/wiki/Vickers_hardness_test'},        @{N='Rockwell scale';                 U='https://en.wikipedia.org/wiki/Rockwell_scale'},             @{N='Brinell scale';             U='https://en.wikipedia.org/wiki/Brinell_scale'}) },
    @{ File='heat-treatment-verification.html';               Image='/images/microstructures/Decarb-in-steel-200X-2.jpg';      AboutName='Heat treating';               AboutUrl='https://en.wikipedia.org/wiki/Heat_treating';               Mentions=@(@{N='Carburizing';               U='https://en.wikipedia.org/wiki/Carburizing'},                  @{N='Decarburization';                U='https://en.wikipedia.org/wiki/Decarburization'},            @{N='Annealing (metallurgy)';    U='https://en.wikipedia.org/wiki/Annealing_(metallurgy)'}) },
    @{ File='quality-control-inspection.html';                Image='/images/microstructures/Inclusion-Sulfides-2.jpg';        AboutName='Quality control';             AboutUrl='https://en.wikipedia.org/wiki/Quality_control';             Mentions=@(@{N='Metallography';             U='https://en.wikipedia.org/wiki/Metallography'},                @{N='ASTM International';             U='https://en.wikipedia.org/wiki/ASTM_International'},         @{N='ISO 9000';                  U='https://en.wikipedia.org/wiki/ISO_9000'}) },
    @{ File='welding-analysis.html';                          Image='/images/microstructures/HAZ-sensitization-500X-2.jpg';    AboutName='Welding';                     AboutUrl='https://en.wikipedia.org/wiki/Welding';                     Mentions=@(@{N='Heat-affected zone';        U='https://en.wikipedia.org/wiki/Heat-affected_zone'},           @{N='Fusion welding';                 U='https://en.wikipedia.org/wiki/Fusion_welding'},             @{N='Metallography';             U='https://en.wikipedia.org/wiki/Metallography'}) },
    @{ File='additive-manufacturing-preparation.html';        Image='/images/microstructures/Powder-metals.png';               AboutName='3D printing';                 AboutUrl='https://en.wikipedia.org/wiki/3D_printing';                 Mentions=@(@{N='Selective laser melting';   U='https://en.wikipedia.org/wiki/Selective_laser_melting'},      @{N='Powder bed fusion';              U='https://en.wikipedia.org/wiki/Powder_bed_fusion'},          @{N='Porosity';                  U='https://en.wikipedia.org/wiki/Porosity'}) },
    @{ File='aerospace-applications.html';                    Image='/images/microstructures/Hastelloy-adlers-etch-200X-DIC.jpg'; AboutName='Aerospace engineering';    AboutUrl='https://en.wikipedia.org/wiki/Aerospace_engineering';       Mentions=@(@{N='Superalloy';                U='https://en.wikipedia.org/wiki/Superalloy'},                   @{N='Titanium alloys';                U='https://en.wikipedia.org/wiki/Titanium_alloys'},            @{N='Inconel';                   U='https://en.wikipedia.org/wiki/Inconel'}) },
    @{ File='automotive-applications.html';                   Image='/images/microstructures/6061-Aluminum.jpg';               AboutName='Automotive industry';         AboutUrl='https://en.wikipedia.org/wiki/Automotive_industry';         Mentions=@(@{N='Aluminium alloy';           U='https://en.wikipedia.org/wiki/Aluminium_alloy'},              @{N='Cast iron';                      U='https://en.wikipedia.org/wiki/Cast_iron'},                  @{N='Heat treating';             U='https://en.wikipedia.org/wiki/Heat_treating'}) },
    @{ File='medical-device-applications.html';               Image='/images/microstructures/Ti6Al4V.jpg';                     AboutName='Medical device';              AboutUrl='https://en.wikipedia.org/wiki/Medical_device';              Mentions=@(@{N='Biomaterial';               U='https://en.wikipedia.org/wiki/Biomaterial'},                  @{N='Titanium';                       U='https://en.wikipedia.org/wiki/Titanium'},                   @{N='Stainless steel';           U='https://en.wikipedia.org/wiki/Stainless_steel'}) },
    @{ File='pcb-chip-preparation.html';                      Image='/images/microstructures/ComputerChip.jpg';                AboutName='Printed circuit board';       AboutUrl='https://en.wikipedia.org/wiki/Printed_circuit_board';       Mentions=@(@{N='Integrated circuit';        U='https://en.wikipedia.org/wiki/Integrated_circuit'},           @{N='Solder';                         U='https://en.wikipedia.org/wiki/Solder'},                     @{N='Wafer (electronics)';       U='https://en.wikipedia.org/wiki/Wafer_(electronics)'}) }
)

# === Add image: lines to data entries in guides.js for application guides that don't have one ===
$guidesJs = 'n:\Sales & Marketing\web\metallographic-2026\js\guides.js'
$gjsContent = [System.IO.File]::ReadAllText($guidesJs)
$gjsAdditions = @(
    @{ Slug='failure-analysis';                       Image='/images/microstructures/Intergrannular-fracture-2.jpg' },
    @{ Slug='industrial-process-mineral-metallography'; Image='/images/microstructures/CuFeS2-Mo.jpg' },
    @{ Slug='castings-foundry-analysis';              Image='/images/microstructures/Dendrites-2.jpg' },
    @{ Slug='heat-treatment-verification';            Image='/images/microstructures/Decarb-in-steel-200X-2.jpg' },
    @{ Slug='quality-control-inspection';             Image='/images/microstructures/Inclusion-Sulfides-2.jpg' },
    @{ Slug='welding-analysis';                       Image='/images/microstructures/HAZ-sensitization-500X-2.jpg' },
    @{ Slug='additive-manufacturing-preparation';     Image='/images/microstructures/Powder-metals.png' },
    @{ Slug='aerospace-applications';                 Image='/images/microstructures/Hastelloy-adlers-etch-200X-DIC.jpg' },
    @{ Slug='automotive-applications';                Image='/images/microstructures/6061-Aluminum.jpg' },
    @{ Slug='medical-device-applications';            Image='/images/microstructures/Ti6Al4V.jpg' },
    @{ Slug='pcb-chip-preparation';                   Image='/images/microstructures/ComputerChip.jpg' }
)
foreach ($a in $gjsAdditions) {
    $old = "    slug: '$($a.Slug)',"
    $new = $old + $LF + "    image: '$($a.Image)',"
    if ($gjsContent.Contains($old) -and -not $gjsContent.Contains($new)) {
        $gjsContent = $gjsContent.Replace($old, $new)
        Write-Host "  guides.js: added image for $($a.Slug)"
    } else {
        Write-Host "  guides.js: skipped $($a.Slug) (already present or slug not found)"
    }
}
[System.IO.File]::WriteAllText($guidesJs, $gjsContent, [System.Text.UTF8Encoding]::new($false))

# === Per-page updates ===
foreach ($g in $guides) {
    $path = Join-Path $root $g.File
    if (-not (Test-Path $path)) {
        Write-Warning "MISSING FILE: $path"
        continue
    }
    $content = [System.IO.File]::ReadAllText($path)
    $changed = $false

    # 1. og:image + twitter:image
    $imageUrl = "$baseUrl$($g.Image)"
    $oldOg = "<meta property=`"og:image`" content=`"$logoUrl`">"
    $newOg = "<meta property=`"og:image`" content=`"$imageUrl`">"
    if ($content.Contains($oldOg)) { $content = $content.Replace($oldOg, $newOg); $changed = $true }

    $oldTw = "<meta name=`"twitter:image`" content=`"$logoUrl`">"
    $newTw = "<meta name=`"twitter:image`" content=`"$imageUrl`">"
    if ($content.Contains($oldTw)) { $content = $content.Replace($oldTw, $newTw); $changed = $true }

    # 2. @type Article -> TechArticle (regex with \r?\n to handle mixed line endings)
    $typePattern = '"@type": "Article",(\r?\n\s+"headline")'
    if ([regex]::IsMatch($content, $typePattern)) {
        $content = [regex]::Replace($content, $typePattern, '"@type": "TechArticle",$1')
        $changed = $true
    }

    # 3. Closing block: replace datePublished + dateModified with expanded version
    $newClosingLines = @()
    $newClosingLines += '      "datePublished": "2024-01-01",'
    $newClosingLines += "      `"dateModified`": `"$today`","
    $newClosingLines += "      `"image`": `"$imageUrl`","
    $newClosingLines += '      "about": {'
    $newClosingLines += '        "@type": "Thing",'
    $newClosingLines += "        `"name`": `"$($g.AboutName)`","
    $newClosingLines += "        `"sameAs`": `"$($g.AboutUrl)`""
    $newClosingLines += '      },'
    $newClosingLines += '      "mentions": ['
    $mentionLines = @()
    foreach ($m in $g.Mentions) {
        $mentionLines += "        {`"@type`": `"Thing`", `"name`": `"$($m.N)`", `"sameAs`": `"$($m.U)`"}"
    }
    $newClosingLines += ($mentionLines -join (',' + $LF))
    $newClosingLines += '      ]'
    $newClosingLines += '    }'
    $newClosing = $newClosingLines -join $LF

    # Use regex to match across LF or CRLF line endings, then do a literal Replace on the matched substring
    $closingPattern = '"datePublished":\s*"2024-01-01",\r?\n\s+"dateModified":\s*"2024-01-01"\r?\n\s+\}'
    $closingMatch = [regex]::Match($content, $closingPattern)
    if ($closingMatch.Success) {
        $content = $content.Replace($closingMatch.Value, $newClosing)
        $changed = $true
    } else {
        Write-Warning "  $($g.File): closing block pattern not found (already updated?)"
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "Updated: $($g.File)"
    } else {
        Write-Host "Unchanged: $($g.File)"
    }
}

Write-Host ""
Write-Host "Done."
