# User Guide

## What Runway Arcade Does

Runway Arcade helps you understand short-term cash health from Xero-style finance data. It shows how much cash you have, how long it may last, what bills are coming up, which customers owe money, and which actions could protect runway.

The MVP is a simulation. It does not send payments, chase customers, or write to Xero.

## Main Screen

### Scenario

Use the scenario buttons to change the demo state:

- Normal flight: standard trading week.
- Payroll week: payroll is due soon.
- Late customer: a major customer is overdue.
- Supplier pressure: suppliers are escalating.
- Cash squeeze: operating cash is down.

The figures change when the scenario changes.

### Fuel Gauge

This shows:

- total cash
- runway in weeks
- operating cash
- tax reserve
- payroll reserve
- average daily burn

Runway is an estimate of how long current cash lasts at the current burn rate.

### Radar Hazards

This shows bills and obligations due soon. Critical items may include tax, payroll, and rent.

Use this section to answer:

- What must be paid this week?
- What could put cash under pressure?
- Which obligations are critical?

### Next 7 Days Forecast

This compares expected incoming and outgoing cash over the next 7 days.

Positive net movement means expected cash in is greater than expected cash out. Negative net movement means expected cash out is greater than expected cash in.

### Rescue Beacons

This shows overdue customer invoices that could improve cash if collected.

For each invoice, the app shows:

- customer
- invoice number
- days overdue
- amount due
- likely recovery estimate

Likely recovery is an estimate, not a guarantee.

### Flight Route

This is a proposed 7-day action plan. It may recommend:

- pay critical bills
- delay lower-risk bills
- chase overdue invoices
- pause discretionary spend

The route shows cash out, cash preserved, expected inflow, and runway impact.

### Approval Queue

Actions in this section require approval. In the MVP, approval means "approve simulation", not "perform real action".

No payment, customer chase, or Xero update is sent automatically.

### Audit Trail

The audit trail records simulated approvals. It helps you see:

- what was approved
- when it was approved
- which scenario was active
- which Xero-style invoice or bill was referenced
- what state changed

You can search, filter, clear, and export audit records.

### Pinned Evidence

Evidence cards can be pinned so important figures stay easy to find. Use this for key numbers such as runway, expected cash in, or bills due this week.

### Xero Co-Pilot

The co-pilot answers cash questions using finance tools. Preset prompts include:

- Run cash radar
- How much fuel remains?
- Who is sending rescue cash?
- What hazards are due this week?
- Plot a safe payment route
- Start MAYDAY diagnosis

Each answer should show:

- tool calls
- evidence cards
- a headline answer
- context
- risks
- recommended actions

## How to Use It in a Weekly Cash Review

1. Open the dashboard.
2. Check the fuel gauge.
3. Review radar hazards.
4. Review rescue beacons.
5. Ask the co-pilot to run cash radar.
6. Review the flight route.
7. Approve simulations for actions you want to track.
8. Export the audit trail if needed.

## How to Read Safety Labels

| Label | Meaning |
| --- | --- |
| Simulation only | The action is recorded locally but not executed in Xero. |
| Needs approval | The app recommends an action but has not approved it. |
| Draft | The action is prepared for review. |
| Approved simulation | The user approved the simulated action. |
| Evidence | A visible data point used by the co-pilot. |

## What the MVP Does Not Do

- It does not pay bills.
- It does not send customer emails.
- It does not update Xero.
- It does not replace professional accounting advice.
- It does not guarantee customer payment.
- It does not guarantee that a delayed supplier bill is safe.

## Good Questions to Ask the Co-Pilot

- How much runway do we have?
- What bills are due this week?
- Which invoices should we chase first?
- What happens if we pay VAT and rent?
- Which route preserves the most cash?
- What risks should I know before delaying a supplier?

## When to Get Human Review

Ask a bookkeeper, accountant, or finance lead before:

- delaying tax, payroll, or rent
- relying on a large overdue invoice
- making supplier promises
- treating forecast figures as certain
- enabling any future production write action

