import type { ComponentProps } from 'react'
import { cn } from '~/lib/utils'

/**
 * Simple form label (shadcn-style). For Field-bound validation labels,
 * use FieldLabel from `~/components/ui/field`.
 */
function Label({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'mb-1 block text-[12px] font-medium text-ink-secondary',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        'dark:text-dark-ink-secondary',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
