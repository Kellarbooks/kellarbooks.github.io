#!/bin/bash

set -e
#set -x

# ==================================================

calculateMD5sums() {
  find . -type f \( -name "*.png" -or -name "*.jpg" \) -exec md5sum '{}' \; |
    sed -e 's/  /\t/g' |
    sed -e 's/\/\([^\/]\+$\)/\t\1/g' |
    sort -t$'\t' -k3 >niktmp-03a-images-md5sums.txt
}

scrubHtmlImages() {
  find . -type f \( -name "*.png" -or -name "*.jpg" \) -exec file '{}' \; >niktmp-03a-images-types.txt
  grep HTML niktmp-03a-images-types.txt | sed -e 's/: .\+//g' | xargs -I '{}' mv '{}' images-wb/.
}

# ==================================================

calculateMD5sumsLeftOverImages() {
  echo "" >niktmp-03b-images-md5sums.txt
  ls -1 */*_files/* | xargs -I '{}' md5sum '{}' |
    sed -e 's/  /\t/g' |
    sed -e 's/\/\([^\/]\+$\)/\t\1/g' |
    sort -t$'\t' -k3 >niktmp-03b-images-md5sums.txt
}

moveImages() {
  # the following will refuse to copy over existing copy
  #mv */*_files/* images/.

  # sledgehammer
  ls -1 */*_files/* | xargs -I '{}' mv '{}' images/.
}

# ==================================================
#calculateMD5sums
#scrubHtmlImages
calculateMD5sumsLeftOverImages
moveImages
