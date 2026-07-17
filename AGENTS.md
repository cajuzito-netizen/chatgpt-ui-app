# Agent guide — app shell starter

Familiar **ChatGPT / Grok-like chrome**, not a chat product. Starting point for
many apps (email sender, CRM, internal tools). Keep the product thin.

## Magic vs velocity (north star)

**Priority 1 — Magic:** feel, design, and experience of ChatGPT / Grok. This wins
every conflict. shadcn is never more important than that feel.

**Priority 2 — Velocity:** for everything else (forms, lists, settings content,
new product UI), move fast with **shadcn-shaped** `ui/*` components and coding
agents. shadcn is the component store and convention layer — not the brand.

```text
PRIORITY 1 (protect)              PRIORITY 2 (ship fast)
────────────────────────────      ────────────────────────────
Shell geometry & hierarchy        Button, Input, Field, Select
Density of chrome                 Switch, Table, Tabs, …
Surfaces / tokens (tuned)         Dialog / Drawer *content*
Motion of chrome & overlays       Feature routes & forms
Dialogs-as-places (when)          Agent-generated product UI
```

### Decision test (use on every change)

1. Does this change how the **frame** feels (sidebar, rail, density, surfaces,
   shell hierarchy, open/close motion)?  
   → **Magic first.** Slow down. Work only in `shell/*` and tokens in `app/app.css`.
   Do **not** replace chrome with shadcn Sidebar kits.

2. Is this **inside** the main area or a settings/account panel (forms, lists,
   actions, copy)?  
   → **Velocity.** Prefer existing `ui/*`, or add a shadcn-compatible file under
   `ui/*`. Thin routes. No new global CSS for one-off widgets.

If a shadcn example makes the app feel like a generic admin template, **change
the example** (tokens, spacing, hierarchy) — do not abandon Priority 1.

### What “magic” means (enforceable)

1. **Chrome geometry** — Desktop open ~260px (`--sidebar-width`), rail ~52px
   (`--sidebar-rail`). Quiet 1px edge. Collapse is **icon-first** (labels fade /
   width-collapse; icons stay put). Footer: **workspace card + user card**. Free/Pro
   chip is a real control (own hit-target), not nested inside the menu trigger.
   Metrics notes: `docs/shell-metrics.md`.

2. **Density** — Tool-dense, not airy admin. ~14px body text, tight nav rows
   (`h-9`), restrained chrome padding. Prefer calm page spacing (`gap-3`–`gap-4`)
   over huge `p-8` / marketing stacks from pasted demos.

3. **Surfaces** — Near-white background / true-black dark via **shadcn token
   values** (`background`, `foreground`, `muted-foreground`, … in `app/app.css`).
   Soft hovers (`black/5`, `white/10`). Few loud cards/shadows; one quiet plane.

4. **Motion** — Short and purposeful: shell width / drawer / label opacity. Gate
   load flash (e.g. motion after ready). No flashy route transitions by default.
   Prefer Base UI `data-starting-style` / `data-ending-style` over dead
   `animate-in` stacks.

5. **Hierarchy** — Shell order is fixed: **brand → product nav → workspace →
   account**. Main content stays calm (title, short line, primary CTA, empty
   state). Don’t clutter main with secondary chrome or invent a second left nav.

6. **Dialogs as places** — Multi-section config (settings / account) = focused
   large panel. One-shot confirms (log out) = small alert. Build **panel content**
   with `ui/*` for velocity; don’t invent a third modal system.

### What “velocity” means (enforceable)

