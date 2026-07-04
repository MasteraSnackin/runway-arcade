# Lovable Rebuild Pack

Project: `Runway Arcade - Xero Finance Co-Pilot`

Purpose: a practical pack for recreating the observed Lovable preview in a new Lovable project if the preview link, token, or local mirror stops being usable.

Current source inspected: `https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm`

Current deployed revision: `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`

Earlier source inspected during setup: `https://lovable.dev/preview/8MIGZbXsIhyYDnbqNN0H8AoLjBzeUR22`

Local corroboration: `runway-arcade-local/`

Inspection dates: 2026-07-03 and 2026-07-04

## What This Pack Is

This is not the original editable Lovable source. It is a rebuild guide based on the deployed preview and the local deployed bundle mirror.

Use this file when you need to paste clear instructions into Lovable. It includes:

- staged Lovable prompts
- one-shot rebuild prompt
- fixture data contract
- component inventory
- visual rules
- interaction requirements
- acceptance checklist
- repair prompts for follow-up Lovable iterations

## Known Unknowns

- The original editable source repository was not available from the preview.
- The exact original component boundaries are inferred from the rendered app.
- `normal_flight` data is partly inferred because the inspected preview behaved like it remained in a cash-squeeze state when clicking Normal Flight.
- Real Xero OAuth scopes, tenant handling, data retention, roles, and production write policies are not confirmed.
- Any production Xero integration must be checked against current Xero developer documentation before implementation.

## Recommended Lovable Workflow

Use the staged prompts first. Lovable tends to do better when the build is created in passes.

1. Prompt A: build the application shell, design system and layout.
2. Prompt B: add fixture data and dashboard sections.
3. Prompt C: add co-pilot, approvals, audit trail and evidence pinning.
4. Prompt D: polish responsiveness, accessibility and QA.
5. If the result drifts, use one of the repair prompts near the end of this file.

Do not start with a landing page. The first screen should be the working dashboard.

## Prompt A - App Shell And Design System

```text
Build a React + TypeScript + Vite web app called "Runway Arcade - Xero Finance Co-Pilot".

Use the product subtitle "Xero Cash Flow Accelerator - Finance Co-Pilot" in the header.

Create the first screen as the actual working product dashboard, not a landing page.

The product is a playful but credible Xero-style finance co-pilot for a small UK business. It uses a flight cockpit metaphor:
- cash is fuel
- runway is weeks remaining
- bills are radar hazards
- overdue invoices are rescue beacons
- payment planning is a flight route
- urgent diagnosis is MAYDAY mode

Use Tailwind CSS and lucide-react icons.

Visual style:
- dark navy cockpit background
- pale blue-white instrument panels
- cyan and teal for normal/positive states
- amber for warnings
- red for critical/MAYDAY states
- compact arcade/HUD details
- no marketing hero page
- no generic SaaS cards-on-white landing page

Fonts:
- Space Grotesk for brand/display headings
- JetBrains Mono for labels, numbers and HUD copy
- Inter for body text

Layout:
- Cash Flow Accelerator / Bounty 03 overview strip
- sticky top command bar
- main dashboard column on the left
- sticky Xero Co-Pilot panel on the right on desktop
- stacked layout on mobile
- panels should have 8px radius, thin borders, subtle glow and strong cockpit-style shadow

Top command bar content:
- logo/icon block
- title: Runway Arcade
- subtitle: Xero Cash Flow Accelerator - Finance Co-Pilot
- chips: Systems nominal, Cash radar online, Runway watch, Xero status/demo fallback
- Motion: calm/full toggle
- Judge demo button
- red MAYDAY button
- Top Gun mode off/on toggle

Below the top bar, add a demo company strip:
"Demo company: North London design studio - 12 staff - Xero demo organisation"

Add a scenario selector with chips:
- Normal flight
- Payroll week
- Late customer
- Supplier pressure
- Cash squeeze

For now, stub the dashboard sections with accurate headings and empty content areas. Use these section headings:
- Fuel Gauge
- Radar Hazards
- Next 7 Days Forecast
- Rescue Beacons
- Flight Route - 7 Day Plan
- Approval Queue
- Approvals Audit Trail
- Agent Run Log
- Pinned Evidence
- Mission Objectives
- Live Xero Path
- Xero API Coverage
- Evidence Card Self-Test
- Xero Co-Pilot

Create component files for each major section. Keep the code clean and data-driven so fixture data can be added in the next prompt.
```

