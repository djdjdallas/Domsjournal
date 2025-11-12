import { createBrowserClient } from '@supabase/ssr'

/**
 * Create a Supabase client for client-side operations
 * This is used in Client Components (components with 'use client')
 *
 * The client uses the public anon key, but RLS policies protect your data
 * Even with the anon key, users can only access their own journal entries
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
