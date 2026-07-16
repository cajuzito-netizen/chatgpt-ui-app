import { Link, useParams } from 'react-router'
import { Plus } from 'lucide-react'
import { formatRelative } from '~/lib/format'
import { itemsForWorkspace } from '~/lib/store'
import { useAppStore } from '~/lib/use-store'
import { cn } from '~/lib/utils'

/**
 * Workspace item list — product list/detail, not a chat history.
 * Selected row uses path match when viewing /items/:id (via detail route).
 */
export default function ItemsRoute() {
  const { workspaceId } = useParams()
  const data = useAppStore()
  const id = workspaceId ?? data.activeWorkspaceId
  const items = itemsForWorkspace(id)

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-6 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-normal tracking-tight">Items</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Everything in this workspace. {items.length} total.
          </p>
        </div>
        <Link
          to={`/w/${id}/new`}
          className="pill-focus inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-[14px] font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" strokeWidth={1.75} />
          New item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-black/10 px-6 py-12 text-center dark:border-white/15 sm:mt-10 sm:py-14">
          <p className="text-[15px] font-medium">No items yet</p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Create one to populate this list.
          </p>
          <Link
            to={`/w/${id}/new`}
            className="pill-focus mt-4 inline-flex h-9 items-center gap-1.5 rounded-full border border-black/15 px-4 text-[13px] font-medium hover:bg-black/[0.03] dark:border-white/15"
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} />
            New item
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/[0.06] dark:divide-white/10 dark:border-white/10 sm:mt-8">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={`/w/${id}/items/${item.id}`}
                className={cn(
                  'flex items-center justify-between gap-4 px-4 py-3.5 transition-colors',
                  'hover:bg-black/[0.02] dark:hover:bg-white/5',
                )}
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium">{item.title}</p>
                  {item.body ? (
                    <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
                      {item.body}
                    </p>
                  ) : null}
                </div>
                <span className="shrink-0 text-[12px] text-muted-foreground">
                  {formatRelative(item.updatedAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
