#!/bin/bash

# chmod -R 777 /output/*

ls -lh /cache/*.sqlite || true
# ls -lh / || true

export NODE_OPTIONS=--max-old-space-size=4096
# tor --version
# service tor start
#curl --socks5 localhost:9050 --socks5-hostname localhost:9050 -s https://check.torproject.org/ | cat | grep -m 1 Congratulations | xargs
node /app/index.js

output_file="/output/favicon.ico"
assets_file="/app/assets/favicon.ico"

# ======================

output_file="/output/favicon.ico"
assets_file="/app/assets/favicon.ico"

if [ ! -f "$output_file" ]; then
  cp "$assets_file" "$output_file"
fi



