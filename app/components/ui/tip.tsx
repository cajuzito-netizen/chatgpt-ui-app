/**
 * App-level tooltip helper — always-dark ChatGPT-style chip.
 * Prefer this over raw Tooltip for shell icon labels.
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
  /* Keep tree stable so enable/disable does not remount children. */
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
          <kbd className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded bg-[#414141] text-[11px] font-medium text-[#afafaf]">
            {shortcut[0]}
          </kbd>
        ) : null}
        {shortcut && shortcut.length > 1 ? (
          <span className="ml-1 text-[12px] font-medium text-[#afafaf]">
            {shortcut.join(' + ')}
          </span>
        ) : null}
      </TooltipContent>
    </Tooltip>
  )
}

export { Tip }
