# MVP Backlog and Roadmap

## Delivery Strategy

Build the MVP in three layers:

1. Static demo and scenario dashboard.
2. Deterministic finance helpers, evidence cards, approvals, and audit.
3. Xero adapter and co-pilot orchestration.

This keeps the demo credible early while preserving the path to live data.

## Epic Backlog

| Epic | Priority | Description |
| --- | --- | --- |
| E-01 Scenario Dashboard | Must | Build main dashboard cards and five scenario states. |
| E-02 Finance Calculations | Must | Implement cash, runway, forecast, overdue invoice, bill, and route calculations. |
| E-03 Approval Simulation | Must | Implement proposed actions, simulated approval, and audit events. |
| E-04 Co-Pilot Tool Layer | Must | Implement bounded tool calls and evidence-backed response rendering. |
| E-05 Xero Adapter Boundary | Must | Define adapter interface and connect demo fixtures behind it. |
| E-06 Audit and Export | Should | Add search, filters, CSV export, and clear behaviour. |
| E-07 Evidence Pinning | Should | Let users pin and search evidence cards. |
| E-08 Live Xero OAuth | Should | Add production connection flow after MVP demo stability. |
| E-09 Production Write Controls | Later | Add write-scope-gated actions only after compliance decision. |

## Sprint 1: Demo Dashboard

- Create app shell and layout.
- Add scenario selector.
- Build fuel gauge, radar hazards, forecast, rescue beacons, and flight route sections.
- Add hard-coded demo fixtures for all five scenarios.
- Add shareable scenario URL.
- Add responsive baseline.

Definition of done:

- User can switch scenarios.
- Key figures match scenario fixtures.
- No runtime errors in browser console.

## Sprint 2: Finance Domain and Audit

- Replace direct fixture reads with domain helpers.
- Add route calculation.
- Add approval queue model.
- Add simulated approval status changes.
- Add audit trail, search, filters, clear, and CSV export.
- Add agent run log and replay.

Definition of done:

- Every approval simulation creates an audit event.
- Audit filters work by text, scenario, and date.
- CSV export includes timestamp, scenario, action, source, impact, and state changes.

## Sprint 3: Co-Pilot and Evidence

- Implement AI tool registry.
- Build evidence card renderer.
- Implement preset prompts.
- Add free-text prompt handling.
- Add evidence pinning.
- Add evidence card self-test.
- Add guardrail tests for no internal field leakage.

Definition of done:

- Preset prompts produce structured tool calls and evidence.
- Internal fields are not visible in evidence.
- Recommendations require approval.

## Sprint 4: Xero Adapter Readiness

- Define adapter interface.
- Map demo fixtures to adapter outputs.
- Add live OAuth connection placeholder or real integration depending on available time.
- Document required Xero scopes and endpoints after verification.
- Add connection failure states.

Definition of done:

- Domain code consumes adapter interface only.
- Demo and live adapter can be swapped without changing dashboard components.
- Connection errors are clear and non-destructive.

## Roadmap After MVP

- Live Xero OAuth read integration.
- Organisation/user roles.
- Persistent database audit trail.
- Email draft export for invoice chases.
- Forecast settings and scenario editing.
- Supplier payment calendar.
- Production-grade permissions and compliance review.
- Optional write actions with explicit approvals.

