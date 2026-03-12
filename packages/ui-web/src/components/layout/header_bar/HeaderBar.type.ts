import React from "react";

export interface HeaderLink {
  key?: string | number;
  label: React.ReactNode;
  href: string;
  current?: boolean;
  muted?: boolean;
}

export type HeaderBarPosition = "fixed" | "sticky" | "static";

export interface HeaderBarProps {
  /** Élément racine (header par défaut) */
  as?: React.ElementType;

  /** Slot logo (image, svg, texte…) */
  logo?: React.ReactNode;
  /** Lien du logo (optionnel) */
  logoHref?: string;
  /** Titre court si pas de logo */
  title?: React.ReactNode;

  /** Slot navigation custom (centre) */
  nav?: React.ReactNode;
  /** Liste de liens simple (alternative à `nav`) */
  links?: HeaderLink[];

  /** Slot actions (droite) */
  actions?: React.ReactNode;

  /** Hauteur minimale de la barre (px) */
  height?: number;

  /** fixed | sticky | static */
  position?: HeaderBarPosition;

  /** Largeur max du contenu interne */
  maxWidth?: number;

  /** Padding horizontal (px) du contenu interne */
  paddingX?: number;

  /** Padding vertical (px) du contenu interne — aide à centrer visuellement les éléments */
  paddingY?: number;

  /** Afficher une ombre au scroll (true par défaut) */
  showShadowOnScroll?: boolean;

  /** Largeur (px) sous laquelle on passe en menu mobile */
  collapseAt?: number;

  /** Étiquette ARIA pour la nav */
  ariaLabelNav?: string;

  /** Callback ouverture/fermeture menu mobile */
  onMenuToggle?: (open: boolean) => void;

  /** État initial du menu mobile */
  defaultMenuOpen?: boolean;

  /** Personnalisation CSS */
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  navClassName?: string;
  actionsClassName?: string;
  logoClassName?: string;

  /** Test id */
  "data-testid"?: string;
}