import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from '~/lib/utils'

function Input({ className, type, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-xl border border-black/10 bg-transparent px-3 text-[15px]',
        'outline-none transition-colors',
        'placeholder:text-ink-tertiary',
        'focus:border-black/30',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-white/15 dark:placeholder:text-dark-ink-tertiary dark:focus:border-white/30',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
