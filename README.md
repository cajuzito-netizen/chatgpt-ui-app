# App shell starter

Generic product shell with **familiar ChatGPT-like chrome**, **workspaces**, and
**React Router v8 framework mode**. Not a chat app — a starting point for apps
like an email sender, CRM, or internal tool.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | React Router v8 (**framework mode**, SSR on) |
| Style | Tailwind v4 + design tokens |
| Shell | Custom (`app/components/shell`) |
| Primitives | Base UI recipes (`app/components/ui`) |
| Data (v1) | Client store + localStorage |
| Workspaces | First-class, route-scoped |

## Run

```bash
cd chatgpt-ui-app
npm install
npm run dev
```

## Features (v1)

- Collapsible sidebar (260 ↔ 52), state persisted, expand edge hit-target
- Workspace switcher (create / switch / rename / delete, keep ≥1)
- Product nav: **Home · New item · Items** (+ Settings) via `nav-config.ts`
- Workspace-scoped **Items** (create / list / edit / delete)
- Settings (workspace) + Account (profile / prefs) + Support tickets
- Upgrade chip (workspace plan Free → Pro)
- No Search in shell (add later when product has something to search)

## Project map

```text
app/
  components/shell/   # AppShell, WorkspaceSwitcher, BrandMark
  components/ui/      # dialog, menu, tooltip, button, input
  lib/app-config.ts   # APP_NAME / tagline — change per product
  lib/store.ts        # workspaces + user
  routes/             # home → /w/:id, settings
AGENTS.md             # rules for coding agents
```

## Customize for a product

1. Edit `app/lib/app-config.ts` (`APP_NAME`, tagline)
2. Replace nav items in `AppShell`
3. Add routes under `w/:workspaceId/...`
4. Grow `store.ts` (or a real API) for product data

## Agent rules

See **[AGENTS.md](./AGENTS.md)**. Short version: protect the shell; only use
`ui/*` for chrome; scope data to workspaces; keep framework mode.
