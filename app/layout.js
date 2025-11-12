import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SaaS Journey Journal',
  description: 'A private journal for documenting your entrepreneurial journey',
}

/**
 * Root Layout Component
 * This wraps the entire application
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
