import { RowDataPacket } from "mysql2";

export interface IUser extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface ITaskMetricByStatus {
  total: number;
  status: TaskStatus;
}

export interface ITask extends RowDataPacket {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ITaskCreate {
  userId: number;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  endDate?: string;
}

export interface ITaskUpdate extends Partial<Omit<ITaskCreate, "userId">> {}
