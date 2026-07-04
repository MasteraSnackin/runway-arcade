# Hackathon Submission Draft

## Project Name

Runway Arcade - Xero Finance Co-Pilot

## One-Line Summary

An evidence-backed cashflow cockpit that helps small businesses understand runway, detect near-term Xero cash hazards, and approve safe recovery actions.

## Problem

Small businesses can have invoices, bills, payments, bank balances and reports in Xero but still struggle to make a fast cash decision. Under pressure, the founder needs to know what will hurt cash this week, which customers should be chased, and which payments can safely proceed.

## Solution

Runway Arcade turns Xero-style finance data into a single operational dashboard:

- Fuel Gauge for cash and runway.
- Cash Radar for bills and obligations.
- Rescue Beacons for overdue invoices.
- Flight Route for pay, delay and chase planning.
- Approval Queue and audit trail for controlled action.
- Xero Co-Pilot for evidence-backed answers.
- MAYDAY mode for urgent cash diagnosis.

## Xero Relevance

The demo is built around Xero accounting concepts and shows an adapter-ready path for:

- invoices
- bills
- contacts
- payments
- bank accounts and feeds
- reports
- aged receivables
- aged payables

The current local mirror uses demo fallback data. A production version should replace the fixture adapter with live Xero OAuth reads while keeping the same finance helper and approval boundaries.

## AI Use

The co-pilot is designed as a bounded finance assistant, not an autonomous financial actor. It should call deterministic tools, cite evidence cards, show assumptions, and require approval for any action that could affect cash, customers or Xero records.

## Safety And Trust

The MVP is simulation-only. It explicitly avoids real Xero writes, real payments and customer contact. This is deliberate: the project demonstrates value while preserving a route to production-grade controls.

Safety features:

- read-first posture
- approval-required actions
- audit trail
- evidence cards
- visible demo fallback state
- no tokens or financial secrets in the browser
- future write mode behind explicit product and compliance approval

## Current Demo State

- Local URL: `http://localhost:4173/`
- Current preview: `https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm`
- Current revision: `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`
- Verified locally on 2026-07-04.

## What Makes It Distinctive

Runway Arcade is intentionally operational rather than decorative. It does not just summarise accounting data. It turns accounting records into an explainable decision route: what to pay, what to defer, who to chase, what risk that creates, and what evidence supports the recommendation.

## Next Steps

1. Obtain editable source or rebuild from the docs pack.
2. Implement the Xero adapter boundary behind the current fixture data shape.
3. Add server-side OAuth, encrypted token storage and rate-limit handling.
4. Add deterministic tests for cash, runway, bills, invoices and route planning.
5. Keep write capability disabled until scope, audit, role and compliance controls are complete.
