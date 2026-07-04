# QA And Evidence Checklist

## Pre-Demo Environment

- [ ] `runway-arcade-local/mirror-info.json` points to `https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm`.
- [ ] Revision is `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`.
- [ ] Local server responds at `http://localhost:4173/`.
- [ ] Browser tab is hard reloaded before judging.
- [ ] No Lovable badge is visible.
- [ ] Header shows `Using demo fallback`, not `Xero error`.
- [ ] No `Unexpected token` fallback badges are visible.
- [ ] No browser console errors or warnings are present after load.

## Visible Product Checks

- [ ] Page title is `Runway Arcade - Xero Finance Co-Pilot`.
- [ ] Header shows `Runway Arcade`.
- [ ] Header subtitle includes `Xero Cash Flow Accelerator`.
- [ ] Xero status/fallback chip is visible.
- [ ] Scenario controls are visible: Normal flight, Payroll week, Late customer, Supplier pressure, Cash squeeze.
- [ ] `Judge demo` control is visible.
- [ ] `MAYDAY` control is visible.
- [ ] Fuel Gauge / Runway section is visible.
- [ ] Cash Radar / Hazards section is visible.
- [ ] Next 7 Days Forecast section is visible.
- [ ] Rescue Beacons / Overdue invoices section is visible.
- [ ] Approval Queue section is visible.
- [ ] Approvals Audit Trail section is visible.
- [ ] Xero Co-Pilot panel is visible.

## Safety Checks

- [ ] Demo fallback or simulation state is clear.
- [ ] Approval copy says actions need confirmation.
- [ ] No copy claims that real payments were sent.
- [ ] No copy claims that real customer emails were sent.
- [ ] No copy claims that real Xero records were changed.
- [ ] Audit trail is positioned as local/demo unless live mode is implemented.

## Co-Pilot Checks

- [ ] Preset prompt `Run cash radar` is visible.
- [ ] Preset prompt `How much fuel remains?` is visible.
- [ ] Preset prompt `Who is sending rescue cash?` is visible.
- [ ] Preset prompt `What hazards are due this week?` is visible.
- [ ] Preset prompt `Plot a safe payment route` is visible.
- [ ] Preset prompt `Start MAYDAY diagnosis` is visible.
- [ ] Co-pilot answers include evidence rather than unsupported advice.

## Xero Readiness Checks

- [ ] Xero data surfaces are named clearly.
- [ ] Live Xero path is described as adapter-ready, not already fully connected.
- [ ] OAuth tokens are not handled in browser code for a production design.
- [ ] Exact scopes are marked as a production verification task.
- [ ] Write capability remains disabled in the MVP.

## Evidence To Capture

Useful evidence for a submission or handover:

- screenshot of the default dashboard
- screenshot after clicking `Judge demo`
- screenshot of approval queue
- screenshot of Xero Evidence Ledger or Live Xero Path
- copy of `mirror-info.json`
- local server command output showing `Runway Arcade local mirror running at http://localhost:4173`
