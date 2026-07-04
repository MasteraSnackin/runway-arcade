# Implementation Plan

## Purpose

This plan turns the MVP documentation into a practical build sequence. It assumes the current `runway-arcade-local/` folder is a deployed preview mirror, not the original editable source. If the original Lovable/Git source becomes available, use this plan to validate and complete it rather than rebuilding blindly.

## Delivery Principles

- Keep demo data and live Xero data behind the same adapter interface.
- Build deterministic finance calculations before AI orchestration.
- Keep all risky actions approval-gated.
- Treat the MVP as read-only unless a separate production write decision is made.
- Keep evidence cards as a controlled renderer, not arbitrary model output.

## Recommended Stack

The final stack is not confirmed. A conservative implementation choice would be:

| Layer | Recommendation | Reason |
| --- | --- | --- |
| Frontend | React with TypeScript | Matches the deployed preview style and supports rich dashboard state. |
| Routing | File or object router with query search params | Scenario URLs are part of the demo. |
| Backend | Node.js or serverless TypeScript API | Fits Xero SDKs and AI tool orchestration. |
| Database | PostgreSQL | Suitable for organisations, audit events, approvals, and token metadata. |
| Cache | In-memory for demo; Redis for production | Useful for Xero reads and rate-limit control. |
| Authentication | Auth provider with organisation membership | Needed before multi-user production. |
| AI runtime | Server-side orchestrator with fixed tools | Prevents raw browser-side model calls over Xero data. |

## Proposed Repository Structure

```text
/
  apps/
    web/
      src/
        components/
        features/
          dashboard/
          copilot/
          approvals/
          audit/
          evidence/
        routes/
        styles/
    api/
      src/
        routes/
        services/
        adapters/
        tools/
        security/
  packages/
    finance-domain/
      src/
        calculations/
        model/
        scenarios/
        fixtures/
    xero-adapter/
      src/
        demo/
        live/
        normalise/
    shared/
      src/
        api-contracts/
        formatting/
        validation/
  docs/
```

For a hackathon-only implementation, this can be collapsed into a single React app with a local API layer, provided the adapter and calculation boundaries remain clear.

## Milestones

### Milestone 1: Rebuildable Demo Baseline

Deliverables:

- App shell and layout.
- Scenario selector with URL state.
- Demo fixture data for five scenarios.
- Dashboard cards matching the preview.
- Clear "simulation only" copy near approval surfaces.

Exit criteria:

- Each scenario loads directly by URL.
- Dashboard figures match fixture expectations.
- No source data is duplicated in UI components.

### Milestone 2: Finance Domain Layer

Deliverables:

- Normalised finance model.
- Calculation helpers for cash position, runway, forecast, bills, invoices, route plans, and objectives.
- Unit tests for calculations and rounding.
- Shared formatter for money, dates, weeks, and days.

Exit criteria:

- Dashboard and co-pilot tools use the same calculations.
- Cash squeeze example calculates 8.6 weeks from GBP 86,420 and GBP 1,437 average daily burn.
- Formula tests cover zero/positive burn, missing due dates, and negative net movement.

### Milestone 3: Approval and Audit

Deliverables:

- Proposed action model.
- Approval queue.
- Simulated approval action.
- Audit event store.
- Search, scenario filter, date filter, CSV export.

Exit criteria:

- Every simulated approval creates an audit event.
- Audit events include source reference, impact, scenario, timestamp, and state changes.
- Audit export uses stable column names.

### Milestone 4: Evidence and Co-Pilot

Deliverables:

- Tool registry.
- Preset prompts.
- Free-text prompt intent handling.
- Evidence card renderer.
- Evidence pinning.
- Self-test for internal field leakage.

Exit criteria:

- Every numerical co-pilot answer references at least one evidence card.
- Evidence renderer hides raw internal fields.
- Unsupported requests are handled safely.

### Milestone 5: Xero Adapter Readiness

Deliverables:

- Adapter interface implemented by demo fixtures.
- Live adapter skeleton.
- OAuth connection route skeleton.
- Tenant selection and connection failure states.
- Rate limit and token refresh handling plan.

Exit criteria:

- Domain code depends only on the adapter interface.
- Demo mode remains available when live Xero is disconnected.
- Scope names are verified against Xero documentation before requesting permissions.

### Milestone 6: Production Hardening

Deliverables:

- Server-side token storage.
- Append-only persistent audit store.
- Role-based approval permissions.
- Observability events.
- Error and retry policies.
- Deployment pipeline and smoke tests.

Exit criteria:

- Secrets never reach the browser.
- Production logs are redacted.
- A failed Xero call cannot be mistaken for a successful action.

## Build Order

1. Create shared TypeScript types from `05-data-model.md`.
2. Create scenario fixtures and finance calculations.
3. Build dashboard cards using calculated view models.
4. Add route planner and proposed actions.
5. Add approval simulation and audit store.
6. Add co-pilot tool registry and evidence renderer.
7. Add Xero adapter interface and live adapter skeleton.
8. Add tests and deployment workflow.

## Testing Gates

| Gate | Required Before |
| --- | --- |
| Calculation unit tests | Any demo or production release. |
| Evidence leakage test | Any co-pilot release. |
| Approval/audit integration test | Any approval release. |
| OAuth token handling review | Any live Xero release. |
| Rate-limit handling test | Any live Xero release. |
| Accessibility smoke test | Any judged demo. |

## Dependencies

- Xero developer app for live read integration.
- Confirmed OAuth scopes.
- Auth provider decision.
- Database decision.
- AI model/runtime decision.
- Explicit product decision on whether writes will ever be enabled.

## Implementation Risks

- The local preview bundle is not suitable as a maintainable source base.
- Exact Xero scope requirements can change and must be verified at implementation time.
- AI responses can drift unless constrained by fixed tools and templates.
- Finance calculations need agreed rounding rules before demo validation.

