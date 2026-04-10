import React from "react";
import { FormErrorProps } from "./Form.type";

const errorContainerStyles = `
  [data-bl-form-error] {
    background-color: var(--color-error-bg, #fef2f2);
    border: 1px solid var(--color-error-border, #fecaca);
    border-radius: var(--radius-md, 0.375rem);
    padding: var(--space-3, 0.75rem);
    margin-top: var(--space-2, 0.5rem);
  }
  [data-bl-form-error] [data-bl-error-icon] {
    color: var(--color-error, #ef4444);
    flex-shrink: 0;
  }
  [data-bl-form-error] [data-bl-error-title] {
    font-weight: 500;
    color: var(--color-error, #ef4444);
    font-size: var(--fontsize-sm, 0.875rem);
  }
  [data-bl-form-error] [data-bl-error-list] {
    margin-top: var(--space-2, 0.5rem);
    font-size: var(--fontsize-xs, 0.75rem);
    color: var(--color-error, #ef4444);
  }
  [data-bl-form-error] [data-bl-error-item] {
    margin-top: var(--space-1, 0.25rem);
  }
  [data-bl-form-error] [data-bl-error-field] {
    font-weight: 600;
  }
`;

export function FormError({
  message,
  errors,
  fieldName,
  className = "",
  showIcon = true,
}: FormErrorProps) {
  const hasErrors = message || (errors && Object.keys(errors).length > 0);

  if (!hasErrors) {
    return null;
  }

  const errorList = errors
    ? Object.entries(errors).flatMap(([field, error]) => {
        if (fieldName && field !== fieldName) return [];
        if (Array.isArray(error)) {
          return error.map((msg) => ({ field, message: msg }));
        }
        return [{ field, message: error }];
      })
    : [];

  return (
    <>
      <style>{errorContainerStyles}</style>
      <div
        data-bl-form-error
        className={className}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex items-start gap-2">
          {showIcon && (
            <svg
              data-bl-error-icon
              className="w-5 h-5 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div className="flex-1">
            {message && (
              <p data-bl-error-title className="font-medium">
                {message}
              </p>
            )}
            {errorList.length > 0 && (
              <ul data-bl-error-list className="mt-2 space-y-1">
                {errorList.map((error, index) => (
                  <li key={index} data-bl-error-item>
                    <span data-bl-error-field>{error.field}:</span>{" "}
                    {error.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
