# Deployment Instructions

## Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Supabase project (already created)

## Step-by-Step Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: complete task manager with kanban board"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository: `Task-Manager-Web-App`
4. Vercel will auto-detect Next.js

### 3. Configure Environment Variables
In Vercel's deployment settings, add these **Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL=https://itinoxsfesohrqrduabz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0aW5veHNmZXNvaHJxcmR1YWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzI3ODcsImV4cCI6MjA3OTU0ODc4N30.iKa1o4AlJjvARfTbpKNL7idQ9QuxmqEU31n-dmVRvik
```

### 4. Update Supabase Redirect URLs
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel URL to **Site URL**: `https://your-app.vercel.app`
4. Add to **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

### 5. Deploy
Click **"Deploy"** in Vercel. It will automatically:
- Install dependencies
- Run `npm run build`
- Deploy to a live URL

## Post-Deployment
- Visit your deployed URL
- Test Sign Up / Login
- Create a task and test Kanban drag & drop

## Troubleshooting
- If auth doesn't work: Check Supabase redirect URLs
- If build fails: Check Vercel build logs
- Environment variables: Make sure they're set correctly

---

**Your app is now live! 🚀**
