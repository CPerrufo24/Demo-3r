import React, { createContext, useCallback, useContext, useState } from 'react';

export type Language = 'es' | 'en';

const DICT: Record<string, { es: string; en: string }> = {
  // Nav
  'nav.overview': { es: 'Resumen', en: 'Overview' },
  'nav.pipeline': { es: 'Pipeline', en: 'Pipeline' },
  'nav.listings': { es: 'Propiedades', en: 'Listings' },
  'nav.clients': { es: 'Clientes', en: 'Clients' },
  'nav.sources': { es: 'Fuentes Unificadas', en: 'Unified Sources' },
  'nav.reports': { es: 'Reportes', en: 'Reports' },

  // Sidebar
  'sidebar.tagline': { es: '3R Connect', en: '3R Connect' },
  'sidebar.aiInsight': { es: 'Asistente IA', en: 'AI Insight' },
  'sidebar.settings': { es: 'Configuración', en: 'Settings' },
  'sidebar.settingsAlert': { es: 'Configuración: preferencias, parámetros del modelo de IA y herramientas de integración de API.', en: 'Settings: Custom preferences, AI model parameters, and API integration tools.' },
  'sidebar.support': { es: 'Ayuda', en: 'Support' },
  'sidebar.supportAlert': { es: 'Soporte: la línea de ayuda y concierge IA de 3R Connect está activa 24/7.', en: 'Support: 24/7 3R Connect AI Concierge & Agent Helpline is active.' },
  'sidebar.logout': { es: 'Cerrar sesión', en: 'Log out' },

  // Navbar
  'navbar.searchPlaceholder': { es: 'Buscar leads, propiedades o clientes...', en: 'Search leads, listings, or clients...' },
  'navbar.clearSearch': { es: 'Limpiar búsqueda', en: 'Clear search' },
  'navbar.notifications': { es: 'Notificaciones y resúmenes', en: 'Notifications & Briefs' },
  'navbar.aiToggle': { es: 'Abrir Sales Intelligence', en: 'Toggle Sales Intelligence Panel' },
  'navbar.profile': { es: 'Ver perfil del asesor', en: 'View Agent Profile' },
  'navbar.profileAlert': { es: 'Perfil: Elena Rostova (Vicepresidenta Senior — 3R Connect)', en: 'Agent Profile: Elena Rostova (Senior Vice President - 3R Connect)' },
  'navbar.language': { es: 'Idioma', en: 'Language' },

  // Login
  'login.title': { es: 'Bienvenido de nuevo', en: 'Welcome back' },
  'login.subtitle': { es: 'Inicia sesión para continuar a tu panel', en: 'Sign in to continue to your dashboard' },
  'login.email': { es: 'Correo electrónico', en: 'Email' },
  'login.emailPlaceholder': { es: 'tu@3rconnect.mx', en: 'you@3rconnect.mx' },
  'login.password': { es: 'Contraseña', en: 'Password' },
  'login.passwordPlaceholder': { es: '••••••••', en: '••••••••' },
  'login.remember': { es: 'Recordarme', en: 'Remember me' },
  'login.forgot': { es: '¿Olvidaste tu contraseña?', en: 'Forgot password?' },
  'login.submit': { es: 'Iniciar sesión', en: 'Sign in' },
  'login.demoNote': { es: 'Demo — cualquier correo y contraseña funcionan', en: 'Demo — any email and password work' },

  // Overview
  'overview.title': { es: 'Brief Matutino', en: 'Morning Brief' },
  'overview.subtitle': { es: 'Esto es lo que está pasando hoy en tu portafolio inmobiliario.', en: "Here's what's happening with your real estate portfolio today." },
  'overview.exportReport': { es: 'Exportar Reporte', en: 'Export Report' },
  'overview.exportAlert': { es: 'Exportando el Brief Matutino en PDF a tu escritorio...', en: 'Exporting Morning Brief PDF Report to your desktop...' },
  'overview.newListing': { es: 'Nueva Propiedad', en: 'New Listing' },
  'overview.metricLeads': { es: 'Leads Generados', en: 'Leads Generated' },
  'overview.vsYesterday': { es: 'vs. ayer', en: 'vs. yesterday' },
  'overview.metricAppointments': { es: 'Citas Totales', en: 'Total Appointments' },
  'overview.appointmentsAlert': { es: 'Abriendo agenda de citas: 12 visitas agendadas en 5 propiedades esta semana.', en: 'Opening appointments schedule: 12 viewings booked across 5 listings this week.' },
  'overview.scheduledThisWeek': { es: 'agendadas esta semana', en: 'scheduled this week' },
  'overview.metricActiveListings': { es: 'Propiedades Activas', en: 'Active Listings' },
  'overview.totalPortfolioValue': { es: 'Valor total del portafolio:', en: 'Total portfolio value:' },
  'overview.metricConversion': { es: 'Tasa de Conversión', en: 'Conversion Rate' },
  'overview.leadToCloseRatio': { es: 'Relación lead a cierre', en: 'Lead to close ratio' },
  'overview.recentActivity': { es: 'Actividad Reciente', en: 'Recent Activity' },
  'overview.viewAll': { es: 'Ver Todo', en: 'View All' },

  // Pipeline
  'pipeline.title': { es: 'Pipeline Activo', en: 'Active Pipeline' },
  'pipeline.subtitle': { es: 'Revisa tus leads prioritarios. Haz clic en una tarjeta para ver detalles o arrástrala para cambiar de etapa.', en: 'Review your high-priority leads. Click any card to inspect details or drag to change stage.' },
  'pipeline.addLead': { es: 'Agregar Lead', en: 'Add Lead' },
  'pipeline.columnNew': { es: 'Nuevos Leads', en: 'New Leads' },
  'pipeline.columnNegotiation': { es: 'En Negociación', en: 'In Negotiation' },
  'pipeline.columnClosing': { es: 'Cerrando', en: 'Closing' },
  'pipeline.noLeads': { es: 'Sin leads en esta etapa', en: 'No leads in this stage' },
  'pipeline.sourceLabel': { es: 'Fuente:', en: 'Source:' },
  'pipeline.sourceAll': { es: 'Todas', en: 'All' },
  'pipeline.aiFollowUp': { es: 'Generar seguimiento con IA', en: 'Generate AI Follow-up' },
  'pipeline.advanceStage': { es: 'Avanzar etapa', en: 'Advance Stage' },
  'pipeline.leadScoreTitle': { es: 'Lead Score:', en: 'Lead Score:' },
  'intent.High Intent': { es: 'Alta Intención', en: 'High Intent' },
  'intent.Medium Intent': { es: 'Intención Media', en: 'Medium Intent' },
  'intent.Low Intent': { es: 'Baja Intención', en: 'Low Intent' },
  'intent.VIP': { es: 'VIP', en: 'VIP' },
  'leadStatus.new': { es: 'Nuevo', en: 'New' },
  'leadStatus.negotiation': { es: 'En Negociación', en: 'Negotiation' },
  'leadStatus.closing': { es: 'Cerrando', en: 'Closing' },
  'leadStatus.won': { es: 'Ganado', en: 'Won' },
  'leadStatus.lost': { es: 'Perdido', en: 'Lost' },

  // Listings
  'listings.title': { es: 'Propiedades', en: 'Property Listings' },
  'listings.subtitle': { es: 'Gestiona tu portafolio, estrategias de precio e inteligencia de mercado con IA.', en: 'Manage your real estate portfolio, pricing strategies, and AI valuation insights.' },
  'listings.aiAudit': { es: 'Auditoría IA del Portafolio', en: 'AI Portfolio Audit' },
  'listings.newListing': { es: 'Nueva Propiedad', en: 'New Listing' },
  'listings.filterType': { es: 'Tipo:', en: 'Type:' },
  'listings.filterStatus': { es: 'Estado:', en: 'Status:' },
  'listings.filterSource': { es: 'Fuente:', en: 'Source:' },
  'listings.sourceAll': { es: 'Todas', en: 'All' },
  'listings.typeAll': { es: 'Todos los Tipos', en: 'All Types' },
  'listings.typeSingleFamily': { es: 'Casa Unifamiliar', en: 'Single Family' },
  'listings.typeCondo': { es: 'Condominio', en: 'Condo' },
  'listings.typeMultiFamily': { es: 'Multifamiliar', en: 'Multi-Family' },
  'listings.typeCommercial': { es: 'Comercial', en: 'Commercial' },
  'listings.statusAll': { es: 'Todos los Estados', en: 'All Statuses' },
  'listings.statusActive': { es: 'Activa', en: 'Active' },
  'listings.statusAtRisk': { es: 'En Riesgo / Requiere Atención', en: 'At Risk / Needs Review' },
  'listings.statusPending': { es: 'Pendiente', en: 'Pending' },
  'listings.statusSold': { es: 'Vendida', en: 'Sold' },
  'listings.beds': { es: 'Rec', en: 'Beds' },
  'listings.baths': { es: 'Baños', en: 'Baths' },
  'listings.sqft': { es: 'pies²', en: 'SqFt' },
  'listings.dom': { es: 'días en mercado', en: 'DOM' },
  'listings.seller': { es: 'Vendedor:', en: 'Seller:' },
  'listings.aiInsightLabel': { es: 'Insight IA de Precio y Marketing', en: 'AI Pricing & Marketing Insight' },
  'listings.applyPrice': { es: 'Aplicar Precio:', en: 'Apply Price:' },
  'listings.inspectAiPlan': { es: 'Ver Plan IA', en: 'Inspect AI Plan' },
  'listings.marketIntelligence': { es: 'Inteligencia de Mercado', en: 'Market Intelligence' },
  'listings.aiCopywriter': { es: 'Redacción IA', en: 'AI Copywriter' },
  'listings.priceUpdatedAlert': { es: '¡Precio actualizado exitosamente a $%s!', en: 'Price updated successfully to $%s!' },

  // Clients
  'clients.title': { es: 'Directorio de Clientes', en: 'Client Directory' },
  'clients.subtitle': { es: 'Gestiona historiales de relación, perfiles de preferencia y comunicaciones con IA.', en: 'Manage relationship histories, preference profiles, and AI communications.' },
  'clients.aiAudit': { es: 'Auditoría IA de Contacto', en: 'AI Touchpoint Audit' },
  'clients.roleLabel': { es: 'Rol:', en: 'Role:' },
  'clients.roleAll': { es: 'Todos los Clientes', en: 'All Clients' },
  'clients.roleBuyer': { es: 'Compradores', en: 'Buyers' },
  'clients.roleSeller': { es: 'Vendedores', en: 'Sellers' },
  'clients.roleInvestor': { es: 'Inversionistas', en: 'Investors' },
  'clients.searchPlaceholder': { es: 'Buscar por nombre o criterio...', en: 'Search name or criteria...' },
  'clients.colName': { es: 'Nombre y Contacto', en: 'Client Name & Contact' },
  'clients.colRole': { es: 'Rol y Estado', en: 'Role & Status' },
  'clients.colInterest': { es: 'Criterio / Propiedad Actual', en: 'Criteria / Current Property' },
  'clients.colAgent': { es: 'Asesor Asignado', en: 'Assigned Agent' },
  'clients.colLastContact': { es: 'Último Contacto', en: 'Last Contact' },
  'clients.colActions': { es: 'Acciones IA', en: 'AI Actions' },
  'clients.whatsapp': { es: 'WhatsApp', en: 'WhatsApp' },
  'clients.profile': { es: 'Perfil', en: 'Profile' },

  // Reports
  'reports.title': { es: 'Analítica Ejecutiva y Reportes', en: 'Executive Analytics & Reports' },
  'reports.subtitle': { es: 'Valuación de portafolio en tiempo real, métricas de conversión y comparativos de velocidad de mercado.', en: 'Real-time portfolio valuation, lead conversion metrics, and market velocity benchmarks.' },
  'reports.generateForecast': { es: 'Generar Pronóstico IA', en: 'Generate AI Forecast' },
  'reports.totalPortfolioValue': { es: 'Valor Total del Portafolio', en: 'Total Portfolio Value' },
  'reports.vsPrevQuarter': { es: '+8.4% vs. trimestre anterior', en: '+8.4% vs. previous quarter' },
  'reports.avgDom': { es: 'Días Promedio en Mercado', en: 'Average Days on Market (DOM)' },
  'reports.days': { es: 'días', en: 'Days' },
  'reports.fasterThanRegional': { es: '3.2 días más rápido que el promedio regional', en: '3.2 days faster than regional average' },
  'reports.leadConversionVelocity': { es: 'Velocidad de Conversión de Leads', en: 'Lead Conversion Velocity' },
  'reports.avgDaysToClose': { es: 'Promedio de 18 días de consulta a cierre de escrow', en: 'Average 18 days from inquiry to closing escrow' },
  'reports.monthlySales': { es: 'Volumen de Ventas Mensual ($M)', en: 'Monthly Sales Volume ($M)' },
  'reports.closedTransactionValue': { es: 'Valor de transacciones cerradas en los últimos 6 meses', en: 'Closed transaction value over last 6 months' },
  'reports.recordGrowth': { es: 'Crecimiento Récord Q3', en: 'Q3 Record Growth' },
  'reports.leadStageDistribution': { es: 'Distribución de Leads por Etapa', en: 'Lead Stage Distribution' },
  'reports.currentPipelineVolume': { es: 'Volumen actual del pipeline por estado', en: 'Current active pipeline volume by status' },
  'reports.totalLeads': { es: 'Leads Totales', en: 'Total Leads' },

  // Sales Intelligence
  'salesIntel.title': { es: 'Sales Intelligence', en: 'Sales Intelligence' },
  'salesIntel.contextPrefix': { es: 'Contexto:', en: 'Context:' },
  'salesIntel.close': { es: 'Cerrar panel de IA', en: 'Close AI Panel' },
  'salesIntel.actionListTitle': { es: 'Lista de Acciones Prioritarias', en: 'Prioritized Action List' },
  'salesIntel.action1Title': { es: 'Generar Seguimiento por WhatsApp', en: 'Generate WhatsApp Follow-up' },
  'salesIntel.action1Desc': { es: 'Redactar un mensaje personalizado', en: 'Draft a personalized message' },
  'salesIntel.action2Title': { es: 'Preparar Briefing de Visita', en: 'Prepare Visit Briefing' },
  'salesIntel.action2Desc': { es: 'Compilar detalles de la propiedad', en: 'Compile property details' },
  'salesIntel.action3Title': { es: 'Comparar Precios de Mercado', en: 'Compare Market Comps' },
  'salesIntel.action3Desc': { es: 'Analizar propiedades similares', en: 'Analyze similar listings' },
  'salesIntel.action4Title': { es: 'Redactar Descripción de Propiedad', en: 'Draft Property Description' },
  'salesIntel.action4Desc': { es: 'Optimizar el texto del anuncio', en: 'Optimize listing text' },
  'salesIntel.streamTitle': { es: 'Flujo de Análisis IA', en: 'AI Analysis Stream' },
  'salesIntel.clearChat': { es: 'Limpiar Chat', en: 'Clear Chat' },
  'salesIntel.aiName': { es: 'Gemini Real Estate AI', en: 'Gemini Real Estate AI' },
  'salesIntel.copy': { es: 'Copiar', en: 'Copy' },
  'salesIntel.copied': { es: 'Copiado', en: 'Copied' },
  'salesIntel.analyzing': { es: 'Analizando datos del portafolio y redactando inteligencia estratégica...', en: 'Analyzing portfolio data and drafting strategic intelligence...' },
  'salesIntel.inputPlaceholder': { es: 'Pide a la IA que analice una propiedad o lead...', en: 'Ask AI to analyze a property or lead...' },
  'salesIntel.generateReport': { es: 'Generar Reporte', en: 'Generate Report' },
  'salesIntel.summarizePipeline': { es: 'Resumir Pipeline', en: 'Summarize Pipeline' },

  // New Listing Modal
  'newListing.title': { es: 'Agregar Nueva Propiedad', en: 'Add New Property Listing' },
  'newListing.subtitle': { es: 'Ingresa los detalles del inventario o usa asistencia de IA', en: 'Enter property inventory details or use AI assistance' },
  'newListing.address': { es: 'Dirección de la Propiedad *', en: 'Property Address *' },
  'newListing.addressPlaceholder': { es: 'ej. Av. Reforma 550, Depto A', en: 'e.g. 550 Park Ave, Penthouse A' },
  'newListing.propTitle': { es: 'Título de la Propiedad *', en: 'Property Title *' },
  'newListing.propTitlePlaceholder': { es: 'ej. Penthouse Moderno con Vista', en: 'e.g. Modern Skyline Penthouse' },
  'newListing.price': { es: 'Precio de Venta ($) *', en: 'Listing Price ($) *' },
  'newListing.propType': { es: 'Tipo de Propiedad', en: 'Property Type' },
  'newListing.sqft': { es: 'Pies Cuadrados', en: 'Square Feet' },
  'newListing.bedrooms': { es: 'Recámaras', en: 'Bedrooms' },
  'newListing.bathrooms': { es: 'Baños', en: 'Bathrooms' },
  'newListing.sellerName': { es: 'Nombre del Vendedor / Cliente', en: 'Seller / Client Name' },
  'newListing.sellerPlaceholder': { es: 'ej. Ricardo Pérez', en: 'e.g. Richard Vance' },
  'newListing.description': { es: 'Descripción de la Propiedad', en: 'Property Description' },
  'newListing.aiWrite': { es: 'Redactar Descripción con IA', en: 'AI Auto-Write Description' },
  'newListing.descriptionPlaceholder': { es: "Haz clic en 'Redactar Descripción con IA' o escribe tu propio texto...", en: "Click 'AI Auto-Write Description' above or enter custom property copy..." },
  'newListing.cancel': { es: 'Cancelar', en: 'Cancel' },
  'newListing.publish': { es: 'Publicar Propiedad', en: 'Publish Listing' },
  'newListing.missingFieldsAlert': { es: 'Por favor ingresa al menos la dirección y el título de la propiedad primero.', en: 'Please enter at least the property address and title first.' },
  'newListing.defaultTitle': { es: 'Propiedad Residencial de Lujo', en: 'Luxury Residential Property' },
  'newListing.defaultSeller': { es: 'Fideicomiso de Clientes 3R Connect', en: '3R Connect Client Trust' },

  // Lead Detail Modal
  'leadDetail.score': { es: 'Lead Score', en: 'Lead Score' },
  'leadDetail.currentStage': { es: 'Etapa Actual', en: 'Current Stage' },
  'leadDetail.assignedAgent': { es: 'Asesor Asignado', en: 'Assigned Agent' },
  'leadDetail.targetBudget': { es: 'Presupuesto Objetivo', en: 'Target Budget' },
  'leadDetail.preferredArea': { es: 'Zona Preferida', en: 'Preferred Area' },
  'leadDetail.inquiry': { es: 'Consulta / Propiedad de Interés', en: 'Inquiry / Property of Interest' },
  'leadDetail.notes': { es: 'Notas y Calificación del Asesor', en: 'Agent Notes & Qualifications' },
  'leadDetail.aiTalkingPoints': { es: 'Puntos Clave Estratégicos IA', en: 'AI Strategic Talking Points' },
  'leadDetail.openInAi': { es: 'Abrir en Panel IA', en: 'Open in AI Panel' },
  'leadDetail.talkingPointsBody': { es: 'Comprador precalificado con alta urgencia. Prioriza visitas en las próximas 48 horas.\nEnfócate en la cercanía al malecón y la calificación de la zona escolar durante el recorrido.', en: 'Pre-qualified buyer with high urgency. Prioritize viewings within the next 48 hours.\nFocus on waterfront proximity and school district rating during property tour.' },
  'leadDetail.whatsappCheckin': { es: 'Seguimiento por WhatsApp', en: 'WhatsApp Check-in' },
  'leadDetail.closeDetails': { es: 'Cerrar Detalles', en: 'Close Details' },

  // Property Intelligence Modal
  'propertyIntel.title': { es: 'Inteligencia de Propiedad', en: 'Property Intelligence' },

  // Notifications popover
  'notifications.title': { es: 'Notificaciones y Resúmenes', en: 'Notifications & Briefs' },
  'notifications.markAllRead': { es: 'Marcar todo como leído', en: 'Mark all read' },
  'notifications.tourTitle': { es: '3 Compradores Listos para Visita', en: '3 Buyers Ready for Tour' },
  'notifications.tourDesc': { es: 'Sarah Jenkins y Michael Chang solicitaron visitas el fin de semana.', en: 'Sarah Jenkins and Michael Chang requested weekend viewings.' },
  'notifications.priceTitle': { es: 'Ajuste de Precio Recomendado', en: 'Price Adjustment Recommended' },
  'notifications.priceDesc': { es: '88 Oak Ave lleva 48 días activa. La IA sugiere un ajuste del 3%.', en: 'Oak Ave has been active for 48 days. AI suggested a 3% adjustment.' },
  'notifications.riskTitle': { es: '1 Propiedad Destacada en Riesgo', en: '1 Hot Listing at Risk' },
  'notifications.riskDesc': { es: 'El vendedor de 124 Maple St reportó insatisfacción con el flujo peatonal.', en: '124 Maple St seller reported dissatisfaction with foot traffic.' },

  // App-level
  'app.listingCreatedAlert': { es: 'Propiedad "%s" en %s creada exitosamente!', en: 'Listing "%s" at %s created successfully!' },

  // Import/Export CRM
  'importCrm.cta': { es: 'Migrar desde tu CRM actual', en: 'Migrate from your current CRM' },
  'importCrm.ctaDesc': { es: 'Exporta e importa tus datos desde HubSpot, EasyBroker o cualquier otro sistema en minutos.', en: 'Export and import your data from HubSpot, EasyBroker, or any other system in minutes.' },
  'importCrm.title': { es: 'Migrar / Exportar desde tu CRM', en: 'Migrate / Export from your CRM' },
  'importCrm.step1Title': { es: '¿Desde qué sistema quieres importar?', en: 'Which system do you want to import from?' },
  'importCrm.step1Desc': { es: 'Selecciona la plataforma de origen. EstatePro lee su exportación estándar (CSV/API) y mapea los campos automáticamente.', en: "Select the source platform. EstatePro reads its standard export (CSV/API) and maps fields automatically." },
  'importCrm.otherPlaceholder': { es: 'Nombre de tu CRM actual', en: 'Name of your current CRM' },
  'importCrm.next': { es: 'Continuar', en: 'Continue' },
  'importCrm.back': { es: 'Atrás', en: 'Back' },
  'importCrm.step2Title': { es: 'Exportando e importando datos...', en: 'Exporting and importing data...' },
  'importCrm.step2Desc': { es: 'Conectando con %s, mapeando campos y validando duplicados.', en: 'Connecting to %s, mapping fields, and validating duplicates.' },
  'importCrm.step3Title': { es: '¡Migración completada!', en: 'Migration complete!' },
  'importCrm.step3Desc': { es: 'Tus registros de %s ya están disponibles en EstatePro, listos para trabajarse desde un solo lugar.', en: 'Your records from %s are now available in EstatePro, ready to work from a single place.' },
  'importCrm.finish': { es: 'Ir a Fuentes Unificadas', en: 'Go to Unified Sources' },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, ...args: string[]) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const t = useCallback(
    (key: string, ...args: string[]) => {
      const entry = DICT[key];
      let value = entry ? entry[language] : key;
      args.forEach((arg) => {
        value = value.replace('%s', arg);
      });
      return value;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
