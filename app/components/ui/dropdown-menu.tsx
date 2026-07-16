/**
 * Dropdown Menu — Base UI Menu parts under shadcn export names.
 * Animation uses Base UI data-starting-style / data-ending-style (docs), not animate-in.
 * @see https://base-ui.com/react/components/menu
 */
import * as React from 'react'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

const popupMotion =
  'origin-[var(--transform-origin)] transition-[opacity,transform] duration-100 ease-out data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-ending-style:scale-[0.98] data-ending-style:opacity-0'

function DropdownMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal(props: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return (
    <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
  )
}

function DropdownMenuContent({
  className,
  align = 'start',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            'z-50 max-h-[var(--available-height)] min-w-56 overflow-x-hidden overflow-y-auto',
            'rounded-2xl border border-border bg-popover py-1.5 text-popover-foreground',
            'shadow-[0_8px_30px_rgba(0,0,0,0.12)] outline-none',
            popupMotion,
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset || undefined}
      className={cn(
        'px-3.5 py-1.5 text-[12px] font-medium text-muted-foreground',
        'data-inset:pl-8',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset || undefined}
      data-variant={variant}
      className={cn(
        'relative flex cursor-pointer items-center gap-1.5 outline-none select-none',
        'mx-1.5 rounded-[10px] px-2.5 py-1.5 text-[14px] leading-5',
        /* Base UI highlight (keyboard + pointer) */
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'data-inset:pl-8',
        'data-[variant=destructive]:text-destructive',
        'data-[variant=destructive]:data-highlighted:bg-destructive/10',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset || undefined}
      className={cn(
        'flex cursor-default items-center gap-1.5 outline-none select-none',
        'mx-1.5 rounded-[10px] px-2.5 py-1.5 text-[14px]',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-popup-open:bg-accent data-popup-open:text-accent-foreground',
        'data-inset:pl-8',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4 opacity-60" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

/** Nested popup — Base UI submenu defaults (side right). */
function DropdownMenuSubContent({
  className,
  align = 'start',
  alignOffset = -3,
  side = 'right',
  sideOffset = 0,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn('min-w-[8rem]', className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset || undefined}
      className={cn(
        'relative flex cursor-pointer items-center gap-1.5 outline-none select-none',
        'mx-1.5 rounded-[10px] py-1.5 pr-8 pl-2.5 text-[14px]',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'data-inset:pl-8',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-3.5" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset || undefined}
      className={cn(
        'relative flex cursor-pointer items-center gap-1.5 outline-none select-none',
        'mx-1.5 rounded-[10px] py-1.5 pr-8 pl-2.5 text-[14px]',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'data-inset:pl-8',
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon className="size-3.5" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('my-1.5 mx-1.5 h-px bg-border', className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
