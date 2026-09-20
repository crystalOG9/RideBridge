'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Car, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Authenticating...');
    setTimeout(() => {
      setLoading(false);
      setStatusMessage('Signed in successfully! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    }, 600);
  };

  const handleQuickFill = (role: 'driver' | 'passenger') => {
    if (role === 'driver') {
      setEmail('vikram.j@example.com');
      setPassword('demo123456');
    } else {
      setEmail('piyush@example.com');
      setPassword('demo123456');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in to manage your rides, seat requests, and messages.
          </p>
        </div>

        {/* Demo Quick Fill for MVP Preview */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs space-y-2">
          <div className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            Quick Demo Fill (MVP Phase 1)
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('driver')}
              className="flex-1 py-1.5 px-2.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors text-center"
            >
              Demo as Driver
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('passenger')}
              className="flex-1 py-1.5 px-2.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors text-center"
            >
              Demo as Passenger
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-sky-600 hover:text-sky-700"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs font-medium text-sky-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>{statusMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold rounded-xl text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Don’t have an account yet?{' '}
          <Link href="/signup" className="font-semibold text-sky-600 hover:text-sky-700">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}
