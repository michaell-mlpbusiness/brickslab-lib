import React, { forwardRef, useEffect, useRef, useState } from "react";
import type { HeaderBarProps, HeaderLink } from "./HeaderBar.type";

/**
 * HeaderBar – Barre d’en-tête responsive, accessible, themable
 * Responsive par défaut : burger sous `collapseAt` (768px par défaut).
 */
export const HeaderBar = forwardRef<HTMLElement, HeaderBarProps>(function HeaderBar(
  {
    as = "header",
    logo,
    logoHref,
    title,
    nav,
    links,
    actions,
    height = 60,
    position = "fixed", // 'fixed' | 'sticky' | 'static'
    maxWidth = 1280,
    paddingX = 24,
    showShadowOnScroll = true,
    collapseAt = 768, // px: largeur sous laquelle le menu devient hamburger
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
    // ✅ nouveau : padding vertical pour respirer
    paddingY = 8,
    // test ids
    "data-testid": testId,
  },
  ref
) {
  const RootTag = as as React.ElementType;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(defaultMenuOpen);
  const isMobileRef = useRef(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);

  // Ombre au scroll
  useEffect(() => {
    if (!showShadowOnScroll || position === "static") return;
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showShadowOnScroll, position]);

  // Responsive : calcule shouldCollapse en fonction de collapseAt
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${collapseAt}px)`);
    const update = () => {
      isMobileRef.current = mq.matches;
      setShouldCollapse(mq.matches);
      if (!mq.matches) setMenuOpen(false); // ferme le menu si on repasse en desktop
    };
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [collapseAt]);

  const handleToggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    onMenuToggle?.(next);
  };

  /* =========================
   * Styles inline par défaut
   * ========================= */
  const rootStyles: React.CSSProperties = {
    position,
    top: position !== "static" ? 0 : undefined,
    left: position !== "static" ? 0 : undefined,
    right: position !== "static" ? 0 : undefined,
    // 🔁 minHeight au lieu de height pour laisser vivre le padding interne
    minHeight: height,
    backgroundColor: "var(--c-surface, #fff)",
    borderBottom: "1px solid var(--c-border, rgba(0,0,0,0.08))",
    zIndex: 100,
    boxSizing: "border-box",
    boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.06)" : "none",
    ...style,
  };

  // Wrapper (maxWidth + paddingX)
  const outerContainerStyles: React.CSSProperties = {
    margin: "0 auto",
    maxWidth,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    boxSizing: "border-box",
  };

  // Ligne principale : flex, centrage vertical, avec padding vertical contrôlé
  const innerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    // ✅ respirations verticales
    paddingTop: paddingY,
    paddingBottom: paddingY,
    // pour s'assurer de remplir la hauteur min si définie
    minHeight: height,
    ...containerStyle,
  };

  // Reset bouton + apparence burger
  const buttonReset: React.CSSProperties = {
    all: "unset" as any,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
    color: "var(--c-text, #111)",
  };

  /* =========================
   * Rendus
   * ========================= */
  const renderLogo = () => {
    const content =
      logo ??
      (title ? <span style={{ fontWeight: 700, fontSize: 18, color: "var(--c-text, #111)" }}>{title}</span> : null);

    if (!content) return <div />;

    const node = (
      <div className={logoClassName} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {content}
      </div>
    );

    return logoHref ? (
      <a
        href={logoHref}
        aria-label={typeof title === "string" ? title : "Accueil"}
        style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit" }}
      >
        {node}
      </a>
    ) : (
      node
    );
  };

  const renderLinks = (items?: HeaderLink[]) => {
    if (!items?.length) return null;
    return (
      <ul style={{ display: "flex", gap: 16, listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((l, i) => (
          <li key={l.key ?? i}>
            <a
              href={l.href}
              aria-current={l.current ? "page" : undefined}
              style={{
                textDecoration: "none",
                color: l.muted ? "var(--c-text-muted, #666)" : "var(--c-text, #111)",
                fontWeight: l.current ? 600 : 500,
                padding: "6px 8px",
                borderRadius: 6,
                borderBottom: l.current ? "2px solid var(--c-accent, #6366f1)" : "2px solid transparent",
                background: l.current ? "var(--c-muted, rgba(0,0,0,0.04))" : "transparent",
                lineHeight: 1.2, // 🔧 évite le débordement vertical
              }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const renderDesktopRowRight = () => {
    // À droite : actions visibles en desktop uniquement, burger visible en mobile uniquement
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Actions desktop */}
        {!shouldCollapse && actions ? (
          <div className={actionsClassName} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {actions}
          </div>
        ) : null}

        {/* Burger mobile */}
        {shouldCollapse && (
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="headerbar-mobilemenu"
            onClick={handleToggleMenu}
            style={buttonReset}
          >
            <span
              style={{
                position: "relative",
                width: 24,
                height: 24,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Icône burger en SVG pour compatibilités */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
                style={{ display: "block" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <RootTag
      ref={ref as any}
      role={as === "header" ? "banner" : undefined}
      className={className}
      style={rootStyles}
      data-testid={testId}
    >
      {/* lien “skip to content” (visuellement masqué) */}
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

      {/* Conteneur externe pour maxWidth + paddingX */}
      <div className={containerClassName} style={{ ...outerContainerStyles, ...containerStyle }}>
        <div style={innerStyles}>
          {/* Colonne gauche : logo + nav desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {renderLogo()}

            {/* NAV DESKTOP : visible uniquement quand non replié */}
            <nav
              aria-label={ariaLabelNav}
              className={navClassName}
              style={{
                display: shouldCollapse ? "none" : "flex",
                alignItems: "center",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              {nav ? nav : renderLinks(links)}
            </nav>
          </div>

          {/* Colonne droite : actions desktop + burger mobile */}
          {renderDesktopRowRight()}
        </div>
      </div>

      {/* Drawer mobile (menu sous la barre) */}
      {shouldCollapse && (
        <div
          id="headerbar-mobilemenu"
          role="region"
          aria-label="Menu"
          style={{
            display: menuOpen ? "block" : "none",
            position: position === "static" ? "static" : "fixed",
            top: height,
            left: 0,
            right: 0,
            background: "var(--c-surface, #fff)",
            borderBottom: "1px solid var(--c-border, rgba(0,0,0,0.08))",
            boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
            zIndex: 100,
          }}
        >
          <div style={{ margin: "0 auto", maxWidth, padding: 16, boxSizing: "border-box" }}>
            {/* Liens mobile */}
            <div style={{ paddingTop: 8, paddingBottom: 8 }}>
              {nav ? (
                <div>{nav}</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {(links ?? []).map((l, i) => (
                    <a
                      key={l.key ?? i}
                      href={l.href}
                      aria-current={l.current ? "page" : undefined}
                      style={{
                        textDecoration: "none",
                        padding: "10px 12px",
                        borderLeft: l.current ? "4px solid var(--c-accent, #6366f1)" : "4px solid transparent",
                        background: l.current ? "rgba(99,102,241,0.08)" : "transparent",
                        color: l.current ? "var(--c-accent-text, #3730a3)" : "var(--c-text, #111)",
                        borderRadius: 6,
                        lineHeight: 1.25,
                      }}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Actions mobile (CTA en dessous, comme ton exemple) */}
            {actions ? (
              <div style={{ paddingTop: 12, paddingBottom: 12, borderTop: "1px solid var(--c-border, rgba(0,0,0,0.08))" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8 }}>
                  {actions}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </RootTag>
  );
});
