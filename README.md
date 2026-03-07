# brickslab-lib

Plateforme stagiaires Brickslab.

## Périmètre

- Getting started
- Documentation
- Catalogue composants web/mobile
- Templates
- Résultats de tests

## Stack

- `apps/brickslab_catalog`
- `packages/ui-web`
- `packages/ui-mobile`
- `packages/token-contract`
- `packages/theme-default`
- `tests/`, `docs/`, `components_docs/`

## Commandes

```bash
pnpm install
pnpm dev
pnpm build
pnpm build:catalog
pnpm audit
pnpm test:components
pnpm test:lint
pnpm sync:components
```

## Règles

- Le code source des tools n'est pas embarqué:
  - pas de page `themebuilder`
  - pas de page `mockupbuilder`
- Ce repo sert à apprendre, tester et améliorer la lib en contexte contrôlé.
