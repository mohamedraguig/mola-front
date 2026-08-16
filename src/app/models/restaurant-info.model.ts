export interface OpeningPeriod {
  id: number;
  from: string;
  to: string;
  note: string | null;
}

export interface OpeningDay {
  id: number;
  day: string;
  closed: boolean | null;
  order: number;
  periods: OpeningPeriod[];
}

export interface RestaurantInfo {
  id: number;
  documentId: string;
  name: string;
  address: string;
  phone: string;
  instagramUrl: string;
  tiktokUrl: string;
  googleMapsUrl: string;
  openingDays: OpeningDay[];
}