#!/bin/bash

set -e
#set -x

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

# ==================================================
scrubAllfiles
calculateMD5sums
