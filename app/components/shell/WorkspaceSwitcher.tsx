import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router'
import { Check, ChevronsUpDown, Plus, Settings } from 'lucide-react'
import { FreeUpgradeBadge, PlanBadge } from '~/components/shell/PlanBadge'
import {
  SIDEBAR_CHEVRON,
  SIDEBAR_FOOTER_ROW,
  SIDEBAR_FOOTER_WS_MARK,
} from '~/components/shell/footer-row'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { createWorkspace, setActiveWorkspace } from '~/lib/store'
import { useAppStore } from '~/lib/use-store'
import { cn } from '~/lib/utils'

/**
 * Same profile-card geometry as live ChatGPT user control.
 * Free is nested (pointer-events restored) for Upgrade.
 */
export function WorkspaceSwitcher({ open }: { open: boolean }) {
  const data = useAppStore()
  const navigate = useNavigate()
  const active = data.workspaces.find((w) => w.id === data.activeWorkspaceId)
  const [createOpen, setCreateOpen] = useState(false)
  const [name, setName] = useState('')
  const letter = (active?.name ?? 'W').slice(0, 1).toUpperCase()
  const plan = active?.plan ?? 'free'
  const workspaceId = active?.id ?? data.activeWorkspaceId

  function goWorkspace(id: string) {
    setActiveWorkspace(id)
    navigate(`/w/${id}`)
  }

  function openSettings() {
    if (!workspaceId) return
    navigate(`/w/${workspaceId}/settings?tab=general`)
  }

  function openUpgrade(e: SyntheticEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!workspaceId) return
    navigate(`/w/${workspaceId}/settings?tab=plan`)
  }

  function isolateFromMenu(e: SyntheticEvent) {
    e.stopPropagation()
  }

  function onCreate() {
    const ws = createWorkspace(name)
    setName('')
    setCreateOpen(false)
    navigate(`/w/${ws.id}`)
  }

  return (
    <>
      <DropdownMenu>
        {/*
          Native button always — stays a real control when the rail is collapsed.
          Label visibility is driven by sidebar data-state CSS (not remount/class thrash).
        */}
        <DropdownMenuTrigger
          className={cn(
            SIDEBAR_FOOTER_ROW,
            'group/ws pill-focus border-0 bg-transparent text-left outline-none',
            'hover:bg-black/[0.05] dark:hover:bg-white/10',
          )}
          aria-label={`Workspace: ${active?.name ?? 'Workspace'} (${plan})`}
          aria-haspopup="menu"
        >
          <span className={SIDEBAR_FOOTER_WS_MARK} aria-hidden>
            {letter}
          </span>
          <span
            className={cn(
              /* Visibility is CSS-only via [data-state] — avoids open-prop flash on load */
              'sidebar-label min-w-0 flex-1',
              open && 'sidebar-label--expanded',
            )}
          >
            {/*
              Single-line row so the name is vertically centered in the 52px card.
              Pro shows a second line under the name; Free uses trailing badge.
            */}
            <span className="flex min-w-0 items-center gap-2">
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate text-[14px] font-medium leading-5">
                  {active?.name ?? 'Workspace'}
                </span>
                {plan === 'pro' && (
                  <span className="block truncate text-[12px] leading-4 text-ink-secondary dark:text-dark-ink-secondary">
                    Pro
                  </span>
                )}
              </span>
              {plan === 'free' && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <FreeUpgradeBadge
                        aria-label="Upgrade workspace plan"
                        className="pointer-events-auto relative z-10"
                        onPointerDown={isolateFromMenu}
                        onMouseDown={isolateFromMenu}
                        onClick={openUpgrade}
                      />
                    }
                  />
                  <TooltipContent side="top" sideOffset={4}>
                    Upgrade
                  </TooltipContent>
                </Tooltip>
              )}
              <ChevronsUpDown className={SIDEBAR_CHEVRON} aria-hidden />
            </span>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-72">
          <DropdownMenuItem onClick={openSettings}>
            <Settings
              className="h-[18px] w-[18px] opacity-80"
              strokeWidth={1.5}
            />
            Workspace settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="mx-1.5 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-tertiary">
            Switch workspace
          </div>
          {data.workspaces.map((w) => {
            const isActive = w.id === data.activeWorkspaceId
            return (
              <DropdownMenuItem key={w.id} onClick={() => goWorkspace(w.id)}>
                <span className={SIDEBAR_FOOTER_WS_MARK}>
                  {w.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1 truncate">{w.name}</span>
                <PlanBadge plan={w.plan} />
                {isActive ? (
                  <Check className="h-4 w-4 shrink-0 opacity-70" />
                ) : (
                  <span className="inline-block h-4 w-4 shrink-0" aria-hidden />
                )}
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setCreateOpen(true)}>
            <Plus className="h-[18px] w-[18px] opacity-80" />
            New workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent showCloseButton className="max-w-sm">
          <DialogTitle>New workspace</DialogTitle>
          <p className="mt-1 text-[13px] text-ink-secondary dark:text-dark-ink-secondary">
            New workspaces start on Free. Upgrade anytime from Settings → Plan.
          </p>
          <div className="mt-4">
            <Input
              autoFocus
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onCreate()
              }}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onCreate}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
