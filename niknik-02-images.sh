#!/bin/bash

set -e
set -x

# ==================================================

calculateMD5sums() {
  find . -type f \( -name "*.png" -or -name "*.jpg" \) -exec md5sum '{}' \; |
    sed -e 's/  /\t/g' |
    sed -e 's/\/\([^\/]\+$\)/\t\1/g' |
    sort -t$'\t' -k3 >niktmp-03-images-md5sums.txt
}

scrubHtmlImages() {
  find . -type f \( -name "*.png" -or -name "*.jpg" \) -exec file '{}' \; >niktmp-03-images-types.txt
  grep HTML niktmp-03-images-types.txt | sed -e 's/: .\+//g' | xargs -I '{}' mv '{}' images-wb/.
}

# ==================================================
calculateMD5sums
scrubHtmlImages
