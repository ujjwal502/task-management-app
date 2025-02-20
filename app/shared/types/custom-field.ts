import { TaskPriority, TaskStatus } from "./task";

export type CustomFieldType = "text" | "number" | "checkbox";

export interface CustomField {
  id: string;
  name: string;
  type: CustomFieldType;
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  customFields?: Record<string, string | number | boolean>;
}
