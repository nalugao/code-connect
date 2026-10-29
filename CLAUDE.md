# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

pnpm monorepo (`pnpm-workspace.yaml` → `apps/*`) with two independent apps:

- `apps/api` — NestJS 12 backend (Express platform), package name `api`. Listens on `PORT` or 3000.
- `apps/web` — React 19 + Vite 8 frontend, package name `web`.

Both are still close to their framework starter templates; the apps do not yet share code or talk to each other (no proxy is configured in `vite.config.ts`).

## Commands

Run from the repo root:

```bash
pnpm install
pnpm dev            # web (vite) + api (nest --watch) in parallel
pnpm dev:web
pnpm dev:api
pnpm build          # builds every workspace package
pnpm lint           # oxlint in every package
pnpm test           # unit tests in every package (api + web)
pnpm api <script>   # run any api script, e.g. `pnpm api test:e2e`
pnpm web <script>   # run any web script, e.g. `pnpm web preview`
```

API-specific (`pnpm api <script>` or from `apps/api`):

- `test` / `test:watch` / `test:cov` — Vitest, picks up `**/*.spec.ts` (co-located in `src/`).
- `test:e2e` — Vitest with `vitest.config.e2e.ts`, picks up `**/*.e2e-spec.ts` in `test/` (uses supertest against a full `AppModule`).
- Single test: `pnpm api test src/app.controller.spec.ts` or `pnpm api test -t "test name"`.
- `format` — Prettier (single quotes, trailing commas) over `src/` and `test/`.

The web `build` runs `tsc -b` before `vite build`, so type errors fail the build.

## Conventions and gotchas

- **API is native ESM** (`"type": "module"`, `module: nodenext`): relative imports must include the `.js` extension (e.g. `import { AppModule } from './app.module.js'`), and `main.ts` uses top-level `await`.
- Vitest runs with `globals: true` (`describe`/`it`/`expect` without imports) and `vite-tsconfig-paths`, so tsconfig path aliases (e.g. from `nest g library`) resolve in tests.
- Linting is **oxlint**, not ESLint, in both apps. API config: `apps/api/oxlint.json` (`no-explicit-any` off, `no-floating-promises` warn). Web config: `apps/web/.oxlintrc.json` (react rules-of-hooks, only-export-components).
- Web tsconfig is strict about unused locals/params, uses `verbatimModuleSyntax` (use `import type` for type-only imports) and `erasableSyntaxOnly` (no enums/namespaces/parameter properties in web code).
- Code style differs per app: API uses semicolons + single quotes (Prettier); web code uses no semicolons + single quotes (no formatter configured).

## Frontend rules (`apps/web`)

- **Atomic Design.** Organize components under `src/components/` by level:
  - `atoms/` — smallest building blocks with no dependency on other components (Button, Input, Icon, Label).
  - `molecules/` — small groups of atoms that work as one unit (FormField = Label + Input, SearchBar).
  - `organisms/` — larger sections made of molecules and atoms (Header, PostCard list, CommentForm).
  - `templates/` — page layouts that place organisms but receive data via props.
  - `pages/` — templates filled with real data; the only level that fetches data or touches routing.
  A component may import only from its own level or lower ones, never from a higher level.
- **One folder per component**, holding the component and its test, e.g. `atoms/Button/Button.tsx` + `atoms/Button/Button.test.tsx`.
- **Tailwind CSS** for all styling: use utility classes in JSX; don't add new `.css` files or inline `style` props except for truly dynamic values. Variants are expressed via props that map to class sets.
- **Every component needs a test** covering its essential use: it renders, and its main interaction or prop-driven behavior works (e.g. a Button calls `onClick`; a FormField shows its label and error). Test from the user's point of view (queries by role/label/text), not implementation details. A component change is not done until its test exists and passes.
- **Tooling:** Tailwind v4 via `@tailwindcss/vite`. Design tokens (colors, `font-sans` = Prompt) live in the `@theme` block of `src/index.css`; use the token classes (`bg-page`, `bg-card`, `text-primary`, `text-offwhite`…) instead of raw hex values. Tests use Vitest + React Testing Library + jsdom (configured in `vite.config.ts`, globals on, setup in `src/test/setup.ts`); wrap components that render a `Link` in `MemoryRouter`. Single file: `pnpm web test src/components/atoms/Button`.
- **Routing:** `react-router` (import from `react-router`, not `react-router-dom`); routes are declared in `src/App.tsx`. Auth screens (login, future sign-up) share `templates/AuthTemplate` and differ only in banner, title/subtitle and the organisms passed as children.

## Backend rules (`apps/api`)

The API must follow REST principles:

- **Resources, not actions.** URLs are plural nouns (`/posts`, `/posts/:id`, `/posts/:id/comments`); no verbs in paths (not `/getPosts`, `/createPost`). Nest at most one level deep.
- **HTTP methods with correct semantics:** `GET` reads (safe, never changes state), `POST` creates, `PUT` replaces whole resource (idempotent), `PATCH` partially updates, `DELETE` removes (idempotent).
- **Correct status codes:** `200` OK, `201` Created (with a `Location` header pointing to the new resource), `204` No Content (e.g. successful `DELETE`), `400` invalid input, `401` unauthenticated, `403` forbidden, `404` not found, `409` conflict, `422` validation errors on well-formed requests, `500` only for unexpected failures. Use Nest's `@HttpCode()` and built-in `HttpException` subclasses rather than hand-built responses.
- **Stateless:** each request carries everything needed (e.g. auth token); no server-side session state.
- **Query strings for collections:** filtering, sorting and pagination go in query params (`GET /posts?author=1&sort=-createdAt&page=2&limit=20`), not in the path or body.
- **JSON in and out**, with consistent field naming (camelCase) and a single consistent error body shape across all endpoints.
- **Validate input with DTOs** per operation (create/update), keeping request shapes separate from internal entities.
- Organize code as one Nest module per resource (controller + service + DTOs), registered in `AppModule`.

## Git

Both apps use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Scope is the affected app — `web` or `api` — or omitted for repo-wide changes (e.g. `chore: update pnpm lockfile`).
- Description in imperative mood, lowercase, no trailing period: `feat(api): add pagination to posts list`.
- Breaking changes: add `!` after the type/scope (`feat(api)!: rename posts route`) and a `BREAKING CHANGE:` footer.
- Keep each commit to a single app and a single logical change when possible.
