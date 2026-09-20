'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { VehicleType, ContributionMode } from '@/types/trip';

export default function CreateTripPage() {
  const router = useRouter();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('2026-09-25');
  const [time, setTime] = useState('08:00');
  const [availableSeats, setAvailableSeats] = useState(2);
  const [vehicleModel, setVehicleModel] = useState('Hyundai Creta');
  const [vehicleType, setVehicleType] = useState<VehicleType>('suv');
  const [registrationNumber, setRegistrationNumber] = useState('MH 12 AB 9988');
  const [contributionMode, setContributionMode] = useState<ContributionMode>('discuss');
  const [suggestedContribution, setSuggestedContribution] = useState<number>(500);
  const [notes, setNotes] = useState('');
  const [luggageAllowed, setLuggageAllowed] = useState(true);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        router.push('/my-trips');
      }, 1200);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Driver Publishing Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Offer Empty Seats on Your Trip
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Going somewhere? Share the journey with verified travelers heading the same way and split fuel costs.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your trip is published!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your journey from <strong className="text-slate-900">{origin}</strong> to{' '}
            <strong className="text-slate-900">{destination}</strong> is now live for passengers to discover.
          </p>
          <div className="pt-2 text-xs text-slate-400">Redirecting to your posted trips...</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Journey Route */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>1. Journey & Timing</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Origin City / Pickup Area
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune (Hadapsar / Magarpatta)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Destination City / Drop Area
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyderabad (Gachibowli)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Departure Date
                </label>
                <div className="relative flex items-center">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Departure Time
                </label>
                <div className="relative flex items-center">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Vehicle & Capacity */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Car className="w-4 h-4 text-sky-600" />
              <span>2. Vehicle & Available Seats</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyundai Creta"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Seats to Offer
                </label>
                <select
                  value={availableSeats}
                  onChange={(e) => setAvailableSeats(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50"
                >
                  <option value={1}>1 seat</option>
                  <option value={2}>2 seats</option>
                  <option value={3}>3 seats</option>
                  <option value={4}>4 seats</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50"
                >
                  <option value="suv">SUV / MUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="ev">Electric Vehicle (EV)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Registration Number (Optional in prototype)
                </label>
                <input
                  type="text"
                  placeholder="MH 12 AB 9988"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* 3. Contribution Model */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-600" />
              <span>3. Travel Contribution</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setContributionMode('discuss')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  contributionMode === 'discuss'
                    ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-500/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="text-sm font-bold text-slate-900">
                  Discuss with passenger (Default)
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Connect first, then agree on a fair share for fuel and toll via direct chat.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setContributionMode('suggested')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  contributionMode === 'suggested'
                    ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-500/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="text-sm font-bold text-slate-900">
                  Suggest contribution upfront
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Indicate an approximate amount per seat to help passengers decide faster.
                </div>
              </button>
            </div>

            {contributionMode === 'suggested' && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Suggested Amount per Seat (INR ₹)
                </label>
                <input
                  type="number"
                  min={50}
                  step={50}
                  value={suggestedContribution}
                  onChange={(e) => setSuggestedContribution(Number(e.target.value))}
                  className="w-48 p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white"
                />
              </div>
            )}
          </div>

          {/* 4. Notes & Preferences */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">4. Ride Preferences & Guidelines</h2>

            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={luggageAllowed}
                  onChange={(e) => setLuggageAllowed(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600"
                />
                <span>Boot Luggage Allowed</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smokingAllowed}
                  onChange={(e) => setSmokingAllowed(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600"
                />
                <span>Smoking Allowed</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={petsAllowed}
                  onChange={(e) => setPetsAllowed(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600"
                />
                <span>Small Pets Allowed</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Trip Notes / Specific Pickup instructions
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Starting from Magarpatta City. Can stop along Pune-Solapur highway for breakfast."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold rounded-2xl text-base shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Publishing your trip...' : 'Publish Trip to Community'}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      )}
    </div>
  );
}
