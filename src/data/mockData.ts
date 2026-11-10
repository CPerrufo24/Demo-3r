import { Lead, Listing, ActivityItem, InsightCard } from '../types';

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Jenkins',
    phone: '+1 (555) 234-5678',
    email: 'sarah.j@techcorp.com',
    intent: 'High Intent',
    status: 'new',
    inquiry: 'Looking for 3BR in Downtown',
    budget: '$1,200,000 - $1,500,000',
    preferredLocation: 'Downtown / Waterfront',
    propertyOfInterest: '124 Maple St.',
    lastContact: '10 mins ago',
    assignedTo: 'Michael T.',
    notes: 'Pre-approved with Chase Bank. Needs move-in ready before September school start.'
  },
  {
    id: 'lead-2',
    name: 'Michael Chang',
    phone: '+1 (555) 876-5432',
    email: 'm.chang@investments.io',
    intent: 'High Intent',
    status: 'new',
    inquiry: 'Investment Property Inquiry',
    budget: '$2,500,000+',
    preferredLocation: 'Metro Commercial District',
    propertyOfInterest: 'Unit 4B, The Vista',
    lastContact: '2 hours ago',
    assignedTo: 'Elena R.',
    notes: 'Seeking 7%+ cap rate multi-family or luxury condo units with rental flexibility.'
  },
  {
    id: 'lead-3',
    name: 'The Rivera Family',
    phone: '+1 (555) 345-6789',
    email: 'carlos.rivera@gmail.com',
    intent: 'High Intent',
    status: 'negotiation',
    inquiry: '452 Oak Lane - Counter Offer Sent',
    budget: '$890,000',
    preferredLocation: 'Oak Ridge Suburbs',
    propertyOfInterest: '452 Oak Lane',
    lastContact: 'Yesterday',
    assignedTo: 'Elena R.',
    notes: 'Sent counter offer at $875k. Waiting for seller response on roof inspection contingency.'
  },
  {
    id: 'lead-4',
    name: 'Dr. Amanda Vance',
    phone: '+1 (555) 901-2345',
    email: 'vance.md@hospital.org',
    intent: 'VIP',
    status: 'negotiation',
    inquiry: 'Penthouse suite viewings requested',
    budget: '$3,200,000',
    preferredLocation: 'Skyline Heights',
    propertyOfInterest: 'Penthouse 1, The Monarch',
    lastContact: '3 hours ago',
    assignedTo: 'Michael T.',
    notes: 'Requires private parking garage and 24/7 concierge service.'
  },
  {
    id: 'lead-5',
    name: 'Marcus & Chloe Thorne',
    phone: '+1 (555) 456-7890',
    email: 'm.thorne@designstudio.com',
    intent: 'Medium Intent',
    status: 'closing',
    inquiry: 'Finalizing escrow for 782 Pine Ave',
    budget: '$1,150,000',
    preferredLocation: 'Arts District',
    propertyOfInterest: '782 Pine Ave',
    lastContact: '4 hours ago',
    assignedTo: 'Elena R.',
    notes: 'Escrow closing scheduled for Friday. Title check completed successfully.'
  },
  {
    id: 'lead-6',
    name: 'Jonathan Sterling',
    phone: '+1 (555) 678-9012',
    email: 'j.sterling@wealthmgmt.com',
    intent: 'High Intent',
    status: 'new',
    inquiry: 'Inquiry from weekend digital campaign',
    budget: '$1,800,000',
    preferredLocation: 'West End Hills',
    propertyOfInterest: '88 Oak Ave',
    lastContact: '15 mins ago',
    assignedTo: 'Michael T.',
    notes: 'Requested virtual walkthrough video before weekend open house.'
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'list-1',
    address: '124 Maple St.',
    title: 'Modern Architectural Residence',
    price: 1350000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3400,
    type: 'Single Family',
    status: 'at_risk',
    daysOnMarket: 52,
    clientName: 'Richard & Martha Vance',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    aiRecommendation: {
      type: 'price_reduction',
      message: 'Seller reported dissatisfaction with foot traffic. AI recommends immediate communication and a 3% reduction ($40,500) to match median neighborhood velocity.',
      suggestedPrice: 1309500
    }
  },
  {
    id: 'list-2',
    address: 'Unit 4B, The Vista',
    title: 'Luxury Waterfront Loft',
    price: 920000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1850,
    type: 'Condo',
    status: 'active',
    daysOnMarket: 14,
    clientName: 'Vista Developments LLC',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    aiRecommendation: {
      type: 'high_demand',
      message: 'High inquiry rate! 3 pre-approved buyers match this exact floor plan. Schedule open house this Saturday.'
    }
  },
  {
    id: 'list-3',
    address: '88 Oak Ave',
    title: 'Classic Colonial Estate with Pool',
    price: 1780000,
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4800,
    type: 'Single Family',
    status: 'active',
    daysOnMarket: 48,
    clientName: 'The Harrison Trust',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    aiRecommendation: {
      type: 'price_reduction',
      message: 'Active for 48 days with below-average engagement. AI suggested a price adjustment to $1,725,000 based on recent comparable closed sales.',
      suggestedPrice: 1725000
    }
  },
  {
    id: 'list-4',
    address: '452 Oak Lane',
    title: 'Serene Suburb Cottage',
    price: 890000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    type: 'Single Family',
    status: 'pending',
    daysOnMarket: 21,
    clientName: 'David & Lisa Miller',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'list-5',
    address: 'Penthouse 1, The Monarch',
    title: 'Skyline Panoramic Luxury Penthouse',
    price: 3450000,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3900,
    type: 'Condo',
    status: 'active',
    daysOnMarket: 8,
    clientName: 'Monarch Real Estate Group',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    aiRecommendation: {
      type: 'description_boost',
      message: 'Optimize listing text for international luxury buyers. Emphasize smart home integration and private elevator access.'
    }
  },
  {
    id: 'list-6',
    address: '782 Pine Ave',
    title: 'Contemporary Studio Sanctuary',
    price: 1150000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    type: 'Single Family',
    status: 'sold',
    daysOnMarket: 19,
    clientName: 'Steven & Koji Tanaka',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
  }
];

