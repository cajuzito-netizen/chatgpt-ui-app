import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

/**
 * shadcn-style Button over Base UI.
 * Variants match ChatGPT-like chrome (pill primary, outline, ghost).
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-full text-sm font-medium transition-colors outline-none select-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
    'dark:focus-visible:outline-white',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-ink text-white hover:bg-[#212121] dark:bg-white dark:text-ink dark:hover:bg-white/90',
        outline:
          'border border-black/15 bg-white text-ink hover:bg-[#f9f9f9] dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10',
        secondary:
          'bg-black/[0.06] text-ink hover:bg-black/[0.1] dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
        ghost:
          'text-ink hover:bg-black/5 dark:text-white dark:hover:bg-white/10',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700',
        link: 'rounded-none text-link underline-offset-2 hover:underline dark:text-dark-link',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-5',
        icon: 'h-9 w-9',
        'icon-sm': 'h-8 w-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
