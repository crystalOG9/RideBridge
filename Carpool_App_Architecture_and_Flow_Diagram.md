# CARPOOL / RIDE-SHARING APP — SYSTEM ARCHITECTURE & FLOW
## Antigravity Architecture Specification — File 2 of 2

---

# 0. PURPOSE

This document defines the technical architecture and product flows for the carpool / ride-sharing MVP.

Use this together with:

**File 1 — MVP Development Specification**

File 1 explains WHAT to build.

This file explains:

- HOW the system is structured
- HOW users move through the system
- HOW frontend, backend, Supabase, maps, matching, messaging and payments connect
- HOW data moves through the application
- HOW the architecture should evolve later

IMPORTANT:

Build the architecture modularly.

Do not create a monolithic application.

---

# 1. HIGH-LEVEL PRODUCT ARCHITECTURE

Core system:

```text
                         ┌──────────────────────┐
                         │      USERS           │
                         │                      │
                         │  Driver / Passenger  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   NEXT.JS FRONTEND   │
                         │                      │
                         │ Pages + Components   │
                         │ Forms + Dashboard    │
                         └──────────┬───────────┘
                                    │
                         ┌──────────┴───────────┐
                         │                      │
                         ▼                      ▼
                ┌────────────────┐      ┌────────────────┐
                │ AUTH / SESSION │      │ SERVER / API   │
                └───────┬────────┘      └───────┬────────┘
                        │                       │
                        └───────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │      SUPABASE        │
                         │                      │
                         │ Auth + PostgreSQL    │
                         │ RLS + Storage        │
                         │ Realtime             │
                         └──────────┬───────────┘
                                    │
             ┌──────────────────────┼────────────────────────┐
             │                      │                        │
             ▼                      ▼                        ▼
     ┌───────────────┐      ┌───────────────┐       ┌───────────────┐
     │ MAP PROVIDER  │      │ MATCHING      │       │ PAYMENT       │
     │               │      │ ENGINE        │       │ SERVICE       │
     │ Routes / ETA  │      │ Trip ranking  │       │ Future gateway│
     └───────────────┘      └───────────────┘       └───────────────┘
```

---

# 2. TECHNOLOGY STACK

Recommended:

```text
Frontend:
Next.js
React
TypeScript
Tailwind CSS

Backend:
Next.js server routes / server actions
Supabase

Database:
PostgreSQL through Supabase

Authentication:
Supabase Auth

Storage:
Supabase Storage

Realtime:
Supabase Realtime

Maps:
Mapbox / Google Maps / OpenStreetMap-based provider

Payments:
Payment provider abstraction
Future: Razorpay / Stripe / suitable Indian provider

Hosting:
Vercel

Version Control:
GitHub
```

---

# 3. ARCHITECTURAL PRINCIPLES

## Principle 1 — Separation of concerns

Keep:

UI
Business logic
Database access
External APIs
Authentication
Payments

separate.

---

## Principle 2 — Provider abstraction

Do not tightly couple the whole application to:

- one map provider
- one payment provider
- one notification provider

Use service interfaces.

Example:

```text
MapService
PaymentService
NotificationService
MatchingService
```

---

## Principle 3 — Security first

Frontend must never contain:

- Supabase service-role key
- Payment secret
- Private API secret

Only public/client-safe keys may exist in client environment variables.

---

## Principle 4 — Database security

Supabase RLS must protect all private records.

Never rely only on frontend checks.

---

# 4. APPLICATION LAYERS

The system should have these logical layers:

```text
┌───────────────────────────────────────────┐
│              PRESENTATION                 │
│                                           │
│ Pages / Components / Forms / UI           │
└────────────────────┬──────────────────────┘
                     │
┌────────────────────▼──────────────────────┐
│              APPLICATION                  │
│                                           │
│ Use cases / workflows / validation        │
└────────────────────┬──────────────────────┘
                     │
┌────────────────────▼──────────────────────┐
│              DOMAIN                       │
│                                           │
│ Trip / User / Request / Connection        │
│ Matching / Rules / Status                 │
└────────────────────┬──────────────────────┘
                     │
┌────────────────────▼──────────────────────┐
│              SERVICES                     │
│                                           │
│ Maps / Payments / Notifications           │
│ Messaging / Storage                       │
└────────────────────┬──────────────────────┘
                     │
┌────────────────────▼──────────────────────┐
│              DATA                         │
│                                           │
│ Supabase / PostgreSQL / Storage           │
└───────────────────────────────────────────┘
```

