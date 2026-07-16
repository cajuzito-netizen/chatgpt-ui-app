import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import type { WorkspacePlan } from '~/lib/types'
import { cn } from '~/lib/utils'

const base =
  'inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide'

const freeCls =
  'bg-black/[0.06] text-ink-tertiary dark:bg-white/10 dark:text-dark-ink-tertiary'
const proCls =
  'bg-[#2c67c5]/12 text-[#2c67c5] dark:bg-[#2c67c5]/20 dark:text-[#7ab7ff]'

/**
 * Workspace plan chip. Always show Free or Pro — billing is per workspace.
 */
export function PlanBadge({
  plan,
  className,
}: {
  plan: WorkspacePlan
  className?: string
}) {
  const isPro = plan === 'pro'
  return (
    <span className={cn(base, isPro ? proCls : freeCls, className)}>
      {isPro ? 'Pro' : 'Free'}
    </span>
  )
}

/**
 * Clickable Free badge → upgrade.
 * Renders a <span role="button"> (not <button>) so it can sit inside MenuTrigger
 * without nested-button DOM thrash / load flicker.
 */
export const FreeUpgradeBadge = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function FreeUpgradeBadge({ className, onClick, onKeyDown, ...props }, ref) {
  function handleKeyDown(e: KeyboardEvent<HTMLSpanElement>) {
    onKeyDown?.(e)
    if (e.defaultPrevented) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(e as unknown as MouseEvent<HTMLSpanElement>)
    }
  }

  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      className={cn(
        base,
        freeCls,
        'pointer-events-auto cursor-pointer transition-colors select-none',
        'hover:bg-[#2c67c5]/12 hover:text-[#2c67c5]',
        'dark:hover:bg-[#2c67c5]/20 dark:hover:text-[#7ab7ff]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2c67c5]',
        className,
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      Free
    </span>
  )
})
