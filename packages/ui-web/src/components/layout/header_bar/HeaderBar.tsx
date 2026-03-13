import React from "react";
import { useEffect, useRef, useState, forwardRef } from "react";
import type { HeaderBarProps, HeaderLink } from "./HeaderBar.type";

export function HeaderBar(props: HeaderBarProps) {
  const {
    as = "header",
    logo,
    logoHref,
    title,
    nav,
    links,
    actions,
    height = 60,
    position = "fixed",
    maxWidth = 1280,
    paddingX = 24,
    paddingY = 8,
    showShadowOnScroll = true,
    collapseAt = 768,
    ariaLabelNav = "Navigation principale",
    onMenuToggle,
    defaultMenuOpen = false,
    className,
    style,
    containerClassName,
    containerStyle,
    navClassName,
    actionsClassName,
    logoClassName,
    "data-testid": testId,
  } = props;

  const RootTag = as as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(defaultMenuOpen);
  const [shouldCollapse, setShouldCollapse] = useState(false);

  useEffect(() => {
    if (!showShadowOnScroll || position === "static") return;
    const onScroll = () => setScrolled(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showShadowOnScroll, position]);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${collapseAt}px)`);
    const update = () => {
      setShouldCollapse(mq.matches);
      if (!mq.matches) setMenuOpen(false);
    };
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [collapseAt]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    onMenuToggle?.(next);
  };

  const rootStyles: React.CSSProperties = {
    position,
    top: position !== "static" ? 0 : undefined,
    left: position !== "static" ? 0 : undefined,
    right: position !== "static" ? 0 : undefined,
    minHeight: height,
    backgroundColor: "var(--c-surface)",
    borderBottom: "1px solid var(--c-border)",
    boxShadow: scrolled ? "var(--shadow-md)" : "var(--shadow-none)",
    zIndex: 100,
    ...style,
  };

  const outerContainer: React.CSSProperties = {
    margin: "0 auto",
    maxWidth,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    boxSizing: "border-box",
  };

  const innerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: paddingY,
    paddingBottom: paddingY,
    minHeight: height,
    gap: "var(--sp-3)",
    ...containerStyle,
  };

  const logoNode =
    logo ??
    (title ? (
      <span
        style={{
          fontWeight: 700,
          fontSize: "var(--font-lg)", // TOKEN
          color: "var(--c-text)",
        }}
      >
        {title}
      </span>
    ) : null);

  const renderLinks = (items?: HeaderLink[]) =>
    items ? (
      <ul style={{ display: "flex", gap: "var(--sp-3)", listStyle: "none", padding: 0 }}>
        {items.map((l, i) => (
          <li key={l.key ?? i}>
            <a
              href={l.href}
              aria-current={l.current ? "page" : undefined}
              style={{
                textDecoration: "none",
                color: l.muted ? "var(--c-text-muted)" : "var(--c-text)",
                fontWeight: l.current ? 700 : 500,
                padding: "var(--sp-1) var(--sp-2)",
                borderRadius: "var(--radius-sm)",
                borderBottom: l.current
                  ? "2px solid var(--c-accent)"
                  : "2px solid transparent",
                background: l.current ? "var(--c-muted)" : "transparent",
                lineHeight: 1.2,
              }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    ) : null;

  return (
    <RootTag ref={ref} className={className} style={rootStyles} data-testid={testId}>
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: -10000,
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        Aller au contenu principal
      </a>

      <div className={containerClassName} style={outerContainer}>
        <div style={innerStyles}>
          {/* Left block */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
            {logoHref ? (
              <a
                href={logoHref}
                style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}
              >
                <div className={logoClassName} style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)" }}>
                  {logoNode}
                </div>
              </a>
            ) : (
              <div
                className={logoClassName}
                style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)" }}
              >
                {logoNode}
              </div>
            )}

            {/* NAV DESKTOP */}
            {!shouldCollapse && (
              <nav
                aria-label={ariaLabelNav}
                className={navClassName}
                style={{ display: "flex", alignItems: "center" }}
              >
                {nav ? nav : renderLinks(links)}
              </nav>
            )}
          </div>

          {/* RIGHT BLOCK */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)" }}>
            {!shouldCollapse && actions && (
              <div className={actionsClassName}>{actions}</div>
            )}

            {shouldCollapse && (
              <button
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-controls="headerbar-mobilemenu"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "var(--sp-2)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--c-text)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" fill="none">
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {shouldCollapse && (
        <div
          id="headerbar-mobilemenu"
          style={{
            display: menuOpen ? "block" : "none",
            position: position === "static" ? "static" : "fixed",
            top: height,
            left: 0,
            right: 0,
            background: "var(--c-surface)",
            borderBottom: "1px solid var(--c-border)",
            boxShadow: "var(--shadow-lg)",
            zIndex: 100,
          }}
        >
          <div style={{ margin: "0 auto", maxWidth, padding: "var(--sp-4)" }}>
            {nav ? nav : renderLinks(links)}
            {actions && (
              <div
                style={{
                  paddingTop: "var(--sp-3)",
                  borderTop: "1px solid var(--c-border)",
                }}
              >
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
    </RootTag>
  );
}

export default HeaderBar;