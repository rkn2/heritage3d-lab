# GitHub Pages Deployment Guide

## Quick Start Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository: `heritage3d-lab` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Deploy Your Website

Open Terminal and run these commands from your website directory:

```bash
# Navigate to your website directory
cd /Users/rebeccanapolitano/antigravityProjects/website

# Initialize git repository
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit: Heritage 3D Lab website"

# Rename branch to main
git branch -M main

# Add your GitHub repository (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/heritage3d-lab.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (top menu)
3. Click "Pages" (left sidebar)
4. Under "Source":
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click "Save"
6. Wait 1-2 minutes for deployment

Your site will be live at: `https://YOUR-USERNAME.github.io/heritage3d-lab/`

## Alternative: Deploy to username.github.io

If you want your site at `https://YOUR-USERNAME.github.io/` instead:

1. Create a repository named exactly: `YOUR-USERNAME.github.io`
2. Follow the same steps above, but use this remote URL:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   ```
3. No need to enable Pages - it's automatic for `username.github.io` repos

## Updating Your Website

After making changes to your website:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Update website content"

# Push to GitHub
git push
```

GitHub Pages will automatically rebuild your site in 1-2 minutes.

## Custom Domain (Optional)

To use a custom domain like `heritage3dlab.org`:

1. Buy a domain from a registrar (Namecheap, Google Domains, etc.)
2. In your repository settings → Pages → Custom domain
3. Enter your domain name
4. In your domain registrar's DNS settings, add these records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: YOUR-USERNAME.github.io
   ```
5. Wait 24-48 hours for DNS propagation
6. Enable "Enforce HTTPS" in GitHub Pages settings

## Troubleshooting

### Site not loading?
- Wait 2-3 minutes after first deployment
- Check that repository is Public
- Verify Pages is enabled in Settings

### Images not showing?
- Make sure `logo.png` is in the repository
- Check file names are correct (case-sensitive)

### Publications not loading?
- ORCID API requires HTTPS
- Publications will load once deployed to GitHub Pages
- Local testing may show fallback message

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

---

**Ready to deploy?** Just follow Step 1 and Step 2 above, then your site will be live!
