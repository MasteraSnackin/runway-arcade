# Product Requirements

## Product Goal

Give small businesses a fast, safe cashflow command centre connected to Xero data. The MVP should help users understand runway, detect near-term cash hazards, identify overdue receivables, and decide which actions to approve.

## Personas

| Persona | Need | Success Signal |
| --- | --- | --- |
| Founder | Wants to know whether payroll, VAT, rent, and suppliers can be covered. | Sees runway, hazards, and recommended route without spreadsheet work. |
| Finance manager | Wants a weekly cash prioritisation view. | Can review bills, invoices, forecast, and audit trail in one screen. |
| Bookkeeper | Wants evidence-backed explanations. | Can trace every recommendation back to Xero-style source records. |
| Hackathon judge | Wants a convincing Xero/API demo. | Sees demo scenarios, adapter readiness, safety gates, and API coverage. |

## User Journeys

### Journey 1: Check Cash Position

1. User opens the dashboard.
2. User selects a scenario.
3. Dashboard displays total cash, runway, reserves, burn, and 7-day forecast.
4. User asks "How much fuel remains?"
5. Co-pilot responds with tool calls, cash evidence, runway evidence, summary, risks, and next actions.

### Journey 2: Handle a Cash Squeeze

1. User selects `cash_squeeze`.
2. Dashboard shows operating cash down 40 percent, total cash GBP 86,420, and runway 8.6 weeks.
3. Radar hazards show GBP 24,874 due this week.
4. Rescue beacons show overdue invoices totalling GBP 20,360.
5. Flight route recommends paying critical bills, delaying non-critical spend, and chasing overdue customers.
6. User simulates approval for a route.
7. Approval appears in the audit trail.

### Journey 3: Chase Overdue Customers

1. User reviews rescue beacons.
2. User sees overdue invoices, likely recovery, and chase draft controls.
3. User triggers or approves a chase simulation.
4. Audit records the simulated approval and source invoice.

### Journey 4: Use Mayday Diagnosis

1. User selects "Start MAYDAY diagnosis".
2. Co-pilot runs crisis planning, runway, overdue invoice, and due bill tools.
3. User sees conservative, balanced, and aggressive routes compared against current runway.
4. User chooses whether to approve a route simulation.

## User Stories

| ID | Story | Priority |
| --- | --- | --- |
| US-01 | As a founder, I want to see runway in weeks and days so I understand how urgent the cash situation is. | Must |
| US-02 | As a finance manager, I want bills due this week grouped by criticality so I can decide what cannot slip. | Must |
| US-03 | As a founder, I want overdue invoices ranked by likely recovery so I know who to chase first. | Must |
| US-04 | As a finance manager, I want an AI response to show its tool calls so I can trust the recommendation. | Must |
| US-05 | As a bookkeeper, I want evidence cards to show friendly finance labels so stakeholders can read them safely. | Must |
| US-06 | As a user, I want all proposed actions to require approval so nothing is executed by surprise. | Must |
| US-07 | As a reviewer, I want an audit trail so I can see what was approved, when, and against which Xero record. | Must |
| US-08 | As a judge, I want multiple scenarios so I can see how the system responds to different finance states. | Should |
| US-09 | As a user, I want to export audit history as CSV so I can preserve demo evidence or review later. | Should |
| US-10 | As an implementer, I want a Xero adapter boundary so demo fixtures can be swapped for live OAuth data. | Must |

## Visible Scenario Requirements

| Scenario | Preview Description | Expected Behaviour |
| --- | --- | --- |
| Normal flight | Standard trading week. | Shows stable cash, runway 12.2 weeks, watch-level hazards. |
| Payroll week | Monthly payroll lands in 3 days. | Adds payroll obligation, increases expected outflow, shows warning-level hazards. |
| Late customer | Largest customer 45 days overdue. | Raises overdue receivables to GBP 31,960 and changes rescue beacon urgency. |
| Supplier pressure | Multiple suppliers escalating. | Raises overdue bill count to 4 and marks radar hazards as critical. |
| Cash squeeze | Operating cash down 40 percent. | Drops total cash to GBP 86,420 and runway to 8.6 weeks. |

## Acceptance Criteria

- Scenario changes update the route, forecast, objectives, and visible figures.
- The co-pilot never presents an ungrounded financial recommendation without evidence.
- Proposed actions are separated from approved simulations.
- The audit trail states that no Xero writes occurred.
- The Xero path panel explains how production would swap demo fixtures for live OAuth data.
- Evidence card test verifies that internal field names are hidden and friendly labels remain visible.

## Product Copy Principles

- Use plain finance terms first and playful arcade language second.
- Make safety statements explicit near risky actions.
- Use dates in ISO format or unambiguous long date format.
- Use GBP for all money values.
- Avoid implying that a payment or customer chase was actually sent in the MVP.

