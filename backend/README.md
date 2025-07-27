# Blys Task Manager API

A secure, Blys Task Manager API with JWT-based authentication and task management features.

## Features

- User authentication (register, login, logout)
- JWT-based authentication
- Task management (CRUD operations)
- Task filtering and sorting
- Pagination
- Input validation
- Error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Input Validation**: express-validator
- **Logging**: morgan (development)
- **Environment Variables**: dotenv

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher) or MariaDB (v10.3 or higher)
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd blys-task-manager/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=4050

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=1h

# Database
DB_HOST=127.0.0.1
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=task_manager
```

### 4. Set up the database

Run the SQL script located at `backend/database/init.sql` in your MySQL database.
You can execute it using a MySQL GUI (like MySQL Workbench, DBeaver, or TablePlus) or directly from the terminal using a MySQL client.
This script will initialize the necessary tables and schema for the application.

### 5. Start the development server

```bash
npm run dev
```

The API will be available at `http://localhost:4050`

## API Documentation

### Authentication

#### Register a new user

```http
POST /api/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /api/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Tasks

#### Get all tasks (with pagination and sorting)

```http
GET /api/tasks?page=1&limit=10&sortBy=created_at&sortOrder=desc
```

#### Create a new task

```http
POST /api/tasks
```

**Request Body:**

```json
{
  "title": "Complete project",
  "description": "Finish the task manager API",
  "priority": "high",
  "endDate": "2023-12-31"
}
```

#### Get a single task

```http
GET /api/tasks/:id
```

#### Update a task

```http
PUT /api/tasks/:id
```

**Request Body:**

```json
{
  "title": "Updated task title",
  "priority": "medium"
}
```

#### Delete a task

```http
DELETE /api/tasks/:id
```

## Error Handling

The API returns appropriate HTTP status codes and JSON responses:

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Environment Variables

| Variable    | Description         | Default                       |
| ----------- | ------------------- | ----------------------------- |
| PORT        | Server port         | 4050                          |
| JWT_SECRET  | Secret key for JWT  | (required)                    |
| JWT_EXPIRE  | JWT expiration time | 1h                            |
| DB_HOST     | Database host       | db host example - (127.0.0.1) |
| DB_USER     | Database username   | (required)                    |
| DB_PASSWORD | Database password   | (required)                    |
| DB_NAME     | Database name       | task_manager                  |

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run build` - Transpile TypeScript to JavaScript

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  status ENUM('pending','in_progress','completed') NOT NULL DEFAULT 'pending',
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

```

```
