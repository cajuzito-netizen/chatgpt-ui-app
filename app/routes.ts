import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  layout('routes/app-layout.tsx', [
    index('routes/home.tsx'),
    route('w/:workspaceId', 'routes/workspace-home.tsx'),
    route('w/:workspaceId/new', 'routes/item-new.tsx'),
    route('w/:workspaceId/items', 'routes/items.tsx'),
    route('w/:workspaceId/items/:itemId', 'routes/item-detail.tsx'),
    route('w/:workspaceId/settings', 'routes/settings.tsx'),
    route('w/:workspaceId/account', 'routes/account.tsx'),
  ]),
] satisfies RouteConfig
