import { useEffect, useSyncExternalStore } from 'react'
import {
  getServerSnapshot,
  getSnapshot,
  hydrateStore,
  subscribe,
} from './store'

/** Subscribe to workspace/chat store (client-hydrated localStorage). */
export function useAppStore() {
  useEffect(() => {
    hydrateStore()
  }, [])
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
