import React from 'react';
import { Badge } from './Badge';
import { TripStatus } from '@/types/trip';
import { RequestStatus } from '@/types/request';
import { Clock, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';

export function StatusBadge({
  status,
  size = 'md',
}: {
  status: TripStatus | RequestStatus | 'active';
  size?: 'sm' | 'md';
}) {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="warning" size={size}>
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>Pending Request</span>
        </Badge>
      );
    case 'accepted':
    case 'active':
      return (
        <Badge variant="success" size={size}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Connected</span>
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="danger" size={size}>
          <XCircle className="w-3.5 h-3.5" />
          <span>Declined</span>
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="default" size={size}>
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Cancelled</span>
        </Badge>
      );
    case 'published':
      return (
        <Badge variant="primary" size={size}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>Seats Available</span>
        </Badge>
      );
    case 'full':
      return (
        <Badge variant="default" size={size}>
          <span>Full (0 Seats)</span>
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="default" size={size}>
          <span>Completed</span>
        </Badge>
      );
    case 'draft':
      return (
        <Badge variant="default" size={size}>
          <span>Draft</span>
        </Badge>
      );
    default:
      return <Badge size={size}>{status}</Badge>;
  }
}