export const MOCK_INSIGHTS: InsightCard[] = [
  {
    id: 'insight-1',
    title: '3 buyers ready for visit',
    description: 'High-intent prospects have been pre-approved and match your latest downtown listings.',
    actionText: 'Schedule Tours',
    icon: 'directions_car',
    theme: 'primary',
    targetView: 'pipeline',
    aiPrompt: 'Generate a coordinated tour itinerary for Sarah Jenkins, Michael Chang, and Jonathan Sterling for Downtown listings.'
  },
  {
    id: 'insight-2',
    title: '2 properties need price adjustment',
    description: 'Listings have been active for 45+ days with below-average engagement. AI recommends a 3% reduction.',
    actionText: 'Review Pricing',
    icon: 'price_change',
    theme: 'error',
    targetView: 'listings',
    aiPrompt: 'Analyze market comps for 124 Maple St and 88 Oak Ave and generate a professional price adjustment proposal for the sellers.'
  },
  {
    id: 'insight-3',
    title: '5 leads waiting for follow-up',
    description: 'Recent website inquiries from the weekend campaign are untouched. Quick replies boost conversion by 40%.',
    actionText: 'Contact Leads',
    icon: 'contact_mail',
    theme: 'tertiary',
    targetView: 'pipeline',
    aiPrompt: 'Draft high-converting personalized WhatsApp follow-up messages for our 5 untouched weekend inquiry leads.'
  },
  {
    id: 'insight-4',
    title: '1 hot listing at risk',
    description: 'The seller for 124 Maple St. has reported dissatisfaction. Immediate communication is advised to retain exclusivity.',
    actionText: 'Take Action',
    icon: 'warning',
    theme: 'error',
    targetView: 'listings',
    aiPrompt: 'Generate a retention strategy and market activity report email for Richard & Martha Vance regarding 124 Maple St.'
  }
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'deal',
    title: 'Sarah Jenkins closed a deal on 124 Maple St.',
    timestamp: '10 mins ago',
    icon: 'check_circle',
    colorClass: 'text-on-secondary-container',
    bgClass: 'bg-secondary-container'
  },
  {
    id: 'act-2',
    type: 'viewing',
    title: 'New viewing scheduled for Unit 4B, The Vista.',
    timestamp: '45 mins ago',
    icon: 'event_available',
    colorClass: 'text-primary',
    bgClass: 'bg-primary-fixed'
  },
  {
    id: 'act-3',
    type: 'ai_insight',
    title: 'AI suggested a price adjustment for 88 Oak Ave based on market trends.',
    timestamp: '2 hours ago',
    icon: 'auto_awesome',
    colorClass: 'text-[#3730A3]',
    bgClass: 'bg-[#E0E7FF]',
    actions: [
      { label: 'Review', actionType: 'review_price', targetId: 'list-3' },
      { label: 'Dismiss', actionType: 'dismiss', targetId: 'act-3' }
    ]
  },
  {
    id: 'act-4',
    type: 'lead',
    title: 'New lead assigned to Michael T.',
    timestamp: '3 hours ago',
    icon: 'person_add',
    colorClass: 'text-secondary',
    bgClass: 'bg-surface-container-high'
  }
];

export const INITIAL_AI_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'ai' as const,
    text: "Welcome to your AI Sales Intelligence Command Center. I'm actively analyzing your 156 portfolio listings and 24 active leads today.",
    timestamp: '08:30 AM',
    actionTitle: 'Prioritized Focus for Today',
    actionContent: '• Schedule 3 high-intent buyer viewings in Downtown.\n• Send price adjustment report to Richard & Martha Vance for 124 Maple St.\n• Send WhatsApp check-in to Carlos Rivera on the 452 Oak Lane counter-offer.'
  }
];
