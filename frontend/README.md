# Blys Task Manager Frontend

This is the frontend for the Blys Task Manager application, built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (login/register)
- Dashboard to view, add, edit, and delete tasks
- Task status and priority management
- Responsive and modern UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher)

### Installation

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Add the backend url at .env file

```
VITE_API_URL=http://localhost:4050
```

To start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build

## Project Structure

- `src/` — Main source code
  - `components/` — React components
  - `services/` — API service layer
  - `store/` — Redux store and slices
  - `App.tsx` — Main app component
  - `pages/` - All the app pages
  - `main.tsx/` - Entry Point

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.

## API

The frontend communicates with the backend API (see backend README for details)
