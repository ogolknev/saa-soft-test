import { AccountManagerPage } from '@/pages/account-manager'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/:path(.*)',
    component: AccountManagerPage,
  },
]

export default routes
