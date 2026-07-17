import {
  ChevronsUpDown,
  LifeBuoy,
  LogOut,
  User,
  UserRoundCog,
} from 'lucide-react'
import {
  WorkspaceMenuItems,
  useCreateWorkspaceDialog,
} from '~/components/shell/workspace-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { cn } from '~/lib/utils'

const AVATAR =
  'box-border flex size-6 shrink-0 items-center justify-center rounded-full text-center text-[11px] font-medium leading-none pointer-events-none'

const CHEVRON =
  'h-4 w-4 shrink-0 text-muted-foreground opacity-40 transition-opacity group-hover/profile:opacity-70'

/**
 * Account footer control (ChatGPT-like).
 * Workspace switch / create / settings live in this menu so the rail stays calm:
 * brand → nav → account only.
 */
export function UserAccountMenu({
  open,
  displayName,
  email,
  initials,
  onProfile,
  onPreferences,
  onSupport,
  onLogout,
}: {
  open: boolean
  displayName: string
  email: string
  initials: string
  onProfile: () => void
  onPreferences: () => void
  onSupport: () => void
  onLogout: () => void
}) {
  const collapsed = !open
  const { openCreate, dialog } = useCreateWorkspaceDialog()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'group/profile box-border flex h-12 min-h-12 shrink-0 items-center overflow-hidden',
            'ml-2 border-0 bg-transparent p-0 text-left pointer-events-auto pill-focus',
            collapsed
              ? 'mr-0 w-9 gap-0 rounded-none hover:bg-transparent'
              : 'mr-1.5 w-[calc(100%-0.875rem)] max-w-[calc(100%-0.875rem)] gap-2 rounded-[10px] pr-1.5 hover:bg-black/[0.05] dark:hover:bg-white/10',
          )}
          aria-label={`Account menu for ${displayName}`}
          aria-haspopup="menu"
        >
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
              collapsed &&
                'group-hover/profile:bg-black/[0.07] dark:group-hover/profile:bg-white/10',
            )}
            aria-hidden
          >
            <span className={cn(AVATAR, 'bg-teal-500 text-white')}>
              {initials}
            </span>
          </span>
          <span
            className={cn(
              'min-w-0 text-left',
              open
                ? 'flex-1 opacity-100'
                : 'pointer-events-none w-0 min-w-0 max-w-0 flex-[0_0_0] overflow-hidden opacity-0',
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-medium leading-5">
                  {displayName}
                </span>
                <span className="block truncate text-[12px] leading-4 text-muted-foreground">
                  {email}
                </span>
              </span>
              <ChevronsUpDown className={CHEVRON} aria-hidden />
            </span>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={collapsed ? 'right' : 'top'}
          align={collapsed ? 'end' : 'start'}
          sideOffset={collapsed ? 10 : 8}
          className="w-72"
        >
          {collapsed && (
            <>
              <div className="mx-1.5 flex items-center gap-2 rounded-[10px] px-2.5 py-1.5">
                <span
                  className={cn(AVATAR, 'bg-teal-500 text-white')}
                  aria-hidden
                >
                  {initials}
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-[14px] font-medium leading-5">
                    {displayName}
                  </p>
                  <p className="truncate text-[12px] leading-4 text-muted-foreground">
                    {email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem onClick={onProfile}>
            <User className="h-[18px] w-[18px] opacity-80" strokeWidth={1.5} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onPreferences}>
            <UserRoundCog
              className="h-[18px] w-[18px] opacity-80"
              strokeWidth={1.5}
            />
            Preferences
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSupport}>
            <LifeBuoy
              className="h-[18px] w-[18px] opacity-80"
              strokeWidth={1.5}
            />
            Support
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <WorkspaceMenuItems onRequestCreate={openCreate} />

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="h-[18px] w-[18px] opacity-80" strokeWidth={1.5} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialog}
    </>
  )
}
