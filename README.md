# SaaS Journey Journal

A private, secure journal application for documenting your entrepreneurial journey. Built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- **Secure Authentication**: Email/password login with restricted registration (owner-only)
- **Rich Journal Entries**: Add title, content, mood indicators, and tags
- **Advanced Filtering**: Search and filter entries by text, mood, and tags
- **Auto-save Drafts**: Never lose your thoughts with localStorage draft saving
- **Responsive Design**: Beautiful, minimal UI that works on all devices
- **Row-Level Security**: Your data is protected with Supabase RLS policies

## Tech Stack

- **Framework**: Next.js 15 (JavaScript) with App Router
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up free](https://supabase.com))
- A Vercel account for deployment ([sign up free](https://vercel.com))

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (takes ~2 minutes)
3. Once ready, go to **Project Settings** → **API**
4. Copy your **Project URL** and **anon/public key**

### 2. Set Up the Database

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy the contents of `supabase-setup.sql` from this project
3. Paste it into the SQL Editor and click **Run**
4. Verify the setup by going to **Table Editor** - you should see `journal_entries` table

### 3. Install Dependencies

```bash
# Install all required packages
npm install
```

### 4. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your values:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_OWNER_EMAIL=your@email.com
```

**Important**: Replace `your@email.com` with YOUR actual email address. Only this email will be able to register an account.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create Your Account

1. Click "Sign up" on the login page
2. Enter your email (must match `NEXT_PUBLIC_OWNER_EMAIL`)
3. Enter a secure password (minimum 6 characters)
4. Check your email for the confirmation link
5. Click the confirmation link
6. You can now sign in!

## Deployment to Vercel

### 1. Push to GitHub

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: (leave default)

5. Add **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_OWNER_EMAIL`

6. Click **Deploy**

7. Wait for deployment to complete (~2 minutes)

8. Your journal is now live! 🎉

### 3. Configure Supabase Redirects (Important!)

1. In Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Site URL**: `https://your-app.vercel.app`
3. Add to **Redirect URLs**: `https://your-app.vercel.app/**`

## Project Structure

```
/app
  /(journal)
    /journal
      page.js              # Journal timeline
      loading.js           # Loading state
      FilterableEntries.jsx # Client-side filtering
      LogoutButton.jsx     # Logout functionality
      /new
        page.js            # Create new entry
      /[id]
        page.js            # View/edit entry
        EntryDetail.jsx    # Entry detail component
        not-found.js       # Entry not found page
      layout.js            # Protected layout with nav
  /login
    page.js                # Login/signup page
  layout.js                # Root layout
  page.js                  # Home (redirects)
  globals.css              # Global styles

/components
  /journal
    EntryCard.jsx          # Entry preview card
    EntryForm.jsx          # Create/edit form
    MoodSelector.jsx       # Mood selection UI
    TagSelector.jsx        # Tag selection UI
    SearchFilters.jsx      # Search and filter UI
  /ui
    button.jsx             # Button component
    input.jsx              # Input component
    textarea.jsx           # Textarea component
    label.jsx              # Label component
    badge.jsx              # Badge component
    card.jsx               # Card component

/lib
  /supabase
    client.js              # Client-side Supabase client
    server.js              # Server-side Supabase client
  utils.js                 # Utility functions

middleware.js              # Auth middleware
supabase-setup.sql         # Database setup script
```

## Key Features Explained

### Row-Level Security (RLS)

Your journal entries are protected by Supabase RLS policies. This means:
- Even if someone gets your API keys, they cannot access your entries
- Each user can only see, create, edit, and delete their own entries
- The database enforces this at the SQL level - it's bulletproof

### Auto-save Drafts

When creating a new entry, your draft is automatically saved to `localStorage` as you type. If you accidentally close the tab, your content will be there when you return.

### Mood Tracking

Track your emotional state with each entry:
- 🚀 Motivated
- 🌟 Optimistic
- 💡 Breakthrough
- 😤 Challenging
- 😓 Frustrated

### Smart Tagging

Categorize entries with tags:
- **Win**: Celebrate your victories
- **Lesson**: Document what you learned
- **Challenge**: Track obstacles you're facing
- **Milestone**: Mark important achievements
- **Idea**: Capture new ideas

### Advanced Filtering

Filter your entries by:
- **Search text**: Searches in titles and content
- **Mood**: Show only entries with a specific mood
- **Tags**: Show entries that have all selected tags

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Use a strong password** - Your Supabase password protects all your data
3. **Don't share your environment variables** - Keep them secret
4. **Only use your owner email** - Don't share it; only you can register
5. **Enable 2FA on Supabase** - Extra security for your database

## Troubleshooting

### "Failed to save entry"
- Check that you're logged in
- Verify your internet connection
- Check browser console for errors
- Ensure RLS policies are set up correctly in Supabase

### "Entry not found"
- The entry might have been deleted
- You might not have permission to view it
- Check the URL is correct

### "Registration is restricted"
- Verify `NEXT_PUBLIC_OWNER_EMAIL` matches the email you're using
- Check for typos in your `.env.local` file
- Restart the dev server after changing environment variables

### Can't sign in after email confirmation
- Check you clicked the confirmation link in your email
- Try resending the confirmation email from Supabase dashboard
- Check Supabase logs in the dashboard for errors

## Customization

### Change Colors

Edit `app/globals.css` and modify the CSS variables:
```css
:root {
  --primary: 243 75% 59%;  /* Change this for different accent color */
}
```

### Add More Moods

Edit `components/journal/MoodSelector.jsx` and add to the `moods` array:
```js
{ value: 'excited', label: 'Excited', emoji: '🎉' }
```

### Add More Tags

Edit `components/journal/TagSelector.jsx` and add to `availableTags`:
```js
{ value: 'feature', label: 'Feature' }
```

Then update `lib/utils.js` to add the tag color in `getTagColor()`.

## Architecture Decisions

### Why Next.js 15 App Router?

- **Server Components**: Faster initial page loads with RSC
- **Streaming**: Better loading states with Suspense
- **Server Actions**: Simpler data mutations
- **File-based routing**: Clear, predictable structure

### Why Supabase?

- **PostgreSQL**: Robust, reliable database
- **Built-in Auth**: No need to build authentication from scratch
- **Row-Level Security**: Database-level security that can't be bypassed
- **Real-time**: Easy to add real-time features later
- **Free tier**: Generous limits for personal projects

### Why JavaScript (not TypeScript)?

- **Faster development**: Less boilerplate for a solo project
- **Easier to understand**: More accessible if you want to modify it
- **Still safe**: PropTypes and JSDoc comments provide type hints

### Server vs Client Components

- **Server Components** (default): Used for data fetching and SEO
  - `/journal/page.js` - Fetches entries server-side
  - `/journal/[id]/page.js` - Fetches single entry
  - `/journal/layout.js` - Checks auth server-side

- **Client Components** ('use client'): Used for interactivity
  - Forms, buttons, filtering, editing
  - Anything with `useState`, `useEffect`, event handlers

## Future Enhancements

Ideas for extending this journal:

- [ ] Export entries to PDF or Markdown
- [ ] Rich text editor with formatting
- [ ] Attach images to entries
- [ ] Monthly/yearly statistics and insights
- [ ] Charts showing mood trends over time
- [ ] Search by date range
- [ ] Favorite/pin important entries
- [ ] Dark mode
- [ ] Email reminders to journal regularly
- [ ] AI-powered insights on your journey

## Support

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review the Supabase logs in your dashboard
3. Check the browser console for errors
4. Verify all environment variables are set correctly

## License

This is a personal project. Feel free to use it for your own journal!

---

**Built with ❤️ for documenting the entrepreneurial journey**
# Domsjournal
