/**
 * OPTIONAL rail workspace control — not mounted by AppShell (magic: calm rail).
 * Kept for forks that want workspace under brand / in footer. See AGENTS.md.
 *
 * Current product: workspace switch lives in UserAccountMenu via WorkspaceMenuItems.
 */
import { type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router'
import { ChevronsUpDown } from 'lucide-react'
import { FreeUpgradeBadge, PlanBadge } from '~/components/shell/PlanBadge'
import {
  WS_MARK,
  WorkspaceMenuItems,
  useCreateWorkspaceDialog,
} from '~/components/shell/workspace-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useAppStore } from '~/lib/use-store'
import { cn } from '~/lib/utils'

const CHEVRON =
  'h-4 w-4 shrink-0 text-muted-foreground opacity-40 transition-opacity group-hover/ws:opacity-70'

/**
 * Layout rule: never nest interactive controls inside DropdownMenuTrigger.
 * Overlay trigger + Free chip above (z-20) when plan is free.
 */
export function WorkspaceSwitcher({
  open,
  menuSide = 'bottom',
}: {
  open: boolean
  menuSide?: 'top' | 'bottom'
}) {
  const data = useAppStore()
  const navigate = useNavigate()
  const active = data.workspaces.find((w) => w.id === data.activeWorkspaceId)
  const letter = (active?.name ?? 'W').slice(0, 1).toUpperCase()
  const plan = active?.plan ?? 'free'
  const workspaceId = active?.id ?? data.activeWorkspaceId
  const collapsed = !open
  const { openCreate, dialog } = useCreateWorkspaceDialog()

  function openUpgrade(e: SyntheticEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!workspaceId) return
    navigate(`/w/${workspaceId}/settings?tab=plan`)
  }

  return (
    <>
      <DropdownMenu>
        <div
          className={cn(
            'group/ws relative box-border flex h-12 min-h-12 cursor-pointer items-center overflow-hidden pointer-events-auto',
            'ml-2 mr-1.5 w-[calc(100%-0.875rem)] max-w-[calc(100%-0.875rem)]',
            'rounded-[10px] py-1.5 pr-1.5 pl-2',
            collapsed ? 'gap-0' : 'gap-2',
            'hover:bg-black/[0.05] dark:hover:bg-white/10',
          )}
        >
          <DropdownMenuTrigger
            nativeButton={false}
            render={
              <div
                className={cn(
                  'absolute inset-0 z-10 rounded-[inherit] outline-none',
                  'pill-focus cursor-pointer',
                )}
              />
            }
            aria-label={`Workspace: ${active?.name ?? 'Workspace'} (${plan})`}
            aria-haspopup="menu"
          />

          <span className={cn(WS_MARK, 'relative z-[11]')} aria-hidden>
            {letter}
          </span>

          <span
            className={cn(
              'relative z-[11] min-w-0 pointer-events-none',
              open
                ? 'flex-1 opacity-100'
                : 'w-0 max-w-0 min-w-0 flex-[0_0_0] overflow-hidden opacity-0',
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-left text-[14px] font-medium leading-5">
                {active?.name ?? 'Workspace'}
              </span>

              {plan === 'free' ? (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <FreeUpgradeBadge
                        aria-label="Upgrade workspace plan"
                        className="pointer-events-auto relative z-20"
                        onClick={openUpgrade}
                      />
                    }
                  />
                  <TooltipContent side="top" sideOffset={4}>
                    Upgrade
                  </TooltipContent>
                </Tooltip>
              ) : (
                <PlanBadge plan="pro" className="pointer-events-none" />
              )}

              <ChevronsUpDown
                className={cn(CHEVRON, 'pointer-events-none')}
                aria-hidden
              />
            </span>
          </span>
        </div>

        <DropdownMenuContent side={menuSide} align="start" className="w-72">
          <WorkspaceMenuItems onRequestCreate={openCreate} />
        </DropdownMenuContent>
      </DropdownMenu>
      {dialog}
    </>
  )
}
