# Blys Task Manager

A secure, full-stack Task Manager application using the MERN stack with MySQL as the database. The application supports user authentication, task management features, and a clean, responsive UI .

## Project Structure

```
blys-task-manager/
  ├── frontend/   # React + TypeScript + Tailwind CSS
  └── backend/    # Node.js + Express + MySQL + Typescript
```

## ✨ Features

### 🔐 User Authentication

- User registration and login using **JWT-based authentication**
- Passwords securely hashed using **bcrypt**
- JWT tokens stored securely (e.g., **HTTP-only cookies** or **localStorage** — chosen with proper justification)

### 🛡️ Protected Routes

- All task-related API endpoints are protected via authentication middleware
- Only authenticated users can access, create, update, or delete their tasks

### ✅ Task Management

Authenticated users can:

- Create new tasks with:
  - **Title**
  - **Description**
  - **Priority**
  - **End Date**
- View only their own tasks
- Update or delete existing tasks

### ⏰ Overdue Task Highlighting

- Visually distinguish tasks that have passed their due date

### 📊 Sorting

- Sort tasks by:
  - **Due Date** (ascending/descending)
  - **Priority**

### 📄 Pagination

- Server-side pagination for efficient task list rendering

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher)
- MySQL server

### 1. Clone the Repository

```bash
git clone <repo-url>
cd blys-task-manager
```

### 2. Setup the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (see `backend/README.md` for details).
4. Initialize the database:
   - Update your MySQL credentials in `src/config/db.ts` if needed.
   - Run the SQL in `backend/database/init.sql` to create the schema.
5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on [http://localhost:4050](http://localhost:4050) by default.

### 3. Setup the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the API base URL in `vite.config.ts` if needed.
4. Start the frontend dev server:
   ```bash
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## More Information

- See `frontend/readme.md` for frontend-specific details.
- See `backend/README.md` for backend-specific details, including API documentation and environment variables.

---
