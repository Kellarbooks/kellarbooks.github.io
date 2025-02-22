#!/bin/bash

set -e
#set -x

# ==================================================

scrubAllfiles() {
  find . -type f -name "*.css" -print | while read i; do
    echo $i
    cat "$i" | ./niknik-00-scrub-waybackmachine.pl >"$i.xx"
    mv "$i.xx" "$i"
  done

  find . -type f -name "*.js" -print | while read i; do
    echo $i
    cat "$i" | ./niknik-00-scrub-waybackmachine.pl >"$i.xx"
    mv "$i.xx" "$i"
  done

  find . -type f -name "*.html" -print | while read i; do
    echo $i
    cat "$i" | ./niknik-00-scrub-waybackmachine.pl >"$i.xx"
    mv "$i.xx" "$i"
  done
}

calculateMD5sums() {
  find . -type f -name "*.html" -exec md5sum '{}' \; | sort >niktmp-01-md5sums-html.txt
  find . -type f -name "*.css" -exec md5sum '{}' \; | sort >niktmp-01-md5sums-css.txt
  find . -type f -name "*.js" -exec md5sum '{}' \; | sort >niktmp-01-md5sums-js.txt
}

# --------------------------------------------------

moveFiles() {
  mkdir -p css css-wb fonts js images images-wb html-wb

  # the following will refuse to copy over existing copy
  #find . -path "*_files/*.html" -exec mv -t html-wb '{}' +
  #find . -type f -name "css*.css" -exec mv -t css '{}' +
  #find . -type f -name "*.css" -exec mv -t css-wb '{}' +
  #find . -type f -name "*.js" -exec mv -t js '{}' +

  # sledgehammer
  find . -path "*_files/*.html" -print | while read i; do
    mv "$i" html-wb/.
  done
  find . -path "*_files/css*.css" -print | while read i; do
    mv "$i" css/.
  done
  find . -path "*_files/*.css" -print | while read i; do
    mv "$i" css-wb/.
  done
  find . -path "*_files/*.js" -print | while read i; do
    mv "$i" js/.
  done
}

# ==================================================
#scrubAllfiles
#calculateMD5sums
# --------------------
moveFiles
