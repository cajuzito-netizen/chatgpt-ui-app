/**
 * Product nav for this shell instance.
 * Forks replace labels / paths (e.g. Campaigns, Contacts) without touching AppShell.
 *
 * Rename map when forking:
 *   Item → Campaign | Contact | Project | Deal | …
 *   Items → Campaigns | Contacts | …
 *   routes: /items → /campaigns (etc.)
 */
import type { LucideIcon } from 'lucide-react'
import { Home, Layers } from 'lucide-react'

export type NavConfigItem = {
  id: string
  label: string
  icon: LucideIcon
  /** Show on collapsed desktop rail */
  onRail: boolean
  /** Path under /w/:workspaceId — "" = workspace home */
  path: string
  /** Match strategy for active state */
  match: 'exact' | 'prefix'
}

/** Create lives as a page CTA (Home / Items), not a nav row. */
export const PRODUCT_NAV: NavConfigItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    onRail: true,
    path: '',
    match: 'exact',
  },
  {
    id: 'items',
    label: 'Items',
    icon: Layers,
    onRail: true,
    path: 'items',
    match: 'prefix',
  },
]

export function navHref(workspaceId: string, path: string) {
  return path ? `/w/${workspaceId}/${path}` : `/w/${workspaceId}`
}

export function isNavActive(
  pathname: string,
  workspaceId: string,
  item: NavConfigItem,
  opts?: { settingsOrAccount?: boolean },
) {
  if (opts?.settingsOrAccount) return false
  const base = `/w/${workspaceId}`
  const href = navHref(workspaceId, item.path)
  if (item.match === 'exact') {
    return pathname === href || pathname === `${href}/`
  }
  if (item.path === 'items') {
    return pathname === `${base}/items` || pathname.startsWith(`${base}/items/`)
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}
