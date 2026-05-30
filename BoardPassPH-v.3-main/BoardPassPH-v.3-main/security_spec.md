# Firestore Security Specification: BoardPassPH

This document defines the data invariants, threat model, and test specifications for the BoardPassPH review platform Firestore security configuration.

## 1. Data Invariants

- **Profiles (`/profiles/{email}`)**:
  - A profile document can only be created or modified by an authenticated user whose email matches the document ID (lower-cased).
  - Users cannot change their own `tier` field on standard updates. Upgrades are only processed via GCash approved states or administrative backends.
  - Standard user operations must never reset or diminish accumulated `totalXp` or `streak` indicators.
- **Feedbacks (`/feedbacks/{feedbackId}`)**:
  - Any signed-in candidate can submit feedbacks or diagnostics. Reads of other users' submissions are restricted.
- **GCash Payment Requests (`/gcash_requests/{requestId}`)**:
  - Submissions can format with pending states. Approved/Rejected actions can only be executed by administrators.
- **Bulletins and Custom Announcements (`/custom_announcements/{announcementId}`)**:
  - Read-only for all. Creations and updates can only be executed by verified admins.
- **Custom MCQ Pool (`/custom_seed_questions/{questionId}`)**:
  - Read-only for users to practice. Creations and updates are restricted to admin access.

---

## 2. Dynamic Threat Model: The "Dirty Dozen" Payloads

Here are the 12 payloads targeting identity, state shortcutting, and escalation:

1. **Self-Upgrade Attack**: Standard user tries to force write `tier: "Pro Suite"` to their profile without payment clearance.
2. **Identity Spoofing**: User `auth.uid` tries to modify a profile keyed to `target@student.edu` where they are not the owner.
3. **Admin Fraud**: Standard user attempts to post a news bulletin under `/custom_announcements/fake_broadcast`.
4. **Illegal GCash Approval**: User attempts to update a pending ticket to `status: "approved"` to bypass payments.
5. **Ghost Field Poisoning**: Profile write attempt containing non-schema fields like `isMasterAdmin: true`.
6. **Denial-of-Wallet ID Attack**: Injecting 1500-character junk document GUIDs to deplete indexing budget.
7. **Negative XP Drain**: Setting `totalXp: -10000` to break leaderboard rankings.
8. **Malicious Question Injection**: Trying to seed spam MCQ items into the questions collection.
9. **Private Feedback Hijacking**: Querying and reading other candidates' private bug feedbacks.
10. **Immutable Timestamp Forgery**: Forging a profile's `createdAt` or `updatedAt` field with an arbitrary date in 2030 instead of `request.time`.
11. **Streak Poisoning**: Direct write to bypass RPG leveling algorithms and input a high fake streak.
12. **Anonymous Role Elevation**: Unauthenticated guest user trying to create standard profiles on the cluster.

---

## 3. Security Test Scenarios

The test runner will ensure:
- Any unauthorized write or unauthorized query triggers a `PERMISSION_DENIED` exception.
- Standard clients are limited strictly to self-oriented fields.
- Admin rules guard high-priority routes safely.
