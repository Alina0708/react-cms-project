# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

React 18 educational physics application (Create React App), covering internal energy and electric current work. Routes: `/`, `/welcome`, `/theory`, `/structure`, `/simulator`, `/contacts`. Keep changes small, focused, and understandable for a student project.

## Commands

This project uses **yarn** (only `yarn.lock` is present — do not generate or commit a `package-lock.json`).

- `yarn start` — run the dev server
- `yarn build` — production build; also surfaces ESLint warnings/errors (CRA's `eslintConfig` extends `react-app`/`react-app/jest`; there is no separate lint script)
- `yarn test --watchAll=false` — non-interactive full test run
- `yarn test --watchAll=false src/App.test.js` — run a single test file (or pass any substring of the path)

Run `yarn build` before finishing changes and resolve new build errors or relevant ESLint warnings.

## Architecture

- `src/App.js` owns `BrowserRouter` and route definitions, wrapped in a top-level `Suspense`. `Home` and `Layout` are imported eagerly; every other route (`Welcome`, `Theory`, `Structure`, `Simulator`, `Contacts`) is `React.lazy`-loaded and code-split.
- `src/components/Layout/Layout.js` is the shared route (`<Route path="/" element={<Layout />}>`) — it renders `Header` and an `Outlet` for the nested page.
- `src/components/Layout/Header/Header.js` builds nav links from `src/config/navigation.js` using `NavLink`. Route paths in `App.js` and entries in `navigation.js` must be kept in sync manually — there's no single source of truth linking them.
- Feature pages live one-per-folder under `src/components/`: `Home`, `Welcome`, `Theory`, `Structure`, `Simulator`, `Contacts`, plus a shared `Modal`. Each pairs a `<Name>.js` with a co-located `<Name>.module.css` (CSS Modules).
- Styling has three layers: `src/styles/theme.css` holds the design tokens (`--color-*`, `--shadow-*`, `--radius-*`, `--space-*` custom properties); `src/index.css` and `src/App.css` hold global resets/base element styles; everything component-specific goes in that component's CSS Module. Don't hardcode a color/shadow/radius when a theme token already covers it.
- `src/components/Theory/Theory.js` is the largest/most unusual page: it renders long-form physics content with inline formula images and `react-tooltip` popovers, and also mounts a "knowledge assistant" dialog. `src/components/Theory/baseknow.js` wires up that dialog's DOM (including `react-speech-recognition`), and `src/components/Theory/knowledgeData.js` (~600 lines) holds the Q&A lookup table used by `findAnswer`. Treat browser mic permissions and unsupported Speech APIs as runtime concerns, not bugs.
- `src/App.test.js` is unmodified Create React App boilerplate and may assert text that no longer exists in the app — update it to match current behavior rather than treating it as a contract.

## Custom subagent

`.claude/agents/landing-creator.md` defines a subagent for building/overhauling landing-style pages in this project — it already encodes the CSS Modules + theme-token conventions above. Prefer it (or its documented steps) when the task is specifically about adding a new page in the style of `Home`.
