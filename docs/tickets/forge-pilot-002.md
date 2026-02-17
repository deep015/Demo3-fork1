# Ticket: FORGE-PILOT-002 - Add receipt quality checklist

## Goal
Document what "good" Forge receipts look like so each pilot run can be evaluated consistently.

## Scope
- In scope:
  - Add a receipt quality checklist doc under `docs/`.
- Out of scope:
  - Changing Forge runtime behavior.

## Implementation notes
- Target files/paths:
  - `docs/forge-receipt-checklist.md`
- Approach:
  - Define required receipt artifacts and quick pass/fail criteria.

## Acceptance criteria
- [ ] New checklist file exists with stage-by-stage checks.
- [ ] Checklist includes receipt presence, traceability, and PR-output quality criteria.

## Test plan
- Review checklist for clarity and completeness.
- Verify markdown lint passes.

## Risk tier
- Tier 0 - Docs-only change.

## Rollback
- Revert the docs commit.
