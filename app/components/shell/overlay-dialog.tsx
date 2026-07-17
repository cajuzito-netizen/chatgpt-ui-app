/**
 * Shared large dialog shell for settings / account (dialogs-as-places).
 */
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { cn } from '~/lib/utils'

export type OverlayTab = { id: string; label: string }

export function OverlayDialogLayout({
  title,
  sidebarEyebrow,
  sidebarTitle,
  tabs,
  activeTab,
  onTabChange,
  onClose,
  children,
  className,
  asideClassName,
}: {
  title: string
  sidebarEyebrow: string
  sidebarTitle?: string
  tabs: OverlayTab[]
  activeTab: string
  onTabChange: (id: string) => void
  onClose: () => void
  children: React.ReactNode
  className?: string
  asideClassName?: string
}) {
  const activeLabel =
    tabs.find((t) => t.id === activeTab)?.label ?? tabs[0]?.label

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'flex h-[min(560px,90vh)] w-full max-w-[720px] gap-0 overflow-hidden rounded-2xl p-0',
          className,
        )}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <aside
          className={cn(
            'flex w-[200px] shrink-0 flex-col border-e border-black/5 dark:border-white/10',
            asideClassName,
          )}
        >
          <div className="flex h-12 items-center px-2">
            <button
              type="button"
              onClick={onClose}
              className="pill-focus rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="px-3 pb-2">
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {sidebarEyebrow}
            </p>
            {sidebarTitle ? (
              <p className="truncate text-[13px] font-medium">{sidebarTitle}</p>
            ) : null}
          </div>
          <nav className="flex-1 px-2 pb-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabChange(t.id)}
                className={cn(
                  'mb-0.5 flex w-full rounded-lg px-2.5 py-2 text-left text-[13px]',
                  activeTab === t.id
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
            <h2 className="text-[16px] font-semibold">{activeLabel}</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-2">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
