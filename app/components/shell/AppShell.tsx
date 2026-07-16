/**
 * PROTECTED SHELL — familiar sidebar chrome for product apps.
 * Desktop: collapsible rail (tokens in app.css). Mobile: ui/drawer.
 * See AGENTS.md.
 */
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import { Menu as MenuIcon, PanelLeft, Sparkles, X } from 'lucide-react'
import { BrandMark } from '~/components/shell/BrandMark'
import {
  SHELL_ASIDE,
  SHELL_FOOTER,
  SHELL_FOOTER_RULE,
  SHELL_NAV,
  SHELL_NAV_ICON,
  shellAsideMotion,
  shellChromeClass,
  shellLabelClass,
  shellNavItemClass,
} from '~/components/shell/shell-classes'
import { SupportDialog } from '~/components/shell/SupportDialog'
import { UserAccountMenu } from '~/components/shell/UserAccountMenu'
import { WorkspaceSwitcher } from '~/components/shell/WorkspaceSwitcher'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '~/components/ui/drawer'
import { Tip } from '~/components/ui/tip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import {
  isNavActive,
  navHref,
  PRODUCT_NAV,
} from '~/lib/nav-config'
import {
  getActiveWorkspaceId,
  setActiveWorkspace,
  setSidebarDesktopOpen,
  setSidebarMobileOpen,
} from '~/lib/store'
import { useAppStore } from '~/lib/use-store'
import { cn } from '~/lib/utils'

const ICON_BTN =
  'pill-focus flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink hover:bg-black/[0.07] dark:text-white dark:hover:bg-white/10'

const MD_MIN = 768

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(min-width: ${MD_MIN}px)`).matches
      : true,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MD_MIN}px)`)
    const onChange = () => setDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desktop
}

type ShellChromeProps = {
  open: boolean
  isDesktop: boolean
  shellReady: boolean
  workspaceId: string
  labelsOpen: boolean
  railCollapsed: boolean
  settingsOrAccount: boolean
  initials: string
  displayName: string
  email: string
  onNavigateHome: () => void
  onClose: () => void
  onOpen: () => void
  onCloseMobile: () => void
  onProfile: () => void
  onPreferences: () => void
  onSupport: () => void
  onLogout: () => void
}

