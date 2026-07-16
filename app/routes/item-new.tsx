import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { createItem } from '~/lib/store'
import { useAppStore } from '~/lib/use-store'

export default function ItemNewRoute() {
  const { workspaceId } = useParams()
  const data = useAppStore()
  const id = workspaceId ?? data.activeWorkspaceId
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    const item = createItem(id, { title, body })
    navigate(`/w/${id}/items/${item.id}`)
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-8">
      <p className="text-[13px] font-medium text-ink-tertiary">
        <Link to={`/w/${id}`} className="hover:underline">
          Home
        </Link>
        <span className="mx-1.5 opacity-40">/</span>
        New item
      </p>
      <h1 className="mt-1 text-[24px] font-normal tracking-tight">
        Create item
      </h1>
      <p className="mt-1 text-[14px] text-ink-secondary">
        Generic workspace record — rename to campaign, project, etc. in your
        fork.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-[12px] text-ink-secondary">
            Title
          </label>
          <Input
            autoFocus
            required
            placeholder="Give it a name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-[12px] text-ink-secondary">
            Notes
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            placeholder="Optional details"
            className="w-full resize-none rounded-xl border border-black/10 bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-ink-tertiary focus:border-black/30 dark:border-white/15 dark:placeholder:text-dark-ink-tertiary"
          />
        </div>
        <div className="flex gap-2 pt-2">
          <Button type="submit">Create</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/w/${id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </main>
  )
}
