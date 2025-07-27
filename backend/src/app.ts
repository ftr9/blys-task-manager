import express from "express";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import notFound from "./middleware/notFound";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blys-task-manager-frontend.onrender.com",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Blys Task Manager API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
