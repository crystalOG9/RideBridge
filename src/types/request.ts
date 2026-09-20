import { UserProfile } from './user';
import { Trip } from './trip';

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface TripRequest {
  id: string;
  trip_id: string;
  passenger_id: string;
  seats_requested: number;
  message?: string;
  status: RequestStatus;
  created_at: string;
  updated_at?: string;
  // Hydrated joins
  passenger?: UserProfile;
  trip?: Trip;
}
