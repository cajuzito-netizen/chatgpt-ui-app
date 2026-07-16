/**
 * Minimal support: submit a note + see past submissions.
 * No status workflow, assignments, or priority in the template.
 */
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { createSupportTicket } from '~/lib/store'
import { formatShortDate } from '~/lib/format'
import { useAppStore } from '~/lib/use-store'

export function SupportDialog({
  open,
  onOpenChange,
  workspaceId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  workspaceId: string
  /** @deprecated unused — kept for call-site compatibility */
  workspaceName?: string
}) {
  const data = useAppStore()
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const tickets = [...data.tickets].sort((a, b) => b.createdAt - a.createdAt)

  function reset() {
    setSubject('')
    setBody('')
  }

  function submit() {
    const t = createSupportTicket({ workspaceId, subject, body })
    if (t) reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) reset()
      }}
    >
      <DialogContent
        showCloseButton
        className="flex max-h-[min(520px,90vh)] w-full max-w-md flex-col overflow-hidden p-0"
      >
        <div className="border-b border-black/5 px-5 py-4 dark:border-white/10">
          <DialogTitle>Support</DialogTitle>
          <p className="mt-1 text-[13px] text-ink-secondary">
            Send a short message. Past tickets stay on this device until you
            wire a helpdesk.
          </p>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <div className="space-y-3">
            <Input
              autoFocus
              placeholder="What’s the issue?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  submit()
                }
              }}
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              placeholder="Optional details"
              className="w-full resize-none rounded-xl border border-black/10 bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-ink-tertiary focus:border-black/30 dark:border-white/15 dark:placeholder:text-dark-ink-tertiary"
            />
            <Button
              className="w-full"
              disabled={!subject.trim()}
              onClick={submit}
            >
              Send
            </Button>
          </div>

          {tickets.length > 0 && (
            <div>
              <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-ink-tertiary">
                Previous
              </h3>
              <ul className="space-y-1">
                {tickets.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-xl border border-black/8 px-3 py-2.5 dark:border-white/10"
                  >
                    <p className="truncate text-[13px] font-medium">{t.subject}</p>
                    <p className="mt-0.5 text-[11px] text-ink-tertiary">
                      {formatShortDate(t.createdAt)}
                    </p>
                    {t.body ? (
                      <p className="mt-1 line-clamp-2 text-[12px] text-ink-secondary">
                        {t.body}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
