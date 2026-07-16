export type WorkspacePlan = 'free' | 'pro'

export type Workspace = {
  id: string
  name: string
  createdAt: number
  /** Billing is per workspace, not per user. */
  plan: WorkspacePlan
}

/**
 * Generic workspace-scoped record. Forks rename this to Campaign, Deal, etc.
 */
export type Item = {
  id: string
  workspaceId: string
  title: string
  body: string
  createdAt: number
  updatedAt: number
}

/** Minimal support ticket — no status workflow in the template. */
export type SupportTicket = {
  id: string
  workspaceId: string
  /** One-line summary (required) */
  subject: string
  /** Optional detail */
  body: string
  createdAt: number
}

export type AppData = {
  version: 1
  workspaces: Workspace[]
  activeWorkspaceId: string
  items: Item[]
  /** Support tickets are user-owned; workspaceId is context only. */
  tickets: SupportTicket[]
  /** UI chrome prefs (not account). Mobile/desktop sidebar open states are independent. */
  ui: {
    sidebarDesktopOpen: boolean
    sidebarMobileOpen: boolean
  }
  user: {
    displayName: string
    username: string
    email: string
    preferredLanguage: string
    theme: 'system' | 'light' | 'dark'
  }
}
