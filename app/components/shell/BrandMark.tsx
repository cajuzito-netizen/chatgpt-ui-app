import { cn } from '~/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-6 w-6', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="16" r="2.2" />
      <circle cx="19" cy="16" r="2.2" />
      <path d="M10.2 6.5 6.8 14.2M13.8 6.5l3.4 7.7M7.2 16.8h9.6" />
    </svg>
  )
}
