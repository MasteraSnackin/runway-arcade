# Risk Register

## Product Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Users mistake simulation for real Xero action. | High | Keep simulation copy near every approval and audit event. |
| AI recommendation is treated as financial advice. | High | Use decision-support wording and show evidence/assumptions. |
| Route suggests delaying a critical obligation. | High | Hard-code criticality rules and require prominent risk language. |
| Playful arcade language obscures finance meaning. | Medium | Prioritise plain finance labels and keep playful language secondary. |
| Demo scenarios do not reflect user reality. | Medium | Add editable assumptions after MVP. |

## Technical Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Xero scopes are implemented incorrectly. | High | Verify exact scopes against Xero developer docs during implementation. |
| Token handling leaks to browser. | High | Store OAuth tokens server-side only and never pass them to AI prompts. |
| Calculations diverge between dashboard and co-pilot tools. | High | Use shared finance helper functions for both. |
| Evidence cards leak internal fields. | Medium | Use a whitelist renderer and keep the self-test in CI. |
| Audit trail can be edited or lost. | Medium | Persist audit as append-only events in production. |
| Fixture adapter becomes tightly coupled to UI. | Medium | Implement the Xero adapter interface early. |

## Compliance and Trust Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Write operations create accounting errors. | High | Keep MVP read-only and add production write gates later. |
| Customer/supplier data exposed in logs. | High | Redact logs and restrict AI prompt data. |
| Unsupported accounting advice is produced. | Medium | Add prompt guardrails and professional review language. |
| No clear user permission model. | Medium | Define roles before multi-user production release. |

## Open Unknowns

- Original editable source, data fixture structure, and persistence layer are unknown.
- Production host, database, authentication provider, and AI runtime are unknown.
- Exact Xero OAuth scopes and endpoint mappings need verification at implementation time.
- Whether production should write back to Xero is a product/compliance decision, not a default engineering assumption.
