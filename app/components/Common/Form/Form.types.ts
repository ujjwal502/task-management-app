export type FieldType = "text" | "radio";

interface BaseField {
  name: string;
  label: string;
  required?: boolean;
  type: FieldType;
}

export interface TextField extends BaseField {
  type: "text";
  placeholder?: string;
}

export interface RadioField extends BaseField {
  type: "radio";
  options: {
    value: string;
    label: string;
  }[];
}

export type Field = TextField | RadioField;

export interface FormProps {
  fields: Field[];
  onSubmit: (values: Record<string, string>) => void;
  initialValues?: Record<string, string>;
  submitLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  title?: string;
}
