-- Seed data — mirrors src/data/mockData.ts so the database and the on-screen
-- demo tell the exact same story to whoever is watching.

INSERT INTO agents (id, full_name, email) VALUES
    ('agent-michael-t', 'Michael T.', 'michael.t@eliterealty.com'),
    ('agent-elena-r', 'Elena R.', 'elena.r@eliterealty.com');

INSERT INTO leads (id, name, phone, email, intent, status, inquiry, budget, preferred_location, property_of_interest, last_contact, assigned_to, notes, source) VALUES
    ('lead-1', 'Sarah Jenkins', '+1 (555) 234-5678', 'sarah.j@techcorp.com', 'High Intent', 'new', 'Looking for 3BR in Downtown', '$1,200,000 - $1,500,000', 'Downtown / Waterfront', '124 Maple St.', '10 mins ago', 'agent-michael-t', 'Pre-approved with Chase Bank. Needs move-in ready before September school start.', 'hubspot'),
    ('lead-2', 'Michael Chang', '+1 (555) 876-5432', 'm.chang@investments.io', 'High Intent', 'new', 'Investment Property Inquiry', '$2,500,000+', 'Metro Commercial District', 'Unit 4B, The Vista', '2 hours ago', 'agent-elena-r', 'Seeking 7%+ cap rate multi-family or luxury condo units with rental flexibility.', 'hubspot'),
    ('lead-3', 'The Rivera Family', '+1 (555) 345-6789', 'carlos.rivera@gmail.com', 'High Intent', 'negotiation', '452 Oak Lane - Counter Offer Sent', '$890,000', 'Oak Ridge Suburbs', '452 Oak Lane', 'Yesterday', 'agent-elena-r', 'Sent counter offer at $875k. Waiting for seller response on roof inspection contingency.', 'manual'),
    ('lead-4', 'Dr. Amanda Vance', '+1 (555) 901-2345', 'vance.md@hospital.org', 'VIP', 'negotiation', 'Penthouse suite viewings requested', '$3,200,000', 'Skyline Heights', 'Penthouse 1, The Monarch', '3 hours ago', 'agent-michael-t', 'Requires private parking garage and 24/7 concierge service.', 'hubspot'),
    ('lead-5', 'Marcus & Chloe Thorne', '+1 (555) 456-7890', 'm.thorne@designstudio.com', 'Medium Intent', 'closing', 'Finalizing escrow for 782 Pine Ave', '$1,150,000', 'Arts District', '782 Pine Ave', '4 hours ago', 'agent-elena-r', 'Escrow closing scheduled for Friday. Title check completed successfully.', 'manual'),
    ('lead-6', 'Jonathan Sterling', '+1 (555) 678-9012', 'j.sterling@wealthmgmt.com', 'High Intent', 'new', 'Inquiry from weekend digital campaign', '$1,800,000', 'West End Hills', '88 Oak Ave', '15 mins ago', 'agent-michael-t', 'Requested virtual walkthrough video before weekend open house.', 'easybroker');