## Prompt B - Fixture Data And Dashboard Sections

```text
Now add the deterministic local demo data and make the dashboard sections real.

Important:
- This is demo data only.
- Do not connect to Xero.
- Do not perform any external writes.
- Use integer cents internally and format user-facing money as GBP with pound symbols.
- Use the app data date 2026-07-03.

Create fixture data for:
- organisation
- scenarios
- cash accounts
- invoices
- bills
- forecasts
- route plans
- proposed actions
- seed audit events
- evidence card examples

Implement scenario switching. Changing scenario must update the URL query parameter and all dashboard values.

Dashboard requirements:

Fuel Gauge:
- show total cash
- show runway in weeks
- show a horizontal fuel bar from E to F with 5w, 10w and 15w markers
- show operating, tax reserve and payroll reserve tiles
- show average daily burn
- show a compact 30-day sparkline

Radar Hazards:
- show a circular radar visual with plotted dots
- show due-this-week count and amount
- show overdue bills count
- show must-pay obligations count
- list the main due bills as compact rows
- use Watch, Warning or Critical badge based on scenario

Next 7 Days Forecast:
- cards for expected in, expected out, net movement and runway impact
- source chips for Xero invoices, Xero bills and Xero payments

Rescue Beacons:
- aged receivables buckets: Current, 1-30, 31-60, 61-90, 90+
- overdue invoice rows with customer, invoice ID, overdue days, amount and likely recovery
- Chase Draft buttons that copy a polite payment reminder to the clipboard without sending anything
- suggested recovery total

Flight Route - 7 Day Plan:
- route line graphic
- summary tiles: cash out, preserved, inflow, runway impact
- three columns: Pay, Delay and Chase
- warning strip: "Requires confirmation. No payments or chases are sent automatically."

Use these observed cash_squeeze values:
- total cash: GBP 86,420
- runway: 8.6 weeks
- operating: GBP 28,920
- tax reserve: GBP 21,500
- payroll reserve: GBP 36,000
- average daily burn: GBP 1,437
- expected in: GBP 23,595
- expected out: GBP 26,159
- net movement: GBP -2,564
- runway impact: -2 days
- due this week: 3 bills, GBP 24,874
- overdue bills: 1
- must-pay obligations: 3
- route cash out: GBP 23,000
- route preserved: GBP 1,874
- route inflow: GBP 18,324
- route runway impact: -3 days

Use these key records:
- HMRC, VAT Q2 2026, due 2026-07-07, tax, critical, GBP 18,500
- Regus Bermondsey, RENT-JUL, due 2026-07-09, rent, critical, GBP 4,500
- AWS, AWS-JUN-INV, due 2026-07-06, software, GBP 1,874
- Halcyon Retail Ltd, INV-2026-041, 22d overdue, GBP 12,400, likely GBP 11,160
- Cobalt Studios, INV-2026-047, 10d overdue, GBP 6,400, likely GBP 5,760
- Kestrel & Co., INV-2026-064, 30d overdue, GBP 1,560, likely GBP 1,404

Scenario variations:
- Payroll week adds Payroll (July), PAY-2026-07, due 2026-07-06, payroll, critical, GBP 28,000. Expected out becomes GBP 54,159 and runway impact becomes -25 days.
- Late customer increases rescue beacons to 4 signals and GBP 31,960 overdue. Expected in becomes GBP 32,295 and net movement becomes GBP +6,136.
- Supplier pressure increases overdue bills to 4, expected out to GBP 33,074, net movement to GBP -9,479, and hazard badge to Critical.
- Normal flight should feel calmer than cash squeeze. Use inferred values: total cash GBP 105,700, runway 12.2 weeks, expected out lower than expected in, no critical overdue bill pressure.
```

## Prompt C - Co-Pilot, Approvals And Audit

