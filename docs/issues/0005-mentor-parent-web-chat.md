# Issue 5: Mentor-Parent Web Chat Interface with Supabase Realtime

## What to build

Implement a real-time web chat UI on `/mentor/match/[matchId]` for mentors to converse with parents anonymously. Hook up Supabase Realtime database subscriptions to update the chat window immediately when a new parent message is inserted in the `Message` database table.

## Acceptance criteria

- [ ] Web chat UI is visible on `/mentor/match/[matchId]` when the match is `Active`.
- [ ] Real-time updates automatically insert new incoming parent messages into the chat bubble feed using Supabase Realtime subscriptions.
- [ ] Chat UI is disabled or hidden if the match status is `Suspended` or `Terminated` (safeguarding rule).
- [ ] Write integration tests for the message-sending and real-time receive flow.

## Blocked by

- [Issue 1: Supabase Route Protection & Login Pages](file:///Users/lukewilliams/code/MentorSafe/docs/issues/0001-route-protection-and-auth.md)
- [Issue 3: Supervisor Match Actions (Suspend / Terminate / Reactivate)](file:///Users/lukewilliams/code/MentorSafe/docs/issues/0003-supervisor-match-actions.md)
