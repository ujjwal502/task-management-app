"use client";

import { TaskPriority, TaskStatus } from "@/app/shared/types/task";
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
  customFields = [],
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
      ...customFields.map((field): Field => {
        switch (field.type) {
          case "checkbox":
            return {
              type: "checkbox",
              name: field.name,
              label: field.name,
            };
          case "number":
            return {
              type: "number",
              name: field.name,
              label: field.name,
              placeholder: `Enter ${field.name.toLowerCase()}`,
            };
          default:
            return {
              type: "text",
              name: field.name,
              label: field.name,
              placeholder: `Enter ${field.name.toLowerCase()}`,
            };
        }
      }),
    ],
    [customFields]
  );

  const handleSubmit = (values: Record<string, string | boolean>) => {
    const customFieldValues: Record<string, string | number | boolean> = {};
    customFields.forEach((field) => {
      if (field.type === "number") {
        customFieldValues[field.name] = Number(values[field.name]);
      } else if (field.type === "checkbox") {
        customFieldValues[field.name] = Boolean(values[field.name]);
      } else {
        customFieldValues[field.name] = String(values[field.name]);
      }
    });

    onSubmit({
      title: String(values.title),
      priority: String(values.priority) as TaskPriority,
      status: String(values.status) as TaskStatus,
      customFields: customFieldValues,
    });
  };

  console.log("initialValues", initialValues);

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
            ...initialValues.customFields,
          }
        }
        onCancel={onClose}
        submitLabel="Save Task"
      />
    </Modal>
  );
}
