# CARPOOL / RIDE-SHARING APP — MVP DEVELOPMENT SPECIFICATION
## Antigravity Master Build Instructions — File 1 of 2

---

## 0. PURPOSE OF THIS DOCUMENT

Build a working prototype/MVP for a carpool / ride-sharing platform.

The platform connects:

**DRIVERS** — people who are already traveling from A → B and have empty seats

with

**PASSENGERS** — people who want to travel on the same or an overlapping route.

The platform is a **bridge between driver and passenger**.

The driver and passenger can discuss and agree on the travel contribution/price themselves. The platform should NOT initially control or calculate the ride price as a mandatory fare.

The MVP should prove the complete product flow:

1. User creates an account.
2. User chooses Driver or Passenger functionality.
3. Driver posts a trip.
4. Passenger searches for a trip.
5. System finds relevant trips.
6. Passenger views trip details.
7. Passenger sends a request.
8. Driver accepts/rejects.
9. Both can communicate through a basic connection/contact flow.
10. Optional monetization features are represented in the UI.
11. Data is stored properly in Supabase.
12. The app is responsive and deployable on Vercel.

IMPORTANT:
This is a prototype/MVP first, NOT a huge production system.

Do NOT over-engineer the first version.
Do NOT generate a giant single HTML file.
Do NOT put the entire application into one component.
Use a clean, modular, maintainable project structure.

---

# 1. PRODUCT PRINCIPLE

The core idea is:

> "I'm already going there. If you're going there too, let's share the journey."

Example:

Driver:
Pune → Hyderabad
Date: 25 September
Departure: 8:00 AM
Available seats: 2

Passenger:
Pune → Hyderabad
or
Pune → Solapur
or
Kalaburagi → Hyderabad

The system should eventually understand route overlap and recommend compatible trips.

For MVP, start with basic From/To matching.

Later phases can introduce intelligent route matching, route overlap percentage, detour calculation, and optimization.

---

# 2. MVP GOALS

The MVP must demonstrate these capabilities:

### Authentication
- Sign up
- Login
- Logout
- User profile
- Driver/passenger role selection

### Driver
- Create trip
- Edit trip
- Delete/cancel trip
- View own trips
- View passenger requests
- Accept/reject requests

### Passenger
- Search trips
- Filter trips
- View trip details
- Request a seat
- View request status
- View accepted connections

### Platform
- User profiles
- Trip database
- Requests database
- Basic connection status
- Basic notifications/status indicators
- Responsive UI
- Basic monetization UI

---

# 3. USER ROLES

Use one account system.

A user can eventually act as both driver and passenger.

Do NOT permanently lock a user into only one role.

At onboarding, allow:

- Continue as Driver
- Continue as Passenger
- Or allow both

Recommended database approach:

users/profile:
- id
- full_name
- email
- phone
- profile_photo
- role/preferred_mode
- verification_status
- rating
- created_at

A user should be able to switch between Driver and Passenger dashboards later.

---

# 4. MAIN APP PAGES

Create these pages/routes.

## Public

### `/`
Landing page

Sections:
- Hero
- Search trip CTA
- Offer a ride CTA
- How it works
- Safety/trust section
- Revenue/value proposition should NOT dominate the landing page
- Footer

### `/login`
Login

### `/signup`
Signup

### `/forgot-password`
Password recovery UI

---

## Authenticated

### `/dashboard`
Role-aware dashboard

Show:
- Upcoming trips
- Recent requests
- Active connections
- Quick actions

### `/trips`
Trip discovery/search

### `/trips/create`
Create a trip

### `/trips/[id]`
Trip details

### `/my-trips`
Driver's posted trips

### `/requests`
Requests received/sent

### `/connections`
Accepted driver-passenger connections

### `/messages`
Basic messaging/contact interface

### `/profile`
Profile

### `/settings`
Account settings

---

# 5. DRIVER FLOW

## Step 1 — Create account

Driver signs up.

Collect:
- Name
- Email
- Phone (optional for prototype)
- Password
- Profile photo (optional)
- Preferred role

---

## Step 2 — Create trip

Fields:

### Journey
- Starting location
- Destination
- Date
- Departure time

### Vehicle
- Vehicle type
- Vehicle model
- Vehicle number (optional for prototype)
- Available seats

