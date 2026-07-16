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
| Profile row | h≈52, min 40, m 0 6 0 8, p 6 6 6 8, gap 8, r 10 | `h-12` (48, nearest scale), `min-h-10`, `ml-2 mr-1.5`, `pt-1.5 pr-1.5 pb-1.5 pl-2`, `gap-2` |
| Avatar | 24px | `size-6` |
| Footer gap | 6px | `pb-1.5` / rule `my-1.5` |
| Brand header | ~52 tall; first nav ≈ y:60 | `h-12` + `h-2` spacer |

Tune **widths** in `app/app.css` `@theme`. Tune **row geometry** in shell components (`AppShell.tsx`, `WorkspaceSwitcher.tsx`, `UserAccountMenu.tsx`).
