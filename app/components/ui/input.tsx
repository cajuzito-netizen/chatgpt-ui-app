/**
 * Input — Base UI Input (Field-aware).
 * External surface: className + native input props (shadcn usage).
 * @see https://base-ui.com/react/components/input
 */
import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from '~/lib/utils'

function Input({ className, type, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-xl border border-input bg-transparent px-3 text-[15px]',
        'outline-none transition-colors',
        'file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        'placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20',
        'data-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
