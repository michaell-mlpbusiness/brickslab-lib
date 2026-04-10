import React from "react";
import { FormProps, FormVariant, FormLayout } from "./Form.type";

const variantStyles: Record<FormVariant, string> = {
  default: "gap-[var(--space-4)]",
  compact: "gap-[var(--space-3)]",
  spacious: "gap-[var(--space-6)]",
};

const layoutStyles: Record<FormLayout, string> = {
  vertical: "flex flex-col",
  horizontal: "flex flex-col gap-[var(--space-4)]",
};

const formStyles = `
  [data-bl-form] { padding: var(--space-4, 1rem); }
  [data-bl-form][data-layout="horizontal"] [data-bl-form-group] {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--space-3);
    align-items: start;
  }
  [data-bl-form][data-layout="horizontal"] [data-bl-form-group] > label:first-child {
    padding-top: var(--space-2, 0.5rem);
    text-align: right;
  }
`;

export function Form({
  children,
  variant = "default",
  layout = "vertical",
  onSubmit,
  onValidationErrors,
  className = "",
  ...props
}: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <>
      <style>{formStyles}</style>
      <form
        data-bl-form
        data-variant={variant}
        data-layout={layout}
        className={`${variantStyles[variant]} ${layoutStyles[layout]} ${className}`.trim()}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </>
  );
}
