#!/bin/bash

# Heritage 3D Lab - GitHub Deployment Script
# This script will push your website to GitHub

echo "🚀 Deploying Heritage 3D Lab website to GitHub..."

# Check if git remote already exists
if git remote | grep -q "origin"; then
    echo "✓ Git remote 'origin' already exists"
else
    echo "Please enter your GitHub username:"
    read github_username
    
    echo "Adding GitHub remote..."
    git remote add origin https://github.com/$github_username/heritage3d-lab.git
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/YOUR-USERNAME/heritage3d-lab/settings/pages"
echo "2. Under 'Source', select branch: main, folder: / (root)"
echo "3. Click 'Save'"
echo "4. Wait 1-2 minutes for deployment"
echo "5. Your site will be live at: https://YOUR-USERNAME.github.io/heritage3d-lab/"
echo ""
