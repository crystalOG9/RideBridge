'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Car,
  Search,
  PlusCircle,
  MessageSquare,
  LayoutDashboard,
  Menu,
  X,
  Star,
  Bell,
} from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<'driver' | 'passenger'>('passenger');

  const navLinks = [
    { name: 'Find Rides', href: '/trips', icon: Search },
    { name: 'Offer a Ride', href: '/trips/create', icon: PlusCircle },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Trips', href: '/my-trips', icon: Car },
    { name: 'Requests', href: '/requests', icon: Bell },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm group-hover:bg-sky-700 transition-colors">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight text-slate-900 tracking-tight flex items-center gap-1.5">
                  RideBridge
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    MVP
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Shared Journeys, Direct Trust</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setActiveRole('passenger')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeRole === 'passenger'
                    ? 'bg-white text-sky-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Passenger Mode
              </button>
              <button
                onClick={() => setActiveRole('driver')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeRole === 'driver'
                    ? 'bg-white text-sky-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Driver Mode
              </button>
            </div>

            {/* User Profile Badge */}
            <Link
              href="/profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-semibold">
                {mockCurrentUser.full_name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-slate-800 leading-none">
                  {mockCurrentUser.full_name.split(' ')[0]}
                </div>
                <div className="flex items-center gap-0.5 text-[10px] text-amber-600 font-medium">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  <span>{mockCurrentUser.rating}</span>
                </div>
              </div>
            </Link>

            <Link
              href="/trips/create"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Trip</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/trips/create"
              className="px-2.5 py-1.5 text-xs font-semibold text-white bg-sky-600 rounded-lg"
            >
              Post Trip
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-semibold">
                {mockCurrentUser.full_name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">{mockCurrentUser.full_name}</div>
                <div className="text-xs text-slate-500">Active mode: {activeRole}</div>
              </div>
            </div>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => setActiveRole(activeRole === 'driver' ? 'passenger' : 'driver')}
                className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium"
              >
                Switch to {activeRole === 'driver' ? 'Passenger' : 'Driver'}
              </button>
            </div>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-100 flex gap-2">
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              My Profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