function ShellChrome({
  open,
  isDesktop,
  shellReady,
  workspaceId,
  labelsOpen,
  railCollapsed,
  settingsOrAccount,
  initials,
  displayName,
  email,
  onNavigateHome,
  onClose,
  onOpen,
  onCloseMobile,
  onProfile,
  onPreferences,
  onSupport,
  onLogout,
}: ShellChromeProps) {
  const location = useLocation()

  return (
    <>
      {railCollapsed && (
        <button
          type="button"
          aria-label="Open sidebar"
          className="absolute inset-y-0 -right-1 z-30 w-3 cursor-e-resize border-0 bg-transparent p-0"
          onClick={onOpen}
        />
      )}

      {/*
        Live: open control at (8,8) 36×36 — ~8px from edges.
        Keep one brand node always mounted so collapse doesn’t remount/flicker icons.
      */}
      <div className="relative flex h-13 shrink-0 items-center px-2 pt-2">
        <Tip content="Open sidebar" side="right" disabled={!railCollapsed}>
          <button
            type="button"
            className={cn(
              ICON_BTN,
              'group/brand relative z-10 shrink-0',
              railCollapsed ? 'cursor-e-resize' : 'hover:bg-transparent',
            )}
            aria-label={railCollapsed ? 'Open sidebar' : 'Home'}
            onClick={() => {
              if (railCollapsed) {
                onOpen()
                return
              }
              onNavigateHome()
            }}
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <BrandMark
                className={cn(
                  'pointer-events-none h-6 w-6 opacity-90 transition-opacity duration-150',
                  railCollapsed &&
                    'group-hover/brand:opacity-0 group-focus-visible/brand:opacity-0',
                )}
              />
              {isDesktop && (
                <PanelLeft
                  className={cn(
                    'pointer-events-none absolute h-5 w-5 transition-opacity duration-150',
                    railCollapsed
                      ? 'opacity-0 group-hover/brand:opacity-100 group-focus-visible/brand:opacity-100'
                      : 'opacity-0',
                  )}
                  strokeWidth={1.5}
                  aria-hidden
                />
              )}
            </span>
          </button>
        </Tip>

        <div className={shellChromeClass(open, shellReady)}>
          {!isDesktop && (
            <button
              type="button"
              className={ICON_BTN}
              aria-label="Close menu"
              onClick={onClose}
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
          {isDesktop && (
            <Tip content="Close sidebar" side="right">
              <button
                type="button"
                className={cn(
                  ICON_BTN,
                  'cursor-w-resize text-ink-tertiary hover:bg-black/[0.07] hover:text-ink-tertiary',
                )}
                onClick={onClose}
                aria-label="Close sidebar"
                tabIndex={open ? 0 : -1}
              >
                <PanelLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </Tip>
          )}
        </div>
      </div>

      {/* Live: first nav ≈ y:60 → header h-13 (52) + 8px spacer */}
      <div className="h-2 shrink-0" aria-hidden />

      <nav className={SHELL_NAV}>
        {PRODUCT_NAV.map((item) => {
          const Icon = item.icon
          const hideRow = railCollapsed && !item.onRail
          const href = navHref(workspaceId, item.path)
          const active = isNavActive(location.pathname, workspaceId, item, {
            settingsOrAccount,
          })

          return (
            <Link
              key={item.id}
              to={href}
              onClick={onCloseMobile}
              className={cn(
                shellNavItemClass(railCollapsed),
                hideRow &&
                  'pointer-events-none !m-0 !h-0 !max-h-0 !overflow-hidden !p-0 !opacity-0',
                labelsOpen &&
                  (active
                    ? 'bg-black/[0.05] dark:bg-white/10'
                    : 'hover:bg-black/[0.05] dark:hover:bg-white/10'),
              )}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              tabIndex={hideRow ? -1 : 0}
            >
              <span className={cn(SHELL_NAV_ICON, 'opacity-80')} aria-hidden>
                <Icon strokeWidth={1.5} />
              </span>
              <span className={shellLabelClass(labelsOpen, shellReady, 'truncate')}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className={SHELL_FOOTER}>
        <hr className={SHELL_FOOTER_RULE} />
        <WorkspaceSwitcher open={labelsOpen} />
        <hr className={SHELL_FOOTER_RULE} />
        <UserAccountMenu
          open={labelsOpen}
          displayName={displayName}
          email={email}
          initials={initials}
          onProfile={onProfile}
          onPreferences={onPreferences}
          onSupport={onSupport}
          onLogout={onLogout}
        />
      </div>
    </>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const data = useAppStore()
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const isDesktop = useIsDesktop()

  const workspaceId = params.workspaceId ?? data.activeWorkspaceId
  const workspace = data.workspaces.find((w) => w.id === workspaceId)
  const workspaceMissing =
    Boolean(params.workspaceId) &&
    !data.workspaces.some((w) => w.id === params.workspaceId)

  /**
   * Independent open state per breakpoint so resizing desktop→mobile
   * does not leave a full drawer open (and vice versa).
   */
  const open = isDesktop
    ? data.ui.sidebarDesktopOpen
    : data.ui.sidebarMobileOpen
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  /* Enable sidebar motion only after mount — kills load-time width/opacity flash */
  const [shellReady, setShellReady] = useState(false)
  useEffect(() => {
    setShellReady(true)
  }, [])

  const initials =
    data.user.displayName
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('') || 'U'

  const settingsPath = `/w/${workspaceId}/settings`
  const accountPath = `/w/${workspaceId}/account`
  const settingsOrAccount =
    location.pathname.startsWith(settingsPath) ||
    location.pathname.startsWith(accountPath)
  const showUpgrade = (workspace?.plan ?? 'free') === 'free'

  /* Mobile: drawer. Desktop: open = 260, closed = rail 52. */
  const railCollapsed = isDesktop && !open
  const labelsOpen = !isDesktop || open

  useEffect(() => {
    const root = document.documentElement
    const theme = data.user.theme
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    function apply() {
      const dark = theme === 'dark' || (theme === 'system' && mq.matches)
      root.classList.toggle('dark', dark)
    }

    apply()
    if (theme !== 'system') return
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [data.user.theme])

  useEffect(() => {
    if (workspaceMissing) {
      const fallback = getActiveWorkspaceId() || data.workspaces[0]?.id
      if (fallback) navigate(`/w/${fallback}`, { replace: true })
      return
    }
    if (params.workspaceId && params.workspaceId !== data.activeWorkspaceId) {
      setActiveWorkspace(params.workspaceId)
    }
  }, [
    workspaceMissing,
    params.workspaceId,
    data.activeWorkspaceId,
    data.workspaces,
    navigate,
  ])

  /* Close mobile drawer after in-app navigation only (not desktop rail). */
  useEffect(() => {
    if (!isDesktop && data.ui.sidebarMobileOpen) {
      setSidebarMobileOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  /*
   * Entering or leaving mobile: always reset mobile open to false.
   * Desktop open state is independent and is not touched.
   */
  useEffect(() => {
    setSidebarMobileOpen(false)
  }, [isDesktop])

  function setOpen(next: boolean) {
    if (isDesktop) setSidebarDesktopOpen(next)
    else setSidebarMobileOpen(next)
  }

  function closeMobile() {
    if (!isDesktop) setSidebarMobileOpen(false)
  }

  const chromeProps: ShellChromeProps = {
    open,
    isDesktop,
    shellReady,
    workspaceId,
    labelsOpen,
    railCollapsed,
    settingsOrAccount,
    initials,
    displayName: data.user.displayName,
    email: data.user.email,
    onNavigateHome: () => {
      navigate(`/w/${workspaceId}`)
      closeMobile()
    },
    onClose: () => setOpen(false),
    onOpen: () => setOpen(true),
    onCloseMobile: closeMobile,
    onProfile: () => {
      navigate(`${accountPath}?tab=profile`)
      closeMobile()
    },
    onPreferences: () => {
      navigate(`${accountPath}?tab=preferences`)
      closeMobile()
    },
    onSupport: () => setSupportOpen(true),
    onLogout: () => setLogoutOpen(true),
  }

  return (
    <div className="flex h-full bg-surface text-ink dark:bg-dark-surface dark:text-dark-ink">
      {isDesktop ? (
        <aside
          data-state={open ? 'open' : 'closed'}
          data-mode="desktop"
          data-ready={shellReady ? 'true' : 'false'}
          className={cn(
            SHELL_ASIDE,
            'relative',
            open ? 'w-(--sidebar-width)' : 'w-(--sidebar-rail)',
            shellAsideMotion(shellReady),
          )}
        >
          <ShellChrome {...chromeProps} />
        </aside>
      ) : (
        <Drawer
          open={open}
          onOpenChange={(next) => setSidebarMobileOpen(next)}
          swipeDirection="left"
        >
          <DrawerContent
            side="left"
            className={cn(
              'border-r border-r-(length:--sidebar-divider)',
              'border-r-(--sidebar-divider-color) dark:border-r-(--sidebar-divider-color-dark)',
            )}
          >
            <DrawerTitle className="sr-only">Navigation</DrawerTitle>
            <DrawerDescription className="sr-only">
              Workspace navigation and account
            </DrawerDescription>
            <ShellChrome {...chromeProps} open isDesktop={false} railCollapsed={false} labelsOpen />
          </DrawerContent>
        </Drawer>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={cn(
            'flex shrink-0 items-center gap-1 px-2',
            !isDesktop ? 'min-h-13 justify-between pt-2' : 'h-2',
          )}
        >
          {!isDesktop && (
            <button
              type="button"
              className={ICON_BTN}
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <MenuIcon className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      </div>

      {showUpgrade && (
        <button
          type="button"
          onClick={() => navigate(`${settingsPath}?tab=plan`)}
          className={cn(
            'pill-focus fixed z-20 inline-flex h-[34px] items-center gap-[3px] rounded-lg',
            'bg-transparent px-3 text-[14px] font-medium text-[#2c67c5]',
            'hover:bg-[#2c67c5]/[0.09] dark:text-[#7ab7ff]',
            'top-[max(0.5rem,env(safe-area-inset-top))] right-[max(0.5rem,env(safe-area-inset-right))]',
            'mt-1 me-1',
          )}
          aria-label="Upgrade workspace plan"
        >
          <Sparkles className="h-5 w-5" strokeWidth={1.75} />
          Upgrade
        </button>
      )}

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogTitle className="text-center text-[24px] font-semibold leading-snug">
            Are you sure you
            <br />
            want to log out?
          </AlertDialogTitle>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-black/10 px-3 py-3 dark:border-white/15">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-[13px] font-medium text-white">
              {initials}
            </span>
            <div className="min-w-0 text-left">
              <p className="truncate text-[16px]">{data.user.displayName}</p>
              <p className="truncate text-[14px] text-ink-secondary">
                {data.user.email}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2.5">
            <AlertDialogAction onClick={() => setLogoutOpen(false)}>
              Log out
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <SupportDialog
        open={supportOpen}
        onOpenChange={setSupportOpen}
        workspaceId={workspaceId}
        workspaceName={workspace?.name}
      />
    </div>
  )
}
