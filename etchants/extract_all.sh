#!/bin/bash

for f in 0-5-percent-hf.html 10-percent-oxalic-acid-electrolytic.html 2-percent-nital.html 3-percent-nital.html 4-percent-nital.html 5-percent-nital.html 8-percent-nital.html adlers-etchant.html al-naoh-etchant.html ammonium-persulfate.html astm-no-30.html barkers-reagent-electrolytic.html berahas-reagent.html carpenters.html chromic-acid-electrolytic.html copper-no-1.html copper-no-2.html cu-pass-sol.html dichromate-etchant.html ferric-chloride.html frys-reagent.html glyceregia.html inconel-etchant.html kallings-no-2.html kellers-reagent.html klemm-s-reagent.html krolls-reagent.html marbles-reagent.html modified-krolls-reagent.html murakamis-reagent.html nickel-etchant.html oberhoffers-reagent.html ti-ap-16.html vilellas-reagent.html waterless-kallings.html wecks-etch.html winsteards-reagent.html ammonium-hydroxide-h2o2.html astm-no-157.html astm-no-97.html picral.html; do
  if [ ! -f "$f" ]; then continue; fi
  
  echo "=== $f ==="
  
  # Display name
  grep -o '<h1[^>]*>[^<]*</h1>' "$f" | sed 's/<[^>]*>//g' | head -1 | sed "s/^/display: /"
  
  # Category
  if grep -q 'class="category-badge"' "$f"; then
    grep -o 'class="category-badge">[^<]*' "$f" | sed 's/.*>//' | sed "s/^/category: /"
  else
    echo "category: (missing)"
  fi
  
  # Method
  if grep -q 'Method:</span>' "$f"; then
    grep -o 'Method:</span><span[^>]*>[^<]*' "$f" | sed 's/.*>//' | head -1 | sed "s/^/method: /"
  else
    echo "method: (missing)"
  fi
  
  # Time
  if grep -q 'Typical Time:</span>' "$f"; then
    grep -o 'Typical Time:</span><span[^>]*>[^<]*' "$f" | sed 's/.*>//' | head -1 | sed "s/^/time: /"
  else
    echo "time: (missing)"
  fi
  
  # Reveals
  if grep -q '>Reveals</h2>' "$f"; then
    grep -o '>Reveals</h2><div class="section-content"><p>[^<]*' "$f" | sed 's/.*<p>//' | sed "s/^/reveals: /"
  else
    echo "reveals: (missing)"
  fi
  
  # Typical Results
  if grep -q '>Typical Results</h2>' "$f"; then
    grep -o '>Typical Results</h2><div class="section-content"><p>[^<]*' "$f" | sed 's/.*<p>//' | sed "s/^/typical: /"
  else
    echo "typical: (missing)"
  fi
  
  # Color Effects
  if grep -q '>Color Effects</h2>' "$f"; then
    grep -o '>Color Effects</h2><div class="section-content"><p>[^<]*' "$f" | sed 's/.*<p>//' | sed "s/^/color: /"
  else
    echo "color: (missing)"
  fi
  
  # Tags - extract text between span tags
  if grep -q '>Tags</h2>' "$f"; then
    tagcontent=$(grep -o '>Tags</h2><div class="section-content"><div class="tag-list">[^<]*<span[^>]*>[^<]*</span>[^<]*<span[^>]*>[^<]*</span>[^<]*<span[^>]*>[^<]*</span>' "$f" 2>/dev/null || echo "")
    if [ -n "$tagcontent" ]; then
      tags=$(echo "$tagcontent" | sed -E 's/.*<span[^>]*>([^<]*)<\/span>.*<span[^>]*>([^<]*)<\/span>.*<span[^>]*>([^<]*)<\/span>.*/\1, \2, \3/')
      echo "tags: $tags"
    else
      # Simpler extraction for fewer tags
      grep '>Tags</h2>' "$f" | sed -E 's/.*>Tags.{0,200}<span[^>]*>([^<]*)<\/span>[^<]*<span[^>]*>([^<]*)<\/span>.*/tags: \1, \2/'
    fi
  else
    echo "tags: (missing)"
  fi
  
  # Compatible Materials - similar approach
  if grep -q '>Compatible Materials</h2>' "$f"; then
    grep '>Compatible Materials</h2>' "$f" | sed -E 's/.*>Compatible Materials.{0,300}<span[^>]*>([^<]*)<\/span>.*<span[^>]*>([^<]*)<\/span>.*/compatible: \1, \2/'
  else
    echo "compatible: (missing)"
  fi
  
  # Incompatible Materials
  if grep -q '>Incompatible Materials</h2>' "$f"; then
    grep '>Incompatible Materials</h2>' "$f" | sed -E 's/.*>Incompatible Materials.{0,300}<span[^>]*>([^<]*)<\/span>.*<span[^>]*>([^<]*)<\/span>.*/incompatible: \1, \2/'
  else
    echo "incompatible: (missing)"
  fi
  
  # Application Notes
  if grep -q '>Application Notes</h2>' "$f"; then
    grep -o '>Application Notes</h2><div class="section-content"><div>[^<]*' "$f" | sed 's/.*<div>//' | sed "s/^/app_notes: /"
  else
    echo "app_notes: (missing)"
  fi
  
  # Troubleshooting
  if grep -q '>Troubleshooting</h2>' "$f"; then
    grep -o '>Troubleshooting</h2><div class="section-content"><div>[^<]*' "$f" | sed 's/.*<div>//' | sed "s/^/troubleshooting: /"
  else
    echo "troubleshooting: (missing)"
  fi
  
  # Storage Notes
  if grep -q '>Storage Notes</h2>' "$f"; then
    grep -o '>Storage Notes</h2><div class="section-content"><div>[^<]*' "$f" | sed 's/.*<div>//' | sed "s/^/storage: /"
  else
    echo "storage: (missing)"
  fi
  
  # Alternatives
  if grep -q '>Alternative Etchants</h2>' "$f"; then
    grep -o '>Alternative Etchants</h2><div class="section-content"><ul[^>]*><li>[^<]*' "$f" | sed 's/.*<li>//' | sed "s/^/alternatives: /"
  else
    echo "alternatives: (missing)"
  fi
  
  # Similar
  if grep -q '>Similar Etchants</h2>' "$f"; then
    grep -o '>Similar Etchants</h2><div class="section-content"><ul[^>]*><li>[^<]*' "$f" | sed 's/.*<li>//' | sed "s/^/similar: /"
  else
    echo "similar: (missing)"
  fi
  
  # ASTM
  if grep -q '>ASTM References</h2>' "$f"; then
    grep -o '>ASTM References</h2><div class="section-content"><div class="tag-list"><span[^>]*>[^<]*' "$f" | sed 's/.*<span[^>]*>//' | sed "s/^/astm: /"
  else
    echo "astm: (missing)"
  fi
  
  echo ""
done