### Trip preferences
- Luggage allowed
- Music preference (optional)
- Smoking preference
- Pets (optional)
- Notes

### Contribution
Do NOT force a fixed platform fare.

Allow:
- "Discuss with passenger"
- Optional suggested contribution

For MVP default:
**Price: Discuss with driver**

---

## Step 3 — Publish

Driver clicks:

**POST TRIP**

Trip appears in the trip database.

Show confirmation:

"Your trip is now visible to passengers."

---

# 6. PASSENGER FLOW

## Step 1 — Search

Search fields:

From
To
Date
Passengers

Optional filters:

- Departure time
- Available seats
- Vehicle type
- Rating
- Verified driver
- Price/contribution preference

---

## Step 2 — Results

Each result card should show:

Driver name
Driver rating
Verification status
From → To
Date/time
Available seats
Vehicle
Contribution:
"Discuss with driver"

Button:

**VIEW TRIP**

---

## Step 3 — Trip details

Show:

- Driver profile
- Rating
- Verification status
- Trip route
- Date/time
- Vehicle
- Available seats
- Notes
- Basic map/route preview if available
- Request seat button

Do NOT expose unnecessary private information publicly.

---

# 7. REQUEST FLOW

Passenger clicks:

**REQUEST SEAT**

Create a request record.

Status:

`pending`

Driver sees:

"New passenger request"

Driver can:

- Accept
- Reject

If accepted:

request status:

`accepted`

Create/update a connection between driver and passenger.

If rejected:

`rejected`

If passenger cancels:

`cancelled`

Use clear status badges.

---

# 8. CONNECTION FLOW

Once accepted:

Driver and passenger see:

**Trip Connection Confirmed**

Display:

- Driver
- Passenger
- Trip
- Date
- Route
- Seats
- Contact/message option
- Safety information

The platform is the bridge.

The two users can discuss:
- Pickup point
- Exact meeting location
- Contribution/price
- Luggage
- Other travel details

The app should NOT force a fixed ride price in MVP.

---

# 9. MESSAGING

For MVP, create a simple messaging interface.

Requirements:
- Conversation tied to a trip/request
- Sender
- Receiver
- Message
- Timestamp
- Read/unread state

Do NOT build a complicated real-time messaging system unless it can be implemented cleanly.

If Supabase Realtime is straightforward, use it.

Otherwise create a clean prototype chat UI with database-backed messages.

Security is important:
Users should only access conversations in which they are participants.

---

# 10. MAP / ROUTE SYSTEM

For MVP:

Use a map provider abstraction.

Preferred options:
- Mapbox
- Google Maps
- OpenStreetMap-based solution

Do NOT hard-code the entire app around one provider.

Create a reusable map component.

The architecture should make it possible to replace the map provider later.

MVP should support:

- Showing From location
- Showing To location
- Route preview if API is available
- Approximate distance
- Approximate travel time

If map API keys are not available during initial UI development:

Create a realistic map placeholder/component and clearly mark where the API integration belongs.

Do NOT use fake API keys.

---

# 11. BASIC MATCHING ENGINE

MVP matching should start simple.

Input:

Passenger:
From
To
Date

Driver:
From
To
Date

Basic matching rules:

1. Same/similar origin
2. Same/similar destination
3. Same date
4. Seats available

Rank results.

Example:

Exact route:
Pune → Hyderabad

should rank higher than:

Pune → Solapur

or:

Mumbai → Hyderabad

Later, introduce intelligent route matching.

---

# 12. FUTURE SMART MATCHING — PREPARE THE CODE FOR THIS

Do NOT fully implement complex route optimization in MVP.

But design the data and services so this can be added later.

Future matching engine:

Driver route:
Pune → Solapur → Kalaburagi → Hyderabad

Passenger:
Pune → Solapur

Potential match:
92% route overlap

Another passenger:
Kalaburagi → Hyderabad

Potential match:
High overlap

Future score can consider:

- Route overlap
- Distance
- Detour
- Departure time
- Arrival time
- Available seats
- Rating
- Verification
- User preferences

Future example:

MATCH SCORE =

route compatibility
+ time compatibility
+ low detour
+ seat availability
+ reliability

For MVP, use a simple scoring service.

Keep matching logic separate from UI.

---

# 13. DATABASE — SUPABASE