---

# 5. RECOMMENDED PROJECT STRUCTURE

Use a clean Next.js App Router structure.

```text
src/
│
├── app/
│   ├── page.tsx
│   ├── login/
│   ├── signup/
│   ├── forgot-password/
│   ├── dashboard/
│   ├── trips/
│   │   ├── page.tsx
│   │   ├── create/
│   │   └── [id]/
│   ├── my-trips/
│   ├── requests/
│   ├── connections/
│   ├── messages/
│   ├── profile/
│   ├── settings/
│   └── api/
│
├── components/
│   ├── layout/
│   ├── auth/
│   ├── trips/
│   ├── matching/
│   ├── maps/
│   ├── requests/
│   ├── connections/
│   ├── messages/
│   ├── payments/
│   ├── profile/
│   └── ui/
│
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── trips/
│   ├── matching/
│   ├── requests/
│   ├── connections/
│   ├── messages/
│   ├── notifications/
│   ├── payments/
│   └── maps/
│
├── types/
│   ├── user.ts
│   ├── trip.ts
│   ├── request.ts
│   ├── connection.ts
│   ├── message.ts
│   └── payment.ts
│
├── hooks/
│
└── utils/
```

Do not force every file into this structure if a better clean structure is needed.

---

# 6. CORE DOMAIN ENTITIES

The main entities are:

```text
User
 │
 ├── Profile
 │
 ├── Vehicle
 │
 ├── Trips
 │
 ├── Requests
 │
 ├── Connections
 │
 ├── Messages
 │
 ├── Notifications
 │
 └── Payments
```

---

# 7. DATABASE RELATIONSHIP DIAGRAM

```text
                    ┌──────────────┐
                    │   profiles   │
                    │              │
                    │ id           │
                    │ name         │
                    │ email        │
                    │ rating       │
                    └──────┬───────┘
                           │
             ┌─────────────┼───────────────┐
             │             │               │
             ▼             ▼               ▼
       ┌──────────┐   ┌──────────┐   ┌─────────────┐
       │ vehicles │   │  trips   │   │ notifications│
       └────┬─────┘   └────┬─────┘   └─────────────┘
            │              │
            │              │
            │        ┌─────┴──────────────┐
            │        │                    │
            │        ▼                    ▼
            │  ┌──────────────┐    ┌──────────────┐
            │  │trip_requests │    │ connections  │
            │  └──────┬───────┘    └──────┬───────┘
            │         │                   │
            │         └─────────┬─────────┘
            │                   ▼
            │             ┌──────────┐
            │             │ messages │
            │             └──────────┘
            │
            └───────────────> trips
```

---

# 8. USER AUTHENTICATION FLOW

```text
USER
 │
 ▼
Landing Page
 │
 ├───────────────┐
 │               │
 ▼               ▼
LOGIN           SIGNUP
 │               │
 │               ▼
 │        Create Supabase Auth user
 │               │
 │               ▼
 │        Create profile record
 │               │
 └───────┬───────┘
         ▼
    Auth Session
         │
         ▼
     Dashboard
```

---

# 9. SIGNUP FLOW

```text
User enters:
Name
Email
Password
Preferred role

        │
        ▼
Frontend validation
        │
        ▼
Supabase Auth
        │
        ▼
User created
        │
        ▼
Create profile
        │
        ▼
Create session
        │
        ▼
Dashboard
```

Important:

The `profiles.id` should correspond to the authenticated user's ID.

---

# 10. LOGIN FLOW

```text
Login Form
    │
    ▼
Validate input
    │
    ▼
Supabase Auth
    │
    ├── failure → error message
    │
    ▼
Session created
    │
    ▼
Load profile
    │
    ▼
Dashboard
```

---

# 11. DRIVER CREATE-TRIP FLOW

