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

## Documentation sync rules (required)
When code changes are made, update the relevant Manus context docs in the same task:

- Update `docs/manus-context/DEVELOPMENT_NOTES.md` with date, summary, files changed, and rationale.
- Update `docs/manus-context/COMPONENT_GUIDE.md` if component behavior/props/usage changed.
- Update `docs/manus-context/DESIGN_SYSTEM.md` if visual tokens, spacing, layout, or interaction rules changed.
- Update `docs/manus-context/PROJECT_CONTEXT.md` if product scope, feature status, or architecture context changed.

If no documentation update is needed, explicitly state why in the final summary.

## Prioritization
If there is any conflict:
1. User request
2. This file (`.github/copilot-instructions.md`)
3. Existing project conventions in the codebase