Use Supabase PostgreSQL.

Suggested tables:

## profiles

Fields:
- id
- full_name
- email
- phone
- avatar_url
- role
- verification_status
- rating
- rating_count
- created_at
- updated_at

---

## vehicles

Fields:
- id
- owner_id
- vehicle_type
- vehicle_model
- registration_number
- seats
- created_at
- updated_at

---

## trips

Fields:
- id
- driver_id
- vehicle_id
- origin_name
- origin_lat
- origin_lng
- destination_name
- destination_lat
- destination_lng
- departure_date
- departure_time
- available_seats
- contribution_mode
- suggested_contribution
- notes
- status
- created_at
- updated_at

Trip status:
- draft
- published
- full
- completed
- cancelled

---

## trip_requests

Fields:
- id
- trip_id
- passenger_id
- seats_requested
- message
- status
- created_at
- updated_at

Status:
- pending
- accepted
- rejected
- cancelled

---

## connections

Fields:
- id
- trip_id
- driver_id
- passenger_id
- request_id
- status
- created_at
- updated_at

---

## messages

Fields:
- id
- connection_id
- sender_id
- receiver_id
- message
- read_at
- created_at

---

## notifications

Fields:
- id
- user_id
- type
- title
- body
- related_id
- read
- created_at

---

## payments

Prepare schema but payment processing can remain disabled in MVP.

Fields:
- id
- user_id
- type
- amount
- currency
- status
- provider
- reference_id
- created_at

Types can include:
- route_unlock
- featured_trip
- subscription
- connection_fee

---

# 14. SECURITY

Supabase Row Level Security must be considered.

Rules:

### Profiles
Users can update their own profile.

### Trips
Driver can create/update/delete own trips.

Public users can only see published trips.

### Requests
Passenger can create requests for trips.

Passenger can view own requests.

Driver can view requests for their own trips.

### Connections
Only connected driver/passenger can access connection information.

### Messages
Only participants can read/write messages.

### Payments
Users can view only their own payment records.

Never expose Supabase service-role keys in frontend code.

Use environment variables.

Never commit secrets to GitHub.

---

# 15. MONETIZATION FEATURES

The first version should demonstrate monetization without making the app annoying.

## Revenue model 1 — Detailed route / advanced details

Basic trip discovery is FREE.

Optional paid feature:

**Unlock detailed route**

Example:
₹10–₹20

Potential features:
- Detailed route
- Pickup/drop information
- Advanced route details
- Additional trip information

Do NOT make basic search itself paid.

---

## Revenue model 2 — Featured trip

Driver can promote a trip.

Example:
₹20–₹50

UI:

"BOOST TRIP"

Featured trips appear higher in results.

For MVP:
Payment can be simulated.

---

## Revenue model 3 — Driver subscription

Example:

### FREE
- Basic trip posting
- Basic matching

### PRO — ₹99/month
- More visibility
- Advanced trip tools
- Featured listing allowance
- Trip analytics
- Future smart matching features

For MVP:
Create subscription UI.
Real recurring payment can be implemented later.

---

## Revenue model 4 — Passenger subscription

Example:
₹49–₹149/month

Possible benefits:
- Advanced search
- Saved routes
- Alerts
- Faster discovery

Do not force this into MVP if it complicates the UX.

---

## Revenue model 5 — Successful connection fee

Future model:

Small platform fee such as:
₹10–₹30 per confirmed connection.

Important:
Do not automatically add a percentage to the driver's negotiated ride contribution unless the business/legal model later requires it.

---

## Revenue model 6 — Business / corporate plans

Future:

Companies can pay for employee travel coordination.

Do not build the complete corporate system in MVP.

Prepare the architecture for future expansion.

---

## Revenue model 7 — Advertising / partnerships

Future:
- Travel businesses
- Vehicle services
- Insurance-related partners
- Cafes/rest stops
- Local businesses

Do NOT clutter the MVP with advertisements.

---

# 16. PAYMENT ARCHITECTURE

Do NOT integrate live payment processing before the core marketplace works.

Create a payment service abstraction:

`paymentService`

It should later support providers such as:
- Razorpay
- Stripe
- Other suitable providers

For MVP:

Use a mock payment flow.

Example:

User clicks:
**Unlock for ₹10**

Show:
"Demo payment"

