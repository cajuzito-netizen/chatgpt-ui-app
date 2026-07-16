import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { formatRelative } from '~/lib/format'
import { deleteItem, getItem, updateItem } from '~/lib/store'
import { useAppStore } from '~/lib/use-store'

export default function ItemDetailRoute() {
  const { workspaceId, itemId } = useParams()
  const data = useAppStore()
  const navigate = useNavigate()
  const id = workspaceId ?? data.activeWorkspaceId
  const item = itemId ? getItem(itemId) : undefined

  const [title, setTitle] = useState(item?.title ?? '')
  const [body, setBody] = useState(item?.body ?? '')
  const [saved, setSaved] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    if (item) {
      setTitle(item.title)
      setBody(item.body)
    }
  }, [item?.id, item?.title, item?.body])

  if (!item || item.workspaceId !== id) {
    return (
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-[16px] font-medium">Item not found</p>
        <p className="mt-1 text-[14px] text-ink-secondary">
          It may have been deleted or belongs to another workspace.
        </p>
        <Link
          to={`/w/${id}/items`}
          className="mt-4 text-[14px] font-medium text-link hover:underline dark:text-dark-link"
        >
          Back to items
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-8">
      <p className="text-[13px] font-medium text-ink-tertiary">
        <Link to={`/w/${id}/items`} className="hover:underline">
          Items
        </Link>
        <span className="mx-1.5 opacity-40">/</span>
        <span className="text-ink dark:text-dark-ink">{item.title}</span>
      </p>
      <p className="mt-2 text-[12px] text-ink-tertiary">
        Updated {formatRelative(item.updatedAt)}
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-[12px] text-ink-secondary">
            Title
          </label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-[12px] text-ink-secondary">
            Notes
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="w-full resize-none rounded-xl border border-black/10 bg-transparent px-3 py-2 text-[15px] outline-none focus:border-black/30 dark:border-white/15"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              updateItem(item.id, { title, body })
              setSaved(true)
              window.setTimeout(() => setSaved(false), 1500)
            }}
          >
            Save
          </Button>
          <Button
            variant="outline"
            className="border-red-300 text-red-600"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </Button>
          {saved && (
            <span className="text-[13px] text-ink-secondary">Saved</span>
          )}
        </div>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogTitle className="text-left text-[18px] font-semibold">
            Delete this item?
          </AlertDialogTitle>
          <p className="mt-2 text-[14px] text-ink-secondary">
            “{item.title}” will be removed from this workspace. This cannot be
            undone in the local demo.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:text-white"
              onClick={() => {
                deleteItem(item.id)
                navigate(`/w/${id}/items`)
              }}
            >
              Delete
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
