"use client";

import { Button, Group, TextInput, Title } from "@mantine/core";
import { FormEvent, useState } from "react";
import styles from "./Form.module.css";
import { Field, FormProps } from "./Form.types";

export function Form({
  fields,
  onSubmit,
  initialValues = {},
  submitLabel = "Save",
  onCancel,
  cancelLabel = "Cancel",
  title,
}: FormProps) {
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
        return (
          <TextInput
            key={field.name}
            required={field.required}
            label={field.label}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
            }
            className={styles.input}
          />
        );
      case "radio":
        return (
          <div key={field.name} className={styles.formField}>
            <label className={styles.label}>{field.label}</label>
            <div className={styles.radioGroup}>
              {field.options.map((option) => (
                <label key={option.value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    className={styles.radioInput}
                    required={field.required}
                  />
                  <span className={styles.radioButton} />
                  <span className={styles.radioText}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {title && (
        <Title order={2} className={styles.title}>
          {title}
        </Title>
      )}
      {fields.map((field) => renderField(field))}
      <Group justify="flex-end" gap="sm" mt="xl">
        {onCancel && (
          <Button variant="light" onClick={onCancel} color="gray">
            {cancelLabel}
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </Group>
    </form>
  );
}
