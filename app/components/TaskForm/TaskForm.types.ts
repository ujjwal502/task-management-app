import { Task } from "@/app/shared/types/task";
import { CustomField } from "@/app/shared/types/custom-field";

export interface TaskFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  initialValues?: Task;
  title: string;
  customFields?: CustomField[];
}
