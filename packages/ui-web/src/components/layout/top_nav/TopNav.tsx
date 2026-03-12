import React from "react";
import { TopNavProps } from "./TopNav.type";

export function TopNav({ items, activePath }: TopNavProps) {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "var(--space-6)",
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "var(--fontsize-sm)",
          alignItems: "center",
        }}
        className="links"
      >
        {items.map((item) => {
          const isActive = item.href === activePath;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                style={{
                  color: isActive ? "var(--color-brand)" : "var(--color-muted)",
                  fontWeight: isActive ? "var(--fontweight-semibold)" : "var(--fontweight-normal)",
                  borderBottom: isActive ? "var(--border-sm) solid var(--color-brand)" : "var(--border-sm) solid transparent",
                  textDecoration: "none",
                  paddingBottom: "var(--space-1)",
                }}
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "anim" : ""}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
