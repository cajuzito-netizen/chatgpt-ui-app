import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { cn } from '~/lib/utils'

export function TooltipProvider({
  delay = 400,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider delay={delay} {...props} />
}

export function Tooltip(props: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root {...props} />
}

export function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger {...props} />
}

export function TooltipContent({
  className,
  side = 'bottom',
  sideOffset = 4,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, 'side' | 'sideOffset'>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        className="z-[200]"
      >
        <TooltipPrimitive.Popup
          className={cn(
            'z-[200] inline-flex items-center gap-1 rounded-lg border border-white/5 bg-[#1b1b1b] px-2 py-1 text-[12px] font-semibold text-white',
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