Then:
"Payment successful"

Create a payment record with:
status = `success`
provider = `demo`

Later replace mock implementation with real payment gateway.

---

# 17. SAFETY / TRUST FEATURES

This is a major part of the product.

MVP UI should include:

### Driver profile
- Name
- Profile photo
- Rating
- Number of trips
- Verification status

### Safety
- Report user
- Block user
- Emergency/SOS placeholder
- Share trip placeholder
- Safety guidelines

Do NOT pretend a user is verified unless actual verification exists.

Use:

"Verification available"

or:

"Not verified"

instead of fake green verification badges.

---

# 18. DESIGN SYSTEM

The application should feel like a modern transportation technology platform.

Design goals:

- Professional
- Trustworthy
- Modern
- Clean
- Fast
- Mobile-first
- Easy to understand

Avoid:
- Excessive gradients
- Excessive glassmorphism
- Too many animations
- Overly flashy gaming UI
- Huge amounts of decorative CSS
- Unnecessary 3D effects

Use subtle animation.

Important:
Users need to trust this app because strangers are traveling together.

---

# 19. RESPONSIVE DESIGN

Must work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

Mobile navigation should be designed intentionally.

Do NOT simply shrink desktop UI.

Driver and passenger flows must be usable on mobile.

---

# 20. ACCESSIBILITY

Use:

- Proper semantic HTML
- Labels for inputs
- Keyboard navigation
- Visible focus states
- Good contrast
- Accessible buttons
- Error messages
- Loading states
- Empty states

---

# 21. ERROR HANDLING

Every important action needs:

- Loading state
- Success state
- Error state

Examples:

Trip creation:
"Publishing trip..."

Success:
"Trip published successfully."

Error:
"Unable to publish trip. Please try again."

Search:
"Searching for trips..."

No results:
"No compatible trips found. Try another date or nearby location."

---

# 22. EMPTY STATES

Create useful empty states.

Examples:

No trips:
"No trips found for this route."

No requests:
"You don't have any passenger requests yet."

No connections:
"Your confirmed connections will appear here."

No messages:
"Your conversations will appear here after a trip request is accepted."

---

# 23. COMPONENT ARCHITECTURE

Do NOT put everything in page files.

Create reusable components such as:

- Navbar
- Footer
- TripCard
- TripSearch
- TripFilters
- TripForm
- DriverCard
- PassengerCard
- ProfileCard
- RequestCard
- ConnectionCard
- MessagePanel
- MapView
- RouteSummary
- PaymentModal
- VerificationBadge
- StatusBadge
- LoadingState
- EmptyState
- ErrorState
- ConfirmDialog

Use reusable UI primitives.

---

# 24. SERVICE ARCHITECTURE

Keep business logic separate.

Suggested:

`lib/`

- auth
- supabase
- trips
- matching
- requests
- connections
- messages
- notifications
- payments
- maps

Example:

`lib/matching.ts`

should contain matching logic.

Do NOT place matching logic directly inside React components.

---

# 25. API / SERVER ARCHITECTURE

Use server-side/API routes where appropriate.

Examples:

- `/api/trips`
- `/api/trips/search`
- `/api/requests`
- `/api/connections`
- `/api/messages`
- `/api/payments`
- `/api/matching`

Do not expose secret keys in client components.

Use server-side validation.

---

# 26. VALIDATION

Validate all important fields.

Examples:

Origin:
required

Destination:
required

Date:
required and cannot be invalid

Seats:
must be positive

Contribution:
must be valid if provided

Messages:
reasonable length

Do not trust client-side validation alone.

---

# 27. SEARCH EXPERIENCE

Search should be fast and simple.

Example:

FROM:
Pune

TO:
Hyderabad

DATE:
25 September

PASSENGERS:
1

Button:
**FIND RIDES**

Results should have sorting:

- Best match
- Earliest departure
- Highest rated driver
- Most available seats

Future:
- Lowest contribution
- Lowest detour
- Route compatibility

---

# 28. MATCHING SCORE — MVP

Implement a simple service:

Example:

Exact origin + exact destination + same date:
100

Same origin + nearby destination:
85

Nearby origin + exact destination:
85

Same route region:
70

Different route:
low score

This is only a prototype scoring system.

Make it easy to replace later with an advanced algorithm.

---