```text
Now implement the right-side Xero Co-Pilot panel, approval queue, audit trail, pinned evidence and self-test.

Safety requirements:
- No real Xero writes.
- No real emails.
- No real payments.
- Every money movement or customer chase must be described as simulation only.
- Use clear labels: "Simulation only", "No writes to Xero", "Read-only", and "Requires confirmation".

Xero Co-Pilot panel:
- sticky on desktop
- header: Xero Co-Pilot
- status: Cashflow comms online
- clear conversation button
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

Make responses deterministic local simulations.

For "Run cash radar", show:
- a tool call block with cash_position, runway, seven_day_forecast and overdue_invoices
- evidence cards for cash position, runway, seven-day forecast and overdue invoices
- a headline summary
- context
- risks
- recommended actions

Evidence cards:
- show friendly labels only
- never expose internal field names like expectedInCents, expectedOutCents, windowDays, balanceCents or prompt text
- include confidence: high, medium or low
- each evidence card has a pin button
- pinned evidence appears in the Pinned Evidence dashboard section

Approval Queue:
Add simulated actions:
- Chase invoice - Halcyon Retail Ltd
- Chase invoice - Cobalt Studios
- Delay bill - Ravensbourne Legal
- Delay bill - AWS
- Prepare balanced payment route
- Pause discretionary spend

Each action card must show:
- title
- source record
- status badge
- impact
- risk
- Approve (simulate) button

Clicking Approve (simulate):
- changes the action status locally
- creates an audit event
- does not call any external service
- shows a toast confirming this was a simulation

Approvals Audit Trail:
- show count
- search input
- scenario filter
- from and to date filters
- CSV All button
- Clear button
- list events with action, scenario, impact, source, confirmed actions, resulting state changes and timestamp

Agent Run Log:
Show read-only rows:
- cash_position - checked 3 Xero bank accounts
- runway - computed 30-day average burn from Xero transactions
- open_bills - read Xero bills
- due_bills_this_week - filtered dueDate <= today + 7d
- overdue_invoices - read Xero invoices
- propose_payment_route - ranked pay, delay and chase actions

Mission Objectives:
- Keep runway above 6 weeks
- Collect overdue invoices
- Pay critical bills without breaching reserve
- Reduce overdue receivables

Live Xero Path:
Show a demo production-readiness flow:
- Xero OAuth
- Xero API Adapter
- Finance Helpers
- AI Tool Calls
- Approval Queue
- Audit Trail
The status can show Connecting then Fail because this is demo-only.

Xero API Coverage:
Create cards for:
- Invoices
- Bills
- Contacts
- Payments
- Bank accounts / feeds
- Reports
- Aged Receivables
- Aged Payables

Evidence Card Self-Test:
- Run Tests button
- checks that friendly labels render
- checks that internal field names are not visible
```

## Prompt D - Polish, Responsiveness And QA

```text
Polish the app so it matches the Runway Arcade preview quality.

Fix the design:
- dark cockpit background must surround the whole app
- pale instrument panels must be readable
- panel borders should have a cyan arcade glow and strong cockpit shadow
- top bar must feel like a command strip
- numbers should use JetBrains Mono
- headings should use Space Grotesk
- buttons and chips should stay compact
- avoid generic SaaS styling

Fix responsiveness:
- desktop uses two columns: dashboard and sticky co-pilot
- mobile stacks all sections
- scenario chips wrap without overflow
- no horizontal scrolling at 390px width
- text must not overflow buttons or cards

Fix interactions:
- scenario switching updates all values and URL query param
- Share Link copies the current scenario URL
- Chase Draft copies a draft but does not send
- Approve (simulate) adds audit events
- CSV All exports audit events
- Clear only clears the intended local state
- Evidence pinning works
- Run Tests updates self-test status

Run a manual QA pass against these checks:
- cash_squeeze shows GBP 86,420 total cash and 8.6 weeks runway
- payroll_week includes GBP 28,000 payroll obligation
- late_customer shows 4 rescue signals and GBP 31,960 overdue
- supplier_pressure shows Critical hazards and 4 overdue bills
- co-pilot Run cash radar returns tool calls and evidence cards
- no UI claims a real Xero write occurred
- mobile layout is usable

Do not remove working features while fixing style or layout.
```

## One-Shot Full Prompt

Use this only if staged prompting is not possible.

