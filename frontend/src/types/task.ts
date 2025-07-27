export type Tpriority = "low" | "medium" | "high";
export type Tstatus = "pending" | "in_progress" | "completed";
export interface ITask {
  id: number;
  user_id: number;
  title: string;
  description: string;
  priority: Tpriority;
  status: Tstatus;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface IQuery {
  page: number;
  limit: number;
  sortBy: "end_date" | "priority" | "created_at";
  sortOrder: "asc" | "desc";
}
