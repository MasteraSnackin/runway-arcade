# Security, Privacy, and Compliance

## Purpose

This document defines the security and privacy baseline for moving Runway Arcade from a demo MVP to a live Xero-connected product.

Current date: 2026-07-04.

## Current Xero Facts to Respect

The following was checked against official Xero Developer pages on 2026-07-04 and must still be checked again immediately before production implementation:

- Xero supports OAuth 2.0 for new integrations and does not use basic API key authentication.
- Xero access tokens expire after 30 minutes.
- Unused refresh tokens expire after 60 days.
- Xero introduced granular scopes from 2 March 2026. Apps created on or after that date use granular scopes; older apps have a transition window to September 2027.
- Xero publishes rate limits per tenant and per app. Current official pages describe 5 concurrent calls per tenant, 60 calls per minute per tenant, a tier-dependent daily limit, and 10000 calls per minute across the app. The OAuth limits page states 1000 calls per day for Starter and 5000 calls per day for higher tiers; the FAQ still lists 5000 calls per day in its general rate-limit answer.

Reference links:

- https://developer.xero.com/faq
- https://developer.xero.com/faq/granular-scopes
- https://developer.xero.com/faq/oauth2
- https://developer.xero.com/documentation/guides/oauth2/limits/
- https://developer.xero.com/documentation/guides/oauth2/auth-flow/
- https://developer.xero.com/documentation/guides/oauth2/scopes/
- https://developer.xero.com/documentation/best-practices/data-integrity/managing-tokens
- https://developer.xero.com/changelog

## Security Principles

- Read-only by default.
- Least privilege Xero scopes.
- No Xero token in browser state.
- No token in AI prompts or logs.
- Explicit approval before any write-capable action.
- Audit before and after any production write attempt.
- Fail closed when scope, tenant, or approval state is ambiguous.

## Data Classification

| Data | Classification | Handling |
| --- | --- | --- |
| Xero access token | Secret | Server-side encrypted storage only. |
| Xero refresh token | Secret | Server-side encrypted storage only, rotate on refresh. |
| Tenant ID | Confidential | Server-side; expose only if needed for support. |
| Customer/supplier names | Confidential business data | Show to authorised users only. |
| Invoice and bill amounts | Confidential financial data | Authorised users only; redact logs. |
| Audit events | Confidential compliance data | Append-only; restricted deletion. |
| Demo fixture data | Low risk if fictional | Keep clearly labelled as demo. |

## OAuth Requirements

### Authorisation Flow

- Use server-side OAuth code flow for confidential web apps.
- Use PKCE only if building a public client that cannot keep a secret.
- Use an opaque, signed `state` parameter for CSRF protection.
- Validate redirect URI exactly.
- Exchange authorisation code server-side.
- Store token response server-side.
- Never return access or refresh tokens to the browser.

### Token Storage

Minimum production requirements:

- Encrypt access and refresh tokens at rest.
- Store token metadata separately from user-visible organisation records.
- Rotate refresh token on every successful refresh.
- Handle refresh failure by requiring reauthorisation.
- Delete tokens when a tenant disconnects.
- Restrict database access to backend service roles.

### Scope Strategy

Because Xero scope names and endpoint mappings can change, treat scope configuration as a release checklist item.

Initial MVP approach:

- request only read scopes needed for invoices, bills, contacts, bank accounts, payments, and reports
- avoid write scopes
- show a clear "Update permissions" path when Xero returns insufficient scope

Write-capable future releases must request separate explicit consent.

## AI Data Boundary

The AI runtime should receive structured, minimal finance summaries, not raw Xero payloads.

Allowed in prompts:

- formatted totals
- invoice number
- customer or supplier display name
- due date
- ageing bucket
- source labels
- risk category

Blocked from prompts unless explicitly required and approved:

- OAuth tokens
- bank account numbers
- full contact addresses
- full email addresses
- tax identifiers
- internal database IDs
- raw Xero response bodies
- unrelated transaction descriptions

## Approval Safety

The MVP is simulation only. Production write support, if approved later, must include:

- user role check
- tenant status check
- write-scope check
- exact payload preview
- explicit confirmation
- idempotency key
- pre-write audit event
- post-write audit event
- failure handling with user-visible status

Do not allow the model to call write tools directly. The model may create a proposed action. The application decides whether the action is eligible for user approval.

## Logging Policy

Logs may include:

- request ID
- organisation ID surrogate
- user ID surrogate
- endpoint
- duration
- success or failure code
- tool name

Logs must not include:

- access tokens
- refresh tokens
- full raw Xero payloads
- full AI prompts with sensitive data
- exported CSV content
- bank account details

## Audit Policy

Audit events should be append-only in production.

Minimum audit fields:

- timestamp
- actor
- organisation
- scenario or live context
- action type
- source reference
- approval status
- payload hash for write actions
- result status
- error code where relevant

Retention period is an open decision. For a finance product, define it explicitly before production launch.

## Privacy Requirements

- Publish a clear privacy notice before live Xero connection.
- Explain what Xero data is read and why.
- Explain whether AI processing is used.
- Provide tenant disconnect and data deletion flow.
- Avoid collecting data that is not required for the cashflow use case.
- Keep demo and live modes visually distinct.

## Rate-Limit and Availability Controls

- Cache Xero reads for a short freshness window.
- Use paging and filtering for high-volume endpoints.
- Back off on HTTP 429 and respect retry headers.
- Show stale-data state rather than repeatedly retrying.
- Avoid running multiple co-pilot tools that fetch identical Xero data separately.

## Threat Model

| Threat | Control |
| --- | --- |
| Token theft from browser | Tokens never sent to browser. |
| Prompt injection through Xero data | Treat Xero text fields as untrusted data; tools return structured facts only. |
| Model initiates write action | Model cannot call write tools; approval service controls writes. |
| User approves wrong tenant action | Show tenant and source references on approval screen. |
| Audit tampering | Append-only store and restricted write permissions. |
| Sensitive data in logs | Central redaction and structured logs. |
| Overbroad scopes | Least privilege and granular scope review. |

## Compliance Unknowns

- Whether the product needs regulated financial advice review.
- Whether invoice chase wording requires legal review.
- Retention period for audit events.
- Data processor/subprocessor obligations for AI runtime.
- Whether live write actions should be certified with Xero before release.

## Release Checklist

- Xero scopes verified against current official documentation.
- OAuth callback tested with demo company.
- Token encryption verified.
- Refresh token rotation tested.
- Logs scanned for secrets and financial data.
- AI prompt payloads reviewed.
- Approval flow tested for no-write MVP.
- Rate-limit handling tested.
- Privacy notice drafted.
- Disconnect and deletion flow documented.
