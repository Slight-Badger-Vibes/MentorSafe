# Domain Context: MentorSafe

This document defines the core domain language, entities, and architectural patterns for the MentorSafe project.

## Glossary

| Term | Definition |
| :--- | :--- |
| **Anonymous Messaging Relay** | The SMS relay module that enables anonymous communication between Mentors and Parents. |
| **One-Tap Session Tracker** | The activity tracking module designed to minimize cognitive friction for real-time reporting. |
| **Kill-Switch** | The administrative ability to immediately terminate a communication bridge. |
| **Session Status Update** | A UI pattern allowing Mentors to log session transitions (Started, Completed) with a single interaction. |
| **Match** | The formal, supervised relationship linking a Mentor, a Young Person, and a Parent. |
| **Proxy Number** | A virtual phone number assigned to a Match to mask real contact details. |
| **Web Chat Interface** | The real-time messaging application used by Mentors to text Parents without exposing mobile numbers. |


## Core Entities & Branded Types

We use **Branded Types** to ensure type safety and prevent ID mixing across the domain.

```typescript
/** Base Brand pattern */
type Brand<K, T> = K & { __brand: T };

/** Entity Identifiers */
type MentorId = Brand<string, 'MentorId'>;
type ParentId = Brand<string, 'ParentId'>;
type YoungPersonId = Brand<string, 'YoungPersonId'>;
type SupervisorId = Brand<string, 'SupervisorId'>;
type MatchId = Brand<string, 'MatchId'>;
type SessionId = Brand<string, 'SessionId'>;

/** Domain Primitives */
type PhoneNumber = Brand<string, 'PhoneNumber'>;
```

### Entity Descriptions

- **Mentor**: A volunteer authorized by the council to work with Young People.
- **Young Person**: The minor receiving mentoring services.
- **Parent**: The legal guardian of the Young Person, and the primary contact for logistics.
- **Supervisor**: An administrative user with the power to manage Matches and audit logs.
- **Match**: A unique mapping between (1 Mentor + 1 Young Person + 1 Parent).
- **Session**: A discrete event with a start time, end time, and logged status updates.
- **Message**: A text communication routed through a Proxy Number.

## State Machines

### Session Lifecycle
Sessions follow a strict transition path to ensure compliance:

1. **Scheduled**: The session is planned for a future date/time.
2. **Started**: The Mentor has picked up the Young Person (One-Tap update).
3. **Completed**: The Young Person has been dropped home (One-Tap update).
4. **Cancelled**: The session was aborted before completion.

### Match Status
- **Active**: Communication channel is open; logging is enabled.
- **Suspended**: Communication is temporarily blocked by a Supervisor.
- **Terminated**: Relationship ended; Kill-Switch engaged; all routing severed.

## Data Sovereignty & Security
- **PII Isolation**: Personal phone numbers are only stored in the encrypted database and never shared between parties.
- **UK Residency**: All message processing and data storage must reside within UK jurisdictions.
- **Audit Immutability**: Message logs and session timestamps are write-only/read-only (no modifications allowed after creation).
