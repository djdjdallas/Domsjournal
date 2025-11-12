# Deployment Guide

This guide covers deploying your SaaS Journey Journal to production with Vercel and Supabase.

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] You've tested the app locally and everything works
- [ ] You've created at least one test entry locally
- [ ] Your Supabase database is set up with the SQL script
- [ ] You have your Supabase credentials ready
- [ ] You know your owner email address

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest and recommended way to deploy Next.js apps.

**Pros:**
- Zero configuration for Next.js
- Automatic HTTPS
- Global CDN
- Preview deployments for every git push
- Free tier is generous

**Cons:**
- None for this use case

**Steps:** See SETUP.md Step 4

### Option 2: Other Platforms

You can also deploy to:
- **Netlify**: Similar to Vercel
- **Railway**: Good for full-stack apps
- **Fly.io**: Good for global deployment
- **Self-hosted**: VPS with Node.js

All require:
1. Node.js 18+ support
2. Environment variables configuration
3. Build command: `npm run build`
4. Start command: `npm start`

## Environment Variables

Your production deployment needs these three variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
NEXT_PUBLIC_OWNER_EMAIL=your@email.com
```

### Important Notes:

1. **Never commit these to Git** - They're in `.gitignore`
2. **Set them in your deployment platform** - Vercel/Netlify/etc
3. **NEXT_PUBLIC_ prefix is required** - These are client-side variables
4. **Owner email must be exact** - Typos will prevent registration

## Post-Deployment Configuration

After deploying, you MUST configure Supabase:

### 1. Update Supabase URL Configuration

Go to: Supabase Dashboard → **Authentication** → **URL Configuration**

**Site URL:**
```
https://your-app.vercel.app
```

**Redirect URLs:**
```
https://your-app.vercel.app/**
```

This allows:
- Email confirmation to redirect back to your app
- Password reset emails to work correctly
- OAuth (if you add it later) to work

### 2. Verify Email Templates (Optional)

Go to: Supabase Dashboard → **Authentication** → **Email Templates**

Check the confirmation email template:
- It should include `{{ .ConfirmationURL }}`
- The URL should point to your domain

## Testing Production

After deployment, test these critical paths:

### 1. Authentication Flow

- [ ] Visit your production URL
- [ ] Try to sign up with your owner email
- [ ] Check you receive confirmation email
- [ ] Click confirmation link
- [ ] Verify you're redirected to production site
- [ ] Sign in successfully
- [ ] Verify you see the journal page

### 2. CRUD Operations

- [ ] Create a new entry
- [ ] Verify it saves
- [ ] Edit the entry
- [ ] Verify updates save
- [ ] Delete the entry
- [ ] Verify it's deleted

### 3. Security

- [ ] Try to sign up with a different email (should fail)
- [ ] Verify error message: "Registration is restricted"
- [ ] Sign out
- [ ] Try to access `/journal` directly (should redirect to login)
- [ ] Sign in again
- [ ] Verify you stay logged in after page refresh

### 4. Filtering

- [ ] Create multiple entries with different moods/tags
- [ ] Test search functionality
- [ ] Test mood filter
- [ ] Test tag filter
- [ ] Test combining filters

## Performance Optimization

Your app is already optimized, but here are some tips:

### 1. Vercel Analytics (Optional)

Add Vercel Analytics to track performance:

```bash
npm install @vercel/analytics
```

Then in `app/layout.js`:

```js
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Supabase Connection Pooling

For better performance at scale:

1. Go to Supabase **Database Settings**
2. Enable **Connection Pooler**
3. Use the pooler URL for production (optional, but recommended if you grow)

### 3. Image Optimization

If you add images later:
- Use Next.js `<Image>` component
- Store images in Supabase Storage
- Enable Supabase Image Transformations

## Monitoring

### Monitor Your App

**Vercel:**
- Dashboard shows: Build status, deployment history, errors
- Analytics tab: Performance metrics
- Logs: Real-time function logs

**Supabase:**
- Dashboard → **Logs**: Database queries, auth events, errors
- Dashboard → **Database**: Table sizes, connections
- Dashboard → **API**: Usage stats

