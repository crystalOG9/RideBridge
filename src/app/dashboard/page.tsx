'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Car,
  Users,
  Clock,
  PlusCircle,
  Search,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { mockCurrentUser, mockTrips, mockRequests, mockConnections } from '@/lib/mock-data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { VerificationBadge } from '@/components/ui/VerificationBadge';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'driver' | 'passenger'>('overview');

  // Filter requests
  const incomingDriverRequests = mockRequests.filter((r) => r.trip?.driver_id === mockCurrentUser.id);
  const myPassengerRequests = mockRequests.filter((r) => r.passenger_id === mockCurrentUser.id);
  const myPostedTrips = mockTrips.filter((t) => t.driver_id === mockCurrentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TOP HEADER & USER CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-sky-600/20">
            {mockCurrentUser.full_name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Hello, {mockCurrentUser.full_name}
              </h1>
              <VerificationBadge status={mockCurrentUser.verification_status} size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Connected carpool hub. Manage trips you offer and rides you requested.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-1 font-semibold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{mockCurrentUser.rating}</span>
                <span className="text-slate-400 font-normal">({mockCurrentUser.rating_count} reviews)</span>
              </div>
              <span>•</span>
              <span>{mockCurrentUser.total_trips} Shared Trips</span>
            </div>
          </div>
        </div>

        {/* Quick Primary Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors"
          >
            <Search className="w-4 h-4 text-sky-600" />
            <span>Find a Ride</span>
          </Link>
          <Link
            href="/trips/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Trip</span>
          </Link>
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Trips
            </span>
            <Car className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{myPostedTrips.length}</div>
          <div className="text-xs text-slate-500 mt-1">Trips you are driving</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Seat Requests
            </span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{mockRequests.length}</div>
          <div className="text-xs text-slate-500 mt-1">Pending & confirmed</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Connections
            </span>
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{mockConnections.length}</div>
          <div className="text-xs text-slate-500 mt-1">Direct rider contacts</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Trust Level
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">Verified</div>
          <div className="text-xs text-slate-500 mt-1">Govt ID & Mobile check</div>
        </div>
      </div>

      {/* 3. TABS: OVERVIEW / DRIVER / PASSENGER */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'overview'
              ? 'bg-sky-50 text-sky-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Activity
        </button>
        <button
          onClick={() => setActiveTab('driver')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'driver'
              ? 'bg-sky-50 text-sky-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Driver Hub ({myPostedTrips.length} posted, {incomingDriverRequests.length} reqs)
        </button>
        <button
          onClick={() => setActiveTab('passenger')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'passenger'
              ? 'bg-sky-50 text-sky-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Passenger Hub ({myPassengerRequests.length} requests)
        </button>
      </div>

      {/* 4. MAIN CONTENT SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Upcoming & Requests */}
        <div className="lg:col-span-2 space-y-6">
          {/* Confirmed Connection Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-slate-900">Upcoming Confirmed Ride</h3>
              </div>
              <StatusBadge status="accepted" size="sm" />
            </div>

            {mockConnections.map((conn) => (
              <div
                key={conn.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {conn.trip?.origin_name} → {conn.trip?.destination_name}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {conn.trip?.departure_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {conn.trip?.departure_time}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/messages`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold self-start transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat with {conn.driver?.full_name.split(' ')[0]}</span>
                  </Link>
                </div>

                <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">Agreed Details: </span>
                  {conn.pickup_notes}
                </div>
              </div>
            ))}
          </div>

          {/* Pending Passenger Requests */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Recent Seat Requests</h3>
              <Link
                href="/requests"
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {mockRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {req.trip?.origin_name} → {req.trip?.destination_name}
                      </span>
                      <StatusBadge status={req.status} size="sm" />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{req.message}</p>
                  </div>
                  <Link
                    href="/requests"
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 whitespace-nowrap self-start"
                  >
                    Manage Request →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Posted Trips & Quick Monetization Teaser */}
        <div className="space-y-6">
          {/* Driver's Posted Trips Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">My Posted Trips</h3>
              <Link
                href="/my-trips"
                className="text-xs font-semibold text-sky-600 hover:text-sky-700"
              >
                Manage
              </Link>
            </div>

            {myPostedTrips.length > 0 ? (
              <div className="space-y-3">
                {myPostedTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                  >
                    <div className="text-xs font-bold text-slate-900">
                      {trip.origin_name} → {trip.destination_name}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{trip.departure_date} • {trip.departure_time}</span>
                      <span className="font-semibold text-sky-700">{trip.available_seats} seats free</span>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200/60">
                      <span className="text-slate-500">Contribution: Discuss</span>
                      <Link
                        href={`/trips/${trip.id}`}
                        className="font-semibold text-sky-600 hover:text-sky-700"
                      >
                        Trip Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 text-center py-4">
                No active posted trips.
              </div>
            )}

            <Link
              href="/trips/create"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Offer a New Ride</span>
            </Link>
          </div>

          {/* Value Add Platform Services */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platform Add-ons</span>
            </div>
            <h4 className="text-sm font-bold">Boost or Unlock Routes</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Drivers can boost their trips for ₹20 to rank higher. Passengers can unlock verified route stops for ₹10.
            </p>
            <div className="pt-1">
              <Link
                href="/trips"
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300"
              >
                <span>Learn about premium tools →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
