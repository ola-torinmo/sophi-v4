# Medusa Backend – Railway Deployment

This is a **Medusa.js backend** configured to run on [Railway](https://railway.app) with a PostgreSQL database.

---

## 🚀 Getting Started (Local Development)

Medusa + Next.js Setup with PostgreSQL & Redis (Local + Railway)
Overview
This guide walks you through setting up Medusa backend and Next.js storefront, configuring PostgreSQL and Redis both locally and on Railway cloud platform. It covers environment variable configuration, database migrations, running builds, and deploying to Railway.

Prerequisites
Node.js (v18+ recommended)

PostgreSQL installed locally or access to a cloud PostgreSQL (e.g., Railway)

Redis installed locally or access to cloud Redis (e.g., Railway)

Git

Railway CLI (optional, for easier Railway management)

npm or yarn

1. Clone Your Project
bash
Copy
Edit
git clone <your-repo-url>
cd your-project-directory/medusa
2. Environment Variables Setup
Local Development
Create a .env.local file in your Medusa folder with your local database and Redis info:

env
Copy
Edit
NODE_ENV=development
DATABASE_URL=postgres://postgres:yourlocalpassword@localhost:5433/medusa_db
REDIS_URL=redis://localhost:6379
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:5173,http://localhost:9000
AUTH_CORS=http://localhost:5173,http://localhost:9000,http://localhost:8000
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
MEDUSA_ADMIN_ONBOARDING_TYPE=nextjs
MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY=medusa-storefront
Use your actual local Postgres user, password, and port (default often 5432 or your custom like 5433).

Ensure Redis is running locally on localhost:6379 (or your config).

Production (Railway)
Create a .env file or set environment variables via Railway dashboard with Railway provided URLs:

env
Copy
Edit
NODE_ENV=production
DATABASE_URL=postgresql://postgres:<railway_password>@<railway_host>:<railway_port>/railway
REDIS_URL=redis://default:<redis_password>@redis.railway.internal:6379
STORE_CORS=https://your-storefront-domain.com
ADMIN_CORS=https://your-admin-domain.com
AUTH_CORS=https://your-storefront-domain.com
JWT_SECRET=your-production-jwt-secret
COOKIE_SECRET=your-production-cookie-secret
MEDUSA_ADMIN_ONBOARDING_TYPE=nextjs
MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY=medusa-storefront
Important:

Use Railway’s public DB and Redis URLs — do not use localhost in production environment variables.

Adjust CORS origins to your deployed frontend/admin URLs.

Keep secrets strong and never commit .env files to git.

3. Medusa Config Setup (medusa-config.js or .ts)
Make sure your config reads env variables correctly:

js
Copy
Edit
const { loadEnv, defineConfig } = require('@medusajs/framework/utils')

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      redis_url: process.env.REDIS_URL
    }
  }
})
4. Installing Dependencies
Run in Medusa directory:

bash
Copy
Edit
npm install
5. Running Database Migrations Locally
Before starting your backend, run migrations to create tables:

bash
Copy
Edit
npx medusa db:setup
or separately:

bash
Copy
Edit
npx medusa db:create
npx medusa db:migrate
If you get errors about missing ts-node, install it locally:

bash
Copy
Edit
npm install ts-node
6. Starting Medusa Backend Locally
bash
Copy
Edit
npm run develop
Or

bash
Copy
Edit
medusa develop
This starts the backend with watching and hot reload.

7. Building for Production
bash
Copy
Edit
npm run build
8. Starting Medusa Production Server Locally
bash
Copy
Edit
medusa start
9. Deploying to Railway
Add PostgreSQL and Redis plugins via Railway dashboard.

Copy their public connection strings to Railway environment variables.

Set all required env variables in Railway (see Step 2).

Run migrations on Railway server (via Railway console or SSH):

bash
Copy
Edit
npx medusa db:migrate
Build the project on Railway:

bash
Copy
Edit
npm run build
Start the service:

bash
Copy
Edit
medusa start
10. Common Issues & Tips
redisUrl not found warning: Means REDIS_URL is missing or misconfigured. Ensure you set REDIS_URL env var correctly.

Database connection errors: Double-check DATABASE_URL for typos, ensure port and host are reachable.

Missing tables (relation "public.currency" does not exist): Usually means migrations haven’t run or ran on the wrong DB.

ts-node errors on migration: Install ts-node locally, or set NODE_ENV=production if running built JS.

CORS errors: Make sure CORS URLs are correctly set in environment variables and match your frontend/admin URLs.

Local and Production configs must be separate. Use .env.local for local development, .env or Railway dashboard variables for production.

Never commit .env files with secrets to git.

11. Helpful Commands Summary
Command	Purpose
npm run develop	Start Medusa backend with hot reload locally
npm run build	Build backend and frontend for production
medusa start	Start production backend server
npx medusa db:create	Create DB (if needed)
npx medusa db:migrate	Run migrations
npx medusa db:setup	Create DB and run migrations

Feel free to copy this README into your project and update paths, URLs, and secrets as needed.

If you want, I can also help you generate a ready-to-go .env.example file or a deployment script for Railway!