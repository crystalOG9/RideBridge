'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TripCard } from '@/components/trips/TripCard';
import { TripSearchForm } from '@/components/trips/TripSearchForm';
import { mockTrips } from '@/lib/mock-data';
import { matchingService } from '@/lib/services/matching-service';
import { TripSearchParams } from '@/types/trip';
import { EmptyState } from '@/components/ui/EmptyState';
import { SlidersHorizontal, Search, ShieldCheck } from 'lucide-react';

function TripsContent() {
  const searchParams = useSearchParams();

  const initialOrigin = searchParams.get('origin') || '';
  const initialDestination = searchParams.get('destination') || '';
  const initialDate = searchParams.get('date') || '';
  const initialSeats = Number(searchParams.get('seats')) || 1;

  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'time' | 'rating' | 'seats'>('match');

  const searchCriteria: TripSearchParams = useMemo(
    () => ({
      origin: initialOrigin,
      destination: initialDestination,
      departure_date: initialDate || undefined,
      seats_required: initialSeats,
      verified_only: verifiedOnly,
      sort_by: sortBy,
    }),
    [initialOrigin, initialDestination, initialDate, initialSeats, verifiedOnly, sortBy]
  );

  const rankedResults = useMemo(() => {
    return matchingService.rankTrips(mockTrips, searchCriteria);
  }, [searchCriteria]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Find Shared Intercity Journeys
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Discover drivers heading your way. Connect directly and agree on travel contribution.
        </p>
      </div>

      {/* Interactive Search Bar */}
      <TripSearchForm
        initialOrigin={initialOrigin}
        initialDestination={initialDestination}
        initialDate={initialDate}
        initialSeats={initialSeats}
      />

      {/* Results Header with Filters & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-800">
            {rankedResults.length} ride{rankedResults.length !== 1 ? 's' : ''} available
          </span>
          {initialOrigin && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              From: {initialOrigin}
            </span>
          )}
          {initialDestination && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              To: {initialDestination}
            </span>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Verified Toggle */}
          <button
            type="button"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition-all ${
              verifiedOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Drivers Only</span>
          </button>

          {/* Sort By Select */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'match' | 'time' | 'rating' | 'seats')}
              className="bg-transparent font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
            >
              <option value="match">Best Match</option>
              <option value="time">Departure Time</option>
              <option value="rating">Driver Rating</option>
              <option value="seats">Available Seats</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trip Cards Grid */}
      {rankedResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankedResults.map(({ trip, matchScore, matchReasons }) => (
            <TripCard
              key={trip.id}
              trip={trip}
              matchScore={matchScore}
              matchReasons={matchReasons}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No compatible trips found"
          description="We couldn't find any journeys matching your current filters. Try changing your travel date, clearing origin/destination, or requesting a ride alert."
          actionLabel="View All Departures"
          actionHref="/trips"
        />
      )}
    </div>
  );
}

export default function TripsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading trips...</div>}>
      <TripsContent />
    </Suspense>
  );
}