```text
Build a complete React + TypeScript + Vite web app called "Runway Arcade - Xero Finance Co-Pilot".

The app is a playable demo of a Xero-style finance co-pilot for a small UK business. It should look like an arcade flight cockpit but behave like a serious cashflow operations dashboard.

The dashboard must be the first screen. Do not create a marketing landing page.

Use:
- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react icons
- Space Grotesk for headings
- JetBrains Mono for labels and numbers
- Inter for body text

Core metaphor:
- cash = fuel
- runway = weeks remaining
- bills = radar hazards
- overdue invoices = rescue beacons
- payment plan = flight route
- urgent recovery = MAYDAY mode

Visual style:
- dark navy cockpit background
- pale blue-white panels
- cyan/teal normal and positive accents
- amber warning accents
- red critical/MAYDAY accents
- compact HUD chips
- 8px panel radius
- thin panel borders with subtle cyan glow
- strong cockpit shadow
- no generic SaaS hero section

Top command bar:
- Runway Arcade logo/title
- subtitle: Xero Finance Co-Pilot
- chips: Systems nominal, Cash radar online, Runway watch, Demo Xero data
- Motion: calm/full toggle
- Judge demo button
- red MAYDAY button
- Top Gun mode toggle

Demo banner:
"Demo company: North London design studio - 12 staff - Xero demo organisation"

Scenarios:
- Normal flight
- Payroll week
- Late customer
- Supplier pressure
- Cash squeeze

Scenario switching must update all dashboard values and the URL query parameter.

Build sections:
- Fuel Gauge
- Radar Hazards
- Next 7 Days Forecast
- Rescue Beacons
- Flight Route - 7 Day Plan
- Approval Queue
- Approvals Audit Trail
- Agent Run Log
- Pinned Evidence
- Mission Objectives
- Live Xero Path
- Xero API Coverage
- Evidence Card Self-Test
- Xero Co-Pilot

Use deterministic local fixture data only. Do not connect to Xero and do not perform external writes.

Use these cash_squeeze values:
- total cash GBP 86,420
- runway 8.6 weeks
- operating GBP 28,920
- tax reserve GBP 21,500
- payroll reserve GBP 36,000
- average daily burn GBP 1,437
- expected in GBP 23,595
- expected out GBP 26,159
- net movement GBP -2,564
- runway impact -2 days
- due this week 3 bills, GBP 24,874
- overdue bills 1
- must-pay obligations 3
- route cash out GBP 23,000
- route preserved GBP 1,874
- route inflow GBP 18,324
- route runway impact -3 days

Bills:
- HMRC, VAT Q2 2026, due 2026-07-07, tax, critical, GBP 18,500
- Regus Bermondsey, RENT-JUL, due 2026-07-09, rent, critical, GBP 4,500
- AWS, AWS-JUN-INV, due 2026-07-06, software, GBP 1,874
- Payroll (July), PAY-2026-07, due 2026-07-06, payroll, critical, GBP 28,000, used in payroll_week
- Ravensbourne Legal, RB-INV-118, due 2026-07-15, legal, deferrable, GBP 3,150

Invoices:
- Halcyon Retail Ltd, INV-2026-041, 22d overdue, GBP 12,400, likely recovery GBP 11,160
- Cobalt Studios, INV-2026-047, 10d overdue, GBP 6,400, likely recovery GBP 5,760
- Kestrel & Co., INV-2026-064, 30d overdue, GBP 1,560, likely recovery GBP 1,404

Right-side Xero Co-Pilot:
- sticky desktop panel
- header: Xero Co-Pilot
- status: Cashflow comms online
- clear button
- empty state: Awaiting transmission
- quick prompts: Run cash radar, How much fuel remains?, Who is sending rescue cash?, What hazards are due this week?, Plot a safe payment route, Start MAYDAY diagnosis
- textarea placeholder: Transmit to Co-Pilot...
- deterministic responses

Co-pilot responses must show:
- tool calls
- evidence cards
- headline
- context
- risks
- recommended actions

Evidence cards must only show friendly labels and formatted values. Never show internal field names such as expectedInCents, expectedOutCents, windowDays, balanceCents or prompt text.

Approvals:
- actions are simulation only
- no real Xero writes
- no real payments
- no real emails
- Approve (simulate) updates local state and audit trail only

Approval queue actions:
- Chase invoice - Halcyon Retail Ltd
- Chase invoice - Cobalt Studios
- Delay bill - Ravensbourne Legal
- Delay bill - AWS
- Prepare balanced payment route
- Pause discretionary spend

Audit trail:
- search
- scenario filter
- date range
- CSV export
- clear
- event list with action, source, impact, confirmed actions, state changes and timestamp

Add an evidence card self-test panel with a Run Tests button that confirms friendly labels render and internal field names do not.

Acceptance checks:
- cash_squeeze shows GBP 86,420 and 8.6 weeks
- payroll_week adds GBP 28,000 payroll
- late_customer shows 4 rescue signals and GBP 31,960 overdue
- supplier_pressure shows Critical and 4 overdue bills
- co-pilot Run cash radar returns tool calls and evidence cards
- no UI claims a real Xero write occurred
- mobile layout works at 390px width
```

