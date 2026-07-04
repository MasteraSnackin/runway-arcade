# MVP Project Specification

## Summary

Runway Arcade is a Xero-connected finance co-pilot for small businesses. The MVP helps a finance owner understand near-term cash runway, identify bills and overdue invoices, receive AI-assisted recommendations, and approve simulated recovery actions.

The core promise is clear: "What is my cash position, what will hurt cash this week, who can improve it, and what should I do next?"

## Target Users

- Small business owner or founder who uses Xero but does not have a full finance team.
- Finance manager or bookkeeper who needs a fast weekly cash view.
- Hackathon judge evaluating Xero API coverage, safety, and product usefulness.

## Problem

Small businesses often see bills, invoices, bank balances, and payment timing in separate places. This makes it hard to answer urgent cash questions quickly:

- How many weeks of runway remain?
- Which payments are critical this week?
- Which customers should be chased first?
- Can the company pay key bills without breaching reserves?
- What actions are safe to take without losing auditability?

## MVP Outcome

The MVP should demonstrate a read-first finance assistant that:

- Summarises cash and runway from Xero-style data.
- Highlights near-term hazards and overdue receivables.
- Proposes payment and collection actions.
- Requires explicit approval before any simulated action.
- Keeps an audit trail of approvals.
- Grounds AI responses in visible tool calls and evidence cards.

## In Scope

- Scenario-based demo data for five states: normal flight, payroll week, late customer, supplier pressure, cash squeeze.
- Dashboard cards for cash, runway, forecast, bills, overdue invoices, and route recommendations.
- Co-pilot prompt buttons and free text input.
- Tool-call style AI responses with evidence cards.
- Approval queue with `APPROVE (SIMULATE)` controls.
- Local audit trail with search, scenario filter, date filters, clear, CSV export.
- Pinned evidence search and pin controls.
- Agent run log and replay.
- Xero API coverage panel showing adapter readiness.
- Live Xero path panel showing future production connection path.
- Evidence card self-test for display safety.
- Shareable scenario URL.

## Out of Scope for MVP

- Real Xero write operations.
- Payroll execution.
- Payment initiation through banks.
- Automatic customer email sending.
- Multi-user permissions.
- Production-grade accounting reconciliation.
- Credit scoring or lending decisions.
- Full mobile optimisation beyond readable demo behaviour.
- Long-term forecast beyond the visible 7-day and route/runway calculations.

## MVP Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
| --- | --- | --- | --- |
| FR-01 | Scenario selection | Must | User can switch between five demo scenarios and the dashboard recalculates key figures. |
| FR-02 | Fuel gauge | Must | Dashboard shows total cash, runway weeks, account split, and 30-day burn. |
| FR-03 | Radar hazards | Must | Dashboard lists bills due this week, overdue bill count, must-pay obligations, suppliers, due dates, categories, and amounts. |
| FR-04 | 7-day forecast | Must | Dashboard shows expected in, expected out, net movement, runway impact, and data sources. |
| FR-05 | Rescue beacons | Must | Dashboard lists overdue invoices with customer, invoice ID, days overdue, amount, likely recovery, and chase draft entry point. |
| FR-06 | Flight route | Must | Dashboard proposes pay, delay, chase, cash out, preserved cash, expected inflow, and runway impact. |
| FR-07 | Approval queue | Must | Proposed actions show impact, risk, status, and a simulated approval button. |
| FR-08 | Audit trail | Must | Simulated approvals are timestamped and searchable/filterable in an audit trail. |
| FR-09 | Co-pilot prompts | Must | Preset questions trigger tool-call style responses with evidence cards and recommendations. |
| FR-10 | Evidence cards | Must | Tool outputs can be displayed as evidence without leaking internal field names. |
| FR-11 | Pinned evidence | Should | User can pin evidence cards and search pinned items. |
| FR-12 | Replay run | Should | User can replay the agent run log and see read-only tool activity. |
| FR-13 | Xero path | Should | Product explains live Xero architecture and adapter readiness. |
| FR-14 | Share link | Should | User can share the current scenario URL. |
| FR-15 | Demo controls | Could | User can toggle motion, Top Gun mode, Mayday mode, and judge demo presentation state. |

## Non-Functional Requirements

- Safety: no payment, invoice chase, or Xero write should occur without explicit approval.
- Explainability: AI recommendations must show the data/tool evidence used.
- Auditability: every approval simulation must record action, scenario, timestamp, impact, source, and resulting state change.
- Data minimisation: evidence cards should expose friendly labels, not internal implementation fields.
- Reliability: calculations must be deterministic for a given data snapshot.
- Accessibility: key controls must be keyboard reachable and labelled.
- Performance: dashboard should load without noticeable delay for demo datasets.
- Security: production OAuth tokens must be stored server-side and encrypted.

## Success Metrics

- A user can answer "how much runway do we have?" within 30 seconds.
- A user can identify this week's critical payments within 30 seconds.
- A user can identify top overdue invoice chase targets within 30 seconds.
- A user can approve a proposed route simulation and see it in the audit trail.
- Judges can see at least five Xero surfaces represented: invoices, bills, contacts, payments, bank accounts, reports, aged receivables, aged payables.

## Assumptions

- The MVP is designed for UK-style GBP demo data.
- The demo organisation is fictional or sample data.
- All observed approvals are local simulation state.
- Production Xero integration will use OAuth 2.0 and a server-side adapter.
- AI output will be generated by a controlled tool layer, not by giving the model raw unrestricted Xero access.

## Open Questions

- Should production support real Xero writes, or remain recommendation-only?
- Who is allowed to approve actions in a multi-user organisation?
- Should invoice chase drafts be exported, emailed, or saved as Xero notes?
- What retention period is required for approval audit records?
- What exact model and hosting environment will be used for AI responses?

