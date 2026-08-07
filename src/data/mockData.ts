import { Lead, Listing, ActivityItem, InsightCard, SyncEvent, SourceConnection } from '../types';

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Jenkins',
    phone: '+1 (555) 234-5678',
    email: 'sarah.j@techcorp.com',
    intent: 'High Intent',
    status: 'new',
    inquiry: 'Busca 3 recámaras en Downtown',
    budget: '$1,200,000 - $1,500,000',
    preferredLocation: 'Downtown / Malecón',
    propertyOfInterest: '124 Maple St.',
    lastContact: 'hace 10 min',
    assignedTo: 'Michael T.',
    notes: 'Pre-aprobada con Chase Bank. Necesita mudarse antes de que inicien las clases en septiembre.',
    criteria: [
      { criterionId: 'financing', status: 'CUMPLE', note: 'Pre-aprobada con Chase Bank' },
      { criterionId: 'budget', status: 'CUMPLE', note: 'Rango confirmado $1.2M–$1.5M' },
      { criterionId: 'engagement', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Solicitud inicial, aún sin visita agendada' },
      { criterionId: 'timeline', status: 'CUMPLE', note: 'Necesita cerrar antes de inicio de clases en septiembre' },
      { criterionId: 'responsiveness', status: 'CUMPLE', note: 'Respondió hace 10 minutos' },
      { criterionId: 'fit', status: 'CUMPLE_CON_OBSERVACIONES', note: '124 Maple St. coincide en 3 de 4 criterios' },
    ],
    source: 'hubspot'
  },
  {
    id: 'lead-2',
    name: 'Michael Chang',
    phone: '+1 (555) 876-5432',
    email: 'm.chang@investments.io',
    intent: 'High Intent',
    status: 'new',
    inquiry: 'Consulta de propiedad de inversión',
    budget: '$2,500,000+',
    preferredLocation: 'Distrito Comercial Metro',
    propertyOfInterest: 'Unit 4B, The Vista',
    lastContact: 'hace 2 horas',
    assignedTo: 'Elena R.',
    notes: 'Busca unidades multifamiliares o condominios de lujo con cap rate 7%+ y flexibilidad de renta.',
    criteria: [
      { criterionId: 'financing', status: 'SIN_INFORMACION', note: 'Financiamiento de inversión sin confirmar' },
      { criterionId: 'budget', status: 'CUMPLE', note: 'Presupuesto de inversión $2.5M+' },
      { criterionId: 'engagement', status: 'NO_CUMPLE', note: 'Sin visitas ni recorridos aún' },
      { criterionId: 'timeline', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Busca cap rate 7%+, sin fecha límite fija' },
      { criterionId: 'responsiveness', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Última respuesta hace 2 horas' },
      { criterionId: 'fit', status: 'CUMPLE', note: 'Unit 4B cumple flexibilidad de renta' },
    ],
    source: 'hubspot'
  },
  {
    id: 'lead-3',
    name: 'The Rivera Family',
    phone: '+1 (555) 345-6789',
    email: 'carlos.rivera@gmail.com',
    intent: 'High Intent',
    status: 'negotiation',
    inquiry: '452 Oak Lane - Contraoferta enviada',
    budget: '$890,000',
    preferredLocation: 'Suburbios Oak Ridge',
    propertyOfInterest: '452 Oak Lane',
    lastContact: 'Ayer',
    assignedTo: 'Elena R.',
    notes: 'Envió contraoferta de $875k. Esperando respuesta del vendedor sobre la contingencia de inspección de techo.',
    criteria: [
      { criterionId: 'financing', status: 'CUMPLE', note: 'Financiamiento verificado para la oferta' },
      { criterionId: 'budget', status: 'CUMPLE', note: 'Contraoferta enviada en $875k' },
      { criterionId: 'engagement', status: 'CUMPLE', note: 'Múltiples visitas realizadas' },
      { criterionId: 'timeline', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Pendiente resolución de contingencia de techo' },
      { criterionId: 'responsiveness', status: 'CUMPLE', note: 'En contacto activo con el vendedor' },
      { criterionId: 'fit', status: 'CUMPLE', note: 'Propiedad exacta bajo negociación' },
    ],
    source: 'manual'
  },
  {
    id: 'lead-4',
    name: 'Dr. Amanda Vance',
    phone: '+1 (555) 901-2345',
    email: 'vance.md@hospital.org',
    intent: 'VIP',
    status: 'negotiation',
    inquiry: 'Solicitó recorridos de suite penthouse',
    budget: '$3,200,000',
    preferredLocation: 'Skyline Heights',
    propertyOfInterest: 'Penthouse 1, The Monarch',
    lastContact: 'hace 3 horas',
    assignedTo: 'Michael T.',
    notes: 'Requiere estacionamiento privado y servicio de concierge 24/7.',
    criteria: [
      { criterionId: 'financing', status: 'CUMPLE', note: 'Cliente VIP, fondos verificados' },
      { criterionId: 'budget', status: 'CUMPLE', note: 'Presupuesto confirmado $3.2M' },
      { criterionId: 'engagement', status: 'CUMPLE', note: 'Recorridos privados ya realizados' },
      { criterionId: 'timeline', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Sin fecha límite estricta' },
      { criterionId: 'responsiveness', status: 'CUMPLE', note: 'Responde en menos de 1 hora' },
      { criterionId: 'fit', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Pendiente confirmar concierge 24/7' },
    ],
    source: 'hubspot'
  },
  {
    id: 'lead-5',
    name: 'Marcus & Chloe Thorne',
    phone: '+1 (555) 456-7890',
    email: 'm.thorne@designstudio.com',
    intent: 'Medium Intent',
    status: 'closing',
    inquiry: 'Finalizando escrow para 782 Pine Ave',
    budget: '$1,150,000',
    preferredLocation: 'Distrito de las Artes',
    propertyOfInterest: '782 Pine Ave',
    lastContact: 'hace 4 horas',
    assignedTo: 'Elena R.',
    notes: 'Cierre de escrow agendado para el viernes. Revisión de título completada exitosamente.',
    criteria: [
      { criterionId: 'financing', status: 'CUMPLE', note: 'Crédito cerrado y fondeado' },
      { criterionId: 'budget', status: 'CUMPLE', note: 'Precio final acordado $1.15M' },
      { criterionId: 'engagement', status: 'CUMPLE', note: 'Proceso de escrow en curso' },
      { criterionId: 'timeline', status: 'CUMPLE', note: 'Cierre agendado para el viernes' },
      { criterionId: 'responsiveness', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Última respuesta hace 4 horas' },
      { criterionId: 'fit', status: 'CUMPLE', note: 'Title check completado sin observaciones' },
    ],
    source: 'manual'
  },
  {
    id: 'lead-6',
    name: 'Jonathan Sterling',
    phone: '+1 (555) 678-9012',
    email: 'j.sterling@wealthmgmt.com',
    intent: 'High Intent',
    status: 'new',
    inquiry: 'Consulta de campaña digital de fin de semana',
    budget: '$1,800,000',
    preferredLocation: 'West End Hills',
    propertyOfInterest: '88 Oak Ave',
    lastContact: 'hace 15 min',
    assignedTo: 'Michael T.',
    notes: 'Solicitó video de recorrido virtual antes de la casa abierta de fin de semana.',
    criteria: [
      { criterionId: 'financing', status: 'SIN_INFORMACION', note: 'Aún no comparte estatus de financiamiento' },
      { criterionId: 'budget', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Presupuesto declarado, sin verificar' },
      { criterionId: 'engagement', status: 'CUMPLE_CON_OBSERVACIONES', note: 'Solicitó recorrido virtual' },
      { criterionId: 'timeline', status: 'SIN_INFORMACION', note: 'Sin fecha de mudanza mencionada' },
      { criterionId: 'responsiveness', status: 'CUMPLE', note: 'Respondió hace 15 minutos' },
      { criterionId: 'fit', status: 'CUMPLE_CON_OBSERVACIONES', note: '88 Oak Ave coincide parcialmente' },
    ],
    source: 'easybroker'
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'list-1',
    address: '124 Maple St.',
    title: 'Residencia Arquitectónica Moderna',
    price: 1350000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3400,
    type: 'Single Family',
    status: 'at_risk',
    daysOnMarket: 52,
    clientName: 'Richard & Martha Vance',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    marketAvgPrice: 1309500,
    estimatedDaysToSell: 35,
    marketHealth: { price: 35, location: 80, demand: 45, velocity: 30, competition: 40, condition: 85 },
    comparables: [
      { address: '118 Maple St.', price: 1305000, pricePerSqft: 384, daysOnMarket: 22 },
      { address: '130 Birchwood Ave', price: 1290000, pricePerSqft: 379, daysOnMarket: 19 },
    ],
    source: 'easybroker',
    aiRecommendation: {
      type: 'price_reduction',
      message: 'El vendedor reportó insatisfacción con el flujo peatonal. La IA recomienda comunicación inmediata y una reducción del 3% ($40,500) para igualar la velocidad promedio del vecindario.',
      suggestedPrice: 1309500
    }
  },
  {
    id: 'list-2',
    address: 'Unit 4B, The Vista',
    title: 'Loft de Lujo frente al Mar',
    price: 920000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1850,
    type: 'Condo',
    status: 'active',
    daysOnMarket: 14,
    clientName: 'Vista Developments LLC',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    marketAvgPrice: 905000,
    estimatedDaysToSell: 10,
    marketHealth: { price: 80, location: 85, demand: 95, velocity: 88, competition: 75, condition: 80 },
    comparables: [
      { address: 'Unit 2A, The Vista', price: 895000, pricePerSqft: 465, daysOnMarket: 12 },
      { address: '210 Harbor Lofts', price: 910000, pricePerSqft: 470, daysOnMarket: 9 },
    ],
    source: 'easybroker',
    aiRecommendation: {
      type: 'high_demand',
      message: '¡Alta tasa de consultas! 3 compradores pre-aprobados coinciden exactamente con este plano. Agenda una casa abierta este sábado.'
    }
  },
  {
    id: 'list-3',
    address: '88 Oak Ave',
    title: 'Finca Colonial Clásica con Alberca',
    price: 1780000,
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4800,
    type: 'Single Family',
    status: 'active',
    daysOnMarket: 48,
    clientName: 'The Harrison Trust',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    marketAvgPrice: 1708000,
    estimatedDaysToSell: 42,
    marketHealth: { price: 40, location: 85, demand: 50, velocity: 35, competition: 45, condition: 75 },
    comparables: [
      { address: '92 Oak Ave', price: 1710000, pricePerSqft: 355, daysOnMarket: 18 },
      { address: '45 Elm St', price: 1740000, pricePerSqft: 362, daysOnMarket: 31 },
    ],
    source: 'easybroker',
    aiRecommendation: {
      type: 'price_reduction',
      message: 'Activa por 48 días con compromiso por debajo del promedio. La IA sugirió un ajuste de precio a $1,725,000 basado en cierres comparables recientes.',
      suggestedPrice: 1725000
    }
  },
  {
    id: 'list-4',
    address: '452 Oak Lane',
    title: 'Cabaña Serena de Suburbio',
    price: 890000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    type: 'Single Family',
    status: 'pending',
    daysOnMarket: 21,
    clientName: 'David & Lisa Miller',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    marketAvgPrice: 885000,
    estimatedDaysToSell: 21,
    marketHealth: { price: 82, location: 75, demand: 70, velocity: 78, competition: 65, condition: 72 },
    comparables: [
      { address: '460 Oak Lane', price: 875000, pricePerSqft: 385, daysOnMarket: 24 },
      { address: '470 Birch Ct', price: 900000, pricePerSqft: 392, daysOnMarket: 17 },
    ],
    source: 'manual'
  },
  {
    id: 'list-5',
    address: 'Penthouse 1, The Monarch',
    title: 'Penthouse de Lujo Panorámico',
    price: 3450000,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3900,
    type: 'Condo',
    status: 'active',
    daysOnMarket: 8,
    clientName: 'Monarch Real Estate Group',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    marketAvgPrice: 3400000,
    estimatedDaysToSell: 15,
    marketHealth: { price: 78, location: 95, demand: 85, velocity: 90, competition: 60, condition: 92 },
    comparables: [
      { address: 'Penthouse 2, The Monarch', price: 3380000, pricePerSqft: 880, daysOnMarket: 11 },
      { address: 'Sky Residence 88', price: 3520000, pricePerSqft: 905, daysOnMarket: 6 },
    ],
    source: 'easybroker',
    aiRecommendation: {
      type: 'description_boost',
      message: 'Optimiza el texto del anuncio para compradores de lujo internacionales. Destaca la integración de casa inteligente y el acceso a elevador privado.'
    }
  },
  {
    id: 'list-6',
    address: '782 Pine Ave',
    title: 'Santuario Estudio Contemporáneo',
    price: 1150000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    type: 'Single Family',
    status: 'sold',
    daysOnMarket: 19,
    clientName: 'Steven & Koji Tanaka',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    marketAvgPrice: 1140000,
    estimatedDaysToSell: 19,
    marketHealth: { price: 90, location: 80, demand: 82, velocity: 92, competition: 70, condition: 85 },
    comparables: [
      { address: '790 Pine Ave', price: 1135000, pricePerSqft: 545, daysOnMarket: 22 },
      { address: '12 Studio Row', price: 1165000, pricePerSqft: 550, daysOnMarket: 15 },
    ],
    source: 'manual'
  }
];

export const MOCK_INSIGHTS: InsightCard[] = [
  {
    id: 'insight-1',
    title: '3 compradores listos para visita',
    description: 'Prospectos de alta intención ya están pre-aprobados y coinciden con tus propiedades más recientes en Downtown.',
    actionText: 'Agendar Visitas',
    icon: 'directions_car',
    theme: 'primary',
    targetView: 'pipeline',
    aiPrompt: 'Genera un itinerario de recorrido coordinado para Sarah Jenkins, Michael Chang y Jonathan Sterling en propiedades de Downtown.'
  },
  {
    id: 'insight-2',
    title: '2 propiedades necesitan ajuste de precio',
    description: 'Las propiedades llevan 45+ días activas con compromiso por debajo del promedio. La IA recomienda una reducción del 3%.',
    actionText: 'Revisar Precios',
    icon: 'price_change',
    theme: 'error',
    targetView: 'listings',
    aiPrompt: 'Analiza los comparables de mercado de 124 Maple St y 88 Oak Ave y genera una propuesta profesional de ajuste de precio para los vendedores.'
  },
  {
    id: 'insight-3',
    title: '5 leads esperando seguimiento',
    description: 'Consultas recientes de la campaña de fin de semana siguen sin contactar. Respuestas rápidas aumentan la conversión un 40%.',
    actionText: 'Contactar Leads',
    icon: 'contact_mail',
    theme: 'tertiary',
    targetView: 'pipeline',
    aiPrompt: 'Redacta mensajes de seguimiento por WhatsApp, personalizados y persuasivos, para nuestros 5 leads del fin de semana que aún no han sido contactados.'
  },
  {
    id: 'insight-4',
    title: '1 propiedad destacada en riesgo',
    description: 'El vendedor de 124 Maple St. reportó insatisfacción. Se recomienda comunicación inmediata para retener la exclusividad.',
    actionText: 'Tomar Acción',
    icon: 'warning',
    theme: 'error',
    targetView: 'listings',
    aiPrompt: 'Genera una estrategia de retención y un correo de reporte de actividad de mercado para Richard & Martha Vance sobre 124 Maple St.'
  }
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'deal',
    title: 'Sarah Jenkins cerró un trato en 124 Maple St.',
    timestamp: 'hace 10 min',
    icon: 'check_circle',
    colorClass: 'text-on-secondary-container',
    bgClass: 'bg-secondary-container'
  },
  {
    id: 'act-2',
    type: 'viewing',
    title: 'Nueva visita agendada para Unit 4B, The Vista.',
    timestamp: 'hace 45 min',
    icon: 'event_available',
    colorClass: 'text-primary',
    bgClass: 'bg-primary-fixed'
  },
  {
    id: 'act-3',
    type: 'ai_insight',
    title: 'La IA sugirió un ajuste de precio para 88 Oak Ave según tendencias de mercado.',
    timestamp: 'hace 2 horas',
    icon: 'auto_awesome',
    colorClass: 'text-[#3730A3]',
    bgClass: 'bg-[#E0E7FF]',
    actions: [
      { label: 'Revisar', actionType: 'review_price', targetId: 'list-3' },
      { label: 'Descartar', actionType: 'dismiss', targetId: 'act-3' }
    ]
  },
  {
    id: 'act-4',
    type: 'lead',
    title: 'Nuevo lead asignado a Michael T.',
    timestamp: 'hace 3 horas',
    icon: 'person_add',
    colorClass: 'text-secondary',
    bgClass: 'bg-surface-container-high'
  }
];

// Powers the "Fuentes Unificadas" view — the connection status cards and the
// live-looking sync feed that make the single-pane-of-glass story concrete.
// HubSpot stays the system of record for contacts, EasyBroker for portal
// inventory; these numbers/timestamps are illustrative, not wired to real
// APIs yet.
export const SOURCE_CONNECTIONS: SourceConnection[] = [
  {
    source: 'hubspot',
    role: 'CRM principal — contactos y pipeline',
    status: 'connected',
    recordCount: 184,
    recordLabel: 'contactos sincronizados',
    lastSync: 'hace 8 min'
  },
  {
    source: 'easybroker',
    role: 'Inventario y distribución a portales',
    status: 'connected',
    recordCount: 156,
    recordLabel: 'propiedades sincronizadas',
    lastSync: 'hace 2 min'
  },
  {
    source: 'manual',
    role: 'Creado directamente en EstatePro',
    status: 'connected',
    recordCount: 4,
    recordLabel: 'registros nativos',
    lastSync: 'en tiempo real'
  }
];

export const SYNC_EVENTS: SyncEvent[] = [
  { id: 'sync-1', source: 'easybroker', message: '3 propiedades actualizaron precio en EasyBroker', timestamp: 'hace 2 min' },
  { id: 'sync-2', source: 'hubspot', message: 'Nuevo lead capturado por formulario web', timestamp: 'hace 8 min' },
  { id: 'sync-3', source: 'easybroker', message: 'Nueva propiedad importada: Penthouse 1, The Monarch', timestamp: 'hace 25 min' },
  { id: 'sync-4', source: 'hubspot', message: 'Sarah Jenkins actualizó su estatus de crédito a pre-aprobado', timestamp: 'hace 1 hora' },
  { id: 'sync-5', source: 'easybroker', message: 'Sincronización de inventario completa — 156 propiedades', timestamp: 'hace 3 horas' },
  { id: 'sync-6', source: 'hubspot', message: 'Secuencia de nutrición activada para 5 contactos', timestamp: 'hace 4 horas' }
];

export const INITIAL_AI_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'ai' as const,
    text: 'Bienvenido a tu Centro de Comando de Sales Intelligence. Estoy analizando activamente tus 156 propiedades y 24 leads activos hoy.',
    timestamp: '08:30 AM',
    actionTitle: 'Enfoque Prioritario para Hoy',
    actionContent: '• Agenda 3 visitas de compradores de alta intención en Downtown.\n• Envía el reporte de ajuste de precio a Richard & Martha Vance para 124 Maple St.\n• Envía un seguimiento por WhatsApp a Carlos Rivera sobre la contraoferta de 452 Oak Lane.'
  }
];
