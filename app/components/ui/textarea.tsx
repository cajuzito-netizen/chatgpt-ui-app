/**
 * Textarea — plain element (Base UI has no Textarea primitive).
 * Tokenized to match Input for design consistency.
 */
import * as React from 'react'
import { cn } from '~/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-20 w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2 text-[15px]',
        'outline-none transition-colors',
        'placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
