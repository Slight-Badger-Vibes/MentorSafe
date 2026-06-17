# Issue 2: Session Domain Logic & Transition Validations

## What to build

Implement the core session state machine in the domain layer. Support the `Scheduled`, `Started`, `Completed`, and `Cancelled` states with explicit transitions. Enforce constraints: a session can only be cancelled while in the `Scheduled` state, and cannot be started/completed/cancelled outside allowed transitions. Return `Result` patterns for all transition functions to avoid throwing exceptions.

## Acceptance criteria

- [ ] Define the `Session` domain object and `SessionStatus` in `src/domain/session.ts` using branded types (`SessionId`, `MatchId`).
- [ ] Implement `createSession`, `startSession`, `completeSession`, and `cancelSession` returning `Result<Session>`.
- [ ] Enforce the constraint: cancellations are ONLY allowed in the `Scheduled` state. Once `Started`, a session cannot be cancelled; it must proceed to `Completed`.
- [ ] Unit tests cover all valid and invalid transitions in `src/domain/session.test.ts`.

## Blocked by

None - can start immediately.
