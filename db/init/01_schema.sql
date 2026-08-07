-- EstatePro CRM — test database schema
-- Mirrors src/types.ts. Standalone (not queried by the demo app yet) so it
-- can be shown as "how this persists in production" without adding runtime
-- risk to the live demo, which runs on in-memory mock data + AI fallback.

-- Where a record's system of record lives. HubSpot stays the CRM of record
-- for contacts, EasyBroker stays the system of record for portal inventory —
-- this column is what lets one pipeline show records from both without
-- either platform being replaced.
CREATE TYPE data_source AS ENUM ('hubspot', 'easybroker', 'manual');

CREATE TABLE agents (
    id            TEXT PRIMARY KEY,
    full_name     TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE
);

CREATE TABLE leads (
    id                  TEXT PRIMARY KEY,
    name                TEXT NOT NULL,
    phone               TEXT NOT NULL,
    email               TEXT NOT NULL,
    intent              TEXT NOT NULL CHECK (intent IN ('High Intent', 'Medium Intent', 'Low Intent', 'VIP')),
    status              TEXT NOT NULL CHECK (status IN ('new', 'negotiation', 'closing', 'won', 'lost')),
    inquiry             TEXT NOT NULL,
    budget              TEXT NOT NULL,
    preferred_location  TEXT NOT NULL,
    property_of_interest TEXT,
    last_contact        TEXT NOT NULL,
    assigned_to         TEXT REFERENCES agents(id),
    notes               TEXT,
    source              data_source NOT NULL DEFAULT 'manual'
);

-- One row per lead per scoring criterion. This is what calcLeadScore()
-- (src/lib/leadScoring.ts) reads: the status is the only thing an agent or
-- an AI assistant ever sets — the 0-100 score is always derived from these
-- rows by pure weighted math, never stored or guessed directly.
CREATE TABLE lead_criteria (
    id            SERIAL PRIMARY KEY,
    lead_id       TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    criterion_id  TEXT NOT NULL CHECK (
        criterion_id IN ('financing', 'budget', 'engagement', 'timeline', 'responsiveness', 'fit')
    ),
    status        TEXT NOT NULL CHECK (
        status IN ('CUMPLE', 'CUMPLE_CON_OBSERVACIONES', 'NO_CUMPLE', 'SIN_INFORMACION')
    ),
    note          TEXT,
    UNIQUE (lead_id, criterion_id)
);

CREATE TABLE listings (
    id                     TEXT PRIMARY KEY,
    address                TEXT NOT NULL,
    title                  TEXT NOT NULL,
    price                  NUMERIC(12, 2) NOT NULL,
    bedrooms               INTEGER NOT NULL,
    bathrooms              NUMERIC(3, 1) NOT NULL,
    sqft                   INTEGER NOT NULL,
    type                   TEXT NOT NULL CHECK (type IN ('Single Family', 'Condo', 'Multi-Family', 'Commercial')),
    status                 TEXT NOT NULL CHECK (status IN ('active', 'pending', 'sold', 'at_risk')),
    days_on_market         INTEGER NOT NULL DEFAULT 0,
    image_url              TEXT,
    client_name            TEXT,
    market_avg_price       NUMERIC(12, 2) NOT NULL,
    estimated_days_to_sell INTEGER NOT NULL,
    ai_recommendation_type TEXT CHECK (ai_recommendation_type IN ('price_reduction', 'description_boost', 'high_demand')),
    ai_recommendation_msg  TEXT,
    ai_suggested_price     NUMERIC(12, 2),
    source                 data_source NOT NULL DEFAULT 'manual'
);

-- Backs the Market Health radar (src/components/MarketHealthRadar.tsx),
-- adapted from Motor IN3's 6-axis property viability radar.
CREATE TABLE listing_market_health (
    listing_id  TEXT PRIMARY KEY REFERENCES listings(id) ON DELETE CASCADE,
    price       SMALLINT NOT NULL CHECK (price BETWEEN 0 AND 100),
    location    SMALLINT NOT NULL CHECK (location BETWEEN 0 AND 100),
    demand      SMALLINT NOT NULL CHECK (demand BETWEEN 0 AND 100),
    velocity    SMALLINT NOT NULL CHECK (velocity BETWEEN 0 AND 100),
    competition SMALLINT NOT NULL CHECK (competition BETWEEN 0 AND 100),
    condition   SMALLINT NOT NULL CHECK (condition BETWEEN 0 AND 100)
);

CREATE TABLE listing_comparables (
    id               SERIAL PRIMARY KEY,
    listing_id       TEXT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    address          TEXT NOT NULL,
    price            NUMERIC(12, 2) NOT NULL,
    price_per_sqft   NUMERIC(8, 2) NOT NULL,
    days_on_market   INTEGER NOT NULL
);

CREATE TABLE activities (
    id          TEXT PRIMARY KEY,
    type        TEXT NOT NULL CHECK (type IN ('deal', 'viewing', 'ai_insight', 'lead')),
    title       TEXT NOT NULL,
    subtitle    TEXT,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Backs the "Fuentes Unificadas" view (src/components/UnifiedSourcesView.tsx):
-- one connection status row per external system, and a rolling log of
-- sync events so the unification story reads as live, not static.
CREATE TABLE source_connections (
    source        data_source PRIMARY KEY,
    role          TEXT NOT NULL,
    status        TEXT NOT NULL DEFAULT 'connected' CHECK (status IN ('connected', 'syncing')),
    record_count  INTEGER NOT NULL,
    record_label  TEXT NOT NULL,
    last_sync     TEXT NOT NULL
);

CREATE TABLE sync_events (
    id          TEXT PRIMARY KEY,
    source      data_source NOT NULL,
    message     TEXT NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lead_criteria_lead_id ON lead_criteria(lead_id);
CREATE INDEX idx_listing_comparables_listing_id ON listing_comparables(listing_id);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_listings_source ON listings(source);
