# Hackathon Demo Script

## Demo Goal

Show that Runway Arcade turns Xero data into a safe, explainable cashflow co-pilot for small businesses.

Recommended demo length: 4 to 6 minutes.

## Opening

"This is Runway Arcade, a Xero finance co-pilot for small businesses. It answers the weekly cash questions founders ask under pressure: how much runway do we have, what bills are dangerous this week, who owes us money, and what actions are safe to approve?"

## Step 1: Set the Scene

Open the app and point out:

- Xero Finance Co-Pilot title.
- Demo company: North London design studio, 12 staff.
- Scenario selector.
- Demo data and read-only safety posture.

Suggested line:

"The MVP uses Xero-style demo data through an adapter. The same finance helpers can be backed by live Xero OAuth later."

## Step 2: Show Normal Flight

Select `Normal flight`.

Point out:

- Total cash GBP 105,700.
- Runway 12.2 weeks.
- Due this week GBP 24,874.
- Stable but still actionable overdue invoices.

Suggested line:

"Even in a normal week, the assistant surfaces overdue cash and upcoming obligations without requiring a spreadsheet."

## Step 3: Show Payroll Week

Select `Payroll week`.

Point out:

- Payroll obligation appears.
- Expected outflow rises to GBP 54,159.
- Net movement drops to negative GBP 30,564.
- Route adapts to protect critical obligations.

Suggested line:

"The scenario changes the same finance model, not just the wording."

## Step 4: Show Cash Squeeze

Select `Cash squeeze`.

Point out:

- Operating cash down 40 percent.
- Total cash GBP 86,420.
- Runway 8.6 weeks.
- Critical VAT and rent are due this week.
- Overdue invoices total GBP 20,360.

Suggested line:

"The dashboard separates cash in the bank from cash that can actually move this week."

## Step 5: Ask the Co-Pilot

Click `Run cash radar`.

Point out:

- Tool calls are visible.
- Evidence cards show cash, runway, forecast, and overdue invoices.
- The assistant gives headline, context, risks, and actions.

Suggested line:

"The AI is not guessing from a prompt. It is using bounded finance tools and showing the evidence."

## Step 6: Plot a Route

Click `Plot a safe payment route` or show the flight route card.

Point out:

- Pay critical bills.
- Delay non-critical spend.
- Chase overdue invoices.
- Route requires confirmation.

Suggested line:

"Recommendations become proposed actions. Nothing is sent, paid, or written automatically."

## Step 7: Approve a Simulation

Click an `APPROVE (SIMULATE)` button.

Point out:

- Status changes.
- Audit trail records source, impact, action, and timestamp.
- Copy states that no Xero writes occurred.

Suggested line:

"This is the safety pattern we would keep for production writes: preview, approval, audit, then action."

## Step 8: Show Xero Adapter Readiness

Scroll to Xero path and API coverage.

Point out:

- Xero OAuth.
- Typed adapter.
- Finance helpers.
- AI tool calls.
- Approval queue.
- Audit trail.
- Xero surfaces: invoices, bills, contacts, payments, bank accounts, reports, aged receivables, aged payables.

Suggested line:

"The demo data can be swapped for live tenant data without changing the finance logic."

## Closing

"Runway Arcade gives small businesses a practical cash mission control layer on top of Xero. The MVP is read-first, evidence-backed, and approval-gated by design."

## Backup Demo Path

If the co-pilot animation or browser state is slow:

1. Use the dashboard cards.
2. Show route and approval queue.
3. Show existing audit trail.
4. Show Xero API coverage.
5. State that co-pilot responses use the same tools shown in the agent run log.

