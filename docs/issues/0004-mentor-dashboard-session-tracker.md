# Issue 4: Mentor Dashboard & One-Tap Session Tracker

## What to build

Develop a mobile-optimized mentor interface that displays a mentor's matches and allows them to schedule, start, complete, or cancel sessions with one tap.

## Acceptance criteria

- [ ] Build `/mentor` landing dashboard (lists matches assigned to the logged-in mentor).
- [ ] Build `/mentor/match/[matchId]` route showing match details (Parent Name, Young Person Name).
- [ ] Implement a form to schedule a future session and a table of scheduled sessions.
- [ ] Implement one-tap action buttons ("Start Session", "Complete Session", "Cancel Session") that execute the corresponding server actions.
- [ ] Ensure buttons display loading and success states with smooth micro-animations.
- [ ] Write integration tests for the scheduling and state transitions.

## Blocked by

- [Issue 1: Supabase Route Protection & Login Pages](file:///Users/lukewilliams/code/MentorSafe/docs/issues/0001-route-protection-and-auth.md)
- [Issue 2: Session Domain Logic & Transition Validations](file:///Users/lukewilliams/code/MentorSafe/docs/issues/0002-session-domain-logic.md)
