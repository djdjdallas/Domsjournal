import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime, getMoodEmoji, getTagColor, truncate } from '@/lib/utils'

/**
 * EntryCard Component
 * Displays a journal entry preview in the timeline
 * Shows: date, title, mood, tags, and content preview
 */
export function EntryCard({ entry }) {
  return (
    <Link href={`/journal/${entry.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {entry.title && (
                <h3 className="font-semibold text-lg mb-1 truncate">
                  {entry.title}
                </h3>
              )}
              <p className="text-sm text-gray-500">
                {formatRelativeTime(entry.created_at)}
              </p>
            </div>
            {entry.mood && (
              <div className="flex-shrink-0 text-2xl">
                {getMoodEmoji(entry.mood)}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Content preview */}
          <p className="text-gray-700 leading-relaxed">
            {truncate(entry.content, 150)}
          </p>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={getTagColor(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