## Fixture Data Contract

This is the minimum data shape to give Lovable if it starts inventing inconsistent values.

```ts
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
```

## Fixture Values

```ts
export const organisation = {
  id: "demo-north-london-studio",
  name: "North London design studio",
  staffCount: 12,
  currency: "GBP",
  mode: "demo"
};

export const scenarios = {
  normal_flight: {
    id: "normal_flight",
    label: "Normal flight",
    description: "Steady trading with manageable obligations.",
    asOfDate: "2026-07-03",
    cash: {
      operatingCents: 4820000,
      taxReserveCents: 2150000,
      payrollReserveCents: 3600000,
      totalCashCents: 10570000,
      averageDailyBurnCents: 123700,
      runwayWeeks: 12.2
    },
    forecast: {
      expectedInCents: 2359500,
      expectedOutCents: 1815900,
      netMovementCents: 543600,
      runwayImpactDays: 4,
      sourceLabels: ["Xero invoices - 5", "Xero bills - 3", "Xero payments"]
    },
    hazardSummary: {
      status: "watch",
      dueThisWeekCount: 2,
      dueThisWeekCents: 2300000,
      overdueBillsCount: 0,
      mustPayObligationsCount: 2
    },
    rescueSummary: {
      signalCount: 2,
      overdueTotalCents: 796000,
      buckets: {
        current: 2832500,
        "1-30": 796000,
        "31-60": 0,
        "61-90": 0,
        "90+": 0
      },
      suggestedRecoveryCents: 716400
    },
    route: {
      strategy: "balanced",
      cashOutCents: 2300000,
      preservedCents: 187400,
      expectedInflowCents: 716400,
      runwayImpactDays: 1
    }
  },
  payroll_week: {
    id: "payroll_week",
    label: "Payroll week",
    description: "Monthly payroll lands in 3 days.",
    asOfDate: "2026-07-03",
    cash: {
      operatingCents: 4820000,
      taxReserveCents: 2150000,
      payrollReserveCents: 3600000,
      totalCashCents: 10570000,
      averageDailyBurnCents: 123700,
      runwayWeeks: 12.2
    },
    forecast: {
      expectedInCents: 2359500,
      expectedOutCents: 5415900,
      netMovementCents: -3056400,
      runwayImpactDays: -25,
      sourceLabels: ["Xero invoices - 5", "Xero bills - 5", "Xero payments"]
    },
    hazardSummary: {
      status: "warning",
      dueThisWeekCount: 4,
      dueThisWeekCents: 5287400,
      overdueBillsCount: 1,
      mustPayObligationsCount: 3
    },
    rescueSummary: {
      signalCount: 3,
      overdueTotalCents: 2036000,
      buckets: {
        current: 2832500,
        "1-30": 2036000,
        "31-60": 0,
        "61-90": 0,
        "90+": 0
      },
      suggestedRecoveryCents: 1527000
    },
    route: {
      strategy: "balanced",
      cashOutCents: 5100000,
      preservedCents: 187400,
      expectedInflowCents: 1832400,
      runwayImpactDays: -26
    }
  },
  late_customer: {
    id: "late_customer",
    label: "Late customer",
    description: "Largest customer 45 days overdue.",
    asOfDate: "2026-07-03",
    cash: {
      operatingCents: 4820000,
      taxReserveCents: 2150000,
      payrollReserveCents: 3600000,
      totalCashCents: 10570000,
      averageDailyBurnCents: 123700,
      runwayWeeks: 12.2
    },
    forecast: {
      expectedInCents: 3229500,
      expectedOutCents: 2615900,
      netMovementCents: 613600,
      runwayImpactDays: 5,
      sourceLabels: ["Xero invoices - 6", "Xero bills - 4", "Xero payments"]
    },
    hazardSummary: {
      status: "watch",
      dueThisWeekCount: 3,
      dueThisWeekCents: 2487400,
      overdueBillsCount: 1,
      mustPayObligationsCount: 3
    },
    rescueSummary: {
      signalCount: 4,
      overdueTotalCents: 3196000,
      buckets: {
        current: 2832500,
        "1-30": 796000,
        "31-60": 2400000,
        "61-90": 0,
        "90+": 0
      },
      suggestedRecoveryCents: 2516400
    },
    route: {
      strategy: "balanced",
      cashOutCents: 2300000,
      preservedCents: 187400,
      expectedInflowCents: 2516400,
      runwayImpactDays: 2
    }
  },
  supplier_pressure: {
    id: "supplier_pressure",
    label: "Supplier pressure",
    description: "Multiple suppliers escalating.",
    asOfDate: "2026-07-03",
    cash: {
      operatingCents: 4820000,
      taxReserveCents: 2150000,
      payrollReserveCents: 3600000,
      totalCashCents: 10570000,
      averageDailyBurnCents: 123700,
      runwayWeeks: 12.2
    },
    forecast: {
      expectedInCents: 2359500,
      expectedOutCents: 3307400,
      netMovementCents: -947900,
      runwayImpactDays: -8,
      sourceLabels: ["Xero invoices - 5", "Xero bills - 7", "Xero payments"]
    },
    hazardSummary: {
      status: "critical",
      dueThisWeekCount: 3,
      dueThisWeekCents: 2487400,
      overdueBillsCount: 4,
      mustPayObligationsCount: 3
    },
    rescueSummary: {
      signalCount: 3,
      overdueTotalCents: 2036000,
      buckets: {
        current: 2832500,
        "1-30": 2036000,
        "31-60": 0,
        "61-90": 0,
        "90+": 0
      },
      suggestedRecoveryCents: 1527000
    },
    route: {
      strategy: "balanced",
      cashOutCents: 2300000,
      preservedCents: 187400,
      expectedInflowCents: 1832400,
      runwayImpactDays: -4
    }
  },
  cash_squeeze: {
    id: "cash_squeeze",
    label: "Cash squeeze",
    description: "Operating cash down 40%.",
    asOfDate: "2026-07-03",
    cash: {
      operatingCents: 2892000,
      taxReserveCents: 2150000,
      payrollReserveCents: 3600000,
      totalCashCents: 8642000,
      averageDailyBurnCents: 143700,
      runwayWeeks: 8.6
    },
    forecast: {
      expectedInCents: 2359500,
      expectedOutCents: 2615900,
      netMovementCents: -256400,
      runwayImpactDays: -2,
      sourceLabels: ["Xero invoices - 5", "Xero bills - 4", "Xero payments"]
    },
    hazardSummary: {
      status: "watch",
      dueThisWeekCount: 3,
      dueThisWeekCents: 2487400,
      overdueBillsCount: 1,
      mustPayObligationsCount: 3
    },
    rescueSummary: {
      signalCount: 3,
      overdueTotalCents: 2036000,
      buckets: {
        current: 2832500,
        "1-30": 2036000,
        "31-60": 0,
        "61-90": 0,
        "90+": 0
      },
      suggestedRecoveryCents: 1527000
    },
    route: {
      strategy: "balanced",
      cashOutCents: 2300000,
      preservedCents: 187400,
      expectedInflowCents: 1832400,
      runwayImpactDays: -3
    }
  }
} satisfies Record<ScenarioId, ScenarioFixture>;
```

