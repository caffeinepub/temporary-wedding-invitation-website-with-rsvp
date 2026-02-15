# Specification

## Summary
**Goal:** Simplify the RSVP flow so guests only provide their name and invite code (plus optional message if already present), removing attendance status and guest count throughout the app.

**Planned changes:**
- Update the public RSVP form UI to remove “Will you be attending?” and “Number of Guests,” keeping required validation for “Your Name” and “Invite Code” (and optional message if present).
- Adjust the RSVP submission client logic (React Query mutation and related types/usages) to submit the simplified RSVP payload and compile cleanly.
- Update the backend RSVP submission method to no longer require attendance status (and guest count), while keeping existing invite-code validation and storing RSVPs compatible with the current admin listing.
- Update the admin RSVP dashboard to remove attendance-based statistics and any status column/badges, while keeping the RSVP list readable with guest name, invite code, and submission date.

**User-visible outcome:** Guests can submit an RSVP using only their name and invite code (optionally a message), and admins can view RSVPs without any attendance/status or guest-count-related fields or stats.
