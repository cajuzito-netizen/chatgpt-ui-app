/**
 * Account settings — user-scoped (ChatGPT-like surface).
 * Entry: user menu → Profile / Preferences.
 * Workspace admin stays at /w/:id/settings.
 */
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { OverlayDialogLayout } from '~/components/shell/overlay-dialog'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { updateUser } from '~/lib/store'
import { closeOverlay } from '~/lib/navigation'
import type { AppData } from '~/lib/types'
import { useAppStore } from '~/lib/use-store'
import { cn } from '~/lib/utils'

type Tab = 'profile' | 'preferences'

function tabFromSearch(value: string | null): Tab {
  if (value === 'profile' || value === 'preferences') return value
  return 'profile'
}

const THEMES: { id: AppData['user']['theme']; label: string }[] = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
]

export default function AccountSettingsRoute() {
  const navigate = useNavigate()
  const { workspaceId } = useParams()
  const [searchParams] = useSearchParams()
  const data = useAppStore()
  const [tab, setTab] = useState<Tab>(() =>
    tabFromSearch(searchParams.get('tab')),
  )
  const [displayName, setDisplayName] = useState(data.user.displayName)
  const [username, setUsername] = useState(data.user.username)
  const [language, setLanguage] = useState(data.user.preferredLanguage)
  const [theme, setTheme] = useState(data.user.theme)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    setTab(tabFromSearch(searchParams.get('tab')))
  }, [searchParams])

  function selectTab(next: string) {
    const t = tabFromSearch(next)
    setTab(t)
    navigate(
      { pathname: `/w/${workspaceId}/account`, search: `?tab=${t}` },
      { replace: true },
    )
  }

  function close() {
    closeOverlay(navigate, workspaceId ?? data.activeWorkspaceId)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'preferences', label: 'Preferences' },
  ]

  const initials =
    data.user.displayName
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('') || 'U'

  return (
    <>
      <OverlayDialogLayout
        title="Account"
        sidebarEyebrow="Account"
        tabs={tabs}
        activeTab={tab}
        onTabChange={selectTab}
        onClose={close}
        className="h-[min(540px,90vh)] max-w-[640px]"
        asideClassName="w-[180px]"
      >
        {tab === 'profile' && (
          <div className="space-y-4 py-3">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-[18px] font-medium text-white">
                {initials}
              </span>
              <div>
                <p className="text-[14px] font-medium">Avatar</p>
                <p className="text-[12px] text-muted-foreground">
                  Photo upload later — initials for now.
                </p>
                <Button variant="outline" size="sm" className="mt-2" disabled>
                  Change photo
                </Button>
              </div>
            </div>
            <div>
              <Label>Display name</Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <Label>Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={data.user.email} disabled />
              <p className="mt-1 text-[12px] text-muted-foreground">
                Email change belongs in a later auth flow.
              </p>
            </div>
            <Button
              onClick={() =>
                updateUser({
                  displayName: displayName.trim() || data.user.displayName,
                  username: username.trim() || data.user.username,
                })
              }
            >
              Save profile
            </Button>
          </div>
        )}

        {tab === 'preferences' && (
          <div className="space-y-1 py-1">
            <div className="flex items-start justify-between gap-6 border-b border-black/5 py-4 dark:border-white/10">
              <div className="min-w-0">
                <div className="text-[14px] font-medium">Color scheme</div>
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  Light, dark, or match the system.
                </p>
              </div>
              <div className="flex shrink-0 gap-1 rounded-full border border-black/10 p-0.5 dark:border-white/15">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTheme(t.id)
                      updateUser({ theme: t.id })
                    }}
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[12px] font-medium',
                      theme === t.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-between gap-6 border-b border-black/5 py-4 dark:border-white/10">
              <div className="min-w-0">
                <div className="text-[14px] font-medium">Language</div>
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  Preferred UI language (demo).
                </p>
              </div>
              <Select
                value={language}
                onValueChange={(v) => {
                  if (!v) return
                  setLanguage(v)
                  updateUser({ preferredLanguage: v })
                }}
              >
                <SelectTrigger size="sm" className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 rounded-xl border border-red-200/80 p-4 dark:border-red-900/50">
              <p className="text-[14px] font-medium">Delete account</p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Permanently remove your account and personal data. Workspace
                data owned solely by you would need a product policy later.
              </p>
              <Button
                variant="outline"
                className="mt-3 border-red-300 text-red-600"
                onClick={() => setDeleteOpen(true)}
              >
                Delete account
              </Button>
            </div>
          </div>
        )}
      </OverlayDialogLayout>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogTitle className="text-left text-[18px] font-semibold">
            Delete account?
          </AlertDialogTitle>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Demo only — nothing is deleted yet. Wire this to your auth backend
            when ready.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:text-white"
              onClick={() => setDeleteOpen(false)}
            >
              Delete account
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