## Core Records

```ts
export const bills = [
  {
    id: "bill-hmrc-vat-q2-2026",
    supplier: "HMRC",
    billNumber: "VAT Q2 2026",
    dueDate: "2026-07-07",
    category: "tax",
    criticality: "critical",
    amountDueCents: 1850000
  },
  {
    id: "bill-regus-rent-jul",
    supplier: "Regus Bermondsey",
    billNumber: "RENT-JUL",
    dueDate: "2026-07-09",
    category: "rent",
    criticality: "critical",
    amountDueCents: 450000
  },
  {
    id: "bill-aws-jun-inv",
    supplier: "AWS",
    billNumber: "AWS-JUN-INV",
    dueDate: "2026-07-06",
    category: "software",
    criticality: "normal",
    delayRisk: "Seat lock after 14d",
    amountDueCents: 187400
  },
  {
    id: "bill-payroll-july",
    supplier: "Payroll (July)",
    billNumber: "PAY-2026-07",
    dueDate: "2026-07-06",
    category: "payroll",
    criticality: "critical",
    amountDueCents: 2800000
  },
  {
    id: "bill-ravensbourne-legal",
    supplier: "Ravensbourne Legal",
    billNumber: "RB-INV-118",
    dueDate: "2026-07-15",
    category: "legal",
    criticality: "deferrable",
    delayRisk: "Supplier risk: low",
    amountDueCents: 315000
  }
];

export const invoices = [
  {
    id: "invoice-halcyon-041",
    customer: "Halcyon Retail Ltd",
    invoiceNumber: "INV-2026-041",
    daysOverdue: 22,
    amountDueCents: 1240000,
    likelyRecoveryCents: 1116000,
    riskLevel: "medium"
  },
  {
    id: "invoice-cobalt-047",
    customer: "Cobalt Studios",
    invoiceNumber: "INV-2026-047",
    daysOverdue: 10,
    amountDueCents: 640000,
    likelyRecoveryCents: 576000,
    riskLevel: "medium"
  },
  {
    id: "invoice-kestrel-064",
    customer: "Kestrel & Co.",
    invoiceNumber: "INV-2026-064",
    daysOverdue: 30,
    amountDueCents: 156000,
    likelyRecoveryCents: 140400,
    riskLevel: "low"
  }
];
```

