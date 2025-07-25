import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

export const AUTH_API = API.create({
  baseURL: "/api/auth",
});

export const TASK_API = API.create({
  baseURL: "/api/tasks",
});
