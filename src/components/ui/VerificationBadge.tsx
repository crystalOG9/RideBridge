import React from 'react';
import { VerificationStatus } from '@/types/user';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export function VerificationBadge({
  status,
  size = 'md',
  showLabel = true,
}: {
  status: VerificationStatus;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}) {
  if (status === 'verified') {
    return (
      <span
        title="ID and mobile verified by platform"
        className={`inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-full ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
        }`}
      >
        <ShieldCheck className={size === 'sm' ? 'w-3.5 h-3.5 text-emerald-600' : 'w-4 h-4 text-emerald-600'} />
        {showLabel && <span>Verified Driver</span>}
      </span>
    );
  }

  // Not verified or pending
  return (
    <span
      title="Verification pending or not submitted yet"
      className={`inline-flex items-center gap-1 font-normal text-slate-500 bg-slate-100/90 border border-slate-200/80 rounded-full ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2 py-0.5 text-xs'
      }`}
    >
      <ShieldAlert className={size === 'sm' ? 'w-3 h-3 text-slate-400' : 'w-3.5 h-3.5 text-slate-400'} />
      {showLabel && <span>Verification available</span>}
    </span>
  );
}
