# Vercel Deployment Cheatsheet 🚀

Quick reference for deploying DOLF Strategy Analytics to Vercel.

## 📋 Prerequisites

```bash
# Install Vercel CLI (one time)
pnpm add -g vercel

# Login to Vercel (one time)
vercel login
```

## 🚀 Deployment Commands

### Quick Deploy (Automated Script)

```bash
# Interactive deployment wizard
./deploy.sh
```

### Manual Deploy

```bash
# Preview deployment (test)
pnpm run preview
# or
vercel

# Production deployment
pnpm run deploy
# or
vercel --prod
```

## 🔧 Before Deploying

```bash
# Test local build
pnpm run build:prod

# Check bundle size
ls -lh dist/dolf-charts/browser/
```

## 📦 First Time Setup

### Option 1: Via GitHub (Recommended)

```bash
# 1. Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/dolf-charts.git
git branch -M main
git push -u origin main

# 3. Import to Vercel
# Go to vercel.com → New Project → Import from GitHub
```

### Option 2: Via CLI

```bash
# 1. Deploy from local
vercel

# 2. Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [Select your account]
# - Link to existing project? No
# - Project name? dolf-charts
# - Directory? ./
# - Override settings? No
```

## 🌐 URLs

After deployment you'll get:

```
Preview:    https://dolf-charts-[hash].vercel.app
Production: https://dolf-charts.vercel.app
```

## 🔄 Update Workflow

```bash
# 1. Make changes
git add .
git commit -m "feat: your changes"
git push

# 2. Vercel auto-deploys (if GitHub connected)
# Or manually: vercel --prod
```

## 📊 Monitoring

```bash
# View deployments
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Open project in dashboard
vercel --prod --open
```

## 🛠 Useful Commands

| Command | Description |
|---------|-------------|
| `vercel` | Deploy to preview |
| `vercel --prod` | Deploy to production |
| `vercel ls` | List deployments |
| `vercel logs` | View logs |
| `vercel domains` | Manage domains |
| `vercel env` | Manage environment variables |
| `vercel --help` | Show all commands |

## 🔐 Environment Variables

```bash
# Add environment variable
vercel env add [NAME]

# List variables
vercel env ls

# Remove variable
vercel env rm [NAME]
```

## 🎯 Configuration Files

✅ Already configured in your project:
- `vercel.json` - Deployment config
- `.vercelignore` - Files to ignore
- `package.json` - Build scripts

## 📱 Testing Deployment

1. **Upload test data**:
   - Use `sample-scenario.json`

2. **Check functionality**:
   - File upload works
   - Charts render correctly
   - Statistics display properly
   - Mobile responsive

3. **Check performance**:
   - Load time < 3s
   - Charts render smoothly
   - No console errors

## 🐛 Troubleshooting

### Build fails
```bash
# Test build locally
pnpm run build:prod

# Check logs
vercel logs [deployment-url]
```

### 404 on routes
- Check `vercel.json` rewrites configuration
- Ensure SPA routing is enabled

### Assets not loading
- Verify output directory: `dist/dolf-charts/browser`
- Check file paths are relative

## 🚨 Emergency Rollback

```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url] --prod
```

## 💡 Tips

- ✅ Test locally before deploying: `pnpm run build:prod`
- ✅ Use preview deployments for testing
- ✅ Check bundle size after changes
- ✅ Monitor deployment logs for errors
- ✅ Enable automatic GitHub deployments

## 🔗 Quick Links

- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Status: https://vercel-status.com

## 📞 Need Help?

See detailed guide: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

---

**Last updated**: 2024-11-22
