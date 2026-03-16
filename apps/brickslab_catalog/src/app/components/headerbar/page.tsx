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
  {
    name: "as",
    type: "React.ElementType",
    default: `"header"`,
    description: "Élément racine polymorphe.",
  },
  {
    name: "logo",
    type: "ReactNode",
    description: "Logo personnalisé (image, svg, texte).",
  },
  {
    name: "logoHref",
    type: "string",
    description: "Lien autour du logo.",
  },
  {
    name: "title",
    type: "ReactNode",
    description: "Titre utilisé si aucun logo n’est fourni.",
  },
  {
    name: "nav",
    type: "ReactNode",
    description: "Navigation custom. Si présent, remplace `links`.",
  },
  {
    name: "links",
    type: "Array<{ key?: string | number; label: ReactNode; href: string; current?: boolean; }>",
    description: "Liste simple de liens générée automatiquement.",
  },
  {
    name: "actions",
    type: "ReactNode",
    description: "Zone d’actions (boutons, icônes...).",
  },
  {
    name: "defaultMenuOpen",
    type: "boolean",
    default: "false",
    description: "État initial du menu mobile.",
  },
  {
    name: "onMenuToggle",
    type: "(open: boolean) => void",
    description: "Callback déclenché à l’ouverture/fermeture du menu.",
  },
  {
    name: "className",
    type: "string",
    description: "Classe CSS racine.",
  },
  {
    name: "data-testid",
    type: "string",
    description: "Identifiant pour les tests.",
  },
];

/* ------------------------------------------------------------------
 * Usage CODE (links)
 * ------------------------------------------------------------------ */
const usageCode = `import { HeaderBar } from "@brickslab/ui-web";

<HeaderBar
  title="BricksLab"
  logoHref="/"
  links={[
    { label: "Composants", href: "/components", current: true },
    { label: "Docs", href: "/docs" },
    { label: "À propos", href: "/about" }
  ]}
  actions={<button>Se connecter</button>}
/>
`;

/* ------------------------------------------------------------------
 * Usage CODE (nav custom)
 * ------------------------------------------------------------------ */

const usageCodeCustomNav = `import { HeaderBar } from "@brickslab/ui-web";

<HeaderBar
  logo={<span style={{ fontWeight: 700 }}>BricksLab</span>}
  nav={
    <nav style={{ display: "flex", gap: 20 }}>
      <a href="/components">Composants</a>
      <a href="/docs">Docs</a>
      <a href="/about">À propos</a>
    </nav>
  }
  actions={<button>Se connecter</button>}
/>
`;

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
          logo={<span style={{ fontWeight: 700 }}>BricksLab</span>}
            title="BricksLab"
            logoHref="/"
            links={[
              { label: "Composants", href: "#", current: true },
              { label: "Docs", href: "#docs" },
              { label: "À propos", href: "#about" }
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
          />
        </div>
      </Preview>

      {/* Logo seul */}
      <SubLabel>Logo seul</SubLabel>
      <Preview>
        <div className="preview-override" style={{ position: "relative", width: "100%", height: 100 }}>
          <HeaderBar title="BricksLab" />
        </div>
      </Preview>

      {/* Nav custom */}
      <SubLabel>Nav custom + actions</SubLabel>
      <Preview>
        <div className="preview-override" style={{ position: "relative", width: "100%", height: 120 }}>
          <HeaderBar
            logo={
              <span
                style={{
                  fontWeight: 700,
                  color: "var(--color-brand)",
                  fontSize: "1.1rem",
                }}
              >
                BricksLab
              </span>
            }
            nav={
              <nav style={{ display: "flex", gap: 20 }}>
                <a href="#">Accueil</a>
                <a href="#">Docs</a>
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
      <HeaderBar
            title="BricksLab"
            logoHref="/"
            links={[
              { label: "Composants", href: "#", current: true },
              { label: "Docs", href: "#docs" },
              { label: "À propos", href: "#about" }
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
          />
    </div>
  );
}