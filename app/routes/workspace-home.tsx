import { Link, useParams } from 'react-router'
import { Layers, Plus } from 'lucide-react'
import { APP_NAME, APP_TAGLINE } from '~/lib/app-config'
import { formatRelative } from '~/lib/format'
import { itemsForWorkspace } from '~/lib/store'
import { useAppStore } from '~/lib/use-store'

/**
 * Workspace landing — recent items + primary create.
 * Forks replace copy / entity name (campaigns, etc.).
 */
export default function WorkspaceHome() {
  const { workspaceId } = useParams()
  const data = useAppStore()
  const id = workspaceId ?? data.activeWorkspaceId
  const ws = data.workspaces.find((w) => w.id === id)
  const recent = itemsForWorkspace(id).slice(0, 8)

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-8">
      <p className="text-[13px] font-medium text-muted-foreground">
        {ws?.name ?? 'Workspace'}
      </p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-normal tracking-tight">
            Welcome to {APP_NAME}
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground ">
            {APP_TAGLINE}
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

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
            Recent
          </h2>
          <Link
            to={`/w/${id}/items`}
            className="text-[13px] font-medium text-blue-700 hover:underline dark:text-blue-400"
          >
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 px-6 py-12 text-center dark:border-white/15">
            <Layers className="mx-auto h-8 w-8 opacity-40" strokeWidth={1.5} />
            <p className="mt-3 text-[15px] font-medium">No items yet</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Create your first workspace item to see it here.
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
          <ul className="divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/[0.06] dark:divide-white/10 dark:border-white/10">
            {recent.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/w/${id}/items/${item.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-black/[0.02] dark:hover:bg-white/5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium">
                      {item.title}
                    </p>
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
      </section>
    </main>
  )
}
