import type { AccountTag } from './tag'

export interface Account {
  id: number
  tags: AccountTag[]
  type: string
  login: string
  password: string | null
}
