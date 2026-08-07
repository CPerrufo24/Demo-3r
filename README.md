# EstatePro CRM — Demo

Sales Intelligence CRM demo for Elite Realty Group. React 19 + Vite + Tailwind v4 + Express, with a Gemini-powered AI copilot (Sales Intelligence panel) and an offline-safe fallback so the demo works even without an API key.

Built on top of a Google AI Studio export, extended with patterns adapted from the **Motor IN3** engine plus a unification layer for the client's actual stack:

- **Lead Score with explicability** (`src/lib/leadScoring.ts`) — same deterministic pattern as Motor IN3's `calcIN3Score()`: a set of weighted criteria, each with a status (`CUMPLE` / `CUMPLE_CON_OBSERVACIONES` / `NO_CUMPLE` / `SIN_INFORMACION`), always reduced to a score by pure math — never guessed directly by AI. Shown as a `92%` badge + reasons list on Pipeline cards and the Lead Detail modal.
- **Market Health Radar** (`src/components/MarketHealthRadar.tsx`) — same 6-axis SVG hexagon as Motor IN3's `RadarChart.tsx`, repurposed from legal/market viability axes to Price / Location / Demand / Velocity / Competition / Condition. Opens from "Market Intelligence" on any listing card.
- **Fuentes Unificadas** (`src/components/UnifiedSourcesView.tsx`) — the client's core ask: one workspace instead of tab-switching between HubSpot (their CRM of record) and EasyBroker (their portal inventory). Every lead/listing carries a `source` (`hubspot` / `easybroker` / `manual`, see `src/types.ts`) shown as a badge everywhere, with source filters on Pipeline and Listings and a live-looking sync feed on the new "Fuentes Unificadas" nav item. This is simulated — no real HubSpot/EasyBroker API calls — by design, so the interactive demo has zero live third-party dependency risk.

## Run the app

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. (Optional) Set `GEMINI_API_KEY` in `.env` to enable live AI responses. Without it, the Sales Intelligence panel falls back to realistic canned responses — the demo still works end to end.
3. Run the app:
   ```
   npm run dev
   ```
4. Open http://localhost:3000

## Test database (Docker)

A Postgres schema + seed data mirroring `src/data/mockData.ts` lives under `db/`. It is **not** wired into the app — the running demo intentionally stays on in-memory mock data for reliability. The database is there to show how the same leads/listings/scores would persist in production.

```
docker compose up -d
```

This starts Postgres on `localhost:5432` (user/db `estatepro` / `estatepro_crm`, see `.env.example`) and auto-runs:

- `db/init/01_schema.sql` — tables for leads, lead scoring criteria, listings, market health, comparables, activities, source connections, and sync events
- `db/init/02_seed.sql` — the same 6 leads and 6 listings you see on screen, tagged with the same `hubspot` / `easybroker` / `manual` sources

Inspect it with any Postgres client, e.g.:

```
docker exec -it estatepro-crm-db psql -U estatepro -d estatepro_crm -c "select name, budget from leads;"
```

To stop and remove the container (keeps the data volume):
```
docker compose down
```
