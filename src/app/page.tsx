import React from 'react';
import Link from 'next/link';
import { TripSearchForm } from '@/components/trips/TripSearchForm';
import { TripCard } from '@/components/trips/TripCard';
import { mockTrips } from '@/lib/mock-data';
import {
  Car,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const featuredTrips = mockTrips.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-slate-50 to-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-sky-200 shadow-xs text-xs font-semibold text-sky-800">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Direct Peer-to-Peer Intercity Carpooling</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              I’m already going there.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                Let’s share the journey.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              The trusted bridge connecting drivers with empty seats to passengers traveling on the same route. Agree on mutual travel contributions directly without forced commissions.
            </p>
          </div>

          {/* Integrated Search Box */}
          <div className="max-w-4xl mx-auto">
            <TripSearchForm />
          </div>

          {/* Quick CTAs / Proof Points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Government ID Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Direct Chat & Pickup Coordination</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Forced Ticket Markups</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS — DUAL JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Simple & Transparent
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How The RideBridge Platform Works
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A seamless bridge between personal car owners and travelers heading in the same direction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Driver Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-sky-300 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-sky-600">For Drivers</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Have Empty Car Seats?</h3>
              </div>
            </div>

            <ol className="space-y-4 mb-8 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong className="text-slate-900 font-semibold">Post your route:</strong> Enter departure city, destination, date, and seats.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong className="text-slate-900 font-semibold">Review requests:</strong> View verified passenger profiles and accept or decline.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong className="text-slate-900 font-semibold">Coordinate & travel:</strong> Chat to confirm pickup spot and mutually agree on fuel share.
                </span>
              </li>
            </ol>

            <Link
              href="/trips/create"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors"
            >
              <span>Post a Trip as Driver</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Passenger Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-emerald-600">For Passengers</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Looking for a Ride?</h3>
              </div>
            </div>

            <ol className="space-y-4 mb-8 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong className="text-slate-900 font-semibold">Search matching routes:</strong> Filter by date, available seats, and driver rating.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong className="text-slate-900 font-semibold">Send seat request:</strong> Include a friendly message with your pickup preference.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong className="text-slate-900 font-semibold">Connect & ride:</strong> Once accepted, unlock connection details and direct chat.
                </span>
              </li>
            </ol>

            <Link
              href="/trips"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm transition-colors"
            >
              <span>Explore Available Rides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED UPCOMING TRIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
              Live Rides
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Popular Intercity Departures
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Verified drivers with open seats traveling this week.
            </p>
          </div>
          <Link
            href="/trips"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 group"
          >
            <span>View all journeys</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* 4. TRUST, SAFETY & MONETIZATION TRANSPARENCY */}
      <section className="bg-slate-900 text-white py-16 rounded-3xl max-w-7xl mx-auto px-6 lg:px-12 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Trust & Peer Safety</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every driver undergoes profile verification. Our honest trust indicator labels verified IDs without misleading badges.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Mutual Contribution</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Travel contribution is negotiated and agreed between driver and passenger. The platform does not enforce mandatory ticket charges.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Optional Value-Adds</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Basic search and posting remain free. Optional features like ₹10 detailed route unlock and ₹20 driver trip boost fund platform upkeep.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
