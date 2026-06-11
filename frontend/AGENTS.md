# AGENTS.md

Frontend-local guidance for the Stellaroid Earn Next.js app.

## Scope

- Applies to files under `frontend/`.
- Follow the repository root `AGENTS.md` first, then this file.
- Prefer closer `AGENTS.md` files if any are added in deeper subfolders.

## Operating Notes

- Identify target paths from the repository root before running repo-wide changes.
- Prefer existing local docs, especially `README.md`, `ROADMAP.md`, `docs/`, and frontend stack manifests.
- Confirm required tooling and environment before running heavy commands.

## Change Control

- Keep changes scoped to the task.
- Do not treat generated artifacts such as `.tmp`, `.codex`, `node_modules`, `.next`, `build`, or `.worktrees` as repository inputs.
- Do not commit credentials, secrets, local env files, logs, browser profiles, Playwright reports, or Vercel local state.

## Verification

- Run at least one repository-native verification command after meaningful frontend changes.
- Use `npm run lint`, `npm run build`, `npm run test:unit`, or `npm run test:e2e` when the changed surface warrants it.
- Update docs or notes when behavior, architecture, public routes, or deployment flow changes.

## Date

- Created: 2026-05-29
- Cleaned: 2026-06-11
