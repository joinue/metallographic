#!/bin/bash

for f in 0-5-percent-hf.html 10-percent-oxalic-acid-electrolytic.html 2-percent-nital.html 3-percent-nital.html 4-percent-nital.html 5-percent-nital.html 8-percent-nital.html al-naoh-etchant.html ammonium-persulfate.html astm-no-30.html barkers-reagent-electrolytic.html berahas-reagent.html carpenters.html chromic-acid-electrolytic.html copper-no-1.html copper-no-2.html cu-pass-sol.html dichromate-etchant.html ferric-chloride.html frys-reagent.html glyceregia.html inconel-etchant.html kallings-no-2.html kellers-reagent.html klemm-s-reagent.html krolls-reagent.html marbles-reagent.html modified-krolls-reagent.html murakamis-reagent.html nickel-etchant.html oberhoffers-reagent.html ti-ap-16.html vilellas-reagent.html waterless-kallings.html wecks-etch.html winsteards-reagent.html ammonium-hydroxide-h2o2.html astm-no-157.html astm-no-97.html picral.html; do
  if [ ! -f "$f" ]; then continue; fi
  
  echo "=== $f ==="
  
  # Display name
  display=$(grep -o '<h1[^>]*>[^<]*</h1>' "$f" | sed 's/<[^>]*>//g' | head -1)
  echo "display: $display"
  
  # Category
  category=$(grep -o 'class="category-badge">[^<]*' "$f" | sed 's/.*>//')
  [ -z "$category" ] && category="(missing)"
  echo "category: $category"
  
  # Method and Time
  method=$(grep -o 'Method:</span><span[^>]*>[^<]*' "$f" | sed 's/.*>//' | head -1)
  [ -z "$method" ] && method="(missing)"
  echo "method: $method"
  
  time=$(grep -o 'Typical Time:</span><span[^>]*>[^<]*' "$f" | sed 's/.*>//' | head -1)
  [ -z "$time" ] && time="(missing)"
  echo "time: $time"
  
  # Extract reveals, typical results, color effects, tags, compatible, incompatible
  reveals=$(grep -o '>Reveals</h2><div class="section-content"><p>[^<]*' "$f" | sed 's/.*<p>//' | head -1)
  [ -z "$reveals" ] && reveals="(missing)"
  echo "reveals: $reveals"
  
  typical=$(grep -o '>Typical Results</h2><div class="section-content"><p>[^<]*' "$f" | sed 's/.*<p>//' | head -1)
  [ -z "$typical" ] && typical="(missing)"
  echo "typical: $typical"
  
  color=$(grep -o '>Color Effects</h2><div class="section-content"><p>[^<]*' "$f" | sed 's/.*<p>//' | head -1)
  [ -z "$color" ] && color="(missing)"
  echo "color: $color"
  
  # Tags - extract from tag-list
  tags=$(grep -o '>Tags</h2><div class="section-content"><div class="tag-list">[^<]*' "$f" | sed 's/.*tag-list">//' | sed 's/<span[^>]*>//g')
  tags=$(echo "$tags" | sed 's/<\/span>/,/g' | sed 's/,$//')
  [ -z "$tags" ] && tags="(missing)"
  echo "tags: $tags"
  
  # Compatible materials
  compatible=$(grep -o '>Compatible Materials</h2><div class="section-content"><div class="tag-list">[^<]*' "$f" | sed 's/.*tag-list">//' | sed 's/<span[^>]*>//g')
  compatible=$(echo "$compatible" | sed 's/<\/span>/,/g' | sed 's/,$//')
  [ -z "$compatible" ] && compatible="(missing)"
  echo "compatible: $compatible"
  
  # Incompatible materials
  incompatible=$(grep -o '>Incompatible Materials</h2><div class="section-content"><div class="tag-list">[^<]*' "$f" | sed 's/.*tag-list">//' | sed 's/<span[^>]*>//g')
  incompatible=$(echo "$incompatible" | sed 's/<\/span>/,/g' | sed 's/,$//')
  [ -z "$incompatible" ] && incompatible="(missing)"
  echo "incompatible: $incompatible"
  
  # Application notes - longer text
  app_notes=$(grep -o '>Application Notes</h2><div class="section-content"><div>[^<]*' "$f" | sed 's/.*<div>//' | head -1)
  [ -z "$app_notes" ] && app_notes="(missing)"
  echo "app_notes: $app_notes"
  
  # Troubleshooting
  troubleshooting=$(grep -o '>Troubleshooting</h2><div class="section-content"><div>[^<]*' "$f" | sed 's/.*<div>//' | head -1)
  [ -z "$troubleshooting" ] && troubleshooting="(missing)"
  echo "troubleshooting: $troubleshooting"
  
  # Storage notes
  storage=$(grep -o '>Storage Notes</h2><div class="section-content"><div>[^<]*' "$f" | sed 's/.*<div>//' | head -1)
  [ -z "$storage" ] && storage="(missing)"
  echo "storage: $storage"
  
  # Alternatives
  alternatives=$(grep -o '>Alternative Etchants</h2><div class="section-content"><ul class="applications-list"><li>[^<]*' "$f" | sed 's/.*<li>//' | head -1)
  [ -z "$alternatives" ] && alternatives="(missing)"
  echo "alternatives: $alternatives"
  
  # Similar etchants
  similar=$(grep -o '>Similar Etchants</h2><div class="section-content"><ul class="applications-list"><li>[^<]*' "$f" | sed 's/.*<li>//' | head -1)
  [ -z "$similar" ] && similar="(missing)"
  echo "similar: $similar"
  
  # ASTM References
  astm=$(grep -o '>ASTM References</h2><div class="section-content"><div class="tag-list"><span class="tag[^>]*>[^<]*' "$f" | sed 's/.*<span[^>]*>//' | head -1)
  [ -z "$astm" ] && astm="(missing)"
  echo "astm: $astm"
  
  echo ""
done
