# Issue 7: Supervisor Audit Ledger & CSV Export

## What to build

Create a read-only auditing dashboard for supervisors to inspect communication histories and session updates for safeguarding compliance. Provide an option to download the full logs as a CSV.

## Acceptance criteria

- [ ] Add an "Audit Ledger" details link or modal on the matches list in `/supervisor`.
- [ ] The ledger shows a chronological timeline of all relayed messages (timestamp, sender, content) and all session updates (timestamp, event type).
- [ ] The audit interface is strictly read-only.
- [ ] Add an "Export CSV" button that triggers a download of a formatted CSV log of all messaging and session activity.
- [ ] Write unit/integration tests for the CSV formatter.

## Blocked by

- [Issue 3: Supervisor Match Actions (Suspend / Terminate / Reactivate)](file:///Users/lukewilliams/code/MentorSafe/docs/issues/0003-supervisor-match-actions.md)
- [Issue 4: Mentor Dashboard & One-Tap Session Tracker](file:///Users/lukewilliams/code/MentorSafe/docs/issues/0004-mentor-dashboard-session-tracker.md)
- [Issue 5: Mentor-Parent Web Chat Interface with Supabase Realtime](file:///Users/lukewilliams/code/MentorSafe/docs/issues/0005-mentor-parent-web-chat.md)
