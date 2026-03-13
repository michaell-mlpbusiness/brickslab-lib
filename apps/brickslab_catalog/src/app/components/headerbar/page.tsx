"use client";

import { HeaderBar } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "as", type: "React.ElementType", default: `"header"`, description: "Élément racine polymorphe." },
  { name: "title", type: "ReactNode", description: "Titre affiché si aucun logo n'est fourni." },
  { name: "logo", type: "ReactNode", description: "Slot logo." },
  { name: "logoHref", type: "string", description: "Lien autour du logo." },
  { name: "nav", type: "ReactNode", description: "Navigation custom." },
  { name: "links", type: "Array<{ key?: string | number; label: ReactNode; href: string; current?: boolean; muted?: boolean; }>", description: "Navigation simple auto." },
  { name: "actions", type: "ReactNode", description: "Slot actions (droite)." },
  { name: "height", type: "number", default: "60", description: "Hauteur minimale du header." },
  { name: "position", type: `"fixed" | "sticky" | "static"`, default: `"fixed"`, description: "Positionnement." },
  { name: "maxWidth", type: "number", default: "1280", description: "Largeur interne max." },
  { name: "paddingX", type: "number", default: "24", description: "Padding horizontal." },
  { name: "paddingY", type: "number", default: "8", description: "Padding vertical." },
  { name: "showShadowOnScroll", type: "boolean", default: "true", description: "Ombre au scroll." },
  { name: "collapseAt", type: "number", default: "768", description: "Breakpoint mobile." },
  { name: "ariaLabelNav", type: "string", default: `"Navigation principale"`, description: "Libellé ARIA." },
  { name: "onMenuToggle", type: "(open: boolean) => void", description: "Callback ouverture menu mobile." },
  { name: "defaultMenuOpen", type: "boolean", default: "false", description: "État initial du menu mobile." },
  { name: "className", type: "string", description: "Classe CSS racine." },
  { name: "style", type: "React.CSSProperties", description: "Styles inline racine." },
  { name: "containerClassName", type: "string", description: "Classe CSS du conteneur interne." },
  { name: "containerStyle", type: "React.CSSProperties", description: "Styles inline du conteneur interne." },
  { name: "navClassName", type: "string", description: "Classe CSS de la zone nav." },
  { name: "actionsClassName", type: "string", description: "Classe CSS des actions." },
  { name: "logoClassName", type: "string", description: "Classe CSS du logo." },
  { name: "data-testid", type: "string", description: "Identifiant pour tests." },
];

/* ------------------------------------------------------------------
 * Usage CODE (links)
 * ------------------------------------------------------------------ */
const usageCode = `import { HeaderBar } from "@brickslab./ui-web";

&lt;HeaderBar
  title="BricksLab"
  logoHref="/"
  links={[
    { label: "Composants", href: "/components", current: true },
    { label: "Docs", href: "/docs" },
    { label: "À propos", href: "/about", muted: true },
  ]}
  actions={
    &lt;button
      style={{
        padding: "var(--sp-2) var(--sp-3)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-brand)",
        color: "var(--color-brand)",
        background: "transparent",
        fontSize: "var(--font-md)",
      }}
    &gt;
      Se connecter
    &lt;/button&gt;
  }
  position="sticky"
  showShadowOnScroll
  collapseAt={768}
  height={64}
  paddingY={10}
/&gt;`;

/* ------------------------------------------------------------------
 * Usage CODE (nav custom)
 * ------------------------------------------------------------------ */

const usageCodeCustomNav = `import { HeaderBar } from "@brickslab./ui-web";

&lt;HeaderBar
  logo={
    &lt;span style={{ fontWeight: 700, color: "var(--color-brand)", fontSize: "var(--font-lg)" }}&gt;
      BricksLab
    &lt;/span&gt;
  }
  nav={
    &lt;nav style={{ display: "flex", gap: "var(--sp-3)", fontSize: "var(--font-md)" }}&gt;
      &lt;a href="/components"&gt;Composants&lt;/a&gt;
      &lt;a href="/docs"&gt;Docs&lt;/a&gt;
      &lt;a href="/about"&gt;À propos&lt;/a&gt;
    &lt;/nav&gt;
  }
  actions={
    &lt;button
      style={{
        padding: "var(--sp-2) var(--sp-3)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-brand)",
        color: "var(--color-brand)",
        background: "transparent",
        fontSize: "var(--font-md)",
      }}
    &gt;
      Se connecter
    &lt;/button&gt;
  }
  position="fixed"
  height={64}
  paddingY={12}
/&gt;`;

export default function HeaderBarPage() {
  return (
    <div>
      <style>{`
        .preview-override header {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 5 !important;
        }
        .preview-override > *:not(header) {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <ComponentHeader
        name="HeaderBar"
        description="Barre de navigation responsive avec menu burger automatique. 'paddingY' permet de centrer visuellement les éléments."
      />

      <SectionTitle>Aperçu</SectionTitle>

      {/* Aperçu complet */}
      <SubLabel>HeaderBar complet — responsive auto</SubLabel>
      <Preview>
        <div className="preview-override" style={{ position: "relative", width: "100%", height: 120 }}>
          <HeaderBar
            title="BricksLab"
            logoHref="/"
            links={[
              { label: "Composants", href: "#", current: true },
              { label: "Docs", href: "#docs" },
              { label: "À propos", href: "#about", muted: true },
            ]}
            actions={
              <button
                style={{
                  padding: "var(--sp-2) var(--sp-3)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-brand)",
                  color: "var(--color-brand)",
                  background: "transparent",
                  fontSize: "var(--font-md)",
                }}
              >
                Se connecter
              </button>
            }
            position="sticky"
            collapseAt={768}
            height={64}
            paddingY={10}
          />
        </div>
      </Preview>

      {/* Logo seul */}
      <SubLabel>Logo seul</SubLabel>
      <Preview>
        <div className="preview-override" style={{ position: "relative", width: "100%", height: 100 }}>
          <HeaderBar title="BricksLab" height={60} paddingY={10} />
        </div>
      </Preview>

      {/* Nav custom */}
      <SubLabel>Nav custom + actions</SubLabel>
      <Preview>
        <div className="preview-override" style={{ position: "relative", width: "100%", height: 120 }}>
          <HeaderBar
            logo={<span style={{ fontWeight: 700, color: "var(--color-brand)", fontSize: "var(--font-lg)" }}>BricksLab</span>}
            nav={
              <nav style={{ display: "flex", gap: "var(--sp-3)", fontSize: "var(--font-md)" }}>
                <a href="#">Accueil</a>
                <a href="#">Docs</a>
              </nav>
            }
            actions={
              <button
                style={{
                  padding: "var(--sp-2) var(--sp-3)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-brand)",
                  color: "var(--color-brand)",
                  background: "transparent",
                  fontSize: "var(--font-md)",
                }}
              >
                Se connecter
              </button>
            }
            height={64}
            paddingY={12}
            position="fixed"
          />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <SubLabel>API avec links</SubLabel>
      <CodeBlock code={usageCode} />
      <SubLabel>API avec nav custom</SubLabel>
      <CodeBlock code={usageCodeCustomNav} />
    </div>
  );
}