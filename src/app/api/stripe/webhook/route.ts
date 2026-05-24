import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.user_id

      if (userId) {
        const { error } = await supabase
          .from("profiles")
          .update({
            is_subscribed: true,
            subscription_status: "active",
            stripe_subscription_id: session.subscription as string,
          })
          .eq("id", userId)

        if (error) console.error("Supabase update error:", error)
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      await supabase
        .from("profiles")
        .update({
          is_subscribed: false,
          subscription_status: "canceled",
          stripe_subscription_id: null,
        })
        .eq("stripe_subscription_id", subscription.id)
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string }
      if (invoice.subscription) {
        await supabase
          .from("profiles")
          .update({ subscription_status: "past_due" })
          .eq("stripe_subscription_id", invoice.subscription)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}