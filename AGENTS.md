# Agent guide — app shell starter

Familiar ChatGPT-like **chrome**, not a chat product. Starting point for many
apps (email sender, CRM, internal tools). Keep the product thin.

## Architecture (do not invent a new one)

```text
app/
  components/
    shell/     # PROTECTED — AppShell, WorkspaceSwitcher, BrandMark, menus
    ui/        # ONLY allowed primitives (Base UI recipes)
  lib/
    store.ts       # workspaces, items, tickets, ui prefs
    nav-config.ts  # product nav (edit per fork)
    app-config.ts  # APP_NAME / tagline
  routes/          # thin screens under /w/:workspaceId
```

### Rules

1. **Shell is protected.** Do not replace `AppShell` with shadcn Sidebar kits.
2. **All dialogs / menus / tooltips / switches** from `app/components/ui/*` (or `Tip`).
3. **Workspaces first-class.** Data under `/w/:workspaceId/...`. Plan is per workspace.
4. **Settings:** workspace menu → **Workspace settings** only.
5. **Account:** user menu → Profile / Preferences / Support / Log out.
6. **Product entity** is generic **Item**. Create via Home/Items CTAs, not a nav row.
7. **No Search** until a real search/palette exists.
8. **Nav** in `lib/nav-config.ts` only.
9. **Mobile-first:** drawer overlay &lt; md; desktop rail 260/52.
10. Prefer local store until a real backend exists.
11. **Framework mode** (`ssr: true`).
12. **Profile row:** fixed `h-9` cell, 24px avatar, `py-1.5` always; fade labels only.

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

### Visual language

- Surface `#fcfcfc`, ink `#0d0d0d`
- Sidebar order: brand → space → product nav → rule → workspace → rule → user
- Dark tooltips `#1b1b1b`

### Adding a product feature

1. Extend `nav-config.ts` if it needs chrome nav
2. Add route under `w/:workspaceId/...`
3. Persist via `store.ts` (workspace-scoped when multi-tenant)
4. Use `ui/*` for chrome; don’t invent modals

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

### Sidebar motion notes

- Animate **width** (desktop) or **translateX** (mobile drawer) only
- Labels use **opacity**, not unmount/remount that shifts layout
- Separators use **fixed** `.sidebar-rule` margins — never toggle margin on open/close (that caused flicker)
- Avatar/icon cells stay **fixed size** so collapse doesn’t jump
