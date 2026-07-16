/**
 * PROTECTED SHELL — familiar sidebar chrome for product apps.
 * Mobile-first: drawer overlay on small screens; rail on md+.
 * See AGENTS.md.
 */
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import { Menu as MenuIcon, PanelLeft, Sparkles, X } from 'lucide-react'
import { BrandMark } from '~/components/shell/BrandMark'
import { SupportDialog } from '~/components/shell/SupportDialog'
import { UserAccountMenu } from '~/components/shell/UserAccountMenu'
import { WorkspaceSwitcher } from '~/components/shell/WorkspaceSwitcher'
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
    typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${MD_MIN}px)`).matches : true,
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
   * → Narrow window with desktop expanded never forces a stuck open drawer;
   * → Widen then narrow again always starts mobile closed.
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

  return (
    <div className="flex h-full bg-surface text-ink dark:bg-dark-surface dark:text-dark-ink">
      {/* Mobile scrim */}
      {!isDesktop && open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        data-state={open ? 'open' : 'closed'}
        data-mode={isDesktop ? 'desktop' : 'mobile'}
        data-ready={shellReady ? 'true' : 'false'}
        className={cn(
          /* Border is on .sidebar-shell CSS (1px live), not Tailwind — avoids double border */
          'sidebar-shell z-40 flex h-full flex-col overflow-hidden bg-surface dark:bg-dark-surface',
          'fixed inset-y-0 left-0 w-[min(var(--sidebar-width),85vw)] transition-transform duration-200 ease-out md:relative md:transition-[width]',
          !isDesktop && (open ? 'translate-x-0' : '-translate-x-full'),
          isDesktop && (open ? 'w-(--sidebar-width)' : 'w-(--sidebar-rail)'),
          isDesktop && 'shrink-0',
        )}
      >
        {railCollapsed && (
          <button
            type="button"
            aria-label="Open sidebar"
            className="absolute inset-y-0 -right-1 z-30 w-3 cursor-e-resize border-0 bg-transparent p-0"
            onClick={() => setOpen(true)}
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
                railCollapsed
                  ? 'cursor-e-resize'
                  : 'hover:bg-transparent',
              )}
              aria-label={railCollapsed ? 'Open sidebar' : 'Home'}
              onClick={() => {
                if (railCollapsed) {
                  setOpen(true)
                  return
                }
                navigate(`/w/${workspaceId}`)
                closeMobile()
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

          <div
            className={cn(
              'sidebar-chrome ms-auto flex shrink-0 items-center gap-0.5',
              !open && isDesktop && 'pointer-events-none',
            )}
          >
            {!isDesktop && (
              <button
                type="button"
                className={ICON_BTN}
                aria-label="Close menu"
                onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
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

        {/* Live nav: flush rows, margin 6 + pad 6×10 */}
        <nav className="sidebar-nav relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
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
                onClick={closeMobile}
                className={cn(
                  'sidebar-nav-item',
                  hideRow &&
                    'pointer-events-none !m-0 !h-0 !max-h-0 !overflow-hidden !p-0 !opacity-0',
                  (open || !isDesktop) &&
                    (active
                      ? 'bg-black/[0.05] dark:bg-white/10'
                      : 'hover:bg-black/[0.05] dark:hover:bg-white/10'),
                )}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                tabIndex={hideRow ? -1 : 0}
              >
                <span className="sidebar-nav-icon opacity-80" aria-hidden>
                  <Icon strokeWidth={1.5} />
                </span>
                <span
                  className={cn(
                    'sidebar-label min-w-0 flex-1 truncate',
                    (open || !isDesktop) && 'sidebar-label--expanded',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/*
          Live profile wrap: pt-2 pb-1.5 (8 / 6). One card on chatgpt.com;
          we stack workspace + user with the same card geometry.
        */}
        <div className="sidebar-footer relative z-10 mt-auto">
          <hr className="sidebar-rule" />
          <WorkspaceSwitcher open={open || !isDesktop} />
          <hr className="sidebar-rule" />
          <UserAccountMenu
            open={open || !isDesktop}
            displayName={data.user.displayName}
            email={data.user.email}
            initials={initials}
            onProfile={() => {
              navigate(`${accountPath}?tab=profile`)
              closeMobile()
            }}
            onPreferences={() => {
              navigate(`${accountPath}?tab=preferences`)
              closeMobile()
            }}
            onSupport={() => setSupportOpen(true)}
            onLogout={() => setLogoutOpen(true)}
          />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile: menu only. Desktop: no chrome bar when empty. Upgrade is FAB. */}
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

      {/*
        Upgrade chip — same look as the old header control, fixed top-right
        (not a dark FAB). Free workspaces only; plan badge stays on switcher.
      */}
      {showUpgrade && (
        <button
          type="button"
          onClick={() => navigate(`${settingsPath}?tab=plan`)}
          className={cn(
            'pill-focus fixed z-20 inline-flex h-[34px] items-center gap-[3px] rounded-lg',
            'bg-transparent px-3 text-[14px] font-medium text-[#2c67c5]',
            'hover:bg-[#2c67c5]/[0.09] dark:text-[#7ab7ff]',
            'top-[max(0.5rem,env(safe-area-inset-top))] right-[max(0.5rem,env(safe-area-inset-right))]',
            /* Room for mobile menu button on the left; chip sits top-right */
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
