import type { InputHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-black/10 bg-transparent px-3 text-[15px] outline-none',
        'placeholder:text-ink-tertiary focus:border-black/30',
        'dark:border-white/15 dark:placeholder:text-dark-ink-tertiary',
        className,
      )}
      {...props}
    />
  )
}
