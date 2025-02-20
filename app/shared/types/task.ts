export type TaskPriority = "low" | "medium" | "urgent" | "none" | "high";
export type TaskStatus = "not_started" | "in_progress" | "completed";

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  customFields?: Record<string, string | number | boolean>;
}
