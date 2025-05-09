import type { AccountTag } from './tag'
import type { AccountType } from './type'

export interface Account {
  id: number
  tags: AccountTag[]
  type: AccountType
  login: string
  password: string | null
}
