'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, Search, ArrowRightLeft } from 'lucide-react';

export function TripSearchForm({
  initialOrigin = '',
  initialDestination = '',
  initialDate = '',
  initialSeats = 1,
  className = '',
}: {
  initialOrigin?: string;
  initialDestination?: string;
  initialDate?: string;
  initialSeats?: number;
  className?: string;
}) {
  const router = useRouter();
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [date, setDate] = useState(initialDate || '2026-09-25');
  const [seats, setSeats] = useState(initialSeats);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (origin.trim()) params.set('origin', origin.trim());
    if (destination.trim()) params.set('destination', destination.trim());
    if (date.trim()) params.set('date', date.trim());
    if (seats > 1) params.set('seats', seats.toString());

    router.push(`/trips?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 sm:p-4 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
        {/* From Input */}
        <div className="md:col-span-3 relative flex items-center bg-slate-50 hover:bg-slate-100/80 rounded-xl px-3.5 py-2.5 border border-slate-200/60 transition-colors">
          <MapPin className="w-5 h-5 text-sky-600 shrink-0 mr-2.5" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Leaving From
            </label>
            <input
              type="text"
              placeholder="e.g. Pune"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="hidden md:flex md:col-span-1 justify-center">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap Origin and Destination"
            className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600 border border-slate-200 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* To Input */}
        <div className="md:col-span-3 relative flex items-center bg-slate-50 hover:bg-slate-100/80 rounded-xl px-3.5 py-2.5 border border-slate-200/60 transition-colors">
          <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mr-2.5" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Going To
            </label>
            <input
              type="text"
              placeholder="e.g. Hyderabad"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="md:col-span-2 relative flex items-center bg-slate-50 hover:bg-slate-100/80 rounded-xl px-3.5 py-2.5 border border-slate-200/60 transition-colors">
          <Calendar className="w-4 h-4 text-slate-500 shrink-0 mr-2.5" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Travel Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Seats Required */}
        <div className="md:col-span-1 relative flex items-center bg-slate-50 hover:bg-slate-100/80 rounded-xl px-2.5 py-2.5 border border-slate-200/60 transition-colors">
          <Users className="w-4 h-4 text-slate-500 shrink-0 mr-2" />
          <div className="flex-1 min-w-0">
            <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Seats
            </label>
            <select
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        </div>

        {/* Search CTA */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-md transition-all duration-150 hover:shadow-sky-600/20 active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Find Rides</span>
          </button>
        </div>
      </div>
    </form>
  );
}
