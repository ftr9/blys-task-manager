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
git clone https://github.com/ftr9/blys-task-manager.git
cd blys-task-manager
```

### 2. Setup the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

please refer [backend README.md file for setup](https://github.com/ftr9/blys-task-manager/blob/main/README.md)

### 3. Setup the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

please refer [frontend README.md file for detailed setup](https://github.com/ftr9/blys-task-manager/blob/main/frontend/README.md)
