import { useEffect } from 'react'
import type { AppData } from '~/lib/types'

/** Sync `<html class="dark">` from user theme preference. */
export function useDocumentTheme(theme: AppData['user']['theme']) {
  useEffect(() => {
    const root = document.documentElement
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    function apply() {
      const dark = theme === 'dark' || (theme === 'system' && mq.matches)
      root.classList.toggle('dark', dark)
    }

    apply()
    if (theme !== 'system') return
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])
}