```text
Driver Dashboard
       │
       ▼
POST A TRIP
       │
       ▼
Trip Form
       │
       ├── Origin
       ├── Destination
       ├── Date
       ├── Time
       ├── Seats
       ├── Vehicle
       └── Notes
       │
       ▼
Validate
       │
       ▼
Optional Map Geocoding
       │
       ▼
Create Trip Record
       │
       ▼
status = published
       │
       ▼
Trip Search Index / Query
       │
       ▼
Passenger can discover trip
```

---

# 12. PASSENGER SEARCH FLOW

```text
Passenger
    │
    ▼
Search
    │
    ├── From
    ├── To
    ├── Date
    └── Seats
    │
    ▼
Search API / Database Query
    │
    ▼
Candidate Trips
    │
    ▼
Matching Service
    │
    ├── Origin compatibility
    ├── Destination compatibility
    ├── Date
    └── Seats
    │
    ▼
Ranked Results
    │
    ▼
Trip Cards
```

---

# 13. MATCHING ENGINE FLOW

MVP:

```text
Passenger Search
       │
       ▼
Candidate Trips
       │
       ▼
Check Date
       │
       ▼
Check Available Seats
       │
       ▼
Check Origin
       │
       ▼
Check Destination
       │
       ▼
Calculate Basic Match Score
       │
       ▼
Sort Results
       │
       ▼
Return Trips
```

---

# 14. FUTURE SMART MATCHING FLOW

Future architecture:

```text
Driver Route
     │
     ▼
Route Coordinates
     │
     ▼
Passenger Route
     │
     ▼
Route Coordinates
     │
     ▼
Route Comparison Engine
     │
     ├── Route overlap
     ├── Pickup distance
     ├── Drop distance
     ├── Detour
     ├── Time compatibility
     └── Seat availability
     │
     ▼
Compatibility Score
     │
     ▼
Recommendations
```

Example:

```text
Driver:
Pune → Solapur → Kalaburagi → Hyderabad

Passenger:
Pune → Solapur

Overlap: High
Detour: Low

Match Score: 94%
```

This engine must be a separate service so it can later be replaced with a more advanced algorithm.

---

# 15. TRIP REQUEST FLOW

```text
Passenger
    │
    ▼
Trip Details
    │
    ▼
REQUEST SEAT
    │
    ▼
Create trip_request
status = pending
    │
    ▼
Driver Notification
    │
    ▼
Driver Dashboard
    │
    ├───────────────┐
    │               │
    ▼               ▼
ACCEPT           REJECT
    │               │
    ▼               ▼
accepted         rejected
    │
    ▼
Create Connection
```

---

# 16. CONNECTION FLOW

```text
Accepted Request
       │
       ▼
Create Connection
       │
       ▼
Connection Status
       │
       ├── Driver
       ├── Passenger
       ├── Trip
       └── Request
       │
       ▼
Connection Page
       │
       ├── Trip details
       ├── Contact
       ├── Messages
       └── Safety
```

---

# 17. MESSAGING FLOW

```text
Connection
    │
    ▼
Conversation
    │
    ▼
Message
    │
    ▼
Validate sender
    │
    ▼
Store in messages table
    │
    ▼
Realtime / refresh
    │
    ▼
Receiver sees message
```

Only users belonging to the connection can access the conversation.

---

# 18. NOTIFICATION FLOW

```text
EVENT
 │
 ├── New request
 ├── Request accepted
 ├── Request rejected
 ├── New message
 ├── Trip cancelled
 └── Connection created
 │
 ▼
Notification Service
 │
 ▼
notifications table
 │
 ▼
User Dashboard
```

Future:

```text
Notification
 ├── In-app
 ├── Email
 └── Push
```

---

# 19. MAP FLOW

```text
User enters:
Pune
Hyderabad
      │
      ▼
Map Service
      │
      ├── Geocode origin
      ├── Geocode destination
      │
      ▼
Coordinates
      │
      ▼
Routing API
      │
      ├── Distance
      ├── ETA
      └── Route geometry
      │
      ▼
Map Component
```

Keep the map provider behind a service interface.

---

# 20. PAYMENT FLOW — FUTURE

The platform should not require payments for the actual driver/passenger negotiated price in MVP.

Optional platform purchases:

```text
User
 │
 ▼
Select paid feature
 │
 ├── Route unlock
 ├── Featured trip
 └── Subscription
 │
 ▼
Payment Service
 │
 ▼
Payment Provider
 │
 ▼
Success / Failure
 │
 ▼
Verify server-side
 │
 ▼
payments table
 │
 ▼
Unlock feature
```

