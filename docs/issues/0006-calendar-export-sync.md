# Issue 6: Calendar Export & Sync (.ics)

## What to build

Generate and export an iCalendar (`.ics`) file for scheduled sessions so mentors can sync meetings with external calendars (Apple, Google, Outlook).

## Acceptance criteria

- [ ] Implement `src/utils/calendar.ts` generating a compliant iCalendar spec string with match proxy number details.
- [ ] Add a clickable "Add to Calendar" button next to scheduled sessions in `/mentor/match/[matchId]`.
- [ ] Clicking the button downloads a valid `.ics` file containing the event start/end times and description.
- [ ] Write unit tests for the `.ics` generator utility.

## Blocked by

- [Issue 4: Mentor Dashboard & One-Tap Session Tracker](file:///Users/lukewilliams/code/MentorSafe/docs/issues/0004-mentor-dashboard-session-tracker.md)
