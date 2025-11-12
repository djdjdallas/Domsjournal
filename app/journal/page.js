import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EntryCard } from '@/components/journal/EntryCard'
import FilterableEntries from './FilterableEntries'

/**
 * Journal Timeline Page
 * Displays all journal entries in chronological order (newest first)
 * Includes search and filtering capabilities
 */
export default async function JournalPage() {
  const supabase = await createClient()

  // Fetch all journal entries for the current user
  const { data: entries, error } = await supabase
    .from('journal_entries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching entries:', error)
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading entries. Please try again.</p>
      </div>
    )
  }

  // Empty state
  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome to Your Journey
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Your journal is empty. Start documenting your SaaS journey today!
            Share your challenges, wins, and lessons learned.
          </p>
        </div>
        <Link href="/journal/new">
          <Button size="lg">
            Write Your First Entry
          </Button>
        </Link>
      </div>
    )
  }

  // Show entries with filtering
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Journal</h2>
          <p className="text-gray-600 mt-1">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </div>

      {/* Filterable entries list */}
      <FilterableEntries entries={entries} />
    </div>
  )
}
