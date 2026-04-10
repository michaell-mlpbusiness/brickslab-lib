import React from "react";
import { FormGroupProps } from "./Form.type";

const labelStyles = `
  [data-bl-form-label] {
    display: block;
    font-size: var(--fontsize-sm, 0.875rem);
    font-weight: 500;
    color: var(--color-text, inherit);
    margin-bottom: var(--space-1, 0.25rem);
  }
  [data-bl-form-label][data-required]::after {
    content: " *";
    color: var(--color-error, #ef4444);
  }
`;

const helperStyles = `
  [data-bl-form-helper] {
    font-size: var(--fontsize-xs, 0.75rem);
    color: var(--color-muted, #6b7280);
    margin-top: var(--space-1, 0.25rem);
  }
`;

const errorStyles = `
  [data-bl-form-error-text] {
    font-size: var(--fontsize-xs, 0.75rem);
    color: var(--color-error, #ef4444);
    margin-top: var(--space-1, 0.25rem);
  }
`;

export function FormGroup({
  children,
  label,
  helperText,
  errorText,
  required = false,
  layout = "vertical",
  className = "",
  id,
}: FormGroupProps) {
  const autoId = React.useId();
  const groupId = id ?? autoId;
  const labelId = `${groupId}-label`;
  const helperId = `${groupId}-helper`;
  const errorId = `${groupId}-error`;

  return (
    <>
      <style>{labelStyles}</style>
      <style>{helperStyles}</style>
      <style>{errorStyles}</style>
      <div
        data-bl-form-group
        data-layout={layout}
        className={`flex flex-col ${className}`.trim()}
        id={groupId}
      >
        {label && (
          <label
            data-bl-form-label
            data-required={required || undefined}
            id={labelId}
            className="block text-sm font-medium mb-1"
          >
            {label}
          </label>
        )}
        {children}
        {helperText && !errorText && (
          <p
            data-bl-form-helper
            id={helperId}
            className="text-xs text-muted mt-1"
          >
            {helperText}
          </p>
        )}
        {errorText && (
          <p
            data-bl-form-error-text
            id={errorId}
            className="text-xs text-error mt-1"
            role="alert"
          >
            {errorText}
          </p>
        )}
      </div>
    </>
  );
}
