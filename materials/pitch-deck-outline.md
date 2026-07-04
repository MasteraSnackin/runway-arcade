# Pitch Deck Outline

Recommended length: 7 to 9 slides.

## Slide 1 - Runway Arcade

Headline: Cashflow clarity, before the runway runs out.

Show:

- product name
- Xero Finance Co-Pilot positioning
- screenshot or live app on `http://localhost:4173/`

Speaker note:

"Runway Arcade is a Xero finance co-pilot for small businesses. It turns accounting records into a fast, safe cash decision cockpit."

## Slide 2 - The Problem

Headline: Xero has the facts. Founders still need the decision.

Points:

- Bills, invoices, bank balances and reports live in separate places.
- Pressure weeks need fast cash choices.
- Spreadsheets are slow, stale and hard to audit.
- AI without evidence or approvals is risky for finance.

## Slide 3 - The Product

Headline: One cockpit for runway, hazards and recovery routes.

Show:

- Fuel Gauge
- Cash Radar
- Rescue Beacons
- Flight Route
- Approval Queue
- Xero Co-Pilot

Speaker note:

"The interface uses a cockpit metaphor, but the underlying product is practical: cash, runway, obligations, receivables and approval decisions."

## Slide 4 - Xero Data Surfaces

Headline: Built around real Xero accounting workflows.

Map:

- invoices to overdue recovery
- bills to cash hazards
- bank accounts to fuel gauge
- reports to runway and aged positions
- contacts and payments to evidence and route planning

Clarify:

"The local demo uses fixture data. The production boundary is a Xero adapter that can swap fixture reads for live OAuth reads."

## Slide 5 - AI With Guardrails

Headline: Co-pilot, not autopilot.

Points:

- bounded tool calls
- deterministic finance calculations
- evidence cards
- no raw token exposure
- approval required for risky actions
- audit trail for simulated decisions

## Slide 6 - Demo Moment

Headline: MAYDAY mode turns a cash squeeze into a route.

Demo beats:

1. Select `Cash squeeze`.
2. Click `Judge demo` or `MAYDAY`.
3. Show cash radar and route recommendation.
4. Show approval queue and audit trail.
5. Emphasise no real Xero writes occur.

## Slide 7 - Why It Matters

Headline: Safer decisions for small businesses.

Impact:

- reduces manual cash planning
- surfaces risks earlier
- prioritises receivables
- helps founders act without losing auditability
- gives bookkeepers and finance managers explainable evidence

## Slide 8 - Technical Path

Headline: From hackathon mirror to production-ready product.

Path:

- current local Lovable preview mirror
- rebuild or recover editable source
- implement frontend and backend source
- connect Xero OAuth
- add encrypted token storage
- enforce scopes, approvals, audit and retention

## Slide 9 - Ask Or Next Step

Headline: Make Xero the weekly cash command centre.

Ask options:

- judge feedback on MVP direction
- access to editable source or rebuild sprint
- Xero OAuth test tenant
- approval for live-read prototype