Never trust the frontend to declare a payment successful.

---

# 21. MOCK PAYMENT FLOW — MVP

```text
User clicks:
UNLOCK FOR ₹10
       │
       ▼
Payment Modal
       │
       ▼
Demo Payment
       │
       ▼
Success
       │
       ▼
Create payment record
       │
       ▼
Unlock feature
```

Make it obvious that this is a prototype/demo payment.

---

# 22. MONETIZATION ARCHITECTURE

```text
                    PLATFORM
                       │
        ┌──────────────┼───────────────┐
        │              │               │
        ▼              ▼               ▼
 Route Unlock     Featured Trip    Subscription
   ₹10–₹20          ₹20–₹50        ₹99–₹299
        │              │               │
        └──────────────┼───────────────┘
                       ▼
                Payment Service
                       │
                       ▼
                  Payment DB
```

Future:

```text
Confirmed Connection Fee
Corporate Plans
Advertising
Partnerships
```

---

# 23. SAFETY ARCHITECTURE

```text
User
 │
 ├── Profile
 ├── Rating
 ├── Verification status
 ├── Report
 └── Block
```

Trip:

```text
Trip
 │
 ├── Driver identity
 ├── Vehicle
 ├── Trip information
 └── Connection
```

Future:

```text
SOS
Trip sharing
Identity verification
Vehicle verification
Fraud detection
Emergency contacts
```

Do not fake verification.

---

# 24. REPORT FLOW

```text
User
 │
 ▼
Report User
 │
 ▼
Select Reason
 │
 ▼
Create Report
 │
 ▼
Admin / Moderation
 │
 ▼
Review
 │
 ├── Warning
 ├── Restriction
 ├── Suspension
 └── No action
```

Keep moderation architecture separate from normal user features.

---

# 25. CANCELLATION FLOW

Driver can cancel trip.

```text
Driver
 │
 ▼
Cancel Trip
 │
 ▼
Confirmation
 │
 ▼
Trip status = cancelled
 │
 ▼
Find active connections
 │
 ▼
Notify passengers
 │
 ▼
Connection status updated
```

Passenger can cancel their request/connection according to status.

---

# 26. TRIP STATUS MACHINE

Trip:

```text
draft
  │
  ▼
published
  │
  ├───────────────┐
  │               │
  ▼               ▼
full          cancelled
  │
  ▼
completed
```

Do not allow invalid transitions.

---

# 27. REQUEST STATUS MACHINE

```text
pending
  │
  ├─────────────┐
  │             │
  ▼             ▼
accepted      rejected
  │
  ▼
connection
```

Passenger can cancel while appropriate.

---

# 28. CONNECTION STATUS

Suggested:

```text
active
   │
   ├── cancelled
   │
   └── completed
```

---

# 29. DATA FLOW — COMPLETE SYSTEM

```text
                     USER
                      │
                      ▼
                NEXT.JS FRONTEND
                      │
       ┌──────────────┼───────────────┐
       │              │               │
       ▼              ▼               ▼
     AUTH          TRIPS          PROFILE
       │              │               │
       └──────────────┼───────────────┘
                      ▼
                SERVER / API
                      │
       ┌──────────────┼──────────────────┐
       │              │                  │
       ▼              ▼                  ▼
   SUPABASE       MATCHING             MAPS
       │           ENGINE               │
       │              │                  │
       │              └──────────┐       │
       │                         ▼       │
       │                    RESULTS      │
       │                         │       │
       └──────────────┬──────────┘       │
                      ▼                  │
                  CONNECTION             │
                      │                  │
              ┌───────┴────────┐         │
              ▼                ▼         │
          MESSAGES        NOTIFICATIONS  │
              │                │         │
              └────────┬───────┘         │
                       ▼                 │
                     USER ◄──────────────┘
```

---

# 30. COMPLETE USER JOURNEY

## Driver

```text
Landing
  ↓
Signup/Login
  ↓
Dashboard
  ↓
Add Vehicle
  ↓
Create Trip
  ↓
Publish
  ↓
Trip Visible
  ↓
Passenger Request
  ↓
Driver Reviews
  ↓
Accept
  ↓
Connection
  ↓
Message
  ↓
Travel
  ↓
Complete Trip
  ↓
Rating
```

