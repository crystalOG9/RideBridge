export type UserRole = 'driver' | 'passenger' | 'both';

export type VerificationStatus = 'unverified' | 'pending' | 'verified';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  role: UserRole;
  verification_status: VerificationStatus;
  rating: number;
  rating_count: number;
  total_trips?: number;
  created_at: string;
  updated_at?: string;
}
