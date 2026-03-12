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

/* ──────────────────────────────────────────────
   🟦 PROPS TABLE
   ────────────────────────────────────────────── */

const props: PropDef[] = [
  {
    name: "as",
    type: "React.ElementType",
    default: `"header"`,
    description: "Élément racine polymorphe. Par défaut 'header'.",
  },
  {
    name: "title",
    type: "ReactNode",
    description: "Titre affiché si aucun logo n'est fourni.",
  },
  {
    name: "logo",
    type: "ReactNode",
    description: "Slot logo (gauche). Accepte tout noeud React.",
  },
  {
    name: "logoHref",
    type: "string",
    description: "Lien cliquable autour du logo.",
  },
  {
    name: "nav",
    type: "ReactNode",
    description: "Slot navigation custom. Remplace `links` si présent.",
  },
  {
    name: "links",
    type: "Array<{ key?: string | number; label: ReactNode; href: string; current?: boolean; muted?: boolean; }>",
    description: "Liste de liens simple rendue automatiquement.",
  },
  {
    name: "actions",
    type: "ReactNode",
    description: "Slot actions (droite). Boutons, icônes…",
  },
  {
    name: "height",
    type: "number",
    default: "60",
    description: "Hauteur minimale du header (en px).",
  },
  {
    name: "position",
    type: `"fixed" | "sticky" | "static"`,
    default: `"fixed"`,
    description: "Position du header.",
  },
  {
    name: "maxWidth",
    type: "number",
    default: "1280",
    description: "Largeur maximale du contenu interne.",
  },
  {
    name: "paddingX",
    type: "number",
    default: "24",
    description: "Padding horizontal interne (px).",
  },
  {
    name: "paddingY",
    type: "number",
    default: "8",
    description: "Padding vertical interne (px) — permet de centrer visuellement les éléments.",
  },
  {
    name: "showShadowOnScroll",
    type: "boolean",
    default: "true",
    description: "Ajoute une ombre lors du défilement.",
  },
  {
    name: "collapseAt",
    type: "number",
    default: "768",
    description: "Breakpoint sous lequel la navigation passe en menu burger.",
  },
  {
    name: "ariaLabelNav",
    type: "string",
    default: `"Navigation principale"`,
    description: "Libellé ARIA de la navigation.",
  },
  {
    name: "onMenuToggle",
    type: "(open: boolean) => void",
    description: "Callback à l'ouverture/fermeture du menu mobile.",
  },
  {
    name: "defaultMenuOpen",
    type: "boolean",
    default: "false",
    description: "État initial du menu mobile.",
  },
  {
    name: "className",
    type: "string",
    description: "Classe CSS racine.",
  },
  {
    name: "style",
    type: "React.CSSProperties",
    description: "Styles inline de la racine.",
  },
  {
    name: "containerClassName",
    type: "string",
    description: "Classe CSS du conteneur interne.",
  },
  {
    name: "containerStyle",
    type: "React.CSSProperties",
    description: "Styles inline du conteneur interne.",
  },
  {
    name: "navClassName",
    type: "string",
    description: "Classe CSS de la zone navigation.",
  },
  {
    name: "actionsClassName",
    type: "string",
    description: "Classe CSS de la zone actions.",
  },
  {
    name: "logoClassName",
    type: "string",
    description: "Classe CSS de la zone logo.",
  },
  {
    name: "data-testid",
    type: "string",
    description: "Identifiant de test.",
  },
];

/* ──────────────────────────────────────────────
   🟦 USAGE CODE (links)
   ────────────────────────────────────────────── */

const usageCode = `import { HeaderBar } from "@brickslab./ui-web";

&lt;HeaderBar
  title="BricksLab"
  logoHref="/"
  links={[
    { label: "Composants", href: "/components", current: true },
    { label: "Docs", href: "/docs" },
    { label: "À propos", href: "/about", muted: true },
  ]}
  actions={&lt;button&gt;Se connecter&lt;/button&gt;}
  position="sticky"
  showShadowOnScroll
  collapseAt={768}
  height={64}
  paddingY={10}
/&gt;`;

/* ──────────────────────────────────────────────
   🟦 USAGE CODE (nav custom)
   ────────────────────────────────────────────── */

const usageCodeCustomNav = `import { HeaderBar } from "@brickslab./ui-web";

&lt;HeaderBar
  logo={&lt;span style={{ fontWeight: 700, color: "var(--color-brand)" }}&gt;BricksLab&lt;/span&gt;}
  nav={
    &lt;nav style={{ display: "flex", gap: 20 }}&gt;
      &lt;a href="/components"&gt;Composants&lt;/a&gt;
      &lt;a href="/docs"&gt;Docs&lt;/a&gt;
      &lt;a href="/about"&gt;À propos&lt;/a&gt;
    &lt;/nav&gt;
  }
  actions={&lt;button&gt;Se connecter&lt;/button&gt;}
  position="fixed"
  height={64}
  paddingY={12}
/&gt;`;

/* ──────────────────────────────────────────────
   🟦 PAGE
   ────────────────────────────────────────────── */

export default function HeaderBarPage() {
  return (
    <div>
      <style>{`
        /* Contenir un HeaderBar fixed/sticky dans une preview */
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
        description="Barre de navigation responsive avec menu burger automatique. 'paddingY' permet de centrer visuellement les éléments en ajoutant une respiration verticale."
      />

      {/* Aperçu */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>HeaderBar complet — responsive auto (avec paddingY)</SubLabel>
      <Preview>
        <div
          className="preview-override"
          style={{
            position: "relative",
            width: "100%",
            height: 110,
            overflow: "hidden",
            border: "1px dashed var(--color-muted)",
            borderRadius: "var(--radius-md)",
          }}
        >
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
                  padding: "6px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-brand)",
                  color: "var(--color-brand)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Se connecter
              </button>
            }
            position="sticky"
            showShadowOnScroll
            collapseAt={768}
            height={64}
            paddingY={10}
          />
        </div>
      </Preview>

      <SubLabel>Logo seul</SubLabel>
      <Preview>
        <div
          className="preview-override"
          style={{
            position: "relative",
            width: "100%",
            height: 100,
            overflow: "hidden",
            border: "1px dashed var(--color-muted)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <HeaderBar title="BricksLab" height={60} paddingY={10} />
        </div>
      </Preview>

      <SubLabel>Nav custom + actions</SubLabel>
      <Preview>
        <div
          className="preview-override"
          style={{
            position: "relative",
            width: "100%",
            height: 120,
            overflow: "hidden",
            border: "1px dashed var(--color-muted)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <HeaderBar
            logo={<span style={{ fontWeight: 700, color: "var(--color-brand)", fontSize: "1.1rem" }}>BricksLab</span>}
            nav={
              <nav style={{ display: "flex", gap: 20, fontSize: "0.9rem" }}>
                <a href="#" style={{ textDecoration: "none" }}>Accueil</a>
                <a href="#" style={{ textDecoration: "none" }}>Docs</a>
              </nav>
            }
            actions={
              <button
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-brand)",
                  color: "var(--color-brand)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "0.85rem",
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

      {/* Props */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* Utilisation */}
      <SectionTitle>Utilisation</SectionTitle>
      <SubLabel>API avec links (recommandée)</SubLabel>
      <CodeBlock code={usageCode} />

      <SubLabel>API avec nav custom</SubLabel>
      <CodeBlock code={usageCodeCustomNav} />
    </div>
  );
}