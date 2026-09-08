# Copilot instructions for this project

## Project overview

- This is a React application for an educational physics project.
- Prefer small, focused React components.
- Keep the app easy to read, maintain, and extend.

## Coding standards

- Use functional components with hooks when needed.
- Prefer CSS Modules for component styling.
- Reuse shared theme variables from `src/styles/theme.css` instead of hardcoded colors.
- Keep styling consistent with the existing purple-based design system.
- Do not add unnecessary dependencies or libraries.
- Avoid unused imports and dead code.

## Architecture

- Keep routing configuration centralized in `src/App.js`.
- Keep shared navigation config in `src/config/navigation.js`.
- Use the existing component structure under `src/components`.
- Prefer simple, explicit file names and consistent folder organization.

## Styling rules

- Use CSS variables from `src/styles/theme.css` for colors, spacing, shadows, and radii.
- Prefer semantic, maintainable class names.
- Use modern but simple layout patterns: flexbox, grid, rounding, shadows, and spacing.
- Keep styles responsive and avoid fragile absolute-position layouts when possible.

## Verification

- Validate changes with `yarn build` before finishing work.
- If warnings appear, fix them when they are easy and relevant.

## General guidance

- Preserve the app’s educational and visual style.
- Prefer incremental improvements over large rewrites.
- Keep code readable and understandable for a student project.