INSERT INTO lead_criteria (lead_id, criterion_id, status, note) VALUES
    ('lead-1', 'financing',      'CUMPLE', 'Pre-aprobada con Chase Bank'),
    ('lead-1', 'budget',         'CUMPLE', 'Rango confirmado $1.2M-$1.5M'),
    ('lead-1', 'engagement',     'CUMPLE_CON_OBSERVACIONES', 'Solicitud inicial, aun sin visita agendada'),
    ('lead-1', 'timeline',       'CUMPLE', 'Necesita cerrar antes de inicio de clases en septiembre'),
    ('lead-1', 'responsiveness', 'CUMPLE', 'Respondio hace 10 minutos'),
    ('lead-1', 'fit',            'CUMPLE_CON_OBSERVACIONES', '124 Maple St. coincide en 3 de 4 criterios'),

    ('lead-2', 'financing',      'SIN_INFORMACION', 'Financiamiento de inversion sin confirmar'),
    ('lead-2', 'budget',         'CUMPLE', 'Presupuesto de inversion $2.5M+'),
    ('lead-2', 'engagement',     'NO_CUMPLE', 'Sin visitas ni recorridos aun'),
    ('lead-2', 'timeline',       'CUMPLE_CON_OBSERVACIONES', 'Busca cap rate 7%+, sin fecha limite fija'),
    ('lead-2', 'responsiveness', 'CUMPLE_CON_OBSERVACIONES', 'Ultima respuesta hace 2 horas'),
    ('lead-2', 'fit',            'CUMPLE', 'Unit 4B cumple flexibilidad de renta'),

    ('lead-3', 'financing',      'CUMPLE', 'Financiamiento verificado para la oferta'),
    ('lead-3', 'budget',         'CUMPLE', 'Contraoferta enviada en $875k'),
    ('lead-3', 'engagement',     'CUMPLE', 'Multiples visitas realizadas'),
    ('lead-3', 'timeline',       'CUMPLE_CON_OBSERVACIONES', 'Pendiente resolucion de contingencia de techo'),
    ('lead-3', 'responsiveness', 'CUMPLE', 'En contacto activo con el vendedor'),
    ('lead-3', 'fit',            'CUMPLE', 'Propiedad exacta bajo negociacion'),

    ('lead-4', 'financing',      'CUMPLE', 'Cliente VIP, fondos verificados'),
    ('lead-4', 'budget',         'CUMPLE', 'Presupuesto confirmado $3.2M'),
    ('lead-4', 'engagement',     'CUMPLE', 'Recorridos privados ya realizados'),
    ('lead-4', 'timeline',       'CUMPLE_CON_OBSERVACIONES', 'Sin fecha limite estricta'),
    ('lead-4', 'responsiveness', 'CUMPLE', 'Responde en menos de 1 hora'),
    ('lead-4', 'fit',            'CUMPLE_CON_OBSERVACIONES', 'Pendiente confirmar concierge 24/7'),

    ('lead-5', 'financing',      'CUMPLE', 'Credito cerrado y fondeado'),
    ('lead-5', 'budget',         'CUMPLE', 'Precio final acordado $1.15M'),
    ('lead-5', 'engagement',     'CUMPLE', 'Proceso de escrow en curso'),
    ('lead-5', 'timeline',       'CUMPLE', 'Cierre agendado para el viernes'),
    ('lead-5', 'responsiveness', 'CUMPLE_CON_OBSERVACIONES', 'Ultima respuesta hace 4 horas'),
    ('lead-5', 'fit',            'CUMPLE', 'Title check completado sin observaciones'),

    ('lead-6', 'financing',      'SIN_INFORMACION', 'Aun no comparte estatus de financiamiento'),
    ('lead-6', 'budget',         'CUMPLE_CON_OBSERVACIONES', 'Presupuesto declarado, sin verificar'),
    ('lead-6', 'engagement',     'CUMPLE_CON_OBSERVACIONES', 'Solicito recorrido virtual'),
    ('lead-6', 'timeline',       'SIN_INFORMACION', 'Sin fecha de mudanza mencionada'),
    ('lead-6', 'responsiveness', 'CUMPLE', 'Respondio hace 15 minutos'),
    ('lead-6', 'fit',            'CUMPLE_CON_OBSERVACIONES', '88 Oak Ave coincide parcialmente');

