# Technical Specification

## Architecture Summary

The MVP should be implemented as a client-facing dashboard backed by a finance domain layer and a Xero data adapter. In the preview, the adapter appears to use demo fixtures. In production, the same adapter boundary should fetch from a live Xero OAuth tenant.

Recommended production pattern:

- Frontend dashboard for scenario/demo UI, cards, approvals, audit, and chat.
- Backend API for Xero OAuth, token storage, data normalisation, AI tool execution, approval policy, and audit persistence.
- Finance helper layer for deterministic cash calculations.
- AI orchestration layer with a fixed set of read-only tools and explicit approval gates.

## Components

| Component | Responsibility |
| --- | --- |
| Dashboard UI | Shows runway, hazards, forecast, receivables, route, approvals, audit, evidence, and co-pilot. |
| Scenario store | Drives demo states for normal flight, payroll week, late customer, supplier pressure, and cash squeeze. |
| Xero adapter | Provides invoices, bills, contacts, payments, bank accounts, reports, aged receivables, and aged payables through a stable interface. |
| Finance helpers | Calculate cash position, runway, burn rate, forecast, overdue invoices, due bills, and route options. |
| AI tool registry | Exposes bounded tools such as `cash_position`, `runway`, `seven_day_forecast`, and `propose_payment_route`. |
| Approval service | Tracks proposed actions, approved simulations, status transitions, and resulting state changes. |
| Audit service | Records approval events with timestamp, scenario, source object, action, impact, and state changes. |
| Evidence service | Converts internal tool results into user-safe evidence cards. |
| Export service | Produces CSV for audit history. |

## Data Flow

1. UI requests a scenario or live tenant data.
2. Xero adapter returns normalised finance records.
3. Finance helpers calculate derived metrics.
4. Dashboard renders cards.
5. User asks a question or selects a co-pilot prompt.
6. AI tool layer runs deterministic tools against the same normalised data.
7. Co-pilot response includes tool calls, evidence cards, explanation, risks, and recommendations.
8. Proposed actions enter the approval queue.
9. User approval creates an audit event.
10. In MVP, approval is simulation only. In production, write actions remain disabled unless explicitly enabled and reapproved.

## Key Calculations

### Total Cash

Sum cleared balances for included bank or reserve accounts.

```
total_cash = operating_cash + tax_reserve + payroll_reserve + other_cash_accounts
```

### Runway

Observed preview uses 30-day average daily burn.

```
runway_days = total_cash / average_daily_burn
runway_weeks = runway_days / 7
```

If average daily burn is zero or positive net inflow, show runway as stable or undefined rather than infinite without explanation.

### 7-Day Forecast

```
expected_in = sum(invoice receipts expected within 7 days)
expected_out = sum(bills/payments due within 7 days)
net_movement = expected_in - expected_out
runway_impact_days = net_movement / average_daily_burn
```

### Likely Recovery

Preview appears to estimate likely recovery below invoice face value. Production logic should make the basis explicit.

Possible initial rule:

```
likely_recovery = invoice_amount * recovery_factor(days_overdue, customer_risk)
```

## AI Tool Contract

AI tools should be deterministic functions over normalised finance data. The model may choose tools, but tools must return structured results that the UI can render as evidence.

Example tools:

- `cash_position`
- `runway`
- `seven_day_forecast`
- `overdue_invoices`
- `due_bills_this_week`
- `propose_payment_route`
- `cash_crisis_plan`

## Approval Rules

- Every payment, delay proposal, chase draft, and route recommendation starts as a proposed action.
- MVP approval changes state to simulated approval only.
- Production write actions require a second implementation gate:
  - user is authorised
  - tenant is connected
  - write scope is granted
  - action preview is shown
  - explicit confirmation is captured
  - audit event is persisted before and after the write attempt

## Error Handling

| Error | Expected Behaviour |
| --- | --- |
| Xero connection missing | Show demo mode or connection required state. |
| Token expired | Ask user to reconnect. Do not fall back to stale writes. |
| Partial data | Render available data and mark affected cards as incomplete. |
| Tool failure | Show failed tool in run log and avoid producing unsupported recommendations. |
| Calculation ambiguity | State unknown plainly and ask for missing data or show a conservative estimate. |
| Approval write blocked | Preserve proposal and explain required condition. |

## Security Requirements

- Store Xero access and refresh tokens server-side only.
- Encrypt tokens at rest.
- Do not expose raw API responses to the model or browser when not needed.
- Apply least privilege scopes.
- Keep write scopes separate from read MVP.
- Persist audit events in append-only storage.
- Log tool calls without storing unnecessary customer personal data.

## Observability

Minimum production events:

- tenant connected
- data sync started/completed/failed
- tool call started/completed/failed
- proposed action created
- approval simulated
- approval confirmed for production write
- Xero write attempted/succeeded/failed
- audit export created

## Unknowns

- The original Lovable/Git source structure was not available. A deployed bundle mirror exists locally, but it is not a clean editable source tree.
- The current persistence mechanism for demo audit state is not visible.
- Exact AI model, prompt templates, and runtime are unknown.
- Production hosting, database, and authentication provider are not specified.
