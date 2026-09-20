import { UserProfile } from './user';
import { Trip } from './trip';
import { TripRequest } from './request';

export type ConnectionStatus = 'active' | 'completed' | 'cancelled';

export interface Connection {
  id: string;
  trip_id: string;
  driver_id: string;
  passenger_id: string;
  request_id: string;
  status: ConnectionStatus;
  pickup_notes?: string;
  agreed_contribution?: string;
  created_at: string;
  updated_at?: string;
  // Hydrated joins
  driver?: UserProfile;
  passenger?: UserProfile;
  trip?: Trip;
  request?: TripRequest;
}
