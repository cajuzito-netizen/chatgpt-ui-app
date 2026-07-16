import { Select as SelectPrimitive } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '~/lib/utils'

function Select<Value = string, Multiple extends boolean | undefined = false>(
  props: SelectPrimitive.Root.Props<Value, Multiple>,
) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup(props: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        'data-placeholder:text-ink-tertiary dark:data-placeholder:text-dark-ink-tertiary',
        className,
      )}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  children,
  size = 'default',
  ...props
}: SelectPrimitive.Trigger.Props & { size?: 'sm' | 'default' }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        'flex w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-black/10 bg-transparent px-3 text-[14px] outline-none select-none',
        'hover:bg-black/[0.02] focus-visible:border-black/30',
        'dark:border-white/15 dark:hover:bg-white/5 dark:focus-visible:border-white/30',
        'data-popup-open:border-black/30 dark:data-popup-open:border-white/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[size=default]:h-11 data-[size=sm]:h-9 data-[size=sm]:text-[13px]',
        '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:opacity-60',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="size-4 opacity-60" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, 'side' | 'sideOffset' | 'alignItemWithTrigger'>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        data-slot="select-positioner"
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            'z-50 min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-hidden',
            'rounded-xl border border-black/10 bg-white py-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] outline-none',
            'dark:border-white/10 dark:bg-dark-surface-secondary',
            'transition-[scale,opacity] duration-100',
            'data-starting-style:scale-[0.98] data-starting-style:opacity-0',
            'data-ending-style:scale-[0.98] data-ending-style:opacity-0',
            className,
          )}
          {...props}
        >
          <SelectPrimitive.List className="max-h-[min(20rem,var(--available-height))] overflow-y-auto py-0.5">
            {children}
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'px-3 py-1.5 text-[12px] font-medium text-ink-tertiary',
        className,
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-pointer items-center gap-2 rounded-lg py-2 pr-8 pl-2.5 text-[14px] outline-none select-none',
        'mx-1 max-w-[calc(100%-0.5rem)]',
        'data-highlighted:bg-black/[0.04] dark:data-highlighted:bg-white/5',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center">
        <Check className="size-3.5" strokeWidth={2.25} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('my-1 h-px bg-black/10 dark:bg-white/10', className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
