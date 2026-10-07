---
name: n4a-contract
description: Add or change an API contract / shared schema for N4A, keeping packages/contracts, the FastAPI OpenAPI spec, the generated TS client, and the mock server in sync. Use whenever a cross-service interface (graph schema, DTO, endpoint) is created or modified.
---

# n4a-contract — change the cross-service contract safely

The TS app and the Python AI service build in parallel only because they share one frozen contract.
Changing it carelessly breaks both. This skill keeps the seam coherent.

## The contract lives in three mirrored places (keep them in sync, same change)
1. `packages/contracts` — canonical TS/zod schemas (graph nodes/edges, Citation, DTOs).
2. `services/ai` — Pydantic v2 models mirroring the same shapes; FastAPI generates the OpenAPI spec.
3. The generated TS client (`openapi-typescript`) + the mock server the frontend builds against.

## Steps
1. **Check for an ADR trigger:** changing the **graph schema** (`ARCHITECTURE.md §3`) or a core entity is
   ADR-level — write/Update the ADR first and confirm the change is intended.
2. **Edit the canonical schema** in `packages/contracts` (zod). Keep names/semantics identical to the
   design-system graph contract (categories, stances, edge types, Citation = provenance atom).
3. **Mirror in Pydantic** in `services/ai`; update the FastAPI route(s) and regenerate OpenAPI.
4. **Regenerate the TS client** and update the **mock server** so the frontend stays unblocked.
5. **Migrate data** if a Postgres table shape changed (add a migration; never break existing rows silently).
6. **Update both sides' tests** to the new shape; run typecheck on both stacks.
7. **Note it** in `PROGRESS.md`; if the graph schema moved, update `ARCHITECTURE.md §3` too.

## Invariants to preserve
- `Citation[]` stays required wherever provenance is promised (AI outputs, notes, signals, edges).
- Edge `type` and node `category` enums stay aligned with the design-system color system.
- Don't add app-only fields the AI service can't populate, or vice versa — the contract is the union both
  honor.