# 29. DRIVER DASHBOARD

Show:

### Overview
- Active trips
- Upcoming trips
- Requests
- Connections

### Quick actions
- Post new trip
- Manage trips
- View requests

### Example card

"Upcoming"

Pune → Hyderabad
25 Sep • 8:00 AM
2 seats available

[Manage]

---

# 30. PASSENGER DASHBOARD

Show:

### Search
Find a ride

### Upcoming
Accepted trips

### Requests
Pending requests

### Saved
Saved routes/trips

---

# 31. NOTIFICATIONS

MVP notifications:

- Passenger requested seat
- Driver accepted request
- Driver rejected request
- Connection confirmed
- New message
- Trip cancelled

Use in-app notifications first.

Email/SMS can come later.

---

# 32. ADMIN / MANAGEMENT — BASIC

Create a simple admin-ready structure.

Do not build a huge admin panel.

Prepare for future:

- User management
- Trip management
- Reports
- Payments
- Verification
- Complaints

For MVP, an admin dashboard can be minimal or postponed.

---

# 33. REPORT / BLOCK

Add:

Report user

Reasons:
- Fake profile
- Harassment
- Unsafe behavior
- Spam
- Other

Block user.

Store reports in database.

Do not expose private report details to normal users.

---

# 34. DEVELOPMENT PHASES

## PHASE 1 — FOUNDATION

Build:

- Next.js project
- TypeScript
- Tailwind
- Clean folder structure
- Global styles
- Layout
- Navbar
- Footer
- Landing page
- Responsive design

Deliverable:
Beautiful but functional foundation.

---

## PHASE 2 — AUTHENTICATION

Implement:

- Supabase Auth
- Signup
- Login
- Logout
- Forgot password
- Profile creation
- Protected routes

Deliverable:
Real accounts stored in Supabase.

---

## PHASE 3 — DATABASE

Create:

- profiles
- vehicles
- trips
- trip_requests
- connections
- messages
- notifications
- payments

Add:
- Foreign keys
- Indexes where needed
- RLS policies

Deliverable:
Proper persistent data.

---

## PHASE 4 — DRIVER MODULE

Implement:

- Add vehicle
- Create trip
- Edit trip
- Cancel trip
- View own trips
- View requests
- Accept/reject requests

Deliverable:
Driver can actually use the platform.

---

## PHASE 5 — PASSENGER MODULE

Implement:

- Search
- Filters
- Results
- Trip details
- Request seat
- Request status

Deliverable:
Passenger can actually find and request rides.

---

## PHASE 6 — CONNECTION SYSTEM

Implement:

- Accept request
- Create connection
- Connection dashboard
- Driver/passenger details
- Basic messaging

Deliverable:
Driver and passenger successfully connect.

---

## PHASE 7 — MAPS

Implement:

- Map component
- Origin/destination
- Route preview
- Distance
- ETA

Use environment variables for API keys.

If no API key:
show a clean fallback map state.

---

## PHASE 8 — MATCHING ENGINE

Implement:

- Basic route matching
- Date matching
- Seat availability
- Ranking

Separate matching logic into its own service.

Deliverable:
Relevant trips appear first.

---

## PHASE 9 — MONETIZATION UI

Implement:

- Route unlock
- Featured trip
- Subscription
- Mock payment flow
- Payment records

Do not make real payments mandatory yet.

Deliverable:
The business model can be demonstrated.

---

## PHASE 10 — SAFETY / TRUST

Implement:

- Ratings UI
- Verification status
- Report
- Block
- Safety information
- Emergency feature placeholder

Do not claim fake verification.

---

## PHASE 11 — POLISH

Improve:

- Loading
- Empty states
- Error handling
- Animations
- Mobile UI
- Accessibility
- Form validation
- Navigation
- Performance

---

## PHASE 12 — TESTING

Test:

### Authentication
- Signup
- Login
- Logout
- Password reset

### Driver
- Create trip
- Edit trip
- Cancel trip
- Receive request
- Accept request
- Reject request

### Passenger
- Search
- Filter
- View trip
- Request
- Cancel request

### Connection
- Accepted request
- Messaging
- Access control

### Security
- User cannot edit another driver's trip
- Passenger cannot see unrelated private data
- User cannot access another user's messages
- Payment records are private

