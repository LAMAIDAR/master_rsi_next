import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const PUBLIC_ROUTES = ['/']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Allow API auth route
  if (pathname === '/api/auth') {
    return NextResponse.next()
  }

  // Check token cookie
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const payload = verifyToken(token)

  if (!payload) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/about/:path*',
    '/projets/:path*',
    '/matrices/:path*',
    '/fichiers/:path*',
    '/images/:path*',
    '/quiz/:path*',
    '/stats/:path*',
    '/geolocalisation/:path*',
    '/api/etudiants/:path*',
    '/api/images/:path*',
    '/api/quiz/:path*',
  ],
}