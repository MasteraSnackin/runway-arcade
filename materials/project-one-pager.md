# Runway Arcade - One-Pager

## Short Description

Runway Arcade is a Xero finance co-pilot for small businesses. It turns invoices, bills, bank balances and payment timing into a cockpit-style cashflow view that answers the weekly question: what threatens cash, who can improve it, and what action is safe to approve next?

## Tagline

Cashflow clarity, before the runway runs out.

## Audience

- Founders who need a quick answer on whether payroll, VAT, rent and suppliers can be covered.
- Finance managers who need an operational weekly cash view.
- Bookkeepers who want evidence-backed recommendations instead of spreadsheet archaeology.
- Hackathon judges looking for Xero API relevance, safety and product clarity.

## Problem

Small businesses often have the facts in Xero but not the decision layer. Bank accounts, bills, invoices, aged receivables and cash expectations are separate surfaces. In a pressure week, the founder still has to work out:

- How many weeks of cash runway remain?
- Which bills are dangerous this week?
- Which overdue invoices are worth chasing first?
- Which payments can be made without breaching a reserve?
- What has been approved, by whom, and on what evidence?

## Solution

Runway Arcade combines a finance dashboard, deterministic calculations, evidence cards, approval queues and a bounded co-pilot.

Core product areas:

- Fuel Gauge: total cash, reserves, burn and runway.
- Cash Radar: due bills, overdue bills and critical obligations.
- Rescue Beacons: overdue invoices ranked by likely recovery.
- Flight Route: suggested pay, delay and chase plan.
- Approval Queue: simulation-only actions that need explicit approval.
- Audit Trail: local record of simulated approvals and decisions.
- Xero Evidence Ledger: clear mapping back to Xero-style data surfaces.
- Co-Pilot: chat presets for cash radar, fuel remaining, rescue cash, hazards, routes and MAYDAY diagnosis.

## What Is Working Locally

- Local mirror runs at `http://localhost:4173/`.
- Current mirrored preview is `https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm`.
- Current deployed revision is `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`.
- The in-app browser was verified after sync: title, Runway Arcade heading, Xero co-pilot content, scenario tabs and MAYDAY controls render without browser warnings or errors.

## Safety Posture

The MVP is read-first and simulation-only. It does not write to Xero, send payment instructions, email customers, or execute financial actions. Approval controls are still shown because they model the safety layer required before any production write capability.

## Known Unknowns

- The original editable Lovable/Git source was not exposed.
- The local app is a deployed bundle mirror, not a normal source tree.
- Live Xero OAuth, tenant handling, roles, retention and write policies require separate implementation decisions.
- Exact production scopes and rate limits must be verified against current Xero Developer documentation before implementation.
