#!/bin/bash

# Automated iOS Build Script for Finance Manager
# Uses EXPO_TOKEN for authentication

set -e

echo "🚀 Finance Manager - Automated iOS Build"
echo "=========================================="
echo ""

# Check if token is provided
if [ -z "$EXPO_TOKEN" ]; then
    echo "❌ Error: EXPO_TOKEN not set"
    echo "Please set EXPO_TOKEN environment variable"
    exit 1
fi

echo "✅ EXPO_TOKEN found"
echo ""

# Verify authentication
echo "🔐 Verifying authentication..."
if ! EXPO_TOKEN="$EXPO_TOKEN" npx eas whoami &>/dev/null; then
    echo "❌ Authentication failed"
    exit 1
fi

echo "✅ Authenticated successfully"
echo ""

# Create or update .easrc.json
echo "📋 Setting up project configuration..."
if [ ! -f ".easrc.json" ]; then
    echo "Creating .easrc.json..."
    cat > .easrc.json << 'EOF'
{
  "projectId": "finance-app-production"
}
EOF
fi

echo "✅ Configuration ready"
echo ""

# Initialize EAS project if needed
echo "🔧 Initializing EAS project..."
if ! EXPO_TOKEN="$EXPO_TOKEN" npx eas project:info &>/dev/null; then
    echo "Creating new EAS project..."
    EXPO_TOKEN="$EXPO_TOKEN" npx eas init --force --non-interactive 2>&1 | grep -v "Warning" || true
fi

echo "✅ EAS project ready"
echo ""

# Build for iOS
echo "🔨 Building iOS app..."
echo "Profile: preview"
echo "Platform: iOS"
echo ""

EXPO_TOKEN="$EXPO_TOKEN" EAS_BUILD_NO_EXPO_GO_WARNING=true npx eas build \
    --platform ios \
    --profile preview \
    --non-interactive

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "📱 Next steps:"
echo "1. Check your build at: https://expo.dev/builds"
echo "2. Download via TestFlight link"
echo "3. Test on your iPhone"
echo ""
