import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { cn } from '~/lib/utils'

/**
 * shadcn-style Menu (dropdown) over Base UI.
 * Geometry tuned to ChatGPT profile/workspace menus.
 */
function Menu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="menu" {...props} />
}

function MenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />
}

function MenuPortal(props: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="menu-portal" {...props} />
}

function MenuContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    'side' | 'sideOffset' | 'align' | 'alignOffset'
  >) {
  return (
    <MenuPortal>
      <MenuPrimitive.Positioner
        data-slot="menu-positioner"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="z-50 outline-none"
      >
        <MenuPrimitive.Popup
          data-slot="menu-content"
          className={cn(
            'z-50 min-w-56 origin-[var(--transform-origin)] overflow-auto',
            'rounded-2xl border border-black/10 bg-white py-1.5 outline-none',
            'shadow-[0_8px_30px_rgba(0,0,0,0.12)]',
            'dark:border-white/10 dark:bg-dark-surface-secondary',
            'transition-[scale,opacity] duration-100 ease-out',
            'data-starting-style:scale-[0.98] data-starting-style:opacity-0',
            'data-ending-style:scale-[0.98] data-ending-style:opacity-0',
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPortal>
  )
}

function MenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      className={cn(
        'flex cursor-pointer items-center gap-1.5 mx-1.5 rounded-[10px]',
        'px-2.5 py-1.5 text-[14px] leading-5 outline-none select-none',
        'data-highlighted:bg-black/[0.04] dark:data-highlighted:bg-white/5',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

function MenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="menu-separator"
      className={cn(
        'my-1.5 mx-1.5 h-px bg-black/10 dark:bg-white/10',
        className,
      )}
      {...props}
    />
  )
}

function MenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="menu-group" {...props} />
}

function MenuGroupLabel({
  className,
  ...props
}: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-group-label"
      className={cn(
        'px-3.5 py-1.5 text-[12px] font-medium text-ink-tertiary',
        'dark:text-dark-ink-tertiary',
        className,
      )}
      {...props}
    />
  )
}

function MenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />
}

function MenuRadioItem({
  className,
  children,
  ...props
}: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      className={cn(
        'grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-2',
        'mx-1.5 rounded-[10px] px-2.5 py-1.5 text-[14px] leading-5 outline-none select-none',
        'data-highlighted:bg-black/[0.04] dark:data-highlighted:bg-white/5',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <MenuPrimitive.RadioItemIndicator className="col-start-1 flex size-4 items-center justify-center">
        <span className="size-1.5 rounded-full bg-ink dark:bg-white" />
      </MenuPrimitive.RadioItemIndicator>
      <span className="col-start-2">{children}</span>
    </MenuPrimitive.RadioItem>
  )
}

export {
  Menu,
  MenuTrigger,
  MenuPortal,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
  MenuRadioGroup,
  MenuRadioItem,
}
