# Task Management Backend

A RESTful API for managing tasks, built with Node.js, Express, and TypeScript.

## Features
- CRUD for tasks
- Task statistics
- Health check endpoint
- Input validation (Zod)
- Error handling
- Request logging
- Rate limiting
- SQLite or in-memory DB
- Security best practices (CORS, helmet)
- Unit tests
- ESLint & Prettier
- Docker support

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run in development:
   ```sh
   npm run dev
   ```
3. Build and start:
   ```sh
   npm run build && npm start
   ```
4. Run tests:
   ```sh
   npm test
   ```

## Docker

Build and run with Docker:
```sh
docker build -t task-manager-backend .
docker run -p 3000:3000 task-manager-backend
```
