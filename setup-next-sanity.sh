#sh setup-wp.sh
#!/bin/bash

SITE_BASE_DIR="./"
BOILERPLATE_DIR="/Users/ahmedghazi/Sites/_misc/boilerplate-sanity-nextjs"

# echo "-- Setup studio"
# mkdir studio
# cd studio
# nvm use 20
# echo -n "Please enter your project ID: "
# read PROJECT_ID
# npm create sanity@latest -- --project $PROJECT_ID --dataset production --template clean
# echo "Success Setup studio !!!"

# echo "-- Install deps"

# yarn add react-icons react-player sanity-plugin-media sanity-plugin-iframe-pane
# echo "Success Install deps !!!"

# echo "-- Copy Studio Boilerplate, schema, src"
# cp -a  "$BOILERPLATE_DIR/sanity-boilerplate-portfolio-multilangue-base" "$SITE_BASE_DIR/studio"
# echo "Success Copy Studio Boilerplate !!!"
# cd ..

#!/usr/bin/env bash

set -euo pipefail

WEB_DIR="$SITE_BASE_DIR/web"

log() {
  echo ""
  echo "▶ $1"
}

success() {
  echo "✓ $1"
}

DEPS=(
  @portabletext/react
  clsx
  cookies-next
  framer-motion
  gsap
  next-sanity
  next-view-transitions
  pubsub-js
  react-intersection-observer
  react-player
  sass
  styled-components
  throttle-debounce
  @sanity/image-url
  sanity-codegen
)

DEV_DEPS=(
  @types/jsonp
  @types/pubsub-js
  @types/styled-components
  @types/throttle-debounce
  postcss
)

log "Setup Next.js"

npx create-next-app@latest web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"

success "Next.js created"

log "Install dependencies"

cd "$WEB_DIR"

yarn add "${DEPS[@]}"
yarn add -D "${DEV_DEPS[@]}"

success "Dependencies installed"

log "Copy boilerplate"

cp -a \
  "$BOILERPLATE_DIR/nextjs-boilerplate/." \
  "$WEB_DIR/"

success "Boilerplate copied"

log "Create .env.local"

cat > "$WEB_DIR/.env.local" <<EOF
NEXT_PUBLIC_SANITY_PROJECT_ID=o3ksp2uj
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
EOF

success ".env.local created"

open "$SITE_BASE_DIR"

echo ""
echo "🚀 All done!"