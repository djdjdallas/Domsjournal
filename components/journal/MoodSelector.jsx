'use client'

import { getMoodEmoji } from '@/lib/utils'
import { cn } from '@/lib/utils'

const moods = [
  { value: 'motivated', label: 'Motivated', emoji: '🚀' },
  { value: 'optimistic', label: 'Optimistic', emoji: '🌟' },
  { value: 'breakthrough', label: 'Breakthrough', emoji: '💡' },
  { value: 'challenging', label: 'Challenging', emoji: '😤' },
  { value: 'frustrated', label: 'Frustrated', emoji: '😓' },
]

/**
 * MoodSelector Component
 * Allows user to select their current mood with emoji indicators
 */
export function MoodSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">How are you feeling?</label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all",
              "hover:border-primary/50 hover:bg-primary/5",
              value === mood.value
                ? "border-primary bg-primary/10"
                : "border-gray-200 bg-white"
            )}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs font-medium text-gray-700">
              {mood.label}
            </span>
          </button>
        ))}
      </div>
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear mood
        </button>
      )}
    </div>
  )
}
