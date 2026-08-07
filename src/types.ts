export type ViewMode = 'overview' | 'pipeline' | 'listings' | 'clients' | 'reports' | 'sources';

// Where a record originally lives. This is the backbone of the "single pane
// of glass" story: HubSpot stays the system of record for contacts, EasyBroker
// stays the system of record for portal inventory — EstatePro is the one
// place an agent works day to day across both, instead of tab-switching.
export type DataSource = 'hubspot' | 'easybroker' | 'manual';

export const SOURCE_LABEL: Record<DataSource, string> = {
  hubspot: 'HubSpot',
  easybroker: 'EasyBroker',
  manual: 'EstatePro',
};

// Deterministic Lead Score engine — same status/points pattern as Motor IN3's
// calcIN3Score(): the AI (or an agent) only ever assigns a status per
// criterion, never the score. The score is always computed by pure math so
// it stays auditable and explainable in the UI.
export type LeadCriterionStatus =
  | 'CUMPLE'
  | 'CUMPLE_CON_OBSERVACIONES'
  | 'NO_CUMPLE'
  | 'SIN_INFORMACION';

export interface LeadCriterionEvaluation {
  criterionId: string;
  status: LeadCriterionStatus;
  note?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  intent: 'High Intent' | 'Medium Intent' | 'Low Intent' | 'VIP';
  status: 'new' | 'negotiation' | 'closing' | 'won' | 'lost';
  inquiry: string;
  budget: string;
  preferredLocation: string;
  propertyOfInterest?: string;
  lastContact: string;
  assignedTo: string;
  notes?: string;
  criteria: LeadCriterionEvaluation[];
  source: DataSource;
}

// Market Health radar — same 6-axis SVG hexagon pattern as Motor IN3's
// RadarChart, repurposed from legal/location/market criteria to
// pricing/demand/velocity signals for a single listing.
export interface MarketHealth {
  price: number;
  location: number;
  demand: number;
  velocity: number;
  competition: number;
  condition: number;
}

export interface Comparable {
  address: string;
  price: number;
  pricePerSqft: number;
  daysOnMarket: number;
}

export interface Listing {
  id: string;
  address: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: 'Single Family' | 'Condo' | 'Multi-Family' | 'Commercial';
  status: 'active' | 'pending' | 'sold' | 'at_risk';
  daysOnMarket: number;
  image: string;
  clientName?: string;
  marketHealth: MarketHealth;
  marketAvgPrice: number;
  estimatedDaysToSell: number;
  comparables: Comparable[];
  source: DataSource;
  aiRecommendation?: {
    type: 'price_reduction' | 'description_boost' | 'high_demand';
    message: string;
    suggestedPrice?: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'deal' | 'viewing' | 'ai_insight' | 'lead';
  title: string;
  subtitle?: string;
  timestamp: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  actions?: {
    label: string;
    actionType: string;
    targetId?: string;
  }[];
}

export interface InsightCard {
  id: string;
  title: string;
  description: string;
  actionText: string;
  icon: string;
  theme: 'primary' | 'error' | 'tertiary';
  targetView?: ViewMode;
  aiPrompt?: string;
}

export interface AiMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionTitle?: string;
  actionContent?: string;
}

export interface SyncEvent {
  id: string;
  source: DataSource;
  message: string;
  timestamp: string;
}

export interface SourceConnection {
  source: DataSource;
  role: string;
  status: 'connected' | 'syncing';
  recordCount: number;
  recordLabel: string;
  lastSync: string;
}
