#!/bin/bash

set -e
#set -x

calculateMD5sums() {
  find . -type f -name "css*.css" -exec md5sum '{}' \; | sort >niktmp-05a-md5sums-css.txt
}

backupCss() {
  cat <<EOF >niktmp-05b-css-backup.sh
#!/bin/bash

set -e
set -x

EOF

  ls -1 */*_files/css*.css | while read src; do
    dst=$(echo "$src" | sed 's:/.\+/:__:g')
    echo "cp '$src' '../niknik/$dst'"
  done >>niktmp-05b-css-backup.sh
}

getCssDate() {
  ls -1 */*_files/css*.css | while read i; do
    grep -H src "$i" | head -1
  done >niktmp-05c-css-grep-src.txt

  # confirmed that about/*_files/css_002.css is "latest"
}

moveCss() {
  mv about/*_files/css_002.css css/css.css
  rm */*_files/css*.css
}

# ==================================================
calculateMD5sums
#backupCss
getCssDate
moveCss