---

## Passenger

```text
Landing
  ↓
Signup/Login
  ↓
Dashboard
  ↓
Search Trip
  ↓
Results
  ↓
View Trip
  ↓
Request Seat
  ↓
Wait
  ↓
Accepted
  ↓
Connection
  ↓
Message
  ↓
Travel
  ↓
Complete Trip
  ↓
Rating
```

---

# 31. COMPLETE SYSTEM FLOW

```text
                         ┌─────────────┐
                         │   DRIVER    │
                         └──────┬──────┘
                                │
                          POST TRIP
                                │
                                ▼
                        ┌───────────────┐
                        │    TRIPS      │
                        │   DATABASE    │
                        └──────┬────────┘
                               │
                               ▼
                         MATCHING ENGINE
                               ▲
                               │
                          SEARCH TRIP
                               │
                               │
                        ┌──────┴──────┐
                        │  PASSENGER  │
                        └──────┬─────┘
                               │
                          REQUEST SEAT
                               │
                               ▼
                         ┌─────────────┐
                         │   DRIVER    │
                         │   REQUEST   │
                         └──────┬──────┘
                                │
                         ACCEPT / REJECT
                                │
                                ▼
                         ┌─────────────┐
                         │ CONNECTION  │
                         └──────┬──────┘
                                │
                     ┌──────────┴─────────┐
                     │                    │
                     ▼                    ▼
                 MESSAGES             NOTIFY
                     │                    │
                     └──────────┬─────────┘
                                ▼
                              TRIP
                                │
                                ▼
                            COMPLETE
                                │
                                ▼
                             RATING
```

---

# 32. FUTURE INTELLIGENT ROUTE NETWORK

The long-term product can evolve from basic search into a route network.

```text
                 DRIVER ROUTES

Pune ───── Solapur ───── Hyderabad
  │            │
  │            └──── Kalaburagi
  │
  └──── Mumbai

                 PASSENGERS

Pune → Solapur
Pune → Hyderabad
Solapur → Hyderabad
Kalaburagi → Hyderabad
Mumbai → Pune
```

The matching engine can identify overlapping segments.

---

# 33. FUTURE MATCHING SCORE

Potential formula:

```text
Match Score =

Route Compatibility
+ Time Compatibility
+ Seat Availability
+ Low Detour
+ Pickup Compatibility
+ Drop Compatibility
+ Driver Reliability
+ Passenger Reliability
```

Example:

```text
Route compatibility      35%
Time compatibility       20%
Detour                   20%
Pickup/drop proximity    10%
Seats                     5%
Reliability              10%

Total                    100%
```

These weights are examples only and should be tested later.

Do not hard-code this as a permanent business rule.

---

# 34. FUTURE ARCHITECTURE

After MVP:

```text
                     FRONTEND
                        │
                        ▼
                    API LAYER
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   CORE SERVICES   MATCHING ENGINE   PAYMENT
        │               │                │
        │               ▼                │
        │        ROUTE OPTIMIZATION      │
        │               │                │
        └───────────────┼────────────────┘
                        ▼
                   SUPABASE DB
                        │
       ┌────────────────┼──────────────────┐
       │                │                  │
       ▼                ▼                  ▼
  Notifications     Analytics          Admin
```

---

# 35. SCALABILITY PRINCIPLES

The first version can use a relatively simple architecture.

As usage increases:

- Add database indexes
- Optimize search queries
- Cache common routes
- Use background jobs for notifications
- Separate heavy matching calculations
- Add monitoring/logging
- Add rate limiting
- Optimize map API calls
- Add search infrastructure if necessary

Do NOT prematurely build microservices.

Start modular monolith.

---

# 36. API RESPONSIBILITIES

Potential API routes:

```text
POST   /api/trips
GET    /api/trips
GET    /api/trips/[id]
PATCH  /api/trips/[id]
DELETE /api/trips/[id]

POST   /api/trips/[id]/requests
GET    /api/requests
PATCH  /api/requests/[id]

GET    /api/connections
GET    /api/connections/[id]

POST   /api/messages
GET    /api/connections/[id]/messages

POST   /api/matching/search

POST   /api/payments/create
POST   /api/payments/verify

GET    /api/notifications
PATCH  /api/notifications/[id]
```

