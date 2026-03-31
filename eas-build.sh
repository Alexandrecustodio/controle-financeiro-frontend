#!/bin/bash

# EAS Build Script for Finance Manager iOS
# This script handles the build process without interactive mode issues

set -e

echo "🚀 Finance Manager iOS Build Script"
echo "===================================="
echo ""

# Check if logged in to EAS
echo "📱 Checking Expo login status..."
if ! npx eas whoami &>/dev/null; then
    echo "❌ Not logged in to Expo. Please run: eas login"
    exit 1
fi

echo "✅ Logged in to Expo"
echo ""

# Check if project is initialized
if [ ! -f ".easrc.json" ]; then
    echo "⚠️  .easrc.json not found. Creating..."
    PROJECT_ID=$(node -e "console.log(require('crypto').randomBytes(16).toString('hex'))")
    cat > .easrc.json << EOF
{
  "projectId": "$PROJECT_ID"
}
EOF
    echo "✅ Created .easrc.json with projectId: $PROJECT_ID"
    echo ""
fi

# Extract project ID
PROJECT_ID=$(node -e "console.log(require('./.easrc.json').projectId)")
echo "📋 Using Project ID: $PROJECT_ID"
echo ""

# Build for iOS
echo "🔨 Building iOS app..."
echo "Profile: preview"
echo ""

EAS_BUILD_NO_EXPO_GO_WARNING=true npx eas build \
    --platform ios \
    --profile preview \
    --non-interactive

echo ""
echo "✅ Build completed!"
echo ""
echo "📱 Next steps:"
echo "1. Check your build at: https://expo.dev/builds"
echo "2. Download the app via TestFlight link"
echo "3. Test on your iPhone"
echo ""
