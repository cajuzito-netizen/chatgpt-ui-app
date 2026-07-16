/**
 * Field — Base UI labeling + validation group.
 * Prefer this over bare Label+Input when building login/invite forms.
 * @see https://base-ui.com/react/components/field
 */
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
        'text-[12px] font-medium text-muted-foreground',
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
      className={cn('text-[12px] text-muted-foreground', className)}
      {...props}
    />
  )
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn('text-[12px] text-destructive', className)}
      {...props}
    />
  )
}

function FieldControl({ className, ...props }: FieldPrimitive.Control.Props) {
  return (
    <FieldPrimitive.Control
      data-slot="field-control"
      className={cn(
        'flex h-11 w-full rounded-xl border border-input bg-transparent px-3 text-[15px] outline-none',
        'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldControl }
