$ErrorActionPreference = 'Stop'
$baseUrl = 'https://www.metallographic.com'
$root = 'n:\Sales & Marketing\web\metallographic-2026\guides'
$today = '2026-05-20'
$LF = "`n"
$logoUrl = "$baseUrl/images/metallographic-logo-microstructures.png"

# Old closing block to match (uniform across material guides, all at 2024-01-01)
$oldClosing = @(
    '      "datePublished": "2024-01-01",',
    '      "dateModified": "2024-01-01"',
    '    }'
) -join $LF

# Material-specific guide configurations
$guides = @(
    @{ File='stainless-steel-preparation.html';            Image='/images/microstructures/431ss.png';                       AboutName='Stainless steel';                AboutUrl='https://en.wikipedia.org/wiki/Stainless_steel';                Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Microstructure';            U='https://en.wikipedia.org/wiki/Microstructure'},        @{N='Austenitic stainless steel'; U='https://en.wikipedia.org/wiki/Austenitic_stainless_steel'}) },
    @{ File='aluminum-sample-preparation.html';            Image='/images/microstructures/6061-Aluminum.jpg';               AboutName='Aluminium';                      AboutUrl='https://en.wikipedia.org/wiki/Aluminium';                      Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='6061 aluminium alloy';      U='https://en.wikipedia.org/wiki/6061_aluminium_alloy'},  @{N='Microstructure';            U='https://en.wikipedia.org/wiki/Microstructure'}) },
    @{ File='copper-and-copper-alloys-preparation.html';   Image='/images/microstructures/Tough-Pitch-copper-2.jpg';        AboutName='Copper';                         AboutUrl='https://en.wikipedia.org/wiki/Copper';                         Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Brass';                     U='https://en.wikipedia.org/wiki/Brass'},                 @{N='Bronze';                    U='https://en.wikipedia.org/wiki/Bronze'}) },
    @{ File='titanium-preparation.html';                   Image='/images/microstructures/Ti6Al4V.jpg';                     AboutName='Titanium';                       AboutUrl='https://en.wikipedia.org/wiki/Titanium';                       Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Ti-6Al-4V';                 U='https://en.wikipedia.org/wiki/Ti-6Al-4V'},             @{N='Microstructure';            U='https://en.wikipedia.org/wiki/Microstructure'}) },
    @{ File='carbon-steel-preparation.html';               Image='/images/microstructures/1018FC.jpg';                      AboutName='Carbon steel';                   AboutUrl='https://en.wikipedia.org/wiki/Carbon_steel';                   Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Pearlite';                  U='https://en.wikipedia.org/wiki/Pearlite'},              @{N='Martensite';                U='https://en.wikipedia.org/wiki/Martensite'}) },
    @{ File='cast-iron-preparation.html';                  Image='/images/microstructures/CI-nodular-200X-AP-2.jpg';        AboutName='Cast iron';                      AboutUrl='https://en.wikipedia.org/wiki/Cast_iron';                      Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Graphite';                  U='https://en.wikipedia.org/wiki/Graphite'},              @{N='Microstructure';            U='https://en.wikipedia.org/wiki/Microstructure'}) },
    @{ File='tool-steel-preparation.html';                 Image='/images/microstructures/High-alloy-tool-steel.jpg';       AboutName='Tool steel';                     AboutUrl='https://en.wikipedia.org/wiki/Tool_steel';                     Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Carbide';                   U='https://en.wikipedia.org/wiki/Carbide'},               @{N='Hardening (metallurgy)';    U='https://en.wikipedia.org/wiki/Hardening_(metallurgy)'}) },
    @{ File='nickel-alloys-preparation.html';              Image='/images/microstructures/Hastelloy-adlers-etch-200X-DIC.jpg'; AboutName='Superalloy';                  AboutUrl='https://en.wikipedia.org/wiki/Superalloy';                     Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Nickel';                    U='https://en.wikipedia.org/wiki/Nickel'},                @{N='Cobalt';                    U='https://en.wikipedia.org/wiki/Cobalt'}) },
    @{ File='magnesium-preparation.html';                  Image='';                                                        AboutName='Magnesium';                      AboutUrl='https://en.wikipedia.org/wiki/Magnesium';                      Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Magnesium alloy';           U='https://en.wikipedia.org/wiki/Magnesium_alloy'},       @{N='Microstructure';            U='https://en.wikipedia.org/wiki/Microstructure'}) },
    @{ File='ceramics-preparation.html';                   Image='/images/microstructures/Al2O3.jpg';                       AboutName='Ceramic';                        AboutUrl='https://en.wikipedia.org/wiki/Ceramic';                        Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Aluminium oxide';           U='https://en.wikipedia.org/wiki/Aluminium_oxide'},       @{N='Microstructure';            U='https://en.wikipedia.org/wiki/Microstructure'}) },
    @{ File='advanced-technical-ceramics.html';            Image='/images/microstructures/Al2O3.jpg';                       AboutName='Ceramic engineering';            AboutUrl='https://en.wikipedia.org/wiki/Ceramic_engineering';            Mentions=@(@{N='Aluminium oxide';              U='https://en.wikipedia.org/wiki/Aluminium_oxide'},              @{N='Zirconium dioxide';         U='https://en.wikipedia.org/wiki/Zirconium_dioxide'},     @{N='Silicon carbide';           U='https://en.wikipedia.org/wiki/Silicon_carbide'}) },
    @{ File='composites-preparation.html';                 Image='/images/microstructures/carbon-carbon-composite.jpg';     AboutName='Composite material';             AboutUrl='https://en.wikipedia.org/wiki/Composite_material';             Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Carbon fibers';             U='https://en.wikipedia.org/wiki/Carbon_fibers'},         @{N='Microstructure';            U='https://en.wikipedia.org/wiki/Microstructure'}) },
    @{ File='ceramic-matrix-composite-preparation.html';   Image='/images/microstructures/Si3N4-Dia.jpg';                   AboutName='Ceramic matrix composite';       AboutUrl='https://en.wikipedia.org/wiki/Ceramic_matrix_composite';       Mentions=@(@{N='Silicon carbide';              U='https://en.wikipedia.org/wiki/Silicon_carbide'},              @{N='Silicon nitride';           U='https://en.wikipedia.org/wiki/Silicon_nitride'},       @{N='Composite material';        U='https://en.wikipedia.org/wiki/Composite_material'}) },
    @{ File='metal-matrix-composite-preparation.html';     Image='/images/microstructures/Al-silicon.jpg';                  AboutName='Metal matrix composite';         AboutUrl='https://en.wikipedia.org/wiki/Metal_matrix_composite';         Mentions=@(@{N='Silicon carbide';              U='https://en.wikipedia.org/wiki/Silicon_carbide'},              @{N='Aluminium';                 U='https://en.wikipedia.org/wiki/Aluminium'},             @{N='Composite material';        U='https://en.wikipedia.org/wiki/Composite_material'}) },
    @{ File='carbon-carbon-composite-preparation.html';    Image='/images/microstructures/carbon-composite-golf-shaft-2.jpg'; AboutName='Reinforced carbon-carbon';     AboutUrl='https://en.wikipedia.org/wiki/Reinforced_carbon-carbon';       Mentions=@(@{N='Carbon fibers';                U='https://en.wikipedia.org/wiki/Carbon_fibers'},                @{N='Composite material';        U='https://en.wikipedia.org/wiki/Composite_material'}) },
    @{ File='mems-piezoelectric-preparation.html';         Image='/images/microstructures/MEMS-Si-Ni-Au-b.jpg';             AboutName='Microelectromechanical systems'; AboutUrl='https://en.wikipedia.org/wiki/Microelectromechanical_systems'; Mentions=@(@{N='Piezoelectricity';             U='https://en.wikipedia.org/wiki/Piezoelectricity'},             @{N='Lead zirconate titanate';   U='https://en.wikipedia.org/wiki/Lead_zirconate_titanate'}) },
    @{ File='semiconductor-substrate-preparation.html';    Image='/images/microstructures/GaAs.jpg';                        AboutName='Semiconductor';                  AboutUrl='https://en.wikipedia.org/wiki/Semiconductor';                  Mentions=@(@{N='Wafer (electronics)';          U='https://en.wikipedia.org/wiki/Wafer_(electronics)'},          @{N='Silicon';                   U='https://en.wikipedia.org/wiki/Silicon'},               @{N='Gallium arsenide';          U='https://en.wikipedia.org/wiki/Gallium_arsenide'}) },
    @{ File='precious-metals-preparation.html';            Image='';                                                        AboutName='Precious metal';                 AboutUrl='https://en.wikipedia.org/wiki/Precious_metal';                 Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Gold';                      U='https://en.wikipedia.org/wiki/Gold'},                  @{N='Silver';                    U='https://en.wikipedia.org/wiki/Silver'}) },
    @{ File='refractory-metals-preparation.html';          Image='/images/microstructures/Refractory-metals.png';           AboutName='Refractory metals';              AboutUrl='https://en.wikipedia.org/wiki/Refractory_metals';              Mentions=@(@{N='Metallography';                U='https://en.wikipedia.org/wiki/Metallography'},                @{N='Tungsten';                  U='https://en.wikipedia.org/wiki/Tungsten'},              @{N='Molybdenum';                U='https://en.wikipedia.org/wiki/Molybdenum'}) },
    @{ File='powder-metallurgy-preparation.html';          Image='/images/microstructures/Powder-metals.png';               AboutName='Powder metallurgy';              AboutUrl='https://en.wikipedia.org/wiki/Powder_metallurgy';              Mentions=@(@{N='Sintering';                    U='https://en.wikipedia.org/wiki/Sintering'},                    @{N='Porosity';                  U='https://en.wikipedia.org/wiki/Porosity'},              @{N='Metallography';             U='https://en.wikipedia.org/wiki/Metallography'}) },
    @{ File='thermal-spray-coatings-preparation.html';     Image='/images/microstructures/Thermal-spray-coating.jpg';       AboutName='Thermal spraying';               AboutUrl='https://en.wikipedia.org/wiki/Thermal_spraying';               Mentions=@(@{N='Tungsten carbide';             U='https://en.wikipedia.org/wiki/Tungsten_carbide'},             @{N='Plasma spraying';           U='https://en.wikipedia.org/wiki/Plasma_spraying'},       @{N='Coating';                   U='https://en.wikipedia.org/wiki/Coating'}) },
    @{ File='cermets-technical-glasses-preparation.html';  Image='/images/microstructures/W-Co-200X.jpg';                   AboutName='Cermet';                         AboutUrl='https://en.wikipedia.org/wiki/Cermet';                         Mentions=@(@{N='Tungsten carbide';             U='https://en.wikipedia.org/wiki/Tungsten_carbide'},             @{N='Borosilicate glass';        U='https://en.wikipedia.org/wiki/Borosilicate_glass'},    @{N='Fused quartz';              U='https://en.wikipedia.org/wiki/Fused_quartz'}) }
)

# === Add image: lines to 5 data entries in guides.js (cards that currently fall back) ===
$guidesJs = 'n:\Sales & Marketing\web\metallographic-2026\js\guides.js'
$gjsContent = [System.IO.File]::ReadAllText($guidesJs)
$gjsAdditions = @(
    @{ Slug='ceramic-matrix-composite-preparation'; Image='/images/microstructures/Si3N4-Dia.jpg' },
    @{ Slug='metal-matrix-composite-preparation';   Image='/images/microstructures/Al-silicon.jpg' },
    @{ Slug='carbon-carbon-composite-preparation';  Image='/images/microstructures/carbon-composite-golf-shaft-2.jpg' },
    @{ Slug='mems-piezoelectric-preparation';       Image='/images/microstructures/MEMS-Si-Ni-Au-b.jpg' },
    @{ Slug='semiconductor-substrate-preparation';  Image='/images/microstructures/GaAs.jpg' }
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

    # 1. og:image + twitter:image (only if image is set)
    if ($g.Image) {
        $imageUrl = "$baseUrl$($g.Image)"
        $oldOg = "<meta property=`"og:image`" content=`"$logoUrl`">"
        $newOg = "<meta property=`"og:image`" content=`"$imageUrl`">"
        if ($content.Contains($oldOg)) { $content = $content.Replace($oldOg, $newOg); $changed = $true }

        $oldTw = "<meta name=`"twitter:image`" content=`"$logoUrl`">"
        $newTw = "<meta name=`"twitter:image`" content=`"$imageUrl`">"
        if ($content.Contains($oldTw)) { $content = $content.Replace($oldTw, $newTw); $changed = $true }
    }

    # 2. @type Article -> TechArticle (only in the Article block, identified by adjacent "headline" line)
    $typeOld = '"@type": "Article",' + $LF + '      "headline":'
    $typeNew = '"@type": "TechArticle",' + $LF + '      "headline":'
    if ($content.Contains($typeOld)) { $content = $content.Replace($typeOld, $typeNew); $changed = $true }

    # 3. Closing block: replace datePublished + dateModified with expanded (image + about + mentions)
    $newClosingLines = @()
    $newClosingLines += '      "datePublished": "2024-01-01",'
    $newClosingLines += "      `"dateModified`": `"$today`","
    if ($g.Image) {
        $newClosingLines += "      `"image`": `"$baseUrl$($g.Image)`","
    }
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

    if ($content.Contains($oldClosing)) {
        $content = $content.Replace($oldClosing, $newClosing)
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
