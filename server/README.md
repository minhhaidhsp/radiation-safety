Backend (NestJS + TypeORM + Postgres)

Scripts
- `npm run start:dev` — start in watch mode
- `npm run build` — compile to `dist/`
- `npm start` — run compiled build

Env
Copy `.env.example` to `.env` and adjust if needed.

Docker (Postgres)
- `docker compose up -d`

Run
1) Start Postgres via Docker as above
2) Install deps: `npm i`
3) Copy `.env.example` to `.env` (port defaults to 3001)
4) Start dev server: `npm run start:dev`
API base: `http://localhost:3001/api`

Endpoints
- `GET /api/health`
- Forms: `GET/POST /api/forms`, `GET/PATCH/DELETE /api/forms/:id`
- Submissions: `GET/POST /api/submissions`, `GET/PATCH/DELETE /api/submissions/:id`
