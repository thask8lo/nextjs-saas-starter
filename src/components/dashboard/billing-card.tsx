"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { CreditCard, CheckCircle2 } from "lucide-react"

export function BillingCard({ profile }: { profile: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelLoading, setIsCancelLoading] = useState(false)

  async function handleSubscribe() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error("Something went wrong")
      }
    } catch {
      toast.error("Something went wrong")
    }
    setIsLoading(false)
  }

  async function handleCancel() {
    setIsCancelLoading(true)
    try {
      const response = await fetch("/api/stripe/cancel", { method: "POST" })
      const data = await response.json()
      if (data.success) {
        toast.success("Subscription cancelled at end of billing period")
      } else {
        toast.error("Something went wrong")
      }
    } catch {
      toast.error("Something went wrong")
    }
    setIsCancelLoading(false)
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            {profile?.is_subscribed
              ? "You are on the Pro plan"
              : "You are on the Free plan"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile?.is_subscribed ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                Active subscription
              </div>
              <p className="text-sm text-muted-foreground">
                Status: {profile?.subscription_status}
              </p>
              {profile?.subscription_status !== "cancel_at_period_end" && (
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  disabled={isCancelLoading}
                >
                  {isCancelLoading ? "Cancelling..." : "Cancel subscription"}
                </Button>
              )}
              {profile?.subscription_status === "cancel_at_period_end" && (
                <p className="text-sm text-muted-foreground">
                  Your subscription will be cancelled at the end of the billing period.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Full access to all features
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Cancel anytime
                </li>
              </ul>
              <Button onClick={handleSubscribe} disabled={isLoading}>
                {isLoading ? "Loading..." : "Upgrade to Pro"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}