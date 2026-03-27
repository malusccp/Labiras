# Fastify Backend with SQLite

A clean Fastify backend with better-sqlite3 integration for user and log management.

## Project Structure

```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic layer
├── repositories/    # Data access layer
├── models/          # Data models
├── database/        # Database configuration
└── routes/          # Route definitions

migrations/          # Database schema migrations
seeds/              # Database seed data
scripts/            # Migration and seed runners
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run migrations and seeds:
```bash
npm run setup
```

This will:
- Create the SQLite database
- Run all migrations
- Seed the database with default user and mock logs

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run migrate:sqlite` - Run SQLite migrations
- `npm run seed:users` - Seed users table
- `npm run seed:logs` - Seed logs table
- `npm run seed:all` - Seed all tables
- `npm run setup` - Run migrations and seeds

## API Endpoints

### Logs
- `POST /api/logs` - Create a new log entry
- `GET /api/logs` - Get all logs
- `GET /api/logs/sessions/:sessionId` - Get logs by session ID
- `GET /api/logs/stats` - Get session statistics

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user

### Health
- `GET /health` - Health check endpoint

## Database Schema

### Users Table
- `id` (INTEGER PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `username` (TEXT NOT NULL UNIQUE)
- `password` (TEXT NOT NULL)
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### Logs Table
- `id` (INTEGER PRIMARY KEY)
- `user_id` (INTEGER NOT NULL, FOREIGN KEY)
- `session_id` (TEXT NOT NULL)
- `event` (TEXT NOT NULL, CHECK: 'connected' | 'disconnected')
- `ts` (DATETIME DEFAULT CURRENT_TIMESTAMP)

## Example Usage

### Create a log entry:
```bash
curl -X POST http://localhost:3000/api/logs \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "session-123",
    "event": "connected"
  }'
```

### Get all logs:
```bash
curl http://localhost:3000/api/logs
```

### Get session statistics:
```bash
curl http://localhost:3000/api/logs/stats
```
