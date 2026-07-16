/**
 * Tooltip — Base UI Provider / Root / Trigger / Portal / Positioner / Popup.
 * @see https://base-ui.com/react/components/tooltip
 */
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { cn } from '~/lib/utils'

function TooltipProvider({
  delay = 400,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    'side' | 'sideOffset' | 'align' | 'alignOffset'
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        data-slot="tooltip-positioner"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="isolate z-[200]"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            'z-[200] inline-flex w-fit max-w-xs origin-[var(--transform-origin)]',
            'items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-1',
            'text-[12px] font-semibold text-background shadow-sm outline-none',
            'transition-[opacity,transform] duration-100 ease-out',
            'data-starting-style:scale-95 data-starting-style:opacity-0',
            'data-ending-style:scale-95 data-ending-style:opacity-0',
            className,
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
