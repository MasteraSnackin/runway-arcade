# API Contract

## Purpose

This document defines the API shape for a production-ready version of the MVP. The current preview can be implemented with local fixtures, but these contracts should guide the backend boundary when live Xero, persistence, and AI tools are added.

Base path: `/api/v1`

All responses use JSON. All money amounts are integer minor units unless a field name explicitly says `Formatted`.

## Shared Types

### Money

```ts
type CurrencyCode = "GBP";

type Money = {
  amountCents: number;
  currency: CurrencyCode;
  formatted: string;
};
```

### API Error

```ts
type ApiError = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    requestId: string;
  };
};
```

### Scenario ID

```ts
type ScenarioId =
  | "normal"
  | "payroll_week"
  | "late_customer"
  | "supplier_pressure"
  | "cash_squeeze";
```

## Dashboard

### GET `/scenarios`

Returns available demo scenarios.

```json
{
  "scenarios": [
    {
      "id": "cash_squeeze",
      "label": "Cash squeeze",
      "description": "Operating cash down 40 percent.",
      "asOfDate": "2026-07-03"
    }
  ]
}
```

### GET `/dashboard?scenario=cash_squeeze`

Returns the full dashboard view model.

```json
{
  "scenario": {
    "id": "cash_squeeze",
    "label": "Cash squeeze",
    "description": "Operating cash down 40 percent.",
    "asOfDate": "2026-07-03"
  },
  "cashPosition": {
    "totalCash": { "amountCents": 8642000, "currency": "GBP", "formatted": "GBP 86,420" },
    "runwayWeeks": 8.6,
    "accounts": [
      { "name": "Operating", "type": "operating", "balanceCents": 2892000 },
      { "name": "Tax Reserve", "type": "reserve", "balanceCents": 2150000 },
      { "name": "Payroll Reserve", "type": "reserve", "balanceCents": 3600000 }
    ],
    "averageDailyBurnCents": 143700
  },
  "forecast": {
    "windowDays": 7,
    "expectedInCents": 2359500,
    "expectedOutCents": 2615900,
    "netMovementCents": -256400,
    "runwayImpactDays": -2,
    "sources": ["xero_invoices", "xero_bills", "xero_payments"]
  },
  "hazards": {
    "status": "watch",
    "dueThisWeekCount": 3,
    "dueThisWeekTotalCents": 2487400,
    "overdueBillCount": 1,
    "mustPayObligationCount": 3,
    "bills": []
  },
  "rescueBeacons": {
    "overdueInvoiceCount": 3,
    "overdueTotalCents": 2036000,
    "invoices": []
  },
  "routePlan": {
    "strategy": "balanced",
    "cashOutCents": 2300000,
    "cashPreservedCents": 187400,
    "expectedInflowCents": 1832400,
    "runwayImpactDays": -3,
    "requiresApproval": true
  },
  "missionObjectives": []
}
```

## Co-Pilot

### POST `/copilot/respond`

Runs allowed finance tools and returns a structured answer.

Request:

```json
{
  "scenarioId": "cash_squeeze",
  "message": "Run cash radar",
  "conversationId": "local-demo-1"
}
```

Response:

```json
{
  "conversationId": "local-demo-1",
  "messageId": "msg_123",
  "toolCalls": [
    {
      "toolName": "cash_position",
      "status": "ok",
      "summary": "checked 3 accounts",
      "evidenceCardId": "ev_cash_123"
    }
  ],
  "evidenceCards": [
    {
      "id": "ev_cash_123",
      "toolName": "cash_position",
      "title": "Cash position",
      "confidence": "high",
      "summaryValue": "GBP 86,420",
      "rows": [
        { "label": "Operating", "value": "GBP 28,920" },
        { "label": "Tax Reserve", "value": "GBP 21,500" }
      ],
      "sourceRefs": [
        { "type": "xero_account", "label": "3 bank accounts" }
      ]
    }
  ],
  "answer": {
    "headline": "Your cash position is currently stable at GBP 86,420, with 8.6 weeks of runway.",
    "context": ["Expected net movement over 7 days is GBP -2,564."],
    "risks": ["A delayed receipt this week would tighten operating liquidity."],
    "recommendedActions": ["Review the GBP 26,159 scheduled outflow."]
  },
  "proposedActions": []
}
```

Rules:

- `answer` must not contain raw internal tool fields.
- Every amount-bearing answer must be supported by `toolCalls` and `evidenceCards`.
- If `proposedActions` is non-empty, each action must require approval.

## Finance Tools

### POST `/tools/run`

Internal backend endpoint. Not exposed directly to browsers in production unless protected.

Request:

```json
{
  "scenarioId": "cash_squeeze",
  "toolName": "runway",
  "input": {}
}
```

