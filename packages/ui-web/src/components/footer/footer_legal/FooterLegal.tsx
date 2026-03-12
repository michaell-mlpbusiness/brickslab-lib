import React from "react";
import { FooterLegalProps } from "./FooterLegal.type";

export function FooterLegal({ copyright, year, links }: FooterLegalProps) {
  const displayYear = year ?? new Date().getFullYear();
  const displayCopyright = copyright ?? "BricksLab";

  return (
    <div className="footer-legal" style={{ display: "var(--display-flex)", flexWrap: "wrap", alignItems: "var(--align-items-center)", gap: "var(--space-1-5)", fontSize: "clamp(var(--fontsize-xs), 4vw, 48px)", color: "var(--color-muted)" }}>
      <span>
        {`© ${displayYear} ${displayCopyright}. All rights reserved.`}
      </span>

      {links && links.length > 0 && (
        <span className="footer-legal__links" style={{ display: "var(--display-flex)", flexWrap: "wrap", alignItems: "var(--align-items-center)",gap: "var(--space-1)", marginLeft: "clamp(var(--space-3), 4vw, 48px)" }}>
          {links.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && (
                <span className="footer-legal__separator">·</span>
              )}
              <a href={link.href} className="footer-legal__link">
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </span>
      )}
    </div>
  );
}