## Component Inventory

Create or keep these components. The names are suggested; exact names may vary if the implementation is clean.

| Component | Responsibility |
| --- | --- |
| `AppShell` | Top-level layout, background, responsive grid. |
| `TopCommandBar` | Brand, status chips, motion toggle, judge demo, MAYDAY. |
| `DemoCompanyStrip` | Organisation context. |
| `ScenarioSelector` | Scenario chips and share link. |
| `FuelGauge` | Cash, runway, reserves, fuel bar, burn sparkline. |
| `RadarHazards` | Radar visual, due bills, criticality summary. |
| `ForecastPanel` | Seven-day in/out/net/runway impact. |
| `RescueBeacons` | Aged receivables and chase draft controls. |
| `FlightRoutePlan` | Payment route, pay/delay/chase columns. |
| `ApprovalQueue` | Simulated actions and approval buttons. |
| `AuditTrail` | Search, filters, CSV export, local audit events. |
| `AgentRunLog` | Read-only tool-call timeline. |
| `PinnedEvidence` | Evidence cards pinned from co-pilot answers. |
| `MissionObjectives` | Objective progress and warning states. |
| `LiveXeroPath` | Demo production architecture path. |
| `ApiCoverage` | Xero API surface cards. |
| `EvidenceSelfTest` | Internal field leakage check. |
| `CopilotPanel` | Chat, quick prompts, evidence responses. |
| `EvidenceCard` | Safe evidence display and pin action. |

## Design Tokens

Use these tokens or close equivalents.

```css
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
```

Panel treatment:

```css
.arcade-panel {
  border: 1px solid var(--flight-border);
  border-radius: 8px;
  background: var(--flight-panel);
  box-shadow:
    inset 0 1px 0 oklch(100% 0 0 / .8),
    inset 0 -1px 0 oklch(85% .03 230 / .6),
    0 0 0 2px var(--flight-hud),
    0 0 0 3px oklch(78% .14 200 / .35),
    0 8px 0 -3px oklch(12% .05 250 / .55),
    0 14px 30px -12px oklch(12% .05 250 / .6);
}
```

## Interaction Checklist

- Scenario chip updates scenario state.
- Scenario chip updates URL query parameter.
- Scenario values update all sections, not just the scenario text.
- Share Link copies current URL.
- Motion toggle changes animation intensity without changing finance calculations.
- Judge demo switches to cash_squeeze and runs the cash radar response.
- MAYDAY surfaces urgent diagnosis while preserving approval safety.
- Chase Draft copies text to clipboard and does not send an email.
- Approve (simulate) updates action status.
- Approve (simulate) writes a local audit event.
- CSV All exports audit trail data.
- Clear only clears the intended local state.
- Co-pilot clear resets chat but does not erase audit trail.
- Evidence pin adds a card to Pinned Evidence.
- Evidence self-test fails if internal field names are visible.

