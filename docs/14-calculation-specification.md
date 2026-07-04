# Calculation Specification

## Purpose

This document defines the finance calculations used by the MVP. The goal is to make dashboard numbers, co-pilot evidence, and audit records reproducible.

## General Rules

- Store money in integer minor units: GBP pence.
- Format money at the UI boundary only.
- Use the organisation timezone for date boundaries.
- Use ISO dates internally: `YYYY-MM-DD`.
- Treat the preview date as `2026-07-03` for demo fixtures.
- Calculations must be deterministic for the same data snapshot.
- Co-pilot tools and dashboard cards must use the same calculation helpers.

## Rounding Rules

| Value | Rule |
| --- | --- |
| Money | Display whole GBP for dashboard unless pence are material. |
| Runway weeks | Round to one decimal place. |
| Runway days | Round to nearest whole day. |
| Forecast runway impact | Round to nearest whole day. |
| Percentages | Round to nearest whole percent unless a decimal is needed. |
| Likely recovery | Round to nearest whole GBP for display. |

Use standard half-up rounding unless a finance/accounting rule requires otherwise.

## Cash Position

### Inputs

- Included cash accounts.
- Account classification: operating, reserve, other.
- Balance at `asOfDate`.

### Formula

```text
total_cash_cents = sum(included_account.balance_cents)
operating_cash_cents = sum(account.balance_cents where account.type = operating)
reserve_cash_cents = sum(account.balance_cents where account.type = reserve)
```

### Display

- Total cash.
- Account split.
- Source count, for example "checked 3 accounts".

### Cash Squeeze Example

```text
operating = GBP 28,920
tax_reserve = GBP 21,500
payroll_reserve = GBP 36,000
total_cash = GBP 86,420
```

## Average Daily Burn

### Inputs

- Recent cash outflows and inflows over a 30-day window.
- Excluded transfer rules.

### Formula

```text
net_flow_cents = cash_out_cents - cash_in_cents
average_daily_burn_cents = max(net_flow_cents / 30, 0)
```

If the organisation has net inflow or zero burn:

- show runway as "stable" or "not constrained by current burn"
- do not divide by zero
- still show total cash and forecast

### Unknowns

The preview does not expose the raw 30-day transaction set. Production must define:

- whether VAT, payroll, transfers, loan receipts, and reserve movements are included
- whether one-off capital movements are excluded
- whether burn is based on cash transactions, P&L, or bank feed movements

## Runway

### Formula

```text
runway_days = total_cash_cents / average_daily_burn_cents
runway_weeks = runway_days / 7
```

### Cash Squeeze Example

```text
total_cash = GBP 86,420
average_daily_burn = GBP 1,437
runway_days = 86420 / 1437 = 60.14
display runway_days = 60
runway_weeks = 60.14 / 7 = 8.59
display runway_weeks = 8.6
```

### Normal Flight Example

```text
total_cash = GBP 105,700
average_daily_burn = GBP 1,237
runway_days = 105700 / 1237 = 85.45
runway_weeks = 85.45 / 7 = 12.21
display runway_weeks = 12.2
```

## Bills Due This Week

### Inputs

- Bills with amount due greater than zero.
- Due date.
- Criticality classification.
- `asOfDate`.

### Formula

```text
window_end = asOfDate + 7 days
due_this_week = bills where due_date >= asOfDate and due_date <= window_end
due_this_week_total_cents = sum(due_this_week.amount_due_cents)
overdue_bills = bills where due_date < asOfDate and amount_due_cents > 0
must_pay_obligations = due_this_week where criticality = critical
```

### Criticality Rules

Initial default:

| Category | Criticality |
| --- | --- |
| Tax | Critical |
| Payroll | Critical |
| Rent | Critical |
| Essential software | Normal unless operations stop immediately. |
| Legal/professional services | Normal unless deadline-driven. |
| Print, travel, discretionary subscriptions | Deferrable. |

## Seven-Day Forecast

### Inputs

- Expected invoice receipts in the next 7 days.
- Bills and payments due in the next 7 days.
- Optional expected payment probabilities.

### Formula

```text
expected_in_cents = sum(expected_receipt.amount_cents)
expected_out_cents = sum(expected_payment.amount_cents)
net_movement_cents = expected_in_cents - expected_out_cents
runway_impact_days = net_movement_cents / average_daily_burn_cents
```

