export interface RouteSummary {
  origin: string;
  destination: string;
  distance_km: number;
  duration_minutes: number;
  duration_formatted: string;
  waypoints?: string[];
  provider: string;
  is_mock: boolean;
}

export class MapService {
  private provider: string;
  private apiKey?: string;

  constructor() {
    this.provider = process.env.NEXT_PUBLIC_MAP_PROVIDER || 'fallback';
    this.apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
  }

  public getProviderStatus() {
    return {
      provider: this.provider,
      hasApiKey: Boolean(this.apiKey && this.apiKey.trim().length > 0),
      isFallback: this.provider === 'fallback' || !this.apiKey,
    };
  }

  public async getRouteSummary(origin: string, destination: string): Promise<RouteSummary> {
    // If real provider is configured with key, external API integration hooks go here.
    // For MVP Phase 1, robust algorithmic approximation based on common Indian intercity routes:
    const approxDistances: Record<string, number> = {
      'pune_hyderabad': 560,
      'hyderabad_pune': 560,
      'mumbai_pune': 150,
      'pune_mumbai': 150,
      'bangalore_chennai': 350,
      'chennai_bangalore': 350,
      'delhi_jaipur': 280,
      'jaipur_delhi': 280,
      'pune_solapur': 250,
      'solapur_hyderabad': 310,
    };

    const key = `${origin.trim().toLowerCase()}_${destination.trim().toLowerCase()}`;
    const distance_km = approxDistances[key] || 320;
    const duration_minutes = Math.round((distance_km / 65) * 60); // approx 65 km/h avg speed
    const hours = Math.floor(duration_minutes / 60);
    const mins = duration_minutes % 60;

    return {
      origin,
      destination,
      distance_km,
      duration_minutes,
      duration_formatted: `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim(),
      waypoints: ['Intermediate Transit Hub', 'Highway Rest Stop'],
      provider: this.provider,
      is_mock: !this.apiKey,
    };
  }
}

export const mapService = new MapService();
