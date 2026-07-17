/**
 * Shared workspace menu pieces for account menu + optional WorkspaceSwitcher.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Check, Plus, Settings } from 'lucide-react'
import { PlanBadge } from '~/components/shell/PlanBadge'
import { DropdownMenuItem } from '~/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { createWorkspace, setActiveWorkspace } from '~/lib/store'
import { useAppStore } from '~/lib/use-store'

export const WS_MARK =
  'box-border flex size-6 shrink-0 items-center justify-center rounded-[3px] bg-black/10 text-[11px] font-semibold leading-none pointer-events-none dark:bg-white/15'

/** Menu items: settings, switch list, new workspace. Caller owns separators around. */
export function WorkspaceMenuItems({
  onRequestCreate,
}: {
  onRequestCreate: () => void
}) {
  const data = useAppStore()
  const navigate = useNavigate()
  const active = data.workspaces.find((w) => w.id === data.activeWorkspaceId)
  const workspaceId = active?.id ?? data.activeWorkspaceId

  function goWorkspace(id: string) {
    setActiveWorkspace(id)
    navigate(`/w/${id}`)
  }

  function openSettings() {
    if (!workspaceId) return
    navigate(`/w/${workspaceId}/settings?tab=general`)
  }

  return (
    <>
      <div className="mx-1.5 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Workspace
        {active?.name ? (
          <span className="mt-0.5 block truncate text-[12px] font-normal normal-case tracking-normal text-foreground">
            {active.name}
          </span>
        ) : null}
      </div>
      <DropdownMenuItem onClick={openSettings}>
        <Settings className="h-[18px] w-[18px] opacity-80" strokeWidth={1.5} />
        Workspace settings
      </DropdownMenuItem>
      {data.workspaces.map((w) => {
        const isActive = w.id === data.activeWorkspaceId
        return (
          <DropdownMenuItem key={w.id} onClick={() => goWorkspace(w.id)}>
            <span className={WS_MARK}>{w.name.slice(0, 1).toUpperCase()}</span>
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
      <DropdownMenuItem onClick={onRequestCreate}>
        <Plus className="h-[18px] w-[18px] opacity-80" />
        New workspace
      </DropdownMenuItem>
    </>
  )
}

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  function onCreate() {
    const ws = createWorkspace(name)
    setName('')
    onOpenChange(false)
    navigate(`/w/${ws.id}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/** Hook: create-dialog open state for menus that mount CreateWorkspaceDialog. */
export function useCreateWorkspaceDialog() {
  const [createOpen, setCreateOpen] = useState(false)
  return {
    createOpen,
    setCreateOpen,
    openCreate: () => setCreateOpen(true),
    dialog: (
      <CreateWorkspaceDialog open={createOpen} onOpenChange={setCreateOpen} />
    ),
  }
}
