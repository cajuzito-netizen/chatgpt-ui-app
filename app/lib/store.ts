/**
 * Client-side app store (localStorage).
 * Workspaces + generic items + user prefs + support tickets.
 */
import { uid } from './utils'
import type {
  AppData,
  Item,
  SupportTicket,
  Workspace,
  WorkspacePlan,
} from './types'

const KEY = 'app-shell:v1'

/** Stable seed so SSR and the first client paint share the same workspace id. */
export const SEED_WS_ID = 'ws_personal'

function defaultData(): AppData {
  const ws: Workspace = {
    id: SEED_WS_ID,
    name: 'Personal',
    createdAt: 0,
    plan: 'free',
  }
  return {
    version: 1,
    workspaces: [ws],
    activeWorkspaceId: ws.id,
    items: [],
    tickets: [],
    ui: {
      sidebarDesktopOpen: true,
      sidebarMobileOpen: false,
    },
    user: {
      displayName: 'Alex Rivera',
      username: 'alex',
      email: 'alex@example.com',
      preferredLanguage: 'en',
      theme: 'system',
    },
  }
}

const SERVER_SNAPSHOT = defaultData()

function normalizeWorkspace(
  w: Partial<Workspace> & { id: string; name: string },
): Workspace {
  return {
    id: w.id,
    name: w.name,
    createdAt: w.createdAt ?? Date.now(),
    plan: w.plan === 'pro' ? 'pro' : 'free',
  }
}

function normalizeItem(t: Partial<Item> & { id: string }): Item {
  const now = Date.now()
  return {
    id: t.id,
    workspaceId: t.workspaceId ?? SEED_WS_ID,
    title: t.title ?? 'Untitled',
    body: t.body ?? '',
    createdAt: t.createdAt ?? now,
    updatedAt: t.updatedAt ?? t.createdAt ?? now,
  }
}

function normalizeTicket(t: Partial<SupportTicket> & { id: string }): SupportTicket {
  return {
    id: t.id,
    workspaceId: t.workspaceId ?? SEED_WS_ID,
    subject: t.subject ?? 'Untitled',
    body: t.body ?? '',
    createdAt: t.createdAt ?? Date.now(),
  }
}

type UiRaw = {
  sidebarDesktopOpen?: boolean
  sidebarMobileOpen?: boolean
  /** @deprecated legacy single flag */
  sidebarOpen?: boolean
}

function normalizeUi(ui: UiRaw | undefined): AppData['ui'] {
  if (
    ui &&
    ('sidebarDesktopOpen' in ui || 'sidebarMobileOpen' in ui)
  ) {
    return {
      /* Default open on desktop (match seed); only explicit false collapses */
      sidebarDesktopOpen: ui.sidebarDesktopOpen !== false,
      sidebarMobileOpen: ui.sidebarMobileOpen === true,
    }
  }
  /* Legacy: open → desktop open; missing flag → open (seed). Mobile always closed. */
  return {
    sidebarDesktopOpen: ui?.sidebarOpen !== false,
    sidebarMobileOpen: false,
  }
}

function normalize(data: AppData): AppData {
  return {
    version: 1,
    activeWorkspaceId: data.activeWorkspaceId,
    workspaces: (data.workspaces ?? []).map((w) => normalizeWorkspace(w)),
    items: Array.isArray(data.items)
      ? data.items.map((i) => normalizeItem(i))
      : [],
    tickets: Array.isArray(data.tickets)
      ? data.tickets.map((t) => normalizeTicket(t))
      : [],
    ui: normalizeUi(data.ui),
    user: {
      displayName: data.user?.displayName ?? 'User',
      username: data.user?.username ?? 'user',
      email: data.user?.email ?? 'user@example.com',
      preferredLanguage: data.user?.preferredLanguage ?? 'en',
      theme: data.user?.theme ?? 'system',
    },
  }
}

function load(): AppData {
  if (typeof window === 'undefined') return SERVER_SNAPSHOT
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      const next = defaultData()
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    }
    const parsed = normalize(JSON.parse(raw) as AppData)
    if (!parsed.workspaces?.length) {
      const next = defaultData()
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    }
    if (!parsed.workspaces.some((w) => w.id === parsed.activeWorkspaceId)) {
      parsed.activeWorkspaceId = parsed.workspaces[0]!.id
    }
    return parsed
  } catch {
    const next = defaultData()
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }
}

function save(data: AppData) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(data))
}

type Listener = () => void
let data: AppData = SERVER_SNAPSHOT
let hydrated = false
const listeners = new Set<Listener>()

function emit() {
  save(data)
  listeners.forEach((l) => l())
}

/** Load localStorage once on the client before first snapshot read (no emit). */
function ensureHydrated() {
  if (hydrated || typeof window === 'undefined') return
  data = load()
  hydrated = true
}

