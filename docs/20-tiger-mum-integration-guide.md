# Tiger Mum Mode Integration Guide

## Purpose

This guide explains where and how to add `Tiger Mum Mode` / `Auntie Mei` into Runway Arcade.

The current workspace contains a local mirror of a Lovable deployed bundle. That means the visible app in `runway-arcade-local/` is not normal editable source. Do not try to build this feature by editing the minified bundled JavaScript unless it is a throwaway demo patch.

The correct implementation is in the editable application source when it is recovered or rebuilt.

## Recommended Product Placement

Add Tiger Mum Mode as an optional co-pilot tone, not as the default product voice.

Best UI location:

- Xero Co-Pilot panel header
- next to the clear conversation icon
- or directly above the preset prompt buttons

Suggested control:

```text
[ Tiger Mum Mode OFF/ON ]
```

Alternative:

```text
Tone: Professional | Tiger Mum
```

Use `Professional` as the default. Store the selected tone in local storage so it survives reloads.

Suggested local storage key:

```text
runway-arcade.copilot-persona.v1
```

## Source Files To Create In An Editable App

Recommended structure:

```text
src/
  lib/
    copilot/
      personas/
        index.ts
        tiger-mum.ts
      system-prompts.ts
      chat-request.ts
  components/
    chat-panel.tsx
    persona-toggle.tsx
  server/
    api/
      chat.ts
```

If rebuilding in Lovable, ask it to create equivalent files or component boundaries.

## Persona Config

Use the implementation-ready config in:

```text
materials/persona-configs/tiger-mum-mode.json
```

In a TypeScript app, convert it into:

```ts
export const tigerMumPersona = {
  id: "tiger_mum",
  label: "Tiger Mum Mode",
  displayName: "Auntie Mei",
  description: "Strict, funny, evidence-led cashflow coaching.",
  storageValue: "tiger_mum",
  humourLevel: "medium",
  systemPrompt: `...`
} as const;
```

## Frontend Toggle

Add a small switch component:

```tsx
type PersonaId = "professional" | "tiger_mum";

type PersonaToggleProps = {
  value: PersonaId;
  onChange: (value: PersonaId) => void;
};

export function PersonaToggle({ value, onChange }: PersonaToggleProps) {
  const enabled = value === "tiger_mum";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Turn Tiger Mum Mode off" : "Turn Tiger Mum Mode on"}
      className={enabled ? "hud-chip text-flight-amber" : "hud-chip"}
      onClick={() => onChange(enabled ? "professional" : "tiger_mum")}
      title={enabled ? "Tiger Mum Mode on" : "Tiger Mum Mode off"}
    >
      Tiger Mum {enabled ? "ON" : "OFF"}
    </button>
  );
}
```

Wire it into the co-pilot panel state:

```tsx
const [personaId, setPersonaId] = useState<PersonaId>(() => {
  return localStorage.getItem("runway-arcade.copilot-persona.v1") === "tiger_mum"
    ? "tiger_mum"
    : "professional";
});

useEffect(() => {
  localStorage.setItem("runway-arcade.copilot-persona.v1", personaId);
}, [personaId]);
```

Then render:

```tsx
<PersonaToggle value={personaId} onChange={setPersonaId} />
```

## Chat Request Shape

When the user sends a message or clicks a preset prompt, include the persona:

```ts
type ChatRequest = {
  message: string;
  scenarioId: string;
  personaId: "professional" | "tiger_mum";
};
```

Example:

```ts
await fetch("/api/chat", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    message,
    scenarioId,
    personaId
  })
});
```

## Backend Prompt Assembly

Keep the core safety prompt first. Add the persona prompt after it.

Do this:

```ts
const systemPrompt = [
  baseFinanceSafetyPrompt,
  toolUsePrompt,
  evidencePrompt,
  selectedPersona?.systemPrompt
].filter(Boolean).join("\n\n");
```

Do not do this:

```ts
const systemPrompt = selectedPersona.systemPrompt;
```

The persona is only a tone layer. It must not replace:

- tool rules
- approval gates
- evidence requirements
- Xero live/demo state distinctions
- "no writes unless verified" rules

## Response Rendering

Use the same response structure as the normal co-pilot:

1. tool calls
2. evidence
3. answer
4. risks
5. recommended action
6. approval requirement

Tiger Mum Mode can add one short line of flavour after the evidence-backed answer.

Good:

```text
Halcyon Retail owes GBP 12,400 and is 22 days overdue. It is the top rescue beacon. Prepare the friendly chase draft; nothing is sent until approval.

Auntie Mei says: this invoice has been relaxing long enough.
```

Bad:

```text
Just chase everyone now.
```

## Preset Prompt Behaviour

Use Tiger Mum Mode especially for:

- Run cash radar
- How much fuel remains?
- Who is sending rescue cash?
- What hazards are due this week?
- Plot a safe payment route
- Start MAYDAY diagnosis

Examples:

| Prompt | Tiger Mum Response Flavour |
| --- | --- |
| Run cash radar | "The runway is a number, not a feeling." |
| How much fuel remains? | "Cash is oxygen. We check oxygen first." |
| Who is sending rescue cash? | "Chase the money already owed to you." |
| What hazards are due this week? | "Loud supplier is not the same as critical supplier." |
| Plot a safe payment route | "Approval first, action second." |
| Start MAYDAY diagnosis | "No founder theatre. Protect payroll, tax and rent." |

## Lovable Prompt To Add The Feature

Paste this into Lovable when editing the source project:

```text
Add an optional "Tiger Mum Mode" tone to the Xero Co-Pilot.

Do not replace the existing co-pilot. Add a small switch in the Xero Co-Pilot panel header or above the preset prompts:
"Tiger Mum OFF/ON".

Persist it in localStorage with key "runway-arcade.copilot-persona.v1".

When enabled, send personaId: "tiger_mum" with chat requests and preset prompt requests.

The persona is "Auntie Mei", a strict, funny, evidence-led cashflow mentor. Humour must target cashflow behaviour, founder excuses, overdue invoices, supplier pressure and runway discipline. Do not use ethnic caricature, fake accent, shame or stereotypes.

Keep all existing finance guardrails:
- cite tool results and evidence cards
- distinguish demo fallback, simulation and live Xero
- never claim payments, chases or Xero writes happened unless verified
- require approval for every action
- keep deterministic calculations unchanged

Example flavour lines:
- "The bank account does not accept optimism as payment."
- "A spreadsheet with hope in it is still not a forecast."
- "This invoice has been relaxing long enough."
- "Payroll is not a plot twist."
- "Expected inflow is not cash until it lands."
```

## Acceptance Criteria

- Default co-pilot mode remains professional.
- User can toggle Tiger Mum Mode on and off.
- Toggle state persists after reload.
- Chat requests include `personaId`.
- Backend merges persona prompt after base safety instructions.
- No answer loses evidence cards, approval language or simulation/live-state wording.
- Persona jokes are cashflow jokes, not ethnicity jokes.
- MAYDAY mode still requires confirmation and never implies real Xero writes.
