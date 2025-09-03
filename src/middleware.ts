import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware to rewrite incoming requests under /blog/:slug to the internal
// route /:slug so statically exported files (or dynamic route handlers)
// that exist at the root slug path are served while keeping basePath = '/blog'.

const PUBLIC_ASSET = /^\/blog\/(?:_next|static|favicon|apple-touch-icon|favicon-16x16|favicon-32x32|site.webmanifest|blog-post-images)\//i

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/blog/')) return NextResponse.next()

  if (PUBLIC_ASSET.test(pathname) || pathname.startsWith('/blog/api/')) {
    return NextResponse.next()
  }

  if (pathname === '/blog' || pathname === '/blog/') return NextResponse.next()

  const newPath = pathname.replace(/^\/blog/, '') || '/'
  const url = req.nextUrl.clone()
  url.pathname = newPath
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/blog/:path*'],
}
