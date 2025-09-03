import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware to handle static assets and API routes under /blog basePath
// No path rewriting needed since basePath is already set to '/blog'

const PUBLIC_ASSET = /^\/blog\/(?:_next|static|favicon|apple-touch-icon|favicon-16x16|favicon-32x32|site.webmanifest|blog-post-images)\//i

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/blog/')) return NextResponse.next()

  if (PUBLIC_ASSET.test(pathname) || pathname.startsWith('/blog/api/')) {
    return NextResponse.next()
  }

  // For all other /blog/* routes, let Next.js handle them normally
  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/:path*'],
}
