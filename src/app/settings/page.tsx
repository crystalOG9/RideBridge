'use client';

import React, { useState } from 'react';
import {
  Bell,
  Shield,
  User,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';

export default function SettingsPage() {
  const [notifyRequests, setNotifyRequests] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyPromotions, setNotifyPromotions] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('+91 98111 22334');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Account & Safety Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage notifications, emergency safety contacts, and privacy preferences.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Account Details */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-sky-600" />
            <span>Profile Credentials</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Registered Email</label>
              <input
                type="email"
                disabled
                value={mockCurrentUser.email}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Primary Mobile</label>
              <input
                type="tel"
                defaultValue={mockCurrentUser.phone}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* 2. Notifications */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-600" />
            <span>Notification Preferences</span>
          </h2>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <div className="font-bold text-slate-900">Seat Request Updates</div>
                <div className="text-slate-500">Alerts when drivers accept or passengers request seats.</div>
              </div>
              <input
                type="checkbox"
                checked={notifyRequests}
                onChange={(e) => setNotifyRequests(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <div className="font-bold text-slate-900">In-App Chat Messages</div>
                <div className="text-slate-500">Instant notification when a connected rider messages you.</div>
              </div>
              <input
                type="checkbox"
                checked={notifyMessages}
                onChange={(e) => setNotifyMessages(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <div className="font-bold text-slate-900">Route Boost & Discovery Tips</div>
                <div className="text-slate-500">Occasional tips regarding high-demand intercity routes.</div>
              </div>
              <input
                type="checkbox"
                checked={notifyPromotions}
                onChange={(e) => setNotifyPromotions(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600"
              />
            </label>
          </div>
        </div>

        {/* 3. Safety & Emergency Support */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Safety & Emergency Contacts</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Designated Emergency Contact Number
              </label>
              <input
                type="tel"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="+91 98XXX XXXXX"
                className="w-full sm:w-80 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 text-slate-900"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                This contact will receive automated SMS location links in case SOS is triggered.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Harassment Policy:</strong> You can report or block users anytime from their profile or active chat. Reports are reviewed by safety moderators.
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto py-3 px-6 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
