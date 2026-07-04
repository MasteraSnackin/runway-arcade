# Runway Arcade MVP Documentation Pack

Project: `Runway Arcade - Xero Finance Co-Pilot`

Current source inspected: https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm

Current deployed revision: `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`

Earlier source inspected during setup: https://lovable.dev/preview/8MIGZbXsIhyYDnbqNN0H8AoLjBzeUR22

Local corroboration: `runway-arcade-local/` contains a deployed preview bundle mirror. The original editable Lovable/Git source was not available.

Inspection dates: 2026-07-03 and 2026-07-04

## Status

This documentation pack is derived from the working Lovable preview and the local deployed bundle mirror. Implementation details that are not visible in those artefacts are marked as assumptions or open decisions.

The preview presents a demo product for a small business finance user. It reads Xero-style demo data, shows cash runway and near-term risks, proposes safe payment/chase routes, and simulates approvals without writing to Xero.

The 2026-07-04 preview update adds stronger Cash Flow Accelerator positioning, a visible Xero status/fallback chip, judge demo controls, an evidence ledger, and clearer diagnostics while retaining the Runway Arcade cockpit metaphor.

## Documents

1. [MVP Project Specification](01-mvp-project-specification.md)
2. [Product Requirements](02-product-requirements.md)
3. [Technical Specification](03-technical-specification.md)
4. [Architecture and Diagrams](04-system-architecture-and-diagrams.md)
5. [Data Model](05-data-model.md)
6. [Xero Integration Specification](06-xero-integration-specification.md)
7. [AI Co-Pilot Specification](07-ai-copilot-specification.md)
8. [MVP Backlog and Roadmap](08-mvp-backlog-and-roadmap.md)
9. [QA Test Plan](09-qa-test-plan.md)
10. [Hackathon Demo Script](10-demo-script.md)
11. [Risk Register](11-risk-register.md)
12. [Implementation Plan](12-implementation-plan.md)
13. [API Contract](13-api-contract.md)
14. [Calculation Specification](14-calculation-specification.md)
15. [Security, Privacy, and Compliance](15-security-privacy-compliance.md)
16. [Local Development and Deployment](16-local-development-and-deployment.md)
17. [User Guide](17-user-guide.md)
18. [Decision Log](18-decision-log.md)
19. [Lovable Rebuild Pack](19-lovable-rebuild-pack.md)

Standalone diagram sources are in [diagrams/](diagrams/).

Related project collateral is in the workspace-level [materials](../materials/) folder.

## Preview-Derived Facts

- Product name shown in the browser title: `Runway Arcade - Xero Finance Co-Pilot`.
- Header subtitle observed in the current preview: `Xero Cash Flow Accelerator - Finance Co-Pilot`.
- Demo company: North London design studio, 12 staff, Xero demo organisation.
- Main scenarios: normal flight, payroll week, late customer, supplier pressure, cash squeeze.
- Main dashboard sections: cash flow accelerator, fuel gauge/runway, cash radar hazards, next 7 days forecast, rescue beacons, approval queue, approvals audit trail, route plan, recovery plan, pinned evidence, mission objectives, Xero evidence ledger, diagnostics, agent run log, live Xero path, evidence card self-test, Xero co-pilot.
- Current app data date shown in preview: 2026-07-03.
- Current local mirror revision: `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`.
- Current local app status observed on 2026-07-04: `Using demo fallback`, served by local read-only JSON stubs for the mirrored app's Xero status endpoints.
- The demo clearly states that approvals are simulation only and no Xero writes occur.

## Open Decisions

- Final production stack is unknown because the original editable source was not available.
- Xero write capability is not part of the observed MVP. Whether production should write to Xero needs explicit product and compliance approval.
- Exact Xero OAuth scopes must be confirmed against Xero's current developer documentation before production implementation.
- User roles, billing model, tenant model, hosting target, and retention policy are not visible in the preview.