INSERT INTO listings (id, address, title, price, bedrooms, bathrooms, sqft, type, status, days_on_market, image_url, client_name, market_avg_price, estimated_days_to_sell, ai_recommendation_type, ai_recommendation_msg, ai_suggested_price, source) VALUES
    ('list-1', '124 Maple St.', 'Modern Architectural Residence', 1350000, 4, 3.5, 3400, 'Single Family', 'at_risk', 52, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', 'Richard & Martha Vance', 1309500, 35, 'price_reduction', 'Seller reported dissatisfaction with foot traffic. AI recommends immediate communication and a 3% reduction ($40,500) to match median neighborhood velocity.', 1309500, 'easybroker'),
    ('list-2', 'Unit 4B, The Vista', 'Luxury Waterfront Loft', 920000, 2, 2.0, 1850, 'Condo', 'active', 14, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 'Vista Developments LLC', 905000, 10, 'high_demand', 'High inquiry rate! 3 pre-approved buyers match this exact floor plan. Schedule open house this Saturday.', NULL, 'easybroker'),
    ('list-3', '88 Oak Ave', 'Classic Colonial Estate with Pool', 1780000, 5, 4.5, 4800, 'Single Family', 'active', 48, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 'The Harrison Trust', 1708000, 42, 'price_reduction', 'Active for 48 days with below-average engagement. AI suggested a price adjustment to $1,725,000 based on recent comparable closed sales.', 1725000, 'easybroker'),
    ('list-4', '452 Oak Lane', 'Serene Suburb Cottage', 890000, 3, 2.5, 2200, 'Single Family', 'pending', 21, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', 'David & Lisa Miller', 885000, 21, NULL, NULL, NULL, 'manual'),
    ('list-5', 'Penthouse 1, The Monarch', 'Skyline Panoramic Luxury Penthouse', 3450000, 3, 4.0, 3900, 'Condo', 'active', 8, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', 'Monarch Real Estate Group', 3400000, 15, 'description_boost', 'Optimize listing text for international luxury buyers. Emphasize smart home integration and private elevator access.', NULL, 'easybroker'),
    ('list-6', '782 Pine Ave', 'Contemporary Studio Sanctuary', 1150000, 3, 2.0, 2100, 'Single Family', 'sold', 19, 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', 'Steven & Koji Tanaka', 1140000, 19, NULL, NULL, NULL, 'manual');

INSERT INTO listing_market_health (listing_id, price, location, demand, velocity, competition, condition) VALUES
    ('list-1', 35, 80, 45, 30, 40, 85),
    ('list-2', 80, 85, 95, 88, 75, 80),
    ('list-3', 40, 85, 50, 35, 45, 75),
    ('list-4', 82, 75, 70, 78, 65, 72),
    ('list-5', 78, 95, 85, 90, 60, 92),
    ('list-6', 90, 80, 82, 92, 70, 85);

INSERT INTO listing_comparables (listing_id, address, price, price_per_sqft, days_on_market) VALUES
    ('list-1', '118 Maple St.', 1305000, 384, 22),
    ('list-1', '130 Birchwood Ave', 1290000, 379, 19),
    ('list-2', 'Unit 2A, The Vista', 895000, 465, 12),
    ('list-2', '210 Harbor Lofts', 910000, 470, 9),
    ('list-3', '92 Oak Ave', 1710000, 355, 18),
    ('list-3', '45 Elm St', 1740000, 362, 31),
    ('list-4', '460 Oak Lane', 875000, 385, 24),
    ('list-4', '470 Birch Ct', 900000, 392, 17),
    ('list-5', 'Penthouse 2, The Monarch', 3380000, 880, 11),
    ('list-5', 'Sky Residence 88', 3520000, 905, 6),
    ('list-6', '790 Pine Ave', 1135000, 545, 22),
    ('list-6', '12 Studio Row', 1165000, 550, 15);

INSERT INTO activities (id, type, title, subtitle, occurred_at) VALUES
    ('act-1', 'deal', 'Sarah Jenkins closed a deal on 124 Maple St.', NULL, now() - interval '10 minutes'),
    ('act-2', 'viewing', 'New viewing scheduled for Unit 4B, The Vista.', NULL, now() - interval '45 minutes'),
    ('act-3', 'ai_insight', 'AI suggested a price adjustment for 88 Oak Ave based on market trends.', NULL, now() - interval '2 hours'),
    ('act-4', 'lead', 'New lead assigned to Michael T.', NULL, now() - interval '3 hours');

INSERT INTO source_connections (source, role, status, record_count, record_label, last_sync) VALUES
    ('hubspot', 'CRM principal — contactos y pipeline', 'connected', 184, 'contactos sincronizados', 'hace 8 min'),
    ('easybroker', 'Inventario y distribución a portales', 'connected', 156, 'propiedades sincronizadas', 'hace 2 min'),
    ('manual', 'Creado directamente en EstatePro', 'connected', 4, 'registros nativos', 'en tiempo real');

INSERT INTO sync_events (id, source, message, occurred_at) VALUES
    ('sync-1', 'easybroker', '3 propiedades actualizaron precio en EasyBroker', now() - interval '2 minutes'),
    ('sync-2', 'hubspot', 'Nuevo lead capturado por formulario web', now() - interval '8 minutes'),
    ('sync-3', 'easybroker', 'Nueva propiedad importada: Penthouse 1, The Monarch', now() - interval '25 minutes'),
    ('sync-4', 'hubspot', 'Sarah Jenkins actualizó su estatus de crédito a pre-aprobado', now() - interval '1 hour'),
    ('sync-5', 'easybroker', 'Sincronización de inventario completa — 156 propiedades', now() - interval '3 hours'),
    ('sync-6', 'hubspot', 'Secuencia de nutrición activada para 5 contactos', now() - interval '4 hours');
