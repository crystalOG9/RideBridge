import { Trip, TripSearchParams } from '@/types/trip';

export interface ScoredTrip {
  trip: Trip;
  matchScore: number;
  matchReasons: string[];
}

export class MatchingService {
  /**
   * Calculates compatibility score (0-100) between a trip and passenger search criteria.
   */
  public calculateMatchScore(trip: Trip, search: TripSearchParams): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];

    const searchFrom = (search.origin || '').trim().toLowerCase();
    const searchTo = (search.destination || '').trim().toLowerCase();
    const tripFrom = trip.origin_name.trim().toLowerCase();
    const tripTo = trip.destination_name.trim().toLowerCase();

    // 1. Origin Matching
    if (searchFrom) {
      if (tripFrom === searchFrom) {
        score += 40;
        reasons.push('Exact departure city');
      } else if (tripFrom.includes(searchFrom) || searchFrom.includes(tripFrom)) {
        score += 30;
        reasons.push('Close departure area');
      }
    } else {
      score += 20; // Unfiltered baseline
    }

    // 2. Destination Matching
    if (searchTo) {
      if (tripTo === searchTo) {
        score += 40;
        reasons.push('Exact destination city');
      } else if (tripTo.includes(searchTo) || searchTo.includes(tripTo)) {
        score += 30;
        reasons.push('Close destination area');
      }
    } else {
      score += 20;
    }

    // 3. Date Matching
    if (search.departure_date) {
      if (trip.departure_date === search.departure_date) {
        score += 15;
        reasons.push('Matches travel date');
      } else {
        score -= 20;
      }
    }

    // 4. Seat Availability
    const seatsRequested = search.seats_required || 1;
    if (trip.available_seats >= seatsRequested) {
      score += 5;
      reasons.push(`${trip.available_seats} seats open`);
    } else {
      score = 0; // Ineligible if not enough seats
      return { score: 0, reasons: ['Insufficient seats available'] };
    }

    // 5. Driver Trust Boost
    if (trip.driver?.verification_status === 'verified') {
      score += 5;
      reasons.push('Verified driver');
    }

    // Cap score at 100 max, 0 min
    const finalScore = Math.max(0, Math.min(100, score));
    return { score: finalScore, reasons };
  }

  /**
   * Filter and rank trips according to search criteria.
   */
  public rankTrips(trips: Trip[], search: TripSearchParams): ScoredTrip[] {
    const scored = trips
      .map((trip) => {
        const { score, reasons } = this.calculateMatchScore(trip, search);
        return { trip, matchScore: score, matchReasons: reasons };
      })
      .filter((item) => {
        // Basic filtering
        if (search.origin && !item.trip.origin_name.toLowerCase().includes(search.origin.toLowerCase())) {
          return false;
        }
        if (search.destination && !item.trip.destination_name.toLowerCase().includes(search.destination.toLowerCase())) {
          return false;
        }
        if (search.departure_date && item.trip.departure_date !== search.departure_date) {
          return false;
        }
        if (search.seats_required && item.trip.available_seats < search.seats_required) {
          return false;
        }
        if (search.verified_only && item.trip.driver?.verification_status !== 'verified') {
          return false;
        }
        return true;
      });

    // Sorting
    const sortBy = search.sort_by || 'match';
    return scored.sort((a, b) => {
      // Featured trips get priority if scores are close
      if (a.trip.is_featured && !b.trip.is_featured) return -1;
      if (!a.trip.is_featured && b.trip.is_featured) return 1;

      if (sortBy === 'match') {
        return b.matchScore - a.matchScore;
      }
      if (sortBy === 'time') {
        return a.trip.departure_time.localeCompare(b.trip.departure_time);
      }
      if (sortBy === 'rating') {
        return (b.trip.driver?.rating || 0) - (a.trip.driver?.rating || 0);
      }
      if (sortBy === 'seats') {
        return b.trip.available_seats - a.trip.available_seats;
      }
      return 0;
    });
  }
}

export const matchingService = new MatchingService();
