/**
 * Workspace settings — admin for the current workspace only.
 * User/account prefs live at /w/:id/account.
 */
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  deleteWorkspace,
  getActiveWorkspaceId,
  renameWorkspace,
  setWorkspacePlan,
} from '~/lib/store'
import { closeOverlay } from '~/lib/navigation'
import { useAppStore } from '~/lib/use-store'
import { cn } from '~/lib/utils'

type Tab = 'general' | 'members' | 'plan' | 'danger'

function tabFromSearch(value: string | null): Tab {
  if (
    value === 'general' ||
    value === 'members' ||
    value === 'plan' ||
    value === 'danger'
  ) {
    return value
  }
  return 'general'
}

export default function WorkspaceSettingsRoute() {
  const navigate = useNavigate()
  const { workspaceId } = useParams()
  const [searchParams] = useSearchParams()
  const data = useAppStore()
  const ws = data.workspaces.find((w) => w.id === workspaceId)
  const [tab, setTab] = useState<Tab>(() =>
    tabFromSearch(searchParams.get('tab')),
  )
  const [wsName, setWsName] = useState(ws?.name ?? '')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteNote, setInviteNote] = useState<string | null>(null)

  useEffect(() => {
    setTab(tabFromSearch(searchParams.get('tab')))
  }, [searchParams])

  function selectTab(next: Tab) {
    setTab(next)
    navigate(
      { pathname: `/w/${workspaceId}/settings`, search: `?tab=${next}` },
      { replace: true },
    )
  }

  function close() {
    closeOverlay(navigate, workspaceId ?? data.activeWorkspaceId)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'members', label: 'Members' },
    { id: 'plan', label: 'Plan' },
    { id: 'danger', label: 'Danger zone' },
  ]

  const planLabel = ws?.plan === 'pro' ? 'Pro' : 'Free'

  return (
    <Dialog open onOpenChange={(v) => !v && close()}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[min(560px,90vh)] w-full max-w-[720px] gap-0 overflow-hidden rounded-2xl p-0"
      >
        <DialogTitle className="sr-only">Workspace settings</DialogTitle>
        <aside className="flex w-[200px] shrink-0 flex-col border-e border-black/5 dark:border-white/10">
          <div className="flex h-12 items-center px-2">
            <button
              type="button"
              onClick={close}
              className="pill-focus rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="px-3 pb-2">
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Workspace
            </p>
            <p className="truncate text-[13px] font-medium">{ws?.name}</p>
          </div>
          <nav className="flex-1 px-2 pb-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTab(t.id)}
                className={cn(
                  'mb-0.5 flex w-full rounded-lg px-2.5 py-2 text-left text-[13px]',
                  tab === t.id
                    ? 'bg-black/[0.06] font-medium dark:bg-white/10'
                    : 'hover:bg-black/[0.04] dark:hover:bg-white/5',
                )}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-black/5 px-6 py-4 dark:border-white/10">
            <h2 className="text-[16px] font-semibold">
              {tabs.find((t) => t.id === tab)?.label}
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-2">
            {tab === 'general' && (
              <div className="space-y-4 py-3">
                <div>
                  <Label>Workspace name</Label>
                  <Input
                    value={wsName}
                    onChange={(e) => setWsName(e.target.value)}
                  />
                  <Button
                    className="mt-2"
                    onClick={() => {
                      if (workspaceId) renameWorkspace(workspaceId, wsName)
                    }}
                  >
                    Save name
                  </Button>
                </div>
                <p className="text-[13px] text-muted-foreground">
                  Product-specific options (branding, defaults) can land here
                  later.
                </p>
              </div>
            )}

            {tab === 'members' && (
              <div className="space-y-4 py-3">
                <p className="text-[13px] text-muted-foreground">
                  Invite teammates to this workspace. Roles: owner, admin,
                  user (mock UI — full member model next).
                </p>
                <div>
                  <Label>Email</Label>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="teammate@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <Button
                      onClick={() => {
                        const e = inviteEmail.trim()
                        if (!e) return
                        setInviteNote(`Invite queued for ${e} (demo only).`)
                        setInviteEmail('')
                      }}
                    >
                      Invite
                    </Button>
                  </div>
                  {inviteNote && (
                    <p className="mt-2 text-[13px] text-muted-foreground">
                      {inviteNote}
                    </p>
                  )}
                </div>
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="flex items-center gap-2">
                      You
                      <Badge variant="secondary">Owner</Badge>
                    </CardTitle>
                    <CardDescription className="truncate">
                      {data.user.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2" />
                </Card>
              </div>
            )}

            {tab === 'plan' && (
              <div className="space-y-4 py-3">
                <Row
                  title="Current plan"
                  description={`This workspace is on ${planLabel}. Billing is per workspace.`}
                  right={<Badge variant="secondary">{planLabel}</Badge>}
                />
                {ws?.plan === 'free' ? (
                  <div className="rounded-xl border border-[#2c67c5]/30 bg-[#2c67c5]/[0.06] p-4">
                    <p className="text-[14px] font-medium">Upgrade to Pro</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      Demo toggle — wire Stripe (or similar) later.
                    </p>
                    <Button
                      className="mt-3"
                      onClick={() => {
                        if (workspaceId) setWorkspacePlan(workspaceId, 'pro')
                      }}
                    >
                      Upgrade workspace
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-xl border border-black/8 p-4 dark:border-white/10">
                    <p className="text-[14px] font-medium">Pro workspace</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      Downgrade keeps data; limits apply on next cycle (demo).
                    </p>
                    <Button
                      variant="outline"
                      className="mt-3"
                      onClick={() => {
                        if (workspaceId) setWorkspacePlan(workspaceId, 'free')
                      }}
                    >
                      Downgrade to Free
                    </Button>
                  </div>
                )}
              </div>
            )}

            {tab === 'danger' && (
              <div className="space-y-4 py-3">
                <div className="rounded-xl border border-black/8 p-4 dark:border-white/10">
                  <p className="text-[14px] font-medium">Transfer ownership</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Hand this workspace to another member. Invite someone first
                    (demo — transfer unlocks when members exist).
                  </p>
                  <Button variant="outline" className="mt-3" disabled>
                    Transfer ownership
                  </Button>
                </div>
                <div className="rounded-xl border border-red-200/80 p-4 dark:border-red-900/50">
                  <p className="text-[14px] font-medium">Delete workspace</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Permanently removes this workspace and its local data. You
                    must keep at least one workspace.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 border-red-300 text-red-600"
                    disabled={data.workspaces.length <= 1}
                    onClick={() => {
                      if (!workspaceId || data.workspaces.length <= 1) return
                      deleteWorkspace(workspaceId)
                      navigate(`/w/${getActiveWorkspaceId()}`)
                    }}
                  >
                    Delete workspace
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Row({
  title,
  description,
  right,
}: {
  title: string
  description?: string
  right: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-black/5 py-4 last:border-b-0 dark:border-white/10">
      <div className="min-w-0">
        <div className="text-[14px] font-medium">{title}</div>
        {description && (
          <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground ">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  )
}
