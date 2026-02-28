# Copilot Instructions for camera_website

## Mandatory pre-read context (every coding task)
Before proposing changes, editing files, or running implementation commands, always read these files first:

1. `docs/manus-context/PROJECT_CONTEXT.md`
2. `docs/manus-context/DEVELOPMENT_NOTES.md`
3. `docs/manus-context/DESIGN_SYSTEM.md`
4. `docs/manus-context/COMPONENT_GUIDE.md`

If any file is missing, stop and report which one is missing.

## Development constraints
- Keep changes minimal and aligned with existing architecture.
- Follow the design tokens, spacing, typography, and component patterns documented in `docs/manus-context/DESIGN_SYSTEM.md`.
- Reuse existing components/patterns before creating new ones.
- For any user-facing code/content changes, update and verify all supported language versions (currently `zh`, `en`, and `ja`) to avoid language mismatch.

## Documentation sync rules (required)
When code changes are made, update the relevant Manus context docs in the same task:

- Update `docs/manus-context/DEVELOPMENT_NOTES.md` with date, summary, files changed, and rationale.
- Update `docs/manus-context/COMPONENT_GUIDE.md` if component behavior/props/usage changed.
- Update `docs/manus-context/DESIGN_SYSTEM.md` if visual tokens, spacing, layout, or interaction rules changed.
- Update `docs/manus-context/PROJECT_CONTEXT.md` if product scope, feature status, or architecture context changed.

If no documentation update is needed, explicitly state why in the final summary.

### Development log consolidation
When `DEVELOPMENT_NOTES.md` contains more than 20 individual change entries (### headings under "Recent Changes & Optimizations"), consolidate older entries:
- Keep the most recent ~15 entries as-is for detailed reference.
- Group older entries by date or theme into summary sections (e.g. "2026-02-14: Initial Setup & Core Features") with a brief bullet list of what was done, without full Files Changed / Rationale detail.
- Preserve all information that is still architecturally relevant; only compress routine/incremental tweaks.
- For same-day entries, merge thematically related changes into a single entry (e.g. multiple navigation fixes → one "Navigation & Scroll-Top Fixes" entry) while preserving all key scope details and affected files.

## Pre-commit / pre-push checklist
Before committing or pushing to `main`, verify:

1. **DEVELOPMENT_NOTES.md** — All code changes from this session are logged (date, summary, files changed, rationale).
2. **COMPONENT_GUIDE.md** — Updated if any component props, behavior, or usage patterns changed.
3. **DESIGN_SYSTEM.md** — Updated if any visual tokens, spacing, layout, or interaction rules changed.
4. **PROJECT_CONTEXT.md** — Updated if product scope, feature status, routes, or architecture changed.

If any document is stale, update it before committing. If no update is needed, confirm explicitly in the commit summary.

## Prioritization
If there is any conflict:
1. User request
2. This file (`.github/copilot-instructions.md`)
3. Existing project conventions in the codebase
