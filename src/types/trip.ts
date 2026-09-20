import { UserProfile } from './user';

export type VehicleType = 'sedan' | 'suv' | 'hatchback' | 'ev' | 'other';

export interface Vehicle {
  id: string;
  owner_id: string;
  vehicle_type: VehicleType;
  vehicle_model: string;
  registration_number?: string;
  seats: number;
  color?: string;
  created_at: string;
  updated_at?: string;
}

export type TripStatus = 'draft' | 'published' | 'full' | 'completed' | 'cancelled';

export type ContributionMode = 'discuss' | 'suggested';

export interface TripPreferences {
  luggage_allowed: boolean;
  music_preference?: string;
  smoking_allowed: boolean;
  pets_allowed: boolean;
}

export interface Trip {
  id: string;
  driver_id: string;
  vehicle_id: string;
  origin_name: string;
  origin_lat?: number;
  origin_lng?: number;
  destination_name: string;
  destination_lat?: number;
  destination_lng?: number;
  departure_date: string; // YYYY-MM-DD
  departure_time: string; // HH:MM
  available_seats: number;
  total_seats: number;
  contribution_mode: ContributionMode;
  suggested_contribution?: number; // In local currency e.g. INR
  notes?: string;
  preferences?: TripPreferences;
  status: TripStatus;
  is_featured?: boolean;
  is_detailed_route_unlocked?: boolean;
  created_at: string;
  updated_at?: string;
  // Hydrated joins
  driver?: UserProfile;
  vehicle?: Vehicle;
}

export interface TripSearchParams {
  origin?: string;
  destination?: string;
  departure_date?: string;
  seats_required?: number;
  contribution_max?: number;
  verified_only?: boolean;
  sort_by?: 'match' | 'time' | 'rating' | 'seats';
}
