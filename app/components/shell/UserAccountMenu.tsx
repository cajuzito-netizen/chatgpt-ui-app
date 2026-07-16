import { ChevronsUpDown, LifeBuoy, LogOut, User, UserRoundCog } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  SHELL_AVATAR,
  SHELL_AVATAR_INITIALS,
  SHELL_CHEVRON,
  shellFooterRowClass,
  shellLabelClass,
} from '~/components/shell/shell-classes'
import { cn } from '~/lib/utils'

/**
 * Live ChatGPT profile control geometry (Patchright):
 * h≈52, pad 6 6 6 8, margin 0 6 0 8, gap 8, radius 10, avatar 24×24
 *
 * Collapsed rail: menu opens to the right with user card on top (like chatgpt.com).
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
          shellFooterRowClass(collapsed),
          'group/profile pill-focus border-0 bg-transparent text-left',
          'hover:bg-black/[0.05] dark:hover:bg-white/10',
        )}
        aria-label={`Account menu for ${displayName}`}
        aria-haspopup="menu"
      >
        <span
          className={cn(
            SHELL_AVATAR,
            SHELL_AVATAR_INITIALS,
            'bg-teal-500 text-white',
          )}
          aria-hidden
        >
          {initials}
        </span>
        <span className={shellLabelClass(open, true, 'text-left')}>
          <span className="flex min-w-0 items-center gap-2">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium leading-5">
                {displayName}
              </span>
              <span className="block truncate text-[12px] leading-4 text-ink-secondary dark:text-dark-ink-secondary">
                {email}
              </span>
            </span>
            <ChevronsUpDown className={SHELL_CHEVRON} aria-hidden />
          </span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={collapsed ? 'right' : 'top'}
        align={collapsed ? 'end' : 'start'}
        sideOffset={collapsed ? 10 : 8}
        className="w-64"
      >
        {/* Collapsed rail: identity card at top (live: same mx/radius as items) */}
        {collapsed && (
          <>
            <div className="mx-1.5 flex items-center gap-2 rounded-[10px] px-2.5 py-1.5">
              <span
                className={cn(
                  SHELL_AVATAR,
                  SHELL_AVATAR_INITIALS,
                  'bg-teal-500 text-white',
                )}
                aria-hidden
              >
                {initials}
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[14px] font-medium leading-5">
                  {displayName}
                </p>
                <p className="truncate text-[12px] leading-4 text-ink-secondary dark:text-dark-ink-secondary">
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
