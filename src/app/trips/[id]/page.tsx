'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { mockTrips, mockCurrentUser } from '@/lib/mock-data';
import { mapService } from '@/lib/services/map-service';
import { paymentService } from '@/lib/services/payment-service';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  MapPin,
  Users,
  Car,
  Star,
  Luggage,
  Music,
  CigaretteOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const trip = mockTrips.find((t) => t.id === resolvedParams.id) || mockTrips[0];
  const driver = trip.driver;
  const vehicle = trip.vehicle;

  // Request Seat State
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [requestMessage, setRequestMessage] = useState(
    `Hi ${driver ? driver.full_name.split(' ')[0] : 'Driver'}, I would love to share this ride. I have 1 small bag.`
  );
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Monetization Demo State
  const [isRouteUnlocked, setIsRouteUnlocked] = useState(trip.is_detailed_route_unlocked || false);
  const [isTripBoosted, setIsTripBoosted] = useState(trip.is_featured || false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Mock Route Info
  const routeSummary = {
    distance_km: 560,
    duration_formatted: '8h 30m',
    waypoints: ['Intermediate Transit Hub', 'Highway Rest Stop'],
  };

  const handleRequestSeat = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestModalOpen(false);
    }, 1500);
  };

  const handleUnlockRoute = async () => {
    setPaymentProcessing(true);
    try {
      await paymentService.processPayment(
        {
          type: 'route_unlock',
          amount: 10,
          currency: 'INR',
          metadata: { trip_id: trip.id },
        },
        mockCurrentUser.id
      );
      setIsRouteUnlocked(true);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleBoostTrip = async () => {
    setPaymentProcessing(true);
    try {
      await paymentService.processPayment(
        {
          type: 'featured_trip',
          amount: 20,
          currency: 'INR',
          metadata: { trip_id: trip.id },
        },
        mockCurrentUser.id
      );
      setIsTripBoosted(true);
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/trips"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all rides</span>
        </Link>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Route Details & Map & Safety */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <StatusBadge status={trip.status} />
                {isTripBoosted && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>Boosted Listing</span>
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400">
                Posted on {new Date(trip.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Origin -> Destination Flow */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center mt-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-sky-600 ring-4 ring-sky-100" />
                <div className="w-0.5 h-12 bg-slate-200 my-1" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              </div>
              <div className="flex-1 space-y-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Departure
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {trip.origin_name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {trip.departure_date} at {trip.departure_time}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Destination
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {trip.destination_name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Est. arrival ~ {routeSummary.duration_formatted} later
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm">
              <div>
                <span className="block text-slate-400 text-[11px]">Distance</span>
                <span className="font-bold text-slate-900">{routeSummary.distance_km} km</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[11px]">Duration</span>
                <span className="font-bold text-slate-900">{routeSummary.duration_formatted}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[11px]">Seats Available</span>
                <span className="font-bold text-sky-700">
                  {trip.available_seats} of {trip.total_seats} seats
                </span>
              </div>
            </div>

            {/* Notes */}
            {trip.notes && (
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 text-xs sm:text-sm space-y-1">
                <span className="font-semibold text-sky-900">Driver’s Travel Note:</span>
                <p className="text-slate-700 leading-relaxed">{trip.notes}</p>
              </div>
            )}
          </div>

          {/* Map Preview & Detailed Route Monetization Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Route & Waypoint Overview</h3>
                <p className="text-xs text-slate-500">
                  Visual route preview with stops and expressway path.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-full text-slate-600">
                Map Abstraction
              </span>
            </div>

            {/* Simulated Map View Container */}
            <div className="relative w-full h-48 sm:h-64 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
              {/* Clean Map Graphic Fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 opacity-80" />
              <div className="relative text-center p-6 space-y-2">
                <MapPin className="w-8 h-8 text-sky-600 mx-auto animate-bounce" />
                <div className="text-xs sm:text-sm font-semibold text-slate-800">
                  {trip.origin_name.split('(')[0]} ➔ {trip.destination_name.split('(')[0]}
                </div>
                <div className="text-[11px] text-slate-500 max-w-sm">
                  Provider: {mapService.getProviderStatus().provider.toUpperCase()} (Map abstraction ready for Mapbox / Google Maps key)
                </div>
              </div>

              {/* Locked Waypoint Overlay if not unlocked */}
              {!isRouteUnlocked && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-white space-y-3">
                  <Lock className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="text-sm font-bold">Detailed Highway Waypoints & Rest Stops</div>
                    <div className="text-xs text-slate-300 max-w-xs">
                      Unlock exact toll plaza waypoints, breakfast stops, and landmark coordination for ₹10.
                    </div>
                  </div>
                  <button
                    onClick={handleUnlockRoute}
                    disabled={paymentProcessing}
                    className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-xs shadow-md transition-all disabled:opacity-50"
                  >
                    {paymentProcessing ? 'Processing Demo Unlock...' : 'Unlock Route — ₹10 (Demo)'}
                  </button>
                </div>
              )}
            </div>

            {/* If Unlocked, show detailed stops */}
            {isRouteUnlocked && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Detailed Route Unlocked</span>
                </div>
                <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
                  <li>Expressway Entry: Hadapsar NH-65 Toll Plaza</li>
                  <li>Breakfast Halt: Indapur Family Rest Stop (Km 135)</li>
                  <li>Transit Bypass: Solapur Outer Ring Road</li>
                  <li>Destination Drop: Gachibowli Outer Ring Junction</li>
                </ul>
              </div>
            )}
          </div>

          {/* Ride Preferences */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Trip Preferences</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Luggage className="w-4 h-4 text-sky-600" />
                <span>Luggage Allowed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Music className="w-4 h-4 text-sky-600" />
                <span>{trip.preferences?.music_preference || 'Music Allowed'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CigaretteOff className="w-4 h-4 text-rose-500" />
                <span>No Smoking</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Small Pets OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Driver Trust Card & Seat Request Action */}
        <div className="space-y-6">
          {/* Seat Request Action Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-lg space-y-6">
            <div className="space-y-1 pb-4 border-b border-slate-100">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Contribution
              </div>
              {trip.contribution_mode === 'discuss' ? (
                <div className="space-y-1">
                  <div className="text-xl font-bold text-slate-900">Discuss with driver</div>
                  <p className="text-xs text-slate-500">
                    Decide mutual fuel and toll contribution directly in chat after connecting.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    ₹{trip.suggested_contribution}
                    <span className="text-xs text-slate-500 font-normal"> / seat (suggested)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct mutual peer contribution. No hidden platform markup.
                  </p>
                </div>
              )}
            </div>

            {/* Request Seat CTA */}
            {requestSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold text-emerald-900">Request Sent to Driver!</div>
                <p className="text-xs text-emerald-700">
                  You can track status and communicate under your Requests tab.
                </p>
                <Link
                  href="/requests"
                  className="inline-block mt-2 text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  View My Requests →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setRequestModalOpen(true)}
                  disabled={trip.available_seats === 0}
                  className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold rounded-2xl text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Users className="w-4 h-4" />
                  <span>
                    {trip.available_seats > 0 ? 'Request a Seat' : 'Trip is Currently Full'}
                  </span>
                </button>

                {/* Driver Boost Monetization Action */}
                {!isTripBoosted && (
                  <button
                    onClick={handleBoostTrip}
                    disabled={paymentProcessing}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Boost this Trip — ₹20 (Driver Tool)</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Driver Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              About the Driver
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-base">
                {driver ? driver.full_name.charAt(0) : 'D'}
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">
                  {driver ? driver.full_name : 'Verified Driver'}
                </div>
                <div className="mt-0.5">
                  <VerificationBadge
                    status={driver ? driver.verification_status : 'verified'}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1 font-semibold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{driver?.rating || '4.9'}</span>
                <span className="text-slate-400 font-normal">({driver?.rating_count || 15})</span>
              </div>
              <span>•</span>
              <span>{driver?.total_trips || 12} trips completed</span>
            </div>

            {driver?.bio && (
              <p className="text-xs text-slate-600 leading-relaxed">{driver.bio}</p>
            )}
          </div>

          {/* Vehicle Information Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Vehicle Specs
            </h3>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-800">
              <Car className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <div className="font-bold">{vehicle?.vehicle_model || 'Mid-size SUV'}</div>
                <div className="text-xs text-slate-500">
                  Registration: {vehicle?.registration_number || 'MH 12 AB ****'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Request Seat Modal */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Request a Seat</h3>
              <button
                onClick={() => setRequestModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestSeat} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Number of Seats
                </label>
                <select
                  value={seatsRequested}
                  onChange={(e) => setSeatsRequested(Number(e.target.value))}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50"
                >
                  {Array.from({ length: trip.available_seats }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} seat{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Message to Driver
                </label>
                <textarea
                  rows={3}
                  required
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  placeholder="Introduce yourself and specify your preferred pickup location..."
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                By submitting, a request will be sent to the driver. Once approved, direct contact and pickup coordination will unlock.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
