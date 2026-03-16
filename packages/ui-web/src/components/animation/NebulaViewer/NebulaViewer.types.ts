// ==================== TYPES DU COMPOSANT ====================
export interface NebulaModelOption {
  src: string;
  color?: string;
}

export interface NebulaViewerProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;

  models: NebulaModelOption[];

  autoRotate?: boolean;

  viewerWidth?: string;
  haloSize?: string;

  showPauseButton?: boolean;

  className?: string;
}
