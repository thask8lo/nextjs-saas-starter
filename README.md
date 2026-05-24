# Next.js SaaS Starter

**Live demo: https://nextjs-saas-starter-full.onrender.com**

A production-ready Next.js boilerplate with authentication, Stripe subscriptions, and everything you need to launch your SaaS — in minutes, not weeks.

## Features

| Feature | Details |
|---|---|
| **Authentication** | Email/password, login, register, reset password |
| **Database** | Supabase + Row Level Security |
| **Billing** | Stripe subscriptions, webhooks, cancellation |
| **UI** | Tailwind CSS + shadcn/ui + dark mode |
| **TypeScript** | Full type safety throughout |
| **Deploy** | Vercel-ready, one-click deploy |

## Stack

- **Next.js 16** — App Router, Server Components
- **TypeScript** — full type safety
- **Supabase** — auth + PostgreSQL database
- **Stripe** — subscription billing
- **Tailwind CSS** — styling
- **shadcn/ui** — UI components
- **Zod** — schema validation
- **React Hook Form** — form handling

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/thask8lo/nextjs-saas-starter
cd nextjs-saas-starter
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`:

- **Supabase** — create a project at [supabase.com](https://supabase.com), copy the URL and keys from Project Settings → API
- **Stripe** — create an account at [stripe.com](https://stripe.com), copy keys from Developers → API Keys

### 3. Set up the database

Run this SQL in your Supabase SQL Editor:

```sql
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  subscription_status text,
  is_subscribed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Test Stripe webhooks locally

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook secret and add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`.

Use test card `4242 4242 4242 4242` with any future expiry and any CVC.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, register, reset password
│   ├── (dashboard)/     # Protected dashboard pages
│   ├── api/stripe/      # Stripe API routes
│   └── page.tsx         # Landing page
├── components/
│   ├── auth/            # Auth forms
│   ├── dashboard/       # Dashboard components
│   └── ui/              # shadcn/ui components
└── lib/
    ├── supabase/        # Supabase client utilities
    └── utils.ts
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add environment variables from `.env.local`
4. Update `NEXT_PUBLIC_APP_URL` to your production URL
5. Add Stripe webhook endpoint in Stripe Dashboard pointing to `https://your-domain.com/api/stripe/webhook`

---

## 📦 Free vs Full Package

This repository contains a **preview** of the project structure, UI components, and pages.

The following modules are available in the **full package only**:

| Module | Free (GitHub) | Full Package |
|---|---|---|
| Project structure + UI | ✅ | ✅ |
| Auth pages (login, register, reset) | ✅ | ✅ |
| Dashboard layout + pages | ✅ | ✅ |
| Supabase server client | Stub | ✅ |
| Supabase session middleware | Stub | ✅ |
| Stripe checkout API | Stub | ✅ |
| Stripe webhook handler | Stub | ✅ |
| Stripe cancel subscription API | Stub | ✅ |
| SQL migration script | — | ✅ |

👉 **Get the full package on [Gumroad](https://7538195787226.gumroad.com/l/cvdfl)**

## License

MIT
