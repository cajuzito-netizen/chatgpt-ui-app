/**
 * App helper on top of Tooltip (not a Base UI part).
 * Renders trigger as <span> via Base UI `render` so shell icons aren't nested buttons.
 */
import type { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

export type TipSide = 'top' | 'bottom' | 'left' | 'right'

function Tip({
  content,
  shortcut,
  side = 'bottom',
  disabled,
  className,
  children,
}: {
  content: string
  shortcut?: string[]
  side?: TipSide
  disabled?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <Tooltip disabled={disabled}>
      <TooltipTrigger
        className={cn('inline-flex max-w-full', className)}
        render={<span />}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} sideOffset={4}>
        <span>{content}</span>
        {shortcut && shortcut.length === 1 ? (
          <kbd
            data-slot="kbd"
            className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded bg-background/15 px-0.5 text-[11px] font-medium text-background/70"
          >
            {shortcut[0]}
          </kbd>
        ) : null}
        {shortcut && shortcut.length > 1 ? (
          <span className="ml-1 text-[12px] font-medium text-background/70">
            {shortcut.join(' + ')}
          </span>
        ) : null}
      </TooltipContent>
    </Tooltip>
  )
}

export { Tip }
