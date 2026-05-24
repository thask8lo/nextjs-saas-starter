import { NextResponse, type NextRequest } from 'next/server'

// Full session management implementation included in the complete package.
// Handles auth token refresh and protected route redirects.
// Get it at: https://7538195787226.gumroad.com/l/

export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request })
}
