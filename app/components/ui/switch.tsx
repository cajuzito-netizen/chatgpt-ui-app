import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from '~/lib/utils'

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none',
        'data-checked:bg-ink data-unchecked:bg-black/15',
        'dark:data-checked:bg-white dark:data-unchecked:bg-white/20',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'block size-5 rounded-full bg-white shadow transition-transform',
          'data-checked:translate-x-[22px] data-unchecked:translate-x-0.5',
          'dark:data-checked:bg-ink',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
