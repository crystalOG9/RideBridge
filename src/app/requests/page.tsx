'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockRequests, mockCurrentUser } from '@/lib/mock-data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Bell,
  CheckCircle2,
  XCircle,
  Users,
  MessageSquare,
  Star,
} from 'lucide-react';
import { TripRequest } from '@/types/request';

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState<'incoming' | 'sent'>('incoming');
  const [requests, setRequests] = useState<TripRequest[]>(mockRequests);
  const [notice, setNotice] = useState<string | null>(null);

  const incomingRequests = requests.filter(
    (r) => r.trip?.driver_id === mockCurrentUser.id || r.id === 'req_203'
  );
  const sentRequests = requests.filter((r) => r.passenger_id === mockCurrentUser.id);

  const handleAccept = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'accepted' } : r))
    );
    setNotice('Seat request accepted! Direct connection established.');
    setTimeout(() => setNotice(null), 3500);
  };

  const handleReject = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'rejected' } : r))
    );
    setNotice('Seat request declined.');
    setTimeout(() => setNotice(null), 3500);
  };

  const handleCancel = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'cancelled' } : r))
    );
    setNotice('Your seat request has been cancelled.');
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Ride Requests Hub</h1>
        <p className="mt-1 text-sm text-slate-500">
          Accept or manage passenger requests for your carpool trips, and track seats you requested.
        </p>
      </div>

      {notice && (
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs font-semibold text-sky-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sky-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`py-2 px-4 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'incoming'
              ? 'bg-sky-50 text-sky-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Incoming Requests (Driver)</span>
          <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
            {incomingRequests.filter((r) => r.status === 'pending').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sent')}
          className={`py-2 px-4 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'sent'
              ? 'bg-sky-50 text-sky-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>My Sent Requests (Passenger)</span>
          <span className="text-xs text-slate-400 font-normal">({sentRequests.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'incoming' ? (
        <div className="space-y-4">
          {incomingRequests.length > 0 ? (
            incomingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={req.status} size="sm" />
                    <span className="text-xs text-slate-500">
                      Requested {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-sky-700">
                    {req.seats_requested} seat{req.seats_requested !== 1 ? 's' : ''} requested
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Passenger Info */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {req.passenger?.full_name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {req.passenger?.full_name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <VerificationBadge
                          status={req.passenger?.verification_status || 'unverified'}
                          size="sm"
                        />
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-amber-600 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{req.passenger?.rating || '4.8'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trip details & message */}
                  <div className="md:col-span-5 space-y-1">
                    <div className="text-xs font-bold text-slate-900">
                      Trip: {req.trip?.origin_name} ➔ {req.trip?.destination_name}
                    </div>
                    <div className="text-xs text-slate-500">
                      Date: {req.trip?.departure_date} at {req.trip?.departure_time}
                    </div>
                    {req.message && (
                      <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 italic border border-slate-100 mt-1">
                        &quot;{req.message}&quot;
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="md:col-span-3 flex sm:flex-col lg:flex-row items-center justify-end gap-2">
                    {req.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="w-full sm:w-auto py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="w-full sm:w-auto py-2 px-3 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      </>
                    ) : req.status === 'accepted' ? (
                      <Link
                        href="/messages"
                        className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-400">Action closed</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={Bell}
              title="No pending requests for your trips"
              description="When passengers search your route and request seats, they will appear here for you to accept or decline."
            />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sentRequests.length > 0 ? (
            sentRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={req.status} size="sm" />
                    <span className="text-xs text-slate-500">Request #{req.id}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    {req.seats_requested} seat requested
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 space-y-1">
                    <div className="text-base font-bold text-slate-900">
                      {req.trip?.origin_name} ➔ {req.trip?.destination_name}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>Date: {req.trip?.departure_date}</span>
                      <span>Time: {req.trip?.departure_time}</span>
                      <span>Driver: {req.trip?.driver?.full_name}</span>
                    </div>
                    {req.message && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-2">
                        Your note: &quot;{req.message}&quot;
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-4 flex items-center justify-end gap-2">
                    {req.status === 'accepted' ? (
                      <Link
                        href="/messages"
                        className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat & Coordinate</span>
                      </Link>
                    ) : req.status === 'pending' ? (
                      <button
                        onClick={() => handleCancel(req.id)}
                        className="py-2 px-3 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Cancel Request
                      </button>
                    ) : (
                      <Link
                        href="/trips"
                        className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                      >
                        Find Other Rides
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={Users}
              title="You haven't requested any seats yet"
              description="Explore available intercity rides and request a seat from verified drivers."
              actionLabel="Find Rides Now"
              actionHref="/trips"
            />
          )}
        </div>
      )}
    </div>
  );
}
