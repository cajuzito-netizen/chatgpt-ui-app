/**
 * Switch — Base UI Root + Thumb. data-checked / data-unchecked for styles.
 * @see https://base-ui.com/react/components/switch
 */
import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from '~/lib/utils'

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  /** Local size convention (shadcn-compatible); not a Base UI prop. */
  size?: 'sm' | 'default'
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring/50',
        'data-checked:bg-primary data-unchecked:bg-input',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        'data-[size=default]:h-6 data-[size=default]:w-11',
        'data-[size=sm]:h-5 data-[size=sm]:w-9',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-background shadow transition-transform',
          'group-data-[size=default]/switch:size-5',
          'group-data-[size=sm]/switch:size-4',
          'group-data-[size=default]/switch:data-checked:translate-x-[22px]',
          'group-data-[size=default]/switch:data-unchecked:translate-x-0.5',
          'group-data-[size=sm]/switch:data-checked:translate-x-[18px]',
          'group-data-[size=sm]/switch:data-unchecked:translate-x-0.5',
          'dark:data-checked:bg-primary-foreground',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
