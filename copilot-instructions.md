# Copilot instructions for this project

## Project overview

- This is a React 18 educational physics application created with Create React App.
- Main routes are `/`, `/theory`, `/structure`, `/simulator`, and `/contacts`.
- Keep changes small, focused, and understandable for a student project.

## Commands

- Install dependencies with the repository's existing package manager before making changes.
- Use `yarn start` for local development and `yarn build` for the production check.
- Use `yarn test --watchAll=false` for a non-interactive test run when tests are relevant.
- Both `package-lock.json` and `yarn.lock` may exist. Do not regenerate or update the other lockfile incidentally; preserve the lockfile already being used for the task.

## Architecture

- `src/App.js` owns `BrowserRouter`, route definitions, and the shared `Layout` route.
- `src/components/Layout/Layout.js` provides the app shell and renders nested routes through `Outlet`.
- `src/components/Layout/Header/Header.js` reads navigation entries from `src/config/navigation.js` and uses `NavLink` for active states.
- Feature pages live under `src/components`: `Home`, `Theory`, `Structure`, `Simulator`, `Contacts`, and `Modal`.
- `src/index.js` is the entry point and loads global styles; `src/styles/theme.css` is the shared design-token source.

## Coding standards

- Use functional React components and hooks where state or lifecycle behavior is needed.
- Prefer CSS Modules for component styles and shared variables from `src/styles/theme.css` for colors, spacing, shadows, and radii.
- Keep route paths and navigation labels synchronized through the existing centralized configuration.
- Reuse existing components and dependencies before adding new abstractions or packages.
- Remove unused imports and dead code introduced by a change.
- Preserve the educational content and existing purple-based visual language unless the task explicitly requests a redesign.

## Styling rules

- Prefer semantic class names and responsive flexbox/grid layouts.
- Avoid fragile absolute positioning when normal flow, flexbox, or grid can express the layout.
- Do not hardcode a new color when an appropriate theme variable exists.
- Keep global styles in `src/index.css` or `src/App.css`; keep page/component styles in their CSS Modules.

## Important pitfalls

- `src/components/Theory/Theory.js` and `src/components/Theory/baseknow.js` contain the knowledge assistant and speech-recognition behavior. Treat browser permissions and unsupported speech APIs as runtime concerns.
- The simulator page is primarily instructional content; related static assets are under `src/image` and `public/map`.
- `src/App.test.js` is legacy Create React App boilerplate and may assert text that no longer exists. Update the test when changing the rendered app rather than treating that assertion as the product contract.
- Avoid unrelated cleanup of legacy comments, console logging, or content typos during focused feature work.

## Verification

- Run `yarn build` before finishing code changes and resolve new build errors or relevant ESLint warnings.
- Run the focused test or `yarn test --watchAll=false` when behavior or routing changes.
- Check `git diff --check` before committing.
- Never commit private keys, generated build output, or unrelated untracked files.
