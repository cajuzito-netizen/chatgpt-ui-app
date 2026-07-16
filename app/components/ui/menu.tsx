import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { cn } from '~/lib/utils'

export function Menu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root {...props} />
}

export function MenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger {...props} />
}

/**
 * Live chatgpt.com dropdown (profile menu, 2026-07-16 Patchright):
 *   popup: rounded-2xl (16px), py-1.5 (6px 0), white surface
 *   item:  margin 0 6px, padding 6px 10px, radius 10px, h≈36
 *   hover: rgba(0,0,0,0.04–0.05) — radius + mx so first/last follow menu shape
 */
export function MenuContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, 'side' | 'sideOffset' | 'align'>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="z-50 outline-none"
      >
        <MenuPrimitive.Popup
          className={cn(
            'z-50 min-w-56 overflow-auto rounded-2xl border border-black/10',
            'bg-white py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] outline-none',
            'dark:border-white/10 dark:bg-dark-surface-secondary',
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

export function MenuItem({
  className,
  ...props
}: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      className={cn(
        /* Live __menu-item: m 0 6px, p 6 10, r 10 — hover follows menu corners */
        'flex cursor-pointer items-center gap-1.5 mx-1.5 rounded-[10px]',
        'px-2.5 py-1.5 text-[14px] leading-5 outline-none select-none',
        'data-highlighted:bg-black/[0.04] dark:data-highlighted:bg-white/5',
        className,
      )}
      {...props}
    />
  )
}

export function MenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      className={cn(
        /* Inset like items so the rule doesn’t kiss the rounded edges */
        'my-1.5 mx-1.5 h-px bg-black/10 dark:bg-white/10',
        className,
      )}
      {...props}
    />
  )
}
