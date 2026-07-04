# Architecture and Diagrams

These diagrams describe the MVP inferred from the preview and a recommended production shape. Standalone Mermaid files are also available in `docs/diagrams/`.

## System Context

```mermaid
flowchart LR
    User["Small business user"]
    Browser["Runway Arcade web app"]
    Backend["Application backend"]
    Xero["Xero Accounting API"]
    AI["AI co-pilot runtime"]
    Audit["Audit store"]

    User --> Browser
    Browser --> Backend
    Backend --> Xero
    Backend --> AI
    Backend --> Audit
    AI --> Backend
```

## MVP Data Flow

```mermaid
flowchart TD
    Start["User opens scenario"]
    Adapter["Xero adapter or demo fixture adapter"]
    Normalise["Normalise finance records"]
    Calculate["Finance helper calculations"]
    Render["Dashboard cards"]
    Prompt["Co-pilot prompt"]
    Tools["Read-only AI tools"]
    Evidence["Evidence cards"]
    Proposal["Approval queue"]
    Audit["Audit trail"]

    Start --> Adapter
    Adapter --> Normalise
    Normalise --> Calculate
    Calculate --> Render
    Render --> Prompt
    Prompt --> Tools
    Tools --> Evidence
    Evidence --> Proposal
    Proposal --> Audit
```

## User Flow

```mermaid
flowchart TD
    A["Open Runway Arcade"]
    B["Select scenario"]
    C["Review fuel gauge and radar hazards"]
    D["Ask co-pilot or use preset prompt"]
    E["Review tool calls and evidence"]
    F["Review proposed route or action"]
    G{"Approve simulation?"}
    H["Record simulated approval"]
    I["Search or export audit trail"]
    J["No action taken"]

    A --> B --> C --> D --> E --> F --> G
    G -->|Yes| H --> I
    G -->|No| J
```

## Approval State Machine

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> NeedsApproval: recommendation created
    NeedsApproval --> SimApproved: user selects approve simulate
    NeedsApproval --> Dismissed: user ignores or clears
    SimApproved --> Audited: audit event recorded
    Audited --> [*]
```

## Production Xero Adapter Boundary

```mermaid
flowchart LR
    UI["Dashboard and co-pilot UI"]
    API["Backend API"]
    Domain["Finance domain services"]
    Adapter["Xero adapter interface"]
    Demo["Demo fixture implementation"]
    Live["Live Xero OAuth implementation"]
    Xero["Xero Accounting API"]

    UI --> API
    API --> Domain
    Domain --> Adapter
    Adapter --> Demo
    Adapter --> Live
    Live --> Xero
```

## Co-Pilot Tool Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Dashboard
    participant ORCH as Co-pilot Orchestrator
    participant TOOL as Finance Tools
    participant E as Evidence Renderer
    participant A as Approval Queue

    U->>UI: Ask cash question
    UI->>ORCH: Submit prompt and scenario context
    ORCH->>TOOL: Run allowed read-only tools
    TOOL-->>ORCH: Structured results
    ORCH->>E: Create safe evidence cards
    E-->>UI: Evidence cards
    ORCH-->>UI: Summary, risks, recommendations
    UI->>A: Create proposed actions when applicable
```

