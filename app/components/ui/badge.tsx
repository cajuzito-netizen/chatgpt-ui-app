import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-0.5 text-[12px] font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground',
        success:
          'bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200',
        warning:
          'bg-amber-500/15 text-amber-900 dark:bg-amber-500/20 dark:text-amber-100',
        destructive:
          'bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-200',
      },
    },
    defaultVariants: { variant: 'secondary' },
  },
)

function Badge({
  className,
  variant,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
