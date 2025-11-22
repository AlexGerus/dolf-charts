# Vercel Deployment Guide - DOLF Strategy Analytics

Complete guide for deploying your Angular application to Vercel.

## 🚀 Quick Deploy (Recommended)

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - DOLF Strategy Analytics"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dolf-charts.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings from `vercel.json`
   - Click "Deploy"

3. **Done!** Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   pnpm add -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # Preview deployment
   pnpm run preview
   # or
   vercel

   # Production deployment
   pnpm run deploy
   # or
   vercel --prod
   ```

## 📋 Configuration Files

### vercel.json

Already configured in your project:

```json
{
  "version": 2,
  "name": "dolf-charts",
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist/dolf-charts/browser",
  "installCommand": "pnpm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Key Settings:**
- `buildCommand`: Uses pnpm to build the project
- `outputDirectory`: Angular's build output location
- `rewrites`: Enables SPA routing (all routes → index.html)

### .vercelignore

Prevents uploading unnecessary files:
- node_modules
- .angular/cache
- dist/
- IDE files
- OS files

## 🛠 Build Configuration

### Package.json Scripts

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "deploy": "vercel --prod",
    "preview": "vercel"
  }
}
```

### Build Process

When you deploy, Vercel will:
1. Install dependencies with `pnpm install`
2. Run `pnpm run build`
3. Serve files from `dist/dolf-charts/browser`
4. Apply caching headers
5. Enable SPA routing

## 🔧 Manual Vercel Dashboard Configuration

If you prefer manual setup:

### Build & Development Settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Other |
| Build Command | `pnpm run build` |
| Output Directory | `dist/dolf-charts/browser` |
| Install Command | `pnpm install` |
| Development Command | `pnpm start` |

### Environment Variables (if needed):

Go to Project Settings → Environment Variables

Example:
```
NODE_VERSION=20
PNPM_VERSION=8.7.6
```

## 📦 Pre-Deployment Checklist

- [x] vercel.json configured
- [x] .vercelignore created
- [x] Build scripts added to package.json
- [ ] Code pushed to Git repository
- [ ] Vercel account created
- [ ] Project imported to Vercel

## 🌐 Deployment Environments

### Preview Deployments
Every `git push` to a branch creates a preview:
- URL: `https://dolf-charts-git-[branch]-[username].vercel.app`
- Perfect for testing before production

### Production Deployment
Deploys from your main branch:
- URL: `https://dolf-charts.vercel.app` (or custom domain)
- Triggered by merging to main/master

## 🎨 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `dolf-analytics.com`)
3. Configure DNS with your provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

## 🔍 Troubleshooting

### Build Fails

**Issue**: "Build failed"
**Solution**:
```bash
# Test build locally first
pnpm run build

# Check build logs in Vercel dashboard
# Ensure all dependencies are in package.json
```

### 404 on Routes

**Issue**: Routes return 404
**Solution**:
- Ensure `vercel.json` has the rewrites configuration
- Check that Angular is in production mode

### Node Version Issues

**Issue**: "Node version mismatch"
**Solution**:
Add to Vercel environment variables:
```
NODE_VERSION=20
```

### Build Takes Too Long

**Issue**: Build timeout
**Solution**:
- Check bundle size with `pnpm run build:prod`
- Consider lazy loading for large components
- Vercel has a 45-minute build limit (should be plenty)

### Static Files Not Found

**Issue**: Assets 404
**Solution**:
- Verify output directory: `dist/dolf-charts/browser`
- Check angular.json build options
- Ensure assets are in public/ or src/assets/

## 📊 Performance Optimization

### Already Implemented:
- ✅ Static asset caching (31536000s)
- ✅ Gzip compression (automatic)
- ✅ CDN distribution (automatic)
- ✅ OnPush change detection
- ✅ Production build optimization

### Additional Optimizations:

1. **Enable ISR** (if needed):
   Add to vercel.json:
   ```json
   {
     "functions": {
       "api/**/*.js": {
         "maxDuration": 10
       }
     }
   }
   ```

2. **Add Security Headers**:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           }
         ]
       }
     ]
   }
   ```

## 🔐 Security Headers (Optional Enhancement)

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

## 📈 Monitoring

### Vercel Analytics (Optional)

1. Go to Project Settings → Analytics
2. Enable Vercel Analytics
3. Add to your Angular app:
   ```bash
   pnpm add @vercel/analytics
   ```

4. Update `src/main.ts`:
   ```typescript
   import { inject } from '@vercel/analytics';

   inject();
   ```

### Speed Insights (Optional)

```bash
pnpm add @vercel/speed-insights
```

## 🚦 CI/CD Workflow

Vercel automatically:
1. Builds on every push
2. Creates preview deployments for PRs
3. Deploys to production on merge to main
4. Runs build checks
5. Shows deployment status in GitHub

## 📝 Deployment Workflow

```bash
# 1. Make changes
git add .
git commit -m "feat: add new feature"

# 2. Push to branch (creates preview)
git push origin feature-branch

# 3. Create PR and merge to main

# 4. Auto-deploys to production
```

## 🎯 Next Steps After Deployment

1. **Test the deployment**:
   - Upload sample-scenario.json
   - Verify all charts work
   - Test on mobile devices

2. **Set up monitoring**:
   - Enable Vercel Analytics
   - Add error tracking (Sentry)

3. **Configure custom domain** (optional)

4. **Add environment-specific configs** (if needed)

## 💡 Tips

- Use preview deployments for testing
- Monitor build times in Vercel dashboard
- Check bundle size after each deploy
- Enable automatic deployments from main branch
- Use Vercel CLI for quick iterations

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Discord**: https://vercel.com/discord
- **Angular on Vercel**: https://vercel.com/docs/frameworks/angular

## 🎉 Success!

Your DOLF Strategy Analytics app is now live on Vercel!

**Your deployment URL**: https://your-project.vercel.app

---

**Happy Deploying! 🚀**
