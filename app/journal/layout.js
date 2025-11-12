import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LogoutButton from './LogoutButton'

/**
 * Journal Layout Component
 * Protected layout that ensures user is authenticated
 * Includes navigation header with logout button
 */
export default async function JournalLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/journal" className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                SaaS Journey Journal
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/journal/new">
                <Button size="sm">
                  New Entry
                </Button>
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        <p>Your private space for documenting the entrepreneurial journey</p>
      </footer>
    </div>
  )
}
