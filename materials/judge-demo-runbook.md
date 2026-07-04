# Judge Demo Runbook

## Goal

Show that Runway Arcade converts Xero-style finance records into a safe, explainable cashflow decision workflow.

Recommended demo length: 4 to 6 minutes.

## Pre-Demo Setup

From the workspace root:

```sh
cd runway-arcade-local
npm start
```

Open:

```text
http://localhost:4173/
```

If the server is already running, just reload the browser tab.

Confirm:

- page title is `Runway Arcade - Xero Finance Co-Pilot`
- header shows `Runway Arcade`
- header subtitle includes `Xero Cash Flow Accelerator`
- scenario tabs are visible
- `Judge demo` and `MAYDAY` controls are visible
- no Lovable badge is visible

## Demo Flow

### 1. Opening, 30 seconds

Say:

"This is Runway Arcade, a Xero finance co-pilot for small businesses. It helps a founder answer the weekly cash question: how much runway do we have, what will hurt cash this week, who can improve it, and what action is safe to approve?"

Point out:

- Xero demo fallback chip
- read-first safety posture
- cockpit metaphor

### 2. Normal Operating View, 45 seconds

Show:

- Fuel Gauge / Runway
- Cash Radar / Hazards
- Next 7 Days Forecast
- Rescue Beacons

Say:

"The dashboard turns Xero-style records into operational decisions. Bills become hazards, overdue invoices become rescue beacons, and cash becomes runway."

### 3. Scenario Switching, 45 seconds

Click through:

- `Payroll week`
- `Late customer`
- `Supplier pressure`
- `Cash squeeze`

Say:

"The same interface handles different cash pressure patterns. The point is not one static report; it is a scenario-aware decision surface."

### 4. Judge Demo Or MAYDAY, 90 seconds

Click:

- `Judge demo`

Or:

- `MAYDAY`

Show:

- co-pilot output
- route recommendation
- approval queue
- audit trail
- evidence cards

Say:

"The assistant is not allowed to act alone. It can explain, rank and propose, but approval is required. The audit trail is part of the product, not an afterthought."

### 5. Xero Relevance, 60 seconds

Open or point to:

- Xero Evidence Ledger
- Live Xero Path
- Xero API coverage

Say:

"The local demo uses fixture data because we only have a Lovable preview bundle. The product boundary is designed around Xero invoices, bills, contacts, payments, bank accounts, reports, aged receivables and aged payables."

### 6. Close, 30 seconds

Say:

"Runway Arcade is a decision layer for small business cash. It makes Xero data more actionable while keeping finance actions evidence-backed, approval-gated and auditable."

## Recovery Plan

If `localhost:4173` is down:

```sh
cd runway-arcade-local
npm start
```

If the displayed app is stale:

```sh
cd runway-arcade-local
npm run sync -- https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm
```

If the browser still shows old assets:

- hard reload the page
- confirm `runway-arcade-local/mirror-info.json` contains revision `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`

## Do Not Claim

- Do not claim the local mirror is the original editable source.
- Do not claim live Xero OAuth is connected in the local mirror.
- Do not claim actions are sent to Xero.
- Do not claim production scopes or rate limits are final without checking current Xero documentation.