- **UI kit** lives in `app/components/ui/*` only for shared primitives.
- **Externals:** same names, exports, and prop surface as [shadcn/ui](https://ui.shadcn.com)
  so docs and agent snippets drop in (`Button`, `variant`, `Dialog`, …).
- **Internals:** [Base UI](https://base-ui.com) first (parts, `render`, data-*) —
  do **not** copy shadcn Radix internals.
- New feature: compose `ui/*` + tokens + thin route. Do not invent one-off menus
  or modals outside `ui/*`.
- Prefer `DropdownMenu*`; prefer `Tip` for shell icon tooltips.

### Adding a shadcn-style component

1. Add or adapt under `app/components/ui/<name>.tsx`.
2. Wire imports to `~/components/ui/*` and `cn` from `~/lib/utils`.
3. Style with **semantic tokens** (`bg-background`, `text-muted-foreground`,
   `border-border`, radii) — not a new product palette.
4. Base UI under the hood; match shadcn prop/file surface outside.
5. If the design needs **left chrome**, stop — implement in `shell/*` instead.

### Adding a product feature

1. Decision test above (magic vs velocity).
2. Extend `lib/nav-config.ts` only if it needs chrome nav.
3. Add thin route under `w/:workspaceId/...`.
4. Persist via `store.ts` (workspace-scoped when multi-tenant).
5. Use `ui/*` for controls; keep shell untouched unless chrome is required.

---

## Architecture (do not invent a new one)

```text
app/
  components/
    shell/     # PROTECTED — AppShell, WorkspaceSwitcher, BrandMark, menus
    ui/        # shadcn-compatible primitives over Base UI (velocity kit)
  lib/
    store.ts       # workspaces, items, tickets, ui prefs
    nav-config.ts  # product nav (edit per fork)
    app-config.ts  # APP_NAME / tagline
  routes/          # thin screens under /w/:workspaceId
  app.css          # Tailwind + shadcn @theme tokens + sidebar width/rail only
docs/
  shell-metrics.md # live geometry reference for shell
```

### Product rules

1. **Shell is protected.** Do not replace `AppShell` with shadcn Sidebar kits.
2. **Workspaces first-class.** Data under `/w/:workspaceId/...`. Plan is per workspace.
3. **Settings:** workspace menu → **Workspace settings** only.
4. **Account:** user menu → Profile / Preferences / Support / Log out.
5. **Product entity** is generic **Item**. Create via Home/Items CTAs, not a nav row.
6. **No Search** until a real search/palette exists.
7. **Nav** in `lib/nav-config.ts` only.
8. **Mobile-first:** `ui/drawer` overlay &lt; md; desktop rail via `--sidebar-width` / `--sidebar-rail`.
9. Prefer local store until a real backend exists.
10. **Framework mode** (`ssr: true`).
11. **Collapse:** fixed-size avatar/icon slots; fade/collapse **labels only** (no icon jump).

### Fork rename map

| Template | Example product renames |
|----------|-------------------------|
| Item | Campaign, Contact, Project, Deal |
| Items | Campaigns, Contacts, Projects |
| `/items` | `/campaigns`, `/contacts`, … |
| New item | New campaign, etc. (page CTA) |

### Product routes (v1)

| Path | Purpose |
|------|---------|
| `/w/:id` | Home + recent items |
| `/w/:id/new` | Create item |
| `/w/:id/items` | Item list |
| `/w/:id/items/:itemId` | Item detail / edit |
| `/w/:id/settings` | Workspace settings |
| `/w/:id/account` | Profile & preferences |

### Support tickets (minimal)

- Fields: `subject` (required), `body` (optional), `workspaceId`, `createdAt`
- No status, assignees, or priority in the template
- UI: send form + previous list

### store.ts (what lives there)

| Slice | Purpose |
|-------|---------|
| `workspaces` | List, active id, plan Free/Pro, rename/delete/create |
| `items` | Generic product records scoped by `workspaceId` |
| `tickets` | Minimal support notes (subject + optional body) |
| `ui.sidebarDesktopOpen` / `ui.sidebarMobileOpen` | **Independent** open flags per breakpoint |
| `user` | Display name, email, theme, language |

Later server auth will replace most of this; keep shapes similar for an easy migrate.

### Accessibility / keyboard (later)

Not polished yet — track for a later pass:

- Dialogs: confirm focus return to trigger on close (Base UI helps)
- Skip link to main content (mobile + desktop)
- Ensure all icon-only controls have `aria-label` (mostly done)
- Escape closes mobile drawer if open
- No custom focus trap outside Base UI overlays

### Shell motion notes

- Desktop: animate **width** between `--sidebar-width` and `--sidebar-rail`
- Mobile: **Drawer** (slide), not a second invent-your-own overlay system
- Labels: opacity / width collapse — don’t remount in a way that shifts icons
- Footer separators: stable margins (don’t toggle margin with open/close)
- Avatar/icon cells: **fixed size** so collapse doesn’t jump
