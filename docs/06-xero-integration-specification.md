# Xero Integration Specification

## Purpose

The Xero integration should provide the finance data needed for runway, forecast, bill, invoice, route, and evidence calculations. The MVP preview uses demo data and shows an adapter-ready path. Production should preserve the same domain interface while replacing fixture data with live Xero OAuth data.

Official Xero documentation to verify before implementation:

- Xero OAuth 2.0 authorisation flow: https://developer.xero.com/documentation/guides/oauth2/auth-flow/
- Xero OAuth scopes: https://developer.xero.com/documentation/guides/oauth2/scopes/
- Xero Accounting API overview: https://developer.xero.com/documentation/api/accounting/overview
- Xero Accounting API reports: https://developer.xero.com/documentation/api/accounting/reports

## Integration Principles

- Use read-only Xero access for MVP.
- Keep all OAuth token handling on the server.
- Normalise Xero responses before sending data to dashboard or AI tools.
- Keep write scopes and write operations disabled until separately approved.
- Store only the data required for the product purpose.
- Show source references in user-facing evidence.

## Xero Surfaces Visible in Preview

| Surface | Use in MVP |
| --- | --- |
| Invoices | Receivables, overdue invoices, expected inflow, chase drafts. |
| Bills | Due bills, overdue bills, outflow forecast, route recommendations. |
| Contacts | Customer and supplier names, relationship risk. |
| Payments | Historical or expected payment context. |
| Bank accounts | Cash position and account split. |
| Reports | Runway and summary finance calculations. |
| Aged receivables | Ageing buckets and rescue beacons. |
| Aged payables | Supplier pressure and overdue bills. |

## Adapter Interface

The application should depend on an internal adapter rather than Xero SDK objects directly.

```ts
export interface FinanceDataAdapter {
  getOrganisation(): Promise<Organisation>;
  getCashAccounts(asOfDate: string): Promise<CashAccount[]>;
  getOpenInvoices(asOfDate: string): Promise<Invoice[]>;
  getOpenBills(asOfDate: string): Promise<Bill[]>;
  getContacts(): Promise<Contact[]>;
  getPayments(fromDate: string, toDate: string): Promise<Payment[]>;
  getAgedReceivables(asOfDate: string): Promise<AgedBucket[]>;
  getAgedPayables(asOfDate: string): Promise<AgedBucket[]>;
}
```

## MVP Read Operations

| Operation | Data Needed | Notes |
| --- | --- | --- |
| Cash position | Bank/reserve balances | Normalise to account name, type, and balance. |
| Runway | Cash balances and recent transaction/burn data | Exact Xero source for burn must be confirmed. |
| 7-day forecast | Due invoices, expected receipts, due bills, payments | Dates must be based on organisation timezone. |
| Overdue invoices | Invoices and contacts | Include invoice number, due date, contact, amount due. |
| Bills due this week | Bills and suppliers | Include criticality mapping. |
| Aged receivables/payables | Reports or derived ageing | Confirm best endpoint before production. |

## Candidate OAuth Scope Strategy

Exact scope names must be verified against Xero's current scope page before production. Scope changes and granular permission rules can change over time, so this document does not treat the names below as final.

MVP should request the least privilege read-only set required for:

- accounting transactions read access for invoices, bills, bank transactions, and payments
- contacts read access
- settings/accounts read access if needed for account metadata
- reports read access or granular report scopes for aged receivables, aged payables, and summary reports
- offline access only if refresh tokens are required

No write scopes should be requested for the MVP unless the product decision changes.

## Production Write Gate

Writes should require a separate release decision. Possible future writes:

- create or update invoice reminder drafts
- create Xero notes or history entries
- update bill payment schedule metadata
- create draft payments or mark proposed payment routes

Required controls before writes:

- specific write scope granted
- role-based permission check
- preview of exact write payload
- explicit user confirmation
- pre-write audit event
- post-write success or failure audit event
- rollback or correction guidance when supported

## Data Freshness

For production:

- Fetch on dashboard open.
- Cache short-lived read data for responsiveness.
- Show last sync time.
- Allow manual refresh.
- Mark calculations stale if data is older than the chosen freshness threshold.

## Compliance and Safety Notes

- Financial recommendations should be presented as decision support, not regulated financial advice.
- Customer and supplier names may be commercially sensitive.
- Audit events should be immutable.
- AI prompts should use normalised summaries and source references, not unrestricted raw Xero payloads.

