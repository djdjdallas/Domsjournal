'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EntryForm } from '@/components/journal/EntryForm'
import { formatDate, getMoodEmoji, getTagColor } from '@/lib/utils'

/**
 * EntryDetail Component
 * Displays a single entry with view/edit/delete capabilities
 */
export default function EntryDetail({ entry }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleUpdate = async (formData) => {
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({
          title: formData.title,
          content: formData.content,
          mood: formData.mood,
          tags: formData.tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', entry.id)

      if (error) throw error

      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error('Error updating entry:', error)
      alert('Failed to update entry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    // Confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this entry? This action cannot be undone.'
    )

    if (!confirmed) return

    setIsDeleting(true)

    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', entry.id)

      if (error) throw error

      router.push('/journal')
      router.refresh()
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry. Please try again.')
      setIsDeleting(false)
    }
  }

  // Edit mode
  if (isEditing) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Edit Entry</h2>
          </CardHeader>
          <CardContent>
            <EntryForm
              entry={entry}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  // View mode
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      {/* Entry Content */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            {/* Title and Mood */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {entry.title && (
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {entry.title}
                  </h1>
                )}
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <p>Created: {formatDate(entry.created_at)}</p>
                  {entry.updated_at !== entry.created_at && (
                    <p>Updated: {formatDate(entry.updated_at)}</p>
                  )}
                </div>
              </div>
              {entry.mood && (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-4xl">{getMoodEmoji(entry.mood)}</span>
                  <span className="text-xs text-gray-600 capitalize">
                    {entry.mood}
                  </span>
                </div>
              )}
            </div>

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
          </div>
        </CardHeader>
        <CardContent>
          {/* Content */}
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
              {entry.content}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
