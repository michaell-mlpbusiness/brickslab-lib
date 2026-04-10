import React from "react";

export type FormVariant = "default" | "compact" | "spacious";
export type FormLayout = "vertical" | "horizontal";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  variant?: FormVariant;
  layout?: FormLayout;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onValidationErrors?: (errors: Record<string, string>) => void;
}

export interface FormGroupProps {
  children: React.ReactNode;
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  layout?: FormLayout;
  className?: string;
  id?: string;
}

export interface FormErrorProps {
  message?: string;
  errors?: Record<string, string | string[]>;
  fieldName?: string;
  className?: string;
  showIcon?: boolean;
}

export interface FormActionsProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right" | "between";
  stacked?: boolean;
  className?: string;
}
