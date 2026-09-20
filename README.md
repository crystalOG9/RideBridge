# 🚗 RideBridge — Carpool & Ride-Sharing Platform

> **The Trusted Bridge Between Drivers and Passengers**  
> *"I'm already going there. If you're going there too, let's share the journey."*

RideBridge connects drivers who are traveling from Point A to Point B and have empty car seats with passengers who want to travel along the same or overlapping route. The platform acts as a trusted bridge where both parties agree directly on travel contributions without mandatory ticket markups.

---

## 🌟 Key Features

* **Dual Driver & Passenger Experience**: Flexible user model allowing anyone to offer empty seats or request a ride.
* **Smart Matching & Ranking**: Evaluates origin, destination, departure date, seat availability, and driver trust.
* **Direct Coordination & Chat**: In-app private communication to discuss pickup points, luggage space, and mutual fuel share.
* **Honest Trust & Verification**: Verified driver badges and rating metrics without deceptive badges.
* **Provider-Agnostic Architecture**:
  * **Maps**: Abstracted service supporting Mapbox, Google Maps, OpenStreetMap, and fallback mode.
  * **Payments**: Clean payment abstraction with demo mock checkout ready for Razorpay/Stripe.
* **Responsive Modern UI**: Built with Tailwind CSS, featuring desktop navigation and an intuitive mobile bottom bar.
* **Future Monetization Ready**: Demonstrates optional ₹10 detailed route unlocks, ₹20 featured driver boosts, and subscriptions.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 16 (App Router + Turbopack)
* **Frontend**: React 19, TypeScript 5, Tailwind CSS
* **Icons**: Lucide React
* **Backend & DB**: Supabase (PostgreSQL, Auth, RLS)
* **Deployment**: Vercel-ready

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/crystalOG9/RideBridge.git
cd RideBridge
npm install
```

### 2. Configure Environment Variables

Copy the example configuration file:

```bash
cp .env.example .env.local
```

Configure your Supabase and provider keys in `.env.local`:

```env
NEXT_PUBLIC_APP_NAME="RideBridge"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase (Phase 2 & 3)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Map Provider (Phase 7)
NEXT_PUBLIC_MAP_PROVIDER=fallback
NEXT_PUBLIC_MAP_API_KEY=

# Payment Gateway (Phase 9)
NEXT_PUBLIC_PAYMENT_PROVIDER=demo
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Public Landing Page
│   ├── trips/            # Discovery, Details ([id]), and Create
│   ├── dashboard/        # Role-aware user hub
│   ├── my-trips/         # Driver trip management
│   ├── requests/         # Driver & passenger seat requests
│   ├── connections/      # Confirmed driver-passenger bridges
│   ├── messages/         # Rider communication
│   ├── profile/          # User trust standing & vehicles
│   ├── settings/         # Safety & notification settings
│   └── login / signup / forgot-password
├── components/
│   ├── layout/           # Navbar, Footer, MobileNav
│   ├── trips/            # TripCard, TripSearchForm
│   └── ui/               # Badges, StatusBadge, VerificationBadge, EmptyState
├── lib/
│   ├── services/         # MapService, MatchingService, PaymentService
│   ├── supabase/         # Supabase client setup
│   └── mock-data.ts      # Domain seed dataset
└── types/                # TypeScript domain models
```

---

## 📄 License
MIT License. Built for community-first peer transportation.