### Set Up Alerts (Recommended)

**Vercel:**
1. Project Settings → Notifications
2. Enable: "Deployment failures", "Domain configuration issues"

**Supabase:**
1. Project Settings → **Notifications**
2. Enable: "Database issues", "High error rate"

## Backup Strategy

Your data is safe in Supabase, but consider:

### 1. Supabase Automatic Backups

- Free tier: Daily backups (7-day retention)
- Pro tier: Point-in-time recovery

No action needed - this is automatic!

### 2. Manual Export (Optional)

To export your entries locally:

```sql
-- Run this in Supabase SQL Editor
SELECT * FROM journal_entries;
```

Then click "Download CSV" - save this somewhere safe.

### 3. Database Snapshots (Pro Feature)

If you upgrade to Supabase Pro:
- You can create manual snapshots
- Restore to any point in time

## Updating Your App

To deploy changes:

### 1. Make Changes Locally

- Edit your code
- Test locally with `npm run dev`
- Commit changes: `git commit -am "Description of changes"`

### 2. Push to GitHub

```bash
git push origin main
```

### 3. Automatic Deployment

- Vercel automatically detects the push
- Builds and deploys the new version
- Zero downtime deployment

### 4. Verify

- Visit your production URL
- Verify changes are live
- Test critical functionality

## Rollback

If something goes wrong:

1. Go to Vercel dashboard
2. Click on your project
3. Go to "Deployments"
4. Find the last working deployment
5. Click "..." → "Promote to Production"

Instant rollback!

## Custom Domain (Optional)

To use your own domain (e.g., `journal.yourdomain.com`):

### 1. Add Domain in Vercel

1. Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions

### 2. Update Supabase

1. Supabase → **Authentication** → **URL Configuration**
2. Update Site URL to your custom domain
3. Update Redirect URLs

## Security Best Practices

### 1. Regular Updates

Keep dependencies updated:

```bash
npm outdated
npm update
```

Run this monthly.

### 2. Enable 2FA

- **Supabase**: Settings → Account → Enable 2FA
- **Vercel**: Settings → Security → Enable 2FA
- **GitHub**: Settings → Security → Enable 2FA

### 3. Monitor Access Logs

Check Supabase logs regularly:
- Dashboard → **Logs** → **Auth logs**
- Look for failed login attempts
- Verify only your IP addresses

### 4. Rotate Secrets (Advanced)

Every 6-12 months, consider rotating:
- Supabase anon key (generate new, update env vars)
- Supabase database password

## Troubleshooting Deployment

### Build Fails

**Error: "Module not found"**
- Solution: Run `npm install` locally, commit `package-lock.json`

**Error: "Environment variable not set"**
- Solution: Check Vercel environment variables are set correctly

### Runtime Errors

**Error: "Failed to fetch entries"**
- Check Supabase RLS policies are set up
- Verify Supabase URL/key in env vars
- Check Supabase logs for errors

**Error: "Not authorized"**
- Check you're logged in
- Clear cookies and sign in again
- Verify auth middleware is working

### Email Issues

**Confirmation emails not received**
- Check spam folder
- Verify email in Supabase → **Authentication** → **Users**
- Check Supabase email rate limits (60/hour on free tier)

**Confirmation link doesn't work**
- Verify Supabase redirect URLs include your production domain
- Check Site URL is correct
- Try copying link manually instead of clicking

## Cost Estimation

### Free Tier Limits

**Supabase:**
- 500 MB database storage
- 2 GB file storage
- 50,000 monthly active users
- 2 GB bandwidth

For a personal journal: **You'll never hit these limits**

**Vercel:**
- 100 GB bandwidth
- 100 hours build time
- Unlimited deployments

For this app: **Free forever**

### When to Upgrade

You probably never need to upgrade for personal use, but:

**Supabase Pro ($25/month):**
- Point-in-time recovery
- Better support
- No "Powered by Supabase" branding

**Vercel Pro ($20/month):**
- Better analytics
- Password-protected deployments
- Priority support

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Your journal is now live and secure! 🚀**
