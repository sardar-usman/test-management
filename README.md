# SprintSynergy – Test Management Tool

SprintSynergy is a full-stack QA test management platform for software teams to manage projects, test plans, manual test cases, executions, and reporting in one place.

Full-stack app built with Next.js + TypeScript + Tailwind + Prisma + NextAuth.

## Features Included (Phase 1 + Phase 2)

- Credential login with role-based access
  - Admin (full access)
  - Team (no admin settings access)
- Session persistence via NextAuth JWT sessions
- Project management (create/list/update/delete APIs)
- Test plan management (create/list with project links)
- Manual test case management
  - Auto-generated IDs (TC-001, ...)
  - Steps + expected results
  - Bulk status update API
  - CSV export
- Test execution API with execution history table
- Dashboard overview metrics + charts (Recharts)
- Recent activity feed
- Sidebar navigation + protected pages (+ reports page)
- Dark/light mode toggle
- Toast notifications (Sonner)
- Search/filter UX for projects, plans, and test cases
- Bulk execution update + duplicate test case action
- Execution evidence URL support
- Admin-only settings page
- Seed script for demo data

## Tech Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Prisma ORM
- Postgres (Vercel Postgres/Supabase compatible)
- NextAuth (Credentials provider)
- Recharts (installed, ready for chart pages)

## Environment Variables

Copy `.env.example` to `.env` and fill values:

```bash
cp .env.example .env
```

Required:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `TEAM_EMAIL`
- `TEAM_PASSWORD`

## Local Setup

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Open: http://localhost:3000

## Database Schema

Main entities:

- `Project`
- `TestPlan`
- `TestCase`
- `TestStep`
- `TestPlanCase` (many-to-many)
- `TestExecution` (execution history)
- `ActivityLog` (audit/activity feed)

Schema file: `prisma/schema.prisma`

## API Routes

- `POST/GET /api/projects`
- `GET/PUT/DELETE /api/projects/:id`
- `POST/GET /api/test-plans`
- `POST/GET/PATCH /api/test-cases`
- `GET/PUT/DELETE/POST /api/test-cases/:id` (POST duplicates)
- `POST /api/test-cases/:id/execute`
- `GET /api/test-cases/export`
- `GET /api/dashboard`
- `GET /api/activity`
- `GET/POST /api/auth/[...nextauth]`

## Deploy to Vercel

1. Push project to GitHub.
2. Import repo in Vercel.
3. Add env vars from `.env.example` in Vercel Project Settings.
4. Provision DB (Vercel Postgres or Supabase) and set `DATABASE_URL`.
5. Run one-time schema apply:
   ```bash
   npm run db:push
   ```
6. (Optional) Seed demo data:
   ```bash
   npm run db:seed
   ```
7. Deploy.
\n<!-- deploy-check: 2026-03-11T14:35:15Z -->
