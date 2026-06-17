# PRD: MentorSafe - Anonymous Communication & Admin Portal

## Problem Statement
Volunteers in local council youth mentoring programs face an operational bottleneck due to strict safeguarding policies:
- **The Communication Chasm**: Outbound calls from withheld numbers are frequently ignored by parents, leading to coordination failures.
- **The Async Barrier**: Mentors cannot use SMS without exposing private identities, preventing fluid coordination.
- **The Administrative Burden**: Manual reporting of safety updates (pickups/drop-offs) and retrospective logs creates high cognitive friction, leading to delayed or forgotten compliance data.
- **The Supervisory Blindspot**: Supervisors lack real-time visibility into active coordination, creating unmonitored risk vectors.

## Solution
A secure, anonymous communication and administrative platform that bridges the gap between Mentors and Parents while automating compliance.
- **Anonymous Messaging Relay**: An SMS relay that masks personal identities.
- **One-Tap Session Tracker**: A one-tap interface for real-time safety logging and session management.
- **Supervisory Ledger**: Centralized control for authorizing relationships and auditing communication history.

## User Stories
1. **As a Volunteer Mentor**, I want to safely text a youth’s parent to coordinate pickups and drop-offs without exposing my private mobile number, so that I can coordinate fluidly while maintaining my privacy.
2. **As a Volunteer Mentor**, I want to instantly log my real-time session status updates with a single tap, so that I can focus on the young person instead of administrative tracking.
3. **As a Parent**, I want to receive and reply to standard SMS updates on my native messaging app from a recognizable number, without needing to install new software or manage logins.
4. **As a Scheme Supervisor**, I want a centralized ledger where I can authorize relationships, immediately revoke communication lines, and audit unalterable histories of messages and session timestamps for total safeguarding compliance.
5. **As a Volunteer Mentor**, I want to schedule future sessions and export them to my personal calendar (Apple/Google/Outlook) with a single click, so I can stay organized without manual entry.

## Functional Modules

### Module 1: Anonymous Messaging Relay
- **Identity Masking**: Messages from mentors appear to parents as a dedicated council-owned number.
- **Frictionless Inbound**: Replies automatically route back to the authorized mentor's interface.
- **The Kill-Switch**: Supervisors can immediately terminate specific communication lines.
- **Data Sovereignty**: Sensitive session details must remain within UK data jurisdictions; no processing by external cloud AI or multi-tenant platforms outside the UK.

### Module 2: One-Tap Session Tracker
- **Decoupled Architecture**: Tracking functions independently of the messaging engine (usable by mentors who prefer phone calls).
- **Calendar Sync**: One-click export of scheduled sessions to native calendars.
- **One-Tap Operational Audits**: Real-time logging of session states (e.g., Session Started, Session Completed) with automated timestamps.

## Implementation Decisions
- **Framework**: Next.js (TypeScript) for the management portal and mentor interface.
- **Communication Layer**: SMS Relay/Proxy (e.g., Twilio) with UK-based data residency where possible.
- **Architecture**: Decoupled Messaging and Tracking modules to allow flexible usage.
- **Data Model**:
    - `User`: Roles (Supervisor, Mentor, Parent).
    - `Match`: Authorized link between Mentor, Young Person, and Parent.
    - `Session`: Logged activity with automated timestamps.
    - `AuditLog`: Unalterable history of SMS and status changes.

## Testing Decisions
- **Unit Tests**: Domain logic for `Match` lifecycle and `Session` transitions (Vitest).
- **Integration Tests**: SMS routing and routing-back logic verification.
- **E2E Tests**: Supervisor match creation → Mentor one-tap status update → Parent SMS reception (Playwright).
- **Compliance Audit**: Verify that PII is never exposed in logs or to unauthorized users.

## Out of Scope
- Direct Mentor-to-Mentee (Young Person) messaging.
- Real-time video/voice calling.
- Native mobile apps (initial phase).
- File/Document sharing.

## Further Notes
- This project must adhere to strict safeguarding and GDPR requirements.
- The "Mentee" (Young Person) is the subject of the relationship but not a direct user of the communication tool in this initial phase.
