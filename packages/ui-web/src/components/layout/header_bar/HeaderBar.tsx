import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export type HeaderBarProps = {
  logo?: string | React.ReactNode;
  title?: string;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;

  navPosition?: "left" | "center" | "right";

  backgroundColor?: string;
  blur?: boolean;
  withBorder?: boolean;

  mobileBreakpoint?: number;

  className?: string;
  style?: React.CSSProperties;
};

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

function isFullyTransparentColor(value: string) {
  const v = value.trim().toLowerCase();
  if (v === "transparent") return true;
  if (/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0(?:\.0+)?\s*\)$/.test(v)) {
    return true;
  }
  if (/^hsla\(\s*[-\d.]+\s*,\s*[-\d.]+%\s*,\s*[-\d.]+%\s*,\s*0(?:\.0+)?\s*\)$/.test(v)) {
    return true;
  }
  return false;
}

const BLUR_FALLBACK_CSS = `
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .brick-hb.brick-hb--blur {
    background-color: var(--brick-hb-bg-fallback) !important;
  }
}
`;

const MIX_BG_60 = "color-mix(in srgb, var(--color-bg) 60%, transparent)";
const MIX_BG_92 = "color-mix(in srgb, var(--color-bg) 92%, transparent)";
const MIX_BG_55 = "color-mix(in srgb, var(--color-bg) 55%, transparent)";
const MIX_BG_95 = "color-mix(in srgb, var(--color-bg) 95%, transparent)";
const MIX_FG_08 = "color-mix(in srgb, var(--color-fg) 8%, transparent)";
const MIX_FG_10 = "color-mix(in srgb, var(--color-fg) 10%, transparent)";
const MIX_FG_22 = "color-mix(in srgb, var(--color-fg) 22%, transparent)";
const MIX_FG_35 = "color-mix(in srgb, var(--color-fg) 35%, transparent)";
const MIX_FG_92 = "color-mix(in srgb, var(--color-fg) 92%, transparent)";

