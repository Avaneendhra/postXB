
export enum DeliveryStatus {
  IN_TRANSIT = 'In Transit',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  PENDING = 'Pending',
  DELAYED = 'Delayed'
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface Parcel {
  id: string;
  trackingId: string;
  origin: string;
  destination: string;
  status: DeliveryStatus;
  currentLocation: string;
  expectedDelivery: string;
  carrier: string;
  history: {
    timestamp: string;
    location: string;
    description: string;
  }[];
}

export interface GroundingChunk {
  web?: { uri: string; title: string };
  maps?: { uri: string; title: string };
}

export interface PredictionResult {
  estimatedArrival: string;
  delayProbability: number;
  riskLevel: RiskLevel;
  reasoning: string;
  externalFactors: {
    weather: string;
    traffic: string;
    logistics: string;
  };
  recommendation: string;
  groundingUrls?: string[];
}

export interface HistoricalData {
  date: string;
  avgDelay: number;
  volume: number;
  onTimeRate: number;
}