These are logical examples. Use the cleanest implementation for Next.js.

---

# 37. API VALIDATION FLOW

Every API request:

```text
Request
  │
  ▼
Authentication check
  │
  ▼
Authorization check
  │
  ▼
Input validation
  │
  ▼
Business rules
  │
  ▼
Database operation
  │
  ▼
Response
```

Never skip authorization because the frontend hides a button.

---

# 38. PERFORMANCE RULES

Avoid:

- Fetching entire trip database
- Loading huge images
- Repeated map API requests
- Unnecessary client-side rendering
- Duplicate database requests

Use:

- Pagination
- Debounced search
- Server-side queries where appropriate
- Image optimization
- Database indexes
- Caching where useful

---

# 39. OBSERVABILITY

Prepare for:

- Error logging
- API error tracking
- Database errors
- Payment errors
- Matching failures

During development:

Always inspect:

- Browser console
- Server logs
- Build output

---

# 40. TESTING ARCHITECTURE

Test layers:

```text
UI Tests
   ↓
API Tests
   ↓
Business Logic Tests
   ↓
Database / RLS Tests
```

Important test cases:

### Driver
- Can create own trip
- Cannot modify another driver's trip

### Passenger
- Can request available trip
- Cannot request cancelled trip

### Connection
- Only accepted requests create connections

### Messaging
- Only participants can access messages

### Payments
- Payment cannot be marked successful by client alone

---

# 41. MOBILE ARCHITECTURE

Mobile navigation:

```text
Home
Trips
Requests
Messages
Profile
```

Use bottom navigation where appropriate.

Create mobile-specific UX for:

- Search
- Trip cards
- Request flow
- Messaging

Do not simply shrink desktop components.

---

# 42. SECURITY THREAT MODEL

Protect against:

- Unauthorized trip modification
- Unauthorized profile access
- Message access
- Fake payment success
- API abuse
- Spam trip creation
- Fake reports
- Account takeover
- Secret key exposure

Future:

- Rate limiting
- CAPTCHA
- Device/session monitoring
- Fraud detection

---

# 43. PRIVACY PRINCIPLES

Do not publicly expose:

- Personal phone number by default
- Exact home address
- Sensitive personal information
- Private messages
- Payment information

Only reveal information needed for the trip and connection.

Pickup details can be finalized privately after connection.

---

# 44. ADMIN ARCHITECTURE

Future admin:

```text
Admin
 │
 ├── Users
 ├── Trips
 ├── Requests
 ├── Connections
 ├── Reports
 ├── Payments
 ├── Verification
 └── Analytics
```

Admin access must use a separate authorization role.

Do not rely on a hidden frontend route.

---

# 45. ARCHITECTURE DECISION: MODULAR MONOLITH

For this project:

**Use a modular monolith first.**

Meaning:

```text
One Next.js application
       +
One Supabase project
       +
Modular business services
```

Do NOT start with:

- Microservices
- Kubernetes
- Multiple databases
- Complex queues

The system is a prototype and should stay easy to develop.

---

# 46. PHASED ARCHITECTURE IMPLEMENTATION

## Phase 1
Frontend foundation

```text
Next.js
Components
Routing
Responsive UI
```

## Phase 2
Authentication

```text
Supabase Auth
Profiles
Protected routes
```

## Phase 3
Database

```text
Profiles
Vehicles
Trips
Requests
Connections
```

## Phase 4
Trip system

```text
Create
Search
View
Edit
Cancel
```

## Phase 5
Connection system

```text
Requests
Accept/reject
Connections
Messaging
```

## Phase 6
Maps

```text
Geocoding
Routes
ETA
```

## Phase 7
Matching

```text
Basic ranking
Future smart matching
```

## Phase 8
Monetization

```text
Mock payments
Route unlock
Featured trip
Subscriptions
```

## Phase 9
Safety

```text
Reports
Blocks
Ratings
Verification architecture
```

## Phase 10
Testing and deployment

```text
Security
RLS
Performance
Mobile
Vercel
```

---

# 47. SINGLE COMPLETE ARCHITECTURE DIAGRAM

