export type FieldType = "text" | "radio" | "checkbox" | "number" | "select";

export interface BaseField {
  type: FieldType;
  name: string;
  label: string;
  required?: boolean;
}

export interface TextField extends BaseField {
  type: "text";
  placeholder?: string;
}

export interface RadioField extends BaseField {
  type: "radio";
  options: { value: string; label: string }[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
}

export interface NumberField extends BaseField {
  type: "number";
  placeholder?: string;
}

export interface SelectField extends BaseField {
  type: "select";
  options: { value: string; label: string }[];
  placeholder?: string;
}

export type Field =
  | TextField
  | RadioField
  | CheckboxField
  | NumberField
  | SelectField;

export interface FormProps {
  fields: Field[];
  onSubmit: (values: Record<string, string | boolean>) => void;
  initialValues?: Record<string, string | boolean>;
  submitLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  title?: string;
}
