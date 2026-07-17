import { useEffect, useState } from 'react'

/** Tailwind `md` breakpoint (768px). */
export const MD_MIN = 768

export function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(min-width: ${MD_MIN}px)`).matches
      : true,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MD_MIN}px)`)
    const onChange = () => setDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desktop
}
