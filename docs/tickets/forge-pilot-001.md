# Ticket: FORGE-PILOT-001 - Add pilot execution guide

## Goal
Add a concise guide that explains how to run the Forge pilot flow in this repository.

## Scope
- In scope:
  - Add a "Forge pilot" section to `README.md` with the standard command sequence.
- Out of scope:
  - Any source code or workflow logic changes.

## Implementation notes
- Target files/paths:
  - `README.md`
- Approach:
  - Keep instructions short and copy/paste friendly.

## Acceptance criteria
- [ ] `README.md` includes a Forge pilot section with intake, plan, implement, verify, and pr commands.
- [ ] Instructions reference docs-only mode.

## Test plan
- Confirm command examples are valid for this repository path structure.
- Verify markdown lint passes.

## Risk tier
- Tier 0 - Docs-only change.

## Rollback
- Revert the docs commit.
