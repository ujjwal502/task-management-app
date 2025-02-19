"use client";

import { TaskPriority, TaskStatus } from "@/app/types/task";
import { Modal } from "@mantine/core";
import { Form } from "../Common/Form/Form";
import { Field } from "../Common/Form/Form.types";
import { useMemo } from "react";
import { TaskFormProps } from "./TaskForm.types";

export function TaskForm({
  opened,
  onClose,
  onSubmit,
  initialValues,
  title,
}: TaskFormProps) {
  const fields: Field[] = useMemo(
    () => [
      {
        type: "text",
        name: "title",
        label: "Title",
        placeholder: "Enter task title",
        required: true,
      },
      {
        type: "radio",
        name: "priority",
        label: "Priority",
        required: true,
        options: [
          { value: "high", label: "High" },
          { value: "urgent", label: "Urgent" },
          { value: "medium", label: "Medium" },
          { value: "low", label: "Low" },
          { value: "none", label: "None" },
        ],
      },
      {
        type: "radio",
        name: "status",
        label: "Status",
        required: true,
        options: [
          { value: "not_started", label: "Not Started" },
          { value: "in_progress", label: "In Progress" },
          { value: "completed", label: "Completed" },
        ],
      },
    ],
    []
  );

  const handleSubmit = (values: Record<string, string>) => {
    onSubmit({
      title: values.title,
      priority: values.priority as TaskPriority,
      status: values.status as TaskStatus,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      styles={{
        header: {
          borderBottom: "1px solid var(--mantine-color-gray-2)",
          marginBottom: "var(--mantine-spacing-md)",
          paddingBottom: "var(--mantine-spacing-xs)",
        },
      }}
    >
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={
          initialValues && {
            title: initialValues.title,
            priority: initialValues.priority,
            status: initialValues.status,
          }
        }
        onCancel={onClose}
        submitLabel="Save Task"
      />
    </Modal>
  );
}
