import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

/**
 * Middleware runs on every request before the page is rendered
 * This refreshes the user's session to keep them logged in
 *
 * Without this middleware, the user's session would expire after a short time
 */
export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the session
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if trying to access protected routes without auth
  if (!user && request.nextUrl.pathname.startsWith('/journal')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to journal if logged in and trying to access login
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/journal', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