## Acceptance Checklist

Use this as the final pass before considering the Lovable rebuild good enough.

### Visual

- Top command bar is compact and cockpit-like.
- Main background is dark, not plain white.
- Panels are pale instrument panels with arcade borders.
- Fonts match the intended hierarchy.
- Numbers are easy to scan.
- Warning and critical states are visually distinct.
- Mobile layout has no horizontal overflow at 390px.

### Data

- `cash_squeeze` shows GBP 86,420 total cash.
- `cash_squeeze` shows 8.6 weeks runway.
- `cash_squeeze` forecast net movement is GBP -2,564.
- `payroll_week` includes the GBP 28,000 payroll bill.
- `payroll_week` expected out is GBP 54,159.
- `late_customer` shows 4 rescue signals.
- `late_customer` shows GBP 31,960 overdue receivables.
- `supplier_pressure` shows 4 overdue bills.
- `supplier_pressure` hazard status is Critical.

### Safety

- No button claims to pay a bill for real.
- No button claims to send a real customer chase.
- All action buttons say or imply simulation.
- Audit events describe simulated state changes.
- Xero path is adapter-ready, not live.

### Co-Pilot

- Empty state shows quick prompts.
- Run cash radar returns tool-call rows.
- Run cash radar returns evidence cards.
- Evidence cards can be pinned.
- User-entered questions receive deterministic local responses.
- Clear conversation works.

### QA

- CSV export downloads or copies a valid CSV.
- Audit search filters visible events.
- Date filters work.
- Scenario filter works.
- Run Tests updates the self-test state.
- Console has no blocking runtime errors.

## Repair Prompts

Use these after Lovable's first pass if the output drifts.

### Repair Prompt - Missing Product Shape

```text
Compare the current app to the Runway Arcade spec. The app must be a working cockpit-style finance dashboard, not a landing page. Add or restore the missing dashboard sections, the sticky Xero Co-Pilot panel, scenario selector, approval queue, audit trail and fixture-driven values. Do not remove any working interactions.
```

### Repair Prompt - Weak Visual Match

```text
The app currently looks too generic. Restyle it to match the Runway Arcade cockpit feel: dark navy outer background, pale instrument panels, compact HUD chips, Space Grotesk headings, JetBrains Mono numbers, cyan panel glow, amber warnings and red MAYDAY states. Keep the dashboard dense and operational. Do not create a marketing hero.
```

### Repair Prompt - Broken Data Consistency

```text
Fix data consistency. All scenario values must come from a single fixture object. When the scenario changes, update Fuel Gauge, Radar Hazards, Forecast, Rescue Beacons, Flight Route, Approval Queue, Mission Objectives and Co-Pilot evidence. Verify cash_squeeze shows GBP 86,420 and 8.6 weeks, payroll_week includes GBP 28,000 payroll, late_customer shows GBP 31,960 overdue, and supplier_pressure shows 4 overdue bills.
```

### Repair Prompt - Missing Safety Language

```text
Add explicit safety language across all action surfaces. This is a demo with no real Xero writes, payments or emails. Approval buttons must say Approve (simulate). Route and chase actions must state that confirmation is required. Audit entries must say simulated approval or local demo state. Do not present any action as executed in Xero.
```

### Repair Prompt - Mobile And Overflow

```text
Fix the responsive layout. At 390px width there must be no horizontal scrolling, no overlapping text, and no clipped buttons. Stack the dashboard and Co-Pilot panel vertically, wrap scenario chips, keep cards readable, and reduce compact labels where needed without removing functionality.
```

## Handoff Notes

- Keep `docs/01-mvp-project-specification.md` for the broad product spec.
- Keep `docs/05-data-model.md` for the deeper conceptual model.
- Keep `docs/09-qa-test-plan.md` for testing.
- Use this file for Lovable rebuild prompts and practical fixture values.
- Use `runway-arcade-local/` as local visual corroboration if the original preview link expires.
