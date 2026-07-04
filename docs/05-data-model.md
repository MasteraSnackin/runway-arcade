# Data Model

This model is designed around the entities visible in the preview. It should be treated as a starting point for implementation, not as a confirmed database schema.

## Core Entities

### Organisation

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Internal organisation ID. |
| `xeroTenantId` | string | Required only for live Xero mode. |
| `name` | string | Demo shows North London design studio. |
| `staffCount` | number | Demo shows 12 staff. |
| `currency` | string | Expected `GBP` for preview data. |
| `mode` | enum | `demo` or `live`. |

### Scenario

| Field | Type | Notes |
| --- | --- | --- |
| `id` | enum | `normal`, `payroll_week`, `late_customer`, `supplier_pressure`, `cash_squeeze`. |
| `label` | string | Display label. |
| `description` | string | Short scenario summary. |
| `asOfDate` | date | Preview uses 2026-07-03. |

### CashAccount

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Internal or Xero account ID. |
| `name` | string | Example: Operating, Tax Reserve, Payroll Reserve. |
| `type` | enum | `operating`, `reserve`, `bank`, `other`. |
| `balanceCents` | integer | Store money as integer minor units. |
| `currency` | string | `GBP`. |
| `source` | enum | `xero`, `demo`, `manual`. |

### Invoice

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Internal ID. |
| `xeroInvoiceId` | string | Xero invoice identifier. |
| `invoiceNumber` | string | Example: `INV-2026-041`. |
| `contactId` | string | Links to customer. |
| `amountDueCents` | integer | Current unpaid amount. |
| `dueDate` | date | Invoice due date. |
| `daysOverdue` | number | Derived from `asOfDate`. |
| `status` | enum | `open`, `overdue`, `paid`, `voided`, `draft`. |
| `likelyRecoveryCents` | integer | Estimated recoverable amount. |
| `riskLevel` | enum | `low`, `medium`, `high`. |

### Bill

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Internal ID. |
| `xeroBillId` | string | Xero bill identifier. |
| `billNumber` | string | Example: `AWS-JUN-INV`. |
| `supplierId` | string | Links to contact. |
| `amountDueCents` | integer | Current unpaid amount. |
| `dueDate` | date | Bill due date. |
| `category` | string | Example: tax, rent, payroll, software. |
| `criticality` | enum | `critical`, `normal`, `deferrable`. |
| `status` | enum | `open`, `overdue`, `paid`, `proposed_delay`. |
| `delayRisk` | string | Human-readable risk summary. |

### Forecast

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Forecast ID. |
| `scenarioId` | string | Source scenario. |
| `windowDays` | number | Preview displays 7-day forecast. |
| `expectedInCents` | integer | Do not expose raw field name in user evidence. |
| `expectedOutCents` | integer | Do not expose raw field name in user evidence. |
| `netMovementCents` | integer | Derived. |
| `runwayImpactDays` | number | Derived. |
| `sources` | string[] | Example: Xero invoices, bills, payments. |

### RoutePlan

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Route ID. |
| `scenarioId` | string | Source scenario. |
| `strategy` | enum | `conservative`, `balanced`, `aggressive`. |
| `cashOutCents` | integer | Total proposed payments. |
| `cashPreservedCents` | integer | Total delayed or paused spend. |
| `expectedInflowCents` | integer | Expected invoice recovery. |
| `runwayImpactDays` | number | Impact against current runway. |
| `payBillIds` | string[] | Bills recommended to pay. |
| `delayBillIds` | string[] | Bills recommended to delay. |
| `chaseInvoiceIds` | string[] | Invoices recommended for chase. |
| `requiresApproval` | boolean | Always true for MVP actions. |

### ProposedAction

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Action ID. |
| `type` | enum | `chase_invoice`, `delay_bill`, `approve_route`, `pause_spend`. |
| `title` | string | User-facing action title. |
| `sourceType` | enum | `invoice`, `bill`, `route`, `category`. |
| `sourceId` | string | Xero or internal source reference. |
| `status` | enum | `draft`, `needs_approval`, `sim_approved`, `dismissed`. |
| `impact` | string | Human-readable impact. |
| `risk` | string | Human-readable risk. |
| `createdAt` | datetime | ISO 8601. |
| `approvedAt` | datetime | Nullable. |

### AuditEvent

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Audit event ID. |
| `scenarioId` | string | Scenario active when event occurred. |
| `actionId` | string | Proposed action ID. |
| `eventType` | enum | `sim_approved`, `cleared`, `exported`, `write_attempted`, `write_failed`, `write_succeeded`. |
| `timestamp` | datetime | User-visible timestamp. |
| `actorId` | string | User ID in production. |
| `sourceLabel` | string | Example: Xero invoice INV-2026-041. |
| `impact` | string | Snapshot of impact at approval time. |
| `stateChanges` | string[] | Human-readable state changes. |

### EvidenceCard

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Evidence ID. |
| `toolName` | string | Example: `cash_position`. |
| `confidence` | enum | `low`, `medium`, `high`. |
| `label` | string | Friendly display title. |
| `summaryValue` | string | Example: `GBP 86,420`. |
| `rows` | object[] | Friendly label/value rows. |
| `sourceRefs` | object[] | Xero or fixture source references. |
| `pinStatus` | boolean | Whether user pinned the card. |

## Internal Field Safety

The preview includes an evidence card self-test to ensure internal fields such as `expectedInCents` and `windowDays` do not leak to users. Production implementation should enforce a renderer whitelist:

- permitted: friendly label, formatted value, confidence, source reference
- blocked: raw cents field names, internal scoring fields, hidden IDs, prompt text, model traces
