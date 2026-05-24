import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container flex max-w-4xl flex-col items-center gap-8 text-center px-4">
        
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Next.js SaaS Starter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Production-ready boilerplate with authentication, billing, and everything 
            you need to launch your SaaS — in minutes, not weeks.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1">
            ✓ Next.js 14 + TypeScript
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1">
            ✓ Supabase Auth
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1">
            ✓ Stripe Subscriptions
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1">
            ✓ Tailwind + shadcn/ui
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1">
            ✓ Dark Mode
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1">
            ✓ Deploy Ready
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

      </div>
    </main>
  )
}