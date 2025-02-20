"use client";

import { useState } from "react";
import { CustomField, CustomFieldType } from "@/app/shared/types/custom-field";
import { CustomFieldsManagerPresentation } from "./CustomFieldsManager.presentation";

interface CustomFieldsManagerProps {
  opened: boolean;
  onClose: () => void;
  customFields: CustomField[];
  onAddField: (field: Omit<CustomField, "id">) => void;
  onRemoveField: (fieldId: string) => void;
}

export function CustomFieldsManager(props: CustomFieldsManagerProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (values: Record<string, string | boolean>) => {
    try {
      if (
        props.customFields.some(
          (field) =>
            field.name.toLowerCase() === String(values.name).toLowerCase()
        )
      ) {
        throw new Error("A field with this name already exists");
      }

      const nameRegex = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
      if (!nameRegex.test(String(values.name))) {
        throw new Error(
          "Field name must start with a letter and contain only letters, numbers, and spaces"
        );
      }

      props.onAddField({
        name: String(values.name),
        type: String(values.type) as CustomFieldType,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <CustomFieldsManagerPresentation
      {...props}
      error={error}
      onSubmit={handleSubmit}
    />
  );
}