/**
 * Optional explicit hydrate. Prefer ensureHydrated via getSnapshot so the
 * first client paint already has localStorage (avoids footer card flash).
 */
export function hydrateStore() {
  ensureHydrated()
}

export function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot(): AppData {
  ensureHydrated()
  return data
}

export function getServerSnapshot(): AppData {
  return SERVER_SNAPSHOT
}

/* ── UI chrome ─────────────────────────────────────────────── */

export function setSidebarDesktopOpen(open: boolean) {
  if (data.ui.sidebarDesktopOpen === open) return
  data = { ...data, ui: { ...data.ui, sidebarDesktopOpen: open } }
  emit()
}

export function setSidebarMobileOpen(open: boolean) {
  if (data.ui.sidebarMobileOpen === open) return
  data = { ...data, ui: { ...data.ui, sidebarMobileOpen: open } }
  emit()
}

/* ── Workspaces ────────────────────────────────────────────── */

export function listWorkspaces() {
  return data.workspaces
}

export function getWorkspace(id: string) {
  return data.workspaces.find((w) => w.id === id)
}

export function getActiveWorkspaceId() {
  return data.activeWorkspaceId
}

export function setActiveWorkspace(id: string) {
  if (!data.workspaces.some((w) => w.id === id)) return
  if (data.activeWorkspaceId === id) return
  data = { ...data, activeWorkspaceId: id }
  emit()
}

export function createWorkspace(name: string) {
  const ws: Workspace = {
    id: uid('ws'),
    name: name.trim() || 'Untitled',
    createdAt: Date.now(),
    plan: 'free',
  }
  data = {
    ...data,
    workspaces: [...data.workspaces, ws],
    activeWorkspaceId: ws.id,
  }
  emit()
  return ws
}

export function renameWorkspace(id: string, name: string) {
  data = {
    ...data,
    workspaces: data.workspaces.map((w) =>
      w.id === id ? { ...w, name: name.trim() || w.name } : w,
    ),
  }
  emit()
}

export function setWorkspacePlan(id: string, plan: WorkspacePlan) {
  data = {
    ...data,
    workspaces: data.workspaces.map((w) =>
      w.id === id ? { ...w, plan } : w,
    ),
  }
  emit()
}

export function deleteWorkspace(id: string) {
  if (data.workspaces.length <= 1) return
  const workspaces = data.workspaces.filter((w) => w.id !== id)
  const items = data.items.filter((i) => i.workspaceId !== id)
  const activeWorkspaceId =
    data.activeWorkspaceId === id ? workspaces[0]!.id : data.activeWorkspaceId
  data = { ...data, workspaces, items, activeWorkspaceId }
  emit()
}

/* ── Items (generic product records) ───────────────────────── */

export function itemsForWorkspace(workspaceId: string) {
  return data.items
    .filter((i) => i.workspaceId === workspaceId)
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export function getItem(id: string) {
  return data.items.find((i) => i.id === id)
}

export function createItem(
  workspaceId: string,
  input: { title: string; body?: string },
) {
  const now = Date.now()
  const item: Item = {
    id: uid('item'),
    workspaceId,
    title: input.title.trim() || 'Untitled',
    body: (input.body ?? '').trim(),
    createdAt: now,
    updatedAt: now,
  }
  data = { ...data, items: [item, ...data.items] }
  emit()
  return item
}

export function updateItem(
  id: string,
  partial: Partial<Pick<Item, 'title' | 'body'>>,
) {
  data = {
    ...data,
    items: data.items.map((i) => {
      if (i.id !== id) return i
      return {
        ...i,
        title:
          partial.title !== undefined
            ? partial.title.trim() || i.title
            : i.title,
        body: partial.body !== undefined ? partial.body : i.body,
        updatedAt: Date.now(),
      }
    }),
  }
  emit()
}

export function deleteItem(id: string) {
  data = { ...data, items: data.items.filter((i) => i.id !== id) }
  emit()
}

/* ── User ──────────────────────────────────────────────────── */

export function updateUser(partial: Partial<AppData['user']>) {
  data = { ...data, user: { ...data.user, ...partial } }
  emit()
}

/* ── Support tickets ───────────────────────────────────────── */

export function listTickets() {
  return [...data.tickets].sort((a, b) => b.createdAt - a.createdAt)
}

/** Minimal ticket: subject required; body optional. */
export function createSupportTicket(input: {
  workspaceId: string
  subject: string
  body?: string
}) {
  const subject = input.subject.trim()
  if (!subject) return null

  const ticket: SupportTicket = {
    id: uid('tkt'),
    workspaceId: input.workspaceId,
    subject,
    body: (input.body ?? '').trim(),
    createdAt: Date.now(),
  }
  data = { ...data, tickets: [ticket, ...data.tickets] }
  emit()
  return ticket
}
