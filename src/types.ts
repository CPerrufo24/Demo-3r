export type ViewMode = 'overview' | 'pipeline' | 'listings' | 'clients' | 'reports';

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
