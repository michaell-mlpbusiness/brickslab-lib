import React from "react";
import { FormActionsProps } from "./Form.type";

const alignStyles: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between",
};

export function FormActions({
  children,
  align = "right",
  stacked = false,
  className = "",
}: FormActionsProps) {
  return (
    <div
      data-bl-form-actions
      className={`
        flex 
        ${stacked ? "flex-col space-y-2" : "flex-row space-x-3"} 
        ${alignStyles[align]} 
        mt-4
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
