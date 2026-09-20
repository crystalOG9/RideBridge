import React from 'react';
import Link from 'next/link';
import { Car, Shield, Heart, Zap, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Principle */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">RideBridge</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The trusted bridge connecting drivers with empty seats to passengers traveling on the same route. Share journeys, split fuel, and travel comfortably.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>Verified Community Protocol</span>
            </div>
          </div>

          {/* Col 2: Platform Routes */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/trips" className="hover:text-white transition-colors">
                  Find a Ride
                </Link>
              </li>
              <li>
                <Link href="/trips/create" className="hover:text-white transition-colors">
                  Offer Empty Seats
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/connections" className="hover:text-white transition-colors">
                  Active Connections
                </Link>
              </li>
              <li>
                <Link href="/messages" className="hover:text-white transition-colors">
                  Rider Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Principles & Pricing */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Our Model</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-1.5">
                <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Zero mandatory ticket commission</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Direct mutual contribution agreed by peers</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Optional tools: ₹10 route unlock & ₹20 trip boost</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Safety */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Trust & Safety</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Always verify vehicle and driver profile before departure. Use in-app messaging to finalize pickup points safely.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
              <span className="font-semibold text-white">Emergency Support:</span>
              <p className="text-slate-400 mt-1">24/7 Safety guidelines available in trip details.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 RideBridge Technologies. Built with modern modular architecture.</p>
          <div className="flex items-center gap-4">
            <Link href="/trips" className="hover:text-slate-300">
              Intercity Routes
            </Link>
            <Link href="/profile" className="hover:text-slate-300">
              Driver Verification
            </Link>
            <Link href="/settings" className="hover:text-slate-300">
              Safety Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
