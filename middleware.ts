import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value
  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/settings")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Redirect authenticated users from login page to dashboard
  if (pathname === "/login" && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/login"],
}
