# Deployment Vercel (brickslab-lib)

## Réglages projet

Dans Vercel, configure le projet avec:

- **Root Directory**: `apps/brickslab_catalog`
- **Framework Preset**: `Next.js` (détection auto)

Le fichier `apps/brickslab_catalog/vercel.json` force les bonnes commandes monorepo:

- install: `pnpm -C ../.. install --frozen-lockfile`
- build: `pnpm -C ../.. run build:catalog`

## Pourquoi ces commandes

- Le catalogue dépend de packages workspace (`@brickslab./ui-web`, `@brickslab./theme-default`, `@brickslab./token-contract`) qui doivent être build avant `next build`.
- Le build génère aussi les fichiers d'audit dans `apps/brickslab_catalog/public/data`, nécessaires en production pour l'API `/api/test-results`.
