import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Not Found Page for Journal Entries
 * Displayed when an entry doesn't exist or user doesn't have access
 */
export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="pt-6 text-center space-y-4">
          <div className="text-6xl">📝</div>
          <h2 className="text-2xl font-bold text-gray-900">Entry Not Found</h2>
          <p className="text-gray-600">
            This journal entry doesn't exist or you don't have permission to view it.
          </p>
          <Link href="/journal">
            <Button>Return to Journal</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
