# ADR 0001: Mentor Web Chat & Supabase Auth Integration

## Status
Accepted

## Context
Volunteers in local council youth mentoring programs require a way to communicate with parents anonymously. The initial plan involved a pure SMS-to-SMS relay. However, to enhance the user experience and reduce the reliance on personal mobile SMS for mentors, we are building a Web Chat interface for Mentors. 

This requires:
- Secure authentication for Mentors and Supervisors.
- Association between Supabase Auth users and our database records.
- Real-time updates when parents reply via SMS.
- Safeguarding controls for supervisors, including auditing and the ability to sever communication channels.

## Decisions

### 1. Separate Login Endpoints
We will implement distinct login endpoints:
- `/login/supervisor`: Redirects to `/supervisor` upon successful verification.
- `/login/mentor`: Redirects to `/mentor` upon successful verification.

*Rationale*: This future-proofs the system. While volunteers can authenticate using standard Supabase email/password or magic links, Supervisors may eventually need to authenticate using a Council-managed Identity Provider (IdP) via SAML or OIDC.

### 2. User Mapping
 we will add an `email` field to the `Mentor` model. 
* Mapping: Upon logging in, the application will query the corresponding table (`Mentor` or `Supervisor`) by the authenticated user's email.
* Authorization: If the email does not exist in the respective database table, access is denied and the session is terminated. This enforces that only supervisor-approved mentors can access the dashboard.

### 3. Supabase Realtime
We will use Supabase Realtime database subscriptions to update the Mentor's Web Chat interface instantly.
* Rationale: Instant updates provide a premium user experience with minimal message latency. Because our volume is well within the Supabase Free Plan limits (200 concurrent connections, 2 million messages/month), this incurs no additional cost.

### 4. Supervisor Audit Logs & CSV Export
The supervisor audit view for matches will feature:
* A visual chat bubble timeline including precise timestamps.
* A CSV export feature to download the unalterable history of the conversation for compliance and safeguarding archives.

## Consequences
- The database schema must be updated to add `email` to `Mentor`.
- Next.js middleware and API routes must enforce authentication and role verification based on database lookups.
- Supervisors must define the mentor's email address when onboarding a mentor.
