'use client'

import { useState } from 'react'
import { EntryCard } from '@/components/journal/EntryCard'
import { SearchFilters } from '@/components/journal/SearchFilters'

/**
 * FilterableEntries Component
 * Client component that handles filtering logic for journal entries
 */
export default function FilterableEntries({ entries }) {
  const [filters, setFilters] = useState({
    searchText: '',
    mood: null,
    tags: [],
  })

  // Filter entries based on current filters
  const filteredEntries = entries.filter((entry) => {
    // Search text filter (searches in title and content)
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase()
      const matchesTitle = entry.title?.toLowerCase().includes(searchLower)
      const matchesContent = entry.content.toLowerCase().includes(searchLower)
      if (!matchesTitle && !matchesContent) return false
    }

    // Mood filter
    if (filters.mood && entry.mood !== filters.mood) {
      return false
    }

    // Tags filter (entry must have ALL selected tags)
    if (filters.tags.length > 0) {
      const entryTags = entry.tags || []
      const hasAllTags = filters.tags.every((tag) => entryTags.includes(tag))
      if (!hasAllTags) return false
    }

    return true
  })

  return (
    <>
      {/* Search and Filters */}
      <SearchFilters onFilterChange={setFilters} />

      {/* Results */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-600">
              No entries match your filters. Try adjusting your search.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              Showing {filteredEntries.length} of {entries.length} entries
            </p>
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {filteredEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
