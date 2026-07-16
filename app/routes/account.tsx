/**
 * Account settings — user-scoped (ChatGPT-like surface).
 * Entry: user menu → Profile / Preferences.
 * Workspace admin stays at /w/:id/settings.
 */
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
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

  function selectTab(next: Tab) {
    setTab(next)
    navigate(
      { pathname: `/w/${workspaceId}/account`, search: `?tab=${next}` },
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
      <Dialog open onOpenChange={(v) => !v && close()}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[min(540px,90vh)] w-full max-w-[640px] gap-0 overflow-hidden rounded-2xl p-0"
        >
          <DialogTitle className="sr-only">Account</DialogTitle>
          <aside className="flex w-[180px] shrink-0 flex-col border-e border-black/5 dark:border-white/10">
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
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Account
              </p>
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        disabled
                      >
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
                        displayName:
                          displayName.trim() || data.user.displayName,
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

                  <div className="rounded-xl border border-red-200/80 p-4 mt-4 dark:border-red-900/50">
                    <p className="text-[14px] font-medium">Delete account</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      Permanently remove your account and personal data.
                      Workspace data owned solely by you would need a product
                      policy later.
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
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
