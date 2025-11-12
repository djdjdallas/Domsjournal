'use client'

import { getTagColor, cn } from '@/lib/utils'

const availableTags = [
  { value: 'win', label: 'Win' },
  { value: 'lesson', label: 'Lesson' },
  { value: 'challenge', label: 'Challenge' },
  { value: 'milestone', label: 'Milestone' },
  { value: 'idea', label: 'Idea' },
]

/**
 * TagSelector Component
 * Multi-select chip selector for categorizing journal entries
 */
export function TagSelector({ value = [], onChange }) {
  const toggleTag = (tag) => {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag))
    } else {
      onChange([...value, tag])
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tags (optional)</label>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const isSelected = value.includes(tag.value)
          return (
            <button
              key={tag.value}
              type="button"
              onClick={() => toggleTag(tag.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                isSelected
                  ? getTagColor(tag.value)
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              )}
            >
              {tag.label}
            </button>
          )
        })}
      </div>
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all tags
        </button>
      )}
    </div>
  )
}
