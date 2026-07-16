/**
 * Protected shell geometry as Tailwind class strings.
 * Sizes come from app/app.css @theme tokens — tune there, not here.
 *
 * Live chatgpt.com metrics (Patchright 2026-07-16):
 *   Sidebar 260, rail 52, border-e 1px
 *   Nav h36 m 0/6 p 6/10 gap 6 radius 10
 *   Profile h52 m 0/6/0/8 p 6/6/6/8 gap 8 radius 10 avatar 24
 */
import { cn } from '~/lib/utils'

/** Desktop rail / open panel shell (content-box so border sits outside 260/52). */
export const SHELL_ASIDE = cn(
  'box-content z-40 flex h-full shrink-0 flex-col overflow-hidden',
  'border-0 border-r bg-surface dark:bg-dark-surface',
  'border-r-(length:--sidebar-divider)',
  'border-r-(--sidebar-divider-color) dark:border-r-(--sidebar-divider-color-dark)',
)

/** Width transition only after first paint (pass shellReady). */
export function shellAsideMotion(ready: boolean) {
  return ready
    ? 'transition-[width] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[width] motion-reduce:transition-none motion-reduce:duration-[0.01ms]'
    : undefined
}

/** Close control cluster — hidden when rail collapsed. */
export function shellChromeClass(open: boolean, ready: boolean) {
  return cn(
    'ms-auto flex shrink-0 items-center gap-0.5',
    open ? 'opacity-100' : 'opacity-0',
    !open && 'pointer-events-none',
    ready &&
      'transition-opacity duration-150 ease-linear motion-reduce:duration-[0.01ms]',
    ready &&
      open &&
      'duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
  )
}

/**
 * Text/name column: collapsed → zero width (icons stay put).
 * Expanded → visible. Opacity is immediate; transition only when ready.
 */
export function shellLabelClass(
  open: boolean,
  ready = true,
  extra?: string,
) {
  return cn(
    'min-w-0',
    open
      ? 'flex-1 opacity-100'
      : 'pointer-events-none w-0 max-w-0 min-w-0 flex-[0_0_0] overflow-hidden opacity-0',
    ready &&
      'transition-opacity duration-150 ease-linear motion-reduce:duration-[0.01ms]',
    ready &&
      open &&
      'duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
    extra,
  )
}

export const SHELL_NAV = 'relative z-10 flex min-h-0 flex-1 flex-col gap-(--nav-stack-gap) overflow-y-auto overflow-x-hidden'

export function shellNavItemClass(collapsed: boolean) {
  return cn(
    'box-border flex h-(--nav-h) min-h-(--nav-h) items-center overflow-hidden',
    'w-[calc(100%-2*var(--nav-mx))] max-w-[calc(100%-2*var(--nav-mx))] mx-(--nav-mx)',
    'rounded-[length:var(--nav-radius)] py-(--nav-py) px-(--nav-px)',
    'text-left text-[14px] font-normal leading-5',
    collapsed ? 'gap-0' : 'gap-(--nav-gap)',
  )
}

export const SHELL_NAV_ICON = cn(
  'box-border flex size-(--nav-icon) shrink-0 items-center justify-center pointer-events-none',
  '[&_svg]:block [&_svg]:size-(--nav-icon) [&_svg]:shrink-0',
)

export const SHELL_FOOTER = cn(
  'relative z-10 mt-auto flex shrink-0 flex-col gap-0 pt-0 pb-(--footer-gap)',
)

export const SHELL_RULE = cn(
  'box-border h-0 w-auto shrink-0 border-0 border-t border-black/[0.06] pointer-events-none',
  'mx-(--nav-mx) my-1.5',
  'dark:border-white/10',
)

/** Rules inside footer: equal gap above/below via footer token. */
export const SHELL_FOOTER_RULE = cn(
  SHELL_RULE,
  'my-0 mt-(--footer-gap) mb-(--footer-gap)',
)

export function shellFooterRowClass(collapsed: boolean) {
  return cn(
    'group box-border flex cursor-pointer items-center overflow-hidden pointer-events-auto',
    'h-(--profile-h) min-h-(--profile-min-h)',
    'w-[calc(100%-var(--profile-ml)-var(--profile-mr))] max-w-[calc(100%-var(--profile-ml)-var(--profile-mr))]',
    'ml-(--profile-ml) mr-(--profile-mr)',
    'rounded-[length:var(--profile-radius)]',
    'pt-(--profile-pt) pr-(--profile-pr) pb-(--profile-pb) pl-(--profile-pl)',
    collapsed ? 'gap-0' : 'gap-(--profile-gap)',
  )
}

export const SHELL_AVATAR = cn(
  'box-border block size-(--profile-avatar) shrink-0 rounded-full object-cover',
  'text-center text-[11px] font-medium leading-(--profile-avatar) pointer-events-none',
)

export const SHELL_AVATAR_INITIALS =
  'flex items-center justify-center leading-none'

export const SHELL_WS_MARK = cn(
  'box-border flex size-(--profile-avatar) shrink-0 items-center justify-center',
  'rounded-md bg-black/10 text-[11px] font-semibold leading-none pointer-events-none',
  'dark:bg-white/15',
)

export const SHELL_CHEVRON =
  'h-4 w-4 shrink-0 text-ink-tertiary opacity-40 transition-opacity group-hover/ws:opacity-70 group-hover/profile:opacity-70 dark:text-dark-ink-tertiary'

/* ---- Back-compat aliases used by footer menus ---- */
export const SIDEBAR_FOOTER_ROW = shellFooterRowClass(false)
export const SIDEBAR_FOOTER_AVATAR = SHELL_AVATAR
export const SIDEBAR_FOOTER_WS_MARK = SHELL_WS_MARK
export const SIDEBAR_CHEVRON = SHELL_CHEVRON
export const SIDEBAR_NAV_ITEM = shellNavItemClass(false)
