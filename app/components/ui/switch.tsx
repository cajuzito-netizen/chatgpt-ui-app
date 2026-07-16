import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from '~/lib/utils'

export function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none',
        'data-checked:bg-[#2c67c5] data-unchecked:bg-black/15 dark:data-unchecked:bg-white/20',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'block size-5 rounded-full bg-white shadow transition-transform',
          'data-checked:translate-x-[22px] data-unchecked:translate-x-0.5',
        )}
      />
    </SwitchPrimitive.Root>
  )
}
