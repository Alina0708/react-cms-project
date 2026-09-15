<!-- bmad:context -->
<!-- Verified 2026-09-15 against d02f90d. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## react-cms-project

React 18 educational physics app (Create React App) covering internal energy and electric current; pure client-side SPA, no backend, no database. Yarn only. Keep changes small, focused, and understandable for a student project. Deeper architecture reference: `bmad/docs/system_architecture.md`.

## Where things are

- Routing & layout entry point: `src/App.js` → `src/components/Layout/Layout.js` (renders `Header` + `Outlet`)
- Nav config: `src/config/navigation.js`
- New landing-style page? Use the `.claude/agents/landing-creator.md` subagent — it already encodes these conventions.
- Deployment is via Vercel (`.vercel/`); `.github/workflows/jekyll-gh-pages.yml` is unrelated leftover boilerplate, not the real deploy path.

## Running and verifying

- Yarn only — `yarn.lock` is the sole lockfile; never generate or commit `package-lock.json`.
- `yarn build` is the only place ESLint warnings/errors surface (no separate lint script); run it before finishing and resolve new warnings.
- `yarn test --watchAll=false` for a full run; append a path/substring for one file.

## Conventions that differ from defaults

- Keep `App.js` route paths and `navigation.js` entries in sync by hand — nothing links them automatically.
- One folder per feature page under `src/components/`, pairing `<Name>.js` with a co-located `<Name>.module.css`.
- Never hardcode a color/shadow/radius/spacing value already covered by a token in `src/styles/theme.css`.

## Known pitfalls

- Denied mic permissions or an unsupported Speech Recognition API in the Theory page's knowledge assistant (`baseknow.js`) are runtime/environment variance, not bugs to fix.
- `src/App.test.js` is CRA-derived, not a behavior contract — update its assertions to match current app behavior instead of preserving them.

<!-- /bmad:context -->
