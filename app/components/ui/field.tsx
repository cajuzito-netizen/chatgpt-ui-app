import { Field as FieldPrimitive } from '@base-ui/react/field'
import { cn } from '~/lib/utils'

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      className={cn('flex w-full flex-col items-stretch gap-1', className)}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        'text-[12px] font-medium text-ink-secondary dark:text-dark-ink-secondary',
        className,
      )}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn(
        'text-[12px] text-ink-tertiary dark:text-dark-ink-tertiary',
        className,
      )}
      {...props}
    />
  )
}

function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn('text-[12px] text-red-600 dark:text-red-400', className)}
      {...props}
    />
  )
}

function FieldControl({ className, ...props }: FieldPrimitive.Control.Props) {
  return (
    <FieldPrimitive.Control
      data-slot="field-control"
      className={cn(
        'flex h-11 w-full rounded-xl border border-black/10 bg-transparent px-3 text-[15px] outline-none',
        'placeholder:text-ink-tertiary focus:border-black/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-white/15 dark:placeholder:text-dark-ink-tertiary dark:focus:border-white/30',
        'data-invalid:border-red-400 dark:data-invalid:border-red-500',
        className,
      )}
      {...props}
    />
  )
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldControl }
