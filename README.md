# ApplyMate

ApplyMate is a junior-friendly job application tracking platform. It helps developers manage applications, follow-up reminders, networking contacts, and document checklists from a single dashboard.

## Tech Stack

- Frontend: React, TypeScript, Vite, React Router, Tailwind CSS
- Backend: Node.js, NestJS, TypeScript, Prisma ORM, SQLite
- Auth: JWT, bcrypt

## Features

- Register, login, logout, and protected routes
- Dashboard with live database-driven summary cards
- Full CRUD for job applications
- Search and filter applications by status, job type, and work mode
- Follow-up reminders with done/incomplete state
- Contacts and networking notes per application
- Documents checklist per application
- Demo seed data for local development

## Project Structure

```text
ApplyMate/
  backend/
  frontend/
```

## Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create your local env file:

```bash
cp .env.example .env
```

3. Generate the Prisma client and create the database:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

If `prisma migrate dev` fails in your local environment, use the checked-in SQLite initializer instead:

```bash
npm run db:init
```

4. Seed demo data:

```bash
npm run seed
```

5. Start the API:

```bash
npm run start:dev
```

The backend runs on `http://localhost:3000`.

### Backend Environment Variables

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="dev-secret-change-later"
```

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create your frontend env file:

```bash
cp .env.example .env
```

3. Start the app:

```bash
npm run dev
```

The frontend expects:

```env
VITE_API_URL=http://localhost:3000
```

## Demo Login

- Email: `demo@applymate.com`
- Password: `password123`

## Main API Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Applications

- `GET /applications`
- `GET /applications/:id`
- `POST /applications`
- `PATCH /applications/:id`
- `DELETE /applications/:id`

### Reminders

- `GET /reminders`
- `POST /applications/:applicationId/reminders`
- `PATCH /reminders/:id`
- `DELETE /reminders/:id`

### Contacts

- `POST /applications/:applicationId/contacts`
- `PATCH /contacts/:id`
- `DELETE /contacts/:id`

### Checklist

- `GET /applications/:applicationId/checklist`
- `PATCH /applications/:applicationId/checklist`

### Dashboard

- `GET /dashboard/summary`

## Notes

- All application-related data is scoped to the authenticated user.
- The frontend stores the JWT in `localStorage` and sends it in the `Authorization` header.
- The dashboard, applications, reminders, and checklist views use real API calls to the backend.
