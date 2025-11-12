# Quick Setup Guide

Follow this checklist to get your SaaS Journey Journal up and running in ~15 minutes.

## ✅ Setup Checklist

### Step 1: Supabase Setup (5 minutes)

- [ ] Go to [supabase.com](https://supabase.com) and create account
- [ ] Create a new project (choose a region close to you)
- [ ] Wait for project to initialize (~2 minutes)
- [ ] Go to **Project Settings** → **API**
- [ ] Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
- [ ] Copy your **anon public key** (long string starting with `eyJ...`)
- [ ] Go to **SQL Editor** in the sidebar
- [ ] Open `supabase-setup.sql` from this project
- [ ] Copy and paste the entire file into the SQL Editor
- [ ] Click **Run** (bottom right)
- [ ] Verify success: Go to **Table Editor** → Should see `journal_entries` table

### Step 2: Local Development Setup (3 minutes)

- [ ] Make sure Node.js 18+ is installed (`node --version`)
- [ ] Clone or download this project
- [ ] Open terminal in the project folder
- [ ] Run: `npm install`
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Edit `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...your-key
  NEXT_PUBLIC_OWNER_EMAIL=youremail@example.com
  ```
- [ ] **Important**: Use YOUR real email for `NEXT_PUBLIC_OWNER_EMAIL`
- [ ] Save the file

### Step 3: Test Locally (2 minutes)

- [ ] Run: `npm run dev`
- [ ] Open browser to [http://localhost:3000](http://localhost:3000)
- [ ] You should be redirected to `/login`
- [ ] Click "Sign up"
- [ ] Enter your email (must match your `NEXT_PUBLIC_OWNER_EMAIL`)
- [ ] Enter a password (min 6 characters)
- [ ] Click "Sign Up"
- [ ] Check your email inbox
- [ ] Click the confirmation link
- [ ] Go back to [http://localhost:3000](http://localhost:3000)
- [ ] Sign in with your email and password
- [ ] You should see "Welcome to Your Journey"
- [ ] Click "Write Your First Entry"
- [ ] Create a test entry
- [ ] Verify it saves and displays correctly

✅ **Success!** Your journal is working locally.

### Step 4: Deploy to Vercel (5 minutes)

- [ ] Create a GitHub account if you don't have one
- [ ] Create a new repository on GitHub
- [ ] In your terminal, run:
  ```bash
  git init
  git add .
  git commit -m "Initial commit: SaaS Journey Journal"
  git branch -M main
  git remote add origin YOUR_GITHUB_REPO_URL
  git push -u origin main
  ```
- [ ] Go to [vercel.com](https://vercel.com) and sign up (use GitHub)
- [ ] Click "Add New Project"
- [ ] Import your GitHub repository
- [ ] Click on "Environment Variables"
- [ ] Add all three variables from your `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_OWNER_EMAIL`
- [ ] Click "Deploy"
- [ ] Wait ~2 minutes for build to complete
- [ ] Click "Visit" to see your live site
- [ ] Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

### Step 5: Configure Supabase for Production (1 minute)

- [ ] Go back to your Supabase dashboard
- [ ] Go to **Authentication** → **URL Configuration**
- [ ] Under **Site URL**, enter your Vercel URL: `https://your-app.vercel.app`
- [ ] Under **Redirect URLs**, add: `https://your-app.vercel.app/**`
- [ ] Click "Save"

### Step 6: Test Production (1 minute)

- [ ] Visit your Vercel URL
- [ ] Sign in with your email and password
- [ ] Create a test entry
- [ ] Verify everything works

✅ **Done!** Your journal is now live on the internet, but only YOU can access it.

## 🎉 You're All Set!

You now have a private, secure journal to document your SaaS journey.

### What's Next?

- Bookmark your journal URL
- Start writing daily or weekly entries
- Use moods and tags to categorize your journey
- Review past entries to see your progress

### Tips for Success

1. **Write regularly**: Even 5 minutes a day adds up
2. **Be honest**: This is private - write your true thoughts
3. **Use tags**: They make it easier to find patterns later
4. **Track moods**: See how your mindset changes over time
5. **Celebrate wins**: No victory is too small to document

## Need Help?

If something isn't working:

1. Check the **Troubleshooting** section in `README.md`
2. Verify all environment variables are correct
3. Check Supabase logs: Dashboard → **Logs**
4. Check browser console: Right-click → Inspect → Console

## Security Reminder

- Never share your `.env.local` file
- Never commit `.env.local` to GitHub (it's in `.gitignore`)
- Use a strong, unique password for your Supabase account
- Enable 2FA on both Supabase and Vercel

---

**Happy journaling! 📝**
