# Lovable Recreate Prompt

Project: `Runway Arcade - Xero Finance Co-Pilot`

This is a reconstructed prompt for Lovable. It was built from the local preview mirror and the project documentation. It is not the original hidden Lovable prompt or editable source.

Use it to create a new editable Lovable project that recreates the current Runway Arcade demo as closely as possible.

## Known Unknowns

- The original Lovable source and original prompt were not exposed by the preview.
- The exact original component boundaries are inferred from the rendered bundle and documentation.
- The app should be rebuilt as clean editable source, not by editing the minified deployed bundle.
- Live Xero OAuth details, exact scopes and production write policy must be verified before any real integration.
- This prompt covers `Runway Arcade`. It does not attempt to recreate the separate `blockhaven-local` mirror.

## Paste This Into Lovable

```text
Build a complete editable React + TypeScript + Vite application called "Runway Arcade - Xero Finance Co-Pilot".

The product is a working Xero-style finance co-pilot demo for small UK businesses. It turns Xero-style invoices, bills, bank balances, payments and reports into a cockpit-style cashflow command centre.

The first screen must be the actual dashboard. Do not build a marketing landing page, brochure site, hero page, pricing page or generic SaaS homepage.

The app must feel playful, but it must behave like a serious finance operations tool. Use the arcade flight cockpit metaphor:
- cash = fuel
- runway = weeks remaining
- bills = radar hazards
- overdue invoices = rescue beacons
- payment planning = flight route
- urgent recovery = MAYDAY mode
- approvals = tower clearance

Core promise:
"What is my cash position, what will hurt cash this week, who can improve it, and what should I do next?"

Use demo fixture data only. Do not connect to Xero. Do not perform any external writes. Do not send emails. Do not initiate payments. Do not imply that any real Xero write happened.

All risky actions must be labelled as simulation only and must require explicit approval.

Use UK English. Use GBP for all money. Store money in integer pence internally and format it at the UI boundary. Use ISO dates internally. Use the demo data date 2026-07-03.

Tech stack:
- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react icons
- local component state and localStorage where useful
- URL query parameters for scenario state
- deterministic local finance helpers
- no external API calls

Fonts:
- Space Grotesk for display headings and brand text
- JetBrains Mono for labels, figures, chips, tool calls and dashboard numbers
- Inter for body text

Visual direction:
- dark navy cockpit background across the whole app
- pale blue-white instrument panels for the main content
- cyan and teal for healthy/normal states
- amber for warning states
- red for critical and MAYDAY states
- compact HUD chips
- thin borders
- subtle cyan glow
- strong cockpit-style shadows
- 8px panel radius
- dense operational dashboard layout
- readable, scannable finance figures
- no oversized marketing sections
- no generic white SaaS card layout
- no decorative blobs or abstract gradient-only backgrounds

Design tokens to use or approximate:

:root {
  --flight-bg: oklch(16% .04 250);
  --flight-bg-2: oklch(12% .04 260);
  --flight-panel: oklch(98.5% .01 220);
  --flight-tile: oklch(96% .015 220);
  --flight-border: oklch(86% .025 230);
  --flight-ink: oklch(20% .05 250);
  --flight-ink-muted: oklch(48% .03 250);
  --flight-hud: oklch(22% .05 245);
  --flight-hud-ink: oklch(94% .02 200);
  --flight-cyan: oklch(78% .14 200);
  --flight-teal: oklch(68% .14 185);
  --flight-amber: oklch(78% .16 75);
  --flight-red: oklch(62% .24 25);
}

Panel treatment:
- panels use a class like arcade-panel
- border: 1px solid var(--flight-border)
- border-radius: 8px
- background: var(--flight-panel)
- box shadow should combine a light inset top edge, a dark lower edge, a navy outer rim, a faint cyan glow and a deeper cockpit drop shadow
- repeated cards inside sections can be compact tiles, but avoid putting cards inside cards where possible

Global layout:
- app shell uses a dark cockpit background
- sticky top command bar
- main content max width around 1600px
- desktop layout: main dashboard column on the left and sticky Xero Co-Pilot panel on the right
- mobile layout: everything stacks vertically
- at 390px width there must be no horizontal scrolling, clipped labels or overlapping controls

Top command bar:
- compact sticky header
- logo/icon block using a lucide aviation or cockpit-like icon
- title: Runway Arcade
- subtitle: Xero Cash Flow Accelerator - Finance Co-Pilot
- status chips:
  - Systems nominal
  - Cash radar online
  - Runway watch
  - Using demo fallback
- controls:
  - Motion calm/full toggle
  - Top Gun mode OFF/ON toggle
  - Judge demo button
  - red MAYDAY button

The top command bar must feel like an instrument strip, not a marketing navigation bar.

Immediately under the header, show a demo organisation strip:
"Demo company: North London design studio - 12 staff - Xero demo organisation"

Also show a clear local state chip:
"Demo fallback - no live Xero writes"

Scenario selector:
Create scenario chips:
- Normal flight
- Payroll week
- Late customer
- Supplier pressure
- Cash squeeze

Scenario behaviour:
- selected scenario updates the URL query parameter, for example ?scenario=cash_squeeze
- selected scenario updates every dashboard section
- on initial load, read the scenario query parameter
- if the query parameter is invalid, fall back to normal_flight
- include a Share Link button that copies the current URL
- scenario labels can be friendly in the UI but ids should be stable:
  - normal_flight
  - payroll_week
  - late_customer
  - supplier_pressure
  - cash_squeeze

Build these main sections:
1. Cash Flow Accelerator / Bounty 03 overview strip
2. Fuel Gauge
3. Radar Hazards
4. Next 7 Days Forecast
5. Rescue Beacons
6. Flight Route - 7 Day Plan
7. Approval Queue
8. Approvals Audit Trail
9. Agent Run Log
10. Pinned Evidence
11. Mission Objectives
12. Live Xero Path
13. Xero API Coverage
14. Evidence Card Self-Test
15. Xero Co-Pilot

Recommended component boundaries:
- AppShell
- TopCommandBar
- DemoCompanyStrip
- ScenarioSelector
- OverviewStrip
- FuelGauge
- RadarHazards
- ForecastPanel
- RescueBeacons
- FlightRoutePlan
- ApprovalQueue
- AuditTrail
- AgentRunLog
- PinnedEvidence
- MissionObjectives
- LiveXeroPath
- ApiCoverage
- EvidenceSelfTest
- CopilotPanel
- EvidenceCard
- PersonaToggle
- TopGunToggle
- MaydayPanel or MaydayModal

Create a finance data layer:
- fixtures/scenarios.ts
- fixtures/records.ts
- lib/finance/format.ts
- lib/finance/calculations.ts
- lib/copilot/tools.ts
- lib/evidence/evidence.ts
- lib/audit/audit.ts

You may choose exact file names, but keep data, calculations, UI and co-pilot logic separated.

Data model:

type ScenarioId =
  | "normal_flight"
  | "payroll_week"
  | "late_customer"
  | "supplier_pressure"
  | "cash_squeeze";

type MoneyCents = number;

interface ScenarioFixture {
  id: ScenarioId;
  label: string;
  description: string;
  asOfDate: "2026-07-03";
  cash: {
    operatingCents: MoneyCents;
    taxReserveCents: MoneyCents;
    payrollReserveCents: MoneyCents;
    totalCashCents: MoneyCents;
    averageDailyBurnCents: MoneyCents;
    runwayWeeks: number;
  };
  forecast: {
    expectedInCents: MoneyCents;
    expectedOutCents: MoneyCents;
    netMovementCents: MoneyCents;
    runwayImpactDays: number;
    sourceLabels: string[];
  };
  hazardSummary: {
    status: "watch" | "warning" | "critical";
    dueThisWeekCount: number;
    dueThisWeekCents: MoneyCents;
    overdueBillsCount: number;
    mustPayObligationsCount: number;
  };
  rescueSummary: {
    signalCount: number;
    overdueTotalCents: MoneyCents;
    buckets: Record<"current" | "1-30" | "31-60" | "61-90" | "90+", MoneyCents>;
    suggestedRecoveryCents: MoneyCents;
  };
  route: {
    strategy: "balanced";
    cashOutCents: MoneyCents;
    preservedCents: MoneyCents;
    expectedInflowCents: MoneyCents;
    runwayImpactDays: number;
  };
}

Organisation fixture:

const organisation = {
  id: "demo-north-london-studio",
  name: "North London design studio",
  staffCount: 12,
  currency: "GBP",
  mode: "demo"
};

Scenario fixtures:

normal_flight:
- id: normal_flight
- label: Normal flight
- description: Steady trading with manageable obligations.
- asOfDate: 2026-07-03
- operatingCents: 4820000
- taxReserveCents: 2150000
- payrollReserveCents: 3600000
- totalCashCents: 10570000
- averageDailyBurnCents: 123700
- runwayWeeks: 12.2
- expectedInCents: 2359500
- expectedOutCents: 1815900
- netMovementCents: 543600
- runwayImpactDays: 4
- forecast source labels: Xero invoices - 5, Xero bills - 3, Xero payments
- hazard status: watch
- dueThisWeekCount: 2
- dueThisWeekCents: 2300000
- overdueBillsCount: 0
- mustPayObligationsCount: 2
- rescue signalCount: 2
- overdueTotalCents: 796000
- ageing buckets: current 2832500, 1-30 796000, 31-60 0, 61-90 0, 90+ 0
- suggestedRecoveryCents: 716400
- route cashOutCents: 2300000
- route preservedCents: 187400
- route expectedInflowCents: 716400
- route runwayImpactDays: 1

payroll_week:
- id: payroll_week
- label: Payroll week
- description: Monthly payroll lands in 3 days.
- asOfDate: 2026-07-03
- operatingCents: 4820000
- taxReserveCents: 2150000
- payrollReserveCents: 3600000
- totalCashCents: 10570000
- averageDailyBurnCents: 123700
- runwayWeeks: 12.2
- expectedInCents: 2359500
- expectedOutCents: 5415900
- netMovementCents: -3056400
- runwayImpactDays: -25
- forecast source labels: Xero invoices - 5, Xero bills - 5, Xero payments
- hazard status: warning
- dueThisWeekCount: 4
- dueThisWeekCents: 5287400
- overdueBillsCount: 1
- mustPayObligationsCount: 3
- rescue signalCount: 3
- overdueTotalCents: 2036000
- ageing buckets: current 2832500, 1-30 2036000, 31-60 0, 61-90 0, 90+ 0
- suggestedRecoveryCents: 1527000
- route cashOutCents: 5100000
- route preservedCents: 187400
- route expectedInflowCents: 1832400
- route runwayImpactDays: -26

late_customer:
- id: late_customer
- label: Late customer
- description: Largest customer 45 days overdue.
- asOfDate: 2026-07-03
- operatingCents: 4820000
- taxReserveCents: 2150000
- payrollReserveCents: 3600000
- totalCashCents: 10570000
- averageDailyBurnCents: 123700
- runwayWeeks: 12.2
- expectedInCents: 3229500
- expectedOutCents: 2615900
- netMovementCents: 613600
- runwayImpactDays: 5
- forecast source labels: Xero invoices - 6, Xero bills - 4, Xero payments
- hazard status: watch
- dueThisWeekCount: 3
- dueThisWeekCents: 2487400
- overdueBillsCount: 1
- mustPayObligationsCount: 3
- rescue signalCount: 4
- overdueTotalCents: 3196000
- ageing buckets: current 2832500, 1-30 796000, 31-60 2400000, 61-90 0, 90+ 0
- suggestedRecoveryCents: 2516400
- route cashOutCents: 2300000
- route preservedCents: 187400
- route expectedInflowCents: 2516400
- route runwayImpactDays: 2

supplier_pressure:
- id: supplier_pressure
- label: Supplier pressure
- description: Multiple suppliers escalating.
- asOfDate: 2026-07-03
- operatingCents: 4820000
- taxReserveCents: 2150000
- payrollReserveCents: 3600000
- totalCashCents: 10570000
- averageDailyBurnCents: 123700
- runwayWeeks: 12.2
- expectedInCents: 2359500
- expectedOutCents: 3307400
- netMovementCents: -947900
- runwayImpactDays: -8
- forecast source labels: Xero invoices - 5, Xero bills - 7, Xero payments
- hazard status: critical
- dueThisWeekCount: 3
- dueThisWeekCents: 2487400
- overdueBillsCount: 4
- mustPayObligationsCount: 3
- rescue signalCount: 3
- overdueTotalCents: 2036000
- ageing buckets: current 2832500, 1-30 2036000, 31-60 0, 61-90 0, 90+ 0
- suggestedRecoveryCents: 1527000
- route cashOutCents: 2300000
- route preservedCents: 187400
- route expectedInflowCents: 1832400
- route runwayImpactDays: -4

cash_squeeze:
- id: cash_squeeze
- label: Cash squeeze
- description: Operating cash down 40%.
- asOfDate: 2026-07-03
- operatingCents: 2892000
- taxReserveCents: 2150000
- payrollReserveCents: 3600000
- totalCashCents: 8642000
- averageDailyBurnCents: 143700
- runwayWeeks: 8.6
- expectedInCents: 2359500
- expectedOutCents: 2615900
- netMovementCents: -256400
- runwayImpactDays: -2
- forecast source labels: Xero invoices - 5, Xero bills - 4, Xero payments
- hazard status: watch
- dueThisWeekCount: 3
- dueThisWeekCents: 2487400
- overdueBillsCount: 1
- mustPayObligationsCount: 3
- rescue signalCount: 3
- overdueTotalCents: 2036000
- ageing buckets: current 2832500, 1-30 2036000, 31-60 0, 61-90 0, 90+ 0
- suggestedRecoveryCents: 1527000
- route cashOutCents: 2300000
- route preservedCents: 187400
- route expectedInflowCents: 1832400
- route runwayImpactDays: -3

Core bills:
- HMRC, bill VAT Q2 2026, due 2026-07-07, category tax, criticality critical, amountDueCents 1850000
- Regus Bermondsey, bill RENT-JUL, due 2026-07-09, category rent, criticality critical, amountDueCents 450000
- AWS, bill AWS-JUN-INV, due 2026-07-06, category software, criticality normal, delayRisk "Seat lock after 14d", amountDueCents 187400
- Payroll (July), bill PAY-2026-07, due 2026-07-06, category payroll, criticality critical, amountDueCents 2800000, only active in payroll_week
- Ravensbourne Legal, bill RB-INV-118, due 2026-07-15, category legal, criticality deferrable, delayRisk "Supplier risk: low", amountDueCents 315000

Core invoices:
- Halcyon Retail Ltd, invoice INV-2026-041, 22 days overdue, amountDueCents 1240000, likelyRecoveryCents 1116000, riskLevel medium
- Cobalt Studios, invoice INV-2026-047, 10 days overdue, amountDueCents 640000, likelyRecoveryCents 576000, riskLevel medium
- Kestrel & Co., invoice INV-2026-064, 30 days overdue, amountDueCents 156000, likelyRecoveryCents 140400, riskLevel low
- For late_customer add a large overdue invoice so the overdue total reaches GBP 31,960 and one invoice is 45 days overdue.

Money formatting:
- display whole GBP for dashboard figures unless pence are material
- format 8642000 as GBP 86,420
- show negative money clearly, for example GBP -2,564
- do not show raw pence to users

Calculations:

total_cash_cents = operating_cash_cents + tax_reserve_cents + payroll_reserve_cents

runway_days = total_cash_cents / average_daily_burn_cents
runway_weeks = runway_days / 7
Display runway weeks to one decimal place.

expected_in_cents = sum expected receipts in next 7 days
expected_out_cents = sum expected payments in next 7 days
net_movement_cents = expected_in_cents - expected_out_cents
runway_impact_days = net_movement_cents / average_daily_burn_cents
Display runway impact as rounded whole days.

Bills due this week:
- window is asOfDate through asOfDate + 7 days
- due_this_week = bills due in that window with amount due > 0
- overdue_bills = bills due before asOfDate with amount due > 0
- must_pay_obligations = due_this_week where criticality is critical

Criticality defaults:
- tax = critical
- payroll = critical
- rent = critical
- essential software = normal unless operations stop immediately
- legal/professional services = normal unless deadline-driven
- print, travel and discretionary subscriptions = deferrable

Likely recovery:
- 1 to 30 days overdue: factor 0.90
- 31 to 60 days overdue: factor 0.75
- 61 to 90 days overdue: factor 0.60
- 90+ days overdue: factor 0.40
- label likely recovery as an estimate, never a guarantee

Route plan:
- balanced route pays critical bills plus low-risk normal obligations
- balanced route delays deferrable/non-critical spend where safe
- balanced route chases material overdue invoices

route_net_effect_cents = expected_inflow_cents + preserved_cents - cash_out_cents
route_runway_impact_days = route_net_effect_cents / average_daily_burn_cents

Show clearly that preserved cash is cash not leaving during the planning window, not new money.

Section details:

Overview strip:
- title: Cash Flow Accelerator
- label: Bounty 03
- summary: "See the hazards. Plot the route. Approve the action."
- show scenario, as-of date, data mode and demo fallback status

Fuel Gauge:
- show total cash as the primary figure
- show runway in weeks as the second primary figure
- show a horizontal E to F fuel bar
- include markers at 5w, 10w and 15w
- show tiles for operating, tax reserve and payroll reserve
- show average daily burn
- show a compact 30-day sparkline or barline
- show source copy such as "checked 3 Xero-style cash accounts"
- use amber or red styling if runway approaches unsafe territory

Radar Hazards:
- show a circular radar visual with plotted dots
- show due-this-week count and amount
- show overdue bills count
- show must-pay obligations count
- list main due bills with supplier, bill number, due date, category, criticality and amount
- show badge states Watch, Warning and Critical
- use red for critical and amber for warning
- do not imply bills were paid

Next 7 Days Forecast:
- cards for expected in, expected out, net movement and runway impact
- source chips: Xero invoices, Xero bills, Xero payments
- show negative movement clearly
- explain that forecast is deterministic demo data

Rescue Beacons:
- aged receivables buckets: Current, 1-30, 31-60, 61-90, 90+
- overdue invoice rows with customer, invoice ID, overdue days, amount, likely recovery and risk level
- Chase Draft button for each material overdue invoice
- Chase Draft copies a polite payment reminder to clipboard only
- it must not send email
- show suggested recovery total
- label likely recovery as estimate

Chase draft example:
"Hi [Customer], I hope you are well. Our records show invoice [Invoice Number] for [Amount] is now [Days] days overdue. Could you confirm when payment will be made? Thanks."

Flight Route - 7 Day Plan:
- route line graphic
- summary tiles: cash out, preserved, inflow, runway impact
- three columns: Pay, Delay and Chase
- Pay column should prioritise HMRC, rent and payroll when active
- Delay column should include deferrable/non-critical bills such as Ravensbourne Legal or AWS where safe
- Chase column should include Halcyon Retail, Cobalt Studios and Kestrel & Co
- include warning strip: "Requires confirmation. No payments or chases are sent automatically."

Approval Queue:
Add action cards:
- Chase invoice - Halcyon Retail Ltd
- Chase invoice - Cobalt Studios
- Delay bill - Ravensbourne Legal
- Delay bill - AWS
- Prepare balanced payment route
- Pause discretionary spend

Each approval action card must show:
- title
- source record
- scenario
- status badge
- impact
- risk
- "Approve (simulate)" button

Clicking Approve (simulate):
- changes action status locally to simulated_approved
- creates an audit event
- does not call any external service
- shows a toast or inline confirmation that says this was simulation only
- never says "paid", "sent", "updated Xero" or "customer chased" without "simulated" context

Approvals Audit Trail:
- show event count
- search input
- scenario filter
- from date filter
- to date filter
- CSV All button
- Clear button
- list events with timestamp, action, scenario, impact, source, confirmed actions and resulting state changes
- CSV export should include timestamp, scenario, action, source, impact, status and state changes
- audit events should persist in localStorage
- Clear should only clear audit events after local confirmation or with clear labelling

Agent Run Log:
Show a read-only tool timeline:
- cash_position - checked 3 Xero bank accounts
- runway - computed 30-day average burn from Xero transactions
- open_bills - read Xero bills
- due_bills_this_week - filtered dueDate <= today + 7d
- overdue_invoices - read Xero invoices
- propose_payment_route - ranked pay, delay and chase actions

Add a Replay button if practical. Replay should only animate or re-list local tool activity. It must not call external services.

Pinned Evidence:
- evidence cards from co-pilot responses have pin buttons
- pinned evidence appears in this section
- include search/filter for pinned cards if simple
- pinned evidence can persist in localStorage

Mission Objectives:
Show objective rows with status:
- Keep runway above 6 weeks
- Collect overdue invoices
- Pay critical bills without breaching reserve
- Reduce overdue receivables

Statuses:
- passed
- warning
- critical

Live Xero Path:
Show the future production path:
1. Xero OAuth
2. Xero API Adapter
3. Finance Helpers
4. AI Tool Calls
5. Approval Queue
6. Audit Trail

Use demo copy:
- "Adapter-ready"
- "Demo fallback active"
- "No live Xero writes"
- "Production OAuth and encrypted token storage required"

It is acceptable for the status to show connection unavailable because this is a local demo.

Xero API Coverage:
Create compact cards for:
- Invoices
- Bills
- Contacts
- Payments
- Bank accounts / feeds
- Reports
- Aged Receivables
- Aged Payables

Each card should state read readiness and what it would support in production. Avoid claiming live integration is active.

Evidence Card Self-Test:
- Run Tests button
- tests that friendly labels render
- tests that internal field names do not appear
- specifically check that expectedInCents, expectedOutCents, windowDays, balanceCents and raw prompt text are not visible in evidence cards
- show pass/fail results

Xero Co-Pilot:
- right-side sticky panel on desktop
- stacked near the top or after core dashboard on mobile
- header: Xero Co-Pilot
- status: Cashflow comms online
- clear conversation button
- persona toggle: Professional / Tiger Mum
- Top Gun mode should also affect tone if enabled
- empty state text: Awaiting transmission
- quick prompts:
  - Run cash radar
  - How much fuel remains?
  - Who is sending rescue cash?
  - What hazards are due this week?
  - Plot a safe payment route
  - Start MAYDAY diagnosis
- textarea placeholder: Transmit to Co-Pilot...
- send button

Co-pilot behaviour:
- deterministic local simulation only
- classify free text into supported intents:
  - cash position
  - runway
  - bills due
  - overdue invoices
  - forecast
  - payment route
  - crisis diagnosis
  - audit lookup
  - unsupported request
- unsupported requests should be answered plainly and safely, for example:
  "I cannot execute that payment from this MVP. I can show the proposed route and approval simulation instead."

Co-pilot response structure:
1. User question or selected preset
2. Tool calls with status
3. Evidence cards
4. Headline answer
5. Context
6. Risks
7. Recommended actions
8. Approval requirement for any action

Tool registry:
- cash_position: total cash, account split, confidence
- runway: weeks, days, average daily burn
- seven_day_forecast: expected in, expected out, net movement, runway impact
- overdue_invoices: customers, invoice numbers, overdue days, amount, likely recovery
- due_bills_this_week: suppliers, bill numbers, due dates, criticality, amounts
- propose_payment_route: cash out, preserved cash, expected inflow, runway impact, proposed actions
- cash_crisis_plan: conservative, balanced and aggressive routes with recommendation status

For the quick prompt "Run cash radar":
- show tool calls for cash_position, runway, seven_day_forecast and overdue_invoices
- show evidence cards for cash position, runway, seven-day forecast and overdue invoices
- headline must mention the selected scenario's runway and near-term pressure
- include concise risks and recommended actions
- include explicit approval requirement

Evidence cards:
- friendly title
- primary value
- confidence level high/medium/low
- tool name
- source references when available
- short row labels and formatted values
- pin button

Evidence cards must not include:
- raw prompt text
- hidden scoring features
- token or OAuth data
- internal field names such as expectedInCents
- unformatted pence values

Guardrails:
- Do not claim an action has been sent, paid or written to Xero unless a verified production write event exists.
- Do not provide unsupported certainty about collection probability.
- Do not hide assumptions behind confident wording.
- Do not expose raw internal field names in user evidence.
- Do not recommend delaying critical tax, payroll or rent without clear risk language.
- Do not use financial advice wording that implies guaranteed outcomes.
- Always distinguish demo data, simulation state and live Xero state.

Approval-aware phrases to use:
- "I can draft..."
- "This route requires confirmation."
- "No payments or chases are sent automatically."
- "Simulation approved."
- "Approval first, action second."

Phrases to avoid:
- "Payment sent."
- "Customer chased."
- "Xero has been updated."
- "Guaranteed recovery."

MAYDAY mode:
- red urgent mode
- can be opened by the MAYDAY button or Start MAYDAY diagnosis prompt
- compare conservative, balanced and aggressive routes
- show cash out, preserved cash, expected inflow and runway impact for each route
- recommend the balanced route unless data makes another route safer
- show explicit "Simulation only" and "Requires confirmation"
- do not override approval gates

Judge demo button:
- switches scenario to cash_squeeze
- runs the Run cash radar co-pilot response
- optionally opens or highlights MAYDAY diagnosis
- highlights the agent run log or evidence area briefly
- does not trigger external actions

Motion toggle:
- calm/full changes animation intensity only
- it must not change calculations, data, audit events or co-pilot answers

Top Gun mode:
- optional tone layer
- aviation language such as "runway first", "tower clearance required", "rescue beacon"
- must not change calculations
- must not weaken safety language
- must not imply real actions happened

Tiger Mum mode:
- optional stricter co-pilot tone
- label: Tiger Mum Mode
- persona name: Auntie Mei
- default off, professional tone by default
- store selected tone in localStorage key runway-arcade.copilot-persona.v1
- Auntie Mei is an Asian-British former family-business operator and bookkeeper
- tone is strict, warm, practical, funny about cashflow behaviour and evidence-led
- no fake accent
- no ethnic caricature
- no jokes about ethnicity
- no shame-based language
- persona must never override finance guardrails, evidence requirements or approval gates

Tiger Mum style examples:
- "Cash is oxygen. We protect oxygen."
- "We do not guess with payroll."
- "Chase the money that is already yours."
- "Approval first, action second."
- "This invoice has been relaxing long enough."
- "The bank account does not accept optimism as payment."
- "Supplier pressure is not a cashflow strategy."

Keep Tiger Mum flavour to one short line after the evidence-backed answer. Do not let the persona replace the answer.

Accessibility:
- all buttons keyboard reachable
- icon-only buttons have aria-labels and titles/tooltips
- form fields have labels or accessible names
- colour is not the only signal for risk
- mobile tap targets are usable
- text does not overflow buttons or cards
- dashboard values remain readable at 390px width

Local storage:
- selected persona
- motion preference
- optional Top Gun mode preference
- audit events
- pinned evidence
- approved action statuses

Safety copy to place near action surfaces:
- "Simulation only"
- "No writes to Xero"
- "No payments or chases are sent automatically"
- "Requires confirmation"
- "Demo fallback active"

Acceptance checks:
- cash_squeeze shows GBP 86,420 total cash
- cash_squeeze shows 8.6 weeks runway
- cash_squeeze forecast net movement is GBP -2,564
- cash_squeeze expected out is GBP 26,159
- cash_squeeze due this week is 3 bills and GBP 24,874
- payroll_week includes GBP 28,000 payroll obligation
- payroll_week expected out is GBP 54,159
- payroll_week runway impact is -25 days
- late_customer shows 4 rescue signals
- late_customer shows GBP 31,960 overdue receivables
- supplier_pressure shows 4 overdue bills
- supplier_pressure hazard status is Critical
- changing scenario updates Fuel Gauge, Radar Hazards, Forecast, Rescue Beacons, Flight Route, Approval Queue, Mission Objectives and Co-Pilot evidence
- Share Link copies the current scenario URL
- Chase Draft copies text but does not send an email
- Approve (simulate) creates an audit event
- audit search and scenario/date filters work
- CSV All exports audit events
- evidence pinning works
- Evidence Card Self-Test can pass
- co-pilot Run cash radar returns tool-call rows and evidence cards
- no UI claims a real Xero write occurred
- no runtime console errors
- no horizontal overflow at 390px width

Final implementation notes:
- Prefer clean editable source over a pixel-perfect imitation of the deployed bundle.
- Keep the app dense and operational.
- Keep all calculations deterministic.
- Keep all AI/co-pilot responses local and reproducible.
- Keep every action simulation-only.
- Do not remove working features while polishing style.
```

