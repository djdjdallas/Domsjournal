import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EntryDetail from './EntryDetail'

/**
 * Entry Detail Page (Server Component)
 * Fetches and displays a single journal entry
 * Allows editing and deletion
 */
export default async function EntryPage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch the entry
  const { data: entry, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !entry) {
    notFound()
  }

  return <EntryDetail entry={entry} />
}
