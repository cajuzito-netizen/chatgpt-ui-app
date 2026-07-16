import { ChevronsUpDown, LifeBuoy, LogOut, User, UserRoundCog } from 'lucide-react'
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
  'h-4 w-4 shrink-0 text-muted-foreground opacity-40 transition-opacity group-hover/ws:opacity-70 group-hover/profile:opacity-70'

/**
 * Account footer control. Collapsed rail: menu opens to the right with identity card on top.
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'group/profile box-border flex h-12 min-h-10 cursor-pointer items-center overflow-hidden pointer-events-auto',
          'ml-2 mr-1.5 w-[calc(100%-0.875rem)] max-w-[calc(100%-0.875rem)]',
          'rounded-[10px] border-0 bg-transparent py-1.5 pr-1.5 pl-2 text-left',
          'pill-focus hover:bg-black/[0.05] dark:hover:bg-white/10',
          collapsed ? 'gap-0' : 'gap-2',
        )}
        aria-label={`Account menu for ${displayName}`}
        aria-haspopup="menu"
      >
        <span className={cn(AVATAR, 'bg-teal-500 text-white')} aria-hidden>
          {initials}
        </span>
        <span
          className={cn(
            'min-w-0 text-left',
            open
              ? 'flex-1 opacity-100'
              : 'pointer-events-none w-0 max-w-0 min-w-0 flex-[0_0_0] overflow-hidden opacity-0',
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
        className="w-64"
      >
        {collapsed && (
          <>
            <div className="mx-1.5 flex items-center gap-2 rounded-[10px] px-2.5 py-1.5">
              <span className={cn(AVATAR, 'bg-teal-500 text-white')} aria-hidden>
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
          <LifeBuoy className="h-[18px] w-[18px] opacity-80" strokeWidth={1.5} />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="h-[18px] w-[18px] opacity-80" strokeWidth={1.5} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
