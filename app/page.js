import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Home Page
 * Redirects to /journal if logged in, otherwise to /login
 */
export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/journal')
  } else {
    redirect('/login')
  }
}