### Responsive
- Mobile
- Tablet
- Desktop

---

# 35. ENVIRONMENT VARIABLES

Create:

`.env.example`

Include placeholders only.

Example:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
MAP_PROVIDER_API_KEY=

Do not commit actual secrets.

If using server-side secret keys, use appropriate server-only environment variables.

---

# 36. GIT / VERSION CONTROL

Use Git-friendly commits.

Suggested milestones:

1. Initial foundation
2. Authentication
3. Database
4. Driver module
5. Passenger module
6. Connections
7. Maps
8. Matching
9. Monetization
10. Safety
11. Testing
12. Production polish

Do not rewrite unrelated files unnecessarily.

---

# 37. ANTIGRAVITY WORKING RULES

IMPORTANT:

### Rule 1
Do NOT create the entire application in one response.

Build phase by phase.

### Rule 2
Before modifying existing code, inspect the current project structure.

### Rule 3
Do not destroy working functionality.

### Rule 4
Reuse existing components where possible.

### Rule 5
Do not create duplicate components with slightly different names.

### Rule 6
Keep components small and reusable.

### Rule 7
Use TypeScript types/interfaces.

### Rule 8
Keep database logic separate from UI.

### Rule 9
Never hard-code API keys or secrets.

### Rule 10
After every major phase:
- Run the app
- Check console errors
- Check build
- Test the changed flow

### Rule 11
Do not declare a feature "complete" if it is only a visual mock.

### Rule 12
If a feature requires an API key that is unavailable, create a clean abstraction/fallback and clearly tell the developer what is required.

---

# 38. DEFINITION OF DONE FOR MVP

The MVP is considered successful when this complete scenario works:

### Driver

1. Opens app.
2. Creates account.
3. Logs in.
4. Creates vehicle.
5. Posts:
   Pune → Hyderabad
   25 September
   8:00 AM
   2 seats.
6. Trip is stored in Supabase.
7. Trip appears in search.

### Passenger

1. Creates account.
2. Searches:
   Pune → Hyderabad
   25 September.
3. Finds the driver's trip.
4. Opens details.
5. Sends request for 1 seat.
6. Request is stored.

### Driver

1. Opens requests.
2. Sees passenger.
3. Accepts request.

### Platform

1. Creates connection.
2. Both users see the confirmed trip.
3. They can communicate.
4. Basic safety information is shown.

### Monetization

Passenger can see:

"Unlock detailed route — ₹10"

Driver can see:

"Feature this trip — ₹20"

Mock payment flow works.

---

# 39. WHAT NOT TO BUILD IN MVP

Do NOT initially build:

- Complex AI
- Complex route optimization
- Full wallet system
- Full insurance system
- Advanced KYC automation
- Full corporate management
- Complex admin analytics
- Multi-country support
- Hundreds of settings
- Cryptocurrency
- Unnecessary gamification

Keep the MVP focused.

---

# 40. FUTURE ROADMAP

After MVP validation:

### Version 2
- Real maps
- Smart route matching
- Route overlap %
- Detour calculation
- Saved routes
- Push notifications
- Better ratings

### Version 3
- Real payment gateway
- Subscriptions
- Featured trips
- Advanced verification
- SOS
- Trip sharing
- Better fraud prevention

### Version 4
- Intelligent matching algorithm
- Demand prediction
- Dynamic recommendations
- Corporate travel
- Analytics
- Referral system

### Version 5
- Large-scale marketplace
- Advanced safety system
- Regional expansion
- More transportation categories

---

# 41. FINAL INSTRUCTION TO ANTIGRAVITY

You are acting as a senior full-stack engineer building a maintainable MVP.

Do not blindly generate code.

Before each phase:

1. Inspect the existing project.
2. Identify what already works.
3. Plan the smallest clean implementation.
4. Implement it.
5. Run/build/test it.
6. Fix errors.
7. Explain what changed.
8. Stop at the phase boundary unless asked to continue.

The application must be:

- Functional
- Modular
- Secure
- Responsive
- Maintainable
- Supabase-ready
- Vercel-ready

The most important product principle is:

**The platform connects drivers and passengers.**
**Drivers and passengers can negotiate their own travel contribution.**
**The platform earns from optional services and later platform fees/subscriptions.**

Build the MVP first.
Do not prematurely build the entire future product.
