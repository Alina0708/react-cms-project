---
name: theme-check
description: Audit this project's CSS for hardcoded colors/shadows that duplicate a token in src/styles/theme.css, and optionally replace them with the matching var(). Use when asked to check theme consistency, find hardcoded colors, or clean up CSS before a design change.
---

# Theme Check

This project centralizes design tokens (colors, shadows, radii, spacing) as CSS custom
properties in `src/styles/theme.css`. Per `copilot-instructions.md`: "Do not hardcode a new
color when an appropriate theme variable exists." Component styles live in CSS Modules
(`src/components/**/*.module.css`) plus a couple of global files (`src/App.css`,
`src/index.css`, `src/assets/css/Main.css`).

Token values drift out of sync with the theme over time — e.g. `src/components/Theory/basestyle.module.css`
still has the old purple `#8241be` accents from before the palette was refreshed to blue. This
skill finds that kind of drift.

## Steps

1. **Read the current tokens fresh.** Read `src/styles/theme.css` — don't rely on remembered
   values, it changes over time. Note every custom property and its value (colors, `--shadow-*`,
   `--radius-*`, `--space-*`).

2. **Scope the scan.** Default scope is every `*.css` file under `src/` except
   `src/styles/theme.css` itself. If the user names a file or component, scope to that instead.

3. **Find literal color/shadow values.** Grep for hex colors (`#fff`, `#ffffff`, `#8241be`, ...)
   and `rgb(`/`rgba(` calls that are not already inside a `var(...)` call, e.g.:
   ```
   grep -rnoE '#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)' src --include='*.css' | grep -v 'src/styles/theme.css'
   ```
   Ignore `transparent`, `currentColor`, and `inherit` — those aren't literals to tokenize.

4. **Classify each hit** against the token list from step 1:
   - **Exact match** — literal equals a token's value exactly (e.g. `#ffffff` when
     `--color-surface: #fffef9` doesn't match but some other token does, or a plain white/black
     used as a one-off). Flag with the specific variable it should use.
   - **Near match** — same color family/intent as a token but off by a shade (e.g. leftover
     `#8241be` purple when the theme moved to a `--color-primary` blue). Flag as likely stale
     content that predates a redesign, not just a missed token.
   - **Repeated, untokenized** — the same literal (or near-identical ones) appears 2+ times
     across files with no matching token. Flag as a candidate for a *new* token rather than a
     find-and-replace.
   - **Genuine one-off** — a literal with no reuse and no clear token intent (rare shadow tint,
     a single decorative accent). Don't flag these; forcing every literal into a token is not
     the goal.

5. **Report** findings grouped by file, each as `file:line — literal — suggested var(--token)`
   (or "no matching token; N occurrences, consider adding one" for the repeated-untokenized
   case). Skip files with nothing worth flagging rather than listing them as clean.

6. **Fix only if asked.** When the user asks to apply fixes:
   - Replace exact-match and clearly-intended near-match literals with the corresponding
     `var(--token)`.
   - For "repeated, untokenized" clusters, propose the new token (name + value) and ask before
     adding it to `theme.css` — that's a design decision, not a mechanical replacement.
   - Never invent a token value that isn't either an existing theme value or explicitly
     confirmed by the user.
   - After edits, this project's own verification rule applies: run `yarn build` and resolve
     any new errors.
