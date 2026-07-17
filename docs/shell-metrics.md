# Shell metrics (chatgpt.com reference)

Source: Patchright 2026-07-16, signed-in, sidebar open  
(`out-patchright/live-measure`, `hover-compare-now/ref-data.json`).

| Element | Live | Our implementation |
|---------|------|--------------------|
| Sidebar width | 260px | `--sidebar-width` in `app.css` |
| Rail | 52px (`13 × 0.25rem`) | `--sidebar-rail` |
| Divider | 1px `rgba(0,0,0,0.05)` | `border-black/5` / `dark:border-white/10` |
| Nav row | h 36, m 0 6, p 6 10, gap 6, r 10 | `h-9`, `mx-1.5`, `py-1.5 px-2.5`, `gap-1.5`, `rounded-[10px]` |
| Nav icon | 20px | `size-5` |
| Brand header | ~52 tall | `h-12` + **`h-4`** spacer before nav |
| Account row | h≈52, avatar 24 | outer `h-12`; fixed **`h-9 w-9`** hover casing + **`size-6`** avatar (no jump on collapse) |
| Workspace | not a rail card | switch/create/settings in **account menu** (`workspace-menu.tsx`); ambient name on pages. Optional `WorkspaceSwitcher` kept for forks. |
| Footer | | rule + account only |

Tune **widths** in `app/app.css` `@theme`. Tune **row geometry** in `AppShell.tsx` / `UserAccountMenu.tsx`.