Display `runway_impact_days` rounded to nearest whole day.

### Cash Squeeze Example

```text
expected_in = GBP 23,595
expected_out = GBP 26,159
net_movement = GBP -2,564
runway_impact_days = -2564 / 1437 = -1.78
display = -2 days
```

## Overdue Receivables

### Inputs

- Open invoices.
- Customer/contact.
- Due date.
- Amount due.
- `asOfDate`.

### Formula

```text
days_overdue = max(asOfDate - due_date, 0)
overdue_invoices = invoices where amount_due_cents > 0 and due_date < asOfDate
overdue_total_cents = sum(overdue_invoices.amount_due_cents)
```

### Ageing Buckets

```text
current = invoices not overdue
1_30 = invoices overdue 1 to 30 days
31_60 = invoices overdue 31 to 60 days
61_90 = invoices overdue 61 to 90 days
90_plus = invoices overdue more than 90 days
```

## Likely Recovery

### Purpose

Likely recovery is a planning estimate, not a guarantee. It must be labelled as an estimate.

### Initial Rule

Use a simple factor until enough live data exists:

| Days Overdue | Factor |
| --- | --- |
| 1 to 30 | 0.90 |
| 31 to 60 | 0.75 |
| 61 to 90 | 0.60 |
| 90+ | 0.40 |

Optional adjustments:

- subtract 0.10 for high-risk customers
- add 0.05 for strong payment history
- clamp between 0.25 and 0.95

### Formula

```text
likely_recovery_cents = invoice.amount_due_cents * recovery_factor
```

### Cash Squeeze Example

```text
Halcyon Retail Ltd: GBP 12,400 * 0.90 = GBP 11,160
Cobalt Studios: GBP 6,400 * 0.90 = GBP 5,760
Kestrel & Co.: GBP 1,560 * 0.90 = GBP 1,404
```

## Route Plan

### Inputs

- Critical bills.
- Deferrable bills.
- Overdue invoices.
- Average daily burn.
- Current runway.
- Strategy: conservative, balanced, aggressive.

### Strategy Defaults

| Strategy | Pay | Delay | Chase |
| --- | --- | --- | --- |
| Conservative | Critical only | Normal and deferrable where safe | Highest confidence invoices |
| Balanced | Critical plus low-risk normal | Deferrable only | All material overdue invoices |
| Aggressive | Critical plus relationship-protecting payments | More discretionary spend | All overdue invoices and current large invoices |

### Formula

```text
cash_out_cents = sum(pay_bills.amount_due_cents)
cash_preserved_cents = sum(delay_bills.amount_due_cents) + paused_spend_cents
expected_inflow_cents = sum(chase_invoices.likely_recovery_cents)
route_net_effect_cents = expected_inflow_cents + cash_preserved_cents - cash_out_cents
runway_impact_days = route_net_effect_cents / average_daily_burn_cents
```

Display impact as days or weeks depending on magnitude.

### Important Interpretation

`cash_preserved_cents` is not new cash. It represents cash that does not leave during the planning window because an action is delayed or paused.

## Mission Objectives

### Objective Status

```text
passed = current_value meets target
warning = current_value misses target but not critical
critical = current_value misses target and threshold breach is material
```

Initial objectives:

| Objective | Target |
| --- | --- |
| Keep runway above 6 weeks | runway_weeks >= 6 |
| Collect overdue invoices | overdue_invoice_count = 0 |
| Pay critical bills without breaching reserve | overdue_critical_bill_count = 0 |
| Reduce overdue receivables | overdue_receivables_cents = 0 |

## Evidence Confidence

Suggested defaults:

| Evidence | Confidence |
| --- | --- |
| Direct cash balance from connected account | High |
| Runway from complete cash and burn data | Medium |
| Forecast based on due dates and expected payments | Medium |
| Route recommendation | High for source facts, medium for outcome estimate |
| Likely recovery | Low to medium unless backed by payment history |

## Data Quality Flags

Cards and co-pilot tools should expose a warning when:

- bank account data is stale
- invoice due date is missing
- bill criticality was inferred rather than configured
- average daily burn could not be calculated
- forecast excludes uncategorised transactions
- Xero returned partial data or rate-limit errors

