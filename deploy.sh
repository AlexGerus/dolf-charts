#!/bin/bash

# DOLF Strategy Analytics - Deployment Script
# This script helps you deploy to Vercel

set -e

echo "🚀 DOLF Strategy Analytics - Deployment Script"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo -e "${YELLOW}⚠️  Vercel CLI not found${NC}"
    echo "Installing Vercel CLI..."
    pnpm add -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
else
    echo -e "${GREEN}✅ Vercel CLI found${NC}"
fi

echo ""
echo "📋 Pre-deployment checklist:"
echo ""

# Run build test
echo -e "${YELLOW}🔨 Testing production build...${NC}"
if pnpm run build:prod; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed. Please fix errors before deploying.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""

# Ask for deployment type
echo "Select deployment type:"
echo "1) Preview deployment (test)"
echo "2) Production deployment"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}🚀 Starting preview deployment...${NC}"
        vercel
        ;;
    2)
        echo ""
        echo -e "${YELLOW}🚀 Starting production deployment...${NC}"
        read -p "Are you sure you want to deploy to production? (y/n): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            vercel --prod
        else
            echo "Deployment cancelled."
            exit 0
        fi
        ;;
    *)
        echo -e "${RED}Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📊 Next steps:"
echo "  • Check deployment status in Vercel dashboard"
echo "  • Test your app at the provided URL"
echo "  • Monitor performance and analytics"
echo ""
