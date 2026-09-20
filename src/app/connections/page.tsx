'use client';

import React from 'react';
import Link from 'next/link';
import { mockConnections, mockCurrentUser } from '@/lib/mock-data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  HeartHandshake,
  MessageSquare,
  Calendar,
  Clock,
  Car,
  Shield,
  Star,
} from 'lucide-react';

export default function ConnectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Confirmed Travel Connections
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Direct peer bridges established between driver and passenger. Coordinate pickup, luggage, and mutual fuel contribution.
        </p>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-sky-950">
        <div className="flex items-start sm:items-center gap-2.5">
          <Shield className="w-5 h-5 text-sky-600 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Travel Bridge Protocol:</strong> Use the rider chat to finalize pickup timing and landmark. Ensure emergency contacts know your travel plan.
          </span>
        </div>
      </div>

      {/* Connections List */}
      {mockConnections.length > 0 ? (
        <div className="space-y-6">
          {mockConnections.map((conn) => {
            const isMeDriver = conn.driver_id === mockCurrentUser.id;
            const peer = isMeDriver ? conn.passenger : conn.driver;

            return (
              <div
                key={conn.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
              >
                {/* Header Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <StatusBadge status="active" />
                    <span className="text-xs font-semibold text-slate-500">
                      Connection #{conn.id}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Direct Bridge Active
                  </div>
                </div>

                {/* Journey & Riders Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Journey Route */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Confirmed Route
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      {conn.trip?.origin_name} ➔ {conn.trip?.destination_name}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {conn.trip?.departure_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {conn.trip?.departure_time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5" />
                        {conn.trip?.vehicle?.vehicle_model}
                      </span>
                    </div>

                    {/* Agreed Notes */}
                    {conn.pickup_notes && (
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 space-y-1">
                        <div className="font-semibold text-slate-900">Agreed Coordination:</div>
                        <div>{conn.pickup_notes}</div>
                      </div>
                    )}
                  </div>

                  {/* Peer Rider Profile Card */}
                  <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Traveling With ({isMeDriver ? 'Passenger' : 'Driver'})
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold flex items-center justify-center text-sm">
                        {peer?.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{peer?.full_name}</div>
                        <VerificationBadge
                          status={peer?.verification_status || 'verified'}
                          size="sm"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{peer?.rating || '4.9'}</span>
                      <span className="text-slate-400 font-normal">
                        ({peer?.rating_count || 12} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Direct Contact & Chat CTA */}
                  <div className="lg:col-span-2 flex flex-col gap-2">
                    <Link
                      href="/messages"
                      className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open Chat</span>
                    </Link>
                    <Link
                      href={`/trips/${conn.trip_id}`}
                      className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs text-center transition-colors"
                    >
                      Trip Specs
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={HeartHandshake}
          title="No confirmed connections yet"
          description="When a driver accepts your seat request, or you accept a passenger's request, your confirmed journey connection will appear here."
          actionLabel="Explore Trips"
          actionHref="/trips"
        />
      )}
    </div>
  );
}
