import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getActiveWorkspaceId, hydrateStore } from '~/lib/store'
import { useAppStore } from '~/lib/use-store'

export default function Home() {
  const navigate = useNavigate()
  const data = useAppStore()

  useEffect(() => {
    hydrateStore()
  }, [])

  useEffect(() => {
    const id = getActiveWorkspaceId() || data.activeWorkspaceId
    if (id) navigate(`/w/${id}`, { replace: true })
  }, [navigate, data.activeWorkspaceId])

  return (
    <div className="flex flex-1 items-center justify-center text-ink-secondary">
      Loading…
    </div>
  )
}
