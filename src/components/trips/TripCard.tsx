import React from 'react';
import Link from 'next/link';
import { Trip } from '@/types/trip';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { Badge } from '@/components/ui/Badge';
import {
  Calendar,
  Clock,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

export function TripCard({
  trip,
  matchScore,
  matchReasons,
}: {
  trip: Trip;
  matchScore?: number;
  matchReasons?: string[];
}) {
  const driver = trip.driver;

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-md hover:border-sky-300 p-5 sm:p-6 ${
        trip.is_featured
          ? 'border-amber-300 bg-gradient-to-b from-amber-50/20 via-white to-white ring-1 ring-amber-300/60'
          : 'border-slate-200'
      }`}
    >
      {/* Top Meta: Featured Tag or Match Score */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          {trip.is_featured && (
            <Badge variant="featured" size="sm">
              <Sparkles className="w-3 h-3" />
              <span>Boosted Trip</span>
            </Badge>
          )}

          {typeof matchScore === 'number' && matchScore > 0 && (
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                matchScore >= 85
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-sky-50 text-sky-700 border border-sky-200'
              }`}
            >
              <span>{matchScore}% Match</span>
            </span>
          )}

          {matchReasons && matchReasons.length > 0 && (
            <span className="hidden sm:inline-block text-[11px] text-slate-500">
              • {matchReasons[0]}
            </span>
          )}
        </div>

        {/* Contribution Badge */}
        <div className="text-right">
          {trip.contribution_mode === 'discuss' ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Discuss with driver</span>
            </span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-slate-500 font-medium">Suggested</span>
              <span className="text-base font-bold text-slate-900">₹{trip.suggested_contribution}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Journey Route */}
      <div className="space-y-3 mb-5">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center mt-1">
            <div className="w-3 h-3 rounded-full bg-sky-600 ring-4 ring-sky-100" />
            <div className="w-0.5 h-7 bg-slate-200 my-0.5" />
            <div className="w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="text-xs font-medium text-slate-500">Origin</div>
              <div className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">
                {trip.origin_name}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Destination</div>
              <div className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">
                {trip.destination_name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Details Grid */}
      <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-5">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{trip.departure_date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-medium">{trip.departure_time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span className="font-semibold text-sky-700">
            {trip.available_seats} seat{trip.available_seats !== 1 ? 's' : ''} left
          </span>
        </div>
      </div>

      {/* Driver Footer & Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold text-xs shrink-0">
            {driver ? driver.full_name.charAt(0) : 'D'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-semibold text-slate-900">
                {driver ? driver.full_name : 'Driver'}
              </span>
              {driver && <VerificationBadge status={driver.verification_status} size="sm" showLabel={false} />}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-medium text-slate-700">{driver?.rating || '4.8'}</span>
              <span>({driver?.rating_count || 12})</span>
              {trip.vehicle && (
                <span className="hidden sm:inline-block text-slate-400">• {trip.vehicle.vehicle_model}</span>
              )}
            </div>
          </div>
        </div>

        <Link
          href={`/trips/${trip.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors group-hover:bg-sky-600 group-hover:text-white"
        >
          <span>View Trip</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
