import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes with clsx
 * This helps avoid class conflicts and handles conditional classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to a readable string
 * Example: "Mar 15, 2024 at 3:30 PM"
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date))
}

/**
 * Format a date to a relative time string
 * Example: "2 hours ago", "3 days ago"
 */
export function formatRelativeTime(date) {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now - then) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`
}

/**
 * Truncate text to a specific length
 * Adds "..." if truncated
 */
export function truncate(text, length = 150) {
  if (!text || text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

/**
 * Get mood emoji based on mood string
 */
export function getMoodEmoji(mood) {
  const moodEmojis = {
    challenging: '😤',
    optimistic: '🌟',
    breakthrough: '💡',
    frustrated: '😓',
    motivated: '🚀',
  }
  return moodEmojis[mood] || ''
}

/**
 * Get tag color classes for styling
 */
export function getTagColor(tag) {
  const tagColors = {
    win: 'bg-green-100 text-green-700 border-green-200',
    lesson: 'bg-blue-100 text-blue-700 border-blue-200',
    challenge: 'bg-orange-100 text-orange-700 border-orange-200',
    milestone: 'bg-purple-100 text-purple-700 border-purple-200',
    idea: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  }
  return tagColors[tag] || 'bg-gray-100 text-gray-700 border-gray-200'
}
