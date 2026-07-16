import type { NavigateFunction } from 'react-router'

/**
 * Close overlay routes (settings, account): prefer in-app back, else workspace home.
 */
export function closeOverlay(
  navigate: NavigateFunction,
  workspaceId: string | undefined,
) {
  const home = `/w/${workspaceId ?? ''}`
  const idx =
    typeof window !== 'undefined'
      ? (window.history.state as { idx?: number } | null)?.idx
      : undefined

  if (typeof idx === 'number' && idx > 0) {
    navigate(-1)
    return
  }
  navigate(home || '/', { replace: true })
}
