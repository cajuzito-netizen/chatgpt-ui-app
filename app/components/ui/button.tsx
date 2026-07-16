import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-ink text-white hover:bg-[#212121] dark:bg-white dark:text-ink',
        outline:
          'border border-black/15 bg-white text-ink hover:bg-[#f9f9f9] dark:border-white/15 dark:bg-transparent dark:text-white',
        ghost: 'hover:bg-black/5 dark:hover:bg-white/10',
        link: 'rounded-none text-link underline-offset-2 hover:underline',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-5',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
