import { Task } from "@/app/types/task";

export interface TaskFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  initialValues?: Task;
  title: string;
}