## Follow-Up Repair Prompts

Use these only if the first Lovable build drifts.

### If Lovable Builds A Landing Page

```text
Replace the landing page with the working Runway Arcade dashboard. The first screen must be the product UI: sticky command bar, scenario selector, Fuel Gauge, Radar Hazards, Forecast, Rescue Beacons, Flight Route, Approval Queue, Audit Trail and sticky Xero Co-Pilot panel. Do not add marketing sections. Keep all values fixture-driven.
```

### If The Visual Style Is Too Generic

```text
Restyle the app to match the Runway Arcade cockpit feel: dark navy outer background, pale instrument panels, compact HUD chips, JetBrains Mono figures, Space Grotesk headings, cyan panel glow, amber warnings and red MAYDAY states. Keep the dashboard dense and operational. Do not create a generic white SaaS layout.
```

### If The Data Does Not Match

```text
Fix the data layer. All scenario values must come from one fixture object and all dashboard sections must read from it. Verify cash_squeeze shows GBP 86,420 and 8.6 weeks, payroll_week includes GBP 28,000 payroll and GBP 54,159 expected out, late_customer shows 4 rescue signals and GBP 31,960 overdue, and supplier_pressure shows 4 overdue bills with Critical hazard status.
```

### If Safety Language Is Missing

```text
Add explicit safety language across the app. This is a demo with no live Xero writes, no payments and no emails. Buttons must say Approve (simulate). Chase Draft copies text only. Audit entries must say simulated approval or local demo state. Remove any wording that says payment sent, customer chased or Xero updated.
```

### If Mobile Layout Breaks

```text
Fix the responsive layout. At 390px width there must be no horizontal scrolling, no overlapping text and no clipped buttons. Stack the dashboard and Co-Pilot panel vertically, wrap scenario chips, keep cards readable and reduce compact labels where needed without removing functionality.
```

### If Co-Pilot Output Is Ungrounded

```text
Make every co-pilot response evidence-backed. Each answer with numbers must show tool calls and evidence cards first. Route recommendations must show cash out, preserved cash, expected inflow and runway impact. Every recommended action must require approval. Do not show internal field names such as expectedInCents or balanceCents.
```