export function HeaderBar({
  logo,
  title,
  navigation,
  actions,
  navPosition = "left",
  backgroundColor,
  blur = false,
  withBorder = false,
  mobileBreakpoint = 768,
  className,
  style
}: HeaderBarProps) {
  const menuId = React.useId();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = React.useCallback(() => {
    setMobileMenuOpen((v) => !v);
  }, []);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMobileMenu, mobileMenuOpen]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const mq = window.matchMedia(`(min-width: ${mobileBreakpoint + 1}px)`);
    const onChange = () => {
      if (mq.matches) closeMobileMenu();
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMobileMenu, mobileBreakpoint, mobileMenuOpen]);

  const defaultBg = blur ? MIX_BG_60 : "var(--color-bg)";
  const defaultFallbackBg = MIX_BG_92;
  const resolvedBg = backgroundColor ?? defaultBg;
  const resolvedFallbackBg =
    blur && backgroundColor && isFullyTransparentColor(backgroundColor)
      ? defaultFallbackBg
      : backgroundColor ?? (blur ? defaultFallbackBg : resolvedBg);

  const rootStyle = {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "var(--brick-hb-bg)",
    borderBottom: withBorder ? `var(--border-xm) solid ${MIX_FG_08}` : undefined,
    ...(blur
      ? ({
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        } satisfies React.CSSProperties)
      : null),
    ["--brick-hb-bg" as never]: resolvedBg,
    ["--brick-hb-bg-fallback" as never]: resolvedFallbackBg,
    ...style
  } satisfies React.CSSProperties;

  const responsiveCss = `
@media (max-width: ${mobileBreakpoint}px) {
  .brick-hb__desktopNav,
  .brick-hb__desktopActions {
    display: none !important;
  }
  .brick-hb__burger {
    display: inline-flex !important;
  }
}
`;

  const innerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    minHeight: 56,
    padding: "12px 16px",
    gap: 16
  };

  const leftStyle: React.CSSProperties = {
    flex: "1 1 0",
    display: "flex",
    alignItems: "center",
    gap: 16,
    minWidth: 0
  };

  const rightStyle: React.CSSProperties = {
    flex: "1 1 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
    minWidth: 0
  };

  const brandStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    minWidth: 0
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "var(--fontsize-medium)",
    fontWeight: 650,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const logoNode =
    typeof logo === "string" ? (
      <img
        src={logo}
        alt={title ?? "Logo"}
        style={{ height: 28, width: "auto", display: "block" }}
      />
    ) : (
      logo
    );

  const leftNavigation =
    navPosition === "left" && navigation ? (
      <nav
        aria-label="Primary"
        className="brick-hb__desktopNav"
        style={{ display: "flex", minWidth: 0 }}
      >
        {navigation}
      </nav>
    ) : null;

  const rightNavigation =
    navPosition === "right" && navigation ? (
      <nav
        aria-label="Primary"
        className="brick-hb__desktopNav"
        style={{ display: "flex", minWidth: 0 }}
      >
        {navigation}
      </nav>
    ) : null;

  const centerNavigation =
    navPosition === "center" && navigation ? (
      <div
        className="brick-hb__desktopNav"
        style={{
          position: "absolute",
          insetInline: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none"
        }}
      >
        <nav aria-label="Primary" style={{ pointerEvents: "auto" }}>
          {navigation}
        </nav>
      </div>
    ) : null;

  const hasMobileMenu = Boolean(navigation || actions);
  const burgerLineStyle: React.CSSProperties = {
    width: 20,
    height: 2,
    borderRadius: "var(--radius-full)",
    background: "currentColor",
    display: "block",
    willChange: "transform, opacity"
  };

  return (
    <header
      className={cx("brick-hb", blur && "brick-hb--blur", className)}
      style={rootStyle}
    >
      <style>
        {blur ? BLUR_FALLBACK_CSS : ""}
        {responsiveCss}
      </style>

      <div style={innerStyle}>
        <div style={leftStyle}>
          {logoNode || title ? (
            <div style={brandStyle}>
              {logoNode ? <div style={{ flex: "0 0 auto" }}>{logoNode}</div> : null}
              {title ? <div style={titleStyle}>{title}</div> : null}
            </div>
          ) : null}

          {leftNavigation}
        </div>

        {centerNavigation}

        <div style={rightStyle}>
          {rightNavigation}
          {actions ? (
            <div
              className="brick-hb__desktopActions"
              style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            >
              {actions}
            </div>
          ) : null}

          {hasMobileMenu ? (
            <button
              type="button"
              className="brick-hb__burger"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls={menuId}
              onClick={toggleMobileMenu}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                border: `var(--border-xm) solid ${MIX_FG_08}`,
                borderRadius: "var(--radius-md)",
                background: blur ? MIX_BG_55 : MIX_BG_95,
                color: MIX_FG_92,
                cursor: "pointer",
                padding: 0
              }}
            >
              <span style={{ display: "inline-flex", flexDirection: "column", gap: 4 }}>
                <motion.span
                  style={burgerLineStyle}
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22 }}
                />
                <motion.span
                  style={burgerLineStyle}
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.18 }}
                />
                <motion.span
                  style={burgerLineStyle}
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22 }}
                />
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMobileMenu}
              style={{
                position: "fixed",
                inset: 0,
                background: MIX_FG_35,
                willChange: "opacity",
                zIndex: 1000
              }}
            />

            <motion.aside
              key="panel"
              id={menuId}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, x: 24, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.985 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(360px, 92vw)",
                background: blur ? resolvedFallbackBg : resolvedBg,
                borderLeft: `var(--border-xm) solid ${MIX_FG_10}`,
                boxShadow: `0 18px 60px ${MIX_FG_22}`,
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
                willChange: "transform, opacity"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderBottom: `var(--border-xm) solid ${MIX_FG_08}`
                }}
              >
                {logoNode || title ? (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    {logoNode ? <div style={{ flex: "0 0 auto" }}>{logoNode}</div> : null}
                    {title ? (
                      <div style={{ ...titleStyle, fontSize: "var(--fontsize-sm)", maxWidth: 220 }}>{title}</div>
                    ) : null}
                  </div>
                ) : (
                  <div style={{ fontSize: "var(--fontsize-sm)", fontWeight: 650 }}>Menu</div>
                )}

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-md)",
                    border: `var(--border-xm) solid ${MIX_FG_08}`,
                    background: MIX_BG_60,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: MIX_FG_92,
                    fontSize: "var(--fontsize-medium)",
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </div>

              <div
                style={{
                  padding: "14px 16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  overflow: "auto"
                }}
              >
                {navigation ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {navigation}
                  </div>
                ) : null}

                {actions ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {actions}
                  </div>
                ) : null}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
