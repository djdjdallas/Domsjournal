'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { getMoodEmoji, getTagColor, cn } from '@/lib/utils'

const moods = ['motivated', 'optimistic', 'breakthrough', 'challenging', 'frustrated']
const tags = ['win', 'lesson', 'challenge', 'milestone', 'idea']

/**
 * SearchFilters Component
 * Provides search and filtering UI for journal entries
 * Filters by: search text, mood, and tags
 */
export function SearchFilters({ onFilterChange }) {
  const [searchText, setSearchText] = useState('')
  const [selectedMood, setSelectedMood] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])

  const handleSearchChange = (value) => {
    setSearchText(value)
    onFilterChange({ searchText: value, mood: selectedMood, tags: selectedTags })
  }

  const handleMoodChange = (mood) => {
    const newMood = selectedMood === mood ? null : mood
    setSelectedMood(newMood)
    onFilterChange({ searchText, mood: newMood, tags: selectedTags })
  }

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newTags)
    onFilterChange({ searchText, mood: selectedMood, tags: newTags })
  }

  const clearFilters = () => {
    setSearchText('')
    setSelectedMood(null)
    setSelectedTags([])
    onFilterChange({ searchText: '', mood: null, tags: [] })
  }

  const hasActiveFilters = searchText || selectedMood || selectedTags.length > 0

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      {/* Search Input */}
      <div>
        <Input
          type="text"
          placeholder="Search entries..."
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Mood Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Filter by mood</label>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => handleMoodChange(mood)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium border transition-all",
                selectedMood === mood
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              )}
            >
              {getMoodEmoji(mood)} {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Filter by tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                  isSelected
                    ? getTagColor(tag)
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                )}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
