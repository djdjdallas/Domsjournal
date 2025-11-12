'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { EntryForm } from '@/components/journal/EntryForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * New Entry Page
 * Allows users to create a new journal entry
 */
export default function NewEntryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert('You must be logged in to create an entry')
        router.push('/login')
        return
      }

      // Insert the new entry
      const { data, error } = await supabase
        .from('journal_entries')
        .insert([
          {
            user_id: user.id,
            title: formData.title,
            content: formData.content,
            mood: formData.mood,
            tags: formData.tags,
          },
        ])
        .select()

      if (error) throw error

      // Redirect to the journal timeline
      router.push('/journal')
      router.refresh()
    } catch (error) {
      console.error('Error creating entry:', error)
      alert('Failed to save entry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>New Journal Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <EntryForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  )
}
