'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MoodSelector } from './MoodSelector'
import { TagSelector } from './TagSelector'
import { Label } from '@/components/ui/label'

/**
 * EntryForm Component
 * Form for creating or editing journal entries
 * Features:
 * - Auto-save draft to localStorage
 * - Auto-growing textarea
 * - Optional title, mood, and tags
 */
export function EntryForm({ entry = null, onSubmit, onCancel, isSubmitting = false }) {
  const [title, setTitle] = useState(entry?.title || '')
  const [content, setContent] = useState(entry?.content || '')
  const [mood, setMood] = useState(entry?.mood || null)
  const [tags, setTags] = useState(entry?.tags || [])
  const textareaRef = useRef(null)

  // Auto-save draft to localStorage (only for new entries)
  useEffect(() => {
    if (!entry) {
      const draft = { title, content, mood, tags }
      localStorage.setItem('journal-draft', JSON.stringify(draft))
    }
  }, [title, content, mood, tags, entry])

  // Load draft from localStorage on mount (only for new entries)
  useEffect(() => {
    if (!entry) {
      const saved = localStorage.getItem('journal-draft')
      if (saved) {
        try {
          const draft = JSON.parse(saved)
          setTitle(draft.title || '')
          setContent(draft.content || '')
          setMood(draft.mood || null)
          setTags(draft.tags || [])
        } catch (e) {
          // Invalid draft, ignore
        }
      }
    }
  }, [entry])

  // Auto-grow textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }, [content])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim()) {
      alert('Please write something before saving.')
      return
    }

    await onSubmit({
      title: title.trim() || null,
      content: content.trim(),
      mood: mood || null,
      tags: tags.length > 0 ? tags : [],
    })

    // Clear draft after successful submit (only for new entries)
    if (!entry) {
      localStorage.removeItem('journal-draft')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title (optional) */}
      <div className="space-y-2">
        <Label htmlFor="title">Title (optional)</Label>
        <Input
          id="title"
          type="text"
          placeholder="Give your entry a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="text-lg"
        />
      </div>

      {/* Content (required) */}
      <div className="space-y-2">
        <Label htmlFor="content">
          Your thoughts <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="content"
          ref={textareaRef}
          placeholder="What's on your mind? Share your journey, challenges, wins, or lessons learned..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          required
          className="min-h-[200px] text-base leading-relaxed auto-resize-textarea"
          style={{ lineHeight: '1.7' }}
        />
        <p className="text-sm text-gray-500">
          {content.length} characters
        </p>
      </div>

      {/* Mood Selector */}
      <MoodSelector value={mood} onChange={setMood} />

      {/* Tag Selector */}
      <TagSelector value={tags} onChange={setTags} />

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="flex-1"
        >
          {isSubmitting ? 'Saving...' : entry ? 'Update Entry' : 'Save Entry'}
        </Button>
      </div>
    </form>
  )
}
