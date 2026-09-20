'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockCurrentUser, mockVehicles } from '@/lib/mock-data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import {
  Car,
  Star,
  CheckCircle2,
  Edit,
  PlusCircle,
} from 'lucide-react';
import { UserRole } from '@/types/user';

export default function ProfilePage() {
  const [user, setUser] = useState(mockCurrentUser);
  const [role, setRole] = useState<UserRole>(user.role);
  const [notice, setNotice] = useState<string | null>(null);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setUser((prev) => ({ ...prev, role: newRole }));
    setNotice(`Active operating preference switched to ${newRole}.`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">User Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your verified credentials, registered vehicles, and community trust standing.
        </p>
      </div>

      {notice && (
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs font-semibold text-sky-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sky-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
              {user.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{user.full_name}</h2>
                <VerificationBadge status={user.verification_status} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Member since {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>

          <Link
            href="/settings"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors self-start"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Link>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-bold text-slate-900">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{user.rating}</span>
            </div>
            <div className="text-[11px] text-slate-500">{user.rating_count} Reviews</div>
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-slate-900">{user.total_trips}</div>
            <div className="text-[11px] text-slate-500">Total Trips</div>
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-emerald-600">100%</div>
            <div className="text-[11px] text-slate-500">Completion Rate</div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              About Me
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{user.bio}</p>
          </div>
        )}

        {/* Role Toggle Selector */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Current Preferred Operating Mode
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['passenger', 'driver', 'both'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                  role === r
                    ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {r === 'both' ? 'Both (Flexible)' : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicles Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Registered Vehicles</h3>
            <p className="text-xs text-slate-500">Vehicles used for offering carpool rides.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold rounded-xl text-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Vehicle</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockVehicles.slice(0, 2).map((veh) => (
            <div
              key={veh.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{veh.vehicle_model}</div>
                    <div className="text-xs text-slate-500 capitalize">{veh.vehicle_type}</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Active
                </span>
              </div>

              <div className="text-xs text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span>Plate: {veh.registration_number}</span>
                <span>{veh.seats} Passenger Seats</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
