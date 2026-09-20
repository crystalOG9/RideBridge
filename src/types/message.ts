import { UserProfile } from './user';

export interface Message {
  id: string;
  connection_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  read_at?: string;
  created_at: string;
  // Hydrated sender
  sender?: UserProfile;
}

export interface ConversationSummary {
  connection_id: string;
  other_user: UserProfile;
  trip_route: string;
  trip_date: string;
  last_message?: Message;
  unread_count: number;
}
