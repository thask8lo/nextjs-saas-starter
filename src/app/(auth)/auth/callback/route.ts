import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const next = searchParams.get('next') ?? '/dashboard'

  // Full implementation available in the complete package.
  return NextResponse.redirect(`${origin}${next}`)
}