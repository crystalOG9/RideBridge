'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockTrips, mockCurrentUser } from '@/lib/mock-data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Car,
  Calendar,
  Clock,
  Users,
  PlusCircle,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Trip } from '@/types/trip';

export default function MyTripsPage() {
  const [trips, setTrips] = useState<Trip[]>(
    mockTrips.filter((t) => t.driver_id === mockCurrentUser.id || t.driver_id === 'usr_driver_1')
  );
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleCancelTrip = (tripId: string) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: 'cancelled' } : t))
    );
    setActionNotice('Trip status updated to Cancelled.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Offered Journeys</h1>
          <p className="mt-1 text-sm text-slate-500">
            Trips you have published as a driver. Manage bookings, seats, and passengers.
          </p>
        </div>

        <Link
          href="/trips/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-sm shadow-xs transition-colors self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a New Ride</span>
        </Link>
      </div>

      {actionNotice && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs font-semibold text-amber-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Trips List */}
      {trips.length > 0 ? (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <StatusBadge status={trip.status} />
                  <span className="text-xs text-slate-500">ID: {trip.id}</span>
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  {trip.vehicle?.vehicle_model}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Route */}
                <div className="md:col-span-6 space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Route
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {trip.origin_name} ➔ {trip.destination_name}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {trip.departure_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {trip.departure_time}
                    </span>
                  </div>
                </div>

                {/* Capacity & Contribution */}
                <div className="md:col-span-3 space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Available Capacity
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                    <Users className="w-4 h-4 text-sky-600" />
                    <span>
                      {trip.available_seats} of {trip.total_seats} seats free
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Mode:{' '}
                    <span className="font-semibold text-slate-700">
                      {trip.contribution_mode === 'discuss'
                        ? 'Discuss with rider'
                        : `₹${trip.suggested_contribution} suggested`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-3 flex items-center justify-end gap-2 pt-2 md:pt-0">
                  <Link
                    href={`/trips/${trip.id}`}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                  >
                    View Public
                  </Link>
                  {trip.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancelTrip(trip.id)}
                      className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Car}
          title="You haven't posted any trips yet"
          description="Empty seats on your commute or intercity drive? Post a trip to connect with passengers heading the same way."
          actionLabel="Post Your First Trip"
          actionHref="/trips/create"
        />
      )}
    </div>
  );
}
