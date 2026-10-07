# Review — Dashboard, Notes, Connectors (the three unbuilt surfaces)

> **status:** working (temporary) · **authoritative for:** findings on the prototype's Dashboard
> (conviction file), Notes and Connectors from an analyst's view, and the phase-6 changes ·
> **last verified:** 2026-10-05 at baseline `102c2ef`.

Sources: the shell/journey review agent and a rendered screenshot of the HDFC Dashboard. Depth is set
by D7: Dashboard gets a valuation frame, a dated event calendar and a `Triggered` falsifier state;
Notes and Connectors get polish only.

Note: the **built** product Dashboard is still a market and statements board
(`apps/web/app/dashboard/dashboard-workspace.tsx` 67–79), not this conviction file — here the
prototype is the vision, and nothing in the product competes with it.

## 1. Dashboard (10551–11072; HDFC 13289–13348)

**What works.** The conviction file is compelling, and the HDFC screenshot shows it at its best: "My
view" (Avoid / Watch / Build / Core) with a thesis in plain analyst prose; "What would change my
mind" — five open falsifiers, each with a measurable threshold ("Net interest margin prints below
3.26% again in Q2 FY27"; "CASA ratio falls below 32%"; "Gross NPA excluding agriculture rises above
1.0%"), where the answer will appear, and a link to the lead; one resolved. **"A view with nothing
that could disprove it is a preference, not a view"** (10761) will land with PMs. The decision log
asks why; the hand-over carries the reasoning.

**What a PM will miss** (their second question is always *"at what price, and when is the next
test?"*):
- A **price or valuation frame** — target and fair-value band, method, horizon, upside vs the current
  price, bull / base / bear. My view has only the four conviction states (10690). The corpus holds
  three broker SOTPs and targets for HDFC (Axis ₹975: core 1.9× FY28E adjusted book = ₹847 +
  subsidiaries ₹128 after a 20% holdco discount; DevenChoksey ₹1,011, subsidiaries ₹110 at 15%;
  Geojit ₹896) and HSIE's ₹1,870 at 21× for Infosys — usable as **the brokers'** frame, labelled as
  theirs, beside the analyst's own.
- A dated **event calendar** — "Next scheduled test: Q1 FY27" (10798) is a period, not a results or
  board-meeting date.
- **Estimates and revisions** vs consensus (consensus = honest boundary, D2).
- **Shareholding pattern** shifts; **sizing / active weight**; a **cross-name book** (→ the console as
  the coverage book, phase 6.2).

**Defects and gaps in the mechanics:**
- **Falsifiers have no "Triggered" state** (10953): open → watching → resolved, where "resolved" means
  it did *not* fire. There is no state for "my view broke".
- **Conviction moves before a reason exists** (10917, then the modal) — Cancel leaves it moved.
- **The custom metric's value is typed free text** but labelled "inherits their citations" (ledger
  A-31). Role is not checked (A-32).
- **Layout** (screenshot): "My view" leaves a large empty column beneath it beside the long falsifier
  list.
- **Consistency:** Infosys View health dates (A-12), decision log (A-13), "No Q1 FY27 results yet"
  (A-14); falsifier f3 on HDFC rests on the wrong loan-to-deposit conclusion (A-16).
- **No empty state** for a workspace with no view yet.

## 2. Notes (11074–11239)

- **Content** reads like a real analyst (5339–5357, 13367–13385).
- **Structure is tool-centric**: filters by originating surface (11080); relative times only
  ("yesterday").
- **Capture drops the context** (`refs:[]`, 11237) and **navigates away** to Notes (11238) — so
  "a judgement never loses its evidence" is not true at the moment of capture.
- **Rotated sticky notes** (11129) are off-tone for a buy-side desk; the edit icon is a magic `wand`
  (11159), which reads as AI.
- **Missing:** dated journal entries; note types (call · meeting · channel check); links to a
  falsifier or a decision; search.

## 3. Connectors (5368–5425, 11258–11321)

- **Authority is legible per card** ("Authority · Broker · never audited") — keep.
- **Permissions are display-only**; every card ends with an off "Write back".
- **"Inherited"** is used for connected sources (11301).
- **Missing for compliance:** where each model provider's data goes, and an audit line — a
  compliance-minded PM asks "where does my data go" first.
- **Leaks:** model meta "gpt-5.6-luna · effort low" (5408, ledger A-42); "LibreOffice engine
  detected"; the em-dash artefact "an outward action: sending mail…: is off" (11318).

## 4. Phase-6 changes (from D7)

1. **Dashboard:** valuation frame (analyst's band + the brokers' frames, each labelled and cited);
   dated event calendar; `Triggered` falsifier state; reason recorded before conviction moves; role
   check; an empty state; balanced layout.
2. **Console as the coverage book:** coverage age, conviction (capitalised), triggered falsifiers,
   next dated event per company.
3. **Notes:** dated entries and types; capture keeps the current object as a reference and stays on
   the page; no rotated stickies; an edit icon that is not a wand.
4. **Connectors:** one authority ladder; toggleable permissions with an audit line; "where does my
   data go" per model provider; current model names.
