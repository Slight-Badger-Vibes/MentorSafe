# Issue 3: Supervisor Match Actions (Suspend / Terminate / Reactivate)

## What to build

Implement Supervisor control over Match lifecycles. A supervisor must be able to suspend, terminate, or reactivate a match bridge. This transition must be reflected in the database and block/allow routing in the future.

## Acceptance criteria

- [ ] Implement transition functions `suspendMatch`, `terminateMatch`, and `activateMatch` in `src/domain/match.ts`.
- [ ] Implement corresponding server actions in `src/app/actions/supervisor.ts` to update the match status in the database.
- [ ] Add Suspend, Terminate, and Activate action buttons to the matches list in `src/app/supervisor/page.tsx`.
- [ ] Show status badges with appropriate colors (Active = Green, Suspended = Yellow, Terminated = Red).
- [ ] Verify functionality with unit tests in `src/domain/match.test.ts`.

## Blocked by

None - can start immediately.
