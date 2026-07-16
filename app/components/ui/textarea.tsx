import * as React from 'react'
import { cn } from '~/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-20 w-full resize-none rounded-xl border border-black/10 bg-transparent px-3 py-2 text-[15px]',
        'outline-none transition-colors',
        'placeholder:text-ink-tertiary',
        'focus:border-black/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-white/15 dark:placeholder:text-dark-ink-tertiary dark:focus:border-white/30',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