```text
                              USERS
                    ┌───────────┴───────────┐
                    │                       │
                 DRIVER                 PASSENGER
                    │                       │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │      NEXT.JS APP      │
                    │                       │
                    │ Landing               │
                    │ Auth                  │
                    │ Dashboard             │
                    │ Trips                 │
                    │ Requests              │
                    │ Connections           │
                    │ Messages              │
                    │ Profile               │
                    │ Payments              │
                    └───────────┬───────────┘
                                │
                 ┌──────────────┼──────────────┐
                 │              │              │
                 ▼              ▼              ▼
             AUTH SERVICE   API/SERVER    UI SERVICES
                 │              │
                 │              ▼
                 │       ┌───────────────┐
                 │       │ DOMAIN LOGIC  │
                 │       │               │
                 │       │ Trips         │
                 │       │ Requests      │
                 │       │ Connections   │
                 │       │ Matching      │
                 │       │ Notifications │
                 │       └───────┬───────┘
                 │               │
                 └───────┬───────┘
                         ▼
                  ┌───────────────┐
                  │   SUPABASE    │
                  │               │
                  │ Auth          │
                  │ PostgreSQL    │
                  │ RLS           │
                  │ Storage       │
                  │ Realtime      │
                  └───────┬───────┘
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
       MAPS API       PAYMENT API     NOTIFICATION
          │               │                │
          │               │                │
          ▼               ▼                ▼
       Routes          Payments         Email/Push
       ETA             Verification
       Distance
```

---

# 48. CRITICAL ARCHITECTURAL RULES FOR ANTIGRAVITY

1. Do not build everything in one file.
2. Do not create duplicate components.
3. Do not mix database queries into presentation components unnecessarily.
4. Keep matching logic independent from UI.
5. Keep payment logic independent from trip logic.
6. Keep map provider logic independent from trip UI.
7. Use TypeScript types.
8. Use Supabase RLS.
9. Validate on server.
10. Never expose private keys.
11. Never trust client-side payment status.
12. Never fake verification.
13. Do not expose private user information.
14. Do not build microservices for MVP.
15. Do not prematurely optimize.
16. Test after every major phase.
17. Preserve working functionality.
18. Inspect the current project before making changes.
19. Use reusable components.
20. Keep future smart matching possible without making MVP unnecessarily complex.

---

# 49. FINAL PRODUCT FLOW

The intended final MVP experience is:

```text
                 LANDING PAGE
                       │
            ┌──────────┴──────────┐
            │                     │
       FIND A RIDE            OFFER A RIDE
            │                     │
            ▼                     ▼
       SEARCH TRIPS          CREATE TRIP
            │                     │
            ▼                     ▼
       MATCHING ENGINE       PUBLISH TRIP
            │                     │
            └──────────┬──────────┘
                       ▼
                 TRIP DISCOVERY
                       │
                       ▼
                 TRIP DETAILS
                       │
                       ▼
                 REQUEST SEAT
                       │
                       ▼
                DRIVER DECISION
                  │          │
               ACCEPT      REJECT
                  │
                  ▼
               CONNECTION
                  │
          ┌───────┴────────┐
          ▼                ▼
       MESSAGE          TRIP INFO
          │                │
          └───────┬────────┘
                  ▼
               TRAVEL
                  │
                  ▼
             COMPLETE TRIP
                  │
                  ▼
                RATING
```

---

# 50. FINAL INSTRUCTION TO ANTIGRAVITY

Treat this document as the architectural source of truth together with File 1.

Before implementing a feature:

1. Locate the correct architectural layer.
2. Check whether a reusable service/component already exists.
3. Do not duplicate business logic.
4. Keep database access secure.
5. Keep external integrations behind abstractions.
6. Implement the smallest correct version.
7. Test it.
8. Do not move to the next major phase until the current phase is stable.

The MVP should remain simple.

The architecture should be strong enough to support:

- Basic carpooling
- Smart route matching
- Messaging
- Safety
- Payments
- Subscriptions
- Corporate travel
- Future scaling

without requiring a complete rewrite.

CORE PRINCIPLE:

**The app is a trusted bridge between drivers and passengers.**

Driver and passenger can discuss and agree on their travel contribution.

The platform provides discovery, matching, communication, trust and optional paid services.

Build the foundation correctly now so future features can be added without breaking the core system.
