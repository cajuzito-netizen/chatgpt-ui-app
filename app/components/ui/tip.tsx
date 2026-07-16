/**
 * App-level tooltip helper — always-dark ChatGPT-style chip.
 * Agents should use this, not invent portal tooltips.
 */
import type { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

export type TipSide = 'top' | 'bottom' | 'left' | 'right'

export function Tip({
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
  /*
   * Always keep the same tree so enable/disable doesn’t remount children
   * (sidebar collapse was remounting brand/nav icons and causing flicker).
   */
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
        {shortcut && shortcut.length === 1 && (
          <kbd className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded bg-[#414141] text-[11px] font-medium text-[#afafaf]">
            {shortcut[0]}
          </kbd>
        )}
        {shortcut && shortcut.length > 1 && (
          <span className="ml-1 text-[12px] font-medium text-[#afafaf]">
            {shortcut.join(' + ')}
          </span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