Response:

```json
{
  "toolName": "runway",
  "status": "ok",
  "result": {
    "weeksRemaining": 8.6,
    "daysRemaining": 60,
    "averageDailyBurnCents": 143700,
    "sourceRefs": ["xero_bank_accounts", "xero_transactions_30d"]
  },
  "evidenceCard": {
    "title": "Runway",
    "summaryValue": "8.6 weeks",
    "confidence": "medium",
    "rows": [
      { "label": "Days", "value": "60 days" },
      { "label": "Average daily burn", "value": "GBP 1,437" }
    ]
  }
}
```

Allowed tool names:

- `cash_position`
- `runway`
- `seven_day_forecast`
- `overdue_invoices`
- `due_bills_this_week`
- `propose_payment_route`
- `cash_crisis_plan`

## Proposed Actions

### GET `/proposed-actions?scenario=cash_squeeze`

Returns pending and simulated actions.

```json
{
  "actions": [
    {
      "id": "act_001",
      "type": "chase_invoice",
      "title": "Chase invoice - Halcyon Retail Ltd",
      "source": {
        "type": "invoice",
        "label": "Xero invoice INV-2026-041"
      },
      "status": "needs_approval",
      "impact": "+GBP 11,160 likely inflow",
      "risk": "Customer relationship - friendly draft only",
      "requiresApproval": true
    }
  ]
}
```

### POST `/proposed-actions/{actionId}/approve-simulation`

Approves an action in simulation mode.

Request:

```json
{
  "scenarioId": "cash_squeeze",
  "actorId": "demo-user",
  "confirmationText": "Approve simulation"
}
```

Response:

```json
{
  "action": {
    "id": "act_001",
    "status": "sim_approved",
    "approvedAt": "2026-07-03T21:21:56.000Z"
  },
  "auditEvent": {
    "id": "audit_001",
    "eventType": "sim_approved",
    "sourceLabel": "Xero invoice INV-2026-041",
    "stateChanges": [
      "Status: Needs approval -> Approved simulation",
      "Recorded against Xero invoice INV-2026-041"
    ]
  }
}
```

## Audit

### GET `/audit-events`

Query params:

- `scenario`
- `q`
- `from`
- `to`
- `limit`
- `cursor`

Response:

```json
{
  "events": [
    {
      "id": "audit_001",
      "timestamp": "2026-07-03T21:21:56.000Z",
      "scenarioId": "cash_squeeze",
      "eventType": "sim_approved",
      "title": "Chase invoice - Halcyon Retail Ltd",
      "sourceLabel": "Xero invoice INV-2026-041",
      "impact": "+GBP 11,160 likely inflow",
      "stateChanges": []
    }
  ],
  "nextCursor": null
}
```

### GET `/audit-events/export.csv`

Returns `text/csv`.

Required columns:

```csv
timestamp,scenario,event_type,title,source,impact,state_changes,actor_id
```

## Evidence

### POST `/evidence/{evidenceCardId}/pin`

```json
{
  "scenarioId": "cash_squeeze"
}
```

Response:

```json
{
  "evidenceCardId": "ev_cash_123",
  "pinned": true
}
```

### GET `/evidence/pinned?q=runway`

```json
{
  "items": []
}
```

## Xero Connection

### GET `/xero/status`

```json
{
  "mode": "demo",
  "connected": false,
  "tenantName": null,
  "lastSyncAt": null,
  "requiredAction": "connect_xero"
}
```

### POST `/xero/connect/start`

Returns the OAuth authorisation URL.

```json
{
  "authorizationUrl": "https://login.xero.com/identity/connect/authorize?...",
  "state": "opaque_csrf_state"
}
```

### GET `/xero/callback`

OAuth callback route. It should exchange the code server-side and redirect to the app with a safe status parameter. It must not expose tokens.

## Error Codes

| Code | Meaning |
| --- | --- |
| `SCENARIO_NOT_FOUND` | Unknown scenario ID. |
| `XERO_NOT_CONNECTED` | Live data requested without tenant connection. |
| `XERO_INSUFFICIENT_SCOPE` | Xero returned insufficient scope. |
| `XERO_RATE_LIMITED` | Xero returned HTTP 429 or remaining limit is exhausted. |
| `TOOL_FAILED` | Finance tool failed. |
| `APPROVAL_REQUIRED` | User attempted an action without approval. |
| `ACTION_NOT_FOUND` | Proposed action ID is unknown. |
| `AUDIT_EXPORT_FAILED` | CSV export failed. |

## Versioning

- Keep `/api/v1` stable for the MVP.
- Add fields in a backwards-compatible way.
- Do not rename response fields without a version bump.
- Treat audit export columns as a contract.

