# Ticket: FORGE-PILOT-003 - Create verification failure drill

## Goal

Add a controlled docs-only failure scenario to verify that Forge detect-and-report behavior is clear.

## Scope

- In scope:
  - Document a repeatable failure drill using an intentionally invalid markdown example.
- Out of scope:
  - Introducing unstable or destructive tests.

## Implementation notes

- Target files/paths:
  - `docs/verify-failure-drill.md`
- Approach:
  - Describe setup, expected verify failure signal, and cleanup/reset steps.

## Acceptance criteria

- [ ] Drill doc includes setup, run commands, expected output, and cleanup.
- [ ] Drill is safe to run repeatedly on a feature branch.

## Test plan

- Walk through drill steps manually and confirm they are executable.
- Verify markdown lint passes on committed baseline docs.

## Risk tier

- Tier 1 - Intentional temporary lint failure in branch-only drill.

## Rollback

- Revert drill edits or reset branch to baseline.
