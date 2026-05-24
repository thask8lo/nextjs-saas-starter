import { createClient } from "@/lib/supabase/server"
import { BillingCard } from "@/components/dashboard/billing-card"

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>
      <BillingCard profile={profile} />
    </div>
  )
}