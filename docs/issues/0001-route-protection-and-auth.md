# Issue 1: Supabase Route Protection & Login Pages

## What to build

Build separate login endpoints for mentors (`/login/mentor`) and supervisors (`/login/supervisor`) using Supabase Auth. Secure all routes starting with `/mentor` or `/supervisor` by configuring middleware to check if the logged-in user's email exists in the respective database tables (`Mentor` or `Supervisor`). Reject authorization and clear session if not registered.

## Acceptance criteria

- [ ] Login forms at `/login/mentor` and `/login/supervisor` handle user authentication via Supabase Auth.
- [ ] Middleware blocks unauthorized users from accessing routes starting with `/mentor` or `/supervisor`.
- [ ] Access is allowed ONLY if the authenticated user's email exists in the corresponding database table (`Mentor` for `/mentor`, `Supervisor` for `/supervisor`).
- [ ] Automated tests verify middleware redirect behavior for valid and invalid credentials/emails.

## Blocked by

None - can start immediately.
