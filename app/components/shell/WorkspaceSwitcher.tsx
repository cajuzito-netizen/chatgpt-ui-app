import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router'
import { Check, ChevronsUpDown, Plus, Settings } from 'lucide-react'
import { FreeUpgradeBadge, PlanBadge } from '~/components/shell/PlanBadge'
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

const WS_MARK =
  'box-border flex size-6 shrink-0 items-center justify-center rounded-md bg-black/10 text-[11px] font-semibold leading-none pointer-events-none dark:bg-white/15'

const CHEVRON =
  'h-4 w-4 shrink-0 text-muted-foreground opacity-40 transition-opacity group-hover/ws:opacity-70 group-hover/profile:opacity-70'

/**
 * Workspace switcher — primary context under brand (shell option B).
 *
 * Layout rule: never nest interactive controls inside DropdownMenuTrigger.
 * The trigger is an absolute <div> overlay; the Free upgrade chip sits above
 * it with pointer-events so Free/Pro share the same single-line chrome.
 */
export function WorkspaceSwitcher({
  open,
  menuSide = 'bottom',
}: {
  open: boolean
  /** Menu opens below when under brand; use "top" if ever placed in the footer. */
  menuSide?: 'top' | 'bottom'
}) {
  const data = useAppStore()
  const navigate = useNavigate()
  const active = data.workspaces.find((w) => w.id === data.activeWorkspaceId)
  const [createOpen, setCreateOpen] = useState(false)
  const [name, setName] = useState('')
  const letter = (active?.name ?? 'W').slice(0, 1).toUpperCase()
  const plan = active?.plan ?? 'free'
  const workspaceId = active?.id ?? data.activeWorkspaceId
  const collapsed = !open

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
          Outer row is layout only (not a button).
          Menu trigger = full-size absolute div (role=button via Base UI).
          Free chip sits above (z-20) with its own clicks.
        */}
        <div
          className={cn(
            'group/ws relative box-border flex h-12 min-h-10 cursor-pointer items-center overflow-hidden pointer-events-auto',
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
          <DropdownMenuItem onClick={openSettings}>
            <Settings
              className="h-[18px] w-[18px] opacity-80"
              strokeWidth={1.5}
            />
            Workspace settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="mx-1.5 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Switch workspace
          </div>
          {data.workspaces.map((w) => {
            const isActive = w.id === data.activeWorkspaceId
            return (
              <DropdownMenuItem key={w.id} onClick={() => goWorkspace(w.id)}>
                <span className={WS_MARK}>
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
          <p className="mt-1 text-[13px] text-muted-foreground">
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
