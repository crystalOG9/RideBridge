export type PaymentType = 'route_unlock' | 'featured_trip' | 'subscription' | 'connection_fee';

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export type PaymentProvider = 'demo' | 'razorpay' | 'stripe';

export interface PaymentRecord {
  id: string;
  user_id: string;
  type: PaymentType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  reference_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface PaymentInitiationParams {
  type: PaymentType;
  amount: number;
  currency?: string;
  metadata?: Record<string, unknown>;
}
